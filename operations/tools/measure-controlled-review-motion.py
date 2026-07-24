#!/usr/bin/env python3
"""Measure controlled-motion review films from their assembler QA report.

This is the reusable counterpart to ``assemble-controlled-cue-film.py``. It
chooses intentional still holds as the encode-noise controls, samples moving
placements across the full runtime, and records whether the restrained camera
move is measurably above the still floor.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MEASURE = ROOT / "operations/tools/measure-motion.py"

spec = importlib.util.spec_from_file_location("laidies_motion_measure", MEASURE)
if spec is None or spec.loader is None:
    raise RuntimeError("Could not load shared motion instrument")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def resolve(value: Path) -> Path:
    return value if value.is_absolute() else ROOT / value


def sample_start(placement: dict, seconds: float) -> float:
    start = float(placement["start"])
    stop = float(placement["stop"])
    span = stop - start
    if span <= seconds + 0.5:
        return start + 0.25
    return start + (span - seconds) / 2


def distributed(items: list[dict], count: int) -> list[dict]:
    if len(items) <= count:
        return items
    indexes = {
        round(index * (len(items) - 1) / (count - 1))
        for index in range(count)
    }
    return [items[index] for index in sorted(indexes)]


def label(placement: dict) -> str:
    return f"cue {placement['cue']} · {Path(placement['source']).stem}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", required=True, type=Path)
    parser.add_argument("--report", required=True, type=Path)
    parser.add_argument("--out", required=True, type=Path)
    parser.add_argument("--seconds", type=float, default=4.0)
    parser.add_argument("--moving-samples", type=int, default=8)
    parser.add_argument("--still-controls", type=int, default=3)
    args = parser.parse_args()

    video = resolve(args.video)
    report_path = resolve(args.report)
    out = resolve(args.out)
    for required in [video, report_path]:
        if not required.is_file():
            raise FileNotFoundError(required)
    if out.exists():
        raise FileExistsError(f"Refusing to overwrite: {out}")

    report = json.loads(report_path.read_text(encoding="utf-8"))
    placements = report.get("placements", [])
    still = sorted(
        (item for item in placements if item.get("mode") == "still"),
        key=lambda item: float(item["stop"]) - float(item["start"]),
        reverse=True,
    )[: args.still_controls]
    moving = distributed(
        [item for item in placements if item.get("mode") == "camera"],
        args.moving_samples,
    )
    if not still or not moving:
        raise RuntimeError("Report must contain both still and camera placements")

    def measure(placement: dict) -> dict:
        at = sample_start(placement, args.seconds)
        peak, share = module.swing(module.sample(video, at, args.seconds))
        return {
            "cue": placement["cue"],
            "source": placement["source"],
            "at": at,
            "seconds": args.seconds,
            "peak": peak,
            "moved_percent": share,
        }

    controls = {label(item): measure(item) for item in still}
    peak_floor = max(item["peak"] for item in controls.values())
    share_floor = max(item["moved_percent"] for item in controls.values())

    results = {}
    for placement in moving:
        item = measure(placement)
        item["verdict"] = (
            "moving"
            if item["peak"] > peak_floor * 2
            and item["moved_percent"] > max(share_floor * 4, 0.05)
            else "STILL"
        )
        results[label(placement)] = item

    payload = {
        "video": str(video.relative_to(ROOT)),
        "assembler_report": str(report_path.relative_to(ROOT)),
        "still_controls": controls,
        "peak_floor": peak_floor,
        "share_floor": share_floor,
        "moving_sample_count": len(results),
        "moving_pass_count": sum(
            item["verdict"] == "moving" for item in results.values()
        ),
        "results": results,
    }
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, indent=2))
    print(out)


if __name__ == "__main__":
    main()
