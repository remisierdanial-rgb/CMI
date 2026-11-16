# CMI · Smart Money Concept — Level 6
## Premium, Discount & PD Arrays
### Fasa 1 (Content Mapping) & Fasa 2 (Technical Validation)

> Status: **DRAF untuk semakan CMI.** Rendering belum bermula, ikut arahan Master Prompt.
> Format video: **narasi English, subtitle Bahasa Melayu sahaja yang dipaparkan** (burned-in).
> Layout & theme: **menunggu video rujukan.** Video contoh belum ada dalam repo atau sesi ini (lihat §0).

---

## 0. Perkara yang perlu disahkan sebelum Fasa 3 & 4

| # | Perkara | Status |
|---|---|---|
| 0.1 | **Video rujukan** (layout, theme, font, posisi subtitle, intro/outro, logo CMI) | ❌ Belum diterima. Perlu dimuat naik ke `level-6/reference/` atau dilampirkan dalam sesi |
| 0.2 | Sumber suara narasi English (VO manusia / TTS / tiada suara, subtitle sahaja) | ❓ Perlu keputusan |
| 0.3 | Resolusi & nisbah (andaian: 1920×1080, 30 fps) | ❓ Ikut video rujukan |
| 0.4 | Konvensyen ICT yang dipilih CMI bagi Mitigation Block & Rejection Block (lihat §V) | ❓ Perlu pengesahan |
| 0.5 | Subtitle: Bahasa Melayu sahaja, istilah teknikal dikekalkan dalam English | ✅ Diikut |

Selepas 0.1 diterima, saya akan ekstrak elemen visual video rujukan (palet warna, tipografi, grid, gaya carta, gaya subtitle, transisi) dan menyelaraskan Fasa 3 (storyboard) dengannya.

---

## 1. Konvensyen tetap untuk seluruh siri

### 1.1 Data harga
- Semua carta ialah **contoh ilustrasi hipotetikal, gaya FCPO (RM/tan)**. Ini bukan data sejarah sebenar.
- Label tetap pada setiap carta: *"Illustrative example — not historical data"* / subtitle: *"Contoh ilustrasi — bukan data sejarah."*
- Tick size FCPO (Bursa Malaysia Derivatives) ialah RM1/tan, iaitu RM25 setiap kontrak 25 tan. Spesifikasi ini **perlu disahkan semula** dengan spesifikasi kontrak Bursa terkini sebelum dipaparkan.

### 1.2 Makna warna (kekal dalam semua video; tona sebenar ikut video rujukan)
| Warna | Makna |
|---|---|
| Navy / Electric Blue / White / Light Grey | Branding CMI, latar, teks |
| Hijau | Konteks bullish |
| Merah | Konteks bearish |
| Cyan | Rujukan liquidity (BSL/SSL, old high/low) |
| Ungu | Premium/Discount & zon analitikal pilihan |
| Amber | Fibonacci & aras rujukan penting (termasuk Equilibrium) |

### 1.3 Konvensyen Fibonacci (dikunci untuk seluruh siri)
Retracement diukur sebagai **kedalaman pullback dari hujung impulse leg**.

- **Bullish leg:** tarik dari **swing low (1.0)** ke **swing high (0.0)**.
  `Harga(r) = High − r × (High − Low)`
- **Bearish leg:** tarik dari **swing high (1.0)** ke **swing low (0.0)**.
  `Harga(r) = Low + r × (High − Low)`

Kedua-duanya memaparkan 0.0 di hujung impulse dan 1.0 di permulaannya. Video 5 menerangkan bahawa sesetengah platform memaparkan nilai terbalik (0 di permulaan). Nilai di skrin berubah, tetapi zon harga tetap sama.

### 1.4 Nombor contoh asas (disahkan secara matematik)

**Julat A: Bullish dealing range 4,600 → 4,800 (julat 200)**
| Aras | Harga |
|---|---|
| 0.0 (High) | 4,800 |
| 0.5 Equilibrium | 4,700 |
| 0.618 | 4,676.4 |
| 0.62 | 4,676 |
| 0.705 | 4,659 |
| 0.79 | 4,642 |
| 1.0 (Low) | 4,600 |
| **OTE** | **4,642 – 4,676** (rujukan tengah 4,659) |

**Julat B: Bearish dealing range 4,800 → 4,600**
| Aras | Harga |
|---|---|
| 0.0 (Low) | 4,600 |
| 0.5 Equilibrium | 4,700 |
| 0.618 | 4,723.6 |
| 0.62 | 4,724 |
| 0.705 | 4,741 |
| 0.79 | 4,758 |
| 1.0 (High) | 4,800 |
| **OTE** | **4,724 – 4,758** (rujukan tengah 4,741) |

**Julat C: Kajian kes HTF (Video 14), 4,520 → 4,880 (julat 360)**
| Aras | Harga |
|---|---|
| Equilibrium | 4,700 |
| 0.62 | 4,656.8 |
| 0.705 | 4,626.2 |
| 0.79 | 4,595.6 |
| Bullish OB (ilustrasi) | 4,610 – 4,635 |
| Equal lows / SSL | 4,600 |
| Sweep low | 4,592 |
| Entry rancangan | 4,630 |
| Invalidation | 4,575 |
| Target (old high / BSL) | 4,880 |
| Risk : Reward | 55 : 250 ≈ **1 : 4.5** |

Semakan: 4,592 < 4,595.6 (sweep melepasi sedikit di bawah 0.79), dan invalidation 4,575 berada di bawah sweep low. Susunannya konsisten.

---

## 2. Struktur siri (14 video)

Enam subtopik asal kurikulum dipetakan seperti berikut. Tiada subtopik dibuang atau ditukar.

| Video | Tajuk | Subtopik kurikulum |
|---|---|---|
| 1 | Introduction to Premium, Discount & PD Arrays | Kerangka keseluruhan |
| 2 | Dealing Range | ① Dealing Range |
| 3 | Equilibrium | ② Equilibrium |
| 4 | Premium & Discount | ③ Premium & Discount |
| 5 | Fibonacci OTE | ④ OTE |
| 6 | Order Block | ⑤ PD Arrays |
| 7 | Breaker Block & Mitigation Block | ⑤ PD Arrays |
| 8 | Rejection Block | ⑤ PD Arrays |
| 9 | FVG, IFVG & Liquidity Void (recap ringkas Level 5 + perbezaan) | ⑤ PD Arrays |
| 10 | Old High/Low & Liquidity References | ⑤ PD Arrays |
| 11 | PD Array Selection & Prioritisation | ⑤ PD Arrays |
| 12 | Multiple Confluences | ⑥ Multiple Confluences |
| 13 | Conflicting Confluences & No-Trade Conditions | ⑥ Multiple Confluences |
| 14 | Complete Level 6 Workflow — Integrated Case Study | ①–⑥ |

Prinsip yang diulang dalam setiap video: **Location Before Execution · Higher Timeframe Before Lower Timeframe · Confluence Without Overcomplication.**

Templat setiap video (10 elemen wajib): Definisi → Tujuan → Cara kenal pasti → Langkah demi langkah → Contoh bullish → Contoh bearish → Kesilapan biasa → Aplikasi praktikal → Hubungan dengan konsep lain → Knowledge check, diikuti slaid rujukan.

---

## 3. Pemetaan kandungan setiap video

### Video 1 — Introduction
**Objektif:** Faham kenapa lokasi harga dinilai sebelum execution. Kenal aliran kerja CMI. Faham hubungan HTF dengan LTF.

| Scene | Visual | Isi utama (narasi EN → subtitle BM) |
|---|---|---|
| 1.1 | Dua carta uptrend yang sama: entry A di hujung atas julat, entry B selepas retracement | Arah sama tetapi lokasi berbeza. A mempunyai risiko lebih besar dan ruang ke target yang lebih kecil |
| 1.2 | Bezakan 4 soalan: arah? di mana harga sekarang? lokasi berpotensi? sudah ada confirmation? | Arah sahaja tidak menentukan kualiti entry |
| 1.3 | Rantaian animasi: Market Direction → Dealing Range → Premium/Discount → PD Arrays → Liquidity → OTE → Confirmation → Execution | Ini aliran kerja analitikal. Ia **bukan** jaminan keuntungan |
| 1.4 | Zoom 1H → 30m → 5m. Isyarat 5m diletak dalam julat 1H | Isyarat LTF ditafsir dalam konteks HTF |
| 1.5 | Entry 5m yang "valid" tetapi berada di Premium julat 1H bullish | Entry yang betul secara teknikal masih boleh berkualiti rendah |

**Knowledge check:** (1) Kenapa arah sahaja tidak cukup? (2) Senaraikan aliran kerja CMI. (3) Kenapa isyarat 5m perlu dinilai dalam julat 1H?

### Video 2 — Dealing Range
**Objektif:** Pilih swing high/low yang bermakna. Bina julat bullish dan bearish.

| Scene | Visual | Isi utama |
|---|---|---|
| 2.1 | Candle terbentuk. Julat dilukis antara satu high dan satu low | Definisi: selang harga yang dipilih, disempadani high dan low yang bermakna |
| 2.2 | Swing point 3-candle ditanda. Bezakan swing kecil dengan swing yang memecahkan struktur | Kenapa swing tertentu "bermakna": ia menghasilkan displacement atau break of structure, atau menjadi rujukan liquidity |
| 2.3 | Julat A bullish: low 4,600 → high 4,800, midpoint 4,700, pullback dinilai | Langkah 1–5 seperti dalam brief |
| 2.4 | Julat B bearish: high 4,800 → low 4,600 | Cerminan |
| 2.5 | Julat HTF / intermediate / LTF bersarang. Pergerakan internal vs external range | Pilihan julat bergantung pada timeframe analisis |
| 2.6 | Kesilapan: swing kecil; menukar julat supaya sesuai dengan trade; mencampur timeframe; semua swing dianggap sama penting | Julat yang arbitrari menghasilkan bacaan P/D yang mengelirukan |

**Knowledge check:** sempadan julat ditentukan oleh apa; kenapa julat tidak boleh ditukar sesuka hati; beza internal dan external.

### Video 3 — Equilibrium
| Scene | Visual | Isi utama |
|---|---|---|
| 3.1 | Formula beranimasi `(4,800 + 4,600) / 2 = 4,700` | EQ = 50% julat |
| 3.2 | Empat keadaan: atas EQ, bawah EQ, kembali ke EQ, konsolidasi di sekitar EQ | Ia titik rujukan |
| 3.3 | Garisan EQ membahagi julat kepada dua | Asas bagi P/D |
| 3.4 | EQ membantu membingkai pullback tetapi tidak menentukan arah | |
| 3.5 | Kesilapan: EQ dianggap S/R pasti; setiap pergerakan melepasi 50% dianggap mesti berbalik; EQ digunakan tanpa julat | |

**Knowledge check:** kira EQ bagi julat 4,520–4,880 (jawapan: 4,700, dengan penjelasan); kenapa EQ bukan support yang dijamin.

### Video 4 — Premium & Discount
| Scene | Visual | Isi utama |
|---|---|---|
| 4.1–4.3 | Shading ungu: separuh atas Premium, garisan amber EQ, separuh bawah Discount | Definisi |
| 4.4 | Bullish: julat → EQ → Discount → pullback → PD Array bullish → liquidity → confirmation LTF | Beza **potential setup** dengan **execution** |
| 4.5 | Bearish: cerminan | |
| 4.6 | **Contoh A:** masuk Discount dan terus jatuh. **Contoh B:** masuk Discount, bertindak balas di PD Array, MSS LTF. Ulang untuk Premium. Kemudian tunjuk harga kekal di Premium semasa trend kuat | Premium ≠ jual. Discount ≠ beli. Lokasi bergantung pada julat dan timeframe |
| 4.7 | Kesilapan (6 perkara seperti brief) | Lokasi tidak sama dengan confirmation |

### Video 5 — Fibonacci OTE
| Scene | Visual | Isi utama |
|---|---|---|
| 5.1 | Pengenalan | OTE ialah kerangka zon pullback, **bukan** isyarat entry |
| 5.2 | Aras 0.5 / 0.618 / 0.62 / 0.705 / 0.79 | OTE yang biasa dirujuk: 62%–79%, 70.5% sebagai rujukan tengah. 0.62 ialah pembundaran ICT bagi 0.618 |
| 5.3 | Demo anchor: kursor menarik Fib dari low ke high (bullish) dan dari high ke low (bearish). Paparan platform berorientasi terbalik ditunjuk sebelah-menyebelah | Zon harga sama walaupun label berbeza |
| 5.4 | Bullish (Julat A): OTE 4,642–4,676 → pullback → OB → MSS LTF → entry, invalidation di bawah 4,600, target di atas 4,800 | 9 langkah |
| 5.5 | Bearish (Julat B): OTE 4,724–4,758 | |
| 5.6 | OTE bertindih dengan Discount, OB, FVG, liquidity, MSS | Tindihan **boleh** menguatkan hujah tetapi tidak menjamin. Discount + OTE datang dari julat yang sama (pautan ke Video 12) |
| 5.7 | Kesilapan: anchor salah; leg tidak relevan; 70.5% dianggap magik; entry automatik; leg dipilih secara retrospektif | |

### Video 6 — Order Block
- **Definisi (konvensyen ICT):** Bullish OB = candle **down-close terakhir** (atau kelompok candle) sebelum displacement ke atas yang memecahkan struktur. Bearish OB = candle **up-close terakhir** sebelum displacement ke bawah yang memecahkan struktur.
- Rujukan dalam zon: julat body (open–close). Sesetengah pengamal guna high–low. **Mean threshold** = 50% body OB.
- Animasi: candle OB → displacement (biasanya meninggalkan FVG) → BOS/MSS → harga kembali (mitigation) ke OB.
- **Contoh tidak sah atau lemah:** candle lawan arah tanpa displacement; tiada BOS; OB yang sudah ditembusi dengan body close; OB di Premium bagi setup bullish dalam julat HTF yang sama.

### Video 7 — Breaker Block & Mitigation Block
- **Bullish Breaker (konvensyen ICT):** low → high → **lower low (sweep SSL)** → rally memecahkan high tadi. Candle up-close terakhir sebelum lower low (bearish OB yang gagal) menjadi zon rujukan bullish apabila harga kembali.
- **Bearish Breaker:** cerminan. Ada **higher high** yang menyapu BSL, kemudian harga memecahkan low.
- **Bullish Mitigation Block:** struktur hampir sama **tetapi tanpa lower low**. Swing gagal membuat low baru (failure swing / higher low), kemudian high dipecahkan. Tiada liquidity sweep.
- **Beza utama:** Breaker = ada sweep high/low terdahulu. Mitigation = tiada sweep (failure swing).
- **Beza Breaker dengan S/R flip biasa:** Breaker memerlukan konteks OB + sweep liquidity + displacement memecahkan struktur, bukan sekadar aras yang ditembusi.

### Video 8 — Rejection Block
- **Konvensyen ICT yang dicadangkan:** di swing high atau low yang mempunyai wick panjang. Bearish Rejection Block: zon dari **body tertinggi** (open/close) hingga **wick tertinggi**. Bullish: dari body terendah hingga wick terendah. Rujukan apabila harga kembali ke dalam bahagian wick.
- Beza dengan pin bar biasa: Rejection Block dinilai pada **swing extreme yang relevan dalam julat** serta konteks liquidity, bukan bentuk satu candle sahaja.
- Kesilapan: setiap wick panjang dianggap Rejection Block.

### Video 9 — FVG, IFVG & Liquidity Void
*(Recap Level 5 secara ringkas. Fokus Level 6 ialah perbezaan dan kedudukannya dalam Premium/Discount.)*
- **FVG:** 3 candle. Bullish: gap antara **high candle 1** dan **low candle 3**. Bearish: antara **low candle 1** dan **high candle 3**.
- **IFVG:** FVG yang ditembusi dengan **body close melepasi hujung jauh gap**, kemudian ditafsir dalam peranan bertentangan. FVG yang "diisi" (wick masuk lalu harga berbalik) **bukan** IFVG.
- **Liquidity Void:** rangkaian candle sehala yang besar dengan tindihan minimum. Ia biasanya mengandungi beberapa FVG tetapi dinilai sebagai satu kawasan penghantaran harga yang tidak efisien. Penafian: rupa "tidak efisien" pada carta tidak membuktikan ketiadaan liquidity sebenar.

### Video 10 — Old High/Low & Liquidity References
- Previous swing high/low, old high/low, equal highs (BSL) dan equal lows (SSL).
- Ditegaskan: aras ini ialah **rujukan harga dan liquidity**. Ia bukan S/R yang dijamin dan bukan struktur yang sama sifat dengan OB atau FVG, walaupun ICT menyenaraikannya dalam PD Array matrix.

### Video 11 — PD Array Selection
- Jadual perbandingan 8 jenis (seperti brief, §6.10).
- Kriteria pemilihan: relevan pada HTF; selari dengan arah; berada di lokasi P/D yang betul; konteks liquidity; displacement; confirmation struktur; belum invalidated atau ditembusi.
- Animasi: carta yang dipenuhi 9 zon, kemudian ditapis langkah demi langkah sehingga tinggal 1–2 zon.

### Video 12 — Multiple Confluences
- Beza: satu isyarat; beberapa isyarat berkaitan; bukti bebas; label berulang bagi peristiwa harga yang sama.
- 10 jenis confluence (seperti brief, §7.2).
- Contoh bullish (8 langkah) dan bearish, menggunakan Julat A/B.
- **Double-counting:** "Discount + OTE + di bawah EQ" ialah **satu** bukti lokasi kerana ketiga-tiganya datang dari julat yang sama. "FVG + IFVG pada struktur yang sama" juga dikira satu. Animasi: 5 label diruntuhkan menjadi 2 bukti bebas.

### Video 13 — Conflicting Confluences & No-Trade
- 5 senario konflik (seperti brief, §7.7) dan 7 keadaan no-trade (seperti brief, §7.8).
- Mesej: *no-trade ialah keputusan analitikal yang sah.*

### Video 14 — Complete Workflow (Julat C)
- Langkah 1–10 seperti brief, menggunakan nombor §1.4 Julat C.
- **Senario 1 (berkembang dengan baik):** sweep 4,592 → MSS 5m → entry 4,630 → harga menuju 4,880.
- **Senario 2 (gagal):** sweep berlaku tetapi tiada MSS. Harga close di bawah 4,575 dan invalidation tercetus atau setup tidak dieksekusi.
- Penilaian selepas trade untuk kedua-dua senario. Proses dinilai, bukan hasil semata-mata.

---

## 4. Soalan penilaian (contoh, dengan penjelasan)

| Soalan | Jawapan & penjelasan |
|---|---|
| Apakah yang menentukan sempadan dealing range? | Swing high dan swing low yang bermakna pada timeframe analisis, iaitu yang menghasilkan displacement atau BOS, atau menjadi rujukan liquidity. Swing kecil menghasilkan bacaan P/D yang tidak stabil |
| Kira EQ bagi 4,520–4,880 | (4,880 + 4,520) / 2 = 4,700 |
| Kenapa Discount bukan isyarat beli automatik? | Discount hanya menerangkan lokasi relatif kepada julat yang dipilih. Struktur mungkin masih bearish, dan julat atau timeframe lain boleh memberi bacaan berbeza |
| Apakah julat OTE yang biasa dirujuk? | 62%–79%, dengan 70.5% sebagai rujukan tengah. Bagi Julat A: 4,642–4,676 |
| Beza FVG dan IFVG? | IFVG memerlukan body close melepasi hujung jauh FVG lalu peranannya bertukar. FVG yang sekadar diisi masih FVG |
| Breaker atau S/R flip? | Breaker memerlukan konteks OB yang gagal, sweep liquidity dan displacement yang memecahkan struktur |
| Kenapa sweep sahaja tidak cukup? | Sweep boleh diikuti kesinambungan trend. Perlu displacement atau MSS sebagai confirmation |
| Kenapa banyak confluence masih boleh rugi? | Ada label yang tidak bebas (double-counting), dan tiada konsep yang menjamin tindak balas harga. Risiko dan invalidation tetap wajib |

Latihan carta praktikal: 8 latihan seperti brief, Part 7, setiap satu dengan jawapan beranimasi.

---

## V. Fasa 2 — Technical Validation (bendera & ketidakpastian)

| # | Isu | Keputusan / tindakan |
|---|---|---|
| V1 | Orientasi Fibonacci berbeza antara platform | Konvensyen §1.3 dikunci dan diterangkan secara eksplisit dalam Video 5 |
| V2 | 0.618 vs 0.62 | Kedua-duanya dipaparkan. 0.62 dinyatakan sebagai pembundaran yang biasa digunakan ICT |
| V3 | Definisi Mitigation Block berbeza antara pendidik | Konvensyen "failure swing tanpa sweep" dipilih. **Perlu pengesahan CMI** (§0.4) |
| V4 | Definisi Rejection Block (body-ke-wick) | Konvensyen §Video 8 dipilih. **Perlu pengesahan CMI** |
| V5 | Liquidity Void vs FVG: dalam sesetengah bahan lama ICT, istilah ini digunakan hampir sinonim | Dibezakan secara operasi (rangkaian candle vs 3 candle), dengan nota bahawa penggunaan istilah berbeza |
| V6 | OB: julat body vs high–low | Body dipilih sebagai default. Alternatif disebut |
| V7 | Susunan rasmi "PD Array Matrix" ICT | **Tidak dipaparkan sebagai susunan rasmi** sehingga disahkan daripada bahan asal ICT |
| V8 | Klaim institusi | Tiada klaim bahawa institusi "mesti" membeli di Discount. PD Array dinyatakan sebagai konsep analitikal, bukan bukti order institusi |
| V9 | Spesifikasi kontrak FCPO | Perlu disahkan dengan Bursa sebelum dipaparkan |
| V10 | Level 5 overlap | FVG, IFVG dan Displacement hanya di-recap (≤ 90 saat dalam Video 9) |

### Rujukan (tanpa nombor halaman atau URL rekaan)
- Huddleston, M. J. (ICT). Bahan pendidikan ICT (mentorship & siri video). Istilah OTE dan PD Array. *Tajuk episod tepat perlu disahkan.*
- Murphy, J. J. (1999). *Technical Analysis of the Financial Markets.* New York Institute of Finance. Struktur harga dan Fibonacci secara umum.
- Harris, L. (2003). *Trading and Exchanges: Market Microstructure for Practitioners.* Oxford University Press. Konteks liquidity dan microstructure.
- Edwards, R. D., Magee, J., & Bassetti, W. H. C. *Technical Analysis of Stock Trends* (edisi terkini; *nombor edisi perlu disahkan*). Analisis carta konvensional.
- Konsep SMC/ICT **tidak** dikaitkan dengan penyelidikan akademik.

---

## Langkah seterusnya
1. CMI muat naik **video rujukan**. Saya akan ekstrak layout, theme dan gaya subtitle BM.
2. CMI sahkan §0.2–0.4.
3. Fasa 3: storyboard scene demi scene (narasi English penuh + subtitle BM + spesifikasi animasi) bermula dengan Video 1–2 sebagai pilot.
4. Fasa 4: render pilot, semak, kemudian teruskan Video 3–14.
5. Fasa 5: audit akhir mengikut checklist Part 8.
