import assert from "node:assert/strict";
import { buildIntake, normalizeBackfillSince, parseAidbItems, parseFeedItems, selectDueSources, validateIntakeReceipt } from "./run-newsstand-cloud-intake.mjs";
import { buildClosureComment, buildIssueComment, extractSignalIds, extractSourceHealthMarkers, removeAlreadyReported, removeResolvedSignals, unresolvedSignalIds, unresolvedSourceHealthMarkers } from "./upsert-newsstand-intake-issue.mjs";

const registry = {
  sources: [
    { id: "SRC-AIDB", name: "AIDB", status: "ACTIVE_MONITOR", cadence: "TWICE_DAILY", authorityTier: "PRACTITIONER_LEAD", urls: ["https://aidb.test/agent.json"], destinations: ["news_daily"] },
    { id: "SRC-FEED", name: "Feed", status: "PILOT_MONITOR", cadence: "DAILY", authorityTier: "PRIMARY_AUTHORITY", urls: ["https://feed.test/rss"], destinations: ["news_daily", "straight_answers"] },
    { id: "SRC-REFERENCE", name: "Reference", status: "REFERENCE", cadence: "ANNUAL", authorityTier: "REFERENCE", urls: ["https://reference.test"], destinations: ["library"] }
  ]
};
const now = "2026-08-12T23:30:00.000Z";
const aidbBody = JSON.stringify({ editions: [{ date: "2026-08-12", type: "daily", title: "A useful signal", transcript: "https://aidb.test/e/2026-08-12/transcript.md" }] });
const feedBody = `<?xml version="1.0"?><rss><channel><item><title><![CDATA[Provider release note]]></title><link>https://feed.test/item-1</link><guid>item-1</guid><pubDate>Wed, 12 Aug 2026 20:00:00 GMT</pubDate><description>SECRET_SHOULD_NOT_ESCAPE</description></item><item><title>Old provider note</title><link>https://feed.test/item-old</link><guid>item-old</guid><pubDate>Sat, 01 Aug 2026 20:00:00 GMT</pubDate></item></channel></rss>`;

assert.equal(parseAidbItems(aidbBody).length, 1);
assert.equal(parseFeedItems(feedBody).length, 2);
assert.equal(selectDueSources(registry, null, now).length, 2, "reference sources must not enter recurring intake");

const fakeFetch = async (url) => {
  if (url.includes("aidb")) return new Response(aidbBody, { status: 200, headers: { "content-type": "application/json" } });
  return new Response(feedBody, { status: 200, headers: { "content-type": "application/rss+xml" } });
};
const first = await buildIntake({ registry, previousState: null, now, fetchImpl: fakeFetch });
assert.equal(first.receipt.counts.newSignals, 2);
assert.equal(first.receipt.publicationActionTaken, false);
assert.ok(!JSON.stringify(first.receipt).includes("SECRET_SHOULD_NOT_ESCAPE"), "raw source bodies must not escape intake");
assert.equal(validateIntakeReceipt(first.receipt).ok, true);
assert.equal(first.state.schemaVersion, "newsstand-cloud-intake-state-v2");
assert.equal(first.state.sources["SRC-AIDB"].emittedSignalIds.length, 1);

const repeat = await buildIntake({ registry, previousState: first.state, now: "2026-08-13T06:00:00.000Z", fetchImpl: fakeFetch });
assert.equal(repeat.receipt.counts.newSignals, 0, "seen items must deduplicate");

const legacyState = structuredClone(first.state);
legacyState.schemaVersion = "newsstand-cloud-intake-state-v1";
delete legacyState.sources["SRC-AIDB"].emittedSignalIds;
delete legacyState.sources["SRC-FEED"].emittedSignalIds;
const backfill = await buildIntake({
  registry,
  previousState: legacyState,
  now: "2026-08-13T06:00:00.000Z",
  fetchImpl: fakeFetch,
  backfillSince: "2026-08-11"
});
assert.equal(backfill.receipt.counts.newSignals, 1, "bounded backfill must recover the governed AIDB lead even when legacy state marked it observed");
assert.equal(backfill.receipt.newSignals[0].sourceId, "SRC-AIDB", "backfill must remain limited to AIDB/Mollick sources");
assert.ok(!backfill.receipt.newSignals.some(signal => signal.title === "Old provider note"), "AIDB/Mollick recovery must not widen another source's first-run window");
assert.equal(backfill.receipt.backfillSince, "2026-08-11T00:00:00.000Z");
assert.throws(() => normalizeBackfillSince("2026/08/11", now), /YYYY-MM-DD/);
assert.throws(() => normalizeBackfillSince("2026-07-01", now), /21 days/);
assert.throws(() => normalizeBackfillSince("2026-08-13", now), /future/);

const unavailable = await buildIntake({ registry, previousState: null, now, fetchImpl: async () => { throw new Error("simulated outage"); } });
assert.equal(unavailable.receipt.counts.unavailable, 2);
assert.equal(unavailable.receipt.counts.sourceHealthAlerts, 2);
assert.equal(unavailable.receipt.counts.newSignals, 0, "an outage must not fabricate content");
const repeatedOutage = await buildIntake({ registry, previousState: unavailable.state, now: "2026-08-13T23:30:00.000Z", fetchImpl: async () => { throw new Error("simulated outage"); } });
assert.equal(repeatedOutage.receipt.counts.unavailable, 2);
assert.equal(repeatedOutage.receipt.counts.sourceHealthAlerts, 0, "an unchanged outage must not spam the queue");

const mutated = structuredClone(first.receipt);
mutated.publicationActionTaken = true;
assert.equal(validateIntakeReceipt(mutated).ok, false, "validator must reject publication authority");
const badUrl = structuredClone(first.receipt);
badUrl.newSignals[0].url = "http://unsafe.test";
assert.equal(validateIntakeReceipt(badUrl).ok, false, "validator must reject non-HTTPS evidence");

const comment = buildIssueComment(first.receipt, "https://github.com/laidies/LAIDIES/actions/runs/1");
assert.match(comment, /Nothing was drafted, approved, published or deployed/);
assert.match(comment, /duplicate \/ quiet \/ watch \/ no-build/);
const alreadyReported = removeAlreadyReported(first.receipt, comment);
assert.equal(alreadyReported.counts.newSignals, 0, "cache loss must not duplicate a signal already recorded in the durable issue");
const partiallyReported = removeAlreadyReported(first.receipt, first.receipt.newSignals[0].signalId);
assert.equal(partiallyReported.counts.newSignals, 1, "an unseen signal must remain in the durable issue update");

const dispositionRegistry = {
  signals: [{ signalId: first.receipt.newSignals[0].signalId, disposition: "DUPLICATE", title: first.receipt.newSignals[0].title }],
  sourceHealth: [{ alertMarker: `${unavailable.receipt.sourceHealthAlerts[0].sourceId} — ${unavailable.receipt.sourceHealthAlerts[0].error}` }]
};
const afterDisposition = removeResolvedSignals(first.receipt, dispositionRegistry);
assert.equal(afterDisposition.counts.newSignals, 1, "only the exact dispositioned signal may be removed");
assert.deepEqual(extractSignalIds(comment), first.receipt.newSignals.map((signal) => signal.signalId), "issue parser must recover exact signal identities");
assert.deepEqual(unresolvedSignalIds(comment, first.receipt, dispositionRegistry), [first.receipt.newSignals[1].signalId].sort(), "durable dispositions must determine what remains unresolved");
const healthAfterDisposition = removeResolvedSignals(unavailable.receipt, dispositionRegistry);
assert.equal(healthAfterDisposition.counts.sourceHealthAlerts, 1, "an exact source-health disposition must not hide a different source failure");
const healthComment = buildIssueComment(unavailable.receipt, "https://github.com/laidies/LAIDIES/actions/runs/2");
assert.deepEqual(extractSourceHealthMarkers(healthComment), unavailable.receipt.sourceHealthAlerts.map((alert) => `${alert.sourceId} — ${alert.error}`));
assert.equal(unresolvedSourceHealthMarkers(healthComment, unavailable.receipt, dispositionRegistry).length, 1, "an issue with a different source failure must not close merely because it has no content signals");
const allHealthResolved = { ...dispositionRegistry, sourceHealth: unavailable.receipt.sourceHealthAlerts.map((alert) => ({ alertMarker: `${alert.sourceId} — ${alert.error}` })) };
assert.equal(unresolvedSourceHealthMarkers(healthComment, unavailable.receipt, allHealthResolved).length, 0, "exact durable source-health records may close their queue");
const closure = buildClosureComment(dispositionRegistry, "https://github.com/laidies/LAIDIES/blob/abc/registry.json");
assert.match(closure, /does not mean any story was drafted, approved, published or deployed/);

console.log("NEWSSTAND CLOUD INTAKE TEST PASS");
console.log("calibration=publication-authority,non-https-source,reference-recurring-intake,duplicate-item,raw-body-leak,outage-fabrication,repeated-outage-spam,unbounded-backfill,bad-backfill-date,duplicate-issue-record,undispositioned-signal,changed-source-health rejected");
