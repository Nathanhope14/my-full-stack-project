// ══════════════════════════════════════════════════════
//   ZERO TRACE — AUTH SYSTEM
//   Handles: register, login, logout, sessions,
//            geo-tracking, profile, admin dashboard
// ══════════════════════════════════════════════════════

const Auth = (() => {

// ── Storage keys ──
const KEYS = {
users:    'zt_users_v1',
session:  'zt_session_v1',
activity: 'zt_user_activity_v1',
};

// ── Load / Save ──
function getUsers()       { try { return JSON.parse(localStorage.getItem(KEYS.users))    || []; } catch { return []; } }
function saveUsers(u)     { localStorage.setItem(KEYS.users, JSON.stringify(u)); }
function getSession()     { try { return JSON.parse(localStorage.getItem(KEYS.session))  || null; } catch { return null; } }
function saveSession(s)   { localStorage.setItem(KEYS.session, JSON.stringify(s)); }
function clearSession()   { localStorage.removeItem(KEYS.session); }
function getActivity()    { try { return JSON.parse(localStorage.getItem(KEYS.activity)) || []; } catch { return []; } }
function saveActivity(a)  { localStorage.setItem(KEYS.activity, JSON.stringify(a.slice(0, 200))); }

// ── Current user ──
function currentUser() {
const s = getSession();
if (!s) return null;
return getUsers().find(u => u.id === s.userId) || null;
}
function isLoggedIn() { return !!currentUser(); }
function isAdmin()    { const u = currentUser(); return u?.role === 'admin'; }

// ── Generate ID ──
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

// ── Password helpers ──
function hashPass(pass) {
// Simple obfuscation for localStorage (not cryptographic — real security needs a backend)
let h = 0;
for (let i = 0; i < pass.length; i++) { h = Math.imul(31, h) + pass.charCodeAt(i) | 0; }
return 'zt_' + Math.abs(h).toString(16) + '_' + pass.length;
}
function checkPass(plain, hashed) { return hashPass(plain) === hashed; }

function passStrength(pass) {
let score = 0;
if (pass.length >= 8)  score++;
if (pass.length >= 12) score++;
if (/[A-Z]/.test(pass)) score++;
if (/[0-9]/.test(pass)) score++;
if (/[^A-Za-z0-9]/.test(pass)) score++;
if (score <= 1) return 'weak';
if (score === 2) return 'fair';
if (score === 3) return 'good';
return 'strong';
}

// ── Get geo info (free, no API key) ──
async function getGeoInfo() {
try {
const r = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
const d = await r.json();
return {
ip:       d.ip      || 'Unknown',
city:     d.city    || 'Unknown',
region:   d.region  || '',
country:  d.country_name || 'Unknown',
countryCode: d.country_code || '',
isp:      d.org     || 'Unknown',
timezone: d.timezone || '',
lat:      d.latitude  || null,
lon:      d.longitude || null,
};
} catch {
return { ip:'Unknown', city:'Unknown', country:'Unknown', countryCode:', region:', isp:', timezone:', lat:null, lon:null };
}
}

// ── Log activity ──
function logActivity(userId, type, detail = '') {
const log = getActivity();
log.unshift({
id:     uid(),
userId,
type,   // 'register' | 'login' | 'logout' | 'lesson' | 'module'
detail,
time:   new Date().toISOString(),
timeLocal: new Date().toLocaleString(),
});
saveActivity(log);
}

// ── REGISTER ──
async function register(username, email, password, country = '') {
const users = getUsers();

// Validation
if (!username || username.length < 3)
  return { ok: false, error: 'Username must be at least 3 characters.' };
if (!/^[a-zA-Z0-9_]+$/.test(username))
  return { ok: false, error: 'Username: letters, numbers and _ only.' };
if (!email || !email.includes('@'))
  return { ok: false, error: 'Enter a valid email address.' };
if (!password || password.length < 6)
  return { ok: false, error: 'Password must be at least 6 characters.' };
if (users.find(u => u.username.toLowerCase() === username.toLowerCase()))
  return { ok: false, error: 'Username already taken.' };
if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
  return { ok: false, error: 'Email already registered.' };

// Get location
const geo = await getGeoInfo();

const newUser = {
  id:         uid(),
  username:   username.trim(),
  email:      email.toLowerCase().trim(),
  password:   hashPass(password),
  role:       users.length === 0 ? 'admin' : 'student', // first user is admin
  createdAt:  new Date().toISOString(),
  lastLogin:  new Date().toISOString(),
  loginCount: 1,
  geo,
  country:    country || geo.country,
  progress:   null, // will sync from ZT
  pts:        0,
};

users.push(newUser);
saveUsers(users);

// Create session
saveSession({ userId: newUser.id, loginAt: new Date().toISOString() });

// Sync current local progress to user
syncProgressToUser(newUser.id);

logActivity(newUser.id, 'register', `Registered from ${geo.city}, ${geo.country} (${geo.ip})`);

return { ok: true, user: newUser };
```

}

// ── LOGIN ──
async function login(emailOrUsername, password) {
const users = getUsers();
const user  = users.find(u =>
u.email === emailOrUsername.toLowerCase().trim() ||
u.username.toLowerCase() === emailOrUsername.toLowerCase().trim()
);

```
if (!user) return { ok: false, error: 'No account found with that email or username.' };
if (!checkPass(password, user.password)) return { ok: false, error: 'Incorrect password.' };

// Update last login + geo
const geo = await getGeoInfo();
user.lastLogin  = new Date().toISOString();
user.loginCount = (user.loginCount || 0) + 1;
user.geo        = geo;
saveUsers(users);

saveSession({ userId: user.id, loginAt: new Date().toISOString() });

// Restore user's saved progress
if (user.progress) {
  localStorage.setItem('zt_v3', JSON.stringify(user.progress));
  ZT.render();
} else {
  syncProgressToUser(user.id);
}

logActivity(user.id, 'login', `Logged in from ${geo.city}, ${geo.country} (${geo.ip})`);

return { ok: true, user };


}

// ── LOGOUT ──
function logout() {
const u = currentUser();
if (u) {
syncProgressToUser(u.id);
logActivity(u.id, 'logout', 'Logged out');
}
clearSession();
GatePage.show();
updateNav();
ProfilePanel.close();
}

// ── Sync ZT progress into user record ──
function syncProgressToUser(userId) {
const users = getUsers();
const idx   = users.findIndex(u => u.id === userId);
if (idx === -1) return;
const state = ZT.load();
users[idx].progress = state;
users[idx].pts      = state.pts;
saveUsers(users);
}

// ── Auto-sync progress every 30s ──
setInterval(() => {
const u = currentUser();
if (u) syncProgressToUser(u.id);
}, 30000);

// ── Hook ZT.completeLesson to sync immediately ──
const _orig = ZT.completeLesson.bind(ZT);
ZT.completeLesson = function(modId, lessonNum) {
const pts = _orig(modId, lessonNum);
if (pts > 0) {
const u = currentUser();
if (u) {
syncProgressToUser(u.id);
const mod = ZT.MODULES.find(m => m.id === modId);
logActivity(u.id, 'lesson', `Completed lesson in ${mod?.title || modId} (+${pts} pts)`);
}
// Activity log for terminal
if (window.ZT_logActivity) {
const mod = ZT.MODULES.find(m => m.id === modId);
const p   = ZT.modProgress(modId);
const icon = p.pct === 100 ? '🏆' : '✅';
const msg  = p.pct === 100 ? `Completed MODULE: ${mod?.title}` : `Lesson done in ${mod?.title}`;
ZT_logActivity(msg, pts, icon);
}
}
return pts;
};

// ── Update navbar ──
function updateNav() {
const area = document.getElementById('nav-auth-area');
if (!area) return;
const u = currentUser();
if (u) {
area.innerHTML = `<div class="nav-user-pill"> <div class="nav-user-avatar" onclick="ProfilePanel.open()" title="My Profile"> ${u.username.charAt(0).toUpperCase()} </div> <span class="nav-username" onclick="ProfilePanel.open()">${u.username}</span> ${u.role === 'admin' ?`<button class="nav-login-btn" style="font-size:.6rem;padding:.2rem .5rem;border-color:var(--red);color:var(--red)" onclick="AdminPanel.open()">ADMIN</button>` : ''} <button class="nav-logout-btn" onclick="Auth.logout()">EXIT</button> </div>`;
} else {
area.innerHTML = ` <button class="nav-login-btn" onclick="GatePage.show('login')">LOGIN</button> <button class="nav-login-btn register" onclick="GatePage.show('register')">REGISTER</button>`;
}
}

// ── Get all users (admin) ──
function getAllUsers() { return getUsers(); }

// ── Get activity log (admin) ──
function getAllActivity() { return getActivity(); }

// ── Delete user (admin) ──
function deleteUser(userId) {
const users = getUsers().filter(u => u.id !== userId);
saveUsers(users);
}

return {
register, login, logout,
currentUser, isLoggedIn, isAdmin,
updateNav, syncProgressToUser,
getAllUsers, getAllActivity, deleteUser,
passStrength, logActivity, getActivity,
};
})();

// ══════════════════════════════════════════════════════
//   GATE PAGE (the login/register wall)
// ══════════════════════════════════════════════════════
const GatePage = (() => {

function show(tab = 'login') {
document.getElementById('gate-page').classList.remove('hidden');
document.getElementById('main-page').style.display    = 'none';
document.getElementById('lesson-page').style.display  = 'none';
const pp = document.getElementById('progress-page');
const tp = document.getElementById('terminal-page');
if (pp) pp.style.display = 'none';
if (tp) tp.style.display = 'none';
switchTab(tab);
}

function hide() {
document.getElementById('gate-page').classList.add('hidden');
document.getElementById('main-page').style.display = 'block';
ZT.render();
Auth.updateNav();
}

function switchTab(tab) {
document.getElementById('gate-login-form').classList.toggle('active',    tab === 'login');
document.getElementById('gate-register-form').classList.toggle('active', tab === 'register');
document.getElementById('gate-tab-login').classList.toggle('active',     tab === 'login');
document.getElementById('gate-tab-register').classList.toggle('active',  tab === 'register');
clearErrors();
}

function clearErrors() {
['gate-login-error','gate-reg-error','gate-login-ok','gate-reg-ok'].forEach(id => {
const el = document.getElementById(id);
if (el) el.classList.remove('show');
});
}

function setError(id, msg) {
const el = document.getElementById(id);
if (el) { el.textContent = msg; el.classList.add('show'); }
}
function setOk(id, msg) {
const el = document.getElementById(id);
if (el) { el.textContent = msg; el.classList.add('show'); }
}

function setBtnLoading(id, loading, label) {
const btn = document.getElementById(id);
if (!btn) return;
btn.disabled = loading;
btn.querySelector('.btn-spinner').style.display = loading ? 'block' : 'none';
btn.childNodes[0].textContent = loading ? '[ CONNECTING… ]' : label;
}

// ── Submit Login ──
async function submitLogin(e) {
e.preventDefault();
clearErrors();
const ident = document.getElementById('gate-login-ident').value.trim();
const pass  = document.getElementById('gate-login-pass').value;
if (!ident || !pass) { setError('gate-login-error', 'Please fill in all fields.'); return; }
setBtnLoading('gate-login-btn', true, '[ LOGIN ]');
const r = await Auth.login(ident, pass);
setBtnLoading('gate-login-btn', false, '[ LOGIN ]');
if (!r.ok) { setError('gate-login-error', r.error); return; }
setOk('gate-login-ok', `Welcome back, ${r.user.username}!`);
setTimeout(() => hide(), 800);
}

// ── Submit Register ──
async function submitRegister(e) {
e.preventDefault();
clearErrors();
const username = document.getElementById('gate-reg-username').value.trim();
const email    = document.getElementById('gate-reg-email').value.trim();
const pass     = document.getElementById('gate-reg-pass').value;
const pass2    = document.getElementById('gate-reg-pass2').value;
const terms    = document.getElementById('gate-reg-terms').checked;

if (!terms) { setError('gate-reg-error', 'You must agree to the terms.'); return; }
if (pass !== pass2) { setError('gate-reg-error', 'Passwords do not match.'); return; }

setBtnLoading('gate-reg-btn', true, '[ CREATE ACCOUNT ]');
const r = await Auth.register(username, email, pass);
setBtnLoading('gate-reg-btn', false, '[ CREATE ACCOUNT ]');
if (!r.ok) { setError('gate-reg-error', r.error); return; }
setOk('gate-reg-ok', `Account created! Welcome, ${r.user.username}!`);
setTimeout(() => hide(), 900);
```

}

// ── Password strength indicator ──
function updateStrength(pass) {
const bar = document.getElementById('gate-reg-strength');
if (!bar) return;
bar.className = 'gf-strength ' + Auth.passStrength(pass);
}

// ── Toggle password visibility ──
function togglePass(inputId, btn) {
const inp = document.getElementById(inputId);
if (!inp) return;
inp.type = inp.type === 'password' ? 'text' : 'password';
btn.textContent = inp.type === 'password' ? '👁' : '🙈';
}

return { show, hide, switchTab, submitLogin, submitRegister, updateStrength, togglePass };
})();

// ══════════════════════════════════════════════════════
//   PROFILE PANEL
// ══════════════════════════════════════════════════════
const ProfilePanel = (() => {

function open() {
const u = Auth.currentUser();
if (!u) { GatePage.show('login'); return; }
render(u);
document.getElementById('profile-panel').classList.add('open');
document.getElementById('panel-overlay').classList.add('show');
}

function close() {
document.getElementById('profile-panel').classList.remove('open');
document.getElementById('panel-overlay').classList.remove('show');
}

function render(u) {
const panel = document.getElementById('profile-panel');
if (!panel) return;
const tp   = ZT.totalProgress();
const s    = ZT.load();
const rank = getRank(tp.pct);

```
// Header
panel.querySelector('.pp-name').textContent  = u.username;
panel.querySelector('.pp-email').textContent = u.email;
panel.querySelector('.pp-rank-badge').textContent = rank;
panel.querySelector('.pp-avatar').textContent = u.username.charAt(0).toUpperCase();

// Stats
panel.querySelector('#pp-pct').textContent    = tp.pct + '%';
panel.querySelector('#pp-pts').textContent    = s.pts.toLocaleString();
panel.querySelector('#pp-lessons').textContent = tp.done;
panel.querySelector('#pp-logins').textContent  = u.loginCount || 1;

// Modules mini list
const modList = panel.querySelector('#pp-mod-list');
if (modList) {
  modList.innerHTML = ZT.MODULES.map(m => {
    const p = ZT.modProgress(m.id);
    return `<div class="pp-mod-row">
      <span class="pp-mod-name">MOD${m.num}</span>
      <div class="pp-mod-bar-wrap"><div class="pp-mod-bar-fill" style="width:${p.pct}%"></div></div>
      <span class="pp-mod-pct">${p.pct}%</span>
    </div>`;
  }).join('');
}

// Location
const geo = u.geo || {};
const locEl = panel.querySelector('#pp-location');
if (locEl) {
  locEl.innerHTML = `
    <div class="pp-location-row"><span class="lbl">IP</span><span class="val">${geo.ip || 'Unknown'}</span></div>
    <div class="pp-location-row"><span class="lbl">LOCATION</span><span class="val">${[geo.city, geo.region, geo.country].filter(Boolean).join(', ') || 'Unknown'}</span></div>
    <div class="pp-location-row"><span class="lbl">ISP</span><span class="val">${geo.isp || 'Unknown'}</span></div>
    <div class="pp-location-row"><span class="lbl">TIMEZONE</span><span class="val">${geo.timezone || 'Unknown'}</span></div>
    <div class="pp-location-row"><span class="lbl">JOINED</span><span class="val">${new Date(u.createdAt).toLocaleDateString()}</span></div>
    <div class="pp-location-row"><span class="lbl">LAST LOGIN</span><span class="val">${new Date(u.lastLogin).toLocaleString()}</span></div>`;
}
```

}

function getRank(pct) {
if (pct === 100) return 'ELITE OPERATOR';
if (pct >= 80)   return 'SENIOR ANALYST';
if (pct >= 60)   return 'SECURITY ANALYST';
if (pct >= 40)   return 'JUNIOR ANALYST';
if (pct >= 20)   return 'TRAINEE';
return 'RECRUIT';
}

return { open, close, render };
})();

// ══════════════════════════════════════════════════════
//   ADMIN DASHBOARD
// ══════════════════════════════════════════════════════
const AdminPanel = (() => {

function open() {
if (!Auth.isAdmin()) { authToast('Admin access only.', true); return; }
document.getElementById('admin-panel').classList.add('active');
render();
}

function close() {
document.getElementById('admin-panel').classList.remove('active');
}

function render() {
const users    = Auth.getAllUsers();
const activity = Auth.getAllActivity();
const students = users.filter(u => u.role === 'student');

```
// Stats
const totalLessons = users.reduce((acc, u) => {
  if (!u.progress) return acc;
  return acc + Object.values(u.progress.mods || {}).reduce((a, m) =>
    a + Object.values(m.lessons || {}).filter(Boolean).length, 0);
}, 0);
const topPts = users.reduce((max, u) => Math.max(max, u.pts || 0), 0);
const countries = [...new Set(users.map(u => u.geo?.country).filter(Boolean))];

document.getElementById('adm-total-users').textContent   = users.length;
document.getElementById('adm-total-students').textContent = students.length;
document.getElementById('adm-total-lessons').textContent  = totalLessons;
document.getElementById('adm-total-countries').textContent = countries.length;
document.getElementById('adm-top-pts').textContent        = topPts.toLocaleString();
document.getElementById('adm-total-logins').textContent   = activity.filter(a => a.type === 'login').length;

renderUsersTable(users, '');
renderActivityFeed(activity);
renderCountriesChart(users);
```

}

function renderUsersTable(users, filter) {
const tbody = document.getElementById('adm-users-tbody');
if (!tbody) return;
const list = filter
? users.filter(u => u.username.toLowerCase().includes(filter.toLowerCase()) || u.email.toLowerCase().includes(filter.toLowerCase()))
: users;

```
tbody.innerHTML = list.length ? list.map(u => {
  const tp  = calcUserProgress(u);
  const geo = u.geo || {};
  return `<tr>
    <td class="td-name">${u.username}</td>
    <td>${u.email}</td>
    <td class="td-pts">${(u.pts || 0).toLocaleString()}</td>
    <td class="td-pct">${tp}%</td>
    <td class="td-loc">${[geo.city, geo.countryCode].filter(Boolean).join(', ') || '—'}</td>
    <td class="td-loc">${geo.ip || '—'}</td>
    <td class="td-time">${u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
    <td style="color:var(--amber)">${u.loginCount || 1}</td>
    <td><span style="color:${u.role==='admin'?'var(--red)':'var(--green-dim)';font-family:'Share Tech Mono'">${u.role.toUpperCase()}</span></td>
  </tr>`;
}).join('') : '<tr><td colspan="9" style="text-align:center;color:var(--grey)">No users found.</td></tr>';


}

function renderActivityFeed(activity) {
const el = document.getElementById('adm-activity-feed');
if (!el) return;
const users = Auth.getAllUsers();
el.innerHTML = activity.slice(0, 30).map(a => {
const user = users.find(u => u.id === a.userId);
const icon = { register:'🆕', login:'🔑', logout:'🚪', lesson:'✅', module:'🏆' }[a.type] || '▸';
return `<div class="activity-entry"> <span class="act-time">${a.timeLocal || a.time}</span> <span class="act-icon">${icon}</span> <span class="act-msg"><b style="color:var(--green-dim)">${user?.username || 'Unknown'}</b> — ${a.detail}</span> </div>`;
}).join(') || '<div class="activity-empty">No activity yet.</div>';
}

function renderCountriesChart(users) {
const chart = document.getElementById('adm-countries-chart');
if (!chart) return;
const counts = {};
users.forEach(u => {
const c = u.geo?.country || 'Unknown';
counts[c] = (counts[c] || 0) + 1;
});
const sorted = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0, 12);
const max    = sorted[0]?.[1] || 1;
chart.innerHTML = sorted.map(([country, count]) => ` <div class="admin-bar" title="${country}: ${count} user${count>1?'s':''}"> <div class="admin-bar-fill" style="height:${Math.round((count/max)*100)}%"></div> <span class="admin-bar-label">${country.slice(0,3)}</span> </div>`).join(');
}

function calcUserProgress(u) {
if (!u.progress?.mods) return 0;
let done = 0;
Object.values(u.progress.mods).forEach(m => {
done += Object.values(m.lessons || {}).filter(Boolean).length;
});
return Math.round((done / 60) * 100);
}

function filterUsers() {
const q = document.getElementById('adm-search').value;
renderUsersTable(Auth.getAllUsers(), q);
}

function exportCSV() {
const users = Auth.getAllUsers();
const rows  = [
['Username','Email','Points','Progress%','Country','City','IP','Last Login','Logins','Role'],
…users.map(u => [
u.username, u.email, u.pts||0, calcUserProgress(u),
u.geo?.country||', u.geo?.city||', u.geo?.ip||',
u.lastLogin||', u.loginCount||1, u.role
])
];

const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
const blob = new Blob([csv], { type: 'text/csv' });
const a    = 'document.createElement("a");
a.href     = URL.createObjectURL(blob);
a.download = `zerotrace_users_${new Date().toISOString().slice(0,10)}.csv`;
a.click();
}

return { open, close, render, filterUsers, exportCSV };
})();

// ══════════════════════════════════════════════════════
//   TOAST HELPER
// ══════════════════════════════════════════════════════
function authToast(msg, isError = false) {
let t = document.getElementById('auth-toast-el');
if (!t) {
t = document.createElement('div');
t.id = 'auth-toast-el';
t.className = 'auth-toast';
document.body.appendChild(t);
}
t.textContent  = msg;
t.className    = 'auth-toast' + (isError ? ' error' : '');
t.classList.add('show');
clearTimeout(t._timer);
t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ══════════════════════════════════════════════════════
//   INIT on DOM ready
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
// Decide: show gate or main
if (!Auth.isLoggedIn()) {
GatePage.show('login');
} else {
const u = Auth.currentUser();
Auth.updateNav();
ZT.render();
// Restore progress
if (u?.progress) {
const local = ZT.load();
if ((u.pts || 0) >= local.pts) {
localStorage.setItem('zt_v3', JSON.stringify(u.progress));
ZT.render();
}
}
}
});