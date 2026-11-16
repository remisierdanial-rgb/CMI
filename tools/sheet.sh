#!/bin/bash
# usage: tools/sheet.sh epNN outdir  -> scene-end stills + contact sheet
set -e; ep=$1; out=$2; rm -rf $out; node "$(dirname $0)/render.mjs" $ep --sceneshots --out $out
ffmpeg -v error -y -pattern_type glob -i "$out/s*.png" -vf "scale=640:-1,tile=3x$(( ($(ls $out/s*.png | wc -l)+2)/3 ))" $out/sheet.jpg
