// USER MODEL
role: {
  type: String,
  'enum' ["user","admin"],
  default: "user"
}



// ── models/User.js ──
const mongoose = require('mongoose');
const router = require('../routes/auth');
const { isAdmin } = require('../middleware/auth');

const lessonSchema = {};
for (let i = 1; i <= 10; i++) lessonSchema[i] = { type: Boolean, default: false };

const moduleSchema = new mongoose.Schema({
  started:   { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  lessons:   { type: Object, default: () => ({1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}) }
}, { _id: false });

const activitySchema = new mongoose.Schema({
  time:  String,
  msg:   String,
  pts:   Number,
  icon:  { type: String, default: '▸' }
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String, required: true, unique: true,
    trim: true, minlength: 3, maxlength: 20,
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores']
  },
  email: {
    type: String, required: true, unique: true,
    lowercase: true, trim: true
  },
  password: { type: String, required: true, minlength: 6 },

  // Progress per module
  mods: {
    mod01: { type: moduleSchema, default: () => ({}) },
    mod02: { type: moduleSchema, default: () => ({}) },
    mod03: { type: moduleSchema, default: () => ({}) },
    mod04: { type: moduleSchema, default: () => ({}) },
    mod05: { type: moduleSchema, default: () => ({}) },
    mod06: { type: moduleSchema, default: () => ({}) },
  },

  pts:        { type: Number, default: 0 },
  activity:   { type: [activitySchema], default: [] },
  lastActive: { type: Date, default: Date.now },
  createdAt:  { type: Date, default: Date.now },
  role:       { type: String, enum: ['student', 'admin'], default: 'student' },
});

// Virtual: total lessons done
userSchema.virtual('lessonsCompleted').get(function () {
  let total = 0;
  ['mod01','mod02','mod03','mod04','mod05','mod06'].forEach(id => {
    const lessons = this.mods?.[id]?.lessons || {};
    total += Object.values(lessons).filter(Boolean).length;
  });
  return total;
});

// Virtual: clearance %
userSchema.virtual('clearance').get(function () {
  return Math.round((this.lessonsCompleted / 60) * 100);
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);

router.get("/user", verifyToken, isAdmin, async (req, res) => {
const users = await User.find().select("-password");
res.json(users); 
});