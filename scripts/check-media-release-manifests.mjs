#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const paths = process.argv.slice(2);

if (!paths.length) {
  console.error("Usage: node scripts/check-media-release-manifests.mjs <manifest.json> [...]");
  process.exit(2);
}

const SHA256 = /^[a-f0-9]{64}$/;
const RELEASE_TYPES = new Set(["EPISODE", "TRAILER", "SONG", "SINGLE", "ALBUM", "COLLECTION"]);
const PUBLIC_STATES = new Set(["ACCEPTED", "DEPLOYED", "VERIFIED_PUBLICLY"]);
const MUSIC_TYPES = new Set(["SONG", "SINGLE", "ALBUM", "COLLECTION"]);

let failureCount = 0;

function fail(path, message) {
  failureCount += 1;
  console.error(`FAIL ${path}: ${message}`);
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function arrayWithValues(value) {
  return Array.isArray(value) && value.length > 0;
}

for (const inputPath of paths) {
  const failuresBeforeFile = failureCount;
  const path = resolve(inputPath);
  let manifest;

  try {
    manifest = JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    fail(inputPath, `cannot parse JSON (${error.message})`);
    continue;
  }

  if (manifest.schemaVersion !== "1.0.0") fail(inputPath, "schemaVersion must be 1.0.0");
  if (!nonEmpty(manifest.releaseId)) fail(inputPath, "releaseId is required");
  if (!RELEASE_TYPES.has(manifest.releaseType)) fail(inputPath, "releaseType is invalid");
  if (!Number.isInteger(manifest.version) || manifest.version < 1) fail(inputPath, "version must be a positive integer");
  if (!nonEmpty(manifest.status)) fail(inputPath, "status is required");
  if (!nonEmpty(manifest.canonical?.title)) fail(inputPath, "canonical.title is required");
  if (!nonEmpty(manifest.canonical?.canonicalUrl)) fail(inputPath, "canonical.canonicalUrl is required");
  if (!arrayWithValues(manifest.canonical?.canonRefs)) fail(inputPath, "canonical.canonRefs must name at least one source");
  if (!arrayWithValues(manifest.artwork)) fail(inputPath, "at least one artwork record is required");
  if (!arrayWithValues(manifest.assets)) fail(inputPath, "at least one media asset is required");

  const artworkIds = new Set();
  for (const [index, artwork] of (manifest.artwork || []).entries()) {
    const label = `artwork[${index}]`;
    if (!nonEmpty(artwork.artworkId)) fail(inputPath, `${label}.artworkId is required`);
    else if (artworkIds.has(artwork.artworkId)) fail(inputPath, `${label}.artworkId is duplicated`);
    else artworkIds.add(artwork.artworkId);
    if (!nonEmpty(artwork.sourcePath)) fail(inputPath, `${label}.sourcePath is required`);
    if (!SHA256.test(artwork.sha256 || "")) fail(inputPath, `${label}.sha256 must be an exact SHA-256`);
    if (!Number.isInteger(artwork.width) || artwork.width < 1) fail(inputPath, `${label}.width is invalid`);
    if (!Number.isInteger(artwork.height) || artwork.height < 1) fail(inputPath, `${label}.height is invalid`);
    if (!nonEmpty(artwork.altText)) fail(inputPath, `${label}.altText is required`);
    if (!nonEmpty(artwork.approvalStatus)) fail(inputPath, `${label}.approvalStatus is required`);
    if (artwork.derivedFrom && !nonEmpty(artwork.safeAreaNotes)) {
      fail(inputPath, `${label} is derived artwork but has no crop/safe-area notes`);
    }
  }

  for (const [index, asset] of (manifest.assets || []).entries()) {
    const label = `assets[${index}]`;
    if (!nonEmpty(asset.role)) fail(inputPath, `${label}.role is required`);
    if (!nonEmpty(asset.sourcePath)) fail(inputPath, `${label}.sourcePath is required`);
    if (!SHA256.test(asset.sha256 || "")) fail(inputPath, `${label}.sha256 must be an exact SHA-256`);
    if (!nonEmpty(asset.mimeType)) fail(inputPath, `${label}.mimeType is required`);
  }

  if (manifest.releaseType === "EPISODE" || manifest.releaseType === "TRAILER") {
    const masterCover = (manifest.artwork || []).find((item) => item.kind === "MASTER_EPISODE_COVER");
    if (!masterCover) fail(inputPath, "episode/trailer requires MASTER_EPISODE_COVER");
    else {
      if (masterCover.approvalStatus !== "PASS") fail(inputPath, "master episode cover must have approvalStatus PASS");
      if (!nonEmpty(masterCover.approvalRef)) fail(inputPath, "master episode cover must name approval evidence");
      if (!masterCover.focalPoint && !nonEmpty(masterCover.safeAreaNotes)) {
        fail(inputPath, "master episode cover must define focalPoint or safeAreaNotes");
      }
    }

    for (const kind of ["PODCAST_SQUARE", "YOUTUBE_THUMBNAIL", "SITE_POSTER"]) {
      const derivative = (manifest.artwork || []).find((item) => item.kind === kind);
      if (!derivative) fail(inputPath, `episode/trailer requires ${kind}`);
      else if (derivative.derivedFrom !== masterCover?.artworkId) {
        fail(inputPath, `${kind} must derive from the approved master episode cover`);
      }
    }
  }

  if (MUSIC_TYPES.has(manifest.releaseType)) {
    const music = manifest.musicMetadata;
    if (!music) fail(inputPath, "music release requires musicMetadata");
    else {
      for (const field of ["artistDisplayName", "artistId", "trackTitle", "releaseTitle", "audioSha256", "lyricsRef", "artworkId", "rightsStatus"]) {
        if (!nonEmpty(music[field])) fail(inputPath, `musicMetadata.${field} is required`);
      }
      for (const field of ["songwriters", "performers", "producers", "genres", "territories"]) {
        if (!arrayWithValues(music[field])) fail(inputPath, `musicMetadata.${field} must not be empty`);
      }
      if (!artworkIds.has(music.artworkId)) fail(inputPath, "musicMetadata.artworkId does not resolve to artwork");
      if (!SHA256.test(music.audioSha256 || "")) fail(inputPath, "musicMetadata.audioSha256 must be an exact SHA-256");
    }
  }

  const propagation = manifest.correctionPropagation;
  if (!propagation || !Array.isArray(propagation.affectedConsumers)) {
    fail(inputPath, "correctionPropagation.affectedConsumers is required");
  }
  if (PUBLIC_STATES.has(manifest.status) && propagation?.complete !== true) {
    fail(inputPath, `${manifest.status} requires correctionPropagation.complete=true`);
  }

  if (manifest.status === "VERIFIED_PUBLICLY") {
    if (!manifest.releaseReceipt?.publicVerificationRef) {
      fail(inputPath, "VERIFIED_PUBLICLY requires releaseReceipt.publicVerificationRef");
    }
    if (!(manifest.destinations || []).some((item) => item.status === "VERIFIED_PUBLICLY")) {
      fail(inputPath, "VERIFIED_PUBLICLY requires at least one publicly verified destination");
    }
  }

  if (failureCount === failuresBeforeFile) console.log(`PASS ${inputPath}`);
}

if (failureCount) {
  console.error(`${failureCount} media-release validation failure(s)`);
  process.exit(1);
}
