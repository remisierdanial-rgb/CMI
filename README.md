# CMI · Smart Money Concept — Level 9: SMC Trading Strategy
Siri video motion graphics pendidikan (**narasi suara English, sari kata Bahasa Melayu**), dengan gaya visual dipadankan pada video rujukan *ILMU L1 EP03*.

## Status
| Fasa | Hasil | Fail |
|---|---|---|
| 1 · Content Mapping | ✅ | `docs/01_CONTENT_MAPPING.md` |
| 2 · Technical Validation | ✅ (3 item perlu semakan CMI/Bursa) | `docs/02_TECHNICAL_VALIDATION.md` |
| 3 · Storyboard | ✅ Semua episod (dijana daripada spec) | `docs/03_ROADMAP_STORYBOARD.md`, `episodes/*/STORYBOARD.md` |
| 4 · Production | ✅ **14 video dirender**: EP01–EP11, EP12A, EP12B, EP13 | `episodes/*/build/EP*.mp4` |
| 5 · Quality Audit | ✅ | `docs/08_QUALITY_AUDIT_EP01.md`, `docs/10_QUALITY_AUDIT_SERIES.md` |

Bahan sokongan: `docs/04_FRAMEWORKS_CHECKLISTS.md` (SOP checklists, entry checklist, SL/TP framework, RR & sizing guide, contoh risiko FCPO) · `docs/05_GLOSSARY.md` · `docs/06_KNOWLEDGE_CHECK_EXERCISES.md` (18 soalan + 10 latihan berjawapan) · `docs/07_REFERENCES.md` · `docs/09_VISUAL_STYLE_GUIDE.md`.

## Cara menghasilkan video
Keperluan: Node 18+, Playwright + Chromium, ffmpeg, Python 3 + `pip install edge-tts`.
```bash
tools/produce.sh ep05                               # semua langkah untuk satu episod (audio → MP4 → storyboard)
tools/sheet.sh ep05 /tmp/sheet                      # semak susun atur: frame hujung setiap babak + contact sheet
python3 -I tools/build_audio.py episodes/ep01      # TTS BM → narration.wav, timeline, subtitles.srt
node tools/check_ep01_chart.js                      # carta sepadan dengan narasi
python3 -I tools/validate_math.py                   # semua contoh berangka
node tools/render.mjs ep01 --stills 120,400 --out /tmp/st   # semak frame pegun
node tools/render.mjs ep01                          # → episodes/ep01/build/EP01.mp4 (1080p30, H.264/AAC)
node tools/storyboard.js ep01                       # → episodes/ep01/STORYBOARD.md
```
Pratonton langsung (dengan audio): buka `engine/player.html?ep=ep01` melalui pelayan web tempatan (cth. `npx http-server .` → `/engine/player.html?ep=ep01&t=330`).

## Struktur
```
engine/     player.html · engine.js (enjin animasi deterministik) · style.css (tema) · fonts/
episodes/   _lib.js — templat babak + penjana contoh FCPO (dipetakan daripada templat EP01 yang disahkan)
            epNN/spec.js — narasi + babak + data carta (sumber kebenaran)
            epNN/build/  — audio, timeline, srt, mp4 (dijana; narration.wav diabaikan oleh git)
tools/      build_audio.py · render.mjs · storyboard.js · validate_math.py · check_ep01_chart.js
docs/       dokumen Fasa 1–5
```

## Nota penting
- Suara narasi dalam English menggunakan suara neural Microsoft (edge-tts, `en-US-ChristopherNeural`). Teks English bagi setiap cue terdapat dalam `episodes/epNN/en.txt` (dan dijana automatik untuk contoh FCPO oleh `_lib.js`). Teks BM dalam `spec.js` kekal sebagai sari kata di skrin. Teks skrip dihantar ke perkhidmatan TTS tersebut semasa binaan. `node tools/en_todo.js epNN` menyenaraikan cue yang belum mempunyai narasi English.
- Untuk produksi akhir, suara manusia boleh dirakam menggunakan lajur English dalam `STORYBOARD.md`, diletakkan di `build/narration.wav`, dengan masa cue dilaraskan dalam `timeline.json`.
- Semua contoh FCPO ialah **ilustrasi hipotetikal**. Sahkan spesifikasi kontrak dengan Bursa Malaysia Derivatives sebelum diterbitkan (lihat V-05 dan V-06).
- Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan.

---

# CMI · Equity Series — Introduction to Stock & Equity Market
Siri 8 video (narasi suara English, teks di skrin & sari kata Bahasa Melayu). Layout, tema dan logo dipadankan pada video rujukan CMI *Futures Series V01*.

| # | Tajuk | Fail |
|---|---|---|
| 01 | Apa Itu Saham dan Kenapa Syarikat Disenaraikan | `episodes/eq01/build/EQ01.mp4` |
| 02 | Bursa Malaysia: Pasaran Utama, ACE & LEAP | `episodes/eq02/build/EQ02.mp4` |
| 03 | Akaun CDS dan Akaun Dagangan | `episodes/eq03/build/EQ03.mp4` |
| 04 | Waktu Dagangan, Lot dan Cara Pesanan Beli/Jual | `episodes/eq04/build/EQ04.mp4` |
| 05 | Membaca Candlestick | `episodes/eq05/build/EQ05.mp4` |
| 06 | Trend Naik, Turun dan Mendatar | `episodes/eq06/build/EQ06.mp4` |
| 07 | Sokongan dan Rintangan | `episodes/eq07/build/EQ07.mp4` |
| 08 | Volume: Kenapa Ia Penting? | `episodes/eq08/build/EQ08.mp4` |

Semakan fakta & kualiti: `docs/equity/EQ01_PLAN_FACTCHECK.md`, `docs/equity/EQ02-08_FACTCHECK.md`. Storyboard: `episodes/eqNN/STORYBOARD.md`.
Penghasilan: `tools/produce.sh eq03` (TTS → MP4 → storyboard). Pembantu bersama siri: `episodes/_eqlib.js`.
