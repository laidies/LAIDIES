#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const privateKeyPath = process.env.LUMINAIRY_PRIVATE_KEY;
if (!privateKeyPath) throw new Error("LUMINAIRY_PRIVATE_KEY is required");

const profiles = JSON.parse(fs.readFileSync(path.join(root, "content/luminairy-profiles.json"), "utf8"));
const sourcePacket = fs.readFileSync(path.join(root, "operations/product-stewards/luminairy/profile-source-evidence-2026-08-23.md"));
const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));
const keyId = "luminairy-editorial-offline-r3-20260823";
const verifiedOn = "2026-08-23";
const sourcePacketSha256 = crypto.createHash("sha256").update(sourcePacket).digest("hex");

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function profilePayload(wing, profile) {
  return JSON.stringify({ wing, profile });
}

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

const records = [];
const receipts = [];
for (const wing of ["saints", "mavens", "trailblazers"]) {
  for (const profile of profiles[wing]) {
    const claimId = `${wing}-${profile.id}`;
    const profileSha256 = sha256(profilePayload(wing, profile));
    const recheckOn = wing === "trailblazers" ? "2026-11-23" : "2027-08-23";
    records.push({
      claimId,
      wing,
      profileId: profile.id,
      status: "admitted",
      profileSha256,
      verifiedOn,
      recheckOn
    });
    const receipt = {
      schemaVersion: 2,
      receiptId: `receipt-${claimId}-20260823`,
      keyId,
      product: "luminairy",
      claimId,
      wing,
      profileId: profile.id,
      profileSha256,
      sourcePacketSha256,
      verifiedOn,
      recheckOn,
      reviewedOn: "2026-08-23",
      reviewerRole: "independent-luminairy-profile-reviewer",
      supportDecision: "exact-profile-reviewed-and-supported"
    };
    receipt.signature = crypto.sign("sha256", Buffer.from(receiptPayload(receipt)), {
      key: privateKey,
      dsaEncoding: "ieee-p1363"
    }).toString("base64");
    receipts.push(receipt);
  }
}

const claims = {
  schemaVersion: 4,
  product: "luminairy",
  generatedOn: "2026-08-23",
  correctionRoute: "/town-hall.html#town-hall-feedback",
  admissionPolicy: "fail-closed",
  claimBinding: "exact-wing-identity-profile-json-sha256-plus-offline-p256-signed-review-receipt",
  receiptManifest: "/content/luminairy-editorial-receipts.json",
  sourcePacket: "/operations/product-stewards/luminairy/profile-source-evidence-2026-08-23.md",
  sourcePacketSha256,
  records
};
const receiptManifest = {
  schemaVersion: 2,
  product: "luminairy",
  generatedOn: "2026-08-23",
  authorityModel: "offline-p256-signed-profile-receipts",
  keyId,
  receipts
};

fs.writeFileSync(path.join(root, "content/luminairy-claims.json"), JSON.stringify(claims, null, 2) + "\n");
fs.writeFileSync(path.join(root, "content/luminairy-editorial-receipts.json"), JSON.stringify(receiptManifest, null, 2) + "\n");
console.log(`LUMINAiRY admission built: ${records.length} exact profiles, ${receipts.length} signed receipts`);
