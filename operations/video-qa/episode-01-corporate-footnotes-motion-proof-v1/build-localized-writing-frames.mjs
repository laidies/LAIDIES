import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.dirname(fileURLToPath(import.meta.url));
const frames = path.join(root, "frames");
const rejected = path.join(root, "rejected-full-frame-edits");

const base = path.join(frames, "frame-01.png");
const candidates = [
  path.join(rejected, "generated-frame-02-full-drift-rejected.png"),
  path.join(rejected, "generated-frame-03-full-drift-rejected.png"),
];

const region = { left: 500, top: 555, width: 325, height: 245 };

function mask() {
  return Buffer.from(`
    <svg width="${region.width}" height="${region.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="soft"><feGaussianBlur stdDeviation="10"/></filter>
      </defs>
      <ellipse cx="162" cy="127" rx="142" ry="93" fill="white" filter="url(#soft)"/>
    </svg>
  `);
}

async function localized(candidate, output) {
  const crop = await sharp(candidate)
    .extract(region)
    .ensureAlpha()
    .composite([{ input: mask(), blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(base)
    .composite([{ input: crop, left: region.left, top: region.top }])
    .png()
    .toFile(output);
}

fs.mkdirSync(rejected, { recursive: true });
await localized(candidates[0], path.join(frames, "frame-02.png"));
await localized(candidates[1], path.join(frames, "frame-03.png"));

// The loop walks forward and then returns over the same states: 1-2-3-2-1.
await sharp(path.join(frames, "frame-02.png")).png().toFile(path.join(frames, "frame-04.png"));
await sharp(base).png().toFile(path.join(frames, "frame-05.png"));

console.log(JSON.stringify({ region, sequence: [1, 2, 3, 2, 1] }));
