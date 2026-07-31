import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js";

const REPO =
  "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage";
const SOURCE = path.join(
  REPO,
  "assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png",
);
const FONT = path.join(
  REPO,
  "assets/video/delivery-20260714-opening-v6/fonts/Jost.ttf",
);
const OUT_DIR = path.join(
  REPO,
  "assets/episodes/shared/delivery-20260723-welcome-back-cover-v1",
);
const FFMPEG =
  "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/operations/tools/node_modules/ffmpeg-static/ffmpeg";

const WIDTH = 1920;
const HEIGHT = 1080;

const COLORS = {
  ink: "#160d18",
  plum: "#2b1622",
  deepPlum: "#3d2046",
  pink: "#e982ab",
  hotPink: "#ff78af",
  teal: "#57b6c0",
  brightTeal: "#7de1e4",
  cream: "#fff3dc",
  gold: "#f4c66b",
  periwinkle: "#8e82d8",
};

await fs.mkdir(OUT_DIR, { recursive: true });

const fontData = await fs.readFile(FONT);
const fontBase64 = fontData.toString("base64");

function svgDocument(body) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <style>
          @font-face {
            font-family: "LAiDIES Jost";
            src: url("data:font/ttf;base64,${fontBase64}") format("truetype");
            font-weight: 100 900;
          }
        </style>
        <linearGradient id="topShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${COLORS.ink}" stop-opacity="0.92"/>
          <stop offset="62%" stop-color="${COLORS.plum}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="${COLORS.plum}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="pinkFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff9bc6"/>
          <stop offset="48%" stop-color="${COLORS.pink}"/>
          <stop offset="100%" stop-color="#c94d83"/>
        </linearGradient>
        <linearGradient id="tealEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${COLORS.brightTeal}"/>
          <stop offset="100%" stop-color="#318a97"/>
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-70%" width="180%" height="240%">
          <feGaussianBlur stdDeviation="17" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="smallGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      ${body}
    </svg>
  `);
}

function frameSvg() {
  const topBulbs = Array.from({ length: 18 }, (_, i) => {
    const x = 245 + i * 84;
    return `<circle cx="${x}" cy="91" r="5.2" fill="${COLORS.cream}" opacity="0.38"/>`;
  }).join("");
  const bottomBulbs = Array.from({ length: 18 }, (_, i) => {
    const x = 228 + i * 84;
    return `<circle cx="${x}" cy="379" r="5.2" fill="${COLORS.cream}" opacity="0.28"/>`;
  }).join("");

  return svgDocument(`
    <rect width="${WIDTH}" height="570" fill="url(#topShade)"/>

    <path d="M184 112 L1698 72 L1762 324 L242 404 Z"
      fill="${COLORS.teal}" opacity="0.86"
      stroke="${COLORS.ink}" stroke-width="18" stroke-linejoin="round"/>
    <path d="M165 88 L1684 54 L1732 296 L214 376 Z"
      fill="${COLORS.plum}"
      stroke="${COLORS.ink}" stroke-width="22" stroke-linejoin="round"/>
    <path d="M198 112 L1655 82 L1693 272 L239 348 Z"
      fill="${COLORS.deepPlum}"
      stroke="${COLORS.cream}" stroke-width="6" stroke-linejoin="round"/>

    <path d="M92 100 L162 82 L142 150 Z" fill="${COLORS.pink}" stroke="${COLORS.ink}" stroke-width="8"/>
    <path d="M1741 270 L1826 248 L1788 326 Z" fill="${COLORS.gold}" stroke="${COLORS.ink}" stroke-width="8"/>
    <path d="M122 384 L210 366 L165 432 Z" fill="${COLORS.periwinkle}" stroke="${COLORS.ink}" stroke-width="8"/>

    ${topBulbs}
    ${bottomBulbs}

    <rect x="22" y="22" width="${WIDTH - 44}" height="${HEIGHT - 44}" rx="24"
      fill="none" stroke="${COLORS.ink}" stroke-width="30"/>
    <rect x="42" y="42" width="${WIDTH - 84}" height="${HEIGHT - 84}" rx="15"
      fill="none" stroke="${COLORS.cream}" stroke-width="5"/>
    <path d="M43 882 L43 1037 L198 1037" fill="none" stroke="${COLORS.pink}" stroke-width="11"/>
    <path d="M1722 43 L1877 43 L1877 198" fill="none" stroke="${COLORS.teal}" stroke-width="11"/>
  `);
}

function titleShadowSvg() {
  return svgDocument(`
    <g transform="translate(0 0) skewX(-7)">
      <text x="986" y="304" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" stroke-linejoin="round" paint-order="stroke fill"
        fill="${COLORS.periwinkle}" stroke="${COLORS.ink}" stroke-width="50">
        LAiDIES
      </text>
      <text x="958" y="278" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" stroke-linejoin="round" paint-order="stroke fill"
        fill="${COLORS.plum}" stroke="${COLORS.ink}" stroke-width="44">
        LAiDIES
      </text>
    </g>
  `);
}

function titleEdgeSvg() {
  return svgDocument(`
    <g transform="skewX(-7)">
      <text x="958" y="278" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" stroke-linejoin="round" paint-order="stroke fill"
        fill="url(#tealEdge)" stroke="${COLORS.cream}" stroke-width="34">
        LAiDIES
      </text>
      <text x="958" y="278" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" stroke-linejoin="round" paint-order="stroke fill"
        fill="url(#tealEdge)" stroke="${COLORS.ink}" stroke-width="18">
        LAiDIES
      </text>
    </g>
  `);
}

function titleFaceSvg() {
  return svgDocument(`
    <g transform="skewX(-7)">
      <text x="958" y="278" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" stroke-linejoin="round" paint-order="stroke fill"
        fill="url(#pinkFace)" stroke="${COLORS.ink}" stroke-width="11">
        LAiDIES
      </text>
      <path d="M390 317 C705 343 1122 315 1507 267"
        fill="none" stroke="${COLORS.cream}" stroke-width="7" stroke-linecap="round" opacity="0.92"/>
      <path d="M410 326 C735 351 1128 323 1486 278"
        fill="none" stroke="${COLORS.teal}" stroke-width="9" stroke-linecap="round" opacity="0.86"/>
    </g>
  `);
}

function titleGlowSvg() {
  return svgDocument(`
    <g opacity="0.58" filter="url(#softGlow)" transform="skewX(-7)">
      <text x="958" y="278" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="252" font-weight="900"
        letter-spacing="-7" fill="none" stroke="${COLORS.hotPink}" stroke-width="14">
        LAiDIES
      </text>
    </g>

    <g filter="url(#smallGlow)">
      <path d="M218 222 L233 254 L266 268 L233 282 L218 316 L204 282 L170 268 L204 254 Z"
        fill="${COLORS.cream}" stroke="${COLORS.pink}" stroke-width="4"/>
      <path d="M1691 110 L1702 133 L1726 144 L1702 155 L1691 179 L1680 155 L1656 144 L1680 133 Z"
        fill="${COLORS.cream}" stroke="${COLORS.teal}" stroke-width="4"/>
      <path d="M1635 329 L1644 348 L1663 357 L1644 366 L1635 385 L1626 366 L1607 357 L1626 348 Z"
        fill="${COLORS.gold}" stroke="${COLORS.pink}" stroke-width="4"/>
    </g>

    <g fill="${COLORS.cream}" filter="url(#smallGlow)">
      ${Array.from({ length: 18 }, (_, i) => {
        const x = 245 + i * 84;
        return `<circle cx="${x}" cy="91" r="5.7"/>`;
      }).join("")}
      ${Array.from({ length: 18 }, (_, i) => {
        const x = 228 + i * 84;
        return `<circle cx="${x}" cy="379" r="5.7"/>`;
      }).join("")}
    </g>
  `);
}

const baseTown = await sharp(SOURCE)
  .resize(WIDTH, HEIGHT, { fit: "cover" })
  .modulate({ saturation: 1.08, brightness: 0.94 })
  .linear(1.08, -7)
  .png()
  .toBuffer();

const layerBuffers = {
  frame: await sharp(frameSvg()).png().toBuffer(),
  shadow: await sharp(titleShadowSvg()).png().toBuffer(),
  edge: await sharp(titleEdgeSvg()).png().toBuffer(),
  face: await sharp(titleFaceSvg()).png().toBuffer(),
  glow: await sharp(titleGlowSvg()).png().toBuffer(),
};

const basePath = path.join(OUT_DIR, "welcome-back-laidies-comic-cover-base-v1-1920.png");
const shadowPath = path.join(OUT_DIR, "welcome-back-laidies-title-shadow-v1.png");
const edgePath = path.join(OUT_DIR, "welcome-back-laidies-title-edge-v1.png");
const facePath = path.join(OUT_DIR, "welcome-back-laidies-title-face-v1.png");
const glowPath = path.join(OUT_DIR, "welcome-back-laidies-title-glow-v1.png");
const finalPath = path.join(OUT_DIR, "welcome-back-laidies-comic-cover-lit-v1-1920.png");
const videoPath = path.join(OUT_DIR, "welcome-back-laidies-comic-cover-light-up-v1.mp4");

await sharp(baseTown)
  .composite([{ input: layerBuffers.frame }])
  .png()
  .toFile(basePath);

await sharp(layerBuffers.shadow).png().toFile(shadowPath);
await sharp(layerBuffers.edge).png().toFile(edgePath);
await sharp(layerBuffers.face).png().toFile(facePath);
await sharp(layerBuffers.glow).png().toFile(glowPath);

await sharp(basePath)
  .composite([
    { input: layerBuffers.shadow },
    { input: layerBuffers.edge },
    { input: layerBuffers.face },
    { input: layerBuffers.glow },
  ])
  .png()
  .toFile(finalPath);

const filter = [
  "[0:v]format=yuv420p[bg]",
  "[1:v]format=rgba,fade=t=in:st=0.30:d=0.24:alpha=1[shadow]",
  "[2:v]format=rgba,fade=t=in:st=0.70:d=0.28:alpha=1[edge]",
  "[3:v]format=rgba,fade=t=in:st=1.04:d=0.34:alpha=1[face]",
  "[4:v]format=rgba,fade=t=in:st=1.42:d=0.45:alpha=1[glow]",
  "[bg][shadow]overlay=shortest=1[tmp1]",
  "[tmp1][edge]overlay=shortest=1[tmp2]",
  "[tmp2][face]overlay=shortest=1[tmp3]",
  "[tmp3][glow]overlay=shortest=1,format=yuv420p[outv]",
].join(";");

await new Promise((resolve, reject) => {
  const args = [
    "-y",
    "-loop",
    "1",
    "-t",
    "5",
    "-i",
    basePath,
    "-loop",
    "1",
    "-t",
    "5",
    "-i",
    shadowPath,
    "-loop",
    "1",
    "-t",
    "5",
    "-i",
    edgePath,
    "-loop",
    "1",
    "-t",
    "5",
    "-i",
    facePath,
    "-loop",
    "1",
    "-t",
    "5",
    "-i",
    glowPath,
    "-filter_complex",
    filter,
    "-map",
    "[outv]",
    "-r",
    "30",
    "-t",
    "5",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "17",
    "-movflags",
    "+faststart",
    "-an",
    videoPath,
  ];
  const child = spawn(FFMPEG, args, { stdio: "inherit" });
  child.on("error", reject);
  child.on("exit", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`ffmpeg exited with code ${code}`));
  });
});

console.log(
  JSON.stringify(
    {
      source: SOURCE,
      outputs: {
        base: basePath,
        shadow: shadowPath,
        edge: edgePath,
        face: facePath,
        glow: glowPath,
        final: finalPath,
        video: videoPath,
      },
    },
    null,
    2,
  ),
);
