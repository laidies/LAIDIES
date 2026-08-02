#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || process.cwd());
const stewardRoot = path.join(root, "operations", "product-stewards");
const registryPath = path.join(stewardRoot, "registry.json");
const queuePath = path.join(stewardRoot, "run-queue.json");

for (const required of [registryPath, queuePath]) {
  if (!fs.existsSync(required)) {
    console.error(`Missing required product-steward file: ${required}`);
    process.exit(1);
  }
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const products = registry.products || [];
const buildings = products.filter((product) => product.kind === "building");
const states = products.reduce((counts, product) => {
  const state = product.initial_deep_dive || "UNKNOWN";
  counts[state] = (counts[state] || 0) + 1;
  return counts;
}, {});

console.log(`products=${products.length}`);
console.log(`buildings=${buildings.length}`);
console.log(`active=${(queue.active || []).length}/${queue.concurrency_limit}`);
console.log(`queued=${(queue.queued_order || []).length}`);
console.log(`states=${JSON.stringify(states)}`);

for (const run of queue.active || []) {
  console.log(`ACTIVE ${run.product_id} ${run.run_type} ${run.status}`);
}

for (const product of products.filter(
  (item) => item.parent_id === null && item.initial_deep_dive === "REPORT_READY",
)) {
  console.log(`NEXT ${product.id} ${product.next_trigger}`);
}
