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
  career: "career-explain-ai-assisted-work-service-exemplar-2026-08-12.json",
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

const careerAiFirst = read("career");
careerAiFirst.body = `${careerAiFirst.laneSpecific.aiParallelQuote}\n\n${careerAiFirst.body}`;
assert.match(errors(careerAiFirst), /Career guidance must appear before the AI parallel/);

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
assert.match(errors(staleRegistry), /featureRegistry SHA-256 mismatch/);

const falsePublic = read("career");
falsePublic.storage.publicEligibility = "ELIGIBLE";
assert.match(errors(falsePublic), /ineligible pending Ali acceptance/);

const wrongNegatives = read("career");
wrongNegatives.negativeExemplarIdsRead = ["CQX-BAD-006", "CQX-BAD-007"];
assert.match(errors(wrongNegatives), /must exactly match the current lane negatives/);

console.log("NEWSSTAND SERVICE EXEMPLAR CALIBRATION PASS valid=4 missing_action=1 paige_horoscope=1 career_order=1 prompt_nonwork=1 ai_named=1 fixed_deck=1 stale_registry=1 false_public=1 wrong_negatives=1");
