import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {openReleaseCustody} from './newsstand-release-custody.mjs';
const source='laidies/LAIDIES',destination='laidies/newsstand-automation';
function gh(args,input){const r=spawnSync('gh',args,{input,encoding:'utf8',maxBuffer:1024*1024});if(r.status!==0)throw Error('GITHUB_OPERATION_FAILED');return r.stdout;}
export async function importReleaseCustody({raw,keyB64,runId,expectedSha256,expectedCommit,now=Date.now()}, {github=gh,fetcher=fetch}={}){
 if(!/^[a-f0-9]{40}$/.test(expectedCommit)||!/^\d+$/.test(runId))throw Error('INPUT_INVALID');
 const repo=JSON.parse(github(['api',`repos/${destination}`]));if(repo.full_name!==destination||repo.private!==true)throw Error('DESTINATION_INVALID');
 const run=JSON.parse(github(['api',`repos/${source}/actions/runs/${runId}`]));
 if(String(run.id)!==runId||run.head_sha!==expectedCommit||run.head_branch!=='main'||run.event!=='workflow_dispatch'||run.status!=='completed'||run.conclusion!=='success'||run.path!=='.github/workflows/newsstand-cloud-intake.yml'||run.repository?.full_name!==source)throw Error('SOURCE_RUN_INVALID');
 const value=openReleaseCustody({raw,keyB64,runId,expectedSha256,now});
 const response=await fetcher(`https://api.cloudflare.com/client/v4/accounts/${value.accountId}/pages/projects/laidies-sunnyvaile`,{headers:{Authorization:`Bearer ${value.token}`},redirect:'error',signal:AbortSignal.timeout(30000)});
 const provider=await response.json();if(response.status!==200||provider.success!==true||provider.result?.name!=='laidies-sunnyvaile'||provider.result?.production_branch!=='homepage-redesign')throw Error('PROVIDER_SCOPE_UNVERIFIED');
 github(['secret','set','CLOUDFLARE_ACCOUNT_ID','--repo',destination],value.accountId);
 github(['secret','set','CLOUDFLARE_API_TOKEN','--repo',destination],value.token);
 return {schema:'newsstand-release-custody-import.v1',status:'IMPORTED_PROVIDER_READ_VERIFIED',sourceRunId:runId,sourceCommit:expectedCommit,destination,ciphertextSha256:expectedSha256,plaintextWrittenToDisk:false,publicationActionTaken:false,cloudRuntimeVerified:false};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{
 const [input,runId,expectedSha256,expectedCommit]=process.argv.slice(2),stat=fs.lstatSync(input);
 if(!stat.isFile()||stat.isSymbolicLink()||stat.size>4096||(stat.mode&0o077)!==0)throw Error('INPUT_INVALID');
 const result=await importReleaseCustody({raw:fs.readFileSync(input),keyB64:process.env.NEWSSTAND_RELEASE_TRANSFER_KEY_B64,runId,expectedSha256,expectedCommit});console.log(JSON.stringify(result));
}catch{console.error('RELEASE_CUSTODY_IMPORT_HELD');process.exitCode=2;}}
