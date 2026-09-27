// Replay the actual preserved independent judgment; this does not make a new judgment.
import assert from 'node:assert/strict';
import {verifyHostedResearch} from './verify-newsstand-hosted-research.mjs';
const stable=x=>x===null||typeof x!=='object'?JSON.stringify(x):Array.isArray(x)?`[${x.map(stable).join(',')}]`:`{${Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')}}`;
export async function replayHostedResearch({extraction,verification,capture,captureDirectory,controlledPlan}) {
 try {
  if(verification?.result?.status!=='ADMITTED_RESEARCH_READY')throw Error();
  const original=verification.privateResult;
  const requestInput=JSON.parse(original.request.messages[1].content);
  const researchResult={...extraction.result};Object.defineProperty(researchResult,'privateResult',{value:extraction.privateResult});
  const replayed=await verifyHostedResearch({researchResult,capture,captureDirectory,researchPlan:controlledPlan.researchPlan,sourceProfiles:controlledPlan.sourceProfiles,
   extractorIdentity:requestInput.extractorIdentity,reviewerIdentity:requestInput.reviewerIdentity,writerPrincipal:requestInput.writerPrincipal,
   clock:()=>new Date(verification.result.reviewedAt),execute:async input=>{assert.equal(stable(input.request),stable(original.request));return original.provider;}});
  assert.equal(replayed.status,'ADMITTED_RESEARCH_READY');
  for(const key of ['admittedPayloadSha256','verificationRequestSha256','verificationProviderRawSha256','sourceProfilesSha256'])assert.equal(replayed[key],verification.result[key]);
  assert.equal(stable(replayed.privateResult.admittedResearch),stable(original.admittedResearch));
  return replayed;
 }catch{return {status:'RESEARCH_REPLAY_REJECTED',admittedForDrafting:false,publicationActionTaken:false};}
}
