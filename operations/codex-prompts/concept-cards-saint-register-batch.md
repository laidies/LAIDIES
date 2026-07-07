> ⛔️ **SUPERSEDED / DO NOT RUN (2026-07-06).** The saint/celestial register was REJECTED for
> concept cards — celestial is for the patron saints + the Ep 4 grimoire chapter only. The
> correct brief is **`concept-cards-episode-scene-batch.md`** (photographic episode-scene cards).
> This file is kept only as a record of the wrong turn.

# Codex Brief — Concept Card Deck, re-rendered in the Saint register (15 cards) [SUPERSEDED]

> **SCOPE — IMAGES ONLY.** Generate PNG illustrations to the paths named below. Do **not**
> edit any repo file, JSON, HTML, or run git. Wiring the images into `card-packs.json` +
> converting to webp is done by Claude after delivery. Your entire job is the 15 images.

> **READ FIRST:** `operations/voice/laidies-canon-index.md` §9 "Visual style benchmark (locked)".
> These cards must match that benchmark. If a render drifts from it, it's wrong.

---

## Why this batch exists

The current concept cards are in the wrong register — photographic pink flat-lays with
holographic-neon borders, glitter scatter, and prop piles — and several reuse the same image
across episodes. We're replacing the whole concept deck with one coherent set that matches the
**patron saint cards** (the locked card-art benchmark), so the concept deck reads as a clear
sibling to the saint deck.

## THE TARGET (study these before rendering)

Primary style references — match the rendering, palette, finish, and craft **exactly**:
- `assets/saints/no-banner-cards/cher-horowitz-no-banner-card.png`
- `assets/saints/no-banner-cards/elle-woods-no-banner-card.png`

Supplementary references (for the character-tied cards, to echo the right signature object + palette):
- `assets/saints/no-banner-cards/david-rose-no-banner-card.png`  → use for **Specificity**
- `assets/saints/no-banner-cards/regina-george-no-banner-card.png` → use for **Burn Book**

## The locked register (from §9)

- **Illustrated, painterly** — the saint cards' rendering style. **NOT** photographic. **NOT** flat-lay.
- **Palette:** plum, rose, blush, powder, cream, pearl, with **gold** accents. Soft pastel-plum
  sky. **No** hot-pink-only, **no** neon, **no** holographic foil.
- **Composition density:** a hero subject + signature object/context, richly rendered — never an
  isolated, floating object on empty background.
- **Finish:** a soft halo/glow around the hero object (the way Cher's computer glows in her
  hand), a low band of roses or an in-world motif at the base, and **light, delicate** gilded
  corner accents — the same devotional-icon treatment as the saints.
- **Keep the TOP restrained.** Small, contained corner flourishes only — do **not** let ornate
  filigree fill or crowd the upper corners or compete with the halo/sunburst. The top third
  should read as open sky + rays + the glowing hero object; the gold framing is a whisper, not a
  baroque border. Match the saint cards' frame weight (lighter than a full Art-Nouveau frame).
- **Energy:** Y2K + grown-up-editorial. Confident, tasteful, expensive-looking. Not kitsch.

## THE ONE STRUCTURAL DIFFERENCE from the saint cards

The saint cards are **character portraits** (a woman's face). These concept cards are
**illuminated OBJECT icons** — the hero is the concept's signature **object**, rendered with the
identical painterly / halo / gold / roses / pastel-sky treatment, but **no human face as the
subject.** This is deliberate: the saints are the *character* deck; these are the *concept* deck.
They must look like the same designer made both, while staying clearly distinct.

- For character-associated cards (David Rose, Cher, Elle, Regina), evoke the character through
  **their signature object only** — do **not** paint their face. Faces belong to the saint deck.

## BANNED (this is the old look we're killing)

- Photographic / 3D-render look · flat-lay overhead prop piles · holographic or neon borders ·
  glitter/sparkle scatter · hot-pink-only palettes · isolated objects floating on blank ground ·
  baked-in body text or card titles (the site overlays those). Short in-object labels (≤2 words,
  large, clean) are fine only where the object naturally carries them (a book cover, a sticky note).

## Output spec

- **Format:** PNG · **Aspect:** 4:5 portrait (match the saint cards) · **Size:** 1024 × 1280.
- **Full-bleed** painted illustration with a soft cream painterly edge (like the saint cards).
- **Deliver to:** `assets/cards/concept/` using the exact filenames below.
- Render **one card per prompt** — do not batch multiple cards into one image.

---

## THE 15 CARDS — concept + hero object per card

### Episode 1 — "Meet Your New Hire" (stop feeling behind, just start)

| File | Concept (one line) | Hero object |
|---|---|---|
| `ep01-open-the-tab.png` | Just open the tool and start | A single glowing Y2K computer with one open chat window, cursor blinking — rendered like a threshold/doorway of light. Haloed. |
| `ep01-small-sips.png` | Tiny experiments beat a fantasy weekend | One small latte cup with rising steam beside a little egg-timer set to ten minutes. (Coffee = the town's Blend & Snap.) |
| `ep01-cher-closet.png` | Make tech usable + visual, like Cher's outfit computer | The *Clueless* rotating-closet computer screen showing a matched outfit — the "closet software," haloed. Cher's yellow plaid as an accent, no face. |
| `ep01-judgment.png` | AI drafts; you make the human call before it sends | A gilded envelope resting on one pan of a small brass balance scale, a checkmark on the other. The moment of deciding. |
| `ep01-room-key.png` | Bring one question to the room | An ornate gilded key rendered as a devotional object, a stained-glass chat-bubble window behind it. (Replaces the logo placeholder.) |

### Episode 2 — "Tell Me What You Want" (prompting = delegation; be specific)

| File | Concept (one line) | Hero object |
|---|---|---|
| `ep02-specificity.png` | Be painfully specific (David Rose) | David Rose's signature exactly-folded black-and-white sweater, or one precisely-labeled bottle of wine, on a pedestal. A small clean "BE SPECIFIC" note. Echo `david-rose-no-banner-card.png`. No face. |
| `ep02-context.png` | The backstory that makes AI understand your situation | An open briefing folder / dossier, its pages showing audience · tone · length notes — "the brief" — haloed and gilded. |
| `ep02-try-on.png` | Run the real task twice; compare | A vanity mirror with a "TRY IT ON" tag, two garment versions (v1 / v2) reflected side by side. The audition. |
| `ep02-rewrite-remix.png` | Give a messy draft a stylist and a spine | One sheet of paper being restyled — a red editing pen, a garment tag reading "v2," the draft mid-transformation. |
| `ep02-girl-power.png` | Help another member sharpen her prompt | Two hands passing a prompt card, or a split friendship-necklace (ties the BEST FRIENDS postcard reward + Spice Girls). Object-forward, warm — **not** a cluttered two-women photo scene. |

### Episode 3 — "The Burn Book Problem" (hallucination / verify before you trust)

| File | Concept (one line) | Hero object |
|---|---|---|
| `ep03-receipts-check.png` | Verify three claims: name, date, number, link, quote | A gilded magnifying glass held over a long receipt, items checked off in gold. Haloed. |
| `ep03-burn-book.png` | Post a shady AI answer; flag what needs checking | The *Mean Girls* pink Burn Book with heart clasp, one page flagged with a sticky tab. Echo `regina-george-no-banner-card.png` palette. No face. |
| `ep03-dress-code.png` | Where the draft helps but the claim needs review | A dress-code checklist beside a garment with a "VERIFY" tag — Cher's closet picks the outfit, you still check the code. |
| `ep03-chutney-detail.png` | Find the one detail that makes it fall apart if wrong | *Legally Blonde* alibi: a salon perm-rod set with a single water droplet, red-circled — the wet perm that breaks the timeline. A magnifying glass on the fragile detail. |
| `ep03-elle-stand.png` | Put the paragraph on the stand — make AI separate claims from receipts | A witness stand under warm courtroom light, a single paragraph "testifying," Elle's pink pen resting on it. Echo `elle-woods-no-banner-card.png`. No face. |

---

## Continuity notes (so nothing contradicts the episodes)

- Every hero object is drawn from that episode's **own** references (David Rose's sweater, the
  Burn Book, the Legally Blonde perm alibi, Cher's closet, Blend & Snap coffee) — they reinforce
  canon, never introduce a new metaphor.
- Coffee on `ep01-small-sips` + the specificity concept both tie to the town's Blend & Snap; the
  split necklace on `ep02-girl-power` ties to the Post Office BEST FRIENDS postcard reward.
- **Verification lives in Episode 3, not Episode 2.** Do not put receipts/magnifying-glass imagery
  on any Episode 2 card — Ep 2's fifth card is **Context**, not Receipts.
