import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { verifyRunArtifacts } from "./lib.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const required = [
  "--manifest", "--approved-public-key", "--approved-key-fingerprint",
  "--provider-input", "--outputs", "--join-map", "--report", "--system-prompt",
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
const result = verifyRunArtifacts({
  manifest,
  approvedPublicKeyPem: read("--approved-public-key").toString("utf8"),
  approvedPublicKeyFingerprint: argument("--approved-key-fingerprint"),
  providerInputBytes: read("--provider-input"),
  providerOutputBytes: read("--outputs"),
  joinMap,
  report,
  systemPromptBytes: read("--system-prompt"),
  measurementAuthorityBytes: read("--measurement-authority"),
  authorityRegistryBytes: read("--authority-registry"),
  approvedAuthorityRegistrySha256: argument("--approved-authority-registry-sha256"),
  providerUsageReceiptsBytes: argument("--provider-usage-receipts")
    ? read("--provider-usage-receipts")
    : undefined,
  tokenizerImplementationBytes: argument("--tokenizer-implementation")
    ? read("--tokenizer-implementation")
    : undefined
});

console.log(JSON.stringify({
  artifactIntegrityValid: result.valid,
  allRequiredSemanticGatesPass: report.gates?.allRequiredGatesPass === true,
  checks: result.checks
}, null, 2));

if (!result.valid || report.gates?.allRequiredGatesPass !== true) {
  throw new Error("Run artifacts or required semantic gates did not verify.");
}
