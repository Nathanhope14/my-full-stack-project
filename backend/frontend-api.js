// ── js/api.js — Frontend ↔ Backend connector ──
// Change BASE_URL to your Render URL after deploying
const API = (() => {
  const BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://YOUR-APP.onrender.com/api'; // ← replace after deploy

  // ── Token helpers ──
  const getToken  = ()      => localStorage.getItem('zt_token');
  const setToken  = (t)     => localStorage.setItem('zt_token', t);
  const clearToken = ()     => localStorage.removeItem('zt_token');
  const isLoggedIn = ()     => !!getToken();

  // ── Headers ──
  const headers = (auth = false) => {
    const h = { 'Content-Type': 'application/json' };
    if (auth) h['Authorization'] = `Bearer ${getToken()}`;
    return h;
  };

  // ── Request wrapper ──
  async function req(method, path, body, auth = false) {
    try {
      const opts = { method, headers: headers(auth) };
      if (body) opts.body = JSON.stringify(body);
      const res  = await fetch(BASE + path, opts);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  // ── AUTH ──
  async function register(username, email, password) {
    const r = await req('POST', '/auth/register', { username, email, password });
    if (r.ok) {
      setToken(r.data.token);
      syncLocalToCloud(r.data.user);
    }
    return r;
  }

  async function login(email, password) {
    const r = await req('POST', '/auth/login', { email, password });
    if (r.ok) {
      setToken(r.data.token);
      // Load cloud progress into localStorage
      const u = r.data.user;
      const local = ZT.load();
      // Merge: cloud wins on pts, keep whichever has more progress
      const cloudPts = u.pts || 0;
      if (cloudPts >= local.pts) {
        const state = { mods: u.mods || local.mods, pts: cloudPts };
        localStorage.setItem('zt_v3', JSON.stringify(state));
      }
      if (u.activity?.length) {
        localStorage.setItem('zt_activity', JSON.stringify(u.activity));
      }
      ZT.render();
    }
    return r;
  }

  async function logout() {
    clearToken();
    localStorage.removeItem('zt_user');
    ZT.render();
    AuthModal.updateNav();
  }

  async function getMe() {
    return req('GET', '/auth/me', null, true);
  }

  // ── PROGRESS ──
  async function saveProgress() {
    if (!isLoggedIn()) return;
    const s = ZT.load();
    const activity = JSON.parse(localStorage.getItem('zt_activity') || '[]');
    return req('POST', '/progress/save', { mods: s.mods, pts: s.pts, activity }, true);
  }

  async function loadProgress() {
    if (!isLoggedIn()) return;
    const r = await req('GET', '/progress/load', null, true);
    if (r.ok) {
      const d = r.data;
      if (d.pts >= ZT.load().pts) {
        localStorage.setItem('zt_v3', JSON.stringify({ mods: d.mods, pts: d.pts }));
        if (d.activity?.length) localStorage.setItem('zt_activity', JSON.stringify(d.activity));
        ZT.render();
      }
    }
    return r;
  }

  async function completeLesson(modId, lessonNum, pts, activityEntry) {
    if (!isLoggedIn()) return;
    return req('POST', '/progress/complete-lesson', { modId, lessonNum, pts, activityEntry }, true);
  }

  async function leaderboard() {
    return req('GET', '/progress/leaderboard');
  }

  async function platformStats() {
    return req('GET', '/progress/stats');
  }

  // ── Sync local progress to cloud ──
  function syncLocalToCloud(user) {
    const local = ZT.load();
    if (local.pts > 0) saveProgress();
  }

  // ── Auto-save every 60s if logged in ──
  setInterval(() => { if (isLoggedIn()) saveProgress(); }, 60000);

  return {
    BASE, getToken, isLoggedIn, logout,
    register, login, getMe,
    saveProgress, loadProgress, completeLesson,
    leaderboard, platformStats,
  };
})();
