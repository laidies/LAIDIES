#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MODES = new Set([
  "REPORT_OR_ANNOUNCEMENT",
  "HEADLINE_OR_REPORTING_CHECK",
  "UPDATE_TO_PRIOR_COVERAGE"
]);
const DESK_TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const DISPOSITIONS = new Set(["QUALIFIED", "HOLD", "WATCH", "DUPLICATE", "NO_BUILD"]);
const useful = (value, minimum = 40) => typeof value === "string" && value.trim().length >= minimum;

export function inspectCompleteDailyComposition(plan) {
  const errors = [];
  if (plan?.schemaVersion !== "laidies-newsstand-complete-daily-composition.v1") errors.push("composition schemaVersion mismatch");
  if (!DATE.test(plan?.editionDate || "")) errors.push("composition editionDate is invalid");
  if (!DATE.test(plan?.coverageWindow?.start || "") || !DATE.test(plan?.coverageWindow?.end || "") ||
      plan?.coverageWindow?.end !== plan?.editionDate || plan?.coverageWindow?.start > plan?.coverageWindow?.end) {
    errors.push("coverage window must end on the edition date and have a valid start");
  }

  if (plan?.breaking?.state === "CLEAR") {
    if (!useful(plan.breaking.reason)) errors.push("clear Breaking state needs a specific reason");
  } else if (plan?.breaking?.state === "QUALIFIED") {
    if (!useful(plan.breaking.urgency) || !useful(plan.breaking.readerDisadvantageIfDelayed)) {
      errors.push("qualified Breaking needs urgency and reader-disadvantage evidence");
    }
  } else errors.push("Breaking must be explicitly CLEAR or QUALIFIED");

  const news = Array.isArray(plan?.news) ? plan.news : [];
  const issueOutcome = plan?.issueOutcome?.state;
  if (!new Set(["MULTI_STORY", "ONE_STORY_HOLD", "NO_NEWS_SERVICE_EDITION"]).has(issueOutcome)) errors.push("issue outcome must distinguish multi-story, one-story hold and no-news service edition");
  if (issueOutcome === "MULTI_STORY" && news.length < 2) errors.push("a multi-story Daily needs a lead plus at least one qualified secondary story");
  if (issueOutcome === "ONE_STORY_HOLD") {
    if (news.length !== 1 || !useful(plan?.issueOutcome?.reason)) errors.push("one-story hold requires exactly one qualified story and a specific hold reason");
    else errors.push("one qualified story remains held rather than padded or presented as a complete Daily");
  }
  if (issueOutcome === "NO_NEWS_SERVICE_EDITION" && (news.length !== 0 || !useful(plan?.issueOutcome?.reason))) errors.push("no-news service edition requires zero qualified news stories and a specific quiet reason");
  const ids = news.map(item => item?.storyId);
  if (ids.some(id => typeof id !== "string" || !id) || new Set(ids).size !== ids.length) errors.push("Daily story IDs must be present and unique");
  if (news.length && (news.filter(item => item?.role === "LEAD").length !== 1 || news[0]?.role !== "LEAD")) errors.push("the first ranked story must be the only lead");
  if (news.length && news.slice(1).some(item => item?.role !== "SECONDARY")) errors.push("all stories after the lead must be secondary");
  if (news.some((item, index) => item?.rank !== index + 1)) errors.push("story ranks must be unique and contiguous from one");
  for (const [index, item] of news.entries()) {
    const label = `news[${index}]`;
    if (!MODES.has(item?.mode)) errors.push(`${label} uses an unaccepted Daily mode`);
    if (item?.qualification?.status !== "QUALIFIED" || item?.qualification?.noFiller !== true) errors.push(`${label} is not explicitly qualified and no-filler`);
    for (const key of ["consequence", "readerPayoff", "whyNow", "rankingReason"]) {
      if (!useful(item?.qualification?.[key])) errors.push(`${label}.${key} is too weak to support selection`);
    }
    const expectedDisplay = index === 0 ? "LEAD_FULL_OR_MEANINGFUL_CONTINUATION" : "SELF_SUFFICIENT_SUMMARY";
    if (item?.displayMode !== expectedDisplay) errors.push(`${label} does not preserve its newspaper display job`);
  }

  const assessed = Array.isArray(plan?.candidateDispositions) ? plan.candidateDispositions : [];
  if (!assessed.length || assessed.some(item => typeof item?.candidateId !== "string" || !item.candidateId || !DISPOSITIONS.has(item?.disposition) || !useful(item?.reason))) {
    errors.push("every assessed candidate needs a valid disposition and specific reason");
  }
  if (new Set(assessed.map(item => item.candidateId)).size !== assessed.length) errors.push("candidate dispositions contain duplicate candidates");
  const qualified = assessed.filter(item => item.disposition === "QUALIFIED").map(item => item.storyId);
  if (qualified.some(id => typeof id !== "string" || !id) || JSON.stringify(qualified) !== JSON.stringify(ids)) {
    errors.push("every and only qualified candidate must appear in ranked story order");
  }
  if (assessed.some(item => item.disposition !== "QUALIFIED" && item.storyId != null)) errors.push("held/watch/duplicate/no-build candidates cannot masquerade as issue stories");

  const services = Array.isArray(plan?.services) ? plan.services : [];
  if (services.length !== DESK_TYPES.length || new Set(services.map(item => item?.type)).size !== DESK_TYPES.length ||
      DESK_TYPES.some(type => !services.some(item => item.type === type))) errors.push("all nine governed service slots must appear exactly once");
  const ready = services.filter(item => item?.state === "READY");
  if (issueOutcome === "NO_NEWS_SERVICE_EDITION" && ready.length < 2) errors.push("a no-news service edition needs at least two admitted useful columns; empty boxes do not carry an edition");
  for (const item of services) {
    if (item?.state === "READY") {
      if (item.displayMode !== "INLINE_FULL_USEFUL_SUBSTANCE" || !useful(item.usefulSubstance, 120)) errors.push(`service ${item.type} hides or lacks its useful substance`);
      if (item.continuationDestination == null) {
        if (item.continuationPurpose != null) errors.push(`service ${item.type} has a continuation purpose without a destination`);
      } else if (typeof item.continuationDestination !== "string" || !item.continuationDestination.startsWith("/") || !useful(item.continuationPurpose, 30)) {
        errors.push(`service ${item.type} continuation is not a valid deeper destination`);
      }
    } else if (item?.state === "EMPTY") {
      if (!useful(item.emptyState, 20) || item.usefulSubstance != null || item.continuationDestination != null) errors.push(`service ${item.type} has a false or incomplete empty state`);
    } else errors.push(`service ${item?.type || "unknown"} must be READY or EMPTY`);
  }

  const discovery = plan?.discovery;
  if (discovery?.defaultPaper !== "DAILY" || JSON.stringify(discovery?.alternatePapers) !== JSON.stringify(["WEEKLY", "BIG_PICTURE"]) ||
      discovery?.breakingPlacement !== "TOP_ONLY_WHEN_QUALIFIED" || discovery?.archiveAndTopics !== "VISIBLE_SECONDARY") {
    errors.push("Daily, alternate-paper, Breaking and archive hierarchy contract is incomplete");
  }
  return { errors, status: errors.length ? "HOLD" : "READY_FOR_PACKAGE_BUILD" };
}

function main() {
  const file = process.argv[2];
  if (!file) { console.error("usage: node scripts/check-newsstand-complete-daily-composition.mjs <composition.json>"); process.exit(2); }
  const plan = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
  const result = inspectCompleteDailyComposition(plan);
  if (result.errors.length) {
    console.error("NEWSSTAND COMPLETE DAILY COMPOSITION HOLD");
    result.errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log(`NEWSSTAND COMPLETE DAILY COMPOSITION PASS stories=${plan.news.length} ready_services=${plan.services.filter(item => item.state === "READY").length} breaking=${plan.breaking.state}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
