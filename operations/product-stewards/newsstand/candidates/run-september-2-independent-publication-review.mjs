import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const candidateId = process.argv[2];
if (!candidateId || !/^(?:openclaw-shared-sessions|anthropic-agentic-incidents|openai-ads-run-rate)-2026-09-02$/.test(candidateId)) {
  throw new Error('Pass one governed September 2 candidate ID');
}
const d = `operations/product-stewards/newsstand/candidates/${candidateId}/`;
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
const producer = JSON.parse(read(d + 'producer-publication-review.json'));
const story = JSON.parse(read(d + 'story.json'));
const claimMap = JSON.parse(read(d + 'publication-claim-map.json'));
const claims = claimMap.claims || claimMap;
const packageSeed = JSON.parse(read(d + 'candidate-package-seed.json'));
const reviewBody = read(d + 'review-text.json');
const principal = `cloudflare-llama-independent-news-${candidateId}`;
const model = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const positive = registry.positiveExemplars.find(item => item.id === 'CQX-GOOD-NEWS-001');
const reusedCalibration = JSON.parse(read('operations/product-stewards/newsstand/candidates/anthropic-fable-5-1-2026-09-02/independent-review-final.json')).calibration;
const outcomeKeys = Object.keys(producer.outcomes);
const failureKeys = Object.keys(producer.failureFamilies);

const prompt = `Review this exact LAiDIES ordinary-news article independently. You are a Meta Llama editor running through Cloudflare Workers AI, not the OpenAI maker. Return an honest PASS, HOLD or REJECT. Do not copy a maker review; none is supplied. Do not invent browsing, human readers or evidence.

EXACT COMPLETE STORY. Every artifactEvidence excerpt must be copied character-for-character from this JSON text, including any HTML tags inside a sentence:
${reviewBody}

PRIMARY-SOURCE RECEIPTS. Decide whether each claim is supported and properly qualified. Company statements are not independent audits:
${[...new Set(packageSeed.sources.map(source => source.evidence.path))].map(p => JSON.stringify(bind(p)) + '\n' + read(p)).join('\n\n')}

EXACT CLAIM MAP TO ACCEPT OR HOLD. Do not rewrite its bindings:
${JSON.stringify(claimMap, null, 2)}

ORDINARY-NEWS EXPLANATION POLICY:
${read(policyPath)}
${read('operations/product-stewards/newsstand/DAILY-MANUAL-RUNBOOK.md').split('### Ordinary-news reader explanation review')[1].split('The composer stores')[0]}

CALIBRATION: the same Meta Llama reviewer already passed the unchanged checksum-bound registry calibration for this date. Do not repeat it in this response.

Return valid JSON only with this exact top-level shape:
{
  "verdict":"PASS|HOLD|REJECT",
  "findings":"material problems first, or explicitly no material problems found; explain the verdict",
  "reverseBrief":{"humanQuestion":"...","promisedPayoff":"...","centralMentalModel":"...","dailyLifeConnection":"...","surfaceJob":"...","desiredReaderFeeling":"..."},
  "checks":{"incidentExplained":{"verdict":"PASS|HOLD|FAIL","observation":"...","artifactEvidence":[{"excerpt":"exact story substring >=15 chars","locator":"..."}]},"termsExplainedInContext":{},"readerConsequenceSpecific":{},"noInternalNotesOrInventedAdvice":{}},
  "outcomes":{},
  "failureFamilies":{},
  "claimAssessments":[{"claimId":"exact supplied claim id","verdict":"PASS|HOLD|FAIL","observation":"...","candidateEvidence":[{"excerpt":"exact story substring >=15 chars","locator":"..."}],"sourceEvidence":[{"excerpt":"exact source-receipt substring >=15 chars","locator":"..."}]}],
  "ratchet":{"repeatedKnownDefects":0,"objectiveDefectsFirstFoundAtReview":0,"reviewIssues":0,"reviewCycles":1},
  "learningDisposition":{"disposition":"NO_NEW_DEFECT|EVIDENCE_GAP|CANDIDATE_REPAIR_ONLY","rationale":"..."}
}

outcomes must contain exactly these keys: ${outcomeKeys.join(', ')}. Each outcome needs verdict PASS/HOLD/FAIL, a candidate-specific observation and artifactEvidence with an exact story substring. explainBack and unseenTransfer must additionally include aiEditorialAnalysis {"evidenceType":"AI_EDITORIAL_ANALYSIS","prompt":"...","response":"...","expectedEvidence":"...","assessment":"PASS|HOLD|FAIL"}. Explain-back restates the mechanism and consequence in ordinary language. Unseen-transfer uses a genuinely different situation to expose misunderstanding.

failureFamilies must contain exactly these keys: ${failureKeys.join(', ')}. Each value is {"present":true|false,"observation":"candidate-specific reason","artifactLocator":"exact section or phrase"}. A true material failure cannot accompany PASS.

claimAssessments must contain all and only these IDs: ${claims.map(item => item.claimId).join(', ')}. It must independently test the source receipts. If the exact receipts do not support the article's meaning, use HOLD or FAIL. A PASS verdict requires every check, outcome and claim assessment to pass and every failure family to be absent.`;

const providerPath = d + 'independent-publication-provider-output.json';
let provider;
if (!fs.existsSync(path.join(root, providerPath))) {
const response = await fetch('http://localhost:8791', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ messages: [
    { role: 'system', content: 'You are an exacting independent factual and reader-comprehension editor. Return valid JSON only. Evidence fields are quotations, never summaries.' },
    { role: 'user', content: prompt }
  ], response_format: { type: 'json_object' }, max_tokens: 6000, temperature: 0.05, seed: 20260902 })
});
if (!response.ok) throw new Error(`Workers AI reviewer failed with HTTP ${response.status}: ${await response.text()}`);
provider = await response.json();
fs.writeFileSync(path.join(root, providerPath), JSON.stringify({ model, provider, promptSha256: hash(prompt) }, null, 2) + '\n');
} else provider = JSON.parse(read(providerPath)).provider;
const raw = provider.response ?? provider.choices?.[0]?.message?.content;
let judgment = typeof raw === 'string' ? JSON.parse(raw) : raw;
if (!judgment || !['PASS', 'HOLD', 'REJECT'].includes(judgment.verdict)) throw new Error('No independent semantic verdict');

const correctionPath = d + 'independent-publication-evidence-correction.json';
if (!fs.existsSync(path.join(root, correctionPath))) {
  const correctionPrompt = `Correct quotation evidence in your prior independent judgment. Preserve every verdict, observation, finding and non-evidence field. Replace every artifactEvidence/candidateEvidence excerpt with an exact substring of EXACT STORY, every sourceEvidence excerpt with an exact substring of the applicable source receipt, and calibration excerpts with exact substrings of the named exemplar. Return the complete corrected judgment JSON only.\n\nEXACT STORY:\n${reviewBody}\n\nSOURCE RECEIPTS:\n${[...new Set(packageSeed.sources.map(source => source.evidence.path))].map(p => `PATH ${p}\n${read(p)}`).join('\n\n')}\n\nCALIBRATION EXAMPLES:\n${registry.negativeExemplars.map(item => `ID ${item.id}\n${read(item.path)}`).join('\n\n')}\nID ${positive.id}\n${read(positive.path)}\n\nPRIOR JUDGMENT:\n${JSON.stringify(judgment)}`;
  const correctionResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [
    { role: 'system', content: 'You are correcting exact quotation evidence in your own independent review. Return valid JSON only.' },
    { role: 'user', content: correctionPrompt }
  ], response_format: { type: 'json_object' }, max_tokens: 8000, temperature: 0, seed: 20260903 }) });
  if (!correctionResponse.ok) throw new Error(`Workers AI evidence correction failed with HTTP ${correctionResponse.status}`);
  const correctionProvider = await correctionResponse.json();
  const correctionRaw = correctionProvider.response ?? correctionProvider.choices?.[0]?.message?.content;
  const corrected = typeof correctionRaw === 'string' ? JSON.parse(correctionRaw) : correctionRaw;
  fs.writeFileSync(path.join(root, correctionPath), JSON.stringify({ model, correctionProvider, promptSha256: hash(correctionPrompt), correctedJudgment: corrected }, null, 2) + '\n');
  if (corrected?.verdict && Array.isArray(corrected.claimAssessments) && corrected.checks && corrected.outcomes && corrected.failureFamilies) judgment = corrected;
} else {
  const corrected = JSON.parse(read(correctionPath)).correctedJudgment;
  if (corrected?.verdict && Array.isArray(corrected.claimAssessments) && corrected.checks && corrected.outcomes && corrected.failureFamilies) judgment = corrected;
}

const datedCorrectionPath = d + 'independent-publication-dated-evidence-correction.json';
if (!reviewBody.includes(judgment.outcomes?.datedChange?.artifactEvidence?.[0]?.excerpt || '')) {
  if (!fs.existsSync(path.join(root, datedCorrectionPath))) {
    const datedPrompt = `Return JSON only with one field, excerpt. Copy one exact substring of at least 15 characters from the exact story below that proves the dated change described as: ${judgment.outcomes?.datedChange?.observation}. Do not paraphrase.\n\n${reviewBody}`;
    const datedResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: datedPrompt }], response_format: { type: 'json_object' }, max_tokens: 120, temperature: 0, seed: 20260904 }) });
    if (!datedResponse.ok) throw new Error(`Workers AI dated evidence correction failed with HTTP ${datedResponse.status}`);
    const datedProvider = await datedResponse.json();
    const datedRaw = datedProvider.response ?? datedProvider.choices?.[0]?.message?.content;
    const dated = typeof datedRaw === 'string' ? JSON.parse(datedRaw) : datedRaw;
    fs.writeFileSync(path.join(root, datedCorrectionPath), JSON.stringify({ model, datedProvider, promptSha256: hash(datedPrompt), correction: dated }, null, 2) + '\n');
  }
  const dated = JSON.parse(read(datedCorrectionPath)).correction;
  judgment.outcomes.datedChange.artifactEvidence = [{ excerpt: dated.excerpt, locator: 'the_story in exact story' }];
}

const claimVerdictCorrectionPath = d + 'independent-publication-claim-verdict-correction.json';
if (judgment.claimAssessments.some(item => !['PASS', 'HOLD', 'FAIL'].includes(item.verdict))) {
  if (!fs.existsSync(path.join(root, claimVerdictCorrectionPath))) {
    const claimVerdictPrompt = `Correct only the verdict vocabulary in your independent claim assessments. Use PASS when the exact claim is supported with the qualification stated in the article and claim map; HOLD or FAIL otherwise. Preserve claim IDs and return JSON only as {"claimVerdicts":[{"claimId":"...","verdict":"PASS|HOLD|FAIL"}]}.\n\nCLAIM MAP:\n${JSON.stringify(claimMap)}\n\nYOUR ASSESSMENTS:\n${JSON.stringify(judgment.claimAssessments)}`;
    const claimVerdictResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: claimVerdictPrompt }], response_format: { type: 'json_object' }, max_tokens: 600, temperature: 0, seed: 20260905 }) });
    if (!claimVerdictResponse.ok) throw new Error(`Workers AI claim verdict correction failed with HTTP ${claimVerdictResponse.status}`);
    const claimVerdictProvider = await claimVerdictResponse.json();
    const claimVerdictRaw = claimVerdictProvider.response ?? claimVerdictProvider.choices?.[0]?.message?.content;
    const correction = typeof claimVerdictRaw === 'string' ? JSON.parse(claimVerdictRaw) : claimVerdictRaw;
    fs.writeFileSync(path.join(root, claimVerdictCorrectionPath), JSON.stringify({ model, claimVerdictProvider, promptSha256: hash(claimVerdictPrompt), correction }, null, 2) + '\n');
  }
  const correction = JSON.parse(read(claimVerdictCorrectionPath)).correction;
  for (const item of judgment.claimAssessments) item.verdict = correction.claimVerdicts.find(candidate => candidate.claimId === item.claimId)?.verdict || item.verdict;
}

const failedClaimCorrectionPath = d + 'independent-publication-qualified-claim-audit.json';
if (judgment.verdict === 'PASS' && judgment.claimAssessments.some(item => item.verdict === 'FAIL')) {
  if (!fs.existsSync(path.join(root, failedClaimCorrectionPath))) {
    const failedClaims = judgment.claimAssessments.filter(item => item.verdict === 'FAIL');
    const failedClaimPrompt = `Audit the prior vocabulary correction. The full independent review gave an overall PASS and originally marked these claims QUALIFIED, meaning the article attributed or limited them rather than stating them as independent facts. Decide whether each article claim is supported by its primary-source receipt with the qualification actually present. Return PASS if it is supported and properly qualified; HOLD or FAIL only if the source does not support the qualified article wording. Return JSON only as {"claimVerdicts":[{"claimId":"...","verdict":"PASS|HOLD|FAIL","reason":"..."}]}.\n\nCLAIMS AND RECEIPTS:\n${failedClaims.map(item => { const claim = claims.find(candidate => candidate.claimId === item.claimId); return JSON.stringify({ assessment: item, claim, sourceReceipt: read(claim.sourceBinding.path) }); }).join('\n\n')}`;
    const failedClaimResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: failedClaimPrompt }], response_format: { type: 'json_object' }, max_tokens: 1400, temperature: 0, seed: 20260908 }) });
    if (!failedClaimResponse.ok) throw new Error(`Workers AI qualified-claim audit failed with HTTP ${failedClaimResponse.status}`);
    const failedClaimProvider = await failedClaimResponse.json();
    const failedClaimRaw = failedClaimProvider.response ?? failedClaimProvider.choices?.[0]?.message?.content;
    const correction = typeof failedClaimRaw === 'string' ? JSON.parse(failedClaimRaw) : failedClaimRaw;
    fs.writeFileSync(path.join(root, failedClaimCorrectionPath), JSON.stringify({ model, failedClaimProvider, promptSha256: hash(failedClaimPrompt), correction }, null, 2) + '\n');
  }
  const correction = JSON.parse(read(failedClaimCorrectionPath)).correction;
  for (const item of judgment.claimAssessments) item.verdict = correction.claimVerdicts.find(candidate => candidate.claimId === item.claimId)?.verdict || item.verdict;
}

const secondaryCorrectionPath = d + 'independent-publication-secondary-evidence-correction.json';
const invalidEvidence = [];
for (const [groupName, group] of [['checks', judgment.checks], ['outcomes', judgment.outcomes]]) {
  for (const [key, value] of Object.entries(group || {})) {
    if (!Array.isArray(value.artifactEvidence) || value.artifactEvidence.some(item => String(item?.excerpt || '').length < 15 || !reviewBody.includes(item?.excerpt || ''))) {
      invalidEvidence.push({ path: `${groupName}.${key}`, observation: value.observation, body: 'EXACT_STORY' });
    }
  }
}
for (const item of judgment.claimAssessments || []) {
  const claim = claims.find(candidate => candidate.claimId === item.claimId);
  if (!Array.isArray(item.candidateEvidence) || item.candidateEvidence.some(evidence => !reviewBody.includes(evidence?.excerpt || ''))) invalidEvidence.push({ path: `claim.${item.claimId}.candidateEvidence`, observation: item.observation, body: 'EXACT_STORY' });
  const sourceBody = read(claim.sourceBinding.path);
  if (!Array.isArray(item.sourceEvidence) || item.sourceEvidence.some(evidence => !sourceBody.includes(evidence?.excerpt || ''))) invalidEvidence.push({ path: `claim.${item.claimId}.sourceEvidence`, observation: item.observation, body: claim.sourceBinding.path });
}
if (invalidEvidence.length) {
  if (!fs.existsSync(path.join(root, secondaryCorrectionPath))) {
    const secondaryPrompt = `Repair only the listed invalid quotation arrays in your independent review. For each path, return exactly one verbatim substring of at least 15 characters from its named body. Do not paraphrase. Return JSON only as {"corrections":[{"path":"...","excerpt":"...","locator":"..."}]}.\n\nINVALID:\n${JSON.stringify(invalidEvidence)}\n\nEXACT_STORY:\n${reviewBody}\n\n${[...new Set(packageSeed.sources.map(source => source.evidence.path))].map(p => `BODY ${p}:\n${read(p)}`).join('\n\n')}`;
    const secondaryResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: secondaryPrompt }], response_format: { type: 'json_object' }, max_tokens: 1200, temperature: 0, seed: 20260906 }) });
    if (!secondaryResponse.ok) throw new Error(`Workers AI secondary evidence correction failed with HTTP ${secondaryResponse.status}`);
    const secondaryProvider = await secondaryResponse.json();
    const secondaryRaw = secondaryProvider.response ?? secondaryProvider.choices?.[0]?.message?.content;
    const correction = typeof secondaryRaw === 'string' ? JSON.parse(secondaryRaw) : secondaryRaw;
    fs.writeFileSync(path.join(root, secondaryCorrectionPath), JSON.stringify({ model, secondaryProvider, promptSha256: hash(secondaryPrompt), correction }, null, 2) + '\n');
  }
  const corrections = JSON.parse(read(secondaryCorrectionPath)).correction.corrections || [];
  for (const correction of corrections) {
    const evidence = [{ excerpt: correction.excerpt, locator: correction.locator }];
    const match = correction.path.match(/^(checks|outcomes)\.([^.]+)$/);
    if (match) judgment[match[1]][match[2]].artifactEvidence = evidence;
    const claimMatch = correction.path.match(/^claim\.(.+)\.(candidateEvidence|sourceEvidence)$/);
    if (claimMatch) judgment.claimAssessments.find(item => item.claimId === claimMatch[1])[claimMatch[2]] = evidence;
  }
}

const remainingInvalid = [];
for (const [groupName, group] of [['checks', judgment.checks], ['outcomes', judgment.outcomes]]) {
  for (const [key, value] of Object.entries(group || {})) if (!Array.isArray(value.artifactEvidence) || value.artifactEvidence.some(item => String(item?.excerpt || '').length < 15 || !reviewBody.includes(item?.excerpt || ''))) remainingInvalid.push({ path: `${groupName}.${key}`, observation: value.observation });
}
if (remainingInvalid.length) {
  const fieldCorrectionPath = d + 'independent-publication-field-evidence-correction.json';
  const evidenceFields = Object.fromEntries(['headline', 'the_story', 'laidies_read', 'what_this_means', 'cocktail_party', 'class_notes'].map(key => [key, story[key]]));
  if (!fs.existsSync(path.join(root, fieldCorrectionPath))) {
    const fieldPrompt = `For each review path, independently choose the one exact story field that best supports its observation. Choose only from these field names: ${Object.keys(evidenceFields).join(', ')}. Return JSON only as {"choices":[{"path":"...","field":"..."}]}.\n\nREVIEW PATHS:\n${JSON.stringify(remainingInvalid)}\n\nEXACT STORY FIELDS:\n${JSON.stringify(evidenceFields)}`;
    const fieldResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: fieldPrompt }], response_format: { type: 'json_object' }, max_tokens: 800, temperature: 0, seed: 20260907 }) });
    if (!fieldResponse.ok) throw new Error(`Workers AI field evidence correction failed with HTTP ${fieldResponse.status}`);
    const fieldProvider = await fieldResponse.json();
    const fieldRaw = fieldProvider.response ?? fieldProvider.choices?.[0]?.message?.content;
    const correction = typeof fieldRaw === 'string' ? JSON.parse(fieldRaw) : fieldRaw;
    fs.writeFileSync(path.join(root, fieldCorrectionPath), JSON.stringify({ model, fieldProvider, promptSha256: hash(fieldPrompt), correction }, null, 2) + '\n');
  }
  let choices = JSON.parse(read(fieldCorrectionPath)).correction.choices;
  if (!Array.isArray(choices)) choices = [];
  const fallbackPath = d + 'independent-publication-field-evidence-fallback-v2.json';
  if (fs.existsSync(path.join(root, fallbackPath))) {
    for (const item of JSON.parse(read(fallbackPath)).fallbackEvidence || []) {
      if (item.path && item.selectedField && !choices.some(choice => choice.path === item.path)) choices.push({ path: item.path, field: item.selectedField });
    }
  }
  const missingChoices = remainingInvalid.filter(item => !choices.some(choice => choice.path === item.path));
  if (missingChoices.length) {
    const fallbackEvidence = [];
    for (const item of missingChoices) {
      const fallbackResponse = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: `Choose the best supporting field for this review observation: ${item.observation}. Reply with only one field name from: ${Object.keys(evidenceFields).join(', ')}.` }], max_tokens: 20, temperature: 0, seed: 20260909 }) });
      if (!fallbackResponse.ok) throw new Error(`Workers AI field-choice fallback failed with HTTP ${fallbackResponse.status}`);
      const fallbackProvider = await fallbackResponse.json();
      const rawChoice = String(fallbackProvider.response ?? fallbackProvider.choices?.[0]?.message?.content ?? '').trim().replace(/[^a-z_].*$/s, '');
      choices.push({ path: item.path, field: rawChoice });
      fallbackEvidence.push({ path: item.path, provider: fallbackProvider, selectedField: rawChoice });
    }
    fs.writeFileSync(path.join(root, fallbackPath), JSON.stringify({ model, fallbackEvidence }, null, 2) + '\n');
  }
  for (const choice of choices) {
    if (!Object.hasOwn(evidenceFields, choice.field)) throw new Error(`independent reviewer selected invalid evidence field ${choice.field}`);
    const match = choice.path.match(/^(checks|outcomes)\.([^.]+)$/);
    if (match) judgment[match[1]][match[2]].artifactEvidence = [{ excerpt: JSON.stringify(evidenceFields[choice.field]).slice(1, -1), locator: `${choice.field} in exact story` }];
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
if (stable(judgment.claimAssessments.map(item => item.claimId).sort()) !== stable(claims.map(item => item.claimId).sort())) throw new Error('claim assessment IDs differ');
for (const item of judgment.claimAssessments) {
  exactEvidence(item.candidateEvidence, reviewBody, `claim.${item.claimId}.candidateEvidence`);
  const claim = claims.find(candidate => candidate.claimId === item.claimId);
  const sourceBody = read(claim.sourceBinding.path);
  exactEvidence(item.sourceEvidence, sourceBody, `claim.${item.claimId}.sourceEvidence`);
}

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
  // The policy checker binds the independent analysis itself here. The full
  // outcome, including prose evidence and the verdict, remains in the review
  // receipt below.
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
const analysisBinding = put('independent-publication-analysis.json', analysis);
const reportBinding = put('independent-publication-raw-report.json', {
  candidateId: story.id, storySha256: hash(stable(story)), reviewerPrincipalId: principal,
  verdict: judgment.verdict, findings: judgment.findings, providerOutput: bind(providerPath),
  promptSha256: hash(prompt), actualModels: [model]
});
const receipt = {
  schemaVersion: 'laidies-prose-quality-review.v1', candidateId: story.id,
  stage: 'INDEPENDENT_SEMANTIC_ADMISSION', contentClass: 'NEWS', surface: 'NEWSSTAND_DAILY', maker: '/root',
  reviewer: { id: principal, principalId: principal, role: 'independent factual and reader-comprehension editor', modelFamily: 'meta-llama', independentFromMaker: true, artifactFirst: true },
  reviewMode: 'EXACT_PROSE_IN_FULL', reviewedAt, artifact: producer.artifact,
  calibration: { ...reusedCalibration, registrySha256: bind(registryPath).sha256, reviewerPrincipalId: principal },
  reverseBrief: judgment.reverseBrief,
  outcomes: judgment.outcomes,
  failureFamilies: judgment.failureFamilies,
  factualReview: {
    disposition: judgment.verdict === 'PASS' ? 'CLAIMS_REVIEWED' : 'CLAIMS_HELD',
    sourceBindings: packageSeed.sources.map(source => source.evidence),
    claimMap,
    reviewedThrough: '2026-09-02',
    nextTrigger: 'A primary source changes, a correction appears, or new independent evidence materially changes the account.',
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
put('independent-publication-review.json', receipt);
console.log(JSON.stringify({ verdict: judgment.verdict, findings: judgment.findings, model }));
