#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = process.cwd();
const out = path.join(root, "assets/episodes/shared/intro-v1");
const targetHeadHeight = 700;
const targetEyeLine = 390;

const people = {
  paige: { source: "assets/town-characters/comic/paige-comic-v1.png", width: 1619, height: 971, headTop: 45, chin: 490, eyeY: 300, centerX: 850 },
  dj: { source: "assets/episodes/trailer/comic/trailer-b46-ksvl-dj-sunnyv-booth-comic-v1-1920.png", width: 1920, height: 1080, headTop: 20, chin: 500, eyeY: 320, centerX: 1100 },
  jojo: { source: "assets/episodes/shared/intro-v1/jojo-master-style-cafe-candidate-v1.png", width: 1672, height: 941, headTop: 20, chin: 490, eyeY: 300, centerX: 830 },
  cosmo: { source: "assets/episodes/shared/intro-v1/cutouts/cosmo-source-preserved-cutout-v1.png", width: 1672, height: 941, headTop: 70, chin: 450, eyeY: 280, centerX: 835 },
  paulette: { source: "assets/town-characters/comic/paulette-comic-v1.png", width: 1619, height: 972, headTop: 20, chin: 475, eyeY: 300, centerX: 655 },
  deb: { source: "assets/episodes/shared/intro-v1/cutouts/deb-source-preserved-cutout-v1.png", width: 1672, height: 941, headTop: 20, chin: 455, eyeY: 275, centerX: 850 },
  matron: { source: "assets/episodes/shared/intro-v1/cutouts/matron-source-preserved-cutout-v1.png", width: 1672, height: 941, headTop: 10, chin: 390, eyeY: 250, centerX: 850 },
  claio: { source: "assets/episodes/shared/intro-v1/cutouts/claio-source-preserved-cutout-v1.png", width: 1672, height: 941, headTop: 10, chin: 490, eyeY: 300, centerX: 850 },
  fairy: { source: "assets/episodes/shared/intro-v1/cutouts/fairy-source-preserved-cutout-v1.png", width: 1672, height: 941, headTop: 15, chin: 480, eyeY: 315, centerX: 850 },
};

const backgrounds = {
  bronze: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/05-bronze-aige-straight-on-no-people.png",
  townHall: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/12-town-hall-deb-posters.png",
  luminairy: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/15-the-luminairy-front-proof.png",
  claio: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/06-mme-claios-shop-faceon.png",
  fairy: "assets/sunnyvaile-buildings/y2k-v3-rendered-signs/_latest-proof/11-fairy-godmother-house-faceon-user-approved.png",
};

for (const person of Object.values(people)) {
  person.file = path.join(root, person.source);
  person.scale = targetHeadHeight / (person.chin - person.headTop);
  if (!fs.existsSync(person.file)) throw new Error(`Missing person source: ${person.file}`);
}
for (const file of Object.values(backgrounds)) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing location source: ${file}`);
}

const data = relative => `data:image/png;base64,${fs.readFileSync(path.join(root, relative)).toString("base64")}`;
const xml = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const points = {
  left: "0,0 1060,0 1005,180 1045,350 980,560 1022,760 940,1080 0,1080",
  right: "1060,0 1920,0 1920,1080 940,1080 1022,760 980,560 1045,350 1005,180",
};

function personImage(id, centerX) {
  const p = people[id];
  const x = centerX - p.centerX * p.scale;
  const y = targetEyeLine - p.eyeY * p.scale;
  return `<image href="${data(p.source)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(p.width * p.scale).toFixed(1)}" height="${(p.height * p.scale).toFixed(1)}"/>`;
}

const scene = (relative, clip) => `<image href="${data(relative)}" x="0" y="0" width="1920" height="1080" preserveAspectRatio="xMidYMid slice" clip-path="url(#${clip})"/>`;

function lettering(x, y, name, place, accent, rotate = 0, size = 104) {
  return `<g transform="translate(${x} ${y}) rotate(${rotate})">
    <text class="name" style="font-size:${size}px" x="7" y="7" fill="${accent}">${xml(name)}</text>
    <text class="name" style="font-size:${size}px" x="0" y="0">${xml(name)}</text>
    <text class="place" x="8" y="76" fill="${accent}">${xml(place)}</text>
    <path d="M8 99 L520 107" stroke="#fff5d8" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}

function baseDefs() {
  return `<defs>
    <clipPath id="left"><polygon points="${points.left}"/></clipPath>
    <clipPath id="right"><polygon points="${points.right}"/></clipPath>
    <style>
      .name{font-family:Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;font-size:104px;font-weight:900;letter-spacing:3px;paint-order:stroke fill;stroke:#201128;stroke-width:16px;stroke-linejoin:round;fill:#fff5d8}
      .place{font-family:Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif;font-size:56px;font-weight:900;letter-spacing:4px;paint-order:stroke fill;stroke:#201128;stroke-width:12px;stroke-linejoin:round}
    </style>
  </defs>`;
}

const seam = `<polyline points="1060,0 1005,180 1045,350 980,560 1022,760 940,1080" fill="none" stroke="#201128" stroke-width="30" stroke-linejoin="bevel"/><polyline points="1060,0 1005,180 1045,350 980,560 1022,760 940,1080" fill="none" stroke="#f6dfad" stroke-width="12" stroke-linejoin="bevel"/>`;

const pairs = [
  {
    file: "paige-dj-sunnyv-sunnyvaile-comic-pair-v2.png",
    left: personImage("paige", 500), right: personImage("dj", 1450),
    leftBg: "", rightBg: "",
    leftLabel: lettering(70, 840, "PAIGE", "NEWSSTAND", "#ff3f9b", -2),
    rightLabel: lettering(1190, 840, "DJ SUNNYV", "KSVL 99.9 FM", "#20d8dd", 2, 88),
  },
  {
    file: "jojo-cosmo-sunnyvaile-comic-pair-v2.png",
    left: personImage("jojo", 500), right: personImage("cosmo", 1450),
    leftBg: "", rightBg: scene(backgrounds.bronze, "right"),
    leftLabel: lettering(70, 840, "JOJO", "BLEND & SNAP", "#ff3f9b", -2),
    rightLabel: lettering(1220, 840, "COSMO", "BRONZE AiGE", "#f2b544", 2),
  },
  {
    file: "mayor-deb-matron-lumen-sunnyvaile-comic-pair-v2.png",
    left: personImage("deb", 500), right: personImage("matron", 1450),
    leftBg: scene(backgrounds.townHall, "left"), rightBg: scene(backgrounds.luminairy, "right"),
    leftLabel: lettering(65, 840, "MAYOR DEB", "TOWN HALL", "#ff3f9b", -2, 88),
    rightLabel: lettering(1115, 840, "MATRON LUMEN", "LUMINAiRY", "#f2b544", 2, 80),
  },
  {
    file: "mme-claio-fairy-godmother-sunnyvaile-comic-pair-v2.png",
    left: personImage("claio", 500), right: personImage("fairy", 1450),
    leftBg: scene(backgrounds.claio, "left"), rightBg: scene(backgrounds.fairy, "right"),
    leftLabel: lettering(55, 840, "MME CLAi-O", "NO. 6 MAIN", "#c6b8ff", -2, 88),
    rightLabel: lettering(1090, 840, "FAiRY GODMOTHER", "WILLOW LANE", "#f2b544", 2, 70),
  },
];

for (const pair of pairs) {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">${baseDefs()}
    <rect width="1920" height="1080" fill="#f6dfad"/>
    ${pair.leftBg}<g clip-path="url(#left)">${pair.left}</g>
    ${pair.rightBg}<g clip-path="url(#right)">${pair.right}</g>
    ${seam}${pair.leftLabel}${pair.rightLabel}</svg>`);
  const file = path.join(out, pair.file);
  await sharp(svg).png().toFile(file);
  console.log(file);
}

{
  const p = people.paulette;
  const x = 960 - p.centerX * p.scale;
  const y = targetEyeLine - p.eyeY * p.scale;
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">${baseDefs()}
    <rect width="1920" height="1080" fill="#f6dfad"/>
    <image href="${data(p.source)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(p.width * p.scale).toFixed(1)}" height="${(p.height * p.scale).toFixed(1)}"/>
    ${lettering(1110, 835, "PAULETTE", "MAiKEOVER", "#ff3f9b", 2, 96)}
  </svg>`);
  const file = path.join(out, "paulette-sunnyvaile-comic-solo-v2.png");
  await sharp(svg).png().toFile(file);
  console.log(file);
}
