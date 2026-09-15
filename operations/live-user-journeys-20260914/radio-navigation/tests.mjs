import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const sourcePath = new URL('../../../content/site/ksvl-player.js', import.meta.url);
const source = await readFile(sourcePath, 'utf8');
const baseline = await readFile(new URL('./baseline.js', import.meta.url), 'utf8');

function owner(id, at = Date.now(), paused = true) {
  return { id, at, popup: false, duration: 218, playback: { v: 1, paused }, upNextTitle: 'Next' };
}

function loadActualLeaseFunctions(playerSource = source) {
  const start = playerSource.indexOf('  var IS_POPUP =');
  const end = playerSource.indexOf('  function playOwnedPart', start);
  assert.ok(start >= 0 && end > start, 'expected current lease block');
  const block = playerSource.slice(start, end);
  const storage = new Map();
  const events = [];
  const state = { queue: ['before'], mixId: 'live', paused: false, audio: { paused: false } };
  const hydrated = [];
  const fn = new Function('deps', `
    const window = deps.window, document = deps.document, navigator = deps.navigator;
    const localStorage = deps.localStorage, crypto = deps.crypto, state = deps.state;
    const validateSavedState = deps.validateSavedState, restoreQueue = deps.restoreQueue;
    const updateNowPlaying = deps.updateNowPlaying, announce = deps.announce;
    const syncSoundControls = deps.syncSoundControls, hydrateFromStorage = deps.hydrateFromStorage;
    const togglePlay = deps.noop, nextTrack = deps.noop, prevTrack = deps.noop, stopPlayer = deps.noop;
    const toggleMute = deps.noop, toggleShuffle = deps.noop, cycleRepeat = deps.noop, retryCurrent = deps.noop;
    const startLive = deps.noop, startMix = deps.noop, startAlbum = deps.noop;
    const setVolumeFromControl = deps.noop, npVolume = { value: '0.8' };
    const windowSetInterval = deps.noop;
    const setInterval = windowSetInterval;
    let np = { classList: { remove: deps.noop } };
    ${block}
    return {
      followOwner, sendRemote, playCurrentPart,
      beginNavigationHandoff: typeof beginNavigationHandoff === 'function' ? beginNavigationHandoff : null,
      setPending: value => { pendingNavigationContinuationUntil = value; },
      setAcquire: value => { acquireOwnership = value; },
      getState: () => ({ paused: state.paused, queue: state.queue.slice(), mixId: state.mixId }),
      events: deps.events
    };
  `);
  const localStorage = {
    getItem: key => storage.has(key) ? storage.get(key) : null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
  };
  const deps = {
    window: { location: { pathname: '/library', search: '' }, addEventListener() {} },
    document: { addEventListener() {}, querySelectorAll: () => [] },
    navigator: { locks: { request: async (_name, _options, callback) => callback(null) } },
    localStorage, crypto: { randomUUID: () => 'destination' }, state,
    validateSavedState: value => value,
    restoreQueue: value => { state.queue = ['restored']; state.mixId = 'live'; state.paused = value.paused; },
    updateNowPlaying() {}, announce() {}, syncSoundControls() {},
    hydrateFromStorage: continuePlaying => hydrated.push(continuePlaying), noop() {}, events
  };
  return { api: fn(deps), storage, hydrated, state };
}

function setRemote(storage, value) {
  storage.set('laidies_ksvl_owner_v2', JSON.stringify(value));
}

test('predecessor race: baseline pauses after delayed release while candidate resumes once', () => {
  const old = loadActualLeaseFunctions(baseline);
  setRemote(old.storage, owner('predecessor'));
  assert.equal(old.api.followOwner(), true);
  old.storage.delete('laidies_ksvl_owner_v2');
  assert.equal(old.api.followOwner(), false);
  assert.deepEqual(old.hydrated, [false], 'baseline loses the continuation and restores paused');

  const candidate = loadActualLeaseFunctions();
  setRemote(candidate.storage, owner('predecessor'));
  assert.equal(candidate.api.followOwner(), true, 'destination follows only the still-fresh predecessor');
  candidate.api.setPending(Date.now() + 1_000);
  candidate.storage.delete('laidies_ksvl_owner_v2');
  assert.equal(candidate.api.followOwner(), false, 'release ends remote ownership');
  assert.deepEqual(candidate.hydrated, [true], 'candidate resumes through later normal hydration');
  assert.equal(candidate.api.followOwner(), false);
  assert.deepEqual(candidate.hydrated, [true], 'continuation is once-only');
});


test('startup ordering preserves playing handoff but honors an already-paused remote owner', () => {
  const playing = loadActualLeaseFunctions();
  setRemote(playing.storage, owner('predecessor-playing', Date.now(), false));
  playing.api.beginNavigationHandoff(Date.now() + 1_000);
  assert.deepEqual(playing.hydrated, []);
  playing.storage.delete('laidies_ksvl_owner_v2');
  playing.api.followOwner();
  assert.deepEqual(playing.hydrated, [true]);

  const paused = loadActualLeaseFunctions();
  setRemote(paused.storage, owner('predecessor-paused'));
  paused.api.beginNavigationHandoff(Date.now() + 1_000);
  assert.deepEqual(paused.hydrated, []);
  paused.storage.delete('laidies_ksvl_owner_v2');
  paused.api.followOwner();
  assert.deepEqual(paused.hydrated, [false], 'saved paused state overrides autoplay intent');

  const noOwner = loadActualLeaseFunctions();
  noOwner.api.beginNavigationHandoff(Date.now() + 1_000);
  assert.deepEqual(noOwner.hydrated, [true], 'cold owner-free handoff consumes once at startup');
});

test('cold paused load and expired continuation remain paused after owner disappearance', () => {
  for (const until of [0, Date.now() - 1]) {
    const { api, storage, hydrated } = loadActualLeaseFunctions();
    setRemote(storage, owner('predecessor'));
    api.followOwner(); api.setPending(until); storage.delete('laidies_ksvl_owner_v2'); api.followOwner();
    assert.deepEqual(hydrated, [false]);
  }
});

test('a current remote owner is never interrupted by a pending continuation', () => {
  const { api, storage, hydrated } = loadActualLeaseFunctions();
  api.setPending(Date.now() + 1_000);
  setRemote(storage, owner('real-other-tab'));
  assert.equal(api.followOwner(), true);
  assert.deepEqual(hydrated, []);
});


test('an explicit remote pause cancels pending autoplay before that owner releases', () => {
  const { api, storage, hydrated } = loadActualLeaseFunctions();
  setRemote(storage, owner('predecessor', Date.now()));
  api.followOwner();
  api.setPending(Date.now() + 1_000);
  assert.equal(api.sendRemote('pause'), true);
  storage.delete('laidies_ksvl_owner_v2');
  api.followOwner();
  assert.deepEqual(hydrated, [false]);
});

test('actual failed ownership path keeps a restored track in Resume state without replacing a remote owner', async () => {
  const { api, storage } = loadActualLeaseFunctions();
  api.setAcquire(() => Promise.resolve(false));
  api.playCurrentPart();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(api.getState().paused, true);
  setRemote(storage, owner('real-other-tab'));
  api.playCurrentPart();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(api.getState().paused, true);
});

function loadActualContinuation(playerSource, { popup = false, search = '', pathname = '/library', local = {}, session = {} } = {}) {
  const start = playerSource.indexOf('  function normalPath(path)');
  const end = playerSource.indexOf('  function bindPersistenceHooks()', start);
  assert.ok(start >= 0 && end > start, 'expected continuation functions');
  const block = playerSource.slice(start, end);
  const storage = values => ({
    getItem: key => Object.hasOwn(values, key) ? values[key] : null,
    setItem: (key, value) => { values[key] = String(value); },
    removeItem: key => { delete values[key]; }
  });
  const fn = new Function('deps', `
    const IS_POPUP = deps.popup, localStorage = deps.localStorage, sessionStorage = deps.sessionStorage;
    const TRANSFER_KEY = 'laidies_ksvl_transfer_v2', NAV_KEY = 'laidies_ksvl_navigation_v2';
    const location = deps.location;
    ${block}
    return { consumeContinuation };
  `);
  return { api: fn({ popup, localStorage: storage(local), sessionStorage: storage(session), location: { search, pathname } }), local, session };
}

test('actual consumeContinuation validates normal navigation and returns its original expiry', () => {
  const at = Date.now() - 200;
  const valid = loadActualContinuation(source, { session: { laidies_ksvl_navigation_v2: JSON.stringify({ at, to: '/library', playing: true }) } });
  assert.equal(valid.api.consumeContinuation(), at + 15000);
  assert.equal(valid.session.laidies_ksvl_navigation_v2, undefined, 'normal continuation is one-shot');
  for (const record of [
    { at: Date.now() - 15001, to: '/library', playing: true },
    { at: Date.now(), to: '/radio', playing: true },
    { at: Date.now(), to: '/library', playing: false }
  ]) {
    const checked = loadActualContinuation(source, { session: { laidies_ksvl_navigation_v2: JSON.stringify(record) } });
    assert.equal(checked.api.consumeContinuation(), 0);
  }
  assert.equal(loadActualContinuation(source, { session: { laidies_ksvl_navigation_v2: '{bad' } }).api.consumeContinuation(), 0);
});

test('actual consumeContinuation validates popup transfer token, expiry, and playing state', () => {
  const at = Date.now() - 200;
  const valid = loadActualContinuation(source, { popup: true, search: '?transfer=ok', local: { laidies_ksvl_transfer_v2: JSON.stringify({ token: 'ok', at, playing: true }) } });
  assert.equal(valid.api.consumeContinuation(), at + 15000);
  assert.equal(valid.local.laidies_ksvl_transfer_v2, undefined, 'popup transfer is one-shot');
  for (const [search, transfer] of [
    ['?transfer=nope', { token: 'ok', at, playing: true }],
    ['?transfer=ok', { token: 'ok', at: Date.now() - 15001, playing: true }],
    ['?transfer=ok', { token: 'ok', at, playing: false }]
  ]) {
    const checked = loadActualContinuation(source, { popup: true, search, local: { laidies_ksvl_transfer_v2: JSON.stringify(transfer) } });
    assert.equal(checked.api.consumeContinuation(), 0);
  }
});
