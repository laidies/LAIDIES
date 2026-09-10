#!/usr/bin/env node
// Deterministically assembles the actual Claude reader judgment and evidence-only
// factual reassessment. It creates no editorial finding and cannot publish.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {normalize,requestFor} from '../../review-runtime/protocol.mjs';
import {resolveNewsstandEditorialPacket} from '../../../../../scripts/compact-newsstand-editorial-input.mjs';

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../../..');
const CANDIDATE=path.relative(ROOT,path.dirname(fileURLToPath(import.meta.url)));
const p=(...parts)=>path.join(ROOT,...parts);
const c=(...parts)=>p(CANDIDATE,...parts);
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const read=file=>fs.readFileSync(file);
const json=file=>JSON.parse(read(file));
const bind=file=>({path:path.relative(ROOT,file).split(path.sep).join('/'),sha256:sha(read(file))});
const stable=value=>value===null||typeof value!=='object'?JSON.stringify(value):Array.isArray(value)?`[${value.map(stable).join(',')}]`:`{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const write=(file,value)=>{fs.mkdirSync(path.dirname(file),{recursive:true});const bytes=JSON.stringify(value,null,2)+'\n';if(fs.existsSync(file)&&fs.readFileSync(file,'utf8')!==bytes)throw Error('Preserve differing assembly output: '+path.relative(ROOT,file));fs.writeFileSync(file,bytes);return bind(file)};
const provider=file=>{const raw=json(file);assert.equal(raw.is_error,false);assert.equal(raw.subtype,'success');assert.ok(Object.keys(raw.modelUsage||{}).includes('claude-fable-5'));return raw.structured_output||JSON.parse(raw.result)};
const replay=(dir,name,kind,section)=>{const packet=json(path.join(dir,name+'-packet.json'));assert.deepEqual(json(path.join(dir,name+'-request.json')),requestFor(kind,packet),'Reviewer request changed');const rawFile=path.join(dir,name+'-provider.raw.json'),judgment=provider(rawFile);assert.deepEqual(json(path.join(dir,name+'-judgment.json')),judgment,'Judgment differs from provider raw');return {packet,rawFile,judgment:section?judgment[section]:judgment};};
const state=v=>v==='pass'?'PASS':v==='hold'?'HOLD':'FAIL';
const actualAt=file=>{const value=json(file);assert.ok(Number.isFinite(Date.parse(value.completedAt)),'Review completion time missing');assert.equal(value.rawSha256,bind(file.replace('-checked.json','-provider.raw.json')).sha256,'Checked/raw binding changed');return value.completedAt};

const firstDir=c('independent-review','runtime-claude-fable-20260910');
const factsDir=c('independent-review','runtime-claude-fable-facts-r2-20260910');
const outputDir=c('independent-review','final');
const story=json(c('story.json')), reviewText=read(c('review-text.json')).toString('utf8'), manifest=json(c('publication-manifest.json')), producer=json(c('producer-self-review.json'));
assert.equal(sha(Buffer.from(reviewText)),manifest.reviewText.sha256,'Review text/manifest changed');
assert.equal(manifest.reviewedContentSha256,sha(Buffer.from(stable(story))),'Story/manifest changed');
const readerRun=replay(firstDir,'article-editorial','editorial','reader');
const factsRun=replay(factsDir,'article-facts','facts');
assert.equal(readerRun.packet.completeArtifact,reviewText,'Reader reviewed different article');
assert.equal(factsRun.packet.completeArtifact,reviewText,'Fact checker reviewed different article');
assert.deepEqual(resolveNewsstandEditorialPacket(json(c('editorial-input.json')),factsRun.packet),factsRun.packet,'Current evidence differs from reviewed packet');
const reader=normalize('reader',readerRun.judgment,readerRun.packet), facts=normalize('facts',factsRun.judgment,factsRun.packet);
assert.equal(reader.verdict,'PASS','Reader verdict is not PASS');assert.equal(facts.verdict,'PASS','Factual verdict is not PASS');
assert.equal(reader.learningDisposition.disposition,'NO_NEW_DEFECT');assert.equal(facts.learningDisposition.disposition,'NO_NEW_DEFECT');
const reviewedAt=actualAt(path.join(factsDir,'article-facts-checked.json'));
assert.ok(Date.parse(reviewedAt)>Date.parse(producer.reviewedAt),'Independent review must follow producer review');
const calibrationResult=json(p('operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/calibration-result.json'));
assert.equal(calibrationResult.status,'CALIBRATION_PASSED');assert.equal(calibrationResult.mode,'ORDINARY_NEWS_BLIND_REJECTION_V1');
const negatives=[];let positive=null,calibrationAt=0;
for(const item of calibrationResult.evaluations){const checked=json(p(item.checkedBinding.path));assert.equal(bind(p(item.checkedBinding.path)).sha256,item.checkedBinding.sha256);assert.equal(bind(p(item.rawBinding.path)).sha256,item.rawBinding.sha256);calibrationAt=Math.max(calibrationAt,Date.parse(checked.completedAt));if(item.actual==='REJECT'){const present=Object.entries(checked.families).filter(([,v])=>v.state==='present');assert.ok(present.length);negatives.push({exemplarId:item.exemplarId,verdict:'REJECT',identifiedFailureFamilies:present.map(([k])=>k),familyAssessments:Object.fromEntries(Object.entries(checked.families).map(([k,v])=>[k,{state:v.state,observation:v.reason,artifactLocator:v.artifactLocator}])),evidence:present.flatMap(([,v])=>v.artifactEvidence||[])});}else if(item.actual==='PASS'){positive={exemplarId:item.exemplarId,verdict:'PASS',strengthsRetained:checked.strengths,evidence:Object.values(checked.families).flatMap(v=>v.artifactEvidence||[]).slice(0,2)};}}
assert.ok(positive?.evidence?.length);
const principal='anthropic:claude-fable-5:newsstand-weekly:medium';
const calibration={mode:calibrationResult.mode,registrySha256:calibrationResult.registrySha256,reviewerPrincipalId:principal,reviewedAt:new Date(calibrationAt).toISOString(),negatives,positive};
const ai=value=>({evidenceType:'AI_EDITORIAL_ANALYSIS',prompt:value.question,response:value.answer,expectedEvidence:value.expectedEvidence,assessment:value.assessment});
const outcomes=Object.fromEntries([...Object.entries(reader.outcomes),...Object.entries(facts.outcomes)].map(([name,value])=>[name,{verdict:state(value.state),observation:value.reason,artifactEvidence:value.artifactEvidence,...(name==='explainBack'?{aiEditorialAnalysis:ai(reader.explainBack)}:{}),...(name==='unseenTransfer'?{aiEditorialAnalysis:ai(reader.unseenTransfer)}:{})}]));
const sourceBindings=producer.factualReview.sourceBindings;
for(const binding of sourceBindings)assert.equal(bind(p(binding.path)).sha256,binding.sha256,'Source binding changed: '+binding.path);
const claimMap=json(c('claim-map.json'));
assert.deepEqual(Object.keys(facts.claims).sort(),claimMap.map(x=>x.claimId).sort(),'Independent fact claim set differs');
for(const claim of claimMap)assert.ok(['supported','qualified'].includes(facts.claims[claim.claimId].state),'Independent claim did not pass: '+claim.claimId);
const analysis={evidenceType:'AI_EDITORIAL_ANALYSIS',candidateId:story.id,reviewerPrincipalId:principal,reviewTextSha256:manifest.reviewText.sha256,outcomes:{explainBack:ai(reader.explainBack),unseenTransfer:ai(reader.unseenTransfer)},checks:Object.fromEntries(Object.entries(reader.newsChecks).map(([name,value])=>[name,{verdict:state(value.state),observation:value.reason,artifactEvidence:value.artifactEvidence}]))};
const analysisBinding=write(path.join(outputDir,'independent-analysis.json'),analysis);
const raw={schemaVersion:'laidies-newsstand-combined-editorial-raw.v1',candidateId:story.id,storySha256:manifest.reviewedContentSha256,reviewerPrincipalId:principal,verdict:'PASS',findings:{reader:reader.summary,facts:facts.summary},readerProviderRaw:bind(readerRun.rawFile),factualProviderRaw:bind(factsRun.rawFile),factualJudgment:bind(path.join(factsDir,'article-facts-judgment.json')),failedInitialCombinedAttempt:{status:'PRESERVED_PROTOCOL_FAILURE_AFTER_EVIDENCE_GAP',failure:bind(path.join(firstDir,'article-editorial-failure.json')),judgment:bind(path.join(firstDir,'article-editorial-judgment.json'))},calibration:bind(p('operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/calibration-result.json'))};
const rawBinding=write(path.join(outputDir,'independent-raw-report.json'),raw), claimBinding=write(path.join(outputDir,'independent-claim-map.json'),claimMap);
const receipt={schemaVersion:'laidies-prose-quality-review.v1',candidateId:story.id,surface:'NEWSSTAND_WEEKLY',contentClass:'NEWS',stage:'INDEPENDENT_SEMANTIC_ADMISSION',maker:producer.maker,reviewer:{id:'claude-fable-newsstand-weekly',principalId:principal,role:'independent Weekly editorial and factual reviewer',modelFamily:'anthropic',modelEffort:'medium',independentFromMaker:true,artifactFirst:true},reviewMode:'EXACT_PROSE_IN_FULL',reviewedAt,verdict:'PASS',limitations:['AI editorial assessment only; no observed human-comprehension evidence is claimed.','The initial factual packet omitted two Anthropic details. That provider attempt and protocol failure are preserved; the article stayed unchanged and the factual reassessment used repaired primary evidence.'],artifact:{manifest:bind(c('publication-manifest.json')),reviewText:bind(c('review-text.json'))},calibration,reverseBrief:reader.reverseBrief,outcomes,failureFamilies:Object.fromEntries(Object.entries(reader.families).map(([name,value])=>[name,{present:value.state==='present',observation:value.reason,artifactLocator:value.artifactLocator}])),factualReview:{disposition:'CLAIMS_REVIEWED',reviewedThrough:'2026-09-10',nextTrigger:producer.factualReview.nextTrigger,correctionOwner:producer.factualReview.correctionOwner,sourceBindings,claimMap},newsEditorialReview:{policy:bind(p('operations/product-stewards/newsstand/weekly-news-editorial-policy.json')),analysis:analysisBinding},reportBinding:rawBinding,lineage:producer.lineage,ratchet:{repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0,reviewIssues:0,reviewCycles:1,priorComparable:{candidateId:'weekly-correction-20260906',reviewIssues:4,reviewCycles:3},onKnownDefect:'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW',evidencePacket:{rounds:2,gaps:2}},learningDisposition:{disposition:'NO_NEW_DEFECT',rationale:'Both the actual independent reader judgment and repaired factual reassessment passed with no current defect or evidence gap.'}};
const reviewBinding=write(path.join(outputDir,'independent-review.json'),receipt);
console.log(JSON.stringify({status:'INDEPENDENT_WEEKLY_REVIEW_ASSEMBLED',verdict:'PASS',review:reviewBinding,raw:rawBinding,claimMap:claimBinding,reviewedAt}));
