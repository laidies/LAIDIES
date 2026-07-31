#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const statePath = path.join(
  root,
  "operations/product-stewards/platform-reliability/external-services-state.json"
);
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
const observedNow = Date.now();
const asOf = Date.parse(state.asOf);

if (typeof state.asOf !== "string" || !Number.isFinite(asOf)) {
  throw new Error("EXTERNAL_SERVICES_ASOF_INVALID");
}
if (asOf > observedNow) {
  throw new Error(
    `EXTERNAL_SERVICES_ASOF_FUTURE asOf=${state.asOf} ` +
      `observedNow=${new Date(observedNow).toISOString()}`
  );
}

const confirmedPaid = state.services.filter((service) =>
  /PAID.+(?:RECEIPT|INVOICE)|INVOICES FOUND/.test(service.billingStatus)
);
for (const service of confirmedPaid) {
  if (
    typeof service.evidenceReference !== "string" ||
    !service.evidenceReference.trim()
  ) {
    throw new Error(
      `EXTERNAL_SERVICES_PAID_EVIDENCE_REFERENCE_MISSING service=${service.id}`
    );
  }
}

const prematurelyReady = state.recommendations.filter((recommendation) =>
  /READY FOR ALI DECISION/.test(recommendation.status)
);
if (prematurelyReady.length > 0 || state.summary.recommendationsReady !== 0) {
  throw new Error(
    "EXTERNAL_SERVICES_SPEND_DECISION_PREMATURE " +
      `recommendations=${prematurelyReady.map((item) => item.id).join(",")} ` +
      `summary=${state.summary.recommendationsReady}`
  );
}

console.log(
  `EXTERNAL SERVICES TIME PASS asOf=${state.asOf} ` +
    `observedNow=${new Date(observedNow).toISOString()} ` +
    `paid_refs=${confirmedPaid.length} spend_ready=0`
);
