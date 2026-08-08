#!/usr/bin/env python3
"""Refuse to write LAiDIES episode prose without having read the voice sources.

Built 2026-07-22, modelled on .claude/hooks/enforce-art-prompt.py, for the same
reason and after the same kind of failure.

WHAT HAPPENED: a draft came back carrying a product-comparison table — the exact
shape the writing lock names in its "What LAiDIES Is Not" list — minutes after
the rules had been quoted in the same conversation. The rules were present. The
rules were even RECITED. The draft violated them anyway.

The lesson is the one already learned about art prompts: a rule that is
remembered is a rule that is remembered DIFFERENTLY every time. So this does not
ask nicely. Any write to episode prose is DENIED unless the voice sources have
actually been opened with the Read tool in this session.

Required sources:
  operations/voice/laidies-writing-lock.md      — the standard
  operations/voice/laidies-teaching-pattern.md  — how a thing gets taught

If the second file does not exist yet, this hook says so LOUDLY and keeps
enforcing the first. It never falls open. This project has three documented bugs
where "nothing to check" was reported as "nothing wrong"; that is not repeated
here.
"""
import json
import os
import re
import sys

# ── read the hook payload ───────────────────────────────────────────────────
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

if data.get("tool_name") not in ("Write", "Edit", "NotebookEdit", "apply_patch"):
    sys.exit(0)

ti = data.get("tool_input") or {}
patch_command = str(ti.get("command") or "") if data.get("tool_name") == "apply_patch" else ""
paths = [str(ti.get("file_path") or "")]
paths.extend(re.findall(r"^\*\*\* (?:Add|Update|Delete) File: (.+)$", patch_command, re.MULTILINE))
paths = [candidate.replace("\\", "/") for candidate in paths if candidate]

# ── is this episode prose? ──────────────────────────────────────────────────
# Deliberately specific. This does not police the machinery, the operations
# notes, or the research documents — only the words a reader will read.
PROSE_PATTERNS = [
    r"operations/audio/episode-\d{2}[^/]*\.(txt|md)$",       # narration script
    r"content/episodes/episode-\d{2}\.canon\.md$",           # the master file
    r"content/episodes/episode-\d{2}\.substance\.md$",       # the substance sheet
    r"content/issues/issue-\d{2}\.md$",                      # the written article
    r"(^|/)issues/issue-\d{2}\.html$",                       # the article page
    r"social/episodes/issue-\d{2}[^/]*\.md$",                # social kits
    r"email/buttondown/issue-\d{2}\.md$",                    # the newsletter
    r"community/weekly-prompts/issue-\d{2}\.md$",            # the prompt
]
matched_paths = [candidate for candidate in paths if any(re.search(pattern, candidate) for pattern in PROSE_PATTERNS)]
if not matched_paths:
    sys.exit(0)

# Working copies, archives and rejects are not the show.
active_paths = []
for norm in matched_paths:
    base = os.path.basename(norm)
    if (".pre-" in base or ".stale-" in base
            or "/_superseded/" in norm or "/_rejected/" in norm
            or "/_archive/" in norm or "/.versions/" in norm):
        continue
    active_paths.append(norm)
if not active_paths:
    sys.exit(0)

body = str(ti.get("content") or ti.get("new_string") or patch_command)
if not body.strip():
    sys.exit(0)                      # a pure deletion carries no voice

# ── where do the voice sources live? ────────────────────────────────────────
here = os.path.dirname(os.path.abspath(__file__))
repo = os.path.dirname(os.path.dirname(here))          # -> Website-homepage/
VOICE = os.path.join(repo, "operations", "voice")

REQUIRED = [
    ("laidies-writing-lock.md",     "the writing standard — what LAiDIES is and is not"),
    ("laidies-teaching-pattern.md", "how a thing gets taught here"),
]

# ── did this session actually READ them? ────────────────────────────────────
# The transcript is the only honest record. Anything else is self-report.
transcript = data.get("transcript_path") or ""
read_paths = set()
if transcript and os.path.exists(transcript):
    try:
        with open(transcript, "r", encoding="utf-8", errors="ignore") as fh:
            for line in fh:
                if "laidies-" not in line:
                    continue
                try:
                    ev = json.loads(line)
                except Exception:
                    continue
                msg = ev.get("message") or {}
                content = msg.get("content")
                if not isinstance(content, list):
                    continue
                for block in content:
                    if not isinstance(block, dict):
                        continue
                    if block.get("type") != "tool_use":
                        continue
                    if block.get("name") not in ("Read", "read_file"):
                        continue
                    fp = str((block.get("input") or {}).get("file_path") or "")
                    if fp:
                        read_paths.add(os.path.basename(fp.replace("\\", "/")))
    except Exception:
        pass                          # unreadable transcript -> nothing read -> block

missing_read = []
missing_file = []
for fname, why in REQUIRED:
    if not os.path.exists(os.path.join(VOICE, fname)):
        missing_file.append((fname, why))
    elif fname not in read_paths:
        missing_read.append((fname, why))

if not missing_read and not missing_file:
    sys.exit(0)

# ── build the refusal ───────────────────────────────────────────────────────
lines = [
    "BLOCKED — you are about to write LAiDIES episode prose:",
    "    %s" % ", ".join(active_paths),
    "without having read the voice sources in this session.",
    "",
    "This is not a formality. On 2026-07-22 a draft shipped a product-comparison",
    "table minutes after the writing lock had been quoted out loud in the same",
    "conversation. Reciting the rules is not reading them. So: read them.",
    "",
]

if missing_read:
    lines.append("NOT YET READ in this session — open each with the Read tool:")
    for fname, why in missing_read:
        lines.append("  • %s" % os.path.join(VOICE, fname))
        lines.append("      %s" % why)
    lines.append("")

if missing_file:
    lines.append("⚠ REQUIRED FILE DOES NOT EXIST:")
    for fname, why in missing_file:
        lines.append("  • %s" % os.path.join(VOICE, fname))
        lines.append("      (%s)" % why)
    lines.append("")
    lines.append("  This hook is NOT falling open because a file is missing. Either")
    lines.append("  that file gets written, or someone consciously removes it from")
    lines.append("  REQUIRED in %s." % os.path.abspath(__file__))
    lines.append("")

lines.append("Then write the draft. The rules you will be held to afterwards:")
lines.append("  bash %s <episode number>" % os.path.join(
    repo, "operations", "engine", "gate.sh"))

print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "\n".join(lines),
}}))
sys.exit(2)
