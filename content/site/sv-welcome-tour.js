/**
 * THE WELCOME TOUR — first-visit guided walk through SUNNYVAiLE.
 *
 * Six stops, one escort chip: Visitor's Centre → Chick Flicks → SUNNYVAiLE
 * High → KSVL → Mme CLAi-O's → MAiKEOVER (make your card). Starts ONLY when
 * the visitor asks (menu item, homepage button, or the Visitor's Centre
 * offer) — never auto-plays, never returns after finish/skip.
 *
 * State: localStorage 'laidies_welcome_tour' = { step, startedAt, done, skipped }
 * Start link format: any page can link to /visitors-centre.html?welcome-tour=start
 */
(function () {
  'use strict';

  var KEY = 'laidies_welcome_tour';

  var STOPS = [
    { href: '/visitors-centre.html', name: "The Welcome Wagon", emoji: '🗺️',
      line: "Every good town starts at the Visitor's Centre. Have a look around — this is what SUNNYVAiLE is." },
    { href: '/chick-flicks.html', name: 'The Chick Flicks', emoji: '📼',
      line: "Rent this week's episode — it's how the whole town learns AI. One a week, always a chick flick." },
    { href: '/sunnyvaile-high.html', name: 'SUNNYVAiLE High', emoji: '🎓',
      line: 'Take the pop quiz on what you watched. Your score banks butterfly clips for your Closet.' },
    { href: '/radio.html', name: 'KSVL 99.9', emoji: '📻',
      line: 'Turn the radio on. DJ SunnyV plays the town — and the music follows you everywhere you go.' },
    { href: '/games/madame-claio.html', name: "Mme CLAi-O's", emoji: '🔮',
      line: 'One fortune before you go. The paper knows best.' },
    { href: '/clubhouse-pass.html', name: 'MAiKEOVER on MAiN(e)', emoji: '💄',
      line: "You've seen the town — time to live here. Make your Residence Card and become a resident." }
  ];

  function readState() {
    try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; }
  }
  function writeState(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }
  function brandHtml(s) { return esc(s).replace(/Ai/g, '<span class="ai">Ai</span>'); }

  var STYLE = ''
    + '.svwt-chip { position: fixed; right: 16px; bottom: 88px; z-index: 9300; width: min(320px, calc(100vw - 32px));'
    + '  background: linear-gradient(160deg, #3a1838 0%, #4b2148 100%); color: #fffdfb;'
    + '  border: 2px solid var(--gold, #c9a227); border-radius: 14px; padding: 14px 16px 12px;'
    + '  box-shadow: 0 14px 40px rgba(26,8,24,0.45); font-family: "Jost", sans-serif; }'
    + '.svwt-eyebrow { display: flex; align-items: center; justify-content: space-between; gap: 8px;'
    + '  font-size: 9.5px; font-weight: 800; letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold, #c9a227); margin: 0 0 6px; }'
    + '.svwt-skip { background: transparent; border: 0; color: rgba(255,253,251,0.55); font-size: 13px; cursor: pointer; padding: 2px 4px; font-family: inherit; }'
    + '.svwt-skip:hover { color: #fffdfb; }'
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
    + '.svwt-offer { position: fixed; right: 16px; bottom: 88px; z-index: 9300;'
    + '  display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px;'
    + '  background: linear-gradient(160deg, #3a1838 0%, #4b2148 100%); color: #fffdfb;'
    + '  border: 2px solid var(--gold, #c9a227); border-radius: 999px; cursor: pointer;'
    + '  box-shadow: 0 12px 32px rgba(26,8,24,0.4); font: 700 13px/1.2 "Jost", sans-serif; }'
    + '.svwt-offer:hover { transform: translateY(-2px); }'
    + '.svwt-offer .svwt-offer-x { color: rgba(255,253,251,0.5); margin-left: 4px; font-size: 14px; }'
    + '@media (max-width: 640px) { .svwt-chip, .svwt-offer { bottom: 80px; right: 10px; } }';

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
        ? '<a class="svwt-next" href="#" data-svwt-finish>Finish the tour 🎉</a>'
        : '<a class="svwt-next" href="' + esc(STOPS[nextIdx].href) + '" data-svwt-advance>Next stop · ' + esc(STOPS[nextIdx].name) + ' →</a>';
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>🚌 Welcome Tour · Stop ' + (stepIdx + 1) + ' of ' + STOPS.length + '</span>'
        + '<button type="button" class="svwt-skip" data-svwt-skip title="End the tour">✕</button></p>'
        + '<p class="svwt-name">' + stop.emoji + ' ' + brandHtml(stop.name) + '</p>'
        + '<p class="svwt-line">' + brandHtml(stop.line) + '</p>'
        + btn
        + '<div class="svwt-dots">' + dots + '</div>';
    } else {
      // Wandered off-route: gentle escort back, no guilt.
      chip.innerHTML =
        '<p class="svwt-eyebrow"><span>🚌 Welcome Tour · paused</span>'
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
      '<p class="svwt-eyebrow"><span>🚌 Welcome Tour · complete</span></p>'
      + '<p class="svwt-name">🎉 Official Tourist!</p>'
      + '<p class="svwt-line">You walked the whole town. Make your Residence Card right here and it all starts counting — clips, charms, stickers, the works.</p>'
      + '<a class="svwt-next" href="#maikeover-form" onclick="this.closest(\'.svwt-chip\').remove()">Make my card ★</a>';
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
    offer.innerHTML = '🚌 <span>First time in town? Take the <strong>Welcome Tour</strong></span><span class="svwt-offer-x" title="No thanks">✕</span>';
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
    writeState({ step: 1, startedAt: new Date().toISOString(), done: false, skipped: false });
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
