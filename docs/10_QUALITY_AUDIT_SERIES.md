# FASA 5 — AUDIT KUALITI SIRI · EP01–EP13

## 1. Senarai semak Fasa 5 (Bahagian 16)
| Kriteria | Keputusan | Bukti |
|---|---|---|
| Keenam-enam subtopik asal diliputi, tajuk & susunan dikekalkan | ✅ | EP02–03 Scalping · EP04–05 Intraday · EP06–07 Swing · EP09 Entry Confirmation · EP10 SL & TP · EP11 RR |
| Setiap titik pengajaran asal dikekalkan | ✅ | `01_CONTENT_MAPPING.md` (semua baris ✅) |
| SOP scalping, intraday & swing dibezakan | ✅ | Rangka TF, bilangan langkah SOP (15 / 15 / 12), saiz SL, pengurusan; EP08 perbandingan khusus |
| Entry confirmation betul | ✅ | EP09 lima tahap + 4 model + 7 senario palsu + senarai semak |
| Pengiraan SL/TP, RR, saiz posisi betul | ✅ | `tools/validate_math.py` (29/29) · jadual §3 dijana oleh `tools/list_examples.js` |
| Margin tidak dikelirukan dengan risiko | ✅ | EP01 S11, EP07, EP11 S13–S14; tiada angka margin digunakan |
| Nilai kontrak FCPO | ⚠️ | 25 t disokong sumber kedua; RM1/t (RM25/mata) perlu disahkan dengan Bursa (V-05). Dipaparkan pada setiap pelan dagangan: *Verify contract specs with Bursa* |
| Carta logik & OHLC sah | ✅ | Enjin `validateOHLC` + semakan templat (`_lib.js → L.template`) dijalankan setiap kali spec dimuatkan |
| Tiada candle masa depan didedahkan awal | ✅ | Setiap contoh: zon "NOT VISIBLE" sehingga pelan ditulis; hasil hanya pada babak "OUTCOME" |
| Contoh kalah & no-trade | ✅ | 5 contoh −1R, 1 contoh tidak terisi (EP09), no-trade EP03 & EP12B CS8, failed setup EP12B CS7 |
| Rujukan tulen | ✅ | `07_REFERENCES.md`; tiada URL atau statistik prestasi direka |
| Tiada dakwaan jaminan / niat institusi | ✅ | Istilah "potensi", "kemungkinan", "hipotesis"; EP01 S12, EP09 S6 |

## 2. Taburan hasil contoh (keseimbangan pengajaran)
Contoh menang dan kalah dicampur dengan sengaja supaya pelajar tidak menganggap setup sentiasa berjaya. Tiada kadar kemenangan dirumuskan daripada contoh ini (sampel ilustrasi, bukan ujian).

## 3. Semua contoh dagangan FCPO (dijana: `node tools/list_examples.js`)
| EP | Example | Dir | TF | Entry | SL | TP | Risk pts | Planned RR | Contracts | Gross risk | Outcome |
|---|---|---|---|---|---|---|---|---|---|---|---|
| EP03 | 1H · BULLISH SCALP | Long | 5M | 4,386 | 4,378 | 4402 | 8 | 2.00 | 1 | RM200 | +2.00R |
| EP03 | 1I · BEARISH SCALP | Short | 5M | 4,612 | 4,622 | 4592 | 10 | 2.00 | 1 | RM250 | −1R |
| EP05 | 2G · BULLISH INTRADAY | Long | 5M | 4,512 | 4,494 | 4530 / 4560 | 18 | 2.67 | 2 | RM900 | +1.83R (partials) |
| EP05 | 2H · BEARISH INTRADAY | Short | 5M | 4,688 | 4,704 | 4656 | 16 | 2.00 | 1 | RM400 | +2.00R |
| EP07 | 3G · BULLISH SWING | Long | 1H | 4,200 | 4,120 | 4440 | 80 | 3.00 | 2 | RM4,000 | +3.00R |
| EP07 | 3H · BEARISH SWING | Short | 1H | 4,950 | 5,010 | 4770 | 60 | 3.00 | 1 | RM1,500 | −1R |
| EP09 | 4C · BULLISH CONFIRMATION | Long | 5M | 4,455 | 4,443 | 4479 | 12 | 2.00 | 1 | RM300 | +2.00R |
| EP09 | 4D · BEARISH CONFIRMATION | Short | 5M | 4,733 | 4,743 | 4713 | 10 | 2.00 | 1 | RM250 | no fill · no trade |
| EP10 | 5H · MANAGEMENT · TP1 → TP2 | Long | 5M | 4,500 | 4,490 | 4510 / 4530 | 10 | 3.00 | 2 | RM500 | +2.00R (partials) |
| EP10 | 5H · STOP-LOSS FIRST | Short | 5M | 4,575 | 4,587 | 4551 | 12 | 2.00 | 1 | RM300 | −1R |
| EP12A | CS1 · SCALPING BULLISH | Long | 5M | 4,446 | 4,437 | 4464 | 9 | 2.00 | 2 | RM450 | +2.00R |
| EP12A | CS2 · SCALPING BEARISH | Short | 5M | 4,528 | 4,536 | 4512 | 8 | 2.00 | 2 | RM400 | −1R |
| EP12A | CS3 · INTRADAY BULLISH | Long | 5M | 4,640 | 4,626 | 4654 / 4682 | 14 | 3.00 | 2 | RM700 | +2.00R (partials) |
| EP12A | CS4 · INTRADAY BEARISH | Short | 5M | 4,812 | 4,827 | 4782 | 15 | 2.00 | 1 | RM375 | +2.00R |
| EP12B | CS5 · SWING BULLISH | Long | 1H | 4,060 | 3,990 | 4270 | 70 | 3.00 | 1 | RM1,750 | +3.00R |
| EP12B | CS6 · SWING BEARISH | Short | 1H | 5,120 | 5,195 | 4970 | 75 | 2.00 | 1 | RM1,875 | +2.00R |
| EP12B | CS7 · FAILED SETUP | Long | 5M | 4,350 | 4,340 | 4370 | 10 | 2.00 | 1 | RM250 | −1R |

Ditambah contoh tetap: EP01 (4,500 / 4,490 / 4,520, +2R, disemak oleh `tools/check_ep01_chart.js`).

## 4. Had yang diketahui
- Suara TTS neural English (en-US-ChristopherNeural) belum disemak pendengaran oleh manusia. Disyorkan semakan sebutan nombor dan akronim, atau rakaman suara manusia menggunakan `STORYBOARD.md`.
- Bentuk carta contoh berasal daripada satu templat yang disahkan (diskala atau dicerminkan) demi ketepatan. Bentuk visual berulang antara episod; data sejarah sebenar boleh menggantikannya apabila sumber data yang disahkan tersedia.
- V-05 (tick), V-06 (waktu dagangan) dan V-07 (break-and-retest) masih menunggu pengesahan.
