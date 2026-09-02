import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = t => crypto.createHash('sha256').update(t).digest('hex');
const bind = p => ({ path: p, sha256: hash(read(p)) });
const registryPath = 'operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json';
const registry = JSON.parse(read(registryPath));
const story = JSON.parse(read(d + 'story.json'));
const canonical = value => value === null || typeof value !== 'object'
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? '[' + value.map(canonical).join(',') + ']'
    : '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
const policyPath = 'operations/product-stewards/newsstand/ordinary-news-editorial-policy.json';
const principal = 'cloudflare-llama-independent-news-20260831';
const model = '@cf/meta/llama-4-scout-17b-16e-instruct';
const producer = JSON.parse(read(d + 'producer-review.json'));
const positive = registry.positiveExemplars.find(item => item.id === 'CQX-GOOD-NEWS-001');

const prompt = `Independently review the complete ordinary LAiDIES NewsStand article below. You are a Meta Llama reviewer running through Cloudflare Workers AI, not its OpenAI maker /root. Return your honest PASS, HOLD or REJECT. Never make prose pass merely to satisfy this request. This is exact source and reader-comprehension assessment, not browser or public verification.

EXACT COMPLETE STORY:
${read(d + 'review-text.json')}

EXACT HTML DERIVATIVE (not a browser observation):
${read(d + 'rendered-article.html')}

PRIMARY-SOURCE RESEARCH RECEIPTS. Assess only what these excerpts actually establish; provider assertions remain provider assertions:
${['source-announcement.md', 'source-consumer-faq.md', 'source-availability.md'].map(p => JSON.stringify(bind(d + p)) + '\n' + read(d + p)).join('\n\n')}

GOVERNING ORDINARY-NEWS POLICY:
${read(policyPath)}
${read('operations/product-stewards/newsstand/DAILY-MANUAL-RUNBOOK.md').split('### Ordinary-news reader explanation review')[1].split('The composer stores')[0]}

CALIBRATION. Independently identify and reject the registered defects in both known-bad examples. Use only the NEWS positive exemplar's structural strengths; do not import old facts. Registry binding ${JSON.stringify(bind(registryPath))}
${registry.negativeExemplars.map(item => JSON.stringify(item) + '\n' + read(item.path)).join('\n\n')}
${JSON.stringify(positive)}
${read(positive.path)}

MAKER RECEIPT LAST. It supplies the exact schema keys and artifact bindings, not judgments. Independently reassess every outcome, failure family and claim:
${JSON.stringify(producer, null, 2)}

Return one JSON object with keys receipt, analysis and findings.

receipt must be a complete laidies-prose-quality-review.v1 object. Set stage to INDEPENDENT_SEMANTIC_ADMISSION, maker to /root, and reviewer to {"id":"${principal}","principalId":"${principal}","role":"independent factual and reader-comprehension editor","modelFamily":"meta-llama","independentFromMaker":true,"artifactFirst":true}. Use an approximate current UTC time and do not backdate. Preserve the producer's artifact bindings and registrySha256 exactly. Independently calibrate both registered negative IDs with their failure families and exact excerpts of at least 15 characters. Use CQX-GOOD-NEWS-001 as the positive. Include all 15 producer outcome keys and all 24 producer failure-family keys, each with candidate-specific observations and exact article excerpts or locators. Never claim observed humans.

For explainBack and unseenTransfer use aiEditorialAnalysis {"evidenceType":"AI_EDITORIAL_ANALYSIS","prompt":"...","response":"...","expectedEvidence":"...","assessment":"PASS|HOLD|FAIL"}. Explain-back must restate the mechanism and consequence in ordinary language. Transfer must use a genuinely different situation that could expose a misunderstanding.

analysis must be {"evidenceType":"AI_EDITORIAL_ANALYSIS","candidateId":"${story.id}","reviewerPrincipalId":"${principal}","reviewTextSha256":"${bind(d + 'review-text.json').sha256}","checks":{...},"outcomes":{...}}. Its checks are incidentExplained, termsExplainedInContext, readerConsequenceSpecific and noInternalNotesOrInventedAdvice. Each needs verdict PASS/HOLD/FAIL, a specific observation, and artifactEvidence containing exact article excerpts of at least 15 characters. analysis.outcomes must exactly match receipt.outcomes.explainBack and receipt.outcomes.unseenTransfer.

receipt.factualReview must map every material claim to the exact supplied source bindings and source excerpts, distinguish OpenAI's own statements from independent proof, and hold unsupported meaning. receipt.newsEditorialReview is omitted because the runner binds policy and analysis mechanically. receipt.reportBinding is omitted because the runner binds the preserved raw report mechanically. Required limitations include exactly "AI editorial assessment only; no observed human-comprehension evidence is claimed." Also state that browser, native zoom and public release were not reviewed. findings must begin with material problems, or explicitly say no material problems were found, and explain the verdict. Do not request human evidence as a substitute for this review.`;

const providerPath = d + 'independent-workers-ai-provider-output.json';
if (fs.existsSync(path.join(root, providerPath))) throw new Error('Do not overwrite prior independent Workers AI output');

const response = await fetch('http://localhost:8791', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are an exacting independent newspaper editor. Return valid JSON only.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
    max_tokens: 8000,
    temperature: 0.1,
    seed: 20260831
  })
});
if (!response.ok) throw new Error(`Workers AI reviewer failed with HTTP ${response.status}`);
const provider = await response.json();
fs.writeFileSync(path.join(root, providerPath), JSON.stringify({ model, provider, promptSha256: hash(prompt) }, null, 2) + '\n');
const result = provider.response ?? provider.choices?.[0]?.message?.content;
const parsed = typeof result === 'string' ? JSON.parse(result) : result;
if (!parsed?.receipt || !parsed?.analysis || !parsed?.findings) throw new Error('No complete independent structured review');

const put = (name, value) => {
  const p = d + name;
  fs.writeFileSync(path.join(root, p), JSON.stringify(value, null, 2) + '\n');
  return bind(p);
};
const analysis = put('independent-analysis.json', parsed.analysis);
const report = put('independent-raw-report.json', {
  candidateId: story.id,
  storySha256: hash(canonical(story)),
  reviewerPrincipalId: principal,
  verdict: parsed.receipt.verdict,
  findings: parsed.findings,
  providerOutput: bind(providerPath),
  promptSha256: hash(prompt),
  actualModels: [model]
});
parsed.receipt.newsEditorialReview = { policy: bind(policyPath), analysis };
parsed.receipt.reportBinding = report;
put('independent-review.json', parsed.receipt);
console.log(JSON.stringify({ verdict: parsed.receipt.verdict, findings: parsed.findings, model }));
