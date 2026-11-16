"""VIDEO 07 — Professional POI Selection (Subtopic 4: C–J)."""
from .common import *  # noqa
from .mtfdata import mtf_bull, mtf_bear, mtf_shift

NUM, TITLE = 7, 'Professional POI Selection'


def s_alignment():
    sc = Scene('8.4', 'POI alignment with HTF')
    sc.visual = '1H chart (Level 8 data) with daily range EQ overlay; candidate POIs in discount vs premium; alignment checklist.'
    d = mtf_bull()
    H, Hp = d['H'], d['Hp']
    nowh = d['h_of_f'](d['f']['sweep'])
    ch = Chart(H, 36, 100, 1310, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', 'POI ALIGNMENT WITH HTF', slots=len(H) + 6, step=25, n0=nowh)
    sc.say('The first question for any POI: does it make sense inside the higher-timeframe context?',
           'Soalan pertama untuk mana-mana POI: adakah ia munasabah dalam konteks higher timeframe?')
    sc.add(ch)
    st = []
    b = sc.say('We overlay the daily dealing range on the one-hour chart. Equilibrium splits it into premium and discount.',
               'Kita letakkan dealing range daily pada carta 1 jam. Equilibrium membahagikannya kepada premium dan discount.')
    ch.ann(Range(0, None, 4440, 4620, labels=True, pd=True, eq=True), at=b)
    st.append(dict(text='Inside the HTF dealing range?', at=b, color='gold'))
    b = sc.say('With a bullish daily bias, a bullish POI in discount agrees with the context. A bullish POI in premium is buying at a relatively expensive location.',
               'Dengan bias daily bullish, POI bullish dalam discount selari dengan konteks. POI bullish dalam premium bermaksud membeli di lokasi yang relatif mahal.')
    st.append(dict(text='Premium / discount fits the bias?', at=b, color='bull'))
    ob = Hp.ends[1]
    fv = Hp.fvgs(ob, Hp.ends[2], +1)[0]
    ch.ann(Zone(ob, None, Hp.l[ob], fv[2], 'purple', 'POI IN DISCOUNT', alpha=0.2), at=b, delay=0.4)
    fv2 = max(Hp.fvgs(Hp.ends[3], Hp.ends[4], +1), key=lambda z: z[2] - z[1])
    ch.ann(Zone(fv2[0] - 1, None, fv2[1], fv2[2], 'sub', 'POI IN PREMIUM', alpha=0.12), at=b, delay=0.8)
    b = sc.say('Next: is the POI near liquidity, so that a sweep into it is possible? And does it sit at a meaningful structural level, such as the origin of the break of structure?',
               'Seterusnya: adakah POI berhampiran liquidity, supaya sweep ke dalamnya mungkin berlaku? Dan adakah ia berada di paras struktur yang bermakna, seperti asal break of structure?')
    ch.ann(HLine(4479, Hp.ends[7], None, 'cyan', 'SSL NEAR POI', above=False), at=b, delay=0.3)
    st.append(dict(text='Near liquidity that can be swept?', at=b, color='cyan'))
    st.append(dict(text='At a meaningful structural level?', at=b, delay=0.8, color='gold'))
    b = sc.say('And finally: is it consistent with the current directional hypothesis? A lower-timeframe POI with no higher-timeframe context may be valid on its own chart, but less relevant to this plan.',
               'Dan akhir sekali: adakah ia konsisten dengan hipotesis arah semasa? POI lower timeframe tanpa konteks higher timeframe mungkin sah pada cartanya sendiri, tetapi kurang relevan dengan pelan ini.')
    st.append(dict(text='Consistent with the hypothesis?', at=b, color='bull'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'HTF ALIGNMENT CHECK', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.2), at=st[0]['at'])
    return sc


def s_displacement():
    sc = Scene('8.4', 'Displacement & POI quality')
    sc.visual = 'Split: LEFT true displacement (expanded bodies, BOS, FVG). RIGHT one large candle inside a range, no BOS, no FVG (next candle overlaps).'
    a = gen(4520, [(4, 4510), (3, 4522), (4, 4500), (5, 4560, 'disp'), (4, 4545), (4, 4566)], seed=201, vol=3, wick=2)
    bb = gen(4520, [(4, 4508), (3, 4525), (4, 4506), (1, 4522), (1, 4508), (3, 4520), (3, 4507), (3, 4518)], seed=202, vol=3, wick=2)
    w = 905
    c1 = Chart(a, 36, 100, w, 770, 'FCPO · 15M · HYPOTHETICAL', 'DISPLACEMENT', slots=len(a) + 4, step=10, pmin=4485, pmax=4580, title_color='bull')
    c2 = Chart(bb, 36 + w + 38, 100, w, 770, 'FCPO · 15M · HYPOTHETICAL', 'JUST A LARGE CANDLE', slots=len(bb) + 4, step=10, pmin=4485, pmax=4580, title_color='amber')
    sc.say('POI quality depends heavily on displacement. Displacement is a strong, directional move with expanded candle bodies that breaks meaningful structure.',
           'Kualiti POI sangat bergantung pada displacement. Displacement ialah pergerakan berarah yang kuat dengan body candle yang mengembang dan memecah struktur yang bermakna.')
    sc.add(c1)
    sc.add(c2)
    c1.reveal(len(a), dur=4)
    c2.reveal(len(bb), dur=4)
    b = sc.say('On the left, several large-bodied candles move in one direction, close beyond the previous swing high, and leave a fair value gap.',
               'Di kiri, beberapa candle berbody besar bergerak ke satu arah, ditutup melepasi swing high sebelumnya, dan meninggalkan fair value gap.')
    E = a.ends
    bi = a.first_close_beyond(E[2], a.h[E[1]], +1)
    c1.ann(Struct(E[1], bi, a.h[E[1]], 'BOS', 'bull'), at=b)
    fv = a.fvg(E[2] + 1, E[3], +1)
    c1.ann(fvg_zone(a, fv[0], +1, 'blue', 'FVG', extend=None), at=b, delay=0.6)
    c1.ann(VBand(E[2] + 1, E[3], 'bull', 'DISPLACEMENT', 0.08), at=b, delay=0.3)
    b = sc.say('On the right, there is one large candle, but it stays inside the range, does not break structure, and the next candle overlaps it completely. No gap is left.',
               'Di kanan, ada satu candle besar, tetapi ia kekal dalam range, tidak memecah struktur, dan candle seterusnya bertindih sepenuhnya. Tiada gap ditinggalkan.')
    big = bb.ends[3]
    c2.ann(Mark(big, bb.h[big], 'LARGE CANDLE', 'amber', 'above', size=15), at=b)
    c2.ann(HLine(bb.h[bb.ends[1]], 0, None, 'text', 'RANGE HIGH · NOT BROKEN', dash=(4, 4)), at=b, delay=0.5)
    b = sc.say('That is ordinary volatility, not displacement. The origin of a meaningful displacement may be studied as a POI. The origin of a random large candle usually should not.',
               'Itu volatiliti biasa, bukan displacement. Asal displacement yang bermakna boleh dikaji sebagai POI. Asal candle besar yang rawak biasanya tidak patut.')
    c1.ann(Note('ORIGIN MAY BE A POI', 0.5, 0.13, 'bull'), at=b)
    c2.ann(Note('NO STRUCTURE · NO POI', 0.5, 0.13, 'amber'), at=b)
    sc.say('And even strong displacement does not prove institutional participation. A large candle is evidence of urgency in price, not a view of who traded.',
           'Malah displacement yang kuat tidak membuktikan penyertaan institusi. Candle besar ialah bukti kesegeraan harga, bukan gambaran siapa yang trade.')
    return sc


def s_fresh():
    sc = Scene('8.4', 'Fresh vs tested · invalidation')
    sc.visual = 'One OB tracked over time: fresh → first test → second test → body close through = invalidated. Side panel with CMI invalidation rules.'
    s = gen(4520, [(4, 4508), (5, 4478), (5, 4540, 'disp'), (4, 4482), (4, 4522), (4, 4483), (3, 4504), (4, 4462), (3, 4470)], seed=211, vol=3, wick=2)
    E = s.ends
    ob = s.last_opposite(E[1], +1)
    zl, zh = s.l[ob], s.h[ob]
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · 15M · HYPOTHETICAL ILLUSTRATION', 'FRESH → TESTED → INVALIDATED', slots=len(s) + 6, step=10)
    sc.say('Next, freshness. A fresh POI is one that price has not yet returned to since it formed.',
           'Seterusnya, kesegaran. POI yang fresh ialah POI yang belum dikunjungi semula oleh harga sejak ia terbentuk.')
    sc.add(ch)
    ch.reveal(E[2] + 1, dur=3)
    ch.ann(Zone(ob, None, zl, zh, 'purple', 'OB · FRESH', alpha=0.22), delay=2.5, until=None)
    st = []
    b = sc.say('When price revisits the zone and reacts, the POI becomes tested. That first reaction is often the most informative one.',
               'Apabila harga kembali ke zon dan bertindak balas, POI itu menjadi tested. Reaksi pertama itu selalunya yang paling bermaklumat.')
    ch.reveal(E[4] + 1, at=b, dur=2)
    ch.ann(Mark(E[3], s.l[E[3]], 'TEST 1', 'purple', 'below', size=15), at=b, delay=1)
    st.append(dict(text='Fresh: not yet revisited', at=0, color='purple'))
    st.append(dict(text='Tested: price returned and reacted', at=b, color='gold'))
    b = sc.say('Each further test may change the interpretation. Repeated tests can absorb the orders that caused the first reaction, so the zone may weaken.',
               'Setiap ujian seterusnya mungkin mengubah tafsiran. Ujian berulang boleh menyerap order yang menyebabkan reaksi pertama, jadi zon itu mungkin melemah.')
    ch.reveal(E[6] + 1, at=b, dur=2)
    ch.ann(Mark(E[5], s.l[E[5]], 'TEST 2', 'amber', 'below', size=15), at=b, delay=1)
    st.append(dict(text='Repeated tests may weaken a zone', at=b, color='amber'))
    b = sc.say('But freshness alone never guarantees a reaction. A fresh zone can fail on its very first touch.',
               'Tetapi kesegaran sahaja tidak pernah menjamin reaksi. Zon fresh boleh gagal pada sentuhan pertamanya.')
    st.append(dict(text='Fresh ≠ guaranteed reaction', at=b, color='bear'))
    b = sc.say('Being tested is not the same as being invalidated. Under the CMI rule, a zone is invalidated when a candle body closes beyond its far edge, showing acceptance beyond the zone.',
               'Diuji tidak sama dengan terbatal. Mengikut peraturan CMI, zon terbatal apabila body candle ditutup melepasi tepi jauhnya, menunjukkan penerimaan di luar zon.')
    ch.reveal(len(s), at=b, dur=2)
    bk = s.first_close_beyond(E[6], zl, -1)
    ch.ann(Mark(bk, s.c[bk], 'BODY CLOSE BELOW · INVALIDATED', 'bear', 'below', size=15), at=b, delay=1.6)
    ch.retitle('OB · INVALIDATED', 'bear', at=b, delay=1.6)
    st.append(dict(text='Invalid: body close beyond far edge', at=b, color='bear'))
    b = sc.say('Invalidation criteria must be defined before entering, not adjusted afterwards. And stop-loss placement must follow your own tested methodology, not a feeling.',
               'Kriteria invalidation mesti ditentukan sebelum masuk, bukan diubah selepas itu. Dan penempatan stop-loss mesti mengikut metodologi anda yang telah diuji, bukan perasaan.')
    st.append(dict(text='Define invalidation before entry', at=b, color='text'))
    st.append(dict(text='Stop follows tested methodology', at=b, delay=0.6, color='text'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'STATUS & INVALIDATION', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.15), at=0)
    return sc


CRIT = [('1', 'HTF alignment', 'Does the POI agree with HTF bias and range?'),
        ('2', 'Market structure', 'Did this area cause a BOS / MSS?'),
        ('3', 'Premium / discount', 'Discount for longs, premium for shorts?'),
        ('4', 'Liquidity relationship', 'Is liquidity nearby to be swept first?'),
        ('5', 'Displacement quality', 'Did price leave with genuine displacement?'),
        ('6', 'POI clarity', 'Are the boundaries clear and objective?'),
        ('7', 'Freshness / mitigation', 'Fresh, tested once, or repeatedly tested?'),
        ('8', 'Distance to target', 'Enough room to opposing liquidity?'),
        ('9', 'Stop-loss feasibility', 'Can a logical stop sit beyond it?'),
        ('10', 'Risk-to-reward', 'Is the potential R:R acceptable for the plan?')]


def s_matrix():
    sc = Scene('8.4', 'POI evaluation matrix')
    sc.visual = 'Ten-criterion CMI POI evaluation matrix with guiding question per criterion; amber label: illustrative training framework.'
    sc.say('To choose between POIs consistently, CMI uses an evaluation matrix of ten criteria.',
           'Untuk memilih antara POI secara konsisten, CMI menggunakan matriks penilaian sepuluh kriteria.')
    sc.add(Heading('CMI POI EVALUATION MATRIX', 'Ten questions before a POI earns attention', 120, 170, 44))
    cols = [('#', 80), ('Criterion', 420), ('Question to ask', 1180)]
    narr = [('One, higher-timeframe alignment. Two, market structure: did this area cause a break?', 'Satu, keselarasan higher timeframe. Dua, struktur market: adakah kawasan ini menyebabkan break?'),
            ('Three, premium or discount. Four, its relationship to liquidity.', 'Tiga, premium atau discount. Empat, hubungannya dengan liquidity.'),
            ('Five, displacement quality. Six, clarity of the zone boundaries.', 'Lima, kualiti displacement. Enam, kejelasan sempadan zon.'),
            ('Seven, freshness or previous mitigation. Eight, distance to the opposing liquidity or target.', 'Tujuh, kesegaran atau mitigasi sebelumnya. Lapan, jarak ke liquidity bertentangan atau sasaran.'),
            ('Nine, whether a logical stop-loss is feasible. And ten, the potential risk to reward.', 'Sembilan, sama ada stop-loss yang logik boleh diletakkan. Dan sepuluh, potensi nisbah risiko kepada ganjaran.')]
    rows = []
    for j, (en, ms) in enumerate(narr):
        b = sc.say(en, ms, 0.3)
        for k in range(2):
            c = CRIT[2 * j + k]
            rows.append(dict(cells=list(c), at=b, delay=0.8 * k, colors=['gold', 'text', 'sub']))
    sc.add(Table(cols, rows, 120, 220, 56, 21), at=rows[0]['at'])
    b = sc.say('There is no universal score that guarantees a profitable trade. If you score these criteria, treat it as an illustrative CMI training framework that must be tested on your own data.',
               'Tiada skor universal yang menjamin trade yang menguntungkan. Jika anda memberi skor kepada kriteria ini, anggap ia sebagai rangka kerja latihan CMI yang ilustratif dan mesti diuji pada data anda sendiri.')
    sc.add(Pill('ILLUSTRATIVE CMI TRAINING FRAMEWORK · REQUIRES TESTING · NOT A GUARANTEE', W / 2, 862, 'amber', 16), at=b)
    return sc


def s_ranking():
    sc = Scene('8.4', 'POI ranking')
    sc.visual = '1H chart with POI A (HTF-aligned OB+FVG in discount near SSL), B (minor FVG in premium, no HTF origin), C (tested, little room to target); matrix comparison.'
    d = mtf_bull()
    H, Hp = d['H'], d['Hp']
    nowh = d['h_of_f'](d['f']['sweep'])
    ch = Chart(H, 36, 100, 1060, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', 'RANKING THREE POIs', slots=len(H) + 4, step=25, n0=nowh)
    ob = Hp.ends[1]
    fvA = Hp.fvgs(ob, Hp.ends[2], +1)[0]
    fvB = max(Hp.fvgs(Hp.ends[3], Hp.ends[4], +1), key=lambda z: z[2] - z[1])
    obC = Hp.last_opposite(Hp.ends[5], +1)
    tgt = Hp.h[Hp.ends[6]]
    sc.say('Let us rank three possible bullish POIs on the same one-hour chart.',
           'Mari susun keutamaan tiga POI bullish yang mungkin pada carta 1 jam yang sama.')
    sc.add(ch)
    ch.ann(HLine(tgt, Hp.ends[6], None, 'cyan', f'TARGET · BSL {tgt:,}'), delay=0.5)
    b = sc.say('POI A is the order block and fair value gap that caused the daily break. It is in discount, just below sell-side liquidity, and still fresh.',
               'POI A ialah order block dan fair value gap yang menyebabkan break daily. Ia dalam discount, betul-betul di bawah sell-side liquidity, dan masih fresh.')
    ch.ann(Zone(ob, None, Hp.l[ob], fvA[2], 'bull', 'A', alpha=0.2), at=b)
    b = sc.say('POI B is a minor gap inside the later rally. It sits in premium and did not cause any higher-timeframe break. Its context is weak.',
               'POI B ialah gap kecil dalam kenaikan kemudian. Ia berada dalam premium dan tidak menyebabkan sebarang break higher timeframe. Konteksnya lemah.')
    ch.ann(Zone(fvB[0] - 1, None, fvB[1], fvB[2], 'amber', 'B', alpha=0.2), at=b)
    b = sc.say(f'POI C is a small block just below the target. Price has already traded back through it, and there are only about {tgt - Hp.h[obC]} points to the target.',
               f'POI C ialah blok kecil betul-betul di bawah sasaran. Harga sudah diniagakan kembali menembusinya, dan hanya kira-kira {tgt - Hp.h[obC]} mata ke sasaran.')
    ch.ann(Zone(obC, None, Hp.l[obC], Hp.h[obC], 'bear', 'C', alpha=0.2), at=b)
    cols = [('Criterion', 330), ('A', 110), ('B', 110), ('C', 110)]
    Y, N, M = '✓', '✗', '~'
    M_ = [('HTF alignment', Y, N, M), ('Structure (caused BOS)', Y, N, N), ('Discount (for longs)', Y, N, N), ('Liquidity nearby', Y, N, M),
          ('Displacement quality', Y, M, M), ('Freshness', Y, M, N), ('Room to target', Y, M, N), ('Stop feasibility / R:R', Y, M, N)]
    b = sc.say('Running the matrix, A meets every criterion, B fails most context criteria, and C fails on freshness and distance to target.',
               'Menggunakan matriks, A memenuhi setiap kriteria, B gagal kebanyakan kriteria konteks, dan C gagal dari segi kesegaran dan jarak ke sasaran.')
    rows = [dict(cells=list(r), at=b, delay=0.3 * i, colors=['text', 'bull', 'amber', 'bear']) for i, r in enumerate(M_)]
    sc.add(Table(cols, rows, 1120, 100, 76, 20), at=b)
    b = sc.say('So under this trading plan, A is the priority. B and C are not wrong in themselves, they are simply less relevant to a bullish daily plan. Ranking is relative to the plan.',
               'Jadi di bawah pelan trading ini, A ialah keutamaan. B dan C tidak salah dengan sendirinya, cuma kurang relevan dengan pelan daily bullish. Penyusunan keutamaan adalah relatif kepada pelan.')
    ch.ann(Note('PRIORITY: A', 0.5, 0.13, 'bull'), at=b)
    return sc


def s_demo(d, bull):
    """Practical POI selection walkthrough on a 1H chart."""
    o = 'bull' if bull else 'bear'
    H, Hp = d['H'], d['Hp']
    nowh = d['h_of_f'](d['f']['sweep'])
    sg = 1 if bull else -1
    ob = Hp.ends[1]
    fv = Hp.fvgs(ob, Hp.ends[2], sg)[0]
    if bull:
        plo, phi = Hp.l[ob], fv[2]
        rlo, rhi = d['D'].l[d['dk']['l3']], max(Hp.h)
    else:
        plo, phi = fv[1], Hp.h[ob]
        rlo, rhi = min(Hp.l), d['D'].h[d['dk']['l3']]
    sweep = d['F'].l[d['f']['sweep']] if bull else d['F'].h[d['f']['sweep']]
    eq = d['Qp'].l[d['Qp'].ends[2]] if bull else d['Qp'].h[d['Qp'].ends[2]]
    W_ = 'BULLISH' if bull else 'BEARISH'
    sc = Scene('8.4', f'{W_} POI selection demo')
    sc.visual = f'{W_} 1H walkthrough on a separate hypothetical data set: HTF {"discount" if bull else "premium"} → map {"SSL" if bull else "BSL"} → displacement → select POI → liquidity interaction → wait for LTF confirmation.'
    ch = Chart(H, 36, 100, 1310, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', f'{W_} POI SELECTION', slots=len(H) + 6, step=25, n0=nowh - 1)
    st = []
    sc.say(f'Now a practical {"bullish" if bull else "bearish"} POI selection, on a separate hypothetical data set.',
           f'Kini pemilihan POI {"bullish" if bull else "bearish"} secara praktikal, pada set data hipotetikal yang berasingan.')
    sc.add(ch)
    b = sc.say(f'One: identify the higher-timeframe {"discount" if bull else "premium"}. The daily range is drawn on the one-hour chart.',
               f'Satu: kenal pasti {"discount" if bull else "premium"} higher timeframe. Range daily dilukis pada carta 1 jam.')
    ch.ann(Range(0, None, rlo, rhi, labels=False, pd=True, eq=True), at=b)
    st.append(dict(text=f'1 · HTF {"discount" if bull else "premium"}', at=b, color=o))
    b = sc.say(f'Two: map the {"sell-side" if bull else "buy-side"} liquidity: the equal {"lows" if bull else "highs"} of the current session.',
               f'Dua: petakan liquidity {"sell-side" if bull else "buy-side"}: equal {"low" if bull else "high"} sesi semasa.')
    ch.ann(HLine(eq, Hp.ends[7], None, 'cyan', f'{"SSL" if bull else "BSL"} {eq:,}', above=not bull), at=b)
    st.append(dict(text=f'2 · {"SSL" if bull else "BSL"} mapped at {eq:,}', at=b, color='cyan'))
    b = sc.say('Three: identify the displacement that broke structure in the direction of the bias.',
               'Tiga: kenal pasti displacement yang memecah struktur searah dengan bias.')
    ch.ann(VBand(ob + 1, Hp.ends[2], o, 'DISPLACEMENT', 0.08), at=b)
    st.append(dict(text='3 · Displacement identified', at=b, color=o))
    b = sc.say(f'Four: select the POI at its origin: the order block and first fair value gap, from {plo:,} to {phi:,}. It is in the right half of the range and beyond the liquidity.',
               f'Empat: pilih POI di asalnya: order block dan fair value gap pertama, dari {plo:,} hingga {phi:,}. Ia berada di separuh range yang betul dan di luar liquidity.')
    ch.ann(Zone(ob, None, plo, phi, 'purple', f'SELECTED POI {plo:,}–{phi:,}', alpha=0.2), at=b)
    st.append(dict(text=f'4 · POI {plo:,}–{phi:,} selected', at=b, color='purple'))
    b = sc.say('Five: observe the liquidity interaction. Price sweeps the session liquidity and trades into the POI.',
               'Lima: perhatikan interaksi liquidity. Harga sweep liquidity sesi dan masuk ke dalam POI.')
    ch.reveal(nowh + 1, at=b, dur=1.2)
    ch.ann(Mark(nowh, sweep, 'SWEEP INTO POI', 'amber', 'below' if bull else 'above', size=15), at=b, delay=1.2)
    st.append(dict(text='5 · Sweep into POI observed', at=b, color='amber'))
    b = sc.say('Six: wait for lower-timeframe confirmation. Selecting the POI was analysis. The decision to enter belongs to the fifteen-minute and five-minute charts, in the next video.',
               'Enam: tunggu pengesahan lower timeframe. Memilih POI ialah analisis. Keputusan untuk masuk adalah milik carta 15 minit dan 5 minit, dalam video seterusnya.')
    ch.ann(Decision(nowh, 'WAIT FOR 15M / 5M CONFIRMATION'), at=b)
    st.append(dict(text='6 · Wait for LTF confirmation', at=b, color='bull'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, f'{W_} · 6 STEPS', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.2), at=st[0]['at'])
    return sc


def s_mistakes():
    sc = Scene('8.4', 'Common mistakes')
    sc.visual = 'Eight red mistake cards (4 + 4).'
    sc.say('The most common POI selection mistakes.',
           'Kesilapan pemilihan POI yang paling biasa.')
    sc.add(Heading('POI SELECTION · COMMON MISTAKES', 'Eight POI mistakes', 120, 170, 46))
    M = [('Every opposite candle = OB', 'No displacement, no BOS, no OB.', 'One: marking every opposite-colour candle as an order block.', 'Satu: menanda setiap candle berlainan warna sebagai order block.'),
         ('Every FVG is tradable', 'Most gaps are not worth trading.', 'Two: treating every fair value gap as tradable.', 'Dua: menganggap setiap fair value gap boleh di-trade.'),
         ('No HTF context', 'A POI must fit the bigger picture.', 'Three: selecting POIs without higher-timeframe context.', 'Tiga: memilih POI tanpa konteks higher timeframe.'),
         ('Ignoring liquidity', 'Where is the sweep? Where is the target?', 'Four: ignoring liquidity.', 'Empat: mengabaikan liquidity.'),
         ('Ignoring displacement', 'Weak origin, weak POI.', 'Five: ignoring displacement.', 'Lima: mengabaikan displacement.'),
         ('Touch = entry', 'A touch is a location, not a signal.', 'Six: entering simply because price touches a POI.', 'Enam: masuk semata-mata kerana harga menyentuh POI.'),
         ('Using an invalidated zone', 'Body closed through? It is gone.', 'Seven: using a zone that has already been invalidated.', 'Tujuh: menggunakan zon yang sudah terbatal.'),
         ('Poor stop or target position', 'No room, no trade.', 'And eight: choosing a POI with poor stop-loss or target positioning.', 'Dan lapan: memilih POI dengan kedudukan stop-loss atau sasaran yang lemah.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.25)
        r, c = divmod(i, 4)
        sc.add(Card(120 + c * 425, 230 + r * 300, 405, 270, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=25), at=b)
    return sc


def build():
    db = mtf_shift(mtf_bull(seed=31), -160)
    ds = mtf_shift(mtf_bear(seed=37), 120)
    sc = [intro(NUM, TITLE, 'Alignment · Displacement · Freshness · Ranking',
                [('Check a POI against the HTF context', 'In this video you will learn to check a POI against the higher-timeframe context,', 'Dalam video ini anda akan belajar menyemak POI berdasarkan konteks higher timeframe,'),
                 ('Judge displacement and freshness', 'judge displacement quality and freshness,', 'menilai kualiti displacement dan kesegaran,'),
                 ('Use the ten-criterion CMI matrix to rank POIs', 'use the ten-criterion CMI matrix to rank POIs,', 'menggunakan matriks sepuluh kriteria CMI untuk menyusun keutamaan POI,'),
                 ('Define POI invalidation in advance', 'and define POI invalidation in advance.', 'dan menentukan invalidation POI lebih awal.')],
                ['This is the second part of Subtopic Four: professional POI selection.',
                 'A chart is full of possible zones. The skill is choosing the few that matter for your plan.'],
                ['Ini bahagian kedua Subtopik Empat: pemilihan POI secara profesional.',
                 'Carta dipenuhi zon yang mungkin. Kemahirannya ialah memilih beberapa yang penting untuk pelan anda.'],
                art=tf_stack_art),
          s_alignment(), s_displacement(), s_fresh(), s_matrix(), s_ranking(), s_demo(db, True), s_demo(ds, False), s_mistakes(),
          statement('KEY TAKEAWAY', 'Select few. Rank by context.', 'Define invalidation before you need it.',
                    [('Professional POI selection means choosing few zones, and ranking them by context.', 'Pemilihan POI profesional bermaksud memilih sedikit zon, dan menyusunnya mengikut konteks.'),
                     ('And defining what invalidates each one before you ever need to know.', 'Dan menentukan apa yang membatalkan setiap satu sebelum anda perlu mengetahuinya.')]),
          quiz([('What factors should be considered when selecting a POI?', 'One. What factors should be considered when selecting a POI?', 'Satu. Apakah faktor yang perlu dipertimbangkan semasa memilih POI?'),
                ('What is the difference between displacement and a large candle?', 'Two. What is the difference between displacement and an ordinary large candle?', 'Dua. Apakah perbezaan antara displacement dan candle besar biasa?'),
                ('What is the difference between a tested and an invalidated POI?', 'Three. What is the difference between a tested POI and an invalidated POI?', 'Tiga. Apakah perbezaan antara POI yang diuji dan POI yang terbatal?'),
                ('Why might POI C be rejected even though it is a valid zone?', 'Four. Why might a valid zone still be rejected for a plan?', 'Empat. Kenapa zon yang sah masih mungkin ditolak untuk sesuatu pelan?')]),
          summary('POI selection — what to remember', [
              ('Check HTF alignment first', 'Check higher-timeframe alignment first.', 'Semak keselarasan higher timeframe dahulu.'),
              ('Displacement ≠ any large candle', 'Displacement is not just any large candle.', 'Displacement bukan sekadar candle besar.'),
              ('Tested ≠ invalidated (body close beyond)', 'Tested is not invalidated; a body close beyond is.', 'Diuji bukan terbatal; penutupan body di luar ialah terbatal.'),
              ('10-criterion matrix — illustrative, test it', 'Use the ten-criterion matrix as an illustrative, tested framework.', 'Gunakan matriks sepuluh kriteria sebagai rangka kerja ilustratif yang diuji.'),
              ('Rank relative to the plan', 'Rank POIs relative to your plan.', 'Susun keutamaan POI relatif kepada pelan anda.'),
              ('POI selected → still wait for LTF confirmation', 'And after selecting a POI, still wait for lower-timeframe confirmation.', 'Dan selepas memilih POI, tetap tunggu pengesahan lower timeframe.')]),
          up_next(8, 'Entry Timeframe Alignment',
                  'In Video 8 we begin Subtopic Five: aligning lower-timeframe entries with the bias and the selected POI.',
                  'Dalam Video 8 kita mulakan Subtopik Lima: menyelaraskan entry lower timeframe dengan bias dan POI yang dipilih.',
                  [('MSS · CHoCH · BOS', 'Which break matters?', 'gold'), ('Entry models', 'Aggressive · confirmation · retracement', 'bull'), ('Stop, target, no-trade', 'Alignment & risk', 'bear')]),
          references([REF['ict'], REF['kd'], REF['harris'], REF['murphy'], REF['cmi']],
                     'References are on screen. The POI matrix is a CMI training framework; it organises analysis and must be tested before use.',
                     'Rujukan dipaparkan di skrin. Matriks POI ialah rangka kerja latihan CMI; ia menyusun analisis dan mesti diuji sebelum digunakan.'),
          disclaimer('Seterusnya: Video 08 — Entry Timeframe Alignment')]
    return dict(id='ep07', file='CMI_L8_V07_Professional_POI_Selection.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Check POI alignment with HTF context', 'Distinguish displacement from ordinary large candles', 'Classify fresh, tested and invalidated POIs', 'Apply the 10-criterion CMI POI matrix', 'Rank POIs relative to a trading plan', 'Run bullish and bearish POI selection'],
                quiz=[('Factors for POI selection?', 'HTF alignment, market structure (caused BOS/MSS), premium/discount, liquidity relationship, displacement quality, clarity, freshness, distance to target, stop feasibility, R:R.'),
                      ('Displacement vs large candle?', 'Displacement: strong directional expansion that breaks meaningful structure and usually leaves an FVG. A single large candle inside a range that breaks nothing and is overlapped by the next candle is ordinary volatility.'),
                      ('Tested vs invalidated?', 'Tested: price returned and traded into the zone. Invalidated (CMI): a candle body closed beyond the far edge, showing acceptance beyond the zone.'),
                      ('Why reject a valid zone?', 'Because relevance is relative to the plan: no HTF context, wrong half of the range, repeatedly tested, too close to the target, or no feasible stop/R:R.')],
                exercise='Exercise 4 — Select and Rank POIs. On an FCPO 1H chart with a defined Daily bias, mark three candidate POIs (A, B, C). Fill the 10-criterion matrix (✓ / ~ / ✗) for each and rank them. Answer guide: the top-ranked POI must be HTF-aligned, in the correct half of the range, at the origin of a BOS-causing displacement, with room to the opposing liquidity; label any score as illustrative.',
                refs=[r[0] for r in (REF['ict'], REF['kd'], REF['harris'], REF['murphy'], REF['cmi'])])
