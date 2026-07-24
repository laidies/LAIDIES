#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STORY_FILE = path.join(ROOT, "content", "newsstand-stories.js");
const ALLOWED_EDITIONS = new Set(["wednesday", "tribune"]);
const REQUIRED_TEXT = [
  "id",
  "slug",
  "date",
  "headline",
  "the_story",
  "laidies_read",
  "what_this_means",
  "cocktail_party",
  "class_notes"
];
const UNSAFE_HTML = /<\s*(script|iframe|object|embed|form)\b|\bon\w+\s*=|javascript:/i;
const PLACEHOLDER = /\b(TODO|TBD|FIXME|placeholder|example\.com)\b/i;

const source = fs.readFileSync(STORY_FILE, "utf8");
const context = { window: {} };
vm.runInNewContext(source, context, { filename: STORY_FILE });
const stories = context.window.NEWSSTAND_STORIES;
const errors = [];
const ids = new Set();
const slugs = new Set();

function fail(message) {
  errors.push(message);
}

function resolvePublicPath(href) {
  const pathname = href.split(/[?#]/)[0];
  if (!pathname.startsWith("/") || pathname === "/") return path.join(ROOT, "index.html");
  const exact = path.join(ROOT, pathname.slice(1));
  if (fs.existsSync(exact)) return exact;
  if (!path.extname(exact) && fs.existsSync(exact + ".html")) return exact + ".html";
  return exact;
}

if (!Array.isArray(stories) || stories.length === 0) {
  fail("NEWSSTAND_STORIES must be a non-empty array.");
} else {
  stories.forEach((story, index) => {
    const label = story?.slug || story?.id || `story[${index}]`;

    if (!ALLOWED_EDITIONS.has(story.edition)) {
      fail(`${label}: edition must be wednesday or tribune.`);
    }
    for (const field of REQUIRED_TEXT) {
      if (typeof story[field] !== "string" || !story[field].trim()) {
        fail(`${label}: missing non-empty ${field}.`);
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(story.date || "") ||
        Number.isNaN(Date.parse(`${story.date}T00:00:00Z`))) {
      fail(`${label}: date must be a valid ISO calendar date.`);
    }
    if (ids.has(story.id)) fail(`${label}: duplicate id ${story.id}.`);
    if (slugs.has(story.slug)) fail(`${label}: duplicate slug ${story.slug}.`);
    ids.add(story.id);
    slugs.add(story.slug);

    const richText = [
      story.the_story,
      story.laidies_read,
      story.what_this_means,
      story.cocktail_party,
      story.class_notes,
      story.closing_note,
      ...(story.watch_fors || [])
    ].filter(Boolean);
    richText.forEach((value) => {
      if (UNSAFE_HTML.test(value)) fail(`${label}: unsafe HTML or URL scheme.`);
      if (PLACEHOLDER.test(value)) fail(`${label}: placeholder marker in public copy.`);
    });

    if (!Array.isArray(story.sources) || story.sources.length === 0) {
      fail(`${label}: at least one named source is required.`);
    } else {
      story.sources.forEach((item, sourceIndex) => {
        if (!item?.label?.trim()) fail(`${label}: source ${sourceIndex + 1} needs a label.`);
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
      if (!fs.existsSync(resolvePublicPath(href))) {
        fail(`${label}: class-notes link does not resolve: ${href}`);
      }
    });

    if (story.edition === "tribune" &&
        (!Array.isArray(story.watch_fors) || story.watch_fors.length === 0)) {
      fail(`${label}: Tribune entries require at least one watch-for.`);
    }
  });
}

const weeklyDates = (stories || [])
  .filter((story) => story.edition === "wednesday")
  .map((story) => story.date)
  .sort();
if (weeklyDates.length === 0) {
  fail("At least one WEDNESDAY Edition story is required.");
} else {
  const ageDays = Math.floor((Date.now() - Date.parse(`${weeklyDates.at(-1)}T00:00:00Z`)) / 86400000);
  if (ageDays > 14) fail(`Newest WEDNESDAY Edition is stale (${ageDays} days old).`);
}

if (errors.length) {
  console.error(`✗ NEWSSTAND: ${errors.length} validation error${errors.length === 1 ? "" : "s"}`);
  errors.forEach((error) => console.error(`  · ${error}`));
  process.exit(1);
}

console.log(
  `✓ NEWSSTAND: ${stories.length} approved stories · ` +
  `${stories.filter((story) => story.edition === "wednesday").length} WEDNESDAY · ` +
  `${stories.filter((story) => story.edition === "tribune").length} Tribune · ` +
  `newest ${weeklyDates.at(-1)}`
);
