import assert from "node:assert/strict";
import test from "node:test";

import worker, {
  activeMissJeevesSourceBank,
  guidanceDomains,
  validatedGuidanceOutput
} from "../src/index.js";

const originalFetch = globalThis.fetch;
const rateKey = "a".repeat(64);

function guidanceRequest(body, options = {}) {
  return new Request(options.url || "https://miss-jeeves.internal/guidance", {
    method: options.method || "POST",
    headers: {
      "content-type": options.contentType || "application/json",
      "x-laidies-rate-key": options.rateKey ?? rateKey
    },
    body: (options.method || "POST") === "GET" ? undefined : JSON.stringify(body)
  });
}

function citedProviderResponse(text = "Nvidia makes chips used to train and run many AI systems.") {
  const phrase = "chips";
  const start = text.indexOf(phrase);
  return {
    status: "completed",
    model: "gpt-5-mini-2026-08-07",
    output: [{
      type: "message",
      content: [{
        type: "output_text",
        text,
        annotations: [{
          type: "url_citation",
          start_index: start,
          end_index: start + phrase.length,
          url: "https://www.nvidia.com/en-us/ai/",
          title: "NVIDIA AI"
        }]
      }]
    }]
  };
}

test.afterEach(() => { globalThis.fetch = originalFetch; });

test("the governed bank admits only current promoted or pilot authorities", () => {
  const active = activeMissJeevesSourceBank(new Date("2026-09-04T12:00:00Z"));
  assert.ok(active.length > 0);
  assert.ok(active.every((source) => ["PROMOTED", "PILOT"].includes(source.promotionStatus)));
  assert.ok(active.every((source) => source.tier !== "SECONDARY_SCOUT"));
  assert.equal(active.some((source) => source.id === "SRC-AIDB"), false, "AIDB remains a scout, not answer authority");
  assert.deepEqual(activeMissJeevesSourceBank(new Date("2100-01-01T00:00:00Z")), []);
});

test("the internal guidance route calls OpenAI Responses with bounded web search and no storage", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), options, body: JSON.parse(options.body) });
    return Response.json(citedProviderResponse());
  };
  const questions = [
    "Why does the AI ignore part of my prompt?",
    "Why is everyone talking about Nvidia?",
    "I want to turn meeting notes into a clear summary. Which AI tool or model should I use?"
  ];
  for (const query of questions) {
    const response = await worker.fetch(guidanceRequest({ query, related_laidies_material: [] }), {
      OPENAI_API_KEY: "test-only"
    });
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.status, "ok");
    assert.equal(data.model, "gpt-5-mini-2026-08-07");
    assert.ok(Array.isArray(data.output));
  }
  assert.equal(calls.length, 3);
  for (const call of calls) {
    assert.equal(call.url, "https://api.openai.com/v1/responses");
    assert.equal(call.body.model, "gpt-5-mini");
    assert.equal(call.body.store, false);
    assert.equal(call.body.tools[0].type, "web_search");
    assert.ok(call.body.tools[0].filters.allowed_domains.includes("nvidia.com"));
    assert.deepEqual(call.body.include, ["web_search_call.action.sources"]);
    assert.equal(call.body.safety_identifier, rateKey);
    assert.equal(call.body.max_tool_calls, 2);
  }
});

test("the service rejects public routing, malformed callers, private content and uncited answers", async () => {
  const publicRoute = await worker.fetch(guidanceRequest(
    { query: "Why Nvidia?", related_laidies_material: [] },
    { url: "https://laidies-fairy-godmother.example/guidance" }
  ), {});
  assert.notEqual((await publicRoute.json()).status, "ok");

  const missingIdentity = await worker.fetch(guidanceRequest(
    { query: "Why Nvidia?", related_laidies_material: [] },
    { rateKey: "" }
  ), { OPENAI_API_KEY: "test-only" });
  assert.equal(missingIdentity.status, 401);

  const privateContent = await worker.fetch(guidanceRequest({
    query: "My password: secret-1234. Which model should I use?",
    related_laidies_material: []
  }), { OPENAI_API_KEY: "test-only" });
  assert.equal(privateContent.status, 400);

  globalThis.fetch = async () => Response.json({
    status: "completed",
    model: "gpt-5-mini",
    output: [{ type: "message", content: [{ type: "output_text", text: "No receipts.", annotations: [] }] }]
  });
  const uncited = await worker.fetch(guidanceRequest({
    query: "Why is everyone talking about Nvidia?",
    related_laidies_material: []
  }), { OPENAI_API_KEY: "test-only" });
  assert.equal(uncited.status, 502);
  assert.equal((await uncited.json()).error, "answer_failed_citation_gate");
});

test("citation validation rejects any source outside the approved domain set", () => {
  const domains = guidanceDomains(activeMissJeevesSourceBank(new Date("2026-09-04T12:00:00Z")));
  assert.ok(validatedGuidanceOutput(citedProviderResponse(), domains));
  const hostile = citedProviderResponse();
  hostile.output[0].content[0].annotations[0].url = "https://example.invalid/a";
  assert.equal(validatedGuidanceOutput(hostile, domains), null);
});
