## 2026-09-11 — Finish uncropped needs choices independently of art recovery

Ali reiterates that the “I want to learn” icons were meant to change and cropping was meant to be fixed. The earlier choice to hold both behind artwork identification was wrong. Apply the already-prepared full-image framing across all six cards now: complete images above text, proportional contain frames, consistent heights within each row, no tall narrow image strips. Preserve Paige and Chick Flicks. In parallel, inspect actual earlier preview deployments for the original purpose-made shortcut icons. Learn replacement: reuse the existing current AI Fundamentals 101 book artwork (assets/library-101/bright-family-v2/textbook-ai-fundamentals-101.png), an actual learning resource, in place of the rejected Library exterior. This is a selected replacement, not a recovered original icon. Keep its source pixels unchanged. Useful/Fun replacement remains unresolved and must be reported separately.

## 2026-09-11 — Replace the dark-purple/orange discovery pairing

Ali rejects the dark purple and orange beside one another and flags “What brought you to town today” in that same colour discussion. Scope the adjustment to Did you know and the adjacent needs section; preserve wording, card artwork, layout, typography, carousel and the recently separated pink title/green burst. Use a brighter royal-blue banner with readable mint copy/lime links; make the needs section pink-led from its top instead of orange. This is not a sitewide ban on purple or orange. Preserve the approved lilac/pink wallpaper and the rejected Daily preview removal. Original shortcut art replacement remains unfinished.

## 2026-09-11 — Remove Daily activity preview from Homepage

Ali rejects the newly added “Try this today” block beneath the six needs choices: “i don’t think it belongs there” and “it looks terrible.” Remove the Homepage preview and its script/style imports. Keep the original activity in the NewsStand. Do not reintroduce this Homepage placement in subsequent NewsStand or Homepage releases without a new explicit decision. Preserve the six choices, all other Homepage sections, current artwork and runtime. The separate shortcut-art recovery remains HOLD for identifying the original Learn and Useful or Fun images.

# Homepage decisions — 2026-08-27

## 2026-09-08 — Retire the old dark-wood KSVL booth

Ali explicitly rejects the old KSVL studio pictured in the homepage's Make it stick step as outdated and cottagecore. Remove it from the homepage and retire `assets/building-interiors/ksvl-booth.jpg` and the same-scene export `approved-assets/building-interiors/ksvl-booth.png`. Do not select, re-export, recolour or restore this image family. Retain historical evidence only. The separately approved KSVL sticker collage and working radio controls are not retired. Enforce the retirement through the existing asset registry and build/artifact checks, including rejection of these exact image bytes under a new filename.

## 2026-09-08 — Recover the existing full Resident Card explanation

Ali has repeatedly requested reuse of the earlier complete explanation. Further piecemeal replacements are rejected. The July 12 homepage source `35e323cf5b10ddf3ef58e7ff08c53578dcd1f7ee:index.html#collect` has been recovered in `operations/product-stewards/town-entry-homepage/resident-card-explanation-recovered-20260712.md`, with the complete wording, what was lost, and Ali's later corrections. The July 12 copy audit says the Closet section was built with her direction and explicitly prohibits copy invented mid-redline. Use the recovered full explanation as the baseline, incorporate her explicit corrections, and reconcile implementation gaps separately. Do not reconstruct the product promise from one tested route or rewrite it around those gaps. This recovery did not edit or deploy the homepage.

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


## 2026-09-11 — Restore missing discovery features; bright women heading
Ali confirms the women-feature title must use a bright, readable brand colour. Dark navy is superseded; preserve exact copy, Jost Bold, artwork and pink subheadings. Restore the already-built third masthead button (Find what I need), slim rotating Did you know strip with approved imagery/pink title/green burst, and initially collapsed full directory with full-width show/close pill. Preserve the established masthead → discovery strip → needs shortcuts → compact directory order. Base this recovery on current production, retaining current NewsStand activity/coverage and Miss Jeeves/shared service code. Never equate a preview feature with a published feature; final live checks must verify each requested component visibly and functionally.

The recovery also restores the previously implemented shared KSVL loader: each town page using the shared header loads the canonical deck once, so saved controls can reappear after navigation. Library needs no page-specific workaround.

## 2026-09-11 — Bright directory description
Ali rejects the dark text in the paragraph beside “Everything you can do in LAiDIES.” Use bright brand-coloured text with readable separation from the blue patterned ground. Scope `.feature-directory-head>p`; preserve its wording/Jost/size, all26 directory links, collapsed disclosure and surrounding colours.
Implementation: existing coral #ff7366 with a compact rounded navy #11183b paragraph backing keeps bright body copy legible across the blue gradient; do not add letter outlines or change the font.

## 2026-09-11 — Restore approved wallpaper; reject dark directory box
Ali rejects the navy paragraph box and orange-looking coral text. That treatment and its prior visual admission are superseded. Remove the box; use bright lime copy directly on the existing blue directory background, preserving wording, Jost and collapsed links. Do not add another dark panel or heavy letter effects.

Ali also flags the missing whole-page wallpaper and asks for the existing roller-skate/computer imagery. Restore the exact approved `assets/homepage/rewind-wallpaper-20260906.webp`: lilac ground, pink skates/lips/shoes plus computers, cassettes and other Rewind Era objects. Use the approved 680px desktop / 480px phone repeat; no regeneration or recolouring. Compare approved preview8f133695 with current live for lost visual corrections before release. Use a fresh production HTML base and explicit visual deltas, never roll back current service/runtime/content work with the old preview wholesale.

Readability implementation: the box-free lime body text has insufficient contrast against the former cyan end of the directory gradient. Keep the whole section blue, with royal-blue endpoints #2051cf and #234bd0 (minimum 4.51:1 against existing lime). Preserve body font weight and size; no separate backing or text outline. The approved wallpaper itself is retained byte-for-byte.

## 2026-09-11 — Did you know title readability
Ali flags the pink heading running across the large pink question mark as still difficult to read. Preserve hot-pink Jost Bold, its dark outline, the approved question-mark artwork and lime burst. The implementation must give the words a clear area: reduce the graphic and place it immediately above the label, with the green burst behind the mark, consistently across widths. Do not add a dark text box, change banner copy/links/palette, regenerate art, or regress the restored global wallpaper and collapsed directory.

## 2026-09-11 — Shortcut artwork and complete framing
Ali again rejects the Library exterior for “I want to learn” and the grainy Girl Talk Truth/Dare artwork for “I want something useful or fun”. Those sources must not be selected for these shortcut jobs. This is a slot-specific exclusion; Library building art and current Truth/Dare game art are not globally retired. Paige and Chick Flicks remain, per Ali's earlier explicit instruction. Show the full artwork in every shortcut instead of cover-cropping landscape pictures into narrow vertical strips. Preserve current routes, live NewsStand/episode copy, fonts and card accents; match card heights within each row.

Recovery truth: the September7 asset-recovery record is OPEN, and its review explicitly did not resolve the original purpose-made shortcut set. Targeted history and image-job register review has not established the Learn/Useful-or-Fun replacements. Do not describe that work as previously completed. The current framing pilot is independent work, not a resolved artwork candidate. A concise question asking what the two originals depicted was sent while framing work continued.
