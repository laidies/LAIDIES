# Episode 04 successor-assembly lineage gate receipt

**Evidence date:** 2026-08-01

**State:** `REPORT_READY` / local technical gate `PASS` / successor master `HOLD`

**Public or release authority used:** none

## What is now enforced

- The Episode 04 preassembly inventory checksum-binds 13 reviewed repair
  sequences: 12 active candidates and one explicitly superseded sequence.
- A later successor must list every active sequence hash it contains.
- Any omitted sequence must bind an explicit old-hash → replacement-hash
  supersession receipt for the same narration occurrence.
- An unaccounted omission is a hard `ORPHANED_SCENE` failure.
- The regression deliberately removes the recovered Ada animation from an
  otherwise complete simulated successor and proves that the gate rejects it.

## Exact bindings

| Item | SHA-256 |
|---|---|
| `scripts/check-video-assembly-lineage.mjs` | `86d260fc332685aec596cc0d7aa88aed9b6734a567ec4c1e3ee8c63b430d14d1` |
| `scripts/test-video-assembly-lineage.mjs` | `c0ef34816829a80a1098102d3866d3b0f3b46ed29b5fe20eb5583893de68df18` |
| `successor-assembly-lineage.schema.json` | `f639d9f70d83d2faebf7d7f879dac0f63dda7121f2ead535d03e47137b3604bf` |
| Episode 04 preassembly manifest | `161315d1647c67b900c67784ce226ab21f8813686903174298e3af22cc619bc0` |
| Ada v1 → v2 supersession receipt | `fcafc606f776a019f46b5bf788fc939f77fca2636a7f7c55ab396f3a7010738f` |

## Verification

```text
SITE VIDEO REVIEW REGISTRY: VALID
VIDEO ASSEMBLY LINEAGE REGRESSION: PASS
silent omission of recovered Ada sequence fails ORPHANED_SCENE
Episode 04 preassembly: valid=true, lineage_status=PREASSEMBLY_HOLD
prior_sequence_count=13, active_prior_sequence_count=12
```

The registry remains `HOLD`. This receipt does not select among competing Ada
candidates, admit any sequence for release, assemble a successor master, or
authorize publication/deployment. It prevents completed motion work from being
silently lost while those decisions remain open.
