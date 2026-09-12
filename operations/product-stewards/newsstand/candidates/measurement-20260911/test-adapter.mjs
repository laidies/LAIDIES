import assert from "node:assert/strict";
import { createNewsStandMeasurementAdapter } from "./adapter.mjs";

const sent = [];
const adapter = createNewsStandMeasurementAdapter({
  enabled: true,
  transport: async payload => { sent.push(payload); }
});
const paperTransition = adapter.beginTransition("paper_opened");
assert.deepEqual(await adapter.record({ action: "paper_opened", outcome: "available", transition: paperTransition }), { status: "transport_completed" });
assert.equal(sent.length, 1);
assert.deepEqual(sent[0], {
  name: "NewsStand action",
  url: "https://laidies.ai/newsstand",
  domain: "laidies.ai",
  props: { schema: "ns-v1", action: "paper_opened", outcome: "available" }
});
assert.equal(Object.hasOwn(sent[0], "referrer"), false);
assert.equal(Object.hasOwn(sent[0].props, "transition"), false);
assert.deepEqual(await adapter.record({ action: "paper_opened", outcome: "available", transition: paperTransition }), { status: "deduped" });
assert.deepEqual(await adapter.record({ action: "source_opened", outcome: "activated" }), { status: "transport_completed" });
assert.equal(sent.length, 2);

const disabled = createNewsStandMeasurementAdapter();
assert.deepEqual(await disabled.record({ action: "search_completed", outcome: "results", trigger: "explicit_submission" }), { status: "disabled" });
const privacySuppressed = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => assert.fail("must not send"), privacy: { globalPrivacyControl: true } });
assert.deepEqual(await privacySuppressed.record({ action: "search_completed", outcome: "no_results", trigger: "explicit_submission" }), { status: "suppressed_privacy" });
const dntSuppressed = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => assert.fail("must not send"), privacy: { doNotTrack: true } });
assert.deepEqual(await dntSuppressed.record({ action: "search_completed", outcome: "unavailable", trigger: "explicit_submission" }), { status: "suppressed_privacy" });
const blocked = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => { throw new Error("blocked"); } });
assert.deepEqual(await blocked.record({ action: "learning_opened", outcome: "activated" }), { status: "provider_error" });
let retryAttempts = 0;
const retryable = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => { retryAttempts += 1; if (retryAttempts === 1) throw new Error("temporary"); } });
const retryToken = retryable.beginTransition("paper_opened");
assert.deepEqual(await retryable.record({ action: "paper_opened", outcome: "available", transition: retryToken }), { status: "provider_error" });
assert.deepEqual(await retryable.record({ action: "paper_opened", outcome: "available", transition: retryToken }), { status: "transport_completed" });

let releaseTransport;
let concurrentTransportCalls = 0;
const concurrent = createNewsStandMeasurementAdapter({ enabled: true, transport: () => new Promise(resolve => { concurrentTransportCalls += 1; releaseTransport = resolve; }) });
const concurrentToken = concurrent.beginTransition("story_opened");
const first = concurrent.record({ action: "story_opened", outcome: "available", transition: concurrentToken });
assert.deepEqual(await concurrent.record({ action: "story_opened", outcome: "available", transition: concurrentToken }), { status: "deduped" });
assert.equal(concurrentTransportCalls, 1);
releaseTransport();
assert.deepEqual(await first, { status: "transport_completed" });
const stale = concurrentToken;
let current;
for (let index = 0; index < 100; index += 1) current = concurrent.beginTransition("paper_opened");
await assert.rejects(concurrent.record({ action: "story_opened", outcome: "available", transition: stale }), /transition is stale/);
const finalSend = concurrent.record({ action: "paper_opened", outcome: "available", transition: current });
assert.equal(concurrentTransportCalls, 2);
releaseTransport();
assert.deepEqual(await finalSend, { status: "transport_completed" });
assert.deepEqual(await adapter.record({ action: "search_completed", outcome: "results", trigger: "history_restoration" }), { status: "suppressed_restoration" });

for (const event of [
  { action: "source_opened", outcome: "activated", props: { query: "private" } },
  { action: "source_opened", outcome: "activated", url: "https://example.test/private" },
  { action: "search_completed", outcome: "activated", trigger: "explicit_submission" },
  { action: "search_completed", outcome: "results" },
  { action: "search_completed", outcome: "results", trigger: "keystroke" },
  { action: "unknown", outcome: "available" },
  { action: "story_opened", outcome: "available" },
  { action: "source_opened", outcome: "activated", transition: "restored-history" }
]) {
  await assert.rejects(adapter.record(event), /NewsStand measurement rejected/);
}
assert.throws(() => createNewsStandMeasurementAdapter({ privacy: { doNotTrack: "0" } }), /doNotTrack must be boolean/);

console.log("PASS measurement adapter: payload boundary, privacy suppression, bounded in-flight dedupe, restoration suppression, provider failure, and adversarial rejections");
