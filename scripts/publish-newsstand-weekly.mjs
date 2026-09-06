#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {inspectProseReviewChain} from './check-prose-quality-admission.mjs';
import {stable, vancouverDay, candidateReviewText, readCandidateBinding} from './validate-newsstand-ordinary-story-candidate.mjs';
import {inspectContentProducerContract} from './check-content-producer-contract.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const reader=createRequire(import.meta.url)('../content/newsstand-reader-contract.js');
const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
const fail=message=>{throw new Error(`NEWSSTAND_WEEKLY_PUBLICATION_REJECT: ${message}`)};
const DATE=/^\d{4}-\d{2}-\d{2}$/;
const validCalendarDate=date=>{
  if(!DATE.test(date||'')) return false;
  const value=new Date(`${date}T12:00:00Z`);
  return Number.isFinite(value.getTime())&&value.toISOString().slice(0,10)===date;
};
const iso=value=>typeof value==='string'&&Number.isFinite(Date.parse(value));
const wednesday=date=>validCalendarDate(date)&&new Date(`${date}T12:00:00Z`).getUTCDay()===3;
const sunday=date=>validCalendarDate(date)&&new Date(`${date}T12:00:00Z`).getUTCDay()===0;
const period=date=>({startDate:new Date(Date.parse(`${date}T12:00:00Z`)-7*86400000).toISOString().slice(0,10),endDate:date});
const correctivePeriod=date=>({startDate:new Date(Date.parse(`${date}T12:00:00Z`)-6*86400000).toISOString().slice(0,10),endDate:date});
const equal=(a,b)=>stable(a)===stable(b);
export function validateWeeklyPublicationTiming({candidate,date,now,current}){
  const corrective=candidate && candidate.correctivePublication;
  if(!validCalendarDate(date)) fail('Weekly publication date must be a real YYYY-MM-DD date');
  if(!corrective&&!wednesday(date))fail('Weekly publication date must be a Wednesday');
  if(date!==vancouverDay(now))fail('Weekly publication date must be today in Vancouver');
  if(!corrective){if(!equal(candidate.period,period(date)))fail('Weekly period must be the exact Wednesday-to-Wednesday window');return {corrective:null,pointerNote:`The ${candidate.period.startDate}–${candidate.period.endDate} Weekly.`};}
  if(Object.keys(corrective).sort().join(',')!=='mode,period,publicationDate'||!corrective.period||Object.keys(corrective.period).sort().join(',')!=='endDate,startDate'||corrective.mode!=='MISSED_WEDNESDAY_CURRENT_WEEK'||!sunday(date)||corrective.publicationDate!==date||!equal(corrective.period,correctivePeriod(date))||!equal(candidate.period,correctivePeriod(date)))fail('corrective Weekly metadata is invalid');
  const missedWednesday=new Date(`${date}T12:00:00Z`);missedWednesday.setUTCDate(missedWednesday.getUTCDate()-4);const missedDate=missedWednesday.toISOString().slice(0,10);
  if(!current||!wednesday(current.editionDate)||current.editionDate>=missedDate)fail('corrective Weekly requires a missed Wednesday successor');
  return {corrective,pointerNote:`The ${candidate.period.startDate}–${candidate.period.endDate} corrective Weekly.`};
}
export function validateWeeklySelection(candidate) {
  const selection=candidate.selection;
  if(!selection || selection.scoutingScope!=="WIDER_NEWS_AND_PRIMARY_ANNOUNCEMENTS" || !Array.isArray(selection.developments) || !selection.developments.length) fail('Weekly selection requires wider-news scouting and dated developments');
  const ids=new Set((candidate.story?.sources||[]).map(s=>s.id));
  for(const item of selection.developments){
    if(!item?.headline || !validCalendarDate(item.announcementDate) || item.announcementDate<candidate.period.startDate || item.announcementDate>candidate.period.endDate || !Array.isArray(item.sourceIds) || !item.sourceIds.length || item.sourceIds.some(id=>!ids.has(id)) || !item.dateEvidence) fail('Weekly development must bind an in-period original announcement date and public source');
  }
  return selection;
}
function parseDataset(raw){const c={window:{}};try{vm.runInNewContext(raw,c,{timeout:1000})}catch{fail('canonical story dataset cannot be evaluated')} const d=JSON.parse(JSON.stringify(c.window.NEWSSTAND_DATA));if(!d?.publications?.weekly||!Array.isArray(d.stories))fail('canonical Weekly pointer is missing');return d}
function exact(binding, raw, label){if(!binding?.path||!/^[a-f0-9]{64}$/.test(binding.sha256||'')||binding.sha256!==hash(raw))fail(`${label} binding changed`)}
function claims(story,map){const ids=new Set((story.sources||[]).map(s=>s.id));if(!ids.size||!Array.isArray(map)||!map.length||map.some(c=>!c?.claimId||!['VERIFIED','QUALIFIED'].includes(c.status)||!Array.isArray(c.sourceIds)||!c.sourceIds.length||c.sourceIds.some(id=>!ids.has(id))))fail('Weekly claim map is incomplete or references unknown sources')}
function boundJson(root,binding,label){return JSON.parse(readCandidateBinding(root,binding,label))}
function validateWeeklyEvidence(candidate,story,publicationDate,root){
  const sourceText=readCandidateBinding(root,candidate.sourceText,'Weekly sourceText');
  const claimMap=boundJson(root,candidate.claimMap,'Weekly claimMap');
  const producer=boundJson(root,candidate.producerReview,'Weekly producer review');
  const independent=boundJson(root,candidate.independentReview,'Weekly independent review');
  const contract=boundJson(root,candidate.producerContract,'Weekly producer contract');
  const rawReport=boundJson(root,candidate.independentRawReport,'Weekly independent raw report');
  if(sourceText!==candidateReviewText(story))fail('Weekly reviewed text is not the exact complete candidate story');
  const preflight=inspectContentProducerContract(contract,{root});
  if(preflight.errors.length||contract.status!=='READY_TO_DRAFT'||contract.candidateId!==candidate.candidateId||contract.contentClass!=='NEWS'||contract.surface!=='NEWSSTAND_WEEKLY'||contract.producer!==producer.maker)fail(`Weekly producer contract is invalid${preflight.errors.length?`: ${preflight.errors.join('; ')}`:''}`);
  claims(story,claimMap);
  if(!equal(independent.factualReview?.claimMap,claimMap)||independent.factualReview?.disposition!=='CLAIMS_REVIEWED'||independent.factualReview?.reviewedThrough!==publicationDate||vancouverDay(story.lastCheckedAt)!==publicationDate)fail('Weekly independent claim map or source date is invalid');
  if(!equal(independent.reportBinding,candidate.independentRawReport)||rawReport.candidateId!==candidate.candidateId||rawReport.storySha256!==candidate.storySha256||rawReport.reviewerPrincipalId!==independent.reviewer?.principalId||rawReport.verdict!=='PASS'||!rawReport.findings)fail('Weekly raw independent report is not bound to the exact review');
  if(!Array.isArray(candidate.sources)||candidate.sources.length!==story.sources?.length||new Set(candidate.sources.map(s=>s.id)).size!==candidate.sources.length)fail('Weekly needs one source-evidence binding per public source');
  for(const source of story.sources){const bound=candidate.sources.find(item=>item.id===source.id&&item.url===source.url);if(!bound||source.accessedAt!==publicationDate||!independent.factualReview.sourceBindings?.some(item=>equal(item,bound.evidence)))fail('Weekly public source is not independently bound');readCandidateBinding(root,bound.evidence,'Weekly public source evidence')}
  return {producer,independent,claimMap};
}
export function publishNewsstandWeekly({datasetRaw,candidate,producer,independent,manifest,reviewTextRaw,root=ROOT,now=new Date().toISOString(),inspectChain=inspectProseReviewChain,validateReader=reader.validate}){
  if(!candidate||candidate.schemaVersion!=='newsstand-weekly-candidate-v1'||candidate.candidateStatus!=='READY_FOR_WEEKLY_ADMISSION')fail('Weekly candidate schema/status is invalid');
  exact(candidate.publicationBase,datasetRaw,'publication base');
  const data=parseDataset(datasetRaw), story=candidate.story, date=candidate.publicationDate;
  const timing=validateWeeklyPublicationTiming({candidate,date,now,current:data.publications.weekly});
  validateWeeklySelection(candidate);
  if(!story||story.edition!=='weekly'||story.status!=='hold'||story.publishedAt!==null||story.sourceApproval?.status!=='independent-review-required'||story.id!==candidate.candidateId||!story.heroVisual?.src||!story.heroVisual?.alt)fail('Weekly story is not a held, complete Weekly candidate');
  if(story.bigPicture!==null||!Array.isArray(story.predecessorStoryIds)||story.predecessorStoryIds.length||!Array.isArray(story.successorStoryIds)||story.successorStoryIds.length)fail('Weekly candidate cannot use ordinary lineage or Big Picture scope');
  if(!Array.isArray(story.weeklyHighlights)||!story.weeklyHighlights.length||!story.front_read||!story.the_story||!story.laidies_read||!story.what_this_means)fail('Weekly candidate lacks complete Weekly reader fields');
  if(candidate.storySha256!==hash(stable(story))||manifest?.reviewedContentSha256!==candidate.storySha256||reviewTextRaw!==`${stable(story)}\n`||candidate.manifest?.path!==producer?.artifact?.manifest?.path||candidate.manifest?.sha256!==producer?.artifact?.manifest?.sha256||candidate.manifest?.path!==independent?.artifact?.manifest?.path||candidate.manifest?.sha256!==independent?.artifact?.manifest?.sha256||candidate.reviewText?.path!==producer?.artifact?.reviewText?.path||candidate.reviewText?.sha256!==producer?.artifact?.reviewText?.sha256||candidate.reviewText?.path!==independent?.artifact?.reviewText?.path||candidate.reviewText?.sha256!==independent?.artifact?.reviewText?.sha256)fail('manifest/review text does not bind the exact complete Weekly prose and both reviews');
  const bound=validateWeeklyEvidence(candidate,story,date,root); producer=bound.producer; independent=bound.independent;
  const policyBypass=review=>review?.policy?.mode||review?.samplingOverride||(review?.calibration?.mode && !(review?.newsEditorialReview && review.calibration.mode === "ORDINARY_NEWS_BLIND_REJECTION_V1"));
  if(producer?.verdict!=='PASS'||independent?.verdict!=='PASS'||producer?.maker===independent?.reviewer?.principalId||producer.surface!=='NEWSSTAND_WEEKLY'||independent.surface!=='NEWSSTAND_WEEKLY'||producer.contentClass!=='NEWS'||independent.contentClass!=='NEWS'||policyBypass(producer)||policyBypass(independent))fail('Weekly producer/independent review pair is invalid');
  const chain=inspectChain(producer,independent,{root});if(chain?.errors?.length)fail(`Weekly review chain failed: ${chain.errors.join('; ')}`);
  if(!Object.values(independent.outcomes||{}).every(outcome=>outcome?.verdict==='PASS'))fail('Weekly independent review has a non-passing current outcome');
  claims(story,bound.claimMap);
  const prior=data.publications.weekly, priorStory=data.stories.find(s=>s.id===prior.storyId);
  if(prior.status!=='current'||!priorStory||priorStory.edition!=='weekly'||!['published','corrected'].includes(priorStory.status)||candidate.priorWeekly?.storyId!==prior.storyId||candidate.priorWeekly?.storySha256!==hash(stable(priorStory)))fail('current prior Weekly binding changed');
  const published={...structuredClone(story),status:'published',publishedAt:now,updatedAt:independent.reviewedAt,lastCheckedAt:independent.reviewedAt,sourceApproval:{status:'approved',record:`newsstand:source-approval:${story.id}`}};
  if(!iso(independent.reviewedAt)||Date.parse(independent.reviewedAt)>Date.parse(now))fail('independent review time is invalid');
  const existing=data.stories.find(s=>s.id===published.id||s.slug===published.slug);
  if(existing)fail('completed Weekly replay is not accepted; prepare a new explicit transaction');
  if(candidate.pointerNote!==timing.pointerNote)fail('Weekly pointer note must be the exact deterministic dated continuity note');
  const next=structuredClone(data);if(!existing)next.stories.push(published);
  next.publications.weekly={...prior,edition:'weekly',status:'current',storyId:published.id,editionDate:date,editorialTimeZone:'America/Vancouver',publishedAt:published.publishedAt,updatedAt:published.updatedAt,lastCheckedAt:published.lastCheckedAt,note:timing.pointerNote};
  delete next.publications.weekly.correctivePublication;
  if(timing.corrective) next.publications.weekly.correctivePublication=timing.corrective;
  const errors=validateReader(next);if(errors.length)fail(`updated Weekly dataset fails reader contract: ${errors.join('; ')}`);
  return {dataset:next,publishedStory:published,changed:true,idempotent:false};
}
function arg(flag,args){const i=args.indexOf(flag);return i<0?null:args[i+1]}
function local(root,value,label){const p=path.resolve(root,value||'');if(!p.startsWith(root+path.sep)||!fs.existsSync(p))fail(`${label} must exist inside the repository root`);return p}
function main(){const args=process.argv.slice(2),root=path.resolve(arg('--root',args)||ROOT),nowOverride=arg('--now',args);if(nowOverride&&root===ROOT)fail('--now is limited to a disposable non-production root');const candidatePath=local(root,arg('--candidate',args),'--candidate'),datasetPath=local(root,arg('--dataset',args)||'content/newsstand-stories.js','--dataset'),write=args.includes('--write'),now=nowOverride||new Date().toISOString();const candidate=JSON.parse(fs.readFileSync(candidatePath,'utf8'));const raw=key=>{const b=candidate[key],p=local(root,b?.path,`candidate.${key}`),value=fs.readFileSync(p,'utf8');exact(b,value,`candidate.${key}`);return value},read=key=>JSON.parse(raw(key));const before=fs.readFileSync(datasetPath,'utf8');const result=publishNewsstandWeekly({datasetRaw:before,candidate,producer:read('producerReview'),independent:read('independentReview'),manifest:read('manifest'),reviewTextRaw:raw('reviewText'),root,now});if(write){if(fs.readFileSync(datasetPath,'utf8')!==before)fail('canonical dataset changed during Weekly transaction');const rendered=`window.NEWSSTAND_DATA = ${JSON.stringify(result.dataset,null,2)};\n\n/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`;const tmp=`${datasetPath}.tmp-${process.pid}`;fs.writeFileSync(tmp,rendered,{flag:'wx'});if(fs.readFileSync(datasetPath,'utf8')!==before){fs.unlinkSync(tmp);fail('canonical dataset changed before rename')}fs.renameSync(tmp,datasetPath)}console.log(`NEWSSTAND WEEKLY PUBLICATION ${write?'LOCAL_WRITE':'CHECK'} READY story=${result.publishedStory.id} canonical_write=${write}`)}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{main()}catch(e){console.error(String(e?.message||e));process.exitCode=1}}
