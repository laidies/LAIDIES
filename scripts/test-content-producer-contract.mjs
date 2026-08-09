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
  const sectionMapPath = "operations/product-stewards/library/fixture-section-teaching-map.json";
  const methodPath = "operations/product-stewards/library/fixture-drafting-method.md";
  const method = write(methodPath, "Plain conversational mechanism first; exact sources establish truth and LAiDIES teaching establishes the learning experience.\n");
  const sectionMap = write(sectionMapPath, JSON.stringify({
    schemaVersion: "laidies-section-teaching-map.v1",
    curriculumRule: "LOGICAL_PREREQUISITE_SEQUENCE_WITH_SECTION_GOALS_AND_ANSWERABLE_OUTCOME_QUESTIONS",
    units: [
      {
        routeEntryId: "intro",
        teachingGoal: "Give the reader a reason and an initial connected map.",
        questionsAnswered: ["Why does this system matter to my decision?"],
        sections: [{ sectionId: "intro-purpose", title: "Why this matters", depth: "STANDARD", teachingGoal: "Connect the system to a consequential decision.", prerequisiteConcepts: [], conceptsIntroduced: ["request", "decision"], relationshipsAdded: ["A request begins a path that ends in a decision."], questionsAnswered: ["Why should I understand this system?"], learnerEvidence: "The reader states the consequence in ordinary language." }]
      },
      {
        routeEntryId: "system-map",
        teachingGoal: "Connect context model evidence and human decision.",
        questionsAnswered: ["What happens between a request and a checked decision?"],
        sections: [{ sectionId: "system-path", title: "From request to checked decision", depth: "STANDARD", teachingGoal: "Trace the causal path without collapsing its parts.", prerequisiteConcepts: ["request", "decision"], conceptsIntroduced: ["context", "model", "evidence"], relationshipsAdded: ["Context supplies material while evidence supports the consequential claim."], questionsAnswered: ["How do context model evidence and judgement work together?"], learnerEvidence: "The reader draws and explains the path." }]
      }
    ]
  }));
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
      antiTemplateDecision: "Vary structure around the reader question; no repeated micro-template.",
      sectionTeachingMap: { path: sectionMapPath, sha256: hash(sectionMap) },
      productionMethod: { path: methodPath, sha256: hash(method) },
      systemSynthesis: {
        endState: "The reader can reconstruct how a request moves through context model evidence and human decision.",
        drawPrompt: "Draw request context model evidence and human decision with labelled arrows.",
        explainBackPrompt: "Explain why the fluent draft is not the supporting evidence.",
        applicationPrompt: "Apply the same connected model to an unfamiliar travel-policy answer.",
        relationshipClaims: [
          { fromConcept: "request", relationship: "supplies the job to", toConcept: "product", introducedAt: "intro" },
          { fromConcept: "context", relationship: "supplies current material to", toConcept: "model", introducedAt: "system-map" },
          { fromConcept: "evidence", relationship: "supports a consequential claim checked by", toConcept: "human decision", introducedAt: "system-map" }
        ],
        followUpQuestions: ["How does it work?", "Why does evidence matter?", "What connects context to the model?", "What changes if current evidence is absent?"]
      },
      readerRoute: {
        rule: "VISIBLE_TITLES_PREDICT_COVERAGE_AND_PREREQUISITES_PRECEDE_USE",
        entries: [
          {
            destinationId: "intro",
            kind: "INTRODUCTION",
            title: "Why AI decisions need your judgement",
            teachingGoal: "Give the reader a reason and an initial connected map.",
            questionsAnswered: ["Why does this system matter to my decision?"],
            coverage: "Purpose, consequence and the practical payoff.",
            coverageTerms: ["AI", "judgement"],
            prerequisiteIds: [],
            conceptsIntroduced: ["request", "decision"],
            connectionsAdded: ["A request begins a path that ends in a human decision."],
            readerCanNow: "State why the system matters to the decision."
          },
          {
            destinationId: "system-map",
            kind: "CHAPTER",
            title: "What an AI system does with a request",
            teachingGoal: "Connect context model evidence and human decision.",
            questionsAnswered: ["What happens between a request and a checked decision?"],
            coverage: "Input, model, evidence and human decision.",
            coverageTerms: ["AI", "system", "request"],
            prerequisiteIds: ["intro"],
            conceptsIntroduced: ["context", "model", "evidence"],
            connectionsAdded: ["Context supplies material to a model while evidence supports the consequential claim."],
            readerCanNow: "Draw and explain the connected request-to-decision system."
          }
        ]
      }
    },
    communicationDesign: {
      benchmarkId: "HANNAH_FRY_COMMUNICATION_LENS_V2",
      benchmark: { path: benchmarkPath, sha256: hash(benchmark) },
      mode: "FULL",
      surfaceAdaptation: "Use the benchmark as an explanation-quality lens for one connected written explanation, not as a copied talk format.",
      imitationBoundary: "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA",
      readerExperienceDesign: {
        dominantRelationship: "A smart, funny and enthusiastic friend helps the reader see why the mechanism matters, without speaking like a course module.",
        readerScaffolding: "HIDDEN_IN_PROSE",
        worldIntegration: {
          mode: "EMBEDDED_AND_LOAD_BEARING",
          locationOrCanon: "The LIBRAiRY and NewsStand",
          teachingJob: "The LIBRAiRY owns the durable mechanism while the NewsStand applies it to current claims.",
          plannedEvidence: "Route the reader from the enduring system map to one current claim she can inspect."
        },
        voiceAcrossArtifact: {
          beginning: "Open in direct conversation with a specific human stake and point of view.",
          middle: "Carry warmth, enthusiasm and precise humour through the mechanism itself.",
          ending: "Land on a useful action in the same relationship rather than switching to assessment language."
        },
        purposeThreads: {
          practicalUse: "Show how system understanding improves an actual result.",
          informationJudgment: "Show how the same understanding exposes an unsupported claim.",
          civicParticipation: "Connect the mechanism to a community or public discussion.",
          consequentialAgency: "Leave the reader able to challenge a consequential system choice."
        }
      },
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

  const noExemplar = structuredClone(contract); noExemplar.positiveExemplars = [];
  assert.match(inspect(noExemplar).join("\n"), /positive exemplar/);
  const repeated = structuredClone(contract); repeated.knownFailurePreflight.dispositions.decorativeAnalogy.status = "OPEN";
  assert.match(inspect(repeated).join("\n"), /decorativeAnalogy is not CLEAR/);
  const sameCase = structuredClone(contract); sameCase.draftArchitecture.transferCase = sameCase.draftArchitecture.workedCase;
  assert.match(inspect(sameCase).join("\n"), /must be different/);
  const badAnalogy = structuredClone(contract); badAnalogy.draftArchitecture.analogyPlan = [{ concept: "model", analogy: "Cher" }];
  assert.match(inspect(badAnalogy).join("\n"), /analogyPlan\[0\]\.mapping/);
  const checkboxAnalogy = structuredClone(contract); checkboxAnalogy.draftArchitecture.analogyPlan = [{ concept: "model", analogy: "a wardrobe", mapping: "labels map to labels", faithfulMechanism: "claims fidelity", whySimpler: "claims simplicity", whyItImprovesUnderstanding: "claims improvement" }];
  assert.match(inspect(checkboxAnalogy).join("\n"), /analogyPlan\[0\]\.transferCheck/);
  const remaining = structuredClone(contract); remaining.knownFailurePreflight.knownDefectsRemaining = ["templateRepetition"];
  assert.match(inspect(remaining).join("\n"), /known defects remain/);
  const staleRegistry = structuredClone(contract); staleRegistry.knownFailurePreflight.registrySha256 = "0".repeat(64);
  assert.match(inspect(staleRegistry).join("\n"), /registrySha256 is stale/);
  const nameOnlyBenchmark = structuredClone(contract); nameOnlyBenchmark.communicationDesign.dimensions.usefulCuriosity.plannedEvidence = "Hannah Fry inspired";
  assert.match(inspect(nameOnlyBenchmark).join("\n"), /cannot be satisfied by naming Hannah Fry/);
  const imitation = structuredClone(contract); imitation.communicationDesign.imitationBoundary = "WRITE_IN_HANNAH_FRY_STYLE";
  assert.match(inspect(imitation).join("\n"), /must prohibit Hannah Fry voice or persona imitation/);
  const exposedScaffolding = structuredClone(contract); exposedScaffolding.communicationDesign.readerExperienceDesign.readerScaffolding = "SHOW_OBJECTIVES";
  assert.match(inspect(exposedScaffolding).join("\n"), /hide internal learning scaffolding/);
  const missingPurposeThread = structuredClone(contract); delete missingPurposeThread.communicationDesign.readerExperienceDesign.purposeThreads.civicParticipation;
  assert.match(inspect(missingPurposeThread).join("\n"), /purposeThreads.civicParticipation is required/);
  const missingArc = structuredClone(contract); delete missingArc.communicationDesign.explanationArc;
  assert.match(inspect(missingArc).join("\n"), /default substantial-explanation arc/);
  const wrongArcOrder = structuredClone(contract); wrongArcOrder.communicationDesign.explanationArc.order = "REVEAL_THEN_EXPLAIN";
  assert.match(inspect(wrongArcOrder).join("\n"), /must preserve the default explanatory sequence/);
  const missingReaderRoute = structuredClone(contract); delete missingReaderRoute.draftArchitecture.readerRoute;
  assert.match(inspect(missingReaderRoute).join("\n"), /requires a readerRoute/);
  const missingMethod = structuredClone(contract); delete missingMethod.draftArchitecture.productionMethod;
  assert.match(inspect(missingMethod).join("\n"), /productionMethod: exact path and SHA-256 are required/);
  const missingTeachingGoal = structuredClone(contract); delete missingTeachingGoal.draftArchitecture.readerRoute.entries[1].teachingGoal;
  assert.match(inspect(missingTeachingGoal).join("\n"), /teachingGoal is required/);
  const missingOutcomeQuestions = structuredClone(contract); delete missingOutcomeQuestions.draftArchitecture.readerRoute.entries[1].questionsAnswered;
  assert.match(inspect(missingOutcomeQuestions).join("\n"), /questionsAnswered requires at least one answerable outcome question/);
  const incompleteSectionMap = JSON.parse(fs.readFileSync(sectionMap, "utf8"));
  incompleteSectionMap.units = incompleteSectionMap.units.slice(0, 1);
  fs.writeFileSync(sectionMap, JSON.stringify(incompleteSectionMap));
  const missingMappedUnit = structuredClone(contract); missingMappedUnit.draftArchitecture.sectionTeachingMap.sha256 = hash(sectionMap);
  assert.match(inspect(missingMappedUnit).join("\n"), /readerRoute entry lacks section teaching map unit: system-map/);
  const invalidSectionMap = JSON.parse(fs.readFileSync(sectionMap, "utf8"));
  delete invalidSectionMap.units[0].sections[0].questionsAnswered;
  fs.writeFileSync(sectionMap, JSON.stringify(invalidSectionMap));
  const sectionWithoutOutcome = structuredClone(contract); sectionWithoutOutcome.draftArchitecture.sectionTeachingMap.sha256 = hash(sectionMap);
  assert.match(inspect(sectionWithoutOutcome).join("\n"), /questionsAnswered requires at least one answerable outcome question/);
  fs.writeFileSync(sectionMap, JSON.stringify({
    schemaVersion: "laidies-section-teaching-map.v1",
    curriculumRule: "LOGICAL_PREREQUISITE_SEQUENCE_WITH_SECTION_GOALS_AND_ANSWERABLE_OUTCOME_QUESTIONS",
    units: [{ routeEntryId: "intro", teachingGoal: "Teach the opening.", questionsAnswered: ["Why?"], sections: [
      { sectionId: "duplicate", title: "One", depth: "STANDARD", teachingGoal: "Teach one.", prerequisiteConcepts: [], conceptsIntroduced: ["one"], relationshipsAdded: ["One connects to two."], questionsAnswered: ["What is one?"], learnerEvidence: "Explain one." },
      { sectionId: "duplicate", title: "Two", depth: "STANDARD", teachingGoal: "Teach two.", prerequisiteConcepts: ["one"], conceptsIntroduced: ["two"], relationshipsAdded: ["Two follows one."], questionsAnswered: ["What is two?"], learnerEvidence: "Explain two." }
    ] }]
  }));
  const duplicateSection = structuredClone(contract); duplicateSection.draftArchitecture.sectionTeachingMap.sha256 = hash(sectionMap);
  assert.match(inspect(duplicateSection).join("\n"), /section teaching map duplicates sectionId: duplicate/);
  fs.writeFileSync(sectionMap, JSON.stringify({
    schemaVersion: "laidies-section-teaching-map.v1",
    curriculumRule: "LOGICAL_PREREQUISITE_SEQUENCE_WITH_SECTION_GOALS_AND_ANSWERABLE_OUTCOME_QUESTIONS",
    units: [
      { routeEntryId: "intro", teachingGoal: "Give the reader a reason and an initial connected map.", questionsAnswered: ["Why does this system matter to my decision?"], sections: [{ sectionId: "intro-purpose", title: "Why this matters", depth: "STANDARD", teachingGoal: "Connect the system to a consequential decision.", prerequisiteConcepts: [], conceptsIntroduced: ["request", "decision"], relationshipsAdded: ["A request begins a path that ends in a decision."], questionsAnswered: ["Why should I understand this system?"], learnerEvidence: "The reader states the consequence in ordinary language." }] },
      { routeEntryId: "system-map", teachingGoal: "Connect context model evidence and human decision.", questionsAnswered: ["What happens between a request and a checked decision?"], sections: [{ sectionId: "system-path", title: "From request to checked decision", depth: "STANDARD", teachingGoal: "Trace the causal path without collapsing its parts.", prerequisiteConcepts: ["request", "decision"], conceptsIntroduced: ["context", "model", "evidence"], relationshipsAdded: ["Context supplies material while evidence supports the consequential claim."], questionsAnswered: ["How do context model evidence and judgement work together?"], learnerEvidence: "The reader draws and explains the path." }] }
    ]
  }));
  contract.draftArchitecture.sectionTeachingMap.sha256 = hash(sectionMap);
  const opaqueReaderTitle = structuredClone(contract); opaqueReaderTitle.draftArchitecture.readerRoute.entries[1].title = "What the system has now";
  assert.match(inspect(opaqueReaderTitle).join("\n"), /known opaque Library heading/);
  const hiddenPrerequisite = structuredClone(contract); hiddenPrerequisite.draftArchitecture.readerRoute.entries[1].prerequisiteIds = ["model-definition"];
  assert.match(inspect(hiddenPrerequisite).join("\n"), /prerequisite model-definition must appear before/);
  const missingSynthesis = structuredClone(contract); delete missingSynthesis.draftArchitecture.systemSynthesis.drawPrompt;
  assert.match(inspect(missingSynthesis).join("\n"), /systemSynthesis.drawPrompt is required/);
  const isolatedChapter = structuredClone(contract); isolatedChapter.draftArchitecture.readerRoute.entries[1].connectionsAdded = [];
  assert.match(inspect(isolatedChapter).join("\n"), /connectionsAdded requires at least one relationship/);
  const laterRegistry = JSON.parse(fs.readFileSync(registry, "utf8"));
  laterRegistry.negativeExemplars.push({ id: "BAD-2", incidentId: "fixture-incident-2", appliesTo: ["EXPLANATION"], path: badPath, sha256: hash(bad), failureFamilies: ["missingMechanism"] });
  fs.writeFileSync(registry, JSON.stringify(laterRegistry));
  const omittedLaterFailure = structuredClone(contract); omittedLaterFailure.knownFailurePreflight.registrySha256 = hash(registry);
  assert.match(inspect(omittedLaterFailure).join("\n"), /every registered negative exemplar/);
  console.log("CONTENT PRODUCER CONTRACT CALIBRATION PASS valid=1 rejected=23 all_negatives=1 stale_registry=1 communication_design=1 explanation_arc=1 no_pastiche=1 reader_route=1 production_method=1 section_goals=1 outcome_questions=1 section_map=1 prerequisite_order=1 system_synthesis=1 connected_chapters=1 hidden_scaffolding=1 four_part_purpose=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
