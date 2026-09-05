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

Useful source analysis remains in a dated private source receipt. Shared editorial
banks, Corner Office/NewsStand copy, public feeds and site files are not edited by
this monitor. A receiving owner must separately accept and produce visitor-facing
work through the normal content gates.

## Boundaries

Public pages only. Do not bypass access controls, subscribe, purchase, download a
paid library, copy source bodies, send messages, like/comment, follow/unfollow, or
publish. Social material is discovery-only and current product claims require a
primary-source check. No useful finding is a valid quiet result; route it or hold it.

## Machine checks

`node scripts/check-reader-tip-monitor-state.mjs --calibrate` proves the checker can
reject a short overlap, a failed access that advances a cursor, duplicate URLs,
copied captions, and incomplete dispositions. `node scripts/test-reader-tip-monitor-state.mjs`
tests state transitions. `node scripts/record-reader-tip-scan.mjs <transaction.json>`
applies one validated transaction atomically.

A scan transaction uses `reader-tip-scan-transaction-v1`, with `runId`,
`attemptedAt`, `mode: "SCAN"`, an overall `result`, and one `sourceResults[]`
entry per configured source. Each source result records `sourceKey`, `accessState`,
`queryFromAt`, `cursorAfter`, `failureReason`, `nextTrigger`, and `items[]`. Item
objects use the same fields as `state.items[]`. A failed source supplies no
`cursorAfter`. The recorder revalidates the resulting whole state before its
atomic replacement.
