# PATRON SAiNT artwork reconciliation — 2026-07-27

**Status:** REPORT READY — read-only reconciliation; no art, public source,
deployment, claim registry, or canon was changed.

**Trigger:** Ali asked whether artwork was missing for recently added patrons.

**Scope:** recent/additional PATRON SAiNT portrait candidates, their effective
canon, files, admission evidence, public wiring and Episode 01–03 placements.
This is an evidence handoff to the LUMINAiRY editorial/art owner and affected
KSVL, MAiKEOVER, Resident Card/Closet and episode owners.

## Bottom line

The original four-new-saints batch is **not missing**: Samantha, Sister Mary
Clarence, Oprah and J.Lo each have a 1024×1536 PNG plus a 760×1140 derivative
JPG. However, later roster records explicitly replace J.Lo with Bette Midler
and cut Oprah. The current reusable roster is therefore not the old four.

The real current artwork shortage is **Carrie Bradshaw and Dionne Davenport**.
Neither has a portrait file anywhere under `assets/saints*`. Existing current
faces Bette Midler, the Golden Girls and Jessica Fletcher do have portraits.

No reviewed/admitted patron portrait currently has an art-admission receipt.
The LUMINAiRY's editorial receipt manifest is empty, every saint content
record is `held`, and every registry selector uses `data-saint-id` while the
live saint cards use `data-saint-slug` (or no identifier). Thus artwork presence
does not authorise a claim, profile or collectible.

## Canon reconciliation

### Authoritative current working roster for this handoff

`operations/codex-prompts/_saint-cards-BLOCKED.md` records the later 07-18
locked keeps as Cher+Dionne, David, Elle, Samantha, Miranda, Deb, Buffy, Dolly,
Sister Mary Clarence, Carrie, Bette, Golden Girls, Jessica and Regina as the
anti-saint. It also expressly says: **Oprah and J.Lo are CUT and must never
appear on a card.** `HANDOVER.md` independently records Bette replacing J.Lo
and Golden Girls/Jessica being added. These later decision records prevail over
the older 07-10 `operations/voice/laidies-writing-lock.md` and
`operations/audio/season-01-bible.md` lists that still include Oprah/J.Lo.

**Open truth boundary:** the blocked-card record itself says collective-card
format, Jessica's Court title and final canon closure need Ali reconciliation.
It is sufficient to identify obsolete wires and missing faces; it is not
authority to publish, generate, admit or card any person.

## Evidence matrix

| Person / seat | Classification | Exact art evidence | Admission / wiring finding | Required disposition |
|---|---|---|---|---|
| Samantha Jones | **EXISTS BUT UNADMITTED** | `assets/saints/y2k-stained-glass-v2/samantha-jones-y2k-stained-glass.png` — SHA-256 `510b8d…12395`, 1024×1536; served JPG SHA-256 `99318d…8672c`, 760×1140 | Visible in `luminairy.html`; supported in KSVL, MAiKEOVER, Closet and Dream Phone. Its registry entry is `held`; no receipt exists; selector does not bind live markup. Curation calls it `redo`. | Keep as candidate only. Atomic editorial/rights/art review and selector repair are prerequisites to admission. |
| Sister Mary Clarence / Deloris | **EXISTS BUT UNADMITTED** | `assets/saints/y2k-stained-glass-v2/sister-mary-clarence-y2k-stained-glass.png` — `ec51db…b82f`, 1024×1536; served JPG `488411…393e`, 760×1140 | Visible in LUMINAiRY; KSVL, MAiKEOVER, Closet and Dream Phone have a consumer. `held`, no receipt, selector mismatch; curation says `redo`. | Same bounded review batch as Samantha. Preserve the Deloris/Sister Mary identity convention in every consumer. |
| Oprah Winfrey | **EXISTS BUT UNWIRED/MISLABELLED** | `assets/saints/y2k-stained-glass-v2/oprah-winfrey-y2k-stained-glass.png` — `357cf9…c6a9c`, 1024×1536; served JPG `ee7395…8d91`, 760×1140 | Later canon says CUT, yet LUMINAiRY, MAiKEOVER, Closet, Dream Phone and a preview Homepage still list her. Her `held` registry record does not bind live markup. No KSVL saint track. | Quarantine from production and remove/replace stale consumer references in one coordinated canon-correction batch; do not generate replacement art for Oprah. |
| Jennifer Lopez / J.Lo | **EXISTS BUT UNWIRED/MISLABELLED** | `assets/saints/y2k-stained-glass-v2/jennifer-lopez-y2k-stained-glass.png` — `719ca9…3cc7`, 1024×1536; served JPG `265c85…ac04`, 760×1140 | Later canon says Bette replaces J.Lo. Not on current `luminairy.html`, but still consumed by Dream Phone and a preview Homepage and remains in asset folders. No LUMINAiRY claim record, KSVL track, MAiKEOVER or Closet option. | Quarantine; retain only as historical/rejected evidence. Correct Dream Phone and preview references under the roster-correction packet. |
| Bette Midler | **EXISTS BUT UNADMITTED** | `assets/saints/y2k-stained-glass-v2/bette-midler-y2k-stained-glass.png` — `f5a0c0…9b6f`, 1024×1536; served JPG `cda83a…9025`, 760×1140 | LUMINAiRY/KSVL/MAiKEOVER/Closet wired, but `held`, no receipt, selector mismatch. | Include in the current-seat review batch, not a new-render batch. |
| Golden Girls | **EXISTS BUT UNADMITTED** | `assets/saints/y2k-stained-glass-v2/golden-girls-y2k-stained-glass.png` — `05d87a…b74`, 1024×1536; served JPG `be8f82…6963`, 760×1140 | LUMINAiRY/KSVL/MAiKEOVER/Closet wired; `held`, no receipt, selector mismatch. Collective format remains unresolved. | Review as a collective-seat candidate; do not turn into a trading card before format ruling. |
| Jessica Fletcher | **EXISTS BUT UNADMITTED** | `assets/saints/y2k-stained-glass-v2/jessica-fletcher-y2k-stained-glass.png` — `0cf3a3…53b5`, 1024×1536; served JPG `3899b6…799`, 760×1140 | LUMINAiRY/MAiKEOVER/Closet wired; `held`, no receipt, selector mismatch. No KSVL track; Court title is TBD. | No new portrait needed. Hold until title/claim/rights review. |
| Carrie Bradshaw | **MISSING** | No `carrie-bradshaw*` file under `assets/saints*`. | Episode 01 invokes Carrie only as an analogy; its canon does not designate a patron saint and the E01 package says face/portrait treatment is pending. No LUMINAiRY, KSVL, MAiKEOVER, Closet or Dream Phone wiring. | Production batch 1 after current roster confirmation: one portrait plus atomic claim/wiring packet. Do not retrofit Episode 01 as a saint placement. |
| Dionne Davenport | **MISSING** | No `dionne-davenport*` file under `assets/saints*`. | No current live consumer was found. It is part of the locked Cher+Dionne duo, not a standalone implied replacement. | Production batch 1 after collective-format ruling: one duo-composition/portrait treatment, not an assumed individual trading card. |

Hash abbreviations above are SHA-256 prefixes; full checksums can be regenerated
with `shasum -a 256 <path>`. PNG and JPG variants are distinct delivery files,
not byte-identical copies.

## Broken bindings and placements

1. **LUMINAiRY:** all 14 saint registry rows are `held`; the receipts array is
   empty. The registry expects `[data-saint-id="…"]`; `luminairy.html` uses
   `data-saint-slug` for most newer cards and no data ID on several legacy
   cards. No row can prove exact DOM binding. Visible older prose therefore
   remains held by policy, not admitted.
2. **Counts/copy:** the LUMINAiRY door claims “14 portraits · 10 anthems” while
   the KSVL saint mix contains 12 tracks and live LUMINAiRY shows 14 cards
   including the anti-saint and stale Oprah.
3. **KSVL:** Samantha and Sister Mary have songs/intros; Bette and Golden Girls
   do too. Oprah/J.Lo do not. Jessica has no track. The music roster does not
   make the portrait or the person claim admitted.
4. **MAiKEOVER / Closet:** both still expose Oprah. They correctly include
   Bette/Golden Girls/Jessica but not J.Lo. These selections must be reconciled
   with the authoritative roster before any persistence or reward claim.
5. **Dream Phone:** still contains Oprah and J.Lo and lacks Bette, Golden Girls
   and Jessica. Its parked patron-saint deduction model is not a valid source of
   roster truth and should not be used to repopulate another surface.
6. **Homepage:** only `preview-homepage.html` carries the old four. It is not
   the current `index.html`, but must be corrected or clearly retained as stale
   evidence before it is reused.
7. **Episodes 01–03:** no new patron portrait is an admitted visual placement.
   E01 mentions Samantha and Carrie as analogies but explicitly has **no single
   patron saint**. E02 has David; E03 uses Elle/Regina. Do not add a patron
   portrait to those masters merely because the building roster changes.

## Safe next production batches (after the sitewide visual lock)

1. **Roster-correction only — no image generation:** promote the later roster
   decision into a single canonical roster record; quarantine Oprah/J.Lo;
   repair stale LUMINAiRY, MAiKEOVER, Closet, Dream Phone and preview consumers;
   reconcile counts. Independent content/rights judge required.
2. **Current-existing-art admission:** Samantha, Sister Mary, Bette, Golden
   Girls and Jessica. For each: exact visual candidate, likeness/rights review,
   atomic labelled interpretation, source/evidence/date/caveat, real DOM
   selector, offline independent receipt and an owner visual admission. Keep
   claims held until all pass.
3. **Missing-current-art:** Carrie plus the Cher+Dionne treatment only after
   Ali resolves collective format and the global website visual decision allows
   production. Use the then-approved portrait system and run maker/judge
   separation before any public wire.
4. **Downstream additions:** KSVL songs, Closet options, MAiKEOVER choices,
   Dream Phone data and episode use are separate product decisions; do not
   auto-create or infer them from a completed image.

## Learning scan

This is a recurrence of the already logged roster-drift failure: old art and
consumer lists outlived later canon cuts. Prevention for the next batch:
**one canonical roster ID/version must be checked by every portrait generator,
asset register, consumer and claim-admission test; a portrait’s existence must
never be interpreted as roster membership or publication approval.** The
existing `operations/codex-prompts/_saint-cards-BLOCKED.md` already encodes this
rule, so no duplicate global painpoint entry was appended during this read-only
handoff.

