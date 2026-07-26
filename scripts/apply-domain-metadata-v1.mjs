#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  DOMAIN_METADATA_ID,
  metadataTags,
  sha256,
  transformDomainMetadata,
} from "../operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-v1.mjs";

const root = process.cwd();
const sitemapPath = "sitemap.xml";
const manifestPath =
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-predecessor-v1.json";
const sitemap = fs.readFileSync(path.join(root, sitemapPath), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

function localFileFor(publicUrl) {
  const pathname = new URL(publicUrl).pathname;
  if (pathname === "/") return "index.html";
  const stem = pathname.replace(/^\/|\/$/g, "");
  return [`${stem}.html`, `${stem}/index.html`, stem]
    .find((candidate) => {
      const absolute = path.join(root, candidate);
      return fs.existsSync(absolute) && fs.statSync(absolute).isFile();
    }) || null;
}

assert.equal(urls.length, 28, "domain metadata v1 requires the exact 28-URL sitemap");
assert.equal(new Set(urls).size, urls.length, "sitemap URLs must be unique");
assert.ok(urls.every((url) => url.startsWith("https://laidies.ai/")));

const rows = urls.map((url) => {
  const file = localFileFor(url);
  assert(file, `sitemap URL has no source file: ${url}`);
  const source = fs.readFileSync(path.join(root, file), "utf8");
  const tags = metadataTags(source);
  assert.ok(tags.canonical.length <= 1 && tags.ogUrl.length <= 1);
  return {
    url,
    file,
    predecessorSha256: sha256(source),
    canonicalTag: tags.canonical[0] || null,
    ogUrlTag: tags.ogUrl[0] || null,
  };
});

if (!fs.existsSync(path.join(root, manifestPath))) {
  const manifest = {
    schemaVersion: 1,
    manifestId: `${DOMAIN_METADATA_ID}-PREDECESSOR`,
    sitemapPath,
    sitemapSha256: sha256(sitemap),
    routes: rows,
  };
  fs.mkdirSync(path.dirname(path.join(root, manifestPath)), { recursive: true });
  fs.writeFileSync(
    path.join(root, manifestPath),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
}

let changed = 0;
for (const row of rows) {
  const absolute = path.join(root, row.file);
  const source = fs.readFileSync(absolute, "utf8");
  const output = transformDomainMetadata(row.file, source, row.url);
  if (output !== source) {
    fs.writeFileSync(absolute, output);
    changed += 1;
  }
}

console.log(
  `DOMAIN METADATA APPLY PASS id=${DOMAIN_METADATA_ID}` +
  ` routes=${rows.length} changed=${changed} sitemap_changed=0`
);
