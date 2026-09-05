import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

const root=process.cwd();
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'news-review-replay-test-'));
const runtime='operations/product-stewards/newsstand/review-runtime/';
const learning='operations/product-stewards/learning-content-ecosystem/';
const candidate='operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/';
const attempt=candidate+'bounded-claude-v2/';
const copy=p=>{fs.mkdirSync(path.dirname(path.join(fixture,p)),{recursive:true});fs.copyFileSync(path.join(root,p),path.join(fixture,p))};
for(const p of [runtime+'protocol.mjs',runtime+'run-pilot.mjs',learning+'content-quality-exemplars.json',learning+'HANNAH-FRY-COMMUNICATION-BENCHMARK.md','operations/library-decisions.md','operations/product-stewards/newsstand/ordinary-news-editorial-policy.json','scripts/prepare-newsstand-draft.mjs','scripts/check-content-producer-contract.mjs','scripts/check-prose-quality-admission.mjs'])copy(p);
const registry=JSON.parse(fs.readFileSync(path.join(root,learning+'content-quality-exemplars.json'),'utf8'));
for(const item of [...registry.negativeExemplars,...registry.positiveExemplars.filter(p=>/^CQX-GOOD-NEWS-00[12]$/.test(p.id))])copy(item.path);
for(const p of fs.readdirSync(path.join(root,attempt)).filter(p=>p!=='calibration-result.json'))copy(attempt+p);
const guard=path.join(fixture,'no-provider.mjs');
fs.writeFileSync(guard,`import cp from 'node:child_process';import {syncBuiltinESMExports} from 'node:module';import fs from 'node:fs';const deny=()=>{fs.writeFileSync('PROVIDER_WAS_CALLED','blocked');throw Error('Provider forbidden in replay test')};globalThis.fetch=deny;cp.spawn=deny;syncBuiltinESMExports();`);
const run=mode=>spawnSync(process.execPath,['--import',guard,runtime+'run-pilot.mjs',mode,'claude','--resume'],{cwd:fixture,encoding:'utf8',timeout:10000});
try{
 const rawPath=attempt+'sample-1cc8aa5f96-provider.raw.json',before=fs.readFileSync(path.join(fixture,rawPath));
 const replay=run('calibrate');assert.equal(replay.status,1,replay.stderr);
 const result=JSON.parse(fs.readFileSync(path.join(fixture,attempt+'calibration-result.json'),'utf8'));
 assert.equal(result.status,'HOLD_CALIBRATION');assert.equal(result.evaluations[0].failureKind,'EXECUTION_OR_PROTOCOL_FAILURE');assert.match(result.evaluations[0].failure,/Saved packet differs|Protocol changed|Missing or extra/);assert.deepEqual(result.notRun,['CQX-GOOD-NEWS-002','CQX-BAD-001']);
 assert.deepEqual(fs.readFileSync(path.join(fixture,rawPath)),before);
 assert.equal(fs.existsSync(path.join(fixture,'PROVIDER_WAS_CALLED')),false);
 const article=run('article');assert.equal(article.status,1);assert.match(article.stderr,/Calibrate before article assessment/);assert.equal(fs.existsSync(path.join(fixture,attempt+'article-facts-request.json')),false);
 fs.unlinkSync(path.join(fixture,attempt+'calibration-result.json'));
 fs.unlinkSync(path.join(fixture,rawPath));
 const incomplete=run('calibrate');assert.equal(incomplete.status,1);
 const stopped=JSON.parse(fs.readFileSync(path.join(fixture,attempt+'calibration-result.json'),'utf8'));
 assert.equal(stopped.status,'HOLD_CALIBRATION');assert.match(stopped.evaluations[0].failure,/no raw result/);
 assert.equal(fs.existsSync(path.join(fixture,'PROVIDER_WAS_CALLED')),false);
 console.log('Replay checks: historical raw is rejected under the changed protocol without provider access; incomplete attempt is not resent; held calibration blocks article review. No editorial-quality or publication claim.');
}finally{fs.rmSync(fixture,{recursive:true,force:true})}
