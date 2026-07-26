# NewsStand Cycle 6 P0 build packet — four-publication producer-to-reader proof

**Status:** SPECIFIED — NOT AUTHORIZED FOR PUBLICATION OR DEPLOYMENT  
**Trigger:** Cycle 6 audit found four clear product contracts but no complete
producer-to-reader system, and a fresh browser history regression.

## Problem and intended outcome

The public reader can represent four papers and fail closed, but no evidence
binds discovery, classification, sources, independent approval, canonical
record, exact artifact, correction and public render. Build one private,
deterministic transaction harness that proves each publication’s distinct job
and every failure boundary without publishing a story.

## Work breakdown and path ownership

1. **QA engineer — history repair**
   - Scope: `newsstand.html`,
     `scripts/test-newsstand-reader-browser.mjs`.
   - Reproduce paper/search scroll restoration at multiple viewport heights
     and three Back/Forward cycles. Replace timing guesses with an observable
     settled condition. Preserve focus and current access re-evaluation.

2. **Editorial systems engineer — four-edition fixture corpus**
   - Scope: a new
     `operations/test-fixtures/newsstand/producer-reader/` directory and a new
     validator/test script.
   - Create one qualified and one reject/quiet fixture per edition. Include
     primary-source claim map, independent context as required, decision
     rationale, timestamps, correction owner and expiry.

3. **Publication integrator — transactional candidate compiler**
   - Scope: new isolated script and generated temporary output only.
   - Accept exact-schema private candidates; bind source hashes, independent
     verdict and edition decision; emit a deterministic proposed public record.
     Reject unknown fields, duplicate IDs/slugs/sources, stale/future dates,
     edition/job mismatch, missing evidence and unapproved hard-hold topics.
   - It must never edit `content/newsstand-stories.js` without a separately
     authorized integration step.

4. **Accuracy/correction judge**
   - Independently verify claim-source entailment, corrections and retractions.
   - Run published → corrected → retracted transitions while preserving slug,
     source history and exact changed claims.

5. **UX/accessibility and brand judges**
   - Test first-time differentiation, returning/current versus quiet, direct
     routes, archive, no-result, failure, correction and retraction at desktop,
     390 px, 320 px, 200% zoom, reduced motion, keyboard and native
     Safari/VoiceOver.
   - Ali rules on Weekly art or deliberate text-only removal.

6. **Release manager — exact artifact drill**
   - Build an isolated artifact, prove byte identity for runtime authority,
     rerun all suites, and exercise a local rollback. Public deployment and
     verification remain a later authorized gate.

## Acceptance evidence

- Every fixture is independently classified to exactly one edition or reject.
- Breaking clear-day and Daily quiet-day states remain valid.
- Weekly synthesis cannot be a list of Daily headlines; Tribune cannot hide
  position as fact.
- One central access gate blocks stale, held, unavailable and retracted bodies
  across paper/search/hash/history.
- Three repeated Back/Forward cycles restore query/card/focus/scroll within an
  observable settled condition and re-evaluate changed availability.
- Source and correction records are hash-bound; duplicate/unknown/future/stale
  attacks fail closed.
- Exact source/artifact suites pass with zero unexpected network requests.
- Independent scores reach at least 17/20 for product/editorial,
  accuracy/trust and LAiDIES brand; accessibility and technical judges pass.
- No credential, external feed, story publication, deployment or approval
  claim occurs.

## Integration, release, measurement and rollback

Parent NewsStand champion reconciles the four fixtures. Accuracy and Editorial
must be independent of the maker. Platform owns any later canonical write,
deploy and rollback. A release candidate must name exact hashes and preserve
the previous public dataset for recovery. After authorized public release,
measure comprehension, source use, correction clarity and useful return with
privacy-approved aggregates; do not capture raw archive queries.

Rollback means restore the last independently accepted dataset and artifact,
retain the correction/retraction record, re-run public checks and state the
incident. A failed local drill remains **BUILDING**; a passed local drill is
only **VERIFIED LOCALLY**.

## Explicit holds

Health Weekly approval, Weekly visual, native accessibility, analytics,
external discovery service, credentials, spending, canonical publication,
deployment, public verification, sponsorship and revenue remain held.
