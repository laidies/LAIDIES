#!/usr/bin/env node
import fs from 'node:fs';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
export async function readProvider({accountId,token,fetcher=fetch}) {
  if (!/^[a-f0-9]{32}$/.test(accountId || '') || !token) throw Error('CLOUDFLARE_AUTH_MISSING');
  const base=`https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/laidies-sunnyvaile`;
  async function get(suffix) {
    const r=await fetcher(base+suffix,{headers:{Authorization:`Bearer ${token}`},redirect:'error',signal:AbortSignal.timeout(30000)});
    if(!r.ok) throw Error(`PROVIDER_HTTP_${r.status}`);
    const j=await r.json(); if(j.success!==true || !j.result) throw Error('PROVIDER_RESPONSE_INVALID'); return j.result;
  }
  const project=await get(''), head=project.canonical_deployment;
  if(project.production_branch!=='homepage-redesign' || !/^[a-f0-9-]{36}$/.test(head?.id||'')) throw Error('UNEXPECTED_PRODUCTION_IDENTITY');
  const origin=new URL(head.url); if(origin.protocol!=='https:' || !/^[a-f0-9]+\.laidies-sunnyvaile\.pages\.dev$/.test(origin.hostname)) throw Error('UNEXPECTED_IMMUTABLE_ORIGIN');
  const files=(await get(`/deployments/${head.id}/files`)).files;
  if(!files || typeof files!=='object' || Array.isArray(files) || !Object.keys(files).length) throw Error('EMPTY_PROVIDER_MANIFEST');
  for(const [p,h] of Object.entries(files)) if(!p.startsWith('/') || p.includes('..') || !/^[a-f0-9]{32}$/.test(h)) throw Error('INVALID_PROVIDER_ASSET');
  const after=await get(''); if(after.canonical_deployment?.id!==head.id || after.production_branch!==project.production_branch) throw Error('PROVIDER_HEAD_CHANGED');
  const normalized=Object.fromEntries(Object.entries(files).sort(([a],[b])=>a.localeCompare(b)));
  return {checkedAt:new Date().toISOString(),id:head.id,url:head.url,productionBranch:project.production_branch,files:normalized,providerFilesSha256:crypto.createHash('sha256').update(JSON.stringify(normalized)).digest('hex'),readOnly:true};
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href) {
  try {
    const r=await readProvider({accountId:process.env.CLOUDFLARE_ACCOUNT_ID,token:process.env.CLOUDFLARE_API_TOKEN});
    const i=process.argv.indexOf('--output'); if(i>=0) fs.writeFileSync(process.argv[i+1],JSON.stringify(r,null,2)+'\n',{flag:'wx',mode:0o600});
    console.log(JSON.stringify({id:r.id,url:r.url,productionBranch:r.productionBranch,fileCount:Object.keys(r.files).length,providerFilesSha256:r.providerFilesSha256,readOnly:true}));
  } catch(e) {console.error(String(e.message).replaceAll(process.env.CLOUDFLARE_API_TOKEN||'not-a-real-secret','[REDACTED]'));process.exitCode=2;}
}
