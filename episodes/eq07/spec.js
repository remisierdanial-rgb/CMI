/* CMI Equity Series — VIDEO 07: Sokongan dan Rintangan
 * `en` = English narration (spoken) · `t` = Bahasa Melayu subtitle. On-screen text in BM.
 * All charts ILLUSTRATIVE. Support/resistance = zones of interest, never guaranteed to hold.
 */
(function () {
  const EQ = typeof window !== 'undefined' && window.EQ ? window.EQ : require('../_eqlib.js');
  const AMB = '#e8b44c', BULL = '#26a69a', BEAR = '#ef5350', BLUE = '#5b8def', POI = '#8b7cf6', DIM = '#5f6e86';
  const mk = (wp, seed, ws, noise = .006, wick = .012) => EQ.swingify(EQ.ohlc(EQ.path(wp, seed, noise), ws, wick), wp);

  // range with repeated reactions (R zone 2.47–2.53, S zone 2.27–2.33)
  const SRW = [[0, 2.38], [4, 2.49], [8, 2.31], [12, 2.50], [16, 2.30], [20, 2.49], [24, 2.31], [28, 2.48], [31, 2.40]];
  const SR = mk(SRW, 81, 11);
  // breakout → retest (resistance becomes support)
  const BOW = [[0, 2.33], [4, 2.48], [8, 2.33], [12, 2.48], [15, 2.38], [18, 2.47], [20, 2.60], [23, 2.53], [27, 2.68]];
  const BO = mk(BOW, 82, 12); BO[19] = [2.47, 2.56, 2.46, 2.55]; BO[20] = [2.55, 2.61, 2.54, 2.60];
  // breakdown → retest (support becomes resistance)
  const BDW = BOW.map(([i, p]) => [i, +(4.80 - p).toFixed(2)]);
  const BD = mk(BDW, 83, 13); BD[19] = [2.33, 2.34, 2.24, 2.25]; BD[20] = [2.25, 2.26, 2.19, 2.20];
  // false breakout / false breakdown
  const FBW = [[0, 2.34], [4, 2.48], [8, 2.33], [12, 2.48], [15, 2.39], [17, 2.47], [18, 2.54], [19, 2.45], [24, 2.32]];
  const FB = mk(FBW, 84, 14); FB[18] = [2.47, 2.57, 2.46, 2.54]; FB[19] = [2.54, 2.55, 2.44, 2.45];
  const FDW = FBW.map(([i, p]) => [i, +(4.80 - p).toFixed(2)]);
  const FD = mk(FDW, 85, 15); FD[18] = [2.33, 2.34, 2.23, 2.26]; FD[19] = [2.26, 2.36, 2.25, 2.35];

  const EPISODE = {
    id: 'eq07', ...EQ.header(7, 'Sokongan & Rintangan'), _data: { SR, BO, BD, FB, FD },
    scenes: [
      EQ.introScene(),
      /* 1 · HOOK */
      {
        label: 'HOOK', hold: .6,
        cues: [
          { en: 'Why does a share price sometimes rise to a certain area, and then turn back?', t: 'Kenapa harga saham kadangkala naik sampai satu kawasan tertentu, kemudian berpatah balik?' },
          { en: 'Is there something special about that area?', t: 'Adakah kawasan tersebut mempunyai sesuatu yang istimewa?' }
        ],
        build(S, C) {
          const ch = S.chart({ name: 'eq07-hook', x: 160, y: 130, w: 1600, h: 520, candles: SR, yMin: 2.18, yMax: 2.62, step: .05, dp: 2, slots: 34, title: 'SAHAM A · HARIAN · ILUSTRASI', at: S.at(0, -.2) });
          ch.reveal(21, S.at(0, .2), .16);
          [4, 12, 20].forEach((i, n) => ch.marker({ i, p: SR[i][1], c: AMB, at: S.at(0, 1 + n * 1.1) }));
          ch.zone({ p1: 2.47, p2: 2.53, from: 2, to: 'end', c: AMB, fo: .08, dash: true, label: '?', at: S.at(1, .3) });
        }
      },
      /* 2 · PENGENALAN */
      {
        label: 'PENGENALAN',
        cues: [
          { en: 'In this video, we look at the price areas that buyers and sellers often pay attention to.', t: 'Dalam video ini, kita lihat kawasan harga yang sering menjadi perhatian pembeli dan penjual.' },
          { en: 'First, what support and resistance are, and why they form.', t: 'Pertama, apa itu support dan resistance, dan kenapa ia terbentuk.' },
          { en: 'Second, why they are better seen as zones, not exact lines.', t: 'Kedua, kenapa ia lebih tepat dilihat sebagai zon, bukan garisan tepat.' },
          { en: 'And third, breakouts, breakdowns, false breaks, and role reversal.', t: 'Dan ketiga, breakout, breakdown, false break, dan role reversal.' }
        ],
        build(S, C) {
          EQ.titleScene(S, C, {
            kicker: 'VIDEO 07 · MODUL 2 · ASAS MEMBACA CARTA', title: 'Sokongan dan Rintangan', size: 84,
            lead: 'Support · Resistance · Zon · Breakout · False break · Role reversal', leadY: 290,
            objectives: ['Maksud & sebab support dan resistance', 'Support & resistance sebagai zon', 'Breakout, false break & role reversal'],
            ats: [S.at(1), S.at(2), S.at(3)]
          });
          const p = S.el('', { x: 1240, y: 400, w: 580, h: 300, cls: 'panel' }, { at: S.at(0, 1) });
          S.el(`<div style="position:absolute;left:30px;right:30px;top:50px;height:50px;background:${BEAR}22;border:1.5px dashed ${BEAR}aa;border-radius:4px"></div><div class="lbl" style="position:absolute;left:40px;top:24px;color:${BEAR}">RESISTANCE</div>
            <div style="position:absolute;left:30px;right:30px;top:200px;height:50px;background:${BULL}22;border:1.5px dashed ${BULL}aa;border-radius:4px"></div><div class="lbl" style="position:absolute;left:40px;top:262px;color:${BULL}">SUPPORT</div>`, { x: 0, y: 0, w: 580, h: 300, parent: p });
        }
      },
      /* 3 · DEFINISI */
      {
        label: 'SUPPORT & RESISTANCE', hold: .5,
        cues: [
          { en: 'Support is a price area where falling prices have tended to stop, because buying interest increased there.', t: 'Support ialah kawasan harga di mana harga yang jatuh cenderung berhenti, kerana minat membeli meningkat di situ.' },
          { en: 'Resistance is a price area where rising prices have tended to stall, because selling interest increased there.', t: 'Resistance ialah kawasan harga di mana harga yang naik cenderung terhenti, kerana minat menjual meningkat di situ.' },
          { en: 'On this chart, price reacted several times near the same areas — below as support, and above as resistance.', t: 'Pada carta ini, harga bertindak balas beberapa kali berhampiran kawasan yang sama — di bawah sebagai support, dan di atas sebagai resistance.' },
          { en: 'Notice the words "have tended to". These areas describe past behaviour. They are not guaranteed to hold.', t: 'Perhatikan perkataan "cenderung". Kawasan ini menerangkan tingkah laku lalu. Ia tidak dijamin akan bertahan.' }
        ],
        build(S, C) {
          EQ.heading(S, 'DEFINISI', 'Support di bawah, resistance di atas', S.at(0, -.3));
          const ch = S.chart({ name: 'eq07-def', x: 60, y: 160, w: 1800, h: 480, candles: SR, yMin: 2.18, yMax: 2.62, step: .05, dp: 2, slots: 36, title: 'SAHAM A · HARIAN · ILUSTRASI', at: S.at(0) });
          ch.reveal(31, S.at(0, .3), .1);
          ch.zone({ p1: 2.27, p2: 2.33, from: 2, to: 'end', c: BULL, label: 'SUPPORT · MINAT MEMBELI', lpos: 'below', at: S.at(0, 2.5) });
          ch.zone({ p1: 2.47, p2: 2.53, from: 2, to: 'end', c: BEAR, label: 'RESISTANCE · MINAT MENJUAL', at: S.at(1, 1) });
          [8, 16, 24].forEach((i, n) => ch.marker({ i, p: SR[i][2], c: BULL, pos: 'below', at: S.at(2, .6 + n * .4) }));
          [4, 12, 20, 28].forEach((i, n) => ch.marker({ i, p: SR[i][1], c: BEAR, at: S.at(2, 2 + n * .4) }));
          ch.setTitleR(`<span style="color:${AMB}">TINGKAH LAKU LALU · TIDAK DIJAMIN</span>`, S.at(3, .5));
        }
      },
      /* 4 · KENAPA BERLAKU */
      {
        label: 'KENAPA BERLAKU', hold: .5,
        cues: [
          { en: 'Why do these areas form? There are a few common reasons.', t: 'Kenapa kawasan ini terbentuk? Ada beberapa sebab biasa.' },
          { en: 'Market memory: many participants remember where price turned before, and act again near that level.', t: 'Ingatan pasaran: ramai peserta ingat di mana harga berpatah sebelum ini, dan bertindak semula berhampiran paras itu.' },
          { en: 'Orders tend to cluster around those areas — and around round numbers, such as two ringgit fifty.', t: 'Pesanan cenderung berkumpul di sekitar kawasan tersebut — dan di sekitar nombor bulat, seperti RM2.50.' },
          { en: 'And emotions play a part: buyers who missed a move may wait for a lower price, while holders may sell to take profit or to break even.', t: 'Dan emosi turut berperanan: pembeli yang terlepas mungkin menunggu harga lebih rendah, manakala pemegang mungkin menjual untuk ambil untung atau pulang modal.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PSIKOLOGI PASARAN', 'Kenapa support dan resistance terbentuk', S.at(0, -.3));
          [['eye', 'Ingatan pasaran', 'HARGA PERNAH BERPATAH DI SINI', S.at(1)], ['target', 'Pesanan berkumpul', 'BELI & JUAL PADA PARAS SAMA', S.at(2)], ['coins', 'Nombor bulat', 'CONTOH: RM2.50 · RM3.00', S.at(2, 3)], ['users', 'Emosi peserta', 'TERLEPAS · AMBIL UNTUNG · PULANG MODAL', S.at(3)]].forEach((r, i) =>
            EQ.card(S, { x: 60 + (i % 2) * 910, y: 165 + Math.floor(i / 2) * 225, w: 880, h: 200, icon: r[0], t: r[1], s: r[2], top: true, fs: 30, at: r[3] }));
        }
      },
      /* 5 · ZON */
      {
        label: 'ZON, BUKAN GARISAN', hold: .6,
        cues: [
          { en: 'A common mistake is to treat support or resistance as one exact price.', t: 'Satu kesilapan biasa ialah menganggap support atau resistance sebagai satu harga yang tepat.' },
          { en: 'Look closely: price reacts near the area, but the turning points are rarely identical. Wicks often poke through a single line.', t: 'Lihat dengan teliti: harga bertindak balas berhampiran kawasan itu, tetapi titik pusingan jarang sama. Wick sering menembusi satu garisan.' },
          { en: "That's why it is more realistic to mark a zone — a band of prices.", t: 'Sebab itu, lebih realistik untuk menandakan zon — satu jalur harga.' },
          { en: 'Previous swing highs and swing lows are useful references for drawing these zones.', t: 'Swing high dan swing low sebelum ini ialah rujukan berguna untuk melukis zon ini.' }
        ],
        build(S, C) {
          EQ.heading(S, 'CARA MELIHAT', 'Zon, bukan satu garisan tepat', S.at(0, -.3));
          const ch = S.chart({ name: 'eq07-zone', x: 60, y: 160, w: 1800, h: 480, candles: SR, yMin: 2.18, yMax: 2.62, step: .05, dp: 2, slots: 36, title: 'ILUSTRASI', at: S.at(0, -.2) });
          ch.reveal(31, S.at(0, .1), .04);
          ch.hline({ p: 2.50, from: 2, c: DIM, label: 'SATU GARISAN 2.50', solid: true, at: S.at(0, 1.5), until: S.at(2, .4) });
          [4, 12, 20, 28].forEach((i, n) => ch.label({ i, p: SR[i][1] + .025, t: SR[i][1].toFixed(2), c: AMB, at: S.at(1, 1.5 + n * .5), until: S.at(2, .4) }));
          ch.zone({ p1: 2.47, p2: 2.53, from: 2, to: 'end', c: BEAR, label: 'ZON RESISTANCE 2.47–2.53', lx: 'right', at: S.at(2, .6) });
          ch.zone({ p1: 2.27, p2: 2.33, from: 2, to: 'end', c: BULL, label: 'ZON SUPPORT 2.27–2.33', lpos: 'below', at: S.at(2, 1.4) });
          [4, 12, 20, 28].forEach((i, n) => ch.marker({ i, p: SR[i][1], c: BEAR, t: 'SH', fs: 16, at: S.at(3, .3 + n * .3) }));
          [8, 16, 24].forEach((i, n) => ch.marker({ i, p: SR[i][2], c: BULL, t: 'SL', fs: 16, pos: 'below', at: S.at(3, .5 + n * .3) }));
        }
      },
      /* 6 · BREAKOUT & BREAKDOWN */
      {
        label: 'BREAKOUT & BREAKDOWN', hold: .6,
        cues: [
          { en: 'Zones do not hold forever.', t: 'Zon tidak bertahan selamanya.' },
          { en: 'A breakout happens when price moves and closes clearly above a resistance zone.', t: 'Breakout berlaku apabila harga bergerak dan ditutup dengan jelas di atas zon resistance.' },
          { en: 'A breakdown happens when price moves and closes clearly below a support zone.', t: 'Breakdown berlaku apabila harga bergerak dan ditutup dengan jelas di bawah zon support.' },
          { en: 'A break shows that the balance between buyers and sellers has shifted — at least for now.', t: 'Penembusan menunjukkan bahawa keseimbangan antara pembeli dan penjual telah berubah — sekurang-kurangnya buat masa ini.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PENEMBUSAN ZON', 'Breakout dan breakdown', S.at(0, -.3));
          const a = S.chart({ name: 'eq07-bo', x: 60, y: 160, w: 880, h: 480, candles: BO, yMin: 2.20, yMax: 2.74, step: .1, dp: 2, slots: 30, title: 'BREAKOUT · ILUSTRASI', at: S.at(0) });
          const b = S.chart({ name: 'eq07-bd', x: 980, y: 160, w: 880, h: 480, candles: BD, yMin: 2.06, yMax: 2.60, step: .1, dp: 2, slots: 30, title: 'BREAKDOWN · ILUSTRASI', at: S.at(0) });
          a.zone({ p1: 2.46, p2: 2.50, from: 1, to: 'end', c: BEAR, label: 'RESISTANCE', at: S.at(0, .4) });
          b.zone({ p1: 2.30, p2: 2.34, from: 1, to: 'end', c: BULL, label: 'SUPPORT', lpos: 'below', at: S.at(0, .4) });
          a.reveal(18, S.at(0, .2), .05); b.reveal(18, S.at(0, .2), .05);
          a.reveal(21, S.at(1, .4), .5); a.candleHL({ i1: 19, i2: 20, p1: 2.45, p2: 2.62, c: BULL, t: 'BREAKOUT', at: S.at(1, 1.8) });
          b.reveal(21, S.at(2, .4), .5); b.candleHL({ i1: 19, i2: 20, p1: 2.18, p2: 2.35, c: BEAR, t: 'BREAKDOWN', below: true, at: S.at(2, 1.8) });
        }
      },
      /* 7 · FALSE BREAK */
      {
        label: 'FALSE BREAKOUT & BREAKDOWN', hold: .8,
        cues: [
          { en: 'But not every break holds.', t: 'Tetapi bukan setiap penembusan bertahan.' },
          { en: 'In a false breakout, price moves above resistance, then quickly falls back inside the range.', t: 'Dalam false breakout, harga bergerak di atas resistance, kemudian cepat jatuh semula ke dalam julat.' },
          { en: 'In a false breakdown, price dips below support, then quickly recovers back above it.', t: 'Dalam false breakdown, harga jatuh di bawah support, kemudian cepat pulih semula di atasnya.' },
          { en: 'That is why not every breakout is a buying opportunity, and not every breakdown is a reason to sell.', t: 'Sebab itu, bukan setiap breakout ialah peluang membeli, dan bukan setiap breakdown ialah sebab untuk menjual.' }
        ],
        build(S, C) {
          EQ.heading(S, 'PENEMBUSAN PALSU', 'False breakout dan false breakdown', S.at(0, -.3));
          const a = S.chart({ name: 'eq07-fb', x: 60, y: 160, w: 880, h: 480, candles: FB, yMin: 2.22, yMax: 2.64, step: .1, dp: 2, slots: 27, title: 'FALSE BREAKOUT · ILUSTRASI', at: S.at(0) });
          const b = S.chart({ name: 'eq07-fd', x: 980, y: 160, w: 880, h: 480, candles: FD, yMin: 2.16, yMax: 2.58, step: .1, dp: 2, slots: 27, title: 'FALSE BREAKDOWN · ILUSTRASI', at: S.at(0) });
          a.zone({ p1: 2.46, p2: 2.50, from: 1, to: 'end', c: BEAR, label: 'RESISTANCE', at: S.at(0, .4) });
          b.zone({ p1: 2.30, p2: 2.34, from: 1, to: 'end', c: BULL, label: 'SUPPORT', lpos: 'below', at: S.at(0, .4) });
          a.reveal(17, S.at(0, .2), .05); b.reveal(17, S.at(0, .2), .05);
          a.reveal(18, S.at(1, .5), .1); a.reveal(24, S.at(1, 2.2), .3);
          a.candleHL({ i1: 18, i2: 19, p1: 2.43, p2: 2.58, c: AMB, t: 'KEMBALI KE DALAM JULAT', at: S.at(1, 3) });
          b.reveal(18, S.at(2, .5), .1); b.reveal(24, S.at(2, 2.2), .3);
          b.candleHL({ i1: 18, i2: 19, p1: 2.22, p2: 2.37, c: AMB, t: 'PULIH SEMULA', below: true, at: S.at(2, 3) });
          EQ.chip(S, 'BREAKOUT ≠ SEMESTINYA PELUANG BELI · BREAKDOWN ≠ SEMESTINYA JUAL', 60, 665, BEAR, S.at(3, .3));
        }
      },
      /* 8 · ROLE REVERSAL */
      {
        label: 'ROLE REVERSAL', hold: .8,
        cues: [
          { en: 'After a genuine break, something interesting can happen: the zone can switch roles.', t: 'Selepas penembusan sebenar, sesuatu yang menarik boleh berlaku: zon itu boleh bertukar peranan.' },
          { en: 'Old resistance can become new support. Price breaks out, pulls back to the old resistance zone, and finds buyers there.', t: 'Resistance lama boleh menjadi support baharu. Harga breakout, kembali ke zon resistance lama, dan menemui pembeli di situ.' },
          { en: 'Likewise, old support can become new resistance after a breakdown.', t: 'Begitu juga, support lama boleh menjadi resistance baharu selepas breakdown.' },
          { en: 'This is called role reversal. Like everything in technical analysis, it is a tendency — not a rule.', t: 'Ini dipanggil role reversal. Seperti semua perkara dalam analisis teknikal, ia ialah kecenderungan — bukan peraturan.' }
        ],
        build(S, C) {
          EQ.heading(S, 'ROLE REVERSAL', 'Resistance ⇄ support', S.at(0, -.3));
          const a = S.chart({ name: 'eq07-rr1', x: 60, y: 160, w: 880, h: 480, candles: BO, yMin: 2.20, yMax: 2.74, step: .1, dp: 2, slots: 30, title: 'RESISTANCE → SUPPORT · ILUSTRASI', at: S.at(0) });
          const b = S.chart({ name: 'eq07-rr2', x: 980, y: 160, w: 880, h: 480, candles: BD, yMin: 2.06, yMax: 2.60, step: .1, dp: 2, slots: 30, title: 'SUPPORT → RESISTANCE · ILUSTRASI', at: S.at(0) });
          a.reveal(21, S.at(0, .2), .04); b.reveal(21, S.at(0, .2), .04);
          a.zone({ p1: 2.46, p2: 2.50, from: 1, to: 19, c: BEAR, label: 'RESISTANCE LAMA', at: S.at(0, .5) });
          b.zone({ p1: 2.30, p2: 2.34, from: 1, to: 19, c: BULL, label: 'SUPPORT LAMA', lpos: 'below', at: S.at(0, .5) });
          a.reveal(27, S.at(1, 1), .4); a.zone({ p1: 2.46, p2: 2.53, from: 19, to: 'end', c: BULL, label: 'SUPPORT BAHARU', lpos: 'below', lx: 'right', at: S.at(1, 2.5) });
          a.marker({ i: 23, p: BO[23][2], c: BULL, pos: 'below', at: S.at(1, 3.4) });
          b.reveal(27, S.at(2, .4), .4); b.zone({ p1: 2.27, p2: 2.34, from: 19, to: 'end', c: BEAR, label: 'RESISTANCE BAHARU', lx: 'right', at: S.at(2, 2) });
          b.marker({ i: 23, p: BD[23][1], c: BEAR, at: S.at(2, 2.8) });
          EQ.chip(S, 'KECENDERUNGAN · BUKAN PERATURAN', 760, 665, AMB, S.at(3, 1));
        }
      },
      /* 9 · RUMUSAN */
      {
        label: 'RUMUSAN', hold: .6,
        cues: [
          { en: "Let's recap.", t: 'Mari kita rumuskan.' },
          { en: 'Support is where falling prices have tended to stop. Resistance is where rising prices have tended to stall.', t: 'Support ialah tempat harga jatuh cenderung berhenti. Resistance ialah tempat harga naik cenderung terhenti.' },
          { en: 'Treat them as zones, using previous swing highs and lows as references.', t: 'Anggap ia sebagai zon, menggunakan swing high dan low sebelumnya sebagai rujukan.' },
          { en: 'Breaks can be genuine or false — and after a genuine break, roles can reverse.', t: 'Penembusan boleh jadi sebenar atau palsu — dan selepas penembusan sebenar, peranan boleh bertukar.' },
          { en: 'None of these levels are guaranteed to hold.', t: 'Tiada satu pun paras ini dijamin bertahan.' }
        ],
        build(S, C) {
          EQ.keyPoints(S, C, 'Support & resistance — apa yang perlu diingat', [
            'Support = minat membeli', 'Resistance = minat menjual', 'Gunakan zon, bukan satu harga',
            'Breakout & breakdown boleh palsu', 'Role reversal: peranan zon bertukar', 'Tiada paras yang dijamin'
          ], [S.at(1), S.at(1, 2.5), S.at(2), S.at(3), S.at(3, 2.5), S.at(4)]);
          S.el(`<div class="statement" style="font-size:40px;text-align:center">Support & resistance ialah <span style="color:${AMB}">zon perhatian</span>, bukan dinding.</div>`, { x: 60, y: 560, w: 1800 }, { at: S.at(4, .8) });
        }
      },
      /* 10 · SIRI */
      {
        label: 'PENUTUP',
        cues: [
          { en: 'We have seen how price moves. But how much activity is behind each move?', t: 'Kita telah lihat bagaimana harga bergerak. Tetapi berapa banyak aktiviti di sebalik setiap pergerakan?' },
          { en: 'In the final video, we look at volume — and why it matters.', t: 'Dalam video terakhir, kita lihat volume — dan kenapa ia penting.' }
        ],
        build(S, C) { EQ.seriesScene(S, C, 7, [S.at(0), S.at(1)]); }
      },
      /* 11 · RUJUKAN */
      {
        label: 'RUJUKAN', hold: 2.2,
        cues: [{ en: 'The references for this video are shown on screen. Always check official sources for the latest information.', t: 'Rujukan untuk video ini dipaparkan di skrin. Sentiasa semak sumber rasmi untuk maklumat terkini.' }],
        build(S, C) {
          EQ.refsScene(S, C, [
            { t: 'CMT Association — CMT Program curriculum: support, resistance & breakouts', tag: 'S/R' },
            { t: 'John J. Murphy — Technical Analysis of the Financial Markets (Ch. 4: support & resistance, role reversal)', tag: 'Role reversal' },
            { t: 'Edwards, Magee & Bassetti — Technical Analysis of Stock Trends', tag: 'Zon & penembusan' },
            { t: 'Thomas N. Bulkowski — Encyclopedia of Chart Patterns (breakout failure rates)', tag: 'False break' },
            { t: 'Bursa Malaysia — Bursa Academy: introduction to technical analysis', tag: 'Pendidikan pelabur' }
          ], S.at(0));
        }
      },
      /* 12 · PENAFIAN */
      {
        label: 'PENAFIAN', hold: 2.6,
        cues: [
          { en: 'This video is for educational purposes only. It is not investment advice, or a recommendation to buy or sell any securities.', t: 'Video ini untuk tujuan pendidikan sahaja. Ia bukan nasihat pelaburan atau cadangan untuk membeli atau menjual mana-mana sekuriti.' },
          { en: 'Capital Market Institute. Understanding Markets. Building Knowledge.', t: 'Capital Market Institute. Understanding Markets. Building Knowledge.' }
        ],
        build(S, C) { EQ.disclaimerScene(S, C, 'Video 08 — Volume: Kenapa Ia Penting?'); }
      }
    ]
  };
  if (typeof module !== 'undefined') module.exports = EPISODE; else window.EPISODE = EPISODE;
})();
