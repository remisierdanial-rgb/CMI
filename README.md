# CMI · Smart Money Concept — Level 9: SMC Trading Strategy
Siri video motion graphics pendidikan (narasi Bahasa Melayu, istilah trading dalam English), dengan gaya visual dipadankan pada video rujukan *ILMU L1 EP03*.

## Status
| Fasa | Hasil | Fail |
|---|---|---|
| 1 · Content Mapping | ✅ | `docs/01_CONTENT_MAPPING.md` |
| 2 · Technical Validation | ✅ (3 item perlu semakan CMI/Bursa) | `docs/02_TECHNICAL_VALIDATION.md` |
| 3 · Storyboard | ✅ EP01 penuh · EP02–EP13 babak demi babak | `docs/03_ROADMAP_STORYBOARD.md`, `episodes/ep01/STORYBOARD.md` |
| 4 · Production | ✅ **EP01 dirender** (perintis untuk kelulusan) | `episodes/ep01/build/EP01.mp4` (tidak di-commit: lihat di bawah) |
| 5 · Quality Audit | ✅ EP01 | `docs/08_QUALITY_AUDIT_EP01.md` |

Bahan sokongan: `docs/04_FRAMEWORKS_CHECKLISTS.md` (SOP checklists, entry checklist, SL/TP framework, RR & sizing guide, contoh risiko FCPO) · `docs/05_GLOSSARY.md` · `docs/06_KNOWLEDGE_CHECK_EXERCISES.md` (18 soalan + 10 latihan berjawapan) · `docs/07_REFERENCES.md` · `docs/09_VISUAL_STYLE_GUIDE.md`.

## Cara menghasilkan video
Keperluan: Node 18+, Playwright + Chromium, ffmpeg, Python 3 + `pip install edge-tts`.
```bash
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
episodes/   epNN/spec.js — narasi + babak + data carta (sumber kebenaran)
            epNN/build/  — audio, timeline, srt, mp4 (dijana; diabaikan oleh git kecuali timeline & srt)
tools/      build_audio.py · render.mjs · storyboard.js · validate_math.py · check_ep01_chart.js
docs/       dokumen Fasa 1–5
```

## Nota penting
- Narasi menggunakan suara neural Microsoft (edge-tts, `ms-MY-OsmanNeural`). Teks skrip dihantar ke perkhidmatan TTS tersebut semasa binaan. Untuk produksi akhir, rakam suara manusia menggunakan `STORYBOARD.md` sebagai skrip, letak WAV di `build/narration.wav`, dan laraskan masa cue dalam `timeline.json`.
- Semua contoh FCPO ialah **ilustrasi hipotetikal**. Sahkan spesifikasi kontrak dengan Bursa Malaysia Derivatives sebelum diterbitkan (lihat V-05 dan V-06).
- Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan.
