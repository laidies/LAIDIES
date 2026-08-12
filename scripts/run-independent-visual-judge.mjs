#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const values = flag => args.flatMap((arg, index) => arg === flag && args[index + 1] ? [args[index + 1]] : []);
const value = flag => values(flag)[0] || null;
const fail = message => { console.error(`INDEPENDENT VISUAL JUDGE BLOCKED: ${message}`); process.exit(1); };
const sha256 = body => crypto.createHash("sha256").update(body).digest("hex");
const imagePaths = values("--image");
if (imagePaths.length !== 3) fail("exactly three --image paths are required");
const images = imagePaths.map((candidate, index) => {
  const absolute = path.resolve(ROOT, candidate);
  if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) fail(`image ${index + 1} is not a readable repository file: ${candidate}`);
  return { path: path.relative(ROOT, absolute), absolute, sha256: sha256(fs.readFileSync(absolute)) };
});
const model = value("--model") || "sonnet";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["verdict", "summary", "imageInspections", "visibleRegressions", "requirementFindings"],
  properties: {
    verdict: { type: "string", enum: ["PASS", "HOLD", "REJECT"] },
    summary: { type: "string" },
    imageInspections: { type: "array", minItems: 3, maxItems: 3, items: { type: "object", additionalProperties: false, required: ["path", "observedText", "hierarchy", "legibility", "overflowOrClipping"], properties: {
      path: { type: "string" }, observedText: { type: "string" }, hierarchy: { type: "string" }, legibility: { type: "string" }, overflowOrClipping: { type: "string" }
    } } },
    visibleRegressions: { type: "array", items: { type: "object", additionalProperties: false, required: ["path", "locator", "problem", "repair"], properties: {
      path: { type: "string" }, locator: { type: "string" }, problem: { type: "string" }, repair: { type: "string" }
    } } },
    requirementFindings: { type: "array", items: { type: "object", additionalProperties: false, required: ["requirement", "verdict", "evidence"], properties: {
      requirement: { type: "string" }, verdict: { type: "string", enum: ["PASS", "FAIL"] }, evidence: { type: "string" }
    } } }
  }
};

const imageList = images.map((image, index) => `${index + 1}. ${image.absolute} (repository path ${image.path}; sha256 ${image.sha256})`).join("\n");
const prompt = `You are the role-distinct independent visual judge for one LAiDIES NewsStand article reader.

Use the Read tool to inspect all three exact PNG files listed below before judging. Begin from the pixels, not from filenames. Do not inspect repository prose, maker receipts, tests, code, prior judgments or implementation notes.

The binding visual requirements are narrow:
- the experience must visibly read as a lively newspaper inside the LAiDIES world, not a generic white card page;
- masthead, date, article headline and explanatory deck must form an obvious reading order;
- the full headline must be legible without clipping or horizontal overflow at desktop, 390px mobile and 320px mobile;
- the article may be dense like a newspaper, but must not become a full-screen poster or make the deck impossible to reach;
- colour, borders and typography must preserve legibility.

Return PASS only if all three exact images satisfy every requirement. Record visible regressions first. For each image, report at least one exact phrase you can actually read from the pixels in observedText; a filename or supplied requirement does not count as observation.

EXACT IMAGES
${imageList}`;

const invocation = {
  schemaVersion: "laidies-independent-visual-judge-invocation.v1",
  modelFamily: "claude",
  model,
  images: images.map(({ path: imagePath, sha256: imageSha }) => ({ path: imagePath, sha256: imageSha })),
  excludedContext: ["implementation", "maker receipts", "tests", "prose source", "prior judgments", "repository instructions"],
  promptSha256: sha256(prompt)
};

const isolatedCwd = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-independent-visual-judge-"));
const result = spawnSync(value("--claude-command") || "claude", [
  "--print",
  "--safe-mode",
  "--tools", "Read",
  "--allowedTools", "Read",
  "--add-dir", ROOT,
  "--permission-mode", "dontAsk",
  "--no-session-persistence",
  "--model", model,
  "--effort", "medium",
  "--output-format", "json",
  "--json-schema", JSON.stringify(schema),
  prompt
], { cwd: isolatedCwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
fs.rmSync(isolatedCwd, { recursive: true, force: true });
if (result.error) fail(result.error.message);
if (result.status !== 0) fail(`Claude exited ${result.status}: ${(result.stderr || result.stdout).trim()}`);
let envelope;
try { envelope = JSON.parse(result.stdout); } catch { fail("Claude did not return JSON"); }
const judgment = envelope.structured_output;
if (!judgment || !["PASS", "HOLD", "REJECT"].includes(judgment.verdict)) fail("Claude response did not contain a valid structured judgment");
const inspected = new Set(judgment.imageInspections.flatMap(item => [item.path, path.basename(item.path)]));
for (const image of images) {
  if (!inspected.has(image.path) && !inspected.has(image.absolute) && !inspected.has(path.basename(image.path))) fail(`judgment omitted exact image ${image.path}`);
}
process.stdout.write(`${JSON.stringify({ ...invocation, judgedAt: new Date().toISOString(), judgment }, null, 2)}\n`);
