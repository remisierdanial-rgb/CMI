#!/bin/bash
# Sequential production queue; each episode starts once its English narration is complete.
# usage: LOGDIR=... tools/queue.sh ep01 ep03 ...
cd "$(dirname $0)/.."; LOG=${LOGDIR:-/tmp}
for ep in "$@"; do
  until [ -f episodes/$ep/spec.js ] && node tools/en_todo.js $ep 2>&1 >/dev/null | grep -q " 0 missing"; do sleep 30; done
  tools/produce.sh $ep > $LOG/$ep.log 2>&1 && echo "OK $ep" || echo "FAILED $ep"
done
