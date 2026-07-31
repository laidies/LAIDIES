/**
 * Charm Hunt — shared hunt mechanic across SUNNYVAiLE building pages.
 *
 * Progression model (locked 2026-07-02):
 *   1. On first visit, we stamp `laidies_signup_at` in localStorage.
 *   2. Weeks 1–3 unlock IMMEDIATELY (welcome bundle) — 21 charms huntable.
 *   3. Week 4+ unlocks activity-gated: every completed Wednesday Tour advances
 *      the user's personal week by 1. No calendar cap; late joiners can chain-
 *      complete Tours to burn through weeks.
 *   4. Personal week = 3 (bundle) + tourCompletions
 *   5. FAiRY-wish reward stays rate-limited to 1 per real Wednesday (unchanged).
 *
 * Storage keys:
 *   laidies_signup_at        — timestamp (ISO) of first visit; drives Coven age
 *   laidies_charms_found     — array of collected charm slugs
 *   laidies_tour_completions — integer, incremented every time Wednesday Tour hits 8/8
 *
 * On each building page, we render sparkles for every currently-unlocked
 * week's charm at this building that the user hasn't found yet.
 */
(function () {
  'use strict';

  var LS_CHARMS = 'laidies_charms_found';
  var LS_SIGNUP = 'laidies_signup_at';
  var LS_TOUR_COMPLETIONS = 'laidies_tour_completions';
  var WELCOME_BUNDLE = 3;   // Weeks 1-3 unlocked by default

  // Charm content — 3 weeks × 7 buildings = 21 charms.
  // Weeks 4+ are added over time by Ali; the mechanic scales with the array.
  var CHARMS = [
    // ── Week 1 · The Starter Set ─────────────────────────────────────
    // Coords calibrated to the FINAL face-on y2k-v3 set (2026-07-04).
    { week: 1, slug: 'w1-butterfly-clip',   emoji: '🌸',  name: 'Butterfly Clip',   building: 'MAiKEOVER',            page: 'maikeover',       x: 18, y: 72 },
    { week: 1, slug: 'w1-sealed-envelope',  emoji: '💌',  name: 'Sealed Envelope',  building: 'Post Office',          page: 'post-office',     x: 13, y: 71 },
    { week: 1, slug: 'w1-rhinestone-star',  emoji: '⭐',  name: 'Rhinestone Star',  building: 'BRONZE AiGE',          page: 'bronze-aige',     x: 23, y: 70 },
    { week: 1, slug: 'w1-crescent-moon',    emoji: '🌙',  name: 'Crescent Moon',    building: "Mme CLAi-O's Shop",    page: 'mme-claios-shop', x: 61, y: 88 },
    { week: 1, slug: 'w1-sorority-ribbon',  emoji: '🎀',  name: 'Sorority Ribbon',  building: 'Delta LAi Nu',         page: 'sorority-house',  x: 22, y: 43 },
    { week: 1, slug: 'w1-skeleton-key',     emoji: '🗝️', name: 'Skeleton Key',     building: 'Town Hall',            page: 'town-hall',       x: 50, y: 63 },
    { week: 1, slug: 'w1-pink-gem',         emoji: '💎',  name: 'Pink Gem',         building: 'Chick Flicks',         page: 'chick-flicks',    x: 31, y: 55 },

    // ── Week 2 · The Vanity Set ──────────────────────────────────────
    { week: 2, slug: 'w2-lip-gloss-wand',   emoji: '💄',  name: 'Lip Gloss Wand',   building: 'MAiKEOVER',            page: 'maikeover',       x: 80, y: 52 },
    { week: 2, slug: 'w2-postmark-stamp',   emoji: '✉️', name: 'Postmark Stamp',   building: 'Post Office',          page: 'post-office',     x: 72, y: 60 },
    { week: 2, slug: 'w2-cocktail-umbrella',emoji: '🍸',  name: 'Cocktail Umbrella',building: 'BRONZE AiGE',          page: 'bronze-aige',     x: 73, y: 65 },
    { week: 2, slug: 'w2-crystal-ball',     emoji: '🔮',  name: 'Crystal Ball',     building: "Mme CLAi-O's Shop",    page: 'mme-claios-shop', x: 40, y: 92 },
    { week: 2, slug: 'w2-yearbook-quote',   emoji: '📖',  name: 'Yearbook Quote',   building: 'Delta LAi Nu',         page: 'sorority-house',  x: 31, y: 64 },
    { week: 2, slug: 'w2-nope-stamp',       emoji: '🚫',  name: 'NOPE Stamp',       building: 'Town Hall',            page: 'town-hall',       x: 76, y: 66 },
    { week: 2, slug: 'w2-vhs-tape',         emoji: '📼',  name: 'VHS Tape',         building: 'Chick Flicks',         page: 'chick-flicks',    x: 66, y: 73 },

    // ── Week 3 · The Bright Set ──────────────────────────────────────
    { week: 3, slug: 'w3-nail-polish',      emoji: '💅',  name: 'Nail Polish',      building: 'MAiKEOVER',            page: 'maikeover',       x: 22, y: 52 },
    { week: 3, slug: 'w3-bouquet-ribbon',   emoji: '💐',  name: 'Bouquet Ribbon',   building: 'Post Office',          page: 'post-office',     x: 88, y: 78 },
    { week: 3, slug: 'w3-mic-charm',        emoji: '🎤',  name: 'Microphone Charm', building: 'BRONZE AiGE',          page: 'bronze-aige',     x: 54, y: 74 },
    { week: 3, slug: 'w3-star-chart',       emoji: '🌟',  name: 'Star Chart',       building: "Mme CLAi-O's Shop",    page: 'mme-claios-shop', x: 34, y: 8 },
    { week: 3, slug: 'w3-burn-bookmark',    emoji: '📔',  name: 'Burn Book Mark',   building: 'Delta LAi Nu',         page: 'sorority-house',  x: 59, y: 22 },
    { week: 3, slug: 'w3-ballot-stub',      emoji: '🗳️', name: 'Ballot Stub',      building: 'Town Hall',            page: 'town-hall',       x: 10, y: 72 },
    { week: 3, slug: 'w3-film-reel',        emoji: '🎞️', name: 'Film Reel',        building: 'Chick Flicks',         page: 'chick-flicks',    x: 23, y: 55 },

    // ── Week 4 · The Keepsake Set ────────────────────────────────────
    // Coords are calibrated to the current compact storefront/building heroes.
    { week: 4, slug: 'w4-mood-ring',        emoji: '💍',  name: 'Mood Ring',        building: 'MAiKEOVER',            page: 'maikeover',       x: 60, y: 73 },
    { week: 4, slug: 'w4-gel-pen',          emoji: '🖊️', name: 'Gel Pen',          building: 'Post Office',          page: 'post-office',     x: 42, y: 52 },
    { week: 4, slug: 'w4-disco-ball',       emoji: '🪩',  name: 'Disco Ball',       building: 'BRONZE AiGE',          page: 'bronze-aige',     x: 42, y: 50 },
    { week: 4, slug: 'w4-evil-eye',         emoji: '🧿',  name: 'Evil Eye',         building: "Mme CLAi-O's Shop",    page: 'mme-claios-shop', x: 68, y: 43 },
    { week: 4, slug: 'w4-heart-locket',     emoji: '💜',  name: 'Heart Locket',     building: 'Delta LAi Nu',         page: 'sorority-house',  x: 67, y: 91 },
    { week: 4, slug: 'w4-award-rosette',    emoji: '🏵️', name: 'Award Rosette',    building: 'Town Hall',            page: 'town-hall',       x: 30, y: 48 },
    { week: 4, slug: 'w4-movie-ticket',     emoji: '🎟️', name: 'Movie Ticket',     building: 'Chick Flicks',         page: 'chick-flicks',    x: 78, y: 50 }
  ];

  // Weeks meta — used for bracelet labels + total-per-week counts
  var WEEKS = [
    { number: 1, title: 'The Starter Set' },
    { number: 2, title: 'The Vanity Set' },
    { number: 3, title: 'The Bright Set' },
    { number: 4, title: 'The Keepsake Set' }
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }
  function safeCharmSlug(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  }
  function charmImagePath(slug) {
    return '/assets/charms/' + safeCharmSlug(slug) + '.png';
  }
  function findCharmBySlug(slug) {
    var clean = safeCharmSlug(slug);
    return CHARMS.find(function (c) { return c.slug === clean; }) || null;
  }
  function charmVisualHtml(charm, className) {
    var slug = safeCharmSlug(charm && charm.slug);
    var emoji = escapeHtml((charm && charm.emoji) || '★');
    if (!slug) return '<span class="' + className + '"><span class="charm-hunt-toast-emoji">' + emoji + '</span></span>';
    return (
      '<span class="' + className + '">' +
      '  <img src="' + escapeHtml(charmImagePath(slug)) + '" alt="" loading="eager" decoding="async" onerror="this.style.display=\'none\';if(this.nextElementSibling)this.nextElementSibling.hidden=false;">' +
      '  <span class="charm-hunt-toast-emoji" hidden>' + emoji + '</span>' +
      '</span>'
    );
  }

  // ── Storage helpers ──────────────────────────────────────────────
  function read(key, fallback) {
    try { var v = localStorage.getItem(key); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }
  function readCollection() {
    try { var v = localStorage.getItem(LS_CHARMS); return v ? JSON.parse(v) : []; } catch (e) { return []; }
  }
  function writeCollection(list) {
    try { localStorage.setItem(LS_CHARMS, JSON.stringify(list)); } catch (e) {}
  }
  function tourCompletions() {
    return Number(read(LS_TOUR_COMPLETIONS, '0')) || 0;
  }
  function personalWeek() {
    return WELCOME_BUNDLE + tourCompletions();
  }
  function isWeekUnlocked(w) {
    return w <= personalWeek();
  }
  function findCharmsForThisPage() {
    var path = (window.location.pathname || '').toLowerCase();
    // Special-case: Mme CLAi-O's page filename is madame-claio (not mme-claios-shop)
    var pageMatch = function (c) {
      if (path.indexOf('madame-claio') !== -1 && c.page === 'mme-claios-shop') return true;
      return path.indexOf('/' + c.page + '.html') !== -1 || path.indexOf('/' + c.page + '/') !== -1;
    };
    return CHARMS.filter(pageMatch).filter(function (c) { return isWeekUnlocked(c.week); });
  }
  function ensureSignup() {
    if (!read(LS_SIGNUP, null)) write(LS_SIGNUP, new Date().toISOString());
  }

  // ── Tour completion hook ─────────────────────────────────────────
  // The site fires `sv:tour-checkin` on every stop check-in. When the user
  // hits 8/8, we increment tourCompletions (which advances personalWeek).
  // We use a per-session flag + a completion-signature check on tourVessel
  // so we don't double-count within a single reload.
  function bindTourCompletionHook() {
    document.addEventListener('sv:tour-checkin', function () {
      // Read the count element the Closet writes; if it's 8/8, unlock a new week
      var countEl = document.getElementById('tourCount');
      if (!countEl) return;
      var text = countEl.textContent || '';
      var m = text.match(/(\d+)\s+of\s+(\d+)/i);
      if (!m) return;
      var done = Number(m[1]), total = Number(m[2]);
      if (done < total) return;
      // Guard: only count each unique completion once per Wednesday reset
      var flag = 'laidies_charm_week_credited_' + (new Date().toISOString().slice(0, 10));
      if (localStorage.getItem(flag)) return;
      try { localStorage.setItem(flag, '1'); } catch (e) {}
      var next = tourCompletions() + 1;
      write(LS_TOUR_COMPLETIONS, String(next));
      // Broadcast so the Closet can re-render its bracelet stack
      document.dispatchEvent(new CustomEvent('charmhunt:week-unlocked', { detail: { personalWeek: personalWeek() } }));
    }, true);
  }

  // ── UI: sparkles on building pages ───────────────────────────────
  function ensureStyles() {
    if (document.getElementById('charm-hunt-styles')) return;
    var s = document.createElement('style');
    s.id = 'charm-hunt-styles';
    s.textContent = [
      /* Slow-glow twinkle: two crossed rays that gently swell and fade like starlight.
         Sine-wave ease across a 12s cycle — no snap, no flash. Always faintly visible. */
      '.charm-hunt-sparkle {',
      '  position: absolute; width: 24px; height: 24px;',
      '  cursor: pointer;',
      '  transform: translate(-50%, -50%) scale(0.85);',
      '  background: none;',
      '  animation: charm-sparkle-glint 9s ease-in-out infinite;',
      '  z-index: 5;',
      '  border: 0; padding: 0; background: none;',
      '  opacity: 0.08;',
      '  -webkit-tap-highlight-color: transparent;',
      '  transition: transform 200ms ease, opacity 200ms ease;',
      '}',
      /* Horizontal ray */
      '.charm-hunt-sparkle::before {',
      '  content: ""; position: absolute; top: 50%; left: 50%;',
      '  width: 44px; height: 1.5px;',
      '  background: linear-gradient(to right, transparent 22%, rgba(255,235,150,1) 50%, transparent 78%);',
      '  transform: translate(-50%, -50%);',
      '}',
      /* Vertical ray */
      '.charm-hunt-sparkle::after {',
      '  content: ""; position: absolute; top: 50%; left: 50%;',
      '  width: 44px; height: 1.5px;',
      '  background: linear-gradient(to right, transparent 22%, rgba(255,235,150,1) 50%, transparent 78%);',
      '  transform: translate(-50%, -50%) rotate(90deg);',
      '}',
      '.charm-hunt-sparkle:hover { opacity: 1 !important; transform: translate(-50%, -50%) scale(1.6); animation: none; }',
      '.charm-hunt-sparkle.is-found { pointer-events: none; animation: none; opacity: 0; }',
      '@keyframes charm-sparkle-glint {',
      '  0%, 8% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.55) rotate(0deg); }',
      '  12% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.05) rotate(8deg); }',
      '  16% { opacity: 0.22; transform: translate(-50%, -50%) scale(0.85) rotate(-3deg); }',
      '  22%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(0.55) rotate(0deg); }',
      '}',
      '.charm-hunt-hint {',
      '  position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%);',
      '  padding: 6px 14px; border-radius: 999px;',
      '  background: rgba(75,33,72,0.72); backdrop-filter: blur(6px);',
      '  color: #fffdfb; font-family: "Jost", sans-serif; font-size: 11px; font-weight: 700;',
      '  letter-spacing: 0.14em; text-transform: uppercase;',
      '  pointer-events: none; z-index: 4;',
      '  box-shadow: 0 6px 18px rgba(75,33,72,0.36);',
      '}',
      '.charm-hunt-hint.is-hidden { display: none; }',
      '.charm-hunt-toast {',
      '  position: fixed; left: 50%; bottom: 40px; transform: translate(-50%, 20px);',
      '  padding: 18px 22px 16px; border-radius: 16px; z-index: 9999;',
      '  background: linear-gradient(160deg, #fffdfb 0%, #fbe9f1 100%);',
      '  border: 1.5px solid #d4a853;',
      '  color: #4b2148;',
      '  font-family: "Jost", sans-serif;',
      '  box-shadow: 0 22px 48px rgba(75,33,72,0.32), 0 0 32px rgba(212,168,83,0.4);',
      '  min-width: 260px; max-width: 90vw;',
      '  opacity: 0;',
      '  transition: transform 0.42s cubic-bezier(0.2, 1.4, 0.4, 1), opacity 0.28s ease;',
      '}',
      '.charm-hunt-toast.is-in { opacity: 1; transform: translate(-50%, 0); }',
      '.charm-hunt-toast-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: #d4a853; margin-bottom: 4px; }',
      '.charm-hunt-toast-body { display: flex; align-items: center; gap: 12px; }',
      '.charm-hunt-toast-art { width: 54px; height: 54px; flex: 0 0 54px; display: inline-flex; align-items: center; justify-content: center; }',
      '.charm-hunt-toast-art img { width: 100%; height: 100%; object-fit: contain; display: block; filter: drop-shadow(0 5px 8px rgba(75,33,72,0.22)); }',
      '.charm-hunt-toast-emoji { font-size: 40px; line-height: 1; }',
      '.charm-hunt-toast-emoji[hidden] { display: none; }',
      '.charm-hunt-toast-name { font-family: "Playfair Display", Georgia, serif; font-size: 20px; font-weight: 700; color: #4b2148; }',
      '.charm-hunt-toast-week { font-size: 12px; color: rgba(75,33,72,0.72); margin-top: 2px; }',
      '@keyframes charm-hunt-confetti { 0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; } 100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(var(--rot)); opacity: 0; } }',
      '.charm-hunt-confetti-piece { position: absolute; width: 8px; height: 12px; border-radius: 2px; pointer-events: none; animation: charm-hunt-confetti 1.1s ease-out forwards; z-index: 8; }'
    ].join('\n');
    document.head.appendChild(s);
  }

  function showToast(charm, foundCount, totalUnlocked) {
    var toast = document.createElement('div');
    toast.className = 'charm-hunt-toast';
    var weekFound = charmsFoundInWeek(charm.week);
    var weekComplete = weekFound >= 7;
    toast.innerHTML =
      '<p class="charm-hunt-toast-eyebrow">★ Week ' + charm.week + ' charm · ' + weekFound + ' of 7 found' + (weekComplete ? ' ✓' : '') + '</p>' +
      '<div class="charm-hunt-toast-body">' +
      charmVisualHtml(charm, 'charm-hunt-toast-art') +
      '  <div>' +
      '    <div class="charm-hunt-toast-name">' + escapeHtml(charm.name) + '</div>' +
      '    <div class="charm-hunt-toast-week">Tucked into ' + escapeHtml(charm.building) + '</div>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('is-in'); });
    setTimeout(function () {
      toast.classList.remove('is-in');
      setTimeout(function () { toast.remove(); }, 400);
    }, 4200);
  }

  function burstConfetti(hostSparkle) {
    var colors = ['#d4a853', '#9b3f5f', '#fbe9f1', '#4b2148', '#ffdc8c'];
    for (var i = 0; i < 14; i++) {
      var p = document.createElement('span');
      p.className = 'charm-hunt-confetti-piece';
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.background = colors[i % colors.length];
      var angle = (Math.PI * 2 * i) / 14 + (i % 2 ? 0.2 : 0);
      var dist = 70 + (i % 3) * 20;
      p.style.setProperty('--dx', (Math.cos(angle) * dist) + 'px');
      p.style.setProperty('--dy', (Math.sin(angle) * dist) + 'px');
      p.style.setProperty('--rot', ((i * 47) % 720) + 'deg');
      hostSparkle.appendChild(p);
      setTimeout(function (node) { return function () { if (node && node.parentNode) node.parentNode.removeChild(node); }; }(p), 1200);
    }
  }

  function unlockedTotalCount() {
    return CHARMS.filter(function (c) { return isWeekUnlocked(c.week); }).length;
  }

  function inject(charm) {
    var hero = document.querySelector('.sv-hero');
    if (!hero) return;
    hero.style.position = hero.style.position || 'relative';

    var found = readCollection();
    var alreadyFound = found.indexOf(charm.slug) !== -1;

    var sparkle = document.createElement('button');
    sparkle.type = 'button';
    sparkle.className = 'charm-hunt-sparkle';
    sparkle.setAttribute('aria-label', 'Hidden charm: ' + charm.name);
    sparkle.dataset.slug = charm.slug;
    sparkle.style.left = charm.x + '%';
    sparkle.style.top = charm.y + '%';
    // Desync twinkle: each sparkle gets its own delay (negative = starts mid-cycle)
    // and slightly varied duration so they never stay synchronized. Stable per-charm
    // seed so the same sparkle twinkles at the same rhythm across reloads.
    var seed = 0;
    for (var i = 0; i < charm.slug.length; i++) seed = (seed * 31 + charm.slug.charCodeAt(i)) & 0xffff;
    var duration = 8 + ((seed >> 8) % 300) / 100;    // 8.00s – 11.00s cycle
    // Spread delays evenly across the page: each sparkle's index shifts its glint
    // by a third of the cycle so no two charms flash together, plus a seed jitter.
    var idx = document.querySelectorAll('.charm-hunt-sparkle').length;
    var delay = -((idx * duration / 3) + ((seed % 200) / 100));
    sparkle.style.animationDelay = delay.toFixed(2) + 's';
    sparkle.style.animationDuration = duration.toFixed(2) + 's';
    if (alreadyFound) sparkle.classList.add('is-found');
    hero.appendChild(sparkle);

    sparkle.addEventListener('click', function (e) {
      e.preventDefault();
      if (sparkle.classList.contains('is-found')) return;
      sparkle.classList.add('is-found');
      var cur = readCollection();
      if (cur.indexOf(charm.slug) === -1) {
        cur.push(charm.slug);
        writeCollection(cur);
        document.dispatchEvent(new CustomEvent('charmhunt:found', { detail: { slug: charm.slug, totalFound: cur.length } }));
        if (window.plausible) { try { window.plausible('Charm found', { props: { charm: charm.slug } }); } catch (_) {} }
      }
      burstConfetti(sparkle);
      showToast(charm, cur.length, unlockedTotalCount());
      updateHint();
    });
  }

  function updateHint() {
    var hero = document.querySelector('.sv-hero');
    if (!hero) return;
    var hint = hero.querySelector('.charm-hunt-hint');
    var charmsHere = findCharmsForThisPage();
    if (!charmsHere.length) { if (hint) hint.remove(); return; }
    var found = readCollection();
    var remaining = charmsHere.filter(function (c) { return found.indexOf(c.slug) === -1; }).length;
    if (!hint) {
      hint = document.createElement('span');
      hint.className = 'charm-hunt-hint';
      hero.appendChild(hint);
    }
    if (remaining === 0) {
      hint.textContent = '✓ All ' + charmsHere.length + ' charm' + (charmsHere.length > 1 ? 's' : '') + ' found here';
    } else if (remaining === charmsHere.length) {
      hint.textContent = '★ ' + remaining + ' charm' + (remaining > 1 ? 's' : '') + ' hidden here';
    } else {
      hint.textContent = '★ ' + remaining + ' more charm' + (remaining > 1 ? 's' : '') + ' hidden here';
    }
  }

  // ── Public API (Closet reads this to render the bracelet stack) ──
  function charmsInWeek(n) {
    return CHARMS.filter(function (c) { return c.week === n; });
  }
  function charmsFoundInWeek(n) {
    var found = readCollection();
    return charmsInWeek(n).filter(function (c) { return found.indexOf(c.slug) !== -1; }).length;
  }
  window.CHARM_HUNT = {
    LS_KEY: LS_CHARMS,
    CHARMS: CHARMS,
    WEEKS: WEEKS,
    read: readCollection,
    personalWeek: personalWeek,
    tourCompletions: tourCompletions,
    unlockedTotalCount: unlockedTotalCount,
    isWeekUnlocked: isWeekUnlocked,
    charmsInWeek: charmsInWeek,
    charmsFoundInWeek: charmsFoundInWeek,
    charmImagePath: charmImagePath,
    findCharmBySlug: findCharmBySlug
  };

  // ── Dev mode (?charmDev=1) — click-to-place coordinate tool ──────
  function initDevMode() {
    if (!/[?&]charmDev=1/.test(location.search)) return;
    var hero = document.querySelector('.sv-hero');
    if (!hero) return;

    var devCss = document.createElement('style');
    devCss.textContent = [
      '.charm-hunt-sparkle{opacity:0.95!important;animation:none!important;transform:translate(-50%,-50%) scale(1.4)!important}',
      '.charm-hunt-sparkle::before,.charm-hunt-sparkle::after{background:linear-gradient(to right,transparent 5%,#ff008c 50%,transparent 95%)!important;height:2px!important;width:32px!important}',
      '.cdev-label{position:absolute;padding:3px 7px;background:rgba(75,33,72,0.95);color:#ffd670;font-family:JetBrains Mono,monospace;font-size:10px;border-radius:3px;pointer-events:none;z-index:12;transform:translate(-50%,calc(-100% - 14px));white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.4);border:1px solid rgba(255,215,120,0.5)}',
      '.cdev-crosshair{position:absolute;width:22px;height:22px;border:2px solid #ff008c;border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:10;box-shadow:0 0 0 1px rgba(255,255,255,0.7),inset 0 0 0 1px rgba(255,255,255,0.7)}',
      '.cdev-crosshair::after{content:"";position:absolute;top:50%;left:50%;width:6px;height:6px;background:#ff008c;border:1.5px solid #fff;border-radius:50%;transform:translate(-50%,-50%)}',
      '.cdev-panel{position:fixed;top:100px;right:20px;padding:14px 16px;background:rgba(30,10,26,0.96);color:#fffdfb;font-family:JetBrains Mono,monospace;font-size:11px;border-radius:10px;z-index:9999;max-width:340px;box-shadow:0 8px 30px rgba(0,0,0,0.5);border:1px solid rgba(255,215,120,0.4);line-height:1.5}',
      '.cdev-panel h3{margin:0 0 8px;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#ffd670;font-family:Jost,sans-serif;font-weight:800}',
      '.cdev-panel .cdev-hint{opacity:0.7;font-size:10px;margin-bottom:10px}',
      '.cdev-panel code{display:block;padding:3px 6px;margin:2px 0;background:rgba(255,215,120,0.08);border-radius:3px;color:#ffd670;user-select:all;cursor:text}',
      '.cdev-panel .cdev-current{padding:8px 10px;margin:8px 0;background:rgba(255,0,140,0.15);border:1px solid rgba(255,0,140,0.5);border-radius:4px;color:#fff}',
      '.cdev-panel .cdev-current strong{color:#ff6ec7;letter-spacing:0.06em}',
      '.cdev-panel hr{border:none;border-top:1px solid rgba(255,255,255,0.15);margin:10px 0}'
    ].join('');
    document.head.appendChild(devCss);

    // Label existing sparkles with their slug + coordinates
    var currentPageCharms = CHARMS.filter(function (c) {
      var path = (location.pathname || '').toLowerCase().replace(/^\//, '').replace('.html', '');
      if (path.indexOf('madame-claio') !== -1 && c.page === 'mme-claios-shop') return true;
      return c.page === path || path.endsWith('/' + c.page);
    });
    currentPageCharms.forEach(function (c) {
      var label = document.createElement('div');
      label.className = 'cdev-label';
      label.style.left = c.x + '%';
      label.style.top = c.y + '%';
      label.textContent = c.slug + ' · ' + c.x + ',' + c.y;
      hero.appendChild(label);
    });

    // Floating panel
    var panel = document.createElement('div');
    panel.className = 'cdev-panel';
    var listHtml = currentPageCharms.map(function (c) {
      return '<code>' + c.slug + ' · x:' + c.x + ' y:' + c.y + '</code>';
    }).join('');
    panel.innerHTML =
      '<h3>★ Charm Dev Mode</h3>' +
      '<div class="cdev-hint">Click any spot on the hero image to capture x/y as %. Auto-copies to clipboard.</div>' +
      '<div class="cdev-current" id="cdev-current"><strong>Last click:</strong> (none — click the hero)</div>' +
      '<hr>' +
      '<h3>Charms on this page</h3>' +
      listHtml;
    document.body.appendChild(panel);

    // Click handler on hero
    var crosshair;
    hero.addEventListener('click', function (e) {
      // Let sparkle clicks through (though sparkles are also displaying, we let both work)
      var r = hero.getBoundingClientRect();
      var x = Math.round(((e.clientX - r.left) / r.width) * 100);
      var y = Math.round(((e.clientY - r.top) / r.height) * 100);
      var coord = 'x: ' + x + ', y: ' + y;
      var readout = document.getElementById('cdev-current');
      if (readout) readout.innerHTML = '<strong>Last click:</strong> ' + coord;
      if (!crosshair) {
        crosshair = document.createElement('div');
        crosshair.className = 'cdev-crosshair';
        hero.appendChild(crosshair);
      }
      crosshair.style.left = x + '%';
      crosshair.style.top = y + '%';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(coord).catch(function () {});
      }
    });
  }

  function init() {
    ensureSignup();
    ensureStyles();
    var charms = findCharmsForThisPage();
    charms.forEach(inject);
    updateHint();
    bindTourCompletionHook();
    initDevMode();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
