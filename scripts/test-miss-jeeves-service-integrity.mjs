import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
const pagesConfig = fs.readFileSync(new URL('../wrangler.toml', import.meta.url), 'utf8');
// A working mock cannot prove that Pages will receive the required binding.
function requireGuidanceBinding(config, section) {
  const block = config.split(`[[${section}]]`)[1]?.split(/^\[/m)[0] || '';
  assert.match(block, /^binding\s*=\s*"FAIRY_AI"\s*$/m, `${section}: required Pages service binding`);
  assert.match(block, /^service\s*=\s*"laidies-fairy-godmother"\s*$/m, `${section}: preserve the shared production service`);
}
for (const section of ['services', 'env.production.services']) {
  requireGuidanceBinding(pagesConfig, section);
  const withoutSection = pagesConfig.replace(`[[${section}]]`, `[[missing.${section}]]`);
  assert.throws(() => requireGuidanceBinding(withoutSection, section), /required Pages service binding/,
    `${section}: calibration must reject the missing-binding regression`);
}
const workerPath = path.resolve(process.argv[2] || new URL('../_worker.js', import.meta.url).pathname);
const { default: worker } = await import(pathToFileURL(workerPath));
let legacyCalls = 0;
const entry = {id:'test-prompts',title:'Prompts',summary:'<p>Use <strong>clear instructions</strong> &amp; context.</p>',url:'/newsstand.html#prompts',type:'daily',learnerJob:'current',status:'live',topics:['prompting'],aliases:['Why are prompts ignored?']};
const source = {type:'url_citation',url:'https://platform.openai.com/docs/guides/prompt-engineering',title:'Prompting'};
const valid = {status:'ok',model:'gpt-5.6-sol',source_policy_version:'test.v1',citation_policy:'all-approved-https.v1',guestToken:'fixture-token',allowance:{kind:'guest',policy:'adaptive.v1',state:'available',remaining:7},output:[{type:'message',content:[{type:'output_text',text:'A prompt can contain conflicting instructions. I need the harmless instruction and tool name to check what happened in your case.',annotations:[source]}]}]};
const envFor = (service) => ({
  ASSETS:{fetch:async request=>new URL(request.url).pathname==='/content/site/miss-jeeves-index.json'?Response.json({_meta:{schema:'laidies-miss-jeeves-index.v1'},entries:[entry]}):new Response('',{status:404})},
  AI:{run:async()=>{legacyCalls++;return {response:JSON.stringify({coverage:'exact',answer:'Just upload it.',source_ids:[entry.id]})};}},
  ...(service ? {FAIRY_AI:{fetch:service}} : {})
});
const ask = env=>worker.fetch(new Request('https://laidies.ai/api/miss-jeeves',{method:'POST',headers:{'content-type':'application/json','x-laidies-guest-token':'test-guest','authorization':'Bearer test-resident'},body:JSON.stringify({query:'Why are prompts ignored?',intent:'research',researchAttemptId:'51a1c1bd-65fa-482e-a19a-cac0387ef9c7'})}),env);
// Default and explicit search must stay free, even when the paid service is configured.
for (const intent of [undefined, 'search']) {
  let serviceCalls = 0;
  const freeEnv = envFor(async()=>{ serviceCalls++; throw Error('free search called paid service'); });
  for (let attempt=0; attempt<8; attempt++) {
    const response = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({query:'Why are prompts ignored?',intent})}),freeEnv);
    const result=await response.json();
    assert.equal(result.status,'search_results');
    assert.equal(result.mode,'site-search');
    assert.equal(result.research_available,true,'related references retain optional research');
    assert.equal(result.allowance,undefined);
  }
  assert.equal(serviceCalls,0);
  assert.equal(legacyCalls,0);
}
const cases = [
  ['missing service',undefined],
  ['throwing service',async()=>{throw Error('offline');}],
  ['invalid JSON',async()=>new Response('bad')],
  ['missing citation policy',async()=>Response.json({...valid,citation_policy:undefined})],
  ['missing source policy version',async()=>Response.json({...valid,source_policy_version:undefined})],
  ['mixed non-HTTPS citation',async()=>Response.json({...valid,output:[{content:[{type:'output_text',text:'Mixed evidence.',annotations:[source,{...source,url:'http://openai.com/advice'}]}]}]})],
  ['mixed malformed citation',async()=>Response.json({...valid,output:[{content:[{type:'output_text',text:'Mixed evidence.',annotations:[source,{...source,url:'not a URL'}]}]}]})],
  ['no citations',async()=>Response.json({...valid,output:[{content:[{type:'output_text',text:'Just upload it.',annotations:[]}]}]})],
  ['wrong model',async()=>Response.json({...valid,model:'llama-3.1'})],
  ['missing model',async()=>Response.json({...valid,model:undefined})],
  ['explicit unavailable',async()=>Response.json({status:'unavailable',error:'provider_timeout'},{status:504})]
];
for (const [label,service] of cases) {
  const response=await ask(envFor(service));
  const data=await response.json();
  assert.ok(response.status>=500,`${label}: must reject unusable intended service, got ${response.status}`);
  assert.equal(data.status,'unavailable',label);
  assert.notEqual(data.answer,'Just upload it.',label);
  assert.equal(data.results.length,1,`${label}: useful source navigation retained`);
}
assert.equal(legacyCalls,0,'no failure may invoke an alternative model');
let forwarded;
const goodEnv=envFor(async request=>{forwarded={url:request.url,headers:request.headers,body:await request.json()};return Response.json(valid);});
const response=await ask(goodEnv);
const data=await response.json();
assert.equal(response.status,200);
assert.equal(data.mode,'current-guidance');
assert.equal(data.current_guidance.model,'gpt-5.6-sol');
assert.equal(data.guestToken,valid.guestToken);
assert.deepEqual(data.allowance,valid.allowance);
assert.equal(forwarded.url,'https://miss-jeeves.internal/guidance');
assert.equal(forwarded.body.researchAttemptId,'51a1c1bd-65fa-482e-a19a-cac0387ef9c7');
assert.match(forwarded.headers.get('x-laidies-rate-key'),/^[a-f0-9]{64}$/);
assert.equal(forwarded.headers.get('authorization'),'Bearer test-resident');
assert.equal(forwarded.headers.get('x-laidies-guest-token'),'test-guest');
assert.deepEqual(forwarded.body.related_laidies_material,[],'display summaries must not masquerade as full research evidence');
assert.equal(data.results[0].summary,'Use clear instructions & context.');
for (const state of ['paused','busy']) {
  const capacity=await ask(envFor(async()=>Response.json({status:'error',error:'research_capacity_reached',guestToken:'capacity-fixture',allowance:{kind:'guest',policy:'adaptive.v1',state,retryAt:'2026-09-06T00:00:00.000Z'}},{status:429})));
  assert.equal(capacity.status,429,'adaptive research capacity is a deliberate research limit, not an unavailable service');
  const capacityData=await capacity.json();
  assert.equal(capacityData.status,'limit_reached');
  assert.equal(capacityData.guestToken,'capacity-fixture');
  assert.deepEqual(capacityData.allowance,{kind:'guest',policy:'adaptive.v1',state,retryAt:'2026-09-06T00:00:00.000Z'});
}
for (const [env,status] of [[envFor(),503],[goodEnv,200]]) {
  const health=await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/health'),env);
  assert.equal(health.status,status,'health must include intended service configuration');
  const healthData=await health.json();
  assert.equal(healthData.answer_model_required,'gpt-5.6-sol');
  assert.equal(healthData.answer_probe,'not_run','configuration health must not imply a provider answer was tested');
}
console.log(`PASS Miss Jeeves service integrity: ${cases.length} failure cases, Sol and citation policy, identity and allowance, plain text, health.`);

const clarifier=await (await ask(envFor(async()=>Response.json({status:'clarification_required',question:'Which tool were you using?',model:'gpt-5.6-sol',guestToken:'clarification-guest',allowance:{kind:'guest',policy:'adaptive.v1',state:'available'}})))).json();
assert.equal(clarifier.status,'clarification_required');
assert.equal(clarifier.guestToken,'clarification-guest');
assert.equal(clarifier.allowance.state,'available');
const oversizedEnv=envFor(async request=>{
  const body=await request.json();
  assert.deepEqual(body.related_laidies_material,[],'oversized full source must not become a truncated summary');
  return Response.json(valid);
});
const originalAssets=oversizedEnv.ASSETS.fetch;
oversizedEnv.ASSETS.fetch=async request=>new URL(request.url).pathname==='/content/site/miss-jeeves-index.json'?Response.json({_meta:{schema:'laidies-miss-jeeves-index.v1'},entries:[{...entry,sourceAnchor:'prompts',artifactSha256:'a'.repeat(64),sourceText:'Context. '.repeat(1500)+'Do not upload without permission.'}]}):originalAssets(request);
await ask(oversizedEnv);
console.log('PASS clarification continuity and oversized-source exclusion.');
