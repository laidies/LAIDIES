#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inventoryPath = join(root, "operations/product-stewards/control-room/portfolio-work-inventory.json");
const reportPath = join(root, "operations/product-stewards/control-room/PORTFOLIO-WORK-INVENTORY.md");
const censusPath = join(root, "operations/product-stewards/control-room/portfolio-source-census.json");
const registry = JSON.parse(readFileSync(join(root, "operations/product-stewards/registry.json"), "utf8"));
const inventory = JSON.parse(readFileSync(inventoryPath, "utf8"));
const productIds = new Set(registry.products.map((product) => product.id));
const errors = [];

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function markdownRows(path) {
  const rel = relative(root, path);
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  const rows = [];
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
      if (cells.every((cell) => /^:?-{3,}:?$/.test(cell)) || /^(id|receipt|idea cluster|priority|existing idea or cluster)$/i.test(cells[0])) return;
      if (cells[0]) rows.push({ kind: "table-row", sourcePath: rel, line: index + 1, key: cells[0].replaceAll("`", ""), raw: cells.join(" | ") });
      return;
    }
    const ordered = trimmed.match(/^\d+\.\s+(?:\*\*)?(.+?)(?:\*\*)?(?:\s|$)/);
    const keyedBullet = trimmed.match(/^-\s+\*\*([^*]+)\*\*/);
    if (ordered) rows.push({ kind: "ordered-item", sourcePath: rel, line: index + 1, key: ordered[1].slice(0, 120), raw: trimmed });
    else if (keyedBullet) rows.push({ kind: "keyed-bullet", sourcePath: rel, line: index + 1, key: keyedBullet[1].trim(), raw: trimmed });
  });
  return rows;
}

const backlogPaths = walk(join(root, "operations/product-stewards"))
  .filter((path) => /\/backlog\.md$/i.test(path))
  .sort();
const ideaPath = join(root, "docs/growth/ali-idea-backlog.md");
const ideaText = readFileSync(ideaPath, "utf8");
const ideaSections = [...ideaText.matchAll(/^## (.+)$/gm)].map((match) => match[1]).filter((heading) => !["Capture protocol", "July 24 idea clusters moved into specifications"].includes(heading));
const clusterBlock = ideaText.match(/## July 24 idea clusters moved into specifications\n([\s\S]*?)\n## /)?.[1] ?? "";
const ideaClusters = clusterBlock.split(/\r?\n/).filter((line) => line.startsWith("|")).map((line) => line.slice(1, -1).split("|")[0].trim()).filter((cell) => cell && !/^(Idea cluster|[-: ]+)$/i.test(cell));

const sourceItems = [ideaPath, ...backlogPaths].flatMap(markdownRows);
const sourceFiles = [ideaPath, ...backlogPaths].map((path) => {
  const text = readFileSync(path, "utf8");
  return { path: relative(root, path), sha256: sha256(text), identifiedItems: sourceItems.filter((item) => item.sourcePath === relative(root, path)).length };
});

if (inventory.schemaVersion !== 1) errors.push("schemaVersion must be 1");
if (!Array.isArray(inventory.items) || inventory.items.length === 0) errors.push("items must be a non-empty array");
const ids = new Set();
const mappedSections = new Set();
const mappedClusters = new Set();
for (const item of inventory.items ?? []) {
  for (const field of ["id", "title", "status", "priority", "disposition", "buildingOrFunction", "currentTruth", "nextAction", "doneWhen"]) {
    if (typeof item[field] !== "string" || !item[field].trim()) errors.push(`${item.id ?? "UNKNOWN"}: missing ${field}`);
  }
  if (ids.has(item.id)) errors.push(`duplicate id ${item.id}`);
  ids.add(item.id);
  if (!inventory.statuses.includes(item.status)) errors.push(`${item.id}: invalid status ${item.status}`);
  if (!inventory.priorities.includes(item.priority)) errors.push(`${item.id}: invalid priority ${item.priority}`);
  if (!inventory.dispositions.includes(item.disposition)) errors.push(`${item.id}: invalid disposition ${item.disposition}`);
  if (!Array.isArray(item.ownerProductIds) || item.ownerProductIds.length === 0) errors.push(`${item.id}: ownerProductIds required`);
  for (const owner of item.ownerProductIds ?? []) if (!productIds.has(owner)) errors.push(`${item.id}: unknown product owner ${owner}`);
  if (!Array.isArray(item.sources) || item.sources.length === 0) errors.push(`${item.id}: sources required`);
  for (const source of item.sources ?? []) if (!existsSync(join(root, source))) errors.push(`${item.id}: missing source ${source}`);
  for (const section of item.ideaLogSections ?? []) mappedSections.add(section);
  for (const cluster of item.ideaLogClusters ?? []) mappedClusters.add(cluster);
}
for (const section of ideaSections) if (!mappedSections.has(section)) errors.push(`unmapped Ali idea-log section: ${section}`);
for (const cluster of ideaClusters) if (!mappedClusters.has(cluster)) errors.push(`unmapped Ali idea cluster: ${cluster}`);

const counts = {
  initiatives: inventory.items.length,
  sourceFiles: sourceFiles.length,
  identifiedSourceItems: sourceItems.length,
  registeredProducts: registry.products.length,
  registeredBuildings: registry.products.filter((product) => product.kind === "building").length,
  byPriority: Object.fromEntries(inventory.priorities.map((priority) => [priority, inventory.items.filter((item) => item.priority === priority).length])),
  byStatus: Object.fromEntries(inventory.statuses.map((status) => [status, inventory.items.filter((item) => item.status === status).length]))
};

const census = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose: "Loss-prevention census of identifiable rows and ordered/keyed actions in the canonical Ali idea log and every product-steward backlog. Raw wording is preserved with source line; the curated portfolio inventory supplies deduplicated sequencing.",
  coverage: counts,
  sourceFiles,
  items: sourceItems
};

function tableFor(priority) {
  const rows = inventory.items.filter((item) => item.priority === priority);
  return [
    "| ID | Initiative | Truth | Build disposition | Owner / home | Exact next action |",
    "|---|---|---|---|---|---|",
    ...rows.map((item) => `| ${item.id} | ${item.title} | ${item.status} | ${item.disposition} | ${item.ownerProductIds[0]} · ${item.buildingOrFunction} | ${item.nextAction} |`)
  ].join("\n");
}

const report = `# LAiDIES portfolio work inventory\n\n**Status:** ACTIVE CONTROL INVENTORY — NOT A RELEASE CLAIM\n**As of:** ${inventory.asOf}\n**Machine source:** \`portfolio-work-inventory.json\`\n**Complete source census:** \`portfolio-source-census.json\`\n\n## What this protects\n\nThis inventory prevents an idea, recommendation or blocker from disappearing between conversation, the shared idea log and a building backlog. The source census preserves every identifiable source entry and line. The tables below deduplicate that source material into initiatives with an accountable owner, sequence and next executable action.\n\nA row marked **CAPTURED**, **SPECIFIED** or **BUILT LOCALLY** is not public and is not complete. A **LATER** row remains visible and must retain its return trigger; it is not discarded.\n\n## Coverage\n\n- ${counts.initiatives} deduplicated initiatives\n- ${counts.identifiedSourceItems} identifiable source entries preserved across ${counts.sourceFiles} canonical idea/backlog files\n- ${counts.registeredProducts} registered products, including ${counts.registeredBuildings} canonical buildings\n- NOW ${counts.byPriority.NOW} · NEXT ${counts.byPriority.NEXT} · LATER ${counts.byPriority.LATER}\n- Evidence truth: ${Object.entries(counts.byStatus).filter(([, count]) => count).map(([status, count]) => `${status} ${count}`).join(" · ")}\n\n## Gaps newly made explicit in this reconciliation\n\n1. **Experience-flexible learning is not a built system.** LAiDIES needs topic-by-topic support choices—essentials, use it, go deeper, judge it—without permanently labelling a woman beginner or advanced.\n2. **The positive Daily idea needs an editorial product, not an affirmation.** Its job is one concrete act of curiosity or mutual advancement each day, with an anti-cringe gate and original language.\n3. **Mutual advancement is a sitewide product and culture rule.** Credit, invitations, specific help, advocacy and opportunity sharing must appear in Community, LUMINAiRY, rewards and writing—not only one Daily card.\n4. **Many partial foundations are real but not complete journeys.** Identity, continuation, messaging, cards and dashboard work must be reconciled rather than rebuilt or overstated.\n\n## NOW\n\n${tableFor("NOW")}\n\n## NEXT\n\n${tableFor("NEXT")}\n\n## LATER — preserved, not lost\n\n${tableFor("LATER")}\n\n## Capture-to-build rule\n\nA material idea is not safely handled until all applicable steps exist:\n\n1. faithful raw capture in the canonical idea log or an exact product source;\n2. reconciliation against existing work so duplicates merge rather than overwrite;\n3. one accountable registered product owner and affected owners;\n4. this inventory records truth, priority, dependencies, next action and done condition;\n5. the destination backlog accepts the build obligation;\n6. implementation work enters the active queue when its trigger fires;\n7. blockers carry an owner, unblock action and review date;\n8. Ali sees only a decision-ready question when her judgment is genuinely needed; and\n9. built, reviewed, released and publicly verified remain separate receipts.\n\nRun \`node scripts/build-portfolio-work-inventory.mjs --write\` after material idea or routing changes. The check fails if any top-level Ali idea-log family or July 24 cluster is no longer mapped into the curated inventory.\n`;

if (errors.length) {
  console.error(`Portfolio work inventory FAIL (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (process.argv.includes("--write")) {
  writeFileSync(censusPath, `${JSON.stringify(census, null, 2)}\n`);
  writeFileSync(reportPath, report);
}

console.log(`Portfolio work inventory PASS: ${counts.initiatives} initiatives; ${counts.identifiedSourceItems} source items; ${counts.sourceFiles} source files; ${counts.registeredProducts} products; NOW ${counts.byPriority.NOW}; NEXT ${counts.byPriority.NEXT}; LATER ${counts.byPriority.LATER}.`);
