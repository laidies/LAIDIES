#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "newsstand.html"), "utf8");
const scriptMatch = html.match(/<section class="ns-town-strip"[\s\S]*?<\/section>\s*<script>([\s\S]*?)<\/script>/);
assert.ok(scriptMatch, "town strip must have its own fail-independent rotation script");

const weather = new Set();
const traffic = new Set();

for (let day = 1; day <= 7; day += 1) {
  const fixed = new Date(2026, 8, day, 12, 0, 0);
  const nodes = {
    "ns-town-weather": { textContent: "" },
    "ns-town-traffic": { textContent: "" },
    "ns-town-date": { textContent: "", dateTime: "" }
  };
  const NativeDate = Date;
  function FixedDate(...args) {
    return new NativeDate(...(args.length ? args : [fixed.getTime()]));
  }
  FixedDate.prototype = NativeDate.prototype;
  Object.setPrototypeOf(FixedDate, NativeDate);
  FixedDate.now = () => fixed.getTime();

  vm.runInNewContext(scriptMatch[1], {
    Date: FixedDate,
    document: { getElementById: id => nodes[id] }
  });

  assert.ok(nodes["ns-town-weather"].textContent, `day ${day} weather must not be blank`);
  assert.ok(nodes["ns-town-traffic"].textContent, `day ${day} traffic must not be blank`);
  assert.equal(nodes["ns-town-date"].dateTime, `2026-09-${String(day).padStart(2, "0")}`);
  weather.add(nodes["ns-town-weather"].textContent);
  traffic.add(nodes["ns-town-traffic"].textContent);
}

assert.equal(weather.size, 7, "weather should change on each day of the weekly rotation");
assert.equal(traffic.size, 7, "traffic should change on each day of the weekly rotation");
assert.match(html, /aria-label="SUNNYVAiLE weather and traffic — town humour"/, "the strip must identify itself as town humour");

console.log("NEWSSTAND TOWN STRIP PASS — 7 distinct weather lines, 7 distinct traffic lines, dated daily");
