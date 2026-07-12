#!/bin/bash
# Double-click me to preview the LAiDIES site.
# A browser tab will open at localhost:8000. Leave this window open while you browse.
# To stop the preview: close this Terminal window (or press Ctrl+C in it).
cd "$(dirname "$0")"
( sleep 1; open "http://localhost:8000" ) &
echo ""
echo "★ LAiDIES preview running — your browser is opening now."
echo "★ Leave this window open. Close it when you're done."
echo ""
python3 -m http.server 8000
