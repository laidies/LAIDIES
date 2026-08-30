#!/usr/bin/env node
// Read-only public byte verification. Does not deploy or write receipts.
import fs from 'node:fs';
import crypto from 'node:crypto';
const input='/tmp/laidies-newsstand-bank-successor.grAiqm';
const manifest=JSON.parse(fs.readFileSync(input+'.manifest.json','utf8'));
const origins=['https://laidies.ai','https://b2695dc7.laidies-sunnyvaile.pages.dev'];
const paths=['newsstand.html','content/daily-edition-columns.json','content/newsstand-daily-issues.json','content/newsstand-stories.js','content/newsstand-public-feed.json','content/newsstand-archive-index.json','content/newsstand.css','content/site/newsstand-catchup-v1.js','content/newsstand-reader-contract.js','index.html','library.html','resident-card.html','laidies-card.html','maikeover.html','visitors-centre.html','radio.html','content/site/closet-account-bridge-v1.js','content/site/maikeover-portraits-v1.js','content/site/maikeover-v2.js','content/site/resident-account-page-v1.js','content/site/resident-account-runtime-v1.js','content/site/resident-card-contract-v1.js','content/site/sv-nav-auth.js','content/library-books/rendered/ai-fundamentals-101.html','content/library-books/rendered/working-with-ai-101.html','content/library-books/rendered/ai-dictionary.html','content/library-books/rendered/straight-answers.html'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const actualIdentity=hash(manifest.files.map(f=>`${f.sha256}  ${f.path}\n`).join(''));
if(actualIdentity!=='48cf4656a60bb79f1849549b751205bbf411b433eed2872d2e0633b40000e1d4')throw Error('Manifest changed');
for(const f of manifest.files)if(hash(fs.readFileSync(input+'/'+f.path))!==f.sha256)throw Error('Local artifact changed '+f.path);
const pending=origins.flatMap(origin=>paths.map(path=>({origin,path})));
const rows=[];
async function worker(){while(pending.length){const item=pending.shift();const expected=manifest.files.find(f=>f.path===item.path)?.sha256;if(!expected)throw Error('Unknown path '+item.path);try{const response=await fetch(item.origin+'/'+item.path,{redirect:'follow',signal:AbortSignal.timeout(30000),headers:{'Cache-Control':'no-cache'}});const actual=hash(Buffer.from(await response.arrayBuffer()));rows.push({...item,status:response.status,url:response.url,expected,actual,pass:response.ok&&actual===expected});}catch(error){rows.push({...item,expected,pass:false,error:String(error)});}}}
await Promise.all(Array.from({length:4},worker));
rows.sort((a,b)=>(a.origin+a.path).localeCompare(b.origin+b.path));
console.log(JSON.stringify({checkedAt:new Date().toISOString(),deployment:'b2695dc7-c6a5-49a0-a194-6cb3e85124df',input,identity:actualIdentity,localFilesVerified:manifest.files.length,comparisons:rows.length,passed:rows.filter(r=>r.pass).length,rows},null,2));
if(rows.some(r=>!r.pass))process.exitCode=1;
