import assert from 'node:assert/strict';
import {hashAnswerBankValue,sourceDigestFor} from './lib/miss-jeeves-answer-bank.mjs';
import {extractReviewedSource,checkReviewedSources} from './lib/miss-jeeves-source-check.mjs';
const url='https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?c=caelum';
const html='<article id="content-container"><h1>Be clear and direct</h1><h2>Use examples effectively</h2><p>'+('Specific test evidence. '.repeat(70))+'</p></article>';
const sources=[{url,title:'Test source',contentDigest:await hashAnswerBankValue(extractReviewedSource(html,'claude-doc-article.v1'))}];
const input={sources,sourceDigest:await sourceDigestFor(sources)};
for(const [name,fetchImpl]of [
 ['blocked',async()=>new Response('',{status:403})],
 ['redirect',async()=>new Response('',{status:302,headers:{location:'https://example.org'}})],
 ['missing article',async()=>new Response('<main>Changed template</main>',{headers:{'content-type':'text/html'}})],
 ['changed',async()=>new Response(html.replace('Specific test evidence.','New contradictory evidence.'),{headers:{'content-type':'text/html'}})],
 ['oversized',async()=>new Response('x'.repeat(1500001),{headers:{'content-type':'text/html'}})],
 ['error',async()=>{throw Error('offline');}]
])assert.equal((await checkReviewedSources(input,{fetchImpl})).current,false,name);
let calls=0;const valid=await checkReviewedSources(input,{fetchImpl:async(u,options)=>{calls++;assert.equal(u,url);assert.equal(options.redirect,'manual');return new Response(html,{headers:{'content-type':'text/html'}});}});
assert.equal(valid.current,true);assert.equal(calls,1);
assert.equal((await checkReviewedSources({...input,sources:[{...sources[0],url:'http://127.0.0.1/secret'}]},{fetchImpl:()=>{throw Error('unapproved must not fetch');}})).current,false);
console.log('PASS source freshness: 7 failing conditions rejected; exact source recheck passes.');
