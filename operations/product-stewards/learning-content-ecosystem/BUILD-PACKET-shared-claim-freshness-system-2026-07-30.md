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
