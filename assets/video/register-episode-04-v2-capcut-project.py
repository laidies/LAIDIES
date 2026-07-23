#!/usr/bin/env python3
"""Populate CapCut's registered empty 0721 (2) shell with EP04 v2.

The script refuses to touch a non-empty target. It preserves one-time backups of
the empty shell and the CapCut root index before making atomic JSON rewrites.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import time
import uuid
from pathlib import Path


PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
TEMPLATE = PROJECTS / "0721"
TARGET = PROJECTS / "0721 (2)"
ROOT_META = PROJECTS / "root_meta_info.json"
VIDEO = Path(
    "/Users/alisoneakin/Library/Mobile Documents/com~apple~CloudDocs/LAIDIES/"
    "Website-homepage/assets/video/episode-04-full-v2.mp4"
)
NAME = "LAiDIES EP04 v2 Motion"
DURATION = 1_222_400_000
UUID_RE = re.compile(r"^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$")


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, data) -> None:
    temp = path.with_name(path.name + ".codex-tmp")
    temp.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    os.replace(temp, path)


def backup_once(path: Path, suffix: str) -> None:
    backup = path.with_name(path.name + suffix)
    if backup.exists():
        raise FileExistsError(f"Backup already exists; refusing a second registration pass: {backup}")
    shutil.copy2(path, backup)


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


def main() -> None:
    if not VIDEO.is_file():
        raise FileNotFoundError(VIDEO)
    target_info_path = TARGET / "draft_info.json"
    target_meta_path = TARGET / "draft_meta_info.json"
    project_path = TARGET / "Timelines/project.json"
    target_info = read(target_info_path)
    target_meta = read(target_meta_path)
    if target_info.get("duration") != 0 or target_info.get("tracks") or target_info["materials"]["videos"]:
        raise RuntimeError("Target CapCut shell is no longer empty; refusing to modify it")
    if target_meta.get("tm_duration") != 0:
        raise RuntimeError("Target CapCut metadata is no longer empty; refusing to modify it")

    project_media = TARGET / "assets/video" / VIDEO.name
    project_media.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(VIDEO, project_media)

    backup_once(ROOT_META, ".codex-ep04-v2.bak")
    backup_once(target_info_path, ".codex-empty.bak")
    backup_once(target_meta_path, ".codex-empty.bak")
    backup_once(project_path, ".codex-empty.bak")

    template_info = read(TEMPLATE / "draft_info.json")
    mapping = {template_info["id"]: target_info["id"]}
    draft_info = remap_uuids(template_info, mapping)
    draft_info["duration"] = DURATION
    draft_info["platform"] = target_info["platform"]
    draft_info["last_modified_platform"] = target_info["last_modified_platform"]
    material = draft_info["materials"]["videos"][0]
    material["path"] = str(project_media)
    material["material_name"] = VIDEO.name
    material["duration"] = DURATION
    local_material_id = material["local_material_id"]
    draft_info["tracks"][0]["segments"][0]["source_timerange"]["duration"] = DURATION
    draft_info["tracks"][0]["segments"][0]["target_timerange"]["duration"] = DURATION

    now_us = int(time.time() * 1_000_000)
    now_s = now_us // 1_000_000
    size = VIDEO.stat().st_size
    meta = target_meta
    meta["draft_name"] = NAME
    meta["tm_duration"] = DURATION
    meta["tm_draft_modified"] = now_us
    meta["draft_timeline_materials_size_"] = size
    video_material = {
        "ai_group_type": "",
        "create_time": now_s,
        "duration": DURATION,
        "enter_from": 0,
        "extra_info": VIDEO.name,
        "file_Path": str(project_media),
        "height": 1080,
        "id": local_material_id,
        "import_time": now_s,
        "import_time_ms": now_us,
        "item_source": 1,
        "material_color_tag": "",
        "md5": "",
        "metetype": "video",
        "roughcut_time_range": {"duration": DURATION, "start": 0},
        "sub_time_range": {"duration": -1, "start": -1},
        "type": 0,
        "width": 1920,
    }
    next(item for item in meta["draft_materials"] if item["type"] == 0)["value"] = [video_material]

    project = read(project_path)
    if project["main_timeline_id"] != target_info["id"]:
        raise RuntimeError("Target project/timeline IDs do not agree")
    project["timelines"][0]["name"] = "EP04 Motion v2"
    project["update_time"] = now_us
    project["timelines"][0]["update_time"] = now_us

    root = read(ROOT_META)
    matches = [entry for entry in root["all_draft_store"] if entry["draft_id"] == target_meta["draft_id"]]
    if len(matches) != 1:
        raise RuntimeError(f"Expected one root index entry, found {len(matches)}")
    entry = matches[0]
    if entry.get("tm_duration") != 0:
        raise RuntimeError("Root index says target is no longer empty")
    entry["draft_name"] = NAME
    entry["tm_duration"] = DURATION
    entry["tm_draft_modified"] = now_us
    entry["draft_timeline_materials_size"] = size

    atomic_write(target_info_path, draft_info)
    atomic_write(target_meta_path, meta)
    atomic_write(project_path, project)
    atomic_write(ROOT_META, root)
    print(TARGET)


if __name__ == "__main__":
    main()
