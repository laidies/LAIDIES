import assert from "node:assert/strict";
import { buildPrivateDailyPlan, extractCanonicalCoverage, validatePrivateDailyPlan } from "./plan-newsstand-hosted-cycle.mjs";

const now = "2026-09-26T20:00:00.000Z";
const registry = { sources: [
  { id: "SRC-MAJOR", name: "Major primary", authorityTier: "PRIMARY_AUTHORITY", status: "ACTIVE_MONITOR", editorialPriority: 80 },
  { id: "SRC-UNRANKED", name: "Unranked lead", authorityTier: "SECONDARY_SCOUT", status: "ACTIVE_MONITOR" },
  { id: "SRC-OFFLINE", name: "Offline source", authorityTier: "INDEPENDENT_REPORTING", status: "ACTIVE_MONITOR", priority: 90 }
] };
const storiesRaw = `window.NEWSSTAND_STORIES = [{ id: "already-covered", sources: [{ url: "https://source.test/covered?tracking=1" }] }];`;
const signal = (overrides = {}) => ({
  signalId: "NSCI-11111111111111111111", sourceId: "SRC-MAJOR", sourceName: "Major primary", title: "A discovery title", url: "https://source.test/new", publishedAt: "2026-09-26T12:00:00.000Z", observedAt: "2026-09-26T19:00:00.000Z", sourceAuthorityTier: "PRIMARY_AUTHORITY", destinations: ["news_daily"], disposition: "UNRECONCILED_PRIVATE_SIGNAL", evidenceBoundary: "Discovery lead only.", ...overrides
});
const registryHash = (await import("node:crypto")).createHash("sha256").update(JSON.stringify(registry)).digest("hex");
const receipt = (signals, unavailableSources = []) => ({
  schemaVersion: "newsstand-cloud-intake-v1", mode: "PRIVATE_SIGNAL_INTAKE_ONLY", generatedAt: "2026-09-26T19:00:00.000Z", backfillSince: null,
  sourceRegistry: { path: "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json", sha256: registryHash },
  counts: { due: 3, healthy: 3 - unavailableSources.length, unavailable: unavailableSources.length, sourceHealthAlerts: unavailableSources.length, newSignals: signals.length },
  newSignals: signals, unavailableSources, sourceHealthAlerts: unavailableSources,
  publicationActionTaken: false, canonicalWrite: false, deploymentActionTaken: false
});

const coverage = extractCanonicalCoverage(storiesRaw);
assert.deepEqual(coverage.storyIds, ["already-covered"]);
assert.deepEqual(coverage.sourceUrls, ["https://source.test/covered"]);

const plan = buildPrivateDailyPlan({ receipt: receipt([signal(), signal({ signalId: "NSCI-22222222222222222222", sourceId: "SRC-UNRANKED", url: "https://source.test/unranked" })]), registry, storiesRaw, now });
assert.equal(plan.outcome, "RESEARCH_OR_SEMANTICS_REVIEW_REQUIRED");
assert.equal(plan.candidates.length, 2);
assert.equal(plan.candidates[0].ranking.status, "METADATA_RANKED", "existing priority metadata may order research work only");
assert.equal(plan.candidates[0].disposition, "RESEARCH_REQUIRED");
assert.equal(plan.candidates[1].ranking.status, "UNRANKED_NO_EXISTING_EDITORIAL_PRIORITY");
assert.equal(plan.candidates[1].disposition, "REQUIRES_SEMANTICS_REVIEW", "unranked discovery cannot be treated as significant");
assert.ok(plan.candidates.every((candidate) => candidate.sourceGaps.length >= 3));
assert.equal(validatePrivateDailyPlan(plan).ok, true);

const duplicateUrl = buildPrivateDailyPlan({ receipt: receipt([signal({ url: "https://source.test/covered#fragment" })]), registry, storiesRaw, now });
assert.equal(duplicateUrl.candidates.length, 0);
assert.equal(duplicateUrl.rejected[0].disposition, "DUPLICATE_COVERED_SOURCE_URL");

const duplicateStory = buildPrivateDailyPlan({ receipt: receipt([signal({ relatedStoryIds: ["already-covered"] })]), registry, storiesRaw, now });
assert.equal(duplicateStory.candidates.length, 0);
assert.equal(duplicateStory.rejected[0].disposition, "DUPLICATE_COVERED_STORY_ID");

const stale = buildPrivateDailyPlan({ receipt: receipt([signal({ publishedAt: "2026-09-10T12:00:00.000Z" })]), registry, storiesRaw, now });
assert.equal(stale.candidates.length, 0);
assert.equal(stale.rejected[0].disposition, "REJECTED_STALE_OR_INVALID_EVIDENCE");

const unavailable = buildPrivateDailyPlan({ receipt: receipt([], [{ sourceId: "SRC-OFFLINE", url: "https://offline.test/", checkedAt: "2026-09-26T19:00:00.000Z", error: "HTTP 503" }]), registry, storiesRaw, now });
assert.equal(unavailable.outcome, "NOT_QUIET_SOURCE_UNAVAILABLE", "unread/unavailable sources must prevent a quiet result");
assert.equal(unavailable.sourceGaps.length, 1);
assert.equal(validatePrivateDailyPlan(unavailable).ok, true);

const registryDrift = structuredClone(receipt([signal()]));
registryDrift.sourceRegistry.sha256 = "0".repeat(64);
assert.throws(() => buildPrivateDailyPlan({ receipt: registryDrift, registry, storiesRaw, now }), /registry bytes/, "receipt must bind the actual source registry");

const invalid = structuredClone(plan);
invalid.candidates[1].disposition = "RESEARCH_REQUIRED";
assert.equal(validatePrivateDailyPlan(invalid).ok, false, "unranked candidates must retain semantic-review disposition");
console.log("NEWSSTAND HOSTED CYCLE PLAN TEST PASS");
console.log("calibration=covered-url,covered-story-id,stale-evidence,unavailable-source,missing-priority,invalid-unranked-disposition,registry-drift rejected");
