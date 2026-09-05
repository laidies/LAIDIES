#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rosterPath = path.resolve(root, process.argv[2] || "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json");
const resultsPath = path.resolve(root, process.argv[3] || "operations/agents/aidb-intelligence-desk/sources/practitioner-signal-pilot-results.json");
const fail = (message) => { throw new Error(message); };
const nonEmpty = (value) => typeof value === "string" && value.trim().length > 0;
const date = (value) => Number.isFinite(Date.parse(value));
const oneOf = (value, allowed, label) => { if (!allowed.includes(value)) fail(`${label}: invalid ${value}`); };

// Checks the standing discovery routes, not whether today's research was done.
export function validateNewsstandSourceRoutes(roster, asOf) {
  const expected = {
    accountability: "PUBLIC_RECORD",
    medical_science: "RESEARCH_INDEX",
    product_releases: "PROVIDER",
    work_economy: "INDEPENDENT_REPORTING",
    security: "INDEPENDENT_REPORTING",
    contrary_evidence: "CIVIL_SOCIETY"
  };
  const validDay = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && date(value) && new Date(value).toISOString().slice(0, 10) === value;
  if (!validDay(asOf)) fail("newsroom as-of date must be a real YYYY-MM-DD");
  const routes = roster.newsstandCoverage?.deskRoutes;
  if (!roster.recurringAuthority || !Array.isArray(routes)) fail("newsroom recurring desk routes are missing");
  if (roster.newsstandCoverage.status !== "BOUNDED_RECURRING_ROUTES" || roster.newsstandCoverage.researchCompletionCertified !== false) fail("newsroom standing routes cannot certify research completion");
  if (routes.length !== Object.keys(expected).length || new Set(routes.map(r => r.id)).size !== routes.length) fail("newsroom requires six distinct desk routes");
  if (!Array.isArray(roster.sources)) fail("newsroom sources must be an array");
  const sources = new Map(roster.sources.map(s => [s.id, s]));
  if (sources.size !== roster.sources.length) fail("newsroom source identities must be unique");
  for (const route of routes) {
    if (!expected[route.id] || !Array.isArray(route.sourceIds) || !route.sourceIds.length || !nonEmpty(route.evidenceBoundary)) fail(`newsroom invalid desk ${route.id}`);
    const active = route.sourceIds.map(id => {
      const source = sources.get(id);
      if (!source) fail(`newsroom ${route.id}: missing source ${id}`);
      if (!["PROMOTED", "PILOT"].includes(source.promotionStatus) || !["DAILY", "DAILY_RELEASE_CHECK"].includes(source.cadence)) fail(`newsroom ${id}: daily recurring route required`);
      if (!validDay(source.verifiedAt) || !validDay(source.expiresAt)) fail(`newsroom ${id}: source dates must be real YYYY-MM-DD`);
      if (source.verifiedAt > asOf || source.expiresAt < asOf) fail(`newsroom ${id}: source review expired or not yet effective`);
      let url; try { url = new URL(source.channelUrl); } catch { fail(`newsroom ${id}: invalid URL`); }
      if (url.protocol !== "https:" || source.cost !== "NONE") fail(`newsroom ${id}: public free HTTPS route required`);
      return source;
    });
    if (!active.some(source => source.newsroomRole === expected[route.id])) fail(`newsroom ${route.id}: requires ${expected[route.id]} beyond the scout/provider sweep`);
  }
  return { desks: routes.length, sources: new Set(routes.flatMap(r => r.sourceIds)).size, researchCompletionCertified: false };
}

export function validatePractitionerPilot(roster, results) {
  if (roster?.schemaVersion !== "1.0.0") fail("roster schemaVersion must be 1.0.0");
  if (!Array.isArray(roster.sources) || roster.sources.length < 10 || roster.sources.length > 20) fail("roster must contain 10-20 sources");
  if (roster.cost !== "NONE") fail("roster cost must remain NONE");
  if (typeof roster.recurringAuthority !== "boolean") fail("recurringAuthority must be boolean");
  if (roster.recurringAuthority && !/PROMOTED and PILOT.*CANDIDATE.*on-trigger/i.test(roster.recurringBoundary || "")) fail("recurring authority requires an explicit PROMOTED/PILOT cadence and CANDIDATE on-trigger boundary");
  const ids = new Set();
  const urls = new Set();
  for (const [index, source] of roster.sources.entries()) {
    const label = `sources[${index}]`;
    for (const field of ["id", "identity", "company", "role", "relevanceEvidence", "channelUrl", "monitoringMethod", "termsBoundary", "distinctContribution", "duplicationNote", "cadence", "retirementTrigger"]) {
      if (!nonEmpty(source[field])) fail(`${label}.${field} required`);
    }
    if (ids.has(source.id)) fail(`${label}: duplicate id ${source.id}`);
    if (urls.has(source.channelUrl)) fail(`${label}: duplicate channelUrl ${source.channelUrl}`);
    ids.add(source.id); urls.add(source.channelUrl);
    oneOf(source.tier, ["OFFICIAL_AUTHORITY", "ORIGINAL_PRACTITIONER_EVIDENCE", "SECONDARY_SCOUT"], `${label}.tier`);
    oneOf(source.promotionStatus, ["CANDIDATE", "PILOT", "PROMOTED", "PARKED", "RETIRED"], `${label}.promotionStatus`);
    if (source.cost !== "NONE") fail(`${label}: pilot source cost must be NONE`);
    if (!Array.isArray(source.destinations) || source.destinations.length === 0 || source.destinations.some((item) => !nonEmpty(item))) fail(`${label}.destinations required`);
    if (!date(source.verifiedAt) || !date(source.expiresAt) || Date.parse(source.expiresAt) <= Date.parse(source.verifiedAt)) fail(`${label}: invalid verification/expiry dates`);
    let url; try { url = new URL(source.channelUrl); } catch { fail(`${label}: channelUrl invalid`); }
    if (url.protocol !== "https:") fail(`${label}: channelUrl must use https`);
    if (source.tier === "SECONDARY_SCOUT" && !/not authority|discovery|scout/i.test(`${source.duplicationNote} ${source.termsBoundary}`)) fail(`${label}: secondary scout must explicitly deny authority`);
  }

  if (results?.schemaVersion !== "1.0.0") fail("results schemaVersion must be 1.0.0");
  if (!Array.isArray(results.signals) || results.signals.length < 3 || results.signals.length > 5) fail("pilot must process 3-5 signals");
  const signalIds = new Set();
  let usefulOwnerRulings = 0;
  for (const [index, signal] of results.signals.entries()) {
    const label = `signals[${index}]`;
    if (!nonEmpty(signal.id) || signalIds.has(signal.id)) fail(`${label}: unique id required`);
    signalIds.add(signal.id);
    if (!ids.has(signal.sourceId)) fail(`${label}: sourceId absent from roster`);
    oneOf(signal.state, ["NEW", "VERIFY", "TEST", "ROUTE", "PARK", "RETIRE"], `${label}.state`);
    for (const field of ["duplicationCheck", "bestRoute", "receivingOwner", "ownerRuling"]) if (!nonEmpty(signal[field])) fail(`${label}.${field} required`);
    if (signal.publicAuthority !== false) fail(`${label}: publicAuthority must be false`);
    const original = signal.exactOriginal || {};
    const verification = signal.primaryVerification || {};
    const test = signal.boundedLaidiesTest || {};
    for (const [objectName, object, fields] of [
      ["exactOriginal", original, ["url", "accessedAt", "establishes"]],
      ["primaryVerification", verification, ["url", "status", "limits"]],
      ["boundedLaidiesTest", test, ["status", "result"]]
    ]) for (const field of fields) if (!nonEmpty(object[field])) fail(`${label}.${objectName}.${field} required`);
    for (const candidate of [original.url, verification.url]) {
      let url; try { url = new URL(candidate); } catch { fail(`${label}: evidence URL invalid`); }
      if (url.protocol !== "https:") fail(`${label}: evidence URL must use https`);
    }
    if (!date(original.accessedAt)) fail(`${label}: exactOriginal.accessedAt invalid`);
    if (!Array.isArray(test.evidence) || test.evidence.length === 0) fail(`${label}: bounded test evidence required`);
    for (const evidencePath of test.evidence) if (!fs.existsSync(path.resolve(root, evidencePath))) fail(`${label}: missing bounded test evidence ${evidencePath}`);
    if (/^(ACCEPT|MERGE)/.test(signal.ownerRuling) && /PASS/.test(test.status)) usefulOwnerRulings += 1;
  }
  if (usefulOwnerRulings < 1) fail("pilot needs at least one useful explicit receiving-owner ruling");
  if (roster.recurringAuthority && !/ADMITTED/.test(results.recurringExpansion || "")) fail("admitted recurrence requires a matching ADMITTED result");
  if (!roster.recurringAuthority && !/PARKED/.test(results.recurringExpansion || "")) fail("pilot recurrence must remain PARKED until admitted");
  if (results.publicationAuthority !== false || results.spendAuthority !== false) fail("pilot may not claim publication or spend authority");
  return { sources: roster.sources.length, signals: results.signals.length, usefulOwnerRulings };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes("--newsstand-only")) {
      const at = process.argv.indexOf("--as-of");
      const newsroom = validateNewsstandSourceRoutes(JSON.parse(fs.readFileSync(path.join(root, "operations/agents/aidb-intelligence-desk/sources/practitioner-source-roster.json"), "utf8")), process.argv[at + 1]);
      console.log(`NEWSSTAND SOURCE ROUTES PASS desks=${newsroom.desks} sources=${newsroom.sources} research_completion_certified=false`);
      process.exit(0);
    }
    const result = validatePractitionerPilot(JSON.parse(fs.readFileSync(rosterPath, "utf8")), JSON.parse(fs.readFileSync(resultsPath, "utf8")));
    const recurring = JSON.parse(fs.readFileSync(rosterPath, "utf8")).recurringAuthority ? "admitted_bounded" : "parked";
    console.log(`PRACTITIONER SIGNAL PILOT PASS sources=${result.sources} signals=${result.signals} useful_owner_rulings=${result.usefulOwnerRulings} recurring=${recurring}`);
  } catch (error) {
    console.error(`PRACTITIONER SIGNAL PILOT FAIL\n- ${error.message}`);
    process.exit(1);
  }
}
