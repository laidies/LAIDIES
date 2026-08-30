#!/usr/bin/env node
// Read-only network verification and private evidence capture. Never deploys.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const dir='operations/product-stewards/newsstand/evidence/service-revision-2026-08-30/predecessor';
const base='/tmp/laidies-resident-portraits-successor.sUUusY';
const deploymentId='cdac28a7-05aa-45e7-9574-0be93534f48d';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const manifestBytes=fs.readFileSync(base+'.manifest.json');
const manifest=JSON.parse(manifestBytes);
const identity=sha(manifest.files.map(f=>`${f.sha256}  ${f.path}\n`).join(''));
if(identity!=='cdf13233f16fdc3512fc6273dd861ba8a6c4655d898154733fb509fb1470edb6'||identity!==manifest.identitySha256)throw Error('Base manifest identity mismatch');
for(const f of manifest.files)if(sha(fs.readFileSync(path.join(base,f.path)))!==f.sha256)throw Error('Base bytes changed: '+f.path);
const sourcePath='content/newsstand-stories.js', sourceSha256=manifest.files.find(f=>f.path===sourcePath).sha256;
if(sha(fs.readFileSync(path.join(root,sourcePath)))!==sourceSha256)throw Error('Worktree canonical story differs from current base');
const origins=[];
for(const origin of ['https://laidies.ai','https://cdac28a7.laidies-sunnyvaile.pages.dev']){
 const url=origin+'/'+sourcePath;
 const res=await fetch(url,{headers:{'Cache-Control':'no-cache'}});
 const bytes=Buffer.from(await res.arrayBuffer());
 const actual=sha(bytes);
 if(!res.ok||actual!==sourceSha256)throw Error(`Live source mismatch ${url} ${res.status} ${actual}`);
 origins.push({origin,url,status:res.status,sha256:actual,matched:true});
}
const save=(name,bytes)=>{const p=path.join(root,dir,name);fs.mkdirSync(path.dirname(p),{recursive:true});if(fs.existsSync(p))throw Error('Preserved evidence already exists: '+p);fs.writeFileSync(p,bytes);return {path:path.relative(root,p),sha256:sha(bytes)};};
const manifestBinding=save('published-base.manifest.json',manifestBytes);
const report={schemaVersion:'newsstand-published-base-verification-v1',deploymentId,artifactIdentitySha256:identity,sourcePath,sourceSha256,checkedAt:new Date().toISOString(),origins,limitation:'Public post-publication base, not recovery of the unavailable original pre-projection input.'};
const verification=save('published-base-verification.json',JSON.stringify(report,null,2)+'\n');
save('post-publication-newsstand-stories.js',fs.readFileSync(path.join(root,sourcePath)));
save('daily-issues.json',fs.readFileSync(path.join(root,'content/newsstand-daily-issues.json')));
save('private-envelope.json',fs.readFileSync(path.join(root,'operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-30.json')));
save('admission.json',fs.readFileSync(path.join(root,'operations/product-stewards/newsstand/evidence/daily-issue-admission-2026-08-30.json')));
console.log(JSON.stringify({deploymentId,manifest:manifestBinding,verification},null,2));
