// Replays the exact blinded qualification against authenticated private evidence.
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {calibrateHosted} from './calibrate-newsstand-hosted.mjs';
import {QUALIFIED_PROTOCOL,runHostedEditorial} from './run-newsstand-hosted-editorial.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const serial=x=>JSON.stringify(x,null,2)+'\n';
export async function verifyHostedQualification({bundle,files,protocol}) {
  try {
    const recorded=JSON.parse(files['calibration-result.json']);
    if(recorded.status!=='CALIBRATION_PASSED'||!/^\d+$/.test(recorded.hosted?.runId||'')||!recorded.evaluations?.length||recorded.notRun?.length) throw Error();
    if(recorded.protocolSha256!==QUALIFIED_PROTOCOL.sha256||recorded.registrySha256!==QUALIFIED_PROTOCOL.registrySha256||recorded.effort!==QUALIFIED_PROTOCOL.effort) throw Error();
    assert.deepEqual(recorded.policy,bundle.policy);
    for(const item of recorded.evaluations){
      for(const binding of [item.checkedBinding,item.rawBinding]){
        if(!binding||!/^sample-[a-f0-9]{10}-(checked|provider.raw)\.json$/.test(binding.path)||typeof files[binding.path]!=='string'||sha(files[binding.path])!==binding.sha256)throw Error();
      }
      const checked=JSON.parse(files[item.checkedBinding.path]);
      const provider=JSON.parse(files[item.rawBinding.path]);
      const packet=JSON.parse(files[item.sample+'-packet.json']);
      const request=protocol.requestFor('calibration',packet);
      assert.deepEqual(request,JSON.parse(files[item.sample+'-request.json']));
      if(checked.requestSha256!==sha(serial(request))||checked.rawSha256!==sha(files[item.rawBinding.path])||provider.is_error||provider.subtype!=='success'||!Object.keys(provider.modelUsage||{}).includes(QUALIFIED_PROTOCOL.model))throw Error();
      const normalized=protocol.normalize('calibration',provider.structured_output,packet);
      if(normalized.verdict!==item.actual||normalized.verdict!==checked.verdict)throw Error();
      assert.deepEqual(normalized.families,checked.families);
    }
    let index=0;
    const replay=await calibrateHosted({bundle,protocol,save:async()=>{},execute:async({request,model,effort})=>{
      const item=recorded.evaluations[index++];
      assert.deepEqual(request,JSON.parse(files[item.sample+'-request.json']));
      assert.equal(model,QUALIFIED_PROTOCOL.model);assert.equal(effort,QUALIFIED_PROTOCOL.effort);
      return JSON.parse(files[item.rawBinding.path]);
    }});
    if(replay.status!=='CALIBRATION_PASSED'||index!==recorded.evaluations.length)throw Error();
    return {status:'HOSTED_QUALIFICATION_VERIFIED',qualified:true,runId:recorded.hosted.runId,sourceCommit:recorded.hosted.sourceCommit,protocolSha256:recorded.protocolSha256,registrySha256:recorded.registrySha256,calibrationSha256:sha(files['calibration-result.json']),sampleCount:index,publicationActionTaken:false};
  }catch{return {status:'HOSTED_QUALIFICATION_REJECTED',qualified:false,publicationActionTaken:false};}
}
export async function runQualifiedHostedEditorial({bundle,files,protocol,packet,execute}){
  const qualification=await verifyHostedQualification({bundle,files,protocol});
  if(!qualification.qualified)return qualification;
  const outcome=await runHostedEditorial({packet,protocol,protocolIdentity:QUALIFIED_PROTOCOL,execute});
  outcome.qualification=qualification;
  outcome.editorialQualificationEstablished=true;
  // Editorial judgment is still not factual, art, issue or release admission.
  return outcome;
}
