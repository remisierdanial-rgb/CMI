# FASA 3 — ROADMAP & STORYBOARD SIRI VIDEO
## CMI · SMC Level 9: SMC Trading Strategy

**Format setiap babak:** `Sxx · LABEL` → *Objektif* · **Carta / animasi** · Narasi utama (BM) · Teks skrin (EN) · Rujukan.
Gaya visual mengikut video rujukan (ILMU L1 EP03): latar navy gelap, aksen amber, panel carta di kiri + panel langkah di kanan, sari kata BM di bawah, bar progres amber. Lihat `docs/09_VISUAL_STYLE_GUIDE.md`.

**Peraturan semua carta:** dilabel *FCPO · TF · HYPOTHETICAL ILLUSTRATION*; dibina progresif; candle masa depan disembunyikan dengan zon "NOT VISIBLE" sehingga keputusan dibuat; OHLC disahkan oleh enjin; setiap contoh menang diimbangi dengan senario kalah atau no-trade.

**Pola pengajaran setiap konsep utama:** Definisi → Tujuan → Logik → Syarat → SOP → Bullish → Bearish → FCPO → Risiko & had → Kesilapan → Key takeaway.

| EP | Tajuk | Subtopik | Anggaran | Status |
|---|---|---|---|---|
| 01 | Introduction to SMC Trading Strategy | Pengenalan | 12.0 min | ✅ Video siap |
| 02 | Scalping SOP: Preparation & Market Context | 1 | ~13 min | 📝 Storyboard |
| 03 | Scalping SOP: Entry & Management | 1 | ~15 min | 📝 |
| 04 | Intraday SOP: Market Planning | 2 | ~13 min | 📝 |
| 05 | Intraday SOP: Execution & Management | 2 | ~15 min | 📝 |
| 06 | Swing Trading SOP: Higher-Timeframe Planning | 3 | ~13 min | 📝 |
| 07 | Swing Trading SOP: Execution & Management | 3 | ~15 min | 📝 |
| 08 | Scalping vs Intraday vs Swing *(baharu)* | Bahagian 6 | ~9 min | 📝 |
| 09 | Entry Confirmation: Complete Methodology | 4 | ~18 min (boleh dipecah 09A/09B) | 📝 |
| 10 | Stop Loss & Take Profit | 5 | ~16 min | 📝 |
| 11 | Risk-to-Reward & Position Sizing | 6 | ~18 min (boleh dipecah 11A/11B) | 📝 |
| 12 | Integrated FCPO Case Studies | Bahagian 7 | ~20 min (12A: CS1–4, 12B: CS5–8) | 📝 |
| 13 | CMI Professional Trading SOP & Final Assessment | Bahagian 5, 8 | ~14 min | 📝 |

Struktur tetap setiap episod: **Intro → Objektif → Isi → Contoh bullish → Contoh bearish → No-trade/kesilapan → Knowledge check → Ringkasan → Latihan → Up next → Rujukan → Penafian.**

---

## EP01 — Introduction to SMC Trading Strategy ✅
Skrip penuh, masa dan arahan animasi ada dalam `episodes/ep01/spec.js`. Storyboard bertimestamp: `episodes/ep01/STORYBOARD.md`.

---

## EP02 — Scalping SOP: Preparation & Market Context
**Objektif:** (1) Mendefinisikan scalping dan ciri-cirinya. (2) Menerangkan rangka TF 1H/30M · 15M · 5M · 1M. (3) Melaksanakan 10 langkah persediaan pra-pasaran. (4) Memetakan struktur, liquidity dan POI untuk scalping.

| Babak | Kandungan |
|---|---|
| S1 · INTRO | Tajuk "Scalping SOP · Part 1". Skematik: candle 5M kecil di dalam kotak 15M. |
| S2 · 1A WHAT IS SCALPING | Definisi: dagangan jangka pendek dengan pegangan singkat. Kad ciri: pegangan pendek · kekerapan tinggi tetapi selektif · kelajuan pelaksanaan · kos per dagangan tinggi berbanding sasaran · risiko ketat. **Narasi:** "Scalping bukan sekadar masuk dan keluar dengan cepat. Ia memerlukan setup, syarat entry, invalidation dan pelan exit yang ditetapkan lebih awal." |
| S3 · 1A FREQUENCY ≠ PROFIT | Animasi dua pedagang: A, 20 dagangan/hari berkualiti rendah, dan B, 3 dagangan terpilih. Bar kos terkumpul membesar untuk A. Teks: *More trades = more costs, not more edge.* Tiada angka win rate direka; ilustrasi kos sahaja. |
| S4 · 1B TIMEFRAMES | Jadual: Higher context 1H/30M · Setup & location 15M · Entry confirmation 5M · Fine execution 1M (pilihan). Animasi zoom: 1H → 15M → 5M. 1M dipaparkan dengan kesan "noise". Tag: *Illustrative CMI framework · test & adapt*. |
| S5 · 1C PRE-MARKET (1/2) | Senarai semak 10 langkah muncul satu demi satu. Langkah 1–5 pada carta 30M bersih: sesi semasa → sesi lepas → garisan **PDH / PDL** → aras Weekly/Daily. **⚠ Waktu sesi FCPO dipaparkan hanya selepas V-06 disahkan.** |
| S6 · 1C PRE-MARKET (2/2) | Langkah 6–10: liquidity pools (EQH/EQL, session H/L), bias awal (bullish/bearish/neutral), POI HTF/MTF, berita/jadual (cth. laporan MPOB, data eksport; tanpa dakwaan kesan), **had risiko maksimum hari ini** (kotak amber). |
| S7 · 1D STRUCTURE | Carta 15M: HH/HL berlabel → BOS (penutupan badan) → CHoCH → MSS (dengan displacement). Panel kanan: internal vs external. **Babak kunci:** dua carta sebelah-menyebelah: (a) internal break kecil dalam uptrend 1H, dan (b) MSS selepas sweep external low. Teks: *Minor internal break ≠ context shift.* |
| S8 · 1E LIQUIDITY MAP | Carta 15M menunjukkan BSL, SSL, EQH, EQL, Session High/Low, PDH, PDL, dan internal vs external (warna cyan). Animasi sweep: wick melepasi EQL dan tutup semula, dibandingkan dengan breakout yang menutup di luar. **Narasi had:** "Tidak semua liquidity akan diambil, dan tidak semua sweep membawa reversal." |
| S9 · 1F POI SELECTION | Grid 6 kad mini-carta: OB, FVG, BB, MB, RB, S&D, dengan definisi operasi CMI (rujuk Laporan Validasi B). Kemudian satu carta: harga menyentuh POI dan terus menembusinya. Teks: *Touching a POI is not confirmation.* |
| S10 · PUTTING IT TOGETHER | Carta 15M FCPO lengkap selepas persediaan: bias, PDH/PDL, liquidity, 1 POI terpilih. Zon kanan "NOT VISIBLE". "Kita berhenti di sini. Entry dibincangkan dalam Video 3." |
| S11 · COMMON PREP MISTAKES | Kad: tiada had risiko · terlalu banyak garisan · bias ditukar setiap candle · abai jadual berita. |
| S12 · KNOWLEDGE CHECK | S1 (beza 3 gaya), S3 (kepentingan HTF sebelum scalping). |
| S13–S17 | Ringkasan · Latihan 1 (bahagian A: persediaan) · Up next · Rujukan (Bursa FCPO, Harris Ch. 1–5, Murphy Ch. 1 & 9) · Penafian. |

---

## EP03 — Scalping SOP: Entry & Management
**Objektif:** SOP 15 langkah; contoh bullish dan bearish; pengurusan dagangan; keadaan no-trade; kesilapan.

| Babak | Kandungan |
|---|---|
| S1–S2 | Intro · ulang kaji EP02 (carta persediaan). |
| S3 · 1G SOP 15 STEPS | Carta alir menegak 15 kotak, dikumpul dalam 4 fasa: **Context (1–3) · Wait & observe (4–8) · Plan (9–12) · Execute & record (13–15)**. Langkah 13 diserlahkan: *Execute only if ALL predefined conditions are met.* |
| S4–S7 · 1H BULLISH | Carta 3 panel (1H konteks · 15M POI · 5M eksekusi), dibina progresif seperti EP01: konteks bullish → POI 15M → SSL → sweep → MSS 5M → displacement → FVG → retrace → entry/SL/TP → zon NOT VISIBLE → keputusan → hasil. Panel kanan mengira RR & RM. Gunakan **set data baharu** (bukan data EP01). |
| S8–S11 · 1I BEARISH | Cerminan: konteks bearish, BSL dekat bearish POI, MSS bearish 5M, FVG bearish, entry jual. **Hasil dagangan ini = SL kena**, untuk mengimbangi contoh. Narasi: "Pelan diikuti; kerugian dikawal." |
| S12 · 1J MANAGEMENT | 7 kad kaedah. Animasi pada satu dagangan: (a) fixed target, (b) breakeven selepas +1R: harga kembali ke entry lalu terkeluar sebelum TP (*BE can exit winners early*), (c) partial 50% di 1R: RR realised berubah (formula dipaparkan), (d) trailing di bawah swing 5M, (e) time-based exit. Teks: *No method is universally superior.* |
| S13 · 1K NO-TRADE | 11 keadaan dipaparkan sebagai ikon ✕. Demo carta: harga di tengah julat tanpa struktur → "SKIP". |
| S14 · 1L MISTAKES | 10 kad merah, 5 + 5. |
| S15 · KNOWLEDGE CHECK | S4, S5, S6. |
| S16–S20 | Ringkasan · **Latihan 1 (penuh): Bina Scalping SOP** · Up next · Rujukan · Penafian. |

---

## EP04 — Intraday SOP: Market Planning
| Babak | Kandungan |
|---|---|
| S1 | Intro. |
| S2 · 2A WHAT IS INTRADAY | Definisi; beza dengan scalping (stop lebih lebar, struktur 1H/30M); **tempoh pegangan ditentukan oleh pelan, bukan TF**; peraturan tutup sebelum akhir hari/sesi. Garis masa hari dagangan dengan sesi berlabel (selepas V-06). |
| S3 · 2B TIMEFRAMES | Jadual Daily/4H · 1H/30M · 15M · 5M. Tag cadangan. |
| S4 · 2C PREPARATION | 9 langkah. Carta Daily → 4H: struktur, liquidity utama, PDH/PDL, POI, senario. **Kad senario A (utama) dan B (alternatif)** dengan syarat invalidation masing-masing. |
| S5 · 2D BIAS | Bullish / bearish / neutral. Dealing range harian dengan garisan 50% → Premium/Discount. Anak panah Draw on Liquidity ke BSL/SSL. Syarat bias tidak sah (penutupan 1H di bawah HL utama). Animasi: candle 5M bergerak melawan bias, tetapi bias kekal → *Don't flip bias on every LTF move.* |
| S6 · 2E SETUP vs ACTIONABLE | Dua lajur: *Potential setup* (lokasi + konteks) vs *Actionable entry* (+ liquidity + MSS + displacement + execution zone + RR). |
| S7–S11 | Ringkasan · KC (S2) · Latihan 2 bahagian A · Up next · Rujukan · Penafian. |

## EP05 — Intraday SOP: Execution & Management
| Babak | Kandungan |
|---|---|
| S2 · 2F SOP 15 STEPS | Carta alir 15 langkah (fasa: Analysis · Location · Confirmation · Plan · Manage & record). |
| S3–S6 · 2G BULLISH CASE | Daily/4H bullish → dealing range → SSL → POI 1H/30M → retrace → reaksi 15M → MSS + displacement 5M. **Entry 4,512 · SL 4,494 · TP1 4,530 · TP2 4,560 (PDH)**, 2 kontrak. Tanpa hindsight. |
| S7 · 2I MANAGEMENT | Animasi: TP1 kena → 1 kontrak ditutup → SL ke BE → TP2 kena. Kalkulator: RM900 risiko → RM1,650 = 1.83R, berbanding 2.67R jika dipegang penuh. Session-end exit, max daily loss, had cubaan. |
| S8–S10 · 2H BEARISH CASE | Daily/4H bearish → BSL → POI bearish → reaksi 15M → pengesahan 5M. **Hasil: exit akhir sesi** sebelum TP (menepati peraturan masa) dengan untung/rugi kecil. |
| S11 · 2J NO-TRADE | 8 keadaan; demo "terlalu hampir tamat sesi". |
| S12 · 2K MISTAKES | 8 kad. |
| S13–S17 | KC (S2, S10) · Ringkasan · **Latihan 2: Bina Intraday SOP** · Up next · Rujukan · Penafian. |

---

## EP06 — Swing Trading SOP: Higher-Timeframe Planning
| Babak | Kandungan |
|---|---|
| S2 · 3A WHAT IS SWING | Definisi; pegangan berbilang sesi atau hari; risiko overnight & event (gap dianimasi melompati SL); pertimbangan margin & pembiayaan. |
| S3 · 3B TIMEFRAMES | Monthly/Weekly · Daily · 4H/1H · 1H/30M/15M. |
| S4 · 3C PREPARATION | 10 langkah termasuk PWH/PWL/PMH/PML dan pelan tempoh pegangan. |
| S5 · 3D HTF STRUCTURE | Carta Weekly: major HH/HL; zoom ke Daily → pullback LTF di dalam trend HTF (kotak bersarang). Kesinambungan vs potensi reversal. |
| S6 · 3E SWING POI | W/D OB, D/4H FVG, BB, MB, RB, S&D, Premium/Discount, kualiti displacement, **fresh vs tested** (kiraan sentuhan). Teks: *HTF POI ≠ automatically more reliable.* |
| S7–S11 | KC · Ringkasan · Latihan 3A · Rujukan · Penafian. |

## EP07 — Swing Trading SOP: Execution & Management
| Babak | Kandungan |
|---|---|
| S2 · 3F SOP 12 STEPS | Carta alir. |
| S3–S6 · 3G BULLISH CASE | Weekly bullish → Daily pullback ke Discount → SSL di bawah low penting → POI HTF → pengesahan 4H → entry 1H. **Entry 4,200 · SL 4,120 (80 mata = RM2,000/kontrak) · TP 4,440 (3R).** |
| S7 · SIZING | Bajet RM1,000 → 0 kontrak → **TIDAK TRADE**. Bajet RM4,000 → 2 kontrak. Teks: *Wide stop → fewer contracts, never more.* |
| S8–S10 · 3H BEARISH CASE | Weekly bearish → Daily retrace ke Premium → BSL → POI bearish → MSS 4H → entry 1H/30M. |
| S11 · 3I MANAGEMENT | Daily close vs wick (dua senario); retracement semasa pegangan; overnight gap; exit apabila tesis tidak sah. |
| S12–S13 | 3J no-trade (7) · 3K kesilapan (7). |
| S14–S18 | KC (S14, S15) · **Latihan 3: Bina Swing SOP** · Up next · Rujukan · Penafian. |

---

## EP08 — Scalping vs Intraday vs Swing *(episod baharu, Bahagian 6)*
| Babak | Kandungan |
|---|---|
| S2 | Jadual 6 kriteria penuh (dari Bahagian 6). |
| S3 | Satu pergerakan harga FCPO yang sama dilihat oleh 3 gaya: kotak scalping kecil, intraday sederhana, swing besar (bersarang). |
| S4 | Perbandingan 9 dimensi: persediaan · tempoh · jarak SL · sasaran · saiz posisi · kekerapan pemantauan · kos · overnight · tuntutan psikologi. Bar relatif (kualitatif, tanpa angka prestasi). |
| S5 | "Gaya mana untuk saya?": matriks masa skrin × modal × toleransi overnight. Tiada gaya yang lebih menguntungkan secara semula jadi. |
| S6–S10 | KC (S1, S2) · ringkasan · rujukan · penafian. |

---

## EP09 — Entry Confirmation: Complete Methodology
| Babak | Kandungan |
|---|---|
| S2 · 4A DEFINITION | POI vs trigger (lokasi vs peristiwa). Sentuh OB ≠ pengesahan. Aggressive vs confirmation entry. "Pengesahan mengurangkan sesetengah ketidakpastian, tetapi tidak menghapuskan risiko." |
| S3 · 4B SEQUENCE | Banner: **Liquidity → MSS/CHoCH → Displacement → FVG/Execution Zone → Entry Planning**. |
| S4 · STAGE 1 | BSL/SSL/EQH/EQL/Session/PDH/PDL; **sweep vs breakout**, animasi bersebelahan. |
| S5 · STAGE 2 | MSS, CHoCH, BOS, internal/external; bullish & bearish; "dinilai dalam konteks". |
| S6 · STAGE 3 | Displacement vs volatiliti biasa: dua candle besar, satu memecah struktur dan satu tidak. Teks: *Displacement ≠ proof of who traded.* |
| S7 · STAGE 4 | FVG: animasi 3 candle; bullish & bearish; FVG vs session gap; tidak semua FVG boleh didagangkan; FVG tidak perlu diisi (demo harga terus naik tanpa retrace → tiada fill → tiada dagangan). |
| S8 · STAGE 5 | Entry price/condition, SL, invalidation, target, RR, size, jenis order (limit vs market vs stop; tiada jaminan harga isian). |
| S9–S10 · 4C/4D | Demo bullish 9 langkah dan bearish 9 langkah (set data baharu). |
| S11–S12 · 4E MODELS | 4 model × 7 atribut (jadual) + carta mini setiap model. Model 4 (break-and-retest) **bergantung kepada V-07.** |
| S13 · 4F FALSE CONFIRMATION | 7 senario carta mini: sweep tanpa MSS · MSS tanpa displacement · tiada retrace · FVG di lokasi salah · LTF bercanggah HTF · break lalu terus reverse · terlalu dekat liquidity bertentangan. "Kesanggupan untuk skip ialah kemahiran." |
| S14 · 4G CHECKLIST | Senarai semak 9 soalan dengan tanda ✓/✕ pada satu setup langsung. |
| S15–S19 | KC (S4, S5, S6, S7, S8) · Latihan 4 · Rujukan · Penafian. |

---

## EP10 — Stop Loss & Take Profit
| Babak | Kandungan |
|---|---|
| S2 · 5A | SL: definisi, SL vs margin, jarak (mata) vs risiko (RM), berasaskan invalidation, gap/slippage (animasi gap melompati SL, isian lebih teruk). |
| S3 · 5B STRUCTURAL SL | 5 jenis penempatan (bawah swing low, atas swing high, luar POI, luar ekstrem sweep, aras struktur model). |
| S4 · 5C BUFFER | Volatiliti · tick · spread · slippage. Dua SL: buffer 1 tick vs buffer besar arbitrari → saiz posisi berkurang. Buffer dimasukkan dalam sizing. |
| S5 · 5D INVALIDATION | Wick vs penutupan & acceptance; HTF vs LTF; ditetapkan sebelum entry; animasi "jangan alihkan SL lebih jauh" (✕). |
| S6 · 5E–5F TARGETS | Fixed vs berasaskan struktur/liquidity; 12 jenis sasaran liquidity; bullish & bearish. "Liquidity ialah objektif berpotensi, bukan destinasi terjamin." |
| S7 · 5G SIX METHODS | Jadual 6 kaedah × 5 atribut. |
| S8 · 5H MANAGEMENT | Animasi penuh: entry → SL awal → TP1 → partial → laras SL → TP2 → exit. Kemudian contoh kedua: **SL kena dahulu.** "Kerugian adalah sebahagian normal trading." |
| S9 · 5I FCPO | 4,500 / 4,490 / 4,520 · RM250 / RM500 kasar · ⚠ V-05. |
| S10–S14 | KC (S9, S10) · Latihan 5 & 6 · Rujukan · Penafian. |

---

## EP11 — Risk-to-Reward & Position Sizing
| Babak | Kandungan |
|---|---|
| S2 · 6A–6B | Diagram RR 1:1–1:4; formula; contoh 20 ÷ 10 = 2. "2:1 ialah potensi kasar, bukan hasil setiap dagangan." |
| S3 · 6C | Jadual BE win rate 50 / 33.33 / 25 / 20%, dilabel *before costs*. |
| S4 · 6D | Expectancy: (0.40 × 2R) − (0.60 × 1R) = +0.20R. Simulasi 10 dagangan (urutan hipotetikal) untuk menunjukkan varians. "Expectancy positif masa lalu tidak menjamin masa depan." |
| S5 · 6E COSTS | Senarai kos. Contoh andaian "setara 2 mata": RR 2.0 → 1.5; BE 33% → 40%. **Tiada angka yuran.** |
| S6 · 6F SIZING | RM500 ÷ RM250 = 2 kontrak → dengan kos RM300/kontrak → 1 kontrak (bundar ke bawah). |
| S7 · 6G MARGIN vs RISK | Babak teras: initial, maintenance, intraday facility, ekuiti, notional RM112,500, risiko SL. Animasi ½ dan ¼ margin: bar risiko 10 mata kekal RM250. **"Margin is not the same as maximum trading risk."** |
| S8 · 6H | RR mengikut gaya; tiada RR minimum sejagat; faktor pengaruh. |
| S9 · 6I | 11 metrik penilaian; contoh profit factor 1.33. |
| S10 · 6J | 8 kesilapan RR. |
| S11–S15 | KC (S11–S16) · Latihan 7 & 8 · Rujukan · Penafian. |

---

## EP12 — Integrated FCPO Case Studies (Bahagian 7)
Setiap kes: konteks → pilihan pelajar (*pause the video*) → dedah → semakan senarai → keputusan → rekod jurnal.
| Babak | Kes |
|---|---|
| S2–S4 | CS1 Scalping bullish (lengkap dengan kiraan RR) |
| S5–S7 | CS2 Scalping bearish |
| S8–S10 | CS3 Intraday bullish (D/4H → 1H/30M → 15M → 5M → pengurusan) |
| S11–S13 | CS4 Intraday bearish |
| S14–S16 | CS5 Swing bullish (sizing, stop lebar) |
| S17–S19 | CS6 Swing bearish |
| S20–S21 | **CS7 Failed setup:** POI sah → harga sampai → pengesahan gagal / SL kena → direkod. "Kalah ≠ salah laksana." |
| S22–S23 | **CS8 No-trade:** TF bercanggah, tiada liquidity, lokasi lemah, tiada pengesahan, RR tidak cukup → "Tidak masuk juga satu keputusan." |
| S24–S27 | KC (S18) · Latihan 9 · Rujukan · Penafian. |

---

## EP13 — CMI Professional Trading SOP & Final Assessment (Bahagian 5, 8)
| Babak | Kandungan |
|---|---|
| S2 · WORKFLOW | Aliran CMI penuh (Bahagian 5), dengan tujuan setiap peringkat; pilihan gaya menentukan TF & tempoh. |
| S3 · CHECKLISTS | Pra-pasaran · pelaksanaan · risiko (dari `docs/04`). |
| S4 · JOURNAL | Animasi papan pemuka jurnal: 22 medan; tangkapan skrin sebelum/selepas; MFE/MAE. |
| S5 · METRICS | 12 metrik; prestasi mengikut gaya dan keadaan pasaran. |
| S6 · FOUR QUALITIES | Strategi · pelaksanaan · pengurusan risiko · disiplin psikologi (matriks 2×2: hasil baik/buruk × proses baik/buruk). |
| S7 · TESTING | Backtest → forward test (demo/saiz kecil) → semakan; saiz sampel bermakna; tiada dakwaan prestasi tanpa ujian. |
| S8 · FINAL ASSESSMENT | 18 soalan Level 9 (pilihan) + tugasan akhir: SOP lengkap + 20 entri jurnal (forward test). |
| S9–S12 | Latihan 10 · ringkasan Level 9 · Rujukan · Penafian. |
