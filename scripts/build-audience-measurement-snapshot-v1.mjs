import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  compileAudienceMeasurement,
  sha256,
  validateSnapshot
} from "../operations/product-stewards/platform-reliability/aggregate-measurement/v1/aggregate-measurement-v1.mjs";

const root = resolve(import.meta.dirname, "..");
const sourcePath = resolve(root, "operations/product-stewards/audience-growth/measurement-state.json");
const outputPath = resolve(
  root,
  "operations/product-stewards/platform-reliability/aggregate-measurement/v1/current-measurement-snapshot.v1.json"
);
const sourceBytes = readFileSync(sourcePath);
const state = JSON.parse(sourceBytes);
const snapshot = compileAudienceMeasurement(state, { sourceSha256: sha256(sourceBytes) });
validateSnapshot(snapshot, { now: new Date() });
writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `AUDIENCE MEASUREMENT SNAPSHOT V1 BUILT metrics=${snapshot.metrics.length} ` +
  `known_values=${snapshot.metrics.filter((metric) => metric.value !== null).length} ` +
  `payload_sha256=${snapshot.integrity.payloadSha256}`
);
