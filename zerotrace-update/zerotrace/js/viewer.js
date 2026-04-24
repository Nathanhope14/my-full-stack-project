// ── Zero Trace Cyber Legacy – Lesson Viewer ──
const LV = (() => {
  let curMod  = null;
  let curNum  = 1;
  let modData = null;

  const ALL_MODS = () => [window.MOD01, window.MOD02, window.MOD03, window.MOD04, window.MOD05, window.MOD06];

  function getModData(modId) {
    return ALL_MODS().find(m => m && m.id === modId) || null;
  }

  function open(modId, lessonNum) {
    if (!ZT.isUnlocked(modId)) {
      ZT.toast('Module locked!', 0);
      return;
    }
    curMod  = modId;
    curNum  = lessonNum || 1;
    modData = getModData(modId);
    if (!modData) return;

    document.getElementById('main-page').style.display  = 'none';
    document.getElementById('lesson-page').style.display = 'block';
    document.getElementById('lesson-page').classList.add('active');

    buildSidebar();
    loadLesson(curNum);
    window.scrollTo(0, 0);
  }

  function buildSidebar() {
    const sidebar = document.getElementById('lesson-sidebar');
    if (!sidebar || !modData) return;

    const s = ZT.load();
    const lessons = modData.lessons;

    sidebar.innerHTML = `<div class="sidebar-mod-title">MODULE ${modData.id.replace('mod','').padStart(2,'0')} — ${modData.title.toUpperCase()}</div>`;

    Object.keys(lessons).forEach(num => {
      const n    = parseInt(num);
      const lsn  = lessons[n];
      const done = ZT.isLessonCompleted ? ZT.isLessonCompleted(curMod, n) : (s.mods[curMod]?.lessons?.[n] || false);
      const isDone   = s.mods[curMod]?.lessons?.[n] || false;
      const isActive = n === curNum;

      const el = document.createElement('div');
      el.className = 'sidebar-lesson' + (isActive ? ' active' : '') + (isDone ? ' done' : '');
      el.innerHTML = `
        <span class="l-check">${isDone ? '✓' : ''}</span>
        <span>${(n + (parseInt(curMod.replace('mod','')) - 1) * 10).toString().padStart(2,'0')}. ${lsn.title}</span>`;
      el.onclick = () => loadLesson(n);
      sidebar.appendChild(el);
    });

    // Back button at bottom
    const back = document.createElement('div');
    back.style.cssText = 'padding:1.5rem 1.5rem 0;border-top:1px solid var(--border);margin-top:1rem';
    back.innerHTML = `<button onclick="LV.close()" style="background:transparent;border:1px solid var(--border);color:var(--grey);font-family:var(--font-mono);font-size:.7rem;padding:.5rem 1rem;cursor:pointer;width:100%;transition:color .2s,border-color .2s" onmouseover="this.style.color='var(--green)';this.style.borderColor='var(--green-dim)'" onmouseout="this.style.color='var(--grey)';this.style.borderColor='var(--border)'">← BACK TO HOME</button>`;
    sidebar.appendChild(back);
  }

  function loadLesson(num) {
    curNum = num;
    const lsn = modData?.lessons?.[num];
    if (!lsn) return;

    const content = document.getElementById('lesson-content-area');
    if (!content) return;

    content.innerHTML = lsn.html + buildFooter(num);

    // Re-attach complete button state
    const s = ZT.load();
    const isDone = s.mods[curMod]?.lessons?.[num] || false;
    const btn = content.querySelector('.btn-complete');
    if (btn && isDone) { btn.classList.add('done'); btn.textContent = 'COMPLETED ✓'; }

    // Highlight active sidebar item
    document.querySelectorAll('.sidebar-lesson').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === num);
    });

    window.scrollTo(0, 0);
  }

  function buildFooter(num) {
    const totalLessons = Object.keys(modData.lessons).length;
    const hasPrev = num > 1;
    const hasNext = num < totalLessons;
    const modIdx  = ZT.MODULES.findIndex(m => m.id === curMod);
    const hasNextMod = modIdx < ZT.MODULES.length - 1;

    const prevBtn = hasPrev
      ? `<button class="btn-nav" onclick="LV.prev()">← PREVIOUS</button>`
      : `<button class="btn-nav" onclick="LV.close()">← BACK TO HOME</button>`;

    let nextBtn = '';
    if (hasNext) {
      nextBtn = `<button class="btn-nav" onclick="LV.next()">NEXT →</button>`;
    } else if (hasNextMod) {
      const nextMod = ZT.MODULES[modIdx + 1];
      nextBtn = `<button class="btn-nav" onclick="LV.close()" style="color:var(--amber);border-color:var(--amber)">NEXT MODULE →</button>`;
    } else {
      nextBtn = `<button class="btn-nav" onclick="LV.close()">🏁 FINISH</button>`;
    }

    return `<div class="lesson-footer">
      ${prevBtn}
      <button class="btn-complete" onclick="LV.complete()">MARK COMPLETE ✓</button>
      ${nextBtn}
    </div>`;
  }

  function complete() {
    const btn = document.querySelector('.btn-complete');
    const s   = ZT.load();
    const isDone = s.mods[curMod]?.lessons?.[curNum] || false;
    if (isDone) return;

    const pts = ZT.completeLesson(curMod, curNum);
    if (pts > 0) {
      if (btn) { btn.classList.add('done'); btn.textContent = 'COMPLETED ✓'; }
      // Update sidebar checkmark
      const sideItems = document.querySelectorAll('.sidebar-lesson');
      if (sideItems[curNum - 1]) sideItems[curNum - 1].classList.add('done');
      const sCheck = sideItems[curNum - 1]?.querySelector('.l-check');
      if (sCheck) sCheck.textContent = '✓';

      const prog = ZT.modProgress(curMod);
      if (prog.pct === 100) {
        ZT.toast(`MODULE ${curMod.replace('mod','').toUpperCase()} COMPLETE!`, pts);
      } else {
        ZT.toast('Lesson completed!', pts);
      }
    }
  }

  function prev() {
    if (curNum > 1) loadLesson(curNum - 1);
    else close();
  }

  function next() {
    const total = Object.keys(modData.lessons).length;
    if (curNum < total) loadLesson(curNum + 1);
    else close();
  }

  function close() {
    document.getElementById('lesson-page').style.display = 'none';
    document.getElementById('lesson-page').classList.remove('active');
    document.getElementById('main-page').style.display  = 'block';
    ZT.render();
    window.scrollTo(0, 0);
  }

  // Expose isLessonCompleted to ZT
  ZT.isLessonCompleted = function(modId, lessonNum) {
    const s = ZT.load();
    return !!(s.mods[modId]?.lessons?.[lessonNum]);
  };

  return { open, close, complete, prev, next, buildSidebar, loadLesson };
})();

// ── Global copy helper ──
function ZT_copy(btn) {
  const block = btn.parentElement;
  const text  = block.innerText.replace('COPY\n','').replace('COPY','').trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'COPIED!';
    setTimeout(() => btn.textContent = 'COPY', 2000);
  }).catch(() => {
    btn.textContent = 'COPY';
  });
}
