# Independent Platform review — Episode release interface v2

**Disposition:** PASS — exact immutable v2 may proceed to Chick Flicks'
independent acceptance  
**Evidence timestamp:** 2026-07-26T18:06:21Z  
**Scope:** BACKSTAGE EPISODE RELEASE PLUMBING only  
**Public/shared mutation:** none  
**Live route, media, deploy or release authority:** none

## Exact candidate binding

- Candidate ID:
  `EPX-CF13-SCHEMA-2026-07-26-v2`
- Candidate receipt:
  `operations/product-stewards/episode-experience/release-manifest-schema-candidate-v2-2026-07-26.json`
- Candidate file SHA-256:
  `b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad`
- RFC8785-JCS payload SHA-256:
  `f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1`
- Bound files: 40 unique paths; all 40 byte hashes independently matched.
- Platform test:
  `operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review-v2.mjs`
- Platform test SHA-256:
  `aa9127ff5ac2e64b084ec3783e1c14e17aad143b62514dadeee634dc271d01f0`

## Commands and observed evidence

```text
$ node operations/product-stewards/episode-experience/test-release-manifest-contract-v2.mjs
RELEASE MANIFEST V2 CONTRACT PASS valid=11 invalid=22 schema=draft2020 mutation_controls=5

$ node operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review-v2.mjs
PLATFORM EPISODE RELEASE V2 PASS checksum_bound=40 schema_negative=3 mutation_controls=5
```

The independent Platform test did not import or edit the maker validator. It:

1. recomputed the exact candidate-file and JCS payload hashes;
2. recomputed all 40 candidate-bound file hashes;
3. executed the candidate-bound Draft 2020-12 schema against a valid first
   addition and the half-null rollback, half-admission target and duplicate
   dependency negatives;
4. weakened five controls in temporary schema copies and proved the adversarial
   record then passed only after its relevant control was removed:
   rollback tuple, admission tuple, dependency uniqueness, closed candidate
   body and record-type/payload binding; and
5. left all maker files unchanged.

## Original blocker verdicts

| Required ruling | Platform verdict | Exact evidence |
|---|---|---|
| Non-circular candidate-hash preimage | PASS | `integrity.bodySha256` is outside the hashed `body`; the full typed/versioned body is hashed, and payload-only relabeling rejects as `BODY_HASH_MISMATCH`. |
| Append-only/superseding public-proof receipts outside immutable candidate/admission records | PASS | Engine and Chick Flicks proof receipts are separate record types. Valid failed→verified chains pass; wrong type, wrong subject/admission, non-monotonic time, foreign/unknown supersession, forked head and duplicate receipt-ID/body conflicts reject with named codes. |
| Explicit null/no-prior rollback for first additions | PASS | Draft 2020-12 `rollback.oneOf` requires either `mode=no-prior` with both IDs null or `mode=restore-prior` with both IDs non-null. First-addition/empty-history passes; half-null, false no-prior history and invented restore targets reject. |

## Successor-gate and safety verdicts

- The executable loads the exact checksum-bound schema before fixture
  admission and fails closed for missing, renamed, malformed and
  checksum-mismatched schema inputs.
- All six required successor negatives exist and have reason-specific
  assertions: invented rollback target, absent released motion, missing media
  verdict, duplicate transaction file, unsafe removal and unknown proof
  supersession.
- Hold/removal controls require a non-empty scope, an accepted or explicit
  no-prior restore state and safe public state. The valid hold/removal fixtures
  pass; invented restore and unsafe removal reject.
- No observed P0/P1 defect remains inside the bounded schema/fixture gate.

## Handoff

- Literal result: **Platform PASS for this exact v2 only.**
- Permitted next action: Weekly Episodes/Control Room may route this identical
  ID and hashes to Chick Flicks for its independent acceptance.
- Not permitted: treating Platform PASS as Chick Flicks acceptance, joint lock
  release, episode production, live-site work, schema integration, deploy or
  public release.
- Joint shared/live lock remains held until the named acceptance owner and
  Control Room complete their gates.
