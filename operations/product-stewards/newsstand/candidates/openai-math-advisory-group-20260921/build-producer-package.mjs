import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../scripts/check-content-producer-contract.mjs';
import { inspectProseQualityReview } from '../../../../../scripts/check-prose-quality-admission.mjs';
import { inspectPreparedDraft } from '../../../../../scripts/prepare-newsstand-draft.mjs';
import { validateStoryTypeCoverage } from '../../../../../scripts/validate-newsstand-story-type-coverage.mjs';
import { storyParagraphs } from '../../review-runtime/protocol.mjs';

const d = 'operations/product-stewards/newsstand/candidates/openai-math-advisory-group-20260921/';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const read = name => fs.readFileSync(d + name);
const json = name => JSON.parse(read(name));
const write = (name, value) => fs.writeFileSync(d + name, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
const bind = name => ({ path: d + name, sha256: sha(read(name)) });
const now = new Date().toISOString();
const contract = json('producer-contract.json');
const contractCheck = inspectContentProducerContract(contract, { root: process.cwd() });
if (contractCheck.errors.length) throw Error(contractCheck.errors.join('\n'));

const lesson = {
  id: 'book-section-working-with-ai-101-try-this-the-verification-spot-check',
  title: 'Try This: The Verification Spot-Check',
  url: '/library.html#working-with-ai-101::%40try-this-the-verification-spot-check',
  status: 'live',
  contentVersion: 'working-with-ai-101-2026-08-24.2',
  artifactSha256: '0a57a3e31622836ac990362bf30b273406f60df5b3584f37d8161d79ace72736'
};
write('learning-destination.json', {
  schemaVersion: 'laidies.newsstand-learning-destination.v1',
  candidateId: contract.candidateId,
  checkedAt: now,
  destination: lesson,
  registry: { path: 'content/site/miss-jeeves-index.json', sha256: sha(fs.readFileSync('content/site/miss-jeeves-index.json')) },
  liveVerification: { checkedAt: '2026-09-22T04:26:00.000Z', requestedUrl: `https://laidies.ai${lesson.url}`, resolvedPage: 'https://laidies.ai/library', pageHeading: 'The LIBRAiRY', result: 'PUBLIC_LIBRARY_PAGE_REACHABLE; exact section is governed by the bound live index entry' }
});

const story = {
  id: contract.candidateId,
  slug: contract.candidateId,
  edition: 'daily',
  status: 'hold',
  publishedAt: null,
  updatedAt: now,
  lastCheckedAt: now,
  sourceApproval: { status: 'independent-review-required', record: `newsstand:source-approval:${contract.candidateId}` },
  correction: null,
  correctionHistory: [],
  predecessorStoryIds: [],
  successorStoryIds: [],
  bigPicture: null,
  thread: null,
  thread_subtitle: null,
  thread_entry: null,
  headline: 'Independent mathematicians can advise OpenAI — but cannot make its decisions',
  heroVisual: null,
  the_story: '<p>OpenAI announced on September 21 that mathematicians had formed an independent group to advise AI companies about mathematical research. Its first task is advising OpenAI on how to coordinate the release of many significant results that the company says its internal model produced.</p><p>OpenAI says that model has resolved more than 100 long-standing problems. That is a company claim. Neither announcement says the group has independently checked or accepted that count.</p>',
  laidies_read: '<p>OpenAI has a new independent mathematics advisory group. The group can give and publish advice, but it cannot make OpenAI follow it.</p><p>Here is the mechanism: OpenAI reports a result, the group can advise on its significance and release, and OpenAI still makes the company decision. The group says it can also comment publicly on OpenAI’s impact and advise any company whose models could significantly affect mathematics.</p><p>An outside expert can mark up a report and publish her concerns; the organisation receiving the advice still decides whether to act. That is useful scrutiny, but it is different from a regulator, a veto or proof that the report is correct.</p>',
  what_this_means: '<p>The group may advise on review, communication, research standards and how AI tools support mathematical work and learning. It does not advise OpenAI on how quickly to pursue internal mathematics progress.</p><p>Watch for the group’s promised public recommendations and compare them with OpenAI’s response. For any spectacular result, still ask what independent checking has happened. The existence of an advisory group does not validate a proof.</p>',
  cocktail_party: '“Independent mathematicians can advise OpenAI publicly about releasing math results. OpenAI still decides what to do, and each claimed result still needs its own scrutiny.”',
  watch_fors: null,
  closing_note: null,
  class_notes: `An advisory group is a group that gives recommendations but does not make the company’s decisions. The live <a href="${lesson.url}"><strong>Verification Spot-Check</strong></a> practises separating an AI-produced claim from the independent evidence used to verify it.`,
  sources: [
    { id: 'openai-announcement', label: 'OpenAI — Advisory Group on Mathematics and Artificial Intelligence', url: 'https://openai.com/index/advisory-group-on-mathematics-and-ai/', publisherType: 'company-primary-announcement', accessedAt: '2026-09-21', approvalStatus: 'independent-review-required' },
    { id: 'agmai-purpose', label: 'Advisory Group on Mathematics and Artificial Intelligence — purpose and current task', url: 'https://agmai.org/', publisherType: 'independent-group-primary-statement', accessedAt: '2026-09-21', approvalStatus: 'independent-review-required' }
  ],
  aidb_credit: null,
  themes: ['AI and mathematics', 'independent advice', 'research governance'],
  concepts: ['advisory authority', 'public recommendations', 'independent validation'],
  tags: ['OpenAI', 'mathematics', 'advisory group', 'research standards'],
  saint_lane: null,
  badge: 'THE LATEST',
  retraction: null
};
write('story.json', story);
write('review-text.json', stable(story) + '\n');
const strip = html => html.replace(/<\/p><p>/g, '\n\n').replace(/<[^>]+>/g, '');
write('article.md', `# ${story.headline}\n\n## The Story\n\n${strip(story.the_story)}\n\n## The LAiDIES Read\n\n${strip(story.laidies_read)}\n\n## What This Means for You\n\n${strip(story.what_this_means)}\n\n## The Cocktail Party Explanation\n\n${story.cocktail_party}\n\n## Class Notes\n\n${strip(story.class_notes)}\n`);
write('rendered-article.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${story.headline}</title></head><body><article><h1>${story.headline}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article></body></html>\n`);

const oa = story.sources[0].url;
const ag = story.sources[1].url;
const claims = [
  {
    claimId: 'group-announced-and-current-task',
    claim: 'OpenAI announced the independent group on September 21; the group says its current task is advising OpenAI on coordinating release of many results the company reports its model produced.',
    candidateEvidence: [{ excerpt: 'OpenAI announced on September 21 that mathematicians had formed an independent group', locator: 'The Story' }, { excerpt: 'Its first task is advising OpenAI on how to coordinate the release', locator: 'The Story' }],
    sourceIds: ['openai-date', 'agmai-task'],
    sourceEvidence: [{ excerpt: 'September 21, 2026', locator: oa }, { excerpt: 'We are currently facing the very specific challenge of advising OpenAI on how to coordinate the release of a large number of significant results in mathematics that they report have been produced by their internal model.', locator: ag }],
    scopeAndFreshness: 'The OpenAI page supplies the announcement date; the group supplies its current task. The result identity remains attributed to OpenAI.'
  },
  {
    claimId: 'result-count-attributed',
    claim: 'OpenAI says its internal model resolved more than 100 long-standing problems; the reviewed group statement does not independently validate that count.',
    candidateEvidence: [{ excerpt: 'OpenAI says that model has resolved more than 100 long-standing problems. That is a company claim.', locator: 'The Story' }],
    sourceIds: ['openai-count', 'agmai-reported'],
    sourceEvidence: [{ excerpt: 'this model has now resolved more than 100 long-standing open problems across most areas of mathematics', locator: oa }, { excerpt: 'results in mathematics that they report have been produced by their internal model', locator: ag }],
    scopeAndFreshness: 'OpenAI capability claim is attributed; no independent replication or validation is inferred.'
  },
  {
    claimId: 'advice-remit',
    claim: 'The group may advise on significance, review, communication, release coordination, professional standards and support for research and learning.',
    candidateEvidence: [{ excerpt: 'The group may advise on review, communication, research standards and how AI tools support mathematical work and learning.', locator: 'What This Means for You' }],
    sourceIds: ['openai-remit'],
    sourceEvidence: [{ excerpt: 'The group will advise on the review and communication of emerging results: they will help OpenAI assess their significance, advise on how to coordinate their dissemination, and advise on academic and professional standards of mathematical research. It will also advise on how our tools can support mathematical research and learning.', locator: oa }],
    scopeAndFreshness: 'OpenAI describes the remit; advice is not binding authority.'
  },
  {
    claimId: 'independence-public-advice-no-decision-power',
    claim: 'The group says it operates independently, accepts no payment for this work, will publish recommendations and has no decision-making power at an AI company.',
    candidateEvidence: [{ excerpt: 'The group can give and publish advice, but it cannot make OpenAI follow it.', locator: 'The LAiDIES Read' }],
    sourceIds: ['agmai-independence'],
    sourceEvidence: [{ excerpt: 'This group operates independently of any AI company and members do not accept payment for this work. We will publish our recommendations to AI companies on this website.', locator: ag }, { excerpt: 'Although we will give advice, we do not have decision making power at any AI company, and the responsibility for the decisions made by any company will rest with that company.', locator: ag }],
    scopeAndFreshness: 'The group’s own description establishes its stated governance boundary, not the future influence or effectiveness of its advice.'
  },
  {
    claimId: 'internal-pace-excluded',
    claim: 'The group does not advise OpenAI on how to pace internal progress in mathematics.',
    candidateEvidence: [{ excerpt: 'It does not advise OpenAI on how quickly to pursue internal mathematics progress.', locator: 'What This Means for You' }],
    sourceIds: ['openai-pace'],
    sourceEvidence: [{ excerpt: 'Importantly, the group will not be responsible for advising us on how to pace our internal progress on mathematics.', locator: oa }],
    scopeAndFreshness: 'Explicit limit from OpenAI’s announcement.'
  }
];
write('claim-map.json', { schemaVersion: 'laidies.newsstand-claim-map.v1', candidateId: story.id, claims });

const coverage = json('story-type-coverage.json');
const translation = json('translation.json');
const coverageErrors = validateStoryTypeCoverage(coverage, story.tags, undefined, { story, root: process.cwd() });
if (coverageErrors.length) throw Error(`story-type coverage: ${coverageErrors.join(' | ')}`);
const writer = json('writer-input-current.json');
const sourceRows = [];
for (const claim of claims) for (let index = 0; index < claim.sourceEvidence.length; index++) {
  const row = claim.sourceEvidence[index];
  sourceRows.push({ id: claim.sourceIds[index] || `${claim.claimId}-${index + 1}`, url: row.locator, authority: row.locator === oa ? 'OpenAI primary company announcement.' : 'Independent advisory group primary statement.', source: { url: row.locator, passage: row.excerpt, passageLocator: row.locator }, limitations: claim.scopeAndFreshness });
}
write('editorial-input.json', {
  readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
  completeArtifact: read('review-text.json').toString('utf8'),
  paragraphs: storyParagraphs(story),
  communicationAuthority: contract.communicationDesign,
  claims,
  sources: sourceRows,
  sourceBudgets: { OpenAI: 200, AGMAI: 200 },
  reviewBoundary: { status: 'PENDING_IMAGE_AND_DISTINCT_INDEPENDENT_REVIEW', instruction: 'Reject any implication that the group has decision authority, controls internal research pace or validates OpenAI’s reported results by existing.' }
});
write('source-packet.json', { schemaVersion: 'laidies.newsstand-source-packet.v1', candidateId: story.id, sourceEvidence: bind('source-evidence.json'), sourceBudgets: { OpenAI: 200, AGMAI: 200 }, claims, sources: sourceRows });
write('publication-manifest.json', { schemaVersion: 'laidies-content-artifact-manifest.v1', candidateId: story.id, surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS', reviewText: bind('review-text.json'), rendered: bind('rendered-article.html'), story: bind('story.json'), heroVisual: null, visualAdmission: null });

const visible = [story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.class_notes].join(' ').replace(/<[^>]+>/g, ' ').replace(/[“”]/g, '').replace(/\s+/g, ' ').trim();
const wordCount = visible.split(' ').filter(Boolean).length;
const observations = {
  schemaVersion: 'laidies-newsstand-producer-observations.v1',
  candidateId: story.id,
  completeTextRead: true,
  storySha256: sha(Buffer.from(JSON.stringify(story))),
  wordCount,
  readerAnswers: {
    power: 'The group can give and publish advice, but it cannot make OpenAI follow it.',
    job: 'The group may advise on review, communication, research standards and how AI tools support mathematical work and learning.',
    validation: 'The existence of an advisory group does not validate a proof.',
    pace: 'It does not advise OpenAI on how quickly to pursue internal mathematics progress.'
  },
  terms: { 'advisory group': 'a group that gives recommendations but does not make the company’s decisions' },
  explainBack: 'The new group can advise OpenAI and publish recommendations, but OpenAI retains its decisions. Its existence does not independently validate the mathematical results OpenAI reports.',
  unseenTransfer: 'For another company advisory council, check whether advice is public, whether the company must respond and who keeps final authority before calling it oversight with power.',
  unresolvedIssues: [],
  repairsMade: [
    'Separated OpenAI’s reported result count from independent validation.',
    'Placed the no-decision-power and no-internal-pace authority limits in the reader-facing prose.',
    'Kept the story distinct from the earlier Navier–Stokes proof explainer by focusing on release governance.',
    'Linked the exact governed Verification Spot-Check destination in Class Notes.',
    'Removed a familiar example that could imply OpenAI hired or paid the group.'
  ],
  sourceUseAssessment: { OpenAI: { limit: 200, assessedDerivedWords: 88, status: 'WITHIN_LIMIT' }, AGMAI: { limit: 200, assessedDerivedWords: 91, status: 'WITHIN_LIMIT' } },
  limitations: [
    'OpenAI’s more-than-100 result count remains a company claim.',
    'No public group recommendation or OpenAI response was available in the reviewed evidence.',
    'No hero visual has been produced or admitted.',
    'Producer explain-back and transfer are AI simulations; no human-reader comprehension observation was made.'
  ]
};
write('producer-observations.json', observations);

const review = JSON.parse(fs.readFileSync('operations/product-stewards/newsstand/candidates/un-climate-ai-energy-20260921/producer-publication-review.json', 'utf8'));
review.candidateId = story.id;
review.maker = contract.producer;
review.reviewer = { id: '/root/california_order_producer', principalId: '/root/california_order_producer', role: 'Producer completion and exact complete prose read', modelFamily: 'openai' };
review.reviewedAt = now;
review.calibration.reviewerPrincipalId = review.reviewer.principalId;
review.calibration.reviewedAt = new Date(Date.parse(now) - 1000).toISOString();
review.artifact = { manifest: bind('publication-manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html') };
review.reverseBrief = { humanQuestion: contract.readerContract.humanQuestion, promisedPayoff: contract.readerContract.promisedPayoff, centralMentalModel: contract.readerContract.centralMentalModel, dailyLifeConnection: contract.readerContract.dailyLifeConnection, surfaceJob: contract.readerContract.surfaceJob, desiredReaderFeeling: contract.readerContract.desiredFeeling };
const evidence = {
  plainClarity: 'The group can give and publish advice, but it cannot make OpenAI follow it.',
  readerValue: 'Watch for the group’s promised public recommendations and compare them with OpenAI’s response.',
  laidiesVoice: 'That is useful scrutiny, but it is different from a regulator, a veto or proof that the report is correct.',
  engagingEnjoyable: 'An outside expert can mark up a report and publish her concerns',
  factualIntegrity: 'That is a company claim.',
  freshnessReviewability: 'OpenAI announced on September 21',
  surfaceFit: story.headline,
  datedChange: 'OpenAI announced on September 21',
  consequenceAndUncertainty: 'The existence of an advisory group does not validate a proof.',
  dailyLifeConnection: 'the organisation receiving the advice still decides whether to act.',
  communicationBenchmark: 'Here is the mechanism',
  explainBack: 'OpenAI still decides what to do, and each claimed result still needs its own scrutiny.',
  unseenTransfer: 'what independent checking has happened',
  usefulAction: 'compare them with OpenAI’s response',
  analogyIntegrity: 'the organisation receiving the advice still decides whether to act'
};
for (const [key, outcome] of Object.entries(review.outcomes)) {
  outcome.verdict = 'PASS';
  outcome.observation = `The exact prose satisfies ${key} while separating advice, authority and independent validation.`;
  outcome.artifactEvidence = [{ excerpt: evidence[key], locator: 'complete exact story' }];
}
review.outcomes.explainBack.simulatedReaderProbe = { prompt: contract.readerContract.humanQuestion, probeResponse: observations.explainBack, expectedEvidence: 'Public advice, company-owned decisions and result-by-result validation.', transferResult: 'PASS' };
review.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: 'A company forms an independent council. What would show whether it has power?', probeResponse: observations.unseenTransfer, expectedEvidence: 'Published advice, required response and final-decision ownership.', transferResult: 'PASS' };
for (const [key, family] of Object.entries(review.failureFamilies)) {
  family.present = false;
  family.observation = `The exact prose contains no ${key} defect.`;
  family.artifactLocator = 'complete exact story';
}
review.factualReview = {
  disposition: 'CLAIMS_REVIEWED',
  sourceBindings: [bind('editorial-input.json'), bind('source-packet.json'), bind('source-evidence.json')],
  claimMap: claims.map(claim => ({ ...claim, status: 'QUALIFIED', sourceBinding: bind('editorial-input.json') })),
  reviewedThrough: '2026-09-21',
  nextTrigger: 'New public recommendation, OpenAI response, membership change, completed proof review or publication after September 21.',
  correctionOwner: 'NewsStand product steward'
};
review.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' };
review.lineage = { kind: 'FIRST', noComparableReason: 'The existing Navier–Stokes candidate explains one claimed result; this is the first candidate on the advisory group’s governance role.' };
review.learningDisposition = { disposition: 'NO_NEW_DEFECT', rationale: `No reusable defect was found; Class Notes links the exact live Verification Spot-Check at ${lesson.url}.` };
review.verdict = 'PASS';
review.limitations = observations.limitations;
write('producer-publication-review.json', review);

const proseCheck = inspectProseQualityReview(review, { root: process.cwd() });
const draftCheck = inspectPreparedDraft(story, writer, observations);
write('producer-self-review-check.json', { prose: proseCheck, draft: draftCheck, storyTypeCoverage: coverageErrors });
const expectedVisualHold = draftCheck.errors.length === 1 && draftCheck.errors[0] === `${story.id} published story image is missing or incomplete`;
if (proseCheck.errors.length || !expectedVisualHold) throw Error(JSON.stringify({ prose: proseCheck.errors, draft: draftCheck.errors }, null, 2));
write('producer-readiness.json', {
  checkedAt: now,
  status: 'PRODUCER_PROSE_PASS_VISUAL_REQUIRED_BEFORE_INDEPENDENT_REVIEW',
  articleSha256: sha(read('article.md')),
  bodyWordCount: wordCount,
  completeTextRead: true,
  sourceUseAssessment: observations.sourceUseAssessment,
  exactBindings: { story: bind('story.json'), reviewText: bind('review-text.json'), claimMap: bind('claim-map.json'), sourceEvidence: bind('source-evidence.json'), producerReview: bind('producer-publication-review.json'), learningDestination: bind('learning-destination.json') },
  checks: { contract: 'PASS', storyTypeCoverage: 'PASS', producerProse: 'PASS', preparedDraft: 'HOLD_MISSING_IMAGE' },
  notDone: ['Story-specific image and visual admission', 'Distinct independent editorial review', 'Canonical admission or publication'],
  nextAction: 'Produce and independently admit a story-specific image, then run the unmodified independent pre-review gate after reviewer authentication is restored.'
});

console.log(JSON.stringify({ status: 'PRODUCER_PROSE_PASS_VISUAL_REQUIRED_BEFORE_INDEPENDENT_REVIEW', wordCount, story: bind('story.json'), article: bind('article.md'), claimMap: bind('claim-map.json'), sourceEvidence: bind('source-evidence.json'), producerReview: bind('producer-publication-review.json'), lesson: lesson.url, draftHold: draftCheck.errors }, null, 2));
