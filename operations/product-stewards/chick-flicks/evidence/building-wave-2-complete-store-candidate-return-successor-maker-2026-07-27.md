# Chick Flicks Wave 2 return-continuation successor — maker evidence

**Status:** BUILT LOCALLY — exact independent successor re-review required.

This candidate-only successor addresses the single HOLD in
`independent-wave-2-complete-store-candidate-review-2026-07-27.md`: the prior
store wrote `laidies_cf_last_rental` but did not render a useful later-visit
continuation.

## Exact tuple

| File | SHA-256 |
| --- | --- |
| `operations/design-explorations/building-wave-2/chick-flicks/index.html` | `663bf315ae841e121076969fe4c7942b17b9541116e5042a348cb3fadbe0b1db` |
| `operations/design-explorations/building-wave-2/chick-flicks/chick-flicks-candidate.css` | `102bdf2fc17873ca17787225ff5758f3477641f0ca5815c0efee87e5650f3626` |
| `operations/design-explorations/building-wave-2/chick-flicks/chick-flicks-candidate.js` | `b9476ad73286ce14cfdc1a14d8dea33698c3f8e9a89d20b0e1d0acd9b6514896` |
| `operations/design-explorations/building-wave-2/chick-flicks/test-candidate.mjs` | `9cdee52d8370acae16eefeab6182a8377387ec91d758530db8d2e0de260087f6` |
| candidate README | `d4c474d354a0ce7f381e37b737d31f2d98e305e63a3c00571a54681063af9650` |
| unchanged text-safe art | `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3` |

## Literal repair

- A later visit reads `laidies_cf_last_rental` only after the current index has
  loaded.
- The return panel appears only when the stored value is exactly a two-digit
  episode number whose current row remains `published` and has a safe Episode
  01–04 issue URL.
- Its wording is explicitly **on this device**. `Continue with this tape`
  selects the exact validated tape and moves to the rental card; it does not
  claim resume progress, completion, history, ownership or account state.
- `Clear and start over` removes only the local last-rental key, hides the
  panel and restores keyboard focus to the enabled latest-tape control.
- Stale/draft Episode 05, corrupt values and storage-denied reads show no
  continuation. Invalid values are removed best-effort. A denied clear leaves
  the panel visible, keeps focus on the clear control and reports that nothing
  was changed rather than painting success.

## Verification

- `node --check .../chick-flicks-candidate.js` — PASS.
- `node .../test-candidate.mjs` — `CHICK FLICKS WAVE 2 SUCCESSOR PASS` with
  valid, stale, corrupt, read-denied, clear-denied and browser-reload-clear
  contracts.
- Local Chromium 390×844 real storage write → page reload → keyboard-focused
  clear cycle produced `body[data-browser-reload-clear="pass"]` and
  `body[data-viewport-fit="pass"]`; the local key was absent after clearing and
  focus was on the latest-tape control.
- The clear-denied browser fixture produced
  `body[data-clear-denied="pass"]`, `data-viewport-fit="pass"`, kept the return
  surface present and rendered the failure message.
- Separate 390×844 stale, corrupt and storage-denied browser renders each kept
  `#returnVisit[hidden]`; corrupt and denied renders also recorded viewport
  fit PASS.
- Scoped `git diff --check` — PASS.

## Boundaries and next action

No art, production `chick-flicks.html`, `watch.html`, episode media, shared
file, integration, deployment or public state changed. The only next action is
an independent re-review of this exact successor tuple. Existing native
Safari/VoiceOver, Brand/owner, Screening Room admission and public-origin gates
remain separate and unchanged.

## Learning scan

The original interaction tested the storage write but not its consumer on the
next load. Reusable prevention rule: any persisted product hint must be tested
as a full write → reload → validate-current-authority → render → clear/fail
journey; a successful local write is not a returning-user feature.
