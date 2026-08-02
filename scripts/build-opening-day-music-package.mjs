#!/usr/bin/env node

/**
 * Build the fail-closed opening-day music distribution preview.
 *
 * This script inventories exact local audio and known metadata. It never calls
 * a distributor or turns incomplete metadata into a release manifest. Release
 * mode refuses to write while any track or destination remains held.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = "content/music/ksvl-track-registry.json";
const OUTPUT_ROOT = "operations/video-qa/opening-day-music-distribution-v1";
const TRACK_IDS = ["ep-01", "ep-02", "ep-03", "ep-04"];
const DESTINATIONS = ["APPLE_MUSIC", "SPOTIFY_MUSIC", "YOUTUBE_MUSIC"];

const TRACK_EVIDENCE = {
  "ep-01": {
    episodeTitle: "On Wednesdays We Do AI",
    artwork: "assets/albums/the-regressions-please-fit-this-curve.png",
    artworkCuration: "UNUSED_STALE_BOOKKEEPING / DISTRIBUTION_APPROVAL_MISSING",
    lyrics: null,
  },
  "ep-02": {
    episodeTitle: "Tell Me What You Want",
    artwork: "assets/albums/the-predicts-told-you-so.png",
    artworkCuration: "UNUSED_STALE_BOOKKEEPING / DISTRIBUTION_APPROVAL_MISSING",
    lyrics: null,
  },
  "ep-03": {
    episodeTitle: "The Burn Book Problem",
    artwork: "assets/albums/the-overfits-memorized.png",
    artworkCuration: "CURATION_CORRECT / DISTRIBUTION_APPROVAL_MISSING",
    lyrics: null,
  },
  "ep-04": {
    episodeTitle: "The Founding Mothers",
    artwork: null,
    artworkCuration: "MISSING",
    lyrics: "operations/audio/ep4-founding-mothers-anthem.md",
  },
};

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

function absolute(relativePath) {
  return path.join(ROOT, relativePath.replace(/^\//, ""));
}

function sha256(relativePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolute(relativePath))).digest("hex");
}

function requireFile(relativePath, label) {
  if (!fs.existsSync(absolute(relativePath))) throw new Error(`${label}: missing ${relativePath}`);
}

function parseAudio(relativePath) {
  requireFile(relativePath, "audio");
  const output = execFileSync("afinfo", [absolute(relativePath)], { encoding: "utf8" });
  const duration = Number(output.match(/estimated duration:\s*([\d.]+) sec/)?.[1]);
  const bytes = Number(output.match(/audio bytes:\s*(\d+)/)?.[1]);
  const bitrate = Number(output.match(/bit rate:\s*(\d+) bits per second/)?.[1]);
  const format = output.match(/Data format:\s*(\d+) ch,\s*(\d+) Hz,\s*\.([^\s]+)/);
  if (!duration || !bytes || !bitrate || !format) throw new Error(`audio: cannot parse afinfo for ${relativePath}`);
  return {
    sourcePath: relativePath.replace(/^\//, ""),
    sha256: sha256(relativePath),
    mimeType: "audio/mpeg",
    durationSeconds: duration,
    audioBytes: bytes,
    bitrateBitsPerSecond: bitrate,
    channels: Number(format[1]),
    sampleRateHz: Number(format[2]),
    codec: format[3],
  };
}

function parseArtwork(relativePath, curation) {
  if (!relativePath) return { status: "MISSING", sourcePath: null, sha256: null, width: null, height: null };
  requireFile(relativePath, "artwork");
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", absolute(relativePath)], {
    encoding: "utf8",
  });
  const width = Number(output.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s*(\d+)/)?.[1]);
  if (!width || !height) throw new Error(`artwork: cannot parse dimensions for ${relativePath}`);
  return {
    status: curation,
    sourcePath: relativePath,
    sha256: sha256(relativePath),
    width,
    height,
  };
}

function lyricEvidence(relativePath) {
  if (!relativePath) {
    return {
      status: "AS_RECORDED_LYRICS_MISSING",
      sourcePath: null,
      sha256: null,
      publicUseAllowed: false,
    };
  }
  requireFile(relativePath, "lyrics");
  return {
    status: "SOURCE_FOUND / CANON_AND_REGISTRY_RECONCILIATION_REQUIRED",
    sourcePath: relativePath,
    sha256: sha256(relativePath),
    publicUseAllowed: false,
  };
}

function trackTitle(registryTitle) {
  return registryTitle.replace(/^Ep\s+\d+\s+·\s+/, "");
}

function releaseProblems(track) {
  const problems = [
    "independent human approval of exact audio for portable release missing",
    "songwriter/composer/lyricist credits missing",
    "performer/producer credits missing",
    "label and publisher fields missing",
    "genre and language approval missing",
    "explicit-content determination missing",
    "territory selection missing",
    "copyright (C) and sound-recording (P) lines missing",
    "ISRC missing",
    "UPC/EAN missing",
    "original release date missing",
    "creator-confirmed Suno original lacks a distribution-eligibility receipt",
  ];
  if (track.artwork.status === "MISSING") problems.push("approved square release artwork missing");
  else problems.push("square artwork exists but distribution approval and rights receipt are missing");
  if (track.lyrics.status === "AS_RECORDED_LYRICS_MISSING") {
    problems.push("exact as-recorded lyrics and timed lyrics/captions missing");
  } else {
    problems.push("found lyric source is not yet reconciled into episode canon and KSVL registry");
    problems.push("timed lyrics/captions missing");
  }
  return problems;
}

function buildTrack(registryTrack) {
  const evidence = TRACK_EVIDENCE[registryTrack.id];
  if (!evidence) throw new Error(`${registryTrack.id}: no evidence mapping`);
  if (registryTrack.status !== "AVAILABLE") throw new Error(`${registryTrack.id}: KSVL status is ${registryTrack.status}`);
  if (registryTrack.sourceStatus !== "FILE_PRESENT_VERIFIED") {
    throw new Error(`${registryTrack.id}: source status is ${registryTrack.sourceStatus}`);
  }
  const audio = parseAudio(registryTrack.src);
  const artwork = parseArtwork(evidence.artwork, evidence.artworkCuration);
  const lyrics = lyricEvidence(evidence.lyrics);
  const item = {
    id: registryTrack.id,
    status: "HOLD",
    actionable: false,
    episodeTitle: evidence.episodeTitle,
    trackTitle: trackTitle(registryTrack.title),
    registryDisplayTitle: registryTrack.title,
    artistDisplayName: registryTrack.artist,
    sourceLesson: registryTrack.sourceLesson,
    ksvlStatus: registryTrack.status,
    sourceRightsAssertion: registryTrack.rightsStatus,
    audio,
    artwork,
    lyrics,
    destinations: DESTINATIONS.map((name) => ({ name, status: "HOLD", deliveryId: null })),
  };
  item.releaseProblems = releaseProblems(item);
  return item;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  requireFile(REGISTRY_PATH, "registry");
  const registry = JSON.parse(fs.readFileSync(absolute(REGISTRY_PATH), "utf8"));
  const registryTracks = registry.tracks || registry;
  if (!Array.isArray(registryTracks)) throw new Error("registry: tracks array missing");
  const selected = TRACK_IDS.map((id) => {
    const matches = registryTracks.filter((track) => track.id === id);
    if (matches.length !== 1) throw new Error(`registry: expected one ${id}, found ${matches.length}`);
    return matches[0];
  });
  const items = selected.map(buildTrack);
  const heldDestinations = items.flatMap((item) => item.destinations).filter((item) => item.status === "HOLD").length;
  if (args.mode === "release") {
    const held = items.filter((item) => item.releaseProblems.length || item.destinations.some((dest) => dest.status === "HOLD"));
    if (held.length) throw new Error(`RELEASE REFUSED: ${held.length}/4 songs remain held or incomplete`);
  }
  const packageData = {
    schema: "laidies.opening-day-music-distribution-preview.v1",
    buildIdentity: "opening-day-music-distribution-v1",
    status: "INTERNAL PREVIEW / HOLD",
    actionable: false,
    deliveriesPerformed: 0,
    sourceRegistry: { sourcePath: REGISTRY_PATH, sha256: sha256(REGISTRY_PATH) },
    intendedDestinations: DESTINATIONS,
    summary: {
      tracks: items.length,
      exactAudioFiles: items.filter((item) => item.audio.sha256).length,
      approvedArtwork: 0,
      reconciledAsRecordedLyrics: 0,
      heldDestinations,
      releaseReadyTracks: 0,
    },
    invariants: {
      episode03EpisodeTitle: "The Burn Book Problem",
      episode03SongTitle: "Don't Be Chutney on the Stand",
      providerCallsAllowed: false,
      placeholderMetadataAllowed: false,
    },
    items,
  };
  const output = path.resolve(args.output || path.join(ROOT, OUTPUT_ROOT, "delivery-plan-preview.json"));
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `${JSON.stringify(packageData, null, 2)}\n`);
  console.log("Opening-day music distribution preview: PASS");
  console.log(`- ${items.length} checksum-bound tracks`);
  console.log(`- ${heldDestinations} held destinations`);
  console.log("- 0 deliveries performed");
  console.log(`- ${path.relative(ROOT, output)}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
