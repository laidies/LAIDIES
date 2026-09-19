import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const workerSource=await fs.readFile(new URL('../../_worker.js', import.meta.url),'utf8');
const {default:worker}=await import(`data:text/javascript;base64,${Buffer.from(workerSource).toString('base64')}`);
const sha='a'.repeat(64);
const entry=(id,title,summary,aliases=[],topics=['prompting'])=>({
  id,parentId:'working-with-ai-101',title,summary,aliases,topics,learnerJob:'understand',
  status:'live',url:`/library.html#working-with-ai-101::%40${id}`,wholeUrl:'/library.html#working-with-ai-101',
  type:'book-section',section:'Working with AI 101',reviewedAt:'2026-09-19T00:00:00Z',artifactSha256:sha
});
const fixtureIndex={_meta:{schema:'laidies-miss-jeeves-index.v1'},entries:[
  entry('book-section-working-with-ai-101-chapter-11-is-this-output-actually-good-11-3-a-practical-evaluation-framework','11.3 A Practical Evaluation Framework','Check an AI answer against the evidence and the task before relying on it.',['How do I check an AI answer?'],['verification','check']),
  entry('book-section-working-with-ai-101-ch-10-10-4-system-prompts-the-hidden-instructions','10.4 System Prompts: The Hidden Instructions','System instructions are included in the context before your message.',['What are system prompts?'],['prompting','instructions']),
  entry('book-section-working-with-ai-101-chapter-7-which-ai-for-which-job-7-1-three-layers-not-one-choice','7.1 Three Layers, Not One Choice','Choose from the work you need to do, not from a single best-AI label.',['How do I choose an AI for a task?'],['tools','model'])
]};
const suppliedIndex=process.argv[2];
const index=suppliedIndex ? JSON.parse(await fs.readFile(suppliedIndex,'utf8')) : fixtureIndex;
assert.equal(index?._meta?.schema,'laidies-miss-jeeves-index.v1','current index schema is required');
assert.ok(Array.isArray(index.entries)&&index.entries.length>0,'current index must contain entries');
let aiCalls=0, fairyCalls=0;
const env={
  AI:{async run(){aiCalls++; throw new Error('initial lookup must not invoke Workers AI');}},
  FAIRY_AI:{async fetch(){fairyCalls++; throw new Error('initial lookup must not invoke FAIRY guidance');}},
  ASSETS:{async fetch(request){
    const path=new URL(request.url).pathname;
    if(path==='/content/site/miss-jeeves-index.json') return Response.json(index);
    if(path==='/content/newsstand-daily-issues.json') return Response.json({issues:[]});
    if(path==='/content/blend-snap-weekly-packs.json') return Response.json({packs:[]});
    return new Response('not found',{status:404});
  }}
};
const request=(body,options={})=>new Request('https://laidies.ai/api/miss-jeeves',{
  method:options.method||'POST',headers:options.headers||{'content-type':'application/json'},body
});
const body=async r=>({status:r.status,json:await r.json()});

const normal=await body(await worker.fetch(request(JSON.stringify({query:'How do I check an AI answer?',placement:'library'})),env));
assert.equal(normal.status,200);
assert.equal(normal.json.status,'search_results');
assert.equal(normal.json.mode,'site-search');
assert.equal(normal.json.coverage,'related');
assert.equal(normal.json.research_available,false);
assert.equal(normal.json.results[0].id,'book-section-working-with-ai-101-chapter-11-is-this-output-actually-good-11-3-a-practical-evaluation-framework');
assert.equal(typeof normal.json.results[0].summary,'string');
assert.ok(normal.json.results[0].summary.length>0,'results retain the catalogue preview excerpt');

const broad=await body(await worker.fetch(request(JSON.stringify({query:'Which AI should I use?'})),env));
assert.equal(broad.status,200);
assert.equal(broad.json.status,'search_results');
assert.equal(broad.json.results[0]?.id,'book-section-working-with-ai-101-chapter-7-which-ai-for-which-job-7-1-three-layers-not-one-choice');
assert.notEqual(broad.json.results[0]?.id,'book-section-working-with-ai-101-chapter-7');

const privateQuery=await body(await worker.fetch(request(JSON.stringify({query:'My password: secret-value'})),env));
assert.equal(privateQuery.status,400);
assert.equal(privateQuery.json.error,'private_content_prohibited');

const invalidJson=await body(await worker.fetch(request('{'),env));
assert.equal(invalidJson.status,400);
assert.equal(invalidJson.json.error,'invalid_json');

const wrongMethod=await body(await worker.fetch(request(null,{method:'GET',headers:{}}),env));
assert.equal(wrongMethod.status,405);
assert.equal(wrongMethod.json.error,'method_not_allowed');

assert.equal(aiCalls,0,'free initial lookup must not call Workers AI');
assert.equal(fairyCalls,0,'free initial lookup must not call FAIRY guidance');
console.log('PASS backend regression: free catalogue lookup, result excerpts, guarded input, and no AI bindings');
