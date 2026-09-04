import assert from "node:assert/strict";
import test from "node:test";

import { handleMissJeevesGuidance } from "../src/miss-jeeves-guidance.js";

const rateKey = "a".repeat(64);
const request = (body, headers = {}) => new Request("https://miss-jeeves.internal/guidance", {
  method: "POST",
  headers: { "content-type": "application/json", "x-laidies-rate-key": rateKey, ...headers },
  body: JSON.stringify(body)
});

test("uses the existing OpenAI secret with Responses web search and no storage", async () => {
  let providerRequest;
  const provider = async (url, options) => {
    providerRequest = { url, options, body: JSON.parse(options.body) };
    const answer = "Nvidia is discussed because its chips are widely used for AI systems.";
    return Response.json({
      model: "gpt-5.6-sol",
      output: [{ type: "message", content: [{
        type: "output_text",
        text: answer,
        annotations: [{ type: "url_citation", start_index: 0, end_index: answer.length, url: "https://www.nvidia.com/en-us/data-center/", title: "Nvidia data center" }]
      }] }]
    });
  };
  const response = await handleMissJeevesGuidance(request({
    query: "Why is everyone talking about Nvidia?",
    related_laidies_material: [{ title: "AI chips", summary: "A LAiDIES primer.", section: "LIBRAiRY" }]
  }), { OPENAI_API_KEY: "test-secret", RATE_LIMITER: { async limit() { return { success: true }; } } }, provider);
  assert.equal(response.status, 200);
  assert.equal(providerRequest.url, "https://api.openai.com/v1/responses");
  assert.equal(providerRequest.options.headers.authorization, "Bearer test-secret");
  assert.equal(providerRequest.body.model, "gpt-5.6-sol");
  assert.equal(providerRequest.body.store, false);
  assert.equal(providerRequest.body.tools[0].type, "web_search");
  assert.ok(providerRequest.body.tools[0].filters.allowed_domains.includes("nvidia.com"));
  assert.ok(!JSON.stringify(await response.clone().json()).includes("test-secret"));
});

test("rejects public-shaped calls without the internal binding rate key", async () => {
  const response = await handleMissJeevesGuidance(new Request("https://miss-jeeves.internal/guidance", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ query: "What is AI?" })
  }), { OPENAI_API_KEY: "test-secret" }, async () => { throw new Error("provider must not run"); });
  assert.equal(response.status, 403);
});

test("fails closed when OpenAI returns no usable citations", async () => {
  const response = await handleMissJeevesGuidance(request({ query: "What changed today?" }), { OPENAI_API_KEY: "test-secret" }, async () => Response.json({
    model: "gpt-5.6-sol",
    output: [{ type: "message", content: [{ type: "output_text", text: "Something changed.", annotations: [] }] }]
  }));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, "citations_required");
});

test("rejects private content before any provider call", async () => {
  const response = await handleMissJeevesGuidance(request({ query: "My email is ali@example.com" }), { OPENAI_API_KEY: "test-secret" }, async () => { throw new Error("provider must not run"); });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, "private_content_prohibited");
});

