#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = path.join(root, "operations", "product-stewards");
const registry = JSON.parse(fs.readFileSync(path.join(base, "registry.json"), "utf8"));
const queue = JSON.parse(fs.readFileSync(path.join(base, "run-queue.json"), "utf8"));
const events = JSON.parse(fs.readFileSync(path.join(base, "event-dictionary.json"), "utf8"));
const guilds = JSON.parse(fs.readFileSync(path.join(base, "guilds.json"), "utf8"));

const errors = [];
const ids = new Set();

if (registry.schema_version !== 3) errors.push("registry schema_version must be 3");
if (registry.orchestrator.active_concurrency_limit !== queue.concurrency_limit) {
  errors.push("registry and queue concurrency limits disagree");
}
if (queue.active.length > queue.concurrency_limit) errors.push("active queue exceeds concurrency limit");

for (const product of registry.products) {
  if (ids.has(product.id)) errors.push(`duplicate product id: ${product.id}`);
  ids.add(product.id);
  for (const field of ["name", "champion", "dossier", "state", "initial_deep_dive", "launch_status", "next_trigger"]) {
    if (!product[field]) errors.push(`${product.id} missing ${field}`);
  }
  if (!Array.isArray(product.routes) || product.routes.length === 0) {
    errors.push(`${product.id} has no routes/scope`);
  }
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

for (const item of [...queue.active, ...queue.completed_manual_pilots]) {
  if (!ids.has(item.product_id)) errors.push(`queue references unknown product: ${item.product_id}`);
}
for (const id of queue.queued_order) {
  if (!ids.has(id)) errors.push(`queued_order references unknown product: ${id}`);
}

const queueIds = [
  ...queue.active.map((x) => x.product_id),
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

console.log("PRODUCT STEWARD SYSTEM PASS");
console.log(`products=${registry.products.length}`);
console.log(`active=${queue.active.length}/${queue.concurrency_limit}`);
console.log(`events=${events.events.length}`);
console.log(`guild_roles=${guilds.roles.length}`);
console.log(`deep_dive_states=${JSON.stringify(counts)}`);
