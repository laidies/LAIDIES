import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const bind = p => ({ path: p, sha256: hash(read(p)) });
const stable = value => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? '[' + value.map(stable).join(',') + ']'
    : '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + stable(value[key])).join(',') + '}';
const registryPath = 'operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const policyPath = 'operations/product-stewards/newsstand/ordinary-news-editorial-policy.json';
const producer = JSON.parse(read(d + 'producer-review.json'));
const story = JSON.parse(read(d + 'story.json'));
const claimMap = JSON.parse(read(d + 'claim-map.json'));
const provider = JSON.parse(read(d + 'independent-workers-ai-v2-provider-output.json'));
const raw = provider.provider.response ?? provider.provider.choices?.[0]?.message?.content;
const judgment = typeof raw === 'string' ? JSON.parse(raw) : raw;
const correction = JSON.parse(read(d + 'independent-workers-ai-v2-evidence-correction.json')).correction;
const focused = JSON.parse(read(d + 'independent-workers-ai-v2-transfer-correction.json'));
const failureFocused = JSON.parse(read(d + 'independent-workers-ai-v2-failure-review-attempt.json')).result;
const endingFocused = JSON.parse(read(d + 'independent-workers-ai-v2-ending-evidence.json'));
const principal = 'cloudflare-llama-independent-news-20260831-v2';

for (const [key, item] of Object.entries(correction.replacements)) {
  if (key === 'calibration.CQX-BAD-001') {
    const target = judgment.calibration.negatives.find(value => value.exemplarId === 'CQX-BAD-001');
    target.evidence = [item];
    continue;
  }
  const [section, name] = key.split('.');
  judgment[section][name].artifactEvidence = [item];
}
for (const name of ['explainBack', 'unseenTransfer']) {
  const reviewed = focused.result[name];
  judgment.outcomes[name] = {
    verdict: reviewed.verdict,
    observation: reviewed.observation,
    artifactEvidence: [{ excerpt: focused.evidence[reviewed.evidenceId], locator: reviewed.evidenceId }],
    aiEditorialAnalysis: reviewed.aiEditorialAnalysis
  };
}
judgment.failureFamilies = failureFocused.failureFamilies;
judgment.checks.noInternalNotesOrInventedAdvice = {
  verdict: failureFocused.noInternalNotesOrInventedAdvice.verdict,
  observation: failureFocused.noInternalNotesOrInventedAdvice.observation,
  artifactEvidence: [{ excerpt: endingFocused.choices[endingFocused.result.evidenceId], locator: endingFocused.result.evidenceId }]
};

const reviewedAt = new Date().toISOString();
const analysis = {
  evidenceType: 'AI_EDITORIAL_ANALYSIS', candidateId: story.id, reviewerPrincipalId: principal,
  reviewTextSha256: bind(d + 'review-text.json').sha256,
  checks: judgment.checks,
  outcomes: { explainBack: judgment.outcomes.explainBack.aiEditorialAnalysis, unseenTransfer: judgment.outcomes.unseenTransfer.aiEditorialAnalysis }
};
const put = (name, value) => {
  const p = d + name;
  if (fs.existsSync(path.join(root, p))) throw new Error(`Do not overwrite ${p}`);
  fs.writeFileSync(path.join(root, p), JSON.stringify(value, null, 2) + '\n');
  return bind(p);
};
const analysisBinding = put('independent-analysis-final-v2.json', analysis);
const reportBinding = put('independent-raw-report-final-v2.json', {
  candidateId: story.id, storySha256: hash(stable(story)), reviewerPrincipalId: principal,
  verdict: judgment.verdict, findings: judgment.findings,
  providerOutput: bind(d + 'independent-workers-ai-v2-provider-output.json'),
  evidenceCorrection: bind(d + 'independent-workers-ai-v2-evidence-correction.json'),
  focusedOutcomeReview: bind(d + 'independent-workers-ai-v2-transfer-correction.json'),
  focusedFailureReview: bind(d + 'independent-workers-ai-v2-failure-review-attempt.json'),
  endingEvidenceReview: bind(d + 'independent-workers-ai-v2-ending-evidence.json'),
  actualModels: ['@cf/meta/llama-4-scout-17b-16e-instruct', '@cf/meta/llama-3.3-70b-instruct-fp8-fast']
});
const receipt = {
  schemaVersion: 'laidies-prose-quality-review.v1', candidateId: story.id,
  stage: 'INDEPENDENT_SEMANTIC_ADMISSION', contentClass: 'NEWS', surface: 'NEWSSTAND_DAILY', maker: '/root',
  reviewer: { id: principal, principalId: principal, role: 'independent factual and reader-comprehension editor', modelFamily: 'meta-llama', independentFromMaker: true, artifactFirst: true },
  reviewMode: 'EXACT_PROSE_IN_FULL', reviewedAt, artifact: producer.artifact,
  calibration: { registrySha256: bind(registryPath).sha256, reviewerPrincipalId: principal, reviewedAt, ...judgment.calibration },
  reverseBrief: judgment.reverseBrief,
  outcomes: judgment.outcomes,
  failureFamilies: judgment.failureFamilies,
  factualReview: {
    disposition: judgment.verdict === 'PASS' ? 'CLAIMS_REVIEWED' : 'CLAIMS_HELD',
    sourceBindings: producer.factualReview.sourceBindings,
    claimMap,
    reviewedThrough: '2026-08-31',
    nextTrigger: 'OpenAI rollout or availability documentation changes; new independent audit evidence; correction or contradictory observed behaviour.',
    correctionOwner: 'LAiDIES NewsStand product steward',
    independentAssessments: judgment.claimAssessments
  },
  ratchet: { ...judgment.ratchet, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' },
  lineage: { kind: 'FIRST', noComparableReason: 'First independent semantic review of this exact ordinary-news candidate.' },
  learningDisposition: judgment.learningDisposition,
  verdict: judgment.verdict,
  limitations: ['AI editorial assessment only; no observed human-comprehension evidence is claimed.', 'Browser, native zoom and public release were not reviewed.'],
  newsEditorialReview: { policy: bind(policyPath), analysis: analysisBinding },
  reportBinding
};
put('independent-review-final-v2.json', receipt);
console.log(JSON.stringify({ verdict: judgment.verdict, findings: judgment.findings }));
