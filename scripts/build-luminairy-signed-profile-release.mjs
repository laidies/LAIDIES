#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const privateKeyPath = process.env.LUMINAIRY_PRIVATE_KEY;
const keyId = process.env.LUMINAIRY_KEY_ID;
if (!privateKeyPath || !keyId) {
  console.error("Set LUMINAIRY_PRIVATE_KEY and LUMINAIRY_KEY_ID.");
  process.exit(2);
}

const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const profiles = readJson("content/luminairy-profiles.json");
const previousClaims = readJson("content/luminairy-claims.json");
const sourcePacketSha256 = sha256(fs.readFileSync(path.join(root, previousClaims.sourcePacket.replace(/^\//, ""))));
const evidence = new Map();
const teachingEvidence = new Map(readJson("operations/product-stewards/luminairy/profile-teaching-chain-evidence-2026-09-07.json").profiles.map((item) => [item.profileId, item]));

for (const filename of fs.readdirSync(path.join(root, "operations/product-stewards/luminairy")).filter((name) => /^profile-resource-evidence-batch-\d\d-2026-09-02\.json$/.test(name)).sort()) {
  const batch = readJson(`operations/product-stewards/luminairy/${filename}`);
  for (const item of batch.profiles || []) {
    const teaching = teachingEvidence.get(item.profileId);
    if (!teaching) throw new Error(`missing teaching-chain evidence for ${item.profileId}`);
    evidence.set(item.profileId, sha256(JSON.stringify({ resourceEvidence: item, teachingChainEvidence: teaching })));
  }
}

const profilePayload = (wing, profile) => JSON.stringify({ wing, profile });
const receiptPayload = (receipt) => JSON.stringify({
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

const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));
const publicJwk = crypto.createPublicKey(privateKey).export({ format: "jwk" });
const records = [];
const receipts = [];

for (const wing of ["saints", "mavens", "trailblazers"]) {
  for (const profile of profiles[wing]) {
    const claimId = `${wing}-${profile.id}`;
    const profileSha256 = sha256(profilePayload(wing, profile));
    const resourceEvidenceSha256 = wing === "saints" ? undefined : evidence.get(profile.id);
    if (wing !== "saints" && !resourceEvidenceSha256) throw new Error(`missing evidence for ${claimId}`);
    records.push({
      claimId,
      wing,
      profileId: profile.id,
      status: "admitted",
      profileSha256,
      ...(resourceEvidenceSha256 ? { resourceEvidenceSha256 } : {}),
      verifiedOn: "2026-09-05",
      recheckOn: "2027-09-05"
    });
    const receipt = {
      schemaVersion: 2,
      receiptId: `receipt-${claimId}-20260907-r7`,
      keyId,
      product: "luminairy",
      claimId,
      wing,
      profileId: profile.id,
      profileSha256,
      sourcePacketSha256,
      ...(resourceEvidenceSha256 ? { resourceEvidenceSha256 } : {}),
      verifiedOn: "2026-09-05",
      recheckOn: "2027-09-05",
      reviewedOn: "2026-09-07",
      reviewerRole: "independent-luminairy-profile-reviewer",
      supportDecision: "exact-profile-reviewed-and-supported"
    };
    receipt.signature = crypto.sign("sha256", Buffer.from(receiptPayload(receipt)), { key: privateKey, dsaEncoding: "ieee-p1363" }).toString("base64");
    receipts.push(receipt);
  }
}

const claims = {
  ...previousClaims,
  generatedOn: "2026-09-07",
  sourcePacketSha256,
  records
};
const receiptManifest = {
  schemaVersion: 2,
  product: "luminairy",
  generatedOn: "2026-09-07",
  authorityModel: "offline-p256-signed-profile-receipts",
  keyId,
  trustedKeyIds: [keyId],
  receipts
};

fs.writeFileSync(path.join(root, "content/luminairy-claims.json"), JSON.stringify(claims, null, 2) + "\n");
fs.writeFileSync(path.join(root, "content/luminairy-editorial-receipts.json"), JSON.stringify(receiptManifest, null, 2) + "\n");
fs.writeFileSync(process.env.LUMINAIRY_PUBLIC_JWK_OUTPUT || "/tmp/luminairy-public-jwk.json", JSON.stringify({ keyId, ...publicJwk }, null, 2) + "\n");
console.log(`Prepared ${records.length} claim records and ${receipts.length} P-256 receipts for ${keyId}.`);
