import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {spawn} from 'node:child_process';import {pathToFileURL} from 'node:url';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export async function reviewHostedCandidate({runtimeRoot,candidateDirectory,calibrationDirectory,outputDirectory,token=process.env.CLAUDE_CODE_OAUTH_TOKEN,timeoutMs=480000}){
 const root=fs.realpathSync(runtimeRoot);
 const contained=(value,exists=true)=>{const p=path.resolve(root,value);if(!p.startsWith(path.join(root,'operations/product-stewards')+path.sep))throw Error('PRIVATE_PATH_REQUIRED');if(exists&&!fs.realpathSync(p).startsWith(root+path.sep))throw Error('PRIVATE_PATH_REQUIRED');return p};
 try{
  const candidate=contained(candidateDirectory),calibration=contained(calibrationDirectory),output=contained(outputDirectory,false);
  if(fs.existsSync(output)||!token)throw Error('INPUT_NOT_READY');
  const producer=JSON.parse(fs.readFileSync(path.join(candidate,'producer-publication-review.json'),'utf8'));
  if(producer.maker==='anthropic:claude-fable-5:newsstand-editorial:medium'||producer.reviewer?.principalId==='anthropic:claude-fable-5:newsstand-editorial:medium')throw Error('MAKER_REVIEWER_NOT_DISTINCT');
  const script=path.join(root,'operations/product-stewards/newsstand/review-runtime/run-hosted-pilot.mjs');
  const args=[script,'article','claude','--candidate-dir',path.relative(root,candidate),'--calibration',path.relative(root,calibration),'--output',path.relative(root,output),'--effort','medium'];
  const run=await new Promise(resolve=>{
   const child=spawn(process.execPath,args,{cwd:root,env:{PATH:process.env.PATH,HOME:process.env.HOME,CLAUDE_CODE_OAUTH_TOKEN:token},stdio:['ignore','pipe','pipe']});let log='',bytes=0,failed=false;
   const timer=setTimeout(()=>{failed=true;child.kill('SIGKILL')},timeoutMs);
   for(const stream of[child.stdout,child.stderr])stream.on('data',b=>{bytes+=b.length;if(bytes>3000000){failed=true;child.kill('SIGKILL')}else log+=b.toString()});child.on('error',()=>{failed=true});child.on('close',code=>{clearTimeout(timer);resolve({code,failed,log})});
  });
  if(fs.existsSync(output))fs.writeFileSync(path.join(output,'runner-private.log'),run.log.split(token).join('[REDACTED]'),{flag:'wx',mode:0o600});
  const resultPath=path.join(output,'article-result.json');
  if(run.code!==0||run.failed||!fs.existsSync(resultPath))return{status:'CANDIDATE_REVIEW_HELD',admissionAuthority:false,publicationActionTaken:false};
  const result=JSON.parse(fs.readFileSync(resultPath,'utf8'));
  if(result.status!=='PASS')return{status:'CANDIDATE_REVIEW_HELD',admissionAuthority:false,publicationActionTaken:false};
  return{status:'HOSTED_CANDIDATE_EDITORIAL_PASS',resultSha256:sha(fs.readFileSync(resultPath)),admissionAuthority:false,publicationActionTaken:false};
 }catch{return{status:'CANDIDATE_REVIEW_INPUT_REJECTED',admissionAuthority:false,publicationActionTaken:false};}
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){try{const result=await reviewHostedCandidate(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify(result));if(result.status!=='HOSTED_CANDIDATE_EDITORIAL_PASS')process.exitCode=2;}catch{console.error('HOSTED_REVIEW_INPUT_INVALID');process.exitCode=2;}}
