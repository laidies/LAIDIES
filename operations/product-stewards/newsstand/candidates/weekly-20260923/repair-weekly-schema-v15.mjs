import fs from 'node:fs';
import crypto from 'node:crypto';
import vm from 'node:vm';
import {candidateReviewText, stable} from '../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs';
import {storyParagraphs} from '../../../../../operations/product-stewards/newsstand/review-runtime/protocol.mjs';
import {prepareDraft, inspectPreparedDraft} from '../../../../../scripts/prepare-newsstand-draft.mjs';
import {inspectContentProducerContract} from '../../../../../scripts/check-content-producer-contract.mjs';
import {inspectProseQualityReview} from '../../../../../scripts/check-prose-quality-admission.mjs';
const root=process.cwd(), d='operations/product-stewards/newsstand/candidates/weekly-20260923/';
const read=p=>fs.readFileSync(p,'utf8'), json=p=>JSON.parse(read(p)), sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const write=(p,x)=>fs.writeFileSync(p,typeof x==='string'?x:JSON.stringify(x,null,2)+'\n');
const bind=p=>({path:p,sha256:sha(read(p))});
const now='2026-09-26T15:00:00.000Z', date='2026-09-26';
let story=json(d+'story.json');
story.lastCheckedAt=now; story.updatedAt=now; story.editionDate='2026-09-23'; story.predecessorStoryIds=[];story.successorStoryIds=[];story.relationshipType=null;story.bigPicture=null;
story.sources=story.sources.map(s=>({...s,accessedAt:date}));
write(d+'story.json',story); write(d+'review-text.json',candidateReviewText(story));
const assessment=json(d+'dated-desk-assessment-20260926.json');
const groups=[
 ['california-ai-oversight-order',['california-ai-oversight-order-1','california-ai-oversight-order-2'],'2026-09-18','The signed executive order is dated September 18; EFF responds to that order.'],
 ['california-data-centre-laws',['california-data-centre-laws-1','california-data-centre-laws-2','california-data-centre-laws-3'],'2026-09-21','The Governor announcement and cited enacted bills are dated September 21.'],
 ['house-ratepayer-protection',['house-ratepayer-protection-1','house-ratepayer-protection-2','house-ratepayer-protection-3'],'2026-09-16','The House bill text and vote record establish the September 16 House action; the Senate source supplies its later-status limit.'],
 ['card-skimmer-investigation',['card-skimmer-investigation-1','card-skimmer-investigation-2'],'2026-09-23','BleepingComputer published the attributed report on September 23; Gambit describes its underlying work as an interim report.'],
 ['claude-cowork-merge',['claude-cowork-merge-1'],'2026-09-16','Anthropic dated the Cowork merge announcement September 16.'],
 ['gpt6-sol-luna',['gpt6-sol-luna-1'],'2026-09-22','OpenAI dated the Sol and Luna announcement September 22.']
];
assessment.selections=groups.map(([id,sourceIds])=>({id,decision:'SELECT',sourceIds,reason:'Selected development is represented in the exact reviewed Weekly with its source limit retained.'}));
assessment.desks=[
 {id:'accountability',disposition:'SELECTED',sourceIds:groups[0][1],reason:'Executive-order scope and the EFF response are selected to distinguish a study from an installed safeguard.'},
 {id:'medical_science',disposition:'SELECTED',sourceIds:[groups[1][1][0]],reason:'Official California release is selected for enacted data-centre law context.'},
 {id:'product_releases',disposition:'SELECTED',sourceIds:[...groups[4][1],...groups[5][1]],reason:'Two bounded product-access changes are selected with plan and surface limits.'},
 {id:'work_economy',disposition:'SELECTED',sourceIds:groups[1][1].slice(1),reason:'The statutes support the rate-assessment and reporting-duty explanation.'},
 {id:'security',disposition:'SELECTED',sourceIds:groups[3][1],reason:'The attributed investigation is selected with its interim-status and no-personal-exposure limit.'},
 {id:'contrary_evidence',disposition:'SELECTED',sourceIds:groups[2][1],reason:'House passage and the Senate-status limit are selected to prevent an enactment claim.'}
];
write(d+'dated-desk-assessment-20260926.json',assessment);
const reuse={schemaVersion:'newsstand-weekly-research-reuse.v1',candidateId:story.id,developments:groups.map(([id])=>({id,disposition:'update',owner:'NewsStand editor',trigger:'Recheck the bound primary source when its legal, investigation, rollout, or implementation status changes.'}))};write(d+'research-reuse-20260926.json',reuse);
const basePath=d+'publication-base-20260926.js', baseRaw=read('content/newsstand-stories.js');write(basePath,baseRaw);
const c={window:{}};vm.runInNewContext(baseRaw,c,{timeout:1000}); const data=JSON.parse(JSON.stringify(c.window.NEWSSTAND_DATA));const prior=data.stories.find(x=>x.id===data.publications.weekly.storyId); if(!prior)throw Error('current Weekly predecessor unavailable');
let contract=json(d+'producer-contract.json');
contract.canonicalTruth[0].source=bind(d+'dated-desk-assessment-20260926.json'); contract.canonicalTruth[0].freshnessTrigger='Recheck each bound primary source before publication if its legal, investigation, or product status changes.';
contract.canonicalTruth[1].source={path:'content/newsstand-stories.js',sha256:sha(baseRaw)}; contract.createdAt=now;
write(d+'producer-contract.json',contract);
const contractCheck=inspectContentProducerContract(contract,{root});if(contractCheck.errors.length)throw Error('contract '+contractCheck.errors.join(' | '));
const coverage=json(d+'story-type-coverage.json');
const writer=prepareDraft(contract,{root,reportingFrame:coverage,sourcePacket:{path:d+'dated-desk-assessment-20260926.json',sha256:sha(read(d+'dated-desk-assessment-20260926.json'))}});writer.producerContract=bind(d+'producer-contract.json');write(d+'writer-input-current.json',writer);
let obs=json(d+'producer-observations.json');obs.storySha256=sha(JSON.stringify(story));obs.checkedAt=now;write(d+'producer-observations.json',obs);
let editorial=json(d+'editorial-input.json');editorial.completeArtifact=read(d+'review-text.json');editorial.paragraphs=storyParagraphs(JSON.parse(editorial.completeArtifact));
// Preserve validated claim/source packet while exact artifact is refreshed.
write(d+'editorial-input.json',editorial);
let manifest=json(d+'publication-manifest.json');manifest.reviewText=bind(d+'review-text.json');manifest.story=bind(d+'story.json');manifest.reviewedContentSha256=sha(read(d+'review-text.json').trimEnd());write(d+'publication-manifest.json',manifest);
let producer=json(d+'producer-publication-review.json');const editorialBinding=bind(d+'editorial-input.json'); producer.factualReview.sourceBindings=producer.factualReview.sourceBindings.map(x=>x.path===d+'editorial-input.json'?editorialBinding:x); producer.factualReview.claimMap=producer.factualReview.claimMap.map(x=>({...x,sourceBinding:x.sourceBinding?.path===d+'editorial-input.json'?editorialBinding:x.sourceBinding}));producer.reviewedAt=now;producer.artifact={manifest:bind(d+'publication-manifest.json'),reviewText:bind(d+'review-text.json'),rendered:bind(d+'rendered-article.html')};producer.completeArtifact=read(d+'review-text.json').trimEnd();producer.storyParagraphs=storyParagraphs(story);producer.rootReviewHandoff={status:'SCHEMA_REPAIR_COMPLETE',reviewedAt:now,reviewer:'/root/california_order_producer',scope:'Maker reread the unchanged public prose and repaired only Weekly held-record metadata, source access dates, source bindings, and exact artifact derivations before a new independent review.'};producer.ratchet={...(producer.ratchet||{}),repeatedKnownDefects:1,objectiveDefectsFirstFoundAtReview:1,reviewIssues:1,reviewCycles:5,onKnownDefect:'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW'};producer.learningDisposition={disposition:'NO_NEW_DEFECT',rationale:'The v14 prose judgment is preserved but superseded by a schema and source-freshness repair; a distinct full independent review is required before any admission.'};write(d+'producer-publication-review.json',producer);
const draft=inspectPreparedDraft(story,writer,obs,{root}); const prose=inspectProseQualityReview(producer,{root});
const preflight={schemaVersion:'newsstand-weekly-schema-preflight.v1',checkedAt:now,candidateId:story.id,storyHeldRecord:{edition:story.edition,status:story.status,publishedAt:story.publishedAt,sourceApproval:story.sourceApproval?.status,bigPicture:story.bigPicture,predecessorCount:story.predecessorStoryIds.length,successorCount:story.successorStoryIds.length,weeklyFields:['weeklyHighlights','front_read','the_story','laidies_read','what_this_means'].every(k=>story[k])},contract:{errors:contractCheck.errors},preparedDraft:{errors:draft.errors},producerReview:{errors:prose.errors},status:contractCheck.errors.length||draft.errors.length||prose.errors.length?'REPAIR_REQUIRED':'PRE_REVIEW_SCHEMA_PASS',limitations:['This validates the private held Weekly package before any provider request. It is not an independent editorial judgment, admission, publication, or canonical write.']};write(d+'weekly-schema-preflight-20260926.json',preflight);console.log(JSON.stringify(preflight,null,2)); if(preflight.status!=='PRE_REVIEW_SCHEMA_PASS')process.exitCode=1;
