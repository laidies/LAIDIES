# Successor assembly lineage gate

This directory prevents a later video assembler from silently dropping a
previously built, reviewed or accepted narration sequence.

Before a successor master can be treated as reconciled, its lineage manifest
must list every checksum-bound sequence in the bound source inventory. Every
active sequence must either appear in the successor's exact included-hash list
or have an explicit supersession receipt naming the old path/hash, replacement
path/hash, shared narration occurrences and evidence-based reason. An omission
without that receipt is a hard `ORPHANED_SCENE` failure.

Run:

```sh
node scripts/check-video-assembly-lineage.mjs \
  operations/video-qa/assembly-lineage/episode-04-preassembly-lineage-2026-08-01.json
node scripts/test-video-assembly-lineage.mjs
```

The Episode 04 manifest is deliberately `PREASSEMBLY_HOLD`: it inventories the
current repair sequences but does not claim that a successor master exists or
that any component has independent release admission.
