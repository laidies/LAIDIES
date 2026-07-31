# Control Room handoff — Blend & Snap Wave 1 café candidate

**Status:** `SUPERSEDED — replaced by BAS-FAILURE-01 successor handoff`  
**Evidence time:** 2026-07-27 America/Vancouver  
**Scope lock:** `operations/design-explorations/building-wave-1/blend-snap/**` only  
**Successor:** `CONTROL-ROOM-HANDOFF-WAVE-1-CAFE-CANDIDATE-SUCCESSOR-2026-07-27.md`

## Visible result

The candidate at
`operations/design-explorations/building-wave-1/blend-snap/index.html` turns
Blend & Snap into JoJo’s café ritual rather than a generic menu/card page:

`enter counter → understand live Special → choose optional device-local usual → ORDER → read one honest pickup receipt → take an exact available handoff or return`.

The counter, order rail, receipt printer and noticeboard are real environmental
objects. The current episode number, all component availability, links and
limits stay in semantic HTML. The candidate never awards, completes, owns,
syncs or claims account access.

## Exact candidate identity

| File | SHA-256 |
| --- | --- |
| `index.html` | `473652ddd7bf74a708bda05c92e237bd04731697998463f6d33dc9dd7989f4e5` |
| `candidate.css` | `2bd6b6980c0b6bbca77570b5c72f126a64cfd1152bdca3d028fa468cc0ebf950` |
| `candidate.js` | `dbe54cf38a6ce4da4692779900dba723af7dd0a2e594fbd44c498b3b51354826` |
| `test-candidate.mjs` | `606abab67e31ec3a0da5dc8b563d8e9d20b8eb28a3614e74c808f4959077379d` |

Candidate-only art inputs are recorded in
`operations/design-explorations/building-wave-1/blend-snap/KEEP-ADAPT-REJECT.md`.

## Tests

`node operations/design-explorations/building-wave-1/blend-snap/test-candidate.mjs`
returned:

```text
✓ BLEND & SNAP ISOLATED CANDIDATE: 94 checks · desktop/mobile/four visitor states/inventory/study/cards/failures/focus/storage/handoffs
```

Checks include 1440/390/320 composition, four visitor states, ordered receipt
focus/return, reduced motion, no-JS bounded fallback, loading/offline/stale/
disagreement fail-closed states, storage denial, and exact component-route
truth. `node --check` and scoped `git diff --check` also pass.

## Explicit component truth

- Study Sheet: planned, no link.
- Try-On: available handoff.
- Cheat Sheet/timeline: available printable handoff.
- Concept/character cards: unavailable, no link or ownership claim.
- Quiz: available separate next-door assessment.

The activity samples remain visibly unadmitted interaction grammar only and do
not change any current component status.

## Remaining work / next exact action

**Independent candidate review** must judge the bound source/render tuple for
visual/JoJo continuity, ten-second comprehension, component-job separation,
truth/failure behavior, keyboard/reduced-motion/no-JS boundary, desktop and
mobile. It must return checksum-bound PASS/HOLD. Native Safari/VoiceOver,
human 200% zoom, real component receiving outcomes, actual Study Sheets/cards
and final visual authority remain separate gates.

No production route, shared CSS, manifest, KSVL control, shared asset,
backend, integration, deployment or publication changed.
