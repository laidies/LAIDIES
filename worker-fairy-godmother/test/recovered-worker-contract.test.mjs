import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";

const originalFetch = globalThis.fetch;

function request(body, options = {}) {
  return new Request(
    "https://laidies-fairy-godmother.wednesday-laidies.workers.dev",
    {
      method: options.method ?? "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://laidies.ai",
        "CF-Connecting-IP": "192.0.2.10"
      },
      body: options.method === "GET" ? undefined : JSON.stringify(body)
    }
  );
}

function context() {
  const pending = [];
  return {
    pending,
    waitUntil(promise) {
      pending.push(Promise.resolve(promise));
    }
  };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("returns a typed non-POST failure", async () => {
  const response = await worker.fetch(request(null, { method: "GET" }), {}, context());
  assert.equal(response.status, 405);
  assert.equal((await response.json()).type, "input_invalid");
});

test("returns a typed HTTP 429 when the IP rate limiter rejects", async () => {
  const env = {
    RATE_LIMITER: {
      async limit() {
        return { success: false };
      }
    }
  };
  const response = await worker.fetch(
    request({ prompt: "Help me prepare for a meeting." }),
    env,
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 429);
  assert.equal(data.type, "rate_limited");
  assert.equal(data.play.amount, 0);
});

test("returns typed input-invalid rather than a success-shaped short-input response", async () => {
  const response = await worker.fetch(
    request({ prompt: "x" }),
    {},
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 400);
  assert.equal(data.type, "input_invalid");
  assert.equal(data.play.outcome, "not_spent");
});

test("returns a typed non-2xx service error for upstream failure", async () => {
  globalThis.fetch = async () =>
    new Response("upstream unavailable", { status: 503 });

  const response = await worker.fetch(
    request({ prompt: "Help me prepare for a performance review." }),
    { OPENAI_API_KEY: "test-only" },
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 502);
  assert.equal(data.type, "service_error");
  assert.equal(data.play.amount, 0);
});

test("does not accept client-asserted email or touch allowance storage", async () => {
  let storedValue = null;
  globalThis.fetch = async () =>
    new Response("upstream unavailable", { status: 503 });
  const env = {
    OPENAI_API_KEY: "test-only",
    SUBSCRIBER_USAGE: {
      async get() {
        return "0";
      },
      async put(_key, value) {
        storedValue = value;
      }
    }
  };
  const ctx = context();
  const response = await worker.fetch(
    request({
      prompt: "Help me prepare for a performance review.",
      subscriberEmail: "reader@example.com"
    }),
    env,
    ctx
  );
  await Promise.all(ctx.pending);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).type, "input_invalid");
  assert.equal(storedValue, null);
});

test("uses only a verified opaque identity and commits allowance after validated success", async () => {
  let storedValue = null;
  globalThis.fetch = async () => new Response(JSON.stringify({
    choices: [{ message: { content: "A usable answer." } }]
  }), { status: 200, headers: { "Content-Type": "application/json" } });
  const env = {
    OPENAI_API_KEY: "test-only",
    VERIFIED_IDENTITY: {
      async get() { return { id: "resident-opaque-123", kind: "resident" }; }
    },
    SUBSCRIBER_USAGE: {
      async get() {
        return "0";
      },
      async put(_key, value) {
        storedValue = value;
      }
    }
  };
  const response = await worker.fetch(
    request({
      requestId: "request-verified-1",
      prompt: "Help me prepare for a performance review."
    }),
    env,
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.type, "case_success");
  assert.equal(storedValue, "1");
});

test("does not commit a verified allowance for a malformed upstream completion", async () => {
  let writes = 0;
  globalThis.fetch = async () => new Response(JSON.stringify({ choices: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
  const env = {
    OPENAI_API_KEY: "test-only",
    VERIFIED_IDENTITY: { async get() { return { id: "resident-opaque-123" }; } },
    SUBSCRIBER_USAGE: {
      async get() { return "0"; },
      async put() { writes += 1; }
    }
  };
  const response = await worker.fetch(request({ prompt: "Help me write a clear email." }), env, context());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).type, "service_error");
  assert.equal(writes, 0);
});

test("rejects an oversized request without calling upstream", async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; throw new Error("must not call upstream"); };
  const response = await worker.fetch(request({ prompt: "x".repeat(8001) }), {}, context());
  const data = await response.json();
  assert.equal(response.status, 413);
  assert.equal(data.type, "input_too_large");
  assert.equal(calls, 0);
});

test("returns a typed timeout without allowance commit", async () => {
  let writes = 0;
  globalThis.fetch = async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
    options.signal.dispatchEvent(new Event("abort"));
  });
  const env = {
    OPENAI_API_KEY: "test-only",
    VERIFIED_IDENTITY: { async get() { return { id: "resident-opaque-123" }; } },
    SUBSCRIBER_USAGE: { async get() { return "0"; }, async put() { writes += 1; } }
  };
  const response = await worker.fetch(request({ prompt: "Help me write a clear email." }), env, context());
  assert.equal(response.status, 504);
  assert.equal((await response.json()).type, "service_error");
  assert.equal(writes, 0);
});

test("returns typed revision success and enforces fitting input limits", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: "The deadline needs to move to Tuesday."
            }
          }
        ]
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  const response = await worker.fetch(
    request({
      revision: {
        previousDraft: "Could we maybe move the deadline?",
        directive: "firmer"
      }
    }),
    { OPENAI_API_KEY: "test-only" },
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.type, "revision_success");
  assert.equal(data.answer.deliverable, "The deadline needs to move to Tuesday.");

  const oversized = await worker.fetch(request({
    revision: { previousDraft: "ok", directive: "x".repeat(1001) }
  }), { OPENAI_API_KEY: "test-only" }, context());
  assert.equal(oversized.status, 413);
  assert.equal((await oversized.json()).type, "input_too_large");
});
