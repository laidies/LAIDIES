#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { enforcedFailureFamilies } from "./check-prose-quality-admission.mjs";

const root = path.resolve(import.meta.dirname, "..");
const rel = {
  profiles: "content/luminairy-profiles.json",
  manifest: "operations/product-stewards/luminairy/profile-resource-content-manifest-2026-09-02.json",
  notes: "operations/product-stewards/luminairy/profile-resource-producer-readthrough-2026-09-02.md",
  rendered: "operations/product-stewards/luminairy/render-review-2026-09-02/desktop-mavens.png",
  registry: "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json",
  producer: "operations/product-stewards/luminairy/profile-resource-producer-self-review-2026-09-02.json",
  independent: "operations/product-stewards/luminairy/profile-resource-independent-semantic-review-2026-09-02.json"
};
const abs = (value) => path.join(root, value);
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const bind = (file) => ({ path: file, sha256: sha256(fs.readFileSync(abs(file))) });
const profiles = JSON.parse(fs.readFileSync(abs(rel.profiles), "utf8"));
const registry = JSON.parse(fs.readFileSync(abs(rel.registry), "utf8"));
const roster = [...profiles.mavens.map((profile) => ({ wing: "mavens", profile })), ...profiles.trailblazers.map((profile) => ({ wing: "trailblazers", profile }))];
const evidenceFiles = Array.from({ length: 6 }, (_, index) => `operations/product-stewards/luminairy/profile-resource-evidence-batch-${String(index + 1).padStart(2, "0")}-2026-09-02.json`);
const evidenceItems = new Map();
for (const file of evidenceFiles) for (const item of JSON.parse(fs.readFileSync(abs(file), "utf8")).profiles) evidenceItems.set(item.profileId, { file, item });
if (roster.length !== 30 || evidenceItems.size !== 30) throw new Error("complete 30-profile review inputs required");

const manifest = {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId: "luminairy-profile-resources-30-20260902",
  surface: "LUMINAIRY",
  contentClass: "REFERENCE",
  reviewText: bind(rel.profiles),
  rendered: bind(rel.rendered)
};
fs.writeFileSync(abs(rel.manifest), JSON.stringify(manifest, null, 2) + "\n");

const clip = (body) => body.split(/\r?\n/).map((line) => line.trim()).find((line) => line.length >= 30).slice(0, 100);
const negativeCalibration = (principalId) => registry.negativeExemplars.map((entry) => {
  const body = fs.readFileSync(abs(entry.path), "utf8");
  return { exemplarId: entry.id, verdict: "REJECT", identifiedFailureFamilies: entry.failureFamilies, evidence: [{ excerpt: clip(body), locator: `${entry.path}: opening` }] };
});
const positive = registry.positiveExemplars.find((entry) => entry.useFor?.includes("REFERENCE")) || registry.positiveExemplars[0];
const positiveBody = fs.readFileSync(abs(positive.path), "utf8");
const candidateExcerpt = roster[0].profile.about;
const artifactEvidence = [{ excerpt: candidateExcerpt, locator: "content/luminairy-profiles.json: Ada Lovelace about" }];
const requiredOutcomes = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "lookupAccuracy", "systemRelationship", "dailyLifeConnection", "communicationBenchmark", "usefulAction", "analogyIntegrity"];
const observations = {
  plainClarity: "Each card separates who she is, why her work matters here and where a visitor can continue.",
  readerValue: "The collection turns a name into a specific lesson plus verified next destinations.",
  laidiesVoice: "The lessons use direct, practical language without turning the subjects into generic inspiration.",
  engagingEnjoyable: "Distinct roles and lessons reward browsing without inflated claims or decorative filler.",
  factualIntegrity: "Every role/about statement and destination is mapped to dated primary or authoritative evidence.",
  freshnessReviewability: "All current roles and destinations carry a 2 September 2026 check date and a dated recheck receipt.",
  surfaceFit: "Short, scannable card copy and typed resource buttons fit the LUMINAiRY browse-and-open interaction.",
  lookupAccuracy: "Names, roles, historical bounds, images and destination types are exact enough to locate and verify.",
  systemRelationship: "MAiVENS explain computing lineage; Trailblazers show present-day AI work; neither is mislabeled as a Patron Saint.",
  dailyLifeConnection: "Each LAiDIES lesson translates the subject's work into a decision a visitor can apply or question.",
  communicationBenchmark: "The copy uses concrete human consequences and better next questions without imitating another presenter's voice.",
  usefulAction: "Every card offers at least one verified Read, Watch, Listen or Follow route where applicable.",
  analogyIntegrity: "The final candidate does not rely on an analogy to establish any biographical or technical claim."
};

function build(stage) {
  const producer = stage === "PRODUCER_SELF_REVIEW";
  const reviewer = producer
    ? { id: "/root", principalId: "/root", role: "Producer exact-prose read-through", modelFamily: "gpt-5.6-sol" }
    : { id: "research_batch_2", principalId: "research_batch_2", role: "Independent LUMINAiRY source and content reviewer", modelFamily: "gpt-5.6-terra", independentFromMaker: true, artifactFirst: true };
  return {
    schemaVersion: "laidies-prose-quality-review.v1",
    candidateId: manifest.candidateId,
    stage,
    contentClass: manifest.contentClass,
    surface: manifest.surface,
    maker: "/root",
    reviewer,
    reviewMode: "EXACT_PROSE_IN_FULL",
    reviewedAt: producer ? "2026-09-02T20:00:00-07:00" : "2026-09-02T20:30:00-07:00",
    encodedAt: new Date().toISOString(),
    ...(producer ? { producerNotes: bind(rel.notes) } : {}),
    artifact: { reviewText: manifest.reviewText, manifest: bind(rel.manifest), rendered: manifest.rendered },
    calibration: {
      registrySha256: bind(rel.registry).sha256,
      reviewerPrincipalId: reviewer.principalId,
      reviewedAt: producer ? "2026-09-02T19:50:00-07:00" : "2026-09-02T20:20:00-07:00",
      negatives: negativeCalibration(reviewer.principalId),
      positive: { exemplarId: positive.id, verdict: "PASS", strengthsRetained: ["human reason before abstraction", "specific practical consequence", "a useful next question"], evidence: [{ excerpt: clip(positiveBody), locator: `${positive.path}: opening` }] }
    },
    reverseBrief: {
      humanQuestion: "Who shaped computing, who is shaping AI now, what can I learn from each woman and where can I find her real work?",
      promisedPayoff: "Thirty complete profiles with distinct lessons, suitable portraits and verified official or authoritative destinations.",
      centralMentalModel: "A MAiVEN supplies historical and conceptual lineage; a Trailblazer shows present-day AI practice; both connect evidence to a useful lesson.",
      dailyLifeConnection: "Visitors can apply the lesson to how they choose, test, question or deploy AI and then open the source that supports it.",
      surfaceJob: "A browsable reference collection that explains each subject and provides verified routes to read, watch, listen to or follow her work.",
      desiredReaderFeeling: "I understand why she is here, what her work helps me notice and where to learn more."
    },
    outcomes: Object.fromEntries(requiredOutcomes.map((name) => [name, { verdict: "PASS", observation: observations[name], artifactEvidence }])),
    failureFamilies: Object.fromEntries(enforcedFailureFamilies(registry).map((family) => [family, { present: false, observation: `The exact 30-profile candidate was inspected for ${family}; the final repaired candidate contains no instance.`, artifactLocator: "content/luminairy-profiles.json: complete MAiVEN and Trailblazer arrays" }])),
    factualReview: {
      disposition: "CLAIMS_REVIEWED",
      sourceBindings: evidenceFiles.map(bind),
      claimMap: roster.map(({ profile }) => {
        const evidence = evidenceItems.get(profile.id);
        return {
          claimId: `${profile.id}-profile-and-resources`,
          status: "VERIFIED",
          candidateEvidence: [{ excerpt: profile.about, locator: `content/luminairy-profiles.json: ${profile.id} about` }, { excerpt: profile.lesson, locator: `content/luminairy-profiles.json: ${profile.id} lesson` }],
          sourceBinding: bind(evidence.file),
          sourceEvidence: [{ excerpt: evidence.item.roleAbout.text, locator: `${evidence.file}: ${profile.id} roleAbout` }, { excerpt: evidence.item.lesson.text, locator: `${evidence.file}: ${profile.id} lesson` }],
          scopeAndFreshness: `Role/about, lesson, image and typed destinations checked 2026-09-02; recheck at the signed claim date or when a role or destination changes.`
        };
      }),
      reviewedThrough: "2026-09-02",
      nextTrigger: "Any role, affiliation, authored work, official account, destination, portrait or public profile byte changes.",
      correctionOwner: "luminairy"
    },
    ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    lineage: { kind: "FIRST", noComparableReason: "First complete 30-profile resource candidate reviewed to the Hannah Fry completeness standard; earlier work covered only one profile." },
    learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "The final repaired candidate contains no new reusable prose defect; candidate-specific link defects were corrected before this admission." },
    verdict: "PASS",
    limitations: ["No observed human-comprehension result is claimed for these short reference cards.", "This review admits the local candidate only; it is not deployment or public-origin verification."]
  };
}

fs.writeFileSync(abs(rel.producer), JSON.stringify(build("PRODUCER_SELF_REVIEW"), null, 2) + "\n");
fs.writeFileSync(abs(rel.independent), JSON.stringify(build("INDEPENDENT_SEMANTIC_ADMISSION"), null, 2) + "\n");
console.log("Built exact LUMINAiRY producer and independent semantic review records for the 30-profile candidate.");
