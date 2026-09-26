#!/usr/bin/env node
// Regression for adding an activity after today's news has already published,
// while retaining yesterday's independently admitted service records.
import fs from 'node:fs';import path from 'node:path';import os from 'node:os';import crypto from 'node:crypto';import assert from 'node:assert/strict';import {fileURLToPath,pathToFileURL} from 'node:url';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),root=fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-carried-revision-')));
const dir='operations/product-stewards/newsstand/evidence/curiosity-bank-20260910';
const stable=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(stable).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+stable(v[k])).join(',')+'}';
const read=p=>JSON.parse(fs.readFileSync(path.join(source,p))),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const copy=p=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.copyFileSync(path.join(source,p),path.join(root,p));};
fs.cpSync(path.join(source,'scripts'),path.join(root,'scripts'),{recursive:true});
const seen=new Set();function bindings(x){if(!x||typeof x!=='object')return;if(typeof x.path==='string'&&x.sha256&&/^(operations|content)\//.test(x.path)&&!seen.has(x.path)&&fs.existsSync(path.join(source,x.path))){seen.add(x.path);copy(x.path);if(x.path.endsWith('.json'))bindings(read(x.path));}for(const v of Object.values(x))bindings(v);}
const request=read(dir+'/issue-review-request.json');bindings(request);const envelope=read(request.envelope.path);bindings(envelope.sourceIdentity);
for(const p of ['operations/product-stewards/newsstand/story-type-modules.json','operations/product-stewards/newsstand/story-recovery-policy.json','content/newsstand-reader-contract.js','content/newsstand-big-picture-versions.js'])copy(p);
copy(envelope.sourceIdentity.radarPath);copy('content/luminairy-profiles.json');
fs.mkdirSync(path.join(root,'content'),{recursive:true});
fs.copyFileSync(path.join(source,envelope.sourceIdentity.serviceRevisionBase.path),path.join(root,'content/newsstand-stories.js'));
fs.copyFileSync(path.join(source,dir+'/revision-columns.json'),path.join(root,'content/daily-edition-columns.json'));
const store=read(dir+'/predecessor-daily-issues.json');
const {promoteDailyIssue}=await import(pathToFileURL(path.join(root,'scripts/promote-daily-edition.mjs')));
const {projectDailySourceRaw}=await import(pathToFileURL(path.join(root,'scripts/publish-daily-edition.mjs')));
const decision={schemaVersion:'daily-issue-service-revision-admission-v1',decision:'ACCEPT_LOCAL_CANONICAL_SUCCESSOR',editionDate:envelope.editionDate,envelopeSha256:request.envelope.sha256,predecessorEnvelopeSha256:request.predecessorEnvelopeSha256,publishedBase:request.publishedBase,addedServiceRecordIds:request.addedServiceRecordIds,reviewedAt:'2026-09-11T09:00:00Z',reviewedBy:'independent-SYNTHETIC-test-only',reviewerRole:'Independent synthetic test; not production authority'};
function promote(e=envelope,d=decision,st=store){const raw=stable(e)+'\n';return promoteDailyIssue({store:structuredClone(st),envelope:e,envelopeRaw:raw,decision:{...d,envelopeSha256:hash(raw)},maker:'test-maker',root,now:'2026-09-11T09:01:00Z'});}
const noncanonical=JSON.stringify(envelope,null,2)+'\n';assert.throws(()=>promoteDailyIssue({store,envelope,envelopeRaw:noncanonical,decision:{...decision,envelopeSha256:hash(noncanonical)},maker:'test-maker',root,now:'2026-09-11T09:01:00Z'}),/browser-verifiable canonical bytes/);
const result=promote();assert.equal(result.issue.envelopeSha256,hash(stable(envelope)+'\n'));const columns=read(dir+'/revision-columns.json'),raw=fs.readFileSync(path.join(root,'content/newsstand-stories.js'),'utf8'),projected=projectDailySourceRaw({raw,issue:result.issue,columns,root});assert.notEqual(raw,projected);assert.equal(projectDailySourceRaw({raw:projected,issue:result.issue,columns,root}),projected);
assert.deepEqual(result.issue.stories,store.issues.find(i=>i.editionDate===envelope.editionDate).stories);
const bad=structuredClone(envelope);bad.desks.find(d=>d.carriedFrom).summary+=' changed';assert.throws(()=>promote(bad),/admitted source content|existing ready desk/);
const wrong=structuredClone(envelope);wrong.sourceIdentity.serviceRevisionBase.predecessorEnvelopeSha256='0'.repeat(64);assert.throws(()=>promote(wrong),/same-day admitted predecessor/);
assert.throws(()=>projectDailySourceRaw({raw:raw+'\n// drift',issue:result.issue,columns,root}),/publication base changed/);
const noProof=structuredClone(envelope);delete noProof.sourceIdentity.serviceRevisionBase;assert.throws(()=>promote(noProof),/frozen published predecessor/);
fs.writeFileSync(path.join(root,'content/newsstand-stories.js'),projected);assert.equal(promote(envelope,decision,result.store).changed,false);
fs.rmSync(root,{recursive:true,force:true});console.log('CARRIED SERVICE REVISION PASS news_preserved=1 old_services_preserved=1 added_activity=1 replay=1 wrong_predecessor_rejected=1 changed_desk_rejected=1 changed_base_rejected=1 missing_base_rejected=1 noncanonical_rejected=1 synthetic_only=1');
