/* VIDEO 05 — VPA: Price, Volume and Spread
   Subtopic 2 · SMC + VPA — sections A (Understanding VPA), B (Volume), C (Spread), D (Effort versus Result). */
const B = (o, h, l, c, v) => ({ o, h, l, c, v });
// context bars then 4 "test" bars, used for the effort-vs-result panels
const ctx = [B(4060, 4066, 4056, 4062, 900), B(4062, 4068, 4058, 4065, 950), B(4065, 4070, 4060, 4063, 880), B(4063, 4071, 4061, 4069, 920), B(4069, 4074, 4064, 4066, 870), B(4066, 4072, 4062, 4070, 940), B(4070, 4075, 4066, 4072, 900), B(4072, 4078, 4068, 4074, 930)];
const EVR = {
  hiProg: [...ctx, B(4074, 4098, 4072, 4096, 2500), B(4096, 4122, 4094, 4119, 2700), B(4119, 4142, 4116, 4139, 2600), B(4139, 4146, 4132, 4143, 1300)],
  hiStall: [...ctx, B(4074, 4084, 4070, 4078, 2600), B(4078, 4085, 4073, 4076, 2800), B(4076, 4084, 4072, 4079, 2700), B(4079, 4083, 4071, 4074, 2500)],
  loMove: [...ctx, B(4074, 4096, 4072, 4094, 620), B(4094, 4114, 4091, 4112, 560), B(4112, 4130, 4108, 4127, 600), B(4127, 4132, 4121, 4129, 640)],
  loFlat: [...ctx, B(4074, 4078, 4071, 4075, 520), B(4075, 4079, 4072, 4073, 480), B(4073, 4077, 4070, 4076, 500), B(4076, 4079, 4073, 4075, 470)],
};
const evr = (k, title, tag) => ({ type: 'candles', title, tag, bars: EVR[k], range: [4040, 4160], slots: 13, volH: 120, vmax: 2900, reveal: [[0, 7, .8], [0, 11, 1.2, 1]], ann: [{ t: 'vhl', i: [8, 9, 10, 11], c: 'a', at: 1 }] });

EP({
  num: '05', short: 'VPA Foundations', title: 'VPA: Price, Volume and Spread',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 05 · SUBTOPIC 2 · SMC + VPA',
      h: 'VPA: Price, Volume and Spread', sub: 'What VPA is · Understanding volume · Understanding spread · Effort versus Result',
      obj: [[1, 'Explain what Volume Price Analysis is and where it came from'], [2, 'Distinguish traded, tick and relative volume'], [3, 'Read candle spread together with volume'], [4, 'Interpret the four effort-versus-result combinations in context']],
      viz: { type: 'candles', title: 'PRICE · VOLUME · SPREAD', noAxis: true, bars: EVR.hiStall, range: [4040, 4110], slots: 13, volH: 150, reveal: [[0, 11, 2.5]], ann: [{ t: 'vhl', i: [8, 9, 10, 11], c: 'a', at: 0, d: 2.6 }] },
      say: [
        ['Welcome to Video Five. Subtopic Two is S M C plus Volume Price Analysis, or V P A.', 'Selamat datang ke Video 5. Subtopik 2 ialah SMC + Volume Price Analysis, atau VPA.'],
        ['As with Wyckoff, we first learn V P A on its own terms, before combining it with S M C in Video Six.', 'Seperti Wyckoff, kita mempelajari VPA mengikut asasnya sendiri dahulu, sebelum menggabungkannya dengan SMC dalam Video 6.'],
        ['In this video: what V P A is, how to understand volume, how to understand spread, and the principle of effort versus result.', 'Dalam video ini: apa itu VPA, cara memahami volume, cara memahami spread, dan prinsip effort versus result.'],
        ['The central lesson is simple. Volume must always be read together with price, spread and context.', 'Pengajaran utamanya mudah. Volume mesti sentiasa dibaca bersama harga, spread dan konteks.'],
      ],
    },
    {
      tpl: 'statement', label: 'What is VPA', kicker: '5.1 · DEFINITION', h: 'Volume Price Analysis studies the relationship between three observations', fs: 42, by: 260, bh: 400,
      boxes: [
        { k: 'PRICE', t: 'Where and how price closed', b: 'Direction, close location within the bar, and position in the trend or range.', at: 1 },
        { k: 'VOLUME', kc: 'c', bc: 'amber', t: 'How much was traded', b: 'The number of contracts traded in the bar — the "effort".', at: 2 },
        { k: 'SPREAD', kc: 'c', bc: 'cyan', t: 'How far price travelled', b: 'The bar\'s range, high minus low — part of the "result".', at: 3 },
      ],
      say: [
        ['Volume Price Analysis studies the relationship between three observations on each bar.', 'Volume Price Analysis mengkaji hubungan antara tiga pemerhatian pada setiap bar.'],
        ['Price: the direction of the bar, where it closed within its range, and where it sits in the trend or range.', 'Harga: arah bar, di mana ia ditutup dalam julatnya, dan kedudukannya dalam trend atau range.'],
        ['Volume: how many contracts were traded during the bar. In V P A, this is the effort.', 'Volume: berapa banyak kontrak didagangkan semasa bar itu. Dalam VPA, ini ialah usaha.'],
        ['And spread: how far price travelled, measured as the high minus the low. This is part of the result.', 'Dan spread: sejauh mana harga bergerak, diukur sebagai high tolak low. Ini sebahagian daripada hasil.'],
        ['None of the three is read alone. They are interpreted together, and always within market context.', 'Tiada satu pun daripada ketiga-tiganya dibaca secara bersendirian. Ia ditafsir bersama, dan sentiasa dalam konteks pasaran.'],
      ],
    },
    {
      tpl: 'cards', label: 'History', kicker: '5.2 · HISTORICAL DEVELOPMENT', h: 'Where VPA comes from', cols: 3, top: 190, ch: 330,
      cards: [
        { n: 'EARLY 1900s', t: 'Wyckoff and tape reading', b: 'Price and volume read together to judge supply and demand — the foundation, including Effort versus Result.', at: 1 },
        { n: '1990s', t: 'Volume Spread Analysis (VSA)', b: 'Tom Williams built on Wyckoff\'s ideas, emphasising volume, spread and close location on each bar.', at: 2 },
        { n: '2010s', t: 'Volume Price Analysis', b: 'Anna Coulling\'s "A Complete Guide to Volume Price Analysis" presented the approach for modern retail traders across markets.', at: 3 },
      ],
      note: { at: 4, y: 580, label: 'Terminology', text: 'VSA and VPA overlap heavily but use slightly different terms. In this series we use "VPA" and define each concept explicitly.' },
      say: [
        ['Where does V P A come from?', 'Dari mana asal VPA?'],
        ['Its roots are in Wyckoff and early tape reading, where price and volume were read together, including the idea of effort versus result.', 'Akarnya ada pada Wyckoff dan tape reading awal, di mana harga dan volume dibaca bersama, termasuk idea effort versus result.'],
        ['In the nineteen-nineties, Tom Williams built on Wyckoff\'s ideas in an approach called Volume Spread Analysis, emphasising volume, spread and where each bar closes.', 'Pada tahun 1990-an, Tom Williams membina atas idea Wyckoff dalam pendekatan yang dipanggil Volume Spread Analysis, yang menekankan volume, spread dan di mana setiap bar ditutup.'],
        ['More recently, Anna Coulling\'s book, A Complete Guide to Volume Price Analysis, presented the approach for modern traders across many markets.', 'Lebih baru, buku Anna Coulling, A Complete Guide to Volume Price Analysis, membentangkan pendekatan ini untuk trader moden merentasi pelbagai pasaran.'],
        ['V S A and V P A overlap heavily but use slightly different terms. In this series, we use V P A, and define each concept explicitly.', 'VSA dan VPA banyak bertindih tetapi menggunakan istilah yang sedikit berbeza. Dalam siri ini, kita menggunakan VPA, dan mentakrifkan setiap konsep secara jelas.'],
      ],
    },
    {
      tpl: 'split', label: 'Price-only vs price-volume',
      a: { type: 'candles', title: 'PRICE ONLY', tag: 'WHAT SMC USUALLY SHOWS', bars: EVR.hiStall.concat([B(4074, 4078, 4050, 4054, 2200), B(4054, 4058, 4040, 4044, 2000)]), range: [4030, 4100], slots: 15, vol: false, reveal: [[0, 13, 2]] },
      b: { type: 'candles', title: 'PRICE + VOLUME', tag: 'WHAT VPA ADDS', bars: EVR.hiStall.concat([B(4074, 4078, 4050, 4054, 2200), B(4054, 4058, 4040, 4044, 2000)]), range: [4030, 4100], slots: 15, volH: 130, reveal: [[1, 13, 2]], ann: [{ t: 'vhl', i: [8, 9, 10, 11], c: 'a', at: 2 }, { t: 'zone', p1: 4070, p2: 4086, i1: 8, i2: 11, c: 'a', label: 'HIGH EFFORT · LITTLE PROGRESS', at: 2 }] },
      calc: [[3, 'Price-only: "a small pause before the drop"'], [4, 'Price-volume: "{a}heavy two-way trade{/} at the highs — worth investigating"']],
      say: [
        ['Why add volume to a price-only method like S M C? Look at the left panel: price only.', 'Mengapa menambah volume kepada kaedah harga semata-mata seperti SMC? Lihat panel kiri: harga sahaja.'],
        ['On the right, the same bars with volume. The four small bars at the top were traded on very high volume.', 'Di sebelah kanan, bar yang sama dengan volume. Empat bar kecil di atas didagangkan dengan volume yang sangat tinggi.'],
        ['That is high effort with little upward progress.', 'Itu usaha yang tinggi dengan kemajuan ke atas yang sedikit.'],
        ['A price-only reading might call this a small pause before the drop.', 'Bacaan harga semata-mata mungkin menyebut ini sebagai jeda kecil sebelum penurunan.'],
        ['A price-volume reading notes heavy two-way trade at the highs: something worth investigating. It is information, not proof.', 'Bacaan harga-volume mencatat dagangan dua hala yang berat di paras tinggi: sesuatu yang patut disiasat. Ia maklumat, bukan bukti.'],
      ],
    },
    {
      tpl: 'table', label: 'Types of volume', kicker: '5.3 · UNDERSTANDING VOLUME', h: 'Not all "volume" is the same data', cols: ['Type', 'What it counts', 'Notes'], widths: [380, 620, 660], hs: 38,
      rows: [
        [1, 'Traded volume', 'Contracts actually traded in the period', 'For exchange futures like FCPO, the preferred data'],
        [2, 'Exchange-reported volume', 'Official totals published by the exchange', 'Use to verify a platform\'s numbers'],
        [3, 'Tick volume', 'Number of price changes, not contracts', 'Used where centralised volume is unavailable (e.g. spot FX)'],
        [4, 'Relative volume', 'Current volume ÷ average of prior bars', 'Puts a bar in historical context'],
      ],
      note: { at: 5, label: 'Always ask', text: 'Which volume is my platform showing — for which contract month, which session, and from which data feed?' },
      say: [
        ['Next, understanding volume. Not all volume is the same data.', 'Seterusnya, memahami volume. Bukan semua volume ialah data yang sama.'],
        ['Traded volume counts the contracts actually traded in a period. For an exchange-traded future like F C P O, this is the data we want.', 'Traded volume mengira kontrak yang benar-benar didagangkan dalam sesuatu tempoh. Bagi futures yang didagangkan di bursa seperti FCPO, inilah data yang kita mahu.'],
        ['Exchange-reported volume is the official total published by the exchange. Use it to verify your platform\'s numbers.', 'Exchange-reported volume ialah jumlah rasmi yang diterbitkan oleh bursa. Gunakannya untuk mengesahkan angka platform anda.'],
        ['Tick volume counts price changes, not contracts. It is used where centralised volume is unavailable, such as spot forex.', 'Tick volume mengira perubahan harga, bukan kontrak. Ia digunakan di mana volume berpusat tidak tersedia, seperti forex spot.'],
        ['Relative volume compares the current bar with the average of prior bars. It puts each bar in historical context.', 'Relative volume membandingkan bar semasa dengan purata bar sebelumnya. Ia meletakkan setiap bar dalam konteks sejarah.'],
        ['So always ask: which volume is my platform showing, for which contract month, which session, and from which data feed?', 'Jadi sentiasa bertanya: volume mana yang ditunjukkan oleh platform saya, untuk bulan kontrak mana, sesi mana, dan daripada data feed mana?'],
      ],
    },
    {
      tpl: 'formula', label: 'Buyer and seller', kicker: '5.3 · A FUTURES FACT', h: 'Volume is not net buying or net selling',
      lines: [
        [1, 'Trader A buys {c}5{/} FCPO contracts at 4,100'],
        [1, 'Trader B sells {c}5{/} FCPO contracts at 4,100'],
        [2, 'Volume recorded = {g}5 contracts{/}  (not 10)'],
        [3, 'Contracts bought = contracts sold = 5'],
        [4, 'Volume says {g}how much{/} traded — not {r}who won{/}', 'big'],
      ],
      note: { at: 5, label: 'Therefore', text: '"High volume means buying" is false. Interpretation comes from **price behaviour with the volume** — direction, spread, close location and context.' },
      say: [
        ['Here is a fact every V P A student must understand. Volume is not net buying or net selling.', 'Ini ialah fakta yang mesti difahami oleh setiap pelajar VPA. Volume bukan belian bersih atau jualan bersih.'],
        ['If trader A buys five contracts at four thousand one hundred, then trader B sells those five contracts.', 'Jika trader A membeli lima kontrak pada 4,100, maka trader B menjual lima kontrak tersebut.'],
        ['The volume recorded is five contracts, not ten.', 'Volume yang direkodkan ialah lima kontrak, bukan sepuluh.'],
        ['Every contract bought is also a contract sold.', 'Setiap kontrak yang dibeli juga ialah kontrak yang dijual.'],
        ['So volume tells you how much was traded. It does not tell you who won.', 'Jadi volume memberitahu berapa banyak yang didagangkan. Ia tidak memberitahu siapa yang menang.'],
        ['High volume means buying is therefore false. Any interpretation must come from price behaviour together with the volume.', 'Oleh itu, kenyataan volume tinggi bermaksud belian adalah salah. Sebarang interpretasi mesti datang daripada tingkah laku harga bersama volume.'],
      ],
    },
    {
      tpl: 'viz', label: 'Relative volume',
      viz: {
        type: 'candles', title: 'FCPO · 30M · HYPOTHETICAL ILLUSTRATION', tag: 'RELATIVE VOLUME', volH: 170,
        data: { seed: 505, n: 60, way: [[0, 4040], [30, 4090], [44, 4096], [46, 4130], [52, 4126], [59, 4140]], noise: 4, wick: 5, vbody: .1, vm: { 45: 2.8, 46: 2.2 }, vr: [[50, 56, .45]] },
        reveal: [[0, 59, 2.5]],
        ann: [{ t: 'vma', n: 20, c: 'c', label: '20-BAR AVG', at: 1 }, { t: 'vhl', i: [45], c: 'a', at: 2 }, { t: 'vhl', i: [50, 51, 52, 53, 54, 55, 56], c: 'p', at: 4 }],
      },
      info: { k: '5.4 · RELATIVE VOLUME', h: 'Compare with context', b: [[1, 'Average of the **previous 20 bars** (cyan line)', 'c'], [2, 'Highlighted bar: {a}2,588{/} contracts', 'a'], [3, 'RV = 2,588 ÷ 938 ≈ **2.8×** — volume expansion', 'a'], [4, 'Later bars ≈ 0.3–0.6× — volume contraction', 'p']], note: { at: 5, label: 'Context', text: 'The look-back length is a choice. State it, and compare like with like — same session, same contract month.' } },
      say: [
        ['Relative volume compares a bar with its recent history. Here, the cyan line is the average of the previous twenty bars.', 'Relative volume membandingkan sesuatu bar dengan sejarah terkininya. Di sini, garisan cyan ialah purata 20 bar sebelumnya.'],
        ['Look at the highlighted bar. It traded two thousand five hundred and eighty-eight contracts.', 'Lihat bar yang ditandakan. Ia mendagangkan 2,588 kontrak.'],
        ['The prior twenty-bar average was nine hundred and thirty-eight. So relative volume is roughly two point eight times. This is volume expansion.', 'Purata 20 bar sebelumnya ialah 938. Jadi relative volume lebih kurang 2.8 kali ganda. Ini ialah volume expansion.'],
        ['Later, several bars trade at less than half the average. This is volume contraction.', 'Kemudian, beberapa bar didagangkan kurang daripada separuh purata. Ini ialah volume contraction.'],
        ['The look-back length is a choice. State it, and compare like with like: the same session and the same contract month.', 'Panjang tempoh rujukan ialah pilihan. Nyatakannya, dan bandingkan perkara yang setara: sesi yang sama dan bulan kontrak yang sama.'],
      ],
    },
    {
      tpl: 'viz', label: 'Volume by session',
      viz: { type: 'hbars', title: 'FCPO · AVERAGE VOLUME PER 30-MIN BAR · HYPOTHETICAL', tag: 'SESSION EFFECT', pl: 380, items: [{ label: 'Morning session', v: 1350, text: '1,350', c: 'c', at: 1 }, { label: 'Afternoon session', v: 1100, text: '1,100', c: 'b', at: 2 }, { label: 'Night (T+1) session', v: 480, text: '480', c: 'p', at: 3 }] },
      info: { k: '5.4 · VOLUME BY SESSION', h: 'Sessions differ', b: [[1, 'Activity changes through the trading day', 'c'], [2, 'Opening periods are often busier', 'c'], [3, 'A night-session bar of 900 may be "high"; a morning bar of 900 may be "low"', 'p'], [4, 'Compare a bar with the **same session** in earlier days', 'y']], note: { at: 5, c: 'r', label: 'Verify', text: 'Numbers here are hypothetical. Check current official Bursa Malaysia trading hours before using session-specific rules.' } },
      say: [
        ['Volume also varies by session. This hypothetical chart shows average volume per thirty-minute bar in each F C P O session.', 'Volume juga berbeza mengikut sesi. Chart hipotetikal ini menunjukkan purata volume setiap bar 30 minit dalam setiap sesi FCPO.'],
        ['Activity changes through the trading day.', 'Aktiviti berubah sepanjang hari dagangan.'],
        ['Opening periods are often busier than the rest of the session.', 'Tempoh pembukaan selalunya lebih sibuk berbanding baki sesi.'],
        ['So a night-session bar of nine hundred contracts might be high for that session, while a morning bar of nine hundred might be low.', 'Jadi bar sesi malam sebanyak 900 kontrak mungkin tinggi bagi sesi itu, manakala bar pagi sebanyak 900 mungkin rendah.'],
        ['Compare each bar with the same session on earlier days.', 'Bandingkan setiap bar dengan sesi yang sama pada hari-hari sebelumnya.'],
        ['These numbers are hypothetical. Check the current official Bursa Malaysia trading hours before using session-specific rules.', 'Angka ini adalah hipotetikal. Semak waktu dagangan rasmi Bursa Malaysia yang terkini sebelum menggunakan peraturan khusus sesi.'],
      ],
    },
    {
      tpl: 'viz', label: 'Spread',
      viz: {
        type: 'candles', title: 'VALID OHLC BARS · HYPOTHETICAL', tag: 'WIDE AND NARROW SPREAD', volH: 110, slots: 12, range: [4060, 4150],
        bars: [B(4086, 4092, 4082, 4090, 900), B(4090, 4128, 4088, 4124, 2400), B(4124, 4130, 4120, 4126, 950), B(4126, 4128, 4122, 4124, 700), B(4124, 4128, 4082, 4086, 2300), B(4086, 4092, 4082, 4089, 800), B(4089, 4120, 4086, 4091, 1900), B(4091, 4098, 4088, 4096, 850)],
        reveal: [[0, 7, 2]],
        ann: [{ t: 'measure', i: 1, p1: 4088, p2: 4128, text: 'WIDE · 40 PTS', c: 'g', at: 1 }, { t: 'measure', i: 3, p1: 4122, p2: 4128, text: 'NARROW · 6', c: 'y', at: 2 }, { t: 'measure', i: 4, p1: 4082, p2: 4128, text: 'WIDE DOWN · 46', c: 'r', at: 3 }, { t: 'tag', i: 6, text: 'WIDE RANGE · CLOSED LOW', c: 'a', at: 4 }],
      },
      info: { k: '5.5 · UNDERSTANDING SPREAD', h: 'Spread = High − Low', b: [[1, '**Wide spread:** large distance travelled', 'g'], [2, '**Narrow spread:** little distance travelled', 'y'], [3, 'Wide-range movement can be up or down', ''], [4, 'Spread ≠ body: a wide bar can close back near its open', 'a']], note: { at: 5, label: 'Close location', text: 'Where the bar closes within its spread matters: a wide up-bar closing near its low tells a different story from one closing near its high.' } },
      say: [
        ['Now spread. Spread is simply the high minus the low of a bar.', 'Sekarang spread. Spread hanyalah high tolak low sesuatu bar.'],
        ['This bar has a wide spread of forty points, a large distance travelled.', 'Bar ini mempunyai spread lebar sebanyak 40 mata, iaitu jarak perjalanan yang besar.'],
        ['This bar has a narrow spread of only six points.', 'Bar ini mempunyai spread sempit hanya 6 mata.'],
        ['Wide-range movement can be up or down. This bar is a wide down-bar of forty-six points.', 'Pergerakan julat lebar boleh naik atau turun. Bar ini ialah bar turun lebar sebanyak 46 mata.'],
        ['And spread is not the same as the body. This bar travelled thirty-four points, but closed near where it opened.', 'Dan spread tidak sama dengan badan candle. Bar ini bergerak 34 mata, tetapi ditutup berhampiran paras pembukaannya.'],
        ['Where the bar closes within its spread matters. A wide bar closing near its low tells a different story from one closing near its high.', 'Di mana bar ditutup dalam spreadnya adalah penting. Bar lebar yang ditutup berhampiran low menceritakan kisah berbeza daripada yang ditutup berhampiran high.'],
      ],
    },
    {
      tpl: 'split', label: 'Spread vs activity',
      a: { type: 'candles', title: 'NARROW BAR · HIGH VOLUME', tag: 'MUCH ACTIVITY, LITTLE RANGE', bars: [...ctx.slice(0, 6), B(4070, 4076, 4066, 4072, 3200), B(4072, 4076, 4068, 4071, 900)], range: [4040, 4100], slots: 9, volH: 130, vmax: 3200, reveal: [[0, 7, 1.5]], ann: [{ t: 'chl', i: [6], c: 'a', at: 1 }, { t: 'vhl', i: [6], c: 'a', at: 1 }] },
      b: { type: 'candles', title: 'WIDE BAR · LOW VOLUME', tag: 'LITTLE ACTIVITY, LARGE RANGE', bars: [...ctx.slice(0, 6), B(4070, 4094, 4068, 4092, 520), B(4092, 4096, 4088, 4093, 600)], range: [4040, 4100], slots: 9, volH: 130, vmax: 3200, reveal: [[2, 7, 1.5]], ann: [{ t: 'chl', i: [6], c: 'c', at: 2 }, { t: 'vhl', i: [6], c: 'c', at: 2 }] },
      calc: [[3, 'Candle range ≠ trading activity'], [4, 'A small candle can hide {a}heavy two-way trade{/}; a large one can travel on {c}thin participation{/}']],
      say: [
        ['There is an important difference between candle range and true trading activity.', 'Terdapat perbezaan penting antara julat candle dan aktiviti dagangan sebenar.'],
        ['On the left, a narrow bar traded on very high volume: much activity, but little range.', 'Di sebelah kiri, bar sempit didagangkan dengan volume yang sangat tinggi: banyak aktiviti, tetapi julat yang kecil.'],
        ['On the right, a wide bar traded on low volume: little activity, but a large range.', 'Di sebelah kanan, bar lebar didagangkan dengan volume rendah: aktiviti yang sedikit, tetapi julat yang besar.'],
        ['So candle range is not the same as trading activity.', 'Jadi julat candle tidak sama dengan aktiviti dagangan.'],
        ['A small candle can hide heavy two-way trade. A large candle can travel on thin participation.', 'Candle kecil boleh menyembunyikan dagangan dua hala yang berat. Candle besar boleh bergerak dengan penyertaan yang tipis.'],
      ],
    },
    {
      tpl: 'split', label: 'Effort vs result · high volume',
      a: evr('hiProg', 'A · HIGH VOLUME · SUBSTANTIAL PROGRESS', 'EFFORT ≈ RESULT'),
      b: { ...evr('hiStall', 'B · HIGH VOLUME · LIMITED PROGRESS', 'EFFORT > RESULT'), reveal: [[0, 7, .8], [2, 11, 1.2]], ann: [{ t: 'vhl', i: [8, 9, 10, 11], c: 'a', at: 3 }] },
      calc: [[1, 'A: effort and result {gr}agree{/} — the move is supported by activity'], [3, 'B: effort and result {a}diverge{/} — possible opposing activity']],
      say: [
        ['Now the principle of effort versus result, which V P A shares with Wyckoff. There are four basic combinations.', 'Sekarang prinsip effort versus result, yang dikongsi oleh VPA dengan Wyckoff. Terdapat empat kombinasi asas.'],
        ['Combination A: high volume with substantial price progress. Effort and result agree. The move appears supported by activity.', 'Kombinasi A: volume tinggi dengan kemajuan harga yang besar. Usaha dan hasil sepadan. Pergerakan itu kelihatan disokong oleh aktiviti.'],
        ['Combination B: high volume with limited price progress. The bars are narrow, yet heavily traded.', 'Kombinasi B: volume tinggi dengan kemajuan harga yang terhad. Bar-bar itu sempit, namun didagangkan dengan berat.'],
        ['Here effort and result diverge. This may indicate significant opposing activity, but it does not, independently, prove absorption or institutional selling.', 'Di sini usaha dan hasil bercanggah. Ini mungkin menunjukkan aktiviti berlawanan yang ketara, tetapi ia tidak, secara sendirian, membuktikan absorption atau jualan institusi.'],
      ],
    },
    {
      tpl: 'split', label: 'Effort vs result · low volume',
      a: evr('loMove', 'C · LOW VOLUME · SUBSTANTIAL MOVEMENT', 'RESULT > EFFORT'),
      b: { ...evr('loFlat', 'D · LOW VOLUME · LIMITED MOVEMENT', 'LITTLE EFFORT, LITTLE RESULT'), reveal: [[0, 7, .8], [2, 11, 1.2]], ann: [{ t: 'vhl', i: [8, 9, 10, 11], c: 'a', at: 2 }] },
      calc: [[1, 'C: price moved easily — {c}little opposition{/}, or {a}thin participation{/}'], [3, 'D: {m}lack of interest{/} — direction is not yet established']],
      say: [
        ['Combination C: low volume with substantial price movement.', 'Kombinasi C: volume rendah dengan pergerakan harga yang besar.'],
        ['Price moved easily. This may suggest little opposition, or simply thin participation, which can reverse just as easily.', 'Harga bergerak dengan mudah. Ini mungkin menunjukkan tentangan yang sedikit, atau sekadar penyertaan yang tipis, yang boleh berbalik dengan mudah juga.'],
        ['Combination D: low volume with limited movement.', 'Kombinasi D: volume rendah dengan pergerakan yang terhad.'],
        ['This suggests a lack of interest. Direction is not yet established, and patience is usually the right response.', 'Ini menunjukkan kurangnya minat. Arah masih belum ditentukan, dan kesabaran biasanya respons yang betul.'],
      ],
    },
    {
      tpl: 'table', label: 'Interpretation guide', kicker: '5.6 · EFFORT VERSUS RESULT', h: 'Possible interpretations — always in context', cols: ['Combination', 'Possible interpretation', 'What to check next'], widths: [430, 620, 610], hs: 38,
      rows: [
        [1, 'High volume · large progress', 'Move supported by participation', 'Does the next pullback hold? Is it a climax at an extreme?'],
        [2, 'High volume · little progress', 'Opposing activity may be present', 'Location (range edge? POI?), close location, next bars'],
        [3, 'Low volume · large movement', 'Little opposition — or thin market', 'Session, news, contract liquidity'],
        [4, 'Low volume · little movement', 'Lack of interest', 'Wait for effort to appear'],
      ],
      note: { at: 5, c: 'r', label: 'Limitation', text: 'The same combination can mean different things at a range low, mid-trend, or after news. Location and subsequent bars decide — not the bar alone.' },
      say: [
        ['Here is a summary of possible interpretations. Notice the third column. Every interpretation tells you what to check next.', 'Ini ialah ringkasan interpretasi yang mungkin. Perhatikan lajur ketiga. Setiap interpretasi memberitahu apa yang perlu disemak seterusnya.'],
        ['High volume with large progress suggests a move supported by participation. Check whether the next pullback holds, or whether this is a climax at an extreme.', 'Volume tinggi dengan kemajuan besar menunjukkan pergerakan yang disokong oleh penyertaan. Semak sama ada pullback seterusnya bertahan, atau sama ada ini climax di paras ekstrem.'],
        ['High volume with little progress suggests opposing activity may be present. Check the location, the close, and the next bars.', 'Volume tinggi dengan kemajuan sedikit menunjukkan aktiviti berlawanan mungkin wujud. Semak lokasi, penutupan, dan bar seterusnya.'],
        ['Low volume with large movement suggests little opposition, or a thin market. Check the session, news, and contract liquidity.', 'Volume rendah dengan pergerakan besar menunjukkan tentangan yang sedikit, atau pasaran yang tipis. Semak sesi, berita, dan kecairan kontrak.'],
        ['Low volume with little movement suggests a lack of interest. Wait for effort to appear.', 'Volume rendah dengan pergerakan sedikit menunjukkan kurang minat. Tunggu sehingga usaha muncul.'],
        ['The same combination can mean different things at a range low, mid-trend, or after news. Location and subsequent bars decide, not the bar alone.', 'Kombinasi yang sama boleh bermaksud perkara berbeza di range low, di tengah trend, atau selepas berita. Lokasi dan bar seterusnya yang menentukan, bukan bar itu sahaja.'],
      ],
    },
    {
      tpl: 'cards', label: 'Contract months', kicker: '5.7 · FCPO DATA CAUTION', h: 'Comparing volume across contract months', cols: 3, top: 190, ch: 300,
      cards: [
        { n: 'ACTIVE MONTH', t: 'Most volume concentrates in one or two months', b: 'Other months can trade far less — their "low volume" is normal.', at: 1 },
        { n: 'ROLLOVER', nc: 'amber', t: 'Volume migrates', b: 'As activity moves to the next month, volume falls in one contract and rises in another.', at: 2 },
        { n: 'CONTINUOUS CHART', nc: 'cyan', t: 'Spliced data', b: 'A continuous series may join different contracts. Volume jumps can be artefacts of the splice.', at: 3 },
      ],
      note: { at: 4, y: 560, label: 'Rule', text: 'Compare volume within the **same contract** (or a clearly documented continuous series), the same session, and a stated look-back.' },
      say: [
        ['A specific caution for F C P O: comparing volume across contract months.', 'Satu peringatan khusus untuk FCPO: membandingkan volume merentasi bulan kontrak.'],
        ['Most activity concentrates in one or two contract months. Other months can trade far less, and their low volume is normal.', 'Kebanyakan aktiviti tertumpu pada satu atau dua bulan kontrak. Bulan-bulan lain boleh didagangkan jauh lebih sedikit, dan volume rendah mereka adalah normal.'],
        ['During rollover, volume migrates: it falls in one contract and rises in the next.', 'Semasa rollover, volume berpindah: ia jatuh dalam satu kontrak dan meningkat dalam kontrak seterusnya.'],
        ['And a continuous chart may splice different contracts together, so some volume jumps are artefacts of the splice.', 'Dan chart berterusan mungkin menyambung kontrak yang berbeza, jadi sesetengah lonjakan volume ialah artifak penyambungan itu.'],
        ['The rule: compare volume within the same contract, the same session, and a stated look-back.', 'Peraturannya: bandingkan volume dalam kontrak yang sama, sesi yang sama, dan tempoh rujukan yang dinyatakan.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercises 4–5', kicker: 'EXERCISES 4 & 5', h: 'Analyse price, volume and spread · Interpret effort versus result', cols: 2, top: 190, ch: 340,
      cards: [
        { n: 'EX 4', t: 'Price, volume and spread', b: 'Pick 20 consecutive FCPO 30M bars from one contract. For each, record direction, spread, close location (upper/middle/lower third) and relative volume vs the prior 20 bars.', at: 1 },
        { n: 'EX 5', t: 'Effort versus result', b: 'Find one example of each combination A–D. For each, write: the observation, one possible interpretation, one alternative, and what you would check next.', at: 2 },
      ],
      note: { at: 3, y: 590, c: 'c', label: 'Answer guide', text: 'Observations must be numeric (e.g. "spread 12 pts, RV 2.4×, closed in upper third"). Interpretations must use "possible". Never infer who traded from volume alone.' },
      say: [
        ['Exercises Four and Five.', 'Latihan 4 dan 5.'],
        ['Exercise Four: pick twenty consecutive thirty-minute F C P O bars from one contract. Record direction, spread, close location and relative volume for each.', 'Latihan 4: pilih 20 bar FCPO 30 minit berturut-turut daripada satu kontrak. Rekodkan arah, spread, lokasi penutupan dan relative volume bagi setiap bar.'],
        ['Exercise Five: find one example of each effort-versus-result combination. Write the observation, a possible interpretation, an alternative, and what you would check next.', 'Latihan 5: cari satu contoh bagi setiap kombinasi effort versus result. Tulis pemerhatian, interpretasi yang mungkin, alternatif, dan apa yang anda akan semak seterusnya.'],
        ['Observations must be numeric. Interpretations must use the word possible. And never infer who traded from volume alone.', 'Pemerhatian mesti berangka. Interpretasi mesti menggunakan perkataan kemungkinan. Dan jangan sekali-kali membuat inferens tentang siapa yang berdagang daripada volume sahaja.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Why does high volume not automatically indicate buying?',
      opts: ['Because volume data is always wrong', 'Because every traded contract has both a buyer and a seller', 'Because high volume always means selling', 'Because volume only matters in forex'], ans: 1, ansAt: 1,
      expl: 'Volume counts contracts traded. Interpretation needs price behaviour — direction, spread, close location and context.',
      say: [
        ['Knowledge check. Why does high volume not automatically indicate buying?', 'Semakan pengetahuan. Mengapa volume tinggi tidak secara automatik menunjukkan belian?', { p: 1.5 }],
        ['The answer is B. Every traded contract has both a buyer and a seller. Interpretation needs price behaviour as well.', 'Jawapannya ialah B. Setiap kontrak yang didagangkan mempunyai pembeli dan penjual. Interpretasi memerlukan tingkah laku harga juga.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is Effort versus Result?',
      opts: ['Comparing two moving averages', 'Comparing volume (effort) with price movement or spread (result)', 'Comparing bid and ask prices', 'Comparing profit with loss'], ans: 1, ansAt: 1,
      expl: 'Agreement suggests supported movement; divergence is a reason to investigate — not proof of reversal or of who traded.',
      say: [
        ['Second question. What is effort versus result?', 'Soalan kedua. Apakah effort versus result?', { p: 1.5 }],
        ['The answer is B: comparing volume, the effort, with price movement or spread, the result.', 'Jawapannya ialah B: membandingkan volume, iaitu usaha, dengan pergerakan harga atau spread, iaitu hasil.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'VPA foundations — what to remember',
      items: [[0, 'VPA reads price, volume and spread together'], [1, 'Roots: Wyckoff → VSA → modern VPA'], [2, 'Know your volume type and data feed'], [3, 'Volume ≠ net buying or selling', 'w'], [4, 'Use relative volume with a stated look-back'], [5, 'Compare same session, same contract month'], [6, 'Spread = high − low; close location matters'], [7, 'Effort vs result: four combinations, read in context', 'w']],
      say: [
        ['To summarise. V P A reads price, volume and spread together.', 'Sebagai rumusan. VPA membaca harga, volume dan spread bersama-sama.'],
        ['Its roots run from Wyckoff, through Volume Spread Analysis, to modern V P A.', 'Akarnya bermula daripada Wyckoff, melalui Volume Spread Analysis, hingga VPA moden.'],
        ['Know which type of volume, and which data feed, you are using.', 'Ketahui jenis volume, dan data feed, yang anda gunakan.'],
        ['Volume is not net buying or selling.', 'Volume bukan belian atau jualan bersih.'],
        ['Use relative volume with a stated look-back.', 'Gunakan relative volume dengan tempoh rujukan yang dinyatakan.'],
        ['Compare the same session and the same contract month.', 'Bandingkan sesi yang sama dan bulan kontrak yang sama.'],
        ['Spread is high minus low, and close location matters.', 'Spread ialah high tolak low, dan lokasi penutupan adalah penting.'],
        ['And effort versus result has four combinations, always read in context.', 'Dan effort versus result mempunyai empat kombinasi, sentiasa dibaca dalam konteks.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 2', h: 'Ten VPA concepts — and how they meet SMC',
      chips: [[0, 'Stopping & climactic volume', ''], [0, 'No demand · No supply', ''], [0, 'Absorption', 'An interpretation, not proof'], [0, 'VPA + SMC', 'Bullish and bearish FCPO examples']],
      nk: 'NEXT · VIDEO 06', nt: 'Advanced VPA Concepts and SMC Integration', nAt: 1, ny: 420,
      say: [
        ['In Video Six, we study ten V P A concepts, from stopping volume to volume divergence, and integrate them with S M C in bullish and bearish F C P O examples.', 'Dalam Video 6, kita mengkaji sepuluh konsep VPA, daripada stopping volume hingga volume divergence, dan mengintegrasikannya dengan SMC dalam contoh FCPO bullish dan bearish.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga dan volume FCPO dalam video ini ialah ilustrasi hipotetikal. Rujukan: A. Coulling — A Complete Guide to Volume Price Analysis.', foot: 'Seterusnya: Video 06 — Advanced VPA Concepts and SMC Integration',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
