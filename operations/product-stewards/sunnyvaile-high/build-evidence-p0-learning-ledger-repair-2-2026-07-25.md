# SUNNYVAiLE High P0 learning-ledger repair 2 evidence

**Status:** VERIFIED LOCALLY — FIVE INDEPENDENT-REVIEW DEFECTS REPAIRED;
INDEPENDENT RE-REVIEW AND ALL CONTENT, REWARD, ACCOUNT, SAFARI/VOICEOVER,
PUBLIC AND OWNER GATES REMAIN HOLD.

## Trigger and boundary

The independent review of
`build-evidence-p0-learning-ledger-2026-07-25.md` returned **FAIL / HOLD** with
five bounded defects. This maker cycle repairs exactly those defects and adds
regressions for each one. It does not approve any class or quiz content,
connect a reward/account ledger, deploy, publish, inspect credentials, use an
external service, add a visual or change Git state.

## Five repairs

1. **Unsupported reward connection removed.** The Report Card now shows local
   quiz attempts, not derived “banked” clips, and no longer links or claims to
   fill a Closet jar. Quiz butterfly ratings explicitly say they are
   just-for-fun and are not a stored clip balance.
2. **Superlative framing reconciled.** Static and calculated states now use
   “Calculated on/from this device” or “No local quiz yet.” No voting claim
   remains in the Yearbook result.
3. **Valid-empty register recovered.** A successful
   `{"subjects":[],"classes":[]}` register response now enters the same useful,
   independent unavailable/recovery state as a non-OK or malformed register
   instead of leaving a blank class area.
4. **Blocked persistence made honest.** Storage writes now return
   device/session scope. A blocked write keeps the current interaction useful
   in memory but says “session only,” never says saved, and explicitly says the
   result will not survive reload. Reload returns to “not taken.”
5. **200% proxy reflow repaired.** High's two-column homeroom, corridor grid,
   header actions and final calls-to-action now use intrinsic wrapping and
   bounded min-content behavior. The seeded 640px/200% proxy has no horizontal
   page overflow while 320px, 390px and 1280px reduced-motion layouts retain
   ordinary reflow.

## Deterministic source proof

`node scripts/test-sunnyvaile-high-contract.mjs`

**PASS — 11 contract groups**, including valid-empty register failure,
non-reward/non-voting result language, storage scope/session copy and explicit
zoom/reflow rules.

`HIGH_PLAYWRIGHT_ROOT=/tmp/laidies-high-pw.8bUJ9V HIGH_URL=http://127.0.0.1:8876 node scripts/test-sunnyvaile-high-browser.mjs`

**PASS — 10 local Chrome journeys**

1. unknown class fails closed;
2. valid-empty building register shows a useful recovery state;
3. register service failure shows the disabled recovery state;
4. the unfilmed preview dialog traps/restores focus and closes on Escape;
5. clean 320px Report Card states device scope without overflow;
6. seeded returning state shows attempts and calculated, non-reward language;
7. quiz explains answers, increments attempts, retains best and scopes storage;
8. blocked storage uses session-only copy and resets after reload;
9. seeded 200% zoom proxy has no page overflow; and
10. 320px, 390px and 1280px reduced-motion layouts retain ordinary reflow.

Supporting checks:

- `node scripts/check-inline-js.js`: **PASS**, 353 scripts / 132 pages.
- `node scripts/check-local-links.js`: **PASS**, 1,941 references / 110 pages.
- `node scripts/check-product-stewards.mjs`: **PASS**, 65 products and 3/3
  active bounded lanes.
- `node scripts/check-town.js`: **PASS**.
- scoped `git diff --check`: **PASS**.

The browser dependency remains isolated in a temporary `/tmp` package root;
the repository dependency set was not changed.

## Fresh exact local public artifact

`node scripts/build-public-site.mjs /tmp/laidies-high-repair2.Sv4pus`

- **PASS:** 1,071 files / 958.64 MiB.
- The existing 750 MiB builder warning remains. This cycle does not approve
  deployment size, duration or owner policy.
- Public metadata validation passed.
- All 10 High browser journeys passed against the fresh artifact at a
  temporary local HTTP origin.
- Source and artifact SHA-256 values matched exactly:

| File | SHA-256 |
|---|---|
| `sunnyvaile-high.html` | `977e13ac3bb947c0bbdea1ddbc2e84256fb9a72e680be0e6a3956d8eaa1b4085` |
| `learn/class.html` | `00e36bbb965032725dd48845018fcc7de4320eae0039dc9c602b8605c9bbce5a` |
| `learn/quiz.html` | `bac1536f9c0b9141dc17630f8f8b6272e335be4cd72222c9cdd38874d79b5c79` |
| `script.js` | `ed9b81c441b7e40b29da3f959b8b5fd345df80a3a2ffdca7786d777e1dc12b4d` |
| `content/site/high-classes.json` | `a2070255737daeee50b55700d5f17ea76e4301ae3d1447f34ff361feefdf4309` |
| `content/site/quizzes.json` | `ff01b28a698ac949853deea1770429016ed15de1210039b3ad20125b1fc51741` |
| `content/site/site-data.js` | `b629c8c22abf68f1beb6c508e35d5cf909f26e46141d47d995398e255c4e14e0` |
| `content/site/sunnyvaile-high-v2.css` | `bbe51398156f9ab726de911da214323f253b553a38cc5120f10410d4f2ad2aca` |

This is exact local artifact evidence, not deployment or public-origin proof.

## Independent re-review request

The independent judge should reproduce all five original failures against the
fresh candidate, then attack for adjacent contradictions:

- strongest seeded local scores and repeat attempts;
- blocked storage before and after reload;
- valid-empty, malformed and non-OK registers;
- Yearbook labels, Report Card summaries, quiz results and outbound reward
  destinations;
- 200% proxy plus native zoom, Report Card, Yearbook, classroom and quiz
  reflow; and
- exact source/artifact identity.

Maker evidence does not judge itself. Promotion remains on HOLD pending that
review.

## Gates deliberately still open

- no filmed, sourced, captioned and instructionally approved representative
  class exists;
- quiz content has not passed representative accuracy/assessment approval;
- no authoritative reward/account duplicate/failure/two-device contract is
  proven;
- no Safari, VoiceOver or native-browser-zoom evidence was produced;
- privacy/Clarity and approved learning analytics remain open;
- Book Fair stock/spend/refund/fulfilment remains open;
- exact deployed artifact/public origin remains unverified; and
- no owner approval or public readiness decision is implied.

## Learning scan

- **Observed failure:** breakpoint-only responsive rules can pass narrow
  viewport tests yet fail when zoom makes the effective content box narrower
  without changing the CSS media-query width.
- **Prevention rule:** core grids must reflow from available space with
  intrinsic `auto-fit`/bounded `minmax` behavior; pair viewport checks with a
  200% zoom proxy and native zoom before promotion.
- **Observed failure:** an in-memory fallback is useful but is not saved state.
- **Prevention rule:** persistence helpers return their actual scope, and the
  rendered result must branch on that scope; test the message and state again
  after reload.
- The canonical painpoints ledger was searched earlier in this lane. It is not
  edited here because the parent owns canonical reconciliation.
