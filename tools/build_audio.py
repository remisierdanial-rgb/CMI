"""Build narration audio + timeline for an episode.
usage: python3 -I tools/build_audio.py episodes/ep01 [--voice ms-MY-OsmanNeural] [--rate +4%]
Outputs (episodes/<ep>/build/): narration.wav, timeline.js, timeline.json, subtitles.srt
TTS: Microsoft Edge neural voices via edge-tts (needs network). Cached per cue text.
"""
import sys, os, re, json, wave, hashlib, subprocess, asyncio, argparse, array
try:
    import certifi; certifi.where = lambda: os.environ.get('SSL_CERT_FILE', '/root/.ccr/ca-bundle.crt') if os.path.exists('/root/.ccr/ca-bundle.crt') else certifi.__file__
except Exception: pass
import edge_tts

ap = argparse.ArgumentParser(); ap.add_argument('ep'); ap.add_argument('--voice', default='ms-MY-OsmanNeural'); ap.add_argument('--rate', default='+4%')
A = ap.parse_args()
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EP = os.path.abspath(A.ep); B = os.path.join(EP, 'build'); CACHE = os.path.join(ROOT, '.tts-cache'); os.makedirs(B, exist_ok=True); os.makedirs(CACHE, exist_ok=True)
SR = 24000
GAP, SCENE_IN, SCENE_OUT = 0.38, 0.75, 0.95

def say_text(s):
    s = re.sub(r'RM\s?(\d[\d,]*)', r'\1 ringgit', s)
    s = re.sub(r'\b(\d+)H\b', r'\1 jam', s); s = re.sub(r'\b(\d+)M\b', r'\1 minit', s)
    s = s.replace('HTF', 'H T F').replace('LTF', 'L T F').replace('CHoCH', 'change of character')
    return s

async def tts(text, out):
    await edge_tts.Communicate(text, A.voice, rate=A.rate).save(out)

def wav_of(text):
    h = hashlib.sha1(f'{A.voice}|{A.rate}|{text}'.encode()).hexdigest()[:16]
    mp3, wv = os.path.join(CACHE, h + '.mp3'), os.path.join(CACHE, h + '.wav')
    if not os.path.exists(wv):
        for k in range(4):
            try: asyncio.run(tts(text, mp3)); break
            except Exception as e: print('retry', k, e)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ar', str(SR), '-ac', '1', '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse', wv], check=True)
    with wave.open(wv) as w: return w.readframes(w.getnframes())

scenes = json.loads(subprocess.check_output(['node', os.path.join(ROOT, 'tools/cues.js'), os.path.join(EP, 'spec.js')]))
pcm = array.array('h'); t = 0.0; tl = []
def silence(sec):
    global t; n = int(round(sec * SR)); pcm.extend([0] * n); t += n / SR
for sc in scenes:
    st = {'start': round(t, 3), 'cues': []}; silence(SCENE_IN)
    for c in sc['cues']:
        data = array.array('h'); data.frombytes(wav_of(say_text(c['say'])))
        s0 = t; pcm.extend(data); t += len(data) / SR
        st['cues'].append({'start': round(s0, 3), 'end': round(t, 3), 'text': c['t']}); silence(GAP)
    silence(SCENE_OUT + sc['hold']); st['end'] = round(t, 3); tl.append(st)
    print(f"{sc['label']:<45} {st['end'] - st['start']:6.1f}s")
TL = {'scenes': tl, 'total': round(t, 3)}
with wave.open(os.path.join(B, 'narration.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
json.dump(TL, open(os.path.join(B, 'timeline.json'), 'w'), ensure_ascii=False, indent=1)
open(os.path.join(B, 'timeline.js'), 'w').write('window.TIMELINE=' + json.dumps(TL, ensure_ascii=False) + ';')
def ts(x): ms = int(round(x * 1000)); return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}'
n = 0; srt = []
for s in tl:
    for c in s['cues']: n += 1; srt.append(f"{n}\n{ts(c['start'])} --> {ts(c['end'] + .3)}\n{c['text']}\n")
open(os.path.join(B, 'subtitles.srt'), 'w').write('\n'.join(srt))
print(f'TOTAL {t:.1f}s ({t/60:.1f} min) · {n} cues')
