import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const schema='newsstand-release-custody.v1';
const source='laidies/LAIDIES', destination='laidies/newsstand-automation';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const exact=(o,keys)=>o&&typeof o==='object'&&!Array.isArray(o)&&Object.keys(o).sort().join(',')===keys.sort().join(',');
function key(value){const b=Buffer.from(value||'','base64');if(b.length!==32||b.toString('base64')!==value)throw Error('KEY_INVALID');return b;}
function credentials(value){if(!exact(value,['accountId','token'])||!/^[a-f0-9]{32}$/.test(value.accountId)||!/^[A-Za-z0-9_-]{20,256}$/.test(value.token))throw Error('CREDENTIALS_INVALID');return value;}
export function sealReleaseCustody({accountId,token,keyB64,runId,now=Date.now()}){
 if(!/^\d+$/.test(runId)||!Number.isFinite(now))throw Error('RUN_INVALID');
 const header={schema,source,destination,runId,createdAt:now,expiresAt:now+30*60*1000};
 const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key(keyB64),iv);
 cipher.setAAD(Buffer.from(JSON.stringify(header)));
 const body=Buffer.concat([cipher.update(JSON.stringify(credentials({accountId,token}))),cipher.final()]);
 return Buffer.from(JSON.stringify({header,iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),body:body.toString('base64')})+'\n');
}
export function openReleaseCustody({raw,keyB64,runId,expectedSha256,now=Date.now()}){
 if(!Buffer.isBuffer(raw)||raw.length>4096||!Number.isFinite(now)||!/^\d+$/.test(runId)||sha(raw)!==expectedSha256)throw Error('CUSTODY_HASH_INVALID');
 const sealed=JSON.parse(raw),h=sealed.header;
 if(!exact(sealed,['header','iv','tag','body'])||!exact(h,['schema','source','destination','runId','createdAt','expiresAt'])||h.schema!==schema||h.source!==source||h.destination!==destination||h.runId!==runId||!Number.isFinite(h.createdAt)||h.expiresAt!==h.createdAt+1800000||h.createdAt>now||h.expiresAt<=now)throw Error('CUSTODY_SCOPE_INVALID');
 const iv=Buffer.from(sealed.iv,'base64'),tag=Buffer.from(sealed.tag,'base64');if(iv.length!==12||tag.length!==16)throw Error('CUSTODY_INVALID');
 const decipher=crypto.createDecipheriv('aes-256-gcm',key(keyB64),iv);decipher.setAAD(Buffer.from(JSON.stringify(h)));decipher.setAuthTag(tag);
 return credentials(JSON.parse(Buffer.concat([decipher.update(Buffer.from(sealed.body,'base64')),decipher.final()])));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{
  if(process.argv[2]!=='seal'||process.env.GITHUB_REPOSITORY!==source||process.env.GITHUB_REF!=='refs/heads/main'||process.env.GITHUB_EVENT_NAME!=='workflow_dispatch')throw Error('ROUTE_INVALID');
  const out=process.argv[3],stat=fs.lstatSync(out);if(!path.isAbsolute(out)||stat.isSymbolicLink()||!stat.isDirectory()||(stat.mode&0o077)!==0||fs.realpathSync(out)!==out)throw Error('DIRECTORY_INVALID');
  const raw=sealReleaseCustody({accountId:process.env.CLOUDFLARE_ACCOUNT_ID,token:process.env.CLOUDFLARE_API_TOKEN,keyB64:process.env.NEWSSTAND_RELEASE_TRANSFER_KEY_B64,runId:process.env.GITHUB_RUN_ID});
  fs.writeFileSync(path.join(out,'release-custody.enc'),raw,{flag:'wx',mode:0o600});
  fs.writeFileSync(path.join(out,'receipt.json'),JSON.stringify({schema,runId:process.env.GITHUB_RUN_ID,ciphertextSha256:sha(raw)})+'\n',{flag:'wx',mode:0o600});
  console.log('RELEASE_CUSTODY_SEALED');
 }catch{console.error('RELEASE_CUSTODY_REJECTED');process.exitCode=2;}
}
