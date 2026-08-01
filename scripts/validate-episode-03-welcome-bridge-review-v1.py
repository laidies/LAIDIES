#!/usr/bin/env python3
"""Validate the Episode 03 p07 welcome-bridge repair sequence."""

from __future__ import annotations
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("ep03_sequence_validator", ROOT / "scripts/validate-episode-03-perm-timeline-review-v1.py")
validator = importlib.util.module_from_spec(spec)
assert spec.loader
spec.loader.exec_module(validator)
validator.SEQUENCE = validator.PACKET / "review-sequences/p07-welcome-bridge-review-v1.mp4"
validator.BUILD = validator.PACKET / "review-sequences/p07-welcome-bridge-review-v1-build.json"
validator.OUTPUT = validator.PACKET / "p07-welcome-bridge-review-v1-validation.json"
validator.EXPECTED_DURATION = 26.6
validator.EXPECTED_FRAMES = 798
validator.EXPECTED_SEGMENTS = 4
validator.main()
