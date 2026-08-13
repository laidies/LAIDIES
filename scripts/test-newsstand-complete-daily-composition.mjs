#!/usr/bin/env node

import assert from "node:assert/strict";
import { inspectCompleteDailyComposition } from "./check-newsstand-complete-daily-composition.mjs";

const reason = "This candidate has enough consequence, current evidence and reader value to earn scarce Daily space.";
const substance = "The complete useful column appears directly in the newspaper. It names the situation, explains why the advice works, gives one concrete action and preserves the important limitation without requiring a reader to open another card.";
const empty = type => ({ type, state: "EMPTY", emptyState: "No admitted item is filed in this desk today." });
const plan = {
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
    { candidateId: "candidate-secondary", storyId: "secondary-story", disposition: "QUALIFIED", reason },
    { candidateId: "candidate-held", storyId: null, disposition: "HOLD", reason: "The source is material, but its current evidence cannot yet support a reader-facing conclusion without guessing." }
  ],
  services: [
    { type: "paige_tip", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance, continuationDestination: null, continuationPurpose: null },
    { type: "career_life", state: "READY", displayMode: "INLINE_FULL_USEFUL_SUBSTANCE", usefulSubstance: substance, continuationDestination: "/newsstand.html#career", continuationPurpose: "The destination contains the worked example and evidence notes that genuinely extend this compact column." },
    empty("promptoscope"), empty("mme_claio"), empty("song"), empty("did_you_know"), empty("town_note"), empty("curiosity"), empty("fiction")
  ],
  discovery: { defaultPaper: "DAILY", alternatePapers: ["WEEKLY", "BIG_PICTURE"], breakingPlacement: "TOP_ONLY_WHEN_QUALIFIED", archiveAndTopics: "VISIBLE_SECONDARY" }
};

assert.deepEqual(inspectCompleteDailyComposition(plan).errors, []);
const exactV26Shape = structuredClone(plan);
exactV26Shape.news = [exactV26Shape.news[0]];
exactV26Shape.candidateDispositions = [exactV26Shape.candidateDispositions[0], exactV26Shape.candidateDispositions[2]];
exactV26Shape.issueOutcome = { state: "ONE_STORY_HOLD", reason: "Only one development qualified, so this cannot be presented as the complete multi-story Daily requested by Ali." };
assert.match(inspectCompleteDailyComposition(exactV26Shape).errors.join("\n"), /remains held rather than padded/);

const quietServiceEdition = structuredClone(plan);
quietServiceEdition.issueOutcome = { state: "NO_NEWS_SERVICE_EDITION", reason: "No development cleared the no-filler news floor, while two independently admitted useful columns earned a quiet-day paper." };
quietServiceEdition.news = [];
quietServiceEdition.candidateDispositions = [{ candidateId: "candidate-held", storyId: null, disposition: "HOLD", reason: "The source is material, but its current evidence cannot yet support a reader-facing conclusion without guessing." }];
assert.deepEqual(inspectCompleteDailyComposition(quietServiceEdition).errors, []);

const cases = [
  { mutate: value => { value.news[1].role = "LEAD"; }, expected: /only lead/ },
  { mutate: value => { value.news[1].rank = 4; }, expected: /contiguous/ },
  { mutate: value => { value.news[1].storyId = value.news[0].storyId; }, expected: /unique/ },
  { mutate: value => { value.news[1].qualification.noFiller = false; }, expected: /no-filler/ },
  { mutate: value => { value.news[1].displayMode = "LINK_ONLY"; }, expected: /display job/ },
  { mutate: value => { value.candidateDispositions[1].disposition = "HOLD"; value.candidateDispositions[1].storyId = null; }, expected: /qualified candidate/ },
  { mutate: value => { value.services[0].displayMode = "OPEN_CARD_TO_READ"; }, expected: /hides or lacks/ },
  { mutate: value => { value.services[0].usefulSubstance = "Open this card."; }, expected: /hides or lacks/ },
  { mutate: value => { value.issueOutcome = { state: "NO_NEWS_SERVICE_EDITION", reason }; value.news = []; value.candidateDispositions = []; value.services[1] = empty("career_life"); }, expected: /at least two/ },
  { mutate: value => { value.breaking = { state: "QUALIFIED", urgency: "New post" }; }, expected: /reader-disadvantage/ },
  { mutate: value => { value.discovery.archiveAndTopics = "PRIMARY"; }, expected: /hierarchy/ }
];
for (const [index, item] of cases.entries()) {
  const candidate = structuredClone(plan);
  item.mutate(candidate);
  assert.match(inspectCompleteDailyComposition(candidate).errors.join("\n"), item.expected, `bad case ${index + 1} must fail for its intended reason`);
}
console.log(`NEWSSTAND COMPLETE DAILY COMPOSITION CALIBRATION PASS multi_story=1 no_news_service=1 exact_v26_shape_rejected=1 mutations=${cases.length}`);
