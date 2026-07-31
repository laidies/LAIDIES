# LIBRAiRY independent reliability verification — Miss Jeeves + Puffy

**Evidence time:** 2026-07-27 America/Vancouver  
**Scope:** local source only; no deployment, public-origin assertion, account
sync, editorial admission or visual approval.

## Exact result

**VERIFIED LOCALLY.** The current Library-owned changes satisfy the two bounded
reliability contracts in the building-wave handoff:

1. Miss Jeeves fails closed when `content/site/site-index.json` is unavailable,
   malformed or stale; it exposes a `role=alert` retry control and preserves the
   visitor's typed question. A Library-held book cannot become an operable
   destination through the site index.
2. Same-origin browser tabs consume the `storage` event for
   `laidies_puffies_board`. A create, update and removal in tab A repaint the
   Closet board in tab B; create/removal also change tab B's truthful local
   visitor-state copy between returning-without-Card and first-time. This is
   **device-local browser state only**, never account sync, ownership, reward
   or cross-device persistence.

## Inputs inspected

- `library.html` — Miss Jeeves index validation, error/retry rendering and
  held-destination filtering.
- `content/site/puffy-bookmarks.js` — canonical local record handling,
  `storage` listener and consumer repaint events.
- `scripts/test-library-product.cjs` — current browser fixtures, including
  missing/malformed/stale index and same-origin tab A/tab B create/update/remove
  flows.
- `operations/product-stewards/library/EXPERIENCE-BRIEF.md`,
  `OPERATING-SPEC.md` and `FUNCTIONALITY-MAP.md` — intended Library and
  same-device-only contracts.

## Reproduced checks

```text
node scripts/test-library-product.cjs
LIBRAiRY PRODUCT PASS
checks=49
external_requests_blocked=34

node scripts/check-product-stewards.mjs --owner-entry library
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=library:PASS

node --check content/site/puffy-bookmarks.js
node --check scripts/test-library-product.cjs
git diff --check -- library.html content/site/puffy-bookmarks.js scripts/test-library-product.cjs operations/product-stewards/library
PASS
```

The added independent assertions prove that tab B changes to
`returning-without-card` after tab A creates a valid record, and returns to
`first-time` after tab A removes the last record. The existing suite separately
proves tab-B Board creation, newest-record update and empty-board removal.

## Boundaries still open

- Native Safari/VoiceOver, native zoom and browser-family witnesses remain
  required; Chromium is not a substitute.
- Public-origin/cache proof remains absent.
- No production book is admitted, so the real editorial reader/save vertical
  remains blocked behind the Library's named admission and correction gates.
- Account-backed or cross-device Puffy continuity is not implemented and must
  not be inferred from this same-origin tab refresh.

## Exact next action

Keep these repairs in the later Library/Closet integration candidate. When an
exact release candidate exists, repeat the named failure/retry and two-tab
journeys in native/browser-family and public-origin QA, while preserving the
device-local-only copy boundary.
