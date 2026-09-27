import fs from 'node:fs';import path from 'node:path';import zlib from 'node:zlib';import {pathToFileURL} from 'node:url';
import {materializeRuntime} from './materialize-newsstand-hosted-runtime.mjs';
import {verifyHostedQualification} from './verify-newsstand-hosted-qualification.mjs';
import {reviewHostedCandidate} from './review-newsstand-hosted-candidate.mjs';
try{
 const [input,output]=process.argv.slice(2);if(!input||!output||fs.existsSync(output))throw Error();
 const payload=JSON.parse(zlib.gunzipSync(fs.readFileSync(input),{maxOutputLength:20000000}));
 if(payload.schema!=='newsstand-hosted-candidate-exercise-v1')throw Error();
 fs.mkdirSync(output,{mode:0o700});const runtimeRoot=path.join(output,'runtime');materializeRuntime({bundle:payload.runtime,outputDirectory:runtimeRoot});
 const protocol=await import(pathToFileURL(path.join(runtimeRoot,'operations/product-stewards/newsstand/review-runtime/protocol-hosted.mjs')).href);
 const qualification=await verifyHostedQualification({bundle:payload.qualificationInput,files:payload.qualificationFiles,protocol});if(!qualification.qualified)throw Error();
 const result=await reviewHostedCandidate({...payload.config,runtimeRoot});
 const review=path.join(runtimeRoot,payload.config.outputDirectory),evidence=path.join(output,'evidence');fs.mkdirSync(evidence,{mode:0o700});
 if(fs.existsSync(review))for(const name of fs.readdirSync(review)){if(!/^article-(?:editorial-(?:packet|request|provider\.raw|judgment|checked)|result)\.json$|^runner-private\.log$/.test(name))throw Error();fs.copyFileSync(path.join(review,name),path.join(evidence,name));fs.chmodSync(path.join(evidence,name),0o600);}
 fs.writeFileSync(path.join(evidence,'exercise-result.json'),JSON.stringify({...result,qualification,scope:'Private full-cloud editorial review of an exact candidate; no publication.'},null,2)+'\n',{mode:0o600});
 console.log(JSON.stringify(result));if(result.status!=='HOSTED_CANDIDATE_EDITORIAL_PASS')process.exitCode=2;
}catch{console.error('PRIVATE_CANDIDATE_EXERCISE_FAILED');process.exitCode=2;}
