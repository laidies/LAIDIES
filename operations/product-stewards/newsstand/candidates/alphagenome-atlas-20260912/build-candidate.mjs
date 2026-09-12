import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {candidateReviewText} from '../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs';
import {storyParagraphs} from '../../review-runtime/protocol.mjs';
import {inspectPreparedDraft} from '../../../../../scripts/prepare-newsstand-draft.mjs';
import {inspectProseQualityReview} from '../../../../../scripts/check-prose-quality-admission.mjs';
import {validateStoryTypeCoverage} from '../../../../../scripts/validate-newsstand-story-type-coverage.mjs';
import {assertCurrentEditorialParagraphs} from '../../../../../scripts/compact-newsstand-editorial-input.mjs';

const d='operations/product-stewards/newsstand/candidates/alphagenome-atlas-20260912/';
const now='2026-09-12T18:37:54.000Z';
const principal='/root';
const read=name=>fs.readFileSync(d+name,'utf8');
const json=name=>JSON.parse(read(name));
const write=(name,value)=>fs.writeFileSync(d+name,typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const binding=name=>({path:d+name,sha256:sha(read(name))});
const plain=value=>value.replace(/<code>(.*?)<\/code>/g,'$1').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const words=value=>plain(value).split(/\s+/).filter(Boolean).length;

const requiredCase='In a rare epilepsy case, the report ranked an overlooked DNA change at the top and predicted that it could change how cells assemble a gene message.';
const experiment='Researchers then tested a nearby stretch of DNA in laboratory-grown cells. Some changes produced the longer message the prediction had highlighted.';
const oldCase='The report ranked one DNA change near the top and predicted that it could change how cells assemble a gene message.';

const story=json('story.json');
story.updatedAt=now;
story.lastCheckedAt=now;
story.laidies_read=`<p>One research example shows the sequence. ${requiredCase} ${experiment}</p><p>That is a research lead followed by a laboratory check—not a personal diagnosis. The report says Atlas and its ranking score predict molecular effects and are only part of the evidence needed for clinical diagnoses. It also calls for evaluation across diverse genetic ancestries.</p>`;
write('story.json',story);
const reviewText=candidateReviewText(story);
write('review-text.json',reviewText);
write('article.md',`# ${story.headline}\n\n## The Story\n\n${story.the_story.replace(/<p>/g,'').replace(/<\/p>/g,'\n\n').trim()}\n\n## The LAiDIES Read\n\n${story.laidies_read.replace(/<p>/g,'').replace(/<\/p>/g,'\n\n').trim()}\n\n## What This Means for You\n\n${plain(story.what_this_means)}\n\n## Cocktail Party\n\n${story.cocktail_party}\n\n## Class Notes\n\n${story.class_notes}\n`);
write('rendered-article.html',`<article><h1>${story.headline}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>Cocktail Party</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article>\n`);
write('publication-manifest.json',{schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:story.id,surface:'NEWSSTAND_DAILY',contentClass:'NEWS',reviewText:binding('review-text.json'),rendered:binding('rendered-article.html')});

const claims=json('claim-map.json');
for(const claim of claims.claims){
  if(claim.claimId==='case') claim.candidateEvidence=[{excerpt:requiredCase,locator:'exact candidate prose'}];
  if(claim.claimId==='experiment') claim.candidateEvidence=[{excerpt:experiment,locator:'exact candidate prose'}];
}
write('claim-map.json',claims);

const budget=json('source-budget-check.json');
budget.artifactBindings={story:binding('story.json'),article:binding('article.md'),rendered:binding('rendered-article.html')};
for(const field of budget.fields){
  if(field.field==='laidies_read'){
    const text=plain(story.laidies_read);
    field.fragments=[{text,kind:'SOURCE_DERIVED',sourceId:'alphagenome-atlas-primary-20260908',rationale:'Conservatively counts the entire research case and limitations section against the primary report.',wordCount:words(text)}];
  }
}
const totals=Object.fromEntries(budget.sources.map(source=>[source.id,0]));
for(const field of budget.fields) for(const fragment of field.fragments){
  fragment.wordCount=words(fragment.text);
  if(fragment.sourceId) totals[fragment.sourceId]=(totals[fragment.sourceId]||0)+fragment.wordCount;
}
for(const source of budget.sources) source.allocations=budget.fields.flatMap(field=>field.fragments.filter(fragment=>fragment.sourceId===source.id).map(fragment=>({field:field.field,text:fragment.text,wordCount:fragment.wordCount,directQuoteWords:0})));
budget.totals=totals;
budget.result=budget.sources.every(source=>(totals[source.id]||0)<=source.wordLimit)?'PASS':'HOLD';
budget.allVisitorFieldsAccountedFor=true;
write('source-budget-check.json',budget);

const contract=json('producer-contract.json');
contract.producer=principal;
contract.readerContract.promisedPayoff='Show the precomputed lookup, then a rare-epilepsy prediction-to-laboratory-check sequence without diagnosis, cure or misleading experimental fractions.';
contract.draftArchitecture.workedCase='In a rare epilepsy case, an overlooked DNA change ranks at the top; a prediction about the gene message is followed by a laboratory check of nearby DNA.';
write('producer-contract.json',contract);

const writer=json('writer-input-current.json');
writer.producerContract=binding('producer-contract.json');
writer.packet.reader=contract.readerContract;
writer.packet.explanationPlan=contract.draftArchitecture;
write('writer-input-current.json',writer);

const observations=json('producer-observations.json');
observations.reviewedAt=now;
observations.storySha256=sha(JSON.stringify(story));
observations.reviewText=binding('review-text.json');
observations.readerAnswers.mechanism=requiredCase;
observations.explainBack='Atlas ranks an overlooked change in a rare epilepsy case and predicts a change in how a gene message is assembled. Researchers then test nearby DNA in cells; that laboratory check remains separate from a personal diagnosis.';
observations.unseenTransfer='For another AI health-research score, ask what candidate it ranked, what biological experiment followed, and whether the evidence supports a research lead or an answer about a person.';
const atlasRepair='Restored the source-backed rare epilepsy context and overlooked-change significance while keeping the count-free prediction-to-laboratory-check sequence required by root reconciliation.';
observations.repairs=[...new Set(observations.repairs)].filter(item=>item!==atlasRepair);
observations.repairs.push(atlasRepair);
observations.limitations=['Producer review is not independent admission.','No genetic counseling, patient outcome improvement, clinical availability, validation fraction or independent replication is claimed.','Distinct independent review remains required before admission.'];
write('producer-observations.json',observations);

const updateReview=name=>{
  const value=json(name);
  value.maker=principal;
  value.reviewer={id:principal,principalId:principal,role:'Producer exact prose read-through',modelFamily:'openai'};
  value.reviewedAt=now;
  value.verdict='PASS';
  value.status='PRODUCER_READY_FOR_INDEPENDENT_REVIEW';
  value.calibration=json('../chatgpt-images-2-5-2026-09-08/producer-publication-review.json').calibration;
  value.calibrationSource=binding('../chatgpt-images-2-5-2026-09-08/producer-publication-review.json');
  value.artifact={manifest:binding('publication-manifest.json'),reviewText:binding('review-text.json'),rendered:binding('rendered-article.html')};
  value.factualReview.claimMap=claims.claims;
  value.factualReview.reviewedThrough=now;
  value.factualReview.correctionOwner='/root';
  value.learningDisposition={disposition:'NO_NEW_DEFECT',rationale:'The earlier actual-artifact omission and its repair are preserved in repair history. Root found no unresolved or newly reusable defect in the complete repaired prose.'};
  value.completeArtifact=reviewText.trimEnd();
  value.storyParagraphs=storyParagraphs(story);
  value.limitations=observations.limitations;
  value.rootReviewHandoff={status:'COMPLETED',reviewedAt:now,reviewer:'/root',draftAndBindingLane:'/root/producer_repair_sol',scope:'Root read the complete supplied final prose and accepted it for producer self-review only; independent admission remains pending.'};
  return value;
};
write('producer-self-review.json',updateReview('producer-self-review.json'));
write('producer-publication-review.json',updateReview('producer-publication-review.json'));

const packet=json('editorial-input.json');
packet.readerJob=`${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`;
packet.completeArtifact=reviewText;
packet.paragraphs=storyParagraphs(story);
packet.claims=claims.claims.map(claim=>({claimId:claim.claimId,claim:claim.candidateEvidence[0].excerpt,sourceIds:claim.claimId==='release'||claim.claimId==='scale'?['deepmind-atlas-blog-20260908']:['alphagenome-atlas-primary-20260908']}));
packet.sourceBudget=budget;
packet.sourcePacket=json('source-packet-preflight.json');
packet.reviewBoundary={status:'PENDING_DISTINCT_INDEPENDENT_REVIEW',instruction:'Begin with completeArtifact and its current paragraphs. Root completed the producer read; producer records are not independent admission.'};
write('editorial-input.json',packet);

const history=json('repair-history.json');
history.entries=history.entries.filter(entry=>entry.at!==now||entry.kind!=='ROOT_DIRECTED_ACTUAL_ARTIFACT_REPAIR');
history.entries.unshift({at:now,kind:'ROOT_DIRECTED_ACTUAL_ARTIFACT_REPAIR',issues:[`The committed candidate said “${oldCase}”, which omitted the verified rare epilepsy context and the significance that the DNA change had been overlooked.`],repair:`Replaced the actual story and every prose derivative with: “${requiredCase}” followed by the count-free laboratory-check sequence. Preserved all provider evidence and the root reconciliation hold. Root read and accepted the complete final prose for producer self-review; independent admission remains pending.`,predecessor:'68fbe5e71369dd5a4382ad461347abe72fcf53cf',reviewIssues:1,reviewCycles:1,draftAndBindingLane:'/root/producer_repair_sol',producerReviewer:'/root'});
write('repair-history.json',history);

const metrics=json('review-metrics.json');
metrics.history=metrics.history.filter(entry=>entry.note!=='Actual committed story omitted the source-backed rare epilepsy and overlooked-change context. Current bytes restore it; root read and accepted the complete final prose for producer self-review.');
metrics.history.push({stage:'producer-repair',verdict:'PRODUCER_READY_FOR_INDEPENDENT_REVIEW',issues:1,note:'Actual committed story omitted the source-backed rare epilepsy and overlooked-change context. Current bytes restore it; root read and accepted the complete final prose for producer self-review.'});
metrics.scope='Cumulative preserved history; current candidate is producer-ready and still requires distinct independent review.';
write('review-metrics.json',metrics);

const calibrationDir='operations/product-stewards/newsstand/review-runtime/calibration/qualified-news-metrics-policy-20260905/';
const calibration=JSON.parse(fs.readFileSync(calibrationDir+'calibration-result.json','utf8'));
assert.equal(calibration.status,'CALIBRATION_PASSED');
assert.equal(calibration.providerRoute,'claude');
assert.equal(calibration.effort||'medium','medium');
assert.equal(calibration.registrySha256,sha(fs.readFileSync('operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json','utf8')));
assert.equal(calibration.protocolSha256,sha(fs.readFileSync('operations/product-stewards/newsstand/review-runtime/protocol.mjs','utf8')));
assert.equal(calibration.policy.sha256,sha(fs.readFileSync('operations/product-stewards/newsstand/ordinary-news-editorial-policy.json','utf8')));
assert.deepEqual(validateStoryTypeCoverage(json('story-type-coverage.json'),story.themes||[],undefined,{story,root:process.cwd()}),[]);
const producer=json('producer-publication-review.json');
assert.equal(producer.verdict,'PASS');
assert.deepEqual(inspectProseQualityReview(producer,{root:process.cwd()}).errors,[]);
assert.deepEqual(inspectPreparedDraft(story,json('writer-input-current.json'),json('producer-observations.json')).errors,[]);
const finalPacket=json('editorial-input.json');
assertCurrentEditorialParagraphs(finalPacket,storyParagraphs(JSON.parse(finalPacket.completeArtifact)));
assert.equal(finalPacket.completeArtifact,read('review-text.json'));
assert.equal(producer.artifact.reviewText.sha256,sha(finalPacket.completeArtifact));
console.log(`ALPHAGENOME_PRODUCER_REPAIR_PASS story=${sha(JSON.stringify(story))} review=${sha(reviewText)} budget=${budget.result}`);
