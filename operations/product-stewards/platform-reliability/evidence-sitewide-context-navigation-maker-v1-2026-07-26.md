# Shared contextual navigation — maker evidence v1

**Date:** 2026-07-26  
**Status:** VERIFIED LOCALLY — BEHAVIOR ONLY / DISTRIBUTION BLOCKED  
**User-reported failure:** A phone visitor could reach pages with no visible
Back or Previous control and had to rely on browser navigation.

## Exact diagnosis

`content/site/sv-back-nav.js` returned before mounting unless
`document.referrer` was present, same-origin and different from the current
path. Direct entry, external/social/email entry, bookmarks and new tabs
therefore produced no return control. Its mobile presentation was also a
30-pixel icon with a hover/focus-only text label.

The source inventory contains 196 HTML files outside `operations/` and
`node_modules/`. Only 18 directly load `sv-back-nav.js`. The shared header is
loaded by 76, but it does not yet distribute this candidate. This maker repair
therefore does **not** establish sitewide reach.

## Candidate behavior

- Same-origin prior page: an ordinary anchor carries the exact pathname and
  query as its deterministic return target; browser history is used only when
  the recorded referrer is same-origin.
- Direct, external, bookmark and new-tab entry: visible `SUNNYVAiLE home`
  fallback to `/`.
- Direct/external entry already on `/` or `/index.html`: no redundant home
  control.
- Mobile: readable text without hover, 48-pixel height, safe-area-aware
  bottom/right placement.
- Existing duplicate-mount guard remains in place.

## Bound evidence

| Artifact | SHA-256 |
|---|---|
| `content/site/sv-back-nav.js` | `8a777b88fdebe077c3987b1b869c24350d28ea3fba5a3e01ac91f24e33e7c778` |
| `scripts/test-sitewide-context-navigation.mjs` | `03206ca4e160102ba780de007dd736e9ab34ebb2b4707df1a2d64d91475e846a` |

Command:

```text
node scripts/test-sitewide-context-navigation.mjs
```

Result:

```text
SITEWIDE CONTEXT NAVIGATION PASS scenarios=4 mobile_touch_target=PASS
```

The four deterministic states are direct mobile entry, same-origin internal
return, external/social entry and direct home entry. JavaScript syntax and
scoped diff checks also pass.

## Remaining release gate

Platform owns the successor distribution lock after its active shared-header
asset/cache binding closes. It must choose and independently verify either a
shared-header import/injection or a curated include sweep, prove exact consumer
coverage, preserve ordered-product Previous/Next controls, prevent duplicate
mounts and reaccept representative consumers. No header, route include set,
deployment or public page changed in this maker lane.

