#!/usr/bin/env node
// Private preparation only. This never writes canonical data or releases a version.
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const versions = require("../content/newsstand-big-picture-versions.js");
const SOURCE_PATH = "content/newsstand-stories.js";
const HASH = /^[a-f0-9]{64}$/;
const PRIVATE_TEXT = /Ali[’']s|\bAli approved\b|Claude-edited|rejected draft|internal (?:prompt|workflow|tool)|deployment|manifest|producer review/i;

const fail = message => { throw new Error(`BIG_PICTURE_VERSION_PREPARATION_REJECT: ${message}`); };
const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
const identity = bytes => ({ bytes: Buffer.byteLength(bytes), sha256: sha256(bytes) });
const equal = (left, right) => left.bytes === right.bytes && left.sha256 === right.sha256;
const required = (args, name) => {
  const index = args.indexOf(name);
  if (index === -1 || !args[index + 1] || args[index + 1].startsWith("--")) fail(`missing ${name}`);
  return args[index + 1];
};

function strictIso(value, label) {
  if (!versions.validDate(value) || !/T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value)) fail(`${label} must be an exact ISO timestamp`);
  return value;
}

function originFor(value, role, allowTestLocalhost) {
  let url;
  try { url = new URL(value); } catch { fail(`${role} origin is invalid`); }
  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) fail(`${role} origin must be a bare origin`);
  const local = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if (local) {
    if (!allowTestLocalhost || process.env.NEWSSTAND_BIG_PICTURE_TEST_FIXTURES !== "1") fail(`${role} localhost origin is test-only`);
    if (url.protocol !== "http:") fail(`${role} test fixture must use http`);
  } else {
    if (url.protocol !== "https:") fail(`${role} origin must use https`);
    if (role === "custom" && url.hostname !== "laidies.ai") fail("custom origin must be https://laidies.ai");
    if (role === "immutable" && !/^[a-f0-9]{8}\.laidies-sunnyvaile\.pages\.dev$/.test(url.hostname)) fail("immutable origin must be an immutable Cloudflare Pages deployment host");
    if (url.port) fail(`${role} public origin cannot override its port`);
  }
  return url.origin;
}

function fetchWithCurl(url) {
  const result = spawnSync("curl", ["--fail", "--silent", "--show-error", "--location", "--max-time", "20", url], { encoding: null, maxBuffer: 20 * 1024 * 1024 });
  if (result.error) fail(`curl could not fetch public source: ${result.error.message}`);
  if (result.status !== 0) fail(`curl could not fetch public source (${result.status})`);
  return result.stdout.toString("utf8");
}

function manifestSource(manifestPath) {
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")); } catch { fail("artifact manifest is unreadable JSON"); }
  if (manifest.schema !== "laidies-release-artifact-manifest/v1" || !Array.isArray(manifest.files)) fail("artifact manifest has the wrong schema");
  const files = manifest.files.filter(file => file && file.path === SOURCE_PATH);
  if (files.length !== 1 || !Number.isSafeInteger(files[0].bytes) || files[0].bytes < 0 || !HASH.test(files[0].sha256 || "")) fail("artifact manifest does not bind exactly one newsstand dataset file");
  const computedIdentity = sha256(manifest.files.map(file => `${file.sha256}  ${file.path}\n`).join(""));
  if (!HASH.test(manifest.identitySha256 || "") || computedIdentity !== manifest.identitySha256) fail("artifact manifest identity does not match its file records");
  return { manifest, source: { bytes: files[0].bytes, sha256: files[0].sha256 }, manifestSha256: sha256(fs.readFileSync(manifestPath)) };
}

function datasetFrom(raw, label) {
  const context = { window: {} };
  try { vm.runInNewContext(raw, context, { timeout: 1000, filename: label }); } catch { fail(`${label} is not an executable NewsStand dataset`); }
  const dataset = context.window.NEWSSTAND_DATA;
  if (!dataset || !Array.isArray(dataset.stories)) fail(`${label} does not expose NEWSSTAND_DATA.stories`);
  return dataset;
}

function publishedBigPicture(raw, storyId, label) {
  const stories = datasetFrom(raw, label).stories.filter(story => story && story.id === storyId);
  if (stories.length !== 1) fail(`${label} does not contain exactly one requested predecessor story`);
  const story = stories[0];
  if (story.edition !== "big-picture" || !["published", "corrected"].includes(story.status) || !story.bigPicture) fail("requested predecessor is not a published Big Picture story");
  return story;
}

function privateSummary(value) {
  if (typeof value !== "string" || !value.trim() || PRIVATE_TEXT.test(value)) fail("summary must be reader-facing and omit private operational language");
  return value.trim();
}

export function prepareBigPictureVersion({ storyId, versionId, replacedAt, summary, manifestPath, customOrigin, immutableOrigin, outputPath, predecessorPath, allowTestLocalhost = false, root = ROOT }) {
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(storyId || "")) fail("story id is invalid");
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(versionId || "")) fail("retained version id is invalid");
  strictIso(replacedAt, "replacement timestamp");
  summary = privateSummary(summary);
  const destination = path.resolve(outputPath || "");
  if (!outputPath) fail("missing private output path");
  if (fs.existsSync(destination)) fail("private output already exists; replay is refused");
  const custom = originFor(customOrigin, "custom", allowTestLocalhost);
  const immutable = originFor(immutableOrigin, "immutable", allowTestLocalhost);
  if (!allowTestLocalhost && !destination.startsWith(path.resolve(root, 'operations') + path.sep)) fail("output must stay inside private operations");
  if (custom === immutable) fail("custom and immutable origins must be distinct");
  const manifestAbsolute = path.resolve(manifestPath || "");
  const bound = manifestSource(manifestAbsolute);
  const urls = { custom: `${custom}/${SOURCE_PATH}`, immutable: `${immutable}/${SOURCE_PATH}` };
  const fetched = { custom: fetchWithCurl(urls.custom), immutable: fetchWithCurl(urls.immutable) };
  const remote = { custom: identity(fetched.custom), immutable: identity(fetched.immutable) };
  if (!equal(remote.custom, remote.immutable)) fail("custom and immutable public dataset bytes disagree");
  if (!equal(remote.custom, bound.source)) fail("public dataset bytes do not match the supplied artifact manifest");
  const localPath = predecessorPath ? path.resolve(predecessorPath) : path.resolve(root, SOURCE_PATH);
  const localRaw = fs.readFileSync(localPath, "utf8");
  const local = identity(localRaw);
  if (!equal(local, bound.source) || localRaw !== fetched.custom) fail("local predecessor dataset does not exactly match the verified public dataset");
  const remoteStory = publishedBigPicture(fetched.custom, storyId, "public dataset");
  const localStory = publishedBigPicture(localRaw, storyId, "local dataset");
  if (JSON.stringify(localStory) !== JSON.stringify(remoteStory)) fail("local predecessor story differs from the verified public predecessor");
  if ((remoteStory.bigPicture.previousVersions || []).some(item => item && item.versionId === versionId)) fail("retained version id already exists in the published predecessor");
  const testFixture = allowTestLocalhost;
  const proof = {
    kind: "verified-public-artifact.v1",
    verificationState: "PUBLICLY_VERIFIED",
    independentlyVerified: true,
    verifiedAt: new Date().toISOString(),
    verifier: testFixture ? "test-fixture two-origin byte comparison" : "two-origin public-byte comparison",
    articleSha256: versions.articleIdentity(versions.publicArticle(remoteStory)),
    artifactManifestSha256: bound.manifestSha256
  };
  const created = versions.createSnapshot(remoteStory, { versionId, replacedAt, summary }, proof);
  if (!created.ok) fail(`snapshot helper rejected verified predecessor: ${created.reason}`);
  const result = {
    schema: "laidies.newsstand-big-picture-version-preparation.v1",
    status: "PRIVATE_SNAPSHOT_CANDIDATE_NOT_ADMITTED",
    createdAt: new Date().toISOString(),
    evidence: {
      state: testFixture ? "TEST_FIXTURE_TWO_ORIGIN_BYTE_COMPARISON" : "TWO_ORIGIN_PUBLIC_BYTE_COMPARISON",
      editorialReview: "NOT_PERFORMED",
      limitation: "Byte comparison proves only that the two fetched dataset files and the supplied manifest agree; it is not editorial admission or a release.",
      manifest: { path: manifestAbsolute, sourceBytes: bound.source.bytes, sourceSha256: bound.source.sha256, manifestSha256: bound.manifestSha256 },
      fetchedSourceFiles: {
        custom: { origin: custom, url: urls.custom, ...remote.custom },
        immutable: { origin: immutable, url: urls.immutable, ...remote.immutable }
      },
      localSourceFile: { path: localPath, ...local }
    },
    privateHelperProof: proof,
    snapshotCandidate: created.snapshot
  };
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${JSON.stringify(result, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  return result;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("Usage: node scripts/prepare-newsstand-big-picture-version.mjs --story-id ID --version-id ID --replaced-at ISO --summary TEXT --manifest FILE --custom-origin https://laidies.ai --immutable-origin https://DEPLOYMENT.laidies-sunnyvaile.pages.dev --output PRIVATE_FILE");
    return;
  }
  const allowTestLocalhost = args.includes("--allow-test-localhost");
  const result = prepareBigPictureVersion({
    storyId: required(args, "--story-id"), versionId: required(args, "--version-id"), replacedAt: required(args, "--replaced-at"),
    summary: required(args, "--summary"), manifestPath: required(args, "--manifest"), customOrigin: required(args, "--custom-origin"),
    immutableOrigin: required(args, "--immutable-origin"), outputPath: required(args, "--output"),
    predecessorPath: args.includes('--predecessor-data') ? required(args, '--predecessor-data') : undefined, allowTestLocalhost
  });
  console.log(`PRIVATE BIG PICTURE SNAPSHOT CANDIDATE READY ${result.snapshotCandidate.versionId} (${result.evidence.state})`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
