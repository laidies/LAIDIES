# MAiVEN portraits — plain-ChatGPT kit (Codex is down)

Codex had file access to the repo; plain ChatGPT doesn't. So instead of pointing at
filepaths, you **upload the 3 reference images once** and let ChatGPT match them.
This kit makes that turnkey.

**11 portraits to make. ~1 minute each. Do them in ONE ChatGPT conversation.**

---

## Setup (once)

1. Open a **new** ChatGPT chat (the image-generating one).
2. Drag in the **3 reference anchors** from this folder:
   `operations/maven-portraits-chatgpt-kit/reference-anchors/`
   → `karen-sparck-jones`, `fei-fei-li`, `grace-hopper`.
3. Paste the **STYLE LOCK** block below. Send.
4. Then paste the prompts one at a time (§1–§11). Save each result with the exact
   filename shown, into: `assets/mavens/y2k-stained-glass-v2/`
5. When the PNGs are in that folder, **tell me** — I'll commit + push them and they
   go live on the wing in ~90 seconds. (Do NOT skip the commit: iCloud silently
   reverts un-committed image files, and the site only serves what's on `main`.)

---

## STYLE LOCK — paste this first

> I'm making a set of 11 stained-glass portraits that must be **indistinguishable in
> style** from the 3 reference images I just uploaded. Study them. Every portrait you
> make must match their exact register:
>
> - **Y2K illuminated stained-glass portrait**: one dignified woman framed in a leaded-glass
>   arch, lead cames as flowing dark outlines, a warm gold halo/backlight, soft radiant glow.
> - **Palette**: plum (#4b2148), gold (#b49764), teal (#5b8c92), rose (#9b3f5f), warm gold light.
> - **Dark leaded-glass background** (like the references — NOT transparent, NOT white).
> - **2:3 vertical portrait, 1024×1536.**
> - **Non-photoreal** — evocative of the person, an idealized stylized figure, NOT a
>   photographic likeness. Reverent, modern, "cathedral of heroes" — never baroque/fairytale.
> - **Absolutely no text, letters, names, or numbers anywhere in the image.**
>
> Confirm you've got the style, and I'll send them one at a time. Match the arch, crop,
> lighting, and glass texture of the references every time.

---

## The 11 prompts

Each is self-contained — if a later one drifts, re-send with *"match the reference
anchors more closely: same arch, same lead-came style, same dark glass."*

### §1 — The ENIAC Six  →  save as `eniac-six-y2k-stained-glass.png`
> A **group** stained-glass window (not one face): a cluster of six haloed 1940s women at a
> wall of patch-cables and glowing vacuum tubes; the cables become the lead-came outlines.
> 1945 era. Same palette, dark glass, gold halo, no text.

### §2 — Margaret Hamilton  →  `margaret-hamilton-y2k-stained-glass.png`
> A 1960s woman in cat-eye glasses beside a tall stack of code listings; a small Moon,
> lunar module, and stars worked into the upper glass. Same style, dark glass, no text.

### §3 — Frances Allen  →  `frances-allen-y2k-stained-glass.png`
> A 1960s–70s woman; branching arrows / a control-flow graph turning tangled code into
> clean flowing leaded lines behind her. Same style, dark glass, no text.

### §4 — Grace Wahba  →  `grace-wahba-y2k-stained-glass.png`
> A 1970s woman; a smooth curve threading through scattered points (a spline) on a
> chalkboard motif in the glass. Same style, dark glass, no text.

### §5 — Cynthia Dwork  →  `cynthia-dwork-y2k-stained-glass.png`
> A contemporary woman; a protective shield/veil arced over a small crowd of tiny figures
> (privacy shielding individuals). Same style, dark glass, no text.

### §6 — Daphne Koller  →  `daphne-koller-y2k-stained-glass.png`
> A contemporary woman; a glowing web of connected nodes (a graph) worked into the glass
> around her. Same style, dark glass, no text.

### §7 — Barbara Liskov  →  `barbara-liskov-y2k-stained-glass.png`
> A 1970s woman; clean nested modular boxes / building blocks (abstraction) in the leadwork.
> Same style, dark glass, no text.

### §8 — Jean Sammet  →  `jean-sammet-y2k-stained-glass.png`
> A 1950s–60s woman; punch cards fanning out beside her, rendered in glass. Same style,
> dark glass, no text.

### §9 — Adele Goldberg  →  `adele-goldberg-y2k-stained-glass.png`
> A 1970s–80s woman; overlapping early-GUI windows and an early computer mouse (Xerox PARC)
> worked into the glass. Same style, dark glass, no text.

### §10 — Shafi Goldwasser  →  `shafi-goldwasser-y2k-stained-glass.png`
> A contemporary woman; a key and a sealed envelope / cipher lattice (zero-knowledge proof)
> in the glasswork. Same style, dark glass, no text.

### §11 — Lynn Conway  →  `lynn-conway-y2k-stained-glass.png`
> A 1970s woman, portrayed with full dignity; a glowing microchip grid / silicon wafer
> (VLSI) behind her. Same style, dark glass, no text.

---

## Gotchas

- **Consistency drifts** without Codex's reference-locking. Keeping all 3 anchors in the
  chat and doing them back-to-back is what holds the set together. If two come out
  different from each other, regenerate the odd one referencing the good one.
- **If ChatGPT balks at a real person's name**, reframe: *"a stylized, non-photographic
  stained-glass figure evoking a [era] computer scientist — not a likeness."* Same motif.
- **Aspect**: if it gives you a square, say *"make it a 2:3 vertical portrait."*
- **These are real women being honored** — dignified and celebratory, never caricature.
- The wing cards already point at these exact filenames with a graceful fallback, so each
  one lights up the moment its file is committed. No code changes needed from you.
