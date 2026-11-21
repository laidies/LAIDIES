import assert from 'node:assert/strict';
import {selectSemanticType} from './select-newsstand-semantic-type.mjs';
const packet={decision:'ADMIT_FOR_DRAFTING',candidateId:'mixed-fixture',claims:[{claimId:'release',claim:'A product release with a reported safety incident.'}]};
const research={path:'fixtures/research.json',sha256:'a'.repeat(64)};
const policy={storyTypeContract:{primaryTypes:['model-tool-release','safety-incident']}};
const modules={types:{'model-tool-release':{questions:['availability']},'safety-incident':{questions:['harm']},'legal-policy':{questions:['jurisdiction']}}};
const good={candidateId:packet.candidateId,researchSha256:research.sha256,assessments:{'model-tool-release':{role:'PRIMARY',reason:'The event is a model release.'},'safety-incident':{role:'OVERLAY',reason:'The admitted claims include an actual incident.'},'legal-policy':{role:'NOT_APPLICABLE',reason:'No legal event is in the admitted claims.'}}};
const args={packet,research,policy,modules};let request;
const respond=data=>async x=>{request=x.request;return {is_error:false,requestedModel:'gpt-5.6-terra',structured_output:data}};
const result=await selectSemanticType({...args,execute:respond(good)});assert.equal(result.primaryType,'model-tool-release');assert.deepEqual(result.overlays,['safety-incident']);assert.equal(result.authority,'PRODUCER_PLANNING_ONLY_NOT_EDITORIAL_ADMISSION');assert.deepEqual(JSON.parse(request.messages[1].content).packet,packet);
for(const mutate of [x=>delete x.assessments['safety-incident'],x=>x.assessments['unknown']={role:'OVERLAY',reason:'invented'},x=>x.assessments['safety-incident'].role='PRIMARY',x=>x.assessments['model-tool-release'].role='NOT_APPLICABLE',x=>x.assessments['legal-policy'].role='PRIMARY',x=>x.assessments['legal-policy'].reason='  ',x=>x.researchSha256='b'.repeat(64),x=>x.candidateId='other']) {const data=structuredClone(good);mutate(data);await assert.rejects(()=>selectSemanticType({...args,execute:respond(data)}),/TYPE_PLAN_(PROVIDER|SELECTION)_HELD/);}
await assert.rejects(()=>selectSemanticType({...args,execute:async()=>({is_error:false,requestedModel:'other',structured_output:good})}),/TYPE_PLAN_PROVIDER_HELD/);
let called=false;await assert.rejects(()=>selectSemanticType({...args,packet:{...packet,decision:'HOLD'},execute:async()=>{called=true}}),/TYPE_PLAN_INPUT_HELD/);assert.equal(called,false);
console.log('PASS type routing: mixed modules, every exclusion, wrong candidate/hash/model, missing/unknown module, multiple/no/disallowed primary and unadmitted input');
