#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const candidateId = "anthropic-fable-5-1-2026-09-02";
const envelopePath = "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-09-02.json";
const predecessorPath = "operations/product-stewards/newsstand/evidence/service-carry-production-2026-09-02/newsstand-daily-issues.json";
const envelopeRaw = fs.readFileSync(envelopePath, "utf8");
const predecessorStoreRaw = fs.readFileSync(predecessorPath, "utf8");
const envelope = JSON.parse(envelopeRaw);
const predecessorStore = JSON.parse(predecessorStoreRaw);
const predecessor = predecessorStore.issues.at(-1);
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

const prompt = `Act only as an independent NewsStand issue-admission editor. Compare the exact published predecessor issue and the exact proposed September 2 issue below. The Fable story already passed a separate factual and prose review. This review is only about issue structure and continuity.

Return one JSON object and no other text, exactly shaped as:
{"verdict":"PASS" or "HOLD","findings":"specific comparison in ordinary language","checks":{"oneStoryOnly":true or false,"sixValidServicesOnly":true or false,"incorrectCareerOmitted":true or false,"frontPaigePreserved":true or false,"weeklyPreserved":true or false,"ordinaryCandidateBound":true or false,"productionProofBound":true or false}}

PASS only if every check is true:
- editionDate is 2026-09-02 and the sole new ordinary story is ${candidateId};
- exactly six service desks are carried from the published August 31 predecessor with original IDs, dates and carriedFrom checksums;
- the legacy AI-related career_life record is omitted, not relabelled or replaced;
- Front PAiGE remains front-paige-accountable-systems-2026-08-24;
- Weekly remains weekly-accountable-systems-2026-08-24;
- the story remains held in this private envelope and is bound through sourceIdentity.ordinaryCandidate;
- the exact production predecessor proof is bound through sourceIdentity.servicePredecessor.

PUBLISHED PREDECESSOR ISSUE:
${JSON.stringify(predecessor)}

PROPOSED ISSUE:
${envelopeRaw}`;

const response = await fetch("http://127.0.0.1:8791/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt }) });
if (!response.ok) throw new Error(`review provider ${response.status}: ${await response.text()}`);
const provider = await response.json();
const text = String(provider.response || provider.result?.response || provider.result?.choices?.[0]?.text || provider.choices?.[0]?.text || provider.output || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
const start = text.indexOf("{");
let depth = 0, end = -1, inString = false, escaped = false;
for (let index = start; index >= 0 && index < text.length; index += 1) {
  const character = text[index];
  if (inString) { if (escaped) escaped = false; else if (character === "\\") escaped = true; else if (character === '"') inString = false; continue; }
  if (character === '"') inString = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) { end = index + 1; break; }
}
if (start < 0 || end < 0) throw new Error(`independent issue reviewer returned no JSON object: ${text.slice(0, 500)}`);
const review = JSON.parse(text.slice(start, end));
const report = {
  schemaVersion: "newsstand-independent-issue-review.v1",
  candidateId,
  reviewerPrincipalId: "cloudflare-llama-independent-production-issue-review-20260902",
  modelFamily: "meta-llama",
  providerOutputId: provider.id || provider.result?.id || null,
  reviewedAt: new Date().toISOString(),
  predecessor: { path: predecessorPath, sha256: sha256(predecessorStoreRaw), envelopeSha256: predecessor.envelopeSha256 },
  successor: { path: envelopePath, sha256: sha256(envelopeRaw) },
  ...review,
  limitation: "Independent issue-structure and production-proof review only; future public release and browser behaviour are not claimed."
};
const reviewPath = "operations/product-stewards/newsstand/evidence/daily-issue-production-review-2026-09-02.json";
fs.writeFileSync(reviewPath, `${JSON.stringify(report, null, 2)}\n`);
if (review.verdict !== "PASS" || Object.values(review.checks || {}).some(value => value !== true)) throw new Error(`independent issue review did not pass: ${JSON.stringify(review)}`);
const decision = {
  schemaVersion: "daily-issue-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_WRITE",
  editionDate: "2026-09-02",
  envelopeSha256: sha256(envelopeRaw),
  reviewedAt: report.reviewedAt,
  reviewedBy: report.reviewerPrincipalId,
  reviewerRole: "Independent exact production-bound NewsStand issue admission reviewer"
};
fs.writeFileSync("operations/product-stewards/newsstand/evidence/daily-issue-admission-2026-09-02.json", `${JSON.stringify(decision, null, 2)}\n`);
console.log(`INDEPENDENT PRODUCTION ISSUE REVIEW PASS envelope=${decision.envelopeSha256}`);
