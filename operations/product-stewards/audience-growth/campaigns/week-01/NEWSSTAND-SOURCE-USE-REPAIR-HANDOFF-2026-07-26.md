# NewsStand source-use repair handoff — Week 01 Day 01

**Status:** `REPORT_READY` for checksum-bound NewsStand re-review  
**Evidence time:** `2026-07-26T12:31:53-07:00`  
**Campaign:** `audience-week-01-2026-07-26`  
**Trigger:** `operations/product-stewards/newsstand/evidence/audience-week-01-day-01-source-use-review-2026-07-26.md`  
**Trigger SHA-256:** `02874042a8e0ac3109e71b0d4e60a33245c03334a1bee99971102dacf80c10a1`

## Exact repaired objects

| Unit | Exact sentence | Manifest-object SHA-256 | Referenced-asset-set SHA-256 |
|---|---|---|---|
| W01-D1-01 | Specificity—not secret syntax—gives AI a better chance of producing something you can use. | `60bfb913993800982c372b2c6d33bfbc2c1b721b910d030994d1fe4ad16f06ef` | `616c9ea85de4d6ec71289d982d02b7e4f6a5186addedb819074dfe6e28d8dcf5` |
| W01-D1-03 | Seven briefing lines. A better chance at a usable first pass. | `db600da647b9543cfa96b37967e6a767f5acd3aad2ef8d2ed6a71753816ad0e8` | `71e4e6c6a38ce20506b5459858cbdef466b64e254d44ca67fdf75cb6f9eeaf90` |
| W01-D1-05 | The visitor gets the Issue 02 lesson and a concrete before/after prompt. | `82f4c6490079e2fb8fb723c1148ca79d118f18309bb2666cb7fd0e4028b78268` | `a1d033303ebe87d052a2e2f1fd5f6d36074b49823d2b447609e9c7b7ab889862` |

The exhaustive changed-file before/after hashes are in
`NEWSSTAND-SOURCE-USE-REPAIR-RECEIPT-2026-07-26.json`.

## Preserved accepted objects

| Unit | Manifest-object SHA-256 | Referenced-asset-set SHA-256 | Result |
|---|---|---|---|
| W01-D1-02 | `3edf0df4da617d34249344063400e34dffdb2772e80d41d597f6c0459fafff9d` | `42de32202c42a5f2062cebe265f50f88d96b29f4b6c500dc71b13798f4426722` | Exact match to NewsStand input |
| W01-D1-04 | `e8648d1dcee611ea1d34e810b4c7efb96ca88cbc6316fae0059a704549436d8c` | `0580db74100a5e5018402453e6fb26f264b5b0ce670f1ea605a93f6852bad8f7` | Exact match to NewsStand input |

## Checks

- Targeted generator rebuilt only the affected object derivatives.
- Accessibility entries and shared generated campaign records were regenerated.
- The self-contained verifier passes 35 units, 105 hooks, all asset dimensions,
  14 five-page LinkedIn PDFs, seven motion/VTT pairs and the exact repaired
  sentences.
- The verifier rejects the three held sentence variants.
- The visual contact sheet shows the changed feed, story, carousel/document and
  motion-frame uses without visible clipping.
- Issue 02 source binding and exact read/listen boundaries are unchanged.
- Independent production recheck: `PASS — VERIFIED LOCALLY`; all 21 receipt-bound
  source, changed-object, regenerated-record and visual-evidence hashes matched
  actual bytes. Readiness remains `HOLD`.

## Authority truth

`planned=35`, `builtLocally=35`, `readyToPublish=0`, `published=0`.
NewsStand re-review, Brand/rights, Control Room, channel and Ali exact-use/public
approval remain required. Nothing was published, scheduled, deployed, sent,
purchased, installed or mutated in an external account.
