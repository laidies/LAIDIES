#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HOUR = 60 * 60 * 1000;

function parseTime(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return NaN;
  return Date.parse(value);
}

export function assessDashboardFreshness(state, nowValue = new Date(), maximumAgeHours = 18) {
  const now = nowValue instanceof Date ? nowValue.getTime() : Date.parse(nowValue);
  const errors = [];
  const evidence = parseTime(state?.evidenceCutoff);
  const generated = parseTime(state?.generatedAt);
  const nextAudit = parseTime(state?.nextAudit);
  if (!Number.isFinite(now)) errors.push("invalid evaluation time");
  if (!Number.isFinite(evidence)) errors.push("evidenceCutoff must be an exact ISO timestamp");
  if (!Number.isFinite(generated)) errors.push("generatedAt must be an exact ISO timestamp");
  if (!Number.isFinite(nextAudit)) errors.push("nextAudit must be an exact future ISO timestamp");
  if (Number.isFinite(evidence) && now - evidence > maximumAgeHours * HOUR) errors.push(`evidence is older than ${maximumAgeHours} hours`);
  if (Number.isFinite(generated) && now - generated > maximumAgeHours * HOUR) errors.push(`dashboard is older than ${maximumAgeHours} hours`);
  if (Number.isFinite(evidence) && evidence - now > 5 * 60 * 1000) errors.push("evidenceCutoff is in the future");
  if (Number.isFinite(generated) && generated - now > 5 * 60 * 1000) errors.push("generatedAt is in the future");
  if (Number.isFinite(nextAudit) && nextAudit <= now) errors.push("nextAudit is overdue");
  if (Number.isFinite(nextAudit) && nextAudit - now > maximumAgeHours * HOUR) errors.push(`nextAudit is more than ${maximumAgeHours} hours away`);
  return {
    status: errors.length ? "STALE" : "CURRENT",
    checkedAt: new Date(now).toISOString(),
    maximumAgeHours,
    evidenceAgeHours: Number.isFinite(evidence) ? Number(((now - evidence) / HOUR).toFixed(2)) : null,
    nextAudit: Number.isFinite(nextAudit) ? new Date(nextAudit).toISOString() : null,
    errors
  };
}

export function parseAutomationToml(text) {
  const value = (key) => text.match(new RegExp(`^${key}\\s*=\\s*"([^"]*)"`, "m"))?.[1] ?? null;
  return { id: value("id"), kind: value("kind"), status: value("status"), rrule: value("rrule"), prompt: value("prompt") };
}

function cadenceErrors(rrule) {
  const hours = rrule?.match(/(?:^|;)BYHOUR=([0-9,]+)/)?.[1]?.split(",").map(Number).sort((a, b) => a - b) ?? [];
  if (!/FREQ=DAILY/.test(rrule || "") || hours.length !== 2 || hours.some((hour) => !Number.isInteger(hour) || hour < 0 || hour > 23)) {
    return ["Control Room cadence must be exactly twice daily"];
  }
  const gaps = [hours[1] - hours[0], 24 - hours[1] + hours[0]];
  const errors = [];
  if (Math.min(...gaps) < 4) errors.push("Control Room runs are too close together to prevent overlap");
  if (Math.max(...gaps) > 14) errors.push("Control Room leaves more than 14 hours between runs");
  return errors;
}

export function assessControlRoomRuntime(state, automation, nowValue = new Date()) {
  const dashboard = assessDashboardFreshness(state, nowValue);
  const errors = [...dashboard.errors];
  if (automation?.id !== "laidies-product-champion-orchestrator") errors.push("wrong Control Room automation identity");
  if (automation?.status !== "ACTIVE") errors.push(`Control Room automation is ${automation?.status || "MISSING"}, not ACTIVE`);
  if (!automation?.kind || !["heartbeat", "cron"].includes(automation.kind)) errors.push("Control Room automation kind is invalid");
  errors.push(...cadenceErrors(automation?.rrule));
  for (const [pattern, message] of [
    [/dashboard-state\.json/, "automation prompt does not bind dashboard-state.json"],
    [/AUDIT-RECEIPTS\.md/, "automation prompt does not bind AUDIT-RECEIPTS.md"],
    [/delta/i, "automation prompt does not require delta-only reconciliation"],
    [/non-overlap|overlap/i, "automation prompt does not prohibit overlapping runs"],
    [/exact(?: future)? ISO/i, "automation prompt does not require a machine-checkable next audit"]
  ]) if (!pattern.test(automation?.prompt || "")) errors.push(message);
  return { ...dashboard, status: errors.length ? "STALE_OR_STOPPED" : "CURRENT_AND_SCHEDULED", errors: [...new Set(errors)] };
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const root = process.cwd();
  const statePath = path.resolve(root, process.argv[2] || "operations/product-stewards/control-room/dashboard-state.json");
  const automationPath = path.resolve(process.argv[3] || path.join(os.homedir(), ".codex/automations/laidies-product-champion-orchestrator/automation.toml"));
  try {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    const automation = parseAutomationToml(fs.readFileSync(automationPath, "utf8"));
    const result = assessControlRoomRuntime(state, automation);
    console.log(JSON.stringify(result, null, 2));
    if (result.errors.length) process.exitCode = 1;
  } catch (error) {
    console.error(`CONTROL ROOM RUNTIME CHECK FAIL: ${error.message}`);
    process.exitCode = 1;
  }
}
