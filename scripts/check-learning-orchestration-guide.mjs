#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const requiredFormats = [
  "Episode", "Study Pack", "Pop Quiz", "LIBRAiRY", "Class / lesson / lab",
  "NewsStand article", "Promptoscope", "AI daily tip", "Career / work-life AI mirror",
  "KSVL song", "Interactive tool / FAiRY help", "Game / activity",
  "Community / Town Group Chat"
];

const requiredPromiseFields = [
  "Why this", "Why now", "Where it lives", "What changes",
  "How she will use it", "What it connects to"
];

export function checkLearningOrchestrationGuide({ root = process.cwd() } = {}) {
  const errors = [];
  const guidePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/LEARNING-ORCHESTRATION-GUIDE.md");
  const intakePath = path.join(root, "operations/checklists/learning-content-intake-template.md");
  const charterPath = path.join(root, "operations/product-stewards/learning-content-ecosystem/CHARTER.md");
  const specPath = path.join(root, "operations/product-stewards/learning-content-ecosystem/OPERATING-SPEC.md");
  for (const file of [guidePath, intakePath, charterPath, specPath]) {
    if (!fs.existsSync(file)) errors.push(`missing learning-orchestration file: ${path.relative(root, file)}`);
  }
  if (errors.length) return { status: "FAIL", errors };

  const guide = fs.readFileSync(guidePath, "utf8");
  const intake = fs.readFileSync(intakePath, "utf8");
  const charter = fs.readFileSync(charterPath, "utf8");
  const spec = fs.readFileSync(specPath, "utf8");

  for (const format of requiredFormats) if (!guide.includes(format)) errors.push(`format role missing: ${format}`);
  for (const field of requiredPromiseFields) if (!guide.includes(`**${field}:**`)) errors.push(`learner-promise field missing: ${field}`);
  for (const marker of ["Prerequisite concepts or abilities", "Misconceptions this item must prevent", "Next useful concept and experience", "Relationship graph update", "Search/index registration"]) {
    if (!intake.includes(marker)) errors.push(`intake relationship field missing: ${marker}`);
  }
  for (const required of ["Anti-duplication test", "Depth and experience-level rule", "Required concept package", "Harmony and release gate"]) {
    if (!guide.includes(required)) errors.push(`guide section missing: ${required}`);
  }
  for (const source of [charter, spec]) if (!source.includes("LEARNING-ORCHESTRATION-GUIDE.md")) errors.push("owner contract does not bind the orchestration guide");

  return {
    status: errors.length ? "FAIL" : "PASS",
    formats: requiredFormats.length,
    learnerPromiseFields: requiredPromiseFields.length,
    errors
  };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const result = checkLearningOrchestrationGuide();
  if (result.errors.length) {
    console.error("LEARNING ORCHESTRATION GUIDE CHECK FAIL");
    for (const error of result.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("LEARNING ORCHESTRATION GUIDE CHECK PASS");
  console.log(`formats=${result.formats}`);
  console.log(`learner_promise_fields=${result.learnerPromiseFields}`);
}
