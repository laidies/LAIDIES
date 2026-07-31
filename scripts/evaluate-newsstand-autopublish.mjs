#!/usr/bin/env node

/*
 * This is deliberately a review router, not a publishing decision-maker.
 * Candidate JSON is supplied by an untrusted proposal workflow.  It can tell
 * us what needs reviewing or that a proposal is malformed; it cannot prove a
 * source was read, a score is deserved, or that a paper may publish.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultPolicyPath = path.resolve(scriptDirectory, "../operations/newsstand-autopublish-policy.json");
const EDITIONS = ["daily", "breaking", "weekly", "tribune"];
const SOURCE_TYPES = ["primary", "affected_party", "independent", "secondary_analysis"];
const CANDIDATE_FIELDS = new Set(["id", "slug", "edition", "date", "headline", "scores", "topics", "riskSignals", "sources", "checks", "editorialJob", "briefingItems", "developments", "qualifiedInterrupt", "argumentStructure", "releaseDetailsComplete", "sensationalFramingNeutralized"]);
const SCORE_FIELDS = ["consequence", "novelty", "readerRelevance", "evidence", "durability", "editorialValue"];

function unique(values) { return [...new Set(values)]; }
function isObject(value) { return value && typeof value === "object" && !Array.isArray(value); }
function validHttpUrl(value) {
  try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:"; }
  catch { return false; }
}
function keysClosed(value, allowed) {
  return isObject(value) && Object.keys(value).every((key) => allowed.has(key));
}
function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
function utcDay(value) { return Math.floor(Date.parse(`${value}T00:00:00Z`) / 86400000); }

function editionJobErrors(candidate) {
  const errors = [];
  const edition = candidate?.edition;
  if (edition === "breaking") {
    if (candidate.editorialJob !== "qualified-interrupt" || !isObject(candidate.qualifiedInterrupt) || Object.keys(candidate.qualifiedInterrupt).length === 0) errors.push("edition_contract_failed:breaking_requires_qualified_interrupt");
  } else if (edition === "daily") {
    if (candidate.editorialJob !== "edited-briefing" || !Array.isArray(candidate.briefingItems) || candidate.briefingItems.length < 2 || candidate.briefingItems.some(x=>typeof x!=="string"||!x.trim()) || new Set(candidate.briefingItems).size !== candidate.briefingItems.length) errors.push("edition_contract_failed:daily_requires_multi_item_briefing");
  } else if (edition === "weekly") {
    if (candidate.editorialJob !== "durable-synthesis" || !Array.isArray(candidate.developments) || candidate.developments.length < 2 || candidate.developments.some(x=>typeof x!=="string"||!x.trim()) || new Set(candidate.developments).size !== candidate.developments.length) errors.push("edition_contract_failed:weekly_requires_durable_synthesis");
  } else if (edition === "tribune") {
    const structure = candidate.argumentStructure;
    if (candidate.editorialJob !== "sourced-argument" || !isObject(structure) || !["evidence", "inference", "position"].every((key) => typeof structure[key] === "string" && structure[key].trim())) errors.push("edition_contract_failed:tribune_requires_evidence_inference_position");
  }
  return errors;
}

export function evaluateCandidate(candidate, policy) {
  const rejectReasons = [];
  const reviewReasons = ["independent_signed_hashed_authority_required"];
  if (!keysClosed(candidate, CANDIDATE_FIELDS)) rejectReasons.push("unknown_or_invalid_candidate_fields");
  for (const field of ["id", "slug", "edition", "date", "headline"]) {
    if (typeof candidate?.[field] !== "string" || !candidate[field].trim()) rejectReasons.push(`missing_or_invalid:${field}`);
  }
  if (typeof candidate?.slug === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate.slug)) rejectReasons.push("missing_or_invalid:slug");
  if (typeof candidate?.edition === "string" && !EDITIONS.includes(candidate.edition)) rejectReasons.push("missing_or_invalid:edition");
  if (typeof candidate?.date === "string" && !validIsoDate(candidate.date)) rejectReasons.push("missing_or_invalid:date");
  if (validIsoDate(candidate?.date)) {
    const ageDays = utcDay(new Date(Date.now()).toISOString().slice(0, 10)) - utcDay(candidate.date);
    if (ageDays < 0) rejectReasons.push("candidate_date_in_future");
    if (ageDays > (policy.maximumCandidateAgeDays || 31)) rejectReasons.push("candidate_date_stale");
  }

  if (!keysClosed(candidate?.scores, new Set(SCORE_FIELDS))) rejectReasons.push("missing_or_invalid:scores");
  else for (const field of SCORE_FIELDS) if (!Number.isInteger(candidate.scores[field]) || candidate.scores[field] < 0 || candidate.scores[field] > 3) rejectReasons.push(`missing_or_invalid:scores.${field}`);
  if (!Array.isArray(candidate?.topics) || !candidate.topics.every((topic) => typeof topic === "string") || new Set(candidate?.topics || []).size !== (candidate?.topics || []).length) rejectReasons.push("missing_or_invalid:topics");
  if (!Array.isArray(candidate?.riskSignals) || !candidate.riskSignals.every((signal) => typeof signal === "string") || new Set(candidate?.riskSignals || []).size !== (candidate?.riskSignals || []).length) rejectReasons.push("missing_or_invalid:riskSignals");

  for (const [gate, trigger] of Object.entries(policy.conditionalGates || {})) {
    const topicTriggered = (trigger.topics || []).some((topic) => candidate?.topics?.includes(topic));
    const signalTriggered = (trigger.riskSignals || []).some((signal) => candidate?.riskSignals?.includes(signal));
    if ((topicTriggered || signalTriggered) && candidate?.[gate] !== true) rejectReasons.push(`conditional_gate_failed:${gate}`);
    if (candidate?.[gate] !== undefined && typeof candidate[gate] !== "boolean") rejectReasons.push(`missing_or_invalid:${gate}`);
  }

  const sources = Array.isArray(candidate?.sources) ? candidate.sources : [];
  if (sources.length < policy.minimumSources) rejectReasons.push(`insufficient_sources:${sources.length}`);
  const sourceUrls = new Set();
  for (const source of sources) {
    if (!keysClosed(source, new Set(["label", "url", "type", "verifiedFullText", "interestedParty"])) || typeof source.label !== "string" || !source.label.trim() || !validHttpUrl(source.url) || !SOURCE_TYPES.includes(source.type) || typeof source.verifiedFullText !== "boolean" || typeof source.interestedParty !== "boolean") rejectReasons.push("invalid_candidate_source_shape");
    if (sourceUrls.has(source?.url)) rejectReasons.push("duplicate_candidate_source_url");
    sourceUrls.add(source?.url);
  }
  if (!keysClosed(candidate?.checks, new Set(policy.requiredChecks)) || !policy.requiredChecks.every((key) => typeof candidate?.checks?.[key] === "boolean")) rejectReasons.push("missing_or_invalid:checks");

  rejectReasons.push(...editionJobErrors(candidate));
  for (const signal of candidate?.riskSignals || []) {
    if (policy.automaticRejectSignals.includes(signal)) rejectReasons.push(`candidate_declares_reject_signal:${signal}`);
    if (policy.hardHoldSignals.includes(signal)) reviewReasons.push(`candidate_declares_hold_signal:${signal}`);
  }
  for (const topic of candidate?.topics || []) if (policy.hardHoldTopics.includes(topic)) reviewReasons.push(`candidate_declares_hard_hold_topic:${topic}`);
  if (candidate?.checks && Object.entries(candidate.checks).some(([, value]) => value !== true)) reviewReasons.push("candidate_declares_incomplete_checks");

  // Scores, booleans, source labels and source classifications are intentionally
  // returned only as candidate declarations. They are never publication evidence.
  const verdict = rejectReasons.length ? "REJECT" : "HOLD_FOR_INDEPENDENT_REVIEW";
  return {
    policyVersion: policy.version,
    policySha256: crypto.createHash("sha256").update(JSON.stringify(policy)).digest("hex"),
    mode: "review-routing-only",
    candidateId: candidate?.id ?? null,
    verdict,
    publishActionTaken: false,
    authorityPresent: false,
    candidateAssertionsAreEvidence: false,
    rejectReasons: unique(rejectReasons),
    reviewReasons: unique(reviewReasons),
  };
}

export function parseCandidateJson(raw) {
  // Root-level keys are the controlled envelope authority. Detect duplicate
  // raw keys before JSON.parse's last-value-wins behaviour.
  const keys = new Set(); let depth = 0; let quote = false; let escaped = false; let start = -1;
  for (let i = 0; i < raw.length; i += 1) { const ch = raw[i]; if (quote) { if (!escaped && ch === '"') { quote=false; if(depth===1 && start>=0) { let j=i+1; while(/\s/.test(raw[j]||''))j++; if(raw[j]===':'){const key=JSON.parse(raw.slice(start,i+1));if(keys.has(key))throw new Error(`duplicate_json_key:${key}`);keys.add(key);} start=-1; } } escaped=!escaped && ch==='\\'; continue; } if(ch==='"'){quote=true;if(depth===1)start=i;continue;} if(ch==='{')depth++; if(ch==='}')depth--; }
  return JSON.parse(raw);
}
function readJson(filePath) { return JSON.parse(fs.readFileSync(filePath, "utf8")); }
function parseArguments(argumentsList) {
  const candidatePath = argumentsList[0];
  const policyIndex = argumentsList.indexOf("--policy");
  return { candidatePath, policyPath: policyIndex === -1 ? defaultPolicyPath : path.resolve(argumentsList[policyIndex + 1] ?? "") };
}
const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const { candidatePath, policyPath } = parseArguments(process.argv.slice(2));
  if (!candidatePath) { console.error("Usage: node scripts/evaluate-newsstand-autopublish.mjs <candidate.json> [--policy <policy.json>]"); process.exitCode = 1; }
  else { try { console.log(JSON.stringify(evaluateCandidate(parseCandidateJson(fs.readFileSync(path.resolve(candidatePath), "utf8")), readJson(policyPath)), null, 2)); } catch (error) { console.log(JSON.stringify({ verdict:"REJECT", publishActionTaken:false, authorityPresent:false, candidateAssertionsAreEvidence:false, rejectReasons:[`candidate_input_invalid:${error.message}`] }, null, 2)); } }
}
