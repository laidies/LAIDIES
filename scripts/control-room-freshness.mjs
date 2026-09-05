#!/usr/bin/env node

/**
 * Bounded Control Room freshness check.
 *
 * This is deliberately an operational detector, not an admission system. It
 * reads the existing Learning claim register for its partial factual signal and
 * fetches only the public Blend & Snap runtime family. A successful HTTP fetch
 * proves availability of an input, never browser behaviour or content quality.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const statuses = new Set(["available", "held", "planned", "unavailable"]);
const fixedInputs = [
  "/blend-snap.html",
  "/content/episode-index.json",
  "/content/blend-snap-weekly-packs.json",
];

export class FreshnessInputError extends Error { constructor(message) { super(message); this.code = "INPUT"; } }
export class FreshnessNetworkError extends Error { constructor(message) { super(message); this.code = "NETWORK"; } }

function date(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

function hash(value) { return crypto.createHash("sha256").update(value).digest("hex"); }

function safeSitePath(value) {
  if (typeof value !== "string" || !/^\/(?!\/)[A-Za-z0-9_./?=&%#-]+$/.test(value) || value.includes("..")) return false;
  try { return !decodeURIComponent(value).includes(".."); } catch { return false; }
}

function parseArgs(argv) {
  const args = { baseUrl: "https://laidies.ai", asOf: new Date().toISOString().slice(0, 10), timeoutMs: 8000, json: null, canonicalRoot: root };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--base-url") args.baseUrl = argv[++index];
    else if (arg === "--as-of") args.asOf = argv[++index];
    else if (arg === "--timeout-ms") args.timeoutMs = Number(argv[++index]);
    else if (arg === "--json") args.json = argv[++index];
    else if (arg === "--canonical-root") args.canonicalRoot = argv[++index];
    else if (arg === "--help") {
      console.log("Usage: node scripts/control-room-freshness.mjs [--base-url URL] [--as-of YYYY-MM-DD] [--timeout-ms N] [--canonical-root REPOSITORY_ROOT] [--json PATH]");
      process.exit(0);
    } else throw new FreshnessInputError(`Unknown argument: ${arg}`);
  }
  let url;
  try { url = new URL(args.baseUrl); } catch { throw new FreshnessInputError("--base-url must be an absolute http(s) URL"); }
  if (!/^https?:$/.test(url.protocol) || url.pathname !== "/" || url.search || url.hash) throw new FreshnessInputError("--base-url must be an origin URL without path, query or hash");
  if (!date(args.asOf)) throw new FreshnessInputError("--as-of must be YYYY-MM-DD");
  if (!Number.isInteger(args.timeoutMs) || args.timeoutMs < 100 || args.timeoutMs > 30000) throw new FreshnessInputError("--timeout-ms must be an integer from 100 to 30000");
  const canonicalRoot = path.resolve(args.canonicalRoot || "");
  try {
    if (!fs.statSync(canonicalRoot).isDirectory()) throw new Error("not a directory");
  } catch { throw new FreshnessInputError(`--canonical-root must be a readable repository directory: ${canonicalRoot}`); }
  return { ...args, baseUrl: url.origin, canonicalRoot };
}

function readJson(file) {
  let text;
  try { text = fs.readFileSync(file, "utf8"); }
  catch (error) { throw new FreshnessInputError(`Missing required JSON: ${file} (${error.message})`); }
  try { return { value: JSON.parse(text), input: { path: file, sha256: hash(text) } }; }
  catch (error) { throw new FreshnessInputError(`Invalid required JSON: ${file} (${error.message})`); }
}

function canonicalState(asOf, canonicalRoot) {
  const canonicalLearningDir = path.join(canonicalRoot, "operations/product-stewards/learning-content-ecosystem");
  const registerInput = readJson(path.join(canonicalLearningDir, "claim-register.json"));
  const inboxInput = readJson(path.join(canonicalLearningDir, "freshness-signal-inbox.json"));
  const register = registerInput.value;
  const inbox = inboxInput.value;
  if (!Array.isArray(register.claims) || !Array.isArray(inbox.signals)) throw new FreshnessInputError("Learning freshness inputs require claims[] and signals[]");
  const invalidClaims = register.claims.filter((claim) => !date(claim.nextReviewAt))
    .map((claim) => ({ id: claim.id, reason: "nextReviewAt is missing or invalid", owner: claim.owner || register.owner || "learning-content-ecosystem" }));
  const dueClaims = register.claims.filter((claim) => date(claim.nextReviewAt) && claim.nextReviewAt <= asOf)
    .map((claim) => ({ id: claim.id, nextReviewAt: claim.nextReviewAt, status: claim.status, owner: claim.owner || register.owner || "learning-content-ecosystem" }));
  const blockedClaims = register.claims.filter((claim) => ["STALE", "CONFLICTED", "CORRECTION_REQUIRED", "HOLD"].includes(claim.status))
    .map((claim) => ({ id: claim.id, status: claim.status, owner: claim.owner || register.owner || "learning-content-ecosystem" }));
  const openConsumerActions = register.claims.flatMap((claim) => (claim.consumers || []).filter((consumer) => ["UPDATE_REQUIRED", "SCRIPT_READY", "REBUILD_REQUIRED", "OWNER_REVIEW", "HOLD"].includes(consumer.status)).map((consumer) => ({ claimId: claim.id, owner: consumer.owner || claim.owner || register.owner || "learning-content-ecosystem", status: consumer.status, path: consumer.path })));
  const activeSignals = inbox.signals.filter((signal) => ["OPEN", "ROUTED", "ACCEPTED", "WATCH"].includes(signal.status))
    .map((signal) => ({ id: signal.id, severity: signal.severity, status: signal.status, affectedClaimIds: signal.affectedClaimIds || [] }));
  return { coverage: register.coverage || { state: "UNKNOWN" }, registeredClaims: register.claims.length, dueClaims, invalidClaims, blockedClaims, openConsumerActions, activeSignals, inputFiles: [registerInput.input, inboxInput.input] };
}

async function fetchText(baseUrl, sitePath, timeoutMs, fetchImpl) {
  if (!fixedInputs.includes(sitePath) && !safeSitePath(sitePath)) throw new FreshnessInputError(`Unsafe requested route: ${sitePath}`);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let next = new URL(sitePath, baseUrl);
    let response;
    for (let redirects = 0; redirects < 4; redirects += 1) {
      response = await fetchImpl(next, { signal: controller.signal, redirect: "manual", headers: { accept: "text/html, application/json" } });
      if (![301, 302, 303, 307, 308].includes(response.status)) break;
      const location = response.headers.get("location");
      if (!location) throw new FreshnessNetworkError(`${sitePath} redirected without Location`);
      const redirect = new URL(location, next);
      if (redirect.origin !== new URL(baseUrl).origin || !safeSitePath(`${redirect.pathname}${redirect.search}${redirect.hash}`)) throw new FreshnessNetworkError(`${sitePath} redirected outside the configured public origin`);
      next = redirect;
    }
    if (!response || [301, 302, 303, 307, 308].includes(response.status)) throw new FreshnessNetworkError(`${sitePath} exceeded same-origin redirect limit`);
    const text = await response.text();
    if (!response.ok) throw new FreshnessNetworkError(`${sitePath} returned HTTP ${response.status}`);
    return { sitePath, finalUrl: response.url, status: response.status, text, sha256: hash(text) };
  } catch (error) {
    if (error instanceof FreshnessNetworkError) throw error;
    const suffix = error?.name === "AbortError" ? "timed out" : (error?.message || "fetch failed");
    throw new FreshnessNetworkError(`${sitePath} ${suffix}`);
  } finally { clearTimeout(timer); }
}

async function mapBounded(items, limit, mapper) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await mapper(items[index]);
    }
  }));
  return results;
}

function validateMenu({ page, index, manifest, asOf }) {
  const errors = [];
  if (!manifest || manifest.schemaVersion !== "1.0.0" || manifest.manifestId !== "blend-snap-weekly-packs" || !date(manifest.updatedAt) || !date(manifest.freshThrough) || manifest.updatedAt > manifest.freshThrough || manifest.updatedAt > asOf || !Array.isArray(manifest.packs)) errors.push("manifest dates or schema are invalid");
  if (!Array.isArray(manifest?.packs)) return { errors, routes: [], overdue: false, pageReview: "BEHAVIORAL_REVIEW_REQUIRED" };
  const published = Array.isArray(index?.episodes) ? index.episodes.filter((episode) => episode && episode.status === "published") : [];
  if (!published.length || manifest?.packs?.length !== published.length) errors.push("published episode and pack inventory disagree");
  const episodeByNumber = new Map(published.map((episode) => [episode.number, episode]));
  const routes = [];
  const seen = new Set();
  for (const pack of manifest.packs) {
    if (!pack || typeof pack !== "object") { errors.push("pack entry is malformed"); continue; }
    const episode = episodeByNumber.get(pack.episodeNumber);
    const expectedRoute = `/${String(episode?.issueUrl || "").replace(/^\//, "")}`;
    const required = pack.episodeNumber === 1 ? ["try_on", "cheat_sheet", "trading_cards"] : ["study_sheet", "try_on", "cheat_sheet", "trading_cards"];
    if (!episode || seen.has(pack.episodeNumber) || pack.episodeSlug !== episode.slug || pack.episodeTitle !== episode.title || pack.episodeRoute !== expectedRoute || !safeSitePath(pack.episodeRoute) || !Array.isArray(pack.components) || pack.components.length !== required.length) errors.push(`episode ${pack.episodeNumber} identity or component inventory disagrees`);
    seen.add(pack.episodeNumber);
    const componentIds = new Set();
    if (!Array.isArray(pack.components)) continue;
    for (const component of pack.components) {
      if (!component || typeof component !== "object") { errors.push(`episode ${pack.episodeNumber} contains malformed component`); continue; }
      componentIds.add(component.id);
      if (!required.includes(component.id) || !statuses.has(component.status) || (component.status === "available" ? !safeSitePath(component.route) : component.route !== null)) errors.push(`episode ${pack.episodeNumber} component ${component.id} has unsafe status/route`);
      if (component.status === "available" && safeSitePath(component.route)) routes.push({ episodeNumber: pack.episodeNumber, id: component.id, route: component.route });
    }
    if (componentIds.size !== required.length) errors.push(`episode ${pack.episodeNumber} duplicates or omits a component`);
    const quiz = pack.quizHandoff;
    const expectedQuiz = `/learn/quiz.html?issue=${pack.episodeNumber}&from=blend-snap#quiz-start`;
    if (!quiz || quiz.id !== "quiz" || !statuses.has(quiz.status) || (quiz.status === "available" ? quiz.route !== expectedQuiz : quiz.route !== null)) errors.push(`episode ${pack.episodeNumber} quiz handoff disagrees`);
    if (quiz?.status === "available" && safeSitePath(quiz.route)) routes.push({ episodeNumber: pack.episodeNumber, id: "quiz", route: quiz.route });
  }
  const fatalShutdown = /if\s*\(\s*!manifest[\s\S]{0,900}?manifest\.freshThrough\s*<\s*today[\s\S]{0,300}?!Array\.isArray\(manifest\.packs\)/.test(page.text);
  if (fatalShutdown) errors.push("page contains the old fatal stale-date shutdown condition");
  return { errors, routes, overdue: date(manifest?.freshThrough) && manifest.freshThrough < asOf, pageReview: fatalShutdown ? "FATAL_SHUTDOWN_DETECTED" : "BEHAVIORAL_REVIEW_REQUIRED" };
}

export async function runControlRoomFreshness(options = {}) {
  const args = { baseUrl: "https://laidies.ai", asOf: new Date().toISOString().slice(0, 10), timeoutMs: 8000, canonicalRoot: root, fetchImpl: globalThis.fetch, ...options };
  if (!date(args.asOf)) throw new FreshnessInputError("asOf must be YYYY-MM-DD");
  const canonicalRoot = path.resolve(args.canonicalRoot || "");
  const canonical = args.canonicalState || canonicalState(args.asOf, canonicalRoot);
  const inputs = await Promise.all(fixedInputs.map((entry) => fetchText(args.baseUrl, entry, args.timeoutMs, args.fetchImpl)));
  const [page, indexInput, manifestInput] = inputs;
  let index; let manifest;
  try { index = JSON.parse(indexInput.text); manifest = JSON.parse(manifestInput.text); }
  catch { throw new FreshnessInputError("Public Blend JSON input is malformed"); }
  const menu = validateMenu({ page, index, manifest, asOf: args.asOf });
  const routeInputs = menu.errors.length ? [] : await mapBounded(menu.routes, 4, async (entry) => ({ ...entry, ...(await fetchText(args.baseUrl, entry.route, args.timeoutMs, args.fetchImpl)) }));
  for (const entry of routeInputs) {
    if (entry.id === "try_on" && !entry.text.includes('params.get("from") === "blend-snap"')) menu.errors.push(`episode ${entry.episodeNumber} Try-On route lacks Blend & Snap identity`);
    if (entry.id === "quiz" && !/id=["']quiz-start["']/.test(entry.text)) menu.errors.push(`episode ${entry.episodeNumber} Quiz route lacks quiz-start identity`);
  }
  const requiredReviewWork = [];
  if (menu.overdue || menu.errors.length) requiredReviewWork.push({
    id: "blend-snap-operational-review",
    owner: "blend-snap-champion",
    status: "DUE",
    reason: menu.errors.length ? "public runtime validation failed" : `operational review overdue since ${manifest.freshThrough}`,
    required: ["Review current episode identity, every component status and exact route source.", "Run the real visitor browser journey for each still-available component and Quiz.", "Record a renewal, correction, or hold through the existing owner workflow; do not renew dates automatically."],
  });
  for (const claim of canonical.dueClaims) requiredReviewWork.push({ id: `claim-${claim.id}`, owner: claim.owner, status: "DUE", reason: `canonical claim review due ${claim.nextReviewAt}`, required: ["Use the existing owner workflow to review or disposition the registered factual claim."] });
  for (const claim of canonical.invalidClaims || []) requiredReviewWork.push({ id: `claim-${claim.id}`, owner: claim.owner, status: "DUE", reason: claim.reason, required: ["Repair the registered review date before relying on freshness output."] });
  for (const claim of canonical.blockedClaims || []) requiredReviewWork.push({ id: `claim-${claim.id}-blocked`, owner: claim.owner, status: "DUE", reason: `registered claim status ${claim.status}`, required: ["Use the existing owner workflow to correct or explicitly hold the claim."] });
  for (const action of canonical.openConsumerActions || []) requiredReviewWork.push({ id: `consumer-${action.claimId}-${hash(action.path || action.status).slice(0, 8)}`, owner: action.owner, status: "DUE", reason: `registered consumer action ${action.status}`, required: ["Complete or explicitly disposition the registered consumer action."] });
  for (const signal of canonical.activeSignals || []) requiredReviewWork.push({ id: `signal-${signal.id}`, owner: "learning-content-ecosystem", status: "DUE", reason: `active source signal ${signal.status} (${signal.severity || "unknown severity"})`, required: ["Route and disposition the active source signal through the existing owner workflow."] });
  return {
    schemaVersion: "laidies.control-room-freshness.v1",
    evaluatedAt: args.asOf,
    coverage: { state: "PARTIAL", factualClaimCoverage: canonical.coverage, note: "HTTP/source checks do not prove browser behaviour, content admission, or public-currentness." },
    outcome: requiredReviewWork.length ? "REVIEW_REQUIRED" : "NO_NEW_DETECTED_ISSUE",
    canonicalInputs: args.canonicalState ? { source: "injected-fixture", files: [] } : { source: "repository", root: canonicalRoot, files: canonical.inputFiles },
    canonicalFreshness: canonical,
    blendSnap: { manifest: { updatedAt: manifest.updatedAt, freshThrough: manifest.freshThrough, sha256: manifestInput.sha256 }, indexSha256: indexInput.sha256, pageSha256: page.sha256, overdue: menu.overdue, pageReview: menu.pageReview, validationErrors: menu.errors, fetchedAvailableRoutes: routeInputs.map(({ episodeNumber, id, route, status, finalUrl, sha256 }) => ({ episodeNumber, id, route, status, finalUrl, sha256 })) },
    requiredReviewWork,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await runControlRoomFreshness(args);
  const text = `CONTROL_ROOM_FRESHNESS_${result.outcome} coverage=${result.coverage.state} work=${result.requiredReviewWork.length} blend_overdue=${result.blendSnap.overdue}\n`;
  if (args.json) fs.writeFileSync(path.resolve(args.json), `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(text);
  if (result.blendSnap.validationErrors.length) process.exitCode = 2;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main().catch((error) => {
  process.stderr.write(`${error.code || "ERROR"}: ${error.message}\n`);
  process.exit(error.code === "NETWORK" ? 3 : 2);
});
