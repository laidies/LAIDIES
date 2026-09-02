#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/anthropic-fable-5-1-2026-09-02/';
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const wrapper = JSON.parse(read(d+'independent-workers-ai-provider-output.json'));
const prior = typeof wrapper.provider.response === 'string' ? JSON.parse(wrapper.provider.response) : wrapper.provider.response;
const reviewText = read(d+'review-text.json');
const claims = JSON.parse(read(d+'claim-map.json'));
const sources = ['source-announcement.md','source-release-notes.md'].map(p=>read(d+p)).join('\n\n');
const prompt = `You previously returned the independent review below. Complete two omissions without changing its substantive verdict.

1. Return one artifactEvidence item for noInternalNotesOrInventedAdvice. Its excerpt must occur exactly in the supplied exact story and be at least 15 characters.
2. Reassess every claim using verdict PASS, HOLD or FAIL (not VERIFIED or QUALIFIED). An attributed vendor claim can PASS when the story clearly attributes and bounds it. Return all five claim IDs, with exact candidate and source excerpts at least 15 characters.

PRIOR REVIEW:\n${JSON.stringify(prior)}

EXACT STORY:\n${reviewText}

CLAIM MAP:\n${JSON.stringify(claims)}

SOURCE RECEIPTS:\n${sources}

Return JSON only: {"noInternalNotesOrInventedAdvice":{"verdict":"PASS|HOLD|FAIL","observation":"...","artifactEvidence":[{"excerpt":"...","locator":"..."}]},"claimAssessments":[{"claimId":"...","verdict":"PASS|HOLD|FAIL","observation":"...","candidateEvidence":[{"excerpt":"...","locator":"..."}],"sourceEvidence":[{"excerpt":"...","locator":"..."}]}]}`;
const response = await fetch('http://localhost:8791',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:[{role:'system',content:'You are an exact independent editor. Return valid JSON only; evidence excerpts must be exact.'},{role:'user',content:prompt}],response_format:{type:'json_object'},max_tokens:2400,temperature:0,seed:20260903})});
if(!response.ok) throw new Error(`Correction reviewer HTTP ${response.status}: ${await response.text()}`);
const provider=await response.json();
const raw=provider.response??provider.choices?.[0]?.message?.content;
const correction=typeof raw==='string'?JSON.parse(raw):raw;
const output={model:'@cf/meta/llama-3.3-70b-instruct-fp8-fast',provider,promptSha256:hash(prompt),correction};
fs.writeFileSync(path.join(root,d+'independent-workers-ai-correction.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({check:correction.noInternalNotesOrInventedAdvice?.verdict,claims:correction.claimAssessments?.map(x=>[x.claimId,x.verdict])}));
