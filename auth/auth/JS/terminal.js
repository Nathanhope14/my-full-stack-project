// ── ZERO TRACE · TERMINAL PAGE JS ──
const Terminal = (() => {
  let history = [];
  let histIdx  = -1;
  let outputEl, inputEl, pathEl;

  // ─── Boot the terminal page ───
  function init() {
    outputEl = document.getElementById('term-output');
    inputEl  = document.getElementById('term-input');
    pathEl   = document.getElementById('term-path');
    if (!outputEl || !inputEl) return;

    // Key listeners
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter')     { run(inputEl.value.trim()); inputEl.value = ''; histIdx = -1; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); navigateHistory(1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); navigateHistory(-1); }
      if (e.key === 'Tab')       { e.preventDefault(); autocomplete(); }
    });

    // Click anywhere in terminal window focuses input
    document.getElementById('term-window')?.addEventListener('click', () => inputEl.focus());

    updateTopbar();
    boot();
  }

  function navigateHistory(dir) {
    if (!history.length) return;
    histIdx = Math.max(-1, Math.min(history.length - 1, histIdx + dir));
    inputEl.value = histIdx >= 0 ? history[histIdx] : '';
  }

  function autocomplete() {
    const val = inputEl.value.trim().toLowerCase();
    const all = Object.keys(COMMANDS);
    const match = all.find(c => c.startsWith(val));
    if (match) inputEl.value = match;
  }

  // ─── Print helpers ───
  function print(text, cls = 't-output', delay = 0) {
    return new Promise(res => setTimeout(() => {
      const line = document.createElement('span');
      line.className = `term-line ${cls}`;
      line.innerHTML = text;
      outputEl.appendChild(line);
      outputEl.scrollTop = outputEl.scrollHeight;
      res();
    }, delay));
  }
  function blank(d = 0)  { return print('‎', 't-blank', d); }
  function sep(d = 0)    { return print('─'.repeat(60), 't-output', d); }

  async function printLines(lines, baseDelay = 40) {
    for (let i = 0; i < lines.length; i++) {
      await print(lines[i][0], lines[i][1], i * baseDelay);
    }
  }

  function updateTopbar() {
    const s   = ZT.load();
    const tp  = ZT.totalProgress();
    const el1 = document.getElementById('term-pts-display');
    const el2 = document.getElementById('term-lessons-display');
    const el3 = document.getElementById('term-pct-display');
    if (el1) el1.textContent = s.pts.toLocaleString();
    if (el2) el2.textContent = tp.done + '/60';
    if (el3) el3.textContent = tp.pct + '%';
  }

  // ─── Boot sequence ───
  async function boot() {
    outputEl.innerHTML = '';
    await printLines([
      ['ZERO TRACE CYBER LEGACY — SECURE SHELL v2.4.1', 't-header'],
      ['Copyright (c) 2024 ZeroTrace Labs. All rights reserved.', 't-output'],
      ['', 't-blank'],
      ['[*] Establishing encrypted session...', 't-output'],
      ['[*] Loading module registry...', 't-output'],
      ['[+] 6 modules loaded. 60 lessons indexed.', 't-success'],
      ['[*] Progress engine: ACTIVE', 't-success'],
      ['', 't-blank'],
      ['Type <span style="color:var(--green)">help</span> for available commands.  Type <span style="color:var(--amber)">status</span> for your progress.', 't-output'],
      ['', 't-blank'],
    ], 60);
    printPrompt();
  }

  function printPrompt() {
    const line = document.createElement('span');
    line.className = 'term-line t-prompt';
    line.innerHTML = '<span style="color:var(--green)">root@zerotrace</span>:<span style="color:var(--amber)">~/academy</span>$ <span class="cursor-blink"></span>';
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  // ─── Run a command ───
  function run(cmd) {
    if (!cmd) return;
    history.unshift(cmd);
    if (history.length > 50) history.pop();

    // Replace prompt line with typed command
    const prompts = outputEl.querySelectorAll('.t-prompt');
    const last = prompts[prompts.length - 1];
    if (last) last.innerHTML = `<span style="color:var(--green)">root@zerotrace</span>:<span style="color:var(--amber)">~/academy</span>$ <span style="color:var(--white)">${escHtml(cmd)}</span>`;

    const parts = cmd.split(/\s+/);
    const base  = parts[0].toLowerCase();
    const args  = parts.slice(1);

    const handler = COMMANDS[base];
    if (handler) {
      handler(args);
    } else {
      print(`bash: ${escHtml(base)}: command not found. Type <span style="color:var(--green)">help</span> for commands.`, 't-error');
      blank();
      printPrompt();
    }
    updateTopbar();
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ─── Commands ───
  const COMMANDS = {

    help: () => {
      blank();
      print('AVAILABLE COMMANDS', 't-header');
      const cmds = [
        ['help',              'Show this help message'],
        ['status',            'Show overall progress summary'],
        ['modules',           'List all modules and progress'],
        ['module &lt;id&gt;', 'Inspect a specific module (e.g. module 01)'],
        ['lessons &lt;id&gt;','Show lesson completion for a module'],
        ['start &lt;id&gt;',  'Open a module in the lesson viewer'],
        ['stats',             'Show detailed CTF statistics'],
        ['activity',          'Show recent activity log'],
        ['points',            'Show CTF points breakdown'],
        ['clear',             'Clear the terminal'],
        ['reset',             'Reset ALL progress (irreversible!)'],
        ['whoami',            'Show current operator info'],
        ['ping &lt;target&gt;','Simulate a ping to a target'],
        ['scan &lt;target&gt;','Simulate an Nmap scan'],
        ['whois &lt;domain&gt;','Simulate a WHOIS lookup'],
        ['ctf',               'Show your CTF badge and rank'],
      ];
      cmds.forEach(([c, d]) => {
        print(`  <span style="color:var(--green);display:inline-block;min-width:200px">${c}</span><span style="color:var(--grey)">${d}</span>`, 't-output');
      });
      blank();
      printPrompt();
    },

    clear: () => {
      outputEl.innerHTML = '';
      printPrompt();
    },

    whoami: () => {
      blank();
      printLines([
        ['OPERATOR PROFILE', 't-header'],
        [`  Handle   : <span style="color:var(--green)">ZeroTrace_Operator</span>`, 't-output'],
        [`  Platform : GeP ProTech Academy — Cohort 1`, 't-output'],
        [`  Location : Cameroon 🇨🇲`, 't-output'],
        [`  Mission  : Learn · Earn · Lead`, 't-output'],
        [`  Clearance: <span style="color:var(--amber)">${ZT.totalProgress().pct}%</span>`, 't-output'],
        [`  CTF Pts  : <span style="color:var(--amber)">${ZT.load().pts.toLocaleString()}</span>`, 't-output'],
      ], 30).then(() => { blank(); printPrompt(); });
    },

    status: () => {
      const tp = ZT.totalProgress();
      const s  = ZT.load();
      const mods = ZT.MODULES;
      const completed = mods.filter(m => ZT.modProgress(m.id).pct === 100).length;
      const active    = mods.filter(m => { const p = ZT.modProgress(m.id); return p.done > 0 && p.pct < 100; }).length;

      blank();
      print('PROGRESS STATUS REPORT', 't-header');
      blank();
      print(`  Overall Clearance  : <span style="color:var(--green)">${tp.pct}%</span>  [${barStr(tp.pct)}]`, 't-output');
      print(`  Lessons Completed  : <span style="color:var(--white)">${tp.done}</span> / 60`, 't-output');
      print(`  Modules Completed  : <span style="color:var(--white)">${completed}</span> / 6`, 't-output');
      print(`  Modules In Progress: <span style="color:var(--cyan)">${active}</span>`, 't-output');
      print(`  CTF Points Earned  : <span style="color:var(--amber)">${s.pts.toLocaleString()}</span>`, 't-output');
      blank();

      // Module mini-list
      mods.forEach(m => {
        const p  = ZT.modProgress(m.id);
        const st = ZT.status(m.id);
        const stColors = { locked:'var(--grey)', available:'var(--amber)', active:'var(--cyan)', completed:'var(--green)' };
        const stLabels = { locked:'LOCKED', available:'AVAILABLE', active:'IN PROGRESS', completed:'COMPLETE' };
        const col = stColors[st] || 'var(--grey)';
        const lbl = stLabels[st] || st.toUpperCase();
        print(`  MOD${m.num} ${m.title.padEnd(32)} [${barStr(p.pct, 16)}] <span style="color:${col}">${lbl}</span>`, 't-output');
      });
      blank();
      printPrompt();
    },

    modules: () => {
      blank();
      print('MODULE REGISTRY', 't-header');
      blank();
      ZT.MODULES.forEach(m => {
        const p  = ZT.modProgress(m.id);
        const st = ZT.status(m.id);
        const stColors = { locked:'var(--grey)', available:'var(--amber)', active:'var(--cyan)', completed:'var(--green)' };
        const col = stColors[st] || 'var(--grey)';
        print(`  <span style="color:var(--green-dim)">MOD${m.num}</span>  <span style="color:var(--white)">${m.title.padEnd(32)}</span>  ${p.done}/10  <span style="color:${col}">${st.toUpperCase()}</span>`, 't-output');
      });
      blank();
      print(`  Type <span style="color:var(--green)">module 01</span> for details  |  <span style="color:var(--green)">start 01</span> to begin`, 't-output');
      blank();
      printPrompt();
    },

    module: (args) => {
      const id = 'mod' + (args[0] || '01').replace(/^0*/, '').padStart(2, '0');
      const m  = ZT.MODULES.find(x => x.id === id);
      if (!m) { print(`[!] Module not found. Use: module 01 through module 06`, 't-error'); blank(); printPrompt(); return; }
      const p  = ZT.modProgress(m.id);
      const st = ZT.status(m.id);
      const s  = ZT.load();
      const lessonStates = s.mods[m.id]?.lessons || {};
      blank();
      print(`MODULE ${m.num}: ${m.title.toUpperCase()}`, 't-header');
      print(`  Status   : <span style="color:${st==='completed'?'var(--green)':st==='active'?'var(--cyan)':'var(--grey)'}">${st.toUpperCase()}</span>`, 't-output');
      print(`  Progress : ${p.done}/10 lessons  [${barStr(p.pct)}]  ${p.pct}%`, 't-output');
      print(`  Tags     : ${m.tags.join(' · ')}`, 't-output');
      print(`  Points   : <span style="color:var(--amber)">${m.points}</span> base + <span style="color:var(--amber)">${Math.floor(m.points*.5)}</span> completion bonus`, 't-output');
      blank();
      print('  LESSONS:', 't-output');
      for (let i = 1; i <= m.lessons; i++) {
        const done = lessonStates[i] || false;
        const icon = done ? '<span style="color:var(--green)">✓</span>' : '<span style="color:var(--grey)">○</span>';
        const lsnNum = (parseInt(m.num) - 1) * 10 + i;
        print(`  ${icon} Lesson ${lsnNum.toString().padStart(2,'0')} ${done ? '<span style="color:var(--green-dim)">COMPLETED</span>' : '<span style="color:var(--grey)">PENDING</span>'}`, 't-output');
      }
      blank();
      if (st !== 'locked') print(`  Type <span style="color:var(--green)">start ${m.num}</span> to open this module`, 't-output');
      blank();
      printPrompt();
    },

    lessons: (args) => {
      COMMANDS.module(args);
    },

    start: (args) => {
      const num = (args[0] || '01').replace(/^0*/, '').padStart(2, '0');
      const id  = 'mod' + num;
      const m   = ZT.MODULES.find(x => x.id === id);
      if (!m) { print(`[!] Module not found.`, 't-error'); blank(); printPrompt(); return; }
      if (!ZT.isUnlocked(id)) {
        print(`[!] Module ${m.num} is LOCKED. Complete the previous module first.`, 't-error');
        blank(); printPrompt(); return;
      }
      print(`[*] Opening Module ${m.num}: ${m.title}...`, 't-success');
      blank();
      printPrompt();
      setTimeout(() => {
        TerminalPage.close();
        LV.open(id, ZT.nextLesson(id));
      }, 600);
    },

    stats: () => {
      const s  = ZT.load();
      const tp = ZT.totalProgress();
      blank();
      print('CTF STATISTICS', 't-header');
      blank();
      print(`  Total CTF Points   : <span style="color:var(--amber)">${s.pts.toLocaleString()}</span>`, 't-output');
      const maxPts = ZT.MODULES.reduce((acc, m) => acc + m.points + Math.floor(m.points*.5), 0) + 60*10;
      print(`  Maximum Possible   : <span style="color:var(--grey)">${maxPts.toLocaleString()}</span>`, 't-output');
      print(`  Completion         : <span style="color:var(--green)">${tp.pct}%</span>`, 't-output');
      blank();
      print('  POINTS PER MODULE:', 't-output');
      ZT.MODULES.forEach(m => {
        const p  = ZT.modProgress(m.id);
        const st = ZT.status(m.id);
        const earned = p.done * 10 + (st === 'completed' ? Math.floor(m.points * .5) : 0);
        const maxM   = m.lessons * 10 + Math.floor(m.points * .5);
        const col    = st === 'completed' ? 'var(--green)' : st === 'active' ? 'var(--cyan)' : 'var(--grey)';
        print(`  MOD${m.num} ${m.title.padEnd(32)} <span style="color:${col}">${earned.toString().padStart(5)}</span> / ${maxM} pts`, 't-output');
      });
      blank();
      // Rank
      const rank = tp.pct === 100 ? 'ELITE OPERATOR' : tp.pct >= 80 ? 'SENIOR ANALYST' : tp.pct >= 60 ? 'SECURITY ANALYST' : tp.pct >= 40 ? 'JUNIOR ANALYST' : tp.pct >= 20 ? 'TRAINEE' : 'RECRUIT';
      print(`  Current Rank       : <span style="color:var(--amber)">${rank}</span>`, 't-output');
      blank();
      printPrompt();
    },

    activity: () => {
      const log = getActivityLog();
      blank();
      print('RECENT ACTIVITY LOG', 't-header');
      blank();
      if (!log.length) {
        print('  No activity recorded yet. Start a module to begin!', 't-output');
      } else {
        log.slice(0, 20).forEach(e => {
          print(`  <span style="color:var(--grey)">${e.time}</span>  ${e.icon}  <span style="color:var(--white)">${e.msg}</span>  <span style="color:var(--amber)">+${e.pts} pts</span>`, 't-output');
        });
      }
      blank();
      printPrompt();
    },

    points: () => {
      blank();
      print('CTF POINTS BREAKDOWN', 't-header');
      blank();
      ZT.MODULES.forEach(m => {
        const p  = ZT.modProgress(m.id);
        const st = ZT.status(m.id);
        const lessonPts = p.done * 10;
        const bonusPts  = st === 'completed' ? Math.floor(m.points * .5) : 0;
        const total     = lessonPts + bonusPts;
        blank();
        print(`  <span style="color:var(--green-dim)">MOD${m.num}</span> ${m.title}`, 't-output');
        print(`    Lessons completed: ${p.done}/10  × 10 pts = <span style="color:var(--amber)">${lessonPts} pts</span>`, 't-output');
        if (st === 'completed') {
          print(`    Module bonus:      <span style="color:var(--green)">+${Math.floor(m.points*.5)} pts</span>`, 't-output');
        }
        print(`    Subtotal: <span style="color:var(--amber)">${total} pts</span>`, 't-output');
      });
      blank();
      print(`  TOTAL: <span style="color:var(--amber);font-size:1em">${ZT.load().pts.toLocaleString()} CTF POINTS</span>`, 't-output');
      blank();
      printPrompt();
    },

    ctf: () => {
      const tp   = ZT.totalProgress();
      const s    = ZT.load();
      const rank = tp.pct === 100 ? 'ELITE OPERATOR' : tp.pct >= 80 ? 'SENIOR ANALYST' : tp.pct >= 60 ? 'SECURITY ANALYST' : tp.pct >= 40 ? 'JUNIOR ANALYST' : tp.pct >= 20 ? 'TRAINEE' : 'RECRUIT';
      blank();
      printLines([
        ['╔════════════════════════════════════════════╗', 't-success'],
        ['║          ZERO TRACE CTF BADGE              ║', 't-success'],
        ['╠════════════════════════════════════════════╣', 't-success'],
        [`║  Operator   : ZeroTrace_Operator           ║`, 't-output'],
        [`║  Rank       : ${rank.padEnd(28)}║`, 't-warn'],
        [`║  Points     : ${s.pts.toString().padEnd(28)}║`, 't-output'],
        [`║  Clearance  : ${(tp.pct + '%').padEnd(28)}║`, 't-output'],
        [`║  Lessons    : ${(tp.done + '/60').padEnd(28)}║`, 't-output'],
        ['╚════════════════════════════════════════════╝', 't-success'],
      ], 40).then(() => { blank(); printPrompt(); });
    },

    reset: (args) => {
      if (args[0] !== '--confirm') {
        print('[!] This will erase ALL progress and points!', 't-warn');
        print(`[?] To confirm, type: <span style="color:var(--red)">reset --confirm</span>`, 't-warn');
        blank(); printPrompt(); return;
      }
      localStorage.removeItem('zt_v3');
      localStorage.removeItem('zt_activity');
      print('[+] Progress reset. All data cleared.', 't-success');
      blank();
      ZT.render();
      updateTopbar();
      boot();
    },

    // ─ Simulated tools ─
    ping: (args) => {
      const target = args[0] || '8.8.8.8';
      blank();
      print(`PING ${target}: 56 data bytes`, 't-output');
      const times = [12, 11, 13, 12];
      let i = 0;
      const iv = setInterval(() => {
        if (i >= 4) {
          clearInterval(iv);
          blank();
          print(`--- ${target} ping statistics ---`, 't-output');
          print(`4 packets transmitted, 4 received, 0% packet loss`, 't-success');
          print(`rtt min/avg/max = 11/12/13 ms`, 't-output');
          blank();
          printPrompt();
          return;
        }
        print(`64 bytes from ${target}: icmp_seq=${i+1} ttl=64 time=${times[i]} ms`, 't-success');
        i++;
      }, 350);
    },

    scan: (args) => {
      const target = args[0] || '192.168.1.1';
      blank();
      print(`Starting Nmap scan of ${target}...`, 't-output');
      const ports = [
        { port: 22,   svc: 'ssh',   state: 'open', ver: 'OpenSSH 8.9' },
        { port: 80,   svc: 'http',  state: 'open', ver: 'Apache 2.4.52' },
        { port: 443,  svc: 'https', state: 'open', ver: 'nginx 1.22' },
        { port: 3306, svc: 'mysql', state: 'filtered', ver: '' },
        { port: 8080, svc: 'http-proxy', state: 'open', ver: '' },
      ];
      let i = 0;
      const iv = setInterval(() => {
        if (i >= ports.length) {
          clearInterval(iv);
          blank();
          print(`Nmap done: 1 IP address (1 host up) scanned in ${(Math.random()*2+1).toFixed(2)}s`, 't-success');
          blank();
          printPrompt();
          return;
        }
        const p = ports[i];
        const col = p.state === 'open' ? 'var(--green)' : 'var(--amber)';
        print(`  ${p.port.toString().padStart(5)}/tcp  <span style="color:${col}">${p.state.padEnd(8)}</span>  ${p.svc.padEnd(14)} ${p.ver}`, 't-output');
        i++;
      }, 200);
    },

    whois: (args) => {
      const domain = args[0] || 'example.com';
      blank();
      print(`[*] WHOIS lookup: ${domain}`, 't-output');
      blank();
      setTimeout(() => {
        printLines([
          [`Domain Name: ${domain.toUpperCase()}`, 't-success'],
          [`Registrar:   GoDaddy LLC`, 't-output'],
          [`Created:     2019-03-15T10:00:00Z`, 't-output'],
          [`Expires:     2025-03-15T10:00:00Z`, 't-output'],
          [`Updated:     2023-11-01T08:30:00Z`, 't-output'],
          [``, 't-blank'],
          [`Registrant Org:  [REDACTED FOR PRIVACY]`, 't-output'],
          [`Name Server:     ns1.example-dns.com`, 't-output'],
          [`Name Server:     ns2.example-dns.com`, 't-output'],
          [`DNSSEC:          unsigned`, 't-warn'],
        ], 40).then(() => { blank(); printPrompt(); });
      }, 300);
    },
  };

  // ─── Sidebar command buttons ───
  function sidebarCmd(cmd) {
    if (!inputEl) return;
    inputEl.value = cmd;
    run(cmd);
    inputEl.value = '';
  }

  // ─── Activity log helpers ───
  function getActivityLog() {
    try { return JSON.parse(localStorage.getItem('zt_activity')) || []; } catch { return []; }
  }
  function addActivity(msg, pts, icon = '▸') {
    const log  = getActivityLog();
    const now  = new Date();
    const time = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    log.unshift({ time, msg, pts, icon });
    if (log.length > 100) log.pop();
    localStorage.setItem('zt_activity', JSON.stringify(log));
  }

  // ─── Bar string helper ───
  function barStr(pct, len = 20) {
    const filled = Math.round((pct / 100) * len);
    const empty  = len - filled;
    return `<span style="color:var(--green)">${'█'.repeat(filled)}</span><span style="color:var(--grey)">${'░'.repeat(empty)}</span>`;
  }

  // Expose addActivity so progress.js can call it
  window.ZT_logActivity = addActivity;

  return { init, sidebarCmd, getActivityLog, addActivity };
})();

// ─── Terminal Page Controller ───
const TerminalPage = (() => {
  function open() {
    document.getElementById('main-page').style.display     = 'none';
    document.getElementById('lesson-page').style.display   = 'none';
    document.getElementById('progress-page').style.display = 'none';
    document.getElementById('terminal-page').classList.add('active');
    document.getElementById('terminal-page').style.display = 'block';
    Terminal.init();
    document.getElementById('term-input')?.focus();
  }
  function close() {
    document.getElementById('terminal-page').style.display = 'none';
    document.getElementById('terminal-page').classList.remove('active');
    document.getElementById('main-page').style.display = 'block';
    ZT.render();
  }
  return { open, close };
})();
