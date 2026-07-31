const sharp = require('/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const root = '/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage';
const source = path.join(root, 'assets/episodes/ep-04/pixel/ep04-open-03-title-comic-v1-exact-text-1920.png');
const output = path.join(root, 'social/launch/founding-mothers-reopening-teaser-v1.png');

const width = 1080;
const height = 1350;
const imageHeight = 608;

async function main() {
  fs.mkdirSync(path.dirname(output), { recursive: true });

  // This exact title frame is used by the authoritative Episode 04 cut.
  // Resize without cropping so its composition and rendered title remain intact.
  const titleFrame = await sharp(source)
    .resize(width, imageHeight, { fit: 'fill' })
    .png()
    .toBuffer();

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .xb { font-family: 'Jost', 'Arial Black', sans-serif; font-weight: 800; }
        .sb { font-family: 'Jost', Arial, sans-serif; font-weight: 600; }
      </style>
      <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ef2aaa"/>
        <stop offset="52%" stop-color="#8b5cf6"/>
        <stop offset="100%" stop-color="#20ccd4"/>
      </linearGradient>
      <filter id="lineGlow" x="-10%" y="-300%" width="120%" height="700%">
        <feGaussianBlur stdDeviation="9" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    <rect x="0" y="${imageHeight}" width="${width}" height="${height - imageHeight}" fill="url(#body)"/>
    <rect x="0" y="${imageHeight - 4}" width="${width}" height="8" fill="#ffffff" filter="url(#lineGlow)"/>
    <rect x="0" y="${imageHeight + 7}" width="${width}" height="5" fill="#ffd43b"/>

    <text class="xb" x="70" y="692" font-size="23" fill="#fff5d0" letter-spacing="3.4">COMING WITH THE GRAND RE-OPENING</text>

    <text class="xb" x="68" y="800" font-size="70" fill="#ffffff" letter-spacing="-1.1">AI’S FIRST ALGORITHM</text>
    <text class="xb" x="68" y="877" font-size="70" fill="#ffffff" letter-spacing="-1.1">WAS PUBLISHED IN 1843.</text>
    <text class="xb" x="68" y="954" font-size="70" fill="#fff5d0" letter-spacing="-1.1">BY A WOMAN.</text>

    <path d="M70 1004 H1010" stroke="#3a173c" stroke-width="5"/>
    <path d="M70 1018 H620" stroke="#ffd43b" stroke-width="5"/>

    <text class="sb" x="70" y="1098" font-size="37" fill="#3a173c">You were never behind on AI.</text>
    <text class="xb" x="70" y="1157" font-size="43" fill="#3a173c">You were just never told it was yours.</text>

    <rect x="68" y="1218" width="944" height="76" rx="38" fill="#ff675f" stroke="#3a173c" stroke-width="4"/>
    <text class="xb" x="540" y="1267" text-anchor="middle" font-size="25" fill="#3a173c" letter-spacing="1.9">FOLLOW FOR THE FIRST LOOK</text>

    <text class="sb" x="70" y="1328" font-size="21" fill="#3a173c" letter-spacing="2.1">THE FOUNDING MOTHERS · EPISODE 04</text>
    <text class="xb" x="1010" y="1328" text-anchor="end" font-size="24" fill="#3a173c">LAiDIES</text>

    <rect x="8" y="8" width="1064" height="1334" rx="24" fill="none" stroke="#3a173c" stroke-width="16"/>
  </svg>`;

  await sharp({
    create: { width, height, channels: 4, background: '#00000000' }
  })
    .composite([
      { input: titleFrame, left: 0, top: 0 },
      { input: Buffer.from(svg), left: 0, top: 0 }
    ])
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
