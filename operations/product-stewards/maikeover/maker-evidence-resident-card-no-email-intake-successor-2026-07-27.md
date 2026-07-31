# MAiKEOVER maker evidence — Resident Card no-email-intake successor

**Evidence time:** 2026-07-27 (America/Vancouver)  
**Status:** `BUILT LOCALLY — MAKER PASS / INDEPENDENT REJUDGE PENDING`

## Why a successor was required

The predecessor closed-intake repair correctly restored the visible account-desk
hold and safe MAiKEOVER route, but it also retained an obsolete email field and
submit button inside a hidden/inert panel. That passed the narrow MAiKEOVER
check while failing the stronger Resident Card contract:

`held route ships no email intake`

This successor preserves the visitor-visible hold and keyboard-reachable local
Card alternative, and removes the obsolete email field and submit control from
the route completely.

## Frozen successor tuple

- `resident-card.html`  
  SHA-256 `b0efc8f71086f80d499ad73165bef480218363b11da1559b607c5e66d1f86622`
- `scripts/check-maikeover-contract.mjs`  
  SHA-256 `a8a469642ebf86e235792b8da2ab09581365f4bcb2177804fbca8b031b32cc2a`
- `scripts/test-maikeover-browser.mjs`  
  SHA-256 `0d2e986556dc51182f41ea09f74c9f85ca9fb63042d6b7e24931254c553284bb`
- `scripts/test-resident-card-contract.mjs`  
  SHA-256 `34197622af52f5adf4aed16c49cd8258fbe794cbfedfa8a1dac6df27cbda4c99`
- `scripts/test-resident-card-browser.mjs`  
  SHA-256 `c5f089ae793ba77cb7d848668561cac9b34ff2729a78838461623f534fb127f4`

## Maker verification

- MAiKEOVER static contract — PASS
- MAiKEOVER real Chromium preflight — PASS
- Resident Card static contract — 31/31 PASS
- shared Resident Card contract — 34/34 PASS
- Resident Card real Chromium journey — 127/127 PASS
- MAiKEOVER owner entry, state JSON and scoped diff check — PASS

The complete Resident Card browser suite verifies newcomer, returning, invalid,
legacy, hostile, storage-denied and Closet-consumer states at 320, 390 and
1280px, with no account/profile backend request. The MAiKEOVER suite separately
reconfirms its local Card and Account A/B privacy fixtures.

## Honest boundary

The route ships no email input or submit control. It does not create an
account, send email, publish a Card, prove RLS, grant rewards or establish
cross-device restoration. The predecessor independent ACCEPT is preserved as
historical evidence for its narrower tuple but is superseded for current
admission. A fresh independent judge must review this successor.

