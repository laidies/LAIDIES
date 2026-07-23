#!/usr/bin/env python3
"""Populate the empty 0722 CapCut shell with the complete EP04 v3 assembly.

The project contains:
  * the 54 locked source placements on an editable source track;
  * exact final-frame extracts for every required no-loop hold;
  * 0.45 second still-to-still crossfades on a source fade track;
  * the rendered v3 master, with narration and burned below-picture captions,
    as the visible export track.

Approved Website-homepage assets are copied, never moved or modified. The
empty shell and CapCut root index are backed up before atomic JSON rewrites.
"""

from __future__ import annotations

import copy
import json
import os
import re
import shutil
import subprocess
import time
import uuid
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
BRIEF = ROOT / "operations/codex-prompts/ep04-assembly-prompt.md"
PIXEL = ROOT / "assets/episodes/ep-04/pixel"
CAPTIONS = ROOT / "assets/captions/episode-04.vtt"
MASTER = ROOT / "assets/video/episode-04-full-v3.mp4"
QC_REPORT = ROOT / "assets/video/episode-04-full-v3-qc.json"
FFMPEG = Path(
    "/Users/alisoneakin/.local/lib/python3.12/site-packages/"
    "imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
)

PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
TEMPLATE = PROJECTS / "0721"
TARGET = PROJECTS / "0722"
ROOT_META = PROJECTS / "root_meta_info.json"
PROJECT_NAME = "LAiDIES EP04 v3 Assembly"
TIMELINE_NAME = "EP04 v3 — 54 placements + master"

END_US = 1_222_400_000
CROSSFADE_US = 450_000
FRAME_US = 33_333

ROW_RE = re.compile(
    r"^\|\s*(\d+)\s*\|\s*([0-9:.]+)\s*\|\s*([0-9.]+)s\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$"
)


def new_id() -> str:
    return str(uuid.uuid4()).upper()


def parse_time_us(value: str) -> int:
    parts = [float(item) for item in value.split(":")]
    if len(parts) == 2:
        seconds = parts[0] * 60 + parts[1]
    elif len(parts) == 3:
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2]
    else:
        raise ValueError(value)
    return int(round(seconds * 1_000_000))


def placements() -> list[dict]:
    result = []
    for line in BRIEF.read_text(encoding="utf-8").splitlines():
        match = ROW_RE.match(line)
        if not match:
            continue
        number, timestamp, hold, kind, filename = match.groups()
        result.append(
            {
                "number": int(number),
                "start": parse_time_us(timestamp),
                "listed_hold": float(hold),
                "kind": kind.strip(),
                "filename": filename,
            }
        )
    if len(result) != 54:
        raise RuntimeError(f"Expected 54 placements, found {len(result)}")
    for index, item in enumerate(result):
        item["stop"] = result[index + 1]["start"] if index + 1 < len(result) else END_US
        item["span"] = item["stop"] - item["start"]
    return result


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, data) -> None:
    temp = path.with_name(path.name + ".codex-tmp")
    temp.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    os.replace(temp, path)


def backup_once(path: Path, suffix: str) -> None:
    backup = path.with_name(path.name + suffix)
    if backup.exists():
        raise FileExistsError(f"Refusing a second registration pass; backup exists: {backup}")
    shutil.copy2(path, backup)


def probe_duration_us(path: Path) -> int:
    result = subprocess.run(
        [str(FFMPEG), "-hide_banner", "-i", str(path)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    match = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", result.stderr)
    if not match:
        raise RuntimeError(f"Could not read duration: {path}")
    hours, minutes, seconds = match.groups()
    return int(round((int(hours) * 3600 + int(minutes) * 60 + float(seconds)) * 1_000_000))


def copy_new(source: Path, destination: Path) -> None:
    if destination.exists():
        raise FileExistsError(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def extract_final_frame(source: Path, destination: Path) -> None:
    if destination.exists():
        raise FileExistsError(destination)
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(FFMPEG), "-hide_banner", "-loglevel", "error", "-sseof", "-0.040",
            "-i", str(source), "-frames:v", "1", "-y", str(destination),
        ],
        check=True,
    )


def remap_template(value, mapping: dict[str, str]):
    if isinstance(value, dict):
        return {key: remap_template(item, mapping) for key, item in value.items()}
    if isinstance(value, list):
        return [remap_template(item, mapping) for item in value]
    if isinstance(value, str) and value in mapping:
        return mapping[value]
    return value


def make_extras(draft: dict, speed: float) -> list[str]:
    template_info = read(TEMPLATE / "draft_info.json")
    template_segment = template_info["tracks"][0]["segments"][0]
    template_refs = template_segment["extra_material_refs"]
    mapping = {old: new_id() for old in template_refs}
    for collection_name, collection in template_info["materials"].items():
        for material in collection:
            if material.get("id") not in mapping:
                continue
            cloned = remap_template(material, mapping)
            if collection_name == "speeds":
                cloned["speed"] = speed
            draft["materials"][collection_name].append(cloned)
    return [mapping[item] for item in template_refs]


def make_material(template_material: dict, path: Path, duration: int, media_type: str, has_audio: bool) -> tuple[dict, dict]:
    material = copy.deepcopy(template_material)
    material_id = new_id()
    local_id = str(uuid.uuid4()).lower()
    material.update(
        {
            "id": material_id,
            "type": media_type,
            "duration": duration,
            "path": str(path),
            "material_name": path.name,
            "has_audio": has_audio,
            "local_material_id": local_id,
            "width": 1920,
            "height": 1080,
            "check_flag": 62978047 if media_type == "video" else 7,
        }
    )
    meta = {
        "ai_group_type": "",
        "create_time": int(time.time()),
        "duration": duration,
        "enter_from": 0,
        "extra_info": path.name,
        "file_Path": str(path),
        "height": 1080,
        "id": local_id,
        "import_time": int(time.time()),
        "import_time_ms": int(time.time() * 1_000_000),
        "item_source": 1,
        "material_color_tag": "",
        "md5": "",
        "metetype": media_type,
        "roughcut_time_range": {"duration": duration if media_type == "video" else -1, "start": 0 if media_type == "video" else -1},
        "sub_time_range": {"duration": -1, "start": -1},
        "type": 0,
        "width": 1920,
    }
    return material, meta


def make_segment(
    template_segment: dict,
    draft: dict,
    track_id: str,
    material_id: str,
    start: int,
    target_duration: int,
    source_duration: int,
    speed: float,
    render_index: int,
    volume: float = 1.0,
    fade_alpha: bool = False,
) -> dict:
    segment = copy.deepcopy(template_segment)
    segment.update(
        {
            "id": new_id(),
            "material_id": material_id,
            "raw_segment_id": track_id,
            "target_timerange": {"start": start, "duration": target_duration},
            "source_timerange": {"start": 0, "duration": source_duration},
            "speed": speed,
            "volume": volume,
            "last_nonzero_volume": volume if volume else 1.0,
            "render_index": render_index,
            "track_render_index": render_index,
            "extra_material_refs": make_extras(draft, speed),
            "common_keyframes": [],
            "keyframe_refs": [],
        }
    )
    if fade_alpha:
        segment["common_keyframes"] = [
            {
                "id": new_id().replace("-", "").lower(),
                "keyframe_list": [
                    {
                        "curveType": "Line",
                        "graphID": "",
                        "left_control": {"x": 0, "y": 0},
                        "right_control": {"x": 0, "y": 0},
                        "id": new_id().replace("-", "").lower(),
                        "time_offset": 0,
                        "values": [0.0],
                    },
                    {
                        "curveType": "Line",
                        "graphID": "",
                        "left_control": {"x": 0, "y": 0},
                        "right_control": {"x": 0, "y": 0},
                        "id": new_id().replace("-", "").lower(),
                        "time_offset": target_duration,
                        "values": [1.0],
                    },
                ],
                "material_id": "",
                "property_type": "KFTypeAlpha",
            }
        ]
    return segment


def main() -> None:
    for path in (BRIEF, MASTER, QC_REPORT, CAPTIONS, FFMPEG, ROOT_META):
        if not path.is_file():
            raise FileNotFoundError(path)
    items = placements()

    info_path = TARGET / "draft_info.json"
    meta_path = TARGET / "draft_meta_info.json"
    project_path = TARGET / "Timelines/project.json"
    info = read(info_path)
    meta = read(meta_path)
    project = read(project_path)
    if info.get("duration") != 0 or info.get("tracks") or info["materials"]["videos"]:
        raise RuntimeError("Target CapCut shell is no longer empty")
    if meta.get("tm_duration") != 0:
        raise RuntimeError("Target CapCut metadata is no longer empty")

    nested_info_path = TARGET / "Timelines" / info["id"] / "draft_info.json"
    if not nested_info_path.is_file():
        raise FileNotFoundError(nested_info_path)

    backup_once(ROOT_META, ".codex-ep04-v3.bak")
    for path in (info_path, nested_info_path, meta_path, project_path):
        backup_once(path, ".codex-empty.bak")

    media_dir = TARGET / "assets/video"
    caption_dir = TARGET / "assets/captions"
    source_dir = media_dir / "source"
    freeze_dir = media_dir / "freeze-frames"
    master_path = media_dir / MASTER.name
    caption_path = caption_dir / CAPTIONS.name
    copy_new(MASTER, master_path)
    copy_new(CAPTIONS, caption_path)

    unique_sources: dict[str, Path] = {}
    source_durations: dict[str, int] = {}
    for item in items:
        source = PIXEL / item["filename"]
        if not source.is_file():
            raise FileNotFoundError(source)
        if item["filename"] not in unique_sources:
            destination = source_dir / source.name
            copy_new(source, destination)
            unique_sources[item["filename"]] = destination
            if source.suffix.lower() == ".mp4":
                source_durations[item["filename"]] = probe_duration_us(source)

    # Only clips shorter than their locked timeline slot need a true final-frame hold.
    freeze_paths: dict[str, Path] = {}
    for item in items:
        if not item["filename"].endswith(".mp4"):
            continue
        source_duration = source_durations[item["filename"]]
        hold = item["span"] - source_duration
        if hold <= FRAME_US:
            continue
        if item["filename"] not in freeze_paths:
            output = freeze_dir / f"{Path(item['filename']).stem}-final-frame.png"
            extract_final_frame(unique_sources[item["filename"]], output)
            freeze_paths[item["filename"]] = output

    template_info = read(TEMPLATE / "draft_info.json")
    template_material = template_info["materials"]["videos"][0]
    template_segment = template_info["tracks"][0]["segments"][0]

    info["name"] = PROJECT_NAME
    info["duration"] = END_US
    info["fps"] = 30.0
    info["canvas_config"] = {"ratio": "16:9", "width": 1920, "height": 1080, "background": None}
    info["path"] = str(TARGET)
    now_us = int(time.time() * 1_000_000)
    info["create_time"] = info.get("create_time") or now_us
    info["update_time"] = now_us

    material_ids: dict[str, str] = {}
    meta_materials: list[dict] = []
    for filename, path in unique_sources.items():
        media_type = "video" if path.suffix.lower() == ".mp4" else "photo"
        duration = source_durations.get(filename, max(item["span"] for item in items if item["filename"] == filename))
        material, material_meta = make_material(template_material, path, duration, media_type, False)
        info["materials"]["videos"].append(material)
        material_ids[filename] = material["id"]
        meta_materials.append(material_meta)

    freeze_ids: dict[str, str] = {}
    for filename, path in freeze_paths.items():
        hold_duration = max(item["span"] - source_durations[filename] for item in items if item["filename"] == filename)
        material, material_meta = make_material(template_material, path, hold_duration, "photo", False)
        info["materials"]["videos"].append(material)
        freeze_ids[filename] = material["id"]
        meta_materials.append(material_meta)

    master_material, master_meta = make_material(template_material, master_path, END_US, "video", True)
    info["materials"]["videos"].append(master_material)
    meta_materials.append(master_meta)

    source_track_id = new_id()
    fade_track_id = new_id()
    master_track_id = new_id()
    source_segments = []
    fade_segments = []

    for index, item in enumerate(items):
        is_still = item["filename"].endswith(".png")
        previous_still = index > 0 and items[index - 1]["filename"].endswith(".png")
        next_still = index + 1 < len(items) and items[index + 1]["filename"].endswith(".png")

        if is_still:
            main_start = item["start"] + (CROSSFADE_US if previous_still else 0)
            main_end = item["stop"] + (CROSSFADE_US if next_still else 0)
            main_duration = main_end - main_start
            source_segments.append(
                make_segment(
                    template_segment, info, source_track_id, material_ids[item["filename"]],
                    main_start, main_duration, main_duration, 1.0, 10_000, volume=0.0,
                )
            )
            if previous_still:
                fade_segments.append(
                    make_segment(
                        template_segment, info, fade_track_id, material_ids[item["filename"]],
                        item["start"], CROSSFADE_US, CROSSFADE_US, 1.0, 12_000,
                        volume=0.0, fade_alpha=True,
                    )
                )
            continue

        source_duration = source_durations[item["filename"]]
        if source_duration > item["span"] + FRAME_US:
            speed = source_duration / item["span"]
            source_segments.append(
                make_segment(
                    template_segment, info, source_track_id, material_ids[item["filename"]],
                    item["start"], item["span"], source_duration, speed, 10_000, volume=0.0,
                )
            )
        elif item["span"] - source_duration > FRAME_US:
            source_segments.append(
                make_segment(
                    template_segment, info, source_track_id, material_ids[item["filename"]],
                    item["start"], source_duration, source_duration, 1.0, 10_000, volume=0.0,
                )
            )
            hold_duration = item["span"] - source_duration
            source_segments.append(
                make_segment(
                    template_segment, info, source_track_id, freeze_ids[item["filename"]],
                    item["start"] + source_duration, hold_duration, hold_duration, 1.0, 10_000, volume=0.0,
                )
            )
        else:
            speed = source_duration / item["span"]
            source_segments.append(
                make_segment(
                    template_segment, info, source_track_id, material_ids[item["filename"]],
                    item["start"], item["span"], source_duration, speed, 10_000, volume=0.0,
                )
            )

    master_segment = make_segment(
        template_segment, info, master_track_id, master_material["id"],
        0, END_US, END_US, 1.0, 14_000, volume=1.0,
    )
    info["tracks"] = [
        {"id": source_track_id, "type": "video", "name": "54 PLACEMENTS — editable source", "attribute": 0, "segments": source_segments, "is_default_name": False, "flag": 0},
        {"id": fade_track_id, "type": "video", "name": "0.45s STILL CROSSFADES", "attribute": 0, "segments": fade_segments, "is_default_name": False, "flag": 0},
        {"id": master_track_id, "type": "video", "name": "V3 MASTER — narration + burned captions", "attribute": 0, "segments": [master_segment], "is_default_name": False, "flag": 0},
    ]

    meta["draft_name"] = PROJECT_NAME
    meta["tm_duration"] = END_US
    meta["tm_draft_modified"] = now_us
    meta["draft_timeline_materials_size_"] = sum(path.stat().st_size for path in TARGET.rglob("*") if path.is_file())
    type_zero = next(item for item in meta["draft_materials"] if item["type"] == 0)
    type_zero["value"] = meta_materials

    project["update_time"] = now_us
    timeline = next(item for item in project["timelines"] if item["id"] == info["id"])
    timeline["name"] = TIMELINE_NAME
    timeline["update_time"] = now_us

    root = read(ROOT_META)
    matches = [entry for entry in root["all_draft_store"] if entry["draft_id"] == meta["draft_id"]]
    if len(matches) != 1:
        raise RuntimeError(f"Expected one root index entry for 0722, found {len(matches)}")
    entry = matches[0]
    if entry.get("tm_duration") != 0:
        raise RuntimeError("Root index says the target shell is no longer empty")
    entry["draft_name"] = PROJECT_NAME
    entry["tm_duration"] = END_US
    entry["tm_draft_modified"] = now_us
    entry["draft_timeline_materials_size"] = meta["draft_timeline_materials_size_"]

    manifest = {
        "project_name": PROJECT_NAME,
        "timeline_name": TIMELINE_NAME,
        "runtime_us": END_US,
        "placement_count": len(items),
        "source_track_segment_count": len(source_segments),
        "crossfade_segment_count": len(fade_segments),
        "final_frame_hold_count": len(freeze_paths),
        "master": str(master_path),
        "captions": str(caption_path),
        "note": "Visible master is the verified v3 export; editable source and crossfade tracks sit underneath on the same timeline.",
        "placements": items,
    }
    (TARGET / "assembly-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    atomic_write(info_path, info)
    atomic_write(nested_info_path, info)
    atomic_write(meta_path, meta)
    atomic_write(project_path, project)
    atomic_write(ROOT_META, root)

    print(TARGET)
    print(f"source segments: {len(source_segments)}")
    print(f"crossfade segments: {len(fade_segments)}")
    print(f"final-frame holds: {len(freeze_paths)}")


if __name__ == "__main__":
    main()
