import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const root=process.cwd(), q=JSON.parse(fs.readFileSync('operations/control-room/owner-review-queue.json'));
const actual=q.review_now.find(x=>x.id==='try-on-episode04-social-20260905');
assert(actual,'real reviewed candidate required for calibration');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'social-admission-'));
try {
 const run=(item)=>{const qp=path.join(temp,'queue.json');fs.writeFileSync(qp,JSON.stringify({review_now:[item]}));return spawnSync(process.execPath,['scripts/check-design-review-admission.mjs','--fixture'],{cwd:root,encoding:'utf8',env:{...process.env,LAIDIES_QUEUE_PATH:qp}});};
 let r=run(actual);assert.equal(r.status,0,r.stdout+r.stderr);
 const cases=[
  ['missing review',x=>x.design_admission.reviewers.pop()],
  ['same reviewer twice',x=>x.design_admission.reviewers[1]=x.design_admission.reviewers[0]],
  ['stale candidate',x=>x.design_admission.candidate.sha256='0'.repeat(64)],
  ['wrong feature',x=>x.id='another-building'],
  ['unapproved authorization',x=>x.design_admission.authorization.sha256='1'.repeat(64)],
  ['missing export',x=>x.review_artifacts=x.review_artifacts.filter(b=>!(/social-story(?:-3)?\.png$/.test(b.path)))],
  ['no source review',x=>delete x.design_admission.source_review],
  ['no privacy checks',x=>delete x.design_admission.browser_results],
  ['no calibration',x=>delete x.design_admission.calibration],
  ['unverified preview',x=>x.design_admission.preview={url:'https://laidies.ai/try-on?issue=4',proof:{}}],
  ['known rejected artifact',x=>{x.design_admission.candidate={path:'operations/product-stewards/blend-snap/candidates/tryon-ep04-2026-09-05/rendered-source.html',sha256:'58cb5a7b675219071d65f4ef1e772d5685b04f86dd53a5d1a356e0561120b1f1'};}]
 ];
 for(const [name,change]of cases){const item=structuredClone(actual);change(item);r=run(item);assert.equal(r.status,1,`${name} did not fail: ${r.stdout}${r.stderr}`);assert.match(r.stderr+r.stdout,/FAIL|BLOCKED|ERROR|missing|limited|stale/i);}
 console.log(`Episode04 admission: real reviewed candidate accepted; ${cases.length} incomplete/stale/wrong-scope/rejected mutations blocked.`);
}finally{fs.rmSync(temp,{recursive:true,force:true});}
