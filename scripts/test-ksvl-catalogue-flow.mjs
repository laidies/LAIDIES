#!/usr/bin/env node
// Extracts the catalogue page-song functions from the player.  It deliberately
// supplies only their runtime dependencies so this catches source regressions.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const sourcePath = process.argv[2] || new URL('../content/site/ksvl-player.js', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');
function between(start, end) {
  const from = source.indexOf(start), to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `could not extract ${start}`);
  return source.slice(from, to);
}
const catalogueSource = between('  function catalogueStartingWith(', '  function toggleShuffle()');
const startSource = between('  function startSingle(', '  window.KSVL_playTrack =');
const validateSource = between('  function validateSavedState(', '  function queueForSaved(');
const savedQueueSource = between('  function queueForSaved(', '  function restoreQueue(');
const restoreSource = between('  function restoreQueue(', '  function hydrateFromStorage(');
const toggleSource = between('  function togglePlay()', '  // Immediate hard-stop');
const hardStopSource = between('  function realStopPlayer()', '  // Programme objects remain held');

const tracks = [
  {id: 'a', title: 'A', artist: 'Alpha', src: '/a.mp3'},
  {id: 'b', title: 'B', artist: 'Beta', src: '/b.mp3'},
  {id: 'c', title: 'C', artist: 'Gamma', src: '/c.mp3'}
];
function runtime() {
  const played = [];
  const context = {
    TRACKS: tracks.map(track => ({...track})), state: {queue: [], index: 9, currentPart: 4, shuffle: true, repeatMode: 'all'},
    window: {}, sendRemote: () => false, isAdmittedSource: src => tracks.some(track => track.src === src),
    playIndex: index => played.push(index), wrapWithIntro: track => track,
    tracksForMix: () => [], tracksForArtist: () => [], npShuffleBtn: null, npRepeatBtn: null,
    setBtnIcon: () => {}, announce: () => {}, console,
    playToken: 0, np: {classList: {remove: () => {}}},
    document: {querySelectorAll: () => []}, localStorage: {removeItem: () => {}},
    stopExistingAudio: () => {}, releaseOwnership: () => {},
    activeRegistryId: 'registry-test', STATE_TTL_MS: 60_000, MIXES: []
  };
  vm.createContext(context);
  vm.runInContext(`${catalogueSource}\n${startSource}\n${validateSource}\n${savedQueueSource}\n${restoreSource}\n${toggleSource}\n${hardStopSource}\nthis.api={catalogueStartingWith,startSingle,validateSavedState,queueForSaved,restoreQueue,togglePlay,realStopPlayer};`, context);
  return {context, api: context.api, played};
}

{ // Every starting point retains the whole catalogue exactly once, in order.
  const {api} = runtime();
  for (const [start, expected] of [['a', ['a','b','c']], ['b', ['b','c','a']], ['c', ['c','a','b']]]) {
    const result = api.catalogueStartingWith(start);
    assert.deepEqual(Array.from(result, track => track.id), expected);
    assert.equal(new Set(result.map(track => track.id)).size, tracks.length);
  }
  assert.deepEqual(Array.from(api.catalogueStartingWith('missing')), []);
}

{ // Legacy page API now starts a selected-first single pass, not a one-item queue.
  const {context, api, played} = runtime();
  assert.equal(api.startSingle({src: '/b.mp3'}), true);
  assert.deepEqual(Array.from(context.state.queue, track => track.id), ['b','c','a']);
  assert.equal(context.state.startTrackId, 'b');
  assert.equal(context.state.mixId, 'catalogue');
  assert.equal(context.state.index, 0);
  assert.equal(context.state.currentPart, 0);
  assert.equal(context.state.shuffle, false);
  assert.equal(context.state.repeatMode, 'off');
  assert.deepEqual(played, [0]);
}

{ // Rejected selection cannot replace an already-playing queue or its settings.
  const {context, api, played} = runtime();
  context.state = {queue: [tracks[2]], index: 0, currentPart: 0, mixId: 'live', shuffle: true, repeatMode: 'all'};
  assert.equal(api.startSingle({src: '/not-admitted.mp3'}), false);
  assert.deepEqual(Array.from(context.state.queue, track => track.id), ['c']);
  assert.equal(context.state.mixId, 'live');
  assert.equal(context.state.shuffle, true);
  assert.deepEqual(played, []);
}

{ // Saved catalogue context restores the original anchor, even after advancing.
  const {context, api} = runtime();
  const saved = {ctx: 'catalogue', startTrackId: 'b', trackId: 'a', finished: true,
    shuffle: false, repeatMode: 'off', volume: .75, muted: false};
  assert.deepEqual(Array.from(api.queueForSaved(saved), track => track.id), ['b','c','a']);
  api.restoreQueue(saved);
  assert.deepEqual(Array.from(context.state.queue, track => track.id), ['b','c','a']);
  assert.equal(context.state.index, 2);
  assert.equal(context.state.startTrackId, 'b');
  assert.equal(context.state.finished, true);
  // Legacy state stays readable: it has no finished or start anchor fields.
  const legacy = {ctx: 'single', trackId: 'c', shuffle: false, repeatMode: 'off', volume: .8, muted: false};
  api.restoreQueue(legacy);
  assert.deepEqual(Array.from(context.state.queue, track => track.id), ['c']);
  assert.equal(context.state.finished, false);
  assert.equal(context.state.startTrackId, null);
}

{ // New finished records validate, while old records without `finished` still restore.
  const {api} = runtime();
  const base = {v: 1, registryId: 'registry-test', currentTime: 0, paused: true,
    shuffle: false, repeatMode: 'off', volume: .8, muted: false, savedAt: Date.now()};
  const catalogue = {...base, ctx: 'catalogue', trackId: 'a', startTrackId: 'b', finished: true};
  assert.equal(api.validateSavedState(catalogue).startTrackId, 'b');
  const legacy = {...base, ctx: 'single', trackId: 'c'};
  assert.equal(api.validateSavedState(legacy).ctx, 'single');
  assert.equal(api.validateSavedState({...catalogue, startTrackId: 'missing'}), null);
  assert.equal(api.validateSavedState({...catalogue, finished: true, paused: false}), null);
}

{ // Finished Play again restarts the selected-first queue; explicit Stop clears it.
  const {context, api, played} = runtime();
  Object.assign(context.state, {queue: tracks.map(track => ({...track})), index: 2, currentPart: 0,
    finished: true, startTrackId: 'b', mixId: 'catalogue', paused: true});
  api.togglePlay();
  assert.deepEqual(played, [0]);
  api.realStopPlayer();
  assert.equal(context.state.finished, false);
  assert.equal(context.state.startTrackId, null);
  assert.equal(context.state.queue.length, 0);
}

console.log('PASS test-ksvl-catalogue-flow');
