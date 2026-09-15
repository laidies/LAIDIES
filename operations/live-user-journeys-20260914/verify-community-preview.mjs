import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const dir=process.argv[2],immutable=process.argv[3];
assert(dir?.startsWith('/private/tmp/laidies-community-preview-'));
assert(/^https:\/\/[a-f0-9]+\.laidies-sunnyvaile\.pages\.dev$/.test(immutable));
const m=JSON.parse(fs.readFileSync(dir+'/manifest.json'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const checks=[];
for(const origin of [immutable,'https://'+m.allowedPreviewHost]){
 checks.push(...await Promise.all(m.delta.map(async p=>{
  const r=await fetch(origin+'/'+p.path.replace(/\.html$/,''));
  const b=Buffer.from(await r.arrayBuffer());
  return {origin,path:p.path,status:r.status,match:sha(b)===p.sha256};
 })));
}
const token=fs.readFileSync('/Users/alisoneakin/Library/Preferences/.wrangler/config/default.toml','utf8').match(/oauth_token\s*=\s*"([^"]+)"/)[1];
const api='https://api.cloudflare.com/client/v4/accounts/8597916c7f6ae726febf653c337a47d6/pages/projects/laidies-sunnyvaile';
async function get(s=''){const j=await(await fetch(api+s,{headers:{Authorization:'Bearer '+token}})).json();assert(j.success);return j.result;}
const p=await get(),deployments=await get('/deployments'),d=deployments.find(d=>d.url===immutable);assert(d,'Preview deployment must exist');
const files=(await get('/deployments/'+d.id+'/files')).files;
const preserve=JSON.parse(fs.readFileSync(dir+'/preserve.json'));
const preserved=Object.entries(preserve).every(([path,id])=>files[path]===id);
const result={recordedAt:new Date().toISOString(),deployment:d.id,source:m.source,checks,preservedStaticAssets:Object.keys(preserve).length,preservedStaticIdentities:preserved,productionUnchanged:p.canonical_deployment.id===m.base,productionConfigUnchanged:sha(JSON.stringify(p.deployment_configs.production))===m.productionConfigSha256,previewConfigUnchanged:sha(JSON.stringify(p.deployment_configs.preview))===m.previewConfigSha256};
fs.writeFileSync(dir+'/verification.json',JSON.stringify(result,null,2));
assert(checks.every(x=>x.status===200&&x.match)&&preserved&&result.productionUnchanged&&result.productionConfigUnchanged&&result.previewConfigUnchanged,'Preview verification failed');
console.log(JSON.stringify({deployment:d.id,checks:checks.length,preservedStaticAssets:result.preservedStaticAssets,pass:true}));
