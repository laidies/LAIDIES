# Build packet — shared claim, definition and freshness system

**Date:** 2026-07-30  
**Status:** BUILT LOCALLY — representative registry and weekly machinery
verified; historical site-wide backfill and owner correction work remain open  
**Trigger:** Ali requested one way to identify, index, maintain and weekly-check
definitions, statistics and statements that can go stale across Episodes,
narration, art, Study Packs, LIBRAiRY, Classes, NewsStand and the rest of the
site.

## Decision

Build one canonical claim register and consumer graph under Learning System &
Concepts. Keep AIDB as a scout, NewsStand as the dated editorial owner, the
Weekly Episode Engine as cadence/release-gate owner and each surface owner as
the authority for its own edit and verification.

Do not create a second NewsStand radar, a second site-refresh register or an
automatic content-rewrite system.

## Delivered

- Machine-readable claim register and JSON Schema.
- Machine-readable freshness-signal inbox and JSON Schema.
- Four-claim Episode 01 representative cluster with five sources and 23 known
  consumers.
- Reproducible validator, due/triggered queue and whole-site candidate scanner.
- Weekly episode freshness and propagation gate template.
- Automatic integration in `scripts/run-weekly-production.js`, including the
  weekly production review and command-centre PASS/HOLD task.
- AIDB → freshness-signal contract.
- NewsStand evidence-ID → durable-claim handoff contract.
- Episode and weekly-engine admission/release hooks.
- Dated Markdown and complete JSON run evidence.

## Representative result

The first run correctly:

- validates the register and all current consumer paths;
- keeps the unmatched Episode 02 AIDB prompting signal visible for backfill;
- identifies open Episode 01 narration, cue/render and owner-review work;
- returns `HOLD` for Episode 01 until those consumers are resolved; and
- scans 355 current source/route files, including all 25 live/preview routes in
  the site index, and finds 2,009 unregistered candidates without pretending
  they are all material claims.

The large candidate count is expected in the first run. It is a backfill
denominator, not a requirement to update thousands of things in one week.
Prioritization is safety/policy first, then product/model/access/price, then
statistics/dates, then definitions/attribution.

## Truth boundary

This build proves the registry and weekly control work locally. It does not
prove the historical site is fully indexed, that open Episode 01 audio/video
corrections are released, or that any public page is current. Each accepting
owner must update and verify its exact consumer.

## Acceptance commands

```bash
node scripts/check-content-freshness.mjs \
  --as-of 2026-07-30 \
  --episode 01 \
  --report operations/product-stewards/learning-content-ecosystem/freshness-runs/2026-07-30-episode-01-weekly.md \
  --json operations/product-stewards/learning-content-ecosystem/freshness-runs/2026-07-30-episode-01-weekly.json

node scripts/check-product-stewards.mjs --owner-entry learning-content-ecosystem
```

## Automatic review execution — approved 2026-09-05

Ali confirmed this system must perform automatic reviews, not merely expire
menus or request human rechecking (D-2026-09-05-142). The September 5 failure
trace found Blend & Snap absent from the claim checker, no scheduled execution
of that check, and a paused Control Room dispatcher referencing a missing
freshness hook. Historical local-run receipts did not prove a running service.

The bounded repair reuses this claim register, freshness-signal inbox and owner
workflow. `scripts/control-room-freshness.mjs` supplies the missing hook. Its
first operational adapter reads the live Blend & Snap menu, manifest, episode
index and available routes. It also reads current registered claims and active
signals; it never calls HTTP or source checks a completed content review.
Coverage remains PARTIAL, with unresolved consumer work visible.

Automation `laidies-automatic-freshness-review` is ACTIVE: a daily 08:00
America/Vancouver heartbeat on the current repair task. This is the executing reviewer for the existing freshness system,
not a second register or reminder. The older broad production dispatcher stays
paused; this heartbeat has no authority to revive unrelated production lanes.

For each run:
1. Execute committed hook code from
   `/Users/alisoneakin/Projects/laidies-blend-snap-menu-20260905` against the
   normal live origin. Read evolving canonical inputs through `--canonical-root`
   `/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/Website-homepage`.
   Write only the dated run result in this existing `freshness-runs` directory
   inside the isolated lane. Record the exact commit and source hashes.
2. Inspect due/changed material using actual official sources. Work one material
   factual claim or related cluster at a time; use prior owner findings and
   evidence to avoid repeating unchanged blocked work. Do not call an item
   current because a URL responds or its date was moved forward.
3. For Blend & Snap, exercise the live menu/order/receipt and available
   activities/Quiz on desktop and phone; confirm held items remain unavailable.
   Read the actual instructions and compare their promise with the activity.
   Test device-local save with synthetic text only; no sign-in or user data.
4. Put concrete source/visitor findings and an owned correction or unresolved
   evidence gap into the existing freshness inbox and owner record. Preserve
   existing records and deduplicate by stable finding identity. A complete
   review may report corrections required; it may not turn that into a renewal.
5. Prepare authorized bounded corrections in isolated work; retain applicable
   content, design and release gates. Never silently rewrite public teaching,
   renew review dates or change component availability merely to clear a queue.
   Broader coverage backfill remains required and must not be reported complete.
6. Commit exact owned results. Keep routine unchanged runs quiet; surface a
   meaningful finding, completed correction, runner failure or decision Ali
   owns. Missing browser/source access is a recorded review failure, not a pass.
