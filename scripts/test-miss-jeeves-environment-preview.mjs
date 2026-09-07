import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import worker from '../_worker.js';
import { importReviewedAnswer, lookupReviewedAnswer } from './lib/miss-jeeves-answer-bank.mjs';

const packet = new URL('../operations/product-stewards/library/environment-answer-20260907/', import.meta.url);
const records = [JSON.parse(await fs.readFile(new URL('reviewed-record.json', packet), 'utf8'))];
const predecessors=[];
const sourceFiles=new Map([
 ['https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary',['iea.html','text/html']],
 ['https://unctad.org/system/files/official-document/der2024_overview_en.pdf',['unctad-overview.pdf','application/pdf']]
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

const record=records[0];
await withFetch(fixtureFetch,async()=>{
 for(const query of [record.canonicalQuestion,...record.aliases]){const result=await ask(query);assert.equal(result.mode,'reviewed-answer');assert.equal(result.answer,record.answer);assert.equal(result.answer_key,record.answerKey);}
 for(const query of ['Is AI bad for the environment if I generate one video a day?','What is the environmental impact of AI in Vancouver?','Which AI tool uses the least water?'])assert.notEqual((await ask(query)).mode,'reviewed-answer');
});
assert.equal((await lookupReviewedAnswer(db,record.canonicalQuestion,{now:new Date(Date.parse(record.expiresAt)+1).toISOString(),sourcePolicyVersion:record.sourcePolicyVersion,checkSources:async()=>({current:true,sourceDigest:record.sourceDigest})})).reason,'stale');
await withFetch(async url=>{if(url===record.sources[0].url)return new Response(new TextDecoder().decode(sourceBytes.get(url)).replace('50% in 2025','51% in 2025'),{headers:{'content-type':'text/html'}});return fixtureFetch(url)},async()=>assert.notEqual((await ask(record.canonicalQuestion)).mode,'reviewed-answer'));
await withFetch(async()=>new Response('',{status:503}),async()=>assert.notEqual((await ask(record.canonicalQuestion)).mode,'reviewed-answer'));
await withFetch(async url=>{if(url===record.sources[1].url){const b=new Uint8Array(sourceBytes.get(url));b[b.length-8]^=1;return new Response(b,{headers:{'content-type':'application/pdf'}})}return fixtureFetch(url)},async()=>assert.notEqual((await ask(record.canonicalQuestion)).mode,'reviewed-answer'));
assert.equal(paidCalls,0);
console.log('PASS environment: direct answer +2 aliases;3 changed-context misses; expired, changedHTML, changedPDF, unavailable and tampered answer rejected; zero paid calls.');
