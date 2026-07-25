#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const homepage = read("content/site/homepage.js");
const homepageMarkup = read("index.html");
const centre = read("visitors-centre.html");

assert.match(homepage, /if \(!r\.ok\) throw new Error\('Episode index unavailable/);
assert.match(homepage, /function showEvergreenFallback\(\)/);
assert.match(homepage, /label\.textContent = 'Previously published';/);
assert.match(homepageMarkup, /Previously published/);
assert.doesNotMatch(homepageMarkup, /The Founding Mothers<em>This week<\/em>/);

assert.match(centre, /id="vc-directory-fallback" hidden/);
assert.match(centre, /directory\.disabled = true;/);
assert.match(centre, /LAiDIES homepage/);
assert.match(centre, /event\.key === "Escape" && card\.classList\.contains\("is-open"\)/);
assert.match(centre, /initiatingControl\.focus\(\);/);
assert.match(centre, /openCard\(building, spot\)/);
assert.match(centre, /openCard\(selected, directory\)/);
assert.match(centre, /Share handoff returned to this page\. Delivery is not confirmed here\./);
assert.doesNotMatch(centre, /Sent from the Visitor's Centre\./);
assert.doesNotMatch(centre, /unlock the member route/);
assert.doesNotMatch(centre, /Get the Wednesday release delivered/);

console.log("PASS entry recovery and truth guardrails");
