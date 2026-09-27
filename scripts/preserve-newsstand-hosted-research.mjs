import fs from 'node:fs';import path from 'node:path';import zlib from 'node:zlib';import {execFileSync} from 'node:child_process';
import {encryptPrivateEnvelope} from './newsstand-private-envelope.mjs';
try{
 const branch='ops/newsstand-hosted-20260926',run=process.env.GITHUB_RUN_ID,attempt=process.env.GITHUB_RUN_ATTEMPT;
 if(process.env.GITHUB_REPOSITORY!=='laidies/LAIDIES'||process.env.GITHUB_REF!=='refs/heads/'+branch||!/^\d+$/.test(run||'')||!/^\d+$/.test(attempt||''))throw Error();
 const root=process.argv[2],files={};let bytes=0;
 const collect=(dir,prefix='')=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const name=prefix+entry.name;if(entry.isSymbolicLink())throw Error();
  if(entry.isDirectory()){if(name!=='sources')throw Error();collect(path.join(dir,entry.name),name+'/');continue;}
  if(!entry.isFile()||!/^(controlled-plan|extraction|verification|admitted-research|cycle-result)\.json$|^sources\/(capture\.json|[a-zA-Z0-9_-]+\.body)$/.test(name))throw Error();
  const body=fs.readFileSync(path.join(dir,entry.name));bytes+=body.length;if(bytes>20000000)throw Error();files[name]=body.toString('base64');
 }};collect(root);
 const payload=zlib.gzipSync(Buffer.from(JSON.stringify({schema:'newsstand-hosted-research-result.v1',runId:run,attempt,sourceCommit:process.env.GITHUB_SHA,files})));
 const encrypted=encryptPrivateEnvelope({payload,keyB64:process.env.NEWSSTAND_PRIVATE_HANDOFF_KEY_B64,context:'laidies-newsstand',schema:'research-result-v1',runPurpose:`hosted-research-${run}-${attempt}`});
 const destination=`operations/product-stewards/newsstand/hosted-publishing-20260926/research-results/${run}-${attempt}.enc`;
 const result=JSON.parse(execFileSync('gh',['api',`repos/laidies/LAIDIES/contents/${destination}`,'--method','PUT','--input','-'],{input:JSON.stringify({message:`Preserve encrypted hosted research ${run}-${attempt}`,branch,content:encrypted.toString('base64')}),encoding:'utf8',stdio:['pipe','pipe','pipe']}));
 console.log(JSON.stringify({encryptedResult:destination,commit:result.commit.sha,publicationActionTaken:false}));
}catch{console.error('PRIVATE_RESEARCH_PRESERVATION_FAILED');process.exitCode=2;}
