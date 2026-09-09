# Homepage decisions — 2026-08-27

## 2026-09-08 — Explain the ten-sticker pouch in plain language

Ali rejects the unexplained term “Puffy bookmarks” in the Resident Card benefits. Describe the puffy stickers in plain language. Their intended scope is **any place on the LAiDIES site that the visitor wants to save to her Closet**, not only the LIBRAiRY. This supersedes the Library-only framing of the September 7 benefits description and the first two September 8 copy corrections. Keep the existing Library book/chapter/section saves as part of this broader feature, not its definition.

Ali further clarifies the mechanism: visitors select the ten sticker designs they want to use, pick from that selection when saving, and can change their ten selected designs at any time. The first correction omitted this selection step and was rejected. Explain the selectable, changeable designs; do not describe a fixed allocation of ten stickers or imply a ten-save limit.

Status: local wording correction; not deployed. The copy no longer restricts stickers to Library pages, but a universal working-save promise remains held until sitewide coverage is implemented and verified. Preview deployment also remains pending the coordinated NewsStand release handoff. The separate one-Resident-sign-in integration remains in progress and is not made live by this copy change.

Implementation gap found September 8: the existing generic picker and Closet Board can store non-Library places, but `content/site/puffy-bookmarks.js` only accepts an explicit route allowlist and the runtime/targets are connected to selected surfaces. Source inventory found Library, Handbook and Gift Shop saves; SUNNYVAiLE High has an inert target without the runtime. This is source evidence, not an all-page live test. Direct live runtime inspection was unavailable (HTTP 403 and browser navigation blocked); the existing homepage preview was read successfully and still contains the old wording.

Next functional correction: reuse the existing ten-design selector, picker, saved-place records and Closet Board across the public site. Verify saving an exact place outside the Library, reopening it from the Closet, changing the selected designs without losing earlier saves, and removing a save. Extend coverage without treating page navigation as saved private activity or changing account-sync promises. Keep the NewsStand release ownership and unfinished shared-sign-in work intact.

Prevention: a successful Library save journey proves that route only. It must never be used to narrow the product's sitewide purpose or to claim universal coverage. Behind the Build angle: distinguish the intended feature from the one path that was tested.

## Current incumbent and bounded prototype carry-forward

- **LOCKED:** The live Homepage remains the incumbent. The rejected prototype is not a wholesale replacement source.
- **LOCKED:** Carry forward the “What brought you here?” entry choices as the useful prototype navigation concept. Exact live implementation remains a separate bounded Homepage change.
- **LOCKED:** Put the exact existing Episode 04 cover, `assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png`, inside the Homepage **Inside the LUMINAiRY** feature. It is not a separate broad women section.
- **LOCKED:** The “women behind AI” feature names only **MAiVENS** and **TRAiLBLAZERS**. Patron Saints are pop-culture icons used to teach; they are not presented as women behind AI.
- **LOCKED:** This ruling does not revive any other Homepage image held or rejected by the public asset controller.

Authority: Ali direct rulings in the Homepage review, 2026-08-27. Exact asset authority is recorded by `operations/assets/active-asset-registry.json` role `episode.04.static-cover`.
