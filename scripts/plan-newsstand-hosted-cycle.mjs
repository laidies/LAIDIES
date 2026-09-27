#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateIntakeReceipt } from "./run-newsstand-cloud-intake.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAX_SIGNAL_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MODE = "PRIVATE_DAILY_PLAN_ONLY";

export const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");

function timestamp(value) {
  const ms = Date.parse(value || "");
  return Number.isFinite(ms) ? ms : null;
}

function https(value) {
  try { return new URL(String(value || "")).protocol === "https:" ? new URL(value).href : null; } catch { return null; }
}

function normalizeUrl(value) {
  const parsed = https(value);
  if (!parsed) return null;
  const url = new URL(parsed);
  url.hash = "";
  url.search = "";
  return url.href.replace(/\/$/, "");
}

function jsonAssignment(raw) {
  const marker = /window\.NEWSSTAND_DATA\s*=\s*/g;
  const match = marker.exec(raw);
  if (!match) throw new Error("NEWSSTAND_DATA JSON assignment is missing");
  let start = match.index + match[0].length;
  if (raw[start] !== "{") throw new Error("NEWSSTAND_DATA assignment must begin with JSON object");
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < raw.length; index += 1) {
    const char = raw[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"') { quote = char; continue; }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        try { return JSON.parse(raw.slice(start, index + 1)); }
        catch (error) { throw new Error(`NEWSSTAND_DATA JSON is malformed: ${error.message}`); }
      }
    }
  }
  throw new Error("NEWSSTAND_DATA JSON assignment is unterminated");
}

/** Extract only known story IDs and source URLs from the JSON canonical assignment; never execute source code. */
export function extractCanonicalCoverage(storiesRaw) {
  const data = jsonAssignment(storiesRaw);
  if (!Array.isArray(data?.stories)) throw new Error("NEWSSTAND_DATA.stories must be an array");
  const storyIds = new Set();
  const sourceUrls = new Set();
  for (const story of data.stories) {
    if (!story || typeof story.id !== "string" || !story.id.trim()) throw new Error("canonical story id is missing");
    storyIds.add(story.id);
    if (!Array.isArray(story.sources)) throw new Error(`canonical story ${story.id} sources must be an array`);
    for (const source of story.sources) {
      const url = normalizeUrl(source?.url);
      if (!url) throw new Error(`canonical story ${story.id} has invalid source URL`);
      sourceUrls.add(url);
    }
  }
  return { storyIds: [...storyIds].sort(), sourceUrls: [...sourceUrls].sort() };
}

function existingPriority(source) {
  const value = source?.editorialPriority ?? source?.editorial?.priority ?? source?.priority;
  return Number.isFinite(value) ? Number(value) : null;
}

function signalStoryIds(signal) {
  return [signal?.storyId, signal?.candidateStoryId, ...(Array.isArray(signal?.relatedStoryIds) ? signal.relatedStoryIds : [])]
    .filter((id) => typeof id === "string" && id.trim());
}

export function buildPrivateDailyPlan({ receipt, registry, storiesRaw, now }) {
  const receiptCheck = validateIntakeReceipt(receipt);
  if (!receiptCheck.ok) throw new Error(`intake receipt invalid: ${receiptCheck.errors.join(", ")}`);
  if (!Array.isArray(registry?.sources)) throw new Error("source registry requires sources array");
  if (receipt?.sourceRegistry?.sha256 !== sha256(JSON.stringify(registry))) throw new Error("source registry bytes do not match intake receipt binding");
  const nowMs = timestamp(now);
  if (nowMs === null) throw new Error("now must be an ISO timestamp");
  let coverage;
  try { coverage = extractCanonicalCoverage(storiesRaw); }
  catch (error) {
    return {
      schemaVersion: "newsstand-hosted-cycle-plan.v1", mode: MODE, generatedAt: new Date(nowMs).toISOString(),
      input: { intakeReceipt: { schemaVersion: receipt.schemaVersion, generatedAt: receipt.generatedAt, sha256: sha256(JSON.stringify(receipt)) }, sourceRegistry: { path: receipt.sourceRegistry.path, sha256: receipt.sourceRegistry.sha256 }, canonicalStories: { path: "content/newsstand-stories.js", sha256: sha256(storiesRaw) } },
      outcome: "HOLD_MALFORMED_CANONICAL", canonicalReadError: error.message,
      coverage: { canonicalStoryIds: [], canonicalSourceUrls: [] }, candidates: [], rejected: [], sourceGaps: [{ disposition: "CANONICAL_COVERAGE_UNREADABLE", reason: "Canonical story data must be repaired or supplied before deduplication can be trusted." }],
      counts: { intakeSignals: receipt.newSignals.length, candidates: 0, rejected: 0, unavailableSources: receipt.unavailableSources.length }, factualClaimMade: false, draftActionTaken: false, publicationActionTaken: false, canonicalWrite: false, deploymentActionTaken: false
    };
  }
  const knownStories = new Set(coverage.storyIds);
  const coveredUrls = new Set(coverage.sourceUrls);
  const sourceById = new Map(registry.sources.map((source) => [source.id, source]));
  const unavailableIds = new Set((receipt.unavailableSources || []).map((source) => source.sourceId));
  const candidates = [];
  const rejected = [];

  for (const signal of receipt.newSignals) {
    const source = sourceById.get(signal.sourceId);
    const url = normalizeUrl(signal.url);
    const publishedMs = timestamp(signal.publishedAt);
    const observedMs = timestamp(signal.observedAt);
    const ageBase = publishedMs ?? observedMs;
    const linkedStoryIds = signalStoryIds(signal);
    if (!source) {
      rejected.push({ signalId: signal.signalId, disposition: "REJECTED_UNKNOWN_SOURCE", reason: "Signal sourceId is absent from the supplied registry." });
      continue;
    }
    if (!["ACTIVE_MONITOR", "PILOT_MONITOR"].includes(source.status)) {
      rejected.push({ signalId: signal.signalId, disposition: "REJECTED_INACTIVE_SOURCE", reason: "Current source registry does not permit recurring monitoring for this source." });
      continue;
    }
    if (!url) {
      rejected.push({ signalId: signal.signalId, disposition: "REJECTED_INVALID_SOURCE_URL", reason: "Signal has no usable HTTPS source URL." });
      continue;
    }
    if (unavailableIds.has(signal.sourceId)) {
      rejected.push({ signalId: signal.signalId, disposition: "REJECTED_SOURCE_UNAVAILABLE", reason: "The same intake receipt reports this source unavailable; do not plan research from unread evidence." });
      continue;
    }
    if (ageBase === null || nowMs - ageBase > MAX_SIGNAL_AGE_MS || ageBase > nowMs) {
      rejected.push({ signalId: signal.signalId, disposition: "REJECTED_STALE_OR_INVALID_EVIDENCE", reason: "Signal lacks a usable current publication/observation time or falls outside the seven-day planning window." });
      continue;
    }
    if (coveredUrls.has(url)) {
      rejected.push({ signalId: signal.signalId, disposition: "DUPLICATE_COVERED_SOURCE_URL", reason: "Its normalized source URL is already present in canonical NewsStand stories." });
      continue;
    }
    if (linkedStoryIds.some((id) => knownStories.has(id))) {
      rejected.push({ signalId: signal.signalId, disposition: "DUPLICATE_COVERED_STORY_ID", reason: "Its supplied related story ID already exists in canonical NewsStand stories." });
      continue;
    }
    const priority = existingPriority(source);
    candidates.push({
      candidateId: `NSCP-${sha256(`${signal.signalId}|${url}`).slice(0, 20)}`,
      signalId: signal.signalId,
      source: { id: source.id, name: source.name, authorityTier: source.authorityTier, url, registryPath: receipt.sourceRegistry.path },
      discovery: { title: signal.title, publishedAt: signal.publishedAt, observedAt: signal.observedAt, evidenceBoundary: signal.evidenceBoundary },
      disposition: priority === null ? "REQUIRES_SEMANTICS_REVIEW" : "RESEARCH_REQUIRED",
      ranking: priority === null
        ? { status: "UNRANKED_NO_EXISTING_EDITORIAL_PRIORITY", value: null }
        : { status: "METADATA_RANKED", value: priority },
      sourceGaps: [
        "Discovery receipt contains no article body or claim-level evidence.",
        "Reopen the source URL and bind current primary or affected-party evidence before any factual writing.",
        "A separate semantic/editorial review must establish reader relevance; this planner does not infer significance."
      ],
      publicationActionTaken: false
    });
  }

  candidates.sort((a, b) => {
    const av = a.ranking.value;
    const bv = b.ranking.value;
    if (av !== null && bv !== null && av !== bv) return bv - av;
    if (av !== null) return -1;
    if (bv !== null) return 1;
    return a.signalId.localeCompare(b.signalId);
  });
  const sourceGaps = (receipt.unavailableSources || []).map((source) => ({
    sourceId: source.sourceId,
    url: source.url,
    observedAt: source.checkedAt,
    disposition: "SOURCE_UNAVAILABLE_RESEARCH_REQUIRED",
    reason: "No quiet outcome is permitted while this planned source was unread or unavailable."
  }));
  const outcome = sourceGaps.length ? "NOT_QUIET_SOURCE_UNAVAILABLE"
    : candidates.length ? "RESEARCH_OR_SEMANTICS_REVIEW_REQUIRED"
    : receipt.newSignals.length ? "ALL_SIGNALS_REJECTED_WITH_REASONS"
    : "NO_NEW_SIGNALS_OBSERVED";
  return {
    schemaVersion: "newsstand-hosted-cycle-plan.v1",
    mode: MODE,
    generatedAt: new Date(nowMs).toISOString(),
    input: {
      intakeReceipt: { schemaVersion: receipt.schemaVersion, generatedAt: receipt.generatedAt, sha256: sha256(JSON.stringify(receipt)) },
      sourceRegistry: { path: receipt.sourceRegistry.path, sha256: receipt.sourceRegistry.sha256 },
      canonicalStories: { path: "content/newsstand-stories.js", sha256: sha256(storiesRaw) }
    },
    outcome,
    coverage: { canonicalStoryIds: coverage.storyIds, canonicalSourceUrls: coverage.sourceUrls },
    candidates,
    rejected,
    sourceGaps,
    counts: { intakeSignals: receipt.newSignals.length, candidates: candidates.length, rejected: rejected.length, unavailableSources: sourceGaps.length },
    factualClaimMade: false,
    draftActionTaken: false,
    publicationActionTaken: false,
    canonicalWrite: false,
    deploymentActionTaken: false
  };
}

export function validatePrivateDailyPlan(plan) {
  const errors = [];
  if (plan?.schemaVersion !== "newsstand-hosted-cycle-plan.v1") errors.push("schemaVersion");
  if (plan?.mode !== MODE) errors.push("mode");
  for (const field of ["factualClaimMade", "draftActionTaken", "publicationActionTaken", "canonicalWrite", "deploymentActionTaken"]) if (plan?.[field] !== false) errors.push(field);
  if (!Array.isArray(plan?.candidates) || !Array.isArray(plan?.rejected) || !Array.isArray(plan?.sourceGaps)) errors.push("plan arrays");
  for (const candidate of plan?.candidates || []) {
    if (!/^NSCP-[a-f0-9]{20}$/.test(candidate?.candidateId || "")) errors.push("candidate id");
    if (!https(candidate?.source?.url)) errors.push("candidate source URL");
    if (!Array.isArray(candidate?.sourceGaps) || !candidate.sourceGaps.length) errors.push("candidate source gaps");
    if (!["REQUIRES_SEMANTICS_REVIEW", "RESEARCH_REQUIRED"].includes(candidate?.disposition)) errors.push("candidate disposition");
    if (candidate?.ranking?.status === "UNRANKED_NO_EXISTING_EDITORIAL_PRIORITY" && candidate.disposition !== "REQUIRES_SEMANTICS_REVIEW") errors.push("unranked semantic gate");
  }
  if (plan?.outcome === "HOLD_MALFORMED_CANONICAL" && typeof plan?.canonicalReadError !== "string") errors.push("malformed canonical reason");
  if ((plan?.sourceGaps || []).length && plan?.outcome === "NO_NEW_SIGNALS_OBSERVED") errors.push("unavailable source cannot be quiet");
  return { ok: errors.length === 0, errors };
}

function arg(name, fallback = null) { const i = process.argv.indexOf(name); return i === -1 ? fallback : process.argv[i + 1]; }
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const intakePath = path.resolve(root, arg("--intake", ".newsstand-cloud-intake/receipt.json"));
  const registryPath = path.resolve(root, arg("--registry", "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json"));
  const storiesPath = path.resolve(root, arg("--stories", "content/newsstand-stories.js"));
  const outputPath = path.resolve(root, arg("--output", ".newsstand-hosted-cycle/plan.json"));
  const now = arg("--now", new Date().toISOString());
  const plan = buildPrivateDailyPlan({ receipt: JSON.parse(fs.readFileSync(intakePath, "utf8")), registry: JSON.parse(fs.readFileSync(registryPath, "utf8")), storiesRaw: fs.readFileSync(storiesPath, "utf8"), now });
  const check = validatePrivateDailyPlan(plan);
  if (!check.ok) throw new Error(`private daily plan invalid: ${check.errors.join(", ")}`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(plan, null, 2)}\n`);
  console.log("NEWSSTAND HOSTED CYCLE PLAN PASS");
  console.log(`outcome=${plan.outcome} candidates=${plan.counts.candidates} rejected=${plan.counts.rejected} unavailable=${plan.counts.unavailableSources}`);
  console.log("draft=NONE publication=NONE canonical_write=NONE deployment=NONE");
}
