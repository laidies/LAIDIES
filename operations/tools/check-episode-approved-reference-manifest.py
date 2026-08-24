#!/usr/bin/env python3
"""Fail closed when an approved episode reference pointer is missing or drifts."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DEFAULT_MANIFEST = ROOT / "operations/reference/episode-approved/manifest.json"


def validate(data: dict) -> list[str]:
    errors: list[str] = []
    if data.get("status") != "LOCKED_POINTERS_ONLY_NO_COPIED_ASSETS":
        errors.append("manifest status is not locked pointer-only")
    references = data.get("references")
    if not isinstance(references, list) or not references:
        return errors + ["references must be a non-empty list"]

    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for index, item in enumerate(references):
        prefix = f"references[{index}]"
        if not isinstance(item, dict):
            errors.append(f"{prefix} is not an object")
            continue
        ref_id = item.get("id")
        relpath = item.get("path")
        expected = item.get("sha256")
        if not isinstance(ref_id, str) or not ref_id:
            errors.append(f"{prefix} missing id")
        elif ref_id in seen_ids:
            errors.append(f"duplicate id {ref_id}")
        else:
            seen_ids.add(ref_id)
        if not isinstance(relpath, str) or not relpath:
            errors.append(f"{prefix} missing path")
            continue
        if relpath in seen_paths:
            errors.append(f"duplicate path {relpath}")
        seen_paths.add(relpath)
        if Path(relpath).is_absolute() or ".." in Path(relpath).parts:
            errors.append(f"unsafe path {relpath}")
            continue
        target = ROOT / relpath
        if not target.is_file():
            errors.append(f"missing file {relpath}")
            continue
        if not isinstance(expected, str) or len(expected) != 64:
            errors.append(f"invalid sha256 field {ref_id}")
            continue
        actual = hashlib.sha256(target.read_bytes()).hexdigest()
        if actual != expected:
            errors.append(f"checksum drift {ref_id}: expected {expected}, got {actual}")
    return errors


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", nargs="?", type=Path, default=DEFAULT_MANIFEST)
    parser.add_argument("--calibrate", action="store_true")
    args = parser.parse_args()
    data = json.loads(args.manifest.read_text(encoding="utf-8"))
    errors = validate(data)
    if errors:
        print("EPISODE APPROVED REFERENCE MANIFEST FAIL")
        print("\n".join(f"- {error}" for error in errors))
        raise SystemExit(1)

    if args.calibrate:
        bad = copy.deepcopy(data)
        bad["references"][0]["sha256"] = "0" * 64
        calibration_errors = validate(bad)
        if not any("checksum drift" in error for error in calibration_errors):
            print("EPISODE APPROVED REFERENCE MANIFEST CALIBRATION FAIL")
            raise SystemExit(1)
        print("EPISODE APPROVED REFERENCE MANIFEST CALIBRATION PASS")

    print(f"EPISODE APPROVED REFERENCE MANIFEST PASS references={len(data['references'])}")


if __name__ == "__main__":
    main()
