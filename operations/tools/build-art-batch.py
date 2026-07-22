#!/usr/bin/env python3
"""Build an episode art batch that CANNOT ship without continuity + likeness.

Written 2026-07-22 after a 22-frame Ep4 batch came back ~7 usable. Every failure
was something the generator could have enforced and I was enforcing by memory:

  * frames generated in isolation, so nothing carried over shot to shot
  * named real women with no likeness reference -> invented faces
  * the Heroine in four different outfits inside one episode

So those are now MECHANICAL. A frame with no continuity anchor, or a named woman
with no photo reference, is written to a BLOCKED section instead of the batch.

Usage:
  build-art-batch.py <cues.json> <timing-map.json> <needed-beats.json> <ep> <out.md>
"""
import json
import os
import re
import sys

cues_p, map_p, need_p, EP, out_p = sys.argv[1:6]
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # LAIDIES/  # LAIDIES/
SITE = ROOT if os.path.basename(ROOT) == "Website-homepage" else os.path.join(ROOT, "Website-homepage")
REFDIR = os.path.join(SITE, "operations", "reference", "real-people")

cues = json.load(open(cues_p)); cues = cues.get("cues", cues)
units = json.load(open(map_p))
need = json.load(open(need_p))

# ── who appears in this episode, and where her photo reference lives ────────
# A name with NO folder of real photos is BLOCKED — that is what produced the
# generic ENIAC women, the unverifiable Joy, and the generic Timnit.
# Read the cast + outfit from the episode's own canon file, so this is never
# retyped per episode — that retyping is what kept losing rules.
CANON = os.path.join(SITE, "content", "episodes", f"episode-{EP}.canon.md")
def canon_section(name):
    try: txt = open(CANON, encoding="utf-8").read()
    except Exception: return ""
    m = re.search(r'^## %s\s*$(.*?)(?=^## |\Z)' % re.escape(name), txt, re.S | re.M)
    return m.group(1) if m else ""

PEOPLE = {}
for row in re.finditer(r'^\|\s*([a-z0-9\-]+)\s*\|\s*(.+?)\s*\|\s*([a-z0-9\-]+)\s*\|\s*$',
                       canon_section("cast[]"), re.M):
    key, who, ref = row.group(1), row.group(2), row.group(3)
    if key in ("scene key", "---"): continue
    PEOPLE[key] = (who.replace(" · ", ", "), ref)

if not PEOPLE:
    sys.exit("ABORT: no cast[] parsed from %s — refusing to build a batch with no "
             "likeness guard. An empty cast silently disables the check." % CANON)

# just the quoted outfit line, not the whole section
_sec = canon_section("heroine_outfit")
_m = re.search(r'^>\s*\*\*EP\d+:\s*(.+?)\*\*\s*$', _sec, re.S | re.M)
if not _m:
    _m = re.search(r'^>\s*\*\*EP\d+:(.*?)\*\*', _sec, re.S | re.M)
OUTFIT = " ".join(_m.group(1).replace(">", " ").split()) if _m else None

def photo_refs(slug):
    """Optional real photographs, if any have been collected."""
    d = os.path.join(REFDIR, slug)
    if not os.path.isdir(d): return []
    return sorted(f for f in os.listdir(d)
                  if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp")))

def mmss(t): return f"{int(t//60)}:{t%60:05.2f}"
def tag(t):  return f"{int(t//60)}m{t%60:05.2f}"

# ── scene identity from the cue labels ─────────────────────────────────────
# "→ LONDON, 1843" is an ERA CARD and can never be a continuity anchor.
# "ada", "ada (the punched card)" are the same scene.
def scene_of(label):
    if not label: return None
    label = label.strip()
    if label.startswith("→"): return None            # era card
    return re.split(r'\s*\(', label)[0].strip().lower()

wired = []
for c in cues:
    t = float(c.get("t", 0))
    wired.append({"t": t, "src": os.path.basename(c.get("src", "")),
                  "label": (c.get("label") or "").strip(),
                  "scene": scene_of(c.get("label"))})
wired.sort(key=lambda x: x["t"])

# Every frame of this woman ALREADY approved and wired in the cut. These are the
# likeness of record — she has been drawn, signed off, and is on screen. A new beat
# must match those, never re-invent her.
APPROVED = {}
for w in wired:
    if w["scene"] and w["src"] and w["src"].lower().endswith(".png"):
        APPROVED.setdefault(w["scene"], []).append(w)
for k in APPROVED:                       # prefer the -locked- pass as the anchor face
    APPROVED[k].sort(key=lambda w: (0 if "locked" in w["src"] else 1, w["t"]))

def scene_at(t):
    """Which scene is running at time t — walk back past era cards."""
    cur = None
    for w in wired:
        if w["t"] > t: break
        if w["scene"]: cur = w["scene"]
        elif w["label"].startswith("→"): cur = None   # a card opens a NEW scene
    return cur

def anchors(t):
    """Nearest wired frame in the SAME scene, before and after.

    Deliberately NOT 'the previous cue' — that is often an era card or the tail
    of a different decade. If this beat opens its scene there is no BEFORE, so
    the anchor is forward.
    """
    sc = scene_at(t)
    if not sc: return None, None, None
    same = [w for w in wired if w["scene"] == sc and w["src"]]
    before = [w for w in same if w["t"] <= t]
    after  = [w for w in same if w["t"] >  t]
    return sc, (before[-1] if before else None), (after[0] if after else None)

# ── what already exists and is NOT wired ────────────────────────────────────
# I have now three times commissioned art for a beat that was already covered
# (Fei-Fei's three beats, the sign-off word-burst, and others). The asset folder
# is the first place to look, not the last.
import glob
# Search EVERY episode folder, not just this one. A "next week" beat points at
# the NEXT episode's art; Ep5's hero image sat in ep-05/ while a duplicate was
# commissioned into ep-04. This lesson was already recorded and re-broken.
EPISODES = os.path.join(SITE, "assets", "episodes")
USED = {w["src"] for w in wired if w["src"]}
UNUSED = {}                                  # basename -> path relative to assets/
for f in glob.glob(os.path.join(EPISODES, "**", "*.png"), recursive=True):
    b = os.path.basename(f)
    if b in USED: continue
    if any(x in f for x in ("_raw-generated", "bad-", "archive", "_superseded")): continue
    UNUSED.setdefault(b, os.path.relpath(f, os.path.join(SITE, "assets")))

STOP = set("the a an and or of to in it is was for on at with that this you your her his "
           "she he they we but so if then than as by from into out up down over".split())
def keywords(text):
    return {w for w in re.findall(r"[a-z]{4,}", text.lower()) if w not in STOP}

def existing_candidates(b, limit=4):
    """Unused files whose NAME echoes the words spoken over this beat.

    Substring matching, not exact tokens: the Ep5 hero is filed as
    'supermodels' while the narration says 'Super Models', and exact matching
    missed it. Rarer/longer words score higher so 'supermodels' beats 'week'.
    """
    kw = set()
    for _sp, tx in b["says"][:3]:
        kw |= keywords(tx)
    scored = []
    for f, rel in UNUSED.items():
        low = f.lower()
        hits = set()
        for k in kw:
            if k in low:                      # substring: 'models' in 'supermodels'
                hits.add(k)
        if not hits: continue
        # weight by word length — a long rare match is worth more than 'week'
        score = sum(len(h) for h in hits)
        scored.append((score, rel, sorted(hits, key=len, reverse=True)))
    scored.sort(reverse=True)
    return scored[:limit]

# ── slots already covered by existing art ──────────────────────────────────
# Read from the episode's cut-decisions file, so a beat that has already been
# matched to an existing frame is never commissioned again. My own generator
# asked for four of these on 2026-07-22.
DEC = os.path.join(SITE, "operations", f"ep{EP}-cut-decisions.md")
COVERED = {}
try:
    dtxt = open(DEC, encoding="utf-8").read()
    for m in re.finditer(r'^\|\s*(\d{1,2}):(\d{2}\.\d{2})\s*\|\s*`?([\w.\-]+)`?\s*\|',
                         dtxt, re.M):
        COVERED[round(int(m.group(1))*60 + float(m.group(2)), 2)] = m.group(3)
except Exception:
    pass

# ── build ───────────────────────────────────────────────────────────────────
ok, blocked = [], []
for b in need:
    t = float(b["t"])
    if round(t, 2) in COVERED:
        continue                     # already drawn — see the cut-decisions file
    sc, prev, nxt = anchors(t)
    person = PEOPLE.get(sc) if sc else None
    if person and not APPROVED.get(sc):
        blocked.append((t, sc, person))      # never drawn — nothing to match to
        continue
    ok.append((t, b, sc, prev, nxt, person))

L = []
L.append(f"# EP{EP} — ART BATCH · {len(ok)} frames")
L.append("")
L.append("Generated from the narration clock **and the cut**, so every frame carries its "
         "in-point, its duration, the words spoken over it, and the shots it must match.")
L.append("")
L.append("## HARD REQUIREMENTS — a frame failing any of these is rejected")
L.append("")
L.append("**1 · Exactly 1920 × 1080.** Wrong dimensions are auto-rejected before review.")
L.append("")
L.append("**2 · Style `comic-v1-locked` — COMIC, not illustration.** Bold black ink outlines "
         "on every form. Shadows are HARD ANGULAR PLANES with a defined edge — never a gradient "
         "or a soft blend. Colour is FLAT and pushed/saturated within those shapes. "
         "⛔ No halftone. ⛔ NOT painterly, watercolour, airbrushed, blotchy or softly rendered. "
         "⛔ NOT a detailed storybook illustration or a 'full cartoon' look — if it could pass "
         "for an animated-film background, it is wrong. Compare against the named continuity "
         "anchors below: the new frame must sit in the SAME drawing register as those.")
L.append("")
L.append("**3 · CONTINUITY IS NOT OPTIONAL.** Each frame below names the shot before it and/or "
         "after it *in the same scene*. The new frame must read as the same room, the same "
         "moment, the same person — same hair, same clothes, same light, same period. If the "
         "anchor shows her in a green dress at a desk by a window, she is still in that green "
         "dress at that desk. ⛔ Do not restyle, re-cast or re-dress between shots.")
L.append("")
L.append("**4 · LIKENESS.** Every named real woman has a photo reference path. Match HER face. "
         "⛔ Do not invent a plausible person. A woman appearing in several beats uses the SAME "
         "reference in every one.")
L.append("")
L.append("**5 · SETTING MUST BE REAL.** A real SUNNYVAiLE building or a genuine historical "
         "location. ⛔ No invented places. ⛔ No literal mashups — do not weld a biographical "
         "detail onto a technical one (e.g. a dataset's photos pinned up inside a family's "
         "dry-cleaning shop).")
L.append("")
L.append("**6 · PHYSICAL PLAUSIBILITY.** Objects obey physics. A stack of paper is separate "
         "sheets with edges, not a solid slab with text printed on its side.")
L.append("")
L.append("**6b · ANATOMY.** Every figure has a complete, correctly-jointed body. If a person is "
         "shown below the waist she has **legs and feet** that connect to her hips and reach the "
         "ground. ⛔ No body that simply stops behind a foreground object. ⛔ No missing or extra "
         "limbs, no hands with the wrong number of fingers, no head attached at an impossible "
         "angle. If a prop would crop the figure, crop the FRAME deliberately — do not delete "
         "the body part.")
L.append("")
L.append('**7 · "AI" is ALWAYS both letters capital** — never "Ai". The accented i belongs to '
         "brand words only (LAiDIES, SUNNYVAiLE, MAiVENS, LUMINAiRY).")
L.append("")
L.append("**6a · ALL TECHNOLOGY IN SUNNYVAiLE IS 1999.** The town is perpetually 1999 and its "
         "hardware is too. ⛔ NO modern laptops, flat widescreen displays, smartphones, "
         "earbuds, or slim tablets. If the Heroine carries a laptop it is an **iBook G3 "
         "clamshell** — chunky, coloured, curved, with a handle. Desktops are beige or "
         "translucent-coloured CRTs. Phones are cordless handsets or flip phones. Screens are "
         "4:3, never 16:9. This is the ONE anachronism that breaks the town instantly.")
L.append("")
L.append("**6a2 · PROPS MUST SUIT THE SCENE.** Do not hand her an object she would not be "
         "carrying. She does not bring a laptop into the LUMINAiRY to look at stained glass. "
         "If the beat does not call for a prop, she has empty hands.")
L.append("")
L.append("**6c · PERIOD ACCURACY.** Nothing in frame may postdate the year of the scene — no "
         "flat screens in 1952, no mobile phones in 1946, no modern typography on period signage. "
         "The LOCATION must be the real place the event happened. The NUMBER of people must be "
         "right (the ENIAC programmers are SIX).")
L.append("")
L.append("**6d · AGE.** Each woman is the age she was AT THIS MOMENT, not her famous later "
         "portrait. Grace Hopper in 1952 is 45 and a civilian — not the white-haired Rear "
         "Admiral of decades later.")
L.append("")
L.append("**6d2 · NAMED LOCATIONS HAVE CANONICAL CONTENTS.** The **LUMINAiRY MAiVENS wing** "
         "shows the ACTUAL MAiVENS in its windows — Ada Lovelace, Hedy Lamarr, Grace Hopper, "
         "Karen Spärck Jones, Fei-Fei Li, Joy Buolamwini, Timnit Gebru, Emily Bender, Kate "
         "Crawford, Hannah Fry, Rachel Thomas, Meredith Whittaker. Their stained-glass "
         "portraits already exist at `assets/mavens/y2k-stained-glass-v3-finished/` — MATCH "
         "THEM. ⛔ Never fill a canonical room with anonymous invented figures.")
L.append("")
L.append("**6e · BACKGROUND FIGURES.** Faces in the background must be coherent — no melted, "
         "smeared or half-formed features. If a face cannot be drawn cleanly at that size, turn "
         "the figure away or move it further back.")
L.append("")
L.append("**7b · EVERY WORD LEGIBLE AND CORRECT.** No garbled or invented lettering anywhere — "
         "signage, screens, book spines, papers. Check numbers: KSVL is **99.9**. Check brand "
         "spellings: LUMINAiRY has ONE accented i. ⛔ Do not letter a word you cannot render "
         "cleanly — leave the surface plain instead.")
L.append("")
L.append("**8b · READS AT VIDEO SIZE.** The subject must be legible when this plays at 1/3 "
         "screen. ⛔ No critical detail so small it disappears — if the beat is about a face, "
         "the face is large in frame.")
L.append("")
L.append("**8 · Populated SUNNYVAiLE scenes** = women in Y2K-era dress, diverse. Storefronts empty.")
L.append("")
L.append("**9 · Never mix generations.** No pixel, `comic-barsetter` or `comic-v2-graphic-novel` "
         "frames scavenged or adapted. Draw fresh in `comic-v1-locked`.")
L.append("")
L.append("**10 · Text rendered IN-generation.** No blank plates for text added later.")
L.append("")
L.append("### 🔴 THE HEROINE'S OUTFIT — ONE LOOK FOR THE WHOLE EPISODE")
L.append("She wears a **different outfit each week, and the SAME outfit in every frame of a "
         "given episode**, with 90s-styled hair.")
L.append("")
L.append("> **EP%s OUTFIT:** %s" % (EP, OUTFIT or "`<<< NOT SET IN CANON — fill ## heroine_outfit before sending >>>`"))
L.append("")
L.append("⛔ **NEVER corporate.** No navy pantsuit, no blazer-and-blouse, no office tailoring. "
         "SUNNYVAiLE is a Y2K town and she lives there — she does not commute in from a law firm. "
         "In the Ep4 batch she appeared in four different outfits, four of them corporate.")
L.append("")
L.append("---")
L.append("")
L.append("## THE FRAMES")

for i, (t, b, sc, prev, nxt, person) in enumerate(ok, 1):
    L.append("")
    L.append(f"### {i:02d} · `ep{EP}-beat-{tag(t)}-comic-v1-1920.png`")
    L.append(f"**Lands at {mmss(t)} · holds {b['dur']}s**"
             + (f" · scene: **{sc}**" if sc else ""))
    L.append("")
    L.append("Spoken over this frame — illustrate THIS:")
    for sp, tx in b["says"][:3]:
        L.append(f"> **{sp}:** “{tx}”")
    L.append("")
    if person:
        L.append(f"**WHO:** {person[0]}")
        faces = APPROVED.get(sc, [])[:3]
        if faces:
            L.append("**LIKENESS — she has ALREADY been drawn and approved. Match these, "
                     "do not re-invent her:**")
            for f in faces:
                L.append(f"  - `{f['src']}`"
                         + (f" — “{f['label']}”" if f['label'] else ""))
        ph = photo_refs(person[1])
        if ph:
            L.append(f"  - photo reference also available: "
                     f"`operations/reference/real-people/{person[1]}/` ({len(ph)} file(s))")
        L.append("")
    cand = existing_candidates(b)
    if cand:
        L.append("**⚠ CHECK THESE FIRST — existing UNUSED art that may already cover this beat.**")
        L.append("If one fits: **do NOT generate this frame at all.** Report back which file "
                 "covers it and move on — it gets wired into the cut under its own name. "
                 "⛔ NEVER copy an existing file to this frame's filename. That produces two "
                 "files with identical pixels and no way to tell which is canonical; it "
                 "happened on 2026-07-22 to four frames.")
        for n, f, hits in cand:
            L.append(f"  - `{f}`  _(matches: {', '.join(hits[:4])})_")
        L.append("")
    L.append("**CONTINUITY — this shot must match:**")
    if prev:
        L.append(f"- ⬅ **Shot before** (`{prev['src']}`) at {mmss(prev['t'])}"
                 + (f" — “{prev['label']}”" if prev['label'] else ""))
    if nxt:
        L.append(f"- ➡ **Shot after** (`{nxt['src']}`) at {mmss(nxt['t'])}"
                 + (f" — “{nxt['label']}”" if nxt['label'] else ""))
    if not prev and not nxt:
        L.append("- ⚠ No same-scene anchor found — **do not generate**, flag for review.")
    else:
        L.append("- Same room, same clothing, same hair, same time of day, same period detail. "
                 "This is the next shot in one continuous scene, not a fresh illustration.")

if blocked:
    L.append("")
    L.append("---")
    L.append("")
    L.append(f"## ⛔ BLOCKED — {len(blocked)} frame(s) NOT commissioned")
    L.append("")
    L.append("These name a real woman with **no photo reference on disk**. Generating them "
             "produces an invented face, which is exactly what went wrong last time. Add photos "
             "to the folder below, re-run this generator, and they will appear in the batch.")
    L.append("")
    for t, sc, person in blocked:
        L.append(f"- **{mmss(t)}** — {person[0]} · needs "
                 f"`operations/reference/real-people/{person[1]}/`")

open(out_p, "w").write("\n".join(L) + "\n")
print(f"  frames: {len(ok)}   BLOCKED for missing likeness: {len(blocked)}"
      f"   skipped (already drawn): {len(COVERED)}")
print(f"  -> {out_p}")
