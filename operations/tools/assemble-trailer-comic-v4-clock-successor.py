#!/usr/bin/env python3
"""Build and mechanically verify the LAiDIES trailer v4 clock successor.

This is a deliberately narrow repair:

* every frozen v3 source image, source motion clip and tuple artifact is
  checksum-verified and left byte-for-byte unchanged;
* the 54 static normalized beats are reused without rewriting them;
* B05/B13/B39/B54 are re-encoded only to append clones of their own observed
  final decoded frame until they reach the existing mapped frame count;
* the 58 beats are hard-concatenated at the existing frame clock;
* the exact existing narration stream, VTT and SRT are reused unchanged;
* observed decoded frames prove clip counts, all 57 cut onsets, freeze-frame
  identity and picture/audio/caption tail alignment; and
* the same clock gate is run adversarially against v3 and must reject its
  213-frame / 7.10-second deficit.

The output remains review-only. This maker cannot judge, admit, integrate,
deploy or publish it.
"""

from __future__ import annotations

import copy
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import cv2
import numpy as np


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = (
    ROOT
    / "assets/episodes/trailer/comic/delivery/canonical-named-map/"
    "trailer-v4-clock-successor-config.json"
)
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)
CHECK_HARD_CUTS = ROOT / "operations/tools/check-hard-cuts.py"
MEASURE_MOTION = ROOT / "operations/tools/measure-motion.py"


def now_utc() -> str:
    return datetime.now(timezone.utc).isoformat()


def run(
    args: list[str],
    *,
    capture: bool = False,
    check: bool = True,
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        args,
        cwd=ROOT,
        check=check,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def resolve(value: str) -> Path:
    return ROOT / value


def media_duration(path: Path) -> float:
    probe = run(
        [str(FFMPEG), "-hide_banner", "-i", str(path), "-f", "null", "-"],
        capture=True,
        check=False,
    )
    match = re.search(
        r"Duration:\s+(\d+):(\d+):(\d+(?:\.\d+)?)",
        probe.stderr,
    )
    if not match:
        raise RuntimeError(f"Could not read duration for {path}")
    hours, minutes, seconds = match.groups()
    return int(hours) * 3600 + int(minutes) * 60 + float(seconds)


def stream_hash(path: Path, selector: str) -> str:
    result = run(
        [
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(path),
            "-map",
            selector,
            "-c",
            "copy",
            "-f",
            "hash",
            "-hash",
            "sha256",
            "-",
        ],
        capture=True,
    )
    match = re.search(r"SHA256=([0-9a-fA-F]{64})", result.stdout)
    if not match:
        raise RuntimeError(f"Could not hash stream {selector} in {path}")
    return match.group(1).lower()


def decoded_frame_hashes(path: Path) -> list[str]:
    result = run(
        [
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(path),
            "-map",
            "0:v:0",
            "-pix_fmt",
            "yuv420p",
            "-f",
            "framemd5",
            "-",
        ],
        capture=True,
    )
    hashes: list[str] = []
    for line in result.stdout.splitlines():
        if not line or line.startswith("#"):
            continue
        parts = [part.strip() for part in line.split(",")]
        if len(parts) >= 6 and re.fullmatch(r"[0-9a-f]{32}", parts[-1]):
            hashes.append(parts[-1])
    if not hashes:
        raise RuntimeError(f"No decoded frame hashes returned for {path}")
    return hashes


def decoded_frame_count(path: Path) -> int:
    result = run(
        [
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(path),
            "-map",
            "0:v:0",
            "-f",
            "null",
            "-",
            "-progress",
            "pipe:1",
        ],
        capture=True,
    )
    matches = re.findall(r"^frame=(\d+)$", result.stdout, re.M)
    if not matches:
        raise RuntimeError(f"No decoded frame count returned for {path}")
    return int(matches[-1])


def bgr_frame_sha256(frame: np.ndarray) -> str:
    return hashlib.sha256(frame.tobytes()).hexdigest()


def observed_freeze_metrics(
    path: Path,
    *,
    anchor_frame: int,
    end_frame_exclusive: int,
) -> dict[str, Any]:
    """Compare decoded tail frames to the decoded freeze anchor.

    Lossy H.264 may reconstruct a stream of identical encoder inputs with
    small block-level pixel differences across reference-frame boundaries.
    Therefore exact framemd5 equality is recorded but is not the material
    freeze criterion. The gate is an observed decoded-pixel comparison with
    deliberately tight thresholds that are far below visible motion.
    """

    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"OpenCV could not decode {path}")
    capture.set(cv2.CAP_PROP_POS_FRAMES, anchor_frame)
    ok, anchor = capture.read()
    if not ok:
        capture.release()
        raise RuntimeError(
            f"Could not decode freeze anchor {anchor_frame} from {path}"
        )
    anchor_i16 = anchor.astype(np.int16)
    compared = 0
    max_mean_abs = 0.0
    max_p99_abs = 0.0
    max_absolute = 0
    max_share_over_five = 0.0
    current_frame = anchor_frame + 1
    while current_frame < end_frame_exclusive:
        ok, frame = capture.read()
        if not ok:
            capture.release()
            raise RuntimeError(
                f"Freeze tail ended early at frame {current_frame} in {path}"
            )
        difference = np.abs(frame.astype(np.int16) - anchor_i16)
        max_mean_abs = max(max_mean_abs, float(difference.mean()))
        max_p99_abs = max(
            max_p99_abs,
            float(np.percentile(difference, 99)),
        )
        max_absolute = max(max_absolute, int(difference.max()))
        max_share_over_five = max(
            max_share_over_five,
            float(np.mean(difference > 5)),
        )
        compared += 1
        current_frame += 1
    capture.release()
    thresholds = {
        "maximum_mean_absolute_channel_difference": 1.25,
        "maximum_p99_absolute_channel_difference": 6.0,
        "maximum_absolute_channel_difference": 20,
        "maximum_share_of_channels_over_five": 0.05,
    }
    passed = (
        max_mean_abs
        <= thresholds["maximum_mean_absolute_channel_difference"]
        and max_p99_abs
        <= thresholds["maximum_p99_absolute_channel_difference"]
        and max_absolute <= thresholds["maximum_absolute_channel_difference"]
        and max_share_over_five
        <= thresholds["maximum_share_of_channels_over_five"]
    )
    return {
        "path": str(path.relative_to(ROOT)),
        "anchor_frame_zero_based": anchor_frame,
        "end_frame_exclusive": end_frame_exclusive,
        "tail_frames_compared_to_anchor": compared,
        "observed_maximum_mean_absolute_channel_difference": max_mean_abs,
        "observed_maximum_p99_absolute_channel_difference": max_p99_abs,
        "observed_maximum_absolute_channel_difference": max_absolute,
        "observed_maximum_share_of_channels_over_five": max_share_over_five,
        "thresholds": thresholds,
        "material_picture_change_observed": not passed,
        "passed": passed,
    }


def read_cv_frame(path: Path, frame_index: int) -> np.ndarray:
    capture = cv2.VideoCapture(str(path))
    if not capture.isOpened():
        raise RuntimeError(f"OpenCV could not decode {path}")
    capture.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
    ok, frame = capture.read()
    capture.release()
    if not ok:
        raise RuntimeError(f"Could not decode frame {frame_index} from {path}")
    return frame


def frame_pixel_comparison(
    observed: np.ndarray,
    expected: np.ndarray,
) -> dict[str, Any]:
    if observed.shape != expected.shape:
        return {
            "passed": False,
            "shape_matches": False,
            "observed_shape": list(observed.shape),
            "expected_shape": list(expected.shape),
        }
    difference = np.abs(
        observed.astype(np.int16) - expected.astype(np.int16)
    )
    observed_sha = hashlib.sha256(observed.tobytes()).hexdigest()
    expected_sha = hashlib.sha256(expected.tobytes()).hexdigest()
    maximum_mean_absolute_difference = 0.25
    maximum_p99_absolute_difference = 1.0
    mean_abs = float(difference.mean())
    p99_abs = float(np.percentile(difference, 99))
    exact = bool(np.array_equal(observed, expected))
    passed = (
        mean_abs <= maximum_mean_absolute_difference
        and p99_abs <= maximum_p99_absolute_difference
    )
    return {
        "passed": passed,
        "shape_matches": True,
        "exact_bgr_pixel_identity": exact,
        "observed_bgr_sha256": observed_sha,
        "expected_bgr_sha256": expected_sha,
        "mean_absolute_channel_difference": mean_abs,
        "p99_absolute_channel_difference": p99_abs,
        "maximum_absolute_channel_difference": int(difference.max()),
        "thresholds": {
            "maximum_mean_absolute_channel_difference": (
                maximum_mean_absolute_difference
            ),
            "maximum_p99_absolute_channel_difference": (
                maximum_p99_absolute_difference
            ),
        },
    }


def assert_hash(path: Path, expected: str, label: str) -> None:
    if not path.exists():
        raise FileNotFoundError(path)
    actual = sha256(path)
    if actual != expected:
        raise RuntimeError(
            f"{label} hash changed: expected {expected}, observed {actual}"
        )


def verify_frozen_tuple(config: dict[str, Any]) -> dict[str, str]:
    observed: dict[str, str] = {}
    for label, item in config["frozen_v3"].items():
        path = resolve(item["path"])
        assert_hash(path, item["sha256"], f"frozen v3 {label}")
        observed[label] = sha256(path)
    for label in ("vtt", "srt"):
        item = config["captions"][label]
        assert_hash(resolve(item["path"]), item["sha256"], label.upper())
        observed[label] = item["sha256"]
    audio = config["audio"]
    assert_hash(resolve(audio["path"]), audio["file_sha256"], "audio file")
    observed["audio_file"] = audio["file_sha256"]
    observed_stream = stream_hash(resolve(audio["path"]), "0:a:0")
    if observed_stream != audio["stream_sha256"]:
        raise RuntimeError(
            "Frozen source audio stream differs from the configured stream hash"
        )
    observed["audio_stream"] = observed_stream
    return observed


def verify_v3_map_sources(v3_map: dict[str, Any]) -> dict[str, int]:
    beats = v3_map.get("beats", [])
    if len(beats) != 58:
        raise RuntimeError(f"Frozen v3 map has {len(beats)} beats, expected 58")
    source_matches = 0
    normalized_matches = 0
    for expected_ordinal, beat in enumerate(beats, start=1):
        expected_id = f"B{expected_ordinal:02d}"
        if beat.get("beat_id") != expected_id:
            raise RuntimeError(
                f"Frozen v3 map order mismatch at {expected_ordinal}: "
                f"{beat.get('beat_id')}"
            )
        source = resolve(beat["source_path"])
        normalized = resolve(beat["normalized_clip"])
        assert_hash(source, beat["source_sha256"], f"{expected_id} source")
        assert_hash(
            normalized,
            beat["normalized_clip_sha256"],
            f"{expected_id} frozen v3 normalized clip",
        )
        for forbidden in (
            "assets/episodes/ep-01/",
            "assets/episodes/ep-02/",
            "assets/episodes/ep-03/",
            "assets/episodes/ep-04/",
        ):
            if beat["source_path"].startswith(forbidden):
                raise RuntimeError(
                    f"{expected_id} enters forbidden episode path: "
                    f"{beat['source_path']}"
                )
        source_matches += 1
        normalized_matches += 1
    return {
        "beat_count": len(beats),
        "source_hash_matches": source_matches,
        "normalized_clip_hash_matches": normalized_matches,
    }


def render_freeze_extended_clip(
    source: Path,
    destination: Path,
    *,
    source_frames: int,
    append_frames: int,
    target_frames: int,
    video: dict[str, Any],
) -> None:
    fps = int(video["fps"])
    if source_frames + append_frames != target_frames:
        raise RuntimeError(
            f"Invalid freeze repair arithmetic for {destination.name}: "
            f"{source_frames} + {append_frames} != {target_frames}"
        )
    destination.parent.mkdir(parents=True, exist_ok=True)
    video_filter = (
        f"fps={fps},setpts=N/({fps}*TB),"
        f"tpad=stop={append_frames}:stop_mode=clone,"
        f"trim=end_frame={target_frames},setpts=N/({fps}*TB),"
        f"format={video['pixel_format']}"
    )
    run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-i",
            str(source),
            "-vf",
            video_filter,
            "-frames:v",
            str(target_frames),
            "-an",
            "-c:v",
            video["video_codec"],
            "-preset",
            video["preset"],
            "-crf",
            str(video["crf"]),
            "-profile:v",
            "high",
            "-level:v",
            "4.1",
            "-pix_fmt",
            video["pixel_format"],
            "-r",
            str(fps),
            "-video_track_timescale",
            "15360",
            "-movflags",
            "+faststart",
            str(destination),
        ]
    )


def write_manifest(path: Path, clips: list[Path]) -> None:
    lines = ["ffconcat version 1.0"]
    lines.extend(f"file '{clip.as_posix()}'" for clip in clips)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_contact_sheets(
    master: Path,
    beats: list[dict[str, Any]],
    work: Path,
    output_dir: Path,
) -> list[dict[str, Any]]:
    midpoint_dir = work / "midpoint-frames-final-v2"
    midpoint_dir.mkdir(parents=True, exist_ok=True)
    output_dir.mkdir(parents=True, exist_ok=True)
    midpoint_frames = [
        int(beat["frame_start"])
        + (int(beat["frame_count"]) - 1) // 2
        for beat in beats
    ]
    midpoint_paths: list[Path] = []
    for ordinal, frame_index in enumerate(midpoint_frames, start=1):
        frame = read_cv_frame(master, frame_index)
        destination = midpoint_dir / f"beat-midpoint-{ordinal:03d}.png"
        if not cv2.imwrite(str(destination), frame):
            raise RuntimeError(f"Could not write midpoint frame {destination}")
        midpoint_paths.append(destination)
    if len(midpoint_paths) != 58:
        raise RuntimeError(
            f"Contact-sheet extraction produced {len(midpoint_paths)} frames"
        )

    sheets: list[dict[str, Any]] = []
    for group_index, start in enumerate(range(1, 59, 9), start=1):
        end = min(start + 8, 58)
        sheet = (
            output_dir
            / f"trailer-v4-beats-{start:02d}-{end:02d}-midpoints.png"
        )
        canvas = np.zeros((1080, 1920, 3), dtype=np.uint8)
        for position, ordinal in enumerate(range(start, end + 1)):
            image = cv2.imread(str(midpoint_paths[ordinal - 1]))
            if image is None:
                raise RuntimeError(
                    f"Could not read midpoint B{ordinal:02d}"
                )
            tile = cv2.resize(
                image,
                (640, 360),
                interpolation=cv2.INTER_AREA,
            )
            row, column = divmod(position, 3)
            canvas[
                row * 360 : (row + 1) * 360,
                column * 640 : (column + 1) * 640,
            ] = tile
        if not cv2.imwrite(str(sheet), canvas):
            raise RuntimeError(f"Could not write contact sheet {sheet}")
        sheets.append(
            {
                "group": group_index,
                "beats": f"B{start:02d}-B{end:02d}",
                "path": str(sheet.relative_to(ROOT)),
                "sha256": sha256(sheet),
            }
        )
    return sheets


def run_motion_tools(
    config: dict[str, Any],
    motion_clips: list[Path],
) -> dict[str, Any]:
    hard_cut_path = resolve(config["output"]["hard_cut_report"])
    motion_path = resolve(config["output"]["motion_report"])
    hard_cut_result = run(
        [
            sys.executable,
            str(CHECK_HARD_CUTS),
            *[str(path) for path in motion_clips],
        ],
        capture=True,
    )
    if "All clips clean." not in hard_cut_result.stdout:
        raise RuntimeError("check-hard-cuts.py did not report all clips clean")
    hard_cut_document = {
        "schema": "laidies.trailer.v4.hard-cut-results",
        "generated_at_utc": now_utc(),
        "tool": str(CHECK_HARD_CUTS.relative_to(ROOT)),
        "tool_sha256": sha256(CHECK_HARD_CUTS),
        "all_clips_clean": True,
        "clip_count": len(motion_clips),
        "clips": [
            {
                "path": str(path.relative_to(ROOT)),
                "sha256": sha256(path),
            }
            for path in motion_clips
        ],
        "literal_tool_output": hard_cut_result.stdout,
    }
    hard_cut_path.write_text(
        json.dumps(hard_cut_document, indent=2) + "\n",
        encoding="utf-8",
    )

    measure_result = run(
        [
            sys.executable,
            str(MEASURE_MOTION),
            "clips",
            *[str(path) for path in motion_clips],
            "--seconds",
            "29",
            "--json",
            str(motion_path),
        ],
        capture=True,
    )
    measurements = json.loads(motion_path.read_text(encoding="utf-8"))
    for clip_name, result in measurements["results"].items():
        if not result or result.get("verdict") != "moving":
            raise RuntimeError(
                f"measure-motion.py did not classify {clip_name} as moving"
            )
    return {
        "hard_cuts": {
            "passed": True,
            "path": str(hard_cut_path.relative_to(ROOT)),
            "sha256": sha256(hard_cut_path),
            "literal_tool_output": hard_cut_result.stdout,
        },
        "motion": {
            "passed": True,
            "path": str(motion_path.relative_to(ROOT)),
            "sha256": sha256(motion_path),
            "results": measurements["results"],
            "literal_tool_output": measure_result.stdout,
            "semantic_judgment": "UNJUDGED",
        },
    }


def evaluate_cut_clock(
    master_path: Path,
    beats: list[dict[str, Any]],
    clip_frame_counts: dict[str, int] | None = None,
) -> dict[str, Any]:
    cut_results: list[dict[str, Any]] = []
    clip_end_frames = {
        beat["beat_id"]: (
            int(clip_frame_counts[beat["beat_id"]]) - 1
            if clip_frame_counts is not None
            else int(beat["frame_count"]) - 1
        )
        for beat in beats
    }
    clip_first_pixels = {
        beat["beat_id"]: read_cv_frame(resolve(beat["normalized_clip"]), 0)
        for beat in beats
    }
    clip_last_pixels = {
        beat["beat_id"]: read_cv_frame(
            resolve(beat["normalized_clip"]),
            clip_end_frames[beat["beat_id"]],
        )
        for beat in beats
    }
    for index in range(1, len(beats)):
        current = beats[index]
        previous = beats[index - 1]
        onset = int(current["frame_start"])
        master_before = read_cv_frame(master_path, onset - 1)
        master_onset = read_cv_frame(master_path, onset)
        before_comparison = frame_pixel_comparison(
            master_before,
            clip_last_pixels[previous["beat_id"]],
        )
        onset_comparison = frame_pixel_comparison(
            master_onset,
            clip_first_pixels[current["beat_id"]],
        )
        cut_results.append(
            {
                "cut": index,
                "from": previous["beat_id"],
                "to": current["beat_id"],
                "expected_onset_frame": onset,
                "expected_onset_seconds": onset / 30,
                "frame_before_vs_previous_clip_last": before_comparison,
                "onset_frame_vs_current_clip_first": onset_comparison,
                "passed": (
                    bool(before_comparison["passed"])
                    and bool(onset_comparison["passed"])
                ),
            }
        )
    return {
        "expected_cut_count": 57,
        "observed_cut_assertion_count": len(cut_results),
        "passed_count": sum(bool(item["passed"]) for item in cut_results),
        "failed_count": sum(not bool(item["passed"]) for item in cut_results),
        "all_passed": all(bool(item["passed"]) for item in cut_results),
        "cuts": cut_results,
    }


def main() -> int:
    if not FFMPEG.exists():
        raise FileNotFoundError(FFMPEG)
    for required in (CONFIG_PATH, CHECK_HARD_CUTS, MEASURE_MOTION):
        if not required.exists():
            raise FileNotFoundError(required)

    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    frozen_hashes_before = verify_frozen_tuple(config)
    v3_map_path = resolve(config["frozen_v3"]["map"]["path"])
    v3_map = json.loads(v3_map_path.read_text(encoding="utf-8"))
    v3_source_checks = verify_v3_map_sources(v3_map)

    output = resolve(config["output"]["master"])
    output_map = resolve(config["output"]["map"])
    output_manifest = resolve(config["output"]["manifest"])
    output_qc = resolve(config["output"]["qc"])
    work = resolve(config["output"]["normalized_directory"])
    contact_dir = resolve(config["output"]["contact_sheet_directory"])
    video_only = work / "trailer-v4-clock-video-only.mp4"
    if output_qc.exists():
        raise FileExistsError(
            f"Refusing to overwrite completed v4 QC tuple: {output_qc}"
        )
    resuming_failed_v4_attempt = any(
        path.exists() for path in (output, output_map, output_manifest)
    )
    if resuming_failed_v4_attempt:
        print(
            "Resuming after fail-closed v4 attempt; replacing only incomplete "
            "v4 target/map/manifest bytes. Frozen v3 remains immutable.",
            flush=True,
        )
    output.parent.mkdir(parents=True, exist_ok=True)
    work.mkdir(parents=True, exist_ok=True)

    fps = int(config["video"]["fps"])
    beats = copy.deepcopy(v3_map["beats"])
    normalized_clips: list[Path] = []
    motion_clips: list[Path] = []
    frozen_v3_clip_counts: dict[str, int] = {}
    v4_clip_counts: dict[str, int] = {}
    clip_frame_observations: list[dict[str, Any]] = []
    freeze_observations: dict[str, dict[str, Any]] = {}

    for beat in beats:
        beat_id = beat["beat_id"]
        frozen_clip = resolve(beat["normalized_clip"])
        frozen_frames = decoded_frame_count(frozen_clip)
        frozen_v3_clip_counts[beat_id] = frozen_frames
        expected_frames = int(beat["frame_count"])
        repair = config["motion_repairs"].get(beat_id)
        if repair:
            if frozen_frames != int(repair["frozen_v3_observed_frames"]):
                raise RuntimeError(
                    f"{beat_id} frozen v3 frame count changed: "
                    f"{frozen_frames}"
                )
            if expected_frames != int(repair["target_frames"]):
                raise RuntimeError(f"{beat_id} mapped target frame count changed")
            destination = work / f"{beat_id.lower()}-normalized-v4-clock.mp4"
            render_freeze_extended_clip(
                frozen_clip,
                destination,
                source_frames=frozen_frames,
                append_frames=int(repair["append_final_frame_count"]),
                target_frames=expected_frames,
                video=config["video"],
            )
            destination_frames = decoded_frame_count(destination)
            if destination_frames != expected_frames:
                raise RuntimeError(
                    f"{beat_id} v4 decodes to {destination_frames} frames; "
                    f"expected {expected_frames}"
                )
            anchor_index = frozen_frames - 1
            anchor_frame = read_cv_frame(destination, anchor_index)
            last_frame = read_cv_frame(destination, expected_frames - 1)
            strict_pixel_identity = bool(
                np.array_equal(anchor_frame, last_frame)
            )
            freeze_metrics = observed_freeze_metrics(
                destination,
                anchor_frame=anchor_index,
                end_frame_exclusive=expected_frames,
            )
            if not freeze_metrics["passed"]:
                raise RuntimeError(
                    f"{beat_id} observed appended tail contains material "
                    "picture change"
                )
            beat["normalized_clip"] = str(destination.relative_to(ROOT))
            beat["normalized_clip_sha256"] = sha256(destination)
            beat["render_policy"] = (
                "v4-observed-final-frame-append-to-exact-map-clock-20260726"
            )
            beat["evidence"]["motion"]["render"] = {
                "action": "append_observed_own_final_frame_to_exact_target",
                "input_frozen_v3_normalized_clip": str(
                    frozen_clip.relative_to(ROOT)
                ),
                "input_frozen_v3_normalized_sha256": sha256(frozen_clip),
                "input_observed_frames": frozen_frames,
                "target_frames": expected_frames,
                "appended_final_frame_count": int(
                    repair["append_final_frame_count"]
                ),
                "observed_freeze_frame_count_including_anchor": (
                    expected_frames - anchor_index
                ),
                "observed_freeze_anchor_bgr_sha256": bgr_frame_sha256(
                    anchor_frame
                ),
                "observed_freeze_last_bgr_sha256": bgr_frame_sha256(
                    last_frame
                ),
                "strict_decoded_bgr_pixel_identity": strict_pixel_identity,
                "observed_decoded_pixel_freeze_gate": freeze_metrics,
                "v3_declared_freeze_seconds": repair[
                    "v3_declared_freeze_seconds"
                ],
                "actual_appended_duration_seconds": (
                    int(repair["append_final_frame_count"]) / fps
                ),
            }
            beat["evidence"]["motion"][
                "maker_status"
            ] = "mechanically_observed_unjudged"
            normalized_clips.append(destination)
            motion_clips.append(destination)
            v4_clip_counts[beat_id] = destination_frames
            freeze_observations[beat_id] = {
                "input_observed_frames": frozen_frames,
                "target_frames": expected_frames,
                "appended_frames": int(repair["append_final_frame_count"]),
                "anchor_frame_index_zero_based": anchor_index,
                "anchor_bgr_sha256": bgr_frame_sha256(anchor_frame),
                "last_freeze_bgr_sha256": bgr_frame_sha256(last_frame),
                "strict_decoded_bgr_pixel_identity": strict_pixel_identity,
                "observed_decoded_pixel_freeze_gate": freeze_metrics,
                "normalized_clip": str(destination.relative_to(ROOT)),
                "normalized_clip_sha256": sha256(destination),
            }
        else:
            if frozen_frames != expected_frames:
                raise RuntimeError(
                    f"{beat_id} frozen static clip decodes to "
                    f"{frozen_frames} frames; expected {expected_frames}"
                )
            normalized_clips.append(frozen_clip)
            v4_clip_counts[beat_id] = frozen_frames
            beat["render_policy"] = "v4-reuse-frozen-v3-static-byte"
        beat["clock_successor"] = {
            "frozen_v3_normalized_clip": str(frozen_clip.relative_to(ROOT)),
            "frozen_v3_normalized_sha256": sha256(frozen_clip),
            "frozen_v3_decoded_frames": frozen_frames,
            "v4_normalized_clip": beat["normalized_clip"],
            "v4_normalized_sha256": beat["normalized_clip_sha256"],
            "v4_decoded_frames": v4_clip_counts[beat_id],
            "mapped_target_frames": expected_frames,
            "exact_frame_count_passed": (
                v4_clip_counts[beat_id] == expected_frames
            ),
            "art_copy_identity_outfit_scene_changed": False,
        }
        clip_frame_observations.append(
            {
                "beat_id": beat_id,
                "path": beat["normalized_clip"],
                "sha256": beat["normalized_clip_sha256"],
                "decoded_frames": v4_clip_counts[beat_id],
                "mapped_frames": expected_frames,
                "passed": v4_clip_counts[beat_id] == expected_frames,
            }
        )
        print(
            f"{beat_id}: observed {v4_clip_counts[beat_id]}/"
            f"{expected_frames} frames",
            flush=True,
        )

    mapped_total_frames = sum(int(beat["frame_count"]) for beat in beats)
    if mapped_total_frames != int(config["video"]["expected_total_frames"]):
        raise RuntimeError(
            f"Mapped total changed: {mapped_total_frames} frames"
        )
    for index, beat in enumerate(beats):
        expected_start = sum(
            int(previous["frame_count"]) for previous in beats[:index]
        )
        if int(beat["frame_start"]) != expected_start:
            raise RuntimeError(
                f"{beat['beat_id']} mapped frame start is not contiguous"
            )

    map_document = {
        "schema": "laidies.trailer.v4.exact-58-beat-clock-map",
        "generated_at_utc": now_utc(),
        "status": "maker-built-review-only-unjudged",
        "repair_scope": config["repair_scope"],
        "config": str(CONFIG_PATH.relative_to(ROOT)),
        "config_sha256": sha256(CONFIG_PATH),
        "frozen_v3_map": str(v3_map_path.relative_to(ROOT)),
        "frozen_v3_map_sha256": sha256(v3_map_path),
        "public_legacy_32_cue_map_modified": False,
        "audio": config["audio"],
        "captions": config["captions"],
        "fps": fps,
        "beat_count": len(beats),
        "cut_count": len(beats) - 1,
        "mapped_total_frames": mapped_total_frames,
        "mapped_picture_end_seconds": mapped_total_frames / fps,
        "motion_repairs": config["motion_repairs"],
        "beats": beats,
    }
    output_map.write_text(
        json.dumps(map_document, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    write_manifest(output_manifest, normalized_clips)

    run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-f",
            "concat",
            "-safe",
            "0",
            "-i",
            str(output_manifest),
            "-map",
            "0:v:0",
            "-c:v",
            "copy",
            "-movflags",
            "+faststart",
            str(video_only),
        ]
    )
    audio = resolve(config["audio"]["path"])
    run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-i",
            str(video_only),
            "-i",
            str(audio),
            "-map",
            "0:v:0",
            "-map",
            "1:a:0",
            "-c:v",
            "copy",
            "-c:a",
            "copy",
            "-movflags",
            "+faststart",
            str(output),
        ]
    )
    run(
        [
            str(FFMPEG),
            "-v",
            "error",
            "-i",
            str(output),
            "-map",
            "0:v:0",
            "-map",
            "0:a:0",
            "-f",
            "null",
            "-",
        ]
    )

    output_audio_stream_sha = stream_hash(output, "0:a:0")
    if output_audio_stream_sha != config["audio"]["stream_sha256"]:
        raise RuntimeError("v4 output audio stream is not the frozen exact stream")
    master_frames = decoded_frame_count(output)
    if master_frames != mapped_total_frames:
        raise RuntimeError(
            f"v4 master decodes to {master_frames} frames; "
            f"expected {mapped_total_frames}"
        )

    v4_cut_clock = evaluate_cut_clock(output, beats)
    if not v4_cut_clock["all_passed"]:
        raise RuntimeError(
            f"v4 has {v4_cut_clock['failed_count']} failed cut-onset assertions"
        )

    master_freeze_observations: dict[str, dict[str, Any]] = {}
    for beat_id, repair in config["motion_repairs"].items():
        beat = next(item for item in beats if item["beat_id"] == beat_id)
        source_frames = int(repair["frozen_v3_observed_frames"])
        master_anchor = int(beat["frame_start"]) + source_frames - 1
        master_end = int(beat["frame_end_exclusive"])
        master_anchor_frame = read_cv_frame(output, master_anchor)
        master_last_frame = read_cv_frame(output, master_end - 1)
        strict_pixel_identity = bool(
            np.array_equal(master_anchor_frame, master_last_frame)
        )
        master_freeze_metrics = observed_freeze_metrics(
            output,
            anchor_frame=master_anchor,
            end_frame_exclusive=master_end,
        )
        if not master_freeze_metrics["passed"]:
            raise RuntimeError(
                f"{beat_id} observed master tail contains material picture change"
            )
        master_freeze_observations[beat_id] = {
            "master_anchor_frame_zero_based": master_anchor,
            "master_end_exclusive": master_end,
            "observed_anchor_and_freeze_frame_count": (
                master_end - master_anchor
            ),
            "anchor_bgr_sha256": bgr_frame_sha256(master_anchor_frame),
            "last_freeze_bgr_sha256": bgr_frame_sha256(master_last_frame),
            "strict_decoded_bgr_pixel_identity": strict_pixel_identity,
            "observed_decoded_pixel_freeze_gate": master_freeze_metrics,
        }

    v3_master = resolve(config["frozen_v3"]["master"]["path"])
    v3_master_frames = decoded_frame_count(v3_master)
    v3_adversarial_cut_clock = evaluate_cut_clock(
        v3_master,
        v3_map["beats"],
        {
            beat_id: frame_count
            for beat_id, frame_count in frozen_v3_clip_counts.items()
        },
    )
    v3_frame_deficit = mapped_total_frames - v3_master_frames
    adversarial_failed_as_required = (
        v3_master_frames != mapped_total_frames
        and not v3_adversarial_cut_clock["all_passed"]
        and v3_frame_deficit == 213
    )
    if not adversarial_failed_as_required:
        raise RuntimeError(
            "Adversarial v3 clock test did not catch the frozen 7.10-second drift"
        )

    audio_duration = media_duration(audio)
    picture_end = master_frames / fps
    caption_end = float(
        config["captions"]["last_spoken_or_sung_end_seconds"]
    )
    video_audio_delta = picture_end - audio_duration
    end_alignment = {
        "picture_end_seconds_from_decoded_frames": picture_end,
        "audio_container_end_seconds": audio_duration,
        "picture_minus_audio_seconds": video_audio_delta,
        "picture_minus_audio_frames": video_audio_delta * fps,
        "video_audio_within_one_frame": (
            abs(video_audio_delta)
            <= int(config["rules"]["video_audio_end_tolerance_frames"]) / fps
        ),
        "caption_last_spoken_or_sung_end_seconds": caption_end,
        "picture_covers_caption_end": picture_end >= caption_end,
        "picture_tail_after_last_caption_seconds": picture_end - caption_end,
        "b58_start_frame": int(beats[-1]["frame_start"]),
        "b58_end_frame_exclusive": int(beats[-1]["frame_end_exclusive"]),
        "b58_decoded_tail_frames": master_frames
        - int(beats[-1]["frame_start"]),
    }
    if not (
        end_alignment["video_audio_within_one_frame"]
        and end_alignment["picture_covers_caption_end"]
        and end_alignment["b58_decoded_tail_frames"]
        == int(beats[-1]["frame_count"])
    ):
        raise RuntimeError("v4 picture/audio/caption/B58 end alignment failed")

    contact_sheets = build_contact_sheets(
        output,
        beats,
        work,
        contact_dir,
    )
    motion_tool_results = run_motion_tools(config, motion_clips)
    frozen_hashes_after = verify_frozen_tuple(config)
    if frozen_hashes_after != frozen_hashes_before:
        raise RuntimeError("A frozen v3/audio/caption artifact changed during build")

    vtt_text = resolve(config["captions"]["vtt"]["path"]).read_text(
        encoding="utf-8"
    )
    srt_text = resolve(config["captions"]["srt"]["path"]).read_text(
        encoding="utf-8"
    )
    vtt_cues = len(re.findall(r"-->", vtt_text))
    srt_cues = len(re.findall(r"-->", srt_text))
    if (
        vtt_cues != int(config["captions"]["cue_count"])
        or srt_cues != int(config["captions"]["cue_count"])
    ):
        raise RuntimeError("Frozen caption cue count changed")

    qc = {
        "schema": "laidies.trailer.v4.clock-successor-maker-qc",
        "generated_at_utc": now_utc(),
        "status": "verified-locally-mechanical-maker-evidence-unjudged",
        "maker_cannot_judge_or_admit": True,
        "resumed_after_fail_closed_attempt": resuming_failed_v4_attempt,
        "output": {
            "path": str(output.relative_to(ROOT)),
            "sha256": sha256(output),
            "size_bytes": output.stat().st_size,
            "full_decode_passed": True,
            "decoded_frames": master_frames,
            "expected_frames": mapped_total_frames,
            "fps": fps,
            "picture_end_seconds": picture_end,
        },
        "frozen_tuple": {
            "hashes_before": frozen_hashes_before,
            "hashes_after": frozen_hashes_after,
            "unchanged": frozen_hashes_before == frozen_hashes_after,
            "source_and_normalized_clip_checks": v3_source_checks,
        },
        "config": {
            "path": str(CONFIG_PATH.relative_to(ROOT)),
            "sha256": sha256(CONFIG_PATH),
        },
        "map": {
            "path": str(output_map.relative_to(ROOT)),
            "sha256": sha256(output_map),
            "beat_count": len(beats),
            "cut_count": len(beats) - 1,
        },
        "manifest": {
            "path": str(output_manifest.relative_to(ROOT)),
            "sha256": sha256(output_manifest),
            "clip_count": len(normalized_clips),
        },
        "audio": {
            "source_path": config["audio"]["path"],
            "source_file_sha256": config["audio"]["file_sha256"],
            "source_stream_sha256": config["audio"]["stream_sha256"],
            "output_stream_sha256": output_audio_stream_sha,
            "stream_copy_exact": (
                output_audio_stream_sha == config["audio"]["stream_sha256"]
            ),
            "narration_changed": False,
        },
        "captions": {
            "vtt": config["captions"]["vtt"],
            "srt": config["captions"]["srt"],
            "vtt_cue_count": vtt_cues,
            "srt_cue_count": srt_cues,
            "bytes_changed": False,
            "burned_into_picture": False,
        },
        "normalized_clip_decode_counts": {
            "checked": len(clip_frame_observations),
            "passed": sum(
                bool(item["passed"]) for item in clip_frame_observations
            ),
            "all_passed": all(
                bool(item["passed"]) for item in clip_frame_observations
            ),
            "clips": clip_frame_observations,
        },
        "freeze_identity_from_observed_output": {
            "normalized_clips": freeze_observations,
            "assembled_master": master_freeze_observations,
            "all_passed": True,
        },
        "cut_onsets_from_observed_output": v4_cut_clock,
        "end_alignment": end_alignment,
        "adversarial_v3_clock_test": {
            "candidate": str(v3_master.relative_to(ROOT)),
            "candidate_sha256": sha256(v3_master),
            "expected_frames": mapped_total_frames,
            "observed_frames": v3_master_frames,
            "observed_frame_deficit": v3_frame_deficit,
            "observed_drift_seconds": v3_frame_deficit / fps,
            "cut_assertions": v3_adversarial_cut_clock,
            "failed_as_required": adversarial_failed_as_required,
        },
        "contact_sheets": {
            "midpoint_frame_count": 58,
            "sheet_count": len(contact_sheets),
            "sheets": contact_sheets,
            "human_visual_judgment": "UNJUDGED",
        },
        "hard_cut_tool": motion_tool_results["hard_cuts"],
        "motion_tool": motion_tool_results["motion"],
        "scope": {
            "new_art_copy_identity_outfit_location_or_scene": False,
            "source_image_or_source_motion_bytes_changed": False,
            "episode_01_04_paths_written": False,
            "site_route_deploy_publication_or_public_media_changed": False,
            "release_integration_performed": False,
        },
        "mechanical_acceptance_checks_passed": True,
        "remaining_independent_proof": [
            "Episode Media Quality delivery-size 58-beat visual and clock review.",
            "Complete normal-speed human audiovisual and actual-player witness.",
            "Weekly Episodes/Control Room resolution of the separate heroine-outfit authority conflict.",
        ],
    }
    output_qc.write_text(
        json.dumps(qc, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(qc, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise
