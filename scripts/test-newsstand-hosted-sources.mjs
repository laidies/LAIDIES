#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {captureSources,MAX_SOURCE_BYTES} from './capture-newsstand-hosted-sources.mjs';
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-source-test-'));
const base={sources:[{id:'primary',url:'https://example.com/story'}],approvedHosts:['example.com']};
let n=0;
const run=fetcher=>captureSources({...base,fetcher,outputDirectory:path.join(temp,String(n++))});
const good=await run(async()=>new Response('Complete primary body',{headers:{'content-type':'text/plain'}}));
assert.equal(good.records[0].status,'CAPTURED_REQUIRES_SOURCE_REVIEW');
assert.equal(good.researchComplete,false); assert.equal(good.publicationAuthorized,false);
for(const [response,reason] of [
  [new Response('',{status:403}),'SOURCE_HTTP_403'],
  [new Response('',{status:302,headers:{location:'http://127.0.0.1'}}),'SOURCE_HTTP_302'],
  [new Response('x'.repeat(MAX_SOURCE_BYTES+1),{headers:{'content-type':'text/plain'}}),'SOURCE_BODY_EXCEEDS_LIMIT'],
  [new Response('bytes',{headers:{'content-type':'application/octet-stream'}}),'UNSUPPORTED_SOURCE_CONTENT_TYPE']
]) {const r=await run(async()=>response); assert.equal(r.records[0].reason,reason); assert.equal(r.records[0].bodyPath,undefined);}
await assert.rejects(()=>captureSources({...base,sources:[{id:'bad',url:'https://not-approved.example/story'}],fetcher:()=>{throw Error('must not fetch');},outputDirectory:path.join(temp,'bad')}),/URL_NOT_APPROVED/);
await assert.rejects(()=>captureSources({...base,outputDirectory:path.join(temp,'0')}),/ALREADY_EXISTS/);
fs.rmSync(temp,{recursive:true,force:true});
console.log('HOSTED SOURCE CAPTURE PASS: full body, denied/redirect/oversize/unknown-host failures; no research or publication claim.');
