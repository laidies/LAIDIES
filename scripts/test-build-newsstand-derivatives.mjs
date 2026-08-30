#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { buildDerivatives } from "./build-newsstand-derivatives.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const storyRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
const columns = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
const issues = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-daily-issues.json"), "utf8"));
const first = buildDerivatives({ storyRaw, columns, issues });
const second = buildDerivatives({ storyRaw, columns, issues });
assert.deepEqual(first, second, "same canonical inputs must produce byte-equivalent derivatives");
const context = { window: {} };
vm.runInNewContext(storyRaw, context);
const heldIds = new Set(context.window.NEWSSTAND_DATA.stories.filter((story) => story.status === "hold").map((story) => story.id));
assert.equal(first.feed.archive.some((item) => heldIds.has(item.id)), false, "held stories must not enter the feed");
assert.equal(first.archive.items.some((item) => item.kind === "story" && heldIds.has(item.id.replace(/^story:/, ""))), false,
  "held stories must not enter the archive");
const canonical=context.window.NEWSSTAND_DATA;
assert(first.feed.current.some((item) => item.id === canonical.publications.daily.issue.frontPaigeStoryId),
  "persistent Front PAiGE must remain current without becoming a new dated story");
assert.deepEqual(first.feed.current.filter(item=>item.edition==='weekly').map(item=>item.id),canonical.publications.weekly.status==='current'?[canonical.publications.weekly.storyId]:[], "current Weekly must match its canonical identity");
const held=JSON.parse(JSON.stringify(canonical)); held.publications.weekly.status='hold';
assert.equal(buildDerivatives({storyRaw:`window.NEWSSTAND_DATA=${JSON.stringify(held)};`,columns,issues}).feed.current.some(item=>item.edition==='weekly'),false,'explicitly held Weekly cannot be current');

const badIssues = structuredClone(issues);
badIssues.issues.push({ status: "complete", editionDate: canonical.publications.daily.editionDate, admission: { reviewedAt: canonical.lastCheckedAt }, serviceRecordIds: ["missing-record"] });
assert.throws(() => buildDerivatives({ storyRaw, columns, issues: badIssues }), /ineligible service record/,
  "known-bad unadmitted service reference must fail the derivative build");
console.log(`NEWSSTAND DERIVATIVE TEST PASS deterministic=1 held_feed=0 held_archive=0 front_paige_persistent=1 weekly_held=1 bad_service_rejected=1`);
