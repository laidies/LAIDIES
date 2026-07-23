#!/usr/bin/env python3
"""An agent may never create one of Ali's approval files.

The Wednesday Engine stops at four gates — the substance sheet, the art, the
cut, the publish. Each stop is a file: build/ep05/G1.approved and friends. The
Makefile never writes them. Ali's yes writes them.

If an agent can create one, the gate is decorative. So this refuses, always, no
matter how the write is dressed up (touch, echo >, cp, Write, Edit).

The only correct way for one of these to appear is: Ali says yes, in chat, and
the person or agent she said it to records it — which still goes through here
and is still refused, so the intended flow is that she runs the one-line command
herself, or the approval is recorded by a human at the terminal.
"""
import json
import re
import sys

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool = data.get("tool_name")
ti = data.get("tool_input") or {}

TARGET = re.compile(r"build/ep\d+/G\d\.approved")

hit = None
if tool == "Bash":
    cmd = str(ti.get("command") or "")
    if TARGET.search(cmd.replace("\\", "/")):
        hit = cmd
elif tool in ("Write", "Edit", "NotebookEdit"):
    fp = str(ti.get("file_path") or "").replace("\\", "/")
    if TARGET.search(fp):
        hit = fp

if not hit:
    sys.exit(0)

print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": (
        "BLOCKED — that is one of Ali's approval files:\n"
        "    %s\n\n"
        "The Wednesday Engine has four human gates. They are the only places the\n"
        "week is allowed to stop and wait for her judgement. An agent creating one\n"
        "does not 'move things along' — it removes the gate.\n\n"
        "What to do instead: tell her what is waiting, in one line, and let her run\n"
        "the command herself. She is the only one who can approve it."
        % hit
    ),
}}))
sys.exit(2)
