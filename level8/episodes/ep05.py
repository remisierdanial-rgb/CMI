"""VIDEO 05 — Multi-Timeframe Liquidity (Subtopic 3: A–J)."""
from .common import *  # noqa
from .mtfdata import mtf_bull

NUM, TITLE = 5, 'Multi-Timeframe Liquidity'


def sketch(pts, level=None, color='bull', lvl_color='cyan', fill=None):
    """Mini price sketch for cards: pts normalised (0..1 x, 0..1 y down)."""
    def fn(ctx, x, y, w, h, p):
        X0, Y0, WW, HH = x + 24, y + h - 92, w - 48, 70
        if level is not None:
            line(ctx, X0, Y0 + level * HH, X0 + WW, Y0 + level * HH, lvl_color, 1, 1.5, [6, 5])
        n = len(pts) - 1
        prog = p * n
        ctx.set_source_rgba(*col(color))
        ctx.set_line_width(2.6)
        ctx.move_to(X0 + pts[0][0] * WW, Y0 + pts[0][1] * HH)
        for k in range(n):
            f = clamp(prog - k)
            if f <= 0:
                break
            ax, ay = pts[k]
            bx, by = pts[k + 1]
            ctx.line_to(X0 + lerp(ax, bx, f) * WW, Y0 + lerp(ay, by, f) * HH)
        ctx.stroke()
    return fn


def s_understanding():
    sc = Scene('8.3', 'Understanding liquidity')
    sc.visual = 'Two definitions side by side: market microstructure liquidity vs SMC liquidity pools; order-book ladder illustration.'
    sc.say('The word liquidity has two meanings in trading, and we must keep them separate.',
           'Perkataan liquidity mempunyai dua maksud dalam trading, dan kita mesti memisahkannya.')
    sc.add(Heading('SUBTOPIC 3 · MULTI-TIMEFRAME LIQUIDITY', 'Two meanings of liquidity', 120, 190, 48))
    b = sc.say('In market microstructure, liquidity is the ability to trade a quantity quickly, at low cost, without moving price much. It depends on the orders resting in the order book.',
               'Dalam mikrostruktur market, liquidity ialah keupayaan untuk trade sesuatu kuantiti dengan cepat, kos rendah, tanpa banyak menggerakkan harga. Ia bergantung pada order yang berada dalam order book.')
    sc.add(Box(120, 260, 820, 300, 'Market liquidity', 'The ability to trade size quickly at low cost with little price impact (Harris, 2003). Measured with spread, depth and resilience of the order book.', 'MICROSTRUCTURE', 'blue', 28, 23), at=b)

    def book(ctx, t):
        x0, y0 = 1000, 260
        panel(ctx, x0, y0, 800, 300)
        text(ctx, 'ILLUSTRATIVE ORDER BOOK · HYPOTHETICAL', x0 + 24, y0 + 36, MONO_M, 14, 'dim', track=2)
        asks = [(4505, 0.35), (4504, 0.6), (4503, 0.45), (4502, 0.3)]
        bids = [(4500, 0.4), (4499, 0.55), (4498, 0.7), (4497, 0.35)]
        for i, (pz, q) in enumerate(asks + bids):
            yy = y0 + 70 + i * 27
            c = 'bear' if i < 4 else 'bull'
            text(ctx, f'{pz:,}', x0 + 40, yy + 16, MONO, 16, 'sub')
            ctx.rectangle(x0 + 130, yy, 520 * q * ease(t / 1.2), 20)
            ctx.set_source_rgba(*col(c, 0.6))
            ctx.fill()
        text(ctx, 'ASKS (SELL)', x0 + 680, y0 + 120, MONO_M, 14, 'bear', track=1.5)
        text(ctx, 'BIDS (BUY)', x0 + 680, y0 + 228, MONO_M, 14, 'bull', track=1.5)
    sc.add(Custom(book), at=b, delay=0.4)
    b = sc.say('In Smart Money Concepts, liquidity usually means something narrower: pools of resting orders, such as stop-losses and breakout orders, that are believed to cluster beyond obvious highs and lows.',
               'Dalam Smart Money Concept, liquidity biasanya bermaksud sesuatu yang lebih sempit: kolam order yang menunggu, seperti stop-loss dan order breakout, yang dipercayai berkumpul di luar high dan low yang jelas.')
    sc.add(Box(120, 590, 820, 220, 'SMC liquidity pools', 'Inferred clusters of stop and breakout orders beyond obvious swing highs and lows (BSL / SSL).', 'SMC INTERPRETATION', 'cyan', 28, 23), at=b)
    b = sc.say('Swing highs and lows are used as references because they are obvious to many traders. But a chart cannot reveal who placed the orders, how many there are, or why.',
               'Swing high dan low digunakan sebagai rujukan kerana ia jelas kepada ramai trader. Tetapi carta tidak dapat mendedahkan siapa meletakkan order, berapa banyak, atau kenapa.')
    sc.add(Box(1000, 590, 800, 220, 'Why swings matter — and the limit', 'Obvious swings attract stops and breakout orders. A candlestick chart cannot show their identity, size or intention.', 'LIMITATION', 'amber', 26, 22), at=b)
    b = sc.say('Liquidity matters for execution because large orders need opposing orders to fill. That is the logic behind the idea that price may seek liquidity. It is a reasoned hypothesis, not an observed fact.',
               'Liquidity penting untuk execution kerana order besar memerlukan order bertentangan untuk dipenuhi. Itulah logik di sebalik idea bahawa harga mungkin mencari liquidity. Ia hipotesis yang beralasan, bukan fakta yang dilihat.')
    return sc


def s_bsl_ssl_types():
    sc = Scene('8.3', 'Where BSL and SSL form')
    sc.visual = '15M FCPO chart over three sessions with session high/low lines, PDH/PDL; animated price approaching highs then lows.'
    s = gen(4520, [(5, 4548), (4, 4530), (4, 4552), (6, 4506), (5, 4534), (4, 4512), (5, 4538), (6, 4498), (4, 4520), (5, 4500), (6, 4560)], seed=61, vol=4)
    n = len(s)
    a, b2 = 0, 17
    c2 = 34
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · 15M · HYPOTHETICAL ILLUSTRATION', 'SESSION & DAY LIQUIDITY', slots=n + 6, step=10)
    sc.say('Buy-side liquidity may form above swing highs, equal highs, the previous day high, the previous week high, session highs and major higher-timeframe highs.',
           'Buy-side liquidity mungkin terbentuk di atas swing high, equal high, previous day high, previous week high, session high dan high utama higher timeframe.')
    sc.add(ch)
    ch.reveal(c2, dur=4)
    bb = sc.say('On this fifteen-minute chart, the first block is the previous day, and the second is today\'s morning session.',
                'Pada carta 15 minit ini, blok pertama ialah hari sebelumnya, dan blok kedua ialah sesi pagi hari ini.')
    ch.ann(VBand(a, b2 - 1, 'purple', 'PREVIOUS DAY', 0.06), at=bb)
    ch.ann(VBand(b2, c2 - 1, 'blue', 'MORNING SESSION', 0.07), at=bb, delay=0.4)
    hi_i, pdh = s.hi(a, b2 - 1)
    lo_i, pdl = s.lo(a, b2 - 1)
    shi_i, sh = s.hi(b2, c2 - 1)
    sli_i, sl = s.lo(b2, c2 - 1)
    bb = sc.say('Above: the previous day high and the morning session high. These are buy-side liquidity references.',
                'Di atas: previous day high dan session high pagi. Ini ialah rujukan buy-side liquidity.')
    ch.ann(HLine(pdh, hi_i, None, 'cyan', f'PDH · BSL {pdh:,}'), at=bb)
    ch.ann(HLine(sh, shi_i, None, 'cyan', f'SESSION HIGH · BSL {sh:,}', lpos='left'), at=bb, delay=0.4)
    bb = sc.say('Below: the previous day low and the session low. These are sell-side liquidity references.',
                'Di bawah: previous day low dan session low. Ini ialah rujukan sell-side liquidity.')
    ch.ann(HLine(pdl, lo_i, None, 'cyan', f'PDL · SSL {pdl:,}', above=False), at=bb)
    ch.ann(HLine(sl, sli_i, None, 'cyan', f'SESSION LOW · SSL {sl:,}', lpos='left', above=False), at=bb, delay=0.4)
    bb = sc.say('In the next session, price first trades below the session low and previous day low, reaching sell-side liquidity, and then rallies toward the buy-side levels above.',
                'Dalam sesi seterusnya, harga mula-mula diniagakan di bawah session low dan previous day low, mencapai sell-side liquidity, kemudian naik ke arah paras buy-side di atas.')
    ch.reveal(n, at=bb, dur=5)
    ch.ann(VBand(c2, n - 1, 'gold', 'AFTERNOON SESSION', 0.05), at=bb)
    sc.say('This is one possible path, shown for illustration. Price could just as easily have taken the highs first, or neither.',
           'Ini satu laluan yang mungkin, ditunjukkan sebagai ilustrasi. Harga boleh sahaja mengambil high dahulu, atau tidak kedua-duanya.')
    sc.say('For FCPO, mark session levels using the official Bursa session times, morning, afternoon and the T plus one night session, and verify them before use.',
           'Bagi FCPO, tandakan paras sesi menggunakan waktu sesi rasmi Bursa, pagi, petang dan sesi malam T+1, dan sahkan sebelum digunakan.')
    return sc


def s_erl_irl():
    sc = Scene('8.3', 'ERL · IRL')
    sc.visual = 'Animated 1H dealing range: external boundaries (ERL) highlighted cyan beyond range; internal swings, EQH/EQL and FVGs (IRL) inside.'
    s = gen(4560, [(5, 4500), (7, 4640, 'disp'), (4, 4600), (4, 4626), (5, 4572), (4, 4598), (4, 4575), (5, 4612)], seed=71, vol=5)
    E = s.ends
    lo, hi = s.l[E[0]], s.h[E[1]]
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', 'EXTERNAL vs INTERNAL RANGE LIQUIDITY', slots=len(s) + 8, step=20, pmin=lo - 40, pmax=hi + 40)
    sc.say('Now two important ideas: External Range Liquidity and Internal Range Liquidity.',
           'Kini dua idea penting: External Range Liquidity dan Internal Range Liquidity.')
    sc.add(ch)
    ch.reveal(len(s), dur=4)
    b = sc.say('First, define the dealing range: here, from the swing low to the swing high created by the displacement.',
               'Pertama, tentukan dealing range: di sini, dari swing low hingga swing high yang dihasilkan oleh displacement.')
    ch.ann(Range(E[0], None, lo, hi, labels=True, pd=False, eq=False), at=b)
    b = sc.say('External Range Liquidity, ERL, is the liquidity beyond the range boundaries: buy-side above the range high, sell-side below the range low.',
               'External Range Liquidity, ERL, ialah liquidity di luar sempadan range: buy-side di atas range high, sell-side di bawah range low.')
    ch.ann(Zone(E[1], None, hi, hi + 18, 'cyan', 'ERL · BSL ABOVE RANGE HIGH', alpha=0.15), at=b)
    ch.ann(Zone(E[0], None, lo - 18, lo, 'cyan', 'ERL · SSL BELOW RANGE LOW', lpos='below', alpha=0.15), at=b, delay=0.4)
    b = sc.say('Internal Range Liquidity, IRL, is the liquidity inside the range: internal swing highs and lows, equal highs and lows within the range, and in some ICT frameworks, fair value gaps.',
               'Internal Range Liquidity, IRL, ialah liquidity di dalam range: swing high dan low dalaman, equal high dan low dalam range, dan dalam sesetengah rangka kerja ICT, fair value gap.')
    for j, k in enumerate((2, 4, 6)):
        ch.ann(Mark(E[k], s.l[E[k]], 'IRL', 'blue', 'below', size=16), at=b, delay=0.3 * j)
    for j, k in enumerate((3, 5)):
        ch.ann(Mark(E[k], s.h[E[k]], 'IRL', 'blue', 'above', size=16), at=b, delay=0.15 + 0.3 * j)
    fv = s.fvg(E[0] + 1, E[1], +1)
    ch.ann(fvg_zone(s, fv[0], +1, 'blue', 'FVG · IRL', extend=None), at=b, delay=1.0)
    b = sc.say('A common ICT framework describes price delivery as moving between the two: after taking external liquidity, price often seeks internal liquidity, and from internal liquidity it may reach for external liquidity again.',
               'Satu rangka kerja ICT yang biasa menerangkan penghantaran harga sebagai bergerak antara kedua-duanya: selepas mengambil external liquidity, harga sering mencari internal liquidity, dan dari internal liquidity ia mungkin menuju external liquidity semula.')
    sc.add(Box(1366, 100, 518, 770, 'ERL ↔ IRL', 'ERL: beyond the range boundaries.\nIRL: inside the range — internal swings, internal EQH/EQL, FVGs (ICT).\n\nERL → IRL → ERL is a way to organise expectations about price delivery, not a predictive rule. Either can be skipped, and ranges get redefined.',
               eyebrow='FRAMEWORK, NOT RULE', color='cyan', tsize=30, bsize=22), at=b)
    sc.say('Treat this as a way to organise expectations, not as a fixed predictive signal.',
           'Anggap ini sebagai cara menyusun jangkaan, bukan signal ramalan yang tetap.')
    return sc


def s_hierarchy():
    sc = Scene('8.3', 'Liquidity hierarchy')
    sc.visual = 'Price ladder: monthly, weekly, daily, session and intraday levels around current price; hierarchy labels; "not taken in order" note.'
    sc.say('Liquidity exists on every timeframe. We can map it as a hierarchy.',
           'Liquidity wujud pada setiap timeframe. Kita boleh memetakannya sebagai hierarki.')
    sc.add(Heading('LIQUIDITY HIERARCHY', 'From monthly to intraday', 120, 190, 48))
    levels = [(4790, 'PMH · Monthly', 'purple'), (4705, 'PWH · Weekly', 'blue'), (4620, 'PDH · Daily', 'cyan'), (4572, 'Session high', 'bull'), (4538, 'Intraday EQH', 'sub'),
              (4492, 'Intraday EQL', 'sub'), (4470, 'Session low', 'bull'), (4440, 'PDL · Daily', 'cyan'), (4380, 'PWL · Weekly', 'blue'), (4300, 'PML · Monthly', 'purple')]
    cur = 4512

    def ladder(ctx, t):
        x0, y0, w, h = 120, 260, 1000, 560
        panel(ctx, x0, y0, w, h)
        Y = lambda p: y0 + 30 + (4820 - p) / (4820 - 4270) * (h - 60)
        for i, (p, lab, c) in enumerate(levels):
            a = ease((t - 0.25 * i) / 0.5)
            if a <= 0:
                continue
            yy = Y(p)
            broad = 'Monthly' in lab or 'Weekly' in lab
            line(ctx, x0 + 40, yy, x0 + w - 260, yy, c, a, 3 if broad else 1.8, None if broad else [7, 5])
            text(ctx, f'{lab}', x0 + w - 240, yy + 6, SANS_SB, 19, c, a)
            text(ctx, f'{p:,}', x0 + w - 70, yy + 6, MONO, 15, 'dim', a, align='right')
        yy = Y(cur)
        a = ease(t / 0.5)
        line(ctx, x0 + 40, yy, x0 + w - 260, yy, 'gold', a, 2.5)
        pill(ctx, f'PRICE {cur:,} · HYPOTHETICAL', x0 + 300, yy, 'gold', a, size=15)
    b = sc.say('Above and below current price, we can stack monthly, weekly, daily, session and intraday levels.',
               'Di atas dan di bawah harga semasa, kita boleh menyusun paras monthly, weekly, daily, sesi dan intraday.')
    sc.add(Custom(ladder, fade=0.3), at=b)
    b = sc.say('Higher-timeframe levels are broader market references. They frame the bigger objectives. Lower-timeframe levels give detailed local structure, and are usually closer to price.',
               'Paras higher timeframe ialah rujukan market yang lebih luas. Ia membingkai sasaran yang lebih besar. Paras lower timeframe memberi struktur setempat yang terperinci, dan biasanya lebih dekat dengan harga.')
    sc.add(Box(1160, 260, 640, 260, 'Broad vs local', 'HTF levels: broad references and bigger objectives.\nLTF levels: local structure, closer to price, used for intraday decisions.', 'HIERARCHY', 'gold', 26, 22), at=b)
    b = sc.say('There is no rule that a higher-timeframe level must be taken before a lower-timeframe level, or that the nearest level must be taken first.',
               'Tiada peraturan bahawa paras higher timeframe mesti diambil sebelum paras lower timeframe, atau paras terdekat mesti diambil dahulu.')
    sc.add(Box(1160, 550, 640, 270, 'No fixed order', 'Price does not have to take the nearest level first, nor HTF levels before LTF levels. Map them; do not sequence them.', 'CMI RULE', 'amber', 26, 22), at=b)
    return sc


def s_interaction():
    sc = Scene('8.3', 'Liquidity interaction')
    sc.visual = 'Six cards with mini sketches: approach, sweep, break & accept, rejection, sweep + displacement, sweep without confirmation.'
    sc.say('When price reaches a liquidity level, several different things can happen. We must name them precisely.',
           'Apabila harga sampai ke paras liquidity, beberapa perkara berbeza boleh berlaku. Kita mesti menamakannya dengan tepat.')
    sc.add(Heading('LIQUIDITY INTERACTION', 'Six different outcomes at a level', 120, 190, 48))
    C = [('Approaching', 'Price moves toward the level. Nothing has happened yet.', [(0, .9), (.3, .7), (.45, .8), (.75, .45), (1, .3)], 0.15, 'sub',
          'One: approaching. Price is moving toward the level, but nothing has happened yet.', 'Satu: menghampiri. Harga bergerak ke arah paras, tetapi belum ada apa-apa berlaku.'),
         ('Sweeping', 'Trades beyond the level, then closes back inside.', [(0, .8), (.35, .4), (.5, .55), (.65, .02), (.72, .4), (1, .5)], 0.2, 'amber',
          'Two: sweeping. Price trades beyond the level, then closes back inside.', 'Dua: sweep. Harga diniagakan melepasi paras, kemudian ditutup semula di dalam.'),
         ('Break & accept', 'Closes beyond and holds; retests from the other side.', [(0, .85), (.35, .45), (.5, .1), (.65, .02), (.75, .12), (1, -0.1)], 0.2, 'bull',
          'Three: breaking and accepting. Price closes beyond, holds, and retests the level from the other side.', 'Tiga: break dan diterima. Harga ditutup melepasi paras, bertahan, dan retest dari sebelah lain.'),
         ('Rejecting', 'Fails to reach or hold the level; turns away.', [(0, .85), (.4, .35), (.55, .25), (.7, .5), (1, .85)], 0.2, 'bear',
          'Four: rejecting. Price fails near the level and turns away, without trading through it.', 'Empat: rejection. Harga gagal berhampiran paras dan berpatah balik, tanpa melepasinya.'),
         ('Sweep + displacement', 'Sweep followed by strong move and structure shift.', [(0, .7), (.3, .45), (.4, .05), (.48, .4), (.7, .95), (1, 1.0)], 0.2, 'bull',
          'Five: a sweep followed by displacement and a structure shift. This is stronger evidence of a reaction.', 'Lima: sweep diikuti displacement dan peralihan struktur. Ini bukti reaksi yang lebih kukuh.'),
         ('Sweep, no confirmation', 'Wick beyond, but no displacement and no MSS.', [(0, .7), (.3, .45), (.4, .05), (.5, .35), (.7, .25), (1, .3)], 0.2, 'sub',
          'And six: a sweep without meaningful confirmation. A wick alone tells us little.', 'Dan enam: sweep tanpa pengesahan yang bermakna. Wick sahaja tidak banyak memberi maklumat.')]
    for i, (t, bd, pts, lv, c, en, ms) in enumerate(C):
        b = sc.say(en, ms, 0.3)
        r, cc = divmod(i, 3)
        pts2 = [(x, 1 - y) for x, y in pts]
        sc.add(Card(120 + cc * 570, 250 + r * 290, 540, 270, f'{i + 1:02d}', t, bd, c if c != 'sub' else 'border', None, sketch(pts2, 1 - lv, c if c != 'sub' else 'text'), size=24), at=b)
    sc.say('These sketches show the bearish-to-bullish case at sell-side liquidity. At buy-side liquidity, the same six outcomes appear in mirror image.',
           'Lakaran ini menunjukkan kes di sell-side liquidity. Di buy-side liquidity, enam hasil yang sama muncul secara terbalik.')
    return sc


def s_sweep_vs_breakout():
    sc = Scene('8.3', 'Liquidity sweep vs breakout')
    sc.visual = 'Split: LEFT sweep (wick below EQL, close back above, displacement up, MSS). RIGHT breakout (close below, retest from below holds, continuation). Both built progressively.'
    sw = gen(4500, [(6, 4470), (4, 4488), (5, 4468), (4, 4480), (1, 4450, 'wick', 4472), (5, 4505, 'disp'), (4, 4493), (6, 4520)], seed=81, vol=3, wick=2)
    br = gen(4500, [(6, 4470), (4, 4488), (5, 4468), (4, 4480), (4, 4440, 'disp'), (4, 4457), (6, 4418)], seed=82, vol=3, wick=2)
    w = 905
    lev = min(sw.l[sw.ends[0]], sw.l[sw.ends[2]])
    lev2 = min(br.l[br.ends[0]], br.l[br.ends[2]])
    c1 = Chart(sw, 36, 100, w, 770, 'FCPO · 15M · HYPOTHETICAL', 'LIQUIDITY SWEEP', slots=len(sw) + 4, step=10, pmin=4405, pmax=4530, title_color='amber')
    c2 = Chart(br, 36 + w + 38, 100, w, 770, 'FCPO · 15M · HYPOTHETICAL', 'GENUINE BREAKOUT', slots=len(br) + 4, step=10, pmin=4405, pmax=4530, title_color='bear')
    sc.say('This comparison is essential. On both charts, price has made equal lows. Sell-side liquidity rests below.',
           'Perbandingan ini sangat penting. Pada kedua-dua carta, harga membentuk equal low. Sell-side liquidity berada di bawah.')
    sc.add(c1)
    sc.add(c2)
    c1.reveal(sw.ends[3] + 1, dur=3)
    c2.reveal(br.ends[3] + 1, dur=3)
    c1.ann(HLine(lev, sw.ends[0], None, 'cyan', f'EQL · SSL {lev:,}', above=False), delay=1.5)
    c2.ann(HLine(lev2, br.ends[0], None, 'cyan', f'EQL · SSL {lev2:,}', above=False), delay=1.5)
    b = sc.say('On the left, price trades below the lows, but the candle closes back above the level. On the right, price closes below the level with a strong candle.',
               'Di kiri, harga diniagakan di bawah low, tetapi candle ditutup semula di atas paras. Di kanan, harga ditutup di bawah paras dengan candle yang kuat.')
    c1.reveal(sw.ends[4] + 1, at=b, dur=1)
    bk = br.first_close_beyond(br.ends[3], lev2, -1)
    c2.reveal(bk + 1, at=b, dur=1)
    c1.ann(Mark(sw.ends[4], sw.l[sw.ends[4]], 'WICK BEYOND · CLOSE BACK INSIDE', 'amber', 'below', size=15), at=b, delay=1)
    c2.ann(Mark(bk, br.c[bk], 'CLOSE BEYOND', 'bear', 'below', size=15), at=b, delay=1)
    b = sc.say('A wick beyond a level alone is not enough to confirm a reversal. We need to see what comes next.',
               'Wick melepasi paras sahaja tidak cukup untuk mengesahkan reversal. Kita perlu lihat apa yang berlaku seterusnya.')
    c1.ann(Decision(sw.ends[4], 'WHAT COMES NEXT?'), at=b, until=b + 1)
    b = sc.say('On the left, displacement follows upward and price closes above the last swing high: a structure shift. The move below the lows was a sweep.',
               'Di kiri, displacement berlaku ke atas dan harga ditutup di atas swing high terakhir: peralihan struktur. Pergerakan di bawah low itu ialah sweep.')
    c1.reveal(len(sw), at=b, dur=3)
    mi = sw.first_close_beyond(sw.ends[4], sw.h[sw.ends[3]], +1)
    c1.ann(Struct(sw.ends[3], mi, sw.h[sw.ends[3]], 'MSS', 'bull'), at=b, delay=2)
    b = sc.say('On the right, price retests the broken level from below, fails to reclaim it, and continues lower. That is acceptance beyond the level: a genuine breakout.',
               'Di kanan, harga retest paras yang dipecahkan dari bawah, gagal menawannya semula, dan terus turun. Itulah penerimaan di luar paras: breakout yang sebenar.')
    c2.reveal(len(br), at=b, dur=3)
    c2.ann(Mark(br.ends[5], br.h[br.ends[5]], 'RETEST HOLDS BELOW', 'bear', 'above', size=15), at=b, delay=1.5)
    b = sc.say('So, to tell them apart we assess acceptance: closes beyond the level, retests that hold, displacement, and the structure that forms afterwards.',
               'Jadi, untuk membezakannya kita nilai penerimaan: penutupan melepasi paras, retest yang bertahan, displacement, dan struktur yang terbentuk selepas itu.')
    c1.ann(Note('SWEEP: REJECTED + MSS', 0.5, 0.13, 'amber'), at=b)
    c2.ann(Note('BREAKOUT: ACCEPTED BEYOND', 0.5, 0.13, 'bear'), at=b)
    sc.say('And remember: a breakout can also fail later. A genuine breakout today is not a guarantee of continuation tomorrow.',
           'Dan ingat: breakout juga boleh gagal kemudian. Breakout yang sebenar hari ini bukan jaminan kesinambungan esok.')
    return sc


def s_criteria():
    sc = Scene('8.3', 'Sweep vs breakout · criteria')
    sc.visual = 'Comparison table: close, follow-through, retest, structure, what it suggests.'
    sc.say('Here are the criteria side by side.',
           'Ini kriteria secara sebelah-menyebelah.')
    sc.add(Heading('SWEEP vs BREAKOUT', 'How CMI tells them apart', 120, 190, 48))
    cols = [('Criterion', 380), ('Liquidity sweep', 640), ('Genuine breakout', 640)]
    R = [('Candle close', 'Back inside the level', 'Beyond the level'),
         ('Follow-through', 'Displacement in the opposite direction', 'Displacement in the break direction'),
         ('Retest', 'Level reclaimed; price stays back inside', 'Retest from the other side holds'),
         ('Structure after', 'MSS / CHoCH against the probe', 'BOS continuation beyond the level'),
         ('Caution', 'Wick alone is insufficient', 'Breakouts can still fail later')]
    rows = []
    b = sc.say('A sweep closes back inside, is followed by opposite displacement, and produces a structure shift against the probe. A breakout closes beyond, its retest holds, and structure continues in the break direction.',
               'Sweep ditutup semula di dalam, diikuti displacement bertentangan, dan menghasilkan peralihan struktur melawan cubaan itu. Breakout ditutup di luar, retest-nya bertahan, dan struktur berterusan dalam arah break.')
    for i, r in enumerate(R):
        rows.append(dict(cells=list(r), at=b, delay=0.6 * i, colors=['text', 'amber' if i < 4 else 'sub', 'bear' if i < 4 else 'sub']))
    sc.add(Table(cols, rows, 120, 250, 86, 23), at=b)
    sc.say('No single criterion decides it. We look at the combination, and we accept that some cases remain unclear. Unclear means no trade.',
           'Tiada satu kriteria yang memutuskannya. Kita lihat gabungannya, dan kita terima bahawa sesetengah kes kekal tidak jelas. Tidak jelas bermaksud tiada trade.')
    return sc


def s_mapping():
    sc = Scene('8.3', 'Mapping exercise')
    sc.visual = '1H chart from the Level 8 bullish data set; seven mapping steps applied progressively; current price fixed (no future candles).'
    d = mtf_bull()
    H, D = d['H'], d['D']
    nowh = d['h_of_f'](d['f']['sweep'])
    day = d['d_of_h'](nowh)
    ch = Chart(H, 36, 100, 1310, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', 'MULTI-TIMEFRAME LIQUIDITY MAP', slots=len(H) + 12, step=25, n0=nowh, pmin=4400, pmax=4740)
    sc.say('Let us map multi-timeframe liquidity on one chart, in seven steps. We use the one-hour chart from our Level 8 data set, at the moment before the sweep.',
           'Mari petakan liquidity multi-timeframe pada satu carta, dalam tujuh langkah. Kita guna carta 1 jam daripada set data Level 8, pada saat sebelum sweep.')
    sc.add(ch)
    st = []
    b = sc.say('Step one: mark weekly and daily external liquidity. The old daily high above, and the daily range low below.',
               'Langkah satu: tandakan external liquidity weekly dan daily. High daily lama di atas, dan range low daily di bawah.')
    oh = D.h[d['dk']['old']]
    ch.ann(HLine(oh, 0, None, 'purple', f'WEEKLY / DAILY ERL · BSL {oh:,}'), at=b)
    dl = D.l[d['dk']['l3']]
    ch.ann(HLine(dl, 0, None, 'purple', f'DAILY ERL · SSL {dl:,}', above=False), at=b, delay=0.4)
    st.append(dict(text=f'1 · HTF ERL: {oh:,} / {dl:,}', at=b, color='purple'))
    b = sc.say('Step two: mark the previous day high and low.',
               'Langkah dua: tandakan previous day high dan low.')
    pdh, pdl = D.h[day - 1], D.l[day - 1]
    ch.ann(HLine(pdh, 0, None, 'cyan', f'PDH {pdh:,}', lpos='left'), at=b)
    ch.ann(HLine(pdl, 0, None, 'cyan', f'PDL {pdl:,}', lpos='left', above=False), at=b, delay=0.3)
    st.append(dict(text=f'2 · PDH {pdh:,} / PDL {pdl:,}', at=b, color='cyan'))
    b = sc.say('Step three: identify the relevant session highs and lows. Today\'s session low sits just above the one-hour POI.',
               'Langkah tiga: kenal pasti session high dan low yang relevan. Session low hari ini berada tepat di atas POI 1 jam.')
    k0 = (day - len(d['Dp'])) * 8
    si, sv = H.lo(k0, nowh - 1)
    ch.ann(HLine(sv, si, None, 'bull', f'SESSION LOW {sv:,}', above=False), at=b)
    st.append(dict(text=f'3 · Session low {sv:,}', at=b, color='bull'))
    b = sc.say('Step four: mark internal liquidity: the one-hour lower high above, and the fair value gap below inside the range.',
               'Langkah empat: tandakan internal liquidity: lower high 1 jam di atas, dan fair value gap di bawah dalam range.')
    Hp = d['Hp']
    lh = Hp.h[Hp.ends[6]]
    ch.ann(HLine(lh, Hp.ends[6], None, 'blue', f'IRL · 1H LH {lh:,}'), at=b)
    fv = Hp.fvgs(Hp.ends[1], Hp.ends[2], +1)[0]
    ch.ann(Zone(fv[0] - 1, None, fv[1], fv[2], 'blue', 'IRL · 1H FVG', alpha=0.15), at=b, delay=0.3)
    st.append(dict(text=f'4 · IRL: LH {lh:,} · FVG {fv[1]:,}–{fv[2]:,}', at=b, color='blue'))
    cur = H.c[nowh - 1]
    b = sc.say(f'Step five: which levels are closest to current price, around {cur:,}? The session low and the previous day low below, and the one-hour lower high above.',
               f'Langkah lima: paras mana yang paling dekat dengan harga semasa, sekitar {cur:,}? Session low dan previous day low di bawah, dan lower high 1 jam di atas.')
    st.append(dict(text=f'5 · Nearest: session low / PDL / 1H LH', at=b, color='gold'))
    b = sc.say('Step six: write the draw-on-liquidity scenarios. Bullish daily bias: a sweep of the nearby sell-side into the POI, then a draw toward the buy-side above. Alternative: acceptance below the POI.',
               'Langkah enam: tulis senario draw on liquidity. Bias daily bullish: sweep sell-side berdekatan ke dalam POI, kemudian menuju buy-side di atas. Alternatif: penerimaan di bawah POI.')
    ch.ann(Arrow(nowh - 1, cur, nowh + 3, sv - 18, 'amber', 2.5, (6, 5)), at=b)
    ch.ann(Arrow(nowh + 3, sv - 18, nowh + 10, lh - 4, 'bull', 2.5, (6, 5), 'SCENARIO A'), at=b, delay=0.8)
    ch.ann(Arrow(nowh + 3, sv - 18, nowh + 9, dl - 15, 'bear', 2.0, (6, 5), 'SCENARIO B'), at=b, delay=1.4)
    st.append(dict(text='6 · Scenarios A / B written', at=b, color='amber'))
    b = sc.say('Step seven: monitor the reaction when liquidity is reached, on the lower timeframes. The map tells us where to look, not what will happen.',
               'Langkah tujuh: pantau reaksi apabila liquidity dicapai, pada lower timeframe. Peta memberitahu di mana untuk melihat, bukan apa yang akan berlaku.')
    st.append(dict(text='7 · Monitor reaction on 15M / 5M', at=b, color='bull'))
    ch.ann(Decision(nowh - 1, 'MAP COMPLETE · NOW WE WATCH'), at=b)
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'MAPPING · 7 STEPS', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 21, 2.15), at=st[0]['at'])
    return sc


def s_mistakes():
    sc = Scene('8.3', 'Common mistakes')
    sc.visual = 'Seven red mistake cards.'
    sc.say('The most common liquidity mistakes.',
           'Kesilapan liquidity yang paling biasa.')
    sc.add(Heading('LIQUIDITY · COMMON MISTAKES', 'Seven liquidity mistakes', 120, 190, 48))
    M = [('Every high and low is equal', 'Rank levels by timeframe and relevance.', 'One: treating every high and low as equally important.', 'Satu: menganggap setiap high dan low sama penting.'),
         ('Too many levels', 'A cluttered map hides the important ones.', 'Two: marking excessive liquidity levels.', 'Dua: menanda terlalu banyak paras liquidity.'),
         ('Every sweep is manipulation', 'A chart cannot prove intention.', 'Three: assuming every sweep is manipulation.', 'Tiga: menganggap setiap sweep ialah manipulasi.'),
         ('A sweep guarantees reversal', 'Many sweeps continue straight through.', 'Four: assuming a sweep guarantees a reversal.', 'Empat: menganggap sweep menjamin reversal.'),
         ('Sweep vs breakout confusion', 'Judge acceptance, not just the wick.', 'Five: confusing a breakout with a liquidity sweep.', 'Lima: mengelirukan breakout dengan liquidity sweep.'),
         ('Ignoring structure after', 'The reaction matters more than the touch.', 'Six: ignoring market structure after the sweep.', 'Enam: mengabaikan struktur market selepas sweep.'),
         ('IRL / ERL as fixed signals', 'They organise expectations; they do not predict.', 'And seven: treating IRL and ERL as fixed predictive signals.', 'Dan tujuh: menganggap IRL dan ERL sebagai signal ramalan yang tetap.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.25)
        r, c = divmod(i, 4)
        sc.add(Card(120 + c * 425, 250 + r * 290, 405, 260, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=25), at=b)
    return sc


def build():
    sc = [intro(NUM, TITLE, 'BSL · SSL · ERL · IRL · Sweep vs breakout',
                [('Separate market liquidity from SMC liquidity pools', 'In this video you will separate market liquidity from SMC liquidity pools,', 'Dalam video ini anda akan membezakan market liquidity daripada kolam liquidity SMC,'),
                 ('Define ERL and IRL and the liquidity hierarchy', 'define external and internal range liquidity and the liquidity hierarchy,', 'mentakrifkan external dan internal range liquidity serta hierarki liquidity,'),
                 ('Tell a liquidity sweep from a genuine breakout', 'tell a liquidity sweep from a genuine breakout,', 'membezakan liquidity sweep daripada breakout yang sebenar,'),
                 ('Build a multi-timeframe liquidity map', 'and build a complete multi-timeframe liquidity map.', 'dan membina peta liquidity multi-timeframe yang lengkap.')],
                ['This is Subtopic Three of Level 8: Multi-Timeframe Liquidity.',
                 'Liquidity helps us understand possible price objectives and where reactions may occur, on every timeframe.'],
                ['Ini Subtopik Tiga Level 8: Multi-Timeframe Liquidity.',
                 'Liquidity membantu kita memahami kemungkinan sasaran harga dan di mana reaksi mungkin berlaku, pada setiap timeframe.'],
                art=tf_stack_art),
          s_understanding(), s_bsl_ssl_types(), s_erl_irl(), s_hierarchy(), s_interaction(), s_sweep_vs_breakout(), s_criteria(), s_mapping(), s_mistakes(),
          statement('KEY TAKEAWAY', 'Map liquidity on every timeframe.', 'Judge the reaction, not the touch.',
                    [('Map liquidity on every timeframe, from monthly levels down to intraday swings.', 'Petakan liquidity pada setiap timeframe, dari paras bulanan hingga swing intraday.'),
                     ('But judge the reaction, not the touch. Acceptance, displacement and structure tell us what a level meant.', 'Tetapi nilai reaksinya, bukan sentuhannya. Penerimaan, displacement dan struktur memberitahu maksud sesuatu paras.')]),
          quiz([('What is the difference between IRL and ERL?', 'One. What is the difference between internal and external range liquidity?', 'Satu. Apakah perbezaan antara internal dan external range liquidity?'),
                ('How do BSL and SSL form?', 'Two. How do buy-side and sell-side liquidity form?', 'Dua. Bagaimana buy-side dan sell-side liquidity terbentuk?'),
                ('What is the difference between a liquidity sweep and a breakout?', 'Three. What is the difference between a liquidity sweep and a breakout?', 'Tiga. Apakah perbezaan antara liquidity sweep dan breakout?'),
                ('Why is a wick beyond a level not enough?', 'Four. Why is a wick beyond a level not enough to confirm a reversal?', 'Empat. Kenapa wick melepasi paras tidak cukup untuk mengesahkan reversal?')]),
          summary('MTF liquidity — what to remember', [
              ('Market liquidity ≠ SMC liquidity pools', 'Market liquidity and SMC liquidity pools are different ideas.', 'Market liquidity dan kolam liquidity SMC ialah idea yang berbeza.'),
              ('BSL above highs · SSL below lows', 'Buy-side above highs, sell-side below lows.', 'Buy-side di atas high, sell-side di bawah low.'),
              ('ERL = beyond range · IRL = inside range', 'External range liquidity is beyond the range; internal is inside it.', 'External range liquidity berada di luar range; internal di dalamnya.'),
              ('Hierarchy: broad HTF vs local LTF — no fixed order', 'Map the hierarchy, but do not assume an order.', 'Petakan hierarki, tetapi jangan andaikan urutan.'),
              ('Sweep: close back inside + opposite displacement', 'A sweep closes back inside, then displaces the other way.', 'Sweep ditutup semula di dalam, kemudian displace ke arah bertentangan.'),
              ('Breakout: acceptance beyond + retest holds', 'A breakout is accepted beyond the level, and its retest holds.', 'Breakout diterima di luar paras, dan retest-nya bertahan.')]),
          up_next(6, 'Understanding POI',
                  'In Video 6 we begin Subtopic Four: the six types of point of interest, with CMI definitions, bullish and bearish examples.',
                  'Dalam Video 6 kita mulakan Subtopik Empat: enam jenis point of interest, dengan definisi CMI, contoh bullish dan bearish.',
                  [('OB · FVG', 'Order block, fair value gap', 'purple'), ('BB · MB · RB', 'Breaker, mitigation, rejection', 'blue'), ('Supply & Demand', 'Classic zones', 'gold')]),
          references([REF['harris'], REF['cme'], REF['wyckoff'], REF['ict'], REF['bursa']],
                     'References are on screen. Harris and CME Group cover liquidity as a microstructure concept; Wyckoff\'s springs and upthrusts are the classical ancestor of the sweep idea.',
                     'Rujukan dipaparkan di skrin. Harris dan CME Group membincangkan liquidity sebagai konsep mikrostruktur; spring dan upthrust Wyckoff ialah asal usul klasik idea sweep.'),
          disclaimer('Seterusnya: Video 06 — Understanding POI')]
    return dict(id='ep05', file='CMI_L8_V05_Multi_Timeframe_Liquidity.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Separate market liquidity from SMC liquidity pools', 'Identify BSL/SSL sources (EQH/EQL, PDH/PDL, PWH/PWL, session, HTF)', 'Define ERL and IRL', 'Map the liquidity hierarchy', 'Distinguish sweep vs breakout', 'Complete a 7-step liquidity map'],
                quiz=[('IRL vs ERL?', 'ERL is liquidity beyond the current dealing range boundaries (above range high / below range low). IRL is inside the range: internal swings, internal EQH/EQL and, in some ICT frameworks, FVGs.'),
                      ('How do BSL and SSL form?', 'BSL: buy-stops and breakout buy orders inferred above highs, EQH, PDH, PWH, session and HTF highs. SSL: sell-stops and breakout sells inferred below the corresponding lows.'),
                      ('Sweep vs breakout?', 'Sweep: trades beyond, closes back inside, opposite displacement, structure shift against the probe. Breakout: close beyond, retest from the other side holds (acceptance), continuation BOS. Either can still fail.'),
                      ('Why is a wick not enough?', 'A wick only shows price traded there briefly. Without displacement, a reclaim and a structure shift, there is no evidence that the market rejected the level.')],
                exercise='Exercise 3 — Map Multi-Timeframe Liquidity. On FCPO 1H: (1) mark Weekly/Daily ERL; (2) PDH/PDL; (3) session highs/lows; (4) IRL (internal swings, FVGs); (5) list the 3 nearest levels with distance in points; (6) write Scenario A (bias direction) and Scenario B (invalidation); (7) state what LTF evidence you need when a level is reached. Answer guide: no more than ~8 levels; every level labelled with its timeframe; scenarios must include invalidation.',
                refs=[r[0] for r in (REF['harris'], REF['cme'], REF['wyckoff'], REF['ict'], REF['bursa'])])
