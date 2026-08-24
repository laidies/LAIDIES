#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = process.cwd();
const outputDir = path.join(root, "assets/episodes/shared/outro-v1");
fs.mkdirSync(outputDir, { recursive: true });

const sources = {
  town: "assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png",
  blendSnap: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/08-blend-and-snap-faceon.png",
  ksvl: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/16-ksvl-community-raidio-faceon.png",
  luminairy: "assets/episodes/ep-04/pixel/delivery-20260726-v9-reference-reconciled/ep04-v9-cue15-canonical-luminairy-exterior-1920.png",
};

for (const source of Object.values(sources)) {
  const file = path.join(root, source);
  if (!fs.existsSync(file)) throw new Error(`Missing governed source: ${file}`);
}

const palette = {
  ink: "#201128",
  paper: "#fff5d8",
  pink: "#ff3f9b",
  cyan: "#20d8dd",
  yellow: "#f2b544",
};

function comicFrame(accent, notch = "left") {
  const notchPath = notch === "left"
    ? "M0 160 L84 128 L55 244 L0 270 Z"
    : "M1920 160 L1836 128 L1865 244 L1920 270 Z";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <path d="${notchPath}" fill="${accent}" stroke="${palette.ink}" stroke-width="18"/>
    <path d="M28 24 H1892 V1056 H28 Z" fill="none" stroke="${palette.ink}" stroke-width="42"/>
    <path d="M46 42 H1874 V1038 H46 Z" fill="none" stroke="${accent}" stroke-width="10"/>
    <path d="M74 70 H1846" stroke="${palette.paper}" stroke-width="6" stroke-linecap="round"/>
    <path d="M74 1010 H1846" stroke="${palette.paper}" stroke-width="6" stroke-linecap="round"/>
  </svg>`);
}

async function buildPlate(source, fileName, accent, notch) {
  const output = path.join(outputDir, fileName);
  await sharp(path.join(root, source))
    .resize(1920, 1080, { fit: "cover" })
    .composite([{ input: comicFrame(accent, notch) }])
    .png()
    .toFile(output);
  console.log(output);
}

await buildPlate(sources.town, "outro-01-sunnyvaile-town-comic-v1.png", palette.cyan, "left");
await buildPlate(sources.blendSnap, "outro-02-blend-snap-comic-v1.png", palette.pink, "right");
await buildPlate(sources.ksvl, "outro-03-ksvl-comic-v1.png", palette.cyan, "left");
await buildPlate(sources.luminairy, "outro-04-luminairy-comic-v1.png", palette.yellow, "right");

const signoffOverlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <rect width="1920" height="1080" fill="${palette.ink}" fill-opacity="0.66"/>
  <path d="M70 92 H1850 V988 H70 Z" fill="none" stroke="${palette.ink}" stroke-width="40"/>
  <path d="M88 110 H1832 V970 H88 Z" fill="none" stroke="${palette.pink}" stroke-width="11"/>
  <path d="M230 270 L1650 270" stroke="${palette.cyan}" stroke-width="12" stroke-linecap="round"/>
  <path d="M310 790 L1570 790" stroke="${palette.yellow}" stroke-width="12" stroke-linecap="round"/>
  <text x="960" y="460" text-anchor="middle" font-family="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif" font-size="102" font-weight="900" letter-spacing="4" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="20" paint-order="stroke fill">SEE YOU NEXT WEDNESDAY</text>
  <text x="960" y="595" text-anchor="middle" font-family="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif" font-size="128" font-weight="900" letter-spacing="5" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="22" paint-order="stroke fill">IN SUNNYVAiLE</text>
  <text x="960" y="710" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-size="66" font-weight="800" letter-spacing="10" fill="${palette.cyan}" stroke="${palette.ink}" stroke-width="12" paint-order="stroke fill">laidies.ai</text>
  <circle cx="184" cy="180" r="34" fill="${palette.yellow}" stroke="${palette.ink}" stroke-width="14"/>
  <circle cx="1736" cy="900" r="34" fill="${palette.pink}" stroke="${palette.ink}" stroke-width="14"/>
</svg>`);

const signoffOutput = path.join(outputDir, "outro-05-sunnyvaile-signoff-comic-v1.png");
await sharp(path.join(root, sources.town))
  .resize(1920, 1080, { fit: "cover" })
  .composite([{ input: signoffOverlay }])
  .png()
  .toFile(signoffOutput);
console.log(signoffOutput);
