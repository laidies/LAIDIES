# Mme CLAi-O controlled fortune — Repair 2 maker evidence

**Status:** REPAIR 2 BUILT LOCALLY — SOURCE AND EXACT-ARTIFACT ADVERSARIAL
SUITES PASS; INDEPENDENT REJUDGE AND RELEASE HOLDS REMAIN  
**Date:** 2026-07-25  
**Exact candidate:** `/tmp/laidies-mme-claio-repair2.C1ERxP`

## Bounded repair

Repair 2 changes only badge timestamp admission and its evidence:

- `unlockedAt` must exactly match `YYYY-MM-DDTHH:mm:ss.sssZ`;
- year, month, day, hour, minute, second and millisecond components are checked
  arithmetically, including Gregorian leap-year and month-length rules;
- `new Date(parsed).toISOString()` must exactly equal the stored value;
- the parsed timestamp must be no later than `Date.now()` with zero future
  tolerance; and
- invalid members are removed without removing unrelated valid siblings.

The flawed five-minute tolerance assertion was removed. The existing random
fortune, no-free-text, safety, contrast, state bounds, deck, art,
Businesswomen's Special and redirect implementation was not redesigned.

## Adversarial timestamp matrix

The same rendered matrix passed against source and the exact artifact.
`Date.now()` was fixed only inside the synthetic browser context so the +1 ms
boundary could not become past while the page loaded.

| Fixture | Expected | Result |
|---|---|---|
| exact valid past timestamp | preserve | PASS |
| exact timestamp equal to current millisecond | preserve | PASS |
| valid leap timestamp `2024-02-29T23:59:59.999Z` | preserve | PASS |
| current time +1 ms | discard | PASS |
| current time +60 seconds | discard | PASS |
| impossible `2026-02-31` | discard | PASS |
| non-leap `2025-02-29` | discard | PASS |
| short-month `2026-04-31` | discard | PASS |
| one-digit month width | discard | PASS |
| missing milliseconds | discard | PASS |
| `+00:00` timezone variant | discard | PASS |
| space-separated date/time | discard | PASS |
| date-only value | discard | PASS |
| malformed value | discard | PASS |
| future device-local Hotline Regular | discard | PASS |
| valid unrelated sibling beside invalid members | preserve | PASS |
| scoped reset after sanitation | remove only Hotline Regular; preserve siblings | PASS |

## Verification

```text
node scripts/test-mme-claio-contract.mjs
MME CLAi-O CONTRACT PASS
deck_cards=100

PLAYWRIGHT_CORE_PATH=... node scripts/test-mme-claio-browser.mjs
MME CLAi-O BROWSER PASS
journeys=random-truth,no-free-text,keyboard,focus,live-result,non-repeat,
badge-local,scoped-reset,storage-denial,count-extremes,canonical-history,
unknown-card,strict-iso-utc-badge-time,reduced-motion,320-390-reflow,
contrast,redirect,bws-boundary

MME_CLAIO_ROOT=/tmp/laidies-mme-claio-repair2.C1ERxP
PLAYWRIGHT_CORE_PATH=... node scripts/test-mme-claio-browser.mjs
MME CLAi-O BROWSER PASS
```

Additional checks:

```text
Public artifact: 1077 files, 961.39 MiB
Warning: artifact exceeds 750 MiB.
public metadata: PASS
inline JavaScript: PASS — 353 scripts / 132 pages
local links: PASS — 1,949 references / 110 pages
town contract: PASS
product steward system: PASS — 65 products / 3 of 3 active
scoped git diff --check: PASS
private dossier absent from artifact: PASS
```

## Exact candidate identity

| Governed file | Matching source/artifact SHA-256 |
|---|---|
| `games/madame-claio.html` | `55f8e6deefe9c079630f7ab89d183e02487e5d7d332fe44d9c0fc06b34db518e` |
| `content/madame-claio-v2.css` | `3e01ae24344d99d416a6b8b43106ac84ae6164fa26f139407af19ccaa4cedf81` |
| `content/site/madame-claio-v2.js` | `567c2d0116ef2bc5abf62899945fb66d5bc00e0ea532cfd06e40a64d1914ed93` |
| `games/cocktail-fortune.html` | `0b1486e191272b7980d476ef35298bd866d8b01eee8ef5fa0cd56d4276f50603` |
| `games/businesswomens-special.html` | `80da00f08a31608bc89c15a078eefa6c100d91a3eb466ee7c978ece42c36e928` |

The governed deck remains exactly 100 cards with unchanged extracted-source
SHA-256
`f3408d996e7628a52d6af65c69b2ad2c792fe86cc4b1ff87d96f3fe0a264c6c3`.
No deck entry or art asset was changed.

## Preserved holds

This is maker evidence, not independent approval. It does not clear:

- Ali's visual or creative approval;
- Safari, VoiceOver, native zoom/text scaling or representative physical
  devices;
- production Plausible/Clarity privacy configuration or network/event
  properties;
- public-origin canonical/redirect behavior;
- backend, account or durable-reward claims;
- deployment, publication, promotion or any external mutation.

The existing 750 MiB artifact-size advisory remains. No Git, queue, painpoint,
deployment, public or external mutation occurred. The relevant strict-calendar
prevention rule already exists in `BTB-104`; this cycle applied it and found no
new qualifying learning.
