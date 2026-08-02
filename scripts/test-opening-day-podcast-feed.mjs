#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts/build-opening-day-podcast-feed.mjs");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-podcast-feed-"));
const xmlPath = path.join(temp, "preview.xml");
const planPath = path.join(temp, "preview.json");

const preview = spawnSync(process.execPath, [SCRIPT, "--preview", "--output", xmlPath, "--plan-output", planPath], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.equal(preview.status, 0, preview.stderr);
const xml = fs.readFileSync(xmlPath, "utf8");
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
assert.equal(plan.status, "INTERNAL PREVIEW / HOLD");
assert.equal(plan.distributable, false);
assert.equal(plan.items.length, 5);
assert.equal((xml.match(/<item>/g) || []).length, 5);
assert.equal((xml.match(/<enclosure\b/g) || []).length, 0);
assert.match(xml, /\[INTERNAL PREVIEW\] LAiDIES: The Wednesday Tour/);
assert.deepEqual(plan.items.map((item) => item.status), ["HOLD", "HOLD", "HOLD", "HOLD", "HOLD"]);
assert(plan.items.every((item) => item.audio.publicUrl === null));
assert(plan.items.every((item) => item.releaseProblems.length > 0));

const missingProviderIdentity = spawnSync(process.execPath, [SCRIPT, "--release", "--output", path.join(temp, "release.xml")], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.notEqual(missingProviderIdentity.status, 0);
assert.match(missingProviderIdentity.stderr, /RELEASE REFUSED: --owner-email is required/);

const release = spawnSync(process.execPath, [
  SCRIPT,
  "--release",
  "--owner-email",
  "podcast-test@invalid.example",
  "--show-art-url",
  "https://invalid.example/show-art.jpg",
  "--output",
  path.join(temp, "release.xml"),
], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.notEqual(release.status, 0);
assert.match(release.stderr, /RELEASE REFUSED: 0 eligible titles; 5 held or incomplete/);
assert.equal(fs.existsSync(path.join(temp, "release.xml")), false);

console.log("Opening-day podcast-feed test: PASS");
console.log("- internal preview contains 5 checksum-bound items and 0 enclosures");
console.log("- release mode refuses all 5 held packages before writing output");
