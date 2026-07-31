# Chick Flicks ↔ Weekly Episode Engine ownership handoff

**Status:** V2 INDEPENDENT HOLD — LIVE/SHARED LOCK REMAINS CLOSED
**Date:** 2026-07-26
**Weekly Episode Engine permanent task:**
`019f9f7c-f03a-7ec1-a776-d60b57210322`
**Chick Flicks owner:** this permanent Chick Flicks product task
**Engine transaction authority:**
`operations/product-stewards/episode-experience/EPISODE-RELEASE-MANIFEST-SPEC.md`

## Ownership boundary

The Weekly Episode Engine owns each episode from opportunity intake through
teaching/editorial intent, script/canon, production, exact asset assembly,
checksum-bound release candidate and the episode package's public release
proof.

Chick Flicks owns episode discovery, catalogue/archive presentation,
released/forthcoming/held availability truth, the Screening Room and
`/watch` listen/watch presentation, captions/player behavior, programme
admission into those surfaces, issue/player/store handoffs and the complete
visitor return journey.

Episode Media Quality remains the required independent audiovisual admission
authority. Chick Flicks consumes that verdict and fails closed; it does not
approve media merely because a file, cue sheet, VTT, audio track, image, MP4,
checksum or release candidate exists.

The Weekly Episode Engine's public proof establishes the exact episode package
it produced and released. Chick Flicks' public proof separately establishes
that the exact admitted package is discoverable, accurately labelled,
playable/readable where admitted, accessible and returnable through the real
visitor journey. Neither proof substitutes for the other.

## Engine → Chick Flicks release-candidate handoff

Every proposed episode addition, correction, hold, removal or replacement must
arrive as one immutable transaction containing:

- episode ID/number, slug, canonical title and editorial status;
- canonical teaching/canon source identity and checksum;
- exact issue route and checksum-bound issue artifact;
- exact narration, caption, cue, image and motion asset paths/checksums, with
  absent formats explicit;
- release-candidate identifier and complete dependency manifest;
- correction/supersession relationship to any prior candidate;
- production verification and independent editorial/technical verdicts;
- proposed public availability date/state, without requiring Chick Flicks to
  call it current or available before its own admission passes;
- rollback target; and
- the Engine's exact public proof after release.

Conversation, filenames, timestamps, page presence, a successful build or a
single checksum without the complete bound manifest is not a handoff.

## Chick Flicks admission and availability transaction

For each candidate Chick Flicks:

1. validates the candidate identity and manifest against the exact received
   episode package;
2. obtains the applicable Episode Media Quality title/occurrence verdict;
3. verifies issue, archive, catalogue, Screening Room programme, player,
   caption and return compatibility;
4. assigns separate dispositions for reading issue, narrated listen-along,
   admitted visual edition and motion-film edition;
5. updates no public availability surface until Control Room supplies the
   required locks and exact artifact verification passes;
6. publishes only the narrowest truthful state—released, forthcoming, held,
   unavailable, cover-only narrated edition or admitted title-specific format;
7. returns an acceptance/rejection record bound to the candidate checksum;
8. after release, verifies the exact public discovery/archive/watch/return
   journey and returns that proof to the Engine.

An editorially released episode may remain unavailable in a particular
Screening Room format. A held media edition does not make a valid reading
issue forthcoming. Availability is format-specific and title-specific.

## Correction, revoke and rollback

- An Engine correction or supersession invalidates stale Chick Flicks
  candidate acceptance until checksum-bound compatibility is re-run.
- An editorial hold/removal must propagate to discovery/archive/issue
  promotion; existing device-local favourites, rental hints and resume records
  become stale-safe rather than reopening an invalid destination.
- A Media Quality revoke immediately blocks the affected listen/watch edition
  without silently removing an independently valid reading issue.
- Chick Flicks player/caption/accessibility failure can hold its affected
  presentation while the Engine's underlying episode package remains recorded
  accurately.
- Rollback selects a named, previously accepted package and its matching
  availability/admission record; it never mixes files across candidates.

## Write and decision boundaries

Chick Flicks does not edit episode teaching intent, canon, lesson structure,
script or production sources. Corrections in those areas return to the Weekly
Episode Engine.

The Weekly Episode Engine does not independently change Chick Flicks
catalogue/archive presentation, Screening Room player/caption behavior,
availability labels or visitor-return state. Those changes return to Chick
Flicks and the applicable shared Directors.

Shared index, builder, route, analytics and release work requires a Control
Room lock with both owners named. Direct task messages coordinate work; this
record and checksum-bound evidence remain the durable authority.

## Engine reconciliation return

The Weekly Episode Engine reconciled this handoff on 2026-07-26 and created
`EPISODE-RELEASE-MANIFEST-SPEC.md`. Its addition/correction/hold/removal/
replacement transaction and Chick Flicks return record match this ownership
boundary, including separate reading-issue, narrated-listen-along,
visual-edition and motion-film dispositions.

The interface is **SPECIFIED**, not yet executable or verified. Before fixture
implementation, the Engine and Control Room must settle three schema details:

1. `candidate.manifestSha256` cannot hash a serialization containing its own
   populated hash field. The canonicalization contract must exclude that field,
   set it to a defined sentinel during hashing or use a detached envelope.
2. `enginePublicProof` and Chick Flicks `publicProof` move from `pending` to
   `verified`. They therefore cannot mutate the immutable candidate/admission
   records. Use separately hashed append-only proof receipts, or define a new
   immutable superseding record.
3. A first-ever addition may have no previously accepted rollback candidate.
   The schema must explicitly allow a null/no-prior rollback pair and define
   safe removal/hold behavior for that case.

No shared implementation begins until these rules are machine-testable and a
joint Control Room lock names both owners and the exact transaction/admission
IDs.

## Control Room routing

Control Room confirmed on 2026-07-26 that:

- Control Room owns the missing run-queue rows and Episode Experience
  top-level registry rebind;
- Weekly Episodes owns the manifest repair, with Functionality & Platform
  technical review;
- Chick Flicks preserves its independent checksum-bound acceptance lane;
- shared integration still requires the joint Control Room lock; and
- Chick Flicks re-tests only after both a versioned manifest/fixture candidate
  and the shared queue repair are handed back.

Until that two-part return arrives, Chick Flicks performs no speculative schema
implementation, shared registry/run-queue edit or premature acceptance test.

Control Room further confirmed that Chick Flicks is the independent acceptance
owner for the Weekly Episodes/Functionality & Platform schema fixtures. Chick
Flicks does not author or repair the maker candidate and does not mark the
joint lock ready until all three exact fixtures pass:

1. **Hash-preimage non-circularity:** recomputation from the defined canonical
   preimage produces the declared candidate hash without including that
   populated hash in its own preimage.
2. **Append-only public-proof supersession:** pending and verified Engine and
   Chick Flicks proofs are separately immutable/hash-bound; a later receipt
   supersedes or links to an earlier record without mutation.
3. **First-addition null rollback:** a first addition accepts an explicit
   null/no-prior rollback pair, rejects half-null or invented targets and
   demonstrates safe hold/removal behavior.

Maker evidence is an input, not the acceptance verdict. Chick Flicks records
its own exact commands, fixture hashes, observed results and accept/reject
decision.

## Candidate receipt

Weekly Episodes reported the following maker candidate on 2026-07-26:

- path:
  `operations/product-stewards/episode-experience/release-manifest-schema-candidate-2026-07-26.json`;
- candidate ID: `EPX-CF13-SCHEMA-2026-07-26-v1`;
- reported payload SHA-256:
  `42041b48f2d6912984874762ef6efd6313f7c172fb33b4f1822b1be57b213bb7`;
- reported contract: version 1.1 with detached JCS payload hashing,
  append-only/superseding proof receipts and all-or-none rollback supporting a
  both-null first addition;
- reported maker result: 7 valid fixtures and 4 invalid fixtures; and
- reported evidence locations: `episode-experience/schema/`,
  `episode-experience/fixtures/release-manifest-v1.1/` and
  `episode-experience/test-release-manifest-contract.mjs`.

These are **REPORTED, NOT YET INDEPENDENTLY VERIFIED**. Functionality &
Platform review and the Control Room queue repair remain pending. In accordance
with the acceptance boundary, Chick Flicks has not run the candidate test,
recomputed the payload hash or inspected fixtures for a verdict.

### Chick Flicks independent verdict

At 2026-07-26 10:54:25 PDT, after Control Room authorized independent
acceptance, Chick Flicks returned **HOLD / REJECT V1 FOR ADMISSION**.

The candidate payload hash and all 14 listed file hashes match, and the maker
7-valid/4-invalid result reproduces. The validator nevertheless false-accepts
invented rollback/restore targets, absent-format availability, a present
listen-along without a media verdict, duplicate required files, unsafe removal
semantics and an unknown proof-supersession link. It also does not load the
provided JSON Schema.

Exact evidence:
`independent-acceptance-episode-release-schema-v1-2026-07-26.md`.

The joint shared/live lock remains held. Weekly Episodes/Functionality &
Platform own any versioned repair; Chick Flicks will judge the successor
without authoring it.

### Platform disposition

Control Room reported that Functionality & Platform also returned **HOLD /
REJECTED** on v1 for stale candidate binding, unbound envelope metadata,
non-explicit rollback schema/history, cross-type previous-receipt links and the
missing Chick Flicks append-only transition fixture.

Candidate v1 is now stale. Chick Flicks performs no further v1 analysis or
acceptance work. The next eligible trigger is a resealed v2 with a new
candidate ID/payload hash that has already passed Platform re-review.

### Chick Flicks v2 independent verdict

At 2026-07-26 11:11:27 PDT, after Platform PASS on the exact immutable
candidate, Chick Flicks returned **HOLD / REJECT V2 FOR ADMISSION**.

Candidate file SHA-256
`b1813da7654277b8fa3dd8e8106c10ec63d16f45fdd0485af81d6744a5470fad`,
payload SHA-256
`f62c3cf67363096ea161ad91dd529eb4087e86c46ef19573843552941cbae5f1`
and all 40 bound-file hashes independently match. Maker and Platform PASS
commands reproduce. V2 also repairs the six v1 adversarial cases.

The bound schema and exact maker semantic validator nevertheless accept five
independent contradictions: admission of absent motion, an admission bound to
an unrelated transaction ID, Engine proof with a candidate ID that disagrees
with its candidate hash, Chick Flicks proof with an admission ID that
disagrees with its admission hash, and an availability control whose episode
ID disagrees with its target candidate.

Exact evidence:
`independent-acceptance-episode-release-schema-v2-2026-07-26.md`.

The joint shared/live lock remains held. Chick Flicks authored no maker repair
and will next judge only a newly sealed successor that first passes Platform
re-review.

## Acceptance evidence for the interface

- one new-release fixture;
- one correction/supersession fixture;
- one editorial hold/removal fixture;
- one media-revoke-with-valid-reading-issue fixture;
- one rejected player/caption candidate fixture;
- source → clean artifact → public checksum identity;
- store/archive/issue/Screening Room/return propagation at 320/390/1280,
  keyboard and native assistive technology; and
- explicit proof that a stray media file cannot enter the catalogue, player or
  public promise without the complete manifest and title-specific admission.
