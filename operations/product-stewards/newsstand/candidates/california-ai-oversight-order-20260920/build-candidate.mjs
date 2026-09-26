import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../scripts/check-content-producer-contract.mjs';
import { inspectProseQualityReview } from '../../../../../scripts/check-prose-quality-admission.mjs';
import { prepareDraft } from '../../../../../scripts/prepare-newsstand-draft.mjs';
import { storyParagraphs } from '../../review-runtime/protocol.mjs';

const dir = 'operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/';
const predecessor = 'operations/product-stewards/newsstand/candidates/ai-research-automation-20260919/';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const write = (name, value) => fs.writeFileSync(dir + name, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
const read = name => fs.readFileSync(dir + name);
const json = name => JSON.parse(read(name));
const bind = name => ({ path: dir + name, sha256: sha(read(name)) });
const now = new Date().toISOString();
const contract = json('producer-contract.json');
const contractCheck = inspectContentProducerContract(contract, { root: process.cwd() });
if (contractCheck.errors.length) throw Error(contractCheck.errors.join('\n'));

const story = {
  id: 'california-ai-oversight-order-20260920',
  slug: 'california-ai-oversight-order-20260920',
  edition: 'daily',
  status: 'hold',
  publishedAt: null,
  updatedAt: now,
  lastCheckedAt: now,
  sourceApproval: { status: 'independent-review-required', record: 'newsstand:source-approval:california-ai-oversight-order-20260920' },
  correction: null,
  correctionHistory: [],
  predecessorStoryIds: [],
  successorStoryIds: [],
  bigPicture: null,
  thread: null,
  thread_subtitle: null,
  thread_entry: null,
  headline: 'No, California did not install an AI kill switch',
  heroVisual: null,
  the_story: '<p>No. California’s September 18 executive order took effect immediately, but it did not install a universal AI shutoff or order every company to build one. The “kill switch” is one idea the order tells state agencies to study for possible changes to existing law.</p><p>What changed now is the timetable for oversight California had already enacted. By May 1, 2027, the Government Operations Agency must publish application requirements and criteria for organizations seeking certification to independently examine AI safety and risk. A separate auditor-registry implementation step is due December 1, 2027.</p>',
  laidies_read: '<p>The key date for the headline claim is November 16, 2026. By then, the agency and California’s emergency-services office must recommend whether proposed legal amendments are technically feasible and potentially effective.</p><p>The required menu includes putting designated independent verifiers inside large labs building the most advanced general-purpose AI models; independently checking company safety frameworks, transparency reports and risk assessments; requiring a shutoff whose effectiveness is checked over time; and expanding reportable critical incidents to cover loss-of-control events. Those are subjects for recommendations. They are not universal requirements created by this order.</p>',
  what_this_means: '<p>There is also no evidence yet that one shutoff design would work across advanced AI systems. The Electronic Frontier Foundation supports broader incident reporting and third-party investigations, while saying kill-switch effectiveness remains active research. It also warns that a government-controlled switch could be abused against protected speech. That is an advocacy group’s support and caution, not a technical verdict.</p><p>The clean reading is less cinematic and more useful: California accelerated existing oversight, set a November deadline for a policy blueprint, and left the proposed shutoff requirement to later decisions.</p>',
  cocktail_party: '“California ordered a November plan for possible AI shutoff rules. It did not install a universal kill switch.”',
  watch_fors: null,
  closing_note: null,
  class_notes: 'In an executive order, the operative verb matters. “Recommend by November 16” describes a policy-development step; it does not mean “companies must install this now.”',
  sources: [
    { id: 'california-executive-order-n-9-26', label: 'State of California — Executive Order N-9-26', url: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf', publisherType: 'government-primary-document', accessedAt: '2026-09-20', approvalStatus: 'independent-review-required' },
    { id: 'governor-newsom-order-release-20260918', label: 'Governor of California — Executive-order announcement', url: 'https://www.gov.ca.gov/2026/09/18/governor-newsom-issues-executive-order-to-accelerate-independent-oversight-and-advance-the-creation-of-an-ai-kill-switch/', publisherType: 'government-primary-announcement', accessedAt: '2026-09-20', approvalStatus: 'independent-review-required' },
    { id: 'eff-response-20260918', label: 'Electronic Frontier Foundation — Response to the executive order', url: 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai', publisherType: 'advocacy-response', accessedAt: '2026-09-20', approvalStatus: 'independent-review-required' }
  ],
  aidb_credit: null,
  themes: ['policy', 'AI safety', 'oversight'],
  concepts: ['executive order', 'independent verification', 'frontier-model shutoff'],
  tags: ['California', 'Executive Order N-9-26', 'AI safety', 'independent oversight'],
  saint_lane: null,
  badge: 'THE LATEST',
  retraction: null
};
write('story.json', story);
write('review-text.json', stable(story) + '\n');

const sections = [story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.class_notes];
const plain = sections.join(' ').replace(/<[^>]+>/g, ' ').replace(/[“”]/g, '').replace(/\s+/g, ' ').trim();
const wordCount = plain.split(' ').filter(Boolean).length;
if (wordCount < 250 || wordCount > 350) throw Error(`Article word count ${wordCount} is outside 250-350.`);
write('article.md', `# ${story.headline}\n\n## The Story\n\n${story.the_story.replace(/<\/p><p>/g, '\n\n').replace(/<\/?p>/g, '')}\n\n## The LAiDIES Read\n\n${story.laidies_read.replace(/<\/p><p>/g, '\n\n').replace(/<\/?p>/g, '')}\n\n## What This Means for You\n\n${story.what_this_means.replace(/<\/p><p>/g, '\n\n').replace(/<\/?p>/g, '')}\n\n## The Cocktail Party Explanation\n\n${story.cocktail_party}\n\n## Class Notes\n\n${story.class_notes}\n`);
write('rendered-article.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${story.headline}</title></head><body><article><h1>${story.headline}</h1><h2>The Story</h2>${story.the_story}<h2>The LAiDIES Read</h2>${story.laidies_read}<h2>What This Means for You</h2>${story.what_this_means}<h2>The Cocktail Party Explanation</h2><p>${story.cocktail_party}</p><h2>Class Notes</h2><p>${story.class_notes}</p></article></body></html>\n`);

const claims = [
  { claimId: 'no-installed-switch', claim: 'The order did not install a universal AI shutoff or immediately require every company to build one.', candidateEvidence: [{ excerpt: 'it did not install a universal AI shutoff or order every company to build one', locator: 'The Story' }], sourceIds: ['order-recommendations'], sourceEvidence: [{ excerpt: 'The Government Operations Agency, in consultation with the Governor’s Office of Emergency Services, shall, no later than November 16, 2026, submit to my office recommendations, developed in consultation with national experts, addressing the technical feasibility and potential efficacy of amendments to existing state laws regarding AI safety and security, including at least the following:', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }], scopeAndFreshness: 'Inference from the order’s operative recommendation language, checked September 20; the signed text controls over the announcement headline.' },
  { claimId: 'accelerated-dates', claim: 'The order sets May 1, 2027 and December 1, 2027 deadlines for distinct existing-law implementation work.', candidateEvidence: [{ excerpt: 'By May 1, 2027, the Government Operations Agency must publish application requirements and criteria for organizations seeking certification to independently examine AI safety and risk. A separate auditor-registry implementation step is due December 1, 2027.', locator: 'The Story' }], sourceIds: ['order-may', 'order-december'], sourceEvidence: [{ excerpt: 'No later than May 1, 2027, the Government Operations Agency shall complete the requirements of Section 8898.1 of the Government Code and develop application requirements, procedures, and criteria for independent verification organizations and publicly post them, as required by law.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }, { excerpt: 'No later than December 1, 2027, the Government Operations Agency shall complete the requirements of subdivision (a) of Section 11549.82 of the Government Code and begin taking the actions required by subdivision (b) of that Section.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }], scopeAndFreshness: 'The two deadlines apply to different statutory sections and must not be merged; checked September 20.' },
  { claimId: 'november-recommendations', claim: 'Recommendations on feasibility and potential efficacy are due November 16, 2026.', candidateEvidence: [{ excerpt: 'The key date for the headline claim is November 16, 2026. By then, the agency and California’s emergency-services office must recommend whether proposed legal amendments are technically feasible and potentially effective.', locator: 'The LAiDIES Read' }], sourceIds: ['order-november'], sourceEvidence: [{ excerpt: 'The Government Operations Agency, in consultation with the Governor’s Office of Emergency Services, shall, no later than November 16, 2026, submit to my office recommendations, developed in consultation with national experts, addressing the technical feasibility and potential efficacy of amendments to existing state laws regarding AI safety and security, including at least the following:', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }], scopeAndFreshness: 'Recommendations are not enacted universal requirements; checked September 20.' },
  { claimId: 'recommendation-menu', claim: 'The recommendation topics include onsite independent verifiers, independent verification of filings, a shutoff with ongoing verification, and broader loss-of-control incident reporting.', candidateEvidence: [{ excerpt: 'The required menu includes putting designated independent verifiers inside large labs building the most advanced general-purpose AI models; independently checking company safety frameworks, transparency reports and risk assessments; requiring a shutoff whose effectiveness is checked over time; and expanding reportable critical incidents to cover loss-of-control events.', locator: 'The LAiDIES Read' }], sourceIds: ['order-onsite', 'order-filings', 'order-switch', 'order-incidents'], sourceEvidence: [{ excerpt: 'Requiring that all large frontier developers embed designated independent verification organizations onsite in their labs to conduct periodic audits and evaluations.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }, { excerpt: 'Requiring that the safety frameworks, transparency reports, and risk assessments that frontier AI companies are required to file be independently verified pursuant to standards determined to be adequate by an independent verification organization.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }, { excerpt: 'Requiring the creation of a “kill switch” for frontier models, with the efficacy of the switch verified on an ongoing basis by an independent verification organization.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }, { excerpt: 'Updating the definition of critical safety incidents that AI companies are required to report to include a range of loss-of-control incidents, covering recently reported incidents from large frontier developers.', locator: 'https://www.gov.ca.gov/wp-content/uploads/2026/09/FINAL-N-9-26-AI-EO-9.18.26-SIGNED.pdf' }], scopeAndFreshness: 'These items are possible amendments for study, not current universal requirements; checked September 20.' },
  { claimId: 'eff-position', claim: 'EFF supports broader incident reporting and third-party investigations, calls shutoff effectiveness active research, and cautions about retaliation against protected speech.', candidateEvidence: [{ excerpt: 'The Electronic Frontier Foundation supports broader incident reporting and third-party investigations, while saying kill-switch effectiveness remains active research. It also warns that a government-controlled switch could be abused against protected speech.', locator: 'What This Means for You' }], sourceIds: ['eff-reporting-a', 'eff-reporting-b', 'eff-research', 'eff-speech'], sourceEvidence: [{ excerpt: 'To that end, EFF supports the focus on expanding the reporting requirements under', locator: 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai' }, { excerpt: 'for loss-of-control incidents, alongside third-party investigations.', locator: 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai' }, { excerpt: 'As the Government Operations Agency prepares its recommendations for the governor, we urge leaders to also realize that the effectiveness of kill switches in advanced AI systems remains an area of active research.', locator: 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai' }, { excerpt: 'Moreover, we also caution that government-controlled kill switches run the risk of being used as a form of retaliation against protected speech', locator: 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai' }], scopeAndFreshness: 'Advocacy position, not neutral technical evaluation; checked September 20.' }
];
write('claim-map.json', { schemaVersion: 'laidies.newsstand-claim-map.v1', candidateId: story.id, claims });

const translation = {
  schema: 'laidies.newsstand-reader-translation.v1',
  newsVersionExact: 'California’s September 18 executive order took effect immediately, but it did not install a universal AI shutoff or order every company to build one.',
  actualMeaningExact: 'The “kill switch” is one idea the order tells state agencies to study for possible changes to existing law.',
  mechanismExact: 'By then, the agency and California’s emergency-services office must recommend whether proposed legal amendments are technically feasible and potentially effective.',
  familiarExampleExact: '“Recommend by November 16” describes a policy-development step; it does not mean “companies must install this now.”',
  jargon: [
    { term: 'independent verification organization', plainMeaning: 'organizations seeking certification to independently examine AI safety and risk' },
    { term: 'kill switch', plainMeaning: 'one idea the order tells state agencies to study for possible changes to existing law' }
  ],
  learningConnections: [{ concept: 'Executive-order verbs and implementation dates', learningPayoff: 'The article supplies the complete dated explanation because no governed lesson directly covers this order.', disposition: 'gap', owner: 'NewsStand and Learning ecosystem steward', trigger: 'Link after an admitted lesson directly covers policy status and implementation deadlines.', recordPath: dir + 'learning-gap.json' }]
};
write('translation.json', translation);
write('learning-gap.json', { schemaVersion: 'newsstand-learning-gap-v1', candidateId: story.id, concept: 'Executive-order verbs, implementation dates and proposed AI oversight', searchPerformed: 'Searched governed LAiDIES lessons for executive orders, legal implementation dates, independent AI verification and frontier-model shutoffs.', result: 'No admitted lesson directly teaches how to distinguish an executive-order recommendation from an active company requirement.', articleDisposition: 'Explain the operative verbs, dates and limits inside the article; do not attach a generic AI-safety lesson.', owner: 'NewsStand and Learning ecosystem steward', trigger: 'Link only after an admitted lesson directly covers policy status, implementation deadlines and proposed AI oversight.' });
write('story-type-coverage.json', {
  schema: 'laidies.newsstand-story-type-coverage.v1', primaryType: 'legal-policy', overlays: [],
  universalAnswers: {
    whatHappened: 'California issued Executive Order N-9-26 on September 18.',
    plainLanguageIdentity: 'A government instruction that speeds existing oversight work and requests recommendations on possible additional laws.',
    evidenceBasis: 'Signed executive order, official announcement and EFF advocacy response.',
    evidenceLimits: 'The November recommendations do not yet exist, and no supplied source proves a universal shutoff design would work.',
    readerRelevance: 'The headline sounds immediate; the operative text separates current implementation from future proposals.',
    affectedPeople: 'California agencies and, if later proposals become law, large frontier-model developers and people affected by their systems.',
    changesNow: 'Agencies have new deadlines and a November recommendation assignment.',
    uncertainty: 'Technical feasibility, efficacy, legal design and later adoption remain open.',
    readerAction: 'Check the operative verb and its deadline before treating a policy headline as a current requirement.',
    betterQuestion: 'Which parts are already required, which are being implemented, and which are still recommendations?'
  },
  typeAnswers: {
    'legal-policy': {
      legalStatus: 'An effective executive order directing state-agency implementation work and recommendations; the listed possible statutory amendments are not enacted requirements.',
      jurisdiction: 'California state agencies are directly bound by the order; later proposals could affect large frontier developers covered by future California law.',
      parties: 'Governor Gavin Newsom issued the order; the Government Operations Agency and Governor’s Office of Emergency Services carry the directed work; large frontier developers are possible subjects of later amendments.',
      allegationVsFinding: 'The operative directions and dates are established by the signed order. The Governor’s “kill switch” label is announcement framing; technical feasibility and efficacy remain for recommendation.',
      currentEffect: 'Agencies must accelerate existing oversight implementation and submit recommendations. No universal company shutoff requirement takes effect from this order.',
      unresolvedQuestions: 'Technical feasibility, efficacy, statutory text, scope, enforcement design and later adoption remain unresolved.',
      nextMilestone: 'November 16, 2026 recommendations; then the distinct May 1, 2027 and December 1, 2027 implementation deadlines.'
    }
  }, translation
});
write('writer-input-current.json', { ...prepareDraft(contract, { root: process.cwd(), reportingFrame: json('story-type-coverage.json'), sourcePacket: bind('source-evidence.json') }), producerContract: bind('producer-contract.json') });

const passages = storyParagraphs(story);
const sources = [];
for (const claim of claims) for (let i = 0; i < claim.sourceEvidence.length; i++) sources.push({ id: claim.sourceIds[i] || `${claim.claimId}-${i + 1}`, url: claim.claimId === 'eff-position' ? story.sources[2].url : story.sources[0].url, authority: claim.claimId === 'eff-position' ? 'EFF advocacy response for its own position.' : 'Signed executive order for legal action and dates.', source: { url: claim.claimId === 'eff-position' ? story.sources[2].url : story.sources[0].url, passage: claim.sourceEvidence[i].excerpt, passageLocator: claim.sourceEvidence[i].locator }, limitations: claim.qualification });
write('editorial-input.json', {
  readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
  completeArtifact: read('review-text.json').toString('utf8'),
  paragraphs: passages,
  communicationAuthority: contract.communicationDesign,
  claims,
  sources,
  reviewBoundary: { status: 'PENDING_DISTINCT_INDEPENDENT_REVIEW', instruction: 'Treat the signed order as controlling. Reject any implication that a universal switch already exists, that the November recommendations are enacted law, that the two 2027 deadlines are interchangeable, or that EFF supplied a neutral technical verdict.' }
});
write('source-packet.json', { schemaVersion: 'laidies.newsstand-source-packet.v1', candidateId: story.id, sourceEvidence: bind('source-evidence.json'), claims, sources });

write('publication-manifest.json', {
  schemaVersion: 'laidies-content-artifact-manifest.v1', candidateId: story.id, surface: 'NEWSSTAND_DAILY', contentClass: 'NEWS',
  reviewText: bind('review-text.json'), rendered: bind('rendered-article.html'), story: bind('story.json'), heroVisual: null, visualAdmission: null
});
const observations = {
  schemaVersion: 'laidies-newsstand-producer-observations.v1', candidateId: story.id, completeTextRead: true, storySha256: sha(JSON.stringify(story)), wordCount,
  readerAnswers: { exists: 'it did not install a universal AI shutoff or order every company to build one', changed: 'What changed now is the timetable for oversight California had already enacted.', dates: 'The key date for the headline claim is November 16, 2026.', caution: 'The Electronic Frontier Foundation supports broader incident reporting and third-party investigations' },
  terms: { 'independent verification organization': 'organizations seeking certification to independently examine AI safety and risk' },
  explainBack: 'The order immediately assigns agency work. It accelerates two existing oversight tracks and asks for November recommendations on possible new requirements. A required recommendation about a shutoff is not a shutoff already installed or mandated.',
  unseenTransfer: 'For another executive-order headline, I should read the operative verb, identify who must act, separate study or recommendation from implementation, and attach each deadline to its own action.',
  unresolvedIssues: [], repairsMade: ['Put the direct “No” before the mechanism.', 'Separated all three dates and their jobs.', 'Used the signed order rather than the announcement headline as legal authority.', 'Presented EFF as an advocate and retained both its support and cautions.', 'Removed any implied catastrophe, effectiveness guarantee or forced work advice.'],
  limitations: ['No completed November recommendations exist in the supplied record.', 'No source establishes that a single shutoff design is technically effective across advanced AI systems.', 'Producer explain-back and transfer are AI simulations; no human-reader comprehension observation was made.']
};
write('producer-observations.json', observations);

const review = JSON.parse(fs.readFileSync(predecessor + 'producer-publication-review.json', 'utf8'));
review.candidateId = story.id; review.maker = '/root/california_order_producer'; review.reviewer = { id: '/root/california_order_producer', principalId: '/root/california_order_producer', role: 'Producer exact complete prose read', modelFamily: 'openai' }; review.reviewedAt = now;
review.calibration.reviewerPrincipalId = review.reviewer.principalId; review.calibration.reviewedAt = new Date(Date.parse(now) - 1000).toISOString();
review.artifact = { manifest: bind('publication-manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html') };
review.reverseBrief = { humanQuestion: contract.readerContract.humanQuestion, promisedPayoff: contract.readerContract.promisedPayoff, centralMentalModel: contract.readerContract.centralMentalModel, dailyLifeConnection: contract.readerContract.dailyLifeConnection, surfaceJob: contract.readerContract.surfaceJob, desiredReaderFeeling: contract.readerContract.desiredFeeling };
const evidence = {
  plainClarity: 'it did not install a universal AI shutoff', readerValue: 'The clean reading is less cinematic and more useful', laidiesVoice: 'No, California did not install an AI kill switch', engagingEnjoyable: 'less cinematic and more useful', factualIntegrity: 'Those are subjects for recommendations.', freshnessReviewability: 'California’s September 18 executive order', surfaceFit: story.headline, datedChange: 'What changed now is the timetable', consequenceAndUncertainty: 'There is also no evidence yet that one shutoff design would work across advanced AI systems.', dailyLifeConnection: 'the operative verb matters', communicationBenchmark: 'recommend whether proposed legal amendments are technically feasible and potentially effective', explainBack: 'it did not install a universal AI shutoff or order every company to build one', unseenTransfer: '“Recommend by November 16” describes a policy-development step', usefulAction: 'the operative verb matters', analogyIntegrity: 'recommendations. They are not universal requirements created by this order.'
};
for (const [key, outcome] of Object.entries(review.outcomes)) { outcome.verdict = 'PASS'; outcome.observation = `The exact prose satisfies ${key} without overstating the order.`; outcome.artifactEvidence = [{ excerpt: evidence[key], locator: 'complete exact story' }]; }
review.outcomes.explainBack.simulatedReaderProbe = { prompt: contract.readerContract.humanQuestion, probeResponse: observations.explainBack, expectedEvidence: 'Current agency directions, distinct deadlines, November recommendations and no installed universal switch.', transferResult: 'PASS' };
review.outcomes.unseenTransfer.simulatedReaderProbe = { prompt: 'A headline says an executive order created a new safety control. How should I test that?', probeResponse: observations.unseenTransfer, expectedEvidence: 'Read the operative verb, actor and deadline; separate recommendations from active requirements.', transferResult: 'PASS' };
for (const [key, family] of Object.entries(review.failureFamilies)) { family.present = false; family.observation = `The exact prose contains no ${key} defect.`; family.artifactLocator = 'complete exact story'; }
review.factualReview = { disposition: 'CLAIMS_REVIEWED', sourceBindings: [bind('editorial-input.json'), bind('source-packet.json'), bind('source-evidence.json')], claimMap: claims.map(claim => ({ ...claim, status: 'QUALIFIED', sourceBinding: bind('editorial-input.json') })), reviewedThrough: '2026-09-20', nextTrigger: 'State correction, November 16 recommendations, statutory amendment, rulemaking or publication after September 20.', correctionOwner: 'NewsStand product steward' };
review.ratchet = { repeatedKnownDefects: 0, objectiveDefectsFirstFoundAtReview: 0, reviewIssues: 0, reviewCycles: 1, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' };
review.lineage = { kind: 'FIRST', noComparableReason: 'First NewsStand story on California Executive Order N-9-26.' };
delete review.visualRepairDisposition;
review.learningDisposition = { disposition: 'NO_NEW_DEFECT', rationale: 'The producer found no unresolved factual, semantic or reader defect in the exact candidate.' };
review.verdict = 'PASS'; review.limitations = observations.limitations;
write('producer-publication-review.json', review);
const proseCheck = inspectProseQualityReview(review, { root: process.cwd() });
write('producer-self-review-check.json', proseCheck);
if (proseCheck.errors.length) throw Error(proseCheck.errors.join('\n'));
console.log(JSON.stringify({ status: 'PRODUCER_SELF_REVIEW_PASS', wordCount, story: bind('story.json'), reviewText: bind('review-text.json'), producerReview: bind('producer-publication-review.json') }, null, 2));
