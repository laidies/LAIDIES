import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {sealReleaseCustody} from './newsstand-release-custody.mjs';
import {importReleaseCustody} from './import-newsstand-release-custody.mjs';
const keyB64=crypto.randomBytes(32).toString('base64'),runId='12345',now=1795296000000,expectedCommit='b'.repeat(40);
const value={accountId:'a'.repeat(32),token:'synthetic-test-only-token-12345'},raw=sealReleaseCustody({...value,keyB64,runId,now});
const input={raw,keyB64,runId,now,expectedCommit,expectedSha256:crypto.createHash('sha256').update(raw).digest('hex')};
const goodRun={id:12345,head_sha:expectedCommit,head_branch:'main',event:'workflow_dispatch',status:'completed',conclusion:'success',path:'.github/workflows/newsstand-cloud-intake.yml',repository:{full_name:'laidies/LAIDIES'}};
function dependencies({privateRepo=true,run=goodRun,status=200}={}){const writes=[];return {writes,github(args,body){if(args[0]==='secret'){writes.push({args,body});return '';}return JSON.stringify(args[1].includes('/actions/runs/')?run:{full_name:'laidies/newsstand-automation',private:privateRepo});},async fetcher(url,opts){assert.equal(opts.redirect,'error');assert.equal(opts.headers.Authorization,`Bearer ${value.token}`);assert.ok(url.endsWith('/pages/projects/laidies-sunnyvaile'));return {status,json:async()=>({success:true,result:{name:'laidies-sunnyvaile',production_branch:'homepage-redesign'}})};}};}
let d=dependencies();const result=await importReleaseCustody(input,d);assert.equal(result.status,'IMPORTED_PROVIDER_READ_VERIFIED');assert.equal(d.writes.length,2);assert.equal(d.writes[1].body,value.token);assert.deepEqual(d.writes[1].args,['secret','set','CLOUDFLARE_API_TOKEN','--repo','laidies/newsstand-automation']);assert.ok(!JSON.stringify(result).includes(value.token));
for(const config of [{privateRepo:false},{status:401},{run:{...goodRun,head_sha:'c'.repeat(40)}},{run:{...goodRun,event:'push'}},{run:{...goodRun,conclusion:'failure'}},{run:{...goodRun,head_branch:'other'}}]){d=dependencies(config);await assert.rejects(()=>importReleaseCustody(input,d));assert.equal(d.writes.length,0);}
d=dependencies();await assert.rejects(()=>importReleaseCustody({...input,expectedSha256:'0'.repeat(64)},d));assert.equal(d.writes.length,0);
console.log('PASS in-memory custody import: exact successful upstream run, private destination, provider scope; negative inputs cause zero secret writes');
