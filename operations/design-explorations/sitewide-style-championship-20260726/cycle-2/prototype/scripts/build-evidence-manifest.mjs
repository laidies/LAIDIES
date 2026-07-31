import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const evidenceRoot = resolve(root, "evidence");

async function filesUnder(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...(await filesUnder(child)));
    if (entry.isFile()) files.push(child);
  }
  return files;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function pngSize(bytes) {
  if (bytes.subarray(1, 4).toString() !== "PNG") return null;
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
  };
}

const coreFiles = [
  "src/App.jsx",
  "src/styles.css",
  "src/main.jsx",
  "package.json",
  "package-lock.json",
  "public/qa-comparison.html",
  "public/geometry-overlay.html",
  "public/character-comparison.html",
];
const assetFiles = await filesUnder(resolve(root, "public/assets"));
const qaSourceFiles = await filesUnder(resolve(root, "public/qa"));
const evidenceFiles = (await filesUnder(evidenceRoot)).filter(
  (path) => !path.endsWith("manifest.json"),
);
const allFiles = [
  ...coreFiles.map((path) => resolve(root, path)),
  ...assetFiles,
  ...qaSourceFiles,
  ...evidenceFiles,
].sort();

const records = [];
for (const path of allFiles) {
  const bytes = await readFile(path);
  const fileStat = await stat(path);
  records.push({
    path: relative(root, path),
    bytes: fileStat.size,
    sha256: sha256(bytes),
    ...(path.endsWith(".png") ? { pixels: pngSize(bytes) } : {}),
  });
}

const geometry = JSON.parse(
  await readFile(resolve(evidenceRoot, "geometry-parity.json"), "utf8"),
);
const geometryParity = {};
for (const [viewport, directions] of Object.entries(geometry.viewports)) {
  geometryParity[viewport] =
    JSON.stringify(directions.a) === JSON.stringify(directions.b) &&
    JSON.stringify(directions.a) === JSON.stringify(directions.c);
}

const manifest = {
  schema: "laidies.svc01.evidence-manifest.v1",
  generatedAt: new Date().toISOString(),
  authority: {
    owner: "Brand & Experience Director",
    finalVisualRuling: "Ali",
    deployAuthority: false,
    currentPublicAuthority: false,
  },
  invariant: {
    implementation: "one React DOM/content source; direction is CSS/art input only",
    viewports: ["1440x1024", "390x844", "320x844", "720x1024 zoom equivalent"],
    measuredBoxParity: geometryParity,
  },
  provenanceRecord: "asset-provenance.md",
  productionTransferRecord: "production-transfer-and-cost.md",
  decisionRecord: "decision-sheet.md",
  files: records,
};

await writeFile(
  resolve(evidenceRoot, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
