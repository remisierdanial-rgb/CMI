#!/bin/bash
# Full production for one episode: TTS audio -> render MP4 -> storyboard.  usage: tools/produce.sh ep02
set -e; cd "$(dirname $0)/.."; ep=$1
python3 -I tools/build_audio.py episodes/$ep
node tools/render.mjs $ep
node tools/storyboard.js $ep
echo "DONE $ep"
