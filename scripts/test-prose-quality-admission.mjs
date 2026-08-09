#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { enforcedFailureFamilies, inspectProseQualityReview, inspectProseReviewChain } from "./check-prose-quality-admission.mjs";

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
  const observationPaths = [1, 2, 3].map(index => `evidence/reader-observation-${index}.md`);
  write(badPath, "This glossary repeats labels. A random Cher reference decorates it. No connected mechanism or useful decision appears.\n");
  write(goodPath, "Start with her real work problem. Follow the request through context and evidence. The result is a useful decision she can try elsewhere.\n");
  const candidateBody = "Your manager asks whether the policy allows a promise. The product places your request and the current policy into context. The model drafts an answer, but the policy remains the evidence. Check the promised date against the policy before sending. Think of Elle Woods bringing the correct case file: the file supports the claim; the confidence does not. This works for a travel rule too: supply the current rule, then verify the consequential detail. The point feels practical, specific and a little fun—not like homework.\n";
  write(candidatePath, candidateBody);
  write(manifestPath, JSON.stringify({ schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: "fixture", surface: "LIBRAIRY", contentClass: "EXPLANATION", reviewText: bind(candidatePath) }));
  write(sourcePath, "Current authoritative policy source states that the policy is the evidence for the promise.\n");
  for (const [index, observationPath] of observationPaths.entries()) write(observationPath, `Reader ${index + 1} explained that context supplies material, the policy supports the claim and a human checks the consequential detail.\n`);
  const negativeFamilies = ["glossaryAccumulation", "templateRepetition", "decorativeAnalogy", "referenceConfetti", "missingMechanism", "genericAction", "jargonBeforeMeaning", "disconnectedSystem", "joylessInstruction"];
  const sitewideWritingBenchmarkIds = ["GOOD", "GOOD-2", "GOOD-3", "GOOD-4"];
  const registry = write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    sitewideWritingBenchmarkIds,
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: hash(path.join(root, badPath)), incidentId: "fixture-incident", appliesTo: ["EXPLANATION"], failureFamilies: negativeFamilies }],
    positiveExemplars: sitewideWritingBenchmarkIds.map(id => ({ id, path: goodPath, sha256: hash(path.join(root, goodPath)), useFor: ["EXPLANATION", "NEWS"] }))
  }));

  const excerpt = candidateBody.slice(0, 80);
  const required = ["plainClarity", "technicalCoherence", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "connectedSystemUnderstanding", "dailyLifeConnection", "communicationBenchmark", "explanationArc", "dominantVoiceAcrossArtifact", "purposeEarnedAcrossOpening", "readerScaffoldingHidden", "laidiesWorldIntegration", "explainBack", "unseenTransfer", "systemModelReconstruction", "usefulAction", "analogyIntegrity"];
  const observedParticipants = observationPaths.map((observationPath, index) => ({
    participantId: `reader-${index + 1}`,
    prompt: "Explain the mechanism and use it in a different case.",
    verbatimResponse: `Reader ${index + 1} said context supplies material, evidence supports the claim and a human checks the consequential detail.`,
    expectedEvidence: "Names context, evidence and human check.",
    observedAt: `2026-08-07T06:5${index}:00-07:00`,
    observationBinding: bind(observationPath)
  }));
  const outcomes = Object.fromEntries(required.map(name => [name, {
    verdict: "PASS", observation: `${name} is demonstrated in the exact prose.`, artifactEvidence: [{ excerpt, locator: "candidate.md:1" }],
    ...(["explainBack", "unseenTransfer", "systemModelReconstruction"].includes(name) ? { observedReaderEvidence: { evidenceType: "OBSERVED_HUMAN", administratorPrincipalId: "reader-study-admin", participants: observedParticipants } } : {})
  }]));
  outcomes.dominantVoiceAcrossArtifact.artifactEvidence = [
    { excerpt: candidateBody.slice(0, 35), locator: "candidate.md:beginning" },
    { excerpt: "Check the promised date against the policy before sending.", locator: "candidate.md:middle" },
    { excerpt: "The point feels practical, specific and a little fun—not like homework.", locator: "candidate.md:ending" }
  ];
  outcomes.purposeEarnedAcrossOpening.purposeThreads = Object.fromEntries(
    ["practicalUse", "informationJudgment", "civicParticipation", "consequentialAgency"].map(name => [name, {
      observation: `${name} is carried by the work-policy decision.`,
      artifactEvidence: [{ excerpt: "Check the promised date against the policy before sending.", locator: "candidate.md:middle" }]
    }])
  );
  outcomes.analogyIntegrity = {
    ...outcomes.analogyIntegrity,
    analogyUsed: true,
    mechanismMapping: "The case file maps to evidence that supports a claim; confidence maps to unsupported presentation.",
    whySimpler: "The familiar courtroom distinction makes support versus confidence visible before the technical language.",
    whyItImprovesUnderstanding: "The reader can distinguish a fluent draft from evidence and apply that distinction to another policy.",
    transferPrompt: "In a travel-policy answer, identify the claim, the supporting evidence and what confidence cannot prove.",
    observedAnalogyEvidence: { evidenceType: "OBSERVED_HUMAN", prompt: "Use the comparison to explain a travel-policy answer.", verbatimResponse: "The current travel rule supports the claim; confident wording does not.", expectedEvidence: "Separates evidence from confidence in the new case.", observationBinding: bind(observationPaths[0]) }
  };
  const receipt = {
    schemaVersion: "laidies-prose-quality-review.v1", candidateId: "fixture", stage: "INDEPENDENT_SEMANTIC_ADMISSION", contentClass: "EXPLANATION", surface: "LIBRAIRY",
    maker: "maker", reviewer: { id: "independent-reader", principalId: "independent-reader-principal", role: "learning and prose reviewer", modelFamily: "claude", independentFromMaker: true, artifactFirst: true }, reviewMode: "EXACT_PROSE_IN_FULL", reviewedAt: "2026-08-07T07:00:00-07:00",
    artifact: { reviewText: bind(candidatePath), manifest: bind(manifestPath) },
    calibration: {
      registrySha256: hash(registry), reviewerPrincipalId: "independent-reader-principal", reviewedAt: "2026-08-07T06:59:00-07:00",
      negatives: [{ exemplarId: "BAD", verdict: "REJECT", identifiedFailureFamilies: negativeFamilies, evidence: [{ excerpt: "This glossary repeats labels.", locator: "bad.txt:1" }] }],
      positive: { exemplarId: "GOOD", verdict: "PASS", strengthsRetained: ["real problem", "connected mechanism"], evidence: [{ excerpt: "Start with her real work problem.", locator: "good.txt:1" }] },
      sitewideWritingBenchmarks: sitewideWritingBenchmarkIds.map(exemplarId => ({
        exemplarId,
        verdict: "PASS",
        strengthsToRetain: ["intelligent reader relationship", "connected usefulness"],
        patternsNotToCopy: ["exact structure", "exact wording"],
        evidence: [{ excerpt: "Start with her real work problem.", locator: "good.txt:1" }]
      }))
    },
    reverseBrief: { humanQuestion: "Can I make this promise?", promisedPayoff: "Diagnose and check the answer.", centralMentalModel: "Context and model create a draft; evidence supports the decision.", dailyLifeConnection: "A manager handover.", surfaceJob: "Durable explanation.", desiredReaderFeeling: "Oh, I get it now." },
    outcomes,
    failureFamilies: Object.fromEntries(enforcedFailureFamilies(JSON.parse(fs.readFileSync(registry, "utf8"))).map(name => [name, { present: false, observation: `${name} is absent after exact-prose review.`, artifactLocator: "candidate.md:1" }])),
    factualReview: { disposition: "CLAIMS_REVIEWED", sourceBindings: [bind(sourcePath)], claimMap: [{ claimId: "fixture-policy-evidence", status: "VERIFIED", candidateEvidence: [{ excerpt: "the policy remains the evidence", locator: "candidate.md:1" }], sourceBinding: bind(sourcePath), sourceEvidence: [{ excerpt: "policy is the evidence for the promise", locator: "source.md:1" }], scopeAndFreshness: "Synthetic fixture; recheck when source changes." }], reviewedThrough: "2026-08-07", nextTrigger: "source changes", correctionOwner: "fixture-owner" },
    ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, priorComparable: { reviewIssues: 1, reviewCycles: 2 }, onKnownDefect: "REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW" },
    lineage: { kind: "SUCCESSOR", predecessorCandidateId: "fixture-prior" },
    learningDisposition: { disposition: "NO_NEW_DEFECT", rationale: "Synthetic valid fixture introduces no new reusable defect." },
    verdict: "PASS", limitations: ["Synthetic calibration only."]
  };
  const inspect = value => inspectProseQualityReview(value, { root }).errors;
  assert.deepEqual(inspect(receipt), [], "valid exact-prose review must match");
  const blind = structuredClone(receipt); blind.outcomes.plainClarity.artifactEvidence[0].excerpt = "words that are not in the prose";
  assert.match(inspect(blind).join("\n"), /does not occur/);
  const missing = structuredClone(receipt); delete missing.outcomes.unseenTransfer;
  assert.match(inspect(missing).join("\n"), /unseenTransfer is missing/);
  const noReconstruction = structuredClone(receipt); delete noReconstruction.outcomes.systemModelReconstruction;
  assert.match(inspect(noReconstruction).join("\n"), /systemModelReconstruction is missing/);
  const defect = structuredClone(receipt); defect.failureFamilies.decorativeAnalogy.present = true;
  assert.match(inspect(defect).join("\n"), /decorativeAnalogy is present/);
  const analogyCheckbox = structuredClone(receipt); delete analogyCheckbox.outcomes.analogyIntegrity.observedAnalogyEvidence;
  assert.match(inspect(analogyCheckbox).join("\n"), /observed human evidence/);
  const nameOnly = structuredClone(receipt); delete nameOnly.outcomes.communicationBenchmark;
  assert.match(inspect(nameOnly).join("\n"), /communicationBenchmark is missing/);
  const missingSitewideWriting = structuredClone(receipt); missingSitewideWriting.calibration.sitewideWritingBenchmarks.pop();
  assert.match(inspect(missingSitewideWriting).join("\n"), /every sitewide writing benchmark/);
  const pastiche = structuredClone(receipt); pastiche.failureFamilies.communicationPastiche.present = true;
  assert.match(inspect(pastiche).join("\n"), /communicationPastiche is present/);
  const missingArc = structuredClone(receipt); delete missingArc.outcomes.explanationArc;
  assert.match(inspect(missingArc).join("\n"), /explanationArc is missing/);
  const isolatedVoice = structuredClone(receipt); isolatedVoice.outcomes.dominantVoiceAcrossArtifact.artifactEvidence = [{ excerpt, locator: "candidate.md:1" }];
  assert.match(inspect(isolatedVoice).join("\n"), /beginning, middle and ending evidence/);
  const missingCivicPurpose = structuredClone(receipt); delete missingCivicPurpose.outcomes.purposeEarnedAcrossOpening.purposeThreads.civicParticipation;
  assert.match(inspect(missingCivicPurpose).join("\n"), /purposeThreads.civicParticipation/);
  const prematureClick = structuredClone(receipt); prematureClick.failureFamilies.prematureClickBeforeMechanism.present = true;
  assert.match(inspect(prematureClick).join("\n"), /prematureClickBeforeMechanism is present/);
  const inflatedEnding = structuredClone(receipt); inflatedEnding.failureFamilies.inflatedTakeawayEnding.present = true;
  assert.match(inspect(inflatedEnding).join("\n"), /inflatedTakeawayEnding is present/);
  const self = structuredClone(receipt); self.reviewer.principalId = self.maker;
  assert.match(inspect(self).join("\n"), /cannot be maker self-review/);
  const uncalibrated = structuredClone(receipt); uncalibrated.calibration.negatives[0].verdict = "PASS";
  assert.match(inspect(uncalibrated).join("\n"), /must be rejected/);
  const repeated = structuredClone(receipt); repeated.ratchet.repeatedKnownDefects = 1;
  assert.match(inspect(repeated).join("\n"), /repeated known defect/);
  const knownBadPass = structuredClone(receipt); knownBadPass.artifact.reviewText = bind(badPath);
  assert.match(inspect(knownBadPass).join("\n"), /exact known-bad prose|does not occur/);
  const held = structuredClone(receipt); held.verdict = "HOLD"; held.outcomes.unseenTransfer.verdict = "HOLD"; held.learningDisposition = { disposition: "EVIDENCE_GAP", rationale: "Observed transfer evidence remains incomplete." };
  assert.deepEqual(inspect(held), [], "truthful HOLD must preserve incomplete learning");
  const wrongManifest = structuredClone(receipt); wrongManifest.artifact.reviewText = bind(goodPath);
  assert.match(inspect(wrongManifest).join("\n"), /manifest is not bound to the reviewed prose/);
  const staleRegistry = structuredClone(receipt); staleRegistry.calibration.registrySha256 = "0".repeat(64);
  assert.match(inspect(staleRegistry).join("\n"), /registrySha256 is stale/);
  const fakeObservation = structuredClone(receipt); fakeObservation.outcomes.explainBack.observedReaderEvidence.participants[0].observationBinding = { path: "evidence/missing.md", sha256: "0".repeat(64) };
  assert.match(inspect(fakeObservation).join("\n"), /file missing/);
  const simulationInAdmission = structuredClone(receipt); delete simulationInAdmission.outcomes.explainBack.observedReaderEvidence; simulationInAdmission.outcomes.explainBack.simulatedReaderProbe = { prompt: "Pretend", probeResponse: "I can explain it", expectedEvidence: "Mechanism" };
  assert.match(inspect(simulationInAdmission).join("\n"), /observedReaderEvidence/);
  const producer = structuredClone(receipt);
  producer.stage = "PRODUCER_SELF_REVIEW";
  producer.reviewer = { id: "maker", principalId: "maker", role: "producer", modelFamily: "openai" };
  producer.reviewedAt = "2026-08-07T06:00:00-07:00";
  producer.calibration.reviewerPrincipalId = "maker";
  producer.calibration.reviewedAt = "2026-08-07T05:59:00-07:00";
  for (const name of ["explainBack", "unseenTransfer", "systemModelReconstruction"]) {
    delete producer.outcomes[name].observedReaderEvidence;
    producer.outcomes[name].simulatedReaderProbe = { prompt: `Probe ${name}`, probeResponse: "A hypothetical reader connects context, evidence and the human check.", expectedEvidence: "Mechanism and transfer." };
  }
  delete producer.outcomes.analogyIntegrity.observedAnalogyEvidence;
  producer.outcomes.analogyIntegrity.simulatedAnalogyProbe = { response: "A simulated reader separates supporting evidence from confident wording in a travel-policy case." };
  assert.deepEqual(inspect(producer), [], "producer simulation is allowed only as a producer probe");
  assert.deepEqual(inspectProseReviewChain(producer, receipt, { root }).errors, [], "ordered cross-family chain must match");
  const sameFamily = structuredClone(receipt); sameFamily.reviewer.modelFamily = "openai";
  assert.match(inspectProseReviewChain(producer, sameFamily, { root }).errors.join("\n"), /different model families/);
  const inverted = structuredClone(receipt); inverted.reviewedAt = "2026-08-07T05:00:00-07:00";
  assert.match(inspectProseReviewChain(producer, inverted, { root }).errors.join("\n"), /must precede/);
  const wrongCalibrationReviewer = structuredClone(receipt); wrongCalibrationReviewer.calibration.reviewerPrincipalId = "someone-else";
  assert.match(inspect(wrongCalibrationReviewer).join("\n"), /calibration reviewer does not match/);
  const unrelatedSource = structuredClone(receipt); unrelatedSource.factualReview.claimMap[0].sourceEvidence[0].excerpt = "words absent from source";
  assert.match(inspect(unrelatedSource).join("\n"), /does not occur/);
  const flatRatchet = structuredClone(receipt); flatRatchet.ratchet.reviewIssues = flatRatchet.ratchet.priorComparable.reviewIssues;
  assert.match(inspect(flatRatchet).join("\n"), /review issues did not decrease/);
  const missingLineage = structuredClone(receipt); delete missingLineage.lineage;
  assert.match(inspect(missingLineage).join("\n"), /lineage.kind is required/);
  const unboundSuccessor = structuredClone(receipt); delete unboundSuccessor.lineage.predecessorCandidateId;
  assert.match(inspect(unboundSuccessor).join("\n"), /successor lineage requires predecessorCandidateId/);
  const silentReject = structuredClone(held); delete silentReject.learningDisposition;
  assert.match(inspect(silentReject).join("\n"), /learningDisposition is required/);
  const missingComparable = structuredClone(receipt); delete missingComparable.ratchet.priorComparable;
  assert.match(inspect(missingComparable).join("\n"), /successor must bind a prior comparable/);
  const newsManifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), "utf8"));
  newsManifest.contentClass = "NEWS";
  fs.writeFileSync(path.join(root, manifestPath), JSON.stringify(newsManifest));
  const news = structuredClone(receipt); news.contentClass = "NEWS"; news.artifact.manifest = bind(manifestPath);
  news.outcomes.datedChange = structuredClone(news.outcomes.plainClarity);
  news.outcomes.consequenceAndUncertainty = structuredClone(news.outcomes.readerValue);
  assert.deepEqual(inspect(news), [], "material NEWS must include explain-back and unseen transfer evidence");
  const proseOnlyNews = structuredClone(news); delete proseOnlyNews.outcomes.unseenTransfer;
  assert.match(inspect(proseOnlyNews).join("\n"), /unseenTransfer is missing/);
  console.log("PROSE QUALITY CALIBRATION PASS valid=2 hold=1 rejected=25 exact_known_bad=1 artifact_identity=1 registry_fresh=1 observation_bound=1 reviewer_bound=1 claim_map=1 strict_ratchet=1 successor_comparable=1 news_transfer=1 learning_disposition=1 sitewide_writing=1 communication_benchmark=1 explanation_arc=1 no_pastiche=1 system_reconstruction=1 dominant_voice_span=1 four_part_purpose=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
