#!/usr/bin/env python3
"""Fail-closed source admission for LAiDIES video and animation builds.

This module deliberately checks evidence, not prose such as "identity retained".
A full-title builder must not consume generated or edited visual sources unless
an independent reviewer has bound the exact bytes, approved references,
occurrence-level canon checks, a meaningful-motion plan, and an opening pilot.
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path
from typing import Iterable


PASS = "PASS"
REQUIRED_CHECKS = (
    "character_identity",
    "wardrobe_continuity",
    "location_current",
    "canon_role",
    "source_current_not_retired",
    "visual_style",
    "narration_fit",
    "story_comprehension",
)
MEANINGFUL_MOTION_TYPES = {
    "character",
    "object",
    "environment",
    "interface_state",
    "diagram_state",
    "scene_transition",
    "mixed",
}


class AdmissionError(RuntimeError):
    """Raised when source bytes are not eligible for assembly."""


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _bound_file(root: Path, binding: dict, label: str, errors: list[str]) -> Path | None:
    relative = binding.get("path") if isinstance(binding, dict) else None
    expected = binding.get("sha256") if isinstance(binding, dict) else None
    if not relative or not expected:
        errors.append(f"{label} requires path and sha256")
        return None
    target = (root / relative).resolve()
    try:
        target.relative_to(root.resolve())
    except ValueError:
        errors.append(f"{label} resolves outside repository root")
        return None
    if not target.exists():
        errors.append(f"{label} is missing: {relative}")
        return None
    actual = _sha256(target)
    if actual != expected:
        errors.append(f"{label} checksum mismatch: {actual} != {expected}")
    return target


def validate_video_source_admission(
    manifest_path: Path,
    repository_root: Path,
    required_candidate_paths: Iterable[Path] = (),
) -> list[str]:
    """Return every release-blocking admission error for one source manifest."""

    manifest = json.loads(manifest_path.read_text())
    root = repository_root.resolve()
    errors: list[str] = []

    if manifest.get("schema") != "laidies.video-source-admission.v1":
        errors.append("manifest schema must be laidies.video-source-admission.v1")
    if manifest.get("status") != "ADMITTED":
        errors.append(f"source status is {manifest.get('status')!r}, not ADMITTED")

    binding = manifest.get("binding") or {}
    if binding.get("approved_for_assembly") is not True:
        errors.append("binding.approved_for_assembly must be true")
    if binding.get("decision_required_before_binding"):
        errors.append("an unresolved decision_required_before_binding remains")

    maker = manifest.get("maker_id")
    reviewer = manifest.get("reviewer_id")
    if not maker or not reviewer or maker == reviewer:
        errors.append("maker_id and an independent reviewer_id are required")

    _bound_file(root, manifest.get("admission_receipt") or {}, "admission receipt", errors)
    _bound_file(root, manifest.get("comparison_evidence") or {}, "comparison evidence", errors)

    references = manifest.get("approved_references")
    if not isinstance(references, list) or not references:
        errors.append("at least one exact approved reference is required")
    else:
        for index, reference in enumerate(references, start=1):
            if not reference.get("role"):
                errors.append(f"approved reference {index} requires a role")
            _bound_file(root, reference, f"approved reference {index}", errors)

    candidates = manifest.get("candidates")
    if not isinstance(candidates, list) or not candidates:
        errors.append("candidates must inventory every source occurrence")
        candidates = []

    candidate_by_path = {}
    for index, candidate in enumerate(candidates, start=1):
        label = candidate.get("occurrence_id") or f"candidate {index}"
        target = _bound_file(root, candidate, label, errors)
        if target:
            candidate_by_path[target] = candidate
        if candidate.get("verdict") != PASS:
            errors.append(f"{label} verdict must be PASS")
        checks = candidate.get("checks") or {}
        for check in REQUIRED_CHECKS:
            if checks.get(check) != PASS:
                errors.append(f"{label} check {check} must be PASS")
        motion = candidate.get("motion_plan") or {}
        if motion.get("camera_only") is not False:
            errors.append(f"{label} motion_plan.camera_only must be false")
        if motion.get("type") not in MEANINGFUL_MOTION_TYPES:
            errors.append(f"{label} requires a meaningful local motion type")
        if not motion.get("narration_event"):
            errors.append(f"{label} motion plan must name the narration event it depicts")

    for required in required_candidate_paths:
        resolved = required.resolve()
        if resolved not in candidate_by_path:
            errors.append(f"builder source is not occurrence-admitted: {required.relative_to(root)}")

    pilot = manifest.get("opening_pilot") or {}
    if pilot.get("verdict") != PASS:
        errors.append("opening_pilot.verdict must be PASS before full-title assembly")
    if pilot.get("reviewer_id") in (None, "", maker):
        errors.append("opening pilot requires an independent reviewer")
    if pilot.get("sound_on_normal_speed") is not True:
        errors.append("opening pilot must be reviewed sound-on at normal speed")
    if pilot.get("start_seconds") != 0 or not isinstance(pilot.get("end_seconds"), (int, float)) or pilot.get("end_seconds") < 300:
        errors.append("opening pilot must cover at least 00:00–05:00")
    _bound_file(root, pilot.get("master") or {}, "opening pilot master", errors)

    return errors


def require_video_source_admission(
    manifest_path: Path,
    repository_root: Path,
    required_candidate_paths: Iterable[Path] = (),
) -> None:
    errors = validate_video_source_admission(manifest_path, repository_root, required_candidate_paths)
    if errors:
        detail = "\n- ".join(errors)
        raise AdmissionError(f"VIDEO SOURCE ADMISSION FAIL\n- {detail}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python3 scripts/video_source_admission.py <manifest.json> [source ...]")
    repo = Path(__file__).resolve().parents[1]
    manifest_arg = Path(sys.argv[1]).resolve()
    source_args = [Path(item).resolve() for item in sys.argv[2:]]
    try:
        require_video_source_admission(manifest_arg, repo, source_args)
    except AdmissionError as error:
        raise SystemExit(str(error)) from error
    print("VIDEO SOURCE ADMISSION PASS")
