#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspectNewsstandDraftPreflight } from "./check-newsstand-draft-preflight.mjs";
import { featureLaneContractSha256, LANE_REGISTRY_PATH, STANDARD_PATH } from "./check-newsstand-producer-proof.mjs";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-newsstand-draft-preflight-"));
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const write = (relative, body) => {
  const absolute = path.join(root, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, body);
  return { path: relative, sha256: sha256(body) };
};

try {
  const standard = write(STANDARD_PATH, "Daily producer standard\n");
  const sourceMap = write("operations/product-stewards/newsstand/candidates/source-map.md", "Exact claim map\n");
  const lane = { id: "daily_news", publicName: "The Daily", publishesIn: "Daily", cadence: "daily", readerJob: "explain one change", storyModes: ["REPORT_OR_ANNOUNCEMENT"], templateBeats: ["plain answer"], targetWords: { minimum: 60, maximum: 300 }, sourceRules: ["primary source"], distinctFrom: "one dated change", negativeExemplarIds: ["BAD-1"] };
  const registryBody = `${JSON.stringify({ lanes: [lane] }, null, 2)}\n`;
  write(LANE_REGISTRY_PATH, registryBody);
  const proofPath = "operations/product-stewards/newsstand/candidates/proof.json";
  const proof = {
    schemaVersion: "laidies-newsstand-producer-proof.v1", candidateId: "DAILY-TEST", publication: "THE_DAILY", storyMode: "REPORT_OR_ANNOUNCEMENT", status: "READY_FOR_FULL_DRAFT",
    productionStandard: standard, sourceMap,
    readerQuestion: "What happened and what should I do?", readerPayoff: "The reader understands the change and can act.",
    headline: "Shared AI work files can carry private details",
    opening: "A study found private details inside technical AI work files people had published. It did not show that ordinary private chats became public. Share the checked result, not the complete work file.",
    newcomerBackground: "Some teams publish detailed AI task records so other people can inspect the work.",
    causalOutline: ["The tool keeps more than the visible answer.", "A person publishes the complete record.", "The larger record carries private material."],
    evidenceBoundary: { establishes: "Private items appeared in sampled public records.", doesNotEstablish: "Ordinary chats became public." },
    numberPlan: [{ value: "328", unit: "affected records", firstUseSentence: "The 328 affected records contained at least one private item." }],
    statAttribution: { sourceName: "Example Lab", sourceYear: "2026", requiredSentence: "In 2026, Example Lab published the study behind these figures." },
    statRelationship: { requiredSentence: "This sample uses one record count, so no group or unit changes need reconciling." },
    mechanismBridge: { objectLocationSentence: "The larger work file stores both the visible answer and sealed information.", attackDefinitionSentence: "The attack handed the sealed part from a published work file to a less-protected sibling model.", evidenceRecoverySentence: "Using that inspection method, the researchers could read what the larger files carried." },
    actionOpening: "When you share an AI-assisted result, copy only what you mean to send, check it and remove private details.",
    incidentAction: "If a public work file contains credentials, replace them.",
    evidenceParagraphBreaksAfter: ["The 328 affected records contained at least one private item."],
    plainGlosses: [{ term: "placeholder", requiredSentence: "A placeholder is a fill-in-the-blank example rather than a real credential." }],
    centralInstruction: { opening: "Share the checked result, not the complete work file.", action: "At work, share the checked result.", closing: "At home, share the finished travel plan rather than the complete work file.", prohibitedRestatements: ["A clean chat does not clean the file."] },
    evidenceSequence: ["Using that inspection method, the researchers could read what the larger files carried.", "In 2026, Example Lab published the study behind these figures.", "A placeholder is a fill-in-the-blank example rather than a real credential.", "The 328 affected records contained at least one private item."],
    readerSources: [{ label: "Primary study", url: "https://example.org/study" }],
    voicePlan: { move: "The result is the final cut; the work record is the editing room.", teachingJob: "Distinguish two share objects.", limit: "A record is not literally a film.", readerFacingLimit: "The comparison is only about what you choose to release; providers protect their systems differently.", humanTruth: "The ordinary instinct to attach the biggest file can make a careful answer less safe.", warmthLines: [{ sectionHeading: "The file carried more than the chat", line: "The tidy answer is the part her team wanted." }, { sectionHeading: "Before you attach the work file", line: "A work file does not politely leave the password behind." }] },
    sectionPlan: [
      { heading: "The file carried more than the chat", readerJob: "Explain the mechanism and evidence.", jobType: "MECHANISM" },
      { heading: "The same risk follows you home", readerJob: "Show the stakes in work and non-work settings without repeating the action.", jobType: "EXAMPLES_ONLY" },
      { heading: "Before you attach the work file", readerJob: "Give the sharing and recovery actions.", jobType: "ACTION" }
    ],
    draftLimits: { phraseCaps: [{ phrase: "checked result", maximum: 2 }], prohibitedPhrases: ["this next number counts"] },
    terminologyPlan: { plainTerm: "work file", stableObjectTerms: ["work file", "sealed information"], allowedMetaphorTerms: ["final cut", "editing room"], prohibitedSynonyms: ["production file", "director's cut"] },
    applications: { work: { disposition: "APPLY", example: "At work, a diagnosis file may carry deployment credentials." }, nonWork: { disposition: "APPLY", example: "At home, a travel file may include booking details." } },
    usefulLanding: "Share the checked result.", routingReason: "One dated finding with one immediate action.", intendedWords: 120, lengthEscalationReason: "",
    producerPreflight: { negativeExamplesRead: true, laneId: "daily_news", laneContractSha256: featureLaneContractSha256(lane), negativeExemplarIdsRead: ["BAD-1"], repeatedDefects: [], actualFormatUsed: true }
  };
  const proofBody = `${JSON.stringify(proof, null, 2)}\n`;
  write(proofPath, proofBody);
  const proofReview = {
    schemaVersion: "laidies-newsstand-producer-proof-review-invocation.v1",
    proof: { path: proofPath, sha256: sha256(proofBody) }, standard, sourceMap,
    review: { verdict: "PASS", draftPermission: "FULL_DRAFT_ALLOWED" }
  };
  const draftPath = "operations/product-stewards/newsstand/candidates/draft.md";
  const draft = `# The Daily\n\n## ${proof.headline}\n\n${proof.opening}\n\n### ${proof.sectionPlan[0].heading}\n\n${proof.mechanismBridge.objectLocationSentence} ${proof.mechanismBridge.attackDefinitionSentence} ${proof.mechanismBridge.evidenceRecoverySentence} ${proof.statAttribution.requiredSentence} ${proof.plainGlosses[0].requiredSentence} ${proof.numberPlan[0].firstUseSentence}\n\nThe tool kept more than the visible answer, and the complete record carried that material when somebody published it. The result is the final cut. The full work record is the editing room. ${proof.voicePlan.readerFacingLimit} ${proof.voicePlan.humanTruth} ${proof.voicePlan.warmthLines[0].line}\n\n### ${proof.sectionPlan[1].heading}\n\nAt work, a diagnosis file may carry deployment credentials. At home, a travel file may include booking details.\n\n### ${proof.sectionPlan[2].heading}\n\n${proof.actionOpening} ${proof.incidentAction} ${proof.voicePlan.warmthLines[1].line} At work, share the checked result. At home, share the finished travel plan rather than the complete work file.\n\n## Sources\n\n- [Primary study](${proof.readerSources[0].url})\n`;
  const args = { proof, proofPath, proofBody, proofReview, draftBody: draft, draftPath };
  assert.deepEqual(inspectNewsstandDraftPreflight(args, { root }).errors, []);

  const staleReview = structuredClone(args);
  staleReview.proofReview.proof.sha256 = "0".repeat(64);
  assert.match(inspectNewsstandDraftPreflight(staleReview, { root }).errors.join("\n"), /exact current proof/);
  const changedHeadline = { ...args, draftBody: draft.replace(proof.headline, "A teasing replacement headline") };
  assert.match(inspectNewsstandDraftPreflight(changedHeadline, { root }).errors.join("\n"), /headline/);
  const changedOpening = { ...args, draftBody: draft.replace(proof.opening, "Encrypted blocks crossed an API boundary.") };
  assert.match(inspectNewsstandDraftPreflight(changedOpening, { root }).errors.join("\n"), /opening/);
  const missingUnit = { ...args, draftBody: draft.replace(proof.numberPlan[0].firstUseSentence, "The study found 328.") };
  assert.match(inspectNewsstandDraftPreflight(missingUnit, { root }).errors.join("\n"), /numberPlan/);
  const missingAttribution = { ...args, draftBody: draft.replace(proof.statAttribution.requiredSentence, "") };
  assert.match(inspectNewsstandDraftPreflight(missingAttribution, { root }).errors.join("\n"), /point-of-use source\/year/);
  const missingBridge = { ...args, draftBody: draft.replace(proof.mechanismBridge, "") };
  missingBridge.draftBody = draft.replace(proof.mechanismBridge.objectLocationSentence, "");
  assert.match(inspectNewsstandDraftPreflight(missingBridge, { root }).errors.join("\n"), /invisible-object location/);
  const missingRecovery = { ...args, draftBody: draft.replace(proof.mechanismBridge.evidenceRecoverySentence, "") };
  assert.match(inspectNewsstandDraftPreflight(missingRecovery, { root }).errors.join("\n"), /evidence-recovery/);
  const missingAttackDefinition = { ...args, draftBody: draft.replace(proof.mechanismBridge.attackDefinitionSentence, "") };
  assert.match(inspectNewsstandDraftPreflight(missingAttackDefinition, { root }).errors.join("\n"), /attack-definition/);
  const missingDirectAction = { ...args, draftBody: draft.replace(proof.actionOpening, "") };
  assert.match(inspectNewsstandDraftPreflight(missingDirectAction, { root }).errors.join("\n"), /direct action opening/);
  const wrongEvidenceOrder = { ...args, draftBody: draft.replace(`${proof.mechanismBridge.evidenceRecoverySentence} ${proof.statAttribution.requiredSentence} ${proof.plainGlosses[0].requiredSentence} ${proof.numberPlan[0].firstUseSentence}`, `${proof.statAttribution.requiredSentence} ${proof.mechanismBridge.evidenceRecoverySentence} ${proof.plainGlosses[0].requiredSentence} ${proof.numberPlan[0].firstUseSentence}`) };
  assert.match(inspectNewsstandDraftPreflight(wrongEvidenceOrder, { root }).errors.join("\n"), /evidenceSequence order/);
  const missingHumanTruth = { ...args, draftBody: draft.replace(proof.voicePlan.humanTruth, "") };
  assert.match(inspectNewsstandDraftPreflight(missingHumanTruth, { root }).errors.join("\n"), /human-truth voice line/);
  const missingSource = { ...args, draftBody: draft.replace(proof.readerSources[0].url, "https://example.org/other") };
  assert.match(inspectNewsstandDraftPreflight(missingSource, { root }).errors.join("\n"), /readerSources/);
  const missingVoice = { ...args, draftBody: draft.replace("The result is the final cut. The full work record is the editing room", "The two files are different") };
  assert.match(inspectNewsstandDraftPreflight(missingVoice, { root }).errors.join("\n"), /voice move/);
  const exposedProductionNote = { ...args, draftBody: draft.replace(proof.voicePlan.readerFacingLimit, "The analogy stops here.") };
  assert.match(inspectNewsstandDraftPreflight(exposedProductionNote, { root }).errors.join("\n"), /reader-facing analogy limit|producer or review language/);
  const wrongSections = { ...args, draftBody: draft.replace(proof.sectionPlan[0].heading, "What happened") };
  assert.match(inspectNewsstandDraftPreflight(wrongSections, { root }).errors.join("\n"), /section headings/);
  const repeatedPhrase = { ...args, draftBody: draft.replace("At work, share the checked result.", "At work, share the checked result. Share the checked result. Share the checked result.") };
  assert.match(inspectNewsstandDraftPreflight(repeatedPhrase, { root }).errors.join("\n"), /phrase cap/);
  const synonymDrift = { ...args, draftBody: draft.replace("complete work file", "production file") };
  assert.match(inspectNewsstandDraftPreflight(synonymDrift, { root }).errors.join("\n"), /prohibited synonym/);
  const nobodyConstruction = { ...args, draftBody: draft.replace("At work, share the checked result.", "Nobody asked for the whole file. At work, share the checked result.") };
  assert.match(inspectNewsstandDraftPreflight(nobodyConstruction, { root }).errors.join("\n"), /banned sentence-leading 'nobody'/);
  const badDashSpacing = { ...args, draftBody: draft.replace("The result is the final cut.", "The result—the final cut—should be shared.") };
  assert.match(inspectNewsstandDraftPreflight(badDashSpacing, { root }).errors.join("\n"), /em-dash spacing/);
  const mergedEvidenceNote = { ...args, draftBody: draft.replace("\n\n## Sources", " Evidence remains bounded.\n**Evidence note:** This is a preprint.\n\n## Sources") };
  assert.match(inspectNewsstandDraftPreflight(mergedEvidenceNote, { root }).errors.join("\n"), /separate Markdown paragraph/);
  const productionNumberNarration = { ...args, draftBody: draft.replace(proof.numberPlan[0].firstUseSentence, `${proof.numberPlan[0].firstUseSentence} This next number counts records.`) };
  assert.match(inspectNewsstandDraftPreflight(productionNumberNarration, { root }).errors.join("\n"), /prohibited production phrase/);
  const numberCoaching = { ...args, draftBody: draft.replace(proof.numberPlan[0].firstUseSentence, `${proof.numberPlan[0].firstUseSentence} You do not need to remember every number.`) };
  assert.match(inspectNewsstandDraftPreflight(numberCoaching, { root }).errors.join("\n"), /number-plan coaching/);
  const missingWarmthLine = { ...args, draftBody: draft.replace(proof.voicePlan.warmthLines[1].line, "") };
  assert.match(inspectNewsstandDraftPreflight(missingWarmthLine, { root }).errors.join("\n"), /warmthLines/);
  const centralRestatement = { ...args, draftBody: draft.replace("At work, share the checked result.", "A clean chat does not clean the file. At work, share the checked result.") };
  assert.match(inspectNewsstandDraftPreflight(centralRestatement, { root }).errors.join("\n"), /prohibited restatement/);
  const missingIncidentAction = { ...args, draftBody: draft.replace(proof.incidentAction, "") };
  assert.match(inspectNewsstandDraftPreflight(missingIncidentAction, { root }).errors.join("\n"), /actor\/object incident action/);
  const missingGloss = { ...args, draftBody: draft.replace(proof.plainGlosses[0].requiredSentence, "") };
  assert.match(inspectNewsstandDraftPreflight(missingGloss, { root }).errors.join("\n"), /plainGlosses/);
  const missingEvidenceBreak = { ...args, draftBody: draft.replace(`${proof.evidenceParagraphBreaksAfter[0]}\n\n`, `${proof.evidenceParagraphBreaksAfter[0]} `) };
  assert.match(inspectNewsstandDraftPreflight(missingEvidenceBreak, { root }).errors.join("\n"), /evidenceParagraphBreaksAfter/);
  const repeatedActionInExamples = { ...args, draftBody: draft.replace("At work, a diagnosis file may carry deployment credentials.", "At work, send the diagnosis instead of the file.") };
  assert.match(inspectNewsstandDraftPreflight(repeatedActionInExamples, { root }).errors.join("\n"), /EXAMPLES_ONLY section/);
  const oversized = { ...args, draftBody: `${draft}\n${"extra ".repeat(200)}` };
  assert.match(inspectNewsstandDraftPreflight(oversized, { root }).errors.join("\n"), /maximum/);
  console.log("NEWSSTAND DRAFT PREFLIGHT CALIBRATION PASS: valid exact draft accepted; stale proof review, changed headline/opening, missing number sentence, point-of-use attribution, method bridge, source, voice, human-truth line, exposed production note, production number narration, repeated action in examples, banned nobody construction, bad dash spacing, merged evidence note, wrong section plan, repeated phrase, terminology drift and oversized draft rejected");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
