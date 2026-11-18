# FASA 5 — AUDIT KUALITI · EP01 Introduction to SMC Trading Strategy

**Fail:** `episodes/ep01/build/EP01.mp4` · 1920×1080 · 30 fps · H.264 + AAC · 12:02 · 18 babak · 93 cue sari kata (`subtitles.srt`)

| # | Kriteria (Bahagian 16, Fasa 5) | Keputusan | Bukti |
|---|---|---|---|
| 1 | Enam subtopik asal diperkenalkan, tajuk & susunan dikekalkan | ✅ | Babak 3 |
| 2 | Scalping / intraday / swing dibezakan dengan jelas | ✅ | Babak 4–5 (jadual + jarak SL 10/18/80 mata) |
| 3 | Entry confirmation diterangkan dengan betul (urutan CMI) | ✅ pengenalan | Babak 6, 8 |
| 4 | Pengiraan SL/TP betul | ✅ | Babak 9; `validate_math.py` |
| 5 | Pengiraan RR betul (20 ÷ 10 = 2:1) | ✅ | Babak 9, 13 |
| 6 | Saiz posisi | — | Tidak diajar dalam EP01 (EP11) |
| 7 | Margin tidak dikelirukan dengan risiko | ✅ | Babak 11; tiada angka margin |
| 8 | Nilai kontrak FCPO disahkan | ⚠️ | 25 t disokong sumber kedua; RM1/tan perlu disahkan dengan Bursa (V-05). Ditanda di skrin: *Verify contract specs with Bursa* |
| 9 | Carta logik & OHLC sah | ✅ | `check_ep01_chart.js` 15/15; enjin `validateOHLC` |
| 10 | Tiada candle masa depan didedahkan awal | ✅ | Babak 7–9: zon "NOT VISIBLE"; hasil hanya di babak 10 |
| 11 | Contoh kalah / no-trade disertakan | ✅ (separa) | Babak 10: laluan alternatif SL −RM250; no-trade penuh dalam EP03+ |
| 12 | Rujukan tulen & relevan | ✅ | Babak 17; `docs/07_REFERENCES.md` |
| 13 | Label hipotetikal pada semua carta | ✅ | Tajuk panel carta |
| 14 | Tiada dakwaan jaminan / niat institusi | ✅ | Babak 12 secara eksplisit |
| 15 | Penafian | ✅ | Babak 18 |
| 16 | Gaya visual sepadan dengan rujukan | ✅ | `docs/09_VISUAL_STYLE_GUIDE.md`; stills disemak |
| 17 | Label carta tidak bertindih | ✅ | Diperbaiki selepas semakan stills (TP/EQH berganda, teks "?" vs ENTRY, label MSS vs LH) |

## Isu ditemui & dibetulkan semasa audit
1. **Data candle #17** (draf): low 4,493 telah melepasi EQL 4,494 sebelum candle sweep #18, bercanggah dengan narasi. Dibetulkan kepada low 4,495; #18 open 4,496. Semakan automatik ditambah.
2. **Label bertindih** pada babak pelan dagangan: dibetulkan (tag alat posisi dimatikan; EQH dipudarkan apabila TP muncul; penanda "?" dialihkan ke atas).

## Had yang diketahui
- **Suara TTS:** sebutan nombor dan akronim (SMC, POI, FVG, MSS) oleh suara neural English (en-US-ChristopherNeural) belum didengar oleh manusia. Disyorkan semakan pendengaran, atau rakaman suara manusia untuk versi akhir.
- Waktu dagangan FCPO sengaja tidak disebut dalam EP01 sehingga disahkan (V-06).
- Nota penuh Level 9 tidak dilampirkan; pemetaan dibuat berdasarkan Master Prompt.
