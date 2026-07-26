#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.env.MALL_ROOT || process.cwd());
const contractRoot = path.resolve(process.env.MALL_CONTRACT_ROOT || process.cwd());
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const readContract = (file) => fs.readFileSync(path.join(contractRoot, file), "utf8");
const exists = (route) => fs.existsSync(path.join(
  root,
  route === "/" ? "index.html" : route.replace(/^\//, "")
));
const register = JSON.parse(readContract(
  "operations/product-stewards/mall/route-readiness-register.json"
));
const mall = read("mall.html");
const mallRuntime = read("content/site/mall-v2.js");
const gift = read("shop.html");
const giftRuntime = read("content/site/shop-v2.js");
const unit11 = read("community/burn-book.html");
const failures = [];
const requireText = (source, text, message) => {
  if (!source.includes(text)) failures.push(message);
};
const forbidText = (source, text, message) => {
  if (source.includes(text)) failures.push(message);
};

if (register.destinations.length !== 12) {
  failures.push(`register has ${register.destinations.length} destinations, expected 12`);
}
const ids = new Set();
for (const destination of register.destinations) {
  if (ids.has(destination.id)) failures.push(`duplicate destination ${destination.id}`);
  ids.add(destination.id);
  for (const field of [
    "id", "name", "route", "purpose", "source", "currentness", "primaryCta",
    "availability", "commerce", "fallback", "claimVerdict"
  ]) {
    if (destination[field] === undefined || destination[field] === "") {
      failures.push(`${destination.id || "unknown"} missing ${field}`);
    }
  }
  if (!exists(destination.route)) failures.push(`${destination.id} route missing`);
  if (!exists(destination.fallback)) failures.push(`${destination.id} fallback missing`);
}

const referenceRoutes = register.destinations.filter((item) =>
  item.unit && item.unit !== "11"
);
const heldPromotions = referenceRoutes.filter((item) =>
  /^HOLD PROMOTION\b/.test(item.claimVerdict)
);
for (const destination of referenceRoutes) {
  const href = `href="${destination.route}"`;
  const occurrences = mall.split(href).length - 1;
  const held = heldPromotions.some((item) => item.id === destination.id);
  if (held && occurrences !== 0) {
    failures.push(`${destination.id} is HOLD PROMOTION but remains linked from the Mall`);
  }
  if (!held && occurrences !== 2) {
    failures.push(`${destination.id} must appear once in directory and once in corridor`);
  }
  const source = read(destination.route.replace(/^\//, ""));
  requireText(source, 'href="/mall.html"', `${destination.id} lacks Mall return`);
  requireText(source, "<h1", `${destination.id} lacks visible h1`);
  if (destination.id !== "pieces-of-flair") {
    requireText(source, "Still brewing.", `${destination.id} lacks preview-state label`);
  }
}
for (const destination of heldPromotions) {
  const marker = `data-mall-destination="${destination.id}" data-claim-verdict="hold-promotion"`;
  const occurrences = mall.split(marker).length - 1;
  if (occurrences !== 2) {
    failures.push(`${destination.id} HOLD PROMOTION must drive directory and corridor held states`);
  }
}

requireText(mall, 'id="mallSearchStatus" role="status" aria-live="polite" aria-atomic="true"',
  "search status is not atomic live output");
requireText(mall, 'id="mallSearchReset"', "search lacks reset");
requireText(mall, "Hyvor sign-in may be required", "Unit 11 handoff lacks provider disclosure");
requireText(mall, "does not guarantee review, publication, a new shop, or a reward",
  "Unit 11 handoff overpromises its outcome");
forbidText(mall, "The Gift Shop is open", "Mall calls disconnected Gift Shop open");
forbidText(mall, "the mall expands", "Mall guarantees expansion from a suggestion");
requireText(mallRuntime, 'behavior: reduced ? "auto" : "smooth"',
  "corridor does not honor reduced motion");
forbidText(mallRuntime, "plausible(", "Mall runtime sends search/discovery data to analytics");

requireText(gift, "There is no stock, reservation, checkout, affiliate sale, fulfilment, or payment",
  "Gift Shop does not state the complete commerce hold");
requireText(gift, "Prices are working concept labels only",
  "Gift Shop price labels are not qualified");
forbidText(gift, "The Gift Shop is open", "Gift Shop claims it is commercially open");
forbidText(giftRuntime, 'buyUrl: "http', "Gift Shop contains a live checkout URL");
forbidText(giftRuntime, "product: PRODUCTS", "Gift Shop analytics sends product interest");
requireText(giftRuntime, "Interest saved on this device",
  "Gift Shop local interest is still described as a reservation");
requireText(gift, 'id="shopInterestStatus" role="status" aria-live="polite" aria-atomic="true"',
  "Gift Shop lacks a persistent atomic interest status");
requireText(giftRuntime, "This browser could not save or remove that interest. Nothing changed.",
  "Gift Shop storage denial lacks truthful persistent failure");
requireText(giftRuntime, "Device interest saving unavailable",
  "Gift Shop does not disable unavailable device persistence");
for (const unsupported of ["Bestseller", "Restock", "Made to order"]) {
  forbidText(gift, unsupported, `Gift Shop HTML contains unsupported commerce label ${unsupported}`);
  forbidText(giftRuntime, unsupported,
    `Gift Shop runtime contains unsupported commerce label ${unsupported}`);
}
requireText(giftRuntime, 'detail.setAttribute("data-puffy-id", itemId(index))',
  "Gift Shop does not separate changing persistence identity from stable region identity");
forbidText(giftRuntime, "detail.id = itemId(index)",
  "Gift Shop renderer replaces its stable product-region ID");

requireText(unit11, "not a submission queue", "Unit 11 is not distinguished from submission");
requireText(unit11, "nothing was submitted", "Unit 11 provider failure lacks truthful outcome");
requireText(unit11, 'href="/mall.html"', "Unit 11 lacks Mall fallback");

if (failures.length) {
  console.error("MALL READINESS FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("MALL READINESS PASS");
console.log("destinations=12 reference_departments=10 commerce=held community=external");
