// ── routes/auth.js ──
const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const protect = require('../middleware/auth');

function makeToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function safeUser(user) {
  return {
    id:         user._id,
    username:   user.username,
    email:      user.email,
    pts:        user.pts,
    clearance:  user.clearance,
    lessonsCompleted: user.lessonsCompleted,
    mods:       user.mods,
    activity:   user.activity,
    createdAt:  user.createdAt,
    lastActive: user.lastActive,
  };
}

// ── POST /api/auth/register ──
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ error: 'All fields are required.' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) return res.status(400).json({ error: 'Email already registered.' });

    const nameExists = await User.findOne({ username });
    if (nameExists) return res.status(400).json({ error: 'Username already taken.' });

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email: email.toLowerCase(), password: hash });

    const token = makeToken(user._id);
    res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'Username or email already exists.' });
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ── POST /api/auth/login ──
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password.' });

    user.lastActive = Date.now();
    await user.save();

    const token = makeToken(user._id);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ── GET /api/auth/me ── (get current user from token)
router.get('/me', protect, (req, res) => {
  res.json({ user: safeUser(req.user) });
});

// ── POST /api/auth/change-password ──
router.post('/change-password', protect, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res.status(400).json({ error: 'Both fields required.' });
    if (newPassword.length < 6)
      return res.status(400).json({ error: 'New password must be at least 6 characters.' });

    const user  = await User.findById(req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ error: 'Old password is incorrect.' });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
