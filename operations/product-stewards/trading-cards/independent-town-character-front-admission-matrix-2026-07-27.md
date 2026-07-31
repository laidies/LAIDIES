# Town Character Card fronts — independent admission matrix

**Verdict:** **HOLD — 13/13 exact fronts are visually accepted candidate art, but 0/13 is admitted as a product card.**

**Scope:** Judge-only assessment of the current Town-family front set. No image, candidate manifest, catalogue, pack, reward, Closet, production route, or release state was edited.

## Bound inputs independently reproduced

| Input | SHA-256 | Result |
| --- | --- | --- |
| Town candidate deck binding | `65068d0e57136cb74c9ca39f4e64ff51c4efbbace483f089f7855997e4524dc8` | exact; 13 unique keys; `candidate_unadmitted` |
| Candidate asset manifest | `20fab032577ff3145b2d61b12530eae252582143caedeea75dd2a4b71877e7c1` | exact; 13 unique card keys |
| Town roster authority | `b8b5cf20816b8cd24957aac2aa83698588fa54100aea40bcb5c4750cba8c307c` | exact Town-only authority |
| JoJo system reference | `0a0a1ed2b0271e42e9bbda6257d4a8273b730f16ecb03b5a829f2b032aab84c5` | exact; 1200 × 1680 |
| Batch 1 successor visual receipt | `445a2bc7193c4ca54fdbffab4d2d73dce96ab029536f8c5c58edf15e0839e458` | accepted visual candidates |
| Batch 2 visual receipt | `60df0a496ffcc18bef293ed42358261273fa76f5d34e7aaeba2400257e9373f9` | accepted visual candidates |

Every manifest image hash and every bound identity-reference hash recomputed exactly. Twelve candidate images are `1024 × 1536`; the existing JoJo reference front is `1200 × 1680`. `node scripts/check-product-stewards.mjs --owner-entry trading-cards`, candidate-key uniqueness assertions, and scoped `git diff --check` pass.

The locked card grammar is the JoJo-bound candy-palette, holographic 1990s pop-art/comic category treatment in `operations/episode-visual-system-lock.md`. Existing independent visual receipts establish continuity, readable front identity and no observed prohibited white-card, muddy/grunge, glamour-cartoon, or retired ornate-saint treatment in the accepted successor assets.

## Per-card admission matrix

All rows have a unique immutable candidate key, current Town-roster identity authority, and no episode-specific source: their only named pack is **candidate-only** `pack:character:town:v1`. No `character:town:*` catalogue/pack row exists in `content/` or `games/`; therefore no card is openable, grantable, ownable, rewardable or public.

| Card / exact front | Canonical identity, role and front observation | Proposed accessible front text (not yet approved copy) | Status | Literal remaining work / exact safe next action |
| --- | --- | --- | --- | --- |
| `character:town:mayor-deb:v1` — `5fbf207c…61559`, 1024×1536 | Mayor Deb · Mayor, Town Hall. Visible `MAYOR DEB` / `LOOP ME OUT.` matches roster seed. | “Mayor Deb at a Town Hall desk, holding a NOPE stamp; her Character Card says ‘Loop me out.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind exact front title/hook plus back heading `Mayor · Town Hall` and roster seed `Boundaries: ‘Loop me out.’` in a Town catalogue packet. |
| `character:town:mme-claio:v1` — `4f96d49a…46ad7`, 1024×1536 | Mme CLAi-O · Psychic, No. 5 MAiN. Visible pause/noticing hook is roster-aligned. | “Mme CLAi-O in her reading room with cards, crystal ball and pink telephone; her card says ‘Pause. Notice what you know.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind exact role/place and proposed back copy `Pause and notice what you already know.`; review copy/alt. |
| `character:town:dj-sunnyv:v1` — `bab3c98a…6dfad`, 1024×1536 | DJ SunnyV · DJ, KSVL 99.9. Successor v2 resolves prior size defect; visible hook aligns with roster. | “DJ SunnyV at the KSVL 99.9 mixing desk with turntables, microphone and headphones; her card says ‘Learn from hooks, not only books.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind exact front/title/hook and back copy `Learn from hooks, not only books.`; do not infer episode or radio-rights content. |
| `character:town:fairy-godmother:v1` — `ef346dad…0541`, 1024×1536 | The FAiRY Godmother · Wishmaker, Willow Lane. v2 is the accepted successor to the retired ornate treatment. | “The FAiRY Godmother at Willow Lane, holding a wand beside an envelope, scroll and checklist; her card says ‘Bring a wish. Take a plan.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Bring a wish; take a plan.`; retain only the original-town-character authority, not any unproved service/reward promise. |
| `character:town:miss-jeeves:v1` — `8d2b3fd7…29ac8`, 1024×1536 | Miss Jeeves · Librarian, LIBRAiRY. Visible `FIND THE SOURCE.` is the shortened roster teaching seed. | “Miss Jeeves at the LIBRAiRY reference desk with a card catalogue, books, lamp and CRT; her card says ‘Find the source.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind `Librarian · LIBRAiRY` and back copy `Find the source before you shelve the answer.`; review accessibility wording. |
| `character:town:paige:v1` — `41e7d8a4…98643`, 1024×1536 | Paige · Reporter, NewsStand. Visible hook is roster-aligned. | “Paige reporting from the NewsStand with notebook, pen, papers and recorder; her card says ‘Ask. Check. Get the real story.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Ask the question and check the source.`; do not imply a verified current-news service. |
| `character:town:paulette:v1` — `24147a7…643c1c`, 1024×1536 | Paulette · Beautician, MAiKEOVER. Front title is legible; no governed front hook is bound yet. | “Paulette in MAiKEOVER holding a round brush and colour swatches, with salon tools behind her.” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind a copy-safe front hook and back copy `Make the result yours.` **and** editorially retain the roster boundary: resident cameo/energy reference, not a real-person likeness or licensed identity claim. |
| `character:town:cosmo:v1` — `ea979fd3…40541`, 1024×1536 | Cosmo · Bartender, BRONZE AiGE. Visible `READ THE ROOM.` is roster-aligned. | “Cosmo behind the BRONZE AiGE bar, shaking a drink beside fruit, glassware and taps; his card says ‘Read the room.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Read the room before choosing the pour.`; no alcohol sale/age, purchase, or service claim may be inferred. |
| `character:town:becky:v1` — `c5256814…61559`, 1024×1536 | Becky · Video clerk, Chick Flicks. Visible hook is roster-aligned. | “Becky at the Chick Flicks rental counter with a VHS tape and shelves of films; her card says ‘Choose what’s worth the watch.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Curation means choosing what is worth the watch.`; no media-admission or rental-ownership claim. |
| `character:town:june:v1` — `f2cf2828…4f9a1`, 1024×1536 | June · House Mom, Delta LAi Nu. Visible hook is roster-aligned. | “June in the Delta LAi Nu living room holding a camcorder and snack tray; her card says ‘Shared spaces run on kindness.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Shared spaces run on kindness.`; copy must not identify an imported character or actor. |
| `character:town:matron-lumen:v1` — `f5d5845b…6e28`, 1024×1536 | Matron Lumen · Lantern-keeper, LUMINAiRY. Visible `KEEP THE LIGHT ON.` is roster-aligned. | “Matron Lumen tending a large lantern in the illuminated LUMINAiRY; her card says ‘Keep the light on.’” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind role/place and back copy `Learn who kept the light on.`; distinguish Town keeper from SAiNT/MAiVEN/TRAiLBLAZER claims. |
| `character:town:penny:v1` — `3e97b924…c6cef`, 1024×1536 | Penny · Postmistress, Post Office. Front title is legible; no governed front hook is bound yet. | “Penny at the Post Office counter offering a postcard, with parcels, scale and bell nearby.” | **VISUAL ACCEPT / ADMISSION HOLD** | Bind a copy-safe front hook and back copy `Connection travels one deliberate delivery at a time.`; do not promise gifting/delivery/identity services. |
| `character:town:jojo:v1` — `0a0a1ed2…b84c5`, 1200×1680 | JoJo · Barista, Blend & Snap. Existing reference front visibly reads `JOJO` / `THE USUAL?`; it is reference-bound, not newly re-admitted. | “JoJo at the Blend & Snap espresso bar offering a paper cup; her Character Card says ‘The usual?’” | **EXISTING REFERENCE / ADMISSION HOLD** | Bind a fresh current candidate/front record, `Barista · Blend & Snap`, and back copy `Your usual is specificity plus remembered context.` before treating the reference image as a catalogue card. |

## Cross-cutting admission blockers

1. The candidate manifest and receipt deliberately have `candidate_unadmitted` state. They do not supply all required catalogue fields: `catalog_version`, `release_state`, complete exact front/back copy, `image_back_or_rendered_copy`, `alt_front`, `alt_back`, editorial receipt, correction owner and update timestamp.
2. There is no immutable Town character catalogue and no admitted pack selection. The deck key is a future family identifier only; no episode owns these Town cards.
3. Back copy, fully approved accessible descriptions, display-size/320px/200%-zoom review, screen-reader presentation, and all product/editorial/technical/release approvals remain unproved.
4. Platform grant/open/replay/correction, truthful ownership, and the private Closet projection are separate build obligations. Local card images cannot establish any of them.

## Exact safe next action

The Trading Cards owner should create a **Town-only catalogue-admission packet** with one complete record per exact frozen front, using the proposals above as drafts only. It must preserve `candidate`/`held` status until independent editorial, accessibility, product, technical catalogue and release review accepts each complete record. It must not modify a pack, reward, Closet, public route or asset during that packet step.

## Preserved limits

This result does not grant a card, authorize a pack, choose new art, admit the non-Town families, or create a public/deployment claim. Paulette’s cameo/likeness boundary and all LUMINAiRY family identity conflicts remain explicit rather than being concealed by the Town visual candidate result.
