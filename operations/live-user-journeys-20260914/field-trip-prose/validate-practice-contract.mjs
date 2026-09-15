import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
import { inspectContentProducerContract } from "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage/scripts/check-content-producer-contract.mjs";
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.join(here, "practice-validation-root");
const contract = JSON.parse(fs.readFileSync(path.join(root, "producer-contract.json"), "utf8")); const result = inspectContentProducerContract(contract, { root });
if (result.errors.length) { console.error(result.errors.join("\n")); process.exit(1); } console.log("PRACTICE PRODUCER CONTRACT PASS status=" + result.status);
