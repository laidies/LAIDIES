#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectNewsstandFontDelivery } from "./check-newsstand-font-delivery.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(ROOT, "newsstand.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "content/newsstand.css"), "utf8");
const actualFiles = new Map();
for (const relative of [
  "assets/fonts/newsstand/anton-latin.woff2",
  "assets/fonts/newsstand/jost-normal-latin.woff2",
  "assets/fonts/newsstand/jost-italic-latin.woff2",
  "assets/fonts/newsstand/OFL-Anton.txt",
  "assets/fonts/newsstand/OFL-Jost.txt"
]) actualFiles.set(relative, fs.readFileSync(path.join(ROOT, relative)));

const inspect = ({ candidateHtml = html, candidateCss = css, files = actualFiles } = {}) =>
  inspectNewsstandFontDelivery({ html: candidateHtml, css: candidateCss, readBytes: relative => files.get(relative) || null });

assert.deepEqual(inspect(), []);
const bad = [];
const reject = (id, mutation) => {
  const errors = inspect(mutation());
  assert.ok(errors.length > 0, `${id} incorrectly passed`);
  bad.push(id);
};

reject("external-font-service", () => ({ candidateHtml: html.replace("</head>", '<link href="https://fonts.googleapis.com/css2?family=Anton"></head>') }));
reject("missing-anton-preload", () => ({ candidateHtml: html.replace(/^.*anton-latin\.woff2.*\n/m, "") }));
reject("foreign-anton-face", () => ({ candidateCss: css.replace('/assets/fonts/newsstand/anton-latin.woff2', 'https://fonts.gstatic.com/anton.woff2') }));
reject("fallback-capture-enabled", () => ({ candidateCss: css.replace("font-display: block", "font-display: swap") }));
reject("stale-cache-key", () => ({ candidateHtml: html.replace("20260814-newsstand-v27", "20260813-newsstand-v26") }));
reject("mutated-font-bytes", () => {
  const files = new Map(actualFiles);
  files.set("assets/fonts/newsstand/anton-latin.woff2", Buffer.from("not the admitted Anton font"));
  return { files };
});
reject("missing-font-licence", () => {
  const files = new Map(actualFiles);
  files.delete("assets/fonts/newsstand/OFL-Jost.txt");
  return { files };
});

console.log(`NEWSSTAND FONT DELIVERY CALIBRATION PASS known_bad=${bad.length} cases=${bad.join(",")}`);
