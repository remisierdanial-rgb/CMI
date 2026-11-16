#!/bin/bash
# Render episodes sequentially after any running render finishes: tools/queue.sh ep06 ep07 ...
cd "$(dirname "$0")/.."
while pgrep -f "tools/render.js ep" >/dev/null; do sleep 5; done
for e in "$@"; do node tools/render.js $e --workers 4 > build/$e/render.log 2>&1; done
