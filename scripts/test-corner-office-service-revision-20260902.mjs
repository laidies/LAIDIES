#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { requiredUsefulDeskErrors } from "./newsstand-required-service-desks.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const envelopePath = path.join(root, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private/2026-09-02-corner-office-service-revision.json");
const decisionPath = path.join(root, "operations/product-stewards/newsstand/evidence/corner-office-20260902/service-revision-admission.json");
const envelopeRaw = fs.readFileSync(envelopePath, "utf8");
const envelope = JSON.parse(envelopeRaw);
const decision = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
const store = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-daily-issues.json"), "utf8"));
const issue = store.issues.find(item => item.editionDate === "2026-09-02");
const columns = JSON.parse(fs.readFileSync(path.join(root, "content/daily-edition-columns.json"), "utf8"));
const storiesRaw = fs.readFileSync(path.join(root, "content/newsstand-stories.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(storiesRaw, context, { timeout: 1000 });

assert.equal(decision.decision, "ACCEPT_LOCAL_CANONICAL_SUCCESSOR");
assert.equal(decision.envelopeSha256, sha256(envelopeRaw));
assert.equal(issue.envelopeSha256, decision.envelopeSha256);
assert.deepEqual(issue.storyIds, envelope.storyIds);
assert.deepEqual(issue.stories, envelope.storySnapshots);
assert.equal(issue.frontPaigeStoryId, envelope.frontPaigeStoryId);
assert.equal(issue.weeklyStoryId, envelope.weeklyStoryId);
assert.deepEqual(issue.desks, envelope.desks);
assert.deepEqual(requiredUsefulDeskErrors(issue.desks, issue.editionDate), []);

const requiredTypes = ["dear_miss_jeeves", "career_life", "paige_tip", "concept_week"];
assert.deepEqual(requiredTypes.map(type => issue.desks.find(desk => desk.type === type)?.state), ["ready", "ready", "ready", "ready"]);
const career = issue.desks.find(desk => desk.type === "career_life");
assert.equal(career.recordId, "DAILY-2026-09-02-CAREER-LIFE-CORNER-02-PRIORITIES");
assert.equal(career.headline, "What should move when another “urgent” job arrives?");
const column = columns.records.find(record => record.id === career.recordId);
assert.equal(column.status, "APPROVED");
assert.match(column.body.join("\n"), /Which should come first/);
assert.doesNotMatch(JSON.stringify({ issue, column }), /Delegate the outcome, not every keystroke/);
assert(context.window.NEWSSTAND_DATA.publications.daily.issue.serviceRecordIds.includes(career.recordId));
const archive = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-archive-index.json"), "utf8"));
assert(archive.items.some(item => item.id === `service:${career.recordId}`));

const missingCareer = issue.desks.map(desk => desk.type === "career_life" ? { type: "career_life", state: "empty", recordId: null, emptyState: "missing" } : desk);
assert(requiredUsefulDeskErrors(missingCareer, issue.editionDate).some(error => /career_life/.test(error)));
console.log("CORNER OFFICE SERVICE REVISION PASS four permanent cards, exact approved Corner Office copy, protected story and feature state unchanged");
