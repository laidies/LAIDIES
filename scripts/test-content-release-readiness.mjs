#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { checkContentReleaseReadiness } from "./check-content-release-readiness.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-content-release-"));
const scriptPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "check-content-release-readiness.mjs");
const requiredGates = [
  "accuracy", "antiSlop", "currentBestPractice", "laidiesVoice",
  "analogyIntegrity", "usefulnessDepth", "formatFit", "searchIndexing",
  "relationshipLinking", "canonConsistency", "songOpportunity", "derivativeFeeds"
];

function write(relativePath, value) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
  return filePath;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function writeQueue(workOrders) {
  write(
    "operations/product-stewards/learning-content-ecosystem/content-work-orders.json",
    JSON.stringify({ workOrders }, null, 2)
  );
}

function allHeldOrder() {
  return {
    id: "all-held",
    status: "BUILDING",
    qualityGates: Object.fromEntries(requiredGates.map((gate) => [gate, { status: "HOLD", evidencePaths: [] }])),
    artifactBinding: { status: "UNBOUND" },
    reviewChain: []
  };
}

function validOrder() {
  const id = "fixture-ready";
  const manifestPath = "content/fixture-manifest.json";
  const payloadPath = "content/fixture-payload.html";
  const renderedPath = "evidence/fixture-render.png";
  const observationPath = "evidence/reader-observation.md";
  const payloadBody = "<main>A real work question moves through context and evidence to a checked decision the reader can use elsewhere.</main>\n";
  write(payloadPath, payloadBody);
  write(renderedPath, "fixture render\n");
  write(observationPath, "The reader explained the context, evidence and human decision in a different case.\n");
  const manifestFile = write(manifestPath, JSON.stringify({ schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: id, surface: "LIBRAIRY", contentClass: "EXPLANATION", reviewText: { path: payloadPath, sha256: sha256(path.join(root, payloadPath)) } }));
  const binding = { status: "BOUND", manifestPath, sha256: sha256(manifestFile) };
  const qualityGates = {};
  for (const gate of requiredGates) {
    const receiptPath = `evidence/${gate}.json`;
    const receipt = {
      schemaVersion: "1.0.0",
      workOrderId: id,
      gate,
      verdict: "PASS",
      artifact: binding,
      maker: "maker",
      reviewer: `reviewer-${gate}`,
      reviewedAt: "2026-08-04T00:00:00Z",
      findings: "Fixture receipt.",
      evidence: { sourceRefs: [], testRefs: [] },
      limitations: [],
      freshness: {
        reviewedThrough: "2026-08-04",
        nextTrigger: "Fixture only",
        correctionOwner: "fixture-owner"
      }
    };
    if (gate === "formatFit") {
      receipt.surfaceAdaptation = {
        surface: "LIBRAIRY",
        destinationJob: "Prove strict readiness behavior.",
        payloadPath,
        distinctFromOtherSurfaces: true,
        renderedEvidencePaths: [renderedPath],
        interactionEvidencePaths: []
      };
    }
    write(receiptPath, JSON.stringify(receipt, null, 2));
    qualityGates[gate] = { status: "PASS", evidencePaths: [receiptPath] };
  }
  const badPath = "evidence/known-bad.txt";
  const goodPath = "evidence/known-good.txt";
  const sourcePath = "evidence/source.md";
  write(badPath, "A disconnected glossary uses a decorative comparison and gives the reader no useful decision.\n");
  write(goodPath, "A real problem moves through one mechanism and lands in a useful action the reader can transfer.\n");
  write(sourcePath, "Authoritative fixture source says context and evidence support a checked decision.\n");
  const negativeFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "joylessInstruction"];
  const allFailureFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "factlessConfidence", "staleUnreviewableClaims", "corporateSludge", "joylessInstruction"];
  const registry = write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: sha256(path.join(root, badPath)), incidentId: "fixture-incident", appliesTo: ["EXPLANATION"], failureFamilies: negativeFamilies }],
    positiveExemplars: [{ id: "GOOD", path: goodPath, sha256: sha256(path.join(root, goodPath)), useFor: ["EXPLANATION"] }]
  }));
  const dispositions = Object.fromEntries(negativeFamilies.map(name => [name, { status: "CLEAR", producerGuard: `Prevent ${name}.`, preventionEvidence: `Fixture architecture explicitly prevents ${name}.` }]));
  const producerContractPath = "evidence/producer-contract.json";
  write(producerContractPath, JSON.stringify({
    schemaVersion: "laidies-content-producer-contract.v1", candidateId: id, surface: "LIBRAIRY", contentClass: "EXPLANATION", producer: "maker", status: "READY_TO_DRAFT",
    readerContract: { humanQuestion: "How does this work?", promisedPayoff: "Understand and use it.", priorKnowledge: "None assumed.", centralMentalModel: "Context and evidence lead to a checked decision.", dailyLifeConnection: "A work question.", surfaceJob: "Durable explanation.", desiredFeeling: "Oh, I get it now." },
    canonicalTruth: [{ claimId: "fixture", owner: "fixture-owner", freshnessTrigger: "source changes", source: { path: sourcePath, sha256: sha256(path.join(root, sourcePath)) } }],
    positiveExemplars: [{ id: "GOOD", strengthsToUse: ["connected mechanism"], patternsNotToCopy: ["exact structure"] }],
    knownFailurePreflight: { registryVersion: "laidies-content-quality-exemplars.v1", registrySha256: sha256(registry), negativeExemplarIds: ["BAD"], dispositions, knownDefectsRemaining: [] },
    draftArchitecture: { plainAnswer: "Plain answer.", causalSequence: ["question", "context", "decision"], workedCase: "Work case.", transferCase: "Travel case.", usefulAction: "Check evidence.", analogyPlan: [], humourPlan: { lessonJob: "A small joke sharpens the point." }, formatSpecificStructure: "Connected explanation.", antiTemplateDecision: "No repeated micro-template." },
    representativeProofPlan: { highestRisk: "understanding", plannedProof: "one section", acceptanceOutcome: "reader transfers it" },
    ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" }
  }));
  const excerpt = "A real work question moves through context and evidence";
  const outcomeNames = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "connectedSystemUnderstanding", "dailyLifeConnection", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"];
  const outcomes = Object.fromEntries(outcomeNames.map(name => [name, { verdict: "PASS", observation: `${name} is present.`, artifactEvidence: [{ excerpt, locator: "fixture-payload.html:1" }], ...(["explainBack", "unseenTransfer"].includes(name) ? { readerEvidence: { prompt: `Test ${name}.`, observedResponse: "Reader explained it.", expectedEvidence: "Names context and evidence.", observationBinding: { path: observationPath, sha256: sha256(path.join(root, observationPath)) } } } : {}) }]));
  const review = stage => {
    const reviewerPrincipalId = stage === "PRODUCER_SELF_REVIEW" ? "maker" : "independent-reader-principal";
    return ({
    schemaVersion: "laidies-prose-quality-review.v1", candidateId: id, stage, contentClass: "EXPLANATION", surface: "LIBRAIRY", maker: "maker",
    reviewer: { id: stage === "PRODUCER_SELF_REVIEW" ? "maker-review" : "independent-reader", principalId: reviewerPrincipalId, role: "prose reviewer", ...(stage === "INDEPENDENT_SEMANTIC_ADMISSION" ? { independentFromMaker: true, artifactFirst: true } : {}) }, reviewMode: "EXACT_PROSE_IN_FULL", reviewedAt: "2026-08-07T07:00:00-07:00",
    artifact: { reviewText: { path: payloadPath, sha256: sha256(path.join(root, payloadPath)) }, manifest: { path: manifestPath, sha256: binding.sha256 } },
    calibration: { registrySha256: sha256(registry), reviewerPrincipalId, reviewedAt: "2026-08-07T06:59:00-07:00", negatives: [{ exemplarId: "BAD", verdict: "REJECT", identifiedFailureFamilies: negativeFamilies, evidence: [{ excerpt: "A disconnected glossary uses a decorative comparison", locator: "known-bad.txt:1" }] }], positive: { exemplarId: "GOOD", verdict: "PASS", strengthsRetained: ["connected mechanism"], evidence: [{ excerpt: "A real problem moves through one mechanism", locator: "known-good.txt:1" }] } },
    reverseBrief: { humanQuestion: "How does this work?", promisedPayoff: "Understand and use it.", centralMentalModel: "Context and evidence lead to a checked decision.", dailyLifeConnection: "A work question.", surfaceJob: "Durable explanation.", desiredReaderFeeling: "Oh, I get it now." },
    outcomes,
    failureFamilies: Object.fromEntries(allFailureFamilies.map(name => [name, { present: false, observation: `${name} absent.`, artifactLocator: "fixture-payload.html:1" }])),
    factualReview: { disposition: "CLAIMS_REVIEWED", sourceBindings: [{ path: sourcePath, sha256: sha256(path.join(root, sourcePath)) }], claimMap: [{ claimId: "fixture-context-evidence", status: "VERIFIED", candidateEvidence: [{ excerpt: "context and evidence to a checked decision", locator: "fixture-payload.html:1" }], sourceBinding: { path: sourcePath, sha256: sha256(path.join(root, sourcePath)) }, sourceEvidence: [{ excerpt: "context and evidence support a checked decision", locator: "source.md:1" }], scopeAndFreshness: "Synthetic fixture; recheck on source change." }], reviewedThrough: "2026-08-07", nextTrigger: "source changes", correctionOwner: "fixture-owner" },
    ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, priorComparable: { reviewIssues: 1, reviewCycles: 2 }, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" }, lineage: { kind: "SUCCESSOR", predecessorCandidateId: "fixture-prior" }, learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "Synthetic valid fixture." }, verdict: "PASS", limitations: []
  });
  };
  const producerReviewPath = "evidence/producer-review.json";
  const semanticAdmissionPath = "evidence/semantic-admission.json";
  write(producerReviewPath, JSON.stringify(review("PRODUCER_SELF_REVIEW")));
  write(semanticAdmissionPath, JSON.stringify(review("INDEPENDENT_SEMANTIC_ADMISSION")));
  return {
    id,
    successorOf: "fixture-prior",
    status: "BUILDING",
    surface: "LIBRAIRY",
    producerContractPath,
    producerReviewPath,
    semanticAdmissionPath,
    qualityGates,
    artifactBinding: binding,
    reviewChain: [
      { stage: "BUILD", owner: "maker", status: "PASS_LOCAL" },
      { stage: "ACCURACY", owner: "accuracy-reviewer", status: "PASS" },
      { stage: "EXPERIENCE", owner: "experience-reviewer", status: "PASS" },
      { stage: "OWNER", owner: "owner-reviewer", status: "PASS" },
      { stage: "RELEASE", owner: "release", status: "HOLD" },
      { stage: "PUBLIC", owner: "public", status: "HOLD" }
    ]
  };
}

try {
  writeQueue([allHeldOrder()]);
  const held = checkContentReleaseReadiness({ root, requireReady: 1 });
  assert.deepEqual(held.errors, []);
  assert.deepEqual(held.ready, []);
  assert.equal(held.readinessThresholdMet, false);

  const defaultHeld = spawnSync(process.execPath, [scriptPath], { cwd: root, encoding: "utf8" });
  assert.equal(defaultHeld.status, 0);
  assert.match(defaultHeld.stdout, /CONTENT RELEASE ADMISSION INTEGRITY VALID — RELEASE HOLD/);

  const strictHeld = spawnSync(process.execPath, [scriptPath, "--require-ready", "1"], { cwd: root, encoding: "utf8" });
  assert.equal(strictHeld.status, 1);
  assert.match(strictHeld.stderr, /required release-ready minimum=1; actual=0/);

  const readyOrder = validOrder();
  writeQueue([readyOrder]);
  const ready = checkContentReleaseReadiness({ root, requireReady: 1 });
  assert.deepEqual(ready.errors, []);
  assert.deepEqual(ready.ready, ["fixture-ready"]);
  assert.equal(ready.readinessThresholdMet, true);

  const semanticPath = path.join(root, readyOrder.semanticAdmissionPath);
  const semantic = JSON.parse(fs.readFileSync(semanticPath, "utf8"));
  const alternateManifestPath = "content/alternate-manifest.json";
  write(alternateManifestPath, fs.readFileSync(path.join(root, readyOrder.artifactBinding.manifestPath)));
  semantic.artifact.manifest = { path: alternateManifestPath, sha256: sha256(path.join(root, alternateManifestPath)) };
  fs.writeFileSync(semanticPath, JSON.stringify(semantic));
  const wrongReleaseArtifact = checkContentReleaseReadiness({ root, requireReady: 1 });
  assert.deepEqual(wrongReleaseArtifact.ready, []);
  assert.match(wrongReleaseArtifact.held[0].reasons.join("\n"), /semanticAdmission:RELEASE_ARTIFACT_MISMATCH|PRODUCER_MANIFEST_MISMATCH/);

  const restoredOrder = validOrder();
  writeQueue([restoredOrder]);

  const strictReady = spawnSync(process.execPath, [scriptPath, "--require-ready", "1"], { cwd: root, encoding: "utf8" });
  assert.equal(strictReady.status, 0);
  assert.match(strictReady.stdout, /CONTENT RELEASE ADMISSION INTEGRITY VALID/);
  assert.match(strictReady.stdout, /release_ready=fixture-ready/);

  const requiredIdReady = spawnSync(process.execPath, [scriptPath, "--require-id", "fixture-ready"], { cwd: root, encoding: "utf8" });
  assert.equal(requiredIdReady.status, 0);
  const requiredIdMissing = spawnSync(process.execPath, [scriptPath, "--require-id", "not-ready"], { cwd: root, encoding: "utf8" });
  assert.equal(requiredIdMissing.status, 1);
  assert.match(requiredIdMissing.stderr, /required work order is not release-ready/);

  const malformedMinimum = spawnSync(process.execPath, [scriptPath, "--require-ready", "0"], { cwd: root, encoding: "utf8" });
  assert.equal(malformedMinimum.status, 2);
  assert.match(malformedMinimum.stderr, /positive integer minimum/);

  console.log("CONTENT RELEASE READINESS TEST PASS");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
