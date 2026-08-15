#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checker = path.join(root, "scripts/check-newsstand-reader-entry.mjs");
const firstKnownBad = path.join(root, "operations/product-stewards/newsstand/experiments/lcwo-024-specialized-pipeline-v1/04-LAIDIES-EDIT.md");
const secondKnownBad = path.join(root, "operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-headline-reality-check-v2.md");
const run = file => spawnSync(process.execPath, [checker, file], { encoding: "utf8" });

const firstBad = run(firstKnownBad);
assert.notEqual(firstBad.status, 0, "first Ali-rejected article must fail unaided");
assert.match(firstBad.stderr, /headline does not correct/);
assert.match(firstBad.stderr, /standfirst does not repeat/);

const secondBad = run(secondKnownBad);
assert.notEqual(secondBad.status, 0, "second Ali-rejected article must fail unaided");
assert.match(secondBad.stderr, /missing exact-source section/);
assert.match(secondBad.stderr, /missing fair-summary section/);
assert.match(secondBad.stderr, /missing complete sharing journey/);
assert.match(secondBad.stderr, /missing can\/cannot boundary section/);
assert.match(secondBad.stderr, /missing unintended-contents section/);

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-reader-entry-"));
const goodPath = path.join(dir, "good.md");
fs.writeFileSync(goodPath, `# No, this paper did not find your private AI chats online

*It does not concern ordinary private chats. Developers and researchers deliberately posted saved records publicly so other people could inspect how their AI work happened.*

## What you may have seen

The August 10, 2026 research preprint [“A precise public title”](https://example.com/paper) reported a privacy problem in saved AI records. Researchers studied records that developers and researchers had deliberately uploaded publicly so others could inspect or reproduce the work. It did not find that ordinary private chats had escaped onto the internet.

## What it was saying

The paper said some AI systems returned extra unreadable information alongside a visible answer. Researchers reported that another model could reveal parts of that extra information in records people had already published, including sensitive details not visible in the cleaned conversation.

## How this happened

A developer used an AI coding tool to work on software. The tool saved a record of the run: instructions, visible answers, tool actions and an unreadable field. The developer then uploaded that original record to GitHub so other researchers could inspect and reproduce the work. Another person could download the public record.

## When this can happen — and when it cannot

- A normal private chat is not published by this route.
- Selecting visible words in an answer and pasting only those selected words into an email moves those words, not the saved run record.
- A public chat link makes the visible conversation available and is a different sharing choice.
- A requested diagnostic record deserves a pause and a private approved route; the paper did not study support requests.
- Publishing a raw developer run was the route the researchers directly studied.

## What could be included without realizing it

The records contained API keys, passwords and access tokens. In one example, an AI asked to clean a software project repeated a key it was supposed to remove in unreadable carry-along data. The researchers could not determine the origin of every recovered item.
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

console.log("NEWSSTAND READER ENTRY CALIBRATION PASS known_bad_rejected=2 good_fixture_accepted=1 delayed_fixture_rejected=1 quality_authority=none");
