#!/usr/bin/env python3
"""Default-deny admission boundary for LAiDIES media builders.

This is intentionally a *build-time* guard. A render/assembly script may run
only when the exact builder bytes and every declared input are bound to an
ADMITTED video-source manifest. Review after rendering is not a substitute.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from video_source_admission import AdmissionError, require_video_source_admission


REGISTRY_RELATIVE = Path("operations/video-qa/media-builder-admission-registry.json")
ALLOWED_STATUSES = {"ADMITTED", "BLOCKED", "FROZEN_INPUT", "RETIRED", "EVIDENCE_ONLY"}


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _inside(root: Path, relative: str, label: str) -> Path:
    target = (root / relative).resolve()
    try:
        target.relative_to(root)
    except ValueError as error:
        raise AdmissionError(f"{label} resolves outside repository root") from error
    return target


def require_media_builder_admission(
    builder_path: Path,
    repository_root: Path,
    registry_path: Path | None = None,
) -> None:
    """Stop unless the exact builder and its exact inputs are admitted."""

    root = repository_root.resolve()
    builder = builder_path.resolve()
    try:
        builder_relative = builder.relative_to(root).as_posix()
    except ValueError as error:
        raise AdmissionError("media builder resolves outside repository root") from error

    registry_file = (registry_path or (root / REGISTRY_RELATIVE)).resolve()
    if not registry_file.exists():
        raise AdmissionError(f"MEDIA BUILD ADMISSION FAIL: registry missing: {registry_file}")
    registry = json.loads(registry_file.read_text())
    if registry.get("schema") != "laidies.media-builder-admission-registry.v1":
        raise AdmissionError("MEDIA BUILD ADMISSION FAIL: invalid registry schema")

    entry = (registry.get("builders") or {}).get(builder_relative)
    if not isinstance(entry, dict):
        raise AdmissionError(
            f"MEDIA BUILD ADMISSION FAIL: unregistered builder {builder_relative}; default deny"
        )
    status = entry.get("status")
    if status not in ALLOWED_STATUSES:
        raise AdmissionError(f"MEDIA BUILD ADMISSION FAIL: invalid status {status!r}")
    if status != "ADMITTED":
        reason = entry.get("reason") or "no admitted source package"
        raise AdmissionError(
            f"MEDIA BUILD ADMISSION FAIL: {builder_relative} is {status}: {reason}"
        )

    expected_builder_sha = entry.get("builder_sha256")
    if not expected_builder_sha or _sha256(builder) != expected_builder_sha:
        raise AdmissionError("MEDIA BUILD ADMISSION FAIL: exact builder checksum is not admitted")

    manifest_binding = entry.get("source_manifest") or {}
    manifest_relative = manifest_binding.get("path")
    manifest_sha = manifest_binding.get("sha256")
    if not manifest_relative or not manifest_sha:
        raise AdmissionError("MEDIA BUILD ADMISSION FAIL: source manifest binding is incomplete")
    manifest = _inside(root, manifest_relative, "source manifest")
    if not manifest.exists() or _sha256(manifest) != manifest_sha:
        raise AdmissionError("MEDIA BUILD ADMISSION FAIL: source manifest missing or changed")

    required_sources: list[Path] = []
    for index, binding in enumerate(entry.get("required_sources") or [], start=1):
        relative = binding.get("path") if isinstance(binding, dict) else None
        expected = binding.get("sha256") if isinstance(binding, dict) else None
        if not relative or not expected:
            raise AdmissionError(f"MEDIA BUILD ADMISSION FAIL: required source {index} is incomplete")
        source = _inside(root, relative, f"required source {index}")
        if not source.exists() or _sha256(source) != expected:
            raise AdmissionError(
                f"MEDIA BUILD ADMISSION FAIL: required source missing or changed: {relative}"
            )
        required_sources.append(source)

    if not required_sources:
        raise AdmissionError("MEDIA BUILD ADMISSION FAIL: no exact required sources are bound")

    require_video_source_admission(manifest, root, required_sources)
