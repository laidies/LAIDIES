#!/usr/bin/env node

// Private preparation only. This utility never writes the canonical Daily
// columns, promotes an issue, or changes a bank item's approval.
import crypto from "node:crypto";
import { careerLaneErrors } from "./newsstand-career-lane.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectProseReviewChain } from "./check-prose-quality-admission.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_BANK = path.join(ROOT, "operations/product-stewards/newsstand/candidates/service-bank.json");
const DEFAULT_OUTPUT_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/service-bank-proposals");
const PUBLIC = new Set(["APPROVED", "PUBLISHED", "CORRECTED"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const REQUIRED_TYPES = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "whats_new_sunnyvaile", "crossword", "did_you_know"];
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const reject = (message) => { throw new Error(`SERVICE_BANK_REJECT: ${message}`); };

function validDate(value) {
  if (!DATE.test(value || "")) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validUrl(value) {
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
}

function resolved(root, value) {
  return path.resolve(root, String(value || "").replace(/^\/+/, ""));
}

function safeDestination(value) {
  if (value === null) return true;
  if (typeof value !== "string" || !value || /[\\\u0000-\u001f]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  if (value.startsWith("#")) return true;
  return validUrl(value);
}

function readBoundJson(root, relative, label) {
  if (typeof relative !== "string" || !relative) reject(`${label} path is required`);
  const absolute = resolved(root, relative);
  if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) reject(`${label} does not resolve`);
  try { return { value: JSON.parse(fs.readFileSync(absolute, "utf8")), raw: fs.readFileSync(absolute) }; }
  catch (error) { reject(`${label} is not valid JSON: ${error.message}`); }
}

function validateApprovedReviewEvidence(item, root) {
  const producerPath = item.reviewEvidence.producer;
  const editorialPath = item.reviewEvidence.editorial;
  const voicePath = item.reviewEvidence.voice;
  if (typeof producerPath !== "string" || !producerPath || typeof editorialPath !== "string" || !editorialPath || typeof voicePath !== "string" || !voicePath) {
    reject(`${item.id} approved eligibility requires producer and independent editorial/voice receipts`);
  }
  if (editorialPath !== voicePath) reject(`${item.id} independent editorial and voice evidence must be the same exact semantic receipt`);
  const producer = readBoundJson(root, producerPath, `${item.id} producer receipt`).value;
  const independent = readBoundJson(root, editorialPath, `${item.id} independent receipt`).value;
  const chain = inspectProseReviewChain(producer, independent, { root });
  if (chain.errors.length) reject(`${item.id} review chain failed: ${chain.errors.join("; ")}`);
  if (producer.verdict !== "PASS" || independent.verdict !== "PASS") reject(`${item.id} approved eligibility requires PASS producer and independent receipts`);
  if (producer.candidateId !== item.id || independent.candidateId !== item.id) reject(`${item.id} review receipt candidate ID does not match bank item`);
  const manifest = readBoundJson(root, independent.artifact?.manifest?.path, `${item.id} independent artifact manifest`).value;
  if (manifest.reviewedContentSha256 !== item.reviewedContentSha256) reject(`${item.id} reviewed content hash does not match independent artifact manifest`);
  const reportBinding = independent.reviewer?.reportBinding;
  if (!reportBinding?.path || !/^[a-f0-9]{64}$/.test(reportBinding.sha256 || "")) reject(`${item.id} independent receipt lacks a bound raw Claude report`);
  const report = readBoundJson(root, reportBinding.path, `${item.id} raw Claude report`);
  if (sha256(report.raw) !== reportBinding.sha256) reject(`${item.id} raw Claude report hash changed`);
  const reportEntry = report.value?.judgment?.entries?.find(entry => entry?.candidateId === item.id);
  if (!reportEntry || reportEntry.verdict !== independent.verdict || canonicalJson(reportEntry.outcomes) !== canonicalJson(independent.outcomes) ||
      canonicalJson(reportEntry.factualReview) !== canonicalJson(independent.factualReview)) {
    reject(`${item.id} independent receipt does not preserve its raw Claude judgment`);
  }
}

export function reviewedContentSha256(item) {
  return sha256(canonicalJson({
    id: item.id, type: item.type, classification: item.classification,
    headline: item.headline, summary: item.summary, body: item.body,
    question: item.question || null, sourceLinks: item.sourceLinks,
    destination: item.destination, destinationLabel: item.destinationLabel,
    sourcePath: item.sourcePath, sourceId: item.sourceId, owner: item.owner,
    sourceSha256: item.sourceSha256 || null, eventDate: item.eventDate || null,
    availableUntil: item.availableUntil || null, freshness: item.freshness
  }));
}

function validateBank(bank, { root = ROOT, asOf }) {
  if (!bank || bank.schemaVersion !== "newsstand-service-bank-v1") reject("invalid bank schemaVersion");
  if (!validDate(bank.updatedAt)) reject("invalid bank updatedAt");
  if (!Array.isArray(bank.requiredTypes) || bank.requiredTypes.join("\n") !== REQUIRED_TYPES.join("\n")) reject("requiredTypes must be the eight governed service types in canonical order");
  if (!Array.isArray(bank.items)) reject("bank items must be an array");
  const ids = new Set();
  for (const item of bank.items) {
    if (!item || !item.id || ids.has(item.id)) reject(`duplicate or missing bank item id ${item && item.id || "(missing)"}`);
    ids.add(item.id);
    if (!REQUIRED_TYPES.includes(item.type)) reject(`${item.id} has unsupported type`);
    if (!item.headline || !item.summary || !Array.isArray(item.body) || !item.body.length || item.body.some((part) => typeof part !== "string" || !part.trim())) reject(`${item.id} lacks a complete body`);
    if (!item.sourcePath || !item.sourceId || !item.owner) reject(`${item.id} lacks source identity or owner`);
    if (!fs.existsSync(resolved(root, item.sourcePath))) reject(`${item.id} sourcePath does not resolve`);
    if (!safeDestination(item.destination)) reject(`${item.id} has unsafe destination`);
    if (!item.destinationLabel) reject(`${item.id} lacks destinationLabel`);
    if (item.question !== undefined && item.question !== null && (!item.question.text || !item.question.signature)) reject(`${item.id} has incomplete question`);
    if (!Array.isArray(item.sourceLinks) || item.sourceLinks.some((link) => !link || !link.label || !validUrl(link.url))) reject(`${item.id} has invalid sourceLinks`);
    if (!item.freshness || !validDate(item.freshness.lastCheckedAt) || !validDate(item.freshness.expiresAt) || !Array.isArray(item.freshness.recheckTriggers) || !item.freshness.recheckTriggers.length) reject(`${item.id} has incomplete freshness`);
    if (item.type === "whats_new_sunnyvaile") {
      if (!validDate(item.eventDate) || !validDate(item.availableUntil)) reject(`${item.id} requires valid eventDate and availableUntil`);
      if (item.eventDate > item.availableUntil) reject(`${item.id} eventDate is after availableUntil`);
    }
    if (!["CANDIDATE", "APPROVED"].includes(item.status) || !["INELIGIBLE", "ELIGIBLE"].includes(item.publicEligibility)) reject(`${item.id} has invalid eligibility state`);
    if (!item.reviewEvidence || !["accuracy", "editorial", "voice", "format", "owner", "safety"].every((key) => key in item.reviewEvidence)) reject(`${item.id} lacks review evidence shape`);
    for (const [gate, evidence] of Object.entries(item.reviewEvidence)) if (evidence !== null && !fs.existsSync(resolved(root, evidence))) reject(`${item.id} ${gate} review evidence does not resolve`);
    if (item.sourceSha256 && sha256(fs.readFileSync(resolved(root, item.sourcePath))) !== item.sourceSha256) reject(`${item.id} source hash changed`);
    if (item.publicEligibility === "ELIGIBLE" && !PUBLIC.has(item.status)) reject(`${item.id} is ELIGIBLE without approved status`);
    if (PUBLIC.has(item.status) && item.publicEligibility !== "ELIGIBLE") reject(`${item.id} approved state is not ELIGIBLE`);
    if (item.freshness.lastCheckedAt > asOf) reject(`${item.id} has a future lastCheckedAt`);
    if (PUBLIC.has(item.status)) {
      for (const gate of ["accuracy", "editorial", "voice", "format", "owner"]) if (!item.reviewEvidence[gate]) reject(`${item.id} approved eligibility lacks ${gate} evidence`);
      if (item.type === "mme_claio" && !item.reviewEvidence.safety) reject(`${item.id} Mme CLAi-O approval lacks safety evidence`);
      if (!/^[a-f0-9]{64}$/.test(item.reviewedContentSha256 || "") || item.reviewedContentSha256 !== reviewedContentSha256(item)) reject(`${item.id} reviewed content hash does not bind current content`);
      if (item.freshness.expiresAt < asOf) reject(`${item.id} has stale eligibility`);
      validateApprovedReviewEvidence(item, root);
    }
  }
}

function existingBankIds(columns) {
  return new Set((columns && columns.records || []).map((record) => record.bankItemId).filter(Boolean));
}

function priorBankRecords(columns, bankItemId, date) {
  return (columns && columns.records || []).filter((record) => record?.bankItemId === bankItemId && record.editionDate < date)
    .sort((left, right) => right.editionDate.localeCompare(left.editionDate) || String(right.id).localeCompare(String(left.id)));
}

function recordId(date, item) {
  return `DAILY-${date}-${String(item.type).replace(/_/g, "-").toUpperCase()}-${String(item.id).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase()}`;
}

function eventAvailability(item, date) {
  if (item.type !== "whats_new_sunnyvaile") return { available: true, reason: null };
  if (item.eventDate > date) return { available: false, reason: "EVENT_NOT_YET_AVAILABLE" };
  if (item.availableUntil < date) return { available: false, reason: "EVENT_RETIRED" };
  return { available: true, reason: null };
}

export function prepareServiceBankProposal({ date, bank, columns = { records: [] }, selections = {}, reuseAdmitted = false, root = ROOT }) {
  if (!validDate(date)) reject("--date must be a real YYYY-MM-DD date");
  validateBank(bank, { root, asOf: date });
  const used = existingBankIds(columns);
  const selected = {};
  const gaps = [];
  for (const type of REQUIRED_TYPES) {
    const options = bank.items.filter((item) => item.type === type).sort((a, b) => a.id.localeCompare(b.id));
    const requested = selections[type];
    if (requested && !options.some((item) => item.id === requested)) reject(`requested item ${requested} does not belong to ${type}`);
    if (requested && used.has(requested) && !reuseAdmitted) reject(`requested item ${requested} was already used by a dated Daily record`);
    const unused = options.filter((candidate) => !used.has(candidate.id));
    const requestedItem = requested && options.find((candidate) => candidate.id === requested);
    if (requestedItem && (columns.records || []).some((record) => record?.bankItemId === requestedItem.id && record.editionDate === date)) reject(`requested item ${requestedItem.id} already has a dated Daily record for ${date}`);
    if (requestedItem && !eventAvailability(requestedItem, date).available) reject(`requested item ${requestedItem.id} ${eventAvailability(requestedItem, date).reason.toLowerCase()}`);
    const available = unused.filter((candidate) => eventAvailability(candidate, date).available);
    const unusedApproved = available.filter((candidate) => PUBLIC.has(candidate.status) && candidate.publicEligibility === "ELIGIBLE" && candidate.freshness.expiresAt >= date);
    const reusableApproved = options.filter((candidate) => used.has(candidate.id) && eventAvailability(candidate, date).available &&
      PUBLIC.has(candidate.status) && candidate.publicEligibility === "ELIGIBLE" && candidate.freshness.expiresAt >= date &&
      !(columns.records || []).some((record) => record?.bankItemId === candidate.id && record.editionDate === date));
    const item = requested ? requestedItem : unusedApproved[0] || (reuseAdmitted ? reusableApproved[0] : null) || available[0] || null;
    if (!item) {
      const availability = unused.map((candidate) => eventAvailability(candidate, date));
      const reason = availability.some((result) => result.reason === "EVENT_NOT_YET_AVAILABLE") ? "EVENT_NOT_YET_AVAILABLE" :
        availability.some((result) => result.reason === "EVENT_RETIRED") ? "EVENT_RETIRED" : "NO_UNUSED_BANK_ITEM";
      gaps.push({ type, reason }); continue;
    }
    const ready = PUBLIC.has(item.status) && item.publicEligibility === "ELIGIBLE" && item.freshness.expiresAt >= date;
    const laneErrors = careerLaneErrors(item, date);
    if (laneErrors.length) reject(`${item.id}: ${laneErrors.join('; ')}`);
    selected[type] = {
      type,
      bankItemId: item.id,
      proposalState: ready ? "READY_FOR_INDEPENDENT_ADMISSION" : "CANDIDATE_NOT_READY",
      record: {
        id: recordId(date, item), editionDate: date, type: item.type, classification: item.classification,
        status: ready ? "APPROVED" : "CANDIDATE", headline: item.headline, summary: item.summary,
        body: item.body, question: item.question || null, sourceLinks: item.sourceLinks,
        sourcePath: item.sourcePath, sourceId: item.sourceId,
        ...(item.sourceSha256 ? { sourceSha256: item.sourceSha256 } : {}),
        ...(item.reviewedContentSha256 ? { reviewedContentSha256: item.reviewedContentSha256 } : {}),
        ...(item.type === "whats_new_sunnyvaile" ? { eventDate: item.eventDate, availableUntil: item.availableUntil } : {}),
        bankItemId: item.id,
        predecessorRecordId: reuseAdmitted && used.has(item.id) ? (priorBankRecords(columns, item.id, date)[0]?.id || null) : null, destination: item.destination, destinationLabel: item.destinationLabel,
        owner: item.owner, freshness: item.freshness, reviewEvidence: item.reviewEvidence,
        publicEligibility: ready ? "ELIGIBLE" : "INELIGIBLE"
      }
    };
  }
  const records = REQUIRED_TYPES.flatMap((type) => selected[type] ? [selected[type]] : []);
  const readyCount = records.filter((entry) => entry.proposalState === "READY_FOR_INDEPENDENT_ADMISSION").length;
  return {
    schemaVersion: "newsstand-service-bank-proposal-v1", mode: "PRIVATE_PROPOSAL_ONLY", editionDate: date,
    requiredTypes: REQUIRED_TYPES, records, gaps,
    counts: { required: REQUIRED_TYPES.length, proposed: records.length, ready: readyCount, candidate: records.length - readyCount, gaps: gaps.length },
    canonicalWrite: false, deployActionTaken: false
  };
}

function valueAfter(flag, args) { const index = args.indexOf(flag); return index === -1 ? null : args[index + 1]; }
function parseSelections(args) {
  const selections = {};
  for (let i = 0; i < args.length; i += 1) if (args[i] === "--item") {
    const [type, id] = String(args[i + 1] || "").split("=", 2);
    if (!REQUIRED_TYPES.includes(type) || !id || selections[type]) reject("--item must be unique type=bankItemId for a governed type");
    selections[type] = id;
  }
  return selections;
}

function main() {
  const args = process.argv.slice(2); const date = valueAfter("--date", args); const check = args.includes("--check"); const reuseAdmitted = args.includes("--reuse-admitted");
  const bankPath = path.resolve(valueAfter("--bank", args) || DEFAULT_BANK); const outputArg = valueAfter("--output", args);
  if (!date) reject("--date is required");
  if (!fs.existsSync(bankPath)) reject("bank file does not exist");
  if (!check && !outputArg) reject("--output is required unless --check is used");
  const bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
  const columns = JSON.parse(fs.readFileSync(path.join(ROOT, "content/daily-edition-columns.json"), "utf8"));
  const proposal = prepareServiceBankProposal({ date, bank, columns, selections: parseSelections(args), reuseAdmitted });
  const canonical = `${canonicalJson(proposal)}\n`;
  if (!check) { const output = path.resolve(outputArg); if (!output.startsWith(`${DEFAULT_OUTPUT_ROOT}${path.sep}`)) reject("--output must remain under the private service-bank proposal directory"); fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output, canonical); }
  console.log(`SERVICE BANK ${check ? "CHECK" : "PREPARE"} PASS date=${date} required=${proposal.counts.required} proposed=${proposal.counts.proposed} ready=${proposal.counts.ready} candidates=${proposal.counts.candidate} gaps=${proposal.counts.gaps} public_write=false sha256=${sha256(canonical)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
