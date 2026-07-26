# LUMINAiRY Repair 3 maker evidence — deterministic modal focus P0

**Date:** 2026-07-26  
**Status:** **REPAIR 3 BUILT LOCALLY — REJUDGE REQUIRED**  
**Trigger:** independent Repair 2 rejudge `FAIL — 84/100`  
**Authority:** bounded local maker repair only; this is not independent
acceptance, editorial admission, owner approval, deployment or public truth

## Diagnosis

`openMavenBio()` focused the modal Close button synchronously and then
scheduled a second Close-button focus in `requestAnimationFrame`. If the first
Shift+Tab occurred before that frame, the trap correctly moved focus from
Close to the final Source link, but the pending callback could then move focus
back to Close. Identical artifact runs therefore disagreed without byte drift.
This was a real interaction race, not only a test timing problem.

## Repair

- Removed the deferred competing focus.
- The modal now transitions synchronously through explicit
  `data-focus-state` values: `closed`, `opening`, then `ready` only when the
  Close button is the actual active element; otherwise `failed`.
- Closing returns the state to `closed`, restores body scrolling and returns
  focus to the exact opener. Closing an already hidden modal is a no-op.
- The focus trap remains synchronous and wraps Close → Source on Shift+Tab,
  then Source → Close on Tab.
- Browser acceptance waits for the explicit `ready` state and exact active
  Close button. This is an awaitable product state, not a retry.
- Desktop and 320px tests separately assert initial focus, backward wrap,
  forward wrap, Escape return and close-button return. The existing 320px
  backdrop-return path also remains covered.
- The deterministic validator fails if the explicit state contract disappears
  or deferred Close refocus returns.

## Deterministic browser proof

The complete source suite ran five consecutive times. The complete suite
against one newly built exact artifact then ran five consecutive times.
Commands used a fail-fast loop (`|| exit 1`); no failed run was retried or
discarded.

```text
SOURCE RUNS 1–5: PASS
ARTIFACT RUNS 1–5: PASS
each run: 54 checks / 55 external requests blocked
focus failures: 0
```

The suite retains the Repair 2 signed positive control, self-rehashed unrelated
evidence rejection, five identity/context mutation rejections, disabled-JS,
missing-gate, registry/receipt outage, Foundress holds, modal contents,
storage-denial, mobile/reflow and reduced-motion assertions.

## Fresh exact public artifact

- Path: `/tmp/laidies-luminairy-repair3.gQE8K6`
- Builder: **1,086 files / 961.51 MiB**
- Missing dependencies: **0**
- Oversized individual assets: **0**
- Existing builder advisory: total exceeds 750 MiB
- Public metadata: **PASS**
- Exact-artifact claim validator: **PASS**
- All eight governed source/artifact pairs are byte-identical.

| Governed public file | SHA-256 |
| --- | --- |
| `luminairy.html` | `034ed9fd78bc908f1e825372c063c013fba6cff1b733b6f2689b42fbfbd0e864` |
| `content/luminairy-claims.json` | `dcffc5815ebd310a2f554eeed170b939268fbc5b66e8021a11de8a838664e589` |
| `content/luminairy-editorial-receipts.json` | `e4560e3e943992cde6d215baf727fe18af8cbc9494e5396b4f80ea4b35b51e61` |
| `content/site/luminairy-claim-gate.js` | `4f8f80d91c22273062c8434a3c2248d205d08a5be11bcf1c0c4bc7b3209e06f5` |
| `content/site/luminairy-v2.js` | `4e5caff65ff413b61d46cc017a54820d4dcaac1dec80f8e8772185d9663d92cb` |
| `content/luminairy-v2.css` | `b65c5b0835e065bdadc65c7b71a276abc85fd45095aa76681c46e173e5781350` |
| `content/site/sunnyvaile-directory.js` | `d7c57a6492c242b3e457ce4a487628db6d487fdec1773adf62f88d3fa14e76f8` |
| `content/site/sv-welcome-tour.js` | `63af2d875382edcb77f56f61c963459e0e44cf5ee0084dea69c926082458b71c` |

## Other verification

- source and artifact claim validator: **PASS**
- inline JavaScript: **PASS — 352 scripts / 132 pages**
- local links: **PASS — 1,974 references / 110 pages**
- Town consistency: **PASS**
- product steward system: **PASS — 65 products**
- scoped diff check: **PASS**

## Preserved holds

- all 46 production claim records and the empty production receipt manifest;
- independent Repair 3 rejudge;
- claim-by-claim research/editorial review and independently signed receipts;
- quotation, portrait, source and audio rights review;
- Ali's visual/taste approval and research-owner approval;
- manual VoiceOver/screen-reader, Safari, native zoom and physical-device
  evidence;
- KSVL playback, failure, accessible-control and rights evidence;
- Town Hall correction intake beyond honest preflight;
- privacy-safe analytics and representative newcomer comprehension;
- public-origin and release-provenance verification; and
- the 961.51 MiB artifact-size advisory.

## Boundary and learning scan

No registry trust, static hold, source/evidence, storage or public promise
contract was weakened. No central queue, registry, ACTIVE/PARALLEL record,
painpoints ledger, Git history, deployment, external service, correction
route, credential, audio or public surface was changed.

Reusable prevention rule: never schedule a redundant deferred focus after a
modal already established focus synchronously. Expose the interaction's
settled state, assert the exact active element, and repeat the immutable
artifact fail-fast when acceptance depends on timing. This is recorded here
because the bounded assignment prohibits a central painpoint edit.
