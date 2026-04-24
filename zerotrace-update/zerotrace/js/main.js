// ── Zero Trace Cyber Legacy — Main Controller ──
document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ──
  const loader = document.getElementById('loader');
  setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 2000);

  // ── RENDER INITIAL STATE ──
  ZT.render();

  // --- Admin ---
  if (User.role === "admin") {
    window.location.href = "admin.html";
  }
  
  // ── NAV SCROLL BEHAVIOUR ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.style.borderBottomColor = window.scrollY > 50 ? 'rgba(0,255,65,.15)' : 'var(--border)';
  });

  // ── SMOOTH NAV LINKS ──
  document.querySelectorAll('.nav-scroll').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── TYPING ANIMATION for hero subtitle ──
  const typeEl = document.getElementById('hero-type');
  if (typeEl) {
    const phrases = [
      'Cybersecurity Education for African Learners',
      'Learn Offensive & Defensive Security',
      'From Recon to Forensics — Master It All',
      'Built by ENG Nathan Hope and ENG CLANCY FAVOUR · Bamenda . Cameroon'
    ];
    let pi = 0, ci = 0, deleting = false;
    function type() {
      const phrase = phrases[pi];
      typeEl.textContent = deleting
        ? phrase.substring(0, ci--)
        : phrase.substring(0, ci++);
      let delay = deleting ? 40 : 80;
      if (!deleting && ci === phrase.length + 1) { delay = 2000; deleting = true; }
      if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
      setTimeout(type, delay);
    }
    setTimeout(type, 1500);
  }

  // ── CARD HOVER PARTICLES ──
  document.querySelectorAll('.module-card:not(.locked)').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = 'linear-gradient(135deg, var(--bg-card), rgba(0,255,65,0.03))';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = 'var(--bg-card)';
    });
  });

  // ── INTERSECTION OBSERVER — fade in cards ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.module-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity .5s ${i * 0.08}s ease, transform .5s ${i * 0.08}s ease, border-color .3s, box-shadow .3s`;
    observer.observe(card);
  });

  // ── TERMINAL BOOT SEQUENCE ──
  const bootEl = document.getElementById('boot-terminal');
  if (bootEl) {
    const lines = [
      { t: 'output', txt: '[*] Zero Trace Cyber Legacy — Initialising...' },
      { t: 'output', txt: '[*] Loading curriculum modules...' },
      { t: 'hl',     txt: '[+] Module 01: Reconnaissance & OSINT       LOADED' },
      { t: 'hl',     txt: '[+] Module 02: Network Fundamentals          LOADED' },
      { t: 'hl',     txt: '[+] Module 03: Linux for Hackers             LOADED' },
      { t: 'hl',     txt: '[+] Module 04: Web Vulnerabilities           LOADED' },
      { t: 'hl',     txt: '[+] Module 05: Exploitation & Metasploit     LOADED' },
      { t: 'hl',     txt: '[+] Module 06: Defense & Forensics           LOADED' },
      { t: 'output', txt: '[*] 60 lessons ready. Progress tracking: ACTIVE' },
      { t: 'prompt', txt: 'root@zerotrace:~$ SELECT YOUR CLEARANCE LEVEL...' },
    ];
    let li = 0;
    function printLine() {
      if (li >= lines.length) return;
      const div = document.createElement('div');
      div.className = lines[li].t === 'prompt' ? 'prompt' : lines[li].t;
      div.textContent = lines[li].txt;
      bootEl.appendChild(div);
      bootEl.scrollTop = bootEl.scrollHeight;
      li++;
      setTimeout(printLine, 120);
    }
    setTimeout(printLine, 2200);
  }
});
