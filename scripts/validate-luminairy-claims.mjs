#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.env.LUMINAIRY_ROOT || process.cwd());
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const html = read("luminairy.html");
const directory = read("content/site/sunnyvaile-directory.js");
const welcomeTour = read("content/site/sv-welcome-tour.js");
const gate = read("content/site/luminairy-claim-gate.js");
const css = read("content/luminairy-v2.css");
const registry = JSON.parse(read("content/luminairy-claims.json"));
const receipts = JSON.parse(read("content/luminairy-editorial-receipts.json"));
const errors = [];
const today = "2026-07-26";
const keyId = "luminairy-editorial-offline-r2-20260726";
const publicJwk = {
  kty: "EC",
  crv: "P-256",
  x: "aQwXrFw77FawK8rM5eAavmf21XtdjmkmNUWe3b457rI",
  y: "VNTv9rNlAfMw8Oc4fDz9ulkZopZUZj8t_027RHs4AwA"
};

function strictDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function normalizeText(value) {
  return String(value || "").normalize("NFKC").replace(/\s+/g, " ").trim();
}

function sha256(value) {
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function admissionPayload(record) {
  const evidence = record.evidence || {};
  return JSON.stringify({
    product: record.product,
    claimId: record.claimId,
    personId: record.personId,
    wing: record.wing,
    claimKind: record.claimKind,
    status: record.status,
    scope: normalizeText(record.scope),
    selector: record.selector,
    contentSelector: record.contentSelector,
    claimText: normalizeText(record.claimText),
    claimTextSha256: record.claimTextSha256,
    sourceUrl: evidence.sourceUrl,
    sourceType: evidence.sourceType,
    sourceTitle: normalizeText(evidence.sourceTitle),
    sourcePublisher: normalizeText(evidence.sourcePublisher),
    evidenceExcerpt: normalizeText(evidence.evidenceExcerpt),
    evidenceExcerptSha256: evidence.evidenceExcerptSha256,
    supportsClaimId: evidence.supportsClaimId,
    supportsClaimTextSha256: evidence.supportsClaimTextSha256,
    verifiedOn: record.verifiedOn,
    recheckOn: record.recheckOn,
    correctionOwner: record.correctionOwner
  });
}

function receiptPayload(receipt) {
  return JSON.stringify({
    schemaVersion: receipt.schemaVersion,
    receiptId: receipt.receiptId,
    keyId: receipt.keyId,
    product: receipt.product,
    claimId: receipt.claimId,
    personId: receipt.personId,
    wing: receipt.wing,
    claimKind: receipt.claimKind,
    status: receipt.status,
    scope: normalizeText(receipt.scope),
    selector: receipt.selector,
    contentSelector: receipt.contentSelector,
    claimTextSha256: receipt.claimTextSha256,
    sourceUrl: receipt.sourceUrl,
    sourceType: receipt.sourceType,
    sourceTitle: normalizeText(receipt.sourceTitle),
    sourcePublisher: normalizeText(receipt.sourcePublisher),
    evidenceExcerptSha256: receipt.evidenceExcerptSha256,
    supportsClaimId: receipt.supportsClaimId,
    supportsClaimTextSha256: receipt.supportsClaimTextSha256,
    verifiedOn: receipt.verifiedOn,
    recheckOn: receipt.recheckOn,
    correctionOwner: receipt.correctionOwner,
    admissionBindingSha256: receipt.admissionBindingSha256,
    supportDecision: receipt.supportDecision,
    reviewerRole: receipt.reviewerRole,
    reviewedOn: receipt.reviewedOn
  });
}

function receiptMatchesRecord(receipt, record) {
  const evidence = record.evidence || {};
  return (
    receipt.product === record.product &&
    receipt.claimId === record.claimId &&
    receipt.personId === record.personId &&
    receipt.wing === record.wing &&
    receipt.claimKind === record.claimKind &&
    receipt.status === record.status &&
    normalizeText(receipt.scope) === normalizeText(record.scope) &&
    receipt.selector === record.selector &&
    receipt.contentSelector === record.contentSelector &&
    receipt.claimTextSha256 === record.claimTextSha256 &&
    receipt.sourceUrl === evidence.sourceUrl &&
    receipt.sourceType === evidence.sourceType &&
    normalizeText(receipt.sourceTitle) === normalizeText(evidence.sourceTitle) &&
    normalizeText(receipt.sourcePublisher) ===
      normalizeText(evidence.sourcePublisher) &&
    receipt.evidenceExcerptSha256 === evidence.evidenceExcerptSha256 &&
    receipt.supportsClaimId === evidence.supportsClaimId &&
    receipt.supportsClaimTextSha256 === evidence.supportsClaimTextSha256 &&
    receipt.verifiedOn === record.verifiedOn &&
    receipt.recheckOn === record.recheckOn &&
    receipt.correctionOwner === record.correctionOwner &&
    receipt.admissionBindingSha256 === record.admissionBindingSha256
  );
}

function signatureValid(receipt) {
  try {
    return crypto.verify(
      "sha256",
      Buffer.from(receiptPayload(receipt)),
      {
        key: crypto.createPublicKey({ key: publicJwk, format: "jwk" }),
        dsaEncoding: "ieee-p1363"
      },
      Buffer.from(receipt.signature, "base64")
    );
  } catch {
    return false;
  }
}

function admittedRecordValid(record, receipt) {
  const evidence = record.evidence || {};
  return (
    record.product === "luminairy" &&
    Boolean(record.personId) &&
    ["saints", "mavens", "trailblazers"].includes(record.wing) &&
    Boolean(record.claimKind) &&
    record.status === "admitted" &&
    Boolean(normalizeText(record.scope)) &&
    Boolean(record.contentSelector) &&
    Boolean(normalizeText(record.claimText)) &&
    sha256(normalizeText(record.claimText)) === record.claimTextSha256 &&
    strictDate(record.verifiedOn) &&
    record.verifiedOn <= today &&
    strictDate(record.recheckOn) &&
    record.recheckOn >= today &&
    /^https:\/\//.test(evidence.sourceUrl || "") &&
    ["official", "primary", "institutional", "peer-reviewed"].includes(
      evidence.sourceType
    ) &&
    sha256(normalizeText(evidence.evidenceExcerpt)) ===
      evidence.evidenceExcerptSha256 &&
    evidence.supportsClaimId === record.claimId &&
    evidence.supportsClaimTextSha256 === record.claimTextSha256 &&
    sha256(admissionPayload(record)) === record.admissionBindingSha256 &&
    receiptMatchesRecord(receipt, record) &&
    signatureValid(receipt)
  );
}

if (registry.schemaVersion !== 3) errors.push("schemaVersion must be 3");
if (registry.product !== "luminairy") errors.push("registry product mismatch");
if (registry.admissionPolicy !== "fail-closed") {
  errors.push("admissionPolicy must be fail-closed");
}
if (
  registry.claimBinding !==
    "exact-identity-context-selector-text-source-evidence-envelope-plus-offline-signed-receipt"
) {
  errors.push("signed exact admission policy is missing");
}
if (
  registry.receiptManifest !== "/content/luminairy-editorial-receipts.json"
) {
  errors.push("separate receipt manifest is not bound");
}
if (!strictDate(registry.generatedOn) || registry.generatedOn > today) {
  errors.push("generatedOn must be a valid non-future strict date");
}
if (!registry.correctionRoute || !html.includes(registry.correctionRoute)) {
  errors.push("visible correction route does not match registry");
}
if (
  receipts.schemaVersion !== 1 ||
  receipts.product !== "luminairy" ||
  receipts.authorityModel !== "offline-p256-signed-editorial-receipts" ||
  !strictDate(receipts.generatedOn) ||
  !Array.isArray(receipts.receipts)
) {
  errors.push("production editorial receipt manifest is invalid");
}
if (receipts.receipts.length !== 0) {
  errors.push("production receipt manifest must remain empty");
}

const ids = new Set();
const people = new Set();
for (const record of registry.records || []) {
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.claimId || "") ||
    ids.has(record.claimId)
  ) {
    errors.push(`duplicate/unstable claimId: ${record.claimId || "(missing)"}`);
  }
  ids.add(record.claimId);
  if (record.personId) {
    if (people.has(record.personId)) {
      errors.push(`duplicate person record: ${record.personId}`);
    }
    people.add(record.personId);
  } else if (record.claimKind !== "context-block") {
    errors.push(`missing personId outside context: ${record.claimId}`);
  }
  if (record.status !== "held") {
    errors.push(`production legacy record must remain held: ${record.claimId}`);
  }
  const selectorBinding = record.selector ? record.selector.slice(1, -1) : "";
  if (
    !record.selector ||
    (!record.selector.includes("data-saint-id") &&
      !html.includes(selectorBinding))
  ) {
    errors.push(`selector not bound in HTML: ${record.claimId} -> ${record.selector}`);
  }
}

const publicIds = new Set();
for (const match of html.matchAll(
  /data-(?:maven|foundress|builder)-slug="([^"]+)"/g
)) {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(match[1])) publicIds.add(match[1]);
}
for (const match of html.matchAll(
  /<div class="stop stop--saint"[^>]*>[\s\S]*?<h3 class="stop-name">([^<]+)<\/h3>/g
)) {
  publicIds.add(
    match[1]
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
const registeredPeople = new Set(
  registry.records.map((record) => record.personId).filter(Boolean)
);
for (const personId of publicIds) {
  if (!registeredPeople.has(personId)) {
    errors.push(`public person block missing registry record: ${personId}`);
  }
}
for (const personId of registeredPeople) {
  if (!publicIds.has(personId)) errors.push(`orphan registry person: ${personId}`);
}

for (const required of [
  "/content/site/luminairy-claim-gate.js",
  "choices stay in this browser on this device",
  "no submission or reply is promised",
  "not completion, mastery or a reward",
  "id=\"lumStorageStatus\"",
  "<noscript>",
  "Profile research is held",
  "separately signed editorial receipt"
]) {
  if (!html.toLowerCase().includes(required.toLowerCase())) {
    errors.push(`missing public truth contract: ${required}`);
  }
}
for (const forbidden of [
  "women leading in AI",
  "pioneers who got here first",
  "real women leading in AI right now",
  "women shipping frontier Ai"
]) {
  if (html.toLowerCase().includes(forbidden.toLowerCase())) {
    errors.push(`unsupported public claim remains: ${forbidden}`);
  }
}
if (
  !directory.includes(
    "mechanics: ['14 SAiNT portraits', 'MAiVEN profiles held', 'TRAiLBLAZER profiles held']"
  )
) {
  errors.push("shared LUMINAiRY directory entry is not held");
}
if (
  /real women leading AI|each with a .*song to play/i.test(welcomeTour) ||
  !welcomeTour.includes(
    "Profile research and audio stay visibly held until each exact claim, source and rights record clears review."
  )
) {
  errors.push("Welcome Tour LUMINAiRY promise is not reconciled");
}

const contextOpenTags = [
  ...html.matchAll(/<[^>]+data-lum-claim-block="[^"]+"[^>]*>/g)
].map((match) => match[0]);
if (
  contextOpenTags.length !== 3 ||
  contextOpenTags.some((tag) => !/\shidden(?:\s|>)/.test(tag))
) {
  errors.push("all three static context blocks must be natively hidden");
}
if (
  !css.includes("[data-lum-claim-block],") ||
  !css.includes('html:not([data-luminairy-claims="loaded"]) [data-lum-claim-block]')
) {
  errors.push("no-script/missing-gate context CSS is missing");
}
if (
  !html.includes('data-focus-state="closed"') ||
  !html.includes("mvModal.setAttribute('data-focus-state', 'opening')") ||
  !html.includes("document.activeElement === close ? 'ready' : 'failed'") ||
  !html.includes("mvModal.setAttribute('data-focus-state', 'closed')") ||
  /requestAnimationFrame\s*\(\s*function\s*\(\)\s*\{\s*close\.focus/.test(html)
) {
  errors.push("modal focus readiness is not deterministic and explicitly observable");
}
for (const requiredGate of [
  "trustedKeys",
  "receiptManifestUrl",
  "verifyReceiptSignature",
  "receiptMatchesRecord",
  "record.personId",
  "record.wing",
  "record.claimKind",
  "record.status",
  "record.scope",
  "cardIdentity(card)",
  "cardWing(card)",
  "Promise.all([fetchJson(registryUrl), fetchJson(receiptManifestUrl)])"
]) {
  if (!gate.includes(requiredGate)) {
    errors.push(`runtime signed admission control missing: ${requiredGate}`);
  }
}

const claimText =
  "Hannah Fry joined Cambridge as Professor of the Public Understanding of Mathematics.";
if (!html.includes(`<p class="stop-desc">${claimText}</p>`)) {
  errors.push("supported hypothetical atomic DOM node is missing");
}
const sourceUrl =
  "https://www.cam.ac.uk/research/news/hannah-fry-joins-cambridge-as-professor-of-the-public-understanding-of-mathematics";
const fixtureRecord = {
  ...registry.records.find((record) => record.personId === "hannah-fry"),
  product: "luminairy",
  claimKind: "historical-appointment",
  status: "admitted",
  scope: "past-tense-appointment-announcement-only",
  contentSelector: ".stop-desc",
  claimText,
  claimTextSha256: sha256(claimText),
  verifiedOn: "2026-07-25",
  recheckOn: "2027-07-25",
  evidence: {
    sourceUrl,
    sourceType: "official",
    sourceTitle:
      "Hannah Fry joins Cambridge as Professor of the Public Understanding of Mathematics",
    sourcePublisher: "University of Cambridge",
    evidenceExcerpt: claimText,
    evidenceExcerptSha256: sha256(claimText),
    supportsClaimId: "maven-hannah-fry-profile",
    supportsClaimTextSha256: sha256(claimText)
  }
};
fixtureRecord.admissionBindingSha256 = sha256(
  admissionPayload(fixtureRecord)
);
const fixtureReceipt = {
  schemaVersion: 1,
  receiptId: "synthetic-hannah-appointment-r2",
  keyId,
  product: fixtureRecord.product,
  claimId: fixtureRecord.claimId,
  personId: fixtureRecord.personId,
  wing: fixtureRecord.wing,
  claimKind: fixtureRecord.claimKind,
  status: fixtureRecord.status,
  scope: fixtureRecord.scope,
  selector: fixtureRecord.selector,
  contentSelector: fixtureRecord.contentSelector,
  claimTextSha256: fixtureRecord.claimTextSha256,
  sourceUrl: fixtureRecord.evidence.sourceUrl,
  sourceType: fixtureRecord.evidence.sourceType,
  sourceTitle: fixtureRecord.evidence.sourceTitle,
  sourcePublisher: fixtureRecord.evidence.sourcePublisher,
  evidenceExcerptSha256: fixtureRecord.evidence.evidenceExcerptSha256,
  supportsClaimId: fixtureRecord.evidence.supportsClaimId,
  supportsClaimTextSha256:
    fixtureRecord.evidence.supportsClaimTextSha256,
  verifiedOn: fixtureRecord.verifiedOn,
  recheckOn: fixtureRecord.recheckOn,
  correctionOwner: fixtureRecord.correctionOwner,
  admissionBindingSha256: fixtureRecord.admissionBindingSha256,
  supportDecision: "exact-atomic-claim-supported-for-test-only",
  reviewerRole: "synthetic-independent-accuracy-review-fixture",
  reviewedOn: "2026-07-26",
  signature:
    "bgUqXZSR6qTQBxbobVko75999wOKUcVwpPatb483jHhumBM11BAtGxjLzHOt6RXuj0xX2ircyOa/OgpoR/ustQ=="
};
if (!admittedRecordValid(fixtureRecord, fixtureReceipt)) {
  errors.push("trusted signed hypothetical admission does not validate");
}

const unrelatedRecord = structuredClone(fixtureRecord);
unrelatedRecord.evidence.sourceUrl = "https://example.invalid/unrelated";
unrelatedRecord.evidence.sourceTitle = "Garden soil";
unrelatedRecord.evidence.sourcePublisher = "Example Authority";
unrelatedRecord.evidence.evidenceExcerpt =
  "This source describes an unrelated fact about garden soil.";
unrelatedRecord.evidence.evidenceExcerptSha256 = sha256(
  unrelatedRecord.evidence.evidenceExcerpt
);
unrelatedRecord.admissionBindingSha256 = sha256(
  admissionPayload(unrelatedRecord)
);
const unrelatedReceipt = {
  ...fixtureReceipt,
  sourceUrl: unrelatedRecord.evidence.sourceUrl,
  sourceTitle: unrelatedRecord.evidence.sourceTitle,
  sourcePublisher: unrelatedRecord.evidence.sourcePublisher,
  evidenceExcerptSha256:
    unrelatedRecord.evidence.evidenceExcerptSha256,
  admissionBindingSha256: unrelatedRecord.admissionBindingSha256
};
if (admittedRecordValid(unrelatedRecord, unrelatedReceipt)) {
  errors.push("fully rehashed unrelated evidence self-authorized");
}

for (const field of ["personId", "wing", "claimKind", "status", "scope"]) {
  const hostileRecord = structuredClone(fixtureRecord);
  hostileRecord[field] =
    field === "personId"
      ? "ada-lovelace"
      : field === "wing"
        ? "trailblazers"
        : field === "claimKind"
          ? "quotation"
          : field === "status"
            ? "corrected"
            : "unrelated-scope";
  hostileRecord.admissionBindingSha256 = sha256(
    admissionPayload(hostileRecord)
  );
  const hostileReceipt = {
    ...fixtureReceipt,
    [field]: hostileRecord[field],
    admissionBindingSha256: hostileRecord.admissionBindingSha256
  };
  if (admittedRecordValid(hostileRecord, hostileReceipt)) {
    errors.push(`identity/context mutation self-authorized: ${field}`);
  }
}

if (errors.length) {
  console.error(`LUMINAiRY claim registry FAIL (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `LUMINAiRY claim registry PASS (${registry.records.length} held records; ` +
    `${publicIds.size} people; offline-signed exact authority; no-script/public-promise guards)`
);
