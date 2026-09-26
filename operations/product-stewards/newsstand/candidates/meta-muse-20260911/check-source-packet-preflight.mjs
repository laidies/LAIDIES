#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/meta-muse-20260911";
const readJson = name => JSON.parse(fs.readFileSync(path.join(root, dir, name), "utf8"));

function inspect(preflight) {
  const claims = readJson("claim-map.json");
  const evidence = readJson("source-evidence.json");
  const records = new Map(evidence.records.map(record => [record.id, record]));
  const mappings = new Map(preflight.claims.map(entry => [entry.claimId, entry]));
  const raw = new Map([
    ["meta-muse-launch", fs.readFileSync(path.join(root, dir, "source/launch-normalized.txt"), "utf8")],
    ["meta-muse-safety", fs.readFileSync(path.join(root, dir, "source/safety.txt"), "utf8")],
    ["ap-meta-muse-report", JSON.stringify(readJson("source/ap-web-observation.json"))]
  ]);
  const errors = [];
  const claimIds = new Set(claims.map(claim => claim.claimId));
  for (const claim of claims) {
    const mapping = mappings.get(claim.claimId);
    if (!mapping) { errors.push(`missing preflight mapping: ${claim.claimId}`); continue; }
    if (!Array.isArray(mapping.supports) || !mapping.supports.length) errors.push(`missing support excerpts: ${claim.claimId}`);
    for (const support of mapping.supports || []) {
      if (!claim.sourceIds.includes(support.sourceId)) errors.push(`support source not claimed: ${claim.claimId}/${support.sourceId}`);
      const record = records.get(support.sourceId);
      if (!record) { errors.push(`missing source record: ${support.sourceId}`); continue; }
      if (!record.passages.includes(support.passage)) errors.push(`support excerpt omitted from packet: ${claim.claimId}/${support.sourceId}`);
      if (!raw.get(support.sourceId)?.includes(support.passage)) errors.push(`support excerpt absent from preserved source: ${claim.claimId}/${support.sourceId}`);
    }
  }
  for (const id of mappings.keys()) if (!claimIds.has(id)) errors.push(`orphan preflight mapping: ${id}`);
  return errors;
}

const preflight = readJson("source-packet-preflight.json");
const errors = inspect(preflight);
if (process.argv.includes("--calibrate")) {
  const bad = structuredClone(preflight);
  bad.claims = bad.claims.filter(entry => entry.claimId !== "reader-action");
  const calibrationErrors = inspect(bad);
  if (!calibrationErrors.some(error => error === "missing preflight mapping: reader-action")) throw Error("Calibration failed to reject omitted reader-action evidence");
  console.log("SOURCE PACKET PREFLIGHT CALIBRATION PASS rejected_omitted_claim=reader-action");
}
if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`SOURCE PACKET PREFLIGHT PASS claims=${preflight.claims.length} exact_source_excerpts=${preflight.claims.reduce((sum, entry) => sum + entry.supports.length, 0)}`);
