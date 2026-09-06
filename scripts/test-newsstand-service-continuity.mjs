// Synthetic transaction calibration. No editorial admission or public writes.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { composeDailyEnvelope } from './compose-daily-edition.mjs';
import { promoteDailyIssue } from './promote-daily-edition.mjs';
import { projectDailySourceRaw, verifyProjectionAdmission } from './publish-daily-edition.mjs';
import { buildDerivatives } from './build-newsstand-derivatives.mjs';
import { stableService as stable, serviceHash as hash } from './newsstand-service-continuity.mjs';
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-carry-test-')));
const read = p => fs.readFileSync(path.join(source, p), 'utf8');
const put = (p, value) => { const raw = typeof value === 'string' ? value : JSON.stringify(value); fs.mkdirSync(path.dirname(path.join(root,p)), {recursive:true}); fs.writeFileSync(path.join(root,p),raw); return {path:p,sha256:hash(raw)}; };
const parse = raw => { const c={window:{}};vm.runInNewContext(raw,c);return JSON.parse(JSON.stringify(c.window.NEWSSTAND_DATA)); };
const encode = data => `window.NEWSSTAND_DATA = ${JSON.stringify(data,null,2)};\n`;
const base = parse(read('content/newsstand-stories.js'));
const prior = JSON.parse(read('content/newsstand-daily-issues.json')).issues.find(i=>i.editionDate==='2026-08-30');
assert.equal(prior.serviceRecordIds.length,7,'representative seven-desk published predecessor');
// Keep this historical fixture isolated from later real Daily stories. A newly
// published story on the synthetic cycle date must not turn its quiet radar
// into a contradictory mixed fixture.
base.stories = base.stories.filter(story => !story.publishedAt || story.publishedAt.slice(0,10) <= prior.editionDate);
const bank = JSON.parse(read('content/daily-edition-columns.json'));
bank.records=bank.records.filter(r=>r.editionDate<='2026-08-30');
const history={schemaVersion:'daily-issues-v1',owner:'newsstand-daily',issues:[prior]};
put('content/newsstand-daily-issues.json',history);
base.publications.daily.editionDate=prior.editionDate;
base.publications.daily.issue={status:'complete',disposition:prior.disposition,storyIds:prior.storyIds,serviceRecordIds:prior.serviceRecordIds,frontPaigeStoryId:prior.frontPaigeStoryId,weeklyStoryId:prior.weeklyStoryId};
const originalBank = JSON.stringify(bank);
const evidence='operations/product-stewards/newsstand/evidence/carry-fixture';
const deploymentId='12345678-1234-1234-1234-123456789abc';
function proof(date, data=base, store=history, frozen=bank) {
  const published=store.issues.find(i=>i.editionDate===data.publications.daily.editionDate);
  const token=hash(encode(data)+JSON.stringify(store)+JSON.stringify(frozen)).slice(0,12);
  const bindings={stories:put(`${evidence}/base-${date}-${token}.js`,encode(data)),issues:put(`${evidence}/issues-${date}-${token}.json`,store),columns:put(`${evidence}/columns-${date}-${token}.json`,frozen)};
  const paths={stories:'content/newsstand-stories.js',issues:'content/newsstand-daily-issues.json',columns:'content/daily-edition-columns.json'};
  const files=Object.entries(paths).map(([key,p])=>({path:p,sha256:bindings[key].sha256})).sort((a,b)=>a.path.localeCompare(b.path));
  const identity=hash(files.map(f=>`${f.sha256}  ${f.path}\n`).join(''));
  const manifest=put(`${evidence}/manifest-${date}-${token}.json`,{schema:'laidies-release-artifact-manifest/v1',identitySha256:identity,files});
  const observations=['https://laidies.ai','https://12345678.laidies-sunnyvaile.pages.dev'].flatMap(origin=>Object.entries(paths).map(([key,p])=>({url:origin+'/'+p,status:200,sha256:bindings[key].sha256})));
  const verification=put(`${evidence}/verification-${date}-${token}.json`,{schemaVersion:'newsstand-service-predecessor-verification-v1',deploymentId,providerHeadId:deploymentId,artifactIdentitySha256:identity,checkedAt:date+'T14:00:00Z',observations,limitation:'SYNTHETIC TEST ONLY. No actual network observations or publication authority.'});
  return put(`${evidence}/proof-${date}-${token}.json`,{schemaVersion:'newsstand-service-predecessor-v1',deploymentId,predecessorEnvelopeSha256:published.envelopeSha256,manifest,verification,...bindings});
}
function compose(date, servicePredecessor, data=base, columns=bank, news=false) {
  const radarPath=`operations/agents/aidb-intelligence-desk/daily/${date}.md`;
  const radarRaw=`${date}\n- **NewsStand:** ${news?'REVIEW CANDIDATE. Synthetic dated news.':'NO NEW HANDOFF. Quiet research fixture.'}\n`;
  put(radarPath,radarRaw);put('content/newsstand-stories.js',encode(data));put('content/daily-edition-columns.json',columns);
  return composeDailyEnvelope({root,date,radarPath:path.join(root,radarPath),radarRaw,storiesRaw:encode(data),columnsRaw:JSON.stringify(columns),servicePredecessor,enforceServicePredecessor:true});
}
function cycle(date, binding, data=base, columns=bank, store=history, news=false) {
  const composed=compose(date,binding,data,columns,news);
  assert.equal(compose(date,binding,data,columns,news).canonical,composed.canonical);
  const decision={schemaVersion:'daily-issue-admission-v1',decision:'ACCEPT_LOCAL_CANONICAL_WRITE',editionDate:date,envelopeSha256:composed.sha256,reviewedAt:date+'T15:00:00Z',reviewedBy:'independent-synthetic-fixture',reviewerRole:'independent TEST ONLY'};
  const args={root,store,envelope:composed.envelope,envelopeRaw:composed.canonical,decision,maker:'synthetic-maker',now:date+'T15:00:00Z'};
  const result=promoteDailyIssue(args);
  assert.equal(promoteDailyIssue({...args,store:result.store}).changed,false);
  put('content/newsstand-daily-issues.json',result.store);
  verifyProjectionAdmission({root,issue:result.issue,envelopeRaw:composed.canonical,decision});
  const raw=projectDailySourceRaw({root,raw:encode(data),issue:result.issue,columns});
  assert.equal(projectDailySourceRaw({root,raw,issue:result.issue,columns}),raw);
  const derived=buildDerivatives({storyRaw:raw,columns,issues:result.store});
  assert.deepEqual(buildDerivatives({storyRaw:raw,columns,issues:result.store}),derived);
  for(const id of prior.serviceRecordIds.filter(id=>result.issue.serviceRecordIds.includes(id))) {
    const archived=derived.archive.items.filter(i=>i.id==='service:'+id);
    assert.equal(archived.length,1);assert.equal(archived[0].editionDate,prior.editionDate);assert.equal(archived[0].publishedAt,prior.admission.reviewedAt);
  }
  return {...result,composed,raw,derived};
}
const date='2026-09-03', binding=proof(date);
assert.throws(()=>compose(date,null),/eligible carried service requires the exact verified predecessor/,'a new issue cannot silently drop an eligible predecessor desk');
const expiredPrior=structuredClone(bank);
for (const id of prior.serviceRecordIds) expiredPrior.records.find(record=>record.id===id).freshness.expiresAt='2026-08-30';
assert.doesNotThrow(()=>compose(date,null,base,expiredPrior),'expired predecessor desks do not require carry');
const retainedOlder=structuredClone(base);
const olderStory=retainedOlder.stories.find(story=>story.edition==='daily'&&!/^front-paige-/.test(story.id)&&story.status==='published'&&story.sourceApproval?.status==='approved'&&story.publishedAt&&story.publishedAt.slice(0,10)<prior.editionDate&&!retainedOlder.publications.daily.issue.storyIds.includes(story.id));
assert.ok(olderStory,'fixture includes an older approved Latest story');
retainedOlder.publications.daily.issue.storyIds.push(olderStory.id);
assert.equal(compose(date,proof(date,retainedOlder),retainedOlder).envelope.desks.filter(d=>d.state==='ready').length,6,'approved older Latest display may coexist with exact service predecessor while invalid carried desks are omitted');
const badRetained=structuredClone(retainedOlder);badRetained.publications.daily.issue.storyIds.push('unapproved-display-injection');
assert.throws(()=>compose(date,proof(date,badRetained),badRetained),/exact published issue/,'unapproved retained story is rejected');
const quiet=cycle(date,binding);
assert.deepEqual(quiet.issue.serviceRecordIds,prior.desks.filter(d=>d.state==='ready'&&d.type!=='career_life').map(d=>d.recordId));
assert.ok(quiet.issue.desks.filter(d=>d.state==='ready').every(d=>d.carriedFrom.originalEditionDate==='2026-08-30'));
assert.equal(JSON.stringify(bank),originalBank,'no redating or review receipt mutation');
assert.doesNotThrow(()=>compose(date,null,parse(quiet.raw),bank),'exact stored historical replay remains valid without recreating its predecessor binding');
const nextDate='2026-09-04', nextBase=parse(quiet.raw);
const next=cycle(nextDate,proof(nextDate,nextBase,quiet.store),nextBase,bank,quiet.store);
const expectedNextIds=quiet.issue.serviceRecordIds.filter(id=>{
  const record=bank.records.find(item=>item.id===id);
  return record && (!record.availableUntil||record.availableUntil>=nextDate) &&
    (!record.freshness?.expiresAt||record.freshness.expiresAt>=nextDate) &&
    (!record.retiredAt||record.retiredAt>nextDate);
});
assert.deepEqual(next.issue.serviceRecordIds,expectedNextIds,'repeat next day carries only the exact still-valid prior membership');
const changed=structuredClone(bank); changed.records.find(r=>r.id===prior.serviceRecordIds[0]).headline+=' altered';
assert.throws(()=>compose(date,binding,base,changed),/altered published/);
for(const patch of [{status:'HOLD'},{publicEligibility:'INELIGIBLE'},{freshness:{expiresAt:'2026-08-29'}},{availableUntil:'2026-08-29'},{retiredAt:'2026-08-30'}]) {
  const frozen=structuredClone(bank);Object.assign(frozen.records.find(r=>r.id===prior.serviceRecordIds[0]),patch);
  const b=proof(date,base,history,frozen);
  assert.ok(!compose(date,b,base,frozen).envelope.desks.some(d=>d.recordId===prior.serviceRecordIds[0]));
}
const freshBinding=proof(date);
const tampered=JSON.parse(fs.readFileSync(path.join(root,freshBinding.path),'utf8'));tampered.predecessorEnvelopeSha256='0'.repeat(64);
assert.throws(()=>compose(date,put(`${evidence}/bad-proof.json`,tampered)),/exact published issue/);
assert.throws(()=>compose(nextDate,freshBinding),/freshly verified/);
const unselected=structuredClone(bank);const service=structuredClone(bank.records.find(r=>r.id===prior.serviceRecordIds[0]));service.id='UNPUBLISHED-OLDER';unselected.records.push(service);
assert.ok(!compose(date,freshBinding,base,unselected).envelope.desks.some(d=>d.recordId===service.id));
const successor={...service,id:'SYNTHETIC-NEW-SERVICE',editionDate:date,predecessorRecordId:service.id};
const newBank={...bank,records:[...bank.records,successor]};
const replaced=cycle(date,freshBinding,base,newBank);
assert.ok(replaced.issue.serviceRecordIds.includes(successor.id));assert.ok(!replaced.issue.desks.find(d=>d.recordId===successor.id).carriedFrom);
const concept=bank.records.find(r=>r.type==='concept_week'&&prior.serviceRecordIds.includes(r.id));
const wed='2026-09-09';
const newConcept={...concept,id:'SYNTHETIC-CONCEPT',editionDate:date};
assert.throws(()=>compose(date,freshBinding,base,{...bank,records:[...bank.records,newConcept]}),/Wednesday/);
assert.throws(()=>compose(date,null,base,{...bank,records:[...bank.records,newConcept]}),/(Wednesday|eligible carried service)/,'omitting proof cannot bypass service continuity or Concept cadence');
const expiredConceptBank=structuredClone(bank);expiredConceptBank.records.find(r=>r.id===concept.id).freshness.expiresAt='2026-08-30';
assert.throws(()=>compose(date,proof(date,base,history,expiredConceptBank),base,{...expiredConceptBank,records:[...expiredConceptBank.records,newConcept]}),/Wednesday/,'expiry cannot bypass Concept cadence');
assert.ok(cycle(wed,proof(wed),base,bank).issue.serviceRecordIds.includes(concept.id),'Wednesday not expiry');
newConcept.editionDate=wed;
assert.ok(cycle(wed,proof(wed),base,{...bank,records:[...bank.records,newConcept]}).issue.serviceRecordIds.includes(newConcept.id));
// Reader consumes real issue envelopes and records; no browser is controlled.
class FixtureDate extends Date { constructor(...args){super(...(args.length?args:['2026-09-03T16:00:00Z']));} static now(){return Date.parse('2026-09-03T16:00:00Z');} }
const sandbox={window:{crypto:webcrypto,location:{href:'http://127.0.0.1/newsstand.html'},NEWSSTAND_DATA:parse(quiet.raw),localStorage:{getItem:()=>null}},document:{readyState:'loading',addEventListener(){}},TextEncoder,URL,Intl,Set,Date:FixtureDate};
vm.runInNewContext(read('content/site/newsstand-catchup-v1.js').replace('})(window);',`global.fixture={validDailyIssueStore,columnById,readableColumn,dailyDeskValue,set(c,i){columns=c;dailyIssues=i;}};})(window);`),sandbox);
const reader=sandbox.window.fixture;reader.set(bank,quiet.store);
assert.equal(await reader.validDailyIssueStore(quiet.store),true, sandbox.window.__newsstandDailyIssueValidationFailure);
for(const id of quiet.issue.serviceRecordIds) {
  assert.equal(reader.columnById(id)?.id,id);
  if (bank.records.find(r=>r.id===id).body?.length) assert.equal(reader.readableColumn(id)?.id,id);
}
reader.set(bank,null);assert.equal(reader.dailyDeskValue(null,date,'paige_tip'),null);assert.equal(reader.readableColumn(prior.serviceRecordIds[0]),null);
reader.set(null,quiet.store);assert.equal(await reader.validDailyIssueStore(quiet.store),false,'missing columns denies carried snapshots');
reader.set(changed,quiet.store);assert.equal(await reader.validDailyIssueStore(quiet.store),false,'altered record denies runtime carry');
console.log(`SERVICE CONTINUITY TEST PASS prior_seven=1 invalid_carried_omitted=1 original_dates=1 quiet=1 next_day=1 successor=1 wednesday=1 idempotent=1 archive=1 reader=1 adversarial=1 fixture=${root} SYNTHETIC_ONLY`);
