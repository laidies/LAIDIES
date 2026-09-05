import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { handleMissJeevesGuidance } from "../src/miss-jeeves-guidance.js";
import { MISS_JEEVES_EXCLUDED_ROSTER_SOURCES, MISS_JEEVES_SOURCE_POLICY, citationDomainIsAllowed, currentMissJeevesSourcePolicy } from "../src/miss-jeeves-trusted-sources.js";

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
  assert.deepEqual(providerRequest.body.reasoning, { effort: "low" });
  assert.equal(providerRequest.body.max_output_tokens, 1000);
  assert.equal(providerRequest.body.max_tool_calls, 2);
  assert.equal(providerRequest.body.tools[0].type, "web_search");
  assert.match(providerRequest.body.instructions, /reader who may know nothing about AI, software or the technology industry/);
  assert.match(providerRequest.body.instructions, /does not know GitHub/);
  assert.match(providerRequest.body.instructions, /no more than three unavoidable technical terms/);
  assert.match(providerRequest.body.instructions, /technical term \(plain-language definition\)/);
  assert.match(providerRequest.body.instructions, /recent 60-day timeline/);
  assert.match(providerRequest.body.instructions, /do not omit a verified breach/);
  assert.match(providerRequest.body.instructions, /identify the organization responsible/);
  assert.match(providerRequest.body.instructions, /what public material was not affected/);
  assert.match(providerRequest.body.instructions, /what its unusual name means or where it came from/);
  assert.match(providerRequest.body.instructions, /why it is valuable/);
  assert.match(providerRequest.body.instructions, /one or two genuinely relevant ideas in the supplied LAiDIES material/);
  assert.ok(providerRequest.body.tools[0].filters.allowed_domains.includes("nvidia.com"));
  assert.ok(providerRequest.body.tools[0].filters.allowed_domains.includes("huggingface.co"));
  assert.ok(providerRequest.body.tools[0].filters.allowed_domains.includes("oneusefulthing.org"));
  assert.ok(!providerRequest.body.tools[0].filters.allowed_domains.includes("aidailybrief.ai"));
  const suppliedBank = JSON.parse(providerRequest.body.input).trusted_resource_bank;
  assert.ok(suppliedBank.some(source => source.id === "SRC-ETHAN-MOLLICK" && source.authority === "attributed_practitioner"));
  assert.ok(!suppliedBank.some(source => source.id === "SRC-AIDB"));
  assert.ok(!JSON.stringify(await response.clone().json()).includes("test-secret"));
});

test("adds the official OpenAI, Hugging Face and NVIDIA checks to Hugging Face questions", async () => {
  let providerRequest;
  const provider = async (_url, options) => {
    providerRequest = JSON.parse(options.body);
    const answer = "OpenAI reported an incident involving Hugging Face, and NVIDIA announced an acquisition agreement.";
    return Response.json({
      model: "gpt-5.6-sol",
      output: [{ type: "message", content: [{
        type: "output_text", text: answer,
        annotations: [{ type: "url_citation", start_index: 0, end_index: answer.length, url: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/", title: "Hugging Face incident" }]
      }] }]
    });
  };
  const response = await handleMissJeevesGuidance(request({ query: "What is Hugging Face, and why is it all over the news?" }), { OPENAI_API_KEY: "test-secret" }, provider);
  assert.equal(response.status, 200);
  const checks = JSON.parse(providerRequest.input).required_current_checks;
  assert.equal(checks.length, 2);
  assert.ok(checks.flatMap(check => check.sources).some(url => url.includes("openai.com/index/hugging-face-incident")));
  assert.ok(checks.flatMap(check => check.required_names).includes("OpenAI"));
  assert.ok(checks.flatMap(check => check.required_names).includes("NVIDIA"));
});

test("trusted resource bank fails closed when every governed record is stale", () => {
  assert.throws(() => currentMissJeevesSourcePolicy("2028-01-01"), /trusted_source_bank_stale/);
});

test("runtime source policy accounts for every governed bank record", async () => {
  const roster = JSON.parse(await readFile(new URL("../../operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json", import.meta.url), "utf8"));
  const included = new Set(MISS_JEEVES_SOURCE_POLICY.sources.map(source => source.id));
  const excluded = new Set(Object.keys(MISS_JEEVES_EXCLUDED_ROSTER_SOURCES));
  assert.deepEqual([...new Set([...included, ...excluded])].sort(), roster.sources.map(source => source.id).sort());
  assert.deepEqual([...included].filter(id => excluded.has(id)), []);
  for (const source of roster.sources.filter(source => included.has(source.id))) {
    const runtime = MISS_JEEVES_SOURCE_POLICY.sources.find(candidate => candidate.id === source.id);
    assert.equal(runtime.reviewedAt, source.verifiedAt);
    assert.equal(runtime.expiresAt, source.expiresAt);
    assert.equal(runtime.domain, new URL(source.channelUrl).hostname.replace(/^www\./, ""));
    assert.notEqual(source.tier, "SECONDARY_SCOUT");
  }
});

test("citation allowlist accepts exact or child hosts but not lookalike domains", () => {
  const domains = ["openai.com"];
  assert.equal(citationDomainIsAllowed("https://openai.com/research", domains), true);
  assert.equal(citationDomainIsAllowed("https://help.openai.com/article", domains), true);
  assert.equal(citationDomainIsAllowed("https://openai.com.example.org/phish", domains), false);
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
  assert.equal((await response.json()).error, "trusted_citations_required");
});

test("fails closed when a citation is outside the approved bank and standing authorities", async () => {
  const response = await handleMissJeevesGuidance(request({ query: "What changed today?" }), { OPENAI_API_KEY: "test-secret" }, async () => Response.json({
    model: "gpt-5.6-sol",
    output: [{ type: "message", content: [{
      type: "output_text", text: "A claim.",
      annotations: [{ type: "url_citation", start_index: 0, end_index: 8, url: "https://random-ai-blog.example/claim", title: "Claim" }]
    }] }]
  }));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).error, "trusted_citations_required");
});

test("rejects private content before any provider call", async () => {
  const response = await handleMissJeevesGuidance(request({ query: "My email is ali@example.com" }), { OPENAI_API_KEY: "test-secret" }, async () => { throw new Error("provider must not run"); });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, "private_content_prohibited");
});
