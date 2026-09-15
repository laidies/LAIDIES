import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import assert from 'node:assert/strict';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const packet='operations/live-user-journeys-20260914/radio-navigation';
const prior=JSON.parse(fs.readFileSync(packet+'/cache-refresh/manifest.json'));
const origin='https://eef9ed0c.laidies-sunnyvaile.pages.dev';
const expected=JSON.parse(fs.readFileSync('/private/tmp/laidies-fun-route-20260915-mkDbDz/candidate-manifest.json'));
const oldVersion='20260915-listening-handoff-1',version='20260915-passive-follower-1';
const output=packet+'/diagnosis-02/cache-refresh';const rows=[];
const owned=prior.rows.filter(r=>!r.unmatched);
for(let i=0;i<owned.length;i+=6){const results=await Promise.allSettled(owned.slice(i,i+6).map(async r=>{
 const p=r.path,url=p==='index.html'?'/':p.endsWith('.html')?'/'+p.slice(0,-5):'/'+p;
 const response=await fetch(origin+url);const bytes=Buffer.from(await response.arrayBuffer());
 assert.equal(sha(bytes),expected.files.find(f=>f.path===p)?.sha256,'Current immutable mismatch '+p);
 const before=bytes.toString(),count=before.split(oldVersion).length-1;assert(count>0,'No current cache reference '+p);
 const after=before.replaceAll(oldVersion,version);assert.equal(after.replaceAll(version,oldVersion),before,'Non-token change '+p);
 fs.mkdirSync(path.dirname(output+'/overlay/'+p),{recursive:true});fs.writeFileSync(output+'/overlay/'+p,after);
 return {path:p,baseSha256:sha(bytes),sha256:sha(after),bytes:Buffer.byteLength(after),replacements:count};
 }));for(const r of results){if(r.status==='rejected')throw r.reason;rows.push(r.value);}}
rows.sort((a,b)=>a.path.localeCompare(b.path,'en'));fs.writeFileSync(output+'/manifest.json',JSON.stringify({origin,version,capturedAt:new Date().toISOString(),rows},null,2));console.log(JSON.stringify({paths:rows.length,replacements:rows.reduce((n,r)=>n+r.replacements,0)}));
