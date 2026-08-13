#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateSourceRegistry } from "./check-source-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MODE = "PRIVATE_SIGNAL_INTAKE_ONLY";
const USER_AGENT = "LAiDIES-NewsStand-Private-Intake/1.0";
const MAX_BODY_BYTES = 2_500_000;
const SIGNAL_LOOKBACK_MS = 7 * 24 * 60 * 60 * 1000;
const FIRST_RUN_LOOKBACK_MS = 36 * 60 * 60 * 1000;
const MAX_BACKFILL_MS = 21 * 24 * 60 * 60 * 1000;
const BACKFILL_SOURCE_IDS = new Set(["SRC-AIDB", "SRC-ETHAN-MOLLICK"]);

const cadenceMs = {
  TWICE_DAILY: 6 * 60 * 60 * 1000,
  DAILY: 18 * 60 * 60 * 1000,
  DAILY_RELEASE_CHECK: 18 * 60 * 60 * 1000,
  TWICE_WEEKLY: 3 * 24 * 60 * 60 * 1000,
  WEEKLY: 6 * 24 * 60 * 60 * 1000,
  WEEKLY_RELEASE_CHECK: 6 * 24 * 60 * 60 * 1000,
  MONTHLY: 25 * 24 * 60 * 60 * 1000,
  MONTHLY_AND_ANNUAL_RELEASE: 25 * 24 * 60 * 60 * 1000,
  QUARTERLY: 80 * 24 * 60 * 60 * 1000,
  ANNUAL: 330 * 24 * 60 * 60 * 1000,
  ON_TRIGGER: Number.POSITIVE_INFINITY
};

export function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function normalizeBackfillSince(value, now) {
  if (value === null || value === undefined || value === "") return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("backfill-since must be YYYY-MM-DD");
  const start = new Date(`${value}T00:00:00.000Z`);
  const end = new Date(now);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) throw new Error("backfill-since or now is invalid");
  if (start.getTime() > end.getTime()) throw new Error("backfill-since cannot be in the future");
  if (end.getTime() - start.getTime() > MAX_BACKFILL_MS) throw new Error("backfill-since cannot exceed 21 days");
  return start.toISOString();
}

function cleanText(value, max = 240) {
  return String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function safeHttps(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function isoOrNull(value) {
  const date = new Date(value || "");
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

function firstXmlValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? cleanText(match[1], 500) : "";
}

function firstAtomLink(block) {
  const match = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  return safeHttps(match?.[1]);
}

export function parseFeedItems(body) {
  const blocks = [
    ...(body.match(/<item\b[\s\S]*?<\/item>/gi) || []),
    ...(body.match(/<entry\b[\s\S]*?<\/entry>/gi) || [])
  ].slice(0, 40);
  return blocks.map((block) => {
    const title = firstXmlValue(block, "title");
    const link = safeHttps(firstXmlValue(block, "link")) || firstAtomLink(block);
    const publishedAt = isoOrNull(
      firstXmlValue(block, "pubDate") || firstXmlValue(block, "published") || firstXmlValue(block, "updated")
    );
    const id = cleanText(firstXmlValue(block, "guid") || firstXmlValue(block, "id") || link || `${title}|${publishedAt}`, 800);
    return { id: sha256(id), title, url: link, publishedAt };
  }).filter((item) => item.title && item.url);
}

export function parseAidbItems(body) {
  const value = JSON.parse(body);
  if (!Array.isArray(value?.editions)) throw new Error("AIDB agent.json has no editions array");
  return value.editions.slice(0, 40).map((edition) => {
    const url = safeHttps(edition.transcript || edition.markdown || edition.html);
    const publishedAt = isoOrNull(`${edition.date}T12:00:00Z`);
    const stable = `${edition.date}|${edition.type}|${edition.title}|${url}`;
    return { id: sha256(stable), title: cleanText(edition.title), url, publishedAt };
  }).filter((item) => item.title && item.url);
}

const MONTHS = new Map([
  ["january", 1], ["february", 2], ["march", 3], ["april", 4],
  ["may", 5], ["june", 6], ["july", 7], ["august", 8],
  ["september", 9], ["october", 10], ["november", 11], ["december", 12]
]);

function monthDayAnchor(monthName, day) {
  return `${monthName.slice(0, 3).toLowerCase()}-${day}`;
}

export function parseOpenAiChangelogItems(body, sourceUrl = "https://developers.openai.com/api/docs/changelog") {
  const lines = String(body || "").split(/\r?\n/);
  const items = [];
  let year = null;
  let month = null;
  for (let index = 0; index < lines.length; index += 1) {
    const monthHeading = lines[index].match(/^##\s+([A-Za-z]+),\s+(\d{4})\s*$/);
    if (monthHeading) {
      month = MONTHS.get(monthHeading[1].toLowerCase()) || null;
      year = Number(monthHeading[2]);
      continue;
    }
    const dayHeading = lines[index].match(/^###\s+[A-Za-z]{3}\s+(\d{1,2})\s*$/);
    if (!dayHeading || !year || !month) continue;
    const day = Number(dayHeading[1]);
    const block = [];
    for (let cursor = index + 1; cursor < lines.length && !/^#{2,3}\s+/.test(lines[cursor]); cursor += 1) {
      block.push(lines[cursor]);
    }
    const paragraphs = block.join("\n").split(/\n\s*\n/).map((value) => cleanText(value, 500)).filter(Boolean);
    const descriptive = paragraphs.find((value) => !/^(?:Feature|Update|Fix|Deprecation|Announcement)(?:\s*·|$)/i.test(value));
    if (!descriptive) continue;
    const publishedAt = new Date(Date.UTC(year, month - 1, day, 12)).toISOString();
    const monthName = [...MONTHS.entries()].find(([, value]) => value === month)?.[0] || "update";
    const anchor = monthDayAnchor(monthName, day);
    const url = `${sourceUrl.replace(/\.md(?:#.*)?$/, "").replace(/#.*$/, "")}#${anchor}`;
    const identity = `${publishedAt}|${block.join("\n").trim()}`;
    items.push({ id: sha256(identity), title: descriptive.split(/(?<=[.!?])\s/)[0].slice(0, 240), url, publishedAt });
  }
  return items.slice(0, 40);
}

export function parseApHubItems(body) {
  const value = String(body || "");
  const heading = value.search(/<h1\b[^>]*>[\s\S]{0,500}?Artificial intelligence[\s\S]{0,500}?<\/h1>/i);
  if (heading === -1) throw new Error("AP AI hub has no scoped Artificial intelligence heading");
  const end = value.indexOf("</main>", heading);
  if (end === -1) throw new Error("AP AI hub has no scoped main boundary");
  const scoped = value.slice(heading, end);
  const items = [];
  const seen = new Set();
  const pattern = /<div class=["']PagePromo["'][^>]*data-posted-date-timestamp=["'](\d{10,13})["'][^>]*>[\s\S]{0,8000}?<a\b[^>]*aria-label=["']([^"']+)["'][^>]*href=["'](https:\/\/apnews\.com\/article\/[a-z0-9-]+)["']/gi;
  for (const match of scoped.matchAll(pattern)) {
    const [, rawTimestamp, rawTitle, url] = match;
    if (seen.has(url)) continue;
    const milliseconds = rawTimestamp.length === 10 ? Number(rawTimestamp) * 1000 : Number(rawTimestamp);
    const publishedAt = new Date(milliseconds).toISOString();
    if (!Number.isFinite(Date.parse(publishedAt))) continue;
    seen.add(url);
    items.push({ id: sha256(url), title: cleanText(rawTitle), url, publishedAt });
  }
  return items.slice(0, 40);
}

function parseHtmlSnapshot(body, sourceUrl) {
  const title = cleanText(body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || new URL(sourceUrl).hostname);
  const normalized = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/\b(?:nonce|csrf|request-id|trace-id)=["'][^"']+["']/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 250_000);
  return { items: [], title, fingerprint: sha256(normalized) };
}

export function selectDueSources(registry, previousState, now, forceSourceIds = new Set()) {
  const nowMs = new Date(now).getTime();
  return (registry.sources || []).filter((source) => {
    if (!["ACTIVE_MONITOR", "PILOT_MONITOR"].includes(source.status)) return false;
    const interval = cadenceMs[source.cadence];
    if (!Number.isFinite(interval)) return false;
    if (forceSourceIds.has(source.id)) return true;
    const checkedAt = previousState?.sources?.[source.id]?.checkedAt;
    if (!checkedAt) return true;
    const checkedMs = new Date(checkedAt).getTime();
    return !Number.isFinite(checkedMs) || nowMs - checkedMs >= interval;
  });
}

async function boundedText(response) {
  const text = await response.text();
  if (Buffer.byteLength(text) > MAX_BODY_BYTES) throw new Error(`response exceeds ${MAX_BODY_BYTES} bytes`);
  return text;
}

async function fetchOne(source, fetchImpl, now) {
  const url = source.recurringUrl || source.urls[0];
  try {
    const response = await fetchImpl(url, {
      redirect: "follow",
      headers: { "user-agent": USER_AGENT, accept: "application/json, application/xml, text/xml, text/html;q=0.9, */*;q=0.5" }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = await boundedText(response);
    let items = [];
    let title = cleanText(source.name);
    let fingerprint;
    if (source.intakeMode === "AIDB_AGENT_JSON") {
      items = parseAidbItems(body);
      fingerprint = sha256(JSON.stringify(items));
    } else if (source.intakeMode === "RSS_ATOM") {
      items = parseFeedItems(body);
      fingerprint = sha256(JSON.stringify(items));
    } else if (source.intakeMode === "OPENAI_CHANGELOG_MARKDOWN") {
      items = parseOpenAiChangelogItems(body, response.url || url);
      fingerprint = sha256(JSON.stringify(items));
    } else if (source.intakeMode === "AP_TOPIC_HUB_HTML") {
      items = parseApHubItems(body);
      fingerprint = sha256(JSON.stringify(items));
    } else if (source.intakeMode === "HEALTH_ONLY_HTML") {
      const snapshot = parseHtmlSnapshot(body, response.url || url);
      title = snapshot.title;
      fingerprint = snapshot.fingerprint;
    } else {
      throw new Error(`unsupported intakeMode ${source.intakeMode || "MISSING"}`);
    }
    return {
      sourceId: source.id,
      checkedAt: now,
      health: "HEALTHY",
      resolvedUrl: safeHttps(response.url || url) || url,
      title,
      fingerprint,
      items,
      error: null
    };
  } catch (error) {
    return {
      sourceId: source.id,
      checkedAt: now,
      health: "UNAVAILABLE",
      resolvedUrl: safeHttps(url),
      title: cleanText(source.name),
      fingerprint: null,
      items: [],
      error: cleanText(error?.message || error, 180)
    };
  }
}

export async function buildIntake({ registry, previousState = null, now, fetchImpl = fetch, backfillSince = null }) {
  const generatedAt = new Date(now).toISOString();
  const normalizedBackfillSince = normalizeBackfillSince(backfillSince, generatedAt);
  const due = selectDueSources(
    registry,
    previousState,
    generatedAt,
    normalizedBackfillSince ? BACKFILL_SOURCE_IDS : new Set()
  );
  const results = await Promise.all(due.map((source) => fetchOne(source, fetchImpl, generatedAt)));
  const sourceById = new Map(registry.sources.map((source) => [source.id, source]));
  const newSignals = [];
  const nextSources = { ...(previousState?.sources || {}) };

  for (const result of results) {
    const source = sourceById.get(result.sourceId);
    const prior = previousState?.sources?.[result.sourceId] || null;
    if (result.health === "HEALTHY") {
      const priorIds = new Set(prior?.itemIds || []);
      const emittedSignalIds = new Set(prior?.emittedSignalIds || []);
      const sourceBackfillSince = normalizedBackfillSince && BACKFILL_SOURCE_IDS.has(result.sourceId)
        ? normalizedBackfillSince
        : null;
      const cutoff = sourceBackfillSince
        ? Date.parse(normalizedBackfillSince)
        : Date.parse(generatedAt) - (prior ? SIGNAL_LOOKBACK_MS : FIRST_RUN_LOOKBACK_MS);
      const sourceSignals = [];
      for (const item of result.items) {
        const publishedMs = item.publishedAt ? Date.parse(item.publishedAt) : NaN;
        const signalId = `NSCI-${sha256(`${result.sourceId}|${item.id}`).slice(0, 20)}`;
        const seenByLegacyStateOnly = !sourceBackfillSince && !prior?.emittedSignalIds && priorIds.has(item.id);
        if (emittedSignalIds.has(signalId) || seenByLegacyStateOnly || !Number.isFinite(publishedMs) || publishedMs < cutoff) continue;
        const signal = {
          signalId,
          sourceId: result.sourceId,
          sourceName: source.name,
          title: item.title,
          url: item.url,
          publishedAt: item.publishedAt,
          observedAt: generatedAt,
          sourceAuthorityTier: source.authorityTier,
          destinations: source.destinations,
          disposition: "UNRECONCILED_PRIVATE_SIGNAL",
          evidenceBoundary: "Discovery lead only. Publication requires an independent LAiDIES read, primary evidence, AIDB comparison or dated absence, producer contract and applicable approval."
        };
        newSignals.push(signal);
        sourceSignals.push(signal);
        emittedSignalIds.add(signalId);
      }
      nextSources[result.sourceId] = {
        checkedAt: generatedAt,
        health: result.health,
        monitoredUrl: result.resolvedUrl,
        fingerprint: result.fingerprint,
        itemIds: result.items.slice(0, 100).map((item) => item.id),
        emittedSignalIds: [...emittedSignalIds].slice(-300),
        emittedThisRun: sourceSignals.length
      };
    } else {
      nextSources[result.sourceId] = {
        ...(prior || {}),
        checkedAt: generatedAt,
        health: result.health,
        lastError: result.error
      };
    }
  }

  const unavailableSources = results.filter((result) => result.health !== "HEALTHY").map((result) => ({
    sourceId: result.sourceId,
    url: result.resolvedUrl,
    checkedAt: result.checkedAt,
    error: result.error
  }));
  const sourceHealthAlerts = unavailableSources.filter((failure) => {
    const prior = previousState?.sources?.[failure.sourceId];
    return prior?.health !== "UNAVAILABLE" || prior?.lastError !== failure.error;
  });
  const receipt = {
    schemaVersion: "newsstand-cloud-intake-v1",
    mode: MODE,
    generatedAt,
    backfillSince: normalizedBackfillSince,
    sourceRegistry: {
      path: "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json",
      sha256: sha256(JSON.stringify(registry))
    },
    counts: {
      due: due.length,
      healthy: results.length - unavailableSources.length,
      unavailable: unavailableSources.length,
      sourceHealthAlerts: sourceHealthAlerts.length,
      newSignals: newSignals.length
    },
    newSignals,
    unavailableSources,
    sourceHealthAlerts,
    publicationActionTaken: false,
    canonicalWrite: false,
    deploymentActionTaken: false
  };
  const state = { schemaVersion: "newsstand-cloud-intake-state-v2", updatedAt: generatedAt, sources: nextSources };
  return { receipt, state };
}

export function validateIntakeReceipt(receipt) {
  const errors = [];
  if (receipt?.schemaVersion !== "newsstand-cloud-intake-v1") errors.push("schemaVersion");
  if (receipt?.mode !== MODE) errors.push("mode");
  if (!(receipt?.backfillSince === null || /^\d{4}-\d{2}-\d{2}T00:00:00\.000Z$/.test(receipt?.backfillSince || ""))) errors.push("backfillSince");
  for (const field of ["publicationActionTaken", "canonicalWrite", "deploymentActionTaken"]) {
    if (receipt?.[field] !== false) errors.push(`${field} must be false`);
  }
  if (!Array.isArray(receipt?.newSignals) || !Array.isArray(receipt?.unavailableSources) || !Array.isArray(receipt?.sourceHealthAlerts)) errors.push("arrays");
  for (const signal of receipt?.newSignals || []) {
    if (!/^NSCI-[a-f0-9]{20}$/.test(signal.signalId || "")) errors.push("signalId");
    if (signal.disposition !== "UNRECONCILED_PRIVATE_SIGNAL") errors.push("signal disposition");
    if (!safeHttps(signal.url)) errors.push("signal URL");
    for (const forbidden of ["rawBody", "transcript", "articleText", "prompt", "draft"]) {
      if (Object.hasOwn(signal, forbidden)) errors.push(`forbidden signal field ${forbidden}`);
    }
  }
  if (receipt?.counts?.newSignals !== (receipt?.newSignals || []).length) errors.push("signal count");
  if (receipt?.counts?.unavailable !== (receipt?.unavailableSources || []).length) errors.push("unavailable count");
  if (receipt?.counts?.sourceHealthAlerts !== (receipt?.sourceHealthAlerts || []).length) errors.push("source health alert count");
  return { ok: errors.length === 0, errors };
}

function arg(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const registryPath = path.resolve(root, arg("--registry", "operations/product-stewards/learning-content-ecosystem/SOURCE-REGISTRY.json"));
  const rosterPath = path.resolve(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json");
  const previousPath = arg("--previous");
  const backfillSince = arg("--backfill-since");
  const outputPath = path.resolve(root, arg("--output", ".newsstand-cloud-intake/receipt.json"));
  const stateOutputPath = path.resolve(root, arg("--state-output", ".newsstand-cloud-intake/state.json"));
  const now = arg("--now", new Date().toISOString());
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const roster = JSON.parse(fs.readFileSync(rosterPath, "utf8"));
  const registryCheck = validateSourceRegistry(registry, roster);
  if (!registryCheck.ok) throw new Error(`source registry invalid: ${registryCheck.errors.join(" | ")}`);
  const resolvedPrevious = previousPath ? path.resolve(root, previousPath) : null;
  const previousState = resolvedPrevious && fs.existsSync(resolvedPrevious)
    ? JSON.parse(fs.readFileSync(resolvedPrevious, "utf8"))
    : null;
  const { receipt, state } = await buildIntake({ registry, previousState, now, backfillSince });
  const check = validateIntakeReceipt(receipt);
  if (!check.ok) throw new Error(`intake receipt invalid: ${check.errors.join(" | ")}`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(stateOutputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  fs.writeFileSync(stateOutputPath, `${JSON.stringify(state, null, 2)}\n`);
  console.log("NEWSSTAND CLOUD INTAKE PASS");
  console.log(`due=${receipt.counts.due} healthy=${receipt.counts.healthy} unavailable=${receipt.counts.unavailable} source_health_alerts=${receipt.counts.sourceHealthAlerts} new_signals=${receipt.counts.newSignals} backfill_since=${receipt.backfillSince || "none"}`);
  console.log("publication=NONE canonical_write=NONE deployment=NONE");
}
