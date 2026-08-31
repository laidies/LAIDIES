import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Copy only checksum-bound public inputs; never build unrelated site files.
const [base, expectedIdentity, output] = process.argv.slice(2);
if (!base || !expectedIdentity || !output) throw Error('Usage: base expected-identity NEW-output-directory');
const source = process.cwd();
const manifest = JSON.parse(await fs.readFile(base + '.manifest.json', 'utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
if (manifest.identitySha256 !== expectedIdentity || sha(manifest.files.map(f => `${f.sha256}  ${f.path}\n`).join('')) !== expectedIdentity) throw Error('Baseline identity mismatch');
const owned = ['library.html', 'assets/library-reader/ai-fundamentals-imagegen-reader-v5.css', 'assets/library-reader/ai-fundamentals-approved-title-source.png', 'assets/library-reader/reader-frame-compact-imagegen-v7.png', ...['working','answers','dictionary'].flatMap(e => ['desktop','compact','title'].map(k => `assets/library-reader/${e}-${k}-imagegen-v1.png`))];
for (const f of manifest.files) {
  if (path.isAbsolute(f.path) || f.path.split('/').includes('..')) throw Error('Unsafe manifest path');
  if (sha(await fs.readFile(path.join(base,f.path))) !== f.sha256) throw Error(`Baseline bytes changed: ${f.path}`);
}
await fs.mkdir(output); // Refuse an existing destination.
for (const f of manifest.files) {
  const dest = path.join(output,f.path);
  await fs.mkdir(path.dirname(dest),{recursive:true});
  await fs.copyFile(path.join(base,f.path),dest);
}
for (const f of owned) {
  await fs.mkdir(path.dirname(path.join(output,f)),{recursive:true});
  await fs.copyFile(path.join(source,f),path.join(output,f));
}
execFileSync(process.execPath,['scripts/create-release-manifest.mjs',output,output+'.manifest.json'],{stdio:'inherit'});
const after=JSON.parse(await fs.readFile(output+'.manifest.json','utf8'));
const old=new Map(manifest.files.map(f=>[f.path,f.sha256]));
const delta=after.files.filter(f=>old.get(f.path)!==f.sha256).map(f=>({path:f.path,status:old.has(f.path)?'changed':'added',sha256:f.sha256}));
if (delta.some(f=>!owned.includes(f.path)) || manifest.files.some(f=>!after.files.some(a=>a.path===f.path))) throw Error('Non-Library delta or removed file');
await fs.writeFile(output+'.delta.json',JSON.stringify({baseIdentity:expectedIdentity,identity:after.identitySha256,delta},null,2)+'\n');
console.log(JSON.stringify({output,fileCount:after.fileCount,identity:after.identitySha256,delta},null,2));
