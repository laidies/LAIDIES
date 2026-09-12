#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/national-safety-proposals-20260911";
const readJson = name => JSON.parse(fs.readFileSync(path.join(root, dir, name), "utf8"));
function inspect(preflight) {
  const claims = readJson("claim-map.json");
  const evidence = readJson("source-evidence.json");
  const records = new Map(evidence.records.map(record => [record.id, record]));
  const mappings = new Map(preflight.claims.map(entry => [entry.claimId, entry]));
  const raw = new Map([
    ["openai-policy-window", fs.readFileSync(path.join(root, dir, "source/openai-web-observation.json"), "utf8")],
    ["sanders-casar-announcement", fs.readFileSync(path.join(root, dir, "source/sanders-web-observation.json"), "utf8")],
    ["reuters-openai-policy-report", fs.readFileSync(path.join(root, dir, "source/reuters-web-observation.json"), "utf8")]
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
function inspectTimestamps(nowMs = Date.now(), values = null) {
  const evidence = readJson("source-evidence.json");
  const attempts = readJson("source-attempts.json");
  const sourceObservations = [
    readJson("source/openai-web-observation.json"),
    readJson("source/sanders-web-observation.json"),
    readJson("source/reuters-web-observation.json")
  ];
  const story = readJson("story.json");
  const actual = values || {
    evidenceCheckedAt: evidence.checkedAt,
    attemptsCheckedAt: attempts.checkedAt,
    sourceAccessedAt: sourceObservations.map(record => record.accessedAt),
    storyLastCheckedAt: story.lastCheckedAt,
    storyUpdatedAt: story.updatedAt
  };
  const errors = [];
  const parse = (label, value) => {
    const parsed = Date.parse(value);
    if (!Number.isFinite(parsed)) errors.push(`invalid provenance timestamp: ${label}`);
    else if (parsed > nowMs) errors.push(`future provenance timestamp: ${label}`);
    return parsed;
  };
  const evidenceAt = parse("source-evidence.checkedAt", actual.evidenceCheckedAt);
  const attemptsAt = parse("source-attempts.checkedAt", actual.attemptsCheckedAt);
  const accessed = actual.sourceAccessedAt.map((value, index) => parse(`source[${index}].accessedAt`, value));
  const lastCheckedAt = parse("story.lastCheckedAt", actual.storyLastCheckedAt);
  parse("story.updatedAt", actual.storyUpdatedAt);
  if (evidenceAt !== attemptsAt) errors.push("evidence and attempt completion times differ");
  if (accessed.some(value => value > evidenceAt)) errors.push("source access occurs after evidence completion");
  if (lastCheckedAt !== evidenceAt) errors.push("story freshness time differs from evidence completion");
  return errors;
}
const preflight = readJson("source-packet-preflight.json");
const errors = [...inspect(preflight), ...inspectTimestamps()];
if (process.argv.includes("--calibrate")) {
  const bad = structuredClone(preflight);
  bad.claims = bad.claims.filter(entry => entry.claimId !== "federal-status");
  const calibrationErrors = inspect(bad);
  if (!calibrationErrors.includes("missing preflight mapping: federal-status")) throw Error("Calibration failed to reject omitted legal-status evidence");
  const nowMs = Date.now();
  const valid = {
    evidenceCheckedAt: "2026-09-11T08:46:55-07:00",
    attemptsCheckedAt: "2026-09-11T08:46:55-07:00",
    sourceAccessedAt: Array(3).fill("2026-09-11T08:45:37-07:00"),
    storyLastCheckedAt: "2026-09-11T08:46:55-07:00",
    storyUpdatedAt: "2026-09-11T08:46:55-07:00"
  };
  const future = structuredClone(valid);
  future.evidenceCheckedAt = new Date(nowMs + 60_000).toISOString();
  future.attemptsCheckedAt = future.evidenceCheckedAt;
  future.storyLastCheckedAt = future.evidenceCheckedAt;
  const timestampCalibrationErrors = inspectTimestamps(nowMs, future);
  if (!timestampCalibrationErrors.some(error => error === "future provenance timestamp: source-evidence.checkedAt")) throw Error("Calibration failed to reject future source evidence time");
  console.log("SOURCE PACKET PREFLIGHT CALIBRATION PASS rejected_omitted_claim=federal-status rejected_future_timestamp=source-evidence.checkedAt");
}
if (errors.length) { console.error(errors.map(error => `- ${error}`).join("\n")); process.exit(1); }
console.log(`SOURCE PACKET PREFLIGHT PASS claims=${preflight.claims.length} exact_source_excerpts=${preflight.claims.reduce((sum, entry) => sum + entry.supports.length, 0)}`);
