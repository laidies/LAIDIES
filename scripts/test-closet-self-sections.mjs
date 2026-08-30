#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const source = process.argv.includes("--stdin")
  ? fs.readFileSync(0, "utf8")
  : fs.readFileSync(process.argv[2] || "laidies-card.html", "utf8");

function element(id) {
  const match = source.match(new RegExp(`<[^>]+id=["']${id}["'][^>]*>`, "i"));
  assert.ok(match, `missing #${id}`);
  return match[0];
}

for (const id of ["walletSlots", "dashboardSection", "covenSection"]) {
  assert.doesNotMatch(element(id), /\shidden(?:\s|>|=)/i, `self #${id} must be visible`);
}
for (const id of ["fairyBankSection", "leaderboardSection"]) {
  assert.match(element(id), /\shidden(?:\s|>|=)/i, `held #${id} must stay hidden`);
}

const publicMode = source.match(/function applyPublicMode\(\)\s*\{([\s\S]*?)\n\s*\}/);
assert.ok(publicMode, "missing applyPublicMode");
for (const id of ["walletSlots", "dashboardSection", "covenSection"]) {
  assert.match(publicMode[1], new RegExp(`getElementById\\(['"]${id}['"]\\)\\.hidden\\s*=\\s*true`), `public mode must hide #${id}`);
}

console.log("CLOSET SELF SECTIONS PASS self=wallet-report-luminaries public-guard=3 held=fairy-leaderboards");
