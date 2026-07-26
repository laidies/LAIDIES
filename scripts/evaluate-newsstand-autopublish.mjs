#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultPolicyPath = path.resolve(
  scriptDirectory,
  "../operations/newsstand-autopublish-policy.json",
);

function unique(values) {
  return [...new Set(values)];
}

function validHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function evaluateCandidate(candidate, policy) {
  const rejectReasons = [];
  const holdReasons = [];
  const allowedEditions = ["daily", "breaking", "weekly", "tribune"];
  const allowedSourceTypes = [
    "primary",
    "affected_party",
    "independent",
    "secondary_analysis",
  ];

  const requiredStrings = ["id", "slug", "edition", "date", "headline"];
  for (const field of requiredStrings) {
    if (typeof candidate?.[field] !== "string" || !candidate[field].trim()) {
      rejectReasons.push(`missing_or_invalid:${field}`);
    }
  }
  if (
    typeof candidate?.slug === "string" &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.slug)
  ) {
    rejectReasons.push("missing_or_invalid:slug");
  }
  if (
    typeof candidate?.date === "string" &&
    !/^\d{4}-\d{2}-\d{2}$/.test(candidate.date)
  ) {
    rejectReasons.push("missing_or_invalid:date");
  }
  if (
    typeof candidate?.edition === "string" &&
    !allowedEditions.includes(candidate.edition)
  ) {
    rejectReasons.push("missing_or_invalid:edition");
  }

  const scores = candidate?.scores;
  const requiredScores = [
    "consequence",
    "novelty",
    "readerRelevance",
    "evidence",
    "durability",
    "editorialValue",
  ];
  if (!scores || typeof scores !== "object") {
    rejectReasons.push("missing_or_invalid:scores");
  } else {
    for (const field of requiredScores) {
      if (
        !Number.isInteger(scores[field]) ||
        scores[field] < 0 ||
        scores[field] > 3
      ) {
        rejectReasons.push(`missing_or_invalid:scores.${field}`);
      }
    }
  }

  const sources = Array.isArray(candidate?.sources) ? candidate.sources : [];
  if (sources.length < policy.minimumSources) {
    rejectReasons.push(`insufficient_sources:${sources.length}`);
  }

  const validSources = sources.filter((source) => {
    return (
      typeof source?.label === "string" &&
      source.label.trim() &&
      validHttpUrl(source.url) &&
      allowedSourceTypes.includes(source.type) &&
      source.verifiedFullText === true &&
      typeof source.interestedParty === "boolean"
    );
  });
  if (validSources.length !== sources.length) {
    rejectReasons.push("unverified_or_invalid_source");
  }

  const primarySources = validSources.filter(
    (source) => source.type === "primary",
  );
  if (primarySources.length < policy.minimumPrimarySources) {
    rejectReasons.push(`insufficient_primary_sources:${primarySources.length}`);
  }

  const checks = candidate?.checks;
  if (!checks || typeof checks !== "object") {
    rejectReasons.push("missing_or_invalid:checks");
  } else {
    for (const check of policy.requiredChecks) {
      if (checks[check] !== true) {
        rejectReasons.push(`required_check_failed:${check}`);
      }
    }
  }

  if (!Array.isArray(candidate?.riskSignals)) {
    rejectReasons.push("missing_or_invalid:riskSignals");
  }
  if (!Array.isArray(candidate?.topics)) {
    rejectReasons.push("missing_or_invalid:topics");
  }
  const riskSignals = Array.isArray(candidate?.riskSignals)
    ? candidate.riskSignals
    : [];
  const topics = Array.isArray(candidate?.topics) ? candidate.topics : [];

  if (
    riskSignals.includes("sensational_or_misleading_claim") &&
    checks?.sensationalFramingNeutralized !== true
  ) {
    rejectReasons.push(
      "required_check_failed:sensationalFramingNeutralized",
    );
  }

  if (
    topics.some((topic) =>
      ["model-release", "feature-release"].includes(topic),
    ) &&
    checks?.releaseDetailsComplete !== true
  ) {
    rejectReasons.push("required_check_failed:releaseDetailsComplete");
  }

  for (const signal of riskSignals) {
    if (policy.automaticRejectSignals.includes(signal)) {
      rejectReasons.push(`reject_signal:${signal}`);
    }
    if (policy.hardHoldSignals.includes(signal)) {
      holdReasons.push(`hold_signal:${signal}`);
    }
  }

  for (const topic of topics) {
    if (policy.hardHoldTopics.includes(topic)) {
      holdReasons.push(`hard_hold_topic:${topic}`);
    }
  }

  if (!policy.enabledEditions.includes(candidate?.edition)) {
    holdReasons.push(`edition_not_enabled:${candidate?.edition ?? "unknown"}`);
  }
  if (
    candidate?.edition === "tribune" &&
    policy.tribunePolicy === "hold_until_level_3"
  ) {
    holdReasons.push("tribune_requires_level_3");
  }

  const evidenceScore =
    typeof scores?.evidence === "number" ? scores.evidence : 0;
  const totalScore = requiredScores.reduce(
    (total, field) =>
      total + (typeof scores?.[field] === "number" ? scores[field] : 0),
    0,
  );
  const qualityScoreFields = [
    "evidence",
    "consequence",
    "novelty",
    "readerRelevance",
    "durability",
    "editorialValue",
  ];
  for (const field of qualityScoreFields) {
    const score = typeof scores?.[field] === "number" ? scores[field] : 0;
    if (score < policy.minimumScores[field]) {
      rejectReasons.push(
        `quality_floor_failed:${field}:${score}<${policy.minimumScores[field]}`,
      );
    }
  }
  if (totalScore < policy.minimumScores.total) {
    rejectReasons.push(
      `quality_floor_failed:total:${totalScore}<${policy.minimumScores.total}`,
    );
  }

  const distinctPublishers = new Set(
    validSources.map((source) => new URL(source.url).hostname),
  );
  if (distinctPublishers.size < 2) {
    holdReasons.push("fewer_than_two_source_publishers");
  }
  if (validSources.length && validSources.every((source) => source.interestedParty)) {
    holdReasons.push("all_sources_are_interested_parties");
  }

  const uniqueRejectReasons = unique(rejectReasons);
  const uniqueHoldReasons = unique(holdReasons);
  let verdict = "WOULD_AUTO_PUBLISH";
  if (uniqueRejectReasons.length) {
    verdict = "REJECT";
  } else if (uniqueHoldReasons.length) {
    verdict = "HOLD";
  } else if (policy.mode !== "shadow") {
    verdict = "AUTO_PUBLISH_ELIGIBLE";
  }

  return {
    policyVersion: policy.version,
    mode: policy.mode,
    candidateId: candidate?.id ?? null,
    verdict,
    publishActionTaken: false,
    scores: {
      evidence: evidenceScore,
      total: totalScore,
    },
    rejectReasons: uniqueRejectReasons,
    holdReasons: uniqueHoldReasons,
  };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseArguments(argumentsList) {
  const candidatePath = argumentsList[0];
  let policyPath = defaultPolicyPath;
  const policyIndex = argumentsList.indexOf("--policy");
  if (policyIndex !== -1) {
    policyPath = path.resolve(argumentsList[policyIndex + 1] ?? "");
  }
  return { candidatePath, policyPath };
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  const { candidatePath, policyPath } = parseArguments(process.argv.slice(2));
  if (!candidatePath) {
    console.error(
      "Usage: node scripts/evaluate-newsstand-autopublish.mjs <candidate.json> [--policy <policy.json>]",
    );
    process.exitCode = 1;
  } else {
    try {
      const candidate = readJson(path.resolve(candidatePath));
      const policy = readJson(policyPath);
      console.log(JSON.stringify(evaluateCandidate(candidate, policy), null, 2));
    } catch (error) {
      console.error(`Evaluation failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
