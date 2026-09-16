#!/usr/bin/env node
// Operational delivery check only: never grants editorial or release approval.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const datePattern=/^\d{4}-\d{2}-\d{2}$/;
function date(value){if(!datePattern.test(value)||new Date(value+'T12:00:00Z').toISOString().slice(0,10)!==value)throw Error('Invalid date: '+value);return value;}
export function parseStories(raw) {
 const match=raw.match(/^window\.NEWSSTAND_DATA\s*=\s*([\s\S]*?);\s*(?:\/\*[\s\S]*?\*\/\s*)?window\.NEWSSTAND_STORIES\s*=\s*window\.NEWSSTAND_DATA\.stories;\s*$/);
 if(!match)throw Error('Unrecognized story data wrapper');
 return JSON.parse(match[1]);
}
export function inspectCycle({issues,stories,from,now=new Date().toISOString()}) {
 date(from);const instant=new Date(now);if(!Number.isFinite(+instant))throw Error('Invalid now');
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(instant).map(p=>[p.type,p.value]));
 const today=`${parts.year}-${parts.month}-${parts.day}`;
 const through=Number(parts.hour)>=7?today:new Date(Date.parse(today+'T12:00:00Z')-86400000).toISOString().slice(0,10);
 if(from>through)throw Error('Recovery start cannot be after the last due date');
 if(!Array.isArray(issues?.issues)||!stories?.publications?.weekly||!Array.isArray(stories.stories))throw Error('Public data shape unavailable');
 const byDate=new Map();for(const row of issues.issues){date(row.editionDate);if(byDate.has(row.editionDate))throw Error('Duplicate issue date');byDate.set(row.editionDate,row);}
 const missing=[];const delivered=[];
 for(let day=from;day<=through;day=new Date(Date.parse(day+'T12:00:00Z')+86400000).toISOString().slice(0,10)){
  const row=byDate.get(day);
  if(row?.status!=='complete')missing.push(day);
  else delivered.push({date:day,disposition:row.disposition,newsStories:row.storyIds?.length||0,services:row.serviceRecordIds?.length||0});
 }
 const end=new Date(through+'T12:00:00Z');const offset=(end.getUTCDay()+4)%7;const expectedWeekly=new Date(+end-offset*86400000).toISOString().slice(0,10);
 const weekly=stories.publications.weekly;if(weekly.editionDate){date(weekly.editionDate);if(weekly.editionDate>today)throw Error('Future public Weekly date');}const weeklyStory=stories.stories.find(s=>s.id===weekly.storyId&&s.status==='published');
 const weeklyOverdue=expectedWeekly>=from&&(!weeklyStory||!weekly.editionDate||weekly.editionDate<expectedWeekly);
 const latestNews=stories.stories.filter(s=>s.status==='published'&&s.edition==='daily'&&s.badge==='THE LATEST').map(s=>({id:s.id,publishedAt:s.publishedAt})).sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt)))[0]||null;
 return {observedAt:now,timeZone:'America/Vancouver',today,dueThrough:through,status:missing.length||weeklyOverdue?'DELIVERY_INCOMPLETE':'DATED_DELIVERY_PRESENT',missingDailyDates:missing,delivered,weekly:{expected:expectedWeekly,actual:weekly.editionDate,overdue:weeklyOverdue},latestNews,scope:'Public delivery presence only; service-only is not new news, and this does not certify research, editorial quality, source freshness or browser verification.'};
}
// This checks intake disposition, not whether the editor discovered every story.
// The independent source sweep remains necessary; a delivered issue is insufficient.
export function inspectCoverage({coverage,stories,now=new Date().toISOString(),evidenceRoot=root}) {
 const fail=message=>{throw Error('Coverage: '+message);};
 const nonempty=value=>typeof value==='string'&&value.trim().length>0;
 const instant=Date.parse(now);if(!Number.isFinite(instant))fail('invalid now');
 const fresh=value=>Number.isFinite(Date.parse(value))&&Date.parse(value)<=instant&&instant-Date.parse(value)<=24*3600000;
 const boundEvidence=binding=>{
  if(!nonempty(binding?.path)||path.isAbsolute(binding.path)||!/^([a-f0-9]{64})$/.test(binding.sha256||''))fail('recovery evidence binding required');
  let raw;
  try {
   const base=fs.realpathSync(evidenceRoot),file=fs.realpathSync(path.resolve(base,binding.path));
   if(!file.startsWith(base+path.sep))fail('recovery evidence outside root');
   raw=fs.readFileSync(file);
  }catch(error){fail('recovery evidence unavailable: '+error.message);}
  if(createHash('sha256').update(raw).digest('hex')!==binding.sha256)fail('recovery evidence checksum mismatch');
  return raw;
 };
 // This is a review of recovery options, never a new observation of the blocked route.
 const retainedBlockReviewed=source=>{
  if(source.status!=='BLOCKED'||source.retryPolicy!=='NONRETRYABLE'||!source.recoveryReview)return false;
  let review;try{review=JSON.parse(boundEvidence(source.recoveryReview));}catch(error){fail('invalid recovery review: '+error.message);}
  if(review.schemaVersion!=='newsstand-source-recovery-review-v1'||review.url!==source.url||review.originalCheckedAt!==source.checkedAt||review.originalNotRetried!==true||!fresh(review.reviewedAt)||Date.parse(review.reviewedAt)<Date.parse(source.checkedAt)||!nonempty(review.reviewedBy)||!nonempty(review.assessment)||review.missingInput!==source.missingInput||review.nextCheckAt!==source.nextCheckAt||!nonempty(review.nextRecoveryStep))fail('unsupported or stale retained-block recovery review: '+source.url);
  boundEvidence(review.originalCapture);
  if(!Array.isArray(review.recoverySources)||!review.recoverySources.length)fail('distinct recovery sources required');
  for(const alternative of review.recoverySources){
   if(!nonempty(alternative.url)||alternative.url===source.url||!['CHECKED','BLOCKED'].includes(alternative.status)||!fresh(alternative.checkedAt)||Date.parse(alternative.checkedAt)>Date.parse(review.reviewedAt)||!nonempty(alternative.assessment))fail('invalid distinct recovery observation');
   boundEvidence(alternative.capture);
  }
  return true;
 };
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Vancouver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(instant));
 if(coverage?.schemaVersion!=='newsstand-coverage-progress-v1'||coverage.asOf!==day)fail('missing or stale dated intake');
 if(!Number.isFinite(Date.parse(coverage.checkedAt))||Date.parse(coverage.checkedAt)>instant||instant-Date.parse(coverage.checkedAt)>24*3600000||!Number.isFinite(Date.parse(coverage.nextReviewAt))||Date.parse(coverage.nextReviewAt)<=instant)fail('source sweep stale or undated');
 if(!Array.isArray(coverage.sourceChecks)||!coverage.sourceChecks.length||!Array.isArray(coverage.leads))fail('source checks and leads required');
 const pending=[];const holds=[];const ids=new Set();
 for(const source of coverage.sourceChecks){
  const observed=Date.parse(source.checkedAt);
  if(!Number.isFinite(observed)||observed>instant||(instant-observed>24*3600000&&!retainedBlockReviewed(source)))fail('source observation missing, stale or future: '+source.url);
  if(!nonempty(source.url)||!nonempty(source.assessment)||!['CHECKED','BLOCKED'].includes(source.status))fail('invalid source check');
  if(source.status==='BLOCKED'){if(!nonempty(source.missingInput)||!Number.isFinite(Date.parse(source.nextCheckAt)))fail('source hold requires missing input and retry');holds.push(source.url);if(Date.parse(source.nextCheckAt)<=instant)pending.push({id:source.url,status:'SOURCE_RECHECK_DUE',nextAction:source.missingInput});}
 }
 if(!coverage.sourceChecks.some(s=>s.role==='INDEPENDENT_REPORTING'&&s.status==='CHECKED')||!coverage.sourceChecks.some(s=>s.role==='PROVIDER'&&s.status==='CHECKED'))fail('official and independent sweeps required');
 const published=new Map(stories.stories.filter(s=>s.status==='published').map(s=>[s.id,s]));
 for(const lead of coverage.leads){
  if(!nonempty(lead.id)||ids.has(lead.id)||!nonempty(lead.event)||!Array.isArray(lead.sourceUrls)||!lead.sourceUrls.length)fail('missing or duplicate event identity');ids.add(lead.id);
  if(['READY','IN_PRODUCTION','UNASSESSED'].includes(lead.status)){
   if(!nonempty(lead.nextAction)||!nonempty(lead.owner))fail('unfinished lead needs owner and next action');pending.push({id:lead.id,status:lead.status,nextAction:lead.nextAction});
  }else if(['PUBLISHED','COVERED'].includes(lead.status)){
   const story=published.get(lead.storyId);if(!story)fail('covered lead lacks published story');
   // Prevent same-provider deduplication or a generic Weekly pointer from closing an event.
   const body=JSON.stringify(story);
   if(!lead.sourceUrls.some(url=>body.includes(url)))fail('covered story does not cite this event source');
   if(!nonempty(lead.coverageReason))fail('covered lead needs reader-question explanation');
  }else if(lead.status==='EVIDENCE_BLOCKED'){
   if(!nonempty(lead.missingInput)||!nonempty(lead.attemptedRecovery)||!Number.isFinite(Date.parse(lead.nextCheckAt)))fail('evidence hold requires actual attempt, missing input and retry');
   holds.push(lead.id);if(Date.parse(lead.nextCheckAt)<=instant)pending.push({id:lead.id,status:'SOURCE_RECHECK_DUE',nextAction:lead.missingInput});
  }else if(lead.status==='EXCLUDED'){
   if(!nonempty(lead.reason)||!nonempty(lead.reviewedBy)||!Number.isFinite(Date.parse(lead.reviewedAt)))fail('exclusion needs reasoned editorial disposition');
  }else fail('unknown lead state');
 }
 return {status:pending.length?'COVERAGE_WORK_REMAINS':holds.length?'COVERAGE_SOURCE_HOLDS':'INTAKE_DISPOSITIONED',pending,holds,leadCount:ids.size,scope:'Intake disposition only, not exhaustive discovery or editorial/publication approval.'};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const args=process.argv.slice(2);const take=(key)=>{const n=args.indexOf(key);return n<0?null:args[n+1];};
  const now=take('--now')||new Date().toISOString();const from=take('--from');if(!from)throw Error('Usage: --from YYYY-MM-DD [--now ISO] [--fixture DIR]');
  const fixture=take('--fixture');
  const get=(name)=>fixture?fs.readFileSync(path.join(fixture,name),'utf8'):execFileSync('curl',['-fsSL','--max-time','30','https://laidies.ai/content/'+name+'?cycle-check='+Date.now()],{encoding:'utf8',maxBuffer:12*1024*1024});
  const issues=JSON.parse(get('newsstand-daily-issues.json'));const parsed=parseStories(get('newsstand-stories.js'));
  const result=inspectCycle({issues,stories:parsed,from,now});
  const coveragePath=take('--coverage');if(coveragePath)result.coverage=inspectCoverage({coverage:JSON.parse(fs.readFileSync(coveragePath,'utf8')),stories:parsed,now});
  console.log(JSON.stringify(result,null,2));if(result.status==='DELIVERY_INCOMPLETE'||result.coverage?.status==='COVERAGE_WORK_REMAINS')process.exitCode=1;
 }catch(error){console.error(JSON.stringify({status:'UNVERIFIED',error:error.message}));process.exitCode=2;}
}
