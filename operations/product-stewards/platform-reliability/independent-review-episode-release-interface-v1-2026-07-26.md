# Independent Platform review — Episode Engine ↔ Chick Flicks schema v1

**Status:** STALE / REVIEW CLOSED — DO NOT RE-RUN OR ROUTE V1; A NEW V2
CANDIDATE ID/HASH IS THE ONLY VALID TRIGGER  
**Reviewed candidate:** `EPX-CF13-SCHEMA-2026-07-26-v1`  
**Declared candidate payload SHA-256:**
`42041b48f2d6912984874762ef6efd6313f7c172fb33b4f1822b1be57b213bb7`  
**Scope:** isolated schema, fixtures and deterministic tests only  
**Evidence time:** 2026-07-26 10:55 America/Vancouver
(`2026-07-26T17:55:20Z`)  
**Public/shared mutation:** none

## Outcome

The v1 candidate makes three correct architectural moves:

1. candidate and admission records no longer contain mutable public-proof
   state;
2. integrity is detached, so no populated digest is directly included in its
   own preimage; and
3. the first-addition fixture contains a both-null rollback pair and the maker
   rejects a half-null fixture.

Those moves are accepted as direction. The machine candidate is held because
its bound spec changed after the candidate was sealed, and its current
validator/fixtures do not yet enforce the complete contract they claim.

The candidate declares
`EPISODE-RELEASE-MANIFEST-SPEC.md =
a78e6e5561dea6efca8cd80a94fe95808a72fc50be81a4ee8c5d9a73796803a7`.
The independently observed file is
`b0f883790f66e16d83a4b0030769ac24151904b1498065f65c9f215779cb8016`.
Therefore candidate `v1` is no longer the exact artifact described by its own
manifest and cannot be accepted even if its maker suite remains green.

## Deterministic evidence

Run:

```text
node operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review.mjs
```

Expected result:

```text
PLATFORM EPISODE RELEASE REVIEW REJECT
candidate_binding=FAIL_STALE
detached_payload_non_circularity=PASS_NARROW
immutable_candidate_and_admission=PASS
envelope_metadata_hash_binding=FAIL
explicit_no_prior_rollback_schema=FAIL
engine_receipt_chain_type_subject_binding=FAIL
chick_flicks_receipt_chain_type_subject_binding=FAIL
chick_flicks_append_only_transition_fixture=FAIL
```

The review independently recomputes the declared candidate payload hash,
checks every file checksum in the candidate, reruns the maker suite, and then
runs adversarial mutations in temporary copies. It does not alter the Engine
candidate.

## Exact commands and observed results

| Command | Observed result |
|---|---|
| `node operations/product-stewards/episode-experience/test-release-manifest-contract.mjs` | maker PASS `valid=7 invalid=4` |
| `node operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review.mjs` | Platform REJECT; stale candidate binding plus adversarial failures |
| `node scripts/check-product-stewards.mjs --owner-entry episode-experience` | PASS |
| `node scripts/check-product-stewards.mjs --owner-entry platform-reliability` | PASS |
| scoped `git diff --check` on Platform review artifacts | PASS |

## Blocking findings

### P0 — the review candidate is stale

The contract changed after `EPX-CF13-SCHEMA-2026-07-26-v1` recorded its file
hash. The changed prose now describes a whole-body hash and explicit rollback
mode, while the bound JSON Schema, fixtures and test still implement the older
payload-only contract. This is evidence of repair in progress, not a versioned
candidate.

Required repair: finish one internally consistent schema/test/fixture set,
issue a new candidate ID, recompute every file checksum and the candidate
digest, and leave that exact set unchanged during independent review.

### P0 — detached digest does not bind the record envelope

The current digest authenticates only `payload`. `schemaVersion` and
`recordType` can be changed without changing the declared digest. Schema
validation may later reject a mismatched interpretation, but the immutable
record identity itself does not cryptographically bind the schema and record
type.

Required repair: hash the JCS canonical form of a detached immutable body such
as:

```json
{
  "schemaVersion": "1.2.0",
  "recordType": "engine-candidate",
  "payload": {}
}
```

Keep only `integrity` outside that preimage. Rename the field
`bodySha256`, and bind all candidate/admission/receipt references to that
whole-body digest.

JCS also requires I-JSON input, including rejection of duplicate property
names and invalid Unicode. The executable parser must preserve that rule
before ordinary `JSON.parse` can collapse duplicate keys.

### P0 — no-prior rollback is prose/test logic, not explicit schema state

`rollbackPair` independently permits nullable IDs. It has neither an
all-or-none schema branch nor an explicit `no-prior` state. The maker test
rejects half-null fixtures procedurally, but it also assumes every
`transactionType: addition` is first-ever. “Addition” and “no accepted prior
record exists” are not the same fact.

Required repair:

```json
{"state":"no-prior","candidateId":null,"chickFlicksAdmissionId":null}
```

or:

```json
{"state":"restore-prior","candidateId":"…","chickFlicksAdmissionId":"…"}
```

Enforce the two branches in JSON Schema. The validator must additionally
check accepted-history context: `no-prior` is valid only when no prior accepted
pair exists; `restore-prior` must resolve to one matching whole candidate and
admission. Hold/removal target and restore ID/hash pairs need the same
all-or-none treatment.

### P0 — append-only proof chains accept cross-type records

For Engine receipts, the maker validates only that
`previousReceiptPayloadSha256` exists in a global hash map. A candidate digest
therefore passes as the “previous receipt.” For Chick Flicks receipts, prior
and superseded receipt links are not validated at all.

Required repair: every previous/superseded link resolves to:

- the same proof `recordType`;
- the same candidate subject;
- for Chick Flicks, the same admission subject;
- an earlier `observedAt`;
- the immediately preceding chain head where `previous` is used; and
- a record in the same accepted ledger, never merely any known hash.

Receipt IDs and immutable body digests must be unique. Replaying the same
record is idempotent; reusing an ID with different bytes is a conflict.

### P0 — Chick Flicks transition fixture is missing

The required Engine failed→verified chain exists. Chick Flicks has only one
standalone verified receipt, so its append-only transition is not proved.

Required fixtures:

- CF failed/revoked receipt → later verified receipt for the same
  candidate/admission;
- cross-type previous link rejection;
- cross-candidate and cross-admission previous link rejection;
- forked/non-head previous link rejection;
- same receipt ID/different body rejection; and
- supersession of a mistaken receipt while retaining both immutable records.

### P0 — the executable never loads the advertised JSON Schema

Chick Flicks independently reproduced the maker PASS, then passed six of six
invalid transactions through the maker's exact executable functions. The test
does not load `schema/episode-release-envelope.schema.json` or invoke a Draft
2020-12 validator. The schema is therefore documentation beside the gate, not
the gate.

The successor must include these six reason-specific negative fixtures:

1. correction with invented rollback candidate/admission IDs;
2. absent motion film carrying a `released` public claim;
3. present narrated listen-along without its Media Quality verdict;
4. duplicate `requiredTransactionFiles`;
5. unsafe removal with empty scope and invented restore; and
6. proof receipt with unknown supersession and no valid previous link.

Each fixture must assert its named validation stage/error code. A generic
`throws` or aggregate invalid-fixture count is insufficient.

The test must also prove it is executing the exact candidate-bound schema:

- missing, renamed, malformed or checksum-mismatched schema fails before any
  fixture can be admitted;
- weakening/removing a relevant constraint in a temporary schema copy causes
  its mutation-control test to fail; and
- restoring the exact schema makes the complete positive/negative suite pass.

Referential history, chain head, subject chronology and artifact existence
remain separate reason-coded semantic stages after schema validation.

## Original three-ruling verdict

| Ruling | Verdict |
|---|---|
| Non-circular candidate hash | **PARTIAL PASS** — no self-reference, but immutable envelope metadata is not bound |
| Append-only/superseding proof receipts | **REJECT** — correct record separation; chain type/subject/idempotency enforcement and CF transition fixture missing |
| First-addition null/no-prior rollback | **REJECT** — fixture behavior exists, but explicit machine state, schema branch and accepted-history proof are missing |

## Ownership and next gate

- Control Room has closed all further v1 review. This record remains immutable
  rejection evidence and must not be refreshed into a PASS.
- Any `v1.2` wording is internal draft terminology only. It is not a
  reviewable successor.
- Weekly Episodes remains the maker and repairs only its versioned
  contract/schema/fixtures/test candidate.
- Platform applies the successor gate only to an immutable **v2** with a new
  candidate ID/hash.
- Platform returns an exact v2 PASS/HOLD before any handoff to Chick Flicks.
- Only after Platform PASS may Chick Flicks independently accept or reject the
  repaired candidate; it keeps authority over discovery, admission,
  player/caption and visitor-return evidence.
- Control Room keeps the shared implementation lock held. No index, builder,
  route, player, media, deployment or public change is authorized by this
  review.
