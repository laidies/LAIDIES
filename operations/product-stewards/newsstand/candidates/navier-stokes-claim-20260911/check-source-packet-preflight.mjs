#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/navier-stokes-claim-20260911";
const readJson = name => JSON.parse(fs.readFileSync(path.join(root, dir, name), "utf8"));
const sourceFiles = {
  "openai-announcement": "source/openai-web-observation.json",
  "openai-paper": "source/openai-paper-observation.json",
  "openai-lean-repository": "source/github-repository-observation.json",
  "buckmaster-statement": "source/buckmaster-statement-observation.json",
  "clay-prize-rules": "source/clay-rules-observation.json",
  "nature-report": "source/nature-report-observation.json"
};

function inspect(preflight, nowMs = Date.now()) {
  const claims = readJson("claim-map.json");
  const evidence = readJson("source-evidence.json");
  const attempts = readJson("source-attempts.json");
  const records = new Map(evidence.records.map(record => [record.id, record]));
  const mappings = new Map(preflight.claims.map(entry => [entry.claimId, entry]));
  const full = new Map(Object.entries(sourceFiles).map(([id, file]) => [id, fs.readFileSync(path.join(root, dir, file), "utf8")]));
  const errors = [];
  const checkTime = (label, value) => {
    const parsed = Date.parse(value);
    if (!Number.isFinite(parsed)) errors.push(`invalid timestamp: ${label}`);
    else if (parsed > nowMs) errors.push(`future timestamp: ${label}`);
  };
  checkTime("source-evidence.checkedAt", evidence.checkedAt);
  checkTime("source-attempts.checkedAt", attempts.checkedAt);
  checkTime("source-packet-preflight.checkedAt", preflight.checkedAt);
  for (const attempt of attempts.attempts || []) checkTime(`source attempt ${attempt.url}`, attempt.capturedAt);
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
      if (!full.get(support.sourceId)?.includes(support.passage)) errors.push(`support excerpt absent from complete reviewer source: ${claim.claimId}/${support.sourceId}`);
    }
  }
  for (const id of mappings.keys()) if (!claimIds.has(id)) errors.push(`orphan preflight mapping: ${id}`);
  return errors;
}

const preflight = readJson("source-packet-preflight.json");
const errors = inspect(preflight);
if (process.argv.includes("--calibrate")) {
  const omitted = structuredClone(preflight);
  omitted.claims = omitted.claims.filter(entry => entry.claimId !== "buckmaster-boundary");
  const omittedErrors = inspect(omitted);
  if (!omittedErrors.includes("missing preflight mapping: buckmaster-boundary")) throw Error("Calibration failed to reject omitted attribution evidence");
  const future = structuredClone(preflight);
  future.checkedAt = "2099-01-01T00:00:00Z";
  const futureErrors = inspect(future);
  if (!futureErrors.includes("future timestamp: source-packet-preflight.checkedAt")) throw Error("Calibration failed to reject future evidence time");
  console.log("SOURCE PACKET PREFLIGHT CALIBRATION PASS rejected_omitted_claim=buckmaster-boundary rejected_future_timestamp=true");
}
if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log(`SOURCE PACKET PREFLIGHT PASS claims=${preflight.claims.length} exact_source_excerpts=${preflight.claims.reduce((sum, entry) => sum + entry.supports.length, 0)}`);
