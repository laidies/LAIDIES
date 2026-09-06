#!/usr/bin/env python3
import json
import os
import subprocess
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[2]

payload = json.load(sys.stdin)
if payload.get("stop_hook_active"):
    print(json.dumps({"continue": True}))
    raise SystemExit(0)

projection_path = os.environ.get(
    "LAIDIES_WORK_PROJECTION_PATH",
    "operations/runtime/work-current-projection.json"
)
result = subprocess.run(
    ["node", "scripts/project-work-events.mjs"],
    cwd=root, capture_output=True, text=True, timeout=15
)
if result.returncode:
    reason = (result.stderr or result.stdout).strip()
    print(json.dumps({"decision": "block", "reason": "Work events are invalid. Fix them before ending the turn:\n" + reason[:6000]}))
    raise SystemExit(0)

try:
    with open(root / projection_path, "r", encoding="utf-8") as handle:
        recorded = json.load(handle)
    expected = json.loads(result.stdout)
except (OSError, json.JSONDecodeError) as error:
    print(json.dumps({"decision": "block", "reason": f"Derived work projection is missing or invalid: {error}"}))
    raise SystemExit(0)

if recorded != expected:
    print(json.dumps({
        "decision": "block",
        "reason": "Derived work projection is stale. Run: node scripts/project-work-events.mjs > operations/runtime/work-current-projection.json"
    }))
else:
    # Scope only the admitted task for this session; unrelated work never blocks it.
    session_id = payload.get("session_id")
    scoped = [item for item in expected["items"] if item.get("recovery_scope", {}).get("session_id") == session_id] if session_id else []
    unfinished = [item for item in scoped if item["status"] not in ("RESOLVED", "STOPPED")]
    if unfinished and any(item["status"] != "WAITING_EXTERNAL" for item in unfinished):
        item = unfinished[0]
        print(json.dumps({"decision": "block", "reason": f"The governing task {item['work_id']} remains {item['status']}: {item['title']}. A subsidiary commit or deployment is not completion. Continue, or record the actual external dependency with owner and next trigger. Do not invent a blocker."}))
    else:
        print(json.dumps({"continue": True}))
