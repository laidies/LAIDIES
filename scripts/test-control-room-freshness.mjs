#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runControlRoomFreshness, FreshnessInputError, FreshnessNetworkError } from "./control-room-freshness.mjs";

const today = "2026-09-05";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const candidatePage = fs.readFileSync(path.join(root, "blend-snap.html"), "utf8");
const fatalPage = candidatePage.replace("manifest.updatedAt > today ||", "manifest.freshThrough < today ||");
assert.notEqual(fatalPage, candidatePage, "known-bad calibration must restore the previous fatal date condition");
function index() { return { episodes: [{ number: 1, slug: "one", title: "One", status: "published", issueUrl: "issues/issue-01.html" }] }; }
function manifest(overrides = {}) { return { schemaVersion: "1.0.0", manifestId: "blend-snap-weekly-packs", updatedAt: "2026-08-21", freshThrough: "2026-08-23", packs: [{ episodeNumber: 1, episodeSlug: "one", episodeTitle: "One", episodeRoute: "/issues/issue-01.html", components: [{ id: "try_on", job: "Practice", label: "Try-On", status: "available", statusLabel: "Ready", publicNote: "Ready", route: "/try-on.html?issue=1&from=blend-snap" }, { id: "cheat_sheet", job: "Reference", label: "Cheat", status: "held", statusLabel: "Held", publicNote: "Held", route: null }, { id: "trading_cards", job: "Cards", label: "Cards", status: "held", statusLabel: "Held", publicNote: "Held", route: null }], quizHandoff: { id: "quiz", job: "Check", label: "Quiz", status: "available", statusLabel: "Ready", publicNote: "Ready", route: "/learn/quiz.html?issue=1&from=blend-snap#quiz-start" } }] , ...overrides }; }
let mode = "overdue";
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://fixture");
  if (mode === "fetch-failure" && url.pathname === "/content/blend-snap-weekly-packs.json") { response.writeHead(503).end(); return; }
  if (mode === "external-redirect" && url.pathname === "/blend-snap.html") { response.writeHead(302, { location: "https://example.invalid/never-fetch" }).end(); return; }
  if (url.pathname === "/blend-snap.html") { response.end(mode === "fatal-shutdown" ? fatalPage : candidatePage); return; }
  if (url.pathname === "/content/episode-index.json") { response.end(JSON.stringify(index())); return; }
  if (url.pathname === "/content/blend-snap-weekly-packs.json") {
    const data = manifest();
    if (mode === "unsafe") data.packs[0].components[1].route = "https://evil.invalid";
    if (mode === "held-route") data.packs[0].components[1].route = "/content/printables/nope.html";
    if (mode === "future") data.updatedAt = data.freshThrough = "2026-10-01";
    if (mode === "malformed") { response.end("{"); return; }
    response.end(JSON.stringify(data)); return;
  }
  if (url.pathname === "/try-on.html") { response.end('params.get("from") === "blend-snap"'); return; }
  if (url.pathname === "/learn/quiz.html") { response.end('<div id="quiz-start">'); return; }
  response.end("ok");
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${server.address().port}`;
function runCli(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/control-room-freshness.mjs", ...args], {
      cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", reject);
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}
try {
  mode = "overdue";
  const overdue = await runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 });
  assert.equal(overdue.blendSnap.overdue, true); assert.equal(overdue.blendSnap.validationErrors.length, 0); assert.equal(overdue.requiredReviewWork[0].status, "DUE");
  const repeat = await runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 });
  assert.deepEqual(overdue.blendSnap, repeat.blendSnap, "same-date input is stable");
  for (const bad of ["unsafe", "held-route", "future"]) {
    mode = bad; const result = await runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 });
    assert.ok(result.blendSnap.validationErrors.length > 0, `${bad} rejects`);
  }
  mode = "unsafe";
  const invalidCli = await runCli(["--base-url", baseUrl, "--as-of", today, "--timeout-ms", "1000"]);
  assert.equal(invalidCli.code, 2, "invalid published input returns the CLI input-failure exit code");
  assert.match(invalidCli.stdout, /CONTROL_ROOM_FRESHNESS_REVIEW_REQUIRED/, "CLI preserves machine-readable summary before failure exit");
  mode = "malformed";
  await assert.rejects(() => runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 }), FreshnessInputError);
  mode = "fetch-failure";
  await assert.rejects(() => runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 }), FreshnessNetworkError);
  mode = "external-redirect";
  await assert.rejects(() => runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 }), /outside the configured public origin/);
  await assert.rejects(() => runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000, canonicalRoot: path.join(root, "missing-canonical-root") }), FreshnessInputError, "missing canonical inputs fail rather than falling back to a snapshot");
  mode = "fatal-shutdown";
  const fatalResult = await runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000 });
  assert.equal(fatalResult.blendSnap.pageReview, "FATAL_SHUTDOWN_DETECTED", "known-bad page is rejected by the real detector");
  assert.equal(overdue.blendSnap.pageReview, "BEHAVIORAL_REVIEW_REQUIRED", "real candidate warning is not treated as fatal shutdown");
  const injected = { coverage: { state: "PARTIAL_BACKFILL" }, registeredClaims: 1, dueClaims: [], invalidClaims: [{ id: "bad-date", reason: "nextReviewAt is missing or invalid", owner: "owner" }], blockedClaims: [{ id: "held", status: "HOLD", owner: "owner" }], openConsumerActions: [{ claimId: "open", status: "OWNER_REVIEW", owner: "owner", path: "x" }], activeSignals: [{ id: "active", status: "ROUTED", severity: "MATERIAL", affectedClaimIds: [] }] };
  mode = "overdue";
  const canonical = await runControlRoomFreshness({ baseUrl, asOf: today, timeoutMs: 1000, canonicalRoot: path.join(root, "missing-canonical-root"), canonicalState: injected });
  assert.ok(canonical.requiredReviewWork.some((work) => work.id === "signal-active"), "active source signal becomes required work");
  assert.ok(canonical.requiredReviewWork.some((work) => work.id === "claim-held-blocked"), "blocked claim becomes required work");
  assert.equal(canonical.canonicalInputs.source, "injected-fixture", "injected canonical fixture remains available for tests");
  assert.equal(overdue.canonicalInputs.source, "repository");
  assert.equal(overdue.canonicalInputs.files.length, 2, "report binds both canonical inputs by path and hash");
  console.log("✓ CONTROL ROOM FRESHNESS: overdue work, unsafe routes, dates, malformed input, failed fetch, redirect, canonical-root binding, partial canonical state, stable repeat");
} finally { await new Promise((resolve) => server.close(resolve)); }
