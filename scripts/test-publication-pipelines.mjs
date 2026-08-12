#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { validatePublicationPipelines } from "./check-publication-pipelines.mjs";

const source = JSON.parse(fs.readFileSync(path.join(process.cwd(), "operations/product-stewards/learning-content-ecosystem/PUBLICATION-PIPELINES.json"), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const baseline = validatePublicationPipelines(source);
assert.deepEqual(baseline.errors, []);

const missing = clone(source);
missing.formats = missing.formats.filter((format) => format.id !== "dear_miss_jeeves");
assert.match(validatePublicationPipelines(missing).errors.join("\n"), /missing required format dear_miss_jeeves/);

const dailyCard = clone(source);
dailyCard.formats.find((format) => format.id === "news_daily").surfaceContainer = "SINGLE_CARD";
assert.match(validatePublicationPipelines(dailyCard).errors.join("\n"), /daily multi-element newspaper/);

const weeklyBundle = clone(source);
weeklyBundle.formats.find((format) => format.id === "news_weekly").templateFields = ["headline", "summary", "sources", "date", "action"];
assert.match(validatePublicationPipelines(weeklyBundle).errors.join("\n"), /synthesis of at least two developments/);

const renamedWrongly = clone(source);
renamedWrongly.formats.find((format) => format.id === "news_big_question").displayName = "The Tribune";
assert.match(validatePublicationPipelines(renamedWrongly).errors.join("\n"), /expose The Big Question/);

const singleOutputOnly = clone(source);
singleOutputOnly.rule = "A signal may create only one output.";
assert.match(validatePublicationPipelines(singleOutputOnly).errors.join("\n"), /allow earned multi-output/);

const inheritedAdmission = clone(source);
inheritedAdmission.multiOutputContract.independenceRule = "All outputs share approval.";
assert.match(validatePublicationPipelines(inheritedAdmission).errors.join("\n"), /prohibit inherited admission/);

console.log("PUBLICATION PIPELINE TEST PASS");
console.log("calibration=missing-format,single-card-daily,single-story-weekly,wrong-public-name,single-output-only,inherited-admission rejected");
