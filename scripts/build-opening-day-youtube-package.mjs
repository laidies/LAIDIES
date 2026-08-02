#!/usr/bin/env node

/**
 * Build a checksum-bound YouTube upload preview from the opening-day media
 * manifests. Preview mode is intentionally non-actionable. Release mode only
 * writes a delivery plan when every requested title has explicit release,
 * media, artwork, rights and destination admission.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_ROOT = path.join(ROOT, "operations/video-qa/opening-day-portable-media-v1");
const OUTPUT_ROOT = path.join(ROOT, "operations/video-qa/opening-day-youtube-package-v1");
const PROGRAMMES = ["trailer", "01", "02", "03", "04"];
const RELEASE_STATES = new Set(["ACCEPTED", "DEPLOYED", "VERIFIED_PUBLICLY"]);

function parseArgs(argv) {
  const args = { mode: "preview", output: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--preview") args.mode = "preview";
    else if (token === "--release") args.mode = "release";
    else if (token === "--output") args.output = argv[++index];
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function exactAsset(manifest, role, programme) {
  const item = manifest.assets.find((asset) => asset.role === role);
  if (!item) throw new Error(`${programme}: missing ${role}`);
  const sourcePath = path.join(ROOT, item.sourcePath);
  if (!fs.existsSync(sourcePath)) throw new Error(`${programme}: missing ${item.sourcePath}`);
  if (sha256(sourcePath) !== item.sha256) throw new Error(`${programme}: checksum mismatch ${item.sourcePath}`);
  return item;
}

function exactArtwork(manifest, kind, programme) {
  const item = manifest.artwork.find((artwork) => artwork.kind === kind);
  if (!item) throw new Error(`${programme}: missing ${kind}`);
  const sourcePath = path.join(ROOT, item.sourcePath);
  if (!fs.existsSync(sourcePath)) throw new Error(`${programme}: missing ${item.sourcePath}`);
  if (sha256(sourcePath) !== item.sha256) throw new Error(`${programme}: checksum mismatch ${item.sourcePath}`);
  if (item.width !== 1280 || item.height !== 720) {
    throw new Error(`${programme}: YouTube thumbnail must be 1280x720`);
  }
  return item;
}

function loadProgramme(programme) {
  const manifestPath = path.join(PACKAGE_ROOT, programme, "media-release.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const video = exactAsset(manifest, "VISUAL_MASTER", programme);
  const captions = exactAsset(manifest, "CAPTIONS_VTT", programme);
  const thumbnail = exactArtwork(manifest, "YOUTUBE_THUMBNAIL", programme);
  const destination = manifest.destinations.find((item) => item.name === "YOUTUBE");
  if (!destination) throw new Error(`${programme}: missing YOUTUBE destination`);
  return { programme, manifestPath, manifest, video, captions, thumbnail, destination };
}

function releaseProblems(entry) {
  const { manifest, video, captions, thumbnail, destination } = entry;
  const problems = [];
  if (!RELEASE_STATES.has(manifest.status)) problems.push(`manifest status ${manifest.status}`);
  if (manifest.canonical.rightsStatus !== "PASS") problems.push(`canonical rights ${manifest.canonical.rightsStatus}`);
  if (!manifest.canonical.releaseDate) problems.push("missing admitted release date");
  if (video.admissionStatus !== "PASS") problems.push(`video admission ${video.admissionStatus}`);
  if (captions.admissionStatus !== "PASS") problems.push(`caption admission ${captions.admissionStatus}`);
  if (thumbnail.approvalStatus !== "PASS") problems.push(`thumbnail approval ${thumbnail.approvalStatus}`);
  if (thumbnail.rightsStatus !== "PASS") problems.push(`thumbnail rights ${thumbnail.rightsStatus}`);
  if (!manifest.releaseReceipt) problems.push("missing release receipt");
  if (!['READY', 'DELIVERED', 'VERIFIED_PUBLICLY'].includes(destination.status)) {
    problems.push(`YouTube destination ${destination.status}`);
  }
  return problems;
}

function videoTitle(entry) {
  const { canonical } = entry.manifest;
  if (entry.manifest.releaseType === "TRAILER") return `${canonical.title} | LAiDIES Trailer`;
  return `Episode ${String(canonical.episodeNumber).padStart(2, "0")}: ${canonical.title} | LAiDIES`;
}

function description(entry) {
  const { canonical } = entry.manifest;
  return [
    canonical.description,
    "",
    `Read, listen and keep learning: ${canonical.canonicalUrl}`,
    "",
    "LAiDIES teaches AI fluency through the pop culture you never forgot. Welcome to SUNNYVAiLE and the Rewind Era.",
  ].join("\n");
}

function makePlan(entries, mode) {
  const release = mode === "release";
  return {
    schema: "laidies.youtube-delivery-plan.v1",
    buildIdentity: "opening-day-youtube-package-v1",
    sourcePackageIndex: {
      sourcePath: "operations/video-qa/opening-day-portable-media-v1/package-index.json",
      sha256: sha256(path.join(PACKAGE_ROOT, "package-index.json")),
    },
    status: release ? "DELIVERY PLAN / PRIVATE UPLOAD ONLY" : "INTERNAL PREVIEW / HOLD",
    actionable: release,
    uploadsPerformed: 0,
    channelConnectionRequired: true,
    defaults: {
      privacyStatus: "private",
      categoryId: "27",
      categoryName: "Education",
      language: "en",
      madeForKids: false,
      containsSyntheticMedia: true,
      playlistTitle: "The Wednesday Tour — Season 1",
    },
    items: entries.map((entry) => {
      const title = videoTitle(entry);
      const text = description(entry);
      if (title.length > 100) throw new Error(`${entry.programme}: title exceeds 100 characters`);
      if (text.length > 5000) throw new Error(`${entry.programme}: description exceeds 5000 characters`);
      return {
        programme: entry.programme,
        releaseId: entry.manifest.releaseId,
        sourceManifest: {
          sourcePath: path.relative(ROOT, entry.manifestPath),
          sha256: sha256(entry.manifestPath),
        },
        uploadReady: release,
        title,
        description: text,
        seasonNumber: entry.manifest.canonical.seasonNumber,
        episodeNumber: entry.manifest.canonical.episodeNumber,
        releaseDate: entry.manifest.canonical.releaseDate,
        tags: [
          "LAiDIES",
          "SUNNYVAiLE",
          "AI education",
          "Rewind Era",
          "women in AI",
          entry.manifest.canonical.title,
        ],
        video: {
          sourcePath: entry.video.sourcePath,
          sha256: entry.video.sha256,
          mimeType: entry.video.mimeType,
          durationSeconds: entry.video.durationSeconds,
        },
        captions: {
          sourcePath: entry.captions.sourcePath,
          sha256: entry.captions.sha256,
          language: "en",
          name: "English",
        },
        thumbnail: {
          sourcePath: entry.thumbnail.sourcePath,
          sha256: entry.thumbnail.sha256,
          width: entry.thumbnail.width,
          height: entry.thumbnail.height,
        },
        releaseProblems: releaseProblems(entry),
      };
    }),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const entries = PROGRAMMES.map(loadProgramme);
  if (args.mode === "release") {
    const blocked = entries.filter((entry) => releaseProblems(entry).length > 0);
    if (blocked.length) {
      throw new Error(`RELEASE REFUSED: ${blocked.length}/5 titles remain held or incomplete`);
    }
  }
  const plan = makePlan(entries, args.mode);
  const output = path.resolve(args.output || path.join(
    OUTPUT_ROOT,
    args.mode === "release" ? "upload-plan-private.json" : "upload-plan-preview.json",
  ));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`Opening-day YouTube package ${args.mode}: PASS`);
  console.log(`- ${plan.items.length} checksum-bound titles`);
  console.log(`- ${plan.items.filter((item) => item.uploadReady).length} upload-ready titles`);
  console.log(`- 0 uploads performed`);
  console.log(`- ${path.relative(ROOT, output)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
