import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {pathToFileURL} from 'node:url';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
export function materializeRuntime({bundle,outputDirectory}){
 if(bundle?.schema!=='newsstand-hosted-runtime-bundle-v1'||!bundle.files||typeof bundle.files!=='object'||Array.isArray(bundle.files)||!Number.isSafeInteger(bundle.totalBytes)||bundle.totalBytes<1||bundle.totalBytes>20000000)throw Error('INVALID_RUNTIME_BUNDLE');
 const entries=Object.entries(bundle.files);if(!entries.length||entries.length>3000)throw Error('INVALID_RUNTIME_FILE_COUNT');
 const verified=[];let total=0;
 for(const [name,file]of entries){
  if(!/^[a-zA-Z0-9_./-]+$/.test(name)||name.startsWith('/')||name.split('/').some(x=>!x||x==='.'||x==='..')||!file||!/^[a-f0-9]{64}$/.test(file.sha256||'')||!Number.isSafeInteger(file.size)||file.size<0||file.size>8000000||typeof file.content!=='string')throw Error('INVALID_RUNTIME_ENTRY');
  const body=Buffer.from(file.content,'base64');if(body.toString('base64')!==file.content||body.length!==file.size||sha(body)!==file.sha256)throw Error('RUNTIME_BYTES_MISMATCH');
  total+=body.length;if(total>20000000)throw Error('RUNTIME_SIZE_LIMIT');verified.push([name,body]);
 }
 if(total!==bundle.totalBytes)throw Error('RUNTIME_TOTAL_MISMATCH');
 if(fs.existsSync(outputDirectory))throw Error('RUNTIME_ALREADY_EXISTS');
 const parent=fs.realpathSync(path.dirname(path.resolve(outputDirectory)));const target=path.join(parent,path.basename(outputDirectory));
 fs.mkdirSync(target,{mode:0o700});
 for(const [name,body]of verified){const file=path.join(target,name);fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});fs.writeFileSync(file,body,{flag:'wx',mode:0o600});}
 return{status:'RUNTIME_MATERIALIZED',files:verified.length,totalBytes:total,runtimeRoot:target};
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){try{console.log(JSON.stringify(materializeRuntime({bundle:JSON.parse(fs.readFileSync(process.argv[2],'utf8')),outputDirectory:process.argv[3]})));}catch{console.error('PRIVATE_RUNTIME_REJECTED');process.exitCode=2;}}
