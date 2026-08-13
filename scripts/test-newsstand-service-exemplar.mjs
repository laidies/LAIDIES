#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandServiceExemplar } from "./check-newsstand-service-exemplar.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const candidateRoot = path.join(root, "operations/product-stewards/newsstand/candidates");
const files = {
  paige: "paige-receipt-list-service-exemplar-2026-08-12.json",
  career: "career-share-the-win-with-purpose-service-exemplar-2026-08-13.json",
  promptoscope: "promptoscope-refrigerator-service-exemplar-2026-08-12.json",
  mme: "mme-claio-mini-backpack-service-exemplar-2026-08-12.json"
};
const read = name => JSON.parse(fs.readFileSync(path.join(candidateRoot, files[name]), "utf8"));
const errors = candidate => inspectNewsstandServiceExemplar(candidate, { root }).errors.join("\n");

for (const name of Object.keys(files)) assert.equal(errors(read(name)), "", `${name} candidate must match mechanically`);

const missingAction = read("paige");
missingAction.body = missingAction.body.replace(missingAction.laneSpecific.actionQuote, "Ask the tool to check it.");
assert.match(errors(missingAction), /Paige action must be exact body text/);

const borrowedHoroscope = read("paige");
borrowedHoroscope.body += " Mercury is retrograde.";
assert.match(errors(borrowedHoroscope), /Paige cannot borrow Promptoscope framing/);

const knownBadCareer = JSON.parse(fs.readFileSync(path.join(candidateRoot, "career-explain-ai-assisted-work-service-exemplar-2026-08-12.json"), "utf8"));
assert.match(errors(knownBadCareer), /sourceTopicType must be NON_AI_CAREER_OR_LIFE|headline and standalone advice must remain non-AI|laneContractSha256/, "the previously accepted AI-first Career candidate must now fail unaided");

const careerAiFirst = read("career");
careerAiFirst.laneSpecific.adviceWithoutAiQuote = careerAiFirst.laneSpecific.adviceWithoutAiQuote.replace("Ever kept quiet", "AI helped you, but have you ever kept quiet");
careerAiFirst.body = careerAiFirst.body.replace("Ever kept quiet", "AI helped you, but have you ever kept quiet");
assert.match(errors(careerAiFirst), /must remain non-AI before the explicit AI connection/);

const incompleteCareerPrefix = read("career");
incompleteCareerPrefix.laneSpecific.adviceWithoutAiQuote = incompleteCareerPrefix.laneSpecific.guidanceQuote;
assert.match(errors(incompleteCareerPrefix), /must bind the complete body prefix/);

const promptAtWork = read("promptoscope");
promptAtWork.laneSpecific.situationType = "WORK";
assert.match(errors(promptAtWork), /Promptoscope situationType must be NON_WORK/);

const replaceAi = value => {
  if (typeof value === "string") return value.replaceAll("AI", "assistant");
  if (Array.isArray(value)) return value.map(replaceAi);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, replaceAi(member)]));
  return value;
};
const unnamedAi = replaceAi(read("promptoscope"));
assert.match(errors(unnamedAi), /Promptoscope must name the AI object/);

const inventedReading = read("mme");
inventedReading.body = inventedReading.body.replace("Remove one commitment before adding another shiny thing.", "Add one more commitment and see what happens.");
assert.match(errors(inventedReading), /must preserve exact governed move/);

const staleRegistry = read("paige");
staleRegistry.featureRegistry.sha256 = "0".repeat(64);
assert.equal(errors(staleRegistry), "", "an unrelated registry-byte change must not invalidate a still-current Paige lane contract");

const wrongRegistryPath = read("paige");
wrongRegistryPath.featureRegistry.path = "operations/product-stewards/newsstand/not-the-registry.json";
assert.match(errors(wrongRegistryPath), /featureRegistry must point to/);

const falsePublic = read("career");
falsePublic.storage.publicEligibility = "ELIGIBLE";
assert.match(errors(falsePublic), /ineligible pending Ali acceptance/);

const wrongNegatives = read("career");
wrongNegatives.negativeExemplarIdsRead = ["CQX-BAD-006", "CQX-BAD-007"];
assert.match(errors(wrongNegatives), /must exactly match the current lane negatives/);

console.log("NEWSSTAND SERVICE EXEMPLAR CALIBRATION PASS valid=4 missing_action=1 paige_horoscope=1 known_bad_career=1 career_ai_first=1 incomplete_career_prefix=1 prompt_nonwork=1 ai_named=1 fixed_deck=1 unrelated_registry_change=1 wrong_registry_path=1 false_public=1 wrong_negatives=1");
