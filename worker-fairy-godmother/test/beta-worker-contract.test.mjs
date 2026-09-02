import assert from "node:assert/strict";
import { timingSafeEqual } from "node:crypto";
import test from "node:test";

import worker from "../src/index.js";
import { ADVICE_MODEL } from "../src/advice-provider.js";
import { applyLedgerAction } from "../src/beta-ledger-state.js";

const originalFetch = globalThis.fetch;
const originalTimingSafeEqual = crypto.subtle.timingSafeEqual;

test.before(() => {
  if (!crypto.subtle.timingSafeEqual) {
    Object.defineProperty(crypto.subtle, "timingSafeEqual", {
      configurable: true,
      value(left, right) { return timingSafeEqual(Buffer.from(left), Buffer.from(right)); }
    });
  }
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (!originalTimingSafeEqual) delete crypto.subtle.timingSafeEqual;
});

function classifier() {
  return { async classify(envelope) { return {
    schemaVersion: "1.0.0", overallConfidence: 0.99,
    language: { code: "en", supported: true, confidence: 0.99 },
    clauses: envelope.clauses.map((clause) => ({
      clauseId: clause.id, role: clause.roleHint,
      decision: clause.roleHint === "quoted_content" ? "transform_untrusted" : "allow",
      domain: clause.roleHint === "quoted_content" ? "out_of_scope" : "work_career",
      task: clause.roleHint === "quoted_content" ? "draft_or_rewrite" : "advice_or_conversation",
      risk: clause.roleHint === "quoted_content" ? "sensitive" : "ordinary",
      boundary: null, currentness: { required: false, category: "none" }, confidence: 0.99,
      reasonCodes: clause.roleHint === "quoted_content" ? ["untrusted_content_isolated"] : []
    }))
  }; } };
}

class MemoryLedgerNamespace {
  constructor() { this.states = new Map(); }
  getByName(name) {
    return { fetch: async (_url, options) => {
      const command = JSON.parse(options.body);
      const transition = applyLedgerAction(this.states.get(name) || null, command, 1_800_000_000_000);
      if (transition.state) this.states.set(name, transition.state);
      return Response.json(transition.body, { status: transition.status });
    } };
  }
}

function env(overrides = {}) {
  return {
    FAIRY_BETA_ENABLED: "true",
    FAIRY_DAILY_CAP_MICRO_USD: "10000000",
    FAIRY_ATTEMPT_RESERVATION_MICRO_USD: "500000",
    GUEST_TOKEN_SIGNING_KEY: "guest-secret-that-is-only-a-test-value",
    IDENTITY_HASH_SALT: "resident-salt-that-is-only-a-test-value",
    SUPABASE_URL: "https://identity.test",
    SUPABASE_PUBLISHABLE_KEY: "public-test-key",
    OPENAI_API_KEY: "answer-test-key",
    CLASSIFIER_MODEL: "unused-with-test-adapter",
    REQUEST_CLASSIFIER: classifier(),
    RATE_LIMITER: { async limit() { return { success: true }; } },
    FAIRY_BETA_LEDGER: new MemoryLedgerNamespace(),
    ...overrides
  };
}

function request(body, { token = "", qaToken = "", ip = "192.0.2.1", authorization = "" } = {}) {
  const headers = { "Content-Type": "application/json", Origin: "https://laidies.ai",
    "CF-Connecting-IP": ip, "User-Agent": "FAiRY beta contract test" };
  if (token) headers["X-LAiDIES-Guest-Token"] = token;
  if (qaToken) headers["X-LAiDIES-QA-Token"] = qaToken;
  if (authorization) headers.Authorization = `Bearer ${authorization}`;
  return new Request("https://fairy.test", { method: "POST", headers, body: JSON.stringify(body) });
}

function answerJSON(deliverable = "Use this concrete answer with the facts checked first.") {
  return JSON.stringify({ read: "The useful issue is clear.", deliverable,
    reasoning: ["It answers the workplace request without inventing facts."], assumptions: [], unknowns: [],
    nextMove: "Use the answer after checking it against the real situation.", sources: [], asOf: null });
}

function providerHarness({ residentId = null } = {}) {
  const calls = { advice: 0, identity: 0 };
  globalThis.fetch = async (url, options = {}) => {
    if (String(url).startsWith("https://identity.test/")) {
      calls.identity += 1;
      return residentId ? Response.json({ id: residentId }) : Response.json({}, { status: 401 });
    }
    calls.advice += 1;
    const payload = JSON.parse(options.body);
    const structured = Boolean(payload.response_format);
    const content = structured ? answerJSON() : `Fitted draft version ${calls.advice}.`;
    return Response.json({ model: ADVICE_MODEL,
      choices: [{ finish_reason: "stop", message: { role: "assistant", content, refusal: null } }] });
  };
  return calls;
}

test("guest receives one successful case and three case-bound fittings, with a fourth blocked before provider use", async () => {
  const betaEnv = env();
  const calls = providerHarness();
  const firstResponse = await worker.fetch(request({ prompt: "Help me ask for useful feedback.", requestId: "guest-case-request-01" }), betaEnv, {});
  const first = await firstResponse.json();
  assert.equal(first.type, "case_success", JSON.stringify(first));
  assert.equal(first.allowance.kind, "guest");
  assert.equal(first.allowance.remaining, 0);
  assert.ok(first.guestToken);
  assert.equal(first.case.fittingsRemaining, 3);

  const blockedResponse = await worker.fetch(request({ prompt: "Help me prepare another message.", requestId: "guest-case-request-02" }, { token: first.guestToken }), betaEnv, {});
  assert.equal(blockedResponse.status, 429);
  assert.equal((await blockedResponse.json()).type, "rate_limited");
  assert.equal(calls.advice, 1);

  let previousDraft = first.answer.deliverable;
  let version = first.case.version;
  for (let index = 1; index <= 3; index += 1) {
    const response = await worker.fetch(request({ requestId: `guest-fit-request-0${index}`, revision: {
      previousDraft, directive: "Make this shorter.", caseId: first.case.id, expectedVersion: version
    } }, { token: first.guestToken }), betaEnv, {});
    const data = await response.json();
    assert.equal(data.type, "revision_success");
    previousDraft = data.answer.deliverable;
    version = data.case.version;
    assert.equal(data.case.fittingsRemaining, 3 - index);
  }
  const callsBeforeFourth = calls.advice;
  const fourthResponse = await worker.fetch(request({ requestId: "guest-fit-request-04", revision: {
    previousDraft, directive: "Make this warmer.", caseId: first.case.id, expectedVersion: version
  } }, { token: first.guestToken }), betaEnv, {});
  assert.equal(fourthResponse.status, 429);
  assert.equal((await fourthResponse.json()).type, "fitting_limit");
  assert.equal(calls.advice, callsBeforeFourth);
});

test("verified Resident receives three cases and an invalid bearer token never downgrades to guest", async () => {
  const betaEnv = env();
  const calls = providerHarness({ residentId: "78ec6ded-efbb-4e3a-ae87-5b675bbc9734" });
  for (let index = 1; index <= 3; index += 1) {
    const response = await worker.fetch(request({ prompt: "Help me make this work request clearer.",
      requestId: `resident-case-request-0${index}` }, { authorization: "valid-resident-session" }), betaEnv, {});
    const data = await response.json();
    assert.equal(data.type, "case_success", JSON.stringify(data));
  }
  const fourth = await worker.fetch(request({ prompt: "Help me make one more work request.",
    requestId: "resident-case-request-04" }, { authorization: "valid-resident-session" }), betaEnv, {});
  assert.equal(fourth.status, 429);
  assert.equal(calls.advice, 3);

  globalThis.fetch = async (url) => String(url).startsWith("https://identity.test/")
    ? Response.json({}, { status: 401 })
    : assert.fail("answer provider must not be called for an invalid Resident session");
  const invalid = await worker.fetch(request({ prompt: "Help me draft a work note.", requestId: "invalid-resident-01" },
    { authorization: "expired-session" }), env(), {});
  assert.equal(invalid.status, 401);
  assert.equal((await invalid.json()).type, "resident_session_invalid");
});

test("staging QA has a separate authenticated allowance without weakening the daily spend ceiling", async () => {
  const qaToken = "staging-qa-secret-that-is-only-a-test-value";
  const betaEnv = env({ FAIRY_QA_ENABLED: "true", FAIRY_QA_TOKEN: qaToken });
  const calls = providerHarness();
  for (let index = 1; index <= 3; index += 1) {
    const response = await worker.fetch(request({ prompt: "Help me prepare a work conversation.",
      requestId: `qa-case-request-0${index}` }, { qaToken }), betaEnv, {});
    const data = await response.json();
    assert.equal(data.type, "case_success", JSON.stringify(data));
    assert.equal(data.allowance.kind, "qa");
  }
  const fourth = await worker.fetch(request({ prompt: "Help me prepare another work conversation.",
    requestId: "qa-case-request-04" }, { qaToken }), betaEnv, {});
  assert.equal(fourth.status, 429);
  assert.equal(calls.advice, 3);

  const invalid = await worker.fetch(request({ prompt: "Help me prepare a work conversation.",
    requestId: "qa-invalid-request-01" }, { qaToken: "wrong-token" }), betaEnv, {});
  assert.equal(invalid.status, 401);
  assert.equal((await invalid.json()).type, "qa_session_invalid");
  assert.equal(calls.advice, 3);
});

test("a QA header cannot increase allowance when the staging-only flag is absent", async () => {
  const betaEnv = env();
  const calls = providerHarness();
  const first = await worker.fetch(request({ prompt: "Help me prepare a work conversation.",
    requestId: "qa-disabled-request-01" }, { qaToken: "ignored-outside-staging" }), betaEnv, {});
  assert.equal((await first.json()).allowance.kind, "guest");
  const second = await worker.fetch(request({ prompt: "Help me prepare another work conversation.",
    requestId: "qa-disabled-request-02" }, { qaToken: "ignored-outside-staging" }), betaEnv, {});
  assert.equal(second.status, 429);
  assert.equal(calls.advice, 1);
});

test("daily budget stops the twenty-first conservative reservation before classifier or answer provider use", async () => {
  const betaEnv = env();
  const calls = providerHarness();
  for (let index = 1; index <= 20; index += 1) {
    const response = await worker.fetch(request({ prompt: "Help me draft a clear work update.",
      requestId: `budget-case-request-${String(index).padStart(2, "0")}` }, { ip: `192.0.2.${index}` }), betaEnv, {});
    const data = await response.json();
    assert.equal(data.type, "case_success", JSON.stringify(data));
  }
  const before = calls.advice;
  const blocked = await worker.fetch(request({ prompt: "Help me draft one more work update.",
    requestId: "budget-case-request-21" }, { ip: "192.0.2.21" }), betaEnv, {});
  assert.equal(blocked.status, 429);
  assert.equal((await blocked.json()).type, "service_budget_reached");
  assert.equal(calls.advice, before);
});
