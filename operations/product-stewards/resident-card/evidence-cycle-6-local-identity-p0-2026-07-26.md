# Resident Card Cycle 6 local-identity P0 evidence

**Date:** 2026-07-26  
**Maker verdict:** **LOCAL PASS — INDEPENDENT, OWNER, NATIVE, ARTIFACT AND PUBLIC GATES OPEN**

## Implemented

- Replaced the held account-form route with an honest local Card status and
  doorway.
- Removed hidden email/newsletter/profile/reset controls, Supabase config and
  magic-link resend observer from the route.
- Added a read-only v1 envelope parser with bounded allowlisted text fields;
  markup-like and control-character values are rejected rather than merely
  escaped into the oversized display title.
- Added explicit empty, saved, invalid and storage-unavailable outcomes.
- Added a valid local-handle projection labelled as draft-only.
- Hid the Closet continuation unless a valid Card exists.
- Added explicit separate-progression and no-account/public/reward authority
  language.

## Test evidence

- `node scripts/test-resident-card-contract.mjs` — **PASS 19/19**
- `node scripts/test-resident-card-browser.mjs` — **PASS 28/28**
- Browser fixtures cover:
  - newcomer;
  - valid returning Card;
  - user-string HTML injection;
  - valid and invalid handles;
  - malformed JSON;
  - unsupported version;
  - empty/overlong field projection;
  - storage `SecurityError`;
  - 320, 390 and 1280 CSS pixel reflow;
  - keyboard focus;
  - absence of account/profile backend requests.
- `git diff --check` on the implementation/test files — **PASS**
- Visual inspection:
  - `evidence-cycle-6-local-identity-p0/resident-card-returning-1280.png`
  - `evidence-cycle-6-local-identity-p0/resident-card-newcomer-320.png`
  - Hostile title pollution found during the first visual pass was repaired by
    rejecting markup-like values; regenerated evidence is clean.

## Remaining evidence

- Independent source and exact-artifact rejudge
- Ali visual/taste and comprehension approval
- Representative newcomer/returning-user session
- Safari, VoiceOver and native zoom
- Product-specific analytics/VOC baseline
- Public origin and release provenance
- Shared-header `Account status` / `Join` wording reconciled with the held
  account contract

## Release truth

No deployment, production account/provider action or public verification was
performed. Account, public Card, reserved handle and cross-device claims remain
unavailable.
