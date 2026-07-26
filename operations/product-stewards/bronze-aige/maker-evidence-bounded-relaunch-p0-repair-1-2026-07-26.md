# BRONZE AiGE — bounded relaunch P0 Repair 1 maker evidence

**Date:** 2026-07-26  
**Status:** REJUDGE REQUIRED  
**Authority:** bounded maker evidence only; this is not an independent pass, deployment approval or public verification.

## Repair basis

This packet responds only to the six P0 findings in
`independent-review-bounded-relaunch-p0-2026-07-26.md` (FAIL 55/100).
The maker did not perform or judge that review.

## Implemented repair

1. Removed real CHAR No.5/Ryan/service activation and bottle-consumption encouragement from the embedded page, standalone game, shared catalogue and legacy duplicate. Replaced it with fictional, adult, alcohol-optional social-practice copy and explicit spirit-free parity.
2. Replaced mutable `window.cocktailMenus` / `window.cocktailFortuneFlaps` authority with a closure-private, deep-frozen catalogue exposed through a non-writable API. Canonical drink and mood IDs are generated once; consumers do not render or persist injected window copy.
3. Upgraded local drink/coaster envelopes to version 2 exact-key allowlists. Drink state resolves only canonical lane/item/mood IDs. ISO timestamps must be canonical and no later than the exact read time. Coaster weeks must be unique, non-future and semantically equal to each item timestamp’s ISO week. Invalid reads are ignored without rewriting their bytes or sibling keys.
4. Wrapped calendar Blob/object-URL creation, download click and URL revocation in one contained outcome boundary. Any failure leaves a persistent live-region message saying the download was not confirmed and never claims success.
5. Replaced the standalone game’s unconditional current-week episode claim with evergreen/latest-published wording.
6. Replaced the global audio adapter path with private page-owned controls. `aria-pressed="true"` and playing copy occur only on the media `playing` event; pre-existing globals are not called; promise rejection, media error, pause and ended states clear ownership.

## Adversarial coverage added

- post-load injection of legacy catalogue globals in embedded and standalone routes;
- attempted overwrite of the canonical catalogue API;
- arbitrary/canonical-looking drink state four minutes in the future;
- duplicate, semantically invalid and future coaster state;
- byte-for-byte preservation of corrupt receipts and an unrelated sibling key;
- `URL.createObjectURL`, anchor click and `URL.revokeObjectURL` failures, including uncaught-page-error checks;
- hostile pre-existing `playLaidiesTheme`, fulfilled play promise without `playing`, and subsequent media error;
- standalone latest-published/evergreen episode wording.

## Evidence

From repository source:

```text
PRODUCT STEWARD SYSTEM PASS
products=65
active=3/3

BRONZE AIGE CONTRACT PASS
checks=74

INLINE JS PASS
352 scripts parse across 132 live pages

BRONZE AIGE BROWSER PASS
checks=56
external_requests_completed=0
third_party_requests_blocked=87
```

Fresh exact public artifact:

```text
/tmp/laidies-bronze-repair1.9413Sh
builder files=1085
find files including .build-manifest.json=1086
builder size=961.5 MiB
du size=1.1G
existing >750 MiB advisory remains
```

The same dedicated suite against the exact artifact:

```text
BRONZE AIGE CONTRACT PASS
checks=74

BRONZE AIGE BROWSER PASS
checks=56
external_requests_completed=0
third_party_requests_blocked=87
```

All five governed source/artifact pairs were byte-identical. Source SHA-256:

```text
c59a0cef80d4dc5af9cc818b28ac420fb5558b2abedb95be463d02291a332ecb  bronze-aige.html
31005cb2c526d0a03c303d46f4a281cb35befc451d092088d8071ab1e9fd6e66  content/site/bronze-aige-v2.js
35e0bee968c879e49c4ced364fff77a3034f3f55f81105bdb150ab459e1a434d  content/site/bws-data.js
2dd64b170a73227e26e7c6872da3ae80cb076f24ea24c6af60407dd03417daa0  games/businesswomens-special.html
0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603  games/cocktail-fortune.html
```

## Holds

- A separate judge must re-run the six hostile cases and acceptance score. Status remains **REJUDGE REQUIRED**.
- Owner visual approval, the missing final Cosmo/room treatment, native Safari/VoiceOver/zoom/device proof, audio rights/admission, analytics/privacy contract and public-origin verification remain open.
- No Git operation, deployment, external publication, central queue/registry/ACTIVE/PARALLEL edit or public claim was made in this repair.
- The existing global artifact-size advisory remains outside this bounded product repair.

## Learning scan

This repair applied existing prevention rules BTB-105 (typed local persistence),
BTB-106 (mutable catalogue side doors) and BTB-112 (exact-artifact proof for
dynamic issue dependencies). The task expressly prohibited editing the central
painpoints ledger, so no central ledger mutation was made.
