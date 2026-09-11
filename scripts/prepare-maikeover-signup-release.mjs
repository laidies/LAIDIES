import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

// Exact overlay only. The accompanying preserve map is mandatory at upload.
const root = process.cwd();
const out = '/private/tmp/laidies-maikeover-signup-20260911';
const base = JSON.parse(fs.readFileSync(path.join(out, 'base-manifest.json')));
const provider = JSON.parse(fs.readFileSync(path.join(out, 'base-provider.json')));
assert.equal(provider.id, 'a5216fe1-6b75-44a0-9ed2-02d3cc8c341b');
assert.equal(base.identitySha256, 'be4d7167c21b377ba65e287e7a0729780cca84ba543af0a986504d45a66819cf');
const changed = [
  'maikeover.html', 'content/maikeover-account.css',
  'content/site/identity-client-v1.js', 'content/site/maikeover-account-v1.js',
  'content/site/maikeover-portraits-v1.js', 'content/site/maikeover-v2.js',
  'content/site/closet-account-bridge-v1.js', 'content/site/sv-global-header.js',
  'content/site/sv-nav-auth.js'
];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const rows = new Map(base.files.map(row => [row.path, {...row}]));
const stage = path.join(out, 'stage');
fs.mkdirSync(stage, {recursive:true});
assert.equal(fs.readdirSync(stage).length, 0, 'Use an empty stage; never silently mix releases');
for (const name of [...changed, '_worker.js', '_redirects']) {
  const control = name.startsWith('_');
  const bytes = fs.readFileSync(path.join(control ? path.join(out, 'base') : root, name));
  if (control) assert.equal(hash(bytes), rows.get(name).sha256);
  const destination = path.join(stage, name);
  fs.mkdirSync(path.dirname(destination), {recursive:true});
  fs.writeFileSync(destination, bytes);
  rows.set(name, {path:name, bytes:bytes.length, sha256:hash(bytes)});
}
const preserved = Object.fromEntries(Object.entries(provider.files).filter(([name]) => !changed.includes(name.replace(/^\//,''))));
for (const [name,id] of Object.entries(preserved)) {
  assert.equal(typeof id, 'string');
  assert.ok(id.length > 0);
  assert.ok(rows.has(name.replace(/^\//,'')));
  assert.ok(!changed.includes(name.replace(/^\//,'')), 'Preservation must not overwrite staged changes');
}
const files = [...rows.values()].sort((a,b)=>a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
const manifest = {schema:base.schema, createdAt:new Date().toISOString(), artifactDirectory:stage,
  artifactMode:'provider-preserving-overlay', baseDeploymentId:provider.id,
  fileCount:files.length, totalBytes:files.reduce((n,f)=>n+f.bytes,0),
  identitySha256:hash(files.map(f=>f.sha256+'  '+f.path+'\n').join('')), files};
const delta = changed.map(name=>({path:name, before:base.files.find(f=>f.path===name)?.sha256 || null, after:rows.get(name).sha256}));
assert.ok(delta.every(d=>d.before!==d.after), 'No unchanged paths in release delta');
assert.equal(Object.keys(preserved).length + changed.length, files.length-2);
for (const [name,value] of Object.entries({'candidate-manifest.json':manifest,'preserve.json':preserved,'delta.json':delta})) {
  fs.writeFileSync(path.join(out,name), JSON.stringify(value,null,2)+'\n');
}
console.log(JSON.stringify({stage,base:provider.id,staticPreserved:Object.keys(preserved).length,delta,files:manifest.fileCount,bytes:manifest.totalBytes,identity:manifest.identitySha256},null,2));
