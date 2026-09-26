import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
import {deployHostedTransaction} from './deploy-newsstand-hosted.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'hosted-deploy-test-'));
let serial=0;
async function scenario({gatePass=true,upload=true,browser=true,mutate=false,drift=false,throwProvider=false,extra=false}={}){
 const root=path.join(tmp,String(++serial));fs.mkdirSync(root);const stage=path.join(root,'stage');fs.mkdirSync(stage);
 const delta=[{path:'newsstand.html',sha256:sha('candidate'),bytes:9}];fs.writeFileSync(path.join(stage,'newsstand.html'),'candidate');
 const base={id:'a'.repeat(36),files:{'/newsstand.html':'a'.repeat(32),'/untouched':'b'.repeat(32)}};
 const put=(n,o)=>{const p=path.join(root,n);fs.writeFileSync(p,JSON.stringify(o));return p};
 const input={project:'laidies-sunnyvaile',branch:'homepage-redesign',sourceCommit:'c'.repeat(40),receiptDirectory:path.join(root,'receipt'),stageDirectory:stage,candidateManifestPath:put('manifest.json',{identitySha256:'d'.repeat(64),files:delta}),deltaPath:put('delta.json',delta),providerBasePath:put('base.json',base),preservePath:put('preserve.json',{'/untouched':'b'.repeat(32)}),runtimeRoot:root,browserScript:'browser',chromePath:'/chrome'};
 if(mutate)fs.writeFileSync(path.join(stage,'newsstand.html'),'changed');
 if(extra)fs.writeFileSync(path.join(stage,'index.html'),'unapproved');
 let calls=0,runs=[];
 const result=await deployHostedTransaction(input,{env:{PATH:'/usr/bin',HOME:root,CLOUDFLARE_ACCOUNT_ID:'account',CLOUDFLARE_API_TOKEN:'secret',CLAUDE_CODE_OAUTH_TOKEN:'model-secret',NEWSSTAND_PRIVATE_HANDOFF_KEY_B64:'private-key'},prepare:()=>'/pinned-wrangler',gate:()=>({result:gatePass?'PREPARED_FOR_SEPARATE_DEPLOYMENT':'BLOCKED'}),provider:async()=>{if(throwProvider)throw Error('secret private article');calls++;return calls<3?{...base,id:drift&&calls===2?'drift':base.id}:{...base,id:'b'.repeat(36)};},verify:async()=>({byteVerification:true}),run:async(exe,args,options)=>{runs.push({args,options});return runs.length===1?{ok:upload,output:'secret private output'}:{ok:browser,output:browser?'NEWSSTAND BROWSER PASS checks=73 desktop=1440 mobile=390,320':'SKIP NEWSSTAND BROWSER'};}});
 assert.doesNotMatch(JSON.stringify(result),/secret|private article/);
 for(const run of runs)assert.equal(run.options.env.CLAUDE_CODE_OAUTH_TOKEN,undefined);
 return{result,runs};
}
try{
 const good=await scenario();assert.equal(good.result.status,'PUBLISHED_AND_VERIFIED');assert.equal(good.runs.length,2);assert.equal(good.runs[1].options.env.NEWSSTAND_REQUIRE_BROWSER,'1');
 for(const options of [{gatePass:false},{mutate:true},{drift:true},{throwProvider:true},{extra:true}]){const x=await scenario(options);assert.equal(x.result.status,'PUBLICATION_HELD');assert.equal(x.runs.length,0);}
 const uncertain=await scenario({upload:false});assert.equal(uncertain.result.status,'DEPLOYMENT_ATTEMPT_REQUIRES_RECONCILIATION');assert.equal(uncertain.runs.length,1);
 const reader=await scenario({browser:false});assert.equal(reader.result.code,'LIVE_READER_VERIFICATION_FAILED');assert.equal(reader.result.readerJourneyVerified,false);
 console.log('HOSTED DEPLOY PASS: gate/bytes/head reject before upload; uncertain upload never retries; browser skip fails; model/custody credentials excluded.');
}finally{fs.rmSync(tmp,{recursive:true,force:true})}
