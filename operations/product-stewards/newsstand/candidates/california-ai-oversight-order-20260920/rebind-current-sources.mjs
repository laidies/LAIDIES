import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../scripts/check-content-producer-contract.mjs';
import { inspectProseQualityReview } from '../../../../../scripts/check-prose-quality-admission.mjs';
import { prepareDraft } from '../../../../../scripts/prepare-newsstand-draft.mjs';
import { storyParagraphs } from '../../review-runtime/protocol.mjs';

const dir = 'operations/product-stewards/newsstand/candidates/california-ai-oversight-order-20260920/';
const oldUrl = 'https://www.eff.org/press/releases/eff-statement-california-governors-executive-order-ai';
const newUrl = 'https://www.eff.org/deeplinks/2026/09/eff-statement-california-governors-executive-order-ai';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const stable = value => value === null || typeof value !== 'object' ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(',')}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const read = name => fs.readFileSync(dir + name);
const json = name => JSON.parse(read(name));
const write = (name, value) => fs.writeFileSync(dir + name, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
const bind = name => ({ path: dir + name, sha256: sha(read(name)) });
const replaceDeep = value => {
  if (typeof value === 'string') return value.replaceAll(oldUrl, newUrl).replaceAll('checked September 20', 'checked September 23').replaceAll('checked September 21', 'checked September 23').replaceAll('checked September 22', 'checked September 23');
  if (Array.isArray(value)) return value.map(replaceDeep);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, replaceDeep(child)]));
  return value;
};

const now = new Date().toISOString();
const evidence = json('source-evidence.json');
evidence.capturedOn = '2026-09-24';
evidence.freshness = 'The signed order, initial Governor release, EFF response and September 23 Governor expert announcement were read from exact current captures. The new announcement names four advisers but continues to describe the shutoff as a proposal under consideration, not an installed or universal requirement.';
evidence.freshnessEvidence = bind('sources/20260924/source-refresh.json');
const captures = {
  'california-executive-order-n-9-26': bind('sources/20260924/signed-order.json'),
  'governor-newsom-order-release-20260918': bind('sources/20260924/governor-order-release.json'),
  'eff-response-20260918': bind('sources/20260924/eff-response.json')
};
for (const record of evidence.records) if (captures[record.sourceId]) record.raw = captures[record.sourceId];
evidence.records = evidence.records.filter(record => record.sourceId !== 'governor-experts-update-20260923');
evidence.records.push({
  sourceId: 'governor-experts-update-20260923',
  title: 'Governor Newsom announces world-leading experts to deliver on his AI executive order, including advancing creation of a “kill switch”',
  url: 'https://www.gov.ca.gov/2026/09/23/governor-newsom-announces-world-leading-experts-to-deliver-on-his-ai-executive-order-including-advancing-creation-of-a-kill-switch/',
  publisher: 'Governor of California',
  authority: 'Official current implementation announcement and administration framing',
  raw: bind('sources/20260924/governor-experts-update.json'),
  exactPassages: [
    { locator: 'announcement body', excerpt: 'The group of experts at the intersection of technology, policy, and governance will help California advance its AI safety and security governance in light of rapidly advancing AI capabilities.' },
    { locator: 'announcement body', excerpt: 'Proposals under consideration include requiring independent third parties to be embedded in frontier AI companies to verify safety frameworks and independently assess safety evaluations, as well as requiring companies to develop an emergency shutoff, or “kill switch,” for frontier models.' }
  ],
  limitations: ['The page names four advisers and describes current implementation activity, but its shutoff language remains a proposal under consideration.', 'The signed executive order controls the legal effect; this announcement does not establish an installed universal switch or technical effectiveness.']
});
write('source-evidence.json', evidence);

const contract = json('producer-contract.json');
contract.createdAt = now;
for (const truth of contract.canonicalTruth || []) truth.source = bind('source-evidence.json');
write('producer-contract.json', contract);
const contractCheck = inspectContentProducerContract(contract, { root: process.cwd() });
if (contractCheck.errors.length) throw Error(contractCheck.errors.join('\n'));

const beforeArticleSha256 = sha(read('article.md'));
const beforeRenderedSha256 = sha(read('rendered-article.html'));
const beforeHero = json('story.json').heroVisual;
const story = replaceDeep(json('story.json'));
story.updatedAt = now;
story.lastCheckedAt = now;
story.publishedAt = null;
story.status = 'hold';
for (const source of story.sources) source.accessedAt = '2026-09-24';
if (stable(story.heroVisual) !== stable(beforeHero)) throw Error('Hero visual changed during source rebind.');
write('story.json', story);
write('review-text.json', stable(story) + '\n');

const claimMap = replaceDeep(json('claim-map.json'));
write('claim-map.json', claimMap);
const claims = claimMap.claims;
const sources = [];
for (const claim of claims) for (let i = 0; i < claim.sourceEvidence.length; i++) {
  const eff = claim.claimId === 'eff-position';
  const url = eff ? newUrl : story.sources[0].url;
  sources.push({
    id: claim.sourceIds[i] || `${claim.claimId}-${i + 1}`,
    url,
    authority: eff ? 'EFF advocacy response for its own position.' : 'Signed executive order for legal action and dates.',
    source: { url, passage: claim.sourceEvidence[i].excerpt, passageLocator: claim.sourceEvidence[i].locator }
  });
}

write('writer-input-current.json', {
  ...prepareDraft(contract, { root: process.cwd(), reportingFrame: json('story-type-coverage.json'), sourcePacket: bind('source-evidence.json') }),
  producerContract: bind('producer-contract.json')
});
write('editorial-input.json', {
  readerJob: `${contract.readerContract.humanQuestion} ${contract.readerContract.promisedPayoff}`,
  completeArtifact: read('review-text.json').toString('utf8'),
  paragraphs: storyParagraphs(story),
  communicationAuthority: contract.communicationDesign,
  claims,
  sources,
  reviewBoundary: {
    status: 'HOLD_AUTH_FALSE',
    instruction: 'Treat the signed order as controlling. Reject any implication that a universal switch already exists, that the November recommendations are enacted law, that the two 2027 deadlines are interchangeable, or that EFF supplied a neutral technical verdict. External provider review has not run for this source-rebound artifact.'
  }
});
write('source-packet.json', { schemaVersion: 'laidies.newsstand-source-packet.v1', candidateId: story.id, sourceEvidence: bind('source-evidence.json'), claims, sources });

const observations = json('producer-observations.json');
observations.storySha256 = sha(Buffer.from(JSON.stringify(story)));
observations.limitations = observations.limitations.filter(item => !item.startsWith('Fresh source bindings'));
observations.limitations.push('Fresh source bindings were checked through September 24 against the signed order, complete Governor and EFF captures, and the new Governor expert announcement. The announcement names advisers but still calls the shutoff a proposal under consideration; external independent review remains on hold because provider authorization is unavailable.');
write('producer-observations.json', observations);

const manifest = json('publication-manifest.json');
manifest.reviewText = bind('review-text.json');
manifest.rendered = bind('rendered-article.html');
manifest.story = bind('story.json');
write('publication-manifest.json', manifest);

const review = replaceDeep(json('producer-publication-review.json'));
review.reviewedAt = now;
review.artifact = { manifest: bind('publication-manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html') };
review.factualReview.sourceBindings = [bind('editorial-input.json'), bind('source-packet.json'), bind('source-evidence.json')];
review.factualReview.claimMap = claims.map(claim => ({ ...claim, status: 'QUALIFIED', sourceBinding: bind('editorial-input.json') }));
review.factualReview.reviewedThrough = '2026-09-24';
review.factualReview.nextTrigger = 'State correction, November 16 recommendations, statutory amendment, rulemaking or publication after September 24.';
review.limitations = observations.limitations;
write('producer-publication-review.json', review);
const proseCheck = inspectProseQualityReview(review, { root: process.cwd() });
write('producer-self-review-check.json', proseCheck);
if (proseCheck.errors.length) throw Error(proseCheck.errors.join('\n'));

const afterArticleSha256 = sha(read('article.md'));
const afterRenderedSha256 = sha(read('rendered-article.html'));
if (beforeArticleSha256 !== afterArticleSha256 || beforeRenderedSha256 !== afterRenderedSha256) throw Error('Public prose artifact changed during metadata/source rebind.');

const eff = evidence.records.find(record => record.sourceId === 'eff-response-20260918');
if (eff?.url !== newUrl) throw Error('Recovered EFF original is not bound.');
if (story.heroVisual?.src !== '/assets/newsstand/california-ai-oversight-order-20260920.png') throw Error('Admitted hero was not preserved.');

write('fresh-source-rebind-preflight.json', {
  schemaVersion: 'laidies.newsstand-fresh-source-rebind-preflight.v1',
  candidateId: story.id,
  checkedAt: now,
  verdict: 'PASS_WITH_EXTERNAL_REVIEW_HOLD',
  sourceCorrection: { from: oldUrl, to: newUrl },
  currentEvidence: {
    signedOrder: bind('sources/20260924/signed-order.json'),
    initialGovernorRelease: bind('sources/20260924/governor-order-release.json'),
    governorExpertsUpdate: bind('sources/20260924/governor-experts-update.json'),
    effResponse: bind('sources/20260924/eff-response.json'),
    refreshAssessment: bind('sources/20260924/source-refresh.json')
  },
  bindings: { producerContract: bind('producer-contract.json'), sourceEvidence: bind('source-evidence.json'), story: bind('story.json'), reviewText: bind('review-text.json'), claimMap: bind('claim-map.json'), editorialInput: bind('editorial-input.json'), sourcePacket: bind('source-packet.json'), producerReview: bind('producer-publication-review.json') },
  invariants: { publicArticleSha256: afterArticleSha256, renderedArticleSha256: afterRenderedSha256, heroVisual: story.heroVisual, assetSha256: sha(fs.readFileSync('assets/newsstand/california-ai-oversight-order-20260920.png')), visualAdmission: manifest.visualAdmission, publishedAt: story.publishedAt },
  externalReview: { status: 'HOLD_AUTH_FALSE', providerCalled: false, nextAttempt: 'editorial-review-v11-current-sources-20260924' }
});

console.log(JSON.stringify({ status: 'CURRENT_SOURCES_REBOUND', story: bind('story.json'), reviewText: bind('review-text.json'), articleSha256: afterArticleSha256, imageSha256: sha(fs.readFileSync('assets/newsstand/california-ai-oversight-order-20260920.png')), externalReview: 'HOLD_AUTH_FALSE' }, null, 2));
