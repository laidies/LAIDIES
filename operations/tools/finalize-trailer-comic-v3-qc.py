#!/usr/bin/env python3
"""Run required trailer v3 motion gates and bind them into maker QC.

This is a mechanical finalizer only. It does not make the independent visual
judgments needed for admission.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DELIVERY = (
    ROOT
    / "assets/episodes/trailer/comic/delivery/canonical-named-map"
)
OUTPUT = (
    DELIVERY
    / "laidies-trailer-comic-v3-map-caption-reconciled-review-1920.mp4"
)
MAP = DELIVERY / "trailer-v3-exact-58-beat-map.json"
QC = (
    DELIVERY
    / "laidies-trailer-comic-v3-map-caption-reconciled-review-qc.json"
)
MEASUREMENTS = DELIVERY / "trailer-v3-motion-measurements-full-span.json"
HARD_CUTS = DELIVERY / "trailer-v3-hard-cut-results.json"
CHECK_TOOL = ROOT / "operations/tools/check-hard-cuts.py"
MEASURE_TOOL = ROOT / "operations/tools/measure-motion.py"
MOTION_IDS = ["B05", "B13", "B39", "B54"]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def run(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )


def main() -> int:
    for required in [OUTPUT, MAP, QC, CHECK_TOOL, MEASURE_TOOL]:
        if not required.exists():
            raise FileNotFoundError(required)

    map_document = json.loads(MAP.read_text(encoding="utf-8"))
    qc = json.loads(QC.read_text(encoding="utf-8"))
    clips: list[Path] = []
    for beat_id in MOTION_IDS:
        beat = next(
            item for item in map_document["beats"] if item["beat_id"] == beat_id
        )
        clip = ROOT / beat["normalized_clip"]
        if not clip.exists():
            raise FileNotFoundError(clip)
        clips.append(clip)

    cut_result = run(
        [sys.executable, str(CHECK_TOOL), *[str(clip) for clip in clips]]
    )
    if "All clips clean." not in cut_result.stdout:
        raise RuntimeError("Hard-cut checker did not report all clips clean")
    hard_cut_document = {
        "schema": "laidies.trailer.v3.hard-cut-results",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "output": str(OUTPUT.relative_to(ROOT)),
        "output_sha256": sha256(OUTPUT),
        "tool": str(CHECK_TOOL.relative_to(ROOT)),
        "tool_sha256": sha256(CHECK_TOOL),
        "threshold": 25.0,
        "sample_fps": 6,
        "all_clips_clean": True,
        "clips": [
            {
                "beat_id": beat_id,
                "path": str(clip.relative_to(ROOT)),
                "sha256": sha256(clip),
                "verdict": "PASS",
                "detail": "one continuous shot",
            }
            for beat_id, clip in zip(MOTION_IDS, clips)
        ],
        "literal_tool_output": cut_result.stdout,
    }
    HARD_CUTS.write_text(
        json.dumps(hard_cut_document, indent=2) + "\n",
        encoding="utf-8",
    )

    measure_result = run(
        [
            sys.executable,
            str(MEASURE_TOOL),
            "clips",
            *[str(clip) for clip in clips],
            "--seconds",
            "29",
            "--json",
            str(MEASUREMENTS),
        ]
    )
    measurements = json.loads(MEASUREMENTS.read_text(encoding="utf-8"))
    for result in measurements["results"].values():
        if not result or result["verdict"] != "moving":
            raise RuntimeError("Full-span motion measurement did not pass")

    cut_by_beat = {
        item["beat_id"]: item for item in hard_cut_document["clips"]
    }
    freeze_results: dict[str, dict[str, object]] = {}
    for beat in map_document["beats"]:
        if beat["beat_id"] not in MOTION_IDS:
            continue
        clip_name = Path(beat["normalized_clip"]).name
        render = beat["evidence"]["motion"].get("render") or {}
        if (
            render.get("action")
            != "play_once_then_freeze_on_source_last_frame"
            or float(render.get("freeze_seconds", 0.0)) < 0.5
        ):
            raise RuntimeError(
                f"{beat['beat_id']} does not have the required final-frame freeze"
            )
        freeze_results[beat["beat_id"]] = {
            "render_policy": beat.get("render_policy"),
            "action": render["action"],
            "motion_duration_seconds": render["motion_duration_seconds"],
            "freeze_seconds": render["freeze_seconds"],
            "target_duration_seconds": render["target_duration_seconds"],
        }
        beat["evidence"]["motion"].update(
            {
                "hard_cut": cut_by_beat[beat["beat_id"]],
                "full_span_measurement": measurements["results"][clip_name],
                "measurement_peak_floor": measurements["peak_floor"],
                "measurement_share_floor": measurements["share_floor"],
                "maker_status": "mechanically_measured_unjudged",
                "independent_judge_required": True,
            }
        )
    map_document["motion_gate_finalized_at_utc"] = datetime.now(
        timezone.utc
    ).isoformat()
    map_document["motion_gate_artifacts"] = {
        "hard_cuts": str(HARD_CUTS.relative_to(ROOT)),
        "measurements": str(MEASUREMENTS.relative_to(ROOT)),
    }
    MAP.write_text(
        json.dumps(map_document, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    qc["map"]["sha256"] = sha256(MAP)
    qc["motion"] = {
        "declared_beats": MOTION_IDS,
        "other_beats_are_static_holds": True,
        "check_hard_cuts": {
            "passed": True,
            "path": str(HARD_CUTS.relative_to(ROOT)),
            "sha256": sha256(HARD_CUTS),
            "clip_count": len(clips),
        },
        "measure_motion_full_span": {
            "passed": True,
            "path": str(MEASUREMENTS.relative_to(ROOT)),
            "sha256": sha256(MEASUREMENTS),
            "sample_seconds": 29,
            "results": measurements["results"],
        },
        "final_frame_freeze": {
            "passed": True,
            "minimum_required_seconds": 0.5,
            "results": freeze_results,
        },
        "semantic_motion_judgment": "UNJUDGED",
    }
    qc["required_mechanical_gates_passed"] = True
    qc["finalized_at_utc"] = datetime.now(timezone.utc).isoformat()
    QC.write_text(
        json.dumps(qc, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(cut_result.stdout)
    print(measure_result.stdout)
    print(json.dumps(qc, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise
