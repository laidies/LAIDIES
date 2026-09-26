import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const d='operations/product-stewards/newsstand/candidates/weekly-20260923/';
const out=d+'assembled-v17-r4-20260926/';
const review=d+'editorial-review-v17-r2-20260926/';
const read=p=>fs.readFileSync(p,'utf8');
const json=p=>JSON.parse(read(p));
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const stable=value=>value===null||typeof value!=='object'?JSON.stringify(value):Array.isArray(value)?`[${value.map(stable).join(',')}]`:`{${Object.keys(value).sort().map(key=>`${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const bind=p=>({path:p,sha256:sha(read(p))});
const write=(name,value)=>{fs.mkdirSync(out,{recursive:true});const p=out+name;const bytes=JSON.stringify(value,null,2)+'\n';if(fs.existsSync(p))assert.equal(read(p),bytes,`Preserve differing assembly output: ${p}`);else fs.writeFileSync(p,bytes);return bind(p)};
const state=value=>value==='pass'?'PASS':value==='hold'?'HOLD':'FAIL';

const story=json(d+'story.json');
const manifest=json(d+'publication-manifest.json');
const producer=json(d+'producer-publication-review.json');
const checked=json(review+'article-editorial-checked.json');
const judgment=json(review+'article-editorial-judgment.json');
const provider=json(review+'article-editorial-provider.raw.json');
const editorial=json(d+'editorial-input.json');
const baseCandidate=json(d+'weekly-candidate-20260926-recovery.json');
assert.equal(checked.verdict,'PASS');
assert.equal(checked.reader.verdict,'PASS');
assert.equal(checked.facts.verdict,'PASS');
assert.equal(provider.is_error,false);
assert.equal(provider.subtype,'success');
assert.ok(Object.keys(provider.modelUsage||{}).includes('claude-fable-5'));
assert.deepEqual(provider.structured_output||JSON.parse(provider.result),judgment);
assert.equal(checked.rawSha256,bind(review+'article-editorial-provider.raw.json').sha256);
assert.ok(Date.parse(checked.completedAt)>Date.parse(producer.reviewedAt));
assert.equal(manifest.reviewedContentSha256,sha(stable(story)));
assert.equal(read(d+'review-text.json'),stable(story)+'\n');

const publicSourceIds={
  'california-ai-oversight-order':['california-ai-oversight-order-1','california-ai-oversight-order-2'],
  'california-data-centre-laws':['california-data-centre-laws-1','california-data-centre-laws-2','california-data-centre-laws-3'],
  'house-ratepayer-protection':['house-ratepayer-protection-1','house-ratepayer-protection-2','house-ratepayer-protection-3'],
  'card-skimmer-investigation':['card-skimmer-investigation-1','card-skimmer-investigation-2'],
  'claude-cowork-merge':['claude-cowork-merge-1'],
  'gpt6-sol-luna':['gpt6-sol-luna-1']
};
const claims=producer.factualReview.claimMap.map(item=>({...item,sourceIds:publicSourceIds[item.claimId]}));
assert.ok(claims.every(item=>Array.isArray(item.sourceIds)&&item.sourceIds.length));
assert.deepEqual(Object.keys(checked.facts.claims).sort(),claims.map(item=>item.claimId).sort());
for(const item of Object.values(checked.facts.claims)) assert.ok(['supported','qualified'].includes(item.state));
const claimBinding=write('publication-claim-map.json',claims);

const principal='anthropic:claude-fable-5:newsstand-weekly:medium';
const calibrationPath='operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/calibration-result.json';
const calibrationResult=json(calibrationPath);
assert.equal(calibrationResult.status,'CALIBRATION_PASSED');
assert.equal(calibrationResult.mode,'ORDINARY_NEWS_BLIND_REJECTION_V1');
const negatives=[];let positive=null,max=0;
for(const item of calibrationResult.evaluations){
  const calibrationChecked=json(item.checkedBinding.path);max=Math.max(max,Date.parse(calibrationChecked.completedAt));
  if(item.actual==='REJECT'){
    const present=Object.entries(calibrationChecked.families).filter(([,value])=>value.state==='present');
    negatives.push({exemplarId:item.exemplarId,verdict:'REJECT',identifiedFailureFamilies:present.map(([name])=>name),familyAssessments:Object.fromEntries(Object.entries(calibrationChecked.families).map(([name,value])=>[name,{state:value.state,observation:value.reason,artifactLocator:value.artifactLocator}])),evidence:present.flatMap(([,value])=>value.artifactEvidence||[])});
  }else if(item.actual==='PASS') positive={exemplarId:item.exemplarId,verdict:'PASS',strengthsRetained:calibrationChecked.strengths,evidence:Object.values(calibrationChecked.families).flatMap(value=>value.artifactEvidence||[]).slice(0,2)};
}
assert.ok(positive?.evidence?.length);
const calibration={mode:calibrationResult.mode,registrySha256:calibrationResult.registrySha256,reviewerPrincipalId:principal,reviewedAt:new Date(max).toISOString(),negatives,positive};
const ai=value=>({evidenceType:'AI_EDITORIAL_ANALYSIS',prompt:value.question,response:value.answer,expectedEvidence:value.expectedEvidence,assessment:value.assessment});
const outcomes={};
for(const [name,value] of Object.entries({...checked.reader.outcomes,...checked.facts.outcomes})) outcomes[name]={verdict:state(value.state),observation:value.reason,artifactEvidence:value.artifactEvidence||[],...(name==='explainBack'?{aiEditorialAnalysis:ai(checked.reader.explainBack)}:{}),...(name==='unseenTransfer'?{aiEditorialAnalysis:ai(checked.reader.unseenTransfer)}:{})};
assert.ok(Object.values(outcomes).every(item=>item.verdict==='PASS'));
const analysis={evidenceType:'AI_EDITORIAL_ANALYSIS',candidateId:story.id,reviewerPrincipalId:principal,reviewTextSha256:manifest.reviewText.sha256,outcomes:{explainBack:ai(checked.reader.explainBack),unseenTransfer:ai(checked.reader.unseenTransfer)},checks:Object.fromEntries(Object.entries(checked.reader.newsChecks).map(([name,value])=>[name,{verdict:state(value.state),observation:value.reason,artifactEvidence:value.artifactEvidence||[]}]))};
const analysisBinding=write('news-editorial-analysis.json',analysis);
const raw={schemaVersion:'laidies-newsstand-combined-editorial-raw.v1',candidateId:story.id,storySha256:sha(stable(story)),reviewerPrincipalId:principal,verdict:'PASS',findings:{reader:checked.reader.summary,facts:checked.facts.summary},readerProviderRaw:bind(review+'article-editorial-provider.raw.json'),factualProviderRaw:bind(review+'article-editorial-provider.raw.json'),factualJudgment:bind(review+'article-editorial-judgment.json'),preservedPriorAttempt:{status:'SUPERSEDED_EVIDENCE_INCOMPLETE',raw:bind(d+'editorial-review-v16-20260926/article-editorial-provider.raw.json'),failure:bind(d+'editorial-review-v16-20260926/article-editorial-failure.json')},calibration:bind(calibrationPath)};
const rawBinding=write('independent-raw-report.json',raw);
const publicSources=story.sources.map(source=>({id:source.id,url:source.url,evidence:bind(d+'sources-actual-20260926/'+source.id+'.json')}));
const sourceBindings=[...producer.factualReview.sourceBindings,...publicSources.map(source=>source.evidence)].filter((item,index,all)=>all.findIndex(other=>other.path===item.path&&other.sha256===item.sha256)===index);
const receipt={schemaVersion:'laidies-prose-quality-review.v1',candidateId:story.id,surface:'NEWSSTAND_WEEKLY',contentClass:'NEWS',stage:'INDEPENDENT_SEMANTIC_ADMISSION',maker:producer.maker,reviewer:{id:'claude-fable-newsstand-weekly',principalId:principal,role:'independent Weekly editorial and factual reviewer',modelFamily:'anthropic',modelEffort:'medium',independentFromMaker:true,artifactFirst:true},reviewMode:'EXACT_PROSE_IN_FULL',reviewedAt:checked.completedAt,verdict:'PASS',limitations:['AI editorial assessment only; no observed human-comprehension evidence is claimed.','The v16 provider attempt is preserved but superseded because its evidence packet omitted the EFF passage. This receipt binds the distinct v17 full review of the corrected evidence packet and unchanged public prose.'],artifact:{manifest:bind(d+'publication-manifest.json'),reviewText:bind(d+'review-text.json'),rendered:bind(d+'rendered-article.html')},calibration,reverseBrief:checked.reader.reverseBrief,outcomes,failureFamilies:Object.fromEntries(Object.entries(checked.reader.families).map(([name,value])=>[name,{present:value.state==='present',observation:value.reason,artifactLocator:value.artifactLocator}])),factualReview:{disposition:'CLAIMS_REVIEWED',reviewedThrough:'2026-09-26',nextTrigger:producer.factualReview.nextTrigger,correctionOwner:producer.factualReview.correctionOwner,sourceBindings,claimMap:claims},newsEditorialReview:{policy:bind('operations/product-stewards/newsstand/weekly-news-editorial-policy.json'),analysis:analysisBinding},reportBinding:rawBinding,lineage:producer.lineage,ratchet:{...producer.ratchet,evidencePacket:{rounds:2,gaps:1}},learningDisposition:checked.reader.learningDisposition};
const reviewBinding=write('independent-review.json',receipt);
const candidate={...baseCandidate,preparation:{...baseCandidate.preparation,sourceAssessment:bind(d+'dated-desk-assessment-v2-20260926.json')},claimMap:claimBinding,producerContract:bind(d+'producer-contract.json'),producerReview:bind(d+'producer-publication-review.json'),independentReview:reviewBinding,independentRawReport:rawBinding,story,storySha256:sha(stable(story)),sources:publicSources};
const candidateBinding=write('weekly-candidate.json',candidate);
console.log(JSON.stringify({status:'WEEKLY_V17_ASSEMBLED',verdict:'PASS',candidate:candidateBinding,review:reviewBinding,raw:rawBinding,claimMap:claimBinding,reviewedAt:checked.completedAt},null,2));
