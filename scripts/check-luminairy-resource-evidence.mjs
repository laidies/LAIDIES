#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.LUMINAIRY_ROOT || path.resolve(import.meta.dirname, ".."));
const profilePath = path.resolve(process.env.LUMINAIRY_PROFILES_PATH || path.join(root, "content/luminairy-profiles.json"));
const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
const roster = new Map([
  ...profiles.mavens.map((profile) => [profile.id, { wing: "mavens", profile }]),
  ...profiles.trailblazers.map((profile) => [profile.id, { wing: "trailblazers", profile }])
]);
const folder = path.join(root, "operations/product-stewards/luminairy");
const files = fs.readdirSync(folder).filter((name) => /^profile-resource-evidence-batch-\d\d-2026-09-02\.json$/.test(name)).sort();
const errors = [];
const seen = new Set();
const hashes = [];
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const comparableLinks = (links = []) => links.map(({ type, label, url }) => ({ type, label, url }));

for (const file of files) {
  const evidence = JSON.parse(fs.readFileSync(path.join(folder, file), "utf8"));
  if (evidence.schemaVersion !== "luminairy-profile-resource-evidence.v1" || evidence.checkedOn !== "2026-09-02") errors.push(`${file}: schema/date mismatch`);
  if (!Array.isArray(evidence.profiles) || evidence.profiles.length !== 5) errors.push(`${file}: batch must contain five profiles`);
  for (const item of evidence.profiles || []) {
    const entry = roster.get(item.profileId);
    if (!entry || seen.has(item.profileId)) {
      errors.push(`${file}: unknown or duplicate profile ${item.profileId}`);
      continue;
    }
    seen.add(item.profileId);
    const imagePath = path.join(root, entry.profile.image.replace(/^\//, ""));
    const imageHash = fs.existsSync(imagePath) ? sha256(fs.readFileSync(imagePath)) : "missing";
    if (item.image?.sha256 !== imageHash || item.image?.verdict !== "pass-to-retain" || !item.image?.reference || !item.image?.finding) errors.push(`${item.profileId}: image evidence mismatch`);
    if (item.roleAbout?.text !== entry.profile.about || !Array.isArray(item.roleAbout?.sources) || item.roleAbout.sources.length < 1) errors.push(`${item.profileId}: role/about evidence mismatch`);
    if (item.lesson?.text !== entry.profile.lesson) errors.push(`${item.profileId}: lesson evidence mismatch`);
    if (JSON.stringify(comparableLinks(item.links)) !== JSON.stringify(comparableLinks(entry.profile.links))) errors.push(`${item.profileId}: destination evidence mismatch`);
    if (!item.links?.every((link) => ["read", "watch", "listen", "follow"].includes(link.type) && /^https:\/\//.test(link.url) && new RegExp(`^${link.type}`, "i").test(link.label))) errors.push(`${item.profileId}: destination type/label mismatch`);
    hashes.push({ profileId: item.profileId, evidenceSha256: sha256(JSON.stringify(item)) });
  }
}

if (process.argv.includes("--require-all") && seen.size !== 30) errors.push(`complete evidence requires 30 profiles, found ${seen.size}`);
if (errors.length) {
  console.error("LUMINAiRY RESOURCE EVIDENCE FAIL");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`LUMINAiRY RESOURCE EVIDENCE PASS: ${seen.size}/30 profiles bound across ${files.length}/6 batches`);
for (const item of hashes) console.log(`${item.profileId} ${item.evidenceSha256}`);
