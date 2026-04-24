// ── Zero Trace Cyber Legacy – Progress Manager ──
const ZT = (() => {
  const KEY = 'zt_v3';

  const MODULES = [
    { id:'mod01', num:'01', title:'Reconnaissance & OSINT',     desc:'Master open-source intelligence. Find data hiding in plain sight.', lessons:10, points:500, tags:['OSINT','Recon','Intelligence'] },
    { id:'mod02', num:'02', title:'Network Fundamentals',       desc:'Deep-dive the OSI model, TCP/IP, protocols and packet analysis.',    lessons:10, points:600, tags:['Networking','TCP/IP','Wireshark'] },
    { id:'mod03', num:'03', title:'Linux for Hackers',          desc:'Command the terminal. Master Linux, scripting and CLI tools.',       lessons:10, points:700, tags:['Linux','Bash','CLI'] },
    { id:'mod04', num:'04', title:'Web Vulnerabilities',        desc:'Exploit SQLi, XSS, IDOR, CSRF and more. Break the web.',           lessons:10, points:800, tags:['SQLi','XSS','OWASP'] },
    { id:'mod05', num:'05', title:'Exploitation & Metasploit',  desc:'Exploit frameworks, payload delivery and post-exploitation.',       lessons:10, points:900, tags:['Metasploit','Payloads','Shells'] },
    { id:'mod06', num:'06', title:'Defense & Forensics',        desc:'Blue team: incident response, log analysis and digital forensics.', lessons:10, points:1000, tags:['DFIR','Forensics','Blue Team'] },
  ];

  function defaults() {
    const mods = {};
    MODULES.forEach(m => {
      const ls = {};
      for (let i = 1; i <= m.lessons; i++) ls[i] = false;
      mods[m.id] = { started:false, completed:false, lessons:ls };
    });
    return { mods, pts:0 };
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || defaults(); }
    catch { return defaults(); }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
    render();
  }

  function modProgress(id) {
    const s = load();
    const m = MODULES.find(x => x.id === id);
    const done = Object.values(s.mods[id]?.lessons || {}).filter(Boolean).length;
    return { done, total: m.lessons, pct: Math.round((done / m.lessons) * 100) };
  }

  function totalProgress() {
    let done = 0;
    MODULES.forEach(m => { done += modProgress(m.id).done; });
    return { done, total: 60, pct: Math.round((done / 60) * 100) };
  }

  function isUnlocked(id) {
    const idx = MODULES.findIndex(m => m.id === id);
    if (idx === 0) return true;
    return modProgress(MODULES[idx - 1].id).pct === 100;
  }

  function status(id) {
    const s = load();
    const p = modProgress(id);
    if (!isUnlocked(id)) return 'locked';
    if (p.pct === 100) return 'completed';
    if (s.mods[id]?.started) return 'active';
    return 'available';
  }

  function completeLesson(modId, lessonNum) {
    const s = load();
    if (!s.mods[modId]) return 0;
    if (s.mods[modId].lessons[lessonNum]) return 0;
    s.mods[modId].lessons[lessonNum] = true;
    s.mods[modId].started = true;
    let earned = 10;
    const allDone = Object.values(s.mods[modId].lessons).every(Boolean);
    if (allDone && !s.mods[modId].completed) {
      s.mods[modId].completed = true;
      const m = MODULES.find(x => x.id === modId);
      earned += Math.floor(m.points * 0.5);
    }
    s.pts += earned;
    save(s);
    return earned;
  }

  function render() {
    // Hero
    const tp = totalProgress();
    const s  = load();
    const f  = document.getElementById('hero-fill');
    const p  = document.getElementById('hero-pct');
    const l  = document.getElementById('hero-lessons');
    const pt = document.getElementById('hero-pts');
    const mc = document.getElementById('hero-mods');
    if (f)  f.style.width  = tp.pct + '%';
    if (p)  p.textContent  = tp.pct + '%';
    if (l)  l.textContent  = tp.done;
    if (pt) pt.textContent = s.pts.toLocaleString();
    if (mc) mc.textContent = MODULES.filter(m => status(m.id) === 'completed').length;

    // Cards
    MODULES.forEach(m => {
      const card = document.getElementById('card-' + m.id);
      if (!card) return;
      const st   = status(m.id);
      const prog = modProgress(m.id);

      const badge  = card.querySelector('.card-badge');
      const fill   = card.querySelector('.card-prog-fill');
      const ptxt   = card.querySelector('.card-prog-text');
      const btn    = card.querySelector('.btn-start');

      const labels = { locked:'LOCKED', available:'AVAILABLE', active:'IN PROGRESS', completed:'COMPLETED' };
      const bcls   = { locked:'badge-locked', available:'badge-available', active:'badge-active', completed:'badge-complete' };

      if (badge) { badge.className = 'card-badge ' + (bcls[st]||'badge-available'); badge.textContent = labels[st]||'AVAILABLE'; }
      if (fill)  fill.style.width = prog.pct + '%';
      if (ptxt)  ptxt.textContent = prog.done + '/' + prog.total + ' lessons';

      card.className = 'module-card' + (st==='locked'?' locked':'') + (st==='completed'?' completed':'');

      if (btn) {
        btn.className = 'btn-start' + (st==='locked'?' locked-btn':'');
        if (st === 'locked')       { btn.textContent = '[ LOCKED — Complete Previous Module ]'; btn.onclick = null; }
        else if (st === 'completed') { btn.textContent = '[ REVIEW MODULE ]'; btn.onclick = () => LV.open(m.id, 1); }
        else if (st === 'active')    { btn.textContent = '[ CONTINUE MODULE → ]'; btn.onclick = () => LV.open(m.id, nextLesson(m.id)); }
        else                         { btn.textContent = '[ START MODULE → ]'; btn.onclick = () => LV.open(m.id, 1); }
      }
    });
  }

  function nextLesson(modId) {
    const s = load();
    const lessons = s.mods[modId]?.lessons || {};
    for (let i = 1; i <= 10; i++) { if (!lessons[i]) return i; }
    return 1;
  }

  function toast(msg, pts) {
    let t = document.getElementById('zt-toast');
    if (!t) { t = document.createElement('div'); t.id = 'zt-toast'; t.className = 'ctf-toast'; document.body.appendChild(t); }
    t.innerHTML = `<div>🏆 ${msg}</div><span class="ctf-pts">+${pts} CTF PTS</span>`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3800);
  }

  return { MODULES, load, save, modProgress, totalProgress, isUnlocked, status, completeLesson, render, nextLesson, toast };
})();
