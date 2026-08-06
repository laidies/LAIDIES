#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";

const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const normalize = value => value.replace(/\s+/g, " ").trim();
const ledger = JSON.parse(fs.readFileSync("content/library-books/concepts-101.claims.json", "utf8"));
const source = JSON.parse(fs.readFileSync(ledger.canonicalSourcePath, "utf8"));
const rendered = fs.readFileSync(ledger.renderedPath, "utf8");

const expectedTerms = [
  "Agentic AI", "AGI", "AI winter", "Context", "Context window",
  "Generative AI", "Grounding", "Hallucination", "Knowledge cutoff",
  "Model / large language model (LLM)", "Multimodal", "Prompt",
  "Reasoning model", "Sandbox", "Retrieval", "Token", "Training data"
];

function inspect(candidate, candidateLedger = ledger, candidateSource = source) {
  const errors = [];
  const n = normalize(candidate);
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(candidateLedger.schemaVersion === "1.0.0" && candidateLedger.bookId === "concepts-101", "wrong ledger identity");
  require(candidateLedger.ledgerStatus === "ADMITTED_LOCALLY_NOT_PUBLIC", "untruthful local admission status");
  require(candidateSource.bookId === "concepts-101" && candidateSource.contentVersion === candidateLedger.contentVersion, "source identity/version drift");
  require(sha256(candidate) === candidateLedger.renderedSha256, "rendered hash drift");
  require(candidate.includes(`<meta name="laidies:content-version" content="${candidateLedger.contentVersion}">`), "content-version metadata drift");
  require(candidateSource.readerQuestion?.length > 20, "reader question missing");
  require(candidateSource.causalModel?.oneLine === "goal + prompt + available context -> product -> model -> optional tools -> output -> human check", "single causal model missing");
  require(candidateSource.recurringWorkedCase?.job === "Draft a client handover email.", "recurring case missing");
  require(candidateSource.sections?.length === 6, "six-section architecture missing");
  require(candidate.includes("Your goal + prompt + available context → product → model → optional tools → output → your check."), "reader-visible causal map missing");
  require(candidate.includes("The recurring case: a client handover email"), "reader-visible recurring case missing");
  require(candidate.includes("What the analogy gets right—and where it stops"), "analogy limit missing");
  require(candidate.includes("Current sources and limits"), "currentness contract missing");
  require(candidate.includes("Report a Concepts 101 correction") || candidate.includes("hello@laidies.ai"), "correction route missing");

  const reference = candidate.match(/<h2>Concepts quick reference<\/h2>([\s\S]*?)<p class="meta">/)?.[1] || "";
  require(Boolean(reference), "quick reference missing");
  const terms = [...reference.matchAll(/<div class="term"><h3>([^<]+)<\/h3>/g)].map(match => match[1]);
  require(JSON.stringify(terms) === JSON.stringify(expectedTerms), `quick-reference terms/order drift: ${terms.join(", ")}`);

  const sourceById = new Map(candidateLedger.sources.map(item => [item.id, item]));
  require(sourceById.size === candidateLedger.sources.length, "duplicate claim source id");
  for (const item of candidateLedger.sources) {
    require(item.primary === true && /^https:\/\//.test(item.url), `${item.id} is not a primary HTTPS source`);
    require(item.accessed === "2026-08-06", `${item.id} lacks current access date`);
    require(candidate.includes(`href="${item.url}"`), `${item.id} is not linked in the rendered book`);
  }
  for (const claim of candidateLedger.claims) {
    require(/^C101-C00[1-6]$/.test(claim.id), `invalid claim id ${claim.id}`);
    require(["durable", "currentness_sensitive"].includes(claim.class), `${claim.id} class is invalid`);
    require(claim.renderedLocator && claim.publicWording && claim.sourceLimitation, `${claim.id} is incomplete`);
    for (const sourceId of claim.sourceIds) require(sourceById.has(sourceId), `${claim.id} references unknown ${sourceId}`);
    for (const phrase of claim.requiredRenderedPhrases) require(n.includes(normalize(phrase)), `${claim.id} lost phrase: ${phrase}`);
    if (claim.class === "currentness_sensitive") require(/before public release/i.test(claim.freshnessTrigger || ""), `${claim.id} lacks release freshness trigger`);
  }
  for (const pattern of candidateLedger.forbiddenRenderedPatterns) require(!candidate.includes(pattern), `forbidden stale pattern remains: ${pattern}`);
  return errors;
}

const errors = inspect(rendered);
if (errors.length) {
  console.error(`CONCEPTS 101 CLAIMS FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

if (process.argv.includes("--calibrate")) {
  const broken = rendered.replace("Your goal + prompt + available context → product → model → optional tools → output → your check.", "A magic box gives an answer.");
  const brokenLedger = { ...ledger, renderedSha256: sha256(broken) };
  assert.match(inspect(broken, brokenLedger).join("\n"), /reader-visible causal map missing/, "known-bad book must fail the content gate");
  console.log("CONCEPTS 101 GATE CALIBRATION PASS · known-bad causal model rejected");
}

console.log(`CONCEPTS 101 CONTENT PASS · sections=${source.sections.length} terms=${expectedTerms.length} claims=${ledger.claims.length} sha256=${ledger.renderedSha256}`);
