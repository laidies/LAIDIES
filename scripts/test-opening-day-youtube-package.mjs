#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(ROOT, "scripts/build-opening-day-youtube-package.mjs");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-youtube-package-"));
const previewPath = path.join(temp, "preview.json");

const preview = spawnSync(process.execPath, [SCRIPT, "--preview", "--output", previewPath], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.equal(preview.status, 0, preview.stderr);
const plan = JSON.parse(fs.readFileSync(previewPath, "utf8"));
assert.equal(plan.status, "INTERNAL PREVIEW / HOLD");
assert.equal(plan.actionable, false);
assert.equal(plan.uploadsPerformed, 0);
assert.equal(plan.items.length, 5);
assert.deepEqual(plan.items.map((item) => item.programme), ["trailer", "01", "02", "03", "04"]);
assert(plan.items.every((item) => item.uploadReady === false));
assert(plan.items.every((item) => item.releaseProblems.length > 0));
assert(plan.items.every((item) => item.video.sha256.length === 64));
assert(plan.items.every((item) => item.captions.sha256.length === 64));
assert(plan.items.every((item) => item.thumbnail.sha256.length === 64));
assert(plan.items.every((item) => item.thumbnail.width === 1280 && item.thumbnail.height === 720));
assert(plan.items.every((item) => item.title.length <= 100));
assert(plan.items.every((item) => item.description.length <= 5000));
assert(plan.items.every((item) => item.tags.includes("LAiDIES")));

const releasePath = path.join(temp, "release.json");
const release = spawnSync(process.execPath, [SCRIPT, "--release", "--output", releasePath], {
  cwd: ROOT,
  encoding: "utf8",
});
assert.notEqual(release.status, 0);
assert.match(release.stderr, /RELEASE REFUSED: 5\/5 titles remain held or incomplete/);
assert.equal(fs.existsSync(releasePath), false);

console.log("Opening-day YouTube-package test: PASS");
console.log("- preview binds 5 exact video/caption/thumbnail packages");
console.log("- preview performs 0 uploads and marks every title non-actionable");
console.log("- release mode refuses all 5 held titles before writing output");
