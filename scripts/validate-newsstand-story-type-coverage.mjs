#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(directory, "..");
const defaultModules = JSON.parse(fs.readFileSync(path.resolve(directory, "../operations/product-stewards/newsstand/story-type-modules.json"), "utf8"));
const PLACEHOLDER = /^(?:tbd|todo|unknown|n\/?a|none|same as above|not applicable|placeholder)[.!]?$/i;
const BLOCK_BOUNDARY = "\u0000";

function object(value) { return value && typeof value === "object" && !Array.isArray(value); }
function answerValid(value) { return typeof value === "string" && value.trim().length >= 18 && !PLACEHOLDER.test(value.trim()); }
function extraKeys(value, expected) { return object(value) ? Object.keys(value).filter(key => !expected.includes(key)) : []; }
function normalizedText(value) {
  return String(value || "")
    .replace(/<\/?(?:address|article|aside|blockquote|br|div|footer|h[1-6]|header|li|main|ol|p|section|ul)\b[^>]*>/gi, BLOCK_BOUNDARY)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/\s+/g, " ")
    .replace(new RegExp(`${BLOCK_BOUNDARY}+`, "g"), BLOCK_BOUNDARY)
    .replace(new RegExp(`\\s*${BLOCK_BOUNDARY}\\s*`, "g"), BLOCK_BOUNDARY)
    .trim()
    .toLowerCase();
}
function learningDestinationExists(root, destination) {
  const [route, fragment] = destination.split("#");
  const routePath = path.resolve(root, route.replace(/^\//, ""));
  if (!fs.existsSync(routePath)) return false;
  if (route === "/library.html") {
    try {
      const index = JSON.parse(fs.readFileSync(path.resolve(root, "content/site/miss-jeeves-index.json"), "utf8"));
      return Array.isArray(index.entries) && index.entries.some(entry => entry.url === destination);
    } catch { return false; }
  }
  if (!fragment) return true;
  try {
    const decoded = decodeURIComponent(fragment);
    const source = fs.readFileSync(routePath, "utf8");
    return source.includes(`id="${decoded}"`) || source.includes(`id='${decoded}'`);
  } catch { return false; }
}

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
  const translation = modules.translationContract;
  if (!object(translation) || translation.schema !== "laidies.newsstand-reader-translation.v1") errors.push("reader translation contract is missing or invalid");
  else {
    if (!Array.isArray(translation.requiredReaderMoves) || new Set(translation.requiredReaderMoves).size !== translation.requiredReaderMoves.length) errors.push("reader translation moves must be a unique list");
    const moves = Array.isArray(translation.requiredReaderMoves) ? translation.requiredReaderMoves : [];
    if (!object(translation.prompts)) errors.push("reader translation prompts are missing");
    else {
      for (const move of moves) if (!answerValid(translation.prompts[move])) errors.push(`reader translation prompt is missing: ${move}`);
      for (const key of extraKeys(translation.prompts, moves)) errors.push(`unknown reader translation prompt: ${key}`);
    }
  }
  for (const [topic, type] of Object.entries(object(modules.topicBindings) ? modules.topicBindings : {})) if (!modules.types?.[type]) errors.push(`topic ${topic} binds to unknown story type ${type}`);
  return [...new Set(errors)];
}

const defaultModuleErrors = validateStoryTypeModuleDefinition(defaultModules);
if (defaultModuleErrors.length) throw new Error(`invalid NewsStand story type modules: ${defaultModuleErrors.join(" | ")}`);

export function validateStoryTypeCoverage(coverage, topics = [], modules = defaultModules, { story = null, root = defaultRoot } = {}) {
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

  const translation = coverage.translation;
  const translationMoves = modules.translationContract.requiredReaderMoves;
  if (!object(translation) || translation.schema !== modules.translationContract.schema) errors.push("reader translation coverage is missing or invalid");
  else {
    for (const move of translationMoves) if (!answerValid(translation[move])) errors.push(`reader translation move is unanswered: ${move}`);
    if (!Array.isArray(translation.jargon) || !translation.jargon.length) errors.push("reader translation requires at least one necessary term");
    else {
      const terms = new Set();
      for (const item of translation.jargon) {
        const term = String(item?.term || "").trim().toLowerCase();
        if (!term || terms.has(term) || !answerValid(item?.plainMeaning)) errors.push("reader jargon entries require a unique term and plain-language meaning");
        terms.add(term);
      }
    }
    if (!Array.isArray(translation.learningConnections) || !translation.learningConnections.length) errors.push("reader translation requires a learning connection or owned learning gap");
    else for (const item of translation.learningConnections) {
      if (!answerValid(item?.concept) || !answerValid(item?.learningPayoff) || !["link", "gap"].includes(item?.disposition)) errors.push("learning connection requires a concept, payoff and link-or-gap disposition");
      else if (item.disposition === "link") {
        if (!/^\/(?:library\.html#.+|content\/library-books\/rendered\/[^#?]+\.html(?:#.+)?)$/.test(item.destination || "")) errors.push("learning link must name an exact LAiDIES Library destination");
      } else if (!answerValid(item.owner) || !answerValid(item.trigger) || !/^operations\/product-stewards\/.+/.test(item.recordPath || "")) errors.push("learning gap requires an owner, trigger and durable product-steward record path");
    }
  }

  if (story && object(translation)) {
    const prose = normalizedText([story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.class_notes].join(" "));
    for (const move of translationMoves) if (answerValid(translation[move]) && !prose.includes(normalizedText(translation[move]))) errors.push(`article does not contain its reader translation move: ${move}`);
    for (const item of Array.isArray(translation.jargon) ? translation.jargon : []) if (answerValid(item?.plainMeaning) && !prose.includes(normalizedText(item.plainMeaning))) errors.push(`article does not contain the plain-language meaning for term: ${item.term || "unknown"}`);
    for (const item of Array.isArray(translation.learningConnections) ? translation.learningConnections : []) {
      if (item?.disposition === "link" && typeof item.destination === "string") {
        if (!String(story.class_notes || "").includes(`href="${item.destination}"`) && !String(story.class_notes || "").includes(`href='${item.destination}'`)) errors.push(`Class Notes does not contain the exact learning link: ${item.destination}`);
        if (!learningDestinationExists(root, item.destination)) errors.push(`learning link destination does not exist in the governed Library index: ${item.destination}`);
      }
      if (item?.disposition === "gap" && typeof item.recordPath === "string" && !fs.existsSync(path.resolve(root, item.recordPath))) errors.push(`learning gap record does not exist: ${item.recordPath}`);
    }
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
