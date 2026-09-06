/**
 * Account-backed Butterfly Clip reader for the Book Fair.
 * Baseline: Website-homepage/content/site/clip-bank.js SHA-256 ae42380616848e917797fd2a24ca96067808e226ca5ab56a1495a4babdf40818.
 *
 * This adapter intentionally has no local fallback. Quiz history and former
 * Book Fair redemptions can remain in browser storage, but cannot authorize a
 * balance or an entitlement here.
 */
(function installClipBankAccountV1(global) {
  'use strict';

  var state = { status: 'loading', owner: '', snapshot: null };
  var runtime = null;
  var wallet = null;
  var subscription = null;
  var startPromise = null;
  var epoch = 0;
  var disposed = false;

  function eventDetail() {
    return Object.freeze({
      status: state.status,
      owner: state.owner || null,
      available: state.snapshot ? state.snapshot.available : null
    });
  }

  function emit() {
    try {
      global.document.dispatchEvent(new global.CustomEvent('laidies:clip-wallet-change', {
        detail: eventDetail()
      }));
    } catch (_) {}
  }

  function replace(next) {
    state = Object.freeze(next);
    emit();
  }

  function clear(status) {
    epoch += 1;
    wallet && wallet.invalidate && wallet.invalidate();
    replace({ status: status, owner: '', snapshot: null });
  }

  function number(name) {
    return state.snapshot && Number.isInteger(state.snapshot[name])
      ? state.snapshot[name]
      : null;
  }

  async function currentOwner() {
    var session = await runtime.controller.getSession();
    return session && session.user && typeof session.user.id === 'string' ? session.user.id : '';
  }

  async function start() {
    if (startPromise) return startPromise;
    startPromise = (async function () {
      if (!global.LAIDIESResidentAccountRuntime || !global.LAIDIESCreateClipWalletClientV1) {
        throw new Error('clip-wallet-dependencies-unavailable');
      }
      runtime = await global.LAIDIESResidentAccountRuntime.get();
      wallet = global.LAIDIESCreateClipWalletClientV1(runtime);
      var observed = runtime.client.auth.onAuthStateChange(function (_event, session) {
        var nextOwner = session && session.user && session.user.id || '';
        if (!nextOwner || nextOwner !== state.owner) {
          clear(nextOwner ? 'loading' : 'signin');
          if (nextOwner) refresh();
        }
      });
      subscription = observed && observed.data && observed.data.subscription;
      return runtime;
    })();
    try {
      return await startPromise;
    } catch (error) {
      startPromise = null;
      runtime = null;
      wallet = null;
      clear('unavailable');
      return null;
    }
  }

  async function refresh() {
    if (disposed) return null;
    if (!runtime || !wallet) {
      var started = await start();
      if (!started) return null;
    }
    var token = ++epoch;
    var owner;
    replace({ status: 'loading', owner: state.owner, snapshot: null });
    try {
      owner = await currentOwner();
      if (disposed || token !== epoch) return null;
      if (!owner) {
        replace({ status: 'signin', owner: '', snapshot: null });
        return null;
      }
      replace({ status: 'loading', owner: owner, snapshot: null });
      var snapshot = await wallet.snapshot(owner, { cursor: null, limit: 20 });
      var finalOwner = await currentOwner();
      if (disposed || token !== epoch || owner !== finalOwner) return null;
      if (snapshot.legacy_review_required) {
        replace({ status: 'reconciliation', owner: owner, snapshot: null });
        return null;
      }
      replace({ status: 'ready', owner: owner, snapshot: snapshot });
      return snapshot;
    } catch (_) {
      if (!disposed && token === epoch) clear('unavailable');
      return null;
    }
  }

  function ready() { return refresh(); }
  function redeem() { return { ok: false, reason: 'unavailable', available: null }; }
  function owns() { return false; }
  function redemptions() { return null; }
  function dispose() {
    var closingWallet = wallet;
    disposed = true;
    clear('unavailable');
    if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    if (closingWallet && closingWallet.dispose) closingWallet.dispose();
    subscription = null;
    wallet = null;
    runtime = null;
  }

  global.LaidiesClips = Object.freeze({
    ready: ready,
    refresh: refresh,
    status: function () { return state.status; },
    earned: function () { return number('lifetime_earned'); },
    spent: function () { return number('lifetime_spent'); },
    available: function () { return number('available'); },
    owns: owns,
    redemptions: redemptions,
    redeem: redeem,
    dispose: dispose
  });

  global.addEventListener('pagehide', function () {
    if (!disposed) clear('loading');
  });
  global.addEventListener('pageshow', function (event) {
    if (!disposed && event && event.persisted) refresh();
  });
  global.document.addEventListener('laidies:clip-wallet-client-ready', function () { refresh(); });
  try { global.document.dispatchEvent(new global.CustomEvent('laidies:clip-bank-ready')); } catch (_) {}
  if (global.LAIDIESCreateClipWalletClientV1) refresh();
})(window);
