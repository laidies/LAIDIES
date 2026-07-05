/**
 * SUNNYVAiLE global header — ONE header for the whole town.
 *
 * Rewrites the page's existing <header class="sv-header"> (or the homepage's
 * .site-header) into the canonical structure Ali locked 2026-07-05:
 *
 *   [☰ Menu]  LAiDIES  ·············  This Week's Tour · Radio · [Join →] [✉︎ Sign In]
 *
 * - Menu opens a dropdown with the full town directory (canon order + names
 *   from sunnyvaile-directory.js, lazy-loaded if the page doesn't have it).
 * - Sign In keeps class="sv-signin" so sv-nav-auth.js can swap it for the
 *   signed-in "Resident ★" pill. LOAD ORDER: include this script BEFORE
 *   sv-nav-auth.js (both defer — document order is execution order).
 * - On phones the two quick links fold into the Menu.
 */
(function () {
  'use strict';

  var JOIN_HREF = '/clubhouse-pass.html';
  var SIGNIN_HREF = '/clubhouse-pass.html';
  var QUICK_LINKS = [
    { label: "This Week's Tour", href: '/#tour' },
    { label: 'Radio', href: '/radio.html' }
  ];
  // Icons come from the shared gold kit (sv-gold-icons.js) — no emoji in
  // interface chrome (Ali, 2026-07-05).
  var ESSENTIALS = [
    { icon: 'bus',    name: 'The Welcome Tour', href: '/visitors-centre.html?welcome-tour=start' },
    { icon: 'flower', name: "This Week's Tour", href: '/#tour' },
    { icon: 'vhs',    name: 'Episodes', href: '/chick-flicks.html' },
    { icon: 'dress',  name: 'My Closet', href: '/laidies-card.html' },
    { icon: 'book',   name: 'The Handbook', href: '/handbook.html' }
  ];
  var BUILDING_ICON = {
    'visitors-centre': 'map', 'newsstand': 'news', 'chick-flicks': 'vhs', 'mall': 'bag',
    'bronze-aige': 'martini', 'mme-claio': 'crystal', 'blend-snap': 'cup', 'maikeover': 'lipstick',
    'sorority-house': 'chat', 'fairy-godmother': 'wand', 'town-hall': 'columns', 'post-office': 'mail',
    'sunnyvaile-high': 'gradcap', 'sanctuary': 'candle', 'luminairy': 'candle', 'ksvl': 'radio',
    'dream-phone': 'phone', 'library': 'book', 'net-flicks': 'vhs'
  };
  // Palette coins — icons sit in small sunset/teal/pink circles so the gold
  // line work reads on the cream panel (same cycle as the quick rail).
  var COIN_TONES = [['#b97c5a', '#8f5d40'], ['#3aa8a4', '#2b7d7a'], ['#c47c85', '#9c5f68']];
  function goldIcon(key, uid, i) {
    if (!window.svGoldIcon) return '';
    var t = COIN_TONES[(i || 0) % COIN_TONES.length];
    return '<span class="svgh-coin" style="background: linear-gradient(160deg, ' + t[0] + ' 0%, ' + t[1] + ' 100%);">'
      + window.svGoldIcon(key, uid, 15) + '</span>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }
  function brandHtml(s) { return esc(s).replace(/Ai/g, '<span class="ai">Ai</span>'); }

  var STYLE = ''
    /* Zero-specificity fallbacks (:where) — give rebased legacy pages a
       proper header without overriding sunnyvaile-page.css anywhere. */
    + ':where(.sv-header) { position: sticky; top: 0; z-index: 9000; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 13px clamp(16px, 3vw, 32px); background: #fffdfb; border-bottom: 1px solid rgba(75,33,72,0.12); font-family: "Jost", sans-serif; }'
    + ':where(.sv-header .brand) { font-weight: 800; font-size: 20px; letter-spacing: 0.04em; color: #4b2148; text-decoration: none; }'
    + ':where(.sv-header nav) { display: flex; align-items: center; gap: 18px; }'
    + ':where(.sv-header nav a) { color: #4b2148; text-decoration: none; font-size: 14px; font-weight: 600; }'
    + '.svgh-left { display: flex; align-items: center; gap: 10px; }'
    + '.svgh-histbtn { width: 34px; height: 34px; border-radius: 50%; background: transparent;'
    + '  border: 1.5px solid rgba(75,33,72,0.28); color: var(--plum, #4b2148); font-size: 16px; line-height: 1;'
    + '  cursor: pointer; transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease; flex-shrink: 0; }'
    + '.svgh-histbtn:hover { border-color: var(--rose, #9b3f5f); color: var(--rose, #9b3f5f); background: rgba(155,63,95,0.06); }'
    + '@media (max-width: 480px) { .svgh-fwd { display: none; } }'
    + '.svgh-menu-btn { display: inline-flex; align-items: center; gap: 8px; background: transparent;'
    + '  border: 1.5px solid rgba(75,33,72,0.28); border-radius: 999px; padding: 7px 15px;'
    + '  font: 700 12px/1 "Jost", sans-serif; letter-spacing: 0.1em; text-transform: uppercase;'
    + '  color: var(--plum, #4b2148); cursor: pointer; transition: border-color 0.15s ease, color 0.15s ease; }'
    + '.svgh-menu-btn:hover, .svgh-menu-btn[aria-expanded="true"] { border-color: var(--rose, #9b3f5f); color: var(--rose, #9b3f5f); }'
    + '.svgh--dark .svgh-menu-btn { border-color: rgba(255,253,251,0.4); color: rgba(255,253,251,0.92); }'
    + '.svgh--dark .svgh-menu-btn:hover, .svgh--dark .svgh-menu-btn[aria-expanded="true"] { border-color: #e8a6bb; color: #e8a6bb; }'
    + '.svgh-join { background: var(--rose, #9b3f5f); color: var(--cream, #fffdfb) !important; padding: 8px 18px;'
    + '  border-radius: 999px; font-weight: 700; }'
    + '.svgh-join:hover { background: var(--plum, #4b2148); color: var(--cream, #fffdfb) !important; }'
    + '.svgh-signin { color: var(--rose, #9b3f5f); font-weight: 600; border: 1.5px solid var(--rose, #9b3f5f);'
    + '  padding: 7px 14px; border-radius: 999px; }'
    + '.svgh-panel { position: fixed; top: 74px; left: 16px; z-index: 9400; width: min(560px, calc(100vw - 32px));'
    + '  max-height: min(72vh, 640px); overflow: auto; background: #fffdfb;'
    + '  border: 1.5px solid rgba(75,33,72,0.16); border-radius: 16px; padding: 18px 18px 14px;'
    + '  box-shadow: 0 24px 60px rgba(26,8,24,0.28); display: none; }'
    + '.svgh-panel.is-open { display: block; }'
    + '.svgh-panel-title { margin: 0 0 10px; font: 700 10.5px/1 "Jost", sans-serif; letter-spacing: 0.26em;'
    + '  text-transform: uppercase; color: var(--rose, #9b3f5f); }'
    + '.svgh-panel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 14px; margin-bottom: 14px; }'
    + '@media (max-width: 560px) { .svgh-panel-grid { grid-template-columns: 1fr; } }'
    + '.svgh-item { display: flex; align-items: center; gap: 9px; padding: 7px 8px; border-radius: 8px;'
    + '  text-decoration: none; color: var(--plum, #4b2148); font-family: "Jost", sans-serif; font-size: 13.5px;'
    + '  font-weight: 600; transition: background 0.12s ease; margin: 0 !important; }'
    + '.svgh-item:hover { background: rgba(155,63,95,0.08); color: var(--rose, #9b3f5f); }'
    + '.svgh-item.is-here { background: rgba(201,162,39,0.14); }'
    + '.svgh-item .svgh-item-emoji { flex-shrink: 0; display: inline-flex; align-items: center; }'
    + '.svgh-coin { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px rgba(52,20,70,0.16), 0 1px 3px rgba(75,33,72,0.25); }'
    + '.svgh-item .svgh-item-addr { margin-left: auto; font-size: 10.5px; font-weight: 500; color: var(--plum-soft, #766171); white-space: nowrap; }'
    + '.svgh-nav { display: flex; align-items: center; }'
    + '.svgh-nav a { text-decoration: none; }'
    + '.site-header .svgh-nav { gap: 22px; }'
    + '.site-header .svgh-nav a { color: var(--plum, #4b2148); font-family: "Jost", sans-serif; font-size: 14px; font-weight: 600; }'
    + '.site-header .svgh-nav a:hover { color: var(--rose, #9b3f5f); }'
    + '@media (max-width: 760px) { .svgh-quick { display: none !important; } }'
    + '@media (max-width: 640px) { .svgh-panel { top: 64px; } }';

  function withDirectory(cb) {
    if (window.SV_BUILDINGS && window.SV_BUILDINGS.length) { cb(window.SV_BUILDINGS); return; }
    var s = document.createElement('script');
    s.src = '/content/site/sunnyvaile-directory.js?v=20260706-map';
    s.onload = function () { cb(window.SV_BUILDINGS || []); };
    s.onerror = function () { cb([]); };
    document.head.appendChild(s);
  }

  function buildPanel(panel) {
    var here = window.location.pathname.replace(/\/index\.html$/, '/');
    var essentials = ESSENTIALS.map(function (it, i) {
      return '<a class="svgh-item" href="' + esc(it.href) + '">'
        + '<span class="svgh-item-emoji">' + goldIcon(it.icon, 'ess-' + it.icon, i) + '</span>'
        + '<span>' + brandHtml(it.name) + '</span></a>';
    }).join('');
    panel.innerHTML =
      '<p class="svgh-panel-title">★ Around town</p>'
      + '<div class="svgh-panel-grid">' + essentials + '</div>'
      + '<p class="svgh-panel-title">★ Every building · M<span class="ai">Ai</span>N Street &amp; beyond</p>'
      + '<div class="svgh-panel-grid svgh-panel-grid--town"><span class="svgh-item" style="cursor:default;">Loading the map…</span></div>';
    withDirectory(function (list) {
      var town = panel.querySelector('.svgh-panel-grid--town');
      if (!town) return;
      if (!list.length) { town.innerHTML = '<a class="svgh-item" href="/visitors-centre.html">' + goldIcon('map', 'fb-map', 0) + ' Visitor&#39;s Centre →</a>'; return; }
      town.innerHTML = list.map(function (b, i) {
        var isHere = b.href === here;
        return '<a class="svgh-item' + (isHere ? ' is-here' : '') + '" href="' + esc(b.href) + '"'
          + (isHere ? ' aria-current="page"' : '') + '>'
          + '<span class="svgh-item-emoji">' + goldIcon(BUILDING_ICON[b.id] || 'star', 'b-' + b.id, i) + '</span>'
          + '<span>' + brandHtml(b.name) + '</span>'
          + '<span class="svgh-item-addr">' + esc(b.address || '') + '</span></a>';
      }).join('');
    });
  }

  function mount() {
    var header = document.querySelector('.sv-header') || document.querySelector('.site-header');
    if (!header || header.dataset.svghMounted === '1') return;
    header.dataset.svghMounted = '1';

    var style = document.createElement('style');
    style.textContent = STYLE;
    document.head.appendChild(style);

    // Preserve the page's brand/logo element if it has one, and rebuild
    // inside the layout wrapper when the page uses one (homepage).
    var container = header.querySelector('.site-header-inner') || header;
    var brand = header.querySelector('.brand, .site-logo');
    var brandHtmlStr = brand ? brand.outerHTML : '<a class="brand" href="/">L<span class="ai">Ai</span>DIES</a>';

    var quick = QUICK_LINKS.map(function (l) {
      var current = window.location.pathname === l.href ? ' style="color: var(--rose);"' : '';
      return '<a class="svgh-quick" href="' + esc(l.href) + '"' + current + '>' + esc(l.label) + '</a>';
    }).join('');

    container.innerHTML =
      '<div class="svgh-left">'
      + '<button type="button" class="svgh-histbtn svgh-back" aria-label="Back" title="Back">←</button>'
      + '<button type="button" class="svgh-histbtn svgh-fwd" aria-label="Forward" title="Forward">→</button>'
      + '<button type="button" class="svgh-menu-btn" aria-haspopup="true" aria-expanded="false" aria-controls="svghPanel">☰ Menu</button>'
      + brandHtmlStr
      + '</div>'
      + (container === header ? '' : '<div class="site-header-spacer"></div>')
      + '<nav class="svgh-nav">'
      + quick
      + '<a class="svgh-join" href="' + esc(JOIN_HREF) + '">Join →</a>'
      + '<a class="sv-signin svgh-signin" href="' + esc(SIGNIN_HREF) + '">✉︎ Sign In</a>'
      + '</nav>';

    var panel = document.createElement('div');
    panel.className = 'svgh-panel';
    panel.id = 'svghPanel';
    panel.setAttribute('role', 'menu');
    panel.setAttribute('aria-label', 'SUNNYVAiLE town menu');
    document.body.appendChild(panel);
    buildPanel(panel);

    // ← / → — browser-honest history. Back uses real history when the
    // visitor came from inside the town (so → still works afterwards);
    // a cold landing falls back to the page's natural parent.
    function parentFallback() {
      var p = window.location.pathname;
      if (p.indexOf('/mall/') === 0) return '/mall.html';
      if (p.indexOf('/issues/') === 0) return '/chick-flicks.html';
      if (p.indexOf('/community/') === 0) return '/sorority-house.html';
      // Games go home to the building they live in.
      var GAME_HOME = {
        '/games/businesswomens-special.html': '/bronze-aige.html',
        '/games/girl-talk.html': '/sorority-house.html',
        '/games/trading-cards.html': '/blend-snap.html'
      };
      return GAME_HOME[p] || '/';
    }
    header.querySelector('.svgh-back').addEventListener('click', function () {
      // ALWAYS the previous page (Ali's rule) — real history, wherever it
      // leads. Only when back genuinely does nothing (cold landing, first
      // page in the tab) does the parent fallback kick in.
      var fallback = setTimeout(function () { window.location.href = parentFallback(); }, 400);
      window.addEventListener('pagehide', function () { clearTimeout(fallback); }, { once: true });
      window.history.back();
    });
    header.querySelector('.svgh-fwd').addEventListener('click', function () {
      window.history.forward();
    });

    var btn = header.querySelector('.svgh-menu-btn');
    function close() { panel.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('is-open') && !panel.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
