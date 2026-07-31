# ASSET-REGISTER — LAiDIES Homepage recomposition (2026-07-30)

Every image/video inspected on disk at original resolution (`sips`) before use.
Paths are root-absolute; the candidate is served from the `Website-homepage`
web root so these resolve exactly as production (read-only reuse — nothing copied,
nothing edited). `contain` is used for identity-bearing imagery; `cover` only for the
one reviewed scenic masthead (per IMAGE-CROP-AUDIT).

## Approved & used

| Slot | Path | Native px | Fit | Why appropriate |
|---|---|---|---|---|
| Masthead scenic | `/assets/sunnyvaile-streets/main-street-dusk.webp` | 1400×788 | cover, ratio-locked 1400/788 | Ali-locked baseline masthead; scenic, no face; signs are focal. KEEP. |
| Arrival ident (video) | `/operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10.mp4` | 960×540 | contain on solid dark matte | Named approved master; muted; once/tab. |
| Arrival ident (poster/still) | `/operations/…/continuous-i-evergreen-six-clean-electric-v10-still.png` | 960×540 | contain | Approved poster; reduced-motion + fallback frame. |
| Ada Lovelace | `/assets/mavens/y2k-stained-glass-v3-finished/ada-lovelace-y2k-stained-glass.png` | 1024×1536 | contain, 2:3, capped width | Incumbent approved Foundress portrait; balanced scale (not a tower). |
| Delta LAi Nu house | `/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg` | 1500×844 | contain/cover-reviewed | Named approved; Move-to-SUNNYVAiLE stage (Closet lives at Delta LAi Nu). |
| Town map | `/assets/final_map/sunnyvaile-town-map-final-v5.webp` | 1400×637 | natural, no crop | Canonical map; single town-orientation element. |
| Method postcard | `/assets/postcards/from-sunnyvaile/pc-dial-up.webp` | 1400×933 | contain, 3:2 | “Dial-up to SUNNYVAiLE” — method/Rewind-Era cue. |
| Latest-episode art | `/assets/postcards/from-sunnyvaile/pc-chick-flicks.webp` | 1400×933 | contain, 3:2 | The Chick Flicks episode postcard. |
| Collectibles art | `/assets/postcards/from-sunnyvaile/pc-puffy-binder.webp` | 1400×933 | contain, 3:2 | Y2K binder of collectibles → Closet section. |
| KSVL / DJ SunnyV | `/assets/town-characters/scenes/dj-sunnyv-scene.webp` | 933×1400 (portrait) | contain, portrait stage | KSVL destination. Portrait — placed in a portrait-shaped well, never at equal scale beside a landscape. |
| FAiRY Godmother (activity) | `/assets/town-characters/scenes/fairy-godmother-scene.webp` | 933×1400 (portrait) | contain, portrait stage | Activity picker card. |
| Mme CLAi-O (activity) | `/assets/town-characters/scenes/mme-claio-scene.webp` | 933×1400 (portrait) | contain, portrait stage | Activity picker card. |
| Businesswomen’s Special | `/assets/bws-fortune-teller/frame-1-closed.webp` | 2048×2048 (square) | contain, square stage | Activity picker card. |
| Dream Phone | `/assets/sunnyvaile-buildings/y2k-v3/17-dream-phone-booth.webp` | 1672×940 (landscape) | contain, landscape stage | Activity picker card. |
| Girl Talk Truth/Dare | `/assets/games/girl-talk/truth-card-face.webp`, `…/dare-card-face.webp` | 933×1400 each | contain, 2:3 duo | Girl Talk card (Resident Card required note). |
| NewsStand building | `/assets/sunnyvaile-buildings/web/02-sunnyvaile-newsstand.jpg` | 720×405 | contain | “Read the news” destination thumb (small source → used at small size only). |
| Daily Buzz — Claude news | `/operations/…/cycle-9/incumbent-daily-pager/artwork/providers/claude-provider-news-v1.png` | 1536×1024 | contain, 3:2 | Provider lockup lets readers identify Claude/Anthropic. Crop-audit PASS. |
| Daily Buzz — ChatGPT news | `…/artwork/providers/chatgpt-provider-news-v1.png` | 1536×1024 | contain, 3:2 | Provider identification (OpenAI). |
| Daily Buzz — Gemini news | `…/artwork/providers/gemini-provider-news-v1.png` | 1536×1024 | contain, 3:2 | Provider identification (Google). |

## Approved but NOT used here (available; no fitting slot this composition)
- Fairy Godmother clean-lit `…/opening-08-fairy-godmother-clean-lit-v2.png` (1672×941) — the
  town-scene portrait `fairy-godmother-scene.webp` fits the activity card grammar better; the
  clean-lit hero is reserved for a FAiRY-specific module, not needed on the home composition.
- Miss Jeeves desk `/assets/library/jeeves-desk.png` (1600×900) — **Miss Jeeves may appear only
  in a LIBRAiRY context.** No LIBRAiRY hero module in this composition, so she is intentionally
  omitted rather than placed in an unrelated module. “Look something up” routes to the LIBRAiRY.
- Willow Lane FAiRY house `…/11-fairy-godmother-house-…-v6.png` (1672×941) — available; not
  needed once Delta LAi Nu carries the Move-to-SUNNYVAiLE stage. Avoids building repetition.

## Explicitly REJECTED — never used
- `/assets/postcards/from-sunnyvaile/greetings-from-sunnyvaile-post-card.png` (1536×1024) —
  visible text misspells “SUNNYYVAiLE” (two Ys). Ali’s current decision overrides any older
  “approved” record. **Not referenced anywhere in this candidate.**
- Pixelated/blurry Jeeves, older/blurry Delta LAi Nu, alternate Fairy Godmother
  characters/houses, retired drink-picker art, painterly-mixed-with-comic art, any generated
  text image with a visible spelling error — none used.

## ASSET REQUIRED (marked, not substituted)
- **Daily Buzz masthead nameplate / “Did You Know?” + “Town weather” spot art** — no proven
  approved asset exists for a daily-paper nameplate or weather/gossip vignette in the locked
  adult comic style. Rendered with **type + CSS only** (no placeholder image). If Ali wants
  spot art here, it is `ASSET REQUIRED` (correctly composed, spelling-checked, style-matched) —
  no random substitute inserted.
- **Song-of-the-day cover** — none required; rendered as a type-led play card using the real
  audio `/content/music/the-laidies-wednesday-in-sunnyvaile.mp3` (verified, 5.8 MB).
