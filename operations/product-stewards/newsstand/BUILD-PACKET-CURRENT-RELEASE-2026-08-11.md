# NewsStand current release packet — 2026-08-11

**Status:** BUILD COMPLETE LOCALLY / RELEASE HOLD

**Tier:** 1 — visitor-facing release

**Worktree:** `/Users/alisoneakin/Projects/laidies-newsstand-release-20260811`

**Public route:** `/newsstand.html`

## Problem

The public site does not contain the current four-publication NewsStand experience. The main iCloud checkout contains extensive unrelated and uncommitted work, and historical v13/v22 review receipts do not bind the current repaired page and runtime bytes. Publishing from that checkout would risk mixing unrelated work or relying on stale acceptance.

## Intended visitor outcome

A visitor enters a distinct Y2K SUNNYVAiLE newsstand, can immediately distinguish The Breaking, The Daily, The Weekly and The Tribune, receives honest current/quiet/held/stale states, opens only eligible stories, sees sources and dates, searches eligible back issues, and returns to the invoking control without losing focus or history state.

## Bounded release scope

- current `newsstand.html`, NewsStand CSS, reader and catch-up contracts;
- canonical NewsStand schema and current story dataset;
- four-paper rack assets and deterministic functional text;
- private publication contracts, tests, fixtures and dated evidence needed to reproduce the release;
- no Homepage redesign, no other building redesign, no account/Closet expansion and no unrelated dirty iCloud files.

## Dependency order and acceptance

1. **Reproduce:** restore the tracked release dependencies in an isolated worktree and prove the NewsStand tests run.
2. **Freeze:** commit the exact candidate and build a curated public artifact from that commit.
3. **Judge:** independently inspect the real desktop/mobile render for product clarity, LAiDIES world fit, responsive behavior, focus/accessibility, locked four-paper names and known rejected patterns.
4. **Refresh:** run the current dated editorial radar. A quiet result is valid; missing evidence is not zero and is not current.
5. **Release:** pass the production controller, bind Ali's approval to the exact artifact identity, deploy, then verify the live URL and rollback path.

Release fails closed if any exact-byte review rejects the candidate, the dated editorial state is absent or misleading, the production controller fails, the deployed artifact differs, or the public route cannot be verified.

## Current local verification

- Reader contract: 10 deterministic state fixtures pass.
- Rendered browser matrix: 211 checks pass across 620/900 CSS-pixel viewports and repeated paper/search history cycles.
- Canonical edition migration: pass.
- Private Daily composer/writer/workflow: pass.
- Calibration: deliberately invalid scheduled-trigger and promotion-substitution cases fail.

These are functional and integrity results. They do not approve visual quality, editorial freshness, deployment or public behavior.

## Open gates and owners

- Independent product/UX/accessibility judge: exact committed render.
- Independent Brand/visual judge: same-viewport incumbent/candidate inspection and known-rejection check.
- NewsStand editorial/AIDB lane: current dated disposition and any candidate's full publication gates.
- Release controller: exact artifact, rollback, deployment and live verification.
- Ali: one final exact-artifact production approval only after all prior gates pass.

## Rollback

Keep the currently deployed Cloudflare artifact identity as the rollback target. If the new public verification fails, the release owner restores that exact prior artifact and repeats public verification; local branch state is not rollback proof.
