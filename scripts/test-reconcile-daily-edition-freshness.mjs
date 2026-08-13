#!/usr/bin/env node

import assert from "node:assert/strict";
import { reconcileDailyEditionFreshness } from "./reconcile-daily-edition-freshness.mjs";

const record = (id, status, publicEligibility, expiresAt) => ({
  id,
  editionDate: "2026-08-03",
  type: id.endsWith("PAIGE") ? "paige_tip" : id.endsWith("CAREER") ? "career_life" : "promptoscope",
  classification: "sourced_service",
  status,
  headline: "Test headline",
  summary: "Test summary",
  sourcePath: "package.json",
  sourceId: `${id}-SOURCE`,
  destination: null,
  owner: "newsstand-daily",
  freshness: { lastCheckedAt: "2026-08-03", expiresAt, recheckTriggers: ["Source changes."] },
  reviewEvidence: { accuracy: "a", editorial: "e", voice: "v", format: "f", owner: "o", safety: null },
  publicEligibility
});

const fixture = {
  schemaVersion: "1.0.0",
  owner: "newsstand-daily",
  updatedAt: "2026-08-03",
  emptyStates: {
    paige_tip: "empty", promptoscope: "empty", career_life: "empty", mme_claio: "empty", song: "empty",
    did_you_know: "empty", town_note: "empty", curiosity: "empty", fiction: "empty"
  },
  records: [
    record("DAILY-2026-08-03-PAIGE", "APPROVED", "ELIGIBLE", "2026-08-07"),
    record("DAILY-2026-08-03-PROMPT", "PUBLISHED", "ELIGIBLE", "2026-08-20"),
    record("DAILY-2026-08-03-CAREER", "HOLD", "INELIGIBLE", "2026-08-07")
  ]
};

const first = reconcileDailyEditionFreshness(fixture, { asOf: "2026-08-12" });
assert.deepEqual(first.expiredIds, ["DAILY-2026-08-03-PAIGE"]);
assert.equal(first.data.records[0].status, "EXPIRED");
assert.equal(first.data.records[0].publicEligibility, "INELIGIBLE");
assert.equal(first.data.records[1].status, "PUBLISHED");
assert.equal(first.data.records[2].status, "HOLD");
assert.equal(first.data.updatedAt, "2026-08-12");
const second = reconcileDailyEditionFreshness(first.data, { asOf: "2026-08-12" });
assert.equal(second.changed, false);
assert.deepEqual(second.data, first.data);
assert.throws(() => reconcileDailyEditionFreshness(fixture, { asOf: "not-a-date" }), /--as-of/);

console.log("DAILY FRESHNESS RECONCILER TEST PASS expired_public_transitioned=1 unexpired_preserved=1 held_preserved=1 idempotent=1 invalid_date_rejected=1");
