#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectContentProducerContract } from "./check-content-producer-contract.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-producer-contract-"));
const write = (relative, value) => { const target = path.join(root, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); return target; };
const hash = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

try {
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
  console.log("CONTENT PRODUCER CONTRACT CALIBRATION PASS valid=1 rejected=13 all_negatives=1 stale_registry=1 communication_design=1 explanation_arc=1 no_pastiche=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
