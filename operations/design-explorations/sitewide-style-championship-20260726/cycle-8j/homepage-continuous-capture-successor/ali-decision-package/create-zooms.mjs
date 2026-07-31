import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp");
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const output = path.join(here, "zooms");
const fs = await import("node:fs/promises");
await fs.mkdir(output, { recursive: true });

const files = {
  baseline: path.join(root, "evidence/desktop/homepage-incumbent-1440.png"),
  candidate: path.join(root, "evidence/desktop/homepage-candidate-1440.png")
};
const zones = [
  ["method", 820, 1980],
  ["weekly", 2700, 1900],
  ["activities", 4700, 2450],
  ["town-and-closet", 7800, 3100]
];

for (const [name, top, height] of zones) {
  const [leftMeta, rightMeta] = await Promise.all([
    sharp(files.baseline).metadata(), sharp(files.candidate).metadata()
  ]);
  const crop = async (file, meta) => sharp(file)
    .extract({ left: 0, top: Math.min(top, meta.height - 1), width: meta.width, height: Math.min(height, meta.height - top) })
    .png()
    .toBuffer();
  const [left, right] = await Promise.all([crop(files.baseline, leftMeta), crop(files.candidate, rightMeta)]);
  const l = await sharp(left).metadata();
  const r = await sharp(right).metadata();
  await sharp({ create: { width: l.width + r.width, height: Math.max(l.height, r.height), channels: 4, background: "#071b34" } })
    .composite([{ input: left, left: 0, top: 0 }, { input: right, left: l.width, top: 0 }])
    .png()
    .toFile(path.join(output, `${name}-desktop.png`));
}
