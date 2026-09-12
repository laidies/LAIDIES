#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";
import { composeDailyEnvelope } from "../../../../../scripts/compose-daily-edition.mjs";

const root = process.cwd();
const dir = "operations/product-stewards/newsstand/candidates/senate-hugging-face-inquiry-20260910";
const radarPath = `${root}/operations/agents/aidb-intelligence-desk/daily/2026-09-10.md`;
const candidatePath = `${dir}/independent-review/final-v1/ordinary-candidate.json`;
const output = `${dir}/same-day-envelope-2026-09-10-post-data-v1.json`;
const raw = target => fs.readFileSync(target, "utf8");
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const binding = target => ({ path: target, sha256: sha256(fs.readFileSync(target)) });

const result = composeDailyEnvelope({
  date: "2026-09-10",
  radarRaw: raw(radarPath),
  radarPath,
  storiesRaw: raw("content/newsstand-stories.js"),
  columnsRaw: raw("content/daily-edition-columns.json"),
  candidateBinding: binding(candidatePath),
  enforceServicePredecessor: true,
  root,
  now: new Date().toISOString()
});

if (fs.existsSync(output) && raw(output) !== result.canonical) {
  throw Error("Preserve differing envelope; use a successor filename");
}
if (!fs.existsSync(output)) fs.writeFileSync(output, result.canonical, { flag: "wx" });

console.log(JSON.stringify({
  status: "PRIVATE_SUCCESSOR_ENVELOPE_READY",
  path: output,
  sha256: result.sha256,
  storyIds: result.envelope.storyIds,
  readyDesks: result.envelope.desks.filter(desk => desk.state === "ready").length,
  canonicalWrite: result.envelope.canonicalWrite,
  deployActionTaken: result.envelope.deployActionTaken
}));
