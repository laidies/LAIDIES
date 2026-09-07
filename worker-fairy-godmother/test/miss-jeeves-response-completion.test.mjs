import assert from 'node:assert/strict';
import test from 'node:test';
import {handleMissJeevesGuidance} from '../src/miss-jeeves-guidance.js';
const request = () => new Request('https://miss-jeeves.internal/guidance', {
  method:'POST', headers:{'content-type':'application/json','x-laidies-rate-key':'a'.repeat(64)},
  body:JSON.stringify({query:'Can I upload a work document?'})
});
const complete = () => ({status:'completed',model:'gpt-5.6-sol',usage:{input_tokens:1000,output_tokens:100},
  output:[{type:'message',status:'completed',content:[{type:'output_text',text:'Check your workplace permission first.',annotations:[{type:'url_citation',url:'https://help.openai.com/',start_index:0,end_index:36}]}]}]});
test('unfinished provider answers never become usable guidance and retain billed usage', async t=>{
  for (const status of ['incomplete','failed','cancelled','in_progress',undefined]) await t.test(String(status),async()=>{
    const data=complete(); data.status=status;
    const response=await handleMissJeevesGuidance(request(),{OPENAI_API_KEY:'fixture'},async()=>Response.json(data));
    const result=await response.json();
    assert.equal(response.status,502);
    assert.equal(result.error,'provider_answer_incomplete');
    assert.ok(result.research_charge_micro_usd>0);
    assert.equal(result.output,undefined);
  });
});
test('unfinished message and empty cited text are rejected',async()=>{
  for (const mutate of [d=>{d.output[0].status='incomplete';},d=>{d.output[0].content[0].text='';}]) {
    const data=complete(); mutate(data);
    const response=await handleMissJeevesGuidance(request(),{OPENAI_API_KEY:'fixture'},async()=>Response.json(data));
    assert.equal(response.status,502);
  }
});
test('completed answer pins standard pricing and sends only hashed safety identity',async()=>{
  let sent;
  const response=await handleMissJeevesGuidance(request(),{OPENAI_API_KEY:'fixture'},async(_url,options)=>{sent=JSON.parse(options.body);return Response.json(complete());});
  assert.equal(response.status,200);
  assert.equal(sent.service_tier,'default');
  assert.equal(sent.safety_identifier,'a'.repeat(64));
});
