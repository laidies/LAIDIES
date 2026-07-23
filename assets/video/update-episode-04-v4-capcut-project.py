#!/usr/bin/env python3
"""Switch CapCut project 0722 from the captioned v3 master to clean v4.

The 54-placement editable source and crossfade tracks are left byte-for-byte
unchanged. Only the visible one-segment export-master material is repointed to
the captions-off v4 file, matching ep04-captions-off-reexport.md.
"""

from __future__ import annotations

import json
import os
import shutil
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "assets/video/episode-04-full-v4.mp4"
QC = ROOT / "assets/video/episode-04-full-v4-qc.json"
PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
TARGET = PROJECTS / "0722"
ROOT_META = PROJECTS / "root_meta_info.json"
END_US = 1_222_400_000


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, value) -> None:
    temporary = path.with_name(path.name + ".codex-tmp")
    temporary.write_text(json.dumps(value, separators=(",", ":")), encoding="utf-8")
    os.replace(temporary, path)


def backup_once(path: Path) -> None:
    backup = path.with_name(path.name + ".codex-captioned-v3.bak")
    if backup.exists():
        raise FileExistsError(f"Refusing a second master switch: {backup}")
    shutil.copy2(path, backup)


def switch(info: dict, v4_path: Path) -> tuple[str, str]:
    tracks = [track for track in info["tracks"] if track.get("name", "").startswith("V3 MASTER")]
    if len(tracks) != 1 or len(tracks[0].get("segments", [])) != 1:
        raise RuntimeError("Expected one one-segment V3 MASTER track")
    track = tracks[0]
    segment = track["segments"][0]
    materials = [material for material in info["materials"]["videos"] if material["id"] == segment["material_id"]]
    if len(materials) != 1:
        raise RuntimeError("Could not resolve the current master material")
    material = materials[0]
    if material.get("material_name") != "episode-04-full-v3.mp4":
        raise RuntimeError(f"Unexpected current master: {material.get('material_name')}")
    material["path"] = str(v4_path)
    material["material_name"] = v4_path.name
    material["duration"] = END_US
    material["has_audio"] = True
    track["name"] = "V4 MASTER — clean picture + narration (captions off)"
    return material["local_material_id"], material["id"]


def main() -> None:
    for path in (SOURCE, QC, ROOT_META, TARGET / "draft_info.json", TARGET / "draft_meta_info.json"):
        if not path.is_file():
            raise FileNotFoundError(path)
    report = read(QC)
    if report.get("captions_burned") is not False:
        raise RuntimeError("V4 QC report does not identify a captions-off render")
    if report["probe"]["duration_seconds"] != 1222.4:
        raise RuntimeError("V4 runtime is not 20:22.40")

    project_v4 = TARGET / "assets/video" / SOURCE.name
    if project_v4.exists():
        raise FileExistsError(project_v4)
    shutil.copy2(SOURCE, project_v4)

    info_path = TARGET / "draft_info.json"
    info = read(info_path)
    nested_info_path = TARGET / "Timelines" / info["id"] / "draft_info.json"
    meta_path = TARGET / "draft_meta_info.json"
    manifest_path = TARGET / "assembly-manifest.json"
    for path in (info_path, nested_info_path, meta_path, manifest_path, ROOT_META):
        backup_once(path)

    nested = read(nested_info_path)
    local_id, material_id = switch(info, project_v4)
    nested_local_id, nested_material_id = switch(nested, project_v4)
    if (local_id, material_id) != (nested_local_id, nested_material_id):
        raise RuntimeError("Root and nested CapCut timelines disagree on the master")

    meta = read(meta_path)
    meta_materials = next(item for item in meta["draft_materials"] if item["type"] == 0)["value"]
    meta_matches = [item for item in meta_materials if item.get("id") == local_id]
    if len(meta_matches) != 1:
        raise RuntimeError("Could not resolve the master in CapCut metadata")
    meta_material = meta_matches[0]
    meta_material["file_Path"] = str(project_v4)
    meta_material["extra_info"] = project_v4.name
    meta_material["duration"] = END_US
    meta_material["metetype"] = "video"

    manifest = read(manifest_path)
    manifest["master"] = str(project_v4)
    manifest["captions"] = "off — website player uses assets/captions/episode-04.vtt"
    manifest["note"] = "Visible master is the verified captions-off v4 export; editable source and crossfade tracks are unchanged underneath."
    manifest["captions_off_reexport"] = True

    now_us = int(time.time() * 1_000_000)
    info["update_time"] = now_us
    nested["update_time"] = now_us
    size = sum(path.stat().st_size for path in TARGET.rglob("*") if path.is_file())
    meta["tm_draft_modified"] = now_us
    meta["draft_timeline_materials_size_"] = size
    root = read(ROOT_META)
    matches = [entry for entry in root["all_draft_store"] if entry["draft_id"] == meta["draft_id"]]
    if len(matches) != 1:
        raise RuntimeError("Could not resolve project 0722 in CapCut root metadata")
    matches[0]["tm_draft_modified"] = now_us
    matches[0]["tm_duration"] = END_US
    matches[0]["draft_timeline_materials_size"] = size

    atomic_write(info_path, info)
    atomic_write(nested_info_path, nested)
    atomic_write(meta_path, meta)
    atomic_write(manifest_path, manifest)
    atomic_write(ROOT_META, root)
    print(TARGET)
    print(project_v4)


if __name__ == "__main__":
    main()
