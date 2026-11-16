#!/bin/bash
# Sequential production queue. usage: tools/queue.sh <wait-for-episode-or-none> ep04 ep06 ...
cd "$(dirname $0)/.."; LOG=${LOGDIR:-/tmp}; w=$1; shift
while pgrep -f "produce.sh $w\$" >/dev/null || pgrep -f "render.mjs $w\$" >/dev/null; do sleep 20; done
for ep in "$@"; do
  while [ ! -f episodes/$ep/spec.js ] || [ -f episodes/$ep/.writing ]; do sleep 30; done
  tools/produce.sh $ep > $LOG/$ep.log 2>&1 && echo "OK $ep" || echo "FAILED $ep"
done
