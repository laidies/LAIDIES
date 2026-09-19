import fs from 'node:fs';import assert from 'node:assert/strict';
import before from './provider-worker.mjs';import after from '../../_worker.js';
const base=fs.readFileSync(new URL('./provider-worker.mjs',import.meta.url),'utf8'),next=fs.readFileSync(new URL('../../_worker.js',import.meta.url),'utf8');
assert.equal(next.split('var COMMON_QUESTION_TARGETS')[0],base.split('var COMMON_QUESTION_TARGETS')[0],'Community implementation must remain byte-identical');
assert.equal(next.slice(next.indexOf('function missJeevesDb')).replace('grounded_ai: "disabled", initial_lookup: "site-search"','grounded_ai: env.AI ? "configured" : "fallback"'),base.slice(base.indexOf('function missJeevesDb')),'All other handlers remain identical except honest lookup health');
for(const pathname of ['/library','/radio','/newsstand','/content/library-books/rendered/working-with-ai-101.html','/api/hyvor-sso','/api/library-corrections','/api/miss-jeeves/result-open','/api/miss-jeeves/topic-request']){
 const request=()=>new Request('https://laidies.ai'+pathname,{method:pathname.startsWith('/api/')?'POST':'GET',headers:{'content-type':'application/json','sec-fetch-dest':'document'},...(pathname.startsWith('/api/')?{body:'{}'}:{})});
 const env={ASSETS:{fetch:async()=>new Response('Preserved public asset')}};
 const a=await before.fetch(request(),env),b=await after.fetch(request(),env);assert.equal(a.status,b.status,pathname);assert.deepEqual([...a.headers],[...b.headers],pathname);assert.equal(await a.text(),await b.text(),pathname);
}
console.log('PASS exact community and other-handler preservation; eight request paths equivalent');
