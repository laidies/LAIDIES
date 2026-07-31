# NewsStand release pipeline v1 — private dry run

**Status:** `BUILT LOCALLY — INDEPENDENT REVIEW REQUIRED`

This is an isolated compiler for NS-13/NS-16. It deliberately has no public
writer, content-source mutation, deployment command or approval authority.
It converts exact candidate bytes plus independently recorded source receipts,
claim bindings and an independent decision into three *proposed* records:

- `proposed-canonical-record.json`
- `append-only-audit-ledger.json`
- `dry-run-receipt.json`

The candidate maker is supplied with `--maker`. The decision's `reviewedBy`
must differ, and self-approval fails. The compiler rejects recursive duplicate
JSON keys (including escaped-equivalent keys), unknown keys/schema drift,
checksum mismatch, stale/future/missing receipts, absent/stale claim bindings,
unbound decisions and broken audit history.

Example (all inputs must be private fixtures or receipts; output remains here):

```sh
node scripts/newsstand-release-pipeline-v1.mjs \
  --candidate /private/candidate.json \
  --source-receipts /private/source-receipts.json \
  --claim-bindings /private/claim-bindings.json \
  --decision /private/independent-decision.json \
  --maker candidate-maker-id \
  --output operations/product-stewards/newsstand/release-pipeline-v1/dry-run-output
```

Only an independent reviewer may assess the exact candidate/compiler/test tuple
and decide whether a separately authorized canonical writer should ever consume
the emitted proposal. This compiler itself cannot make that write.
