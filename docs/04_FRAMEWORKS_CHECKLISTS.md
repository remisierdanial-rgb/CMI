# RANGKA KERJA & SENARAI SEMAK LEVEL 9
*Alat bantu keputusan, bukan jaminan keuntungan. Semua timeframe ialah rangka pengajaran cadangan CMI dan perlu diuji.*

---

## 1. Aliran kerja trading CMI (bersepadu)
```
MARKET CONTEXT ........ Bias HTF (bullish / bearish / neutral) + syarat invalidation bias
  ↓
TRADING STYLE ......... Scalping / Intraday / Swing → menentukan TF & tempoh pegangan
  ↓
STRUCTURE & LIQUIDITY . HH/HL/LH/LL · BOS · CHoCH · MSS · BSL · SSL · EQH · EQL · PDH/PDL
  ↓
POI SELECTION ......... OB · FVG · BB · MB · RB · S&D · Premium/Discount
  ↓
ENTRY CONFIRMATION .... Liquidity → MSS/CHoCH → Displacement → FVG / Execution zone
  ↓
TRADE PLANNING ........ Entry · SL struktur · TP liquidity · RR · saiz posisi
  ↓
EXECUTION & MGMT ...... Ikut peraturan; tiada perubahan pelan semasa dagangan
  ↓
JOURNAL & EVALUATION .. Rekod setiap dagangan (termasuk kalah & skip) → metrik → semakan
```

## 2. Scalping SOP — senarai semak
**Persediaan (sebelum sesi)**
- [ ] Kalendar dagangan & sesi semasa disemak
- [ ] Sesi lepas disemak · PDH / PDL ditanda
- [ ] Aras Weekly / Daily penting ditanda
- [ ] Liquidity pools (EQH / EQL / session H/L) ditanda
- [ ] Bias awal: bullish / bearish / neutral (+ syarat invalidation)
- [ ] POI HTF/MTF (1H/30M, 15M) dipilih (maksimum 2–3)
- [ ] Jadual berita / peristiwa disemak
- [ ] Had risiko maksimum hari ini (RM) & bilangan dagangan maksimum ditulis

**Pelaksanaan (15 langkah)**
1. Konteks HTF  2. Liquidity intraday  3. POI  4. Tunggu harga sampai  5. Perhati interaksi liquidity  6. MSS/CHoCH bermakna  7. Nilai displacement  8. Execution zone (FVG)  9. Harga/syarat entry  10. SL & invalidation  11. Sasaran  12. RR  13. **Laksana hanya jika semua syarat dipenuhi**  14. Urus mengikut peraturan  15. Rekod dalam jurnal

**No-trade:** tiada struktur jelas · tiada POI · tengah julat · tiada interaksi liquidity · tiada pengesahan · spread/slippage berlebihan · volatiliti luar biasa · sasaran terlalu dekat · RR lemah · had risiko harian dicapai · tidak bersedia dari segi emosi/mental.

## 3. Intraday SOP — senarai semak
- [ ] Analisis Daily & 4H · struktur besar · liquidity utama · PDH/PDL
- [ ] POI 1H/30M ditanda · dealing range harian & 50%
- [ ] Senario **A (utama)** & **B (alternatif)**, setiap satu dengan syarat invalidation
- [ ] Peristiwa penting hari ini · risiko maksimum harian · had cubaan
- [ ] Peraturan masa: tutup posisi sebelum ____ (akhir sesi/hari)
- [ ] Pelaksanaan: 15M interaksi liquidity → pengesahan → 5M entry → SL/TP → RR → laksana → urus → rekod

**No-trade:** konteks tidak jelas · di antara aras tanpa setup · tiada POI sah · tiada pengesahan · ganjaran tidak mencukupi · pelaksanaan lemah · had risiko dicapai · terlalu dekat akhir sesi tanpa pelan.

## 4. Swing Trading SOP — senarai semak
- [ ] Monthly/Weekly konteks · major swing H/L · bias Daily
- [ ] Major BSL/SSL · PWH/PWL/PMH/PML · POI HTF · Premium/Discount
- [ ] Liquidity bertentangan utama (sasaran)
- [ ] Tempoh pegangan dirancang · risiko overnight & event dinilai
- [ ] Saiz posisi dikira daripada SL lebar (bundar ke bawah; 0 kontrak = tiada dagangan)
- [ ] Margin & modal mencukupi untuk pendedahan yang dirancang
- [ ] Peraturan exit: tesis tidak sah (penutupan Daily) · trailing · partial

**No-trade:** struktur HTF tidak jelas · bukan di POI relevan · tiada sasaran liquidity · RR lemah · jarak SL menjadikan sizing tidak sesuai · event risk tidak dinilai · modal/margin tidak mencukupi.

## 5. Senarai semak Entry Confirmation (CMI)
| # | Soalan | ✓/✕ |
|---|---|---|
| 1 | Adakah konteks arah jelas? | |
| 2 | Adakah harga berada di POI terpilih? | |
| 3 | Adakah terdapat interaksi liquidity bermakna? | |
| 4 | Adakah anjakan struktur relevan dengan konteks? | |
| 5 | Adakah displacement hadir? | |
| 6 | Adakah execution zone jelas? | |
| 7 | Adakah invalidation jelas? | |
| 8 | Adakah jarak sasaran mencukupi? | |
| 9 | Adakah risiko dalam had yang ditetapkan? | |
Satu ✕ pada soalan 1, 7 atau 9 → **tiada dagangan**.

## 6. Rangka Stop Loss & Take Profit
**SL:** (1) Kenal pasti apa yang membatalkan tesis. (2) Letak SL di luar aras itu (swing, sempadan POI, ekstrem sweep). (3) Tambah buffer berasaskan tick/volatiliti/spread. (4) Masukkan buffer dalam saiz posisi. (5) Jangan sekali-kali lebarkan SL selepas entry.
**TP:** (1) Pilih rujukan pasaran yang logik: liquidity bertentangan (BSL/SSL, EQH/EQL, PDH/PDL, PWH/PWL, swing utama). (2) Pastikan tiada liquidity bertentangan yang dekat menghalang. (3) Pilih kaedah: fixed · liquidity · partial · trailing · structure-based · time-based. (4) Kira kesan kaedah pada RR realised.

## 7. Panduan pengiraan RR
```
Risk (pts)   = |Entry − SL|          Reward (pts) = |TP − Entry|
RR           = Reward ÷ Risk
BE win rate  = Risk ÷ (Risk + Reward)      (sebelum kos)
Expectancy   = (WR × AvgWin) − (LR × AvgLoss)
Net RR       = (Reward − cost) ÷ (Risk + cost)   (kos dalam mata setara)
```
Contoh: 4,500 / 4,490 / 4,520 → 10 / 20 → **2:1** · BE 33.33%.

## 8. Panduan position sizing
```
Nilai 1 mata/kontrak = tick RM1/tan × 25 tan = RM25   (⚠ sahkan dengan Bursa)
RM risk/kontrak      = (jarak SL + buffer) × RM25 (+ kos & slippage dijangka)
Kontrak              = floor( Bajet risiko RM ÷ RM risk/kontrak )
Jika hasil = 0       → TIADA DAGANGAN (jangan bundar ke atas)
```
**Margin tidak masuk dalam formula risiko.** Margin hanya menentukan sama ada akaun boleh membuka posisi.

## 9. Contoh risiko FCPO (gross, hipotetikal)
| Gaya | Entry | SL | TP | Risiko mata | RM/kontrak | RR | Bajet | Kontrak |
|---|---|---|---|---|---|---|---|---|
| Scalping | 4,500 | 4,490 | 4,520 | 10 | 250 | 2.0 | RM500 | 2 |
| Scalping + kos (2 mata) | 4,500 | 4,490 | 4,520 | 12 (bersih) | 300 | 1.5 | RM500 | 1 |
| Intraday | 4,512 | 4,494 | 4,530 / 4,560 | 18 | 450 | 1.0 / 2.67 | RM900 | 2 |
| Swing | 4,200 | 4,120 | 4,440 | 80 | 2,000 | 3.0 | RM1,000 | **0 → no trade** |
| Swing | 4,200 | 4,120 | 4,440 | 80 | 2,000 | 3.0 | RM4,000 | 2 |
