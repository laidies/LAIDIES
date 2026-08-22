#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(
  path.join(root, "content/blend-snap-weekly-packs.json"),
  "utf8"
));
const episodeIndex = JSON.parse(fs.readFileSync(
  path.join(root, "content/episode-index.json"),
  "utf8"
));
const temporaryDirectory = fs.mkdtempSync(
  path.join(os.tmpdir(), "laidies-blend-snap-pack-calibration-")
);

try {
  const episodeTwo = manifest.packs.find((pack) => pack.episodeNumber === 2);
  const cheatSheet = episodeTwo.components.find((component) =>
    component.id === "cheat_sheet"
  );
  Object.assign(cheatSheet, {
    status: "available",
    statusLabel: "Ready",
    publicNote: "Ready to open or print from this menu.",
    route: "/operations/_rejected/study-pack-printables-20260821/prompt-cheat-sheet.html"
  });
  const calibrationPath = path.join(temporaryDirectory, "multi-page-cheat-sheet.json");
  fs.writeFileSync(calibrationPath, JSON.stringify(manifest, null, 2));

  const calibration = spawnSync(
    process.execPath,
    [path.join(root, "scripts/validate-blend-snap-packs.mjs"), "--as-of=2026-08-21"],
    {
      cwd: root,
      env: { ...process.env, BLEND_SNAP_MANIFEST_PATH: calibrationPath },
      encoding: "utf8"
    }
  );
  assert.notEqual(calibration.status, 0,
    "a multi-page printable must not pass as a one-page Cheat Sheet");
  assert.match(`${calibration.stdout}\n${calibration.stderr}`,
    /must contain exactly one printable page/,
    "the calibrated failure must name the one-page contract");

  const staleIndex = structuredClone(episodeIndex);
  staleIndex.episodes.find((episode) => episode.number === 1).siteLinks.push({
    label: "Open the held Episode 01 card pack",
    url: "games/trading-cards.html",
    type: "cardPack"
  });
  const staleIndexPath = path.join(temporaryDirectory, "stale-held-link-index.json");
  fs.writeFileSync(staleIndexPath, JSON.stringify(staleIndex, null, 2));
  const staleLinkCalibration = spawnSync(
    process.execPath,
    [path.join(root, "scripts/validate-blend-snap-packs.mjs"), "--as-of=2026-08-21"],
    {
      cwd: root,
      env: { ...process.env, BLEND_SNAP_EPISODE_INDEX_PATH: staleIndexPath },
      encoding: "utf8"
    }
  );
  assert.notEqual(staleLinkCalibration.status, 0,
    "a held card pack must not remain discoverable through the episode index");
  assert.match(`${staleLinkCalibration.stdout}\n${staleLinkCalibration.stderr}`,
    /index still advertises a held card pack/,
    "the calibrated failure must name the stale public consumer");

  console.log("BLEND & SNAP PACK VALIDATOR TEST PASS multi_page_cheat_sheet=FAIL_AS_CALIBRATED held_public_link=FAIL_AS_CALIBRATED");
} finally {
  fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
