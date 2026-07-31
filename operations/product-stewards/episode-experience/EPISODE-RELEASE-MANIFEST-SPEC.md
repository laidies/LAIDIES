# Episode release transaction — Engine ↔ Chick Flicks

**Schema version:** `2.0.0`  
**Status:** SPECIFIED — V1 REJECTED; V2 BUILT LOCALLY, PLATFORM REVIEW PENDING  
**Owners:** Weekly Episodes — Engine & Production · Chick Flicks  
**Shared integration:** joint Control Room lock required

## 1. Fully bound immutable envelope

Every candidate, admission, control and proof receipt uses:

```json
{
  "body": {
    "schemaVersion": "2.0.0",
    "recordType": "engine-candidate",
    "payload": {}
  },
  "integrity": {
    "algorithm": "sha-256",
    "canonicalization": "RFC8785-JCS",
    "bodySha256": "64 lowercase hex"
  }
}
```

Hashing:

1. Construct the complete `body`.
2. Canonicalize `body` with RFC 8785/JCS.
3. UTF-8 encode without a BOM.
4. SHA-256 those bytes.
5. Store the lowercase digest in `integrity.bodySha256`.

`integrity` is detached from the preimage. `schemaVersion`, `recordType` and
`payload` are all inside it, so a record cannot be relabelled across type or
schema version without changing identity. Stored whitespace is irrelevant;
validators re-canonicalize `body`. Unknown fields fail the exact schema.

## 2. Engine candidate and accepted-history context

`engine-candidate` payload contains the complete episode package defined by
the operating spec plus:

```json
{
  "transactionId": "immutable id",
  "transactionType": "addition|correction|replacement",
  "createdAt": "ISO-8601",
  "episode": {},
  "issue": {},
  "formats": {},
  "dependencies": {},
  "candidate": {
    "id": "immutable id",
    "productionVerdicts": [],
    "independentVerdicts": []
  },
  "supersession": {
    "supersedesCandidateId": null,
    "supersedesCandidateBodySha256": null,
    "invalidatesAdmissions": [],
    "reason": null
  },
  "historyContext": {
    "ledgerPath": "relative immutable snapshot path",
    "ledgerSha256": "JCS hash of the complete snapshot",
    "acceptedCandidateCount": 0
  },
  "proposedAvailability": {},
  "rollback": {
    "mode": "no-prior",
    "candidateId": null,
    "chickFlicksAdmissionId": null
  }
}
```

Rollback is an explicit tagged union:

- `mode: no-prior` requires both IDs null, an exact accepted-history snapshot
  with zero accepted candidates and `transactionType: addition`.
- `mode: restore-prior` requires both IDs populated and the exact pair present
  in the accepted-history snapshot.
- An addition is not assumed to be first-ever merely because it says
  `addition`; the referenced snapshot proves the state.
- Correction/replacement requires `restore-prior`.
- If no prior pair exists, safe rollback is unavailable—not a guessed package.

The history snapshot itself is immutable/JCS-hashed and contains the episode
ID, observation time and accepted candidate/admission pairs.

## 3. Immutable admissions and append-only proof receipts

Candidate and Chick Flicks admission bodies never contain public proof.
Absence of a proof receipt means unverified.

Record types:

- `engine-public-proof-receipt`
- `chick-flicks-admission`
- `chick-flicks-public-proof-receipt`

Every proof receipt uses `verdict: verified|failed|revoked`; `pending` is
invalid. A later observation is a new body-hashed record.

Chain links:

- `previousReceiptBodySha256` must resolve to the same proof record type;
- it must have the same subject:
  - Engine: same candidate ID and candidate body hash;
  - Chick Flicks: same candidate ID/hash and admission ID/hash;
- `observedAt` must be strictly later than the previous receipt;
- `supersedesReceiptBodySha256`, when populated, must resolve to a receipt in
  that same subject chain; and
- a candidate, admission or other record type can never serve as a prior proof
  link.

An admission change is a new `chick-flicks-admission` whose
`supersedesAdmissionBodySha256` references an admission for the same candidate
subject. Existing records remain unchanged.

## 4. Hold/removal and restore safety

`episode-availability-control` contains:

```json
{
  "transactionId": "immutable id",
  "transactionType": "hold|removal",
  "createdAt": "ISO-8601",
  "episodeId": "episode-05",
  "target": {
    "candidateId": "id",
    "candidateBodySha256": "hash",
    "chickFlicksAdmissionId": null,
    "chickFlicksAdmissionBodySha256": null
  },
  "scope": {"editorialPackage": true, "formats": []},
  "reason": "non-empty",
  "effectiveAt": "ISO-8601",
  "safePublicState": "held|removed|unavailable",
  "restore": {
    "mode": "no-prior",
    "candidateId": null,
    "chickFlicksAdmissionId": null
  }
}
```

Target admission ID/hash is an all-or-none pair. Restore uses the same explicit
tagged union and accepted-history rules as rollback.

- Editorial hold blocks promotion and affected starts; routes show an honest
  hold/correction/return state.
- Format hold/revoke blocks only named formats; a valid reading issue may
  remain.
- Removal ends current/forthcoming promotion and leaves an honest unavailable
  or correction route; immutable evidence remains.
- Device-local favourites/rental/resume pointers become stale-safe.
- Null/no-prior restore remains unavailable until a new accepted
  addition/replacement exists.
- Releasing a hold requires a new superseding control/admission and new proof;
  no record is toggled.

## 5. Public/shared boundary

Engine package proof and Chick Flicks visitor-journey proof remain separate.
Public/shared changes wait for a joint Control Room lock naming both owners
and the exact candidate/admission/control body hashes.

## 6. V2 acceptance fixtures

The candidate must prove:

1. candidate-bound Draft 2020-12 schema execution and full-body JCS hash,
   including rejection of payload-only/type/version relabelling;
2. zero-history `no-prior` addition;
3. accepted-history `restore-prior` correction;
4. rejection of half-null and false-no-prior rollback;
5. Engine failed → verified proof chain;
6. Chick Flicks failed → verified proof chain;
7. rejection of cross-type, cross-subject, non-monotonic and foreign
   supersedes links;
8. target admission ID/hash all-or-none;
9. hold/removal with null restore or accepted restore target and a
   transaction-consistent fail-closed public state;
10. closed format/dependency contracts, exact duplicate-free required files,
    media/accessibility verdict gating and stray-file rejection;
11. missing, malformed, renamed and checksum-mismatched schema failure before
    fixture execution; and
12. a constraint-weakening mutation sentinel proving the named schema is
    actually in the acceptance path.

## Governing handoff

`operations/product-stewards/chick-flicks/ownership-handoff-weekly-episode-engine-2026-07-26.md`
