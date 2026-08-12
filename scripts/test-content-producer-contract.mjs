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
  const reasoningBenchmarkPath = "operations/product-stewards/learning-content-ecosystem/LAIDIES-EXPLANATION-AND-EDITORIAL-REASONING-BENCHMARK.md";
  const bad = write(badPath, "A disconnected glossary with decorative comparisons and no useful decision.\n");
  const good = write(goodPath, "One real problem moves through a mechanism, consequence and useful action.\n");
  const source = write(sourcePath, "Authoritative source fixture.\n");
  const benchmark = write(benchmarkPath, "HANNAH_FRY_COMMUNICATION_LENS_V1 test fixture.\n");
  const reasoningBenchmark = write(reasoningBenchmarkPath, "LAIDIES_EXPLANATION_EDITORIAL_TRIAD_V1 test fixture.\n");
  const failureFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "joylessInstruction"];
  const registry = write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: hash(bad), incidentId: "fixture-incident", appliesTo: ["EXPLANATION"], failureFamilies }],
    positiveExemplars: [{ id: "GOOD", path: goodPath, sha256: hash(good), useFor: ["EXPLANATION", "NEWS"] }]
  }));
  const dispositions = Object.fromEntries(failureFamilies.map(key => [key, { status: "CLEAR", producerGuard: `Prevent ${key} before drafting.`, preventionEvidence: `Fixture architecture explicitly prevents ${key}.` }]));
  const contract = {
    schemaVersion: "laidies-content-producer-contract.v1",
    candidateId: "fixture",
    surface: "LIBRAIRY",
    contentClass: "EXPLANATION",
    producer: "fixture-maker",
    examplePair: {
      policyId: "LAIDIES_WORK_AND_LIFE_EXAMPLES_V1",
      workplaceExample: "A manager checks whether an AI-drafted client promise is supported by the governing policy.",
      nonWorkExample: "A traveller checks whether an AI summary accurately reflects the current airline change rule before booking.",
      sharedMechanism: "In both settings, fluent language is a draft and the governing source remains the evidence for a consequential claim.",
      surfaceAdaptation: "Use the work case to establish the mechanism and the travel case to prove it transfers outside work."
    },
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
    explanationReasoningDesign: {
      benchmarkId: "LAIDIES_EXPLANATION_EDITORIAL_TRIAD_V1",
      benchmark: { path: reasoningBenchmarkPath, sha256: hash(reasoningBenchmark) },
      mode: "FULL",
      humanEntry: "A manager needs to know whether an AI-written promise is supported before she sends it.",
      firstPrinciplesSequence: ["The request defines the job.", "Context supplies candidate information.", "The model predicts a draft.", "Primary evidence and human judgment determine whether the promise is supportable."],
      fakeUnderstandingRisk: "A reader may repeat that AI can hallucinate without understanding why fluency is not evidence.",
      evidenceAnalysis: {
        claimUnderInspection: "A confident AI answer with a citation can be trusted.",
        primaryEvidence: "The exact policy and source record used in the worked case.",
        establishes: "Whether the promised detail appears in the governing policy.",
        doesNotEstablish: "That every other claim in the fluent draft is correct.",
        claimedImpact: "The citation makes the draft safe to send.",
        realConsequence: "The manager still needs claim-level evidence before making the promise.",
        aidbDisposition: "NOT_APPLICABLE_TO_SUBJECT",
        aidbReason: "This fixture teaches a durable mechanism rather than evaluating a current AIDB-covered story."
      },
      explainBackTest: "Explain why the draft and the evidence are different parts of the decision.",
      transferCase: "Decide whether an AI summary of a benefits policy supports a leave-entitlement claim.",
      usefulLanding: "Trace the consequential detail to governing evidence before sending.",
      rewindEraAdaptation: "Use a fax-cover-sheet handoff only if it clarifies the difference between the message and its supporting record.",
      imitationBoundary: "ADAPT_METHODS_KEEP_LAIDIES_VOICE_NEVER_DEFER_TO_AIDB"
    },
    representativeProofPlan: { highestRisk: "causal understanding", plannedProof: "one representative section", acceptanceOutcome: "reader explains and transfers it" },
    ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    status: "READY_TO_DRAFT"
  };
  const inspect = candidate => inspectContentProducerContract(candidate, { root }).errors;
  assert.deepEqual(inspect(contract), [], "complete prevention-first contract must match");

  const noExemplar = structuredClone(contract); noExemplar.positiveExemplars = [];
  assert.match(inspect(noExemplar).join("\n"), /positive exemplar/);
  const repeated = structuredClone(contract); repeated.knownFailurePreflight.dispositions.decorativeAnalogy.status = "OPEN";
  assert.match(inspect(repeated).join("\n"), /decorativeAnalogy is not CLEAR/);
  const sameCase = structuredClone(contract); sameCase.draftArchitecture.transferCase = sameCase.draftArchitecture.workedCase;
  assert.match(inspect(sameCase).join("\n"), /must be different/);
  const newsWithoutPredecessorSearch = structuredClone(contract); newsWithoutPredecessorSearch.contentClass = "NEWS";
  assert.match(inspect(newsWithoutPredecessorSearch).join("\n"), /predecessorSearch/);
  const missingPair = structuredClone(contract); delete missingPair.examplePair.nonWorkExample;
  assert.match(inspect(missingPair).join("\n"), /examplePair.nonWorkExample is required/);
  const relabelledPair = structuredClone(contract); relabelledPair.examplePair.nonWorkExample = relabelledPair.examplePair.workplaceExample;
  assert.match(inspect(relabelledPair).join("\n"), /must be genuinely different/);
  const compactCard = structuredClone(contract);
  compactCard.contentClass = "NEWS";
  compactCard.predecessorSearch = { searchedRoots: ["operations", "content"], queries: ["reader question", "Promptoscope", "mechanism"], matches: [], outcome: "FIRST", noComparableReason: "No comparable candidate exists." };
  compactCard.surfaceScale = "COMPACT_SERVICE_CARD";
  delete compactCard.examplePair;
  delete compactCard.draftArchitecture.transferCase;
  compactCard.draftArchitecture.compactTransferDisposition = "Omit the second context from this compact card; a substantial destination owns transfer.";
  delete compactCard.explanationReasoningDesign.transferCase;
  compactCard.explanationReasoningDesign.transferDisposition = "Omit transfer from this compact card and test it only in a substantial continuation.";
  compactCard.communicationDesign.mode = "PROPORTIONAL";
  compactCard.communicationDesign.explanationArc = { mode: "PROPORTIONAL", retainedMoves: ["human question", "visible mechanism", "small landing"], adaptation: "One compact example carries the complete action without becoming a substantial lesson." };
  compactCard.explanationReasoningDesign.mode = "PROPORTIONAL";
  compactCard.compactExample = {
    policyId: "LAIDIES_ONE_COMPLETE_EXAMPLE_V1",
    aiObject: "A reusable AI prompt for meeting-note summaries.",
    scenario: "The reader adds an instruction to name each decision owner.",
    change: "Add exactly one instruction about decision owners.",
    fixedConditions: "Use the same meeting notes and five-bullet limit.",
    comparison: "Compare the original and revised summaries.",
    failureSignal: "The revised summary drops a deadline the original retained.",
    nextAction: "Revise the prompt and rerun the same notes.",
    substantialTransferDisposition: "Not required in this compact card; a substantial destination owns transfer."
  };
  compactCard.candidateConsistency = {
    currentDomainTerms: ["work", "decision", "check"],
    retiredPredecessorTerms: []
  };
  assert.deepEqual(inspect(compactCard), [], "compact service card must use one complete example without a forced pair");
  const incompleteCompactCard = structuredClone(compactCard); delete incompleteCompactCard.compactExample.nextAction;
  assert.match(inspect(incompleteCompactCard).join("\n"), /compactExample.nextAction is required/);
  const staleCompactCard = structuredClone(compactCard);
  staleCompactCard.predecessorSearch.outcome = "SUCCESSOR";
  staleCompactCard.predecessorSearch.matches = [{ artifact: { path: badPath, sha256: hash(bad) }, disposition: "CURRENT_PREDECESSOR" }];
  staleCompactCard.predecessorSearch.selectedPredecessor = { path: badPath, sha256: hash(bad) };
  staleCompactCard.predecessorSearch.preserveAndImprove = "Preserve clarity while replacing the old cupboard example.";
  staleCompactCard.candidateConsistency.retiredPredecessorTerms = ["cupboard"];
  staleCompactCard.knownFailurePreflight.dispositions.joylessInstruction.preventionEvidence = "The cupboard joke keeps the tip light.";
  assert.match(inspect(staleCompactCard).join("\n"), /retired predecessor term "cupboard" leaked/);
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
  const missingReasoning = structuredClone(contract); delete missingReasoning.explanationReasoningDesign;
  assert.match(inspect(missingReasoning).join("\n"), /explanationReasoningDesign\.benchmarkId mismatch/);
  const feynmanNameOnly = structuredClone(contract); feynmanNameOnly.explanationReasoningDesign.humanEntry = "Feynman method";
  assert.match(inspect(feynmanNameOnly).join("\n"), /cannot be satisfied by naming a benchmark/);
  const missingEvidenceBoundary = structuredClone(contract); delete missingEvidenceBoundary.explanationReasoningDesign.evidenceAnalysis.doesNotEstablish;
  assert.match(inspect(missingEvidenceBoundary).join("\n"), /evidenceAnalysis\.doesNotEstablish is required/);
  const sameReasoningTest = structuredClone(contract); sameReasoningTest.explanationReasoningDesign.transferCase = sameReasoningTest.explanationReasoningDesign.explainBackTest;
  assert.match(inspect(sameReasoningTest).join("\n"), /explain-back and transfer must be different/);
  const laterRegistry = JSON.parse(fs.readFileSync(registry, "utf8"));
  laterRegistry.negativeExemplars.push({ id: "BAD-2", incidentId: "fixture-incident-2", appliesTo: ["EXPLANATION"], path: badPath, sha256: hash(bad), failureFamilies: ["missingMechanism"] });
  fs.writeFileSync(registry, JSON.stringify(laterRegistry));
  const omittedLaterFailure = structuredClone(contract); omittedLaterFailure.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(omittedLaterFailure).join("\n"), /every registered negative exemplar/);
  console.log("CONTENT PRODUCER CONTRACT CALIBRATION PASS valid=2 rejected=20 all_negatives=1 stale_registry=1 paired_examples=1 compact_example=1 compact_successor_consistency=1 predecessor_search=1 communication_design=1 explanation_arc=1 combined_reasoning=1 no_pastiche=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
