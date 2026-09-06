#!/usr/bin/env node
// Isolated synthetic fixtures only. Never admits a real candidate or writes the site.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL, fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-next-cycle-test-')));
const put = (name, value) => { const dest = path.join(fixture, name); fs.mkdirSync(path.dirname(dest), {recursive:true}); fs.writeFileSync(dest, value); };
for (const name of ['newsstand-service-continuity','newsstand-career-lane','select-aidb-edition','check-practitioner-signal-pilot','validate-newsstand-ordinary-story-candidate','newsstand-story-lineage','prepare-newsstand-draft','validate-newsstand-story-type-coverage','check-content-producer-contract','check-prose-quality-admission','advance-newsstand-story-recovery','compose-daily-edition','promote-daily-edition','publish-daily-edition','build-newsstand-derivatives']) put(`scripts/${name}.mjs`, fs.readFileSync(path.join(ROOT, `scripts/${name}.mjs`)));
put('operations/product-stewards/newsstand/story-type-modules.json', fs.readFileSync(path.join(ROOT, 'operations/product-stewards/newsstand/story-type-modules.json')));
put('operations/product-stewards/newsstand/story-recovery-policy.json', fs.readFileSync(path.join(ROOT, 'operations/product-stewards/newsstand/story-recovery-policy.json')));
put('operations/product-stewards/newsstand/story-recovery-queue.json', JSON.stringify({ schema: 'laidies.newsstand-story-recovery-queue.v1', items: [] }));
put('operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json', fs.readFileSync(path.join(ROOT, 'operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json')));
put('scripts/lib/newsstand-luminairy-links.mjs', fs.readFileSync(path.join(ROOT, 'scripts/lib/newsstand-luminairy-links.mjs')));
put('scripts/lib/newsstand-overnight-freshness.mjs', fs.readFileSync(path.join(ROOT, 'scripts/lib/newsstand-overnight-freshness.mjs')));
put('content/newsstand-reader-contract.js', fs.readFileSync(path.join(ROOT, 'content/newsstand-reader-contract.js')));
put('content/newsstand-big-picture-versions.js', fs.readFileSync(path.join(ROOT, 'content/newsstand-big-picture-versions.js')));
put('content/luminairy-profiles.json', fs.readFileSync(path.join(ROOT, 'content/luminairy-profiles.json')));
const {composeDailyEnvelope} = await import(pathToFileURL(path.join(fixture, 'scripts/compose-daily-edition.mjs')));
const {promoteDailyIssue} = await import(pathToFileURL(path.join(fixture, 'scripts/promote-daily-edition.mjs')));
const {projectDailyIssue,verifyProjectionAdmission} = await import(pathToFileURL(path.join(fixture, 'scripts/publish-daily-edition.mjs')));
const {buildDerivatives} = await import(pathToFileURL(path.join(fixture, 'scripts/build-newsstand-derivatives.mjs')));
const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(ROOT,'content/newsstand-stories.js'),'utf8'), context);
const base = JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
const allBank = JSON.parse(fs.readFileSync(path.join(ROOT,'content/daily-edition-columns.json'),'utf8'));
const contractContext = {module:{exports:{}}};
vm.runInNewContext(fs.readFileSync(path.join(ROOT,'content/newsstand-reader-contract.js'),'utf8'), contractContext);
const contract = contractContext.module.exports;
const tomorrow = new Date(Date.parse(base.publications.daily.editionDate+'T12:00:00Z')+86400000).toISOString().slice(0,10);
// Real same-date rows may already exist by the time this regression runs. The
// quiet fixture deliberately removes them so it continues to test that older
// rows cannot turn into a new issue without an exact dated admission.
const bank = {...allBank,records:(allBank.records||[]).filter(record=>record.editionDate!==tomorrow)};
const encode = data => `window.NEWSSTAND_DATA = ${JSON.stringify(data,null,2)};\n`;
const store = {schemaVersion:'daily-issues-v1',owner:'newsstand-daily',issues:[]};
const sourceRoster = JSON.parse(fs.readFileSync(path.join(ROOT, 'operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json'), 'utf8'));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
function quietCoverage(date) {
  const inventoryPath = `operations/agents/aidb-intelligence-desk/daily/${date}-aidb-inventory.json`;
  const cursorPath = 'operations/agents/aidb-intelligence-desk/edition-cursor.json';
  const inventory = { schema: 'aidb-edition-inventory.v2', editions: [], channelChecks: [
    { channel: 'website', url: 'https://fixture.invalid/website', checkedAt: `${date}T18:00:00Z`, status: 'CHECKED', releaseUrls: [] },
    { channel: 'podcast', url: 'https://fixture.invalid/podcast', checkedAt: `${date}T18:00:00Z`, status: 'CHECKED', releaseUrls: [] },
    { channel: 'newsletter', url: 'https://aidailybrief.beehiiv.com/', checkedAt: `${date}T18:00:00Z`, status: 'CHECKED', releaseUrls: [] }
  ] };
  const cursor = { schemaVersion: 'aidb-edition-cursor-v1', processedEditions: [] };
  put(inventoryPath, JSON.stringify(inventory)); put(cursorPath, JSON.stringify(cursor));
  return { schemaVersion: 'newsstand-daily-coverage-v1', asOf: date,
    deskChecks: sourceRoster.newsstandCoverage.deskRoutes.map(route => ({ routeId: route.id, readAt: `${date}T18:00:00Z`, outcome: 'NO_MATERIAL_CHANGE', assessmentSummary: 'SYNTHETIC FIXTURE ONLY: no new material simulated.', dispositionRefs: [], unresolvedCandidateIds: [], sourceChecks: route.sourceIds.map(sourceId => ({ sourceId, url: sourceRoster.sources.find(source => source.id === sourceId).channelUrl, readAt: `${date}T18:00:00Z`, outcome: 'NO_MATERIAL_CHANGE', assessmentSummary: 'SYNTHETIC FIXTURE ONLY: no new material simulated.', dispositionRefs: [] })) })),
    aidb: { inventory: { path: inventoryPath, sha256: hash(JSON.stringify(inventory)) }, cursor: { path: cursorPath, sha256: hash(JSON.stringify(cursor)) } }
  };
}
function compose(date, data=base, columns=bank, { sourceHold = false } = {}) {
  const radarPath = path.join(fixture,`operations/agents/aidb-intelligence-desk/daily/${date}.md`);
  const coverage = sourceHold ? null : quietCoverage(date);
  const radarRaw = `# Synthetic test only ${date}\n\n**Result:** QUIET\n${sourceHold ? '\nSYNTHETIC SOURCE HOLD: AIDB reconciliation is intentionally incomplete.\n' : `\n\`\`\`json\n${JSON.stringify(coverage, null, 2)}\n\`\`\`\n`}`;
  const storiesRaw=encode(data), columnsRaw=JSON.stringify(columns);
  put(path.relative(fixture,radarPath),radarRaw); put('content/newsstand-stories.js',storiesRaw); put('content/daily-edition-columns.json',columnsRaw);
  const args={date,radarPath,radarRaw,storiesRaw,columnsRaw,now:`${date}T20:00:00Z`};
  const a=composeDailyEnvelope(args), b=composeDailyEnvelope(args);
  assert.equal(a.canonical,b.canonical,'composition deterministic');
  return a;
}
function cycle(date,data,columns, options) {
  const c=compose(date,data,columns, options), now=`${date}T20:00:00Z`;
  const decision={schemaVersion:'daily-issue-admission-v1',decision:'ACCEPT_LOCAL_CANONICAL_WRITE',editionDate:date,envelopeSha256:c.sha256,reviewedAt:now,reviewedBy:'independent-synthetic-test-fixture',reviewerRole:'independent test fixture ONLY, not editorial admission'};
  const args={store,envelope:c.envelope,envelopeRaw:c.canonical,decision,maker:'synthetic-fixture-maker',now};
  const first=promoteDailyIssue(args);
  assert.equal(promoteDailyIssue({...args,store:first.store}).changed,false,'promotion idempotent');
  verifyProjectionAdmission({issue:first.issue,envelopeRaw:c.canonical,decision});
  const projected=projectDailyIssue({dataset:data,issue:first.issue,columns});
  assert.deepEqual(projectDailyIssue({dataset:projected,issue:first.issue,columns}),projected,'projection idempotent');
  assert.deepEqual(projected.stories,data.stories,'no story rewrite');
  assert.deepEqual(projected.publications.weekly,data.publications.weekly,'original Weekly metadata preserved');
  assert.deepEqual(projected.publications['big-picture'],data.publications['big-picture'],'Big Picture untouched');
  const derived=buildDerivatives({storyRaw:encode(projected),columns,issues:first.store});
  assert.deepEqual(buildDerivatives({storyRaw:encode(projected),columns,issues:first.store}),derived,'derivatives deterministic');
  return {c,first,projected,derived,decision};
}
const quiet=cycle(tomorrow,base,bank);
assert.equal(quiet.first.issue.disposition,'quiet','prior-date bank rows cannot silently become tomorrow admission');
assert.deepEqual(quiet.first.issue.storyIds,[],'no old Daily news carried');
assert.equal(quiet.first.issue.frontPaigeStoryId,base.publications.daily.issue.frontPaigeStoryId,'Front retained');
assert.deepEqual(quiet.c.envelope.sourceIdentity.dailyRecovery.selection, { status: 'NO_ACTIVE_RECOVERY', quietAllowed: true, activeCount: 0 }, 'new quiet issue binds an empty recovery queue');
put('operations/product-stewards/newsstand/story-recovery-queue.json', JSON.stringify({ schema: 'laidies.newsstand-story-recovery-queue.v1', items: [{ active: true, status: 'READY_FOR_ADMISSION' }] }));
assert.throws(() => compose(tomorrow,base,bank), /quiet recovery queue has active work/, 'an active recovery item blocks a new quiet issue');
assert.throws(() => promoteDailyIssue({ store, envelope: quiet.c.envelope, envelopeRaw: quiet.c.canonical, decision: quiet.decision, maker: 'synthetic-fixture-maker', now: `${tomorrow}T20:00:00Z` }), /quiet recovery queue has active work/, 'a hand-carried quiet envelope cannot bypass the current recovery queue on first promotion');
assert.equal(promoteDailyIssue({ store: quiet.first.store, envelope: quiet.c.envelope, envelopeRaw: quiet.c.canonical, decision: quiet.decision, maker: 'synthetic-fixture-maker', now: `${tomorrow}T20:00:00Z` }).changed, false, 'exact stored quiet replay does not re-evaluate a later queue');
put('operations/product-stewards/newsstand/story-recovery-queue.json', JSON.stringify({ schema: 'laidies.newsstand-story-recovery-queue.v1', items: [] }));
// Exact-date service fixture reuses existing copy; this is not a public admission.
const admittedHistory=JSON.parse(fs.readFileSync(path.join(ROOT,'content/newsstand-daily-issues.json'),'utf8'));
const admittedIds=new Set(admittedHistory.issues.filter(i=>i.status==='complete'&&i.admission).flatMap(i=>i.serviceRecordIds));
const prior=bank.records.find(r=>admittedIds.has(r.id)&&r.type!=='career_life'&&['APPROVED','PUBLISHED','CORRECTED'].includes(r.status)&&r.publicEligibility==='ELIGIBLE');
if (!prior) throw new Error('test needs one previously admitted service exemplar');
const service={...structuredClone(prior),id:`TEST-${tomorrow}-SERVICE`,editionDate:tomorrow,predecessorRecordId:prior.id,freshness:{...prior.freshness,expiresAt:tomorrow}};
const serviceBank={...bank,records:[...bank.records,service]};
const ready=cycle(tomorrow,base,serviceBank,{sourceHold:true});
const afterQuiet=cycle(tomorrow,quiet.projected,serviceBank);
assert.deepEqual(afterQuiet.first.issue.serviceRecordIds,[service.id],'service test does not depend on a nonempty incumbent issue');
assert.deepEqual(ready.first.issue.serviceRecordIds,[service.id]);
assert.equal(ready.first.issue.disposition,'service_ready');
assert.equal(ready.c.envelope.sourceIdentity.dailyCoverage, undefined, 'synthetic source hold cannot block an independently admitted service issue or become a quiet binding');
for (const invalid of [{status:'HOLD'},{publicEligibility:'INELIGIBLE'},{editionDate:'2099-01-01'},{freshness:{...service.freshness,expiresAt:'2000-01-01'}}]) {
  assert.equal(compose(tomorrow,base,{...bank,records:[{...service,...invalid}]}).envelope.desks.filter(d=>d.state==='ready').length,0,'unsafe service excluded');
}
// Synthetic Weekly carries an explicit identity; copy is never released.
const weeklyDate='2026-08-19';
const weekly={...structuredClone(base.stories.find(s=>s.edition==='weekly')),id:'weekly-synthetic-continuity',slug:'weekly-synthetic-continuity',status:'published',publishedAt:weeklyDate+'T15:00:00Z',updatedAt:weeklyDate+'T15:00:00Z',lastCheckedAt:weeklyDate+'T15:00:00Z',sourceApproval:{status:'approved'},front_summary:'WITHDRAWN_BODY_MUST_NOT_EXPORT.'};
const wd=structuredClone(base); wd.stories.push(weekly);
wd.publications.weekly={...wd.publications.weekly,status:'current',storyId:weekly.id,editionDate:weeklyDate,editorialTimeZone:'America/Vancouver',publishedAt:weekly.publishedAt,updatedAt:weekly.updatedAt,lastCheckedAt:weekly.lastCheckedAt};
weekly.sourceApproval=structuredClone(base.stories.find(s=>s.sourceApproval?.status==='approved').sourceApproval);
assert.deepEqual(Array.from(contract.validate(wd)),[], 'synthetic Weekly fixture meets existing reader contract');
for (const days of [6,7,8,13]) {
  const date=new Date(Date.parse(weeklyDate+'T12:00:00Z')+days*86400000).toISOString().slice(0,10);
  const result=cycle(date,wd,{...bank,records:[]});
  assert.equal(result.first.issue.weeklyStoryId,weekly.id);
  assert.equal(contract.effectivePublicationState(wd.publications.weekly,date+'T20:00:00Z'),'current');
  assert.equal(contract.accessDecision(wd,weekly,{scope:'listing'},date+'T20:00:00Z').canExpose,true);
  assert.equal(result.derived.feed.current.find(s=>s.id===weekly.id).publishedAt,weekly.publishedAt);
}
const omitted={...quiet.first.issue,weeklyStoryId:null};
assert.throws(()=>projectDailyIssue({dataset:wd,issue:omitted,columns:bank}),/preserve the exact/,'Daily cannot erase current Weekly');
const successor={...weekly,id:'weekly-synthetic-successor',slug:'weekly-synthetic-successor',publishedAt:'2026-08-26T15:00:00Z',status:'hold'};
wd.stories.push(successor);
assert.equal(compose(tomorrow,wd,bank).envelope.weeklyStoryId,weekly.id,'held successor cannot replace');
successor.status='published';
assert.equal(compose(tomorrow,wd,bank).envelope.weeklyStoryId,weekly.id,'unselected approved successor cannot replace');
wd.publications.weekly={...wd.publications.weekly,storyId:successor.id,editionDate:'2026-08-26',publishedAt:successor.publishedAt};
assert.equal(cycle(tomorrow,wd,bank).first.issue.weeklyStoryId,successor.id,'explicit admitted successor replaces once');
for(const status of ['hold','retracted']) {
  successor.status=status;
  assert.throws(()=>compose(tomorrow,wd,bank),/current Weekly lacks/);
  assert.equal(contract.accessDecision(wd,successor,{scope:'hash'},tomorrow+'T20:00:00Z').canExpose,false);
}
successor.front_summary='WITHDRAWN_BODY_MUST_NOT_EXPORT.';
const withdrawn=buildDerivatives({storyRaw:encode(wd),columns:bank,issues:store});
assert.equal(withdrawn.feed.current.some(s=>s.id===successor.id),false);
assert.equal(withdrawn.feed.archive.find(s=>s.id===successor.id).summary,'This story has been withdrawn.');
assert.equal(withdrawn.archive.items.find(s=>s.id===`story:${successor.id}`).summary,'This story has been withdrawn.');
// Preserve a tomorrow QUIET fixture for optional browser regression. Private only.
put('content/newsstand-stories.js',encode(quiet.projected)); put('content/daily-edition-columns.json',JSON.stringify(bank));
const originalStore=JSON.parse(fs.readFileSync(path.join(ROOT,'content/newsstand-daily-issues.json'),'utf8'));
originalStore.issues.push(quiet.first.issue);
put('content/newsstand-daily-issues.json',JSON.stringify(originalStore));
const final=buildDerivatives({storyRaw:encode(quiet.projected),columns:bank,issues:originalStore});
put('content/newsstand-public-feed.json',JSON.stringify(final.feed)); put('content/newsstand-archive-index.json',JSON.stringify(final.archive));
// Separate isolated browser fixture: current Weekly older than last visit.
const weeklyData=structuredClone(base); weeklyData.stories.push(weekly);
weeklyData.publications.weekly={...wd.publications.weekly,storyId:weekly.id,editionDate:weeklyDate,publishedAt:weekly.publishedAt,updatedAt:weekly.updatedAt,lastCheckedAt:weekly.lastCheckedAt};
const wc=cycle(tomorrow,weeklyData,bank);
const ws={...originalStore,issues:originalStore.issues.filter(i=>i.editionDate!==tomorrow).concat(wc.first.issue)};
const wb=buildDerivatives({storyRaw:encode(wc.projected),columns:bank,issues:ws});
put('weekly/content/newsstand-stories.js',encode(wc.projected)); put('weekly/content/newsstand-daily-issues.json',JSON.stringify(ws));
put('weekly/content/daily-edition-columns.json',JSON.stringify(bank)); put('weekly/content/newsstand-public-feed.json',JSON.stringify(wb.feed)); put('weekly/content/newsstand-archive-index.json',JSON.stringify(wb.archive));
// cycle() writes its source inputs; restore root quiet browser fixture.
put('content/newsstand-stories.js',encode(quiet.projected)); put('content/daily-edition-columns.json',JSON.stringify(bank));
console.log(`NEWSSTAND NEXT CYCLE PASS tomorrow=${tomorrow} quiet=1 service=1 idempotent=1 weekly_days=6,7,8,14 original_dates=1 held_successor=1 exact_successor=1 retraction_notice_only=1 no_public_write=1 fixture=${fixture}`);
