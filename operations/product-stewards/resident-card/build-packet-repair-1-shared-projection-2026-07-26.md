# Resident Card Repair 1 shared-projection build packet

**Date:** 2026-07-26  
**Trigger:** independent Cycle 6 stored-XSS FAIL  
**Maker score:** **82/100 — local Repair 1 pass; independent rejudge required**  
**Release authority:** none

## Repair

One strict read-only v1 projection now owns the Card key and is loaded by
Resident status, MAiKEOVER and Closet. It rejects non-plain/extra-shaped
objects, unknown fields, overlong/markup/control/bidi values, malformed
backgrounds/slugs and non-canonical avatar paths. Stored avatars are
DOM-created images using canonical packaged asset paths; no stored value is
interpolated into avatar HTML.

Legacy per-field values are detected and may populate a safe MAiKEOVER review
preview only after field validation. They cannot become current Card identity,
Closet content, public identity, reward or community authority.

## Packaging allowlist

Runtime:

1. `resident-card.html`
2. `content/site/resident-card-v2.js`
3. `content/site/resident-card-contract-v1.js`
4. `laidies-card.html` — shared reader, legacy fallback removal and DOM avatar
   hunk only
5. `maikeover.html` — shared reader/writer, safe preview and validated legacy
   review hunk only

Tests:

6. `scripts/test-resident-card-shared-contract.mjs`
7. `scripts/test-resident-card-contract.mjs`
8. `scripts/test-resident-card-browser.mjs`

Dossier:

9. `operations/product-stewards/resident-card/OPERATING-SPEC.md`
10. `operations/product-stewards/resident-card/backlog.md`
11. `operations/product-stewards/resident-card/state.json`
12. `operations/product-stewards/resident-card/build-packet-repair-1-shared-projection-2026-07-26.md`
13. `operations/product-stewards/resident-card/maker-evidence-repair-1-shared-projection-2026-07-26.md`
14. `operations/painpoints-log.md` — BTB-122 is recorded in the shared local
    ledger, but intentionally deferred from this commit because the file
    contains extensive unrelated work that cannot be safely attributed to this
    packet.

The independent report is evidence and must not be edited or attributed to
the maker.

## Rejudge commands

```sh
node scripts/test-resident-card-shared-contract.mjs
node scripts/test-resident-card-contract.mjs
node scripts/test-resident-card-browser.mjs

artifact="$(mktemp -d /tmp/laidies-resident-card-rejudge.XXXXXX)"
node scripts/build-public-site.mjs "$artifact"
RESIDENT_CARD_ROOT="$artifact" node scripts/test-resident-card-shared-contract.mjs
RESIDENT_CARD_ROOT="$artifact" node scripts/test-resident-card-contract.mjs
RESIDENT_CARD_ROOT="$artifact" \
PLAYWRIGHT_CORE_PATH="$PWD/.ds-sync/node_modules/playwright-core" \
node scripts/test-resident-card-browser.mjs
```

The judge must also prove byte identity for the five runtime files and run the
exact original `cardAvatarUrl` attribute payload.

## Non-authority

No deployment, provider, account, public Card, reserved handle, cross-device,
analytics, visual approval or native accessibility action is included.
