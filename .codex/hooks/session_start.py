#!/usr/bin/env python3

import json
import os
import re
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
checker = root / "scripts" / "check-context-authority.mjs"
active_work_path = root / "operations" / "ACTIVE-WORK.md"

if not checker.is_file() or not active_work_path.is_file():
    raise SystemExit("SessionStart blocked: minimum context-authority packet is missing")

check = subprocess.run(
    ["node", str(checker)],
    cwd=root,
    text=True,
    capture_output=True,
    check=False,
)
if check.returncode != 0:
    raise SystemExit(f"SessionStart blocked: context authority failed\n{check.stdout}{check.stderr}")

active_work = active_work_path.read_text(encoding="utf-8")

def field(name):
    match = re.search(rf"^- \*\*{re.escape(name)}:\*\* (.+)$", active_work, re.MULTILINE)
    return match.group(1).strip() if match else "MISSING"

explicit_lane = os.environ.get("LAIDIES_CLAIMED_LANE", "").strip()
lane_context = (
    f"WRITE LANE — {explicit_lane}"
    if explicit_lane
    else "WRITE LANE — NONE. Name exact owned paths before material edits."
)

context = "\n".join([
    "LAiDIES MINIMUM CONTEXT PACKET",
    "Read AGENTS.md, operations/ACTIVE-WORK.md, operations/DECISIONS.md, then one routed task source.",
    "Do not preload archived registers, prototypes, the old Standing Card, or unrelated product dossiers.",
    f"CURRENT TASK — {field('Task ID')} / {field('Status')}",
    f"GOAL — {field('Goal')}",
    f"NEXT — {field('Next action')}",
    lane_context,
])

print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": context,
}}))
