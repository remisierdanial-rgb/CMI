/* VIDEO 03 — Wyckoff Accumulation and Distribution
   Subtopic 1 · SMC + Wyckoff — sections C (Accumulation structure) and D (Distribution structure). */
const ACC = [[0, 92], [6, 70], [10, 52], [13, 60], [18, 20], [24, 58], [30, 28], [35, 50], [40, 32], [46, 55], [52, 34], [57, 52], [63, 12], [66, 36], [70, 25], [77, 66], [82, 50], [89, 76], [92, 66], [100, 92]];
const DIS = ACC.map(([x, y]) => [x, 100 - y]);
const accLabels = [
  { x: 10, y: 52, text: 'PS', c: 'y', pos: 'below' }, { x: 18, y: 20, text: 'SC', c: 'r', pos: 'below' }, { x: 24, y: 58, text: 'AR', c: 'c' }, { x: 30, y: 28, text: 'ST', c: 'y', pos: 'below' },
  { x: 40, y: 32, text: 'ST (B)', c: 'y', pos: 'below' }, { x: 63, y: 12, text: 'SPRING', c: 'g', pos: 'below' }, { x: 70, y: 25, text: 'TEST', c: 'g', pos: 'below' }, { x: 77, y: 66, text: 'SOS', c: 'g' }, { x: 82, y: 50, text: 'LPS', c: 'g', pos: 'below' }, { x: 92, y: 66, text: 'LPS / BU', c: 'g', pos: 'below' },
];
const disLabels = [
  { x: 10, y: 48, text: 'PSY', c: 'y' }, { x: 18, y: 80, text: 'BC', c: 'g' }, { x: 24, y: 42, text: 'AR', c: 'c', pos: 'below' }, { x: 30, y: 72, text: 'ST', c: 'y' },
  { x: 46, y: 45, text: '', c: 'm' }, { x: 40, y: 68, text: 'UT / ST (B)', c: 'y' }, { x: 63, y: 88, text: 'UTAD', c: 'r' }, { x: 70, y: 75, text: 'TEST', c: 'r' }, { x: 77, y: 34, text: 'SOW', c: 'r', pos: 'below' }, { x: 82, y: 50, text: 'LPSY', c: 'r' }, { x: 92, y: 34, text: 'LPSY', c: 'r' },
].filter(l => l.text);
// labels visible: show[i] = segment index at which label i appears (undefined = hidden)
const sch = (kind, show, extra = {}) => ({
  type: 'lines', title: kind === 'acc' ? 'WYCKOFF ACCUMULATION · SCHEMATIC' : 'WYCKOFF DISTRIBUTION · SCHEMATIC', tag: 'IDEALISED · NOT TO SCALE',
  series: [{ pts: kind === 'acc' ? ACC : DIS, c: 'w', at: 0, dur: extra.dur ?? .01 }],
  hl: kind === 'acc' ? [{ y: 20, c: 'c', x1: 14, x2: 80, at: 0 }, { y: 58, c: 'c', x1: 20, x2: 80, at: 0 }] : [{ y: 80, c: 'c', x1: 14, x2: 80, at: 0 }, { y: 42, c: 'c', x1: 20, x2: 80, at: 0 }],
  texts: [{ x: 100, y: kind === 'acc' ? 3 : 97, text: kind === 'acc' ? 'Dashed lines: range support (SC low) and resistance (AR high)' : 'Dashed lines: range resistance (BC high) and support (AR low)', anchor: 'end', c: 'c', fs: 15, mono: true, at: 0 }],
  bands: extra.phases ? [{ x1: 6, x2: 31, label: 'A', c: 'p', at: extra.phases[0] }, { x1: 31, x2: 60, label: 'B', c: 'b', at: extra.phases[1] }, { x1: 60, x2: 73, label: 'C', c: 'y', at: extra.phases[2] }, { x1: 73, x2: 90, label: 'D', c: kind === 'acc' ? 'g' : 'r', at: extra.phases[3] }, { x1: 90, x2: 100, label: 'E', c: kind === 'acc' ? 'g' : 'r', at: extra.phases[4] }] : [],
  labels: (kind === 'acc' ? accLabels : disLabels).map((l, i) => show[i] === undefined ? null : { ...l, at: show[i] }).filter(Boolean),
});
const ALL = (n, at = 0) => Array(n).fill(at);
const DIS_NOTE = 'Real markets rarely match the schematic exactly. Events can be missing, repeated or ambiguous.';

EP({
  num: '03', short: 'Accumulation & Distribution', title: 'Wyckoff Accumulation and Distribution',
  scenes: [
    {
      tpl: 'title', label: 'Introduction', kicker: 'VIDEO 03 · SUBTOPIC 1 · SMC + WYCKOFF',
      h: 'Wyckoff Accumulation and Distribution', sub: 'Schematics · Events · Volume behaviour · Alternative interpretations',
      obj: [[1, 'Build the accumulation schematic: PS, SC, AR, ST, Spring, Test, SOS, LPS'], [2, 'Build the distribution schematic: PSY, BC, AR, ST, UT, UTAD, SOW, LPSY'], [3, 'Describe expected price and volume behaviour for each event'], [4, 'State alternative interpretations and limitations']],
      viz: { ...sch('acc', ALL(10, 0), { dur: 3 }), title: 'ACCUMULATION · SCHEMATIC' },
      say: [
        ['Welcome to Video Three. In this video, we go inside the trading range.', 'Selamat datang ke Video 3. Dalam video ini, kita akan masuk ke dalam trading range.'],
        ['We will build the classic accumulation schematic, event by event: Preliminary Support, Selling Climax, Automatic Rally, Secondary Test, Spring, Test, Sign of Strength and Last Point of Support.', 'Kita akan membina skematik accumulation klasik, peristiwa demi peristiwa: Preliminary Support, Selling Climax, Automatic Rally, Secondary Test, Spring, Test, Sign of Strength dan Last Point of Support.'],
        ['Then the distribution schematic: Preliminary Supply, Buying Climax, Automatic Reaction, Secondary Test, Upthrust, Upthrust After Distribution, Sign of Weakness and Last Point of Supply.', 'Kemudian skematik distribution: Preliminary Supply, Buying Climax, Automatic Reaction, Secondary Test, Upthrust, Upthrust After Distribution, Sign of Weakness dan Last Point of Supply.'],
        ['For each event, we cover the definition, price and volume behaviour, its position in the structure, alternative interpretations, and limitations.', 'Bagi setiap peristiwa, kita merangkumi definisi, tingkah laku harga dan volume, kedudukannya dalam struktur, interpretasi alternatif, dan hadnya.'],
        ['One rule applies throughout: these are idealised schematics. Real markets rarely match them exactly.', 'Satu peraturan terpakai sepanjang video: ini ialah skematik ideal. Pasaran sebenar jarang sepadan dengannya secara tepat.'],
      ],
    },
    {
      tpl: 'viz', label: 'Accumulation · phases',
      viz: sch('acc', [], { dur: 3, phases: [1, 2, 3, 4, 5] }),
      info: { k: '3.1 · ACCUMULATION', h: 'Five phases: A to E', b: [[1, '**Phase A:** the downtrend is stopped', 'p'], [2, '**Phase B:** cause is built inside the range', 'c'], [3, '**Phase C:** a test of supply — often a Spring', 'y'], [4, '**Phase D:** demand dominates; price moves toward resistance', 'g'], [5, '**Phase E:** price leaves the range — markup', 'g']], note: { at: 6, label: 'Reference', text: 'Phase lettering follows the classic schematic used in established Wyckoff tutorials, such as StockCharts.' } },
      say: [
        ['Here is the idealised accumulation schematic. A decline ends in a trading range, which later resolves upward.', 'Ini ialah skematik accumulation yang ideal. Penurunan berakhir dalam trading range, yang kemudiannya diselesaikan ke atas.'],
        ['Phase A is where the downtrend is stopped.', 'Fasa A ialah di mana downtrend dihentikan.'],
        ['Phase B is where the cause is built, as price moves back and forth inside the range.', 'Fasa B ialah di mana cause dibina, ketika harga bergerak ke sana sini dalam range.'],
        ['Phase C is a test of remaining supply, often in the form of a Spring.', 'Fasa C ialah ujian ke atas baki supply, selalunya dalam bentuk Spring.'],
        ['In Phase D, demand appears to dominate, and price moves toward and above resistance.', 'Dalam Fasa D, demand kelihatan menguasai, dan harga bergerak ke arah dan melepasi resistance.'],
        ['And in Phase E, price leaves the range. This is markup.', 'Dan dalam Fasa E, harga keluar dari range. Ini ialah markup.'],
        ['This phase lettering follows the classic schematic used in established Wyckoff tutorials.', 'Huruf fasa ini mengikuti skematik klasik yang digunakan dalam tutorial Wyckoff yang mantap.'],
      ],
    },
    {
      tpl: 'viz', label: 'PS and SC', viz: sch('acc', [1, 3]),
      info: { k: '3.2 · PHASE A', h: 'PS and SC', b: [[1, '**PS — Preliminary Support:** first notable buying after a long decline; the decline continues', 'y'], [2, 'PS volume often expands; spread may widen', 'a'], [3, '**SC — Selling Climax:** wide-spread, high-volume decline, often with a long lower tail'], [4, 'SC low often becomes the **lower range boundary**', 'c'], [5, '**Alternative:** a high-volume drop may simply be continuation', 'x']], note: { at: 6, c: 'r', label: 'Limitation', text: 'A "climax" can only be suspected in real time. It is confirmed by what happens next — the AR and ST.' } },
      say: [
        ['Let us start with Phase A. The first event is Preliminary Support, or P S.', 'Mari kita mulakan dengan Fasa A. Peristiwa pertama ialah Preliminary Support, atau PS.'],
        ['P S is the first notable buying after a long decline. Price may bounce, but the decline usually continues.', 'PS ialah belian ketara pertama selepas penurunan yang panjang. Harga mungkin melantun, tetapi penurunan biasanya berterusan.'],
        ['Volume often expands at P S, and the spread may widen.', 'Volume selalunya meningkat pada PS, dan spread mungkin melebar.'],
        ['Next is the Selling Climax, or S C. It is typically a wide-spread, high-volume decline, often with a long lower tail.', 'Seterusnya ialah Selling Climax, atau SC. Ia lazimnya penurunan dengan spread lebar dan volume tinggi, selalunya dengan ekor bawah yang panjang.'],
        ['The S C low often becomes the lower boundary of the trading range.', 'Low SC selalunya menjadi sempadan bawah trading range.'],
        ['The alternative interpretation: a high-volume drop may simply be a continuation of the downtrend.', 'Interpretasi alternatif: penurunan dengan volume tinggi mungkin sekadar kesinambungan downtrend.'],
        ['So a climax can only be suspected in real time. It is supported by what happens next: the automatic rally and the secondary test.', 'Jadi climax hanya boleh disyaki secara masa nyata. Ia disokong oleh apa yang berlaku seterusnya: automatic rally dan secondary test.'],
      ],
    },
    {
      tpl: 'viz', label: 'AR and ST', viz: sch('acc', [0, 0, 1, 3, 5]),
      info: { k: '3.3 · PHASE A → B', h: 'AR and ST', b: [[1, '**AR — Automatic Rally:** sharp rebound after the SC as selling pressure eases', 'c'], [2, 'AR high often marks the **upper range boundary**', 'c'], [3, '**ST — Secondary Test:** price revisits the SC area', 'y'], [4, 'An ST on **lower volume and narrower spread** than the SC may suggest reduced supply', 'a'], [5, 'Several STs may occur in Phase B', 'y']], note: { at: 6, c: 'r', label: 'Alternative', text: 'If the ST shows heavy volume and closes weakly below the SC, supply may still be dominant.' } },
      say: [
        ['After the Selling Climax comes the Automatic Rally, or A R.', 'Selepas Selling Climax datang Automatic Rally, atau AR.'],
        ['The A R is a sharp rebound, as intense selling pressure eases. Short covering may also contribute.', 'AR ialah lantunan yang tajam, apabila tekanan jualan yang kuat reda. Penutupan posisi short juga mungkin menyumbang.'],
        ['The A R high often marks the upper boundary of the trading range. Together, the S C and A R define the range.', 'High AR selalunya menandakan sempadan atas trading range. Bersama-sama, SC dan AR menentukan range itu.'],
        ['Then comes the Secondary Test, or S T, where price revisits the area of the Selling Climax.', 'Kemudian datang Secondary Test, atau ST, di mana harga kembali ke kawasan Selling Climax.'],
        ['If the S T shows lower volume and a narrower spread than the S C, this may suggest that supply has reduced.', 'Jika ST menunjukkan volume lebih rendah dan spread lebih sempit berbanding SC, ini mungkin menunjukkan supply telah berkurangan.'],
        ['Several secondary tests may occur during Phase B, as the cause is built.', 'Beberapa secondary test mungkin berlaku semasa Fasa B, ketika cause dibina.'],
        ['The alternative: if the S T shows heavy volume and closes weakly below the S C, supply may still be dominant.', 'Alternatifnya: jika ST menunjukkan volume yang berat dan ditutup lemah di bawah SC, supply mungkin masih menguasai.'],
      ],
    },
    {
      tpl: 'viz', label: 'Spring and Test', viz: sch('acc', [0, 0, 0, 0, 0, 1, 4]),
      info: { k: '3.4 · PHASE C', h: 'Spring and Test', b: [[1, '**Spring:** price moves below range support, then returns inside the range', 'g'], [2, 'It tests whether supply remains below support', 'g'], [3, 'Volume varies: low volume may suggest little supply; high volume needs a successful test', 'a'], [4, '**Test:** a later revisit of the Spring area, ideally on lower volume, holding above the Spring low', 'g'], [5, 'Accumulation can also occur **without** a Spring', 'x']], note: { at: 6, c: 'r', label: 'Limitation', text: 'A Spring that fails to recover quickly may become a genuine breakdown. A Spring is not a guaranteed reversal.' } },
      say: [
        ['Phase C contains the Spring.', 'Fasa C mengandungi Spring.'],
        ['In a Spring, price moves below the support of the trading range, and then returns inside the range.', 'Dalam Spring, harga bergerak di bawah support trading range, dan kemudian kembali ke dalam range.'],
        ['Its purpose, in Wyckoff terms, is to test whether meaningful supply remains below support.', 'Tujuannya, dalam istilah Wyckoff, ialah menguji sama ada supply yang ketara masih wujud di bawah support.'],
        ['Volume on a Spring varies. Low volume may suggest little supply. A high-volume Spring usually needs a successful test afterwards.', 'Volume pada Spring berbeza-beza. Volume rendah mungkin menunjukkan supply yang sedikit. Spring dengan volume tinggi biasanya memerlukan test yang berjaya selepas itu.'],
        ['The Test is a later revisit of the Spring area, ideally on lower volume, holding above the Spring low.', 'Test ialah lawatan semula ke kawasan Spring, sebaiknya dengan volume lebih rendah, dan bertahan di atas low Spring.'],
        ['Also note: accumulation can occur without a Spring. Not every accumulation range has one.', 'Perhatikan juga: accumulation boleh berlaku tanpa Spring. Bukan setiap range accumulation mempunyainya.'],
        ['And a Spring that fails to recover may become a genuine breakdown. A Spring is not a guaranteed reversal.', 'Dan Spring yang gagal pulih mungkin menjadi breakdown yang sebenar. Spring bukan jaminan pembalikan.'],
      ],
    },
    {
      tpl: 'viz', label: 'SOS and LPS', viz: sch('acc', [0, 0, 0, 0, 0, 0, 0, 1, 3, 5]),
      info: { k: '3.5 · PHASES D–E', h: 'SOS and LPS', b: [[1, '**SOS — Sign of Strength:** advance on expanding spread and volume toward or above resistance', 'g'], [2, 'Shows demand may now be in control', 'g'], [3, '**LPS — Last Point of Support:** a pullback after the SOS that holds higher, often on reduced volume', 'g'], [4, 'An LPS may hold above former resistance — sometimes called a **backup (BU)**', 'c'], [5, 'LPS levels are possible areas for planned long entries', 'y']], note: { at: 6, c: 'r', label: 'Alternative', text: 'If the "SOS" breakout quickly fails back into the range, it may have been a failed breakout — not strength.' } },
      say: [
        ['In Phase D, we look for a Sign of Strength, or S O S.', 'Dalam Fasa D, kita mencari Sign of Strength, atau SOS.'],
        ['An S O S is an advance on expanding spread and volume, toward or above the range resistance.', 'SOS ialah kenaikan dengan spread dan volume yang meningkat, ke arah atau melepasi resistance range.'],
        ['It suggests that demand may now be in control.', 'Ia menunjukkan bahawa demand mungkin kini menguasai.'],
        ['After the S O S comes the Last Point of Support, or L P S: a pullback that holds at a higher level, often on reduced volume.', 'Selepas SOS datang Last Point of Support, atau LPS: pullback yang bertahan pada paras lebih tinggi, selalunya dengan volume yang berkurangan.'],
        ['An L P S may hold above former resistance. This is sometimes called a backup.', 'LPS mungkin bertahan di atas resistance sebelumnya. Ini kadang-kadang dipanggil backup.'],
        ['L P S areas are often where Wyckoff traders plan long entries, with risk defined below the structure.', 'Kawasan LPS selalunya tempat trader Wyckoff merancang entry long, dengan risiko ditetapkan di bawah struktur.'],
        ['The alternative: if the breakout quickly fails back into the range, it may have been a failed breakout, not strength.', 'Alternatifnya: jika breakout cepat gagal dan kembali ke dalam range, ia mungkin breakout yang gagal, bukan kekuatan.'],
      ],
    },
    {
      tpl: 'viz', label: 'Accumulation on a chart',
      viz: {
        type: 'candles', title: 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', tag: 'ACCUMULATION HYPOTHESIS', volH: 110,
        data: { seed: 301, n: 90, way: [[0, 4300], [7, 4205], [9, 4225], [15, 4095], [16, 4070], [20, 4148], [25, 4085], [30, 4128], [36, 4090], [42, 4136], [48, 4092], [54, 4134], [60, 4088], [62, 4078], [64, 4086], [68, 4082], [74, 4172], [78, 4140], [86, 4215], [89, 4205]], noise: 4, wick: 5, vbody: .15,
          ovr: { 16: { o: 4100, h: 4104, l: 4052, c: 4066 }, 20: { h: 4158 }, 63: { o: 4076, h: 4080, l: 4038, c: 4074 }, 68: { o: 4086, h: 4090, l: 4066, c: 4084 } },
          vm: { 7: 1.8, 15: 1.8, 16: 3.4, 17: 1.8, 19: 1.5, 20: 1.6, 25: .75, 63: 1.4, 68: .5, 72: 1.8, 73: 2.0, 74: 2.2, 78: .6, 77: .7 } },
        reveal: [[0, 89, 3]],
        ann: [
          { t: 'hline', p: 4052, i1: 22, i2: 76, c: 'c', label: 'SC LOW 4,052', at: 1, lx: 'l' }, { t: 'hline', p: 4158, i1: 22, i2: 89, c: 'c', label: 'AR HIGH 4,158', at: 1, lx: 'l' },
          { t: 'tag', i: 7, text: 'PS', c: 'y', pos: 'below', at: 1 }, { t: 'tag', i: 16, text: 'SC', c: 'r', pos: 'below', at: 1 }, { t: 'tag', i: 20, text: 'AR', c: 'c', at: 1 }, { t: 'tag', i: 25, text: 'ST', c: 'y', pos: 'below', at: 2 },
          { t: 'vhl', i: [16], c: 'a', at: 1 }, { t: 'vhl', i: [25], c: 'a', at: 2 },
          { t: 'tag', i: 63, text: 'SPRING?', c: 'g', pos: 'below', at: 3 }, { t: 'tag', i: 68, text: 'TEST?', c: 'g', pos: 'below', at: 4 }, { t: 'vhl', i: [68], c: 'a', at: 4 },
          { t: 'tag', i: 74, text: 'SOS?', c: 'g', at: 5 }, { t: 'tag', i: 78, text: 'LPS?', c: 'g', pos: 'below', at: 5 },
        ],
      },
      info: { k: '3.6 · CHART DEMONSTRATION', h: 'Labels with question marks', b: [[1, 'SC: widest spread and highest volume of the decline', 'r'], [2, 'ST: revisits SC area on lower volume', 'y'], [3, 'Possible Spring: trades below 4,052 to 4,038, closes back inside', 'g'], [4, 'Possible Test: holds above the Spring low on low volume', 'g'], [5, 'Possible SOS and LPS develop', 'g']], note: { at: 6, label: 'Why "?"', text: 'In real time, each label is a hypothesis. Only the bars to the left were available when each decision was made.' } },
      say: [
        ['Now let us see how this might look on a hypothetical F C P O chart, with volume.', 'Sekarang mari kita lihat bagaimana ia mungkin kelihatan pada chart FCPO hipotetikal, bersama volume.'],
        ['After a decline, the bar we label S C has the widest spread and the highest volume. Its low, four thousand and fifty-two, becomes support. The automatic rally reaches four thousand one hundred and fifty-eight.', 'Selepas penurunan, bar yang kita labelkan SC mempunyai spread paling lebar dan volume paling tinggi. Low-nya, 4,052, menjadi support. Automatic rally mencapai 4,158.'],
        ['The secondary test revisits the S C area on clearly lower volume.', 'Secondary test kembali ke kawasan SC dengan volume yang jelas lebih rendah.'],
        ['Later, price trades below four thousand and fifty-two to four thousand and thirty-eight, and closes back inside the range. A possible Spring.', 'Kemudian, harga didagangkan di bawah 4,052 hingga 4,038, dan ditutup semula di dalam range. Kemungkinan Spring.'],
        ['A later bar revisits the area on low volume and holds above the Spring low. A possible Test.', 'Bar kemudiannya kembali ke kawasan itu dengan volume rendah dan bertahan di atas low Spring. Kemungkinan Test.'],
        ['Then a possible Sign of Strength develops on expanding volume, followed by a possible Last Point of Support.', 'Kemudian kemungkinan Sign of Strength terbentuk dengan volume yang meningkat, diikuti kemungkinan Last Point of Support.'],
        ['Notice the question marks. In real time, each label is a hypothesis, based only on the bars available at that moment.', 'Perhatikan tanda soal. Secara masa nyata, setiap label ialah hipotesis, berdasarkan hanya bar yang tersedia pada ketika itu.'],
      ],
    },
    {
      tpl: 'cards', label: 'Accumulation · alternatives', kicker: '3.7 · ALTERNATIVE INTERPRETATIONS', h: 'The same range could be something else', cols: 3, top: 190, ch: 300,
      cards: [
        { n: '01', nc: 'red2', t: 'Re-distribution', b: 'A range inside a downtrend that later breaks down. Early bars can look similar to accumulation.', at: 1 },
        { n: '02', nc: 'red2', t: 'Failed Spring', b: 'Price moves below support and does not recover. The "Spring" becomes a breakdown.', at: 2 },
        { n: '03', nc: 'amber', t: 'No clear structure', b: 'Swings overlap, volume is inconclusive. The honest label is "unclear".', at: 3 },
      ],
      note: { at: 4, y: 540, label: 'Professional practice', text: 'Write down the **invalidation** for each hypothesis. Example: "Accumulation hypothesis is invalid if price accepts below the Spring low."' },
      say: [
        ['Before we move on, remember that the same range could be something else.', 'Sebelum kita teruskan, ingat bahawa range yang sama mungkin sesuatu yang lain.'],
        ['It could be re-distribution: a range inside a downtrend that later breaks down. Its early bars can look very similar to accumulation.', 'Ia mungkin re-distribution: range dalam downtrend yang kemudiannya pecah ke bawah. Bar awalnya boleh kelihatan sangat serupa dengan accumulation.'],
        ['The Spring could fail, and become a genuine breakdown.', 'Spring itu boleh gagal, dan menjadi breakdown yang sebenar.'],
        ['Or there may be no clear structure at all, in which case the honest label is unclear.', 'Atau mungkin tiada struktur yang jelas langsung, dan dalam keadaan itu label yang jujur ialah tidak jelas.'],
        ['Professional practice is to write down the invalidation for each hypothesis. For example: the accumulation hypothesis is invalid if price accepts below the Spring low.', 'Amalan profesional ialah menulis titik pembatalan bagi setiap hipotesis. Contohnya: hipotesis accumulation terbatal jika harga diterima di bawah low Spring.'],
      ],
    },
    {
      tpl: 'viz', label: 'Distribution · phases', viz: sch('dis', [], { dur: 3, phases: [1, 2, 3, 4, 5] }),
      info: { k: '3.8 · DISTRIBUTION', h: 'The mirror structure', b: [[1, '**Phase A:** the uptrend is stopped', 'p'], [2, '**Phase B:** cause is built; supply may increase', 'c'], [3, '**Phase C:** a test of demand — often an UTAD', 'y'], [4, '**Phase D:** supply dominates; price moves toward support', ''], [5, '**Phase E:** price leaves the range — markdown', '']], note: { at: 6, label: 'Note', text: 'Distribution is broadly the mirror of accumulation, but real distribution ranges are often more volatile and irregular.' } },
      say: [
        ['Now the distribution schematic. An advance ends in a trading range, which later resolves downward.', 'Sekarang skematik distribution. Kenaikan berakhir dalam trading range, yang kemudiannya diselesaikan ke bawah.'],
        ['In Phase A, the uptrend is stopped.', 'Dalam Fasa A, uptrend dihentikan.'],
        ['In Phase B, the cause is built, and supply may gradually increase.', 'Dalam Fasa B, cause dibina, dan supply mungkin meningkat secara beransur-ansur.'],
        ['Phase C is a test of remaining demand, often in the form of an Upthrust After Distribution.', 'Fasa C ialah ujian ke atas baki demand, selalunya dalam bentuk Upthrust After Distribution.'],
        ['In Phase D, supply appears to dominate, and price moves toward and below support.', 'Dalam Fasa D, supply kelihatan menguasai, dan harga bergerak ke arah dan menembusi support.'],
        ['And in Phase E, price leaves the range. This is markdown.', 'Dan dalam Fasa E, harga keluar dari range. Ini ialah markdown.'],
        ['Distribution is broadly the mirror of accumulation, but real distribution ranges are often more volatile and irregular.', 'Distribution secara amnya ialah cerminan accumulation, tetapi range distribution sebenar selalunya lebih volatil dan tidak teratur.'],
      ],
    },
    {
      tpl: 'viz', label: 'PSY and BC', viz: sch('dis', [1, 3]),
      info: { k: '3.9 · PHASE A', h: 'PSY and BC', b: [[1, '**PSY — Preliminary Supply:** first notable selling after a long advance; the advance continues', 'y'], [2, 'Volume and spread may expand at PSY', 'a'], [3, '**BC — Buying Climax:** wide-spread, high-volume advance, often with a long upper tail', 'g'], [4, 'BC high often becomes the **upper range boundary**', 'c'], [5, '**Alternative:** a high-volume rally may be continuation', 'x']], note: { at: 6, c: 'r', label: 'Limitation', text: 'Not every high-volume up-bar is a climax. It becomes more likely only if an AR and ST follow.' } },
      say: [
        ['Distribution Phase A begins with Preliminary Supply, or P S Y.', 'Fasa A distribution bermula dengan Preliminary Supply, atau PSY.'],
        ['P S Y is the first notable selling after a long advance. Price may pull back, but the advance usually continues.', 'PSY ialah jualan ketara pertama selepas kenaikan yang panjang. Harga mungkin berundur, tetapi kenaikan biasanya berterusan.'],
        ['Volume and spread may expand at P S Y.', 'Volume dan spread mungkin meningkat pada PSY.'],
        ['Next is the Buying Climax, or B C: a wide-spread, high-volume advance, often with a long upper tail.', 'Seterusnya ialah Buying Climax, atau BC: kenaikan dengan spread lebar dan volume tinggi, selalunya dengan ekor atas yang panjang.'],
        ['The B C high often becomes the upper boundary of the range.', 'High BC selalunya menjadi sempadan atas range.'],
        ['The alternative: a high-volume rally may simply be a continuation of the uptrend.', 'Alternatifnya: kenaikan dengan volume tinggi mungkin sekadar kesinambungan uptrend.'],
        ['Not every high-volume up-bar is a climax. It becomes more likely only if an automatic reaction and secondary test follow.', 'Bukan setiap bar naik dengan volume tinggi ialah climax. Ia menjadi lebih mungkin hanya jika automatic reaction dan secondary test menyusul.'],
      ],
    },
    {
      tpl: 'viz', label: 'AR and ST · distribution', viz: sch('dis', [0, 0, 1, 3]),
      info: { k: '3.10 · PHASE A → B', h: 'AR and ST', b: [[1, '**AR — Automatic Reaction:** sharp decline after the BC as buying eases', 'c'], [2, 'AR low often marks the **lower range boundary**', 'c'], [3, '**ST — Secondary Test:** price revisits the BC area', 'y'], [4, 'An ST on **lower volume and narrower spread** may suggest demand is weakening', 'a']], note: { at: 5, c: 'r', label: 'Alternative', text: 'If the ST advances strongly above the BC on expanding volume and holds, the uptrend may be resuming.' } },
      say: [
        ['After the Buying Climax comes the Automatic Reaction, or A R: a sharp decline as intense buying eases.', 'Selepas Buying Climax datang Automatic Reaction, atau AR: penurunan yang tajam apabila belian yang kuat reda.'],
        ['The A R low often marks the lower boundary of the distribution range.', 'Low AR selalunya menandakan sempadan bawah range distribution.'],
        ['Then the Secondary Test, where price revisits the Buying Climax area.', 'Kemudian Secondary Test, di mana harga kembali ke kawasan Buying Climax.'],
        ['If this test shows lower volume and a narrower spread, demand may be weakening.', 'Jika ujian ini menunjukkan volume lebih rendah dan spread lebih sempit, demand mungkin semakin lemah.'],
        ['The alternative: if price advances strongly above the B C on expanding volume and holds, the uptrend may be resuming.', 'Alternatifnya: jika harga naik dengan kukuh melepasi BC dengan volume yang meningkat dan bertahan, uptrend mungkin bersambung semula.'],
      ],
    },
    {
      tpl: 'viz', label: 'UT and UTAD', viz: sch('dis', [0, 0, 0, 0, 1, 3, 5]),
      info: { k: '3.11 · PHASES B–C', h: 'UT and UTAD', b: [[1, '**UT — Upthrust:** price moves above resistance, then falls back into the range', 'y'], [2, 'An UT may occur in Phase B', 'y'], [3, '**UTAD — Upthrust After Distribution:** a later, Phase C move above resistance that fails', 'r'], [4, 'It tests remaining demand above the range', 'r'], [5, 'A test of the UTAD may follow on lower volume', 'a']], note: { at: 6, c: 'r', label: 'Limitation', text: 'An UTAD is not a confirmed distribution. If price is accepted above resistance, the structure may be re-accumulation.' } },
      say: [
        ['Next, the Upthrust and the Upthrust After Distribution.', 'Seterusnya, Upthrust dan Upthrust After Distribution.'],
        ['An Upthrust, or U T, is a move above resistance that falls back into the range.', 'Upthrust, atau UT, ialah pergerakan melepasi resistance yang jatuh semula ke dalam range.'],
        ['An Upthrust may occur during Phase B.', 'Upthrust mungkin berlaku semasa Fasa B.'],
        ['The Upthrust After Distribution, or U T A D, is a later move above resistance, in Phase C, that fails.', 'Upthrust After Distribution, atau UTAD, ialah pergerakan kemudian melepasi resistance, dalam Fasa C, yang gagal.'],
        ['In Wyckoff terms, it tests whether meaningful demand remains above the range. It is the distribution counterpart of the Spring.', 'Dalam istilah Wyckoff, ia menguji sama ada demand yang ketara masih wujud di atas range. Ia ialah pasangan Spring dalam distribution.'],
        ['A test of the U T A D may follow, ideally on lower volume.', 'Ujian ke atas UTAD mungkin menyusul, sebaiknya dengan volume lebih rendah.'],
        ['An U T A D is not a confirmed distribution. If price is accepted above resistance, the structure may turn out to be re-accumulation.', 'UTAD bukan distribution yang disahkan. Jika harga diterima di atas resistance, struktur itu mungkin sebenarnya re-accumulation.'],
      ],
    },
    {
      tpl: 'viz', label: 'SOW and LPSY', viz: sch('dis', [0, 0, 0, 0, 0, 0, 0, 1, 3, 4]),
      info: { k: '3.12 · PHASES D–E', h: 'SOW and LPSY', b: [[1, '**SOW — Sign of Weakness:** decline on expanding spread and volume toward or below support', ''], [2, 'Suggests supply may now be in control', ''], [3, '**LPSY — Last Point of Supply:** a weak rally after the SOW, often on low volume and narrow spread', ''], [4, 'Several LPSYs may form as markdown begins', ''], [5, 'LPSY levels are possible areas for planned short entries', 'y']], note: { at: 6, c: 'r', label: 'Alternative', text: 'If the "SOW" breakdown is quickly reclaimed and price returns into the range, it may become a Spring-like failure instead.' } },
      say: [
        ['In Phase D, we look for a Sign of Weakness, or S O W.', 'Dalam Fasa D, kita mencari Sign of Weakness, atau SOW.'],
        ['An S O W is a decline on expanding spread and volume, toward or below range support. It suggests supply may now be in control.', 'SOW ialah penurunan dengan spread dan volume yang meningkat, ke arah atau di bawah support range. Ia menunjukkan supply mungkin kini menguasai.'],
        ['The Last Point of Supply, or L P S Y, is a weak rally after the S O W, often on low volume and a narrow spread.', 'Last Point of Supply, atau LPSY, ialah lantunan lemah selepas SOW, selalunya dengan volume rendah dan spread sempit.'],
        ['Several L P S Y rallies may form as markdown begins.', 'Beberapa lantunan LPSY mungkin terbentuk apabila markdown bermula.'],
        ['L P S Y areas are often where Wyckoff traders plan short entries, with risk defined above the structure.', 'Kawasan LPSY selalunya tempat trader Wyckoff merancang entry short, dengan risiko ditetapkan di atas struktur.'],
        ['The alternative: if the breakdown is quickly reclaimed and price returns into the range, the move may instead become a Spring-like failure.', 'Alternatifnya: jika breakdown itu cepat ditebus semula dan harga kembali ke dalam range, pergerakan itu mungkin sebaliknya menjadi kegagalan seperti Spring.'],
      ],
    },
    {
      tpl: 'viz', label: 'Distribution on a chart',
      viz: {
        type: 'candles', title: 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', tag: 'DISTRIBUTION HYPOTHESIS', volH: 110,
        data: { seed: 307, n: 90, way: [[0, 4000], [7, 4110], [9, 4092], [15, 4215], [16, 4240], [20, 4160], [25, 4222], [30, 4180], [36, 4220], [42, 4176], [48, 4224], [54, 4180], [60, 4228], [62, 4236], [64, 4214], [68, 4222], [74, 4135], [78, 4165], [86, 4090], [89, 4100]], noise: 4, wick: 5, vbody: .15,
          ovr: { 16: { o: 4212, h: 4258, l: 4208, c: 4244 }, 20: { l: 4150 }, 63: { o: 4232, h: 4272, l: 4228, c: 4236 }, 78: { h: 4170, l: 4146, c: 4158 } },
          vm: { 7: 1.8, 15: 1.8, 16: 3.4, 17: 1.6, 20: 1.6, 25: .75, 63: 1.7, 68: .5, 72: 1.9, 73: 2.1, 74: 2.3, 78: .55, 77: .6 } },
        reveal: [[0, 89, 3]],
        ann: [
          { t: 'hline', p: 4258, i1: 28, i2: 76, c: 'c', label: 'BC HIGH 4,258', at: 1, lx: 'l' }, { t: 'hline', p: 4150, i1: 28, i2: 89, c: 'c', label: 'AR LOW 4,150', at: 1, lx: 'l' },
          { t: 'tag', i: 7, text: 'PSY', c: 'y', at: 1 }, { t: 'tag', i: 16, text: 'BC', c: 'g', at: 1 }, { t: 'tag', i: 20, text: 'AR', c: 'c', pos: 'below', at: 1 }, { t: 'tag', i: 25, text: 'ST', c: 'y', at: 2 },
          { t: 'vhl', i: [16], c: 'a', at: 1 }, { t: 'vhl', i: [25], c: 'a', at: 2 },
          { t: 'tag', i: 63, text: 'UTAD?', c: 'r', at: 3 }, { t: 'tag', i: 74, text: 'SOW?', c: 'r', pos: 'below', at: 4 }, { t: 'tag', i: 78, text: 'LPSY?', c: 'r', at: 4 }, { t: 'vhl', i: [78], c: 'a', at: 4 },
        ],
      },
      info: { k: '3.13 · CHART DEMONSTRATION', h: 'Distribution hypothesis', b: [[1, 'BC: widest up-bar and highest volume of the advance', 'g'], [2, 'ST: revisits BC area on lower volume', 'y'], [3, 'Possible UTAD: trades above 4,258 to 4,272, closes back inside', ''], [4, 'Possible SOW on expanding volume, then a low-volume LPSY rally', '']], note: { at: 5, label: 'Invalidation', text: 'Distribution hypothesis is invalid if price is accepted above the UTAD high, 4,272.' } },
      say: [
        ['Here is a hypothetical distribution example on F C P O.', 'Ini ialah contoh distribution hipotetikal pada FCPO.'],
        ['After an advance, the bar labelled B C has the widest up-spread and highest volume. Its high, four thousand two hundred and fifty-eight, becomes resistance. The automatic reaction falls to four thousand one hundred and fifty.', 'Selepas kenaikan, bar berlabel BC mempunyai spread naik paling lebar dan volume paling tinggi. High-nya, 4,258, menjadi resistance. Automatic reaction jatuh ke 4,150.'],
        ['The secondary test revisits the B C area on lower volume.', 'Secondary test kembali ke kawasan BC dengan volume lebih rendah.'],
        ['Later, price trades above four thousand two hundred and fifty-eight to four thousand two hundred and seventy-two, and closes back inside. A possible U T A D.', 'Kemudian, harga didagangkan melepasi 4,258 hingga 4,272, dan ditutup semula di dalam range. Kemungkinan UTAD.'],
        ['A possible Sign of Weakness follows on expanding volume, then a weak, low-volume rally: a possible Last Point of Supply.', 'Kemungkinan Sign of Weakness menyusul dengan volume yang meningkat, kemudian lantunan lemah dengan volume rendah: kemungkinan Last Point of Supply.'],
        ['The invalidation is clear. The distribution hypothesis is invalid if price is accepted above the U T A D high, four thousand two hundred and seventy-two.', 'Titik pembatalan adalah jelas. Hipotesis distribution terbatal jika harga diterima di atas high UTAD, 4,272.'],
      ],
    },
    {
      tpl: 'table', label: 'Events compared', kicker: '3.14 · SIDE BY SIDE', h: 'Accumulation and distribution events', cols: ['Role', 'Accumulation', 'Distribution'], widths: [420, 620, 620], hs: 38,
      rows: [
        [1, 'First halt of the trend', 'PS — Preliminary Support', 'PSY — Preliminary Supply'],
        [1, 'Climactic action', 'SC — Selling Climax', 'BC — Buying Climax'],
        [2, 'Reaction defining the range', 'AR — Automatic Rally', 'AR — Automatic Reaction'],
        [2, 'Revisit of the climax', 'ST — Secondary Test', 'ST — Secondary Test'],
        [3, 'Phase C test', 'Spring (+ Test)', 'UTAD (+ Test); UT may occur in Phase B'],
        [4, 'Strength / weakness', 'SOS — Sign of Strength', 'SOW — Sign of Weakness'],
        [4, 'Last reaction', 'LPS — Last Point of Support', 'LPSY — Last Point of Supply'],
      ],
      say: [
        ['Here are both structures side by side.', 'Ini ialah kedua-dua struktur secara bersebelahan.'],
        ['The trend first halts at Preliminary Support or Preliminary Supply, followed by a Selling Climax or a Buying Climax.', 'Trend mula-mula berhenti pada Preliminary Support atau Preliminary Supply, diikuti Selling Climax atau Buying Climax.'],
        ['The Automatic Rally or Automatic Reaction defines the range, and Secondary Tests revisit the climax.', 'Automatic Rally atau Automatic Reaction menentukan range, dan Secondary Test kembali ke kawasan climax.'],
        ['Phase C contains the Spring in accumulation, or the U T A D in distribution.', 'Fasa C mengandungi Spring dalam accumulation, atau UTAD dalam distribution.'],
        ['Then the Sign of Strength or Sign of Weakness, and the Last Point of Support or Last Point of Supply.', 'Kemudian Sign of Strength atau Sign of Weakness, dan Last Point of Support atau Last Point of Supply.'],
      ],
    },
    {
      tpl: 'cards', label: 'Exercises', kicker: 'EXERCISES 1 & 2', h: 'Identify accumulation and distribution structures', cols: 2, top: 180, ch: 360,
      cards: [
        { n: 'EX 1', t: 'Accumulation', b: 'On an FCPO 1H chart, find a range after a decline. Mark candidate SC, AR and ST. Is there a Spring? Note the volume on each event, and write the invalidation level.', at: 1 },
        { n: 'EX 2', t: 'Distribution', b: 'Find a range after an advance. Mark candidate BC, AR and ST. Is there an UT or UTAD? Note the volume, and write the invalidation level.', at: 2 },
      ],
      note: { at: 3, y: 590, c: 'c', label: 'Answer guide', text: 'A good answer uses "possible", records volume relative to nearby bars, states an alternative interpretation, and uses only bars available at each point — no hindsight labels.' },
      say: [
        ['Time for Exercises One and Two.', 'Masa untuk Latihan 1 dan 2.'],
        ['Exercise One: on an F C P O one-hour chart, find a range after a decline. Mark candidate S C, A R and S T, check for a Spring, note the volume, and write the invalidation level.', 'Latihan 1: pada chart FCPO 1 jam, cari range selepas penurunan. Tandakan calon SC, AR dan ST, semak sama ada terdapat Spring, catat volume, dan tulis paras pembatalan.'],
        ['Exercise Two: find a range after an advance. Mark candidate B C, A R and S T, check for an Upthrust or U T A D, note the volume, and write the invalidation level.', 'Latihan 2: cari range selepas kenaikan. Tandakan calon BC, AR dan ST, semak sama ada terdapat Upthrust atau UTAD, catat volume, dan tulis paras pembatalan.'],
        ['A good answer uses the word possible, records volume relative to nearby bars, states an alternative, and avoids hindsight labels.', 'Jawapan yang baik menggunakan perkataan kemungkinan, mencatat volume berbanding bar berdekatan, menyatakan alternatif, dan mengelakkan label hindsight.'],
      ],
    },
    {
      tpl: 'quiz', label: 'Knowledge check', q: 'What is the main difference between accumulation and distribution?',
      opts: ['Accumulation has more volume', 'Accumulation is a range after a decline that may resolve up; distribution is a range after an advance that may resolve down', 'Distribution always has an UTAD', 'Accumulation always has a Spring'], ans: 1, ansAt: 1,
      expl: 'Context and resolution define them. Neither a Spring nor an UTAD is required in every structure.',
      say: [
        ['Knowledge check. What is the main difference between accumulation and distribution?', 'Semakan pengetahuan. Apakah perbezaan utama antara accumulation dan distribution?', { p: 1.5 }],
        ['The answer is B. Accumulation is a range after a decline that may resolve upward; distribution is a range after an advance that may resolve downward. Neither always contains a Spring or an U T A D.', 'Jawapannya ialah B. Accumulation ialah range selepas penurunan yang mungkin diselesaikan ke atas; distribution ialah range selepas kenaikan yang mungkin diselesaikan ke bawah. Kedua-duanya tidak semestinya mengandungi Spring atau UTAD.'],
      ],
    },
    {
      tpl: 'summary', label: 'Summary', h: 'Accumulation & distribution — what to remember',
      items: [[0, 'Accumulation: PS, SC, AR, ST, Spring, Test, SOS, LPS'], [1, 'Distribution: PSY, BC, AR, ST, UT, UTAD, SOW, LPSY'], [2, 'Five phases A–E in both schematics'], [3, 'Climaxes are confirmed by what follows'], [4, 'Springs and UTADs can fail'], [5, 'Every label in real time is a hypothesis', 'w'], [6, 'Always write the invalidation level', 'w'], [7, 'Real markets rarely match the schematic', 'w']],
      say: [
        ['To summarise. The accumulation events are P S, S C, A R, S T, Spring, Test, S O S and L P S.', 'Sebagai rumusan. Peristiwa accumulation ialah PS, SC, AR, ST, Spring, Test, SOS dan LPS.'],
        ['The distribution events are P S Y, B C, A R, S T, U T, U T A D, S O W and L P S Y.', 'Peristiwa distribution ialah PSY, BC, AR, ST, UT, UTAD, SOW dan LPSY.'],
        ['Both schematics use five phases, A to E.', 'Kedua-dua skematik menggunakan lima fasa, A hingga E.'],
        ['A climax is supported by what follows it.', 'Climax disokong oleh apa yang menyusul selepasnya.'],
        ['Springs and U T A Ds can fail.', 'Spring dan UTAD boleh gagal.'],
        ['In real time, every label is a hypothesis.', 'Secara masa nyata, setiap label ialah hipotesis.'],
        ['Always write down the invalidation level.', 'Sentiasa tulis paras pembatalan.'],
        ['And real markets rarely match the schematic.', 'Dan pasaran sebenar jarang sepadan dengan skematik.'],
      ],
    },
    {
      tpl: 'next', label: 'Next', kicker: 'UP NEXT · SUBTOPIC 1', h: 'Where Wyckoff meets SMC',
      chips: [[0, 'Spring vs sweep', 'Related, but not interchangeable'], [0, 'Mapping table', 'Trading range, UT, SOS/SOW, LPS/LPSY'], [0, 'Integration', 'Bullish and bearish demonstrations']],
      nk: 'NEXT · VIDEO 04', nt: 'SMC + Wyckoff Integration', nAt: 1, ny: 420,
      say: [
        ['In Video Four, we connect Wyckoff with S M C, starting with the most important comparison: the Wyckoff Spring versus the S M C liquidity sweep.', 'Dalam Video 4, kita menghubungkan Wyckoff dengan SMC, bermula dengan perbandingan paling penting: Wyckoff Spring berbanding SMC liquidity sweep.'],
        ['We will build a mapping table, and integrated bullish and bearish demonstrations.', 'Kita akan membina jadual pemetaan, serta demonstrasi bullish dan bearish yang bersepadu.'],
      ],
    },
    {
      tpl: 'disclaimer', label: 'Disclaimer', text: 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.',
      small: 'Semua harga FCPO dalam video ini ialah ilustrasi hipotetikal. Skematik berdasarkan rujukan Wyckoff yang mantap (cth. StockCharts — The Wyckoff Method: A Tutorial).', foot: 'Seterusnya: Video 04 — SMC + Wyckoff Integration',
      say: [['For educational purposes only. This is not financial advice or a guarantee of profit. Futures trading involves risk of loss.', 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Dagangan futures melibatkan risiko kerugian.']],
    },
  ],
});
