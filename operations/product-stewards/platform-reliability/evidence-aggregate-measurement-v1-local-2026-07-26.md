# Evidence — aggregate measurement v1 local

**Status:** VERIFIED LOCALLY — SYNTHETIC/REPOSITORY INTAKE ONLY  
**Observed:** 2026-07-26 12:11 PDT  
**Integration lock:** Platform-owned contract/test/evidence scope only  
**Public/provider change:** none

## Reconciled source truth

| Source | Repository/provider evidence | Admitted result |
|---|---|---|
| Plausible | Paid Starter Monthly 10K receipt is referenced in External Services; collection code is broadly embedded; authenticated reporting is not connected | `not-connected`; all Plausible metrics `null` |
| Microsoft Clarity | Collection code is present; no recurring privacy-reviewed insight import | excluded from snapshot; no raw replay or session data admitted |
| Resident Card/Supabase | Local identity code/migration exists; migration, real Auth/RLS and production aggregate are unproved | `not-verified`; Card creations `null` |
| Social | Week 01 repository board records 35 planned/built, 0 ready, 0 published; provider exports are absent | repository counts only; no outcome claim |
| Event dictionary | Seven generic categorical events and aggregate-only privacy rule | compatible boundary; product event delivery remains unproved |

## Commands and observed output

```text
node scripts/check-product-stewards.mjs --owner-entry platform-reliability
PRODUCT STEWARD SYSTEM PASS
owner_entry_product=platform-reliability:PASS

node operations/product-stewards/platform-reliability/aggregate-measurement/v1/test-aggregate-measurement-v1.mjs
AGGREGATE MEASUREMENT V1 PASS metrics=4 null_unknown=4 sources=3 invalid=10 stale=1 schema_mutations=3 privacy=aggregate-only provider=none

node scripts/build-audience-measurement-snapshot-v1.mjs
AUDIENCE MEASUREMENT SNAPSHOT V1 BUILT metrics=4 known_values=0 payload_sha256=2760c3aff93f139b386af831b1f2f61d825792995771f21064e9243e97774c87
```

The invalid matrix proves rejection/fail-closed behavior for unknown-as-zero,
ready-without-value, rankings without a source, cohorts below five, unverified
publication, missing privacy prohibition, weak Card definition, duplicate
source, payload tamper and future evidence. A separate stale case returns the
same safe null projection. Three JSON Schema mutations prove that lowering the
cohort threshold, enabling raw retention or removing integrity binding makes
the contract test fail.

## Hash receipt

```text
c11b059fec8d6955c30786bbbf315f14a7cbff0a29d3ab00192353c93e57ffa7  aggregate-measurement-v1.mjs
b205ee87572a8c1be3775a8c4126210f80ac2dba56dcb5b8fac7c5c2a915c44b  aggregate-measurement-v1.schema.json
0d1592ff3179a6d501583a011d4e2428d5a8bf67e9c65788f642de69df893a33  current-measurement-snapshot.v1.json
ddcffa3a78e5c8b5653f3b21801f47682f54acda330e5b0f10d4b942124ca5e8  test-aggregate-measurement-v1.mjs
e6538c64e2837dfcb4fac5e1065e8be7f3c98a26575f4f7f39a2efc685170d6c  scripts/build-audience-measurement-snapshot-v1.mjs
```

No hash above proves provider delivery, a production count, account access,
deployment or public behavior.
