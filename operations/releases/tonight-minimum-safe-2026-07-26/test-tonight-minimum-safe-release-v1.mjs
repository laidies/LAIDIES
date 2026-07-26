import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import {
  metadataTags,
  transformDomainMetadata,
} from "../../product-stewards/platform-reliability/domain-transition/v1/domain-metadata-v1.mjs";

const root = process.cwd();
const artifact = path.resolve(process.argv[2] || "/tmp/laidies-tonight-artifact.v1");
const BASELINE = "c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb";
const NAV_SHA = "4490123a7d7ea447a125244ef1453c92c3cfdea32dca7fc86b6b096e57f9dfd3";
const NAV_SRC = "/content/site/sv-back-nav.js?v=svbn-2026-07-26-v1-4490123a7d7e";
const HEADER_BASELINE_SHA = "f500707712e100e45d972daada9dc60a7801ced07f6f517ff8c41752d2761d93";
const SITEMAP_SHA = "accbb51c209f26c027d9bfd4ecb64886bdef515114e056c041acd7d0bfd56fa0";
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const read = (base, relative) => fs.readFileSync(path.join(base, relative));
const text = (base, relative) => read(base, relative).toString("utf8");
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const baselineText = (relative) =>
  execFileSync("git", ["show", `${BASELINE}:${relative}`], { cwd: root, encoding: "utf8" });

assert.equal(git("rev-parse", "HEAD"), BASELINE, "wrong detached baseline");
assert.equal(sha(read(root, "sitemap.xml")), SITEMAP_SHA, "sitemap bytes changed");
assert.equal(sha(read(root, "content/site/sv-back-nav.js")), NAV_SHA, "nav candidate drift");
assert.equal(
  sha(read(root, "operations/releases/tonight-minimum-safe-2026-07-26/INDEPENDENT-ACCEPTANCE.md")),
  "a0703d0fcb6180e204803159e8fc1837b1d8764597cd3ceafe31d3ada9738d36",
  "independent acceptance drift"
);
for (const [file, expected] of Object.entries({
  "upstream/context-navigation-distribution-v1.json": "a6d263d07ca15709362cb479cbc4f9e18a22f2bc9eddf6fef369bcae3c7465da",
  "upstream/domain-metadata-successor-v1.json": "ad654c1168c2174fad54391165e753c303757bbe36279318cf8f31fa88935a70",
  "upstream/visitors-centre-name-successor-v1.json": "7364bda6028a77302193c605f369a42f9850026d11bb727978d05802d298f694",
  "upstream/visitors-centre-name-successor-v1-closure.json": "262f9e0d6d59f7f3c2bd4d307276b5ce57f4c4be0ea65de6a9c8453982e9ec96",
  "upstream/shared-header-320-repair-candidate-v1.json": "299876c0962e45f282579e4c61d61bb4365a5ddbf91a7efaf3d3375e71d9c049",
  "upstream/shared-header-route-integration-closure-v1.json": "ebed3f79b35b0a3fa363546c25a86b261b029149f0b4b6d10fc1d106ba790ee9",
})) {
  assert.equal(
    sha(read(root, `operations/releases/tonight-minimum-safe-2026-07-26/${file}`)),
    expected,
    `${file}: upstream receipt drift`
  );
}
assert.equal(
  sha(read(root, "content/site/sv-global-header.js")),
  HEADER_BASELINE_SHA,
  "shared header must remain at clean baseline"
);
assert.match(text(root, "index.html"), /sv-global-header\.js\?v=20260715-1/);
assert.match(text(root, "visitors-centre.html"), /sv-global-header\.js\?v=20260715-1/);
assert.doesNotMatch(text(root, "index.html"), /svgh-320-2026-07-26-v1/);
assert.doesNotMatch(text(root, "visitors-centre.html"), /svgh-320-2026-07-26-v1/);

const sitemap = text(root, "sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(sitemapUrls.length, 28);
assert.equal(new Set(sitemapUrls).size, 28);

function localFileFor(publicUrl) {
  const pathname = new URL(publicUrl).pathname;
  if (pathname === "/") return "index.html";
  const stem = pathname.replace(/^\/|\/$/g, "");
  return [`${stem}.html`, `${stem}/index.html`, stem].find((candidate) =>
    fs.existsSync(path.join(root, candidate))
  );
}

const sitemapFiles = new Set();
for (const url of sitemapUrls) {
  const file = localFileFor(url);
  assert(file, `missing sitemap source ${url}`);
  sitemapFiles.add(file);
  for (const base of [root, artifact]) {
    const tags = metadataTags(text(base, file));
    assert.equal(tags.canonical.length, 1, `${base}:${file} canonical count`);
    assert.equal(tags.ogUrl.length, 1, `${base}:${file} og:url count`);
    assert.match(tags.canonical[0], new RegExp(`href="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(tags.ogUrl[0], new RegExp(`content="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
}

const replacements = new Map([
  ["index.html", [
    ["Listen to the trailer at the Visitors Centre", "Listen to the trailer at the Visitor’s Centre"],
    ["Start at the Visitors Centre", "Start at the Visitor’s Centre"],
  ]],
  ["start-here.html", [
    ["The Welcome Wagon moved to the Visitor's Centre —", "The Visitor’s Centre —"],
  ]],
  ["visitors-centre.html", [
    ["The Welcome Wagon Visitor's Centre · LAiDIES · SUNNYVAiLE", "Visitor’s Centre · LAiDIES · SUNNYVAiLE"],
    ["The Welcome Wagon Visitor's Centre · LAiDIES", "Visitor’s Centre · LAiDIES"],
    [">The Welcome Wagon Visitor's Centre</a>", ">Visitor’s Centre</a>"],
    ["from the Visitor's Centre.", "from the Visitor’s Centre."],
    ["Filed from SUNNYVAiLE · The Welcome Wagon", "Filed from SUNNYVAiLE · Visitor’s Centre"],
  ]],
  ["404.html", [
    ["The Welcome Wagon can point", "The Visitor’s Centre can point"],
    ["Visit the Welcome Wagon", "Visit the Visitor’s Centre"],
  ]],
  ["town-hall.html", [
    ["Stop by the Welcome Wagon first", "Stop by the Visitor’s Centre first"],
  ]],
  ["handbook.html", [
    ["Issued at the Visitor's Centre", "Issued at the Visitor’s Centre"],
    [">Visitor's Centre</a>", ">Visitor’s Centre</a>"],
    ["data-puffy-title=\"Visitor's Centre\"", "data-puffy-title=\"Visitor’s Centre\""],
    ["<h3>The Welcome Wagon Visitor's Centre</h3>", "<h3>Visitor’s Centre</h3>"],
    ["Back to the Visitor's Centre", "Back to the Visitor’s Centre"],
  ]],
  ["laidies-card.html", [
    [">The Welcome Wagon Visitor's Centre</option>", ">Visitor’s Centre</option>"],
    ["'visitors-centre':\"The Welcome Wagon Visitor's Centre\"", "'visitors-centre':\"Visitor’s Centre\""],
  ]],
  ["content/site/site-index.json", [
    ["\"title\": \"The Visitors Centre\"", "\"title\": \"Visitor’s Centre\""],
  ]],
  ["content/site/sunnyvaile-directory.js", [
    ["name: \"The Welcome Wagon Visitor's Centre\"", "name: \"Visitor’s Centre\""],
  ]],
  ["content/site/sv-welcome-tour.js", [
    ["Visitor's Centre", "Visitor’s Centre"],
    ["name: \"The Welcome Wagon\"", "name: \"Visitor’s Centre\""],
  ]],
  ["content/site/quick-rail.js", [
    ["title: \"Welcome Wagon Visitor's Centre\"", "title: \"Visitor’s Centre\""],
  ]],
]);

for (const [file, pairs] of replacements) {
  let expected = baselineText(file);
  for (const [before, after] of pairs) {
    const count = expected.split(before).length - 1;
    assert.ok(count >= 1, `${file}: missing expected predecessor text ${before}`);
    expected = expected.replaceAll(before, after);
  }
  const sitemapUrl = sitemapUrls.find((url) => localFileFor(url) === file);
  if (sitemapUrl) expected = transformDomainMetadata(file, expected, sitemapUrl);
  assert.equal(text(root, file), expected, `${file}: non-allowlisted name/metadata change`);
}

const forbiddenName = /Welcome Wagon|Visitors Centre|Visitor's Centre|Visitor's Center/i;
for (const file of replacements.keys()) {
  assert.doesNotMatch(text(root, file), forbiddenName, `${file}: stale canonical name`);
  if (fs.existsSync(path.join(artifact, file))) {
    assert.doesNotMatch(text(artifact, file), forbiddenName, `${file}: stale artifact canonical name`);
  }
}

const artifactHtml = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      artifactHtml.push(path.relative(artifact, absolute));
    }
  }
}
walk(artifact);
artifactHtml.sort();
assert.equal(artifactHtml.length, 88, "curated HTML inventory");
for (const file of artifactHtml) {
  const source = text(artifact, file);
  const mounts = source.match(/<script\b[^>]*\bsrc=["'][^"']*sv-back-nav\.js[^"']*["'][^>]*>\s*<\/script>/gi) || [];
  assert.equal(mounts.length, 1, `${file}: contextual nav mount count`);
  assert.ok(mounts[0].includes(NAV_SRC), `${file}: contextual nav version`);
}

const tracked = git("diff", "--name-only", BASELINE).split("\n").filter(Boolean);
const untracked = git("ls-files", "--others", "--exclude-standard").split("\n").filter(Boolean);
const actualChanged = [...new Set([...tracked, ...untracked])].sort();
const allowed = new Set([
  ...sitemapFiles,
  ...replacements.keys(),
  "content/site/sv-back-nav.js",
  "scripts/build-public-site.mjs",
  "scripts/test-sitewide-context-navigation.mjs",
  "scripts/lib/context-navigation-distribution-v1.mjs",
  "scripts/apply-domain-metadata-v1.mjs",
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-v1.mjs",
  "operations/product-stewards/platform-reliability/domain-transition/v1/domain-metadata-predecessor-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/test-tonight-minimum-safe-release-v1.mjs",
  "operations/releases/tonight-minimum-safe-2026-07-26/seal-tonight-minimum-safe-release-v1.mjs",
  "operations/releases/tonight-minimum-safe-2026-07-26/tonight-minimum-safe-release-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/tonight-minimum-safe-release-v1-files.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/ROLLBACK.md",
  "operations/releases/tonight-minimum-safe-2026-07-26/EVIDENCE.md",
  "operations/releases/tonight-minimum-safe-2026-07-26/INDEPENDENT-ACCEPTANCE.md",
  "operations/releases/tonight-minimum-safe-2026-07-26/rollback-tonight-minimum-safe-release-v1.mjs",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/context-navigation-distribution-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/domain-metadata-successor-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/visitors-centre-name-successor-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/visitors-centre-name-successor-v1-closure.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/shared-header-320-repair-candidate-v1.json",
  "operations/releases/tonight-minimum-safe-2026-07-26/upstream/shared-header-route-integration-closure-v1.json",
]);
const unexpected = actualChanged.filter((file) => !allowed.has(file));
assert.deepEqual(unexpected, [], `unexpected changed files: ${unexpected.join(", ")}`);
for (const file of actualChanged) {
  assert.doesNotMatch(file, /(?:^|\/)(?:assets|content\/site\/readiness|supabase|workers)(?:\/|$)/, `forbidden lane changed: ${file}`);
}

console.log(
  `TONIGHT MINIMUM SAFE RELEASE PASS routes=28 html=88 nav_mounts=88 ` +
  `changed=${actualChanged.length} header=EXCLUDED unexpected=0`
);
