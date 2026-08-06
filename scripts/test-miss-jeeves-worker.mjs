#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from '../_worker.js';

const root = path.resolve(import.meta.dirname, '..');
const index = JSON.parse(fs.readFileSync(path.join(root, 'content/site/site-index.json'), 'utf8'));
const dailyIssues = JSON.parse(fs.readFileSync(path.join(root, 'content/newsstand-daily-issues.json'), 'utf8'));
const studyPacks = JSON.parse(fs.readFileSync(path.join(root, 'content/blend-snap-weekly-packs.json'), 'utf8'));
const calls = [];
function envWith(entries = index.entries, ai = null, signalSink = null) {
  return {
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        calls.push(url.pathname);
        if (url.pathname === '/content/site/site-index.json') return Response.json({ _meta: index._meta, entries });
        if (url.pathname === '/content/newsstand-daily-issues.json') return Response.json(dailyIssues);
        if (url.pathname === '/content/blend-snap-weekly-packs.json') return Response.json(studyPacks);
        return new Response('STATIC', { status: 200 });
      }
    },
    ...(ai ? { AI: ai } : {}),
    ...(signalSink ? { MISS_JEEVES_SIGNALS: signalSink } : {})
  };
}
async function ask(query, env = envWith(), placement = 'library') {
  return worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, placement })
  }), env);
}

const staticResponse = await worker.fetch(new Request('https://laidies.ai/library.html'), envWith());
assert.equal(await staticResponse.text(), 'STATIC', 'non-API requests must continue to Pages static assets');

const wrongMethod = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves'), envWith());
assert.equal(wrongMethod.status, 405, 'API must reject non-POST requests');

const women = await (await ask('Where can I learn about women in AI?')).json();
assert.equal(women.status, 'ok');
assert.equal(women.mode, 'retrieval');
assert.ok(women.results.some(result => result.id === 'ep-04'), 'ordinary question must retrieve Episode 04');
assert.ok(!women.results.some(result => result.url.startsWith('/grimoire/')), 'retired Grimoire routes must never escape the backend');

const promptingPack = await (await ask('Where is the Tell Me What You Want study pack?')).json();
assert.ok(
  promptingPack.results.some(result =>
    result.id === 'study-pack-02' && result.episodeId === 'ep-02' &&
    result.url === '/blend-snap.html?episode=2#the-study-pack'
  ),
  'published episode Study Packs must be concept-linked, available and deep-linkable'
);

const daily = await (await ask('What changed with European AI transparency labels?')).json();
assert.ok(
  daily.results.some(result => result.id === 'daily-eu-ai-act-transparency-starts' && result.publishedAt === '2026-08-03T22:00:00Z'),
  'an admitted published Daily story must be ingested automatically with freshness metadata'
);

const heldDaily = structuredClone(dailyIssues);
heldDaily.issues[0].stories[0].status = 'draft';
const heldDailyEnv = envWith();
heldDailyEnv.ASSETS.fetch = async request => {
  const url = new URL(request.url);
  if (url.pathname === '/content/site/site-index.json') return Response.json(index);
  if (url.pathname === '/content/newsstand-daily-issues.json') return Response.json(heldDaily);
  return new Response('STATIC');
};
const heldDailyResult = await (await ask('European AI transparency labels', heldDailyEnv)).json();
assert.ok(!heldDailyResult.results.some(result => result.id.startsWith('daily-')), 'a non-published Daily story must remain invisible');

const signals = [];
const signalSink = { writeDataPoint(point) { signals.push(point); } };
const privateQuestion = 'My employer Acme says women in AI';
const signalLeaks = (point, prohibited) => JSON.stringify(point).includes(prohibited);
assert.equal(signalLeaks({ blobs: ['unsafe-fixture', privateQuestion] }, privateQuestion), true, 'privacy test calibration must detect a deliberately leaked raw question');
await ask(privateQuestion, envWith(index.entries, null, signalSink), 'homepage');
assert.equal(signals.length, 1, 'one completed question must emit one aggregate learning signal');
assert.deepEqual(signals[0].blobs.slice(0, 5), ['miss_jeeves_answer_outcome', 'v1', 'homepage', 'related_coverage', 'women-ai-history']);
assert.equal(signalLeaks(signals, privateQuestion), false, 'raw question text must never enter the learning signal');

const gapSignals = [];
await ask('Why are chips so important to AI?', envWith(index.entries, null, { writeDataPoint(point) { gapSignals.push(point); } }));
assert.equal(gapSignals[0].blobs[4], 'compute-chips-gpus', 'a missing topic must produce a controlled gap category without retaining its wording');
assert.ok(!JSON.stringify(gapSignals).includes('Why are chips so important to AI?'), 'gap signals must not retain the raw question');

const onlyUnsafe = index.entries.filter(entry => entry.url.startsWith('/grimoire/'));
const unsafe = await (await ask('will ai take my job', envWith(onlyUnsafe))).json();
assert.equal(unsafe.status, 'not_covered', 'unsafe historical index results must fail closed');
assert.equal(unsafe.results.length, 0);

let aiPayload = null;
const ai = {
  async run(model, payload) {
    aiPayload = { model, payload };
    return { response: JSON.stringify({
      coverage: 'exact',
      answer: 'Episode 4 is the strongest place to begin because it covers women across the history of AI.',
      topic_id: 'women-ai-history',
      topic_label: 'women in AI',
      source_ids: ['ep-04']
    }) };
  }
};
const grounded = await (await ask('women in AI', envWith(index.entries, ai))).json();
assert.equal(grounded.mode, 'grounded-ai');
assert.equal(aiPayload.model, '@cf/google/gemma-4-26b-a4b-it');
assert.ok(aiPayload.payload.messages[0].content.includes('use only the supplied'));
assert.deepEqual(grounded.results.map(result => result.id), ['ep-04']);
assert.ok(!JSON.stringify(aiPayload).includes('BUTTONDOWN'));

const noCoverageAi = {
  async run() {
    return { response: JSON.stringify({
      coverage: 'none',
      answer: 'LAiDIES does not cover spreadsheet-specific chatbot selection yet.',
      topic_label: 'chatbots for spreadsheets',
      source_ids: []
    }) };
  }
};
const noCoverage = await (await ask('Which chatbot is best for spreadsheets?', envWith(index.entries, noCoverageAi))).json();
assert.equal(noCoverage.status, 'not_covered');
assert.equal(noCoverage.results.length, 0, 'semantic catalogue reasoning must reject superficial word overlap');

const relatedAi = {
  async run() {
    return { response: JSON.stringify({
      coverage: 'related',
      answer: 'The catalogue covers context windows but not their specific effect on legal work.',
      topic_label: 'context windows',
      source_ids: ['concept-context', 'book-concepts-101']
    }) };
  }
};
const related = await (await ask('How will context windows change legal work?', envWith(index.entries, relatedAi))).json();
assert.equal(related.status, 'related');
assert.equal(related.coverage, 'related');
assert.match(related.answer, /does not have an exact answer/i);
assert.deepEqual(related.results.map(result => result.id), ['concept-context', 'book-concepts-101']);

const chipsWithoutAi = await (await ask('Why are chips so important to AI?')).json();
assert.equal(chipsWithoutAi.status, 'not_covered', 'deterministic fallback must not pretend generic AI material covers chips');

const tokenWithoutAi = await (await ask('What is a token?')).json();
assert.equal(tokenWithoutAi.results[0]?.url, '/library.html#concepts-101::@book-section-token-context-window');

const invalidIndexEnv = envWith();
invalidIndexEnv.ASSETS.fetch = async () => Response.json({ _meta: {}, entries: {} });
const unavailable = await (await ask('women in AI', invalidIndexEnv)).json();
assert.equal(unavailable.status, 'unavailable');

console.log('MISS JEEVES WORKER PASS static_forward=1 arbitrary_retrieval=1 retired_routes_denied=1 grounded_ai=1 unavailable_state=1 privacy_safe_signal=1 controlled_gap_topic=1 raw_question_leak_calibration=1');
