#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { featureLaneContractSha256 } from "./check-newsstand-producer-proof.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "operations/product-stewards/newsstand/NEWSSTAND-FEATURE-LANE-REGISTRY.json";
const STANDARD_PATH = "operations/product-stewards/newsstand/NEWSSTAND-EDITORIAL-PRODUCTION-STANDARD.md";
const SERVICE_LANES = new Set(["paige_tip", "career_work_life", "promptoscope", "mme_claio"]);
const HASH = /^[a-f0-9]{64}$/;
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const text = value => typeof value === "string" && value.trim().length > 0;
const words = value => String(value || "").trim().split(/\s+/).filter(Boolean).length;

function bind(root, binding, exactPath, label, errors) {
  if (!binding || binding.path !== exactPath || !HASH.test(binding.sha256 || "")) {
    errors.push(`${label} must bind ${exactPath}`);
    return null;
  }
  const absolute = path.resolve(root, binding.path);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    errors.push(`${label} is unavailable`);
    return null;
  }
  if (sha256(fs.readFileSync(absolute)) !== binding.sha256) errors.push(`${label} SHA-256 mismatch`);
  return absolute;
}

function bindAny(root, binding, label, errors) {
  if (!binding || !text(binding.path) || !HASH.test(binding.sha256 || "")) {
    errors.push(`${label} requires path and SHA-256`);
    return null;
  }
  return bind(root, binding, binding.path, label, errors);
}

function readCurrentRegistry(root, binding, errors) {
  if (!binding || binding.path !== REGISTRY_PATH) {
    errors.push(`featureRegistry must point to ${REGISTRY_PATH}`);
    return null;
  }
  const absolute = path.resolve(root, REGISTRY_PATH);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    errors.push("featureRegistry is unavailable");
    return null;
  }
  return absolute;
}

export function inspectNewsstandServiceExemplar(candidate, { root = ROOT } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(candidate?.schemaVersion === "laidies-newsstand-service-exemplar.v1", "schemaVersion mismatch");
  require(text(candidate?.candidateId), "candidateId is required");
  require(SERVICE_LANES.has(candidate?.laneId), "laneId is not a supported Daily service lane");
  require(candidate?.status === "PRIVATE_REVIEW_CANDIDATE", "status must be PRIVATE_REVIEW_CANDIDATE");
  require(/^\d{4}-\d{2}-\d{2}$/.test(candidate?.editionDate || ""), "editionDate must be YYYY-MM-DD");
  require(text(candidate?.headline), "headline is required");
  require(text(candidate?.body), "body is required");

  // The candidate binds its own lane contract below. Requiring the checksum of
  // the entire registry made an unrelated Daily-lane edit invalidate Paige,
  // Career, Promptoscope and Mme CLAi-O. Read the current registry by canonical
  // path, then fail only when this candidate's exact lane contract changed.
  const registryPath = readCurrentRegistry(root, candidate?.featureRegistry, errors);
  bind(root, candidate?.productionStandard, STANDARD_PATH, "productionStandard", errors);
  let lane = null;
  if (registryPath) {
    try {
      const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
      lane = registry.lanes.find(item => item.id === candidate?.laneId) || null;
    } catch (error) { errors.push(`featureRegistry is invalid JSON: ${error.message}`); }
  }
  require(Boolean(lane), "laneId is absent from the current feature registry");
  if (lane) {
    require(candidate?.laneContractSha256 === featureLaneContractSha256(lane), "laneContractSha256 does not bind the current lane");
    const count = words(candidate.body);
    require(count >= lane.targetWords.minimum && count <= lane.targetWords.maximum, `body word count ${count} is outside ${lane.targetWords.minimum}-${lane.targetWords.maximum}`);
    const expectedNegatives = [...lane.negativeExemplarIds].sort();
    const suppliedNegatives = [...(candidate?.negativeExemplarIdsRead || [])].sort();
    require(JSON.stringify(expectedNegatives) === JSON.stringify(suppliedNegatives), "negativeExemplarIdsRead must exactly match the current lane negatives");
    const beatEvidence = candidate?.beatEvidence || [];
    require(Array.isArray(beatEvidence) && beatEvidence.length === lane.templateBeats.length, "beatEvidence must cover every current template beat exactly once");
    const suppliedBeats = beatEvidence.map(item => item?.beat);
    require(new Set(suppliedBeats).size === suppliedBeats.length, "beatEvidence contains a duplicate beat");
    const completeText = `${candidate.headline}\n${candidate.body}`;
    for (const beat of lane.templateBeats) {
      const evidence = beatEvidence.find(item => item?.beat === beat);
      require(Boolean(evidence), `beatEvidence is missing: ${beat}`);
      require(text(evidence?.quote) && completeText.includes(evidence.quote), `beatEvidence quote is not exact candidate text: ${beat}`);
    }
  }

  require(Array.isArray(candidate?.sourceEvidence) && candidate.sourceEvidence.length > 0, "sourceEvidence requires at least one exact source");
  for (const [index, source] of (candidate?.sourceEvidence || []).entries()) bindAny(root, source, `sourceEvidence[${index}]`, errors);
  require(text(candidate?.freshness?.checkedAt), "freshness.checkedAt is required");
  require(Array.isArray(candidate?.freshness?.recheckTriggers) && candidate.freshness.recheckTriggers.length > 0 && candidate.freshness.recheckTriggers.every(text), "freshness.recheckTriggers are required");
  require(text(candidate?.owner), "owner is required");
  require(text(candidate?.destination), "destination is required");
  require(text(candidate?.storage?.recordId), "storage.recordId is required");
  require(candidate?.storage?.publicEligibility === "INELIGIBLE_PENDING_ALI_ACCEPTANCE", "private exemplar must be ineligible pending Ali acceptance");
  require(candidate?.selfReview?.exactTextRead === true, "selfReview must read the exact text");
  require(candidate?.selfReview?.knownDefectsRemaining?.length === 0, "selfReview still has known defects");
  require(text(candidate?.selfReview?.distinctnessFinding), "selfReview.distinctnessFinding is required");

  const body = String(candidate?.body || "");
  const contract = candidate?.laneSpecific || {};
  const exact = (field, label) => require(text(contract[field]) && body.includes(contract[field]), `${label} must be exact body text`);
  if (candidate?.laneId === "paige_tip") {
    require(contract.situationType === "WORK", "Paige situationType must be WORK");
    for (const [field, label] of [["situationQuote", "Paige situation"], ["actionQuote", "Paige action"], ["whyQuote", "Paige reason"], ["boundaryQuote", "Paige boundary"], ["checkQuote", "Paige result check"]]) exact(field, label);
    require(!/\b(?:horoscope|mercury|zodiac|stars?|cosmic|retrograde)\b/i.test(body), "Paige cannot borrow Promptoscope framing");
  }
  if (candidate?.laneId === "career_work_life") {
    require(contract.situationType === "CAREER_OR_WORK_LIFE", "Career situationType must be CAREER_OR_WORK_LIFE");
    require(contract.sourceTopicType === "NON_AI_CAREER_OR_LIFE", "Career sourceTopicType must be NON_AI_CAREER_OR_LIFE");
    require(Number.isInteger(contract.nonAiSourceEvidenceIndex) && contract.nonAiSourceEvidenceIndex >= 0 && contract.nonAiSourceEvidenceIndex < (candidate?.sourceEvidence || []).length, "Career nonAiSourceEvidenceIndex must identify a bound non-AI advice source");
    for (const [field, label] of [["situationQuote", "Career situation"], ["guidanceQuote", "Career guidance"], ["wordingQuote", "Career wording"], ["adviceWithoutAiQuote", "Career standalone advice"], ["aiParallelQuote", "Career AI parallel"], ["comparisonLimitQuote", "Career comparison limit"], ["tryTodayQuote", "Career try-today move"]]) exact(field, label);
    const aiIndex = body.indexOf(contract.aiParallelQuote || "");
    const prefixBeforeAi = aiIndex >= 0 ? body.slice(0, aiIndex).trim() : "";
    require(prefixBeforeAi === String(contract.adviceWithoutAiQuote || "").trim(), "Career adviceWithoutAiQuote must bind the complete body prefix before the AI connection");
    require(words(contract.adviceWithoutAiQuote) >= 70, "Career standalone advice must contain at least 70 words of useful non-AI guidance");
    const aiFirstTerms = /\b(?:AI|artificial intelligence|large language model|language model|chatbot|prompt(?:ing|ed|s)?|ChatGPT|Claude|Gemini|Copilot)\b/i;
    require(!aiFirstTerms.test(`${candidate.headline}\n${contract.adviceWithoutAiQuote || ""}`), "Career headline and standalone advice must remain non-AI before the explicit AI connection");
    require(/\bAI\b/.test(contract.aiParallelQuote || ""), "Career AI parallel must explicitly name AI");
    require(body.indexOf(contract.guidanceQuote) < aiIndex, "Career guidance must appear before the AI parallel");
  }
  if (candidate?.laneId === "promptoscope") {
    require(contract.situationType === "NON_WORK", "Promptoscope situationType must be NON_WORK");
    for (const [field, label] of [["comicQuote", "Promptoscope comic observation"], ["situationQuote", "Promptoscope non-work situation"], ["actionQuote", "Promptoscope action"], ["whyQuote", "Promptoscope reason"], ["checkQuote", "Promptoscope human check"], ["finalJokeQuote", "Promptoscope final joke"]]) exact(field, label);
    require(/\bAI\b/.test(body), "Promptoscope must name the AI object");
  }
  if (candidate?.laneId === "mme_claio") {
    require(contract.situationType === "FIXED_DECK_SELECTION", "Mme CLAi-O situationType must be FIXED_DECK_SELECTION");
    const deckPath = bindAny(root, contract.deck, "laneSpecific.deck", errors);
    require(text(contract.cardId), "Mme CLAi-O cardId is required");
    require(contract.selectionMethod === "DETERMINISTIC_DATE_NO_READER_DATA", "Mme CLAi-O selection must be deterministic and use no reader data");
    if (deckPath && text(contract.cardId)) {
      try {
        const deck = JSON.parse(fs.readFileSync(deckPath, "utf8"));
        const card = deck.cards.find(item => item.id === contract.cardId);
        require(Boolean(card), "Mme CLAi-O cardId is absent from the governed deck");
        if (card) for (const field of ["card", "read", "message", "move"]) require(body.includes(card[field]), `Mme CLAi-O body must preserve exact governed ${field}`);
      } catch (error) { errors.push(`Mme CLAi-O deck is invalid JSON: ${error.message}`); }
    }
    require(/not (?:a )?prediction|not personalised|not personalized/i.test(body), "Mme CLAi-O body needs the non-predictive boundary");
  }

  return { errors, laneId: candidate?.laneId || null, wordCount: words(candidate?.body) };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-newsstand-service-exemplar.mjs <candidate.json>"); process.exit(2); }
  let candidate;
  try { candidate = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`NEWSSTAND SERVICE EXEMPLAR FAIL\n- ${error.message}`); process.exit(1); }
  const result = inspectNewsstandServiceExemplar(candidate);
  if (result.errors.length) {
    console.error("NEWSSTAND SERVICE EXEMPLAR FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`NEWSSTAND SERVICE EXEMPLAR INTEGRITY MATCH lane=${result.laneId} words=${result.wordCount} quality_authority=none public_authority=none`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
