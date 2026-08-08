#!/usr/bin/env python3
import json
import subprocess
import sys

try:
    payload = json.load(sys.stdin)
except Exception:
    raise SystemExit(0)

tool_input = json.dumps(payload.get('tool_input') or {}, ensure_ascii=False)
triggers = (
    'library.html', 'operations/library-decisions.md',
    'operations/product-stewards/library/', 'scripts/test-library-product.cjs'
)
if not any(trigger.lower() in tool_input.lower() for trigger in triggers):
    raise SystemExit(0)

result = subprocess.run(
    ['node', 'scripts/check-library-known-failures.mjs'],
    capture_output=True, text=True
)
if result.returncode:
    sys.stderr.write((result.stderr or result.stdout).strip() + '\n')
    raise SystemExit(2)

print('LIBRARY MAKER PREFLIGHT PASS')
