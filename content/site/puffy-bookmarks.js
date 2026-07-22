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

  var cssDone = false;
  function initReader() {
    var targets = document.querySelectorAll('[data-puffy-title]');
    if (!targets.length) return;
    if (cssDone) {                       // rescan: styles already in, just wire new targets
      targets.forEach(function (el) {
        if (el.querySelector(':scope > .puffy-btn')) return;   // already has one
        var b = makeBtn(el);
        if (b) el.appendChild(b);
      });
      return;
    }
    cssDone = true;
    var css = document.createElement('style');
    css.textContent =
      // The sticker IS a puffy — assets/puffies/. The previous icon was a
      // butterfly CLIP: clips are the currency, not a bookmark, and Ali
      // marked that token "redo — I don't know what this is".
      '.puffy-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;margin-left:10px;vertical-align:middle;' +
      'border:1.5px dashed rgba(155,63,95,0.4);border-radius:50%;background:transparent;cursor:pointer;padding:0;' +
      'background-image:url(/assets/puffies/puffy-star-teal.png);background-size:74% 74%;background-position:center;background-repeat:no-repeat;' +
      'filter:grayscale(1);opacity:0.45;transition:opacity .15s,filter .15s,transform .15s;}' +
      '.puffy-btn:hover{opacity:0.9;transform:scale(1.12);}' +
      '.puffy-btn.is-placed{border:0;background-image:url(/assets/puffies/puffy-star-pink.png);background-size:100% 100%;' +
      'filter:none;opacity:1;transform:rotate(-8deg);}' +
      '.puffy-btn.is-placed:hover{transform:rotate(-8deg) scale(1.1);}';
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
        board.innerHTML = '<p class="puffy-empty">No puffies placed yet. Put a puffy on any book or section at the <a href="/library.html">LIBR<span class="ai">Ai</span>RY</a> and it lands here.</p>';
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
        a.querySelector('small').textContent = p.summary || 'Saved from the LIBRAiRY';
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
  // Public rescan — for pages that reveal savable sections after load
  // (the LIBRAiRY opens books in place, so their sections arrive late).
  window.svPuffyScan = function () { initReader(); initBoard(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
