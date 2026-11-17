#!/bin/bash
cd "$(dirname "$0")"
while pgrep -f "build.sh v02" >/dev/null; do sleep 15; done
./build.sh v06 v07 v08 v09 v10 v11 v12 v13 v14 > ../output/.queue2.log 2>&1
echo ALLDONE >> ../output/.queue2.log
