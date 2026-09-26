// Actual provider-preserving uploader. Editorial/issue admission must precede this call.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {prepareWrangler} from './patch-newsstand-hosted-wrangler.mjs';
import {readProvider} from './read-newsstand-hosted-provider.mjs';
import {prepareHostedRelease} from './prepare-newsstand-hosted-release.mjs';
import {verifyNewsstandHostedLive} from './verify-newsstand-hosted-live.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const json=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
async function command(executable,args,{cwd,env,timeoutMs=600000}){
 return new Promise(resolve=>{
  const child=spawn(executable,args,{cwd,env,stdio:['ignore','pipe','pipe']});let bytes=0,output='',failed=false;
  const timer=setTimeout(()=>{failed=true;child.kill('SIGKILL')},timeoutMs);
  for(const stream of [child.stdout,child.stderr])stream.on('data',b=>{bytes+=b.length;if(bytes>2000000){failed=true;child.kill('SIGKILL')}else output+=b.toString()});
  child.on('error',()=>{failed=true});child.on('close',code=>{clearTimeout(timer);resolve({ok:code===0&&!failed,output})});
 });
}
export async function deployHostedTransaction(input,{provider=readProvider,run=command,verify=verifyNewsstandHostedLive,prepare=prepareWrangler,gate=prepareHostedRelease,env=process.env}={}){
 let attempted=false;let deployedId=null;
 const save=(name,value)=>fs.writeFileSync(path.join(input.receiptDirectory,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
 try{
  if(!/^[a-f0-9]{40}$/.test(input.sourceCommit||'')||input.project!=='laidies-sunnyvaile'||input.branch!=='homepage-redesign')throw Error('INVALID_TRANSACTION_IDENTITY');
  if(!env.CLOUDFLARE_API_TOKEN||!env.CLOUDFLARE_ACCOUNT_ID)throw Error('AUTH_MISSING');
  if(fs.existsSync(input.receiptDirectory))throw Error('RECEIPT_DIRECTORY_EXISTS');
  fs.mkdirSync(input.receiptDirectory,{recursive:true,mode:0o700});
  const manifest=json(input.candidateManifestPath),delta=json(input.deltaPath),preserve=json(input.preservePath),base=json(input.providerBasePath);
  const staged=fs.realpathSync(input.stageDirectory);
  for(const f of [...delta,...manifest.files.filter(x=>['_worker.js','_redirects'].includes(x.path))]){
   if(typeof f.path!=='string'||path.posix.isAbsolute(f.path)||f.path.includes('..')||f.path.includes('\\'))throw Error('UNSAFE_ARTIFACT_PATH');
   const target=fs.realpathSync(path.join(staged,f.path));if(!target.startsWith(staged+path.sep))throw Error('UNSAFE_ARTIFACT_PATH');
   const body=fs.readFileSync(target);if(sha(body)!==f.sha256||body.length!==f.bytes)throw Error('STAGED_BYTES_CHANGED');
  }
  const expectedPreserve={...base.files};for(const f of delta)delete expectedPreserve['/'+f.path];
  if(!same(Object.entries(preserve).sort(),Object.entries(expectedPreserve).sort()))throw Error('PRESERVATION_CHANGED');
  const auth={accountId:env.CLOUDFLARE_ACCOUNT_ID,token:env.CLOUDFLARE_API_TOKEN};
  const current=await provider(auth);save('provider-before.json',current);
  if(current.id!==base.id||!same(current.files,base.files))throw Error('PROVIDER_CHANGED');
  const currentPath=path.join(input.receiptDirectory,'provider-before.json');
  const readiness=gate({...input,currentProviderHeadPath:currentPath});
  if(readiness.result!=='PREPARED_FOR_SEPARATE_DEPLOYMENT')throw Error('RELEASE_GATE_REJECTED');
  save('release-preparation.json',readiness);
  const cli=prepare(input.wranglerPackageDirectory);
  // Never pass model credentials or the private custody key to the deployment process.
  const deployEnv={PATH:env.PATH,HOME:env.HOME,CI:'true',CLOUDFLARE_API_TOKEN:auth.token,CLOUDFLARE_ACCOUNT_ID:auth.accountId,LAIDIES_PRESERVE_MANIFEST:path.resolve(input.preservePath),WRANGLER_SEND_METRICS:'false',NO_COLOR:'1'};
  const immediatelyBefore=await provider(auth);if(immediatelyBefore.id!==base.id||!same(immediatelyBefore.files,base.files))throw Error('PROVIDER_CHANGED_BEFORE_UPLOAD');
  attempted=true;save('deployment-attempt.json',{attemptedAt:new Date().toISOString(),sourceCommit:input.sourceCommit,predecessorId:base.id,artifactIdentitySha256:manifest.identitySha256});
  const uploaded=await run(process.execPath,[cli,'pages','deploy',staged,'--project-name',input.project,'--branch',input.branch,'--commit-hash',input.sourceCommit,'--commit-dirty=true'],{cwd:input.receiptDirectory,env:deployEnv});
  if(!uploaded.ok)throw Error('UPLOAD_UNCERTAIN_DO_NOT_RETRY');
  const after=await provider(auth);deployedId=after.id;save('provider-after.json',after);
  if(after.id===base.id)throw Error('DEPLOYMENT_NOT_ADVANCED');
  const live=await verify({predecessorFiles:base.files,manifest,delta,deploymentId:after.id,providerAPI:()=>provider(auth)});
  save('live-bytes.json',live);
  // The actual browser suite must be in the admitted private runtime; no skip counts as success.
  const browser=await run(process.execPath,[input.browserScript],{cwd:input.runtimeRoot,env:{PATH:env.PATH,HOME:env.HOME,NEWSSTAND_ROOT:input.runtimeRoot,NEWSSTAND_PUBLIC_ORIGIN:'https://laidies.ai',NEWSSTAND_CHROME_PATH:input.chromePath,NEWSSTAND_REQUIRE_BROWSER:'1'},timeoutMs:300000});
  if(!browser.ok||!/NEWSSTAND BROWSER PASS checks=\d+/.test(browser.output))throw Error('LIVE_READER_VERIFICATION_FAILED');
  save('reader-journey.json',{status:'VERIFIED',checkedAt:new Date().toISOString(),outputSha256:sha(browser.output),result:browser.output.match(/NEWSSTAND BROWSER PASS[^\n]*/)[0]});
  const final=await provider(auth);if(final.id!==after.id)throw Error('PROVIDER_CHANGED_DURING_READER_CHECK');
  const result={status:'PUBLISHED_AND_VERIFIED',deploymentId:after.id,sourceCommit:input.sourceCommit,artifactIdentitySha256:manifest.identitySha256,byteVerification:true,readerJourneyVerified:true};save('result.json',result);return result;
 }catch(error){
  const code=/^[A-Z_]+$/.test(error.message)?error.message:'HOSTED_PUBLICATION_FAILED';
  const result={status:attempted?'DEPLOYMENT_ATTEMPT_REQUIRES_RECONCILIATION':'PUBLICATION_HELD',code,deploymentAttempted:attempted,deploymentId:deployedId,readerJourneyVerified:false};
  if(fs.existsSync(input.receiptDirectory)&&!fs.existsSync(path.join(input.receiptDirectory,'result.json')))save('result.json',result);
  return result;
 }
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){
 try{const result=await deployHostedTransaction(json(process.argv[2]));console.log(JSON.stringify(result));if(result.status!=='PUBLISHED_AND_VERIFIED')process.exitCode=2;}
 catch{console.error('HOSTED_TRANSACTION_INPUT_INVALID');process.exitCode=2;}
}
