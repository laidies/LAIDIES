#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const candidateId = "chatgpt-ad-expansion-2026-08-31";
const envelopePath = "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-31-news-production-1.json";
const predecessorPath = "operations/product-stewards/newsstand/evidence/service-carry-production-2026-08-31/newsstand-daily-issues.json";
const envelopeRaw = fs.readFileSync(envelopePath, "utf8");
const predecessorStoreRaw = fs.readFileSync(predecessorPath, "utf8");
const envelope = JSON.parse(envelopeRaw);
const predecessorStore = JSON.parse(predecessorStoreRaw);
const predecessor = predecessorStore.issues.at(-1);
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

const prompt = `You are an independent issue-admission editor. Review the exact currently published predecessor issue and proposed next-date issue below. The story's separate factual/prose receipt already passed; this task is only to decide whether this is a bounded initial August 31 issue.

PASS only if all are true:
- successor editionDate is 2026-08-31 and exactly one ordinary story is added: ${candidateId};
- the seven ready service desks are exact carried records from the published August 30 predecessor, with original IDs/dates and carriedFrom checksums;
- no locally rotated August 31 service IDs are present;
- Front PAiGE and Weekly pointers are unchanged;
- the story is held in the private envelope and bound through sourceIdentity.ordinaryCandidate;
- the exact production predecessor proof is bound through sourceIdentity.servicePredecessor.

Return JSON only: {"verdict":"PASS"|"HOLD","findings":"specific comparison","checks":{"oneStoryOnly":boolean,"carriedServicesOnly":boolean,"noRotatedServices":boolean,"pointersPreserved":boolean,"ordinaryCandidateBound":boolean,"productionProofBound":boolean}}.

PUBLISHED PREDECESSOR ISSUE:
${JSON.stringify(predecessor)}

PROPOSED ISSUE:
${envelopeRaw}`;

const response = await fetch("http://127.0.0.1:8791/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt }) });
if (!response.ok) throw new Error(`review provider ${response.status}: ${await response.text()}`);
const provider = await response.json();
const text = String(provider.response || provider.result?.response || provider.result || provider.output || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
const start = text.indexOf("{");
let depth = 0, end = -1, inString = false, escaped = false;
for (let index = start; index >= 0 && index < text.length; index += 1) {
  const character = text[index];
  if (inString) { if (escaped) escaped = false; else if (character === "\\") escaped = true; else if (character === '"') inString = false; continue; }
  if (character === '"') inString = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) { end = index + 1; break; }
}
if (start < 0 || end < 0) throw new Error("independent issue reviewer returned no JSON object");
const review = JSON.parse(text.slice(start, end));
const report = {
  schemaVersion: "newsstand-independent-issue-review.v1",
  candidateId,
  reviewerPrincipalId: "cloudflare-llama-independent-production-issue-review-20260831",
  modelFamily: "meta-llama",
  reviewedAt: new Date().toISOString(),
  predecessor: { path: predecessorPath, sha256: sha256(predecessorStoreRaw), envelopeSha256: predecessor.envelopeSha256 },
  successor: { path: envelopePath, sha256: sha256(envelopeRaw) },
  ...review,
  limitation: "Independent issue-structure and production-proof review only; future public release and browser behaviour are not claimed."
};
const reviewPath = "operations/product-stewards/newsstand/evidence/daily-issue-production-review-2026-08-31.json";
fs.writeFileSync(reviewPath, `${JSON.stringify(report, null, 2)}\n`);
if (review.verdict !== "PASS" || Object.values(review.checks || {}).some(value => value !== true)) throw new Error(`independent issue review did not pass: ${JSON.stringify(review)}`);
const decision = {
  schemaVersion: "daily-issue-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_WRITE",
  editionDate: "2026-08-31",
  envelopeSha256: sha256(envelopeRaw),
  reviewedAt: report.reviewedAt,
  reviewedBy: report.reviewerPrincipalId,
  reviewerRole: "Independent exact production-bound NewsStand issue admission reviewer"
};
fs.writeFileSync("operations/product-stewards/newsstand/evidence/daily-issue-production-admission-2026-08-31.json", `${JSON.stringify(decision, null, 2)}\n`);
console.log(`INDEPENDENT PRODUCTION ISSUE REVIEW PASS envelope=${decision.envelopeSha256}`);
