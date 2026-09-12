#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const parent = "operations/product-stewards/newsstand/candidates/agent-web-tracing-20260911";
const option = name => {
  const index = process.argv.indexOf(name);
  return index < 0 ? null : process.argv[index + 1];
};
const dir = option("--candidate-dir") || `${parent}/source-budget-successor-v2`;
const absolute = name => path.join(root, dir, name);
const json = name => JSON.parse(fs.readFileSync(absolute(name), "utf8"));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const stable = value => value === null || typeof value !== "object"
  ? JSON.stringify(value)
  : Array.isArray(value)
    ? `[${value.map(stable).join(",")}]`
    : `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const normalize = value => value
  .replace(/<\/p>/g, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201c\u201d]/g, '"')
  .replace(/[\u2013\u2014]/g, "-")
  .replace(/\s+/g, " ")
  .replace(/\s+([.,;:!?])/g, "$1")
  .trim();
const wordCount = value => (value.match(/[A-Za-z0-9]+(?:[\u2019'\-][A-Za-z0-9]+)*/g) || []).length;

const sourceFiles = {
  "collusion-additional-findings": "source/additional-findings.txt",
  "collusion-sites-explorer": "source/sites.txt",
  "axios-independent-report": "source/axios-web-observation.json"
};
const expectedLimits = new Map([
  ["collusion-additional-findings", 200],
  ["collusion-sites-explorer", 200],
  ["axios-independent-report", 25]
]);

function publicFields(story) {
  const result = new Map([["headline", normalize(story.headline)]]);
  for (const [name, html, start] of [
    ["the_story", story.the_story, 1],
    ["laidies_read", story.laidies_read, 3],
    ["what_this_means", story.what_this_means, 7]
  ]) {
    const paragraphs = [...html.matchAll(/<p>(.*?)<\/p>/gs)].map(match => normalize(match[1]));
    paragraphs.forEach((text, index) => result.set(`${name}.P${String(start + index).padStart(3, "0")}`, text));
  }
  result.set("cocktail_party", normalize(story.cocktail_party.replace(/^[“\"]|[”\"]$/g, "")));
  result.set("class_notes", normalize(story.class_notes));
  return result;
}

function inspectSourcePacket(now = Date.now()) {
  const claims = json("claim-map.json");
  const preflight = json("source-packet-preflight.json");
  const evidence = json("source-evidence.json");
  const attempts = json("source-attempts.json");
  const records = new Map(evidence.records.map(record => [record.id, record]));
  const mappings = new Map(preflight.claims.map(claim => [claim.claimId, claim]));
  const raw = new Map(Object.entries(sourceFiles).map(([id, file]) => [id, normalize(fs.readFileSync(absolute(file), "utf8"))]));
  const errors = [];
  const time = (label, value) => {
    const parsed = Date.parse(value);
    if (typeof value !== "string" || !value.includes("T") || !Number.isFinite(parsed) || parsed > now) errors.push(`invalid or future timestamp: ${label}`);
  };
  time("evidence.checkedAt", evidence.checkedAt);
  time("attempts.checkedAt", attempts.checkedAt);
  time("preflight.checkedAt", preflight.checkedAt);
  for (const attempt of attempts.attempts || []) time(`attempt ${attempt.url}`, attempt.capturedAt);
  const claimIds = new Set(claims.map(claim => claim.claimId));
  for (const claim of claims) {
    const mapping = mappings.get(claim.claimId);
    if (!mapping) { errors.push(`missing preflight mapping: ${claim.claimId}`); continue; }
    for (const support of mapping.supports || []) {
      if (!claim.sourceIds.includes(support.sourceId)) errors.push(`support source not claimed: ${claim.claimId}/${support.sourceId}`);
      const record = records.get(support.sourceId);
      if (!record) errors.push(`missing source: ${support.sourceId}`);
      else if (!record.passages.includes(support.passage)) errors.push(`passage omitted: ${claim.claimId}/${support.sourceId}`);
      if (!raw.get(support.sourceId)?.includes(normalize(support.passage))) errors.push(`passage absent from submitted source: ${claim.claimId}/${support.sourceId}`);
    }
  }
  for (const id of mappings.keys()) if (!claimIds.has(id)) errors.push(`orphan mapping: ${id}`);
  return errors;
}

function inspectBudget(budget = json("source-budget-check.json")) {
  const story = json("story.json");
  const fields = publicFields(story);
  const errors = [];
  const binding = (label, record) => {
    const target = path.join(root, record.path || "");
    if (!fs.existsSync(target)) return errors.push(`${label} binding missing`);
    const actual = sha256(fs.readFileSync(target));
    if (actual !== record.sha256) errors.push(`${label} SHA mismatch`);
  };
  binding("story", budget.artifactBindings.story);
  binding("article", budget.artifactBindings.article);
  binding("rendered", budget.artifactBindings.rendered);
  const semantic = sha256(Buffer.from(stable(story)));
  if (budget.artifactBindings.story.semanticSha256 !== semantic || budget.artifactBindings.expectedCandidateStorySha256 !== semantic) errors.push("candidate semantic story binding mismatch");
  const expectedFields = new Set(fields.keys());
  const seenFields = new Set();
  const sourceTotals = new Map();
  const sourceQuotes = new Map();
  for (const record of budget.fields || []) {
    if (!expectedFields.has(record.field)) { errors.push(`unknown public field: ${record.field}`); continue; }
    if (seenFields.has(record.field)) errors.push(`duplicate public field: ${record.field}`);
    seenFields.add(record.field);
    const reconstructed = normalize((record.fragments || []).map(fragment => fragment.text).join(" "));
    if (reconstructed !== fields.get(record.field)) errors.push(`public field coverage mismatch: ${record.field}`);
    for (const fragment of record.fragments || []) {
      if (fragment.wordCount !== wordCount(fragment.text)) errors.push(`word count mismatch: ${record.field}`);
      if (fragment.kind === "SOURCE_DERIVED") {
        if (!sourceFiles[fragment.sourceId]) errors.push(`unknown source allocation: ${record.field}`);
        sourceTotals.set(fragment.sourceId, (sourceTotals.get(fragment.sourceId) || 0) + fragment.wordCount);
        sourceQuotes.set(fragment.sourceId, (sourceQuotes.get(fragment.sourceId) || 0) + (fragment.directQuoteWords || 0));
      } else if (!fragment.rationale) errors.push(`non-source allocation lacks rationale: ${record.field}`);
    }
  }
  for (const field of expectedFields) if (!seenFields.has(field)) errors.push(`unmapped public field: ${field}`);
  const allFragments = budget.fields.flatMap(record => record.fragments);
  const budgetSourceIds = new Set((budget.sources || []).map(source => source.id));
  for (const sourceId of sourceTotals.keys()) if (!budgetSourceIds.has(sourceId)) errors.push(`source allocation lacks budget: ${sourceId}`);
  for (const sourceId of expectedLimits.keys()) if (!budgetSourceIds.has(sourceId)) errors.push(`observed source limit missing: ${sourceId}`);
  for (const source of budget.sources || []) {
    const derived = source.allocations.reduce((sum, allocation) => sum + wordCount(allocation.text), 0);
    const quoted = source.allocations.reduce((sum, allocation) => sum + (allocation.directQuoteWords || 0), 0);
    if (derived !== source.derivedWordTotal || derived !== (sourceTotals.get(source.id) || 0)) errors.push(`derived total mismatch: ${source.id}`);
    if (quoted !== source.directQuoteWordTotal || quoted !== (sourceQuotes.get(source.id) || 0)) errors.push(`direct quote total mismatch: ${source.id}`);
    if (source.allocations.some(allocation => !allFragments.some(fragment => fragment.sourceId === source.id && fragment.text === allocation.text))) errors.push(`allocation not present in public map: ${source.id}`);
    if (derived > source.wordLimit) errors.push(`source word limit exceeded: ${source.id} ${derived}>${source.wordLimit}`);
    if (source.wordLimit !== expectedLimits.get(source.id)) errors.push(`observed source limit changed: ${source.id}`);
    if (source.status !== "WITHIN_LIMIT") errors.push(`source status is not WITHIN_LIMIT: ${source.id}`);
  }
  if (budget.status !== "PASS") errors.push("budget status is not PASS");
  const candidatePath = path.join(root, budget.artifactBindings.expectedCandidatePath);
  if (fs.existsSync(candidatePath)) {
    const candidate = JSON.parse(fs.readFileSync(candidatePath, "utf8"));
    if (candidate.storySha256 !== semantic || sha256(Buffer.from(stable(candidate.story))) !== semantic) errors.push("assembled candidate differs from budgeted story");
  }
  return errors;
}

function inspectPreservedV1() {
  const story = JSON.parse(fs.readFileSync(path.join(root, parent, "story.json"), "utf8"));
  const text = normalize(story.laidies_read);
  const derived = [
    "A fingerprint is a recurring name, phrase or link that can help investigators find potentially related public posts.",
    "Axios reported on September 10 that one volunteer searched the original published data for those patterns to find other sites.",
    "Axios said many new finds were small and not independently confirmed, and that volunteers often could not identify which company ran the systems.",
    "In the reviewed reporting, OpenAI had acknowledged only the original German wiki, not the added sites."
  ];
  if (derived.some(fragment => !text.includes(normalize(fragment)))) throw Error("Preserved v1 Axios allocation fixture drifted");
  return derived.reduce((sum, fragment) => sum + wordCount(fragment), 0);
}

const packetErrors = inspectSourcePacket();
const budgetErrors = inspectBudget();
if (process.argv.includes("--calibrate")) {
  const v1AxiosWords = inspectPreservedV1();
  if (v1AxiosWords <= 25) throw Error("Preserved v1 did not trigger the source-budget negative");
  const tampered = structuredClone(json("source-budget-check.json"));
  tampered.sources.find(source => source.id === "axios-independent-report").wordLimit = 17;
  if (!inspectBudget(tampered).some(error => error.startsWith("source word limit exceeded: axios-independent-report"))) throw Error("Over-budget calibration failed");
  const incomplete = structuredClone(json("source-budget-check.json"));
  incomplete.fields = incomplete.fields.filter(record => record.field !== "cocktail_party");
  if (!inspectBudget(incomplete).includes("unmapped public field: cocktail_party")) throw Error("Public-field omission calibration failed");
  console.log(`SOURCE BUDGET CALIBRATION PASS preserved_v1_axios_words=${v1AxiosWords} limit=25 over_budget=reject omitted_public_field=reject`);
}
const errors = [...packetErrors, ...budgetErrors];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
const budget = json("source-budget-check.json");
const preflight = json("source-packet-preflight.json");
console.log(`SOURCE PACKET PREFLIGHT PASS claims=${preflight.claims.length} excerpts=${preflight.claims.reduce((count, claim) => count + claim.supports.length, 0)} budgets=${budget.sources.map(source => `${source.id}:${source.derivedWordTotal}/${source.wordLimit}`).join(",")}`);
