# NewsStand adoption of the shared prose-quality ratchet

**Status:** ACTIVE INTERNAL CONTRACT — ALL CURRENT NEWSSTAND MATERIAL REMAINS RELEASE-HELD
**Governing decision:** `D-2026-08-07-099`
**Acceptance owner:** role-distinct independent NewsStand editorial/comprehension reviewer

## Decision

NewsStand uses the shared prose-quality system. It does not maintain a separate
quality schema or prose-blind evaluator. For every new or materially revised
NewsStand item containing explanatory prose, the required order is:

1. **Before drafting or dispatch:** validate one prevention-first
   `laidies-content-producer-contract.v1` record with:

   ```sh
   node scripts/check-content-producer-contract.mjs <producer-contract.json>
   ```

2. **Before requesting independent review:** the producer reads the exact prose
   in full and validates a `PRODUCER_SELF_REVIEW` with:

   ```sh
   node scripts/check-prose-quality-admission.mjs <producer-self-review.json>
   ```

3. **Before Stage 5 may pass explanatory meaning:** a reviewer who is distinct
   from the producer cold-reads the exact artifact and validates an
   `INDEPENDENT_SEMANTIC_ADMISSION` with the same command.

The records must declare `contentClass: NEWS` and `surface: NEWSSTAND`. A
successful command proves record and artifact integrity only. Quality authority
comes from the role-distinct semantic judgment recorded against the exact
prose, never from the checker, a score total, required-field presence, a maker
declaration or a screenshot.

## Exact artifact binding

The semantic records must bind:

- `artifact.reviewText` to the complete exact source prose;
- `artifact.rendered` to the complete exact `article-render.html` bytes;
- the exact candidate manifest and its immutable content/version identity; and
- the positive News exemplar and every applicable registered known-bad defect.

Any mismatch between source prose, manifest and rendered copy is `HOLD`. A new
material version requires a new producer self-review and independent semantic
admission; an earlier record does not travel to changed bytes.

## NewsStand semantic boundary

A NewsStand `PASS` must specifically establish plain clarity, reader value,
LAiDIES voice, factual integrity, freshness reviewability, surface fit and an
engaging result. The NewsStand outcomes must also establish the dated change,
its consequence and uncertainty, the daily-life connection, a useful action
and analogy integrity where an analogy is retained.

The independent review must reject glossary accumulation, decorative analogy,
missing mechanism and generic action. It must calibrate against the exact
known-bad Fundamentals artifact:

- path: `content/library-books/rendered/concepts-101.html`
- version: `ai-fundamentals-101-2026-08-06.5`
- SHA-256: `3bf3d6bddd659af063426701541c4d19debc2a39707bde2f7435a555cc835508`
- status: `HOLD_RETURN_TO_DRAFT`
- derivative use: prohibited except source mining

That prose is a rejection fixture, not a template. Likewise, the registered
historical News story is a bounded positive calibration exemplar only; it is
not current-release proof and is not a scaffold to copy.

## Relationship to the publication chain

The shared producer and semantic records precede and complement NewsStand's
existing gates. They do not replace dated sourcing, freshness review, claim
mapping, evidence/inference/position separation, specialist review, Learning
System routing, correction ownership, actual desktop/mobile render inspection,
Brand/editorial judgment, accessibility review, champion reconciliation or
release-owner/public verification.

Stage 5 may consume an `INDEPENDENT_SEMANTIC_ADMISSION` only when it matches the
exact candidate and rendered HTML under review. Stage 5 still separately judges
the actual desktop/mobile result for visible hierarchy, voice, comprehension,
mobile behavior and accessibility. A semantic `PASS` cannot score around a
render or accessibility failure, and a visually polished render cannot score
around a semantic failure.

## Calibration and authority boundary

The shared fail-closed calibration suite is:

```sh
npm run test:content-prose-quality
```

It includes the exact rejected Fundamentals artifact and deliberate false-PASS
records. If it cannot reject those fixtures, the shared checker has no integrity
authority.

This contract approves no current NewsStand article and creates no producer or
independent review record. It changes no article, route or publication state and
grants no deployment, public, spending or Ali authority.
