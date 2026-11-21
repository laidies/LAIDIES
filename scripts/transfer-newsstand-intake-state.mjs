import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {encryptPrivateEnvelope, decryptPrivateEnvelope} from './newsstand-private-envelope.mjs';
const digest=raw=>crypto.createHash('sha256').update(raw).digest('hex');
function identity(cacheKey,runId){
 if(!/^newsstand-cloud-intake-[0-9]+$/.test(cacheKey||'')||!/^\d+$/.test(runId||''))throw Error('INTAKE_TRANSFER_IDENTITY_INVALID');
}
function validate(raw){
 if(!Buffer.isBuffer(raw)||raw.length>2000000)throw Error('INTAKE_STATE_INVALID');
 const state=JSON.parse(raw);
 if(state.schemaVersion!=='newsstand-cloud-intake-state-v2'||!Number.isFinite(Date.parse(state.updatedAt))||!state.sources||Array.isArray(state.sources)||typeof state.sources!=='object'||Object.keys(state.sources).length===0)throw Error('INTAKE_STATE_INVALID');
 for(const [id,value] of Object.entries(state.sources))if(!/^SRC-[A-Z0-9-]+$/.test(id)||!value||typeof value!=='object'||Array.isArray(value))throw Error('INTAKE_STATE_INVALID');
 return state;
}
export function sealIntakeState({raw,cacheKey,runId,keyB64}){
 identity(cacheKey,runId);validate(raw);
 const payload=Buffer.from(JSON.stringify({schema:'newsstand-intake-state-transfer.v1',source:'laidies/LAIDIES',destination:'laidies/newsstand-automation',cacheKey,runId,sha256:digest(raw),bytes:raw.length,raw:raw.toString('base64')}));
 return encryptPrivateEnvelope({payload,keyB64,context:'laidies-intake-migration',schema:'intake-state-transfer-v1',runPurpose:`intake-state-${runId}`});
}
export function openIntakeState({ciphertext,cacheKey,runId,keyB64,expectedSha256}){
 identity(cacheKey,runId);if(digest(ciphertext)!==expectedSha256)throw Error('INTAKE_TRANSFER_HASH_INVALID');
 const payload=decryptPrivateEnvelope({envelope:ciphertext,keyB64,context:'laidies-intake-migration',schema:'intake-state-transfer-v1',runPurpose:`intake-state-${runId}`});
 const x=JSON.parse(payload);if(x.schema!=='newsstand-intake-state-transfer.v1'||x.source!=='laidies/LAIDIES'||x.destination!=='laidies/newsstand-automation'||x.cacheKey!==cacheKey||x.runId!==runId)throw Error('INTAKE_TRANSFER_SCOPE_INVALID');
 const raw=Buffer.from(x.raw,'base64');if(raw.length!==x.bytes||digest(raw)!==x.sha256)throw Error('INTAKE_STATE_HASH_INVALID');validate(raw);return raw;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){try{
 if(process.env.GITHUB_REPOSITORY!=='laidies/LAIDIES'||process.env.GITHUB_REF!=='refs/heads/main'||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch')throw Error('ROUTE_INVALID');
 const [file,out]=process.argv.slice(2);const stat=fs.lstatSync(file);if(!stat.isFile()||stat.isSymbolicLink()||stat.size>2000000)throw Error('INPUT_INVALID');
 const raw=fs.readFileSync(file);const sealed=sealIntakeState({raw,cacheKey:process.env.INTAKE_CACHE_KEY,runId:process.env.GITHUB_RUN_ID,keyB64:process.env.NEWSSTAND_INTAKE_TRANSFER_KEY_B64});
 fs.writeFileSync(out,sealed,{mode:0o600,flag:'wx'});fs.writeFileSync(out+'.receipt.json',JSON.stringify({schema:'newsstand-intake-state-transfer-receipt.v1',runId:process.env.GITHUB_RUN_ID,cacheKey:process.env.INTAKE_CACHE_KEY,ciphertextSha256:digest(sealed),stateSha256:digest(raw),stateBytes:raw.length})+'\n',{mode:0o600,flag:'wx'});
 console.log('INTAKE_STATE_SEALED; schedulerChanged=false');
}catch{console.error('INTAKE_STATE_TRANSFER_HELD');process.exitCode=2;}}
