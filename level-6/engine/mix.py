# Build the narration track: place each line's audio at its start time.
# usage: python3 mix.py plan.json out.wav total_seconds
import json, subprocess, sys, wave, numpy as np
plan, out, total = json.load(open(sys.argv[1])), sys.argv[2], float(sys.argv[3])
SR = 44100
buf = np.zeros(int((total + 1) * SR), dtype=np.float32)
for p in plan:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p['file'], '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
    s = int(p['t'] * SR); buf[s:s + len(x)] += x[:len(buf) - s]
buf = buf[:int(total * SR)]
peak = np.abs(buf).max() or 1
buf = buf / peak * 0.89
w = wave.open(out, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((buf * 32767).astype(np.int16).tobytes()); w.close()
