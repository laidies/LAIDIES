#!/usr/bin/env node

import assert from "node:assert/strict";
import { validateSourceReconciliation } from "./check-source-reconciliation.mjs";

const base = {
  schemaVersion: "laidies-source-reconciliation.v1",
  receiptId: "CAL-AIDB-20260806-META",
  signals: [{
    signalId: "AIDB-2026-08-06-META-MUSE",
    sourceSystem: "AIDB",
    sourceUrl: "https://aidailybrief.ai/e/2026-08-06",
    sourcePublishedAt: "2026-08-06T12:00:00-07:00",
    observedAt: "2026-08-06T16:00:00-07:00",
    finalRecheckAt: "2026-08-06T16:30:00-07:00",
    disposedAt: "2026-08-06T16:38:49-07:00",
    sourceLinksState: "EMPTY",
    materialClaims: [{
      claimId: "META-MUSE-INCIDENT",
      claim: "A Meta Muse model reached a third party during an Irregular evaluation.",
      namedReferences: ["Meta", "Irregular"],
      aliasesChecked: ["Muse Code", "Muse Spark", "Muse Spark 1.1"],
      disposition: "SOURCE_HELD_MATERIAL_UPDATE",
      searches: [
        { track: "official_or_primary", query: "site:meta.com Muse Spark Irregular incident", checkedAt: "2026-08-06T16:05:00-07:00", outcome: "NO_RESULT", results: [] },
        { track: "independent_reporting", query: "Meta Muse Spark Irregular hacked company", checkedAt: "2026-08-06T16:10:00-07:00", outcome: "FOUND", results: [{ url: "https://apnews.com/article/0e8061437da6779be962b24ac134a514", publisher: "Associated Press", publishedAt: "2026-08-06T13:38:50-07:00", relationship: "CONFIRMS_MATERIAL_CLAIM" }] },
        { track: "named_reference", query: "site:irregular.com Meta Muse Spark evaluation", checkedAt: "2026-08-06T16:15:00-07:00", outcome: "FOUND", results: [{ url: "https://www.irregular.com/research/assessing-muse-spark-1.1-against-offensive-security-benchmarks", publisher: "Irregular", publishedAt: "2026-07-01T00:00:00Z", relationship: "CONTEXT_ONLY" }] },
        { track: "aliases_and_mechanism", query: "\"Muse Code\" OR \"Muse Spark\" sandbox misconfiguration internet", checkedAt: "2026-08-06T16:20:00-07:00", outcome: "FOUND", results: [{ url: "https://apnews.com/article/0e8061437da6779be962b24ac134a514", publisher: "Associated Press", publishedAt: "2026-08-06T13:38:50-07:00", relationship: "CONFIRMS_MATERIAL_CLAIM" }] }
      ]
    }]
  }]
};

assert.equal(validateSourceReconciliation(base).errors.length, 0);

const knownBad = structuredClone(base);
knownBad.signals[0].materialClaims[0].disposition = "WATCH_SOURCE_IDENTITY_UNRESOLVED";
knownBad.signals[0].materialClaims[0].searches = knownBad.signals[0].materialClaims[0].searches.slice(0, 1);
const errors = validateSourceReconciliation(knownBad).errors;
assert(errors.some((error) => error.includes("missing independent_reporting")));
assert(errors.some((error) => error.includes("missing named_reference")));
assert(errors.some((error) => error.includes("missing aliases_and_mechanism")));

const falseUnresolved = structuredClone(base);
falseUnresolved.signals[0].materialClaims[0].disposition = "WATCH_SOURCE_IDENTITY_UNRESOLVED";
assert(validateSourceReconciliation(falseUnresolved).errors.some((error) => error.includes("found a material confirmation")));

console.log("SOURCE RECONCILIATION TEST PASS");
console.log("calibration=the exact August 6 shallow-search HOLD and confirmation-ignored variants are rejected");
