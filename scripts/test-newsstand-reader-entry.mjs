#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checker = path.join(root, "scripts/check-newsstand-reader-entry.mjs");
const knownBad = path.join(root, "operations/product-stewards/newsstand/experiments/lcwo-024-specialized-pipeline-v1/04-LAIDIES-EDIT.md");
const run = file => spawnSync(process.execPath, [checker, file], { encoding: "utf8" });

const bad = run(knownBad);
assert.notEqual(bad.status, 0, "Ali-rejected known-bad article must fail unaided");
assert.match(bad.stderr, /headline does not correct/);
assert.match(bad.stderr, /standfirst does not repeat/);

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-reader-entry-"));
const goodPath = path.join(dir, "good.md");
fs.writeFileSync(goodPath, `# No, this study did not find your private AI chats online

*It does not concern ordinary private chats. Developers and researchers deliberately posted complete files publicly so other people could inspect how their AI work happened.*

If a headline made you worry that every private chat had escaped onto the internet, breathe. The researchers studied files that developers and researchers had uploaded publicly so others could study or reuse them. Those files held more than the neat answer visible on screen.
`);
const good = run(goodPath);
assert.equal(good.status, 0, good.stderr);

const delayedPath = path.join(dir, "delayed.md");
fs.writeFileSync(delayedPath, `# This study found hidden information

*Researchers studied an important new technical risk.*

${"Background material fills the opening. ".repeat(35)} Developers later shared files.
`);
const delayed = run(delayedPath);
assert.notEqual(delayed.status, 0, "delayed reassurance must fail");

console.log("NEWSSTAND READER ENTRY CALIBRATION PASS known_bad_rejected=1 good_fixture_accepted=1 delayed_fixture_rejected=1 quality_authority=none");
