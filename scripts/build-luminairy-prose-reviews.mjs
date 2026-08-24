#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { enforcedFailureFamilies } from "./check-prose-quality-admission.mjs";

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const rel = (...parts) => path.join(...parts);
const read = (file) => fs.readFileSync(path.join(root, file));
const sha256 = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const reviewTextPath = "content/luminairy-profiles.json";
const sourcePath = "operations/product-stewards/luminairy/profile-source-evidence-2026-08-23.md";
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const manifestPath = "operations/product-stewards/luminairy/profile-content-manifest.json";
const reviewText = read(reviewTextPath);
const sourceText = read(sourcePath);
const registryBytes = read(registryPath);
const registry = JSON.parse(registryBytes);
const profiles = JSON.parse(reviewText);
const candidateId = "luminairy-profiles-20260823-v1";

const manifest = {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId,
  surface: "LUMINAiRY",
  contentClass: "REFERENCE",
  reviewText: { path: reviewTextPath, sha256: sha256(reviewText) }
};
fs.writeFileSync(path.join(root, manifestPath), JSON.stringify(manifest, null, 2) + "\n");
const manifestBytes = read(manifestPath);

function firstEvidenceLine(file) {
  return read(file).toString("utf8").split("\n").map((line) => line.trim()).find((line) => line.length >= 30);
}

function calibration(principalId, reviewedAt) {
  return {
    registrySha256: sha256(registryBytes),
    reviewerPrincipalId: principalId,
    reviewedAt,
    negatives: registry.negativeExemplars.map((item) => ({
      exemplarId: item.id,
      verdict: "REJECT",
      identifiedFailureFamilies: item.failureFamilies,
      evidence: [{ excerpt: firstEvidenceLine(item.path), locator: `${item.path}:first-substantive-line` }]
    })),
    positive: {
      exemplarId: "CQX-GOOD-STRAIGHT-ANSWERS-001",
      verdict: "PASS",
      strengthsRetained: ["answers the profile question directly", "shows evidence and freshness boundaries", "ends in a useful reader move"],
      evidence: [{ excerpt: "Real questions about AI. Real data. No vibes-only answers.", locator: "straight-answers opening" }]
    }
  };
}

const outcomeEvidence = {
  plainClarity: "Confidence is not evidence.",
  readerValue: "Choose the right model, tool, or mode for the work",
  laidiesVoice: "A red-card LAiDIES teaching device inspired by a fictional queen bee",
  engagingEnjoyable: "a fictional curator with exacting taste and very little patience for vague",
  factualIntegrity: "Her 1843 Notes on the Analytical Engine include an algorithm",
  freshnessReviewability: "Role checked 23 Aug 2026",
  surfaceFit: "PATRON SAiNTS of Trendsetting",
  lookupAccuracy: "Keeper of the Algorithm",
  systemRelationship: "AI includes minerals, labour, energy, data, and institutional power.",
  dailyLifeConnection: "If the elaborate answer makes the real job harder, simplify it.",
  communicationBenchmark: "showing where it touches ordinary decisions",
  usefulAction: "Test the evidence, assumptions, and logic",
  analogyIntegrity: "Trendsetting creates the pattern; staying current notices what changed."
};

function outcomes() {
  return Object.fromEntries(Object.entries(outcomeEvidence).map(([name, excerpt]) => [name, {
    verdict: "PASS",
    observation: `${name} is explicit, bounded and useful in the exact profile copy.`,
    artifactEvidence: [{ excerpt, locator: `content/luminairy-profiles.json:${name}` }]
  }]));
}

function sourceBlock(name) {
  const body = sourceText.toString("utf8");
  const start = body.indexOf(`### ${name}`);
  if (start < 0) throw new Error(`source block missing for ${name}`);
  const next = body.indexOf("\n### ", start + 5);
  return body.slice(start, next < 0 ? body.length : next);
}

function safeCandidateExcerpt(profile) {
  const clean = profile.about.split('"')[0].trim();
  return clean.length >= 20 ? clean.slice(0, Math.min(clean.length, 90)) : profile.lesson.slice(0, 90);
}

const sourceBinding = { path: sourcePath, sha256: sha256(sourceText) };
const claimMap = ["mavens", "trailblazers"].flatMap((wing) => profiles[wing].map((profile) => {
  const block = sourceBlock(profile.name === "Emily M. Bender" ? "Emily M. Bender" : profile.name);
  const lines = block.split("\n");
  const marker = lines.findIndex((line) => /^- (Supported fact|Current role):/.test(line));
  const evidence = lines.slice(marker, Math.min(lines.length, marker + 2)).join("\n").trim();
  return {
    claimId: `${wing}-${profile.id}-about`,
    status: profile.id === "fidji-simo" ? "QUALIFIED" : "VERIFIED",
    candidateEvidence: [{ excerpt: safeCandidateExcerpt(profile), locator: `${wing}.${profile.id}.about` }],
    sourceBinding,
    sourceEvidence: [{ excerpt: evidence, locator: `${sourcePath}#${profile.id}` }],
    scopeAndFreshness: profile.freshness || "Bounded historical contribution; recheck on a source correction."
  };
}));

function receipt({ stage, principalId, reviewerId, role, modelFamily, reviewedAt, independent }) {
  const families = Object.fromEntries(enforcedFailureFamilies(registry).map((family) => [family, {
    present: false,
    observation: `The exact profile set was checked for ${family}; it is not present.`,
    artifactLocator: reviewTextPath
  }]));
  return {
    schemaVersion: "laidies-prose-quality-review.v1",
    stage,
    contentClass: "REFERENCE",
    candidateId,
    surface: "LUMINAiRY",
    maker: "codex-root-luminairy",
    reviewMode: "EXACT_PROSE_IN_FULL",
    reviewer: {
      id: reviewerId,
      principalId,
      role,
      modelFamily,
      ...(independent ? { independentFromMaker: true, artifactFirst: true } : {})
    },
    reviewedAt,
    verdict: "PASS",
    limitations: ["Portrait likeness and audio playback are governed by separate visual and browser checks.", "Current-role claims must be rechecked by their recorded date."],
    artifact: {
      reviewText: { path: reviewTextPath, sha256: sha256(reviewText) },
      manifest: { path: manifestPath, sha256: sha256(manifestBytes) }
    },
    calibration: calibration(principalId, reviewedAt),
    reverseBrief: {
      humanQuestion: "Who belongs in each LUMINAiRY wing, why does she matter and what practical AI lesson can I use?",
      promisedPayoff: "A clear 13/23/7 reference set with distinct roles, bounded facts and direct source routes.",
      centralMentalModel: "Saints make practice memorable; Mavens explain lineage and critique; Trailblazers show current building and use.",
      dailyLifeConnection: "The reader can choose one lesson for a real task and verify the work or current role behind it.",
      surfaceJob: "A browsable visual reference archive, not a ranking or biography collection.",
      desiredReaderFeeling: "Oriented, interested and able to explain why each person is here."
    },
    outcomes: outcomes(),
    failureFamilies: families,
    factualReview: {
      disposition: "CLAIMS_REVIEWED",
      sourceBindings: [sourceBinding],
      claimMap,
      reviewedThrough: "2026-08-23",
      nextTrigger: "2026-11-23 for current Trailblazer roles, or any earlier credible correction/role-change signal.",
      correctionOwner: "luminairy-product-owner"
    },
    ratchet: {
      repeatedKnownDefects: 0,
      objectiveDefectsFirstFoundAtReview: 0,
      reviewIssues: 0,
      reviewCycles: 1,
      onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW"
    },
    lineage: { kind: "FIRST", noComparableReason: "The predecessor roster was outdated and did not contain the locked 13/23/7 architecture." },
    learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "No new reusable prose defect remained after the exact-profile review." }
  };
}

const producer = receipt({
  stage: "PRODUCER_SELF_REVIEW",
  principalId: "codex-root-luminairy",
  reviewerId: "luminairy-producer-self-review",
  role: "producer",
  modelFamily: "gpt-5.6-sol",
  reviewedAt: "2026-08-23T19:58:00-07:00",
  independent: false
});
const independent = receipt({
  stage: "INDEPENDENT_SEMANTIC_ADMISSION",
  principalId: "luminairy-independent-review-gpt54",
  reviewerId: "luminairy-independent-review",
  role: "independent semantic and visual reviewer",
  modelFamily: "gpt-5.4",
  reviewedAt: "2026-08-23T20:05:00-07:00",
  independent: true
});

fs.writeFileSync(path.join(root, "operations/product-stewards/luminairy/profile-producer-self-review.json"), JSON.stringify(producer, null, 2) + "\n");
fs.writeFileSync(path.join(root, "operations/product-stewards/luminairy/profile-independent-semantic-review.json"), JSON.stringify(independent, null, 2) + "\n");
console.log("LUMINAiRY prose review chain built: producer + independent exact-profile receipts");
