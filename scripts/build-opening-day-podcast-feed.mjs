#!/usr/bin/env node

/**
 * Build the internal opening-day podcast-feed preview or an admitted release
 * feed from the checksum-bound media-release manifests.
 *
 * Preview mode is deliberately non-distributable: it contains no enclosures.
 * Release mode refuses to write unless at least one manifest has complete
 * release authority, approved art and an admitted immutable public audio URL.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_ROOT = path.join(
  ROOT,
  "operations/video-qa/opening-day-portable-media-v1",
);
const PREVIEW_ROOT = path.join(
  ROOT,
  "operations/video-qa/opening-day-podcast-feed-v1",
);
const PROGRAMMES = ["trailer", "01", "02", "03", "04"];
const RELEASE_STATUSES = new Set(["ACCEPTED", "DEPLOYED", "VERIFIED_PUBLICLY"]);

function parseArgs(argv) {
  const args = { mode: "preview", output: null, planOutput: null, ownerEmail: null, showArtUrl: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--preview") args.mode = "preview";
    else if (token === "--release") args.mode = "release";
    else if (token === "--output") args.output = argv[++index];
    else if (token === "--plan-output") args.planOutput = argv[++index];
    else if (token === "--owner-email") args.ownerEmail = argv[++index];
    else if (token === "--show-art-url") args.showArtUrl = argv[++index];
    else throw new Error(`Unknown argument: ${token}`);
  }
  return args;
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatDuration(seconds) {
  const total = Math.round(Number(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainder = total % 60;
  return [hours, minutes, remainder].map((part) => String(part).padStart(2, "0")).join(":");
}

function loadProgramme(programme) {
  const manifestPath = path.join(PACKAGE_ROOT, programme, "media-release.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const audio = manifest.assets.find((asset) => asset.role === "AUDIO_MASTER");
  const transcript = manifest.assets.find((asset) => asset.role === "TRANSCRIPT");
  const cover = manifest.artwork.find((artwork) => artwork.kind === "MASTER_EPISODE_COVER");
  const podcastDestinations = manifest.destinations.filter((destination) =>
    ["APPLE_PODCASTS", "SPOTIFY_PODCASTS"].includes(destination.name),
  );
  if (!audio || !transcript || !cover || podcastDestinations.length !== 2) {
    throw new Error(`${programme}: incomplete podcast package`);
  }
  for (const item of [audio, transcript, cover]) {
    const sourcePath = path.join(ROOT, item.sourcePath);
    if (!fs.existsSync(sourcePath)) throw new Error(`${programme}: missing ${item.sourcePath}`);
    if (sha256(sourcePath) !== item.sha256) throw new Error(`${programme}: checksum mismatch ${item.sourcePath}`);
  }
  return { programme, manifestPath, manifest, audio, transcript, cover, podcastDestinations };
}

function releaseProblems(entry) {
  const { manifest, audio, cover, podcastDestinations } = entry;
  const problems = [];
  if (!RELEASE_STATUSES.has(manifest.status)) problems.push(`manifest status ${manifest.status}`);
  if (manifest.canonical.rightsStatus !== "PASS") problems.push(`canonical rights ${manifest.canonical.rightsStatus}`);
  if (!manifest.canonical.releaseDate) problems.push("missing release date");
  if (audio.admissionStatus !== "PASS") problems.push(`audio admission ${audio.admissionStatus}`);
  if (!audio.publicUrl || !audio.publicUrl.startsWith("https://")) problems.push("missing immutable HTTPS audio URL");
  if (cover.approvalStatus !== "PASS") problems.push(`cover approval ${cover.approvalStatus}`);
  if (cover.rightsStatus !== "PASS") problems.push(`cover rights ${cover.rightsStatus}`);
  if (!manifest.releaseReceipt) problems.push("missing release receipt");
  if (podcastDestinations.some((destination) => !["READY", "DELIVERED", "VERIFIED_PUBLICLY"].includes(destination.status))) {
    problems.push("podcast destinations not ready");
  }
  return problems;
}

function makePlan(entries, args) {
  const mode = args.mode;
  return {
    schema: "laidies.podcast-feed-plan.v1",
    packageIndex: {
      sourcePath: "operations/video-qa/opening-day-portable-media-v1/package-index.json",
      sha256: sha256(path.join(PACKAGE_ROOT, "package-index.json")),
    },
    status: mode === "preview" ? "INTERNAL PREVIEW / HOLD" : "RELEASE CANDIDATE",
    distributable: mode === "release",
    feedUrl: "https://laidies.ai/podcast/feed.xml",
    channel: {
      title: "LAiDIES: The Wednesday Tour",
      author: "LAiDIES",
      language: "en",
      category: ["Education", "Technology"],
      canonicalUrl: "https://laidies.ai/",
      ownerEmail: mode === "release" ? args.ownerEmail : null,
      ownerEmailStatus: mode === "release" ? "SUPPLIED_FOR_RELEASE_CANDIDATE" : "REQUIRED_BEFORE_SUBMISSION",
      showArtUrl: mode === "release" ? args.showArtUrl : null,
    },
    items: entries.map((entry) => ({
      programme: entry.programme,
      sourceManifest: {
        sourcePath: path.relative(ROOT, entry.manifestPath),
        sha256: sha256(entry.manifestPath),
      },
      releaseId: entry.manifest.releaseId,
      releaseType: entry.manifest.releaseType,
      status: entry.manifest.status,
      title: entry.manifest.canonical.title,
      description: entry.manifest.canonical.description,
      canonicalUrl: entry.manifest.canonical.canonicalUrl,
      seasonNumber: entry.manifest.canonical.seasonNumber,
      episodeNumber: entry.manifest.canonical.episodeNumber,
      releaseDate: entry.manifest.canonical.releaseDate,
      durationSeconds: entry.audio.durationSeconds,
      audio: {
        sourcePath: entry.audio.sourcePath,
        sha256: entry.audio.sha256,
        publicUrl: mode === "release" ? entry.audio.publicUrl : null,
        byteLength: fs.statSync(path.join(ROOT, entry.audio.sourcePath)).size,
        mimeType: entry.audio.mimeType,
      },
      artwork: {
        sourcePath: entry.cover.sourcePath,
        sha256: entry.cover.sha256,
        publicUrl: mode === "release" ? `https://laidies.ai/${entry.cover.sourcePath}` : null,
      },
      transcript: {
        sourcePath: entry.transcript.sourcePath,
        sha256: entry.transcript.sha256,
      },
      releaseProblems: releaseProblems(entry),
    })),
  };
}

function makeRss(plan) {
  const preview = !plan.distributable;
  const ownerBlock = preview
    ? ""
    : `    <itunes:image href="${xml(plan.channel.showArtUrl)}" />\n    <itunes:owner><itunes:name>${xml(plan.channel.author)}</itunes:name><itunes:email>${xml(plan.channel.ownerEmail)}</itunes:email></itunes:owner>\n`;
  const items = plan.items.map((item) => {
    const enclosure = preview
      ? ""
      : `\n      <enclosure url="${xml(item.audio.publicUrl)}" length="${item.audio.byteLength}" type="${xml(item.audio.mimeType)}" />`;
    const pubDate = item.releaseDate
      ? `\n      <pubDate>${new Date(`${item.releaseDate}T12:00:00Z`).toUTCString()}</pubDate>`
      : "";
    const image = preview ? "" : `\n      <itunes:image href="${xml(item.artwork.publicUrl)}" />`;
    return `    <item>
      <title>${xml(item.title)}</title>
      <description>${xml(item.description)}</description>
      <link>${xml(item.canonicalUrl)}</link>
      <guid isPermaLink="false">${xml(`urn:laidies:${item.releaseId}`)}</guid>
      <itunes:season>${item.seasonNumber}</itunes:season>
      <itunes:episode>${item.episodeNumber}</itunes:episode>
      <itunes:episodeType>${item.releaseType === "TRAILER" ? "trailer" : "full"}</itunes:episodeType>
      <itunes:duration>${formatDuration(item.durationSeconds)}</itunes:duration>
      <laidies:releaseStatus>${xml(item.status)}</laidies:releaseStatus>${pubDate}${image}${enclosure}
    </item>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:laidies="https://laidies.ai/ns/release/1.0">
  <channel>
    <title>${xml(preview ? `[INTERNAL PREVIEW] ${plan.channel.title}` : plan.channel.title)}</title>
    <description>Stories, practical AI learning and original music from SUNNYVAiLE.</description>
    <link>${xml(plan.channel.canonicalUrl)}</link>
    <language>${xml(plan.channel.language)}</language>
    <itunes:author>${xml(plan.channel.author)}</itunes:author>
    <itunes:explicit>false</itunes:explicit>
${ownerBlock}
    <itunes:category text="Education"><itunes:category text="Courses" /></itunes:category>
    <itunes:category text="Technology" />
    <atom:link href="${xml(plan.feedUrl)}" rel="self" type="application/rss+xml" />
    <laidies:distributable>${plan.distributable}</laidies:distributable>
${items}
  </channel>
</rss>
`;
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const entries = PROGRAMMES.map(loadProgramme);
  if (args.mode === "release") {
    if (!args.ownerEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(args.ownerEmail)) {
      throw new Error("RELEASE REFUSED: --owner-email is required for provider validation");
    }
    if (!args.showArtUrl || !args.showArtUrl.startsWith("https://")) {
      throw new Error("RELEASE REFUSED: --show-art-url must be an admitted HTTPS image");
    }
    const ineligible = entries.filter((entry) => releaseProblems(entry).length > 0);
    const eligible = entries.filter((entry) => releaseProblems(entry).length === 0);
    if (!eligible.length) {
      throw new Error(`RELEASE REFUSED: 0 eligible titles; ${ineligible.length} held or incomplete`);
    }
    entries.splice(0, entries.length, ...eligible);
  }
  const plan = makePlan(entries, args);
  const output = path.resolve(
    args.output || path.join(PREVIEW_ROOT, args.mode === "preview" ? "feed-preview.xml" : "feed-release.xml"),
  );
  const planOutput = path.resolve(
    args.planOutput || path.join(PREVIEW_ROOT, args.mode === "preview" ? "feed-preview.json" : "feed-release.json"),
  );
  writeFile(output, makeRss(plan));
  writeFile(planOutput, `${JSON.stringify(plan, null, 2)}\n`);
  console.log(`Podcast feed ${args.mode}: PASS`);
  console.log(`- ${plan.items.length} exact title packages`);
  console.log(`- ${plan.distributable ? plan.items.length : 0} distributable enclosures`);
  console.log(`- ${path.relative(ROOT, output)}`);
  console.log(`- ${path.relative(ROOT, planOutput)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
