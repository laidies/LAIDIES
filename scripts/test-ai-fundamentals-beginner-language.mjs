#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { aiFundamentalsBeginnerLanguageIssues } from "./check-ai-fundamentals-beginner-language.mjs";

const bad = fs.readFileSync("operations/product-stewards/library/fixtures/ai-fundamentals-jargon-definition-known-bad.md", "utf8");
const good = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md", "utf8");

const badIssues = aiFundamentalsBeginnerLanguageIssues(bad, { requireOpeningSequence: false });
assert.equal(badIssues.length, 2, `known-bad must trigger both jargon-first rejections: ${JSON.stringify(badIssues)}`);
assert.deepEqual(aiFundamentalsBeginnerLanguageIssues(good), [], "current candidate must retain the complete beginner opening sequence");

console.log(`AI FUNDAMENTALS BEGINNER LANGUAGE CALIBRATION PASS rejected=${badIssues.length} current=0`);
