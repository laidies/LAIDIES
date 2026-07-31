#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require(
  "/Users/alisoneakin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp"
);

const here = path.dirname(fileURLToPath(import.meta.url));
const evidence = path.join(here, "evidence");

async function pair(name, incumbent, candidate, columnWidth, gap = 24) {
  const inputs = [incumbent, candidate];
  const rendered = [];
  for (const input of inputs) {
    const metadata = await sharp(input).metadata();
    const height = Math.round((metadata.height * columnWidth) / metadata.width);
    rendered.push({
      buffer: await sharp(input).resize({ width: columnWidth }).png().toBuffer(),
      width: columnWidth,
      height
    });
  }
  const height = Math.max(...rendered.map((item) => item.height));
  await sharp({
    create: {
      width: columnWidth * 2 + gap,
      height,
      channels: 4,
      background: { r: 7, g: 26, b: 45, alpha: 1 }
    }
  })
    .composite([
      { input: rendered[0].buffer, left: 0, top: 0 },
      { input: rendered[1].buffer, left: columnWidth + gap, top: 0 }
    ])
    .png()
    .toFile(path.join(evidence, name));
}

await pair(
  "comparison-desktop-incumbent-left-candidate-right.png",
  path.join(evidence, "desktop", "homepage-incumbent-1440.png"),
  path.join(evidence, "desktop", "homepage-candidate-1440.png"),
  720
);

await pair(
  "comparison-mobile-incumbent-left-candidate-right.png",
  path.join(evidence, "mobile", "homepage-incumbent-390.png"),
  path.join(evidence, "mobile", "homepage-candidate-390.png"),
  390
);
