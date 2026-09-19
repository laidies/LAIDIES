import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import cp from 'node:child_process';import assert from 'node:assert/strict';
const root=process.cwd(),paths=['index.html','library.html','content/site/miss-jeeves-index.json','_worker.js'];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const identity=m=>{m.files.sort((a,b)=>a.path.localeCompare(b.path,'en'));m.fileCount=m.files.length;m.totalBytes=m.files.reduce((n,r)=>n+r.bytes,0);m.identitySha256=sha(m.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));};
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
async function get(s=''){const r=await fetch(api+s,{headers:{Authorization:`Bearer ${token}`}}),j=await r.json();assert(j.success,'Provider read failed');return j.result;}
const provider=await get(),head=provider.canonical_deployment;
if(process.argv[2]==='head'){console.log(JSON.stringify({id:head.id,url:head.url,source:head.deployment_trigger?.metadata?.commit_hash}));process.exit();}
const files=(await get(`/deployments/${head.id}/files`)).files;
if(process.argv[2]==='verify'){
 const dir=process.argv[3],meta=JSON.parse(fs.readFileSync(path.join(dir,'release.json'))),before=JSON.parse(fs.readFileSync(path.join(dir,'provider-base.json'))),candidate=JSON.parse(fs.readFileSync(path.join(dir,'candidate-manifest.json')));
 const changed=Object.keys(files).filter(p=>files[p]!==before[p]).sort(),removed=Object.keys(before).filter(p=>!files[p]).sort();
 assert.deepEqual(changed,paths.filter(p=>p!=='_worker.js').map(p=>'/'+p).sort());assert.deepEqual(removed,[]);assert.equal(sha(JSON.stringify(provider.deployment_configs.production)),meta.productionConfigSha256);
 const checks=[];for(const origin of [head.url,'https://laidies.ai'])for(const p of paths.filter(p=>p!=='_worker.js')){
  let b=cp.execFileSync('curl',['-fLsS',origin+'/'+p+'?release=jeeves-20260919'],{maxBuffer:12e6});
  if(origin==='https://laidies.ai'&&p.endsWith('.html'))b=Buffer.from(b.toString().replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^]*?<\/script>\n/g,''));
  assert.equal(sha(b),candidate.files.find(x=>x.path===p).sha256,'Public bytes differ '+origin+'/'+p);checks.push({origin,path:p,sha256:sha(b)});
 }
 const result={deployment:head.id,url:head.url,source:head.deployment_trigger?.metadata?.commit_hash,changed,removed,preservedStaticFiles:Object.keys(files).length-changed.length,productionConfigurationUnchanged:true,checks,verifiedAt:new Date().toISOString()};fs.writeFileSync(path.join(dir,'verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));process.exit();
}
const [expected,manifestPath]=process.argv.slice(2);assert(expected&&manifestPath,'Expected base and full manifest required');assert.equal(head.id,expected,'Production advanced; reconcile first');
const base=JSON.parse(fs.readFileSync(manifestPath));const priorIdentity=base.identitySha256;identity(base);assert.equal(base.identitySha256,priorIdentity,'Invalid prior manifest identity');
const controlsDir=base.artifactDirectory;for(const p of ['_worker.js','_redirects'])assert.equal(sha(fs.readFileSync(path.join(controlsDir,p))),base.files.find(x=>x.path===p).sha256,'Archived control mismatch');
for(const p of paths.filter(p=>p!=='_worker.js')){const b=cp.execFileSync('curl',['-fLsS',head.url+'/'+p],{maxBuffer:12e6});assert.equal(sha(b),base.files.find(x=>x.path===p).sha256,'Base bytes mismatch '+p);}
const source=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();const candidate=structuredClone(base),dir=fs.mkdtempSync('/private/tmp/laidies-jeeves-live-20260919-'),stage=path.join(dir,'stage');fs.mkdirSync(stage);
const delta=[];for(const p of paths){const b=fs.readFileSync(path.join(root,p)),committed=cp.execFileSync('git',['show',`${source}:${p}`],{maxBuffer:12e6});assert.equal(sha(b),sha(committed),'Uncommitted release source '+p);const old=base.files.find(x=>x.path===p);assert(old);const out=path.join(stage,p);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,b);Object.assign(candidate.files.find(x=>x.path===p),{sha256:sha(b),bytes:b.length});delta.push({path:p,operation:'MODIFY',baseSha256:old.sha256,candidateSha256:sha(b),bytes:b.length});}
fs.copyFileSync(path.join(controlsDir,'_redirects'),path.join(stage,'_redirects'));candidate.artifactDirectory=stage;candidate.baseDeploymentId=head.id;candidate.createdAt=new Date().toISOString();identity(candidate);
const preserve={...files};for(const p of paths)delete preserve['/'+p];
const baseCommit=head.deployment_trigger.metadata.commit_hash;
const scope={schema:'laidies.production-scope.v2',project:'laidies-sunnyvaile',productionBranch:'homepage-redesign',baseCommit,baseArtifactIdentitySha256:base.identitySha256,candidateArtifactIdentitySha256:candidate.identitySha256,allowedChanges:delta,preservedPaths:base.files.filter(x=>!paths.includes(x.path)).map(x=>({path:x.path,sha256:x.sha256})),verificationPaths:paths.filter(p=>p!=='_worker.js'),removedPaths:[]};
const authority={schema:'laidies.production-release-authority.v2',sourceCommit:source,baseCommit,artifactIdentitySha256:candidate.identitySha256,authority:'ali-standing-authorization-2026-09-12',task:'Repair Miss Jeeves initial lookup and stale book index; show current admitted source excerpts and exact sections. Preserve all other current site artifacts and community endpoints.',executedBy:'/root',newMonetaryCost:false,costBasis:'Existing Cloudflare Pages deployment. No purchase, new service, model call, plan change or credential. Initial lookup no longer invokes AI.',decision:'RELEASE_UNDER_STANDING_AUTHORITY',publicUrl:'https://laidies.ai/',recordedAt:new Date().toISOString(),confirmation:`RELEASE ${candidate.identitySha256} FOR PRODUCTION`,providerBase:head.id,releaseDirectory:dir};
const meta={base:head.id,source,stage,delta,productionConfigSha256:sha(JSON.stringify(provider.deployment_configs.production)),preservedStaticFiles:Object.keys(preserve).length};
for(const [name,value]of Object.entries({'provider-base.json':files,'preserve.json':preserve,'base-manifest.json':base,'candidate-manifest.json':candidate,'scope.json':scope,'release-authority.json':authority,'release.json':meta}))fs.writeFileSync(path.join(dir,name),JSON.stringify(value,null,2)+'\n');console.log(dir);
