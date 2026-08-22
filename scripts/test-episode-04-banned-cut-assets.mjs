#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const checker = path.join(root, "scripts/check-episode-04-banned-cut-assets.mjs");

const current = spawnSync(process.execPath, [checker], { cwd: root, encoding: "utf8" });
assert.equal(current.status, 0, `${current.stdout}\n${current.stderr}`);
assert.match(current.stdout, /EP04 BANNED-CUT PASS/);

const calibrated = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: "utf8",
  env: {
    ...process.env,
    EP04_BANNED_SCAN_PATHS: "operations/test-fixtures/episode-04-banned-cut/bad-builder.py",
  },
});
assert.notEqual(calibrated.status, 0, "known-bad consumer must fail the gate");
assert.match(calibrated.stderr, /EP04 BANNED-CUT FAIL/);
assert.match(calibrated.stderr, /ep04-tj-timnit-comic/);

const derivedCalibrated = spawnSync(process.execPath, [checker], {
  cwd: root,
  encoding: "utf8",
  env: {
    ...process.env,
    EP04_BANNED_SCAN_PATHS: "operations/test-fixtures/episode-04-banned-cut/bad-derived-consumer.py",
  },
});
assert.notEqual(derivedCalibrated.status, 0, "known-bad derived consumer must fail the gate");
assert.match(derivedCalibrated.stderr, /EP04 BANNED-CUT FAIL/);
assert.match(derivedCalibrated.stderr, /p46-p49-modern-criticism-review-v1\.mp4/);

console.log("EP04 BANNED-CUT TEST PASS");
console.log("calibration=direct_and_derived_known_bad_consumers_rejected");
