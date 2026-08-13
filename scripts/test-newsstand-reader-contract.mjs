#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "content", "newsstand-stories.js");
const CONTRACT_FILE = path.join(ROOT, "content", "newsstand-reader-contract.js");
const CASE_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "state-cases.json");
const DRILL_FILE = path.join(ROOT, "operations", "test-fixtures", "newsstand-reader", "correction-retraction-rollback-drill.json");
const NOW = "2026-07-25T20:00:00Z";
const NOW_CURRENT = "2026-08-11T22:30:00Z";
const NOW_VANCOUVER_AUG_4 = "2026-08-05T00:50:00Z";
const NOW_VANCOUVER_AUG_11 = "2026-08-12T05:44:30Z";

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA_FILE, "utf8"), context, { filename: DATA_FILE });
  return JSON.parse(JSON.stringify(context.window.NEWSSTAND_DATA));
}

function loadContract() {
  const context = { module: { exports: {} }, exports: {}, window: undefined };
  let source = fs.readFileSync(CONTRACT_FILE, "utf8");
  if (process.env.NEWSSTAND_CONTRACT_CALIBRATION === "bypass-story-freshness") {
    source = source.replace("if (story && ageHours(story.lastCheckedAt, now) > storyMaxAgeHours) {", "if (false) {");
  }
  if (process.env.NEWSSTAND_CONTRACT_CALIBRATION === "allow-empty-daily") {
    source = source.replace('if ((!issueItems || !issueItems.length) && !quietIssue) errors.push("daily issue has no admitted story or service item and no governed quiet disposition");', "if (false) errors.push(\"daily issue has no admitted story or service item and no governed quiet disposition\");");
  }
  vm.runInNewContext(source, context, { filename: CONTRACT_FILE });
  return context.module.exports;
}

function mutate(base, mutation) {
  if (mutation === "missing-dataset") return null;
  const data = JSON.parse(JSON.stringify(base));
  const tribune = data.stories.find((story) => story.id === "label-is-not-a-truth-detector");
  if (mutation === "empty-stories") data.stories = [];
  if (mutation === "dataset-hold") data.datasetStatus = "hold";
  if (mutation === "publication-unavailable") {
    data.publications.tribune.status = "unavailable";
    data.publications.weekly.status = "unavailable";
    data.publications.daily.status = "quiet";
    data.publications.daily.publishedAt = null;
  }
  if (mutation === "mixed-current-and-stale") {
    data.publications.tribune.lastCheckedAt = "2026-06-01T00:00:00Z";
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
    tribune.status = "hold";
    tribune.sourceApproval.status = "independent-review-required";
  }
  if (mutation === "story-corrected") {
    tribune.status = "corrected";
    tribune.correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: "/operations/test-fixtures/newsstand-reader/evidence/correction-label-truth-2026-07-25.json"
    };
  }
  if (mutation === "story-retracted") {
    tribune.status = "retracted";
    tribune.retraction = {
      retractedAt: "2026-07-25T18:00:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: "/operations/test-fixtures/newsstand-reader/evidence/retraction-label-truth-2026-07-25.json"
    };
  }
  return data;
}

const contract = loadContract();
const base = loadData();
const cases = JSON.parse(fs.readFileSync(CASE_FILE, "utf8"));
const drill = JSON.parse(fs.readFileSync(DRILL_FILE, "utf8"));

assert.deepEqual(Array.from(contract.EDITIONS), ["breaking", "daily", "weekly", "tribune"]);
assert.equal(contract.validate(base).length, 0);
assert.equal(contract.visibleStories(base, "weekly", NOW_CURRENT).length, 1, "admitted Weekly story is visible at its current source check");
assert.equal(contract.visibleStories(base, "tribune", NOW).length, 1);
assert.equal(contract.effectivePublicationState(base.publications.daily, NOW_VANCOUVER_AUG_4), "archive", "an August 3 Daily cannot remain current on August 4 in its editorial timezone");
assert.equal(contract.visibleStories(base, "daily", NOW_VANCOUVER_AUG_11).length, 4, "all four source-checked Daily back issues remain readable without being presented as current");
assert.equal(contract.effectivePublicationState(base.publications.daily, NOW_VANCOUVER_AUG_11), "archive", "a source recheck must not turn an old Daily into today's edition");
assert.equal(contract.datasetState(base, NOW_VANCOUVER_AUG_11).state, "ready", "an eligible archive is a usable NewsStand state even when no paper is current");
assert.equal(contract.accessDecision(base, null, { scope: "hash" }, NOW_VANCOUVER_AUG_11).canExpose, true, "the dataset gate must allow a direct route to an eligible archive story");
const staleStoryCandidate = JSON.parse(JSON.stringify(base));
staleStoryCandidate.publications.daily.editionDate = "2026-08-04";
staleStoryCandidate.publications.daily.lastCheckedAt = NOW_VANCOUVER_AUG_4;
const staleDailyStory = staleStoryCandidate.stories.find((story) => story.edition === "daily");
staleDailyStory.lastCheckedAt = "2026-01-01T00:00:00Z";
const staleStoryDecision = contract.accessDecision(staleStoryCandidate, staleDailyStory, { scope: "hash" }, NOW_VANCOUVER_AUG_4);
assert.equal(staleStoryDecision.canExpose, false, "a fresh publication wrapper cannot expose a stale story");
assert.equal(staleStoryDecision.state, "stale", "stale story denial must be explicit");
const emptyDailyIssue = JSON.parse(JSON.stringify(base));
emptyDailyIssue.publications.daily.issue.storyIds = [];
emptyDailyIssue.publications.daily.issue.serviceRecordIds = [];
assert.match(contract.validate(emptyDailyIssue).join("\n"), /daily issue has no admitted story or service item/, "an unexplained empty Daily cannot pass as complete");
const governedQuietDaily = JSON.parse(JSON.stringify(emptyDailyIssue));
governedQuietDaily.publications.daily.issue.disposition = "quiet";
governedQuietDaily.publications.daily.issue.sourceIdentity = { radarSha256: "a".repeat(64) };
assert.equal(contract.validate(governedQuietDaily).length, 0, "a checksum-bound governed quiet Daily is a complete issue");
const governedQuietOnly = JSON.parse(JSON.stringify(governedQuietDaily));
governedQuietOnly.stories = [];
governedQuietOnly.publications.daily.editionDate = "2026-08-04";
governedQuietOnly.publications.daily.lastCheckedAt = NOW_VANCOUVER_AUG_4;
assert.equal(contract.datasetState(governedQuietOnly, NOW_VANCOUVER_AUG_4).state, "ready", "a fresh governed quiet Daily can recover a dataset with no visible story");

for (const fixture of cases) {
  const candidate = mutate(base, fixture.mutation);
  const datasetState = contract.datasetState(candidate, NOW);
  if (fixture.expectedDatasetState) {
    assert.equal(datasetState.state, fixture.expectedDatasetState, fixture.id);
  }
  if (fixture.expectedTribuneState) {
    assert.equal(
      contract.effectivePublicationState(candidate.publications.tribune, NOW),
      fixture.expectedTribuneState,
      `${fixture.id}: Tribune state`
    );
  }
  if (fixture.expectedStoryState) {
    assert.equal(contract.storyState(candidate.stories.find((story) => story.id === "label-is-not-a-truth-detector")), fixture.expectedStoryState, fixture.id);
  }
  if (fixture.expectedTribuneAccess) {
    const decision = contract.accessDecision(candidate, candidate.stories.find((story) => story.id === "label-is-not-a-truth-detector"), { scope: "hash" }, NOW);
    assert.equal(decision.state, fixture.expectedTribuneAccess, `${fixture.id}: direct hash state`);
    assert.equal(decision.canExpose, fixture.expectedTribuneExposed, `${fixture.id}: direct hash exposure`);
  }
  if (fixture.expectedSearchExposed === false) {
    const search = contract.accessDecision(candidate, null, { scope: "search" }, NOW);
    assert.equal(search.canExpose, false, `${fixture.id}: archive search must fail closed`);
  }
  if (candidate) assert.equal(contract.validate(candidate).length, 0, `${fixture.id}: mutated dataset contract`);
}

const baseTribune = base.stories.find((story) => story.id === "label-is-not-a-truth-detector");
const baseSources = new Set(baseTribune.sources.map((source) => source.id));
assert.deepEqual(new Set(drill.sourceBinding), baseSources, "rollback drill must retain the exact approved source binding");
for (const stage of drill.stages) {
  const candidate = JSON.parse(JSON.stringify(base));
  const story = candidate.stories.find((item) => item.id === "label-is-not-a-truth-detector");
  story.status = stage.storyStatus;
  if (stage.storyStatus === "corrected") {
    story.correction = {
      correctedAt: "2026-07-25T18:00:00Z",
      summary: "A material date was corrected and the change is shown.",
      owner: "NewsStand accuracy editor",
      record: stage.record
    };
  }
  if (stage.storyStatus === "retracted") {
    story.retraction = {
      retractedAt: "2026-07-25T18:30:00Z",
      reason: "The central source no longer supports the published claim.",
      owner: "NewsStand accuracy editor",
      record: stage.record
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

let html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "content", "newsstand.css"), "utf8");
const catchup = fs.readFileSync(path.join(ROOT, "content", "site", "newsstand-catchup-v1.js"), "utf8");
if (process.env.NEWSSTAND_READER_CALIBRATION === "restore-breaking-choice") {
  html = html.replace('data-edition="daily"', 'data-edition="breaking"');
}
assert.doesNotMatch(css, /#4b2148/i, "retired plum cannot return as live NewsStand UI");
const publicationControls = Array.from(html.matchAll(/<button class="ns-publication"[^>]*data-edition="([^"]+)"/g), (match) => match[1]);
assert.deepEqual(publicationControls, ["daily", "weekly", "tribune"], "the top counter must expose exactly Daily, Weekly and Big Picture");
assert.doesNotMatch(html, /class="ns-publication"[^>]*data-edition="breaking"/, "Breaking cannot return as a top-level choice");
assert.match(html, /<strong>The Big Picture<\/strong>/, "the public fourth paper must use Ali's Big Picture masthead");
assert.doesNotMatch(html, />The Tribune</, "the retired Tribune masthead cannot remain in current public markup");
const publicationContents = Array.from(html.matchAll(/class="ns-publication__contents"[^>]*data-contents-for="([^"]+)"/g), (match) => match[1]);
assert.deepEqual(publicationContents, publicationControls, "every visible choice needs one live contents region");
assert.equal((html.match(/class="ns-publication__job"/g) || []).length, 3, "every visible choice needs a job preview");
assert.equal((html.match(/class="ns-publication__status"/g) || []).length, 3, "every visible choice needs a current state");
assert.equal((html.match(/class="ns-publication__action"/g) || []).length, 3, "every visible choice must say what opening does");
assert.match(html, /state === "archive" \? "Pull this paper · Latest edition"/, "prior-date Daily needs a truthful archive action");
assert.match(html, /state === "quiet" \? "Check this paper · No issue today"/, "quiet papers need a state-accurate action");
assert.match(html, /state === "hold" \? "Check this paper · Not published"/, "held papers cannot promise a normal pull action");
assert.match(html, /Today&rsquo;s Daily opens first\./, "the page must explain its Daily-first default");
assert.match(html, /Breaking news appears at the top of The Daily when it truly qualifies\./, "Breaking must be explained as part of Daily");
assert.doesNotMatch(html, /class="ns-paper-index"/, "the rejected duplicate four-paper mobile chooser must not remain");
assert.doesNotMatch(html, /class="ns-rack-stage__art"/, "the rejected four-paper rack art must not remain");
const counterMarkup = html.match(/<div class="ns-publications"[\s\S]*?<\/div>/)?.[0] || "";
for (const story of base.stories) {
  assert.equal(counterMarkup.includes(story.headline), false, `${story.id}: paper headline must come from canonical live data, not hard-coded markup`);
}
assert.match(html, /function renderPublicationContents\(\)/, "the in-paper contents need a dedicated live renderer");
assert.match(html, /id="ns-browse-all"[^>]*>Browse all back issues<\/button>/, "newcomers need a visible browse route that does not require a search term");
assert.match(html, /id="ns-catchup-title">Catch me up\.<\/h2>/, "returning readers need a visible Catch Me Up route");
assert.match(html, /id="ns-catchup-since" type="date"/, "Catch Me Up needs a visitor-editable start date");
assert.match(html, /newsstand-catchup-v1\.js/, "the Catch Me Up consumer must be loaded");
assert.match(html, /newsstand-stories\.js\?v=20260812-backfill-v1/, "a changed canonical story dataset needs a release-specific public cache key");
assert.match(html, /newsstand-catchup-v1\.js\?v=20260813-daily-first-v2/, "the Daily-first runtime needs the current release-specific public cache key");
assert.match(html, /newsstand\.css\?v=20260813-newsstand-v26/, "the self-hosted-font visual needs the current release-specific public cache key");
assert.match(html, /resident-continuation-bootstrap-v1\.js/, "NewsStand must mount the admitted Resident continuation bootstrap");
assert.equal((catchup.match(/record\.freshness\.expiresAt >= today/g) || []).length, 2,
  "Daily and historical service items must both fail closed after their freshness window");
assert.match(catchup, /if \(!requested && !global\.location\.hash && canRenderDaily\(\)\) renderDaily\(null, \{ initial: true \}\)/, "a hashless NewsStand visit must open the latest admitted Daily automatically");
assert.match(catchup, /function breakingLead\(\)/, "Breaking needs a governed Daily-lead resolver");
assert.match(catchup, /breaking \? '<aside class="ns-daily-breaking"/, "qualified Breaking must render inside the Daily rather than as a fourth choice");
assert.match(catchup, /options\.initial/, "automatic Daily opening must suppress the click-only scroll and focus jump");
assert.match(catchup, /<h2><span>The<\/span> Daily<\/h2>/, "the full issue needs a newspaper masthead");
assert.match(catchup, /class="ns-daily-front-grid/, "the issue needs one front-page lead with an admitted service column when service items exist");
assert.match(catchup, /class="ns-daily-service-rail"/, "the issue needs an integrated side column");
assert.match(catchup, /desks\.slice\(0, 4\)/, "the first four admitted desks belong in the side column");
assert.match(catchup, /desks\.slice\(4\)/, "remaining admitted desks belong in the rest-of-paper section");
assert.match(catchup, /Today&rsquo;s edition is brief\. More tomorrow\./, "a quiet Daily needs one compact visitor-facing edition note");
assert.doesNotMatch(catchup, /All nine service desks were checked|desk-by-desk record|desks stayed quiet|Filed in this edition|empty space honest/i, "internal desk and workflow language cannot appear in the newspaper");
assert.match(catchup, /class="ns-daily-section-switcher"/, "the Daily needs visible routes to the other NewsStand sections");
assert.match(catchup, /data-open-paper="weekly"/, "the Daily needs a direct Weekly route");
assert.match(catchup, /data-open-paper="tribune"/, "the Daily needs a direct Big Picture route");
assert.match(catchup, /data-open-archive/, "the Daily needs a direct archive route");
assert.match(catchup, /data-daily-topic/, "the Daily lead needs topic continuation into the archive");
assert.match(html, /function renderArchive\(invoker, viewOptions\)/, "the all-issues route needs a dedicated deterministic renderer");
assert.match(html, /function renderTopicButtons\(\)/, "the archive must derive its browse-by-topic controls from eligible stories");
assert.match(html, /function defaultSearchHint\(\)/, "search suggestions must come from the eligible archive rather than stale examples");
assert.doesNotMatch(html, /Try [“\"]agents[”\"].*[“\"]policy[”\"].*[“\"]Slack[”\"]/s, "the page cannot suggest searches that return no eligible issue");
assert.match(html, /eligibleArchiveStories\(\)\.forEach/, "held or unavailable stories cannot contribute visible topic controls");
assert.match(html, /data-topic=/, "topic controls need deterministic topic identities");
assert.match(html, /contract\.accessDecision\(data, story, \{ scope: "search" \}, now\)\.canExpose/, "browse-all must use the same eligibility boundary as archive search");
assert.match(html, /if \(view\.type === "archive"\)/, "browse-all state must restore through history");
assert.match(html, /contract\.visibleStories\(data, edition, now\)/, "paper contents must use the canonical eligibility boundary");
assert.match(html, /firstSentence\(lead\.laidies_read \|\| lead\.the_story\)/, "paper teaser must reuse the existing first-sentence rule");
assert.match(html, /data-story-count/, "paper contents must expose their derived eligible count for rendered verification");
assert.doesNotMatch(counterMarkup, /ns-front-story|ns-wire-story/, "paper contents cannot become a detached story-card rail");
assert.doesNotMatch(css, /\.ns-publications::after|\.ns-publication::before/, "the physical paper counter cannot depend on decorative pseudo objects");
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
assert.match(html, /contract\.accessDecision\(data, story, \{ scope: "hash" \}/);
assert.match(html, /Archived route · check overdue/);
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
assert.match(html, /src="\/assets\/town-characters\/scenes\/paige-scene\.png"/, "the admitted existing Paige scene is required");
assert.match(css, /\/\* Daily-first newspaper experience — v23\. \*\/[\s\S]*?\.ns-paige__crop\s*\{[\s\S]*?aspect-ratio:\s*1;/, "the compact Paige editor stamp must be the final crop override");
assert.match(css, /\/\* Daily-first newspaper experience — v23\. \*\/[\s\S]*?\.ns-publications\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/, "desktop must show exactly three compact publication choices");
assert.match(css, /\.ns-state__primary\s*\{\s*display:\s*none;/, "the rejected choose-a-paper step must not remain visible");
assert.match(css, /\.ns-daily-front-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1\.8fr\) minmax\(300px, 0\.9fr\)/, "desktop Daily needs a lead-story and side-column grid");
assert.match(css, /@media \(max-width: 780px\)[\s\S]*?\.ns-publications\s*\{\s*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/, "mobile must retain all three choices in one visible row");
assert.match(css, /@media \(max-width: 780px\)[\s\S]*?\.ns-daily-front-grid\s*\{\s*grid-template-columns:\s*1fr;/, "mobile Daily must preserve a single readable order");
assert.match(css, /\.ns-catchup-lead h3\s*\{[\s\S]*?text-transform:\s*none;/, "Catch Me Up must preserve the canonical SUNNYVAiLE lowercase i");
assert.match(html, /SUNNYVA<span class="ns-brand-i">i<\/span>LE NewsStand/, "primary building wordmark must preserve the canonical lowercase i under uppercase display styling");
assert.match(html, /function visiblePublicationControl\(edition\)[\s\S]*?control\.offsetParent !== null/, "mobile and desktop focus recovery must resolve the currently visible paper control");
assert.match(catchup, /SUNNYVA<span class="ns-brand-i">i<\/span>LE paper/, "generated Daily heading must preserve the canonical lowercase i");
assert.match(css, /\.ns-brand-i\s*\{[\s\S]*?text-transform:\s*none;/, "canonical lowercase i override must defeat inherited uppercase transforms");
assert.match(catchup, /quietIssue[\s\S]*?ns-daily-brief-edition[\s\S]*?Today&rsquo;s edition is brief/, "quiet Daily must use one compact edition note rather than expose empty desk records");
assert.doesNotMatch(catchup, /item\.editionDate <= localToday\(\)/, "a released edition cannot be hidden by the visitor's calendar date");
assert.match(catchup, /Date\.parse\(item\.admission\.reviewedAt\) <= Date\.now\(\)/, "Daily availability must follow the admitted release instant");
assert.doesNotMatch(catchup, /localToday|localDateOnly/, "reader eligibility and continuity cannot depend on the visitor's calendar");
assert.match(catchup, /timeZone: "America\/Vancouver"/, "stored visit instants need one stable editorial date projection");
assert.match(catchup, /timeZone: \/\^\\d\{4\}-\\d\{2\}-\\d\{2\}\$\/\.test\(source\) \? "UTC" : undefined/, "edition labels must preserve the literal date in every visitor time zone");
assert.match(css, /\.ns-topic-browser > p\s*\{[\s\S]*?color:\s*#fff9fc;/, "the dark archive panel needs a readable topic heading");
assert.match(css, /\.ns-topic-button\s*\{[\s\S]*?border-bottom:\s*3px solid var\(--ns-cyan\);[\s\S]*?color:\s*#fff9fc;/, "topic controls need readable text and a visible control edge");
assert.match(css, /\.ns-topic-button span\s*\{[\s\S]*?color:\s*var\(--ns-cyan\);/, "topic result counts need readable contrast on the archive panel");
assert.match(html, /class="ns-catchup-jump"/, "returning visitors need Catch Me Up at arrival");
assert.doesNotMatch(css, /\.ns-publications::after|\.ns-publication::before/, "the counter must not revive pseudo-object CSS art");
assert.match(css, /\.ns-story-notice--corrected/);
assert.match(css, /\.ns-story-notice--retracted/);

console.log(`✓ NEWSSTAND READER: ${cases.length} state fixtures · Daily-first paper · three-choice navigation · archive/focus/failure-state contracts`);
