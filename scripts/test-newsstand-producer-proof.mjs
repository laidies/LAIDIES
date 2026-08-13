#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { featureLaneContractSha256, inspectNewsstandProducerProof, LANE_REGISTRY_PATH, STANDARD_PATH } from "./check-newsstand-producer-proof.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-proof-"));
const write = (relative, body) => {
  const absolute = path.join(root, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, body);
  return { path: relative, sha256: crypto.createHash("sha256").update(body).digest("hex") };
};

try {
  const standard = write(STANDARD_PATH, "binding production standard\n");
  const template = write("operations/product-stewards/newsstand/story-templates.md", "# The Daily — report, announcement or research finding\n\nExact section.\n");
  const acceptanceRecord = write("operations/product-stewards/newsstand/story-template-review.json", "{\"decision\":\"ACCEPT\"}\n");
  const acceptedTemplate = { ...template, section: "The Daily — report, announcement or research finding", sectionSha256: crypto.createHash("sha256").update("Exact section.\n").digest("hex"), acceptanceRecord };
  const lane = { id: "daily_news", publicName: "The Daily", publishesIn: "Daily", cadence: "daily", readerJob: "explain one change", storyModes: ["REPORT_OR_ANNOUNCEMENT"], templateBeats: ["plain answer"], targetWords: { minimum: 350, maximum: 700 }, sourceRules: ["primary source"], distinctFrom: "one dated change", negativeExemplarIds: ["BAD-DAILY-1"], approvedTemplatesByMode: { REPORT_OR_ANNOUNCEMENT: acceptedTemplate } };
  const laneRegistryBody = `${JSON.stringify({ lanes: [lane] }, null, 2)}\n`;
  write(LANE_REGISTRY_PATH, laneRegistryBody);
  const sourceMap = write("operations/product-stewards/newsstand/candidates/source-map.md", "source map\n");
  const proof = {
    schemaVersion: "laidies-newsstand-producer-proof.v1",
    candidateId: "NEWS-TEST-1",
    publication: "THE_DAILY",
    storyMode: "REPORT_OR_ANNOUNCEMENT",
    status: "READY_FOR_FULL_DRAFT",
    productionStandard: standard,
    storyTemplate: acceptedTemplate,
    sourceMap,
    readerQuestion: "What changed and should I do anything?",
    readerPayoff: "The reader can explain the change and make one useful choice.",
    headline: "A new sharing risk changes which AI files teams should send",
    opening: "Panfilov and colleagues reported a study shared before academic review on August 10, 2026. Developers and researchers had published raw AI work files on GitHub and Hugging Face so others could inspect or replay tasks. The researchers moved hidden data from those files into a weaker model from the same company and recovered private details. This matters to people publishing raw technical files; the study did not show ordinary private chats became public. Share the checked result, not the raw work file.",
    dailyOpeningFacts: {
      sourceIdentity: {
        namedSource: "Panfilov and colleagues",
        date: "August 10, 2026",
        status: "shared before academic review",
        requiredSentence: "Panfilov and colleagues reported a study shared before academic review on August 10, 2026."
      },
      sharingPath: {
        actor: "Developers and researchers",
        object: "raw AI work files",
        channels: "GitHub and Hugging Face",
        purpose: "inspect or replay tasks",
        requiredSentence: "Developers and researchers had published raw AI work files on GitHub and Hugging Face so others could inspect or replay tasks."
      },
      recoveryPath: {
        actor: "The researchers",
        action: "moved hidden data",
        target: "a weaker model from the same company",
        result: "recovered private details",
        requiredSentence: "The researchers moved hidden data from those files into a weaker model from the same company and recovered private details."
      },
      audienceBoundary: {
        affected: "people publishing raw technical files",
        notEstablished: "ordinary private chats became public",
        readerAction: "Share the checked result, not the raw work file",
        requiredSentence: "This matters to people publishing raw technical files; the study did not show ordinary private chats became public. Share the checked result, not the raw work file."
      }
    },
    newcomerBackground: "Some teams save and publish detailed work files so another person can inspect or replay an AI task.",
    causalOutline: [
      "The tool keeps more technical material than appears in the visible answer.",
      "A team publishes the complete work file instead of a newly checked result.",
      "Private material inside the larger file becomes available to whoever can read it."
    ],
    evidenceBoundary: { establishes: "The study found real private items in the sampled public files.", doesNotEstablish: "It does not establish that ordinary private chats were published." },
    numberPlan: [{ value: "328", unit: "affected records", firstUseSentence: "The study found 328 affected records in its sample." }],
    statAttribution: { sourceName: "Example Lab", sourceYear: "2026", requiredSentence: "In 2026, Example Lab published the study behind these figures." },
    statRelationship: { requiredSentence: "This sample uses one record count, so no group or unit changes need reconciling." },
    mechanismBridge: { objectLocationSentence: "The larger work file stores both the visible answer and the sealed part.", attackDefinitionSentence: "The attack handed the sealed part from a published work file to a less-protected sibling model.", evidenceRecoverySentence: "Using that inspection method, the researchers could read what the larger files carried." },
    actionOpening: "When you share an AI-assisted result, copy only what you mean to send, check it and remove private details.",
    incidentAction: "If a public work file contains credentials, replace them.",
    evidenceParagraphBreaksAfter: ["The study found 328 affected records in its sample."],
    plainGlosses: [{ term: "placeholder", requiredSentence: "A placeholder is a fill-in-the-blank example rather than a real credential." }],
    centralInstruction: { opening: "Send the checked result, not the whole work file.", action: "Copy only what you mean to send.", closing: "Am I sending the answer or the work file?", prohibitedRestatements: ["A clean chat does not clean the file."] },
    evidenceSequence: ["In 2026, Example Lab published the study behind these figures.", "A placeholder is a fill-in-the-blank example rather than a real credential.", "The study found 328 affected records in its sample.", "Using that inspection method, the researchers could read what the larger files carried."],
    readerSources: [{ label: "Primary study", url: "https://example.org/study" }],
    voicePlan: { move: "The answer is the final cut; the work record is the editing room.", teachingJob: "Distinguish the chosen result from the complete work record.", limit: "A technical record is not literally a film project.", readerFacingLimit: "The comparison is only about what you choose to release; each provider protects its systems differently.", humanTruth: "The ordinary instinct to attach the biggest file can make a careful answer less safe.", mechanismMappingSentence: "In this picture, the sealed part is a locked drawer inside the editing room.", warmthLines: [{ sectionHeading: "The chat was the final cut", line: "The tidy answer is the part her team wanted." }, { sectionHeading: "Before you attach the work file", line: "A work file does not politely leave the password behind." }] },
    sectionPlan: [
      { heading: "The chat was the final cut", readerJob: "Explain the visible-answer and full-record distinction plus mechanism.", jobType: "MECHANISM" },
      { heading: "Before you attach the work file", readerJob: "Give the exact sharing and recovery actions.", jobType: "ACTION" }
    ],
    draftLimits: { phraseCaps: [{ phrase: "checked result", maximum: 2 }], prohibitedPhrases: ["this next number counts"] },
    terminologyPlan: { plainTerm: "work file", stableObjectTerms: ["work file", "the sealed part"], allowedMetaphorTerms: ["final cut", "editing room"], prohibitedSynonyms: ["production file", "director's cut", "sealed information", "sealed parts"] },
    applications: {
      work: { disposition: "APPLY", example: "Share an approved memo rather than the coding assistant's full work file." },
      nonWork: { disposition: "APPLY", example: "Share the finished itinerary rather than the travel assistant's connected-account export." }
    },
    usefulLanding: "Choose and check the result you intend to share.",
    routingReason: "This is a dated practical change, not a multi-story synthesis or durable reference.",
    intendedWords: 550,
    lengthEscalationReason: "",
    producerPreflight: { negativeExamplesRead: true, laneId: "daily_news", laneContractSha256: featureLaneContractSha256(lane), negativeExemplarIdsRead: ["BAD-DAILY-1"], repeatedDefects: [], actualFormatUsed: true }
  };
  assert.deepEqual(inspectNewsstandProducerProof(proof, { root }).errors, []);
  const clickbait = structuredClone(proof);
  clickbait.headline = "The shocking secret you cannot see inside your AI";
  assert.match(inspectNewsstandProducerProof(clickbait, { root }).errors.join("\n"), /clickbait/);
  const suspenseClickbait = structuredClone(proof);
  suspenseClickbait.headline = "Shared AI work files carried passwords — and details the chat never showed";
  assert.match(inspectNewsstandProducerProof(suspenseClickbait, { root }).errors.join("\n"), /clickbait/);
  const jargonOpening = structuredClone(proof);
  jargonOpening.opening = "An encrypted reasoning block crossed an API boundary during the test.";
  assert.match(inspectNewsstandProducerProof(jargonOpening, { root }).errors.join("\n"), /technical vocabulary/);
  const missingDailyOpeningFacts = structuredClone(proof);
  delete missingDailyOpeningFacts.dailyOpeningFacts;
  assert.match(inspectNewsstandProducerProof(missingDailyOpeningFacts, { root }).errors.join("\n"), /dailyOpeningFacts is required/);
  const missingSharingPath = structuredClone(proof);
  missingSharingPath.dailyOpeningFacts.sharingPath.requiredSentence = "";
  assert.match(inspectNewsstandProducerProof(missingSharingPath, { root }).errors.join("\n"), /sharingPath.requiredSentence/);
  const openingHidesRecovery = structuredClone(proof);
  openingHidesRecovery.opening = openingHidesRecovery.opening.replace(openingHidesRecovery.dailyOpeningFacts.recoveryPath.requiredSentence, "Researchers found private details.");
  assert.match(inspectNewsstandProducerProof(openingHidesRecovery, { root }).errors.join("\n"), /opening must contain dailyOpeningFacts.recoveryPath.requiredSentence exactly/);
  const oversized = structuredClone(proof);
  oversized.intendedWords = 1600;
  assert.match(inspectNewsstandProducerProof(oversized, { root }).errors.join("\n"), /above 700 words/);
  const claimedWithoutPreflight = structuredClone(proof);
  claimedWithoutPreflight.producerPreflight.negativeExamplesRead = false;
  assert.match(inspectNewsstandProducerProof(claimedWithoutPreflight, { root }).errors.join("\n"), /negative examples/);
  const staleLaneContract = structuredClone(proof);
  staleLaneContract.producerPreflight.laneContractSha256 = "0".repeat(64);
  assert.match(inspectNewsstandProducerProof(staleLaneContract, { root }).errors.join("\n"), /current feature lane production rules/);
  const staleStoryTemplate = structuredClone(proof);
  staleStoryTemplate.storyTemplate.sectionSha256 = "0".repeat(64);
  assert.match(inspectNewsstandProducerProof(staleStoryTemplate, { root }).errors.join("\n"), /accepted template section bytes/);
  const skippedRegisteredNegative = structuredClone(proof);
  skippedRegisteredNegative.producerPreflight.negativeExemplarIdsRead = [];
  assert.match(inspectNewsstandProducerProof(skippedRegisteredNegative, { root }).errors.join("\n"), /every current lane negative exemplar/);
  const undefinedNumber = structuredClone(proof);
  undefinedNumber.numberPlan[0].firstUseSentence = "The study found 328 in its sample.";
  assert.match(inspectNewsstandProducerProof(undefinedNumber, { root }).errors.join("\n"), /exact unit/);
  const missingAttributionYear = structuredClone(proof);
  missingAttributionYear.statAttribution.requiredSentence = "Example Lab published the study behind these figures.";
  assert.match(inspectNewsstandProducerProof(missingAttributionYear, { root }).errors.join("\n"), /name the year/);
  const missingMechanismBridge = structuredClone(proof);
  missingMechanismBridge.mechanismBridge.objectLocationSentence = "";
  assert.match(inspectNewsstandProducerProof(missingMechanismBridge, { root }).errors.join("\n"), /objectLocationSentence/);
  const missingRecoveryBridge = structuredClone(proof);
  missingRecoveryBridge.mechanismBridge.evidenceRecoverySentence = "";
  assert.match(inspectNewsstandProducerProof(missingRecoveryBridge, { root }).errors.join("\n"), /evidenceRecoverySentence/);
  const missingAttackDefinition = structuredClone(proof);
  missingAttackDefinition.mechanismBridge.attackDefinitionSentence = "";
  assert.match(inspectNewsstandProducerProof(missingAttackDefinition, { root }).errors.join("\n"), /attackDefinitionSentence/);
  const missingActionOpening = structuredClone(proof);
  missingActionOpening.actionOpening = "";
  assert.match(inspectNewsstandProducerProof(missingActionOpening, { root }).errors.join("\n"), /actionOpening/);
  const missingCentralInstruction = structuredClone(proof);
  missingCentralInstruction.centralInstruction.closing = "";
  assert.match(inspectNewsstandProducerProof(missingCentralInstruction, { root }).errors.join("\n"), /centralInstruction.closing/);
  const missingIncidentAction = structuredClone(proof);
  missingIncidentAction.incidentAction = "";
  assert.match(inspectNewsstandProducerProof(missingIncidentAction, { root }).errors.join("\n"), /incidentAction/);
  const unexplainedGloss = structuredClone(proof);
  unexplainedGloss.plainGlosses[0].requiredSentence = "A fill-in-the-blank example is not real.";
  assert.match(inspectNewsstandProducerProof(unexplainedGloss, { root }).errors.join("\n"), /must explain the term/);
  const orphanGloss = structuredClone(proof);
  orphanGloss.evidenceSequence = orphanGloss.evidenceSequence.filter(sentence => sentence !== orphanGloss.plainGlosses[0].requiredSentence);
  assert.match(inspectNewsstandProducerProof(orphanGloss, { root }).errors.join("\n"), /not an orphan definition/);
  const missingEvidenceSequence = structuredClone(proof);
  missingEvidenceSequence.evidenceSequence = [];
  assert.match(inspectNewsstandProducerProof(missingEvidenceSequence, { root }).errors.join("\n"), /evidenceSequence/);
  const missingHumanTruth = structuredClone(proof);
  missingHumanTruth.voicePlan.humanTruth = "";
  assert.match(inspectNewsstandProducerProof(missingHumanTruth, { root }).errors.join("\n"), /humanTruth/);
  const missingMechanismMapping = structuredClone(proof);
  missingMechanismMapping.voicePlan.mechanismMappingSentence = "";
  assert.match(inspectNewsstandProducerProof(missingMechanismMapping, { root }).errors.join("\n"), /mechanismMappingSentence/);
  const missingWarmthLines = structuredClone(proof);
  missingWarmthLines.voicePlan.warmthLines = [];
  assert.match(inspectNewsstandProducerProof(missingWarmthLines, { root }).errors.join("\n"), /warmthLines/);
  const ambiguousAttackObject = structuredClone(proof);
  ambiguousAttackObject.mechanismBridge.attackDefinitionSentence = "The attack handed that sealed part to a sibling model.";
  assert.match(inspectNewsstandProducerProof(ambiguousAttackObject, { root }).errors.join("\n"), /ambiguous antecedent/);
  const duplicateActionSection = structuredClone(proof);
  duplicateActionSection.sectionPlan[0].jobType = "ACTION";
  assert.match(inspectNewsstandProducerProof(duplicateActionSection, { root }).errors.join("\n"), /exactly one ACTION/);
  const vagueSource = structuredClone(proof);
  vagueSource.readerSources[0].url = "provider docs";
  assert.match(inspectNewsstandProducerProof(vagueSource, { root }).errors.join("\n"), /exact HTTPS URL/);
  const genericSection = structuredClone(proof);
  genericSection.sectionPlan[0].heading = "What happened";
  assert.match(inspectNewsstandProducerProof(genericSection, { root }).errors.join("\n"), /generic scaffolding/);
  const duplicateSectionJob = structuredClone(proof);
  duplicateSectionJob.sectionPlan[1].readerJob = duplicateSectionJob.sectionPlan[0].readerJob;
  assert.match(inspectNewsstandProducerProof(duplicateSectionJob, { root }).errors.join("\n"), /reader jobs must be distinct/);
  const missingTerminology = structuredClone(proof);
  missingTerminology.terminologyPlan.plainTerm = "";
  assert.match(inspectNewsstandProducerProof(missingTerminology, { root }).errors.join("\n"), /terminologyPlan.plainTerm/);
  const missingStableObjects = structuredClone(proof);
  missingStableObjects.terminologyPlan.stableObjectTerms = [];
  assert.match(inspectNewsstandProducerProof(missingStableObjects, { root }).errors.join("\n"), /stableObjectTerms/);
  const missingPrimaryStableObject = structuredClone(proof);
  missingPrimaryStableObject.terminologyPlan.stableObjectTerms = ["the sealed part"];
  assert.match(inspectNewsstandProducerProof(missingPrimaryStableObject, { root }).errors.join("\n"), /must include terminologyPlan.plainTerm/);
  const proofSynonymDrift = structuredClone(proof);
  proofSynonymDrift.causalOutline[0] = "The production file keeps more technical material than the visible answer.";
  assert.match(inspectNewsstandProducerProof(proofSynonymDrift, { root }).errors.join("\n"), /producer proof uses prohibited synonym/);
  const sealedTermDrift = structuredClone(proof);
  sealedTermDrift.mechanismBridge.objectLocationSentence = "The work file stores the visible answer and sealed information.";
  assert.match(inspectNewsstandProducerProof(sealedTermDrift, { root }).errors.join("\n"), /producer proof uses prohibited synonym/);
  console.log("NEWSSTAND PRODUCER PROOF CALIBRATION PASS: valid bounded Daily proof accepted; explicit and suspense-form clickbait, jargon-first opening, missing source/sharing/recovery/audience opening facts, oversized Daily, stale lane contract, skipped negatives, undefined number unit, missing point-of-use year, missing mechanism bridge, missing human truth, duplicate action ownership, vague source, generic heading, duplicate section job, missing terminology plan, missing stable object register and proof-level terminology drift rejected");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
