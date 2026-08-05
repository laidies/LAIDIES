# Held-media derived source narrowing — maker receipt

**Recorded:** 2026-08-03 America/Vancouver  
**Status:** **MAKER COMPLETE — INDEPENDENT JUDGMENT REQUIRED**  
**Scope:** public-build dependency narrowing for held Screening Room programmes  
**Release effect:** none; all five programmes and the whole-town release remain `HOLD`

## Result

The public builder now consumes cover-only derived cue editions for the held
Trailer and Episodes 01–02, matching its existing treatment of held Episodes
03–04. The original cue sheets remain intact for internal review. This removes
unapproved source-scene dependencies from the public artifact without admitting
assets, weakening default-DENY, changing title admission, or publishing media.

The Trailer's two references to the superseded `pc-dial-up.webp` path were
rebound to the exact runtime-member `pc-dial-up.png`. No other Trailer cue
content changed.

Builder-reachable binaries fell from **618 to 582**; default-denied binaries
fell from **616 to 580**; prohibited source references fell from **41 across 25
paths** to **31 across 19 paths**. Missing dependencies remain **0**. The real
builder still fails closed on the remaining 31 references, as required.

## Exact candidate

| Artifact | SHA-256 |
| --- | --- |
| `content/episodes/episode-trailer-cues.json` | `225e72a2b15590fce89737ccc8eead81cef153de1268b1a07a7303fc4d28341a` |
| `content/episodes/screening-room-admission.json` | `8e82784c252e6d8b6cc7a1f4712c64b01dfeb985edd28d3734053d16a97394c8` |
| `content/episodes/screening-room-derived-editions.json` | `e1e11d444e3bc4399ed95ca70f05fc909f52ce08c2d019df74695957df547343` |
| `public-asset-inventory.json` | `ecd195fee11f0f6575ee53638233b1e7247cf08b45903c361138231ac22606a5` |
| `scripts/build-public-site.mjs` | `8e8eebd94325bc98b8e50fc27d02be24b093800e78412612723a29a885160428` |
| `operations/assets/active-asset-registry.json` | `40558077f56c372d8beac10706a65604d5347a05fe835a53285d4b05f1ece927` |

## Acceptance evidence

- `node scripts/test-screening-room-contract.mjs` — PASS; five programmes,
  zero motion films, exact title holds preserved.
- `node scripts/test-active-asset-admission.mjs` — PASS; default-DENY retained.
- `node operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/check-builder-inventory-parity.mjs` — PASS; 31 exact prohibited references, `missing=0`, `fail_closed=true`.
- `node operations/product-stewards/platform-reliability/evidence/public-asset-closure-2026-08-03/test-public-asset-source-narrowing.mjs` — PARTIAL PASS; 582 binaries, six families/256 members, 267 exclusions, 31 remaining reference holds across 19 paths.
- `node scripts/build-public-site.mjs <temporary-output>` — expected FAIL on the remaining prohibited references; no public artifact released.
- `node scripts/check-opening-day-program.mjs` — PASS specification; 0/17 buildings and 0/5 media programmes release-ready; launch remains HOLD.

## Judge question

Independently verify the exact hashes, confirm that the public runtime already
uses these cover-only derived editions for held programmes, confirm that source
review cues were not deleted, and decide whether this bounded narrowing may be
accepted while the remaining asset closure stays blocked.
