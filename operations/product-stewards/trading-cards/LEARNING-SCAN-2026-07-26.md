# Learning Scan — Trading Cards Owner Recovery

**Date:** 2026-07-26  
**Shared-ledger action:** CAPTURED FOR CONTROL ROOM INTEGRATION — no shared
pain-points lock was held during dossier-only recovery.

## Qualifying prevention rules

### Phantom owner entry

**Failure:** a registry row and parent assignment made Trading Cards look
owned, but the exact dossier/state files and run-queue binding did not exist.

**Prevention:** every dispatch must pass
`node scripts/check-product-stewards.mjs --owner-entry <id>` and show a real
task binding before the lane can be called `RUNNING`.

**Behind the Build angle:** “A name in the org chart is not a working product
owner.”

### Variants are not a roster

**Failure:** four JoJo files and an old 13-character prompt could be mistaken
for character-deck progress even though they represent one identity and only
one family.

**Prevention:** count unique stable `card_key` identities by admitted family,
not files, prompt rows or finishes. Require a signed machine roster and reject
duplicate identity/finish inflation.

**Behind the Build angle:** “Four files, one character: why asset counts lie.”

### Upstream receipt is not receiver admission

**Surprise:** the Weekly Episodes contract still recorded the receiver files
as missing after they were recovered in this turn.

**Prevention:** producer handoffs are immutable observations; receiver returns
a checksum-bound receipt with current status. Never rewrite producer history
or treat a captured dependency as a commission.

**Behind the Build angle:** “The handshake that keeps two truthful teams from
overwriting each other's reality.”

### Style history is not current visual authority

**Failure risk:** reference-library wording called a look locked, while Ali's
new sequence ruling pauses style selection until the sitewide direction.

**Prevention:** later, narrower Ali rulings supersede earlier surface locks.
Record prior refs as candidate constraints and require a fresh
KEEP/ADAPT/REJECT decision before generation.

**Behind the Build angle:** “A style reference can stay useful without staying
in charge.”

