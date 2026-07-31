(function () {
  'use strict';
  const rooms = Object.freeze({
    av: document.getElementById('av-room'), registrar: document.getElementById('registrar-room'),
    yearbook: document.getElementById('yearbook-room'), fair: document.getElementById('fair-room')
  });
  function closeRooms(except) {
    Object.entries(rooms).forEach(([name, room]) => {
      if (name !== except) room.hidden = true;
      document.querySelectorAll(`[data-room="${name}"]`).forEach((button) => button.setAttribute('aria-expanded', String(name === except && !room.hidden)));
    });
  }
  document.querySelectorAll('[data-room]').forEach((button) => button.addEventListener('click', () => {
    const name = button.dataset.room, room = rooms[name];
    if (!room) return;
    const opening = room.hidden;
    closeRooms(opening ? name : '');
    room.hidden = !opening;
    button.setAttribute('aria-expanded', String(opening));
    if (opening) { room.focus({ preventScroll: true }); room.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); }
    else button.focus();
  }));
  function readStore(key) { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) { return {}; } }
  function findAttempts(record) {
    return Object.values(record).reduce((total, item) => total + Number(item && (item.attempts || item.count || 0) || 0), 0);
  }
  function renderLocalSummary() {
    const progress = readStore('laidiesQuizProgress'), legacy = readStore('laidiesQuizBestScores');
    const attempts = findAttempts(progress); const bests = Object.values(legacy).filter((score) => Number.isFinite(Number(score)));
    const record = document.getElementById('record-card'); const yearbook = document.getElementById('yearbook-card');
    if (!attempts && !bests.length) {
      record.innerHTML = '<p class="record-status">No Pop Quiz attempts are stored on this device yet.</p>';
      yearbook.innerHTML = '<p class="record-status">No local title yet. Take a Pop Quiz first.</p>';
      return;
    }
    const average = bests.length ? Math.round(bests.reduce((sum, score) => sum + Number(score), 0) / bests.length) : null;
    record.innerHTML = `<dl><dt>Attempts on this device</dt><dd>${attempts || 'Recorded locally'}</dd><dt>Best-score entries</dt><dd>${bests.length}</dd><dt>Local average</dt><dd>${average === null ? 'Not available' : average}</dd></dl><p class="limit">This is a device-local reading only; it does not create a permanent record or cross-device progress.</p>`;
    yearbook.innerHTML = `<p class="record-status">${average === null ? 'Quiz regular' : average >= 80 ? 'Explanation Chaser' : 'Practice Regular'}</p><p>Derived only from the records on this browser. Just for fun.</p>`;
  }
  async function renderClasses() {
    const state = document.getElementById('class-state'), grid = document.getElementById('class-grid');
    try {
      const response = await fetch('/content/site/high-classes.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('register unavailable');
      const register = await response.json(), rows = Array.isArray(register.classes) ? register.classes : [];
      if (!rows.length) throw new Error('empty register');
      state.textContent = `${rows.length} written class previews are listed. No class tapes are available yet.`;
      grid.replaceChildren(...rows.slice(0, 8).map((item) => {
        const card = document.createElement('article'); card.className = 'class-card';
        const title = document.createElement('h3'); title.textContent = item.title || item.slug || 'Class preview';
        const body = document.createElement('p'); body.textContent = item.status === 'live' ? 'Learning admission must still be checked.' : 'Written preview · tape in production';
        const link = document.createElement('a'); link.href = `/learn/class.html?c=${encodeURIComponent(item.slug || '')}`; link.textContent = 'Open its truthful status →';
        card.append(title, body, link); return card;
      }));
    } catch (_) {
      state.textContent = 'The class register could not be loaded. The 101 shelf and Pop Quiz remain available as separate learning routes.';
      grid.replaceChildren();
    }
  }
  renderLocalSummary(); renderClasses();
}());
