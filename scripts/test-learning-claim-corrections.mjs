#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const handbook = read('content/library-books/handbook-ch1.md');
const cardPrompt = read('operations/codex-prompts/_concept-cards-popart-by-episode.md');
const claims = JSON.parse(read('operations/product-stewards/learning-content-ecosystem/claim-register.json'));

assert.doesNotMatch(handbook, /0\.75 tokens per word/i, 'reversed English token ratio must stay retired');
assert.match(handbook, /0\.75 words per token/i, 'bounded English token ratio is missing');
assert.match(handbook, /varies by model, encoding and language/i, 'token ratio needs its applicability boundary');

assert.match(cardPrompt, /CHAIN OF THOUGHT — RETIRED; DO NOT GENERATE/, 'retired card needs an executable tombstone');
assert.doesNotMatch(cardPrompt, /forces the model to reason/i, 'unsafe universal reasoning claim returned');

const tokenClaim = claims.claims.find(claim => claim.id === 'CLM-DEF-ENGLISH-TOKEN-RATIO');
assert(tokenClaim, 'maintained token-ratio claim is missing');
assert.equal(tokenClaim.status, 'CURRENT');
assert.deepEqual(tokenClaim.sourceIds, ['SRC-OPENAI-TOKEN-COUNTING-2026-08-05']);
assert.deepEqual(tokenClaim.consumers.map(consumer => consumer.id).sort(), [
  'CON-HANDBOOK-CH1-TOKEN-RATIO',
]);
assert.equal(
  claims.claims.flatMap(claim => claim.consumers || []).some(consumer =>
    consumer.id?.startsWith('CON-CONCEPTS101-') ||
    consumer.path === 'content/library-books/rendered/concepts-101.html'
  ),
  false,
  'directly rejected Concepts 101 must not return as an active claim consumer'
);

console.log('LEARNING CLAIM CORRECTIONS TEST PASS token_ratio=1 chain_of_thought_retired=1 active_consumers=1 rejected_concepts_consumer=absent');
