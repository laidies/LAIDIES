/**
 * SUNNYVAiLE Quick Rail v2 — site-wide sticky quick-jump nav.
 *
 * Fixed to the right side of the viewport. One hover (or focus, or first
 * tap on touch screens) expands the WHOLE rail at once — every label slides
 * out together so it reads like a menu, no dot-by-dot hover hunting.
 * Icons reuse the ☰ menu's building emoji so the icon language matches.
 *
 * Single source of truth for every page including the homepage (the old
 * inline homepage copy is retired — first item swaps to "Start here" there).
 *
 * Include via: <script defer src="/content/site/quick-rail.js?v=2"></script>
 */
(function() {
  'use strict';

  // Ensure browser handles scroll restoration on back navigation — always auto.
  // If any page ever sets this to 'manual', the browser dumps users at the top;
  // this safeguard runs on every page load and re-normalizes to 'auto'.
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'auto'; } catch(e) {}

  if (document.querySelector('.quick-rail')) return;

  var STYLE = ''
    + '.quick-rail { position: fixed; right: 14px; top: 50%; transform: translateY(-50%);'
    + '  display: flex; flex-direction: column; align-items: flex-end; gap: 6px; z-index: 500; pointer-events: none; }'
    /* Collapsed: 44px circle, icon fills it exactly. The label must occupy
       ZERO width when collapsed — an opacity-only hide leaves it in flow,
       which pushes the icon out of the clip box (the "blank circles" bug). */
    + '.quick-rail-item { pointer-events: auto; display: flex; align-items: center; justify-content: flex-start;'
    + '  padding: 0; background: var(--plum-deep, #341446); border: 1.5px solid var(--gold, #c9a227);'
    + '  border-radius: 999px; color: var(--cream, #fffdfb); text-decoration: none;'
    + '  transition: max-width 0.24s ease, min-width 0.24s ease, padding 0.24s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;'
    + '  height: 44px; width: auto; max-width: 44px; min-width: 44px; overflow: hidden; white-space: nowrap;'
    + '  box-shadow: 0 3px 8px rgba(75,33,72,0.28); }'
    /* THE v2 MOVE: hovering / focusing / tapping ANYWHERE on the rail expands
       EVERY pill together — one gesture shows all ten labels like a menu. */
    + '.quick-rail:hover .quick-rail-item, .quick-rail:focus-within .quick-rail-item, .quick-rail.is-open .quick-rail-item {'
    + '  max-width: 240px; min-width: 188px; padding: 0 18px 0 0; }'
    + '.quick-rail:hover .quick-rail-label, .quick-rail:focus-within .quick-rail-label, .quick-rail.is-open .quick-rail-label {'
    + '  max-width: 180px; opacity: 1; }'
    /* The pill you are actually ON lights rose so the target is unmistakable. */
    + '.quick-rail-item:hover, .quick-rail-item:focus-visible {'
    + '  background: var(--rose, #9b3f5f); border-color: var(--gold, #c9a227);'
    + '  box-shadow: 0 6px 16px rgba(75,33,72,0.35); outline: none; }'
    + '.quick-rail-icon { display: inline-flex; align-items: center; justify-content: center;'
    + '  width: 44px; height: 44px; font-size: 20px; line-height: 1; flex-shrink: 0;'
    + '  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.25)); }'
    + '.quick-rail-label { font-family: "Jost", sans-serif; font-size: 12.5px; font-weight: 700; letter-spacing: 0.04em;'
    + '  color: var(--cream, #fffdfb); max-width: 0; overflow: hidden; opacity: 0;'
    + '  transition: max-width 0.24s ease, opacity 0.18s ease 0.05s; }'
    + '@media (prefers-reduced-motion: reduce) { .quick-rail-item, .quick-rail-label { transition: none; } }'
    /* Nudge the KSVL bottom bar out of the way of the last rail item on tall screens */
    + '.ksvl-now-playing.is-visible ~ .quick-rail { transform: translateY(calc(-50% - 42px)); }'
    /* Below 1080px the content column runs under the rail — hide it rather than
       cover text. The ☰ menu carries navigation on small screens. */
    + '@media (max-width: 1080px) { .quick-rail { display: none; } }';

  // Custom engraved-gold line icons — hand-drawn SVG, one per destination.
  // Each is inner markup on a 24×24 grid; GRAD is replaced with a per-item
  // gradient id at build time (SVG gradient ids must be document-unique).
  // Register: fine gold line work on plum, like the site's charm jewelry.
  var ICONS = {
    // Folded tourist map, three panels
    map: '<path d="M3.5 6.5 L9 4.5 L15 6.5 L20.5 4.5 V17.5 L15 19.5 L9 17.5 L3.5 19.5 Z"/><path d="M9 4.5 V17.5 M15 6.5 V19.5"/><circle cx="12" cy="11" r="1.4" fill="url(#GRAD)" stroke="none"/>',
    // Little house, pitched roof + door
    home: '<path d="M3.5 11.5 L12 4.5 L20.5 11.5"/><path d="M6 9.8 V19.5 H18 V9.8"/><path d="M10 19.5 V14 H14 V19.5"/>',
    // Open book, two soft pages with mirrored text hints
    book: '<path d="M12 6.2 C10.2 4.8 7.2 4.4 4.2 5 V18.6 C7.2 18 10.2 18.4 12 19.8 C13.8 18.4 16.8 18 19.8 18.6 V5 C16.8 4.4 13.8 4.8 12 6.2 Z"/><path d="M12 6.2 V19.8"/><path d="M6.8 9.2 C8.1 9 9.4 9.2 10.3 9.6 M6.8 12.2 C8.1 12 9.4 12.2 10.3 12.6 M17.2 9.2 C15.9 9 14.6 9.2 13.7 9.6 M17.2 12.2 C15.9 12 14.6 12.2 13.7 12.6"/>',
    // Magic wand with a four-point star
    wand: '<path d="M4.5 19.5 L13.5 10.5"/><path d="M16.8 3.5 L17.6 6.2 L20.3 7 L17.6 7.8 L16.8 10.5 L16 7.8 L13.3 7 L16 6.2 Z" fill="url(#GRAD)" stroke="none"/><path d="M11 5.5 L11.3 6.7 M20 12.5 L20.3 13.7" />',
    // Folded broadsheet with headline rules
    news: '<path d="M4 5.5 H16.5 V18.5 H5.5 C4.7 18.5 4 17.8 4 17 Z"/><path d="M16.5 8.5 H20 V17 C20 17.8 19.3 18.5 18.5 18.5 H16.5"/><path d="M6.5 8.5 H14 M6.5 11.5 H14 M6.5 14.5 H10.5"/>',
    // To-go cup with lid + straw
    cup: '<path d="M7 8.5 L8.3 20 H15.7 L17 8.5"/><path d="M6.3 8.5 H17.7 M7.5 5.8 H16.5 V8.5 H7.5 Z"/><path d="M12.8 5.8 L14.6 2.5"/>',
    // Arcade joystick on its deck
    joystick: '<path d="M5 16 H19 V19.5 H5 Z"/><path d="M10.5 16 V10"/><circle cx="10.5" cy="7.5" r="2.4"/><circle cx="15.5" cy="13.8" r="1.1" fill="url(#GRAD)" stroke="none"/>',
    // Tabletop radio, antenna up
    radio: '<path d="M4 9.5 H20 V19 H4 Z"/><path d="M16.5 9.5 L20 3.8"/><circle cx="9" cy="14.2" r="2.5"/><path d="M14.5 12.5 H17.5 M14.5 16 H17.5"/>',
    // Speech bubble with a solid heart
    chat: '<path d="M4 5.5 H20 V15.5 H10.5 L6.5 19.5 V15.5 H4 Z"/><path d="M12 12.6 C10.9 11.5 9.5 10.3 10.6 9 C11.3 8.2 12 8.9 12 9.5 C12 8.9 12.7 8.2 13.4 9 C14.5 10.3 13.1 11.5 12 12.6 Z" fill="url(#GRAD)" stroke="none"/>',
    // Sealed envelope
    mail: '<path d="M3.5 6 H20.5 V18 H3.5 Z"/><path d="M3.5 6.8 L12 13 L20.5 6.8"/>',
    // Votive candle, lit
    candle: '<path d="M12 3.2 C13.5 5.1 14.2 6.3 12 8 C9.8 6.3 10.5 5.1 12 3.2 Z" fill="url(#GRAD)" stroke="none"/><path d="M12 8.4 V10.4"/><path d="M9 10.6 H15 V19.5 H9 Z"/><path d="M7 19.5 H17"/>'
  };
  var GOLD_STOPS = '<stop offset="0" stop-color="#9a6d10"/><stop offset="0.45" stop-color="#f3d879"/><stop offset="0.55" stop-color="#ffeb9e"/><stop offset="1" stop-color="#a87b1c"/>';

  function iconSvg(key, uid) {
    var gid = 'qrg-' + uid;
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="url(#' + gid + ')"'
      + ' stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">'
      + GOLD_STOPS + '</linearGradient></defs>'
      + ICONS[key].split('GRAD').join(gid) + '</svg>';
  }

  var onHomepage = /^\/(index\.html)?$/.test(window.location.pathname);
  var FIRST = onHomepage
    ? { href: '/visitors-centre.html', icon: 'map',  label: 'Start here', title: "Welcome Wagon Visitor's Centre" }
    : { href: '/', icon: 'home', label: 'Home', title: 'Back to SUNNYVAiLE' };

  var ITEMS = [
    FIRST,
    { href: '/library.html',                icon: 'book',     label: 'Look it up',     title: 'Look it up · The LIBRAiRY' },
    { href: '/games/fairy-godmother.html',  icon: 'wand',     label: 'Ask LAiDY',      title: 'Ask LAiDY · FAiRY Godmother' },
    { href: '/newsstand.html',              icon: 'news',     label: 'Read the news',  title: 'The NewsStand' },
    { href: '/blend-snap.html',             icon: 'cup',      label: 'Study Pack',     title: 'The Blend & Snap · Study Pack' },
    { href: '/games/fun-pack.html',         icon: 'joystick', label: 'Have fun',       title: 'Have fun · the games arcade' },
    { href: '/radio.html',                  icon: 'radio',    label: 'Tune in KSVL',   title: 'KSVL RAiDIO, 99.9' },
    { href: '/sorority-house.html',         icon: 'chat',     label: 'Say hi',         title: 'Delta LAi Nu chat rooms' },
    { href: '/post-office.html',            icon: 'mail',     label: 'Check the mail', title: 'Post Office · mail & gifts' },
    { href: '/luminairy.html',              icon: 'candle',   label: 'Light a candle', title: 'The LUMINAiRY · PATRON SAiNTS' }
  ];

  function build() {
    if (!document.getElementById('sv-quick-rail-style')) {
      var s = document.createElement('style');
      s.id = 'sv-quick-rail-style';
      s.textContent = STYLE;
      document.head.appendChild(s);
    }
    if (document.querySelector('.quick-rail')) return;

    var nav = document.createElement('nav');
    nav.className = 'quick-rail';
    nav.setAttribute('aria-label', 'Quick jump — town services');
    ITEMS.forEach(function(it, i) {
      var a = document.createElement('a');
      a.className = 'quick-rail-item';
      a.href = it.href;
      a.title = it.title;
      var icon = document.createElement('span');
      icon.className = 'quick-rail-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = iconSvg(it.icon, i);
      var label = document.createElement('span');
      label.className = 'quick-rail-label';
      label.textContent = it.label;
      a.appendChild(icon);
      a.appendChild(label);
      nav.appendChild(a);
    });
    document.body.appendChild(nav);

    // Touch screens have no hover: first tap opens the rail (labels out),
    // second tap follows the link. Tapping elsewhere closes it.
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
      nav.addEventListener('click', function(e) {
        if (!nav.classList.contains('is-open')) {
          e.preventDefault();
          nav.classList.add('is-open');
        }
      });
      document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) nav.classList.remove('is-open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
