#!/usr/bin/env node
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const bytes = (file) => fs.readFileSync(path.join(root, file));
const exists = (file) => fs.existsSync(path.join(root, file));
const sha256 = (file) => crypto.createHash("sha256").update(bytes(file)).digest("hex");
const page = read("chick-flicks.html");
const styles = read("content/chick-flicks.css");
const behavior = read("content/chick-flicks.js");
const index = JSON.parse(read("content/episode-index.json"));
const checks = [];
const check = (name, fn) => { fn(); checks.push(name); };

const vhs = {
  "01": "63985d88a0de8377121dde1d5acf5fa471c6c13aec3b31352dbf37a9861cc722",
  "02": "e9e731701793ffcbf0e844866feef0f5cb694010cd83b108cf5a559fd4783922",
  "03": "b049fe5fa913eae7e8fb8f66f8f7bc7cce04b281139c04f464a81e109536cdde",
  "04": "85faeed60e3a1f9f9232b32360c08e5b6be370ff4d97eff7bcb6ae84934886c8"
};
const store = "assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-rental-store-interior-approved-v1.png";
const shelf = "assets/sunnyvaile-interiors/chick-flicks-store-v2/chick-flicks-four-bay-shelf-v1.png";

check("episode index has unique positive numbered records with titles", () => {
  assert.ok(Array.isArray(index.episodes) && index.episodes.length > 0);
  const seen = new Set();
  for (const episode of index.episodes) {
    assert.ok(Number.isInteger(episode.number) && episode.number > 0);
    assert.ok(episode.title?.trim());
    assert.ok(!seen.has(episode.number), `duplicate episode ${episode.number}`);
    seen.add(episode.number);
  }
});

check("all published issue destinations exist", () => {
  for (const episode of index.episodes.filter((entry) => entry.status === "published")) {
    assert.match(episode.issueUrl, /^\/?issues\/[^/]+\.html$/);
    assert.ok(exists(episode.issueUrl.replace(/^\/+/, "")), `missing ${episode.issueUrl}`);
  }
});

check("the rejected office-like room cannot return and the approved rental store is present", () => {
  assert.doesNotMatch(page, /sunnyvaile-masthead-chick-flicks\.png/);
  assert.doesNotMatch(page, /chick-flicks-store-shelves-v1\.png/);
  assert.match(page, /class="cf-masthead"/);
  assert.match(page, new RegExp(`src="/${store.replaceAll("/", "\\/")}"`));
  assert.ok(exists(store));
  assert.equal(sha256(store), "a2961792a32429605f93558af1c7742906fc4333b1ae413f931ec4c0a633e405");
  assert.ok(page.indexOf('class="cf-masthead"') < page.indexOf('class="cf-store"'));
});

check("four exact transparent VHS cases are operable on the physical shelf", () => {
  assert.equal((page.match(/class="cf-tape(?:\s[^"]*)?"/g) || []).length, 4);
  for (const [number, hash] of Object.entries(vhs)) {
    const file = `assets/sunnyvaile-interiors/episode-vhs-boxes-v2/ep-${number}.png`;
    assert.ok(exists(file), `missing ${file}`);
    assert.equal(sha256(file), hash, `${file} changed`);
    const png = bytes(file);
    assert.equal(png.readUInt32BE(16), 1024, `${file} width`);
    assert.equal(png.readUInt32BE(20), 1536, `${file} height`);
    assert.equal(png[25], 6, `${file} must remain RGBA`);
    assert.match(page, new RegExp(`href="#episode-${number}"[\\s\\S]{0,240}ep-${number}\\.png`));
  }
});

check("four released rental records expose direct format routes", () => {
  assert.equal((page.match(/<article class="cf-rental(?:\s[^"]*)?"/g) || []).length, 4);
  for (const number of Object.keys(vhs)) {
    assert.equal((page.match(new RegExp(`href="/issues/issue-${number}\\.html"`, "g")) || []).length, 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=listen"`, "g")) || []).length, 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=watch"`, "g")) || []).length, 1);
  }
});

check("released tapes open an immediate accessible format dialog", () => {
  assert.match(page, /<dialog class="cf-dialog" id="cf-episode-dialog"/);
  assert.match(page, /class="cf-dialog__close"[^>]*aria-label="Close episode details"/);
  assert.doesNotMatch(page, /class="cf-counter"/);
  for (const number of Object.keys(vhs)) {
    assert.match(page, new RegExp(`<h3 id="episode-${number}-title"`));
  }
  assert.match(behavior, /dialog\.showModal\(\)/);
  assert.match(behavior, /dialog\.close\(\)/);
  assert.match(behavior, /event\.key === 'Escape'/);
  assert.match(behavior, /lastTrigger\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(behavior, /requestAnimationFrame\(\(\) => showEpisode\(directEpisode\)\)/);
  assert.match(behavior, /history\.pushState\(null, '', `#\$\{id\}`\)/);
  assert.match(styles, /\.cf-dialog::backdrop/);
  assert.match(styles, /\.chick-flicks-page\.cf-dialog-open\{overflow:hidden\}/);
});

check("start and latest routes remain immediately available", () => {
  assert.match(page, /class="cf-routebar"/);
  assert.match(page, /href="#episode-01"[\s\S]{0,180}<b>Start with episode 1<\/b>/);
  assert.match(page, /href="#episode-04"[\s\S]{0,220}<b>Go to the latest episode<\/b>/);
});

check("Episode 05 is forthcoming without a fabricated tape or action", () => {
  assert.match(page, /Episode 05 will join the shelf when it is ready to read and listen to\./);
  assert.doesNotMatch(page, /issue-05|ep=05|episode-vhs-boxes-v2\/ep-05/);
});

check("the trailer is accurate and exposes one route", () => {
  assert.match(page, /illustrated, captioned introduction explains the town and how each episode works/i);
  assert.equal((page.match(/href="\/watch\.html\?ep=trailer"/g) || []).length, 1);
  assert.match(page, /assets\/media\/opening-day-covers-v1\/trailer\/trailer-site\.jpg/);
});

check("responsive and keyboard-visible rules preserve the interaction", () => {
  assert.match(styles, /\.cf-tape:focus-visible/);
  assert.match(styles, /\.cf-button:focus-visible/);
  assert.match(styles, /\.cf-dialog__close:focus-visible/);
  assert.match(styles, /@media\(max-width:920px\)/);
  assert.match(styles, /@media\(max-width:700px\)/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(styles, /\.cf-shelf-row[^{]*\{[^}]*grid-template-columns:repeat\(4/);
  assert.match(styles, /@media\(max-width:700px\)[\s\S]*\.cf-shelf-row\{[^}]*grid-template-columns:repeat\(2/);
  assert.ok(exists(shelf));
  assert.equal(sha256(shelf), "5a6ae951e995f84253e423cc8cd8ad5ba3cb295f75787d417124c1f3a56e9486");
  assert.match(styles, new RegExp(shelf.replaceAll("/", "\\/")));
  assert.doesNotMatch(styles, /text-transform:uppercase/);
});

check("the page uses the current Homepage and LIBRAiRY colour system", () => {
  for (const colour of ["#070f2b", "#11183b", "#f254a9", "#ff7366", "#7137d6", "#2457e6", "#15bce0", "#78c7ff", "#7de2c2", "#b7e42b", "#ffd34d", "#fffdfb"]) {
    assert.ok(styles.includes(colour), `missing current site colour ${colour}`);
  }
  assert.match(styles, /linear-gradient\(145deg,#ef4d9c 0%,#b75cc4 58%,#6c7cd1 100%\)/);
  assert.match(styles, /linear-gradient\(125deg,rgba\(113,55,214,\.94\),rgba\(36,87,230,\.94\)\)/);
  assert.match(styles, /linear-gradient\(125deg,var\(--pink\),var\(--coral\)\)/);
  assert.match(styles, /linear-gradient\(125deg,var\(--mint\),var\(--cyan\)\)/);
  assert.doesNotMatch(styles, /#f6f2ff|#f14f9f|#c653bc|#774ed5/);
});

check("shared Chick Flicks entries use release-state truth rather than weekly freshness", () => {
  const scoped = [
    read("index.html"),
    read("content/site/sunnyvaile-directory.js"),
    read("content/site/sv-tour-checkin.js"),
    read("content/site/sv-welcome-tour.js"),
    read("issues/issue-trailer.html")
  ].join("\n");
  for (const claim of ["This week's rental", "Pull this week's episode", "one tape a week", "Grab this week's tape"]) {
    assert.ok(!scoped.includes(claim), claim);
  }
});

console.log(`CHICK FLICKS CONTRACT PASS (${checks.length} checks)`);
for (const name of checks) console.log(`- ${name}`);
