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
  const registry = write("operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json", JSON.stringify({
    schemaVersion: "laidies-content-quality-exemplars.v1",
    negativeExemplars: [{ id: "BAD", path: badPath, sha256: hash(path.join(root, badPath)), incidentId: "fixture-incident", appliesTo: ["EXPLANATION"], failureFamilies: negativeFamilies }],
    positiveExemplars: [{ id: "GOOD", path: goodPath, sha256: hash(path.join(root, goodPath)), useFor: ["EXPLANATION", "NEWS"] }]
  }));
  const samplingPolicyPath = "operations/product-stewards/newsstand/recurring-service-sampling-policy.json";
  write(samplingPolicyPath, fs.readFileSync(path.resolve(samplingPolicyPath), "utf8"));
  const newsPolicyPath = "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json";
  write(newsPolicyPath, fs.readFileSync(path.resolve(newsPolicyPath), "utf8"));

  const excerpt = candidateBody.slice(0, 80);
  const required = ["plainClarity", "readerValue", "laidiesVoice", "engagingEnjoyable", "factualIntegrity", "freshnessReviewability", "surfaceFit", "connectedSystemUnderstanding", "dailyLifeConnection", "communicationBenchmark", "explanationArc", "explainBack", "unseenTransfer", "usefulAction", "analogyIntegrity"];
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
    ...(["explainBack", "unseenTransfer"].includes(name) ? { observedReaderEvidence: { evidenceType: "OBSERVED_HUMAN", administratorPrincipalId: "reader-study-admin", participants: observedParticipants } } : {})
  }]));
  const receipt = {
    schemaVersion: "laidies-prose-quality-review.v1", candidateId: "fixture", stage: "INDEPENDENT_SEMANTIC_ADMISSION", contentClass: "EXPLANATION", surface: "LIBRAIRY",
    maker: "maker", reviewer: { id: "independent-reader", principalId: "independent-reader-principal", role: "learning and prose reviewer", modelFamily: "claude", independentFromMaker: true, artifactFirst: true }, reviewMode: "EXACT_PROSE_IN_FULL", reviewedAt: "2026-08-07T07:00:00-07:00",
    artifact: { reviewText: bind(candidatePath), manifest: bind(manifestPath) },
    calibration: {
      registrySha256: hash(registry), reviewerPrincipalId: "independent-reader-principal", reviewedAt: "2026-08-07T06:59:00-07:00",
      negatives: [{ exemplarId: "BAD", verdict: "REJECT", identifiedFailureFamilies: negativeFamilies, evidence: [{ excerpt: "This glossary repeats labels.", locator: "bad.txt:1" }] }],
      positive: { exemplarId: "GOOD", verdict: "PASS", strengthsRetained: ["real problem", "connected mechanism"], evidence: [{ excerpt: "Start with her real work problem.", locator: "good.txt:1" }] }
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
  const defect = structuredClone(receipt); defect.failureFamilies.decorativeAnalogy.present = true;
  assert.match(inspect(defect).join("\n"), /decorativeAnalogy is present/);
  const nameOnly = structuredClone(receipt); delete nameOnly.outcomes.communicationBenchmark;
  assert.match(inspect(nameOnly).join("\n"), /communicationBenchmark is missing/);
  const pastiche = structuredClone(receipt); pastiche.failureFamilies.communicationPastiche.present = true;
  assert.match(inspect(pastiche).join("\n"), /communicationPastiche is present/);
  const missingArc = structuredClone(receipt); delete missingArc.outcomes.explanationArc;
  assert.match(inspect(missingArc).join("\n"), /explanationArc is missing/);
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
  for (const name of ["explainBack", "unseenTransfer"]) {
    delete producer.outcomes[name].observedReaderEvidence;
    producer.outcomes[name].simulatedReaderProbe = { prompt: `Probe ${name}`, probeResponse: "A hypothetical reader connects context, evidence and the human check.", expectedEvidence: "Mechanism and transfer." };
  }
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
  const serviceManifestPath = "content/service-manifest.json";
  write(serviceManifestPath, JSON.stringify({ schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: "concept-01-context", surface: "NEWSSTAND_RECURRING_SERVICE_COLUMNS", contentClass: "EXPLANATION", reviewText: bind(candidatePath) }));
  const sampledService = structuredClone(receipt);
  sampledService.candidateId = "concept-01-context";
  sampledService.surface = "NEWSSTAND_RECURRING_SERVICE_COLUMNS";
  sampledService.artifact.manifest = bind(serviceManifestPath);
  sampledService.limitations.push("No observed human-comprehension evidence is claimed for this entry; batch sampling is pending.");
  for (const name of ["explainBack", "unseenTransfer"]) delete sampledService.outcomes[name].observedReaderEvidence;
  sampledService.samplingOverride = {
    policy: bind(samplingPolicyPath), policyId: "newsstand-recurring-service-sampled-comprehension-2026-08-30",
    serviceType: "concept_week", sampleStatus: "PENDING_BATCH_SAMPLE", batchId: "daily-service-batch-fixture",
    sampleQueue: ["concept-01-context"], correctionFeedbackStatus: "PENDING_RECURRING_REVIEWER_FEEDBACK"
  };
  assert.deepEqual(inspect(sampledService), [], "authorized NewsStand service profile may use pending batch sampling without fabricated human evidence");
  const crossSurface = structuredClone(sampledService); crossSurface.surface = "NEWSSTAND";
  assert.match(inspect(crossSurface).join("\n"), /limited to NEWSSTAND_RECURRING_SERVICE_COLUMNS/);
  const bigPicture = structuredClone(sampledService); bigPicture.surface = "NEWSSTAND_BIG_PICTURE";
  assert.match(inspect(bigPicture).join("\n"), /limited to NEWSSTAND_RECURRING_SERVICE_COLUMNS/);
  const noIndependentProof = structuredClone(sampledService); delete noIndependentProof.samplingOverride;
  assert.match(inspect(noIndependentProof).join("\n"), /observedReaderEvidence/);
  const originalRegistry = fs.readFileSync(registry, "utf8");
  const voiceRegistry = JSON.parse(originalRegistry);
  voiceRegistry.positiveExemplars.push({ id: "CQX-GOOD-EPISODE-001", path: goodPath, sha256: hash(path.join(root, goodPath)), useFor: ["EPISODE"] });
  fs.writeFileSync(registry, JSON.stringify(voiceRegistry));
  const voiceOnlyService = structuredClone(sampledService);
  voiceOnlyService.calibration.registrySha256 = hash(registry);
  voiceOnlyService.calibration.positive.exemplarId = "CQX-GOOD-EPISODE-001";
  voiceOnlyService.calibration.positive.application = "VOICE_ONLY_NO_FACT_OR_FORMAT_INHERITANCE";
  assert.deepEqual(inspect(voiceOnlyService), [], "short service voice calibration does not inherit episode format or claims");
  const wrongVoiceSurface = structuredClone(voiceOnlyService); wrongVoiceSurface.surface = "LIBRAIRY";
  assert.match(inspect(wrongVoiceSurface).join("\n"), /not approved for EXPLANATION/);
  const inheritsVoiceFacts = structuredClone(voiceOnlyService); delete inheritsVoiceFacts.calibration.positive.application;
  assert.match(inspect(inheritsVoiceFacts).join("\n"), /not approved for EXPLANATION/);
  fs.writeFileSync(registry, originalRegistry);
  const newsManifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), "utf8"));
  newsManifest.contentClass = "NEWS";
  fs.writeFileSync(path.join(root, manifestPath), JSON.stringify(newsManifest));
  const news = structuredClone(receipt); news.contentClass = "NEWS"; news.artifact.manifest = bind(manifestPath);
  news.outcomes.datedChange = structuredClone(news.outcomes.plainClarity);
  news.outcomes.consequenceAndUncertainty = structuredClone(news.outcomes.readerValue);
  assert.deepEqual(inspect(news), [], "material NEWS must include explain-back and unseen transfer evidence");
  const newsAnalysisPath = "evidence/news-editorial-analysis.json";
  const editorialNews = structuredClone(news);
  editorialNews.candidateId = "ordinary-news-fixture";
  editorialNews.surface = "NEWSSTAND_DAILY";
  const editorialManifestPath = "content/news-editorial-manifest.json";
  write(editorialManifestPath, JSON.stringify({ schemaVersion: "laidies-content-artifact-manifest.v1", candidateId: editorialNews.candidateId, surface: editorialNews.surface, contentClass: "NEWS", reviewText: bind(candidatePath) }));
  editorialNews.artifact.manifest = bind(editorialManifestPath);
  editorialNews.reviewedAt = "2026-08-31T10:00:00-07:00";
  editorialNews.reviewer.principalId = "independent-news-principal";
  editorialNews.calibration.reviewerPrincipalId = "independent-news-principal";
  editorialNews.calibration.reviewedAt = "2026-08-31T09:00:00-07:00";
  editorialNews.limitations = ["AI editorial assessment only; no observed human-comprehension evidence is claimed."];
  for (const name of ["explainBack", "unseenTransfer"]) delete editorialNews.outcomes[name].observedReaderEvidence;
  const makeAnalysis = (prompt, response) => ({ evidenceType: "AI_EDITORIAL_ANALYSIS", prompt, response, expectedEvidence: "Mechanism, consequence and a distinct case.", assessment: "PASS: the answer identifies the mechanism and reader action." });
  const analysis = {
    evidenceType: "AI_EDITORIAL_ANALYSIS", candidateId: editorialNews.candidateId,
    reviewerPrincipalId: editorialNews.reviewer.principalId, reviewTextSha256: editorialNews.artifact.reviewText.sha256,
    outcomes: {
      explainBack: makeAnalysis("Explain why the policy supports the promise.", "It supplies the evidence; the model only drafts."),
      unseenTransfer: makeAnalysis("Apply the same distinction to a travel rule.", "Use the current travel rule as evidence and verify the date.")
    },
    checks: Object.fromEntries(["incidentExplained", "termsExplainedInContext", "readerConsequenceSpecific", "noInternalNotesOrInventedAdvice"].map(name => [name, { verdict: "PASS", observation: `${name} passes on the exact prose.`, artifactEvidence: [{ excerpt, locator: "candidate.md:1" }] }]))
  };
  editorialNews.outcomes.explainBack.aiEditorialAnalysis = analysis.outcomes.explainBack;
  editorialNews.outcomes.unseenTransfer.aiEditorialAnalysis = analysis.outcomes.unseenTransfer;
  write(newsAnalysisPath, JSON.stringify(analysis));
  editorialNews.newsEditorialReview = { policy: bind(newsPolicyPath), analysis: bind(newsAnalysisPath) };
  assert.deepEqual(inspect(editorialNews), [], "authorized Daily NEWS may use bound AI editorial analysis without human observations");
  const missingAnalysis = structuredClone(editorialNews); delete missingAnalysis.newsEditorialReview.analysis;
  assert.match(inspect(missingAnalysis).join("\n"), /analysis.*required|analysis JSON|AI analysis requires/);
  const forgedHuman = structuredClone(editorialNews); forgedHuman.outcomes.explainBack.observedReaderEvidence = observedParticipants[0];
  assert.match(inspect(forgedHuman).join("\n"), /cannot claim observed humans/);
  for (const [field, value] of [["surface", "NEWSSTAND_BIG_PICTURE"], ["surface", "NEWSSTAND_RECURRING_SERVICE_COLUMNS"], ["contentClass", "EXPLANATION"]]) { const wrong = structuredClone(editorialNews); wrong[field] = value; assert.match(inspect(wrong).join("\n"), /limited to independent ordinary NEWSSTAND_DAILY NEWS review/); }
  const stale = structuredClone(editorialNews); stale.newsEditorialReview.policy.sha256 = "0".repeat(64);
  assert.match(inspect(stale).join("\n"), /SHA-256 mismatch/);
  const missingCheck = structuredClone(editorialNews); delete analysis.checks.incidentExplained; write(newsAnalysisPath, JSON.stringify(analysis)); missingCheck.newsEditorialReview.analysis = bind(newsAnalysisPath);
  assert.match(inspect(missingCheck).join("\n"), /incidentExplained requires/); analysis.checks.incidentExplained = { verdict: "PASS", observation: "pass", artifactEvidence: [{ excerpt, locator: "candidate.md:1" }] };
  const holdCheck = structuredClone(editorialNews); analysis.checks.incidentExplained.verdict = "HOLD"; write(newsAnalysisPath, JSON.stringify(analysis)); holdCheck.newsEditorialReview.analysis = bind(newsAnalysisPath);
  assert.match(inspect(holdCheck).join("\n"), /PASS forbidden/); analysis.checks.incidentExplained.verdict = "PASS";
  const missingTransfer = structuredClone(editorialNews); delete missingTransfer.outcomes.unseenTransfer;
  assert.match(inspect(missingTransfer).join("\n"), /unseenTransfer is missing/);
  const samePrompt = structuredClone(editorialNews); samePrompt.outcomes.unseenTransfer.aiEditorialAnalysis.prompt = samePrompt.outcomes.explainBack.aiEditorialAnalysis.prompt;
  assert.match(inspect(samePrompt).join("\n"), /different case/);
  const missingCore = structuredClone(editorialNews); delete missingCore.outcomes.plainClarity;
  assert.match(inspect(missingCore).join("\n"), /plainClarity is missing/);
  const missingFacts = structuredClone(editorialNews); delete missingFacts.factualReview.claimMap;
  assert.match(inspect(missingFacts).join("\n"), /claim-to-source map/);
  const producerMisuse = structuredClone(editorialNews); producerMisuse.stage = "PRODUCER_SELF_REVIEW"; producerMisuse.reviewer.principalId = producerMisuse.maker;
  assert.match(inspect(producerMisuse).join("\n"), /limited to independent ordinary NEWSSTAND_DAILY NEWS review/);
  const proseOnlyNews = structuredClone(news); delete proseOnlyNews.outcomes.unseenTransfer;
  assert.match(inspect(proseOnlyNews).join("\n"), /unseenTransfer is missing/);
  console.log("PROSE QUALITY CALIBRATION PASS valid=3 hold=1 rejected=24 exact_known_bad=1 artifact_identity=1 registry_fresh=1 observation_bound=1 reviewer_bound=1 claim_map=1 strict_ratchet=1 successor_comparable=1 news_transfer=1 learning_disposition=1 communication_benchmark=1 explanation_arc=1 no_pastiche=1 sampled_service_profile=1");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
