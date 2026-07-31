#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  DOMAIN_METADATA_ID,
  metadataTags,
  sha256,
} from "./domain-metadata-v1.mjs";

const root = process.cwd();
const manifestPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-predecessor-v1.json";
const outputPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-successor-v1-output.json";
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestPath), "utf8"));

const routes = manifest.routes.map((row) => {
  const source = fs.readFileSync(path.join(root, row.file), "utf8");
  const tags = metadataTags(source);
  assert.equal(tags.canonical.length, 1);
  assert.equal(tags.ogUrl.length, 1);
  assert.equal(tags.canonical[0], `<link rel="canonical" href="${row.url}" />`);
  assert.equal(tags.ogUrl[0], `<meta property="og:url" content="${row.url}" />`);
  return {
    url: row.url,
    file: row.file,
    predecessorSha256: row.predecessorSha256,
    successorSha256: sha256(source),
  };
});

const output = {
  schemaVersion: 1,
  outputId: `${DOMAIN_METADATA_ID}-OUTPUT`,
  status: "BUILT_AND_VERIFIED_LOCALLY",
  sitemap: {
    path: manifest.sitemapPath,
    sha256: manifest.sitemapSha256,
    changed: false,
  },
  counts: {
    routes: routes.length,
    changedRoutes: routes.filter(
      (row) => row.predecessorSha256 !== row.successorSha256
    ).length,
    canonicalExact: routes.length,
    ogUrlExact: routes.length,
  },
  routes,
  seal: {
    algorithm: "SHA-256",
    canonicalization: "ordered-sitemap-routes-v1",
    corpusSha256: sha256(JSON.stringify(routes)),
  },
};

fs.writeFileSync(
  path.join(root, outputPath),
  `${JSON.stringify(output, null, 2)}\n`
);
console.log(
  `DOMAIN METADATA OUTPUT SEALED routes=${routes.length}` +
  ` corpus_sha256=${output.seal.corpusSha256}`
);
