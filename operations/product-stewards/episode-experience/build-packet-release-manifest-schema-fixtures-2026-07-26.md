# Build packet — episode release chain-of-custody contract

**Candidate:** `EPX-CF13-SCHEMA-2026-07-26-v2`  
**Status:** CHICK FLICKS HOLD / REJECT V2 — REPAIR DEFERRED UNTIL REAL RELEASE  
**Maker:** Weekly Episodes — Engine & Production  
**Technical acceptance order:** Functionality & Platform PASS, then Chick
Flicks independent acceptance  
**Shared/live lock:** HELD by Control Room

## Scope

This is backstage episode-release plumbing. It is not Episode 5 writing,
Episodes 1–4/trailer repair, site work, deployment or publication. It creates
an immutable chain-of-custody package able to bind future script, audio,
captions, images, video, approvals, admission, proof and rollback records.

V1 is retained as rejected evidence. V2 is a new sealed candidate; it does not
overwrite or reopen V1.

## Exact v2 repair

- Hashes detached JCS `body={schemaVersion,recordType,payload}`.
- Executes the candidate-bound Draft 2020-12 JSON Schema with Ajv CLI.
- Uses explicit `no-prior|restore-prior` tagged unions and a hashed
  accepted-history snapshot.
- Resolves rollback, restore, supersession, candidate, admission and control
  targets by ID and immutable body hash.
- Keeps candidate/admission records immutable and public proof append-only.
- Enforces proof type, subject, admission subject, time, chain head,
  supersession ancestry, unique receipt IDs and same-ID conflict rejection.
- Closes episode, issue, format, dependency, availability, proof-evidence and
  control payloads.
- Rejects absent-but-released formats, released rejected media/accessibility,
  present audiovisual formats without Media Quality verdicts, duplicate or
  stray transaction files and unsafe removal states.
- Includes Engine and Chick Flicks failed→verified chains, safe hold, safe
  removal and reading-issue-preserving format revoke.

## Fail-closed controls

The test fails before fixtures when the candidate-bound schema checksum does
not match. It also proves:

- missing schema fails;
- malformed/renamed schema fails;
- weakening `uniqueItems` makes the duplicate-file negative pass the schema,
  tripping the mutation sentinel; and
- all 22 negative fixtures reject with their exact expected error code.

## Evidence

- Candidate receipt:
  `release-manifest-schema-candidate-v2-2026-07-26.json`
- Contract: `EPISODE-RELEASE-MANIFEST-SPEC.md`
- Schema: `schema/episode-release-envelope-v2.0.0.schema.json`
- Fixtures: `fixtures/release-manifest-v2/`
- Generator: `build-release-manifest-fixtures-v2.mjs`
- Sealer: `seal-release-manifest-candidate-v2.mjs`
- Test: `test-release-manifest-contract-v2.mjs`
- Maker result:
  `RELEASE MANIFEST V2 CONTRACT PASS valid=11 invalid=22 schema=draft2020 mutation_controls=5`

## Gate

Platform passed the exact candidate ID, payload digest and 40 bound files:
`checksum_bound=40 schema_negative=3 mutation_controls=5`. Durable receipt:
`../platform-reliability/independent-review-episode-release-interface-v2-2026-07-26.md`.
Chick Flicks independently verified the same hashes and upstream suites, then
rejected v2 for five additional schema-valid false accepts: absent motion
admitted, unrelated admission transaction, Engine proof candidate ID/hash
mismatch, Chick Flicks proof admission ID/hash mismatch and control
episode/candidate mismatch. Durable receipt:
`../chick-flicks/independent-acceptance-episode-release-schema-v2-2026-07-26.md`.

No v3 expansion starts now. Reopen only when a real release candidate makes
the interface blocking. The visible media lane proceeds independently; no
review authorizes shared/live implementation or public release.

## Learning scan

V1 demonstrated that a green maker suite is only evidence for assertions it
actually executes. Prevention rule: bind the complete typed/versioned body;
execute the exact named schema; make every adversarial claim a named fixture
with a reason-specific failure; and mutation-test that the schema is truly in
the acceptance path.
