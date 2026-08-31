import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const registry='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function check(base){
  const item=JSON.parse(fs.readFileSync(path.join(base,registry))).positiveExemplars.find(x=>x.id==='CQX-GOOD-NEWS-001');
  assert.ok(item.path.includes('/quality-exemplars/'));
  assert.ok(item.evidencePath.includes('/quality-exemplars/'));
  assert.equal(item.sha256,'c4516f3207d3abd735d500341d99c531a7e3799c2c18b67519d7899c8a3b6767');
  assert.equal(item.evidenceSha256,'a58b99d7f8e4ed6e63cc11d507523f49dc4c6fce133395836f7c3ad825ce6597');
  assert.equal(sha(fs.readFileSync(path.join(base,item.path))),item.sha256);
  assert.equal(sha(fs.readFileSync(path.join(base,item.evidencePath))),item.evidenceSha256);
  return item;
}
const item=check(root),temp=fs.mkdtempSync(path.join(os.tmpdir(),'frozen-news-calibration-'));
for(const p of [registry,item.path,item.evidencePath]){fs.mkdirSync(path.dirname(path.join(temp,p)),{recursive:true});fs.copyFileSync(path.join(root,p),path.join(temp,p));}
fs.mkdirSync(path.join(temp,'content'),{recursive:true});
fs.writeFileSync(path.join(temp,'content/newsstand-stories.js'),'Changed live publication; not a calibration source.');
check(temp);
fs.appendFileSync(path.join(temp,item.path),'bad');
assert.throws(()=>check(temp));
fs.copyFileSync(path.join(root,item.path),path.join(temp,item.path));
fs.appendFileSync(path.join(temp,item.evidencePath),'bad');
assert.throws(()=>check(temp));
console.log('FROZEN NEWS EXEMPLAR PASS actual_prose=1 actual_evidence=1 live_changes_independent=1 bad_prose_rejected=1 bad_evidence_rejected=1');
