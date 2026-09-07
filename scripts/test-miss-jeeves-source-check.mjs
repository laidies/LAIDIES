import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {sourceDigestFor} from './lib/miss-jeeves-answer-bank.mjs';
import {extractReviewedSource, reviewedSourceContentDigest, checkReviewedSources} from './lib/miss-jeeves-source-check.mjs';

const sourceRoot = new URL('../operations/product-stewards/library/answer-bank-preview-20260907/sources/', import.meta.url);
const fixtures = [
  { url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?c=caelum', file: 'prompting.html', type: 'text/html', extractor: 'claude-doc-article.v1' },
  { url: 'https://www.cyber.gc.ca/en/guidance/generative-artificial-intelligence-ai-itsap00041', file: 'cyber-canada-current.html', type: 'text/html', extractor: 'cyber-canada-article.v1' },
  { url: 'https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/gd_principles_ai?wbdisable=true', file: 'opc.html', type: 'text/html', extractor: 'opc-canada-main.v1' },
  { url: 'https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf', file: 'openai-hallucinations.pdf', type: 'application/pdf', extractor: 'openai-paper-bytes.v1' }
];
const bytesByUrl = new Map(await Promise.all(fixtures.map(async fixture => [fixture.url, new Uint8Array(await fs.readFile(new URL(fixture.file, sourceRoot)))])));
for (const fixture of fixtures.filter(({ type }) => type === 'text/html')) {
  const text = new TextDecoder().decode(bytesByUrl.get(fixture.url));
  assert.ok(extractReviewedSource(text, fixture.extractor).length >= 1000, `${fixture.file} must exercise its reviewed extraction boundary`);
}
const sources = await Promise.all(fixtures.map(async fixture => ({ url: fixture.url, title: fixture.file, contentDigest: await reviewedSourceContentDigest(fixture.url, bytesByUrl.get(fixture.url)) })));
const input = { sources, sourceDigest: await sourceDigestFor(sources) };
const fixtureFetch = async url => {
  const fixture = fixtures.find(candidate => candidate.url === url);
  assert.ok(fixture, `fixture URL requested: ${url}`);
  return new Response(bytesByUrl.get(url), { status: 200, headers: { 'content-type': fixture.type } });
};
assert.equal((await checkReviewedSources(input, { fetchImpl: fixtureFetch })).current, true, 'all four archived sources must recheck');

const cyber = fixtures[1];
const changedHtml = new TextDecoder().decode(bytesByUrl.get(cyber.url)).replace('queries or prompts', 'queries and prompts');
assert.notEqual(changedHtml, new TextDecoder().decode(bytesByUrl.get(cyber.url)), 'HTML calibration must mutate fixture bytes');
assert.equal((await checkReviewedSources(input, { fetchImpl: async url => url === cyber.url ? new Response(changedHtml, { headers: { 'content-type': 'text/html' } }) : fixtureFetch(url) })).current, false, 'changed extracted HTML must fail its stored digest');

const paper = fixtures[3];
const changedPdf = new Uint8Array(bytesByUrl.get(paper.url));
changedPdf[changedPdf.length - 1] ^= 1;
assert.equal((await checkReviewedSources(input, { fetchImpl: async url => url === paper.url ? new Response(changedPdf, { headers: { 'content-type': 'application/pdf' } }) : fixtureFetch(url) })).current, false, 'changed PDF bytes must fail their stored digest');

for (const [name, fetchImpl] of [
  ['blocked', async () => new Response('', { status: 403 })],
  ['redirected approved URL', async () => new Response('', { status: 302, headers: { location: 'https://example.org/' } })],
  ['wrong content type', async () => new Response('<article>wrong</article>', { headers: { 'content-type': 'application/json' } })],
  ['malformed reviewed boundary', async () => new Response('<main>template changed</main>', { headers: { 'content-type': 'text/html' } })],
  ['oversized body', async () => new Response('x'.repeat(1500001), { headers: { 'content-type': 'text/html' } })],
  ['network error', async () => { throw Error('offline'); }]
]) assert.equal((await checkReviewedSources(input, { fetchImpl })).current, false, name);

assert.equal((await checkReviewedSources({ ...input, sources: [{ ...sources[0], url: 'https://example.org/redirected-source' }] }, { fetchImpl: async () => { throw Error('unknown URL must not be fetched'); } })).current, false, 'unknown or redirected URLs fail closed before fetch');
const neverSettles = async (_url, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new Error('aborted'))));
const started = Date.now();
assert.equal((await checkReviewedSources(input, { fetchImpl: neverSettles, timeoutMs: 25 })).current, false, 'timeout must fail closed');
assert.ok(Date.now() - started < 1000, 'timeout cancellation must not hang');

if (process.argv.includes('--live')) {
  const live = await checkReviewedSources(input);
  assert.equal(live.current, true, 'all four direct live rechecks must match archived reviewed content');
}
console.log(`PASS source freshness: archived_sources=4 altered_html=1 altered_pdf=1 calibrated_rejections=8 timeout_bound=1 live=${process.argv.includes('--live') ? 'passed' : 'skipped'}`);
