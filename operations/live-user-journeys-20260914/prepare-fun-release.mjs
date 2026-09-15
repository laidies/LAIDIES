import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd();
const account='8597916c7f6ae726febf653c337a47d6', project='laidies-sunnyvaile';
const expectedBase='e431d7fa-06f0-4438-b8f1-40036b539d28';
const expectedFunBase='a06c31a5dc9a4181a3dec50d709f261f90a5edc4721c06850eaf6e0fd2cfc973';
const target='fun-connect.html';
const archive='/private/tmp/laidies-connected-journeys-20260914-weKm6M';
const priorPath='/private/tmp/laidies-radio-navigation-20260914-7U48TB/candidate-manifest.json';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const identity=m=>{m.files.sort((a,b)=>a.path.localeCompare(b.path,'en'));m.fileCount=m.files.length;m.totalBytes=m.files.reduce((n,r)=>n+r.bytes,0);m.identitySha256=sha(m.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));};
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const api=`https://api.cloudflare.com/client/v4/accounts/${account}/pages/projects/${project}`;
async function get(s=''){const r=await fetch(api+s,{headers:{Authorization:`Bearer ${token}`}});const j=await r.json();assert(j.success,'Provider request failed');return j.result;}
const provider=await get(), head=provider.canonical_deployment;if(process.argv[2]==='head'){console.log(head.id);process.exit();}
const files=(await get(`/deployments/${head.id}/files`)).files;
if(process.argv[2]==='verify'){
 const dir=process.argv[3], manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'))), candidate=JSON.parse(fs.readFileSync(path.join(dir,'candidate-manifest.json'))), baseline=JSON.parse(fs.readFileSync(path.join(dir,'base.json')));
 const changed=Object.keys(files).filter(p=>files[p]!==baseline[p]),removed=Object.keys(baseline).filter(p=>!files[p]);assert.equal(removed.length,0);assert.deepEqual(changed,['/'+target]);
 assert.equal(sha(JSON.stringify(provider.deployment_configs.production)),manifest.productionConfigSha256,'Production configuration changed');assert.equal(Object.keys(files).length-changed.length,810);
 const checks=[];for(const origin of [head.url,'https://laidies.ai']){const r=await fetch(origin+'/fun-connect?v=fun-route-20260915');assert(r.ok);let bytes=Buffer.from(await r.arrayBuffer());if(origin==='https://laidies.ai')bytes=Buffer.from(bytes.toString().replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^]*?<\/script>\n/g,''));assert.equal(sha(bytes),candidate.files.find(x=>x.path===target).sha256,`public bytes differ ${origin}`);checks.push({origin,path:target,sha256:sha(bytes)});}
 fs.writeFileSync(path.join(dir,'verification.json'),JSON.stringify({deployment:head.id,url:head.url,providerChanged:changed,removed,preservedStaticFiles:810,controlsUnchanged:manifest.controls,checks,customDomainAnalyticsNormalization:true,verifiedAt:new Date().toISOString()},null,2));console.log(JSON.stringify({deployment:head.id,changed:1,preservedStaticFiles:810,checks:checks.length}));process.exit();
}
assert.equal(head.id,expectedBase,'Production advanced; reconcile before release');
const prior=JSON.parse(fs.readFileSync(priorPath));assert.equal(prior.baseDeploymentId,'2c4746f7-b544-405b-aa5d-41555cb6cd16','Unexpected prior full manifest');
const base=structuredClone(prior);base.baseDeploymentId=head.id;base.artifactDirectory=head.url;
const live=await fetch(head.url+'/fun-connect');assert(live.ok,'Immutable fun-connect unavailable');const liveBytes=Buffer.from(await live.arrayBuffer());assert.equal(sha(liveBytes),expectedFunBase,'Immutable fun-connect baseline drift');
const baseRow=base.files.find(r=>r.path===target);assert(baseRow,'Prior full manifest lacks fun-connect.html');baseRow.sha256=sha(liveBytes);baseRow.bytes=liveBytes.length;identity(base);
const source=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();const committed=Buffer.from(cp.execFileSync('git',['show',`${source}:${target}`]));const staged=fs.readFileSync(path.join(root,target));assert.equal(sha(staged),sha(committed),'Staged file must equal committed source');
const redirects=fs.readFileSync('/private/tmp/laidies-radio-navigation-20260914-7U48TB/stage/_redirects'),worker=fs.readFileSync(path.join(archive,'stage/_worker.js'));assert.equal(sha(worker),'397e39d596d63a54a4cb82f42c569899d28a0f6ad540a743d2575b0b0a26b4b9','Archived Worker identity changed');assert.equal(sha(redirects),base.files.find(x=>x.path==='_redirects').sha256,'Redirects changed');
const dir=fs.mkdtempSync('/private/tmp/laidies-fun-route-20260915-'),stage=path.join(dir,'stage');fs.mkdirSync(stage);fs.writeFileSync(path.join(stage,target),staged);fs.writeFileSync(path.join(stage,'_worker.js'),worker);fs.writeFileSync(path.join(stage,'_redirects'),redirects);
const candidate=structuredClone(base);candidate.artifactDirectory=stage;candidate.createdAt=new Date().toISOString();Object.assign(candidate.files.find(x=>x.path===target),{path:target,bytes:staged.length,sha256:sha(staged)});identity(candidate);
const preserve={...files};delete preserve['/'+target];const controls={worker:sha(worker),redirects:sha(redirects)};const scope={schema:'laidies.production-scope.v2',project,productionBranch:'homepage-redesign',baseCommit:'f62895389c9cb77cdaa5feb20bc1131fc4d2042b',baseArtifactIdentitySha256:base.identitySha256,candidateArtifactIdentitySha256:candidate.identitySha256,allowedChanges:[{path:target,operation:'MODIFY',baseSha256:expectedFunBase,candidateSha256:sha(staged)}],preservedPaths:base.files.filter(x=>x.path!==target).map(x=>({path:x.path,sha256:x.sha256})),verificationPaths:[target],removedPaths:[]};
const authority={schema:'laidies.production-release-authority.v2',sourceCommit:source,baseCommit:'f62895389c9cb77cdaa5feb20bc1131fc4d2042b',artifactIdentitySha256:candidate.identitySha256,authority:'ali-standing-authorization-2026-09-12',task:'Correct one verified Fun Connect card promise so it names its existing homepage activities receiver. Preserve every other provider artifact, Worker and redirects.',executedBy:'/root',newMonetaryCost:false,costBasis:'Existing authenticated Cloudflare Pages deployment; no purchase, service, AI call or plan change.',decision:'RELEASE_UNDER_STANDING_AUTHORITY',publicUrl:'https://laidies.ai/',recordedAt:new Date().toISOString(),confirmation:`RELEASE ${candidate.identitySha256} FOR PRODUCTION`,providerBase:head.id,releaseDirectory:dir};
for(const [name,value] of Object.entries({'base.json':files,'preserve.json':preserve,'base-manifest.json':base,'candidate-manifest.json':candidate,'scope.json':scope,'manifest.json':{base:head.id,source,stage,delta:[{path:target,bytes:staged.length,sha256:sha(staged)}],controls,productionConfigSha256:sha(JSON.stringify(provider.deployment_configs.production)),providerGuard:{expectedBase,expectedFunBase},preservedStaticFiles:810},'release-authority.json':authority}))fs.writeFileSync(path.join(dir,name),JSON.stringify(value,null,2));console.log(dir);
