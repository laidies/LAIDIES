#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const d='operations/product-stewards/newsstand/candidates/anthropic-fable-5-1-2026-09-02/';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const wrapper=JSON.parse(read(d+'independent-workers-ai-provider-output.json'));
const prior=typeof wrapper.provider.response==='string'?JSON.parse(wrapper.provider.response):wrapper.provider.response;
const story=read(d+'review-text.json');
const keys=['communicationBenchmark','datedChange','freshnessReviewability'];
const prompt=`Correct only the artifact evidence for these three outcomes from your prior independent review: ${keys.join(', ')}. Preserve each prior verdict and observation. Each excerpt must be copied character-for-character from EXACT STORY, be at least 15 characters, and directly support that outcome.\n\nPRIOR OUTCOMES:\n${JSON.stringify(Object.fromEntries(keys.map(k=>[k,prior.outcomes[k]])))}\n\nEXACT STORY:\n${story}\n\nReturn JSON only: {"outcomes":{"communicationBenchmark":{"verdict":"PASS|HOLD|FAIL","observation":"...","artifactEvidence":[{"excerpt":"...","locator":"..."}]},"datedChange":{},"freshnessReviewability":{}}}`;
const response=await fetch('http://localhost:8791',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:[{role:'system',content:'Return exact-evidence JSON only.'},{role:'user',content:prompt}],response_format:{type:'json_object'},max_tokens:2200,temperature:0,seed:20260905})});
if(!response.ok)throw new Error(`Evidence reviewer HTTP ${response.status}: ${await response.text()}`);
const provider=await response.json(); const raw=provider.response??provider.choices?.[0]?.message?.content;
let correction=raw;
if(typeof raw==='string') {
  try { correction=JSON.parse(raw); }
  catch { correction=JSON.parse(raw.replaceAll('\\"','"')); }
}
fs.writeFileSync(path.join(root,d+'independent-workers-ai-evidence-correction.json'),JSON.stringify({model:'@cf/meta/llama-3.3-70b-instruct-fp8-fast',provider,promptSha256:hash(prompt),correction},null,2)+'\n');
console.log(JSON.stringify(Object.fromEntries(Object.entries(correction.outcomes||{}).map(([k,v])=>[k,v.verdict]))));
