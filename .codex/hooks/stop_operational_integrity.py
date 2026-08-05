#!/usr/bin/env python3
import json
import subprocess
import sys

payload = json.load(sys.stdin)
if payload.get("stop_hook_active"):
    print(json.dumps({"continue": True}))
    raise SystemExit(0)

result = subprocess.run(
    ["node", "scripts/check-operational-integrity.mjs"],
    capture_output=True, text=True, timeout=15
)
if result.returncode:
    reason = (result.stderr or result.stdout).strip()
    print(json.dumps({"decision": "block", "reason": "Shared operating truth is contradictory. Fix this before ending the turn:\n" + reason[:6000]}))
else:
    print(json.dumps({"continue": True}))
