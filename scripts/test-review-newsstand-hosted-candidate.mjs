import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import assert from 'node:assert/strict';
import {reviewHostedCandidate} from './review-newsstand-hosted-candidate.mjs';
const root=fs.mkdtempSync(path.join(os.tmpdir(),'hosted-candidate-review-test-'));
const candidate='operations/product-stewards/newsstand/candidates/test',calibration='operations/product-stewards/newsstand/calibration/test';
for(const p of[candidate,calibration,'operations/product-stewards/newsstand/review-runtime'])fs.mkdirSync(path.join(root,p),{recursive:true});
const producerPath=path.join(root,candidate,'producer-publication-review.json');
fs.writeFileSync(producerPath,JSON.stringify({maker:'anthropic:isolated-writer:test',reviewer:{principalId:'anthropic:isolated-writer:test'}}));
const script=path.join(root,'operations/product-stewards/newsstand/review-runtime/run-hosted-pilot.mjs');
fs.writeFileSync(script,`import fs from 'node:fs';const out=process.argv[process.argv.indexOf('--output')+1];fs.mkdirSync(out,{recursive:true});console.log(process.env.CLAUDE_CODE_OAUTH_TOKEN);fs.writeFileSync(out+'/article-result.json',JSON.stringify({status:'PASS'}));`);
try{
 const output='operations/product-stewards/newsstand/review/test';const input={runtimeRoot:root,candidateDirectory:candidate,calibrationDirectory:calibration,outputDirectory:output,token:'fake-token-DO-NOT-LOG'};
 const result=await reviewHostedCandidate(input);assert.equal(result.status,'HOSTED_CANDIDATE_EDITORIAL_PASS');assert.doesNotMatch(JSON.stringify(result),/fake-token/);assert.doesNotMatch(fs.readFileSync(path.join(root,output,'runner-private.log'),'utf8'),/fake-token/);
 assert.equal(fs.statSync(path.join(root,output,'runner-private.log')).mode&0o777,0o600);
 assert.equal((await reviewHostedCandidate(input)).status,'CANDIDATE_REVIEW_INPUT_REJECTED');
 assert.equal((await reviewHostedCandidate({...input,outputDirectory:'../escape'})).status,'CANDIDATE_REVIEW_INPUT_REJECTED');
 fs.writeFileSync(script,"console.error('private draft');process.exitCode=1");
 assert.equal((await reviewHostedCandidate({...input,outputDirectory:output+'-failure'})).status,'CANDIDATE_REVIEW_HELD');
 fs.writeFileSync(producerPath,JSON.stringify({maker:'anthropic:claude-fable-5:newsstand-editorial:medium'}));
 assert.equal((await reviewHostedCandidate({...input,outputDirectory:output+'-same'})).status,'CANDIDATE_REVIEW_INPUT_REJECTED');
 console.log('HOSTED CANDIDATE WRAPPER PASS: distinct maker, private captured output, token redaction, no overwrite, path and subprocess failure reject.');
}finally{fs.rmSync(root,{recursive:true,force:true})}
