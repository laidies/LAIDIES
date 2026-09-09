import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const outDir = "operations/product-stewards/newsstand/candidates/openai-gpt-6-astra-compact-2026-09-09";
const storyPath = "content/newsstand-stories.js";
const evidencePath = "operations/product-stewards/newsstand/evidence/stories/openai-gpt-6-astra-launch-2026-09-04.json";
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value)
  : Array.isArray(value) ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const context = { window: {} };
vm.runInNewContext(read(storyPath), context, { timeout: 1000 });
const story = JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA.stories.find(item => item.id === "openai-gpt-6-astra-launch-2026-09-04")));
if (!story) throw new Error("Astra story missing");
const storyText = `${stable(story)}\n`;
const storySha256 = sha256(storyText);
const evidenceRaw = read(evidencePath);
const prompt = `Independently review this exact corrected LAiDIES Daily article. You are a Google Gemma editor through Cloudflare Workers AI, not its OpenAI maker. The correction shortens an already sourced article; it must not add a factual claim, lose a necessary qualification, or become too technical. Return HOLD for any unsupported claim, unclear comparison, missing access/cost boundary, missing reader decision, internal production note, or misleading safety implication. Do not claim browsing or human observation.

EXACT ARTICLE JSON:\n${storyText}
BOUND PRIOR FACTUAL EVIDENCE:\n${evidenceRaw}

Return JSON only: {"verdict":"PASS|HOLD|REJECT","summary":"...","checks":{"plainLanguage":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"readerDecision":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"accessAndCost":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"comparison":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"safetyAndUncertainty":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"sourceScopePreserved":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"noInternalNotes":{"verdict":"PASS|HOLD|FAIL","evidence":"exact article excerpt"},"dailyScale":{"verdict":"PASS|HOLD|FAIL","evidence":"state the exact word count supplied below"}},"wordCount":WORD_COUNT,"storySha256":"${storySha256}"}`;
const visible = [story.headline, story.the_story, story.laidies_read, story.what_this_means, story.cocktail_party, story.closing_note, story.class_notes]
  .filter(value => typeof value === "string").join(" ").replace(/<[^>]+>/g, " ").replace(/&(?:[a-z]+|#\d+);/gi, " ").replace(/\s+/g, " ").trim();
const wordCount = visible ? visible.split(" ").length : 0;
const requestPrompt = prompt.replace("WORD_COUNT", String(wordCount));
const response = await fetch("http://127.0.0.1:8791/gemma", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ messages: [
    { role: "system", content: "You are an exacting independent factual and reader-comprehension editor. Return valid JSON only." },
    { role: "user", content: requestPrompt }
  ], response_format: { type: "json_object" }, max_tokens: 2200, temperature: 0, seed: 20260909 })
});
const provider = await response.json();
const rawPath = path.join(root, outDir, "independent-provider-output.json");
if (fs.existsSync(rawPath)) throw new Error("refusing to overwrite independent provider output");
fs.writeFileSync(rawPath, `${JSON.stringify({ model: "@cf/google/gemma-4-26b-a4b-it", promptSha256: sha256(requestPrompt), provider }, null, 2)}\n`);
if (!response.ok) throw new Error(`Workers AI review failed: ${response.status}`);
const message = provider.response ?? provider.choices?.[0]?.message?.content;
const review = typeof message === "string" ? JSON.parse(message) : message;
if (!review || !["PASS", "HOLD", "REJECT"].includes(review.verdict)) throw new Error("independent reviewer returned no valid verdict");
review.storySha256 = storySha256;
review.wordCount = wordCount;
review.reviewer = {
  principalId: "workers-ai-gemma-independent-astra-compact-20260909",
  provider: "Cloudflare Workers AI",
  model: "@cf/google/gemma-4-26b-a4b-it",
  makerIndependent: true
};
review.reviewedAt = new Date().toISOString();
const reviewPath = path.join(root, outDir, "independent-review.json");
if (fs.existsSync(reviewPath)) throw new Error("refusing to overwrite independent review");
fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
console.log(JSON.stringify({ verdict: review.verdict, wordCount, storySha256, rawPath: path.relative(root, rawPath), reviewPath: path.relative(root, reviewPath) }, null, 2));
