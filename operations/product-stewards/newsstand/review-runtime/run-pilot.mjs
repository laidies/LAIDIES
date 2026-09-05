import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import os from 'node:os';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {sha,paragraphs,storyParagraphs,requestFor,normalize} from './protocol.mjs';
const root=process.cwd();
const dir='operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/';
const providerRoute=process.argv[3]||'gemma';
assert.ok(['gemma','claude'].includes(providerRoute),'Use explicit gemma or claude route');
const resume=process.argv.includes('--resume');
const out=dir+(providerRoute==='claude'?'bounded-claude-v2/':'bounded-pilot-v2/');
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const registryPath='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const registry=json(registryPath);
const protocolSha256=sha(read('operations/product-stewards/newsstand/review-runtime/protocol.mjs'));
fs.mkdirSync(out,{recursive:true});
const write=(p,v)=>{if(fs.existsSync(p))throw Error('Preserve existing attempt: '+p);fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n')};
async function claude(request){
 const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'news-bounded-review-'));
 const args=['--print','--safe-mode','--tools','','--permission-mode','dontAsk','--no-session-persistence','--model','claude-fable-5','--effort','medium','--output-format','json','--system-prompt',request.messages[0].content];
 return await new Promise((resolve,reject)=>{
  const child=spawn('claude',args,{cwd,stdio:['pipe','pipe','pipe']});let stdout='',stderr='',expired=false;
  const timer=setTimeout(()=>{expired=true;child.kill('SIGTERM')},240000);
  child.stdout.setEncoding('utf8');child.stderr.setEncoding('utf8');
  child.stdout.on('data',s=>stdout+=s);child.stderr.on('data',s=>stderr+=s);
  child.on('error',e=>{clearTimeout(timer);reject(e)});
  child.on('close',code=>{clearTimeout(timer);resolve({ok:code===0&&!expired,status:expired?'TIMEOUT':code,raw:stdout,stderr})});
  child.stdin.end(request.messages[1].content);
 });
}
async function run(name,kind,packet){
 const requestPath=out+name+'-request.json',packetPath=out+name+'-packet.json',rawPath=out+name+'-provider.raw.json',checkedPath=out+name+'-checked.json';
 const existing=fs.existsSync(requestPath);
 if(existing){assert.ok(resume,'Use --resume to replay a preserved attempt');assert.deepEqual(json(packetPath),packet,'Saved packet differs; use a separately versioned attempt');assert.ok(fs.existsSync(rawPath),'Attempt has no raw result; do not silently repeat an uncertain provider call')}
 const request=existing?json(requestPath):requestFor(kind,packet);
 if(!existing){write(requestPath,request);write(packetPath,packet)}
 const start=new Date().toISOString();
 try{
  let raw;
  if(existing)raw=read(rawPath);
  else{
   let response;
   if(providerRoute==='claude')response=await claude(request);
   else{const r=await fetch('http://127.0.0.1:8791/gemma',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(request),signal:AbortSignal.timeout(180000)});response={ok:r.ok,status:r.status,raw:await r.text()}}
   raw=response.raw;fs.writeFileSync(rawPath,raw+'\n',{flag:'wx'});
   if(response.stderr)fs.writeFileSync(out+name+'-provider.stderr.txt',response.stderr,{flag:'wx'});
   assert.ok(response.ok,`Provider execution failed: ${response.status}`);
  }
  const provider=JSON.parse(raw);let content,model;
  if(providerRoute==='claude'){
   assert.equal(provider.is_error,false,'Claude execution error');assert.equal(provider.subtype,'success','Claude did not complete');
   model=Object.keys(provider.modelUsage||{});assert.ok(model.includes('claude-fable-5')&&model.every(m=>m.startsWith('claude-')),'Unexpected or missing actual Claude model');
   content=provider.result;assert.ok(typeof content==='string'&&content.trim(),'Missing Claude final response');
   content=content.trim().replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }else{
   const choice=provider.choices?.[0];assert.equal(choice?.finish_reason,'stop','Incomplete provider response');
   model=provider.model;assert.ok(model?.startsWith('@cf/google/gemma-4-26b-a4b-it'),'Unexpected provider model');content=choice.message?.content;assert.ok(content,'Missing final content');
  }
  const result=JSON.parse(content),judgmentPath=out+name+'-judgment.json';
  if(fs.existsSync(judgmentPath))assert.deepEqual(json(judgmentPath),result,'Saved judgment changed');else write(judgmentPath,result);
  const checked=normalize(kind,result,packet);
  const record={kind,startedAt:existing?null:start,replayedAt:existing?start:null,completedAt:new Date().toISOString(),requestedModel:providerRoute==='claude'?'claude-fable-5':'@cf/google/gemma-4-26b-a4b-it',providerModel:model,providerId:provider.id||provider.session_id,usage:provider.usage,attestations:result.attestations,requestSha256:sha(read(requestPath)),rawSha256:sha(read(rawPath)),protocolSha256:sha(read('operations/product-stewards/newsstand/review-runtime/protocol.mjs')),registrySha256:sha(read(registryPath)),...checked};
  if(fs.existsSync(checkedPath)){
   const saved=json(checkedPath);assert.equal(saved.rawSha256,record.rawSha256,'Saved raw result changed');assert.equal(saved.protocolSha256,record.protocolSha256,'Protocol changed; preserve this calibration and version a new attempt');assert.deepEqual(saved.families,record.families);return saved;
  }
  write(checkedPath,record);console.log(JSON.stringify({name,verdict:record.verdict,model,usage:provider.usage,replayed:existing}));return record;
 }catch(e){
  const failurePath=out+name+(existing?'-replay-failure.json':'-failure.json');
  if(!fs.existsSync(failurePath))write(failurePath,{kind:'EXECUTION_OR_PROTOCOL_FAILURE',message:String(e),attemptedAt:start,requestSha256:sha(read(requestPath))});throw e;
 }
}
const mode=process.argv[2]||'calibrate';
if(mode==='calibrate'){
 const positive=registry.positiveExemplars.find(e=>e.id==='CQX-GOOD-NEWS-001');
 const items=[registry.negativeExemplars[1],positive,registry.negativeExemplars[0]];
 const evaluations=[];
 for(const item of items){
  const raw=read(item.path);assert.equal(sha(raw),item.sha256,'Registry artifact drift');
  let packet;
  if(item===positive){const sandbox={window:{}};vm.runInNewContext(raw,sandbox,{timeout:1000});const story=sandbox.window.NEWSSTAND_DATA.stories.find(s=>s.id===item.locator);assert.ok(story);packet={readerJob:'A dated ordinary news report for smart professional women without technical training: explain the reported change, its practical meaning and uncertainty, with a useful analogy and next action. Assess its editorial craft at its stated date, not present-day legal validity.',paragraphs:storyParagraphs(story)}}
  else packet={readerJob:'The introduction and opening of a broad AI Fundamentals reference book for smart professional women without technical training. Orient readers to AI across work, everyday life and public debate; explain how concepts connect, with warm conversational curiosity. Examples serve that broad foundation rather than making one workflow the purpose of the whole book.',paragraphs:paragraphs(raw)};
  if(providerRoute==='claude')packet.communicationAuthority={sha256:sha(read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')),text:read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')};
  const name='sample-'+sha(raw).slice(0,10);
  const expected=item===positive?'PASS':'REJECT';
  let actual;
  try{actual=await run(name,'calibration',packet)}catch(e){evaluations.push({exemplarId:item.id,source:{path:item.path,sha256:item.sha256},sample:name,expected,actual:null,passed:false,failureKind:'EXECUTION_OR_PROTOCOL_FAILURE',failure:String(e),rawOutput:out+name+'-provider.raw.json'});break}
  const missing=(item.failureFamilies||[]).filter(f=>actual.families[f]?.state!=='present');
  evaluations.push({exemplarId:item.id,source:{path:item.path,sha256:item.sha256},sample:name,expected,actual:actual.verdict,missingRegisteredFailures:missing,passed:actual.verdict===expected&&!missing.length});
  if(!evaluations.at(-1).passed)break;
 }
 const result={status:evaluations.length===items.length&&evaluations.every(e=>e.passed)?'CALIBRATION_PASSED':'HOLD_CALIBRATION',scope:'Blind editorial calibration only; no publication, source accuracy or human comprehension claim.',providerRoute,protocolSha256,registrySha256:sha(read(registryPath)),notRun:items.slice(evaluations.length).map(e=>e.id),evaluations};write(out+'calibration-result.json',result);console.log(JSON.stringify(result));if(result.status!=='CALIBRATION_PASSED')process.exitCode=1;
}else if(mode==='article'){
 const calibration=json(out+'calibration-result.json');assert.equal(calibration.status,'CALIBRATION_PASSED','Calibrate before article assessment');assert.equal(calibration.registrySha256,sha(read(registryPath)));assert.equal(calibration.protocolSha256,protocolSha256,'Calibration protocol changed');assert.equal(calibration.providerRoute,providerRoute,'Calibration provider changed');
 const story=json(dir+'story.json');const evidence=json(dir+'primary-evidence-pilot/evidence.json');
 const packet={readerJob:'Explain the newly reported agent wiki incident and its implications to smart professional women without technical AI background. Preserve uncertainty, connect shared information to the mechanism, and offer useful evidence-checking guidance in a warm, clear and engaging dated news article.',completeArtifact:read(dir+'review-text.json'),paragraphs:storyParagraphs(story),communicationAuthority:{sha256:sha(read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')),text:read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')}};
 const sourceIds=new Map();
 const sources=evidence.records.map((r,i)=>{const id='S'+String(i+1).padStart(3,'0');sourceIds.set(r.claimId,id);return{id,claimId:r.claimId,source:r.source,limitations:r.limitations,corroboratingSources:[...(r.additionalSources||[]),...(r.corroboratingSource?[r.corroboratingSource]:[])]}});
 const claims=json(dir+'primary-evidence-pilot/claim-map.json').map(c=>({claimId:c.claimId,candidateEvidence:c.candidateEvidence.map(e=>e.excerpt),sourceEvidence:c.sourceEvidence,scopeAndFreshness:c.scopeAndFreshness}));
 const facts=await run('article-facts','facts',{...packet,claims,sources});
 const reader=await run('article-reader','reader',packet);
 const verdict=[facts,reader].some(r=>r.verdict==='REJECT')?'REJECT':[facts,reader].some(r=>r.verdict==='HOLD')?'HOLD':'PASS';
 write(out+'article-result.json',{status:verdict,reviewTextSha256:sha(read(dir+'review-text.json')),factual: facts.verdict,reader:reader.verdict,admissionAuthority:false,reason:'Bounded judgments require exact mapping into the unchanged full prose-review chain before admission.'});
 console.log(JSON.stringify({verdict,admissionAuthority:false}));if(verdict!=='PASS')process.exitCode=1;
}else throw Error('Use calibrate or article');
