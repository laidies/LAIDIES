#!/usr/bin/env node
// Synthetic clones of the held Catch Me Up review. This test never changes its
// original receipt, candidate, registry, policy, or public NewsStand data.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const receiptPath = "operations/product-stewards/newsstand/evidence/service-renewal-20260905/catchup/town-03-catchup-producer-self-review.json";
const policyPath = "operations/product-stewards/newsstand/recurring-service-review-floor-policy.json";
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));
const policy = fs.readFileSync(path.join(root, policyPath));
const held = JSON.parse(fs.readFileSync(path.join(root, receiptPath), "utf8"));

function clean(stage = "PRODUCER_SELF_REVIEW") {
  const receipt = clone(held);
  receipt.stage = stage;
  receipt.reviewedAt = "2026-09-06T17:11:00.000Z";
  receipt.verdict = "PASS";
  receipt.learningDisposition = { disposition: "NO_NEW_DEFECT", rationale: "Synthetic zero-floor calibration only." };
  receipt.reviewFloorPolicy = { path: policyPath, policyId: "newsstand-recurring-service-zero-floor-2026-09-06", sha256: sha256(policy) };
  if (stage === "INDEPENDENT_SEMANTIC_ADMISSION") {
    receipt.reviewer = { ...receipt.reviewer, id: "synthetic-independent", principalId: "synthetic-independent", role: "Independent synthetic calibration", modelFamily: "synthetic-independent", independentFromMaker: true, artifactFirst: true };
    receipt.calibration.reviewerPrincipalId = "synthetic-independent";
    const samplingPath = "operations/product-stewards/newsstand/recurring-service-sampling-policy.json";
    const sampling = JSON.parse(fs.readFileSync(path.join(root, samplingPath), "utf8"));
    receipt.limitations = [...(receipt.limitations || []), "No observed human-comprehension evidence is claimed for this entry; batch sampling is pending."];
    receipt.samplingOverride = { policy: { path: samplingPath, sha256: sha256(fs.readFileSync(path.join(root, samplingPath))) }, policyId: sampling.policyId, serviceType: "did_you_know", sampleStatus: "PENDING_BATCH_SAMPLE", batchId: "synthetic-zero-floor", sampleQueue: sampling.entries.map(entry => entry.id), correctionFeedbackStatus: sampling.sampling.correctionFeedback };
  }
  return receipt;
}

const inspect = receipt => inspectProseQualityReview(receipt, { root }).errors.join("\n");
assert.equal(inspect(clean()), "", "clean producer successor may retain the 0-issue/1-cycle floor");
assert.equal(inspect(clean("INDEPENDENT_SEMANTIC_ADMISSION")), "", "clean independent successor may retain the 0-issue/1-cycle floor");

const missing = clean(); delete missing.reviewFloorPolicy;
assert.match(inspect(missing), /review issues did not decrease/);
const badBinding = clean(); badBinding.reviewFloorPolicy.sha256 = "0".repeat(64);
assert.match(inspect(badBinding), /reviewFloorPolicy: SHA-256 mismatch/);
const wrongScope = clean(); wrongScope.surface = "NEWSSTAND_BIG_PICTURE";
assert.match(inspect(wrongScope), /reviewFloorPolicy: limited to NEWSSTAND_RECURRING_SERVICE_COLUMNS/);
const premature = clean(); premature.reviewedAt = "2026-09-06T17:09:59.000Z";
assert.match(inspect(premature), /reviewFloorPolicy: review predates this approval/);
const nonzeroIssues = clean(); nonzeroIssues.ratchet.reviewIssues = 1;
assert.match(inspect(nonzeroIssues), /current review counts must be zero issues and one cycle/);
const extraCycle = clean(); extraCycle.ratchet.reviewCycles = 2;
assert.match(inspect(extraCycle), /current review counts must be zero issues and one cycle/);
const knownDefect = clean(); knownDefect.ratchet.repeatedKnownDefects = 1;
assert.match(inspect(knownDefect), /current known or objective defects cannot use the zero-floor policy/);
const failedOutcome = clean(); failedOutcome.outcomes.factualIntegrity.verdict = "HOLD";
assert.match(inspect(failedOutcome), /factualIntegrity did not pass/);
const falseLineage = clean(); falseLineage.ratchet.priorComparable.candidateId = "different-predecessor";
assert.match(inspect(falseLineage), /must bind the exact predecessor as priorComparable/);

console.log("NEWSSTAND SERVICE REVIEW FLOOR PASS producer=1 independent=1 missing_binding=blocked bad_binding=blocked scope=blocked premature=blocked nonzero_issues=blocked extra_cycle=blocked known_defect=blocked failed_outcome=blocked false_lineage=blocked original_held_receipt_unchanged=1");
