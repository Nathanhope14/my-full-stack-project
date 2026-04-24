// ── ZERO TRACE · PROGRESS PAGE JS ──
const ProgressPage = (() => {

  // ─── Open / Close ───
  function open() {
    document.getElementById('main-page').style.display     = 'none';
    document.getElementById('lesson-page').style.display   = 'none';
    document.getElementById('terminal-page').style.display = 'none';
    document.getElementById('progress-page').classList.add('active');
    document.getElementById('progress-page').style.display = 'block';
    render();
    window.scrollTo(0, 0);
  }

  function close() {
    document.getElementById('progress-page').style.display = 'none';
    document.getElementById('progress-page').classList.remove('active');
    document.getElementById('main-page').style.display = 'block';
    ZT.render();
  }

  // ─── Main render ───
  function render() {
    renderStats();
    renderOverall();
    renderModuleRows();
    renderLessonBreakdown();
    renderActivity();
    renderPtsBreakdown();
  }

  // ─── Overall stats ───
  function renderStats() {
    const s    = ZT.load();
    const tp   = ZT.totalProgress();
    const mods = ZT.MODULES;
    const completed = mods.filter(m => ZT.modProgress(m.id).pct === 100).length;
    const active    = mods.filter(m => { const p = ZT.modProgress(m.id); return p.done > 0 && p.pct < 100; }).length;
    const maxPts    = mods.reduce((a, m) => a + m.points + Math.floor(m.points * .5), 0) + 60 * 10;
    const rank      = getRank(tp.pct);

    set('pg-total-lessons', tp.done);
    set('pg-total-modules', completed + '/6');
    set('pg-ctf-pts', s.pts.toLocaleString());
    set('pg-rank', rank);
    set('pg-pct', tp.pct + '%');
    set('pg-active', active);
  }

  // ─── Overall progress bar ───
  function renderOverall() {
    const tp = ZT.totalProgress();
    const fill = document.getElementById('pg-overall-fill');
    if (fill) fill.style.width = tp.pct + '%';
    set('pg-overall-pct', tp.pct + '%');
    set('pg-overall-lessons', tp.done + ' / 60 lessons');
  }

  // ─── Module rows ───
  function renderModuleRows() {
    const container = document.getElementById('pg-module-rows');
    if (!container) return;
    container.innerHTML = '';
    const s = ZT.load();

    ZT.MODULES.forEach(m => {
      const p   = ZT.modProgress(m.id);
      const st  = ZT.status(m.id);
      const row = document.createElement('div');

      const stTagClass = { locked:'tag-locked', available:'tag-available', active:'tag-active', completed:'tag-complete' }[st] || 'tag-available';
      const stLabel    = { locked:'LOCKED', available:'AVAILABLE', active:'IN PROGRESS', completed:'COMPLETED' }[st] || st.toUpperCase();

      const earnedPts = p.done * 10 + (st === 'completed' ? Math.floor(m.points * .5) : 0);
      const maxPts    = m.lessons * 10 + Math.floor(m.points * .5);

      row.className  = 'prog-mod-row' + (st === 'locked' ? ' locked' : '') + (st === 'completed' ? ' completed' : '');
      row.innerHTML  = `
        <div>
          <div class="pmr-num">MODULE ${m.num}</div>
        </div>
        <div>
          <div class="pmr-title">${m.title}</div>
          <span class="pmr-status-tag ${stTagClass}">${stLabel}</span>
        </div>
        <div class="pmr-bar-wrap">
          <div class="pmr-bar"><div class="pmr-bar-fill" style="width:${p.pct}%"></div></div>
          <div class="pmr-bar-text"><span>${p.done}/${p.total} lessons</span><span>${p.pct}%</span></div>
        </div>
        <div class="pmr-pts">
          <span style="color:var(--amber)">${earnedPts.toLocaleString()} pts</span>
          <span class="pmr-pts-earned">of ${maxPts} max</span>
        </div>`;

      if (st !== 'locked') {
        row.style.cursor = 'pointer';
        row.title = `Open ${m.title}`;
        row.onclick = () => { ProgressPage.close(); LV.open(m.id, ZT.nextLesson ? ZT.nextLesson(m.id) : 1); };
      }
      container.appendChild(row);
    });
  }

  // ─── Lesson breakdown (accordion) ───
  function renderLessonBreakdown() {
    const container = document.getElementById('pg-lessons-breakdown');
    if (!container) return;
    container.innerHTML = '';

    const ALL_MODS = [window.MOD01, window.MOD02, window.MOD03, window.MOD04, window.MOD05, window.MOD06];
    const s = ZT.load();

    ZT.MODULES.forEach((m, mi) => {
      const p    = ZT.modProgress(m.id);
      const st   = ZT.status(m.id);
      const modDef = ALL_MODS[mi];
      const block  = document.createElement('div');
      block.className = 'pls-module-block';

      const header = document.createElement('div');
      header.className = 'pls-mod-header';
      header.innerHTML = `
        <div class="pls-mod-header-left">
          <span class="pls-mod-num">MOD ${m.num}</span>
          <span class="pls-mod-name">${m.title}</span>
        </div>
        <span class="pls-mod-pct">${p.pct}%</span>
        <span class="pls-chevron">▶</span>`;

      const grid = document.createElement('div');
      grid.className = 'pls-lessons-grid';

      if (modDef && modDef.lessons) {
        Object.keys(modDef.lessons).forEach(num => {
          const n      = parseInt(num);
          const lsn    = modDef.lessons[n];
          const isDone = s.mods[m.id]?.lessons?.[n] || false;
          const lsnGlobal = (mi * 10) + n;

          const cell = document.createElement('div');
          cell.className = 'pls-lesson-cell' + (isDone ? ' done' : '');

          cell.innerHTML = `
            <span class="pls-check">${isDone ? '✓' : ''}</span>
            <span class="pls-lesson-num">${lsnGlobal.toString().padStart(2,'0')}.</span>
            <span class="pls-lesson-title" title="${lsn.title}">${lsn.title}</span>`;

          if (st !== 'locked') {
            cell.onclick = () => { ProgressPage.close(); LV.open(m.id, n); };
            cell.title = `Go to: ${lsn.title}`;
          }
          grid.appendChild(cell);
        });
      } else {
        // No lesson data loaded yet (locked modules)
        for (let i = 1; i <= m.lessons; i++) {
          const lsnGlobal = (mi * 10) + i;
          const isDone    = s.mods[m.id]?.lessons?.[i] || false;
          const cell = document.createElement('div');
          cell.className = 'pls-lesson-cell' + (isDone ? ' done' : '');
          cell.innerHTML = `
            <span class="pls-check">${isDone ? '✓' : ''}</span>
            <span class="pls-lesson-num">${lsnGlobal.toString().padStart(2,'0')}.</span>
            <span class="pls-lesson-title">Lesson ${lsnGlobal}</span>`;
          grid.appendChild(cell);
        }
      }

      // Toggle accordion
      header.onclick = () => {
        header.classList.toggle('open');
        grid.classList.toggle('open');
      };

      block.appendChild(header);
      block.appendChild(grid);
      container.appendChild(block);

      // Auto-open the active module
      if (st === 'active') {
        header.classList.add('open');
        grid.classList.add('open');
      }
    });
  }

  // ─── Activity log ───
  function renderActivity() {
    const container = document.getElementById('pg-activity-log');
    if (!container) return;
    container.innerHTML = '';

    const log = getActivityLog();
    if (!log.length) {
      container.innerHTML = '<div class="activity-empty">[ No activity recorded yet. Start a module to begin! ]</div>';
      return;
    }
    log.slice(0, 30).forEach(e => {
      const div = document.createElement('div');
      div.className = 'activity-entry';
      div.innerHTML = `
        <span class="act-time">${e.time}</span>
        <span class="act-icon">${e.icon || '▸'}</span>
        <span class="act-msg">${e.msg}</span>
        <span class="act-pts">+${e.pts} pts</span>`;
      container.appendChild(div);
    });
  }

  // ─── Points breakdown ───
  function renderPtsBreakdown() {
    const container = document.getElementById('pg-pts-breakdown');
    if (!container) return;
    container.innerHTML = '';

    ZT.MODULES.forEach(m => {
      const p      = ZT.modProgress(m.id);
      const st     = ZT.status(m.id);
      const earned = p.done * 10 + (st === 'completed' ? Math.floor(m.points * .5) : 0);
      const maxPts = m.lessons * 10 + Math.floor(m.points * .5);

      const card = document.createElement('div');
      card.className = 'pts-card';
      card.innerHTML = `
        <div class="pts-card-mod">MODULE ${m.num}</div>
        <div class="pts-card-val">${earned.toLocaleString()}</div>
        <div class="pts-card-max">/ ${maxPts} pts</div>`;
      container.appendChild(card);
    });
  }

  // ─── Helpers ───
  function set(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function getRank(pct) {
    if (pct === 100) return 'ELITE OPERATOR';
    if (pct >= 80)   return 'SENIOR ANALYST';
    if (pct >= 60)   return 'SECURITY ANALYST';
    if (pct >= 40)   return 'JUNIOR ANALYST';
    if (pct >= 20)   return 'TRAINEE';
    return 'RECRUIT';
  }

  function getActivityLog() {
    try { return JSON.parse(localStorage.getItem('zt_activity')) || []; } catch { return []; }
  }

  function confirmReset() {
    if (confirm('Reset ALL progress and CTF points? This cannot be undone.')) {
      localStorage.removeItem('zt_v3');
      localStorage.removeItem('zt_activity');
      ZT.render();
      render();
      alert('Progress has been reset.');
    }
  }

  return { open, close, render, confirmReset };
})();

// ─── Hook into ZT.completeLesson to log activity ───
const _origComplete = ZT.completeLesson.bind(ZT);
ZT.completeLesson = function(modId, lessonNum) {
  const pts = _origComplete(modId, lessonNum);
  if (pts > 0 && window.ZT_logActivity) {
    const m   = ZT.MODULES.find(x => x.id === modId);
    const p   = ZT.modProgress(modId);
    const mod = window['MOD' + modId.replace('mod','').padStart(2,'0').toUpperCase()];
    const lsnTitle = mod?.lessons?.[lessonNum]?.title || `Lesson ${lessonNum}`;
    const icon = p.pct === 100 ? '🏆' : '✅';
    const msg  = p.pct === 100
      ? `Completed MODULE ${m?.num}: ${m?.title}`
      : `Completed: ${lsnTitle} (${m?.title})`;
    ZT_logActivity(msg, pts, icon);
  }
  return pts;
};
