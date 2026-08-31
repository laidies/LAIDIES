import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const [base,manifestPath,identity]=process.argv.slice(2);
const root=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(manifest.identitySha256!==identity || sha(manifest.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''))!==identity)throw Error('Base identity mismatch');
const allowed=['content/site/fairy-godmother-v2.js','games/fairy-godmother.html'];
for(const r of manifest.files){
  if(r.path.startsWith('/')||r.path.split('/').includes('..'))throw Error('Unsafe path');
  const bytes=fs.readFileSync(path.join(base,r.path));
  if(sha(bytes)!==r.sha256 || bytes.length!==r.bytes)throw Error('Base bytes changed '+r.path);
}
const output=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-fairy-portraits.'));
const changed=[];
for(const r of manifest.files){
  let bytes=fs.readFileSync(path.join(base,r.path));
  if(r.path===allowed[0])bytes=fs.readFileSync(path.join(root,r.path));
  if(r.path===allowed[1]){
    const before=bytes.toString();
    const matches=before.match(/fairy-godmother-v2\.js\?v=[\w.-]+/g)||[];
    if(matches.length!==1)throw Error('Expected exactly one portrait runtime reference');
    bytes=Buffer.from(before.replace(matches[0],'fairy-godmother-v2.js?v=20260831-portraits-1'));
  }
  const dest=path.join(output,r.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);
  if(sha(bytes)!==r.sha256)changed.push(r.path);
}
if(changed.length!==2 || !allowed.every(p=>changed.includes(p)))throw Error('Unexpected delta');
execFileSync(process.execPath,[path.join(root,'scripts/create-release-manifest.mjs'),output,output+'.manifest.json'],{stdio:'inherit'});
console.log(JSON.stringify({artifact:output,baseIdentity:identity,changed,added:[],removed:[]}));
