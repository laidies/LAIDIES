#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONT_RECORDS = [
  {
    path: "assets/fonts/newsstand/anton-latin.woff2",
    sha256: "d0fa07ff63dd60cbc0e2f58e29c802dca2a5ae0276c999f59c6111ab7bbaec3b"
  },
  {
    path: "assets/fonts/newsstand/jost-normal-latin.woff2",
    sha256: "7726a5cd6f3c0e876c028ea2a643d45f7aad4b0f164b70966c669f4a4668f4b9"
  },
  {
    path: "assets/fonts/newsstand/jost-italic-latin.woff2",
    sha256: "0cadc07f42c10553256ae8fd50fe5eb8b09afe79443f68f50a977fdfc8d25ea8"
  }
];
const LICENCES = [
  "assets/fonts/newsstand/OFL-Anton.txt",
  "assets/fonts/newsstand/OFL-Jost.txt"
];
const sha256 = value => crypto.createHash("sha256").update(value).digest("hex");

export function inspectNewsstandFontDelivery({ html, css, readBytes }) {
  const errors = [];
  const combined = `${html}\n${css}`;
  if (/fonts\.(?:googleapis|gstatic)\.com/i.test(combined)) errors.push("NewsStand still depends on an external font service");
  for (const font of FONT_RECORDS) {
    const publicPath = `/${font.path}`;
    if (!html.includes(`rel="preload" href="${publicPath}"`) && font.path !== "assets/fonts/newsstand/jost-italic-latin.woff2") {
      errors.push(`required font preload is missing: ${font.path}`);
    }
    if (!css.includes(`url("${publicPath}") format("woff2")`)) errors.push(`local font face is missing: ${font.path}`);
    const bytes = readBytes(font.path);
    if (!bytes) errors.push(`font file is missing: ${font.path}`);
    else if (sha256(bytes) !== font.sha256) errors.push(`font file checksum changed: ${font.path}`);
  }
  if ((css.match(/@font-face\s*\{[^}]*font-family:\s*"Anton"/g) || []).length !== 1) errors.push("Anton must have one exact local face");
  if ((css.match(/@font-face\s*\{[^}]*font-family:\s*"Jost"/g) || []).length !== 7) errors.push("Jost must bind five upright and two italic local faces");
  if ((css.match(/font-display:\s*block/g) || []).length !== 8) errors.push("every NewsStand font face must block fallback capture");
  if (/font-display:\s*(?:swap|fallback|optional)/.test(css)) errors.push("NewsStand font faces permit a fallback-font capture");
  if (!html.includes("/content/newsstand.css?v=20260814-newsstand-v27")) errors.push("NewsStand font repair lacks the v27 cache key");
  for (const licence of LICENCES) {
    const bytes = readBytes(licence);
    if (!bytes || !bytes.toString("utf8").includes("SIL OPEN FONT LICENSE")) errors.push(`font licence is missing or invalid: ${licence}`);
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
  const css = fs.readFileSync(path.join(ROOT, "content/newsstand.css"), "utf8");
  const errors = inspectNewsstandFontDelivery({
    html,
    css,
    readBytes: relative => {
      const absolute = path.join(ROOT, relative);
      return fs.existsSync(absolute) ? fs.readFileSync(absolute) : null;
    }
  });
  if (errors.length) {
    console.error("NEWSSTAND FONT DELIVERY HOLD");
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log("NEWSSTAND FONT DELIVERY PASS faces=8 files=3 external_runtime=none fallback_capture=blocked");
}
