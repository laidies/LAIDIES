import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const story = read(d + 'review-text.json');
const policy = read('operations/product-stewards/newsstand/ordinary-news-editorial-policy.json');
const evidence = {
  E2: 'This is an announced expansion, not confirmation that every advertiser can already get in.',
  E7: 'its advertising system can use the current conversation to choose a relevant ad',
  E8: 'separately from the system generating the answer.',
  E10: 'That does not mean it won the comparison in the answer.',
  E12: 'Those are the company’s stated rules, not an independent audit.',
  E13: 'turning off ad personalisation does not turn off ads.',
  E15: 'A placement that fits your question is still a placement someone paid for'
};
for (const [id, excerpt] of Object.entries(evidence)) if (!story.includes(excerpt)) throw new Error(`evidence palette mismatch ${id}`);
const prompt = `Independently perform only the explain-back and unseen-transfer review for this ordinary LAiDIES news article. Do not reuse the article's restaurant/lunch example for unseen transfer. No observed human reader is claimed.

ARTICLE:
${story}

POLICY:
${policy}

EXACT EVIDENCE IDs:
${Object.entries(evidence).map(([id, excerpt]) => `${id}: ${excerpt}`).join('\n')}

Return JSON only:
{"explainBack":{"verdict":"PASS|HOLD|FAIL","observation":"specific independent judgment","evidenceId":"E#","aiEditorialAnalysis":{"evidenceType":"AI_EDITORIAL_ANALYSIS","prompt":"Ask for an ordinary-language restatement","response":"Your own concise restatement of what changed, how paid placement differs from the answer, and the reader consequence","expectedEvidence":"What a correct restatement must include","assessment":"PASS|HOLD|FAIL"}},"unseenTransfer":{"verdict":"PASS|HOLD|FAIL","observation":"specific independent judgment","evidenceId":"E#","aiEditorialAnalysis":{"evidenceType":"AI_EDITORIAL_ANALYSIS","prompt":"A genuinely different scenario about a sponsored option appearing during another kind of decision; ask what can and cannot be concluded","response":"Your own correct answer applying current-chat targeting, paid placement versus recommendation, and provider-claim limits","expectedEvidence":"What a correct transfer must include","assessment":"PASS|HOLD|FAIL"}}}.

PASS only if the article gives enough information to answer both without importing outside facts. unseenTransfer must not mention restaurants, lunch or colleagues.`;

const output = d + 'independent-workers-ai-v2-transfer-correction.json';
if (fs.existsSync(path.join(root, output))) throw new Error('Do not overwrite focused outcome review');
const response = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
  messages: [{ role: 'system', content: 'Return a strict independent editorial assessment as JSON only.' }, { role: 'user', content: prompt }],
  response_format: { type: 'json_object' }, max_tokens: 1400, temperature: 0, seed: 20260835
}) });
if (!response.ok) throw new Error(`focused outcome review HTTP ${response.status}: ${await response.text()}`);
const wrapper = await response.json();
const raw = wrapper.response ?? wrapper.choices?.[0]?.message?.content;
const result = typeof raw === 'string' ? JSON.parse(raw) : raw;
for (const key of ['explainBack', 'unseenTransfer']) {
  const item = result[key];
  if (!item || !['PASS', 'HOLD', 'FAIL'].includes(item.verdict) || !evidence[item.evidenceId]) throw new Error(`${key} focused review is incomplete`);
  if (item.aiEditorialAnalysis?.evidenceType !== 'AI_EDITORIAL_ANALYSIS' || item.aiEditorialAnalysis.assessment !== item.verdict) throw new Error(`${key} focused analysis mismatch`);
}
const transferText = JSON.stringify(result.unseenTransfer).toLowerCase();
if (/(restaurant|lunch|colleague)/.test(transferText)) throw new Error('unseen transfer reused the article example');
fs.writeFileSync(path.join(root, output), JSON.stringify({ model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', promptSha256: hash(prompt), wrapper, result, evidence }, null, 2) + '\n');
console.log(JSON.stringify({ explainBack: result.explainBack.verdict, unseenTransfer: result.unseenTransfer.verdict }));
