#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import { validateNewsstandSourceRoutes } from "./check-practitioner-signal-pilot.mjs";

const roster = JSON.parse(fs.readFileSync(new URL("../operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json", import.meta.url), "utf8"));
const source = roster.sources.find((item) => item.id === "SRC-ANTHROPIC-NEWS");

assert.ok(source, "Anthropic's official news index must be in the recurring source roster");
assert.equal(source.channelUrl, "https://www.anthropic.com/news");
assert.equal(source.tier, "OFFICIAL_AUTHORITY");
assert.equal(source.cadence, "DAILY_RELEASE_CHECK");
assert.ok(["PROMOTED", "PILOT"].includes(source.promotionStatus), "Anthropic News must be inside the recurring boundary");
assert.match(source.monitoringMethod, /every day/i);
assert.match(source.termsBoundary, /Attribute performance, cost, safety and scientific-result claims to Anthropic/i);

console.log("NEWSSTAND PROVIDER NEWS ROSTER PASS anthropic_news=daily official_authority=true");

assert.deepEqual(validateNewsstandSourceRoutes(roster, "2026-09-05"), { desks: 6, sources: 8, researchCompletionCertified: false });
const clone = () => structuredClone(roster);
const absent = clone(); delete absent.newsstandCoverage;
assert.throws(() => validateNewsstandSourceRoutes(absent, "2026-09-05"), /desk routes are missing/);
const missing = clone(); missing.sources = missing.sources.filter(s => s.id !== "SRC-AP-AI");
assert.throws(() => validateNewsstandSourceRoutes(missing, "2026-09-05"), /missing source SRC-AP-AI/);
const parked = clone(); parked.sources.find(s => s.id === "SRC-NATURE-ML").promotionStatus = "CANDIDATE";
assert.throws(() => validateNewsstandSourceRoutes(parked, "2026-09-05"), /daily recurring route required/);
const expired = clone(); expired.sources.find(s => s.id === "SRC-EFF-AI").expiresAt = "2026-09-04";
assert.throws(() => validateNewsstandSourceRoutes(expired, "2026-09-05"), /expired/);
const providerOnly = clone(); providerOnly.newsstandCoverage.deskRoutes.find(r => r.id === "security").sourceIds = ["SRC-OPENAI-NEWS"];
assert.throws(() => validateNewsstandSourceRoutes(providerOnly, "2026-09-05"), /requires INDEPENDENT_REPORTING/);
const duplicate = clone(); duplicate.newsstandCoverage.deskRoutes[1] = structuredClone(duplicate.newsstandCoverage.deskRoutes[0]);
assert.throws(() => validateNewsstandSourceRoutes(duplicate, "2026-09-05"), /six distinct/);
assert.throws(() => validateNewsstandSourceRoutes(roster, "2026-02-30"), /real YYYY-MM-DD/);
for (const [field, value] of [["status", "RESEARCH_COMPLETE"], ["researchCompletionCertified", true]]) {
  const forged = clone(); forged.newsstandCoverage[field] = value;
  assert.throws(() => validateNewsstandSourceRoutes(forged, "2026-09-05"), /cannot certify research completion/);
}
for (const field of ["verifiedAt", "expiresAt"]) {
  const invalid = clone(); invalid.sources.find(s => s.id === "SRC-AP-AI")[field] = "2026-02-30";
  assert.throws(() => validateNewsstandSourceRoutes(invalid, "2026-09-05"), /source dates must be real YYYY-MM-DD/);
}
console.log("NEWSSTAND SOURCE ROUTES CALIBRATION PASS missing_roster=1 missing_source=1 parked=1 expired=1 provider_only=1 duplicate_desk=1 invalid_date=1 invalid_source_dates=2 forged_completion=2 research_completion_certified=false");
