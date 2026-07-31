#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '../../../../..');
const evidenceDir = import.meta.dirname;
const paths = {
  witness: path.join(root, 'operations/product-stewards/episode-media-quality/evidence-2026-07-26/emq-e02-v19-player-witness-v2.html'),
  mp4: path.join(root, 'assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4'),
  vtt: path.join(root, 'assets/captions/episode-02.vtt')
};
const expected = {
  witness: '05430de37a9aef0b07e112e14ba75f3f1ac62a22a9d3bbbc03198b28b3f2e5d6',
  mp4: 'e4b035863dbb28133601fda0302816667695bd442263d5e8bd9e054b127676c3',
  vtt: '7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f'
};
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const bytes = Object.fromEntries(Object.entries(paths).map(([name, file]) => [name, fs.readFileSync(file)]));
for (const name of Object.keys(expected)) assert.equal(sha256(bytes[name]), expected[name], `${name} hash changed`);

const html = bytes.witness.toString('utf8');
const vtt = bytes.vtt.toString('utf8');
const scriptMatch = html.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
assert.ok(scriptMatch, 'exact successor inline script must exist');
const exactScript = scriptMatch[1];

function timestampSeconds(value) {
  const match = /^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/.exec(value);
  assert.ok(match, `invalid VTT timestamp ${value}`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
}

function parseVtt(text) {
  assert.equal(text.startsWith('WEBVTT\n'), true, 'VTT header');
  const cues = [];
  for (const block of text.trim().split(/\n{2,}/).slice(1)) {
    const lines = block.split('\n');
    const timingIndex = lines.findIndex((line) => line.includes(' --> '));
    assert.notEqual(timingIndex, -1, `cue timing missing: ${block.slice(0, 50)}`);
    const [start, end] = lines[timingIndex].split(' --> ').map(timestampSeconds);
    const rawText = lines.slice(timingIndex + 1).join('\n');
    const voice = rawText.match(/^<v(?:\s+([^>]*))?>/i)?.[1]?.trim() || '';
    const readable = rawText
      .replace(/<v(?:\s+[^>]*)?>/gi, '')
      .replace(/<\/v>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    cues.push({ start, end, rawText, voice, readable });
  }
  return cues;
}

const parsedCues = parseVtt(vtt);
assert.ok(parsedCues.length > 100, 'expected full exact VTT cue set');
assert.equal(parsedCues[0].voice, 'The Announcer');
assert.match(parsedCues[0].readable, /^Previously, on LAiDIES/);
assert.equal(parsedCues.at(-1).end, 986.67);
assert.ok(parsedCues.every((cue) => cue.readable && !/<\/?v(?:\s|>)/i.test(cue.readable)));

class FakeEventTarget {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push(listener);
  }
  dispatchEvent(event) {
    event.target ||= this;
    for (const listener of this.listeners.get(event.type) || []) listener.call(this, event);
    return true;
  }
}
class FakeNode extends FakeEventTarget {
  constructor(id = '') {
    super();
    this.id = id;
    this.textContent = '';
    this.value = '';
    this.hidden = false;
    this.attributes = new Map();
    this.src = '';
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
}
class HTMLInputElement extends FakeNode {}
class HTMLButtonElement extends FakeNode {}

function makeCue(cue) {
  return {
    text: cue.rawText,
    getCueAsHTML() { return { textContent: cue.readable }; }
  };
}

function runScenario({ search = '', reducedMotion = false } = {}) {
  const nodes = {
    film: new FakeNode('film'),
    filmSource: new FakeNode('filmSource'),
    captionTrack: new FakeNode('captionTrack'),
    captionRail: new FakeNode('captionRail'),
    status: new FakeNode('status'),
    play: new HTMLButtonElement('play'),
    back: new HTMLButtonElement('back'),
    forward: new HTMLButtonElement('forward'),
    seek: new HTMLInputElement('seek'),
    captions: new HTMLButtonElement('captions'),
    retry: new HTMLButtonElement('retry')
  };
  nodes.retry.hidden = true;
  nodes.captionRail.textContent = 'Captions are initializing…';
  nodes.status.value = 'Player initializing…';
  nodes.play.textContent = 'Play at normal speed';
  nodes.back.textContent = 'Back 10 seconds';
  nodes.forward.textContent = 'Forward 10 seconds';
  nodes.captions.textContent = 'Captions on';
  nodes.captions.setAttribute('aria-pressed', 'true');
  const track = new FakeEventTarget();
  track.mode = 'disabled';
  track.activeCues = [];
  Object.assign(nodes.film, {
    textTracks: [track],
    duration: 987.466667,
    currentTime: 0,
    playbackRate: 1,
    paused: true,
    muted: false,
    volume: 1,
    readyState: 4,
    loadCalls: 0,
    load() { this.loadCalls += 1; },
    async play() { this.paused = false; },
    pause() { this.paused = true; }
  });
  const documentTarget = new FakeEventTarget();
  const document = {
    querySelector(selector) { return nodes[selector.slice(1)]; },
    addEventListener: documentTarget.addEventListener.bind(documentTarget),
    dispatchEvent: documentTarget.dispatchEvent.bind(documentTarget)
  };
  const context = vm.createContext({
    document,
    location: { search },
    URLSearchParams,
    Number,
    Array,
    String,
    Math,
    Promise,
    HTMLInputElement,
    HTMLButtonElement,
    matchMedia: () => ({ matches: reducedMotion }),
    console
  });
  vm.runInContext(exactScript, context, { filename: paths.witness });
  return { nodes, track, documentTarget };
}

const normal = runScenario();
assert.equal(normal.nodes.captions.textContent, 'Captions on', 'initial HTML label remains authoritative before load');
assert.equal(normal.nodes.captions.getAttribute('aria-pressed'), 'true');
assert.equal(normal.track.mode, 'showing', 'track must be showing on first script render');
assert.equal(normal.nodes.captionTrack.src, '/assets/captions/episode-02.vtt', 'exact VTT contract');
assert.equal(normal.nodes.filmSource.src, '/assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4', 'exact MP4 contract');
assert.equal(normal.nodes.captionRail.textContent, 'Captions loading…');
normal.track.activeCues = [makeCue(parsedCues[0])];
normal.nodes.captionTrack.dispatchEvent({ type: 'load' });
normal.track.dispatchEvent({ type: 'cuechange' });
assert.equal(normal.nodes.captions.getAttribute('aria-pressed'), 'true');
assert.equal(normal.nodes.captions.textContent, 'Captions on');
assert.match(normal.nodes.captionRail.textContent, /^Previously, on LAiDIES/);
assert.doesNotMatch(normal.nodes.captionRail.textContent, /<\/?v(?:\s|>)/i);

normal.nodes.captions.dispatchEvent({ type: 'click' });
assert.equal(normal.track.mode, 'disabled');
assert.equal(normal.nodes.captions.textContent, 'Captions off');
assert.equal(normal.nodes.captionRail.textContent, 'Captions are off.');
normal.nodes.captions.dispatchEvent({ type: 'click' });
assert.equal(normal.track.mode, 'showing');
assert.equal(normal.nodes.captions.textContent, 'Captions on');

await normal.nodes.play.dispatchEvent({ type: 'click' });
await Promise.resolve();
assert.equal(normal.nodes.film.paused, false);
normal.documentTarget.dispatchEvent({ type: 'keydown', target: new FakeNode(), code: 'Space', key: ' ' , preventDefault() {} });
await Promise.resolve();
assert.equal(normal.nodes.film.paused, true);
normal.nodes.film.currentTime = 100;
normal.documentTarget.dispatchEvent({ type: 'keydown', target: new FakeNode(), code: 'ArrowRight', key: 'ArrowRight', preventDefault() {} });
assert.equal(normal.nodes.film.currentTime, 105);
normal.documentTarget.dispatchEvent({ type: 'keydown', target: new FakeNode(), code: 'ArrowLeft', key: 'ArrowLeft', preventDefault() {} });
assert.equal(normal.nodes.film.currentTime, 100);
normal.documentTarget.dispatchEvent({ type: 'keydown', target: new FakeNode(), code: 'End', key: 'End', preventDefault() {} });
assert.equal(normal.nodes.film.currentTime, 987.466667);

normal.track.activeCues = [];
normal.nodes.film.currentTime = 987;
normal.nodes.film.dispatchEvent({ type: 'timeupdate' });
assert.equal(normal.nodes.captionRail.textContent, 'Captions complete; audio continues to the end of the episode.');
const tailGap = Number((normal.nodes.film.duration - parsedCues.at(-1).end).toFixed(6));
assert.equal(tailGap, 0.796667);

const captionFailure = runScenario({ search: '?failCaptions=1' });
assert.equal(captionFailure.track.mode, 'showing');
assert.equal(captionFailure.nodes.captionTrack.src, '/assets/captions/__missing-episode-02.vtt');
captionFailure.nodes.captionTrack.dispatchEvent({ type: 'error' });
assert.equal(captionFailure.nodes.captionRail.textContent, 'Read-along captions failed to load. Playback remains available.');
assert.equal(captionFailure.nodes.captions.getAttribute('aria-pressed'), 'true');

const mediaFailure = runScenario({ search: '?failMedia=1' });
assert.equal(mediaFailure.nodes.filmSource.src, '/assets/video/__missing-episode-02.mp4');
mediaFailure.nodes.film.dispatchEvent({ type: 'error' });
assert.equal(mediaFailure.nodes.retry.hidden, false);
assert.match(mediaFailure.nodes.status.value, /mediaLoadState=error/);
mediaFailure.nodes.retry.dispatchEvent({ type: 'click' });
assert.equal(mediaFailure.nodes.retry.hidden, true);
assert.equal(mediaFailure.nodes.filmSource.src, '/assets/video/episode-02-full-v19-style-semantic-repaired-review.mp4');
assert.equal(mediaFailure.nodes.film.loadCalls, 1);
assert.match(mediaFailure.nodes.status.value, /mediaLoadState=loading/);

const reduced = runScenario({ reducedMotion: true });
assert.match(reduced.nodes.status.value, /reducedMotion=true/);
assert.match(html, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none !important;[\s\S]*transition: none !important;[\s\S]*scroll-behavior: auto !important;/);

assert.match(html, /main \{ width: min\(1100px, calc\(100% - 2rem\)\)/);
assert.match(html, /video \{ width: 100%/);
assert.match(html, /\.controls \{ display: flex; flex-wrap: wrap;/);
assert.match(html, /input\[type="range"\] \{ flex: 1 1 12rem; min-width: 0;/);
assert.match(html, /min-height: 44px/);
assert.match(html, /:focus-visible \{ outline: 3px solid #f5cd43;/);
assert.match(html, /role="region" aria-label="Read-along captions" aria-live="polite"/);
assert.match(html, /<div class="controls" aria-label="Witness player controls">/);
assert.match(html, /<input[^>]+aria-label="Seek through Episode 02"/);

for (const name of Object.keys(expected)) assert.equal(sha256(fs.readFileSync(paths[name])), expected[name], `${name} hash changed during test`);

const result = {
  schema: 'laidies.emq.e02-v19.player-witness-v2-no-network.v1',
  status: 'PASS — deterministic no-network technical evidence; not a real media/VTT load and not a human listen',
  frozen: expected,
  source_execution: {
    exact_inline_script_executed_in_vm: true,
    exact_vtt_bytes_parsed: true,
    cue_count: parsedCues.length
  },
  checks: {
    initial_captions_on_track_showing: 'PASS',
    loading_off_loaded_error_truth: 'PASS',
    exact_vtt_source_contract: 'PASS',
    no_rendered_voice_markup: 'PASS',
    readable_speaker_text: 'PASS',
    keyboard_play_pause_seek: 'PASS',
    visible_focus_and_control_semantics: 'PASS_SOURCE',
    mobile_containment: 'PASS_SOURCE_CONTRACT',
    reduced_motion: 'PASS_SOURCE_AND_STUB_BRANCH',
    caption_failure_recovery: 'PASS',
    media_failure_recovery: 'PASS',
    final_tail_calculation: { result: 'PASS', vtt_end_seconds: 986.67, media_duration_stub_seconds: 987.466667, gap_seconds: tailGap }
  },
  limitations: [
    'The in-app Browser blocked file:// navigation, so this test does not prove file-origin media or VTT behavior.',
    'Media duration, playback state, text-track state, cue activation, failures, and reduced-motion preference are deterministic stubs.',
    'No audio was decoded or heard, and no full 1× audible listen is claimed.',
    'Source-level mobile/focus semantics are not a human visual or assistive-technology acceptance.'
  ]
};
const output = path.join(evidenceDir, 'node-no-network-result.json');
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
