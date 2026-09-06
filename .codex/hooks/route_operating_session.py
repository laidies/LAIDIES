#!/usr/bin/env python3
"""Route the existing outer-workspace hook by admitted session, never a pilot ID.

This does not admit work, resume stopped work, trust hooks or start a scheduler.
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HANDLERS = {'SessionStart': 'session_start.py', 'Stop': 'stop_operational_integrity.py'}


def main():
    payload = json.load(sys.stdin)
    session = payload.get('session_id')
    event = payload.get('hook_event_name')
    if not isinstance(session, str) or not session or event not in HANDLERS:
        print(json.dumps({'continue': True}))
        return
    result = subprocess.run(['node', str(ROOT / 'scripts/project-work-events.mjs'), '--session', session],
                            cwd=ROOT, capture_output=True, text=True, timeout=15)
    if result.returncode:
        raise ValueError('Cannot determine session ownership: ' + result.stderr[:1200])
    packet = json.loads(result.stdout)
    if not packet.get('bound') or packet.get('status') in ('RESOLVED', 'STOPPED'):
        print(json.dumps({'continue': True}))
        return
    result = subprocess.run(['/usr/bin/python3', str(ROOT / '.codex/hooks' / HANDLERS[event])],
                            cwd=ROOT, input=json.dumps(payload), capture_output=True, text=True, timeout=20)
    if result.returncode:
        raise ValueError('Session handler failed; continuation protection is not verified: ' + result.stderr[:1000])
    sys.stdout.write(result.stdout)
    sys.stderr.write(result.stderr)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, subprocess.TimeoutExpired) as error:
        # A runtime failure must be visible, not silently presented as coverage.
        print(json.dumps({'continue': True, 'systemMessage': 'LAiDIES continuation guard unavailable: ' + str(error)}))
