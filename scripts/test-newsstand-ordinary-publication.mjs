#!/usr/bin/env node
// Synthetic proof only. No source claim, reader observation or approval below
// belongs to a real article. Every file is written into a disposable fixture.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { webcrypto } from 'node:crypto';
import { buildDerivatives } from './build-newsstand-derivatives.mjs';
import { composeDailyEnvelope } from './compose-daily-edition.mjs';
import { promoteDailyIssue } from './promote-daily-edition.mjs';
import { projectDailySourceRaw, verifyProjectionAdmission } from './publish-daily-edition.mjs';
import { validateOrdinaryStoryCandidate, candidateReviewText, stable, sha256 } from './validate-newsstand-ordinary-story-candidate.mjs';
import { enforcedFailureFamilies } from './check-prose-quality-admission.mjs';
import { prepareOvernightCandidate } from './prepare-newsstand-overnight-candidate.mjs';

const SOURCE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'newsstand-ordinary-fixture-')));
const date = '2026-08-30';
const prefix = 'operations/product-stewards/newsstand/candidates/fixture';
const put = (name, data) => { const p = path.join(root, name); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, typeof data === 'string' ? data : JSON.stringify(data)); return { path: name, sha256: sha256(fs.readFileSync(p)) }; };
const parse = raw => { const c = { window: {} }; vm.runInNewContext(raw, c); return JSON.parse(JSON.stringify(c.window.NEWSSTAND_DATA)); };
const base = fs.readFileSync(path.join(SOURCE, 'content/newsstand-stories.js'), 'utf8');
const dataset = parse(base);
const columnsRaw = fs.readFileSync(path.join(SOURCE, 'content/daily-edition-columns.json'), 'utf8');
const columns = JSON.parse(columnsRaw);
const originalStore = JSON.parse(fs.readFileSync(path.join(SOURCE, 'content/newsstand-daily-issues.json'), 'utf8'));
originalStore.issues = originalStore.issues.filter(issue => issue.editionDate <= date);
const original = originalStore.issues.find(issue => issue.editionDate === date);
assert.ok(original, 'fixture seed requires the existing published issue');
put('content/newsstand-stories.js', base);
put('content/daily-edition-columns.json', columnsRaw);
put('content/luminairy-profiles.json', fs.readFileSync(path.join(SOURCE, 'content/luminairy-profiles.json'), 'utf8'));
const radarPath = `operations/product-stewards/newsstand/editorial-intake/${date}.md`;
const radarRaw = `${date}\n- **NewsStand:** REVIEW CANDIDATE fixture-current-news.\n`;
put(radarPath, radarRaw);
const sourceBinding = put(`${prefix}/source.txt`, 'Synthetic authority: This fixture changes one setting, not every product.\n');
const bad = put(`${prefix}/bad.txt`, 'Synthetic bad prose gives labels without explaining the change.\n');
const good = put(`${prefix}/good.txt`, 'Synthetic good prose explains a dated change and its consequence.\n');
const registry = { schemaVersion: 'laidies-content-quality-exemplars.v1', negativeExemplars: [{ id: 'BAD', ...bad, incidentId: 'fixture', appliesTo: ['NEWS'], failureFamilies: ['missingMechanism'] }], positiveExemplars: [{ id: 'GOOD', ...good, useFor: ['NEWS'] }] };
const registryBinding = put('operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json', registry);
const benchmark = put('operations/product-stewards/learning-content-ecosystem/HANNAH-FRY-COMMUNICATION-BENCHMARK.md', 'Synthetic benchmark fixture, not editorial evidence.\n');
const story = { ...structuredClone(dataset.stories.find(story => story.edition === 'daily' && !story.id.startsWith('front-paige-'))), id: 'fixture-current-news', slug: 'fixture-current-news', status: 'hold', publishedAt: null, updatedAt: `${date}T20:00:00Z`, lastCheckedAt: `${date}T20:00:00Z`, sourceApproval: { status: 'independent-review-required', record: 'newsstand:source-approval:fixture-current-news' }, headline: 'Synthetic current news fixture', the_story: 'This fixture changes one setting, not every product.', heroVisual: { src: '/assets/newsstand/design-20260830/latest-checking.png', alt: 'Synthetic fixture image for publication-gate coverage.', credit: 'Synthetic test fixture' }, correction: null, retraction: null, bigPicture: null, correctionHistory: [], predecessorStoryIds: [], successorStoryIds: [], sources: [{ id: 'fixture-source', url: 'https://example.test/fixture', label: 'Synthetic primary evidence', accessedAt: date, approvalStatus: 'reviewed', publisherType: 'primary-document' }] };
const reviewText = put(`${prefix}/review.txt`, candidateReviewText(story));
const rendered = put(`${prefix}/render.html`, '<p>UNAPPROVED SYNTHETIC TEST ONLY</p>');
const manifest = put(`${prefix}/manifest.json`, { schemaVersion: 'laidies-content-artifact-manifest.v1', candidateId: story.id, contentClass: 'NEWS', surface: 'NEWSSTAND_DAILY', reviewText, rendered });
const excerpt = story.the_story;
const claimMap = [{ claimId: 'fixture-change', status: 'VERIFIED', candidateEvidence: [{ excerpt, locator: 'the_story' }], sourceBinding, sourceEvidence: [{ excerpt, locator: 'source:1' }], scopeAndFreshness: 'Synthetic fixture only.' }];
const outcomes = Object.fromEntries(['plainClarity', 'readerValue', 'laidiesVoice', 'engagingEnjoyable', 'factualIntegrity', 'freshnessReviewability', 'surfaceFit', 'datedChange', 'consequenceAndUncertainty', 'dailyLifeConnection', 'communicationBenchmark', 'explainBack', 'unseenTransfer', 'usefulAction', 'analogyIntegrity'].map(name => [name, { verdict: 'PASS', observation: `Synthetic ${name} test record.`, artifactEvidence: [{ excerpt, locator: 'the_story' }] }]));
for (const name of ['explainBack', 'unseenTransfer']) outcomes[name].observedReaderEvidence = { evidenceType: 'OBSERVED_HUMAN', administratorPrincipalId: 'synthetic-only', participants: [{ participantId: name, prompt: 'Synthetic test question', verbatimResponse: 'Synthetic fixture response, not an actual participant.', expectedEvidence: 'Synthetic mechanism', observedAt: `${date}T20:30:00Z`, observationBinding: put(`${prefix}/${name}.txt`, 'SYNTHETIC TEST OBSERVATION — NOT A REAL HUMAN STUDY\n') }] };
const independent = { schemaVersion: 'laidies-prose-quality-review.v1', candidateId: story.id, stage: 'INDEPENDENT_SEMANTIC_ADMISSION', contentClass: 'NEWS', surface: 'NEWSSTAND_DAILY', maker: 'fixture-maker', reviewer: { id: 'fixture-judge', principalId: 'fixture-judge', role: 'independent', modelFamily: 'fixture-family-B', independentFromMaker: true, artifactFirst: true }, reviewMode: 'EXACT_PROSE_IN_FULL', reviewedAt: `${date}T21:00:00Z`, artifact: { reviewText, manifest, rendered }, calibration: { registrySha256: registryBinding.sha256, reviewerPrincipalId: 'fixture-judge', reviewedAt: `${date}T20:59:00Z`, negatives: [{ exemplarId: 'BAD', verdict: 'REJECT', identifiedFailureFamilies: ['missingMechanism'], evidence: [{ excerpt: 'Synthetic bad prose gives labels', locator: 'bad:1' }] }], positive: { exemplarId: 'GOOD', verdict: 'PASS', strengthsRetained: ['dated consequence'], evidence: [{ excerpt: 'Synthetic good prose explains a dated change', locator: 'good:1' }] } }, reverseBrief: Object.fromEntries(['humanQuestion', 'promisedPayoff', 'centralMentalModel', 'dailyLifeConnection', 'surfaceJob', 'desiredReaderFeeling'].map(name => [name, `Synthetic ${name}`])), outcomes, failureFamilies: Object.fromEntries(enforcedFailureFamilies(registry).map(name => [name, { present: false, observation: 'Synthetic check only', artifactLocator: 'the_story' }])), factualReview: { disposition: 'CLAIMS_REVIEWED', sourceBindings: [sourceBinding], claimMap, reviewedThrough: date, nextTrigger: 'source changes', correctionOwner: 'fixture' }, ratchet: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' }, lineage: { kind: 'FIRST', noComparableReason: 'Synthetic pipeline calibration, not an editorial candidate.' }, learningDisposition: { disposition: 'NO_NEW_DEFECT', rationale: 'Synthetic passing control.' }, verdict: 'PASS', limitations: ['SYNTHETIC FIXTURE ONLY, NEVER PUBLISH'] };
const producer = structuredClone(independent);
producer.stage = 'PRODUCER_SELF_REVIEW'; producer.reviewer = { id: 'fixture-maker', principalId: 'fixture-maker', role: 'producer', modelFamily: 'fixture-family-A' }; producer.reviewedAt = `${date}T20:00:00Z`; producer.calibration.reviewerPrincipalId = 'fixture-maker'; producer.calibration.reviewedAt = `${date}T19:00:00Z`;
for (const name of ['explainBack', 'unseenTransfer']) { delete producer.outcomes[name].observedReaderEvidence; producer.outcomes[name].simulatedReaderProbe = { prompt: 'Synthetic probe', probeResponse: 'Synthetic answer', expectedEvidence: 'Synthetic test' }; }
const report = put(`${prefix}/raw-review.json`, { candidateId: story.id, storySha256: sha256(stable(story)), verdict: 'PASS', reviewerPrincipalId: independent.reviewer.principalId, findings: 'SYNTHETIC FIXTURE ONLY' }); independent.reportBinding = report;
const contract = { schemaVersion: 'laidies-content-producer-contract.v1', candidateId: story.id, surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS', producer: 'fixture-maker', readerContract: Object.fromEntries(['humanQuestion', 'promisedPayoff', 'priorKnowledge', 'centralMentalModel', 'dailyLifeConnection', 'surfaceJob', 'desiredFeeling'].map(name => [name, `Synthetic ${name}`])), canonicalTruth: [{ claimId: 'fixture-change', owner: 'fixture', freshnessTrigger: 'source changes', source: sourceBinding }], positiveExemplars: [{ id: 'GOOD', strengthsToUse: ['clarity'], patternsNotToCopy: ['scaffold'] }], knownFailurePreflight: { registryVersion: registry.schemaVersion, registrySha256: registryBinding.sha256, negativeExemplarIds: ['BAD'], dispositions: { missingMechanism: { status: 'CLEAR', producerGuard: 'Synthetic guard', preventionEvidence: 'Synthetic mechanism plan' } }, knownDefectsRemaining: [] }, draftArchitecture: { plainAnswer: 'Synthetic change', causalSequence: ['input', 'change', 'effect'], workedCase: 'Work case', transferCase: 'Home case', usefulAction: 'Check change', formatSpecificStructure: 'Dated story', antiTemplateDecision: 'No repeated structure', analogyPlan: [], humourPlan: { noneReason: 'Test only' } }, communicationDesign: { benchmarkId: 'HANNAH_FRY_COMMUNICATION_LENS_V2', benchmark, mode: 'PROPORTIONAL', surfaceAdaptation: 'Synthetic news test', imitationBoundary: 'ADAPT_PRINCIPLES_NEVER_IMITATE_VOICE_OR_PERSONA', dimensions: Object.fromEntries(['humanQuestion', 'usefulCuriosity', 'invisibleProcessConcrete', 'familiarTechnicalMovement', 'limitationsConsequences', 'humourSurprise', 'betterNextQuestion'].map(name => [name, { disposition: 'APPLY', reason: `Synthetic ${name}`, plannedEvidence: 'Specific synthetic mechanism evidence' }])), explanationArc: { mode: 'PROPORTIONAL', retainedMoves: ['change', 'effect'], adaptation: 'Short synthetic report' } }, representativeProofPlan: { highestRisk: 'Changed bytes', plannedProof: 'Mutation tests', acceptanceOutcome: 'Fail closed' }, ratchet: { targets: { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0 }, rule: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' }, status: 'READY_TO_DRAFT' };
const candidate = { schemaVersion: 'newsstand-ordinary-story-candidate-v1', candidateStatus: 'READY_FOR_ISSUE_ADMISSION', candidateId: story.id, editionDate: date, story, storySha256: sha256(stable(story)), publicationBase: put(`${prefix}/base.js`, base), sourceText: reviewText, claimMap: put(`${prefix}/claims.json`, claimMap), producerContract: put(`${prefix}/contract.json`, contract), sources: [{ id: 'fixture-source', url: story.sources[0].url, evidence: sourceBinding }], reviewEvidence: { producer: put(`${prefix}/producer.json`, producer), independent: put(`${prefix}/independent.json`, independent), independentRawReport: report } };
const candidateBinding = put(`${prefix}/candidate.json`, candidate);
const compose = binding => composeDailyEnvelope({ root, date, radarPath: path.join(root, radarPath), radarRaw, storiesRaw: base, columnsRaw, candidateBinding: binding });
const composed = compose(candidateBinding);
for (const field of ['frontPaigeStoryId', 'weeklyStoryId', 'desks']) original[field] = structuredClone(composed.envelope[field]);
original.serviceRecordIds = composed.envelope.desks.filter(desk => desk.state === 'ready').map(desk => desk.recordId);
original.storyIds = composed.envelope.storyIds.filter(id => id !== story.id);
original.stories = composed.envelope.storySnapshots.filter(item => item.id !== story.id);
// This synthetic same-date append must start from the exact column authority
// used by the envelope. Historical fixture issues can legitimately carry an
// older column-store hash after later desks are admitted; that is not a valid
// predecessor for exercising the protected same-date append invariant.
original.sourceIdentity = {
  ...original.sourceIdentity,
  columnsPath: composed.envelope.sourceIdentity.columnsPath,
  columnsSha256: composed.envelope.sourceIdentity.columnsSha256
};
assert.deepEqual(original.serviceRecordIds, composed.envelope.desks.filter(desk => desk.state === 'ready').map(desk => desk.recordId), 'synthetic predecessor service membership matches composed revision');
assert.equal(composed.envelope.storySnapshots.at(-1).status, 'hold');
assert.equal(fs.readFileSync(path.join(root, 'content/newsstand-stories.js'), 'utf8'), base, 'composition must never publish');
const decision = { schemaVersion: 'daily-issue-news-revision-admission-v1', decision: 'ACCEPT_LOCAL_CANONICAL_SUCCESSOR', editionDate: date, envelopeSha256: composed.sha256, predecessorEnvelopeSha256: original.envelopeSha256, addedStoryIds: [story.id], reviewedBy: 'independent-fixture-judge', reviewerRole: 'independent NewsStand issue judge', reviewedAt: `${date}T22:00:00Z` };
const promote = (d = decision, store = originalStore, envelope = composed) => promoteDailyIssue({ root, store, envelope: envelope.envelope, envelopeRaw: envelope.canonical, decision: d, maker: 'fixture-maker', now: `${date}T23:00:00Z` });
const admitted = promote();
assert.equal(promote(decision, admitted.store).changed, false, 'promotion retry is idempotent');
assert.equal(admitted.issue.stories.at(-1).status, 'published');
assert.deepEqual(admitted.issue.serviceRecordIds, original.serviceRecordIds);
verifyProjectionAdmission({ root, issue: admitted.issue, envelopeRaw: composed.canonical, decision });
const output = projectDailySourceRaw({ root, raw: base, issue: admitted.issue, columns });
assert.equal(projectDailySourceRaw({ root, raw: output, issue: admitted.issue, columns }), output, 'projection retry is exact');
const publicData = parse(output);
const reader = createRequire(import.meta.url)('../content/newsstand-reader-contract.js');
assert.deepEqual(reader.validate(publicData), [], 'projected story must satisfy the real reader contract');
assert.equal(reader.accessDecision(publicData, publicData.stories.at(-1), { scope: 'search' }, Date.parse(`${date}T22:01:00Z`)).canExpose, true);
const derivatives = buildDerivatives({ storyRaw: output, columns, issues: admitted.store });
assert.ok(derivatives.feed.current.some(item => item.id === story.id));
assert.ok(derivatives.archive.items.some(item => item.id === `story:${story.id}`));
assert.equal(publicData.stories.length, dataset.stories.length + 1);
assert.deepEqual(publicData.stories.slice(0, -1), dataset.stories);
assert.deepEqual(publicData.publications.weekly, dataset.publications.weekly);
assert.deepEqual(publicData.publications['big-picture'], dataset.publications['big-picture']);
assert.equal(publicData.publications.daily.issue.frontPaigeStoryId, original.frontPaigeStoryId);
assert.ok(publicData.publications.daily.issue.storyIds.includes(story.id));
assert.throws(() => projectDailySourceRaw({ root, raw: output + '\n// unexpected drift', issue: admitted.issue, columns }), /base changed/);
assert.throws(() => projectDailySourceRaw({ root, raw: base + '\n// unexpected drift', issue: admitted.issue, columns }), /base changed/);
assert.throws(() => promote({ ...decision, predecessorEnvelopeSha256: '0'.repeat(64) }), /predecessor has changed/);
assert.throws(() => promote({ ...decision, addedStoryIds: ['wrong-id'] }), /additions/);
assert.throws(() => promote({ ...decision, reviewedAt: '2026-08-30T02:00:00Z' }), /cannot precede|Vancouver issue date/);
assert.throws(() => promote({ ...decision, reviewedAt: '2026-08-30T20:01:00Z' }), /cannot precede/);
const eveningDecision = { ...decision, reviewedAt: '2026-08-31T01:00:00Z' };
const evening = promoteDailyIssue({ root, store: originalStore, envelope: composed.envelope, envelopeRaw: composed.canonical, decision: eveningDecision, maker: 'fixture-maker', now: '2026-08-31T02:00:00Z' });
assert.ok(parse(projectDailySourceRaw({ root, raw: base, issue: evening.issue, columns })).publications.daily.issue.storyIds.includes(story.id), 'Vancouver evening still belongs to Aug30');
assert.throws(() => verifyProjectionAdmission({ root, issue: admitted.issue, envelopeRaw: composed.canonical, decision: { ...decision, schemaVersion: 'daily-issue-service-revision-admission-v1' } }), /initial or news-revision/);
const generic = { ...decision, schemaVersion: 'daily-issue-successor-admission-v1' }; delete generic.addedStoryIds;
assert.throws(() => promote(generic), /not generic\/service/);
// Exercise a first issue too, with no pre-existing same-date issue.
const firstDecision = { ...decision, schemaVersion: 'daily-issue-admission-v1', decision: 'ACCEPT_LOCAL_CANONICAL_WRITE' }; delete firstDecision.predecessorEnvelopeSha256; delete firstDecision.addedStoryIds;
assert.equal(promote(firstDecision, { ...originalStore, issues: [] }).issue.storyIds.at(-1), story.id);
// Real composition, issue admission and public projection of unchanged evening
// prose. The records below are synthetic and confined to this disposable root.
const morningDate='2026-08-31',morningNow=`${morningDate}T14:10:00Z`;
const morningSource=put(`${prefix}/morning-source.json`,{schemaVersion:'laidies-newsstand-current-source-capture.v1',sourceUrl:candidate.sources[0].url,capturedAt:`${morningDate}T13:55:00Z`,content:'Synthetic morning source check: the original bounded setting change is unchanged.'});
const developmentEvidence=put(`${prefix}/morning-developments.json`,{schemaVersion:'laidies-newsstand-development-capture.v1',query:'Synthetic latest development index',capturedAt:`${morningDate}T13:58:00Z`,sourceUrls:['https://example.test/latest'],content:'Synthetic current index check: no later development changes the bounded setting claim.'});
const morningRecord={schemaVersion:'laidies-newsstand-overnight-freshness.v1',candidateId:candidate.candidateId,storySha256:candidate.storySha256,reviewedCandidate:candidateBinding,independentReview:candidate.reviewEvidence.independent,claimMap:candidate.claimMap,publicationDate:morningDate,checkedAt:`${morningDate}T14:00:00Z`,checker:'synthetic-fixture-checker',disposition:'NO_MATERIAL_CHANGE',sourceChecks:[{id:candidate.sources[0].id,url:candidate.sources[0].url,originalEvidence:sourceBinding,disposition:'UNCHANGED',explanation:'Synthetic recheck of the exact material claim, not a real source assessment.',currentCheckedAt:`${morningDate}T13:55:00Z`,currentEvidence:morningSource,currentExcerpt:'Synthetic morning source check: the original bounded setting change is unchanged.'}],developmentCheck:{disposition:'NO_MATERIAL_CHANGE',checkedAt:`${morningDate}T13:58:00Z`,query:'Synthetic latest development index',explanation:'No new development in this synthetic fixture.',evidence:developmentEvidence,currentExcerpt:'Synthetic current index check: no later development changes the bounded setting claim.'}};
const morningRecordBinding=put(`${prefix}/morning-check.json`,morningRecord);
const overnightCandidate=prepareOvernightCandidate(morningRecordBinding,{root,now:morningNow});
assert.deepEqual(overnightCandidate.story,candidate.story,'overnight preparation must not change prose or original dates');
const overnightBinding=put(`${prefix}/overnight-candidate.json`,overnightCandidate);
const morningRadarPath=`operations/product-stewards/newsstand/editorial-intake/${morningDate}.md`;
const morningRadar=`${morningDate}\n- **NewsStand:** REVIEW CANDIDATE fixture-current-news.\n`;
put(morningRadarPath,morningRadar);
const morningEnvelope=composeDailyEnvelope({root,date:morningDate,now:morningNow,radarPath:path.join(root,morningRadarPath),radarRaw:morningRadar,storiesRaw:base,columnsRaw,candidateBinding:overnightBinding});
const morningDecision={schemaVersion:'daily-issue-admission-v1',decision:'ACCEPT_LOCAL_CANONICAL_WRITE',editionDate:morningDate,envelopeSha256:morningEnvelope.sha256,reviewedBy:'independent-fixture-judge',reviewerRole:'independent NewsStand issue judge',reviewedAt:`${morningDate}T14:05:00Z`};
const morningAdmission=promoteDailyIssue({root,store:{...originalStore,issues:[]},envelope:morningEnvelope.envelope,envelopeRaw:morningEnvelope.canonical,decision:morningDecision,maker:'fixture-maker',now:morningNow});
verifyProjectionAdmission({root,issue:morningAdmission.issue,envelopeRaw:morningEnvelope.canonical,decision:morningDecision});
const prematureDecision={...morningDecision,reviewedAt:`${morningDate}T13:59:00Z`};
assert.throws(()=>promoteDailyIssue({root,store:{...originalStore,issues:[]},envelope:morningEnvelope.envelope,envelopeRaw:morningEnvelope.canonical,decision:prematureDecision,maker:'fixture-maker',now:morningNow}),/cannot precede the overnight freshness check/);
const prematureIssue=structuredClone(morningAdmission.issue);
prematureIssue.admission.reviewedAt=prematureDecision.reviewedAt;
prematureIssue.stories.find(item=>item.id===story.id).publishedAt=prematureDecision.reviewedAt;
assert.throws(()=>verifyProjectionAdmission({root,issue:prematureIssue,envelopeRaw:morningEnvelope.canonical,decision:prematureDecision}),/cannot precede the overnight freshness check/);
assert.throws(()=>projectDailySourceRaw({root,raw:base,issue:prematureIssue,columns}),/cannot precede the overnight freshness check/);
const morningOutput=projectDailySourceRaw({root,raw:base,issue:morningAdmission.issue,columns,now:morningNow});
assert.throws(()=>projectDailySourceRaw({root,raw:base,issue:morningAdmission.issue,columns,now:'2026-09-02T14:00:00Z'}),/first overnight publication must occur/);
const morningPublic=parse(morningOutput),morningStory=morningPublic.stories.find(item=>item.id===story.id);
assert.equal(morningStory.publishedAt,morningDecision.reviewedAt);
assert.equal(morningStory.updatedAt,story.updatedAt);
assert.equal(morningStory.lastCheckedAt,story.lastCheckedAt);
assert.deepEqual(morningStory.sources,story.sources);
assert.equal(morningStory.the_story,story.the_story);
assert.deepEqual(reader.validate(morningPublic),[]);
assert.equal(projectDailySourceRaw({root,raw:morningOutput,issue:morningAdmission.issue,columns,now:'2026-09-02T14:00:00Z'}),morningOutput,'admitted historical overnight projection remains exactly replayable');
assert.equal(fs.readFileSync(path.join(root,'content/newsstand-stories.js'),'utf8'),base,'overnight preparation and projection never silently write canonical files');
assert.throws(()=>prepareOvernightCandidate(morningRecordBinding,{root,now:`${date}T23:00:00Z`}),/publication day|non-future/);
const changedMorningRecord=put(`${prefix}/changed-morning-check.json`,{...morningRecord,disposition:'MATERIAL_CHANGE'});
assert.throws(()=>prepareOvernightCandidate(changedMorningRecord,{root,now:morningNow}),/NO_MATERIAL_CHANGE/);
let rejected = 0;
const badCandidate = (change, pattern) => { const copy = structuredClone(candidate); change(copy); assert.throws(() => validateOrdinaryStoryCandidate(copy, { root }), pattern); rejected++; };
badCandidate(c => { c.story.headline = 'Changed after review'; }, /story hash/);
badCandidate(c => { c.sourceText.sha256 = '0'.repeat(64); }, /SHA-256/);
badCandidate(c => { c.candidateStatus = 'HELD_NOT_PUBLISHED'; }, /status/);
badCandidate(c => { c.reviewEvidence.independent.path = 'missing'; }, /missing/);
badCandidate(c => { c.story.slug = 'front-paige'; c.storySha256 = sha256(stable(c.story)); }, /exact complete held story/);
badCandidate(c => { c.sources[0].url = 'https://different.test'; }, /public source/);
badCandidate(c => { c.editionDate = '2026-08-31'; }, /date-bound/);
badCandidate(c => { c.story.headline = ''; c.storySha256 = sha256(stable(c.story)); }, /complete reader copy/);
badCandidate(c => { c.story.id = dataset.stories[0].id; c.candidateId = c.story.id; }, /held and date-bound/);
badCandidate(c => { c.story.slug = dataset.stories[0].slug; }, /reader contract/);
badCandidate(c => { c.editionDate = '2026-09-05'; c.schemaVersion = 'newsstand-ordinary-story-candidate-v2'; delete c.draftPreparation; }, /require bound drafting inputs and producer observations/);
const preparedContract = structuredClone(contract);
preparedContract.draftArchitecture.readerQuestions = [{ id: 'what-changed' }];
preparedContract.draftArchitecture.requiredTerms = [];
const preparedContractBinding = put(`${prefix}/prepared-contract.json`, preparedContract);
const writerInput = put(`${prefix}/writer-input.json`, {
  producerContract: preparedContractBinding,
  packet: { candidateId: story.id, explanationPlan: preparedContract.draftArchitecture },
  bindings: []
});
const producerObservations = put(`${prefix}/producer-observations.json`, {
  completeTextRead: true,
  storySha256: sha256(JSON.stringify(story)),
  readerAnswers: { 'what-changed': story.the_story },
  explainBack: 'Synthetic producer reasoning explains the bounded mechanism in ordinary language.',
  unseenTransfer: 'Synthetic producer reasoning applies the same bounded mechanism to another case.',
  unresolvedIssues: []
});
const preparedCandidate = structuredClone(candidate);
preparedCandidate.producerContract = preparedContractBinding;
preparedCandidate.draftPreparation = { writerInput, observations: producerObservations };
assert.deepEqual(validateOrdinaryStoryCandidate(preparedCandidate, { root }).story, story, 'bound drafting inputs validate before observation mutation');
const changedObservations = put(`${prefix}/changed-producer-observations.json`, { ...JSON.parse(fs.readFileSync(path.join(root, producerObservations.path), 'utf8')), storySha256: '0'.repeat(64) });
badCandidate(c => { c.producerContract = preparedContractBinding; c.draftPreparation = { writerInput, observations: changedObservations }; }, /candidate drafting incomplete: Producer observations bind a different draft/);
const mutateReceipt = (key, edit, pattern) => { const receipt = structuredClone(key === 'producer' ? producer : independent); edit(receipt); const binding = put(`${prefix}/mutated-${key}.json`, receipt); badCandidate(c => { c.reviewEvidence[key] = binding; }, pattern); };
mutateReceipt('independent', r => { delete r.outcomes.explainBack.observedReaderEvidence; }, /OBSERVED_HUMAN/);
mutateReceipt('independent', r => { r.reviewer.principalId = 'fixture-maker'; }, /self-review|principal/);
mutateReceipt('independent', r => { r.factualReview.reviewedThrough = '2026-08-29'; }, /current dated/);
mutateReceipt('independent', r => { r.verdict = 'HOLD'; }, /chain invalid/);
mutateReceipt('producer', r => { r.verdict = 'HOLD'; }, /chain invalid/);
put(sourceBinding.path, 'Changed evidence after review');
assert.throws(() => projectDailySourceRaw({ root, raw: output, issue: admitted.issue, columns }), /SHA-256/);
put(sourceBinding.path, 'Synthetic authority: This fixture changes one setting, not every product.\n');
// Invoke the actual CLI boundary, including the resume/check commands. The
// fixture root is derived from copied script locations, not a release bypass.
for (const name of ['newsstand-service-continuity', 'newsstand-career-lane', 'select-aidb-edition', 'check-practitioner-signal-pilot', 'advance-newsstand-story-recovery', 'compose-daily-edition', 'promote-daily-edition', 'publish-daily-edition', 'validate-newsstand-ordinary-story-candidate', 'newsstand-story-lineage', 'prepare-newsstand-draft', 'validate-newsstand-story-type-coverage', 'check-prose-quality-admission', 'check-content-producer-contract', 'build-newsstand-derivatives']) put(`scripts/${name}.mjs`, fs.readFileSync(path.join(SOURCE, `scripts/${name}.mjs`), 'utf8'));
put('operations/product-stewards/newsstand/story-type-modules.json', fs.readFileSync(path.join(SOURCE, 'operations/product-stewards/newsstand/story-type-modules.json'), 'utf8'));
put('operations/product-stewards/newsstand/story-recovery-policy.json', fs.readFileSync(path.join(SOURCE, 'operations/product-stewards/newsstand/story-recovery-policy.json'), 'utf8'));
put('operations/product-stewards/newsstand/story-recovery-queue.json', JSON.stringify({ schema: 'laidies.newsstand-story-recovery-queue.v1', items: [] }));
put('scripts/lib/newsstand-luminairy-links.mjs', fs.readFileSync(path.join(SOURCE, 'scripts/lib/newsstand-luminairy-links.mjs'), 'utf8'));
put('scripts/lib/newsstand-overnight-freshness.mjs', fs.readFileSync(path.join(SOURCE, 'scripts/lib/newsstand-overnight-freshness.mjs'), 'utf8'));
put('content/newsstand-big-picture-versions.js', fs.readFileSync(path.join(SOURCE, 'content/newsstand-big-picture-versions.js'), 'utf8'));
put('content/newsstand-reader-contract.js', fs.readFileSync(path.join(SOURCE, 'content/newsstand-reader-contract.js'), 'utf8'));
const envelopePath = `operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/${date}-fixture-revision.json`;
const decisionPath = `operations/product-stewards/newsstand/evidence/${date}-fixture-admission.json`;
put('content/newsstand-daily-issues.json', originalStore);
put(decisionPath, decision);
const cli = (name, args) => execFileSync(process.execPath, [`scripts/${name}.mjs`, ...args], { cwd: root, encoding: 'utf8' });
const composeArgs = ['--date', date, '--radar', radarPath, '--story-candidate', candidateBinding.path, '--output', envelopePath];
assert.match(cli('compose-daily-edition', composeArgs), /public_write=false/);
assert.equal(fs.readFileSync(path.join(root, envelopePath), 'utf8'), composed.canonical);
assert.match(cli('promote-daily-edition', ['--envelope', envelopePath, '--decision', decisionPath, '--maker', 'fixture-maker']), /WRITE PASS/);
assert.match(cli('promote-daily-edition', ['--envelope', envelopePath, '--decision', decisionPath, '--maker', 'fixture-maker']), /IDEMPOTENT/);
const projectArgs = ['--date', date, '--envelope', envelopePath, '--decision', decisionPath];
assert.match(cli('publish-daily-edition', projectArgs), /WRITE PASS/);
assert.match(cli('publish-daily-edition', [...projectArgs, '--check']), /CHECK PASS/);
assert.match(cli('publish-daily-edition', projectArgs), /WRITE PASS/);
assert.equal(fs.readFileSync(path.join(root, 'content/newsstand-stories.js'), 'utf8'), output);
assert.match(cli('build-newsstand-derivatives', []), /PASS/);
assert.match(cli('build-newsstand-derivatives', ['--check']), /PASS/);
assert.equal(fs.readFileSync(path.join(SOURCE, 'content/newsstand-stories.js'), 'utf8'), base, 'real canonical data must never change during tests');
// Exercise the real client snapshot gate, not just story access eligibility.
class FixtureDate extends Date { constructor(...a){super(...(a.length?a:[`${date}T23:00:00Z`]));}static now(){return Date.parse(`${date}T23:00:00Z`);} }
const sandbox={window:{crypto:webcrypto,NEWSSTAND_DATA:publicData,localStorage:{getItem:()=>null}},document:{readyState:'loading',addEventListener(){}},Date:FixtureDate,TextEncoder,URL,Intl,Set};
vm.runInNewContext(fs.readFileSync(path.join(SOURCE,'content/site/newsstand-catchup-v1.js'),'utf8').replace('})(window);',`global.test={validDailyIssueStore,set(c){columns=c;}};})(window);`),sandbox);
sandbox.window.test.set(columns);
assert.equal(await sandbox.window.test.validDailyIssueStore(admitted.store),true,sandbox.window.__newsstandDailyIssueValidationFailure);
class MorningDate extends Date { constructor(...a){super(...(a.length?a:[morningNow]));}static now(){return Date.parse(morningNow);} }
const morningSandbox={window:{crypto:webcrypto,NEWSSTAND_DATA:morningPublic,localStorage:{getItem:()=>null}},document:{readyState:'loading',addEventListener(){}},Date:MorningDate,TextEncoder,URL,Intl,Set};
vm.runInNewContext(fs.readFileSync(path.join(SOURCE,'content/site/newsstand-catchup-v1.js'),'utf8').replace('})(window);',`global.test={validDailyIssueStore,set(c){columns=c;}};})(window);`),morningSandbox);
morningSandbox.window.test.set(columns);
assert.equal(await morningSandbox.window.test.validDailyIssueStore(morningAdmission.store),true,morningSandbox.window.__newsstandDailyIssueValidationFailure);
const changedState=structuredClone(admitted.store);changedState.issues.at(-1).sourceIdentity.ordinaryCandidate.unpublishedState.status='published';
assert.equal(await sandbox.window.test.validDailyIssueStore(changedState),false,'changed original candidate state fails envelope identity');
// Actual reviewed ordinary candidate + seven original-date services in one
// new issue, through composer, admission, projection, derivatives and reader.
const oldDate='2026-08-29';
const carryColumns={...columns,records:columns.records.filter(r=>r.editionDate===date).map(r=>({...r,editionDate:oldDate}))};
assert.equal(carryColumns.records.length,7);
const carryData=structuredClone(dataset);
carryData.publications.daily.editionDate=oldDate;
carryData.publications.daily.issue={status:'complete',storyIds:[],serviceRecordIds:[],frontPaigeStoryId:original.frontPaigeStoryId,weeklyStoryId:original.weeklyStoryId};
const encode=v=>`window.NEWSSTAND_DATA = ${JSON.stringify(v,null,2)};\n`;
const oldRadar=`operations/agents/aidb-intelligence-desk/daily/${oldDate}.md`, oldRadarRaw=`${oldDate}\n- **NewsStand:** NO NEW HANDOFF. Synthetic prior publication.\n`;
put(oldRadar,oldRadarRaw);put('content/newsstand-stories.js',encode(carryData));put('content/daily-edition-columns.json',carryColumns);
const priorEnvelope=composeDailyEnvelope({root,date:oldDate,radarPath:path.join(root,oldRadar),radarRaw:oldRadarRaw,storiesRaw:encode(carryData),columnsRaw:JSON.stringify(carryColumns)});
const seedDecision={schemaVersion:'daily-issue-admission-v1',decision:'ACCEPT_LOCAL_CANONICAL_WRITE',editionDate:date,reviewedBy:'independent-fixture-judge',reviewerRole:'independent NewsStand issue judge'};
const priorDecision={...seedDecision,editionDate:oldDate,envelopeSha256:priorEnvelope.sha256,reviewedAt:oldDate+'T22:00:00Z'};
const carriedPrior=promoteDailyIssue({root,store:{schemaVersion:'daily-issues-v1',owner:'newsstand-daily',issues:[]},envelope:priorEnvelope.envelope,envelopeRaw:priorEnvelope.canonical,decision:priorDecision,maker:'fixture-maker',now:date+'T23:00:00Z'});
const carryBaseRaw=projectDailySourceRaw({root,raw:encode(carryData),issue:carriedPrior.issue,columns:carryColumns});
const ev='operations/product-stewards/newsstand/evidence/ordinary-carry-fixture';
const frozen={stories:put(`${ev}/stories.js`,carryBaseRaw),issues:put(`${ev}/issues.json`,carriedPrior.store),columns:put(`${ev}/columns.json`,carryColumns)};
const publicPaths={stories:'content/newsstand-stories.js',issues:'content/newsstand-daily-issues.json',columns:'content/daily-edition-columns.json'};
const files=Object.entries(publicPaths).map(([k,p])=>({path:p,sha256:frozen[k].sha256})).sort((a,b)=>a.path.localeCompare(b.path));
const identity=sha256(files.map(f=>`${f.sha256}  ${f.path}\n`).join(''));
const deploymentId='12345678-1234-1234-1234-123456789abc';
const proof=put(`${ev}/proof.json`,{schemaVersion:'newsstand-service-predecessor-v1',deploymentId,predecessorEnvelopeSha256:carriedPrior.issue.envelopeSha256,...frozen,
  manifest:put(`${ev}/manifest.json`,{schema:'laidies-release-artifact-manifest/v1',identitySha256:identity,files}),
  verification:put(`${ev}/verification.json`,{schemaVersion:'newsstand-service-predecessor-verification-v1',deploymentId,providerHeadId:deploymentId,artifactIdentitySha256:identity,checkedAt:date+'T20:00:00Z',limitation:'SYNTHETIC ONLY',observations:['https://laidies.ai','https://12345678.laidies-sunnyvaile.pages.dev'].flatMap(origin=>Object.entries(publicPaths).map(([k,p])=>({url:origin+'/'+p,status:200,sha256:frozen[k].sha256})))})});
const carryPackage={...candidate,publicationBase:put(`${prefix}/carry-base.js`,carryBaseRaw)};
const carryCandidateBinding=put(`${prefix}/carry-candidate.json`,carryPackage);
put('content/newsstand-stories.js',carryBaseRaw);put('content/daily-edition-columns.json',carryColumns);
const combined=composeDailyEnvelope({root,date,radarPath:path.join(root,radarPath),radarRaw,storiesRaw:carryBaseRaw,columnsRaw:JSON.stringify(carryColumns),candidateBinding:carryCandidateBinding,servicePredecessor:proof});
const combinedDecision={...seedDecision,envelopeSha256:combined.sha256,reviewedAt:date+'T22:00:00Z'};
const combinedResult=promoteDailyIssue({root,store:carriedPrior.store,envelope:combined.envelope,envelopeRaw:combined.canonical,decision:combinedDecision,maker:'fixture-maker',now:date+'T23:00:00Z'});
verifyProjectionAdmission({root,issue:combinedResult.issue,envelopeRaw:combined.canonical,decision:combinedDecision});
const combinedRaw=projectDailySourceRaw({root,raw:carryBaseRaw,issue:combinedResult.issue,columns:carryColumns});
assert.equal(projectDailySourceRaw({root,raw:combinedRaw,issue:combinedResult.issue,columns:carryColumns}),combinedRaw);
assert.equal(combinedResult.issue.serviceRecordIds.length,7);assert.ok(combinedResult.issue.storyIds.includes(story.id));
assert.ok(combinedResult.issue.desks.filter(d=>d.state==='ready').every(d=>d.carriedFrom.originalEditionDate===oldDate));
const combinedDerived=buildDerivatives({storyRaw:combinedRaw,columns:carryColumns,issues:combinedResult.store});
assert.equal(combinedDerived.archive.items.filter(i=>i.kind==='service').length,7);
assert.ok(combinedDerived.archive.items.filter(i=>i.kind==='service').every(i=>i.editionDate===oldDate));
sandbox.window.test.set(carryColumns);
assert.equal(await sandbox.window.test.validDailyIssueStore(combinedResult.store),true,sandbox.window.__newsstandDailyIssueValidationFailure);
console.log(`ORDINARY NEWS PIPELINE PASS private_composition=1 first_issue=1 same_day_append=1 published_only_after_admission=1 overnight_real_projection=1 premature_morning_admission_rejected=1 incumbents_preserved=1 repeat_and_resume=1 base_drift_rejected=1 draft_preparation_required=1 changed_observations_rejected=1 review_mutations_rejected=${rejected} human_gate_preserved=1 real_cli=1 feed_archive_reader=1 fixture=${root} REAL_PUBLIC_WRITES=0`);
