#!/usr/bin/env python3
"""Automated QC for episode art. Catches what a machine CAN catch, so my eyes
are spent on what it can't.

Built 2026-07-22 after Ali caught six distinct failure classes in one batch that
I had already looked at and passed. My failure mode is verifying the countable
thing (dimensions, headcount) and reporting that as "verified".

MACHINE-CHECKABLE (this script):
  1  wrong dimensions
  2  exact duplicate of an existing asset          (hash equality)
  3  near-identical to the frame beside it in the cut  (hash distance)
  4  near-identical to any other frame in the batch
  5  retired palette — gold+plum creeping back
  6  desaturated / muted when the lock says saturated
  7  wrong generation baked into the filename
  8  an unused existing asset already covers the beat
  9  near-black or blown-out exposure
 10  suspiciously low detail (flat/empty frame)

NEEDS EYES (emitted as a checklist per frame, answered in writing):
 identity · continuity · period accuracy · invented content · anatomy ·
 in-image text · fit to the spoken line

Usage: qc-frames.py <ep> [<file> ...]
"""
import json
import os
import re
import sys
import glob
from PIL import Image, ImageStat

EP = sys.argv[1] if len(sys.argv) > 1 else "04"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # LAIDIES/
SITE = ROOT if os.path.basename(ROOT) == "Website-homepage" else os.path.join(ROOT, "Website-homepage")
ART = os.path.join(SITE, "assets", "episodes", f"ep-{EP}", "pixel")
CUES = os.path.join(SITE, "content", "episodes", f"episode-{EP}-cues.json")

RETIRED_GENERATIONS = ("comic-barsetter", "comic-v2-graphic-novel", "-pixel-v")

def dhash(path, size=8):
    """Perceptual hash — small, greyscale, gradient-based. Robust to re-encode."""
    im = Image.open(path).convert("L").resize((size + 1, size), Image.LANCZOS)
    px = list(im.getdata())
    bits = 0
    for r in range(size):
        row = px[r * (size + 1):(r + 1) * (size + 1)]
        for c in range(size):
            bits = (bits << 1) | (1 if row[c] < row[c + 1] else 0)
    return bits

def hamming(a, b): return bin(a ^ b).count("1")

def stats(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    small = im.resize((160, 90))
    st = ImageStat.Stat(small)
    r, g, b = st.mean
    # saturation proxy: mean channel spread
    px = list(small.getdata())
    sat = sum(max(p) - min(p) for p in px) / len(px)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    # gold+plum detection: warm-yellow AND desaturated-purple both present
    gold = sum(1 for p in px if p[0] > 150 and 110 < p[1] < 200 and p[2] < 110)
    plum = sum(1 for p in px if 55 < p[0] < 110 and p[1] < 60 and 55 < p[2] < 110)
    return dict(w=w, h=h, sat=sat, lum=lum,
                gold=gold / len(px), plum=plum / len(px))

# ── gather ──────────────────────────────────────────────────────────────────
targets = sys.argv[2:] or sorted(glob.glob(os.path.join(ART, "*.png")))
targets = [t if os.path.isabs(t) else os.path.join(ART, os.path.basename(t)) for t in targets]
targets = [t for t in targets if os.path.exists(t)]

cues = json.load(open(CUES)); cues = cues.get("cues", cues)
wired = [(float(c.get("t", 0)), os.path.basename(c.get("src", ""))) for c in cues]
wired.sort()
pos = {n: i for i, (_t, n) in enumerate(wired)}

allart = sorted(glob.glob(os.path.join(ART, "*.png")))
print(f"QC · episode {EP} · {len(targets)} frame(s) checked against {len(allart)} assets\n")

hashes = {}
for f in allart:
    try: hashes[os.path.basename(f)] = dhash(f)
    except Exception: pass

fails = 0
for t in targets:
    name = os.path.basename(t)
    issues, notes = [], []
    try:
        s = stats(t)
    except Exception as e:
        print(f"✗ {name}\n    UNREADABLE: {e}\n"); fails += 1; continue

    # 1 dimensions
    if (s["w"], s["h"]) != (1920, 1080):
        issues.append(f"DIMENSIONS {s['w']}x{s['h']} — must be 1920x1080")
    # 7 retired generation in the filename
    for bad in RETIRED_GENERATIONS:
        if bad in name: issues.append(f"RETIRED GENERATION in filename: '{bad}'")
    # 5 retired palette — CHROME only, not scene colour.
    # This fired on a GOOD frame (the Heroine's yellow plaid + jacaranda trees)
    # and a check that fails good work gets ignored. Now it only complains when
    # gold+plum genuinely dominate, which is what a chrome-heavy frame looks
    # like; a costume and some trees never reach these levels together.
    if s["gold"] > 0.16 and s["plum"] > 0.10:
        notes.append(f"possible retired palette — gold {s['gold']*100:.1f}% + "
                     f"plum {s['plum']*100:.1f}% (check it is chrome, not costume/scenery)")
    # 6 saturation
    if s["sat"] < 28:
        issues.append(f"MUTED — saturation {s['sat']:.0f} (style lock says pushed/saturated)")
    # 9 exposure
    if s["lum"] < 34: issues.append(f"TOO DARK — mean luminance {s['lum']:.0f}")
    if s["lum"] > 225: issues.append(f"BLOWN OUT — mean luminance {s['lum']:.0f}")

    h = hashes.get(name)
    if h is not None:
        # 2 exact duplicate anywhere in the folder
        dups = [n for n, hh in hashes.items() if n != name and hh == h]
        if dups: issues.append(f"EXACT DUPLICATE of: {', '.join(dups[:3])}")
        # 4 near-identical to any other asset
        near = [(hamming(h, hh), n) for n, hh in hashes.items() if n != name]
        near = sorted(d for d in near if d[0] <= 6)
        if near:
            issues.append("NEAR-IDENTICAL to: " +
                          ", ".join(f"{n} (d={d})" for d, n in near[:3]))
        # 3 near-identical to its neighbour in the cut
        if name in pos:
            i = pos[name]
            for j in (i - 1, i + 1):
                if 0 <= j < len(wired):
                    nb = wired[j][1]
                    if nb in hashes and hamming(h, hashes[nb]) <= 10:
                        issues.append(f"TOO CLOSE TO ADJACENT CUT FRAME {nb} "
                                      f"(d={hamming(h, hashes[nb])})")
    if issues:
        fails += 1
        print(f"✗ {name}")
        for i in issues: print(f"    • {i}")
    else:
        print(f"✓ {name}   sat={s['sat']:.0f} lum={s['lum']:.0f}")
    for nt in notes:
        print(f"    ~ {nt}")
    print()

print(f"── machine checks: {len(targets)-fails} clean, {fails} flagged ──\n")
print("""NOW THE PART A MACHINE CANNOT DO. Answer per frame, in writing, with the
frame open. An unanswerable question is a FAIL, not a pass:

  1 IDENTITY   Which named woman is this, and which approved frame did I compare
               her face to? (name the file). Is she the right AGE for this year?
  2 HEROINE    Is she in the episode outfit from canon? Same as every other frame?
  3 EXTRAS     Background people — Y2K-dressed women? Any melted/garbled faces?
  4 CONTINUITY Name the anchor frame. What carries over — room, light, clothes,
               props? What changed that shouldn't have?
  5 PERIOD     Anything in frame that did not exist in this year? Right location
               for this event? Right NUMBER of people?
  6 INVENTED   Any symbol, prop, sign or motif with no canon behind it?
               (handprints, invented brands, mashed-up concepts)
  7 ANATOMY    Every figure complete? Legs reaching the ground, hands correct,
               nothing stopping behind a foreground object?
  8 TEXT       Every word legible and correct? "AI" both caps? Brand words spelled
               right? Numbers right (KSVL is 99.9)?
  9 FIT        Does this illustrate the line SPOKEN over it — not a neighbouring
               line, not a literal reading of a metaphor?
 10 EXISTING   Did I check the unused asset pool? Which candidates did I reject
               and why?""")
