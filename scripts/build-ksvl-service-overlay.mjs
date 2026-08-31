import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const [baseArg,manifestArg,identity,mode]=process.argv.slice(2);
if(mode && !['stickers-only','requests-only'].includes(mode))throw Error('Unknown overlay mode');
const root=path.resolve(import.meta.dirname,'..'),base=path.resolve(baseArg);
const manifest=JSON.parse(fs.readFileSync(manifestArg,'utf8'));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
if(manifest.identitySha256!==identity || sha(manifest.files.map(f=>`${f.sha256}  ${f.path}\n`).join(''))!==identity)throw Error('Base identity mismatch');
const own=new Set(mode==='requests-only'?['radio.html']:['radio.html','laidies-card.html','content/site/resident-continuation-v1.js','content/site/resident-continuation-bootstrap-v1.js','content/site/sv-global-header.js']);
const add=mode==='requests-only'?['content/site/ksvl-requests-v1.js']:mode==='stickers-only'?['content/site/ksvl-stickers-v1.js']:['content/site/ksvl-stickers-v1.js','content/site/ksvl-requests-v1.js'];
const token='20260830-ksvl-service-1';
export function cache(text){return text.replace(/((?:sv-global-header|resident-continuation-bootstrap-v1|resident-continuation-v1)\.js\?v=)20260830-closet-memory-1/g,`$1${token}`);}
const output=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-ksvl-service.'));
const changed=[];
for(const record of manifest.files){
  if(record.path.startsWith('/')||record.path.split('/').includes('..'))throw Error('Unsafe manifest path');
  const old=fs.readFileSync(path.join(base,record.path));
  if(sha(old)!==record.sha256||old.length!==record.bytes)throw Error('Base changed '+record.path);
  let bytes=own.has(record.path)?fs.readFileSync(path.join(root,record.path)):old;
  if(record.path==='radio.html' && mode==='stickers-only'){
    const start='    <!-- ============================================================\n         KSVL · The Sticker Sheet';
    const end='    <!-- ============================================================\n         KSVL · Call in a request';
    const before=old.toString(),after=bytes.toString();
    const a=before.indexOf(start),b=before.indexOf(end,a),c=after.indexOf(start),d=after.indexOf(end,c);
    if(Math.min(a,b,c,d)<0)throw Error('Radio sticker boundary missing');
    bytes=Buffer.from(before.slice(0,a)+after.slice(c,d)+before.slice(b));
  }
  if(record.path.endsWith('.html'))bytes=Buffer.from(cache(bytes.toString()));
  const dest=path.join(output,record.path);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);
  if(sha(bytes)!==record.sha256)changed.push(record.path);
}
for(const file of add){if(manifest.files.some(r=>r.path===file))throw Error('Addition already exists');fs.copyFileSync(path.join(root,file),path.join(output,file));}
execFileSync(process.execPath,[path.join(root,'scripts/create-release-manifest.mjs'),output,output+'.manifest.json'],{stdio:'inherit'});
console.log(JSON.stringify({artifact:output,baseIdentity:identity,changed,added:add,removed:[]}));
