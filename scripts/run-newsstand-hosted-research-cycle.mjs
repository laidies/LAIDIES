// A real source capture and two distinct model sessions; never a publication receipt.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {captureSources} from './capture-newsstand-hosted-sources.mjs';
import {runHostedResearch} from './run-newsstand-hosted-research.mjs';
import {verifyHostedResearch} from './verify-newsstand-hosted-research.mjs';

export async function runResearchCycle({plan,outputDirectory,runId},{capture=captureSources,extract=runHostedResearch,verify=verifyHostedResearch}={}) {
  if(!/^[a-zA-Z0-9_-]{1,100}$/.test(runId||'')||!plan?.capturePlan||!plan?.researchPlan||!Array.isArray(plan.sourceProfiles)||fs.existsSync(outputDirectory))throw Error('INVALID_RESEARCH_CYCLE');
  fs.mkdirSync(outputDirectory,{recursive:true,mode:0o700});
  const save=(name,value)=>fs.writeFileSync(path.join(outputDirectory,name),JSON.stringify(value,null,2)+'\n',{mode:0o600,flag:'wx'});
  const preserve=(name,result)=>save(name,{result,privateResult:result.privateResult??null});
  const finish=(stage,status)=>{const result={schema:'newsstand-hosted-research-cycle.v1',stage,status,runId,publicationActionTaken:false};save('cycle-result.json',result);return result;};
  try {
    save('controlled-plan.json',plan);
    const captureDirectory=path.join(outputDirectory,'sources');
    const captured=await capture({...plan.capturePlan,outputDirectory:captureDirectory});
    if(captured.records.some(x=>x.status!=='CAPTURED_REQUIRES_SOURCE_REVIEW'))return finish('SOURCE_CAPTURE','HELD_SOURCE_UNAVAILABLE');
    const extracted=await extract({capture:captured,captureDirectory,researchPlan:plan.researchPlan});
    preserve('extraction.json',extracted);
    if(extracted.status!=='RESEARCH_TRANSPORT_SUCCESS')return finish('EXTRACTION',extracted.status);
    const verified=await verify({researchResult:extracted,capture:captured,captureDirectory,researchPlan:plan.researchPlan,sourceProfiles:plan.sourceProfiles,
      extractorIdentity:{principalId:`anthropic:hosted-research-extractor:${runId}`,sessionId:`extract-${runId}`},
      reviewerIdentity:{principalId:`anthropic:hosted-research-reviewer:${runId}`,sessionId:`verify-${runId}`},
      writerPrincipal:`anthropic:hosted-writer:${runId}`});
    preserve('verification.json',verified);
    if(verified.status!=='ADMITTED_RESEARCH_READY')return finish('INDEPENDENT_SOURCE_REVIEW',verified.status);
    save('admitted-research.json',verified.privateResult.admittedResearch);
    return finish('INDEPENDENT_SOURCE_REVIEW','ADMITTED_RESEARCH_READY');
  }catch{return finish('EXECUTION','RESEARCH_CYCLE_FAILED');}
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){
  try{const result=await runResearchCycle({plan:JSON.parse(fs.readFileSync(process.argv[2],'utf8')),outputDirectory:process.argv[3],runId:process.argv[4]});console.log(JSON.stringify(result));if(result.status!=='ADMITTED_RESEARCH_READY')process.exitCode=2;}
  catch{console.error('RESEARCH_CYCLE_INPUT_REJECTED');process.exitCode=2;}
}
