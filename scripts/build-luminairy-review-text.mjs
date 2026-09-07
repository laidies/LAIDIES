#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const profilesPath = path.join(root, "content/luminairy-profiles.json");
const reviewRelative = "operations/product-stewards/luminairy/complete-profile-review-text-2026-09-07.md";
const manifestRelative = "operations/product-stewards/luminairy/complete-profile-content-artifact-manifest-2026-09-07.json";
const reviewPath = path.join(root, reviewRelative);
const manifestPath = path.join(root, manifestRelative);
const profilesBytes = fs.readFileSync(profilesPath);
const profiles = JSON.parse(profilesBytes);
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

const lines = [
  "# The LUMINAiRY complete profile review text",
  "",
  "Candidate: LUMINAIRY-COMPLETE-43-PROFILE-TEACHING-CHAIN-20260907",
  "Roster: 13 Patron Saints · 23 MAiVENs · 7 Trailblazers",
  ""
];

for (const wing of ["saints", "mavens", "trailblazers"]) {
  lines.push(`## ${wing}`, "");
  for (const profile of profiles[wing]) {
    lines.push(
      `### ${profile.name}`,
      "",
      `Role: ${profile.role}`,
      "",
      `At a glance: ${profile.about}`,
      "",
      `Why this profile is here: ${profile.whyHere}`,
      "",
      "Contribution:"
    );
    for (const item of profile.contribution) lines.push(`- ${item}`);
    lines.push("", "The AI concepts this opens up:");
    for (const concept of profile.concepts) lines.push(`- ${concept.name}: ${concept.connection}`);
    lines.push(
      "",
      `How people meet this in AI: ${profile.humanInteraction}`,
      "",
      `Why this matters at work now: ${profile.whyItMattersNow}`,
      "",
      `The move to borrow: ${profile.move}`,
      "",
      `Try it at work: ${profile.tryIt}`,
      "",
      `Where this lesson stops: ${profile.boundary}`,
      ""
    );
    if (wing === "saints") {
      lines.push(`Song: ${profile.songLabel} — ${profile.song}`, "");
    } else {
      lines.push("Destinations:");
      for (const link of profile.links) lines.push(`- ${link.type}: ${link.label} — ${link.url}`);
      lines.push("", `Freshness: ${profile.freshness}`, "");
    }
  }
}

const reviewBytes = Buffer.from(`${lines.join("\n").trimEnd()}\n`);
fs.writeFileSync(reviewPath, reviewBytes);
const manifest = {
  schemaVersion: "laidies-content-artifact-manifest.v1",
  candidateId: "LUMINAIRY-COMPLETE-43-PROFILE-TEACHING-CHAIN-20260907",
  surface: "The LUMINAiRY complete Patron Saint, MAiVEN and Trailblazer profiles",
  contentClass: "REFERENCE",
  reviewText: { path: reviewRelative, sha256: sha256(reviewBytes) },
  source: { path: "content/luminairy-profiles.json", sha256: sha256(profilesBytes) },
  roster: { saints: profiles.saints.length, mavens: profiles.mavens.length, trailblazers: profiles.trailblazers.length }
};
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote exact review text for ${profiles.saints.length + profiles.mavens.length + profiles.trailblazers.length} profiles.`);
