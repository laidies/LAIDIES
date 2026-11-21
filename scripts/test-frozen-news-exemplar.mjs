import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const registry='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const expected={
  'CQX-GOOD-NEWS-003':{"sha256": "df0dc0e66ffd9570031be9f8b9ac9e4918fc839aa5a3588b016e7c67e1697bdb", "evidenceSha256": "9da3c4807729aa9bf2a2ad8bb81f06d010c65b776cb95b7bcbcfe7328da4994c"},
  'CQX-GOOD-NEWS-001':{sha256:'c4516f3207d3abd735d500341d99c531a7e3799c2c18b67519d7899c8a3b6767',evidenceSha256:'a58b99d7f8e4ed6e63cc11d507523f49dc4c6fce133395836f7c3ad825ce6597'},
  'CQX-GOOD-NEWS-002':{sha256:'102a4299dcb922f6fcdad44bdf30257f42ebfe6a381efe378bf99fc1fb3c7f83',evidenceSha256:'726ebfafa2b88f5780a3f52938ac2936c9e066d1bb24b45a31e57a09e6ba5fab'}
};
function check(base,id){
  const entry=JSON.parse(fs.readFileSync(path.join(base,registry))).positiveExemplars.find(x=>x.id===id);
  const item=id==='CQX-GOOD-NEWS-001'?entry.historicalFrozen:entry;
  assert.ok(item.path.includes('/quality-exemplars/'));
  assert.ok(item.evidencePath.includes('/quality-exemplars/'));
  assert.equal(item.sha256,expected[id].sha256);
  assert.equal(item.evidenceSha256,expected[id].evidenceSha256);
  assert.equal(sha(fs.readFileSync(path.join(base,item.path))),item.sha256);
  assert.equal(sha(fs.readFileSync(path.join(base,item.evidencePath))),item.evidenceSha256);
  return item;
}
const newsReferences=JSON.parse(fs.readFileSync(path.join(root,registry))).positiveExemplars.filter(item=>item.id.startsWith('CQX-GOOD-NEWS-'));
assert.deepEqual(newsReferences.filter(item=>item.useFor.includes('NEWS')).map(item=>item.id),['CQX-GOOD-NEWS-003']);
assert.equal(newsReferences.find(item=>item.id==='CQX-GOOD-NEWS-002').supersededBy,'CQX-GOOD-NEWS-003');
assert.equal(newsReferences.find(item=>item.id==='CQX-GOOD-NEWS-001').path,'operations/product-stewards/learning-content-ecosystem/quality-exemplars/eu-ai-act-transparency-starts-positive.md');
const items=Object.keys(expected).map(id=>check(root,id)),temp=fs.mkdtempSync(path.join(os.tmpdir(),'frozen-news-calibration-'));
for(const p of [registry,...items.flatMap(item=>[item.path,item.evidencePath])]){fs.mkdirSync(path.dirname(path.join(temp,p)),{recursive:true});fs.copyFileSync(path.join(root,p),path.join(temp,p));}
fs.mkdirSync(path.join(temp,'content'),{recursive:true});
fs.writeFileSync(path.join(temp,'content/newsstand-stories.js'),'Changed live publication; not a calibration source.');
for(const id of Object.keys(expected)){const item=check(temp,id);fs.appendFileSync(path.join(temp,item.path),'bad');assert.throws(()=>check(temp,id));fs.copyFileSync(path.join(root,item.path),path.join(temp,item.path));fs.appendFileSync(path.join(temp,item.evidencePath),'bad');assert.throws(()=>check(temp,id));fs.copyFileSync(path.join(root,item.evidencePath),path.join(temp,item.evidencePath));}
console.log('FROZEN NEWS EXEMPLAR PASS retained_news001_news002=2 active_news003=1 actual_prose=3 actual_evidence=3 live_changes_independent=1 bad_prose_rejected=3 bad_evidence_rejected=3');
