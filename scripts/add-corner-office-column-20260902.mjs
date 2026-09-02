#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { inspectProseReviewChain } from "./check-prose-quality-admission.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const columnsPath = path.join(root, "content/daily-edition-columns.json");
const bankPath = path.join(root, "operations/product-stewards/newsstand/candidates/service-bank.json");
const producerPath = "operations/product-stewards/newsstand/evidence/corner-office-20260902/producer-review-migrated.json";
const independentPath = "operations/product-stewards/newsstand/evidence/corner-office-20260902/independent-review-migrated.json";
const sourceRecheckPath = "operations/product-stewards/newsstand/evidence/corner-office-20260902/source-recheck.md";
const recordId = "DAILY-2026-09-02-CAREER-LIFE-CORNER-02-PRIORITIES";
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative)));

const producer = readJson(producerPath);
const independent = readJson(independentPath);
const chain = inspectProseReviewChain(producer, independent, { root });
if (chain.errors.length) throw new Error(chain.errors.join("\n"));
if (producer.verdict !== "PASS" || independent.verdict !== "PASS") throw new Error("Both exact-prose reviews must pass");
const bank = JSON.parse(fs.readFileSync(bankPath));
const item = bank.items.find(entry => entry.id === "corner-02-priorities");
if (!item || item.status !== "APPROVED" || item.publicEligibility !== "ELIGIBLE") throw new Error("Approved Corner Office bank item missing");
const columns = JSON.parse(fs.readFileSync(columnsPath));
if (columns.records.some(record => record.id === recordId)) throw new Error(`${recordId} already exists`);
if (columns.records.some(record => record.editionDate === "2026-09-02" && record.type === "career_life")) throw new Error("September 2 already has a Corner Office record");
const record = {
  id: recordId,
  editionDate: "2026-09-02",
  type: item.type,
  classification: item.classification,
  status: "APPROVED",
  headline: item.headline,
  summary: item.summary,
  body: item.body,
  question: null,
  sourceLinks: item.sourceLinks,
  sourcePath: item.sourcePath,
  sourceId: item.sourceId,
  reviewedContentSha256: item.reviewedContentSha256,
  bankItemId: item.id,
  predecessorRecordId: null,
  destination: item.destination,
  destinationLabel: item.destinationLabel,
  owner: item.owner,
  freshness: { ...item.freshness, lastCheckedAt: "2026-09-02" },
  reviewEvidence: {
    accuracy: independentPath,
    editorial: independentPath,
    voice: independentPath,
    producer: producerPath,
    format: item.reviewEvidence.format,
    owner: sourceRecheckPath,
    safety: null
  },
  sourceRecheck: { path: sourceRecheckPath, sha256: sha256(fs.readFileSync(path.join(root, sourceRecheckPath))) },
  publicEligibility: "ELIGIBLE"
};
columns.records.push(record);
const temporary = `${columnsPath}.tmp-${process.pid}`;
fs.writeFileSync(temporary, `${JSON.stringify(columns, null, 2)}\n`, { flag: "wx" });
fs.renameSync(temporary, columnsPath);
console.log(`CORNER OFFICE COLUMN ADDED id=${recordId}`);
