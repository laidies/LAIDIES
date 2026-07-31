# Postcard / Resident Card correction

**Status:** CORRECTED LOCALLY — Cycle 9 candidate only; no public deployment.

## Visible correction

- Removed the retired/cropped Post Office building from the Homepage Postcard handoff.
- Bound the section to the existing approved landscape artwork:
  `assets/postcards/from-sunnyvaile/greetings-from-sunnyvaile-post-card.png`
  (`1536 × 1024`).
- The artwork is rendered at its complete `3:2` ratio with `object-fit: contain`;
  it is not stretched and no sign, person or postcard edge is cropped away.

## Product-behaviour correction

The governing contract is one Resident Card signup:

1. `Send me the Wednesday Postcard` is selected by default.
2. The visitor can untick it before submitting if she does not want the email.
3. A visitor who does not want a Resident Card can still request the Postcard
   separately at the Post Office.

The Cycle 9 Homepage copy, `privacy.html`, the Post Office newsletter-delivery
spec and decision `D-2026-07-29-082` now state the same contract.

## Verification

- Approved postcard exists and reports `1536 × 1024`.
- Candidate script parses successfully with `node --check`.
- Local preview server returns HTTP `200` for the exact postcard asset.
- The retired `13-sunnyvaile-post-office.png` reference is absent from the
  Cycle 9 candidate.
- Existing `script.js` checks confirm the saved preference defaults to true,
  renders checked unless explicitly false, submits only while selected, stores
  the preference and invokes the Buttondown handoff.

## Remaining release truth

The exact default/opt-out logic exists in `script.js`, but the currently active
Resident Card surface on this branch is a local-only holder and does not mount
that combined email form. This correction does not claim that the account-backed
one-signup journey has been integrated or publicly released. That UI/release
reconciliation remains a separate operational gate; the Homepage candidate no
longer misstates the intended behavior while it is completed.

