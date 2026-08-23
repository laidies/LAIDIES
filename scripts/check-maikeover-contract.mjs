#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const maikeover = read("maikeover.html");
const closet = fs.readFileSync(
  process.env.MAIKEOVER_CLOSET_PATH || path.join(root, "laidies-card.html"),
  "utf8"
);
const resident = read("resident-card.html");
const helper = read("content/site/maikeover-v2.js");
const spec = read("operations/product-stewards/maikeover/OPERATING-SPEC.md");
const publicCardContract = JSON.parse(read(
  "operations/product-stewards/maikeover/public-card-field-contract-v1.json"
));
const failures = [];
const requireText = (source, text, message) => {
  if (!source.includes(text)) failures.push(message);
};
const forbidText = (source, text, message) => {
  if (source.includes(text)) failures.push(message);
};

requireText(spec, "cross-device outcomes remain\n**UNVERIFIED**",
  "operating spec does not hold cross-device outcomes");
requireText(maikeover, 'data-state="held"',
  "MAiKEOVER lacks fail-closed account state");
requireText(maikeover, "The guest book is not taking claims yet.",
  "MAiKEOVER does not explain the account hold");
requireText(maikeover, "laidies_resident_card_v1",
  "local save lacks one versioned authoritative envelope");
requireText(maikeover, "localStorage.getItem(CARD_STORAGE_KEY) !== serialized",
  "local envelope save does not verify its write");
requireText(maikeover, "carry: $('moCarrySel').value",
  "local save omits the carrying choice");
requireText(maikeover, "if(stored) $('moSeeCloset').style.display='inline';",
  "restored local Card does not expose its Closet handoff");
requireText(maikeover, "window.__LAIDIES_MAIKEOVER_ACCOUNT_PREFLIGHT__ === true",
  "account preflight is not explicitly gated");
requireText(maikeover, "/^(localhost|127\\.0\\.0\\.1)$/",
  "account preflight is not restricted to local hosts");
requireText(maikeover, "__LAIDIES_MAIKEOVER_PREFLIGHT_FIXTURE_ID__",
  "account preflight lacks a declared synthetic fixture");
forbidText(maikeover, "cdn.jsdelivr.net/npm/@supabase/supabase-js",
  "MAiKEOVER mock-capable source can still import the Supabase CDN");
requireText(maikeover, 'id="mo-public-check"',
  "visibility control is missing");
forbidText(
  maikeover.match(/id="mo-public-check"[^>]*>/)?.[0] || "",
  "checked",
  "public visibility defaults on"
);
forbidText(maikeover, "so it follows you everywhere",
  "local handle still claims cross-device persistence");
forbidText(maikeover, "grab it. We'll confirm",
  "failed availability check still becomes optimistic success");
requireText(helper, "This device remembers @",
  "returning arrival does not distinguish device-local memory");
requireText(closet, "Device-local view:",
  "Closet lacks an explicit device-local state");
for (const id of [
  "walletSlots",
  "dashboardSection",
  "covenSection",
  "tourSection",
  "collectionSection",
  "fairyBankSection",
  "leaderboardSection"
]) {
  requireText(closet, `id="${id}" hidden`,
    `unproved Closet surface remains visitor-visible: ${id}`);
}
requireText(closet,
  "canShare ? 'Share my public card' : 'Share unavailable",
  "device-local Closet does not keep public sharing visibly held");
forbidText(closet, "A LAiDY",
  "Closet still uses retired LAiDY as a resident fallback");
forbidText(closet, "There is no LAiDY registered",
  "Closet not-found state still uses retired LAiDY as a member name");
requireText(closet, "public_resident_cards",
  "public Card no longer uses the restricted public view");
requireText(closet, "window.LAIDIESPublicCardRoute",
  "public Card lacks one shared query parser");
requireText(closet, "var accountHandle = /^[a-z0-9_]{3,24}$/",
  "public Card route does not enforce the account-handle contract");
requireText(closet, "if (!publicRoute.valid)",
  "invalid public Card route is not rejected before lookup");
const notFoundBranch = closet.slice(
  closet.indexOf("function showNotFound()"),
  closet.indexOf("async function initSupabase()")
);
requireText(notFoundBranch, "main.replaceChildren(wrapper)",
  "public Card not-found state does not replace the unsafe surface through DOM APIs");
requireText(notFoundBranch, "message.textContent =",
  "public Card not-found message is not rendered as text");
forbidText(notFoundBranch, "innerHTML",
  "public Card not-found state still uses an HTML injection sink");
forbidText(notFoundBranch, "username",
  "public Card not-found state still reflects the raw query value");
const publicSelectMatch = closet.match(
  /\.from\('public_resident_cards'\)\s*\.select\('([^']+)'\)/
);
if (!publicSelectMatch ||
    JSON.stringify(publicSelectMatch[1].split(",")) !==
      JSON.stringify(publicCardContract.fields)) {
  failures.push("public Card select differs from Identity/Privacy field contract");
}
for (const prohibited of publicCardContract.prohibited) {
  if (publicCardContract.fields.includes(prohibited)) {
    failures.push(`public Card contract includes prohibited field: ${prohibited}`);
  }
}
requireText(closet, "if (!CONTROLLED_PREFLIGHT) return null;",
  "Closet account dependency does not fail closed");
requireText(closet, "laidies_resident_card_v1",
  "Closet does not hydrate the authoritative local-card envelope");
requireText(closet, "member_card_is_public === true",
  "Closet Share is not gated on authoritative public visibility");
forbidText(closet,
  "localStorage.getItem('laidies_card_username')",
  "Closet Share still falls back to a device-local handle");
forbidText(closet, "cdn.jsdelivr.net/npm/@supabase/supabase-js",
  "Closet mock-capable source can still import the Supabase CDN");
const publicBranch = closet.slice(
  closet.indexOf("// ---- Public mode:"),
  closet.indexOf("// ---- Personal mode")
);
forbidText(publicBranch, "loadCollections(",
  "public Card still loads owner-oriented collections");
const emailInputs = resident.match(/type=["']email["']/g) || [];
if (emailInputs.length !== 1) {
  failures.push(`Resident Card must expose exactly one email intake; found ${emailInputs.length}`);
}
requireText(resident, 'id="rcAccountEmail"',
  "Resident Card lacks the canonical single email input");
requireText(resident, 'id="rcAccountForm"',
  "Resident Card lacks the canonical account form");
forbidText(resident, "memberPassEmail",
  "Resident Card revived the retired duplicate member email input");
forbidText(resident, "saveMemberPassButton",
  "Resident Card revived the retired duplicate member email action");

const analyticsCalls = [...maikeover.matchAll(/plausible\(([\s\S]{0,220}?)\)/g)]
  .map((match) => match[1])
  .join("\n");
for (const sensitive of ["email", "handle", "display_name", "avatar", "profile"]) {
  if (analyticsCalls.toLowerCase().includes(sensitive)) {
    failures.push(`analytics call includes sensitive property/name: ${sensitive}`);
  }
}

if (failures.length) {
  console.error("MAiKEOVER CONTRACT FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MAiKEOVER CONTRACT PASS");
console.log("scope=local-save,state-label,account-hold,privacy,restricted-public-view");
