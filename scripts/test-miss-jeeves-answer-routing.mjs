#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const policyPath = path.join(root, 'operations/product-stewards/learning-content-ecosystem/miss-jeeves-answer-routing.json');
const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));

assert.equal(policy.schemaVersion, 'miss-jeeves-answer-routing-v1');
assert.equal(policy.status, 'accepted_product_rule_implementation_required');

const homes = new Map(policy.primaryHomes.map(home => [home.id, home]));
for (const id of ['straight_answers', 'dear_miss_jeeves', 'newsstand', 'library_learning', 'site_help', 'do_not_publish']) {
  assert.ok(homes.has(id), `missing primary home: ${id}`);
  assert.ok(homes.get(id).requiredTests.length, `missing routing tests: ${id}`);
}

assert.equal(policy.reusePolicy.rawPersonalQuestionCacheProhibited, true);
assert.equal(policy.reusePolicy.privateSaveRequiresExplicitVisitorAction, true);
assert.equal(policy.reusePolicy.privateSaveCreatesPublicationCandidate, false);
assert.equal(policy.reusePolicy.privateSaveMayEnterSharedCache, false);
assert.equal(policy.reusePolicy.privateSavePreservesOriginalVersion, true);
assert.equal(policy.reusePolicy.staleAnswerRequiresSourcedRefresh, true);
assert.equal(policy.reusePolicy.materialChangeCreatesSuccessor, true);
assert.equal(policy.reusePolicy.cacheMayAutoPublish, false);
assert.ok(policy.promotionTriggers.includes('ali_explicit_request'));

const visibility = new Map(policy.visibilityStates.map(state => [state.id, state]));
assert.deepEqual([...visibility.keys()], ['transient', 'private_saved', 'internal_candidate', 'public_admitted']);
assert.equal(visibility.get('private_saved').audience, 'saving_visitor_only');
assert.equal(visibility.get('private_saved').publiclyIndexed, false);
assert.equal(visibility.get('internal_candidate').publiclyIndexed, false);
assert.equal(visibility.get('public_admitted').publiclyIndexed, true);

for (const example of policy.examples) {
  assert.ok(homes.has(example.primaryHome), `invalid example primary home: ${example.primaryHome}`);
  assert.equal(new Set(example.secondaryHomes).size, example.secondaryHomes.length, 'duplicate secondary home');
  assert.ok(!example.secondaryHomes.includes(example.primaryHome), 'primary home repeated as secondary home');
  for (const secondary of example.secondaryHomes) assert.ok(homes.has(secondary), `invalid secondary home: ${secondary}`);
}

assert.equal(policy.examples.find(row => row.question === 'What is Hugging Face?')?.primaryHome, 'straight_answers');
assert.equal(policy.examples.find(row => row.question === 'Do I need Hugging Face to build this for work?')?.primaryHome, 'dear_miss_jeeves');
assert.equal(policy.examples.find(row => row.question === 'Why is Hugging Face in the news today?')?.primaryHome, 'newsstand');

console.log('PASS Miss Jeeves answer reuse and publication routing policy');
