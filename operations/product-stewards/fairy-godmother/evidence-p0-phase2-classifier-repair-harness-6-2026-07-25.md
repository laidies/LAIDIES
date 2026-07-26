# FAiRY Godmother Gate B chronology repair 6

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — FIX BEFORE PROMOTION; INDEPENDENT NO-CREDENTIAL
RE-AUDIT REQUIRED  
**Trigger:**
`independent-review-p0-phase2-classifier-repair-harness-5-2026-07-25.md`  
**Scope:** Only the reproduced post-run authority-approval chronology bypass
and equivalent date/time controls in the local evaluation harness. No provider,
credential, key, network, binding, staging, deployment, production, Git or
central-queue operation.

## Outcome

Repair 5 proved that an authority registry was valid, hash-anchored and not
future-dated relative to the verifier. It did not prove that the registry
existed before the run it purported to authorize.

The scorer and standalone verifier now require:

`authority registry approval UTC date <= declared run date <= verifier UTC date`

An approval made after a past run is rejected even when it is valid today,
canonical, signed into an otherwise valid artifact packet and matched to the
approved registry hash. Approval on the run date remains valid at the
deliberately retained date granularity.

## Strict chronology parsing

The shared chronology parser accepts:

- a real ISO calendar date where the contract permits date granularity; or
- a real RFC 3339 timestamp with an explicit `Z` or numeric UTC offset.

It rejects impossible dates/times, timestamps without a time zone and offsets
outside the RFC 3339 range. Timestamp ordering uses the normalized UTC date,
so an offset cannot disguise a post-run approval or receipt.

The existing chronology gates remain and are now exercised together:

- published-rate effective date precedes/equal access date, and access is no
  later than the run;
- no-charge validity covers the run and access is no later than the run;
- unsupported measurement effective date is no later than the run or verifier
  date;
- a provider receipt has an exact RFC 3339 `receivedAt` whose UTC date equals
  the declared run date;
- a manifest has an exact RFC 3339 `createdAt` whose UTC date is not before the
  run or after verifier-controlled now; and
- a declared future run remains rejected from verifier-controlled time.

## Path coverage

New positive and adversarial controls cover:

- registry approval before, on and after a past run;
- post-run-but-not-future approval, the exact independent-review false green;
- opposite UTC-offset examples that normalize to before/on versus after the
  run;
- malformed calendar dates, missing time zones and invalid offsets;
- published-rate access after the run;
- no-charge access/validity beginning after the run;
- runner-tokenizer evidence paired with a post-run authority registry;
- provider receipts before/after the run, malformed timestamps and two
  timezone-normalized same-run positives;
- manifest signing before the run, after verifier now, missing-zone,
  date-only and impossible timestamp controls; and
- standalone verification of a valid signed report paired with a post-run
  authority registry.

All repair-5 authority, entitlement capacity, tokenizer recount, provider
receipt, request-isolation, frozen-join, behavior replay, trust-anchor and
artifact-integrity gates remain active.

## Verification

```text
cd worker-fairy-godmother && npm test
39/39 Worker, architecture and harness tests PASS
45/45 core evaluation fixture integrity PASS
79/79 frozen classifier fixture manifest PASS
Frozen SHA-256:
01269b43950cfd4d5a4d9565a249fb865030356f0bc60a90d4682987d6d5b3da

Recovery checksum:
127a9ce5e354f46d4e5bd4b63dde85d41f26178f4ea24cea84a7069d43e68b3e
Recovered bytes: 55,137
Production mutation recorded: false

cd worker-fairy-godmother && npm run dry-run
PASS — 94.11 KiB / 29.38 KiB gzip; no bindings found

node scripts/check-product-stewards.mjs
PASS — 65 products; 3/3 active

Scoped JSON parse and git diff --check
PASS
```

## Still open

- Independent no-credential re-audit of the exact repair-6 candidate.
- Owner-approved provider/model/version, privacy/retention, authority registry,
  receipt format or tokenizer, runner, cost ceiling and trust anchors.
- The unchanged 63-case semantic-provider trial.
- Retrieval/claim validation, authoritative Plays, answer quality,
  personality, frontend, accessibility, isolated staging, deployment and
  public promotion.

No provider was selected, called or semantically scored. Status remains
**FIX BEFORE PROMOTION**.

