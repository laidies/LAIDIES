#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const width = 1920;
const height = 1080;
const output = path.join(
  root,
  "assets/episodes/shared/intro-v1/heroine-penny-sunnyvaile-comic-pair-v2.png",
);

const source = (relativePath) => path.join(root, relativePath);

const files = {
  mainStreet: source(
    "assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png",
  ),
  postOffice: source(
    "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/13-sunnyvaile-post-office-faceon-final.png",
  ),
  heroine: source(
    "assets/episodes/shared/intro-v1/cutouts/heroine-source-preserved-cutout-v1.png",
  ),
  penny: source(
    "assets/episodes/shared/intro-v1/cutouts/penny-source-preserved-cutout-v1.png",
  ),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const panelMask = (points) => Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <polygon points="${points}" fill="white"/>
  </svg>
`);

async function maskedBackground(file, position, points) {
  const background = await sharp(file)
    .resize(width, height, { fit: "cover", position })
    .modulate({ brightness: 0.88, saturation: 0.92 })
    .png()
    .toBuffer();
  return sharp(background)
    .composite([{ input: panelMask(points), blend: "dest-in" }])
    .png()
    .toBuffer();
}

const leftBackground = await maskedBackground(
  files.mainStreet,
  "west",
  "0,0 1060,0 1005,180 1045,350 980,560 1022,760 940,1080 0,1080",
);
const rightBackground = await maskedBackground(
  files.postOffice,
  "east",
  "1060,0 1920,0 1920,1080 940,1080 1022,760 980,560 1045,350 1005,180",
);

// These are the exact approved source pixels with only their old flat fields removed.
// The sizes make both women read as the same portrait scale at the same eye line.
const heroine = await sharp(files.heroine)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ width: 830 })
  .png()
  .toBuffer();
const penny = await sharp(files.penny)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ width: 1030 })
  .png()
  .toBuffer();

const seam = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="1060,0 1005,180 1045,350 980,560 1022,760 940,1080"
      fill="none" stroke="#201128" stroke-width="30" stroke-linejoin="bevel"/>
    <polyline points="1060,0 1005,180 1045,350 980,560 1022,760 940,1080"
      fill="none" stroke="#f6dfad" stroke-width="12" stroke-linejoin="bevel"/>
  </svg>
`);

// Direct outlined lettering: no cards, pills, panels, dashboard boxes or generated text.
const lettering = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .name { font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
              font-size: 104px; font-weight: 900; letter-spacing: 3px;
              paint-order: stroke fill; stroke: #201128; stroke-width: 16px;
              stroke-linejoin: round; fill: #fff5d8; }
      .place { font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
               font-size: 56px; font-weight: 900; letter-spacing: 4px;
               paint-order: stroke fill; stroke: #201128; stroke-width: 12px;
               stroke-linejoin: round; fill: #20d8dd; }
      .pink { fill: #ff3f9b; }
    </style>
    <g transform="translate(70 835) rotate(-2)">
      <text class="name" x="7" y="7" fill="#ff3f9b">THE HEROINE</text>
      <text class="name" x="0" y="0">THE HEROINE</text>
      <text class="place pink" x="10" y="78">HOST</text>
      <path d="M8 101 L278 91" stroke="#fff5d8" stroke-width="10" stroke-linecap="round"/>
    </g>
    <g transform="translate(1220 842) rotate(2)">
      <text class="name" x="7" y="7" fill="#20d8dd">PENNY</text>
      <text class="name" x="0" y="0">PENNY</text>
      <text class="place" x="8" y="76">POST OFFICE</text>
      <path d="M8 99 L480 114" stroke="#ff3f9b" stroke-width="10" stroke-linecap="round"/>
    </g>
  </svg>
`);

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 246, g: 223, b: 173, alpha: 1 },
  },
})
  .composite([
    { input: leftBackground, left: 0, top: 0 },
    { input: rightBackground, left: 0, top: 0 },
    { input: heroine, left: 80, top: 14 },
    { input: penny, left: 860, top: 0 },
    { input: seam, left: 0, top: 0 },
    { input: lettering, left: 0, top: 0 },
  ])
  .png()
  .toFile(output);

console.log(output);
