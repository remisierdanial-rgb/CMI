# Pelan Produksi Induk — Siri Futures (Modul 1 & 2)

**Capital Market Institute · Understanding Markets. Building Knowledge.**

Siri ini mengandungi 8 video motion graphics berasingan, satu video bagi setiap subtopik. Setiap video ialah kandungan pengenalan untuk bakal klien, bukan kursus dagangan penuh.

## 1. Senarai video

| Video | Tajuk (tepat) | Modul | Tujuan | Dokumen |
|---|---|---|---|---|
| 01 | Apa Itu Kontrak Niaga Hadapan | 1 | Tarik minat | [VIDEO_01.md](VIDEO_01.md) |
| 02 | Bursa Malaysia Derivatives (BMD) | 1 | Kenali ekosistem | [VIDEO_02.md](VIDEO_02.md) |
| 03 | Long dan Short — Harga Naik atau Turun | 1 | Fahami mekanisme | [VIDEO_03.md](VIDEO_03.md) |
| 04 | Leverage — Peluang dan Risikonya | 1 | Fahami risiko | [VIDEO_04.md](VIDEO_04.md) |
| 05 | Spesifikasi Kontrak FCPO | 2 | Kenali produk | [VIDEO_05.md](VIDEO_05.md) |
| 06 | Margin Awal dan Margin Penyelenggaraan | 2 | Fahami modal | [VIDEO_06.md](VIDEO_06.md) |
| 07 | Bulan Kontrak dan Rollover | 2 | Fahami tempoh kontrak | [VIDEO_07.md](VIDEO_07.md) |
| 08 | Sesi Dagangan FCPO | 2 | Fahami operasi pasaran | [VIDEO_08.md](VIDEO_08.md) |

Durasi sebenar setiap video tercatat dalam dokumen masing-masing. Semua video berada di bawah had 10 minit. Sasaran ialah 2–4 minit, tetapi video siap berdurasi ~4:05–4:59 kerana setiap satu wajib meliputi semua topik teras dalam brief serta urutan penutup standard (~45 s).

## 2. Format (mengikut video rujukan ILMU EP01/EP03)

- **Audio:** narasi dalam Bahasa Inggeris.
- **Sari kata:** Bahasa Malaysia sahaja, dibakar ke dalam video (kotak gelap di bahagian bawah, seperti rujukan), dan turut dieksport sebagai fail `.srt`.
- **Layout:** header nipis di atas. Kiri: lencana modul (M1/M2), label modul dan nama siri. Kanan: `VIDEO NN — TOPIK` dan `SCENE n · LABEL`.
- **Bar kemajuan:** di bahagian bawah skrin.
- **Kandungan:** panel kad, carta candlestick hipotetikal dan kotak formula mono.
- **Tukar bahasa narasi:** enjin boleh menukar narasi kepada BM (`--lang ms`, suara ms-MY) tanpa mengubah visual. Rakaman suara sebenar oleh remisier boleh menggantikan `build/vNN/narration.m4a`. Masa setiap ayat ada dalam `output/vNN_EN.srt` sebagai panduan rakaman.

## 3. Identiti visual (mengikut tema ILMU EP03 + logo CMI rasmi)

| Token | Hex | Kegunaan |
|---|---|---|
| Emas (aksen utama) | `#E8B04F` / `#F0C36B` | Lencana modul, label header, kicker, garisan tajuk, bar kemajuan, sorotan kad, angka penting |
| Navy gelap | `#0B1325` → `#030A16` | Latar belakang (gradien + vignette + grid halus) |
| Panel | `#0F1830` + sempadan `#1E2A44` | Kad / panel |
| Putih | `#F1F5F9` | Tipografi utama |
| Slate | `#64748B` / `#94A3B8` | Label, paksi, teks sokongan |
| Biru data | `#4C7BD9` / `#5B8DEF` | Bar & elemen data sekunder |
| Teal | `#22C3A6` | Harga naik / untung (fungsional sahaja) |
| Merah | `#EF5B5B` | Harga turun / rugi (fungsional sahaja) |
| Amber | `#F5A524` | Amaran, label "hipotetikal", risiko |

**Logo:** `engine/assets/cmi-logo.png` (logo rasmi CMI, dipotong daripada fail asal). Logo direka untuk latar cerah, jadi ia sentiasa dipaparkan atas putih `#FFFFFF`.

**Tipografi:**
- Inter untuk tajuk, isi dan sari kata: H1 84 px / 800, H2 46 px / 800, sari kata 46 px / 500.
- JetBrains Mono untuk angka, label kicker (huruf besar, jarak huruf lebar) dan formula.

## 4. Templat pembuka & penutup (sama untuk 8 video)

1. **Pembukaan logo (4.2 s):** logo CMI rasmi atas kanvas putih (fade + scale), kemudian peralihan ke tema navy.
2. **Hook (~12 s):** soalan pembuka daripada brief, disokong satu visual ringkas.
3. **Kad tajuk:** kicker emas `VIDEO NN · MODUL`, tajuk tepat subtopik, subtajuk, garisan emas, dan senarai objektif yang ditanda satu demi satu.
4. *(babak kandungan)*
5. **Rumusan:** senarai semak dua lajur, setiap item ditanda serentak dengan narasi.
6. **Mesej akhir:** petikan BM tepat daripada brief, dipaparkan besar di skrin. Sari kata disembunyikan dalam babak ini.
7. **Penutup standard:** senarai menegak siri 8 video (video semasa bersempadan emas, bertanda "ANDA DI SINI"), dengan logo CMI dalam kad putih di sebelah kanan. Narasi: *"Ini baru asas… Kenali produk… Teruskan pembelajaran anda bersama Capital Market Institute."*
8. **Rujukan:** senarai sumber bernombor.
9. **Penafian:** "Educational Content Only. High Risk, High Reward. Trade Wisely." + nota hipotetikal + "Seterusnya: Video NN".

## 5. Bahasa animasi

- **Masuk:** fade + naik 26 px (0.6 s, ease-out cubic). Kad: scale 0.92 → 1. Chip/tag: pop (sedikit overshoot). Garis/anak panah: dilukis (stroke-dash).
- **Peralihan babak:** dip ke latar 0.35 s. Tiada wipe, putaran atau kesan berlebihan.
- **Penyegerakan:** setiap elemen dicetuskan oleh permulaan ayat narasi tertentu, jadi visual muncul ketika ia disebut.
- **Teks minimum di skrin:** konsep diterangkan melalui visual. Narasi dan sari kata membawa penerangan.
- **Carta:** dijana secara deterministik dan sentiasa dilabel "ilustrasi hipotetikal". Tiada papan pemuka dagangan palsu atau animasi keuntungan yang tidak realistik.

## 6. Spesifikasi eksport

| Item | Nilai |
|---|---|
| Resolusi | 1920 × 1080 (16:9) |
| Kadar bingkai | 30 fps |
| Video | H.264 (libx264, CRF 18, preset medium, yuv420p), `+faststart` |
| Audio | AAC 192 kbps, 48 kHz stereo, loudnorm −16 LUFS / TP −1.5 dB |
| Fail | `output/vNN.mp4` + `output/vNN_BM.srt` (sari kata) + `output/vNN_EN.srt` (transkrip VO) |

## 7. Aliran kerja teknikal

```
videos/vNN.js  ──►  tools/prep.mjs lines  ──►  tools/tts.py synth  ──►  tools/prep.mjs timeline
                                                                      ──►  tools/tts.py mix (narration.m4a)
                                                                      ──►  tools/render.mjs (Playwright → ffmpeg)
```

- Bina satu video: `tools/build.sh v03`. Untuk narasi BM: `tools/build.sh v03 --lang ms`.
- Pratonton langsung dalam pelayar: buka `engine/player.html?v=v03&play=1`.
- Gambar QA: `node tools/still.mjs v03 12 45 90`.
- Jana semula dokumen: `node tools/docs.mjs`.

## 8. Dasar fakta & pengesahan

- **Akses sumber:** laman rasmi (bursamalaysia.com, sc.com.my, sidc.com.my, cmegroup.com, dce.com.cn) disekat oleh rangkaian persekitaran produksi. Oleh itu, tiada sumber dapat dibuka secara langsung semasa produksi. Kandungan FCPO mengikut garis dasar dalam brief serta pengetahuan umum industri.
- **Item ⚠️ SEMAK:** setiap fakta khusus FCPO/BMD (spesifikasi, waktu dagangan, last trading day, struktur margin BMDC, produk tersenarai) ditanda ⚠️ SEMAK dalam dokumen video. Ia mesti disahkan dengan dokumen rasmi terkini sebelum video diterbitkan.
- **Perkara yang sengaja tidak dinyatakan:** kadar margin semasa, kitaran penyenaraian bulan kontrak FCPO, dan waktu dagangan DCE/CBOT. Ini untuk mengelakkan ralat.

## 9. Senarai semak produksi induk

**Sebelum terbit (setiap video):**
- [ ] Semua item ⚠️ SEMAK dalam `docs/VIDEO_NN.md` disahkan dengan sumber rasmi, dan tarikh akses diisi.
- [ ] Tajuk di kad tajuk = nama subtopik tepat.
- [ ] Angka hipotetikal dilabel di skrin (harga, margin, bulan kontrak).
- [ ] Tiada dakwaan keuntungan terjamin. Margin ≠ had kerugian. Nilai kontrak ≠ margin.
- [ ] Physical delivery ≠ cash settlement. Posisi futures ≠ pemilikan automatik.
- [ ] Keperluan bursa dibezakan daripada keperluan broker.
- [ ] Sari kata BM: ejaan, istilah dan pemotongan baris disemak (fail `_BM.srt`).
- [ ] Narasi: sebutan istilah (FCPO, BMD, T+1) disemak, atau diganti dengan rakaman suara sebenar.
- [ ] Audio: tiada klip terpotong, kenyaringan seragam.
- [ ] Mesej akhir dan urutan penutup standard hadir. Penafian dipaparkan.
- [ ] Eksport 1080p30, main dari awal hingga akhir tanpa ralat.

**Untuk keseluruhan siri:**
- [ ] Palet, tipografi dan templat seragam merentas 8 video.
- [ ] Penunjuk "Seterusnya: Video NN" betul pada setiap video.
- [ ] Penyemakan pematuhan (compliance) oleh broker sebelum diedarkan.
