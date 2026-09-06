#!/usr/bin/env node

import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(process.env.NEWSSTAND_TEST_FIXTURE_ROOT || ROOT, "content", "newsstand-stories.js");
const CONTRACT_FILE = path.join(ROOT, "content", "newsstand-reader-contract.js");
const READER_FILE = path.join(ROOT, "newsstand.html");
const DESIGN_FILE = path.join(ROOT, "content", "newsstand-design.css");
const CASE_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "state-cases.json");
const DRILL_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "correction-retraction-rollback-drill.json");
const NOW = "2026-07-25T20:00:00Z";
const NOW_VANCOUVER_AUG_4 = "2026-08-05T00:50:00Z";

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA_FILE, "utf8"), context, { filename: DATA_FILE });
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function loadContract() {
  const context = { module: { exports: {} }, exports: {}, window: undefined };
  let source = fs.readFileSync(CONTRACT_FILE, "utf8");
  if (process.env.NEWSSTAND_CONTRACT_CALIBRATION === "bypass-story-freshness") {
    source = source.replace("if (story && ageHours(story.lastCheckedAt, now) > Number(publication.maxAgeHours)) {", "if (false) {");
  }
  if (process.env.NEWSSTAND_CONTRACT_CALIBRATION === "allow-empty-daily") {
    source = source.replace('if ((!issueItems || !issueItems.length) && !quietIssue) errors.push("daily issue has no admitted story or service item and no governed quiet disposition");', "if (false) errors.push(\"daily issue has no admitted story or service item and no governed quiet disposition\");");
  }
  vm.runInNewContext(source, context, { filename: CONTRACT_FILE });
  return context.module.exports;
}

function withBigPictureFixture(input) {
  const data = JSON.parse(JSON.stringify(input));
  const story = data.stories.find((item) => item.id === "label-is-not-a-truth-detector");
  story.edition = "big-picture";
  story.bigPicture = {
    threadId: "THREAD-PROVENANCE-DISCLOSURE-TRUST",
    originallyPublishedAt: "2026-07-24T16:00:00Z",
    lastMeaningfullyUpdatedAt: "2026-07-25T19:30:00Z",
    sourcesLastCheckedAt: "2026-07-25T19:30:00Z",
    changeLog: [{ changedAt: "2026-07-25T19:30:00Z", kind: "initial-publication", summary: "Synthetic contract fixture." }],
    previousVersions: []
  };
  data.publications["big-picture"] = {
    edition: "big-picture",
    job: "Ongoing sourced analysis that follows consequential AI themes over time.",
    status: "current",
    publishedAt: story.publishedAt,
    updatedAt: story.updatedAt,
    lastCheckedAt: story.lastCheckedAt,
    maxAgeHours: 336,
    note: "Synthetic contract fixture."
  };
  return data;
}

function attachCorrectionSuccessor(data, story, { correctedAt, summary, owner, record }) {
  const successor = JSON.parse(JSON.stringify(story));
  successor.id = `${story.id}-correction-${correctedAt.slice(0, 10)}`;
  successor.slug = `${story.slug}-correction-${correctedAt.slice(0, 10)}`;
  successor.status = "published";
  successor.publishedAt = correctedAt;
  successor.updatedAt = correctedAt;
  successor.lastCheckedAt = correctedAt;
  successor.correction = null;
  successor.correctionHistory = [];
  successor.retraction = null;
  successor.predecessorStoryIds = [story.id];
  successor.successorStoryIds = [];
  successor.relationshipType = "corrects";
  const notice = {
    correctedAt,
    summary,
    owner,
    successorStoryId: successor.id
  };
  story.status = "corrected";
  story.correction = JSON.parse(JSON.stringify(notice));
  story.correctionHistory = [...story.correctionHistory, JSON.parse(JSON.stringify(notice))];
  story.successorStoryIds = [...story.successorStoryIds, successor.id];
  data.stories.push(successor);
  return successor;
}

function mutate(base, mutation) {
  if (mutation === "missing-dataset") return null;
  const data = JSON.parse(JSON.stringify(base));
  const bigPicture = data.stories.find((story) => story.id === "label-is-not-a-truth-detector");
  if (mutation === "empty-stories") {
    data.stories = [];
    data.publications.weekly.status = "quiet";
    delete data.publications.daily.issue.frontPaigeStoryId;
  }
  if (mutation === "dataset-hold") data.datasetStatus = "hold";
  if (mutation === "publication-unavailable") {
    data.publications["big-picture"].status = "unavailable";
    data.publications.daily.status = "quiet";
    data.publications.daily.publishedAt = null;
  }
  if (mutation === "mixed-current-and-stale") {
    data.publications["big-picture"].lastCheckedAt = "2026-06-01T00:00:00Z";
    data.publications.daily.status = "current";
    data.publications.daily.publishedAt = "2026-07-25T17:00:00Z";
    data.publications.daily.editionDate = "2026-07-25";
  }
  if (mutation === "stale-publications") {
    Object.values(data.publications).forEach((publication) => {
      publication.lastCheckedAt = "2026-06-01T00:00:00Z";
    });
  }
  if (mutation === "story-hold") {
    bigPicture.status = "hold";
    bigPicture.sourceApproval.status = "independent-review-required";
  }
  if (mutation === "story-corrected") {
    attachCorrectionSuccessor(data, bigPicture, {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: "/operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json"
    });
  }
  if (mutation === "story-retracted") {
    bigPicture.status = "retracted";
    bigPicture.retraction = {
      retractedAt: "2026-07-25T18:00:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor"
    };
  }
  return data;
}

const contract = loadContract();
const base = loadData();
const readerSource = fs.readFileSync(READER_FILE, "utf8");
const designSource = fs.readFileSync(DESIGN_FILE, "utf8");
const bigPictureFixture = withBigPictureFixture(base);
const cases = JSON.parse(fs.readFileSync(CASE_FILE, "utf8"));
const drill = JSON.parse(fs.readFileSync(DRILL_FILE, "utf8"));

assert.deepEqual(Array.from(contract.EDITIONS), ["breaking", "daily", "weekly", "big-picture"]);
assert.match(readerSource, /<div class="ns-article__copy">', content, "<\/div>"/, "formatted story HTML must render inside a neutral copy container, never a nested paragraph");
assert.doesNotMatch(readerSource, /"<p>", body, "<\/p>"/, "the reader must not wrap preformatted article paragraphs in another paragraph");
assert.match(designSource, /\.ns-redesign \.ns-article__section \{[\s\S]*?display: block;[\s\S]*?max-width: 780px;/, "ordinary article sections must use the readable single-column template");
assert.equal(contract.withinRecentCalendarDays("2026-09-01T00:13:05.767Z", "2026-08-31T23:00:00Z", 5, "America/Vancouver"), true, "a UTC September timestamp published on August 31 Vancouver time remains recent");
assert.equal(contract.withinRecentCalendarDays("2026-08-27T16:00:00Z", "2026-08-31T23:00:00Z", 5, "America/Vancouver"), true, "the fifth Vancouver calendar date is included");
assert.equal(contract.withinRecentCalendarDays("2026-08-26T16:00:00Z", "2026-08-31T23:00:00Z", 5, "America/Vancouver"), false, "a story older than the five-date window is excluded");
assert.equal(contract.withinRecentCalendarDays("2026-09-01T08:00:00Z", "2026-08-31T23:00:00Z", 5, "America/Vancouver"), false, "a future Vancouver publication date cannot appear in Latest");
assert.equal(contract.validate(base).length, 0);
const frontPaige = base.stories.find((story) => story.id === "front-paige-accountable-systems-2026-08-24");
assert.equal(frontPaige.heroVisual.src, "/assets/newsstand/design-20260830/front-paige-women-computing.png", "Front PAiGE must retain Ali's approved women-across-computing image");
assert.equal(
  crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, frontPaige.heroVisual.src.replace(/^\//, "")))).digest("hex"),
  "0742816929be694e0e9fcfa11c3ae047173814e6112419176a71a994273828a5",
  "Front PAiGE approved image bytes must not be silently replaced"
);
const missingImage = JSON.parse(JSON.stringify(base));
delete missingImage.stories.find((story) => story.status === "published").heroVisual;
assert.ok(contract.validate(missingImage).some((error) => /published story image is missing or incomplete/.test(error)), "published stories without an image must fail closed");
assert.equal(contract.visibleStories(base, "weekly", NOW).length, 0, "held Weekly story must fail closed");
assert.equal(contract.visibleStories(base, "big-picture", NOW).length, 1, "the admitted Big Picture remains available");
assert.equal(contract.visibleStories(bigPictureFixture, "big-picture", NOW).length, 2, "the synthetic fixture adds independent Big Picture contract coverage");
assert.equal(contract.effectivePublicationState(base.publications.daily, NOW_VANCOUVER_AUG_4), "archive", "an August 3 Daily cannot remain current on August 4 in its editorial timezone");
const weeklyWindow = JSON.parse(JSON.stringify(base.publications.weekly));
weeklyWindow.status = "current";
weeklyWindow.storyId = "weekly-test-fixture";
weeklyWindow.editionDate = "2026-08-19";
weeklyWindow.editorialTimeZone = "America/Vancouver";
weeklyWindow.publishedAt = "2026-08-19T15:00:00Z";
weeklyWindow.updatedAt = "2026-08-19T15:00:00Z";
weeklyWindow.lastCheckedAt = "2026-08-19T15:00:00Z";
assert.equal(contract.effectivePublicationState(weeklyWindow, "2026-08-23T20:00:00Z"), "current", "Wednesday Weekly must remain current through Tuesday");
assert.equal(contract.effectivePublicationState(weeklyWindow, "2026-09-02T20:00:00Z"), "current", "Weekly persists beyond two Wednesdays until an admitted successor");
assert.equal(contract.effectivePublicationState(weeklyWindow, "2026-08-18T20:00:00Z"), "archive", "a future Weekly must not appear current");
const invalidWeeklyDate = JSON.parse(JSON.stringify(base));
invalidWeeklyDate.publications.weekly = { ...weeklyWindow, editionDate: "2026-08-20" };
assert.match(contract.validate(invalidWeeklyDate).join("\n"), /weekly editionDate must be a Wednesday/, "a current Weekly must be anchored on Wednesday");
const staleStoryCandidate = JSON.parse(JSON.stringify(base));
staleStoryCandidate.publications.daily.editionDate = "2026-08-04";
staleStoryCandidate.publications.daily.lastCheckedAt = NOW_VANCOUVER_AUG_4;
const staleDailyStory = staleStoryCandidate.stories.find((story) => story.edition === "daily");
staleDailyStory.lastCheckedAt = "2026-01-01T00:00:00Z";
const staleStoryDecision = contract.accessDecision(staleStoryCandidate, staleDailyStory, { scope: "hash" }, NOW_VANCOUVER_AUG_4);
assert.equal(staleStoryDecision.canExpose, true, "a published stale story remains available as a dated archive record");
assert.equal(staleStoryDecision.state, "archive", "stale published story must be labelled archive");
const emptyDailyIssue = JSON.parse(JSON.stringify(base));
emptyDailyIssue.publications.daily.issue.storyIds = [];
emptyDailyIssue.publications.daily.issue.serviceRecordIds = [];
delete emptyDailyIssue.publications.daily.issue.disposition;
assert.match(contract.validate(emptyDailyIssue).join("\n"), /daily issue has no admitted story or service item/, "an unexplained empty Daily cannot pass as complete");
const governedQuietDaily = JSON.parse(JSON.stringify(emptyDailyIssue));
governedQuietDaily.publications.daily.issue.disposition = "quiet";
governedQuietDaily.publications.daily.issue.sourceIdentity = { radarSha256: "a".repeat(64) };
assert.equal(contract.validate(governedQuietDaily).length, 0, "a checksum-bound governed quiet Daily is a complete issue");
const governedQuietOnly = JSON.parse(JSON.stringify(governedQuietDaily));
governedQuietOnly.stories = [];
governedQuietOnly.publications.weekly.status = "quiet";
delete governedQuietOnly.publications.daily.issue.frontPaigeStoryId;
governedQuietOnly.publications.daily.editionDate = "2026-08-04";
governedQuietOnly.publications.daily.lastCheckedAt = NOW_VANCOUVER_AUG_4;
assert.equal(contract.datasetState(governedQuietOnly, NOW_VANCOUVER_AUG_4).state, "ready", "a fresh governed quiet Daily can recover a dataset with no visible story");

for (const fixture of cases) {
  const candidate = mutate(bigPictureFixture, fixture.mutation);
  const datasetState = contract.datasetState(candidate, NOW);
  if (fixture.expectedDatasetState) {
    assert.equal(datasetState.state, fixture.expectedDatasetState, fixture.id);
  }
  if (fixture.expectedBigPictureState) {
    assert.equal(
      contract.effectivePublicationState(candidate.publications["big-picture"], NOW),
      fixture.expectedBigPictureState,
      `${fixture.id}: Big Picture state`
    );
  }
  if (fixture.expectedStoryState) {
    assert.equal(contract.storyState(candidate.stories.find((story) => story.id === "label-is-not-a-truth-detector")), fixture.expectedStoryState, fixture.id);
  }
  if (fixture.expectedBigPictureAccess) {
    const decision = contract.accessDecision(candidate, candidate.stories.find((story) => story.id === "label-is-not-a-truth-detector"), { scope: "hash" }, NOW);
    assert.equal(decision.state, fixture.expectedBigPictureAccess, `${fixture.id}: direct hash state`);
    assert.equal(decision.canExpose, fixture.expectedBigPictureExposed, `${fixture.id}: direct hash exposure`);
  }
  if (typeof fixture.expectedSearchExposed === "boolean") {
    const search = contract.accessDecision(candidate, null, { scope: "search" }, NOW);
    assert.equal(search.canExpose, fixture.expectedSearchExposed, `${fixture.id}: archive search exposure`);
  }
  if (candidate) assert.equal(contract.validate(candidate).length, 0, `${fixture.id}: mutated dataset contract`);
}

const baseBigPicture = bigPictureFixture.stories.find((story) => story.id === "label-is-not-a-truth-detector");
const baseSources = new Set(baseBigPicture.sources.map((source) => source.id));
assert.deepEqual(new Set(drill.sourceBinding), baseSources, "rollback drill must retain the exact approved source binding");
for (const stage of drill.stages) {
  const candidate = JSON.parse(JSON.stringify(bigPictureFixture));
  const story = candidate.stories.find((item) => item.id === "label-is-not-a-truth-detector");
  story.status = stage.storyStatus;
  if (stage.storyStatus === "corrected") {
    attachCorrectionSuccessor(candidate, story, {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: stage.record
    });
  }
  if (stage.storyStatus === "retracted") {
    story.retraction = {
      retractedAt: "2026-07-25T18:30:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor"
    };
  }
  assert.equal(contract.validate(candidate).length, 0, `${stage.stage}: complete schema contract`);
  const decision = contract.accessDecision(candidate, story, { scope: "hash" }, NOW);
  assert.equal(decision.state, stage.expectedAccessState, `${stage.stage}: access state`);
  assert.equal(decision.canExpose, stage.expectedBodyVisible, `${stage.stage}: body visibility`);
  if (stage.record) {
    const recordPath = path.join(ROOT, stage.record.replace(/^\//, ""));
    assert.equal(fs.existsSync(recordPath), true, `${stage.stage}: evidence record must resolve`);
    const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
    assert.equal(record.storyId, story.id, `${stage.stage}: evidence story binding`);
    assert.deepEqual(new Set(record.sourceIds), baseSources, `${stage.stage}: evidence source binding`);
  }
}

const html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "content", "newsstand.css"), "utf8");
const designCss = fs.readFileSync(path.join(ROOT, "content", "newsstand-design.css"), "utf8");
const catchup = fs.readFileSync(path.join(ROOT, "content", "site", "newsstand-catchup-v1.js"), "utf8");
assert.doesNotMatch(css, /#4b2148/i, "retired plum cannot return as live NewsStand UI");
const publicationControls = Array.from(html.matchAll(/<button class="[^"]*ns-publication[^"]*"[^>]*data-edition="([^"]+)"/g), (match) => match[1]);
assert.deepEqual(publicationControls, ["daily"], "the physical counter must expose one complete Daily rather than four competing papers");
const publicationContents = Array.from(html.matchAll(/class="ns-publication__contents"[^>]*data-contents-for="([^"]+)"/g), (match) => match[1]);
assert.deepEqual(publicationContents, ["daily"], "the complete Daily needs one live contents region");
assert.equal((html.match(/class="ns-publication__status"/g) || []).length, 1, "the complete Daily needs one visible state");
assert.equal((html.match(/class="ns-publication__action"/g) || []).length, 1, "the complete Daily must say what opening does");
for (const column of ["breaking", "weekly", "big-picture"]) {
  assert.match(html, new RegExp(`data-status-for="${column}"`), `${column}: one-paper front needs a dated column state`);
  assert.match(html, new RegExp(`data-contents-for="${column}"`), `${column}: one-paper front needs live column contents`);
}
assert.match(html, /state === "archive" \? "Pull this paper · Latest edition"/, "prior-date Daily needs a truthful archive action");
assert.match(html, /state === "quiet" \? "No issue today"/, "quiet papers need a state-accurate reader action");
assert.match(html, /state === "hold" \? "Check this paper · Not published"/, "held papers cannot promise a normal pull action");
assert.match(html, /class="ns-masthead-title"[\s\S]*?THE SUNNYVA<span class="ns-brand-i">i<\/span>LE NEWSSTAND/, "the newspaper masthead must use the current NewsStand identity");
assert.doesNotMatch(html, /class="ns-paper-sections"/, "the front-page regions must not be repeated as redundant section tabs");
assert.doesNotMatch(html, /class="ns-counter-intro"/, "a second explanatory arrival strip must not compete with the newspaper masthead");
assert.match(html, /Wednesday to Wednesday/, "the Weekly column must state its Wednesday-to-Wednesday window");
assert.match(html, /Latest analysis/, "the Big Picture column must identify its analysis job without internal language");
assert.match(html, /Advice, tips &amp; explainers/, "the useful desk needs a reader-facing description rather than a vague save-page instruction");
assert.doesNotMatch(html, />Keep this page</, "the useful desk must not tell readers to keep a page without explaining why");
assert.match(designCss, /\.ns-redesign \.ns-feature-desk__grid--useful\s*\{[^}]*gap:\s*1px;[^}]*background:\s*#b8afc0;/,
  "the useful desk must draw dividers from the visible grid rather than hidden DOM positions");
assert.match(designCss, /\.ns-redesign \.ns-feature-desk__grid--useful > li\s*\{[^}]*border:\s*0;/,
  "useful cards must not retain position-dependent borders that can disappear after reordering");
for (const illustration of ["jeeves-vibrant.png", "corner-vibrant.png", "paige-vibrant.png", "concept-vibrant.png"]) {
  assert.match(catchup, new RegExp(illustration.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${illustration}: the balanced feature illustration must remain wired to the desk`);
  assert.equal(fs.existsSync(path.join(ROOT, "assets", "newsstand", "design-20260906", illustration)), true, `${illustration}: the balanced feature illustration must resolve`);
}
const counterMarkup = html.match(/<div class="ns-one-paper"[\s\S]*?<\/div>\s*<\/div>/)?.[0] || "";
for (const story of base.stories) {
  assert.equal(counterMarkup.includes(story.headline), false, `${story.id}: paper headline must come from canonical live data, not hard-coded markup`);
}
assert.match(html, /function renderPublicationContents\(\)/, "the in-paper contents need a dedicated live renderer");
assert.match(html, /id="ns-browse-all"[^>]*>Browse all back issues<\/button>/, "newcomers need a visible browse route that does not require a search term");
assert.match(html, /id="ns-catchup-title"[^>]*>What&rsquo;s new since your last visit\?<\/h2>/, "returning readers need a visible since-your-last-visit route");
assert.match(catchup, /New at the NewsStand/, "the catch-up results must explain that these are newly published NewsStand items");
assert.doesNotMatch(catchup, /ns-catchup-item__state/, "the catch-up must not repeat internal publication-state labels on every item");
assert.doesNotMatch(html, /id="ns-catchup-since"/, "Catch-up must not ask readers to remember or enter their last visit date");
assert.match(html, /id="ns-catchup-signin"[^>]*href="\/resident-card\.html#rcAccountTitle"/, "signed-out readers need a direct Resident sign-in route for account-backed catch-up");
assert.match(catchup, /LAIDIESResidentContinuationV1\.syncWith\(runtime\)/, "Catch-up must hydrate the Resident's cross-device continuation before choosing its start date");
assert.match(catchup, /catchupAccountState === "account-backed"/, "Catch-up must distinguish account-backed history from device-local fallback");
assert.match(catchup, /new Date\(Date\.now\(\) - 7 \* DAY_MS\)/, "readers without saved history need a useful seven-day fallback");
assert.match(catchup, /visibilityState === "hidden"\) persistVisit\(\)/, "a signed-in visit must be saved when the reader leaves rather than waiting for another visit");
assert.match(html, /newsstand-catchup-v1\.js/, "the Catch Me Up consumer must be loaded");
assert.match(html, /resident-continuation-bootstrap-v1\.js/, "the incumbent resident continuation integration remains outside NewsStand publication authority");
assert.doesNotMatch(html, /newsstand-current-issue\.js|local-preview-data\.js/, "NewsStand must use schema-2 canonical data without a preview-only authority overlay");
assert.equal((catchup.match(/record\.freshness\.expiresAt >= today/g) || []).length, 2,
  "Daily and historical service items must both fail closed after their freshness window");
assert.match(catchup, /latestStoredDailyIssue\(\)/, "a stale current desk must still offer the latest admitted Daily as a labelled back issue");
assert.doesNotMatch(catchup, /issue\.sourceIdentity\.storiesSha256 !== loadedStoriesSha256/, "a later story-registry edit cannot invalidate an admitted historical Daily envelope");
assert.doesNotMatch(catchup, /Catch Me Up is unavailable until the publication record is current/, "Catch Me Up must remain useful for admitted historical records when the current desk is stale");
assert.doesNotMatch(catchup, /This edition is from the archive|No Weekly is ready to read/, "Since Your Last Visit must not rebuild retired Daily or Weekly lead cards");
assert.match(html, /function renderArchive\(invoker, viewOptions\)/, "the all-issues route needs a dedicated deterministic renderer");
assert.match(html, /function reconcileHistoricalDailySnapshot\(snapshot\)/, "historical Daily snapshots need a fail-closed schema reconciliation path");
assert.match(html, /sameSources[\s\S]*?samePublishedBytes[\s\S]*?&& sameSources/, "snapshot reconciliation must prove published copy and source fields are unchanged before adding current metadata");
assert.match(html, /function renderTopicButtons\(\)/, "the archive must derive its browse-by-topic controls from eligible stories");
assert.match(html, /function defaultSearchHint\(\)/, "search suggestions must come from the eligible archive rather than stale examples");
assert.doesNotMatch(html, /Try [“\"]agents[”\"].*[“\"]policy[”\"].*[“\"]Slack[”\"]/s, "the page cannot suggest searches that return no eligible issue");
assert.match(html, /completeArchiveItems\(\)\.forEach/, "topic controls must come from the admitted complete archive index or its gated story fallback");
assert.match(html, /data-topic=/, "topic controls need deterministic topic identities");
assert.match(html, /contract\.accessDecision\(data, story, \{ scope: "search" \}, now\)\.canExpose/, "browse-all must use the same eligibility boundary as archive search");
assert.match(html, /if \(view\.type === "archive"\)/, "browse-all state must restore through history");
assert.match(html, /contract\.visibleStories\(data, edition, now\)/, "paper contents must use the canonical eligibility boundary");
assert.match(html, /firstSentence\(lead\.laidies_read \|\| lead\.the_story\)/, "paper teaser must reuse the existing first-sentence rule");
assert.match(html, /data-story-count/, "paper contents must expose their derived eligible count for rendered verification");
assert.doesNotMatch(counterMarkup, /ns-front-story|ns-wire-story/, "paper contents cannot become a detached story-card rail");
assert.doesNotMatch(css, /\.ns-one-paper::after|\.ns-one-paper::before/, "the one-paper counter cannot depend on decorative pseudo objects");
assert.doesNotMatch(html, /newsstand-(?:paige-rack|paper-wednesday|paper-tribune)-comic-candidate-v1\.png/);
assert.doesNotMatch(html, /WEDNESDAY EDITION/i);
assert.match(html, /aria-pressed="false"/);
assert.match(html, /if \(event\.key !== "Enter"\) return;\s*event\.preventDefault\(\);\s*button\.click\(\);/, "paper controls require deterministic Enter activation");
assert.match(html, /id="ns-reader-title" tabindex="-1"/);
assert.match(html, /focusAfterPaint\(destination\)/);
assert.match(html, /The publication record did not load/);
assert.match(html, /Not published yet/);
assert.match(html, /Retraction notice/);
assert.match(html, /Correction/);
assert.match(html, /contract\.accessDecision\(data, null, \{ edition: edition, scope: "paper" \}/);
assert.match(html, /contract\.accessDecision\(data, null, \{ scope: "search" \}/);
assert.match(html, /contract\.accessDecision\(data, story, \{ edition: story\.edition, scope: "hash" \}/);
assert.match(html, /decision\.state === "archive" \? "Archived story\."/);
assert.match(html, /From the archive\./, "archived routes use reader language rather than internal freshness comments");
assert.match(html, /state\.nsReaderView = view \|\| captureReaderView/);
assert.match(html, /storyState\.nsPreviousView = previousView/);
assert.match(html, /function restoreHashlessView\(\)/);
assert.match(html, /data-ns-restoration/, "history restoration must expose an observable settled state");
assert.match(html, /newsstand:history-restored/, "history restoration must emit an observable event");
assert.doesNotMatch(html, /window\.setTimeout\(function \(\) \{ window\.scrollTo/, "history restoration must not rely on a timing guess");
assert.match(html, /if \(location\.hash\) renderHash\(true, lastInvoker\);\s*else restoreHashlessView\(\);/);
assert.match(html, /rack\.innerHTML = "";\s*empty\.hidden = true;/);
assert.doesNotMatch(html, /story\.edition === "wednesday"/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(html, /class="ns-counter-surface"/, "one physical counter surface is required");
assert.doesNotMatch(html, /src="\/assets\/town-characters\/scenes\/paige-scene\.png"/, "a permanent Paige scene cannot impersonate every Front PAiGE story visual");
assert.match(html, /lead\.heroVisual[\s\S]*?leadVisualImage\.src = lead\.heroVisual\.src/, "a Front PAiGE visual must come from the admitted story record");
assert.match(html, /leadVisual\.hidden = true;[\s\S]*?leadVisualImage\.removeAttribute\("src"\)/, "a story without an admitted visual must render a truthful text-first lead");
assert.match(css, /\.ns-paige__crop\s*\{[\s\S]*?aspect-ratio:\s*15\s*\/\s*16/, "Paige must use the admitted 15:16 crop");
assert.match(css, /\.ns-paige__crop img\s*\{[\s\S]*?top:\s*-6\.061%;[\s\S]*?left:\s*-106\.061%;[\s\S]*?width:\s*245\.303%/, "Paige crop geometry must remain exact");
assert.match(css, /\.ns-one-paper\s*\{[\s\S]*?background:\s*#fff9fc;/, "the complete paper needs one continuous newspaper surface");
assert.match(css, /\.ns-front-page-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(190px, \.72fr\) minmax\(340px, 1\.55fr\) minmax\(220px, \.88fr\)/, "desktop must give Big Picture, Front PAiGE and the Daily\/Weekly rail distinct hierarchy");
assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.ns-front-page-grid\s*\{\s*grid-template-columns:\s*1fr;/, "the one-paper front page must stack on mobile");
assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.ns-one-paper \.ns-publication\[data-edition\][\s\S]*?position:\s*static;[\s\S]*?width:\s*100%;[\s\S]*?background-image:\s*none;/, "legacy mobile four-paper CSS must not repaint the complete Daily as a rack slot");
assert.match(designCss, /\.ns-catchup-group__head h3\s*\{[\s\S]*?var\(--ns-news-serif\)/, "Since Your Last Visit needs a clear editorial group hierarchy");
assert.match(html, /THE SUNNYVA<span class="ns-brand-i">i<\/span>LE NEWSSTAND/, "primary newspaper wordmark must preserve the canonical lowercase i under uppercase display styling");
assert.match(html, /function visiblePublicationControl\(edition\)[\s\S]*?control\.offsetParent !== null/, "mobile and desktop focus recovery must resolve the currently visible paper control");
assert.match(html, /document\.getElementById\("newsstand-rack"\)\.addEventListener\("click"[\s\S]*?lastInvoker = link;/,
  "a story opened from the front page must return focus to the exact story link");
assert.match(html, /Date\.parse\(story\.updatedAt\) > Date\.parse\(story\.publishedAt\)/,
  "an ordinary story must not display an update date earlier than its publication date");
assert.doesNotMatch(html, /var firstPaper = document\.querySelector\("\.ns-publication"\)/, "arrival CTA cannot target the hidden desktop rack on mobile");
assert.match(catchup, /Around SUNNYVA<span class="ns-brand-i">i<\/span>LE/, "the town-update group must preserve the canonical lowercase i");
assert.match(css, /\.ns-brand-i\s*\{[\s\S]*?text-transform:\s*none;/, "canonical lowercase i override must defeat inherited uppercase transforms");
assert.match(catchup, /quietIssue[\s\S]*?ns-daily-quiet-desks[\s\S]*?See today&rsquo;s columns/, "an empty Daily keeps optional columns available without exposing internal desk-check language");
for (const currentDesk of ["Concept of the Week", "Behind the Build", "Around Town · fictional town news", "Daily crossword"]) {
  assert.match(catchup, new RegExp(currentDesk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `${currentDesk}: current Daily desk must render`);
}
assert.doesNotMatch(catchup, /item\.editionDate <= localToday\(\)/, "a released edition cannot be hidden by the visitor's calendar date");
assert.match(catchup, /Date\.parse\(item\.admission\.reviewedAt\) <= Date\.now\(\)/, "Daily availability must follow the admitted release instant");
assert.doesNotMatch(catchup, /localToday|localDateOnly/, "reader eligibility and continuity cannot depend on the visitor's calendar");
assert.match(catchup, /timeZone: "America\/Vancouver"/, "stored visit instants need one stable editorial date projection");
assert.match(catchup, /var timeZone = dateOnlyValue \? "UTC" : "America\/Vancouver";/, "edition labels must choose UTC for literal dates and Vancouver for instants");
assert.match(catchup, /timeZone: timeZone/, "edition labels must apply the chosen stable time zone");
assert.doesNotMatch(html, /class="ns-paper-index"/, "the retired four-paper mobile chooser must not return");
assert.match(css, /\.ns-topic-browser > p\s*\{[\s\S]*?color:\s*#fff9fc;/, "the dark archive panel needs a readable topic heading");
assert.match(css, /\.ns-topic-button\s*\{[\s\S]*?border-bottom:\s*3px solid var\(--ns-cyan\);[\s\S]*?color:\s*#fff9fc;/, "topic controls need readable text and a visible control edge");
assert.doesNotMatch(html, /<span aria-hidden="true">' \+ counts\[topic\]/, "topic controls must not expose article counts in their labels");
assert.match(html, /class="ns-catchup-jump"/, "returning visitors need Since Your Last Visit at arrival");
assert.doesNotMatch(css, /\.ns-one-paper::after|\.ns-one-paper::before/, "the counter must not revive pseudo-object CSS art");
assert.match(css, /\.ns-story-notice--corrected/);
assert.match(css, /\.ns-story-notice--retracted/);

console.log(`✓ NEWSSTAND READER: ${cases.length} state fixtures · canonical editions · focus/ARIA/failure-state contracts`);
