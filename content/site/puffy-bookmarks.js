/*!
 * Puffy-sticker bookmarks — mark sections in the Handbook, they land on the
 * Puffy Board in your Closet. Locked 2026-07-03; built 2026-07-12.
 * Storage: laidies_puffies_board = JSON array of
 *   { id, title, summary, url, placedAt }
 */
(function () {
  var KEY = 'laidies_puffies_board';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') || []; }
    catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  function has(list, id) {
    return list.some(function (p) { return p.id === id; });
  }

  function makeBtn(el) {
    var id = el.id || (el.getAttribute('data-puffy-title') || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!id) return null;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'puffy-btn';
    btn.setAttribute('aria-label', 'Place a puffy sticker to save this section to your Closet');
    function paint() {
      var placed = has(load(), id);
      btn.classList.toggle('is-placed', placed);
      btn.title = placed ? 'Puffy placed — it’s on your board. Click to peel it off.' : 'Place a puffy — saves this section to your Closet';
    }
    btn.addEventListener('click', function () {
      var list = load();
      if (has(list, id)) {
        list = list.filter(function (p) { return p.id !== id; });
      } else {
        list.push({
          id: id,
          title: el.getAttribute('data-puffy-title') || (el.textContent || '').trim().slice(0, 80),
          summary: el.getAttribute('data-puffy-summary') || '',
          url: location.pathname + '#' + (el.id || id),
          placedAt: new Date().toISOString()
        });
      }
      save(list);
      paint();
      document.dispatchEvent(new CustomEvent('puffies:changed'));
    });
    paint();
    return btn;
  }

  function initReader() {
    var targets = document.querySelectorAll('[data-puffy-title]');
    if (!targets.length) return;
    var css = document.createElement('style');
    css.textContent =
      '.puffy-btn{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;margin-left:10px;vertical-align:middle;' +
      'border:1.5px dashed rgba(155,63,95,0.45);border-radius:50%;background:transparent;cursor:pointer;padding:0;' +
      'background-image:url(/assets/butterfly-clip-rating-token.png);background-size:70% 70%;background-position:center;background-repeat:no-repeat;' +
      'filter:grayscale(1);opacity:0.5;transition:opacity .15s,filter .15s,transform .15s;}' +
      '.puffy-btn:hover{opacity:0.9;transform:scale(1.12);}' +
      '.puffy-btn.is-placed{border-style:solid;border-color:var(--rose,#9b3f5f);filter:none;opacity:1;box-shadow:0 3px 8px rgba(155,63,95,0.3);}';
    document.head.appendChild(css);
    targets.forEach(function (el) {
      var btn = makeBtn(el);
      if (btn) el.appendChild(btn);
    });
  }

  // Closet board — renders wherever #puffyBoard exists
  function initBoard() {
    var board = document.getElementById('puffyBoard');
    if (!board) return;
    function paint() {
      var list = load();
      board.innerHTML = '';
      if (!list.length) {
        board.innerHTML = '<p class="puffy-empty">No puffies placed yet. Mark any section in the <a href="/handbook.html">Handbook</a> with a butterfly clip and it lands here.</p>';
        return;
      }
      list.sort(function (a, b) { return (b.placedAt || '').localeCompare(a.placedAt || ''); });
      list.forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'puffy-item';
        a.href = p.url;
        a.innerHTML = '<span class="puffy-item-clip" aria-hidden="true"></span>' +
          '<span class="puffy-item-body"><b></b><small></small></span>' +
          '<button type="button" class="puffy-peel" aria-label="Peel this puffy off the board">&times;</button>';
        a.querySelector('b').textContent = p.title;
        a.querySelector('small').textContent = p.summary || 'Saved from the Handbook';
        a.querySelector('.puffy-peel').addEventListener('click', function (ev) {
          ev.preventDefault(); ev.stopPropagation();
          save(load().filter(function (q) { return q.id !== p.id; }));
          paint();
        });
        board.appendChild(a);
      });
    }
    paint();
    document.addEventListener('puffies:changed', paint);
  }

  function init() { initReader(); initBoard(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
