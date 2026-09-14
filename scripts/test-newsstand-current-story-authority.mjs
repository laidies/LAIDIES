#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { CURRENT_PUBLISHER_TYPES, inspectCurrentStoryAuthority } from "./lib/newsstand-current-story-authority.mjs";
import { loadOrdinaryStoryCandidate } from "./validate-newsstand-ordinary-story-candidate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(CURRENT_PUBLISHER_TYPES.has("primary-product-documentation"), true);
assert.equal(CURRENT_PUBLISHER_TYPES.has("primary-product-changelog"), true);
assert.equal(CURRENT_PUBLISHER_TYPES.has("primary-peer-reviewed-open-access-paper"), true, "open peer-reviewed research is a specific primary source role");
assert.equal(CURRENT_PUBLISHER_TYPES.has("official-funder-release"), true, "an official research funder release is a distinct official source role");
assert.equal(CURRENT_PUBLISHER_TYPES.has("independent-science-reporting"), true, "independent science reporting is distinct from primary and official sources");
assert.equal(CURRENT_PUBLISHER_TYPES.has("unknown-unreviewed-publisher"), false, "taxonomy remains closed");
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "content/newsstand-stories.js"), "utf8"), context);
const issues = JSON.parse(fs.readFileSync(path.join(root, "content/newsstand-daily-issues.json"), "utf8"));
const currentIds = ["trump-ai-guardrails-response-20260914", "brain-implant-speech-gestures-20260914", "protein-data-20260914"];
const currentStories = currentIds.map(id => context.window.NEWSSTAND_DATA.stories.find(story => story.id === id));
for (const story of currentStories) {
  const valid = inspectCurrentStoryAuthority(story, { root, issues });
  assert.deepEqual(valid.errors, [], `${story.id} must resolve through its exact admitted predecessor chain`);
  assert.equal(valid.issueDate, "2026-09-14");
}
const priorTrump = context.window.NEWSSTAND_DATA.stories.find(story => story.id === "trump-ai-safeguards-20260913");
assert.deepEqual(inspectCurrentStoryAuthority(priorTrump, { root, issues }).errors.filter(error => error.includes("admitted issue snapshot")), [],
  "an admitted reciprocal successor link may be derived after the prior story snapshot");
const forgedSuccessor = structuredClone(priorTrump);
forgedSuccessor.successorStoryIds.push("made-up-successor");
assert.match(inspectCurrentStoryAuthority(forgedSuccessor, { root, issues }).errors.join("\n"), /admitted issue snapshot/,
  "an arbitrary successor link must not be accepted as a derived canonical field");
const older = context.window.NEWSSTAND_DATA.stories.find(s => s.id === "trump-ai-safeguards-20260913");
assert.deepEqual(inspectCurrentStoryAuthority(older, {root, issues}).errors, [], "exact admitted reciprocal follow-up must preserve older authority");
const fakeOlder = structuredClone(older); fakeOlder.successorStoryIds.push("fake-successor");
assert.ok(inspectCurrentStoryAuthority(fakeOlder,{root,issues}).errors.length, "arbitrary successor must fail");
const fakeIssues = structuredClone(issues);
const fake = structuredClone(currentStories[0]);fake.id="fake-successor";fake.predecessorStoryIds=[older.id];
fakeIssues.issues.find(i=>i.editionDate==="2026-09-14").stories.push(fake);
fakeIssues.issues.find(i=>i.editionDate==="2026-09-14").storyIds.push(fake.id);
assert.ok(inspectCurrentStoryAuthority(fakeOlder,{root,issues:fakeIssues}).errors.length, "fabricated accepted reciprocal successor must fail exact replay");
const editedOlder=structuredClone(older);editedOlder.headline+=" changed";
assert.ok(inspectCurrentStoryAuthority(editedOlder,{root,issues}).errors.length,"reciprocal successor must not permit prose change");
const tampered = structuredClone(issues);
tampered.issues.find(issue => issue.editionDate === "2026-09-14").stories.find(story => story.id === "brain-implant-speech-gestures-20260914").headline = "tampered";
assert.match(inspectCurrentStoryAuthority(currentStories[1], { root, issues: tampered }).errors.join("\n"), /admitted issue snapshot/,
  "tampering the issue snapshot must remove current-story authority");
const rejected = structuredClone(issues);
rejected.issues.find(issue => issue.editionDate === "2026-09-14").admission.decision = "REJECT";
assert.match(inspectCurrentStoryAuthority(currentStories[2], { root, issues: rejected }).errors.join("\n"), /accepted admitted issue snapshot/,
  "a rejected current issue must not admit a story");
const missingBinding = structuredClone(issues);
delete missingBinding.issues.find(issue => issue.editionDate === "2026-09-14").sourceIdentity.ordinaryCandidate;
assert.match(inspectCurrentStoryAuthority(currentStories[2], { root, issues: missingBinding }).errors.join("\n"), /exact admission replay failed/,
  "removing the current binding must invalidate exact issue replay");
const forgedStory = structuredClone(currentStories[2]);
forgedStory.sourceApproval = { status: "approved", record: "newsstand:source-approval:forged" };
const forgedIssue = structuredClone(issues);
forgedIssue.issues.find(issue => issue.editionDate === "2026-09-14").stories.find(story => story.id === forgedStory.id).sourceApproval = forgedStory.sourceApproval;
assert.match(inspectCurrentStoryAuthority(forgedStory, { root, issues: forgedIssue }).errors.join("\n"), /exact admission replay failed/,
  "forged public approval must not be accepted by exact issue replay");
const proteinBinding = issues.issues.find(issue => issue.editionDate === "2026-09-14").sourceIdentity.ordinaryCandidate;
assert.throws(() => loadOrdinaryStoryCandidate({ ...proteinBinding, sha256: "0".repeat(64) }, { root, date: "2026-09-14", admittedHistoricalBase: true }), /SHA-256 mismatch/,
  "a tampered candidate binding must not load");
const missingEnvelope = structuredClone(issues);
missingEnvelope.issues.find(issue => issue.editionDate === "2026-09-14").envelopeSha256 = "0".repeat(64);
assert.match(inspectCurrentStoryAuthority(currentStories[0], { root, issues: missingEnvelope }).errors.join("\n"), /exact private envelope/,
  "a missing current envelope must not admit a carried story");
const envelopeDirectory = path.join(root, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const missingBrainEnvelope = fs.readdirSync(envelopeDirectory).filter(file => file.endsWith(".json") && file !== "2026-09-14-brain.json").map(file => {
  const raw = fs.readFileSync(path.join(envelopeDirectory, file), "utf8");
  return { raw, envelope: JSON.parse(raw), sha256: crypto.createHash("sha256").update(raw).digest("hex") };
});
assert.match(inspectCurrentStoryAuthority(currentStories[0], { root, issues, envelopeRecords: missingBrainEnvelope }).errors.join("\n"), /admission predecessor requires one exact private envelope/,
  "a carried story must not be accepted when the intermediate admitted predecessor envelope is absent");
console.log("NEWSSTAND CURRENT STORY AUTHORITY PASS current_chain=3 snapshot_tamper_rejected=1 rejected_decision_rejected=1 candidate_tamper_rejected=1 missing_predecessor_rejected=1 forged_approval_rejected=1 unknown_type_rejected=1");
