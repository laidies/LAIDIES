#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const id = process.argv[2];
if (!/^(?:openclaw-shared-sessions|anthropic-agentic-incidents|openai-ads-run-rate)-2026-09-02$/.test(id || "")) throw new Error("Pass one governed September 2 candidate ID");
const d = `operations/product-stewards/newsstand/candidates/${id}/`;
const read = p => fs.readFileSync(path.join(root, p), "utf8");
const hash = value => crypto.createHash("sha256").update(value).digest("hex");
const bind = p => ({ path: p, sha256: hash(read(p)) });
const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) : Array.isArray(value) ? `[${value.map(stable).join(",")}]` : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const registryPath = "operations/product-stewards/learning-content-ecosystem/content-quality-exemplars.json";
const policyPath = "operations/product-stewards/newsstand/ordinary-news-editorial-policy.json";
const registry = JSON.parse(read(registryPath));
const story = JSON.parse(read(d + "story.json"));
const seed = JSON.parse(read(d + "candidate-package-seed.json"));
const sourcePaths = [...new Set(seed.sources.map(source => source.evidence.path))];
const claimMap = JSON.parse(read(d + "publication-claim-map.json"));
const principal = `claude-independent-news-${id}`;
const prompt = `Independently review the complete LAiDIES ordinary-news article below. You are Claude, not its OpenAI maker /root. Return an honest PASS, HOLD or REJECT. Never make prose pass to satisfy a schema. Do not claim tools, browsing, human readers, native browser checks or publication. Read the artifact first, form your own reverse brief, and then test every material claim against the exact supplied source receipts.

EXACT COMPLETE STORY FIRST:\n${read(d + "review-text.json")}

EXACT HTML DERIVATIVE (not a browser observation):\n${read(d + "rendered-article.html")}

EXACT CLAIM MAP ARRAY. Reassess it independently and return this exact array in receipt.factualReview.claimMap only if its evidence actually supports the story:\n${JSON.stringify(claimMap)}

SOURCE RECEIPTS:\n${sourcePaths.map(p => `PATH ${p} BINDING ${JSON.stringify(bind(p))}\n${read(p)}`).join("\n\n")}

GOVERNING POLICY:\n${read(policyPath)}

CALIBRATION REGISTRY ${JSON.stringify(bind(registryPath))}. Independently reject every negative example for all of its registered failure families, using exact excerpts of at least 15 characters. Use CQX-GOOD-NEWS-001 only as a structural positive; inherit no facts:\n${registry.negativeExemplars.map(item => `ENTRY ${JSON.stringify(item)}\n${read(item.path)}`).join("\n\n")}\n\nPOSITIVE ${JSON.stringify(registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001"))}\n${read(registry.positiveExemplars.find(item => item.id === "CQX-GOOD-NEWS-001").path)}

MAKER RECEIPT LAST. It supplies schema and artifact bindings only. Do not copy its judgments:\n${read(d + "producer-publication-review.json")}

Return JSON {receipt,analysis,findings}. receipt must be a complete laidies-prose-quality-review.v1 with stage INDEPENDENT_SEMANTIC_ADMISSION, maker /root, reviewer {id:'${principal}',principalId:'${principal}',role:'independent factual and reader-comprehension editor',modelFamily:'anthropic',independentFromMaker:true,artifactFirst:true}. Keep artifact bindings identical to the maker. Preserve registrySha256. Include all required NEWS outcomes and failure families. Each outcome needs verdict PASS/HOLD/FAIL, candidate-specific observation, and artifactEvidence with exact story substrings of at least 15 characters. explainBack and unseenTransfer additionally require aiEditorialAnalysis {evidenceType:'AI_EDITORIAL_ANALYSIS',prompt,response,expectedEvidence,assessment}; unseenTransfer must use a genuinely different scenario. factualReview.disposition is CLAIMS_REVIEWED, reviewedThrough is 2026-09-02, sourceBindings are the exact bindings above, and claimMap is exactly the supplied claim array if supported. analysis must be {evidenceType:'AI_EDITORIAL_ANALYSIS',candidateId:'${id}',reviewerPrincipalId:'${principal}',reviewTextSha256:'${bind(d + "review-text.json").sha256}',checks:{incidentExplained,termsExplainedInContext,readerConsequenceSpecific,noInternalNotesOrInventedAdvice},outcomes:{explainBack,unseenTransfer}} with specific evidence. analysis.outcomes must exactly equal receipt.outcomes.explainBack/unseenTransfer. Include the exact limitation 'AI editorial assessment only; no observed human-comprehension evidence is claimed.' plus browser/native-zoom/publication limitations. Leave newsEditorialReview.analysis and reportBinding absent; they are mechanically bound after your judgment. PASS may record NO_NEW_DEFECT only when no defect exists. Current invocation UTC ${new Date().toISOString()}`;

const outputPath = d + "independent-claude-provider-output.json";
if (fs.existsSync(path.join(root, outputPath))) throw new Error("Do not overwrite prior Claude output");
const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "news-claude-review-"));
const run = spawnSync("claude", ["--print", "--safe-mode", "--tools", "", "--permission-mode", "dontAsk", "--no-session-persistence", "--model", "fable", "--effort", "medium", "--output-format", "json", "--json-schema", JSON.stringify({ type: "object", required: ["receipt", "analysis", "findings"], properties: { receipt: { type: "object" }, analysis: { type: "object" }, findings: { type: "string" } } })], { cwd, input: prompt, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
if (run.status !== 0) {
  fs.writeFileSync(path.join(root, d + "independent-claude-execution-error.txt"), run.stderr || run.stdout || "No provider output");
  throw new Error("Independent Claude provider failed; raw failure preserved, no verdict");
}
const provider = JSON.parse(run.stdout);
fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(provider, null, 2)}\n`);
const result = provider.structured_output;
if (provider.is_error || !result?.receipt || !result?.analysis || !result?.findings) throw new Error("No complete independent Claude review");
const put = (name, value) => { const p = d + name; fs.writeFileSync(path.join(root, p), `${JSON.stringify(value, null, 2)}\n`); return bind(p); };
const analysis = put("independent-claude-analysis.json", result.analysis);
const report = put("independent-claude-raw-report.json", { candidateId: id, storySha256: hash(stable(story)), reviewerPrincipalId: principal, verdict: result.receipt.verdict, findings: result.findings, providerOutput: bind(outputPath), promptSha256: hash(prompt), actualModels: Object.keys(provider.modelUsage || {}) });
result.receipt.newsEditorialReview = { policy: bind(policyPath), analysis };
result.receipt.reportBinding = report;
put("independent-claude-review.json", result.receipt);
console.log(JSON.stringify({ verdict: result.receipt.verdict, findings: result.findings, actualModels: Object.keys(provider.modelUsage || {}) }));
