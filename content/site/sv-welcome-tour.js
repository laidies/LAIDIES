/**
 * THE WELCOME TOUR — first-visit guided walk through SUNNYVAiLE.
 *
 * Seventeen stops, one escort chip — the full guided walk through
 * SUNNYVAiLE in order, from the Visitor’s Centre all the way to MAiKEOVER
 * (make your card), which ends the tour. Starts ONLY when the visitor asks
 * (menu item, homepage button, or the Visitor’s Centre offer) — never
 * auto-plays, never returns after finish/skip.
 *
 * State: localStorage 'laidies_welcome_tour' = { step, startedAt, done, skipped }
 * Start link format: any page can link to /visitors-centre.html?welcome-tour=start
 */
(function () {
  'use strict';

  var KEY = 'laidies_welcome_tour';

  var STOPS = [
    { href: '/visitors-centre.html', name: "Visitor’s Centre", icon: 'map',
      line: "This is the town front desk. Pick a building on the wall—or choose one by name below—to see what happens there before you step inside." },
    { href: '/newsstand.html', name: 'The NewsStand', icon: 'news',
      line: "Catch breaking news, a clear daily explainer, the week’s bigger picture and The Tribune’s take on the questions behind the headlines." },
    { href: '/chick-flicks.html', name: 'The Chick Flicks', icon: 'vhs',
      line: "Pull a released episode off the New Releases wall and open its full issue — always a chick flick." },
    { href: '/blend-snap.html', name: 'The Blend & Snap', icon: 'cup',
      line: "Order an episode’s Study Pack. The café shows what is ready, held, planned or unavailable before you choose a Try-On, guide or activity." },
    { href: '/sunnyvaile-high.html', name: 'SUNNYVAiLE High', icon: 'gradcap',
      line: "Try a Pop Quiz or class that is currently available. Any score or keepsake is device-local unless the page explicitly proves an account record." },
    { href: '/library.html', name: 'The LIBRAiRY', icon: 'book',
      line: "When the jargon lands on the table, this is the rack where you look it up — the Glossary, the straight answers, and Miss Jeeves at the desk." },
    { href: '/luminairy.html', name: 'The LUMINAiRY', icon: 'candle',
      line: "Visit the three guide wings on Lantern Hill. Profile research and audio stay visibly held until each exact claim, source and rights record clears review." },
    { href: '/games/madame-claio.html', name: "Mme CLAi-O's", icon: 'crystal',
      line: "Call the psychic hotline and step in for your reading — practical advice, late-night-commercial drama." },
    { href: '/games/fairy-godmother.html', name: 'FAiRY Godmother', icon: 'wand',
      line: "Bring an AI, career or everyday-life question for practical guidance. It is a tool, not homework, and high-stakes professional advice stays out of scope." },
    { href: '/bronze-aige.html', name: 'The BRONZE AiGE', icon: 'martini',
      line: "The town bar — round up your crew, let the Businesswomen's Special pick the drinks, and steal the conversation menu for happy hour at 4." },
    { href: '/mall.html', name: 'The Mall', icon: 'bag',
      line: "Ten stores, all references — every pop-culture moment the town reaches for has its own storefront, with a Directory at the door." },
    { href: '/games/dream-phone.html', name: 'Dream Phone', icon: 'phone',
      line: "Call a SUNNYVAiLE character for a playful new perspective, or try For Real / As If and investigate an AI claim." },
    { href: '/sorority-house.html', name: 'Delta LAi Nu', icon: 'home',
      line: "Visit the Delta LAi Nu clubhouse for Girl Talk, community rooms and your Closet." },
    { href: '/town-hall.html', name: 'Town Hall', icon: 'columns',
      line: "Deb's office — meet the mayor who's been here longer than anyone, read the poster saga, and drop a Comment Card if something needs handling." },
    { href: '/post-office.html', name: 'The Post Office', icon: 'mail',
      line: "Get the Wednesday Postcard, sign in or make a SUNNYVAiLE postcard of your own." },
    { href: '/radio.html', name: 'KSVL 99.9', icon: 'radio',
      line: "Visit KSVL's programme shelf and see its current catalogue. Start listening only if the station itself marks an exact track available; this tour does not prove playback." },
    { href: '/maikeover.html', name: 'MAiKEOVER on MAiN', icon: 'lipstick',
      line: "Take the chair, make your Resident Card and give your SUNNYVAiLE identity a proper makeover." }
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

  var STYLE = ''
    + '.svwt-chip { position: fixed; left: 18px; right: auto; bottom: 132px; z-index: 9300; width: min(390px, calc(100vw - 36px));'
    + '  background: linear-gradient(145deg, #070f2b 0%, #11183b 68%, #2457e6 145%); color: #fffdfb;'
    + '  border: 4px solid #11183b; border-left-color: #f254a9; border-bottom-color: #15bce0; border-radius: 0; padding: 16px 18px 15px;'
    + '  box-shadow: 10px 10px 0 #f254a9; font-family: "Jost", sans-serif; }'
    + '.svwt-eyebrow { display: flex; align-items: center; justify-content: space-between; gap: 8px;'
    + '  font-size: 10px; font-weight: 900; letter-spacing: 0.21em; text-transform: uppercase; color: #ff7366; margin: 0 0 9px; }'
    + '.svwt-controls { display: inline-flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }'
    + '.svwt-pause, .svwt-skip, .svwt-resume-button, .svwt-end-button, .svwt-offer-start, .svwt-offer-dismiss {'
    + '  min-height: 38px; border: 2px solid #15bce0; border-radius: 0; background: transparent; color: #fffdfb; cursor: pointer; padding: 6px 9px; font: 850 11px/1 "Jost", sans-serif; }'
    + '.svwt-skip, .svwt-end-button, .svwt-offer-dismiss { border-color: #f254a9; }'
    + '.svwt-pause:hover, .svwt-resume-button:hover, .svwt-offer-start:hover { background: #15bce0; color: #070f2b; }'
    + '.svwt-skip:hover, .svwt-end-button:hover, .svwt-offer-dismiss:hover { background: #f254a9; color: #070f2b; }'
    + '.svwt-pause:focus-visible, .svwt-skip:focus-visible, .svwt-next:focus-visible, .svwt-resume-button:focus-visible,'
    + ' .svwt-end-button:focus-visible, .svwt-offer-start:focus-visible, .svwt-offer-dismiss:focus-visible { outline: 3px solid #fffdfb; outline-offset: 3px; }'
    + '.svwt-name { margin: 0 0 6px; color: #78c7ff; font-size: 19px; font-weight: 900; }'
    + '.svwt-name .ai { color: #f254a9; }'
    + '.svwt-line { margin: 0 0 14px; font-size: 13.5px; line-height: 1.5; color: #fffdfb; }'
    + '.svwt-next { display: inline-flex; min-height: 44px; align-items: center; background: #ff7366; color: #070f2b; border: 3px solid #11183b; border-radius: 0;'
    + '  padding: 9px 15px; box-shadow: 5px 5px 0 #15bce0; font: 900 12px/1.15 "Jost", sans-serif; letter-spacing: 0.06em; text-transform: uppercase;'
    + '  cursor: pointer; text-decoration: none; transition: transform 0.12s ease; }'
    + '.svwt-next:hover { transform: translate(-2px,-2px); }'
    + '.svwt-progress { display: grid; grid-template-columns: repeat(17, 1fr); gap: 3px; margin-top: 15px; }'
    + '.svwt-progress-segment { height: 5px; background: rgba(120,199,255,.28); }'
    + '.svwt-progress-segment.is-done { background: #15bce0; }'
    + '.svwt-progress-segment.is-here { background: #f254a9; }'
    + '.svwt-offer, .svwt-paused { position: fixed; left: 18px; right: auto; bottom: 132px; z-index: 9300; width: min(390px, calc(100vw - 36px));'
    + '  display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; padding: 14px 16px;'
    + '  background: linear-gradient(112deg, #2457e6 0%, #7137d6 52%, #f254a9 145%); color: #fffdfb;'
    + '  border: 4px solid #11183b; border-radius: 0; box-shadow: 8px 8px 0 #15bce0; font: 800 13px/1.3 "Jost", sans-serif; }'
    + '.svwt-offer-actions, .svwt-paused-actions { display: flex; flex-wrap: wrap; gap: 8px; }'
    + '.svwt-offer-start, .svwt-resume-button { background: #15bce0; color: #070f2b; border-color: #11183b; }'
    + '@media (max-width: 640px) { .svwt-chip, .svwt-offer, .svwt-paused { left: 10px; right: 10px; bottom: 18px; width: auto; }'
    + ' .svwt-eyebrow { align-items: flex-start; flex-direction: column; } .svwt-controls { justify-content: flex-start; }'
    + ' .svwt-offer, .svwt-paused { grid-template-columns: 1fr; } }';

  function injectStyle() {
    if (document.getElementById('svwt-style')) return;
    var st = document.createElement('style');
    st.id = 'svwt-style';
    st.textContent = STYLE;
    document.head.appendChild(st);
  }

  function pathNow() { return window.location.pathname.replace(/\/index\.html$/, '/'); }

  function clearExplicitStart() {
    try {
      var url = new URL(window.location.href);
      if (url.searchParams.get('welcome-tour') !== 'start') return;
      url.searchParams.delete('welcome-tour');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  function endTour(state, how) {
    state = state || {};
    state.done = how === 'done';
    state.skipped = how === 'skipped';
    writeState(state);
    var chip = document.getElementById('svwtChip');
    if (chip) chip.remove();
    var paused = document.getElementById('svwtPaused');
    if (paused) paused.remove();
  }

  function renderPausedOffer(state) {
    injectStyle();
    var old = document.getElementById('svwtPaused');
    if (old) old.remove();
    var paused = document.createElement('div');
    paused.id = 'svwtPaused';
    paused.className = 'svwt-paused';
    paused.setAttribute('role', 'region');
    paused.setAttribute('aria-label', 'Welcome Tour paused');
    paused.innerHTML = '<span>Welcome Tour paused at stop ' + Math.max(1, Number(state.step) || 1) + ' of ' + STOPS.length + '.</span>'
      + '<span class="svwt-paused-actions"><button type="button" class="svwt-resume-button">Resume tour</button>'
      + '<button type="button" class="svwt-end-button">End tour</button></span>';
    paused.querySelector('.svwt-resume-button').addEventListener('click', function () {
      state.paused = false;
      writeState(state);
      paused.remove();
      renderChip(state);
    });
    paused.querySelector('.svwt-end-button').addEventListener('click', function () {
      endTour(state, 'skipped');
    });
    document.body.appendChild(paused);
    paused.querySelector('.svwt-resume-button').focus();
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

    var progress = STOPS.map(function (s, i) {
      var cls = 'svwt-progress-segment' + (i < stepIdx ? ' is-done' : (i === stepIdx ? ' is-here' : ''));
      return '<span class="' + cls + '" title="' + esc(s.name) + '"></span>';
    }).join('');

    if (onStopPage) {
      // At the stop: explain it, offer the next leg (or the finale).
      var nextIdx = stepIdx + 1;
      var btn = isLast
        ? '<a class="svwt-next" href="#" data-svwt-finish>Finish the tour</a>'
        : '<a class="svwt-next" href="' + esc(STOPS[nextIdx].href) + '" data-svwt-advance>Next stop · ' + esc(STOPS[nextIdx].name) + ' →</a>';
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>Welcome Tour · Stop ' + (stepIdx + 1) + ' of ' + STOPS.length + '</span>'
        + '<span class="svwt-controls"><button type="button" class="svwt-pause" data-svwt-pause>Pause tour</button>'
        + '<button type="button" class="svwt-skip" data-svwt-skip>End tour</button></span></p>'
        + '<p class="svwt-name">' + brandHtml(stop.name) + '</p>'
        + '<p class="svwt-line">' + brandHtml(stop.line) + '</p>'
        + btn
        + '<div class="svwt-progress" aria-label="Tour progress">' + progress + '</div>';
    } else {
      // Wandered off-route: gentle escort back, no guilt.
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>Welcome Tour · waiting at stop ' + (stepIdx + 1) + '</span>'
        + '<span class="svwt-controls"><button type="button" class="svwt-pause" data-svwt-pause>Pause tour</button>'
        + '<button type="button" class="svwt-skip" data-svwt-skip>End tour</button></span></p>'
        + '<p class="svwt-line">Exploring — love that. Your tour is waiting whenever you are.</p>'
        + '<a class="svwt-next" href="' + esc(stop.href) + '">Back to stop ' + (stepIdx + 1) + ' · ' + esc(stop.name) + ' →</a>'
        + '<div class="svwt-progress" aria-label="Tour progress">' + progress + '</div>';
    }
    document.body.appendChild(chip);

    chip.addEventListener('click', function (e) {
      if (e.target.closest('[data-svwt-pause]')) {
        state.paused = true;
        writeState(state);
        chip.remove();
        renderPausedOffer(state);
        return;
      }
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
      '<p class="svwt-eyebrow"><span>Welcome Tour · complete</span></p>'
      + '<p class="svwt-name">Official Tourist!</p>'
      + '<p class="svwt-line">You\'ve visited every stop. If you want, finish by making your Resident Card at MAiKEOVER on MAiN.</p>'
      + '<a class="svwt-next" href="#maikeover-form" onclick="this.closest(\'.svwt-chip\').remove()">Preview my card</a>';
    document.body.appendChild(chip);
    setTimeout(function () {
      var c = document.getElementById('svwtChip');
      if (c) c.remove();
    }, 30000);
  }

  // Offer chip: shown ONLY on the Visitor’s Centre to visitors who have
  // never started, finished, or skipped the tour.
  function renderOffer() {
    injectStyle();
    var offer = document.createElement('div');
    offer.className = 'svwt-offer';
    offer.setAttribute('role', 'region');
    offer.setAttribute('aria-label', 'Welcome Tour offer');
    offer.innerHTML = '<span>First time in town? Take the <strong>Welcome Tour</strong>.</span>'
      + '<span class="svwt-offer-actions"><button type="button" class="svwt-offer-start">Start tour</button>'
      + '<button type="button" class="svwt-offer-dismiss">No thanks</button></span>';
    offer.addEventListener('click', function (e) {
      if (e.target.closest('.svwt-offer-dismiss')) {
        writeState({ step: 0, skipped: true });
        offer.remove();
        return;
      }
      if (e.target.closest('.svwt-offer-start')) startTour();
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
    clearExplicitStart();
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
      if (state.paused) renderPausedOffer(state);
      else renderChip(state);
      return;
    }
    // Never started, never dismissed → offer it, on the Visitor’s Centre only.
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
