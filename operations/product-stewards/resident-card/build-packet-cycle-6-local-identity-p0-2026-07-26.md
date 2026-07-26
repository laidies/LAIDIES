# Resident Card Cycle 6 local-identity P0 build packet

**Packet type:** bounded maker packet  
**Release authority:** none  
**Deployment/account/provider authority:** none

## Problem

`/resident-card.html` was a held account route with hidden intake/profile
machinery. It did not recognize the local Card created at MAiKEOVER and
overstated the Card as a store for separate progression systems.

## Intended result

- one useful status/doorway route;
- explicit empty, saved, invalid and storage-unavailable states;
- bounded safe field projection;
- local handle labelled as an unreserved draft;
- no email, account SDK, profile form, backend request or destructive reset;
- Closet continuation only from a valid envelope;
- exact denial of account, public, cross-device, community and reward
  authority.

## Packaging allowlist

Only these product implementation/test files belong to this packet:

1. `resident-card.html`
2. `content/site/resident-card-v2.js`
3. `scripts/test-resident-card-contract.mjs`
4. `scripts/test-resident-card-browser.mjs`

These dossier records may accompany the packet but are not public runtime:

5. `operations/product-stewards/resident-card/CHARTER.md`
6. `operations/product-stewards/resident-card/OPERATING-SPEC.md`
7. `operations/product-stewards/resident-card/state.json`
8. `operations/product-stewards/resident-card/backlog.md`
9. `operations/product-stewards/resident-card/deep-dive-cycle-6-2026-07-26.md`
10. `operations/product-stewards/resident-card/build-packet-cycle-6-local-identity-p0-2026-07-26.md`
11. `operations/product-stewards/resident-card/evidence-cycle-6-local-identity-p0-2026-07-26.md`
12. `operations/product-stewards/resident-card/external-capability-review-cycle-6-2026-07-26.md`
13. `operations/product-stewards/resident-card/evidence-cycle-6-local-identity-p0/`
    (two generated screenshots only)
14. `operations/painpoints-log.md` — BTB-119 is recorded in the shared local
    ledger, but intentionally deferred from this commit because the file
    contains extensive unrelated work that cannot be safely attributed to this
    packet.

Do not package unrelated worktree changes by implication.

## Acceptance tests

```sh
node scripts/test-resident-card-contract.mjs
node scripts/test-resident-card-browser.mjs
node scripts/check-inline-js.js
node scripts/check-local-links.js
git diff --check -- resident-card.html content/site/resident-card-v2.js \
  scripts/test-resident-card-contract.mjs scripts/test-resident-card-browser.mjs \
  operations/product-stewards/resident-card
```

An independent release judge must repeat the two Resident Card suites against
the fresh artifact and prove byte identity for the two runtime files.

## Explicit non-acceptance

This packet does not approve the current image, public member Cards, account
intake, Supabase production bindings, handle reservation, cross-device
restoration, rewards, analytics events, deployment or social announcement.
