#!/usr/bin/env python3
import json
import os
import subprocess
import sys

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
    capture_output=True, text=True, timeout=15
)
if result.returncode:
    reason = (result.stderr or result.stdout).strip()
    print(json.dumps({"decision": "block", "reason": "Work events are invalid. Fix them before ending the turn:\n" + reason[:6000]}))
    raise SystemExit(0)

try:
    with open(projection_path, "r", encoding="utf-8") as handle:
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
    print(json.dumps({"continue": True}))
