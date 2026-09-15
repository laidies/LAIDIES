import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import cp from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd();
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
async function get(s=''){const r=await fetch(api+s,{headers:{Authorization:'Bearer '+token}});const j=await r.json();assert(j.success,'Provider request failed');return j.result;}
const provider=await get(),head=provider.canonical_deployment;
if(process.argv[2]==='head'){console.log(head.id);process.exit();}
const files=(await get('/deployments/'+head.id+'/files')).files;
const cacheRoot='operations/live-user-journeys-20260914/radio-navigation/diagnosis-02/cache-refresh';
const cacheManifest=JSON.parse(fs.readFileSync(root+'/'+cacheRoot+'/manifest.json'));
const owned=['content/site/ksvl-player.js',...cacheManifest.rows.filter(r=>!r.unmatched).map(r=>r.path)];
const sourcePath=p=>p==='content/site/ksvl-player.js'?p:cacheRoot+'/overlay/'+p;
const baselinePath=p=>p==='content/site/ksvl-player.js'?'operations/live-user-journeys-20260914/radio-navigation/diagnosis-02/baseline.js':'operations/live-user-journeys-20260914/radio-navigation/cache-refresh/overlay/'+p;
const controlArchive='/private/tmp/laidies-fun-route-20260915-mkDbDz';
if(process.argv[2]==='verify'){
 const dir=process.argv[3],m=JSON.parse(fs.readFileSync(dir+'/manifest.json')),base=JSON.parse(fs.readFileSync(dir+'/base.json'));
 const changed=Object.keys(files).filter(p=>files[p]!==base[p]),removed=Object.keys(base).filter(p=>!files[p]);
 assert.equal(removed.length,0);assert.deepEqual(changed.sort(),m.delta.map(d=>'/'+d.path).sort());
 assert.equal(sha(JSON.stringify(provider.deployment_configs.production)),m.productionConfigSha256,'Production configuration changed');
 const checks=[];
 for(const origin of [head.url,'https://laidies.ai'])for(const d of m.delta){
  const url=d.path.endsWith('.html')?'/'+d.path.slice(0,-5):'/'+d.path;
  const actualPath=d.path==='index.html'?'/':url;
  const r=await fetch(origin+actualPath+'?v=journeys-20260914');assert(r.ok,actualPath);
  let b=Buffer.from(await r.arrayBuffer());
  // Custom-domain analytics is a transport transformation; exact source is checked at the immutable origin.
  if(origin==='https://laidies.ai'&&d.path.endsWith('.html')) b=Buffer.from(b.toString().replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com\/beacon\.min\.js[^]*?<\/script>\n/g,''));
  // Observed custom-domain email protection rewrites the empty postcard mailto link and injects its decoder.
  if(origin==='https://laidies.ai'&&d.path==='postcard.html') b=Buffer.from(b.toString().replace(/id="pcEmail" href="\/cdn-cgi\/l\/email-protection#[a-f0-9]+"/g,'id="pcEmail" href="mailto:"').replace('<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>',''));
  assert.equal(sha(b),d.sha256,'public bytes differ '+origin+actualPath);checks.push({origin,path:d.path,sha256:sha(b)});
 }
 const result={deployment:head.id,url:head.url,providerChanged:changed,removed,preserved:Object.keys(files).length-changed.length,checks,customDomainAnalyticsNormalization:true,workerEvidence:'carried validated archive; not freshly downloaded from provider',controls:m.controls,verifiedAt:new Date().toISOString()};
 fs.writeFileSync(dir+'/verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify({deployment:head.id,changed:changed.length,preserved:result.preserved,checks:checks.length}));process.exit();
}
assert.equal(head.id,'eef9ed0c-8ad6-410c-9c41-5ce0ea3d2c78','Production advanced; reconcile before release');
assert.equal(sha(fs.readFileSync('content/site/ksvl-player.js')),sha(fs.readFileSync('operations/live-user-journeys-20260914/radio-navigation/diagnosis-02/candidate.js')),'Public source must equal reviewed follower candidate before assembly');
const dir=fs.mkdtempSync('/private/tmp/laidies-radio-followers-20260915-');const stage=dir+'/stage';fs.mkdirSync(stage);
const prior=JSON.parse(fs.readFileSync(controlArchive+'/candidate-manifest.json'));
const base=structuredClone(prior);base.artifactDirectory=head.url;base.baseDeploymentId=head.id;
const corrections=[];
for(const p of owned){
 const url=p==='index.html'?'/':p.endsWith('.html')?'/'+p.slice(0,-5):'/'+p;
 const r=await fetch(head.url+url);assert(r.ok,p);const b=Buffer.from(await r.arrayBuffer());
 assert.equal(sha(b),sha(fs.readFileSync(root+'/'+baselinePath(p))),p+' predecessor drift');
 const row=base.files.find(f=>f.path===p);assert(row,'Missing base manifest path '+p);
 if(row.sha256!==sha(b))corrections.push({path:p,previous:row.sha256,verifiedImmutable:sha(b),reason:'retrieved clean route to avoid redirect response or stale carried byte record'});
 row.sha256=sha(b);row.bytes=b.length;
}
function identity(m){m.files.sort((a,b)=>a.path.localeCompare(b.path,'en'));m.fileCount=m.files.length;m.totalBytes=m.files.reduce((n,r)=>n+r.bytes,0);m.identitySha256=sha(m.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''));}
identity(base);const candidate=structuredClone(base);candidate.artifactDirectory=stage;candidate.createdAt=new Date().toISOString();
const preserve={...files},delta=[];
for(const p of owned){const b=fs.readFileSync(root+'/'+sourcePath(p));fs.mkdirSync(path.dirname(stage+'/'+p),{recursive:true});fs.writeFileSync(stage+'/'+p,b);delete preserve['/'+p];const record={path:p,bytes:b.length,sha256:sha(b)};delta.push(record);Object.assign(candidate.files.find(r=>r.path===p),record);}
const worker=fs.readFileSync(controlArchive+'/stage/_worker.js');assert.equal(sha(worker),'397e39d596d63a54a4cb82f42c569899d28a0f6ad540a743d2575b0b0a26b4b9');fs.writeFileSync(stage+'/_worker.js',worker);
const redirects=fs.readFileSync(controlArchive+'/stage/_redirects');fs.writeFileSync(stage+'/_redirects',redirects);Object.assign(candidate.files.find(r=>r.path==='_redirects'),{bytes:redirects.length,sha256:sha(redirects)});
identity(candidate);
const source=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const baseCommit='ed802652a984ab483120759dbb3e8315d354b489';
const changed=[...owned];
assert.equal(sha(redirects),base.files.find(r=>r.path==='_redirects').sha256,'Unrelated redirects changed');
for(const p of owned)assert.equal(sha(cp.execFileSync('git',['show',source+':'+sourcePath(p)])),sha(fs.readFileSync(stage+'/'+p)),'Stage must equal committed source');
const scope={schema:'laidies.production-scope.v2',project:'laidies-sunnyvaile',productionBranch:'homepage-redesign',baseCommit,baseArtifactIdentitySha256:base.identitySha256,candidateArtifactIdentitySha256:candidate.identitySha256,allowedChanges:changed.map(p=>({path:p,operation:'MODIFY',baseSha256:base.files.find(r=>r.path===p).sha256,candidateSha256:candidate.files.find(r=>r.path===p).sha256})),preservedPaths:base.files.filter(r=>!changed.includes(r.path)).map(r=>({path:r.path,sha256:r.sha256})),verificationPaths:owned,removedPaths:[]};
for(const [name,value] of Object.entries({'base.json':files,'preserve.json':preserve,'base-manifest.json':base,'candidate-manifest.json':candidate,'scope.json':scope,'manifest.json':{base:head.id,source,stage,delta,productionConfigSha256:sha(JSON.stringify(provider.deployment_configs.production)),controls:{worker:sha(worker),redirects:sha(redirects)},baseRecordCorrections:corrections}}))fs.writeFileSync(dir+'/'+name,JSON.stringify(value,null,2));
const authority={schema:'laidies.production-release-authority.v2',sourceCommit:source,baseCommit,artifactIdentitySha256:candidate.identitySha256,authority:'ali-standing-authorization-2026-09-12',task:'Prevent passive radio followers from claiming playback ownership during navigation. Preserve saved Resume position, deliberate pause and active players in other windows; preserve every unrelated asset including the live Activities correction. Community integration remains excluded.',executedBy:'/root',newMonetaryCost:false,costBasis:'Existing authenticated Cloudflare Pages static deployment; no purchase, new service, AI call or plan change.',decision:'RELEASE_UNDER_STANDING_AUTHORITY',publicUrl:'https://laidies.ai/',recordedAt:new Date().toISOString(),confirmation:'RELEASE '+candidate.identitySha256+' FOR PRODUCTION',providerBase:head.id,releaseDirectory:dir};
fs.writeFileSync(dir+'/release-authority.json',JSON.stringify(authority,null,2));console.log(dir);
