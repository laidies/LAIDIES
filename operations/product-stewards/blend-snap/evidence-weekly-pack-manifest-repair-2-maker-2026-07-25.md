# Blend & Snap weekly-pack Repair 2 — maker evidence

**Date:** 2026-07-25  
**Status:** BUILT LOCALLY — READY FOR INDEPENDENT RE-JUDGE  
**Release status:** FIX BEFORE LAUNCH  
**Authority limit:** maker evidence; not independent, accessibility, visual,
owner, artifact-size, release or public-origin approval

## Bounded outcome

Repair 2 addresses the two P0s in
`independent-rejudge-weekly-pack-manifest-repair-1-2026-07-25.md`.

### Public/private evidence boundary

`content/blend-snap-weekly-packs.json` is now a minimal public runtime
contract. Its only top-level fields are:

```text
schemaVersion · manifestId · updatedAt · freshThrough · packs
```

Each public component has exactly:

```text
id · job · label · status · statusLabel · publicNote · route
```

It contains no `evidence`, `evidenceOwner`, `verifiedOn`, internal owner,
production rationale, `Architecture exists`, `server-authoritative`,
`unproven` or equivalent studio language.

Private evidence is preserved at:

`operations/product-stewards/blend-snap/weekly-pack-evidence-ledger-2026-07-25.json`

The deterministic validator cross-checks public manifest version, every
episode/component ID, private owner, evidence, verification date, episode
index, route, status and released-episode parity. The browser also rejects
unknown/private fields in a fetched public manifest.

The fresh public artifact does not contain the private ledger. Exact searches
confirmed that its served manifest contains none of the private keys or
internal phrases.

### Accessible fail-closed status

The visible `#bsSpecialDesc` is now the stable status channel:

```text
role="status" · aria-live="polite" · aria-atomic="true" · tabindex="-1"
```

It contains nonempty loading, ready and failure text. `aria-busy` changes from
`true` while loading to `false` after ready/failure.

Every failure:

- disables ORDER;
- suppresses component routes;
- exposes the released-Episodes fallback;
- exposes “Try loading the menu again”;
- keeps the exact visible failure text inside the live status; and
- focuses the visible retry control instead of leaving focus on `BODY`.

A user-triggered retry focuses the loading status. If it fails again, the
visible failure is restored and focus returns to retry. Manifest/index fetches
now have an eight-second abort deadline.

## Exact source identity

```text
45fd5d12f84b312bd5f72483eebc923d77ed1fafe2bb90fdd1e98c1dbb350f7e  blend-snap.html
28fcd6e2558a7cd0d4b4285f1de9f8735082ce08054771d5b4cb0c7decc1a372  content/blend-snap-weekly-packs.json
65a139c3a8056bda5e879555c0a87b91e0f638e62c6f36401606609bd07e549d  scripts/validate-blend-snap-packs.mjs
bfbb48247ecfd13220c754ce4a2faf05ef98d4cad224e8363b42cfa31653aa14  scripts/test-blend-snap-cross-entry.mjs
7cca55edec9ea4b2c43a2d96f42a9e22c1dc7bab42af64b71cef5d81d8510885  scripts/test-blend-snap-browser.mjs
8e06de72cab5acd25d81490665c29c74222567e6a9d08a99df0327ccb8b7dfdc  operations/product-stewards/blend-snap/weekly-pack-evidence-ledger-2026-07-25.json
```

The fresh artifact copies of `blend-snap.html` and the public manifest are
byte-identical to those source hashes.

## Verification

```text
node scripts/validate-blend-snap-packs.mjs --as-of=2026-07-25
✓ BLEND & SNAP PACKS: schema 1.0.0 · 4 published episode menus ·
  12 available · 3 held · 4 planned · 1 unavailable · fresh through 2026-08-01

node scripts/test-blend-snap-cross-entry.mjs
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic checks

node scripts/test-blend-snap-browser.mjs
✓ BLEND & SNAP BROWSER: 90 rendered checks

BLEND_SNAP_ROOT=/tmp/laidies-blend-snap-repair2.AMidgT \
  node scripts/test-blend-snap-cross-entry.mjs
✓ BLEND & SNAP CROSS-ENTRY: 54 deterministic fresh-artifact checks

BLEND_SNAP_ROOT=/tmp/laidies-blend-snap-repair2.AMidgT \
  node scripts/test-blend-snap-browser.mjs
✓ BLEND & SNAP BROWSER: 90 rendered fresh-artifact checks

node scripts/validate-public-metadata.mjs \
  /tmp/laidies-blend-snap-repair2.AMidgT
PASS

node scripts/check-inline-js.js
✓ INLINE JS: 353 scripts parse across 132 live pages.

node scripts/check-local-links.js
✓ LOCAL LINKS: 1941 local references resolve across 110 pages.

node scripts/check-town.js
✓ CHECK-TOWN: canon, titles, links, index, rewards, and quizzes all agree.

node scripts/check-product-stewards.mjs
PRODUCT STEWARD SYSTEM PASS · products=65 · active=3/3

git diff --check -- [Repair 2 scope]
PASS
```

The rendered suite covers canonical ready state plus manifest failure, index
failure, stale manifest, missing component, index mismatch, injected private
metadata and an aborted late response. For every failure it asserts disabled
ordering, no component links, visible fallback/retry, nonempty atomic polite
status, `aria-busy=false` and retry focus. It also exercises a failed user
retry.

## Fresh artifact

```text
Path: /tmp/laidies-blend-snap-repair2.AMidgT
Files: 1,076
Size: 961.33 MiB
Public manifest SHA-256:
28fcd6e2558a7cd0d4b4285f1de9f8735082ce08054771d5b4cb0c7decc1a372
```

The builder still warns above the project's internal 750 MiB threshold. This
repair makes no release-size, deployment or public-state decision.

## Explicit holds

Still open and not claimed:

- native 200% browser zoom;
- VoiceOver;
- Safari and mobile Safari;
- newcomer comprehension;
- Ali visual approval;
- artifact-size/release-owner approval;
- independent Repair 2 re-judge;
- deployment and public-origin verification; and
- product analytics/customer-learning evidence.

No queue, Git, deploy, publication, external service or visual asset was
changed. The qualifying learning was appended to the existing weekly-pack
painpoint: rendered copy safety does not prove the delivered JSON excludes
private production metadata.
