#!/usr/bin/env python3
"""Register four native CapCut projects for the reusable LAiDIES episode intro.

The script follows the repository's existing CapCut draft-registration method:
it clones an empty local shell, derives track/material structure from a known
working two-track project, writes atomically, and adds four bounded root-index
entries. It never modifies an existing target project and never touches the
open 0823 project.
"""

from __future__ import annotations

import copy
import json
import os
import re
import shutil
import time
import uuid
from pathlib import Path


ROOT = Path(__file__).resolve().parents[5]
PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
SHELL = PROJECTS / "0823"
STRUCTURE_TEMPLATE = PROJECTS / "0723"
ROOT_META = PROJECTS / "root_meta_info.json"

INTRO = ROOT / "assets/episodes/shared/intro-v1/laidies-shared-intro-character-town-canva-v5-text-safe-motion.mp4"
SONG = ROOT / "content/music/sunnyvaile-episode-intro.mp3"
INTRO_US = 25_082_000
IDENT_US = 4_150_000
TOTAL_US = 29_232_000
UUID_RE = re.compile(r"^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$")

EPISODES = [
    ("01", "On Wednesdays We Do AI", "continuous-i-episode-01-on-wednesdays-we-do-ai-clean-electric-v2.mp4"),
    ("02", "Tell Me What You Want", "continuous-i-episode-02-tell-me-what-you-want-clean-electric-v2.mp4"),
    ("03", "The Burn Book Problem", "continuous-i-episode-03-the-burn-book-problem-clean-electric-v2.mp4"),
    ("04", "The Founding Mothers", "continuous-i-episode-04-founding-mothers-clean-electric-v2.mp4"),
]


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, value) -> None:
    temp = path.with_name(path.name + ".codex-tmp")
    temp.write_text(json.dumps(value, separators=(",", ":")), encoding="utf-8")
    os.replace(temp, path)


def new_id(upper: bool = True) -> str:
    value = str(uuid.uuid4())
    return value.upper() if upper else value.lower()


def remap_uuids(value, mapping: dict[str, str]):
    if isinstance(value, dict):
        return {key: remap_uuids(item, mapping) for key, item in value.items()}
    if isinstance(value, list):
        return [remap_uuids(item, mapping) for item in value]
    if isinstance(value, str) and UUID_RE.fullmatch(value):
        if value not in mapping:
            replacement = str(uuid.uuid4())
            mapping[value] = replacement.upper() if value.upper() == value else replacement.lower()
        return mapping[value]
    return value


def clone_segment_with_extras(info: dict, source_segment: dict) -> dict:
    refs = source_segment["extra_material_refs"]
    mapping = {old: new_id(old.upper() == old) for old in refs}
    for collection in info["materials"].values():
        additions = []
        for material in collection:
            if material.get("id") in mapping:
                additions.append(remap_uuids(copy.deepcopy(material), mapping))
        collection.extend(additions)
    segment = remap_uuids(copy.deepcopy(source_segment), mapping)
    segment["id"] = new_id()
    return segment


def update_video_material(material: dict, path: Path, duration: int, width: int, height: int) -> None:
    material.update(
        {
            "duration": duration,
            "path": str(path),
            "material_name": path.name,
            "width": width,
            "height": height,
            "has_audio": False,
            "type": "video",
        }
    )


def update_audio_material(material: dict, path: Path, duration: int) -> None:
    material.update(
        {
            "duration": duration,
            "path": str(path),
            "name": path.name,
            "type": "extract_music",
        }
    )


def meta_material(path: Path, local_id: str, duration: int, media_type: str, width: int, height: int, now_s: int, now_us: int) -> dict:
    return {
        "ai_group_type": "",
        "create_time": now_s,
        "duration": duration,
        "enter_from": 0,
        "extra_info": path.name,
        "file_Path": str(path),
        "height": height,
        "id": local_id,
        "import_time": now_s,
        "import_time_ms": now_us,
        "item_source": 1,
        "material_color_tag": "",
        "md5": "",
        "metetype": media_type,
        "roughcut_time_range": {"duration": duration, "start": 0},
        "sub_time_range": {"duration": -1, "start": -1},
        "type": 0,
        "width": width,
    }


def target_names() -> list[str]:
    return [f"LAiDIES Shared Intro EP{number}" for number, _, _ in EPISODES]


def validate_inputs() -> None:
    for path in (INTRO, SONG, ROOT_META, SHELL / "draft_info.json", STRUCTURE_TEMPLATE / "draft_info.json"):
        if not path.is_file():
            raise FileNotFoundError(path)
    for _, _, ident_name in EPISODES:
        ident = ROOT / "operations/design-explorations/laidies-motion-ident-20260725" / ident_name
        if not ident.is_file():
            raise FileNotFoundError(ident)
    occupied = [name for name in target_names() if (PROJECTS / name).exists()]
    if occupied:
        raise FileExistsError(f"Refusing to replace existing CapCut projects: {occupied}")


def build_project(number: str, title: str, ident_name: str, root: dict, shell_root_entry: dict) -> dict:
    project_name = f"LAiDIES Shared Intro EP{number}"
    target = PROJECTS / project_name
    shutil.copytree(SHELL, target, ignore=shutil.ignore_patterns(".locked", "*.bak", "*.tmp"))

    shell_info = read(SHELL / "draft_info.json")
    template_info = read(STRUCTURE_TEMPLATE / "draft_info.json")
    timeline_id = new_id()
    info = remap_uuids(template_info, {template_info["id"]: timeline_id})
    info.update(
        {
            "id": timeline_id,
            "name": project_name,
            "duration": TOTAL_US,
            "fps": 30.0,
            "canvas_config": {"ratio": "16:9", "width": 1920, "height": 1080, "background": None},
            "path": str(target),
            "platform": shell_info["platform"],
            "last_modified_platform": shell_info["last_modified_platform"],
        }
    )

    ident = ROOT / "operations/design-explorations/laidies-motion-ident-20260725" / ident_name
    intro_material = info["materials"]["videos"][0]
    update_video_material(intro_material, INTRO, 25_100_000, 1920, 1080)
    ident_material = remap_uuids(copy.deepcopy(intro_material), {})
    ident_material["id"] = new_id()
    ident_material["local_material_id"] = new_id(False)
    update_video_material(ident_material, ident, IDENT_US, 960, 540)
    info["materials"]["videos"].append(ident_material)

    audio_material = info["materials"]["audios"][0]
    update_audio_material(audio_material, SONG, TOTAL_US)

    video_track = next(track for track in info["tracks"] if track["type"] == "video")
    audio_track = next(track for track in info["tracks"] if track["type"] == "audio")
    video_track.update({"name": "CANVA INTRO + EPISODE IDENT", "is_default_name": False})
    audio_track.update({"name": "EXISTING INTRO SONG", "is_default_name": False})

    intro_segment = video_track["segments"][0]
    intro_segment.update(
        {
            "material_id": intro_material["id"],
            "source_timerange": {"start": 0, "duration": INTRO_US},
            "target_timerange": {"start": 0, "duration": INTRO_US},
            "volume": 0.0,
            "last_nonzero_volume": 1.0,
        }
    )
    ident_segment = clone_segment_with_extras(info, intro_segment)
    ident_segment.update(
        {
            "material_id": ident_material["id"],
            "source_timerange": {"start": 0, "duration": IDENT_US},
            "target_timerange": {"start": INTRO_US, "duration": IDENT_US},
            "volume": 0.0,
            "last_nonzero_volume": 1.0,
        }
    )
    video_track["segments"] = [intro_segment, ident_segment]

    audio_segment = audio_track["segments"][0]
    audio_segment.update(
        {
            "material_id": audio_material["id"],
            "source_timerange": {"start": 0, "duration": TOTAL_US},
            "target_timerange": {"start": 0, "duration": TOTAL_US},
            "volume": 1.0,
            "last_nonzero_volume": 1.0,
        }
    )

    now_us = int(time.time() * 1_000_000)
    now_s = now_us // 1_000_000
    info["create_time"] = now_us
    info["update_time"] = now_us

    meta = remap_uuids(read(SHELL / "draft_meta_info.json"), {})
    meta.update(
        {
            "draft_id": new_id(),
            "draft_name": project_name,
            "draft_fold_path": str(target),
            "draft_root_path": str(PROJECTS),
            "tm_draft_create": now_us,
            "tm_draft_modified": now_us,
            "tm_duration": TOTAL_US,
            "draft_timeline_materials_size_": INTRO.stat().st_size + ident.stat().st_size + SONG.stat().st_size,
        }
    )
    meta["draft_materials"] = [
        {
            "type": 0,
            "value": [
                meta_material(INTRO, intro_material["local_material_id"], 25_100_000, "video", 1920, 1080, now_s, now_us),
                meta_material(ident, ident_material["local_material_id"], IDENT_US, "video", 960, 540, now_s, now_us),
                meta_material(SONG, new_id(False), TOTAL_US, "music", 0, 0, now_s, now_us),
            ],
        },
        {"type": 1, "value": []},
        {"type": 2, "value": []},
        {"type": 3, "value": []},
        {"type": 6, "value": []},
    ]

    project = read(SHELL / "Timelines/project.json")
    project["id"] = new_id()
    project["main_timeline_id"] = timeline_id
    project["create_time"] = now_us
    project["update_time"] = now_us
    project["timelines"] = [
        {
            "create_time": now_us,
            "id": timeline_id,
            "is_marked_delete": False,
            "name": f"EP{number} — {title}",
            "update_time": now_us,
        }
    ]

    timelines_root = target / "Timelines"
    for child in list(timelines_root.iterdir()):
        if child.is_dir():
            shutil.rmtree(child)
    nested = timelines_root / timeline_id
    nested.mkdir(parents=True)

    atomic_write(target / "draft_info.json", info)
    atomic_write(nested / "draft_info.json", info)
    atomic_write(target / "draft_meta_info.json", meta)
    atomic_write(timelines_root / "project.json", project)

    root_entry = copy.deepcopy(shell_root_entry)
    root_entry.update(
        {
            "draft_cover": str(target / "draft_cover.jpg"),
            "draft_fold_path": str(target),
            "draft_id": meta["draft_id"],
            "draft_json_file": str(target / "draft_info.json"),
            "draft_name": project_name,
            "draft_root_path": str(PROJECTS),
            "draft_timeline_materials_size": meta["draft_timeline_materials_size_"],
            "tm_draft_create": now_us,
            "tm_draft_modified": now_us,
            "tm_duration": TOTAL_US,
        }
    )
    root["all_draft_store"].append(root_entry)

    manifest = {
        "project": project_name,
        "episode": number,
        "title": title,
        "duration_us": TOTAL_US,
        "timeline_id": timeline_id,
        "draft_id": meta["draft_id"],
        "video_segments": [
            {"path": str(INTRO), "start_us": 0, "duration_us": INTRO_US},
            {"path": str(ident), "start_us": INTRO_US, "duration_us": IDENT_US},
        ],
        "audio": {"path": str(SONG), "start_us": 0, "duration_us": TOTAL_US},
        "status": "NATIVE_CAPCUT_PROJECT_REGISTERED_EXPORT_PENDING",
    }
    (target / "assembly-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    return {"name": project_name, "path": str(target), "draft_id": meta["draft_id"], "timeline_id": timeline_id}


def main() -> None:
    validate_inputs()
    root = read(ROOT_META)
    shell_meta = read(SHELL / "draft_meta_info.json")
    matches = [entry for entry in root["all_draft_store"] if entry["draft_id"] == shell_meta["draft_id"]]
    if len(matches) != 1:
        raise RuntimeError(f"Expected one root entry for shell 0823, found {len(matches)}")

    backup = ROOT_META.with_name(f"root_meta_info.json.codex-shared-intro-{int(time.time())}.bak")
    shutil.copy2(ROOT_META, backup)
    created = []
    try:
        for episode in EPISODES:
            created.append(build_project(*episode, root, matches[0]))
        atomic_write(ROOT_META, root)
    except Exception:
        for name in target_names():
            target = PROJECTS / name
            if target.exists():
                shutil.rmtree(target)
        shutil.copy2(backup, ROOT_META)
        raise

    print(json.dumps({"created": created, "root_backup": str(backup)}, indent=2))


if __name__ == "__main__":
    main()
