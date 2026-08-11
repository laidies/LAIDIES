#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import { aiFundamentalsBeginnerLanguageIssues } from "./check-ai-fundamentals-beginner-language.mjs";

const bad = fs.readFileSync("operations/product-stewards/library/fixtures/ai-fundamentals-jargon-definition-known-bad.md", "utf8");
const good = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r6.md", "utf8");
const r7 = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r7.md", "utf8");
const r8 = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r8.md", "utf8");
const r9 = fs.readFileSync("content/library-books/pilots/ai-fundamentals-101-v4/introduction-and-chapter-1-r9.md", "utf8");

const badIssues = aiFundamentalsBeginnerLanguageIssues(bad, { requireOpeningSequence: false });
assert.equal(badIssues.length, 2, `known-bad must trigger both jargon-first rejections: ${JSON.stringify(badIssues)}`);
assert.deepEqual(aiFundamentalsBeginnerLanguageIssues(good), [], "current candidate must retain the complete beginner opening sequence");
const r7Issues = aiFundamentalsBeginnerLanguageIssues(r7);
assert.ok(r7Issues.length > 0, "directly rejected R7 must fail the repaired beginner-language gate");
const r8Issues = aiFundamentalsBeginnerLanguageIssues(r8);
assert.ok(r8Issues.some(issue => issue.includes("historical succession")), "R8 false pass must now fail for treating overlapping families as a history ladder");
assert.deepEqual(aiFundamentalsBeginnerLanguageIssues(r9), [], "R9 must provide an acronym-safe, question-led actual-system teaching sequence with correction routes");

const r7JargonFirst = r7.replace("Here is a concrete example.", "A probability distribution and calibration establish the model's inference behaviour. Here is a concrete example.");
const r7JargonIssues = aiFundamentalsBeginnerLanguageIssues(r7JargonFirst);
assert.ok(r7JargonIssues.some(issue => issue.includes("probability distribution")), "R7 calibration must reject later-chapter jargon before the ordinary example");

console.log(`AI FUNDAMENTALS BEGINNER LANGUAGE CALIBRATION PASS rejected=${badIssues.length} r7_false_pass_rejected=${r7Issues.length} r8_false_pass_rejected=${r8Issues.length} r7_jargon_rejected=${r7JargonIssues.length} r9=0`);
