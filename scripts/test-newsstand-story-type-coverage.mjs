#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { validateStoryTypeCoverage, validateStoryTypeModuleDefinition } from "./validate-newsstand-story-type-coverage.mjs";

const modules = JSON.parse(fs.readFileSync("operations/product-stewards/newsstand/story-type-modules.json", "utf8"));
assert.deepEqual(validateStoryTypeModuleDefinition(modules), [], "every internal field has one plain-language editorial question");
const answer = key => `A specific reader-facing answer for ${key} that explains the relevant evidence and consequence.`;
const readerTranslation = () => ({
  schema: "laidies.newsstand-reader-translation.v1",
  newsVersionExact: "The headline version says a new AI system can finish a complicated job.",
  actualMeaningExact: "What it actually means is that the system can continue through several connected steps when a person gives it tools and checks the result.",
  mechanismExact: "The system keeps the instructions and intermediate results available while it moves from one permitted step to the next.",
  familiarExampleExact: "Think of preparing a briefing from several documents: it can gather and organize the material, while a person remains responsible for checking every conclusion.",
  jargon: [{ term: "agent", plainMeaning: "An agent is AI software allowed to take a sequence of actions with specified tools." }],
  learningConnections: [{ concept: "How AI systems use context and permitted tools", disposition: "link", destination: "/library.html#ai-fundamentals-101", learningPayoff: "The lesson explains why the model alone does not determine what the whole system can do." }]
});
const coverage = (primaryType, overlays = []) => ({
  schema: "laidies.newsstand-story-type-coverage.v1",
  primaryType,
  overlays,
  universalAnswers: Object.fromEntries(modules.universalQuestions.map(key => [key, answer(`universal ${key}`)])),
  typeAnswers: Object.fromEntries([primaryType, ...overlays].map(type => [type, Object.fromEntries(modules.types[type].questions.map(key => [key, answer(`${type} ${key}`)]))])),
  translation: readerTranslation()
});

for (const type of Object.keys(modules.types)) assert.deepEqual(validateStoryTypeCoverage(coverage(type), []), [], `${type} complete module passes`);

for (const type of Object.keys(modules.types)) {
  const incomplete = coverage(type);
  const missing = modules.types[type].questions[0];
  delete incomplete.typeAnswers[type][missing];
  assert.ok(validateStoryTypeCoverage(incomplete, []).some(error => error.includes(`${type} question is unanswered: ${missing}`)), `${type} missing question rejects`);
}

const mixed = coverage("model-tool-release", ["safety-incident"]);
delete mixed.typeAnswers["safety-incident"].responsibility;
assert.ok(validateStoryTypeCoverage(mixed, ["model-release", "safety"]).some(error => error.includes("safety-incident question is unanswered: responsibility")), "mixed story must satisfy overlay");

const wrongType = coverage("company-business");
assert.ok(validateStoryTypeCoverage(wrongType, ["medical"]).includes("topic medical requires story type health-science"), "topic cannot use easier wrong template");

const missingUniversal = coverage("legal-policy");
delete missingUniversal.universalAnswers.evidenceLimits;
assert.ok(validateStoryTypeCoverage(missingUniversal, ["legal"]).includes("universal question is unanswered: evidenceLimits"), "universal reporting spine is mandatory");

const filler = coverage("work-economy");
filler.typeAnswers["work-economy"].affectedWorkers = "TBD";
assert.ok(validateStoryTypeCoverage(filler, ["jobs"]).includes("work-economy question is unanswered: affectedWorkers"), "placeholder answer rejects");

const duplicate = coverage("research-benchmark");
duplicate.typeAnswers["research-benchmark"].method = duplicate.typeAnswers["research-benchmark"].result;
assert.ok(validateStoryTypeCoverage(duplicate, ["research"]).includes("reporting answers cannot reuse identical filler across questions"), "repeated filler rejects");

const astraLike = coverage("model-tool-release");
for (const key of ["productRange", "bestFitTasks", "nearestAlternatives", "availability", "freePaidBoundary", "technicalExampleProportionality"]) delete astraLike.typeAnswers["model-tool-release"][key];
const astraErrors = validateStoryTypeCoverage(astraLike, ["model-release"]);
for (const key of ["productRange", "bestFitTasks", "nearestAlternatives", "availability", "freePaidBoundary", "technicalExampleProportionality"]) {
  assert.ok(astraErrors.includes(`model-tool-release question is unanswered: ${key}`), `Astra-class omission rejects: ${key}`);
}

const translated = coverage("model-tool-release");
const translation = translated.translation;
const translatedStory = {
  the_story: `<p>${translation.newsVersionExact}</p><p>${translation.actualMeaningExact}</p><p>${translation.mechanismExact}</p>`,
  laidies_read: `<p>${translation.familiarExampleExact}</p><p>${translation.jargon[0].plainMeaning}</p>`,
  what_this_means: "A practical consequence for the reader.",
  cocktail_party: "A short explanation.",
  class_notes: `<a href="${translation.learningConnections[0].destination}">Read the relevant concept</a>`
};
assert.deepEqual(validateStoryTypeCoverage(translated, ["model-release"], modules, { story: translatedStory }), [], "translation appears in prose and exact Library link resolves");
const missingMeaning = structuredClone(translatedStory);
missingMeaning.laidies_read = "The technical term appears without its explanation.";
assert.ok(validateStoryTypeCoverage(translated, ["model-release"], modules, { story: missingMeaning }).some(error => error.includes("plain-language meaning for term: agent")), "jargon definition must appear in article prose");
const inlineFormatted = structuredClone(translated);
inlineFormatted.translation.jargon[0].plainMeaning = "Agent means a tool-using AI system.";
const inlineFormattedStory = structuredClone(translatedStory);
inlineFormattedStory.laidies_read = `<p>${translation.familiarExampleExact}</p><p><strong>Agent</strong> means a tool-using <em>AI system</em>.</p>`;
assert.deepEqual(validateStoryTypeCoverage(inlineFormatted, ["model-release"], modules, { story: inlineFormattedStory }), [], "inline formatting keeps visible words joined to adjacent punctuation");
const splitAcrossBlocks = structuredClone(inlineFormattedStory);
splitAcrossBlocks.laidies_read = `<p>${translation.familiarExampleExact}</p><p>Agent means a tool-using AI</p><p>system.</p>`;
assert.ok(validateStoryTypeCoverage(inlineFormatted, ["model-release"], modules, { story: splitAcrossBlocks }).some(error => error.includes("plain-language meaning for term: agent")), "block boundaries cannot manufacture a matching explanation");
const missingActualMeaning = structuredClone(translatedStory);
missingActualMeaning.the_story = `<p>${translation.newsVersionExact}</p><p>${translation.mechanismExact}</p>`;
assert.ok(validateStoryTypeCoverage(translated, ["model-release"], modules, { story: missingActualMeaning }).some(error => error.includes("reader translation move: actualMeaningExact")), "what-it-actually-means sentence must appear in article prose");
const brokenLearning = structuredClone(translated);
brokenLearning.translation.learningConnections[0].destination = "/library.html#made-up-but-route-level-valid";
const brokenStory = structuredClone(translatedStory);
brokenStory.class_notes = `<a href="${brokenLearning.translation.learningConnections[0].destination}">Invented lesson</a>`;
assert.ok(validateStoryTypeCoverage(brokenLearning, ["model-release"], modules, { story: brokenStory }).some(error => error.includes("does not exist in the governed Library index")), "invented Library fragment rejects even when it appears in Class Notes");
const noTranslation = coverage("company-business");
delete noTranslation.translation;
assert.ok(validateStoryTypeCoverage(noTranslation, []).includes("reader translation coverage is missing or invalid"), "translation layer is mandatory");

const producerRepair = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/producer-repair";
const actualCoverage = JSON.parse(fs.readFileSync(`${producerRepair}/story-type-coverage.json`, "utf8"));
const actualStory = JSON.parse(fs.readFileSync(`${producerRepair}/story.json`, "utf8"));
assert.deepEqual(validateStoryTypeCoverage(actualCoverage, actualStory.themes, modules, { story: actualStory }), [], "the actual producer-repair story contains every required reader translation and term explanation");

console.log("NEWSSTAND STORY TYPE COVERAGE PASS types=7 universal=1 mixed_overlays=1 wrong_template=1 astra_omissions=6 translation=1 jargon_in_prose=1 inline_formatting=1 block_boundaries=1 actual_producer_repair=1 learning_link=1 placeholders=1 duplicate_filler=1");
