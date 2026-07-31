# Control Room handoff — header lock 1 accepted / Visitor’s Centre successor queued

**Evidence time:** 2026-07-26T13:42:05-07:00  
**Owner task:** `019f9f7f-9cd2-7e33-a1a3-f61b0b9c9ca1`  
**Status:** HEADER LOCK 1 ACCEPTED / NAME SUCCESSOR SPECIFIED AND QUEUED  
**Public/deploy/spend authority:** none used; no public, deploy, provider or
spend mutation  
**Ali authority required now:** none

## Literal output and action

1. Town Entry independently accepted the exact shared-header route-version
   lock-1 Homepage + Start Here tuple.
2. Town Entry inventoried the canonical `Visitor’s Centre` successor without
   changing the accepted routes or shared data.
3. The rejected first-visit copy candidate was removed from the active backlog
   and state. No replacement copy lane or Ali copy gate remains.

## Evidence and tests

- Independent header receipt:
  `evidence/shared-header-route-version-lock1-independent-2026-07-26/independent-acceptance.md`
  SHA-256
  `56d5327ad4982a3c830f077dab1eb605861dc3302f4465e9c49ec15b69648fcc`.
- Independent adversarial test:
  `evidence/shared-header-route-version-lock1-independent-2026-07-26/test-independent-route-version-lock1.mjs`
  SHA-256
  `05ca0afd9bac7223c8735245033a2cc0c8aa3b106cef25d6538d1de404e50eb8`.
- Literal rerun:
  `PASS receipt=SVGH-320-2026-07-26-v1-ROUTE-INTEGRATION-v1
  homepage=51a4a25f start=a7a54e79 visitor=cddc7404 valid=2 adversarial=5
  inverseRollback=PASS mountCount=1/0/1 mutation=false`.
- Name successor inventory/contract:
  `VISITORS-CENTRE-NAME-PROPAGATION-INVENTORY-AND-ACCEPTANCE-CONTRACT-2026-07-26.md`
  SHA-256
  `7864fba55d1c177db500b59f347cd933081926b7943dbebbf66132b4ad27c170`.
- Product steward validation: `PRODUCT STEWARD SYSTEM PASS`, 67 products,
  one active lane, collision-aware by scope and integration lock.
- `state.json` parses successfully; SHA-256
  `80fd95c2f6af61d225d2cefb268ffe725f3d15b7684e536cfba60fa3caea8fcf`.

Accepted route hashes remain unchanged:

- `index.html`
  `51a4a25f2eeb66e881755fe8d9c5dc3960678cc3a4ee78ea105203a053a23dbb`;
- `start-here.html`
  `a7a54e79b3b4b5dd85cdbaf50a9b96788632f2c8dd42d3513f77ec8d1c7efbc0`.

## Locks and dependencies

- Platform may close the exact header lock-1 acceptance using the receipt
  above.
- The canonical name successor is blocked on a Platform checksum-bound
  shared-data naming receipt and a Control Room successor route lock.
- Exact queued residual: eight Town Entry route occurrences, seven shared-data
  literals across six files and three active-dossier occurrences.
- Historical checksum-bound evidence remains unchanged. Successor tests must
  reject old/mixed names and receive new hashes.
- Homepage copy is locked by
  `HOMEPAGE-COPY-RULING-2026-07-26.md` SHA-256
  `d2c15c355d4e111132c570203d48223fd1f7a84ef86348daeb2b688b1032015f`.
- Visual work remains behind
  `STYLE-AND-IMAGE-LOCK-GATE-2026-07-26.md` SHA-256
  `7e7e7cd87fde3c91640267ff23c91f8fa86235ffc11afc17aa919539cde3ad8e`.
  The current Homepage and exact masthead remain the sole incumbent.

## Acceptance owner and next trigger

Town Entry remains the Homepage/Start Here acceptance owner. Visitor’s Centre
must independently accept its receiving surface; Platform owns the shared-data
receipt and release binding. The next trigger is the exact Platform naming
receipt plus a bounded Control Room successor route lock. Town Entry then
applies the name-only patch, freezes new hashes, runs the full negative and
responsive/accessibility matrices and dispatches independent reacceptance.
