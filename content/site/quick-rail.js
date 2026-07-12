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
    /* Each icon sits in its own palette-colored circle (sunset/teal/pink,
       set inline per item); the pill body stays plum so labels read cream. */
    + '.quick-rail-icon { display: inline-flex; align-items: center; justify-content: center;'
    + '  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; box-sizing: border-box;'
    + '  box-shadow: inset 0 0 0 2px rgba(52,20,70,0.18); }'
    + '.quick-rail-icon svg { filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3)); }'
    + '.quick-rail-label { font-family: "Jost", sans-serif; font-size: 12.5px; font-weight: 700; letter-spacing: 0.04em;'
    + '  color: var(--cream, #fffdfb); max-width: 0; overflow: hidden; opacity: 0;'
    + '  transition: max-width 0.24s ease, opacity 0.18s ease 0.05s; }'
    + '@media (prefers-reduced-motion: reduce) { .quick-rail-item, .quick-rail-label { transition: none; } }'
    /* Nudge the KSVL bottom bar out of the way of the last rail item on tall screens */
    + '.ksvl-now-playing.is-visible ~ .quick-rail { transform: translateY(calc(-50% - 42px)); }'
    /* Below 1080px the content column runs under the rail — hide it rather than
       cover text. The ☰ menu carries navigation on small screens. */
    + '@media (max-width: 1080px) { .quick-rail { display: none; } }';

  // Icons come from the shared gold kit (sv-gold-icons.js, loaded first in
  // defer order). Circles cycle the locked palette trio — sunset / teal /
  // pink — so the rail reads as palette dots, not an all-plum column.
  function iconSvg(key, uid) {
    return window.svGoldIcon ? window.svGoldIcon(key, 'qr-' + uid, 22) : '';
  }
  var CIRCLE_COLORS = [
    ['var(--sunset, #b97c5a)', '#8f5d40'],
    ['var(--teal, #3aa8a4)',   '#2b7d7a'],
    ['var(--pink, #c47c85)',   '#9c5f68']
  ];

  var onHomepage = /^\/(index\.html)?$/.test(window.location.pathname);
  var FIRST = onHomepage
    ? { href: '/visitors-centre.html', icon: 'map',  label: 'Start here', title: "Welcome Wagon Visitor's Centre" }
    : { href: '/', icon: 'home', label: 'Home', title: 'Back to SUNNYVAiLE' };

  var ITEMS = [
    FIRST,
    { href: '/library.html',                icon: 'book',     label: 'Look it up',     title: 'Look it up · The LIBRAiRY' },
    { href: '/games/fairy-godmother.html',  icon: 'wand',     label: 'FAiRY Godmother', title: "The FAiRY Godmother's House" },
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
      var tone = CIRCLE_COLORS[i % CIRCLE_COLORS.length];
      icon.style.background = 'linear-gradient(160deg, ' + tone[0] + ' 0%, ' + tone[1] + ' 100%)';
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
