#!/usr/bin/env python3
"""Build the revised EP04 v5 without overwriting the earlier v5 delivery."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


HERE = Path(__file__).resolve().parent
SOURCE = HERE / "build-episode-04-full-v5.py"
SPEC = importlib.util.spec_from_file_location("ep04_v5_revised_assembly", SOURCE)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError(f"Could not load v5 assembly: {SOURCE}")
assembly = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = assembly
SPEC.loader.exec_module(assembly)

DELIVERY = HERE / "delivery-20260722-ep04-v5-brief-correction"
DELIVERY.mkdir(parents=True, exist_ok=True)
assembly.OUTPUT = DELIVERY / "episode-04-full-v5.mp4"
assembly.REPORT = DELIVERY / "episode-04-full-v5-qc.json"


if __name__ == "__main__":
    assembly.main()
