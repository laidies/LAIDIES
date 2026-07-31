#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  CONTRACT_VERSION,
  assertPropagationConsumable,
  createMemoryCorrectionService
} from "./library-correction-service.mjs";

const root = path.resolve(process.env.LIBRARY_ROOT || process.cwd());
const contract = JSON.parse(
  fs.readFileSync(
    path.join(
      root,
      "content/library-books/corrections/library-correction-contract.v1.json"
    ),
    "utf8"
  )
);
const fixture = JSON.parse(
  fs.readFileSync(
    path.join(
      root,
      "operations/test-fixtures/library-corrections/verification-rulebook-vr-c001.json"
    ),
    "utf8"
  )
);

const times = [
  "2026-07-26T16:00:00.000Z",
  "2026-07-26T16:05:00.000Z",
  "2026-07-26T16:10:00.000Z",
  "2026-07-26T17:00:00.000Z",
  "2026-07-26T17:05:00.000Z",
  "2026-07-26T17:10:00.000Z"
];
let timeIndex = 0;
let idIndex = 0;
const service = createMemoryCorrectionService({
  clock: () => times[timeIndex++],
  idFactory: (kind) => `${kind}-fixture-${++idIndex}`
});

let checks = 0;
function check(condition, message) {
  assert.ok(condition, message);
  checks++;
}
function rejects(fn, pattern, message) {
  assert.throws(fn, pattern, message);
  checks++;
}

check(contract.schema_version === CONTRACT_VERSION, "contract and module versions agree");
check(contract.authority.production_provider === null, "no production provider is invented");
check(contract.authority.may_admit_book === false, "contract cannot admit a book");
check(
  fixture.source_observation.book_status === "HOLD" &&
    fixture.source_observation.current_route_type === "mailto" &&
    fixture.source_observation.current_route.includes("VR-C001"),
  "fixture truthfully records the current claim-scoped mailto route and HOLD"
);

const receipt = service.submit(fixture.submission, {
  idempotency_key: "vr-c001-browser-fixture"
});
check(
  Object.keys(receipt).sort().join(",") ===
    "correction_id,created_at,receipt_id,state,status_reference",
  "receipt contains only privacy-safe status fields"
);
check(
  !JSON.stringify(receipt).includes("private-token") &&
    !JSON.stringify(receipt).includes(fixture.submission.finding),
  "receipt excludes reporter text and evidence URL"
);
const firstLedger = service.getImmutableLedger();
check(
  firstLedger.length === 1 &&
    !JSON.stringify(firstLedger).includes("private-token") &&
    !JSON.stringify(firstLedger).includes(fixture.submission.finding),
  "immutable ledger stores only a digest and safe evidence origin"
);
check(
  service.getReporterPayload(receipt.correction_id).evidence_url.includes("private-token"),
  "temporary payload vault retains the original report before expiry"
);

const replay = service.submit(fixture.submission, {
  idempotency_key: "vr-c001-browser-fixture"
});
check(
  replay.correction_id === receipt.correction_id &&
    service.getImmutableLedger().length === 1,
  "same idempotency key and body returns the original receipt without a new event"
);
rejects(
  () =>
    service.submit(
      { ...fixture.submission, finding: "A materially different finding." },
      { idempotency_key: "vr-c001-browser-fixture" }
    ),
  /different submission/,
  "idempotency key reuse with a different body fails closed"
);
rejects(
  () =>
    service.submit(
      { ...fixture.submission, resident_card_id: "card-private" },
      { idempotency_key: "forbidden-private-field" }
    ),
  /resident_card_id is prohibited/,
  "Resident Card identifiers are rejected"
);
rejects(
  () =>
    service.submit(
      { ...fixture.submission, raw_query: "private reading query" },
      { idempotency_key: "forbidden-query-field" }
    ),
  /raw_query is prohibited/,
  "raw query text is rejected"
);

service.triage(receipt.correction_id, {
  owner: "Library editorial fixture"
});
service.resolveCorrected(receipt.correction_id, {
  owner: "Library editorial fixture",
  summary: "Corrected source binding prepared for independent readmission.",
  content_version: "vr-2026-07-26-corrected-v2"
});
const history = service.getHistory(receipt.correction_id);
check(
  history.map((row) => row.record_version).join(",") === "1,2,3",
  "record versions increase deterministically"
);
check(
  history[0].superseded_by === history[1].version_id &&
    history[1].superseded_by === history[2].version_id &&
    history[2].superseded_by === null,
  "history exposes an immutable supersession chain"
);
check(
  history[0].created_at === history[2].created_at &&
    history[0].updated_at === "2026-07-26T16:00:00.000Z" &&
    history[2].resolved_at === "2026-07-26T16:10:00.000Z",
  "created, updated and resolved timestamps retain their exact meanings"
);
check(
  Object.isFrozen(history) && Object.isFrozen(history[0]),
  "returned history is immutable"
);

const correctedPropagation = service.propagation(receipt.correction_id);
check(
  assertPropagationConsumable(correctedPropagation) &&
    correctedPropagation.admission_compiler.required_correction_state ===
      "corrected-pending-readmission" &&
    correctedPropagation.admission_compiler.required_action ===
      "require-independent-readmission",
  "corrected output requires independent readmission and never clears correction state"
);
check(
  correctedPropagation.site_index.action === "suppress-until-current-admission" &&
    correctedPropagation.miss_jeeves.action === "suppress-until-current-admission" &&
    correctedPropagation.puffy_recheck.action === "recheck-admission-on-reopen",
  "index, Miss Jeeves and Puffy receive bounded propagation instructions"
);
rejects(
  () =>
    service.resolveCorrected(receipt.correction_id, {
      owner: "Library editorial fixture",
      summary: "Cannot resolve twice.",
      content_version: "vr-2026-07-26-corrected-v3"
    }),
  /cannot transition/,
  "terminal corrected records cannot transition again"
);

const demotionReceipt = service.submit(
  {
    ...fixture.submission,
    claim_id: "VR-C002",
    source_id: "SRC-OAI-WEB-SEARCH",
    category: "stale-source",
    finding: "The provider claim requires a fresh currentness review."
  },
  { idempotency_key: "vr-c002-browser-fixture" }
);
service.triage(demotionReceipt.correction_id, {
  owner: "Library editorial fixture"
});
service.demote(demotionReceipt.correction_id, {
  owner: "Library editorial fixture",
  summary: "Demoted pending a new source and claim review."
});
const demotionPropagation = service.propagation(demotionReceipt.correction_id);
check(
  assertPropagationConsumable(demotionPropagation) &&
    demotionPropagation.state === "demoted" &&
    demotionPropagation.admission_compiler.required_action === "demote-to-hold" &&
    demotionPropagation.admission_compiler.required_correction_state ===
      "correction-required",
  "demotion output fails closed for admission and all downstream consumers"
);

const ledgerLength = service.getImmutableLedger().length;
const purged = service.purgeExpired("2026-08-26T17:11:00.000Z");
check(
  purged.length === 2 &&
    service.getReporterPayload(receipt.correction_id) === null &&
    service.getImmutableLedger().length === ledgerLength,
  "raw reporter payload expires while the immutable audit ledger remains"
);
check(
  !JSON.stringify(contract).includes('"clear"') &&
    !JSON.stringify(correctedPropagation).includes('"clear"') &&
    !JSON.stringify(demotionPropagation).includes('"clear"'),
  "contract and propagation outputs never set correction_state clear"
);

console.log(
  `LIBRARY CORRECTION CONTRACT PASS · checks=${checks} · ledger_events=${ledgerLength} · provider=none · admitted=0`
);
