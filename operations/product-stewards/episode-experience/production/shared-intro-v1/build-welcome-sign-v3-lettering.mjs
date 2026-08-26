#!/usr/bin/env node

import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = process.cwd();
const input = path.join(
  root,
  "assets/episodes/shared/intro-v1/candidates/sunnyvaile-welcome-sign-v3-blank-candidate-v1.png",
);
const output = path.join(
  root,
  "assets/episodes/shared/intro-v1/candidates/sunnyvaile-welcome-sign-v3-lettered-candidate-v1.png",
);

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941" viewBox="0 0 1672 941">
  <style>
    .jost { font-family: Jost, Arial, sans-serif; text-anchor: middle; }
  </style>
  <g class="jost">
    <text x="836" y="294" font-size="66" font-weight="800" letter-spacing="13" fill="#50d9e6">WELCOME TO</text>

    <text x="849" y="474" font-size="142" font-weight="900" letter-spacing="2" fill="#f16967" stroke="#07172f" stroke-width="16" paint-order="stroke fill">SUNNYVAiLE</text>
    <text x="842" y="466" font-size="142" font-weight="900" letter-spacing="2" fill="#fff3dc" stroke="#f84c9b" stroke-width="7" paint-order="stroke fill">SUNNYVAiLE</text>

    <path d="M490 516 H1182" fill="none" stroke="#7164df" stroke-width="8" stroke-linecap="square"/>
    <path d="M590 531 H1082" fill="none" stroke="#50d9e6" stroke-width="4" stroke-linecap="square"/>

    <text x="836" y="604" font-size="40" font-weight="650" letter-spacing="2.2" fill="#f16967">population: women just like you.</text>
  </g>
</svg>`);

await sharp(input)
  .composite([{ input: overlay }])
  .png()
  .toFile(output);

console.log(output);
