import fs from "node:fs/promises";
import path from "node:path";
import sharp from "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const OUT_DIR = path.join(
  ROOT,
  "operations/video-qa/welcome-back-cast-reference-20260723",
);
const OUT = path.join(OUT_DIR, "laidies-current-cast-12-reference-sheet-v1.png");

const cast = [
  ["JOJO", "assets/town-characters/comic/jojo-comic-v1.png"],
  ["PENNY", "assets/town-characters/scenes/penny-scene.png"],
  ["PAIGE", "assets/town-characters/comic/paige-comic-v1.png"],
  ["MAYOR DEB", "assets/town-characters/scenes/mayor-deb-scene.png"],
  ["DJ SUNNYV", "assets/town-characters/scenes/dj-sunnyv-scene.png"],
  [
    "MME CLAi-O",
    "assets/video/delivery-20260714-opening-v6/shots/opening-03-mme-claio-clean-face.png",
  ],
  [
    "FAiRY GODMOTHER",
    "assets/video/delivery-20260714-opening-v6/shots/opening-08-fairy-godmother-clean-lit-group-face-v3.png",
  ],
  [
    "THE HEROINE",
    "assets/video/delivery-20260714-opening-v6/shots/opening-02-heroine-approved-identity-butterfly-clips-v4.png",
  ],
  ["JUNE", "assets/town-characters/scenes/june-scene.png"],
  ["PAULETTE", "assets/town-characters/comic/paulette-comic-v1.png"],
  ["COSMO", "assets/town-characters/scenes/cosmo-scene.png"],
  ["MATRON LUMEN", "assets/town-characters/scenes/matron-lumen-scene.png"],
];

const CELL_W = 480;
const CELL_H = 360;
const IMAGE_H = 310;
const W = CELL_W * 4;
const H = CELL_H * 3;

function labelSvg(label) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="50">
      <rect width="${CELL_W}" height="50" fill="#f6f0e8"/>
      <text x="240" y="33" text-anchor="middle"
        font-family="Avenir Next, Avenir, Helvetica, sans-serif"
        font-size="22" font-weight="700" letter-spacing="2"
        fill="#4b2148">${label}</text>
    </svg>
  `);
}

await fs.mkdir(OUT_DIR, { recursive: true });

const cells = [];
for (const [label, relativeFile] of cast) {
  const input = path.join(ROOT, relativeFile);
  const image = await sharp(input)
    .resize(CELL_W, IMAGE_H, {
      fit: "cover",
      position: "attention",
    })
    .png()
    .toBuffer();
  const cell = await sharp({
    create: {
      width: CELL_W,
      height: CELL_H,
      channels: 4,
      background: "#f6f0e8",
    },
  })
    .composite([
      { input: image, left: 0, top: 0 },
      { input: labelSvg(label), left: 0, top: IMAGE_H },
    ])
    .png()
    .toBuffer();
  cells.push(cell);
}

const composites = cells.map((input, index) => ({
  input,
  left: (index % 4) * CELL_W,
  top: Math.floor(index / 4) * CELL_H,
}));

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: "#f6f0e8",
  },
})
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(OUT);
