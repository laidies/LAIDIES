/**
 * THE WELCOME TOUR — first-visit guided walk through SUNNYVAiLE.
 *
 * Seventeen stops, one escort chip — the full guided walk through
 * SUNNYVAiLE in order, from the Visitor's Centre all the way to MAiKEOVER
 * (make your card), which ends the tour. Starts ONLY when the visitor asks
 * (menu item, homepage button, or the Visitor's Centre offer) — never
 * auto-plays, never returns after finish/skip.
 *
 * State: localStorage 'laidies_welcome_tour' = { step, startedAt, done, skipped }
 * Start link format: any page can link to /visitors-centre.html?welcome-tour=start
 */
(function () {
  'use strict';

  var KEY = 'laidies_welcome_tour';

  var STOPS = [
    { href: '/visitors-centre.html', name: "The Welcome Wagon", icon: 'map',
      line: "Every good town starts at the Visitor's Centre — press play on the trailer up top for a quick taste, then follow me and I'll walk you through every stop in town." },
    { href: '/newsstand.html', name: 'The NewsStand', icon: 'news',
      line: "Check the four source-checked desks: a qualified interruption, consequential briefing, durable synthesis or sourced argument. A quiet desk means no story earned the paper." },
    { href: '/chick-flicks.html', name: 'The Chick Flicks', icon: 'vhs',
      line: "Pull a released episode off the New Releases wall and open its full issue — always a chick flick." },
    { href: '/blend-snap.html', name: 'The Blend & Snap', icon: 'cup',
      line: "Order an episode's Study Pack menu and see exactly what is ready, held, planned or unavailable before you choose a next step." },
    { href: '/sunnyvaile-high.html', name: 'SUNNYVAiLE High', icon: 'gradcap',
      line: "Try a Pop Quiz or class that is currently available. Any score or keepsake is device-local unless the page explicitly proves an account record." },
    { href: '/library.html', name: 'The LIBRAiRY', icon: 'book',
      line: "When the jargon lands on the table, this is the rack where you look it up — the Glossary, the straight answers, and Miss Jeeves at the desk." },
    { href: '/luminairy.html', name: 'The LUMINAiRY', icon: 'candle',
      line: "Visit the three portrait wings on Lantern Hill. Profile research and audio stay visibly held until each exact claim, source and rights record clears review." },
    { href: '/games/madame-claio.html', name: "Mme CLAi-O's", icon: 'crystal',
      line: "Call the psychic hotline and step in for your reading — practical advice, late-night-commercial drama." },
    { href: '/games/fairy-godmother.html', name: 'FAiRY Godmother', icon: 'wand',
      line: "Bring an AI, career or everyday-life question for practical guidance. It is a tool, not homework, and high-stakes professional advice stays out of scope." },
    { href: '/bronze-aige.html', name: 'The BRONZE AiGE', icon: 'martini',
      line: "The town bar — round up your crew, let the Businesswomen's Special pick the drinks, and steal the conversation menu for happy hour at 4." },
    { href: '/mall.html', name: 'The Mall', icon: 'bag',
      line: "Ten stores, all references — every pop-culture moment the town reaches for has its own storefront, with a Directory at the door." },
    { href: '/games/dream-phone.html', name: 'Dream Phone', icon: 'phone',
      line: "Try the experimental Dream Phone: pick a caller for a playful, prewritten reframe — not personalized or professional advice." },
    { href: '/sorority-house.html', name: 'Delta LAi Nu', icon: 'home',
      line: "Visit the Delta LAi Nu clubhouse preview. Account, room and Closet access are available only where the receiving page proves them." },
    { href: '/town-hall.html', name: 'Town Hall', icon: 'columns',
      line: "Deb's office — meet the mayor who's been here longer than anyone, read the poster saga, and drop a Comment Card if something needs handling." },
    { href: '/post-office.html', name: 'The Post Office', icon: 'mail',
      line: "Request the Wednesday Postcard through Buttondown, check the held Resident Card account desk, or prepare a local postcard. This page cannot confirm subscription, email delivery or sign-in." },
    { href: '/radio.html', name: 'KSVL 99.9', icon: 'radio',
      line: "Listen to creator-confirmed LAiDIES originals at KSVL 99.9. Listening position stays on this device." },
    { href: '/maikeover.html', name: 'MAiKEOVER on MAiN', icon: 'lipstick',
      line: "Take the chair, style a device-local Resident Card preview and see the page's honest account status. Cross-device identity is not promised." }
  ];

  function readState() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }
  function writeState(s) {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
      return true;
    } catch (e) {
      return false;
    }
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }
  function brandHtml(s) { return esc(s).replace(/Ai/g, '<span class="ai">Ai</span>'); }

  // Gold kit icons (sv-gold-icons.js) — inline, sized for chip text lines.
  function ic(key, uid, size) {
    return window.svGoldIcon
      ? '<span class="svwt-ic">' + window.svGoldIcon(key, 'wt-' + uid, size || 16) + '</span>'
      : '';
  }

  var STYLE = ''
    + '.svwt-chip { position: fixed; left: 16px; right: auto; bottom: 150px; z-index: 9300; width: min(320px, calc(100vw - 32px));'
    + '  background: linear-gradient(160deg, #3a1838 0%, #4b2148 100%); color: #fffdfb;'
    + '  border: 2px solid var(--gold, #c9a227); border-radius: 14px; padding: 14px 16px 12px;'
    + '  box-shadow: 0 14px 40px rgba(26,8,24,0.45); font-family: "Jost", sans-serif; }'
    + '.svwt-eyebrow { display: flex; align-items: center; justify-content: space-between; gap: 8px;'
    + '  font-size: 9.5px; font-weight: 800; letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold, #c9a227); margin: 0 0 6px; }'
    + '.svwt-skip { background: transparent; border: 0; color: rgba(255,253,251,0.55); font-size: 13px; cursor: pointer; padding: 2px 4px; font-family: inherit; }'
    + '.svwt-skip:hover { color: #fffdfb; }'
    + '.svwt-skip:focus-visible, .svwt-next:focus-visible, .svwt-offer:focus-visible { outline: 3px solid #fffdfb; outline-offset: 3px; }'
    + '.svwt-name { margin: 0 0 4px; font-size: 15.5px; font-weight: 700; }'
    + '.svwt-line { margin: 0 0 12px; font-size: 12.5px; line-height: 1.5; color: rgba(255,253,251,0.88); }'
    + '.svwt-next { display: inline-block; background: var(--gold, #c9a227); color: #341446; border: 0; border-radius: 999px;'
    + '  padding: 8px 18px; font: 800 12px/1 "Jost", sans-serif; letter-spacing: 0.08em; text-transform: uppercase;'
    + '  cursor: pointer; text-decoration: none; transition: background 0.15s ease, transform 0.12s ease; }'
    + '.svwt-next:hover { background: #fffdfb; transform: translateY(-1px); }'
    + '.svwt-dots { display: flex; gap: 5px; margin-top: 11px; }'
    + '.svwt-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,253,251,0.25); }'
    + '.svwt-dot.is-done { background: var(--gold, #c9a227); }'
    + '.svwt-dot.is-here { background: #fffdfb; box-shadow: 0 0 6px rgba(255,253,251,0.8); }'
    + '.svwt-offer { position: fixed; left: 16px; right: auto; bottom: 150px; z-index: 9300;'
    + '  display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px;'
    + '  background: linear-gradient(160deg, #3a1838 0%, #4b2148 100%); color: #fffdfb;'
    + '  border: 2px solid var(--gold, #c9a227); border-radius: 999px; cursor: pointer;'
    + '  box-shadow: 0 12px 32px rgba(26,8,24,0.4); font: 700 13px/1.2 "Jost", sans-serif; }'
    + '.svwt-offer:hover { transform: translateY(-2px); }'
    + '.svwt-offer .svwt-offer-x { color: rgba(255,253,251,0.5); margin-left: 4px; font-size: 14px; }'
    + '.svwt-ic { display: inline-flex; vertical-align: -3px; margin-right: 2px; }'
    + '@media (max-width: 640px) { .svwt-chip, .svwt-offer { bottom: 130px; left: 10px; right: auto; } }';

  function injectStyle() {
    if (document.getElementById('svwt-style')) return;
    var st = document.createElement('style');
    st.id = 'svwt-style';
    st.textContent = STYLE;
    document.head.appendChild(st);
  }

  function pathNow() { return window.location.pathname.replace(/\/index\.html$/, '/'); }

  function endTour(state, how) {
    state = state || {};
    state.done = how === 'done';
    state.skipped = how === 'skipped';
    writeState(state);
    var chip = document.getElementById('svwtChip');
    if (chip) chip.remove();
  }

  function renderChip(state) {
    injectStyle();
    var stepIdx = Math.min(Math.max(state.step - 1, 0), STOPS.length - 1);
    var stop = STOPS[stepIdx];
    var onStopPage = pathNow() === stop.href;
    var isLast = stepIdx === STOPS.length - 1;

    var old = document.getElementById('svwtChip');
    if (old) old.remove();
    var chip = document.createElement('div');
    chip.id = 'svwtChip';
    chip.className = 'svwt-chip';
    chip.setAttribute('role', 'complementary');
    chip.setAttribute('aria-label', 'Welcome Tour guide');

    var dots = STOPS.map(function (s, i) {
      var cls = 'svwt-dot' + (i < stepIdx ? ' is-done' : (i === stepIdx ? ' is-here' : ''));
      return '<span class="' + cls + '" title="' + esc(s.name) + '"></span>';
    }).join('');

    if (onStopPage) {
      // At the stop: explain it, offer the next leg (or the finale).
      var nextIdx = stepIdx + 1;
      var btn = isLast
        ? '<a class="svwt-next" href="#" data-svwt-finish>Finish the tour ★</a>'
        : '<a class="svwt-next" href="' + esc(STOPS[nextIdx].href) + '" data-svwt-advance>Next stop · ' + esc(STOPS[nextIdx].name) + ' →</a>';
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>' + ic('bus', 'eb1', 13) + ' Welcome Tour · Stop ' + (stepIdx + 1) + ' of ' + STOPS.length + '</span>'
        + '<button type="button" class="svwt-skip" data-svwt-skip title="End the tour">✕</button></p>'
        + '<p class="svwt-name">' + ic(stop.icon, 'stop' + stepIdx, 17) + ' ' + brandHtml(stop.name) + '</p>'
        + '<p class="svwt-line">' + brandHtml(stop.line) + '</p>'
        + btn
        + '<div class="svwt-dots">' + dots + '</div>';
    } else {
      // Wandered off-route: gentle escort back, no guilt.
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>' + ic('bus', 'eb2', 13) + ' Welcome Tour · paused</span>'
        + '<button type="button" class="svwt-skip" data-svwt-skip title="End the tour">✕</button></p>'
        + '<p class="svwt-line">Exploring — love that. Your tour is waiting whenever you are.</p>'
        + '<a class="svwt-next" href="' + esc(stop.href) + '">Back to stop ' + (stepIdx + 1) + ' · ' + esc(stop.name) + ' →</a>'
        + '<div class="svwt-dots">' + dots + '</div>';
    }
    document.body.appendChild(chip);

    chip.addEventListener('click', function (e) {
      if (e.target.closest('[data-svwt-skip]')) {
        endTour(state, 'skipped');
        return;
      }
      var adv = e.target.closest('[data-svwt-advance]');
      if (adv) {
        state.step = stepIdx + 2;
        writeState(state);
        return; // the link navigates
      }
      var fin = e.target.closest('[data-svwt-finish]');
      if (fin) {
        e.preventDefault();
        state.completedAt = new Date().toISOString();
        endTour(state, 'done');
        celebrate();
      }
    });
  }

  function celebrate() {
    injectStyle();
    var chip = document.createElement('div');
    chip.id = 'svwtChip';
    chip.className = 'svwt-chip';
    chip.innerHTML =
      '<p class="svwt-eyebrow"><span>' + ic('bus', 'eb3', 13) + ' Welcome Tour · complete</span></p>'
      + '<p class="svwt-name">' + ic('star', 'fin', 17) + ' Official Tourist!</p>'
      + '<p class="svwt-line">You\'ve visited every stop. If you want, make a device-local Resident Card preview here; the page will label any account features that are still held.</p>'
      + '<a class="svwt-next" href="#maikeover-form" onclick="this.closest(\'.svwt-chip\').remove()">Preview my card ★</a>';
    document.body.appendChild(chip);
    setTimeout(function () {
      var c = document.getElementById('svwtChip');
      if (c) c.remove();
    }, 30000);
  }

  // Offer chip: shown ONLY on the Visitor's Centre to visitors who have
  // never started, finished, or skipped the tour.
  function renderOffer() {
    injectStyle();
    var offer = document.createElement('button');
    offer.type = 'button';
    offer.className = 'svwt-offer';
    offer.innerHTML = ic('bus', 'offer', 18) + ' <span>First time in town? Take the <strong>Welcome Tour</strong></span><span class="svwt-offer-x" title="No thanks">✕</span>';
    offer.addEventListener('click', function (e) {
      if (e.target.closest('.svwt-offer-x')) {
        writeState({ step: 0, skipped: true });
        offer.remove();
        return;
      }
      startTour();
    });
    document.body.appendChild(offer);
  }

  function startTour() {
    if (!writeState({ step: 1, startedAt: new Date().toISOString(), done: false, skipped: false })) {
      var offer = document.querySelector('.svwt-offer');
      if (offer) offer.remove();
      injectStyle();
      var notice = document.createElement('div');
      notice.id = 'svwtChip';
      notice.className = 'svwt-chip';
      notice.setAttribute('role', 'status');
      notice.innerHTML =
        '<p class="svwt-eyebrow"><span>Welcome Tour · unavailable</span></p>'
        + '<p class="svwt-line">This browser cannot save tour progress. The town directory still works, and you can try the tour again after enabling site storage.</p>'
        + '<button class="svwt-next" type="button">Keep using the Visitor\'s Centre</button>';
      notice.querySelector('button').addEventListener('click', function () { notice.remove(); });
      document.body.appendChild(notice);
      notice.querySelector('button').focus();
      return;
    }
    if (pathNow() === STOPS[0].href) {
      var offer = document.querySelector('.svwt-offer');
      if (offer) offer.remove();
      renderChip(readState());
    } else {
      window.location.href = STOPS[0].href + '?welcome-tour=started';
    }
  }
  window.SVWT_start = startTour;

  function mount() {
    var params = new URLSearchParams(window.location.search);
    var state = readState();

    // Explicit start via link (?welcome-tour=start) always wins.
    if (params.get('welcome-tour') === 'start') { startTour(); return; }

    if (state && !state.done && !state.skipped && state.step >= 1) {
      renderChip(state);
      return;
    }
    // Never started, never dismissed → offer it, on the Visitor's Centre only.
    if (!state && pathNow() === '/visitors-centre.html') {
      renderOffer();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
