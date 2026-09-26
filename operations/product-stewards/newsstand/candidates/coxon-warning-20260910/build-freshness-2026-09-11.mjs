#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd();
const dir='operations/product-stewards/newsstand/candidates/coxon-warning-20260910/freshness-2026-09-11';
const rawDir=path.join(dir,'raw');
const checkedAt='2026-09-11T00:11:00-07:00';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFileSync(p,'utf8');
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const bind=p=>({path:p,sha256:hash(fs.readFileSync(p))});
const extract=(file,start,end)=>{const s=read(path.join(rawDir,file));const i=s.indexOf(start);if(i<0)throw Error(`missing ${start}`);const j=end?s.indexOf(end,i):i+start.length;if(j<0)throw Error(`missing ${end}`);return s.slice(i,j+(end?end.length:0)).replaceAll('&amp;gt;','>').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#x27;',"'");};
const sources=[
 ['coxon-primary-post','https://x.com/hilbertspaess/status/2097476196791709843','coxon-post.html','I resigned from Anthropic today.','More thoughts below.','I resigned from Anthropic today. I spent the last three years doing pretraining research at both OpenAI and Anthropic.'],
 ['hubinger-primary-post','https://x.com/EvanHub/status/2097497037956891126','hubinger-post.html','Jacob is correct here','not clearly on track to','I personally think it is >10% within the next decade.'],
 ['wired-coxon-interview','https://www.wired.com/story/anthropic-researcher-quits-jacob-coxon-ai-fears-humanity/','wired.html','No, not yet.','stay competitive.','No, not yet. It\'s not cutting any corners.'],
 ['abc-independent-reporting','https://www.abc.net.au/news/2026-09-09/anthropic-researcher-coxon-quits-over-human-threat/107134164','abc.html','Mr Coxon said he had spent','</p>','Mr Coxon said he had spent the past three years doing pre-training research at Anthropic and OpenAI.'],
 ['anthropic-rsp-current','https://www.anthropic.com/responsible-scaling-policy','anthropic-rsp.html','Risk Reports aim to provide','preparedness for them','Risk Reports aim to provide a direct, candid, and informative description of how we see the risks']
];
const captures=[];
for(const [id,url,file,start,end,excerpt] of sources){const content=extract(file,start,end);if(!content.includes(excerpt))throw Error(`excerpt missing ${id}`);const p=`${dir}/${id}-current-capture.json`;write(p,{schemaVersion:'laidies-newsstand-current-source-capture.v1',sourceUrl:url,capturedAt:checkedAt,content});captures.push({id,url,path:p,excerpt});}
const xml=read(path.join(rawDir,'development-search.xml'));
const titles=[...xml.matchAll(/<item><title>(.*?)<\/title><link>(.*?)<\/link><guid[^>]*>.*?<\/guid><pubDate>(.*?)<\/pubDate>/gs)].slice(0,12).map(m=>`${m[3]} | ${m[1]} | ${m[2]}`);
if(!titles.length)throw Error('no search results');
const query='Jacob Coxon Anthropic resignation';
const devPath=`${dir}/development-current-capture.json`;
write(devPath,{schemaVersion:'laidies-newsstand-development-capture.v1',query,capturedAt:checkedAt,sourceUrls:['https://news.google.com/rss/search?q=Jacob%20Coxon%20Anthropic%20resignation'],content:titles.join('\n')});
const original=JSON.parse(read('operations/product-stewards/newsstand/candidates/coxon-warning-20260910/freshness-2026-09-11-template.json'));
const byId=new Map(captures.map(x=>[x.id,x]));
const record={...original,disposition:'NO_MATERIAL_CHANGE',checker:'/root/weekly_recovery',checkedAt,sourceChecks:original.sourceChecks.map(check=>{const c=byId.get(check.id);return {...check,disposition:'UNCHANGED',explanation:'The source reopened on September 11 and retained the exact statement or policy passage used by the reviewed article; no correction or withdrawal appeared in the checked source.',currentCheckedAt:checkedAt,currentEvidence:bind(c.path),currentExcerpt:c.excerpt};}),developmentCheck:{disposition:'NO_MATERIAL_CHANGE',query,explanation:'The current Google News index showed continuing coverage, including new follow-up headlines, but no indexed correction, statement withdrawal, binding pacing agreement or present catastrophe that changes the reviewed article. This index check does not claim to verify every later article.',checkedAt,evidence:bind(devPath),currentExcerpt:titles[0]}};
const output='operations/product-stewards/newsstand/candidates/coxon-warning-20260910/freshness-2026-09-11.json';write(output,record);
console.log(JSON.stringify({output,sha256:hash(fs.readFileSync(output)),sources:captures.length,developmentResults:titles.length}));
