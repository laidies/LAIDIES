# Independent review — Community legacy Resident Card boundary

**Review time:** 2026-07-27 America/Vancouver  
**Verdict:** `ACCEPT — LOCAL SECURITY / TRUTH BOUNDARY FIX`

This accepts removal of the obsolete Community consumer of `laidies-my-card`.
It does not add Community membership, account identity, provider sign-in,
publishing, cross-device recovery, deployment or public proof.

## Frozen maker inputs

| File | SHA-256 | Result |
| --- | --- | --- |
| `community.html` | `349f5c04fb4f5473913f5b0e597675cf3956dfcd292bae497e18cfc76d382c52` | exact |
| Boundary browser test | `0b0e003dab5bc4dfe5cd1846ee525681f5029b60e07126d29dcb624ff9133c5d` | exact |

## Independent hostile-browser verdict

I injected a hostile legacy `laidies-my-card` envelope before Community loaded,
including markup-shaped `name`, `photo`, `role`, `journey`, `tools` and
`helpWith` values. The exact browser check passes:

```text
COMMUNITY RESIDENT CARD BOUNDARY PASS checks=17 legacy=absent hostile=contained stock=preserved
```

It proves all of the following:

- no legacy storage read, `loadMemberCards` function or dynamic `my-card`
  record remains;
- hostile data cannot add an eighth card, create hostile markup or execute;
- the exact seven static Community cards remain;
- a stock card opens via keyboard, Escape closes its overlay and focus returns
  to its opener;
- the static member filter exposes exactly four bounded member records;
- the visible Resident Card CTA says the Card stays in this browser, is not
  Community sign-in and does not unlock or publish anything.

## Overlapping contract verification

The surrounding contracts also pass unchanged:

```text
Resident Card contract: 31/31 passed
Resident Card shared contract: 34/34 passed
Resident Card browser: 127/127 passed
SORORITY HOUSE CONTRACT PASS checks=66 rooms=7
```

These explicitly preserve the intended division: the Card is a strict
device-local envelope; Community/Hyvor provider identity remains separate; a
local Card cannot unlock Community access, reward, Closet ownership, account
authority or cross-device state.

Resident Card owner-entry and scoped diff checks pass. Existing unrelated
metadata edits were not changed or reclassified by this review.

## Remaining gates

1. Any future Community orientation surface must consume the shared Resident
   Card projection using safe DOM APIs and receive a new boundary/accessibility
   review.
2. Account-backed Resident Card identity, Community provider lifecycle,
   publishing/moderation, native accessibility and public-origin verification
   remain distinct unproved contracts.

## Learning scan

**Closed security opportunity:** obsolete local identity storage can no longer
be promoted into a Community card or inserted into markup. Prevention rule:
legacy browser keys must never create identity, account or provider affordances;
retire the consumer completely, test hostile pre-load storage, then prove
static-product functionality still works by keyboard.

