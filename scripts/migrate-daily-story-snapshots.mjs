#!/usr/bin/env node

// One-time, fail-closed migration for independently admitted Daily envelopes
// created before complete story snapshots were part of the envelope contract.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const reject = (message) => { throw new Error(`DAILY_SNAPSHOT_MIGRATION_REJECT: ${message}`); };

export function migrateEnvelope({ envelope, storiesRaw }) {
  if (!envelope || envelope.schemaVersion !== "daily-private-issue-v1" || !/^\d{4}-\d{2}-\d{2}$/.test(envelope.editionDate || "")) {
    reject("invalid predecessor envelope");
  }
  if (Object.prototype.hasOwnProperty.call(envelope, "storySnapshots")) reject("predecessor already contains story snapshots");
  if (!Array.isArray(envelope.storyIds) || new Set(envelope.storyIds).size !== envelope.storyIds.length) reject("invalid predecessor story IDs");
  const context = { window: {} };
  vm.runInNewContext(storiesRaw, context, { timeout: 1000 });
  const stories = context.window.NEWSSTAND_DATA && context.window.NEWSSTAND_DATA.stories || [];
  const snapshots = envelope.storyIds.map((id) => {
    const story = stories.find((item) => item.id === id && item.edition === "daily" &&
      String(item.publishedAt || "").slice(0, 10) === envelope.editionDate && ["published", "corrected"].includes(item.status));
    if (!story) reject(`story ${id} is not an admitted same-date Daily source record`);
    return JSON.parse(JSON.stringify(story));
  });
  return { ...envelope, storySnapshots: snapshots };
}

function main() {
  const args = process.argv.slice(2);
  const index = args.indexOf("--envelope");
  const envelopePath = path.resolve(index === -1 ? "" : args[index + 1] || "");
  if (!envelopePath.startsWith(`${PRIVATE_ROOT}${path.sep}`) || !fs.existsSync(envelopePath)) reject("envelope must exist inside the private Daily directory");
  const beforeRaw = fs.readFileSync(envelopePath, "utf8");
  const migrated = migrateEnvelope({
    envelope: JSON.parse(beforeRaw),
    storiesRaw: fs.readFileSync(path.join(ROOT, "content/newsstand-stories.js"), "utf8")
  });
  const afterRaw = `${canonicalJson(migrated)}\n`;
  fs.writeFileSync(envelopePath, afterRaw);
  console.log(`DAILY SNAPSHOT MIGRATION PASS date=${migrated.editionDate} stories=${migrated.storySnapshots.length} predecessor_sha256=${sha256(beforeRaw)} successor_sha256=${sha256(afterRaw)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
