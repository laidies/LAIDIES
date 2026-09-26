#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STAGES = ["source-intake", "research", "writer", "independent-reviewer", "signer", "provider-preserving-publisher", "live-verification"];
const SHA256 = /^[a-f0-9]{64}$/;
const COMMIT = /^[a-f0-9]{40}$/;

const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const git = (root, args) => spawnSync("git", args, {cwd: root, encoding: "utf8"});

export function validateContract(contract) {
  const errors = [];
  if (contract?.schemaVersion !== "newsstand-hosted-readiness.v1") errors.push("schemaVersion must be newsstand-hosted-readiness.v1");
  if (!COMMIT.test(contract?.pinnedSourceCommit || "")) errors.push("pinnedSourceCommit must be an exact 40-character commit");
  if (!Array.isArray(contract?.sourcePins) || contract.sourcePins.length < 1) errors.push("sourcePins must not be empty");
  const sourcePaths = new Set();
  for (const [index, pin] of (contract?.sourcePins || []).entries()) {
    if (typeof pin?.path !== "string" || !pin.path || path.isAbsolute(pin.path) || pin.path.includes("..")) errors.push(`sourcePins[${index}].path must be a repository-relative path`);
    if (!SHA256.test(pin?.sha256 || "")) errors.push(`sourcePins[${index}].sha256 must be SHA-256`);
    if (sourcePaths.has(pin?.path)) errors.push(`sourcePins[${index}].path is duplicated`);
    sourcePaths.add(pin?.path);
  }
  if (!Array.isArray(contract?.stages) || contract.stages.length !== STAGES.length) errors.push("stages must contain every required stage exactly once");
  const ids = new Set();
  for (const [index, stage] of (contract?.stages || []).entries()) {
    if (!STAGES.includes(stage?.id)) errors.push(`stages[${index}].id is unknown`);
    if (ids.has(stage?.id)) errors.push(`stages[${index}].id is duplicated`);
    ids.add(stage?.id);
    if (!Array.isArray(stage?.requiredAuth) || stage.requiredAuth.some(name => !/^[A-Z][A-Z0-9_]*$/.test(name))) errors.push(`stages[${index}].requiredAuth must contain environment-variable names only`);
    if (!["not-applicable", "qualified", "unqualified"].includes(stage?.qualification)) errors.push(`stages[${index}].qualification is invalid`);
    if (stage?.entrypoint !== null) {
      if (stage?.entrypoint?.kind !== "github-workflow") errors.push(`stages[${index}].entrypoint must be null or a github-workflow`);
      if (typeof stage?.entrypoint?.path !== "string" || !sourcePaths.has(stage.entrypoint.path)) errors.push(`stages[${index}].entrypoint.path must be a pinned source path`);
      if (typeof stage?.entrypoint?.command !== "string" || !stage.entrypoint.command.trim()) errors.push(`stages[${index}].entrypoint.command is required`);
    }
  }
  for (const id of STAGES) if (!ids.has(id)) errors.push(`missing required stage ${id}`);
  return errors;
}

function gitText(root, args) {
  const result = git(root, args);
  return result.status === 0 ? result.stdout : null;
}

export function evaluateHostedReadiness({contract, repoRoot = ROOT, env = process.env, readGit = gitText}) {
  const issues = [];
  for (const error of validateContract(contract)) issues.push({code: "INVALID_CONTRACT", detail: error});
  if (issues.length) return {status: "INVALID_CONTRACT", ready: false, issues, stages: []};

  const head = readGit(repoRoot, ["rev-parse", "HEAD"])?.trim() || null;
  if (readGit(repoRoot, ["rev-parse", "--verify", `${contract.pinnedSourceCommit}^{commit}`]) === null) {
    issues.push({code: "MISSING_PINNED_SOURCE_COMMIT", stage: "source", detail: contract.pinnedSourceCommit});
  }
  for (const pin of contract.sourcePins) {
    const content = readGit(repoRoot, ["show", `HEAD:${pin.path}`]);
    if (content === null) issues.push({code: "MISSING_CURRENT_SOURCE", stage: "source", detail: pin.path});
    else if (sha256(content) !== pin.sha256) issues.push({code: "SOURCE_PIN_MISMATCH", stage: "source", detail: pin.path});
    if (readGit(repoRoot, ["diff", "--quiet", "HEAD", "--", pin.path]) === null) issues.push({code: "DIRTY_PINNED_SOURCE", stage: "source", detail: pin.path});
  }

  const stages = contract.stages.map(stage => {
    const blockers = [];
    if (stage.entrypoint === null) blockers.push({code: "MISSING_PORTABLE_ENTRYPOINT", detail: "no hosted command is approved in the contract"});
    for (const name of stage.requiredAuth) if (!env[name]) blockers.push({code: "MISSING_AUTH", detail: name});
    if (stage.qualification === "unqualified") blockers.push({code: stage.id === "independent-reviewer" ? "UNQUALIFIED_REVIEWER" : "UNQUALIFIED_STAGE", detail: "no hosted qualification/calibration is recorded"});
    return {id: stage.id, ready: blockers.length === 0, blockers};
  });
  for (const stage of stages) for (const blocker of stage.blockers) issues.push({...blocker, stage: stage.id});
  const sourceIssue = issues.some(issue => ["MISSING_PINNED_SOURCE_COMMIT", "MISSING_CURRENT_SOURCE", "SOURCE_PIN_MISMATCH", "DIRTY_PINNED_SOURCE"].includes(issue.code));
  return {status: sourceIssue ? "STALE_SOURCE" : issues.length ? "BLOCKED" : "READY_FOR_HOSTED_PILOT", ready: issues.length === 0, sourceCommit: head, stages, issues};
}

function parseArgs(argv) {
  const args = {contract: path.join(ROOT, "operations/product-stewards/newsstand/hosted-publishing-20260926/runtime-contract.json")};
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--contract") args.contract = path.resolve(argv[++index] || "");
    else throw new Error(`usage: node scripts/check-newsstand-hosted-readiness.mjs [--contract <path>]`);
  }
  return args;
}

function main() {
  const {contract: contractPath} = parseArgs(process.argv.slice(2));
  const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
  const result = evaluateHostedReadiness({contract});
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.ready) process.exit(result.status === "INVALID_CONTRACT" || result.status === "STALE_SOURCE" ? 1 : 2);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
