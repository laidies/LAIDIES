#!/usr/bin/env python3
import json
import os
from pathlib import Path

root = Path(__file__).resolve().parents[2]
lessons_path = Path(os.environ.get("LAIDIES_LESSONS_PATH", root / "operations" / "LESSONS-ACTIVE.md"))
if not lessons_path.is_file():
    raise SystemExit("SessionStart blocked: operations/LESSONS-ACTIVE.md is missing")

lessons = lessons_path.read_text(encoding="utf-8").strip()
if not lessons:
    raise SystemExit("SessionStart blocked: operations/LESSONS-ACTIVE.md is empty")

preamble = (
    "Before material LAiDIES work, follow operations/product-stewards/"
    "AUTONOMOUS-DELIVERY-RUNTIME.md and operations/assets/ASSET-CONTROL.md. "
    "Never send objective FAIL/HOLD work to Ali. Resolve production assets "
    "through the active registry, pilot before batching, and stop after two "
    "failed repair cycles for root-cause correction."
)

print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": f"{preamble}\n\nACTIVE LESSONS — apply only when relevant:\n{lessons}"
}}))
