// ── routes/progress.js ──
const router  = require('express').Router();
const protect = require('../middleware/auth');
const User    = require('../models/User');

// ── POST /api/progress/save ──
router.post('/save', protect, async (req, res) => {
  try {
    const { mods, pts, activity } = req.body;
    if (mods === undefined) return res.status(400).json({ error: 'No progress data provided.' });

    const update = { lastActive: Date.now() };
    if (mods)     update.mods     = mods;
    if (pts !== undefined) update.pts = pts;
    if (activity) update.activity = activity.slice(0, 100); // cap at 100 entries

    await User.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/progress/load ──
router.get('/load', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      mods:     user.mods,
      pts:      user.pts,
      activity: user.activity,
      clearance: user.clearance,
      lessonsCompleted: user.lessonsCompleted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/progress/complete-lesson ── (single lesson completion)
router.post('/complete-lesson', protect, async (req, res) => {
  try {
    const { modId, lessonNum, pts, activityEntry } = req.body;
    if (!modId || !lessonNum) return res.status(400).json({ error: 'modId and lessonNum required.' });

    const user = await User.findById(req.user._id);

    // Mark lesson done
    if (!user.mods[modId]) return res.status(400).json({ error: 'Invalid module ID.' });
    const already = user.mods[modId].lessons?.[lessonNum];
    if (already) return res.json({ success: true, alreadyDone: true });

    user.mods[modId].lessons     = user.mods[modId].lessons || {};
    user.mods[modId].lessons[lessonNum] = true;
    user.mods[modId].started     = true;

    // Check module completion
    const allDone = Object.values(user.mods[modId].lessons).filter(Boolean).length === 10;
    if (allDone) user.mods[modId].completed = true;

    // Add points
    user.pts += (pts || 10);

    // Log activity
    if (activityEntry) {
      user.activity.unshift(activityEntry);
      if (user.activity.length > 100) user.activity = user.activity.slice(0, 100);
    }

    user.lastActive = Date.now();
    user.markModified('mods');
    await user.save();

    res.json({ success: true, pts: user.pts, clearance: user.clearance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/progress/leaderboard ──
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .sort({ pts: -1 })
      .limit(20)
      .select('username pts createdAt lastActive');

    const board = users.map((u, i) => ({
      rank:       i + 1,
      username:   u.username,
      pts:        u.pts,
      clearance:  u.clearance,
      lessonsCompleted: u.lessonsCompleted,
      joined:     u.createdAt,
      lastActive: u.lastActive,
    }));
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/progress/stats ── (platform-wide stats)
router.get('/stats', async (req, res) => {
  try {
    const totalUsers    = await User.countDocuments({ role: 'student' });
    const completedAny  = await User.countDocuments({ pts: { $gt: 0 } });
    const topScore      = await User.findOne().sort({ pts: -1 }).select('pts username');
    res.json({ totalUsers, completedAny, topScore: topScore?.pts || 0, topUser: topScore?.username || '-' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
