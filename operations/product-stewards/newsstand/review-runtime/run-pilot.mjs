import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import os from 'node:os';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {sha,paragraphs,storyParagraphs,requestFor,normalize} from './protocol.mjs';
import {inspectPreparedDraft} from '../../../../scripts/prepare-newsstand-draft.mjs';
import {inspectProseQualityReview} from '../../../../scripts/check-prose-quality-admission.mjs';
import {validateStoryTypeCoverage} from '../../../../scripts/validate-newsstand-story-type-coverage.mjs';
const root=process.cwd();
const option=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1]};
const privateDirectory=p=>{const resolved=path.resolve(root,p);assert.ok(resolved.startsWith(path.resolve(root,'operations/product-stewards')+path.sep),'Review files must remain private');return path.relative(root,resolved)+'/'};
const dir=privateDirectory(option('--candidate-dir')||'operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/');
const providerRoute=process.argv[3]||'gemma';
assert.ok(['gemma','claude'].includes(providerRoute),'Use explicit gemma or claude route');
const effort=option('--effort')||'medium';assert.ok(['medium','high'].includes(effort),'Unsupported effort');
const resume=process.argv.includes('--resume');
const out=privateDirectory(option('--output')||dir+(providerRoute==='claude'?'bounded-claude-v2/':'bounded-pilot-v2/'));
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const registryPath='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const registry=json(registryPath);
const policyPath='operations/product-stewards/newsstand/ordinary-news-editorial-policy.json';
const calibrationMode='ORDINARY_NEWS_BLIND_REJECTION_V1';
function assessCalibration(item,positive,actual){
 const known=item.failureFamilies||[];
 const disagreements=known.filter(f=>actual.families[f]?.state!=='present');
 const expected=item===positive?'PASS':'REJECT';
 const complete=known.every(f=>['clear','present','uncertain'].includes(actual.families[f]?.state)&&actual.families[f]?.reason);
 const relevant=known.some(f=>actual.families[f]?.state==='present');
 return {exemplarId:item.id,source:{path:item.path,sha256:item.sha256},sample:'sample-'+item.sha256.slice(0,10),expected,actual:actual.verdict,disagreementsWithHistoricalTags:disagreements,passed:actual.verdict===expected&&(item===positive||(complete&&relevant))};
}
const protocolSha256=sha(read('operations/product-stewards/newsstand/review-runtime/protocol.mjs'));
fs.mkdirSync(out,{recursive:true});
const write=(p,v)=>{if(fs.existsSync(p))throw Error('Preserve existing attempt: '+p);fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n')};
async function claude(request){
 const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'news-bounded-review-'));
 const args=['--print','--safe-mode','--tools','','--permission-mode','dontAsk','--no-session-persistence','--model','claude-fable-5','--effort',effort,'--output-format','json','--json-schema',JSON.stringify(request.outputSchema),'--system-prompt',request.messages[0].content];
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
 if(existing){assert.ok(resume,'Use --resume to replay a preserved attempt');assert.ok(fs.existsSync(rawPath),'Attempt has no raw result; do not silently repeat an uncertain provider call');assert.deepEqual(json(packetPath),packet,'Saved packet differs; use a separately versioned attempt')}
 const request=existing?json(requestPath):requestFor(kind,packet);
 if(!existing){write(requestPath,request);write(packetPath,packet)}
 const start=new Date().toISOString();
 try{
  let raw;
  if(existing)raw=read(rawPath);
  else{
   let response;
   if(providerRoute==='claude')response=await claude(request);
   else{const {outputSchema,...body}=request;const r=await fetch('http://127.0.0.1:8791/gemma',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(180000)});response={ok:r.ok,status:r.status,raw:await r.text()}}
   raw=response.raw;fs.writeFileSync(rawPath,raw+'\n',{flag:'wx'});
   if(response.stderr)fs.writeFileSync(out+name+'-provider.stderr.txt',response.stderr,{flag:'wx'});
   assert.ok(response.ok,`Provider execution failed: ${response.status}`);
  }
  const provider=JSON.parse(raw);let content,model;
  if(providerRoute==='claude'){
   assert.equal(provider.is_error,false,'Claude execution error');assert.equal(provider.subtype,'success','Claude did not complete');
   model=Object.keys(provider.modelUsage||{});assert.ok(model.includes('claude-fable-5')&&model.every(m=>m.startsWith('claude-')),'Unexpected or missing actual Claude model');
   content=provider.structured_output?JSON.stringify(provider.structured_output):provider.result;assert.ok(typeof content==='string'&&content.trim(),'Missing Claude final response');
   content=content.trim().replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }else{
   const choice=provider.choices?.[0];assert.equal(choice?.finish_reason,'stop','Incomplete provider response');
   model=provider.model;assert.ok(model?.startsWith('@cf/google/gemma-4-26b-a4b-it'),'Unexpected provider model');content=choice.message?.content;assert.ok(content,'Missing final content');
  }
  const result=JSON.parse(content),judgmentPath=out+name+'-judgment.json';
  if(fs.existsSync(judgmentPath))assert.deepEqual(json(judgmentPath),result,'Saved judgment changed');else write(judgmentPath,result);
  const checked=normalize(kind,result,packet);
  const record={kind,startedAt:existing?null:start,replayedAt:existing?start:null,completedAt:new Date().toISOString(),requestedModel:providerRoute==='claude'?'claude-fable-5':'@cf/google/gemma-4-26b-a4b-it',providerModel:model,providerId:provider.id||provider.session_id,usage:provider.usage,attestations:result.attestations||{reader:result.reader?.attestations,facts:result.facts?.attestations},requestSha256:sha(read(requestPath)),rawSha256:sha(read(rawPath)),protocolSha256:sha(read('operations/product-stewards/newsstand/review-runtime/protocol.mjs')),registrySha256:sha(read(registryPath)),...checked};
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
if(mode==='reconcile-calibration'){
 const from=privateDirectory(option('--from'));const previous=json(from+'calibration-result.json');
 assert.equal(previous.registrySha256,sha(read(registryPath)),'Saved calibration registry changed');assert.equal(previous.providerRoute,providerRoute);assert.equal(previous.effort||'medium',effort);
 assert.equal(json(policyPath).calibration?.mode,calibrationMode,'Adopted policy required');
 const positive=registry.positiveExemplars.find(e=>e.useFor.includes('NEWS')&&e.status!=='SUPERSEDED_FOR_FULL_NEWS_CALIBRATION');const items=[...registry.negativeExemplars,positive];
 const evaluations=items.map(item=>{const name='sample-'+item.sha256.slice(0,10),actual=json(from+name+'-checked.json');const savedPacket=json(from+name+'-packet.json');assert.deepEqual(json(from+name+'-request.json'),requestFor('calibration',savedPacket),'Saved calibration rubric changed');assert.deepEqual(normalize('calibration',json(from+name+'-judgment.json'),savedPacket).families,actual.families,'Saved calibration judgments changed');assert.equal(actual.registrySha256,sha(read(registryPath)));assert.equal(actual.rawSha256,sha(read(from+name+'-provider.raw.json')));assert.equal(actual.requestSha256,sha(read(from+name+'-request.json')));return {...assessCalibration(item,positive,actual),checkedBinding:{path:from+name+'-checked.json',sha256:sha(read(from+name+'-checked.json'))},rawBinding:{path:from+name+'-provider.raw.json',sha256:actual.rawSha256}}});
 const originalReviewTimes=evaluations.map(e=>Date.parse(json(e.checkedBinding.path).completedAt));assert.ok(originalReviewTimes.length && originalReviewTimes.every(Number.isFinite),'Original calibration completion times required');
 const result={reviewedAt:new Date(Math.max(...originalReviewTimes)).toISOString(),reconciledAt:new Date().toISOString(),status:evaluations.every(e=>e.passed)?'CALIBRATION_PASSED':'HOLD_CALIBRATION',mode:calibrationMode,scope:'Existing blind judgments evaluated under the adopted ordinary-news rejection rule. Original provider judgments and previous strict-label HOLD are preserved; no new model call, factual admission or human evidence.',providerRoute,effort,protocolSha256,registrySha256:sha(read(registryPath)),policy:{path:policyPath,sha256:sha(read(policyPath))},completedAt:new Date().toISOString(),evaluations};write(out+'calibration-result.json',result);console.log(JSON.stringify(result));if(result.status!=='CALIBRATION_PASSED')process.exitCode=1;
}else if(mode==='reference'){
 const input=option('--reference');assert.ok(input,'Reference path required');
 const story=json(input);const packet={readerJob:'A dated ordinary news article for smart professional women without technical AI training: explain the change and its scope, make the mechanism understandable and memorable, preserve limitations and give a useful next action. Assess editorial craft at its stated date, not present-day legal validity.',completeArtifact:read(input),paragraphs:storyParagraphs(story),communicationAuthority:{sha256:sha(read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')),text:read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')}};
 const result=await run('sample-'+sha(read(input)).slice(0,10),'calibration',packet);
 console.log(JSON.stringify({referenceVerdict:result.verdict,admissionAuthority:false}));if(result.verdict!=='PASS')process.exitCode=1;
}else if(mode==='calibrate'){
 const positive=registry.positiveExemplars.find(e=>e.useFor.includes('NEWS')&&e.status!=='SUPERSEDED_FOR_FULL_NEWS_CALIBRATION');assert.ok(positive,'No active NEWS reference');
 const items=[registry.negativeExemplars[1],positive,registry.negativeExemplars[0]];
 const evaluations=[];
 for(const item of items){
  const raw=read(item.path);assert.equal(sha(raw),item.sha256,'Registry artifact drift');
  let packet;
  if(item===positive){let story;if(item.path.endsWith('.json'))story=JSON.parse(raw);else{const sandbox={window:{}};vm.runInNewContext(raw,sandbox,{timeout:1000});story=sandbox.window.NEWSSTAND_DATA.stories.find(s=>s.id===item.locator)}assert.ok(story);packet={readerJob:'A dated ordinary news report for smart professional women without technical training: explain the reported change, its practical meaning and uncertainty, with a useful analogy and next action. Assess its editorial craft at its stated date, not present-day legal validity.',paragraphs:storyParagraphs(story)}}
  else {
   const authorityPath='operations/library-decisions.md';
   const authority=read(authorityPath).split('\n').find(line=>line.startsWith('- AI Fundamentals opens with Ali'));
   assert.ok(authority,'Foundational reader purpose authority is missing');
   packet={readerJob:'The introduction and opening of a broad AI Fundamentals reference book for smart professional women without technical training. The opening must establish all three reader transformations in the supplied purpose authority before technical machinery: understanding a failed AI result, judging hype or panic in public claims, and informed participation in workplace/public decisions about AI. A future technical-topic list is not itself an explanation of these reader payoffs. Warmth is necessary, and the explanation must also serve this broad practical and civic purpose. Examples serve that purpose. Judge the actual opening provided; do not assume an unseen preface already supplied its required motivation.',purposeAuthority:{path:authorityPath,sha256:sha(read(authorityPath)),text:authority},paragraphs:paragraphs(raw)};
  }
  if(providerRoute==='claude')packet.communicationAuthority={sha256:sha(read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')),text:read('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md')};
  const name='sample-'+sha(raw).slice(0,10);
  const expected=item===positive?'PASS':'REJECT';
  let actual;
  try{actual=await run(name,'calibration',packet)}catch(e){evaluations.push({exemplarId:item.id,source:{path:item.path,sha256:item.sha256},sample:name,expected,actual:null,passed:false,failureKind:'EXECUTION_OR_PROTOCOL_FAILURE',failure:String(e),rawOutput:out+name+'-provider.raw.json'});break}
  evaluations.push({...assessCalibration(item,positive,actual),checkedBinding:{path:out+name+'-checked.json',sha256:sha(read(out+name+'-checked.json'))},rawBinding:{path:out+name+'-provider.raw.json',sha256:actual.rawSha256}});
  if(!evaluations.at(-1).passed)break;
 }
 const result={status:evaluations.length===items.length&&evaluations.every(e=>e.passed)?'CALIBRATION_PASSED':'HOLD_CALIBRATION',mode:calibrationMode,scope:'Blind editorial calibration only; no publication, source accuracy or human comprehension claim.',providerRoute,effort,protocolSha256,registrySha256:sha(read(registryPath)),policy:{path:policyPath,sha256:sha(read(policyPath))},notRun:items.slice(evaluations.length).map(e=>e.id),evaluations};write(out+'calibration-result.json',result);console.log(JSON.stringify(result));if(result.status!=='CALIBRATION_PASSED')process.exitCode=1;
}else if(mode==='article'){
 const reportingStory=json(dir+'story.json');
 assert.deepEqual(validateStoryTypeCoverage(json(dir+'story-type-coverage.json'),reportingStory.themes||[],undefined,{story:reportingStory,root}),[],'Repair reporting coverage before calling the independent editor');
 const calibrationDir=privateDirectory(option('--calibration')||out);
 const calibration=json(calibrationDir+'calibration-result.json');assert.equal(calibration.status,'CALIBRATION_PASSED','Calibrate before article assessment');assert.equal(calibration.registrySha256,sha(read(registryPath)));assert.equal(calibration.protocolSha256,protocolSha256,'Calibration protocol changed');assert.equal(calibration.providerRoute,providerRoute,'Calibration provider changed');
 assert.equal(calibration.effort||'medium',effort,'Calibration effort changed');
 assert.equal(calibration.mode,calibrationMode,'Calibration rule changed');assert.equal(calibration.policy?.sha256,sha(read(policyPath)),'Calibration policy changed');
 const producer=json(dir+'producer-publication-review.json');assert.equal(producer.verdict,'PASS','Producer must finish its own repairs first');assert.deepEqual(inspectProseQualityReview(producer,{root}).errors,[],'Producer review is not valid');
 assert.deepEqual(inspectPreparedDraft(json(dir+'story.json'),json(dir+'writer-input-current.json'),json(dir+'producer-observations.json')).errors,[],'Prepared draft has unresolved producer gaps');
 if(fs.existsSync(dir+'editorial-input.json')){
  const packet=json(dir+'editorial-input.json');assert.equal(packet.completeArtifact,read(dir+'review-text.json'),'Editorial input differs from reviewed artifact');assert.equal(producer.artifact.reviewText.sha256,sha(packet.completeArtifact),'Producer reviewed different prose');
  const reuse=option('--reuse-reader-from');
  if(reuse){
   const prior=privateDirectory(reuse),oldPacket=json(prior+'article-editorial-packet.json');
   assert.equal(oldPacket.completeArtifact,packet.completeArtifact,'Reader reuse requires unchanged complete article');
   assert.deepEqual(oldPacket.paragraphs,packet.paragraphs,'Reader passage references changed');
   assert.deepEqual(oldPacket.communicationAuthority,packet.communicationAuthority,'Reader communication authority changed');
   assert.deepEqual(json(prior+'article-editorial-request.json'),requestFor('editorial',oldPacket),'Reader rubric changed');
   const raw=json(prior+'article-editorial-provider.raw.json');assert.equal(raw.is_error,false);assert.equal(raw.subtype,'success');
   assert.ok(Object.keys(raw.modelUsage||{}).includes('claude-fable-5'),'Reader provider changed');
   const actual=raw.structured_output||JSON.parse(raw.result.trim().replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, ''));
   const reader=normalize('reader',actual.reader,oldPacket);assert.equal(reader.verdict,'PASS','Only completed passing reader judgment may be reused');
   const readerReuse={path:prior+'article-editorial-provider.raw.json',sha256:sha(read(prior+'article-editorial-provider.raw.json'))};
   const facts=await run('article-facts','facts',packet);
   const result={reader,facts,verdict:facts.verdict,readerReuse};
   write(out+'article-editorial-checked.json',result);write(out+'article-result.json',{status:result.verdict,reviewTextSha256:sha(packet.completeArtifact),calibrationDirectory:calibrationDir,readerReuse,admissionAuthority:false,reason:'Unchanged full article reader judgment reused; repaired evidence independently reassessed. Full review-chain admission remains required.'});
   if(result.verdict!=='PASS')process.exitCode=1;
  }else {
  const result=await run('article-editorial','editorial',packet);write(out+'article-result.json',{status:result.verdict,reviewTextSha256:sha(packet.completeArtifact),calibrationDirectory:calibrationDir,admissionAuthority:false,reason:'Actual combined editorial judgment; existing full review-chain admission remains required.'});if(result.verdict!=='PASS')process.exitCode=1;
  }
 }else{
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
 }
}else throw Error('Use calibrate, reference or article');
