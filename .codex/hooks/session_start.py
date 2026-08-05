#!/usr/bin/env python3
import json
import os
from pathlib import Path

root = Path(__file__).resolve().parents[2]
decisions_path = Path(os.environ.get("LAIDIES_DECISIONS_PATH", root / "operations" / "DECISIONS.md"))
lessons_path = Path(os.environ.get("LAIDIES_LESSONS_PATH", root / "operations" / "LESSONS-ACTIVE.md"))
queue_path = Path(os.environ.get("LAIDIES_RUN_QUEUE_PATH", root / "operations" / "product-stewards" / "run-queue.json"))
if not decisions_path.is_file():
    raise SystemExit("SessionStart blocked: operations/DECISIONS.md is missing")
if not lessons_path.is_file():
    raise SystemExit("SessionStart blocked: operations/LESSONS-ACTIVE.md is missing")

decisions = decisions_path.read_text(encoding="utf-8").strip()
lessons = lessons_path.read_text(encoding="utf-8").strip()
if not decisions:
    raise SystemExit("SessionStart blocked: operations/DECISIONS.md is empty")
if not lessons:
    raise SystemExit("SessionStart blocked: operations/LESSONS-ACTIVE.md is empty")

explicit_lane = os.environ.get("LAIDIES_CLAIMED_LANE", "").strip()
if explicit_lane:
    lane_context = f"CLAIMED LANE — {explicit_lane}"
else:
    if not queue_path.is_file():
        raise SystemExit("SessionStart blocked: operations/product-stewards/run-queue.json is missing")
    try:
        queue = json.loads(queue_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise SystemExit(f"SessionStart blocked: run queue is unreadable: {error}")
    active = queue.get("active", [])
    if active:
        claims = ", ".join(
            f"{item.get('product_id', 'unknown')} ({item.get('claim_id', 'missing claim id')})"
            for item in active
        )
        lane_context = f"ACTIVE QUEUE CLAIMS — {claims}. Match the current task to one exact claim before writing."
    else:
        lane_context = (
            "CLAIMED LANE — NONE. The dispatcher remains paused; declare one bounded write lane "
            "for this task before material edits and do not pull a second queue item."
        )

preamble = (
    "Before material LAiDIES work, follow operations/product-stewards/"
    "AUTONOMOUS-DELIVERY-RUNTIME.md and operations/assets/ASSET-CONTROL.md. "
    "Never send objective FAIL/HOLD work to Ali. Resolve production assets "
    "through the active registry, pilot before batching, and stop after two "
    "failed repair cycles for root-cause correction."
)

print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": (
        f"{preamble}\n\nSETTLED DECISION ROUTER — search before asking or choosing:\n{decisions}"
        f"\n\nACTIVE LESSONS — apply only when relevant:\n{lessons}"
        f"\n\n{lane_context}"
    )
}}))
