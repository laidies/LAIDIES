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
for (const [publishedAt, editionDate] of [['2026-09-06T01:00:00Z','2026-09-05'],['2027-01-01T01:00:00Z','2026-12-31'],['2027-01-01','2027-01-01']]) {
  const fixture=structuredClone(canonical);
  const story=fixture.stories.find(item=>item.status==='published'&&item.edition==='daily');
  story.publishedAt=publishedAt;
  const result=buildDerivatives({storyRaw:`window.NEWSSTAND_DATA=${JSON.stringify(fixture)};`,columns,issues});
  assert.equal(result.archive.items.find(item=>item.id===`story:${story.id}`).editionDate,editionDate,'archive date must use the Vancouver edition day, preserving literal dates');
  assert.equal(result.feed.archive.find(item=>item.id===story.id).publishedAt,publishedAt,'date-key repair must not rewrite the reported publication instant');
}
for (const invalid of ['2026-02-30', '2026-02-29', '2026-13-01']) {
  const fixture=structuredClone(canonical);
  fixture.stories.find(item=>item.status==='published'&&item.edition==='daily').publishedAt=invalid;
  assert.throws(()=>buildDerivatives({storyRaw:`window.NEWSSTAND_DATA=${JSON.stringify(fixture)};`,columns,issues}),/invalid publication date/,'impossible calendar dates must stop the derivative build');
}
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
