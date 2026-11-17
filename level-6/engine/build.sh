#!/bin/bash
# usage: ./build.sh v02 v03 ...   (TTS with retries, then render with narration)
cd "$(dirname "$0")"
for v in "$@"; do
  ok=0
  for a in 1 2 3 4; do
    if node tts_build.js "$v" > "../output/.log_tts_$v" 2>&1; then ok=1; break; fi
    sleep 20
  done
  if [ $ok = 1 ]; then node render.js "$v" video 5 > "../output/.log_$v" 2>&1 && echo "BUILT $v" || echo "RENDER FAILED $v"
  else echo "TTS FAILED $v"; fi
done
