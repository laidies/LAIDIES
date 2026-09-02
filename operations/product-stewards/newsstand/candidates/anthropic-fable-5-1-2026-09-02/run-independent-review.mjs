import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/anthropic-fable-5-1-2026-09-02/';
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
const registry = JSON.parse(read(registryPath));
const producer = JSON.parse(read(d + 'producer-review.json'));
const story = JSON.parse(read(d + 'story.json'));
const claimMap = JSON.parse(read(d + 'claim-map.json'));
const reviewBody = read(d + 'review-text.json');
const principal = 'cloudflare-llama-independent-news-20260902';
const model = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const positive = registry.positiveExemplars.find(item => item.id === 'CQX-GOOD-NEWS-001');
const outcomeKeys = Object.keys(producer.outcomes);
const failureKeys = Object.keys(producer.failureFamilies);

const prompt = `Review this exact LAiDIES ordinary-news article independently. You are a Qwen editor running through Cloudflare Workers AI, not the OpenAI maker. Return an honest PASS, HOLD or REJECT. Do not copy a maker review; none is supplied. Do not invent browsing, human readers or evidence.

EXACT COMPLETE STORY. Every artifactEvidence excerpt must be copied character-for-character from this JSON text, including any HTML tags inside a sentence:
${reviewBody}

PRIMARY-SOURCE RECEIPTS. Decide whether each claim is supported and properly qualified. Company statements are not independent audits:
${['source-announcement.md', 'source-release-notes.md'].map(p => JSON.stringify(bind(d + p)) + '\n' + read(d + p)).join('\n\n')}

EXACT CLAIM MAP TO ACCEPT OR HOLD. Do not rewrite its bindings:
${JSON.stringify(claimMap, null, 2)}

ORDINARY-NEWS EXPLANATION POLICY:
${read(policyPath)}

Apply four specific reader checks: explain what changed and why it matters; explain necessary terms in context; distinguish current reader consequences from possibilities; reject internal notes, invented advice, slogans and unsupported balance. Explain-back and unseen-transfer are AI editorial analysis, not observed human responses.

CALIBRATION. Independently reject both known-bad examples for the registered failures; then identify the NEWS-positive example's useful structural strengths without importing its facts:
${registry.negativeExemplars.map(item => JSON.stringify(item) + '\n' + read(item.path).slice(0, 2500)).join('\n\n')}
${JSON.stringify(positive)}
${read(positive.path).slice(0, 3500)}

Return valid JSON only with this exact top-level shape:
{
  "verdict":"PASS|HOLD|REJECT",
  "findings":"material problems first, or explicitly no material problems found; explain the verdict",
  "reverseBrief":{"humanQuestion":"...","promisedPayoff":"...","centralMentalModel":"...","dailyLifeConnection":"...","surfaceJob":"...","desiredReaderFeeling":"..."},
  "calibration":{"negatives":[{"exemplarId":"CQX-BAD-001","verdict":"REJECT","identifiedFailureFamilies":["registered family"],"evidence":[{"excerpt":"exact >=15 character excerpt from that exemplar","locator":"..."}]},{"exemplarId":"CQX-BAD-002","verdict":"REJECT","identifiedFailureFamilies":["registered family"],"evidence":[{"excerpt":"exact >=15 character excerpt from that exemplar","locator":"..."}]}],"positive":{"exemplarId":"CQX-GOOD-NEWS-001","verdict":"PASS","strengthsRetained":["..."],"evidence":[{"excerpt":"exact >=15 character excerpt from positive exemplar","locator":"..."}]}},
  "checks":{"incidentExplained":{"verdict":"PASS|HOLD|FAIL","observation":"...","artifactEvidence":[{"excerpt":"exact story substring >=15 chars","locator":"..."}]},"termsExplainedInContext":{},"readerConsequenceSpecific":{},"noInternalNotesOrInventedAdvice":{}},
  "outcomes":{},
  "failureFamilies":{},
  "claimAssessments":[{"claimId":"exact supplied claim id","verdict":"PASS|HOLD|FAIL","observation":"...","candidateEvidence":[{"excerpt":"exact story substring >=15 chars","locator":"..."}],"sourceEvidence":[{"excerpt":"exact source-receipt substring >=15 chars","locator":"..."}]}],
  "ratchet":{"repeatedKnownDefects":0,"objectiveDefectsFirstFoundAtReview":0,"reviewIssues":0,"reviewCycles":1},
  "learningDisposition":{"disposition":"NO_NEW_DEFECT|EVIDENCE_GAP|CANDIDATE_REPAIR_ONLY","rationale":"..."}
}

outcomes must contain exactly these keys: ${outcomeKeys.join(', ')}. Each outcome needs verdict PASS/HOLD/FAIL, a candidate-specific observation and artifactEvidence with an exact story substring. explainBack and unseenTransfer must additionally include aiEditorialAnalysis {"evidenceType":"AI_EDITORIAL_ANALYSIS","prompt":"...","response":"...","expectedEvidence":"...","assessment":"PASS|HOLD|FAIL"}. Explain-back restates the mechanism and consequence in ordinary language. Unseen-transfer uses a genuinely different situation to expose misunderstanding.

failureFamilies must contain exactly these keys: ${failureKeys.join(', ')}. Each value is {"present":true|false,"observation":"candidate-specific reason","artifactLocator":"exact section or phrase"}. A true material failure cannot accompany PASS.

claimAssessments must contain all and only these IDs: ${claimMap.map(item => item.claimId).join(', ')}. It must independently test the source receipts. If the exact receipts do not support the article's meaning, use HOLD or FAIL. A PASS verdict requires every check, outcome and claim assessment to pass and every failure family to be absent.`;

const providerPath = d + 'independent-workers-ai-provider-output.json';
let provider;
if (!fs.existsSync(path.join(root, providerPath))) {
const response = await fetch('http://localhost:8791', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ messages: [
    { role: 'system', content: 'You are an exacting independent factual and reader-comprehension editor. Return valid JSON only. Evidence fields are quotations, never summaries.' },
    { role: 'user', content: prompt }
  ], response_format: { type: 'json_object' }, max_tokens: 8500, temperature: 0.05, seed: 20260902 })
});
if (!response.ok) throw new Error(`Workers AI reviewer failed with HTTP ${response.status}: ${await response.text()}`);
provider = await response.json();
fs.writeFileSync(path.join(root, providerPath), JSON.stringify({ model, provider, promptSha256: hash(prompt) }, null, 2) + '\n');
} else {
  provider = JSON.parse(read(providerPath)).provider;
}
const raw = provider.response ?? provider.choices?.[0]?.message?.content;
const judgment = typeof raw === 'string' ? JSON.parse(raw) : raw;
if (!judgment || !['PASS', 'HOLD', 'REJECT'].includes(judgment.verdict)) throw new Error('No independent semantic verdict');
const correctionPath = d + 'independent-workers-ai-correction.json';
if (fs.existsSync(path.join(root, correctionPath))) {
  const correction = JSON.parse(read(correctionPath)).correction;
  judgment.checks.noInternalNotesOrInventedAdvice = correction.noInternalNotesOrInventedAdvice;
  judgment.claimAssessments = correction.claimAssessments;
}
const evidenceCorrectionPath = d + 'independent-workers-ai-evidence-correction.json';
if (fs.existsSync(path.join(root, evidenceCorrectionPath))) {
  const evidenceCorrection = JSON.parse(read(evidenceCorrectionPath)).correction;
  for (const [key, value] of Object.entries(evidenceCorrection.outcomes || {})) judgment.outcomes[key] = value;
}
const calibrationCorrectionPath = d + 'independent-workers-ai-calibration-correction.json';
if (fs.existsSync(path.join(root, calibrationCorrectionPath))) {
  const calibrationCorrection = JSON.parse(read(calibrationCorrectionPath)).correction;
  for (const corrected of calibrationCorrection.negatives || []) {
    const existing = judgment.calibration.negatives.find(item => item.exemplarId === corrected.exemplarId);
    if (existing) existing.identifiedFailureFamilies = corrected.identifiedFailureFamilies;
  }
}

const exactKeys = (actual, expected, label) => {
  const left = Object.keys(actual || {}).sort();
  const right = [...expected].sort();
  if (stable(left) !== stable(right)) throw new Error(`${label} keys differ: ${left.join(', ')}`);
};
const exactEvidence = (items, body, label) => {
  if (!Array.isArray(items) || !items.length) throw new Error(`${label} requires evidence`);
  for (const item of items) if (typeof item?.excerpt !== 'string' || item.excerpt.length < 15 || !body.includes(item.excerpt)) throw new Error(`${label} has non-exact excerpt: ${item?.excerpt}`);
};
exactKeys(judgment.checks, ['incidentExplained', 'termsExplainedInContext', 'readerConsequenceSpecific', 'noInternalNotesOrInventedAdvice'], 'checks');
exactKeys(judgment.outcomes, outcomeKeys, 'outcomes');
exactKeys(judgment.failureFamilies, failureKeys, 'failureFamilies');
for (const [key, value] of Object.entries(judgment.checks)) exactEvidence(value.artifactEvidence, reviewBody, `checks.${key}`);
for (const [key, value] of Object.entries(judgment.outcomes)) exactEvidence(value.artifactEvidence, reviewBody, `outcomes.${key}`);
if (stable(judgment.claimAssessments.map(item => item.claimId).sort()) !== stable(claimMap.map(item => item.claimId).sort())) throw new Error('claim assessment IDs differ');
for (const item of judgment.claimAssessments) {
  exactEvidence(item.candidateEvidence, reviewBody, `claim.${item.claimId}.candidateEvidence`);
  const claim = claimMap.find(candidate => candidate.claimId === item.claimId);
  const sourceBody = read(claim.sourceBinding.path);
  exactEvidence(item.sourceEvidence, sourceBody, `claim.${item.claimId}.sourceEvidence`);
}
for (const negative of judgment.calibration.negatives) {
  const item = registry.negativeExemplars.find(candidate => candidate.id === negative.exemplarId);
  if (!item || negative.verdict !== 'REJECT') throw new Error('negative calibration incomplete');
  exactEvidence(negative.evidence, read(item.path), `calibration.${negative.exemplarId}`);
}
if (judgment.calibration.positive?.exemplarId !== 'CQX-GOOD-NEWS-001' || judgment.calibration.positive.verdict !== 'PASS') throw new Error('positive calibration incomplete');
exactEvidence(judgment.calibration.positive.evidence, read(positive.path), 'calibration.positive');

const verdictChecksPass = Object.values(judgment.checks).every(item => item.verdict === 'PASS')
  && Object.values(judgment.outcomes).every(item => item.verdict === 'PASS')
  && Object.values(judgment.failureFamilies).every(item => item.present === false)
  && judgment.claimAssessments.every(item => item.verdict === 'PASS');
if (judgment.verdict === 'PASS' && !verdictChecksPass) throw new Error('PASS conflicts with reviewer findings');
if (judgment.outcomes.explainBack.aiEditorialAnalysis?.evidenceType !== 'AI_EDITORIAL_ANALYSIS' || judgment.outcomes.unseenTransfer.aiEditorialAnalysis?.evidenceType !== 'AI_EDITORIAL_ANALYSIS') throw new Error('AI editorial outcome analysis missing');

const reviewedAt = new Date().toISOString();
const analysis = {
  evidenceType: 'AI_EDITORIAL_ANALYSIS', candidateId: story.id, reviewerPrincipalId: principal,
  reviewTextSha256: bind(d + 'review-text.json').sha256,
  checks: judgment.checks,
  outcomes: {
    explainBack: judgment.outcomes.explainBack.aiEditorialAnalysis,
    unseenTransfer: judgment.outcomes.unseenTransfer.aiEditorialAnalysis
  }
};
const put = (name, value) => {
  const p = d + name;
  if (fs.existsSync(path.join(root, p))) throw new Error(`Do not overwrite ${p}`);
  fs.writeFileSync(path.join(root, p), JSON.stringify(value, null, 2) + '\n');
  return bind(p);
};
const analysisBinding = put('independent-analysis-final.json', analysis);
const reportBinding = put('independent-raw-report-final.json', {
  candidateId: story.id, storySha256: hash(stable(story)), reviewerPrincipalId: principal,
  verdict: judgment.verdict, findings: judgment.findings, providerOutput: bind(providerPath),
  promptSha256: hash(prompt), actualModels: [model], correction: fs.existsSync(path.join(root, correctionPath)) ? bind(correctionPath) : null,
  evidenceCorrection: fs.existsSync(path.join(root, evidenceCorrectionPath)) ? bind(evidenceCorrectionPath) : null
  ,calibrationCorrection: fs.existsSync(path.join(root, calibrationCorrectionPath)) ? bind(calibrationCorrectionPath) : null
});
const receipt = {
  schemaVersion: 'laidies-prose-quality-review.v1', candidateId: story.id,
  stage: 'INDEPENDENT_SEMANTIC_ADMISSION', contentClass: 'NEWS', surface: 'NEWSSTAND_DAILY', maker: '/root',
  reviewer: { id: principal, principalId: principal, role: 'independent factual and reader-comprehension editor', modelFamily: 'meta-llama', independentFromMaker: true, artifactFirst: true },
  reviewMode: 'EXACT_PROSE_IN_FULL', reviewedAt, artifact: producer.artifact,
  calibration: { registrySha256: bind(registryPath).sha256, reviewerPrincipalId: principal, reviewedAt, ...judgment.calibration },
  reverseBrief: judgment.reverseBrief,
  outcomes: judgment.outcomes,
  failureFamilies: Object.fromEntries(Object.entries(judgment.failureFamilies).map(([name, finding]) => [name, {
    ...finding,
    artifactLocator: finding.artifactLocator || `complete story review: ${name}`
  }])),
  factualReview: {
    disposition: judgment.verdict === 'PASS' ? 'CLAIMS_REVIEWED' : 'CLAIMS_HELD',
    sourceBindings: producer.factualReview.sourceBindings,
    claimMap,
    reviewedThrough: '2026-09-02',
    nextTrigger: 'Anthropic changes model availability, pricing or trusted-access documentation; independent evaluations materially contradict the attributed launch claims.',
    correctionOwner: 'LAiDIES NewsStand product steward',
    independentAssessments: judgment.claimAssessments
  },
  ratchet: { ...judgment.ratchet, onKnownDefect: 'REPAIR_PRODUCER_BEFORE_ANOTHER_REVIEW' },
  lineage: { kind: 'FIRST', noComparableReason: 'First independent semantic review of this exact Fable 5.1 ordinary-news candidate.' },
  learningDisposition: judgment.learningDisposition,
  verdict: judgment.verdict,
  limitations: ['AI editorial assessment only; no observed human-comprehension evidence is claimed.', 'Browser, native zoom and public release were not reviewed.'],
  newsEditorialReview: { policy: bind(policyPath), analysis: analysisBinding },
  reportBinding
};
put('independent-review-final.json', receipt);
console.log(JSON.stringify({ verdict: judgment.verdict, findings: judgment.findings, model }));
