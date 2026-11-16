/* VIDEO 01 — Introduction to Premium, Discount & PD Arrays
 * Each line: [Malay subtitle (displayed), English narration (VO script), options]
 * All prices are illustrative FCPO-style values (RM/tonne), not historical data. */
(function () {
  const { C, P, fmt, gen, tag, txt, dot, chart, ovl, side, chk } = E;

  /* ---------- data ---------- */
  // Scene 3: same direction, different location
  const D3 = gen([[0, 4640], [5, 4600], [23, 4800], [33, 4655], [46, 4782]], 11, { noise: 0.9 });
  // Scene 6: 1H context and two 5M zooms
  const H1 = gen([[0, 4650], [5, 4600], [22, 4800], [26, 4766], [29, 4792], [40, 4646], [47, 4690]], 23, { noise: 0.8 });
  const M5a = gen([[0, 4790], [7, 4772], [11, 4780], [17, 4766], [26, 4792]], 5, { noise: 0.5, floor: 0.6, wfloor: 1.2, eps: 0.4 });
  const M5b = gen([[0, 4672], [7, 4652], [11, 4662], [17, 4646], [26, 4670]], 7, { noise: 0.5, floor: 0.6, wfloor: 1.2, eps: 0.4 });
  const brk = (d, lvl) => { for (let i = 18; i < d.length; i++) if (d[i].c > lvl) return i; return d.length - 1; };
  const bA = brk(M5a, 4780), bB = brk(M5b, 4662);

  const scenes = [];

  /* ===== SCENE 1 — TITLE ===== */
  scenes.push({
    label: 'INTRODUCTION',
    lines: [
      ['Selamat datang ke CMI, Smart Money Concept, Level 6: Premium, Discount & PD Arrays.',
        'Welcome to CMI, Smart Money Concept, Level 6: Premium, Discount and PD Arrays.'],
      ['Di Level 5, kita mempelajari imbalance dan displacement. Di level ini, soalannya berbeza:',
        'In Level 5, we studied imbalance and displacement. In this level, we ask a different question:'],
      ['di mana harga sedang berdagang, dan adakah lokasi itu munasabah untuk bertindak?',
        'where is price trading, and does that location make sense to act on?'],
      ['Di akhir video ini, anda sepatutnya faham mengapa lokasi dinilai sebelum execution,',
        'By the end of this video, you should understand why location is assessed before execution,'],
      ['bagaimana aliran kerja analitikal CMI disusun, dan mengapa higher timeframe membingkai lower timeframe.',
        'how the CMI analytical workflow is structured, and why the higher timeframe frames the lower timeframe.']
    ],
    draw(t, L) {
      // schematic: impulse leg, range box, premium / EQ / discount
      const X0 = 1130, X1 = 1810, YT = 400, YB = 760, YM = (YT + YB) / 2;
      const pr = P(t, 0.4, 2.2), rb = P(t, L[1], 1.0), lab = P(t, L[2], .8);
      const pts = [[X0 + 30, YB], [X0 + 330, YT], [X0 + 470, YM + 70], [X0 + 640, YT + 60]];
      const d = pts.map((q, k) => (k ? 'L' : 'M') + q[0] + ',' + q[1]).join(' ');
      let svg = `<rect x="${X0}" y="${YT}" width="${(X1 - X0) * rb}" height="${YM - YT}" fill="${C.purple}" opacity="${.16 * rb}"/>` +
        `<rect x="${X0}" y="${YM}" width="${(X1 - X0) * rb}" height="${YB - YM}" fill="${C.purple}" opacity="${.07 * rb}"/>` +
        `<line x1="${X0}" x2="${X0 + (X1 - X0) * rb}" y1="${YM}" y2="${YM}" stroke="${C.amber}" stroke-width="2" stroke-dasharray="7 6"/>` +
        `<line x1="${X0}" x2="${X0 + (X1 - X0) * rb}" y1="${YT}" y2="${YT}" stroke="${C.mute}" stroke-width="1.2" opacity=".6"/>` +
        `<line x1="${X0}" x2="${X0 + (X1 - X0) * rb}" y1="${YB}" y2="${YB}" stroke="${C.mute}" stroke-width="1.2" opacity=".6"/>` +
        `<path d="${d}" fill="none" stroke="${C.gold}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - pr}" stroke-linejoin="round"/>` +
        dot(pts[0][0], pts[0][1], C.bull, P(t, .4, .3)) + dot(pts[1][0], pts[1][1], C.bear, P(t, 1.4, .3)) +
        txt(X1 - 14, YT + 34, 'PREMIUM', { anchor: 'end', col: C.purple, op: lab, fs: 17, fw: 700, ls: 2 }) +
        txt(X1 - 14, YM - 12, 'EQUILIBRIUM 50%', { anchor: 'end', col: C.amber, op: lab, fs: 17, fw: 700, ls: 2 }) +
        txt(X1 - 14, YB - 16, 'DISCOUNT', { anchor: 'end', col: C.purple, op: lab, fs: 17, fw: 700, ls: 2 });
      const ob = [L[3], L[3] + 1.2, L[4]];
      return `<div class="kickg" style="left:60px;top:150px">VIDEO 01 · LEVEL 6 · INTRODUCTION</div>
        <div class="h1" style="left:60px;top:180px">Introduction to Premium, Discount &amp; PD Arrays</div>
        <div class="h1s" style="left:60px;top:268px">Location · Dealing Range · Premium/Discount · PD Arrays · Confluence</div>
        <div class="gbar" style="left:60px;top:322px;width:${230 * P(t, .3, .8)}px"></div>
        <div class="panel" style="left:1100px;top:370px;width:740px;height:420px"></div>
        <div class="ctitle" style="left:1124px;top:388px">SCHEMATIC · NOT TO SCALE</div>
        <svg class="a" style="left:0;top:0" width="1920" height="1080">${svg}</svg>
        <div class="kicky" style="left:60px;top:420px;opacity:${P(t, L[3], .5)}">LEARNING OBJECTIVES</div>
        ${chk(60, 462, 'Why location is assessed before execution', P(t, ob[0], .5))}
        ${chk(60, 510, 'The CMI analytical framework, step by step', P(t, ob[1], .5))}
        ${chk(60, 558, 'Higher timeframe before lower timeframe', P(t, ob[2], .5))}`;
    }
  });

  /* ===== SCENE 2 — ROADMAP ===== */
  const rows = [
    ['01', 'Introduction', 'Location before execution · the CMI framework', 'VIDEO 01'],
    ['①', 'Dealing Range', 'Meaningful swing high & swing low', 'VIDEO 02'],
    ['②', 'Equilibrium', 'The 50% midpoint of the selected range', 'VIDEO 03'],
    ['③', 'Premium & Discount', 'Price location relative to the range', 'VIDEO 04'],
    ['④', 'Fibonacci OTE', '62%–79% retracement · correct anchoring', 'VIDEO 05'],
    ['⑤', 'PD Arrays', 'OB · Breaker · Mitigation · Rejection · FVG · IFVG · Void · Old H/L', 'VIDEO 06–11'],
    ['⑥', 'Multiple Confluences', 'Independent evidence · conflicts · no-trade', 'VIDEO 12–13'],
    ['★', 'Integrated Case Study', 'Complete Level 6 workflow', 'VIDEO 14']
  ];
  scenes.push({
    label: 'YOUR LEARNING JOURNEY',
    lines: [
      ['Level 6 mengandungi enam subtopik, yang disampaikan melalui empat belas video.',
        'Level 6 contains six subtopics, delivered across fourteen videos.'],
      ['Kita bermula dengan Dealing Range, kemudian Equilibrium, serta Premium dan Discount.',
        'We begin with the Dealing Range, then Equilibrium, and Premium and Discount.'],
      ['Seterusnya Fibonacci Optimal Trade Entry, diikuti PD Arrays dalam enam video.',
        'Next, Fibonacci Optimal Trade Entry, followed by the PD Arrays across six videos.'],
      ['Akhir sekali, Multiple Confluences, bukti yang bercanggah, dan satu kajian kes bersepadu.',
        'Finally, Multiple Confluences, conflicting evidence, and one integrated case study.'],
      ['Tiga prinsip membimbing level ini: Location Before Execution, Higher Timeframe Before Lower Timeframe,',
        'Three principles guide this level: Location Before Execution, Higher Timeframe Before Lower Timeframe,'],
      ['dan Confluence Without Overcomplication.', 'and Confluence Without Overcomplication.']
    ],
    draw(t, L) {
      const at = [0.2, L[0] + 1.2, L[1], L[1] + 1.2, L[1] + 2.4, L[2], L[2] + 1.6, L[3]];
      const R = rows.map((r, k) => {
        const a = P(t, at[k], .5), y = 210 + k * 78, here = k === 0;
        return `<div class="row" style="left:60px;top:${y}px;width:1060px;height:66px;opacity:${a};transform:translateX(${(1 - a) * 16}px);${here ? 'border-color:#d7b256' : ''}">
          <div class="n" style="${here ? 'color:#d7b256;border-color:#d7b256' : ''}">${r[0]}</div><div class="t">${r[1]}</div><div class="d">${r[2]}</div><div class="v">${r[3]}</div></div>`;
      }).join('');
      const here = P(t, 0.8, .4), pb = P(t, L[0] + .4, .6), pr = [P(t, L[4] + .3, .5), P(t, L[4] + 2.6, .5), P(t, L[5], .5)];
      return `<div class="kickg" style="left:60px;top:110px">LEVEL 6 · SERIES ROADMAP</div>
        <div class="h2" style="left:60px;top:140px">Six subtopics · fourteen videos</div>
        ${R}
        <div class="chip" style="left:1136px;top:226px;opacity:${here}">YOU ARE HERE</div>
        <div class="card" style="left:1290px;top:210px;width:570px;height:150px;opacity:${pb}">
          <div class="kickg" style="left:24px;top:22px">PREVIOUS · LEVEL 5</div>
          <div class="a" style="left:24px;top:54px;font-size:25px;font-weight:700">Imbalance &amp; Displacement</div>
          <div class="a" style="left:24px;top:94px;font-size:18px;color:#8a93a8">FVG, IFVG &amp; displacement: brief recap only</div></div>
        <div class="card" style="left:1290px;top:380px;width:570px;height:150px;opacity:${pb}">
          <div class="kickg" style="left:24px;top:22px">NEXT · LEVEL 7</div>
          <div class="a" style="left:24px;top:54px;font-size:25px;font-weight:700">Advanced ICT Concepts</div>
          <div class="a" style="left:24px;top:94px;font-size:18px;color:#8a93a8">Builds on the location skills of Level 6</div></div>
        <div class="card" style="left:1290px;top:550px;width:570px;height:270px;border-color:${pr[0] > .5 ? '#d7b256' : '#1b2442'};opacity:${pr[0]}">
          <div class="kicky" style="left:24px;top:22px">LEVEL 6 PRINCIPLES</div>
          ${chk(24, 66, 'Location Before Execution', pr[0])}
          ${chk(24, 122, 'Higher Timeframe Before', pr[1])}<div class="a" style="left:62px;top:154px;font-size:24px;opacity:${pr[1]}">Lower Timeframe</div>
          ${chk(24, 206, 'Confluence Without Overcomplication', pr[2], true, 22)}</div>`;
    }
  });

  /* ===== SCENE 3 — 1.1 DIRECTION VS LOCATION ===== */
  const A = { i: 22, p: 4790 }, B = { i: 31, p: 4670 }, STOP = 4590, TGT = 4880;
  scenes.push({
    label: '1.1 · DIRECTION VS LOCATION',
    lines: [
      ['Mari kita mulakan dengan soalan mudah. Jika pasaran bullish, adakah setiap belian ialah belian yang baik?',
        'Let us start with a simple question. If the market is bullish, is every buy a good buy?'],
      ['Ini contoh ilustrasi carta FCPO. Harga membentuk low di 4,600 dan naik ke 4,800.',
        'Here is an illustrative FCPO chart. Price forms a low at 4,600 and rallies to 4,800.'],
      ['Arahnya jelas menaik. Tetapi arah hanya menceritakan separuh daripada keadaan.',
        'The direction is clearly up. But direction tells only half of the story.'],
      ['Trader A membeli berhampiran high, di 4,790, selepas pergerakan sudah berkembang.',
        'Trader A buys near the high, at 4,790, after the move has already expanded.'],
      ['Trader B menunggu pullback dan membeli di 4,670, di separuh bawah pergerakan yang sama.',
        'Trader B waits for a pullback and buys at 4,670, in the lower half of the same move.'],
      ['Andaikan kedua-duanya guna invalidation yang sama di bawah range low, iaitu 4,590, dan target yang sama di 4,880.',
        'Assume both use the same invalidation below the range low, at 4,590, and the same target at 4,880.'],
      ['Trader A mengambil risiko 200 mata untuk potensi 90 mata. Trader B mengambil risiko 80 mata untuk potensi 210 mata.',
        'Trader A risks 200 points for a potential 90. Trader B risks 80 points for a potential 210.'],
      ['Arah yang sama. Pasaran yang sama. Kualiti lokasi yang sangat berbeza.',
        'Same direction. Same market. A very different quality of location.'],
      ['Ini tidak bermakna Trader B pasti untung. Lokasinya cuma memberi struktur risk-to-reward yang lebih baik, jika analisisnya betul.',
        'This does not mean Trader B will win. The location simply offers a better risk-to-reward structure, if the analysis is correct.']
    ],
    draw(t, L) {
      const n = 3 + 44 * P(t, L[1], 5.5);
      const sa = P(t, L[3], .5), sb = P(t, L[4], .5), sl = P(t, L[5], .7), bx = P(t, L[6], .7);
      const box = (E0, i0, a, name) => {
        const i1 = i0 + 6;
        return ovl.zone(S0, STOP, E0, i0, i1, C.bear, { alpha: .2, op: a }) + ovl.zone(S0, E0, TGT, i0, i1, C.bull, { alpha: .2, op: a }) +
          ovl.hl(S0, E0, i0, i1, '#ffffff', { w: 1.6, op: a }) +
          tag(S0.xs(i0 + 3), S0.ys(TGT) + 22, 'REWARD ' + (TGT - E0), C.bull, { op: a, fs: 14 }) +
          tag(S0.xs(i0 + 3), S0.ys(STOP) - 22, 'RISK ' + (E0 - STOP), C.bear, { op: a, fs: 14 });
      };
      let S0;
      const ch = chart({
        x: 36, y: 100, w: 1310, h: 760, data: D3, pmin: 4560, pmax: 4900, step: 50, slots: 48, n,
        title: 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', tagTxt: 'SAME DIRECTION · DIFFERENT LOCATION',
        under: S => { S0 = S; return box(A.p, A.i, bx, 'A') + box(B.p, B.i, bx, 'B'); },
        ov: S => {
          const sw = P(t, L[1] + 3.5, .6), path = P(t, L[2], 1.2);
          return ovl.path(S, [[5, 4600], [23, 4800]], C.gold, path, 2.6, .9) +
            tag(S.xs(5), S.ys(4600) + 30, 'LOW 4,600', C.bull, { op: sw }) + tag(S.xs(23), S.ys(4800) - 30, 'HIGH 4,800', C.bear, { op: sw }) +
            ovl.hl(S, STOP, null, null, C.bear, { dash: '8 6', prog: sl, w: 1.6 }) + ovl.hl(S, TGT, null, null, C.cyan, { dash: '8 6', prog: sl, w: 1.6 }) +
            tag(S.x1 - 8, S.ys(STOP), 'INVALIDATION 4,590', C.bear, { anchor: 'end', op: sl, fs: 14 }) +
            tag(S.x1 - 8, S.ys(TGT), 'TARGET 4,880', C.cyan, { anchor: 'end', op: sl, fs: 14 }) +
            dot(S.xs(A.i), S.ys(A.p), C.gold, sa, 8) + tag(S.xs(A.i) - 20, S.ys(A.p) + 34, 'A · BUY 4,790', C.gold, { anchor: 'end', op: sa }) +
            dot(S.xs(B.i), S.ys(B.p), C.gold, sb, 8) + tag(S.xs(B.i) - 20, S.ys(B.p) + 34, 'B · BUY 4,670', C.gold, { anchor: 'end', op: sb });
        }
      });
      const calc = P(t, L[6] + 1, .6), verdict = P(t, L[8], .6);
      const foot = `<div style="margin-top:14px;opacity:${calc}" class="mono">
          <div style="font-size:15px;color:#8a93a8;letter-spacing:2px">RISK : REWARD</div>
          <div style="font-size:21px;margin-top:12px;color:#e8ecf4">A&nbsp; 200 : 90 &nbsp;= <span style="color:#e54f4d">1 : 0.45</span></div>
          <div style="font-size:21px;margin-top:8px;color:#e8ecf4">B&nbsp; 80 : 210 = <span style="color:#25a198">1 : 2.63</span></div></div>
        <div class="warn" style="position:relative;margin-top:24px;font-size:19px;opacity:${verdict}"><b>Not a guarantee:</b> location improves the structure of the trade, not its certainty.</div>`;
      return ch + side({
        x: 1368, y: 100, w: 516, h: 760, kicker: 'INTRODUCTION · 1.1', title: 'Direction vs Location', foot,
        items: [
          { t0: L[2] + .6, s: 'Direction: where price may be heading' },
          { t0: L[2] + 1.8, s: 'Location: where price is trading now' },
          { t0: L[7], s: 'Location shapes risk &amp; reward' }
        ]
      }, t);
    }
  });

  /* ===== SCENE 4 — FOUR QUESTIONS ===== */
  const Q4 = [
    ['01', 'What is the likely direction?', 'Market structure · higher timeframe bias'],
    ['02', 'Where is price trading right now?', 'Dealing Range · Equilibrium · Premium/Discount'],
    ['03', 'Is there a potentially favourable location?', 'PD Arrays · Liquidity · OTE'],
    ['04', 'Has price provided confirmation?', 'Lower timeframe structure · displacement']
  ];
  scenes.push({
    label: '1.1 · FOUR SEPARATE QUESTIONS',
    lines: [
      ['Analisis profesional memisahkan empat soalan yang sering dicampur aduk oleh trader baharu.',
        'Professional analysis separates four questions that newer traders often mix together.'],
      ['Pertama, apakah arah yang berkemungkinan? Kedua, di mana harga sedang berdagang dalam julatnya sekarang?',
        'First, what is the likely direction? Second, where is price trading within its range right now?'],
      ['Ketiga, adakah terdapat lokasi berpotensi untuk bertindak? Dan keempat, adakah harga sudah memberi confirmation?',
        'Third, is there a potentially favourable location to act? And fourth, has price provided confirmation?'],
      ['Jawapan "ya" kepada soalan pertama tidak menjawab tiga soalan yang lain.',
        'A yes to the first question does not answer the other three.']
    ],
    draw(t, L) {
      const at = [L[1], L[1] + 2.6, L[2], L[2] + 3];
      const cards = Q4.map((q, k) => {
        const a = P(t, at[k], .5), x = 60 + (k % 2) * 910, y = 210 + Math.floor(k / 2) * 290;
        const dim = t > L[3] && k > 0 ? .45 : 1;
        return `<div class="card" style="left:${x}px;top:${y}px;width:890px;height:265px;opacity:${a * dim};${t > L[3] && k === 0 ? 'border-color:#d7b256' : ''}">
          <div class="a mono" style="left:30px;top:28px;font-size:40px;color:#d7b256;font-weight:600">${q[0]}</div>
          <div class="a" style="left:30px;top:96px;font-size:34px;font-weight:700;width:830px;line-height:1.2">${q[1]}</div>
          <div class="a mono" style="left:30px;top:200px;font-size:16px;color:#8a93a8;letter-spacing:1.6px">${q[2].toUpperCase()}</div></div>`;
      }).join('');
      return `<div class="kicky" style="left:60px;top:110px">INTRODUCTION · 1.1</div>
        <div class="h2" style="left:60px;top:140px">Four separate questions</div>${cards}
        <div class="warn" style="left:60px;top:800px;width:1800px;opacity:${P(t, L[3] + .4, .5)};display:none"></div>`;
    }
  });

  /* ===== SCENE 5 — FRAMEWORK ===== */
  const NODES = [
    ['Market Direction', 'Which side to study?'], ['Dealing Range', 'Which high & low?'],
    ['Premium / Discount', 'Where is price now?'], ['PD Arrays', 'Which areas of interest?'],
    ['Liquidity', 'Where may orders rest?'], ['OTE', 'Which retracement zone?'],
    ['Confirmation', 'Is price reacting?'], ['Execution', 'Entry · invalidation · target']
  ];
  scenes.push({
    label: '1.2 · THE CMI ANALYTICAL FRAMEWORK',
    lines: [
      ['Soalan-soalan ini membawa kepada kerangka analitikal CMI.', 'These questions lead to the CMI analytical framework.'],
      ['Market Direction, kemudian Dealing Range, kemudian Premium dan Discount.', 'Market Direction, then the Dealing Range, then Premium and Discount.'],
      ['Seterusnya, PD Arrays yang relevan, gambaran Liquidity, dan Fibonacci OTE.', 'Next, the relevant PD Arrays, the liquidity picture, and the Fibonacci OTE.'],
      ['Barulah kita mencari Confirmation, dan akhirnya Execution.', 'Only then do we look for confirmation, and finally, execution.'],
      ['Setiap langkah menyempitkan soalan. Direction memberitahu sisi mana yang perlu dikaji.',
        'Each step narrows the question. Direction tells us which side to study.'],
      ['Range, bersama premium dan discount, memberitahu di mana harga berada. PD Arrays dan liquidity menunjukkan kawasan minat yang khusus.',
        'The range, with its premium and discount, tells us where price is. PD Arrays and liquidity point to specific areas of interest.'],
      ['Confirmation pula bertanya sama ada harga benar-benar bertindak seperti yang dijangka di kawasan itu.',
        'Confirmation then asks whether price is actually behaving as expected at that area.'],
      ['Penting: ini aliran kerja analitikal. Melengkapkan setiap langkah tidak menjamin trade yang menguntungkan.',
        'Important: this is an analytical workflow. Completing every step does not guarantee a profitable trade.'],
      ['Dan pada mana-mana langkah, jawapan yang betul mungkin: tiada trade.', 'And at any step, the right answer may be: no trade.']
    ],
    draw(t, L) {
      const at = [L[1], L[1] + 1.4, L[1] + 2.8, L[2], L[2] + 1.6, L[2] + 3.2, L[3], L[3] + 1.6];
      const hi = t >= L[6] && t < L[7] ? [6] : t >= L[5] && t < L[6] ? [1, 2, 3, 4] : t >= L[4] && t < L[5] ? [0] : [];
      const W = 400, Hn = 150, gx = 40, x0 = 60;
      let svg = '';
      const nodes = NODES.map((nd, k) => {
        const r = Math.floor(k / 4), c = k % 4, x = x0 + c * (W + gx), y = 220 + r * 250, a = P(t, at[k], .5);
        if (k < 7) {
          const a2 = P(t, at[k + 1], .5);
          if (c < 3) svg += `<line x1="${x + W + 4}" x2="${x + W + 4 + (gx - 8) * a2}" y1="${y + Hn / 2}" y2="${y + Hn / 2}" stroke="${C.gold}" stroke-width="2.4"/>` +
            (a2 > .95 ? `<path d="M${x + W + gx - 12},${y + Hn / 2 - 6} L${x + W + gx - 4},${y + Hn / 2} L${x + W + gx - 12},${y + Hn / 2 + 6}" fill="none" stroke="${C.gold}" stroke-width="2.4"/>` : '');
          else svg += `<path d="M${x + W / 2},${y + Hn + 4} L${x + W / 2},${y + Hn + 50} L${x0 + W / 2},${y + Hn + 50} L${x0 + W / 2},${y + 246}" fill="none" stroke="${C.gold}" stroke-width="2.4" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - a2}"/>`;
        }
        const on = hi.includes(k);
        return `<div class="card" style="left:${x}px;top:${y}px;width:${W}px;height:${Hn}px;opacity:${a * (hi.length && !on ? .45 : 1)};${on ? 'border-color:#d7b256;box-shadow:0 0 0 1px #d7b256' : ''}">
          <div class="a mono" style="left:24px;top:20px;font-size:17px;color:#d7b256;letter-spacing:2px">STEP ${String(k + 1).padStart(2, '0')}</div>
          <div class="a" style="left:24px;top:50px;font-size:29px;font-weight:700">${nd[0]}</div>
          <div class="a" style="left:24px;top:98px;font-size:20px;color:#8a93a8">${nd[1]}</div></div>`;
      }).join('');
      const nt = P(t, L[8], .5);
      return `<div class="kicky" style="left:60px;top:110px">INTRODUCTION · 1.2</div>
        <div class="h2" style="left:60px;top:140px">The CMI analytical framework</div>
        <svg class="a" style="left:0;top:0" width="1920" height="1080">${svg}</svg>${nodes}
        <div class="warn" style="left:60px;top:688px;width:1180px;opacity:${P(t, L[7], .5)}"><b>Important:</b> an analytical workflow, not a mandatory sequence that guarantees a profitable trade.</div>
        <div class="card" style="left:1270px;top:688px;width:590px;height:92px;opacity:${nt};border-color:#3a4566">
          <div class="a mono" style="left:24px;top:18px;font-size:15px;color:#8a93a8;letter-spacing:2px">AT ANY STEP</div>
          <div class="a" style="left:24px;top:44px;font-size:25px;font-weight:700">No trade is a valid decision</div></div>`;
    }
  });

  /* ===== SCENE 6 — HTF BEFORE LTF ===== */
  scenes.push({
    label: '1.3 · HIGHER TIMEFRAME FIRST',
    lines: [
      ['Sekarang, prinsip kedua: Higher Timeframe Before Lower Timeframe.', 'Now, the second principle: Higher Timeframe Before Lower Timeframe.'],
      ['Di sebelah kiri ialah carta satu jam. Dealing range-nya dari 4,600 hingga 4,800, dengan equilibrium di 4,700.',
        'On the left is a one-hour chart. Its dealing range runs from 4,600 to 4,800, with equilibrium at 4,700.'],
      ['Di atas 4,700 ialah separuh premium. Di bawah 4,700 ialah separuh discount.', 'Above 4,700 is the premium half. Below 4,700 is the discount half.'],
      ['Sekarang kita zoom ke carta lima minit ketika harga berdagang sekitar 4,780.', 'Now we zoom into a five-minute chart while price trades around 4,780.'],
      ['Pada lima minit, harga memecahkan lower high di 4,780. Itu bullish structure shift yang sah pada timeframe ini.',
        'On five minutes, price breaks the lower high at 4,780. That is a valid bullish structure shift on this timeframe.'],
      ['Tetapi dalam range satu jam, keseluruhan pergerakan ini berada di premium. Belian di sini membeli bahagian atas range yang lebih besar.',
        'But within the one-hour range, this entire move sits in premium. A buy here buys the upper part of the larger range.'],
      ['Kemudian, harga retrace ke sekitar 4,650, di dalam discount satu jam.', 'Later, price retraces to around 4,650, inside the one-hour discount.'],
      ['Carta lima minit sekali lagi beralih bullish, memecahkan 4,662. Signal kelihatan serupa, tetapi lokasinya berbeza.',
        'The five-minute chart again shifts bullish, breaking 4,662. The signal looks similar, but the location is different.'],
      ['Kedua-dua signal tidak dijamin. Intinya, signal lower timeframe mesti dibaca dalam konteks higher timeframe.',
        'Neither signal is guaranteed. The point is that a lower timeframe signal must be read inside the higher timeframe context.']
    ],
    draw(t, L) {
      const caseB = t >= L[6];
      const n1 = caseB ? 30 + 18 * P(t, L[6], 3) : 3 + 27 * P(t, 0.3, L[1] + 1.5);
      const rng = P(t, L[1] + 1.2, .8), pd = P(t, L[2], .7), win = P(t, caseB ? L[6] + .5 : L[3], .5);
      const left = chart({
        x: 36, y: 100, w: 930, h: 760, data: H1, pmin: 4560, pmax: 4840, step: 50, slots: 48, n: n1,
        title: 'FCPO · 1H · HYPOTHETICAL', tagTxt: 'HIGHER TIMEFRAME',
        under: S => ovl.zone(S, 4700, 4800, null, null, C.purple, { alpha: .16, op: pd }) + ovl.zone(S, 4600, 4700, null, null, C.purple, { alpha: .06, op: pd }) +
          (caseB ? ovl.zone(S, 4644, 4674, 36.5, 43.5, C.gold, { alpha: .1, op: win, stroke: true, dash: '6 5' })
            : ovl.zone(S, 4764, 4794, 24.5, 29.5, C.gold, { alpha: .1, op: win, stroke: true, dash: '6 5' })),
        ov: S => ovl.hl(S, 4800, 5, null, C.mute, { prog: rng, w: 1.3 }) + ovl.hl(S, 4600, 5, null, C.mute, { prog: rng, w: 1.3 }) +
          ovl.hl(S, 4700, 5, null, C.amber, { prog: rng, dash: '8 6', w: 2 }) +
          tag(S.x1 - 8, S.ys(4700) - 20, 'EQ 4,700', C.amber, { anchor: 'end', op: rng, fs: 14 }) +
          tag(S.x1 - 8, S.ys(4800) - 20, 'RANGE HIGH 4,800', C.mute, { anchor: 'end', op: rng, fs: 14 }) +
          tag(S.x1 - 8, S.ys(4600) + 22, 'RANGE LOW 4,600', C.mute, { anchor: 'end', op: rng, fs: 14 }) +
          txt(S.x1 - 12, S.ys(4750) + 6, 'PREMIUM', { anchor: 'end', col: C.purple, fs: 17, fw: 700, ls: 2, op: pd }) +
          txt(S.x1 - 12, S.ys(4630) + 6, 'DISCOUNT', { anchor: 'end', col: C.purple, fs: 17, fw: 700, ls: 2, op: pd }) +
          tag(S.xs(caseB ? 40 : 27), S.ys(caseB ? 4674 : 4794) - 26, '5M VIEW', C.gold, { op: win, fs: 14 })
      });
      const d = caseB ? M5b : M5a, lh = caseB ? 4662 : 4780, b = caseB ? bB : bA;
      const t0 = caseB ? L[6] + .6 : L[3] + .4, n2 = 3 + 24 * P(t, t0, caseB ? 5 : 5.5);
      const mss = P(t, caseB ? L[7] : L[4], .6), loc = P(t, caseB ? L[7] + 2.5 : L[5], .6);
      const right = t >= L[3] ? chart({
        x: 990, y: 100, w: 894, h: 760, data: d, pmin: caseB ? 4635 : 4755, pmax: caseB ? 4680 : 4800, step: 10, slots: 27, n: n2,
        title: 'FCPO · 5M · HYPOTHETICAL', tagTxt: 'LOWER TIMEFRAME', op: P(t, L[3], .5),
        ov: S => ovl.hl(S, lh, 11, b, C.gold, { dash: '6 5', prog: mss }) +
          tag(S.xs(11), S.ys(lh) - 26, 'LOWER HIGH ' + fmt(lh), C.gold, { op: mss, fs: 14 }) +
          tag(S.xs(b), S.ys(d[b].c) - 52, 'BULLISH SHIFT · 5M', C.bull, { op: mss, fs: 15 }) +
          tag(S.px + (S.pw) / 2, S.py + S.ph - 24, caseB ? '1H LOCATION: DISCOUNT (BELOW 4,700)' : '1H LOCATION: PREMIUM (ABOVE 4,700)', C.purple, { op: loc, fs: 16, fill: '#150f2e' })
      }) : `<div class="panel" style="left:990px;top:100px;width:894px;height:760px"></div><div class="ctitle" style="left:1014px;top:122px">FCPO · 5M · HYPOTHETICAL</div>`;
      return left + right;
    }
  });

  /* ===== SCENE 7 — KEY PRINCIPLE ===== */
  scenes.push({
    label: '1.3 · KEY PRINCIPLE',
    lines: [
      ['Ini membawa kepada prinsip utama Level 6.', 'This leads to a key principle of Level 6.'],
      ['Entry yang sah secara teknikal masih boleh menjadi entry yang lemah jika ia berlaku di lokasi yang tidak menguntungkan.',
        'A technically valid entry can still be a poor entry if it occurs at an unfavourable location.'],
      ['Signal menjawab bila. Lokasi membantu menjawab di mana, dan sama ada risiko itu berbaloi.',
        'The signal answers when. Location helps answer where, and whether the risk is worth taking.'],
      ['Dan ingat: lokasi bukan confirmation. Lokasi yang baik tanpa confirmation masih hanya kawasan minat yang berpotensi.',
        'And remember: location is not confirmation. A good location without confirmation is still only a potential area of interest.']
    ],
    draw(t, L) {
      const c1 = P(t, L[1] + 1, .5), c2 = P(t, L[1] + 2.5, .5), c3 = P(t, L[3], .5);
      return `<div class="kicky" style="left:60px;top:110px">1.3 · KEY PRINCIPLE · PERKARA YANG PERLU DIINGAT</div>
        <div class="h2" style="left:60px;top:142px;opacity:${P(t, L[1], .6)}">A technically valid entry can still be a poor entry</div>
        <div class="h2" style="left:60px;top:192px;color:#d7b256;opacity:${P(t, L[1] + .5, .6)}">if the location is unfavourable.</div>
        <div class="card" style="left:60px;top:290px;width:880px;height:330px;opacity:${c1}">
          <div class="kickg" style="left:30px;top:26px">THE SIGNAL · ANSWERS "WHEN"</div>
          <div class="a" style="left:30px;top:60px;font-size:28px;font-weight:700">5M bullish structure shift</div>
          ${chk(30, 130, 'Lower high broken', c1)}${chk(30, 180, 'Clear trigger on its own timeframe', c1)}${chk(30, 230, 'Technically valid', c1)}</div>
        <div class="card" style="left:980px;top:290px;width:880px;height:330px;opacity:${c2}">
          <div class="kickg" style="left:30px;top:26px">THE LOCATION · ANSWERS "WHERE"</div>
          <div class="a" style="left:30px;top:60px;font-size:28px;font-weight:700">Inside 1H premium</div>
          ${chk(30, 130, 'Buying the upper half of the larger range', c2, false)}${chk(30, 180, 'Wider distance to a logical invalidation', c2, false)}${chk(30, 230, 'Less room to the next objective', c2, false)}</div>
        <div class="warn" style="left:60px;top:660px;width:1800px;opacity:${c3}"><b>Location is not confirmation.</b> A good location without confirmation is still only a potential area of interest, subject to market structure.</div>`;
    }
  });

  /* ===== SCENE 8 — SUMMARY ===== */
  scenes.push({
    label: 'SUMMARY',
    lines: [
      ['Mari kita rumuskan perkara yang perlu diingat.', 'Let us summarise what to remember.'],
      ['Arah dan lokasi ialah dua soalan berbeza. Lokasi membentuk risk dan reward.', 'Direction and location are separate questions. Location shapes risk and reward.'],
      ['Kerangka CMI bergerak daripada arah kepada range, lokasi, kawasan minat, confirmation, dan execution.',
        'The CMI framework moves from direction to range, location, areas of interest, confirmation, and execution.'],
      ['Signal lower timeframe dibaca dalam konteks higher timeframe. Dan tiada trade sentiasa merupakan keputusan yang sah.',
        'Lower timeframe signals are read inside higher timeframe context. And no trade is always a valid decision.']
    ],
    draw(t, L) {
      const it = [
        [L[1], 'Direction ≠ location'], [L[1] + 1.8, 'Location shapes risk &amp; reward'],
        [L[2], 'Framework: direction → range → location'], [L[2] + 2.2, '→ PD Arrays · liquidity · OTE → confirmation'],
        [L[3], 'Read LTF signals inside HTF context'], [L[3] + 2.6, 'No trade is a valid decision']
      ];
      return `<div class="kickg" style="left:60px;top:110px">KEY LEARNING POINTS</div>
        <div class="h2" style="left:60px;top:140px">Introduction — what to remember</div>
        ${it.map((x, k) => chk(60 + (k % 2) * 900, 240 + Math.floor(k / 2) * 70, x[1], P(t, x[0], .5), true, 27)).join('')}`;
    }
  });

  /* ===== SCENE 9 — KNOWLEDGE CHECK ===== */
  const QS = [
    ['Why is market direction alone not enough to judge an entry?',
      'The same direction can be traded from very different locations, with very different risk and reward.'],
    ['List the steps of the CMI analytical framework, in order.',
      'Direction → Dealing Range → Premium/Discount → PD Arrays → Liquidity → OTE → Confirmation → Execution.'],
    ['A 5M bullish shift forms while price sits in 1H premium. Is it automatically a good buy?',
      'No. The signal may be valid on 5M, but it buys the upper half of the larger range. It needs strong context, or waiting may be better.']
  ];
  const GAP = 5;
  scenes.push({
    label: 'KNOWLEDGE CHECK',
    lines: [
      ['Sekarang, uji kefahaman anda. Hentikan video seketika dan jawab setiap soalan.', 'Now, test your understanding. Pause the video and answer each question.'],
      ['Soalan satu: mengapa arah pasaran sahaja tidak cukup untuk menilai sesuatu entry?', 'Question one: why is market direction alone not enough to judge an entry?', { gap: GAP }],
      ['Jawapan: arah yang sama boleh didagangkan dari lokasi yang sangat berbeza, dengan risk dan reward yang sangat berbeza.',
        'Answer: the same direction can be traded from very different locations, with very different risk and reward.'],
      ['Soalan dua: senaraikan langkah kerangka analitikal CMI mengikut urutan.', 'Question two: list the steps of the CMI analytical framework, in order.', { gap: GAP }],
      ['Jawapan: Market Direction, Dealing Range, Premium dan Discount, PD Arrays, Liquidity, OTE, Confirmation, Execution.',
        'Answer: Market Direction, Dealing Range, Premium and Discount, PD Arrays, Liquidity, OTE, Confirmation, Execution.'],
      ['Soalan tiga: bullish shift lima minit terbentuk ketika harga di premium satu jam. Adakah ia automatik belian yang baik?',
        'Question three: a five-minute bullish shift forms while price is in one-hour premium. Is it automatically a good buy?', { gap: GAP }],
      ['Jawapan: tidak. Signal itu mungkin sah pada lima minit, tetapi ia membeli separuh atas range yang lebih besar.',
        'Answer: no. The signal may be valid on five minutes, but it buys the upper half of the larger range.'],
      ['Ia memerlukan konteks yang kukuh, atau lebih baik menunggu.', 'It needs strong supporting context, or it may be better to wait.']
    ],
    draw(t, L, G) {
      const q = t >= L[5] ? 2 : t >= L[3] ? 1 : 0, qs = [L[1], L[3], L[5]][q], as = [L[2], L[4], L[6]][q], g0 = G[[1, 3, 5][q]];
      const a = P(t, qs, .5), ans = P(t, as, .5), inGap = t >= g0 && t < g0 + GAP, cd = Math.ceil(g0 + GAP - t);
      const ring = inGap ? (t - g0) / GAP : 0;
      return `<div class="kicky" style="left:60px;top:110px">KNOWLEDGE CHECK · ${q + 1} / 3</div>
        <div class="h2" style="left:60px;top:140px">Test your understanding</div>
        <div class="card" style="left:60px;top:230px;width:1800px;height:220px;opacity:${a}">
          <div class="a mono" style="left:34px;top:30px;font-size:18px;color:#d7b256;letter-spacing:2px">QUESTION ${q + 1}</div>
          <div class="a" style="left:34px;top:72px;width:1500px;font-size:38px;font-weight:700;line-height:1.25">${QS[q][0]}</div>
          <svg class="a" style="left:1660px;top:50px;opacity:${inGap ? 1 : 0}" width="120" height="120"><circle cx="60" cy="60" r="48" stroke="#1b2442" stroke-width="7" fill="none"/>
            <circle cx="60" cy="60" r="48" stroke="#d7b256" stroke-width="7" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${ring}" transform="rotate(-90 60 60)"/>
            <text x="60" y="72" text-anchor="middle" font-family="JetBrains Mono" font-size="36" fill="#fff" font-weight="600">${inGap ? cd : ''}</text></svg>
          <div class="a mono" style="left:1630px;top:178px;font-size:14px;color:#8a93a8;letter-spacing:2px;opacity:${inGap ? 1 : 0}">PAUSE &amp; ANSWER</div></div>
        <div class="card" style="left:60px;top:480px;width:1800px;height:200px;opacity:${ans};border-color:#25a198">
          <div class="a mono" style="left:34px;top:30px;font-size:18px;color:#25a198;letter-spacing:2px">ANSWER &amp; EXPLANATION</div>
          <div class="a" style="left:34px;top:70px;width:1720px;font-size:31px;line-height:1.32;color:#e8ecf4">${QS[q][1]}</div></div>`;
    }
  });

  /* ===== SCENE 10 — UP NEXT ===== */
  scenes.push({
    label: 'NEXT · DEALING RANGE',
    lines: [
      ['Dalam video seterusnya, kita mempelajari asas bagi semua perkara dalam level ini: Dealing Range.',
        'In the next video, we study the foundation of everything in this level: the Dealing Range.'],
      ['Cara memilih swing high dan swing low yang bermakna, dan mengapa range yang dipilih sesuka hati memberi bacaan premium dan discount yang mengelirukan.',
        'How to select a meaningful swing high and swing low, and why an arbitrary range gives misleading premium and discount readings.']
    ],
    draw(t, L) {
      const n = 3 + 44 * P(t, .3, 4), r = P(t, L[1], 1);
      const ch = chart({
        x: 360, y: 230, w: 1200, h: 520, data: D3, pmin: 4560, pmax: 4840, step: 50, slots: 48, n,
        title: 'FCPO · 1H · HYPOTHETICAL', tagTxt: 'WHICH HIGH? WHICH LOW?',
        ov: S => ovl.hl(S, 4800, 5, null, C.gold, { prog: r, w: 2 }) + ovl.hl(S, 4600, 5, null, C.gold, { prog: r, w: 2 }) +
          dot(S.xs(5), S.ys(4600), C.bull, r, 8) + dot(S.xs(23), S.ys(4800), C.bear, r, 8)
      });
      return `<div class="kickg" style="left:60px;top:110px">UP NEXT · SUBTOPIC ①</div>
        <div class="h2" style="left:60px;top:140px">Dealing Range — meaningful price boundaries</div>${ch}
        <div class="card" style="left:760px;top:780px;width:400px;height:66px;border-color:#d7b256;opacity:${P(t, L[0] + 1, .5)}">
          <div class="a mono" style="left:20px;top:10px;font-size:13px;color:#d7b256;letter-spacing:2px">NEXT · VIDEO 02</div>
          <div class="a" style="left:20px;top:30px;font-size:22px;font-weight:700">Dealing Range</div></div>`;
    }
  });

  /* ===== SCENE 11 — REFERENCES ===== */
  const REFS = [
    ['Michael J. Huddleston (ICT) — ICT educational material', 'ICT terminology · episode titles to be verified'],
    ['John J. Murphy — Technical Analysis of the Financial Markets (1999)', 'NYIF · price structure'],
    ['Larry Harris — Trading and Exchanges (2003)', 'Oxford University Press · microstructure'],
    ['Edwards, Magee &amp; Bassetti — Technical Analysis of Stock Trends', 'Chart analysis · edition to be verified']
  ];
  scenes.push({
    label: 'REFERENCES',
    lines: [
      ['Rujukan untuk video ini dipaparkan di skrin. Bahan ICT digunakan untuk terminologi khusus ICT.',
        'The references for this video are shown on screen. ICT material is used for ICT-specific terminology.'],
      ['Konsep SMC dan ICT ialah kerangka analitikal, bukan hasil penyelidikan akademik.',
        'SMC and ICT concepts are analytical frameworks, not the product of academic research.']
    ],
    draw(t, L) {
      return `<div class="kickg" style="left:60px;top:110px">REFERENCES · RUJUKAN</div>
        <div class="h2" style="left:60px;top:140px">Primary reading for this level</div>
        ${REFS.map((r, k) => { const a = P(t, .4 + k * .5, .5); return `<div class="row" style="left:60px;top:${230 + k * 84}px;width:1800px;height:70px;opacity:${a}">
          <div class="n">${String(k + 1).padStart(2, '0')}</div><div class="t" style="top:20px">${r[0]}</div><div class="v" style="font-size:15px">${r[1].toUpperCase()}</div></div>`; }).join('')}
        <div class="warn" style="left:60px;top:600px;width:1800px;opacity:${P(t, L[1], .5)}"><b>Note:</b> SMC/ICT concepts are analytical frameworks. They are not attributed to academic research.</div>`;
    }
  });

  /* ===== SCENE 12 — DISCLAIMER ===== */
  scenes.push({
    label: 'DISCLAIMER',
    tail: 1.6,
    lines: [
      ['Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Semua harga FCPO dalam video ini ialah ilustrasi.',
        'For educational purposes only. Not financial advice or a guarantee of profit. All FCPO prices in this video are illustrative.'],
      ['Trading futures melibatkan risiko kerugian. Jumpa dalam Video 2.', 'Futures trading involves the risk of loss. See you in Video 2.']
    ],
    draw(t) {
      return `<div class="card" style="left:610px;top:300px;width:700px;height:300px;border-color:#d7b256">
          <svg class="a" style="left:330px;top:34px" width="40" height="36"><path d="M20 3 L37 33 H3 Z" fill="none" stroke="#d7b256" stroke-width="2.4" stroke-linejoin="round"/><line x1="20" y1="14" x2="20" y2="23" stroke="#d7b256" stroke-width="2.6"/><circle cx="20" cy="28" r="1.8" fill="#d7b256"/></svg>
          <div class="a mono" style="left:0;width:700px;text-align:center;top:86px;font-size:15px;color:#d7b256;letter-spacing:2.6px">PENAFIAN · DISCLAIMER</div>
          <div class="a" style="left:50px;width:600px;text-align:center;top:122px;font-size:23px;line-height:1.4;color:#e8ecf4">Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian.</div>
          <div class="a" style="left:0;width:700px;text-align:center;top:244px;font-size:16px;color:#8a93a8">Semua harga FCPO dalam video ini ialah ilustrasi pembelajaran.</div></div>
        <div class="a" style="left:0;width:1920px;text-align:center;top:630px;font-size:19px;color:#8a93a8">Seterusnya: Video 02 — Dealing Range</div>`;
    }
  });

  registerVideo({ id: 'v01', title: 'VIDEO 01 — INTRODUCTION', scenes });
})();
