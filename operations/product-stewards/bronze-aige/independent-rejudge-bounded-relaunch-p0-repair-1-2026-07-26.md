# Independent rejudge — BRONZE AiGE bounded relaunch P0 Repair 1

**Reviewer:** independent judge; author of the initial 55/100 FAIL, not the Repair 1 maker  
**Reviewed:** 2026-07-26T07:31Z  
**Candidate:** current source plus `maker-evidence-bounded-relaunch-p0-repair-1-2026-07-26.md`  
**Verdict:** **FAIL — Repair 1 does not clear the non-compensable trust floor.**  
**Weighted score:** **78/100**

Repair 1 genuinely closes five of the six initial P0 classes. It removes the
real service activation and bottle encouragement, enforces strict v2 receipt
shape/time/week rules, owns calendar-file failures, makes the standalone
episode cue evergreen, and prevents a pre-existing global audio adapter from
manufacturing playback.

The catalogue boundary is still not closure-private or injection-resistant.
A hostile non-configurable `window.LAIDIES_BWS_CATALOGUE` installed before the
product scripts load makes `bws-data.js` throw, is then captured as the
catalogue authority, and can visibly render and save injected service copy with
a success status. The same result reproduced from current source and a fresh
exact artifact.

## Scorecard

| Dimension | Weight | Score | Result |
|---|---:|---:|---|
| Product/content quality and real visitor value | 30 | 16/20 | Fail — the repaired ritual is coherent and useful, but its visible result boundary still accepts injected product copy. |
| Accuracy, safety and trust | 30 | 13/20 | Fail — canonical content and receipt checks are much stronger, but a pre-load global can replace their authority and manufacture a successful public result. |
| Positive LAiDIES contribution | 20 | 17/20 | Pass — the equal spirit-free social practice is distinctive, bounded and no longer carries the initial service/consumption promotion. |
| UX/accessibility/reliability | 15 | 18/20 | Pass locally — focus, 320px reflow, reduced motion, audio states and persistent calendar failures pass in Chromium; native assistive-technology proof remains held. |
| Technical/artifact integrity | 5 | 15/20 | Partial — ordinary source/artifact suites and byte parity pass, but the advertised immutable catalogue boundary fails before initialization. |
| **Weighted total** | **100** | **78/100** | **FAIL** |

Product/content quality, accuracy/safety/trust and positive LAiDIES
contribution are non-compensable and each must reach 17/20. The trust and
product floors remain below 17; the improved total cannot override them.

## Initial P0 disposition

| Initial P0 | Repair 1 disposition |
|---|---|
| Real CHAR No.5/Ryan activation and bottle encouragement | **Fixed locally.** Targeted source/meta/data/legacy scans found none of the prohibited copy. The admitted replacement is fictional, alcohol-optional and not a service claim. |
| Mutable/injectable catalogue authority | **Still P0.** Post-load replacement is blocked, but pre-load non-configurable global injection becomes the effective catalogue. |
| Arbitrary/future/duplicate local receipts | **Fixed in the repaired reader/writer.** Exact v2 keys, canonical IDs, zero future tolerance, timestamp-derived current/past ISO weeks and unique weeks are enforced; invalid bytes and unrelated storage are preserved. The remaining catalogue P0 can nevertheless supply a hostile object under a canonical-looking ID. |
| Silent calendar-file failure | **Fixed locally.** Blob/object-URL, click and revoke failures produce a persistent live failure and no download/add/book/reserve success claim. |
| Standalone unconditional current-week episode claim | **Fixed locally.** Standalone wording is evergreen/latest-published; embedded malformed, stale, mismatch and failure paths fall back without claiming currentness. |
| Pre-existing global audio adapter bypass | **Fixed locally.** The governed control retains private ownership; pending/rejected/error/ended states do not expose false pressed/playing state and the hostile global is not invoked. |

## Remaining P0 blocker

`content/site/bws-data.js` constructs a frozen catalogue in an IIFE, but exports
it by redefining `window.LAIDIES_BWS_CATALOGUE`. That is not a fail-closed
admission boundary. In a fresh browser context I installed a frozen,
non-writable, non-configurable object under that name before navigation. The
canonical script emitted:

```text
Cannot redefine property: LAIDIES_BWS_CATALOGUE
```

The embedded fortune controller then captured the hostile object. Selecting
the spirit-free lane and dealing visibly produced:

```text
INJECTED RYAN BOTTLE
```

It also wrote:

```json
{"version":2,"scope":"device-local","lane":"spiritFree","itemId":"spiritFree-01","moodId":"mood-1","savedAt":"2026-07-26T07:28:07.404Z"}
```

and announced:

```text
Spirit-free suggestion dealt. It is remembered on this device only.
```

The strict receipt schema cannot establish canonical provenance when the
catalogue used to validate and render its IDs can itself be supplied before
initialization. This is the same BTB-106 mutable-public-adapter class as the
initial blocker, narrowed from post-load mutation to pre-load capture.

## What passed independently

- Governed visible/meta/data/shared/legacy files contain no CHAR No.5, Ryan
  activation, bottle-as-responsible, “actually drink,” or related prohibited
  service copy.
- Cocktail and spirit-free lanes retain equal, complete result fields and
  explicit no-service/no-consumption boundaries.
- Strict v2 drink/coaster admission rejects arbitrary IDs, extra keys, any
  future timestamp, future/mismatched ISO week and duplicate weeks. Corrupt
  governed bytes and unrelated sibling storage are not rewritten.
- Successful calendar creation remains a local `.ics` download, not an
  add/send/book/reserve claim. Create, click and revoke failures are contained
  and remain visibly live without success language.
- Standalone copy is evergreen/latest-published. Embedded episode currentness
  remains dependent on an admitted index plus matching issue; malformed,
  stale, missing and failed inputs do not claim currentness.
- A pre-existing `playLaidiesTheme`, pending play, rejection, error and ended
  cannot manufacture `aria-pressed="true"` or a playing status.
- Spirit-free parity, the alcohol boundary, modal focus/return, 320px reflow,
  reduced motion and ordinary no-external-request checks pass.

## Evidence run independently

```sh
node scripts/check-product-stewards.mjs
# PASS: products=65; active=3/3

node scripts/check-bronze-aige-contract.mjs
# BRONZE AIGE CONTRACT PASS; checks=74

PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-bronze-aige-browser.mjs
# BRONZE AIGE BROWSER PASS; checks=56
# external_requests_completed=0; third_party_requests_blocked=87

node scripts/check-inline-js.js
# PASS: 352 scripts / 132 pages

node scripts/check-local-links.js
# PASS: 1,976 local references / 110 pages

node scripts/check-town.js
# PASS

node scripts/build-public-site.mjs \
  /tmp/laidies-bronze-rejudge-r1.oU4YCr
# Public artifact: 1,086 builder files / 961.5 MiB
# Existing over-750 MiB advisory

BRONZE_ROOT=/tmp/laidies-bronze-rejudge-r1.oU4YCr \
BRONZE_EVIDENCE_DIR=/tmp/bronze-rejudge-r1-evidence \
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
  node scripts/test-bronze-aige-browser.mjs
# BRONZE AIGE BROWSER PASS; checks=56
# external_requests_completed=0; third_party_requests_blocked=87

BRONZE_ROOT=/tmp/laidies-bronze-rejudge-r1.oU4YCr \
  node scripts/check-bronze-aige-contract.mjs
# BRONZE AIGE CONTRACT PASS; checks=74
```

The independent pre-load injection fixture reproduced the remaining hostile
outcome against both current source and the fresh exact artifact. The artifact
is local package evidence only, not deployment or public verification.

`find` counted 1,087 files including the build manifest; `du` reported 1.1G.

## Source/artifact parity

| Governed file | SHA-256 |
|---|---|
| `bronze-aige.html` | `c59a0cef80d4dc5af9cc818b28ac420fb5558b2abedb95be463d02291a332ecb` |
| `content/site/bronze-aige-v2.js` | `31005cb2c526d0a03c303d46f4a281cb35befc451d092088d8071ab1e9fd6e66` |
| `content/site/bws-data.js` | `35e0bee968c879e49c4ced364fff77a3034f3f55f81105bdb150ab459e1a434d` |
| `games/businesswomens-special.html` | `2dd64b170a73227e26e7c6872da3ae80cb076f24ea24c6af60407dd03417daa0` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |

Every listed source/artifact pair is byte-identical.

## Required repair and rejudge

Remove the pre-load global as catalogue authority. Consumers need a
fail-closed, internally captured canonical source whose identity cannot be
predefined through `window`; a collision must disable the fortune path with an
honest “nothing selected or saved” state. Add this exact pre-initialization
fixture to the governed source and exact-artifact suites, then obtain a fresh
independent score.

## Holds

- Ali's Cosmo/room visual approval;
- final Cosmo/room treatment;
- audio provenance, rights, public admission and KSVL relationship approval;
- native Safari, VoiceOver, 200% zoom and representative physical-device proof;
- approved privacy-safe analytics/event contract;
- exact deployed-origin journeys; and
- any alcohol partnership, promotion, affiliate, commerce, availability,
  service or venue activation.

## Learning scan

No canonical painpoint entry was written because this task authorizes one
independent Repair 1 report only. Reused BTB-106: freezing a global value after
construction does not make the authority private; test both post-load mutation
and pre-load non-configurable name capture.
