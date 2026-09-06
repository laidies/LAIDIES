#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { applyAdmission, inspectRegisteredLearning, loadOwnerAdmission } from "./admit-content-quality-learning.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-learning-admission-"));
const hash = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const write = (relative, value) => { const target = path.join(root, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); return target; };
const relative = target => path.relative(root, target);
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";

try {
  const artifact = write("fixtures/rejected.md", "A glossary list names terms before it explains what changes in a reader's decision.\n");
  const artifactSha = hash(fs.readFileSync(artifact));
  const review = {
    schemaVersion: "laidies-content-quality-rejection.v1", candidateId: "candidate-1", maker: "maker-1",
    reviewer: { principalId: "reviewer-1", role: "independent-reader", artifactFirst: true }, reviewedAt: "2026-09-06T12:00:00Z",
    artifact: { path: relative(artifact), sha256: artifactSha }, failures: [{ family: "jargonBeforeMeaning", excerpt: "names terms before it explains", explanation: "Terms arrive before causal explanation." }],
    limitations: ["This is an exact-prose rejection only; it does not authenticate identity or release authority."], verdict: "REJECT",
    pendingBinding: null
  };
  const reviewPath = write("records/rejection.json", `${JSON.stringify(review, null, 2)}\n`);
  const pending = {
    schemaVersion: "laidies-content-quality-learning-record.v1", incidentId: "INC-1", candidateId: "candidate-1", artifactSha256: artifactSha,
    failureFamilies: ["jargonBeforeMeaning"], requiredProducerRepair: "Explain the causal job before defining the specialist term.",
    reviewReceipt: { candidateId: "candidate-1", artifactSha256: artifactSha, reviewerPrincipalId: "reviewer-1", reviewedAt: "2026-09-06T12:00:00Z", stage: "INDEPENDENT_REJECTION" }, status: "PENDING_OWNER_ADMISSION"
  };
  const pendingPath = write("records/pending.json", `${JSON.stringify(pending, null, 2)}\n`);
  review.pendingBinding = { path: relative(pendingPath), sha256: hash(fs.readFileSync(pendingPath)) };
  fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  const registry = { schemaVersion: "laidies-content-quality-exemplars.v1", updatedAt: "2026-09-01T00:00:00Z", owner: "fixture", negativeExemplars: [], positiveExemplars: [] };
  const registryFile = write(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  const makeDecision = (overrides = {}) => ({
    schemaVersion: "laidies-content-quality-owner-admission.v1", decision: "ADMIT_REUSABLE_DEFECT", owner: { principalId: "owner-1", role: "learning-system-concepts-director" },
    admittedAt: "2026-09-06T13:00:00Z", rationale: "The exact rejection identifies a reusable producer prevention rule.", registryBeforeSha256: hash(fs.readFileSync(registryFile)),
    pendingBinding: { path: relative(pendingPath), sha256: hash(fs.readFileSync(pendingPath)) }, reviewBinding: { path: relative(reviewPath), sha256: hash(fs.readFileSync(reviewPath)) },
    exemplarId: "CQX-BAD-FIXTURE-1", appliesTo: ["EXPLANATION"], ...overrides
  });
  const hydrate = decision => { const copy = structuredClone(decision); const target = write("records/owner-decision.json", `${JSON.stringify(copy, null, 2)}\n`); copy._decisionPath = relative(target); copy._decisionSha256 = hash(fs.readFileSync(target)); return copy; };
  const before = fs.readFileSync(registryFile);
  const preview = applyAdmission(hydrate(makeDecision()), { root, dryRun: true });
  assert.deepEqual(preview.errors, []); assert.equal(preview.status, "preview"); assert.notEqual(preview.beforeSha256, preview.afterSha256, "preview reports its prospective registry bytes"); assert.deepEqual(fs.readFileSync(registryFile), before, "preview must not mutate registry");
  const pendingBefore = fs.readFileSync(pendingPath); const reviewBefore = fs.readFileSync(reviewPath);
  const applied = applyAdmission(hydrate(makeDecision()), { root, dryRun: false });
  assert.deepEqual(applied.errors, []); assert.equal(applied.status, "applied"); assert.notEqual(applied.beforeSha256, applied.afterSha256); assert.equal(applied.entry.requiredProducerRepair, pending.requiredProducerRepair);
  assert.deepEqual(fs.readFileSync(pendingPath), pendingBefore, "apply must not mutate pending record"); assert.deepEqual(fs.readFileSync(reviewPath), reviewBefore, "apply must not mutate rejection record");
  const admitted = JSON.parse(fs.readFileSync(registryFile, "utf8")); assert.equal(admitted.negativeExemplars.length, 1); assert.deepEqual(admitted.negativeExemplars[0].failureFamilies, ["jargonBeforeMeaning"]);
  assert.equal(inspectRegisteredLearning(admitted.negativeExemplars[0], { root }).status, "already admitted");
  const retry = applyAdmission(hydrate(makeDecision({ registryBeforeSha256: hash(before) })), { root, dryRun: false });
  assert.deepEqual(retry.errors, []); assert.equal(retry.status, "already admitted"); assert.equal(JSON.parse(fs.readFileSync(registryFile, "utf8")).negativeExemplars.length, 1, "retry must not duplicate entry");

  const assertNoMutation = (decision, expression) => { const bytes = fs.readFileSync(registryFile); const result = applyAdmission(hydrate(decision), { root, dryRun: false }); assert.ok(result.errors.join("\n").match(expression), result.errors.join("\n")); assert.deepEqual(fs.readFileSync(registryFile), bytes); };
  for (const field of ["artifact", "reviewer"]) {
    const malformed = structuredClone(review); delete malformed[field];
    fs.writeFileSync(reviewPath, JSON.stringify(malformed));
    assertNoMutation(makeDecision(), /required|requires|invalid admission input/);
  }
  fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  assertNoMutation(makeDecision({ admittedAt: "1" }), /ISO date-time/);
  const validRegistryBytes = fs.readFileSync(registryFile);
  for (const malformedRegistry of [null, false, 3, []]) {
    fs.writeFileSync(registryFile, JSON.stringify(malformedRegistry));
    assertNoMutation(makeDecision(), /registry must be an object/);
  }
  fs.writeFileSync(registryFile, validRegistryBytes);


  // Use a fresh empty registry for failure isolation so duplicate protections do not mask each assertion.
  fs.writeFileSync(registryFile, `${JSON.stringify(registry, null, 2)}\n`);
  assertNoMutation(makeDecision({ reviewBinding: { path: relative(reviewPath), sha256: hash(fs.readFileSync(reviewPath)) }, pendingBinding: { path: "records/missing-pending.json", sha256: hash(fs.readFileSync(pendingPath)) } }), /pendingBinding/);
  assertNoMutation(makeDecision({ registryBeforeSha256: "0".repeat(64) }), /registry is stale/);
  fs.writeFileSync(registryFile, "[]\n");
  { const malformed = applyAdmission(hydrate(makeDecision()), { root, dryRun: false }); assert.match(malformed.errors.join("\n"), /registry must be an object/); assert.equal(fs.readFileSync(registryFile, "utf8"), "[]\n"); }
  fs.writeFileSync(registryFile, `${JSON.stringify(registry, null, 2)}\n`);
  const cachedDecision = hydrate(makeDecision()); cachedDecision.rationale = "Forged in-memory change.";
  { const bytes = fs.readFileSync(registryFile); const result = applyAdmission(cachedDecision, { root, dryRun: false }); assert.match(result.errors.join("\n"), /differs from the exact bound on-disk bytes/); assert.deepEqual(fs.readFileSync(registryFile), bytes); }
  const changedDecision = hydrate(makeDecision()); fs.writeFileSync(path.join(root, changedDecision._decisionPath), "{}\n");
  { const bytes = fs.readFileSync(registryFile); const result = applyAdmission(changedDecision, { root, dryRun: false }); assert.match(result.errors.join("\n"), /owner decision SHA-256 mismatch/); assert.deepEqual(fs.readFileSync(registryFile), bytes); }
  const pendingDecision = hydrate(makeDecision()); const changedPending = structuredClone(pending); changedPending.requiredProducerRepair = "Changed after owner binding."; fs.writeFileSync(pendingPath, `${JSON.stringify(changedPending)}\n`);
  { const bytes = fs.readFileSync(registryFile); const result = applyAdmission(pendingDecision, { root, dryRun: false }); assert.match(result.errors.join("\n"), /pendingBinding: SHA-256 mismatch/); assert.deepEqual(fs.readFileSync(registryFile), bytes); }
  fs.writeFileSync(pendingPath, `${JSON.stringify(pending, null, 2)}\n`);
  const reviewDecision = hydrate(makeDecision()); const changedReview = structuredClone(review); changedReview.limitations = ["Changed after owner binding."]; fs.writeFileSync(reviewPath, `${JSON.stringify(changedReview)}\n`);
  { const bytes = fs.readFileSync(registryFile); const result = applyAdmission(reviewDecision, { root, dryRun: false }); assert.match(result.errors.join("\n"), /reviewBinding: SHA-256 mismatch/); assert.deepEqual(fs.readFileSync(registryFile), bytes); }
  fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  const cycle = structuredClone(pending); cycle.reviewReceipt.finalReviewSha256 = "0".repeat(64); fs.writeFileSync(pendingPath, `${JSON.stringify(cycle)}\n`);
  assertNoMutation(makeDecision(), /identity facts only/); fs.writeFileSync(pendingPath, `${JSON.stringify(pending, null, 2)}\n`);
  const counterfeit = structuredClone(review); counterfeit.failures[0].excerpt = "not in the artifact"; fs.writeFileSync(reviewPath, `${JSON.stringify(counterfeit)}\n`);
  assertNoMutation(makeDecision(), /excerpt does not occur/); fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  const mismatch = structuredClone(review); mismatch.reviewer.principalId = "maker-1"; fs.writeFileSync(reviewPath, `${JSON.stringify(mismatch)}\n`);
  assertNoMutation(makeDecision(), /cannot be maker/); fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  assertNoMutation(makeDecision({ owner: { principalId: "maker-1", role: "learning-system-concepts-director" } }), /owner cannot be maker/);
  const held = structuredClone(review); held.verdict = "HOLD"; fs.writeFileSync(reviewPath, `${JSON.stringify(held)}\n`);
  assertNoMutation(makeDecision(), /verdict must be REJECT/); fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
  const lock = `${path.join(root, registryPath)}.admission.lock`; fs.writeFileSync(lock, "someone else\n");
  const locked = applyAdmission(hydrate(makeDecision()), { root, dryRun: false }); assert.match(locked.errors.join("\n"), /lock unavailable/); assert.ok(fs.existsSync(lock), "must not remove another holder's lock"); fs.unlinkSync(lock);
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-learning-outside-"));
  try {
    const outsideDecision = path.join(outside, "decision.json"); fs.writeFileSync(outsideDecision, "{}"); const link = path.join(root, "records/outside-decision.json"); fs.symlinkSync(outsideDecision, link);
    assert.throws(() => loadOwnerAdmission(link, { root }), /symlink escape/);
    const escaped = structuredClone(review); const outsideArtifact = path.join(outside, "artifact.md"); fs.writeFileSync(outsideArtifact, fs.readFileSync(artifact)); const artifactLink = path.join(root, "fixtures/outside.md"); fs.symlinkSync(outsideArtifact, artifactLink); escaped.artifact.path = relative(artifactLink); escaped.artifact.sha256 = hash(fs.readFileSync(outsideArtifact)); fs.writeFileSync(reviewPath, JSON.stringify(escaped));
    assertNoMutation(makeDecision(), /symlink escape/); fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
    const pendingLink = path.join(root, "records/outside-pending.json"); fs.symlinkSync(pendingPath, pendingLink);
    // This is an internal symlink and remains valid; replace it with an external target below.
    fs.unlinkSync(pendingLink); const outsidePending = path.join(outside, "pending.json"); fs.writeFileSync(outsidePending, fs.readFileSync(pendingPath)); fs.symlinkSync(outsidePending, pendingLink);
    const linkedPending = makeDecision({ pendingBinding: { path: relative(pendingLink), sha256: hash(fs.readFileSync(outsidePending)) } });
    assertNoMutation(linkedPending, /pendingBinding: file is missing or outside repository/);
    const reviewLink = path.join(root, "records/outside-review.json"); const outsideReview = path.join(outside, "review.json"); fs.writeFileSync(outsideReview, fs.readFileSync(reviewPath)); fs.symlinkSync(outsideReview, reviewLink);
    assertNoMutation(makeDecision({ reviewBinding: { path: relative(reviewLink), sha256: hash(fs.readFileSync(outsideReview)) } }), /reviewBinding: file is missing or outside repository/);
    fs.unlinkSync(pendingLink); fs.unlinkSync(reviewLink);
    const registryBytes = fs.readFileSync(registryFile); const outsideRegistry = path.join(outside, "registry.json"); fs.renameSync(registryFile, outsideRegistry); fs.symlinkSync(outsideRegistry, registryFile);
    { const result = applyAdmission(hydrate(makeDecision()), { root, dryRun: false }); assert.match(result.errors.join("\n"), /registry.*symlink escape/); assert.deepEqual(fs.readFileSync(registryFile), registryBytes); }
    fs.unlinkSync(registryFile); fs.renameSync(outsideRegistry, registryFile);
  } finally { fs.rmSync(outside, { recursive: true, force: true }); }
  console.log("CONTENT QUALITY LEARNING ADMISSION PASS preview=1 applied=1 immutable_records=1 retry_no_duplicate=1 changed_bindings=2 decision_provenance=2 malformed_registry=1 pending_match=1 acyclic_receipt=1 symlink_escape=5 registered_revalidation=1 negatives_preserve_registry=11 new_family=1 hash_changed=1");
} finally { fs.rmSync(root, { recursive: true, force: true }); }
