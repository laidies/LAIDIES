#!/usr/bin/env node

// Local canonical Daily issue writer. It consumes one exact private envelope
// plus an independent checksum-bound admission. It cannot deploy or publish.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORE_PATH = path.join(ROOT, "content/newsstand-daily-issues.json");
const PRIVATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const EVIDENCE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/evidence");
const HASH = /^[a-f0-9]{64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const canonicalJson = (value) => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
};
const reject = (message) => { throw new Error(`DAILY_EDITION_PROMOTION_REJECT: ${message}`); };
const exactKeys = (value, keys, label) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) reject(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (actual.join("\n") !== expected.join("\n")) reject(`${label} keys do not match the contract`);
};

function checkedBoundFile(binding, readBoundFile, label) {
  exactKeys(binding, ["record", "sha256"], label);
  if (typeof binding.record !== "string" || !binding.record || !HASH.test(binding.sha256 || "") || typeof readBoundFile !== "function") {
    reject(`${label} exact record, SHA-256 and reader are required`);
  }
  const raw = readBoundFile(binding.record);
  if (typeof raw !== "string" || sha256(raw) !== binding.sha256) reject(`${label} bytes changed`);
  return raw;
}

function checkedBoundJson(binding, readBoundFile, label) {
  const raw = checkedBoundFile(binding, readBoundFile, label);
  try { return JSON.parse(raw); } catch { reject(`${label} is not valid JSON`); }
}

function validateCompletePageReview(review, decision, readBoundFile) {
  if (review.schemaVersion !== "laidies-newsstand-complete-daily-visual-review.v1" || review.verdict !== "PASS" ||
      review.editionDate !== decision.editionDate || review.envelopeSha256 !== decision.envelopeSha256 ||
      review.reviewScope !== "COMPLETE_DAILY_NEWSPAPER_PAGE" || review.defaultExperience !== "THE_DAILY" ||
      review.reviewer?.independentFromMaker !== true || review.reviewer?.artifactFirst !== true ||
      review.judgment?.fullPageInspected !== true || review.judgment?.looksLikeDailyNewspaper !== true ||
      review.judgment?.dailyIsDefault !== true || review.judgment?.articleAndServiceDesksShareOneIssue !== true ||
      !Array.isArray(review.screenshots) || review.screenshots.length < 2) {
    reject("complete-page visual review did not PASS the Daily newspaper experience");
  }
  const widths = new Set();
  for (const screenshot of review.screenshots) {
    if (screenshot.state !== "DAILY_DEFAULT" || !Number.isInteger(screenshot.width) || !Number.isInteger(screenshot.height)) {
      reject("complete-page visual review screenshot metadata is invalid");
    }
    checkedBoundFile({ record: screenshot.path, sha256: screenshot.sha256 }, readBoundFile, "completePageVisualReview.screenshots[]");
    widths.add(screenshot.width);
  }
  if (!widths.has(1440) || !widths.has(390)) reject("complete-page visual review lacks 1440 desktop and 390 mobile Daily-default screenshots");
}

function validateAliApproval(approval, decision, visualReviewSha256) {
  if (approval.schemaVersion !== "laidies-ali-artifact-verdict.v1" || approval.decision !== "APPROVE" ||
      approval.artifactKind !== "COMPLETE_DAILY_NEWSPAPER" || approval.editionDate !== decision.editionDate ||
      approval.envelopeSha256 !== decision.envelopeSha256 || approval.visualReviewSha256 !== visualReviewSha256 ||
      approval.authority !== "ALI_DIRECT_REVIEW") {
    reject("Ali approval does not bind the exact complete Daily newspaper");
  }
}

function validateEnvelope(value) {
  exactKeys(value, ["schemaVersion", "mode", "editionDate", "editorialTimeZone", "disposition", "status", "storyIds", "storySnapshots", "desks", "sourceIdentity", "canonicalWrite", "deployActionTaken"], "envelope");
  if (value.schemaVersion !== "daily-private-issue-v1" || value.mode !== "PRIVATE_DRAFT_ONLY" ||
      !DATE.test(value.editionDate || "") || value.editorialTimeZone !== "America/Vancouver" ||
      value.canonicalWrite !== false || value.deployActionTaken !== false) reject("input is not a private non-writing envelope");
  if (![["QUIET", "PRIVATE_QUIET_DRAFT"], ["CANDIDATES_PENDING_REVIEW", "PRIVATE_REVIEW_DRAFT"]]
      .some(([disposition, status]) => value.disposition === disposition && value.status === status)) reject("envelope disposition/status is invalid");
  if (!Array.isArray(value.storyIds) || value.storyIds.some((id) => typeof id !== "string" || !id) ||
      new Set(value.storyIds).size !== value.storyIds.length) reject("story IDs are invalid");
  if (!Array.isArray(value.storySnapshots) || value.storySnapshots.some((story) => !story || typeof story !== "object" || Array.isArray(story))) {
    reject("story snapshots are invalid");
  }
  if (value.storySnapshots.map((story) => story.id).join("\n") !== value.storyIds.join("\n")) {
    reject("story snapshots do not match story IDs");
  }
  exactKeys(value.sourceIdentity, ["radarPath", "radarSha256", "storiesPath", "storiesSha256", "columnsPath", "columnsSha256"], "sourceIdentity");
  const allowedReceiptPaths = [
    `operations/agents/aidb-intelligence-desk/daily/${value.editionDate}.md`,
    `operations/product-stewards/newsstand/editorial-intake/${value.editionDate}.md`
  ];
  if (!allowedReceiptPaths.includes(value.sourceIdentity.radarPath) ||
      value.sourceIdentity.storiesPath !== "content/newsstand-stories.js" ||
      value.sourceIdentity.columnsPath !== "content/daily-edition-columns.json" ||
      ![value.sourceIdentity.radarSha256, value.sourceIdentity.storiesSha256, value.sourceIdentity.columnsSha256].every((hash) => HASH.test(hash || ""))) {
    reject("source identity is invalid");
  }
  const sourceFiles = [
    [value.sourceIdentity.radarPath, value.sourceIdentity.radarSha256],
    [value.sourceIdentity.storiesPath, value.sourceIdentity.storiesSha256],
    [value.sourceIdentity.columnsPath, value.sourceIdentity.columnsSha256]
  ];
  for (const [sourcePath, expectedHash] of sourceFiles) {
    const absolute = path.join(ROOT, sourcePath);
    if (!fs.existsSync(absolute) || sha256(fs.readFileSync(absolute)) !== expectedHash) reject(`source bytes changed for ${sourcePath}`);
  }
  if (!Array.isArray(value.desks) || value.desks.length !== TYPES.length) reject("Daily issue contents are incomplete");
  const deskTypes = new Set();
  for (const desk of value.desks) {
    if (!desk || !TYPES.includes(desk.type) || deskTypes.has(desk.type)) reject("Daily desk types are invalid");
    deskTypes.add(desk.type);
    if (desk.state === "ready") {
      exactKeys(desk, ["type", "state", "recordId", "headline", "summary", "destination"], `ready desk ${desk.type}`);
      if (!desk.recordId || !desk.headline || !desk.summary || !(desk.destination === null || typeof desk.destination === "string")) reject(`ready desk ${desk.type} is invalid`);
    } else if (desk.state === "empty") {
      exactKeys(desk, ["type", "state", "recordId", "emptyState"], `empty desk ${desk.type}`);
      if (desk.recordId !== null || !desk.emptyState) reject(`empty desk ${desk.type} is invalid`);
    } else reject(`desk ${desk.type} state is invalid`);
  }
  const readyIds = value.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId);
  if (new Set(readyIds).size !== readyIds.length) reject("ready desk record IDs are duplicated");
  const columnData = JSON.parse(fs.readFileSync(path.join(ROOT, value.sourceIdentity.columnsPath), "utf8"));
  for (const desk of value.desks.filter((item) => item.state === "ready")) {
    const record = (columnData.records || []).find((item) => item.id === desk.recordId && item.editionDate === value.editionDate &&
      ["APPROVED", "PUBLISHED", "CORRECTED"].includes(item.status) && item.publicEligibility === "ELIGIBLE");
    if (!record || record.type !== desk.type || record.headline !== desk.headline || record.summary !== desk.summary ||
        (record.destination || null) !== desk.destination) reject(`ready desk ${desk.type} is not bound to admitted source content`);
  }
  const storiesContext = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, value.sourceIdentity.storiesPath), "utf8"), storiesContext, { timeout: 1000 });
  for (const [index, id] of value.storyIds.entries()) {
    const story = (storiesContext.window.NEWSSTAND_DATA && storiesContext.window.NEWSSTAND_DATA.stories || []).find((item) =>
      item.id === id && item.edition === "daily" && String(item.publishedAt || "").slice(0, 10) === value.editionDate &&
      ["published", "corrected"].includes(item.status));
    if (!story) reject(`story ${id} is not bound to admitted source content`);
    if (canonicalJson(story) !== canonicalJson(value.storySnapshots[index])) {
      reject(`story ${id} snapshot is not the complete admitted source record`);
    }
  }
  if (value.disposition === "QUIET" && (value.storyIds.length || readyIds.length)) reject("quiet issue contains publishable material");
  if (value.disposition === "CANDIDATES_PENDING_REVIEW" && !value.storyIds.length && !readyIds.length) reject("non-quiet issue contains no admitted material");
}

export function promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker, readBoundFile, now = new Date().toISOString() }) {
  exactKeys(store, ["schemaVersion", "owner", "issues"], "store");
  if (store.schemaVersion !== "daily-issues-v1" || store.owner !== "newsstand-daily" || !Array.isArray(store.issues)) reject("invalid canonical store");
  let parsedEnvelope;
  try { parsedEnvelope = JSON.parse(envelopeRaw); } catch { reject("envelope raw bytes are not valid JSON"); }
  if (canonicalJson(parsedEnvelope) !== canonicalJson(envelope)) reject("envelope raw/object mismatch");
  envelope = parsedEnvelope;
  validateEnvelope(envelope);
  const successorDecision = decision && ["daily-issue-successor-admission-v1", "daily-issue-successor-admission-v2"].includes(decision.schemaVersion);
  const currentDecision = decision && ["daily-issue-admission-v2", "daily-issue-successor-admission-v2"].includes(decision.schemaVersion);
  exactKeys(decision, successorDecision
    ? currentDecision
      ? ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole", "completePageVisualReview", "aliApproval"]
      : ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"]
    : currentDecision
      ? ["schemaVersion", "decision", "editionDate", "envelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole", "completePageVisualReview", "aliApproval"]
      : ["schemaVersion", "decision", "editionDate", "envelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"], "decision");
  if (successorDecision) {
    if (!['daily-issue-successor-admission-v1', 'daily-issue-successor-admission-v2'].includes(decision.schemaVersion) ||
        decision.decision !== "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" || !HASH.test(decision.predecessorEnvelopeSha256 || "")) {
      reject("independent decision does not admit a checksum-bound successor");
    }
  } else if (!['daily-issue-admission-v1', 'daily-issue-admission-v2'].includes(decision.schemaVersion) || decision.decision !== "ACCEPT_LOCAL_CANONICAL_WRITE") {
    reject("independent decision does not admit a local canonical write");
  }
  if (!HASH.test(decision.envelopeSha256 || "") || decision.envelopeSha256 !== sha256(envelopeRaw)) reject("decision envelope checksum mismatch");
  if (!maker || maker === decision.reviewedBy) reject("maker self-approval is forbidden");
  if (!/independent/i.test(decision.reviewedBy || "") || !/independent/i.test(decision.reviewerRole || "") ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(decision.reviewedAt || "") ||
      Date.parse(decision.reviewedAt) > Date.parse(now) + 300000 || Date.parse(decision.reviewedAt) < Date.parse(`${decision.editionDate}T00:00:00Z`)) {
    reject("independent reviewer identity/time is invalid");
  }
  if (decision.editionDate !== envelope.editionDate) reject("decision date does not match the envelope");
  if (currentDecision) {
    const visualRaw = checkedBoundFile(decision.completePageVisualReview, readBoundFile, "decision.completePageVisualReview");
    let visualReview;
    try { visualReview = JSON.parse(visualRaw); } catch { reject("decision.completePageVisualReview is not valid JSON"); }
    validateCompletePageReview(visualReview, decision, readBoundFile);
    const aliApproval = checkedBoundJson(decision.aliApproval, readBoundFile, "decision.aliApproval");
    validateAliApproval(aliApproval, decision, sha256(visualRaw));
  }
  const issue = {
    editionDate: envelope.editionDate,
    editorialTimeZone: envelope.editorialTimeZone,
    status: "complete",
    disposition: envelope.disposition.toLowerCase(),
    storyIds: envelope.storyIds,
    stories: envelope.storySnapshots,
    serviceRecordIds: envelope.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId),
    desks: envelope.desks,
    sourceIdentity: envelope.sourceIdentity,
    envelopeSha256: decision.envelopeSha256,
    admission: {
      decision: decision.decision,
      reviewedAt: decision.reviewedAt,
      reviewedBy: decision.reviewedBy,
      reviewerRole: decision.reviewerRole,
      ...(currentDecision ? {
        completePageVisualReview: decision.completePageVisualReview,
        aliApproval: decision.aliApproval
      } : {}),
      ...(successorDecision ? { predecessorEnvelopeSha256: decision.predecessorEnvelopeSha256 } : {})
    }
  };
  const sameDate = store.issues.filter((item) => item && item.editionDate === envelope.editionDate);
  if (sameDate.length > 1) reject(`duplicate canonical issue for ${envelope.editionDate}`);
  const existing = sameDate[0];
  if (!currentDecision && !existing) reject("legacy Daily admission cannot create a new issue without complete-page review and Ali approval");
  if (existing) {
    if (existing.envelopeSha256 === decision.envelopeSha256) {
      if (canonicalJson(existing) !== canonicalJson(issue)) {
        const expectedLegacyAdmission = { ...issue.admission };
        delete expectedLegacyAdmission.predecessorEnvelopeSha256;
        const metadataOnlyUpgrade = successorDecision && canonicalJson(existing.admission) === canonicalJson(expectedLegacyAdmission) &&
          canonicalJson({ ...existing, admission: issue.admission }) === canonicalJson(issue);
        if (!metadataOnlyUpgrade) reject(`canonical issue integrity mismatch for ${envelope.editionDate}`);
        return { store: { ...store, issues: store.issues.map((item) => item === existing ? issue : item) }, changed: true, issue };
      }
      return { store, changed: false, issue: existing };
    }
    if (!successorDecision || existing.envelopeSha256 !== decision.predecessorEnvelopeSha256 || Object.prototype.hasOwnProperty.call(existing, "stories")) {
      reject(`conflicting canonical issue for ${envelope.editionDate}`);
    }
    const predecessorEnvelope = { ...envelope };
    delete predecessorEnvelope.storySnapshots;
    if (sha256(`${canonicalJson(predecessorEnvelope)}\n`) !== decision.predecessorEnvelopeSha256) {
      reject(`successor does not reconstruct the exact predecessor envelope for ${envelope.editionDate}`);
    }
    const semanticIssue = (value) => ({
      editionDate: value.editionDate,
      editorialTimeZone: value.editorialTimeZone,
      status: value.status,
      disposition: value.disposition,
      storyIds: value.storyIds,
      serviceRecordIds: value.serviceRecordIds,
      desks: value.desks,
      sourceIdentity: value.sourceIdentity
    });
    if (canonicalJson(semanticIssue(existing)) !== canonicalJson(semanticIssue(issue))) {
      reject(`successor changes canonical issue content for ${envelope.editionDate}`);
    }
    const nextIssues = store.issues.map((item) => item === existing ? issue : item);
    return { store: { ...store, issues: nextIssues }, changed: true, issue };
  }
  if (successorDecision) reject(`successor has no canonical predecessor for ${envelope.editionDate}`);
  const next = { ...store, issues: [...store.issues, issue].sort((a, b) => a.editionDate.localeCompare(b.editionDate)) };
  return { store: next, changed: true, issue };
}

function argument(name, args) {
  const index = args.indexOf(name);
  return index === -1 ? null : args[index + 1];
}

function main() {
  const args = process.argv.slice(2);
  const envelopePath = path.resolve(argument("--envelope", args) || "");
  const decisionPath = path.resolve(argument("--decision", args) || "");
  const maker = argument("--maker", args);
  if (!envelopePath.startsWith(`${PRIVATE_ROOT}${path.sep}`) || !fs.existsSync(envelopePath)) reject("envelope must exist inside the private Daily directory");
  if (!decisionPath.startsWith(`${EVIDENCE_ROOT}${path.sep}`) || !fs.existsSync(decisionPath)) reject("decision must exist inside NewsStand evidence");
  const envelopeRaw = fs.readFileSync(envelopePath, "utf8");
  const envelope = JSON.parse(envelopeRaw);
  const decision = JSON.parse(fs.readFileSync(decisionPath, "utf8"));
  const store = JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
  const readBoundFile = (record) => {
    if (typeof record !== "string" || !record || record.startsWith("/") || record.includes("\\") || path.posix.normalize(record) !== record) {
      reject(`unsafe bound record ${record || ""}`);
    }
    const absolute = path.join(ROOT, record);
    if (!absolute.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) reject(`bound record is unavailable: ${record}`);
    return fs.readFileSync(absolute, "utf8");
  };
  const result = promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker, readBoundFile });
  if (result.changed) {
    const temporary = `${STORE_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, `${canonicalJson(result.store)}\n`, { flag: "wx" });
    fs.renameSync(temporary, STORE_PATH);
  }
  console.log(`DAILY EDITION LOCAL CANONICAL WRITE ${result.changed ? "PASS" : "IDEMPOTENT"} date=${result.issue.editionDate} envelope_sha256=${result.issue.envelopeSha256} deploy=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
