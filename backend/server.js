// Admin
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes)

// ── server.js — Zero Trace Cyber Legacy Backend ──
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const app = express();

// ── CORS ──
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    // Add your Netlify URL here after deploy:
    // 'https://your-site.netlify.app'
  ],
  credentials: true,
}));

// ── Body parser ──
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Serve frontend from /public if present ──
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ──
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/progress', require('./routes/progress'));

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    status:  'online',
    server:  'Zero Trace Cyber Legacy API',
    version: '1.0.0',
    time:    new Date().toISOString(),
  });
});

// ── Catch-all: serve index.html for SPA ──
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  const fs = require('fs');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: 'Zero Trace API is running. Frontend not found in /public.' });
  }
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('[-] Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Connect MongoDB then start ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('[+] MongoDB connected successfully');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`[+] Zero Trace server running on port ${PORT}`);
      console.log(`[+] Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch(err => {
    console.error('[-] MongoDB connection failed:', err.message);
    process.exit(1);
  });
