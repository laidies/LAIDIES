#!/usr/bin/env python3
"""Register the revised-brief EP04 v5 master in CapCut project 0722.

The corrected visible master uses the required abstract-stage transformation at
beat 13. The earlier v5 project asset and project state are preserved as
recoverable history. Existing project JSON files receive a new, one-time backup
before atomic rewrites.
"""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DELIVERY = ROOT / "assets/video/delivery-20260722-ep04-v5-brief-correction"
SOURCE = DELIVERY / "episode-04-full-v5.mp4"
QC = DELIVERY / "episode-04-full-v5-qc.json"
PROJECTS = Path("/Users/alisoneakin/Movies/CapCut/User Data/Projects/com.lveditor.draft")
TARGET = PROJECTS / "0722"
ROOT_META = PROJECTS / "root_meta_info.json"
PROJECT_ASSET = TARGET / "assets/video/brief-correction/episode-04-full-v5.mp4"
END_US = 1_222_400_000
PROJECT_NAME = "LAiDIES EP04 v5 Revised Brief Assembly"
BACKUP_SUFFIX = ".codex-v5-mainstreet-banned.bak"


def read(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def atomic_write(path: Path, value) -> None:
    temporary = path.with_name(path.name + ".codex-tmp")
    temporary.write_text(json.dumps(value, separators=(",", ":")), encoding="utf-8")
    os.replace(temporary, path)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def backup_once(path: Path) -> None:
    backup = path.with_name(path.name + BACKUP_SUFFIX)
    if backup.exists():
        raise FileExistsError(f"Refusing a second revised-brief registration pass: {backup}")
    shutil.copy2(path, backup)


def switch_master(info: dict, revised_path: Path) -> tuple[str, str]:
    tracks = [track for track in info["tracks"] if track.get("name", "").startswith("V5 MASTER")]
    if len(tracks) != 1 or len(tracks[0].get("segments", [])) != 1:
        raise RuntimeError("Expected one visible V5 MASTER track")
    track = tracks[0]
    segment = track["segments"][0]
    matches = [
        material
        for material in info["materials"]["videos"]
        if material["id"] == segment["material_id"]
    ]
    if len(matches) != 1:
        raise RuntimeError("Could not resolve the visible v5 master material")
    material = matches[0]
    if material.get("material_name") != "episode-04-full-v5.mp4":
        raise RuntimeError(f"Unexpected visible master: {material.get('material_name')}")
    material["path"] = str(revised_path)
    material["duration"] = END_US
    material["has_audio"] = True
    track["name"] = (
        "V5 MASTER — revised brief, abstract-stage beat 13, 57 beats, clean"
    )
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
        raise RuntimeError("Corrected QC does not identify a clean captions-off render")
    if report.get("placement_count") != 57:
        raise RuntimeError("Corrected QC does not contain all 57 placements")
    if report.get("title_start_seconds") != 37.1:
        raise RuntimeError("Corrected title is not locked to 0:37.10")
    if report.get("runtime_seconds") != 1222.4:
        raise RuntimeError("Corrected runtime is not 20:22.40")
    if report.get("output_size_bytes") != SOURCE.stat().st_size:
        raise RuntimeError("Corrected source size disagrees with QC")
    if report.get("output_sha256") != sha256(SOURCE):
        raise RuntimeError("Corrected source hash disagrees with QC")

    beat13 = [item for item in report["placements"] if item["placement"] == 13]
    if len(beat13) != 1:
        raise RuntimeError("Corrected QC does not contain exactly one beat 13")
    beat13_source = beat13[0]["source"]
    if "delivery-20260722-animation-v5-brief-correction" not in beat13_source:
        raise RuntimeError("Beat 13 is not the repaired abstract-stage delivery clip")
    if "15f" in beat13_source or "main-street" in beat13_source.lower():
        raise RuntimeError("Banned Main Street beat 13 source is still present")

    info_path = TARGET / "draft_info.json"
    info = read(info_path)
    nested_info_path = TARGET / "Timelines" / info["id"] / "draft_info.json"
    meta_path = TARGET / "draft_meta_info.json"
    manifest_path = TARGET / "assembly-manifest.json"
    project_path = TARGET / "Timelines/project.json"
    project_jsons = (
        info_path,
        nested_info_path,
        meta_path,
        manifest_path,
        project_path,
        ROOT_META,
    )
    for path in project_jsons:
        if not path.is_file():
            raise FileNotFoundError(path)
        backup = path.with_name(path.name + BACKUP_SUFFIX)
        if backup.exists():
            raise FileExistsError(
                f"Refusing a second revised-brief registration pass: {backup}"
            )
    if PROJECT_ASSET.exists():
        raise FileExistsError(PROJECT_ASSET)

    nested = read(nested_info_path)
    local_id, material_id = switch_master(info, PROJECT_ASSET)
    nested_local_id, nested_material_id = switch_master(nested, PROJECT_ASSET)
    if (local_id, material_id) != (nested_local_id, nested_material_id):
        raise RuntimeError("Root and nested CapCut timelines disagree on the visible master")

    meta = read(meta_path)
    meta["draft_name"] = PROJECT_NAME
    meta_materials = next(item for item in meta["draft_materials"] if item["type"] == 0)[
        "value"
    ]
    meta_matches = [item for item in meta_materials if item.get("id") == local_id]
    if len(meta_matches) != 1:
        raise RuntimeError("Could not resolve the visible v5 master in CapCut metadata")
    meta_material = meta_matches[0]
    meta_material["file_Path"] = str(PROJECT_ASSET)
    meta_material["extra_info"] = PROJECT_ASSET.name
    meta_material["duration"] = END_US
    meta_material["metetype"] = "video"

    manifest = read(manifest_path)
    manifest.update(
        {
            "project_name": PROJECT_NAME,
            "runtime_us": END_US,
            "placement_count": 57,
            "master": str(PROJECT_ASSET),
            "source_delivery_master": str(SOURCE),
            "captions": "off — website player uses assets/captions/episode-04.vtt",
            "captions_off_reexport": True,
            "animation_v5": True,
            "revised_brief_correction": True,
            "title_start_seconds": 37.1,
            "motion_clip_count": 45,
            "generated_motion_clip_count": 29,
            "regenerated_motion_clip_count": 3,
            "abstract_stage_beat13": True,
            "banned_main_street_15f_used": False,
            "beat13_source": beat13_source,
            "brief_correction_delivery_folder": str(DELIVERY),
            "reroll_delivery_folder": str(
                ROOT
                / "assets/episodes/ep-04/pixel/delivery-20260722-animation-v5-rerolls"
            ),
            "note": (
                "Visible master is the verified revised-brief 57-beat v5 export. "
                "Beat 13 is the abstract-stage corporate-suit to magic-cloud to "
                "yellow-outfit reveal. The earlier v5 asset and source tracks remain "
                "preserved as recoverable history."
            ),
        }
    )

    project = read(project_path)
    now_us = int(time.time() * 1_000_000)
    project["update_time"] = now_us
    timelines = [item for item in project["timelines"] if item["id"] == info["id"]]
    if len(timelines) != 1:
        raise RuntimeError("Could not resolve the CapCut timeline name")
    timelines[0]["name"] = "EP04 v5 revised — abstract-stage beat 13"
    timelines[0]["update_time"] = now_us

    root = read(ROOT_META)
    root_matches = [
        entry for entry in root["all_draft_store"] if entry["draft_id"] == meta["draft_id"]
    ]
    if len(root_matches) != 1:
        raise RuntimeError("Could not resolve project 0722 in CapCut root metadata")
    root_entry = root_matches[0]

    PROJECT_ASSET.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SOURCE, PROJECT_ASSET)
    if PROJECT_ASSET.stat().st_size != SOURCE.stat().st_size:
        raise RuntimeError("CapCut project copy is incomplete")
    if sha256(PROJECT_ASSET) != report["output_sha256"]:
        raise RuntimeError("CapCut project copy hash disagrees with corrected master")

    for path in project_jsons:
        backup_once(path)

    info["update_time"] = now_us
    nested["update_time"] = now_us
    size = sum(path.stat().st_size for path in TARGET.rglob("*") if path.is_file())
    meta["tm_draft_modified"] = now_us
    meta["draft_timeline_materials_size_"] = size
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
    print(PROJECT_ASSET)
    print(report["output_sha256"])


if __name__ == "__main__":
    main()
