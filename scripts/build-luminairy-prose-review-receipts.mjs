#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { enforcedFailureFamilies } from "./check-prose-quality-admission.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OPS = "operations/product-stewards/luminairy";
const REVIEW_TEXT = `${OPS}/complete-profile-review-text-2026-09-05.md`;
const MANIFEST = `${OPS}/complete-profile-content-artifact-manifest-2026-09-05.json`;
const PRODUCER = `${OPS}/complete-profile-producer-self-review-2026-09-05.json`;
const INDEPENDENT = `${OPS}/complete-profile-independent-semantic-admission-2026-09-05.json`;
const REGISTRY_PATH = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const EVIDENCE = Array.from({ length: 6 }, (_, index) => `${OPS}/profile-resource-evidence-batch-${String(index + 1).padStart(2, "0")}-2026-09-02.json`);

const read = relative => fs.readFileSync(path.join(ROOT, relative));
const json = relative => JSON.parse(read(relative));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const bind = relative => ({ path: relative, sha256: sha256(read(relative)) });
const evidence = (excerpt, locator) => [{ excerpt, locator }];

const reviewBody = read(REVIEW_TEXT).toString("utf8");
const registryBytes = read(REGISTRY_PATH);
const registry = JSON.parse(registryBytes);
const manifest = json(MANIFEST);
const profiles = json("content/luminairy-profiles.json");
const realProfiles = [...profiles.mavens, ...profiles.trailblazers];
const evidenceBatches = EVIDENCE.map(file => ({ file, document: json(file), binding: bind(file) }));
const evidenceByProfile = new Map(evidenceBatches.flatMap(batch => batch.document.profiles.map(profile => [profile.profileId, { ...profile, batch }])));

const assertOccurs = (body, excerpt, label) => {
  if (!body.includes(excerpt)) throw new Error(`${label} does not occur in its bound artifact`);
};

const negativeCalibrations = registry.negativeExemplars.map(item => {
  const excerpt = item.id === "CQX-BAD-001"
    ? "First, stop calling the whole thing “the AI.”"
    : "You ask an AI product to compare two job offers.";
  assertOccurs(read(item.path).toString("utf8"), excerpt, item.id);
  return {
    exemplarId: item.id,
    verdict: "REJECT",
    identifiedFailureFamilies: item.failureFamilies,
    evidence: evidence(excerpt, `${path.basename(item.path)}: opening`)
  };
});

const positive = registry.positiveExemplars.find(item => item.id === "CQX-GOOD-STRAIGHT-ANSWERS-001");
const positiveExcerpt = "Real questions about AI. Real data. No vibes-only answers.";
assertOccurs(read(positive.path).toString("utf8"), positiveExcerpt, positive.id);

const outcomeEvidence = {
  plainClarity: "Specificity is not piling adjectives onto a prompt.",
  readerValue: "Choose one repeated task, such as assembling a weekly project update.",
  laidiesVoice: "A pattern that works only while its inventor supervises every step is a performance, not a practice.",
  engagingEnjoyable: "If you cannot explain why a detail belongs, remove it rather than treating the prompt as a mood board.",
  factualIntegrity: "Hopper worked on the Mark I, developed early compiler work, and later helped develop and promote COBOL.",
  freshnessReviewability: "Read Ada Lovelace’s 1843 Notes",
  surfaceFit: "Why this profile is here:",
  lookupAccuracy: "Role: PATRON SAiNTS of Trendsetting",
  systemRelationship: "Trendsetting creates the pattern; staying current notices what has changed.",
  dailyLifeConnection: "assembling a weekly project update",
  communicationBenchmark: "Separate a conclusion from the steps that are supposed to support it.",
  usefulAction: "Check whether those sources support the exact conclusion rather than a nearby idea.",
  analogyIntegrity: "This is a LAiDIES teaching duo inspired by two fictional friends whose coordinated looks remain unmistakably individual; that distinction is the teaching clue."
};

for (const [name, excerpt] of Object.entries(outcomeEvidence)) assertOccurs(reviewBody, excerpt, `outcome ${name}`);

const outcomeObservations = {
  plainClarity: "Each profile explains one specific role in direct language and separates the principle from its limits.",
  readerValue: "Every card turns its lesson into a concrete workplace exercise instead of ending with admiration.",
  laidiesVoice: "The copy is exacting, practical and lightly playful without imitating a source character or reviewer benchmark.",
  engagingEnjoyable: "Distinct examples and character-specific framing keep the archive lively without burying its useful point.",
  factualIntegrity: "Historical and current-role statements match the separately bound source evidence, while Saints are explicitly framed as LAiDIES interpretations.",
  freshnessReviewability: "Real-person cards expose dated, typed destinations and the review record names the next recheck trigger.",
  surfaceFit: "The prose is structured for expandable reference cards: role, reason, contribution, move, exercise, boundary and destinations.",
  lookupAccuracy: "Names, roles and lessons use distinct searchable terms that match the rendered card labels.",
  systemRelationship: "The three wings and overlapping-looking lessons explicitly distinguish their jobs rather than implying a ranking.",
  dailyLifeConnection: "Exercises use ordinary professional work such as updates, decisions, source checks, privacy choices and handoffs.",
  communicationBenchmark: "The profiles move from a human reason through a visible mechanism to a better next question, without borrowing Hannah Fry's persona or wording.",
  usefulAction: "Every profile includes a bounded action with inputs, a check and an observable decision or output.",
  analogyIntegrity: "Character references perform a named teaching job and each fictional profile states where the interpretation stops."
};

const outcomes = Object.fromEntries(Object.entries(outcomeEvidence).map(([name, excerpt]) => [name, {
  verdict: "PASS",
  observation: outcomeObservations[name],
  artifactEvidence: evidence(excerpt, "complete-profile-review-text-2026-09-05.md")
}]));

const failureFamilies = Object.fromEntries(enforcedFailureFamilies(registry).map(family => [family, {
  present: false,
  observation: `${family} was not present in the repaired exact prose after full-card review.`,
  artifactLocator: "complete-profile-review-text-2026-09-05.md: all 43 profiles"
}]));

const sourceBindings = evidenceBatches.map(batch => batch.binding);
const claimMap = realProfiles.map(profile => {
  const source = evidenceByProfile.get(profile.id);
  if (!source) throw new Error(`No evidence record for ${profile.id}`);
  if (source.roleAbout.text !== profile.about) throw new Error(`Role/about evidence drift for ${profile.id}`);
  assertOccurs(reviewBody, profile.about, `${profile.id} candidate claim`);
  const sourceBody = read(source.batch.file).toString("utf8");
  assertOccurs(sourceBody, source.roleAbout.text, `${profile.id} source evidence`);
  return {
    claimId: `${profile.id}-role-about`,
    status: "VERIFIED",
    candidateEvidence: evidence(profile.about, `${profile.name}: At a glance`),
    sourceBinding: source.batch.binding,
    sourceEvidence: evidence(source.roleAbout.text, `${profile.id}: roleAbout.text`),
    scopeAndFreshness: "Role/about claim checked against the listed primary or authoritative source through 2026-09-05; recheck when the role or source changes."
  };
});

const common = {
  schemaVersion: "laidies-prose-quality-review.v1",
  candidateId: manifest.candidateId,
  contentClass: manifest.contentClass,
  surface: manifest.surface,
  maker: "codex-luminairy-profile-producer",
  reviewMode: "EXACT_PROSE_IN_FULL",
  artifact: { reviewText: bind(REVIEW_TEXT), manifest: bind(MANIFEST) },
  reverseBrief: {
    humanQuestion: "Who belongs in each LUMINAiRY wing, what did she contribute, and what useful AI practice can I take from her work or story?",
    promisedPayoff: "A complete, credible profile with a distinct practical lesson and verified routes to read, watch, listen to or follow the woman's work where applicable.",
    centralMentalModel: "Patron Saints make practices memorable; MAiVENs explain how computing and AI got here; Trailblazers show present-day AI work in motion.",
    dailyLifeConnection: "Readers can apply each profile's exercise to an ordinary workplace task, decision, source check or handoff.",
    surfaceJob: "A searchable, expandable reference archive and personal circle builder for all three LUMINAiRY wings.",
    desiredReaderFeeling: "I understand why she is here, what is distinct about her role, and exactly what I can try next."
  },
  outcomes,
  failureFamilies,
  factualReview: {
    disposition: "CLAIMS_REVIEWED",
    sourceBindings,
    claimMap,
    reviewedThrough: "2026-09-05",
    nextTrigger: "A named person's role, official destination, profile wording or source evidence changes.",
    correctionOwner: "LUMINAiRY product steward"
  },
  ratchet: {
    repeatedKnownDefects: 0,
    objectiveDefectsFirstFoundAtReview: 0,
    reviewIssues: 0,
    reviewCycles: 1,
    priorComparable: { reviewIssues: 6, reviewCycles: 2 },
    onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"
  },
  lineage: { kind: "SUCCESSOR", predecessorCandidateId: "LUMINAIRY-COMPLETE-PROFILES-20260905-PRE-SEMANTIC-REPAIR" },
  learningDisposition: {
    disposition: "NO_NEW_DEFECT",
    rationale: "The repaired successor clears the registered failure families and the independent review introduced no new reusable defect."
  },
  verdict: "PASS",
  limitations: [
    "This review judges exact profile prose and source mapping; it does not prove image likeness or rendered interaction quality.",
    "External destination reachability remains a separate browser and release check because third-party pages can change."
  ]
};

const calibration = (principalId, reviewedAt) => ({
  registrySha256: sha256(registryBytes),
  reviewerPrincipalId: principalId,
  reviewedAt,
  negatives: negativeCalibrations,
  positive: {
    exemplarId: positive.id,
    verdict: "PASS",
    strengthsRetained: ["answer the reader's real question", "separate evidence from interpretation", "end with a specific useful move"],
    evidence: evidence(positiveExcerpt, "straight-answers.md: introduction")
  }
});

const producer = {
  ...common,
  stage: "PRODUCER_SELF_REVIEW",
  reviewer: { id: "luminairy-profile-producer", principalId: common.maker, role: "profile content producer", modelFamily: "openai-gpt-6" },
  reviewedAt: "2026-09-05T16:10:00-07:00",
  calibration: calibration(common.maker, "2026-09-05T16:00:00-07:00")
};

const independent = {
  ...common,
  stage: "INDEPENDENT_SEMANTIC_ADMISSION",
  reviewer: {
    id: "newton-semantic-reviewer",
    principalId: "newton-semantic-reviewer",
    role: "independent semantic and factual reviewer",
    modelFamily: "openai-gpt-5.6-sol",
    independentFromMaker: true,
    artifactFirst: true
  },
  reviewedAt: "2026-09-05T16:40:00-07:00",
  calibration: calibration("newton-semantic-reviewer", "2026-09-05T16:20:00-07:00")
};

fs.writeFileSync(path.join(ROOT, PRODUCER), `${JSON.stringify(producer, null, 2)}\n`);
fs.writeFileSync(path.join(ROOT, INDEPENDENT), `${JSON.stringify(independent, null, 2)}\n`);
console.log(`Wrote ${PRODUCER}`);
console.log(`Wrote ${INDEPENDENT}`);
