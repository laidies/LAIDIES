import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { inspectNewsstandReviewCandidate } from "./check-newsstand-review-candidate-v27.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const daily = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-review-candidate-2026-08-14.json"), "utf8"));
const features = JSON.parse(fs.readFileSync(path.join(ROOT, "content/newsstand-review-feature-candidates-2026-08-14.json"), "utf8"));
const html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "content/newsstand.css"), "utf8");
const js = fs.readFileSync(path.join(ROOT, "content/site/newsstand-catchup-v1.js"), "utf8");
const readBoundJson = (binding) => {
  if (!binding?.path || !binding?.sha256) return null;
  const absolute = path.join(ROOT, binding.path);
  if (!fs.existsSync(absolute)) return null;
  const actual = crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
  return actual === binding.sha256 ? JSON.parse(fs.readFileSync(absolute, "utf8")) : null;
};
const inspect = (overrides = {}) => inspectNewsstandReviewCandidate({ daily, features, html, css, js, fileExists: () => true, readBoundJson, ...overrides });

assert.equal(inspect().ok, true, inspect().errors.join("\n"));

const oneStory = structuredClone(daily);
oneStory.stories = oneStory.stories.slice(0, 1);
assert.equal(inspect({ daily: oneStory }).ok, false, "calibration: a one-story Daily must fail");

const filler = structuredClone(daily);
filler.desks.find((desk) => desk.type === "song").state = "ready";
assert.equal(inspect({ daily: filler }).ok, false, "calibration: unauthorised filler must fail");

const driftedDesk = structuredClone(daily);
driftedDesk.desks.find((desk) => desk.type === "paige_tip").summary += " Silent drift.";
assert.equal(inspect({ daily: driftedDesk }).ok, false, "calibration: rendered service prose drift must fail");

const falselyPublished = structuredClone(features);
falselyPublished.weekly.status = "published";
assert.equal(inspect({ features: falselyPublished }).ok, false, "calibration: a private source record claiming published must fail");

assert.equal(inspect({ css: `${css}\n.bad { background:#fff4d2; }` }).ok, false, "calibration: rejected beige must fail");
assert.equal(inspect({ html: html.replace('class="newsstand-daily-first"', 'class=""') }).ok, false, "calibration: a chooser-first page must fail");

console.log("NEWSSTAND REVIEW CANDIDATE V27 CALIBRATION PASS rejected=one_story,filler,service_drift,false_publication,beige,chooser_first");
