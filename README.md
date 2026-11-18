# Capital Market Institute — Siri Video Futures (Modul 1 & 2)

Lapan video motion graphics pengenalan (1080p, 16:9). Setiap video mempunyai narasi English dan sari kata Bahasa Malaysia, mengikut format episod rujukan ILMU.

| # | Tajuk | Video | Sari kata BM | Dokumen produksi |
|---|---|---|---|---|
| 01 | Apa Itu Kontrak Niaga Hadapan | `output/v01.mp4` | `output/v01_BM.srt` | [docs/VIDEO_01.md](docs/VIDEO_01.md) |
| 02 | Bursa Malaysia Derivatives (BMD) | `output/v02.mp4` | `output/v02_BM.srt` | [docs/VIDEO_02.md](docs/VIDEO_02.md) |
| 03 | Long dan Short — Harga Naik atau Turun | `output/v03.mp4` | `output/v03_BM.srt` | [docs/VIDEO_03.md](docs/VIDEO_03.md) |
| 04 | Leverage — Peluang dan Risikonya | `output/v04.mp4` | `output/v04_BM.srt` | [docs/VIDEO_04.md](docs/VIDEO_04.md) |
| 05 | Spesifikasi Kontrak FCPO | `output/v05.mp4` | `output/v05_BM.srt` | [docs/VIDEO_05.md](docs/VIDEO_05.md) |
| 06 | Margin Awal dan Margin Penyelenggaraan | `output/v06.mp4` | `output/v06_BM.srt` | [docs/VIDEO_06.md](docs/VIDEO_06.md) |
| 07 | Bulan Kontrak dan Rollover | `output/v07.mp4` | `output/v07_BM.srt` | [docs/VIDEO_07.md](docs/VIDEO_07.md) |
| 08 | Sesi Dagangan FCPO | `output/v08.mp4` | `output/v08_BM.srt` | [docs/VIDEO_08.md](docs/VIDEO_08.md) |

Pelan produksi induk merangkumi identiti visual, templat pembuka dan penutup, spesifikasi eksport dan senarai semak. Rujuk [docs/00_PELAN_PRODUKSI.md](docs/00_PELAN_PRODUKSI.md).

> ⚠️ **Sebelum diterbitkan:** sahkan semua item bertanda **SEMAK** dalam setiap `docs/VIDEO_NN.md` dengan spesifikasi rasmi Bursa Malaysia terkini. Laman rasmi tidak dapat diakses dari persekitaran produksi.

## Struktur

```
engine/   theme.css · runtime.js (enjin animasi deterministik) · components.js · standard.js (templat siri) · player.html
videos/   v01.js … v08.js — skrip (EN + BM), arahan babak, visual, rujukan, semakan fakta
tools/    build.sh · prep.mjs · tts.py · render.mjs · srt.mjs · still.mjs · docs.mjs
docs/     pelan produksi + dokumen setiap video (dijana)
output/   MP4 + SRT
```

## Membina semula

Keperluan: Node 18+, Python 3 (`edge-tts`, `numpy`), ffmpeg, dan Playwright Chromium.

```bash
tools/build.sh v01              # narasi English (lalai)
tools/build.sh v01 --lang ms    # narasi Bahasa Malaysia (suara ms-MY)
node tools/docs.mjs             # jana semula dokumen
```

Untuk pratonton dalam pelayar, buka `engine/player.html?v=v01&play=1`.

Untuk menggunakan rakaman suara sebenar, gantikan `build/vNN/narration.m4a`. Gunakan `output/vNN_EN.srt` sebagai panduan masa, kemudian jalankan `node tools/render.mjs vNN`.
