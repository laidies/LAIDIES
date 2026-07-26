#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.TOWN_HALL_ROOT || process.cwd());
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const html = read("town-hall.html");
const feedback = read("content/site/town-hall-feedback.js");
const station = read("content/site/town-hall-v2.js");
const css = read("content/town-hall-v2.css");
const schemaRelative = "supabase/migrations/20260630000000_baseline_schema.sql";
const schemaPath = fs.existsSync(path.join(root, schemaRelative))
  ? path.join(root, schemaRelative)
  : path.join(process.cwd(), schemaRelative);
const schema = fs.readFileSync(schemaPath, "utf8");
const failures = [];

const requireMatch = (source, pattern, label) => {
  if (!pattern.test(source)) failures.push(`missing ${label}`);
};
const forbid = (source, pattern, label) => {
  if (pattern.test(source)) failures.push(`forbidden ${label}`);
};

requireMatch(html, /not that anyone has read, reviewed, or replied/i, "bounded inbox promise");
requireMatch(html, /still in release preflight and is not open for submissions yet/i, "visible submission release hold");
requireMatch(html, /not an emergency or guaranteed-response channel/i, "safety/response warning");
requireMatch(html, /role="status"[^>]+aria-live="polite"[^>]+aria-atomic="true"/, "accessible status region");
requireMatch(html, /id="th-body"[^>]+minlength="3"[^>]+maxlength="2000"/, "client length contract");
requireMatch(html, /town-hall-feedback\.js/, "external feedback controller");
requireMatch(html, /on this device[\s\S]{0,220}not an account or cross-device record/i, "Town Regular local-state disclosure");
requireMatch(feedback, /SUBMISSION_RELEASED = false/, "explicit production submission hold");
requireMatch(feedback, /\^\(localhost\|127\\\.0\\\.0\\\.1\)\$/, "localhost-only preflight origin gate");
requireMatch(feedback, /__LAIDIES_TOWN_HALL_PREFLIGHT__ === PREFLIGHT_FIXTURE_ID/, "exact preflight fixture gate");
requireMatch(feedback, /injected\.fixtureId === PREFLIGHT_FIXTURE_ID/, "preflight adapter fixture identity");
requireMatch(feedback, /from\("town_hall_feedback"\)\.insert\(payload\)/, "insert without returning-row dependency");
requireMatch(feedback, /payload\.user_id = session\.user\.id/, "verified-session user ID");
requireMatch(feedback, /ALLOWED_TYPES\.includes\(checkedType\.value\)/, "controller type allowlist");
requireMatch(feedback, /subject\.length > 100/, "controller subject length guard");
requireMatch(feedback, /status === 0[\s\S]{0,180}failed to fetch\|network\|timeout\|timed out\|abort/i, "transport ambiguity classifier");
requireMatch(feedback, /status >= 400 && status < 500/, "definite 4xx rejection classifier");
requireMatch(feedback, /holdUnknownOutcome\(\)/, "unknown-outcome retry suppression");
requireMatch(feedback, /delivery only — not reading, review, or a reply/i, "bounded success receipt");
requireMatch(feedback, /avoid a duplicate/i, "ambiguous-outcome warning");
requireMatch(feedback, /detail: \{ scope: "device-local", outcome: "accepted" \}/, "content-free completion event");
requireMatch(station, /This device records one accepted card/, "honest returning-device cue");
requireMatch(station, /receipt\.version !== 1/, "versioned local receipt validation");
requireMatch(station, /new Date\(acceptedAt\)\.toISOString\(\) === receipt\.acceptedAt/, "canonical timestamp validation");
requireMatch(station, /acceptedAt <= Date\.now\(\) \+ 300000/, "non-future local receipt validation");
requireMatch(css, /radio"\]:focus-visible \+ \[data-th-type-chip\]/, "radio-chip focus indicator");
requireMatch(css, /#6938cc !important/, "selected chip contrast repair");
requireMatch(css, /#th-submit[\s\S]{0,220}color: var\(--th2-ink\) !important/, "submit contrast repair");
requireMatch(css, /prefers-reduced-motion[\s\S]{0,500}transition: none !important[\s\S]{0,120}scroll-behavior: auto !important/, "comprehensive reduced-motion override");
requireMatch(html, /reduced \? 'auto' : 'smooth'/, "reduced-motion runtime scroll");
requireMatch(schema, /user_id is null/, "anonymous insert policy");
requireMatch(schema, /for select using \(auth\.uid\(\) = user_id\)/, "own-read RLS policy");

forbid(feedback, /submitter_email|session\.user\.email/, "feedback email collection");
forbid(feedback, /LAIDIES_TOWN_HALL_FEEDBACK_ADAPTER/, "production-global synthetic adapter");
forbid(feedback, /__testOnly/, "self-asserted synthetic adapter label");
forbid(feedback, /\.insert\(payload\)\s*\.select|\.select\(\)\.single\(\)/, "post-insert select");
forbid(feedback, /console\.(?:log|error|warn)/, "feedback/service console logging");
forbid(html, /actually gets read|The intern will read it|Deb has been informed/i, "unproved reading/notification claim");
forbid(station, /Deb reads them|on the pile/i, "unproved station-state claim");

if (failures.length) {
  console.error("TOWN HALL CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("TOWN HALL CONTRACT PASS");
console.log("checks=35");
