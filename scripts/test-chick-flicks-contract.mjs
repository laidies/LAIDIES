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
const visualSystemStyles = read("content/site/laidies-visual-system.css");
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
const trailerVhs = "assets/sunnyvaile-interiors/episode-vhs-boxes-v2/trailer.png";
const trailerVhsHash = "45ac007f9456bf7f6c17b8e4e82c41bfc77d7577cc262fb57271f83983f036b3";
const comingSoonVhs = "assets/sunnyvaile-interiors/episode-vhs-boxes-v2/coming-soon-vhs-v1.png";
const comingSoonVhsHash = "54dd977a11cac51ff6b8ae0918ea9b961ef9deb3463b4628bb602797b25d3598";

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

check("the trailer and four exact transparent episode cases are operable on physical shelves", () => {
  assert.equal((page.match(/<a class="[^"]*cf-tape[^"]*"/g) || []).length, 5);
  assert.equal((page.match(/<div class="cf-tape cf-tape--coming"/g) || []).length, 3);
  assert.equal((page.match(/class="cf-shelf-row(?:\s[^"]*)?"/g) || []).length, 2);
  assert.ok(exists(trailerVhs));
  assert.equal(sha256(trailerVhs), trailerVhsHash, `${trailerVhs} changed`);
  const trailerPng = bytes(trailerVhs);
  assert.equal(trailerPng.readUInt32BE(16), 1024, `${trailerVhs} width`);
  assert.equal(trailerPng.readUInt32BE(20), 1536, `${trailerVhs} height`);
  assert.equal(trailerPng[25], 6, `${trailerVhs} must remain RGBA`);
  assert.match(page, /class="cf-tape cf-tape--trailer" href="#trailer"[\s\S]{0,260}episode-vhs-boxes-v2\/trailer\.png/);
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
  assert.equal((page.match(/<article class="[^"]*cf-rental[^"]*"[^>]*data-episode=/g) || []).length, 4);
  for (const number of Object.keys(vhs)) {
    assert.equal((page.match(new RegExp(`href="/issues/issue-${number}\\.html"`, "g")) || []).length, number === '01' ? 2 : 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=listen"`, "g")) || []).length, 1);
    assert.equal((page.match(new RegExp(`href="/watch\\.html\\?ep=${number}&amp;mode=watch"`, "g")) || []).length, 1);
  }
});

check("released tapes open an immediate accessible format dialog", () => {
  assert.match(page, /<dialog class="cf-dialog" id="cf-episode-dialog"/);
  assert.match(page, /class="cf-dialog__close"[^>]*aria-label="Close episode details"/);
  assert.doesNotMatch(page, /class="cf-counter"/);
  assert.doesNotMatch(page, /As the season grows, new tapes open on the next full shelf/i);
  assert.doesNotMatch(page, /Now at the counter/i);
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

check("future bays 5, 6 and 7 use one inactive Coming soon VHS design", () => {
  assert.ok(exists(comingSoonVhs));
  assert.equal(sha256(comingSoonVhs), comingSoonVhsHash, `${comingSoonVhs} changed`);
  const placeholderPng = bytes(comingSoonVhs);
  assert.equal(placeholderPng.readUInt32BE(16), 1024, `${comingSoonVhs} width`);
  assert.equal(placeholderPng.readUInt32BE(20), 1536, `${comingSoonVhs} height`);
  assert.equal(placeholderPng[25], 6, `${comingSoonVhs} must remain RGBA`);
  for (const number of ["05", "06", "07"]) {
    assert.match(page, new RegExp(`aria-label="Episode ${number} coming soon"`));
  }
  assert.equal((page.match(/coming-soon-vhs-v1\.png/g) || []).length, 3);
  assert.doesNotMatch(page, /class="cf-coming|issue-0[5-7]|ep=0[5-7]|episode-vhs-boxes-v2\/ep-0[5-7]/);
});

check("the trailer is accurate and exposes one route", () => {
  assert.match(page, /trailer is being updated and is not available to play/i);
  assert.equal((page.match(/href="\/watch\.html\?ep=trailer"/g) || []).length, 0);
  assert.match(page, /id="trailer" data-program="trailer" hidden/);
  assert.match(page, /Trailer · Coming soon/);
  assert.doesNotMatch(page, /class="cf-trailer"/);
  assert.match(behavior, /\.cf-rental\[data-episode\], \.cf-rental\[data-program\]/);
  assert.match(behavior, /a\[href="#trailer"\], a\[href\^="#episode-"\]/);
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
  assert.doesNotMatch(styles, /\.cf-shelf-row--partial/);
  assert.ok(exists(shelf));
  assert.equal(sha256(shelf), "5a6ae951e995f84253e423cc8cd8ad5ba3cb295f75787d417124c1f3a56e9486");
  assert.match(styles, new RegExp(shelf.replaceAll("/", "\\/")));
  assert.doesNotMatch(styles, /text-transform:uppercase/);
});

check("the page uses the current Homepage and LIBRAiRY colour system", () => {
  assert.match(page, /laidies-visual-system\.css\?v=/);
  for (const colour of ["#11183b", "#f254a9", "#ff7366", "#7137d6", "#2457e6", "#15bce0", "#78c7ff", "#7de2c2", "#ffd34d", "#fffdfb"]) {
    assert.ok(visualSystemStyles.includes(colour), `missing current site colour ${colour}`);
  }
  assert.match(styles, /background-image:var\(--laidies-bg-comic-masthead\)/);
  assert.match(styles, /background-image:var\(--laidies-bg-comic-section\)/);
  assert.match(styles, /background:var\(--laidies-bg-quiet-reading\)/);
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
