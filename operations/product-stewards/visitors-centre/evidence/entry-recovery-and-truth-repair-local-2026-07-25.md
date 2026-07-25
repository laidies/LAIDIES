# Visitor's Centre recovery and truth repair — local evidence — 2026-07-25

**Status:** BUILT LOCALLY — deterministic source guardrails passed, but the complete local journey remains unverified. This is not a release candidate, deployment, browser/device result, or public verification.

## Scoped repair

- The reveal now records whether its initiating control was the named directory or a map control. Back and Escape close the reveal and restore focus to that control.
- Missing, empty, or malformed `SV_BUILDINGS` data disables the empty selector and exposes a visible fallback with a named LAiDIES homepage route.
- Postcard, Resident Card and Post Office wording now describe only observable device-local setup or a handoff. Native share reports that delivery is not confirmed on this page.
- Room-first markup, artwork and layout were preserved; no service, identity, newsletter, postcard lifecycle, analytics or deployment work was performed.

## Deterministic checks run

On the dirty local source tree, on 2026-07-25:

| Check | Result | Scope/limit |
|---|---|---|
| `node scripts/test-entry-recovery-truth.mjs` | PASS | Confirms shared-directory fallback, Escape/focus-return wiring, and scoped action-true wording. |
| `node scripts/test-eod-product-claims.mjs` | PASS | Existing product-claim guardrail remained green. |
| Inline-script parse check | PASS | All three inline Visitor's Centre scripts compiled with `new Function` in Node. |
| `git diff --check` for scoped implementation/test files | PASS | No whitespace errors. |

## Remaining evidence gap

No rendered keyboard, assistive-technology live announcement, 390×844, desktop, no-JS, reduced-motion, real mobile Safari, failed shared-script, or public-origin result exists yet. Native share-sheet opening, text/email application handoff, clipboard behavior and all receiving-product outcomes remain **NOT TESTED**. Per BTB-069, successful destination arrival would still be navigation evidence only.

## Learning scan

No new qualifying painpoint: the repair applies existing VC-03/VC-04 gates and BTB-069/BTB-096. Reinforced rule: a client-side share promise can only report the handoff state the page observes, never recipient delivery or membership.
