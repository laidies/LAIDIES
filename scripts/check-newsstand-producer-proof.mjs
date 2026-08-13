#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const STANDARD_PATH = "operations/product-stewards/newsstand/NEWSSTAND-EDITORIAL-PRODUCTION-STANDARD.md";
export const LANE_REGISTRY_PATH = "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json";
const HASH = /^[a-f0-9]{64}$/;
const PUBLICATIONS = new Set(["THE_BREAKING", "THE_DAILY", "THE_WEEKLY", "THE_BIG_PICTURE", "STRAIGHT_TALK", "DEAR_MISS_JEEVES", "PAIGE_TIP", "CAREER_WORK_LIFE", "PROMPTOSCOPE"]);
const MODES = new Set(["REPORT_OR_ANNOUNCEMENT", "HEADLINE_OR_REPORTING_CHECK", "UPDATE_TO_PRIOR_COVERAGE", "SERVICE_COLUMN"]);
const OPENING_JARGON = /\b(API|reasoning block|thinking block|thought signature|agent trajector(?:y|ies)|RLS|MCP|tokenization|vector database)\b/i;
const CLICKBAIT = /\b(you won't believe|shocking|terrifying|what happened next|the truth about|secret[s]? you cannot see|reveals? a wider route|everything you need to know|details? (?:that |the )?[^.!?]{0,40}never (?:showed|told|revealed))\b/i;
const GENERIC_SECTION_HEADING = /^(what happened|what it means|why it matters|what to do|what to share instead|where this reaches you|the bottom line)$/i;
const SECTION_JOB_TYPES = new Set(["MECHANISM", "EVIDENCE", "EXAMPLES_ONLY", "ACTION"]);
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const text = (value) => typeof value === "string" && value.trim().length > 0;
const words = (value) => String(value || "").trim().split(/\s+/).filter(Boolean).length;
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

export function featureLaneContractSha256(lane) {
  const contract = {
    id: lane?.id,
    publicName: lane?.publicName,
    publishesIn: lane?.publishesIn,
    cadence: lane?.cadence,
    readerJob: lane?.readerJob,
    storyModes: lane?.storyModes || [],
    templateBeats: lane?.templateBeats || [],
    targetWords: lane?.targetWords,
    sourceRules: lane?.sourceRules || [],
    distinctFrom: lane?.distinctFrom,
    negativeExemplarIds: lane?.negativeExemplarIds || [],
    approvedTemplatesByMode: lane?.approvedTemplatesByMode || {}
  };
  return sha256(Buffer.from(JSON.stringify(contract)));
}

function binding(root, value, expectedPath, label, errors) {
  if (!value || value.path !== expectedPath || !HASH.test(value.sha256 || "")) {
    errors.push(`${label} must bind ${expectedPath}`);
    return null;
  }
  const absolute = path.resolve(root, value.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) {
    errors.push(`${label} is unavailable`);
    return null;
  }
  const raw = fs.readFileSync(absolute);
  if (sha256(raw) !== value.sha256) errors.push(`${label} SHA-256 mismatch`);
  return raw;
}

export function inspectNewsstandProducerProof(proof, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(proof?.schemaVersion === "laidies-newsstand-producer-proof.v1", "schemaVersion mismatch");
  require(text(proof?.candidateId), "candidateId is required");
  require(PUBLICATIONS.has(proof?.publication), "publication is invalid");
  require(MODES.has(proof?.storyMode), "storyMode is invalid");
  require(proof?.status === "READY_FOR_FULL_DRAFT", "status must be READY_FOR_FULL_DRAFT");
  binding(root, proof?.productionStandard, STANDARD_PATH, "productionStandard", errors);
  let laneRegistry = null;
  let laneRegistryBytes = null;
  try {
    laneRegistryBytes = fs.readFileSync(path.resolve(root, LANE_REGISTRY_PATH));
    laneRegistry = JSON.parse(laneRegistryBytes.toString("utf8"));
  } catch (error) {
    errors.push(`feature lane registry is unavailable: ${error.message}`);
  }
  require(text(proof?.sourceMap?.path) && HASH.test(proof?.sourceMap?.sha256 || ""), "sourceMap binding is required");
  if (text(proof?.sourceMap?.path)) binding(root, proof.sourceMap, proof.sourceMap.path, "sourceMap", errors);
  for (const field of ["readerQuestion", "readerPayoff", "headline", "opening", "newcomerBackground", "usefulLanding", "routingReason"]) {
    require(text(proof?.[field]), `${field} is required`);
  }
  require(words(proof?.headline) <= 18, "headline exceeds 18 words");
  require(!CLICKBAIT.test(proof?.headline || ""), "headline contains a registered clickbait construction");
  require(words(proof?.opening) <= 90, "opening exceeds 90 words");
  require(!OPENING_JARGON.test(proof?.opening || ""), "opening uses technical vocabulary before plain meaning");
  if (proof?.publication === "THE_DAILY") {
    const openingFacts = proof?.dailyOpeningFacts;
    const requiredOpeningFacts = [
      ["sourceIdentity", ["namedSource", "date", "status", "requiredSentence"]],
      ["sharingPath", ["actor", "object", "channels", "purpose", "requiredSentence"]],
      ["recoveryPath", ["actor", "action", "target", "result", "requiredSentence"]],
      ["audienceBoundary", ["affected", "notEstablished", "readerAction", "requiredSentence"]]
    ];
    require(openingFacts && typeof openingFacts === "object" && !Array.isArray(openingFacts), "dailyOpeningFacts is required for The Daily");
    for (const [factName, fields] of requiredOpeningFacts) {
      const fact = openingFacts?.[factName];
      require(fact && typeof fact === "object" && !Array.isArray(fact), `dailyOpeningFacts.${factName} is required`);
      for (const field of fields) require(text(fact?.[field]), `dailyOpeningFacts.${factName}.${field} is required`);
      const sentence = fact?.requiredSentence || "";
      require((proof?.opening || "").includes(sentence), `opening must contain dailyOpeningFacts.${factName}.requiredSentence exactly`);
      for (const field of fields.filter(field => field !== "requiredSentence")) {
        require(sentence.toLowerCase().includes(String(fact?.[field] || "").toLowerCase()), `dailyOpeningFacts.${factName}.requiredSentence must name ${field}`);
      }
    }
  }
  require(Array.isArray(proof?.causalOutline) && proof.causalOutline.length >= 3 && proof.causalOutline.length <= 6 && proof.causalOutline.every(text), "causalOutline requires three to six plain causal links");
  require(text(proof?.evidenceBoundary?.establishes), "evidenceBoundary.establishes is required");
  require(text(proof?.evidenceBoundary?.doesNotEstablish), "evidenceBoundary.doesNotEstablish is required");
  require(Array.isArray(proof?.numberPlan), "numberPlan must be an array; use [] when the story needs no numbers");
  for (const [index, number] of (proof?.numberPlan || []).entries()) {
    require(text(number?.value), `numberPlan[${index}].value is required`);
    require(text(number?.unit), `numberPlan[${index}].unit is required`);
    require(text(number?.firstUseSentence) && number.firstUseSentence.includes(number.value) && number.firstUseSentence.toLowerCase().includes(number.unit.toLowerCase()), `numberPlan[${index}].firstUseSentence must introduce the value and exact unit`);
    if (number?.baseValue) require(text(number.baseValue) && number.firstUseSentence.includes(number.baseValue), `numberPlan[${index}].firstUseSentence must name its base value ${number?.baseValue}`);
    if (number?.maximumOccurrences !== undefined) require(Number.isInteger(number.maximumOccurrences) && number.maximumOccurrences >= 1, `numberPlan[${index}].maximumOccurrences must be a positive integer`);
  }
  if ((proof?.numberPlan || []).length > 0) {
    require(text(proof?.statAttribution?.sourceName), "statAttribution.sourceName is required when the draft uses numbers");
    require(text(proof?.statAttribution?.sourceYear), "statAttribution.sourceYear is required when the draft uses numbers");
    require(text(proof?.statAttribution?.requiredSentence), "statAttribution.requiredSentence is required when the draft uses numbers");
    require((proof?.statAttribution?.requiredSentence || "").includes(proof?.statAttribution?.sourceName || ""), "statAttribution.requiredSentence must name the source");
    require((proof?.statAttribution?.requiredSentence || "").includes(proof?.statAttribution?.sourceYear || ""), "statAttribution.requiredSentence must name the year");
  }
  if ((proof?.numberPlan || []).length > 1) require(text(proof?.statRelationship?.requiredSentence), "statRelationship.requiredSentence is required when multiple numbers change group, unit or filter");
  require(text(proof?.mechanismBridge?.objectLocationSentence), "mechanismBridge.objectLocationSentence is required");
  require(text(proof?.mechanismBridge?.attackDefinitionSentence), "mechanismBridge.attackDefinitionSentence is required");
  require(!/\bthat sealed part\b/i.test(proof?.mechanismBridge?.attackDefinitionSentence || ""), "mechanismBridge.attackDefinitionSentence must name the sealed part's exact source rather than use an ambiguous antecedent");
  require(text(proof?.mechanismBridge?.evidenceRecoverySentence), "mechanismBridge.evidenceRecoverySentence is required");
  require(text(proof?.actionOpening), "actionOpening is required");
  require(text(proof?.incidentAction), "incidentAction is required");
  require(Array.isArray(proof?.evidenceParagraphBreaksAfter) && proof.evidenceParagraphBreaksAfter.length >= 1 && proof.evidenceParagraphBreaksAfter.every(text), "evidenceParagraphBreaksAfter requires at least one exact sentence");
  require(Array.isArray(proof?.plainGlosses), "plainGlosses must be an array; use [] when no gloss is needed");
  for (const [index, gloss] of (proof?.plainGlosses || []).entries()) {
    require(text(gloss?.term), `plainGlosses[${index}].term is required`);
    require(text(gloss?.requiredSentence) && gloss.requiredSentence.toLowerCase().includes(String(gloss?.term || "").toLowerCase()), `plainGlosses[${index}].requiredSentence must explain the term`);
    require((proof?.evidenceSequence || []).includes(gloss?.requiredSentence), `plainGlosses[${index}].requiredSentence must be an exact evidenceSequence sentence, not an orphan definition`);
  }
  require(text(proof?.centralInstruction?.opening), "centralInstruction.opening is required");
  require(text(proof?.centralInstruction?.action), "centralInstruction.action is required");
  require(text(proof?.centralInstruction?.closing), "centralInstruction.closing is required");
  require(Array.isArray(proof?.centralInstruction?.prohibitedRestatements) && proof.centralInstruction.prohibitedRestatements.every(text), "centralInstruction.prohibitedRestatements must be an array of phrases");
  require(Array.isArray(proof?.evidenceSequence) && proof.evidenceSequence.length >= 3 && proof.evidenceSequence.every(text), "evidenceSequence requires at least three exact sentences");
  require(Array.isArray(proof?.readerSources) && proof.readerSources.length > 0, "readerSources requires at least one exact reader-facing source");
  for (const [index, source] of (proof?.readerSources || []).entries()) {
    require(text(source?.label), `readerSources[${index}].label is required`);
    require(/^https:\/\//.test(source?.url || ""), `readerSources[${index}].url must be an exact HTTPS URL`);
  }
  require(text(proof?.voicePlan?.move), "voicePlan.move is required");
  require(text(proof?.voicePlan?.teachingJob), "voicePlan.teachingJob is required");
  require(text(proof?.voicePlan?.limit), "voicePlan.limit is required");
  require(text(proof?.voicePlan?.readerFacingLimit), "voicePlan.readerFacingLimit is required");
  require(text(proof?.voicePlan?.humanTruth), "voicePlan.humanTruth is required");
  require(text(proof?.voicePlan?.mechanismMappingSentence), "voicePlan.mechanismMappingSentence is required so the analogy reaches the central mechanism");
  require(Array.isArray(proof?.voicePlan?.warmthLines) && proof.voicePlan.warmthLines.length >= 2, "voicePlan.warmthLines requires at least two exact reader-facing lines");
  for (const [index, warmth] of (proof?.voicePlan?.warmthLines || []).entries()) {
    require(text(warmth?.sectionHeading), `voicePlan.warmthLines[${index}].sectionHeading is required`);
    require(text(warmth?.line), `voicePlan.warmthLines[${index}].line is required`);
  }
  require(new Set((proof?.voicePlan?.warmthLines || []).map(warmth => warmth?.sectionHeading)).size === (proof?.voicePlan?.warmthLines || []).length, "voicePlan.warmthLines must bind different named sections");
  require(Array.isArray(proof?.sectionPlan) && proof.sectionPlan.length >= 2 && proof.sectionPlan.length <= 6, "sectionPlan requires two to six sections");
  const sectionHeadings = [];
  const sectionJobs = [];
  for (const [index, section] of (proof?.sectionPlan || []).entries()) {
    require(text(section?.heading), `sectionPlan[${index}].heading is required`);
    require(text(section?.readerJob), `sectionPlan[${index}].readerJob is required`);
    require(SECTION_JOB_TYPES.has(section?.jobType), `sectionPlan[${index}].jobType is invalid`);
    require(!GENERIC_SECTION_HEADING.test(section?.heading || ""), `sectionPlan[${index}].heading is generic scaffolding`);
    sectionHeadings.push(String(section?.heading || "").trim().toLowerCase());
    sectionJobs.push(String(section?.readerJob || "").trim().toLowerCase());
  }
  require(new Set(sectionHeadings).size === sectionHeadings.length, "sectionPlan headings must be unique");
  for (const [index, warmth] of (proof?.voicePlan?.warmthLines || []).entries()) require(sectionHeadings.includes(String(warmth?.sectionHeading || "").trim().toLowerCase()), `voicePlan.warmthLines[${index}] must bind an exact sectionPlan heading`);
  require(new Set(sectionJobs).size === sectionJobs.length, "sectionPlan reader jobs must be distinct");
  require((proof?.sectionPlan || []).filter(section => section.jobType === "ACTION").length === 1, "sectionPlan must contain exactly one ACTION section");
  require(Array.isArray(proof?.draftLimits?.phraseCaps), "draftLimits.phraseCaps must be an array; use [] when no cap is needed");
  for (const [index, cap] of (proof?.draftLimits?.phraseCaps || []).entries()) {
    require(text(cap?.phrase), `draftLimits.phraseCaps[${index}].phrase is required`);
    require(Number.isInteger(cap?.maximum) && cap.maximum >= 1, `draftLimits.phraseCaps[${index}].maximum must be a positive integer`);
  }
  require(Array.isArray(proof?.draftLimits?.prohibitedPhrases), "draftLimits.prohibitedPhrases must be an array; use [] when no phrase is prohibited");
  for (const [index, phrase] of (proof?.draftLimits?.prohibitedPhrases || []).entries()) require(text(phrase), `draftLimits.prohibitedPhrases[${index}] is empty`);
  require(text(proof?.terminologyPlan?.plainTerm), "terminologyPlan.plainTerm is required");
  require(Array.isArray(proof?.terminologyPlan?.stableObjectTerms) && proof.terminologyPlan.stableObjectTerms.length > 0 && proof.terminologyPlan.stableObjectTerms.every(text), "terminologyPlan.stableObjectTerms requires every stable reader-facing object name");
  const stableObjectTerms = (proof?.terminologyPlan?.stableObjectTerms || []).map(term => String(term).trim().toLowerCase());
  require(new Set(stableObjectTerms).size === stableObjectTerms.length, "terminologyPlan.stableObjectTerms must be unique");
  require(stableObjectTerms.includes(String(proof?.terminologyPlan?.plainTerm || "").trim().toLowerCase()), "terminologyPlan.stableObjectTerms must include terminologyPlan.plainTerm");
  require(Array.isArray(proof?.terminologyPlan?.allowedMetaphorTerms) && proof.terminologyPlan.allowedMetaphorTerms.length > 0 && proof.terminologyPlan.allowedMetaphorTerms.every(text), "terminologyPlan.allowedMetaphorTerms requires at least one term");
  require(Array.isArray(proof?.terminologyPlan?.prohibitedSynonyms) && proof.terminologyPlan.prohibitedSynonyms.every(text), "terminologyPlan.prohibitedSynonyms must be an array of terms");
  const terminologyBoundContent = JSON.stringify({
    readerQuestion: proof?.readerQuestion,
    readerPayoff: proof?.readerPayoff,
    headline: proof?.headline,
    opening: proof?.opening,
    newcomerBackground: proof?.newcomerBackground,
    causalOutline: proof?.causalOutline,
    evidenceBoundary: proof?.evidenceBoundary,
    statAttribution: proof?.statAttribution,
    statRelationship: proof?.statRelationship,
    mechanismBridge: proof?.mechanismBridge,
    actionOpening: proof?.actionOpening,
    incidentAction: proof?.incidentAction,
    plainGlosses: proof?.plainGlosses,
    centralInstruction: proof?.centralInstruction,
    voicePlan: proof?.voicePlan,
    sectionPlan: proof?.sectionPlan,
    applications: proof?.applications,
    usefulLanding: proof?.usefulLanding
  }).toLowerCase();
  for (const synonym of (proof?.terminologyPlan?.prohibitedSynonyms || [])) require(!terminologyBoundContent.includes(String(synonym).toLowerCase()), `producer proof uses prohibited synonym "${synonym}"`);
  for (const example of ["work", "nonWork"]) {
    const value = proof?.applications?.[example];
    require(value?.disposition === "APPLY" || value?.disposition === "NOT_MATERIAL", `applications.${example}.disposition is required`);
    require(text(value?.example) || text(value?.reason), `applications.${example} needs an example or reason`);
  }
  require(Number.isInteger(proof?.intendedWords) && proof.intendedWords > 0, "intendedWords must be a positive integer");
  if (proof?.publication === "THE_DAILY") {
    require(proof.storyMode !== "SERVICE_COLUMN", "The Daily lead cannot use SERVICE_COLUMN mode");
    require(proof.intendedWords <= 700 || text(proof?.lengthEscalationReason), "Daily plans above 700 words require an escalation reason");
  }
  require(proof?.producerPreflight?.negativeExamplesRead === true, "producer must read the registered negative examples before drafting");
  const lane = laneRegistry?.lanes?.find(item => item.id === PUBLICATION_LANES[proof?.publication]);
  require(Boolean(lane), "publication has no registered feature lane");
  const approvedTemplate = lane?.approvedTemplatesByMode?.[proof?.storyMode];
  require(Boolean(approvedTemplate), "publication mode has no Ali-accepted story template");
  if (approvedTemplate) {
    require(proof?.storyTemplate?.path === approvedTemplate.path, "storyTemplate.path must match the accepted template");
    require(proof?.storyTemplate?.sha256 === approvedTemplate.sha256, "storyTemplate.sha256 must match the accepted template");
    require(proof?.storyTemplate?.section === approvedTemplate.section, "storyTemplate.section must match the accepted template section");
    require(proof?.storyTemplate?.sectionSha256 === approvedTemplate.sectionSha256, "storyTemplate.sectionSha256 must match the accepted template section bytes");
    binding(root, proof?.storyTemplate, approvedTemplate.path, "storyTemplate", errors);
    require(proof?.storyTemplate?.acceptanceRecord?.path === approvedTemplate.acceptanceRecord?.path, "storyTemplate.acceptanceRecord.path must match the Ali ruling");
    require(proof?.storyTemplate?.acceptanceRecord?.sha256 === approvedTemplate.acceptanceRecord?.sha256, "storyTemplate.acceptanceRecord.sha256 must match the Ali ruling");
    binding(root, proof?.storyTemplate?.acceptanceRecord, approvedTemplate.acceptanceRecord?.path, "storyTemplate.acceptanceRecord", errors);
  }
  require(proof?.producerPreflight?.laneId === lane?.id, "producerPreflight.laneId must match the publication lane");
  require(HASH.test(proof?.producerPreflight?.laneContractSha256 || "") && lane && proof.producerPreflight.laneContractSha256 === featureLaneContractSha256(lane), "producerPreflight.laneContractSha256 must bind the current feature lane production rules");
  const expectedNegatives = [...(lane?.negativeExemplarIds || [])].sort();
  const readNegatives = [...(proof?.producerPreflight?.negativeExemplarIdsRead || [])].sort();
  require(JSON.stringify(readNegatives) === JSON.stringify(expectedNegatives), "producerPreflight.negativeExemplarIdsRead must list every current lane negative exemplar and no others");
  require(Array.isArray(proof?.producerPreflight?.repeatedDefects) && proof.producerPreflight.repeatedDefects.length === 0, "producer proof still contains a repeated known defect");
  require(proof?.producerPreflight?.actualFormatUsed === true, "producer must attest that the publication format produced the outline");
  return { errors, status: proof?.status || null };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-newsstand-producer-proof.mjs <proof.json>"); process.exit(2); }
  let proof;
  try { proof = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`NEWSSTAND PRODUCER PROOF FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectNewsstandProducerProof(proof);
  if (result.errors.length) {
    console.error("NEWSSTAND PRODUCER PROOF FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND PRODUCER PROOF INTEGRITY MATCH status=${result.status} full_draft_authority=PRE_DRAFT_ONLY`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
