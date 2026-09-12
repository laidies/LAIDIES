#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/epa-public-participation-20260911";
const json = name => JSON.parse(fs.readFileSync(path.join(root, dir, name), "utf8"));
const files = {
  "epa-proposed-rule": "source/epa-proposal-api.txt",
  "epa-current-status": "source/epa-regulatory-actions.txt",
  "epa-data-centre-resources": "source/epa-data-centers.txt",
  "pa-amazon-permit-example": "source/pa-amazon-permit.txt",
  "ap-independent-report": "source/ap-report.txt"
};

function normalize(value) {
  return value
    .replace(/\[\[Page\s+\d+\]\]/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/``|''/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function inspect(preflight, now = Date.now()) {
  const claims = json("claim-map.json");
  const evidence = json("source-evidence.json");
  const attempts = json("source-attempts.json");
  const records = new Map(evidence.records.map(record => [record.id, record]));
  const mappings = new Map(preflight.claims.map(claim => [claim.claimId, claim]));
  const raw = new Map(Object.entries(files).map(([id, file]) => [
    id,
    normalize(fs.readFileSync(path.join(root, dir, file), "utf8"))
  ]));
  const errors = [];

  const time = (label, value) => {
    const parsed = Date.parse(value);
    if (typeof value !== "string" || !value.includes("T") || !Number.isFinite(parsed) || parsed > now) {
      errors.push(`invalid or future timestamp: ${label}`);
    }
  };
  time("evidence.checkedAt", evidence.checkedAt);
  time("attempts.checkedAt", attempts.checkedAt);
  time("preflight.checkedAt", preflight.checkedAt);
  for (const attempt of attempts.attempts || []) time(`attempt ${attempt.url}`, attempt.capturedAt);

  const claimIds = new Set(claims.map(claim => claim.claimId));
  for (const claim of claims) {
    const mapping = mappings.get(claim.claimId);
    if (!mapping) {
      errors.push(`missing preflight mapping: ${claim.claimId}`);
      continue;
    }
    for (const support of mapping.supports || []) {
      if (!claim.sourceIds.includes(support.sourceId)) {
        errors.push(`support source not claimed: ${claim.claimId}/${support.sourceId}`);
      }
      const record = records.get(support.sourceId);
      if (!record) {
        errors.push(`missing source: ${support.sourceId}`);
      } else if (!record.passages.includes(support.passage)) {
        errors.push(`passage omitted: ${claim.claimId}/${support.sourceId}`);
      }
      if (!raw.get(support.sourceId)?.includes(normalize(support.passage))) {
        errors.push(`passage absent from complete source: ${claim.claimId}/${support.sourceId}`);
      }
    }
  }
  for (const id of mappings.keys()) {
    if (!claimIds.has(id)) errors.push(`orphan mapping: ${id}`);
  }
  return errors;
}

const preflight = json("source-packet-preflight.json");
const errors = inspect(preflight);
if (process.argv.includes("--calibrate")) {
  const omitted = structuredClone(preflight);
  omitted.claims = omitted.claims.filter(claim => claim.claimId !== "proposal-status");
  if (!inspect(omitted).includes("missing preflight mapping: proposal-status")) {
    throw new Error("omitted-claim calibration failed");
  }
  const future = structuredClone(preflight);
  future.checkedAt = "2099-01-01T00:00:00Z";
  if (!inspect(future).includes("invalid or future timestamp: preflight.checkedAt")) {
    throw new Error("future-time calibration failed");
  }
  console.log("SOURCE PACKET PREFLIGHT CALIBRATION PASS omitted_proposal_status=reject future_time=reject");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`SOURCE PACKET PREFLIGHT PASS claims=${preflight.claims.length} excerpts=${preflight.claims.reduce((count, claim) => count + claim.supports.length, 0)}`);
