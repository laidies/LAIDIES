/**
 * SUNNYVAiLE Wednesday Tour — check-in module.
 *
 * Any building page can include this script to expose:
 *  - A "Check in for the Wednesday tour" pill that auto-injects on the 8 tour stops.
 *  - window.svTourCheckIn(stopKey) — call to mark a stop complete programmatically
 *    (e.g. after a specific interaction like clicking play on the episode song).
 *
 * State lives in localStorage under `laidies_tour_<isoWeekKey>` = array of stop keys.
 * When all 8 stops are checked, awards +1 FAiRY wish (localStorage `laidies_fairy_plays`)
 * AND stamps that week's episode into `laidies_ritual_done` so the Closet mints a
 * per-episode "Full Ritual" merit badge (see getLocalRewardEvents in script.js).
 * Weekly reset is implicit: a new ISO week = a new empty checklist.
 *
 * Server sync (Supabase member_ritual_checkins table) is a future add — leave a hook.
 *
 * Usage:
 *   <script defer src="/content/site/sv-tour-checkin.js?v=1"></script>
 */
(function() {
  'use strict';

  // The weekly ritual — episode-driven stops that reset every Wednesday.
  // MAiKEOVER is intentionally NOT here: you don't remake your card weekly, so
  // it lives with the Closet's "Optional stops · tools & games" (anytime, no reset).
  var STOPS = [
    { key: 'newsstand',       num: 1, path: '/newsstand.html',        label: 'NewsStand',       teaser: 'Source-checked desks' },
    { key: 'chick-flicks',    num: 2, path: '/chick-flicks.html',     label: 'Chick Flicks',    teaser: 'This week\'s episode' },
    { key: 'blend-snap',      num: 3, path: '/blend-snap.html',       label: 'Blend & Snap',    teaser: 'Coffee + notes' },
    { key: 'ksvl',            num: 4, path: '/radio.html',            label: 'KSVL 99.9',       teaser: 'The episode song' },
    { key: 'sunnyvaile-high', num: 5, path: '/sunnyvaile-high.html',  label: 'SUNNYVAiLE High', teaser: 'Pop quiz' },
    { key: 'mall',            num: 6, path: '/mall.html',             label: 'Free Time',       teaser: 'Wander the Mall' },
    { key: 'bronze-aige',     num: 7, path: '/bronze-aige.html',      label: 'BRONZE AiGE',     teaser: 'Happy hour + live show' },
    { key: 'sorority-house',  num: 8, path: '/sorority-house.html',   label: 'Delta LAi Nu',    teaser: 'Girl Talk' }
  ];
  var STOP_BY_KEY = {};
  var STOP_BY_PATH = {};
  STOPS.forEach(function(s) { STOP_BY_KEY[s.key] = s; STOP_BY_PATH[s.path] = s; });

  // The Express tour — the 4 *learning* stops (a subset of the 8 above):
  // episode, Study Pack, song, quiz. Completing all four earns a lighter
  // reward than the full lap: a "Caught Up" sticker + 1 butterfly clip
  // (stamped once per episode in laidies_express_done), vs the full tour's
  // +1 FAiRY wish + Full Ritual badge.
  var EXPRESS_KEYS = ['chick-flicks', 'blend-snap', 'ksvl', 'sunnyvaile-high'];

  var LS_PREFIX = 'laidies_tour_';
  var LS_FAIRY = 'laidies_fairy_plays';
  var LS_LAST_REWARDED_WEEK = 'laidies_tour_last_rewarded_week';
  var LS_RITUAL_DONE = 'laidies_ritual_done';
  var LS_EXPRESS_DONE = 'laidies_express_done';

  function isoWeekKey(d) {
    var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dayNum = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
    return t.getUTCFullYear() + '-W' + (weekNo < 10 ? '0' + weekNo : weekNo);
  }

  function currentWeekKey() { return isoWeekKey(new Date()); }
  function storageKey(weekKey) { return LS_PREFIX + (weekKey || currentWeekKey()); }

  function readWeek(weekKey) {
    try {
      var raw = localStorage.getItem(storageKey(weekKey));
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function writeWeek(weekKey, arr) {
    try { localStorage.setItem(storageKey(weekKey), JSON.stringify(arr)); }
    catch (_) {}
  }

  function readFairyPlays() {
    try {
      var raw = localStorage.getItem(LS_FAIRY);
      return raw ? parseInt(raw, 10) || 0 : 0;
    } catch (_) { return 0; }
  }

  function incrementFairyPlays() {
    try { localStorage.setItem(LS_FAIRY, String(readFairyPlays() + 1)); } catch (_) {}
  }

  function readLastRewardedWeek() {
    try { return localStorage.getItem(LS_LAST_REWARDED_WEEK) || ''; } catch (_) { return ''; }
  }

  function writeLastRewardedWeek(w) {
    try { localStorage.setItem(LS_LAST_REWARDED_WEEK, w); } catch (_) {}
  }

  function readRitualDone() {
    try {
      var raw = localStorage.getItem(LS_RITUAL_DONE);
      var obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === 'object' ? obj : {};
    } catch (_) { return {}; }
  }

  function latestPublishedEpisode(episodes) {
    if (!Array.isArray(episodes)) return null;
    return episodes
      .filter(function (e) { return e && e.status === 'published' && typeof e.number === 'number'; })
      .sort(function (a, b) { return a.number - b.number; })
      .pop() || null;
  }

  // Resolve the latest published episode (from in-memory site data, else the
  // episode index) and hand it to cb. Shared by the ritual + express stamps.
  function withLatestEpisode(cb) {
    var inline = (window.LAIDIES_SITE_DATA && window.LAIDIES_SITE_DATA.episodes) || null;
    var ep = latestPublishedEpisode(inline);
    if (ep) { cb(ep); return; }
    try {
      fetch('/content/episode-index.json')
        .then(function (r) { return r.json(); })
        .then(function (data) { cb(latestPublishedEpisode(data && data.episodes)); })
        .catch(function () {});
    } catch (_) {}
  }

  // Stamp the episode whose Wednesday Ritual (all 8 stops) the reader just
  // completed. Keyed by episode number so re-completing the same episode in a
  // later week is a no-op, and each episode earns exactly one Full Ritual badge.
  // The Closet reads laidies_ritual_done and mints the merit badge from it.
  function recordRitualComplete(weekKey) {
    withLatestEpisode(function (ep) {
      if (!ep) return;
      var done = readRitualDone();
      if (done[ep.number]) return; // already have this episode's ritual badge
      done[ep.number] = {
        episode: ep.number,
        title: ep.title || ('Episode ' + ep.number),
        weekKey: weekKey,
        completedAt: new Date().toISOString()
      };
      try { localStorage.setItem(LS_RITUAL_DONE, JSON.stringify(done)); } catch (_) {}
      try {
        document.dispatchEvent(new CustomEvent('sv:ritual-complete', {
          detail: { episode: ep.number, title: done[ep.number].title, weekKey: weekKey }
        }));
      } catch (_) {}
    });
  }

  function readExpressDone() {
    try {
      var raw = localStorage.getItem(LS_EXPRESS_DONE);
      var obj = raw ? JSON.parse(raw) : {};
      return obj && typeof obj === 'object' ? obj : {};
    } catch (_) { return {}; }
  }

  // Stamp the episode whose Express tour (the 4 learning stops) the reader
  // finished. Keyed by episode number → one "Caught Up" sticker + 1 butterfly
  // clip per episode. The Closet derives both from laidies_express_done.
  function recordExpressComplete(weekKey) {
    withLatestEpisode(function (ep) {
      if (!ep) return;
      var done = readExpressDone();
      if (done[ep.number]) return; // already caught up on this episode
      done[ep.number] = {
        episode: ep.number,
        title: ep.title || ('Episode ' + ep.number),
        weekKey: weekKey,
        completedAt: new Date().toISOString()
      };
      try { localStorage.setItem(LS_EXPRESS_DONE, JSON.stringify(done)); } catch (_) {}
      try {
        document.dispatchEvent(new CustomEvent('sv:express-complete', {
          detail: { episode: ep.number, title: done[ep.number].title, weekKey: weekKey }
        }));
      } catch (_) {}
    });
  }

  function isCheckedIn(stopKey, weekKey) {
    return readWeek(weekKey).indexOf(stopKey) !== -1;
  }

  function checkIn(stopKey, weekKey) {
    if (!STOP_BY_KEY[stopKey]) return { ok: false, reason: 'unknown-stop' };
    weekKey = weekKey || currentWeekKey();
    var checked = readWeek(weekKey);
    if (checked.indexOf(stopKey) !== -1) {
      return { ok: true, alreadyChecked: true, count: checked.length, total: STOPS.length };
    }
    checked.push(stopKey);
    writeWeek(weekKey, checked);

    // Express tour — the 4 learning stops done (a subset of the full 8).
    // Stamps a per-episode "Caught Up" (sticker + 1 clip), no-op if already
    // stamped. Doing the full tour completes the express subset too, so full
    // finishers earn the core reward plus the bonus wish.
    if (EXPRESS_KEYS.every(function (k) { return checked.indexOf(k) !== -1; })) {
      recordExpressComplete(weekKey);
    }

    // Reward when all stops land for this week, once per week
    var rewardIssued = false;
    if (checked.length === STOPS.length && readLastRewardedWeek() !== weekKey) {
      incrementFairyPlays();
      writeLastRewardedWeek(weekKey);
      recordRitualComplete(weekKey);
      rewardIssued = true;
    }

    // Fire event for any listener (e.g. the Closet vessel)
    try {
      document.dispatchEvent(new CustomEvent('sv:tour-checkin', {
        detail: { stopKey: stopKey, weekKey: weekKey, count: checked.length, total: STOPS.length, rewardIssued: rewardIssued }
      }));
    } catch (_) {}
    if (window.plausible) { try { window.plausible('Tour check-in', { props: { stop: stopKey } }); if (rewardIssued) window.plausible('Full ritual'); } catch (_) {} }

    return { ok: true, count: checked.length, total: STOPS.length, rewardIssued: rewardIssued };
  }

  function getState(weekKey) {
    weekKey = weekKey || currentWeekKey();
    var checked = readWeek(weekKey);
    return {
      weekKey: weekKey,
      stops: STOPS.map(function(s) {
        return {
          key: s.key,
          num: s.num,
          label: s.label,
          teaser: s.teaser,
          path: s.path,
          checked: checked.indexOf(s.key) !== -1
        };
      }),
      count: checked.length,
      total: STOPS.length,
      complete: checked.length === STOPS.length,
      rewardedThisWeek: readLastRewardedWeek() === weekKey
    };
  }

  // Auto-check-in on visit to a tour stop.
  // The right-side rail was removed 2026-07-02; tour progress now lives on the
  // homepage. Visiting a stop page = ritual step complete.
  function currentStop() {
    return STOP_BY_PATH[location.pathname] || null;
  }

  function autoCheckin() {
    var stop = currentStop();
    if (!stop) return;
    // Skip the Closet (that's the summary view, not a stop)
    if (location.pathname === '/laidies-card.html') return;
    checkIn(stop.key);
  }

  // Public API — used by the homepage tour progress widget + any inline scripts.
  window.svTour = {
    checkIn: checkIn,
    getState: getState,
    isCheckedIn: isCheckedIn,
    currentStop: currentStop,
    stops: STOPS,
    expressKeys: EXPRESS_KEYS.slice(),
    expressDone: readExpressDone,
    fairyPlays: readFairyPlays,
    currentWeekKey: currentWeekKey
  };
  window.svTourCheckIn = function(stopKey) { return checkIn(stopKey); };

  // Auto-check-in the current stop (if this page IS a stop).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoCheckin);
  } else {
    autoCheckin();
  }
})();
