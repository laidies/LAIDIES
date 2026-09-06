#!/usr/bin/env node
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {enforcedFailureFamilies} from './check-prose-quality-admission.mjs';
import {candidateReviewText,stable} from './validate-newsstand-ordinary-story-candidate.mjs';
import {publishNewsstandWeekly,validateWeeklySelection} from './publish-newsstand-weekly.mjs';

const REPO=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const PUBLISHER=path.join(REPO,'scripts/publish-newsstand-weekly.mjs');
const DATE='2026-09-09';
const STAMP='2026-09-09T17:00:00Z';
const roots=[];
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const parse=raw=>{const context={window:{}};vm.runInNewContext(raw,context,{timeout:1000});return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA))};
const render=data=>`window.NEWSSTAND_DATA = ${JSON.stringify(data,null,2)};\n\n/* Compatibility for old private inspection scripts only. Public code uses NEWSSTAND_DATA. */\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`;

function makeFixture(){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'laidies-weekly-publication-'));roots.push(root);
  const write=(relative,value)=>{const target=path.join(root,relative);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,value);return relative};
  const bind=relative=>({path:relative,sha256:sha(fs.readFileSync(path.join(root,relative)))});
  const writeJson=(relative,value)=>write(relative,`${JSON.stringify(value,null,2)}\n`);
  const sourceData=parse(fs.readFileSync(path.join(REPO,'content/newsstand-stories.js'),'utf8'));
  const prior=sourceData.stories.find(item=>item.id===sourceData.publications.weekly.storyId);
  assert.ok(prior,'canonical fixture source needs a current Weekly story');
  const data=structuredClone(sourceData);
  const basePath='content/newsstand-stories.js';
  write(basePath,render(data));

  const badPath='evidence/known-bad.txt',goodPath='evidence/known-good.txt';
  write(badPath,'A glossary repeats labels without a connected mechanism or useful reader decision.\n');
  write(goodPath,'Start with the reader question, connect the evidence, and end with a useful next question.\n');
  const registryPath='operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
  const registry={schemaVersion:'laidies-content-quality-exemplars.v1',negativeExemplars:[{id:'WEEKLY-BAD',path:badPath,sha256:bind(badPath).sha256,incidentId:'synthetic-weekly-fixture',appliesTo:['NEWS'],failureFamilies:['glossaryAccumulation']}],positiveExemplars:[{id:'WEEKLY-GOOD',path:goodPath,sha256:bind(goodPath).sha256,useFor:['NEWS']}]};
  writeJson(registryPath,registry);
  const benchmarkPath='operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md';
  write(benchmarkPath,'# Synthetic communication benchmark\nUse a human question, connected evidence, limits, and a better next question. Never imitate a person.\n');
  const sourcePath='evidence/source.txt';
  write(sourcePath,'The synthetic source says the weekly pattern is supported and should be checked on 2026-09-09.\n');
  const observationPath='evidence/synthetic-reader-observation.txt';
  write(observationPath,'SYNTHETIC TEST FIXTURE ONLY — no real human participated. The fixture response connects the source, weekly pattern, and next check.\n');

  const story={...structuredClone(prior),id:'weekly-synthetic-2026-09-09',slug:'weekly-synthetic-2026-09-09',status:'hold',publishedAt:null,updatedAt:STAMP,lastCheckedAt:STAMP,sourceApproval:{status:'independent-review-required'},headline:'A synthetic Weekly integration fixture.',front_read:'The synthetic source supports one weekly pattern and a clear next check.',weeklyHighlights:['One synthetic supported development tests the complete Weekly path.'],the_story:'The source supports the pattern; the review checks the exact complete story before publication.',laidies_read:'A reader can distinguish the source evidence from the publisher transaction.',what_this_means:'Check the source and the exact review bindings before carrying the pattern forward.',cocktail_party:'“This is a synthetic integration fixture, not a production report.”',watch_fors:['Whether a changed source invalidates the exact evidence binding.'],closing_note:'The fixture tests the gate without claiming real editorial approval.',class_notes:'Synthetic plumbing only.',sources:[{id:'weekly-source',label:'Synthetic source evidence',url:'https://example.com/weekly-source',publisherType:'primary-document',accessedAt:DATE,approvalStatus:'reviewed'}],themes:['weekly synthesis'],concepts:['source binding'],tags:['Weekly'],correction:null,correctionHistory:[],retraction:null,predecessorStoryIds:[],successorStoryIds:[],relationshipType:null,bigPicture:null};
  const reviewPath='candidate/review.txt';write(reviewPath,candidateReviewText(story));
  const manifestPath='candidate/manifest.json';
  const reviewBinding=bind(reviewPath);
  const storySha=sha(stable(story));
  writeJson(manifestPath,{schemaVersion:'laidies-content-artifact-manifest.v1',candidateId:story.id,surface:'NEWSSTAND_WEEKLY',contentClass:'NEWS',reviewText:reviewBinding,reviewedContentSha256:storySha});
  const manifestBinding=bind(manifestPath),sourceBinding=bind(sourcePath);
  const claimMap=[{claimId:'weekly-pattern',status:'VERIFIED',sourceIds:['weekly-source'],candidateEvidence:[{excerpt:'synthetic source supports one weekly pattern',locator:'story.front_read'}],sourceBinding,sourceEvidence:[{excerpt:'synthetic source says the weekly pattern is supported',locator:'source.txt:1'}],scopeAndFreshness:'Synthetic fixture current through 2026-09-09.'}];
  const claimMapPath='candidate/claim-map.json';writeJson(claimMapPath,claimMap);
  const negativeFamilies=enforcedFailureFamilies(registry);
  const outcomeNames=['plainClarity','readerValue','laidiesVoice','engagingEnjoyable','factualIntegrity','freshnessReviewability','surfaceFit','datedChange','consequenceAndUncertainty','dailyLifeConnection','communicationBenchmark','explainBack','unseenTransfer','usefulAction','analogyIntegrity'];
  const excerpt='The synthetic source supports one weekly pattern';
  const observation={evidenceType:'OBSERVED_HUMAN',administratorPrincipalId:'synthetic-fixture-administrator',participants:[{participantId:'synthetic-reader-1',prompt:'Explain the evidence distinction and transfer it to another weekly claim.',verbatimResponse:'Synthetic fixture response: the source supports the claim and a changed source requires a new check.',expectedEvidence:'Source, claim, and new-check trigger.',observedAt:'2026-09-09T09:45:00-07:00',observationBinding:bind(observationPath)}]};
  const outcomes=Object.fromEntries(outcomeNames.map(name=>[name,{verdict:'PASS',observation:`${name} passes in this explicitly synthetic integration fixture.`,artifactEvidence:[{excerpt,locator:'story.front_read'}],...(['explainBack','unseenTransfer'].includes(name)?{observedReaderEvidence:observation}:{})}]));
  const calibration=principal=>({registrySha256:bind(registryPath).sha256,reviewerPrincipalId:principal,reviewedAt:'2026-09-09T09:00:00-07:00',negatives:[{exemplarId:'WEEKLY-BAD',verdict:'REJECT',identifiedFailureFamilies:['glossaryAccumulation'],evidence:[{excerpt:'A glossary repeats labels',locator:'known-bad.txt:1'}]}],positive:{exemplarId:'WEEKLY-GOOD',verdict:'PASS',strengthsRetained:['reader question','connected evidence'],evidence:[{excerpt:'Start with the reader question',locator:'known-good.txt:1'}]}});
  const baseReceipt={schemaVersion:'laidies-prose-quality-review.v1',candidateId:story.id,contentClass:'NEWS',surface:'NEWSSTAND_WEEKLY',maker:'weekly-fixture-maker',reviewMode:'EXACT_PROSE_IN_FULL',artifact:{reviewText:reviewBinding,manifest:manifestBinding},reverseBrief:{humanQuestion:'What pattern matters this week?',promisedPayoff:'A sourced weekly pattern and next check.',centralMentalModel:'Evidence supports the synthesis; the transaction cannot create evidence.',dailyLifeConnection:'A weekly work briefing.',surfaceJob:'Weekly synthesis.',desiredReaderFeeling:'I can see what connects and what to check.'},outcomes,failureFamilies:Object.fromEntries(negativeFamilies.map(name=>[name,{present:false,observation:`${name} is absent in the exact synthetic story.`,artifactLocator:'story'}])),factualReview:{disposition:'CLAIMS_REVIEWED',sourceBindings:[sourceBinding],claimMap,reviewedThrough:DATE,nextTrigger:'The source or claim changes.',correctionOwner:'synthetic-fixture-owner'},ratchet:{repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0,reviewIssues:0,reviewCycles:1,onKnownDefect:'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW'},lineage:{kind:'FIRST',noComparableReason:'First synthetic Weekly integration fixture.'},learningDisposition:{disposition:'NO_NEW_DEFECT',rationale:'The valid synthetic fixture introduces no reusable content defect.'},verdict:'PASS',limitations:['SYNTHETIC TEST FIXTURE ONLY; no production review or real human evidence is claimed.']};
  const producer=structuredClone(baseReceipt);producer.stage='PRODUCER_SELF_REVIEW';producer.reviewer={id:'weekly-fixture-maker',principalId:'weekly-fixture-maker',role:'synthetic producer',modelFamily:'openai'};producer.reviewedAt='2026-09-09T09:30:00-07:00';producer.calibration=calibration('weekly-fixture-maker');for(const name of ['explainBack','unseenTransfer']){delete producer.outcomes[name].observedReaderEvidence;producer.outcomes[name].simulatedReaderProbe={prompt:`Synthetic ${name} probe.`,probeResponse:'The source supports the pattern and a changed source requires another check.',expectedEvidence:'Source, pattern, and check trigger.'}}
  const independent=structuredClone(baseReceipt);independent.stage='INDEPENDENT_SEMANTIC_ADMISSION';independent.reviewer={id:'weekly-fixture-independent',principalId:'weekly-fixture-independent',role:'synthetic independent reviewer',modelFamily:'claude',independentFromMaker:true,artifactFirst:true};independent.reviewedAt=STAMP;independent.calibration=calibration('weekly-fixture-independent');
  const rawReportPath='candidate/independent-raw-report.json';writeJson(rawReportPath,{candidateId:story.id,storySha256:storySha,reviewerPrincipalId:independent.reviewer.principalId,verdict:'PASS',findings:{summary:'Explicitly synthetic passing integration fixture.'}});independent.reportBinding=bind(rawReportPath);
  const producerPath='candidate/producer-review.json',independentPath='candidate/independent-review.json';writeJson(producerPath,producer);writeJson(independentPath,independent);
  const contractPath='candidate/producer-contract.json';
  const dispositions={glossaryAccumulation:{status:'CLEAR',producerGuard:'Use connected prose rather than a label list.',preventionEvidence:'The exact synthetic story connects source, claim, and reader action.'}};
  const dimensions=Object.fromEntries(['humanQuestion','usefulCuriosity','invisibleProcessConcrete','familiarTechnicalMovement','limitationsConsequences','humourSurprise','betterNextQuestion'].map((name,index)=>[name,index<3?{disposition:'APPLY',reason:`${name} supports the Weekly reader job.`,plannedEvidence:`The exact story makes ${name} visible.`}:{disposition:'NOT_APPLICABLE',reason:`${name} is unnecessary for this bounded Weekly fixture.`}]));
  const contract={schemaVersion:'laidies-content-producer-contract.v1',candidateId:story.id,surface:'NEWSSTAND_WEEKLY',contentClass:'NEWS',producer:producer.maker,status:'READY_TO_DRAFT',readerContract:{humanQuestion:'What pattern matters this week?',promisedPayoff:'A sourced synthesis.',priorKnowledge:'No technical knowledge.',centralMentalModel:'Evidence supports a synthesis.',dailyLifeConnection:'A weekly work briefing.',surfaceJob:'Weekly synthesis.',desiredFeeling:'Clear and equipped.'},canonicalTruth:[{claimId:'weekly-pattern',owner:'synthetic fixture',freshnessTrigger:'Source changes.',source:sourceBinding}],positiveExemplars:[{id:'WEEKLY-GOOD',strengthsToUse:['Start from the reader question.'],patternsNotToCopy:['Do not copy its sentence structure.']}],knownFailurePreflight:{registryVersion:registry.schemaVersion,registrySha256:bind(registryPath).sha256,negativeExemplarIds:['WEEKLY-BAD'],knownDefectsRemaining:[],dispositions},draftArchitecture:{plainAnswer:'Name the weekly pattern.',causalSequence:['Read the source.','Connect the supported claim.','Give the reader a next check.'],workedCase:'This Weekly source pattern.',transferCase:'A different weekly policy pattern.',usefulAction:'Recheck when the source changes.',formatSpecificStructure:'Weekly headline, highlights, synthesis, and consequence.',antiTemplateDecision:'Use the evidence order rather than a repeated paragraph template.',analogyPlan:[],humourPlan:{noneReason:'Humour would not improve this plumbing fixture.'}},communicationDesign:{benchmarkId:'HANNAH_FRY_COMMUNICATION_LENS_V2',benchmark:bind(benchmarkPath),mode:'PROPORTIONAL',surfaceAdaptation:'Use only the benchmark moves that clarify a short Weekly synthesis.',imitationBoundary:'ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA',dimensions,explanationArc:{mode:'PROPORTIONAL',retainedMoves:['human question','evidence connection'],adaptation:'Answer briefly, connect the evidence, and land on the next check.'}},representativeProofPlan:{highestRisk:'A fake review could bypass the real gate.',plannedProof:'Run the publisher against actual validators in a disposable root.',acceptanceOutcome:'Every exact binding passes and mutations fail.'},ratchet:{targets:{repeatedKnownDefects:0,objectiveDefectsFirstFoundAtReview:0},rule:'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW'}};
  writeJson(contractPath,contract);
  const candidate={schemaVersion:'newsstand-weekly-candidate-v1',candidateStatus:'READY_FOR_WEEKLY_ADMISSION',candidateId:story.id,publicationDate:DATE,period:{startDate:'2026-09-02',endDate:DATE},publicationBase:{path:basePath,sha256:bind(basePath).sha256},priorWeekly:{storyId:prior.id,storySha256:sha(stable(prior))},manifest:manifestBinding,reviewText:reviewBinding,sourceText:reviewBinding,producerContract:bind(contractPath),producerReview:bind(producerPath),independentReview:bind(independentPath),independentRawReport:bind(rawReportPath),claimMap:bind(claimMapPath),sources:[{id:'weekly-source',url:'https://example.com/weekly-source',evidence:sourceBinding}],pointerNote:'The 2026-09-02–2026-09-09 Weekly.',story,storySha256:storySha};
  candidate.selection={scoutingScope:'WIDER_NEWS_AND_PRIMARY_ANNOUNCEMENTS',developments:[{headline:story.headline,announcementDate:DATE,sourceIds:['weekly-source'],dateEvidence:'Synthetic dated fixture announcement'}]};
  const candidatePath='candidate/weekly-candidate.json';writeJson(candidatePath,candidate);
  return {root,write,writeJson,bind,data,basePath,candidatePath,candidate,story,producer,independent,manifest:JSON.parse(fs.readFileSync(path.join(root,manifestPath))),paths:{registryPath,sourcePath,reviewPath,manifestPath,claimMapPath,producerPath,independentPath,rawReportPath,contractPath}};
}

function invoke(f){return publishNewsstandWeekly({datasetRaw:fs.readFileSync(path.join(f.root,f.basePath),'utf8'),candidate:f.candidate,producer:f.producer,independent:f.independent,manifest:f.manifest,reviewTextRaw:fs.readFileSync(path.join(f.root,f.paths.reviewPath),'utf8'),root:f.root,now:STAMP})}
function rebindReceipt(f,which,mutate){const value=structuredClone(f[which]);mutate(value);f[which]=value;const pathKey=which==='producer'?'producerPath':'independentPath';f.writeJson(f.paths[pathKey],value);f.candidate[which==='producer'?'producerReview':'independentReview']=f.bind(f.paths[pathKey])}
function reject(mutate,pattern){const f=makeFixture();mutate(f);assert.throws(()=>invoke(f),pattern)}

try{
  const f=makeFixture(),beforeRaw=fs.readFileSync(path.join(f.root,f.basePath),'utf8'),result=invoke(f);
  assert.equal(result.changed,true);assert.equal(result.idempotent,false);assert.equal(result.dataset.publications.weekly.storyId,f.story.id);assert.equal(result.dataset.stories.length,f.data.stories.length+1);
  assert.deepEqual(result.dataset.stories.slice(0,-1),f.data.stories,'all older stories must remain byte-equivalent data');
  for(const edition of ['breaking','daily','big-picture'])assert.deepEqual(result.dataset.publications[edition],f.data.publications[edition],`${edition} pointer/issue must remain unchanged`);
  for(const key of Object.keys(f.data).filter(key=>!['stories','publications'].includes(key)))assert.deepEqual(result.dataset[key],f.data[key],`${key} must remain unchanged`);
  assert.equal(fs.readFileSync(path.join(f.root,f.basePath),'utf8'),beforeRaw,'function check must not write');

  reject(f=>{delete f.candidate.sourceText},/sourceText requires exact path/);
  reject(f=>{f.write(f.paths.sourcePath,'changed synthetic source evidence\n')},/producer contract is invalid/);
  reject(f=>{f.write(f.paths.reviewPath,'changed reviewed prose\n')},/manifest\/review text|sourceText SHA-256 mismatch/);
  reject(f=>{const contract=JSON.parse(fs.readFileSync(path.join(f.root,f.paths.contractPath)));contract.status='REPAIR_PRODUCER';f.writeJson(f.paths.contractPath,contract);f.candidate.producerContract=f.bind(f.paths.contractPath)},/producer contract is invalid/);
  reject(f=>{const report=JSON.parse(fs.readFileSync(path.join(f.root,f.paths.rawReportPath)));report.verdict='HOLD';f.writeJson(f.paths.rawReportPath,report);const binding=f.bind(f.paths.rawReportPath);f.candidate.independentRawReport=binding;rebindReceipt(f,'independent',value=>{value.reportBinding=binding})},/raw independent report/);
  reject(f=>{fs.unlinkSync(path.join(f.root,f.paths.rawReportPath))},/independent raw report/);
  reject(f=>rebindReceipt(f,'independent',value=>{value.outcomes.readerValue.verdict='HOLD'}),/review chain failed/);
  reject(f=>{const registry=JSON.parse(fs.readFileSync(path.join(f.root,f.paths.registryPath)));registry.schemaVersion='stale-registry-version';f.writeJson(f.paths.registryPath,registry)},/registry/);
  reject(f=>rebindReceipt(f,'independent',value=>{value.factualReview.reviewedThrough='2026-09-08'}),/source date is invalid/);
  reject(f=>{f.candidate.publicationDate='2026-09-08'},/Wednesday/);
  reject(f=>{f.candidate.publicationBase.sha256='0'.repeat(64)},/publication base binding changed/);
  reject(f=>{f.candidate.priorWeekly.storyId='wrong-prior-weekly'},/prior Weekly binding changed/);
  reject(f=>rebindReceipt(f,'producer',value=>{value.reviewMetricsPolicy={path:'ordinary-policy.json',sha256:'0'.repeat(64)}}),/review pair|review chain/);
  reject(f=>rebindReceipt(f,'independent',value=>{value.samplingOverride={policy:{path:'service-policy.json',sha256:'0'.repeat(64)}}}),/review pair|review chain/);
  reject(f=>{f.candidate.sources=[]},/one source-evidence binding/);
  reject(f=>{f.candidate.candidateId='conflicting-weekly-id'},/Weekly story is not/);
  reject(f=>{f.candidate.selection.developments[0].announcementDate='2026-07-30'},/in-period original announcement/);
  assert.throws(()=>validateWeeklySelection({period:{startDate:'2026-02-20',endDate:'2026-03-02'},story:{sources:[{id:'weekly-source'}]},selection:{scoutingScope:'WIDER_NEWS_AND_PRIMARY_ANNOUNCEMENTS',developments:[{headline:'Impossible date fixture',announcementDate:'2026-02-29',sourceIds:['weekly-source'],dateEvidence:'Fixture'}]}}),/in-period original announcement/,'selection rejects impossible calendar literals rather than JavaScript date rollover');
  reject(f=>{delete f.candidate.selection},/wider-news scouting/);
  reject(f=>{f.candidate.selection.developments[0].announcementDate='2026-09-10'},/in-period original announcement/);
  reject(f=>{f.candidate.pointerNote='An unreviewed editorial assertion.'},/pointer note/);
  reject(f=>{f.data.stories.push(structuredClone(f.story));f.data.stories.at(-1).status='published';f.data.stories.at(-1).publishedAt=STAMP;f.data.stories.at(-1).sourceApproval={status:'approved',record:`newsstand:source-approval:${f.story.id}`};f.write(f.basePath,render(f.data));f.candidate.publicationBase=f.bind(f.basePath)},/replay is not accepted/);

  const cli=makeFixture();
  const inventory=root=>new Map(fs.readdirSync(root,{recursive:true,withFileTypes:true}).filter(entry=>entry.isFile()).map(entry=>{const relative=path.relative(root,path.join(entry.parentPath,entry.name));return [relative,sha(fs.readFileSync(path.join(root,relative)))]}));
  const filesBefore=inventory(cli.root);
  const cliOutput=execFileSync(process.execPath,[PUBLISHER,'--root',cli.root,'--now',STAMP,'--candidate',cli.candidatePath,'--dataset',cli.basePath,'--write'],{encoding:'utf8'}).trim();
  assert.equal(cliOutput,'NEWSSTAND WEEKLY PUBLICATION LOCAL_WRITE READY story=weekly-synthetic-2026-09-09 canonical_write=true');
  const filesAfter=inventory(cli.root);
  assert.deepEqual([...filesAfter.keys()].sort(),[...filesBefore.keys()].sort(),'CLI must not add files');
  assert.deepEqual([...filesAfter].filter(([name,digest])=>filesBefore.get(name)!==digest).map(([name])=>name),[cli.basePath],'CLI must change only the disposable dataset');
  const cliData=parse(fs.readFileSync(path.join(cli.root,cli.basePath),'utf8'));assert.equal(cliData.publications.weekly.storyId,cli.story.id);assert.equal(cliData.stories.length,cli.data.stories.length+1);
  console.log('NEWSSTAND WEEKLY PUBLICATION TEST PASS real_chain=1 real_contract=1 real_reader=1 atomic_preservation=1 cli_temp_only=1 rejected=18 replay_safe=1');
}finally{for(const root of roots)fs.rmSync(root,{recursive:true,force:true})}
