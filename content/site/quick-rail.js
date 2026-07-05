/**
 * SUNNYVAiLE Quick Rail — site-wide sticky quick-jump nav.
 *
 * Auto-injects on every page (except homepage, which has its own inline copy).
 * Fixed to the right side of the viewport, expands each pill on hover.
 *
 * Include via: <script defer src="/content/site/quick-rail.js?v=1"></script>
 */
(function() {
  'use strict';

  // Ensure browser handles scroll restoration on back navigation — always auto.
  // If any page ever sets this to 'manual', the browser dumps users at the top;
  // this safeguard runs on every page load and re-normalizes to 'auto'.
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'auto'; } catch(e) {}

  // Homepage has its own inline rail — don't duplicate.
  if (document.querySelector('.quick-rail')) return;

  var STYLE = ''
    + '.quick-rail { position: fixed; right: 14px; top: 50%; transform: translateY(-50%);'
    + '  display: flex; flex-direction: column; align-items: flex-end; gap: 6px; z-index: 500; pointer-events: none; }'
    /* Collapsed: 44px circle, icon at flex-start fills it exactly. The label must
       occupy ZERO width when collapsed — an opacity-only hide leaves it in flow,
       which pushes the centered icon out of the clip box (the "blank circles" bug). */
    + '.quick-rail-item { pointer-events: auto; display: flex; align-items: center; justify-content: flex-start;'
    + '  padding: 0; background: var(--plum-deep, #341446); border: 1.5px solid var(--gold, #c9a227);'
    + '  border-radius: 999px; color: var(--cream, #fffdfb); text-decoration: none;'
    + '  transition: max-width 0.24s ease, padding 0.24s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;'
    + '  height: 44px; width: auto; max-width: 44px; overflow: hidden; white-space: nowrap;'
    + '  box-shadow: 0 3px 8px rgba(75,33,72,0.28); }'
    + '.quick-rail-item:hover, .quick-rail-item:focus-visible { max-width: 240px; padding: 0 18px 0 0;'
    + '  background: var(--rose, #9b3f5f); border-color: var(--gold, #c9a227);'
    + '  box-shadow: 0 6px 16px rgba(75,33,72,0.35); outline: none; }'
    + '.quick-rail-icon { display: inline-flex; align-items: center; justify-content: center;'
    + '  width: 44px; height: 44px; font-size: 22px; line-height: 1; flex-shrink: 0;'
    + '  font-family: "Playfair Display", Georgia, serif; font-weight: 700; color: #d4af37;'
    + '  background: linear-gradient(135deg, #8a5f00 0%, #d4a02e 25%, #f9d976 45%, #ffe486 55%, #d4a02e 75%, #8a5f00 100%);'
    + '  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;'
    + '  filter: drop-shadow(0 1px 0 rgba(0,0,0,0.28)); }'
    + '.quick-rail-label { font-family: "Jost", sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.04em;'
    + '  color: var(--cream, #fffdfb); max-width: 0; overflow: hidden; opacity: 0;'
    + '  transition: max-width 0.24s ease, opacity 0.18s ease 0.05s; }'
    + '.quick-rail-item:hover .quick-rail-label, .quick-rail-item:focus-visible .quick-rail-label { max-width: 180px; opacity: 1; }'
    /* Nudge the KSVL bottom bar out of the way of the last rail item on tall screens */
    + '.ksvl-now-playing.is-visible ~ .quick-rail { transform: translateY(calc(-50% - 42px)); }'
    /* Below 1080px the content column runs under the rail — hide it rather than
       cover text. (Interim rule until the rail-v2 design lands.) */
    + '@media (max-width: 1080px) { .quick-rail { display: none; } }';

  // The 10 items — first is Home, rest match the homepage rail.
  var ITEMS = [
    { href: '/',                            icon: '⌂', label: 'Home',          title: 'Back to SUNNYVAiLE' },
    { href: '/library.html',                icon: '§', label: 'Look it up',    title: 'Look it up · The LIBRAiRY' },
    { href: '/games/fairy-godmother.html',  icon: '✦', label: 'Ask LAiDY',     title: 'Ask LAiDY · FAiRY Godmother' },
    { href: '/newsstand.html',              icon: '¶', label: 'Read the news', title: 'The NewsStand' },
    { href: '/blend-snap.html',             icon: '&',      label: 'Study Pack',    title: 'The Blend & Snap · Study Pack' },
    { href: '/games/fun-pack.html',         icon: '♦', label: 'Have fun',      title: 'Have fun · the games arcade' },
    { href: '/radio.html',                  icon: '♪', label: 'Tune in KSVL',  title: 'KSVL RAiDIO, 99.9' },
    { href: '/sorority-house.html',         icon: '❦', label: 'Say hi',        title: 'Delta LAi Nu chat rooms' },
    { href: '/post-office.html',            icon: '✉', label: 'Check the mail', title: 'Post Office · mail & gifts' },
    { href: '/luminairy.html',              icon: '✧', label: 'Light a candle', title: 'The LUMINAiRY · PATRON SAiNTS' }
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
    ITEMS.forEach(function(it) {
      var a = document.createElement('a');
      a.className = 'quick-rail-item';
      a.href = it.href;
      a.title = it.title;
      var icon = document.createElement('span');
      icon.className = 'quick-rail-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = it.icon;
      var label = document.createElement('span');
      label.className = 'quick-rail-label';
      label.textContent = it.label;
      a.appendChild(icon);
      a.appendChild(label);
      nav.appendChild(a);
    });
    document.body.appendChild(nav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
