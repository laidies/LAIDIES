#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const maikeover = read("maikeover.html");
const closet = read("laidies-card.html");
const resident = read("resident-card.html");
const helper = read("content/site/maikeover-v2.js");
const authority = read("operations/product-stewards/resident-card/CURRENT-IDENTITY-CONTINUATION-AUTHORITY-2026-08-02.md");
const accountPage = read("content/site/resident-account-page-v1.js");
const accountRuntime = read("content/site/resident-account-runtime-v1.js");
const closetBridge = read("content/site/closet-account-bridge-v1.js");
const portraitRuntime = read("content/site/maikeover-portraits-v1.js");
const avatarWorker = read("worker-avatar/avatar.js");
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

requireText(authority, "DEPLOYED / PUBLICLY VERIFIED CORE",
  "current identity and continuation authority is missing");
requireText(maikeover, 'data-state="held"',
  "MAiKEOVER lacks fail-closed public-handle state");
requireText(maikeover, 'href="/resident-card.html#rcAccountTitle"',
  "MAiKEOVER does not hand the Card to the account owner");
requireText(maikeover, 'id="moMake"',
  "MAiKEOVER lacks the portrait creation action");
requireText(maikeover, 'id="moCands"',
  "MAiKEOVER lacks the three-portrait chooser");
requireText(maikeover, 'name="moPortraitMode"',
  "MAiKEOVER lacks description/photo portrait modes");
requireText(maikeover, "maikeover-portraits-v1.js",
  "MAiKEOVER does not load the portrait runtime");
forbidText(maikeover, "portrait booth is temporarily closed",
  "MAiKEOVER still tells residents the working portrait maker is closed");
requireText(maikeover, "isSafeAvatarSource(state.avatar)",
  "MAiKEOVER cannot save a selected bounded portrait");
requireText(portraitRuntime, "laidies:portrait-selected",
  "portrait runtime does not hand the chosen image to the live Card");
requireText(maikeover, "two sets of three",
  "MAiKEOVER does not explain the account quota");
requireText(portraitRuntime, 'canvas.toDataURL("image/jpeg"',
  "portrait runtime does not bound and re-encode saved image bytes");
requireText(avatarWorker, "PORTRAIT_USAGE",
  "portrait Worker lacks durable quota enforcement");
requireText(avatarWorker, "const uid = await user(request,env)",
  "portrait Worker lacks account authentication");
requireText(maikeover, "laidies_resident_card_v1",
  "local save lacks one versioned authoritative envelope");
requireText(maikeover, "localStorage.getItem(CARD_STORAGE_KEY) !== serialized",
  "local envelope save does not verify its write");
requireText(maikeover, "carry: $('moCarrySel').value",
  "local save omits the carrying choice");
requireText(maikeover, "if (stored) $('moSeeCloset').style.display='inline';",
  "a restored local Card does not keep its Closet handoff visible");
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
requireText(helper, "Your account keeps your Card with you.",
  "arrival lacks account-first explanation");
requireText(closet, "Device-local view:",
  "Closet lacks an explicit device-local state");
requireText(closet, "public_resident_cards",
  "public Card no longer uses the restricted public view");
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
requireText(closet, "closet-account-bridge-v1.js",
  "Closet does not load the account-backed Card bridge");
requireText(closetBridge, "runtime.writeLocalEnvelope(remoteDocument)",
  "Closet does not restore a verified account-backed Card locally");
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
requireText(resident, 'id="rcAccountEmail" type="email"',
  "Resident Card does not own the private email sign-in intake");
requireText(resident, "resident-account-page-v1.js",
  "Resident Card does not load the account controller");
requireText(resident, "No password.",
  "Resident Card does not explain the private magic-link boundary");
forbidText(accountPage, ".from(",
  "Resident Card account UI writes account tables directly");
requireText(accountRuntime, 'flowType: "pkce"',
  "Resident Card account runtime lacks the PKCE boundary");

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
console.log("scope=portrait-create,portrait-select,local-save,account-update,closet-restore,privacy,quota");
