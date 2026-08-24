#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = process.cwd();
const outputDir = path.join(root, "assets/episodes/shared/outro-v1");
const fontPath = path.join(root, "assets/video/delivery-20260714-opening-v6/fonts/Jost.ttf");
const displayFontPath = path.join(root, "assets/video/delivery-20260714-opening-v6/fonts/PlayfairDisplay.ttf");

const sources = {
  town: "assets/episodes/shared/outro-v1/outro-01-sunnyvaile-town-comic-v2-candidate.png",
  blendSnap: "assets/episodes/shared/outro-v1/outro-02-blend-snap-comic-v2-candidate.png",
  ksvl: "assets/episodes/shared/outro-v1/outro-03-ksvl-comic-v2-candidate.png",
  luminairy: "assets/episodes/shared/outro-v1/outro-04-luminairy-comic-v2-candidate.png",
};

for (const source of [...Object.values(sources), path.relative(root, fontPath), path.relative(root, displayFontPath)]) {
  const file = path.join(root, source);
  if (!fs.existsSync(file)) throw new Error(`Missing governed source: ${file}`);
}

const font = fs.readFileSync(fontPath).toString("base64");
const displayFont = fs.readFileSync(displayFontPath).toString("base64");
const palette = {
  ink: "#201128",
  paper: "#fff5d8",
  teal: "#123f45",
  wine: "#7d3145",
  radioPink: "#e84f78",
};

function svg(body) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <style>
      @font-face { font-family: Jost; src: url(data:font/ttf;base64,${font}); }
      @font-face { font-family: Playfair; src: url(data:font/ttf;base64,${displayFont}); }
      text { font-family: Jost, Arial, sans-serif; }
    </style>
    ${body}
  </svg>`);
}

function label({ x, y, text, size, fill = palette.paper, stroke = palette.ink, strokeWidth = 10, spacing = 2, family = "Jost", weight = 800, italic = false }) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${family}" font-size="${size}" font-weight="${weight}" font-style="${italic ? "italic" : "normal"}" letter-spacing="${spacing}" fill="${fill}" stroke="${strokeWidth ? stroke : "none"}" stroke-width="${strokeWidth}" paint-order="stroke fill">${text}</text>`;
}

async function render(source, output, overlay) {
  await sharp(path.join(root, source))
    .resize(1920, 1080, { fit: "fill" })
    .composite([{ input: svg(overlay) }])
    .png()
    .toFile(path.join(outputDir, output));
  console.log(path.join(outputDir, output));
}

await render(
  sources.town,
  "outro-01-sunnyvaile-town-comic-v2.png",
  [
    label({ x: 337, y: 120, text: "SUNNYVAiLE", size: 45, spacing: 1, family: "Playfair", strokeWidth: 0 }),
    label({ x: 337, y: 164, text: "MAIN STREET", size: 23, strokeWidth: 0, spacing: 5 }),
  ].join(""),
);

await render(
  sources.blendSnap,
  "outro-02-blend-snap-comic-v2.png",
  label({ x: 960, y: 180, text: "Blend &amp; Snap", size: 91, spacing: 1, family: "Playfair", italic: true, weight: 700, fill: palette.teal, strokeWidth: 0 }),
);

await render(
  sources.ksvl,
  "outro-03-ksvl-comic-v2.png",
  [
    label({ x: 960, y: 258, text: "KSVL COMMUNITY RAiDIO", size: 72, spacing: 3, strokeWidth: 0 }),
    `<rect x="1471" y="430" width="173" height="94" rx="12" fill="#3b2025" stroke="${palette.radioPink}" stroke-width="7"/>`,
    label({ x: 1558, y: 496, text: "ON AIR", size: 45, fill: "#ffd8d8", stroke: "#3b2025", strokeWidth: 5, spacing: 1 }),
  ].join(""),
);

await render(
  sources.luminairy,
  "outro-04-luminairy-comic-v2.png",
  [
    label({ x: 1275, y: 289, text: "LUMINAiRY", size: 58, spacing: 4, family: "Playfair", strokeWidth: 0 }),
    label({ x: 353, y: 408, text: "LANTERN HILL", size: 34, strokeWidth: 0, spacing: 3 }),
  ].join(""),
);

const signoff = [
  `<rect width="1920" height="1080" fill="${palette.ink}" fill-opacity="0.42"/>`,
  label({ x: 960, y: 465, text: "SEE YOU NEXT WEDNESDAY IN", size: 52, spacing: 8, strokeWidth: 0, weight: 700 }),
  label({ x: 960, y: 610, text: "SUNNYVAiLE", size: 120, spacing: 3, family: "Playfair", strokeWidth: 0, weight: 700 }),
  label({ x: 960, y: 705, text: "laidies.ai", size: 38, fill: palette.paper, strokeWidth: 0, spacing: 9, weight: 600 }),
].join("");

await render(
  sources.town,
  "outro-05-sunnyvaile-signoff-comic-v2.png",
  signoff,
);
