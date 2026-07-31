import fs from "node:fs/promises";
import path from "node:path";
import sharp from "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js";

const REPO =
  "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage";
const OUT_DIR = path.join(
  REPO,
  "assets/episodes/shared/delivery-20260723-welcome-back-comic-cover-v4",
);
const BACKGROUND = path.join(
  OUT_DIR,
  "welcome-back-comic-cover-background-generated-v1.png",
);
const DIN_FONT = "/System/Library/Fonts/Supplemental/DIN Condensed Bold.ttf";
const JOST_FONT = path.join(
  REPO,
  "assets/video/delivery-20260714-opening-v6/fonts/Jost.ttf",
);

const WIDTH = 1920;
const HEIGHT = 1080;
const COLORS = {
  plum: "#3a1838",
  cream: "#fff8ea",
  coral: "#f3726c",
  pink: "#f05a9d",
  tangerine: "#f6a338",
  sky: "#4b9fe5",
  periwinkle: "#9a7de0",
};

const [dinData, jostData] = await Promise.all([
  fs.readFile(DIN_FONT),
  fs.readFile(JOST_FONT),
]);
const dinBase64 = dinData.toString("base64");
const jostBase64 = jostData.toString("base64");

function svg(body) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg"
      width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <defs>
        <style>
          @font-face {
            font-family: "LAiDIES DIN";
            src: url("data:font/ttf;base64,${dinBase64}") format("truetype");
            font-weight: 700;
          }
          @font-face {
            font-family: "LAiDIES Jost";
            src: url("data:font/ttf;base64,${jostBase64}") format("truetype");
            font-weight: 400 900;
          }
        </style>
        <linearGradient id="titleFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${COLORS.coral}"/>
          <stop offset="62%" stop-color="${COLORS.pink}"/>
          <stop offset="100%" stop-color="#d94386"/>
        </linearGradient>
        <pattern id="titleDots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.3" fill="${COLORS.plum}" opacity="0.17"/>
        </pattern>
        <clipPath id="titleClip">
          <text x="940" y="650" text-anchor="middle"
            font-family="LAiDIES DIN" font-size="320" font-weight="700"
            letter-spacing="2">LAiDIES</text>
        </clipPath>
      </defs>
      ${body}
    </svg>
  `);
}

function titleLayer() {
  return svg(`
    <g aria-label="Welcome back to LAiDIES">
      <text x="940" y="366" text-anchor="middle"
        font-family="LAiDIES Jost" font-size="43" font-weight="800"
        letter-spacing="16" fill="${COLORS.plum}">WELCOME BACK TO</text>

      <text x="962" y="674" text-anchor="middle"
        font-family="LAiDIES DIN" font-size="320" font-weight="700"
        letter-spacing="2" fill="${COLORS.periwinkle}"
        stroke="${COLORS.plum}" stroke-width="40"
        stroke-linejoin="round" paint-order="stroke fill">LAiDIES</text>

      <text x="951" y="662" text-anchor="middle"
        font-family="LAiDIES DIN" font-size="320" font-weight="700"
        letter-spacing="2" fill="${COLORS.sky}"
        stroke="${COLORS.plum}" stroke-width="34"
        stroke-linejoin="round" paint-order="stroke fill">LAiDIES</text>

      <text x="940" y="650" text-anchor="middle"
        font-family="LAiDIES DIN" font-size="320" font-weight="700"
        letter-spacing="2" fill="url(#titleFace)"
        stroke="${COLORS.plum}" stroke-width="42"
        stroke-linejoin="round" paint-order="stroke fill">LAiDIES</text>

      <text x="940" y="650" text-anchor="middle"
        font-family="LAiDIES DIN" font-size="320" font-weight="700"
        letter-spacing="2" fill="url(#titleFace)"
        stroke="${COLORS.cream}" stroke-width="21"
        stroke-linejoin="round" paint-order="stroke fill">LAiDIES</text>

      <text x="940" y="650" text-anchor="middle"
        font-family="LAiDIES DIN" font-size="320" font-weight="700"
        letter-spacing="2" fill="url(#titleFace)"
        stroke="${COLORS.plum}" stroke-width="9"
        stroke-linejoin="round" paint-order="stroke fill">LAiDIES</text>

      <rect x="492" y="382" width="900" height="310"
        fill="url(#titleDots)" clip-path="url(#titleClip)"/>
    </g>
  `);
}

function frameLayer() {
  return svg(`
    <rect x="16" y="16" width="${WIDTH - 32}" height="${HEIGHT - 32}"
      fill="none" stroke="${COLORS.plum}" stroke-width="20"/>
    <rect x="34" y="34" width="${WIDTH - 68}" height="${HEIGHT - 68}"
      fill="none" stroke="${COLORS.cream}" stroke-width="5" opacity="0.94"/>
  `);
}

await fs.mkdir(OUT_DIR, { recursive: true });

const background = await sharp(BACKGROUND)
  .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
  .png()
  .toBuffer();

const output = path.join(
  OUT_DIR,
  "welcome-back-laidies-comic-cover-candidate-v4-1920.png",
);

await sharp(background)
  .composite([
    { input: frameLayer(), left: 0, top: 0 },
    { input: titleLayer(), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);
