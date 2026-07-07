# Codex Brief — Concept Card Deck, derived from the episode scenes (15 cards)

> **SCOPE — IMAGES ONLY.** Generate PNG card images to the paths named below. Do **not** edit any
> repo file, JSON, HTML, or run git. Wiring into `card-packs.json` is done by Claude after
> delivery. Your entire job is the 15 card images.

> **This REPLACES the saint-register brief** (`concept-cards-saint-register-batch.md`, superseded).
> That version used a celestial/devotional treatment — halos, gold tarot filigree, rose garlands,
> pastel-plum sky. That look is reserved for the **patron saints** and the **Ep 4 SLAiYER grimoire
> chapter** ONLY. Concept cards do NOT get it.

---

## Purpose of these cards (design to this)

Concept cards are **fun, tradeable memory aids.** Each card exists to make ONE key teaching (or
one memorable moment) from its episode *stick*. Success test: glancing at the card later should
snap the lesson back. So every card must **foreground its teaching's visual mnemonic** — the
scene's punchline signage / hero prop — not just be a pretty tableau. The set per episode = that
episode's key takeaways; collecting them = holding the lessons. (Card TEXT — title + one-line
takeaway + try-it prompt — is added by Claude in `card-packs.json`; your job is art that carries
the mnemonic.)

## The register: photographic, art-directed Y2K editorial scenes

The LAiDIES episodes (1–3) all share one house style, and the concept cards must match it exactly.
Study these existing episode scenes — they ARE the target:

- `assets/episodes/issue-01/episode-01-what-like-its-hard.png` (translucent iMac reading "WHAT,
  LIKE IT'S HARD?", "FIRST STEP" neon, Elle's Harvard Law app)
- `assets/issue02-david-rose-specificity.png` (marble desk, Rose Apothecary master list, Schitt's
  Creek DVD, "WHAT WOULD DAVID DO?" sticky)
- `assets/issue02-its-britney-bitch.png` (messy "ugh" desk → polished "NAILED IT" espresso-martini
  glow-up, Stardust/Britney magazine)
- `assets/episodes/issue-03/section-burn-book-problem-v3.png` (pink Mean Girls Burn Book +
  detective evidence board: "BIG CLAIM / NOT A RECEIPT / CASE CLOSED")

**What defines the register:**
- **Photographic / photoreal**, cinematic — NOT illustration, NOT flat vector, NOT devotional icon.
- **Eye-level or 3/4 tabletop angle**, shallow depth of field — NOT an overhead flat-lay.
- **Warm, moody Y2K lighting** — lamp glow, neon signage, dark wood / marble / velvet surfaces.
- **Dense with REAL cultural artifacts** period-appropriate to the reference (Spice Girls mag,
  Motorola Razr, Clueless lip gloss, Sony Walkman, GIRL TALK board game, translucent iMac, CDs).
- **Hand-lettered signage carries the joke** — sticky notes, neon, engraved keychains, stamped
  labels. Short, clean, legible text (≤4 words per label).
- Palette: rich plum / rose / hot-pink accents against warm neutrals — saturated but *tasteful*
  and cinematic, never the cheap flat "hot-pink + glitter border" look.

## BANNED (this is what made the last two attempts fail)

- Halos, sunbursts, rose garlands, gold tarot/baroque frames, pastel-plum "heavenly" skies
  (celestial = saints + Ep 4 only). · Illustration / painterly / vector / cartoon rendering.
- Overhead flat-lay prop piles. · Objects floating on blank or gradient backgrounds. · Glitter
  scatter or holographic neon borders. · Any single haloed hero object on a devotional ground.

## How each card is built

Each card is a **NEW portrait render DERIVED FROM its source episode scene** (named per card
below). Re-stage that scene's world — same location, props, cultural artifacts, signage, joke,
lighting — recomposed **vertical** for a trading card (hero element upper-center, supporting props
and a key sign/label reading clearly). It should feel like a portrait-orientation still from the
same photoshoot as the source scene, not a crop and not a new concept.

- Keep the source scene's SPECIFIC props and text — that's the continuity. Don't invent a new
  metaphor; restage the real one taller.
- One clear focal object + one legible signage label per card (the concept's punchline).

## Output spec

- **Format:** PNG · **Aspect:** 4:5 portrait · **Size:** 1024 × 1280 · full-bleed photographic
  scene (no added ornamental frame; a thin cream keyline edge is fine).
- **Deliver to:** `assets/cards/concept/` with the exact filenames below (these OVERWRITE the three
  rejected saint-register PNGs already there).
- Render **one card per prompt.**

---

## THE 15 CARDS — source scene + card staging

### Episode 1 — "Meet Your New Hire" (just start)

| File | Source scene | Card staging |
|---|---|---|
| `ep01-open-the-tab.png` | `issue-01/episode-01-what-like-its-hard.png` | Vertical: the translucent iMac reading "WHAT, LIKE IT'S HARD?" as hero, "FIRST STEP" neon glowing behind, Elle's Harvard Law app + CDs on the desk. |
| `ep01-judgment.png` | `issue-01/episode-01-inline-article-image.jpg` | Vertical: laptop with the Draft Email + "TODAY'S PLAN" checklist, "SEND IT." sticky + hand on the pink Motorola Razr as hero, "ACTION > PERFECTION" and "ASK BETTER QUESTIONS" charm visible. |
| `ep01-cher-closet.png` | `issue-01/episode-01-inline-article-image-03.jpg` | Vertical: the teal iMac reading "Ugh! As if!" as hero, red-lips landline phone + Burn Book + pink Walkman on the wood desk. |
| `ep01-room-key.png` | `issue-01/episode-01-inline-article-image-02.jpg` | Vertical: the open doodled journal + GIRL TALK board game as hero, "girl power" neon glowing, espresso martini + pencil box. |
| `ep01-small-sips.png` | *no dedicated scene — NEW render in this register* | Vertical Ep-1 desk: a single espresso cup (a literal small sip) as hero beside a checklist with ONE tiny task ticked, the gold "SMALL SIPS BIG MOVES" bejeweled keychain in front, warm lamp glow. **No kitchen timer.** |

### Episode 2 — "Tell Me What You Want" (prompting = delegation)

| File | Source scene | Card staging |
|---|---|---|
| `ep02-specificity.png` | `issue02-david-rose-specificity.png` | Vertical: the "Rose Apothecary Master List" notebook as hero, "WHAT WOULD DAVID DO?" sticky, Schitt's Creek DVD, wine + cheese board, "A GENERAL STORE BUT MAKE IT SPECIFIC" sign. |
| `ep02-rewrite-remix.png` | `issue02-its-britney-bitch.png` | Vertical: the before/after — crumpled "ugh" draft giving way to the polished "NAILED IT" espresso-martini desk, Stardust/Britney magazine, pink Razr. The draft glow-up. |
| `ep02-context.png` | `issue02-dont-pull-a-cher.png` | Vertical: restage the Ep-2 vocab scene (prompt / context / token) — foreground the "context" beat as hero with its label. |
| `ep02-try-on.png` | `issue02-tryon-homework.png` | Vertical: the weekly try-on staging — one real task run twice, v1 vs v2 side by side, "TRY IT ON" energy. |
| `ep02-girl-power.png` | `issue02-drawing-game-spice-girls.png` (use the COFFEE re-render once it lands) | Vertical: the Spice Girls "tell me what you want, what you really really want" scene, restaged around the coffee-order analogy (regular spot vs brand-new café). |

### Episode 3 — "The Burn Book Problem" (verify before you trust)

| File | Source scene | Card staging |
|---|---|---|
| `ep03-burn-book.png` | `issue-03/section-burn-book-problem-v3.png` | Vertical: the pink Burn Book + evidence board ("BIG CLAIM / NOT A RECEIPT"), red string, butterfly clips, Lip Smacker. |
| `ep03-receipts-check.png` | `issue-03/section-try-on-receipts-pass-v2.png` | Vertical: the receipts-pass staging — an AI answer beside the actual receipt/source it's being checked against. |
| `ep03-chutney-detail.png` | `issue-03/section-chutney-thrice-v2.png` | Vertical: the Legally Blonde perm-alibi beat — the one fragile detail that breaks the timeline, circled. |
| `ep03-dress-code.png` | `issue-03/section-wrong-room-v1.png` | Vertical: the right-tool / right-room check — draft helps, but the claim needs review before it leaves the room. |
| `ep03-elle-stand.png` | `issue-03/section-show-your-work-v2.png` | Vertical: put the paragraph on the stand — make the answer show its work / separate claims from receipts. Elle's pink pen. |

---

## Continuity notes

- Every card is restaged from art readers have ALREADY seen in the episode — same props, same
  jokes, same cultural artifacts. Nothing new invented (except `ep01-small-sips`, which stays
  inside Ep 1's exact desk world).
- `ep02-girl-power` derives from `issue02-drawing-game-spice-girls.png`, which is itself being
  re-rendered from the house/drawing analogy to the **coffee-order** analogy. Build this card from
  the FINAL coffee version, not the old house one.
- **Verification imagery (magnifying glass, receipts, evidence board) belongs to Episode 3 only.**
  Keep it off every Ep 1 and Ep 2 card.
