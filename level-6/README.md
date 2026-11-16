# CMI · SMC Level 6 — Premium, Discount & PD Arrays

| Fail | Kandungan |
|---|---|
| `PHASE-1-2_content-map-and-validation.md` | Fasa 1–2: pemetaan kandungan 14 video + validasi teknikal |
| `reference/` | Bingkai daripada video rujukan (ILMU L1 EP01): layout & theme yang ditiru |
| `engine/` | Enjin motion graphics (HTML/SVG → Playwright → ffmpeg) |
| `engine/videos/vNN.js` | Skrip setiap video: subtitle BM (dipaparkan) + narasi EN (skrip VO) + animasi |
| `output/vNN.mp4` | Video siap 1920×1080, 30 fps, subtitle BM burned-in |
| `output/vNN.bm.srt`, `output/vNN.en.srt` | Subtitle BM & skrip narasi EN dengan timing (untuk rakaman VO) |

## Render
```
cd engine
node render.js v01 video 6              # video penuh (6 worker)
node render.js v01 stills 30,140,262    # semak bingkai tertentu
```

## Audio
Video pilot dirender **tanpa suara** (trek audio senyap). Narasi English tersedia dalam
`output/v01.en.srt` dengan timing yang sepadan. Selepas VO dirakam, gabungkan dengan:
```
ffmpeg -i output/v01.mp4 -i vo_v01.wav -map 0:v -map 1:a -c:v copy -c:a aac output/v01_vo.mp4
```
Timing setiap baris boleh dilaraskan (`d:` dalam fail video) supaya sepadan dengan VO sebenar.
