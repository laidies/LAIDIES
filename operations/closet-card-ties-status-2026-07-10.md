# Residence Card / Closet ties — promised-vs-actual — 2026-07-10

**The short answer to "absolutely NONE of them have been done": that's not what the code says.** Most of the Closet *vessels and dashboards* are shipped and working. What was genuinely thin is the **building-side "trip" ties** — the "make this mine →" affordances that are supposed to live *inside each building* and write back to the card. Four of those were wired; a few were missing or inert; one (**Town Regular → Town Hall**) I wired today; two (cocktail, song) still need a product call.

So the honest read: **she's right that the *building pickers* were incomplete** (the most visible, "I walked into the BRONZE AiGE and there was no button" part), and **wrong that nothing shipped** (the Closet itself is largely built out).

Canon for these ties: `customization-is-a-trip` + `residence-card-format-v2` + `your-coven-locked` + the vessel memories (`town-wallet`, `butterfly-clip-jar`, `closet-report-card-dashboard`, `puffy-sticker-bookmarks`).

---

## A. Building → Card "trip" ties (every customization is a trip)

The rule: you change a card field by *visiting the building that owns it*, and the building writes the value back. Verified by which page calls `localStorage.setItem` for each key.

| Card field | Owning building | Status | Evidence |
|---|---|---|---|
| **Avatar (object)** | Pieces of Flair (Mall) | **WIRED** | `mall/pieces-of-flair.html` "Wear this →" writes `laidies_avatar` (line ~219–221), toast links back to card |
| **Favourite SAiNT** | The LUMINAiRY | **WIRED** | `luminairy.html` "★ One of my Luminaries" chip writes `laidies_saint` + `COVEN_KEYS` (~1355) |
| **Favourite MAiVEN** | LUMINAiRY · MAiVENS wing | **WIRED** | `luminairy.html` writes `laidies_maven` |
| **Favourite TRAiLBLAZER** | LUMINAiRY · TRAiLBLAZERS wing | **WIRED** | `luminairy.html` writes `laidies_builder` |
| **Town Regular / Character** | Town Hall (#regulars) | **WIRED TODAY** ✅ | Closet slot linked to `town-hall.html#regulars` but the page had **no picker**. Added a `.sv-trip-tie` picker writing `laidies_town_regular`; verified round-trips into the Closet's "Your Luminaries" band |
| **Cocktail of the week** | BRONZE AiGE | **PARTIAL** | `bronze-aige.html` has the callout + a "make it official on your card →" link (~360–365), but **no on-page pick** — card field is free-text. Needs a cocktail menu decision |
| **Favourite song / jam** | KSVL Radio | **PARTIAL** | `radio.html` callout was **inert (no link at all)**; today I gave it the same "set your song on your card →" resolution BRONZE AiGE uses. A real on-page picker is a product call (radio is 10 bands/albums; the card's song field is a fixed 6-item enum — taxonomies don't match) |
| **Study Pack → Trading cards** | Blend & Snap | **PARTIAL** | `blend-snap.html` has the "Study Pack — this is where you grab it" callout + trading-card content + card link; end-to-end "drops into the binder vessel" not fully traced |
| **Favourite episode** | Chick Flicks | **MISSING** | `chick-flicks.html` has **no** card callout; the card's episode field is a local dropdown only (`editEpisode`, populated from `episode-index.json`) |
| **Currently reading** | The LIBRAiRY | **MISSING (aspirational)** | In the routing table but there is **no** reading field on card v2 and no callout on `library.html`. Not a regression — never existed |
| **Storefront / Activity / Quote / Motto** | (on-card, interim) | **BY DESIGN** | Local pickers in the Closet Edit panel. Memory explicitly allows these "until buildings earn them" |

**Score on trips: 5 wired (one today), 3 partial, 2 missing (1 of which was never speced into the card).**

---

## B. Closet vessels & dashboards (the "banks")

These live *on* the Closet (`laidies-card.html`) and are the bulk of what "the ties" produce. Almost all shipped.

| Vessel / dashboard | Status | Evidence |
|---|---|---|
| **Town Wallet** (17 building membership cards, visit counts, "Visit" links) | **WIRED** | `#walletGrid` (~1011) rendered from `SV_BUILDINGS`; `sv-you-are-here.js` stamps `laidies_building_visits` |
| **Butterfly Clip Jar** (quiz scores → clips) | **WIRED** | `#butterflyJar` (~1341), derived from `laidiesQuizProgress` / `laidiesQuizBestScores` — never double-tracked |
| **Report Card dashboard** (9 stat tiles, have-vs-missing) | **WIRED** | `#dashboardSection` (~1071); mirrors count elements via MutationObserver |
| **Your Luminaries band** (4 pantheon slots) | **WIRED** | `#covenSection` (~1191); reads `laidies_saint/maven/builder/town_regular`. Slot 4's building picker is the gap I closed today |
| **Wednesday Tour check-ins** (8 stops) | **WIRED** | `#tourSection` (~1226); `sv-tour-checkin.js` included on 10 building pages |
| **Charm bracelet** (hidden-in-town hunt) | **WIRED** | `#charmBracelet` (~1336); `charm-hunt.js` site-wide |
| **Detention slips** | **WIRED** | `#detentionSlips` (~1385) |
| **KSVL / Dare stickers → sticker book** | **PARTIAL** | KSVL writes `laidies_ksvl_stickers_*`; Girl Talk writes `laidies_gt_stickers_*`; sticker-book surface present but cross-source consolidation not fully verified |
| **Puffy Sticker Bookmarks → Puffy Board** | **MISSING / NOT BUILT** | Locked 2026-07-03 but **zero** references in `laidies-card.html`; no `laidies_puffies_placed`, no "Place a puffy" affordance anywhere. This is the one whole locked feature with no implementation |

---

## C. What I changed today (safe, on-brand, verified)

1. **`town-hall.html` — wired the Town Regular tie (the real gap).**
   - Added `data-town-slug` to the 4 Regulars cards (`mme-claio`, `fairy-godmother`, `dj-sunnyv`, `mayor-deb`).
   - Added a `.sv-trip-tie` "Your Town Regular — this is where you pick her" callout with 4 pick chips + a live "she's in Your Luminaries · See it on your card →" readout. Writes `laidies_town_regular` (the exact key the Closet reads via `TOWN_LABEL`).
   - Uses only existing tokens/components (`.sv-trip-tie`, `--plum/--rose/--gold/--cream`, Jost). Carries the standard Part-C migration note.
   - **Verified in preview:** click writes the key, single-select + toggle-off work, picked chip + card outline render, and the Closet's `#covenTownPick` renders the chosen name ("FAiRY Godmother"). Test `laidies_*` keys cleaned up.

2. **`radio.html` — de-inerted the song callout.** The "Pick your favourite jam" `.sv-trip-tie` had no link at all (dead-ended on a promise). Added the same `.sv-trip-tie__note` "set your song on your card →" that BRONZE AiGE uses, so it resolves somewhere consistent.

*(No images touched, no git, index.html and sv-welcome-tour.js untouched.)*

---

## D. Needs HER decision (left deliberately)

1. **Cocktail picker at the BRONZE AiGE.** Card field is free-text today. To make it a real trip, decide the cocktail menu (fixed list? or "order what you drank at the game"?). Then it's the same pattern as Town Regular.
2. **Song picker at KSVL.** The card's song field is a fixed 6-item enum; the radio page is 10 bands/albums. Decide which tracks are "favourite-able" (the 6 card songs only? or any album track?) before wiring an on-page "set as my song".
3. **Favourite episode at Chick Flicks.** No callout there yet. Cheap to add a per-episode "favourite this →" once you confirm the episode key/field name should be authoritative from the building vs. the card dropdown.
4. **Puffy Board — the one unbuilt locked feature.** Puffy Sticker Bookmarks (locked 2026-07-03) has no implementation anywhere. This is a real build, not a wiring fix — needs scoping (savable-section anchors site-wide + the Closet board + the placement UX).
5. **Trading-card drop from Blend & Snap into the binder** — confirm the Study Pack actually deposits cards into the Closet binder vessel end-to-end, or wire it if it only links.
