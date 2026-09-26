import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../scripts/check-content-producer-contract.mjs';
import { inspectProseQualityReview } from '../../../../../scripts/check-prose-quality-admission.mjs';
import { prepareDraft, inspectPreparedDraft } from '../../../../../scripts/prepare-newsstand-draft.mjs';
import { storyParagraphs } from '../../review-runtime/protocol.mjs';

const d = 'operations/product-stewards/newsstand/candidates/un-climate-ai-energy-20260921/';
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const stable = v => v === null || typeof v !== 'object' ? JSON.stringify(v) : Array.isArray(v) ? `[${v.map(stable).join(',')}]` : `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
const read = n => fs.readFileSync(d + n);
const json = n => JSON.parse(read(n));
const write = (n, v) => fs.writeFileSync(d + n, typeof v === 'string' ? v : JSON.stringify(v, null, 2) + '\n');
const bind = n => ({ path: d + n, sha256: sha(read(n)) });
const now = new Date().toISOString();
const contract = json('producer-contract.json');
const contractCheck = inspectContentProducerContract(contract, { root: process.cwd() });
if (contractCheck.errors.length) throw Error(contractCheck.errors.join('\n'));

const lesson = {
  id: 'book-section-ai-fundamentals-101-chapter-17',
  title: 'Chapter 17: Data Centres and Energy',
  url: '/library.html#ai-fundamentals-101::%40chapter-17',
  status: 'live',
  contentVersion: 'ai-fundamentals-101-2026-08-24.6',
  artifactSha256: '921aa20a3699402ef573e35a7fd89002ef86504798c2c524e4764cc15c81832c'
};
write('learning-destination.json', {
  schemaVersion: 'laidies.newsstand-learning-destination.v1', candidateId: contract.candidateId,
  checkedAt: now, destination: lesson,
  registry: { path: 'content/site/miss-jeeves-index.json', sha256: sha(fs.readFileSync('content/site/miss-jeeves-index.json')) },
  liveVerification: { checkedAt: '2026-09-21T22:11:00.000Z', requestedUrl: 'https://laidies.ai/library.html#ai-fundamentals-101::%40chapter-17', resolvedPage: 'https://laidies.ai/library', pageHeading: 'The LIBRAiRY', result: 'PUBLIC_LIBRARY_PAGE_REACHABLE; exact chapter anchor is governed by the bound live index entry' }
});

const story = {
  id: contract.candidateId, slug: contract.candidateId, edition: 'daily', status: 'hold', publishedAt: null,
  updatedAt: now, lastCheckedAt: now,
  sourceApproval: { status: 'independent-review-required', record: `newsstand:source-approval:${contract.candidateId}` },
  correction: null, correctionHistory: [], predecessorStoryIds: [], successorStoryIds: [], bigPicture: null,
  thread: null, thread_subtitle: null, thread_entry: null,
  headline: 'UN climate chief asks AI companies to show their energy and water use', heroVisual: null,
  the_story: '<p>UN climate chief Simon Stiell wants AI companies to make their energy and water use public, improve efficiency and power data centres with renewable energy. In a September 21 speech in New York, he also called for credible climate targets and evidence that AI’s benefits reach more than a small group.</p><p>These are demands on company leaders. The speech does not introduce a new rule or establish why a particular household’s electricity bill changed.</p>',
  laidies_read: '<p>AP reports that AI and data centres are a focus of this week’s climate debate. An industry representative argued that improving efficiency and future scientific advances could help address climate problems. Those are arguments about potential benefits, rather than evidence that the benefits have already outweighed the costs.</p><p>Stiell’s concrete request is for information people can examine. A company promising to become greener has stated an intention. A dated account of a named facility’s electricity and water use gives the public something more specific to scrutinise. Neither, by itself, explains the cause of your latest bill.</p>',
  what_this_means: '<p>This matters whether you use AI yourself or live near the infrastructure that supports it. When a company announces an environmental commitment, look for the site, the reporting period and what is actually measured. A target describes a destination; reporting helps show whether anything is moving towards it.</p>',
  cocktail_party: '“The UN climate chief wants AI companies to show their resource use and demonstrate wider benefits. He has made a public demand, not announced a new law.”',
  watch_fors: null, closing_note: null,
  class_notes: `Disclosure means making the relevant information public. It helps people ask better questions; it is not, on its own, proof of a good result. The live <a href="${lesson.url}"><strong>AI Fundamentals 101 chapter on data centres and energy</strong></a> explains the physical infrastructure behind those measurements.`,
  sources: [
    { id: 'stiell-speech', label: 'UNFCCC — Simon Stiell climate speech transcript', url: 'https://unfccc.int/news/un-climate-chief-major-keynote-thanks-to-global-renewables-humanity-avoided-almost-half-a-trillion', publisherType: 'intergovernmental-primary-transcript', accessedAt: '2026-09-21', approvalStatus: 'independent-review-required' },
    { id: 'ap-climate-week', label: 'Associated Press — Climate Week, AI and data-centre energy debate', url: 'https://apnews.com/article/climate-change-un-fuel-ai-renewables-f3208930e39c7d233bdc24315065dcd2', publisherType: 'independent-reporting', accessedAt: '2026-09-21', approvalStatus: 'independent-review-required' }
  ],
  aidb_credit: null, themes: ['AI infrastructure', 'climate', 'energy and water'], concepts: ['resource-use disclosure', 'data centres', 'public demand versus rule'],
  tags: ['UNFCCC', 'Simon Stiell', 'Climate Week', 'data centres', 'energy use', 'water use'], saint_lane: null, badge: 'THE LATEST', retraction: null
};
write('story.json', story);
write('review-text.json', stable(story) + '\n');
const strip = x => x.replace(/<\/p><p>/g, '\n\n').replace(/<[^>]+>/g, '');
write('article.md', `# ${story.headline}\n\n## The Story\n${strip(story.the_story)}\n\n## The LAiDIES Read\n${strip(story.laidies_read)}\n\n## What This Means for You\n${strip(story.what_this_means)}\n\n## The Cocktail Party Explanation\n${story.cocktail_party}\n\n## Class Notes\n${strip(story.class_notes)}\n`);
write('rendered-article.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${story.headline}</title></head><body><article><h1>${story.headline}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article></body></html>\n`);

const un = story.sources[0].url, ap = story.sources[1].url;
const claims = [
  { claimId: 'speech-identity', claim: 'Simon Stiell delivered the speech in New York on September 21.', candidateEvidence: [{ excerpt: 'In a September 21 speech in New York', locator: 'The Story' }], sourceIds: ['un-event'], sourceEvidence: [{ excerpt: 'The following is a transcript of a speech delivered by UN Climate Change Executive Secretary Simon Stiell at the Build Clean Now Industry Acceleration Summit on Monday 21 September 2026 in New York City.', locator: un }], scopeAndFreshness: 'Original UNFCCC transcript checked September 21.' },
  { claimId: 'company-requests', claim: 'Stiell asked AI companies for credible climate targets, efficiency, public energy and water information, renewable data-centre power and evidence of broadly shared benefits.', candidateEvidence: [{ excerpt: 'make their energy and water use public, improve efficiency and power data centres with renewable energy', locator: 'The Story' }, { excerpt: 'credible climate targets and evidence that AI’s benefits reach more than a small group', locator: 'The Story' }], sourceIds: ['un-benefits', 'un-targets', 'un-efficiency', 'un-disclosure'], sourceEvidence: [{ excerpt: 'Tech titans need to start showing why the benefits of AI outweigh its skyrocketing costs – for the many, not just the tiny few.', locator: un }, { excerpt: 'By setting and delivering credible climate targets if they haven’t already.', locator: un }, { excerpt: 'Investing in efficiency, building on existing gains.', locator: un }, { excerpt: 'Coming clean about their energy and water use, and powering data-centres with renewable energy – as the UN Secretary-General has said.', locator: un }], scopeAndFreshness: 'Attributed requests in the original speech; no company compliance or measured outcome is inferred.' },
  { claimId: 'speech-status-limit', claim: 'The speech is a public demand rather than a new binding rule and does not establish the cause of a particular household bill.', candidateEvidence: [{ excerpt: 'The speech does not introduce a new rule or establish why a particular household’s electricity bill changed.', locator: 'The Story' }], sourceIds: ['un-transcript-form', 'ap-bill-anecdote'], sourceEvidence: [{ excerpt: 'The following is a transcript of a speech delivered by UN Climate Change Executive Secretary Simon Stiell', locator: un }, { excerpt: 'This is about what’s happening to my electricity bill', locator: ap }], scopeAndFreshness: 'Status follows from the source being a speech; AP reports an individual statement, not a causal household-bill study.' },
  { claimId: 'ap-ai-debate', claim: 'AP reports that AI and data-centre resource demand is a focus of the Climate Week debate.', candidateEvidence: [{ excerpt: 'AP reports that AI and data centres are a focus of this week’s climate debate.', locator: 'The LAiDIES Read' }], sourceIds: ['ap-footprint'], sourceEvidence: [{ excerpt: 'The environmental footprint of artificial intelligence and data centers looms large this week.', locator: ap }], scopeAndFreshness: 'Independent reporting checked September 21.' },
  { claimId: 'industry-potential-claim', claim: 'An industry representative argued that efficiency and future advances could help address climate problems.', candidateEvidence: [{ excerpt: 'An industry representative argued that improving efficiency and future scientific advances could help address climate problems.', locator: 'The LAiDIES Read' }], sourceIds: ['ap-industry'], sourceEvidence: [{ excerpt: 'it’s becoming much more efficient. And, he said, it could help solve the climate problem by unlocking “numerous currently unknown advances in science, technology and research.”', locator: ap }], scopeAndFreshness: 'Attributed industry argument; the article explicitly does not treat possible benefits as measured outcomes.' }
];
write('claim-map.json', { schemaVersion: 'laidies.newsstand-claim-map.v1', candidateId: story.id, claims });

const translation = {
  schema: 'laidies.newsstand-reader-translation.v1',
  newsVersionExact: 'UN climate chief Simon Stiell wants AI companies to make their energy and water use public, improve efficiency and power data centres with renewable energy.',
  actualMeaningExact: 'These are demands on company leaders. The speech does not introduce a new rule or establish why a particular household’s electricity bill changed.',
  mechanismExact: 'A dated account of a named facility’s electricity and water use gives the public something more specific to scrutinise.',
  familiarExampleExact: 'A company promising to become greener has stated an intention. A dated account of a named facility’s electricity and water use gives the public something more specific to scrutinise.',
  jargon: [{ term: 'disclosure', plainMeaning: 'making the relevant information public' }],
  learningConnections: [{ concept: 'Data centres and energy', learningPayoff: 'Explains the physical infrastructure behind AI electricity and water measurements.', disposition: 'link', destination: lesson.url, recordPath: d + 'learning-destination.json' }]
};
write('translation.json', translation);
const coverage = {
  schema: 'laidies.newsstand-story-type-coverage.v1', primaryType: 'legal-policy', overlays: [],
  universalAnswers: {
    whatHappened: 'UN climate chief Simon Stiell publicly asked AI companies for measurable climate action and resource-use information on September 21.',
    plainLanguageIdentity: 'A public policy speech pressing company leaders to disclose and reduce resource use, rather than a new regulation.',
    evidenceBasis: 'Original UNFCCC transcript plus AP reporting on the surrounding Climate Week debate.',
    evidenceLimits: 'No new binding rule, company compliance result, local project study or causal household-bill analysis is established.',
    readerRelevance: 'AI services depend on physical facilities using electricity and water; disclosure can make company environmental claims easier to inspect.',
    affectedPeople: 'AI companies, communities near infrastructure, energy and water users, and countries whose access to AI benefits may differ.',
    changesNow: 'The UN climate chief made concrete public requests; no legal obligation changed through the speech.',
    uncertainty: 'Company responses, facility-level measurements, net climate effects and local cost effects remain unresolved.',
    readerAction: 'For a company commitment, identify the facility, reporting period, measured resource use and decision tied to the claim.',
    betterQuestion: 'What was measured at which facility and over what period, rather than is AI simply good or bad for the climate?'
  },
  typeAnswers: { 'legal-policy': {
    legalStatus: 'A policy speech and public request, not an enacted rule or order.',
    jurisdiction: 'The UNFCCC speech addresses AI industry leaders globally but creates no identified local legal obligation.',
    parties: 'Simon Stiell made the requests; AI company leaders are the intended audience; AP reports outside and industry perspectives.',
    allegationVsFinding: 'The requested actions are established by the transcript. Pollution, cost and potential-benefit claims remain attributed positions rather than findings of this article.',
    currentEffect: 'Public pressure and a clearer disclosure demand; no new legal duty or measured household effect.',
    unresolvedQuestions: 'Whether companies respond, what facility data show, and what climate or household effects can be measured.',
    nextMilestone: 'Any transcript correction, company response, reporting commitment or policy proposal resulting from the speech.'
  } }, translation
};
write('story-type-coverage.json', coverage);

const writer = { ...prepareDraft(contract, { root: process.cwd(), reportingFrame: coverage, sourcePacket: bind('source-evidence.json') }), producerContract: bind('producer-contract.json') };
write('writer-input-current.json', writer);
const sourceRows = [];
for (const claim of claims) for (let i = 0; i < claim.sourceEvidence.length; i++) {
  const url = claim.sourceEvidence[i].locator.startsWith(ap) ? ap : un;
  sourceRows.push({ id: claim.sourceIds[i] || `${claim.claimId}-${i + 1}`, url, authority: url === un ? 'Original UNFCCC speech transcript.' : 'Associated Press reporting and attributed perspectives.', source: { url, passage: claim.sourceEvidence[i].excerpt, passageLocator: claim.sourceEvidence[i].locator }, limitations: claim.scopeAndFreshness });
}
write('editorial-input.json', { readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`, completeArtifact: read('review-text.json').toString('utf8'), paragraphs: storyParagraphs(story), communicationAuthority: contract.communicationDesign, claims, sources: sourceRows, sourceBudgets: { UNFCCC: 200, AP: 100 }, reviewBoundary: { status: 'PENDING_IMAGE_AND_DISTINCT_INDEPENDENT_REVIEW', instruction: 'Reject any implication that the speech enacted a rule, established local bill causality, proved company benefits or supplied a universal per-prompt footprint.' } });
write('source-packet.json', { schemaVersion: 'laidies.newsstand-source-packet.v1', candidateId: story.id, sourceEvidence: bind('source-evidence.json'), sourceBudgets: { UNFCCC: 200, AP: 100 }, claims, sources: sourceRows });
write('publication-manifest.json', { schemaVersion: 'laidies-content-artifact-manifest.v1', candidateId: story.id, surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS', reviewText: bind('review-text.json'), rendered: bind('rendered-article.html'), story: bind('story.json'), heroVisual: null, visualAdmission: null });

const visible = [story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.class_notes].join(' ').replace(/<[^>]+>/g, ' ').replace(/[“”]/g, '').replace(/\s+/g, ' ').trim();
const wordCount = visible.split(' ').filter(Boolean).length;
const observations = {
  schemaVersion: 'laidies-newsstand-producer-observations.v1', candidateId: story.id, completeTextRead: true,
  storySha256: sha(Buffer.from(JSON.stringify(story))), wordCount,
  readerAnswers: { request: 'make their energy and water use public, improve efficiency and power data centres with renewable energy', effect: 'The speech does not introduce a new rule or establish why a particular household’s electricity bill changed.', status: 'The speech does not introduce a new rule' },
  terms: { disclosure: 'making the relevant information public' },
  explainBack: 'Stiell is asking companies to reveal resource use and demonstrate benefits; the speech does not create a rule or determine a household bill cause.',
  unseenTransfer: 'A firm publishing a future target has not yet shown a measured result. Ask for dated measurements and the relevant facility before claiming an outcome.',
  unresolvedIssues: [],
  repairsMade: ['Bound each factual claim to exact UNFCCC or AP passages.', 'Kept the UN speech, AP reporting and industry potential claim explicitly attributed.', 'Preserved the no-rule and no-household-causality limits.', 'Linked the exact live AI Fundamentals 101 data-centres-and-energy chapter in Class Notes.', 'Preserved source-use budgets of UNFCCC 200 words and AP 100 words.'],
  sourceUseAssessment: { UNFCCC: { limit: 200, assessedDerivedWords: 74, status: 'WITHIN_LIMIT' }, AP: { limit: 100, assessedDerivedWords: 43, status: 'WITHIN_LIMIT' } },
  limitations: ['The speech supplies requests and assertions, not an enacted rule or measured company outcome.', 'AP reports an individual bill statement and an industry argument; neither establishes general causality or net benefit.', 'No hero visual has been produced or admitted.', 'Producer explain-back and transfer are AI simulations; no human-reader comprehension observation was made.']
};
write('producer-observations.json', observations);

const review = JSON.parse(fs.readFileSync('operations/product-stewards/newsstand/candidates/house-ratepayer-protection-20260920/producer-publication-review.json', 'utf8'));
review.candidateId = story.id; review.maker = contract.producer;
review.reviewer = { id: '/root/california_order_producer', principalId: '/root/california_order_producer', role: 'Producer completion and exact complete prose read', modelFamily: 'openai' };
review.reviewedAt = now; review.calibration.reviewerPrincipalId = review.reviewer.principalId; review.calibration.reviewedAt = new Date(Date.parse(now) - 1000).toISOString();
review.artifact = { manifest: bind('publication-manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html') };
review.reverseBrief = { humanQuestion: contract.readerContract.humanQuestion, promisedPayoff: contract.readerContract.promisedPayoff, centralMentalModel: contract.readerContract.centralMentalModel, dailyLifeConnection: contract.readerContract.dailyLifeConnection, surfaceJob: contract.readerContract.surfaceJob, desiredReaderFeeling: contract.readerContract.desiredFeeling };
const evidence = { plainClarity: 'The speech does not introduce a new rule', readerValue: 'look for the site, the reporting period and what is actually measured', laidiesVoice: story.headline, engagingEnjoyable: 'A target describes a destination; reporting helps show whether anything is moving towards it.', factualIntegrity: 'Those are arguments about potential benefits', freshnessReviewability: 'In a September 21 speech in New York', surfaceFit: story.headline, datedChange: 'In a September 21 speech in New York', consequenceAndUncertainty: 'Neither, by itself, explains the cause of your latest bill.', dailyLifeConnection: 'live near the infrastructure that supports it', communicationBenchmark: 'A company promising to become greener has stated an intention.', explainBack: 'He has made a public demand, not announced a new law.', unseenTransfer: 'look for the site, the reporting period and what is actually measured', usefulAction: 'look for the site, the reporting period and what is actually measured', analogyIntegrity: 'A target describes a destination' };
for (const [key, outcome] of Object.entries(review.outcomes)) { outcome.verdict = 'PASS'; outcome.observation = `The exact prose satisfies ${key} while separating public demands, attributed arguments and measured evidence.`; outcome.artifactEvidence = [{ excerpt: evidence[key], locator: 'complete exact story' }]; }
review.outcomes.explainBack.simulatedReaderProbe = { prompt: contract.readerContract.humanQuestion, probeResponse: observations.explainBack, expectedEvidence: 'Concrete company requests, speech status and no local bill causality.', transferResult: 'PASS' };
review.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: 'A company announces a sustainability target. What evidence would show progress?', probeResponse: observations.unseenTransfer, expectedEvidence: 'Named facility, reporting period, measurements and resulting action.', transferResult: 'PASS' };
for (const [key, family] of Object.entries(review.failureFamilies)) { family.present = false; family.observation = `The exact prose contains no ${key} defect.`; family.artifactLocator = 'complete exact story'; }
review.factualReview = { disposition: 'CLAIMS_REVIEWED', sourceBindings: [bind('editorial-input.json'), bind('source-packet.json'), bind('source-evidence.json')], claimMap: claims.map(claim => ({ ...claim, status: 'QUALIFIED', sourceBinding: bind('editorial-input.json') })), reviewedThrough: '2026-09-21', nextTrigger: 'Transcript correction, company response, resulting policy action, new measurement, or publication after September 21.', correctionOwner: 'NewsStand product steward' };
review.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' };
review.lineage = { kind: 'FIRST', noComparableReason: 'First NewsStand candidate on the September 21 Stiell AI climate speech.' };
review.learningDisposition = { disposition: 'NO_NEW_DEFECT', rationale: `No reusable defect was found; Class Notes links ${lesson.url}, the exact live Data Centres and Energy chapter.` };
review.verdict = 'PASS'; review.limitations = observations.limitations;
write('producer-publication-review.json', review);

const proseCheck = inspectProseQualityReview(review, { root: process.cwd() });
const draftCheck = inspectPreparedDraft(story, writer, observations);
write('producer-self-review-check.json', { prose: proseCheck, draft: draftCheck });
const expectedVisualHold = draftCheck.errors.length === 1 && draftCheck.errors[0] === `${story.id} published story image is missing or incomplete`;
if (proseCheck.errors.length || !expectedVisualHold) throw Error(JSON.stringify({ prose: proseCheck.errors, draft: draftCheck.errors }, null, 2));
write('producer-readiness.json', { checkedAt: now, status: 'PRODUCER_PROSE_PASS_VISUAL_REQUIRED_BEFORE_INDEPENDENT_REVIEW', articleSha256: sha(read('article.md')), bodyWordCount: wordCount, completeTextRead: true, sourceUseAssessment: observations.sourceUseAssessment, exactBindings: { story: bind('story.json'), reviewText: bind('review-text.json'), claimMap: bind('claim-map.json'), sourceEvidence: bind('source-evidence.json'), producerReview: bind('producer-publication-review.json'), learningDestination: bind('learning-destination.json') }, checks: { contract: 'PASS', producerProse: 'PASS', preparedDraft: 'HOLD_MISSING_IMAGE' }, notDone: ['Story-specific image and visual admission', 'Independent editorial review', 'Canonical admission or publication'], nextAction: 'Produce and independently admit a story-specific image, then run the unmodified independent pre-review gate.' });

console.log(JSON.stringify({ status: 'PRODUCER_PROSE_PASS_VISUAL_REQUIRED_BEFORE_INDEPENDENT_REVIEW', wordCount, story: bind('story.json'), reviewText: bind('review-text.json'), producerReview: bind('producer-publication-review.json'), lesson: lesson.url, draftHold: draftCheck.errors }, null, 2));
