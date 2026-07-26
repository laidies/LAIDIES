#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.FUN_PACK_ROOT || process.cwd());
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const page = read("games/fun-pack.html");
const registry = JSON.parse(read("games/data/fun-pack-registry.json"));
const authority = JSON.parse(read("games/data/fun-pack-admissions.json"));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const exactKeys = (value, expected) =>
  value && Object.getPrototypeOf(value) === Object.prototype &&
  Object.keys(value).sort().join("|") === [...expected].sort().join("|");
const nonEmpty = (value, maximum) =>
  typeof value === "string" && value === value.trim() && value.length > 0 &&
  value.length <= maximum && !/[\u0000-\u001f\u007f]/.test(value);
const isoDay = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parts = value.split("-").map(Number);
  const stamp = Date.UTC(parts[0], parts[1] - 1, parts[2]);
  const date = new Date(stamp);
  return date.getUTCFullYear() === parts[0] &&
    date.getUTCMonth() === parts[1] - 1 &&
    date.getUTCDate() === parts[2] ? stamp : null;
};
const cleanRawPath = (value) =>
  typeof value === "string" && value.startsWith("/") && !value.startsWith("//") &&
  !/%|\\|[\u0000-\u001f\u007f]|#/.test(value) &&
  !value.split("?")[0].split("/").some((part) => part === "." || part === "..");
const canonicalJson = (value) => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return `{${Object.keys(value).sort().map((key) =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`
    ).join(",")}}`;
  }
  return JSON.stringify(value);
};

const pinnedKeyId = "fun-pack-owner-admission-2026-01";
const pinnedPublicKey = "MCowBQYDK2VwAyEAmpoHdnlDHAJujAQJcGcReKXMMnjlAa6l9OC6lP6+bJg=";
const pinnedChildren = {
  "mme-claio": { owner: "mme-claio-champion", route: "/games/madame-claio.html" },
  "fairy-godmother": { owner: "fairy-godmother-champion", route: "/games/fairy-godmother.html" },
  "dream-phone": { owner: "dream-phone-champion", route: "/games/dream-phone.html" },
  "girl-talk": { owner: "girl-talk-subchampion", route: "/games/girl-talk.html" }
};

check(exactKeys(registry, ["schemaVersion", "checkedAt", "currentEpisode", "policy", "episodes", "children"]),
  "registry top level must reject missing/extra fields");
check(registry.schemaVersion === 2, "registry schema must be version 2");
check(isoDay(registry.checkedAt) !== null, "registry checkedAt must be a real ISO day");
check(exactKeys(registry.policy, [
  "candidateDescriptionsAreNotAuthority", "failClosedOnMissingOrMalformedData",
  "requiresSignedAdmissionReceipt", "selectionIsNotCompletionOrReward"
]), "registry policy must be exact");
check(registry.policy?.candidateDescriptionsAreNotAuthority === true,
  "candidate descriptions must not be authority");
check(registry.policy?.failClosedOnMissingOrMalformedData === true, "registry must fail closed");
check(registry.policy?.requiresSignedAdmissionReceipt === true, "signed admission receipt must be required");
check(registry.policy?.selectionIsNotCompletionOrReward === true, "selection must not count as completion/reward");

check(Array.isArray(registry.episodes) && registry.episodes.length === 4,
  `expected four published episode contexts, found ${registry.episodes?.length}`);
const episodeIds = new Set();
for (const episode of registry.episodes || []) {
  check(exactKeys(episode, [
    "id", "number", "releaseStatus", "title", "description", "episodeRoute", "bagReturnRoute"
  ]), `${episode?.id || "episode"} schema must be exact`);
  check(Number.isInteger(episode.number) &&
    episode.id === `issue${String(episode.number).padStart(2, "0")}` &&
    !episodeIds.has(episode.id), `${episode?.id || "episode"} identity must be unique and exact`);
  check(["PUBLISHED_CURRENT", "PUBLISHED_ARCHIVE"].includes(episode.releaseStatus),
    `${episode.id} release status must be published current/archive`);
  check(nonEmpty(episode.title, 120) && nonEmpty(episode.description, 300),
    `${episode.id} title/description must be bounded text`);
  check(cleanRawPath(episode.episodeRoute) &&
    episode.episodeRoute === `/issues/issue-${String(episode.number).padStart(2, "0")}.html`,
    `${episode.id} episode route must be canonical`);
  check(cleanRawPath(episode.bagReturnRoute) &&
    episode.bagReturnRoute === `/this-week.html?issue=${episode.number}&bag=open&group=fun`,
    `${episode.id} Bag route must be canonical`);
  episodeIds.add(episode.id);
}
check(registry.episodes.filter((item) => item.releaseStatus === "PUBLISHED_CURRENT").length === 1,
  "exactly one episode must be current");
check(registry.currentEpisode === "issue04" &&
  registry.episodes.find((item) => item.id === registry.currentEpisode)?.releaseStatus === "PUBLISHED_CURRENT",
  "Episode 04 must be the current context");

const childIds = new Set();
for (const child of registry.children || []) {
  const pinned = pinnedChildren[child?.id];
  check(exactKeys(child, ["id", "name", "owner", "job", "reason"]),
    `${child?.id || "child"} candidate schema must be exact`);
  check(Boolean(pinned) && !childIds.has(child.id) && child.owner === pinned.owner,
    `${child?.id || "child"} candidate identity/owner must be pinned`);
  check(nonEmpty(child.name, 80) && nonEmpty(child.job, 300) && nonEmpty(child.reason, 300),
    `${child?.id || "child"} candidate text must be bounded`);
  if (child?.id) childIds.add(child.id);
}
check(childIds.size === 4, "registry must inventory the exact four candidate children");

check(exactKeys(authority, [
  "schemaVersion", "authority", "algorithm", "keyId", "publicKeySpkiBase64", "receipts"
]), "admission authority top level must be exact");
check(authority.schemaVersion === 1 &&
  authority.authority === "fun-pack-independent-child-admission" &&
  authority.algorithm === "Ed25519" &&
  authority.keyId === pinnedKeyId &&
  authority.publicKeySpkiBase64 === pinnedPublicKey &&
  Array.isArray(authority.receipts), "admission authority identity/key must be pinned");
let publicKey = null;
try {
  publicKey = crypto.createPublicKey({
    key: Buffer.from(pinnedPublicKey, "base64"),
    format: "der",
    type: "spki"
  });
} catch {
  failures.push("pinned Ed25519 public key must import");
}

const todayDate = new Date();
const today = Date.UTC(todayDate.getUTCFullYear(), todayDate.getUTCMonth(), todayDate.getUTCDate());
const receiptIds = new Set();
const relationships = new Set();
for (const receipt of authority.receipts || []) {
  check(exactKeys(receipt, [
    "schemaVersion", "receiptId", "keyId", "issuedBy", "ownerDisposition",
    "childId", "childRoute", "episodeId", "episodeNumber", "episodeRelationship",
    "returnContract", "activity", "issuedOn", "recheckOn", "signature"
  ]), "receipt schema must be exact");
  const pinned = pinnedChildren[receipt.childId];
  const episode = registry.episodes.find((item) => item.id === receipt.episodeId);
  const returnRoute = episode ? `/games/fun-pack.html?issue=${episode.number}` : "";
  const relationship = `${receipt.childId}|${receipt.episodeId}`;
  check(receipt.schemaVersion === 1 && receipt.keyId === pinnedKeyId &&
    nonEmpty(receipt.receiptId, 100) && !receiptIds.has(receipt.receiptId) &&
    !relationships.has(relationship) && pinned && episode &&
    receipt.issuedBy === pinned.owner && receipt.ownerDisposition === "ADMITTED" &&
    receipt.childRoute === pinned.route && receipt.episodeNumber === episode.number &&
    receipt.episodeRelationship === `VERIFIED ${episode.id}`,
  `receipt ${receipt.receiptId || "(missing)"} identity/binding must be exact`);
  check(exactKeys(receipt.returnContract, ["status", "source", "exactReturnRoute"]) &&
    receipt.returnContract.status === "VERIFIED" &&
    receipt.returnContract.source === "fun-pack" &&
    receipt.returnContract.exactReturnRoute === returnRoute,
  `receipt ${receipt.receiptId || "(missing)"} return must be exact`);
  check(exactKeys(receipt.activity, [
    "title", "description", "episodeJob", "time", "cta", "image", "imageAlt", "route"
  ]), `receipt ${receipt.receiptId || "(missing)"} activity schema must be exact`);
  check(nonEmpty(receipt.activity?.title, 100) && nonEmpty(receipt.activity?.description, 300) &&
    nonEmpty(receipt.activity?.episodeJob, 200) && nonEmpty(receipt.activity?.time, 30) &&
    nonEmpty(receipt.activity?.cta, 80) && nonEmpty(receipt.activity?.imageAlt, 180),
  `receipt ${receipt.receiptId || "(missing)"} activity text must be bounded`);
  check(cleanRawPath(receipt.activity?.image) &&
    /^\/assets\/[A-Za-z0-9_./-]+\.(?:gif|jpe?g|png|svg|webp)$/.test(receipt.activity?.image || "") &&
    !receipt.activity.image.includes("?"),
  `receipt ${receipt.receiptId || "(missing)"} image must be canonical`);
  check(typeof receipt.activity?.route === "string" &&
    receipt.activity.route === `${pinned?.route}?from=fun-pack&issue=${episode?.number}` +
      `&return=${encodeURIComponent(returnRoute)}`,
  `receipt ${receipt.receiptId || "(missing)"} activity route must be canonical`);
  const issued = isoDay(receipt.issuedOn);
  const recheck = isoDay(receipt.recheckOn);
  check(issued !== null && recheck !== null && issued <= today && recheck >= today && issued <= recheck,
    `receipt ${receipt.receiptId || "(missing)"} dates must be current and ordered`);
  const payload = Object.fromEntries(Object.entries(receipt).filter(([key]) => key !== "signature"));
  let verified = false;
  try {
    verified = Boolean(publicKey) && crypto.verify(
      null,
      Buffer.from(canonicalJson(payload)),
      publicKey,
      Buffer.from(receipt.signature, "base64")
    );
  } catch {}
  check(verified, `receipt ${receipt.receiptId || "(missing)"} signature must verify`);
  receiptIds.add(receipt.receiptId);
  relationships.add(relationship);
}
check(authority.receipts.length === 0, "production admission receipts must remain empty");

check(page.includes("fun-pack-registry.json") && page.includes("fun-pack-admissions.json"),
  "page must fetch candidate and independent authority data");
check(page.includes("crypto.subtle.verify") && page.includes("Ed25519"),
  "runtime must verify pinned Ed25519 receipts");
check(page.includes("candidateDescriptionsAreNotAuthority"),
  "runtime must deny shelf-owned candidate authority");
check(page.includes("Nothing opens when the registry or admission authority cannot be verified"),
  "page must expose an honest combined failure state");
check(page.includes("dataset.funPackRetry") && page.includes("restoreRetryFocus"),
  "Retry must restore focus after replacement");
check(!/>Available now</.test(page), "held children must not be labelled available");
check(!/href="(?:madame-claio|fairy-godmother|dream-phone|girl-talk)\.html"/.test(page),
  "held child routes must not exist as static activity links");

if (failures.length) {
  console.error(`FUN PACK CONTRACT FAIL (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `FUN PACK CONTRACT PASS · episodes=${registry.episodes.length} · candidates=${registry.children.length}` +
  ` · signed_admissions=${authority.receipts.length} · independent-authority`
);
