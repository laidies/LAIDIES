import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';
import { ADVICE_MODEL, ADVICE_MAX_COMPLETION_TOKENS, ADVICE_TIMEOUT_MS,
  ADVICE_MAX_RESPONSE_BYTES, buildAdviceRequest, isCompleteAdviceCompletion,
  requestAdviceCompletion } from '../src/advice-provider.js';

const originalFetch = globalThis.fetch;
test.afterEach(() => { globalThis.fetch = originalFetch; });
const env = { OPENAI_API_KEY: 'synthetic-only' };
const messages = [{ role: 'system', content: 'Return JSON.' }, { role: 'user', content: 'Synthetic workplace question.' }];
const answer = { read: 'A specific expectation is missing.', deliverable: 'Could you give me a concrete example?',
  reasoning: ['Ask about an observable change.'], assumptions: [], unknowns: [], nextMove: 'Ask privately.',
  sources: ['specific-feedback'], aiAssist: null, asOf: null };
function completion(content = JSON.stringify(answer)) {
  return { model: ADVICE_MODEL, choices: [{ finish_reason: 'stop', message: { role: 'assistant', content, refusal: null } }] };
}
function classifier() {
  return { async classify(envelope) { return {
    schemaVersion: '1.0.0', overallConfidence: .99,
    language: { code: 'en', supported: true, confidence: .99 },
    clauses: envelope.clauses.map(c => ({ clauseId: c.id, role: c.roleHint,
      decision: c.roleHint === 'quoted_content' ? 'transform_untrusted' : 'allow',
      domain: c.roleHint === 'quoted_content' ? 'out_of_scope' : 'work_career',
      task: c.roleHint === 'quoted_content' ? 'draft_or_rewrite' : 'advice_or_conversation',
      risk: c.roleHint === 'quoted_content' ? 'sensitive' : 'ordinary',
      boundary: null, currentness: { required: false, category: 'none' }, confidence: .99,
      reasonCodes: c.roleHint === 'quoted_content' ? ['untrusted_content_isolated'] : [] }))
  }; }};
}
async function invoke(data, revision = false) {
  let calls = 0, writes = 0, payload;
  globalThis.fetch = async (_url, options) => { calls++; payload = JSON.parse(options.body); return Response.json(data); };
  const request = new Request('https://test.invalid', { method: 'POST', headers: { Origin: 'https://laidies.ai', 'Content-Type': 'application/json' },
    body: JSON.stringify(revision ? { revision: { directive: 'Make this shorter.', previousDraft: 'Could you give me a concrete example?' } } : { prompt: 'My manager gave me vague feedback. What can I say?' }) });
  const response = await worker.fetch(request, { ...env, REQUEST_CLASSIFIER: classifier(), CAREER_GUIDANCE_PILOT: '1',
    VERIFIED_IDENTITY: { async get() { return { id: 'synthetic-sol-resident', kind: 'resident' }; } },
    SUBSCRIBER_USAGE: { async get() { return '0'; }, async put() { writes++; } }
  }, { waitUntil() {} });
  return { data: await response.json(), status: response.status, calls, writes, payload };
}

test('Sol is the default: medium, reasoning-inclusive cap, no legacy sampling or tools', () => {
  function check(body) {
    assert.equal(body.model, ADVICE_MODEL); assert.equal(body.reasoning_effort, 'medium');
    assert.equal(body.max_completion_tokens, ADVICE_MAX_COMPLETION_TOKENS);
    assert.equal(body.store, false); assert.equal(body.service_tier, 'default');
    for (const key of ['max_tokens','temperature','frequency_penalty','presence_penalty','tools','previous_response_id']) assert.equal(key in body, false);
  }
  const body = buildAdviceRequest(env, messages); check(body);
  assert.deepEqual(body.messages, messages); assert.deepEqual(body.response_format, { type: 'json_object' });
  assert.throws(() => check({ ...body, max_tokens: 1500 }), /Expected values/);
  const revision = buildAdviceRequest(env, messages, false); check(revision); assert.equal('response_format' in revision, false);
  const legacy = buildAdviceRequest({ ANSWER_MODEL: 'test-answer' }, messages);
  assert.equal(legacy.max_tokens, 1500); assert.equal('reasoning_effort' in legacy, false);
});

test('complete Sol pilot answer passes existing schema and commits exactly once', async () => {
  const result = await invoke(completion());
  assert.equal(result.data.type, 'case_success'); assert.equal(result.calls, 1); assert.equal(result.writes, 1);
  assert.equal(result.payload.model, ADVICE_MODEL); assert.equal(result.payload.reasoning_effort, 'medium');
  assert.match(result.payload.messages[0].content, /CAREER GUIDANCE PILOT/);
  assert.deepEqual(result.data.answer.sources, []); assert.equal(result.data.answer.aiAssist, null);
});

test('truncation, refusal, wrong model, tool calls and missing completion metadata never spend', async () => {
  const variants = [];
  for (const finish_reason of ['length', 'content_filter', 'tool_calls', undefined]) {
    const value = completion(); value.choices[0].finish_reason = finish_reason; variants.push(value);
  }
  const refused = completion(); refused.choices[0].message.refusal = 'Cannot comply.'; variants.push(refused);
  const tool = completion(); tool.choices[0].message.tool_calls = [{ id: 'unexpected' }]; variants.push(tool);
  variants.push({ ...completion(), model: 'gpt-4.1' }, { ...completion(), choices: [] });
  for (const value of variants) {
    assert.equal(isCompleteAdviceCompletion(value, ADVICE_MODEL), false);
    const result = await invoke(value);
    assert.equal(result.data.type, 'service_error'); assert.equal(result.writes, 0); assert.equal(result.calls, 1);
  }
});

test('Sol compatibility does not weaken the final answer schema', async () => {
  const result = await invoke(completion(JSON.stringify({ ...answer, inventedField: true })));
  assert.equal(result.data.type, 'service_error'); assert.equal(result.writes, 0);
});

test('revision path uses the same Sol settings and rejects incomplete prose', async () => {
  const result = await invoke(completion('Could you give me an example?'), true);
  assert.equal(result.data.type, 'revision_success'); assert.equal(result.writes, 0);
  assert.equal(result.payload.model, ADVICE_MODEL); assert.equal(result.payload.reasoning_effort, 'medium');
  assert.equal('response_format' in result.payload, false);
  assert.match(result.payload.messages[1].content, /UNTRUSTED DRAFT CONTENT/);
  const value = completion('Incomplete but plausible advice.'); value.choices[0].finish_reason = 'length';
  const failed = await invoke(value, true);
  assert.equal(failed.data.type, 'service_error'); assert.equal(failed.writes, 0);
});

test('response byte cap rejects a large body despite a successful HTTP status', async () => {
  globalThis.fetch = async () => new Response('x'.repeat(ADVICE_MAX_RESPONSE_BYTES + 1));
  await assert.rejects(requestAdviceCompletion(env, messages), /advice_response_too_large/);
});

test('deadline includes stalled response bodies, not just arrival of headers', async t => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  let cancelled = false;
  globalThis.fetch = async () => new Response(new ReadableStream({ start() {}, cancel() { cancelled = true; } }));
  const pending = requestAdviceCompletion(env, messages);
  const rejected = assert.rejects(pending, { name: 'AbortError' });
  await Promise.resolve(); t.mock.timers.tick(ADVICE_TIMEOUT_MS); await rejected;
  assert.equal(cancelled, true);
});

test('provider failure makes one request and never silently falls back', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response('unavailable', { status: 503 }); };
  const result = await requestAdviceCompletion(env, messages);
  assert.equal(result.ok, false); assert.equal(result.status, 503); assert.equal(calls, 1);
});
