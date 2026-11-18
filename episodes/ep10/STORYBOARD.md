# VIDEO 10 — Stop Loss & Take Profit

*Dijana automatik daripada `episodes/ep10/spec.js` (sumber kebenaran) dan `build/timeline.json`. Jangan sunting fail ini secara manual.*

**Durasi:** 14:57.4 · **Babak:** 26 · **Cue narasi:** 121 · **Suara:** English · en-US-ChristopherNeural (TTS) · **Sari kata:** Bahasa Melayu

## Babak 1 · INTRODUCTION  `00:00.0–00:25.8`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 00:00.8 | Welcome to Video 10, the fifth subtopic: Stop Loss and Take Profit. | Selamat datang ke Video 10, subtopik kelima: Stop Loss dan Take Profit. |
| 00:05.6 | The stop-loss defines when our thesis is wrong. The take-profit defines where we expect price might go. | Stop-loss menentukan bila tesis kita salah. Take-profit menentukan ke mana kita jangka harga mungkin pergi. |
| 00:12.4 | We will learn structural stop-losses, buffers and invalidation. | Kita akan belajar stop-loss struktur, buffer dan invalidation. |
| 00:16.5 | Then liquidity-based targets, six take-profit methods, and two trade-management animations: one winner and one loser. | Kemudian sasaran berasaskan liquidity, enam kaedah take-profit, dan dua animasi pengurusan dagangan: satu menang, satu kalah. |

## Babak 2 · 5A · UNDERSTANDING STOP-LOSS  `00:25.8–01:08.1`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 00:26.5 | What is a stop-loss? A stop-loss is an order to close the position when price reaches the level that invalidates the trade thesis. | Apakah stop-loss? Stop-loss ialah order untuk menutup posisi apabila harga mencapai aras yang membatalkan tesis dagangan. |
| 00:34.5 | It is necessary because, without a stop, a single loss can become too large for the account. | Ia perlu kerana tanpa stop, satu kerugian boleh menjadi terlalu besar untuk akaun. |
| 00:40.2 | A stop-loss is not margin. Margin is a collateral deposit. The stop-loss defines the planned loss. | Stop-loss bukan margin. Margin ialah deposit jaminan. Stop-loss menentukan kerugian yang dirancang. |
| 00:48.1 | The stop distance in points is not the same as the risk in ringgit. Risk is the distance times 25 ringgit times the number of contracts. | Jarak stop dalam mata tidak sama dengan risiko dalam ringgit. Risiko ialah jarak darab 25 ringgit darab bilangan kontrak. |
| 00:56.9 | A stop-loss must reflect invalidation, not an arbitrary number like ten points for every setup. | Stop-loss mesti mencerminkan invalidation, bukan nombor arbitrari seperti sepuluh mata untuk semua setup. |
| 01:02.8 | And no stop placement can guarantee protection against gaps or slippage. | Dan tiada penempatan stop yang boleh menjamin perlindungan daripada gap atau slippage. |

## Babak 3 · 5A · STOP ORDER ≠ GUARANTEED PRICE  `01:08.1–01:41.9`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 01:08.9 | See the difference between the planned stop and the actual fill price. | Lihat perbezaan antara stop yang dirancang dan harga isian sebenar. |
| 01:12.7 | The plan: a stop at 4,490, a loss of 10 points, or 250 ringgit. | Pelan: stop pada 4,490, iaitu kerugian 10 mata, atau RM250. |
| 01:19.2 | In a fast market, the stop order might fill at 4,486. Four points of slippage make the loss 350 ringgit. | Dalam pasaran yang pantas, order stop mungkin terisi pada 4,486. Slippage 4 mata menjadikan kerugian RM350. |
| 01:28.4 | If price opens with a gap at 4,478, the loss becomes 22 points, which is 550 ringgit. | Jika harga dibuka dengan gap pada 4,478, kerugian menjadi 22 mata, iaitu RM550. |
| 01:36.4 | So position size must leave room for realistic execution conditions. | Oleh itu, saiz posisi perlu meninggalkan ruang untuk keadaan pelaksanaan yang realistik. |

## Babak 4 · 5B · STRUCTURAL STOP-LOSS  `01:41.9–02:12.1`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 01:42.6 | Structural stop-losses. Five approaches. | Stop-loss struktur. Lima pendekatan. |
| 01:46.6 | For a bullish setup, below a relevant swing low. For a bearish setup, above a relevant swing high. | Untuk setup bullish, di bawah swing low yang relevan. Untuk setup bearish, di atas swing high yang relevan. |
| 01:53.7 | Beyond the invalidation boundary of the selected POI. | Di luar sempadan invalidation POI yang dipilih. |
| 01:57.0 | Beyond the extreme of a meaningful liquidity sweep, as in all our examples. | Di luar ekstrem liquidity sweep yang bermakna, seperti dalam semua contoh kita. |
| 02:01.6 | Or beyond the structural level that your trading model requires. | Atau di luar aras struktur yang diperlukan oleh model trading anda. |
| 02:05.2 | Stop placement depends on the setup. Don't use the same stop location for every setup. | Penempatan stop bergantung pada setup. Jangan gunakan lokasi stop yang sama untuk setiap setup. |

## Babak 5 · 5C · STOP-LOSS BUFFER  `02:12.1–02:58.8`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 02:12.9 | A buffer is extra distance beyond the structural level. | Buffer ialah jarak tambahan di luar aras struktur. |
| 02:16.1 | Traders use a buffer because of volatility, tick size, spread, slippage and execution conditions. | Pedagang menggunakan buffer kerana volatiliti, saiz tick, spread, slippage dan keadaan pelaksanaan. |
| 02:23.0 | With a one-point buffer below the 4,491 sweep low, the stop is at 4,490. The risk is 10 points, 250 ringgit, so two contracts. | Dengan buffer satu mata di bawah low sweep 4,491, stop pada 4,490. Risiko 10 mata, RM250, jadi dua kontrak. |
| 02:35.5 | With an arbitrary ten-point buffer, the stop is at 4,481. The risk is 19 points, 475 ringgit, so only one contract. | Dengan buffer arbitrari 10 mata, stop pada 4,481. Risiko 19 mata, RM475, jadi hanya satu kontrak. |
| 02:46.5 | A large buffer is not automatically safer. It reduces position size and RR. Whatever its size, the buffer must be included in the position-size calculation. | Buffer yang besar tidak semestinya lebih selamat. Ia mengurangkan saiz posisi dan RR. Apa pun saiznya, buffer mesti dimasukkan dalam pengiraan saiz posisi. |

## Babak 6 · 5D · INVALIDATION  `02:58.8–03:29.0`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 02:59.6 | Invalidation: what cancels the original thesis? | Invalidation: apakah yang membatalkan tesis asal? |
| 03:02.9 | On the left, a temporary wick trades through the level, but price closes back and is accepted above it. For some models, this does not yet invalidate the thesis. | Di kiri, wick sementara menembusi aras, tetapi harga ditutup semula dan diterima di atasnya. Bagi sesetengah model, ini belum membatalkan tesis. |
| 03:13.1 | On the right, price closes and is accepted below the zone. The structure supporting the thesis has been broken. | Di kanan, harga ditutup dan diterima di bawah zon. Struktur yang menyokong tesis telah dipecahkan. |
| 03:20.2 | Higher-timeframe and lower-timeframe invalidation are also different. The invalidation criteria must be set before entry. | Invalidation timeframe tinggi dan rendah juga berbeza. Kriteria invalidation mesti ditetapkan sebelum entry. |

## Babak 7 · 5D · NEVER WIDEN THE STOP  `03:29.0–03:55.3`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 03:29.7 | One rule that must never be broken: do not move the stop-loss further away just to avoid taking a loss. | Satu peraturan yang tidak boleh dilanggar: jangan alihkan stop-loss lebih jauh semata-mata untuk mengelak daripada mengambil kerugian. |
| 03:36.0 | Moving the stop from 4,490 to 4,470 changes the risk from 10 points to 30 points, three times as much, from 250 ringgit to 750 ringgit per contract. | Mengalihkan stop dari 4,490 ke 4,470 menukar risiko daripada 10 mata kepada 30 mata, iaitu tiga kali ganda, daripada RM250 kepada RM750 setiap kontrak. |
| 03:48.9 | A widened stop is not risk management. It is a new plan made by emotion. | Stop yang dilebarkan bukan pengurusan risiko. Ia ialah pelan baharu yang dibuat oleh emosi. |

## Babak 8 · 5E · UNDERSTANDING TAKE-PROFIT  `03:55.3–04:23.1`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 03:56.0 | Now the take-profit. The take-profit is the level where the position is closed at a profit. | Sekarang take-profit. Take-profit ialah aras di mana posisi ditutup dengan keuntungan. |
| 04:01.8 | The target must be set before entry, so that the risk-to-reward can be calculated and the decision is not made by emotion. | Sasaran mesti ditetapkan sebelum entry, supaya risk-to-reward boleh dikira dan keputusan tidak dibuat oleh emosi. |
| 04:08.5 | A fixed target uses a set distance, for example 2R. A structure- or liquidity-based target uses a logical market level. | Sasaran tetap menggunakan jarak tertentu, contohnya 2R. Sasaran berasaskan struktur atau liquidity menggunakan aras pasaran yang logik. |
| 04:17.3 | In the CMI SOP, every target must have a market reference that can be explained. | Dalam SOP CMI, setiap sasaran mesti mempunyai rujukan pasaran yang boleh dijelaskan. |

## Babak 9 · 5F · LIQUIDITY-BASED TARGETS  `04:23.1–04:49.3`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 04:23.9 | Liquidity-based target references. | Rujukan sasaran berasaskan liquidity. |
| 04:26.3 | Buy-Side and Sell-Side Liquidity. Equal Highs and Equal Lows. | Buy-Side dan Sell-Side Liquidity. Equal Highs dan Equal Lows. |
| 04:31.2 | The Previous Day High and Low. The Previous Week High and Low. | Previous Day High dan Low. Previous Week High dan Low. |
| 04:36.0 | Major swing highs and swing lows. | Swing high dan swing low utama. |
| 04:38.5 | Opposing liquidity, and relevant higher-timeframe structural levels. | Liquidity bertentangan, dan aras struktur timeframe tinggi yang relevan. |
| 04:42.7 | Remember, liquidity levels are potential objectives, not guaranteed price destinations. | Ingat, aras liquidity ialah objektif yang berpotensi, bukan destinasi harga yang terjamin. |

## Babak 10 · 5F · BULLISH & BEARISH TARGETS  `04:49.3–05:15.9`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 04:50.0 | Target selection for bullish and bearish setups. | Pemilihan sasaran untuk setup bullish dan bearish. |
| 04:53.0 | For a long, the first target is the nearest opposing liquidity, for example Equal Highs. The second target might be PDH. | Untuk long, sasaran pertama ialah liquidity bertentangan yang terdekat, contohnya Equal Highs. Sasaran kedua mungkin PDH. |
| 05:01.6 | For a short, the target is Sell-Side Liquidity below, for example Equal Lows, then PDL. | Untuk short, sasaran ialah Sell-Side Liquidity di bawah, contohnya Equal Lows, kemudian PDL. |
| 05:07.9 | Also check for obstacles: if there is opposing liquidity very close to the entry, there may not be enough room for reward. | Periksa juga halangan: jika ada liquidity bertentangan yang sangat dekat dengan entry, ruang ganjaran mungkin tidak mencukupi. |

## Babak 11 · 5G · SIX TAKE-PROFIT METHODS  `05:15.9–05:56.7`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 05:16.7 | Six take-profit methods. | Enam kaedah take-profit. |
| 05:18.6 | One, a fixed target: easy to test, but it ignores structure. Two, a liquidity target: it has a market reference, but price may reverse just before reaching it. | Satu, sasaran tetap: mudah diuji, tetapi tidak mengikut struktur. Dua, sasaran liquidity: mempunyai rujukan pasaran, tetapi harga mungkin berbalik sebelum sampai. |
| 05:29.7 | Three, partials: they lock in part of the profit, but reduce the realised RR. | Tiga, partial: mengunci sebahagian keuntungan, tetapi mengurangkan RR yang direalisasikan. |
| 05:34.9 | Four, a trailing stop: it lets big moves run, but can exit too early during a retracement. | Empat, trailing stop: membiarkan pergerakan besar berjalan, tetapi boleh keluar terlalu awal ketika retracement. |
| 05:41.1 | Five, a structure-based exit: exit when opposing structure appears. Six, a time-based exit: exit after a set period or at the end of the session. | Lima, exit berasaskan struktur: keluar apabila struktur berlawanan muncul. Enam, exit berasaskan masa: keluar selepas tempoh tertentu atau pada akhir sesi. |
| 05:51.4 | Every method changes the realised RR, and suits different conditions. | Setiap kaedah mengubah RR yang direalisasikan, dan sesuai untuk keadaan yang berbeza. |

## Babak 12 · 5H · MANAGEMENT · TP1 → TP2 · CONTEXT & LIQUIDITY  `05:56.7–06:48.5`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 05:57.5 | A full trade-management animation. We use two contracts so the partial can be shown: entry, initial stop, TP1, partial exit, stop adjustment, TP2 and final exit. | Animasi pengurusan dagangan penuh. Kita gunakan dua kontrak supaya partial boleh ditunjukkan: entry, stop awal, TP1, partial, pelarasan stop, TP2 dan exit akhir. |
| 06:10.4 | The 15M chart shows a bullish POI around 4,488 to 4,496. | Carta 15M menunjukkan POI bullish di sekitar 4,488 hingga 4,496. |
| 06:17.5 | Above, two highs at 4,520 form Equal Highs, potential Buy-Side Liquidity. | Di atas, dua high pada 4,520 membentuk Equal Highs, iaitu potensi Buy-Side Liquidity. |
| 06:23.9 | Below, two lows at 4,494 form Equal Lows, potential Sell-Side Liquidity, sitting inside the POI. | Di bawah, dua low pada 4,494 membentuk Equal Lows, potensi Sell-Side Liquidity, yang terletak di dalam POI. |
| 06:32.1 | Internal structure on the 5M chart is still bearish. The last lower high is at 4,503. | Struktur dalaman pada carta 5M masih bearish. Lower high terakhir berada pada 4,503. |
| 06:39.7 | No entry yet. Price is only approaching the location. A POI is a location, not a trigger. | Belum ada entry. Harga hanya menghampiri lokasi. POI ialah lokasi, bukan pencetus. |

## Babak 13 · 5H · MANAGEMENT · TP1 → TP2 · CONFIRMATION  `06:48.5–07:30.4`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 06:49.3 | The next candle drops to 4,491, trading through the Equal Lows, then closes back above 4,494. | Candle seterusnya turun ke 4,491, melepasi Equal Lows, kemudian ditutup semula di atas 4,494. |
| 06:58.2 | This is a possible liquidity sweep. But a sweep on its own is not enough for an entry. | Ini kemungkinan liquidity sweep. Tetapi sweep sahaja belum mencukupi untuk entry. |
| 07:03.8 | Then a large bullish candle closes at 4,508, breaking the lower high at 4,503. This is a potential bullish MSS, with displacement. | Kemudian candle bullish yang besar ditutup pada 4,508, menembusi lower high 4,503. Ini potensi bullish MSS, disertai displacement. |
| 07:15.2 | The displacement leaves a Fair Value Gap between 4,498 and 4,502. | Displacement ini meninggalkan Fair Value Gap antara 4,498 dan 4,502. |
| 07:22.0 | The CMI confirmation sequence is now complete: liquidity, MSS, displacement and FVG. | Urutan pengesahan CMI kini lengkap: liquidity, MSS, displacement dan FVG. |

## Babak 14 · 5H · MANAGEMENT · TP1 → TP2 · TRADE PLAN  `07:30.4–08:25.2`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 07:31.1 | Before price moves, we write the trade plan. | Sebelum harga bergerak, kita tulis pelan dagangan. |
| 07:34.2 | A conditional buy entry at 4,500, inside the FVG, only if price returns to this zone. | Entry beli bersyarat pada 4,500, di dalam FVG, hanya jika harga kembali ke zon ini. |
| 07:41.2 | Stop-loss at 4,490, beyond the sweep extreme. If price reaches this level, the bullish hypothesis is invalid. | Stop-loss pada 4,490, di bawah ekstrem sweep. Jika harga sampai ke paras ini, hipotesis bullish dianggap tidak sah. |
| 07:50.4 | TP1 at 4,510, at 1R, for a partial exit. The final target is 4,530, the next opposing liquidity, at 3R. | TP1 pada 4,510, iaitu 1R, untuk partial. Sasaran akhir pada 4,530, iaitu liquidity bertentangan seterusnya, 3R. |
| 08:02.2 | Risk is 10 points, and potential reward is 30 points. Gross risk-to-reward is 3 to 1. | Risiko 10 mata, potensi ganjaran 30 mata. Gross risk-to-reward ialah 3 berbanding 1. |
| 08:09.1 | With 2 contracts, gross risk is 500 ringgit and gross potential reward is 1,500 ringgit, before costs and slippage. | Dengan 2 kontrak, risiko kasar RM500 dan potensi ganjaran kasar RM1,500, sebelum kos dan slippage. |
| 08:17.6 | The right side of the chart is still hidden. The decision is made only with the information available. | Bahagian kanan carta masih tersembunyi. Keputusan dibuat hanya dengan maklumat yang tersedia. |

## Babak 15 · 5H · MANAGEMENT · TP1 → TP2 · OUTCOME  `08:25.2–09:01.2`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 08:25.9 | Now we reveal what happened. | Sekarang kita dedahkan apa yang berlaku. |
| 08:27.8 | Price returns to the FVG. The 4,500 order is filled. | Harga kembali ke FVG. Order 4,500 terisi. |
| 08:33.4 | TP1 at 4,510 is reached. Half the position is closed, and the stop on the remainder moves to the entry price. | TP1 4,510 tercapai. Separuh posisi ditutup, dan stop-loss baki posisi dialihkan ke harga entry. |
| 08:42.3 | Price continues to 4,530. The remaining position is closed at the final target. | Harga meneruskan pergerakan ke 4,530. Baki posisi ditutup di sasaran akhir. |
| 08:49.0 | The gross result is 1,000 ringgit against an initial risk of 500 ringgit, which is 2 R. Partials reduce the result compared with holding everything, but lock in part of the profit earlier. | Hasil kasar RM1,000 berbanding risiko awal RM500, iaitu 2R. Partial mengurangkan hasil berbanding memegang semua posisi, tetapi mengunci sebahagian keuntungan lebih awal. |

## Babak 16 · 5H · STOP-LOSS FIRST · CONTEXT & LIQUIDITY  `09:01.2–09:48.0`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 09:01.9 | Now an example where price hits the stop-loss before the target. This bearish setup looks just as good as the previous one. | Sekarang contoh di mana harga mencapai stop-loss sebelum sasaran. Setup bearish ini kelihatan sama baiknya dengan contoh sebelum ini. |
| 09:09.6 | The 15M chart shows a bearish POI around 4,580 to 4,589. | Carta 15M menunjukkan POI bearish di sekitar 4,580 hingga 4,589. |
| 09:16.4 | Below, two lows at 4,551 form Equal Lows, potential Sell-Side Liquidity. | Di bawah, dua low pada 4,551 membentuk Equal Lows, iaitu potensi Sell-Side Liquidity. |
| 09:23.0 | Above, two highs at 4,582 form Equal Highs, potential Buy-Side Liquidity, sitting inside the POI. | Di atas, dua high pada 4,582 membentuk Equal Highs, potensi Buy-Side Liquidity, yang terletak di dalam POI. |
| 09:31.4 | Internal structure on the 5M chart is still bullish. The last higher low is at 4,571. | Struktur dalaman pada carta 5M masih bullish. Higher low terakhir berada pada 4,571. |
| 09:39.2 | No entry yet. Price is only approaching the location. A POI is a location, not a trigger. | Belum ada entry. Harga hanya menghampiri lokasi. POI ialah lokasi, bukan pencetus. |

## Babak 17 · 5H · STOP-LOSS FIRST · CONFIRMATION  `09:48.0–10:31.7`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 09:48.8 | The next candle rallies to 4,586, trading through the Equal Highs, then closes back below 4,582. | Candle seterusnya naik ke 4,586, melepasi Equal Highs, kemudian ditutup semula di bawah 4,582. |
| 09:57.9 | This is a possible liquidity sweep. But a sweep on its own is not enough for an entry. | Ini kemungkinan liquidity sweep. Tetapi sweep sahaja belum mencukupi untuk entry. |
| 10:03.5 | Then a large bearish candle closes at 4,565, breaking the higher low at 4,571. This is a potential bearish MSS, with displacement. | Kemudian candle bearish yang besar ditutup pada 4,565, menembusi higher low 4,571. Ini potensi bearish MSS, disertai displacement. |
| 10:15.8 | The displacement leaves a Fair Value Gap between 4,573 and 4,577. | Displacement ini meninggalkan Fair Value Gap antara 4,573 dan 4,577. |
| 10:23.3 | The CMI confirmation sequence is now complete: liquidity, MSS, displacement and FVG. | Urutan pengesahan CMI kini lengkap: liquidity, MSS, displacement dan FVG. |

## Babak 18 · 5H · STOP-LOSS FIRST · TRADE PLAN  `10:31.7–11:22.7`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 10:32.4 | Before price moves, we write the trade plan. | Sebelum harga bergerak, kita tulis pelan dagangan. |
| 10:35.5 | A conditional sell entry at 4,575, inside the FVG, only if price returns to this zone. | Entry jual bersyarat pada 4,575, di dalam FVG, hanya jika harga kembali ke zon ini. |
| 10:43.4 | Stop-loss at 4,587, beyond the sweep extreme. If price reaches this level, the bearish hypothesis is invalid. | Stop-loss pada 4,587, di atas ekstrem sweep. Jika harga sampai ke paras ini, hipotesis bearish dianggap tidak sah. |
| 10:52.9 | The target is 4,551, the Equal Lows, potential Sell-Side Liquidity on the opposite side. | Sasaran pada 4,551, Equal Lows, iaitu potensi Sell-Side Liquidity di arah bertentangan. |
| 11:00.1 | Risk is 12 points, and potential reward is 24 points. Gross risk-to-reward is 2 to 1. | Risiko 12 mata, potensi ganjaran 24 mata. Gross risk-to-reward ialah 2 berbanding 1. |
| 11:07.2 | With one contract, gross risk is 300 ringgit and gross potential reward is 600 ringgit, before costs and slippage. | Dengan 1 kontrak, risiko kasar RM300 dan potensi ganjaran kasar RM600, sebelum kos dan slippage. |
| 11:15.1 | The right side of the chart is still hidden. The decision is made only with the information available. | Bahagian kanan carta masih tersembunyi. Keputusan dibuat hanya dengan maklumat yang tersedia. |

## Babak 19 · 5H · STOP-LOSS FIRST · OUTCOME  `11:22.7–11:59.0`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 11:23.4 | Now we reveal what happened. | Sekarang kita dedahkan apa yang berlaku. |
| 11:25.3 | Price returns to the FVG. The 4,575 order is filled. | Harga kembali ke FVG. Order 4,575 terisi. |
| 11:31.6 | But price keeps rising and hits the stop-loss at 4,587. A loss of 12 points per contract, which is one R, or 300 ringgit gross. | Namun harga terus naik dan mencapai stop-loss 4,587. Kerugian 12 mata setiap kontrak, iaitu satu R, RM300 kasar. |
| 11:42.6 | The plan was followed and the loss was controlled. It is recorded in the journal, not answered with a revenge trade. | Pelan diikuti dan kerugian dikawal. Ia direkod dalam jurnal, bukan dibalas dengan dagangan dendam. |
| 11:49.5 | Losses are a normal part of trading. The purpose of risk management is to control exposure, not to eliminate every loss. | Kerugian adalah sebahagian normal trading. Tujuan pengurusan risiko ialah mengawal pendedahan, bukan menghapuskan semua kerugian. |

## Babak 20 · 5I · FCPO SL & TP EXAMPLE  `11:59.0–12:47.7`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 11:59.8 | A hypothetical FCPO example. Long entry at 4,500, structural stop-loss at 4,490, and an initial target of 4,520. | Contoh FCPO hipotetikal. Long entry 4,500, stop-loss struktur 4,490, dan sasaran awal 4,520. |
| 12:12.1 | The stop distance is 10 points. The target distance is 20 points. Gross reward-to-risk is 2 to 1. | Jarak stop 10 mata. Jarak sasaran 20 mata. Gross reward-to-risk ialah 2 berbanding 1. |
| 12:20.3 | For a standard FCPO contract of 25 metric tonnes, one point is worth 25 ringgit per contract. A 10-point adverse move is worth 250 ringgit, and a 20-point favourable move is worth 500 ringgit. | Untuk kontrak standard FCPO 25 tan metrik, satu mata bernilai RM25 setiap kontrak. Pergerakan 10 mata yang merugikan bernilai RM250, dan pergerakan 20 mata yang menguntungkan bernilai RM500. |
| 12:34.5 | These are gross price-movement calculations, before brokerage, exchange fees, taxes where applicable, slippage and other costs. The actual result may differ because of execution. | Ini pengiraan pergerakan harga kasar, sebelum brokerage, yuran bursa, cukai jika berkaitan, slippage dan kos lain. Hasil sebenar mungkin berbeza disebabkan pelaksanaan. |

## Babak 21 · KNOWLEDGE CHECK  `12:47.7–13:31.5`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 12:48.4 | Knowledge check. Try to answer before the answer appears. | Semakan pengetahuan. Cuba jawab sebelum jawapan dipaparkan. |
| 12:52.8 | Question one: why should the stop-loss be based on predefined invalidation? | Soalan satu: kenapa stop-loss perlu berasaskan invalidation yang ditetapkan lebih awal? |
| 12:57.3 | Answer: so the stop marks where the thesis is wrong, and the position size can be calculated before entry. | Jawapan: supaya stop menandakan di mana tesis salah, dan saiz posisi boleh dikira sebelum entry. |
| 13:03.7 | Question two: how is liquidity used for targets? | Soalan dua: bagaimana liquidity digunakan untuk sasaran? |
| 13:06.9 | Answer: use opposing liquidity, such as Equal Highs, Equal Lows, PDH or PDL, as potential objectives, not guaranteed ones. | Jawapan: gunakan liquidity bertentangan, seperti Equal Highs, Equal Lows, PDH atau PDL, sebagai objektif yang berpotensi, bukan terjamin. |
| 13:16.8 | Question three: is a larger buffer automatically safer? | Soalan tiga: adakah buffer yang lebih besar secara automatik lebih selamat? |
| 13:20.4 | Answer: no. It increases the ringgit risk per contract, and reduces size and RR. Include the buffer in the size calculation. | Jawapan: tidak. Ia menambah risiko ringgit setiap kontrak, dan mengurangkan saiz serta RR. Masukkan buffer dalam pengiraan saiz. |

## Babak 22 · SUMMARY  `13:31.5–13:55.0`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 13:32.3 | To summarise. | Ringkasnya. |
| 13:33.6 | The stop-loss is structural invalidation set in advance. Never widen it. | Stop-loss ialah invalidation struktur yang ditetapkan lebih awal. Jangan sekali-kali melebarkannya. |
| 13:39.0 | Buffers and slippage are part of the ringgit risk. | Buffer dan slippage ialah sebahagian daripada risiko ringgit. |
| 13:41.8 | Targets need a market reference. Liquidity is a potential objective, not a guaranteed one. | Sasaran memerlukan rujukan pasaran. Liquidity ialah objektif berpotensi, bukan terjamin. |
| 13:48.1 | Six take-profit methods, each changing the realised RR. Losses are normal. | Enam kaedah take-profit, setiap satu mengubah RR yang direalisasikan. Kerugian adalah normal. |

## Babak 23 · EXERCISE  `13:55.0–14:29.2`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 13:55.7 | Here is the exercise for this video. | Latihan untuk video ini. |
| 13:58.0 | Exercise five: long from the FVG at 4,498 to 4,502, with a sweep low at 4,491. Where is the invalidation, where is the stop with a one-point buffer, and what is the risk in ringgit? | Latihan lima: long dari FVG 4,498 hingga 4,502, low sweep 4,491. Di mana invalidation, di mana stop dengan buffer satu mata, dan berapa risikonya dalam ringgit? |
| 14:14.2 | Exercise six: long from 4,500, with Equal Highs at 4,520 and PDH at 4,560. Choose TP1 and TP2, and justify each one. | Latihan enam: long dari 4,500, dengan Equal Highs pada 4,520 dan PDH pada 4,560. Pilih TP1 dan TP2, dan beri justifikasi. |

## Babak 24 · UP NEXT  `14:29.2–14:41.7`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 14:30.0 | In Video 11, the sixth subtopic: Risk-to-Reward, win rate, expectancy, costs, position sizing, and the difference between margin and risk. | Dalam Video 11, subtopik keenam: Risk-to-Reward, win rate, expectancy, kos, saiz posisi, dan perbezaan margin dengan risiko. |

## Babak 25 · REFERENCES  `14:41.7–14:48.4`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 14:42.5 | The references for this video are shown on screen. | Rujukan untuk video ini dipaparkan di skrin. |

## Babak 26 · DISCLAIMER  `14:48.4–14:57.4`

| Masa | Narration (English, spoken) | Sari kata (BM, on-screen) |
|---|---|---|
| 14:49.2 | Trading futures involves the risk of loss. See you in Video 11. | Trading futures melibatkan risiko kerugian. Jumpa dalam Video 11. |

