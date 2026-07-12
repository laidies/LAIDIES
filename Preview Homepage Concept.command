#!/bin/bash
# Double-click me to see the new homepage concept (Codex + Claude pass, 2026-07-12).
# Leave this window open while you browse. Close it (or Ctrl+C) to stop.
cd "$(dirname "$0")"
URL="http://localhost:8000/concepts/codex-homepage-2026-07-12/"
if lsof -i :8000 >/dev/null 2>&1; then
  echo "★ Preview server already running — opening the concept."
  open "$URL"
else
  ( sleep 1; open "$URL" ) &
  echo ""
  echo "★ LAiDIES homepage concept — your browser is opening now."
  echo "★ Leave this window open. Close it when you're done."
  echo ""
  python3 -m http.server 8000
fi
