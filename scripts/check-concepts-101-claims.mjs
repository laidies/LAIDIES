#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const ledger = JSON.parse(fs.readFileSync("content/library-books/concepts-101.claims.json", "utf8"));
const rendered = fs.readFileSync(ledger.renderedPath, "utf8");
const architectureRaw = fs.readFileSync(ledger.architectureMetadataPath, "utf8");
const architecture = JSON.parse(architectureRaw);
const rejectedArtifacts = JSON.parse(fs.readFileSync("content/library-books/rejected-artifacts.json", "utf8")).artifacts;

function inspect(candidate, candidateLedger = ledger) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(candidateLedger.schemaVersion === "1.2.0", "wrong ledger schema");
  require(candidateLedger.bookId === "concepts-101" && candidateLedger.title === "AI Fundamentals 101", "wrong book identity");
  require(candidateLedger.ledgerStatus === "ALI_REJECTED_INTERNAL_REPAIR_REQUIRED_NOT_ADMITTED_NOT_PUBLIC", "candidate status must remain rejected/local-only");
  require(sha256(candidate) === candidateLedger.renderedSha256, "rendered hash drift");
  require(!rejectedArtifacts.some(artifact => artifact.artifact_sha256 === sha256(candidate)), "exact artifact is directly rejected by Ali and cannot pass any content gate");
  require(candidate.includes(`<meta name="laidies:content-version" content="${candidateLedger.contentVersion}">`), "content-version metadata drift");
  require(architecture.schemaVersion === candidateLedger.schemaVersion, "architecture schema drift");
  require(architecture.bookId === candidateLedger.bookId && architecture.displayTitle === candidateLedger.title, "architecture identity drift");
  require(architecture.contentVersion === candidateLedger.contentVersion, "architecture content-version drift");
  require(architecture.canonicalContentPath === candidateLedger.renderedPath, "canonical content path drift");
  require(sha256(architectureRaw) === candidateLedger.architectureMetadataSha256, "architecture metadata hash drift");

  const headings = [...candidate.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map(match => match[1].trim());
  let last = -1;
  for (const heading of candidateLedger.structuralContract.chapterOrder) {
    const index = headings.indexOf(heading);
    require(index > last, `missing or out-of-order chapter: ${heading}`);
    if (index >= 0) last = index;
  }

  const articles = [...candidate.matchAll(/<article class="concept" id="([^"]+)">([\s\S]*?)<\/article>/g)];
  require(articles.length === candidateLedger.structuralContract.conceptCount, `concept count drift: ${articles.length}`);
  const ids = articles.map(match => match[1]);
  require(new Set(ids).size === ids.length, "duplicate concept id");
  require(JSON.stringify([...ids].sort()) === JSON.stringify([...architecture.conceptInventory].sort()), "architecture concept inventory drift");
  require(!/radio analogy|seventeen unrelated definitions|What the analogy gets right/i.test(candidate), "rejected teaching structure remains");
  require(candidateLedger.ledgerStatus === "ALI_REJECTED_INTERNAL_REPAIR_REQUIRED_NOT_ADMITTED_NOT_PUBLIC", "release rejection is not bound in the claims record");

  const sourceIds = new Set(candidateLedger.sources.map(source => source.id));
  const evidencedConceptIds = candidateLedger.conceptEvidenceGroups.flatMap(group => group.conceptIds);
  require(evidencedConceptIds.length === new Set(evidencedConceptIds).size, "a concept appears in more than one evidence group");
  require(JSON.stringify([...evidencedConceptIds].sort()) === JSON.stringify([...ids].sort()), "concept evidence groups do not cover the exact concept inventory");
  for (const group of candidateLedger.conceptEvidenceGroups) {
    require(Boolean(group.boundary?.trim()), "concept evidence group lacks an explicit boundary");
    for (const sourceId of group.sourceIds) require(sourceIds.has(sourceId), `unknown evidence source id: ${sourceId}`);
  }

  for (const source of candidateLedger.sources) {
    require(source.primary === true && source.accessed === "2026-08-06", `${source.id} lacks primary/current source record`);
    require(candidate.includes(`href="${source.url}"`), `${source.id} is not linked in the book`);
  }
  return errors;
}

const errors = inspect(rendered);
if (errors.length) {
  console.error(`AI FUNDAMENTALS 101 CONTENT FAIL\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`AI FUNDAMENTALS 101 CLAIM INTEGRITY MATCH · no teaching-quality or admission authority · chapters=${ledger.structuralContract.chapterOrder.length} concepts=${ledger.structuralContract.conceptCount} sources=${ledger.sources.length} sha256=${ledger.renderedSha256}`);
