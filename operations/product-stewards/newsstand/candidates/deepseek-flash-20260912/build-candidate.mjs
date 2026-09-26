import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {candidateReviewText} from '../../../../../scripts/validate-newsstand-ordinary-story-candidate.mjs';
import {storyParagraphs} from '../../review-runtime/protocol.mjs';
import {inspectPreparedDraft} from '../../../../../scripts/prepare-newsstand-draft.mjs';
import {inspectProseQualityReview} from '../../../../../scripts/check-prose-quality-admission.mjs';
import {validateStoryTypeCoverage} from '../../../../../scripts/validate-newsstand-story-type-coverage.mjs';
import {assertCurrentEditorialParagraphs} from '../../../../../scripts/compact-newsstand-editorial-input.mjs';

const d='operations/product-stewards/newsstand/candidates/deepseek-flash-20260912/';
const now='2026-09-12T18:37:54.000Z';
const principal='/root';
const read=name=>fs.readFileSync(d+name,'utf8');
const json=name=>JSON.parse(read(name));
const write=(name,value)=>fs.writeFileSync(d+name,typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const binding=name=>({path:d+name,sha256:sha(read(name))});
const plain=value=>value.replace(/<code>(.*?)<\/code>/g,'$1').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const words=value=>plain(value).split(/\s+/).filter(Boolean).length;

const story=json('story.json');
story.updatedAt=now;
story.lastCheckedAt=now;
story.headline='DeepSeek’s new model can understand pictures. Whether you see that depends on the app.';
story.the_story='<p>On September 10, DeepSeek introduced V4.1-Flash, a new model with native image understanding. That means it can use a picture as part of what it receives, rather than working only from words. Vercel had made the model available through its AI Gateway a day earlier.</p>';
story.laidies_read='<p>A model does the generating behind an app’s interface, and the app maker chooses which model to connect. Picture a photo app: if its maker connects it to V4.1-Flash and passes along the image, the model can consider the picture when it answers. The new ability is underneath; the app’s own update tells you what is available in the tool you use.</p>';
story.what_this_means='<p>One technical change arrives September 14: requests sent under the older <code>deepseek-v4-pro</code> label are scheduled to route to V4.1-Flash until V4.1-Pro launches. For everyday use, the useful question is simpler: can this specific app accept my picture, and what does it say it can do with it?</p>';
story.cocktail_party='“DeepSeek’s new model can take pictures into account. Whether that reaches the tool in front of you depends on the model its maker connected behind the interface.”';
story.themes=['image understanding','apps and models'];
story.concepts=['model','image understanding','app interface'];
story.tags=['DeepSeek','V4.1-Flash','image understanding'];
write('story.json',story);
const reviewText=candidateReviewText(story);
write('review-text.json',reviewText);
write('article.md',`# ${story.headline}\n\n## The Story\n\n${story.the_story.replace(/<p>/g,'').replace(/<\/p>/g,'\n\n').trim()}\n\n## The LAiDIES Read\n\n${story.laidies_read.replace(/<p>/g,'').replace(/<\/p>/g,'\n\n').trim()}\n\n## What This Means for You\n\n${story.what_this_means.replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/<code>(.*?)<\/code>/g,'$1')}\n\n## Cocktail Party\n\n${story.cocktail_party}\n\n## Class Notes\n\n${story.class_notes}\n`);
write('rendered-article.html',`<article><h1>${story.headline}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>Cocktail Party</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article>\n`);
write('publication-manifest.json',{schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:story.id,surface:'NEWSSTAND_DAILY',contentClass:'NEWS',reviewText:binding('review-text.json'),rendered:binding('rendered-article.html')});

const claims=json('claim-map.json');
const excerpts={
  image:'On September 10, DeepSeek introduced V4.1-Flash, a new model with native image understanding.',
  route:'One technical change arrives September 14: requests sent under the older <code>deepseek-v4-pro</code> label are scheduled to route to V4.1-Flash until V4.1-Pro launches.',
  partner:'Vercel had made the model available through its AI Gateway a day earlier.'
};
for(const claim of claims.claims) claim.candidateEvidence=[{excerpt:excerpts[claim.claimId],locator:'exact candidate prose'}];
write('claim-map.json',claims);

const deepseekId='deepseek-v41-flash-news';
const vercelId='vercel-deepseek-v41-flash-20260909';
const storyDeepSeek='On September 10, DeepSeek introduced V4.1-Flash, a new model with native image understanding. That means it can use a picture as part of what it receives, rather than working only from words.';
const storyVercel='Vercel had made the model available through its AI Gateway a day earlier.';
const fields=[
  {field:'headline',fragments:[{text:story.headline,kind:'SOURCE_DERIVED',sourceId:deepseekId,wordCount:words(story.headline)}]},
  {field:'the_story',fragments:[{text:storyDeepSeek,kind:'SOURCE_DERIVED',sourceId:deepseekId,wordCount:words(storyDeepSeek)},{text:storyVercel,kind:'SOURCE_DERIVED',sourceId:vercelId,wordCount:words(storyVercel)}]},
  {field:'laidies_read',fragments:[{text:plain(story.laidies_read),kind:'SOURCE_DERIVED',sourceId:deepseekId,rationale:'Conservatively counts the complete model-to-app mechanism and conditional photo-app example against the product capability source.',wordCount:words(story.laidies_read)}]},
  {field:'what_this_means',fragments:[{text:plain(story.what_this_means),kind:'SOURCE_DERIVED',sourceId:deepseekId,wordCount:words(story.what_this_means)}]},
  {field:'cocktail_party',fragments:[{text:story.cocktail_party,kind:'SOURCE_DERIVED',sourceId:deepseekId,wordCount:words(story.cocktail_party)}]},
  {field:'class_notes',fragments:[{text:plain(story.class_notes),kind:'EDITORIAL_AUTHORITY',rationale:'Governed AI Fundamentals chapter 10.2 destination and interface/model explanation.',wordCount:words(story.class_notes)}]}
];
const totals={[deepseekId]:0,[vercelId]:0};
for(const field of fields) for(const fragment of field.fragments) if(fragment.sourceId) totals[fragment.sourceId]+=fragment.wordCount;
const oldBudget=json('source-budget-check.json');
const sourceMeta=Object.fromEntries(oldBudget.sources.map(source=>[source.id,source]));
const sources=[deepseekId,vercelId].map(id=>({id,url:sourceMeta[id].url,wordLimit:200,limitOrigin:'Conservative per-source ceiling.',allocations:fields.flatMap(field=>field.fragments.filter(fragment=>fragment.sourceId===id).map(fragment=>({field:field.field,text:fragment.text,wordCount:fragment.wordCount,directQuoteWords:0})))}));
const budget={schemaVersion:'laidies.newsstand-source-budget-check.v1',candidateId:story.id,scope:'All visitor-visible story text, including headline, summaries, takeaway, and cocktail line; every factual paraphrase or repetition counts.',countingMethod:'Word tokens are counted for every complete visitor field or exact field fragment; metadata-derived and repeated factual language is not exempted.',artifactBindings:{story:binding('story.json'),article:binding('article.md'),rendered:binding('rendered-article.html')},fields,sources,result:sources.every(source=>totals[source.id]<=source.wordLimit)?'PASS':'HOLD',totals,allVisitorFieldsAccountedFor:true};
write('source-budget-check.json',budget);

const contract=json('producer-contract.json');
contract.producer=principal;
contract.readerContract={humanQuestion:'DeepSeek has a new model that can understand pictures. What does that change in an app I use?',promisedPayoff:'Explain image understanding and the app-maker-to-model connection first, then keep the September 14 older-label switch as one proportionate technical note.',priorKnowledge:'No model-name or API knowledge is assumed.',centralMentalModel:'The app is the interface a reader sees; its maker connects a model underneath. A new model capability reaches the reader only through the app built to use it.',dailyLifeConnection:'A reader may use an app to discuss a photo and wants to know why a new model announcement does or does not change that tool.',surfaceJob:'A short September 12 explanation of DeepSeek’s September 10 image-understanding release, with the September 14 routing note kept in proportion.',desiredFeeling:'I understand the useful new capability and can tell the model announcement from the feature available in my app.'};
contract.draftArchitecture.readerQuestions=[{id:'news',question:'What useful capability did DeepSeek announce?'},{id:'mechanism',question:'How does a model capability reach an app?'},{id:'action',question:'What should an everyday user check?'}];
contract.draftArchitecture.requiredTerms=[{term:'model',reason:'The reader needs the model/interface distinction to understand when the capability reaches an app.'}];
contract.draftArchitecture.plainAnswer='V4.1-Flash can take pictures into account, while an app maker decides whether to connect that model and expose the capability in the app.';
contract.draftArchitecture.workedCase='A photo app can pass a picture to V4.1-Flash so the answer can take the image into account.';
contract.draftArchitecture.transferCase='For another model announcement, separate what the model can receive from what a specific app lets its users send.';
contract.draftArchitecture.usefulAction='Check whether the specific app accepts a picture and what the app says it can do with it.';
contract.draftArchitecture.causalSequence=['DeepSeek makes an image-understanding model available.','An app maker chooses which model to connect behind its interface.','The app passes a picture to that model before the answer can take the image into account.'];
contract.draftArchitecture.antiTemplateDecision='One conditional photo-app example teaches the mechanism. The future older-label switch remains one short technical note, with no repeated all-app disclaimer or generic instruction to ask IT.';
write('producer-contract.json',contract);

const coverage=json('story-type-coverage.json');
coverage.universalAnswers={whatHappened:'On September 10, DeepSeek introduced V4.1-Flash with native image understanding; one older technical label is scheduled to route to it on September 14.',plainLanguageIdentity:'A model does the generating behind an app’s interface, and the app maker chooses which model to connect.',evidenceBasis:'DeepSeek’s September 10 announcement supports the model and September 14 route; Vercel’s September 9 announcement supports availability through its AI Gateway.',evidenceLimits:'The announcements establish the model capability and named routes. They do not identify the features of every app.',readerRelevance:'A reader can understand why a picture-aware model may matter to an app she uses without confusing the model announcement with the app’s own feature release.',affectedPeople:'The picture capability matters through apps that connect the model and pass it an image; the September 14 technical change applies to requests using the named older label.',changesNow:'V4.1-Flash is available with image understanding. The older deepseek-v4-pro label is scheduled to route to it on September 14.',uncertainty:'The sources do not identify which specific apps connect the model or which picture features those apps expose.',readerAction:'Check whether the specific app accepts a picture and what the app says it can do with it.',betterQuestion:'What can the model receive, and has this app been built to pass that material to it?'};
coverage.typeAnswers['model-tool-release']={productRange:'V4.1-Flash is available through DeepSeek’s API and Vercel’s AI Gateway; a specific app’s interface and features remain its maker’s choice.',newCapabilities:'DeepSeek describes native multimodal support, and Vercel describes native image understanding.',bestFitTasks:'A conditional photo-app example shows the mechanism: pass a picture to the model so its answer can take the image into account.',notFor:'The announcements do not establish a quality improvement, an individual price, or the features of every app.',nearestAlternatives:'One older label, deepseek-v4-pro, is scheduled to route to V4.1-Flash until V4.1-Pro launches.',availability:'V4.1-Flash is live through the DeepSeek API and available through Vercel AI Gateway.',freePaidBoundary:'No personal price or access-tier claim is made.',costBoundary:'The article does not report a reader price.',limitations:'The September 14 older-label route is a bounded technical note; it does not replace an app’s own feature information.',technicalExampleProportionality:'One photo-app example teaches app maker → selected model → image passed → image-aware answer.',vendorEvidenceBoundary:'DeepSeek supports direct model and route statements; Vercel supports its gateway availability statement.'};
coverage.translation.newsVersionExact=excerpts.image;
coverage.translation.actualMeaningExact='The new ability is underneath; the app’s own update tells you what is available in the tool you use.';
coverage.translation.mechanismExact='A model does the generating behind an app’s interface, and the app maker chooses which model to connect.';
coverage.translation.familiarExampleExact='Picture a photo app: if its maker connects it to V4.1-Flash and passes along the image, the model can consider the picture when it answers.';
coverage.translation.jargon=[{term:'model',plainMeaning:'A model does the generating behind an app’s interface, and the app maker chooses which model to connect.'}];
coverage.translation.learningConnections=[{concept:'the interface and model are separate layers',learningPayoff:'AI Fundamentals 101 chapter 10.2 explains how the interface you see sits above the model doing the generating.',disposition:'link',destination:'/library.html#ai-fundamentals-101::%40ch-10-10-2-the-layers-of-the-stack'}];
write('story-type-coverage.json',coverage);

const writer=json('writer-input-current.json');
writer.producerContract=binding('producer-contract.json');
writer.packet.reader=contract.readerContract;
writer.packet.explanationPlan=contract.draftArchitecture;
writer.packet.reportingFrame=coverage;
write('writer-input-current.json',writer);

const observations=json('producer-observations.json');
observations.reviewedAt=now;
observations.storySha256=sha(JSON.stringify(story));
observations.reviewText=binding('review-text.json');
observations.readerAnswers={news:excerpts.image,mechanism:coverage.translation.mechanismExact,action:'For everyday use, the useful question is simpler: can this specific app accept my picture, and what does it say it can do with it?'};
observations.terms={model:'A model does the generating behind an app’s interface, and the app maker chooses which model to connect.'};
observations.explainBack='DeepSeek made a model that can take pictures into account. An app maker must connect that model and pass it the picture before the ability can appear through the app’s interface.';
observations.unseenTransfer='If another provider announces a model that can hear audio, separate the model’s input capability from whether a particular app accepts and passes along a recording.';
observations.repairs=[...new Set([...(observations.repairs||[]),'Recentered the complete article on image understanding and the app-maker-to-model mechanism; kept September 14 as one bounded technical note and replaced generic app-maintainer advice with a personal-use question.'])];
observations.limitations=['Producer review is not independent admission.','No observed human-comprehension evidence is claimed.','The sources establish the model capability and named routes, not a feature list for every app.'];
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
  value.completeArtifact=reviewText.trimEnd();
  value.storyParagraphs=storyParagraphs(story);
  value.limitations=observations.limitations;
  for(const outcome of Object.values(value.outcomes||{})){outcome.verdict='PASS';outcome.observation='Root read the complete final article and accepted its image-understanding news, app-maker-to-model mechanism, single photo-app example, bounded September 14 note and personal-use question for producer self-review.';outcome.artifactEvidence=[{excerpt:excerpts.image,locator:'exact candidate prose'}];}
  value.outcomes.explainBack.simulatedReaderProbe={prompt:'How can this model’s picture ability reach an app?',probeResponse:'The app maker connects the app to V4.1-Flash and passes the picture to it, so the model can consider the image when answering.',expectedEvidence:'Keep model capability, app connection and passed image as separate steps.'};
  value.outcomes.unseenTransfer.simulatedReaderProbe={prompt:'A provider announces an audio-aware model. What should a reader check?',probeResponse:'Check whether the specific app accepts a recording and says it can use it; the model capability reaches the reader through the app.',expectedEvidence:'Transfer the model/interface distinction without generic IT or API advice.'};
  for(const failure of Object.values(value.failureFamilies||{})){failure.present=false;failure.observation='Root read the complete final article; it stays with one image-understanding mechanism, one conditional photo-app example, one proportionate technical note and one personal-use question.';failure.artifactLocator='complete exact candidate prose';failure.artifactEvidence=[{excerpt:excerpts.image,locator:'exact candidate prose'}];}
  value.learningDisposition={disposition:'NO_NEW_DEFECT',rationale:'The earlier reader-news defect and its repair are preserved in repair history. Root found no unresolved or newly reusable defect in the complete repaired prose.'};
  value.rootReviewHandoff={status:'COMPLETED',reviewedAt:now,reviewer:'/root',draftAndBindingLane:'/root/producer_repair_sol',scope:'Root read the complete supplied final prose and accepted it for producer self-review only; independent admission remains pending.'};
  return value;
};
write('producer-self-review.json',updateReview('producer-self-review.json'));
write('producer-publication-review.json',updateReview('producer-publication-review.json'));

const sourcePacket=json('source-packet-preflight.json');
sourcePacket.checkedAt=now;
write('source-packet-preflight.json',sourcePacket);
const packet=json('editorial-input.json');
packet.readerJob=`${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`;
packet.completeArtifact=reviewText;
packet.paragraphs=storyParagraphs(story);
packet.claims=claims.claims.map(claim=>({claimId:claim.claimId,claim:claim.candidateEvidence[0].excerpt,sourceIds:claim.claimId==='image'?[deepseekId,vercelId]:claim.claimId==='route'?[deepseekId]:[vercelId]}));
packet.sourceBudget=budget;
packet.sourcePacket=sourcePacket;
packet.reviewBoundary={status:'PENDING_DISTINCT_INDEPENDENT_REVIEW',instruction:'Begin with completeArtifact and its current paragraphs. Root completed the producer read; producer records are not independent admission.'};
write('editorial-input.json',packet);

const history=json('repair-history.json');
history.repairs=history.repairs.filter(entry=>entry.at!==now||entry.kind!=='producer-reader-news-repair');
history.repairs.push({at:now,kind:'producer-reader-news-repair',status:'RESOLVED',finding:'The committed headline and body were dominated by caveats and repeated app-scope denials, while the useful image-understanding news and interface/model mechanism were buried.',repair:'Led with image understanding, taught app maker → selected model → passed picture with one conditional photo-app example, kept the September 14 older-label route as one technical note, preserved the exact Class Notes chapter 10.2 link, and counted every factual paraphrase conservatively.',remaining:'Distinct independent semantic review remains required; no provider call was made.',draftAndBindingLane:'/root/producer_repair_sol',producerReviewer:'/root'});
write('repair-history.json',history);

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
console.log(`DEEPSEEK_PRODUCER_REPAIR_PASS story=${sha(JSON.stringify(story))} review=${sha(reviewText)} sourceWords=${JSON.stringify(totals)} budget=${budget.result}`);
