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

test("rejects non-POST requests", async () => {
  const response = await worker.fetch(request(null, { method: "GET" }), {}, context());
  assert.equal(response.status, 405);
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
  assert.match(data.response, /breather/i);
});

test("characterizes the current short-input success-shaped response", async () => {
  const response = await worker.fetch(
    request({ prompt: "x" }),
    {},
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.match(data.response, /needs something to work with/i);
  assert.equal(data.kind, undefined);
});

test("characterizes upstream failure being returned as HTTP 200", async () => {
  globalThis.fetch = async () =>
    new Response("upstream unavailable", { status: 503 });

  const response = await worker.fetch(
    request({ prompt: "Help me prepare for a performance review." }),
    { OPENAI_API_KEY: "test-only" },
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.match(data.response, /wand is taking a moment/i);
  assert.equal(data.kind, undefined);
});

test("characterizes subscriber usage being incremented before answer success", async () => {
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
  assert.equal(response.status, 200);
  assert.equal(storedValue, "1");
});

test("enforces the recovered subscriber cap at ten", async () => {
  const env = {
    SUBSCRIBER_USAGE: {
      async get() {
        return "10";
      },
      async put() {
        throw new Error("put must not run at the limit");
      }
    }
  };
  const response = await worker.fetch(
    request({
      prompt: "Help me prepare for a performance review.",
      subscriberEmail: "reader@example.com"
    }),
    env,
    context()
  );
  const data = await response.json();
  assert.equal(response.status, 429);
  assert.equal(data.kind, "daily_limit");
  assert.match(data.response, /Daily cap: 10/i);
});

test("returns revision output with the recovered revision kind", async () => {
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
  assert.equal(data.kind, "revision");
  assert.equal(data.response, "The deadline needs to move to Tuesday.");
});

