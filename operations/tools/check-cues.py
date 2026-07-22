#!/usr/bin/env python3
"""Cross-reference a cue sheet against the narration timing map.

Answers, mechanically, the questions Ali has been answering by watching:
  - how long does each cue actually hold?
  - which holds are too long for a single still?
  - what line of narration is being spoken when each image appears?
"""
import json, sys
cues_p, map_p = sys.argv[1], sys.argv[2]
LONG = float(sys.argv[3]) if len(sys.argv) > 3 else 25.0

cues = json.load(open(cues_p)); cues = cues.get("cues", cues)
units = json.load(open(map_p))
END = max(u["end"] for u in units)

def line_at(t):
    for u in units:
        if u["start"] <= t <= u["end"]: return u
    nxt = [u for u in units if u["start"] >= t]
    return nxt[0] if nxt else units[-1]

rows = []
for i, c in enumerate(cues):
    t = float(c.get("t", 0))
    out = float(cues[i+1]["t"]) if i+1 < len(cues) else END
    u = line_at(t)
    rows.append({"i": i, "t": t, "hold": round(out-t, 1), "src": c.get("src", "?"),
                 "speaker": u["speaker"], "line": u["text"][:78]})

longs = [r for r in rows if r["hold"] >= LONG]
print(f"{len(rows)} cues | runtime {END/60:.1f} min | {len(longs)} holds >= {LONG}s\n")
print(f"{'#':>3} {'IN':>8} {'HOLD':>6}  {'SPEAKER':<12} LINE SPOKEN AT THAT MOMENT")
print("-"*104)
for r in rows:
    flag = " <<<" if r["hold"] >= LONG else ""
    mm, ss = divmod(r["t"], 60)
    print(f"{r['i']:>3} {int(mm):>5}:{ss:05.2f} {r['hold']:>6.1f}  {r['speaker']:<12} {r['line']}{flag}")
print("\nTOTAL DEAD AIR (holds >= %ss): %.0f s across %d cues"
      % (LONG, sum(r["hold"] for r in longs), len(longs)))
