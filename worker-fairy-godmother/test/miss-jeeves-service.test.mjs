import assert from 'node:assert/strict';
import test from 'node:test';
import { applyLedgerAction } from '../src/beta-ledger-state.js';
import { missJeevesGuidance } from '../src/miss-jeeves-service.js';

const RATE_KEY = 'a'.repeat(64);
const OTHER_RATE_KEY = 'b'.repeat(64);
const ATTEMPT = '11111111-1111-4111-8111-111111111111';
const config = {
  MISS_JEEVES_RESEARCH_ENABLED: 'true',
  MISS_JEEVES_PROVIDER_LIMIT_VERIFIED: 'true',
  MISS_JEEVES_MONTHLY_CAP_MICRO_USD: '100000000',
  MISS_JEEVES_ACTOR_MONTHLY_CAP_MICRO_USD: '20000000',
  GUEST_TOKEN_SIGNING_KEY: 'guest-test-signing-key',
  IDENTITY_HASH_SALT: 'identity-test-salt',
  OPENAI_API_KEY: 'test-key'
};

function request(query = 'What is AI?', attempt = ATTEMPT, rateKey = RATE_KEY) {
  return new Request('https://miss-jeeves.internal/guidance', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-laidies-rate-key': rateKey,
      'cf-connecting-ip': '203.0.113.8',
      'user-agent': 'Miss-Jeeves service test'
    },
    body: JSON.stringify({ intent: 'research', query, researchAttemptId: attempt })
  });
}

function providerAnswer() {
  const answer = 'AI is software that finds patterns in examples and uses them to make a useful prediction or draft.';
  return Response.json({
    model: 'gpt-5.6-sol',
    usage: { input_tokens: 1000, output_tokens: 100 },
    output: [{ type: 'message', content: [{
      type: 'output_text', text: answer,
      annotations: [{ type: 'url_citation', start_index: 0, end_index: answer.length, url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes', title: 'OpenAI help' }]
    }] }]
  });
}

function fixture({ settleFailures = 0 } = {}) {
  const states = new Map();
  const calls = [];
  let remainingSettleFailures = settleFailures;
  const env = {
    ...config,
    FAIRY_BETA_LEDGER: {
      getByName(name) {
        return { async fetch(_url, options) {
          const command = JSON.parse(options.body);
          calls.push({ name, ...command });
          if (command.action === 'settleResearch' && remainingSettleFailures > 0) {
            remainingSettleFailures--;
            return Response.json({ ok: false, error: 'transient' }, { status: 503 });
          }
          const transition = applyLedgerAction(states.get(name) || null, command, Date.now());
          states.set(name, transition.state);
          return Response.json(transition.body, { status: transition.status });
        }};
      }
    }
  };
  return { env, states, calls };
}

async function withProvider(run) {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.openai.com/v1/responses');
    assert.equal(JSON.parse(options.body).model, 'gpt-5.6-sol');
    return providerAnswer();
  };
  try { await run(() => calls); } finally { globalThis.fetch = original; }
}

test('same actor and research-attempt ID never calls Sol twice, even when the query changes', async () => {
  const f = fixture();
  await withProvider(async providerCalls => {
    const first = await missJeevesGuidance(request('What is AI?'), f.env);
    assert.equal(first.status, 200);
    assert.equal((await first.json()).allowance.policy, 'adaptive.v1');
    const replay = await missJeevesGuidance(request('Explain this differently'), f.env);
    assert.equal(replay.status, 409);
    assert.equal((await replay.json()).error, 'research_attempt_already_received');
    assert.equal(providerCalls(), 1);
  });
});

test('trusted Pages rate fingerprints separate new guests while the same fingerprint remains one actor', async () => {
  const f = fixture();
  await withProvider(async providerCalls => {
    const first = await missJeevesGuidance(request(), f.env);
    const firstBody = await first.json();
    const second = await missJeevesGuidance(request('A different visitor', ATTEMPT, OTHER_RATE_KEY), f.env);
    const secondBody = await second.json();
    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.notEqual(firstBody.guestToken, secondBody.guestToken);
    assert.equal(providerCalls(), 2);
    const state = [...f.states.values()][0];
    assert.equal(Object.keys(state.researchActors).length, 2);
    const replay = await missJeevesGuidance(request('Changed words', ATTEMPT, RATE_KEY), f.env);
    assert.equal(replay.status, 409);
    assert.equal(providerCalls(), 2);
  });
});

test('a transient settlement failure retries idempotently without a second provider call', async () => {
  const f = fixture({ settleFailures: 1 });
  await withProvider(async providerCalls => {
    const response = await missJeevesGuidance(request(), f.env);
    assert.equal(response.status, 200);
    assert.equal(providerCalls(), 1);
    assert.equal(f.calls.filter(call => call.action === 'settleResearch').length, 2);
    const state = [...f.states.values()][0];
    assert.equal(state.accountingHold, undefined);
    assert.equal(state.attempts[Object.keys(state.attempts)[0]].settled, true);
  });
});

test('unconfirmed settlement holds the monthly ledger and prevents another provider call', async () => {
  const f = fixture({ settleFailures: 99 });
  await withProvider(async providerCalls => {
    const response = await missJeevesGuidance(request(), f.env);
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, 'research_accounting_unavailable');
    assert.equal(providerCalls(), 1);
    const state = [...f.states.values()][0];
    assert.equal(state.accountingHold, true);
    const next = await missJeevesGuidance(new Request('https://miss-jeeves.internal/guidance', {
      method: 'POST', headers: request().headers,
      body: JSON.stringify({ intent: 'research', query: 'A new question', researchAttemptId: '22222222-2222-4222-8222-222222222222' })
    }), f.env);
    assert.equal(next.status, 503);
    assert.equal(providerCalls(), 1);
  });
});

test('missing provider configuration is marked pre-provider and refunds the reservation', async () => {
  const f = fixture();
  delete f.env.OPENAI_API_KEY;
  const response = await missJeevesGuidance(request(), f.env);
  assert.equal(response.status, 503);
  const state = [...f.states.values()][0];
  assert.equal(state.reservedMicroUsd, 0);
  assert.equal(Object.values(state.researchActors)[0].reservedMicroUsd, 0);
  assert.equal(Object.values(state.attempts)[0].released, true);
});
