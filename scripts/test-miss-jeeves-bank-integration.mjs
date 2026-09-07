import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from '../_worker.js';
import {importReviewedAnswer,lookupReviewedAnswer} from './lib/miss-jeeves-answer-bank.mjs';
import {checkReviewedSources} from './lib/miss-jeeves-source-check.mjs';
const [recordFile,questionsFile]=process.argv.slice(2);
if(!recordFile||!questionsFile)throw Error('Supply reviewed bank record and existing 50-question bank.');
const record=JSON.parse(fs.readFileSync(recordFile,'utf8'));
const sqlite=new DatabaseSync(':memory:');sqlite.exec(fs.readFileSync(new URL('../migrations/library-corrections/0004_miss_jeeves_answer_bank.sql',import.meta.url),'utf8'));
const db={prepare(sql){const stmt=sqlite.prepare(sql);return {bind(...args){return {run:async()=>stmt.run(...args),all:async()=>stmt.all(...args)};}};},async batch(statements){sqlite.exec('BEGIN');try{for(const s of statements)await s.run();sqlite.exec('COMMIT');}catch(e){sqlite.exec('ROLLBACK');throw e;}}};
assert.equal((await importReviewedAnswer(db,record)).status,'imported');
let paid=0;
const env={MISS_JEEVES_DB:db,MISS_JEEVES_ANSWER_BANK_ENABLED:'true',MISS_JEEVES_ANSWER_BANK_SOURCE_POLICY_VERSION:record.sourcePolicyVersion,ASSETS:{async fetch(){return Response.json({_meta:{schema:'laidies-miss-jeeves-index.v1'},entries:[]});}},FAIRY_AI:{async fetch(){paid++;throw Error('Unexpected paid call');}}};
const ask=query=>worker.fetch(new Request('https://laidies.ai/api/miss-jeeves',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query,intent:'search'})}),env).then(r=>r.json());
const displayAnswer=record.answer.replace(/\s*\(\[[^\]]+\]\(https:\/\/[^)]+\)\)/g,'');
const primary=await ask(record.canonicalQuestion);assert.equal(primary.mode,'reviewed-answer','fresh real source must permit reviewed answer');assert.equal(primary.answer,displayAnswer);assert.deepEqual(primary.results,[],'unreviewed search matches must not be advertised as extensions of the reviewed answer');
for(const alias of record.aliases){const r=await ask(alias);assert.equal(r.mode,'reviewed-answer');assert.equal(r.answer,displayAnswer);}
for(const question of [record.canonicalQuestion+' For my confidential contract.',record.canonicalQuestion+' In Gemini for medical diagnosis.'])assert.equal((await ask(question)).status,'search_results');
const questions=JSON.parse(fs.readFileSync(questionsFile,'utf8')).questions;assert.equal(questions.length,50);
for(const q of questions){const r=await ask(q.question);assert.equal(r.mode,q.question===record.canonicalQuestion?'reviewed-answer':'site-search',q.id);}
assert.equal(paid,0,'50 routing cases and aliases must never spend on search');
const closed=await lookupReviewedAnswer(db,record.canonicalQuestion,{sourcePolicyVersion:record.sourcePolicyVersion,checkSources:args=>checkReviewedSources(args,{fetchImpl:async()=>new Response('',{status:403})})});assert.equal(closed.status,'miss');
console.log('PASS real-source bank integration: canonical + aliases, two changed contexts, all 50 routing cases, blocked source, zero provider calls.');
