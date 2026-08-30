#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "newsstand-crossword.html"), "utf8");

assert.doesNotMatch(html, /prototype successor|Saturday\s*<br>\s*August 23, 2026/i, "a dated prototype label cannot remain on Puzzle 01");
assert.match(html, /NewsStand puzzle desk · Puzzle 01/, "Puzzle 01 must be labelled without inventing a publication date");
assert.match(html, /aria-invalid/, "incorrect cells must expose an invalid state");
assert.match(html, /cell\.label\+", incorrect"/, "cell labels must name incorrect feedback");
assert.match(html, /cell\.label\+", correct"/, "cell labels must name correct feedback");
assert.match(html, /cw-storage-status/, "storage availability must be reported truthfully");
assert.match(html, /cannot save crossword progress/, "unavailable storage copy must be explicit");
assert.match(html, /KEY="laidies_newsstand_crossword_2026-08-23_v1"/, "existing user progress key must remain stable");
assert.match(html, /arrow keys to move between cells/i, "existing keyboard guidance must remain");
console.log("NEWSSTAND CROSSWORD ACCESSIBILITY TEST PASS labels=1 invalid_state=1 storage_truth=1 puzzle_identity=1 progress_key_preserved=1 keyboard_guidance_preserved=1");
