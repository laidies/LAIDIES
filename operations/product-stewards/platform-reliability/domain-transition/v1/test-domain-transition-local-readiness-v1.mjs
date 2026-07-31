#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const sitemap = read("sitemap.xml");
const robots = read("robots.txt");
const redirects = read("_redirects");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

function localFileFor(publicUrl) {
  const pathname = new URL(publicUrl).pathname;
  if (pathname === "/") return "index.html";
  const stem = pathname.replace(/^\/|\/$/g, "");
  return [`${stem}.html`, `${stem}/index.html`, stem]
    .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

function metaValue(html, kind, name) {
  const attribute = kind === "property" ? "property" : "name";
  const first = new RegExp(`<meta\\s+${attribute}=["']${name}["'][^>]*content=["']([^"']+)`, "i");
  const reverse = new RegExp(`<meta\\s+[^>]*content=["']([^"']+)["'][^>]*${attribute}=["']${name}["']`, "i");
  return (html.match(first) || html.match(reverse) || [])[1] || null;
}

function canonicalValue(html) {
  return (
    html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)/i) ||
    html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i) ||
    []
  )[1] || null;
}

const rows = urls.map((url) => {
  const file = localFileFor(url);
  assert(file, `sitemap URL has no local file: ${url}`);
  const html = read(file);
  return {
    url,
    file,
    canonical: canonicalValue(html),
    ogUrl: metaValue(html, "property", "og:url")
  };
});

const metadata = {
  sitemapUrls: rows.length,
  missingFiles: rows.filter((row) => !row.file).length,
  canonicalMissing: rows.filter((row) => !row.canonical).length,
  canonicalMismatch: rows.filter((row) => row.canonical && row.canonical !== row.url).length,
  ogUrlMissing: rows.filter((row) => !row.ogUrl).length,
  ogUrlMismatch: rows.filter((row) => row.ogUrl && row.ogUrl !== row.url).length
};

assert(urls.every((url) => url.startsWith("https://laidies.ai/")), "sitemap contains a non-canonical origin");
assert.match(robots, /Sitemap:\s*https:\/\/laidies\.ai\/sitemap\.xml/i, "robots sitemap origin mismatch");
assert.equal(/wearelaidies\.com/i.test(sitemap), false, "sitemap contains legacy origin");
assert.equal(/wearelaidies\.com/i.test(robots), false, "robots contains legacy origin");
assert.equal(/wearelaidies\.com/i.test(redirects), false, "repository _redirects unexpectedly claims the host transition");

const activeCorsFiles = [
  "worker/subscribe.js",
  "worker-fairy-godmother/src/index.js"
];
const corsLegacyOrigins = activeCorsFiles.map((file) => {
  const body = read(file);
  return {
    file,
    apex: body.includes('"https://wearelaidies.com"'),
    www: body.includes('"https://www.wearelaidies.com"')
  };
});
assert(corsLegacyOrigins.every((row) => row.apex && row.www), "legacy CORS transition state changed without reconciliation");

const result = {
  status: metadata.canonicalMissing || metadata.canonicalMismatch || metadata.ogUrlMissing || metadata.ogUrlMismatch
    ? "HOLD"
    : "PASS",
  scope: "repository-local domain transition readiness; public/provider behavior requires a separate receipt",
  canonicalOrigin: "https://laidies.ai",
  hostRedirectConfiguration: "NOT_PRESENT_IN_REPOSITORY_PROVIDER_RULE_UNVERIFIED",
  metadata,
  activeLegacyCorsOrigins: corsLegacyOrigins,
  analyticsAttribution: "UNKNOWN_BEYOND_OBSERVED_QUERY_PRESERVATION",
  mutation: false
};

console.log(JSON.stringify(result, null, 2));
console.log(
  `DOMAIN TRANSITION LOCAL READINESS ${result.status} sitemap=${metadata.sitemapUrls} ` +
  `canonical_missing=${metadata.canonicalMissing} canonical_mismatch=${metadata.canonicalMismatch} ` +
  `og_missing=${metadata.ogUrlMissing} og_mismatch=${metadata.ogUrlMismatch} mutation=false`
);

if (process.argv.includes("--gate") && result.status !== "PASS") process.exitCode = 1;

