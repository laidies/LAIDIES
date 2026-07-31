# Learning scan — Visitor's Centre live-route readiness integration

**Status:** `LOCAL LEARNING RECORDED — SHARED LEDGER NOT EDITED UNDER ROUTE LOCK`

## Shared-header overflow

The 779-class run initially failed only at 320px. Exact geometry showed the
Visitor composition at 320px but the injected `.svgh-nav` ending at 333.94px.

Prevention rule: rendered route tests must identify the actual overflowing
node before changing page layout. Shared injected chrome needs its own 320px
contract; route-local containment is a bounded fallback, not a global repair.

Possible Behind the Build angle: “The room fit the phone. The town-wide front
door did not.”

## Receipt truth

A checksum-valid projection can still truthfully contain zero admitted owner
receipts. `fresh` means the envelope passed integrity/freshness validation; it
does not mean a destination is ready. The route therefore shows each item as
owner-receipt pending and keeps `completionClaim=false`.

Prevention rule: test transport/integrity state separately from product
readiness state, and never translate `receiver.mode === "fresh"` into a
destination completion claim.

Possible Behind the Build angle: “Fresh data told us the honest answer was
still ‘pending.’”
