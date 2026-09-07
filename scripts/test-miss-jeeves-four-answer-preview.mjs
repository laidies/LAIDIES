import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import worker from '../_worker.js';
import { importReviewedAnswer, lookupReviewedAnswer } from './lib/miss-jeeves-answer-bank.mjs';

const packet = new URL('../operations/product-stewards/library/answer-bank-preview-20260907/', import.meta.url);
const records = JSON.parse(await fs.readFile(new URL('reviewed-records.json', packet), 'utf8'));
const predecessors = JSON.parse(await fs.readFile(new URL('bank-predecessors.json', packet), 'utf8'));
assert.equal(records.length, 4, 'the preview packet must bind exactly four reviewed records');
const sourceFiles = new Map([
  ['https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?c=caelum', ['prompting.html', 'text/html']],
  ['https://www.cyber.gc.ca/en/guidance/generative-artificial-intelligence-ai-itsap00041', ['cyber-canada-current.html', 'text/html']],
  ['https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai?wbdisable=true', ['opc.html', 'text/html']],
  ['https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf', ['openai-hallucinations.pdf', 'application/pdf']]
]);
const sourceBytes = new Map(await Promise.all([...sourceFiles].map(async ([url, [file]]) => [url, new Uint8Array(await fs.readFile(new URL(`sources/${file}`, packet)))])));
const sourceType = url => sourceFiles.get(url)?.[1];
const fixtureFetch = async url => {
  assert.ok(sourceBytes.has(url), `only reviewed source URLs may be fetched: ${url}`);
  return new Response(sourceBytes.get(url), { status: 200, headers: { 'content-type': sourceType(url) } });
};
const originalFetch = globalThis.fetch;
const withFetch = async (fetchImpl, action) => {
  globalThis.fetch = fetchImpl;
  try { return await action(); } finally { globalThis.fetch = originalFetch; }
};

const sqlite = new DatabaseSync(':memory:');
sqlite.exec(await fs.readFile(new URL('../migrations/library-corrections/0004_miss_jeeves_answer_bank.sql', import.meta.url), 'utf8'));
const db = {
  prepare(sql) {
    const statement = sqlite.prepare(sql);
    return { bind(...args) { return { run: async () => statement.run(...args), all: async () => statement.all(...args) }; } };
  },
  async batch(statements) {
    sqlite.exec('BEGIN');
    try { for (const statement of statements) await statement.run(); sqlite.exec('COMMIT'); }
    catch (error) { sqlite.exec('ROLLBACK'); throw error; }
  }
};
for (const predecessor of predecessors) {
  assert.equal((await importReviewedAnswer(db, predecessor.record, { id: predecessor.id })).status, 'imported', `predecessor ${predecessor.record.answerKey}`);
}
for (const record of records) assert.equal((await importReviewedAnswer(db, record)).status, 'imported', record.answerKey);
const tampered = structuredClone(records[0]);
tampered.answer = `${tampered.answer}\nTampered.`;
assert.equal((await importReviewedAnswer(db, tampered)).reason, 'answer_fingerprint_mismatch', 'tampered reviewed bytes must be rejected before storage');

let paidCalls = 0;
const env = {
  MISS_JEEVES_DB: db,
  MISS_JEEVES_ANSWER_BANK_ENABLED: 'true',
  MISS_JEEVES_ANSWER_BANK_SOURCE_POLICY_VERSION: records[0].sourcePolicyVersion,
  ASSETS: { async fetch() { return Response.json({ _meta: { schema: 'laidies-miss-jeeves-index.v1' }, entries: [] }); } },
  FAIRY_AI: { async fetch() { paidCalls++; throw Error('free search must never call the paid guidance service'); } }
};
const display = answer => answer.replace(/\s*\(\[[^\]]+\]\(https:\/\/[^)]+\)\)/g, '');
const ask = async query => (await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ query, intent: 'search' })
}), env)).json();

await withFetch(fixtureFetch, async () => {
  const withdrawn = records.find(record => record.answerKey === 'MJQ-005');
  assert.equal((await lookupReviewedAnswer(db, withdrawn.canonicalQuestion, {
    sourcePolicyVersion: withdrawn.sourcePolicyVersion,
    checkSources: async () => ({current: true, sourceDigest: withdrawn.sourceDigest})
  })).reason, 'owner_withdrawn', 'withdrawn prompt answer must not be reusable');
  for (const record of records.filter(record => record.answerKey !== 'MJQ-005')) {
    const canonical = await ask(record.canonicalQuestion);
    assert.equal(canonical.mode, 'reviewed-answer', `${record.answerKey} canonical`);
    assert.equal(canonical.answer, display(record.answer), `${record.answerKey} exact display answer`);
    assert.equal(canonical.answer_key, record.answerKey);
    for (const alias of record.aliases) {
      const result = await ask(alias);
      assert.equal(result.mode, 'reviewed-answer', `${record.answerKey} alias ${alias}`);
      assert.equal(result.answer, display(record.answer), `${record.answerKey} alias exact display answer`);
      assert.equal(result.answer_key, record.answerKey);
    }
  }
  for (const wording of [withdrawn.canonicalQuestion, ...withdrawn.aliases, 'How can I get useful results from AI?', 'How can I get a useful answer from AI?']) {
    const clarification = await ask(wording);
    assert.equal(clarification.status, 'clarification_required', `broad question must clarify: ${wording}`);
    assert.equal(clarification.mode, 'clarification');
    assert.equal(clarification.answer, 'What would you like AI to help you do?');
  }
  const workReply = await (await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {
    method: 'POST', headers: {'content-type': 'application/json'},
    body: JSON.stringify({query: 'How can AI help me structure a weekly project update without sharing confidential details?', intent: 'search', clarification: {originalQuestion: withdrawn.canonicalQuestion}})
  }), env)).json();
  assert.equal(workReply.answer_key, 'work-ai-help', 'specific follow-up must reach its reviewed answer');
});

const changedContext = [
  'How do I write a better prompt? I need it to process employee salaries.',
  'How can I get a more useful answer from AI for a medical diagnosis?',
  'My boss wants a weekly project update. Can I paste the client contract into my personal account?',
  'How can AI help me structure a weekly project update without sharing confidential details, and can it send it to my boss?',
  'Why should I verify an AI answer even when it sounds certain about a legal appeal?',
  'Why can AI sound confident and still be wrong about today’s stock price?',
  'What should I avoid sharing with an AI tool if it includes my password?',
  'What information is safe to put into ChatGPT or another AI tool for private medical records?',
  'How do I ask AI a question so it gives me a useful answer and deletes my account?',
  'How do I write a better prompt for a confidential staff contract?',
  'My boss wants a weekly project update. How can AI help me prepare it with named customer data?',
  'Why does AI sometimes give me a confident answer that is wrong in an emergency medical decision?',
  'What information is safe to put into ChatGPT or another AI tool when my employer has not approved it?',
  'What should I avoid sharing with an AI tool and how do I meet a legal retention requirement?',
  'How can I get a more useful answer from AI after it ignored my uploaded file?',
  'Why should I verify an AI answer even when it sounds certain, and can you guarantee it is correct?'
];
await withFetch(fixtureFetch, async () => {
  for (const question of changedContext) assert.equal((await ask(question)).status, 'search_results', `changed context must not reuse: ${question}`);
});

const current = records.find(record => record.answerKey === 'work-ai-help');
const afterExpiry = new Date(Date.parse(current.expiresAt) + 1).toISOString();
assert.equal((await lookupReviewedAnswer(db, current.canonicalQuestion, { now: afterExpiry, sourcePolicyVersion: current.sourcePolicyVersion, checkSources: async () => ({ current: true, sourceDigest: current.sourceDigest }) })).reason, 'stale', 'expired records must not reuse');
const changedSourceFetch = async url => {
  if (url === current.sources[0].url) {
    const changed = new TextDecoder().decode(sourceBytes.get(url)).replace('queries or prompts', 'queries and prompts');
    return new Response(changed, { headers: { 'content-type': sourceType(url) } });
  }
  return fixtureFetch(url);
};
await withFetch(changedSourceFetch, async () => assert.equal((await ask(current.canonicalQuestion)).status, 'search_results', 'changed official source must block reuse'));
await withFetch(async () => new Response('', { status: 503 }), async () => assert.equal((await ask(current.canonicalQuestion)).status, 'search_results', 'failed official source must block reuse'));
assert.equal(paidCalls, 0, 'canonical, aliases, context misses and source failures must spend nothing for free search');
console.log(`PASS four-answer preview: withdrawn_broad=1 exact_answers=3 aliases=${records.filter(r=>r.answerKey!=='MJQ-005').reduce((count, record) => count + record.aliases.length, 0)} changed_context=16 source_blocks=3 tamper_rejected=1 paid_calls=0`);
