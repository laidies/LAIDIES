// Private synthetic pilot through the real guidance handler. No live settings change.
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {handleMissJeevesGuidance} from '../src/miss-jeeves-guidance.js';
const cases=[
  {id:'work-permission',query:'Can I upload a work document to ChatGPT to help me summarize it?'},
  {id:'work-ai-help',query:'My boss wants a weekly project update. How can AI help me prepare it without sharing confidential information?'},
  {id:'clarification',query:'Why did it ignore what I asked?'}
];
const arg=name=>{const i=process.argv.indexOf(name);return i<0?null:process.argv[i+1];};
const outArg=arg('--out');
if (!outArg) throw new Error('Supply --out for a new private results directory. Default mode is offline preflight.');
const live=process.argv.includes('--live');
const keyPath=arg('--key-file');
if (live&&!keyPath) throw new Error('Live pilot requires an explicitly supplied private key file. No provider calls made.');
const limitPath=arg('--provider-limit-evidence');
if(live&&!limitPath) throw new Error('Live pilot requires verified dedicated-project hard-limit evidence.');
const limit=live?JSON.parse(fs.readFileSync(limitPath,'utf8')):null;
if(live&&(!/^proj_[A-Za-z0-9]+$/.test(limit.projectId||'')||limit.hardLimitUsd!==100||limit.hardLimitEnforced!==true||!Number.isFinite(Date.parse(limit.verifiedAt))||Date.now()-Date.parse(limit.verifiedAt)>86400000||Date.parse(limit.verifiedAt)>Date.now())) throw new Error('Missing or stale dedicated-project hard-limit evidence.');
const key=live?fs.readFileSync(keyPath,'utf8').trim():'offline-fixture';
if (live&&!/^sk-[A-Za-z0-9_-]{20,}$/.test(key)) throw new Error('Invalid private key file. No provider calls made.');
const out=path.resolve(outArg);
fs.mkdirSync(out,{recursive:false,mode:0o700});
const journal=path.join(out,'attempts.jsonl');
fs.writeFileSync(journal,'',{flag:'wx',mode:0o600});
function append(row){const fd=fs.openSync(journal,'a');try{fs.writeSync(fd,JSON.stringify(row)+'\n');fs.fsyncSync(fd);}finally{fs.closeSync(fd);}}
const rateKey=createHash('sha256').update('miss-jeeves-private-synthetic-pilot-20260907').digest('hex');
// Three attempts only, with no transport retry. These reservations are pilot
// accounting holds, not claims that production's $3 reservation caps a bill.
const reservationMicroUsd=14_000_000;
const pilotCapMicroUsd=42_000_000;
let reserved=0;
for (const item of cases){
  let receipt=null, captured=null;
  const started=Date.now();
  const provider=async(url,options)=>{
    if(url!=='https://api.openai.com/v1/responses') throw new Error('Unexpected provider destination');
    captured=JSON.parse(options.body);
    if(captured.model!=='gpt-5.6-sol'||captured.max_output_tokens!==1000||captured.max_tool_calls!==2||captured.store!==false||captured.service_tier!=='default') throw new Error('Pilot request boundary changed');
    fs.writeFileSync(path.join(out,item.id+'-request.json'),JSON.stringify(captured,null,2),{flag:'wx',mode:0o600});
    if(!live) return Response.json({status:'completed',model:'gpt-5.6-sol',usage:{input_tokens:0,output_tokens:0},output:[{type:'message',status:'completed',content:[{type:'output_text',text:'CLARIFY: Which AI tool were you using?',annotations:[]}]}]});
    if(reserved+reservationMicroUsd>pilotCapMicroUsd) throw new Error('Pilot ceiling reached');
    reserved+=reservationMicroUsd;
    append({caseId:item.id,state:'reserved_before_dispatch',reservationMicroUsd,reservedMicroUsd:reserved,requestSha256:createHash('sha256').update(options.body).digest('hex')});
    const response=await fetch(url,{...options,headers:{...options.headers,'OpenAI-Project':limit.projectId}});
    // Consume once under the handler's abort signal; avoid an unread tee branch.
    const reader=response.body?.getReader();
    if(!reader) return response;
    let bytes=0;const chunks=[];
    try {
      while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.length;if(bytes>131072){await reader.cancel();throw new Error('Provider receipt too large');}chunks.push(value);}
    } finally {reader.releaseLock();}
    const buffer=Buffer.concat(chunks);
    try{receipt=JSON.parse(buffer.toString());}catch{}
    return new Response(buffer,{status:response.status,headers:response.headers});
  };
  const response=await handleMissJeevesGuidance(new Request('https://miss-jeeves.internal/guidance',{method:'POST',headers:{'content-type':'application/json','x-laidies-rate-key':rateKey},body:JSON.stringify({query:item.query})}),{OPENAI_API_KEY:key},provider);
  const result=await response.json();
  fs.writeFileSync(path.join(out,item.id+'-result.json'),JSON.stringify({caseId:item.id,mode:live?'real-provider':'offline-fixture',httpStatus:response.status,latencyMs:Date.now()-started,result,providerReceipt:receipt},null,2),{flag:'wx',mode:0o600});
  append({caseId:item.id,state:live?'finished_no_retry':'offline_no_spend',httpStatus:response.status,providerAttemptCaptured:!!captured,conservativeChargeMicroUsd:result.research_charge_micro_usd??null});
}
console.log(live?'Real pilot finished; exact answers and provider usage require independent review. No public service changed.':'Offline preflight finished: three exact request captures, zero network calls, zero spend.');
