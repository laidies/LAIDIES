#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { validateStoryTypeCoverage, validateStoryTypeModuleDefinition } from "./validate-newsstand-story-type-coverage.mjs";

const modules = JSON.parse(fs.readFileSync("operations/product-stewards/newsstand/story-type-modules.json", "utf8"));
assert.deepEqual(validateStoryTypeModuleDefinition(modules), [], "every internal field has one plain-language editorial question");
const answer = key => `A specific reader-facing answer for ${key} that explains the relevant evidence and consequence.`;
const coverage = (primaryType, overlays = []) => ({
  schema: "laidies.newsstand-story-type-coverage.v1",
  primaryType,
  overlays,
  universalAnswers: Object.fromEntries(modules.universalQuestions.map(key => [key, answer(`universal ${key}`)])),
  typeAnswers: Object.fromEntries([primaryType, ...overlays].map(type => [type, Object.fromEntries(modules.types[type].questions.map(key => [key, answer(`${type} ${key}`)]))]))
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

console.log("NEWSSTAND STORY TYPE COVERAGE PASS types=7 universal=1 mixed_overlays=1 wrong_template=1 astra_omissions=6 placeholders=1 duplicate_filler=1");
