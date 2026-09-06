#!/usr/bin/env node
// Tests the player’s real flow helpers by extracting their source into a small
// fake runtime.  Keep behaviour assertions here, rather than copying helpers.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const sourcePath = process.argv[2] || new URL('../content/site/ksvl-player.js', import.meta.url);
const source = fs.readFileSync(sourcePath, 'utf8');

function between(start, end) {
  const from = source.indexOf(start);
  const to = source.indexOf(end, from);
  assert.ok(from >= 0 && to > from, `could not extract ${start}`);
  return source.slice(from, to);
}

const stateSource = between('  var state = {', '  // Resolve the currently-playing sub-item');
const resolverSource = between('  function currentPart()', '  function updateUpNext()');
const preloadSource = between('  function preloadNextInFlow()', '  function toggleShuffle()');
const playIndexSource = between('  function playIndex(i)', '  // Play the current part');

function runtime(random = 0.6) {
  const played = [];
  const events = [];
  class FakeAudio {
    constructor(src) { this.src = src; this.preload = ''; events.push(['audio', src]); }
  }
  const math = Object.create(Math);
  math.random = typeof random === 'function' ? random : () => random;
  const context = { Audio: FakeAudio, Math: math, window: {}, console,
    playCurrentPart: () => played.push(context.state.index),
    realStopPlayer: () => events.push(['real-stop']),
    updateNowPlaying: () => events.push(['render']),
    syncSoundControls: () => events.push(['sync']),
    announce: () => events.push(['announce']),
    saveState: () => events.push(['save']) };
  vm.createContext(context);
  vm.runInContext(`${stateSource}\n${resolverSource}\n${preloadSource}\n${playIndexSource}\nthis.api = { state, nextInFlow, nextTitle, preloadNextInFlow, advanceOnEnded, playIndex };`, context);
  return { ...context.api, played, events };
}

function queue() {
  return [
    { title: 'One', src: '/one.mp3' },
    { title: 'Two', src: '/two.mp3' },
    { title: 'Three', src: '/three.mp3' }
  ];
}

function setup(api, extra = {}) {
  Object.assign(api.state, { queue: queue(), index: 0, currentPart: 0, mixId: 'all', finished: false,
    signingOff: false, shuffle: false, repeatMode: 'all', nextChoice: null,
    preloadedAudio: null, preloadedSrc: null }, extra);
}

{ // ordinary sequential: title, preload and advance identify the same item
  const api = runtime(); setup(api);
  assert.equal(api.nextTitle(), 'Two');
  api.preloadNextInFlow(); assert.equal(api.state.preloadedSrc, '/two.mp3');
  api.advanceOnEnded(); assert.deepEqual(api.played, [1]);
}

{ // a multipart intro leads to its actual next part, not the next queue entry
  const api = runtime(); setup(api, { queue: [
    { title: 'Song', parts: [{ title: 'DJ intro', src: '/intro.mp3' }, { title: 'Song', src: '/song.mp3' }] },
    { title: 'Later', src: '/later.mp3' }
  ] });
  assert.equal(api.nextTitle(), 'Song');
  api.preloadNextInFlow(); assert.equal(api.state.preloadedSrc, '/song.mp3');
  api.state.currentPart = 1;
  assert.equal(api.nextTitle(), 'Later');
}

{ // playlist endings follow repeat mode precisely; a terminal queue stays available
  const api = runtime(); setup(api, { index: 2, repeatMode: 'all' });
  assert.equal(api.nextTitle(), 'One'); api.advanceOnEnded(); assert.deepEqual(api.played, [0]);
  setup(api, { index: 2, repeatMode: 'off' });
  assert.equal(api.nextTitle(), ''); api.preloadNextInFlow(); assert.equal(api.state.preloadedSrc, null);
  api.advanceOnEnded();
  assert.equal(api.state.finished, true);
  assert.equal(api.state.index, 2, 'finish retains the selected-first queue position');
  assert.equal(api.state.queue.length, 3, 'finish does not discard replayable queue');
  setup(api, { index: 1, repeatMode: 'one' });
  assert.equal(api.nextTitle(), 'Two'); api.advanceOnEnded(); assert.deepEqual(api.played, [0, 1]);
}

{ // a deliberate sign-off still hard-stops instead of leaving a finished queue
  const api = runtime(); setup(api, { signingOff: true });
  assert.equal(api.nextTitle(), ''); api.advanceOnEnded(); assert.deepEqual(api.events, [['real-stop']]);
}

{ // shuffle reserves one choice: preview, preload and auto-advance agree
  let calls = 0;
  const api = runtime(() => ++calls === 1 ? 0.7 : 0.1); setup(api, { shuffle: true });
  assert.equal(api.nextTitle(), 'Three');
  api.preloadNextInFlow(); assert.equal(api.state.preloadedSrc, '/three.mp3');
  api.advanceOnEnded(); assert.deepEqual(api.played, [2]);
  assert.equal(calls, 1, 'preview, preload and advancement must use one random choice');
}

{ // a state transition clears a reserved shuffle choice before a new flow begins
  const api = runtime(0.7); setup(api, { shuffle: true });
  api.nextInFlow(); assert.ok(api.state.nextChoice);
  api.playIndex(1); assert.equal(api.state.nextChoice, null);
}

console.log('PASS test-ksvl-up-next');
