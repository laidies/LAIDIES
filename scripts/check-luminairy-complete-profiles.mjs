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
if (!regina?.antiSaint || sha256(localPath(regina.image)) !== "3df37df94b12c09f42d655c006b828a00f17fb2247f1270d723e38c349ae6b3f") errors.push("Regina must remain the exact reference-bound red anti-saint image");
const deb = profiles.saints?.find((profile) => profile.id === "deb");
if (!deb || sha256(localPath(deb.image)) !== "8ead4e383486f664df849e2cc25f13da707d3486fc490ef9bae2e3bda1ba3cc6") errors.push("Deb must use the exact reference-bound Mayor Deb image bytes");
const samantha = profiles.saints?.find((profile) => profile.id === "samantha-jones");
if (!samantha || sha256(localPath(samantha.image)) !== "fb334e3a615991c1d8b3d9648993a505fdf5e1ce8df8f74fdd5e722a9cc0bb22") errors.push("Samantha Jones must use the exact reference-bound corrected image bytes");
const carrie = profiles.saints?.find((profile) => profile.id === "carrie-bradshaw");
if (!carrie || sha256(localPath(carrie.image)) !== "a51611de93b4588b8d459f9c2b5928426ab1d0dabbd36a12562f7c1d9d2067fd") errors.push("Carrie Bradshaw must use the exact reference-bound corrected image bytes");

const patronFringeAdmissionPath = path.join(root, "operations/product-stewards/luminairy/patron-fringe-correction-admission-2026-09-05.json");
if (!fs.existsSync(patronFringeAdmissionPath)) {
  errors.push("Patron fringe-correction admission is missing");
} else {
  const patronFringeAdmission = JSON.parse(fs.readFileSync(patronFringeAdmissionPath, "utf8"));
  for (const [id, expectedHash] of Object.entries(patronFringeAdmission.images || {})) {
    const profile = profiles.saints?.find((candidate) => candidate.id === id);
    if (!profile || sha256(localPath(profile.image)) !== expectedHash) errors.push(`Patron despill bytes changed ${id}`);
  }
}

const patronLikenessAdmissionPath = path.join(root, "operations/product-stewards/luminairy/patron-likeness-admission-2026-09-05.json");
if (!fs.existsSync(patronLikenessAdmissionPath)) {
  errors.push("Patron likeness admission is missing");
} else {
  const patronLikenessAdmission = JSON.parse(fs.readFileSync(patronLikenessAdmissionPath, "utf8"));
  if (patronLikenessAdmission.verdict !== "PASS" || patronLikenessAdmission.identityHolds !== 0 || patronLikenessAdmission.pixelFinishHolds !== 0) errors.push("Patron likeness admission must remain a zero-hold PASS");
  if (patronLikenessAdmission.profiles?.length !== 13) errors.push("Patron likeness admission must bind all 13 profiles");
  for (const entry of patronLikenessAdmission.profiles || []) {
    const profile = profiles.saints?.find((candidate) => candidate.id === entry.id);
    if (!profile || sha256(localPath(profile.image)) !== entry.imageSha256) errors.push(`Patron likeness bytes changed ${entry.id}`);
  }
}

if (errors.length) {
  console.error("LUMINAiRY COMPLETE PROFILE CHECK FAIL");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("LUMINAiRY COMPLETE PROFILE CHECK PASS: 13 Saints, 23 MAiVENs, 7 Trailblazers; deep profiles, exact image families, songs and typed destinations present");
