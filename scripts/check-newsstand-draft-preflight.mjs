#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandProducerProof, LANE_REGISTRY_PATH } from "./check-newsstand-producer-proof.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HASH = /^[a-f0-9]{64}$/;
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const normalize = value => String(value || "").replace(/\s+/g, " ").trim();
const words = value => normalize(value).split(" ").filter(Boolean).length;
const escapeRegExp = value => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PUBLIC_PRODUCTION_NOTES = /\b(the analogy stops|this analogy stops|the producer|the reviewer|the template requires|production standard)\b/i;
const BANNED_FALSE_EXCLUSIVITY = /(?:^|[.!?]\s+)nobody\b/im;
const BANNED_NUMBER_COACHING = /\b(?:the number to (?:remember|circle)|you do not need to remember every number|the useful split is(?: this)?|here are the numbers? to remember)\b/i;
const PUBLICATION_LANES = {
  THE_BREAKING: "the_breaking",
  THE_DAILY: "daily_news",
  THE_WEEKLY: "the_weekly",
  THE_BIG_PICTURE: "the_big_picture",
  STRAIGHT_TALK: "straight_talk",
  DEAR_MISS_JEEVES: "dear_miss_jeeves",
  PAIGE_TIP: "paige_tip",
  CAREER_WORK_LIFE: "career_work_life",
  PROMPTOSCOPE: "promptoscope"
};

function exactReviewBinding(review, proofPath, proofBody, proof, errors) {
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(review?.schemaVersion === "laidies-newsstand-producer-proof-review-invocation.v1", "proof review schemaVersion mismatch");
  require(review?.proof?.path === proofPath && review?.proof?.sha256 === sha256(proofBody), "proof review does not bind the exact current proof");
  require(review?.standard?.path === proof?.productionStandard?.path && review?.standard?.sha256 === proof?.productionStandard?.sha256, "proof review does not bind the current production standard");
  require(review?.sourceMap?.path === proof?.sourceMap?.path && review?.sourceMap?.sha256 === proof?.sourceMap?.sha256, "proof review does not bind the current source map");
  require(review?.review?.verdict === "PASS" && review?.review?.draftPermission === "FULL_DRAFT_ALLOWED", "current proof review does not allow a full draft");
}

export function inspectNewsstandDraftPreflight({ proof, proofPath, proofBody, proofReview, draftBody, draftPath }, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  errors.push(...inspectNewsstandProducerProof(proof, { root }).errors.map(error => `proof:${error}`));
  exactReviewBinding(proofReview, proofPath, proofBody, proof, errors);

  let registry;
  try { registry = JSON.parse(fs.readFileSync(path.resolve(root, LANE_REGISTRY_PATH), "utf8")); }
  catch (error) { errors.push(`feature lane registry is unavailable: ${error.message}`); }
  const lane = registry?.lanes?.find(item => item.id === PUBLICATION_LANES[proof?.publication]);
  require(Boolean(lane), "publication has no registered feature lane");

  const normalizedDraft = normalize(draftBody);
  const headline = (draftBody.match(/^##\s+(.+)$/m) || [])[1];
  require(normalize(headline) === normalize(proof?.headline), "draft headline does not exactly match the admitted proof headline");
  const headlineIndex = draftBody.indexOf(`## ${headline || ""}`);
  const afterHeadline = headlineIndex >= 0 ? draftBody.slice(headlineIndex + (`## ${headline || ""}`).length).trimStart() : "";
  const opening = afterHeadline.split(/^###\s+/m)[0].trim();
  require(normalize(opening) === normalize(proof?.opening), "draft opening does not exactly match the admitted answer-first proof opening");

  const draftWords = words(draftBody);
  require(Number.isInteger(lane?.targetWords?.minimum) && Number.isInteger(lane?.targetWords?.maximum), "lane target word range is unavailable");
  if (lane?.targetWords) {
    require(draftWords >= lane.targetWords.minimum, `draft is below the ${lane.id} minimum of ${lane.targetWords.minimum} words`);
    require(draftWords <= lane.targetWords.maximum, `draft exceeds the ${lane.id} maximum of ${lane.targetWords.maximum} words`);
  }

  for (const [index, item] of (proof?.numberPlan || []).entries()) {
    require(normalizedDraft.includes(normalize(item.firstUseSentence)), `draft does not contain numberPlan[${index}] exact first-use sentence`);
    if (item.maximumOccurrences) {
      const escaped = item.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const occurrences = (normalizedDraft.match(new RegExp(escaped, "g")) || []).length;
      require(occurrences <= item.maximumOccurrences, `draft repeats numberPlan[${index}] value ${item.value} (${occurrences}/${item.maximumOccurrences})`);
    }
  }
  if ((proof?.numberPlan || []).length > 0) {
    require(normalizedDraft.includes(normalize(proof?.statAttribution?.requiredSentence)), "draft does not contain the exact point-of-use source/year attribution sentence");
  }
  if ((proof?.numberPlan || []).length > 1) require(normalizedDraft.includes(normalize(proof?.statRelationship?.requiredSentence)), "draft does not contain the exact relationship between changed statistical groups, units or filters");
  require(normalizedDraft.includes(normalize(proof?.mechanismBridge?.objectLocationSentence)), "draft does not contain the exact invisible-object location sentence");
  require(normalizedDraft.includes(normalize(proof?.mechanismBridge?.attackDefinitionSentence)), "draft does not contain the exact attack-definition sentence");
  require(normalizedDraft.includes(normalize(proof?.mechanismBridge?.evidenceRecoverySentence)), "draft does not contain the exact evidence-recovery sentence");
  require(normalizedDraft.includes(normalize(proof?.actionOpening)), "draft does not contain the exact direct action opening");
  require(normalizedDraft.includes(normalize(proof?.incidentAction)), "draft does not contain the exact actor/object incident action");
  for (const [index, gloss] of (proof?.plainGlosses || []).entries()) require(normalizedDraft.includes(normalize(gloss.requiredSentence)), `draft does not contain plainGlosses[${index}] exact sentence`);
  const normalizedParagraphsForBreak = draftBody.split(/\n\s*\n/).map(normalize);
  for (const [index, sentence] of (proof?.evidenceParagraphBreaksAfter || []).entries()) require(normalizedParagraphsForBreak.some(paragraph => paragraph.endsWith(normalize(sentence))), `draft does not preserve evidenceParagraphBreaksAfter[${index}]`);
  for (const key of ["opening", "action", "closing"]) require(normalizedDraft.includes(normalize(proof?.centralInstruction?.[key])), `draft does not contain centralInstruction.${key}`);
  for (const phrase of (proof?.centralInstruction?.prohibitedRestatements || [])) require(!normalizedDraft.toLowerCase().includes(normalize(phrase).toLowerCase()), `draft repeats the central instruction through prohibited restatement "${phrase}"`);
  let previousEvidenceIndex = -1;
  for (const [index, sentence] of (proof?.evidenceSequence || []).entries()) {
    const sentenceIndex = normalizedDraft.indexOf(normalize(sentence));
    require(sentenceIndex >= 0, `draft does not contain evidenceSequence[${index}] exact sentence`);
    require(sentenceIndex > previousEvidenceIndex, `draft does not preserve evidenceSequence order at item ${index}`);
    previousEvidenceIndex = sentenceIndex;
  }
  for (const [index, source] of (proof?.readerSources || []).entries()) {
    require(draftBody.includes(source.url), `draft does not contain readerSources[${index}] exact URL`);
  }
  const voiceTerms = normalize(proof?.voicePlan?.move).toLowerCase().match(/[a-z0-9]+(?:\s+[a-z0-9]+){1,2}/g) || [];
  const distinctiveVoiceTerms = voiceTerms.filter(term => /final cut|editing room/.test(term));
  require(distinctiveVoiceTerms.length > 0 && distinctiveVoiceTerms.some(term => normalizedDraft.toLowerCase().includes(term)), "draft does not perform the proof's planned voice move");
  require(normalizedDraft.includes(normalize(proof?.voicePlan?.readerFacingLimit)), "draft does not contain the planned reader-facing analogy limit");
  require(normalizedDraft.includes(normalize(proof?.voicePlan?.humanTruth)), "draft does not contain the planned human-truth voice line");
  require(normalizedDraft.includes(normalize(proof?.voicePlan?.mechanismMappingSentence)), "draft does not map the planned analogy to the central mechanism");
  for (const [index, warmth] of (proof?.voicePlan?.warmthLines || []).entries()) {
    const sectionPattern = new RegExp(`^###\\s+${escapeRegExp(warmth.sectionHeading)}\\n([\\s\\S]*?)(?=^###\\s+|^##\\s+|(?![\\s\\S]))`, "m");
    const sectionBody = draftBody.match(sectionPattern)?.[1] || "";
    require(normalize(sectionBody).includes(normalize(warmth.line)), `draft does not place voicePlan.warmthLines[${index}] in its bound section`);
  }
  require(!PUBLIC_PRODUCTION_NOTES.test(draftBody), "draft exposes producer or review language to the reader");
  require(!BANNED_FALSE_EXCLUSIVITY.test(draftBody), "draft uses a banned sentence-leading 'nobody' construction");
  require(!BANNED_NUMBER_COACHING.test(draftBody), "draft exposes number-plan coaching instead of stating the evidence as ordinary facts");
  for (const [index, character] of [...draftBody].entries()) {
    if (character === "—") require(/\s/.test(draftBody[index - 1] || "") && /\s/.test(draftBody[index + 1] || ""), "draft uses inconsistent em-dash spacing");
  }
  if (draftBody.includes("**Evidence note:**")) require(draftBody.includes("\n\n**Evidence note:**"), "Evidence note must begin a separate Markdown paragraph");
  for (const synonym of (proof?.terminologyPlan?.prohibitedSynonyms || [])) {
    require(!normalizedDraft.toLowerCase().includes(normalize(synonym).toLowerCase()), `draft uses prohibited synonym \"${synonym}\" instead of the terminology plan`);
  }
  for (const key of ["work", "nonWork"]) {
    if (proof?.applications?.[key]?.disposition === "APPLY") require(normalizedDraft.includes(normalize(proof.applications[key].example)), `draft does not contain the exact ${key} application sentence`);
  }

  const actualSections = [...draftBody.matchAll(/^###\s+(.+)$/gm)].map(match => normalize(match[1]));
  const plannedSections = (proof?.sectionPlan || []).map(section => normalize(section.heading));
  require(JSON.stringify(actualSections) === JSON.stringify(plannedSections), "draft section headings do not exactly perform the admitted section plan");
  const sectionMatches = [...draftBody.matchAll(/^###\s+(.+)\n([\s\S]*?)(?=^###\s+|^##\s+|(?![\s\S]))/gm)];
  for (const section of (proof?.sectionPlan || [])) {
    if (section.jobType !== "EXAMPLES_ONLY") continue;
    const match = sectionMatches.find(item => normalize(item[1]) === normalize(section.heading));
    const body = match?.[2] || "";
    require(!/\b(?:send|share|attach|copy|check|build|remove|replace|rotate)\b/i.test(body), `EXAMPLES_ONLY section "${section.heading}" repeats an action owned by the ACTION section`);
  }
  for (const [index, cap] of (proof?.draftLimits?.phraseCaps || []).entries()) {
    const escaped = cap.phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const occurrences = (normalizedDraft.match(new RegExp(escaped, "gi")) || []).length;
    require(occurrences <= cap.maximum, `draft exceeds phrase cap ${index} for \"${cap.phrase}\" (${occurrences}/${cap.maximum})`);
  }
  for (const phrase of (proof?.draftLimits?.prohibitedPhrases || [])) require(!normalizedDraft.toLowerCase().includes(normalize(phrase).toLowerCase()), `draft contains prohibited production phrase "${phrase}"`);

  const paragraphs = draftBody.split(/\n\s*\n/).map(normalize).filter(paragraph => words(paragraph) >= 12);
  require(new Set(paragraphs.map(paragraph => paragraph.toLowerCase())).size === paragraphs.length, "draft contains a repeated paragraph");
  require(typeof draftPath === "string" && draftPath.length > 0, "draftPath is required");
  return { errors, draftWords, draftSha256: sha256(draftBody), laneId: lane?.id || null };
}

function readJson(relative, label) {
  try { return { body: fs.readFileSync(path.resolve(relative), "utf8"), path: relative }; }
  catch (error) { console.error(`NEWSSTAND DRAFT PREFLIGHT FAIL\n- ${label} unavailable: ${error.message}`); process.exit(1); }
}

function main() {
  const args = process.argv.slice(2);
  const value = flag => { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] : null; };
  const proofFile = readJson(value("--proof"), "proof");
  const reviewFile = readJson(value("--proof-review"), "proof review");
  const draftFile = readJson(value("--draft"), "draft");
  let proof;
  let proofReview;
  try { proof = JSON.parse(proofFile.body); proofReview = JSON.parse(reviewFile.body); }
  catch (error) { console.error(`NEWSSTAND DRAFT PREFLIGHT FAIL\n- invalid JSON: ${error.message}`); process.exit(1); }
  const result = inspectNewsstandDraftPreflight({ proof, proofPath: proofFile.path, proofBody: proofFile.body, proofReview, draftBody: draftFile.body, draftPath: draftFile.path });
  if (result.errors.length) {
    console.error("NEWSSTAND DRAFT PREFLIGHT FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND DRAFT PREFLIGHT PASS lane=${result.laneId} words=${result.draftWords} sha256=${result.draftSha256} quality_authority=PRODUCER_PREFLIGHT_ONLY`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
