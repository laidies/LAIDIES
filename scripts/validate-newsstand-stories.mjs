#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { validateNewsstandEvidenceTruth } from "./lib/newsstand-evidence-truth.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORY_FILE = path.join(ROOT, "content", "newsstand-stories.js");
const CONTRACT_FILE = path.join(ROOT, "content", "newsstand-reader-contract.js");
const ROLLBACK_DRILL_FILE = path.join(
  ROOT, "operations", "test-fixtures", "newsstand-reader",
  "correction-retraction-rollback-drill.json"
);
const EDITIONS = ["breaking", "daily", "weekly", "tribune"];
const STORY_STATUSES = new Set(["published", "hold", "corrected", "retracted"]);
const PUBLICATION_STATUSES = new Set(["quiet", "current", "hold", "unavailable"]);
const REQUIRED_TEXT = [
  "id", "slug", "headline", "the_story", "laidies_read",
  "what_this_means", "cocktail_party", "class_notes"
];
const UNSAFE_HTML = /<\s*(script|iframe|object|embed|form)\b|\bon\w+\s*=|javascript:/i;
const PLACEHOLDER = /\b(TODO|TBD|FIXME|placeholder|example\.com)\b/i;
const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
const errors = [];

function fail(message) {
  errors.push(message);
}

function loadBrowserData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(STORY_FILE, "utf8"), context, { filename: STORY_FILE });
  return context.window.NEWSSTAND_DATA;
}

function loadContract() {
  const context = { module: { exports: {} }, exports: {}, window: undefined };
  vm.runInNewContext(fs.readFileSync(CONTRACT_FILE, "utf8"), context, { filename: CONTRACT_FILE });
  return context.module.exports;
}

function validDateTime(value) {
  return typeof value === "string" && ISO_DATE_TIME.test(value) && !Number.isNaN(Date.parse(value));
}

function resolvePublicPath(href) {
  const pathname = href.split(/[?#]/)[0];
  if (!pathname.startsWith("/") || pathname === "/") return path.join(ROOT, "index.html");
  const exact = path.join(ROOT, pathname.slice(1));
  if (fs.existsSync(exact)) return exact;
  if (!path.extname(exact) && fs.existsSync(exact + ".html")) return exact + ".html";
  return exact;
}

const data = loadBrowserData();
const contract = loadContract();

if (!data || typeof data !== "object") {
  fail("NEWSSTAND_DATA must be an object.");
} else {
  if (data.schemaVersion !== "1.0.0") fail("schemaVersion must be 1.0.0.");
  if (!["published", "hold"].includes(data.datasetStatus)) fail("datasetStatus must be published or hold.");
  if (!validDateTime(data.generatedAt) || !validDateTime(data.lastCheckedAt)) {
    fail("Dataset timestamps must be ISO UTC date-times.");
  }
  if (!data.publications || typeof data.publications !== "object") {
    fail("publications object is required.");
  } else {
    const keys = Object.keys(data.publications).sort();
    if (keys.join(",") !== EDITIONS.slice().sort().join(",")) {
      fail("publications must contain exactly breaking, daily, weekly and tribune.");
    }
    EDITIONS.forEach((edition) => {
      const item = data.publications[edition];
      if (!item || item.edition !== edition) return fail(`${edition}: publication record is missing.`);
      if (!PUBLICATION_STATUSES.has(item.status)) fail(`${edition}: invalid publication status.`);
      if (typeof item.job !== "string" || item.job.length < 20) fail(`${edition}: distinct reader job is required.`);
      if (!validDateTime(item.updatedAt) || !validDateTime(item.lastCheckedAt)) {
        fail(`${edition}: updatedAt and lastCheckedAt must be ISO UTC date-times.`);
      }
      if (item.publishedAt !== null && !validDateTime(item.publishedAt)) fail(`${edition}: invalid publishedAt.`);
      if (!(Number(item.maxAgeHours) > 0)) fail(`${edition}: maxAgeHours must be positive.`);
      if (item.status === "current" && !item.publishedAt) fail(`${edition}: current publication needs publishedAt.`);
      if (item.status === "quiet" && item.publishedAt) fail(`${edition}: quiet publication must not claim publishedAt.`);
    });
  }
}

const stories = data?.stories;
const ids = new Set();
const slugs = new Set();

if (!Array.isArray(stories)) {
  fail("stories must be an array.");
} else {
  stories.forEach((story, index) => {
    const label = story?.slug || story?.id || `story[${index}]`;
    if (!EDITIONS.includes(story.edition)) fail(`${label}: edition must be canonical; legacy wednesday is forbidden.`);
    if (!STORY_STATUSES.has(story.status)) fail(`${label}: invalid story status.`);
    REQUIRED_TEXT.forEach((field) => {
      if (typeof story[field] !== "string" || !story[field].trim()) fail(`${label}: missing non-empty ${field}.`);
    });
    ["publishedAt", "updatedAt", "lastCheckedAt"].forEach((field) => {
      if (!validDateTime(story[field])) fail(`${label}: ${field} must be an ISO UTC date-time.`);
    });
    if (ids.has(story.id)) fail(`${label}: duplicate id ${story.id}.`);
    if (slugs.has(story.slug)) fail(`${label}: duplicate slug ${story.slug}.`);
    ids.add(story.id);
    slugs.add(story.slug);

    if (!story.sourceApproval || !["approved", "independent-review-required", "rejected"].includes(story.sourceApproval.status)) {
      fail(`${label}: sourceApproval status is required.`);
    } else {
      const recordPath = String(story.sourceApproval.record || "").replace(/^\//, "");
      if (!recordPath || !fs.existsSync(path.join(ROOT, recordPath))) {
        fail(`${label}: sourceApproval record does not resolve: ${story.sourceApproval.record || "(missing)"}.`);
      } else {
        try {
          const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, recordPath), "utf8"));
          const dataSourceIds = new Set((story.sources || []).map((source) => source.id));
          const manifestSourceIds = new Set((manifest.sources || []).map((source) => source.id));
          if (dataSourceIds.size !== manifestSourceIds.size ||
              [...dataSourceIds].some((id) => !manifestSourceIds.has(id))) {
            fail(`${label}: public sources do not match the evidence manifest.`);
          }
          if (!manifest.correctionOwner || !/^\d{4}-\d{2}-\d{2}$/.test(manifest.nextRecheckAt || "")) {
            fail(`${label}: evidence manifest needs correctionOwner and nextRecheckAt.`);
          }
          if (!Array.isArray(manifest.claims) || !manifest.claims.length ||
              manifest.claims.some((claim) => !claim.claim || !Array.isArray(claim.sourceIds) || !claim.sourceIds.length)) {
            fail(`${label}: evidence manifest needs a complete claim-to-source map.`);
          }
          if (manifest.claims?.some((claim) => claim.sourceIds.some((id) => !manifestSourceIds.has(id)))) {
            fail(`${label}: claim map references an unknown source id.`);
          }
          for (const truthError of validateNewsstandEvidenceTruth(manifest)) {
            fail(`${label}: evidence manifest ${truthError}.`);
          }
          const aidbPath = manifest?.aidbComparison?.evidencePath;
          if (manifest?.aidbComparison?.status === "COVERED" &&
              (!aidbPath || !fs.existsSync(path.join(ROOT, String(aidbPath).replace(/^\//, ""))))) {
            fail(`${label}: covered AIDB comparison evidence path does not resolve.`);
          }
        } catch (error) {
          fail(`${label}: evidence manifest is not valid JSON (${error.message}).`);
        }
      }
    }
    if (!Object.hasOwn(story, "correction") || !Object.hasOwn(story, "retraction")) {
      fail(`${label}: explicit correction and retraction fields are required.`);
    }
    if (story.status === "corrected" && !story.correction) fail(`${label}: corrected story needs a correction record.`);
    if (story.status === "retracted" && !story.retraction) fail(`${label}: retracted story needs a retraction record.`);
    if ((story.status === "published" || story.status === "corrected") &&
        story.sourceApproval?.status !== "approved") {
      fail(`${label}: visible story requires approved source evidence.`);
    }

    const richText = [
      story.the_story, story.laidies_read, story.what_this_means,
      story.cocktail_party, story.class_notes, story.closing_note,
      ...(story.watch_fors || []),
      ...(story.longform?.sections || []).flatMap((section) => [
        section.label,
        ...(section.blocks || []).flatMap((block) => [block.body, block.text, block.eyebrow, ...(block.items || [])])
      ])
    ].filter(Boolean);
    richText.forEach((value) => {
      if (UNSAFE_HTML.test(value)) fail(`${label}: unsafe HTML or URL scheme.`);
      if (PLACEHOLDER.test(value)) fail(`${label}: placeholder marker in copy.`);
    });

    if (story.longform) {
      const sectionIds = new Set();
      if (!story.longform.ariaLabel?.trim() || !Array.isArray(story.longform.sections) || story.longform.sections.length < 2 ||
          !Array.isArray(story.longform.jumpSectionIds) || story.longform.jumpSectionIds.length === 0) {
        fail(`${label}: longform structure is incomplete.`);
      }
      for (const section of story.longform.sections || []) {
        if (!section?.id || sectionIds.has(section.id) || !section.label?.trim() || !Array.isArray(section.blocks) || !section.blocks.length) {
          fail(`${label}: longform section needs a unique id, label and blocks.`);
          continue;
        }
        sectionIds.add(section.id);
        for (const block of section.blocks) {
          const validText = block && ((block.type === "paragraph" && block.body?.trim()) ||
            (block.type === "subheading" && block.text?.trim()) ||
            (block.type === "quote" && ["myth", "conclusion", "evidence"].includes(block.role) && block.body?.trim()));
          const validList = block && ["ordered_list", "unordered_list"].includes(block.type) &&
            Array.isArray(block.items) && block.items.length && block.items.every((item) => item?.trim());
          if (!validText && !validList) fail(`${label}: longform block is invalid.`);
        }
      }
      for (const jumpId of story.longform.jumpSectionIds || []) {
        if (!sectionIds.has(jumpId)) fail(`${label}: longform jump target is missing: ${jumpId}.`);
      }
    }

    if (!Array.isArray(story.sources) || story.sources.length === 0) {
      fail(`${label}: at least one named source is required.`);
    } else {
      const sourceIds = new Set();
      story.sources.forEach((item, sourceIndex) => {
        if (!item?.id || sourceIds.has(item.id)) fail(`${label}: source ${sourceIndex + 1} needs a unique id.`);
        sourceIds.add(item?.id);
        if (!item?.label?.trim()) fail(`${label}: source ${sourceIndex + 1} needs a label.`);
        if (!["vendor", "regulator", "academic", "independent-reporting", "primary-document"].includes(item?.publisherType)) {
          fail(`${label}: source ${sourceIndex + 1} needs a valid publisherType.`);
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(item?.accessedAt || "")) fail(`${label}: source ${sourceIndex + 1} needs accessedAt.`);
        if (item?.approvalStatus !== "reviewed") fail(`${label}: source ${sourceIndex + 1} is not reviewed.`);
        try {
          const url = new URL(item?.url);
          if (!["http:", "https:"].includes(url.protocol)) throw new Error("bad protocol");
        } catch {
          fail(`${label}: source ${sourceIndex + 1} needs an HTTP(S) URL.`);
        }
      });
    }

    const internalLinks = [...String(story.class_notes || "").matchAll(/href=["'](\/[^"']+)["']/g)]
      .map((match) => match[1]);
    internalLinks.forEach((href) => {
      if (!fs.existsSync(resolvePublicPath(href))) fail(`${label}: class-notes link does not resolve: ${href}`);
    });

    if (story.edition === "tribune" && (!Array.isArray(story.watch_fors) || story.watch_fors.length === 0)) {
      fail(`${label}: Tribune entries require at least one watch-for.`);
    }
    if (story.tags?.some((tag) => ["health", "medical", "privacy", "safety"].includes(String(tag).toLowerCase()))) {
      const sourceTypes = new Set((story.sources || []).map((source) => source.publisherType));
      if (!sourceTypes.has("regulator") && !sourceTypes.has("academic") && !sourceTypes.has("independent-reporting")) {
        fail(`${label}: hard-hold topic requires authoritative independent context.`);
      }
    }
  });
}

const contractErrors = contract.validate(data);
contractErrors.forEach((error) => fail(`reader contract: ${error}`));

try {
  const drill = JSON.parse(fs.readFileSync(ROLLBACK_DRILL_FILE, "utf8"));
  const story = stories?.find((item) => item.id === drill.storyId);
  if (!story) {
    fail("correction/retraction drill story does not resolve.");
  } else {
    const publicSourceIds = new Set(story.sources.map((source) => source.id));
    if (drill.sourceBinding.length !== publicSourceIds.size ||
        drill.sourceBinding.some((id) => !publicSourceIds.has(id))) {
      fail("correction/retraction drill source binding differs from the public story.");
    }
    for (const stage of drill.stages || []) {
      if (!stage.record) continue;
      const recordPath = path.join(ROOT, String(stage.record).replace(/^\//, ""));
      if (!fs.existsSync(recordPath)) {
        fail(`correction/retraction drill record does not resolve: ${stage.record}.`);
        continue;
      }
      const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
      if (record.storyId !== story.id) fail(`${stage.stage}: evidence record story binding is wrong.`);
      if (!Array.isArray(record.sourceIds) ||
          record.sourceIds.length !== publicSourceIds.size ||
          record.sourceIds.some((id) => !publicSourceIds.has(id))) {
        fail(`${stage.stage}: evidence record source binding is wrong.`);
      }
      if (!record.recordedAt || !record.owner) fail(`${stage.stage}: evidence record date/owner is missing.`);
    }
  }
} catch (error) {
  fail(`correction/retraction drill is invalid (${error.message}).`);
}

if (errors.length) {
  console.error(`✗ NEWSSTAND: ${errors.length} validation error${errors.length === 1 ? "" : "s"}`);
  errors.forEach((error) => console.error(`  · ${error}`));
  process.exit(1);
}

const visible = stories.filter((story) => story.status === "published" || story.status === "corrected");
const held = stories.filter((story) => story.status === "hold").length;
console.log(
  `✓ NEWSSTAND: schema 1.0.0 · 4 canonical publications · ` +
  `${visible.length} visible · ${held} held · no legacy wednesday keys`
);
