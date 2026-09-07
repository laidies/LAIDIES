import fs from 'node:fs';import assert from 'node:assert/strict';import path from 'node:path';import {execFileSync} from 'node:child_process';import {pathToFileURL} from 'node:url';
const root=process.cwd(),out=root+'/operations/product-stewards/town-entry-homepage/candidates/homepage-closeout-20260906',stage=fs.readFileSync('/tmp/laidies-activity-spacing-stage.txt','utf8').trim();
const cases=[
 ['Why does AI make things up?','book-section-ai-fundamentals-101-ch-11-11-6-hallucination-why-it-makes-things-up'],
 ['What is a context window?','book-section-ai-dictionary-term-context-window'],
 ['How do I write a better prompt?','book-section-working-with-ai-101-chapter-2-giving-it-what-it-needs-without-drowning-it-2-3-the-brief-not-the-prompt'],
 ['What are context windows?','book-section-ai-dictionary-term-context-window'],
 ['How do I write better prompts?','book-section-working-with-ai-101-chapter-2-giving-it-what-it-needs-without-drowning-it-2-3-the-brief-not-the-prompt'],
 ['How do I repair a leaking bicycle tyre?',null],
 ['Where can I buy a red sofa?',null],
 ['Which AI should I use?','book-section-working-with-ai-101-chapter-7'],
 ['Can I upload a work document?','book-section-working-with-ai-101-chapter-2-giving-it-what-it-needs-without-drowning-it-2-4-upload-paste-or-describe'],
 ['How do I check an AI answer?','book-section-working-with-ai-101-chapter-11-is-this-output-actually-good-11-3-a-practical-evaluation-framework'],
 ['How often does AI make stuff up?',null,false],
 ['What is machine learning?',null,false],
 ['What is a GPU?',null,false]
];
const reports=[];
for(const kind of ['parent','candidate']){
 const code=kind==='parent'?fs.readFileSync(out+'/parent-worker.js','utf8'):fs.readFileSync('_worker.js','utf8');const temp='/tmp/laidies-search-'+kind+'.mjs';fs.writeFileSync(temp,code);const {default:worker}=await import(pathToFileURL(temp));let paid=0;
 const env={ASSETS:{fetch:async req=>{const file=stage+new URL(req.url).pathname;return fs.existsSync(file)?new Response(fs.readFileSync(file.endsWith('/content/site/miss-jeeves-index.json') ? (kind==='candidate' ? root+'/content/site/miss-jeeves-index.json' : out+'/parent-index.json') : file)):new Response('',{status:404});}},AI:{run(){paid++;throw Error('Unexpected paid call')}},FAIRY_AI:{fetch(){paid++;throw Error('Unexpected paid call')}}};
 const rows=[];
 for(const [q,top,empty=true] of cases){const res=await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:q,placement:'homepage',intent:'search'})}),env,{});const data=await res.json();const issues=[];
 if(res.status!==200||data.mode!=='site-search')issues.push('not free search');
 if(top&&data.results[0]?.id!==top)issues.push('wrong first result');if(!top&&empty&&data.results.length)issues.push('unrelated match');if(empty===false&&!data.results.length)issues.push('missing topic');
 if(q.toLowerCase().includes('context')&&data.results.some(r=>r.type==='daily'||/Read the full explanation|Put it into practice/.test(r.summary)))issues.push('unrelated news or orphan navigation');
 if(q==='Can I upload a work document?'&&!/whether the AI is allowed to receive/.test(data.results[0]?.summary||''))issues.push('permission prerequisite omitted');
 rows.push({query:q,issues,results:data.results.map(r=>({id:r.id,title:r.title,url:r.url,summary:r.summary}))});
 }
 const privacy=await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:'My password: secret123',intent:'search'})}),env,{});assert.equal(privacy.status,400);assert.equal(paid,0);
 reports.push({kind,rows,paidCalls:paid,privacyBlocked:true});console.log(kind,rows.map(r=>({q:r.query,issues:r.issues,top:r.results.slice(0,3).map(t=>t.title)})));
}
fs.writeFileSync(out+'/search-checks.json',JSON.stringify(reports,null,2));assert(reports[0].rows.some(r=>r.issues.length),'old defect not reproduced');assert(reports[1].rows.every(r=>!r.issues.length),'candidate relevance failed');
