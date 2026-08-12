#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validatePublicationPipelines } from "./check-publication-pipelines.mjs";

const source = JSON.parse(fs.readFileSync(path.join(process.cwd(), "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json"), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const baseline = validatePublicationPipelines(source);
assert.deepEqual(baseline.errors, []);

const missingCombinedMethod = clone(source);
delete missingCombinedMethod.explanationMethod;
assert.match(validatePublicationPipelines(missingCombinedMethod).errors.join("\n"), /bind the current combined explanation benchmark/);

const hannahOnlyNameDrop = clone(source);
hannahOnlyNameDrop.explanationMethod.feynmanStyleMethod = "Use the Feynman method.";
hannahOnlyNameDrop.explanationMethod.aidbScrutinyMethod = "Check AIDB.";
assert.match(validatePublicationPipelines(hannahOnlyNameDrop).errors.join("\n"), /first-principles explain-back and transfer/);
assert.match(validatePublicationPipelines(hannahOnlyNameDrop).errors.join("\n"), /primary-evidence and impact scrutiny/);

const parrotingTransfer = clone(source);
parrotingTransfer.explanationMethod.requiredProducerEvidence = parrotingTransfer.explanationMethod.requiredProducerEvidence.filter((field) => !/parroting|unseen transfer/i.test(field));
assert.match(validatePublicationPipelines(parrotingTransfer).errors.join("\n"), /explain-back.*parroting/);
assert.match(validatePublicationPipelines(parrotingTransfer).errors.join("\n"), /different unseen transfer case/);

const missingPair = clone(source);
missingPair.explanationMethod.requiredProducerEvidence = missingPair.explanationMethod.requiredProducerEvidence.filter((field) => !/workplace example|non-work|everyday-life/i.test(field));
assert.match(validatePublicationPipelines(missingPair).errors.join("\n"), /workplace example/);

const missing = clone(source);
missing.formats = missing.formats.filter((format) => format.id !== "dear_miss_jeeves");
assert.match(validatePublicationPipelines(missing).errors.join("\n"), /missing required format dear_miss_jeeves/);

const dailyCard = clone(source);
dailyCard.formats.find((format) => format.id === "news_daily").surfaceContainer = "SINGLE_CARD";
assert.match(validatePublicationPipelines(dailyCard).errors.join("\n"), /daily multi-element newspaper/);

const dailyScaffolding = clone(source);
dailyScaffolding.formats.find((format) => format.id === "news_daily").templateFields = [
  "edition date", "lead", "desk status", "empty states", "sources"
];
assert.match(validatePublicationPipelines(dailyScaffolding).errors.join("\n"), /reader-facing newspaper hierarchy/);

const nonBreakingUpdate = clone(source);
nonBreakingUpdate.formats.find((format) => format.id === "news_breaking").templateFields = [
  "headline", "confirmed update", "technical mechanism", "sources", "action"
];
assert.match(validatePublicationPipelines(nonBreakingUpdate).errors.join("\n"), /newcomer background.*before the next Daily/);

const weeklyBundle = clone(source);
weeklyBundle.formats.find((format) => format.id === "news_weekly").templateFields = ["headline", "summary", "sources", "date", "action"];
assert.match(validatePublicationPipelines(weeklyBundle).errors.join("\n"), /synthesis of at least two developments/);

const renamedWrongly = clone(source);
renamedWrongly.formats.find((format) => format.id === "news_big_question").displayName = "The Tribune";
assert.match(validatePublicationPipelines(renamedWrongly).errors.join("\n"), /expose The Big Question/);

const thesisWithoutInvestigation = clone(source);
thesisWithoutInvestigation.formats.find((format) => format.id === "news_big_question").templateFields = [
  "question", "thesis", "counterargument", "conclusion", "sources"
];
assert.match(validatePublicationPipelines(thesisWithoutInvestigation).errors.join("\n"), /investigation before thesis/);

const weakStraightAnswer = clone(source);
weakStraightAnswer.formats.find((format) => format.id === "straight_answers").templateFields = [
  "question", "answer", "open the citation", "check the date", "sources"
];
assert.match(validatePublicationPipelines(weakStraightAnswer).errors.join("\n"), /exceed the reader baseline/);

const promptOnlyJeeves = clone(source);
promptOnlyJeeves.formats.find((format) => format.id === "dear_miss_jeeves").templateFields = [
  "question", "write clearer instructions", "start a new chat", "tip", "sources"
];
assert.match(validatePublicationPipelines(promptOnlyJeeves).errors.join("\n"), /durable long-running controls/);

const abstractPromptoscope = clone(source);
const abstractPromptoscopeFormat = abstractPromptoscope.formats.find((format) => format.id === "promptoscope");
delete abstractPromptoscopeFormat.compactTransferRule;
abstractPromptoscopeFormat.templateFields = [
  "forecast", "tip", "one work example", "one home example", "source"
];
assert.match(validatePublicationPipelines(abstractPromptoscope).errors.join("\n"), /one concrete complete example/);
assert.match(validatePublicationPipelines(abstractPromptoscope).errors.join("\n"), /named AI object/);
assert.match(validatePublicationPipelines(abstractPromptoscope).errors.join("\n"), /one recognizable AI behaviour or misconception/);

const forcedPromptoscopePair = clone(source);
forcedPromptoscopePair.dailyServiceColumnClarityContract.promptoscope = "Use one work and one home example.";
assert.match(validatePublicationPipelines(forcedPromptoscopePair).errors.join("\n"), /distinguish Promptoscope's funny AI-behaviour forecast/);

const paigeWithStars = clone(source);
paigeWithStars.dailyServiceColumnClarityContract.promptoscope = "Give one action the reader can use today, but add a horoscope headline.";
assert.match(validatePublicationPipelines(paigeWithStars).errors.join("\n"), /distinguish Promptoscope's funny AI-behaviour forecast/);

const singleOutputOnly = clone(source);
singleOutputOnly.rule = "A signal may create only one output.";
assert.match(validatePublicationPipelines(singleOutputOnly).errors.join("\n"), /allow earned multi-output/);

const inheritedAdmission = clone(source);
inheritedAdmission.multiOutputContract.independenceRule = "All outputs share approval.";
assert.match(validatePublicationPipelines(inheritedAdmission).errors.join("\n"), /prohibit inherited admission/);

console.log("PUBLICATION PIPELINE TEST PASS");
console.log("calibration=missing-combined-method,hannah-only-name-drop,parroting-transfer,missing-paired-example,missing-format,non-breaking-update,single-card-daily,daily-scaffolding,single-story-weekly,wrong-public-name,thesis-without-investigation,weak-straight-answer,prompt-only-jeeves,abstract-promptoscope,forced-promptoscope-pair,paige-with-stars,single-output-only,inherited-admission rejected");
