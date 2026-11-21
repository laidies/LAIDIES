import assert from 'node:assert/strict';
import {eligibleCustodyArtifact as eligible} from './select-newsstand-custody-artifacts.mjs';
const workflowIds={production:'111',intake:'222'};
const artifact={name:'newsstand-codex-auth-migration',id:333,expired:false,size_in_bytes:1234,workflow_run:{id:444}};
const run={id:444,workflow_id:111,status:'completed',conclusion:'success',head_branch:'ops/newsstand-hosted-20260926',head_sha:'a'.repeat(40),created_at:'2026-11-21T17:00:00Z'};
const sidecar={version:1,workflowId:'111',runId:'444',runStartedAt:run.created_at,sourceCommit:run.head_sha,sourceRef:'refs/heads/ops/newsstand-hosted-20260926'};
const test=(a=artifact,r=run,s=sidecar,w=workflowIds)=>eligible({artifact:a,run:r,sidecar:s,workflowIds:w});
assert.equal(test(),true);
for(const [a,r,s,w] of [
 [{...artifact,expired:true},run,sidecar,workflowIds],
 [{...artifact,name:'arbitrary'},run,sidecar,workflowIds],
 [{...artifact,size_in_bytes:9e6},run,sidecar,workflowIds],
 [artifact,{...run,workflow_id:222},sidecar,workflowIds],
 [artifact,{...run,conclusion:'failure'},sidecar,workflowIds],
 [artifact,{...run,head_branch:'attacker'},sidecar,workflowIds],
 [artifact,run,{...sidecar,sourceCommit:'b'.repeat(40)},workflowIds],
 [artifact,run,{...sidecar,runId:'445'},workflowIds],
 [artifact,run,{...sidecar,extra:'x'},workflowIds],
])assert.equal(test(a,r,s,w),false);
const a={...artifact,name:'newsstand-codex-auth-current'},r={...run,workflow_id:222,head_branch:'main'},s={...sidecar,workflowId:'222',sourceRef:'refs/heads/main'};
assert.equal(test(a,r,s),true);
console.log('PASS exact scheduled and migration custody provenance; 9 invalid candidates rejected');
