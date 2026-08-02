#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.SCREENING_ROOM_ROOT || process.cwd());
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file.split(/[?#]/)[0].replace(/^\/+/, "")));
const page = read("watch.html");
const index = JSON.parse(read("content/episode-index.json"));
const ids = ["trailer", "01", "02", "03", "04"];
const warnings = [];
const failures = [];
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");
const admission = JSON.parse(read("content/episodes/screening-room-admission.json"));
const derived = JSON.parse(read("content/episodes/screening-room-derived-editions.json"));
const isArtifact = exists("build-report.json");

assert.match(page, /var EPISODE_FILMS = \{\}/);
assert.match(page, /Motion-film editions are not approved for the public Screening Room/);
assert.match(page, /A motion-film edition is not approved for public screening/);
assert.doesNotMatch(page, /final motion films are completing their continuity check/i);
assert.match(page, /Illustrated listen-alongs/);
assert.match(page, /e\.target\.closest\('input, textarea, select, button, a, \[contenteditable="true"\]'\)/);
assert.match(page, /Read-along captions are temporarily unavailable/);
assert.match(page, /role="slider" tabindex="0"/);
assert.match(page, /aria-valuetext/);
assert.match(page, /e\.key === 'ArrowLeft'/);
assert.match(page, /e\.key === 'Home'/);
assert.match(page, /PUBLIC_EPISODES = \['trailer', '01', '02', '03', '04'\]/);
assert.match(page, /location\.hostname === 'localhost'/);
assert.match(page, /Playback has stopped; no simulated narration or scene advance is running/);
assert.doesNotMatch(page, /Rough cut — narration not recorded yet/);
assert.doesNotMatch(page, /\bdemoMode\b|\bdemoClock\b|\bdemoPlaying\b/);
assert.match(page, /function failPlayer\(kind, message\)[\s\S]*?tape\.pause\(\)[\s\S]*?btnPlay\.disabled = true/);
assert.match(page, /failPlayer\('captions', 'Read-along captions are temporarily unavailable\.'\)/);
assert.match(page, /failPlayer\('audio', 'The narration audio failed to load\.'\)/);
assert.match(page, /failPlayer\('visual', 'The timed visual failed to load\.'\)/);
assert.match(page, /failPlayer\('cues', 'The timing and visual cue sheet failed to load\.'\)/);
assert.match(page, /failPlayer\('playback', 'The narration could not start\.'\)/);
assert.match(page, /laidies_screening_progress_v1/);
assert.match(page, /local playback history, not an account/);
assert.match(page, /Transcript unavailable for this final portion/);
assert.match(page, /no words have been invented/);
assert.match(page, /window\.addEventListener\('pagehide', function \(\) \{ storeProgress\(true\); \}\)/);
assert.doesNotMatch(page, /Episode watch/);
assert.match(page, /Listen-along start/);
assert.match(page, /cover-only audio edition/i);
assert.match(page, /screening-room-admission\.json/);
assert.match(page, /admission\.admissionStatus === 'release'/);
assert.match(page, /admission\.occurrences\.length === admission\.expectedOccurrenceCount/);
assert.match(page, /HELD_VISUAL_COVERS/);
assert.match(page, /function configureMediaSession\(media, programme\)/);
assert.match(page, /album: 'The Wednesday Tour · Season 1'/);
assert.match(page, /setActionHandler\(name, handler\)/);
assert.match(page, /action\('seekbackward'/);
assert.match(page, /action\('seekforward'/);
assert.match(page, /action\('seekto'/);
assert.match(page, /configureMediaSession\(tape, __ep\)/);
assert.match(page, /configureMediaSession\(v, ep\)/);
assert.equal(admission.schemaVersion, 1);
assert.equal(derived.schemaVersion, 1);

const published = index.episodes.filter((episode) => episode.status === "published");
assert.deepEqual(published.map((episode) => episode.number), [1, 2, 3, 4]);
assert.equal(index.episodes.find((episode) => episode.number === 5)?.status, "draft");

for (const id of ids) {
  const cuePath = `content/episodes/episode-${id}-cues.json`;
  const captionPath = `assets/captions/episode-${id}.vtt`;
  assert.ok(exists(cuePath), `${id}: cue sheet missing`);
  assert.ok(exists(captionPath), `${id}: caption master missing`);
  const sheet = JSON.parse(read(cuePath));
  const record = admission.programmes[id];
  assert.ok(record, `${id}: admission record missing`);
  assert.equal(record.admissionStatus, "hold", `${id}: must remain held`);
  assert.equal(record.cueSheetSha256, derived.editions[id]
    ? derived.editions[id].sourceCueSha256
    : sha256(cuePath), `${id}: source cue authority hash mismatch`);
  assert.equal(sha256(record.audio.replace(/^\//, "")), record.audioSha256, `${id}: audio hash mismatch`);
  assert.equal(sha256(record.captions.replace(/^\//, "")), record.captionsSha256, `${id}: caption hash mismatch`);
  assert.equal(record.occurrences.length, 0, `${id}: unjudged occurrences must not masquerade as evidence`);
  warnings.push(`${id}: ${record.expectedOccurrenceCount} occurrence verdicts missing; title remains HOLD`);
  assert.ok(Array.isArray(sheet.cues) && sheet.cues.length, `${id}: cues missing`);
  assert.ok(typeof sheet.audio === "string" && exists(sheet.audio), `${id}: narration audio missing`);
  let prior = -1;
  for (const [position, cue] of sheet.cues.entries()) {
    assert.ok(Number.isFinite(cue.t) && cue.t >= prior, `${id}: cue ${position} is out of order`);
    prior = cue.t;
    if (record.admissionStatus === "release" && cue.src) {
      assert.ok(exists(cue.src), `${id}: missing released cue asset ${cue.src}`);
    }
  }
  const vtt = read(captionPath);
  const ranges = [...vtt.matchAll(/(\d{2}):(\d{2}):(\d{2}\.\d{3})\s+-->\s+(\d{2}):(\d{2}):(\d{2}\.\d{3})/g)];
  assert.ok(ranges.length > 0, `${id}: no parseable caption cues`);
  const last = ranges.at(-1);
  const captionEnd = Number(last[4]) * 3600 + Number(last[5]) * 60 + Number(last[6]);
  assert.ok(Math.abs(captionEnd - record.captionEndSeconds) < 0.01, `${id}: caption end differs from authority`);
  const uncovered = record.audioDurationSeconds - captionEnd;
  if (record.captionCoverage === "complete") {
    assert.ok(uncovered <= 2, `${id}: complete caption claim leaves ${uncovered.toFixed(3)}s uncovered`);
  } else {
    warnings.push(`${id}: partial caption coverage leaves ${uncovered.toFixed(3)}s uncaptioned`);
  }
  const visualTail = captionEnd - sheet.cues.at(-1).t;
  if (visualTail < 0) {
    if (record.captionCoverage === "partial") {
      warnings.push(`${id}: held visual cue begins ${Math.abs(visualTail).toFixed(1)}s after partial captions end`);
    } else {
      failures.push(`${id}: final visual cue begins ${Math.abs(visualTail).toFixed(1)}s after the caption master ends`);
    }
  }
  if (visualTail > 45) warnings.push(`${id}: final visual holds ${visualTail.toFixed(1)}s through the captioned narration`);
  if (/ESTIMATES|PROPORTIONAL/i.test(sheet.note || "")) {
    warnings.push(`${id}: cue sheet declares estimated/proportional timing`);
  }
}

for (const anchor of admission.semanticAnchors) {
  const sheet = JSON.parse(read(`content/episodes/episode-${anchor.programme}-cues.json`));
  const cue = sheet.cues.find((item) => item.src === anchor.cueAsset);
  assert.ok(cue, `${anchor.programme}/${anchor.id}: semantic cue missing`);
  assert.equal(cue.t, anchor.requiredCueStartSeconds, `${anchor.programme}/${anchor.id}: cue starts before its authoritative caption`);
  assert.match(read(`assets/captions/episode-${anchor.programme}.vtt`), new RegExp(anchor.captionText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
}

for (const [id, edition] of Object.entries(derived.editions)) {
  const cuePath = `content/episodes/episode-${id}-cues.json`;
  const expected = isArtifact ? edition.artifactCueSha256 : edition.sourceCueSha256;
  assert.equal(sha256(cuePath), expected, `${id}: derived-edition hash mismatch`);
  if (isArtifact) {
    const sheet = JSON.parse(read(cuePath));
    assert.equal(sheet.edition?.kind, "cover-only-audio", `${id}: derived identity missing`);
    assert.equal(sheet.edition?.reviewStatus, "hold", `${id}: derived hold missing`);
    assert.ok(sheet.cues.every((cue) => cue.type === "full" && cue.src === edition.cover), `${id}: cover-only transform differs from manifest`);
    assert.doesNotMatch(sheet.note, /verified audio|timed lesson cards/i);
  }
}

assert.deepEqual(
  JSON.parse(read("content/episodes/episode-trailer-cues.json")).cues.map((cue) => cue.t),
  [0, 6.38, 43.26, 82.86, 105.38, 138.1, 177.6, 185.88, 195.22, 289.22, 360.2, 364.1, 371.42, 395.84, 416.04, 440.86, 489.58, 515.44, 537.98, 542.02, 569.66, 610.76, 632.36, 699.62, 766.86, 783.62, 786.56, 816.8, 844.86, 871, 887.84, 960],
  "trailer semantic-onset clock differs from the authoritative VTT audit"
);
assert.deepEqual(
  JSON.parse(read("content/episodes/episode-02-cues.json")).cues.map((cue) => cue.t),
  [0, 37.12, 64.18, 82.34, 91.34, 122.77, 155.27, 168.33, 188.99, 247.11, 277.47, 311.31, 391.37, 463.83, 513.43, 602.45, 651.53, 662.65, 690.27, 779.67, 831.73, 852.07, 909.25, 915.645, 921.958, 945.95, 971.49],
  "Episode 02 semantic-onset clock differs from the authoritative VTT audit"
);

console.log(failures.length ? "SCREENING ROOM REPAIR CONTRACT FAIL" : "SCREENING ROOM REPAIR CONTRACT PASS — TITLES HOLD");
console.log(`programmes=${ids.length}`);
console.log(`published_episodes=${published.length}`);
console.log(`motion_films=0`);
for (const warning of warnings) console.log(`HOLD: ${warning}`);
for (const failure of failures) console.error(`FAIL: ${failure}`);
if (failures.length) process.exit(1);
