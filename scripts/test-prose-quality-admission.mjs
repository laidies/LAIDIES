#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { FAILURE_FAMILIES, inspectProseQualityReview } from "./check-prose-quality-admission.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-prose-quality-"));
const write = (relative, value) => { const target = path.join(root, relative); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, value); return target; };
const hash = file => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const bind = relative => ({ path: relative, sha256: hash(path.join(root, relative)) });

try {
  const badPath = "evidence/bad.txt";
  const goodPath = "evidence/good.txt";
  const candidatePath = "content/candidate.md";
  const manifestPath = "content/manifest.json";
  const sourcePath = "evidence/source.md";
  write(badPath, "This glossary repeats labels. A random Cher reference decorates it. No connected mechanism or useful decision appears.\n");
  write(goodPath, "Start with her real work problem. Follow the request through context and evidence. The result is a useful decision she can try elsewhere.\n");
  const candidateBody = "Your manager asks whether the policy allows a promise. The product places your request and the current policy into context. The model drafts an answer, but the policy remains the evidence. Check the promised date against the policy before sending. Think of Elle Woods bringing the correct case file: the file supports the claim; the confidence does not. This works for a travel rule too: supply the current rule, then verify the consequential detail. The point feels practical, specific and a little fun—not like homework.\n";
  write(candidatePath, candidateBody);
  write(manifestPath, '{"candidate":"fixture"}\n');
  write(sourcePath, "Current authoritative policy source.\n");
  const negativeFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "joylessInstruction"];
  write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: hash(path.join(root, badPath)), failureFamilies: negativeFamilies }],
    positiveExemplars: [{ id: "GOOD", path: goodPath, sha256: hash(path.join(root, goodPath)), useFor: ["EXPLANATION"] }]
  }));

  const excerpt = candidateBody.slice(0, 80);
  const required = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "connectedSystemUnderstanding", "dailyLifeConnection", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"];
  const outcomes = Object.fromEntries(required.map(name => [name, {
    verdict: "PASS", observation: `${name} is demonstrated in the exact prose.`, artifactEvidence: [{ excerpt, locator: "candidate.md:1" }],
    ...(["explainBack", "unseenTransfer"].includes(name) ? { readerEvidence: { prompt: `Test ${name}.`, observedResponse: "The reader explained the mechanism in another case.", expectedEvidence: "Names context, evidence and human check." } } : {})
  }]));
  const receipt = {
    schemaVersion: "laidies-prose-quality-review.v1", candidateId: "fixture", stage: "INDEPENDENT_SEMANTIC_ADMISSION", contentClass: "EXPLANATION", surface: "LIBRAIRY",
    maker: "maker", reviewer: { id: "independent-reader", role: "learning and prose reviewer" }, reviewMode: "EXACT_PROSE_IN_FULL", reviewedAt: "2026-08-07T07:00:00-07:00",
    artifact: { reviewText: bind(candidatePath), manifest: bind(manifestPath) },
    calibration: {
      negative: { exemplarId: "BAD", verdict: "REJECT", identifiedFailureFamilies: negativeFamilies, evidence: [{ excerpt: "This glossary repeats labels.", locator: "bad.txt:1" }] },
      positive: { exemplarId: "GOOD", verdict: "PASS", strengthsRetained: ["real problem", "connected mechanism"], evidence: [{ excerpt: "Start with her real work problem.", locator: "good.txt:1" }] }
    },
    reverseBrief: { humanQuestion: "Can I make this promise?", promisedPayoff: "Diagnose and check the answer.", centralMentalModel: "Context and model create a draft; evidence supports the decision.", dailyLifeConnection: "A manager handover.", surfaceJob: "Durable explanation.", desiredReaderFeeling: "Oh, I get it now." },
    outcomes,
    failureFamilies: Object.fromEntries(FAILURE_FAMILIES.map(name => [name, { present: false, observation: `${name} is absent after exact-prose review.`, artifactLocator: "candidate.md:1" }])),
    factualReview: { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind(sourcePath)], reviewedThrough: "2026-08-07", nextTrigger: "source changes", correctionOwner: "fixture-owner" },
    ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, priorComparable: { reviewIssues: 1, reviewCycles: 2 }, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    verdict: "PASS", limitations: ["Synthetic calibration only."]
  };
  const inspect = value => inspectProseQualityReview(value, { root }).errors;
  assert.deepEqual(inspect(receipt), [], "valid exact-prose review must match");
  const blind = structuredClone(receipt); blind.outcomes.plainClarity.artifactEvidence[0].excerpt = "words that are not in the prose";
  assert.match(inspect(blind).join("\n"), /does not occur/);
  const missing = structuredClone(receipt); delete missing.outcomes.unseenTransfer;
  assert.match(inspect(missing).join("\n"), /unseenTransfer is missing/);
  const defect = structuredClone(receipt); defect.failureFamilies.decorativeAnalogy.present = true;
  assert.match(inspect(defect).join("\n"), /decorativeAnalogy is present/);
  const self = structuredClone(receipt); self.reviewer.id = self.maker;
  assert.match(inspect(self).join("\n"), /cannot be maker self-review/);
  const uncalibrated = structuredClone(receipt); uncalibrated.calibration.negative.verdict = "PASS";
  assert.match(inspect(uncalibrated).join("\n"), /must be rejected/);
  const repeated = structuredClone(receipt); repeated.ratchet.repeatedKnownDefects = 1;
  assert.match(inspect(repeated).join("\n"), /repeated known defect/);
  const knownBadPass = structuredClone(receipt); knownBadPass.artifact.reviewText = bind(badPath);
  assert.match(inspect(knownBadPass).join("\n"), /exact known-bad prose|does not occur/);
  const held = structuredClone(receipt); held.verdict = "HOLD"; held.outcomes.unseenTransfer.verdict = "HOLD";
  assert.deepEqual(inspect(held), [], "truthful HOLD must preserve incomplete learning");
  console.log("PROSE QUALITY CALIBRATION PASS valid=1 hold=1 rejected=7 exact_known_bad=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
