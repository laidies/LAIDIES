#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC_INVENTORY_STATUSES = new Set(["PUBLISHED"]);
const PUBLIC_GRAPH_STATUSES = new Set(["PUBLIC"]);

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function normalise(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function searchableText(entry) {
  return normalise([entry.title, entry.summary, ...(entry.topics || []), ...(entry.aliases || [])].join(" "));
}

export function checkLearningRelationships({ root = process.cwd(), writeReport = false } = {}) {
  const errors = [];
  const warnings = [];
  const graph = readJson(root, "content/learning-relationship-graph.json");
  const inventory = readJson(root, "operations/product-stewards/learning-content-ecosystem/inventory.json");
  const siteIndex = readJson(root, "content/site/site-index.json").entries;
  const classes = readJson(root, "content/site/high-classes.json").classes;
  const claims = readJson(root, "operations/product-stewards/learning-content-ecosystem/claim-register.json");
  const resolutionQueue = readJson(root, "content/learning-blocker-resolution-queue.json");

  if (graph.schemaVersion !== "1.0.0") errors.push("graph schemaVersion must be 1.0.0");
  const ids = new Set();
  for (const source of graph.governedSources || []) {
    if (!fs.existsSync(path.join(root, source.path))) errors.push(`governed source missing: ${source.path}`);
  }
  for (const node of graph.nodes || []) {
    if (ids.has(node.id)) errors.push(`duplicate node ${node.id}`);
    ids.add(node.id);
    if (!fs.existsSync(path.join(root, node.sourcePath))) errors.push(`${node.id} source missing: ${node.sourcePath}`);
    if (!Array.isArray(node.searchTerms) || node.searchTerms.length === 0) errors.push(`${node.id} has no search terms`);
  }

  const claimIds = new Set((claims.claims || []).map((claim) => claim.id));
  for (const node of graph.nodes || []) {
    for (const claimId of node.claimIds || []) if (!claimIds.has(claimId)) errors.push(`${node.id} references missing claim ${claimId}`);
    if (node.analogy && (!node.analogy.mapping || !node.analogy.limit)) errors.push(`${node.id} analogy lacks mapping or limit`);
  }

  const blockerIds = new Set((graph.knownBlockers || []).map((blocker) => blocker.id));
  const resolutionTasks = new Map((resolutionQueue.tasks || []).map((task) => [task.id, task]));
  const today = new Date().toISOString().slice(0, 10);
  for (const blocker of graph.knownBlockers || []) {
    const task = resolutionTasks.get(blocker.resolutionTaskId);
    if (!task) { errors.push(`${blocker.id} has no resolution task ${blocker.resolutionTaskId}`); continue; }
    if (task.blockerId !== blocker.id) errors.push(`${task.id} does not point back to ${blocker.id}`);
    if (task.owner !== blocker.owner) errors.push(`${task.id} owner disagrees with ${blocker.id}`);
    if (!["READY_TO_EXECUTE", "IN_PROGRESS", "WAITING_ON_EXTERNAL_TRIGGER", "RESOLVED"].includes(task.status)) errors.push(`${task.id} has invalid status ${task.status}`);
    if (!task.nextAction || !Array.isArray(task.closureChecks) || task.closureChecks.length < 2) errors.push(`${task.id} is not executable`);
    if (task.status !== "RESOLVED" && task.nextReviewAt < today) errors.push(`${task.id} is overdue and must be escalated`);
  }
  for (const task of resolutionQueue.tasks || []) if (!blockerIds.has(task.blockerId)) errors.push(`${task.id} references unknown blocker ${task.blockerId}`);
  const relationshipIds = new Set();
  const reverseKeys = new Set((graph.relationships || []).map((rel) => `${rel.from}|${rel.to}|${rel.type}`));
  for (const rel of graph.relationships || []) {
    if (relationshipIds.has(rel.id)) errors.push(`duplicate relationship ${rel.id}`);
    relationshipIds.add(rel.id);
    if (!ids.has(rel.from)) errors.push(`${rel.id} has unknown source ${rel.from}`);
    if (!ids.has(rel.to)) errors.push(`${rel.id} has unknown target ${rel.to}`);
    if (!rel.reason || rel.reason.length < 30) errors.push(`${rel.id} has generic or absent rationale`);
    if (rel.status === "PLANNED_BLOCKED" && (!rel.blockerId || !blockerIds.has(rel.blockerId))) errors.push(`${rel.id} lacks a valid blocker`);
    if (rel.status === "RENDERED" && rel.blockerId) errors.push(`${rel.id} is rendered but still names a blocker`);
    if (rel.direction === "RECIPROCAL_REQUIRED" && rel.status === "RENDERED" && !reverseKeys.has(`${rel.to}|${rel.from}|${rel.type}`)) {
      errors.push(`${rel.id} requires a rendered reciprocal relationship`);
    }
  }

  for (const proof of graph.renderedProofs || []) {
    if (!relationshipIds.has(proof.relationshipId)) errors.push(`rendered proof references missing ${proof.relationshipId}`);
    const absolute = path.join(root, proof.sourcePath);
    if (!fs.existsSync(absolute)) errors.push(`rendered proof source missing: ${proof.sourcePath}`);
    else if (!fs.readFileSync(absolute, "utf8").includes(proof.contains)) errors.push(`${proof.relationshipId} rendered marker missing: ${proof.contains}`);
  }

  const indexById = new Map(siteIndex.map((entry) => [entry.id, entry]));
  for (const proof of graph.searchProofs || []) {
    const expected = indexById.get(proof.expectedSiteIndexId);
    if (!expected) { errors.push(`search proof expects missing site index id ${proof.expectedSiteIndexId}`); continue; }
    const tokens = normalise(proof.query).split(" ").filter(Boolean);
    const haystack = searchableText(expected);
    if (!tokens.every((token) => haystack.includes(token))) errors.push(`query '${proof.query}' does not resolve to ${proof.expectedSiteIndexId}`);
    if (expected.status !== "live") errors.push(`query '${proof.query}' targets non-live ${proof.expectedSiteIndexId}`);
  }
  for (const conflict of graph.conflictChecks || []) {
    if (!ids.has(conflict.nodeId)) errors.push(`${conflict.id} references unknown node ${conflict.nodeId}`);
    if (!blockerIds.has(conflict.blockerId)) errors.push(`${conflict.id} references unknown blocker ${conflict.blockerId}`);
    const entry = indexById.get(conflict.siteIndexId);
    if (!entry) { errors.push(`${conflict.id} references missing site index id ${conflict.siteIndexId}`); continue; }
    const haystack = searchableText(entry);
    const stillConflicted = !conflict.mustContain.every((term) => haystack.includes(normalise(term)));
    if (stillConflicted) warnings.push(`${conflict.id} remains open under ${conflict.blockerId}`);
    else errors.push(`${conflict.id} appears corrected but its blocker/queue entry remains open; close it with evidence`);
  }

  const inventoryIds = new Set((inventory.records || []).map((record) => record.id));
  const classIds = new Set(classes.map((record) => `high:${record.slug}`));
  for (const node of graph.nodes || []) {
    if (node.id.startsWith("high:") && !classIds.has(node.id)) errors.push(`${node.id} is absent from the High register`);
    if (/^(episode|library|news):/.test(node.id) && !inventoryIds.has(node.id)) errors.push(`${node.id} is absent from the learning inventory`);
  }

  const publishedInventory = (inventory.records || []).filter((record) => PUBLIC_INVENTORY_STATUSES.has(record.status));
  for (const record of publishedInventory) if (!ids.has(record.id)) warnings.push(`published inventory node not yet explicit in representative graph: ${record.id}`);
  for (const node of graph.nodes || []) {
    const inventoryRecord = (inventory.records || []).find((record) => record.id === node.id);
    if (PUBLIC_GRAPH_STATUSES.has(node.status) && inventoryRecord && !PUBLIC_INVENTORY_STATUSES.has(inventoryRecord.status)) {
      errors.push(`${node.id} is public in graph but ${inventoryRecord.status} in inventory`);
    }
  }

  const orphanNodes = [...ids].filter((id) => !(graph.relationships || []).some((rel) => rel.from === id || rel.to === id));
  for (const id of orphanNodes) errors.push(`orphan representative node ${id}`);

  const report = {
    schemaVersion: "1.0.0",
    generatedAt: new Date().toISOString(),
    status: errors.length ? "FAIL" : "PASS_WITH_BLOCKERS",
    inventory: {
      learningRecords: inventory.records.length,
      highClasses: classes.length,
      siteIndexEntries: siteIndex.length,
      claimRecords: (claims.claims || []).length,
      representativeNodes: ids.size,
      relationships: relationshipIds.size,
      renderedRelationships: (graph.relationships || []).filter((rel) => rel.status === "RENDERED").length,
      plannedBlockedRelationships: (graph.relationships || []).filter((rel) => rel.status === "PLANNED_BLOCKED").length
    },
    blockers: graph.knownBlockers.map((blocker) => ({ ...blocker, resolution: resolutionTasks.get(blocker.resolutionTaskId) })),
    warnings,
    errors
  };
  if (writeReport) {
    const out = path.join(root, "operations/product-stewards/learning-content-ecosystem/learning-relationship-inventory-report.json");
    fs.writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
  }
  return report;
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const report = checkLearningRelationships({ writeReport: process.argv.includes("--write-report") });
  if (report.errors.length) {
    console.error("LEARNING RELATIONSHIP CHECK FAIL");
    for (const error of report.errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log("LEARNING RELATIONSHIP CHECK PASS_WITH_BLOCKERS");
  console.log(`learning_records=${report.inventory.learningRecords}`);
  console.log(`high_classes=${report.inventory.highClasses}`);
  console.log(`site_index_entries=${report.inventory.siteIndexEntries}`);
  console.log(`representative_nodes=${report.inventory.representativeNodes}`);
  console.log(`relationships=${report.inventory.relationships}`);
  console.log(`known_blockers=${report.blockers.length}`);
  for (const blocker of report.blockers) {
    const task = blocker.resolution;
    console.log(
      `resolution=${task.id}|${task.status}|${task.priority}|owner=${task.owner}|review=${task.nextReviewAt}|blocker=${blocker.id}|next=${task.nextAction}`
    );
  }
  for (const warning of report.warnings) console.log(`warning=${warning}`);
}
