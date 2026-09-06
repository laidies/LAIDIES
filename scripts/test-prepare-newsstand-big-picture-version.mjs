#!/usr/bin/env node
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CLI = path.join(ROOT, "scripts", "prepare-newsstand-big-picture-version.mjs");
const raw = fs.readFileSync(path.join(ROOT, "content", "newsstand-stories.js"), "utf8");
const hash = value => createHash("sha256").update(value).digest("hex");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "newsstand-big-picture-version-"));

function manifestAt(name, source = raw) {
  const target = path.join(tmp, name);
  const files = [{ path: "content/newsstand-stories.js", bytes: Buffer.byteLength(source), sha256: hash(source) }];
  const manifest = { schema: "laidies-release-artifact-manifest/v1", createdAt: "2026-09-05T00:00:00Z", artifactDirectory: "/private/fixture", fileCount: 1, totalBytes: files[0].bytes, identitySha256: hash(files.map(file => `${file.sha256}  ${file.path}\n`).join("")), files };
  fs.writeFileSync(target, `${JSON.stringify(manifest)}\n`);
  return target;
}

async function server(body) {
  const instance = http.createServer((request, response) => {
    if (request.url === "/content/newsstand-stories.js") { response.writeHead(200, { "content-type": "text/javascript" }); response.end(body); return; }
    response.writeHead(404); response.end("missing");
  });
  await new Promise(resolve => instance.listen(0, "127.0.0.1", resolve));
  return { instance, origin: `http://127.0.0.1:${instance.address().port}` };
}

function run(args, env = {}) {
  return new Promise(resolve => {
    const child = spawn(process.execPath, [CLI, ...args], { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "", stderr = "";
    child.stdout.on("data", chunk => { stdout += chunk; });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("close", status => resolve({ status, stdout, stderr }));
  });
}
function invoke({ custom, immutable, manifest, output, storyId = "big-picture-data-centre-deal-2026-08-24", versionId = "2026-09-05-public", replacedAt = "2026-09-06T02:00:00Z", summary = "Updated the public explanation for readers.", extra = [] }) {
  return run(["--story-id", storyId, "--version-id", versionId, "--replaced-at", replacedAt, "--summary", summary, "--manifest", manifest, "--custom-origin", custom, "--immutable-origin", immutable, "--output", output, "--allow-test-localhost", ...extra], { NEWSSTAND_BIG_PICTURE_TEST_FIXTURES: "1" });
}
function rejected(result, expected) { assert.notEqual(result.status, 0, "calibration must reject"); assert.match(`${result.stderr}${result.stdout}`, expected); }

const goodManifest = manifestAt("manifest.json");
const custom = await server(raw);
const immutable = await server(raw);
try {
  const output = path.join(tmp, "private-candidate.json");
  const success = await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: goodManifest, output });
  assert.equal(success.status, 0, success.stderr);
  const prepared = JSON.parse(fs.readFileSync(output, "utf8"));
  assert.equal(prepared.status, "PRIVATE_SNAPSHOT_CANDIDATE_NOT_ADMITTED");
  assert.equal(prepared.evidence.state, "TEST_FIXTURE_TWO_ORIGIN_BYTE_COMPARISON");
  assert.equal(prepared.evidence.editorialReview, "NOT_PERFORMED");
  assert.equal(prepared.snapshotCandidate.versionId, "2026-09-05-public");
  assert.equal(prepared.snapshotCandidate.article.sourceApproval, undefined);
  assert.equal(prepared.snapshotCandidate.article.bigPicture, undefined);
  assert.equal(prepared.snapshotCandidate.originallyPublishedAt, "2026-08-24");
  assert.equal(prepared.evidence.fetchedSourceFiles.custom.sha256, hash(raw));
  assert.equal(prepared.evidence.fetchedSourceFiles.immutable.sha256, hash(raw));
  assert.equal(JSON.stringify(prepared.snapshotCandidate).includes(custom.origin), false, "public candidate must not contain origins");
  assert.equal(JSON.stringify(prepared.snapshotCandidate).includes("approvalStatus"), false, "public candidate must not contain source approval metadata");

  rejected(await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: goodManifest, output }), /output already exists/);
  rejected(await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: goodManifest, output: path.join(tmp, "wrong-story.json"), storyId: "does-not-exist" }), /requested predecessor story/);
  rejected(await invoke({ custom: "https://example.com", immutable: immutable.origin, manifest: goodManifest, output: path.join(tmp, "unknown-host.json") }), /custom origin must be/);
  rejected(await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: goodManifest, output: path.join(tmp, "bad-date.json"), replacedAt: "2026-02-30T02:00:00Z" }), /replacement timestamp/);
  rejected(await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: goodManifest, output: path.join(tmp, "private-summary.json"), summary: "Ali approved the deployment." }), /private operational language/);
  const noOptIn = await run(["--story-id", "big-picture-data-centre-deal-2026-08-24", "--version-id", "no-opt-in", "--replaced-at", "2026-09-06T02:00:00Z", "--summary", "Updated public explanation.", "--manifest", goodManifest, "--custom-origin", custom.origin, "--immutable-origin", immutable.origin, "--output", path.join(tmp, "no-opt-in.json")]);
  rejected(noOptIn, /localhost origin is test-only/);

  const stale = manifestAt("stale.json", `${raw}\n`);
  rejected(await invoke({ custom: custom.origin, immutable: immutable.origin, manifest: stale, output: path.join(tmp, "stale.json.out") }), /do not match the supplied artifact manifest/);
  const changed = await server(`${raw}\n// fixture mutation\n`);
  try { rejected(await invoke({ custom: custom.origin, immutable: changed.origin, manifest: goodManifest, output: path.join(tmp, "mutated.json") }), /public dataset bytes disagree/); }
  finally { await new Promise(resolve => changed.instance.close(resolve)); }
} finally {
  await new Promise(resolve => custom.instance.close(resolve));
  await new Promise(resolve => immutable.instance.close(resolve));
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log("✓ BIG PICTURE PRIVATE PREPARATION: two-origin byte comparison, manifest/local binding, privacy, and fail-closed calibrations exercised");
