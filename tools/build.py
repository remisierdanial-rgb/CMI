#!/usr/bin/env python3
"""Episode build: narration TTS (English voice) -> per-segment timing -> timeline.json + narration.wav.
Usage: python3 tools/build.py episodes/ep01.js"""
import sys, os, json, hashlib, subprocess, asyncio, re, wave, array
import certifi; certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = os.environ.get("CMI_VOICE", "en-US-GuyNeural"); RATE = os.environ.get("CMI_RATE", "+0%")
SR = 44100; GAP = 0.45; LEAD = 0.6; TAIL = 0.7
CACHE = os.path.join(ROOT, "build", "tts_cache"); os.makedirs(CACHE, exist_ok=True)

async def tts(text, out):
    for attempt in range(12):
        try:
            c = edge_tts.Communicate(text, VOICE, rate=RATE)
            data = b""
            async for ch in c.stream():
                if ch["type"] == "audio": data += ch["data"]
            if data:
                open(out, "wb").write(data); return
        except Exception as e:
            print("tts retry", attempt, e, file=sys.stderr); await asyncio.sleep(3 + attempt * 4)
    raise RuntimeError("TTS failed: " + text[:60])

def pcm(mp3):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", mp3, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    a = array.array("h"); a.frombytes(raw)
    # trim leading/trailing near-silence
    thr = 300; i = 0; j = len(a)
    while i < j and abs(a[i]) < thr: i += 1
    while j > i and abs(a[j - 1]) < thr: j -= 1
    i = max(0, i - int(.03 * SR)); j = min(len(a), j + int(.08 * SR))
    return a[i:j]

def chunks(ms, maxc=118):
    ms = ms.strip()
    if len(ms) <= maxc: return [ms]
    sents = re.split(r'(?<=[.!?:;])\s+', ms); out = []; cur = ""
    for s in sents:
        if len(s) > maxc:
            parts = re.split(r'(?<=,)\s+', s)
            for p in parts:
                if len(p) > maxc:  # split on spaces near middle
                    words = p.split(); half = []; 
                    for w in words:
                        if len(" ".join(half + [w])) > maxc: out.append((cur + " " + " ".join(half)).strip() if cur else " ".join(half)); cur = ""; half = [w]
                        else: half.append(w)
                    p = " ".join(half)
                if len((cur + " " + p).strip()) <= maxc: cur = (cur + " " + p).strip()
                else: out.append(cur); cur = p
        elif len((cur + " " + s).strip()) <= maxc: cur = (cur + " " + s).strip()
        else: out.append(cur); cur = s
    if cur: out.append(cur)
    return [c for c in out if c]

def main(epfile):
    ep = json.loads(subprocess.run(["node", os.path.join(ROOT, "tools/extract.js"), epfile], capture_output=True, check=True, text=True).stdout)
    name = os.path.splitext(os.path.basename(epfile))[0]; outdir = os.path.join(ROOT, "build", name); os.makedirs(outdir, exist_ok=True)
    jobs = []
    for sc in ep["scenes"]:
        for sg in sc["say"]:
            h = hashlib.sha1((VOICE + RATE + sg["en"]).encode()).hexdigest()[:16]; sg["mp3"] = os.path.join(CACHE, h + ".mp3")
            if not os.path.exists(sg["mp3"]) or os.path.getsize(sg["mp3"]) == 0: jobs.append((sg["en"], sg["mp3"]))
    async def run():
        sem = asyncio.Semaphore(int(os.environ.get("CMI_TTS_PAR", "2")))
        async def one(t, o):
            async with sem: await tts(t, o)
        await asyncio.gather(*[one(t, o) for t, o in jobs])
    if jobs: print(f"{name}: synthesising {len(jobs)} segments"); asyncio.run(run())
    audio = array.array("h"); t = LEAD; audio.extend([0] * int(LEAD * SR)); scenes = []
    for sc in ep["scenes"]:
        st = t; segs = []
        for sg in sc["say"]:
            a = pcm(sg["mp3"]); s = len(audio) / SR; audio.extend(a); e = len(audio) / SR
            segs.append({"s": round(s, 3), "e": round(e, 3), "chunks": chunks(sg["ms"])})
            pad = GAP + sg["p"]; audio.extend([0] * int(pad * SR))
        audio.extend([0] * int(TAIL * SR)); t = len(audio) / SR
        scenes.append({"start": round(st, 3), "end": round(t, 3), "segs": segs})
        st = t
    # fix first scene start at 0
    scenes[0]["start"] = 0
    dur = len(audio) / SR
    with wave.open(os.path.join(outdir, "narration.wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(audio.tobytes())
    json.dump({"duration": round(dur, 3), "scenes": scenes}, open(os.path.join(outdir, "timeline.json"), "w"))
    print(f"{name}: {len(scenes)} scenes, {sum(len(s['segs']) for s in scenes)} segments, {dur/60:.1f} min")

if __name__ == "__main__":
    for f in sys.argv[1:]: main(f)
