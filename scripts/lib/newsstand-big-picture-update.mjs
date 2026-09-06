import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const versions = require("../../content/newsstand-big-picture-versions.js");
const SOURCE_PATH = "content/newsstand-stories.js";
const SHA = /^[a-f0-9]{64}$/;
const fail = message => { throw new Error(`BIG_PICTURE_RETENTION_REJECT: ${message}`); };
const hash = bytes => createHash("sha256").update(bytes).digest("hex");

function sourceRecord(manifest, label) {
  if (typeof manifest.artifactDirectory !== "string" || !manifest.artifactDirectory) fail(`${label} artifactDirectory is unavailable`);
  if (!Array.isArray(manifest.files)) fail(`${label} manifest has no files`);
  const matches = manifest.files.filter(file => file && file.path === SOURCE_PATH);
  if (matches.length !== 1 || !Number.isSafeInteger(matches[0].bytes) || matches[0].bytes < 0 || !SHA.test(matches[0].sha256 || "")) {
    fail(`${label} manifest does not bind exactly one NewsStand dataset`);
  }
  const directory = path.resolve(manifest.artifactDirectory);
  const source = path.resolve(directory, SOURCE_PATH);
  if (!source.startsWith(`${directory}${path.sep}`) || !fs.existsSync(source)) fail(`${label} artifact dataset is unavailable`);
  const bytes = fs.readFileSync(source);
  if (bytes.byteLength !== matches[0].bytes || hash(bytes) !== matches[0].sha256) fail(`${label} artifact dataset bytes do not match its manifest`);
  return { raw: bytes.toString("utf8"), record: matches[0] };
}

function dataset(raw, label) {
  const context = { window: {} };
  try { vm.runInNewContext(raw, context, { timeout: 1000, filename: label }); } catch { fail(`${label} artifact dataset cannot execute`); }
  if (!context.window.NEWSSTAND_DATA || !Array.isArray(context.window.NEWSSTAND_DATA.stories)) fail(`${label} artifact dataset has no stories`);
  return context.window.NEWSSTAND_DATA;
}

function storiesById(raw, label) {
  const data = dataset(raw, label);
  const byId = new Map();
  for (const story of data.stories) {
    if (!story || typeof story.id !== "string" || !story.id) fail(`${label} artifact has an invalid story id`);
    if (byId.has(story.id)) fail(`${label} artifact has duplicate story id ${story.id}`);
    byId.set(story.id, story);
  }
  return byId;
}

function same(value) { return versions.canonical(value); }

function meaningfulArticle(story) {
  const article = versions.publicArticle(story);
  delete article.updatedAt;
  delete article.lastCheckedAt;
  if (Array.isArray(article.sources)) article.sources.forEach(source => { delete source.accessedAt; });
  return article;
}

function existingVersions(story) {
  return story.bigPicture && Array.isArray(story.bigPicture.previousVersions) ? story.bigPicture.previousVersions : [];
}

function checkPair(before, after) {
  if (!after || after.edition !== "big-picture") fail(`published Big Picture ${before.id} was removed or swapped`);
  if (after.id !== before.id || after.slug !== before.slug) fail(`published Big Picture ${before.id} was swapped`);
  if (!before.bigPicture || !after.bigPicture || before.publishedAt !== after.publishedAt ||
      before.bigPicture.originallyPublishedAt !== after.bigPicture.originallyPublishedAt) {
    fail(`published Big Picture ${before.id} publication date changed`);
  }
  const beforeVersions = existingVersions(before);
  const afterVersions = existingVersions(after);
  if (afterVersions.length < beforeVersions.length || same(afterVersions.slice(0, beforeVersions.length)) !== same(beforeVersions)) {
    fail(`published Big Picture ${before.id} retained versions were removed or changed`);
  }
  const validation = versions.validateSnapshots(afterVersions);
  if (validation.length) fail(`published Big Picture ${before.id} retained versions are invalid: ${validation.join(" ")}`);
  const withdrawn = ["hold", "retracted"].includes(after.status);
  if (withdrawn) {
    const heldBefore = meaningfulArticle(before), heldAfter = meaningfulArticle(after);
    delete heldBefore.status;
    delete heldAfter.status;
    if (same(heldBefore) !== same(heldAfter) || same(before.bigPicture) !== same(after.bigPicture) || afterVersions.length !== beforeVersions.length) {
      fail(`withdrawn Big Picture ${before.id} must retain its prior public prose and history`);
    }
    return;
  }
  if (!["published", "corrected"].includes(after.status)) fail(`published Big Picture ${before.id} has an unsupported successor state`);
  if (same(meaningfulArticle(before)) === same(meaningfulArticle(after))) {
    if (afterVersions.length !== beforeVersions.length) fail(`published Big Picture ${before.id} added an unearned retained version without a meaningful public change`);
    return;
  }
  if (!versions.validDate(after.bigPicture.lastMeaningfullyUpdatedAt) || Date.parse(after.bigPicture.lastMeaningfullyUpdatedAt) <= Date.parse(before.bigPicture.lastMeaningfullyUpdatedAt)) {
    fail(`published Big Picture ${before.id} meaningful-update timestamp did not advance`);
  }
  if (afterVersions.length !== beforeVersions.length + 1) fail(`published Big Picture ${before.id} changed public article fields without one appended snapshot`);
  const appended = afterVersions[afterVersions.length - 1];
  const predecessor = versions.publicArticle(before);
  if (!appended || appended.article?.id !== after.id || appended.article?.slug !== after.slug ||
      appended.originallyPublishedAt !== after.bigPicture.originallyPublishedAt ||
      same(appended.article) !== same(predecessor)) {
    fail(`published Big Picture ${before.id} appended snapshot does not exactly retain the verified previous public article`);
  }
  if (Date.parse(appended.replacedAt) <= Date.parse(before.bigPicture.lastMeaningfullyUpdatedAt)) {
    fail(`published Big Picture ${before.id} snapshot replacement is not after the predecessor meaningful update`);
  }
  if (String(appended.replacedAt).slice(0, 10) > String(after.bigPicture.lastMeaningfullyUpdatedAt || "").slice(0, 10)) {
    fail(`published Big Picture ${before.id} snapshot is later than the current meaningful update`);
  }
}

// Manifest-bound artifact bytes are mandatory, including in disposable tests.
export function checkBigPictureRetention(baseManifest, candidateManifest) {
  const base = sourceRecord(baseManifest, "base");
  const candidate = sourceRecord(candidateManifest, "candidate");
  const before = storiesById(base.raw, "base");
  const after = storiesById(candidate.raw, "candidate");
  const publicBefore = [...before.values()].filter(story => story.edition === "big-picture" && ["published", "corrected"].includes(story.status));
  for (const story of publicBefore) checkPair(story, after.get(story.id));
  return { checked: publicBefore.map(story => story.id) };
}


const vancouverDay = value => {
  const instant = Date.parse(value);
  if (!Number.isFinite(instant)) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(instant));
};

// This protects the first public addition only. It is not an editorial admission
// and deliberately leaves pre-existing stories and held/retracted transitions to
// their own admission checks.
export function checkNewStoryPublicationDay(baseManifest, candidateManifest, { now = new Date().toISOString() } = {}) {
  const reject = message => { throw new Error(`NEWSSTAND_PUBLICATION_DAY_REJECT: ${message}`); };
  const releaseInstant = Date.parse(now);
  const releaseDay = vancouverDay(now);
  if (!Number.isFinite(releaseInstant) || !releaseDay) reject("release time is invalid");

  const base = sourceRecord(baseManifest, "base");
  const candidate = sourceRecord(candidateManifest, "candidate");
  const before = storiesById(base.raw, "base");
  const after = storiesById(candidate.raw, "candidate");
  const checked = [];

  for (const story of after.values()) {
    if (before.has(story.id) || story.edition !== "daily" || !["published", "corrected"].includes(story.status)) continue;
    const publishedInstant = Date.parse(story.publishedAt);
    const publishedDay = vancouverDay(story.publishedAt);
    if (!Number.isFinite(publishedInstant) || !publishedDay) {
      reject(`new Daily story ${story.id} has an invalid publishedAt timestamp`);
    }
    if (publishedInstant > releaseInstant) reject(`new Daily story ${story.id} publishedAt is in the future`);
    if (publishedDay !== releaseDay) {
      reject(`new Daily story ${story.id} publishedAt is not on the release day in Vancouver`);
    }
    checked.push(story.id);
  }
  return { checked };
}
