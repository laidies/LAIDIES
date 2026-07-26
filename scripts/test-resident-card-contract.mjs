#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.RESIDENT_CARD_ROOT || process.cwd());
const page = fs.readFileSync(path.join(root, "resident-card.html"), "utf8");
const runtime = fs.readFileSync(
  path.join(root, "content", "site", "resident-card-v2.js"),
  "utf8"
);
const contract = fs.readFileSync(
  path.join(root, "content", "site", "resident-card-contract-v1.js"),
  "utf8"
);
const maikeover = fs.readFileSync(path.join(root, "maikeover.html"), "utf8");
const closet = fs.readFileSync(path.join(root, "laidies-card.html"), "utf8");
const house = fs.readFileSync(
  path.join(root, "content", "site", "sorority-house-v2.js"),
  "utf8"
);

const checks = [];
function check(value, label) {
  checks.push({ ok: Boolean(value), label });
}

check(page.includes('src="/content/site/resident-card-contract-v1.js'), "route loads the shared Card contract");
check(page.indexOf("resident-card-contract-v1.js") < page.indexOf("resident-card-v2.js"), "shared contract loads before status runtime");
check(!/type=["']email["']|memberPassEmail|saveMemberPassButton/.test(page), "held route ships no email intake");
check(!/supabase-config|member_profiles|magic link/i.test(page), "held route ships no account backend or magic-link machinery");
check(!/card (?:can|will) save quiz scores|card (?:can|will) save stickers|card (?:can|will) sign posts|card (?:can|will) unlock rooms/i.test(page), "route does not grant progression or community authority");
check(page.includes("separate device-local progress"), "separate activity persistence is explicit");
check(page.includes("not reserved") && page.includes("cross-device sync remain unavailable"), "identity and cross-device limits are explicit");
check(page.includes('role="status"') && page.includes('aria-live="polite"') && page.includes('aria-atomic="true"'), "status has accessible live semantics");
check(runtime.includes("contract.read(window.localStorage)"), "status reads only through the shared projection");
check(runtime.includes("textContent = value"), "runtime renders local values with textContent");
check(!/innerHTML|document\.write|eval\(/.test(runtime), "runtime has no HTML injection or dynamic evaluation sink");
check(!/removeItem|clear\(|setItem/.test(runtime), "status runtime never mutates or deletes local identity state");
check(contract.includes('var CARD_KEY = "laidies_resident_card_v1"'), "shared contract owns the authoritative key");
check(contract.includes("hasExactKeys") && contract.includes("FIELD_NAMES.indexOf(key) === -1"), "shared contract rejects extra top-level and field keys");
check(contract.includes("isPlainObject") && contract.includes("Object.getPrototypeOf"), "shared contract requires plain objects");
check(contract.includes("\\u202a-\\u202e") && contract.includes("\\u2066-\\u2069"), "shared contract rejects bidi controls");
check(contract.includes("decodeURIComponent(value) !== value"), "asset path must be canonically decoded");
check(contract.includes('return /^\\/assets\\/') && !contract.includes("data:image"), "stored avatars are packaged asset paths only");
check(contract.includes('document.createElement("img")') && contract.includes("replaceChildren(image)"), "shared avatar renderer uses DOM APIs");
check(maikeover.includes("One versioned envelope is the only authoritative local card write."), "MAiKEOVER keeps an atomic authoritative local write");
check(maikeover.includes("LAIDIESResidentCard.buildEnvelope"), "MAiKEOVER writes only shared-contract envelopes");
check(maikeover.includes('src="/content/site/resident-card-contract-v1.js'), "MAiKEOVER loads the shared contract");
check(maikeover.includes("It is not reserved, public or available on another device."), "MAiKEOVER preserves local-handle truth");
check(closet.includes("It does not prove account restoration or cross-device sync."), "Closet preserves device-local persistence truth");
check(closet.includes('src="/content/site/resident-card-contract-v1.js'), "Closet loads the shared contract");
check(closet.includes("contract.read(localStorage)"), "Closet reads only through the shared projection");
check(closet.includes("contract.replaceWithSafeImage"), "Closet delegates avatar rendering to the shared safe DOM helper");
check(!/el\\.innerHTML\\s*=\\s*'<img src=\"'\\s*\\+\\s*profile\\.card_avatar_url/.test(closet), "Closet no longer interpolates stored avatar URLs into HTML");
check(closet.includes("CONTROLLED_PREFLIGHT") && closet.includes("/^(localhost|127\\.0\\.0\\.1)$/"), "Closet account backend remains localhost-controlled preflight only");
check(house.includes("It is not a Hyvor sign-in or cross-device community identity."), "Sorority House denies local-card identity escalation");
check(house.includes("Every room is still open to explore."), "local card cannot unlock community rooms");

const failures = checks.filter((item) => !item.ok);
for (const item of checks) {
  console.log(`${item.ok ? "PASS" : "FAIL"} ${item.label}`);
}
console.log(`Resident Card contract: ${checks.length - failures.length}/${checks.length} passed`);
process.exit(failures.length ? 1 : 0);
