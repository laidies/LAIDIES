#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  NEWSSTAND_EVENTS,
  browserPrivacySignals,
  createNewsStandMeasurementAdapter,
  shouldCollect
} from "../content/site/newsstand-measurement-v1.mjs";

const sent = [];
const adapter = createNewsStandMeasurementAdapter({ enabled: true, transport: async payload => { sent.push(payload); return { ok: true }; } });
const transition = "ns-render-1";
assert.deepEqual(await adapter.record({ kind: "paper_available", transition }), { status: "transport_completed" });
assert.deepEqual(sent[0], { name: "NewsStand paper available", url: "https://laidies.ai/newsstand", domain: "wearelaidies.com" });
assert.deepEqual(Object.keys(sent[0]).sort(), ["domain", "name", "url"]);
assert.deepEqual(await adapter.record({ kind: "paper_available", transition }), { status: "deduped" });
assert.deepEqual(await adapter.record({ kind: "source_opened" }), { status: "transport_completed" });
assert.equal(sent[1].name, "NewsStand source opened");

for (const kind of Object.keys(NEWSSTAND_EVENTS)) {
  const one = createNewsStandMeasurementAdapter({ enabled: true, transport: async payload => { sent.push(payload); return { ok: true }; } });
  const event = { kind };
  if (["paper_available", "paper_unavailable", "story_opened", "correction_viewed", "retraction_viewed"].includes(kind)) event.transition = "ns-render-" + (sent.length + 10);
  assert.deepEqual(await one.record(event), { status: "transport_completed" });
}

const privacy = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => assert.fail("privacy must suppress transport"), privacy: { globalPrivacyControl: true } });
assert.deepEqual(await privacy.record({ kind: "search_results" }), { status: "suppressed_privacy" });
const dnt = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => assert.fail("DNT must suppress transport"), privacy: { doNotTrack: true } });
assert.deepEqual(await dnt.record({ kind: "search_empty" }), { status: "suppressed_privacy" });
assert.deepEqual(browserPrivacySignals({ globalPrivacyControl: true, doNotTrack: "1" }), { globalPrivacyControl: true, doNotTrack: true });
assert.deepEqual(browserPrivacySignals({ doNotTrack: "yes" }), { globalPrivacyControl: false, doNotTrack: true });
assert.equal(shouldCollect({ protocol: "https:", hostname: "laidies.ai" }), true);
assert.equal(shouldCollect({ protocol: "http:", hostname: "localhost" }), false);
assert.equal(shouldCollect({ protocol: "https:", hostname: "preview.example" }), false);

const failing = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => { throw new Error("blocked"); } });
assert.deepEqual(await failing.record({ kind: "learning_opened" }), { status: "provider_error" });
const rejected = createNewsStandMeasurementAdapter({ enabled: true, transport: async () => ({ ok: false }) });
assert.deepEqual(await rejected.record({ kind: "learning_opened" }), { status: "provider_error" });
assert.deepEqual(await failing.record({ kind: "learning_opened" }), { status: "provider_error" });

for (const malicious of [
  { kind: "source_opened", props: { query: "private" } },
  { kind: "source_opened", url: "https://example.test/private" },
  { kind: "source_opened", referrer: "https://example.test/" },
  { kind: "search_results", transition: "ns-render-77" },
  { kind: "story_opened" },
  { kind: "unknown" }
]) {
  await assert.rejects(adapter.record(malicious), /NewsStand measurement rejected/);
}

const restoredSearch = createNewsStandMeasurementAdapter();
assert.deepEqual(await restoredSearch.record({ kind: "search_results" }), { status: "disabled" });

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "newsstand.html"), "utf8");
for (const requiredHook of [
  'measure("paper_unavailable", renderedMeasurementTransition())',
  'measure("paper_available", renderedMeasurementTransition())',
  'measure("story_opened", renderedMeasurementTransition())',
  'measure("source_opened")',
  'measure("learning_opened")',
  'measure("search_unavailable")',
  'measure(matches.length ? "search_results" : "search_empty")',
  'measure("correction_viewed", renderedMeasurementTransition())',
  'measure("retraction_viewed", renderedMeasurementTransition())'
]) assert.ok(page.includes(requiredHook), "missing rendered-outcome hook: " + requiredHook);
assert.match(page, /if \(!viewOptions\.skipHistory && !viewOptions\.skipMeasurement\) measure\("paper_available"/);
assert.match(page, /renderSearch\(searchInput, \{ explicitSearch: true \}\)/);
assert.match(page, /renderSearch\(this, \{ explicitSearch: true \}\)/);
assert.match(page, /\.ns-article__book-links a, \.ns-article__notes a/);
assert.ok(page.includes('if (learning && /^\\/?library\\.html(?:#|$)/'), "only approved Library class-note routes count as learning");
assert.match(page, /renderHash\(true, lastInvoker, \{ skipMeasurement: Boolean\(restored\) \}\)/);
const restoration = page.slice(page.indexOf("function restoreHashlessView"), page.indexOf("function statusCopy"));
assert.doesNotMatch(restoration, /explicitSearch|measure\(/);
console.log("PASS NewsStand measurement: fixed-event payloads, all ten names, privacy, preview suppression, provider failure, duplicate rendered transitions, restoration-disabled wiring, and malicious-property rejection");
