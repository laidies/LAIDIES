#!/usr/bin/env node

import assert from "node:assert/strict";
import { assessControlRoomRuntime, assessDashboardFreshness, parseAutomationToml } from "./control-room-freshness.mjs";

const now = new Date("2026-08-12T18:00:00Z");
const currentState = {
  generatedAt: "2026-08-12T17:55:00Z",
  evidenceCutoff: "2026-08-12T17:50:00Z",
  nextAudit: "2026-08-13T01:00:00Z"
};
const activeAutomation = {
  id: "laidies-product-champion-orchestrator",
  kind: "cron",
  status: "ACTIVE",
  rrule: "FREQ=DAILY;BYHOUR=10,22;BYMINUTE=0",
  prompt: "Read dashboard-state.json and AUDIT-RECEIPTS.md. Reconcile only the current delta. Prevent overlapping runs. Write nextAudit as an exact future ISO timestamp."
};

assert.equal(assessDashboardFreshness(currentState, now).status, "CURRENT");
assert.equal(assessControlRoomRuntime(currentState, activeAutomation, now).status, "CURRENT_AND_SCHEDULED");
assert.match(assessDashboardFreshness({ ...currentState, evidenceCutoff: "2026-08-10T17:50:00Z" }, now).errors.join("\n"), /evidence is older/);
assert.match(assessDashboardFreshness({ ...currentState, nextAudit: "tomorrow morning" }, now).errors.join("\n"), /exact future ISO/);
assert.match(assessControlRoomRuntime(currentState, { ...activeAutomation, status: "PAUSED" }, now).errors.join("\n"), /PAUSED, not ACTIVE/);
assert.match(assessControlRoomRuntime(currentState, { ...activeAutomation, rrule: "FREQ=DAILY;BYHOUR=11,12;BYMINUTE=0" }, now).errors.join("\n"), /too close together/);
assert.match(assessControlRoomRuntime(currentState, { ...activeAutomation, prompt: "Update the dashboard." }, now).errors.join("\n"), /delta-only|overlapping|next audit/);

const parsed = parseAutomationToml('id = "laidies-product-champion-orchestrator"\nkind = "cron"\nstatus = "ACTIVE"\nrrule = "FREQ=DAILY;BYHOUR=10,22;BYMINUTE=0"\nprompt = "delta"\n');
assert.equal(parsed.status, "ACTIVE");
assert.equal(parsed.kind, "cron");

console.log("CONTROL ROOM FRESHNESS TEST PASS");
console.log("calibration=stale-evidence,prose-next-audit,paused-automation,overlapping-cadence,missing-prompt-guards rejected");
