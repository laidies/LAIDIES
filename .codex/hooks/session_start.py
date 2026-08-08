#!/usr/bin/env python3
import json
import os
import hashlib
from pathlib import Path

root = Path(__file__).resolve().parents[2]
standing_card_path = Path(os.environ.get("LAIDIES_STANDING_CARD_PATH", root / "operations" / "runtime" / "STANDING-CARD.md"))
decisions_path = root / "operations" / "DECISIONS.md"
lessons_path = root / "operations" / "LESSONS-ACTIVE.md"
canon_path = root / "operations" / "voice" / "laidies-canon-index.md"
agreement_path = root / "operations" / "CODEX-WORKING-AGREEMENT.md"
queue_path = Path(os.environ.get("LAIDIES_RUN_QUEUE_PATH", root / "operations" / "product-stewards" / "run-queue.json"))
if not standing_card_path.is_file():
    raise SystemExit("SessionStart blocked: operations/runtime/STANDING-CARD.md is missing")
standing_card = standing_card_path.read_text(encoding="utf-8").strip()
if not standing_card:
    raise SystemExit("SessionStart blocked: operations/runtime/STANDING-CARD.md is empty")
for label, source_path in (("decisions", decisions_path), ("lessons", lessons_path), ("canon", canon_path), ("agreement", agreement_path)):
    if not source_path.is_file():
        raise SystemExit(f"SessionStart blocked: standing-card source {label} is missing")
    expected = hashlib.sha256(source_path.read_bytes()).hexdigest()
    if f"{label}-sha256: {expected}" not in standing_card:
        raise SystemExit("SessionStart blocked: STANDING-CARD.md is stale; run node scripts/build-standing-card.mjs")

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
        f"{preamble}\n\nSTANDING CARD — orientation only; retrieve exact authority when needed:\n{standing_card}"
        f"\n\n{lane_context}"
    )
}}))
