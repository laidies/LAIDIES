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
  const pipelinePath = "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json";
  const workOrdersPath = "operations/product-stewards/learning-content-ecosystem/content-work-orders.json";
  const editorialMethodPath = "operations/product-stewards/newsstand/EDITORIAL-PRODUCTION-METHOD-V2.md";
  const storyMethodPath = "operations/product-stewards/newsstand/NEWSSTAND-STORY-TEMPLATE.md";
  const premisePath = "operations/product-stewards/newsstand/candidates/fixture-premise.md";
  const bad = write(badPath, "A disconnected glossary with decorative comparisons and no useful decision.\n");
  const good = write(goodPath, "One real problem moves through a mechanism, consequence and useful action.\n");
  const source = write(sourcePath, "Authoritative source fixture.\n");
  const benchmark = write(benchmarkPath, "HANNAH_FRY_COMMUNICATION_LENS_V1 test fixture.\n");
  const reasoningBenchmark = write(reasoningBenchmarkPath, "LAIDIES_EXPLANATION_EDITORIAL_TRIAD_V1 test fixture.\n");
  const pipeline = write(pipelinePath, JSON.stringify({ formats: [{ id: "promptoscope" }, { id: "news_daily" }] }));
  const editorialMethod = write(editorialMethodPath, "Premise-first reporting and usefulness method fixture.\n");
  const storyMethod = write(storyMethodPath, "Signal to evidence to reader-job route fixture.\n");
  const premise = write(premisePath, "Reader question, evidence, AIDB disposition and format decision fixture.\n");
  write(workOrdersPath, JSON.stringify({ workOrders: [{
    id: "fixture", surface: "NEWSSTAND", publicationFormatIds: ["promptoscope", "news_daily"],
    formatRouting: [
      { publicationFormatId: "promptoscope", relationship: "PRIMARY_OUTPUT", contributionJob: "Teach one memorable ordinary-life AI behaviour.", sourceVersionIds: ["fixture-source-v1"] },
      { publicationFormatId: "news_daily", relationship: "PRIMARY_OUTPUT", contributionJob: "Explain one current development clearly.", sourceVersionIds: ["fixture-source-v1"] }
    ]
  }] }));
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
  compactCard.candidateId = "fixture";
  compactCard.publicationPlan = {
    workOrderId: "fixture",
    formatId: "promptoscope",
    outputUnit: "SERVICE_COLUMN",
    relationship: "PRIMARY_OUTPUT",
    contributionJob: "Teach one memorable ordinary-life AI behaviour.",
    sourceVersionIds: ["fixture-source-v1"],
    writingMode: "FORMAT_NATIVE_SERVICE",
    writingModeReason: "The compact forecast teaches one ordinary-life AI behaviour rather than reporting a dated event.",
    pipelineRegistry: { path: pipelinePath, sha256: hash(pipeline) },
    editorialMethod: { path: editorialMethodPath, sha256: hash(editorialMethod) },
    storyMethod: { path: storyMethodPath, sha256: hash(storyMethod) },
    premise: { path: premisePath, sha256: hash(premise) },
    qualification: {
      readerQuestion: "Why did the AI confidently invent what was in my cupboard?",
      priorKnowledge: "The reader knows the answer was wrong but not why the model filled the gap.",
      unresolvedNeed: "She needs one memorable way to spot and correct unsupported inference.",
      whyNow: "The governed source and exact compact example are current.",
      uniquePayoff: "One funny scene makes the model behaviour recognizable outside work.",
      nearestAlternativeFormatId: "paige_ai_tip",
      whyAlternativeWrong: "Paige is an action-first work column; this is an ordinary-life diagnostic forecast.",
      aidbDisposition: "NOT_COVERED"
    }
  };
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
  const missingPublicationPlan = structuredClone(compactCard); delete missingPublicationPlan.publicationPlan;
  assert.match(inspect(missingPublicationPlan).join("\n"), /publicationPlan\.workOrderId/);
  const mismatchedWorkOrder = structuredClone(compactCard); mismatchedWorkOrder.publicationPlan.contributionJob = "A different job.";
  assert.match(inspect(mismatchedWorkOrder).join("\n"), /contributionJob does not match/);
  const sameNearestFormat = structuredClone(compactCard); sameNearestFormat.publicationPlan.qualification.nearestAlternativeFormatId = "promptoscope";
  assert.match(inspect(sameNearestFormat).join("\n"), /nearest alternative format must differ/);
  const daily = structuredClone(contract);
  daily.contentClass = "NEWS";
  daily.surface = "NEWSSTAND";
  daily.communicationDesign.mode = "PROPORTIONAL";
  daily.communicationDesign.explanationArc = { mode: "PROPORTIONAL", retainedMoves: ["human question", "visible mechanism", "evidence boundary", "transfer", "action"], adaptation: "The Daily answers first, makes the mechanism visible and lands on one decision without suspense." };
  daily.explanationReasoningDesign.mode = "PROPORTIONAL";
  daily.predecessorSearch = { searchedRoots: ["operations", "content"], queries: ["reader question", "Daily", "mechanism"], matches: [], outcome: "FIRST", noComparableReason: "No comparable candidate exists." };
  daily.publicationPlan = structuredClone(compactCard.publicationPlan);
  daily.publicationPlan.formatId = "news_daily";
  daily.publicationPlan.outputUnit = "STORY_CANDIDATE";
  daily.publicationPlan.contributionJob = "Explain one current development clearly.";
  daily.publicationPlan.writingMode = "PLAIN_LANGUAGE_EXPLAINER";
  daily.publicationPlan.qualification.nearestAlternativeFormatId = "news_breaking";
  daily.publicationPlan.issueBoundary = "STORY_REVIEW_PRECEDES_SEPARATE_DATED_ISSUE_ASSEMBLY";
  daily.publicationPlan.issueAssemblyDisposition = "Assemble only after story admission.";
  daily.publicationPlan.lengthBudget = { minimumWords: 450, maximumWords: 900, reason: "Keep one Daily lead proportionate inside a multi-element paper.", sectionJobs: ["event", "mechanism", "evidence", "transfer", "action"] };
  daily.publicationPlan.headlineRealityAssessment = {
    aidbRole: "DETECTION_LENS_ONLY",
    headlineOrClaim: "A study found private AI chats online.",
    ordinaryReaderTakeaway: "My ordinary private chat may have been silently posted.",
    originalEvidence: "A study of complete developer files deliberately posted publicly.",
    establishes: "Some deliberately public complete files contained sensitive material.",
    doesNotEstablish: "Ordinary private consumer chats were silently published.",
    scopeLimits: {
      population: "Developers and researchers who published complete technical files.",
      comparison: "Selected visible answers were distinguished from complete files.",
      measurement: "A bounded study scan, not a census of consumer chats.",
      date: "The tested provider behavior and files were dated to the study period.",
      otherLimits: "Author-reported results were not independently reproduced in the fixture."
    },
    realConsequence: "People publishing complete files need a safer release process.",
    directlyAffected: "Developers, researchers and teams publishing complete files.",
    unknowns: "Current universal provider behavior is not established.",
    materialMismatch: false,
    mismatchReason: "The fixture treats the claim as accurately bounded and needs explanation, not correction."
  };
  daily.publicationPlan.readerEntry = {
    likelyFear: "The reader may think an ordinary private chat was exposed.",
    immediateCorrection: "The example finding concerns deliberately shared developer files, not silent publication of an ordinary private chat.",
    actualActor: "A developer chooses to share a diagnostic file.",
    ordinaryObject: "A behind-the-scenes file created by software while it completes a task.",
    sharingReason: "The developer shares it so another person can inspect how the work happened.",
    directAudience: "People who build with AI and publish complete diagnostic files.",
    ordinaryReaderImpact: "Copying a selected answer is different from publishing the complete behind-the-scenes file.",
    whyLaidiesCovers: "The distinction prevents an alarming headline from becoming an every-chat panic.",
    likelyMisreadMaterial: false,
    boundaryWithinWords: 120,
    correctionLocation: "OPENING",
    technicalLabelsDeferred: ["task record", "work log", "raw session", "agent trace"],
    impactLadder: {
      ordinaryPrivateChat: "Not the demonstrated route.",
      selectedAnswer: "Share only the answer deliberately chosen.",
      diagnosticFile: "Ask what it contains and use an approved route.",
      completeDeveloperFile: "Directly affected when deliberately published."
    }
  };
  assert.deepEqual(inspect(daily), [], "Daily story contract must bind a proportional producer-side word budget");
  const missingReaderEntry = structuredClone(daily); delete missingReaderEntry.publicationPlan.readerEntry;
  assert.match(inspect(missingReaderEntry).join("\n"), /readerEntry\.likelyFear is required/);
  const delayedBoundary = structuredClone(daily); delayedBoundary.publicationPlan.readerEntry.boundaryWithinWords = 180;
  assert.match(inspect(delayedBoundary).join("\n"), /within the first 120 words/);
  const wrongRealityMode = structuredClone(daily); wrongRealityMode.publicationPlan.readerEntry.likelyMisreadMaterial = true;
  wrongRealityMode.publicationPlan.readerEntry.correctionLocation = "HEADLINE_AND_STANDFIRST";
  assert.match(inspect(wrongRealityMode).join("\n"), /requires HEADLINE_REALITY_CHECK/);
  const missingRealityAssessment = structuredClone(daily); delete missingRealityAssessment.publicationPlan.headlineRealityAssessment;
  assert.match(inspect(missingRealityAssessment).join("\n"), /headlineRealityAssessment\.headlineOrClaim is required/);
  const materialMismatchWrongMode = structuredClone(daily); materialMismatchWrongMode.publicationPlan.headlineRealityAssessment.materialMismatch = true;
  assert.match(inspect(materialMismatchWrongMode).join("\n"), /material headline\/evidence mismatch requires HEADLINE_REALITY_CHECK/);
  const manufacturedRealityCheck = structuredClone(daily); manufacturedRealityCheck.publicationPlan.writingMode = "HEADLINE_REALITY_CHECK";
  assert.match(inspect(manufacturedRealityCheck).join("\n"), /no material headline\/evidence mismatch requires PLAIN_LANGUAGE_EXPLAINER/);
  const realityCheck = structuredClone(daily);
  realityCheck.publicationPlan.writingMode = "HEADLINE_REALITY_CHECK";
  realityCheck.publicationPlan.headlineRealityAssessment.materialMismatch = true;
  realityCheck.publicationPlan.headlineRealityAssessment.publicItem = {
    itemType: "NEWSLETTER_REPORT",
    headlineOrTitle: "A precise public headline",
    publisher: "A public newsletter",
    publishedAt: "2026-08-12",
    url: "https://example.com/report",
    fairSummary: "The report says researchers cracked hidden AI reasoning and recovered secrets from public records.",
    apparentMeaning: "An ordinary reader may think familiar private chats were cracked.",
    underlyingPrimary: {
      itemType: "RESEARCH_PREPRINT",
      headlineOrTitle: "A precise research title",
      publisher: "A public research repository",
      publishedAt: "2026-08-10",
      url: "https://example.com/paper"
    }
  };
  realityCheck.publicationPlan.readerEntry.likelyMisreadMaterial = true;
  realityCheck.publicationPlan.readerEntry.correctionLocation = "HEADLINE_AND_STANDFIRST";
  realityCheck.publicationPlan.readerEntry.sharingJourney = {
    toolContext: "A developer uses an AI coding tool.",
    recordCreation: "The tool saves a machine-readable record of the run.",
    visibleContents: "The record contains instructions, visible answers and tool actions.",
    additionalContents: "It also contains an opaque field the person cannot inspect.",
    sender: "The developer or researcher who ran the task.",
    shareAction: "That person deliberately uploads the original saved record.",
    destination: "A public GitHub or Hugging Face repository.",
    purpose: "Other people can inspect or reproduce the work.",
    recipientAccess: "Anyone can download the public record.",
    directStudyBoundary: "The study examined deliberately public developer and research records."
  };
  realityCheck.publicationPlan.readerEntry.actionBoundaries = {
    ordinaryPrivateChat: "Not the route studied.",
    selectedVisibleText: "Selecting visible words and pasting only those words does not move the saved run record.",
    publicChatLink: "A public chat link shares the visible conversation and is a different route.",
    ordinaryMarkdownFile: "A Markdown file shares readable text and was not the category studied.",
    requestedDiagnosticRecord: "A related precaution, not a directly studied group.",
    publishedRawRun: "The directly studied route."
  };
  realityCheck.publicationPlan.readerEntry.attackMechanism = {
    ordinaryMeaning: "A deliberate security test rather than an automatic event.",
    testedAction: "Researchers moved an unreadable bundle from a strong model to a weaker sibling and prompted it to reveal the contents.",
    stoppedWorkingMeaning: "That exact model-to-model decoding method stopped revealing the contents after disclosure.",
    limit: "The result does not prove every privacy problem is fixed."
  };
  realityCheck.publicationPlan.readerEntry.ordinaryFileBoundary = {
    fileType: "Markdown (.md)",
    plainMeaning: "A readable plain-text document with simple marks for headings and lists.",
    whatSharingMoves: "One file sends its visible words; a project folder can send other files too.",
    studyBoundary: "The paper studied session records with opaque bundles, not Markdown as a category."
  };
  realityCheck.publicationPlan.readerEntry.informationFlow = {
    personInput: "A question, pasted text, photo, document, spreadsheet or project folder given to the AI.",
    visibleOutput: "The answer, summary, image, plan or finished file the person can inspect.",
    automaticJobRecord: "A file some advanced tools create while working that records instructions, replies, opened files, actions and information passed between steps.",
    laterAudienceAction: "A person or research project may later place that job file where another person, a private group or the public can access it."
  };
  realityCheck.publicationPlan.readerEntry.readerSpectrum = {
    phoneQuestions: "A person asks ChatGPT or Claude questions on a phone.",
    workMaterial: "A person pastes work text or uploads a document, image or spreadsheet.",
    projectWideTool: "A tool can open files, run commands or work through an entire project."
  };
  realityCheck.publicationPlan.readerEntry.publicMeaning = {
    outsideAudience: "People outside the owner's private account or team can find and download the material.",
    publisherActor: "The person or research project, not the AI, performs the publication action.",
    concreteRoute: "The job file is included in a public project folder or collection of research records.",
    privateContrast: "A private workspace or file sent to one named person has a narrower audience."
  };
  realityCheck.publicationPlan.readerEntry.riskBoundary = {
    ordinaryAiMadeOutput: "An AI-written paragraph, image, presentation or ordinary document does not automatically carry the hidden bundle studied.",
    directlyStudiedObject: "A complete job file automatically created by certain advanced tools and deliberately placed online is the directly studied object."
  };
  realityCheck.publicationPlan.readerEntry.securityTerms = {
    apiKey: "A password issued to software that may allow use or charges.",
    accessToken: "A temporary digital pass.",
    privateKey: "Secret proof used to unlock access or confirm identity."
  };
  realityCheck.publicationPlan.readerEntry.unintendedContents = {
    concreteExamples: ["API keys", "passwords", "access tokens"],
    observedOriginExample: "A coding agent asked to clean a repository repeated API keys in hidden reasoning.",
    originUncertainty: "The paper could not determine the origin of every recovered item."
  };
  assert.deepEqual(inspect(realityCheck), [], "Headline Reality Check must bind the public item and complete sharing journey");
  const missingPublicItem = structuredClone(realityCheck); delete missingPublicItem.publicationPlan.headlineRealityAssessment.publicItem;
  assert.match(inspect(missingPublicItem).join("\n"), /publicItem\.headlineOrTitle is required/);
  const missingJourney = structuredClone(realityCheck); delete missingJourney.publicationPlan.readerEntry.sharingJourney.destination;
  assert.match(inspect(missingJourney).join("\n"), /sharingJourney\.destination is required/);
  const missingActionBoundary = structuredClone(realityCheck); delete missingActionBoundary.publicationPlan.readerEntry.actionBoundaries.selectedVisibleText;
  assert.match(inspect(missingActionBoundary).join("\n"), /actionBoundaries\.selectedVisibleText is required/);
  const missingUnderlyingPrimary = structuredClone(realityCheck); delete missingUnderlyingPrimary.publicationPlan.headlineRealityAssessment.publicItem.underlyingPrimary;
  assert.match(inspect(missingUnderlyingPrimary).join("\n"), /underlyingPrimary\.headlineOrTitle is required/);
  const missingAttack = structuredClone(realityCheck); delete missingAttack.publicationPlan.readerEntry.attackMechanism.testedAction;
  assert.match(inspect(missingAttack).join("\n"), /attackMechanism\.testedAction is required/);
  const missingMarkdown = structuredClone(realityCheck); delete missingMarkdown.publicationPlan.readerEntry.ordinaryFileBoundary.whatSharingMoves;
  assert.match(inspect(missingMarkdown).join("\n"), /ordinaryFileBoundary\.whatSharingMoves is required/);
  const missingInformationFlow = structuredClone(realityCheck); delete missingInformationFlow.publicationPlan.readerEntry.informationFlow.automaticJobRecord;
  assert.match(inspect(missingInformationFlow).join("\n"), /informationFlow\.automaticJobRecord is required/);
  const missingReaderSpectrum = structuredClone(realityCheck); delete missingReaderSpectrum.publicationPlan.readerEntry.readerSpectrum.workMaterial;
  assert.match(inspect(missingReaderSpectrum).join("\n"), /readerSpectrum\.workMaterial is required/);
  const missingPublicMeaning = structuredClone(realityCheck); delete missingPublicMeaning.publicationPlan.readerEntry.publicMeaning.outsideAudience;
  assert.match(inspect(missingPublicMeaning).join("\n"), /publicMeaning\.outsideAudience is required/);
  const missingRiskBoundary = structuredClone(realityCheck); delete missingRiskBoundary.publicationPlan.readerEntry.riskBoundary.ordinaryAiMadeOutput;
  assert.match(inspect(missingRiskBoundary).join("\n"), /riskBoundary\.ordinaryAiMadeOutput is required/);
  const missingSecurityMeaning = structuredClone(realityCheck); delete missingSecurityMeaning.publicationPlan.readerEntry.securityTerms.apiKey;
  assert.match(inspect(missingSecurityMeaning).join("\n"), /securityTerms\.apiKey is required/);
  const missingUnintendedOrigin = structuredClone(realityCheck); delete missingUnintendedOrigin.publicationPlan.readerEntry.unintendedContents.observedOriginExample;
  assert.match(inspect(missingUnintendedOrigin).join("\n"), /unintendedContents\.observedOriginExample is required/);
  const overlongDailyBudget = structuredClone(daily); overlongDailyBudget.publicationPlan.lengthBudget.maximumWords = 1400;
  assert.match(inspect(overlongDailyBudget).join("\n"), /maximumWords must be no more than 900/);
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
  console.log("CONTENT PRODUCER CONTRACT CALIBRATION PASS valid=3 rejected=21 all_negatives=1 stale_registry=1 paired_examples=1 compact_example=1 compact_successor_consistency=1 predecessor_search=1 communication_design=1 explanation_arc=1 combined_reasoning=1 daily_length_budget=1 no_pastiche=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
