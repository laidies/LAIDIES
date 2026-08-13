#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectCompleteDailyReview } from "./check-newsstand-complete-daily-review.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TEMP = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-daily-v2-"));
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const write = (relative, value) => {
  const absolute = path.join(TEMP, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  const raw = typeof value === "string" ? value : `${JSON.stringify(value)}\n`;
  fs.writeFileSync(absolute, raw);
  return { path: relative, sha256: sha256(raw) };
};
const reason = "This candidate has enough consequence, current evidence and reader value to earn scarce Daily space.";
const substance = "The complete useful column appears directly in the newspaper. It names the situation, explains why the advice works, gives one concrete action and preserves the important limitation without requiring a reader to open another card.";

try {
  const template = write("evidence/template.json", { accepted: true });
  const proof = write("evidence/proof.json", { status: "PASS" });
  const selfReview = write("evidence/self.json", { verdict: "PASS" });
  const compositionReview = write("evidence/composition.json", { verdict: "PASS" });
  const serviceReview = write("evidence/services.json", { verdict: "PASS" });
  const visualReview = write("evidence/visual.json", { verdict: "PASS" });

  const makeStory = id => {
    const prose = write(`prose/${id}.md`, `# ${id}\n\nExact reviewed prose.\n`);
    const record = { id, slug: id, status: "hold", publishedAt: null };
    const candidate = write(`stories/${id}.json`, { candidateStatus: "HELD_NOT_PUBLISHED", sourceText: prose, story: record });
    const independentReview = write(`evidence/${id}-independent.json`, { verdict: "PASS", artifact: { reviewText: prose } });
    return { ...candidate, record, templateAcceptance: template, independentReview };
  };
  const stories = [makeStory("lead-story"), makeStory("secondary-story")];

  const serviceFiles = {
    paige_tip: write("services/paige.json", { lane: "paige_tip" }),
    career_life: write("services/career.json", { lane: "career_life" })
  };
  const empty = type => ({ type, state: "EMPTY", emptyState: "No admitted item is filed in this desk today." });
  const services = [
    { type: "paige_tip", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance, continuationDestination: null, continuationPurpose: null },
    { type: "career_life", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance, continuationDestination: "/newsstand.html#career", continuationPurpose: "The destination contains the worked example and evidence notes that genuinely extend this compact column." },
    empty("promptoscope"), empty("mme_claio"), empty("song"), empty("did_you_know"), empty("town_note"), empty("curiosity"), empty("fiction")
  ];
  const compositionValue = {
    schemaVersion: "laidies-newsstand-complete-daily-composition.v1",
    editionDate: "2026-08-13",
    coverageWindow: { start: "2026-08-12", end: "2026-08-13" },
    issueOutcome: { state: "MULTI_STORY", reason: null },
    breaking: { state: "CLEAR", reason: "No verified development would materially disadvantage readers by waiting for this Daily." },
    news: [
      { storyId: "lead-story", role: "LEAD", rank: 1, mode: "REPORT_OR_ANNOUNCEMENT", displayMode: "LEAD_FULL_OR_MEANINGFUL_CONTINUATION", qualification: { status: "QUALIFIED", noFiller: true, consequence: reason, readerPayoff: reason, whyNow: reason, rankingReason: reason } },
      { storyId: "secondary-story", role: "SECONDARY", rank: 2, mode: "UPDATE_TO_PRIOR_COVERAGE", displayMode: "SELF_SUFFICIENT_SUMMARY", qualification: { status: "QUALIFIED", noFiller: true, consequence: reason, readerPayoff: reason, whyNow: reason, rankingReason: reason } }
    ],
    candidateDispositions: [
      { candidateId: "candidate-lead", storyId: "lead-story", disposition: "QUALIFIED", reason },
      { candidateId: "candidate-secondary", storyId: "secondary-story", disposition: "QUALIFIED", reason }
    ],
    services,
    discovery: { defaultPaper: "DAILY", alternatePapers: ["WEEKLY", "BIG_PICTURE"], breakingPlacement: "TOP_ONLY_WHEN_QUALIFIED", archiveAndTopics: "VISIBLE_SECONDARY" }
  };
  const composition = write("composition.json", compositionValue);
  const screenshots = [];
  for (const mode of ["COMPLETE_PAGE", "DAILY_FRONT", "FULL_ARTICLE"]) {
    for (const viewport of [1440, 390, 320]) screenshots.push({ ...write(`screens/${mode}-${viewport}.png`, `${mode}-${viewport}`), mode, viewport });
  }
  const desks = services.map(item => item.state === "READY" ? {
    type: item.type,
    state: "ready",
    recordId: `record-${item.type}`,
    headline: `Headline ${item.type}`,
    summary: item.usefulSubstance,
    displayMode: item.displayMode,
    destination: item.continuationDestination,
    sourceCandidate: serviceFiles[item.type]
  } : { type: item.type, state: "empty", recordId: null, emptyState: item.emptyState });
  const packageValue = {
    schemaVersion: "laidies-newsstand-complete-daily-review-package.v2",
    editionDate: "2026-08-13",
    editorialTimeZone: "America/Vancouver",
    status: "PRIVATE_COMPLETE_DAILY_REVIEW_CANDIDATE",
    defaultExperience: "THE_DAILY",
    publicEligibility: "INELIGIBLE_PENDING_ALI_APPROVAL",
    composition,
    stories,
    desks,
    evidence: {
      compositionReview,
      serviceReview,
      visualReview,
      storyReviews: stories.map(story => ({ storyId: story.record.id, producerProof: proof, producerSelfReview: selfReview, independentReview: story.independentReview })),
      screenshots
    },
    remainingGates: [
      "ALI_EXACT_PACKAGE_APPROVAL",
      "INDEPENDENT_RELEASE_ADMISSION",
      "DEPLOYMENT_AND_EXACT_PUBLIC_VERIFICATION"
    ],
    releaseAuthority: { canonicalWrite: false, deploy: false, public: false }
  };

  const semanticInspector = () => ({ errors: [], verdict: "PASS" });
  assert.deepEqual(inspectCompleteDailyReview(packageValue, { root: TEMP, rejections: [], semanticInspector }).errors, []);
  const rejectedV26 = JSON.parse(fs.readFileSync(path.join(ROOT, "operations/product-stewards/newsstand/candidates/complete-daily-review-package-2026-08-12-v5.json"), "utf8"));
  const rejectedErrors = inspectCompleteDailyReview(rejectedV26).errors.join("\n");
  assert.match(rejectedErrors, /explicitly rejected/);
  assert.match(rejectedErrors, /one-story v1 packages are retired/);

  const cases = [
    { mutate: value => { value.schemaVersion = "laidies-newsstand-complete-daily-review-package.v1"; }, expected: /retired/ },
    { mutate: value => { value.composition = null; }, expected: /composition lacks/ },
    { mutate: value => { value.stories = value.stories.slice(0, 1); value.evidence.storyReviews = value.evidence.storyReviews.slice(0, 1); }, expected: /differ from the exact composition|lacks the ranked lead/ },
    { mutate: value => { value.stories[1] = structuredClone(value.stories[0]); value.evidence.storyReviews[1] = structuredClone(value.evidence.storyReviews[0]); }, expected: /differs from ranked composition|duplicate/ },
    { mutate: value => { value.evidence.storyReviews.pop(); }, expected: /per-story review/ },
    { mutate: value => { value.desks[0].displayMode = "OPEN_CARD_TO_READ"; }, expected: /hides or lacks|differs from its inline/ },
    { mutate: value => { value.evidence.screenshots.pop(); }, expected: /exactly nine/ },
    { mutate: value => { value.releaseAuthority.deploy = true; }, expected: /unauthorized/ }
  ];
  for (const [index, item] of cases.entries()) {
    const candidate = structuredClone(packageValue);
    item.mutate(candidate);
    assert.match(inspectCompleteDailyReview(candidate, { root: TEMP, rejections: [], semanticInspector }).errors.join("\n"), item.expected, `bad case ${index + 1} must fail for its intended reason`);
  }
  const semanticFailure = inspectCompleteDailyReview(packageValue, { root: TEMP, rejections: [], semanticInspector: () => ({ errors: ["observed human evidence missing"] }) }).errors.join("\n");
  assert.match(semanticFailure, /observed human evidence missing/, "package must reject prose that lacks complete independent semantic admission");
  console.log(`NEWSSTAND COMPLETE DAILY REVIEW CALIBRATION PASS v2_multistory=1 exact_v26_rejected=1 mutations=${cases.length + 1} observed_human_semantic_gate=1`);
} finally {
  fs.rmSync(TEMP, { recursive: true, force: true });
}
