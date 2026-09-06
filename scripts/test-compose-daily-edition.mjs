#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { composeDailyEnvelope, validateDailyQuietCoverage } from "./compose-daily-edition.mjs";
import { migrateEnvelope } from "./migrate-daily-story-snapshots.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const date = "2026-08-04";
const radarPath = path.join(ROOT, `operations/agents/aidb-intelligence-desk/daily/${date}.md`);
const radarRaw = fs.readFileSync(radarPath, "utf8");
// Historical August 4 regression, independent of a later admitted Weekly.
const storiesRaw = fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8") + '\nwindow.NEWSSTAND_DATA.publications.weekly.status="quiet";\n';
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

const coverageRoot = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-quiet-coverage-")));
const coverageDate = "2026-09-05";
const put = (relative, value) => { const target = path.join(coverageRoot, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); };
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const rosterRelative = "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json";
const rosterRaw = fs.readFileSync(path.join(ROOT, rosterRelative), "utf8");
const roster = JSON.parse(rosterRaw); put(rosterRelative, rosterRaw);
put("content/newsstand-stories.js", fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8"));
const inventoryRelative = `operations/agents/aidb-intelligence-desk/daily/${coverageDate}-aidb-inventory.json`;
const cursorRelative = "operations/agents/aidb-intelligence-desk/edition-cursor.json";
const inventory = { schema: "aidb-edition-inventory.v2", editions: [], channelChecks: [
  { channel: "website", url: "https://aidailybrief.ai/", checkedAt: `${coverageDate}T18:00:00Z`, status: "CHECKED", releaseUrls: [] },
  { channel: "podcast", url: "https://podcasts.apple.com/us/podcast/the-ai-daily-brief/id1680633614", checkedAt: `${coverageDate}T18:00:00Z`, status: "CHECKED", releaseUrls: [] },
  { channel: "newsletter", url: "https://aidailybrief.beehiiv.com/", checkedAt: `${coverageDate}T18:00:00Z`, status: "CHECKED", releaseUrls: [] }
] };
const cursor = { schemaVersion: "aidb-edition-cursor-v1", processedEditions: [] };
const coverage = () => ({ schemaVersion: "newsstand-daily-coverage-v1", asOf: coverageDate,
  deskChecks: roster.newsstandCoverage.deskRoutes.map(route => ({ routeId: route.id, readAt: `${coverageDate}T18:00:00Z`, outcome: "NO_MATERIAL_CHANGE", assessmentSummary: "No new material appeared in this recorded source check.", dispositionRefs: [], unresolvedCandidateIds: [], sourceChecks: route.sourceIds.map(sourceId => ({ sourceId, url: roster.sources.find(source => source.id === sourceId).channelUrl, readAt: `${coverageDate}T18:00:00Z`, outcome: "NO_MATERIAL_CHANGE", assessmentSummary: "No new material appeared in this recorded source check.", dispositionRefs: [] })) })),
  aidb: { inventory: { path: inventoryRelative, sha256: sha(JSON.stringify(inventory)) }, cursor: { path: cursorRelative, sha256: sha(JSON.stringify(cursor)) } }
});
put(inventoryRelative, JSON.stringify(inventory)); put(cursorRelative, JSON.stringify(cursor));
const coverageRadar = value => `${coverageDate}\n- **NewsStand:** NO NEW HANDOFF.\n\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\`\n`;
const goodCoverage = coverage();
const coverageNow = `${coverageDate}T20:00:00Z`;
assert.equal(validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(goodCoverage), root: coverageRoot, now: coverageNow }).aidbStatus, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION", "complete dated receipt may authorize quiet");
const missingRoute = structuredClone(goodCoverage); missingRoute.deskChecks.pop();
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(missingRoute), root: coverageRoot, now: coverageNow }), /all six desk/, "missing desk cannot authorize quiet");
const unknownUrl = structuredClone(goodCoverage); unknownUrl.deskChecks[0].sourceChecks[0].url = "https://example.test/not-the-roster";
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(unknownUrl), root: coverageRoot, now: coverageNow }), /dated assessment/, "unknown source URL cannot authorize quiet");
const wrongDay = structuredClone(goodCoverage); wrongDay.deskChecks[0].sourceChecks[0].readAt = "2026-09-04T18:00:00Z";
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(wrongDay), root: coverageRoot, now: coverageNow }), /dated assessment/, "stale source assessment cannot authorize quiet");
const badBinding = structuredClone(goodCoverage); badBinding.aidb.cursor.sha256 = "0".repeat(64);
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(badBinding), root: coverageRoot, now: coverageNow }), /cursor bytes changed/, "tampered AIDB binding cannot authorize quiet");
const missingRelease = structuredClone(inventory); missingRelease.channelChecks[1].releaseUrls = ["https://aidailybrief.ai/e/unrecorded-release"]; put(inventoryRelative, JSON.stringify(missingRelease));
const missingReleaseCoverage = coverage(); missingReleaseCoverage.aidb.inventory.sha256 = sha(JSON.stringify(missingRelease));
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(missingReleaseCoverage), root: coverageRoot, now: coverageNow }), /HOLD_AIDB_SOURCE_COVERAGE/, "unreconciled AIDB release cannot authorize quiet");
const unavailable = structuredClone(inventory); unavailable.channelChecks[1].status = "UNAVAILABLE"; put(inventoryRelative, JSON.stringify(unavailable));
const unavailableCoverage = coverage(); unavailableCoverage.aidb.inventory.sha256 = sha(JSON.stringify(unavailable));
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(unavailableCoverage), root: coverageRoot, now: coverageNow }), /HOLD_AIDB_SOURCE_COVERAGE/, "unavailable AIDB channel cannot authorize quiet");
put(inventoryRelative, JSON.stringify(inventory));
const futureRead = structuredClone(goodCoverage); futureRead.deskChecks[0].sourceChecks[0].readAt = `${coverageDate}T21:00:00Z`;
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(futureRead), root: coverageRoot, now: coverageNow }), /dated assessment/, "future source read cannot authorize quiet");
const covered = structuredClone(goodCoverage); covered.deskChecks[0].outcome = "NO_UNCOVERED_MATERIAL_STORY"; covered.deskChecks[0].dispositionRefs = ["terminal:duplicate:existing-coverage"]; covered.deskChecks[0].sourceChecks[0].outcome = "NO_UNCOVERED_MATERIAL_STORY"; covered.deskChecks[0].sourceChecks[0].dispositionRefs = ["terminal:duplicate:existing-coverage"];
assert.equal(validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(covered), root: coverageRoot, now: coverageNow }).aidbStatus, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION", "already covered material may be truthfully quiet");
const invalidDisposition = structuredClone(covered); invalidDisposition.deskChecks[0].sourceChecks[0].dispositionRefs = [null];
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(invalidDisposition), root: coverageRoot, now: coverageNow }), /dated assessment/, "empty or nonstring disposition references cannot authorize quiet");
const missingPublishedStory = structuredClone(covered); missingPublishedStory.deskChecks[0].sourceChecks[0].dispositionRefs = ["story:made-up-id"];
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(missingPublishedStory), root: coverageRoot, now: coverageNow }), /dated assessment/, "missing published story cannot authorize quiet");
const expiredRoute = structuredClone(roster); expiredRoute.sources.find(source => source.id === expiredRoute.newsstandCoverage.deskRoutes[0].sourceIds[0]).expiresAt = "2026-09-04"; put(rosterRelative, JSON.stringify(expiredRoute));
assert.throws(() => validateDailyQuietCoverage({ date: coverageDate, radarRaw: coverageRadar(covered), root: coverageRoot, now: coverageNow }), /source routes failed/, "expired roster source cannot authorize quiet");
put(rosterRelative, rosterRaw);

const legacy = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-03.json"), "utf8"));
delete legacy.storySnapshots;
const migrated = migrateEnvelope({ envelope: legacy, storiesRaw });
assert.equal(migrated.storySnapshots.length, 1, "legacy admitted story must gain one complete snapshot");
assert.equal(migrated.storySnapshots[0].headline, "Europe’s AI transparency rules started August 2. Here’s when you should expect a label.");
const missingStory = structuredClone(legacy);
missingStory.storyIds = ["missing-story"];
assert.throws(() => migrateEnvelope({ envelope: missingStory, storiesRaw }), /not an admitted same-date Daily source record/, "snapshot migration must fail closed on an unbound story ID");

console.log(`DAILY EDITION PRIVATE COMPOSER TEST PASS deterministic=1 prior_date_not_carried=1 arbitrary_radar_rejected=1 incidental_phrase_rejected=1 mixed_disposition_rejected=1 duplicate_rejected=1 quiet_conflict_rejected=1 quiet_coverage=pass missing_route=blocked unknown_url=blocked wrong_day=blocked tampered_binding=blocked missing_release=blocked unavailable_channel=blocked legacy_snapshot_migrated=1 unbound_snapshot_rejected=1 sha256=${first.sha256}`);
