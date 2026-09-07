#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {projectLearning,reverseImpact,QUEUE} from './project-learning-dependencies.mjs';
import {checkContentWorkOrders} from './check-content-work-orders.mjs';
import {checkContentReleaseReadiness} from './check-content-release-readiness.mjs';
const root=process.cwd(),base=path.dirname(QUEUE),digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const original=projectLearning({root});
assert.equal(original.orders.length,17);
assert.deepEqual(original.checks.workOrders,checkContentWorkOrders({root}));
assert.deepEqual(original.checks.release,checkContentReleaseReadiness({root}));
assert.equal(original.checks.workOrders.readyForProducerPreflight.length,14);
assert.equal(original.checks.workOrders.readyToDraft.length,0);
assert.equal(original.checks.workOrders.queuedWithTrigger.length,3);
assert.equal(original.checks.release.held.length,17);
assert.equal(original.checks.executor.mode,'DISABLED_UNBOUND');
assert(original.orders.every(o=>o.automaticExecution===false && o.checkerDraftEligible===false));
// Five real orders must retain exact reasons and declared owner/action, not invented readiness.
for(const id of ['LCWO-001','LCWO-002','LCWO-003','LCWO-014','LCWO-017']) {
 const o=original.orders.find(x=>x.id===id);
 assert.deepEqual(o.releaseHeldReasons,original.checks.release.held.find(x=>x.id===id).reasons);
 assert.equal(o.humanDecision,'NOT_DETERMINED_BY_PROJECTION');
}
assert.equal(reverseImpact(original,'undeclared.md').coverage,'IMPACT_UNKNOWN');
assert.deepEqual(reverseImpact(original,original.requiredPreflightPaths[0]).declaredCurrentOrders,[]);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-map-test-'));
const write=(p,v)=>{fs.mkdirSync(path.dirname(path.join(temp,p)),{recursive:true});fs.writeFileSync(path.join(temp,p),typeof v==='string'?v:JSON.stringify(v));};
try {
 // Copy only projection-read files. Never mutate source or canonical records.
 for(const f of original.files.filter(f=>f.exists)) {fs.mkdirSync(path.dirname(path.join(temp,f.path)),{recursive:true});fs.copyFileSync(path.join(root,f.path),path.join(temp,f.path));}
 const q=JSON.parse(fs.readFileSync(path.join(root,QUEUE)));
 const reset=()=>{
  write(QUEUE,q);
  for(const name of ['executor-state.json','execution-metadata.json']) {
   const v=JSON.parse(fs.readFileSync(path.join(root,base,name)));v.queueBinding.sha256=digest(fs.readFileSync(path.join(temp,QUEUE)));write(`${base}/${name}`,v);
  }
 };
 reset();
 let p=projectLearning({root:temp});assert.equal(p.status,'QUARANTINED');
 // Synthetic positive fixture supplies missing required inputs only; absent outputs stay held.
 for(const issue of p.issues.filter(i=>i.code==='MISSING_DECLARED_INPUT')) write(issue.path,issue.path.endsWith('.json')?{}:'Synthetic input for projection calibration only.');
 p=projectLearning({root:temp});assert.equal(p.status,'OBSERVATION_ONLY');
 assert(p.issues.some(i=>i.code==='FILE_UNAVAILABLE'));
 // Nonexistent source cannot disappear or be described as available.
 q.workOrders[0].sourceRefs.push('missing-source.md');reset();p=projectLearning({root:temp});
 assert(p.issues.some(i=>i.code==='MISSING_DECLARED_INPUT'&&i.path==='missing-source.md'));
 assert.equal(p.status,'QUARANTINED');
 const missingCli=spawnSync(process.execPath,['scripts/project-learning-dependencies.mjs','--root',temp],{cwd:root,encoding:'utf8'});assert.equal(missingCli.status,1);
 assert(reverseImpact(p,'missing-source.md').declaredCurrentOrders.includes('LCWO-001'));
 q.workOrders[0].sourceRefs.pop();
 // A planned output and ambiguous evidence location are not consumed inputs.
 q.workOrders[0].targetPaths.push('planned-output.md');q.workOrders[0].evidencePaths.push('planned-output.md');reset();p=projectLearning({root:temp});
 assert.deepEqual(reverseImpact(p,'planned-output.md').declaredCurrentOrders,[]);
 assert(!p.issues.some(i=>i.code==='MISSING_DECLARED_INPUT'&&i.path==='planned-output.md'));
 q.workOrders[0].targetPaths.pop();q.workOrders[0].evidencePaths.pop();
 // Explicit nested binding propagates to the exact consumers, not every order.
 write('bound.json',{input:{path:'facts.md',sha256:digest('original')}});write('facts.md','original');
 q.workOrders[0].sourceRefs.push('bound.json');reset();p=projectLearning({root:temp});
 assert.deepEqual(reverseImpact(p,'facts.md').declaredCurrentOrders,['LCWO-001']);
 write('facts.md','changed');p=projectLearning({root:temp});
 assert.equal(p.status,'QUARANTINED');assert(p.issues.some(i=>i.code==='HASH_MISMATCH'));
 q.workOrders[0].sourceRefs.pop();
 // Review belonging to another candidate is orphaned, even when readable.
 write('review.json',{candidateId:'LCWO-002'});q.workOrders[0].producerReviewPath='review.json';reset();p=projectLearning({root:temp});
 assert.equal(p.status,'QUARANTINED');assert(p.issues.some(i=>i.code==='ORPHAN_CANDIDATE_RECORD'));
 delete q.workOrders[0].producerReviewPath;
 // Invalid queue status is not repaired or silently interpreted by the view.
 q.workOrders[0].status='QUEUED_WITH_TRIGGER';reset();p=projectLearning({root:temp});
 assert.equal(p.status,'QUARANTINED');assert(p.issues.some(i=>i.code==='CANONICAL_CHECK_FAILED'));
 q.workOrders[0].status='BUILT_LOCALLY';
 // Supersession excludes old record from current impact/context; cycles fail.
 q.workOrders[1].successorOf='LCWO-001';reset();p=projectLearning({root:temp});
 assert.equal(p.orders.find(o=>o.id==='LCWO-001').current,false);
 q.workOrders[0].successorOf='LCWO-002';reset();p=projectLearning({root:temp});
 assert.equal(p.status,'QUARANTINED');assert(p.issues.some(i=>i.code==='SUCCESSOR_CYCLE'));
 delete q.workOrders[0].successorOf;delete q.workOrders[1].successorOf;
 write('cycle-a.json',{path:'cycle-b.json'});write('cycle-b.json',{path:'cycle-a.json'});q.workOrders[0].sourceRefs.push('cycle-a.json');reset();p=projectLearning({root:temp});
 assert(p.issues.some(i=>i.code==='REFERENCE_CYCLE'));q.workOrders[0].sourceRefs.pop();
 // A proposed receipt cannot become public execution, even with a fresh queue SHA.
 reset();const state=JSON.parse(fs.readFileSync(path.join(temp,base,'executor-state.json')));state.status='ENABLED';write(`${base}/executor-state.json`,state);
 p=projectLearning({root:temp});assert.equal(p.status,'QUARANTINED');assert.equal(p.checks.executor.mode,'INVALID');
 assert(p.orders.every(o=>o.automaticExecution===false));
 // Root escapes and directories are not valid file evidence.
 reset();q.workOrders[0].sourceRefs.push('../outside.md',base);reset();p=projectLearning({root:temp});
 assert(p.issues.some(i=>i.code==='UNSAFE_PATH'));assert(p.issues.some(i=>i.code==='FILE_UNAVAILABLE'&&i.path===base));
 const bad=spawnSync(process.execPath,['scripts/project-learning-dependencies.mjs','--format','typo'],{cwd:root,encoding:'utf8'});assert.equal(bad.status,2);
 console.log('LEARNING DEPENDENCY PROJECTION TEST PASS: current 17-order parity; five real held orders; missing source, drift, orphan, contradiction, cycle, supersession, false execution, unsafe path, directory and CLI rejection.');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
