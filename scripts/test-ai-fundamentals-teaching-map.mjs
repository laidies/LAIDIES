#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { aiFundamentalsTeachingMapIssues } from "./check-ai-fundamentals-teaching-map.mjs";

const map = JSON.parse(fs.readFileSync("operations/product-stewards/library/AI-FUNDAMENTALS-101-V4-SECTION-TEACHING-MAP.json", "utf8"));
assert.deepEqual(aiFundamentalsTeachingMapIssues(map), [], "current map must cover every taught Standard concept");

const knownBad = structuredClone(map);
knownBad.chapter1StandardContracts = knownBad.chapter1StandardContracts.filter(item => item.standard !== "Predictive AI estimates what is likely");
const badIssues = aiFundamentalsTeachingMapIssues(knownBad);
assert(badIssues.includes("Standard example/importance contract missing for Predictive AI estimates what is likely"), `known-bad subset omission must fail: ${JSON.stringify(badIssues)}`);

console.log(`AI FUNDAMENTALS TEACHING MAP CALIBRATION PASS valid=${map.chapter1StandardContracts.length} rejected_subset=1`);
