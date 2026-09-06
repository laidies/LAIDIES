import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const SHA256 = /^[a-f0-9]{64}$/;
const PRIVATE_NEWSSTAND_PREFIX = "operations/product-stewards/newsstand/";

const stable = value => value === null || typeof value !== "object" ? JSON.stringify(value) :
  Array.isArray(value) ? `[${value.map(stable).join(",")}]` :
    `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

function calendarDate(value) {
  const match = typeof value === "string" && value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.getUTCFullYear() === Number(match[1]) && date.getUTCMonth() === Number(match[2]) - 1 && date.getUTCDate() === Number(match[3]);
}

function instant(value) {
  const match = typeof value === "string" && value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/);
  if (!match || !calendarDate(`${match[1]}-${match[2]}-${match[3]}`) || Number(match[4]) > 23 || Number(match[5]) > 59 || (match[6] && Number(match[6]) > 59) || !Number.isFinite(Date.parse(value))) return false;
  return true;
}

function vancouverDay(value) {
  if (!instant(value)) return "";
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

function previousVancouverDay(day) {
  if (!calendarDate(day)) return "";
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function exactBinding(left, right) { return stable(left) === stable(right); }
function fail(message) { throw new Error(`OVERNIGHT_FRESHNESS_REJECT: ${message}`); }

function requirePrivateBinding(binding, label) {
  const normalized = binding && typeof binding.path === "string" ? path.posix.normalize(binding.path) : "";
  if (!binding || typeof binding.path !== "string" || path.posix.isAbsolute(binding.path) || !normalized.startsWith(PRIVATE_NEWSSTAND_PREFIX) || !SHA256.test(binding.sha256 || "")) fail(`${label} requires a SHA-256-bound private NewsStand path`);
  return normalized;
}

function privateFile(root, binding, label) {
  const normalized = requirePrivateBinding(binding, label);
  const base = path.resolve(root);
  const store = path.resolve(base, PRIVATE_NEWSSTAND_PREFIX);
  const file = path.resolve(base, normalized);
  if (!file.startsWith(`${store}${path.sep}`) || !fs.existsSync(file)) fail(`${label} is missing or outside the private NewsStand store`);
  const realStore = fs.realpathSync(store);
  const realFile = fs.realpathSync(file);
  if (!realFile.startsWith(`${realStore}${path.sep}`)) fail(`${label} resolves outside the private NewsStand store`);
  return file;
}

export function readPrivateNewsstandBinding(root, binding, label = "binding") {
  const file = privateFile(root, binding, label);
  const raw = fs.readFileSync(file, "utf8");
  if (sha256(raw) !== binding.sha256) fail(`${label} SHA-256 mismatch`);
  return raw;
}

function parsedBinding(readBinding, binding, label) {
  const raw = readBinding(binding, label);
  try { return { raw, value: JSON.parse(raw) }; } catch { fail(`${label} must contain JSON`); }
}

function captureBinding(raw, label) {
  try { return JSON.parse(raw); } catch { fail(`${label} must contain a structured JSON capture`); }
}

function requireExcerpt(value, content, label) {
  if (typeof value !== "string" || value.trim().length < 40 || typeof content !== "string" || !content.includes(value)) fail(`${label} needs a meaningful exact currentExcerpt inside capture content`);
}

function sourceCapture(raw, source, check) {
  const capture = captureBinding(raw, `source ${source.id} current evidence`);
  if (!capture || capture.schemaVersion !== "laidies-newsstand-current-source-capture.v1" || capture.sourceUrl !== source.url || capture.capturedAt !== check.currentCheckedAt || typeof capture.content !== "string") {
    fail(`source ${source.id} current evidence must bind its source URL, capture timestamp, and content`);
  }
  return capture;
}

function validHttpUrl(value) {
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname); } catch { return false; }
}

function developmentCapture(raw, check) {
  const capture = captureBinding(raw, "development check evidence");
  const urls = capture && capture.sourceUrls;
  if (!capture || capture.schemaVersion !== "laidies-newsstand-development-capture.v1" || capture.query !== check.query || capture.capturedAt !== check.checkedAt || !Array.isArray(urls) || !urls.length || new Set(urls).size !== urls.length || urls.some(url => !validHttpUrl(url)) || typeof capture.content !== "string") {
    fail("development check evidence must bind its query, capture timestamp, fetched source URLs, and content");
  }
  return capture;
}

function validateTimestamp(value, publicationDate, checkedAt, label) {
  if (!instant(value) || vancouverDay(value) !== publicationDate || Date.parse(value) > Date.parse(checkedAt)) fail(`${label} must be an actual timestamp on the publication day no later than checkedAt`);
}

/**
 * Validates maker-recorded overnight source/development freshness. It is an
 * integrity and completeness check only. The captures preserve an auditable
 * operator record of source material; matching bytes, URLs and excerpts do
 * not cryptographically prove a fetch, semantic truth, or editorial judgment.
 */
export function validateOvernightFreshness(record, {
  candidate,
  originalCandidate,
  root = process.cwd(),
  now = new Date().toISOString(),
  readBinding = null,
  admittedHistoricalBase = false
} = {}) {
  const read = readBinding ? (binding, label) => readBinding(root, binding, label) :
    (binding, label) => readPrivateNewsstandBinding(root, binding, label);
  // Callers may inject the existing candidate reader, but evidence never gets
  // to choose its own storage boundary.
  const readChecked = (binding, label) => {
    privateFile(root, binding, label);
    const raw = read(binding, label);
    if (typeof raw !== "string" || sha256(raw) !== binding.sha256) fail(`${label} SHA-256 mismatch`);
    return raw;
  };
  if (!record || record.schemaVersion !== "laidies-newsstand-overnight-freshness.v1") fail("schemaVersion is invalid");
  if (!candidate || !originalCandidate || candidate.overnightFreshness === undefined) fail("candidate wrapper and original candidate are required");
  if (originalCandidate.overnightFreshness !== undefined) fail("overnight freshness cannot be chained");
  const expectedWrapper = structuredClone(originalCandidate);
  expectedWrapper.editionDate = candidate.editionDate;
  expectedWrapper.overnightFreshness = candidate.overnightFreshness;
  if (!exactBinding(candidate, expectedWrapper)) fail("candidate wrapper changed reviewed candidate data");
  if (!calendarDate(candidate.editionDate) || record.publicationDate !== candidate.editionDate) fail("publication date does not match candidate edition date");
  if (originalCandidate.editionDate !== previousVancouverDay(candidate.editionDate)) fail("overnight freshness is limited to the immediately following Vancouver calendar day");
  if (record.candidateId !== originalCandidate.candidateId || candidate.candidateId !== originalCandidate.candidateId || record.storySha256 !== originalCandidate.storySha256 || record.storySha256 !== sha256(stable(originalCandidate.story)) || !SHA256.test(record.storySha256 || "")) fail("candidate identity or story hash differs from the reviewed candidate");
  if (!exactBinding(record.claimMap, originalCandidate.claimMap) || !exactBinding(record.independentReview, originalCandidate.reviewEvidence?.independent)) fail("original claim-map or independent-review binding differs");
  if (!record.reviewedCandidate || !candidate.overnightFreshness) fail("reviewed-candidate and overnight-freshness bindings are required");
  const wrappedRecord = parsedBinding(readChecked, candidate.overnightFreshness, "candidate overnightFreshness");
  if (!exactBinding(wrappedRecord.value, record)) fail("candidate overnightFreshness does not bind this exact record");
  const originalRaw = readChecked(record.reviewedCandidate, "reviewed candidate");
  let boundOriginal;
  try { boundOriginal = JSON.parse(originalRaw); } catch { fail("reviewed candidate must contain JSON"); }
  if (!exactBinding(boundOriginal, originalCandidate)) fail("reviewed-candidate binding does not contain the original candidate");
  const independent = parsedBinding(readChecked, record.independentReview, "original independent review").value;
  if (!instant(independent.reviewedAt)) fail("original independent review has no actual reviewedAt timestamp");
  if (record.disposition !== "NO_MATERIAL_CHANGE" || typeof record.checker !== "string" || !record.checker.trim()) fail("a named checker and NO_MATERIAL_CHANGE disposition are required");
  if (!instant(now) || !instant(record.checkedAt) || vancouverDay(record.checkedAt) !== candidate.editionDate || Date.parse(record.checkedAt) > Date.parse(now)) fail("checkedAt must be a non-future actual timestamp on the publication day");
  if (!admittedHistoricalBase && vancouverDay(now) !== candidate.editionDate) fail("fresh overnight publication must run on its publication day");
  if (Date.parse(record.checkedAt) <= Date.parse(independent.reviewedAt) || Date.parse(record.checkedAt) <= Date.parse(originalCandidate.story?.updatedAt) || Date.parse(record.checkedAt) <= Date.parse(originalCandidate.story?.lastCheckedAt) || vancouverDay(independent.reviewedAt) !== originalCandidate.editionDate || vancouverDay(originalCandidate.story?.updatedAt) !== originalCandidate.editionDate || vancouverDay(originalCandidate.story?.lastCheckedAt) !== originalCandidate.editionDate) fail("morning check must follow the prior-evening review and story check");
  if (!Array.isArray(originalCandidate.sources) || !Array.isArray(originalCandidate.story?.sources) || !Array.isArray(record.sourceChecks)) fail("source checks and original sources are required");
  if (record.sourceChecks.length !== originalCandidate.sources.length || new Set(record.sourceChecks.map(item => item?.id)).size !== record.sourceChecks.length) fail("source checks must cover each original source exactly once");
  for (const source of originalCandidate.sources) {
    const publicSource = originalCandidate.story.sources.find(item => item.id === source.id && item.url === source.url);
    const check = record.sourceChecks.find(item => item?.id === source.id && item?.url === source.url);
    if (!publicSource || !check || check.disposition !== "UNCHANGED" || typeof check.explanation !== "string" || !check.explanation.trim()) fail(`source ${source.id} lacks an unchanged, explained morning check`);
    if (!exactBinding(check.originalEvidence, source.evidence)) fail(`source ${source.id} original evidence differs from the reviewed candidate`);
    readChecked(check.originalEvidence, `source ${source.id} original evidence`);
    validateTimestamp(check.currentCheckedAt, candidate.editionDate, record.checkedAt, `source ${source.id} currentCheckedAt`);
    const current = sourceCapture(readChecked(check.currentEvidence, `source ${source.id} current evidence`), source, check);
    requireExcerpt(check.currentExcerpt, current.content, `source ${source.id}`);
  }
  if (!record.developmentCheck || record.developmentCheck.disposition !== "NO_MATERIAL_CHANGE" || typeof record.developmentCheck.query !== "string" || !record.developmentCheck.query.trim() || typeof record.developmentCheck.explanation !== "string" || !record.developmentCheck.explanation.trim()) fail("development check must explicitly record a checked NO_MATERIAL_CHANGE result");
  validateTimestamp(record.developmentCheck.checkedAt, candidate.editionDate, record.checkedAt, "development check checkedAt");
  const development = developmentCapture(readChecked(record.developmentCheck.evidence, "development check evidence"), record.developmentCheck);
  requireExcerpt(record.developmentCheck.currentExcerpt, development.content, "development check");
  readChecked(record.claimMap, "original claim map");
  return { publicationDate: candidate.editionDate, checkedAt: record.checkedAt };
}
