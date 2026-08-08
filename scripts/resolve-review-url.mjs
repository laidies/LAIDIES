#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { checkContentReleaseReadiness } from "./check-content-release-readiness.mjs";

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function parseArgs(argv) {
  const args = [...argv];
  const valueAfter = flag => {
    const index = args.indexOf(flag);
    return index === -1 ? null : args[index + 1] || null;
  };
  const consumed = new Set(["--warn-only"]);
  for (const flag of ["--type", "--work-order"]) {
    const index = args.indexOf(flag);
    if (index !== -1) {
      consumed.add(flag);
      if (args[index + 1]) consumed.add(args[index + 1]);
    }
  }
  return {
    type: valueAfter("--type"),
    workOrderId: valueAfter("--work-order"),
    warnOnly: args.includes("--warn-only"),
    candidate: args.find(value => !consumed.has(value)) || null
  };
}

function exactTupleExists(value, expectedPath, expectedSha256) {
  if (!value || typeof value !== "object") return false;
  if (
    !Array.isArray(value) &&
    value.path === expectedPath &&
    value.sha256 === expectedSha256
  ) return true;
  return Object.values(value).some(item => exactTupleExists(item, expectedPath, expectedSha256));
}

export function inspectManifestCandidateBinding({ root, manifestPath, candidatePath }) {
  const absoluteManifest = path.resolve(root, manifestPath);
  const absoluteCandidate = path.resolve(root, candidatePath);
  const relativeCandidate = path.relative(root, absoluteCandidate);
  const errors = [];
  if (!fs.existsSync(absoluteManifest)) return { errors: ["artifact manifest is missing"] };
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(absoluteManifest, "utf8"));
  } catch {
    return { errors: ["artifact manifest is not valid JSON"] };
  }
  const digest = sha256(absoluteCandidate);
  if (!exactTupleExists(manifest, relativeCandidate, digest)) {
    errors.push("artifact manifest does not bind the exact candidate path and current SHA-256");
  }
  return { errors, relativeCandidate, digest };
}

export function resolveContentPresentation({ root, candidatePath, workOrderId }) {
  const readiness = checkContentReleaseReadiness({ root });
  const errors = [...readiness.errors];
  const held = readiness.held.find(item => item.id === workOrderId);
  if (!readiness.ready.includes(workOrderId)) {
    errors.push(`work order is not release-ready: ${workOrderId}`);
    if (held) errors.push(`hold=${held.id}|${held.reasons.join(";")}`);
    return { errors };
  }

  const queuePath = path.join(root, "operations/product-stewards/learning-content-ecosystem/content-work-orders.json");
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const order = (queue.workOrders || []).find(item => item.id === workOrderId);
  if (!order) return { errors: [`work order does not exist: ${workOrderId}`] };

  const binding = inspectManifestCandidateBinding({
    root,
    manifestPath: order.artifactBinding.manifestPath,
    candidatePath
  });
  errors.push(...binding.errors);
  return {
    errors,
    admittedId: workOrderId,
    candidatePath: errors.length ? null : binding.relativeCandidate,
    candidateSha256: errors.length ? null : binding.digest
  };
}

function main() {
  const root = fs.realpathSync(process.cwd());
  const options = parseArgs(process.argv.slice(2));
  const block = reasons => {
    const prefix = options.warnOnly ? "REVIEW DOOR WOULD BLOCK" : "REVIEW DOOR BLOCKED";
    console.error(prefix);
    for (const reason of reasons) console.error(`- ${reason}`);
    process.exit(options.warnOnly ? 0 : 1);
  };

  const contentTypes = new Set(["content", "prose", "book"]);
  const designTypes = new Set(["design", "page", "visual", "media"]);
  if (!options.type || (!contentTypes.has(options.type) && !designTypes.has(options.type))) {
    block(["--type must be prose, book, page, visual, media, content or design"]);
  }
  if (!options.candidate) block(["provide the exact candidate path"]);

  const candidatePath = path.resolve(root, options.candidate);
  let realCandidate;
  try {
    realCandidate = fs.realpathSync(candidatePath);
  } catch {
    block(["candidate is missing"]);
  }
  if (
    !realCandidate.startsWith(`${root}${path.sep}`) ||
    !fs.statSync(realCandidate).isFile()
  ) block(["candidate must be a file inside the repository"]);
  const relativeCandidate = path.relative(root, realCandidate);

  if (designTypes.has(options.type)) {
    const resolver = path.join(root, "scripts/resolve-design-review-url.mjs");
    const result = spawnSync(process.execPath, [resolver, relativeCandidate], {
      cwd: root,
      encoding: "utf8",
      env: process.env
    });
    if (result.status !== 0) block([result.stderr.trim() || "design admission failed"]);
    process.stdout.write(result.stdout);
    return;
  }

  if (!options.workOrderId) block([`${options.type} requires --work-order <exact-id>`]);
  const result = resolveContentPresentation({
    root,
    candidatePath: relativeCandidate,
    workOrderId: options.workOrderId
  });
  if (result.errors.length) block(result.errors);
  console.log(`CONTENT PRESENTATION ADMITTED ${result.admittedId}`);
  console.log(JSON.stringify({ candidatePath: result.candidatePath, candidateSha256: result.candidateSha256 }));
  console.log(`Open only through: node scripts/serve-review-door.mjs --type content --work-order ${result.admittedId} ${result.candidatePath}`);
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) main();
