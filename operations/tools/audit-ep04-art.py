#!/usr/bin/env python3
"""Audit the EP04 art library: what exists, what is a near-duplicate, what is usable.

Reads only. Generates nothing. Answers the question Ali asked twice:
"of these files, how many are actually DISTINCT beats, and which ones can I use?"

Every number it prints is a counted denominator, not an impression:
  - the file list is enumerated and counted before anything is judged
  - duplicates are found by measured image distance, not by filename
  - banned/wired status comes from the decisions file and the cue sheet, not memory

It does NOT judge whether a frame is on-model, on-canon, or on-style. Those are
Ali's verdicts. This tells her which files are mechanically eligible to receive one.

Usage:  python3 Website-homepage/operations/tools/audit-ep04-art.py [--report PATH]
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
ART_DIR = ROOT / "assets/episodes/ep-04/pixel"
CUES_PATH = ROOT / "content/episodes/episode-04-cues.json"
DECISIONS_PATH = ROOT / "operations/ep04-cut-decisions.md"
REJECTIONS_PATH = ROOT / "operations/ops/rejections.json"

IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg"}

# Distance bands, CALIBRATED on this library rather than imported from a paper.
# Measured RMS between 64x64 greyscales of known pairs in this very folder:
#   same render refiled .jpg/.png ............................  0.25
#   wand-approach vs wand-contact (a deliberate 4-frame move) .  7.0 - 10.4
#   splash dim vs splash blazing (two real beats) ............. 69.0
#   grace a-start vs b-mid, hedy vs eniac (unrelated beats) ... 58.0 - 63.8
# The gap between 10 and 58 is wide enough that any cut in between is safe.
SAME_PICTURE = 2.0     # the same render, refiled or re-encoded
NEAR_DUPLICATE = 15.0  # different file, same picture with a small element moved

# Everything from the first generation/version marker onward is variant noise;
# what is left in front of it is the BEAT.
VARIANT_TAIL = re.compile(r"-(?:comic|pixel|painterly)\b.*$|-v\d+\b.*$|-\d{3,4}$")
VERSION = re.compile(r"-v(\d+)\b")
CURRENT_GENERATION = "comic"  # locked style; see memory episode-style-comic-popart-direction


def thumbnail(path: Path) -> np.ndarray:
    return np.asarray(
        Image.open(path).convert("L").resize((64, 64), Image.LANCZOS), dtype=np.float32
    ).ravel()


def beat_slug(stem: str) -> str:
    return VARIANT_TAIL.sub("", stem) or stem


def scene_of(slug: str) -> str:
    body = slug[len("ep04-"):] if slug.startswith("ep04-") else slug
    for prefix, label in (
        ("open-", "Opening"),
        ("scene-", "Scene"),
        ("tj-", "Time-jump cards"),
        ("transition-", "Transitions"),
        ("beat-", "Beat-timed frames"),
    ):
        if body.startswith(prefix):
            number = body[len(prefix):].split("-", 1)[0]
            if label in ("Opening", "Scene") and number[:2].isdigit():
                return f"{label} {number[:2]}"
            return label
    return "Standalone / graphic frames"


def banned_patterns() -> list[str]:
    text = DECISIONS_PATH.read_text(encoding="utf-8")
    block = re.search(r"```banned\n(.*?)```", text, re.S)
    if not block:
        raise RuntimeError(f"No ```banned block in {DECISIONS_PATH}")
    return [line.strip() for line in block.group(1).splitlines() if line.strip()]


def cluster(records: list[dict], threshold: float) -> list[list[dict]]:
    """Single-link clustering on measured RMS distance between thumbnails."""
    if not records:
        return []
    matrix = np.stack([r["thumb"] for r in records])
    parent = list(range(len(records)))

    def find(i: int) -> int:
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    for i in range(len(records)):
        # RMS of the difference, vectorised against every later row at once.
        distances = np.sqrt(((matrix[i + 1:] - matrix[i]) ** 2).mean(axis=1))
        for offset in np.nonzero(distances <= threshold)[0]:
            a, b = find(i), find(i + 1 + int(offset))
            if a != b:
                parent[a] = b

    groups: dict[int, list[dict]] = defaultdict(list)
    for index, record in enumerate(records):
        groups[find(index)].append(record)
    return list(groups.values())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()

    files = sorted(
        p for p in ART_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in IMAGE_SUFFIXES and not p.name.startswith(".")
    )
    total = len(files)

    cues = json.loads(CUES_PATH.read_text(encoding="utf-8"))["cues"]
    wired_at: dict[str, list[int]] = defaultdict(list)
    for index, cue in enumerate(cues):
        wired_at[Path(cue["src"].split("?", 1)[0]).name].append(index)

    patterns = banned_patterns()
    rejected = set(json.loads(REJECTIONS_PATH.read_text(encoding="utf-8"))["global"])

    records = []
    for path in files:
        with Image.open(path) as image:
            width, height = image.size
        records.append({
            "path": path,
            "name": path.name,
            "slug": beat_slug(path.stem),
            "banned": next((p for p in patterns if p in path.name), None),
            "rejected": path.name in rejected,
            "wired": sorted(wired_at.get(path.name, [])),
            "bytes": path.stat().st_size,
            "width": width,
            "height": height,
            "md5": hashlib.md5(path.read_bytes()).hexdigest(),
        })

    live = [r for r in records if not r["banned"] and not r["rejected"]]
    print(f"Measuring {len(live)} of {total} files ...", flush=True)
    for record in live:
        record["thumb"] = thumbnail(record["path"])

    identical = [c for c in cluster(live, SAME_PICTURE) if len(c) > 1]
    near = [c for c in cluster(live, NEAR_DUPLICATE) if len(c) > 1]
    distinct_pictures = len(cluster(live, SAME_PICTURE))

    by_beat: dict[str, list[dict]] = defaultdict(list)
    for record in live:
        by_beat[record["slug"]].append(record)

    def pick(candidates: list[dict]) -> dict:
        """Most likely CURRENT take: wired > current generation > highest -vN > widest."""
        def key(r: dict) -> tuple:
            versions = [int(v) for v in VERSION.findall(r["name"])]
            return (
                bool(r["wired"]),
                CURRENT_GENERATION in r["name"],
                max(versions) if versions else 0,
                r["width"],
                r["bytes"],
            )
        return max(candidates, key=key)

    by_scene: dict[str, list[str]] = defaultdict(list)
    for slug in by_beat:
        by_scene[scene_of(slug)].append(slug)

    shortlist = [pick(rs) for rs in by_beat.values()]
    full_res = [r for r in shortlist if r["width"] >= 1920]
    current_gen = [r for r in shortlist if CURRENT_GENERATION in r["name"]]
    eligible = [r for r in shortlist if r["width"] >= 1920 and CURRENT_GENERATION in r["name"]]

    banned_files = [r for r in records if r["banned"]]
    orphan_wired = sorted(set(wired_at) - {r["name"] for r in records})
    unwired_cues = [i for i, c in enumerate(cues)
                    if Path(c["src"].split("?", 1)[0]).name not in {r["name"] for r in records}]

    lines: list[str] = []
    w = lines.append
    w("# EP04 art audit — what actually exists")
    w("")
    w(f"Source: `{ART_DIR}`")
    w("")
    w("Read-only. Nothing generated. Re-run with "
      "`python3 Website-homepage/operations/tools/audit-ep04-art.py`.")
    w("")
    w("**This does not say anything is on-model.** It says which files are "
      "mechanically eligible for you to look at.")
    w("")

    w("## The denominator")
    w("")
    w("| | count |")
    w("|---|---|")
    w(f"| Image files on disk | **{total}** |")
    w(f"| Blocked by the `banned` block in `ep04-cut-decisions.md` | {len(banned_files)} |")
    w(f"| Globally rejected in `rejections.json` | {len([r for r in records if r['rejected']])} |")
    w(f"| **Live candidates** | **{len(live)}** |")
    w(f"| — of those, distinct PICTURES (identical renders collapsed) | **{distinct_pictures}** |")
    w(f"| — of those, distinct BEATS (filename-collapsed) | **{len(by_beat)}** |")
    w(f"| Wired into the 57-cue cut | {len([r for r in records if r['wired']])} |")
    w("")
    w(f"One current take per beat gives a shortlist of **{len(by_beat)} frames**. Of those:")
    w("")
    w(f"- **{len(eligible)}** are full-res (≥1920 wide) AND in the locked `comic` generation — "
      "the ones worth your eyes")
    w(f"- {len(full_res) - len(eligible)} are full-res but from an older generation")
    w(f"- {len(by_beat) - len(full_res)} are below 1920 wide — legacy renders, not usable at 1080p")
    w("")

    w("## Collapse 1 — the same render, filed more than once")
    w("")
    w(f"{len(identical)} clusters, "
      f"{sum(len(c) for c in identical) - len(identical)} redundant files "
      f"(RMS ≤ {SAME_PICTURE}).")
    w("")
    for group in sorted(identical, key=lambda c: -len(c)):
        same_bytes = len({r["md5"] for r in group}) == 1
        note = "byte-identical" if same_bytes else "re-encoded / re-saved"
        w(f"- **{len(group)} files, one picture** ({note}):")
        for record in sorted(group, key=lambda r: r["name"]):
            mark = f" ← in the cut at cue {record['wired']}" if record["wired"] else ""
            w(f"  - `{record['name']}`{mark}")
    w("")

    w("## Collapse 2 — near-duplicates across DIFFERENT beat names")
    w("")
    w(f"Different files, same picture with something small moved "
      f"(RMS ≤ {NEAR_DUPLICATE}). Calibrated: unrelated beats in this folder "
      f"measure 58–69, so nothing here is a genuinely different shot.")
    w("")
    cross = [c for c in near if len({r["slug"] for r in c}) > 1]
    for group in sorted(cross, key=lambda c: -len(c)):
        slugs = sorted({r["slug"] for r in group})
        w(f"- **{len(group)} files spanning {len(slugs)} beat names** — "
          f"`{slugs[0]}` … `{slugs[-1]}`")
        for record in sorted(group, key=lambda r: r["name"]):
            mark = f" ← in the cut at cue {record['wired']}" if record["wired"] else ""
            w(f"  - `{record['name']}`{mark}")
    w("")
    w("⚠ A cluster here is not automatically a mistake — a deliberate move "
      "(wand approach → contact → rebound) looks like this too. It IS a mistake "
      "wherever the beats are supposed to show different things.")
    w("")

    w("## Distinct beats, by scene")
    w("")
    w("`current take` is mechanical: wired first, then locked `comic` generation, "
      "then highest `-vN`, then widest. It is a guess at which file is current — "
      "**not** an approval.")
    w("")
    for scene in sorted(by_scene, key=lambda s: (s.split()[0], s)):
        slugs = sorted(by_scene[scene])
        w(f"### {scene} — {len(slugs)} distinct beats")
        w("")
        w("| beat | takes | current take | px | in the cut |")
        w("|---|---|---|---|---|")
        for slug in slugs:
            candidates = by_beat[slug]
            chosen = pick(candidates)
            wired_here = sorted({c for r in candidates for c in r["wired"]})
            cut = ", ".join(f"cue {c}" for c in wired_here) if wired_here else "—"
            w(f"| `{slug}` | {len(candidates)} | `{chosen['name']}` "
              f"| {chosen['width']} | {cut} |")
        w("")

    w("## Blocked by a recorded decision")
    w("")
    w(f"{len(banned_files)} files match the `banned` block. They stay on disk; "
      "the hook refuses to wire them.")
    w("")
    for record in sorted(banned_files, key=lambda r: r["name"]):
        w(f"- `{record['name']}` — matches `{record['banned']}`")
    w("")

    w("## Cue sheet reconciliation")
    w("")
    if orphan_wired:
        w(f"⚠ {len(orphan_wired)} wired filenames are not in this folder "
          "(they live elsewhere, or they are missing):")
        for name in orphan_wired:
            w(f"- `{name}` — cue {wired_at[name]}")
    else:
        w(f"All {len(cues)} cues resolve to a file in this folder.")
    w("")
    w(f"Cues resolved here: {len(cues) - len(unwired_cues)} / {len(cues)}.")
    w("")

    report = "\n".join(lines) + "\n"
    if args.report:
        args.report.write_text(report, encoding="utf-8")
        print(f"wrote {args.report}")
    else:
        print(report)


if __name__ == "__main__":
    main()
