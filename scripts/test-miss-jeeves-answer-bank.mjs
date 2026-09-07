#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { approvedExamples, createAnswerReviewBinding, hashAnswerBankValue, importReviewedAnswer, lookupReviewedAnswer, normalizeAnswerQuestion, normalizeSourceText, sourceDigestFor } from './lib/miss-jeeves-answer-bank.mjs';

const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync(new URL('../migrations/library-corrections/0004_miss_jeeves_answer_bank.sql', import.meta.url), 'utf8'));
const d1 = { prepare(sql) { const statement = db.prepare(sql); return { bind(...values) { return { run: async () => statement.run(...values), all: async () => statement.all(...values) }; } }; }, async batch(statements) { for (const statement of statements) await statement.run(); } };
const record = {
  answerKey: 'ai-plain-english', canonicalQuestion: 'What is AI, in plain English?', aliases: ['What is artificial intelligence?', ' explain AI  '],
  answer: 'AI is software that finds patterns in examples and uses them to make a prediction, recommendation or draft.',
  sources: [{ url: 'https://example.org/ai', title: 'Primary explanation', contentDigest: await hashAnswerBankValue(normalizeSourceText('Relevant source wording.')) }], relatedLaidiesConcepts: ['AI Fundamentals 101'], modelVersion: 'gpt-5.6-sol', sourcePolicyVersion: 'trusted.v1',
  checkedAt: '2026-09-07T00:00:00.000Z', expiresAt: '2026-10-07T00:00:00.000Z', recheckTriggers: ['source change'], visibility: 'internal_reusable', approvedForExample: true,
  review: { reviewerId: 'editor-b', roleDistinct: true, total: 18, minimumDimension: 3, reviewedAt: '2026-09-07T00:00:00.000Z', hardGates: ['direct_complete_answer','claim_source_fidelity','freshness_and_unknowns','beginner_comprehension','useful_mechanism_or_decision_logic','laidies_relationship_integrity','privacy_and_safety','no_known_slop'] }
};
Object.assign(record, await createAnswerReviewBinding(record));

// Calibration: known-bad entries must fail before the usable reviewed record is imported.
assert.equal((await importReviewedAnswer(d1, { ...record, review: { ...record.review, roleDistinct: false } })).reason, 'reviewer_not_distinct');
assert.equal((await importReviewedAnswer(d1, { ...record, visibility: 'public_admitted' })).reason, 'visibility_not_reusable');
assert.equal((await importReviewedAnswer(d1, { ...record, aliases: [] })).reason, 'aliases_required');
assert.equal((await importReviewedAnswer(d1, { ...record, sources: [{ url: 'https://example.org/ai' }] })).reason, 'invalid_source_digest');
assert.equal((await importReviewedAnswer(d1, { ...record, review: { ...record.review, hardGates: [] } })).reason, 'hard_gates_incomplete');
assert.equal((await importReviewedAnswer(d1, { ...record, answerFingerprint: '0'.repeat(64) })).reason, 'answer_fingerprint_mismatch');
assert.equal((await lookupReviewedAnswer(d1, 'What is AI?', { now: '2026-09-07T01:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async () => ({ current: true }) })).reason, 'no_alias');

const imported = await importReviewedAnswer(d1, record, { id: '11111111-1111-4111-8111-111111111111' });
assert.equal(imported.status, 'imported');
const hit = await lookupReviewedAnswer(d1, '  WHAT is   AI, in plain English? ', { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async value => ({ current: true, sourceDigest: value.sourceDigest }) });
assert.equal(hit.status, 'hit'); assert.equal(hit.answer, record.answer); assert.equal(hit.approvedForExample, true);
assert.equal((await lookupReviewedAnswer(d1, 'What is AI for my confidential work document?', { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async value => ({ current: true, sourceDigest: value.sourceDigest }) })).reason, 'no_alias');
assert.equal(normalizeAnswerQuestion('  AI\u00a0Tool  '), 'ai tool');
assert.equal(normalizeSourceText(' relevant\r\nsource  \n'), 'relevant\nsource');
assert.equal(await sourceDigestFor(record.sources), await sourceDigestFor(structuredClone(record.sources)));
assert.deepEqual(await approvedExamples(d1, { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async value => ({ current: true, sourceDigest: value.sourceDigest }) }), [{ answerKey: 'ai-plain-english', question: 'What is AI, in plain English?' }]);
assert.deepEqual(await approvedExamples(d1), [], 'examples fail closed without a current source checker');
assert.equal((await lookupReviewedAnswer(d1, record.canonicalQuestion, { now: '2026-10-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async value => ({ current: true, sourceDigest: value.sourceDigest }) })).reason, 'stale');
assert.equal((await lookupReviewedAnswer(d1, record.canonicalQuestion, { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v2', checkSources: async value => ({ current: true, sourceDigest: value.sourceDigest }) })).reason, 'source_policy_mismatch');
assert.equal((await lookupReviewedAnswer(d1, record.canonicalQuestion, { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async () => ({ current: false }) })).reason, 'source_mismatch');
assert.equal((await lookupReviewedAnswer(d1, record.canonicalQuestion, { now: '2026-09-08T00:00:00.000Z', sourcePolicyVersion: 'trusted.v1', checkSources: async () => ({ current: true, sourceDigest: 'f'.repeat(64) }) })).reason, 'source_mismatch');
assert.throws(() => db.prepare("UPDATE miss_jeeves_answer_bank_versions SET answer_text='mutated' WHERE answer_key=?").run(record.answerKey), /immutable/);
assert.throws(() => db.prepare('DELETE FROM miss_jeeves_answer_bank_reviews WHERE answer_version_id=?').run(imported.answerVersionId), /immutable/);
console.log('MISS JEEVES ANSWER BANK PASS calibrated_rejections=7 exact_alias=1 context_added_miss=1 stale=1 policy_mismatch=1 source_mismatch=1 immutable_versions=1 examples_current_only=1');
