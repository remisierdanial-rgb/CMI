/* VIDEO 06 — Advanced VPA Concepts and SMC Integration
   Subtopic 2 · SMC + VPA — sections E (Ten VPA concepts), F (VPA + SMC), G (Bullish example), H (Bearish example), I (Common mistakes). */
// run(p0, [[delta, vol, upperWick, lowerWick], ...]) -> valid OHLC bars
const run = (p0, seq) => { let p = p0; return seq.map(([d, v, uw = 3, lw = 3]) => { const o = p, c = p + d; p = c; return { o, c, h: Math.max(o, c) + uw, l: Math.min(o, c) - lw, v }; }); };
const down = (n, d = -9, v = 900) => Array(n).fill([d, v]);
const up = (n, d = 9, v = 900) => Array(n).fill([d, v]);
const panel = (title, tag, bars, ann, extra = {}) => ({ type: 'candles', title, tag, bars, slots: bars.length + 2, volH: 130, reveal: [[0, bars.length - 1, 2]], ann, ...extra });

const STOP = run(4200, [...down(8, -10, 950), [-16, 2400, 3, 14], [-6, 2800, 4, 18], [4, 2600, 4, 12], [2, 1300], [8, 900], [6, 800], [-3, 600], [9, 900]]);
const CLIM = run(4000, [...up(9, 11, 1000), [16, 1500], [30, 3600, 14, 3], [-14, 2200, 4, 3], [-10, 1500], [4, 900], [-12, 1300], [-8, 1000]]);
const NODEM = run(4150, [...down(6, -10, 1100), [10, 1500], [-4, 1100], [5, 600, 2, 2], [4, 480, 2, 2], [-14, 1300], [-12, 1200], [-6, 1000]]);
const NOSUP = run(4000, [...up(6, 10, 1100), [-10, 1500], [4, 1100], [-5, 600, 2, 2], [-4, 470, 2, 2], [14, 1300], [12, 1250], [6, 1000]]);
const ABS = run(4150, [...down(7, -10, 1000), [-8, 2300, 3, 6], [3, 2700, 3, 8], [-2, 2900, 4, 8], [2, 2600, 3, 7], [12, 1400], [10, 1200], [8, 1100]]);
const CONF = run(4000, [[10, 1300], [12, 1500], [9, 1400], [-4, 700], [-3, 600], [11, 1500], [13, 1700], [-5, 650], [-3, 600], [12, 1600], [14, 1800], [10, 1500], [-4, 700]]);
const DIVG = run(4000, [[10, 1500], [14, 1900], [12, 1800], [-8, 900], [-6, 800], [9, 1300], [10, 1200], [8, 1050], [-7, 800], [-6, 700], [8, 900], [9, 820], [7, 700], [-10, 1100]]);

// integrated FCPO demos (explicit, verified bar-by-bar)
const BULL = run(4180, [...down(10, -9, 1000), [3, 800], [-4, 900], [6, 850], [-8, 1000], [-3, 900], [5, 850], [-5, 2600, 3, 22], [5, 2300, 3, 10], [-1, 2000, 4, 6], [7, 1100], [-2, 700, 2, 3], [9, 1500], [14, 2300], [16, 2600], [6, 1200], [-12, 650], [-9, 600, 3, 5], [10, 1400], [12, 1500], [8, 1300], [9, 1200]]);
const BEAR = run(3980, [...up(10, 9, 1000), [-3, 800], [4, 900], [-6, 850], [8, 1000], [3, 900], [-5, 850], [5, 2600, 22, 3], [-5, 2300, 10, 3], [1, 2000, 6, 4], [-7, 1100], [2, 700, 3, 2], [-9, 1500], [-14, 2300], [-16, 2600], [-6, 1200], [12, 650], [9, 600, 5, 3], [-10, 1400], [-12, 1500], [-8, 1300], [-9, 1200]]);

EP({
  num: '06', short: 'VPA Concepts + SMC', title: 'Advanced VPA Concepts and SMC Integration',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 06 · SUBTOPIC 2 · SMC + VPA',
      h: 'Advanced VPA Concepts and SMC Integration', sub: 'Ten VPA concepts · VPA with SMC · Bullish and bearish FCPO examples · Common mistakes',
      obj: [[1, 'Define ten VPA concepts with bullish and bearish readings'], [2, 'State confirmation requirements and misconceptions for each'], [3, 'Use VPA as context at SMC points of interest'], [4, 'Separate observation from interpretation in a full example']],
      viz: panel('VPA · STOPPING VOLUME', 'HYPOTHETICAL', STOP, [{ t: 'vhl', i: [8, 9, 10], c: 'a', at: 0, d: 2.2 }], { noAxis: true }),
      say: [
        ['Welcome to Video Six. We continue Subtopic Two with ten important V P A concepts.', 'Selamat datang ke Video 6. Kita meneruskan Subtopik 2 dengan sepuluh konsep VPA yang penting.'],
        ['For each concept: the definition, typical price-volume characteristics, bullish and bearish readings, context, confirmation, misconceptions and limitations.', 'Bagi setiap konsep: definisi, ciri harga-volume yang lazim, bacaan bullish dan bearish, konteks, pengesahan, salah faham dan had.'],
        ['Then we integrate V P A with S M C, in a bullish and a bearish F C P O example.', 'Kemudian kita mengintegrasikan VPA dengan SMC, dalam contoh FCPO bullish dan bearish.'],
        ['As always, we separate what we observe from what we interpret.', 'Seperti biasa, kita memisahkan apa yang kita perhatikan daripada apa yang kita tafsir.'],
      ],
    },
    {
      tpl: 'viz', label: '1 · Stopping volume',
      viz: panel('FCPO · 30M · HYPOTHETICAL', 'STOPPING VOLUME', STOP, [{ t: 'vhl', i: [8, 9, 10], c: 'a', at: 1 }, { t: 'chl', i: [8, 9, 10], c: 'a', at: 2 }, { t: 'note', x: .62, y: .9, text: 'LONG LOWER TAILS · CLOSES OFF THE LOWS', c: 'a', at: 2 }]),
      info: { k: 'CONCEPT 1', h: 'Stopping Volume', b: [[1, '**Definition:** heavy volume as a decline begins to slow', 'a'], [2, '**Typical:** high volume, lower tails, closes away from the lows', 'a'], [3, '**Bullish reading:** selling may be meeting demand', 'g'], [4, '**Bearish mirror:** heavy volume slowing an advance near highs', ''], [5, '**Confirm:** later tests hold on lower volume', 'c']], note: { at: 6, c: 'r', label: 'Misconception', text: 'Stopping volume is not "the bottom". It can be followed by further decline, especially in a strong downtrend.' } },
      say: [
        ['Concept one: stopping volume.', 'Konsep satu: stopping volume.'],
        ['Stopping volume is heavy volume appearing as a decline begins to slow.', 'Stopping volume ialah volume berat yang muncul ketika penurunan mula perlahan.'],
        ['Typically, the bars show high volume, lower tails, and closes away from their lows.', 'Lazimnya, bar menunjukkan volume tinggi, ekor bawah, dan penutupan yang jauh dari low.'],
        ['The bullish reading: selling pressure may be meeting significant demand.', 'Bacaan bullish: tekanan jualan mungkin bertemu dengan demand yang ketara.'],
        ['The bearish mirror is heavy volume slowing an advance near the highs.', 'Cerminan bearish ialah volume berat yang memperlahankan kenaikan berhampiran paras tinggi.'],
        ['Confirmation comes later, when tests of the area hold on lower volume.', 'Pengesahan datang kemudian, apabila ujian ke atas kawasan itu bertahan dengan volume lebih rendah.'],
        ['Stopping volume is not the bottom. It can be followed by further decline, especially in a strong downtrend.', 'Stopping volume bukan dasar. Ia boleh diikuti oleh penurunan selanjutnya, terutamanya dalam downtrend yang kuat.'],
      ],
    },
    {
      tpl: 'viz', label: '2 · Climactic volume',
      viz: panel('FCPO · 30M · HYPOTHETICAL', 'CLIMACTIC VOLUME', CLIM, [{ t: 'vhl', i: [10], c: 'a', at: 1 }, { t: 'tag', i: 10, text: 'EXTREME VOLUME · WIDE SPREAD', c: 'a', at: 2 }]),
      info: { k: 'CONCEPT 2', h: 'Climactic Volume', b: [[1, '**Definition:** extreme volume at the end of an extended move', 'a'], [2, '**Typical:** widest spread and highest volume of the move; often a long tail', 'a'], [3, '**Bearish reading** (after an advance): possible buying climax', ''], [4, '**Bullish reading** (after a decline): possible selling climax', 'g'], [5, '**Confirm:** sharp reaction and failure to exceed the extreme', 'c']], note: { at: 6, c: 'r', label: 'Misconception', text: 'Not every high-volume bar is a climax. A climax needs an extended prior move — and is supported only by what follows.' } },
      say: [
        ['Concept two: climactic volume.', 'Konsep dua: climactic volume.'],
        ['Climactic volume is extreme volume at the end of an extended move.', 'Climactic volume ialah volume ekstrem di penghujung pergerakan yang panjang.'],
        ['The bar usually has the widest spread and the highest volume of the move, often with a long tail.', 'Bar itu biasanya mempunyai spread paling lebar dan volume paling tinggi dalam pergerakan itu, selalunya dengan ekor yang panjang.'],
        ['After an advance, the bearish reading is a possible buying climax.', 'Selepas kenaikan, bacaan bearish ialah kemungkinan buying climax.'],
        ['After a decline, the bullish reading is a possible selling climax.', 'Selepas penurunan, bacaan bullish ialah kemungkinan selling climax.'],
        ['Confirmation is a sharp reaction, and a failure to exceed the extreme.', 'Pengesahan ialah reaksi yang tajam, dan kegagalan untuk melepasi paras ekstrem itu.'],
        ['Not every high-volume bar is a climax. It needs an extended prior move, and is supported only by what follows.', 'Bukan setiap bar volume tinggi ialah climax. Ia memerlukan pergerakan sebelumnya yang panjang, dan hanya disokong oleh apa yang menyusul.'],
      ],
    },
    {
      tpl: 'split', label: '3–4 · No demand / No supply',
      a: panel('NO DEMAND · HYPOTHETICAL', 'BEARISH CONTEXT', NODEM, [{ t: 'chl', i: [8, 9], c: 'r', at: 1 }, { t: 'vhl', i: [6, 7, 8, 9], c: 'a', at: 1 }]),
      b: panel('NO SUPPLY · HYPOTHETICAL', 'BULLISH CONTEXT', NOSUP, [{ t: 'chl', i: [8, 9], c: 'g', at: 3 }, { t: 'vhl', i: [6, 7, 8, 9], c: 'a', at: 3 }]),
      calc: [[2, 'No Demand: {r}narrow up-bar{/}, volume lower than the previous two bars'], [4, 'No Supply: {gr}narrow down-bar{/}, volume lower than the previous two bars']],
      say: [
        ['Concepts three and four: no demand and no supply.', 'Konsep tiga dan empat: no demand dan no supply.'],
        ['No demand is an up-bar with a narrow spread, on volume lower than the previous two bars. In a downtrend or at resistance, it suggests a lack of buying interest: a bearish reading.', 'No demand ialah bar naik dengan spread sempit, pada volume lebih rendah daripada dua bar sebelumnya. Dalam downtrend atau di resistance, ia menunjukkan kurang minat membeli: bacaan bearish.'],
        ['Confirmation is the next bars failing to rise, and price resuming lower.', 'Pengesahan ialah bar seterusnya gagal naik, dan harga kembali turun.'],
        ['No supply is the mirror: a down-bar with a narrow spread, on volume lower than the previous two bars. In an uptrend or at support, it suggests a lack of selling interest: a bullish reading.', 'No supply ialah cerminannya: bar turun dengan spread sempit, pada volume lebih rendah daripada dua bar sebelumnya. Dalam uptrend atau di support, ia menunjukkan kurang minat menjual: bacaan bullish.'],
        ['The misconception: a single low-volume bar is not a signal. Context and the next bars matter, and in a thin session, low volume may simply be normal.', 'Salah fahamnya: satu bar volume rendah bukan isyarat. Konteks dan bar seterusnya adalah penting, dan dalam sesi yang tipis, volume rendah mungkin sekadar normal.'],
      ],
    },
    {
      tpl: 'viz', label: '5 · Absorption',
      viz: panel('FCPO · 30M · HYPOTHETICAL', 'POSSIBLE ABSORPTION', ABS, [{ t: 'vhl', i: [7, 8, 9, 10], c: 'a', at: 1 }, { t: 'zone', p1: 4072, p2: 4092, i1: 7, i2: 10, c: 'a', label: 'HIGH VOLUME · PRICE HOLDS', at: 2 }]),
      info: { k: 'CONCEPT 5', h: 'Absorption', b: [[1, '**Definition (VPA):** high volume while price fails to progress against a level', 'a'], [2, '**Typical:** several high-volume, narrow-spread bars at the same area', 'a'], [3, '**Bullish reading:** selling may be absorbed by passive buyers', 'g'], [4, '**Bearish reading:** buying absorbed by passive sellers at highs', ''], [5, '**Confirm:** a move away from the area, and successful retests', 'c']], note: { at: 6, c: 'r', label: 'Important', text: 'Absorption is an **interpretation**. From bar volume alone, we cannot prove who absorbed whom. Order Flow (Video 08) adds more detail — but still not identity.' } },
      say: [
        ['Concept five: absorption.', 'Konsep lima: absorption.'],
        ['In V P A, absorption describes high volume while price fails to progress against a level.', 'Dalam VPA, absorption menggambarkan volume tinggi ketika harga gagal maju menentang sesuatu paras.'],
        ['Typically, several high-volume, narrow-spread bars form at the same area.', 'Lazimnya, beberapa bar dengan volume tinggi dan spread sempit terbentuk di kawasan yang sama.'],
        ['The bullish reading: selling may be absorbed by passive buyers.', 'Bacaan bullish: jualan mungkin diserap oleh pembeli pasif.'],
        ['The bearish reading, at highs: buying may be absorbed by passive sellers.', 'Bacaan bearish, di paras tinggi: belian mungkin diserap oleh penjual pasif.'],
        ['Confirmation is price moving away from the area, and successful retests.', 'Pengesahan ialah harga bergerak menjauhi kawasan itu, dan ujian semula yang berjaya.'],
        ['Absorption is an interpretation. From bar volume alone, we cannot prove who absorbed whom.', 'Absorption ialah interpretasi. Daripada volume bar sahaja, kita tidak dapat membuktikan siapa menyerap siapa.'],
      ],
    },
    {
      tpl: 'table', label: '6–8 · Spread combinations', kicker: 'CONCEPTS 6–8', h: 'Effort versus Result · High volume & narrow spread · Low volume & wide spread', hs: 32, cols: ['Concept', 'Characteristics', 'Bullish / bearish reading', 'Confirm with'], widths: [330, 440, 520, 380],
      rows: [
        [1, '6 · Effort vs Result', 'Volume compared with spread and progress', 'Agreement supports a move; divergence warns', 'Next bars and location'],
        [2, '7 · High vol, narrow spread', 'Heavy trade, little range', 'At lows: possible demand · at highs: possible supply', 'Close location, retests'],
        [3, '8 · Low vol, wide spread', 'Large range, thin trade', 'Move may lack participation; may reverse easily', 'Volume on follow-through'],
      ],
      note: { at: 4, c: 'r', label: 'Misconception', text: 'High volume with a narrow spread is not automatically absorption, and low volume with a wide spread is not automatically a "fake" move. Session, news and liquidity can explain both.' },
      say: [
        ['Concepts six to eight relate to spread.', 'Konsep enam hingga lapan berkaitan dengan spread.'],
        ['Six, effort versus result, compares volume with spread and progress. Agreement supports a move; divergence is a warning. Confirm with the next bars and the location.', 'Enam, effort versus result, membandingkan volume dengan spread dan kemajuan. Persetujuan menyokong pergerakan; percanggahan ialah amaran. Sahkan dengan bar seterusnya dan lokasi.'],
        ['Seven, high volume with a narrow spread: heavy trade, little range. At lows, it may suggest demand. At highs, it may suggest supply. Confirm with close location and retests.', 'Tujuh, volume tinggi dengan spread sempit: dagangan berat, julat kecil. Di paras rendah, ia mungkin menunjukkan demand. Di paras tinggi, ia mungkin menunjukkan supply. Sahkan dengan lokasi penutupan dan ujian semula.'],
        ['Eight, low volume with a wide spread: a large range on thin trade. The move may lack participation and could reverse easily. Confirm with volume on the follow-through.', 'Lapan, volume rendah dengan spread lebar: julat besar dengan dagangan tipis. Pergerakan itu mungkin kurang penyertaan dan boleh berbalik dengan mudah. Sahkan dengan volume pada susulan.'],
        ['Neither combination is automatic. Session, news and liquidity can explain both.', 'Kedua-dua kombinasi bukan automatik. Sesi, berita dan kecairan boleh menjelaskan kedua-duanya.'],
      ],
    },
    {
      tpl: 'split', label: '9–10 · Confirmation / divergence',
      a: panel('VOLUME CONFIRMATION · HYPOTHETICAL', 'HEALTHY TREND', CONF, [{ t: 'vhl', i: [0, 1, 2, 5, 6, 9, 10, 11], c: 'g', at: 1 }, { t: 'vhl', i: [3, 4, 7, 8, 12], c: 'p', at: 2 }]),
      b: panel('VOLUME DIVERGENCE · HYPOTHETICAL', 'WEAKENING PARTICIPATION', DIVG, [{ t: 'path', pts: [[1, 4049], [6, 4085], [11, 4100]], c: 'g', at: 3 }, { t: 'vhl', i: [1, 6, 11], c: 'r', at: 4 }]),
      calc: [[2, 'Confirmation: volume {gr}rises with the trend{/}, {p}falls on pullbacks{/}'], [4, 'Divergence: {r}new highs on lower volume{/} — a warning, not a sell signal']],
      say: [
        ['Concept nine: volume confirmation. In a healthy trend, volume tends to rise on moves in the trend direction.', 'Konsep sembilan: volume confirmation. Dalam trend yang sihat, volume cenderung meningkat pada pergerakan mengikut arah trend.'],
        ['And it tends to fall on pullbacks. This pattern supports the trend.', 'Dan ia cenderung menurun pada pullback. Corak ini menyokong trend.'],
        ['Concept ten: volume divergence. Here, price makes successive new highs.', 'Konsep sepuluh: volume divergence. Di sini, harga membuat high baharu berturut-turut.'],
        ['But each new high is made on lower volume. This suggests weakening participation.', 'Tetapi setiap high baharu dibuat dengan volume lebih rendah. Ini menunjukkan penyertaan yang semakin lemah.'],
        ['Divergence is a warning, not a sell signal. Trends can continue for a long time on declining volume.', 'Divergence ialah amaran, bukan isyarat jual. Trend boleh berterusan untuk tempoh yang lama dengan volume yang menurun.'],
      ],
    },
    {
      tpl: 'table', label: 'VPA + SMC', kicker: '6.2 · VPA AND SMC', h: 'What VPA can add at each SMC element', hs: 36, cols: ['SMC element', 'VPA can add…', 'VPA cannot…'], widths: [380, 680, 600],
      rows: [
        [1, 'Liquidity sweep', 'Volume and close location on the sweep bar', 'prove stops were triggered'],
        [2, 'Order Block / Supply–Demand', 'Effort vs result when price returns', 'confirm the OB is "institutional"'],
        [2, 'Fair Value Gap', 'Participation behind the displacement', 'validate an FVG by low volume'],
        [3, 'Displacement / BOS / CHoCH / MSS', 'Whether the break had effort behind it', 'guarantee follow-through'],
        [4, 'POI selection', 'Context to rank POIs', 'replace your POI rules'],
      ],
      warnLast: true,
      note: { at: 5, label: 'Rule', text: 'High volume does not confirm an Order Block, and low volume does not validate an FVG. VPA adds **context**, not certainty.' },
      say: [
        ['Now, how can V P A complement S M C? Read this table carefully, especially the right-hand column.', 'Sekarang, bagaimana VPA boleh melengkapkan SMC? Baca jadual ini dengan teliti, terutamanya lajur sebelah kanan.'],
        ['At a liquidity sweep, V P A adds the volume and close location of the sweep bar. It cannot prove that stops were triggered.', 'Pada liquidity sweep, VPA menambah volume dan lokasi penutupan bar sweep. Ia tidak dapat membuktikan stop telah dicetuskan.'],
        ['At an Order Block, supply or demand zone, or fair value gap, V P A adds effort versus result when price returns. It cannot confirm the zone is institutional.', 'Pada Order Block, zon supply atau demand, atau fair value gap, VPA menambah effort versus result apabila harga kembali. Ia tidak dapat mengesahkan zon itu bersifat institusi.'],
        ['For displacement, break of structure, change of character and market structure shift, it shows whether the break had effort behind it. It cannot guarantee follow-through.', 'Bagi displacement, break of structure, change of character dan market structure shift, ia menunjukkan sama ada pemecahan itu disokong usaha. Ia tidak dapat menjamin susulan.'],
        ['And for P O I selection, it adds context to rank candidates, but it does not replace your P O I rules.', 'Dan untuk pemilihan POI, ia menambah konteks untuk menyusun calon, tetapi ia tidak menggantikan peraturan POI anda.'],
        ['So high volume does not confirm an Order Block, and low volume does not validate a fair value gap. V P A adds context, not certainty.', 'Jadi volume tinggi tidak mengesahkan Order Block, dan volume rendah tidak mengesahkan fair value gap. VPA menambah konteks, bukan kepastian.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bullish VPA + SMC',
      viz: {
        type: 'candles', title: 'BULLISH · FCPO · 30M · HYPOTHETICAL', tag: 'VPA + SMC', bars: BULL, slots: BULL.length + 2, volH: 110, reveal: [[0, 15, 2], [3, 18, 1], [6, 23, 1.2], [8, 31, 1.5]],
        ann: [
          { t: 'zone', p1: 4082, p2: 4096, i1: 9, i2: 31, c: 'g', label: 'HTF BULLISH POI (DEMAND)', at: 0, d: 1, ly: 'b', lx: 'r' },
          { t: 'hline', p: 4081, i1: 12, i2: 24, c: 'c', label: 'SSL · EQUAL LOWS 4,081', at: 1, lx: 'l' },
          { t: 'tag', i: 16, text: 'SWEEP TO 4,062', c: 'c', pos: 'below', at: 2 },
          { t: 'vhl', i: [16, 17, 18], c: 'a', at: 3 }, { t: 'chl', i: [16, 17, 18], c: 'a', at: 4 },
          { t: 'hline', p: 4098, i1: 12, i2: 24, c: 'y', label: 'CHoCH 4,098', at: 5 },
          { t: 'vhl', i: [21, 22, 23], c: 'g', at: 6 },
          { t: 'zone', p1: 4105, p2: 4113, i1: 21, i2: 31, c: 'p', label: 'FVG 4,105–4,113', at: 7, lx: 'r' },
          { t: 'hline', p: 4113, i1: 24, i2: 31, c: 'w', label: 'ENTRY 4,113', at: 8, dash: false, w: 1.5 }, { t: 'hline', p: 4060, i1: 16, i2: 31, c: 'r', label: 'STOP 4,060', at: 8 },
        ],
      },
      info: { k: '6.3 · BULLISH EXAMPLE', h: 'Observation → interpretation', b: [[1, 'OBS: price reaches HTF demand; equal lows (SSL) at 4,081', 'c'], [2, 'OBS: trades to 4,062, closes back above at 4,084', 'c'], [3, 'OBS: 3 bars, volume 2.0–2.6k (≈2–3× avg)', 'a'], [4, 'INT: possible stopping activity — spread narrows, tails form', 'a'], [5, 'OBS: close above 4,098 — CHoCH', 'y'], [6, 'OBS: displacement on rising volume', 'g'], [7, 'Pullback into FVG on lower volume', 'p'], [8, 'Entry 4,113 · stop 4,060 · risk 53 ticks = RM1,325', 'w']] },
      say: [
        ['Now a bullish V P A plus S M C example on hypothetical F C P O data.', 'Sekarang contoh bullish VPA + SMC pada data FCPO hipotetikal.'],
        ['Observation: price approaches a higher-timeframe bullish point of interest. Equal lows at four thousand and eighty-one hold sell-side liquidity.', 'Pemerhatian: harga menghampiri POI bullish higher timeframe. Equal lows pada 4,081 menyimpan sell-side liquidity.'],
        ['Observation: price trades down to four thousand and sixty-two, through the liquidity, and closes back above, at four thousand and eighty-four.', 'Pemerhatian: harga turun ke 4,062, melepasi liquidity, dan ditutup semula di atas, pada 4,084.'],
        ['Observation: three bars trade about two to two point six thousand contracts, roughly two to three times the recent average.', 'Pemerhatian: tiga bar mendagangkan kira-kira 2,000 hingga 2,600 kontrak, lebih kurang dua hingga tiga kali ganda purata terkini.'],
        ['Interpretation: possible stopping activity. Spread narrows and lower tails form, but this is not proof of institutional buying.', 'Interpretasi: kemungkinan stopping activity. Spread menyempit dan ekor bawah terbentuk, tetapi ini bukan bukti belian institusi.'],
        ['Observation: price closes above four thousand and ninety-eight, the last lower high. This is a change of character.', 'Pemerhatian: harga ditutup di atas 4,098, lower high terakhir. Ini ialah change of character.'],
        ['Displacement follows, on rising volume: effort and result agree.', 'Displacement menyusul, dengan volume yang meningkat: usaha dan hasil sepadan.'],
        ['The displacement leaves a fair value gap from four thousand one hundred and five to four thousand one hundred and thirteen. Price pulls back into it on lower volume, consistent with no supply.', 'Displacement meninggalkan fair value gap dari 4,105 hingga 4,113. Harga berundur ke dalamnya dengan volume lebih rendah, selaras dengan no supply.'],
        ['Entry conditions are met at four thousand one hundred and thirteen, with a stop below the sweep low at four thousand and sixty. Risk is fifty-three ticks, or one thousand three hundred and twenty-five ringgit per contract. A wide stop like this must be reflected in position size.', 'Syarat entry dipenuhi pada 4,113, dengan stop di bawah low sweep pada 4,060. Risiko ialah 53 tick, atau RM1,325 setiap kontrak. Stop yang lebar seperti ini mesti diambil kira dalam saiz posisi.'],
      ],
    },
    {
      tpl: 'viz', label: 'Bearish VPA + SMC',
      viz: {
        type: 'candles', title: 'BEARISH · FCPO · 30M · HYPOTHETICAL', tag: 'VPA + SMC', bars: BEAR, slots: BEAR.length + 2, volH: 110, reveal: [[0, 15, 2], [3, 18, 1], [5, 23, 1.2], [7, 31, 1.5]],
        ann: [
          { t: 'zone', p1: 4064, p2: 4078, i1: 9, i2: 31, c: 'r', label: 'HTF BEARISH POI (SUPPLY)', at: 0, d: 1, lx: 'r' },
          { t: 'hline', p: 4079, i1: 12, i2: 24, c: 'c', label: 'BSL · EQUAL HIGHS 4,079', at: 1, lx: 'l' },
          { t: 'tag', i: 16, text: 'SWEEP TO 4,098', c: 'c', at: 2 },
          { t: 'vhl', i: [16, 17, 18], c: 'a', at: 3 },
          { t: 'hline', p: 4062, i1: 12, i2: 24, c: 'y', label: 'BEARISH CHoCH 4,062', at: 4 },
          { t: 'vhl', i: [21, 22, 23], c: 'r', at: 5 },
          { t: 'zone', p1: 4047, p2: 4055, i1: 21, i2: 31, c: 'p', label: 'FVG 4,047–4,055', at: 6, lx: 'r', ly: 'b' },
          { t: 'hline', p: 4047, i1: 24, i2: 31, c: 'w', label: 'ENTRY 4,047', at: 7, dash: false, w: 1.5 }, { t: 'hline', p: 4100, i1: 16, i2: 31, c: 'r', label: 'STOP 4,100', at: 7 },
        ],
      },
      info: { k: '6.4 · BEARISH EXAMPLE', h: 'The mirror case', b: [[1, 'OBS: price reaches HTF supply; equal highs (BSL) at 4,079', 'c'], [2, 'OBS: trades to 4,098, closes back below at 4,076', 'c'], [3, 'OBS: heavy volume, narrowing spread, upper tails — INT: possible opposing activity', 'a'], [4, 'OBS: close below 4,062 — bearish CHoCH', 'y'], [5, 'OBS: displacement down on rising volume', ''], [6, 'Pullback into FVG on lower volume (no demand?)', 'p'], [7, 'Entry 4,047 · stop 4,100 · risk 53 ticks', 'w']] },
      say: [
        ['And the bearish mirror.', 'Dan cerminan bearish.'],
        ['Observation: price approaches a higher-timeframe bearish point of interest. Equal highs at four thousand and seventy-nine hold buy-side liquidity.', 'Pemerhatian: harga menghampiri POI bearish higher timeframe. Equal highs pada 4,079 menyimpan buy-side liquidity.'],
        ['Observation: price trades up to four thousand and ninety-eight, and closes back below, at four thousand and seventy-six.', 'Pemerhatian: harga naik ke 4,098, dan ditutup semula di bawah, pada 4,076.'],
        ['Heavy volume, a narrowing spread and upper tails appear. Interpretation: possible opposing activity, nothing more.', 'Volume berat, spread yang menyempit dan ekor atas muncul. Interpretasi: kemungkinan aktiviti berlawanan, tidak lebih daripada itu.'],
        ['Observation: price closes below four thousand and sixty-two. A bearish change of character.', 'Pemerhatian: harga ditutup di bawah 4,062. Bearish change of character.'],
        ['Displacement follows on rising volume.', 'Displacement menyusul dengan volume yang meningkat.'],
        ['Price pulls back into the fair value gap, from four thousand and forty-seven to four thousand and fifty-five, on lower volume, consistent with no demand.', 'Harga berundur ke dalam fair value gap, dari 4,047 hingga 4,055, dengan volume lebih rendah, selaras dengan no demand.'],
        ['Entry conditions are evaluated at four thousand and forty-seven, with a stop above the sweep high at four thousand one hundred.', 'Syarat entry dinilai pada 4,047, dengan stop di atas high sweep pada 4,100.'],
      ],
    },
    {
      tpl: 'cards', label: 'Common mistakes', kicker: '6.5 · COMMON VPA MISTAKES', h: 'Eight mistakes to avoid', cols: 4, top: 170, ch: 210,
      cards: [
        { n: '01', nc: 'red2', t: 'Volume without price context', b: 'Volume alone has no direction.', at: 1 },
        { n: '02', nc: 'red2', t: '"High volume = buying"', b: 'Every contract has a buyer and seller.', at: 1 },
        { n: '03', nc: 'red2', t: '"Low volume = selling"', b: 'Low volume is lack of activity.', at: 2 },
        { n: '04', nc: 'red2', t: 'Every high-volume bar = absorption', b: 'Absorption needs failed progress at a level.', at: 2 },
        { n: '05', nc: 'red2', t: 'Volume as proof of institutions', b: 'Volume does not reveal identity.', at: 3 },
        { n: '06', nc: 'red2', t: 'Ignoring sessions', b: 'Compare the same session.', at: 3 },
        { n: '07', nc: 'red2', t: 'Mixing contract months', b: 'Active vs deferred months differ.', at: 4 },
        { n: '08', nc: 'red2', t: 'Ignoring participation changes', b: 'Holidays, news, rollover change volume.', at: 4 },
      ],
      say: [
        ['Eight common V P A mistakes.', 'Lapan kesilapan VPA yang biasa.'],
        ['Reading volume without price context, and assuming high volume always means buying.', 'Membaca volume tanpa konteks harga, dan menganggap volume tinggi sentiasa bermaksud belian.'],
        ['Assuming low volume means selling, and calling every high-volume candle absorption.', 'Menganggap volume rendah bermaksud jualan, dan memanggil setiap candle volume tinggi sebagai absorption.'],
        ['Treating volume as proof of institutional activity, and ignoring session differences.', 'Menganggap volume sebagai bukti aktiviti institusi, dan mengabaikan perbezaan sesi.'],
        ['Comparing volume across different contract months without adjustment, and ignoring changes in market participation such as holidays, news and rollover.', 'Membandingkan volume merentasi bulan kontrak berbeza tanpa pelarasan, dan mengabaikan perubahan penyertaan pasaran seperti cuti, berita dan rollover.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'Price reaches an Order Block on very high volume. What is the correct statement?',
      opts: ['The Order Block is now confirmed', 'High volume shows institutions are defending it', 'Volume is high; how price responds next is what matters', 'The trade must be taken immediately'], ans: 2, ansAt: 1,
      expl: 'High volume does not confirm an OB. Observe effort vs result and the subsequent price response.',
      say: [
        ['Knowledge check. Price reaches an Order Block on very high volume. What is the correct statement?', 'Semakan pengetahuan. Harga mencapai Order Block dengan volume yang sangat tinggi. Apakah kenyataan yang betul?', { p: 1.5 }],
        ['The answer is C. Volume is high, but how price responds next is what matters. High volume does not confirm an Order Block.', 'Jawapannya ialah C. Volume tinggi, tetapi bagaimana harga bertindak balas seterusnya yang penting. Volume tinggi tidak mengesahkan Order Block.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Advanced VPA + SMC — what to remember',
      items: [[0, 'Stopping & climactic volume: supported by what follows'], [1, 'No demand / no supply: narrow bar, lower volume than prior two'], [2, 'Absorption is an interpretation'], [3, 'Confirmation: volume with trend, less on pullbacks'], [4, 'Divergence is a warning, not a signal'], [5, 'VPA adds context at SMC POIs — not certainty', 'w'], [6, 'Write observations and interpretations separately', 'w'], [7, 'Avoid the eight common mistakes', 'w']],
      say: [
        ['To summarise. Stopping and climactic volume are supported only by what follows.', 'Sebagai rumusan. Stopping dan climactic volume hanya disokong oleh apa yang menyusul.'],
        ['No demand and no supply are narrow bars on lower volume than the previous two.', 'No demand dan no supply ialah bar sempit dengan volume lebih rendah daripada dua bar sebelumnya.'],
        ['Absorption is an interpretation.', 'Absorption ialah interpretasi.'],
        ['Volume confirmation means volume with the trend and less on pullbacks.', 'Volume confirmation bermaksud volume mengikut trend dan berkurangan pada pullback.'],
        ['Divergence is a warning, not a signal.', 'Divergence ialah amaran, bukan isyarat.'],
        ['V P A adds context at S M C points of interest, not certainty.', 'VPA menambah konteks pada POI SMC, bukan kepastian.'],
        ['Write observations and interpretations separately.', 'Tulis pemerhatian dan interpretasi secara berasingan.'],
        ['And avoid the eight common mistakes.', 'Dan elakkan lapan kesilapan biasa.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 3', h: 'From bars to transactions: Order Flow',
      chips: [[0, 'Bid · Ask · Spread', 'The order book'], [0, 'Market vs limit orders', 'Aggressive vs passive'], [0, 'Delta & CVD', 'Classified volume']],
      nk: 'NEXT · VIDEO 07', nt: 'Order Flow: Market Microstructure', nAt: 1, ny: 420,
      say: [
        ['That completes Subtopic Two. In Video Seven, Subtopic Three begins: Order Flow and market microstructure, including bid, ask, Delta and cumulative volume delta.', 'Itu melengkapkan Subtopik 2. Dalam Video 7, Subtopik 3 bermula: Order Flow dan market microstructure, termasuk bid, ask, Delta dan cumulative volume delta.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga dan volume FCPO dalam video ini ialah ilustrasi hipotetikal. Rujukan: A. Coulling — A Complete Guide to Volume Price Analysis; Finding a Set Up with Volume Price Analysis.', foot: 'Seterusnya: Video 07 — Order Flow: Market Microstructure',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
