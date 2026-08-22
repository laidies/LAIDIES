#!/usr/bin/env python3
"""Regression tests for default-deny media builder admission."""

from __future__ import annotations

import hashlib
import json
import tempfile
from pathlib import Path

from media_builder_admission import AdmissionError, require_media_builder_admission


ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "operations/video-qa/media-builder-admission-registry.json"
OPENING_BUILDERS = (
    "scripts/build-trailer-v8-multicolour-successor.py",
    "scripts/build-episode-01-full-v27-occurrence-repaired-review.py",
    "scripts/assemble-episode-02-v20-repaired-review.py",
    "scripts/assemble-episode-03-v15-successor.py",
    "scripts/build-odc-101-review-animatic.py",
    "scripts/build-odc-201-review-animatic.py",
    "scripts/build-odc-lab-01-review-animatic.py",
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


registry = json.loads(REGISTRY.read_text())
for relative in OPENING_BUILDERS:
    source = (ROOT / relative).read_text()
    if relative not in registry["builders"]:
        raise SystemExit(f"MEDIA BUILDER TEST FAIL: unregistered opening builder {relative}")
    if "require_media_builder_admission" not in source:
        raise SystemExit(f"MEDIA BUILDER TEST FAIL: guard missing from {relative}")
    try:
        require_media_builder_admission(ROOT / relative, ROOT)
    except AdmissionError as error:
        if "MEDIA BUILD ADMISSION FAIL" not in str(error):
            raise
    else:
        raise SystemExit(f"MEDIA BUILDER TEST FAIL: held builder ran: {relative}")

with tempfile.TemporaryDirectory(prefix="media-builder-admission-", dir=ROOT / "operations/video-qa") as directory:
    folder = Path(directory)
    builder = folder / "builder.py"
    candidate = folder / "candidate.png"
    reference = folder / "reference.png"
    receipt = folder / "receipt.json"
    comparison = folder / "comparison.jpg"
    pilot = folder / "pilot.mp4"
    for path, content in (
        (builder, b"print('admitted builder')\n"),
        (candidate, b"candidate"),
        (reference, b"reference"),
        (receipt, b"{}\n"),
        (comparison, b"comparison"),
        (pilot, b"pilot"),
    ):
        path.write_bytes(content)

    binding = lambda path: {"path": path.relative_to(ROOT).as_posix(), "sha256": sha256(path)}
    source_manifest = {
        "schema": "laidies.video-source-admission.v1",
        "status": "ADMITTED",
        "maker_id": "maker",
        "reviewer_id": "independent-reviewer",
        "binding": {"approved_for_assembly": True},
        "admission_receipt": binding(receipt),
        "comparison_evidence": binding(comparison),
        "approved_references": [{"role": "canon", **binding(reference)}],
        "candidates": [{
            "occurrence_id": "opening",
            "verdict": "PASS",
            **binding(candidate),
            "checks": {name: "PASS" for name in (
                "character_identity", "wardrobe_continuity", "location_current", "canon_role",
                "source_current_not_retired", "visual_style", "narration_fit", "story_comprehension",
            )},
            "motion_plan": {
                "camera_only": False,
                "type": "environment",
                "narration_event": "the setting visibly changes with the narration",
            },
        }],
        "opening_pilot": {
            "verdict": "PASS",
            "reviewer_id": "pilot-reviewer",
            "sound_on_normal_speed": True,
            "start_seconds": 0,
            "end_seconds": 300,
            "master": binding(pilot),
        },
    }
    manifest = folder / "source-manifest.json"
    manifest.write_text(json.dumps(source_manifest))
    test_registry = folder / "registry.json"
    test_registry.write_text(json.dumps({
        "schema": "laidies.media-builder-admission-registry.v1",
        "builders": {
            builder.relative_to(ROOT).as_posix(): {
                "status": "ADMITTED",
                "builder_sha256": sha256(builder),
                "source_manifest": binding(manifest),
                "required_sources": [binding(candidate)],
            }
        },
    }))
    require_media_builder_admission(builder, ROOT, test_registry)

print("MEDIA BUILDER ADMISSION TEST PASS")
print(f"opening_builders_blocked={len(OPENING_BUILDERS)}")
