#!/usr/bin/env python3
"""Derive the MISSING-BEAT brief from the narration clock.

Read-only. Emits a proposal; never touches the cue sheet.

For every cue that holds longer than MAX, work out how many frames the hold
actually needs, and for each missing frame print the EXACT narration spoken
during its window. That text is what the image must depict — so the shot can't
be mistimed, because its in-point and duration come from the audio itself.
"""
import json, sys, math
cues_p, map_p = sys.argv[1], sys.argv[2]
MAX = float(sys.argv[3]) if len(sys.argv) > 3 else 12.0

cues = json.load(open(cues_p)); cues = cues.get("cues", cues)
units = json.load(open(map_p))
END = max(u["end"] for u in units)

def words_between(a, b):
    """the narration actually spoken in [a,b)"""
    out = []
    for u in units:
        if u["end"] > a and u["start"] < b:
            out.append((u["speaker"], u["text"]))
    return out

def mmss(t): return f"{int(t//60)}:{t%60:05.2f}"

need = []
for i, c in enumerate(cues):
    t = float(c.get("t", 0))
    out = float(cues[i+1]["t"]) if i+1 < len(cues) else END
    hold = out - t
    if hold <= MAX: continue
    frames = math.ceil(hold / MAX)
    slot = hold / frames
    for k in range(1, frames):            # frame 0 is the existing still
        a = t + slot*k; b = min(out, a + slot)
        need.append({"after": c.get("src","?"), "t": a, "dur": round(b-a,1),
                     "says": words_between(a, b)})

print(f"# EP4 — MISSING BEATS, derived from the narration clock")
print(f"# max hold {MAX}s · {len(need)} new frames needed\n")
cur = None
for n in need:
    if n["after"] != cur:
        cur = n["after"]; print(f"\n## after `{cur}`")
    print(f"\n- **{mmss(n['t'])}  ({n['dur']}s)**")
    for sp, tx in n["says"][:3]:
        print(f"  - {sp}: “{tx[:150]}”")
json.dump(need, open("../captions/episode-04-missing-beats.json","w"), indent=1)
print(f"\n\n<!-- {len(need)} beats -> operations/captions/episode-04-missing-beats.json -->")
