# Puffy saves and retrieval subproduct dossier

**Status:** **BUILT LOCALLY — DEVICE-LOCAL TRUTH REPAIRED; INDEPENDENT REVIEW
REQUIRED**

## Job

Turn a useful book or exact section into a same-device shortcut in My Closet.
The Puffy is retrieval, not mastery, a reward claim or account proof.

## Data contract

`laidies_puffies_board` stores JSON records with stable ID, title, summary,
exact Library URL, sticker, optional purpose and timestamp.
`laidies_puffy_sticker_pouch` stores up to ten selected stickers and private
purpose labels. Neither store is synced, backed up or cross-device.

The authoritative save event is a successful `setItem` followed by an exact
read-back. Failure reports that nothing was saved or removed and does not
paint a false saved state.

## Cycle 5 repair

- read-verified board and pouch writes;
- persistent storage-denial alert;
- save/remove abort on failed write;
- My Closet now uses sibling reopen-link and remove-button controls rather
  than a button nested inside a link; and
- deterministic source and exact-artifact save/reopen/remove/denial tests.

## Holds

Native Safari/private-mode behavior, storage migration/versioning, corrupt
record recovery, stale-heading migration, backup/sync and two-device journeys.
Evaluate `idb` or `idb-keyval` only if the product needs versioned local
storage; it would remain device-local and requires separate migration tests.

