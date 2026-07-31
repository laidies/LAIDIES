import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, "index.html"), "utf8");
const css = fs.readFileSync(path.join(here, "post-office-candidate.css"), "utf8");
const js = fs.readFileSync(path.join(here, "post-office-candidate.js"), "utf8");
const catalog = JSON.parse(fs.readFileSync(path.join(here, "postcard-catalog-candidate.json"), "utf8"));

assert.equal(catalog.schema, "laidies.post-office.postcard-catalog.candidate.v1");
assert.equal(catalog.cards.length, 11);
assert.equal(new Set(catalog.cards.map((card) => card.id)).size, 11);
assert.equal(new Set(catalog.cards.map((card) => card.image)).size, 11);
for (const card of catalog.cards) {
  assert.match(card.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.match(card.image, /^\/assets\/postcards\/from-sunnyvaile\/[a-z0-9-]+\.(?:png|webp)$/);
}

for (const id of [
  "newsletterForm", "newsletterReceipt", "resident", "postcardRack",
  "rackFailure", "writingDesk", "selectionReceipt", "archiveGrid", "archiveFailure"
]) {
  assert.match(html, new RegExp(`id="${id}"`), `missing ${id}`);
}

for (const phrase of [
  "a request is not a subscription",
  "A Card is not an account",
  "Prepared is not sent",
  "No sign-in, invitation, delivery or reward state is inferred",
  "does not mean a newsletter reached anyone"
]) {
  assert.ok((html + js).toLowerCase().includes(phrase.toLowerCase()), `missing truth boundary: ${phrase}`);
}

for (const contract of [
  "validateCatalog", "catalogRequest", "archiveRequest", "aria-busy",
  "prefers-reduced-motion", "history.replaceState", "aria-invalid",
  "cache: \"no-store\""
]) {
  assert.ok((html + css + js).includes(contract), `missing contract: ${contract}`);
}

for (const [parameter, fixture] of [
  ["catalog", "malformed"],
  ["archive", "fail"],
  ["newsletter", "blocked"],
  ["image", "fail"]
]) {
  assert.ok(
    js.includes(`params.get("${parameter}")`) && js.includes(`"${fixture}"`),
    `missing fixture contract: ${parameter}=${fixture}`
  );
}

assert.match(css, /\[hidden\]\s*\{[^}]*display:\s*none\s*!important/s);
assert.match(css, /\.postcard-card\s*\{[^}]*display:\s*block/s);
assert.match(css, /@media \(max-width: 520px\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(html, /id="counter" tabindex="-1"/);
assert.doesNotMatch(html + js, /\b(subscribed|delivered|joined|rewarded)\b[^.]{0,50}\b(success|complete|confirmed)\b/i);

console.log("POST OFFICE WAVE 3 CANDIDATE PASS cards=11 counters=4 catalog=governed archive=fail-closed newsletter=non-authoritative responsive=320,390,1440");
