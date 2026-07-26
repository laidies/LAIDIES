import path from "node:path";
import process from "node:process";

import { writeExportArtifacts } from "./lib.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const output = argument("--out");
if (!output) {
  throw new Error("Usage: node harness/export-frozen-envelopes.mjs --out <directory>");
}

const outputDirectory = path.resolve(output);
const artifacts = writeExportArtifacts(outputDirectory);
console.log(`Exported ${artifacts.providerRecords.length} label-free classifier inputs.`);
console.log(`Send directory: ${path.join(outputDirectory, "send")}`);
console.log(`Private directory: ${path.join(outputDirectory, "private")}`);
console.log(`Provider input: ${path.join(outputDirectory, "send", "provider-input.jsonl")}`);
console.log(`Provider-input SHA-256: ${artifacts.metadata.providerInputHash}`);
console.log(`Frozen-set SHA-256: ${artifacts.metadata.setHash}`);
console.log("No provider was selected or called.");
