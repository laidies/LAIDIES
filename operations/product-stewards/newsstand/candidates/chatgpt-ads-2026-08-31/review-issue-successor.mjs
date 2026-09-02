#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";

const candidateId = "chatgpt-ad-expansion-2026-08-31";
const envelopePath = "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-31-news-1.json";
const predecessorPath = "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-08-31.json";
const envelopeRaw = fs.readFileSync(envelopePath, "utf8");
const predecessorRaw = fs.readFileSync(predecessorPath, "utf8");
const envelope = JSON.parse(envelopeRaw);
const predecessor = JSON.parse(predecessorRaw);
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

const prompt = `You are an independent issue-admission editor. Review the exact predecessor and proposed successor below. The story's separate factual/prose receipt already passed; this task is only to decide whether the successor is a bounded same-day news revision.

PASS only if all are true:
- successor editionDate is 2026-08-31 and exactly one story is added: ${candidateId};
- predecessor service desks, service record IDs, Front PAiGE pointer and Weekly pointer are unchanged;
- every predecessor story remains byte-for-byte equal and in the same order;
- the added story is held in the private envelope and bound through sourceIdentity.ordinaryCandidate;
- no unrelated issue field or service content changes.

Return JSON only: {"verdict":"PASS"|"HOLD","findings":"specific comparison","checks":{"oneStoryOnly":boolean,"incumbentsPreserved":boolean,"servicesPreserved":boolean,"ordinaryCandidateBound":boolean}}.

PREDECESSOR:
${predecessorRaw}

SUCCESSOR:
${envelopeRaw}`;

const response = await fetch("http://127.0.0.1:8791/", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ prompt })
});
if (!response.ok) throw new Error(`review provider ${response.status}: ${await response.text()}`);
const provider = await response.json();
const text = provider.response || provider.result?.response || provider.result || provider.output || "";
const cleaned = String(text).trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
const start = cleaned.indexOf("{");
let depth = 0;
let end = -1;
let inString = false;
let escaped = false;
for (let index = start; index >= 0 && index < cleaned.length; index += 1) {
  const character = cleaned[index];
  if (inString) {
    if (escaped) escaped = false;
    else if (character === "\\") escaped = true;
    else if (character === '"') inString = false;
    continue;
  }
  if (character === '"') inString = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) { end = index + 1; break; }
}
if (start < 0 || end < 0) throw new Error("independent issue reviewer returned no JSON object");
const review = JSON.parse(cleaned.slice(start, end));
const report = {
  schemaVersion: "newsstand-independent-issue-review.v1",
  candidateId,
  reviewerPrincipalId: "cloudflare-llama-independent-issue-review-20260831",
  modelFamily: "meta-llama",
  reviewedAt: new Date().toISOString(),
  predecessor: { path: predecessorPath, sha256: sha256(predecessorRaw) },
  successor: { path: envelopePath, sha256: sha256(envelopeRaw) },
  ...review,
  limitation: "Independent issue-structure review only; public release and browser behaviour are not claimed."
};
fs.writeFileSync("operations/product-stewards/newsstand/evidence/daily-issue-news-revision-review-2026-08-31-1.json", `${JSON.stringify(report, null, 2)}\n`);
if (review.verdict !== "PASS" || Object.values(review.checks || {}).some(value => value !== true)) throw new Error(`independent issue review did not pass: ${JSON.stringify(review)}`);
const decision = {
  schemaVersion: "daily-issue-news-revision-admission-v1",
  decision: "ACCEPT_LOCAL_CANONICAL_SUCCESSOR",
  editionDate: "2026-08-31",
  envelopeSha256: sha256(envelopeRaw),
  predecessorEnvelopeSha256: sha256(predecessorRaw),
  addedStoryIds: [candidateId],
  reviewedAt: report.reviewedAt,
  reviewedBy: report.reviewerPrincipalId,
  reviewerRole: "Independent exact-envelope NewsStand issue admission reviewer"
};
fs.writeFileSync("operations/product-stewards/newsstand/evidence/daily-issue-news-revision-admission-2026-08-31-1.json", `${JSON.stringify(decision, null, 2)}\n`);
console.log(`INDEPENDENT ISSUE REVIEW PASS envelope=${decision.envelopeSha256}`);
