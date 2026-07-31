# Chick Flicks independent acceptance — episode release schema v1

**Status:** INDEPENDENT ACCEPTANCE COMPLETE — HOLD / REJECT V1 FOR ADMISSION
**Product/system:** Chick Flicks / Engine ↔ Chick Flicks release interface
**Acceptance owner:** Chick Flicks product champion
**Candidate:** `EPX-CF13-SCHEMA-2026-07-26-v1`
**Candidate path:**
`operations/product-stewards/episode-experience/release-manifest-schema-candidate-2026-07-26.json`
**Evidence time:** 2026-07-26 10:54:25 PDT
**Integration lock:** joint shared/live lock remains held and not ready

## Verdict

**HOLD.** Candidate v1 resolves the detached-hash shape and demonstrates some
of the intended immutable-record mechanics, but it does not enforce the
complete Engine → Chick Flicks transaction or the requested adversarial
semantics. The maker validator false-accepted six of six independently
constructed invalid records.

This is a judge record only. No Engine, Platform, schema, fixture, test,
registry, run-queue, route, player, media or other shared/live file was edited.

## Candidate integrity evidence

| Check | Observed result | Verdict |
|---|---|---|
| Owner entry | `PRODUCT STEWARD SYSTEM PASS`; `owner_entry_product=chick-flicks:PASS`; products=67 | PASS |
| Candidate payload JCS/SHA-256 | recomputed `42041b48f2d6912984874762ef6efd6313f7c172fb33b4f1822b1be57b213bb7`; exact match | PASS |
| Candidate file manifest | 14/14 listed files independently SHA-256 matched | PASS |
| Maker command | `node operations/product-stewards/episode-experience/test-release-manifest-contract.mjs` → `PASS valid=7 invalid=4` | REPRODUCED; not sufficient for admission |
| JSON Schema exercised by maker test | test source loads neither `episode-release-envelope.schema.json` nor a JSON Schema validator | FAIL |

## Original blocker re-test

### 1. Detached non-circular hash preimage

**PASS at the candidate-envelope level.**

- Independent recomputation canonicalized only `candidate.payload`.
- The exact digest matched the declared payload digest.
- `invalid-self-hash.json` was rejected by the maker semantic validator.
- Candidate/admission payloads do not contain their own populated integrity
  digest.

This PASS does not compensate for the transaction false accepts below.

### 2. Append-only public-proof supersession

**HOLD.**

- Engine candidate and Chick Flicks admission are separate from public-proof
  receipts.
- The Engine failed → verified example links the later receipt through
  `previousReceiptPayloadSha256`.
- There is no Chick Flicks failed → verified proof-chain fixture.
- There is no receipt-supersession fixture with a non-null
  `supersedesReceiptPayloadSha256`.
- The validator does not inspect `supersedesReceiptPayloadSha256`.
- An independently constructed Engine proof with no previous link and an
  unknown supersedes hash was false-accepted as payload
  `57e8c100556c074a9f25dfee569867e3279d2ccea250c950e537574c0b208ad1`.

### 3. First-addition null rollback and safe hold/removal

**PARTIAL PASS / OVERALL HOLD.**

- The both-null first-addition fixture passes.
- The supplied half-null rollback fixture is rejected by the maker semantic
  validator.
- Populated rollback/restore IDs are not bound to the records identified by
  their hashes.
- An invented correction rollback pair was false-accepted as payload
  `f8d3d32d5e98ecbdab7fc16406c4a2b5ee8f6b42fc5216361e4380f255ff5017`.
- No removal fixture exists.
- A removal with `safePublicState: held`, empty scope and an invented populated
  restore pair was false-accepted as payload
  `cdf02d39da87ef5bc56c04aa472487fa57a4dd0312136a873c22b91ddfcf3ed5`.

## Engine → Chick Flicks transaction and format semantics

**HOLD.**

The JSON Schema defines `episode`, `issue`, `formats`, `dependencies`,
`supersession`, `proposedAvailability`, `target` and `scope` largely as generic
objects rather than complete closed record contracts. The maker test does not
load that schema and does not enforce the specification's artifact, format,
availability or dependency rules.

Independent in-memory adversarial records passed the maker's exact
`validateEnvelope` and `validateSemantics` functions:

| Invalid record | False-accepted payload SHA-256 | Contract violated |
|---|---|---|
| correction with invented rollback candidate/admission IDs | `f8d3d32d5e98ecbdab7fc16406c4a2b5ee8f6b42fc5216361e4380f255ff5017` | rollback must reference the matching previously accepted pair |
| absent motion film with public claim `released` | `1daecaf4029585149ba1f4b6c003297e881ba782711f7bc77e9e4a316c499e42` | absent format cannot carry availability |
| present narrated listen-along with no media verdict | `736462147bd8a2037b3211fae1f08c791880c88ecfd81ba81f553e15b59cd4de` | present audiovisual format requires title/occurrence admission |
| duplicated `requiredTransactionFiles` | `bd5b6253439cb2972178e24f26144cecbdfb77b5efebbf6029a8773d9c456839` | dependency list must be complete and duplicate-free |
| unsafe removal with empty scope/invented restore | `cdf02d39da87ef5bc56c04aa472487fa57a4dd0312136a873c22b91ddfcf3ed5` | removal scope/state/restore must fail closed |
| proof with unknown supersedes hash and no previous link | `57e8c100556c074a9f25dfee569867e3279d2ccea250c950e537574c0b208ad1` | append-only/superseding proof chain must reference known compatible receipts |

## Exact repair contract for a versioned successor

Weekly Episodes/Functionality & Platform remain the makers. Chick Flicks will
re-test only a new immutable candidate ID and payload hash that includes:

1. actual Draft 2020-12 Schema validation in the contract test;
2. closed, required schemas for episode, issue, formats, dependencies,
   supersession, proposed availability, availability target/scope and proof
   evidence fields;
3. ID-and-hash binding for rollback, restore, superseded candidate,
   superseded admission and proof-chain records;
4. semantic rejection when an absent format carries a public claim;
5. title/occurrence Media Quality verdict requirement for every present
   audiovisual format;
6. complete and duplicate-free required-transaction-file enforcement;
7. transaction-type-consistent hold/removal scope and safe public state;
8. both a valid and invalid removal fixture;
9. invented rollback/restore/target rejection fixtures;
10. Engine and Chick Flicks failed → verified append chains plus a real
    superseding-receipt fixture and unknown/cross-candidate rejection;
11. rejected player/caption, format-revoke-with-valid-reading-issue and stray
    media/no-transaction fixtures; and
12. source → clean artifact → public and responsive/assistive-technology
    propagation evidence at the later integration gate.

## Handoff

- **Observed:** integrity matched; maker 7/4 reproduced; six adversarial false
  accepts observed.
- **Inference:** none is used to claim a public or runtime failure; this verdict
  is bounded to schema/fixture admission.
- **Files changed by judge:** this Chick Flicks evidence record plus its
  dossier state/backlog/handoff references.
- **Dependencies:** Weekly Episodes maker repair; Functionality & Platform
  technical review; Control Room joint-lock decision.
- **Next trigger:** a versioned successor candidate and Platform review
  receipt.
- **Authority used:** no deploy, publication, spending, live/shared mutation or
  Ali approval.

## Learning scan

**Qualifying learning:** a green fixture count can coexist with a validator
that never loads its advertised schema and false-accepts the system's most
important cross-field invariants.

**Prevention rule:** acceptance must prove that the production schema is
actually executed, then add adversarial cross-field records for ID/hash
binding, absent-format claims, admission requirements, deduplication,
hold/removal semantics and append-only proof chains. A maker's happy/invalid
count is not coverage evidence by itself.

**Possible Behind the Build angle:** “The release test passed 11 fixtures—and
still accepted every bad transaction we tried.”

The shared `operations/painpoints-log.md` was not edited because this
acceptance had no shared-file lock. Control Room received the qualifying
learning and can integrate it through the shared evidence lane.
