import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const story = read(d + 'review-text.json');
const producer = JSON.parse(read(d + 'producer-review.json'));
const families = Object.keys(producer.failureFamilies);
const evidence = {
  E2: 'This is an announced expansion, not confirmation that every advertiser can already get in.',
  E3: 'eligible Free and Go users may see sponsored placements below responses',
  E4: 'Suppose you ask ChatGPT for somewhere to take six colleagues for lunch.',
  E7: 'its advertising system can use the current conversation to choose a relevant ad',
  E8: 'separately from the system generating the answer.',
  E10: 'That does not mean it won the comparison in the answer.',
  E12: 'Those are the company’s stated rules, not an independent audit.',
  E13: 'turning off ad personalisation does not turn off ads.',
  E15: 'A placement that fits your question is still a placement someone paid for',
  E16: 'not a recommendation you earned by giving ChatGPT a beautifully detailed brief.',
  E17: 'This story shows why the same information can matter to more than one part of a product.'
};
for (const [id, excerpt] of Object.entries(evidence)) if (!story.includes(excerpt)) throw new Error(`evidence palette mismatch ${id}`);
const prompt = `Complete a focused independent editorial review of the exact ordinary-news article below. Reassess every named failure family; do not assume the earlier PASS is correct. If a failure is present, mark it true and explain exactly where. If absent, give a candidate-specific reason rather than generic boilerplate. Also assess whether the article has coherent paragraphs, a useful ending, no internal planning notes, no unsupported balance and no invented compulsory advice.

EXACT ARTICLE:
${story}

EXACT EVIDENCE IDS:
${Object.entries(evidence).map(([id, excerpt]) => `${id}: ${excerpt}`).join('\n')}

FAILURE FAMILIES:
${families.join('\n')}

Return JSON only:
{"noInternalNotesOrInventedAdvice":{"verdict":"PASS|HOLD|FAIL","observation":"specific judgment","evidenceId":"E#"},"failureFamilies":{"family":{"present":true|false,"observation":"specific candidate-based reason","artifactLocator":"section or E#"}, ... every listed family exactly once ...}}.

Do not claim human testing. A present material failure means the noInternal check cannot be used to rescue the article.`;
const output = d + 'independent-workers-ai-v2-failure-review.json';
if (fs.existsSync(path.join(root, output))) throw new Error('Do not overwrite focused failure review');
const response = await fetch('http://localhost:8791', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({
  messages: [{ role: 'system', content: 'Return a strict independent editorial assessment as JSON only.' }, { role: 'user', content: prompt }],
  response_format: { type: 'json_object' }, max_tokens: 4200, temperature: 0, seed: 20260836
}) });
if (!response.ok) throw new Error(`focused failure review HTTP ${response.status}: ${await response.text()}`);
const wrapper = await response.json();
const raw = wrapper.response ?? wrapper.choices?.[0]?.message?.content;
const result = typeof raw === 'string' ? JSON.parse(raw) : raw;
fs.writeFileSync(path.join(root, d + 'independent-workers-ai-v2-failure-review-attempt.json'), JSON.stringify({ wrapper, result }, null, 2) + '\n');
if (JSON.stringify(Object.keys(result.failureFamilies || {}).sort()) !== JSON.stringify([...families].sort())) throw new Error('focused failure-family keys differ');
for (const [key, item] of Object.entries(result.failureFamilies)) {
  if (typeof item.present !== 'boolean' || typeof item.observation !== 'string' || !item.observation.trim() || typeof item.artifactLocator !== 'string' || !item.artifactLocator.trim()) throw new Error(`focused failure review incomplete for ${key}`);
}
const check = result.noInternalNotesOrInventedAdvice;
if (!check || !['PASS', 'HOLD', 'FAIL'].includes(check.verdict) || !evidence[check.evidenceId] || !check.observation) throw new Error('focused internal-notes check incomplete');
fs.writeFileSync(path.join(root, output), JSON.stringify({ model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', promptSha256: hash(prompt), wrapper, result, evidence }, null, 2) + '\n');
console.log(JSON.stringify({ check: check.verdict, presentFailures: Object.entries(result.failureFamilies).filter(([, item]) => item.present).map(([key]) => key) }));
