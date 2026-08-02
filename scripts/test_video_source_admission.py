#!/usr/bin/env python3
"""Executable regression test for the source-admission build stop."""

import hashlib
import json
import tempfile
from pathlib import Path

from video_source_admission import validate_video_source_admission


ROOT = Path(__file__).resolve().parents[1]
REJECTED = ROOT / "operations/video-qa/trailer-multicolour-outfit-candidates-v1/manifest.json"


errors = validate_video_source_admission(REJECTED, ROOT)
required = (
    "not ADMITTED",
    "approved_for_assembly",
    "unresolved decision_required_before_binding",
    "opening_pilot.verdict",
)
for fragment in required:
    if not any(fragment in error for error in errors):
        raise SystemExit(f"VIDEO SOURCE ADMISSION TEST FAIL: missing {fragment!r}\n" + "\n".join(errors))


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


with tempfile.TemporaryDirectory(prefix="video-admission-test-", dir=ROOT / "operations/video-qa") as directory:
    folder = Path(directory)
    candidate = folder / "candidate.png"
    reference = folder / "reference.png"
    receipt = folder / "receipt.json"
    comparison = folder / "comparison.jpg"
    pilot = folder / "pilot.mp4"
    for path, content in (
        (candidate, b"candidate"),
        (reference, b"reference"),
        (receipt, b"{}\n"),
        (comparison, b"comparison"),
        (pilot, b"pilot"),
    ):
        path.write_bytes(content)

    binding = lambda path: {"path": str(path.relative_to(ROOT)), "sha256": sha256(path)}
    manifest = {
        "schema": "laidies.video-source-admission.v1",
        "status": "ADMITTED",
        "maker_id": "maker",
        "reviewer_id": "independent-reviewer",
        "binding": {"approved_for_assembly": True},
        "admission_receipt": binding(receipt),
        "comparison_evidence": binding(comparison),
        "approved_references": [{"role": "character and wardrobe", **binding(reference)}],
        "candidates": [{
            "occurrence_id": "opening",
            "verdict": "PASS",
            **binding(candidate),
            "checks": {check: "PASS" for check in (
                "character_identity", "wardrobe_continuity", "location_current", "canon_role",
                "source_current_not_retired", "visual_style", "narration_fit", "story_comprehension",
            )},
            "motion_plan": {
                "camera_only": False,
                "type": "environment",
                "narration_event": "SUNNYVAiLE arrival visibly changes the setting",
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
    manifest_path = folder / "manifest.json"
    manifest_path.write_text(json.dumps(manifest))
    valid_errors = validate_video_source_admission(manifest_path, ROOT, [candidate])
    if valid_errors:
        raise SystemExit("VIDEO SOURCE ADMISSION TEST FAIL: valid fixture rejected\n" + "\n".join(valid_errors))

print("VIDEO SOURCE ADMISSION TEST PASS")
print(f"known_unadmitted_manifest_errors={len(errors)}")
