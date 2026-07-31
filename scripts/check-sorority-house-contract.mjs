#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.SORORITY_ROOT || process.cwd());
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const house = read("sorority-house.html");
const houseController = read("content/site/sorority-house-v2.js");
const communityController = read("content/site/community-room.js");
const communityCss = read("content/community-room-v2.css");
const houseCss = read("content/sorority-house-v2.css");
const girlTalk = read("games/girl-talk.html");
const sitemap = read("sitemap.xml");
const roomFiles = [
  "ask-the-room",
  "wins",
  "dear-laidies",
  "try-on-debrief",
  "send-it-energy",
  "mix-cd-exchange",
  "burn-book"
];
const failures = [];
let checks = 0;

function requireMatch(source, pattern, label) {
  checks += 1;
  if (!pattern.test(source)) failures.push(`missing ${label}`);
}
function forbid(source, pattern, label) {
  checks += 1;
  if (pattern.test(source)) failures.push(`forbidden ${label}`);
}

requireMatch(house, /Every wing and room is discoverable|Every room is still open to explore/, "open room discovery");
requireMatch(house, /Resident Card is local profile play — not a community login/i, "identity boundary");
requireMatch(house, /Hyvor separately controls discussion sign-in, publication and moderation/i, "provider boundary");
requireMatch(house, /private messages[\s\S]{0,180}another person's information/i, "safe-sharing rule");
requireMatch(house, /not a post, Closet import or member reward/i, "Girl Talk boundary");
requireMatch(houseController, /Object\.keys\(roomData\)/, "hash room discovery");
requireMatch(houseController, /window\.history\.pushState\(null, "", "#room-"/, "room return state");
const openRoomSource = houseController.match(/function openRoom\([\s\S]*?\n  \}/)?.[0] || "";
checks += 1;
if (
  openRoomSource.indexOf("window.history.pushState") < 0 ||
  openRoomSource.indexOf("window.history.pushState") > openRoomSource.indexOf("if (!room.embed)")
) failures.push("room hash is not written before the non-embed return");
requireMatch(houseController, /reduced \? "auto" : "smooth"/, "reduced-motion scroll");
forbid(houseController, /AUTH_KEY|session\.user\.email|isResident/, "browser-asserted resident identity");
forbid(houseController, /Resident Card is on file|live rooms are unlocked|Posting unlocks/, "false resident unlock");

requireMatch(communityController, /APPROVED_HOST = \/\^\(www\\\.\)\?laidies\\\.ai\$/, "approved provider host");
requireMatch(communityController, /LOCAL_HOST\.test\(window\.location\.hostname\)/, "local fixture gate");
requireMatch(communityController, /local-preview[\s\S]*unavailable[\s\S]*unsupported-host[\s\S]*signed-out[\s\S]*held/, "required provider states");
requireMatch(communityController, /Nothing was submitted/i, "failure receipt truth");
requireMatch(communityController, /not a receipt that any contribution was accepted/i, "provider frame boundary");
requireMatch(communityController, /Participation, publication, moderation and reply are not guaranteed/i, "no-guarantee disclosure");
requireMatch(communityController, /do not post confidential work/i, "provider safety disclosure");
requireMatch(communityController, /LAiDIES privacy covers this site[\s\S]*Hyvor’s policies cover/i, "separate provider data boundary");
for (const [pattern, label] of [
  [/https:\/\/talk\.hyvor\.com\/privacy/, "Hyvor Talk privacy route"],
  [/https:\/\/talk\.hyvor\.com\/terms/, "Hyvor Talk terms route"],
  [/https:\/\/talk\.hyvor\.com\/docs\/moderation/, "Hyvor moderation/reporting route"]
]) requireMatch(communityController, pattern, label);
requireMatch(communityCss, /community-provider-state[\s\S]{0,500}#30152d/, "provider state contrast treatment");
requireMatch(communityCss, /prefers-reduced-motion[\s\S]{0,260}transition: none !important/, "community reduced motion");
requireMatch(houseCss, /prefers-reduced-motion[\s\S]{0,260}transition: none !important/, "house reduced motion");

for (const room of roomFiles) {
  const html = read(`community/${room}.html`);
  requireMatch(html, /content\/site\/community-room\.js/, `${room} shared provider controller`);
  forbid(html, /<script[^>]+talk\.hyvor\.com\/embed\/embed\.js/, `${room} eager provider script`);
}

requireMatch(girlTalk, /GT_STATE_KEY = "laidies_gt_local_state_v1"/, "single local Girl Talk envelope");
requireMatch(girlTalk, /function sanitizeState[\s\S]*CARD_ID_SET\.has[\s\S]*DARE_ID_SET\.has[\s\S]*PENALTY_ID_SET\.has/, "allowed-ID sanitizer");
requireMatch(girlTalk, /exactKeys\(value, \["version", "stickers", "dares", "penalties"\]\)/, "exact envelope shape");
requireMatch(girlTalk, /value\.stickers\.length > CARD_IDS\.length[\s\S]*value\.penalties\.length > 100/, "bounded local arrays");
requireMatch(girlTalk, /!unique\(value\.stickers\)[\s\S]*!unique\(value\.dares\)/, "deduplicated progress");
requireMatch(girlTalk, /value\.dares\.some[\s\S]*value\.stickers\.some/, "coherent dare and sticker state");
requireMatch(girlTalk, /readBack !== serialized[\s\S]*JSON\.stringify\(verified\) === serialized/, "verified canonical local write");
requireMatch(girlTalk, /Local record reset[\s\S]*Unknown or incoherent entries did not count or render/i, "corrupt-record recovery copy");
requireMatch(girlTalk, /This browser could not mark the local sticker/i, "storage failure truth");
requireMatch(girlTalk, /id="gtClearLocal"[\s\S]*Clear this device&rsquo;s Girl Talk record/i, "visible local-record clear control");
requireMatch(girlTalk, /function clearLocalState[\s\S]*removeItem\(GT_STATE_KEY\)[\s\S]*getItem\(GT_STATE_KEY\) === null/, "verified local-record removal");
requireMatch(girlTalk, /Not cleared[\s\S]*existing local markers were left unchanged/i, "clear failure truth");
requireMatch(girlTalk, /Local record cleared[\s\S]*unrelated browser data was changed/i, "bounded clear success truth");
requireMatch(girlTalk, /share only a sanitized pattern written from scratch/i, "optional safe sharing");
requireMatch(girlTalk, /not a Closet import, member reward or FAiRY allowance/i, "reward exclusions");
requireMatch(girlTalk, /role="status" aria-live="polite" aria-atomic="true"/, "atomic local result");
requireMatch(girlTalk, /prefers-reduced-motion[\s\S]{0,320}transition: none !important/, "Girl Talk reduced motion");
forbid(girlTalk, /Residents only\.|hasSession\(|hasCard\(/, "unverified Girl Talk resident gate");
forbid(girlTalk, /laidies_gt_stickers_earned|laidies_gt_dares_completed|laidies_gt_penalties_earned/, "legacy reward-shaped writes");
forbid(girlTalk, /Sticker earned/, "earned reward claim");
forbid(girlTalk, /linkifyFairy|fairy-godmother\.html/, "Girl Talk card-to-FAiRY linkage");
const catalogue = girlTalk.match(/const TRUTHS = \[[\s\S]*?const DARES = \[[\s\S]*?\n        \];/)?.[0] || "";
const cardPrompts = [...catalogue.matchAll(/\b(?:text|tip):\s*"([^"]*)"/g)].map((match) => match[1]);
checks += 1;
if (cardPrompts.length !== 78) failures.push(`card catalogue prompt count is ${cardPrompts.length}, expected 78`);
const unsafeDirective = /\b(post proof|post it|post before|share the|share what|drop it|real emails|email in your inbox|email you received|dm one|then send it)\b/i;
checks += 1;
if (cardPrompts.some((prompt) => unsafeDirective.test(prompt))) {
  failures.push("unsafe card-level email/post/share directive");
}
requireMatch(girlTalk, /Optional room for a sanitized pattern[\s\S]*Keep the full situation private/, "rendered card-level sharing boundary");
requireMatch(girlTalk, /focusAfterUpdate\(els\.cardPrompt\)/, "deliberate card focus");
requireMatch(girlTalk, /function focusNextAction[\s\S]*focusNextAction\(\)/, "deliberate next-action focus");
requireMatch(sitemap, /https:\/\/laidies\.ai\/sorority-house/, "Sorority House sitemap entry");

if (failures.length) {
  console.error("SORORITY HOUSE CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("SORORITY HOUSE CONTRACT PASS");
console.log(`checks=${checks}`);
console.log(`rooms=${roomFiles.length}`);
