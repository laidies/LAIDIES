import assert from "node:assert/strict";
import { buildIntake, parseAidbItems, parseFeedItems, selectDueSources, validateIntakeReceipt } from "./run-newsstand-cloud-intake.mjs";
import { buildIssueComment } from "./upsert-newsstand-intake-issue.mjs";

const registry = {
  sources: [
    { id: "SRC-AIDB", name: "AIDB", status: "ACTIVE_MONITOR", cadence: "TWICE_DAILY", authorityTier: "PRACTITIONER_LEAD", urls: ["https://aidb.test/agent.json"], destinations: ["news_daily"] },
    { id: "SRC-FEED", name: "Feed", status: "PILOT_MONITOR", cadence: "DAILY", authorityTier: "PRIMARY_AUTHORITY", urls: ["https://feed.test/rss"], destinations: ["news_daily", "straight_answers"] },
    { id: "SRC-REFERENCE", name: "Reference", status: "REFERENCE", cadence: "ANNUAL", authorityTier: "REFERENCE", urls: ["https://reference.test"], destinations: ["library"] }
  ]
};
const now = "2026-08-12T23:30:00.000Z";
const aidbBody = JSON.stringify({ editions: [{ date: "2026-08-12", type: "daily", title: "A useful signal", transcript: "https://aidb.test/e/2026-08-12/transcript.md" }] });
const feedBody = `<?xml version="1.0"?><rss><channel><item><title><![CDATA[Provider release note]]></title><link>https://feed.test/item-1</link><guid>item-1</guid><pubDate>Wed, 12 Aug 2026 20:00:00 GMT</pubDate><description>SECRET_SHOULD_NOT_ESCAPE</description></item></channel></rss>`;

assert.equal(parseAidbItems(aidbBody).length, 1);
assert.equal(parseFeedItems(feedBody).length, 1);
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

const repeat = await buildIntake({ registry, previousState: first.state, now: "2026-08-13T06:00:00.000Z", fetchImpl: fakeFetch });
assert.equal(repeat.receipt.counts.newSignals, 0, "seen items must deduplicate");

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

console.log("NEWSSTAND CLOUD INTAKE TEST PASS");
console.log("calibration=publication-authority,non-https-source,reference-recurring-intake,duplicate-item,raw-body-leak,outage-fabrication,repeated-outage-spam rejected");
