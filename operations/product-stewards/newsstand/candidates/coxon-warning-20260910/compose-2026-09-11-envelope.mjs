#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";
import { composeDailyEnvelope } from "../../../../../scripts/compose-daily-edition.mjs";

const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/coxon-warning-20260910";
const radarPath = `${root}/operations/product-stewards/newsstand/editorial-intake/2026-09-11.md`;
const candidatePath = `${dir}/independent-review/final-v2/ordinary-candidate-2026-09-11.json`;
const predecessorPath = "operations/product-stewards/newsstand/evidence/service-predecessor-20260911-coxon.json";
const output = `${dir}/issue-envelope-2026-09-11-v1.json`;
const raw = target => fs.readFileSync(target, "utf8");
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const binding = target => ({ path: target, sha256: sha256(fs.readFileSync(target)) });

const storiesRaw = raw(`${dir}/publication-base.js`);
if (storiesRaw !== raw("content/newsstand-stories.js")) {
  throw Error("Coxon publication base differs from current canonical source");
}

const result = composeDailyEnvelope({
  date: "2026-09-11",
  radarRaw: raw(radarPath),
  radarPath,
  storiesRaw,
  columnsRaw: raw("content/daily-edition-columns.json"),
  candidateBinding: binding(candidatePath),
  servicePredecessor: binding(predecessorPath),
  enforceServicePredecessor: true,
  root,
  now: new Date().toISOString()
});

if (fs.existsSync(output) && raw(output) !== result.canonical) {
  throw Error("Preserve differing envelope; use a successor filename");
}
if (!fs.existsSync(output)) fs.writeFileSync(output, result.canonical, { flag: "wx" });

console.log(JSON.stringify({
  status: "PRIVATE_SEPTEMBER_11_ENVELOPE_READY",
  path: output,
  sha256: result.sha256,
  storyIds: result.envelope.storyIds,
  readyDesks: result.envelope.desks.filter(desk => desk.state === "ready").length,
  carriedOriginalDates: result.envelope.desks.filter(desk => desk.state === "ready").map(desk => desk.carriedFrom?.originalEditionDate || null),
  frontPaigeStoryId: result.envelope.frontPaigeStoryId,
  weeklyStoryId: result.envelope.weeklyStoryId,
  canonicalWrite: result.envelope.canonicalWrite,
  deployActionTaken: result.envelope.deployActionTaken
}));
