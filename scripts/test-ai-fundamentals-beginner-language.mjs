#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { aiFundamentalsBeginnerLanguageIssues } from "./check-ai-fundamentals-beginner-language.mjs";

const bad = fs.readFileSync("operations/product-stewards/library/fixtures/ai-fundamentals-jargon-definition-known-bad.md", "utf8");
const good = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md", "utf8");
const r7 = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r7.md", "utf8");

const badIssues = aiFundamentalsBeginnerLanguageIssues(bad, { requireOpeningSequence: false });
assert.equal(badIssues.length, 2, `known-bad must trigger both jargon-first rejections: ${JSON.stringify(badIssues)}`);
assert.deepEqual(aiFundamentalsBeginnerLanguageIssues(good), [], "current candidate must retain the complete beginner opening sequence");
assert.deepEqual(aiFundamentalsBeginnerLanguageIssues(r7), [], "R7 must provide a human-context-first, zero-prerequisite orientation and reasoned transfer check");

const r7JargonFirst = r7.replace("Here is a concrete example.", "A probability distribution and calibration establish the model's inference behaviour. Here is a concrete example.");
const r7JargonIssues = aiFundamentalsBeginnerLanguageIssues(r7JargonFirst);
assert.ok(r7JargonIssues.some(issue => issue.includes("probability distribution")), "R7 calibration must reject later-chapter jargon before the ordinary example");

console.log(`AI FUNDAMENTALS BEGINNER LANGUAGE CALIBRATION PASS rejected=${badIssues.length} r7_jargon_rejected=${r7JargonIssues.length} current=0`);
