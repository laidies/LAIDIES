#!/usr/bin/env node
import assert from "node:assert/strict";
import { selectAidbEdition } from "./select-aidb-edition.mjs";

const sha = n => String(n).padStart(64, "a").slice(-64);
const item = (editionDate, n, extra = {}) => ({ editionDate, url: `https://aidailybrief.ai/e/${editionDate}`, transcriptSha256: sha(n), itemCount: n, complete: true, ...extra });
const cursor = (...items) => ({ processedEditions: items.map(({ editionDate, url, transcriptSha256, itemCount }) => ({ editionDate, url, transcriptSha256, itemCount, processedAt: "2026-09-04T14:00:00Z" })) });

const inventory = (editions, asOf = "2026-09-04") => ({
  schema: "aidb-edition-inventory.v2", editions,
  channelChecks: [
    { channel: "website", url: "https://www.aidailybrief.ai/", checkedAt: `${asOf}T14:00:00Z`, status: "CHECKED", releaseUrls: editions.map(row => row.url) },
    { channel: "podcast", url: "https://podcasts.apple.com/us/podcast/the-ai-daily-brief/id1680633614", checkedAt: `${asOf}T14:00:00Z`, status: "CHECKED", releaseUrls: editions.map(row => row.url) }
  ]
});
const select = (data, reviewed = cursor(), date = "2026-09-04") => selectAidbEdition(data, reviewed, date);
let cases = 0;
const check = (name, run) => { run(); cases++; };

check("late previous day and weekend/backfill remain actionable", () => {
  assert.equal(select([item("2026-09-03", 3)]).status, "PROCESS_NEW_COMPLETE_EDITION");
  assert.equal(select([item("2026-09-02", 2)]).edition.editionDate, "2026-09-02");
  assert.equal(select([item("2026-09-01", 1), item("2026-09-03", 3)], cursor(item("2026-09-03", 3))).edition.editionDate, "2026-09-01");
});
check("changed transcript or item count reopens reviewed edition", () => {
  for (const changed of [item("2026-09-03", 4), item("2026-09-03", 3, { itemCount: 4 })]) assert.equal(select(inventory([changed]), cursor(item("2026-09-03", 3))).status, "RECHECK_CHANGED_TRANSCRIPT");
});
check("unchanged duplicate is quiet after both channel checks", () => {
  const result = select(inventory([item("2026-09-03", 3)]), cursor(item("2026-09-03", 3)));
  assert.equal(result.status, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION");
  assert.equal(result.quietAllowed, true);
});
check("released incomplete episode cannot disappear into quiet", () => {
  const result = select([item("2026-09-05", 5), item("2026-09-03", 3, { complete: false })]);
  assert.equal(result.status, "HOLD_AIDB_RELEASE_REVIEW");
  assert.equal(result.edition, null);
  assert.equal(result.quietAllowed, false);
  assert.deepEqual(result.pendingEditions.map(row => row.editionDate), ["2026-09-03"]);
});
const podcastRelease = {
  editionDate: "2026-09-04", title: "How AI Changed This Summer",
  url: "https://podcasts.apple.com/us/podcast/how-ai-changed-this-summer/id1680633614?i=1000787915312",
  publishedAt: "2026-09-04T20:03:00Z", complete: false,
  pendingReason: "Release metadata inspected; full episode not reviewed."
};
check("September 5 podcast/website discrepancy remains pending", () => {
  const data = inventory([podcastRelease, item("2026-09-03", 3)], "2026-09-05");
  const before = JSON.stringify(data);
  const result = select(data, cursor(item("2026-09-03", 3)), "2026-09-05");
  assert.equal(result.status, "HOLD_AIDB_RELEASE_REVIEW");
  assert.equal(result.pendingEditions[0].url, podcastRelease.url);
  assert.equal(result.quietAllowed, false);
  assert.equal(JSON.stringify(data), before, "selection is read-only");
});
check("pending release does not starve older complete unprocessed work", () => {
  const result = select(inventory([podcastRelease, item("2026-09-03", 3)]));
  assert.equal(result.status, "PROCESS_NEW_COMPLETE_EDITION");
  assert.equal(result.edition.editionDate, "2026-09-03");
  assert.equal(result.pendingEditions.length, 1);
});
check("future releases are not actionable", () => {
  const result = select(inventory([item("2026-09-05", 5), item("2026-09-06", 6, { complete: false })]));
  assert.equal(result.status, "QUIET_NO_NEW_COMPLETE_AIDB_EDITION");
  assert.deepEqual(result.pendingEditions, []);
});
check("legacy site-only inventory cannot certify quiet", () => {
  const result = select([item("2026-09-03", 3)], cursor(item("2026-09-03", 3)));
  assert.equal(result.status, "HOLD_AIDB_SOURCE_COVERAGE");
  assert.equal(result.quietAllowed, false);
});
check("observed podcast release missing from inventory is a coverage gap", () => {
  const data = inventory([item("2026-09-03", 3)]);
  data.channelChecks[1].releaseUrls.push(podcastRelease.url);
  const result = select(data, cursor(item("2026-09-03", 3)));
  assert.equal(result.status, "HOLD_AIDB_SOURCE_COVERAGE");
  assert.ok(result.coverageGaps.some(gap => gap.includes(podcastRelease.url)));
});
check("missing/unavailable channel cannot certify quiet or suppress useful work", () => {
  for (const change of [data => data.channelChecks.pop(), data => { data.channelChecks[1].status = "UNAVAILABLE"; }]) {
    const data = inventory([item("2026-09-03", 3)]); change(data);
    assert.equal(select(data, cursor(item("2026-09-03", 3))).status, "HOLD_AIDB_SOURCE_COVERAGE");
    const result = select(data);
    assert.equal(result.status, "PROCESS_NEW_COMPLETE_EDITION");
    assert.ok(result.coverageGaps.length);
  }
});
check("Vancouver date handles UTC boundary and rejects stale checks", () => {
  const data = inventory([]);
  for (const row of data.channelChecks) row.checkedAt = "2026-09-05T03:00:00Z"; // Sept 4, 20:00 Vancouver
  assert.equal(select(data).quietAllowed, true);
  for (const row of data.channelChecks) row.checkedAt = "2026-09-04T03:00:00Z";
  assert.equal(select(data).status, "HOLD_AIDB_SOURCE_COVERAGE");
});
check("cross-channel aliases require identity evidence and one episode record", () => {
  const edition = item("2026-09-03", 3, { alsoPublishedAt: ["https://example.test/podcast/loops"], identityEvidenceUrl: "https://aidailybrief.ai/e/2026-09-03" });
  const data = inventory([edition]); data.channelChecks[1].releaseUrls = edition.alsoPublishedAt;
  assert.equal(select(data, cursor(edition)).quietAllowed, true);
  assert.throws(() => select([edition, { ...edition }]), /duplicate edition URL/);
  delete edition.identityEvidenceUrl;
  assert.throws(() => select(data), /identityEvidenceUrl/);
});
check("malformed completeness cannot be filtered into quiet", () => {
  for (const extra of [{ complete: "true" }, { transcriptSha256: "missing" }, { itemCount: 0 }, { url: "not a URL" }, { editionDate: "2026-02-30" }]) assert.throws(() => select([item("2026-09-03", 3, extra)]));
  assert.throws(() => select([], cursor(), "2026-02-30"), /asOf/);
});
console.log(`AIDB EDITION SELECTOR PASS ${cases} cases; released-podcast, missing-channel, omitted-release and legacy-quiet calibrations included`);
