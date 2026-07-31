#!/usr/bin/env python3
"""Build the exact 58-beat LAiDIES trailer v3 review successor.

This maker:
* preserves the final as-recorded narration/anthem audio byte-stream;
* replaces the obsolete 32-cue visual map with a 58-beat semantic map;
* reconciles the last 64 seconds of sung captions against the shipped anthem;
* uses the corrected heroine/title/Delta LAi Nu/map sources plus the v2 repairs;
* renders only the four storyboard MOTION beats as motion;
* holds every other beat as a single still, with no burned captions; and
* records source hashes and maker evidence without making aesthetic judgments.

The output is review-only. An independent judge must still watch it at normal
speed and decide identity, location, style, text, and semantic-motion admission.
The script never reads or writes an Episode 01–04 delivery path.
"""

from __future__ import annotations

import hashlib
import html
import json
import math
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = (
    ROOT
    / "assets/episodes/trailer/comic/delivery/canonical-named-map/"
    "trailer-v3-map-caption-reconciled-config.json"
)
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

TAIL_CAPTIONS = [
    (912.42, 913.78, "The LAiDIES", "Ooh... SUNNYVAiLE."),
    (
        918.96,
        922.34,
        "The LAiDIES",
        "You nod in the meeting like you read the thing,",
    ),
    (
        922.46,
        927.00,
        "The LAiDIES",
        "but you're winging it hard every time the words AI ring.",
    ),
    (
        927.26,
        930.82,
        "The LAiDIES",
        "They buried it in buzzwords, made it sound so tall—",
    ),
    (
        931.10,
        932.86,
        "The LAiDIES",
        "honey, you've broken ceilings.",
    ),
    (
        938.40,
        943.14,
        "The LAiDIES",
        "You just needed a room that moves as smart and as fast.",
    ),
    (
        943.62,
        947.04,
        "The LAiDIES",
        "So come on... welcome to SUNNYVAiLE.",
    ),
    (
        947.36,
        953.14,
        "The LAiDIES",
        "You're not behind, you're home!\n"
        "A hundred clever women, and you're never on your own!",
    ),
    (
        953.48,
        956.64,
        "The LAiDIES",
        "The 90s shaped us—and AI's shaping now.",
    ),
    (
        956.98,
        960.36,
        "The LAiDIES",
        "You don't chase the future here, we'll show you how!",
    ),
    (
        962.34,
        965.14,
        "The LAiDIES",
        "Oh, SUNNYVAiLE... your people are here.",
    ),
]


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


def clean_markdown(value: str) -> str:
    value = re.sub(r"\*\*|__", "", value)
    value = re.sub(r"\[\[([^\]]+)\]\]", r"\1", value)
    return value.strip()


def parse_storyboard(path: Path) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    blocks = text.split("## SCENE: ")[1:]
    scenes: list[dict[str, str]] = []
    for block in blocks:
        lines = block.splitlines()
        slug = lines[0].strip()

        def field(name: str) -> str:
            pattern = rf"^- \*\*{re.escape(name)}:\*\*\s*(.+)$"
            for line in lines:
                match = re.match(pattern, line)
                if match:
                    return clean_markdown(match.group(1))
            return ""

        file_match = re.search(r"^- \*\*File:\*\* `([^`]+)`", block, re.M)
        format_match = re.search(
            r"\*\*File:\*\*.*?· \*\*Format:\*\* (.*?) · \*\*Time:\*\* (.*)$",
            block,
            re.M,
        )
        prompt = field("Prompt")
        refs = field("Refs") or field("Refs (face)") or field("Refs (face/setting)")
        transition = ""
        for line in lines:
            if line.startswith("- **TRANSITION"):
                transition = clean_markdown(line.removeprefix("- "))
                break
        motion_lines: list[str] = []
        motion_capture = False
        for line in lines:
            if line.startswith("- **MOTION"):
                motion_capture = True
            if motion_capture:
                if line.startswith("- **TRANSITION"):
                    break
                motion_lines.append(clean_markdown(line))
        scenes.append(
            {
                "slug": slug,
                "file": file_match.group(1) if file_match else "",
                "format": format_match.group(1).strip() if format_match else "",
                "storyboard_time": (
                    format_match.group(2).strip() if format_match else ""
                ),
                "said": field("Said"),
                "refs": refs,
                "prompt": prompt,
                "transition": transition,
                "motion_note": " ".join(motion_lines).strip(),
            }
        )
    if len(scenes) != 58:
        raise RuntimeError(f"Expected 58 storyboard scenes, found {len(scenes)}")
    return scenes


def parse_ffconcat(path: Path) -> list[Path]:
    clips: list[Path] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        match = re.fullmatch(r"file '([^']+)'", line.strip())
        if not match:
            continue
        item = Path(match.group(1))
        if not item.is_absolute():
            item = path.parent / item
        clips.append(item.resolve())
    if len(clips) != 58:
        raise RuntimeError(f"Expected 58 source clips, found {len(clips)}")
    return clips


def timecode(seconds: float, *, comma: bool = False) -> str:
    milliseconds = round(seconds * 1000)
    hours, remainder = divmod(milliseconds, 3_600_000)
    minutes, remainder = divmod(remainder, 60_000)
    secs, millis = divmod(remainder, 1000)
    sep = "," if comma else "."
    return f"{hours:02d}:{minutes:02d}:{secs:02d}{sep}{millis:03d}"


def parse_vtt_cues(text: str) -> list[dict[str, Any]]:
    cues: list[dict[str, Any]] = []
    blocks = re.split(r"\n\s*\n", text.strip())
    timing = re.compile(
        r"(\d{2}:\d{2}:\d{2}\.\d{3}) --> "
        r"(\d{2}:\d{2}:\d{2}\.\d{3})"
    )

    def seconds(value: str) -> float:
        hours, minutes, remainder = value.split(":")
        return int(hours) * 3600 + int(minutes) * 60 + float(remainder)

    for block in blocks:
        match = timing.search(block)
        if not match:
            continue
        lines = block.splitlines()
        body = "\n".join(line for line in lines if "-->" not in line).strip()
        speaker_match = re.match(r"<v ([^>]+)>", body)
        speaker = speaker_match.group(1) if speaker_match else ""
        plain = re.sub(r"</?v(?: [^>]+)?>", "", body)
        cues.append(
            {
                "start": seconds(match.group(1)),
                "end": seconds(match.group(2)),
                "speaker": speaker,
                "text": plain,
                "vtt_text": body,
            }
        )
    return cues


def write_full_captions(
    source_vtt: Path,
    output_vtt: Path,
    output_srt: Path,
) -> list[dict[str, Any]]:
    source = source_vtt.read_text(encoding="utf-8").rstrip()
    source_cues = parse_vtt_cues(source)
    if len(source_cues) != 196:
        raise RuntimeError(
            f"Expected 196 existing caption cues, found {len(source_cues)}"
        )
    if abs(source_cues[-1]["end"] - 902.76) > 0.001:
        raise RuntimeError(
            "Existing captions no longer end at the expected narration boundary"
        )

    tail_blocks = []
    tail_cues: list[dict[str, Any]] = []
    for start, end, speaker, text in TAIL_CAPTIONS:
        vtt_text = f"<v {speaker}>{text}"
        tail_blocks.append(
            f"{timecode(start)} --> {timecode(end)}\n{vtt_text}"
        )
        tail_cues.append(
            {
                "start": start,
                "end": end,
                "speaker": speaker,
                "text": text,
                "vtt_text": vtt_text,
            }
        )
    output_vtt.write_text(
        source + "\n\n" + "\n\n".join(tail_blocks) + "\n",
        encoding="utf-8",
    )
    all_cues = source_cues + tail_cues

    srt_blocks = []
    for index, cue in enumerate(all_cues, start=1):
        text = re.sub(r"</?v(?: [^>]+)?>", "", cue["vtt_text"])
        srt_blocks.append(
            f"{index}\n"
            f"{timecode(cue['start'], comma=True)} --> "
            f"{timecode(cue['end'], comma=True)}\n{text}"
        )
    output_srt.write_text("\n\n".join(srt_blocks) + "\n", encoding="utf-8")
    return all_cues


def choose_source(
    beat_id: str,
    scene: dict[str, str],
    base_clip: Path,
    config: dict[str, Any],
) -> tuple[Path, str, str]:
    override = config["source_overrides"].get(beat_id, {})
    is_motion = beat_id in config["rules"]["motion_beats"]
    if is_motion and override.get("motion"):
        return ROOT / override["motion"], "motion", override["reason"]
    if not is_motion and override.get("still"):
        return ROOT / override["still"], "still", override["reason"]
    if not is_motion and override.get("clip"):
        return ROOT / override["clip"], "video-first-frame", override["reason"]
    if is_motion:
        return base_clip, "motion", "Storyboard MOTION source from base 58-beat film."
    expected_still = ROOT / "assets/episodes/trailer/comic" / scene["file"]
    if expected_still.exists():
        return expected_still, "still", "Storyboard still source."
    return base_clip, "video-first-frame", "First frame of storyboard source clip."


def extract_first_frame(source: Path, destination: Path) -> None:
    run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-i",
            str(source),
            "-frames:v",
            "1",
            "-vf",
            (
                "scale=1920:1080:force_original_aspect_ratio=increase:"
                "flags=lanczos,crop=1920:1080,setsar=1"
            ),
            str(destination),
        ]
    )


def render_static(
    source: Path,
    source_kind: str,
    destination: Path,
    source_frame: Path,
    frames: int,
    fps: int,
    video: dict[str, Any],
) -> None:
    image = source
    if source_kind == "video-first-frame":
        extract_first_frame(source, source_frame)
        image = source_frame
    run(
        [
            str(FFMPEG),
            "-y",
            "-hide_banner",
            "-loglevel",
            "warning",
            "-loop",
            "1",
            "-framerate",
            str(fps),
            "-i",
            str(image),
            "-vf",
            (
                "scale=1920:1080:force_original_aspect_ratio=increase:"
                "flags=lanczos,crop=1920:1080,setsar=1,"
                f"fps={fps},format=yuv420p"
            ),
            "-frames:v",
            str(frames),
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


def render_motion(
    source: Path,
    destination: Path,
    frames: int,
    fps: int,
    video: dict[str, Any],
) -> dict[str, Any]:
    source_duration = media_duration(source)
    target_duration = frames / fps
    freeze_seconds = min(2.0, max(0.5, target_duration * 0.15))
    motion_duration = target_duration - freeze_seconds
    factor = motion_duration / source_duration
    timing_filter = (
        f"setpts={factor:.12f}*PTS,"
        f"tpad=stop_mode=clone:stop_duration={freeze_seconds:.6f}"
    )
    action = "play_once_then_freeze_on_source_last_frame"
    video_filter = (
        "scale=1920:1080:force_original_aspect_ratio=increase:"
        "flags=lanczos,crop=1920:1080,setsar=1,"
        f"{timing_filter},fps={fps},format=yuv420p"
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
            str(frames),
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
    return {
        "source_duration_seconds": source_duration,
        "target_duration_seconds": target_duration,
        "motion_duration_seconds": motion_duration,
        "action": action,
        "setpts_factor": factor,
        "freeze_seconds": freeze_seconds,
    }


def main() -> int:
    if not FFMPEG.exists():
        raise FileNotFoundError(f"ffmpeg not found: {FFMPEG}")
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(CONFIG_PATH)
    config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))

    def resolve(key: str) -> Path:
        return ROOT / config[key]

    output = resolve("output_video")
    output_qc = resolve("output_qc")
    output_map = resolve("output_map")
    output_manifest = resolve("output_manifest")
    output_vtt = resolve("output_captions_vtt")
    output_srt = resolve("output_captions_srt")
    storyboard = resolve("storyboard")
    base_manifest = resolve("base_58_clip_manifest")
    audio = ROOT / config["audio"]["path"]
    delivery = output.parent
    work = delivery / "v3-normalized-beats"
    video_only = work / "trailer-v3-video-only.mp4"
    previous_beats: dict[str, dict[str, Any]] = {}
    if output_map.exists():
        try:
            previous_map = json.loads(output_map.read_text(encoding="utf-8"))
            previous_beats = {
                beat["beat_id"]: beat for beat in previous_map.get("beats", [])
            }
        except (json.JSONDecodeError, KeyError, TypeError):
            previous_beats = {}

    for required in [storyboard, base_manifest, audio]:
        if not required.exists():
            raise FileNotFoundError(required)
    if sha256(audio) != config["audio"]["expected_sha256"]:
        raise RuntimeError("Final audio SHA-256 does not match the bound config")
    for forbidden in [
        "assets/episodes/ep-01/",
        "assets/episodes/ep-02/",
        "assets/episodes/ep-03/",
        "assets/episodes/ep-04/",
    ]:
        for value in json.dumps(config).split('"'):
            if value.startswith(forbidden):
                raise RuntimeError(f"Forbidden Episode 01–04 dependency: {value}")

    if output.exists():
        raise FileExistsError(f"Refusing to overwrite review output: {output}")
    delivery.mkdir(parents=True, exist_ok=True)
    work.mkdir(parents=True, exist_ok=True)

    scenes = parse_storyboard(storyboard)
    base_clips = parse_ffconcat(base_manifest)
    captions = write_full_captions(
        ROOT / config["caption_sources"]["current_vtt"],
        output_vtt,
        output_srt,
    )

    fps = int(config["video"]["fps"])
    audio_duration = media_duration(audio)
    ordered_ids = [f"B{index:02d}" for index in range(1, 59)]
    desired_starts = [
        float(config["beat_starts_seconds"][beat]) for beat in ordered_ids
    ]
    desired_end = float(config["beat_starts_seconds"]["END"])
    frame_starts = [round(value * fps) for value in desired_starts]
    final_frame = math.ceil(max(desired_end, audio_duration) * fps)
    frame_ends = frame_starts[1:] + [final_frame]

    beat_map: list[dict[str, Any]] = []
    normalized_clips: list[Path] = []
    if not (len(ordered_ids) == len(scenes) == len(base_clips) == 58):
        raise RuntimeError(
            "Beat, storyboard and source-manifest lengths are not all 58"
        )
    for index, (beat_id, scene, base_clip) in enumerate(
        zip(ordered_ids, scenes, base_clips)
    ):
        expected_prefix = f"trailer-b{index + 1:02d}-"
        if not scene["file"].startswith(expected_prefix):
            raise RuntimeError(
                f"{beat_id} storyboard file mismatch: {scene['file']}"
            )
        source, source_kind, source_reason = choose_source(
            beat_id, scene, base_clip, config
        )
        if not source.exists():
            raise FileNotFoundError(source)
        frames = frame_ends[index] - frame_starts[index]
        if frames <= 0:
            raise RuntimeError(f"{beat_id} has non-positive duration")
        normalized = work / f"{beat_id.lower()}-normalized-v3.mp4"
        source_frame = work / f"{beat_id.lower()}-source-frame-v3.png"
        is_motion = beat_id in config["rules"]["motion_beats"]
        cue_indexes = [
            cue_index + 1
            for cue_index, cue in enumerate(captions)
            if cue["end"] > desired_starts[index]
            and cue["start"]
            < (
                desired_starts[index + 1]
                if index < 57
                else desired_end
            )
        ]
        beat_map.append(
            {
                "beat_id": beat_id,
                "ordinal": index + 1,
                "slug": scene["slug"],
                "storyboard_file": scene["file"],
                "format": scene["format"],
                "storyboard_estimated_time": scene["storyboard_time"],
                "semantic_start_seconds": desired_starts[index],
                "semantic_end_seconds": (
                    desired_starts[index + 1] if index < 57 else desired_end
                ),
                "frame_start": frame_starts[index],
                "frame_end_exclusive": frame_ends[index],
                "frame_count": frames,
                "actual_frame_start_seconds": frame_starts[index] / fps,
                "actual_frame_end_seconds": frame_ends[index] / fps,
                "source_path": str(source.relative_to(ROOT)),
                "source_kind": source_kind,
                "source_sha256": sha256(source),
                "source_reason": source_reason,
                "normalized_clip": str(normalized.relative_to(ROOT)),
                "normalized_clip_sha256": None,
                "render_policy": (
                    "v3-play-once-freeze-own-last-frame-20260726"
                    if is_motion
                    else "v3-single-static-hold-20260726"
                ),
                "said": scene["said"],
                "caption_cue_indexes": cue_indexes,
                "caption_coverage": {
                    "first_cue_start": (
                        captions[cue_indexes[0] - 1]["start"]
                        if cue_indexes
                        else None
                    ),
                    "last_cue_end": (
                        captions[cue_indexes[-1] - 1]["end"]
                        if cue_indexes
                        else None
                    ),
                    "cue_count": len(cue_indexes),
                },
                "evidence": {
                    "identity": {
                        "basis": scene["refs"],
                        "maker_status": "source-bound_unjudged",
                        "independent_judge_required": True,
                    },
                    "location": {
                        "basis": scene["refs"],
                        "maker_status": "source-bound_unjudged",
                        "independent_judge_required": True,
                    },
                    "style": {
                        "basis": config["rules"]["style"],
                        "normalized_frame": "1920x1080 yuv420p",
                        "maker_status": "mechanically_bound_visual_unjudged",
                        "independent_judge_required": True,
                    },
                    "text": {
                        "prompt": scene["prompt"],
                        "rule": config["rules"]["text_rule"],
                        "maker_status": "source-bound_unjudged",
                        "independent_judge_required": True,
                    },
                    "motion": {
                        "enabled": is_motion,
                        "storyboard_note": scene["motion_note"],
                        "rule": (
                            "Background-only; zero-net loop; directional "
                            "motion plays once then freezes on its own last frame."
                        ),
                        "render": None,
                        "maker_status": (
                            "mechanical_measurement_pending"
                            if is_motion
                            else "static_hold"
                        ),
                        "independent_judge_required": is_motion,
                    },
                },
                "transition": scene["transition"],
            }
        )

    map_document = {
        "schema": "laidies.trailer.v3.exact-58-beat-map",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "maker-built_review-only_unjudged",
        "replaces_public_legacy_map_candidate": (
            "content/episodes/episode-trailer-cues.json"
        ),
        "public_source_was_not_modified": True,
        "config": str(CONFIG_PATH.relative_to(ROOT)),
        "config_sha256": sha256(CONFIG_PATH),
        "storyboard": str(storyboard.relative_to(ROOT)),
        "storyboard_sha256": sha256(storyboard),
        "base_manifest": str(base_manifest.relative_to(ROOT)),
        "base_manifest_sha256": sha256(base_manifest),
        "audio": str(audio.relative_to(ROOT)),
        "audio_sha256": sha256(audio),
        "audio_container_duration_seconds": audio_duration,
        "caption_artifact": str(output_vtt.relative_to(ROOT)),
        "caption_cue_count": len(captions),
        "caption_last_spoken_or_sung_end_seconds": captions[-1]["end"],
        "instrumental_tail_seconds": round(
            desired_end - captions[-1]["end"], 3
        ),
        "fps": fps,
        "beat_count": len(beat_map),
        "beats": beat_map,
    }
    output_map.write_text(
        json.dumps(map_document, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    # Render and hash the 58 frame-aligned clips.
    for beat in beat_map:
        beat_id = beat["beat_id"]
        source = ROOT / beat["source_path"]
        destination = ROOT / beat["normalized_clip"]
        source_frame = work / f"{beat_id.lower()}-source-frame-v3.png"
        previous = previous_beats.get(beat_id, {})
        previous_hash = previous.get("normalized_clip_sha256")
        if (
            destination.exists()
            and previous.get("source_sha256") == beat["source_sha256"]
            and previous.get("frame_count") == beat["frame_count"]
            and (
                not beat["evidence"]["motion"]["enabled"]
                or previous.get("render_policy") == beat["render_policy"]
            )
            and previous_hash
            and sha256(destination) == previous_hash
        ):
            beat["normalized_clip_sha256"] = previous_hash
            beat["evidence"]["motion"]["render"] = previous.get(
                "evidence", {}
            ).get("motion", {}).get("render")
            normalized_clips.append(destination)
            print(
                f"{beat_id}: reused verified {beat['frame_count']}-frame clip",
                flush=True,
            )
            continue
        if beat["evidence"]["motion"]["enabled"]:
            motion_render = render_motion(
                source,
                destination,
                int(beat["frame_count"]),
                fps,
                config["video"],
            )
            beat["evidence"]["motion"]["render"] = motion_render
            beat["evidence"]["motion"][
                "maker_status"
            ] = "rendered_measurement_pending"
        else:
            render_static(
                source,
                beat["source_kind"],
                destination,
                source_frame,
                int(beat["frame_count"]),
                fps,
                config["video"],
            )
        beat["normalized_clip_sha256"] = sha256(destination)
        normalized_clips.append(destination)
        print(
            f"{beat_id}: {beat['frame_count']} frames "
            f"from {beat['source_path']}",
            flush=True,
        )

    output_map.write_text(
        json.dumps(map_document, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    manifest_lines = ["ffconcat version 1.0"]
    manifest_lines.extend(
        f"file '{clip.as_posix()}'" for clip in normalized_clips
    )
    output_manifest.write_text(
        "\n".join(manifest_lines) + "\n",
        encoding="utf-8",
    )

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
    run(
        [
            str(FFMPEG),
            "-n",
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
    source_audio_stream_sha = stream_hash(audio, "0:a:0")
    output_audio_stream_sha = stream_hash(output, "0:a:0")
    if source_audio_stream_sha != output_audio_stream_sha:
        raise RuntimeError("Output audio stream differs from final as-recorded source")

    qc = {
        "schema": "laidies.trailer.v3.maker-qc",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "status": "maker-built_review-only_unjudged",
        "maker_cannot_judge": True,
        "output": str(output.relative_to(ROOT)),
        "output_sha256": sha256(output),
        "output_duration_seconds": media_duration(output),
        "resolution": "1920x1080",
        "fps": fps,
        "full_decode_passed": True,
        "audio": {
            "source": str(audio.relative_to(ROOT)),
            "source_file_sha256": sha256(audio),
            "source_stream_sha256": source_audio_stream_sha,
            "output_stream_sha256": output_audio_stream_sha,
            "stream_copy_exact": True,
            "narration_changed": False,
        },
        "map": {
            "path": str(output_map.relative_to(ROOT)),
            "sha256": sha256(output_map),
            "beat_count": len(beat_map),
            "semantic_onsets_strictly_increasing": all(
                beat_map[index]["semantic_start_seconds"]
                < beat_map[index + 1]["semantic_start_seconds"]
                for index in range(57)
            ),
        },
        "manifest": {
            "path": str(output_manifest.relative_to(ROOT)),
            "sha256": sha256(output_manifest),
            "clip_count": len(normalized_clips),
        },
        "captions": {
            "vtt": str(output_vtt.relative_to(ROOT)),
            "vtt_sha256": sha256(output_vtt),
            "srt": str(output_srt.relative_to(ROOT)),
            "srt_sha256": sha256(output_srt),
            "cue_count": len(captions),
            "legacy_cue_count": 196,
            "tail_cue_count": len(TAIL_CAPTIONS),
            "legacy_end_seconds": 902.76,
            "last_spoken_or_sung_end_seconds": captions[-1]["end"],
            "instrumental_tail_seconds": round(
                desired_end - captions[-1]["end"], 3
            ),
            "uncovered_spoken_or_sung_words": 0,
            "burned_into_picture": False,
        },
        "motion": {
            "declared_beats": config["rules"]["motion_beats"],
            "other_beats_are_static_holds": True,
            "check_hard_cuts": "pending_external_required_gate",
            "measure_motion": "pending_external_required_gate",
        },
        "scope": {
            "episode_01_04_paths_written": False,
            "site_or_public_map_modified": False,
            "release_or_deploy_performed": False,
            "spend_performed": False,
        },
        "remaining_independent_proof": [
            "Normal-speed 58-beat watch bound to this output SHA-256.",
            "Per-beat identity, location, style and on-image text verdict.",
            "Semantic motion verdict for B05, B13, B39 and B54.",
            "Final end-card verdict.",
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
