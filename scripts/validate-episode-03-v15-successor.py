#!/usr/bin/env python3
"""Validate the local Episode 03 v15 successor without granting release authority."""

from __future__ import annotations

import importlib.util
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts/validate-episode-03-v14-successor.py"


def main() -> None:
    spec = importlib.util.spec_from_file_location("episode03_v14_validator", BASE_SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError("Could not load the frozen v14 validator")
    base = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(base)
    base.ASSEMBLY_RECEIPT = ROOT / "operations/video-qa/episode-03-v15-successor-assembly-2026-08-01.json"
    base.VALIDATION_RECEIPT = ROOT / "operations/video-qa/episode-03-v15-successor-validation-2026-08-01.json"
    base.CONTACT_SHEET = ROOT / "operations/video-qa/episode-03-v15-successor-midpoint-contact-sheet.jpg"
    base.validate()


if __name__ == "__main__":
    main()
