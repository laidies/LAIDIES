// Private producer execution. It never projects, deploys, or claims issue admission.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import zlib from 'node:zlib';import {pathToFileURL} from 'node:url';
import {materializeRuntime} from './materialize-newsstand-hosted-runtime.mjs';
import {replayHostedResearch} from './replay-newsstand-hosted-research.mjs';
import {verifyHostedQualification} from './verify-newsstand-hosted-qualification.mjs';
import {loadHostedProducerRuntime,createHostedProducerMetrics} from './load-newsstand-hosted-producer-runtime.mjs';
import {runHostedWriter} from './run-newsstand-hosted-writer.mjs';
import {assembleHostedProducerPackage} from './assemble-newsstand-hosted-producer-package.mjs';
import {reviewHostedCandidate} from './review-newsstand-hosted-candidate.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const trustedCode=JSON.parse(fs.readFileSync(new URL('./newsstand-hosted-runtime-code-pins.json',import.meta.url),'utf8')).files;
const stable=x=>x===null||typeof x!=='object'?JSON.stringify(x):Array.isArray(x)?`[${x.map(stable).join(',')}]`:`{${Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')}}`;
export async function executeHostedProduction({payload,outputDirectory,onProgress = () => {}}) {
 if(payload?.schema!=='newsstand-hosted-production-input.v1'||fs.existsSync(outputDirectory))throw Error('INVALID_PRODUCTION_INPUT');
 fs.mkdirSync(outputDirectory,{recursive:true,mode:0o700});
 const evidence=path.join(outputDirectory,'evidence');fs.mkdirSync(evidence,{mode:0o700});
 const save=(name,value)=>fs.writeFileSync(path.join(evidence,name),JSON.stringify(value,null,2)+'\n',{mode:0o600,flag:'wx'});
 const finish=(stage,status)=>{const result={schema:'newsstand-hosted-production-result.v1',stage,status,publicationActionTaken:false};save('production-result.json',result);return result;};
 try{
  // Reject self-consistent substituted code before any bundle code is imported.
  for(const [name,file] of Object.entries(payload.runtime?.files||{}))if(/\.(mjs|cjs|js)$/.test(name)&&trustedCode[name]!==sha(Buffer.from(file.content,'base64')))throw Error('UNQUALIFIED_RUNTIME_EXECUTABLE');
  for(const name of Object.keys(trustedCode))if(!payload.runtime.files[name])throw Error('MISSING_QUALIFIED_RUNTIME_EXECUTABLE');
  const root=path.join(outputDirectory,'runtime');materializeRuntime({bundle:payload.runtime,outputDirectory:root});
  const controlled=(p)=>{if(typeof p!=='string'||path.isAbsolute(p)||p.split('/').some(x=>x==='..'||x===''))throw Error();const full=path.join(root,p);if(!fs.realpathSync(full).startsWith(root+path.sep))throw Error();return full;};
  const json=p=>JSON.parse(fs.readFileSync(controlled(p),'utf8'));
  const protocol=await import(pathToFileURL(controlled('operations/product-stewards/newsstand/review-runtime/protocol-hosted.mjs')).href);
  const qualification=await verifyHostedQualification({bundle:payload.qualificationInput,files:payload.qualificationFiles,protocol});
  save('qualification.json',qualification);onProgress({stage:'QUALIFICATION',status:qualification.qualified?'VERIFIED':'HELD'});if(!qualification.qualified)return finish('QUALIFICATION','QUALIFICATION_HELD');
  const input=payload.config.inputDirectory,research=input+'/research';
  const admitted=await replayHostedResearch({extraction:json(research+'/extraction.json'),verification:json(research+'/verification.json'),capture:json(research+'/sources/capture.json'),captureDirectory:controlled(research+'/sources'),controlledPlan:json(research+'/controlled-plan.json')});
  save('research-replay.json',admitted);onProgress({stage:'RESEARCH_REPLAY',status:admitted.status});if(admitted.status!=='ADMITTED_RESEARCH_READY')return finish('RESEARCH_REPLAY',admitted.status);
  const runtime=await loadHostedProducerRuntime({runtimeRoot:root});
  const producerContractRaw=fs.readFileSync(controlled(input+'/producer-contract.json'),'utf8'),writerInputRaw=fs.readFileSync(controlled(input+'/writer-input-current.json'),'utf8');
  const contract=JSON.parse(producerContractRaw),frame=json(input+'/story-frame.json');
  const startedAt=new Date().toISOString();onProgress({stage:'PRODUCER',status:'STARTED'});
  const writerResult=await runHostedWriter({producerContractRaw,writerInput:JSON.parse(writerInputRaw),researchPacket:admitted.privateResult.admittedResearch,storyFrame:frame,makerPrincipal:contract.producer,producerRuntime:{schemaVersion:'newsstand-hosted-producer-runtime.v1',checkerPath:'scripts/check-content-producer-contract.mjs',checkerSha256:runtime.checks.strictProducerContractSha256,inspect:c=>runtime.inspectStrictProducerContract(c,{root})}});
  const completedAt=new Date().toISOString();onProgress({stage:'PRODUCER',status:writerResult.status});save('writer.json',{result:writerResult,privateResult:writerResult.privateResult??null,startedAt,completedAt});
  if(writerResult.status!=='PRODUCER_SELF_REVIEW_ASSESSMENT_PASSED')return finish('PRODUCER',writerResult.status);
  const qualificationPath=input+'/qualification-replayed.json';fs.writeFileSync(path.join(root,qualificationPath),JSON.stringify(qualification,null,2)+'\n',{mode:0o600,flag:'wx'});
  const metrics=createHostedProducerMetrics({writerResult,reviewCycles:1,evidenceRounds:1,evidenceGaps:0,repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0});
  const modelQualification={schemaVersion:'newsstand-hosted-model-qualification.v1',qualificationRunId:qualification.runId,qualificationArtifact:{path:qualificationPath,sha256:sha(fs.readFileSync(path.join(root,qualificationPath)))},model:'claude-fable-5',effort:'medium',actualModels:writerResult.model,writerExecution:{startedAt,completedAt,writerProviderRawSha256:sha(stable(writerResult.privateResult.writerProvider)),selfReviewProviderRawSha256:sha(stable(writerResult.privateResult.reviewProvider))}};
  const assembled=assembleHostedProducerPackage({writerResult,producerContractRaw,writerInputRaw,admittedResearch:admitted.privateResult.admittedResearch,packagePlan:{...payload.config.packagePlan,root},metrics,modelQualification,runtime});save('assembly.json',assembled);onProgress({stage:'PRODUCER_PACKAGE',status:assembled.status});
  if(!assembled.producerPackageBuilt)return finish('PRODUCER_PACKAGE',assembled.status);
  const candidate=controlled(assembled.packagePath);
  for(const name of ['producer-contract.json','writer-input-current.json'])fs.copyFileSync(controlled(input+'/'+name),path.join(candidate,name));
  for(const name of fs.readdirSync(candidate)){fs.copyFileSync(path.join(candidate,name),path.join(evidence,'candidate-'+name));fs.chmodSync(path.join(evidence,'candidate-'+name),0o600);}
  if(assembled.status!=='PRODUCER_PACKAGE_READY')return finish('PRODUCER_PACKAGE',assembled.status);
  onProgress({stage:'INDEPENDENT_EDITORIAL',status:'STARTED'});const reviewed=await reviewHostedCandidate({runtimeRoot:root,candidateDirectory:assembled.packagePath,calibrationDirectory:payload.config.calibrationDirectory,outputDirectory:assembled.packagePath+'/independent-review'});
  const reviewDir=path.join(candidate,'independent-review');if(fs.existsSync(reviewDir))for(const name of fs.readdirSync(reviewDir)){fs.copyFileSync(path.join(reviewDir,name),path.join(evidence,'independent-'+name));fs.chmodSync(path.join(evidence,'independent-'+name),0o600);}
  save('independent-result.json',reviewed);return finish('INDEPENDENT_EDITORIAL',reviewed.status);
 }catch(error){let detail=String(error?.stack||error);for(const key of ['CLAUDE_CODE_OAUTH_TOKEN','NEWSSTAND_PRIVATE_HANDOFF_KEY_B64','CLOUDFLARE_API_TOKEN'])if(process.env[key])detail=detail.split(process.env[key]).join('[REDACTED]');save('execution-error.json',{detail});return finish('EXECUTION','PRODUCTION_EXECUTION_HELD');}
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){try{const payload=JSON.parse(zlib.gunzipSync(fs.readFileSync(process.argv[2]),{maxOutputLength:20000000}));const result=await executeHostedProduction({payload,outputDirectory:process.argv[3],onProgress:progress=>console.log(JSON.stringify({schema:'newsstand-hosted-production-progress.v1',...progress,publicationActionTaken:false}))});console.log(JSON.stringify(result));if(result.status!=='HOSTED_CANDIDATE_EDITORIAL_PASS')process.exitCode=2;}catch{console.error('PRIVATE_PRODUCTION_INPUT_REJECTED');process.exitCode=2;}}
