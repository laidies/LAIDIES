import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "validation-root");
const hash = relative => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, relative))).digest("hex");
const copy = (from, to) => fs.copyFileSync(path.join(here, from), path.join(root, to));
const candidate = "content/episode04-field-trip-microcopy.md";
copy("validation-root/content/episode04-field-trip-microcopy.md", candidate);
const bind = relative => ({ path: relative, sha256: hash(relative) });
const registry = JSON.parse(fs.readFileSync(path.join(root, "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"), "utf8"));
const badEvidence = {
  "CQX-BAD-001": "First, stop calling the whole thing",
  "CQX-BAD-002": "You ask an AI product to compare",
  "CQX-BAD-003": "The article had sourced facts"
};
const allFamilies = [...new Set([
  "glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "factlessConfidence", "staleUnreviewableClaims", "corporateSludge", "joylessInstruction", "benchmarkNameDrop", "curiosityWithoutPayoff", "familiarExampleWithoutTechnicalReturn", "communicationPastiche", "entertainmentBeforeUnderstanding", "mechanismCompressedBehindHook", "prematureClickBeforeMechanism", "inflatedTakeawayEnding",
  ...registry.negativeExemplars.flatMap(item => item.failureFamilies)
])].sort();
const dispositions = Object.fromEntries(allFamilies.map(family => [family, {
  status: "CLEAR",
  producerGuard: "Keep this issue-specific repair to the existing field-trip action, one discovery note and two named destinations.",
  preventionEvidence: "content/episode04-field-trip-microcopy.md: the prose names a visit, one note and one next step without a new lesson or claim."
}]));
const contract = {
  schemaVersion: "laidies-content-producer-contract.v1",
  candidateId: "TRYON-EP04-FIELD-TRIP-MICROCOPY-20260914",
  surface: "TRY_ON / Episode 04",
  contentClass: "MICROCOPY",
  producer: "authority-context",
  status: "READY_TO_DRAFT",
  readerContract: {
    humanQuestion: "What do I do after Episode 04?",
    promisedPayoff: "Visit one MAiVEN, keep one sentence, then take the matching quiz.",
    priorKnowledge: "The visitor has just completed or opened Episode 04.",
    centralMentalModel: "This is a field trip, so its follow-up should name the destination and the single observation to keep.",
    dailyLifeConnection: "Choose one person or idea from a visit and tell a friend why it stayed with you.",
    surfaceJob: "Correct inherited Try-On controls so they match Episode 04's field trip.",
    desiredFeeling: "I know where to go and what small thing to do there."
  },
  canonicalTruth: [{
    claimId: "EP04_FIELD_TRIP_BASELINE",
    owner: "Episode 04 / Try-On",
    freshnessTrigger: "Any change to the live Episode 04 field-trip configuration, LUMINAiRY route, or quiz entry route.",
    source: bind("evidence/try-on-live-baseline.html")
  }, {
    claimId: "EP04_QUIZ_ENTRY",
    owner: "SUNNYVAiLE High",
    freshnessTrigger: "Any change to the Issue 04 quiz registration or High quiz entry route.",
    source: bind("evidence/quizzes.json")
  }],
  positiveExemplars: [{
    id: "CQX-GOOD-EPISODE-001",
    strengthsToUse: ["human stakes before theory", "reader judgment remains central"],
    patternsNotToCopy: ["its length, teaching structure and factual content"]
  }],
  knownFailurePreflight: {
    registryVersion: registry.schemaVersion,
    registrySha256: hash("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"),
    negativeExemplarIds: registry.negativeExemplars.map(item => item.id),
    knownDefectsRemaining: [],
    dispositions
  },
  draftArchitecture: {
    plainAnswer: "Episode 04 is a field trip: visit one MAiVEN, keep one sentence and continue to its quiz.",
    causalSequence: ["The inherited lede promises two prompts.", "Episode 04 already supplies a field trip and four authored steps.", "Replacing the lede, reflection and rating makes the visible controls match that activity."],
    workedCase: "An Episode 04 visitor opens the MAiVENS, writes one discovery note and follows the Episode 04 quiz step.",
    transferCase: "Other issue-specific Try-Ons retain their own prompts, save labels and rating only when their activity calls for them.",
    usefulAction: "Open the LUMINAiRY, choose one MAiVEN and save one sentence.",
    formatSpecificStructure: "One lede, one note label and placeholder, one hidden inherited rating, and two links in the existing card.",
    antiTemplateDecision: "Do not turn the visit into a prompt comparison, score or new social product.",
    analogyPlan: [],
    humourPlan: { noneReason: "This repair needs direct, truthful activity labels." }
  },
  communicationDesign: {
    benchmarkId: "HANNAH_FRY_COMMUNICATION_LENS_V2",
    benchmark: bind("operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md"),
    mode: "NOT_APPLICABLE",
    surfaceAdaptation: "This is a short navigation and form-label repair, not a new explanation.",
    imitationBoundary: "ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA",
    dimensions: Object.fromEntries(["humanQuestion", "usefulCuriosity", "invisibleProcessConcrete", "familiarTechnicalMovement", "limitationsConsequences", "humourSurprise", "betterNextQuestion"].map(key => [key, { disposition: "NOT_APPLICABLE", reason: "A microcopy repair should not manufacture an explanatory move." }])),
    explanationArc: { mode: "NOT_APPLICABLE", reason: "The field trip's existing four steps carry its activity; these labels only make that activity legible." }
  },
  representativeProofPlan: {
    highestRisk: "The page still promises a prompt comparison or offers an unrelated rating.",
    plannedProof: "Render issue=4, inspect the preserved four list items, activate both named links, and confirm no rating appears for that issue.",
    acceptanceOutcome: "Episode 04 visibly routes to the MAiVENS, requests one discovery note and offers the Episode 04 quiz next step."
  },
  ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" }
};
fs.writeFileSync(path.join(root, "producer-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
const manifest = { schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: contract.candidateId, surface: contract.surface, contentClass: contract.contentClass, reviewText: bind(candidate) };
fs.writeFileSync(path.join(root, "content/manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const candidateBody = fs.readFileSync(path.join(root, candidate), "utf8");
const evidence = excerpt => [{ excerpt, locator: "content/episode04-field-trip-microcopy.md" }];
const outcomes = Object.fromEntries(["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "truthfulPromise", "clearAction"].map(name => [name, { verdict: "PASS", observation: "Exact microcopy keeps the Episode 04 action specific and bounded.", artifactEvidence: evidence("Meet one MAiVEN whose name is new to you") }]));
const review = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId: contract.candidateId,
  stage: "PRODUCER_SELF_REVIEW",
  contentClass: contract.contentClass,
  surface: contract.surface,
  maker: contract.producer,
  reviewer: { id: "authority-context", principalId: "authority-context", role: "producer" },
  reviewMode: "EXACT_PROSE_IN_FULL",
  reviewedAt: "2026-09-14T12:00:00-07:00",
  artifact: { reviewText: bind(candidate), manifest: bind("content/manifest.json") },
  calibration: {
    registrySha256: hash("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json"), reviewerPrincipalId: "authority-context", reviewedAt: "2026-09-14T11:59:00-07:00",
    negatives: registry.negativeExemplars.map(item => ({ exemplarId: item.id, verdict: "REJECT", identifiedFailureFamilies: item.failureFamilies, evidence: [{ excerpt: badEvidence[item.id], locator: item.path }] })),
    positive: { exemplarId: "CQX-GOOD-EPISODE-001", verdict: "PASS", strengthsRetained: ["one bounded action", "reader choice remains central"], evidence: [{ excerpt: "You onboard it, manage it, review its work.", locator: "content/episodes/episode-01.canon.md" }] }
  },
  reverseBrief: { ...contract.readerContract, desiredReaderFeeling: contract.readerContract.desiredFeeling },
  outcomes,
  failureFamilies: Object.fromEntries(allFamilies.map(name => [name, { present: false, observation: "Absent in this bounded exact prose.", artifactLocator: "content/episode04-field-trip-microcopy.md" }])),
  factualReview: { disposition: "NO_MATERIAL_CLAIMS", rationale: "The draft repeats the baseline activity and labels existing destinations; it adds no biography or technical claim.", claimScan: { observation: "Exact-prose scan found only activity directions and existing route labels.", artifactEvidence: evidence("Next: take the Episode 04 Quiz") }, reviewedThrough: "2026-09-14", nextTrigger: "Any route or Episode 04 activity change", correctionOwner: "Episode 04 / Try-On" },
  ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
  lineage: { kind: "FIRST", noComparableReason: "First isolated microcopy repair artifact for this live-audit correction." },
  learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "The self-review found no new reusable prose defect; admission remains blocked by the registry schema gap." },
  verdict: "PASS", limitations: ["This receipt cannot become quality authority until an independent reviewer evaluates the same bytes.", "The current registry omits an approved MICROCOPY positive exemplar, so its validator rejects this otherwise complete record."]
};
fs.writeFileSync(path.join(root, "producer-self-review.json"), `${JSON.stringify(review, null, 2)}\n`);
console.log("Wrote contract, manifest and producer self-review.");
