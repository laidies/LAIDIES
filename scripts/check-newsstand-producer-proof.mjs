#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const STANDARD_PATH = "operations/product-stewards/newsstand/NEWSSTAND-EDITORIAL-PRODUCTION-STANDARD.md";
const HASH = /^[a-f0-9]{64}$/;
const PUBLICATIONS = new Set(["THE_BREAKING", "THE_DAILY", "THE_WEEKLY", "THE_BIG_PICTURE", "STRAIGHT_TALK", "DEAR_MISS_JEEVES", "PAIGE_TIP", "CAREER_WORK_LIFE", "PROMPTOSCOPE"]);
const MODES = new Set(["REPORT_OR_ANNOUNCEMENT", "HEADLINE_OR_REPORTING_CHECK", "UPDATE_TO_PRIOR_COVERAGE", "SERVICE_COLUMN"]);
const OPENING_JARGON = /\b(API|reasoning block|thinking block|thought signature|agent trajector(?:y|ies)|RLS|MCP|tokenization|vector database)\b/i;
const CLICKBAIT = /\b(you won't believe|shocking|terrifying|what happened next|the truth about|secret[s]? you cannot see|reveals? a wider route|everything you need to know)\b/i;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const text = (value) => typeof value === "string" && value.trim().length > 0;
const words = (value) => String(value || "").trim().split(/\s+/).filter(Boolean).length;

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
  require(text(proof?.sourceMap?.path) && HASH.test(proof?.sourceMap?.sha256 || ""), "sourceMap binding is required");
  if (text(proof?.sourceMap?.path)) binding(root, proof.sourceMap, proof.sourceMap.path, "sourceMap", errors);
  for (const field of ["readerQuestion", "readerPayoff", "headline", "opening", "newcomerBackground", "usefulLanding", "routingReason"]) {
    require(text(proof?.[field]), `${field} is required`);
  }
  require(words(proof?.headline) <= 18, "headline exceeds 18 words");
  require(!CLICKBAIT.test(proof?.headline || ""), "headline contains a registered clickbait construction");
  require(words(proof?.opening) <= 90, "opening exceeds 90 words");
  require(!OPENING_JARGON.test(proof?.opening || ""), "opening uses technical vocabulary before plain meaning");
  require(Array.isArray(proof?.causalOutline) && proof.causalOutline.length >= 3 && proof.causalOutline.length <= 6 && proof.causalOutline.every(text), "causalOutline requires three to six plain causal links");
  require(text(proof?.evidenceBoundary?.establishes), "evidenceBoundary.establishes is required");
  require(text(proof?.evidenceBoundary?.doesNotEstablish), "evidenceBoundary.doesNotEstablish is required");
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
