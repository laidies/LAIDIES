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
const dailyIssues = JSON.parse(fs.readFileSync(path.join(root, 'content/newsstand-daily-issues.json'), 'utf8'));
const studyPacks = JSON.parse(fs.readFileSync(path.join(root, 'content/blend-snap-weekly-packs.json'), 'utf8'));
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

const feedbackSignals = [];
const feedbackEnv = envWith(index.entries, null, { writeDataPoint(point) { feedbackSignals.push(point); } });
const feedbackResponse = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/feedback', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    answer_id: 'a'.repeat(64),
    rating: 'not_helpful',
    reasons: ['confusing_or_too_technical', 'missed_context', 'seemed_like_ai_slop'],
    placement: 'homepage'
  })
}), feedbackEnv);
assert.equal(feedbackResponse.status, 202, 'multiple feedback issues must be accepted together');
assert.deepEqual(feedbackSignals[0].blobs, ['miss_jeeves_answer_feedback', 'v2', 'homepage', 'not_helpful', 'a'.repeat(64), 'confusing_or_too_technical', 'missed_context', 'seemed_like_ai_slop']);
const invalidFeedback = await worker.fetch(new Request('https://laidies.ai/api/miss-jeeves/feedback', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ answer_id: 'b'.repeat(64), rating: 'not_helpful', reasons: [] })
}), feedbackEnv);
assert.equal(invalidFeedback.status, 400, 'not-helpful feedback must include at least one selected issue');

const privateSearch = await ask('My password: secret-1234');
assert.equal(privateSearch.status, 400, 'private-content calibration fixture must be rejected before retrieval or AI');

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
const unsafeEnv = envWith(onlyUnsafe);
unsafeEnv.ASSETS.fetch = async request => {
  const url = new URL(request.url);
  if (url.pathname === '/content/site/miss-jeeves-index.json') return Response.json({ _meta: index._meta, entries: onlyUnsafe });
  if (url.pathname === '/content/newsstand-daily-issues.json') return Response.json({ issues: [] });
  if (url.pathname === '/content/blend-snap-weekly-packs.json') return Response.json({ manifestId: 'blend-snap-weekly-packs', packs: [] });
  return new Response('STATIC');
};
const unsafe = await (await ask('will ai take my job', unsafeEnv)).json();
assert.equal(unsafe.status, 'not_covered', 'unsafe historical index results must fail closed');
assert.equal(unsafe.results.length, 0);

let aiPayload = null;
const ai = {
  async run(model, payload) {
    aiPayload = { model, payload };
    return { response: {
      coverage: 'exact',
      answer: 'Episode 4 is the strongest place to begin because it covers women across the history of AI.',
      topic_id: 'women-ai-history',
      topic_label: 'women in AI',
      source_ids: ['ep-04']
    } };
  }
};
const grounded = await (await ask('women in AI', envWith(index.entries, ai))).json();
assert.equal(grounded.mode, 'grounded-ai');
assert.equal(aiPayload.model, '@cf/meta/llama-3.1-8b-instruct-fp8-fast');
assert.ok(aiPayload.payload.messages[0].content.includes('use only the supplied'));

let serviceRequest = null;
const serviceEnv = envWith(index.entries);
serviceEnv.FAIRY_AI = {
  async fetch(request) {
    serviceRequest = request;
    const answer = 'Nvidia is widely discussed because its chips and software are central to many current AI systems.';
    return Response.json({
      status: 'ok',
      model: 'gpt-5.6-sol',
      source_policy_version: '2026-09-04',
      output: [{ type: 'message', content: [{
        type: 'output_text', text: answer,
        annotations: [{ type: 'url_citation', url: 'https://www.nvidia.com/en-us/data-center/', title: 'Nvidia data center' }]
      }] }]
    });
  }
};
const current = await (await ask('Why is everyone talking about Nvidia?', serviceEnv, 'homepage')).json();
assert.equal(current.mode, 'current-guidance');
assert.equal(current.current_guidance_status, 'checked');
assert.equal(current.current_guidance.model, 'gpt-5.6-sol');
assert.deepEqual(current.citations, [{ url: 'https://www.nvidia.com/en-us/data-center/', title: 'Nvidia data center' }]);
assert.ok(current.results.some(result => /nvidia/i.test(`${result.title} ${result.summary}`)));
assert.match(serviceRequest.headers.get('x-laidies-rate-key') || '', /^[a-f0-9]{64}$/);
assert.equal(new URL(serviceRequest.url).hostname, 'miss-jeeves.internal');
assert.equal(aiPayload.payload.max_tokens, 300, 'catalogue reasoning must have a bounded output budget');
assert.deepEqual(aiPayload.payload.response_format, { type: 'json_object' }, 'catalogue reasoning must request structured JSON');
assert.deepEqual(grounded.results.map(result => result.id), ['ep-04']);
assert.ok(!JSON.stringify(aiPayload).includes('BUTTONDOWN'));

const huggingFace = await (await ask('What is Hugging Face, and why is it all over the news?', serviceEnv, 'homepage')).json();
const huggingFaceContext = JSON.parse(serviceRequest ? await serviceRequest.clone().text() : '{}').related_laidies_material || [];
assert.ok(huggingFaceContext.some(item => /Agentic AI/i.test(item.title)), 'Hugging Face guidance must receive the Agentic AI teaching anchor');
assert.ok(huggingFaceContext.some(item => /Sandbox/i.test(item.title)), 'Hugging Face guidance must receive the sandbox teaching anchor');
assert.ok(huggingFace.results.some(result => result.id === 'book-section-ai-fundamentals-101-ch-2-2-5-variations-within-the-family-size-openness-and-thinking'), 'Hugging Face results must include the openness lesson');
assert.ok(huggingFace.results.some(result => result.id === 'book-section-ai-fundamentals-101-ch-13-13-2-what-a-sandbox-actually-is'), 'Hugging Face results must include the sandbox lesson');

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
      source_ids: ['book-section-ai-fundamentals-101-ch-4-4-4-context-windows-the-systems-working-memory']
    }) };
  }
};
const related = await (await ask('How will context windows change legal work?', envWith(index.entries, relatedAi))).json();
assert.equal(related.status, 'related', 'admitted Library books may provide clearly labelled related coverage');
assert.ok(related.results.some(result => result.parentId === 'ai-fundamentals-101'));

const chipsWithoutAi = await (await ask('Why are chips so important to AI?')).json();
assert.equal(chipsWithoutAi.status, 'ok', 'an exact admitted chip section must answer the direct chip question');
assert.ok(chipsWithoutAi.results.some(result => result.parentId === 'ai-fundamentals-101' && /chip/i.test(result.title)));

const tokenWithoutAi = await (await ask('What is a token?')).json();
assert.equal(tokenWithoutAi.coverage, 'exact', 'the admitted Dictionary token entry must provide exact current coverage');
assert.ok(!tokenWithoutAi.results.some(result => result.url.includes('concepts-101')));
assert.ok(tokenWithoutAi.results.some(result => result.id === 'book-section-ai-dictionary-term-token' && result.url.startsWith('/library.html#ai-dictionary')));

const commonQuestions = [
  ['Which AI should I use?', 'book-section-working-with-ai-101-chapter-7'],
  ['Can I upload a work document?', 'book-section-working-with-ai-101-4-4-upload-paste-or-describe'],
  ['How do I check an AI answer?', 'book-section-working-with-ai-101-11-3-a-practical-evaluation-framework'],
  ['What can AI help me do at work?', 'book-section-working-with-ai-101-8-2-what-ai-is-genuinely-good-at']
];
for (const [question, expectedFirstId] of commonQuestions) {
  const result = await (await ask(question)).json();
  assert.equal(result.coverage, 'exact', `${question} must have exact governed coverage`);
  assert.match(result.topic_id, /^[a-z0-9-]+$/, `${question} must expose only a controlled topic ID`);
  assert.equal(result.results[0]?.id, expectedFirstId, `${question} must lead with its intended book section`);
}

const alternateExactAi = {
  async run() {
    return { response: {
      coverage: 'exact',
      answer: 'The catalogue has practical guidance for checking an AI answer.',
      topic_id: 'verification-misinformation',
      topic_label: 'checking AI answers',
      source_ids: ['book-section-ai-fundamentals-101-ch-11-11-8-the-trust-framework-when-to-trust-ai-output']
    } };
  }
};
const designedCommonRoute = await (await ask('How do I check an AI answer?', envWith(index.entries, alternateExactAi))).json();
assert.equal(designedCommonRoute.mode, 'grounded-ai');
assert.equal(
  designedCommonRoute.results[0]?.id,
  'book-section-working-with-ai-101-11-3-a-practical-evaluation-framework',
  'grounded reasoning must preserve the designed first route for a published common question'
);

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

console.log('MISS JEEVES WORKER PASS static_forward=1 rendered_book_no_transform=1 arbitrary_retrieval=1 retired_routes_denied=1 grounded_ai=1 unavailable_state=1 privacy_safe_signal=1 controlled_gap_topic=1 raw_question_leak_calibration=1');
