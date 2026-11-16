# KNOWLEDGE CHECK & LATIHAN PRAKTIKAL — LEVEL 9
*(Episod sasaran dalam kurungan)*

## A. 18 soalan + jawapan model

1. **Beza utama scalping, intraday, swing?** *(EP02, EP08)* Tempoh pegangan dan rangka TF: scalping pegangan pendek (konteks 1H/30M, entry 5M); intraday dalam hari yang sama (D/4H → 5M/15M); swing merentasi sesi/hari (W/D → 1H/30M/15M). Ini membawa kepada jarak SL, sasaran, saiz posisi dan risiko overnight yang berbeza.
2. **Kenapa setiap gaya perlu SOP berbeza?** *(EP01, EP08)* Kerana invalidation, sasaran, kos relatif, pemantauan dan saiz posisi berbeza. SOP satu gaya akan meletakkan SL di dalam pergerakan biasa harga, atau menjadikan risiko terlalu besar, apabila dipakai untuk gaya lain.
3. **Kenapa konteks HTF penting sebelum scalping?** *(EP02)* Ia memberi arah dan lokasi. Tanpanya, pecahan struktur 5M kecil mudah disalah anggap sebagai perubahan arah.
4. **Beza POI dan entry confirmation?** *(EP09)* POI ialah lokasi. Pengesahan ialah urutan peristiwa (liquidity → MSS → displacement → execution zone) yang berlaku di lokasi itu mengikut model yang dipilih.
5. **Kenapa liquidity sweep sahaja tidak mencukupi?** *(EP09)* Sweep boleh diikuti oleh kesinambungan. Tanpa anjakan struktur dan displacement, tiada bukti reaksi mengikut model.
6. **Peranan MSS?** *(EP09)* Menunjukkan potensi perubahan arah pada TF entry: penutupan melepasi swing yang relevan selepas interaksi liquidity.
7. **Kenapa displacement penting dalam model CMI?** *(EP09)* Ia membezakan anjakan bermakna daripada pergerakan biasa, dan sering mencipta execution zone (FVG). Ia tidak membuktikan siapa yang berdagang.
8. **Bagaimana FVG membantu perancangan entry?** *(EP09)* Ia memberi zon retracement yang jelas untuk entry limit, dan rujukan invalidation yang dekat. Tidak semua FVG boleh didagangkan, dan FVG tidak perlu diisi.
9. **Kenapa SL berasaskan invalidation yang ditetapkan?** *(EP10)* Supaya SL menandakan tesis tidak sah, bukan angka arbitrari, dan supaya saiz posisi boleh dikira sebelum entry.
10. **Bagaimana liquidity digunakan untuk sasaran?** *(EP10)* Pilih liquidity bertentangan (BSL untuk long, SSL untuk short, PDH/PDL, EQH/EQL, PWH/PWL) sebagai objektif berpotensi, bukan destinasi terjamin.
11. **Bagaimana RR dikira?** *(EP11)* Reward ÷ Risk. 4,500 / 4,490 / 4,520 → 20 ÷ 10 = 2:1.
12. **Hubungan RR dan win rate?** *(EP11)* RR lebih tinggi menurunkan BE win rate: 1:2 → 33.33%. Tetapi win rate sebenar bergantung kepada strategi dan biasanya menurun apabila sasaran lebih jauh.
13. **Apakah expectancy?** *(EP11)* Purata hasil setiap dagangan: (WR × AvgWin) − (LR × AvgLoss). Contoh: +0.20R sebelum kos.
14. **Bagaimana saiz posisi berubah jika jarak SL bertambah?** *(EP11)* Berkurang secara berkadar songsang. Bajet RM500: SL 10 mata → 2 kontrak; SL 25 mata (RM625) → 0 kontrak.
15. **Kenapa margin bukan risiko maksimum?** *(EP01, EP11)* Margin ialah deposit jaminan. Risiko ditentukan oleh jarak SL × RM25 × kontrak (dan gap/slippage). Margin ½ atau ¼ tidak mengubah nilai satu mata.
16. **Kenapa kos mesti masuk dalam penilaian strategi?** *(EP11)* Kos mengurangkan ganjaran dan menambah risiko setiap dagangan. Contoh: RR 2.0 → 1.5, BE 33% → 40%.
17. **Kenapa rekod dagangan kalah?** *(EP13)* Tanpanya, metrik (win rate, expectancy, drawdown) menjadi berat sebelah dan kesilapan pelaksanaan tidak dapat dikesan.
18. **Beza failed setup dan poor execution?** *(EP12, EP13)* Failed setup: semua peraturan diikuti tetapi pasaran tidak bertindak seperti dijangka (hasil normal strategi). Poor execution: peraturan dilanggar (entry awal, SL dialihkan, saiz salah).

---

## B. 10 latihan + penyelesaian kerja

**Latihan 1 — Bina Scalping SOP** *(EP03)*. Hasil: dokumen 1 halaman yang mengikut templat `docs/04 §2`. *Rubrik:* TF dinyatakan; 10 langkah persediaan; syarat entry boleh diuji (ya/tidak); SL & TP berasaskan struktur/liquidity; had risiko harian; senarai no-trade.

**Latihan 2 — Bina Intraday SOP** *(EP05)*. Seperti di atas, ditambah senario A/B dan peraturan masa tutup posisi.

**Latihan 3 — Bina Swing SOP** *(EP07)*. Ditambah pelan overnight/event, sizing dengan SL lebar, dan peraturan Daily close.

**Latihan 4 — Kenal pasti entry confirmation** *(EP09)*. Diberi carta 5M EP01, candle #0–#21. *Jawapan:* liquidity = sweep EQL 4,494 pada #18 (low 4,491, tutup 4,495) · MSS = #20 tutup 4,508 > LH 4,503 (#16) · displacement = #20 · FVG = 4,498–4,502 (high #19 / low #21) · urutan lengkap pada penutupan #21.

**Latihan 5 — SL struktur** *(EP10)*. Long dari FVG 4,498–4,502, ekstrem sweep 4,491. *Jawapan:* invalidation = di bawah 4,491. SL = 4,490 (buffer 1 tick). Risiko dari entry 4,500 = 10 mata = RM250/kontrak.

**Latihan 6 — TP berasaskan liquidity** *(EP10)*. Long dari 4,500, EQH 4,520, PDH 4,560. *Jawapan:* TP1 = 4,520 (liquidity bertentangan terdekat, RR 2:1); TP2/runner = 4,560 jika pelan membenarkan partial. Kedua-duanya potensi, bukan terjamin.

**Latihan 7 — Kira RR** *(EP11)*. Short: entry 4,620, SL 4,632, TP 4,584. *Jawapan:* risiko 12 mata, ganjaran 36 mata, RR = **3:1**; BE win rate = 12 ÷ 48 = **25%** (sebelum kos).

**Latihan 8 — Saiz posisi FCPO** *(EP11)*. Akaun RM40,000, risiko 1% = RM400. SL 14 mata + kos setara 2 mata. *Jawapan:* risiko/kontrak = 16 × RM25 = RM400 → 400 ÷ 400 = **1 kontrak**. Tanpa kos: 14 × 25 = RM350 → 1.14 → masih **1 kontrak** (bundar ke bawah). Jika SL 20 mata: 22 × 25 = RM550 → **0 kontrak, tiada dagangan**.

**Latihan 9 — Nilai failed setup** *(EP12)*. Senario: semua syarat dipenuhi, SL kena (−1R), jurnal menunjukkan saiz dan SL betul. *Jawapan:* kualiti strategi = hasil normal (tiada kesimpulan daripada 1 dagangan); pelaksanaan = baik; risiko = baik; disiplin = baik. Tindakan: rekod dan teruskan pengumpulan sampel.

**Latihan 10 — Lengkapkan jurnal** *(EP13)*. Isi 22 medan untuk dagangan EP01: tarikh (hipotetikal) · FCPO bulan ketiga (*contoh*) · scalping · sesi petang (*contoh*) · HTF bullish · POI 15M 4,488–4,496 · SSL EQL 4,494 · sweep+MSS+disp+FVG · entry 4,500 · SL 4,490 · TP 4,520 · 1 kontrak · RR rancangan 2.0 · P&L kasar +RM500 · kos (sebenar) · MFE +21 mata · MAE −1 mata · tangkapan skrin · pelaksanaan: limit terisi · patuh peraturan: ya · pengajaran: tunggu retrace.
