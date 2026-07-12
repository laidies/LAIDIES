# Episode written-page — FULL BRIEF (design + content, everything)

> Read this first and build to it. Everything here is verified against the live site or settled with Ali.
> Do **not** ask her questions this brief already answers. Do **not** re-litigate the direction.

---

## 0. TL;DR — the non-negotiables
1. The page is a **VHS tape / 90s-TV episode that plays on a TV, rented from the Chick Flicks video store.**
   NOT a magazine/editorial. NOT a screenplay. NOT dark/dour.
2. **Fonts = the site's real fonts** (below). NOT Playfair+Jost+JetBrains. Body is **Inter**.
3. **Colours = the real tokens** (below). Teal is **`#3aa8a4`** (a real teal, not green). Leads = teal + pink +
   sunset; plum/gold/cream/rose are *sparing* accents. No beige, no checkerboard, coral/sunset used lightly.
4. **"Episodes," never "chapters"** in anything user-facing.
5. **"Ai" letters accent-coloured in EVERY brand word**, everywhere, always.
6. **Full episode content**, all images + links + examples. Scene titles come from the **canon**, never invented.

---

## 1. Design system — VERIFIED (source: `assets/sunnyvaile-page.css` `:root` + `content/site/sv-global-header.js`)

### Fonts (load the site's Google Fonts link; do not invent)
- **Body / UI text → Inter** (`--font-body`, `--font-sans`: `Inter, -apple-system, …`).
- **Display / headings → Playfair Display** (`--font-display`: `"Playfair Display", Didot, "Bodoni 72", Georgia, serif`).
- **Wordmark + nav → Jost** (the global header renders the LAiDIES wordmark in `"Jost", sans-serif`).
- **Retro / VHS-OSD / tape labels → VT323** (a pixel font the site already loads — use this for the tape
  overlay, channel bug, tape label — this is the 90s texture). **Do NOT use JetBrains Mono.**
- **Cursive accent (rare) → Dancing Script**, already loaded, only if a handwritten touch is wanted.
- Google Fonts (site's real link): `Jost` + `Playfair Display` + `Inter` + `VT323` + `Dancing Script`.

### Palette — exact tokens (do not eyeball new hexes)
| token | hex | role |
|---|---|---|
| `--teal` | `#3aa8a4` | **90s lead** — a true teal, NOT green |
| `--pink` | `#c47c85` | **90s lead** — dusty pink (muted, not hot magenta) |
| `--sunset` | `#b97c5a` | **90s lead** — sunset/coral (muted terracotta-coral, used *sparingly*) |
| `--plum` | `#4b2148` | accent / deep chrome |
| `--plum-deep` | `#3a1838` | darker plum |
| `--plum-soft` | `#6b3a66` | lighter plum |
| `--rose` | `#9b3f5f` | accent |
| `--rose-bright` | `#c25b7d` | accent |
| `--gold` | `#c9a227` | metallic accent (thin keylines) |
| `--gold-ink` | `#7a5e14` | deep gold |
| `--cream` | `#fffdfb` | ground |
| `--pearl` | `#f8eef2` | panel |
| `--blush` | `#f9e6ee` | soft panel |

**Episode-page usage:** teal + pink + sunset LEAD. plum/gold/cream/rose are sparing accents to make the leads
pop. Sunset/coral only in small doses (big orange/coral blocks look bad). No beige, no checkerboard, not dark.

### The "Ai" rule (canon — kept getting missed)
In every brand word — **L`Ai`DIES · SUNNYV`Ai`LE · M`Ai`VENS · LUMIN`Ai`RY · M`Ai`KEOVER · S`Ai`NTS ·
KSVL R`Ai`DIO · BRONZE `Ai`GE · CH`Ai`CK…** — wrap the "Ai" as `<span class="ai">Ai</span>` so it renders in
the accent colour, distinct from the surrounding letters. Audit EVERY instance, including inside OSD/labels.

### Wordmark + chrome
Use the real global header (`content/site/sv-global-header.js`) and the real wordmark (Jost text logotype,
or `assets/brand/laidies-wordmark-final-b-{light,dark}.svg` for masthead lockups). Do not hand-roll a wordmark.

### Naming
They are **Episodes** (Episode 04, "The Founding Mothers"). Never "Chapter." (`watch.html` uses "chapter"
internally for audio segments — that's a code detail; never surface it to a reader.)

---

## 2. The page IS a VHS episode from the Chick Flicks
LAiDIES is a **90s TV show**; each weekly episode is a **VHS tape on the Chick Flicks shelf**. This page is the
**written companion** to the audio episode (the audio/video lives in the **Screening Room**, `watch.html`).
Design devices:
- **Store shelf bar:** `★ SUNNYVAiLE VIDEO · The Chick Flicks · Main St No.3 · New tapes every Wednesday`.
- **CRT/TV-screen hero** playing the **title card** — TV bezel, subtle scanlines, screen glow, a diegetic tape
  overlay in VT323 (`● PLAY  SP` · `CH 04  S1·E04`). Title glows.
- **VHS spine label:** `SUNNYVAiLE VIDEO · S1 E04 · SP · ▶ · BE KIND, REWIND`.
- **Scenes = tape cues:** `▶ Scene 01 · <canon title>`. Images = **broadcast stills** (VT323 channel bug).
- `◀◀ Previously, on LAiDIES` · `Next week on LAiDIES` · `See you next Wednesday…`.
- **`▶ Watch in the Screening Room`** → the audio/video. **Never** "press play" on a read.

---

## 3. Content & canon
- Include the **FULL** episode — every scene, all images, all clickable links, visual examples. No abridging.
- **Scene titles come from the canon, never invented:** `content/episodes/episode-0N-cues.json` → the
  `kicker` fields (the exact on-screen labels the Screening Room shows), backed by the `## narrative` beats in
  `episode-0N.canon.md`. One canon feeds all surfaces (see `operations/episode-canonical-source-spec.md`).
- **Canon gap:** only Ep2 has full `canon.md` + `cues.json`. **Ep1, Ep3, Ep4 need theirs created** — draft
  from the article headings + Ali's recordings, for her to correct.
- Keep any verified stat + its source note verbatim. Ep4 = **The Founding Mothers**; Ep5 = **The Super Models**.

---

## 4. Components — every episode, identical, in order
TV-screen title card → **Previously on** → scenes (canon titles) w/ broadcast stills → pull quotes →
receipts/stats (number + source) → **cocktail** ("say it at happy hour") → **sign-off** ("So remember, ladies…")
→ **Next week on** → try-on → **study pack** glossary → **cast** strip (this episode's MAiVENS / patron SAiNTS
as small portrait cards → LUMINAiRY) → episode **rail** (narration · study pack · card pack · song · quiz).

---

## 5. Assets & source files
- **Full Ep4 prose:** `issues/issue-04.html` (old magazine template — mine for content).
- **Ep1 / Ep3 full prose + cast strips (drafted this session):** `issues/issue-01-reskin.html`, `issue-03-reskin.html`.
- **Closest VHS shell (right world/direction, but wrong fonts+teal + bugs):** `issues/issue-04-v3.html` — rebuild it with the corrections in §1.
- **Images:** `assets/building-interiors/luminairy-nave.jpg`; mavens `assets/mavens/y2k-stained-glass-v2/<slug>-y2k-stained-glass.png`;
  saints `assets/saints/y2k-stained-glass-v2/<slug>-y2k-stained-glass.png`. Verify every path resolves.
- **Screening Room reference:** `watch.html` (VHS scanline/OSD treatment, cue-synced).

---

## 6. Fix list from the last attempt (`issues/issue-04-v3.html`)
1. **Fonts wrong** — swap to Inter (body) / Playfair (headings) / Jost (wordmark) / VT323 (OSD & labels).
2. **Teal wrong** — use `#3aa8a4`, not `#0f7d73` (looked green).
3. **Colours too hot** — use `--pink #c47c85` and `--sunset #b97c5a`, not `#e8578f`/`#f2795b`.
4. **Missing ~half the episode** — port ALL Ep4 scenes (Ada → Hedy → Grace → Dartmouth naming → Karen →
   Fei-Fei → the trio Joy/Timnit/Kate → wrap) from `issues/issue-04.html`.
5. **CSS boxes / overlap / missing images** — rebuild the tape label + still overlays cleanly; verify images render.
6. **"Ai" styling** missing in spots — apply the rule everywhere.
7. **"Chapter"** anywhere → **"Episode."**
