#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandDailyVisitorCopy } from "./check-newsstand-daily-visitor-copy.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(ROOT, "content/site/newsstand-catchup-v1.js"), "utf8");

assert.deepEqual(inspectNewsstandDailyVisitorCopy(source).errors, []);

const banned = [
  "empty space honest",
  "5 desks stayed quiet",
  "See the desk-by-desk record",
  "Filed in this edition",
  "All nine service desks were checked"
];
for (const phrase of banned) {
  assert.match(inspectNewsstandDailyVisitorCopy(`${source}\n/* ${phrase} */`).errors.join("\n"), /administrative copy remains/);
}

const missingSwitcher = source.replace('class="ns-daily-section-switcher"', 'class="removed-switcher"');
assert.match(inspectNewsstandDailyVisitorCopy(missingSwitcher).errors.join("\n"), /missing Daily section switcher/);

const missingTopic = source.replaceAll("data-daily-topic", "data-removed-topic");
assert.match(inspectNewsstandDailyVisitorCopy(missingTopic).errors.join("\n"), /missing topic continuation/);

const emptyDeskLeak = `${source}\nemptySecondaryDesks.map(deskMarkup);`;
assert.match(inspectNewsstandDailyVisitorCopy(emptyDeskLeak).errors.join("\n"), /empty service-desk records/);

console.log("NEWSSTAND DAILY VISITOR COPY CALIBRATION PASS: current source accepted; five known-bad phrases, missing navigation, missing topic continuation and empty-desk exposure rejected");
