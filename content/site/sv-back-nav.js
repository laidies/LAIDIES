/**
 * SUNNYVAiLE back-nav — right-rail item
 *
 * Renders as a shared contextual-return control. Desktop keeps the compact
 * right-side rail treatment; mobile always shows a readable 44px+ pill because
 * phones have no hover state.
 *
 * A same-origin referrer becomes the exact return destination. Direct,
 * external, bookmarked and new-tab arrivals fall back to the town home. The
 * only exempt state is a direct/external arrival already on the home page.
 *
 * Usage:
 *   <script defer src="/content/site/sv-back-nav.js?v=1"></script>
 */
(function () {
  'use strict';

  var ref = '';
  try { ref = document.referrer || ''; } catch (e) {}

  var refURL = null;
  try { refURL = ref ? new URL(ref) : null; } catch (e) {}
  var hasInternalReturn = Boolean(
    refURL &&
    refURL.origin === location.origin &&
    (refURL.pathname !== location.pathname ||
      refURL.search !== location.search ||
      refURL.hash !== location.hash)
  );
  var isHome = location.pathname === '/' || location.pathname === '/index.html';
  if (isHome && !hasInternalReturn) return;

  var TITLES = {
    '/': 'the town',
    '/index.html': 'the town',
    '/visitors-centre.html': 'the Visitor’s Centre',
    '/newsstand.html': 'the NewsStand',
    '/library.html': 'the LIBRAiRY',
    '/mall.html': 'The Mall',
    '/bronze-aige.html': 'BRONZE AiGE',
    '/chick-flicks.html': 'The Chick Flicks',
    '/blend-snap.html': 'The Blend & Snap',
    '/maikeover.html': 'MAiKEOVER',
    '/sorority-house.html': 'the Sorority House',
    '/post-office.html': 'the Post Office',
    '/town-hall.html': 'Town Hall',
    '/sunnyvaile-high.html': 'SUNNYVAiLE High',
    '/luminairy.html': 'The LUMINAiRY',
    '/radio.html': 'KSVL RAiDIO',
    '/this-week.html': 'this week',
    '/episodes.html': 'Episodes',
    '/laidies-card.html': 'your Closet',
    '/resident-card.html': 'sign-in',
    '/mall/claires.html': 'PIECES OF FLAiR',
    '/mall/pieces-of-flair.html': 'PIECES OF FLAiR',
    '/games/dream-phone.html': 'Dream Phone',
    '/games/madame-claio.html': 'Madame CLAi-O',
    '/games/fairy-godmother.html': 'FAiRY Godmother',
    '/games/girl-talk.html': 'Girl Talk',
    '/games/businesswomens-special.html': 'Businesswomen’s Special',
    '/games/trading-cards.html': 'Trading Cards',
    '/games/dj-booth.html': 'DJ Booth',
    '/games/cocktail-fortune.html': 'Cocktail Fortune',
  };

  var label = hasInternalReturn
    ? (TITLES[refURL.pathname] || 'the previous page')
    : 'SUNNYVAiLE home';
  var target = hasInternalReturn
    ? refURL.pathname + refURL.search + refURL.hash
    : '/';

  function ensureRail() {
    if (window.svRail && window.svRail.container) return window.svRail;

    var STYLE_ID = 'sv-side-rail-styles';
    if (!document.getElementById(STYLE_ID)) {
      var s = document.createElement('style');
      s.id = STYLE_ID;
      s.textContent = [
        '.sv-side-rail{',
        '  position: fixed; right: 12px; top: 50%; transform: translateY(-50%);',
        '  display: flex; flex-direction: column; gap: 10px;',
        '  z-index: 60;',
        '}',
        'body.sv-has-rail{ padding-right: 46px; transition: padding-right 240ms cubic-bezier(0.2, 0.8, 0.2, 1); }',
        'body.sv-has-rail:has(.sv-rail-item:hover),',
        'body.sv-has-rail:has(.sv-rail-item:focus-visible){ padding-right: 260px; }',
        '.sv-rail-item{',
        '  display: inline-flex; align-items: center; gap: 6px;',
        '  min-height: 44px; min-width: 44px; max-width: 44px;',
        '  padding: 0; border-radius: 999px;',
        '  background: rgba(75, 33, 72, 0.94);',
        '  color: #fffdfb !important;',
        '  border: 1.5px solid rgba(255,253,251,0.28);',
        '  box-shadow: 0 6px 18px rgba(34, 18, 32, 0.22);',
        '  backdrop-filter: blur(6px);',
        '  cursor: pointer; overflow: hidden;',
        '  justify-content: center;',
        '  text-decoration: none !important;',
        '  font-family: "Jost", -apple-system, BlinkMacSystemFont, sans-serif;',
        '  transition: max-width 240ms cubic-bezier(0.2, 0.8, 0.2, 1), padding 240ms cubic-bezier(0.2, 0.8, 0.2, 1), background 200ms ease;',
        '}',
        '.sv-rail-item:hover, .sv-rail-item:focus-visible{',
        '  max-width: 240px;',
        '  padding: 0 14px 0 8px;',
        '  justify-content: flex-start;',
        '  background: #4b2148;',
        '  outline: none;',
        '}',
        '.sv-rail-item__icon{',
        '  display: inline-flex; align-items: center; justify-content: center;',
        '  width: 44px; height: 44px; flex-shrink: 0;',
        '  font-size: 15px; font-weight: 800;',
        '  color: #fffdfb;',
        '}',
        '.sv-rail-item__label{',
        '  white-space: nowrap;',
        '  opacity: 0; max-width: 0;',
        '  transition: opacity 200ms ease 40ms, max-width 240ms ease;',
        '  font-size: 12px; font-weight: 700;',
        '  letter-spacing: 0.08em; text-transform: uppercase;',
        '  color: #fffdfb !important;',
        '}',
        '.sv-rail-item:hover .sv-rail-item__label,',
        '.sv-rail-item:focus-visible .sv-rail-item__label{',
        '  opacity: 1; max-width: 200px; margin-right: 4px;',
        '}',
        '.sv-rail-item--checkin{ background: rgba(75, 33, 72, 0.94); }',
        '.sv-rail-item--checkin[data-checked="1"]{ background: rgba(44, 125, 60, 0.94); border-color: rgba(255,253,251,0.35); }',
        '.sv-rail-item--checkin[data-checked="1"]:hover{ background: #2c7d3c; }',
        '.sv-rail-item--checkin .sv-rail-item__icon{ font-family: "Jost", sans-serif; }',
        '@media (max-width: 899px){',
        '  .sv-side-rail{',
        '    right: max(10px, env(safe-area-inset-right));',
        '    top: auto;',
        '    bottom: max(12px, env(safe-area-inset-bottom));',
        '    transform: none;',
        '    align-items: flex-end;',
        '  }',
        '  body.sv-has-rail{ padding-right: 0; padding-bottom: calc(64px + env(safe-area-inset-bottom)); }',
        '  .sv-rail-item{',
        '    min-height: 48px; min-width: 48px; max-width: min(280px, calc(100vw - 20px));',
        '    padding: 0 16px 0 6px; justify-content: flex-start;',
        '  }',
        '  .sv-rail-item__icon{ width: 38px; height: 48px; font-size: 16px; }',
        '  .sv-rail-item__label{',
        '    opacity: 1; max-width: 220px; margin-right: 2px;',
        '    font-size: 12px; letter-spacing: 0.055em;',
        '  }',
        '}',
        '@media print{ .sv-side-rail{ display: none !important; } }',
      ].join('');
      document.head.appendChild(s);
    }

    var rail = document.querySelector('.sv-side-rail');
    if (!rail) {
      rail = document.createElement('div');
      rail.className = 'sv-side-rail';
      document.body.appendChild(rail);
    }
    document.body.classList.add('sv-has-rail');

    window.svRail = { container: rail };
    return window.svRail;
  }

  function mount() {
    if (document.querySelector('.sv-rail-item--back')) return;
    var rail = ensureRail().container;
    var a = document.createElement('a');
    a.className = 'sv-rail-item sv-rail-item--back';
    a.href = target;
    a.dataset.returnKind = hasInternalReturn ? 'previous' : 'home-fallback';
    a.setAttribute('aria-label', hasInternalReturn
      ? 'Back to ' + label
      : 'Go to SUNNYVAiLE home');
    a.innerHTML =
      '<span class="sv-rail-item__icon" aria-hidden="true">←</span>' +
      '<span class="sv-rail-item__label">' +
      (hasInternalReturn ? 'Back to ' + label : 'SUNNYVAiLE home') +
      '</span>';
    a.addEventListener('click', function (e) {
      if (hasInternalReturn && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
    // Insert back-nav at TOP of rail
    rail.insertBefore(a, rail.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
