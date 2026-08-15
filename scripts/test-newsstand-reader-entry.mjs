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
const thirdKnownBad = path.join(root, "operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-headline-reality-check-v3.md");
const fourthKnownBad = path.join(root, "operations/product-stewards/newsstand/candidates/ai-work-logs-hidden-secrets-headline-reality-check-v4.md");
const run = file => spawnSync(process.execPath, [checker, file], { encoding: "utf8" });

const firstBad = run(firstKnownBad);
assert.notEqual(firstBad.status, 0, "first Ali-rejected article must fail unaided");
assert.match(firstBad.stderr, /headline does not correct/);
assert.match(firstBad.stderr, /standfirst does not repeat/);

const secondBad = run(secondKnownBad);
assert.notEqual(secondBad.status, 0, "second Ali-rejected article must fail unaided");
assert.match(secondBad.stderr, /missing exact-source section/);
assert.match(secondBad.stderr, /missing fair-summary section/);
assert.match(secondBad.stderr, /missing attack-action section/);
assert.match(secondBad.stderr, /missing can\/cannot boundary section/);
assert.match(secondBad.stderr, /missing unintended-contents section/);

const thirdBad = run(thirdKnownBad);
assert.notEqual(thirdBad.status, 0, "third Ali-rejected article must fail unaided");
assert.match(thirdBad.stderr, /does not link the encountered reporting/);
assert.match(thirdBad.stderr, /attack is not defined as a deliberate security test/);
assert.match(thirdBad.stderr, /reader spectrum does not include/);

const fourthBad = run(fourthKnownBad);
assert.notEqual(fourthBad.status, 0, "fourth Ali-rejected article must fail unaided");
assert.match(fourthBad.stderr, /specialist destination names appear without explaining/);
assert.match(fourthBad.stderr, /information-flow model is missing/);
assert.match(fourthBad.stderr, /reader spectrum does not include/);
assert.match(fourthBad.stderr, /every AI-made public item has this risk/);

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-reader-entry-"));
const goodPath = path.join(dir, "good.md");
fs.writeFileSync(goodPath, `# No, this paper did not find your private AI chats online

*It does not concern ordinary private chats. Developers and researchers deliberately posted saved records publicly so other people could inspect how their AI work happened.*

## What you may have seen

The August 12, 2026 [headline “Models' Reasoning Got Cracked”](https://www.theneurondaily.com/p/example) reported a privacy problem. Its underlying August 10, 2026 [research preprint](https://arxiv.org/abs/example) studied records developers and researchers had deliberately uploaded publicly so others could inspect or reproduce the work. It did not find that ordinary private chats had escaped onto the internet.

## What it was saying

The paper said some AI systems returned extra unreadable information alongside a visible answer. Researchers reported that another model could reveal parts of that extra information in records people had already published, including sensitive details not visible in the cleaned conversation.

## What actually happened

What you give the AI is a question or file. What the AI gives you is a visible answer. What some advanced tools create automatically is a job file recording instructions, replies, files opened and actions taken. What somebody later puts online may be that job file in a public project folder, or a research team may publish a collection of job files.

The files went to GitHub and Hugging Face, websites where people post computer projects and AI research so others can inspect or reproduce them. Posted publicly means people outside the owner's account or team could find and download them. The AI did not post them. A private workspace or file sent to one named person has a different audience.

## What was the “attack”?

An attack here was a deliberate security test. Researchers fed an unreadable bundle from a powerful model into a weaker sibling model, then used special instructions to bypass safeguards and reveal hidden contents. They tested records already uploaded to GitHub so others could inspect or reproduce the work. After disclosure, that exact decoding trick stopped revealing hidden contents.

## Where this meets the way you use AI

- Asking ChatGPT or Claude questions on a phone is not publication by this route.
- Pasting work text or uploading a document, image or spreadsheet gives the AI that material.
- Copying one selected paragraph sends that paragraph; a shared-chat link is a different sharing choice.
- An AI tool that can open files, run commands or work through a project may create a job file.
- Putting that job file on a public website is what the paper directly studied.

## What private information did they find?

The records contained API keys, passwords, access tokens and private keys. An API key is a password for software that may allow service use or charges. An access token is a temporary digital pass. A private key is secret proof used to unlock access or confirm identity. In one example, an AI asked to clean a software project repeated a key it was supposed to remove in unreadable carry-along data. The researchers could not determine the origin of every recovered item.

## The LAiDIES read

An AI-made paragraph or ordinary document does not automatically carry this risk. The narrower risk is a job file recording every step of certain advanced work.
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

console.log("NEWSSTAND READER ENTRY CALIBRATION PASS known_bad_rejected=4 good_fixture_accepted=1 delayed_fixture_rejected=1 quality_authority=none");
