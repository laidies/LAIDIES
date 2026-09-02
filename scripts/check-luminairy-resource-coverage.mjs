#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const ledgerPath = process.env.LUMINAIRY_RESOURCE_LEDGER
  ? path.resolve(process.env.LUMINAIRY_RESOURCE_LEDGER)
  : path.join(root, "operations/product-stewards/luminairy/profile-resource-coverage-ledger-2026-09-02.md");
const ledger = fs.readFileSync(ledgerPath, "utf8");
const profiles = readJson("content/luminairy-profiles.json");
const claims = readJson("content/luminairy-claims.json").records;
const receipts = readJson("content/luminairy-editorial-receipts.json").receipts;
const errors = [];

const roster = [
  ...profiles.mavens.map((profile) => ({ ...profile, wing: "mavens" })),
  ...profiles.trailblazers.map((profile) => ({ ...profile, wing: "trailblazers" }))
];
const protectedSaintIds = new Set(profiles.saints.map((profile) => profile.id));
const rows = [...ledger.matchAll(/^\| ([1-6]) \| (?:MAiVEN|Trailblazer) · `([^`]+)` ·/gm)]
  .map((match) => ({ batch: Number(match[1]), id: match[2] }));

if (profiles.mavens.length !== 23) errors.push(`expected 23 MAiVENS, found ${profiles.mavens.length}`);
if (profiles.trailblazers.length !== 7) errors.push(`expected 7 Trailblazers, found ${profiles.trailblazers.length}`);
if (profiles.saints.length !== 13) errors.push(`protected Saint count changed: ${profiles.saints.length}`);
if (rows.length !== 30) errors.push(`coverage ledger must contain 30 card rows, found ${rows.length}`);

const ledgerIds = rows.map((row) => row.id);
const rosterIds = roster.map((profile) => profile.id);
for (const id of rosterIds) {
  if (ledgerIds.filter((candidate) => candidate === id).length !== 1) errors.push(`ledger coverage mismatch ${id}`);
}
for (const id of ledgerIds) {
  if (!rosterIds.includes(id)) errors.push(`unknown ledger profile ${id}`);
  if (protectedSaintIds.has(id)) errors.push(`protected Saint entered resource ledger ${id}`);
}
for (let batch = 1; batch <= 6; batch += 1) {
  const count = rows.filter((row) => row.batch === batch).length;
  if (count !== 5) errors.push(`batch ${batch} must contain 5 profiles, found ${count}`);
}

for (const profile of roster) {
  const imagePath = path.join(root, profile.image.replace(/^\//, ""));
  if (!fs.existsSync(imagePath) || fs.statSync(imagePath).size === 0) errors.push(`missing image ${profile.wing}:${profile.id}`);
  const claimId = `${profile.wing}-${profile.id}`;
  if (claims.filter((claim) => claim.claimId === claimId).length !== 1) errors.push(`claim coverage mismatch ${claimId}`);
  if (receipts.filter((receipt) => receipt.claimId === claimId).length !== 1) errors.push(`receipt coverage mismatch ${claimId}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("LUMINAiRY RESOURCE COVERAGE PASS: 23 MAiVENS + 7 Trailblazers in six exact five-person batches; 13 Saints protected; images, claims and receipts present");
