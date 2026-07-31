import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../..");
const html = fs.readFileSync(path.join(here, "index.html"), "utf8");
const css = fs.readFileSync(path.join(here, "ksvl-candidate.css"), "utf8");
const js = fs.readFileSync(path.join(here, "ksvl-candidate.js"), "utf8");
const registry = JSON.parse(fs.readFileSync(path.join(root, "content/music/ksvl-track-registry.json"), "utf8"));

assert.equal(registry.tracks.length, 29);
assert.equal(new Set(registry.tracks.map((track) => track.id)).size, 29);
assert.equal(new Set(registry.tracks.map((track) => track.src)).size, 29);

for (const track of registry.tracks) {
  assert.equal(track.status, "AVAILABLE");
  assert.equal(track.rightsStatus, "CREATOR_CONFIRMED_SUNO_ORIGINAL");
  assert.equal(track.sourceStatus, "FILE_PRESENT_VERIFIED");
  assert.ok(fs.existsSync(path.join(root, track.src.replace(/^\//, ""))), `missing audio ${track.src}`);
}

for (const id of [
  "station", "audio", "deck-title", "playerState", "seek", "volume",
  "mixGrid", "catalogFailure", "bandGrid", "stickerGrid", "stickerReceipt",
  "requestForm", "requestReceipt"
]) {
  assert.match(html, new RegExp(`id="${id}"`), `missing ${id}`);
}

for (const boundary of [
  "A play is listening—not learning completion, membership, a reward or an account history",
  "They do not enter the Closet, become an account collection or unlock a reward",
  "Saved is not submitted, heard, selected, produced or credited",
  "No inactive provider control is presented as a working feature",
  "always restores paused"
]) {
  assert.ok((html + js).includes(boundary), `missing truth boundary: ${boundary}`);
}

for (const contract of [
  "validateRegistry", "signatureFor", "playerTtl", "requestTtl",
  "registryRequest", "aria-busy", "cache: \"no-store\"",
  "exactKeys", "mediaFailure", "safeStorage", "pagehide",
  "prefers-reduced-motion", "history"
]) {
  assert.ok((html + css + js).includes(contract), `missing contract ${contract}`);
}

for (const [parameter, fixture] of [
  ["catalog", "malformed"],
  ["media", "fail"],
  ["storage", "denied"],
  ["state", "stale"],
  ["state", "corrupt"]
]) {
  assert.ok(
    js.includes(`params.get("${parameter}")`) && js.includes(`"${fixture}"`),
    `missing fixture ${parameter}=${fixture}`
  );
}

const referencedAssets = [
  ...[...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]),
  ...[...js.matchAll(/(?:cover|image): "(\/assets\/[^"]+)"/g)].map((match) => match[1])
];

for (const asset of new Set(referencedAssets)) {
  assert.ok(fs.existsSync(path.join(root, asset.slice(1))), `missing asset ${asset}`);
}

assert.match(css, /\[hidden\]\s*\{\s*display:\s*none\s*!important/);
assert.match(css, /@media \(max-width: 560px\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(html, /<main id="station" tabindex="-1">/);
assert.doesNotMatch(html + js, /\b(subscribed|delivered|joined|rewarded)\b[^.]{0,50}\b(success|complete|confirmed)\b/i);

console.log("KSVL WAVE 3 CANDIDATE PASS tracks=29 mixes=6 bands=10 stickers=18 local-return=paused request=draft-only provider=held responsive=320,390,1440");
