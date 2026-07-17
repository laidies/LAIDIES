/**
 * clip-bank.js — the butterfly-clip economy (single source of truth).
 *
 * EARNED clips are DERIVED (never stored) from quiz records + express-tour
 * completions, using the exact same math as the Closet's Clip Jar, so the
 * jar and the Book Fair can never drift:
 *   earned = Σ max(bestQuizScore, 1) over attempted quizzes  +  1 per express-done episode
 *
 * SPENT clips = Σ cost over the Book Fair redemption ledger
 *   (localStorage `laidies_bookfair_redeemed`, keyed by drop id).
 *
 * AVAILABLE = earned − spent.
 *
 * Redemptions are one-time per drop by default (collectibles); pass
 * {repeatable:true} for things you can buy again (e.g. a coupon).
 *
 * Public API on window.LaidiesClips:
 *   earned()  spent()  available()
 *   owns(id)  redemptions()
 *   redeem(id, cost, meta) -> { ok, reason?, available }
 * Fires document event `laidies:clip-redeem` on a successful redeem.
 */
(function () {
  'use strict';

  var LS_REDEEMED = 'laidies_bookfair_redeemed';

  function stored(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
  }
  function save(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); } catch (e) {}
  }

  // ── EARNED — mirror of laidies-card.html renderClipJar() ──────────────
  function earned() {
    var progress = stored('laidiesQuizProgress');
    var legacy = stored('laidiesQuizBestScores');
    Object.keys(legacy).forEach(function (k) {
      if (!progress[k]) progress[k] = { bestScore: Number(legacy[k]) || 0, attempts: 1 };
    });
    var total = 0;
    Object.keys(progress).forEach(function (k) {
      var r = progress[k] || {};
      var best = Math.round(Number(r.bestScore) || 0);
      var attempted = best > 0 || Number(r.attempts) > 0 || Boolean(r.completedAt);
      if (!attempted) return;
      total += Math.max(best, 1);
    });
    var express = stored('laidies_express_done');
    Object.keys(express).forEach(function () { total += 1; });
    return total;
  }

  // ── LEDGER ────────────────────────────────────────────────────────────
  function redemptions() { return stored(LS_REDEEMED); }

  function spent() {
    var r = redemptions(), t = 0;
    Object.keys(r).forEach(function (id) { t += Number(r[id] && r[id].cost) || 0; });
    return t;
  }

  function available() { return Math.max(0, earned() - spent()); }

  function owns(id) { return Object.prototype.hasOwnProperty.call(redemptions(), id); }

  function redeem(id, cost, meta) {
    id = String(id || '');
    cost = Math.max(0, Math.round(Number(cost) || 0));
    meta = meta || {};
    if (!id) return { ok: false, reason: 'bad-id', available: available() };
    var ledger = redemptions();
    if (!meta.repeatable && Object.prototype.hasOwnProperty.call(ledger, id)) {
      return { ok: false, reason: 'owned', available: available() };
    }
    if (available() < cost) {
      return { ok: false, reason: 'insufficient', available: available() };
    }
    // Repeatable items accumulate cost under a counted key so `spent()` stays honest.
    var key = meta.repeatable ? (id + '#' + (Date.now ? 0 : 0) + '-' + (Object.keys(ledger).filter(function (k) { return k.indexOf(id + '#') === 0; }).length)) : id;
    ledger[key] = {
      id: id, name: meta.name || id, cost: cost,
      redeemedAt: new Date().toISOString(),
      lands: meta.lands || null
    };
    save(LS_REDEEMED, ledger);
    try {
      document.dispatchEvent(new CustomEvent('laidies:clip-redeem', {
        detail: { id: id, cost: cost, available: available() }
      }));
    } catch (e) {}
    return { ok: true, available: available() };
  }

  window.LaidiesClips = {
    earned: earned,
    spent: spent,
    available: available,
    owns: owns,
    redemptions: redemptions,
    redeem: redeem
  };
})();
