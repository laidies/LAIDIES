#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HASH = /^[a-f0-9]{64}$/;
const day = value => /^\d{4}-\d{2}-\d{2}$/.test(value || "") ? value : null;

export function selectAidbEdition(inventory, cursor, asOf) {
  if (!day(asOf)) throw new Error("asOf must be YYYY-MM-DD");
  if (!Array.isArray(inventory)) throw new Error("inventory must be an array");
  const processed = new Map((cursor?.processedEditions || []).map(item => [`${item.editionDate}|${item.url}`, item]));
  const eligible = inventory.filter(item => day(item.editionDate) && item.editionDate <= asOf && item.complete === true && /^https:\/\//.test(item.url || "") && HASH.test(item.transcriptSha256 || "") && Number.isInteger(item.itemCount) && item.itemCount > 0).sort((a, b) => b.editionDate.localeCompare(a.editionDate));
  for (const item of eligible) {
    const prior = processed.get(`${item.editionDate}|${item.url}`);
    if (!prior) return { status: "PROCESS_NEW_COMPLETE_EDITION", edition: item };
    if (prior.transcriptSha256 !== item.transcriptSha256 || prior.itemCount !== item.itemCount) return { status: "RECHECK_CHANGED_TRANSCRIPT", edition: item, prior };
  }
  return { status: "QUIET_NO_NEW_COMPLETE_AIDB_EDITION", edition: null };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [inventoryPath, cursorPath, asOf] = process.argv.slice(2);
  if (!inventoryPath || !cursorPath || !asOf) throw new Error("Usage: select-aidb-edition.mjs <inventory.json> <cursor.json> <YYYY-MM-DD>");
  console.log(JSON.stringify(selectAidbEdition(JSON.parse(fs.readFileSync(inventoryPath)), JSON.parse(fs.readFileSync(cursorPath)), asOf), null, 2));
}
