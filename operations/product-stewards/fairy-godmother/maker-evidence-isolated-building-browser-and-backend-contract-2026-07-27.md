# FAiRY Godmother’s House — isolated building/browser/backend maker evidence

**Status:** BUILT LOCALLY — INDEPENDENT REVIEW REQUIRED  
**Evidence date:** 2026-07-27 (America/Vancouver)  
**Public status:** unchanged; no deployment or public-origin claim  
**Scope:** the existing FAiRY cottage → parlour → private advice desk journey,
typed success/no-charge rendering, local-preview boundary, and the reconstructed
Worker’s deterministic contract.

## Literal visitor output

- The visitor enters through the governed enchanted cottage image and the
  advice parlour is the interface rather than a generic chat panel.
- The desk exposes the existing PATRON SAiNT presentation choices, bounded
  prompt field, visible sensitive-data/currentness warning, usable-answer
  result, assumptions, unknowns, next move, revision controls and same-visit
  history.
- A successful typed response consumes the one local preview. Clarification,
  current-information, safety-boundary and service-error outcomes do not.
- No account, subscriber identity, FAiRY Play, balance, badge or reward is
  created by the page.
- Successful and no-charge results are now a labelled live region and receive
  keyboard focus. Reduced-motion visitors receive an immediate rather than
  smooth scroll.

## Exact bounded change

The page’s existing result reveal scrolled the response into view without
moving focus. That made the result easy to miss for a keyboard or screen-reader
visitor. The successor gives `#adviceScroll` labelled region/live semantics,
programmatic focus and a reduced-motion-aware scroll. No copy, service request,
result schema, allowance rule, energy selection, imagery or public endpoint was
changed for this repair.

| File | SHA-256 |
| --- | --- |
| `games/fairy-godmother.html` | `8eaa355370e20aa5dd7796cdeadf7fb5786f5a5e60ebd3d7070f803e607ba696` |
| `content/fairy-godmother-v2.css` | `a7eb9a1857d19c01c2db532714bf97fa28b1d81dff082b7c4bfdf8f5d1d5961a` |
| `content/site/fairy-godmother-v2.js` | `d1b8c07d42645c7042d24f1f9dfe03eb7de6bdc5c158095b9967de4c56433ab6` |
| `worker-fairy-godmother/src/index.js` | `88c6aeda9d2f00dd8b4cc1b7d79f83f37fe1be465d43850a94211718dd2b9063` |
| `scripts/test-fairy-godmother-page-contract.mjs` | `58dc518f7cd14000e8d1f7a7526a6f805092955ac7714636f47fa7fde23972ad` |
| `scripts/test-fairy-godmother-browser.mjs` | `d9f73ea1563c5100b7be2e8883bddda88b1e0b5f497f3030d8f190f92086aee3` |

The production-v18 recovery artifact remains unchanged at
`127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e`.

## Verification

- `PASS FAiRY page typed/legacy contract`.
- `PASS FAiRY browser contract (41/41)` in real headless Chromium.
  - Desktop and 390px no-overflow.
  - Cottage and parlour imagery load as the building experience.
  - Exact typed-success sections render.
  - Success consumes the local preview and sends only `prompt` plus
    presentation `energy`.
  - Clarification, current-information, safety-boundary and outage fixtures
    render useful no-charge states without consuming the preview.
  - Returning preview, storage-denied and focus/live-region behavior pass.
  - 35 external analytics/font/service requests were deliberately blocked.
- Worker suite: 40/40 Node tests PASS.
- Frozen response evaluation fixture: 45 cases PASS.
- Frozen classifier fixture: 63 semantic + 16 architecture cases PASS.
- FAiRY owner-entry PASS.
- Scoped `git diff --check` PASS.

## Honest limits and remaining work

This proves an isolated, deterministic page/Worker contract. It does **not**
authorize or prove the still-blocked shared and external systems:

- no approved/configured semantic classifier, retrieval or answer provider;
- no verified account/guest identity or authoritative FAiRY Plays ledger;
- no authoritative case/version store for fittings;
- no live provider-data/retention/region/spend approval;
- no shared analytics admission or isolated staging bindings;
- no native Safari/VoiceOver, human answer-quality, Brand or public-origin
  review.

The public v18 endpoint and public page were not mutated or deployed.

## Exact next action

An independent product/UX/accessibility judge should rerun the exact static and
browser suites and inspect the rendered cottage/parlour/desk at desktop and
390px. A PASS admits only this isolated building/browser contract. Provider,
identity, Plays, staging and release remain separately blocked.

## Proactive improvement

Closed: result focus ownership now matches the visible response. Learning
recorded as BTB-204.
