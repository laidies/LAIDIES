import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import assert from 'node:assert/strict';
const packet='operations/live-user-journeys-20260914/community-integration';
const paths=[...Object.keys(JSON.parse(fs.readFileSync(packet+'/frontend-reconciliation.json')).integratedSha256),'content/site/identity-client-v1.js'];
const binding=JSON.parse(fs.readFileSync(packet+'/activation-rebase/d3-release-binding.json'));
const expected='d3c44d5a-2a8c-4923-9de2-f0a2dc9928b9';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function identity(m){m.files.sort((a,b)=>a.path.localeCompare(b.path,'en'));m.fileCount=m.files.length;m.totalBytes=m.files.reduce((n,r)=>n+r.bytes,0);m.identitySha256=sha(m.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));}
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
async function get(s=''){const r=await fetch(api+s,{headers:{Authorization:'Bearer '+token}}),j=await r.json();assert(j.success,'Provider request failed');return j.result;}
const provider=await get(),head=provider.canonical_deployment;
if(process.argv[2]==='head'){console.log(head.id);process.exit();}
const files=(await get('/deployments/'+head.id+'/files')).files;
if(process.argv[2]==='verify'){
 const dir=process.argv[3],m=JSON.parse(fs.readFileSync(dir+'/manifest.json')),base=JSON.parse(fs.readFileSync(dir+'/base.json'));
 const changed=Object.keys(files).filter(p=>files[p]!==base[p]).sort(),removed=Object.keys(base).filter(p=>!files[p]);
 const staticDelta=m.delta.filter(r=>r.path!=='_worker.js');
 assert.deepEqual(changed,staticDelta.map(r=>'/'+r.path).sort());assert.deepEqual(removed,[]);
 assert.equal(Object.keys(files).length-changed.length,m.preservedStaticFiles);
 assert.equal(sha(JSON.stringify(provider.deployment_configs.production)),m.productionConfigSha256,'Pages production configuration changed');
 const checks=[];
 for(const origin of [head.url,'https://laidies.ai'])for(const row of staticDelta){
  const url='/'+row.path.replace(/\.html$/,'')+'?v=community-activation-20260915';const r=await fetch(origin+url);assert(r.ok,row.path+' unavailable');
  let b=Buffer.from(await r.arrayBuffer());
  if(origin==='https://laidies.ai'&&row.path.endsWith('.html'))b=Buffer.from(b.toString().replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^]*?<\/script>\n/g,''));
  assert.equal(sha(b),row.sha256,'Public bytes differ '+origin+'/'+row.path);checks.push({origin,path:row.path,sha256:sha(b)});
 }
 const result={deployment:head.id,url:head.url,providerChanged:changed,removed,preservedStaticFiles:m.preservedStaticFiles,pagesProductionConfigUnchanged:true,checks,controls:m.controls,workerVerification:'Exact reviewed bundled Worker supplied to the deployment; actual authenticated and rejected routes require browser verification.',verifiedAt:new Date().toISOString()};
 fs.writeFileSync(dir+'/verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify({deployment:head.id,changes:changed.length,checks:checks.length,preserved:m.preservedStaticFiles}));process.exit();
}
assert.equal(head.id,expected,'Production advanced; reconcile first');
const base=JSON.parse(fs.readFileSync(packet+'/activation-rebase/d3-base-manifest.json'));identity(base);assert.equal(base.identitySha256,binding.artifactIdentitySha256);
base.baseDeploymentId=head.id;base.artifactDirectory=head.url;
const admission=JSON.parse(fs.readFileSync(packet+'/profile-verification-repair/independent-review.json'));
assert.equal(admission.verdict,'PASS');assert.equal(sha(fs.readFileSync('content/site/identity-client-v1.js')),admission.candidateSha256);
const source=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const dir=fs.mkdtempSync('/private/tmp/laidies-community-production-20260915-'),stage=dir+'/stage',candidate=structuredClone(base),preserve={...files},delta=[];fs.mkdirSync(stage);
for(const p of paths){
 const old=base.files.find(r=>r.path===p),r=await fetch(head.url+'/'+p.replace(/\.html$/,''));
 if(old){assert(r.ok,p);assert.equal(sha(Buffer.from(await r.arrayBuffer())),old.sha256,'Immutable baseline differs '+p);}else assert.equal(r.status,404,p+' must be additive');
 const b=fs.readFileSync(p);assert.equal(sha(cp.execFileSync('git',['show',source+':'+p])),sha(b),'Commit required '+p);
 fs.mkdirSync(path.dirname(stage+'/'+p),{recursive:true});fs.writeFileSync(stage+'/'+p,b);delete preserve['/'+p];
 const row={path:p,bytes:b.length,sha256:sha(b)};delta.push({...row,operation:old?'MODIFY':'ADD',baseSha256:old?.sha256||null,candidateSha256:row.sha256});
 const dest=candidate.files.find(r=>r.path===p);if(dest)Object.assign(dest,row);else candidate.files.push(row);
}
const workerPath=packet+'/backend/bundled-worker.js',worker=fs.readFileSync(workerPath);
assert.equal(sha(worker),'ac0588d23def411c62e2936121b85a8702f01ba0d3c6f4893a3b0f281b34e230');assert.equal(sha(cp.execFileSync('git',['show',source+':'+workerPath])),sha(worker));
const oldWorker=base.files.find(r=>r.path==='_worker.js');assert.equal(oldWorker.sha256,'397e39d596d63a54a4cb82f42c569899d28a0f6ad540a743d2575b0b0a26b4b9');
fs.writeFileSync(stage+'/_worker.js',worker);Object.assign(candidate.files.find(r=>r.path==='_worker.js'),{bytes:worker.length,sha256:sha(worker)});
delta.push({path:'_worker.js',operation:'MODIFY',bytes:worker.length,sha256:sha(worker),baseSha256:oldWorker.sha256,candidateSha256:sha(worker)});
const redirects=fs.readFileSync('/private/tmp/laidies-public-note-20260915-IeKIMa/stage/_redirects');assert.equal(sha(redirects),base.files.find(r=>r.path==='_redirects').sha256);fs.writeFileSync(stage+'/_redirects',redirects);
candidate.artifactDirectory=stage;candidate.createdAt=new Date().toISOString();identity(candidate);
const preservedStaticFiles=Object.keys(preserve).length;assert.equal(preservedStaticFiles,800);
const controls={worker:sha(worker),baseWorker:oldWorker.sha256,redirects:sha(redirects)};
const scope={schema:'laidies.production-scope.v2',project:'laidies-sunnyvaile',productionBranch:'homepage-redesign',baseCommit:binding.sourceCommit,baseArtifactIdentitySha256:base.identitySha256,candidateArtifactIdentitySha256:candidate.identitySha256,allowedChanges:delta,preservedPaths:base.files.filter(r=>!delta.some(d=>d.path===r.path)).map(r=>({path:r.path,sha256:r.sha256})),verificationPaths:paths,removedPaths:[]};
const authority={schema:'laidies.production-release-authority.v2',sourceCommit:source,baseCommit:binding.sourceCommit,artifactIdentitySha256:candidate.identitySha256,authority:'ali-standing-authorization-2026-09-12',task:'Activate Resident sign-in for community rooms and repair false profile-save failure. Public test name expressly approved by Ali. Preserve all unrelated current production assets.',executedBy:'/root',newMonetaryCost:false,costBasis:'Existing Pages, Supabase and Hyvor plans and existing key; no purchase or permission expansion.',decision:'RELEASE_UNDER_STANDING_AUTHORITY',publicUrl:'https://laidies.ai/',recordedAt:new Date().toISOString(),confirmation:'RELEASE '+candidate.identitySha256+' FOR PRODUCTION',providerBase:head.id,releaseDirectory:dir};
const manifest={base:head.id,source,stage,delta,controls,preservedStaticFiles,productionConfigSha256:sha(JSON.stringify(provider.deployment_configs.production))};
for(const [n,v]of Object.entries({'base.json':files,'preserve.json':preserve,'base-manifest.json':base,'candidate-manifest.json':candidate,'scope.json':scope,'manifest.json':manifest,'release-authority.json':authority}))fs.writeFileSync(dir+'/'+n,JSON.stringify(v,null,2));console.log(dir);
