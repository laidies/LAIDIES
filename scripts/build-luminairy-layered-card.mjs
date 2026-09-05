#!/usr/bin/env node

import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const [foregroundPath, backgroundPath, cleanedForegroundPath, outputPath] = process.argv.slice(2);

if (!foregroundPath || !backgroundPath || !cleanedForegroundPath || !outputPath) {
  console.error("Usage: build-luminairy-layered-card.mjs <foreground> <background> <cleaned-foreground> <output>");
  process.exit(2);
}

const foreground = await sharp(foregroundPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const backgroundMetadata = await sharp(backgroundPath).metadata();

if (foreground.info.width !== backgroundMetadata.width || foreground.info.height !== backgroundMetadata.height) {
  throw new Error(`dimension mismatch: foreground ${foreground.info.width}x${foreground.info.height}, background ${backgroundMetadata.width}x${backgroundMetadata.height}`);
}

const pixels = foreground.info.width * foreground.info.height;
let originallyTransparent = 0;

for (let offset = 3; offset < foreground.data.length; offset += 4) {
  if (foreground.data[offset] < 255) originallyTransparent += 1;
}

if (originallyTransparent === 0) {
  let chromaGreenPixels = 0;
  for (let offset = 0; offset < foreground.data.length; offset += 4) {
    const red = foreground.data[offset];
    const green = foreground.data[offset + 1];
    const blue = foreground.data[offset + 2];
    if (green > 160 && green > red * 1.35 && green > blue * 1.35) {
      chromaGreenPixels += 1;
    }
  }

  const hasChromaGreenField = chromaGreenPixels / pixels > 0.15;
  for (let offset = 0; offset < foreground.data.length; offset += 4) {
    const red = foreground.data[offset];
    const green = foreground.data[offset + 1];
    const blue = foreground.data[offset + 2];
    const strongestNonGreen = Math.max(red, blue);
    const greenExcess = green - strongestNonGreen;
    const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
    const isChromaGreen = green > 160 && green > red * 1.35 && green > blue * 1.35;
    const isPaleCheckerboard = red > 215 && green > 215 && blue > 215 && spread < 24;
    if ((hasChromaGreenField && isChromaGreen) || (!hasChromaGreenField && isPaleCheckerboard)) {
      foreground.data[offset + 3] = 0;
    } else if (hasChromaGreenField && greenExcess > 4) {
      // Generated chroma-key art often leaves a thin green antialias fringe.
      // The foreground brief prohibits green wardrobe and lighting, so reduce
      // both the spill and opacity only where green clearly dominates.
      const edgeOpacity = greenExcess > 18
        ? Math.max(0, Math.min(1, 1 - ((greenExcess - 18) / 90)))
        : 1;
      foreground.data[offset + 1] = strongestNonGreen;
      foreground.data[offset + 3] = Math.round(foreground.data[offset + 3] * edgeOpacity);
    }
  }
}

let transparent = 0;
for (let offset = 3; offset < foreground.data.length; offset += 4) {
  if (foreground.data[offset] < 8) {
    foreground.data[offset] = 0;
    transparent += 1;
  }
}

const transparentRatio = transparent / pixels;
if (transparentRatio < 0.15) {
  throw new Error(`foreground extraction failed: only ${(transparentRatio * 100).toFixed(2)}% transparent pixels`);
}

await sharp(foreground.data, { raw: foreground.info }).png().toFile(cleanedForegroundPath);
await sharp(backgroundPath)
  .composite([{ input: cleanedForegroundPath, left: 0, top: 0 }])
  .png()
  .toFile(outputPath);

console.log(JSON.stringify({
  foreground: path.resolve(cleanedForegroundPath),
  background: path.resolve(backgroundPath),
  output: path.resolve(outputPath),
  dimensions: `${foreground.info.width}x${foreground.info.height}`,
  transparentRatio: Number(transparentRatio.toFixed(4)),
}));
