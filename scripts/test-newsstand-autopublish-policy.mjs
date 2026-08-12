#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateCandidate, parseCandidateJson } from "./evaluate-newsstand-autopublish.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const operations = path.resolve(directory, "../operations");
const fixtures = path.join(operations, "test-fixtures/newsstand-autopublish");
const policy = JSON.parse(fs.readFileSync(path.join(operations, "newsstand-autopublish-policy.json"), "utf8"));
const read = (name) => JSON.parse(fs.readFileSync(path.join(fixtures, name), "utf8"));
const qualified = (edition) => ({
  ...read("routine-daily-brief.json"), id: `qualified-${edition}`, slug: `qualified-${edition}`, edition,
  editorialJob: edition === "breaking" ? "qualified-interrupt" : edition === "daily" ? "edited-briefing" : edition === "weekly" ? "durable-synthesis" : "sourced-argument",
  briefingItems: edition === "daily" ? ["one admitted story"] : undefined,
  developments: edition === "weekly" ? ["development-a", "development-b"] : undefined,
  qualifiedInterrupt: edition === "breaking" ? { reason: "candidate declaration only" } : undefined,
  argumentStructure: edition === "tribune" ? { evidence: "candidate declaration", inference: "candidate declaration", position: "candidate declaration" } : undefined,
  riskDomains: ["none"],
  continuingStory: { action: "STANDALONE" },
});
function compact(object) { return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined)); }
function route(candidate, verdict, label) {
  const result = evaluateCandidate(compact(candidate), policy);
  assert.equal(result.verdict, verdict, label);
  assert.equal(result.publishActionTaken, false, `${label}: must never publish`);
  assert.equal(result.authorityPresent, false, `${label}: no independent authority exists`);
  assert.equal(result.candidateAssertionsAreEvidence, false, `${label}: candidate declarations are not evidence`);
  return result;
}

for (const edition of ["breaking", "daily", "weekly", "tribune"]) route(qualified(edition), "HOLD_FOR_INDEPENDENT_REVIEW", `${edition} qualified proposal routes to independent review`);
const routineWeekly = route({ ...qualified("weekly"), developments: ["one routine update"] }, "REJECT", "one-item routine update cannot pretend to be Weekly");
assert.ok(routineWeekly.rejectReasons.includes("edition_contract_failed:weekly_requires_durable_synthesis"));
const dailyAsSynthesis = route({ ...qualified("daily"), editorialJob: "durable-synthesis", briefingItems: undefined, developments: ["a", "b"] }, "REJECT", "Daily cannot claim Weekly synthesis job");
assert.ok(dailyAsSynthesis.rejectReasons.includes("edition_contract_failed:daily_requires_at_least_one_story"));
route({ ...qualified("daily"), briefingItems: ["one excellent story"] }, "HOLD_FOR_INDEPENDENT_REVIEW", "one Daily story may reach review before issue assembly");
const unearnedBreaking = route({ ...qualified("breaking"), qualifiedInterrupt: undefined }, "REJECT", "Breaking requires a qualified-interrupt proposal");
assert.ok(unearnedBreaking.rejectReasons.includes("edition_contract_failed:breaking_requires_qualified_interrupt"));
const hiddenOpinion = route({ ...qualified("tribune"), argumentStructure: { evidence: "e", inference: "i" } }, "REJECT", "Tribune must separately declare position");
assert.ok(hiddenOpinion.rejectReasons.includes("edition_contract_failed:tribune_requires_evidence_inference_position"));
const completeModelRelease = route({ ...qualified("breaking"), topics: ["model-release"], releaseDetailsComplete: true }, "HOLD_FOR_INDEPENDENT_REVIEW", "complete model release routes to review");
const incompleteModelRelease = route({ ...qualified("breaking"), topics: ["model-release"] }, "REJECT", "model release requires complete release details");
assert.ok(incompleteModelRelease.rejectReasons.includes("conditional_gate_failed:releaseDetailsComplete"));
const neutralizedRealityCheck = route({ ...qualified("breaking"), riskSignals: ["sensational_or_misleading_claim"], sensationalFramingNeutralized: true }, "HOLD_FOR_INDEPENDENT_REVIEW", "neutralized sensational claim routes to review");
const unsafeRealityCheck = route({ ...qualified("breaking"), riskSignals: ["sensational_or_misleading_claim"] }, "REJECT", "sensational claim requires neutralized framing");
assert.ok(unsafeRealityCheck.rejectReasons.includes("conditional_gate_failed:sensationalFramingNeutralized"));
const privacyReview = route({ ...qualified("daily"), riskDomains: ["privacy"] }, "HOLD_FOR_INDEPENDENT_REVIEW", "privacy risk is controlled independently of browse topics");
assert.ok(privacyReview.reviewReasons.includes("candidate_declares_hard_hold_risk_domain:privacy"));
const unknownRiskDomain = route({ ...qualified("daily"), riskDomains: ["scary-ai"] }, "REJECT", "unknown risk domain cannot bypass controlled review");
assert.ok(unknownRiskDomain.rejectReasons.includes("missing_or_invalid:riskDomains"));
const followUpWithoutPredecessor = route({ ...qualified("daily"), continuingStory: { action: "FOLLOW_UP_NEW_STORY" } }, "REJECT", "material follow-up requires predecessor lineage");
assert.ok(followUpWithoutPredecessor.rejectReasons.includes("continuing_story_requires_predecessor_and_relationship"));
route({ ...qualified("daily"), continuingStory: { action: "FOLLOW_UP_NEW_STORY", predecessorId: "earlier-story", relationship: "CHANGES" } }, "HOLD_FOR_INDEPENDENT_REVIEW", "new dated successor with lineage reaches review");
const scoreForgery = route({ ...qualified("daily"), scores: { consequence: 3, novelty: 3, readerRelevance: 3, evidence: 3, durability: 3, editorialValue: 3 }, checks: Object.fromEntries(policy.requiredChecks.map((check) => [check, true])) }, "HOLD_FOR_INDEPENDENT_REVIEW", "perfect candidate scores and checks do not authorize publication");
assert.ok(scoreForgery.reviewReasons.includes("independent_signed_hashed_authority_required"));
for (const [label, candidate] of [
  ["duplicate weekly developments", { ...qualified("weekly"), developments: ["same", "same"] }],
  ["empty daily briefing item", { ...qualified("daily"), briefingItems: ["", "change"] }],
  ["empty breaking interrupt", { ...qualified("breaking"), qualifiedInterrupt: {} }],
  ["unknown check", { ...qualified("daily"), checks: { ...qualified("daily").checks, madeUpApproval: true } }],
  ["impossible calendar date", { ...qualified("daily"), date: "2026-02-31" }],
  ["future date", { ...qualified("daily"), date: "2099-01-01" }],
  ["stale date", { ...qualified("daily"), date: "2000-01-01" }]
]) route(candidate, "REJECT", label);
const malformed = route(read("bad-missing-source.json"), "REJECT", "malformed proposal rejects");
assert.ok(malformed.rejectReasons.length > 0);

assert.throws(
  () => parseCandidateJson('{"id":"first","id":"second"}'),
  /duplicate/i,
  "raw duplicate root keys reject before JSON.parse normalization",
);
assert.throws(
  () => parseCandidateJson('{"id":"first","\\u0069d":"second"}'),
  /duplicate/i,
  "escaped-equivalent root keys reject before JSON.parse normalization",
);

const originalDateNow = Date.now;
try {
  Date.now = () => Date.parse("2026-07-26T12:00:00Z");
  for (const date of ["2026-13-01", "2026-07-00", "2026-02-29", "2026-04-31"]) {
    route({ ...qualified("daily"), date }, "REJECT", `malformed calendar date ${date}`);
  }
  route({ ...qualified("daily"), date: "2026-07-27" }, "REJECT", "tomorrow rejects");
  route({ ...qualified("daily"), date: "2026-06-26" }, "HOLD_FOR_INDEPENDENT_REVIEW", "30-day boundary holds");
  route({ ...qualified("daily"), date: "2026-06-25" }, "HOLD_FOR_INDEPENDENT_REVIEW", "31-day boundary holds");
  route({ ...qualified("daily"), date: "2026-06-24" }, "REJECT", "32-day boundary rejects");
} finally {
  Date.now = originalDateNow;
}

const identityResult = route(qualified("daily"), "HOLD_FOR_INDEPENDENT_REVIEW", "policy identity accompanies parsed decisions");
assert.equal(identityResult.policyVersion, policy.version);
assert.equal(
  identityResult.policySha256,
  crypto.createHash("sha256").update(JSON.stringify(policy)).digest("hex"),
  "policy identity binds the canonical policy object",
);
console.log("✓ NEWSSTAND REVIEW ROUTER: four publication jobs · reject/reroute fixtures · no candidate can authorize publication");
