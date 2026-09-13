# Reader-tip source monitor contract

**State:** ACTIVE PRIVATE INTAKE / NO PUBLICATION AUTHORITY

**Owner:** AIDB Intelligence Desk

**Cadence:** Monday 09:00 America/Vancouver

## What a weekly check does

For every configured source, inspect public items published in the ten days ending
at the run time. That is the seven days since the normal weekly run plus a three-day
overlap. If a run was missed, begin three days before that source's last successful
cursor instead, so the gap is recovered. The overlap catches reordered posts,
delayed timestamps, edits and a slightly late run.

The durable state stores a separate last-successful cursor for each source. A
successful source check advances only that source's cursor. A partial, blocked or
inaccessible check records the attempt and its retry trigger but leaves the previous
cursor unchanged. It is never reported as a quiet success.

## What happens to a finding

Items are deduplicated by stable platform item ID and canonical URL. The monitor
stores minimal private provenance, not copied captions, carousels or prompt text.
Every assessed item receives one disposition:

- `DISCARD`: not useful or not supportable; retain a tombstone and reason.
- `DUPLICATE`: already represented; retain the exact existing item/treatment link.
- `HOLD`: potentially useful but missing evidence, a safe test or an owner decision.
- `MERGE`: improves an exact existing LAiDIES treatment; name that target.
- `CREATE`: proves a distinct reader job and names a receiving owner. This is still
  only a production candidate, never permission to publish.

Every `HOLD`, `MERGE` and `CREATE` names both an accountable receiving owner and
the real task or lane where that owner can respond. The recorder atomically creates
a checksum-bound entry in `state.outbox[]`. `PARTIAL` and `INACCESSIBLE` source
checks create operational-alert entries for the AIDB Intelligence Desk. `DISCARD`
and ordinary `DUPLICATE` remain private tombstones and do not consume owner attention.

An outbox entry stays open until the exact receiving owner writes an append-only
`reader-tip-owner-receipt-v1` through
`node scripts/record-reader-tip-owner-receipt.mjs <owner-receipt.json>`. The receipt
must bind the outbox ID, source-receipt checksum, owner principal and task, outcome
and next trigger. `ACCEPTED` accepts intake only: it never authorizes drafting,
production, publication, spending, retirement or a change to shared truth.

Useful source analysis remains in a dated private source receipt. Shared editorial
banks, Corner Office/NewsStand copy, public feeds and site files are not edited by
this monitor. A receiving owner must separately accept and produce visitor-facing
work through the normal content gates.

## Ali-visible delivery

After every scan transaction, run `node scripts/render-reader-tip-outbox.mjs`.
It prints one compact decision card for every finding or access failure that lacks
a valid owner receipt. Exit code `2` means `SURFACE_REQUIRED`: the automation must
return that exact output as its final visible message. It may not emit
`DONT_NOTIFY`, complete without a final message or describe the run as quiet.
Exit code `0` is the only valid quiet result. Exit code `1` is a monitor failure and
must also be surfaced. Owner routing and Ali-visible delivery are separate: a chat
notification does not count as an owner receipt, and an owner receipt does not grant
production or release authority.

## Boundaries

Public pages only. Do not bypass access controls, subscribe, purchase, download a
paid library, copy source bodies, send messages, like/comment, follow/unfollow, or
publish. Social material is discovery-only and current product claims require a
primary-source check. No useful finding is a valid quiet result; route it or hold it.

## Machine checks

`node scripts/check-reader-tip-monitor-state.mjs --calibrate` proves the checker can
reject a short overlap, stale-state update, missing material outbox, failed access
that advances a cursor, duplicate URLs, copied captions and incomplete dispositions.
`node scripts/test-reader-tip-monitor-state.mjs` tests state, outbox and owner-receipt
transitions. `node scripts/record-reader-tip-scan.mjs <transaction.json>` applies one
validated transaction atomically.

A scan transaction uses `reader-tip-scan-transaction-v2`, with `runId`,
`attemptedAt`, `mode: "SCAN"`, `expectedStateSha256`, `sourceReceiptPath`, an
overall `result`, and one `sourceResults[]`
entry per configured source. Each source result records `sourceKey`, `accessState`,
`queryFromAt`, `cursorAfter`, `failureReason`, `nextTrigger`, and `items[]`. Item
objects use the same fields as `state.items[]`. A failed source supplies no
`cursorAfter`. The recorder revalidates the resulting whole state before its
atomic replacement. The expected checksum makes a concurrent stale scan fail rather
than overwrite a newer owner decision or scan result. Owner receipts are separate,
append-only files so a later state replacement cannot erase them.
