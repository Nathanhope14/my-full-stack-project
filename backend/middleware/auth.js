// admin check
exports.isAdmin = (req, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only"});
  }
}


// ── middleware/auth.js ──
const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes — requires valid JWT
module.exports = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided. Please log in.' });
    }
    const token   = header.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found.' });
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    res.status(401).json({ error: 'Invalid token.' });
  }
};
