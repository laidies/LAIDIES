#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from '../_worker.js';

const root = path.resolve(import.meta.dirname, '..');
const index = JSON.parse(fs.readFileSync(path.join(root, 'content/site/miss-jeeves-index.json'), 'utf8'));
for (let chapter = 1; chapter <= 20; chapter += 1) {
  assert.ok(index.entries.some(entry => entry.id === `book-section-ai-fundamentals-101-chapter-${chapter}`), `AI Fundamentals chapter ${chapter} must remain directly retrievable after chapter-opening layout changes`);
}
const publicRoot=process.env.LAIDIES_PUBLIC_ROOT || root;
const dailyIssues = JSON.parse(fs.readFileSync(path.join(publicRoot, 'content/newsstand-daily-issues.json'), 'utf8'));
const studyPacks = JSON.parse(fs.readFileSync(path.join(publicRoot, 'content/blend-snap-weekly-packs.json'), 'utf8'));
const calls = [];
function envWith(entries = index.entries, ai = null, signalSink = null) {
  return {
    ASSETS: {
      async fetch(request) {
        const url = new URL(request.url);
        calls.push(url.pathname);
        if (url.pathname === '/content/site/miss-jeeves-index.json') return Response.json({ _meta: index._meta, entries });
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

const renderedBookResponse = await worker.fetch(new Request('https://laidies.ai/content/library-books/rendered/ai-fundamentals-101.html'), envWith());
assert.equal(await renderedBookResponse.text(), 'STATIC', 'rendered books must continue to Pages static assets');
assert.match(renderedBookResponse.headers.get('cache-control') || '', /(?:^|,\s*)no-transform(?:,|$)/, 'rendered books must prevent provider HTML rewriting');

const wrongMethod = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves'), envWith());
assert.equal(wrongMethod.status, 405, 'API must reject non-POST requests');

const privateSearch = await ask('My password: secret-1234');
assert.equal(privateSearch.status, 400, 'private-content calibration fixture must be rejected before retrieval or AI');

const women = await (await ask('Where can I learn about women in AI?')).json();
assert.equal(women.status, 'search_results');
assert.equal(women.mode, 'site-search');
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
const heldDailyIssue = heldDaily.issues.find(issue =>
  issue.stories?.some(story => story.id === 'eu-ai-act-transparency-starts')
);
assert.ok(heldDailyIssue, 'the exact Daily fixture story must exist before hold calibration');
const heldDailyStory = heldDailyIssue.stories.find(story => story.id === 'eu-ai-act-transparency-starts');
heldDailyStory.status = 'draft';
const heldDailyEnv = envWith();
heldDailyEnv.ASSETS.fetch = async request => {
  const url = new URL(request.url);
  if (url.pathname === '/content/site/miss-jeeves-index.json') return Response.json(index);
  if (url.pathname === '/content/newsstand-daily-issues.json') return Response.json(heldDaily);
  return new Response('STATIC');
};
const heldDailyResult = await (await ask('European AI transparency labels', heldDailyEnv)).json();
assert.ok(
  !heldDailyResult.results.some(result => result.id === 'daily-eu-ai-act-transparency-starts'),
  'the exact non-published Daily story must remain invisible'
);

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
assert.equal(unsafe.status, 'search_results', 'unsafe historical index results must fail closed');
assert.ok(!unsafe.results.some(result=>result.url.startsWith('/grimoire/')));

const forbiddenAi = { async run(){ throw new Error('Free search must never invoke an AI model'); } };
const grounded = await (await ask('women in AI', envWith(index.entries, forbiddenAi))).json();
assert.equal(grounded.mode, 'site-search');
assert.ok(grounded.results.some(result=>result.id==='ep-04'));
const related = await (await ask('How will context windows change legal work?', envWith(index.entries, forbiddenAi))).json();
assert.equal(related.coverage, 'related', 'retrieval must not claim its references fully answer a question');
assert.ok(related.results.some(result => result.parentId === 'ai-fundamentals-101'));
assert.equal(related.research_available,true);
const chips = await (await ask('Why are chips so important to AI?')).json();
assert.ok(chips.results.some(result => result.parentId === 'ai-fundamentals-101' && /chip/i.test(result.title)));
const token = await (await ask('What is a token?')).json();
assert.ok(!token.results.some(result => result.url.includes('concepts-101')));
assert.ok(token.results.some(result => result.id === 'book-section-ai-dictionary-term-token'));
for(const question of ['Which AI should I use?','Can I upload a work document?','How do I check an AI answer?','What can AI help me do at work?']) {
  const intended=index.entries.find(entry=>entry.aliases.includes(question));
  assert.ok(intended,question);
  const result=await (await ask(question)).json();
  assert.equal(result.coverage,'related');
  assert.equal(result.results[0]?.id,intended.id,question+' preserves intended first route');
  assert.equal(result.research_available,true);
}
const upload=index.entries.find(entry=>entry.aliases.includes('Can I upload a work document?'));
assert.match(upload.sourceText,/If you cannot answer the first three/i,'complete source retains stopping condition');
assert.match(upload.sourceText,/Once the information is allowed/i,'format choice retains prerequisite');
assert.match(upload.url,/chapter-2-giving-it/,'source route binds current book anchor');
assert.equal(upload.contentVersion,'working-with-ai-101-2026-08-29.1');

const restoredRejectedConcepts = structuredClone(index.entries);
restoredRejectedConcepts.push({
  id: 'book-concepts-101', title: 'Concepts 101', url: '/library.html#concepts-101',
  type: '101', section: 'The 101s', status: 'live', summary: 'Rejected fixture',
  topics: ['context window'], aliases: ['what is a context window']
});
const restoredRejected = await (await ask('What is a context window?', envWith(restoredRejectedConcepts))).json();
assert.ok(!restoredRejected.results.some(result => result.id === 'book-concepts-101'), 'restored rejected Concepts identity must fail closed');

const invalidIndexEnv = envWith();
invalidIndexEnv.ASSETS.fetch = async () => Response.json({ _meta: {}, entries: {} });
const unavailable = await (await ask('women in AI', invalidIndexEnv)).json();
assert.equal(unavailable.status, 'unavailable');

console.log('MISS JEEVES WORKER PASS static_forward=1 rendered_book_no_transform=1 arbitrary_retrieval=1 retired_routes_denied=1 free_search_no_ai=1 unavailable_state=1 privacy_safe_signal=1 controlled_gap_topic=1 raw_question_leak_calibration=1');
