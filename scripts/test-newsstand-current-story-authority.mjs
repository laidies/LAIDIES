#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { CURRENT_PUBLISHER_TYPES, inspectCurrentStoryAuthority } from "./lib/newsstand-current-story-authority.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "content/newsstand-stories.js"), "utf8"), context);
const issues = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-daily-issues.json"), "utf8"));
const pets = context.window.NEWSSTAND_DATA.stories.find(story => story.id === "chatgpt-pets-20260913");
const valid = inspectCurrentStoryAuthority(pets, { root, issues });
assert.deepEqual(valid.errors, [], "Pets must retain its bound candidate and admitted exact snapshot");
assert.equal(valid.issueDate, "2026-09-13");
const tampered = structuredClone(issues);
tampered.issues.find(issue => issue.editionDate === "2026-09-13").stories[0].headline = "tampered";
assert.match(inspectCurrentStoryAuthority(pets, { root, issues: tampered }).errors.join("\n"), /admitted issue snapshot/,
  "tampering the issue snapshot must remove current-story authority");
const rejected = structuredClone(issues);
rejected.issues.find(issue => issue.editionDate === "2026-09-13").admission.decision = "REJECT";
assert.match(inspectCurrentStoryAuthority(pets, { root, issues: rejected }).errors.join("\n"), /accepted admitted issue snapshot/,
  "a rejected decision must not admit a current story");
const missingBinding = structuredClone(issues);
delete missingBinding.issues.find(issue => issue.editionDate === "2026-09-13").sourceIdentity.ordinaryCandidate;
assert.match(inspectCurrentStoryAuthority(pets, { root, issues: missingBinding }).errors.join("\n"), /no checksum-bound ordinary candidate/,
  "an issue without its candidate binding must fail");
const forgedStory = structuredClone(pets);
forgedStory.sourceApproval = { status: "approved", record: "newsstand:source-approval:forged" };
const forgedIssue = structuredClone(issues);
forgedIssue.issues.find(issue => issue.editionDate === "2026-09-13").stories[0] = forgedStory;
assert.match(inspectCurrentStoryAuthority(forgedStory, { root, issues: forgedIssue }).errors.join("\n"), /does not project exactly to public story approval/,
  "forged public approval must not be accepted by candidate projection");
assert.equal(CURRENT_PUBLISHER_TYPES.has("primary-product-documentation"), true);
assert.equal(CURRENT_PUBLISHER_TYPES.has("primary-product-changelog"), true);
assert.equal(CURRENT_PUBLISHER_TYPES.has("unknown-unreviewed-publisher"), false, "taxonomy remains closed");
console.log("NEWSSTAND CURRENT STORY AUTHORITY PASS candidate_projection=1 exact_issue_snapshot=1 snapshot_tamper_rejected=1 rejected_decision_rejected=1 missing_binding_rejected=1 forged_approval_rejected=1 unknown_type_rejected=1");
