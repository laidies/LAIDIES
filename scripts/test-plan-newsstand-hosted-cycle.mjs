import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { buildPrivateDailyPlan, extractCanonicalCoverage, validatePrivateDailyPlan } from "./plan-newsstand-hosted-cycle.mjs";

const now = "2026-09-26T20:00:00.000Z";
const realCanonicalPath = "/private/tmp/newsstand-mai-writer-runtime-v1/content/newsstand-stories.js";
assert.ok(fs.existsSync(realCanonicalPath), "real modern canonical fixture must be available for this contract test");
const realCanonical = fs.readFileSync(realCanonicalPath, "utf8");
const realCoverage = extractCanonicalCoverage(realCanonical);
const realStoryId = "front-paige-accountable-systems-2026-08-24";
const realSourceUrl = "https://news.linkedin.com/2026/new-linkedin-research-finds-women-account-for-just-26-percent-of-ai-hires-as-ai-jobs-surge";
assert.ok(realCoverage.storyIds.includes(realStoryId), "quoted-key canonical story ID must be extracted");
assert.ok(realCoverage.sourceUrls.includes(realSourceUrl), "quoted-key canonical source URL must be extracted");

const registry = { sources: [
  { id: "SRC-MAJOR", name: "Major primary", authorityTier: "PRIMARY_AUTHORITY", status: "ACTIVE_MONITOR", editorialPriority: 80 },
  { id: "SRC-UNRANKED", name: "Unranked lead", authorityTier: "SECONDARY_SCOUT", status: "ACTIVE_MONITOR" },
  { id: "SRC-OFFLINE", name: "Offline source", authorityTier: "INDEPENDENT_REPORTING", status: "ACTIVE_MONITOR", priority: 90 }
] };
const registryHash = crypto.createHash("sha256").update(JSON.stringify(registry)).digest("hex");
const signal = (overrides = {}) => ({ signalId: "NSCI-11111111111111111111", sourceId: "SRC-MAJOR", sourceName: "Major primary", title: "A discovery title", url: "https://source.test/new", publishedAt: "2026-09-26T12:00:00.000Z", observedAt: "2026-09-26T19:00:00.000Z", sourceAuthorityTier: "PRIMARY_AUTHORITY", destinations: ["news_daily"], disposition: "UNRECONCILED_PRIVATE_SIGNAL", evidenceBoundary: "Discovery lead only.", ...overrides });
const receipt = (signals, unavailableSources = []) => ({ schemaVersion: "newsstand-cloud-intake-v1", mode: "PRIVATE_SIGNAL_INTAKE_ONLY", generatedAt: "2026-09-26T19:00:00.000Z", backfillSince: null, sourceRegistry: { path: "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json", sha256: registryHash }, counts: { due: 3, healthy: 3 - unavailableSources.length, unavailable: unavailableSources.length, sourceHealthAlerts: unavailableSources.length, newSignals: signals.length }, newSignals: signals, unavailableSources, sourceHealthAlerts: unavailableSources, publicationActionTaken: false, canonicalWrite: false, deploymentActionTaken: false });

const plan = buildPrivateDailyPlan({ receipt: receipt([signal(), signal({ signalId: "NSCI-22222222222222222222", sourceId: "SRC-UNRANKED", url: "https://source.test/unranked" })]), registry, storiesRaw: realCanonical, now });
assert.equal(plan.outcome, "RESEARCH_OR_SEMANTICS_REVIEW_REQUIRED");
assert.equal(plan.candidates[0].disposition, "RESEARCH_REQUIRED");
assert.equal(plan.candidates[1].disposition, "REQUIRES_SEMANTICS_REVIEW");
assert.equal(validatePrivateDailyPlan(plan).ok, true);

const duplicateUrl = buildPrivateDailyPlan({ receipt: receipt([signal({ url: `${realSourceUrl}?tracking=1` })]), registry, storiesRaw: realCanonical, now });
assert.equal(duplicateUrl.rejected[0].disposition, "DUPLICATE_COVERED_SOURCE_URL", "real quoted-key source URL must dedupe");
const duplicateStory = buildPrivateDailyPlan({ receipt: receipt([signal({ relatedStoryIds: [realStoryId] })]), registry, storiesRaw: realCanonical, now });
assert.equal(duplicateStory.rejected[0].disposition, "DUPLICATE_COVERED_STORY_ID", "real quoted-key story ID must dedupe");
const stale = buildPrivateDailyPlan({ receipt: receipt([signal({ publishedAt: "2026-09-10T12:00:00.000Z" })]), registry, storiesRaw: realCanonical, now });
assert.equal(stale.rejected[0].disposition, "REJECTED_STALE_OR_INVALID_EVIDENCE");
const unavailable = buildPrivateDailyPlan({ receipt: receipt([], [{ sourceId: "SRC-OFFLINE", url: "https://offline.test/", checkedAt: "2026-09-26T19:00:00.000Z", error: "HTTP 503" }]), registry, storiesRaw: realCanonical, now });
assert.equal(unavailable.outcome, "NOT_QUIET_SOURCE_UNAVAILABLE");
const malformed = buildPrivateDailyPlan({ receipt: receipt([signal()]), registry, storiesRaw: 'window.NEWSSTAND_DATA = {"stories": [', now });
assert.equal(malformed.outcome, "HOLD_MALFORMED_CANONICAL");
assert.equal(malformed.candidates.length, 0);
assert.equal(validatePrivateDailyPlan(malformed).ok, true);
const drift = structuredClone(receipt([signal()])); drift.sourceRegistry.sha256 = "0".repeat(64);
assert.throws(() => buildPrivateDailyPlan({ receipt: drift, registry, storiesRaw: realCanonical, now }), /registry bytes/);
console.log("NEWSSTAND HOSTED CYCLE PLAN TEST PASS");
console.log("calibration=real-quoted-key-id-url,duplicate-url,duplicate-id,stale,unavailable,malformed-canonical,registry-drift rejected");
