# Codex brief — ALL MAiVEN portraits (re-roll existing + new + Turing), luminous v3 (2026-07-10)

**PATHS:** every path below is from the **repo root (`LAIDIES/`)**, so each file is under `Website-homepage/`.
(If your Codex working directory is already `Website-homepage/`, drop that prefix.)

**Why this batch:** the 12 existing maven portraits are the OLD **drab** style (roses / scrolls / muddy). Re-roll
them in the new **luminous** style, add the 11 historical mavens that were never rendered, and add a small
**Alan Turing** for his plaque. End state: 23 mavens + Turing.

Paste the block below into Codex.

---

**SCOPE — images only.** No code, no HTML/JSON, no git. Output PNGs to the exact paths named.

**NO style anchor to copy.** The existing PNGs are the **drab look you're REPLACING** — do NOT match their
palette or ornament. Follow the STYLE LOCK below and nothing else.

**LIKENESS + ACCURACY LOCK (non-negotiable):**
- It must be **UNMISTAKABLY her.** Codex tends to drift to a generic look-alike — same vibe, wrong face.
  Do NOT accept that. **Use a real reference photo of each woman** and render *her specific face* so someone
  who knows her recognizes her instantly.
- Every detail — hair, glasses, era, dress, motif — must be **TRUE to that real person and her real work.**
  No invented or generic props. If unsure what's canon, use a plainer true detail rather than a made-up one.
  **Wrong-but-fancy is worse than plain-but-accurate.**

**STYLE LOCK — v3 "luminous glass": REVERED AND CELEBRATED, not drab.**
- **The feeling first:** she should look **venerated, radiant, honored** — lit up in *celebration* of her,
  like the most beautiful window in a sunlit cathedral. NEVER a cold, dim, brown funeral card.
- Genuinely **LIT** — backlit by full sun, glowing, cathedral-window-at-NOON; warm gold halo behind her head.
- **Saturated jewel tones:** ruby, cobalt/sapphire, emerald, amber, amethyst, warm gold — brand plum
  #4b2148 and rose #9b3f5f anchor, but the glass GLOWS, high chroma. NOT muddy, NOT antique, NOT neon,
  NOT pastel. **Bold, crisp black lead lines.**
- **DE-CLUTTERED:** NO ornate filigree border, NO heart gems, NO gold laurels, NO roses/flowers, NO weird
  scrolls, NO baroque frame. Just the radiant figure + her motif in a clean glowing panel; thin plain border or none.
- **2:3 vertical, 1024×1536.** **Non-photoreal** stylized glass likeness — recognizably her, never a photo.
- **No text, letters, or numbers anywhere.** **HER FACE IS ALWAYS CLEAR**; motif in the glass AROUND her.
- Reverent, celebratory, luminous, honored — never drab, never cold, never Victorian-memorial, never caricature.

## SECTION A — RE-ROLL the existing 12
Same woman, her real face (use a reference photo), her existing symbol; re-render ONLY in the luminous style;
save to the SAME filename. All under `Website-homepage/assets/mavens/y2k-stained-glass-v2/`:

- `ada-lovelace-y2k-stained-glass.png` — Ada Lovelace (Victorian; the one true period portrait of her). Motif: a punch-card loom / the first algorithm.
- `grace-hopper-y2k-stained-glass.png` — Grace Hopper (US Navy rear-admiral uniform, glasses). Motif: a mainframe + the real **moth** ("the first computer bug").
- `hedy-lamarr-y2k-stained-glass.png` — Hedy Lamarr (1940s film-star glamour). Motif: a frequency-hopping / radio-signal pattern.
- `karen-sparck-jones-y2k-stained-glass.png` — Karen Spärck Jones. Motif: search / information-retrieval (term weighting).
- `fei-fei-li-y2k-stained-glass.png` — Fei-Fei Li. Motif: a grid of labelled images (ImageNet / computer vision).
- `timnit-gebru-y2k-stained-glass.png` — Timnit Gebru. Motif: an audit / fairness lens over faces.
- `joy-buolamwini-y2k-stained-glass.png` — Joy Buolamwini. Motif: a face-recognition grid / the "coded gaze."
- `hannah-fry-y2k-stained-glass.png` — Hannah Fry. Motif: probability / equations, warm.
- `kate-crawford-y2k-stained-glass.png` — Kate Crawford. Motif: the "atlas of AI" — data + power.
- `meredith-whittaker-y2k-stained-glass.png` — Meredith Whittaker. Motif: signal / privacy shield.
- `emily-bender-y2k-stained-glass.png` — Emily Bender. Motif: language / the "stochastic parrot."
- `rachel-thomas-y2k-stained-glass.png` — Rachel Thomas. Motif: teaching / accessible ML.

## SECTION B — NEW 11 historical mavens + Turing
Real scientists — **use the linked reference photo for a true likeness.** All to `Website-homepage/assets/mavens/y2k-stained-glass-v2/`:

1. **The ENIAC Six** → `eniac-six-y2k-stained-glass.png` — a group window of the **REAL six women, named at last.** (This is the point of the panel: they were IN the famous ENIAC photos, captioned "Refrigerator Ladies" and left unnamed for decades — now named and rendered as *themselves.*) Render six **DISTINCT** real 1940s women — vary the hair, age, and build so they read as six individuals, NOT one face repeated — at the ENIAC's wall of patch-cables + glowing vacuum tubes (cables become the lead lines). **Base each face on her real photo:**
   - **Betty Jean Jennings** (Bartik) *(left)* + **Fran Bilas** (Spence) *(right)*, at the control panel: https://upload.wikimedia.org/wikipedia/commons/8/8c/Two_women_operating_ENIAC_%28full_resolution%29.jpg
   - **Betty Snyder** (Holberton) *(foreground)*: https://upload.wikimedia.org/wikipedia/commons/d/d3/Glen_Beck_and_Betty_Snyder_program_the_ENIAC_in_building_328_at_the_Ballistic_Research_Laboratory.jpg
   - **Kay McNulty** (Antonelli): https://commons.wikimedia.org/wiki/Category:Kathleen_Antonelli
   - **Ruth Lichterman** (Teitelbaum): https://commons.wikimedia.org/wiki/Category:Ruth_Teitelbaum
   - **Marlyn Wescoff** (Meltzer): pull a real photo of Marlyn Wescoff Meltzer.
2. **Margaret Hamilton** → `margaret-hamilton-y2k-stained-glass.png` — short light hair, glasses. Ref: https://upload.wikimedia.org/wikipedia/commons/6/68/Margaret_Hamilton_1995.jpg — Motif: a tall stack of code listings; a small Moon + lunar module.
3. **Frances Allen** → `frances-allen-y2k-stained-glass.png` — older, short light hair, glasses. Ref: https://upload.wikimedia.org/wikipedia/commons/1/15/Allen_mg_2528-3750K-b.jpg — Motif: a control-flow graph turning tangled code into clean lines.
4. **Grace Wahba** → `grace-wahba-y2k-stained-glass.png` — short dark hair, glasses. Ref: https://upload.wikimedia.org/wikipedia/commons/3/35/Grace_Wahba_1986.jpg — Motif: a smooth spline curve through scattered points.
5. **Cynthia Dwork** → `cynthia-dwork-y2k-stained-glass.png` — dark hair. Ref: https://upload.wikimedia.org/wikipedia/commons/6/6a/Cynthia_Dwork_lectures_at_Harvard_Kennedy_School.jpg — Motif: a protective shield over tiny figures (privacy).
6. **Daphne Koller** → `daphne-koller-y2k-stained-glass.png` — shoulder-length dark hair, glasses. Ref: https://upload.wikimedia.org/wikipedia/commons/4/44/Daphne_Koller_2019.jpg — Motif: a glowing web of connected nodes (a graph).
7. **Barbara Liskov** → `barbara-liskov-y2k-stained-glass.png` — gray hair, glasses. Ref: https://upload.wikimedia.org/wikipedia/commons/3/38/Barbara_Liskov_MIT_computer_scientist_2010.jpg — Motif: clean nested modular boxes (abstraction).
8. **Jean Sammet** → `jean-sammet-y2k-stained-glass.png` — short gray hair, eyeglasses. Ref: https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean_Sammet_UMD_1979.jpg — Motif: punch cards fanning out.
9. **Adele Goldberg** → `adele-goldberg-y2k-stained-glass.png` — short gray hair, glasses (Xerox PARC). Ref: https://upload.wikimedia.org/wikipedia/commons/3/36/Adele_Goldberg_at_PyCon_2007.jpg — Motif: overlapping early-GUI windows + an early mouse.
10. **Shafi Goldwasser** → `shafi-goldwasser-y2k-stained-glass.png` — shoulder-length dark hair. Ref: https://upload.wikimedia.org/wikipedia/commons/8/84/Shafi_Goldwasser.JPG — Motif: a key + sealed envelope (zero-knowledge).
11. **Lynn Conway** → `lynn-conway-y2k-stained-glass.png` — reddish-blonde hair, full dignity. Ref: https://upload.wikimedia.org/wikipedia/commons/5/50/Lynn_Conway_July_2006.jpg — Motif: a glowing microchip grid / silicon wafer (VLSI).
12. **Alan Turing — NEW, for his plaque** → `alan-turing-y2k-stained-glass.png` — a man (the only one): young-to-middle-aged, side-parted dark hair, tweed suit; pull a well-known adult Turing photo for the likeness. Motif: a code-breaking rotor / an abstract "thinking machine," a small question mark of light (the Turing test). Dignified and warm.

**OUTPUT:** 24 PNGs, exact filenames, into `Website-homepage/assets/mavens/y2k-stained-glass-v2/`.
When they land, tell Ali — Claude commits them + wires Turing's thumbnail into his LUMINAiRY plaque
(iCloud reverts un-committed images).

## Notes
- All 11 historical refs were verified 200 earlier (correct person each — the Apollo Margaret Hamilton, the PARC Adele Goldberg).
- ENIAC is the one group window — now the **real** six, not generic.
- Turing is honored but **not a MAiVEN** — the thumbnail just puts a face to the name on his plaque.
