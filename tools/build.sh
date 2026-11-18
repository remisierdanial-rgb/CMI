#!/usr/bin/env bash
# Full pipeline for one video: lines -> TTS -> timeline -> narration -> frames -> mp4
# Usage: tools/build.sh v01 [--lang en|ms] [--norender]
set -euo pipefail
cd "$(dirname "$0")/.."
V=$1; shift; LANG_OPT="en"; RENDER=1
while [ $# -gt 0 ]; do case $1 in --lang) LANG_OPT=$2; shift 2;; --norender) RENDER=0; shift;; *) shift;; esac; done
node tools/prep.mjs lines "$V"
python3 tools/tts.py synth "$V" --lang "$LANG_OPT"
node tools/prep.mjs timeline "$V"
python3 tools/tts.py mix "$V" --lang "$LANG_OPT"
node tools/srt.mjs "$V"
if [ $RENDER = 1 ]; then node tools/render.mjs "$V" --workers 4; fi
