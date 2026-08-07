#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import assert from "node:assert/strict";

const ledgerPath = "content/library-books/briefing-101.claims.json";
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
const canonical = JSON.parse(fs.readFileSync(ledger.canonicalSourcePath, "utf8"));
const rendered = fs.readFileSync(ledger.renderedPath, "utf8");
const cutline = fs.readFileSync(ledger.cutlinePath, "utf8");
const judgment = fs.readFileSync(ledger.judgmentPath, "utf8");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const normalize = (value) => value.replace(/\s+/g, " ").trim();
const normalizedRendered = normalize(rendered);
const fail = (message) => {
  console.error(`BRIEFING 101 CLAIMS FAIL: ${message}`);
  process.exit(1);
};
const requiredPhraseErrors = (renderedText, claims) => {
  const text = normalize(renderedText);
  return claims.flatMap((claim) =>
    claim.requiredRenderedPhrases
      .filter((phrase) => !text.includes(normalize(phrase)))
      .map((phrase) => `claim ${claim.id} lost required wording: ${phrase}`)
  );
};

if (ledger.schemaVersion !== "1.0.0" || ledger.bookId !== "briefing-101") {
  fail("wrong ledger schema or book identity");
}
if (ledger.status !== "LOCAL_ORIENTATION_REPAIR_PENDING_EXACT_REVIEW_NOT_ADMITTED_NOT_PUBLIC" || !/does not authorize deployment or publication/.test(ledger.makerAuthority)) {
  fail("local review and publication boundary is missing");
}
if (canonical.status !== "LOCAL_ORIENTATION_REPAIR_PENDING_EXACT_REVIEW_NOT_ADMITTED_NOT_PUBLIC" || canonical.bookId !== "briefing-101") {
  fail("canonical source lost its local-review status or book identity");
}
if (sha256(rendered) !== ledger.renderedSha256) {
  fail(`rendered hash drift ledger=${ledger.renderedSha256} actual=${sha256(rendered)}`);
}
const canonicalBytes = fs.readFileSync(ledger.canonicalSourcePath, "utf8");
if (sha256(canonicalBytes) !== ledger.canonicalSourceSha256) {
  fail(`canonical source hash drift ledger=${ledger.canonicalSourceSha256} actual=${sha256(canonicalBytes)}`);
}
if (sha256(cutline) !== ledger.cutlineSha256) {
  fail(`cutline hash drift ledger=${ledger.cutlineSha256} actual=${sha256(cutline)}`);
}
if (sha256(judgment) !== ledger.judgmentSha256) {
  fail(`judgment hash drift ledger=${ledger.judgmentSha256} actual=${sha256(judgment)}`);
}
for (const binding of ledger.integrationBindings ?? []) {
  const bytes = fs.readFileSync(binding.path, "utf8");
  for (const phrase of binding.requiredPhrases) {
    if (!normalize(bytes).includes(normalize(phrase))) fail(`integration ${binding.path} lost required wording: ${phrase}`);
  }
}
if ((ledger.integrationBindings ?? []).length !== 2) fail("exact Library and rendered Vocab integration bindings are required");

const expectedSteps = ["Job and outcome", "Audience", "Format", "Tone", "Constraints"];
if (!/<h1>Briefing 101<\/h1>/.test(rendered)) fail("visible book title is missing");
if (canonical.procedure?.steps?.length !== 5) fail("canonical procedure must contain exactly five steps");
if (JSON.stringify(canonical.procedure.steps.map((step) => step.name)) !== JSON.stringify(expectedSteps)) {
  fail("canonical five-part procedure changed");
}
if (canonical.procedure.limitation !== "This procedure can improve task fit but cannot guarantee understanding, compliance, quality or truth.") {
  fail("canonical procedure lost its non-guarantee boundary");
}

const procedureBlock = rendered.match(/<h2>Brief in five parts<\/h2>[\s\S]*?<ol>([\s\S]*?)<\/ol>/);
if (!procedureBlock || (procedureBlock[1].match(/<li>/g) ?? []).length !== 5) {
  fail("rendered procedure must contain exactly five list items");
}
for (const step of expectedSteps) {
  if (!procedureBlock[1].includes(`<strong>${step}`)) fail(`rendered procedure missing ${step}`);
}
if ((rendered.match(/class="example"/g) ?? []).length !== 1) {
  fail("rendered book must contain exactly one controlled comparison");
}
if (!normalizedRendered.includes("Keep the product, visible model or mode, source material and session the same. Change only the brief")) {
  fail("controlled comparison lost its held-constant instruction");
}

const sourceById = new Map();
const allowedHosts = new Set(["platform.claude.com", "developers.openai.com"]);
if (ledger.sources.length !== 2) fail("source ledger must contain only the two audited provider sources");
for (const source of ledger.sources) {
  if (!source.id || sourceById.has(source.id)) fail(`duplicate or missing source id ${source.id ?? "(missing)"}`);
  const url = new URL(source.url);
  if (!allowedHosts.has(url.hostname) || source.primary !== true || source.checkedOn !== "2026-08-03") {
    fail(`source ${source.id} is not an audited current official primary source`);
  }
  if (!source.scope || !/Before release/.test(source.recheck)) fail(`source ${source.id} lacks scope or before-release trigger`);
  if (!rendered.includes(`href="${source.url}"`)) fail(`rendered book does not directly link source ${source.id}`);
  sourceById.set(source.id, source);
}
if (canonical.sources.length !== 2 || canonical.sources.some((source) => !sourceById.has(source.id))) {
  fail("canonical source packet and claims source ledger disagree");
}

const expectedClaimIds = ["B101-C001", "B101-C002", "B101-C003", "B101-C004", "B101-C005", "B101-C006"];
if (JSON.stringify(ledger.claims.map((claim) => claim.id)) !== JSON.stringify(expectedClaimIds)) {
  fail("claim identity or order drift");
}
for (const claim of ledger.claims) {
  if (!claim.renderedLocator || !claim.publicWording || !claim.sourceLocator || !claim.scope || !claim.freshnessTrigger || !claim.correctionRoute) {
    fail(`claim ${claim.id} lacks locator, scope, freshness or correction routing`);
  }
  if (!/before release/i.test(claim.freshnessTrigger)) fail(`claim ${claim.id} lacks a before-release trigger`);
  if (!claim.correctionRoute.includes(claim.id) || !claim.correctionRoute.includes("do not send private work material")) {
    fail(`claim ${claim.id} correction route is incomplete`);
  }
  if (claim.class === "currentness_sensitive_provider_guidance" && claim.sourceIds.length === 0) {
    fail(`currentness-sensitive claim ${claim.id} has no direct source`);
  }
  for (const sourceId of claim.sourceIds) {
    if (!sourceById.has(sourceId)) fail(`claim ${claim.id} references unknown source ${sourceId}`);
  }
}
const requiredErrors = requiredPhraseErrors(rendered, ledger.claims);
if (requiredErrors.length) fail(requiredErrors[0]);

for (const phrase of ledger.forbiddenRenderedPhrases) {
  if (rendered.toLowerCase().includes(phrase.toLowerCase())) fail(`forbidden universal wording remains: ${phrase}`);
}
for (const phrase of [
  "The useful mapping is missing workplace context. The limit:",
  "The limit: a vague prompt does not always cause fabrication",
  "The useful mapping is ambiguity. The limit:"
]) {
  if (!normalizedRendered.includes(phrase)) fail(`analogy boundary missing: ${phrase}`);
}
const newHireBlock = rendered.match(/<p><strong>The sharp new hire\.<\/strong>([\s\S]*?)<\/p>/)?.[1] ?? "";
const newHireBoundary = "The analogy tells you nothing about competence, truth, confidentiality, memory, permissions or access.";
if (!normalize(newHireBlock).includes(newHireBoundary)) fail("sharp-new-hire analogy lost its exact limitation sentence");
for (const limitation of ["competence", "truth", "confidentiality", "memory", "permissions", "access"]) {
  if (!newHireBlock.includes(limitation)) fail(`sharp-new-hire analogy does not disclaim ${limitation}`);
}
const libraryIntegration = fs.readFileSync("library.html", "utf8");
const vocabIntegration = fs.readFileSync("content/library-books/rendered/vocab-101.html", "utf8");
if (libraryIntegration.includes("The Anatomy of a Brief") || vocabIntegration.includes("The Anatomy of a Brief")) {
  fail("pre-open or rendered Vocab integration retains the superseded heading");
}
if ((rendered.match(/href="\/issues\/issue-02\.html"/g) ?? []).length !== 1) {
  fail("Episode 2 must appear once as a direct narrative-demonstration continuation");
}
if (rendered.includes("The Anatomy of a Brief") || rendered.includes("Seven rules")) {
  fail("duplicate predecessor exposition remains");
}
if (!rendered.includes("mailto:hello@laidies.ai?subject=Briefing%20101%20correction") || !rendered.includes("do not email private work material")) {
  fail("rendered correction route or privacy boundary is missing");
}
if (canonical.freshness.owner !== "Library editorial and AI research accuracy owners" || canonical.freshness.nextReview !== "BEFORE_RELEASE") {
  fail("canonical freshness owner or release trigger is missing");
}

if (process.argv.includes("--calibrate")) {
  const phrase = ledger.claims[0].requiredRenderedPhrases[0];
  const badRendered = rendered.replace(phrase, "A five-part brief always guarantees a true answer.");
  assert.notEqual(badRendered, rendered, "calibration fixture must remove a real required phrase");
  assert.ok(
    requiredPhraseErrors(badRendered, ledger.claims).some((error) => error.includes(ledger.claims[0].id)),
    "calibration must reject a rendered book that loses required claim wording"
  );
  console.log("BRIEFING 101 CLAIMS CALIBRATION PASS missing_required_claim=rejected");
}

console.log(
  `BRIEFING 101 CLAIMS PASS claims=${ledger.claims.length} sources=${ledger.sources.length} ` +
    `procedure_steps=${canonical.procedure.steps.length} comparisons=1 analogies=${canonical.analogies.length} ` +
    `rendered_sha256=${ledger.renderedSha256} status=LOCAL_REVIEW_NOT_ADMITTED_NOT_PUBLIC`
);
