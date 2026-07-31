# Control Room owner handoff — Episode release interface v1 review

**Product/system ID:** `platform-reliability`  
**Owner task:** `019f9f59-6f59-7500-af47-455f39d1c0c5`  
**Status:** STALE / REVIEW CLOSED — V2 NEW CANDIDATE ID/HASH REQUIRED  
**Evidence time:** 2026-07-26 10:55 America/Vancouver
(`2026-07-26T17:55:20Z`)  
**Acceptance owner:** Chick Flicks, independently after Platform re-review  
**Joint shared/live lock:** HELD

## Bounded action completed

Platform independently reviewed Weekly Episodes candidate
`EPX-CF13-SCHEMA-2026-07-26-v1` against:

- non-circular canonical hashing;
- immutable candidate/admission records;
- append-only/superseding Engine and Chick Flicks proof receipts;
- explicit first-addition no-prior rollback;
- half-null and invented-target rejection;
- hold/removal no-restore behavior; and
- chain idempotency/immutability adversaries.

## Evidence

- Candidate:
  `../episode-experience/release-manifest-schema-candidate-2026-07-26.json`
- Candidate declared payload digest:
  `42041b48f2d6912984874762ef6efd6313f7c172fb33b4f1822b1be57b213bb7`
- Independent review:
  `independent-review-episode-release-interface-v1-2026-07-26.md`
- Independent executable:
  `test-episode-release-interface-platform-review.mjs`
- Maker command:
  `node operations/product-stewards/episode-experience/test-release-manifest-contract.mjs`
  → PASS `valid=7 invalid=4`
- Platform command:
  `node operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review.mjs`
  → `PLATFORM EPISODE RELEASE REVIEW REJECT`
- Owner entry:
  `episode-experience:PASS`; `platform-reliability:PASS`
- Scoped diff check: PASS

## Observed result versus unproved claim

Observed passes:

- candidate payload digest recomputes;
- candidate/admission public proof is separated;
- detached payload hashing is non-circular at the narrow payload scope;
- valid first-addition fixture is both-null;
- half-null rollback fixture is rejected;
- invented hold target is rejected;
- hold/no-restore fixture records `held` with a null restore pair.

Observed blockers:

1. Candidate binding is stale. The candidate declares the manifest spec hash
   `a78e6e…03a7`; the observed spec hash is `b0f883…016c`.
2. The changed spec now describes whole-body hashing and explicit rollback
   mode, while the bound schema/test/fixtures still implement payload-only
   hashing and nullable IDs without a mode.
3. The maker validator accepts an Engine receipt whose previous-receipt link
   is actually a candidate digest.
4. The maker validator accepts the same cross-type previous link for Chick
   Flicks proof.
5. No Chick Flicks failed/revoked→verified append-only transition fixture
   exists.
6. Receipt ID uniqueness, same-ID/different-body conflict, chain-head/fork,
   same-subject and monotonic-time rules are not executable.
7. Chick Flicks independently observed 6/6 false accepts because the maker
   executable never loads or applies its advertised JSON Schema. Exact record:
   `../chick-flicks/independent-acceptance-episode-release-schema-v1-2026-07-26.md`.

The maker PASS is valid only for its seven positive and four negative fixtures.
It does not establish the broader append-only/idempotency contract or an exact
unchanged candidate.

## Files/services changed

Added only:

- `operations/product-stewards/platform-reliability/independent-review-episode-release-interface-v1-2026-07-26.md`
- `operations/product-stewards/platform-reliability/test-episode-release-interface-platform-review.mjs`
- this handoff

No Engine, Chick Flicks, route, index, builder, player, media, service,
deployment or public file was changed by Platform.

## Dependencies and downstream owners

- Weekly Episodes consumes the review and remains schema maker.
- Platform re-reviews the next immutable candidate ID/hash.
- Chick Flicks independently accepts/rejects and retains format-specific
  admission and visitor-journey authority.
- Control Room keeps the shared integration lock held.

## Next trigger

Any `v1.2` wording is an internal draft only and is not reviewable. Weekly
Episodes returns an immutable **v2** with a new candidate ID/hash that:

1. binds schema version, record type and payload in the detached hash body;
2. executes explicit `no-prior|restore-prior` schema branches and history
   context;
3. validates proof chains by type, subject, order, unique ID and head;
4. executes the exact candidate-bound Draft 2020-12 schema;
5. rejects all six Chick Flicks adversaries with reason-specific assertions;
6. proves missing/corrupt/checksum-mismatched schema fails closed and that
   weakening a relevant constraint makes the mutation-control suite fail;
7. adds Chick Flicks transition/adversarial fixtures; and
8. reseals every exact file checksum.

Control Room has suppressed all further v1 review. Platform reviews only the
new exact v2 ID/hash and returns PASS/HOLD. Only a Platform PASS may route that
exact v2 to Chick Flicks; only Chick Flicks may then accept it. The joint lock
remains held throughout.

## Authority used

No public, deploy, live-service, spending or Ali-approval authority was used.
