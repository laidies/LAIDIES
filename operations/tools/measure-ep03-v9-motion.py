#!/usr/bin/env python3
"""Measure rendered Episode 03 v9 motion against intentional still holds."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
VIDEO = ROOT / "assets/video/episode-03-full-v9-controlled-motion-review.mp4"
OUT = ROOT / "operations/video-qa/episode-03-full-v9-motion-measure.json"
MEASURE = ROOT / "operations/tools/measure-motion.py"

spec = importlib.util.spec_from_file_location("laidies_motion_measure", MEASURE)
if spec is None or spec.loader is None:
    raise RuntimeError("Could not load shared motion instrument")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

CONTROLS = {
    "welcome hold": 116.0,
    "cocktail hold": 820.0,
    "next-week hold": 1025.0,
}

POINTS = {
    "cold-open screen loop": 58.0,
    "transformation event": 139.0,
    "Bethany ambient loop": 270.0,
    "verification camera move": 450.0,
    "move-one camera move": 715.0,
    "receipts-pass ambient loop": 895.0,
}


def measure(at: float) -> tuple[float, float]:
    return module.swing(module.sample(VIDEO, at, 5.0))


def main() -> None:
    if not VIDEO.is_file():
        raise FileNotFoundError(VIDEO)
    controls = {label: measure(at) for label, at in CONTROLS.items()}
    peak_floor = max(value[0] for value in controls.values())
    share_floor = max(value[1] for value in controls.values())
    results = {}
    for label, at in POINTS.items():
        peak, share = measure(at)
        verdict = (
            "moving"
            if peak > peak_floor * 2 and share > max(share_floor * 4, 0.05)
            else "STILL"
        )
        results[label] = {
            "at": at,
            "peak": peak,
            "moved_percent": share,
            "verdict": verdict,
        }
    payload = {
        "video": str(VIDEO.relative_to(ROOT)),
        "still_controls": {
            label: {"at": CONTROLS[label], "peak": value[0], "moved_percent": value[1]}
            for label, value in controls.items()
        },
        "peak_floor": peak_floor,
        "share_floor": share_floor,
        "results": results,
    }
    OUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))
    print(OUT)


if __name__ == "__main__":
    main()
