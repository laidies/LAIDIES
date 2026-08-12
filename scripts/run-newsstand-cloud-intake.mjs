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

export function selectDueSources(registry, previousState, now) {
  const nowMs = new Date(now).getTime();
  return (registry.sources || []).filter((source) => {
    if (!["ACTIVE_MONITOR", "PILOT_MONITOR"].includes(source.status)) return false;
    const interval = cadenceMs[source.cadence];
    if (!Number.isFinite(interval)) return false;
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
  const url = source.urls[0];
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
    if (source.id === "SRC-AIDB") {
      items = parseAidbItems(body);
      fingerprint = sha256(JSON.stringify(items));
    } else if (/rss|atom|xml/i.test(response.headers.get("content-type") || "") || /<(rss|feed)\b/i.test(body.slice(0, 1000))) {
      items = parseFeedItems(body);
      fingerprint = sha256(JSON.stringify(items));
    } else {
      const snapshot = parseHtmlSnapshot(body, response.url || url);
      title = snapshot.title;
      fingerprint = snapshot.fingerprint;
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

export async function buildIntake({ registry, previousState = null, now, fetchImpl = fetch }) {
  const generatedAt = new Date(now).toISOString();
  const due = selectDueSources(registry, previousState, generatedAt);
  const results = await Promise.all(due.map((source) => fetchOne(source, fetchImpl, generatedAt)));
  const sourceById = new Map(registry.sources.map((source) => [source.id, source]));
  const newSignals = [];
  const nextSources = { ...(previousState?.sources || {}) };

  for (const result of results) {
    const source = sourceById.get(result.sourceId);
    const prior = previousState?.sources?.[result.sourceId] || null;
    if (result.health === "HEALTHY") {
      const priorIds = new Set(prior?.itemIds || []);
      const cutoff = Date.parse(generatedAt) - (prior ? SIGNAL_LOOKBACK_MS : FIRST_RUN_LOOKBACK_MS);
      for (const item of result.items) {
        const publishedMs = item.publishedAt ? Date.parse(item.publishedAt) : NaN;
        if (priorIds.has(item.id) || !Number.isFinite(publishedMs) || publishedMs < cutoff) continue;
        newSignals.push({
          signalId: `NSCI-${sha256(`${result.sourceId}|${item.id}`).slice(0, 20)}`,
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
        });
      }
      if (prior && result.items.length === 0 && prior.fingerprint && prior.fingerprint !== result.fingerprint) {
        newSignals.push({
          signalId: `NSCI-${sha256(`${result.sourceId}|${result.fingerprint}`).slice(0, 20)}`,
          sourceId: result.sourceId,
          sourceName: source.name,
          title: `${result.title} changed`,
          url: result.resolvedUrl,
          publishedAt: null,
          observedAt: generatedAt,
          sourceAuthorityTier: source.authorityTier,
          destinations: source.destinations,
          disposition: "UNRECONCILED_PRIVATE_SIGNAL",
          evidenceBoundary: "Page-level change only; it does not establish a new announcement or story. Editorial reconciliation must identify the exact changed claim or record NO_BUILD."
        });
      }
      nextSources[result.sourceId] = {
        checkedAt: generatedAt,
        health: result.health,
        fingerprint: result.fingerprint,
        itemIds: result.items.slice(0, 100).map((item) => item.id)
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
  const state = { schemaVersion: "newsstand-cloud-intake-state-v1", updatedAt: generatedAt, sources: nextSources };
  return { receipt, state };
}

export function validateIntakeReceipt(receipt) {
  const errors = [];
  if (receipt?.schemaVersion !== "newsstand-cloud-intake-v1") errors.push("schemaVersion");
  if (receipt?.mode !== MODE) errors.push("mode");
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
  const { receipt, state } = await buildIntake({ registry, previousState, now });
  const check = validateIntakeReceipt(receipt);
  if (!check.ok) throw new Error(`intake receipt invalid: ${check.errors.join(" | ")}`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(stateOutputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
  fs.writeFileSync(stateOutputPath, `${JSON.stringify(state, null, 2)}\n`);
  console.log("NEWSSTAND CLOUD INTAKE PASS");
  console.log(`due=${receipt.counts.due} healthy=${receipt.counts.healthy} unavailable=${receipt.counts.unavailable} source_health_alerts=${receipt.counts.sourceHealthAlerts} new_signals=${receipt.counts.newSignals}`);
  console.log("publication=NONE canonical_write=NONE deployment=NONE");
}
