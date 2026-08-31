#!/usr/bin/env node

// Local canonical Daily issue writer. It consumes one exact private envelope
// plus an independent checksum-bound admission. It cannot deploy or publish.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { projectDailySourceRaw } from "./publish-daily-edition.mjs";
import { loadOrdinaryStoryCandidate, publishCandidateStory, vancouverDay } from "./validate-newsstand-ordinary-story-candidate.mjs";
import { loadServicePredecessor, validateServiceSelection } from "./newsstand-service-continuity.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORE_PATH = path.join(ROOT, "content/newsstand-daily-issues.json");
const PRIVATE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/release-pipeline-v1/daily-issues-private");
const EVIDENCE_ROOT = path.join(ROOT, "operations/product-stewards/newsstand/evidence");
const HASH = /^[a-f0-9]{64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const LEGACY_TYPES = ["paige_tip", "promptoscope", "career_life", "mme_claio", "song", "did_you_know", "town_note", "curiosity", "fiction"];
const CURRENT_TYPES = ["paige_tip", "career_life", "concept_week", "mme_claio", "dear_miss_jeeves", "behind_build", "around_town", "whats_new_sunnyvaile", "crossword", "song", "did_you_know", "town_note", "curiosity"];
const typesForDate = (date) => date >= "2026-08-23" ? CURRENT_TYPES : LEGACY_TYPES;
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

function readBoundPredecessorStories(binding, existing) {
  exactKeys(binding, ["path", "sha256"], "service revision predecessorStories");
  if (typeof binding.path !== "string" || !binding.path || !HASH.test(binding.sha256 || "")) reject("service revision predecessorStories binding is invalid");
  const absolute = path.resolve(ROOT, binding.path);
  if (!absolute.startsWith(`${EVIDENCE_ROOT}${path.sep}`) || !fs.existsSync(absolute)) reject("service revision predecessorStories must exist under NewsStand evidence");
  const raw = fs.readFileSync(absolute, "utf8");
  if (sha256(raw) !== binding.sha256 || binding.sha256 !== existing.sourceIdentity?.storiesSha256) {
    reject("service revision predecessorStories does not bind the exact predecessor source");
  }
  return raw;
}

function readBoundEvidence(binding, label) {
  exactKeys(binding, ["path", "sha256"], label);
  if (typeof binding.path !== "string" || !binding.path || !HASH.test(binding.sha256 || "")) reject(`${label} binding is invalid`);
  const absolute = path.resolve(ROOT, binding.path);
  if (!absolute.startsWith(`${EVIDENCE_ROOT}${path.sep}`) || !fs.existsSync(absolute)) reject(`${label} must exist under NewsStand evidence`);
  const raw = fs.readFileSync(absolute, "utf8");
  if (sha256(raw) !== binding.sha256) reject(`${label} checksum does not bind its evidence bytes`);
  try { return JSON.parse(raw); } catch { reject(`${label} is not valid JSON`); }
}

function validatePublishedBase(binding, currentStoriesRaw) {
  exactKeys(binding, ["deploymentId", "manifest", "verification"], "service revision publishedBase");
  if (typeof binding.deploymentId !== "string" || !/^[a-z0-9-]+$/.test(binding.deploymentId)) reject("service revision publishedBase deploymentId is invalid");
  const manifest = readBoundEvidence(binding.manifest, "service revision publishedBase manifest");
  if (manifest.schema !== "laidies-release-artifact-manifest/v1" || !HASH.test(manifest.identitySha256 || "") || !Array.isArray(manifest.files)) {
    reject("service revision publishedBase manifest is invalid");
  }
  if (manifest.files.some((entry) => !entry || typeof entry !== "object" || typeof entry.path !== "string" || !HASH.test(entry.sha256 || "")) ||
      sha256(manifest.files.map((entry) => `${entry.sha256}  ${entry.path}\n`).join("")) !== manifest.identitySha256) {
    reject("service revision publishedBase manifest identity is not computed from its file records");
  }
  const records = manifest.files.filter((entry) => entry && typeof entry === "object" &&
    String(entry.path || "").replace(/^\.\//, "") === "content/newsstand-stories.js");
  if (records.length !== 1 || !HASH.test(records[0].sha256 || "") || records[0].sha256 !== sha256(currentStoriesRaw)) {
    reject("service revision publishedBase manifest does not bind current newsstand stories bytes");
  }
  const verification = readBoundEvidence(binding.verification, "service revision publishedBase verification");
  exactKeys(verification, ["schemaVersion", "deploymentId", "artifactIdentitySha256", "sourcePath", "sourceSha256", "checkedAt", "origins", "limitation"], "service revision publishedBase verification");
  if (verification.schemaVersion !== "newsstand-published-base-verification-v1" ||
      verification.deploymentId !== binding.deploymentId || verification.artifactIdentitySha256 !== manifest.identitySha256 ||
      verification.sourcePath !== "content/newsstand-stories.js" || verification.sourceSha256 !== records[0].sha256 ||
      typeof verification.limitation !== "string" || !verification.limitation ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(verification.checkedAt || "") || Number.isNaN(Date.parse(verification.checkedAt))) {
    reject("service revision publishedBase verification does not bind the deployment, manifest identity, and source");
  }
  if (!Array.isArray(verification.origins) || verification.origins.length !== 2) reject("service revision publishedBase must include custom and immutable origin observations");
  const shortDeploymentId = binding.deploymentId.split("-")[0];
  if (!/^[a-z0-9]{8}$/.test(shortDeploymentId)) reject("service revision publishedBase deploymentId has no Pages short identifier");
  const expectedOrigins = new Map([
    ["https://laidies.ai", "https://laidies.ai/content/newsstand-stories.js"],
    [`https://${shortDeploymentId}.laidies-sunnyvaile.pages.dev`, `https://${shortDeploymentId}.laidies-sunnyvaile.pages.dev/content/newsstand-stories.js`]
  ]);
  for (const origin of verification.origins) {
    exactKeys(origin, ["origin", "url", "status", "sha256", "matched"], "service revision publishedBase origin observation");
    const expectedUrl = expectedOrigins.get(origin.origin);
    if (!expectedUrl || origin.url !== expectedUrl || origin.status !== 200 || origin.sha256 !== verification.sourceSha256 || origin.matched !== true) {
      reject("service revision publishedBase origin is not an observed matching source");
    }
    expectedOrigins.delete(origin.origin);
  }
  if (expectedOrigins.size) reject("service revision publishedBase must include custom and immutable origin observations");
}

function validateEnvelope(value, root = ROOT) {
  const hasFrontPaige = value && Object.prototype.hasOwnProperty.call(value, "frontPaigeStoryId");
  const hasWeekly = value && Object.prototype.hasOwnProperty.call(value, "weeklyStoryId");
  exactKeys(value, ["schemaVersion", "mode", "editionDate", "editorialTimeZone", "disposition", "status", "storyIds", "storySnapshots", "desks", "sourceIdentity", "canonicalWrite", "deployActionTaken", ...(hasFrontPaige ? ["frontPaigeStoryId"] : []), ...(hasWeekly ? ["weeklyStoryId"] : [])], "envelope");
  if (value.schemaVersion !== "daily-private-issue-v1" || value.mode !== "PRIVATE_DRAFT_ONLY" ||
      !DATE.test(value.editionDate || "") || value.editorialTimeZone !== "America/Vancouver" ||
      value.canonicalWrite !== false || value.deployActionTaken !== false) reject("input is not a private non-writing envelope");
  if (![["QUIET", "PRIVATE_QUIET_DRAFT"], ["SERVICE_READY", "PRIVATE_REVIEW_DRAFT"], ["CANDIDATES_PENDING_REVIEW", "PRIVATE_REVIEW_DRAFT"]]
      .some(([disposition, status]) => value.disposition === disposition && value.status === status)) reject("envelope disposition/status is invalid");
  if (!Array.isArray(value.storyIds) || value.storyIds.some((id) => typeof id !== "string" || !id) ||
      new Set(value.storyIds).size !== value.storyIds.length) reject("story IDs are invalid");
  if (hasFrontPaige && !(value.frontPaigeStoryId === null || /^front-paige-[a-z0-9-]+$/.test(value.frontPaigeStoryId))) reject("Front PAiGE story ID is invalid");
  if (hasWeekly && !(value.weeklyStoryId === null || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.weeklyStoryId))) reject("Weekly story ID is invalid");
  if (!Array.isArray(value.storySnapshots) || value.storySnapshots.some((story) => !story || typeof story !== "object" || Array.isArray(story))) {
    reject("story snapshots are invalid");
  }
  if (value.storySnapshots.map((story) => story.id).join("\n") !== value.storyIds.join("\n")) {
    reject("story snapshots do not match story IDs");
  }
  const candidateBinding = value.sourceIdentity?.ordinaryCandidate;
  exactKeys(value.sourceIdentity, ["radarPath", "radarSha256", "storiesPath", "storiesSha256", "columnsPath", "columnsSha256", ...(candidateBinding ? ["ordinaryCandidate"] : []), ...(value.sourceIdentity.servicePredecessor ? ["servicePredecessor"] : [])], "sourceIdentity");
  const candidate = candidateBinding ? loadOrdinaryStoryCandidate(candidateBinding, { root, date: value.editionDate }).story : null;
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
    const absolute = path.join(root, sourcePath);
    if (!fs.existsSync(absolute) || sha256(fs.readFileSync(absolute)) !== expectedHash) reject(`source bytes changed for ${sourcePath}`);
  }
  const types = typesForDate(value.editionDate);
  if (!Array.isArray(value.desks) || value.desks.length !== types.length) reject("Daily issue contents are incomplete");
  const deskTypes = new Set();
  for (const desk of value.desks) {
    if (!desk || !types.includes(desk.type) || deskTypes.has(desk.type)) reject("Daily desk types are invalid");
    deskTypes.add(desk.type);
    if (desk.state === "ready") {
      exactKeys(desk, ["type", "state", "recordId", "headline", "summary", "destination", ...(desk.carriedFrom ? ["carriedFrom"] : [])], `ready desk ${desk.type}`);
      if (!desk.recordId || !desk.headline || !desk.summary || !(desk.destination === null || typeof desk.destination === "string")) reject(`ready desk ${desk.type} is invalid`);
    } else if (desk.state === "empty") {
      exactKeys(desk, ["type", "state", "recordId", "emptyState"], `empty desk ${desk.type}`);
      if (desk.recordId !== null || !desk.emptyState) reject(`empty desk ${desk.type} is invalid`);
    } else reject(`desk ${desk.type} state is invalid`);
  }
  const readyIds = value.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId);
  if (new Set(readyIds).size !== readyIds.length) reject("ready desk record IDs are duplicated");
  const columnData = JSON.parse(fs.readFileSync(path.join(root, value.sourceIdentity.columnsPath), "utf8"));
  const predecessor = value.sourceIdentity.servicePredecessor ? loadServicePredecessor(value.sourceIdentity.servicePredecessor, {
    root, date: value.editionDate, columns: columnData, storiesRaw: fs.readFileSync(path.join(root, value.sourceIdentity.storiesPath), 'utf8')
  }) : null;
  for (const desk of value.desks.filter((item) => item.state === "ready")) {
    const record = (columnData.records || []).find((item) => item.id === desk.recordId && item.editionDate <= value.editionDate &&
      ["APPROVED", "PUBLISHED", "CORRECTED"].includes(item.status) && item.publicEligibility === "ELIGIBLE" &&
      item.freshness && item.freshness.expiresAt >= value.editionDate);
    if (!record || record.type !== desk.type || record.headline !== desk.headline || record.summary !== desk.summary ||
        (record.destination || null) !== desk.destination) reject(`ready desk ${desk.type} is not bound to admitted source content`);
  }
  const storiesContext = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, value.sourceIdentity.storiesPath), "utf8"), storiesContext, { timeout: 1000 });
  validateServiceSelection({ desks: value.desks, columns: columnData, date: value.editionDate, predecessor, canonicalIssue: storiesContext.window.NEWSSTAND_DATA.publications?.daily?.issue });
  const canonicalStories = storiesContext.window.NEWSSTAND_DATA.stories || [];
  if (candidate && (!value.storyIds.includes(candidate.id) || canonicalStories.some(story => story.id === candidate.id || story.slug === candidate.slug))) reject("ordinary candidate is absent from issue or duplicates an incumbent");
  for (const [index, id] of value.storyIds.entries()) {
    if (candidate?.id === id) {
      if (canonicalJson(candidate) !== canonicalJson(value.storySnapshots[index])) reject("candidate snapshot differs from the exact reviewed private record");
      continue;
    }
    const story = (storiesContext.window.NEWSSTAND_DATA && storiesContext.window.NEWSSTAND_DATA.stories || []).find((item) =>
      item.id === id && item.edition === "daily" && vancouverDay(item.publishedAt) === value.editionDate &&
      ["published", "corrected"].includes(item.status));
    if (!story) reject(`story ${id} is not bound to admitted source content`);
    if (canonicalJson(story) !== canonicalJson(value.storySnapshots[index])) {
      reject(`story ${id} snapshot is not the complete admitted source record`);
    }
  }
  if (value.frontPaigeStoryId) {
    const feature = (storiesContext.window.NEWSSTAND_DATA && storiesContext.window.NEWSSTAND_DATA.stories || []).find((item) =>
      item.id === value.frontPaigeStoryId && item.edition === "daily" && /^front-paige-/.test(item.id) &&
      ["published", "corrected"].includes(item.status) && item.sourceApproval && item.sourceApproval.status === "approved");
    if (!feature || value.storyIds.includes(value.frontPaigeStoryId)) reject("Front PAiGE is not an admitted persistent feature");
  }
  if (value.weeklyStoryId) {
    const weekly = (storiesContext.window.NEWSSTAND_DATA && storiesContext.window.NEWSSTAND_DATA.stories || []).find((item) =>
      item.id === value.weeklyStoryId && item.edition === "weekly" && ["published", "corrected"].includes(item.status) &&
      item.sourceApproval && item.sourceApproval.status === "approved");
    if (!weekly) reject("Weekly continuity story is not admitted");
  }
  const weeklyPublication = storiesContext.window.NEWSSTAND_DATA.publications?.weekly;
  const currentWeeklyId = weeklyPublication?.status === "current" ? weeklyPublication.storyId : null;
  if ((value.weeklyStoryId || null) !== (currentWeeklyId || null) ||
      (weeklyPublication?.status === "current" && (!currentWeeklyId || weeklyPublication.editionDate > value.editionDate))) {
    reject("Weekly continuity must match the exact current canonical pointer");
  }
  if (value.disposition === "QUIET" && (value.storyIds.length || readyIds.length)) reject("quiet issue contains publishable material");
  if (value.disposition === "SERVICE_READY" && !readyIds.length && !value.storyIds.length) reject("service-ready issue contains no admitted material");
  if (value.disposition === "CANDIDATES_PENDING_REVIEW" && !value.storyIds.length && !readyIds.length) reject("non-quiet issue contains no admitted material");
}

export function promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker, now = new Date().toISOString(), root = ROOT }) {
  exactKeys(store, ["schemaVersion", "owner", "issues"], "store");
  if (store.schemaVersion !== "daily-issues-v1" || store.owner !== "newsstand-daily" || !Array.isArray(store.issues)) reject("invalid canonical store");
  let parsedEnvelope;
  try { parsedEnvelope = JSON.parse(envelopeRaw); } catch { reject("envelope raw bytes are not valid JSON"); }
  if (canonicalJson(parsedEnvelope) !== canonicalJson(envelope)) reject("envelope raw/object mismatch");
  envelope = parsedEnvelope;
  validateEnvelope(envelope, root);
  if (envelope.sourceIdentity.servicePredecessor) loadServicePredecessor(envelope.sourceIdentity.servicePredecessor, {
    root, date: envelope.editionDate, columns: JSON.parse(fs.readFileSync(path.join(root, envelope.sourceIdentity.columnsPath), 'utf8')), reviewedAt: decision.reviewedAt
  });
  const successorDecision = decision && decision.schemaVersion === "daily-issue-successor-admission-v1";
  const newsRevisionDecision = decision && decision.schemaVersion === "daily-issue-news-revision-admission-v1";
  const serviceRevisionDecision = decision && decision.schemaVersion === "daily-issue-service-revision-admission-v1";
  const hasPredecessorStories = serviceRevisionDecision && Object.prototype.hasOwnProperty.call(decision, "predecessorStories");
  const hasPublishedBase = serviceRevisionDecision && Object.prototype.hasOwnProperty.call(decision, "publishedBase");
  if (serviceRevisionDecision && hasPredecessorStories === hasPublishedBase) reject("service revision must bind exactly one predecessorStories or publishedBase proof");
  exactKeys(decision, newsRevisionDecision
    ? ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "addedStoryIds", "reviewedAt", "reviewedBy", "reviewerRole"]
    : successorDecision
    ? ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"]
    : serviceRevisionDecision
      ? ["schemaVersion", "decision", "editionDate", "envelopeSha256", "predecessorEnvelopeSha256", hasPredecessorStories ? "predecessorStories" : "publishedBase", "addedServiceRecordIds", "reviewedAt", "reviewedBy", "reviewerRole"]
      : ["schemaVersion", "decision", "editionDate", "envelopeSha256", "reviewedAt", "reviewedBy", "reviewerRole"], "decision");
  if (newsRevisionDecision) {
    if (decision.decision !== "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" || !HASH.test(decision.predecessorEnvelopeSha256 || "") || !Array.isArray(decision.addedStoryIds) || decision.addedStoryIds.length !== 1 || !envelope.sourceIdentity.ordinaryCandidate) reject("news revision requires exactly one reviewed ordinary candidate and predecessor");
  } else if (successorDecision) {
    if (decision.decision !== "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" || !HASH.test(decision.predecessorEnvelopeSha256 || "")) {
      reject("independent decision does not admit a checksum-bound successor");
    }
  } else if (serviceRevisionDecision) {
    if (decision.decision !== "ACCEPT_LOCAL_CANONICAL_SUCCESSOR" || !HASH.test(decision.predecessorEnvelopeSha256 || "") ||
        !Array.isArray(decision.addedServiceRecordIds) || !decision.addedServiceRecordIds.length ||
        decision.addedServiceRecordIds.some((id) => typeof id !== "string" || !id) ||
        new Set(decision.addedServiceRecordIds).size !== decision.addedServiceRecordIds.length) {
      reject("independent decision does not admit a checksum-bound service revision");
    }
  } else if (decision.schemaVersion !== "daily-issue-admission-v1" || decision.decision !== "ACCEPT_LOCAL_CANONICAL_WRITE") {
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
  const ordinary = envelope.sourceIdentity.ordinaryCandidate ? loadOrdinaryStoryCandidate(envelope.sourceIdentity.ordinaryCandidate, { root, date: envelope.editionDate }) : null;
  if (ordinary) {
    if (ordinary.maker !== maker || ordinary.maker === decision.reviewedBy) reject("candidate maker identity differs from issue maker or self-admits");
    if (successorDecision || serviceRevisionDecision) reject("ordinary candidate requires initial admission or explicit news revision, not generic/service successor");
    if (sha256(ordinary.publicationBaseRaw) !== envelope.sourceIdentity.storiesSha256) reject("ordinary candidate publication base does not match envelope source");
    if (Date.parse(decision.reviewedAt) < Date.parse(ordinary.reviewedAt)) reject("issue admission cannot precede independent story review");
    const day = vancouverDay(decision.reviewedAt);
    if (day !== envelope.editionDate) reject("ordinary story publication must be admitted on its Vancouver issue date");
  }
  const issue = {
    editionDate: envelope.editionDate,
    editorialTimeZone: envelope.editorialTimeZone,
    status: "complete",
    disposition: envelope.disposition.toLowerCase(),
    ...(Object.prototype.hasOwnProperty.call(envelope, "frontPaigeStoryId") ? { frontPaigeStoryId: envelope.frontPaigeStoryId } : {}),
    ...(Object.prototype.hasOwnProperty.call(envelope, "weeklyStoryId") ? { weeklyStoryId: envelope.weeklyStoryId } : {}),
    storyIds: envelope.storyIds,
    stories: envelope.storySnapshots.map(story => ordinary?.story.id === story.id ? publishCandidateStory(story, decision.reviewedAt) : story),
    serviceRecordIds: envelope.desks.filter((desk) => desk.state === "ready").map((desk) => desk.recordId),
    desks: envelope.desks,
    sourceIdentity: envelope.sourceIdentity,
    envelopeSha256: decision.envelopeSha256,
    admission: {
      decision: decision.decision,
      reviewedAt: decision.reviewedAt,
      reviewedBy: decision.reviewedBy,
      reviewerRole: decision.reviewerRole,
      ...((successorDecision || serviceRevisionDecision || newsRevisionDecision) ? { predecessorEnvelopeSha256: decision.predecessorEnvelopeSha256 } : {})
    }
  };
  const sameDate = store.issues.filter((item) => item && item.editionDate === envelope.editionDate);
  if (sameDate.length > 1) reject(`duplicate canonical issue for ${envelope.editionDate}`);
  const existing = sameDate[0];
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
    if (ordinary && !newsRevisionDecision) reject("existing issue requires explicit append-only news revision");
    if (newsRevisionDecision) {
      if (existing.envelopeSha256 !== decision.predecessorEnvelopeSha256) reject("news revision predecessor has changed");
      for (const field of ["editionDate", "editorialTimeZone", "status", "frontPaigeStoryId", "weeklyStoryId", "serviceRecordIds", "desks"]) {
        if (canonicalJson(existing[field] ?? null) !== canonicalJson(issue[field] ?? null)) reject(`news revision changes protected ${field}`);
      }
      const additions = issue.storyIds.filter(id => !existing.storyIds.includes(id));
      if (canonicalJson(additions) !== canonicalJson(decision.addedStoryIds) || additions[0] !== ordinary.story.id || issue.storyIds.length !== existing.storyIds.length + 1) reject("news revision additions do not match exact independent decision");
      for (const [index, id] of existing.storyIds.entries()) {
        if (issue.storyIds[index] !== id || canonicalJson(existing.stories[index]) !== canonicalJson(issue.stories[index])) reject("news revision rewrites or reorders existing news");
      }
      // The source hash is checked above against the current transaction base.
      // A news append cannot change a service record or the column authority.
      if (existing.sourceIdentity.columnsSha256 !== issue.sourceIdentity.columnsSha256) reject("news revision changes service source bytes");
      return { store: { ...store, issues: store.issues.map(item => item === existing ? issue : item) }, changed: true, issue };
    }
    if (serviceRevisionDecision) {
      if (existing.envelopeSha256 !== decision.predecessorEnvelopeSha256) reject(`conflicting canonical issue for ${envelope.editionDate}`);
      const currentStoriesRaw = fs.readFileSync(path.join(ROOT, existing.sourceIdentity.storiesPath), "utf8");
      if (hasPredecessorStories) {
        const predecessorStoriesRaw = readBoundPredecessorStories(decision.predecessorStories, existing);
        const columns = JSON.parse(fs.readFileSync(path.join(ROOT, existing.sourceIdentity.columnsPath), "utf8"));
        const expectedCurrentStoriesRaw = projectDailySourceRaw({ raw: predecessorStoriesRaw, issue: existing, columns });
        if (currentStoriesRaw !== expectedCurrentStoriesRaw || sha256(expectedCurrentStoriesRaw) !== envelope.sourceIdentity.storiesSha256) {
          reject(`service revision stories source is not the exact predecessor publication projection for ${envelope.editionDate}`);
        }
      } else {
        validatePublishedBase(decision.publishedBase, currentStoriesRaw);
      }
      const preserve = (field) => canonicalJson(existing[field] ?? null) === canonicalJson(issue[field] ?? null);
      for (const field of ["editionDate", "editorialTimeZone", "status", "disposition", "storyIds", "stories", "frontPaigeStoryId", "weeklyStoryId"]) {
        if (!preserve(field)) reject(`service revision changes protected ${field} for ${envelope.editionDate}`);
      }
      const previousSource = existing.sourceIdentity || {};
      const nextSource = issue.sourceIdentity || {};
      if (previousSource.radarPath !== nextSource.radarPath || previousSource.radarSha256 !== nextSource.radarSha256 ||
          previousSource.storiesPath !== nextSource.storiesPath ||
          previousSource.columnsPath !== nextSource.columnsPath) reject(`service revision changes protected source identity for ${envelope.editionDate}`);
      const oldDesks = new Map((existing.desks || []).map((desk) => [desk.type, desk]));
      const additions = [];
      for (const desk of issue.desks) {
        const previous = oldDesks.get(desk.type);
        if (!previous) reject(`service revision changes desk membership for ${envelope.editionDate}`);
        if (previous.state === "ready") {
          if (canonicalJson(previous) !== canonicalJson(desk)) reject(`service revision changes existing ready desk ${desk.type}`);
        } else if (previous.state === "empty" && desk.state === "ready") {
          additions.push(desk.recordId);
        } else if (canonicalJson(previous) !== canonicalJson(desk)) {
          reject(`service revision changes existing empty desk ${desk.type}`);
        }
      }
      if (canonicalJson([...additions].sort()) !== canonicalJson([...decision.addedServiceRecordIds].sort())) {
        reject(`service revision additions do not match the independent decision`);
      }
      const nextIssues = store.issues.map((item) => item === existing ? issue : item);
      return { store: { ...store, issues: nextIssues }, changed: true, issue };
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
  if (successorDecision || serviceRevisionDecision || newsRevisionDecision) reject(`successor has no canonical predecessor for ${envelope.editionDate}`);
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
  const result = promoteDailyIssue({ store, envelope, envelopeRaw, decision, maker });
  if (result.changed) {
    const temporary = `${STORE_PATH}.tmp-${process.pid}`;
    fs.writeFileSync(temporary, `${canonicalJson(result.store)}\n`, { flag: "wx" });
    fs.renameSync(temporary, STORE_PATH);
  }
  console.log(`DAILY EDITION LOCAL CANONICAL WRITE ${result.changed ? "PASS" : "IDEMPOTENT"} date=${result.issue.editionDate} envelope_sha256=${result.issue.envelopeSha256} deploy=false`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
