#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const privateKeyPath = process.env.LUMINAIRY_SIGNING_KEY;
if (!privateKeyPath || !path.isAbsolute(privateKeyPath) || !fs.existsSync(privateKeyPath)) {
  throw new Error("LUMINAIRY_SIGNING_KEY must name an existing absolute private-key path outside the repository");
}
const keyId = "luminairy-editorial-offline-r5-20260902";
const profilesPath = path.join(root, "content/luminairy-profiles.json");
const claimsPath = path.join(root, "content/luminairy-claims.json");
const receiptsPath = path.join(root, "content/luminairy-editorial-receipts.json");
const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
const claims = JSON.parse(fs.readFileSync(claimsPath, "utf8"));
const receiptManifest = JSON.parse(fs.readFileSync(receiptsPath, "utf8"));
const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));
const sha256 = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const evidence = new Map();
const evidenceFolder = path.join(root, "operations/product-stewards/luminairy");
for (const file of fs.readdirSync(evidenceFolder).filter((name) => /^profile-resource-evidence-batch-\d\d-2026-09-02\.json$/.test(name)).sort()) {
  const batch = JSON.parse(fs.readFileSync(path.join(evidenceFolder, file), "utf8"));
  for (const item of batch.profiles || []) {
    if (evidence.has(item.profileId)) throw new Error(`duplicate evidence ${item.profileId}`);
    evidence.set(item.profileId, sha256(JSON.stringify(item)));
  }
}
if (evidence.size !== 30) throw new Error(`expected 30 evidence records, found ${evidence.size}`);

const profileMap = new Map();
for (const wing of ["saints", "mavens", "trailblazers"]) {
  for (const profile of profiles[wing]) profileMap.set(`${wing}-${profile.id}`, { wing, profile });
}
const oldSaintClaims = JSON.stringify(claims.records.filter((item) => item.wing === "saints"));
const oldSaintReceipts = JSON.stringify(receiptManifest.receipts.filter((item) => item.wing === "saints"));
claims.generatedOn = "2026-09-02";
claims.claimBinding = "exact-wing-identity-profile-json-sha256-plus-profile-resource-evidence-sha256-plus-offline-p256-signed-review-receipt";
claims.records = claims.records.map((record) => {
  if (record.wing === "saints") return record;
  const entry = profileMap.get(record.claimId);
  if (!entry) throw new Error(`profile missing ${record.claimId}`);
  return {
    claimId: record.claimId,
    wing: record.wing,
    profileId: record.profileId,
    status: "admitted",
    profileSha256: sha256(JSON.stringify({ wing: entry.wing, profile: entry.profile })),
    resourceEvidenceSha256: evidence.get(record.profileId),
    verifiedOn: "2026-09-02",
    recheckOn: record.wing === "trailblazers" ? "2026-12-02" : "2027-03-02"
  };
});
const recordMap = new Map(claims.records.map((record) => [record.claimId, record]));
function payload(receipt) {
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
    ...(receipt.resourceEvidenceSha256 ? { resourceEvidenceSha256: receipt.resourceEvidenceSha256 } : {}),
    verifiedOn: receipt.verifiedOn,
    recheckOn: receipt.recheckOn,
    reviewedOn: receipt.reviewedOn,
    reviewerRole: receipt.reviewerRole,
    supportDecision: receipt.supportDecision
  });
}
receiptManifest.generatedOn = "2026-09-02";
receiptManifest.trustedKeyIds = Array.from(new Set([...receiptManifest.trustedKeyIds, keyId]));
receiptManifest.receipts = receiptManifest.receipts.map((oldReceipt) => {
  if (oldReceipt.wing === "saints") return oldReceipt;
  const record = recordMap.get(oldReceipt.claimId);
  if (!record) throw new Error(`claim missing ${oldReceipt.claimId}`);
  const receipt = {
    schemaVersion: 2,
    receiptId: `receipt-${record.claimId}-20260902-r5`,
    keyId,
    product: "luminairy",
    claimId: record.claimId,
    wing: record.wing,
    profileId: record.profileId,
    profileSha256: record.profileSha256,
    sourcePacketSha256: claims.sourcePacketSha256,
    resourceEvidenceSha256: record.resourceEvidenceSha256,
    verifiedOn: record.verifiedOn,
    recheckOn: record.recheckOn,
    reviewedOn: "2026-09-02",
    reviewerRole: "independent-luminairy-profile-resource-reviewer",
    supportDecision: "exact-profile-reviewed-and-supported"
  };
  receipt.signature = crypto.sign("sha256", Buffer.from(payload(receipt)), { key: privateKey, dsaEncoding: "ieee-p1363" }).toString("base64");
  return receipt;
});
if (JSON.stringify(claims.records.filter((item) => item.wing === "saints")) !== oldSaintClaims) throw new Error("Saint claim objects changed");
if (JSON.stringify(receiptManifest.receipts.filter((item) => item.wing === "saints")) !== oldSaintReceipts) throw new Error("Saint receipt objects changed");
fs.writeFileSync(claimsPath, JSON.stringify(claims, null, 2) + "\n");
fs.writeFileSync(receiptsPath, JSON.stringify(receiptManifest, null, 2) + "\n");
console.log(`Signed ${evidence.size} MAiVEN/Trailblazer profile-resource receipts with ${keyId}; 13 Saint claim/receipt objects preserved.`);
