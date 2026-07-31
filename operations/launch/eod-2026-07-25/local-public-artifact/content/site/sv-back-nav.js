/**
 * SUNNYVAiLE back-nav — right-rail item
 *
 * Renders as a collapsed circle icon in a shared right-side rail. Expands to
 * a full pill on hover/focus. Content-page body reserves right padding on
 * desktop so pills never overlap page content. Mobile keeps a compact
 * bottom-right cluster.
 *
 * Only shows when the visitor arrived from within the site (same-origin
 * referrer). Home page is exempt.
 *
 * Usage:
 *   <script defer src="/content/site/sv-back-nav.js?v=1"></script>
 */
(function () {
  'use strict';

  // Only skip the back-nav when the visitor landed on the home page directly
  // (no referrer). If they navigated to home from another SUNNYVAiLE page, they
  // still deserve a way back.
  var ref = '';
  try { ref = document.referrer || ''; } catch (e) {}
  if (!ref) return;

  var refURL;
  try { refURL = new URL(ref); } catch (e) { return; }
  if (refURL.origin !== location.origin) return;
  if (refURL.pathname === location.pathname) return;

  var TITLES = {
    '/': 'the town',
    '/index.html': 'the town',
    '/visitors-centre.html': 'the Welcome Wagon',
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
    '/games/fun-pack.html': 'the arcade',
    '/games/trading-cards.html': 'Trading Cards',
    '/games/dj-booth.html': 'DJ Booth',
    '/games/cocktail-fortune.html': 'Cocktail Fortune',
  };

  var label = TITLES[refURL.pathname] || 'the last stop';

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
        '  height: 34px; min-width: 34px; max-width: 34px;',
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
        '  width: 34px; height: 34px; flex-shrink: 0;',
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
        '  .sv-side-rail{ right: 10px; top: auto; bottom: 12px; transform: none; }',
        '  body.sv-has-rail{ padding-right: 0; padding-bottom: 52px; }',
        '  .sv-rail-item{ height: 30px; min-width: 30px; max-width: 30px; }',
        '  .sv-rail-item__icon{ width: 30px; height: 30px; font-size: 13px; }',
        '  .sv-rail-item__label{ font-size: 11px; }',
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
    a.href = '#';
    a.setAttribute('aria-label', 'Go back to ' + label);
    a.innerHTML =
      '<span class="sv-rail-item__icon" aria-hidden="true">←</span>' +
      '<span class="sv-rail-item__label">Back to ' + label + '</span>';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (history.length > 1) {
        history.back();
      } else {
        location.href = refURL.pathname + refURL.search;
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
