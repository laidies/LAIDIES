#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const defaultModules = JSON.parse(fs.readFileSync(path.resolve(directory, "../operations/product-stewards/newsstand/story-type-modules.json"), "utf8"));
const PLACEHOLDER = /^(?:tbd|todo|unknown|n\/?a|none|same as above|not applicable|placeholder)[.!]?$/i;

function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
function answerValid(value) { return typeof value === "string" && value.trim().length >= 18 && !PLACEHOLDER.test(value.trim()); }
function extraKeys(value, expected) { return object(value) ? Object.keys(value).filter(key => !expected.includes(key)) : []; }

export function validateStoryTypeModuleDefinition(modules) {
  const errors = [];
  if (!object(modules) || modules.schema !== "laidies.newsstand-story-type-modules.v1") return ["story type module definition schema is missing or invalid"];
  if (!Array.isArray(modules.universalQuestions) || new Set(modules.universalQuestions).size !== modules.universalQuestions.length) errors.push("universal questions must be a unique list");
  const universalQuestions = Array.isArray(modules.universalQuestions) ? modules.universalQuestions : [];
  if (!object(modules.universalQuestionPrompts)) errors.push("universal question prompts are missing");
  else {
    for (const question of universalQuestions) if (!answerValid(modules.universalQuestionPrompts[question])) errors.push(`universal question prompt is missing: ${question}`);
    for (const key of extraKeys(modules.universalQuestionPrompts, universalQuestions)) errors.push(`unknown universal question prompt: ${key}`);
  }
  if (!object(modules.types)) errors.push("story types are missing");
  else for (const [type, module] of Object.entries(modules.types)) {
    if (!Array.isArray(module?.questions) || new Set(module.questions).size !== module.questions.length) { errors.push(`${type} questions must be a unique list`); continue; }
    if (!object(module.questionPrompts)) errors.push(`${type} question prompts are missing`);
    else {
      for (const question of module.questions) if (!answerValid(module.questionPrompts[question])) errors.push(`${type} question prompt is missing: ${question}`);
      for (const key of extraKeys(module.questionPrompts, module.questions)) errors.push(`unknown ${type} question prompt: ${key}`);
    }
  }
  for (const [topic, type] of Object.entries(object(modules.topicBindings) ? modules.topicBindings : {})) if (!modules.types?.[type]) errors.push(`topic ${topic} binds to unknown story type ${type}`);
  return [...new Set(errors)];
}

const defaultModuleErrors = validateStoryTypeModuleDefinition(defaultModules);
if (defaultModuleErrors.length) throw new Error(`invalid NewsStand story type modules: ${defaultModuleErrors.join(" | ")}`);

export function validateStoryTypeCoverage(coverage, topics = [], modules = defaultModules) {
  const errors = [];
  if (!object(coverage) || coverage.schema !== "laidies.newsstand-story-type-coverage.v1") return ["story type coverage schema is missing or invalid"];
  const typeIds = Object.keys(modules.types);
  if (!typeIds.includes(coverage.primaryType)) errors.push("primary story type is missing or unknown");
  if (!Array.isArray(coverage.overlays) || new Set(coverage.overlays).size !== coverage.overlays?.length || coverage.overlays?.some(type => !typeIds.includes(type) || type === coverage.primaryType)) errors.push("story overlays must be unique known types different from the primary type");
  const selected = typeIds.includes(coverage.primaryType) && Array.isArray(coverage.overlays) ? [coverage.primaryType, ...coverage.overlays] : [];

  const universal = coverage.universalAnswers;
  if (!object(universal)) errors.push("universal reporting answers are missing");
  else {
    for (const question of modules.universalQuestions) if (!answerValid(universal[question])) errors.push(`universal question is unanswered: ${question}`);
    for (const key of extraKeys(universal, modules.universalQuestions)) errors.push(`unknown universal answer: ${key}`);
  }

  const typeAnswers = coverage.typeAnswers;
  if (!object(typeAnswers)) errors.push("type-specific reporting answers are missing");
  else {
    for (const type of selected) {
      const answers = typeAnswers[type];
      if (!object(answers)) { errors.push(`type module is unanswered: ${type}`); continue; }
      const questions = modules.types[type].questions;
      for (const question of questions) if (!answerValid(answers[question])) errors.push(`${type} question is unanswered: ${question}`);
      for (const key of extraKeys(answers, questions)) errors.push(`unknown ${type} answer: ${key}`);
    }
    for (const key of extraKeys(typeAnswers, selected)) errors.push(`answers supplied for unselected story type: ${key}`);
  }

  for (const topic of topics || []) {
    const requiredType = modules.topicBindings[topic];
    if (requiredType && !selected.includes(requiredType)) errors.push(`topic ${topic} requires story type ${requiredType}`);
  }

  const allAnswers = [
    ...Object.values(object(universal) ? universal : {}),
    ...Object.values(object(typeAnswers) ? typeAnswers : {}).flatMap(answers => Object.values(object(answers) ? answers : {}))
  ].filter(answerValid).map(value => value.trim().toLowerCase().replace(/\s+/g, " "));
  if (new Set(allAnswers).size !== allAnswers.length) errors.push("reporting answers cannot reuse identical filler across questions");
  return [...new Set(errors)];
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const [coveragePath, topicsPath] = process.argv.slice(2);
  if (!coveragePath) { console.error("Usage: validate-newsstand-story-type-coverage.mjs <coverage.json> [topics.json]"); process.exitCode = 2; }
  else {
    const coverage = JSON.parse(fs.readFileSync(path.resolve(coveragePath), "utf8"));
    const topics = topicsPath ? JSON.parse(fs.readFileSync(path.resolve(topicsPath), "utf8")) : [];
    const errors = validateStoryTypeCoverage(coverage, topics);
    if (errors.length) { console.error(`NEWSSTAND STORY TYPE COVERAGE HOLD\n- ${errors.join("\n- ")}`); process.exitCode = 1; }
    else console.log(`NEWSSTAND STORY TYPE COVERAGE PASS primary=${coverage.primaryType} overlays=${coverage.overlays.length}`);
  }
}
