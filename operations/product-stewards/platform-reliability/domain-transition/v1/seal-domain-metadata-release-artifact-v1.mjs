#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { metadataTags, sha256 } from "./domain-metadata-v1.mjs";

const root = process.cwd();
const outputRecordPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1-output.json";
const artifactPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-release-artifact-v1.json";
const sourceOutput = JSON.parse(fs.readFileSync(path.join(root, outputRecordPath), "utf8"));
const buildOutput = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-domain-release-v1-"));

try {
  const build = spawnSync(
    process.execPath,
    ["scripts/build-public-site.mjs", buildOutput],
    { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  assert.equal(build.status, 0, `curated build failed\n${build.stdout}\n${build.stderr}`);
  const report = JSON.parse(fs.readFileSync(path.join(buildOutput, "build-report.json"), "utf8"));
  assert.equal(report.missing.length, 0);
  assert.equal(report.oversized.length, 0);

  const routes = sourceOutput.routes.map((row) => {
    const bytes = fs.readFileSync(path.join(buildOutput, row.file));
    const source = bytes.toString("utf8");
    const tags = metadataTags(source);
    assert.equal(tags.canonical[0], `<link rel="canonical" href="${row.url}" />`);
    assert.equal(tags.ogUrl[0], `<meta property="og:url" content="${row.url}" />`);
    return {
      url: row.url,
      artifactPath: row.file,
      artifactSha256: sha256(bytes),
      canonicalExact: true,
      ogUrlExact: true,
    };
  });

  const artifact = {
    schemaVersion: 1,
    artifactId: "LAIDIES-DOMAIN-METADATA-RELEASE-ARTIFACT-2026-07-26-v1",
    status: "BUILT_LOCALLY_NOT_DEPLOYED",
    builder: {
      path: "scripts/build-public-site.mjs",
      sha256: sha256(fs.readFileSync(path.join(root, "scripts/build-public-site.mjs"))),
    },
    sourceOutput: {
      path: outputRecordPath,
      sha256: sha256(fs.readFileSync(path.join(root, outputRecordPath))),
      corpusSha256: sourceOutput.seal.corpusSha256,
    },
    buildSummary: {
      files: report.files,
      bytes: report.bytes,
      mebibytes: report.mebibytes,
      missing: 0,
      oversized: 0,
    },
    routes,
    seal: {
      algorithm: "SHA-256",
      canonicalization: "ordered-sitemap-artifacts-v1",
      artifactCorpusSha256: sha256(JSON.stringify(routes)),
    },
    authorityCeiling: {
      deploy: false,
      publicMutation: false,
      providerOrCacheMutation: false,
    },
  };
  fs.writeFileSync(path.join(root, artifactPath), `${JSON.stringify(artifact, null, 2)}\n`);
  console.log(
    `DOMAIN METADATA RELEASE ARTIFACT SEALED routes=${routes.length}` +
    ` corpus_sha256=${artifact.seal.artifactCorpusSha256}` +
    ` files=${report.files} bytes=${report.bytes}`
  );
} finally {
  fs.rmSync(buildOutput, { recursive: true });
}
