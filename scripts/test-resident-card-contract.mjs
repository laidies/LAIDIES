#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

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
const accountPage = fs.readFileSync(
  path.join(root, "content", "site", "resident-account-page-v1.js"),
  "utf8"
);
const accountRuntime = fs.readFileSync(
  path.join(root, "content", "site", "resident-account-runtime-v1.js"),
  "utf8"
);
const identityClient = fs.readFileSync(
  path.join(root, "content", "site", "identity-client-v1.js"),
  "utf8"
);
const maikeoverHelper = fs.readFileSync(
  path.join(root, "content", "site", "maikeover-v2.js"),
  "utf8"
);
const closetBridge = fs.readFileSync(
  path.join(root, "content", "site", "closet-account-bridge-v1.js"),
  "utf8"
);
const globalHeader = fs.readFileSync(
  path.join(root, "content", "site", "sv-global-header.js"),
  "utf8"
);
const newsstand = fs.readFileSync(path.join(root, "newsstand.html"), "utf8");

const checks = [];
function check(value, label) {
  checks.push({ ok: Boolean(value), label });
}

check(page.includes('src="/content/site/resident-card-contract-v1.js'), "route loads the shared Card contract");
check(page.indexOf("resident-card-contract-v1.js") < page.indexOf("resident-card-v2.js"), "shared contract loads before status runtime");
check((page.match(/type=["']email["']/g) || []).length === 1, "Resident Card exposes exactly one email intake");
check(page.includes('id="rcAccountEmail"') && page.includes('id="rcAccountForm"'), "single email intake uses the canonical account desk");
check(!/memberPassEmail|saveMemberPassButton/.test(page), "retired duplicate member email intake remains absent");
check(page.includes("resident-account-runtime-v1.js") && page.includes("resident-account-page-v1.js"), "single account desk loads the canonical private-account runtime");
check((identityClient.match(/signInWithOtp\s*\(/g) || []).length === 1, "identity client owns one magic-link request path");
check(accountPage.includes('byId("rcAccountEmail")') && accountPage.includes("requestMagicLink("), "account page wires the one email field to the identity client");
check(page.includes("Request a sign-in link") && page.includes("does not yet make this Card portable"), "request-only account boundary is explicit");
check(!/rcAccountClaimButton|rcAccountRestoreButton|rcAccountContinue/.test(page), "held claim, restore and continuation controls are absent");
check(!/claimLocalCard|restoreRemoteCard|writeLocalEnvelope|ResidentContinuationV1/.test(accountPage), "public account page cannot claim, restore or sync continuation");
check(!/runtime\.getState\(\)/.test(accountPage + closetBridge), "request and Closet surfaces do not fetch held remote Resident state");
check(accountRuntime.includes("client.auth.exchangeCodeForSession(code)") && !accountRuntime.includes("controller.exchangeCode(code)"), "sign-in callback establishes a session without fetching held Resident state");
check(accountPage.includes("Sign-in-link request accepted. Delivery has not been verified"), "provider acceptance does not claim message delivery");
check(!/localStorage\.(?:setItem|getItem)\([^\n]*email/i.test(accountPage + identityClient), "email is not copied into local storage");
check(!/card (?:can|will) save quiz scores|card (?:can|will) save stickers|card (?:can|will) sign posts|card (?:can|will) unlock rooms/i.test(page), "route does not grant progression or community authority");
check(page.includes("A local handle is a draft label only") && page.includes("cannot sign posts, unlock rooms, publish a Card or authorize account data"), "local handle limits are explicit");
check(page.includes("Account-backed Cards, public Cards, reward ownership and cross-device continuation remain separate held features"), "account and public-feature holds are explicit");
check(!page.includes("resident-continuation-v1.js"), "Resident Card does not load held continuation runtime");
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
check(maikeover.includes("Saved only in this browser. It is not reserved, public or portable."), "MAiKEOVER preserves local-handle truth");
check(maikeoverHelper.includes("contract.readHandle(window.localStorage)"), "MAiKEOVER validates its stored arrival handle through the shared contract");
check(maikeoverHelper.includes("persistence.replaceChildren(label, detail)"), "MAiKEOVER renders its stored arrival handle through text-only DOM APIs");
check(!maikeoverHelper.includes("persistence.innerHTML"), "MAiKEOVER stored handle cannot enter an HTML sink");
check(closet.includes("Device-local view: this Closet shows only the Card and supported information saved in this browser"), "Closet preserves device-local persistence truth");
check(!/writeLocalEnvelope|window\.location\.reload|restored the verified private Card/.test(closetBridge), "Closet bridge cannot auto-restore an unverified account-backed Card");
check(!/mountContinuation|resident-continuation-bootstrap-v1/.test(globalHeader), "shared header cannot auto-mount held account continuation");
check(!/resident-continuation-bootstrap-v1/.test(newsstand), "NewsStand cannot auto-mount held account continuation");
check(closet.includes('src="/content/site/resident-card-contract-v1.js'), "Closet loads the shared contract");
check(closet.includes("contract.read(localStorage)"), "Closet reads only through the shared projection");
check(closet.includes("contract.replaceWithSafeImage"), "Closet delegates avatar rendering to the shared safe DOM helper");
check(!/el\\.innerHTML\\s*=\\s*'<img src=\"'\\s*\\+\\s*profile\\.card_avatar_url/.test(closet), "Closet no longer interpolates stored avatar URLs into HTML");
check(closet.includes("CONTROLLED_PREFLIGHT") && closet.includes("/^(localhost|127\\.0\\.0\\.1)$/"), "Closet account backend remains localhost-controlled preflight only");
const routeStart = closet.indexOf("window.LAIDIESPublicCardRoute =");
const routeEnd = closet.indexOf("</script>", routeStart);
const routeSource = routeStart >= 0 && routeEnd > routeStart
  ? closet.slice(routeStart, routeEnd)
  : "";
const routeContext = { URLSearchParams, Object, window: {} };
if (routeSource) vm.runInNewContext(routeSource, routeContext);
const parsePublicRoute = routeContext.window &&
  routeContext.window.LAIDIESPublicCardRoute &&
  routeContext.window.LAIDIESPublicCardRoute.parse;
check(typeof parsePublicRoute === "function", "Closet exposes one shared public-route parser");
if (typeof parsePublicRoute === "function") {
  const validAccount = parsePublicRoute("?u=public_alice");
  const validLegacy = parsePublicRoute("?member=public_alice");
  const validTownCharacter = parsePublicRoute("?u=mayor-deb");
  const hostile = parsePublicRoute("?u=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E");
  const ambiguous = parsePublicRoute("?u=&member=public_alice");
  const arbitraryHyphen = parsePublicRoute("?u=not-a-town-character");
  check(validAccount.requested && validAccount.valid && validAccount.handle === "public_alice", "current public account handle is accepted");
  check(validLegacy.requested && validLegacy.valid && validLegacy.handle === "public_alice", "legacy public account handle remains accepted");
  check(validTownCharacter.requested && validTownCharacter.valid && validTownCharacter.handle === "mayor-deb", "canonical town-character handle remains accepted");
  check(hostile.requested && !hostile.valid && hostile.handle === "", "hostile public query is rejected without a renderable value");
  check(ambiguous.requested && !ambiguous.valid && ambiguous.handle === "", "invalid current query cannot fall back to a legacy handle");
  check(arbitraryHyphen.requested && !arbitraryHyphen.valid, "arbitrary hyphenated query cannot impersonate a town character");
}
const notFoundStart = closet.indexOf("function showNotFound()");
const notFoundEnd = closet.indexOf("async function initSupabase()", notFoundStart);
const notFoundSource = notFoundStart >= 0 && notFoundEnd > notFoundStart
  ? closet.slice(notFoundStart, notFoundEnd)
  : "";
check(notFoundSource.includes("main.replaceChildren(wrapper)") && notFoundSource.includes("message.textContent ="), "public not-found state uses text-only DOM rendering");
check(!/innerHTML|username/.test(notFoundSource), "public not-found state cannot reflect query HTML");
check(house.includes("It is not a Hyvor sign-in or cross-device community identity."), "Sorority House denies local-card identity escalation");
check(house.includes("Every room is still open to explore."), "local card cannot unlock community rooms");

const failures = checks.filter((item) => !item.ok);
for (const item of checks) {
  console.log(`${item.ok ? "PASS" : "FAIL"} ${item.label}`);
}
console.log(`Resident Card contract: ${checks.length - failures.length}/${checks.length} passed`);
process.exit(failures.length ? 1 : 0);
