#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {evaluateHostedReadiness, validateContract} from "./check-newsstand-hosted-readiness.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contract = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/hosted-publishing-20260926/runtime-contract.json"), "utf8"));
const clone = value => JSON.parse(JSON.stringify(value));
const assess = (value = contract, env = {}) => evaluateHostedReadiness({contract: value, repoRoot: ROOT, env});
const actualGit = (root, args) => {
  const result = spawnSync("git", args, {cwd: root, encoding: "utf8"});
  return result.status === 0 ? result.stdout : null;
};

assert.deepEqual(validateContract(contract), [], "the committed contract must be structurally valid");
const missingAuth = assess();
assert.equal(missingAuth.status, "BLOCKED");
assert.ok(missingAuth.issues.some(issue => issue.code === "MISSING_AUTH" && issue.stage === "independent-reviewer" && issue.detail === "CLAUDE_CODE_OAUTH_TOKEN"));
assert.ok(missingAuth.issues.some(issue => issue.code === "MISSING_PORTABLE_ENTRYPOINT" && issue.stage === "provider-preserving-publisher"));
assert.ok(missingAuth.issues.some(issue => issue.code === "UNQUALIFIED_STAGE" && issue.stage === "provider-preserving-publisher"));
assert.ok(missingAuth.issues.some(issue => issue.code === "MISSING_PORTABLE_ENTRYPOINT" && issue.stage === "research"));
assert.ok(missingAuth.issues.some(issue => issue.code === "UNQUALIFIED_REVIEWER" && issue.stage === "independent-reviewer"));
assert.doesNotMatch(JSON.stringify(missingAuth), /token-value|secret-value/i, "output must never contain an auth value");

const authPresent = assess(contract, {CLAUDE_CODE_OAUTH_TOKEN: "token-value", CLOUDFLARE_API_TOKEN: "secret-value", CLOUDFLARE_ACCOUNT_ID: "account-value"});
assert.equal(authPresent.status, "BLOCKED", "auth presence cannot fake portable entrypoints or qualification");
assert.ok(!authPresent.issues.some(issue => issue.code === "MISSING_AUTH" && issue.stage === "independent-reviewer"));
assert.ok(authPresent.issues.some(issue => issue.code === "MISSING_PORTABLE_ENTRYPOINT" && issue.stage === "research"));
assert.ok(authPresent.issues.some(issue => issue.code === "UNQUALIFIED_REVIEWER"));

const stale = evaluateHostedReadiness({contract, repoRoot: ROOT, readGit: (root, args) => args[0] === "rev-parse" && args[1] === "--verify" ? null : actualGit(root, args)});
assert.equal(stale.status, "STALE_SOURCE");
assert.ok(stale.issues.some(issue => issue.code === "MISSING_PINNED_SOURCE_COMMIT"));

const changedController = clone(contract);
changedController.sourcePins[0].sha256 = "f".repeat(64);
const changedControllerResult = assess(changedController);
assert.equal(changedControllerResult.status, "STALE_SOURCE");
assert.ok(changedControllerResult.issues.some(issue => issue.code === "SOURCE_PIN_MISMATCH" && issue.detail === ".github/workflows/newsstand-cloud-intake.yml"));

const alteredRoot = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-hosted-current-controller-"));
for (const pin of contract.sourcePins) {
  const target = path.join(alteredRoot, pin.path); fs.mkdirSync(path.dirname(target), {recursive: true});
  fs.writeFileSync(target, actualGit(ROOT, ["show", `HEAD:${pin.path}`]));
}
for (const args of [["init", "-q"], ["config", "user.email", "test@example.invalid"], ["config", "user.name", "test"], ["add", "."], ["-c", "commit.gpgsign=false", "commit", "-qm", "pinned controllers"]]) assert.equal(spawnSync("git", args, {cwd: alteredRoot, encoding: "utf8"}).status, 0);
const alteredContract = clone(contract);
alteredContract.pinnedSourceCommit = actualGit(alteredRoot, ["rev-parse", "HEAD"]).trim();
fs.appendFileSync(path.join(alteredRoot, ".github/workflows/newsstand-cloud-intake.yml"), "\n# altered-current-controller\n");
const alteredResult = evaluateHostedReadiness({contract: alteredContract, repoRoot: alteredRoot, readGit: actualGit});
assert.equal(alteredResult.status, "STALE_SOURCE");
assert.ok(alteredResult.issues.some(issue => issue.code === "DIRTY_PINNED_SOURCE" && issue.detail === ".github/workflows/newsstand-cloud-intake.yml"));
fs.rmSync(alteredRoot, {recursive: true, force: true});

const localPath = clone(contract);
localPath.stages.find(stage => stage.id === "research").entrypoint = {kind: "local-path", path: "/Users/alisoneakin/private-research", command: "node research.mjs"};
assert.ok(validateContract(localPath).some(error => /github-workflow/.test(error)), "a local-only path must be rejected as a portable entrypoint");

const partial = clone(contract);
partial.stages.find(stage => stage.id === "source-intake").entrypoint = null;
const partialResult = assess(partial, {CLAUDE_CODE_OAUTH_TOKEN: "present", CLOUDFLARE_API_TOKEN: "present", CLOUDFLARE_ACCOUNT_ID: "present"});
assert.equal(partialResult.status, "BLOCKED");
assert.ok(partialResult.issues.some(issue => issue.code === "MISSING_PORTABLE_ENTRYPOINT" && issue.stage === "source-intake"));

console.log("NEWSSTAND HOSTED READINESS TEST PASS missing_auth=1 local_path=1 stale_source=1 controller_pin=1 altered_current_controller=1 partial_state=1 unqualified_reviewer=1");
