import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd(), packet='operations/live-user-journeys-20260914/community-integration';
const archive='/private/tmp/laidies-public-note-20260915-IeKIMa';
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
async function get(s=''){const j=await(await fetch(api+s,{headers:{Authorization:'Bearer '+token}})).json();assert(j.success,'Provider request failed');return j.result;}
const project=await get(),head=project.canonical_deployment;
assert.equal(head.id,'f3eb0db3-2020-4174-82c7-2bf0f535dea4','Production advanced; reconcile first');
const files=(await get('/deployments/'+head.id+'/files')).files;
const reconciliation=JSON.parse(fs.readFileSync(packet+'/frontend-reconciliation.json'));
const owned=Object.keys(reconciliation.integratedSha256);
assert.equal(owned.length,16);
const rebasePath=packet+'/public-note-rebase/rebase-evidence.json';
const rebase=JSON.parse(fs.readFileSync(rebasePath));
const base=JSON.parse(fs.readFileSync(archive+'/candidate-manifest.json'));
base.artifactDirectory=head.url;base.baseDeploymentId=head.id;
const fullIdentity=sha(base.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));
assert.equal(rebase.result,'PASS');assert.equal(rebase.baseline.deployment,head.id);assert.equal(rebase.baseline.archive,archive);assert.equal(base.identitySha256,fullIdentity,'Archive full manifest identity mismatch');assert.deepEqual(rebase.baseline.fullManifest,{identitySha256:base.identitySha256,fileCount:base.fileCount,totalBytes:base.totalBytes});assert.equal(rebase.baseline.deploymentIdentitySha256,base.identitySha256);assert.deepEqual(rebase.baseline.funDelta,{path:'fun-connect.html',bytes:17903,sha256:'9fdc68dcd27fda374ca4878f8ad211e704d61f3290f0d67117e1ee0f7c3dd402'});assert.deepEqual(base.files.find(r=>r.path==='fun-connect.html'),{path:'fun-connect.html',bytes:17903,sha256:'9fdc68dcd27fda374ca4878f8ad211e704d61f3290f0d67117e1ee0f7c3dd402'});
const dir=fs.mkdtempSync('/private/tmp/laidies-community-preview-20260915-'),stage=dir+'/stage';fs.mkdirSync(stage);
const candidate=structuredClone(base),preserve={...files},delta=[];
const source=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
for(const p of owned){
 const existing=base.files.find(r=>r.path===p);
 const url=p.endsWith('.html')?'/'+p.slice(0,-5):'/'+p;
 const response=await fetch(head.url+url);
 if(existing){assert.equal(rebase.baseline.paths.find(r=>r.path===p)?.sha256,existing.sha256,'Rebase evidence mismatch '+p);assert(response.ok,p);const b=Buffer.from(await response.arrayBuffer());assert.equal(sha(b),existing.sha256,p+' immutable baseline mismatch');}
 else assert.equal(response.status,404,p+' must be additive');
 const b=fs.readFileSync(p);assert.equal(sha(cp.execFileSync('git',['show',source+':'+p])),sha(b),'Commit required: '+p);
 fs.mkdirSync(path.dirname(stage+'/'+p),{recursive:true});fs.writeFileSync(stage+'/'+p,b);delete preserve['/'+p];
 const row={path:p,bytes:b.length,sha256:sha(b)};delta.push({...row,operation:existing?'MODIFY':'ADD'});
 if(existing)Object.assign(candidate.files.find(r=>r.path===p),row);else candidate.files.push(row);
}
const workerPath=packet+'/backend/bundled-worker.js';
const worker=fs.readFileSync(workerPath);assert.equal(sha(worker),'ac0588d23def411c62e2936121b85a8702f01ba0d3c6f4893a3b0f281b34e230','Reviewed bundle identity mismatch');assert.equal(sha(cp.execFileSync('git',['show',source+':'+workerPath])),sha(worker),'Worker must be committed');
assert.equal(sha(fs.readFileSync(packet+'/backend/provider-worker.mjs')),'397e39d596d63a54a4cb82f42c569899d28a0f6ad540a743d2575b0b0a26b4b9');
fs.writeFileSync(stage+'/_worker.js',worker);Object.assign(candidate.files.find(r=>r.path==='_worker.js'),{sha256:sha(worker),bytes:worker.length});
const redirects=fs.readFileSync(archive+'/stage/_redirects');assert.equal(sha(redirects),'10a2d4b97f08f725289df0e10c093e239378a8ffb1b11fd4e46cb12550d4d43b');fs.writeFileSync(stage+'/_redirects',redirects);
candidate.files.sort((a,b)=>a.path.localeCompare(b.path,'en'));candidate.fileCount=candidate.files.length;candidate.totalBytes=candidate.files.reduce((n,r)=>n+r.bytes,0);candidate.identitySha256=sha(candidate.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));candidate.artifactDirectory=stage;candidate.createdAt=new Date().toISOString();
const manifest={base:head.id,source,stage,delta,worker:sha(worker),redirects:sha(redirects),previewOnly:true,allowedPreviewHost:'community-resident-signin.laidies-sunnyvaile.pages.dev',productionConfigSha256:sha(JSON.stringify(project.deployment_configs.production)),previewConfigSha256:sha(JSON.stringify(project.deployment_configs.preview)),rebaseEvidenceSha256:sha(fs.readFileSync(rebasePath)),fullBaselineIdentitySha256:base.identitySha256,funDelta:rebase.baseline.funDelta};
for(const [name,value] of Object.entries({'base.json':files,'preserve.json':preserve,'base-manifest.json':base,'candidate-manifest.json':candidate,'manifest.json':manifest}))fs.writeFileSync(dir+'/'+name,JSON.stringify(value,null,2));
console.log(dir);
