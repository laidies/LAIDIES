# Local evidence — entry readiness projection v1

**Disposition:** VERIFIED LOCALLY — Platform contract scope  
**Observed:** 2026-07-26T18:27:12Z  
**Live/shared changes:** none

## Exact files

| File | SHA-256 |
|---|---|
| `readiness-projection/v1/canonical-destinations.json` | `c5136958e1296c71338bdcb2eb9e271a70c6b80f3760514f9f7464d230ce7f26` |
| `readiness-projection/v1/readiness-current-projection-v1.schema.json` | `a0085ec4cd70ce23384313ac59f0f16dd77a65843beaf5c548df5211239b119f` |
| `readiness-projection/v1/readiness-projection-v1.mjs` | `5d7175c44c42571152f20c69fdba0a5c4e2674fb4715cc1886d72f75ac37c6e4` |
| `readiness-projection/v1/fixtures-v1.mjs` | `8b9c2f8fb5322fa25c5913f05ee4116dbd30110001665ddc886b5b2977599fa0` |
| `readiness-projection/v1/test-readiness-projection-v1.mjs` | `04955384193972c49a0c6840a77b1dc093297da9b01a191fa4e65bab48f2930a` |

## Commands

```text
$ node operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
READINESS PROJECTION V1 PASS destinations=17 current=3 fail_closed=12 idempotency=3 schema=draft2020

$ node --check operations/product-stewards/platform-reliability/readiness-projection/v1/readiness-projection-v1.mjs
[exit 0]

$ node --check operations/product-stewards/platform-reliability/readiness-projection/v1/test-readiness-projection-v1.mjs
[exit 0]
```

The test executes the Draft 2020-12 schema and the runtime contract. It proves:

- exact 17-destination canonical parity;
- three required current-content slots;
- valid source evidence byte verification before seal;
- complete payload integrity/release binding;
- same-request replay, different-request conflict, monotonic successor and
  exact predecessor;
- stale, tampered, incomplete, duplicated, wrong-route, missing-limitation,
  future-evidence, expired-item, duplicate-slot, partial-artifact and
  unknown-field failures;
- 17-route generic semantic recovery with zero current promotions;
- route arrival never becoming completion; and
- analytics allowlisting with no content, evidence or identity fields.

## Evidence ceiling

The fixtures are synthetic. This evidence does not prove that any of the 17
owners has issued a production receipt, that the current Homepage/Visitor
pages consume the contract, that the projection was built into an artifact,
or that cache expiry/correction/analytics/public behavior works.
