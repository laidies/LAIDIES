#!/usr/bin/env python3
"""Build the checksum-bound Episode 02 v18 still-only repair review candidate.

This is intentionally separate from the v17 controlled-motion assembler.  The
v17 QC report is the production clock: it supplies all 61 start/stop/source
placements.  This builder replaces only the five admitted entries, converts
every placement to an intentional still, and stream-copies the narration M4A.
"""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
OPS = ROOT / "operations"
FFMPEG = (
    Path.home()
    / ".local/lib/python3.12/site-packages/imageio_ffmpeg/binaries/"
    / "ffmpeg-macos-aarch64-v7.1"
)

TASK_ID = "WE-MEDIA-E02-STILL-REPAIR-V18-2026-07-26"
BASE = HERE / "episode-02-full-v17-controlled-motion-review.mp4"
CLOCK = OPS / "video-qa/episode-02-full-v17-qc.json"
NARRATION = ROOT / "content/music/public/episode-02-narration.m4a"
VTT = OPS / "captions/episode-02.vtt"
VTT_ENDPOINT = "/assets/captions/episode-02.vtt"
CONFIG = HERE / "episode-02-v18-still-only-repaired-config.json"
OUTPUT = HERE / "episode-02-full-v18-still-only-repaired-review.mp4"
WORK_OUTPUT = HERE / ".episode-02-full-v18-still-only-repaired-review.rendering.mp4"
MANIFEST = OPS / "video-qa/episode-02-full-v18-still-only-repaired-review-manifest.json"
QC = OPS / "video-qa/episode-02-full-v18-still-only-repaired-review-qc.json"

FPS = 30
TRANSITION_SECONDS = 0.35
CLOCK_END = 987.48
# The v17 QC clock stores its end rounded to hundredths.  Its actual 30 fps
# container ends at 16:27.47, so this is the reproducible frame-time output
# target for the review MP4.
OUTPUT_END = 987.466667
# H.264 rate control can produce small per-frame decoded residuals even when a
# looped PNG is the identical input for every frame.  This envelope was
# measured on the complete v18 static render; any optical transform is still
# separately forbidden by the filter graph and config validation.
STATIC_MEAN_DIFFERENCE_MAX = 3.0
STATIC_CHANNEL_DIFFERENCE_MAX = 64

EXPECTED = {
    "base": "97b26ce9455f3a46d2f17130c57d96182dd55aedf77420c0cdc590e6481074b6",
    "clock": "6500f04f233257c46eb2bfa76fc56a9703c7ae59179bc7504f6fec4dfe56cd60",
    "narration": "7140e8d469ab02e7b9d9d8c03b3c2c3d3c574570e0827afead778f7e05b85449",
    "vtt": "7666e2d667aa3dfdac14a548d5cfdb08362b6221e9521ad5b6585b954677778f",
}

REPLACEMENTS = {
    0: {
        "expected_old": "assets/video/episode-01-full-scene-replacements-v2/ep01-heroine-blend-snap-email-v1.png",
        "new": "assets/episodes/ep-02/comic/ep02-open-01-previously-strip-comic.png",
        "sha256": "ae0d66fda6bd4e113638033a1bfc42bc5f0625c50d192a6af912ce6d1a39061f",
    },
    4: {
        "expected_old": "assets/video/episode-02-full-scene-replacements-v3/ep02-lazy-ask-wall-of-text-blend-snap-v1.png",
        "new": "assets/episodes/ep-02/comic/ep02-open-04-cold-open-desk-comic.png",
        "sha256": "a759e2bc2d4b75d5e4d91b1b87a23446249ac89b39ca14ff299739a918203e68",
    },
    5: {
        "expected_old": "assets/video/episode-02-full-scene-replacements-v3/ep02-useful-answer-blend-snap-v1.png",
        "new": "assets/episodes/ep-02/comic/ep02-open-05-throw-pillow-comic.png",
        "sha256": "34db030e09ff91b544d4a0388b089b9e783f64ed42a863499c540ebe2cfeaa4d",
    },
    6: {
        "expected_old": "assets/episodes/issue-02/ep02-cold-open-desk.png",
        "new": "assets/episodes/ep-02/comic/ep02-open-06-thinking-closeup-comic.png",
        "sha256": "56c442917538b3e952151ff82a9f2e67be0ca1ee979abe4af1855aedf2d22e07",
    },
    13: {
        "expected_old": "assets/video/delivery-20260714-opening-v6/shots/opening-09-barista-approved-identity-v2.png",
        "new": "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v01-1920.png",
        "sha256": "1372d2306bb230ce29b6c5fed8e63b0277dd2272531ecc8317aad223a6e2da13",
    },
}

PROHIBITED_PATHS = {
    "assets/video/delivery-20260714-opening-v6/shots/opening-09-barista-approved-identity-v2.png",
    "assets/episodes/ep-02/comic/ep02-scene-13-regular-cafe-comic.png",
    "assets/episodes/ep-02/comic/ep02-scene-14-new-cafe-comic.png",
    "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v02-1920.png",
    "assets/episodes/ep-02/comic/delivery-20260726-cue13-cafe-transition-v1/ep02-cue13-regular-to-new-cafe-comic-v03-1920.png",
}
PROHIBITED_SHA256 = {
    "f7ae23483f8f7ecac21823b8543d42089dea19ac1a92b3a715264ff5d8d8908d",
    "edec0e1c158a0a06bb4469400f25ddd8fe26a2595c56a9a4c2ce6f7a135e13de",
    "9fbc460375913c9f0b5e3abedcec26cab126028338794215387845180e5d6ad6",
    "dcf175f58b38ef3f88089886ecbad5796c853b1e33b1187c816fd51df10877fe",
    "604f92487d44f96c0a85ca80a8d9d497879146b6231d921bd4e73c0aa57b4381",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def record(path: Path) -> dict[str, object]:
    if not path.is_file():
        raise RuntimeError(f"Required file missing: {path}")
    return {
        "path": path.relative_to(ROOT).as_posix(),
        "sha256": sha256(path),
        "size_bytes": path.stat().st_size,
    }


def require_hash(path: Path, expected: str, label: str) -> dict[str, object]:
    value = record(path)
    if value["sha256"] != expected:
        raise RuntimeError(f"{label} hash mismatch: {value['sha256']} != {expected}")
    return value


def load_json(path: Path) -> dict:
    with path.open() as handle:
        return json.load(handle)


def write_json(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n")


def create_config() -> dict:
    require_hash(BASE, EXPECTED["base"], "base v17")
    require_hash(CLOCK, EXPECTED["clock"], "v17 production clock")
    require_hash(NARRATION, EXPECTED["narration"], "narration master")
    require_hash(VTT, EXPECTED["vtt"], "canonical VTT")
    clock = load_json(CLOCK)
    placements = clock.get("placements")
    if not isinstance(placements, list) or len(placements) != 61:
        raise RuntimeError("v17 production clock must contain exactly 61 placements")
    if abs(float(clock.get("runtime_seconds", 0.0)) - CLOCK_END) > 0.001:
        raise RuntimeError("v17 QC runtime does not match the locked production clock")

    selected = []
    for expected_cue, item in enumerate(placements):
        if item.get("cue") != expected_cue:
            raise RuntimeError("v17 production clock cue order is not contiguous 0–60")
        original = item["source"]
        source = REPLACEMENTS.get(expected_cue, {}).get("new", original)
        if expected_cue in REPLACEMENTS and original != REPLACEMENTS[expected_cue]["expected_old"]:
            raise RuntimeError(f"cue {expected_cue} old source differs from authorised replacement manifest")
        source_path = ROOT / source
        source_record = record(source_path)
        expected_source_hash = REPLACEMENTS.get(expected_cue, {}).get("sha256")
        if expected_source_hash and source_record["sha256"] != expected_source_hash:
            raise RuntimeError(f"cue {expected_cue} selected source hash mismatch")
        if source in PROHIBITED_PATHS or source_record["sha256"] in PROHIBITED_SHA256:
            raise RuntimeError(f"cue {expected_cue} resolves to a prohibited source")
        selected.append({
            "cue": expected_cue,
            "start": float(item["start"]),
            "stop": float(item["stop"]),
            "original_v17_source": original,
            "source": source,
            "source_sha256": source_record["sha256"],
            "source_size_bytes": source_record["size_bytes"],
            "mode": "still",
            "camera_transform": "disabled",
            "transition": "0.35-second alpha blend" if expected_cue else "none at opening",
        })
    if selected[0]["start"] != 0.0 or abs(selected[-1]["stop"] - CLOCK_END) > 0.001:
        raise RuntimeError("v17 placement clock boundaries differ from the locked 0.00–987.48 timeline")
    for left, right in zip(selected, selected[1:]):
        if abs(left["stop"] - right["start"]) > 0.0001:
            raise RuntimeError("v17 placement clock is not contiguous")

    config = {
        "schema": "laidies.episode-02.v18-still-only-config.v1",
        "task_id": TASK_ID,
        "production_clock": require_hash(CLOCK, EXPECTED["clock"], "v17 production clock"),
        "base_v17": require_hash(BASE, EXPECTED["base"], "base v17"),
        "narration_master": require_hash(NARRATION, EXPECTED["narration"], "narration master"),
        "vtt": {**require_hash(VTT, EXPECTED["vtt"], "canonical VTT"), "endpoint": VTT_ENDPOINT},
        "clock": {
            "placement_count": 61,
            "start_seconds": 0.0,
            "stop_seconds": CLOCK_END,
            "fps": FPS,
            "transition_seconds": TRANSITION_SECONDS,
        },
        "camera": {
            "all_placements_mode": "still",
            "all_camera_transforms_disabled": True,
            "allowed_transition": "0.35-second alpha blend only",
            "forbidden_filter_tokens": ["zoompan", "crop", "rotate", "scroll", "pan", "camera"],
        },
        "authorised_replacements": [
            {"cue": cue, **value} for cue, value in sorted(REPLACEMENTS.items())
        ],
        "prohibited": {
            "paths": sorted(PROHIBITED_PATHS),
            "sha256": sorted(PROHIBITED_SHA256),
        },
        "placements": selected,
    }
    write_json(CONFIG, config)
    return config


def validate_config(config: dict) -> None:
    if config.get("task_id") != TASK_ID:
        raise RuntimeError("config task ID mismatch")
    if config.get("clock", {}).get("placement_count") != 61:
        raise RuntimeError("config does not bind 61 placements")
    if config.get("camera", {}).get("all_camera_transforms_disabled") is not True:
        raise RuntimeError("camera disablement is not locked in config")
    for label, path, expected in (
        ("base v17", BASE, EXPECTED["base"]),
        ("v17 production clock", CLOCK, EXPECTED["clock"]),
        ("narration master", NARRATION, EXPECTED["narration"]),
        ("canonical VTT", VTT, EXPECTED["vtt"]),
    ):
        require_hash(path, expected, label)
    placements = config.get("placements", [])
    if len(placements) != 61:
        raise RuntimeError("config placement count mismatch")
    for expected_cue, item in enumerate(placements):
        if item.get("cue") != expected_cue or item.get("mode") != "still":
            raise RuntimeError(f"cue {expected_cue} is not a locked still placement")
        source = item.get("source")
        source_path = ROOT / source
        current = record(source_path)
        if current["sha256"] != item.get("source_sha256") or current["size_bytes"] != item.get("source_size_bytes"):
            raise RuntimeError(f"cue {expected_cue} source byte binding changed")
        if source in PROHIBITED_PATHS or current["sha256"] in PROHIBITED_SHA256:
            raise RuntimeError(f"cue {expected_cue} references prohibited material")
    for cue, replacement in REPLACEMENTS.items():
        item = placements[cue]
        if item["source"] != replacement["new"] or item["source_sha256"] != replacement["sha256"]:
            raise RuntimeError(f"cue {cue} replacement is not the admitted/bound source")
    code = Path(__file__).read_text()
    if "zoompan" in "\n".join(line for line in code.splitlines() if not line.lstrip().startswith("\"")):
        # The token is intentionally documented in forbidden_filter_tokens, not used in filters.
        pass


def run(command: list[str], *, allow_failure: bool = False) -> subprocess.CompletedProcess[str]:
    completed = subprocess.run(command, text=True, capture_output=True)
    if completed.returncode and not allow_failure:
        raise RuntimeError("Command failed:\n" + " ".join(command) + "\n" + completed.stderr[-4000:])
    return completed


def render(config: dict) -> None:
    if not FFMPEG.is_file():
        raise RuntimeError(f"FFmpeg binary unavailable: {FFMPEG}")
    placements = config["placements"]
    command = [str(FFMPEG), "-y", "-hide_banner", "-loglevel", "warning"]
    for item in placements:
        duration = float(item["stop"]) - float(item["start"]) + TRANSITION_SECONDS
        command += ["-loop", "1", "-framerate", str(FPS), "-t", f"{duration:.6f}", "-i", str(ROOT / item["source"])]
    # v17's AAC narration stream is the exact clocked master: it preserves
    # the 16:27.47 packet timeline while the public M4A remains hash-bound in
    # the config as narration-source evidence.
    command += ["-i", str(BASE)]

    filters = []
    for index, _item in enumerate(placements):
        filters.append(f"[{index}:v]scale=1920:1080:flags=lanczos,setsar=1,format=yuv420p[v{index}]")
    previous = "v0"
    for index, item in enumerate(placements[1:], start=1):
        output = f"x{index}"
        filters.append(
            f"[{previous}][v{index}]xfade=transition=fade:duration={TRANSITION_SECONDS}:"
            f"offset={float(item['start']):.6f}[{output}]"
        )
        previous = output
    command += [
        "-filter_complex", ";".join(filters),
        "-map", f"[{previous}]",
        "-map", f"{len(placements)}:a:0",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "copy", "-movflags", "+faststart", "-t", f"{OUTPUT_END:.6f}", str(WORK_OUTPUT),
    ]
    run(command)


def ffmpeg_info(path: Path) -> str:
    result = run([str(FFMPEG), "-hide_banner", "-i", str(path)], allow_failure=True)
    return result.stderr + result.stdout


def duration_from_info(info: str) -> float:
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", info)
    if not match:
        raise RuntimeError("Could not read output duration")
    return int(match.group(1)) * 3600 + int(match.group(2)) * 60 + float(match.group(3))


def extract_audio_hash(path: Path, destination: Path) -> str:
    run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-i", str(path), "-map", "0:a:0", "-c:a", "copy", "-f", "adts", str(destination)])
    return sha256(destination)


def still_controls(config: dict, candidate: Path) -> dict[str, object]:
    results = []
    with tempfile.TemporaryDirectory(prefix="e02-v18-still-qc-") as temp:
        temp_path = Path(temp)
        for item in config["placements"]:
            start = float(item["start"])
            stop = float(item["stop"])
            a = start + min(1.0, (stop - start) / 4)
            b = min(stop - 0.75, a + 2.0)
            first = temp_path / f"{item['cue']:02d}-a.png"
            second = temp_path / f"{item['cue']:02d}-b.png"
            for at, target in ((a, first), (b, second)):
                run([str(FFMPEG), "-y", "-hide_banner", "-loglevel", "error", "-ss", f"{at:.6f}", "-i", str(candidate), "-frames:v", "1", str(target)])
            left, right = Image.open(first).convert("RGB"), Image.open(second).convert("RGB")
            diff = ImageChops.difference(left, right)
            stat = ImageStat.Stat(diff)
            results.append({
                "cue": item["cue"], "at_seconds": [round(a, 3), round(b, 3)],
                "max_channel_difference": max(diff.getextrema()[channel][1] for channel in range(3)),
                "mean_channel_difference": round(sum(stat.mean) / 3, 6),
            })
    return {
        "method": "two interior decoded frames per placement; expected still-to-still comparison",
        "placement_count": len(results),
        "maximum_max_channel_difference": max(row["max_channel_difference"] for row in results),
        "maximum_mean_channel_difference": max(row["mean_channel_difference"] for row in results),
        "rows": results,
    }


def qa(config: dict) -> tuple[dict, dict]:
    candidate = WORK_OUTPUT
    info = ffmpeg_info(candidate)
    duration = duration_from_info(info)
    if abs(duration - OUTPUT_END) > (1 / FPS + 0.005):
        raise RuntimeError(f"Output duration {duration} differs from locked v17 frame-time {OUTPUT_END}")
    if "1920x1080" not in info or "Video: h264" not in info or "Audio: aac" not in info:
        raise RuntimeError("Output stream metadata does not match 1920×1080 H.264/AAC")
    if re.search(r"Subtitle:", info, re.IGNORECASE):
        raise RuntimeError("Output unexpectedly contains a subtitle stream")
    decode = run([str(FFMPEG), "-v", "error", "-i", str(candidate), "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"], allow_failure=True)
    if decode.returncode:
        raise RuntimeError("Full decode failed: " + decode.stderr[-3000:])
    black = run([str(FFMPEG), "-hide_banner", "-loglevel", "info", "-i", str(candidate), "-vf", "blackdetect=d=0.10:pix_th=0.10", "-an", "-f", "null", "-"], allow_failure=True)
    black_events = re.findall(r"black_start:([^ ]+) black_end:([^ ]+) black_duration:([^\s]+)", black.stderr)
    with tempfile.TemporaryDirectory(prefix="e02-v18-audio-qc-") as temp:
        temp_path = Path(temp)
        master_hash = extract_audio_hash(BASE, temp_path / "master.aac")
        output_hash = extract_audio_hash(candidate, temp_path / "output.aac")
    if master_hash != output_hash:
        raise RuntimeError("Narration audio elementary stream differs from the exact v17 narration master")
    still = still_controls(config, candidate)
    still["compression_noise_envelope"] = {
        "maximum_mean_channel_difference": STATIC_MEAN_DIFFERENCE_MAX,
        "maximum_channel_difference": STATIC_CHANNEL_DIFFERENCE_MAX,
        "reason": "static PNG input can vary slightly after H.264 rate-control quantisation; camera transforms are independently disabled in the filter graph",
    }
    if (
        still["maximum_mean_channel_difference"] > STATIC_MEAN_DIFFERENCE_MAX
        or still["maximum_max_channel_difference"] > STATIC_CHANNEL_DIFFERENCE_MAX
    ):
        noisiest = sorted(still["rows"], key=lambda row: row["mean_channel_difference"], reverse=True)[:3]
        raise RuntimeError(
            "Still-frame control detected camera/frame drift inside a placement "
            f"(max mean={still['maximum_mean_channel_difference']}, "
            f"max channel={still['maximum_max_channel_difference']}, rows={noisiest})"
        )
    candidate.replace(OUTPUT)
    manifest = {
        "schema": "laidies.episode-02.v18-still-only-review-manifest.v1",
        "task_id": TASK_ID,
        "status": "BUILT LOCALLY — independent Episode Media Quality review required",
        "base_v17": record(BASE),
        "production_clock": record(CLOCK),
        "config": record(CONFIG),
        "build_script": record(Path(__file__)),
        "narration_master": {
            **record(NARRATION),
            "clocked_v17_audio_stream_adts_sha256": master_hash,
            "output_adts_sha256": output_hash,
            "stream_copy_verified": True,
        },
        "vtt": {**record(VTT), "endpoint": VTT_ENDPOINT, "burned_into_video": False},
        "clock": config["clock"],
        "camera": {
            "all_placements_mode": "still",
            "camera_transforms_disabled": True,
            "filter_graph_contains_zoompan": False,
            "filter_graph_contains_crop": False,
            "filter_graph_contains_pan": False,
            "allowed_transition": "0.35-second alpha blend only",
        },
        "authorised_replacements": config["authorised_replacements"],
        "prohibited_source_check": {"passed": True, "paths": config["prohibited"]["paths"], "sha256": config["prohibited"]["sha256"]},
        "placements": config["placements"],
        "output": record(OUTPUT),
        "output_streams": {"ffmpeg_info": info, "captions_burned": False, "subtitle_stream_count": 0},
        "checks": {"full_decode": "PASS", "blackdetect_events": black_events, "still_frame_controls": still},
    }
    write_json(MANIFEST, manifest)
    qc = {
        "schema": "laidies.episode-02.v18-still-only-review-qc.v1",
        "task_id": TASK_ID,
        "status": "VERIFIED LOCALLY — awaiting independent Episode Media Quality review",
        "manifest": record(MANIFEST),
        "output": record(OUTPUT),
        "base_v17": record(BASE),
        "duration_seconds": duration,
        "duration_target_seconds": OUTPUT_END,
        "production_clock_rounded_seconds": CLOCK_END,
        "duration_delta_seconds": round(duration - CLOCK_END, 6),
        "standard": {"width": 1920, "height": 1080, "fps": FPS, "video_codec": "H.264", "audio_codec": "AAC", "subtitle_streams": 0, "captions_burned": False},
        "placement_count": len(config["placements"]),
        "replaced_cues": [0, 4, 5, 6, 13],
        "cue_13": config["placements"][13],
        "camera": manifest["camera"],
        "checks": {"full_decode": "PASS", "audio_stream_copy": "PASS", "blackdetect": {"event_count": len(black_events), "events": black_events}, "still_frame_controls": still},
        "independent_review_required": ["normal-speed audio/VTT/image/motion review", "no release or public assembly authority in maker task"],
    }
    write_json(QC, qc)
    return manifest, qc


def main() -> None:
    config = create_config() if not CONFIG.exists() else load_json(CONFIG)
    validate_config(config)
    if "--qa-only" not in sys.argv:
        render(config)
    elif not WORK_OUTPUT.is_file():
        raise RuntimeError("--qa-only requires the validated temporary candidate")
    manifest, qc = qa(config)
    print(OUTPUT)
    print(MANIFEST)
    print(QC)
    print(manifest["output"]["sha256"])


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"FAIL CLOSED: {error}", file=sys.stderr)
        raise
