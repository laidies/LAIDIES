#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  CANONICAL_ORIGIN,
  DOMAIN_METADATA_ID,
  OWNER_RECEIPT_SHA256,
  metadataTags,
  reverseDomainMetadata,
  sha256,
  transformDomainMetadata,
} from "./domain-metadata-v1.mjs";

const root = process.cwd();
const manifestPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-predecessor-v1.json";
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), "utf8"));
const ownerReceipt =
  "operations/product-stewards/platform-reliability/domain-transition-owner-receipt-v1-2026-07-26.md";
const sitemap = fs.readFileSync(path.join(root, manifest.sitemapPath), "utf8");

assert.equal(sha256(fs.readFileSync(path.join(root, ownerReceipt))), OWNER_RECEIPT_SHA256);
assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.manifestId, `${DOMAIN_METADATA_ID}-PREDECESSOR`);
assert.equal(manifest.routes.length, 28);
assert.equal(new Set(manifest.routes.map((row) => row.file)).size, 28);
assert.equal(sha256(sitemap), manifest.sitemapSha256, "sitemap bytes changed");

const corpus = [];
for (const row of manifest.routes) {
  assert.ok(row.url.startsWith(`${CANONICAL_ORIGIN}/`));
  const current = fs.readFileSync(path.join(root, row.file), "utf8");
  const tags = metadataTags(current);
  assert.equal(tags.canonical.length, 1, `one canonical required: ${row.file}`);
  assert.equal(tags.ogUrl.length, 1, `one og:url required: ${row.file}`);
  assert.equal(tags.canonical[0], `<link rel="canonical" href="${row.url}" />`);
  assert.equal(tags.ogUrl[0], `<meta property="og:url" content="${row.url}" />`);
  assert.equal(
    transformDomainMetadata(row.file, current, row.url),
    current,
    `idempotency: ${row.file}`
  );

  const predecessor = reverseDomainMetadata(current, row.url, row);
  assert.equal(
    sha256(predecessor),
    row.predecessorSha256,
    `inverse rollback must recover exact predecessor: ${row.file}`
  );
  assert.equal(
    transformDomainMetadata(row.file, predecessor, row.url),
    current,
    `only metadata tags may differ: ${row.file}`
  );
  corpus.push({
    url: row.url,
    file: row.file,
    predecessorSha256: row.predecessorSha256,
    successorSha256: sha256(current),
  });
}

assert.throws(
  () => transformDomainMetadata(
    "duplicate.html",
    `<html><head><link rel="canonical" href="${CANONICAL_ORIGIN}/a" />` +
      `<link rel="canonical" href="${CANONICAL_ORIGIN}/b" /></head></html>`,
    `${CANONICAL_ORIGIN}/duplicate`
  ),
  /duplicate tags rejected/
);
assert.throws(
  () => transformDomainMetadata(
    "malformed.html",
    "<html><head><title>Missing close</title><body></body></html>",
    `${CANONICAL_ORIGIN}/malformed`
  ),
  /requires <\/head>/
);

const buildOutput = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-domain-metadata-v1-"));
try {
  const build = spawnSync(
    process.execPath,
    ["scripts/build-public-site.mjs", buildOutput],
    { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
  assert.equal(build.status, 0, `curated build failed\n${build.stdout}\n${build.stderr}`);
  for (const row of manifest.routes) {
    const artifact = fs.readFileSync(path.join(buildOutput, row.file), "utf8");
    const tags = metadataTags(artifact);
    assert.equal(tags.canonical.length, 1, `artifact canonical: ${row.file}`);
    assert.equal(tags.ogUrl.length, 1, `artifact og:url: ${row.file}`);
    assert.match(tags.canonical[0], new RegExp(row.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(tags.ogUrl[0], new RegExp(row.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
} finally {
  fs.rmSync(buildOutput, { recursive: true });
}

const corpusSha256 = sha256(JSON.stringify(corpus));
console.log(
  `DOMAIN METADATA SUCCESSOR PASS id=${DOMAIN_METADATA_ID}` +
  ` routes=28 canonical=28 og=28 sitemap_unchanged=1` +
  ` artifact=28 rollback=28 invalid=2 corpus_sha256=${corpusSha256}`
);
