#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';

const bankPath = new URL('../operations/product-stewards/learning-content-ecosystem/miss-jeeves-question-bank-v1/question-bank.json', import.meta.url);
const rawBank = fs.readFileSync(bankPath, 'utf8');
const bank = JSON.parse(rawBank);

assert.equal(bank.schema, 'miss-jeeves-evaluation-question-bank-v1');
assert.equal(bank.status, 'researched_benchmark_candidate');
assert.equal(bank.questions.length, 50, 'the baseline bank must contain exactly 50 questions');
assert.equal((rawBank.match(/^      "question":/gm) || []).length, 50, 'each question entry must contain exactly one question field');

const ids = new Set();
const wording = new Set();
const ranks = new Set();
const knownSources = new Set(Object.keys(bank.sourceRegistry));
const categoryCounts = new Map();

for (const [index, entry] of bank.questions.entries()) {
  const expectedRank = index + 1;
  assert.equal(entry.rank, expectedRank, `rank ${expectedRank} is missing or out of order`);
  assert.match(entry.id, /^MJQ-\d{3}$/);
  assert.equal(ids.has(entry.id), false, `duplicate id ${entry.id}`);
  ids.add(entry.id);
  assert.equal(ranks.has(entry.rank), false, `duplicate rank ${entry.rank}`);
  ranks.add(entry.rank);
  assert.equal(typeof entry.question, 'string');
  assert.ok(entry.question.length >= 20 && entry.question.length <= 180, `${entry.id} question length is outside the reviewable range`);
  assert.equal(wording.has(entry.question.toLowerCase()), false, `duplicate question ${entry.id}`);
  wording.add(entry.question.toLowerCase());
  assert.ok(entry.category, `${entry.id} has no category`);
  categoryCounts.set(entry.category, (categoryCounts.get(entry.category) || 0) + 1);
  assert.ok(['direct', 'demographic', 'direct_and_demographic', 'direct_and_broader', 'direct_and_product', 'demographic_and_contextual', 'demographic_and_product', 'broader_and_demographic', 'broader_population_proxy', 'product_and_demographic'].includes(entry.womenEvidence), `${entry.id} has an unknown womenEvidence value`);
  assert.ok(Array.isArray(entry.evidence) && entry.evidence.length > 0, `${entry.id} has no evidence`);
  for (const source of entry.evidence) assert.ok(knownSources.has(source), `${entry.id} names unknown source ${source}`);
  assert.ok(entry.freshness, `${entry.id} has no freshness class`);
  assert.ok(entry.primaryHome, `${entry.id} has no primary home`);
  assert.ok(Array.isArray(entry.mustCover) && entry.mustCover.length >= 3, `${entry.id} has an inadequate answer contract`);
}

assert.deepEqual(Object.fromEntries([...categoryCounts].sort()), {
  accuracy_privacy_safety: 12,
  choosing_tools: 5,
  getting_useful_results: 8,
  power_news_consequences: 5,
  understanding_ai: 10,
  work_and_writing: 10
});

console.log(`MISS JEEVES QUESTION BANK PASS questions=${bank.questions.length} sources=${knownSources.size} categories=${categoryCounts.size} duplicates=0 evidence_gaps=0`);
