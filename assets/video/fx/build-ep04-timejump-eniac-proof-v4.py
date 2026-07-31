#!/usr/bin/env python3
"""Render the final guarded revision of the distributed ENIAC motion proof."""

from __future__ import annotations

import importlib.util
from pathlib import Path


HERE = Path(__file__).resolve().parent
V3_SCRIPT = HERE / "build-ep04-timejump-eniac-proof-v3.py"

spec = importlib.util.spec_from_file_location("eniac_proof_v3", V3_SCRIPT)
if spec is None or spec.loader is None:
    raise RuntimeError(f"Could not load {V3_SCRIPT}")
v3 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v3)

v3.OUTPUT = v3.v1.PIXEL / "ep04-timejump-to-eniac-motion-proof-v4.mp4"
v3.MASK_PREVIEW = v3.v1.QA / "ep04-eniac-proof-lamp-mask-v4.jpg"


if __name__ == "__main__":
    v3.main()
