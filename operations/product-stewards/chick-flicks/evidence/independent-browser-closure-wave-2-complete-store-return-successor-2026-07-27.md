# Chick Flicks Wave 2 return successor — independent browser closure

**Verdict:** **ACCEPT — exact isolated Wave 2 candidate only.**

This closure resolves the browser-runtime HOLD recorded in
`independent-wave-2-complete-store-candidate-return-successor-rejudge-2026-07-27.md`.
It does not modify or admit the production Chick Flicks route, episode media,
shared code, deployment or public state.

## Frozen tuple

| Input | SHA-256 |
| --- | --- |
| Maker evidence | `14622a0bfbd6dc983fa78e7494b70b7d48537ae060046ce26646cf92a418f113` |
| Candidate HTML | `663bf315ae841e121076969fe4c7942b17b9541116e5042a348cb3fadbe0b1db` |
| Candidate CSS | `102bdf2fc17873ca17787225ff5758f3477641f0ca5815c0efee87e5650f3626` |
| Candidate controller | `b9476ad73286ce14cfdc1a14d8dea33698c3f8e9a89d20b0e1d0acd9b6514896` |
| Deterministic test | `9cdee52d8370acae16eefeab6182a8377387ec91d758530db8d2e0de260087f6` |
| Text-safe store art | `3f424a7b0c5441e176c844c2c657fb54dd2d378863c95f8483277504bb8917d3` |

## Independent browser execution

The exact candidate was served read-only from the repository root and exercised
in the Codex in-app browser. No page or storage mutation was performed outside
the candidate's own visible rental controls and documented fixtures.

- At 1440×900, the exact public Episode index produced four rentable tapes and
  one forthcoming tape. The room artwork loaded at its native 1672×941 size.
- The visible `Rent the latest released tape` control selected Episode 04,
  focused the rental card and exposed only its safe issue handoff.
- Activating `Take the tape home`, returning to the store and reloading rendered
  `YOUR LAST RENTAL · ON THIS DEVICE` with the exact Episode 04 title.
- `Continue with this tape` selected the same validated published tape and
  focused its rental-card region. The page remained exactly 1440 CSS pixels
  wide with no horizontal overflow.
- `Clear and start over` hid the return panel and restored focus to
  `Rent the latest released tape`.
- At 390×844 and 320×720 the document and body widths exactly equalled the
  viewport, the room and tape artwork loaded, and no image had zero natural
  width.
- The documented fixture matrix was executed at 390px:
  - `last-rental-valid` rendered only the exact Episode 04 device-local
    continuation.
  - `last-rental-stale`, `last-rental-corrupt` and `storage-denied` rendered no
    continuation.
  - `clear-denied` retained the continuation, kept focus on `clearRental` and
    reported that nothing was changed.
- At 320px, `browser-reload-clear` completed the physical write → reload →
  validate → clear journey, set its PASS marker, hid the return surface,
  restored focus to `latest`, showed no broken image and fit the viewport.

The only browser log was a localhost analytics-script warning from the
third-party Plausible loader; there was no candidate runtime error.

## Combined judgment

The first independent review already passed the unchanged room art, eight aisle
filters, unavailable/malformed index handling, held-tape truth, cover fallback,
reduced-motion behavior and complete building handoffs. The successor changed
only the previously missing return-consumer journey. The independent static
rejudge matched every successor hash and found no code defect; this browser
closure executes the exact missing journey and failure matrix.

Reason codes:

- `PASS_EXACT_FROZEN_TUPLE`
- `PASS_WRITE_RELOAD_VALIDATE_RENDER`
- `PASS_DEVICE_ONLY_CONTINUATION`
- `PASS_CONTINUE_CLEAR_KEYBOARD_FOCUS`
- `PASS_STALE_CORRUPT_DENIED_FAIL_CLOSED`
- `PASS_1440_390_320_CONTAINMENT_AND_ART`
- `ACCEPT_ISOLATED_WAVE_2_CHICK_FLICKS_CANDIDATE`

Native Safari/VoiceOver, Brand/owner admission, production integration, release
and public-origin proof remain separate. This ACCEPT does not promote any
episode or create account, ownership, history, progress or cross-device truth.

## Learning scan

BTB-199 already records the reusable prevention rule: persistence is not a
return experience until write → reload → current-authority validation → render
→ continue/clear and failure paths are exercised in a real browser.
