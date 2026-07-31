import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const campaignDir = import.meta.dirname;
const repoDir = path.resolve(campaignDir, "../../../../..");
const campaignRepoPath = path.relative(repoDir, campaignDir);
const manifest = JSON.parse(
  fs.readFileSync(path.join(campaignDir, "seven-day-content-board.json"))
);
const requestedIds = process.argv.slice(2);
const ids = requestedIds.length ? requestedIds : manifest.units.map((unit) => unit.id);

function sha256Bytes(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function unitAssetPaths(unit) {
  return [
    unit.sourceAsset,
    unit.instagram.asset,
    unit.instagram.storyAsset,
    ...(unit.instagram.carouselAssets || []),
    unit.instagram.motionAsset,
    unit.instagram.captionAsset,
    unit.linkedin.asset,
    unit.linkedin.documentAsset,
    ...(unit.linkedin.documentPageAssets || []),
  ]
    .filter(Boolean)
    .map((asset) => asset === unit.sourceAsset ? asset : path.join(campaignRepoPath, asset))
    .filter((asset) => fs.existsSync(path.join(repoDir, asset)))
    .sort();
}

const result = {
  schemaVersion: 1,
  manifest: path.relative(repoDir, path.join(campaignDir, "seven-day-content-board.json")),
  units: {},
};

for (const id of ids) {
  const unit = manifest.units.find((candidate) => candidate.id === id);
  if (!unit) throw new Error(`Unknown unit: ${id}`);
  const assets = unitAssetPaths(unit);
  const fileHashes = Object.fromEntries(
    assets.map((asset) => [asset, sha256Bytes(fs.readFileSync(path.join(repoDir, asset)))])
  );
  const receiptLines = Object.entries(fileHashes)
    .map(([asset, hash]) => `${hash}  ${asset}\n`)
    .join("");
  result.units[id] = {
    manifestObjectSha256: sha256Bytes(Buffer.from(JSON.stringify(unit), "utf8")),
    referencedAssetSetSha256: sha256Bytes(Buffer.from(receiptLines, "utf8")),
    referencedAssetCount: assets.length,
    files: fileHashes,
  };
}

console.log(JSON.stringify(result, null, 2));
