#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const profilePath = path.resolve(process.env.LUMINAIRY_PROFILES_PATH || path.join(root, "content/luminairy-profiles.json"));
const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
const errors = [];
const expectedCounts = { saints: 13, mavens: 23, trailblazers: 7 };
const imageFamilies = {
  saints: "/assets/saints/y2k-stained-glass-v13-luminous-comic/",
  mavens: "/assets/mavens/y2k-stained-glass-v6-luminous-comic/",
  trailblazers: "/assets/trailblazers/y2k-stained-glass-v1-luminous-comic/"
};
const ids = new Set();

function localPath(publicPath) {
  return path.join(root, String(publicPath || "").replace(/^\//, ""));
}

function pngDimensions(filePath) {
  const bytes = fs.readFileSync(filePath);
  if (bytes.length < 24 || bytes.subarray(1, 4).toString("ascii") !== "PNG") return null;
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

for (const [wing, expectedCount] of Object.entries(expectedCounts)) {
  const group = profiles[wing];
  if (!Array.isArray(group) || group.length !== expectedCount) {
    errors.push(`${wing} count must be ${expectedCount}`);
    continue;
  }

  for (const profile of group) {
    const label = `${wing}:${profile.id || "missing-id"}`;
    if (!profile.id || ids.has(profile.id)) errors.push(`duplicate or missing profile id ${label}`);
    ids.add(profile.id);
    if (!profile.name || !profile.role || !profile.about || !profile.lesson) errors.push(`missing core profile copy ${label}`);
    if (!profile.whyHere || !profile.move || !profile.tryIt || !profile.boundary) errors.push(`missing deep profile section ${label}`);
    if (!Array.isArray(profile.contribution) || profile.contribution.length !== 2 || profile.contribution.some((p) => !String(p).trim())) errors.push(`contribution must contain exactly two paragraphs ${label}`);
    if (!String(profile.image || "").startsWith(imageFamilies[wing])) errors.push(`wrong image family ${label}: ${profile.image || "missing"}`);

    const imagePath = localPath(profile.image);
    if (!fs.existsSync(imagePath)) {
      errors.push(`missing image ${label}: ${profile.image}`);
    } else {
      const dimensions = pngDimensions(imagePath);
      if (!dimensions || dimensions[0] !== 1024 || dimensions[1] !== 1536) errors.push(`image must be PNG 1024x1536 ${label}`);
    }

    if (wing === "saints") {
      if (!profile.song || !profile.songLabel) errors.push(`Saint song assignment missing ${profile.id}`);
      const songExists = profile.song ? fs.existsSync(localPath(profile.song)) : false;
      if (profile.id === "carrie-bradshaw") {
        if (profile.songStatus !== "deferred" || songExists) errors.push("Carrie must remain the sole deferred Saint song until audio is delivered");
      } else if (!songExists || profile.songStatus === "deferred") {
        errors.push(`admitted Saint song bytes missing ${profile.id}`);
      }
    } else {
      if (!Array.isArray(profile.links) || profile.links.length < 1) errors.push(`verified destinations missing ${label}`);
      for (const link of profile.links || []) {
        if (!['read', 'watch', 'listen', 'follow'].includes(link.type)) errors.push(`invalid destination type ${label}: ${link.type}`);
        if (!link.label || !/^https:\/\//.test(link.url || "")) errors.push(`invalid destination ${label}`);
      }
    }
  }
}

if (ids.size !== 43) errors.push(`unique profile total must be 43, found ${ids.size}`);
const allText = JSON.stringify(profiles);
for (const retired of ["Oprah Winfrey", "Jessica Fletcher", "Jennifer Lopez"]) {
  if (allText.includes(retired)) errors.push(`retired profile remains: ${retired}`);
}

const cher = profiles.saints?.find((profile) => profile.id === "cher-dionne");
if (!cher || sha256(localPath(cher.image)) !== "c675af16c8584950f897433debd0c9136d6aa8a89971f241444dfa33d7c5440e") errors.push("Cher and Dionne must use the exact approved V12 image bytes");
const regina = profiles.saints?.find((profile) => profile.id === "regina-george");
if (!regina?.antiSaint || sha256(localPath(regina.image)) !== "d6b419f23588f77e182f5719a3cffc89e7c6c4546ecf611d68881bad23c6bb47") errors.push("Regina must remain the exact red anti-saint image");

if (errors.length) {
  console.error("LUMINAiRY COMPLETE PROFILE CHECK FAIL");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("LUMINAiRY COMPLETE PROFILE CHECK PASS: 13 Saints, 23 MAiVENs, 7 Trailblazers; deep profiles, exact image families, songs and typed destinations present");
