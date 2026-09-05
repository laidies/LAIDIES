#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = "operations/product-stewards/newsstand/candidates/openai-wiki-message-board-2026-09-05/independent-gemma-parts";
const body = {
  messages: [
    {
      role: "system",
      content: "Return only the requested final JSON object. Do not emit analysis, reasoning, markdown, or extra keys."
    },
    {
      role: "user",
      content: "Return exactly this JSON object: {\"status\":\"READY\",\"thinkingDisabled\":true}"
    }
  ],
  response_format: { type: "json_object" },
  max_completion_tokens: 120,
  temperature: 0.05,
  chat_template_kwargs: { enable_thinking: false }
};

fs.writeFileSync(path.join(root, out, "smoke-request.json"), `${JSON.stringify(body, null, 2)}\n`);
const response = await fetch("http://127.0.0.1:8791/gemma", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
  signal: AbortSignal.timeout(300000)
});
const raw = await response.text();
fs.writeFileSync(path.join(root, out, "smoke-response.raw.json"), `${raw}\n`);
if (!response.ok) throw new Error(`smoke HTTP ${response.status}`);
const envelope = JSON.parse(raw);
const result = typeof envelope.response === "string" ? JSON.parse(envelope.response) : envelope.response;
if (result?.status !== "READY" || result?.thinkingDisabled !== true) throw new Error("smoke returned no valid final readiness object");
process.stdout.write(JSON.stringify({
  httpStatus: response.status,
  id: envelope.id,
  model: envelope.model,
  finishReason: envelope.choices?.[0]?.finish_reason,
  reasoning: envelope.choices?.[0]?.message?.reasoning ?? null,
  usage: envelope.usage,
  result
}, null, 2));
