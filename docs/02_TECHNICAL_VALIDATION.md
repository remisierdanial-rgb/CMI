# FASA 2 — LAPORAN VALIDASI TEKNIKAL
## CMI · SMC Level 9: SMC Trading Strategy

**Tarikh semakan:** 16 Nov 2026 · **Skop:** Definisi, formula, contoh berangka, spesifikasi FCPO, data carta EP01.

Skrip boleh-ulang:
- `python3 -I tools/validate_math.py` menyemak semula setiap contoh berangka (29/29 lulus).
- `node tools/check_ep01_chart.js` menyemak bahawa candle EP01 sepadan dengan narasi (15/15 lulus).
- Enjin render (`engine/engine.js → validateOHLC`) menolak sebarang candle yang OHLC-nya tidak sah dan menghentikan render.

---

## A. Ringkasan status

| ID | Perkara | Status |
|---|---|---|
| V-01 | Formula RR, break-even win rate, expectancy, position sizing | ✅ Disahkan (matematik) |
| V-02 | Contoh FCPO 4,500 / 4,490 / 4,520 → 10 / 20 mata → 2:1 → RM250 / RM500 | ✅ Disahkan (bergantung kepada V-05) |
| V-03 | Margin ≠ risiko: tiada angka margin digunakan | ✅ Disahkan |
| V-04 | Saiz kontrak FCPO = 25 tan metrik | ✅ Disokong sumber kedua (Interactive Brokers, laman produk Bursa Malaysia) |
| V-05 | Tick minimum RM1/tan → RM25 setiap mata setiap kontrak | ⚠️ **WAJIB SEMAK dengan Bursa sebelum terbit.** Konsisten dengan spesifikasi Bursa yang diterbitkan semula (2012). Laman rasmi bursamalaysia.com tidak dapat dicapai dari sesi ini |
| V-06 | Waktu dagangan FCPO (sesi pagi, petang, malam) | ⚠️ **WAJIB SEMAK.** Tidak dinyatakan dalam video EP01. Akan dimasukkan dalam EP02 hanya selepas pengesahan |
| V-07 | Model "Break-and-retest" dalam metodologi CMI | ❓ **PERLU KEPUTUSAN CMI.** Master Prompt 4E: *"if included in the established CMI methodology"* |
| V-08 | Yuran brokerage / exchange / clearing | ⛔ Tiada angka digunakan. Contoh kos dalam EP11 menggunakan andaian "setara 2 mata" yang dilabel jelas sebagai hipotetikal |
| V-09 | Data carta EP01: OHLC sah, tiada look-ahead | ✅ Disahkan (lihat Bahagian E) |
| V-10 | Definisi istilah selaras dengan Level 1–8 | ⚠️ Definisi operasi di bawah ialah cadangan. Perlu dipadankan dengan glosari Level 1–8 kerana nota tersebut tidak dilampirkan |

---

## B. Definisi operasi CMI (digunakan dalam Level 9)

Definisi ini dirujuk dalam semua skrip. Jika Level 1–8 menggunakan perkataan berbeza, glosari Level 1–8 mengatasi definisi ini.

| Istilah | Definisi operasi | Catatan variasi aliran |
|---|---|---|
| **BOS** (Break of Structure) | Penutupan candle melepasi swing high/low terdahulu **searah** trend semasa → kesinambungan | Sesetengah aliran menerima wick; CMI menggunakan **penutupan badan** |
| **CHoCH** (Change of Character) | Pecahan pertama struktur **berlawanan** trend semasa (cth. pecah LH terakhir dalam downtrend) | Kerap digunakan bersilih dengan MSS |
| **MSS** (Market Structure Shift) | CHoCH yang disertai **displacement**, biasanya selepas liquidity sweep → potensi perubahan arah di TF tersebut | ICT: MSS menekankan displacement; CMI mengikut tafsiran ini |
| **Internal vs External structure** | External = swing utama yang menentukan dealing range; internal = swing kecil di dalamnya | Pecahan internal ≠ perubahan konteks HTF |
| **Displacement** | Pergerakan arah yang kuat: badan candle besar, julat mengembang, memecah struktur relevan, sering meninggalkan FVG | Tidak membuktikan identiti peserta pasaran |
| **BSL / SSL** | Potensi Buy-Side / Sell-Side Liquidity: kawasan di atas high / di bawah low yang mungkin mengandungi stop atau order | "Potensi", kerana order sebenar tidak kelihatan pada carta |
| **EQH / EQL** | Dua atau lebih high/low yang hampir sama (toleransi ditetapkan oleh pedagang, cth. ≤ 1–2 tick bagi 5M) | |
| **Liquidity sweep** | Harga melepasi aras liquidity kemudian **ditutup semula** di dalam julat | Breakout = penutupan dan penerimaan di luar aras |
| **POI** | Point of Interest: zon yang dipilih (OB, FVG, BB, MB, RB, S&D) di mana pedagang menunggu reaksi | Lokasi, **bukan** pencetus |
| **OB** (Order Block) | Candle bertentangan terakhir sebelum displacement yang memecah struktur | |
| **FVG** | Corak 3 candle: bullish FVG = low candle 3 > high candle 1; bearish FVG = high candle 3 < low candle 1 | Bukan "price gap" sesi; tidak semestinya diisi |
| **BB** (Breaker Block) | OB yang gagal dan dipecahkan, kemudian berfungsi dari arah bertentangan selepas sweep | |
| **MB** (Mitigation Block) | Seperti BB tetapi **tanpa** sweep high/low terdahulu (gagal membuat HH/LL baharu) | |
| **RB** (Rejection Block) | Kawasan wick panjang pada swing ekstrem | |
| **IRL / ERL** | Internal / External Range Liquidity | |
| **Premium / Discount** | Atas / bawah 50% (equilibrium) dealing range yang dipilih | |
| **Draw on Liquidity** | Sasaran liquidity yang dijangka menarik harga, iaitu hipotesis dan bukan kepastian | |

---

## C. Pengesahan formula

| Formula | Bentuk | Contoh | Hasil |
|---|---|---|---|
| Risk-to-Reward | Reward ÷ Risk | 20 ÷ 10 | **2 → 2:1** ✅ |
| Break-even win rate (sebelum kos) | Risk ÷ (Risk + Reward) | 1:1 / 1:2 / 1:3 / 1:4 | **50% / 33.33% / 25% / 20%** ✅ |
| Expectancy | (WR × AvgWin) − (LR × AvgLoss) | (0.40 × 2R) − (0.60 × 1R) | **+0.20R** ✅ |
| Position size | Max RM risk ÷ RM risk per contract (bundar **ke bawah**) | 500 ÷ (10 × 25) | **2 kontrak** ✅ |
| Nilai mata FCPO | Tick (RM/tan) × saiz kontrak (tan) | 1 × 25 | **RM25** ⚠️ V-05 |
| Notional | Harga × 25 tan | 4,500 × 25 | **RM112,500** ✅ |
| Profit factor | Gross profit ÷ gross loss | (4 × 2R) ÷ (6 × 1R) | **1.33** ✅ |

### Contoh tambahan yang digunakan dalam EP03–EP11 (semua disahkan)
- **Kos (EP11):** andaian kos + slippage setara 2 mata/kontrak (hipotetikal). Risiko bersih 12 mata = RM300; ganjaran bersih 18 mata = RM450; RR bersih 1.5; BE win rate bersih 40%; dengan bajet RM500 → **1 kontrak** (bukan 2).
- **Intraday partial (EP05/EP10):** 2 kontrak, entry 4,512, SL 4,494 (18 mata), TP1 4,530, TP2 4,560 (PDH). Risiko RM900. Kontrak 1 keluar di TP1 (+18), SL ke breakeven, kontrak 2 keluar di TP2 (+48). Hasil RM1,650 = **1.83R**, berbanding 2.67R jika kedua-dua dipegang ke TP2. Ini menunjukkan partial mengubah RR realised.
- **Swing sizing (EP07):** entry 4,200, SL 4,120 (80 mata = RM2,000/kontrak), TP 4,440 (3R). Bajet risiko RM1,000 → **0 kontrak**, maka *tiada dagangan*. Bajet RM4,000 → 2 kontrak. Ini menunjukkan stop yang lebar bukan alasan untuk menambah saiz.

---

## D. Margin berbanding risiko (V-03)
- Video **tidak menyebut sebarang angka margin**. Margin ditetapkan oleh Bursa Malaysia Derivatives Clearing dan broker, dan boleh berubah.
- Mesej yang disahkan: kemudahan margin intraday (½ atau ¼) **tidak** mengubah nilai satu mata (RM25/kontrak). Pergerakan 10 mata = RM250/kontrak tanpa mengira margin.
- Istilah yang dibezakan dalam EP11: initial margin, maintenance margin, intraday margin facility, ekuiti tersedia, notional, risiko SL, kerugian maksimum di bawah stop yang dirancang. Kerugian sebenar **boleh melebihi** jarak SL akibat gap/slippage.

---

## E. Validasi carta EP01 (V-09)
| Semakan | Hasil |
|---|---|
| 31 candle: High ≥ max(O,C), Low ≤ min(O,C) | ✅ |
| Open = close sebelumnya (tiada gap palsu) | ✅ |
| EQH 4,520 (#1, #4); tiada high ≥ 4,520 sehingga #29 | ✅ |
| EQL 4,494 (#9, #13); tiada low < 4,494 sebelum #18 | ✅ (dibetulkan: draf awal #17 low 4,493 telah melanggar EQL lebih awal) |
| Sweep #18: low 4,491, tutup 4,495 | ✅ |
| MSS: #20 tutup 4,508 > LH 4,503 (#16) | ✅ |
| FVG: high #19 = 4,498 < low #21 = 4,502 | ✅ |
| Entry 4,500 terisi pertama kali pada #24; SL 4,490 tidak disentuh; TP 4,520 dicapai #29 | ✅ |
| Look-ahead: candle selepas titik keputusan disembunyikan dengan zon "NOT VISIBLE" di babak 7–9; hasil didedahkan hanya di babak 10, berserta laluan alternatif kena SL | ✅ |
| Label "HYPOTHETICAL ILLUSTRATION" pada setiap carta | ✅ |

---

## F. Kawalan salah maklumat (Bahagian 9)
- Tiada dakwaan "pasti", "dijamin" atau "institusi melakukan…". Narasi (EN) dan sari kata (BM) menggunakan istilah *potential / potensi*, *possible / kemungkinan* dan *hypothesis / hipotesis*.
- Babak 12 EP01 menyatakan secara jelas bahawa corak carta tidak membuktikan identiti, saiz posisi atau niat institusi.
- Hasil menang dalam contoh EP01 diimbangi dengan laluan alternatif kena SL dan mesej tentang sampel yang besar.
- Tiada statistik prestasi, win rate atau data sejarah direka.

## G. Tindakan sebelum penerbitan
1. Sahkan V-05 dan V-06 di laman Bursa Malaysia Derivatives, dan rekod tarikh semakan dalam `docs/07_REFERENCES.md`.
2. Putuskan V-07 (break-and-retest).
3. Padankan glosari (V-10) dengan Level 1–8.
