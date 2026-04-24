// ── js/auth-modal.js — Login / Register Modal ──
const AuthModal = (() => {

  // ── Inject modal HTML into page ──
  function inject() {
    if (document.getElementById('auth-modal')) return;
    document.body.insertAdjacentHTML('beforeend', `
<!-- AUTH MODAL -->
<div id="auth-modal" style="display:none">
  <div class="am-overlay" onclick="AuthModal.close()"></div>
  <div class="am-box">

    <button class="am-close" onclick="AuthModal.close()">✕</button>

    <div class="am-header">
      <div class="am-logo">ZERO TRACE</div>
      <div class="am-tabs">
        <button class="am-tab active" id="tab-login"    onclick="AuthModal.showTab('login')">LOGIN</button>
        <button class="am-tab"        id="tab-register" onclick="AuthModal.showTab('register')">REGISTER</button>
      </div>
    </div>

    <!-- LOGIN FORM -->
    <form id="form-login" class="am-form" onsubmit="AuthModal.submitLogin(event)">
      <div class="am-field">
        <label>EMAIL</label>
        <input type="email" id="login-email" placeholder="operator@example.com" required autocomplete="email">
      </div>
      <div class="am-field">
        <label>PASSWORD</label>
        <input type="password" id="login-pass" placeholder="••••••••" required autocomplete="current-password">
      </div>
      <div class="am-error" id="login-error"></div>
      <button type="submit" class="am-btn" id="login-btn">[ LOGIN ]</button>
      <div class="am-hint">No account? <span onclick="AuthModal.showTab('register')">Register here →</span></div>
    </form>

    <!-- REGISTER FORM -->
    <form id="form-register" class="am-form" style="display:none" onsubmit="AuthModal.submitRegister(event)">
      <div class="am-field">
        <label>USERNAME</label>
        <input type="text" id="reg-username" placeholder="ZeroTrace_Operator" required minlength="3" maxlength="20" autocomplete="username">
      </div>
      <div class="am-field">
        <label>EMAIL</label>
        <input type="email" id="reg-email" placeholder="operator@example.com" required autocomplete="email">
      </div>
      <div class="am-field">
        <label>PASSWORD</label>
        <input type="password" id="reg-pass" placeholder="Min 6 characters" required minlength="6" autocomplete="new-password">
      </div>
      <div class="am-field">
        <label>CONFIRM PASSWORD</label>
        <input type="password" id="reg-pass2" placeholder="Repeat password" required autocomplete="new-password">
      </div>
      <div class="am-error" id="reg-error"></div>
      <button type="submit" class="am-btn" id="reg-btn">[ CREATE ACCOUNT ]</button>
      <div class="am-hint">Already registered? <span onclick="AuthModal.showTab('login')">Login here →</span></div>
    </form>

  </div>
</div>

<!-- LEADERBOARD MODAL -->
<div id="lb-modal" style="display:none">
  <div class="am-overlay" onclick="AuthModal.closeLeaderboard()"></div>
  <div class="am-box" style="max-width:600px">
    <button class="am-close" onclick="AuthModal.closeLeaderboard()">✕</button>
    <div class="am-header">
      <div class="am-logo">🏆 LEADERBOARD</div>
    </div>
    <div id="lb-content" style="padding:1rem 0">
      <div style="text-align:center;color:var(--grey);font-family:var(--font-mono);font-size:.75rem">Loading...</div>
    </div>
  </div>
</div>`);

    injectStyles();
  }

  function injectStyles() {
    if (document.getElementById('am-styles')) return;
    const style = document.createElement('style');
    style.id = 'am-styles';
    style.textContent = `
.am-overlay{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:2000;backdrop-filter:blur(4px)}
#auth-modal,#lb-modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:2001}
.am-box{position:relative;background:var(--bg-panel);border:1px solid var(--green-dim);width:min(440px,95vw);box-shadow:0 0 40px rgba(0,255,65,.15);z-index:2002;animation:am-in .25s ease}
@keyframes am-in{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
.am-close{position:absolute;top:.8rem;right:1rem;background:transparent;border:none;color:var(--grey);font-size:1rem;cursor:pointer;font-family:var(--font-mono);transition:color .2s}
.am-close:hover{color:var(--red)}
.am-header{background:rgba(0,255,65,.04);border-bottom:1px solid var(--border);padding:1.2rem 1.5rem}
.am-logo{font-family:var(--font-display);font-size:.85rem;color:var(--green);letter-spacing:.15em;text-shadow:0 0 8px var(--green);margin-bottom:.8rem}
.am-tabs{display:flex;gap:.5rem}
.am-tab{background:transparent;border:1px solid var(--border);color:var(--grey);font-family:var(--font-mono);font-size:.7rem;padding:.3rem .9rem;cursor:pointer;letter-spacing:.08em;transition:all .2s}
.am-tab.active{border-color:var(--green);color:var(--green);background:var(--green-faint)}
.am-form{padding:1.5rem}
.am-field{margin-bottom:1rem}
.am-field label{display:block;font-family:var(--font-mono);font-size:.6rem;color:var(--grey);letter-spacing:.1em;margin-bottom:.35rem}
.am-field input{width:100%;background:#000;border:1px solid var(--border);color:var(--white);font-family:var(--font-mono);font-size:.82rem;padding:.6rem .9rem;outline:none;transition:border-color .2s;caret-color:var(--green)}
.am-field input:focus{border-color:var(--green-dim)}
.am-field input::placeholder{color:var(--grey);opacity:.5}
.am-error{font-family:var(--font-mono);font-size:.7rem;color:var(--red);margin-bottom:.8rem;min-height:1rem;display:none}
.am-error.show{display:block}
.am-btn{width:100%;padding:.7rem;background:var(--green-faint);border:1px solid var(--green);color:var(--green);font-family:var(--font-mono);font-size:.8rem;letter-spacing:.1em;cursor:pointer;transition:background .2s,box-shadow .2s;margin-bottom:.8rem}
.am-btn:hover{background:rgba(0,255,65,.2);box-shadow:0 0 15px rgba(0,255,65,.2)}
.am-btn:disabled{opacity:.5;cursor:not-allowed}
.am-hint{font-family:var(--font-mono);font-size:.65rem;color:var(--grey);text-align:center}
.am-hint span{color:var(--green-dim);cursor:pointer;text-decoration:underline}
.am-hint span:hover{color:var(--green)}
/* Nav auth buttons */
.nav-auth-btn{font-family:var(--font-mono);font-size:.72rem;padding:.3rem .8rem;border:1px solid var(--green-dim);color:var(--green);background:transparent;cursor:pointer;transition:background .2s;letter-spacing:.05em}
.nav-auth-btn:hover{background:var(--green-glow)}
.nav-user-info{font-family:var(--font-mono);font-size:.7rem;color:var(--grey);display:flex;align-items:center;gap:.8rem}
.nav-user-info .u-name{color:var(--green)}
/* Leaderboard */
.lb-row{display:grid;grid-template-columns:40px 1fr 80px 80px;gap:.5rem;padding:.5rem 1rem;border-bottom:1px solid var(--border);font-family:var(--font-mono);font-size:.72rem;align-items:center;transition:background .15s}
.lb-row:hover{background:var(--green-glow)}
.lb-row.lb-head{color:var(--green-dim);font-size:.62rem;letter-spacing:.1em;border-bottom:2px solid var(--border)}
.lb-rank{color:var(--amber);font-weight:bold}
.lb-rank.top1{color:var(--green);font-size:.9rem}
.lb-name{color:var(--white)}
.lb-pts{color:var(--amber);text-align:right}
.lb-pct{color:var(--green-dim);text-align:right}`;
    document.head.appendChild(style);
  }

  // ── Tab switching ──
  function showTab(tab) {
    document.getElementById('form-login').style.display    = tab === 'login'    ? 'block' : 'none';
    document.getElementById('form-register').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('tab-login').classList.toggle('active',    tab === 'login');
    document.getElementById('tab-register').classList.toggle('active', tab === 'register');
    clearErrors();
  }

  function clearErrors() {
    ['login-error','reg-error'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.textContent = ''; el.classList.remove('show'); }
    });
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('show'); }
  }

  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled    = loading;
    btn.textContent = loading ? '[ CONNECTING... ]' : (btnId === 'login-btn' ? '[ LOGIN ]' : '[ CREATE ACCOUNT ]');
  }

  // ── Open / Close ──
  function open(tab = 'login') {
    inject();
    document.getElementById('auth-modal').style.display = 'flex';
    showTab(tab);
  }

  function close() {
    const m = document.getElementById('auth-modal');
    if (m) m.style.display = 'none';
  }

  // ── Submit login ──
  async function submitLogin(e) {
    e.preventDefault();
    clearErrors();
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value;
    setLoading('login-btn', true);
    const r = await API.login(email, pass);
    setLoading('login-btn', false);
    if (!r.ok) { showError('login-error', r.error); return; }
    close();
    updateNav();
    ZT.render();
    showToast('Welcome back, ' + r.data.user.username + '!');
  }

  // ── Submit register ──
  async function submitRegister(e) {
    e.preventDefault();
    clearErrors();
    const username = document.getElementById('reg-username').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const pass     = document.getElementById('reg-pass').value;
    const pass2    = document.getElementById('reg-pass2').value;
    if (pass !== pass2) { showError('reg-error', 'Passwords do not match.'); return; }
    setLoading('reg-btn', true);
    const r = await API.register(username, email, pass);
    setLoading('reg-btn', false);
    if (!r.ok) { showError('reg-error', r.error); return; }
    close();
    updateNav();
    ZT.render();
    showToast('Account created! Welcome, ' + r.data.user.username + '!');
  }

  // ── Update nav bar ──
  function updateNav() {
    const area = document.getElementById('nav-auth-area');
    if (!area) return;
    if (API.isLoggedIn()) {
      const r = API.getMe();
      r.then(res => {
        const name = res.ok ? res.data.user.username : 'Operator';
        area.innerHTML = `
          <div class="nav-user-info">
            <span>👤 <span class="u-name">${name}</span></span>
            <button class="nav-auth-btn" onclick="AuthModal.openLeaderboard()">🏆</button>
            <button class="nav-auth-btn" onclick="API.logout();AuthModal.updateNav()">LOGOUT</button>
          </div>`;
      });
    } else {
      area.innerHTML = `
        <button class="nav-auth-btn" onclick="AuthModal.open('login')">LOGIN</button>
        <button class="nav-auth-btn" style="border-color:var(--amber);color:var(--amber)" onclick="AuthModal.open('register')">REGISTER</button>`;
    }
  }

  // ── Leaderboard ──
  async function openLeaderboard() {
    inject();
    document.getElementById('lb-modal').style.display = 'flex';
    const content = document.getElementById('lb-content');
    content.innerHTML = '<div style="text-align:center;color:var(--grey);font-family:var(--font-mono);font-size:.75rem;padding:2rem">[ Loading leaderboard... ]</div>';
    const r = await API.leaderboard();
    if (!r.ok) { content.innerHTML = `<div style="color:var(--red);font-family:var(--font-mono);padding:1rem">${r.error}</div>`; return; }
    const rows = r.data;
    content.innerHTML = `
      <div class="lb-row lb-head"><span>RANK</span><span>OPERATOR</span><span>POINTS</span><span>CLEAR%</span></div>
      ${rows.map(u => `
        <div class="lb-row">
          <span class="lb-rank ${u.rank===1?'top1':''}">${u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : '#'+u.rank}</span>
          <span class="lb-name">${u.username}</span>
          <span class="lb-pts">${u.pts.toLocaleString()}</span>
          <span class="lb-pct">${u.clearance || 0}%</span>
        </div>`).join('')}
      ${rows.length === 0 ? '<div style="text-align:center;color:var(--grey);font-family:var(--font-mono);font-size:.75rem;padding:2rem">No scores yet. Be the first!</div>' : ''}`;
  }

  function closeLeaderboard() {
    const m = document.getElementById('lb-modal');
    if (m) m.style.display = 'none';
  }

  function showToast(msg) {
    if (window.ZT?.toast) { ZT.toast(msg, ''); return; }
    let t = document.getElementById('zt-toast');
    if (!t) { t = document.createElement('div'); t.id = 'zt-toast'; t.className = 'ctf-toast'; document.body.appendChild(t); }
    t.innerHTML = `<div>${msg}</div>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // Auto-init nav on page load
  document.addEventListener('DOMContentLoaded', () => {
    inject();
    updateNav();
    if (API.isLoggedIn()) API.loadProgress();
  });

  return { open, close, showTab, submitLogin, submitRegister, updateNav, openLeaderboard, closeLeaderboard };
})();
