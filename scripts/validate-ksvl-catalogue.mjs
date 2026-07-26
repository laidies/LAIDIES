#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.KSVL_ROOT || process.cwd());
const playerPath = path.join(root, "content/site/ksvl-player.js");
const registryPath = path.join(root, "content/music/ksvl-track-registry.json");
const player = fs.readFileSync(playerPath, "utf8");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const REGISTRY_ID = "ksvl-public-tracks-2026-07-25";
const PUBLIC_RULE = "A file is playable only when this registry marks it AVAILABLE and CLEARED_FOR_PUBLIC_STREAMING. HOLD is not a rights claim or a playback promise.";
const today = Date.UTC(2026, 6, 25);

const playbackPromise = /\b(?:play(?:s|ing)?|listen(?:ing)?|shuffle|on[\s-]?air|broadcast(?:ing)?|weekly jams?|live broadcast)\b|(?:tracks?|songs?|mix(?:es)?|albums?|catalogue|station|audio)\s+(?:is|are|now)?\s*available|available\s+(?:tracks?|songs?|mix(?:es)?|albums?|catalogue|station|audio)\b/i;
const heldContext = /\b(?:unavailable|held|hold|soundcheck|pending|not publicly|not playing|no audio|no tracks?|none can|cannot|can't|won't|does not|do not|never|until .*admitted|without .*admission|review|required|disabled)\b/i;

function textOnly(value) {
  return value
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(?:script|style|template|noscript)\b[\s\S]*?<\/(?:script|style|template|noscript)>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&rsquo;|&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function promiseSurfaces(html) {
  const surfaces = [];
  for (const match of html.matchAll(/<(?:p|h[1-6]|li|label|summary|figcaption)\b[^>]*>([\s\S]*?)<\/(?:p|h[1-6]|li|label|summary|figcaption)>/gi)) {
    const value = textOnly(match[1]);
    if (value) surfaces.push(value);
  }
  for (const match of html.matchAll(/<(a|button|input|select|textarea)\b([^>]*)>/gi)) {
    const attributes = match[2];
    const held = /\bdisabled\b/i.test(attributes) ||
      /\baria-disabled\s*=\s*(["'])true\1/i.test(attributes);
    for (const attribute of attributes.matchAll(/\b(?:aria-label|title)\s*=\s*(["'])(.*?)\1/gi)) {
      surfaces.push(`${held ? "disabled control: " : ""}${textOnly(attribute[2])}`);
    }
  }
  for (const match of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const held = /\bdisabled\b/i.test(match[2]) ||
      /\baria-disabled\s*=\s*(["'])true\1/i.test(match[2]);
    const value = textOnly(match[3]);
    if (value) surfaces.push(`${held ? "disabled control: " : ""}${value}`);
  }
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (title) surfaces.push(textOnly(title[1]));
  for (const match of html.matchAll(/<meta\b[^>]*(?:name|property)=(["'])(?:description|og:description|twitter:description)\1[^>]*content=(["'])(.*?)\2[^>]*>/gi)) {
    surfaces.push(textOnly(match[3]));
  }
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (value) => {
        if (typeof value === "string") surfaces.push(value);
        else if (Array.isArray(value)) value.forEach(walk);
        else if (value && typeof value === "object") Object.values(value).forEach(walk);
      };
      walk(JSON.parse(match[1]));
    } catch {
      assert.fail("invalid KSVL structured metadata");
    }
  }
  return surfaces;
}

function assertNoUnheldPlaybackPromise(html, label) {
  for (const surface of promiseSurfaces(html)) {
    assert.ok(
      !playbackPromise.test(surface) || heldContext.test(surface),
      `${label}: zero-admission playback promise without held context: ${surface}`
    );
  }
}

function parseIsoDay(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const stamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(stamp);
  return parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() + 1 === month &&
    parsed.getUTCDate() === day ? stamp : null;
}

assert.equal(registry.schemaVersion, 1);
assert.equal(registry.registryId, REGISTRY_ID);
assert.equal(registry.publicRule, PUBLIC_RULE);
const updatedAt = parseIsoDay(registry.updatedAt);
const freshThrough = parseIsoDay(registry.freshThrough);
assert.notEqual(updatedAt, null, "updatedAt is not a real calendar day");
assert.notEqual(freshThrough, null, "freshThrough is not a real calendar day");
assert.ok(updatedAt <= today, "updatedAt may not be in the future");
assert.ok(freshThrough >= today, "registry is stale");
assert.ok(updatedAt <= freshThrough, "updatedAt may not follow freshThrough");
assert.ok(Array.isArray(registry.tracks) && registry.tracks.length > 0);

const expectedKeys = [
  "artist", "captionStatus", "freshnessOwner", "id", "lyricStatus", "mixes",
  "publicNote", "rightsStatus", "sourceLesson", "sourceStatus", "src", "status",
  "title", "transcriptStatus"
].sort();
const rightsStates = ["CLEARED_FOR_PUBLIC_STREAMING", "OWNER_REVIEW_REQUIRED"];
const sourceStates = ["EXACT_MASTER_VERIFIED", "EXACT_MASTER_REVIEW_REQUIRED", "EXACT_MASTER_MISSING"];
const lyricStates = ["AS_RECORDED_LYRICS_APPROVED", "AS_RECORDED_LYRICS_MISSING", "CANON_EXISTS_REVIEW_REQUIRED", "RECONCILIATION_REQUIRED"];
const transcriptStates = ["AS_RECORDED_TRANSCRIPT_APPROVED", "AS_RECORDED_TRANSCRIPT_MISSING", "AS_RECORDED_TRANSCRIPT_REVIEW_REQUIRED"];
const captionStates = ["AS_RECORDED_CAPTIONS_APPROVED", "AS_RECORDED_CAPTIONS_MISSING", "AS_RECORDED_CAPTIONS_REVIEW_REQUIRED"];
const ids = new Set();
const sources = new Set();

for (const track of registry.tracks) {
  assert.deepEqual(Object.keys(track).sort(), expectedKeys, `${track.id}: public keys`);
  assert.match(track.id, /^[a-z0-9][a-z0-9-]*$/);
  assert.ok(!ids.has(track.id), `${track.id}: duplicate id`);
  assert.ok(!sources.has(track.src), `${track.src}: duplicate source`);
  ids.add(track.id);
  sources.add(track.src);
  assert.match(track.src, /^\/content\/music\/[a-z0-9][a-z0-9_./-]*\.(mp3|m4a|ogg|wav)$/i);
  assert.ok(!track.src.includes(".."));
  assert.ok(["AVAILABLE", "HOLD", "RETIRED"].includes(track.status));
  assert.ok(rightsStates.includes(track.rightsStatus));
  assert.ok(sourceStates.includes(track.sourceStatus));
  assert.ok(lyricStates.includes(track.lyricStatus));
  assert.ok(transcriptStates.includes(track.transcriptStatus));
  assert.ok(captionStates.includes(track.captionStatus));
  if (track.status === "AVAILABLE") {
    assert.equal(track.rightsStatus, "CLEARED_FOR_PUBLIC_STREAMING");
    assert.equal(track.sourceStatus, "EXACT_MASTER_VERIFIED");
    assert.equal(track.lyricStatus, "AS_RECORDED_LYRICS_APPROVED");
    assert.equal(track.transcriptStatus, "AS_RECORDED_TRANSCRIPT_APPROVED");
    assert.equal(track.captionStatus, "AS_RECORDED_CAPTIONS_APPROVED");
    assert.notEqual(track.sourceLesson, null);
  }
  assert.ok(track.sourceLesson === null || /^\/[a-z0-9]/i.test(track.sourceLesson));
  assert.ok(track.title && track.artist && track.freshnessOwner && track.publicNote);
  assert.ok(
    player.includes(`id: '${track.id}'`) &&
    player.includes(`src: MUSIC + '${track.src.replace("/content/music/", "")}'`),
    `${track.id}: runtime source parity`
  );
}

const runtimeIds = [...player.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?\bmixes:\s*\[/g)]
  .map((match) => match[1]);
assert.deepEqual(new Set(runtimeIds), ids, "registry/runtime catalogue parity");
assert.equal(
  registry.tracks.filter((track) =>
    track.status === "AVAILABLE" &&
    track.rightsStatus === "CLEARED_FOR_PUBLIC_STREAMING" &&
    track.sourceStatus === "EXACT_MASTER_VERIFIED" &&
    track.lyricStatus === "AS_RECORDED_LYRICS_APPROVED" &&
    track.transcriptStatus === "AS_RECORDED_TRANSCRIPT_APPROVED" &&
    track.captionStatus === "AS_RECORDED_CAPTIONS_APPROVED" &&
    track.sourceLesson !== null
  ).length,
  0,
  "no track may be admitted before owner rights/master/lyric reconciliation"
);

for (const episode of ["01", "02", "03", "04"]) {
  const canonPath = path.join(root, `content/episodes/episode-${episode}.canon.md`);
  if (fs.existsSync(canonPath)) {
    const canon = fs.readFileSync(canonPath, "utf8");
    assert.match(canon, /lyrics:[\s\S]{0,100}PENDING/i, `EP ${episode}: pending lyric canon`);
  }
  const record = registry.tracks.find((track) => track.id === `ep-${episode}`);
  assert.equal(record?.status, "HOLD");
  assert.equal(record?.lyricStatus, "AS_RECORDED_LYRICS_MISSING");
}

for (const required of [
  "role: 'status'",
  "'aria-live': 'polite'",
  "'aria-atomic': 'true'",
  "Retry this track",
  "NotAllowedError",
  "audio.addEventListener('playing'",
  "audio.addEventListener('error'",
  "audio.addEventListener('waiting'",
  "audio.addEventListener('stalled'",
  "audio.addEventListener('loadedmetadata'",
  "ksvl-np-volume",
  "ksvl-np-seek",
  "isAdmittedSource",
  "Saved KSVL position restored on this device",
  "data.registryId !== REGISTRY_ID",
  "record.sourceStatus === 'EXACT_MASTER_VERIFIED'",
  "record.transcriptStatus === 'AS_RECORDED_TRANSCRIPT_APPROVED'",
  "record.captionStatus === 'AS_RECORDED_CAPTIONS_APPROVED'"
]) {
  assert.ok(player.includes(required), `player contract missing: ${required}`);
}

const radio = fs.readFileSync(path.join(root, "radio.html"), "utf8");
for (const required of [
  "It has not been sent or reviewed",
  "This browser could not save the draft",
  "Received for station review",
  "does not mean DJ SunnyV has heard, selected or promised to produce it",
  "Nothing is being described as delivered",
  "listening history and favourites are not synced to an account"
]) {
  assert.ok(radio.includes(required), `request/local-state truth missing: ${required}`);
}
assert.ok(!radio.includes("DJ SunnyV is listening."));
assert.ok(!radio.includes("you get first-listen and your name in the credits"));
assert.ok(!radio.includes("SUNNYVAiLE is broadcasting. You're not tuned in."));
assert.ok(!radio.includes("TUNE IN LIVE · 99.9"));
assert.ok(radio.includes("SOUNDCHECK HOLD · Public listening is unavailable."));
assert.ok(radio.includes("Six planned shelves, Sharpie-labeled. None can play or shuffle yet"));
assert.ok(radio.includes("DJ SunnyV is not publicly playing these albums"));
assert.ok(radio.includes("whole-album listening is unavailable until each item is admitted"));
assert.ok(radio.includes('href="/chick-flicks.html"'));
assert.ok(radio.includes('href="/library.html"'));
assert.ok(radio.includes("Missing or invalid request receipt"));
assert.ok(!player.includes("__KSVL_TEST_REGISTRY"), "production player exposes a registry override");

const booth = fs.readFileSync(path.join(root, "games/dj-booth.html"), "utf8");
assert.ok(booth.includes("Public tracks are held."));
assert.ok(booth.includes("duplicate hard-coded"));
assert.ok(booth.includes("return;\n      // === TRACK DATA ==="));
assert.ok(booth.includes("External playlists held"));
assert.ok(!booth.includes("open.spotify.com/playlist/"));
assert.ok(booth.includes('<meta property="og:description" content="Visit DJ SunnyV&#39;s Booth. Public listening and external playlists are held while KSVL completes exact-master, words, lesson-source and rights review." />') ||
  booth.includes('<meta property="og:description" content="Visit DJ SunnyV\'s Booth. Public listening and external playlists are held while KSVL completes exact-master, words, lesson-source and rights review." />'));

const admittedCount = registry.tracks.filter((track) =>
  track.status === "AVAILABLE" &&
  track.rightsStatus === "CLEARED_FOR_PUBLIC_STREAMING" &&
  track.sourceStatus === "EXACT_MASTER_VERIFIED" &&
  track.lyricStatus === "AS_RECORDED_LYRICS_APPROVED" &&
  track.transcriptStatus === "AS_RECORDED_TRANSCRIPT_APPROVED" &&
  track.captionStatus === "AS_RECORDED_CAPTIONS_APPROVED" &&
  track.sourceLesson !== null
).length;
if (admittedCount === 0) {
  assertNoUnheldPlaybackPromise(radio, "radio.html");
  assertNoUnheldPlaybackPromise(booth, "games/dj-booth.html");
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(homepage.includes("Visit the KSVL soundcheck"));
assert.ok(homepage.includes("Listening unavailable during soundcheck"));
assert.ok(!homepage.includes("DJ SunnyV is on air"));

console.log(`KSVL CATALOGUE CONTRACT PASS tracks=${registry.tracks.length} admitted=0 held=${registry.tracks.filter((track) => track.status === "HOLD").length}`);
