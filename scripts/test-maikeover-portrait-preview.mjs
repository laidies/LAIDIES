#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const page = fs.readFileSync(path.join(root, "maikeover.html"), "utf8");
const contractSource = fs.readFileSync(
  path.join(root, "content/site/resident-card-contract-v1.js"), "utf8"
);

const functionStart = page.indexOf("    function renderPreview(){");
const functionEnd = page.indexOf("\n    // ---- background chips ----", functionStart);
assert.notEqual(functionStart, -1, "MAiKEOVER must contain renderPreview");
assert.notEqual(functionEnd, -1, "MAiKEOVER renderPreview boundary must exist");
const previewSource = page.slice(functionStart, functionEnd);

function makeImage() {
  return { tagName: "IMG", style: {}, src: "", alt: "" };
}

function runPreview(source, avatar, initialAvatar = null) {
  const nodes = new Map();
  for (const id of [
    "moCard", "moNameInput", "moName", "moHandle", "moMovie", "moTv",
    "moSong", "moSaint", "moCarry", "moAvatar", "moSongSel", "moSaintSel",
    "moMovieSel", "moTvSel", "moCarrySel"
  ]) {
    nodes.set(id, { dataset: {}, style: {}, textContent: "", value: "", children: [] });
  }
  nodes.get("moNameInput").value = "Ali";
  nodes.get("moAvatar").replaceChildren = (...children) => {
    nodes.get("moAvatar").children = children;
  };
  if (initialAvatar) nodes.get("moAvatar").children = [initialAvatar];

  const window = { atob, btoa };
  const contractContext = {
    window,
    document: { createElement: makeImage },
    atob,
    btoa
  };
  vm.runInNewContext(contractSource, contractContext, {
    filename: "resident-card-contract-v1.js"
  });
  const context = {
    window,
    document: { createElement: makeImage },
    localStorage: { getItem: () => "" },
    SAINT_LABEL: {},
    state: { bg: "pinklilac", avatar },
    $: id => nodes.get(id)
  };
  vm.runInNewContext(`${source}\nrenderPreview();`, context, {
    filename: "maikeover-render-preview.js"
  });
  return nodes.get("moAvatar").children;
}

const raster = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a6X8AAAAASUVORK5CYII=";
const asset = "/assets/brand/laidies-logo-square-pearl-512-v1.png";
const stale = { tagName: "IMG", src: asset };

// Calibration: recreate the former conditions and prove this guard fails them.
const oldSource = previewSource
  .replace("      av.replaceChildren();\n", "")
  .replace(
    "(window.LAIDIESResidentCard.isSafeAssetPath(state.avatar) ||\n           window.LAIDIESResidentCard.isSafeRasterPortrait(state.avatar))",
    "window.LAIDIESResidentCard.isSafeAssetPath(state.avatar)"
  );
assert.equal(runPreview(oldSource, raster).length, 0,
  "calibration: asset-only code rejects a contract-valid raster portrait");
assert.equal(runPreview(oldSource, "", stale)[0], stale,
  "calibration: no-clear code leaves the prior portrait visible");

const renderedRaster = runPreview(previewSource, raster);
assert.equal(renderedRaster.length, 1,
  "current preview renders a contract-valid raster portrait");
assert.equal(renderedRaster[0].tagName, "IMG");
assert.equal(renderedRaster[0].src, raster);

assert.equal(runPreview(previewSource, "", stale).length, 0,
  "current preview clears the portrait when it is removed");
assert.equal(runPreview(previewSource, "javascript:alert(1)", stale).length, 0,
  "current preview clears and rejects an unsafe portrait source");

console.log("MAiKEOVER PORTRAIT PREVIEW PASS: calibrated old asset-only/no-clear behavior fails; current raster render and clear/reject cases pass.");
