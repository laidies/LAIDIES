#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_FORMATS = [
  "news_breaking", "news_daily", "news_weekly", "news_big_question",
  "straight_answers", "dear_miss_jeeves", "paige_ai_tip",
  "career_work_life_tip", "promptoscope"
];

export function validatePublicationPipelines(data) {
  const errors = [];
  if (data?.schemaVersion !== "1.0.0") errors.push("schemaVersion must be 1.0.0");
  if (data?.status !== "ACTIVE_INTERNAL_PRODUCTION_ROUTER") errors.push("status must be ACTIVE_INTERNAL_PRODUCTION_ROUTER");
  if (!/one or more earned outputs/i.test(data?.rule || "") || !/distinct reader job/i.test(data?.rule || "") || !/fill space/i.test(data?.rule || "")) {
    errors.push("routing rule must allow earned multi-output use while prohibiting filler duplication");
  }
  const multiOutput = data?.multiOutputContract;
  const contributionFields = new Set(multiOutput?.requiredPerContribution || []);
  for (const field of ["signalId", "publicationFormatId", "relationship", "contributionJob", "workOrderId", "sourceVersionIds"]) {
    if (!contributionFields.has(field)) errors.push(`multi-output contribution missing field ${field}`);
  }
  if (!/Breaking or The Daily/i.test(multiOutput?.example || "") || !/Big Question/i.test(multiOutput?.example || "")) {
    errors.push("multi-output contract must cover current news contributing to a Big Question");
  }
  if (!/cannot inherit admission/i.test(multiOutput?.independenceRule || "")) errors.push("multi-output contract must prohibit inherited admission");
  if (!Array.isArray(data?.formats)) errors.push("formats must be an array");
  const formats = new Map();
  for (const [index, format] of (data?.formats || []).entries()) {
    const at = `formats[${index}]`;
    if (!format.id) errors.push(`${at} missing id`);
    if (formats.has(format.id)) errors.push(`${at} duplicate id ${format.id}`);
    formats.set(format.id, format);
    for (const field of ["displayName", "productOwner", "job", "sourceCadence", "publicationCadence", "canonicalStore", "publicSurface", "surfaceContainer", "quietPolicy"]) {
      if (!format[field] || typeof format[field] !== "string") errors.push(`${format.id || at} missing ${field}`);
    }
    if (!Array.isArray(format.templateFields) || format.templateFields.length < 5) errors.push(`${format.id || at} requires at least five templateFields`);
  }
  for (const id of REQUIRED_FORMATS) if (!formats.has(id)) errors.push(`missing required format ${id}`);

  const daily = formats.get("news_daily");
  if (daily?.publicationCadence !== "DAILY" || daily?.surfaceContainer !== "MULTI_ELEMENT_NEWSPAPER") {
    errors.push("news_daily must be a daily multi-element newspaper");
  }
  const dailyComponents = new Set((daily?.components || []).map((item) => item.id));
  for (const id of ["sourced_news", "paige_tip", "career_life", "promptoscope", "dear_miss_jeeves", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"]) {
    if (!dailyComponents.has(id)) errors.push(`news_daily missing component ${id}`);
  }
  const weekly = formats.get("news_weekly");
  if (weekly?.surfaceContainer !== "MULTI_ELEMENT_NEWSPAPER" || !weekly?.templateFields?.some((field) => /at least two distinct/i.test(field))) {
    errors.push("news_weekly must require a multi-element synthesis of at least two developments");
  }
  const bigQuestion = formats.get("news_big_question");
  if (bigQuestion?.displayName !== "The Big Question" || bigQuestion?.machineEdition !== "tribune") {
    errors.push("news_big_question must expose The Big Question while retaining tribune machine compatibility");
  }
  const straightAnswers = formats.get("straight_answers");
  if (straightAnswers?.surfaceContainer !== "LIVING_REFERENCE_BOOK" || !/evidence[_ ]changes/i.test(straightAnswers?.publicationCadence || "")) {
    errors.push("straight_answers must remain an evidence-triggered living reference book");
  }
  const dearMissJeeves = formats.get("dear_miss_jeeves");
  if (dearMissJeeves?.canonicalStore !== "content/dear-miss-jeeves-bank.json" || !/one.*per week/i.test(dearMissJeeves?.quietPolicy || "")) {
    errors.push("dear_miss_jeeves must use its canonical bank and publish at most one admitted column per week");
  }
  return { errors, formats: formats.size };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const root = process.cwd();
  const filePath = path.join(root, process.argv[2] || "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json");
  let data;
  try { data = JSON.parse(fs.readFileSync(filePath, "utf8")); } catch (error) {
    console.error("PUBLICATION PIPELINE CHECK FAIL");
    console.error(`- invalid JSON: ${error.message}`);
    process.exit(1);
  }
  const result = validatePublicationPipelines(data);
  if (result.errors.length) {
    console.error("PUBLICATION PIPELINE CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("PUBLICATION PIPELINE CHECK PASS");
  console.log(`formats=${result.formats}`);
}
