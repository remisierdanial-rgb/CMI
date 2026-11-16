"""Episode renderer: TTS narration -> timeline -> frames -> mp4 (Malay burned-in subtitles).

Usage:
  python -m level8.engine.render ep01            # full render
  python -m level8.engine.render ep01 --preview  # PNG stills at key beats
  python -m level8.engine.render ep01 --script   # export script/storyboard markdown only
"""
import asyncio
import hashlib
import importlib
import json
import multiprocessing as mp
import os
import ssl
import subprocess
import sys
import wave

import numpy as np
import cairo

from .core import W, H, FPS, background, header, subtitle, progress, with_alpha, clamp

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')
OUT = os.path.join(ROOT, 'output')
VOICE = os.environ.get('CMI_VOICE', 'en-US-BrianNeural')
RATE = os.environ.get('CMI_RATE', '-4%')
SR = 24000


# ------------------------------------------------------------------ TTS
def _tts_path(text):
    h = hashlib.sha1(f'{VOICE}|{RATE}|{text}'.encode()).hexdigest()[:16]
    return os.path.join(BUILD, 'tts', h)


async def _tts_one(text, sem):
    import edge_tts
    import edge_tts.communicate as c
    ca = '/root/.ccr/ca-bundle.crt'
    if os.path.exists(ca):
        c._SSL_CTX = ssl.create_default_context(cafile=ca)
    base = _tts_path(text)
    if os.path.exists(base + '.wav'):
        return
    async with sem:
        for attempt in range(5):
            try:
                com = edge_tts.Communicate(text, VOICE, rate=RATE)
                with open(base + '.mp3', 'wb') as f:
                    async for ch in com.stream():
                        if ch['type'] == 'audio':
                            f.write(ch['data'])
                break
            except Exception as e:  # network hiccup -> retry
                if attempt == 4:
                    raise
                await asyncio.sleep(2 * (attempt + 1))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', base + '.mp3', '-ac', '1', '-ar', str(SR), base + '.wav'], check=True)


def tts_all(texts):
    os.makedirs(os.path.join(BUILD, 'tts'), exist_ok=True)

    async def run():
        sem = asyncio.Semaphore(4)
        await asyncio.gather(*[_tts_one(t, sem) for t in texts])
    asyncio.run(run())


def wav_samples(text):
    with wave.open(_tts_path(text) + '.wav') as w:
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)


# ------------------------------------------------------------------ episode
EP = None


def load(name):
    mod = importlib.import_module(f'level8.episodes.{name}')
    ep = mod.build()
    for i, sc in enumerate(ep['scenes']):
        sc.number = i + 1
    return ep


def time_episode(ep):
    texts = [ln['en'] for sc in ep['scenes'] for ln in sc.lines]
    tts_all(texts)
    off = 0.0
    for sc in ep['scenes']:
        durs = [len(wav_samples(ln['en'])) / SR for ln in sc.lines]
        sc.set_durations(durs)
        sc.resolve()
        sc.offset = off
        off += sc.dur
    ep['total'] = off
    return ep


def draw_frame(ep, sc, t, ctx):
    background(ctx)
    fade_in = clamp(t / 0.45)
    fade_out = clamp((sc.dur - t) / 0.35)
    with_alpha(ctx, min(fade_in, fade_out), lambda: sc.draw(ctx, t))
    header(ctx, ep['meta'], sc.label())
    s, a = sc.subtitle_at(t)
    subtitle(ctx, s, a)
    progress(ctx, (sc.offset + t) / ep['total'])


def _render_scene(idx):
    ep = EP
    sc = ep['scenes'][idx]
    seg = os.path.join(BUILD, ep['id'], f'seg_{idx:03d}.mp4')
    nframes = int(round(sc.dur * FPS))
    surf = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
    ctx = cairo.Context(surf)
    p = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr0', '-s', f'{W}x{H}', '-r', str(FPS),
                          '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p',
                          '-threads', '1', seg], stdin=subprocess.PIPE)
    for f in range(nframes):
        draw_frame(ep, sc, f / FPS, ctx)
        surf.flush()
        p.stdin.write(bytes(surf.get_data()))
    p.stdin.close()
    p.wait()
    return seg, nframes


def build_audio(ep, path):
    total = sum(int(round(sc.dur * FPS)) for sc in ep['scenes']) / FPS
    buf = np.zeros(int(total * SR) + SR, dtype=np.float32)
    off = 0.0
    for sc in ep['scenes']:
        for ln, t in zip(sc.lines, sc.times):
            s = wav_samples(ln['en']).astype(np.float32)
            k = int((off + t) * SR)
            buf[k:k + len(s)] += s
        off += int(round(sc.dur * FPS)) / FPS
    buf = np.clip(buf, -32767, 32767).astype(np.int16)
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(buf.tobytes())


def render(name, workers=4):
    global EP
    EP = time_episode(load(name))
    ep = EP
    d = os.path.join(BUILD, ep['id'])
    os.makedirs(d, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    order = sorted(range(len(ep['scenes'])), key=lambda i: -ep['scenes'][i].dur)
    with mp.get_context('fork').Pool(workers) as pool:
        res = dict(zip(order, pool.map(_render_scene, order, chunksize=1)))
    lst = os.path.join(d, 'list.txt')
    with open(lst, 'w') as f:
        for i in range(len(ep['scenes'])):
            f.write(f"file '{res[i][0]}'\n")
    wav = os.path.join(d, 'audio.wav')
    build_audio(ep, wav)
    out = os.path.join(OUT, ep['file'])
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-i', wav,
                    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out], check=True)
    export_script(ep)
    print(f'{out}  {ep["total"] / 60:.1f} min')


def preview(name, every=None):
    ep = time_episode(load(name))
    d = os.path.join(BUILD, ep['id'], 'preview')
    os.makedirs(d, exist_ok=True)
    surf = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
    ctx = cairo.Context(surf)
    k = 0
    for sc in ep['scenes']:
        ts = [sc.times[i] + sc.lines[i]['dur'] * 0.9 for i in range(len(sc.lines))] if every is None else \
            [x * every for x in range(int(sc.dur / every) + 1)]
        for t in ts:
            draw_frame(ep, sc, t, ctx)
            surf.write_to_png(os.path.join(d, f'{k:03d}_s{sc.number:02d}.png'))
            k += 1
    print(d, k, f'{ep["total"] / 60:.1f} min')


def _fmt(t):
    return f'{int(t // 60):02d}:{t % 60:04.1f}'


def export_script(ep):
    """Write narration script + storyboard (source of truth = episode code)."""
    docs = os.path.join(ROOT, 'docs', 'episodes')
    os.makedirs(docs, exist_ok=True)
    m = ep['meta']
    L = [f"# {m['video']}", '', f"**{m['line1']} — {m['line2']}**  ", f"Duration: {_fmt(ep['total'])} · Narration: English (voice-over) · Subtitles: Bahasa Melayu (burned-in)", '']
    if ep.get('objectives'):
        L += ['## Learning objectives', ''] + [f'- {o}' for o in ep['objectives']] + ['']
    L += ['## Scene-by-scene storyboard & script', '']
    for sc in ep['scenes']:
        L += [f'### Scene {sc.number} · {sc.code} · {sc.title}  `{_fmt(sc.offset)}`', '']
        if getattr(sc, 'visual', None):
            L += [f'*Visual / motion:* {sc.visual}', '']
        L += ['| # | Time | Narration (EN voice-over) | Subtitle (BM) |', '|---|---|---|---|']
        for i, ln in enumerate(sc.lines):
            L.append(f"| {i + 1} | {_fmt(sc.offset + sc.times[i])} | {ln['en']} | {ln['ms']} |")
        L.append('')
    if ep.get('quiz'):
        L += ['## Knowledge check', '']
        for i, (q, a) in enumerate(ep['quiz']):
            L += [f'**Q{i + 1}. {q}**  ', f'*Answer:* {a}', '']
    if ep.get('exercise'):
        L += ['## Student exercise', '', ep['exercise'], '']
    if ep.get('refs'):
        L += ['## References', ''] + [f'- {r}' for r in ep['refs']] + ['']
    with open(os.path.join(docs, ep['id'] + '.md'), 'w') as f:
        f.write('\n'.join(L))


if __name__ == '__main__':
    name = sys.argv[1]
    if '--preview' in sys.argv:
        preview(name)
    elif '--script' in sys.argv:
        e = time_episode(load(name))
        export_script(e)
    else:
        render(name)
