import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  parseJsonl,
  scoreProviderOutputs,
  signRunManifest,
  verifyRunManifest
} from "./lib.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const required = [
  "--provider-input", "--outputs", "--join-map", "--out", "--provider",
  "--model", "--model-version", "--runner-commit", "--signing-private-key",
  "--approved-key-fingerprint", "--measurement-evidence", "--measurement-authority",
  "--authority-registry", "--approved-authority-registry-sha256", "--run-date",
  "--run-id"
];
for (const name of required) {
  if (!argument(name)) throw new Error(`Missing required argument: ${name}`);
}

const providerInputPath = path.resolve(argument("--provider-input"));
const outputPath = path.resolve(argument("--outputs"));
const joinMapPath = path.resolve(argument("--join-map"));
const measurementEvidencePath = path.resolve(argument("--measurement-evidence"));
const measurementAuthorityPath = path.resolve(argument("--measurement-authority"));
const resultDirectory = path.resolve(argument("--out"));
const signingKeyPath = path.resolve(argument("--signing-private-key"));
const providerInputBytes = fs.readFileSync(providerInputPath);
const outputBytes = fs.readFileSync(outputPath);
const joinMap = JSON.parse(fs.readFileSync(joinMapPath, "utf8"));
const measurementEvidence = JSON.parse(fs.readFileSync(measurementEvidencePath, "utf8"));
const measurementAuthorityBytes = fs.readFileSync(measurementAuthorityPath);
const authorityRegistryBytes = fs.readFileSync(
  path.resolve(argument("--authority-registry"))
);
const tokenizerImplementationBytes = argument("--tokenizer-implementation")
  ? fs.readFileSync(path.resolve(argument("--tokenizer-implementation")))
  : undefined;
const providerUsageReceiptsBytes = argument("--provider-usage-receipts")
  ? fs.readFileSync(path.resolve(argument("--provider-usage-receipts")))
  : undefined;
const outputRows = parseJsonl(outputBytes);

const report = await scoreProviderOutputs({
  outputRows,
  joinMap,
  providerInputBytes,
  providerOutputBytes: outputBytes,
  measurementEvidence,
  runIdentity: {
    provider: argument("--provider"),
    model: argument("--model"),
    modelVersion: argument("--model-version"),
    runDate: argument("--run-date"),
    runId: argument("--run-id")
  },
  measurementAuthorityBytes,
  tokenizerImplementationBytes,
  authorityRegistryBytes,
  approvedAuthorityRegistrySha256: argument("--approved-authority-registry-sha256"),
  providerUsageReceiptsBytes
});
const signingPrivateKeyPem = fs.readFileSync(signingKeyPath, "utf8");
const manifest = signRunManifest({
  report,
  provider: argument("--provider"),
  model: argument("--model"),
  modelVersion: argument("--model-version"),
  runnerCommit: argument("--runner-commit"),
  signingPrivateKeyPem,
  approvedPublicKeyFingerprint: argument("--approved-key-fingerprint")
});
const approvedPublicKeyPem = crypto.createPublicKey(signingPrivateKeyPem)
  .export({ type: "spki", format: "pem" });
if (!verifyRunManifest(manifest, {
  approvedPublicKeyPem,
  approvedPublicKeyFingerprint: argument("--approved-key-fingerprint")
})) throw new Error("Generated run-manifest signature did not verify against the preregistered fingerprint.");

fs.mkdirSync(resultDirectory, { recursive: true });
fs.writeFileSync(path.join(resultDirectory, "score-report.json"), JSON.stringify(report, null, 2) + "\n");
fs.writeFileSync(path.join(resultDirectory, "signed-run-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`Scored ${report.counts.expected} frozen semantic cases.`);
console.log(`Schema-valid: ${report.counts.schemaValid}/${report.counts.expected}`);
console.log(`Uncertain: ${report.counts.uncertain}; abstentions: ${report.counts.abstentions}`);
console.log(`Latency p50/p95/max: ${report.performance.latencyMs.p50}/${report.performance.latencyMs.p95}/${report.performance.latencyMs.max} ms`);
console.log(`Estimated cost: $${report.performance.estimatedCostUsd.toFixed(6)}`);
console.log("Manifest signature verified against preregistered runner fingerprint: true");
