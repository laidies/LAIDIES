#!/usr/bin/env node
// Private full-body capture between discovery and source/claim review.
// A successful download is deliberately not a factual or editorial admission.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
// The first real report page exceeded 2.5 MB because of its HTML payload.
// Retain the complete response rather than silently truncating source evidence.
export const MAX_SOURCE_BYTES=8_000_000;

function approvedUrl(value, hosts) {
  const u=new URL(value);
  if(u.protocol!=='https:' || u.username || u.password || u.port || !hosts.has(u.hostname) || u.hash) throw Error('SOURCE_URL_NOT_APPROVED');
  return u.href;
}

export async function captureSources({sources,approvedHosts,outputDirectory,fetcher=fetch}) {
  if(!Array.isArray(sources) || !sources.length || sources.length>40 || !Array.isArray(approvedHosts) || !approvedHosts.length) throw Error('INVALID_CAPTURE_PLAN');
  const hosts=new Set(approvedHosts);
  // Hosts come from the controlled registry/plan, never from model output or fetched content.
  if([...hosts].some(h=>typeof h!=='string' || !/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/.test(h) || h.endsWith('.local') || h==='localhost')) throw Error('INVALID_SOURCE_HOST');
  const ids=new Set(), urls=new Set();
  const plan=sources.map(s=>{
    if(!/^[a-zA-Z0-9_-]{1,100}$/.test(s.id || '') || ids.has(s.id)) throw Error('INVALID_SOURCE_ID');
    ids.add(s.id);
    const url=approvedUrl(s.url,hosts);
    if(urls.has(url)) throw Error('DUPLICATE_SOURCE_URL');
    urls.add(url); return {...s,url};
  });
  if(fs.existsSync(outputDirectory)) throw Error('CAPTURE_DIRECTORY_ALREADY_EXISTS');
  fs.mkdirSync(outputDirectory,{recursive:true,mode:0o700});
  const records=[];
  for(const s of plan) {
    const observedAt=new Date().toISOString();
    try {
      const response=await fetcher(s.url,{redirect:'manual',credentials:'omit',headers:{accept:'text/html, text/plain, application/json, text/markdown','user-agent':'LAiDIES-NewsStand-Research/1.0'},signal:AbortSignal.timeout(30000)});
      if(!response.ok) {await response.body?.cancel(); throw Error(`SOURCE_HTTP_${response.status}`);}
      if(response.url && response.url!==s.url) {await response.body?.cancel(); throw Error('UNEXPECTED_SOURCE_REDIRECT');}
      const type=response.headers.get('content-type') || '';
      if(!/^(text\/(html|plain|markdown)|application\/(json|ld\+json|xml))(?:;|$)/i.test(type)) {await response.body?.cancel(); throw Error('UNSUPPORTED_SOURCE_CONTENT_TYPE');}
      const reader=response.body?.getReader(); if(!reader) throw Error('EMPTY_SOURCE_BODY');
      let size=0; const chunks=[];
      try {
        while(true) {
          const {done,value}=await reader.read(); if(done) break;
          size+=value.byteLength;
          if(size>MAX_SOURCE_BYTES) throw Error('SOURCE_BODY_EXCEEDS_LIMIT');
          chunks.push(value);
        }
      } catch(e) {await reader.cancel(); throw e;} finally {reader.releaseLock();}
      const body=Buffer.concat(chunks); if(!body.length) throw Error('EMPTY_SOURCE_BODY');
      const bodyPath=`${s.id}.body`;
      fs.writeFileSync(path.join(outputDirectory,bodyPath),body,{flag:'wx',mode:0o600});
      records.push({id:s.id,url:s.url,observedAt,status:'CAPTURED_REQUIRES_SOURCE_REVIEW',contentType:type,bytes:body.length,sha256:sha(body),bodyPath});
    } catch(e) {
      // Never include response text, headers, credentials or drafts in error logs.
      records.push({id:s.id,url:s.url,observedAt,status:'UNAVAILABLE',reason:/^(SOURCE_|UNEXPECTED_SOURCE_|UNSUPPORTED_SOURCE_|EMPTY_SOURCE_)/.test(e.message)?e.message:'SOURCE_FETCH_FAILED'});
    }
  }
  const result={schema:'newsstand-hosted-source-capture.v1',createdAt:new Date().toISOString(),records,researchComplete:false,publicationAuthorized:false};
  fs.writeFileSync(path.join(outputDirectory,'capture.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx',mode:0o600});
  return result;
}

if(import.meta.url===pathToFileURL(process.argv[1] || '').href) {
  if(!process.argv[2] || !process.argv[3]) throw Error('Usage: capture-newsstand-hosted-sources.mjs <controlled-plan.json> <new-private-directory>');
  const plan=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
  const r=await captureSources({...plan,outputDirectory:path.resolve(process.argv[3])});
  console.log(JSON.stringify({captured:r.records.filter(s=>s.status==='CAPTURED_REQUIRES_SOURCE_REVIEW').length,unavailable:r.records.filter(s=>s.status==='UNAVAILABLE').length,researchComplete:false,publicationAuthorized:false}));
  if(r.records.some(s=>s.status==='UNAVAILABLE')) process.exitCode=2;
}
