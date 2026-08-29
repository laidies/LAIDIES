#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const profilePath = path.resolve(process.env.LUMINAIRY_PROFILES_PATH || path.join(root, "content/luminairy-profiles.json"));
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const profiles = JSON.parse(fs.readFileSync(profilePath, "utf8"));
const claims = JSON.parse(read("content/luminairy-claims.json"));
const receiptManifest = JSON.parse(read("content/luminairy-editorial-receipts.json"));
const html = read("luminairy.html");
const css = read("content/luminairy-v2.css");
const gate = read("content/site/luminairy-claim-gate.js");
const sourcePacket = read("operations/product-stewards/luminairy/profile-source-evidence-2026-08-23.md");
const errors = [];
const today = new Date().toISOString().slice(0, 10);
const publicJwk = {
  kty: "EC",
  crv: "P-256",
  x: "Sx-f3-ZiCYm-OOzoxfbsZjLgx6GW1AEff0gWB-C8r6Q",
  y: "X_qk0_B9K2GKckhIM8WS6_NJB-6HXRlO0T1YappGRv4"
};

const sha256 = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const profilePayload = (wing, profile) => JSON.stringify({ wing, profile });
function receiptPayload(receipt) {
  return JSON.stringify({
    schemaVersion: receipt.schemaVersion,
    receiptId: receipt.receiptId,
    keyId: receipt.keyId,
    product: receipt.product,
    claimId: receipt.claimId,
    wing: receipt.wing,
    profileId: receipt.profileId,
    profileSha256: receipt.profileSha256,
    sourcePacketSha256: receipt.sourcePacketSha256,
    verifiedOn: receipt.verifiedOn,
    recheckOn: receipt.recheckOn,
    reviewedOn: receipt.reviewedOn,
    reviewerRole: receipt.reviewerRole,
    supportDecision: receipt.supportDecision
  });
}
function strictDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")) && new Date(value + "T00:00:00Z").toISOString().slice(0, 10) === value;
}
function localPath(url) {
  return path.join(root, String(url).replace(/^\//, ""));
}

if (claims.schemaVersion !== 4 || claims.product !== "luminairy" || claims.admissionPolicy !== "fail-closed") errors.push("claim manifest schema/policy mismatch");
if (claims.receiptManifest !== "/content/luminairy-editorial-receipts.json") errors.push("receipt manifest is not bound");
if (receiptManifest.schemaVersion !== 2 || receiptManifest.authorityModel !== "offline-p256-signed-profile-receipts") errors.push("receipt authority mismatch");
if (claims.sourcePacketSha256 !== sha256(sourcePacket)) errors.push("source packet hash mismatch");
if (!html.includes("luminairy-claim-gate.js") || html.indexOf("luminairy-claim-gate.js") > html.indexOf("luminairy-app.js")) errors.push("runtime gate must load before app");
if (!gate.includes(publicJwk.x) || !gate.includes(publicJwk.y)) errors.push("runtime trusted key mismatch");
if (!html.includes(claims.correctionRoute)) errors.push("visible correction route mismatch");
if (!css.includes("--lum-sapphire") || !css.includes("--lum-amber") || !css.includes("--lum-pink") || !css.includes("--lum-red")) errors.push("four wing/anti palettes are not present");

const expected = { saints: 13, mavens: 23, trailblazers: 7 };
const profileEntries = new Map();
for (const wing of Object.keys(expected)) {
  if (!Array.isArray(profiles[wing]) || profiles[wing].length !== expected[wing]) {
    errors.push(`${wing} count must be ${expected[wing]}`);
    continue;
  }
  for (const profile of profiles[wing]) {
    const key = `${wing}:${profile.id}`;
    if (!profile.id || profileEntries.has(key)) errors.push(`duplicate/missing profile identity ${key}`);
    profileEntries.set(key, { wing, profile });
    if (!profile.name || !profile.role || !profile.about || !profile.lesson || !profile.image) errors.push(`incomplete public profile ${key}`);
    if (!fs.existsSync(localPath(profile.image))) errors.push(`missing image ${profile.image}`);
    if (wing === "saints") {
      if (!profile.song || !profile.songLabel) errors.push(`Saint song assignment missing ${profile.id}`);
      else if (profile.songStatus !== "deferred" && !fs.existsSync(localPath(profile.song))) errors.push(`missing Saint song bytes ${profile.song}`);
      if (profile.songStatus === "deferred" && fs.existsSync(localPath(profile.song))) errors.push(`deferred Saint song unexpectedly has bytes ${profile.song}`);
    } else {
      if (!Array.isArray(profile.links) || profile.links.length < 1) errors.push(`work/source link missing ${key}`);
      for (const link of profile.links || []) if (!/^https:\/\//.test(link.url || "")) errors.push(`non-HTTPS external link ${key}`);
    }
  }
}
for (const retired of ["Oprah Winfrey", "Jessica Fletcher", "Jennifer Lopez"]) {
  if (JSON.stringify(profiles).includes(retired) || html.includes(retired)) errors.push(`retired profile remains: ${retired}`);
}

if (!Array.isArray(claims.records) || claims.records.length !== profileEntries.size) errors.push("claim coverage mismatch");
if (!Array.isArray(receiptManifest.receipts) || receiptManifest.receipts.length !== profileEntries.size) errors.push("receipt coverage mismatch");
const recordMap = new Map();
for (const record of claims.records || []) {
  const entry = profileEntries.get(`${record.wing}:${record.profileId}`);
  if (!entry || record.claimId !== `${record.wing}-${record.profileId}` || record.status !== "admitted" || recordMap.has(record.claimId)) errors.push(`invalid claim identity ${record.claimId}`);
  else if (record.profileSha256 !== sha256(profilePayload(entry.wing, entry.profile))) errors.push(`profile hash mismatch ${record.claimId}`);
  if (!strictDate(record.verifiedOn) || record.verifiedOn > today || !strictDate(record.recheckOn) || record.recheckOn < today) errors.push(`invalid/expired claim dates ${record.claimId}`);
  recordMap.set(record.claimId, record);
}
const receiptClaims = new Set();
for (const receipt of receiptManifest.receipts || []) {
  const record = recordMap.get(receipt.claimId);
  if (!record || receiptClaims.has(receipt.claimId) || receipt.keyId !== receiptManifest.keyId || receipt.profileSha256 !== record.profileSha256 || receipt.sourcePacketSha256 !== claims.sourcePacketSha256 || receipt.supportDecision !== "exact-profile-reviewed-and-supported") errors.push(`receipt mismatch ${receipt.claimId}`);
  try {
    const valid = crypto.verify("sha256", Buffer.from(receiptPayload(receipt)), { key: crypto.createPublicKey({ key: publicJwk, format: "jwk" }), dsaEncoding: "ieee-p1363" }, Buffer.from(receipt.signature || "", "base64"));
    if (!valid) errors.push(`signature invalid ${receipt.claimId}`);
  } catch { errors.push(`signature invalid ${receipt.claimId}`); }
  receiptClaims.add(receipt.claimId);
}

if (errors.length) {
  console.error("LUMINAiRY CLAIM VALIDATION FAIL");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`LUMINAiRY CLAIM VALIDATION PASS: ${profileEntries.size} complete profiles, exact assets, sources, songs, and offline-signed receipts`);
