#!/usr/bin/env python3
"""Build Episode 01 v24 from the immutable v23 review film.

The v24 lane is evidence-first. The builder verifies every frozen authority,
requires the 71-placement reconciliation manifest, and permits only repairs
listed in the versioned config. If the reconciliation confirms no new failure,
v24 is an exact-byte preservation copy of v23. The maker cannot approve it.
"""

from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "assets/video/episode-01-v24-source-reconciled-config.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def bound_path(binding: dict[str, object]) -> Path:
    return ROOT / str(binding["path"])


def verify_binding(label: str, binding: dict[str, object]) -> Path:
    path = bound_path(binding)
    if not path.is_file():
        raise FileNotFoundError(f"{label}: {path}")
    actual = sha256(path)
    expected = str(binding["sha256"])
    if actual != expected:
        raise RuntimeError(f"{label} hash changed: {actual} != {expected}")
    if "size_bytes" in binding and path.stat().st_size != int(binding["size_bytes"]):
        raise RuntimeError(f"{label} size changed: {path.stat().st_size}")
    return path


def full_decode(path: Path) -> None:
    result = subprocess.run(
        [
            str(FFMPEG),
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(path),
            "-f",
            "null",
            "-",
        ],
        check=False,
    )
    if result.returncode:
        raise RuntimeError("Full v24 decode failed")


def build_title_repair(
    frozen: Path,
    output: Path,
    repair: dict[str, object],
    transition_seconds: float,
    runtime_seconds: float,
) -> None:
    replacement = ROOT / str(repair["replacement_source"])
    if not replacement.is_file():
        raise FileNotFoundError(replacement)
    if sha256(replacement) != str(repair["replacement_source_sha256"]):
        raise RuntimeError("Replacement title source hash changed")

    start = float(repair["start"])
    stop = float(repair["stop"])
    tail_stop = stop + transition_seconds
    source_duration = tail_stop - start
    previous_source = ROOT / "assets/video/comic-interstitials-v1/season-promo-3.png"
    next_source = (
        ROOT
        / "assets/episodes/ep-01/pixel/delivery-20260719-master-v1/"
        "ep01-steve-ovation-c-end-comic-textfix.png"
    )
    for path in (previous_source, next_source):
        if not path.is_file():
            raise FileNotFoundError(path)

    def still_chain(index: int, label: str) -> str:
        return (
            f"[{index}:v]fps=30,scale=1920:1080:"
            "force_original_aspect_ratio=increase:flags=lanczos,"
            f"crop=1920:1080,setsar=1,format=yuv420p[{label}]"
        )

    filters = [
        still_chain(1, "previous"),
        still_chain(2, "title"),
        still_chain(3, "next"),
        (
            f"[previous][title]xfade=transition=fade:duration={transition_seconds:.3f}:"
            "offset=0[first]"
        ),
        (
            f"[first][next]xfade=transition=fade:duration={transition_seconds:.3f}:"
            f"offset={stop - start:.3f},trim=duration={source_duration:.3f},"
            f"setpts=PTS-STARTPTS+{start:.3f}/TB[repair]"
        ),
        (
            f"[0:v][repair]overlay=eof_action=pass:repeatlast=0:shortest=0:"
            f"enable='between(t,{start:.3f},{tail_stop:.3f})',"
            "format=yuv420p[outv]"
        ),
    ]
    command = [
        str(FFMPEG),
        "-n",
        "-hide_banner",
        "-loglevel",
        "error",
        "-i",
        str(frozen),
        "-loop",
        "1",
        "-framerate",
        "30",
        "-t",
        f"{source_duration + 0.5:.3f}",
        "-i",
        str(previous_source),
        "-loop",
        "1",
        "-framerate",
        "30",
        "-t",
        f"{source_duration + 0.5:.3f}",
        "-i",
        str(replacement),
        "-loop",
        "1",
        "-framerate",
        "30",
        "-t",
        f"{source_duration + 0.5:.3f}",
        "-i",
        str(next_source),
        "-filter_complex",
        ";".join(filters),
        "-map",
        "[outv]",
        "-map",
        "0:a:0",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "18",
        "-profile:v",
        "high",
        "-level:v",
        "4.1",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        "-c:a",
        "copy",
        "-movflags",
        "+faststart",
        "-t",
        f"{runtime_seconds:.2f}",
        str(output),
    ]
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> None:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    frozen = verify_binding("frozen v23", config["frozen_input"])
    cue_sheet = verify_binding(
        "locked cue sheet",
        {
            "path": config["locked_clock"]["cue_sheet_path"],
            "sha256": config["locked_clock"]["cue_sheet_sha256"],
        },
    )
    narration = verify_binding("locked narration", config["locked_narration"])
    captions = verify_binding("locked captions", config["locked_captions"])
    verify_binding(
        "visual system lock",
        {
            "path": config["reference_authority"]["visual_system_lock"],
            "sha256": config["reference_authority"]["visual_system_lock_sha256"],
        },
    )

    manifest_path = ROOT / config["output"]["placement_manifest_path"]
    if not manifest_path.is_file():
        raise FileNotFoundError(f"71-placement manifest is required: {manifest_path}")
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    placements = manifest.get("placements", [])
    expected_count = int(config["locked_clock"]["placement_count"])
    if len(placements) != expected_count:
        raise RuntimeError(f"Manifest has {len(placements)} placements, expected {expected_count}")
    if [row.get("placement") for row in placements] != list(range(expected_count)):
        raise RuntimeError("Manifest placement indexes are not exactly 0..70")

    cue_data = json.loads(cue_sheet.read_text(encoding="utf-8"))
    if len(cue_data.get("cues", [])) != expected_count:
        raise RuntimeError("Locked cue sheet no longer contains 71 placements")
    repairs = config.get("v24_confirmed_repairs", [])
    if len(repairs) != 1 or int(repairs[0].get("cue", -1)) != 3:
        raise RuntimeError(
            "V24 builder is locked to exactly one confirmed repair: cue 3 title card"
        )

    output = ROOT / config["output"]["path"]
    qc_path = ROOT / config["output"]["maker_qc_path"]
    if output.exists() or qc_path.exists():
        raise FileExistsError(f"Refusing to overwrite: {output} / {qc_path}")
    output.parent.mkdir(parents=True, exist_ok=True)
    qc_path.parent.mkdir(parents=True, exist_ok=True)
    build_title_repair(
        frozen,
        output,
        repairs[0],
        float(config["locked_clock"]["transition_seconds"]),
        float(config["locked_clock"]["runtime_seconds"]),
    )
    full_decode(output)

    qc = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "MAKER_QC_COMPLETE_INDEPENDENT_JUDGMENT_REQUIRED",
        "episode": "01",
        "version": "24",
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "output_size_bytes": output.stat().st_size,
        "frozen_input": str(frozen.relative_to(ROOT)),
        "frozen_input_sha256": sha256(frozen),
        "exact_byte_copy_of_frozen_v23": False,
        "repair_method": "bounded cue-3 visual replacement; v23 audio stream copied",
        "new_confirmed_repairs": 1,
        "new_confirmed_repair_cues": [3],
        "replacement_source": repairs[0]["replacement_source"],
        "replacement_source_sha256": repairs[0]["replacement_source_sha256"],
        "carried_forward_confirmed_repairs": [4, 6, 12],
        "placement_manifest": str(manifest_path.relative_to(ROOT)),
        "placement_manifest_sha256": sha256(manifest_path),
        "placement_count": expected_count,
        "cue_sheet": str(cue_sheet.relative_to(ROOT)),
        "cue_sheet_sha256": sha256(cue_sheet),
        "narration": str(narration.relative_to(ROOT)),
        "narration_sha256": sha256(narration),
        "captions": str(captions.relative_to(ROOT)),
        "captions_sha256": sha256(captions),
        "captions_burned": False,
        "full_decode": "PASS",
        "maker_may_not_judge": True,
        "release_status": "HOLD_PENDING_INDEPENDENT_EPISODE_MEDIA_QUALITY",
    }
    qc_path.write_text(json.dumps(qc, indent=2) + "\n", encoding="utf-8")
    print(output)
    print(qc_path)


if __name__ == "__main__":
    main()
