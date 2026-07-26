# NewsStand Cycle 6 Repair 3 maker evidence

**Status:** BUILT LOCALLY — FINAL INDEPENDENT REJUDGE REQUIRED; release HOLD**

Repair 3 makes the router total for date inputs, uses exact UTC calendar-day
boundaries (future means any later UTC date; stale means more than policy’s 31
UTC days), returns the policy SHA-256 with its bumped `2026-07-26.3` version,
and rejects duplicate raw root-envelope keys before JSON.parse normalization.
All results remain `REJECT`/`HOLD_FOR_INDEPENDENT_REVIEW` with false authority
and no publisher.

Checks: router suite PASS; malformed `2026-13-01` directly returns REJECT;
raw duplicate `id` detects `duplicate_json_key:id`. History Repair 2 is
unchanged. Final rejudge must rerun source/artifact browser repeats and assess
remaining nested raw duplicate/ledger/receipt authority boundaries.
