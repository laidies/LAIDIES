#!/usr/bin/env python3
import json
import sys

payload = json.load(sys.stdin)
tool_name = payload.get("tool_name", "")
tool_input = payload.get("tool_input") or {}
text = "\n".join(str(tool_input.get(key, "")) for key in ("command", "cmd", "patch", "path", "file_path"))
projection = "operations/runtime/work-current-projection.json"
allowed_generator = "node scripts/project-work-events.mjs"
legacy_work = "operations/runtime/work-resolution-loop.json"
event_log = "operations/runtime/work-events.jsonl"

if projection in text and allowed_generator not in text:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": "work-current-projection.json is generated from operations/runtime/work-events.jsonl. Append an event and regenerate; do not handwrite status."
        }
    }))
    raise SystemExit(2)

if legacy_work in text and event_log not in text:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": "work-resolution-loop.json is a temporary legacy mirror. Any mutation must include the matching append-only work-events.jsonl event in the same tool call so event parity cannot silently regress."
        }
    }))
    raise SystemExit(2)

print(json.dumps({"continue": True}))
