import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {inspectCycle,parseStories,inspectCoverage} from './check-newsstand-cycle-completion.mjs';
const story={id:'w',status:'published',edition:'weekly'};
const stories={publications:{weekly:{editionDate:'2026-09-09',storyId:'w'}},stories:[story]};
const issue=d=>({editionDate:d,status:'complete',disposition:'service_ready',storyIds:[],serviceRecordIds:['one']});
const input={issues:{issues:[issue('2026-09-09'),issue('2026-09-10')]},stories,from:'2026-09-09',now:'2026-09-10T18:00:00Z'};
assert.equal(inspectCycle(input).status,'DATED_DELIVERY_PRESENT');
assert.equal(inspectCycle(input).delivered[1].newsStories,0);
const missing=inspectCycle({...input,issues:{issues:[issue('2026-09-09')]}});assert.equal(missing.status,'DELIVERY_INCOMPLETE');assert.deepEqual(missing.missingDailyDates,['2026-09-10']);
const stale=structuredClone(input);stale.stories.publications.weekly.editionDate='2026-09-06';assert.equal(inspectCycle(stale).weekly.overdue,true);
assert.equal(inspectCycle({...input,issues:{issues:[issue('2026-09-09')]},now:'2026-09-10T13:59:00Z'}).status,'DATED_DELIVERY_PRESENT');
assert.equal(inspectCycle({...input,issues:{issues:[issue('2026-09-09')]},now:'2026-09-10T14:00:00Z'}).status,'DELIVERY_INCOMPLETE');
assert.equal(inspectCycle({...input,issues:{issues:[]},now:'2026-09-11T03:00:00Z'}).missingDailyDates.length,2);
assert.throws(()=>inspectCycle({...input,from:'2026-02-30'}));assert.throws(()=>inspectCycle({...input,issues:{}}));assert.throws(()=>inspectCycle({...input,issues:{issues:[issue('2026-09-09'),issue('2026-09-09')]}}));

for(const editionDate of ['not-a-date','9999-99-99','2026-09-11']){const bad=structuredClone(input);bad.stories.publications.weekly.editionDate=editionDate;assert.throws(()=>inspectCycle(bad));}
assert.throws(()=>inspectCycle({...input,from:'2026-09-11'}));

assert.throws(()=>inspectCycle({...input,from:'2026-09-10',now:'2026-09-10T13:59:00Z'}));
console.log('Cycle delivery check: known missing/old/invalid inputs rejected; current, service-only and Vancouver deadline boundaries verified. No editorial approval asserted.');

const wrap=(comment="")=>`window.NEWSSTAND_DATA = ${JSON.stringify(stories)};\n${comment}window.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`;
assert.deepEqual(parseStories(wrap()),stories);
assert.deepEqual(parseStories(wrap("/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */\n")),stories);
assert.throws(()=>parseStories("<html>Access denied</html>"));
assert.throws(()=>parseStories(wrap()+"alert(1)"));
assert.throws(()=>parseStories(wrap().replace("window.NEWSSTAND_DATA.stories;","evil();")));
console.log("Both admitted publisher wrappers parsed without execution; access pages and executable suffixes rejected.");

const coverage={schemaVersion:'newsstand-coverage-progress-v1',asOf:'2026-09-10',checkedAt:'2026-09-10T17:00:00Z',nextReviewAt:'2026-09-10T20:00:00Z',sourceChecks:[{url:'https://example.org/official',role:'PROVIDER',status:'CHECKED',assessment:'Release index read.'},{url:'https://example.org/news',role:'INDEPENDENT_REPORTING',status:'CHECKED',assessment:'Independent agenda read.'}],leads:[{id:'new-report',event:'New misuse report',sourceUrls:['https://example.org/new-report'],status:'IN_PRODUCTION',owner:'producer',nextAction:'Finish source-bound article.'}]};
for (const source of coverage.sourceChecks) source.checkedAt=coverage.checkedAt;
const cp={coverage,stories,now:input.now};
// A successfully delivered service-only day must not conceal an actionable story.
assert.equal(inspectCycle(input).status,'DATED_DELIVERY_PRESENT');
assert.equal(inspectCoverage(cp).status,'COVERAGE_WORK_REMAINS');
const clone=()=>structuredClone(cp);
let c=clone();c.coverage.leads[0]={...c.coverage.leads[0],status:'COVERED',storyId:'w',coverageReason:'Same provider mentioned in Weekly.'};assert.throws(()=>inspectCoverage(c),/does not cite this event/);
c=clone();c.coverage.leads[0]={...c.coverage.leads[0],status:'PUBLISHED',storyId:'missing',coverageReason:'Published.'};assert.throws(()=>inspectCoverage(c),/lacks published/);
c=clone();c.coverage.sourceChecks.pop();assert.throws(()=>inspectCoverage(c),/independent/);
c=clone();c.coverage.asOf='2026-09-09';assert.throws(()=>inspectCoverage(c),/stale/);
c=clone();c.coverage.nextReviewAt=input.now;assert.throws(()=>inspectCoverage(c),/stale/);
c=clone();c.coverage.leads[0].status='EVIDENCE_BLOCKED';assert.throws(()=>inspectCoverage(c),/actual attempt/);
c=clone();c.coverage.leads[0]={...c.coverage.leads[0],status:'EVIDENCE_BLOCKED',attemptedRecovery:'Primary site and alternate publisher route unavailable.',missingInput:'Complete methods',nextCheckAt:'2026-09-10T19:00:00Z'};assert.equal(inspectCoverage(c).status,'COVERAGE_SOURCE_HOLDS');c.coverage.leads[0].nextCheckAt='2026-09-10T17:30:00Z';assert.equal(inspectCoverage(c).status,'COVERAGE_WORK_REMAINS');
c=clone();c.coverage.leads[0].status='EXCLUDED';assert.throws(()=>inspectCoverage(c),/reasoned/);
c=clone();c.stories.stories[0].sources=[{url:'https://example.org/new-report'}];c.coverage.leads[0]={...c.coverage.leads[0],status:'COVERED',storyId:'w',coverageReason:'This exact report and reader question are explained in the cited section.'};assert.equal(inspectCoverage(c).status,'INTAKE_DISPOSITIONED');
console.log('Coverage calibration: delivered-but-unfinished, wrong-event Weekly, missing story, stale/one-sided sweep, hollow holds and exclusions rejected; actual dispositions remain distinct from discovery/quality approval.');

for (const checkedAt of [undefined,'invalid','2026-09-09T16:00:00Z','2026-09-10T18:01:00Z']) { const bad=clone(); bad.coverage.sourceChecks[0].checkedAt=checkedAt; assert.throws(()=>inspectCoverage(bad),/source observation/); }
console.log('Per-source freshness: missing, invalid, stale and future observations rejected even when the overall sweep date is fresh.');

// A historical nonretryable failure stays BLOCKED. Only an actual bound recovery
// review may keep its scheduling disposition current; it cannot replace a sweep.
const evidenceRoot=fs.mkdtempSync(path.join(os.tmpdir(),'newsstand-recovery-test-'));
try {
 const write=(name,value)=>{const raw=typeof value==='string'?value:JSON.stringify(value);fs.writeFileSync(path.join(evidenceRoot,name),raw);return {path:name,sha256:createHash('sha256').update(raw).digest('hex')};};
 const originalCapture=write('original.txt','Original route denied. No retry permitted.');
 const alternativeCapture=write('alternative.txt','Distinct publisher index inspected; complete held report still absent.');
 const blocked={url:'https://example.org/blocked',role:'INDEPENDENT_REPORTING',status:'BLOCKED',checkedAt:'2026-09-08T17:00:00Z',assessment:'Original access restriction retained.',retryPolicy:'NONRETRYABLE',missingInput:'Complete accessible report.',nextCheckAt:'2026-09-10T19:00:00Z'};
 const review={schemaVersion:'newsstand-source-recovery-review-v1',url:blocked.url,originalCheckedAt:blocked.checkedAt,originalNotRetried:true,reviewedAt:'2026-09-10T17:00:00Z',reviewedBy:'independent-scout',assessment:'Distinct publisher inspected; source gap remains.',missingInput:blocked.missingInput,nextCheckAt:blocked.nextCheckAt,nextRecoveryStep:'Seek a legitimate distinct institutional report; do not retry original.',originalCapture,recoverySources:[{url:'https://example.net/publisher',checkedAt:'2026-09-10T16:55:00Z',status:'CHECKED',assessment:'No complete report available.',capture:alternativeCapture}]};
 const held=()=>{const test=clone();test.evidenceRoot=evidenceRoot;test.coverage.leads=[];test.coverage.sourceChecks.push({...blocked,recoveryReview:write('review.json',review)});return test;};
 let valid=held();const result=inspectCoverage(valid);assert.equal(result.status,'COVERAGE_SOURCE_HOLDS');assert.deepEqual(result.holds,[blocked.url]);assert.equal(valid.coverage.sourceChecks.at(-1).checkedAt,blocked.checkedAt);assert.equal(valid.coverage.sourceChecks.at(-1).status,'BLOCKED');
 // Without a genuinely CHECKED independent desk, the retained block is insufficient.
 valid=held();valid.coverage.sourceChecks=valid.coverage.sourceChecks.filter(s=>s.role!=='INDEPENDENT_REPORTING'||s.status==='BLOCKED');assert.throws(()=>inspectCoverage(valid),/independent/);
 for(const mutate of [
  test=>delete test.coverage.sourceChecks.at(-1).retryPolicy,
  test=>delete test.coverage.sourceChecks.at(-1).recoveryReview,
  test=>test.coverage.sourceChecks.at(-1).status='CHECKED',
  test=>test.coverage.sourceChecks.at(-1).recoveryReview.sha256='0'.repeat(64),
  test=>test.coverage.sourceChecks.at(-1).recoveryReview.path='absent.json',
 ]){const bad=held();mutate(bad);assert.throws(()=>inspectCoverage(bad));}
 for(const mutate of [
  r=>r.reviewedAt='2026-09-09T16:00:00Z',
  r=>r.reviewedAt='2026-09-10T18:01:00Z',
  r=>r.originalCheckedAt='2026-09-08T18:00:00Z',
  r=>r.originalNotRetried=false,
  r=>r.missingInput='A different gap.',
  r=>r.nextCheckAt='2026-09-10T20:00:00Z',
  r=>r.recoverySources=[],
  r=>r.recoverySources[0].url=blocked.url,
  r=>r.recoverySources[0].checkedAt='2026-09-09T16:00:00Z',
  r=>r.recoverySources[0].capture.sha256='0'.repeat(64),
  r=>r.originalCapture.path='../outside.txt',
 ]){const bad=held(),record=structuredClone(review);mutate(record);bad.coverage.sourceChecks.at(-1).recoveryReview=write('review.json',record);assert.throws(()=>inspectCoverage(bad));}
 const due=held(),record=structuredClone(review);record.nextCheckAt='2026-09-10T17:30:00Z';due.coverage.sourceChecks.at(-1).nextCheckAt=record.nextCheckAt;due.coverage.sourceChecks.at(-1).recoveryReview=write('review.json',record);assert.equal(inspectCoverage(due).status,'COVERAGE_WORK_REMAINS');
 console.log('Retained-block calibration: bound fresh distinct recovery preserves BLOCKED; stale/future/hollow/mismatched/tampered reviews, changed original observations and missing checked desks rejected; due recovery still pending.');
}finally{fs.rmSync(evidenceRoot,{recursive:true,force:true});}

// Reproduce the incident: delivered services must explicitly flag stalled news.
assert.equal(inspectCycle(input).newsPublication.status,'NEWS_PUBLICATION_NEEDS_ATTENTION');
assert.equal(inspectCycle(input).newsPublication.consecutiveServiceOnlyDays,2);
const resumed=structuredClone(input);resumed.issues.issues[1].storyIds=['real-news'];
assert.equal(inspectCycle(resumed).newsPublication.status,'NEWS_PRESENT');
const oneDay=structuredClone(input);oneDay.issues.issues[0].storyIds=['real-news'];
assert.equal(inspectCycle(oneDay).newsPublication.status,'NO_NEW_NEWS_TODAY');
assert.equal(inspectCycle(oneDay).newsPublication.requiresEditorialDisposition,false);
console.log('News publication signal: consecutive service-only editions flagged; resumed publication clears streak; one quiet day does not impose a news quota.');
