import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import crypto from 'node:crypto';import assert from 'node:assert/strict';import {inspectProseQualityReview} from './check-prose-quality-admission.mjs';
const base=process.cwd(),root=fs.mkdtempSync(path.join(os.tmpdir(),'crossword-floor-')),hash=b=>crypto.createHash('sha256').update(b).digest('hex'),reg='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json',policyPath='operations/product-stewards/newsstand/crossword-review-floor-policy.json';
const write=(p,b)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),b)};
function copy(p){if(fs.existsSync(path.join(base,p))&&fs.statSync(path.join(base,p)).isFile())write(p,fs.readFileSync(path.join(base,p)))}
function walk(x){if(!x||typeof x!=='object')return;if(typeof x.path==='string')copy(x.path);for(const v of Object.values(x))walk(v)}
try{copy(reg);walk(JSON.parse(fs.readFileSync(path.join(base,reg))));copy(policyPath);const policy=JSON.parse(fs.readFileSync(path.join(base,policyPath)));walk(policy);
const prior=JSON.parse(fs.readFileSync(path.join(base,policy.predecessorReviews.PRODUCER_SELF_REVIEW.path)));walk(prior);
const r=structuredClone(prior);r.candidateId=policy.candidateId;r.surface=policy.surface;r.reviewedAt='2026-09-11T19:05:00Z';r.lineage.predecessorCandidateId=policy.predecessorCandidateId;r.ratchet.priorComparable={candidateId:policy.predecessorCandidateId,reviewIssues:0,reviewCycles:1};r.reviewFloorPolicy={path:policyPath,policyId:policy.policyId,sha256:hash(fs.readFileSync(path.join(root,policyPath)))};
const m=JSON.parse(fs.readFileSync(path.join(root,r.artifact.manifest.path)));m.candidateId=r.candidateId;m.surface=r.surface;write(r.artifact.manifest.path,JSON.stringify(m));r.artifact.manifest.sha256=hash(fs.readFileSync(path.join(root,r.artifact.manifest.path)));
// Synthetic source packet isolates floor behavior from stale historical source paths.
const source='synthetic-source.txt';write(source,r.factualReview.claimMap.flatMap(c=>c.sourceEvidence.map(e=>e.excerpt)).join('\n'));const sb={path:source,sha256:hash(fs.readFileSync(path.join(root,source)))};r.factualReview.sourceBindings=[sb];for(const c of r.factualReview.claimMap)c.sourceBinding=sb;
const inspect=x=>inspectProseQualityReview(x,{root}).errors.join('\n');assert.equal(inspect(r),'');
for(const [name,mutate,re] of [
['missing',x=>delete x.reviewFloorPolicy,/review issues did not decrease/],
['wrong candidate',x=>x.candidateId='unrelated',/outside authorized scope/],
['wrong predecessor',x=>x.lineage.predecessorCandidateId='other',/predecessor mismatch/],
['current defect',x=>x.outcomes.factualIntegrity.verdict='HOLD',/factualIntegrity did not pass/],
['nonzero issues',x=>x.ratchet.reviewIssues=1,/zero issues and one cycle/],
['extra cycle',x=>x.ratchet.reviewCycles=2,/zero issues and one cycle/],
['wrong class',x=>x.contentClass='EXPLANATION',/contentClass is not authorized/],
['premature',x=>x.reviewedAt='2026-09-10T00:00:00Z',/predates this approval/],
['binding tamper',x=>x.reviewFloorPolicy.sha256='0'.repeat(64),/SHA-256 mismatch/]]){const x=structuredClone(r);mutate(x);assert.match(inspect(x),re,name)}
const priorPath=policy.predecessorReviews.PRODUCER_SELF_REVIEW.path;write(priorPath,'{}');assert.match(inspect(r),/predecessorReview: SHA-256 mismatch/);
console.log('CROSSWORD FLOOR CALIBRATION PASS clean=1 rejected=10; synthetic only, no editorial approval');
}finally{fs.rmSync(root,{recursive:true,force:true})}
