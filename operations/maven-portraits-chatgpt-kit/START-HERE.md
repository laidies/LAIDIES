# MAiVEN portraits — plain-ChatGPT kit (Codex is down)

Codex could read the repo; plain ChatGPT can't. So this kit hands ChatGPT everything
as **uploads + links**: the 3 style anchors (in this folder), and for each of the 11
subjects a **verified reference photo** so the portrait actually looks like her.

**11 portraits. Do them in ONE ChatGPT conversation.** Each is a clear LIKENESS of the
real woman, rendered in the stained-glass style — non-photoreal, but recognizably her.

---

## Setup (once)

1. New ChatGPT chat (the image one).
2. Drag in the **3 style anchors** from `reference-anchors/` (Karen, Fei-Fei, Grace).
3. Paste the **STYLE LOCK** below.
4. Then for **each** portrait: open its **reference-photo link**, save the image, and
   upload it with that prompt. Save the result under the exact filename shown, into
   `assets/mavens/y2k-stained-glass-v2/`.
5. When the PNGs are in that folder, **tell me** — I commit + push and they go live in
   ~90 sec. (Don't skip the commit: iCloud reverts un-committed images, and the site
   only serves what's on `main`.)

> **Tip:** every reference link below is a direct Wikimedia image — clicking it opens
> just the photo, so you can right-click → Save, then drag it into ChatGPT.

---

## STYLE LOCK — paste first

> I'm making 11 stained-glass portraits for a "hall of heroes" wing. For each one I'll
> give you TWO inputs, and they have DIFFERENT jobs — this is the most important rule:
>
> - The **3 reference images I just uploaded** define the **STYLE**, and the style always
>   wins. Every portrait must be **indistinguishable in style** from them.
> - The **photo of each woman** I send is ONLY for her **LIKENESS** — her actual face,
>   hair, glasses, age. Use it to get *who she is*, never *how it's rendered*.
>
> So: **take her real face from the photo, and rebuild it entirely in the anchors' glass
> style.** Do NOT carry over anything photographic — no photo lighting, no photo
> background, no realistic skin/detail. If in doubt, match the anchors, not the photo.
>
> The style, every time:
> - Y2K illuminated **stained-glass portrait**: one dignified woman in a leaded-glass
>   arch, lead cames as flowing dark outlines, warm gold halo/backlight, soft glow.
> - Palette: plum #4b2148, gold #b49764, teal #5b8c92, rose #9b3f5f, warm gold light.
> - **Dark leaded-glass background** (like the anchors — not transparent, not white).
> - **2:3 vertical portrait, 1024×1536.**
> - **Non-photoreal** — a stylized glass likeness, not a photo. Reverent, modern,
>   "cathedral of heroes," never baroque/fairytale. Same flatness and glass texture as
>   the anchors — she should look like she belongs on the same wall as them.
> - **No text, letters, names, or numbers anywhere.**
>
> Confirm you've got it and I'll send them one at a time with each woman's photo. If one
> comes out too photo-real or too detailed, I'll say "more like the anchors" and you
> flatten it back to the glass style.

---

## The 11 prompts  (open the link → save → upload with the prompt)

### §1 — The ENIAC Six  →  `eniac-six-y2k-stained-glass.png`
**Reference (era + machine, not exact faces — it's a GROUP window of six):**
https://upload.wikimedia.org/wikipedia/commons/8/8c/Two_women_operating_ENIAC_%28full_resolution%29.jpg
> A **group** stained-glass window: six haloed 1940s women at a wall of patch-cables and
> glowing vacuum tubes (like the machine in the photo); the cables become the lead-came
> lines. Not one face — a group. 1945 era, same palette/dark glass, no text.

### §2 — Margaret Hamilton  →  `margaret-hamilton-y2k-stained-glass.png`
**Reference (short light hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/6/68/Margaret_Hamilton_1995.jpg
> A likeness of this woman beside a tall stack of code listings; a small Moon, lunar
> module, and stars in the upper glass; her glasses. Same style, dark glass, no text.

### §3 — Frances Allen  →  `frances-allen-y2k-stained-glass.png`
**Reference (older woman, short light hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/1/15/Allen_mg_2528-3750K-b.jpg
> A likeness of this woman; branching arrows / a control-flow graph turning tangled code
> into clean flowing leaded lines behind her. Same style, dark glass, no text.

### §4 — Grace Wahba  →  `grace-wahba-y2k-stained-glass.png`
**Reference (short dark hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/3/35/Grace_Wahba_1986.jpg
> A likeness of this woman; a smooth curve threading through scattered points (a spline)
> on a chalkboard motif. Same style, dark glass, no text.

### §5 — Cynthia Dwork  →  `cynthia-dwork-y2k-stained-glass.png`
**Reference (dark hair):**
https://upload.wikimedia.org/wikipedia/commons/6/6a/Cynthia_Dwork_lectures_at_Harvard_Kennedy_School.jpg
> A likeness of this woman; a protective shield/veil arced over a small crowd of tiny
> figures (privacy). Same style, dark glass, no text.

### §6 — Daphne Koller  →  `daphne-koller-y2k-stained-glass.png`
**Reference (shoulder-length dark hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/4/44/Daphne_Koller_2019.jpg
> A likeness of this woman; a glowing web of connected nodes (a graph) around her. Same
> style, dark glass, no text.

### §7 — Barbara Liskov  →  `barbara-liskov-y2k-stained-glass.png`
**Reference (gray hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/3/38/Barbara_Liskov_MIT_computer_scientist_2010.jpg
> A likeness of this woman; clean nested modular boxes / building blocks (abstraction) in
> the leadwork. Same style, dark glass, no text.

### §8 — Jean Sammet  →  `jean-sammet-y2k-stained-glass.png`
**Reference (short gray hair, eyeglasses):**
https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean_Sammet_UMD_1979.jpg
> A likeness of this woman; punch cards fanning out beside her in glass. Same style, dark
> glass, no text.

### §9 — Adele Goldberg  →  `adele-goldberg-y2k-stained-glass.png`
**Reference (short gray hair, glasses):**
https://upload.wikimedia.org/wikipedia/commons/3/36/Adele_Goldberg_at_PyCon_2007.jpg
> A likeness of this woman; overlapping early-GUI windows and an early computer mouse
> (Xerox PARC) in the glass. Same style, dark glass, no text.

### §10 — Shafi Goldwasser  →  `shafi-goldwasser-y2k-stained-glass.png`
**Reference (shoulder-length dark hair):**
https://upload.wikimedia.org/wikipedia/commons/8/84/Shafi_Goldwasser.JPG
> A likeness of this woman; a key and a sealed envelope / cipher lattice (zero-knowledge)
> in the glasswork. Same style, dark glass, no text.

### §11 — Lynn Conway  →  `lynn-conway-y2k-stained-glass.png`
**Reference (reddish-blonde hair):**
https://upload.wikimedia.org/wikipedia/commons/5/50/Lynn_Conway_July_2006.jpg
> A likeness of this woman, portrayed with full dignity; a glowing microchip grid /
> silicon wafer (VLSI) behind her. Same style, dark glass, no text.

---

## Notes
- All 11 references are **verified against each woman's Wikipedia page** — correct person
  every time (there are two Margaret Hamiltons and two Adele Goldbergs; these are the
  Apollo engineer and the Xerox PARC scientist).
- **ENIAC** is the one group window — its reference is for the era + the machine wall, not
  six exact faces.
- If ChatGPT refuses a real photo, say *"use it only as a loose likeness reference for a
  stylized stained-glass figure, not a reproduction."*
- Real women, honored in a hall of heroes — dignified and celebratory, never caricature.
- Cards already point at these exact filenames with a graceful fallback, so each lights
  up the moment its file is committed.
