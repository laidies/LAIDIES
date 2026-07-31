# Community legacy Resident Card boundary — maker evidence

**Status:** `FIXED LOCALLY — INDEPENDENT REVIEW PENDING`  
**Date:** 2026-07-27

## Verified defect

`community.html` read the obsolete `laidies-my-card` browser key and
interpolated unvalidated `name`, `photo`, `role`, `journey`, `tools` and
`helpWith` values into `innerHTML`. It then created a Community card and
overlay record from those values.

The actual function accepted a hostile name containing an image with an
`onerror` handler. This violated the Resident Card contract in two ways:

1. device-local values became Community identity; and
2. stored values entered markup instead of text-only DOM paths.

The same page also promised cross-device progress and an email-based Resident
Card sign-in even though the current Card is explicitly a device-local
keepsake with no account backend.

## Exact bounded fix

- Removed the complete legacy `loadMemberCards()` consumer and its invocation.
- Removed the `laidies-my-card` read and dynamic `cardData['my-card']` path.
- Replaced the false account/cross-device CTA with the current device-local
  boundary: the Card stays in this browser, is not Community sign-in and does
  not unlock or publish anything.
- Preserved all seven static Community cards, filtering, keyboard overlay
  activation, Escape close and focus return.
- Preserved unrelated existing metadata edits in the dirty worktree.

Exact current bytes:

- `community.html` SHA-256
  `349f5c04fb4f5473913f5b0e597675cf3956dfcd292bae497e18cfc76d382c52`
- `scripts/test-community-resident-card-boundary.mjs` SHA-256
  `0b0e003dab5bc4dfe5cd1846ee525681f5029b60e07126d29dcb624ff9133c5d`

## Verification

`COMMUNITY RESIDENT CARD BOUNDARY PASS checks=17 legacy=absent hostile=contained stock=preserved`

The real-browser regression injects hostile values into the exact legacy key
before page load and verifies:

- no eighth card or `my-card` appears;
- no hostile image markup appears or executes;
- the stock card still opens by keyboard;
- the overlay still closes with Escape and returns focus;
- the static member filter still exposes exactly four bounded records.

The 31-check Resident Card contract and 66-check Sorority House contract also
pass. Scoped diff checking passes.

## Authority boundary

This fix does not create Community membership, identity, account state,
provider sign-in, publishing, cross-device recovery, deployment or public
proof. Any future local orientation tile must use the shared Resident Card
projection and safe DOM rendering, remain explicitly device-local and receive
its own product/identity/accessibility acceptance.

