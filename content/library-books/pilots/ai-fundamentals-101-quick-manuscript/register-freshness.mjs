#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pilotDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(pilotDir, "../../../..");
const registerPath = path.join(root, "operations/product-stewards/learning-content-ecosystem/claim-register.json");
const manuscriptPath = path.join(pilotDir, "source/full-book.md");
const evidencePath = "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/README.md";
const consumerPath = "content/library-books/pilots/ai-fundamentals-101-quick-manuscript/source/full-book.md";
const sourceId = "SRC-LIB-AIF-QUICK-ALI-VETTED-20260816";
const expectedSha = "721522ed4ff94760c7e5d62beef64a6299286efc1d7a7b90e6262a4ca4091eb9";
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

const manuscriptBytes = fs.readFileSync(manuscriptPath);
if (sha256(manuscriptBytes) !== expectedSha) {
  throw new Error("AI Fundamentals source bytes changed; do not carry the Ali-vetted freshness authority to different bytes");
}
const manuscript = manuscriptBytes.toString("utf8").replaceAll("\r\n", "\n");
const chapters = [...manuscript.matchAll(/^#\s+Chapter\s+(\d+):\s+(.+)$/gm)].map(match => ({
  number: Number(match[1]),
  title: match[2].trim(),
}));
if (chapters.length !== 20) throw new Error(`expected 20 chapters; found ${chapters.length}`);

const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
register.updatedAt = "2026-08-16";
register.coverage.scope = "Representative Episode 01 definition/statistic cluster plus all 20 Ali-vetted AI Fundamentals 101 chapter currentness envelopes and machine-discovered candidates across current content and production sources.";
const gap = "AI Fundamentals 101 is freshness-registered at chapter level; a new external signal still needs to be mapped to the affected chapter before the checker can route a targeted review.";
if (!register.coverage.knownGaps.includes(gap)) register.coverage.knownGaps.push(gap);
register.sources = register.sources.filter(source => source.id !== sourceId);
register.sources.push({
  id: sourceId,
  title: "AI Fundamentals 101 — Full Book (All 20 Chapters)",
  publisher: "Ali / Amazon Quick source handoff",
  authority: "INTERNAL_CANON",
  url: consumerPath,
  publishedOrUpdated: "2026-08-16",
  accessedAt: "2026-08-16",
  status: "CURRENT",
  notes: `Ali confirmed that she fully vetted the exact imported manuscript for accuracy. Authority is checksum-bound to ${expectedSha}; future freshness review is targeted to claims affected by new evidence, not a restart of the full accuracy review.`,
});

register.claims = register.claims.filter(claim => !claim.id.startsWith("CLM-LIB-AIF-CH"));
for (const chapter of chapters) {
  const number = String(chapter.number).padStart(2, "0");
  const highVolatility = [2, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(chapter.number);
  const volatility = highVolatility ? "MONTHLY" : "QUARTERLY";
  const nextReviewAt = highVolatility ? "2026-09-16" : "2026-11-16";
  register.claims.push({
    id: `CLM-LIB-AIF-CH${number}-CURRENTNESS`,
    canonicalKey: `ai-fundamentals-chapter-${number}-currentness`,
    type: "dated_status",
    status: "CURRENT",
    riskTier: highVolatility ? "HIGH" : "MATERIAL",
    volatility,
    canonicalWording: `Chapter ${chapter.number}, “${chapter.title},” uses the exact Ali-vetted 2026-08-16 source. A material source, provider, product, market, legal or technical change triggers a targeted chapter review rather than a general rewrite of the book.`,
    applicability: {
      products: ["AI Fundamentals 101"],
      versions: [expectedSha],
      plans: [],
      regions: ["Global unless the chapter states a narrower scope"],
    },
    sourceIds: [sourceId],
    evidenceSummary: `Ali confirmed full accuracy vetting of the exact 20-chapter source bytes on 2026-08-16. This currentness envelope binds Chapter ${chapter.number} and its future recheck trigger to that immutable source.`,
    limitations: [
      "This chapter-level record does not claim that volatile details remain true forever.",
      "A future signal must identify the affected claim or passage before changing the source.",
      "Rendered-book identity, Rewind references and public release remain separately verified.",
    ],
    lastCheckedAt: "2026-08-16",
    nextReviewAt,
    recheckTriggers: [
      "AIDB, NewsStand or a primary source reports a material change to a named company, product, model, price, benchmark, policy, standard, market fact or technical mechanism used in this chapter.",
      "Ali or a reader identifies a potentially stale passage in this chapter.",
      "The weekly automated freshness run matches a new external signal to this chapter.",
      `The ${volatility.toLowerCase()} scheduled review date arrives without a recorded disposition.`,
    ],
    owner: "library",
    upstreamSignals: [{
      system: "ALI_CORRECTION",
      id: "ALI-2026-08-16-QUICK-MANUSCRIPT-ACCURACY-AUTHORITY",
      path: evidencePath,
      status: "ACCEPTED",
    }],
    consumers: [{
      id: `CON-LIB-AIF-CH${number}-SOURCE`,
      surface: `AI Fundamentals 101 · Chapter ${chapter.number}`,
      owner: "library",
      path: consumerPath,
      locator: `# Chapter ${chapter.number}: ${chapter.title}`,
      job: "LIBRARY_DEPTH",
      status: "CURRENT",
      lastVerifiedAt: "2026-08-16",
      evidencePath,
      notes: "Ali-vetted source bytes; not yet published.",
    }],
    correction: null,
  });
}

fs.writeFileSync(registerPath, `${JSON.stringify(register, null, 2)}\n`);
console.log(`AI FUNDAMENTALS FRESHNESS REGISTRATION PASS chapters=${chapters.length} source_sha=${expectedSha}`);
