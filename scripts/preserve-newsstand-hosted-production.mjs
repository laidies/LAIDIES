import fs from 'node:fs';import path from 'node:path';import zlib from 'node:zlib';import {execFileSync} from 'node:child_process';
import {encryptPrivateEnvelope} from './newsstand-private-envelope.mjs';
try{
 const branch='ops/newsstand-hosted-20260926',run=process.env.GITHUB_RUN_ID,attempt=process.env.GITHUB_RUN_ATTEMPT;
 if(process.env.GITHUB_REPOSITORY!=='laidies/LAIDIES'||process.env.GITHUB_REF!=='refs/heads/'+branch||!/^\d+$/.test(run||'')||!/^\d+$/.test(attempt||''))throw Error();
 const root=process.argv[2],files={};let bytes=0;
 for(const name of fs.readdirSync(root)){
  if(!/^(qualification|research-replay|writer|assembly|independent-result|production-result|execution-error)\.json$|^candidate-[a-z-]+\.(json|html)$|^independent-(article-[a-z.-]+\.json|runner-private\.log)$/.test(name))throw Error();
  const full=path.join(root,name),stat=fs.lstatSync(full);if(!stat.isFile()||stat.isSymbolicLink())throw Error();const body=fs.readFileSync(full);bytes+=body.length;if(bytes>12000000)throw Error();files[name]=body.toString('base64');
 }
 const payload=zlib.gzipSync(Buffer.from(JSON.stringify({schema:'newsstand-hosted-production-result-envelope.v1',runId:run,attempt,sourceCommit:process.env.GITHUB_SHA,files})));
 const encrypted=encryptPrivateEnvelope({payload,keyB64:process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64,context:'laidies-newsstand',schema:'production-result-v1',runPurpose:`hosted-production-${run}-${attempt}`});
 const destination=`operations/product-stewards/newsstand/hosted-publishing-20260926/production-results/${run}-${attempt}.enc`;
 const result=JSON.parse(execFileSync('gh',['api',`repos/laidies/LAIDIES/contents/${destination}`,'--method','PUT','--input','-'],{input:JSON.stringify({message:`Preserve encrypted hosted producer ${run}-${attempt}`,branch,content:encrypted.toString('base64')}),encoding:'utf8',stdio:['pipe','pipe','pipe']}));
 console.log(JSON.stringify({encryptedResult:destination,commit:result.commit.sha,publicationActionTaken:false}));
}catch{console.error('PRIVATE_PRODUCTION_PRESERVATION_FAILED');process.exitCode=2;}
