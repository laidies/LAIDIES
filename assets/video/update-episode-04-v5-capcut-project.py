#!/usr/bin/env python3
"""Register the verified EP04 v5 master in CapCut project 0722.

The captions-off v4 master and the legacy 54-placement source tracks remain in
the project as recoverable history. The visible/export track is repointed to the
57-beat v5 animation master. Existing project files are backed up once before
atomic rewrites.
"""

from __future__ import annotations

import json
import os
import shutil
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/video/episode-04-full-v5.mp4"
QC = ROOT / "assets/video/episode-04-full-v5-qc.json"
PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
TARGET = PROJECTS / "0722"
ROOT_META = PROJECTS / "root_meta_info.json"
END_US = 1_222_400_000
PROJECT_NAME = "LAiDIES EP04 v5 Animation Assembly"
BACKUP_SUFFIX = ".codex-clean-v4.bak"


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, value) -> None:
    temporary = path.with_name(path.name + ".codex-tmp")
    temporary.write_text(json.dumps(value, separators=(",", ":")), encoding="utf-8")
    os.replace(temporary, path)


def backup_once(path: Path) -> None:
    backup = path.with_name(path.name + BACKUP_SUFFIX)
    if backup.exists():
        raise FileExistsError(f"Refusing a second v5 registration pass: {backup}")
    shutil.copy2(path, backup)


def switch_master(info: dict, v5_path: Path) -> tuple[str, str]:
    tracks = [track for track in info["tracks"] if track.get("name", "").startswith("V4 MASTER")]
    if len(tracks) != 1 or len(tracks[0].get("segments", [])) != 1:
        raise RuntimeError("Expected one visible V4 MASTER track")
    track = tracks[0]
    segment = track["segments"][0]
    matches = [
        material
        for material in info["materials"]["videos"]
        if material["id"] == segment["material_id"]
    ]
    if len(matches) != 1:
        raise RuntimeError("Could not resolve the v4 master material")
    material = matches[0]
    if material.get("material_name") != "episode-04-full-v4.mp4":
        raise RuntimeError(f"Unexpected visible master: {material.get('material_name')}")
    material["path"] = str(v5_path)
    material["material_name"] = v5_path.name
    material["duration"] = END_US
    material["has_audio"] = True
    track["name"] = "V5 MASTER — 57 beats, full motion, clean picture + narration"
    for other in info["tracks"]:
        if other is track:
            continue
        name = other.get("name", "")
        if name.startswith("54 PLACEMENTS"):
            other["name"] = "V3 SOURCE ARCHIVE — 54 placements"
        elif name.startswith("0.45s STILL"):
            other["name"] = "V3 SOURCE ARCHIVE — still crossfades"
    info["name"] = PROJECT_NAME
    return material["local_material_id"], material["id"]


def main() -> None:
    required = [
        SOURCE,
        QC,
        ROOT_META,
        TARGET / "draft_info.json",
        TARGET / "draft_meta_info.json",
        TARGET / "assembly-manifest.json",
        TARGET / "Timelines/project.json",
    ]
    for path in required:
        if not path.is_file():
            raise FileNotFoundError(path)
    report = read(QC)
    if report.get("captions_burned") is not False:
        raise RuntimeError("V5 QC does not identify a clean captions-off render")
    if report.get("placement_count") != 57:
        raise RuntimeError("V5 QC does not contain all 57 placements")
    if report.get("title_start_seconds") != 37.1:
        raise RuntimeError("V5 title is not locked to 0:37.10")
    if report["probe"]["duration_seconds"] != 1222.4:
        raise RuntimeError("V5 runtime is not 20:22.40")

    project_v5 = TARGET / "assets/video" / SOURCE.name
    if project_v5.exists():
        raise FileExistsError(project_v5)
    shutil.copy2(SOURCE, project_v5)

    info_path = TARGET / "draft_info.json"
    info = read(info_path)
    nested_info_path = TARGET / "Timelines" / info["id"] / "draft_info.json"
    meta_path = TARGET / "draft_meta_info.json"
    manifest_path = TARGET / "assembly-manifest.json"
    project_path = TARGET / "Timelines/project.json"
    for path in (info_path, nested_info_path, meta_path, manifest_path, project_path, ROOT_META):
        backup_once(path)

    nested = read(nested_info_path)
    local_id, material_id = switch_master(info, project_v5)
    nested_local_id, nested_material_id = switch_master(nested, project_v5)
    if (local_id, material_id) != (nested_local_id, nested_material_id):
        raise RuntimeError("Root and nested CapCut timelines disagree on the visible master")

    meta = read(meta_path)
    meta["draft_name"] = PROJECT_NAME
    meta_materials = next(item for item in meta["draft_materials"] if item["type"] == 0)["value"]
    meta_matches = [item for item in meta_materials if item.get("id") == local_id]
    if len(meta_matches) != 1:
        raise RuntimeError("Could not resolve the v4 master in CapCut metadata")
    meta_material = meta_matches[0]
    meta_material["file_Path"] = str(project_v5)
    meta_material["extra_info"] = project_v5.name
    meta_material["duration"] = END_US
    meta_material["metetype"] = "video"

    manifest = read(manifest_path)
    manifest.update(
        {
            "project_name": PROJECT_NAME,
            "runtime_us": END_US,
            "placement_count": 57,
            "master": str(project_v5),
            "captions": "off — website player uses assets/captions/episode-04.vtt",
            "captions_off_reexport": True,
            "animation_v5": True,
            "title_start_seconds": 37.1,
            "motion_clip_count": 33,
            "reroll_delivery_folder": str(
                ROOT
                / "assets/episodes/ep-04/pixel/delivery-20260722-animation-v5-rerolls"
            ),
            "note": (
                "Visible master is the verified 57-beat v5 animation export. "
                "The prior 54-placement editable tracks remain underneath as a labeled archive."
            ),
        }
    )

    project = read(project_path)
    project["update_time"] = int(time.time() * 1_000_000)
    timelines = [item for item in project["timelines"] if item["id"] == info["id"]]
    if len(timelines) != 1:
        raise RuntimeError("Could not resolve the CapCut timeline name")
    timelines[0]["name"] = "EP04 v5 — 57 beats + animated master"
    timelines[0]["update_time"] = project["update_time"]

    now_us = int(time.time() * 1_000_000)
    info["update_time"] = now_us
    nested["update_time"] = now_us
    size = sum(path.stat().st_size for path in TARGET.rglob("*") if path.is_file())
    meta["tm_draft_modified"] = now_us
    meta["draft_timeline_materials_size_"] = size
    root = read(ROOT_META)
    root_matches = [
        entry for entry in root["all_draft_store"] if entry["draft_id"] == meta["draft_id"]
    ]
    if len(root_matches) != 1:
        raise RuntimeError("Could not resolve project 0722 in CapCut root metadata")
    root_entry = root_matches[0]
    root_entry["draft_name"] = PROJECT_NAME
    root_entry["tm_draft_modified"] = now_us
    root_entry["tm_duration"] = END_US
    root_entry["draft_timeline_materials_size"] = size

    atomic_write(info_path, info)
    atomic_write(nested_info_path, nested)
    atomic_write(meta_path, meta)
    atomic_write(manifest_path, manifest)
    atomic_write(project_path, project)
    atomic_write(ROOT_META, root)
    print(TARGET)
    print(project_v5)


if __name__ == "__main__":
    main()
