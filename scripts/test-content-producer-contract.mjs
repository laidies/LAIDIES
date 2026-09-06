#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectContentProducerContract, PRODUCER_INSTRUCTION_PATHS } from "./check-content-producer-contract.mjs";
import { loadOwnerAdmission, applyAdmission } from "./admit-content-quality-learning.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-producer-contract-"));
const write = (relative, value) => { const target = path.join(root, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); return target; };
const hash = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

try {
  const instructionBindings = Object.fromEntries(Object.entries(PRODUCER_INSTRUCTION_PATHS).map(([key, relative]) => {
    const file = write(relative, `Current instruction fixture: ${key}\n`);
    return [key, { path: relative, sha256: hash(file) }];
  }));
  const badPath = "evidence/bad.txt";
  const goodPath = "evidence/good.txt";
  const sourcePath = "evidence/source.md";
  const benchmarkPath = "operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md";
  const bad = write(badPath, "A disconnected glossary with decorative comparisons and no useful decision.\n");
  const good = write(goodPath, "One real problem moves through a mechanism, consequence and useful action.\n");
  const source = write(sourcePath, "Authoritative source fixture.\n");
  const benchmark = write(benchmarkPath, "HANNAH_FRY_COMMUNICATION_LENS_V1 test fixture.\n");
  const failureFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "joylessInstruction"];
  const registry = write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: hash(bad), incidentId: "fixture-incident", appliesTo: ["EXPLANATION"], failureFamilies }],
    positiveExemplars: [{ id: "GOOD", path: goodPath, sha256: hash(good), useFor: ["EXPLANATION"] }]
  }));
  const dispositions = Object.fromEntries(failureFamilies.map(key => [key, { status: "CLEAR", producerGuard: `Prevent ${key} before drafting.`, preventionEvidence: `Fixture architecture explicitly prevents ${key}.` }]));
  const contract = {
    schemaVersion: "laidies-content-producer-contract.v1",
    candidateId: "fixture",
    surface: "LIBRAIRY",
    contentClass: "EXPLANATION",
    producer: "fixture-maker",
    instructionBindings,
    readerContract: {
      humanQuestion: "How does this work?", promisedPayoff: "Understand and use it.", priorKnowledge: "None assumed.",
      centralMentalModel: "Input moves through a system to a checked decision.", dailyLifeConnection: "A work handover.",
      surfaceJob: "Durable explanation.", desiredFeeling: "Oh, I get it now."
    },
    canonicalTruth: [{ claimId: "fixture-claim", owner: "fixture-owner", freshnessTrigger: "source changes", source: { path: sourcePath, sha256: hash(source) } }],
    positiveExemplars: [{ id: "GOOD", strengthsToUse: ["connected mechanism"], patternsNotToCopy: ["exact structure"] }],
    knownFailurePreflight: { registryVersion: "laidies-content-quality-exemplars.v1", registrySha256: hash(registry), negativeExemplarIds: ["BAD"], dispositions, knownDefectsRemaining: [] },
    draftArchitecture: {
      plainAnswer: "A plain answer first.", causalSequence: ["input", "mechanism", "decision"], workedCase: "Work handover case.",
      transferCase: "A family travel plan.", usefulAction: "Check the source before acting.", analogyPlan: [],
      humourPlan: { lessonJob: "One workplace joke sharpens the consequence." }, formatSpecificStructure: "Connected explanation with separate lookup.",
      antiTemplateDecision: "Vary structure around the reader question; no repeated micro-template."
    },
    communicationDesign: {
      benchmarkId: "HANNAH_FRY_COMMUNICATION_LENS_V2",
      benchmark: { path: benchmarkPath, sha256: hash(benchmark) },
      mode: "FULL",
      surfaceAdaptation: "Use the benchmark as an explanation-quality lens for one connected written explanation, not as a copied talk format.",
      imitationBoundary: "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA",
      dimensions: {
        humanQuestion: { disposition: "APPLY", reason: "The work decision gives the mechanism a human purpose.", plannedEvidence: "Open with the manager's consequential policy question." },
        usefulCuriosity: { disposition: "APPLY", reason: "A prediction exposes the reader's initial model.", plannedEvidence: "Ask which part of the system can actually support the promise before revealing the answer." },
        invisibleProcessConcrete: { disposition: "APPLY", reason: "The movement of context and evidence is otherwise invisible.", plannedEvidence: "Trace the request, context, model draft, policy evidence and human check in order." },
        familiarTechnicalMovement: { disposition: "APPLY", reason: "The work handover connects ordinary experience to system layers.", plannedEvidence: "Move from the handover to context, model and evidence, then return to the decision." },
        limitationsConsequences: { disposition: "APPLY", reason: "Confidence does not establish policy support.", plannedEvidence: "Show the consequence of sending an unsupported promise and the exact checking limit." },
        humourSurprise: { disposition: "NOT_APPLICABLE", reason: "The short proof does not need a joke to make the mechanism clearer." },
        betterNextQuestion: { disposition: "APPLY", reason: "The reader should leave able to interrogate another system.", plannedEvidence: "End with the question: what evidence supports this consequential detail?" }
      },
      explanationArc: {
        mode: "DEFAULT_SUBSTANTIAL_EXPLANATION",
        sharedStartingPoint: "A manager is about to make a promise in a client handover.",
        curiosityGap: "Which part of the AI system can actually support that promise?",
        mechanismSequence: ["The request supplies the job.", "Context supplies relevant material.", "The model drafts language.", "Evidence and a human check support the consequential detail."],
        earnedClick: "The fluent draft is not the evidence; the policy is.",
        smallLanding: "Before sending, ask what supports the consequential detail.",
        safetyBoundary: "State the need for human verification immediately; do not withhold it for suspense.",
        order: "START_AND_GAP_THEN_MECHANISM_THEN_EARNED_CLICK_THEN_SMALL_LANDING"
      }
    },
    representativeProofPlan: { highestRisk: "causal understanding", plannedProof: "one representative section", acceptanceOutcome: "reader explains and transfers it" },
    ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    status: "READY_TO_DRAFT"
  };
  const inspect = candidate => inspectContentProducerContract(candidate, { root }).errors;
  assert.deepEqual(inspect(contract), [], "complete prevention-first contract must match");

  // Reproduce the fresh-maker failure: metadata-complete but missing current instructions.
  const missingInstructionBindings = structuredClone(contract);
  delete missingInstructionBindings.instructionBindings;
  assert.match(inspect(missingInstructionBindings).join("\n"), /instructionBindings\.learningStandard/);
  for (const [key, relative] of Object.entries(PRODUCER_INSTRUCTION_PATHS)) {
    const filename = path.join(root, relative);
    const currentBytes = fs.readFileSync(filename);
    fs.unlinkSync(filename);
    assert.match(inspect(contract).join("\n"), new RegExp(`instructionBindings\\.${key}: bound file is missing`));
    fs.writeFileSync(filename, currentBytes);
    fs.appendFileSync(filename, "Changed instruction.\n");
    assert.match(inspect(contract).join("\n"), new RegExp(`instructionBindings\\.${key}: SHA-256 mismatch`));
    fs.writeFileSync(filename, currentBytes);
    const historical = structuredClone(contract);
    historical.instructionBindings[key] = { path: sourcePath, sha256: hash(source) };
    assert.match(inspect(historical).join("\n"), new RegExp(`instructionBindings\\.${key}\\.path must be`));
  }
  // A link at the correct path cannot substitute an external historical source.
  const instructionPath = path.join(root, PRODUCER_INSTRUCTION_PATHS.learningStandard);
  const instructionBytes = fs.readFileSync(instructionPath);
  const externalInstruction = `${root}-external-instruction.md`;
  try {
    fs.writeFileSync(externalInstruction, instructionBytes);
    fs.unlinkSync(instructionPath);
    fs.symlinkSync(externalInstruction, instructionPath);
    assert.match(inspect(contract).join("\n"), /instructionBindings\.learningStandard: bound file resolves outside/);
  } finally {
    fs.unlinkSync(instructionPath);
    fs.writeFileSync(instructionPath, instructionBytes);
    fs.rmSync(externalInstruction, { force: true });
  }
  assert.deepEqual(inspect(contract), [], "restored exact current instructions match");

  // An owner-admitted learning must reach the real producer preflight API.
  const registryBeforeLearning = fs.readFileSync(registry, "utf8");
  const newArtifactPath = "evidence/new-defect.txt";
  const newArtifact = write(newArtifactPath, "A fluent answer does not support the promise.\n");
  const family = "unsupportedPromise";
  const repair = "Require evidence for the exact promise before drafting.";
  const observedAt = "2026-09-06T20:00:00Z";
  const pendingPath = "evidence/pending-learning.json";
  const pending = write(pendingPath, JSON.stringify({
    schemaVersion: "laidies-content-quality-learning-record.v1", incidentId: "fixture-new-incident",
    candidateId: "fixture-rejected", artifactSha256: hash(newArtifact), failureFamilies: [family],
    requiredProducerRepair: repair, status: "PENDING_OWNER_ADMISSION",
    reviewReceipt: { candidateId: "fixture-rejected", artifactSha256: hash(newArtifact),
      reviewerPrincipalId: "fixture-rejection-judge", reviewedAt: observedAt, stage: "INDEPENDENT_REJECTION" }
  }));
  const reviewPath = "evidence/bounded-rejection.json";
  const rejection = write(reviewPath, JSON.stringify({
    schemaVersion: "laidies-content-quality-rejection.v1", candidateId: "fixture-rejected", maker: "fixture-maker",
    reviewer: { principalId: "fixture-rejection-judge", role: "independent-reviewer", artifactFirst: true },
    reviewedAt: observedAt, artifact: { path: newArtifactPath, sha256: hash(newArtifact) },
    failures: [{ family, excerpt: "A fluent answer does not support the promise.", explanation: "Synthetic decisive defect for the adapter integration test." }],
    limitations: ["Synthetic test; no semantic or reader observation claim."], verdict: "REJECT",
    pendingBinding: { path: pendingPath, sha256: hash(pending) }
  }));
  const admission = write("evidence/owner-admission.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-owner-admission.v1", decision: "ADMIT_REUSABLE_DEFECT",
    owner: { principalId: "fixture-learning-owner", role: "learning-system-concepts-director" },
    admittedAt: observedAt, rationale: "Synthetic fixture demonstrates producer propagation.",
    registryBeforeSha256: hash(registry), pendingBinding: { path: pendingPath, sha256: hash(pending) },
    reviewBinding: { path: reviewPath, sha256: hash(rejection) }, exemplarId: "NEW-DEFECT", appliesTo: ["EXPLANATION"]
  }));
  const applied = applyAdmission(loadOwnerAdmission(admission, { root }), { root, dryRun: false });
  assert.deepEqual(applied.errors, []);
  assert.equal(applied.status, "applied");
  assert.match(inspect(contract).join("\n"), /registrySha256 is stale/);
  const updatedMaker = structuredClone(contract);
  updatedMaker.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(updatedMaker).join("\n"), /every registered negative exemplar/);
  updatedMaker.knownFailurePreflight.negativeExemplarIds.push("NEW-DEFECT");
  assert.match(inspect(updatedMaker).join("\n"), /unsupportedPromise is not CLEAR/);
  updatedMaker.knownFailurePreflight.dispositions[family] = {
    status: "CLEAR", producerGuard: repair, preventionEvidence: "The synthetic draft plan checks the specific promise against its source."
  };
  assert.match(inspect(updatedMaker).join("\n"), /requires exactly one producer-plan application/);
  updatedMaker.draftArchitecture.usefulAction = "Before sending the promise, find the exact policy evidence for its consequential detail.";
  updatedMaker.knownFailurePreflight.learnedRepairApplications = [{
    exemplarId: "NEW-DEFECT", admissionSha256: applied.entry.learningAdmission.sha256,
    planPointer: "/draftArchitecture/usefulAction"
  }];
  const invalidPlan = structuredClone(updatedMaker);
  invalidPlan.knownFailurePreflight.learnedRepairApplications[0].planPointer = "/knownFailurePreflight/dispositions/unsupportedPromise/producerGuard";
  assert.match(inspect(invalidPlan).join("\n"), /generation or proof-plan field/);
  const staleApplication = structuredClone(updatedMaker);
  staleApplication.knownFailurePreflight.learnedRepairApplications[0].admissionSha256 = "0".repeat(64);
  assert.match(inspect(staleApplication).join("\n"), /admission binding is stale/);
  const consumed = inspectContentProducerContract(updatedMaker, { root });
  assert.deepEqual(consumed.errors, []);
  assert.deepEqual(consumed.requiredProducerRepairs, [{ exemplarId: "NEW-DEFECT", instruction: repair, implementation: { planPointer: "/draftArchitecture/usefulAction", value: updatedMaker.draftArchitecture.usefulAction } }]);
  const pendingBytes = fs.readFileSync(pending);
  fs.appendFileSync(pending, " ");
  assert.match(inspect(updatedMaker).join("\n"), /learning:.*SHA-256 mismatch/);
  fs.writeFileSync(pending, pendingBytes);
  fs.writeFileSync(registry, registryBeforeLearning);

  // Evidence backing an admitted example is part of its exact identity.
  const originalRegistry = fs.readFileSync(registry, "utf8");
  const evidenceRegistry = JSON.parse(originalRegistry);
  evidenceRegistry.positiveExemplars[0].evidencePath = sourcePath;
  evidenceRegistry.positiveExemplars[0].evidenceSha256 = hash(path.join(root, sourcePath));
  fs.writeFileSync(registry, JSON.stringify(evidenceRegistry));
  const withEvidence = structuredClone(contract);
  withEvidence.knownFailurePreflight.registrySha256 = hash(registry);
  assert.deepEqual(inspect(withEvidence), [], "exact supporting evidence must match");
  evidenceRegistry.positiveExemplars[0].evidenceSha256 = "0".repeat(64);
  fs.writeFileSync(registry, JSON.stringify(evidenceRegistry));
  withEvidence.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(withEvidence).join("\n"), /supporting evidence.*SHA-256 mismatch/);
  delete evidenceRegistry.positiveExemplars[0].evidenceSha256;
  fs.writeFileSync(registry, JSON.stringify(evidenceRegistry));
  withEvidence.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(withEvidence).join("\n"), /supporting evidence.*required/);
  fs.writeFileSync(registry, originalRegistry);


  const noExemplar = structuredClone(contract); noExemplar.positiveExemplars = [];
  assert.match(inspect(noExemplar).join("\n"), /positive exemplar/);
  const repeated = structuredClone(contract); repeated.knownFailurePreflight.dispositions.decorativeAnalogy.status = "OPEN";
  assert.match(inspect(repeated).join("\n"), /decorativeAnalogy is not CLEAR/);
  const sameCase = structuredClone(contract); sameCase.draftArchitecture.transferCase = sameCase.draftArchitecture.workedCase;
  assert.match(inspect(sameCase).join("\n"), /must be different/);
  const badAnalogy = structuredClone(contract); badAnalogy.draftArchitecture.analogyPlan = [{ concept: "model", analogy: "Cher" }];
  assert.match(inspect(badAnalogy).join("\n"), /analogyPlan\[0\]\.mapping/);
  const remaining = structuredClone(contract); remaining.knownFailurePreflight.knownDefectsRemaining = ["templateRepetition"];
  assert.match(inspect(remaining).join("\n"), /known defects remain/);
  const staleRegistry = structuredClone(contract); staleRegistry.knownFailurePreflight.registrySha256 = "0".repeat(64);
  assert.match(inspect(staleRegistry).join("\n"), /registrySha256 is stale/);
  const nameOnlyBenchmark = structuredClone(contract); nameOnlyBenchmark.communicationDesign.dimensions.usefulCuriosity.plannedEvidence = "Hannah Fry inspired";
  assert.match(inspect(nameOnlyBenchmark).join("\n"), /cannot be satisfied by naming Hannah Fry/);
  const imitation = structuredClone(contract); imitation.communicationDesign.imitationBoundary = "WRITE_IN_HANNAH_FRY_STYLE";
  assert.match(inspect(imitation).join("\n"), /must prohibit Hannah Fry voice or persona imitation/);
  const missingArc = structuredClone(contract); delete missingArc.communicationDesign.explanationArc;
  assert.match(inspect(missingArc).join("\n"), /default substantial-explanation arc/);
  const wrongArcOrder = structuredClone(contract); wrongArcOrder.communicationDesign.explanationArc.order = "REVEAL_THEN_EXPLAIN";
  assert.match(inspect(wrongArcOrder).join("\n"), /must preserve the default explanatory sequence/);
  const laterRegistry = JSON.parse(fs.readFileSync(registry, "utf8"));
  laterRegistry.negativeExemplars.push({ id: "BAD-2", incidentId: "fixture-incident-2", appliesTo: ["EXPLANATION"], path: badPath, sha256: hash(bad), failureFamilies: ["missingMechanism"] });
  fs.writeFileSync(registry, JSON.stringify(laterRegistry));
  const omittedLaterFailure = structuredClone(contract); omittedLaterFailure.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(omittedLaterFailure).join("\n"), /every registered negative exemplar/);
  console.log("CONTENT PRODUCER INPUT CALIBRATION PASS: current instructions, missing/changed/substituted bindings, known defects and learned-plan propagation; semantic quality NOT EVALUATED");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
