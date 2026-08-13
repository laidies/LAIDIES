#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PACKAGE = "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v1.json";
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = value => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const fail = message => { throw new Error(`NEWSSTAND_REVIEW_PREVIEW_REJECT: ${message}`); };

function parseStoryData(raw) {
  const context = { window: {} };
  vm.runInNewContext(raw, context, { timeout: 1000 });
  const value = JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
  if (value?.schemaVersion !== "1.0.0" || !Array.isArray(value.stories)) fail("curated story data is invalid");
  return value;
}

function packagePath(args) {
  if (!args.includes("--fixture")) return path.join(ROOT, DEFAULT_PACKAGE);
  const supplied = process.env.NEWSSTAND_REVIEW_PACKAGE_PATH;
  if (!supplied) fail("fixture mode requires NEWSSTAND_REVIEW_PACKAGE_PATH");
  return path.resolve(supplied);
}

export function overlayReviewPackage({ output, pkg, packageSha256 }) {
  const htmlPath = path.join(output, "newsstand.html");
  const storyPath = path.join(output, "content/newsstand-stories.js");
  const issuesPath = path.join(output, "content/newsstand-daily-issues.json");
  const columnsPath = path.join(output, "content/daily-edition-columns.json");
  for (const required of [htmlPath, storyPath, issuesPath, columnsPath]) if (!fs.existsSync(required)) fail(`curated artifact lacks ${path.relative(output, required)}`);

  const reviewedAt = "2026-08-13T04:52:30Z";
  const story = structuredClone(pkg.story.record);
  story.status = "published";
  story.publishedAt = `${pkg.editionDate}T23:30:00Z`;
  story.updatedAt = reviewedAt;
  story.lastCheckedAt = reviewedAt;
  story.sourceApproval = { status: "approved", record: `/operations/product-stewards/newsstand/evidence/stories/${story.id}.json` };

  const data = parseStoryData(fs.readFileSync(storyPath, "utf8"));
  if (data.stories.some(item => item.id === story.id || item.slug === story.slug)) fail("review story identity already exists in canonical data");
  data.generatedAt = reviewedAt;
  data.lastCheckedAt = reviewedAt;
  data.stories.push(story);
  const storyRaw = `window.NEWSSTAND_DATA = ${JSON.stringify(data, null, 2)};\nwindow.NEWSSTAND_STORIES = window.NEWSSTAND_DATA.stories;\n`;
  fs.writeFileSync(storyPath, storyRaw);

  const sourceIdentity = {
    radarPath: `operations/product-stewards/newsstand/editorial-intake/${pkg.editionDate}.md`,
    radarSha256: sha256(fs.readFileSync(path.join(ROOT, `operations/product-stewards/newsstand/editorial-intake/${pkg.editionDate}.md`))),
    storiesPath: "content/newsstand-stories.js",
    storiesSha256: sha256(storyRaw),
    columnsPath: "content/daily-edition-columns.json",
    columnsSha256: sha256(fs.readFileSync(columnsPath))
  };
  const desks = pkg.desks.map(desk => desk.state === "ready" ? {
    type: desk.type, state: "ready", recordId: desk.recordId, headline: desk.headline,
    summary: desk.summary, destination: desk.destination
  } : { type: desk.type, state: "empty", recordId: null, emptyState: desk.emptyState });
  const envelope = {
    schemaVersion: "daily-private-issue-v1", mode: "PRIVATE_DRAFT_ONLY", editionDate: pkg.editionDate,
    editorialTimeZone: pkg.editorialTimeZone, disposition: "CANDIDATES_PENDING_REVIEW", status: "PRIVATE_REVIEW_DRAFT",
    storyIds: [story.id], storySnapshots: [story], desks, sourceIdentity, canonicalWrite: false, deployActionTaken: false
  };
  const issue = {
    editionDate: pkg.editionDate, editorialTimeZone: pkg.editorialTimeZone, status: "complete",
    disposition: "candidates_pending_review", storyIds: [story.id], stories: [story],
    serviceRecordIds: desks.filter(desk => desk.state === "ready").map(desk => desk.recordId), desks,
    sourceIdentity, envelopeSha256: sha256(`${canonicalJson(envelope)}\n`),
    admission: {
      decision: "ACCEPT_LOCAL_CANONICAL_WRITE", reviewedAt,
      reviewedBy: "independent-private-review-preview", reviewerRole: "Independent private-review presentation judge"
    }
  };
  const dailyIssues = JSON.parse(fs.readFileSync(issuesPath, "utf8"));
  dailyIssues.issues = (dailyIssues.issues || []).filter(item => item.editionDate !== pkg.editionDate);
  dailyIssues.issues.push(issue);
  fs.writeFileSync(issuesPath, `${JSON.stringify(dailyIssues)}\n`);

  let html = fs.readFileSync(htmlPath, "utf8");
  html = html.replace("</head>", `<meta name="robots" content="noindex,nofollow,noarchive">\n<style id="ns-private-review-style">#ns-private-review-banner{position:sticky;top:0;z-index:9999;padding:10px 16px;background:#ffe600;color:#171047;border-bottom:3px solid #171047;font:900 14px/1.25 Arial,sans-serif;text-align:center;letter-spacing:.03em}#ns-private-review-banner code{font:inherit}</style>\n</head>`);
  html = html.replace(/<body([^>]*)>/, `<body$1>\n<div id="ns-private-review-banner" role="status">PRIVATE REVIEW — NOT PUBLISHED · exact package <code>${packageSha256.slice(0, 12)}</code></div>`);
  if (!html.includes("PRIVATE REVIEW — NOT PUBLISHED")) fail("review truth banner was not inserted");
  fs.writeFileSync(htmlPath, html);

  const receipt = {
    schema: "laidies.newsstand-private-preview-artifact.v1",
    status: "BUILT_NOT_DEPLOYED",
    sourceCommit: process.env.NEWSSTAND_REVIEW_SOURCE_COMMIT || null,
    package: { path: DEFAULT_PACKAGE, sha256: packageSha256 },
    editionDate: pkg.editionDate,
    storyId: story.id,
    publicAuthority: false,
    canonicalWrite: false,
    deployAuthority: false,
    changedArtifactPaths: ["newsstand.html", "content/newsstand-stories.js", "content/newsstand-daily-issues.json"]
  };
  fs.writeFileSync(path.join(output, "newsstand-private-preview-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
  return receipt;
}

function main() {
  const args = process.argv.slice(2);
  const outputArg = args.find(arg => !arg.startsWith("--"));
  if (!outputArg) fail("usage: node scripts/build-newsstand-review-preview.mjs <output-directory> [--fixture]");
  const output = path.resolve(outputArg);
  if (output === ROOT || output.startsWith(`${ROOT}${path.sep}`)) fail("preview output must be outside the repository");
  if (fs.existsSync(output) && fs.readdirSync(output).length) fail("preview output directory must be empty");
  const sourcePackagePath = packagePath(args);
  const packageRaw = fs.readFileSync(sourcePackagePath, "utf8");
  const pkg = JSON.parse(packageRaw);
  const inspection = inspectCompleteDailyReview(pkg, { root: ROOT });
  if (inspection.errors.length) fail(`package is not ready for Ali review: ${inspection.errors.join(" | ")}`);
  fs.mkdirSync(output, { recursive: true });
  const build = spawnSync(process.execPath, [path.join(ROOT, "scripts/build-public-site.mjs"), output], { cwd: ROOT, encoding: "utf8" });
  if (build.status !== 0) fail(`curated public build failed: ${build.stderr || build.stdout}`);
  const receipt = overlayReviewPackage({ output, pkg, packageSha256: sha256(packageRaw) });
  console.log(`NEWSSTAND PRIVATE REVIEW PREVIEW BUILT story=${receipt.storyId} package=${receipt.package.sha256} public_authority=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
