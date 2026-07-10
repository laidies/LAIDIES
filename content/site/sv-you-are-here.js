/**
 * ★ YOU ARE HERE — mall-directory chip + full-map modal.
 *
 * On every building page: a small fixed plaque bottom-left reading
 * "★ YOU ARE HERE · <building>". Clicking it opens the full town map;
 * every other location is clickable and navigates there.
 *
 * Requires /content/site/sunnyvaile-directory.js loaded first (it exports
 * window.SV_BUILDINGS + window.SV_MAP_ASSET). Renders nothing if the
 * current path doesn't match a directory entry.
 */
(function () {
  'use strict';

  function currentEntry(list) {
    var path = window.location.pathname.replace(/\/index\.html$/, '/');
    for (var i = 0; i < list.length; i++) {
      if (list[i].href === path) return list[i];
    }
    // Mall shops live inside The Mall
    if (path.indexOf('/mall/') === 0) {
      return list.find(function (b) { return b.id === 'mall'; }) || null;
    }
    return null;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }
  // Directory names only contain "Ai" inside brand words — safe blanket wrap.
  function brandHtml(s) {
    return escapeHtml(s).replace(/Ai/g, '<span class="ai">Ai</span>');
  }

  var STYLE = ''
    + '.sv-yah-chip { position: fixed; left: 16px; bottom: 84px; z-index: 8800;'
    + '  display: flex; align-items: center; gap: 10px; padding: 9px 16px 9px 12px;'
    + '  background: linear-gradient(160deg, #3a1838 0%, #4b2148 100%); color: #ffd982;'
    + '  border: 1.5px solid rgba(255, 217, 130, 0.55); border-radius: 12px; cursor: pointer;'
    + '  box-shadow: 0 10px 26px rgba(26, 8, 24, 0.4); font-family: "Jost", sans-serif;'
    + '  text-align: left; transition: transform 0.18s ease, box-shadow 0.2s ease; }'
    + '.sv-yah-chip:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(26, 8, 24, 0.5); }'
    + '.sv-yah-chip .sv-yah-star { font-size: 17px; color: #ffd982; }'
    + '.sv-yah-chip .sv-yah-eyebrow { display: block; font-size: 8.5px; font-weight: 700; letter-spacing: 0.3em; opacity: 0.85; }'
    + '.sv-yah-chip .sv-yah-name { display: block; font-size: 12.5px; font-weight: 700; color: #fffdfb; letter-spacing: 0.02em; }'
    + '.sv-yah-chip .sv-yah-name .ai { color: #e8a6bb; }'
    + '@media (max-width: 640px) { .sv-yah-chip { left: 10px; bottom: 76px; padding: 7px 12px 7px 10px; } .sv-yah-chip .sv-yah-name { font-size: 11.5px; } }'

    + '.sv-yah-modal { position: fixed; inset: 0; z-index: 9600; display: none;'
    + '  align-items: center; justify-content: center; padding: 4vh 3vw;'
    + '  background: rgba(26, 8, 24, 0.82); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }'
    + '.sv-yah-modal.is-open { display: flex; }'
    + '.sv-yah-panel { position: relative; width: min(1100px, 94vw); max-height: 92vh; overflow: auto;'
    + '  background: #fffdfb; border-radius: 16px; border: 2px solid #ffd982;'
    + '  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5); padding: 18px 18px 14px; }'
    + '.sv-yah-panel-title { margin: 2px 6px 12px; display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }'
    + '.sv-yah-panel-title strong { font-family: "Jost", sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: #9b3f5f; }'
    + '.sv-yah-panel-title span { font-family: "Jost", sans-serif; font-size: 11px; color: #766171; }'
    + '.sv-yah-close { position: absolute; top: 10px; right: 12px; z-index: 2; width: 34px; height: 34px;'
    + '  border: 1.5px solid #9b3f5f; border-radius: 50%; background: #fffdfb; color: #9b3f5f;'
    + '  font-size: 17px; font-weight: 700; cursor: pointer; line-height: 1; }'
    + '.sv-yah-close:hover { background: #9b3f5f; color: #fffdfb; }'
    + '.sv-yah-map { position: relative; border-radius: 10px; overflow: hidden; }'
    + '.sv-yah-map img { display: block; width: 100%; height: auto; }'
    + '.sv-yah-pin { position: absolute; transform: translate(-50%, -50%); text-decoration: none; }'
    + '.sv-yah-pin .sv-yah-dot { display: flex; align-items: center; justify-content: center;'
    + '  width: 26px; height: 26px; border-radius: 50%; background: transparent; color: transparent;'
    + '  border: 0; font: 700 12px/1 "Jost", sans-serif; box-shadow: none;'
    + '  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; }'
    + '.sv-yah-pin:hover .sv-yah-dot, .sv-yah-pin:focus .sv-yah-dot { background: rgba(201,162,39,0.08); border: 2.5px solid #c9a227; box-shadow: 0 0 0 5px rgba(201,162,39,0.20), 0 0 20px rgba(201,162,39,0.65); }'
    + '.sv-yah-pin .sv-yah-label { position: absolute; left: 50%; top: -8px; transform: translate(-50%, -100%);'
    + '  white-space: nowrap; padding: 4px 10px; border-radius: 999px; background: #4b2148; color: #fffdfb;'
    + '  font: 700 11px/1.2 "Jost", sans-serif; opacity: 0; pointer-events: none; transition: opacity 0.15s ease; }'
    + '.sv-yah-pin .sv-yah-label .ai { color: #e8a6bb; }'
    + '.sv-yah-pin:hover .sv-yah-label, .sv-yah-pin:focus .sv-yah-label { opacity: 1; }'
    + '.sv-yah-pin--here .sv-yah-dot { width: 28px; height: 28px; background: rgba(201,162,39,0.12); color: transparent;'
    + '  border: 2.5px solid #c9a227; box-shadow: 0 0 0 5px rgba(201,162,39,0.22), 0 0 20px rgba(201,162,39,0.70); animation: svYahPulse 1.8s ease-in-out infinite; }'
    + '.sv-yah-pin--here .sv-yah-label { opacity: 1; background: #9b3f5f; }'
    + '@keyframes svYahPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 217, 130, 0.55); } 50% { box-shadow: 0 0 0 12px rgba(255, 217, 130, 0); } }'
    + '@media (max-width: 640px) {'
    + '  .sv-yah-pin .sv-yah-dot { width: 20px; height: 20px; font-size: 10px; border-width: 1.5px; }'
    + '  .sv-yah-pin--here .sv-yah-dot { width: 27px; height: 27px; }'
    + '  .sv-yah-panel { padding: 12px 10px 10px; }'
    + '  .sv-yah-pin--here .sv-yah-label { font-size: 9.5px; padding: 3px 8px; }'
    + '}';

  // Stamp the visit — feeds the Town Wallet membership cards on the Closet.
  // Throttled to one stamp per building per 30 minutes so refreshes don't farm it.
  function stampVisit(id) {
    try {
      var KEY = 'laidies_building_visits';
      var v = JSON.parse(localStorage.getItem(KEY)) || {};
      var rec = v[id] || { n: 0, first: Date.now(), last: 0 };
      if (!rec.first) rec.first = Date.now();
      if (Date.now() - (Number(rec.last) || 0) > 30 * 60 * 1000) {
        rec.n = (Number(rec.n) || 0) + 1;
        rec.last = Date.now();
      }
      v[id] = rec;
      localStorage.setItem(KEY, JSON.stringify(v));
    } catch (e) { /* private mode / quota — skip quietly */ }
  }

  function mount() {
    var list = window.SV_BUILDINGS;
    if (!list || !list.length) return;
    var here = currentEntry(list);
    if (!here) return;
    stampVisit(here.id);

    var style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);

    // Chip
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'sv-yah-chip';
    chip.setAttribute('aria-haspopup', 'dialog');
    chip.setAttribute('aria-label', 'You are here: ' + here.name + '. Open the town map.');
    chip.innerHTML =
      '<span class="sv-yah-star">★</span>' +
      '<span><span class="sv-yah-eyebrow">YOU ARE HERE</span>' +
      '<span class="sv-yah-name">' + brandHtml(here.name) + '</span></span>';
    document.body.appendChild(chip);

    // Modal
    var modal = document.createElement('div');
    modal.className = 'sv-yah-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'SUNNYVAiLE town map');
    var pins = list.map(function (b) {
      var isHere = b.id === here.id;
      return '<a class="sv-yah-pin' + (isHere ? ' sv-yah-pin--here' : '') + '"'
        + ' href="' + escapeHtml(b.href) + '"'
        + ' style="left:' + b.x + '%; top:' + b.y + '%;"'
        + (isHere ? ' aria-current="location"' : '') + '>'
        + '<span class="sv-yah-label">' + (isHere ? '★ YOU ARE HERE · ' : '') + brandHtml(b.name) + '</span>'
        + '<span class="sv-yah-dot">' + (isHere ? '★' : b.num) + '</span>'
        + '</a>';
    }).join('');
    modal.innerHTML =
      '<div class="sv-yah-panel">' +
      '  <button type="button" class="sv-yah-close" aria-label="Close map">×</button>' +
      '  <div class="sv-yah-panel-title"><strong>★ SUNNYV<span class="ai">Ai</span>LE Town Map</strong><span>Tap any stop to head there</span></div>' +
      '  <div class="sv-yah-map"><img src="' + escapeHtml(window.SV_MAP_ASSET || '/assets/sunnyvaile-town-map.png') + '" alt="Map of SUNNYVAiLE">' + pins + '</div>' +
      '</div>';
    document.body.appendChild(modal);

    function open() {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.sv-yah-close').focus();
    }
    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      chip.focus();
    }
    chip.addEventListener('click', open);
    modal.querySelector('.sv-yah-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
