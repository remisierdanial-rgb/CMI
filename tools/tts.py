"""Narration: synthesise each line (edge-tts), measure durations, and later
assemble the full narration track from timeline.json.
  python3 tools/tts.py synth v01 [--lang en|ms]
  python3 tools/tts.py mix   v01 [--lang en|ms]
"""
import sys, os, json, hashlib, subprocess, asyncio
if os.path.exists('/root/.ccr/ca-bundle.crt'):  # cloud proxy CA (no effect elsewhere)
    import certifi; certifi.where = lambda: '/root/.ccr/ca-bundle.crt'
import edge_tts
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE = {'en': ('en-US-AndrewNeural', '+0%'), 'ms': ('ms-MY-OsmanNeural', '+0%')}
SR = 48000

def clip_path(text, lang):
    v, r = VOICE[lang]
    h = hashlib.sha1(f'{v}|{r}|{text}'.encode()).hexdigest()[:16]
    d = os.path.join(ROOT, 'build', 'cache'); os.makedirs(d, exist_ok=True)
    return os.path.join(d, f'{lang}_{h}.mp3')

async def _try(text, lang, path, tries):
    v, r = VOICE[lang]
    for attempt in range(tries):
        try:
            await edge_tts.Communicate(text, v, rate=r).save(path + '.tmp')
            if os.path.getsize(path + '.tmp') > 1000:
                os.replace(path + '.tmp', path); return True
        except Exception:
            pass
        await asyncio.sleep(1 + attempt * .5)
    return False

async def synth_one(text, lang, path):
    if await _try(text, lang, path, 8): return
    # Fallback: the service intermittently refuses long inputs; synthesise
    # sentence/clause parts separately and join them with a short pause.
    import re
    parts = [p.strip() for p in re.split(r'(?<=[.?!,:;])\s+', text) if p.strip()]
    if len(parts) < 2: raise RuntimeError('TTS failed: ' + text[:60])
    files = []
    for i, p in enumerate(parts):
        f = f'{path}.part{i}.mp3'
        if not await _try(p, lang, f, 12): raise RuntimeError('TTS failed: ' + p[:60])
        files.append(f)
    lst = path + '.txt'
    sil = path + '.sil.mp3'
    subprocess.check_call(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', '0.18', '-c:a', 'libmp3lame', sil])
    with open(lst, 'w') as fh:
        for i, f in enumerate(files):
            fh.write(f"file '{f}'\n")
            if i < len(files) - 1: fh.write(f"file '{sil}'\n")
    subprocess.check_call(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-ar', '24000', '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', path])
    for f in files + [lst, sil]: os.remove(f)

def duration(p):
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p])
    return float(out.strip())

def decode(p):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', p, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'])
    return np.frombuffer(raw, dtype=np.float32)

def main():
    mode, v = sys.argv[1], sys.argv[2]
    lang = sys.argv[sys.argv.index('--lang') + 1] if '--lang' in sys.argv else 'en'
    bdir = os.path.join(ROOT, 'build', v)
    lines = json.load(open(os.path.join(bdir, 'lines.json')))
    key = 'en' if lang == 'en' else 'bm'
    if mode == 'synth':
        async def run():
            sem = asyncio.Semaphore(2)
            async def job(t):
                p = clip_path(t, lang)
                if not os.path.exists(p):
                    async with sem: await synth_one(t, lang, p)
            await asyncio.gather(*[job(l[key]) for s in lines for l in s])
        asyncio.run(run())
        # trim leading/trailing silence estimate: edge-tts adds ~0.1s; keep raw duration
        durs = [[round(duration(clip_path(l[key], lang)) - 0.05, 3) for l in s] for s in lines]
        json.dump(durs, open(os.path.join(bdir, 'durations.json'), 'w'))
        print(v, 'clips ok', sum(len(s) for s in lines))
    elif mode == 'mix':
        tl = json.load(open(os.path.join(bdir, 'timeline.json')))
        total = tl['total'] + 1.0
        buf = np.zeros(int(total * SR) + SR, dtype=np.float32)
        for si, sc in enumerate(tl['scenes']):
            for li, ln in enumerate(sc['lines']):
                a = decode(clip_path(lines[si][li][key], lang))
                st = int((sc['t0'] + ln['t0']) * SR)
                buf[st:st + len(a)] += a
        buf = buf[:int(tl['total'] * SR)]
        # gentle fade out
        n = int(0.8 * SR); buf[-n:] *= np.linspace(1, 0, n)
        wav = os.path.join(bdir, 'narration.raw')
        buf.astype(np.float32).tofile(wav)
        subprocess.check_call(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', wav,
            '-af', 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=5:release=120,loudnorm=I=-16:TP=-1.5:LRA=9',
            '-ar', str(SR), '-ac', '2', '-c:a', 'aac', '-b:a', '192k', os.path.join(bdir, 'narration.m4a')])
        os.remove(wav)
        print(v, 'narration ok', round(tl['total'], 1))

main()
