import fs from 'node:fs';
import crypto from 'node:crypto';
import { inspectContentProducerContract } from '../../../../../../scripts/check-content-producer-contract.mjs';
import { inspectProseQualityReview } from '../../../../../../scripts/check-prose-quality-admission.mjs';
import { prepareDraft } from '../../../../../../scripts/prepare-newsstand-draft.mjs';
import { storyParagraphs } from '../../../review-runtime/protocol.mjs';

const root = process.cwd();
const evidencePath = 'operations/product-stewards/newsstand/evidence/morning-20260925/candidate-refresh/web-source-capture.json';
const now = new Date().toISOString();
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const stable = value => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
const bindPath = path => ({ path, sha256: sha(fs.readFileSync(path)) });

function refresh(candidateName, sourceFinding, nextTrigger) {
  const dir = `operations/product-stewards/newsstand/candidates/${candidateName}/`;
  const read = name => fs.readFileSync(dir + name);
  const json = name => JSON.parse(read(name));
  const write = (name, value) => fs.writeFileSync(dir + name, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
  const bind = name => bindPath(dir + name);
  const replaceDate = value => {
    if (typeof value === 'string') return value
      .replaceAll('checked September 24', 'checked September 25')
      .replaceAll('through September 24', 'through September 25')
      .replaceAll('after September 24', 'after September 25');
    if (Array.isArray(value)) return value.map(replaceDate);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, replaceDate(child)]));
    return value;
  };

  const articleBefore = sha(read('article.md'));
  const renderedBefore = sha(read('rendered-article.html'));
  const heroBefore = stable(json('story.json').heroVisual);

  const evidence = replaceDate(json('source-evidence.json'));
  evidence.capturedOn = '2026-09-25';
  evidence.checkedAt = now;
  evidence.reviewedOn = '2026-09-25';
  evidence.freshness = sourceFinding;
  evidence.freshnessFinding = sourceFinding;
  evidence.freshnessEvidence = bindPath(evidencePath);
  for (const record of evidence.records || []) record.raw = { ...bindPath(evidencePath), locator: `candidates.${candidateName}.sources` };
  write('source-evidence.json', evidence);

  const contract = json('producer-contract.json');
  contract.createdAt = now;
  for (const truth of contract.canonicalTruth || []) {
    if (truth.claimId !== 'prior-weekly') truth.source = bind('source-evidence.json');
  }
  write('producer-contract.json', contract);
  const contractCheck = inspectContentProducerContract(contract, { root });
  if (contractCheck.errors.length) throw new Error(`${candidateName} contract: ${contractCheck.errors.join('\n')}`);
  write('producer-contract-integrity.json', { checkedAt: now, contract: bind('producer-contract.json'), sourceEvidence: bind('source-evidence.json'), ...contractCheck });

  const story = json('story.json');
  story.updatedAt = now;
  story.lastCheckedAt = now;
  story.publishedAt = null;
  story.status = 'hold';
  for (const source of story.sources || []) source.accessedAt = '2026-09-25';
  if (stable(story.heroVisual) !== heroBefore) throw new Error(`${candidateName} hero changed`);
  write('story.json', story);
  write('review-text.json', stable(story) + '\n');

  const claims = replaceDate(json('claim-map.json'));
  write('claim-map.json', claims);

  const coverage = json('story-type-coverage.json');
  write('writer-input-current.json', {
    ...prepareDraft(contract, { root, reportingFrame: coverage, sourcePacket: bind('source-evidence.json') }),
    producerContract: bind('producer-contract.json')
  });

  const editorial = replaceDate(json('editorial-input.json'));
  editorial.completeArtifact = read('review-text.json').toString('utf8');
  editorial.paragraphs = storyParagraphs(story);
  editorial.claims = claims.claims;
  write('editorial-input.json', editorial);

  const packet = replaceDate(json('source-packet.json'));
  packet.sourceEvidence = bind('source-evidence.json');
  packet.claims = claims.claims;
  write('source-packet.json', packet);

  const observations = replaceDate(json('producer-observations.json'));
  observations.storySha256 = sha(Buffer.from(JSON.stringify(story)));
  observations.limitations = (observations.limitations || []).filter(item => !item.startsWith('Fresh source bindings'));
  observations.limitations.push(`Fresh source bindings were read on September 25. ${sourceFinding} Independent editorial review remains pending.`);
  write('producer-observations.json', observations);

  const manifest = json('publication-manifest.json');
  manifest.reviewText = bind('review-text.json');
  manifest.rendered = bind('rendered-article.html');
  manifest.story = bind('story.json');
  write('publication-manifest.json', manifest);

  const review = replaceDate(json('producer-publication-review.json'));
  review.reviewedAt = now;
  review.artifact = { manifest: bind('publication-manifest.json'), reviewText: bind('review-text.json'), rendered: bind('rendered-article.html') };
  review.factualReview.sourceBindings = [bind('editorial-input.json'), bind('source-packet.json'), bind('source-evidence.json')];
  review.factualReview.claimMap = claims.claims.map(claim => ({ ...claim, status: 'QUALIFIED', sourceBinding: bind('editorial-input.json') }));
  review.factualReview.reviewedThrough = '2026-09-25';
  review.factualReview.nextTrigger = nextTrigger;
  review.limitations = observations.limitations;
  write('producer-publication-review.json', review);
  const proseCheck = inspectProseQualityReview(review, { root });
  write('producer-self-review-check.json', { checkedAt: now, ...proseCheck });
  if (proseCheck.errors.length) throw new Error(`${candidateName} producer review: ${proseCheck.errors.join('\n')}`);

  if (articleBefore !== sha(read('article.md')) || renderedBefore !== sha(read('rendered-article.html'))) throw new Error(`${candidateName} prose changed`);
  const receipt = {
    schema: 'newsstand-current-source-preflight-receipt-v1',
    candidateId: candidateName,
    sourceReviewedAt: now,
    eventDatesPreserved: true,
    publicProseChanged: false,
    providerCalled: false,
    result: 'PACKAGE_REBOUND_AWAITING_FULL_PREFLIGHT',
    currentEvidence: bindPath(evidencePath),
    bindings: {
      sourceEvidence: bind('source-evidence.json'),
      article: bind('article.md'),
      story: bind('story.json'),
      reviewText: bind('review-text.json'),
      producerReview: bind('producer-publication-review.json')
    }
  };
  write('current-source-preflight-20260925.json', receipt);
  return receipt;
}

const results = [
  refresh(
    'california-ai-oversight-order-20260920',
    'The signed order, Governor releases and EFF response remain materially unchanged. The September 23 adviser announcement still calls the shutoff and embedded-verifier requirements proposals under consideration; no universal switch, efficacy result or enacted amendment is established.',
    'State correction, November 16 recommendations, statutory amendment, rulemaking or publication after September 25.'
  ),
  refresh(
    'california-data-centre-laws-20260921',
    'The official signing page and chaptered SB 1168 and AB 1577 texts remain materially unchanged. No official result tied a new tariff or implementation rule to these laws; the statutes still establish an assessment and reporting duties rather than a household saving.',
    'CPUC proceeding or rate action, Energy Commission implementation guidance, correction, statutory amendment or publication after September 25.'
  )
];
console.log(JSON.stringify(results, null, 2));
