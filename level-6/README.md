# CMI · SMC Level 6 — Premium, Discount & PD Arrays

14 video motion graphics, 1920×1080 · 30 fps, mengikut layout dan theme video rujukan (ILMU L1 EP01).
Narasi **English** (suara neural lelaki `en-US-AndrewNeural`, dipilih kerana paling hampir dengan pic dan timbre video rujukan),
**subtitle Bahasa Melayu sahaja** yang dipaparkan (burned-in).

## Video

| # | Tajuk | Subtopik |
|---|---|---|
| 01 | Introduction to Premium, Discount & PD Arrays | Kerangka |
| 02 | Dealing Range | ① |
| 03 | Equilibrium | ② |
| 04 | Premium & Discount | ③ |
| 05 | Fibonacci OTE | ④ |
| 06 | Order Block | ⑤ |
| 07 | Breaker Block & Mitigation Block | ⑤ |
| 08 | Rejection Block | ⑤ |
| 09 | FVG, IFVG & Liquidity Void | ⑤ |
| 10 | Old High / Low & Liquidity References | ⑤ |
| 11 | PD Array Selection & Prioritisation | ⑤ |
| 12 | Multiple Confluences | ⑥ |
| 13 | Conflicting Confluences & No-Trade | ⑥ |
| 14 | Complete Level 6 Workflow — Integrated Case Study | ①–⑥ |

Setiap video mengandungi: definisi, langkah demi langkah, contoh bullish & bearish, contoh tidak sah atau lemah,
kesilapan biasa, aplikasi praktikal, ringkasan, knowledge check (dengan jeda 5 saat dan penjelasan jawapan),
latihan praktikal, rujukan, dan penafian.

## Fail

| Fail | Kandungan |
|---|---|
| `PHASE-1-2_content-map-and-validation.md` | Fasa 1–2: pemetaan kandungan + validasi teknikal |
| `reference/` | Bingkai video rujukan |
| `output/vNN.mp4` | Video siap (dengan suara) |
| `output/vNN.bm.srt` | Subtitle BM (boleh dimuat naik berasingan ke YouTube/LMS) |
| `output/vNN.en.srt` | Skrip narasi English dengan timing |
| `engine/` | Enjin render (HTML/SVG → Playwright → ffmpeg) |
| `engine/videos/vNN.js` | Skrip + animasi setiap video |

## Konvensyen yang dikunci (dinyatakan dalam video)
- Fibonacci: 0 di hujung impulse, 1 di permulaan (bullish: low → high; bearish: high → low).
- OTE: 62%–79%, rujukan tengah 70.5%.
- Order Block: candle lawan arah terakhir sebelum displacement yang memecahkan struktur; zon = body; mean threshold = 50% body.
- Breaker = order block gagal **dengan** liquidity sweep. Mitigation Block = failure swing **tanpa** sweep.
- Rejection Block: body → wick di swing extreme yang bermakna.
- IFVG: FVG yang ditembusi dengan **body close** melepasi hujung jauh.
- Susunan rasmi "PD Array matrix" **tidak** dipaparkan (perlu pengesahan).

## Render semula
```
cd engine
node tts_build.js v05          # jana suara (cache) + durasi
node render.js v05 video 5     # render video penuh
node render.js v05 stills 30,90  # semak bingkai
./build.sh v05 v06             # TTS + render berturutan
```
