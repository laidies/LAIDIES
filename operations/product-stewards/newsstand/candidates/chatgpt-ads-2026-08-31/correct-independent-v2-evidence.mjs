import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const d = 'operations/product-stewards/newsstand/candidates/chatgpt-ads-2026-08-31/';
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const provider = JSON.parse(read(d + 'independent-workers-ai-v2-provider-output.json'));
const raw = provider.provider.response ?? provider.provider.choices?.[0]?.message?.content;
const judgment = typeof raw === 'string' ? JSON.parse(raw) : raw;
const storyBody = read(d + 'review-text.json');
const badBody = read('operations/product-stewards/learning-content-ecosystem/quality-exemplars/ai-fundamentals-101-chapter-1-known-bad.txt');
const invalid = [];
for (const [section, object] of [['checks', judgment.checks], ['outcomes', judgment.outcomes]]) {
  for (const [key, value] of Object.entries(object || {})) {
    if ((value.artifactEvidence || []).some(item => !storyBody.includes(item.excerpt))) invalid.push(`${section}.${key}`);
  }
}
const palette = {
  E1: 'OpenAI announced on August 31 that more businesses',
  E2: 'This is an announced expansion, not confirmation that every advertiser can already get in.',
  E3: 'eligible Free and Go users may see sponsored placements below responses',
  E4: 'Suppose you ask ChatGPT for somewhere to take six colleagues for lunch.',
  E5: 'You mention the neighbourhood and budget.',
  E6: 'information about what you need.',
  E7: 'its advertising system can use the current conversation to choose a relevant ad',
  E8: 'separately from the system generating the answer.',
  E9: 'A restaurant could therefore pay to appear beside that lunch discussion.',
  E10: 'That does not mean it won the comparison in the answer.',
  E11: 'OpenAI says advertisers cannot alter the response',
  E12: 'Those are the company’s stated rules, not an independent audit.',
  E13: 'turning off ad personalisation does not turn off ads.',
  E14: 'switching off personalisation stops it drawing on broader activity',
  E15: 'A placement that fits your question is still a placement someone paid for',
  E16: 'not a recommendation you earned by giving ChatGPT a beautifully detailed brief.',
  E17: 'This story shows why the same information can matter to more than one part of a product.',
  B1: 'An AI system receives input and produces an output such as content, a prediction, a recommendation or a decision.'
};
for (const [id, excerpt] of Object.entries(palette)) {
  const body = id === 'B1' ? badBody : storyBody;
  if (!body.includes(excerpt)) throw new Error(`internal evidence palette mismatch ${id}`);
}
const prompt = `You are correcting quotation locators in your own independent review. Do not change any verdict, observation, finding or assessment. Choose exact evidence IDs only.

The following review keys used paraphrases where exact quotations were required:
${invalid.join('\n')}

For every listed key, choose the evidence ID whose exact quotation genuinely supports that existing judgment. Reuse IDs when appropriate. calibration.CQX-BAD-001 must use B1. Do not write or paraphrase quotations.

EVIDENCE PALETTE:
${Object.entries(palette).map(([id, excerpt]) => `${id}: ${excerpt}`).join('\n')}

Return JSON only: {"choices":{"checks.incidentExplained":"E1", ... all listed keys ..., "calibration.CQX-BAD-001":"B1"}}.`;

const outputPath = d + 'independent-workers-ai-v2-evidence-correction.json';
if (fs.existsSync(path.join(root, outputPath))) throw new Error('Do not overwrite evidence correction');
const response = await fetch('http://localhost:8791', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ messages: [
    { role: 'system', content: 'Return exact copied quotations in valid JSON only. Never paraphrase evidence.' },
    { role: 'user', content: prompt }
  ], response_format: { type: 'json_object' }, max_tokens: 2500, temperature: 0, seed: 20260834 })
});
if (!response.ok) throw new Error(`Evidence correction failed HTTP ${response.status}: ${await response.text()}`);
const wrapper = await response.json();
const answer = wrapper.response ?? wrapper.choices?.[0]?.message?.content;
const selected = typeof answer === 'string' ? JSON.parse(answer) : answer;
const expected = [...invalid, 'calibration.CQX-BAD-001'].sort();
const actual = Object.keys(selected.choices || {}).sort();
if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`replacement keys differ: ${actual.join(', ')}`);
const correction = { replacements: {} };
for (const [key, id] of Object.entries(selected.choices)) {
  if (!palette[id] || (key === 'calibration.CQX-BAD-001') !== (id === 'B1')) throw new Error(`invalid evidence choice ${key}=${id}`);
  const item = { excerpt: palette[id], locator: id };
  const body = key === 'calibration.CQX-BAD-001' ? badBody : storyBody;
  if (typeof item.excerpt !== 'string' || item.excerpt.length < 15 || !body.includes(item.excerpt)) throw new Error(`non-exact replacement for ${key}: ${item.excerpt}`);
  correction.replacements[key] = item;
}
fs.writeFileSync(path.join(root, outputPath), JSON.stringify({ model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast', promptSha256: hash(prompt), wrapper, selected, correction }, null, 2) + '\n');
console.log(JSON.stringify({ corrected: actual }));
