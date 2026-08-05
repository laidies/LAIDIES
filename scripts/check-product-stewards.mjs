#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { checkContentWorkOrders } from "./check-content-work-orders.mjs";
import { checkDailyLearningDerivatives } from "./check-daily-learning-derivatives.mjs";
import { checkLearningRelationships } from "./check-learning-relationships.mjs";
import { checkLearningOrchestrationGuide } from "./check-learning-orchestration-guide.mjs";
import { checkContentReleaseReadiness } from "./check-content-release-readiness.mjs";

const root = process.cwd();
const base = path.join(root, "operations", "product-stewards");
const registry = JSON.parse(fs.readFileSync(path.join(base, "registry.json"), "utf8"));
const queue = JSON.parse(fs.readFileSync(path.join(base, "run-queue.json"), "utf8"));
const events = JSON.parse(fs.readFileSync(path.join(base, "event-dictionary.json"), "utf8"));
const guilds = JSON.parse(fs.readFileSync(path.join(base, "guilds.json"), "utf8"));
const learningResolutionQueue = JSON.parse(
  fs.readFileSync(path.join(root, "content", "learning-blocker-resolution-queue.json"), "utf8")
);
const args = process.argv.slice(2);
const ownerEntryIndex = args.indexOf("--owner-entry");
const ownerEntryId = ownerEntryIndex >= 0 ? args[ownerEntryIndex + 1] : null;
const strictOwnerEntry = args.includes("--strict-owner-entry");

const errors = [];
const ids = new Set();
const ownerEntryGaps = [];
const contentWorkOrders = checkContentWorkOrders({ root });
errors.push(...(contentWorkOrders.errors || []).map((error) => `content work orders: ${error}`));
const contentReleaseReadiness = checkContentReleaseReadiness({ root });
errors.push(...(contentReleaseReadiness.errors || []).map((error) => `content release readiness: ${error}`));
const dailyDerivatives = checkDailyLearningDerivatives({ root });
errors.push(...(dailyDerivatives.errors || []).map((error) => `daily learning derivatives: ${error}`));
const learningRelationships = checkLearningRelationships({ root });
const learningResolutionOwners = new Map(
  (learningResolutionQueue.tasks || []).map((task) => [task.id, task.owner])
);
const deferredLearningErrors = [];
for (const error of learningRelationships.errors || []) {
  const resolutionId = /^(LCR-\d+)\b/.exec(error)?.[1];
  const scopedOwnerId = resolutionId ? learningResolutionOwners.get(resolutionId) : null;
  const isUnrelatedScopedError =
    ownerEntryId && !strictOwnerEntry && scopedOwnerId && scopedOwnerId !== ownerEntryId;
  if (isUnrelatedScopedError) deferredLearningErrors.push(error);
  else errors.push(`learning relationships: ${error}`);
}
const learningOrchestration = checkLearningOrchestrationGuide({ root });
errors.push(...(learningOrchestration.errors || []).map((error) => `learning orchestration: ${error}`));
const portfolioInventory = spawnSync(
  process.execPath,
  [path.join(root, "scripts", "build-portfolio-work-inventory.mjs")],
  { cwd: root, encoding: "utf8" }
);
if (portfolioInventory.status !== 0) {
  const detail = `${portfolioInventory.stdout || ""}\n${portfolioInventory.stderr || ""}`.trim();
  errors.push(`portfolio work inventory: ${detail || `validator exited ${portfolioInventory.status}`}`);
}

function findAdmissionManifests(directory) {
  const found = [];
  if (!fs.existsSync(directory)) return found;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...findAdmissionManifests(absolute));
    if (entry.isFile() && entry.name === "ADMISSION.json") found.push(absolute);
  }
  return found;
}

for (const admissionPath of findAdmissionManifests(path.join(root, "operations", "design-explorations"))) {
  let admission;
  try {
    admission = JSON.parse(fs.readFileSync(admissionPath, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(root, admissionPath)} is invalid JSON: ${error.message}`);
    continue;
  }
  const label = admission.competition_id || path.relative(root, admissionPath);
  if (admission.schema_version !== 1) errors.push(`${label} admission schema_version must be 1`);
  if (!["ROUGH", "ADMITTED", "REJECTED"].includes(admission.status)) {
    errors.push(`${label} has invalid admission status`);
  }
  if (admission.status === "ADMITTED") {
    if (!admission.reviewer_id || admission.reviewer_id === admission.maker_id) {
      errors.push(`${label} lacks an independent visual reviewer`);
    }
    if (!admission.owner_review_ready) errors.push(`${label} admitted without owner_review_ready`);
    for (const score of ["product_legibility", "positive_laidies_brand_contribution", "ux_accessibility"]) {
      if (!Number.isFinite(admission.scores?.[score]) || admission.scores[score] < 17) {
        errors.push(`${label} admission ${score} is below 17/20`);
      }
    }
    for (const [check, passed] of Object.entries(admission.visible_audit || {})) {
      if (passed !== true) errors.push(`${label} visible admission failed ${check}`);
    }
  } else if (admission.owner_review_ready !== false) {
    errors.push(`${label} ${admission.status} artifact cannot be owner-review ready`);
  }
}

if (registry.schema_version !== 3) errors.push("registry schema_version must be 3");
if (registry.orchestrator.concurrency_policy !== queue.concurrency_policy) {
  errors.push("registry and queue concurrency policies disagree");
}
if (queue.concurrency_policy !== "COLLISION_AWARE_BY_SCOPE_AND_INTEGRATION_LOCK") {
  errors.push("queue must use collision-aware concurrency");
}
const activeProductIds = new Set();
for (const item of queue.active) {
  if (activeProductIds.has(item.product_id)) errors.push(`duplicate active product: ${item.product_id}`);
  activeProductIds.add(item.product_id);
  if (item.status !== "RUNNING") errors.push(`${item.product_id} active item must say RUNNING`);
  if (!item.heartbeat_at) errors.push(`${item.product_id} active item missing heartbeat_at`);
  if (!item.last_evidence_at) errors.push(`${item.product_id} active item missing last_evidence_at`);
  if (!item.current_action) errors.push(`${item.product_id} active item missing current_action`);
  if (!Array.isArray(item.write_scope) || item.write_scope.length === 0) {
    errors.push(`${item.product_id} active item missing write_scope`);
  }
  if (!Array.isArray(item.live_owner_tasks) || item.live_owner_tasks.length === 0) {
    errors.push(`${item.product_id} active item missing live_owner_tasks`);
  }
  if (!item.integration_owner) errors.push(`${item.product_id} active item missing integration_owner`);
}
const initializingProductIds = new Set();
for (const item of queue.initializing_recovery || []) {
  if (activeProductIds.has(item.product_id) || initializingProductIds.has(item.product_id)) {
    errors.push(`duplicate live product: ${item.product_id}`);
  }
  initializingProductIds.add(item.product_id);
  if (item.status !== "INITIALIZING_OWNER_ENTRY_RECOVERY") {
    errors.push(`${item.product_id} recovery item has invalid status`);
  }
  if (!item.heartbeat_at) errors.push(`${item.product_id} recovery item missing heartbeat_at`);
  if (!Array.isArray(item.live_owner_tasks) || item.live_owner_tasks.length === 0) {
    errors.push(`${item.product_id} recovery item missing live_owner_tasks`);
  }
  if (!item.scope_lock) errors.push(`${item.product_id} recovery item missing scope_lock`);
}
for (const item of queue.initializing_systems || []) {
  if (activeProductIds.has(item.product_id) || initializingProductIds.has(item.product_id)) {
    errors.push(`duplicate live product: ${item.product_id}`);
  }
  initializingProductIds.add(item.product_id);
  if (item.status !== "INITIALIZING") errors.push(`${item.product_id} system initialization has invalid status`);
  for (const field of ["owner_task_id", "current_action", "heartbeat_at", "last_evidence_at", "scope_lock", "collision_boundary"]) {
    if (!item[field]) errors.push(`${item.product_id} system initialization missing ${field}`);
  }
  const registered = registry.products.find((product) => product.id === item.product_id);
  if (registered?.owner_task_id !== item.owner_task_id) {
    errors.push(`${item.product_id} registry and system owner task IDs disagree`);
  }
}

for (const product of registry.products) {
  if (ids.has(product.id)) errors.push(`duplicate product id: ${product.id}`);
  ids.add(product.id);
  for (const field of ["name", "champion", "dossier", "state", "initial_deep_dive", "launch_status", "next_trigger"]) {
    if (!product[field]) errors.push(`${product.id} missing ${field}`);
  }
  if (
    (!Array.isArray(product.routes) || product.routes.length === 0) &&
    (!Array.isArray(product.scope) || product.scope.length === 0)
  ) {
    errors.push(`${product.id} has no routes/scope`);
  }

  const dossierPath = path.join(base, product.dossier);
  const statePath = path.join(base, product.state);
  if (!fs.existsSync(dossierPath)) {
    ownerEntryGaps.push({ productId: product.id, kind: "missing_dossier", path: product.dossier });
  }
  if (!fs.existsSync(statePath)) {
    ownerEntryGaps.push({ productId: product.id, kind: "missing_state", path: product.state });
  }

  const productDirectory = path.dirname(dossierPath);
  if (product.kind === "building") {
    const experienceBriefPath = path.join(productDirectory, "EXPERIENCE-BRIEF.md");
    if (!fs.existsSync(experienceBriefPath)) {
      ownerEntryGaps.push({
        productId: product.id,
        kind: "missing_experience_brief",
        path: path.relative(base, experienceBriefPath)
      });
    } else if (!/^## (?:Audience and )?visitor-state\b/im.test(fs.readFileSync(experienceBriefPath, "utf8"))) {
      ownerEntryGaps.push({
        productId: product.id,
        kind: "incomplete_experience_visitor_states",
        path: path.relative(base, experienceBriefPath)
      });
    }
    const functionalityMapPath = path.join(productDirectory, "FUNCTIONALITY-MAP.md");
    if (!fs.existsSync(functionalityMapPath)) {
      ownerEntryGaps.push({
        productId: product.id,
        kind: "missing_functionality_map",
        path: path.relative(base, functionalityMapPath)
      });
    } else if (!/^## Visitor-state\b/im.test(fs.readFileSync(functionalityMapPath, "utf8"))) {
      ownerEntryGaps.push({
        productId: product.id,
        kind: "incomplete_functionality_visitor_states",
        path: path.relative(base, functionalityMapPath)
      });
    }
    const visualAssetInventoryPath = path.join(productDirectory, "VISUAL-ASSET-INVENTORY.md");
    if (!fs.existsSync(visualAssetInventoryPath)) {
      ownerEntryGaps.push({
        productId: product.id,
        kind: "missing_visual_asset_inventory",
        path: path.relative(base, visualAssetInventoryPath)
      });
    } else {
      const visualAssetInventory = fs.readFileSync(visualAssetInventoryPath, "utf8");
      if (
        !/^## Discovery evidence\b/im.test(visualAssetInventory) ||
        !/^## Asset disposition register\b/im.test(visualAssetInventory)
      ) {
        ownerEntryGaps.push({
          productId: product.id,
          kind: "incomplete_visual_asset_inventory",
          path: path.relative(base, visualAssetInventoryPath)
        });
      }
    }
  }

  if (product.parent_id === null) {
    for (const requiredFile of ["CHARTER.md", "OPERATING-SPEC.md", "state.json", "backlog.md"]) {
      const requiredPath = path.join(productDirectory, requiredFile);
      if (!fs.existsSync(requiredPath)) {
        ownerEntryGaps.push({
          productId: product.id,
          kind: `missing_top_level_${requiredFile.toLowerCase().replaceAll(".", "_")}`,
          path: path.relative(base, requiredPath)
        });
      }
    }
  }
}

if (ownerEntryIndex >= 0 && !ownerEntryId) {
  errors.push("--owner-entry requires a product id");
}
if (ownerEntryId && !registry.products.some((product) => product.id === ownerEntryId)) {
  errors.push(`unknown owner-entry product id: ${ownerEntryId}`);
}

const enforcedOwnerEntryGaps = strictOwnerEntry
  ? ownerEntryGaps
  : ownerEntryId
    ? ownerEntryGaps.filter((gap) => gap.productId === ownerEntryId)
    : [];
for (const gap of enforcedOwnerEntryGaps) {
  errors.push(`${gap.productId} owner entry ${gap.kind}: ${gap.path}`);
}

const buildings = registry.products.filter((product) => product.kind === "building");
const buildingNumbers = new Set(buildings.map((product) => product.building_number));
if (buildings.length !== 17) errors.push(`expected 17 building champions, found ${buildings.length}`);
for (let number = 1; number <= 17; number += 1) {
  if (!buildingNumbers.has(number)) errors.push(`missing building champion number ${number}`);
}
for (const product of registry.products) {
  if (product.parent_id && !ids.has(product.parent_id)) {
    errors.push(`${product.id} references unknown parent ${product.parent_id}`);
  }
}

for (const item of [...queue.active, ...(queue.initializing_recovery || []), ...(queue.initializing_systems || []), ...(queue.completed_owner_entry_recovery || []), ...(queue.completed_system_initializations || []), ...queue.completed_manual_pilots]) {
  if (!ids.has(item.product_id)) errors.push(`queue references unknown product: ${item.product_id}`);
}
for (const id of queue.queued_order) {
  if (!ids.has(id)) errors.push(`queued_order references unknown product: ${id}`);
}
for (const id of queue.next_implementation_order || []) {
  if (!ids.has(id)) errors.push(`next_implementation_order references unknown product: ${id}`);
}

const queueIds = [
  ...queue.active.map((x) => x.product_id),
  ...(queue.initializing_recovery || []).map((x) => x.product_id),
  ...(queue.initializing_systems || []).map((x) => x.product_id),
  ...(queue.completed_owner_entry_recovery || []).map((x) => x.product_id),
  ...(queue.completed_system_initializations || []).map((x) => x.product_id),
  ...queue.completed_manual_pilots.map((x) => x.product_id),
  ...queue.queued_order
];
for (const product of registry.products.filter((item) => item.parent_id === null)) {
  if (!queueIds.includes(product.id)) errors.push(`top-level product missing from run queue: ${product.id}`);
}

const eventNames = new Set();
for (const event of events.events) {
  if (eventNames.has(event.name)) errors.push(`duplicate event: ${event.name}`);
  eventNames.add(event.name);
  if (!Array.isArray(event.safe_properties)) errors.push(`${event.name} missing safe_properties`);
}

const activeStates = new Map(queue.active.map((x) => [x.product_id, x.status]));
for (const product of registry.products.filter((x) => x.initial_deep_dive === "RUNNING")) {
  if (activeStates.get(product.id) !== "RUNNING") {
    errors.push(`${product.id} says RUNNING but is not active in run queue`);
  }
}

const guildIds = new Set();
for (const role of guilds.roles) {
  if (guildIds.has(role.id)) errors.push(`duplicate guild role: ${role.id}`);
  guildIds.add(role.id);
  if (!role.owns || !role.trigger || typeof role.may_block !== "boolean") {
    errors.push(`guild role ${role.id} is incomplete`);
  }
}

if (errors.length) {
  console.error("PRODUCT STEWARD SYSTEM FAIL");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const counts = registry.products.reduce((acc, product) => {
  acc[product.initial_deep_dive] = (acc[product.initial_deep_dive] || 0) + 1;
  return acc;
}, {});

console.log("PRODUCT STEWARD STRUCTURE PASS");
console.log(`products=${registry.products.length}`);
console.log(`active=${queue.active.length} (${queue.concurrency_policy})`);
console.log(`events=${events.events.length}`);
console.log(`guild_roles=${guilds.roles.length}`);
console.log(`deep_dive_states=${JSON.stringify(counts)}`);
const ownerEntryGapCounts = ownerEntryGaps.reduce((acc, gap) => {
  acc[gap.kind] = (acc[gap.kind] || 0) + 1;
  return acc;
}, {});
const productsWithOwnerEntryGaps = new Set(ownerEntryGaps.map((gap) => gap.productId));
console.log(`owner_entry_ready=${registry.products.length - productsWithOwnerEntryGaps.size}/${registry.products.length}`);
console.log(`owner_entry_gaps=${JSON.stringify(ownerEntryGapCounts)}`);
console.log(`content_work_orders=${contentWorkOrders.workOrders}`);
console.log(`content_records_covered=${contentWorkOrders.coveredRecords}`);
console.log(`content_ready_to_dispatch=${contentWorkOrders.readyToDispatch.join(",") || "none"}`);
const deliveryAttention = queue.active.length === 0 && contentWorkOrders.readyToDispatch.length > 0;
console.log(`autonomous_delivery=${deliveryAttention ? 'ATTENTION_REQUIRED' : 'ACTIVE_OR_NO_READY_WORK'}${deliveryAttention ? ` active=0 ready_to_dispatch=${contentWorkOrders.readyToDispatch.length}` : ''}`);
console.log(`content_release_ready=${contentReleaseReadiness.ready.join(",") || "none"}`);
console.log(`content_release_held=${contentReleaseReadiness.held.length}`);
console.log(`daily_learning_derivatives=${dailyDerivatives.records || 0}`);
console.log(`daily_learning_derivatives_public=${dailyDerivatives.publicRecords || 0}`);
const openResolutionTasks = (learningRelationships.blockers || [])
  .map((blocker) => blocker.resolution)
  .filter((task) => task && task.status !== "RESOLVED");
console.log(`learning_resolution_tasks_open=${openResolutionTasks.length}`);
console.log(`portfolio_work_inventory=${portfolioInventory.stdout.trim() || "PASS"}`);
for (const task of openResolutionTasks) {
  console.log(
    `learning_resolution_task=${task.id}|${task.status}|${task.priority}|owner=${task.owner}|review=${task.nextReviewAt}|next=${task.nextAction}`
  );
}
if (ownerEntryId) console.log(`owner_entry_product=${ownerEntryId}:PASS`);
for (const error of deferredLearningErrors) {
  console.log(`owner_entry_unrelated_attention=learning relationships: ${error}`);
}
