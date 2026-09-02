#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

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
