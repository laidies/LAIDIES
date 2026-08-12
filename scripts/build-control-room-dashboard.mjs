#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assessDashboardFreshness } from "./control-room-freshness.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const controlRoomDir = path.join(
  repoRoot,
  "operations",
  "product-stewards",
  "control-room"
);
const statePath = path.join(controlRoomDir, "dashboard-state.json");
const audienceStatePath = path.join(
  repoRoot,
  "operations",
  "product-stewards",
  "audience-growth",
  "measurement-state.json"
);
const externalServicesStatePath = path.join(
  repoRoot,
  "operations",
  "product-stewards",
  "platform-reliability",
  "external-services-state.json"
);
const decisionPacketsPath = path.join(controlRoomDir, "decision-packets.json");
const templatePath = path.join(controlRoomDir, "dashboard-template.html");
const outputPath = path.join(controlRoomDir, "dashboard.html");
const marker = "__CONTROL_ROOM_DASHBOARD_STATE__";

const [stateText, audienceStateText, externalServicesStateText, decisionPacketsText, template] = await Promise.all([
  readFile(statePath, "utf8"),
  readFile(audienceStatePath, "utf8"),
  readFile(externalServicesStatePath, "utf8"),
  readFile(decisionPacketsPath, "utf8"),
  readFile(templatePath, "utf8")
]);

const state = JSON.parse(stateText);
state.controlRoomFreshness = assessDashboardFreshness(state);
state.audience = JSON.parse(audienceStateText);
state.externalServices = JSON.parse(externalServicesStateText);
state.decisionPackets = JSON.parse(decisionPacketsText);
const requiredTopLevel = [
  "schemaVersion",
  "generatedAt",
  "evidenceCutoff",
  "phase",
  "nextAudit",
  "publicTruth",
  "audit",
  "visualProductionLock",
  "visualProduction",
  "owners",
  "schedule",
  "decisions"
];

for (const key of requiredTopLevel) {
  if (!(key in state)) {
    throw new Error(`dashboard-state.json is missing required key: ${key}`);
  }
}

if (!Array.isArray(state.owners) || state.owners.length === 0) {
  throw new Error("dashboard-state.json must contain at least one owner");
}

for (const key of ["status", "rule", "allowedNow", "blockedUntil", "afterDecision"]) {
  if (!(key in state.visualProductionLock)) {
    throw new Error(`dashboard-state.json visualProductionLock is missing required key: ${key}`);
  }
}

if (!Array.isArray(state.visualProduction) || state.visualProduction.length === 0) {
  throw new Error("dashboard-state.json must contain visualProduction rows");
}

const visualProductionIds = new Set();
for (const item of state.visualProduction) {
  for (const key of [
    "id",
    "name",
    "owner",
    "taskId",
    "status",
    "artifact",
    "blocker",
    "unblock",
    "nextRun",
    "aliDecision"
  ]) {
    if (!(key in item)) {
      throw new Error(`Visual production row ${item.id ?? "(unknown)"} is missing ${key}`);
    }
  }
  if (visualProductionIds.has(item.id)) {
    throw new Error(`Duplicate visual production id: ${item.id}`);
  }
  visualProductionIds.add(item.id);
}

for (const key of [
  "schemaVersion",
  "asOf",
  "period",
  "truth",
  "sourceStatus",
  "metrics",
  "popularPages",
  "leastPopularPages",
  "social",
  "opportunities"
]) {
  if (!(key in state.audience)) {
    throw new Error(`measurement-state.json is missing required key: ${key}`);
  }
}

for (const key of [
  "schemaVersion",
  "asOf",
  "scope",
  "truth",
  "summary",
  "costSummary",
  "costLedger",
  "services",
  "recommendations"
]) {
  if (!(key in state.externalServices)) {
    throw new Error(`external-services-state.json is missing required key: ${key}`);
  }
}

if (
  !Array.isArray(state.externalServices.costLedger) ||
  !Array.isArray(state.externalServices.services) ||
  !Array.isArray(state.externalServices.recommendations)
) {
  throw new Error("external-services-state.json costLedger, services and recommendations must be arrays");
}

for (const key of ["schemaVersion", "asOf", "rule", "packets"]) {
  if (!(key in state.decisionPackets)) {
    throw new Error(`decision-packets.json is missing required key: ${key}`);
  }
}

if (!Array.isArray(state.decisionPackets.packets)) {
  throw new Error("decision-packets.json packets must be an array");
}

for (const packet of state.decisionPackets.packets) {
  for (const key of [
    "id",
    "sequence",
    "priority",
    "status",
    "owner",
    "title",
    "question",
    "plainEnglish",
    "recommendation",
    "options",
    "whatThisApproves",
    "whatThisDoesNotApprove",
    "evidence",
    "visuals",
    "ifDeferred",
    "afterDecision"
  ]) {
    if (!(key in packet)) {
      throw new Error(`Decision packet ${packet.id ?? "(unknown)"} is missing ${key}`);
    }
  }
  if (!Array.isArray(packet.options) || packet.options.length < 2) {
    throw new Error(`Decision packet ${packet.id} must contain at least two options`);
  }
  if (!Array.isArray(packet.visuals) || packet.visuals.length === 0) {
    throw new Error(`Decision packet ${packet.id} must contain visual evidence`);
  }
}

const ownerIds = new Set();
for (const owner of state.owners) {
  for (const key of [
    "id",
    "name",
    "category",
    "taskId",
    "status",
    "currentWork",
    "visibleDeliverable",
    "blocker",
    "unblock",
    "evidenceAt",
    "nextRun",
    "nextDecision"
  ]) {
    if (!(key in owner)) {
      throw new Error(`Owner ${owner.id ?? "(unknown)"} is missing ${key}`);
    }
  }
  if (ownerIds.has(owner.id)) {
    throw new Error(`Duplicate owner id: ${owner.id}`);
  }
  ownerIds.add(owner.id);
}

if (!template.includes(marker)) {
  throw new Error(`Dashboard template is missing ${marker}`);
}

const embeddedState = JSON.stringify(state)
  .replaceAll("<", "\\u003c")
  .replaceAll(">", "\\u003e")
  .replaceAll("&", "\\u0026");
const output = template.replace(marker, embeddedState);

await writeFile(outputPath, output, "utf8");
console.log(
  `CONTROL ROOM DASHBOARD BUILT owners=${state.owners.length} output=${path.relative(repoRoot, outputPath)}`
);
