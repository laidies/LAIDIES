#!/usr/bin/env python3
"""Surgical captions-off re-export of the locked EP04 v3 assembly."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


HERE = Path(__file__).resolve().parent
SOURCE = HERE / "build-episode-04-full-v3.py"
SPEC = importlib.util.spec_from_file_location("ep04_v3_locked_assembly", SOURCE)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Could not load locked assembly: {SOURCE}")
assembly = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = assembly
SPEC.loader.exec_module(assembly)

# The captions-off brief authorizes exactly these output changes. Placements,
# one-shot/freeze behavior, transitions, narration, frame rate, and runtime all
# continue to come from the locked v3 assembler unchanged.
assembly.OUTPUT = assembly.ROOT / "assets/video/episode-04-full-v4.mp4"
assembly.REPORT = assembly.ROOT / "assets/video/episode-04-full-v4-qc.json"
assembly.PICTURE_W = 1920
assembly.PICTURE_H = 1080
assembly.PICTURE_X = 0
assembly.PICTURE_Y = 0
assembly.BURN_CAPTIONS = False


if __name__ == "__main__":
    assembly.main()
