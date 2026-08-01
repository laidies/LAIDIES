#!/usr/bin/env python3
"""Validate the Episode 03 p46 three-claim Try-On repair sequence."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_validator", ROOT / "scripts/validate-episode-03-perm-timeline-review-v1.py")
validator = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(validator)
validator.SEQUENCE = validator.PACKET / "review-sequences/p46-three-claim-tryon-review-v1.mp4"
validator.BUILD = validator.PACKET / "review-sequences/p46-three-claim-tryon-review-v1-build.json"
validator.OUTPUT = validator.PACKET / "p46-three-claim-tryon-review-v1-validation.json"
validator.EXPECTED_DURATION = 30.9
validator.EXPECTED_FRAMES = 927
validator.EXPECTED_SEGMENTS = 6
validator.main()
