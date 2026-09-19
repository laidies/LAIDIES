#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import worker from '../_worker.js';

const root = path.resolve(import.meta.dirname, '..');
const index = JSON.parse(fs.readFileSync(path.join(root, 'content/site/miss-jeeves-index.json'), 'utf8'));
const library = fs.readFileSync(path.join(root, 'library.html'), 'utf8');
const admissionText = library.match(/\/\* LIBRARY_ADMISSION_COMPILED_START \*\/\s*([\s\S]*?)\s*\/\* LIBRARY_ADMISSION_COMPILED_END \*\//)?.[1];
assert.ok(admissionText, 'Library must embed its admitted-book source records');
const admittedBooks = JSON.parse(admissionText);
function assertIndexMatchesLibraryAdmission(candidateIndex) {
  for (const [bookId, admission] of Object.entries(admittedBooks)) {
    const rows = candidateIndex.entries.filter(entry => entry.parentId === bookId);
    assert.ok(rows.length > 0, `${bookId} must have index rows`);
    for (const row of rows) {
      assert.equal(row.artifactSha256, admission.artifactSha256, `${row.id} must match the Library admitted artifact`);
      assert.equal(row.contentVersion, admission.contentVersion, `${row.id} must match the Library admitted content version`);
    }
  }
}
const staleIndexCalibration = structuredClone(index);
const staleWorkingRow = staleIndexCalibration.entries.find(entry => entry.parentId === 'working-with-ai-101');
assert.ok(staleWorkingRow, 'Working with AI index calibration needs an admitted row');
staleWorkingRow.artifactSha256 = '0'.repeat(64);
assert.throws(() => assertIndexMatchesLibraryAdmission(staleIndexCalibration), /admitted artifact/, 'stale-index calibration must reject a mismatched book artifact');
assertIndexMatchesLibraryAdmission(index);
for (let chapter = 1; chapter <= 20; chapter += 1) {
  assert.ok(index.entries.some(entry => entry.id === `book-section-ai-fundamentals-101-chapter-${chapter}`), `AI Fundamentals chapter ${chapter} must remain directly retrievable after chapter-opening layout changes`);
}
const dailyIssues = JSON.parse(fs.readFileSync(path.join(root, 'content/newsstand-daily-issues.json'), 'utf8'));
const studyPacks = JSON.parse(fs.readFileSync(path.join(root, 'content/blend-snap-weekly-packs.json'), 'utf8'));
const calls = [];
function envWith(entries = index.entries, ai = null, signalSink = null, fairy = null) {
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
    ...(fairy ? { FAIRY_AI: fairy } : {}),
    ...(signalSink ? { MISS_JEEVES_SIGNALS: signalSink } : {})
  };
}
async function ask(query, env = envWith(), placement = 'library', intent = undefined) {
  return worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, placement, ...(intent ? { intent } : {}) })
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

const women = await (await ask('women in AI')).json();
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
assert.deepEqual(signals[0].blobs.slice(0, 5), ['miss_jeeves_answer_outcome', 'v1', 'homepage', 'not_covered', 'women-ai-history']);
assert.equal(signalLeaks(signals, privateQuestion), false, 'raw question text must never enter the learning signal');

const gapSignals = [];
await ask('Why are chips so important to AI?', envWith(index.entries, null, { writeDataPoint(point) { gapSignals.push(point); } }));
assert.equal(gapSignals[0].blobs[4], 'compute-chips-gpus', 'a missing topic must produce a controlled gap category without retaining its wording');
assert.ok(!JSON.stringify(gapSignals).includes('Why are chips so important to AI?'), 'gap signals must not retain the raw question');

const onlyUnsafe = [{
  ...index.entries.find(entry => entry.status === 'live'),
  id: 'unsafe-grimoire-calibration',
  title: 'Will AI take my job?',
  url: '/grimoire/will-ai-take-my-job.html'
}];
const isolatedUnsafeEnv = envWith(onlyUnsafe);
isolatedUnsafeEnv.ASSETS.fetch = async request => {
  const url = new URL(request.url);
  if (url.pathname === '/content/site/miss-jeeves-index.json') return Response.json({ _meta: index._meta, entries: onlyUnsafe });
  if (url.pathname === '/content/newsstand-daily-issues.json') return Response.json({ issues: [] });
  if (url.pathname === '/content/blend-snap-weekly-packs.json') return Response.json({ manifestId: 'blend-snap-weekly-packs', packs: [] });
  return new Response('STATIC');
};
const unsafe = await (await ask('will ai take my job', isolatedUnsafeEnv)).json();
assert.equal(unsafe.status, 'search_results', 'unsafe historical index results must fail closed');
assert.equal(unsafe.coverage, 'none', 'a catalogue containing only rejected historical content must have no coverage');
assert.equal(unsafe.results.length, 0, 'unsafe historical index results must remain excluded in isolation');

let aiCalls = 0;
let fairyCalls = 0;
const poisonedAi = { async run() { aiCalls += 1; throw new Error('initial search must not invoke Workers AI'); } };
const poisonedFairy = { async fetch() { fairyCalls += 1; throw new Error('initial search must not invoke FAIRY guidance'); } };
const defaultFree = await (await ask('women in AI', envWith(index.entries, poisonedAi, null, poisonedFairy))).json();
assert.equal(defaultFree.status, 'search_results');
assert.equal(defaultFree.mode, 'site-search');
assert.ok(defaultFree.results.some(result => result.id === 'ep-04'));
const explicitFree = await (await ask('How do I check an AI answer?', envWith(index.entries, poisonedAi, null, poisonedFairy), 'library', 'search')).json();
assert.equal(explicitFree.status, 'search_results');
assert.equal(explicitFree.mode, 'site-search');
assert.equal(aiCalls, 0, 'neither omitted nor explicit search intent may call Workers AI');
assert.equal(fairyCalls, 0, 'neither omitted nor explicit search intent may call FAIRY guidance');

const uncertainty = await (await ask('qzxvort blenf', envWith(index.entries, poisonedAi, null, poisonedFairy))).json();
assert.equal(uncertainty.status, 'search_results');
assert.equal(uncertainty.coverage, 'none', 'a sparse catalogue match must say so without inventing an answer');
assert.equal(uncertainty.results.length, 0);
assert.equal(aiCalls, 0);
assert.equal(fairyCalls, 0);

const wrongFormat = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves', {
  method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'women in AI'
}), envWith());
assert.equal(wrongFormat.status, 415, 'the API must reject a non-JSON request before loading the catalogue');

const chipsWithoutAi = await (await ask('Why are chips so important to AI?')).json();
assert.equal(chipsWithoutAi.status, 'search_results', 'an admitted chip section must remain searchable');
assert.ok(chipsWithoutAi.results.some(result => result.parentId === 'ai-fundamentals-101' && /chip/i.test(result.title)));

const tokenWithoutAi = await (await ask('What is a token?')).json();
assert.equal(tokenWithoutAi.coverage, 'related', 'the admitted Dictionary token entry must remain discoverable');
assert.ok(!tokenWithoutAi.results.some(result => result.url.includes('concepts-101')));
assert.ok(tokenWithoutAi.results.some(result => result.id === 'book-section-ai-dictionary-term-token' && result.url.startsWith('/library.html#ai-dictionary')));

const commonQuestions = [
  ['What is a context window?', 'book-section-ai-dictionary-term-context-window'],
  ['Can I upload a work document?', 'book-section-working-with-ai-101-chapter-2-giving-it-what-it-needs-without-drowning-it-2-4-upload-paste-or-describe'],
  ['How do I check an AI answer?', 'book-section-working-with-ai-101-chapter-11-is-this-output-actually-good-11-3-a-practical-evaluation-framework'],
  ['What can AI help me do at work?', 'book-section-working-with-ai-101-chapter-8-what-ai-is-great-at-and-what-it-isnt-8-2-what-ai-is-genuinely-good-at']
];
for (const [question, expectedFirstId] of commonQuestions) {
  const result = await (await ask(question, envWith(index.entries, poisonedAi, null, poisonedFairy))).json();
  assert.equal(result.status, 'search_results', `${question} must use the free catalogue path`);
  assert.equal(result.mode, 'site-search');
  assert.equal(result.coverage, 'related');
  assert.match(result.topic_id, /^[a-z0-9-]+$/, `${question} must expose only a controlled topic ID`);
  assert.equal(result.results[0]?.id, expectedFirstId, `${question} must lead with its current admitted section`);
}
assert.equal(aiCalls, 0);
assert.equal(fairyCalls, 0);

const contextResult = await (await ask('What is a context window?')).json();
assert.deepEqual(contextResult.results.map(result => result.id), ['book-section-ai-dictionary-term-context-window'], 'A featured definition must return its exact entry without unrelated context-engineering guidance');

const heldExcerpt = await (await ask('Context Engineering', envWith())).json();
assert.ok(!heldExcerpt.results.some(result => result.id === 'book-section-ai-fundamentals-101-ch-15-15-3-context-engineering-mid-2025-everything-it-can-see'), 'Known unsupported percentage excerpt must stay out of search until source correction');

const homepageHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const homepageExamples = [...homepageHtml.matchAll(/href="\/library\.html#miss-jeeves\?q=([^"]+)"/g)].map(match => new URLSearchParams('q=' + match[1].replaceAll('&amp;', '&')).get('q'));
assert.equal(homepageExamples.length, 3, 'Three homepage examples remain available');
for (const question of homepageExamples) {
  const result = await (await ask(question, envWith(), 'homepage')).json();
  assert.ok(result.results.length > 0, `Promoted homepage example must reach useful current material: ${question}`);
}

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

console.log('MISS JEEVES WORKER PASS static_forward=1 rendered_book_no_transform=1 free_search_default_and_explicit=1 no_ai_or_fairy_calls=1 sparse_coverage=1 wrong_format=1 retired_routes_denied=1 unavailable_state=1 privacy_safe_signal=1 controlled_gap_topic=1 raw_question_leak_calibration=1');
