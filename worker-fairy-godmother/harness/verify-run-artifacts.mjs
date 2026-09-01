import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  parseJsonl,
  scoreProviderOutputs,
  sha256,
  stableStringify,
  verifyRunArtifacts
} from "./lib.mjs";
import {
  REQUEST_CONFIGURATION,
  validateRequestHashBindings
} from "./terra-classifier-trial.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const required = [
  "--manifest", "--approved-public-key", "--approved-key-fingerprint",
  "--provider-input", "--outputs", "--join-map", "--report", "--system-prompt",
  "--request-configuration",
  "--measurement-authority", "--authority-registry",
  "--approved-authority-registry-sha256"
];
for (const name of required) {
  if (!argument(name)) throw new Error(`Missing required argument: ${name}`);
}

const read = (name) => fs.readFileSync(path.resolve(argument(name)));
const manifest = JSON.parse(read("--manifest"));
const joinMap = JSON.parse(read("--join-map"));
const report = JSON.parse(read("--report"));
const requestConfigurationBytes = read("--request-configuration");
const requestConfiguration = JSON.parse(requestConfigurationBytes);
const requestConfigurationCanonical = `${stableStringify(REQUEST_CONFIGURATION)}\n`;
const requestConfigurationHash = sha256(stableStringify(REQUEST_CONFIGURATION));
if (requestConfigurationBytes.toString("utf8") !== requestConfigurationCanonical ||
    stableStringify(requestConfiguration) !== stableStringify(REQUEST_CONFIGURATION) ||
    !report?.runIdentity?.runId?.endsWith(requestConfigurationHash) ||
    !manifest?.payload?.runId?.endsWith(requestConfigurationHash)) {
  throw new Error("Exact request configuration is not canonically bound into the signed run ID.");
}
const providerOutputBytes = read("--outputs");
const providerOutputRows = parseJsonl(providerOutputBytes);
validateRequestHashBindings(providerOutputRows);
const providerInputBytes = read("--provider-input");
const measurementAuthorityBytes = read("--measurement-authority");
const authorityRegistryBytes = read("--authority-registry");
const providerUsageReceiptsBytes = argument("--provider-usage-receipts")
  ? read("--provider-usage-receipts")
  : undefined;
const result = verifyRunArtifacts({
  manifest,
  approvedPublicKeyPem: read("--approved-public-key").toString("utf8"),
  approvedPublicKeyFingerprint: argument("--approved-key-fingerprint"),
  providerInputBytes,
  providerOutputBytes,
  joinMap,
  report,
  systemPromptBytes: read("--system-prompt"),
  measurementAuthorityBytes,
  authorityRegistryBytes,
  approvedAuthorityRegistrySha256: argument("--approved-authority-registry-sha256"),
  providerUsageReceiptsBytes,
  tokenizerImplementationBytes: argument("--tokenizer-implementation")
    ? read("--tokenizer-implementation")
    : undefined
});

const recomputedReport = await scoreProviderOutputs({
  outputRows: providerOutputRows,
  joinMap,
  providerInputBytes,
  providerOutputBytes,
  measurementEvidence: report.performance.measurementEvidence,
  runIdentity: report.runIdentity,
  measurementAuthorityBytes,
  tokenizerImplementationBytes: argument("--tokenizer-implementation")
    ? read("--tokenizer-implementation")
    : undefined,
  authorityRegistryBytes,
  approvedAuthorityRegistrySha256: argument("--approved-authority-registry-sha256"),
  providerUsageReceiptsBytes
});
const independentlyRescored = stableStringify(recomputedReport) === stableStringify(report);

console.log(JSON.stringify({
  artifactIntegrityValid: result.valid,
  exactRequestConfigurationBound: true,
  exactRequestHashesRecomputed: true,
  independentlyRescored,
  allRequiredSemanticGatesPass: report.gates?.allRequiredGatesPass === true,
  checks: result.checks
}, null, 2));

if (!result.valid || !independentlyRescored || report.gates?.allRequiredGatesPass !== true) {
  throw new Error("Run artifacts or required semantic gates did not verify.");
}
