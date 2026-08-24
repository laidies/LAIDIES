#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const homepage = process.env.HOMEPAGE_SCRIPT_PATH
  ? fs.readFileSync(path.resolve(process.env.HOMEPAGE_SCRIPT_PATH), "utf8")
  : read("content/site/homepage.js");
const homepageMarkup = read("index.html");
const centre = read("visitors-centre.html");
const homepageAudioOwner = process.env.CALIBRATE_HOMEPAGE_AUDIO_OWNER_FAILURE === "1"
  ? `${homepage}\ndocument.createElement('audio');`
  : homepage;

assert.match(homepage, /if \(!response\.ok\) throw new Error\('Episode index unavailable/);
assert.match(homepage, /Keep the last known published route already present in the HTML/);
assert.match(homepage, /label\.textContent = 'Previously published';/);
assert.match(homepageMarkup, /Previously published/);
assert.doesNotMatch(homepageMarkup, /The Founding Mothers<em>This week<\/em>/);
assert.doesNotMatch(
  homepageAudioOwner,
  /(?:document\.)?createElement\(["']audio["']\)|\bnew\s+Audio\s*\(|KSVL_playTrack/,
  "Homepage must not create or invoke a competing audio owner"
);
assert.equal(
  [...homepageMarkup.matchAll(/<a class="[^"]*\bplay-chip\b[^"]*" href="\/radio\.html"/g)].length,
  3,
  "Homepage KSVL actions must remain three ordinary links to the station"
);
assert.match(homepageMarkup, /homepage\.js\?v=20260823-ksvl-owner-1/);

assert.match(centre, /id="vc-directory-fallback" class="vc-directory-fallback"/);
assert.match(centre, /directory\.disabled = true;/);
assert.match(centre, /The named directory below still works\./);
assert.match(centre, /event\.key === "Escape" && card\.classList\.contains\("is-open"\)/);
assert.match(centre, /initiatingControl\.focus\(\);/);
assert.match(centre, /openCard\(building, spot\)/);
assert.match(centre, /openCard\(selected, directory\)/);
assert.match(centre, /This desk does not prepare, share, send, deliver, join or award anything\./);
assert.match(centre, /A selection or route opening proves navigation only\./);
assert.doesNotMatch(centre, /Sent from the Visitor's Centre\./);
assert.doesNotMatch(centre, /unlock the member route/);
assert.doesNotMatch(centre, /Get the Wednesday release delivered/);

console.log("PASS entry recovery and truth guardrails");
