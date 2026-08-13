#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { composeCompleteDailyReviewPackage } from "./compose-newsstand-complete-daily-review.mjs";

const TEMP = fs.mkdtempSync(path.join(os.tmpdir(), "laidies-compose-daily-v2-"));
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");
const write = (relative, value) => {
  const absolute = path.join(TEMP, relative);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  const raw = Buffer.from(typeof value === "string" ? value : `${JSON.stringify(value)}\n`);
  fs.writeFileSync(absolute, raw);
  return { path: relative, sha256: sha256(raw) };
};
const reason = "This development has enough consequence, current evidence and reader value to earn scarce Daily space.";
const substance = type => `This ${type} column is fully readable inside the newspaper. It names a specific situation, gives one concrete action, explains why that action works and preserves the important limitation without making the reader open another card.`;

try {
  const template = write("evidence/template.json", { accepted: true });
  const makeStory = id => {
    const prose = write(`prose/${id}.md`, `# ${id}\n\nExact reviewed prose for ${id}.\n`);
    const record = { id, slug: id, status: "hold", publishedAt: null, updatedAt: "2026-08-13T12:00:00Z" };
    const candidate = write(`stories/${id}.json`, { candidateStatus: "HELD_NOT_PUBLISHED", sourceText: prose, story: record });
    const proof = write(`evidence/${id}-proof.json`, { candidateId: id });
    const selfReview = write(`evidence/${id}-self.json`, { verdict: "PASS", artifact: { reviewText: prose } });
    const independentReview = write(`evidence/${id}-independent.json`, { verdict: "PASS", artifact: { reviewText: prose } });
    return { candidate: candidate.path, templateAcceptance: template.path, producerProof: proof.path, producerSelfReview: selfReview.path, independentReview: independentReview.path };
  };
  const stories = [makeStory("lead-story"), makeStory("secondary-story")];
  const empty = type => ({ type, state: "EMPTY", emptyState: "No admitted item is filed in this desk today." });
  const services = [
    { type: "paige_tip", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance("Paige"), continuationDestination: null, continuationPurpose: null },
    { type: "career_life", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance("career"), continuationDestination: "/newsstand.html#career", continuationPurpose: "The destination contains a worked example and source notes that genuinely extend the compact column." },
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
  const serviceInputs = services.filter(item => item.state === "READY").map(item => {
    const candidate = write(`services/${item.type}.json`, {
      schemaVersion: "test-owned-service-record.v1",
      editionDate: compositionValue.editionDate,
      headline: `Headline ${item.type}`,
      body: item.usefulSubstance,
      destination: item.continuationDestination,
      storage: { recordId: `record-${item.type}` }
    });
    return { type: item.type, candidate: candidate.path, binding: candidate };
  });
  const compositionReview = write("evidence/composition-review.json", { verdict: "PASS", composition });
  const serviceReview = write("evidence/service-review.json", {
    verdict: "PASS",
    candidates: serviceInputs.map(item => ({ type: item.type, ...item.binding })),
    outcomes: serviceInputs.map(item => ({ type: item.type, verdict: "PASS", defects: [] }))
  });
  const screenshots = [];
  for (const mode of ["COMPLETE_PAGE", "DAILY_FRONT", "FULL_ARTICLE"]) {
    for (const viewport of [1440, 390, 320]) screenshots.push({ ...write(`screens/${mode}-${viewport}.png`, `${mode}-${viewport}`), mode, viewport });
  }
  const visualReview = write("evidence/visual-review.json", { verdict: "ADMIT_PRIVATE_DIRECTION_REVIEW", screenshots });
  const inputs = {
    schemaVersion: "laidies-newsstand-complete-daily-compose-input.v2",
    composition: composition.path,
    stories,
    services: serviceInputs.map(item => ({ type: item.type, candidate: item.candidate })),
    compositionReview: compositionReview.path,
    serviceReview: serviceReview.path,
    visualReview: visualReview.path,
    screenshots: screenshots.map(({ mode, viewport, path: screenshotPath }) => ({ mode, viewport, path: screenshotPath }))
  };
  const options = { root: TEMP, producerInspector: () => ({ errors: [] }), semanticInspector: () => ({ errors: [], verdict: "PASS" }), packageRejections: [] };
  const result = composeCompleteDailyReviewPackage(inputs, options);
  assert.equal(result.reviewPackage.schemaVersion, "laidies-newsstand-complete-daily-review-package.v2");
  assert.equal(result.reviewPackage.stories.length, 2);
  assert.equal(result.reviewPackage.desks.filter(item => item.state === "ready").length, 2);
  assert.equal(result.reviewPackage.releaseAuthority.public, false);

  assert.throws(() => composeCompleteDailyReviewPackage({ ...inputs, schemaVersion: "laidies-newsstand-complete-daily-compose-input.v1" }, options), /single-story v1 inputs are retired/);
  assert.throws(() => composeCompleteDailyReviewPackage({ ...inputs, stories: inputs.stories.slice(0, 1) }, options), /story bundles do not match/);
  assert.throws(() => composeCompleteDailyReviewPackage(inputs, { ...options, producerInspector: () => ({ errors: ["calibrated producer failure"] }) }), /calibrated producer failure/);
  assert.throws(() => composeCompleteDailyReviewPackage(inputs, { ...options, semanticInspector: () => ({ errors: ["observed human evidence missing"] }) }), /observed human evidence missing/);

  const badService = write("services/paige-bad.json", {
    schemaVersion: "test-owned-service-record.v1",
    editionDate: compositionValue.editionDate,
    headline: "Headline paige_tip",
    body: `${substance("Paige")} Altered after composition.`,
    destination: null,
    storage: { recordId: "record-paige_tip" }
  });
  const badServiceInputs = structuredClone(inputs);
  badServiceInputs.services[0].candidate = badService.path;
  assert.throws(() => composeCompleteDailyReviewPackage(badServiceInputs, options), /differs from the exact inline composition/);

  const staleCompositionReview = write("evidence/composition-review-stale.json", { verdict: "PASS", composition: { path: composition.path, sha256: "0".repeat(64) } });
  assert.throws(() => composeCompleteDailyReviewPackage({ ...inputs, compositionReview: staleCompositionReview.path }, options), /composition review does not bind/);

  const visualReviewMissing = write("evidence/visual-review-missing.json", { verdict: "ADMIT_PRIVATE_DIRECTION_REVIEW", screenshots: screenshots.slice(0, 8) });
  assert.throws(() => composeCompleteDailyReviewPackage({ ...inputs, visualReview: visualReviewMissing.path }, options), /visual review .* does not bind/);

  const oneStoryComposition = structuredClone(compositionValue);
  oneStoryComposition.issueOutcome = { state: "ONE_STORY_HOLD", reason: "Only one development qualified, so the issue is held rather than padded." };
  oneStoryComposition.news = oneStoryComposition.news.slice(0, 1);
  oneStoryComposition.candidateDispositions = oneStoryComposition.candidateDispositions.slice(0, 1);
  const oneStoryFile = write("composition-one-story.json", oneStoryComposition);
  const oneStoryReview = write("evidence/composition-one-story-review.json", { verdict: "PASS", composition: oneStoryFile });
  assert.throws(() => composeCompleteDailyReviewPackage({ ...inputs, composition: oneStoryFile.path, compositionReview: oneStoryReview.path, stories: inputs.stories.slice(0, 1) }, options), /remains held rather than padded/);

  console.log("NEWSSTAND COMPLETE DAILY V2 COMPOSER CALIBRATION PASS assembled=1 mutations=8 observed_human_semantic_gate=1 overwrite_authority=none");
} finally {
  fs.rmSync(TEMP, { recursive: true, force: true });
}
