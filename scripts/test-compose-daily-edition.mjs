#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { composeDailyEnvelope } from "./compose-daily-edition.mjs";
import { migrateEnvelope } from "./migrate-daily-story-snapshots.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-08-04";
const radarPath = path.join(ROOT, `operations/agents/aidb-intelligence-desk/daily/${date}.md`);
const radarRaw = fs.readFileSync(radarPath, "utf8");
const storiesRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8");
const columnsRaw = fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8");

const first = composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw });
const second = composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw });
assert.equal(first.canonical, second.canonical, "same inputs must compose byte-identically");
assert.equal(first.envelope.disposition, "QUIET", "August 4 radar must create an honest quiet draft");
assert.deepEqual(first.envelope.storyIds, [], "August 3 stories must not roll into August 4");
assert.deepEqual(first.envelope.storySnapshots, [], "quiet issue must contain no story snapshots");
assert.equal(first.envelope.desks.length, 9, "all governed Daily desks must exist");
assert.equal(first.envelope.desks.filter((desk) => desk.state === "ready").length, 0, "August 3 service rows must not roll into August 4");
assert.equal(first.envelope.canonicalWrite, false);
assert.equal(first.envelope.deployActionTaken, false);

assert.throws(() => composeDailyEnvelope({
  date,
  radarRaw: `${date}\nno new owner handoff\n`,
  radarPath: path.join(ROOT, `operations/not-the-aidb-radar/${date}.md`),
  storiesRaw,
  columnsRaw
}), /exact dated AIDB or NewsStand editorial-intake record/, "arbitrary operations paths must not authorize a quiet issue");
assert.throws(() => composeDailyEnvelope({
  date,
  radarRaw: `${date}\nno new owner handoff\n`,
  radarPath,
  storiesRaw,
  columnsRaw
}), /structured NewsStand disposition/, "an incidental quiet phrase must not authorize a quiet issue");
assert.throws(() => composeDailyEnvelope({
  date,
  radarRaw: `${date}\n- **NewsStand:** NO NEW HANDOFF.\n- **NewsStand:** REVIEW CANDIDATE xyz\n`,
  radarPath,
  storiesRaw,
  columnsRaw
}), /conflicting NewsStand dispositions/, "a quiet row cannot coexist with a candidate row");

const duplicateColumns = JSON.parse(columnsRaw);
const duplicate = structuredClone(duplicateColumns.records[0]);
duplicate.editionDate = date;
duplicate.id = "DUPLICATE-A";
const secondDuplicate = structuredClone(duplicate);
secondDuplicate.id = "DUPLICATE-B";
duplicateColumns.records.push(duplicate, secondDuplicate);
assert.throws(() => composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw, columnsRaw: JSON.stringify(duplicateColumns) }), /duplicate desk/, "duplicate same-date desk must fail");

const conflictingStories = storiesRaw.replaceAll('"publishedAt": "2026-08-03T22:00:00Z"', '"publishedAt": "2026-08-04T22:00:00Z"');
assert.throws(() => composeDailyEnvelope({ date, radarRaw, radarPath, storiesRaw: conflictingStories, columnsRaw }), /quiet editorial disposition conflicts/, "quiet disposition cannot hide a same-date published story");

const legacy = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-03.json"), "utf8"));
delete legacy.storySnapshots;
const migrated = migrateEnvelope({ envelope: legacy, storiesRaw });
assert.equal(migrated.storySnapshots.length, 1, "legacy admitted story must gain one complete snapshot");
assert.equal(migrated.storySnapshots[0].headline, "Europe’s AI transparency rules started August 2. Here’s when you should expect a label.");
const missingStory = structuredClone(legacy);
missingStory.storyIds = ["missing-story"];
assert.throws(() => migrateEnvelope({ envelope: missingStory, storiesRaw }), /not an admitted same-date Daily source record/, "snapshot migration must fail closed on an unbound story ID");

console.log(`DAILY EDITION PRIVATE COMPOSER TEST PASS deterministic=1 prior_date_not_carried=1 arbitrary_radar_rejected=1 incidental_phrase_rejected=1 mixed_disposition_rejected=1 duplicate_rejected=1 quiet_conflict_rejected=1 legacy_snapshot_migrated=1 unbound_snapshot_rejected=1 sha256=${first.sha256}`);
