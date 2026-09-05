#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validatePractitionerPilot } from "./check-practitioner-signal-pilot.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const roster = JSON.parse(fs.readFileSync(path.join(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json"), "utf8"));
const results = JSON.parse(fs.readFileSync(path.join(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-signal-pilot-results.json"), "utf8"));
const clone = (value) => JSON.parse(JSON.stringify(value));
const expectFail = (name, changedRoster, changedResults, pattern) => assert.throws(() => validatePractitionerPilot(changedRoster, changedResults), pattern, name);

assert.deepEqual(validatePractitionerPilot(roster, results), { sources: roster.sources.length, signals: 4, usefulOwnerRulings: 3 });
const anthropicNews = roster.sources.find((source) => source.id === "SRC-ANTHROPIC-NEWS");
assert.equal(anthropicNews?.channelUrl, "https://www.anthropic.com/news", "Anthropic's official news index must be monitored");
assert.equal(anthropicNews?.cadence, "DAILY_RELEASE_CHECK", "Anthropic releases must be checked daily");
assert.equal(anthropicNews?.promotionStatus, "PILOT", "Anthropic News must be inside the admitted recurring boundary");
const paid = clone(roster); paid.sources[0].cost = "PAID";
expectFail("paid source", paid, results, /cost must be NONE/);
const silentRecurrence = clone(roster); delete silentRecurrence.recurringBoundary;
expectFail("silent recurrence", silentRecurrence, results, /explicit PROMOTED\/PILOT cadence/);
const mismatchedRecurrence = clone(results); mismatchedRecurrence.recurringExpansion = "PARKED";
expectFail("mismatched recurrence", roster, mismatchedRecurrence, /matching ADMITTED result/);
const missingEvidence = clone(results); missingEvidence.signals[0].boundedLaidiesTest.evidence = ["missing-evidence.txt"];
expectFail("missing bounded evidence", roster, missingEvidence, /missing bounded test evidence/);
const noRuling = clone(results); noRuling.signals.forEach((signal) => { signal.ownerRuling = "PARK"; });
expectFail("no useful owner ruling", roster, noRuling, /at least one useful/);
const authorityLeak = clone(results); authorityLeak.signals[0].publicAuthority = true;
expectFail("public authority leak", roster, authorityLeak, /publicAuthority must be false/);

console.log("PRACTITIONER SIGNAL PILOT CALIBRATION PASS valid=1 rejected=6 paid=blocked silent_recurrence=blocked mismatch=blocked missing_evidence=blocked no_ruling=blocked authority=blocked");
