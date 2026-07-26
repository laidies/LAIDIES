# Chick Flicks exact-artifact catalogue/discovery maker evidence

**Maker verdict:** READY FOR INDEPENDENT REVIEW. No self-approval, deploy,
publication, external mutation, media craft approval or owner visual approval
occurred.

## Candidate identity

- Exact artifact: `/tmp/laidies-chick-flicks-candidate.BDB8aW`
- Builder-reported payload: 1,074 public files plus `build-report.json`;
  1,004,964,989 apparent bytes (958.41 MiB)
- `chick-flicks.html` source/artifact SHA-256:
  `61d29f676498a5a99a1fa075d1593f1657f408defb90f7423d520dc687c26146`
- `content/chick-flicks.css` source/artifact SHA-256:
  `4dd6caed267a5b9f5ddf30f901714afc7934b4d20a25536e559fbf20873f38f0`
- `content/episode-index.json` source/artifact SHA-256:
  `52f0d24e7a9ab4aa6d44164864a7f101c04fe2d8652158c646e4fefec52a240a`
- Contract-test SHA-256:
  `d841f485c0d37b1f28f401e8984291b8e8a6cada41b101d0bb2a95c5c22ae151`
- Browser-test SHA-256:
  `5a7e588387e8984e3e1ba39fbeca8ef0efd3162502de3216c146edf816055fac`

All four published issue destinations and all five indexed VHS box assets were
present in the candidate.

## Verification results

| Check | Result |
|---|---|
| Chick Flicks contract | PASS — 10 checks |
| Source browser suite | PASS — 16 journeys |
| Exact-artifact browser suite | PASS — same 16 journeys |
| Inline JavaScript | PASS — 353 scripts across 132 live pages |
| Town integrity | PASS |
| Local links | PASS — 1,940 references across 110 pages |
| Product steward system | PASS — 65 products, 3/3 active, 7 events, 30 guild roles |
| Public metadata validator against candidate | PASS |
| Scoped `git diff --check` | PASS |

The browser suite covers new and returning visitors; released/forthcoming and
every aisle including an empty aisle; exact issue handoff; keyboard focus;
blocked storage; stale dates; missing, empty, duplicate and malformed indexes;
external, unsafe and missing issue URLs; broken covers; retry without reload;
reduced motion; 320/390/1280 layouts; a 200% reflow proxy; and trailer
listen-along wording.

## Defects found and repaired

1. Static and promotional copy could claim Episode 04/current-Wednesday
   arrival even when runtime data disagreed. The candidate uses validated
   **latest released** language and has an honest loading/failure state.
2. `published` alone could create a rentable tape. The candidate validates
   schema, uniqueness, safe same-origin issue URLs and destination existence.
3. Favourite copy implied a member/Resident Card relationship that did not
   exist. The candidate states browser/device-only persistence and reports
   storage failure.
4. Tape selection scrolled to detail without moving focus. The selected result
   is now focusable and receives focus with reduced-motion handling.
5. Author CSS overrode the native `[hidden]` state, exposing a forthcoming
   issue action. A page-scoped `[hidden]` rule now preserves the semantic and
   visual state.
6. Shared-header and label geometry overflowed in the 200% proxy. Page-scoped
   containment/wrapping repaired the bounded catalogue without changing shared
   chrome.
7. Missing manifests left contradictory static information on different
   layouts. Both layouts now fail closed and expose one retry action.
8. Broken cover art had no useful recovery. A readable fallback appears while
   a valid issue remains usable.

## Holds and limits

- Trailer and Episodes 1–4 motion films remain **HOLD**. The candidate promotes
  only the existing illustrated, captioned listen-along.
- Current `candidate-v1` room/rental-card visuals are not owner-approved. No
  visual was generated or replaced.
- Human comprehension sessions, Safari/VoiceOver, colour contrast,
  public-origin checks and field performance remain open.
- No approved analytics/privacy learning loop exists.
- No authoritative current-week freshness threshold or complete
  homepage/watch/KSVL fan-out contract exists.
- The registry-referenced Screening Room dossier remains absent.
- The artifact is above the builder's 750 MiB advisory threshold; that
  pre-existing release concern is not approved by this packet.

## Learning scan and prevention

Two non-obvious failures qualify for the canonical painpoints ledger:
`[hidden]` can be defeated by author `display` rules, and 200% reflow must
measure the full page rather than the component alone. The prevention rules are
to assert both semantic and computed visibility for every dynamic action and
to test document-level overflow at zoom/reflow proxies. The trigger restricted
edits to Chick Flicks source/tests/dossier/state, so the independent release
owner/orchestrator must merge these two lessons into
`operations/painpoints-log.md` rather than this maker editing the shared ledger.

## Primary standards

- W3C [Web Content Accessibility Guidelines
  2.2](https://www.w3.org/TR/WCAG22/), accessed 2026-07-25.
- W3C [Understanding Focus
  Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html),
  accessed 2026-07-25.
