import fs from "node:fs/promises";
import path from "node:path";
import sharp from "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const OUT_DIR = path.join(
  ROOT,
  "assets/episodes/shared/delivery-20260723-welcome-back-concepts-v1",
);

const CREW = path.join(
  ROOT,
  "assets/video/delivery-20260714-opening-v6/shots/opening-11-crew-approved-heroine-barista-v9.png",
);
const TOWN = path.join(
  ROOT,
  "assets/episodes/ep-04/pixel/ep04-open-08-sunnyvaile-welcome-comic-v5-from-user-street-clean-1920.png",
);
const WORDMARK = path.join(
  ROOT,
  "assets/brand/laidies-logo-masthead-approved-v3.png",
);

const W = 1920;
const H = 1080;
const PLUM = "#4b2148";
const ROSE = "#9b3f5f";
const PEARL = "#f6f0e8";

function svg(body) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      ${body}
    </svg>`,
  );
}

async function cover(file, width = W, height = H, position = "centre") {
  return sharp(file)
    .resize(width, height, { fit: "cover", position })
    .png()
    .toBuffer();
}

async function containWordmark(width) {
  return sharp(WORDMARK)
    .trim()
    .resize({ width, fit: "inside", withoutEnlargement: false })
    .png()
    .toBuffer();
}

async function writeConcept(name, background, overlays) {
  const output = path.join(OUT_DIR, name);
  await sharp(background)
    .composite(overlays)
    .png({ compressionLevel: 9 })
    .toFile(output);
  return output;
}

await fs.mkdir(OUT_DIR, { recursive: true });

const crew = await cover(CREW, W, H, "centre");
const town = await cover(TOWN, W, H, "centre");
const wordmarkCrew = await containWordmark(520);
const wordmarkTown = await containWordmark(520);
const wordmarkEditorial = await containWordmark(450);

const optionA = await writeConcept(
  "welcome-back-option-a-crew-pearl-v1.png",
  crew,
  [
    {
      input: svg(`
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${PEARL}" stop-opacity="0"/>
            <stop offset="62%" stop-color="${PEARL}" stop-opacity="0.05"/>
            <stop offset="78%" stop-color="${PEARL}" stop-opacity="0.82"/>
            <stop offset="100%" stop-color="${PEARL}" stop-opacity="0.98"/>
          </linearGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#fade)"/>
        <line x1="515" y1="757" x2="1405" y2="757" stroke="${ROSE}" stroke-width="2" opacity="0.7"/>
        <text x="960" y="810" text-anchor="middle"
          font-family="Avenir Next, Avenir, Helvetica, sans-serif"
          font-size="34" font-weight="600" letter-spacing="13"
          fill="${ROSE}">WELCOME BACK TO</text>
      `),
      left: 0,
      top: 0,
    },
    { input: wordmarkCrew, left: 700, top: 824 },
  ],
);

const optionB = await writeConcept(
  "welcome-back-option-b-sunnyvaile-marquee-v1.png",
  town,
  [
    {
      input: svg(`
        <defs>
          <filter id="shadow" x="-20%" y="-30%" width="140%" height="170%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#24101f" flood-opacity="0.22"/>
          </filter>
        </defs>
        <rect x="430" y="96" width="1060" height="344" rx="18"
          fill="${PEARL}" fill-opacity="0.94" stroke="${PLUM}" stroke-width="4" filter="url(#shadow)"/>
        <rect x="451" y="117" width="1018" height="302" rx="10"
          fill="none" stroke="${ROSE}" stroke-width="2" opacity="0.7"/>
        <text x="960" y="184" text-anchor="middle"
          font-family="Avenir Next, Avenir, Helvetica, sans-serif"
          font-size="31" font-weight="600" letter-spacing="12"
          fill="${ROSE}">WELCOME BACK TO</text>
      `),
      left: 0,
      top: 0,
    },
    { input: wordmarkTown, left: 700, top: 204 },
  ],
);

const leftPanel = await sharp(town)
  .extract({ left: 0, top: 0, width: 690, height: H })
  .png()
  .toBuffer();
const centerPanel = await sharp(crew)
  .extract({ left: 515, top: 0, width: 890, height: H })
  .png()
  .toBuffer();
const rightPanel = await sharp(town)
  .extract({ left: 1260, top: 0, width: 660, height: H })
  .png()
  .toBuffer();

const optionCBase = await sharp({
  create: { width: W, height: H, channels: 4, background: PEARL },
})
  .composite([
    { input: leftPanel, left: 0, top: 0 },
    { input: centerPanel, left: 515, top: 0 },
    { input: rightPanel, left: 1260, top: 0 },
  ])
  .png()
  .toBuffer();

const optionC = await writeConcept(
  "welcome-back-option-c-editorial-triptych-v1.png",
  optionCBase,
  [
    {
      input: svg(`
        <rect width="${W}" height="${H}" fill="${PLUM}" opacity="0.12"/>
        <path d="M0 0H${W}V${H}H0Z" fill="none" stroke="${PEARL}" stroke-width="24"/>
        <line x1="505" y1="0" x2="505" y2="${H}" stroke="${PEARL}" stroke-width="18"/>
        <line x1="1250" y1="0" x2="1250" y2="${H}" stroke="${PEARL}" stroke-width="18"/>
        <rect x="525" y="650" width="870" height="356" rx="12"
          fill="${PEARL}" fill-opacity="0.95" stroke="${PLUM}" stroke-width="3"/>
        <text x="960" y="724" text-anchor="middle"
          font-family="Avenir Next, Avenir, Helvetica, sans-serif"
          font-size="30" font-weight="600" letter-spacing="11"
          fill="${ROSE}">WELCOME BACK TO</text>
      `),
      left: 0,
      top: 0,
    },
    { input: wordmarkEditorial, left: 735, top: 748 },
  ],
);

console.log(JSON.stringify({ optionA, optionB, optionC }, null, 2));
