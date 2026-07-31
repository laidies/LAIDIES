#!/usr/bin/env python3
"""Build Episode 01 v26 from protected v25 using admitted still sources only."""

from __future__ import annotations

import hashlib
import json
import math
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = ROOT / "assets/video/episode-01-v26-source-admitted-config.json"
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


def checked_path(binding: dict[str, object], label: str) -> Path:
    path = ROOT / str(binding["path"])
    if not path.is_file():
        raise FileNotFoundError(f"{label} missing: {path}")
    actual = sha256(path)
    if actual != binding["sha256"]:
        raise RuntimeError(f"{label} hash changed: {actual} != {binding['sha256']}")
    return path


def run(command: list[str], capture: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command,
        cwd=ROOT,
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    )


def full_decode(path: Path) -> None:
    run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"])


def adts_hash(path: Path, destination: Path) -> tuple[str, int]:
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(path),
         "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(destination)])
    return sha256(destination), destination.stat().st_size


def selected_frame_hashes(path: Path, frame_indexes: list[int]) -> list[str]:
    expression = "+".join(f"eq(n\\,{index})" for index in frame_indexes)
    result = run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
        "-map", "0:v:0", "-vf", f"select='{expression}'", "-fps_mode", "passthrough",
        "-f", "framemd5", "-",
    ], capture=True)
    hashes: list[str] = []
    for line in result.stdout.splitlines():
        if line.startswith("#") or not line.strip():
            continue
        fields = [field.strip() for field in line.split(",")]
        if len(fields) >= 6:
            hashes.append(fields[-1])
    if len(hashes) != len(frame_indexes):
        raise RuntimeError(
            f"Expected {len(frame_indexes)} selected hashes from {path}, got {len(hashes)}"
        )
    return hashes


def still_frame_hash(path: Path) -> str:
    result = run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-i", str(path),
        "-map", "0:v:0", "-vf", "scale=1920:1080:flags=lanczos,setsar=1,format=yuvj420p",
        "-frames:v", "1", "-f", "framemd5", "-",
    ], capture=True)
    lines = [line for line in result.stdout.splitlines() if line and not line.startswith("#")]
    if len(lines) != 1:
        raise RuntimeError(f"Expected one still hash from {path}")
    return lines[0].split(",")[-1].strip()


def placement_frames(start: float, stop: float, total_frames: int) -> dict[str, int | None]:
    first = math.ceil(start * 30 - 1e-9)
    stop_exclusive = min(total_frames, math.ceil(stop * 30 - 1e-9))
    if stop_exclusive <= first:
        raise RuntimeError(f"Invalid frame window {start}-{stop}")
    length = stop_exclusive - first
    return {
        "first": first,
        "stop_exclusive": stop_exclusive,
        "pre": first - 1 if first else None,
        "insert_a": first + max(1, length // 3),
        "insert_b": first + max(2, (2 * length) // 3),
        "post": stop_exclusive if stop_exclusive < total_frames else None,
    }


def main() -> None:
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    frozen = checked_path(config["frozen_input"], "protected v25")
    captions = checked_path(config["captions"], "external VTT")
    for index, evidence in enumerate(config["source_admission_evidence"]):
        checked_path(evidence, f"admission evidence {index}")

    source_paths: list[Path] = []
    all_placements: list[dict[str, object]] = []
    for source in config["sources"]:
        path = checked_path(source, f"admitted source {source['id']}")
        source_paths.append(path)
        for placement in source["placements"]:
            row = dict(placement)
            row["source_id"] = source["id"]
            row["source_path"] = source["path"]
            row["source_sha256"] = source["sha256"]
            all_placements.append(row)
    all_placements.sort(key=lambda row: int(row["placement"]))
    expected = [14, 25, 29, 30, 34, 38, 43, 45, 48, 50, 57, 61, 70]
    if [int(row["placement"]) for row in all_placements] != expected:
        raise RuntimeError("Replacement placement set no longer matches the admitted list")
    for previous, current in zip(all_placements, all_placements[1:]):
        if float(current["start"]) < float(previous["stop"]):
            raise RuntimeError("Replacement windows overlap")

    output = ROOT / config["output"]["path"]
    evidence_dir = ROOT / config["output"]["review_directory"]
    manifest_path = ROOT / config["output"]["manifest_path"]
    qc_path = ROOT / config["output"]["qc_path"]
    resume_path = os.environ.get("EPISODE01_V26_RESUME_TEMP")
    temp_output = (
        ROOT / resume_path if resume_path
        else output.with_name(output.stem + ".encode-in-progress.mp4")
    )
    evidence_paths = (output, manifest_path, qc_path)
    if not resume_path:
        evidence_paths = (*evidence_paths, temp_output)
    for path in evidence_paths:
        if path.exists():
            raise FileExistsError(f"Refusing to overwrite existing evidence: {path}")
    if resume_path and not temp_output.is_file():
        raise FileNotFoundError(f"Requested resume temporary master missing: {temp_output}")
    output.parent.mkdir(parents=True, exist_ok=True)
    evidence_dir.mkdir(parents=True, exist_ok=True)

    # The first implementation overlaid every looped PNG for the complete
    # 19.5-minute master.  That leaves all decoders live for the full encode
    # and was SIGKILLed twice before a reviewable container could be written.
    # This graph instead concatenates finite, frame-aligned source and still
    # segments.  It has exactly the same admitted windows, but each PNG is
    # decoded only for the frames it supplies.
    if not resume_path:
        command = [
            str(FFMPEG), "-n", "-hide_banner", "-loglevel", "error",
            "-filter_complex_threads", "1", "-i", str(frozen),
        ]
        for path in source_paths:
            command.extend([
                "-loop", "1", "-framerate", "30", "-threads", "1",
                "-thread_queue_size", "1", "-i", str(path),
            ])

    total_frames = int(config["frozen_input"]["decoded_video_frames"])
    source_occurrences: dict[str, list[dict[str, object]]] = {
        str(source["id"]): [] for source in config["sources"]
    }
    for row in all_placements:
        source_occurrences[str(row["source_id"])].append(row)

    if not resume_path:
        filters: list[str] = []
        branch_for_placement: dict[int, str] = {}
        for input_index, source in enumerate(config["sources"], start=1):
            source_id = str(source["id"])
            occurrences = source_occurrences[source_id]
            labels = [f"still{input_index}_{index}" for index in range(len(occurrences))]
            split = f"split={len(labels)}" if len(labels) > 1 else ""
            suffix = f",{split}" if split else ""
            filters.append(
                f"[{input_index}:v]scale=1920:1080:flags=lanczos,setsar=1,"
                f"format=yuvj420p{suffix}" + "".join(f"[{label}]" for label in labels)
            )
            for occurrence, label in zip(occurrences, labels):
                branch_for_placement[int(occurrence["placement"])] = label

        segment_labels: list[str] = []
        previous_stop = 0
        segment_number = 0
        for placement in all_placements:
            frames = placement_frames(
                float(placement["start"]), float(placement["stop"]), total_frames
            )
            first = int(frames["first"])
            stop_exclusive = int(frames["stop_exclusive"])
            if first > previous_stop:
                label = f"segment{segment_number}"
                filters.append(
                    f"[0:v]trim=start_frame={previous_stop}:end_frame={first},"
                    f"setpts=PTS-STARTPTS[{label}]"
                )
                segment_labels.append(label)
                segment_number += 1
            label = f"segment{segment_number}"
            source_label = branch_for_placement[int(placement["placement"])]
            filters.append(
                f"[{source_label}]trim=start_frame=0:end_frame={stop_exclusive - first},"
                f"setpts=PTS-STARTPTS[{label}]"
            )
            segment_labels.append(label)
            segment_number += 1
            previous_stop = stop_exclusive
        if previous_stop < total_frames:
            label = f"segment{segment_number}"
            filters.append(
                f"[0:v]trim=start_frame={previous_stop}:end_frame={total_frames},"
                f"setpts=PTS-STARTPTS[{label}]"
            )
            segment_labels.append(label)
        filters.append(
            "".join(f"[{label}]" for label in segment_labels)
            + f"concat=n={len(segment_labels)}:v=1:a=0,format=yuvj420p[outv]"
        )
        command.extend([
            "-filter_complex", ";".join(filters), "-map", "[outv]", "-map", "0:a:0",
            "-c:v", "libx264", "-preset", "fast", "-threads", "2", "-crf", "0",
            "-pix_fmt", "yuvj420p",
            "-color_range", "pc", "-r", "30", "-frames:v", str(total_frames),
            "-c:a", "copy", "-movflags", "+faststart", str(temp_output),
        ])
        run(command)
    full_decode(temp_output)

    base_adts = evidence_dir / "v25-audio.adts"
    output_adts = evidence_dir / "v26-audio.adts"
    base_audio = adts_hash(frozen, base_adts)
    output_audio = adts_hash(temp_output, output_adts)
    if base_audio != output_audio:
        raise RuntimeError("v26 AAC payload differs from protected v25")

    frame_bindings: list[dict[str, object]] = []
    control_indexes: list[int] = [int(97.0 * 30)]  # accepted v25 welcome-ident interior
    insert_indexes: list[int] = []
    for placement in all_placements:
        frames = placement_frames(
            float(placement["start"]), float(placement["stop"]), total_frames
        )
        for key in ("pre", "post"):
            value = frames[key]
            if value is not None:
                control_indexes.append(int(value))
        insert_indexes.extend([int(frames["insert_a"]), int(frames["insert_b"])])
        frame_bindings.append({**placement, "frames": frames})
    # Adjacent admitted windows share a boundary: the post-control of the
    # earlier placement is the first replacement frame of the next one (and
    # vice versa for its pre-control).  Such a frame is an admitted insertion,
    # not an inherited-v25 control.  Exclude every in-window frame from the
    # exact-baseline control set before comparing it to v25.
    admitted_windows = [
        (int(binding["frames"]["first"]), int(binding["frames"]["stop_exclusive"]))
        for binding in frame_bindings
    ]
    control_indexes = [
        index for index in control_indexes
        if not any(first <= index < stop for first, stop in admitted_windows)
    ]
    control_indexes = sorted(set(control_indexes))
    base_controls = selected_frame_hashes(frozen, control_indexes)
    output_controls = selected_frame_hashes(temp_output, control_indexes)
    if base_controls != output_controls:
        failures = [
            index for index, base_hash, output_hash
            in zip(control_indexes, base_controls, output_controls)
            if base_hash != output_hash
        ]
        raise RuntimeError(f"Exact pre/post/welcome control frames changed: {failures}")

    insert_hashes = selected_frame_hashes(temp_output, insert_indexes)
    expected_hash_by_source = {
        str(source["id"]): still_frame_hash(path)
        for source, path in zip(config["sources"], source_paths)
    }
    for binding, hash_a, hash_b in zip(
        frame_bindings, insert_hashes[::2], insert_hashes[1::2]
    ):
        expected_hash = expected_hash_by_source[str(binding["source_id"])]
        if hash_a != hash_b or hash_a != expected_hash:
            raise RuntimeError(
                f"Still/source frame mismatch at placement {binding['placement']}: "
                f"{hash_a} / {hash_b} / {expected_hash}"
            )
        binding["insert_frame_md5"] = hash_a

    temp_output.replace(output)
    output_binding = {
        "path": str(output.relative_to(ROOT)),
        "sha256": sha256(output),
        "bytes": output.stat().st_size,
        "decoded_video_frames": total_frames,
        "status": "BUILT_LOCALLY_NOT_ADMITTED_NOT_PUBLIC",
    }
    manifest = {
        "schema_version": 1,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "BUILT_LOCALLY_REVIEW_REQUIRED",
        "scope": "Protected-v25 successor replacing exactly 13 admitted still placements",
        "baseline": {"path": str(frozen.relative_to(ROOT)), "sha256": sha256(frozen)},
        "output": output_binding,
        "placements": frame_bindings,
        "unchanged_welcome_ident_control": {
            "frame": int(97.0 * 30),
            "frame_md5": base_controls[control_indexes.index(int(97.0 * 30))],
            "result": "PASS_EXACT_DECODED_FRAME",
        },
        "captions": {"path": str(captions.relative_to(ROOT)), "sha256": sha256(captions),
                     "muxed": False, "burned": False},
        "authority": config["authority"],
    }
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    qc = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "MAKER_QC_COMPLETE_INDEPENDENT_FULL_TITLE_JUDGMENT_REQUIRED",
        "output": output_binding,
        "full_decode": "PASS",
        "audio_payload": {
            "v25_adts_sha256": base_audio[0],
            "v26_adts_sha256": output_audio[0],
            "bytes_each": base_audio[1],
            "result": "PASS_EXACT_AUDIO_PAYLOAD",
        },
        "video_preservation": {
            "codec": "lossless H.264",
            "pre_post_and_welcome_control_frame_count": len(control_indexes),
            "result": "PASS_EXACT_DECODED_FRAME_MD5",
        },
        "still_insertions": {
            "placement_count": len(frame_bindings),
            "two_interior_frames_per_placement": True,
            "match_admitted_source_frame": "PASS_EXACT_DECODED_FRAME_MD5",
            "camera_motion": False,
            "crop": False,
        },
        "manifest": str(manifest_path.relative_to(ROOT)),
        "manifest_sha256": sha256(manifest_path),
        "config": str(CONFIG_PATH.relative_to(ROOT)),
        "config_sha256": sha256(CONFIG_PATH),
        "builder": str(Path(__file__).resolve().relative_to(ROOT)),
        "builder_sha256": sha256(Path(__file__).resolve()),
        "release_status": "HOLD_PENDING_INDEPENDENT_EPISODE_MEDIA_QUALITY",
    }
    qc_path.write_text(json.dumps(qc, indent=2) + "\n", encoding="utf-8")
    print(output)
    print(manifest_path)
    print(qc_path)


if __name__ == "__main__":
    main()
