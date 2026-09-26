import fs from 'node:fs';import crypto from 'node:crypto';
const out='operations/product-stewards/newsstand/evidence/recovery-1300-20260924/base';fs.mkdirSync(out,{recursive:true});const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
const get=async s=>{const r=await fetch(api+s,{headers:{Authorization:'Bearer '+token}});const j=await r.json();if(!j.success)throw Error(JSON.stringify(j.errors));return j.result;};
const project=await get(''),head=project.canonical_deployment,files=(await get('/deployments/'+head.id+'/files')).files;
const manifest=JSON.parse(fs.readFileSync('/private/tmp/laidies-newsstand-sep23-services-9voa6L/manifest.json'));
if(head.id!=='f87b8a35-8769-46e3-a487-dd3e2eaa0460')throw Error('base changed '+head.id);
const observations=[],refs={};
for(const [key,name] of [['stories','newsstand-stories.js'],['issues','newsstand-daily-issues.json'],['columns','daily-edition-columns.json']]){
 let b;for(const origin of [head.url,'https://laidies.ai']){const url=origin+'/content/'+name;const res=await fetch(url);const bytes=Buffer.from(await res.arrayBuffer());if(!res.ok||sha(bytes)!==manifest.files.find(f=>f.path==='content/'+name).sha256)throw Error('origin/manifest drift '+url);b=bytes;observations.push({url,status:res.status,sha256:sha(bytes)});}
 if(name!=='daily-edition-columns.json' && sha(b)!==sha(fs.readFileSync('content/'+name)))throw Error('local differs '+name);
 fs.writeFileSync(out+'/'+name,b);refs[key]={path:out+'/'+name,sha256:sha(b)};
}
fs.writeFileSync(out+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');fs.writeFileSync(out+'/provider.json',JSON.stringify({id:head.id,url:head.url,branch:project.production_branch,files},null,2)+'\n');
fs.writeFileSync(out+'/verification.json',JSON.stringify({schemaVersion:'newsstand-service-predecessor-verification-v1',deploymentId:head.id,providerHeadId:head.id,artifactIdentitySha256:manifest.identitySha256,checkedAt:new Date().toISOString(),observations},null,2)+'\n');
for(const [k,n]of[['manifest','manifest.json'],['verification','verification.json']])refs[k]={path:out+'/'+n,sha256:sha(fs.readFileSync(out+'/'+n))};
const previous=JSON.parse(fs.readFileSync(out+'/newsstand-daily-issues.json')).issues.at(-1);
fs.writeFileSync(out+'/service-predecessor.json',JSON.stringify({schemaVersion:'newsstand-service-predecessor-v1',deploymentId:head.id,predecessorEnvelopeSha256:previous.envelopeSha256,...refs},null,2)+'\n');console.log({head:head.id,previous:previous.editionDate,observations:observations.length});
