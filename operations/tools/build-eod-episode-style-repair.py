#!/usr/bin/env python3
"""Build a narration-clock-locked episode repair from the EOD replacement manifest.

The wrapper refuses unresolved episodes, verifies the old source at every
replacement cue, disables all legacy camera drift, writes an auditable effective
cue sheet, then delegates encoding and full-decode verification to the canonical
controlled-cue assembler.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = (
    ROOT
    / "operations/product-stewards/episode-media-quality/"
    "eod-2026-07-25-replacement-manifest.json"
)
ASSEMBLER = ROOT / "operations/tools/assemble-controlled-cue-film.py"


def normalized(value: str) -> str:
    return "/" + value.split("?")[0].lstrip("/")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("episode", choices=("01", "02"))
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    episode = manifest["episodes"][args.episode]
    unresolved = [
        item for item in episode["replacements"] if item["status"] != "replace"
    ]
    if unresolved:
        cues = ", ".join(str(item["cue"]) for item in unresolved)
        raise RuntimeError(f"Episode {args.episode} has unresolved replacement cues: {cues}")

    base_path = ROOT / episode["base_cues"]
    cue_data = json.loads(base_path.read_text(encoding="utf-8"))
    by_cue = {item["cue"]: item for item in episode["replacements"]}
    for cue_number, cue in enumerate(cue_data["cues"]):
        cue["motion"] = False
        replacement = by_cue.get(cue_number)
        if not replacement:
            continue
        if normalized(cue["src"]) != normalized(replacement["old_source"]):
            raise RuntimeError(
                f"Cue {cue_number} source changed: {cue['src']} != "
                f"{replacement['old_source']}"
            )
        cue["src"] = replacement["new_source"]

    effective = (
        ROOT
        / f"assets/video/episode-{args.episode}-production-cues-"
        "eod-20260725-style-repair.json"
    )
    effective.write_text(json.dumps(cue_data, indent=2) + "\n", encoding="utf-8")

    version = "23" if args.episode == "01" else "18"
    output = (
        f"assets/video/episode-{args.episode}-full-v{version}-"
        "eod-style-repair-review.mp4"
    )
    report = (
        f"operations/product-stewards/episode-media-quality/"
        f"evidence-2026-07-25/episode-{args.episode}-full-v{version}-"
        "eod-style-repair-qc.json"
    )
    command = [
        sys.executable,
        str(ASSEMBLER),
        "--label",
        f"Episode {args.episode} EOD style repair; narration locked; no camera drift",
        "--cues",
        str(effective.relative_to(ROOT)),
        "--output",
        output,
        "--report",
        report,
        "--zoom",
        "0",
    ]
    subprocess.run(command, cwd=ROOT, check=True)


if __name__ == "__main__":
    main()
