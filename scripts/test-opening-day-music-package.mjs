#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts/build-opening-day-music-package.mjs");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-music-package-"));
const previewPath = path.join(temp, "preview.json");

function sha256(relativePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, relativePath))).digest("hex");
}

const preview = spawnSync(process.execPath, [SCRIPT, "--preview", "--output", previewPath], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.equal(preview.status, 0, preview.stderr);
const plan = JSON.parse(fs.readFileSync(previewPath, "utf8"));
assert.equal(plan.status, "INTERNAL PREVIEW / HOLD");
assert.equal(plan.actionable, false);
assert.equal(plan.deliveriesPerformed, 0);
assert.equal(plan.items.length, 4);
assert.deepEqual(plan.items.map((item) => item.id), ["ep-01", "ep-02", "ep-03", "ep-04"]);
assert.deepEqual(plan.items.map((item) => item.artistDisplayName), [
  "The Regressions",
  "The Predicts",
  "The Overfits",
  "The Priors",
]);
assert.deepEqual(plan.items.map((item) => item.trackTitle), [
  "On Wednesdays We Do AI",
  "Tell Me What You Want",
  "Don't Be Chutney on the Stand",
  "It Was Women All Along",
]);
assert.equal(plan.items[2].episodeTitle, "The Burn Book Problem");
assert.notEqual(plan.items[2].episodeTitle, plan.items[2].trackTitle);
assert(plan.items.every((item) => item.status === "HOLD" && item.actionable === false));
assert(plan.items.every((item) => item.audio.sha256 === sha256(item.audio.sourcePath)));
assert(plan.items.every((item) => item.audio.durationSeconds > 0));
assert(plan.items.every((item) => item.audio.channels === 2 && item.audio.sampleRateHz === 48000));
assert(plan.items.every((item) => item.releaseProblems.length >= 14));
assert(plan.items.every((item) => item.destinations.length === 3));
assert(plan.items.flatMap((item) => item.destinations).every((item) => item.status === "HOLD" && item.deliveryId === null));
assert.equal(plan.summary.approvedArtwork, 0);
assert.equal(plan.summary.reconciledAsRecordedLyrics, 0);
assert.equal(plan.summary.releaseReadyTracks, 0);
assert.equal(plan.summary.heldDestinations, 12);
assert.equal(plan.items[3].artwork.status, "MISSING");
assert.equal(plan.items[3].lyrics.status, "SOURCE_FOUND / CANON_AND_REGISTRY_RECONCILIATION_REQUIRED");
assert.equal(plan.items[3].lyrics.sha256, sha256(plan.items[3].lyrics.sourcePath));
assert.equal(plan.invariants.providerCallsAllowed, false);
assert.equal(plan.invariants.placeholderMetadataAllowed, false);

const releasePath = path.join(temp, "release.json");
const release = spawnSync(process.execPath, [SCRIPT, "--release", "--output", releasePath], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.notEqual(release.status, 0);
assert.match(release.stderr, /RELEASE REFUSED: 4\/4 songs remain held or incomplete/);
assert.equal(fs.existsSync(releasePath), false);

console.log("Opening-day music-package test: PASS");
console.log("- preview binds 4 exact song files and canonical artist/title identity");
console.log("- Episode 03 episode/song titles remain correctly separated");
console.log("- all 12 provider destinations remain held with 0 deliveries");
console.log("- release mode fails before writing while metadata and approvals are incomplete");
