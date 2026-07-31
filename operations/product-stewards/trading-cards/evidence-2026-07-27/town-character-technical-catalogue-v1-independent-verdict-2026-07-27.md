# Town character technical catalogue v1 — independent verdict

**Verdict:** `ACCEPT — HELD TECHNICAL CATALOGUE SHAPE ONLY`  
**Reviewed:** 2026-07-27  
**Scope:** the exact 13-record Town technical catalogue candidate. This is not product admission, pack creation, opening, ownership, Closet projection, route integration, deployment, or public release.

## Frozen tuple

| Input | SHA-256 | Result |
| --- | --- | --- |
| `town-character-technical-catalogue-candidate-v1-2026-07-27.json` | `b6b4b3a57b923a77db12dc156b5ed598ad92ba8ca2acdb3e3de4475fad2273c2` | matches maker receipt |
| `scripts/build-town-character-technical-catalogue-v1.mjs` | `4ff12fa1bf9cd88369f78ae6fd0110261bae8b5cc6f77a09279d94cb5e5de0a6` | matches maker receipt |
| `scripts/test-town-character-technical-catalogue-v1.mjs` | `e260329a1a911c84a686368b1997b9d6e96572c7947286849abc41d6d7c2f270` | matches maker receipt |

The catalogue's five upstream seals matched the builder's pinned expectations: content catalogue `45b17e19c44e3c6d1ad424bfd83c86519df03a35d9aa692313b77c793c65fefa`, content verdict `da1cbe8d2bdbee775be973625fad4591f49e966ff825bfbbcb29638c035f3dee`, rendered-consumer verdict `2123db882e2b5721d3cc79cbbff7236d9faed19611cfbf590cbe4a56e6e9b2c7`, Town roster `b8b5cf20816b8cd24957aac2aa83698588fa54100aea40bcb5c4750cba8c307c`, and visual review `cf69731aa76c5a14ec03d930a7fb386402940c6f352c694cca14f3d822f98e4e`.

## Independent reproduction

I copied only the pinned inputs, the two maker scripts, and the 13 declared front images into an isolated temporary root. Running the builder there created the catalogue, and the frozen output was byte-identical to the supplied candidate (`cmp` pass) with the same SHA-256 `b6b4…273c2`.

The independent validator passed verbatim:

```text
TOWN TECHNICAL CATALOGUE PASS records=13 required-fields=21 fronts=13 receipts=52 release=held pack=not-created ownership=none
```

Additional independent checks passed:

- 13 unique immutable `card_key` values and 13 unique `identity_ref` values; every record is bound to the sole catalogue version `town-character-catalogue-technical-candidate-2026-07-27-v1`.
- All 21 Trading Cards operating-spec catalogue fields exist on every record.
- All 13 declared front files exist and match their per-record hashes.
- All 52 per-record authority/review receipts exist and match their exact record-bound hashes.
- The five pinned upstream inputs are fail-closed. Independently appending a harmless stale mutation to each input in turn caused the builder to refuse it with the corresponding `Refusing stale input|content|consumer|roster|visual` error before output generation.
- `node scripts/check-product-stewards.mjs --owner-entry trading-cards` passed.

## Boundary check

The candidate remains exactly `release_state=held`, `pack_state=not_created`, `ownership_state=none`, `closet_projection_state=not_wired`, and `public_state=not_released`. Every `pack_keys` array is empty. The technical catalogue contains none of the server/opening fields `entitlement_id`, `resident_id`, `opened_at`, `odds_version`, or `idempotency_key`.

It therefore does not select/create a pack, grant/open a card, record an owner, project anything into Closet, create a public catalogue, or authorize release. Those are correctly retained as explicit next reviews, not silently promoted by this acceptance.

## Remaining work and exact next action

This ACCEPT establishes only the held technical record shape for these 13 Town records. Product admission, authoritative server grant/open/replay/correction, pack/odds, private ownership projection, Closet consumption, accessibility and release/public gates remain separate.

**Exact next action:** bind a separately scoped final-product-admission contract for the held Town family before any `release_state` change or pack key is added; do not reuse this technical receipt as grant, ownership, Closet, or release authority.

## Learning scan

No qualifying new failure or reusable surprise was found: the deterministic builder's pinned-input rejection and the empty-state boundary operated as specified. No canonical learning-ledger change is needed for this judge-only scope.
