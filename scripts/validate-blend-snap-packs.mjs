#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = process.env.BLEND_SNAP_MANIFEST_PATH ?
  path.resolve(process.env.BLEND_SNAP_MANIFEST_PATH) :
  path.join(root, "content/blend-snap-weekly-packs.json");
const episodePath = process.env.BLEND_SNAP_EPISODE_INDEX_PATH ?
  path.resolve(process.env.BLEND_SNAP_EPISODE_INDEX_PATH) :
  path.join(root, "content/episode-index.json");
const evidencePath = path.join(
  root,
  "operations/product-stewards/blend-snap/weekly-pack-evidence-ledger-2026-07-25.json"
);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const episodeIndex = JSON.parse(fs.readFileSync(episodePath, "utf8"));
const evidenceLedger = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
const asOfArg = process.argv.find((arg) => arg.startsWith("--as-of="));
const asOf = asOfArg ? asOfArg.slice("--as-of=".length) :
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
const statuses = new Set(["available", "held", "planned", "unavailable"]);
const standardRequiredIds = [
  "study_sheet", "try_on", "cheat_sheet", "trading_cards"
];
const episodeOneRequiredIds = [
  "try_on", "cheat_sheet", "trading_cards"
];
const knownIds = new Set([...standardRequiredIds, "quiz"]);
const internalPublicTerms =
  /architecture exists|collection authority repair|episode index declares|server-authoritative|unproven/i;
const publicManifestKeys = new Set([
  "schemaVersion", "manifestId", "updatedAt", "freshThrough", "packs"
]);
const publicPackKeys = new Set([
  "episodeNumber", "episodeSlug", "episodeTitle", "episodeRoute", "components",
  "quizHandoff"
]);
const publicComponentKeys = new Set([
  "id", "job", "label", "status", "statusLabel", "publicNote", "route"
]);

function check(condition, message) {
  if (!condition) throw new Error(message);
}

function realDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;
}

function safeLocalRoute(value) {
  return typeof value === "string" &&
    /^\/(?!\/)[A-Za-z0-9_./?=&%#-]+$/.test(value) &&
    !value.includes("..");
}

function routeFile(route) {
  return path.join(root, route.split(/[?#]/)[0].replace(/^\//, ""));
}

function printablePageCount(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  return Array.from(html.matchAll(/class\s*=\s*["']([^"']+)["']/gi))
    .filter((match) => match[1].split(/\s+/).includes("page"))
    .length;
}

check(manifest.schemaVersion === "1.0.0", "Unsupported manifest schema.");
check(manifest.manifestId === "blend-snap-weekly-packs", "Wrong manifest ID.");
check(realDate(manifest.updatedAt), "Manifest updatedAt is invalid.");
check(realDate(manifest.freshThrough), "Manifest freshThrough is invalid.");
check(realDate(asOf), "Validator as-of date is invalid.");
check(manifest.updatedAt <= manifest.freshThrough, "Manifest dates are reversed.");
check(manifest.updatedAt <= asOf, "Manifest review date is in the future.");
if (manifest.freshThrough < asOf) {
  console.warn(`REVIEW DUE: Blend & Snap menu review was due ${manifest.freshThrough}. ` +
    "Recheck the existing component routes and statuses; do not renew dates or availability automatically.");
}
check(Array.isArray(manifest.packs), "Manifest packs are missing.");
check(Object.keys(manifest).every((key) => publicManifestKeys.has(key)),
  "Public manifest contains private or unknown top-level metadata.");
check(!/"evidence"|"evidenceOwner"|"verifiedOn"/.test(
  fs.readFileSync(manifestPath, "utf8")
), "Public manifest ships private stewardship fields.");
check(!internalPublicTerms.test(JSON.stringify(manifest)),
  "Public manifest ships internal production language.");

check(evidenceLedger.schemaVersion === 1,
  "Private evidence ledger schema is unsupported.");
check(evidenceLedger.publicManifestId === manifest.manifestId &&
  evidenceLedger.publicManifestUpdatedAt === manifest.updatedAt,
  "Private evidence ledger does not identify the public manifest version.");
check(evidenceLedger.evidenceOwner === "blend-snap-champion" &&
  evidenceLedger.sourceEpisodeIndex === "/content/episode-index.json",
  "Private evidence ledger authority is missing or wrong.");
check(Array.isArray(evidenceLedger.packs),
  "Private evidence ledger packs are missing.");
const evidenceByEpisode = new Map(evidenceLedger.packs.map((pack) =>
  [pack.episodeNumber, pack]
));

const published = episodeIndex.episodes.filter((episode) =>
  episode.status === "published"
);
check(manifest.packs.length === published.length,
  "Every published episode must have exactly one pack record.");
const episodesByNumber = new Map(published.map((episode) =>
  [episode.number, episode]
));
const seenPacks = new Set();
let available = 0;
let held = 0;
let planned = 0;
let unavailable = 0;

for (const pack of manifest.packs) {
  const requiredIds = pack.episodeNumber === 1 ?
    episodeOneRequiredIds : standardRequiredIds;
  check(Object.keys(pack).every((key) => publicPackKeys.has(key)),
    `Episode ${pack.episodeNumber} public pack contains private metadata.`);
  const episode = episodesByNumber.get(pack.episodeNumber);
  check(episode && !seenPacks.has(pack.episodeNumber),
    `Pack ${pack.episodeNumber} is missing, duplicated or unpublished.`);
  seenPacks.add(pack.episodeNumber);
  check(pack.episodeSlug === episode.slug, `Episode ${pack.episodeNumber} slug drift.`);
  check(pack.episodeTitle === episode.title, `Episode ${pack.episodeNumber} title drift.`);
  const expectedEpisodeRoute = `/${String(episode.issueUrl || "").replace(/^\//, "")}`;
  check(pack.episodeRoute === expectedEpisodeRoute &&
    safeLocalRoute(pack.episodeRoute) &&
    fs.existsSync(routeFile(pack.episodeRoute)),
  `Episode ${pack.episodeNumber} route is missing or disagrees with the index.`);
  check(Array.isArray(pack.components) &&
    pack.components.length === requiredIds.length,
  `Episode ${pack.episodeNumber} component inventory disagrees with its locked architecture.`);
  const components = new Map();
  const evidencePack = evidenceByEpisode.get(pack.episodeNumber);
  check(evidencePack && Array.isArray(evidencePack.components),
    `Episode ${pack.episodeNumber} lacks a private evidence record.`);
  const componentEvidence = new Map(evidencePack.components.map((item) =>
    [item.id, item]
  ));
  for (const component of pack.components) {
    check(Object.keys(component).every((key) => publicComponentKeys.has(key)),
      `Episode ${pack.episodeNumber} ${component.id} contains private metadata.`);
    check(knownIds.has(component.id) && requiredIds.includes(component.id) &&
      !components.has(component.id),
      `Episode ${pack.episodeNumber} has a duplicate/unknown component.`);
    components.set(component.id, component);
    check(statuses.has(component.status),
      `Episode ${pack.episodeNumber} ${component.id} has an invalid status.`);
    check(component.label && component.job && component.statusLabel &&
      component.publicNote,
    `Episode ${pack.episodeNumber} ${component.id} lacks public copy.`);
    check(!internalPublicTerms.test(`${component.statusLabel} ${component.publicNote}`),
      `Episode ${pack.episodeNumber} ${component.id} exposes internal evidence language.`);
    const privateEvidence = componentEvidence.get(component.id);
    check(privateEvidence && privateEvidence.evidenceOwner &&
      privateEvidence.evidence && realDate(privateEvidence.verifiedOn) &&
      privateEvidence.verifiedOn <= manifest.updatedAt,
    `Episode ${pack.episodeNumber} ${component.id} lacks private evidence/freshness.`);
    if (component.status === "available") {
      available += 1;
      check(safeLocalRoute(component.route) &&
        fs.existsSync(routeFile(component.route)),
      `Episode ${pack.episodeNumber} ${component.id} available route is missing.`);
      if (component.id === "cheat_sheet") {
        check(printablePageCount(routeFile(component.route)) === 1,
        `Episode ${pack.episodeNumber} Cheat Sheet must contain exactly one printable page.`);
      }
    } else {
      if (component.status === "held") held += 1;
      if (component.status === "planned") planned += 1;
      if (component.status === "unavailable") unavailable += 1;
      check(component.route === null,
        `Episode ${pack.episodeNumber} ${component.id} cannot route while ${component.status}.`);
    }
  }
  check(requiredIds.every((id) => components.has(id)),
    `Episode ${pack.episodeNumber} component inventory is incomplete.`);
  check(componentEvidence.size === requiredIds.length + 1 &&
    requiredIds.every((id) => componentEvidence.has(id)) &&
    componentEvidence.has("quiz"),
  `Episode ${pack.episodeNumber} private evidence inventory is incomplete.`);
  if (pack.episodeNumber === 1) {
    check(!components.has("study_sheet"),
      "Episode 1 must not reintroduce the declined Study Sheet.");
  } else {
    check(components.get("study_sheet").status === "planned" &&
      components.get("study_sheet").route === null,
    `Episode ${pack.episodeNumber} must not invent a Study Sheet.`);
  }
  const cardDeclared = episode.websiteModules?.cardPack != null;
  check(
    (cardDeclared && components.get("trading_cards").status === "held") ||
    (!cardDeclared && components.get("trading_cards").status === "unavailable"),
    `Episode ${pack.episodeNumber} card admission disagrees with source/economy truth.`
  );
  const episodeLinks = Array.isArray(episode.siteLinks) ? episode.siteLinks : [];
  check(!episodeLinks.some((link) =>
    link?.type === "cardPack" && components.get("trading_cards").status !== "available"),
  `Episode ${pack.episodeNumber} index still advertises a held card pack.`);
  check(!episodeLinks.some((link) =>
    components.get("cheat_sheet").status !== "available" &&
    /(?:^|\/)(?:content\/printables\/|printable\.html)/.test(String(link?.url || ""))),
  `Episode ${pack.episodeNumber} index still advertises a held printable.`);
  const quiz = pack.quizHandoff;
  const expectedQuizRoute = `/learn/quiz.html?issue=${pack.episodeNumber}&from=blend-snap#quiz-start`;
  check(quiz && Object.keys(quiz).every((key) => publicComponentKeys.has(key)) &&
    quiz.id === "quiz" && quiz.status === "available" &&
    quiz.label && quiz.job && quiz.statusLabel && quiz.publicNote &&
    quiz.route === expectedQuizRoute && safeLocalRoute(quiz.route) &&
    fs.existsSync(routeFile(quiz.route)),
  `Episode ${pack.episodeNumber} quiz route should be explicit and adjacent.`);
  check(!internalPublicTerms.test(`${quiz.statusLabel} ${quiz.publicNote}`),
    `Episode ${pack.episodeNumber} quiz exposes internal evidence language.`);
  const quizEvidence = componentEvidence.get("quiz");
  check(quizEvidence && quizEvidence.evidenceOwner && quizEvidence.evidence &&
    realDate(quizEvidence.verifiedOn) && quizEvidence.verifiedOn <= manifest.updatedAt,
  `Episode ${pack.episodeNumber} quiz lacks private evidence/freshness.`);
  available += 1;
}

const cafePath = process.env.BLEND_SNAP_CAFE_PATH ?
  path.resolve(process.env.BLEND_SNAP_CAFE_PATH) :
  path.join(root, "blend-snap.html");
const cafe = fs.readFileSync(cafePath, "utf8");
check(cafe.includes("/content/blend-snap-weekly-packs.json"),
  "Café does not consume the canonical pack manifest.");
check(cafe.includes("planned or held work never masquerades as ready"),
  "Café is missing the component-status promise.");
check(!cafe.includes("You are all caught up"),
  "Café still overstates a device-local open marker as completion.");
check(!cafe.includes("will eventually") && !cafe.includes("drop into the Study Pack shelf"),
  "Café still promises an unbuilt Closet/card future.");
check(cafe.includes("component.status === \"available\"") &&
  cafe.includes("component.route !== null"),
  "Café does not fail closed on component routes.");
check(cafe.includes("note.textContent = component.publicNote") &&
  !cafe.includes("note.textContent = component.evidence"),
  "Café must render visitor-facing notes, not internal evidence.");
check(!cafe.includes("study-pack-review") &&
  !/http:\/\/127\.0\.0\.1:(4173|4182)/.test(cafe),
  "Café contains a production query bypass or localhost component route.");

const tryOn = fs.readFileSync(path.join(root, "try-on.html"), "utf8");
check(tryOn.includes("Could not save on this device"),
  "Try-On does not disclose blocked device storage.");
check(tryOn.includes('params.get("from") === "blend-snap"') &&
  tryOn.includes('"/blend-snap.html#the-study-pack"') &&
  tryOn.includes('"Back to Blend & Snap"'),
"Try-On does not preserve the originating Blend & Snap handback.");
check(!/\n\s*1:\s*\{[\s\S]*?pad:\s*"01"/.test(tryOn) &&
  tryOn.includes('if (!issues[issue]) location.replace("/blend-snap.html#the-study-pack")'),
"Held Episode 01 Try-On can still expose its rejected lesson through a direct URL.");

console.log(
  `✓ BLEND & SNAP PACKS: schema ${manifest.schemaVersion} · ` +
  `${manifest.packs.length} published episode menus · ` +
  `${available} available · ${held} held · ${planned} planned · ` +
  `${unavailable} unavailable · review due ${manifest.freshThrough}`
);
