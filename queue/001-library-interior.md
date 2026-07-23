# 001 — The Town LIBRAiRY interior (new hero)
status: DONE   # completed via the later credits-derived direction approved during QC
model: SOL (subscription image gen) — NOT the API
output-path: assets/building-interiors/library-interior-sunnyvaile-v1.png

## Style anchor (match this exactly — render quality, palette, crispness, depth)
- `assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/11-fairy-godmother-house-v6.jpg`
  (the SUNNYVAiLE "bones": crisp, richly painterly, dimensional; 90s California Streamline-Moderne; glass blocks; bold Y2K palette. NOT flat, NOT cartoon, NOT hazy.)
- Miss Jeeves character: `queue/refs/miss-jeeves-reference-from-credits.png` — dignified older librarian, silver/grey curly updo, glasses on a beaded chain, plum cardigan, small gold open-book pin, warm and competent. Use HER, not a generic librarian. **De-chrome:** drop the shiny chrome desk strips from that ref (Ali dislikes — reads 50s-futuristic).

## Generate
Interior of the town LIBRAiRY — the SUNNYVAiLE 90s base, packed with **library + 90s-machine** character (its version of the Fairy Godmother house's magical botanicals):
- Floor-to-ceiling shelves crammed with colorful books; a wooden card catalog; a curved reference desk.
- Beige 1990s CRT computers with glowing screens (the "machine power").
- Glowing translucent glass-block wall/feature (90s civic).
- **Floor:** bold low-pile commercial carpet, geometric swirl/circle/star pattern in plum+teal+purple; checkerboard tile at the entry. **Walls:** cream plaster, teal+plum trim, gold-star niche accents.
- **Props (pull the full library sheet in `operations/reference/period-reference-library.md` §9):** card catalog w/ brass pulls, green banker's lamps, globe, date stamp + ink pad, sign-out ledger, book-return cart, rolodex, pencil cup, spiral staircase to a mezzanine.
- **Miss Jeeves at the reference desk** — see the FACE NOTE at the bottom.
- Rich, characterful **in-scene text is welcome** and wanted — legible book spines, a small "SUNNYV**Ai**LE LIBRAiRY" sign (correct spelling, with the Ai), maybe a funny notice or two. No gibberish.

## Style (calibrated — read carefully)
**Like a realistic DRAWING, but clearly a drawing** — detailed and dimensional (so it reads real), but unmistakably an illustration: NOT a photo, NOT flat-cartoon, NOT a loose/soft painting. CRISP, clean, HIGH-FIDELITY, **dimensional** — match the **crispness of the Fairy Godmother house** (the anchor). **Rendering must be CLEAN and EVEN across every surface — NO faint watercolor wash, NO mottled / patchy / blotchy tonal texture, NO grainy uneven areas** (past versions were mottled, especially around the computers/walls). Smooth, consistent, clean rendering everywhere. **Two failure modes to avoid:** (1) NOT flat-cartoon (too flat); (2) **NOT loose/painterly** (the last version came out "too painterly"). **Do not use the word "painterly."** Aim for: clean sharp rendering + real depth, polished/editorial-quality (magazine-grade craft), saturated, packed with character. This is "painted SUNNYVAiLE" — the town/building style, NOT the episode dither style.

## Palette
Plum `#4b2148` is the **grounding/anchor — NOT the whole palette.** Use the **FULL SUNNYVAiLE accent range with real variety**: pink, teal, tangerine, periwinkle, coral, sky, gold-star. **DO NOT make everything teal + plum + purple** — that two-note default is exactly why past versions felt flat/missing-flair. Think the Fairy Godmother house: many accents doing work (magenta, teal, purple, blue, gold, green). Bring in **coral / tangerine / pink / sky** for pop, not just plum/teal. Bold and saturated (not muted-realistic), only minimal warm wood.

## Must NOT
Cottage-core · hearts-as-decor · floral / **plant overload** (only a couple of plants, this is a library not a greenhouse) · green Victorian heavy woodwork · chrome / 50s-retro-futurism · warm haze · flat cartoon · gibberish text.

## Criteria (Claude QCs against the Codex bar)
- [ ] Depth + painterly render quality on par with the Fairy Godmother house (not flat)
- [ ] It's the real Miss Jeeves, on-model, clean face/hands
- [ ] Girl-power-meets-machine reads (bold Y2K + working CRTs/glass block)
- [ ] Palette balanced — not just teal+magenta
- [ ] Only a couple plants; no cottage-core; no green Victorian wood
- [ ] Any baked-in text legible + correctly spelled (SUNNYVAiLE / LIBRAiRY with the Ai)
- [ ] Full-width-friendly composition, no dead center

## Result   (Codex fills this)
- output: assets/building-interiors/library-interior-from-credits-dechromed-v3-lighter-carpet.png
