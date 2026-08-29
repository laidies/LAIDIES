#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED = "ksvl-player.js?v=20260829-touch-targets-1";
const excludedTop = new Set([".git", "node_modules", "operations", "build"]);
const consumers = [];

function walk(directory, relative = "") {
  for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
    const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;
    if (!relative && excludedTop.has(entry.name)) continue;
    if (nextRelative.startsWith("assets/rejected/")) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, nextRelative);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      const source = fs.readFileSync(absolute, "utf8");
      if (source.includes("ksvl-player.js?v=")) consumers.push({path:nextRelative, source});
    }
  }
}

walk(ROOT);
if (process.argv.includes("--calibrate")) {
  assert.ok(consumers.length >= 50, "calibration needs the active KSVL consumer set");
  consumers[0].source = consumers[0].source.replace(EXPECTED, "ksvl-player.js?v=stale-known-bad");
}

const stale = consumers.filter((consumer) => !consumer.source.includes(EXPECTED)).map((consumer) => consumer.path);
if (process.argv.includes("--calibrate")) {
  assert.ok(stale.length === 1 && stale[0] === consumers[0].path, "known-bad cache identity was not rejected");
  console.log("KSVL CACHE CALIBRATION PASS known-bad stale consumer identity rejected");
} else {
  assert.ok(consumers.length >= 50, `expected the shared KSVL consumer set, found ${consumers.length}`);
  assert.deepEqual(stale, [], `stale KSVL player cache identities: ${stale.join(", ")}`);
  console.log(`KSVL CACHE PASS consumers=${consumers.length} identity=20260829-touch-targets-1`);
}
