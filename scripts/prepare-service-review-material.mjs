#!/usr/bin/env node
// Evidence preparation only: no eligibility, canonical publication or verdicts.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { reviewedContentSha256 } from './prepare-newsstand-service-bank.mjs';
const root = path.resolve(import.meta.dirname, '..');
const output = 'operations/product-stewards/newsstand/evidence/service-bank-20260830';
const correctedSources=process.argv.includes('--corrected-sources');
const version = (process.argv.includes('--include-announcement') ? '-with-announcement' : '')+(correctedSources?'-corrected-sources':'');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const save = (p,s) => { const f=path.join(root,p); fs.mkdirSync(path.dirname(f),{recursive:true}); if(fs.existsSync(f) && read(p)!==s) throw Error('Refusing to replace frozen evidence: '+p); fs.writeFileSync(f,s); return {path:p,sha256:hash(s)}; };
const plain = h => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&#x27;/g,"'").replace(/\s+/g,' ').trim();
const bank = JSON.parse(read('operations/product-stewards/newsstand/candidates/service-bank.json'));
const policy=JSON.parse(read('operations/product-stewards/newsstand/recurring-service-sampling-policy.json'));
const external = [
 ['gallo-credit','https://www.amyegallo.com/newsletter-all/2024/4/24/how-to-respond-when-a-colleague-takes-credit-for-your-work'],
 ['clark-visibility','https://learn.dorieclark.com/courses/expert'],
 ['clark-priorities','https://dorieclark.com/blog/practical-productivity-strategies/'],
 ['clark-relationships','https://dorieclark.com/blog/system-future-opportunities/'],
 ['claude-prompting','https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices']
];
const sources=[];
for(const [id,url] of external){
 const p=`${output}/sources/${id}.txt`;
 if(!fs.existsSync(path.join(root,p))){ const res=await fetch(url); if(!res.ok) throw Error(`${res.status} ${url}`); save(p,`Source: ${url}\nRetrieved: 2026-08-30\n\n${plain(await res.text())}\n`); }
 sources.push({id,...{path:p,sha256:hash(read(p))}});
}
for(const [id,numbers] of [['ai-fundamentals-101',[4,8,11]],['working-with-ai-101',[2,3,4,13]]]){
 const p=`content/library-books/sources/${id}.source.json`, book=JSON.parse(read(p));
 const chapters=book.chapters.filter((c,i)=>correctedSources?numbers.some(n=>c.id===`chapter-${n}`):numbers.includes(i+1));
 const s=`Source: ${p}\nSource SHA-256: ${hash(read(p))}\n\n`+chapters.map(c=>`${c.title}\n${plain(c.bodyHtml||JSON.stringify(c))}`).join('\n\n')+'\n';
 sources.push({id,...save(`${output}/sources/${id}${correctedSources?'-chapters':''}.txt`,s)});
}
const deckPath='content/data/mme-claio-deck.json';
sources.push({id:'mme-deck',path:deckPath,sha256:hash(read(deckPath))});
const artifacts=[];
const reviewEntries=process.argv.includes('--include-announcement') ? [...policy.entries,{id:'town-02-data-centres',type:'whats_new_sunnyvaile',contentClass:'PROMOTIONAL',teachingEntry:false}] : policy.entries;
for(const entry of reviewEntries){
 const item=bank.items.find(i=>i.id===entry.id);
 const prose=`# ${item.headline}\n\n${item.summary}\n\n`+(item.question?`${item.question.text}\n\n— ${item.question.signature}\n\n`:'')+item.body.join('\n\n')+'\n\n'+item.sourceLinks.map(l=>`[${l.label}](${l.url})`).join('\n')+'\n';
 const reviewText=save(`${output}/${item.id}.md`,prose);
 const manifestData={schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:item.id,surface:policy.surface,contentClass:entry.contentClass,reviewText,reviewedContentSha256:reviewedContentSha256(item)};
 const manifest=save(`${output}/${item.id}.manifest.json`,JSON.stringify(manifestData,null,2)+'\n');
 artifacts.push({...entry,reviewText,manifest,reviewedContentSha256:manifestData.reviewedContentSha256});
}
save(`${output}/index${version}.json`,JSON.stringify({artifacts,sources},null,2)+'\n');
save(`${output}/bank-reader-text${version}.md`,artifacts.map(a=>`<!-- ${a.id} -->\n${read(a.reviewText.path)}`).join('\n'));
console.log(`REVIEW MATERIAL PREPARED entries=${artifacts.length} sources=${sources.length}; no approval or public writes`);
