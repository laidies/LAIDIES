import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const [base,manifestPath,identity]=process.argv.slice(2);
const source=path.resolve(import.meta.dirname,'..');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
if(manifest.identitySha256!==identity||sha(manifest.files.map(r=>`${r.sha256}  ${r.path}\n`).join(''))!==identity)throw Error('Base manifest identity mismatch');
const owned=new Set(['content/site/ai-accent-autowrap.js','content/site/brand-polish.js','script.js']);
const token='20260830-native-controls-1';
const output=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-native-brand.'));
const changed=[];
for(const r of manifest.files){
  if(r.path.startsWith('/')||r.path.split('/').includes('..'))throw Error('Unsafe path');
  const old=fs.readFileSync(path.join(base,r.path));
  if(sha(old)!==r.sha256||old.length!==r.bytes)throw Error('Base changed '+r.path);
  let bytes=owned.has(r.path)?fs.readFileSync(path.join(source,r.path)):old;
  if(/\.(html|js)$/.test(r.path))bytes=Buffer.from(bytes.toString().replace(/((?:ai-accent-autowrap|brand-polish|(?<![\w-])script)\.js\?v=)[\w.-]+/g,`$1${token}`));
  const dest=path.join(output,r.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);
  if(sha(bytes)!==r.sha256)changed.push(r.path);
}
if(![...owned].every(p=>changed.includes(p)))throw Error('Expected three formatter changes');
execFileSync(process.execPath,[path.join(source,'scripts/create-release-manifest.mjs'),output,output+'.manifest.json'],{stdio:'inherit'});
console.log(JSON.stringify({artifact:output,baseIdentity:identity,changed,added:[],removed:[]}));
