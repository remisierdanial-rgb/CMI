"""VIDEO 08 — Entry Timeframe Alignment (Subtopic 5: A–J)."""
from .common import *  # noqa
from level8.engine.chart import agg
from .mtfdata import mtf_bull, mtf_bear, mtf_shift
from .topdown import s_15m, s_5m, keylevels, Dir

NUM, TITLE = 8, 'Entry Timeframe Alignment'


def data_bull():
    d = mtf_shift(mtf_bull(seed=53, hmul=4), 12)
    return _poi4(d)


def data_bear():
    d = mtf_shift(mtf_bear(seed=59, hmul=4), -30)
    return _poi4(d)


def _poi4(d):
    H4 = agg(d['H'], 4)
    Hp = d['Hp']
    sg = 1 if d['bull'] else -1
    ob4 = Hp.ends[1] // 4
    fv = H4.fvgs(ob4, Hp.ends[2] // 4, sg)[0]
    d['H4'] = H4
    d['ob4'] = ob4
    d['poi'] = (H4.l[ob4], fv[2]) if d['bull'] else (fv[1], H4.h[ob4])
    return d


def s_what():
    sc = Scene('8.5', 'What is entry timeframe alignment')
    sc.visual = 'Bias vs confirmation boxes; HTF → MTF → LTF alignment chain.'
    sc.say('Entry Timeframe Alignment means that the lower-timeframe entry agrees with the higher-timeframe bias and happens at the selected point of interest.',
           'Entry Timeframe Alignment bermaksud entry lower timeframe selari dengan bias higher timeframe dan berlaku di point of interest yang dipilih.')
    sc.add(Heading('SUBTOPIC 5 · ENTRY TIMEFRAME ALIGNMENT', 'Bias, location and trigger must agree', 120, 190, 48))
    b = sc.say('Directional bias and entry confirmation are different things. A bullish daily bias does not justify buying immediately, at any price.',
               'Bias arah dan pengesahan entry ialah dua perkara berbeza. Bias daily bullish tidak menjustifikasi membeli serta-merta, pada sebarang harga.')
    sc.add(Card(120, 260, 820, 260, None, 'Directional bias', 'Answers: which side has more evidence? Comes from HTF structure, range and liquidity. Does not tell us when or where to enter.', 'gold', None, size=27), at=b)
    b = sc.say('Entry confirmation is lower-timeframe evidence that price is reacting the way the bias expects, at the location we selected.',
               'Pengesahan entry ialah bukti lower timeframe bahawa harga bertindak balas seperti yang dijangka oleh bias, di lokasi yang kita pilih.')
    sc.add(Card(980, 260, 820, 260, None, 'Entry confirmation', 'Answers: is there evidence now, at my POI? Comes from LTF sweep, MSS, displacement and an execution zone.', 'bull', None, size=27), at=b)
    b = sc.say('That is why lower-timeframe confirmation is only evaluated at a meaningful location. The same five-minute signal in the middle of nowhere has much less meaning.',
               'Sebab itu pengesahan lower timeframe hanya dinilai di lokasi yang bermakna. Signal 5 minit yang sama di tempat sembarangan kurang bermakna.')
    sc.add(Flow([dict(title='HTF bias', sub='Direction', color='gold', at=b), dict(title='MTF POI', sub='Location', color='purple', at=b, delay=0.4),
                 dict(title='LTF trigger', sub='Evidence + execution', color='bull', at=b, delay=0.8)], 120, 570, 520, 150, 60, 'h', 28, 21), at=b)
    return sc


def s_sequence():
    sc = Scene('8.5', 'Entry confirmation sequence')
    sc.visual = 'Ten-step sequence in two columns, appearing one by one; amber note: framework, not mandatory.'
    sc.say('Here is the CMI entry confirmation sequence, in ten steps.',
           'Ini urutan pengesahan entry CMI, dalam sepuluh langkah.')
    sc.add(Heading('ENTRY CONFIRMATION SEQUENCE', 'Ten steps from bias to target', 120, 170, 46))
    S = [('Establish HTF directional bias', 'One, establish the higher-timeframe bias. Two, identify the medium-timeframe POI.', 'Satu, tentukan bias higher timeframe. Dua, kenal pasti POI medium timeframe.'),
         ('Identify the MTF POI', None, None),
         ('Wait for price to reach the POI', 'Three, wait for price to reach it. Four, observe the liquidity interaction.', 'Tiga, tunggu harga sampai ke situ. Empat, perhatikan interaksi liquidity.'),
         ('Observe liquidity interaction', None, None),
         ('Look for a meaningful LTF structure shift', 'Five, look for a meaningful lower-timeframe structure shift. Six, assess the displacement.', 'Lima, cari peralihan struktur lower timeframe yang bermakna. Enam, nilai displacement.'),
         ('Assess displacement', None, None),
         ('Identify a valid FVG or execution zone', 'Seven, identify a valid fair value gap or other execution zone. Eight, plan the entry.', 'Tujuh, kenal pasti fair value gap yang sah atau zon execution lain. Lapan, rancang entry.'),
         ('Plan the entry', None, None),
         ('Define stop-loss and invalidation', 'Nine, define the stop-loss and invalidation. Ten, identify a realistic target and assess risk to reward.', 'Sembilan, tentukan stop-loss dan invalidation. Sepuluh, kenal pasti sasaran yang realistik dan nilai nisbah risiko-ganjaran.'),
         ('Identify a realistic target; assess R:R', None, None)]
    items = []
    b = None
    for i, (t, en, ms) in enumerate(S):
        if en:
            b = sc.say(en, ms, 0.3)
        items.append(dict(text=t, at=b, delay=0.0 if en else 1.4, num=f'{i + 1:02d}', style='num'))
    sc.add(Bullets(items[:5], 120, 270, 820, 27, 2.6, 'num', 'gold'), at=items[0]['at'])
    sc.add(Bullets(items[5:], 1000, 270, 820, 27, 2.6, 'num', 'gold'), at=items[5]['at'])
    b = sc.say('This is a framework for organising analysis. Markets do not have to follow this sequence, and many valid sessions will end without a trade.',
               'Ini rangka kerja untuk menyusun analisis. Market tidak perlu mengikut urutan ini, dan banyak sesi yang sah akan berakhir tanpa trade.')
    sc.add(Pill('FRAMEWORK FOR ANALYSIS · NOT A MANDATORY SEQUENCE THE MARKET MUST FOLLOW', W / 2, 820, 'amber', 16), at=b)
    return sc


def structure_series():
    return gen(4560, [(5, 4530), (3, 4545), (5, 4515), (2, 4526), (2, 4520), (2, 4531), (6, 4486), (1, 4476, 'wick', 4491), (3, 4500), (6, 4556, 'disp'), (3, 4540), (4, 4566)], seed=303, vol=3, wick=2)


def s_structure():
    sc = Scene('8.5', 'MSS · CHoCH · BOS')
    sc.visual = 'Bullish (top) and mirrored bearish (bottom): minor internal CHoCH mid-range (low significance) vs MSS at the POI after a sweep with displacement, then BOS of external structure.'
    sb = structure_series()
    ss = mirror(sb, 9000)
    E = sb.ends
    cb = Chart(sb, 36, 100, 1310, 380, 'FCPO · 5M · HYPOTHETICAL', 'BULLISH · WHICH BREAK MATTERS?', slots=len(sb) + 4, step=20, title_color='bull')
    cs = Chart(ss, 36, 490, 1310, 380, 'FCPO · 5M · HYPOTHETICAL', 'BEARISH · MIRROR', slots=len(ss) + 4, step=20, title_color='bear')
    sc.say('Not every break of structure carries the same weight. Let us compare three breaks on the same chart.',
           'Bukan setiap break of structure mempunyai nilai yang sama. Mari bandingkan tiga break pada carta yang sama.')
    sc.add(cb)
    sc.add(cs)
    cb.reveal(E[6] + 1, dur=4)
    cs.reveal(E[6] + 1, dur=4)
    poi = (4471, 4489)
    cb.ann(Zone(0, None, poi[0], poi[1], 'purple', 'HTF POI', alpha=0.15), delay=1)
    cs.ann(Zone(0, None, 9000 - poi[1], 9000 - poi[0], 'purple', 'HTF POI', alpha=0.15, lpos='below'), delay=1)
    st = []
    b = sc.say('First, internal structure. In the middle of the decline, price briefly closes above a tiny internal high. That is an internal change of character.',
               'Pertama, struktur dalaman. Di tengah penurunan, harga seketika ditutup di atas high dalaman yang kecil. Itu internal change of character.')
    ci = sb.first_close_beyond(E[4], sb.h[E[3]], +1)
    cb.ann(Struct(E[3], ci, sb.h[E[3]], 'INTERNAL CHoCH', 'amber'), at=b)
    cs.ann(Struct(E[3], ci, ss.l[E[3]], 'INTERNAL CHoCH', 'amber', below=True), at=b)
    st.append(dict(text='Internal CHoCH, mid-range: minor', at=b, color='amber'))
    b = sc.say('It happened away from our POI, without a sweep and without displacement. It is a minor internal break, and price continued lower.',
               'Ia berlaku jauh dari POI kita, tanpa sweep dan tanpa displacement. Ia break dalaman yang kecil, dan harga terus turun.')
    st.append(dict(text='No sweep, no displacement, wrong location', at=b, color='amber'))
    b = sc.say('Second: price reaches the POI, sweeps the low, and then closes above the swing high that started the last leg down, with displacement. That is a market structure shift, at the right location.',
               'Kedua: harga sampai ke POI, sweep low, kemudian ditutup di atas swing high yang memulakan kaki penurunan terakhir, dengan displacement. Itu market structure shift, di lokasi yang betul.')
    cb.reveal(E[9] + 1, at=b, dur=3)
    cs.reveal(E[9] + 1, at=b, dur=3)
    mi = sb.first_close_beyond(E[7], sb.h[E[5]], +1)
    cb.ann(Mark(E[7], sb.l[E[7]], 'SWEEP', 'amber', 'below', size=14), at=b, delay=1)
    cs.ann(Mark(E[7], ss.h[E[7]], 'SWEEP', 'amber', 'above', size=14), at=b, delay=1)
    cb.ann(Struct(E[5], mi, sb.h[E[5]], 'MSS', 'bull'), at=b, delay=2.4)
    cs.ann(Struct(E[5], mi, ss.l[E[5]], 'MSS', 'bear', below=True), at=b, delay=2.4)
    st.append(dict(text='MSS at POI after sweep + displacement', at=b, color='bull'))
    b = sc.say('Third: price continues and closes beyond the external swing of the whole decline. That is a break of external structure, confirming the new direction on this timeframe.',
               'Ketiga: harga terus bergerak dan ditutup melepasi swing luaran bagi keseluruhan penurunan. Itu break struktur luaran, mengesahkan arah baru pada timeframe ini.')
    xi = sb.first_close_beyond(E[7], sb.h[E[1]], +1)
    cb.ann(Struct(E[1], xi, sb.h[E[1]], 'EXTERNAL BOS', 'gold'), at=b)
    cs.ann(Struct(E[1], xi, ss.l[E[1]], 'EXTERNAL BOS', 'gold', below=True), at=b)
    cb.reveal(len(sb), at=b, dur=2)
    cs.reveal(len(ss), at=b, dur=2)
    st.append(dict(text='External BOS: broader confirmation', at=b, color='gold'))
    b = sc.say('The location of a break matters as much as the break itself. And even a well-located structure shift alone is not enough to justify a trade: we still need the stop, the target and the risk to reward.',
               'Lokasi sesuatu break sama penting dengan break itu sendiri. Malah peralihan struktur di lokasi yang baik sahaja tidak cukup untuk menjustifikasi trade: kita masih perlukan stop, sasaran dan nisbah risiko-ganjaran.')
    st.append(dict(text='Location matters · a break alone ≠ trade', at=b, color='bear'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'WHICH BREAK MATTERS?', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.25), at=st[0]['at'])
    return sc


def s_displacement(d):
    sc = Scene('8.5', 'Displacement confirmation')
    sc.visual = '5M chart: average candle range before vs displacement candles (bracketed), FVG formed, structure broken; criteria list.'
    F = d['F']
    f = d['f']
    k = keylevels(d)
    pre = [F.h[i] - F.l[i] for i in range(f['sweep'] - 8, f['sweep'])]
    avg = sum(pre) / len(pre)
    dsp = range(f['hl'] + 1, f['disp'] + 1)
    davg = sum(F.h[i] - F.l[i] for i in dsp) / len(dsp)
    ch = Chart(F, 36, 100, 1310, 770, 'FCPO · 5M · HYPOTHETICAL ILLUSTRATION', 'DISPLACEMENT · MEASURED', slots=len(F) + 6, step=10, fit_n=f['disp'] + 2)
    sc.say('Displacement is the second ingredient of confirmation. Let us measure it instead of judging by eye.',
           'Displacement ialah ramuan kedua pengesahan. Mari kita ukur, bukan menilai dengan mata sahaja.')
    sc.add(ch)
    ch.reveal(f['disp'] + 2, dur=4)
    st = []
    b = sc.say(f'Before the sweep, the average five-minute candle range here is about {avg:.0f} points.',
               f'Sebelum sweep, purata julat candle 5 minit di sini kira-kira {avg:.0f} mata.')
    ch.ann(VBand(f['sweep'] - 8, f['sweep'] - 1, 'sub', f'AVG RANGE ≈ {avg:.0f} PTS', 0.06), at=b)
    st.append(dict(text=f'Normal range ≈ {avg:.0f} pts', at=b, color='sub'))
    b = sc.say(f'During the displacement, candles average about {davg:.0f} points, with large bodies and small wicks, all in one direction.',
               f'Semasa displacement, purata candle kira-kira {davg:.0f} mata, dengan body besar dan wick kecil, semuanya ke satu arah.')
    ch.ann(VBand(f['hl'] + 1, f['disp'], 'bull', f'DISPLACEMENT ≈ {davg:.0f} PTS / CANDLE', 0.1), at=b)
    ch.ann(Bracket(f['disp'] + 1, F.l[f['hl'] + 1], F.h[f['disp']], f"{F.h[f['disp']] - F.l[f['hl'] + 1]} PTS", 'bull'), at=b, delay=0.6)
    st.append(dict(text='Body & range expansion', at=b, color='bull'))
    b = sc.say('It closes beyond meaningful structure, the swing high that began the final leg down, and leaves a fair value gap.',
               'Ia ditutup melepasi struktur yang bermakna, iaitu swing high yang memulakan kaki penurunan terakhir, dan meninggalkan fair value gap.')
    ch.ann(Struct(f['lh'], k['f_mss'], k['f_lh'], 'MSS', 'bull'), at=b)
    fv = k['f_fvg']
    ch.ann(Zone(fv[0] - 1, None, fv[1], fv[2], 'blue', 'FVG', alpha=0.25), at=b, delay=0.6)
    st.append(dict(text='Breaks meaningful structure', at=b, color='gold'))
    st.append(dict(text='Leaves an FVG', at=b, delay=0.6, color='blue'))
    b = sc.say('Ordinary volatility looks different: one large candle that overlaps its neighbours and breaks nothing. Size alone is not displacement.',
               'Volatiliti biasa kelihatan berbeza: satu candle besar yang bertindih dengan jirannya dan tidak memecahkan apa-apa. Saiz sahaja bukan displacement.')
    st.append(dict(text='Size alone ≠ displacement', at=b, color='amber'))
    b = sc.say('And displacement does not prove institutional orders. It shows urgency in price. That is useful evidence, nothing more.',
               'Dan displacement tidak membuktikan order institusi. Ia menunjukkan kesegeraan harga. Itu bukti yang berguna, tidak lebih.')
    st.append(dict(text='Evidence of urgency, not of institutions', at=b, color='bear'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'DISPLACEMENT CHECK', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.25), at=st[0]['at'])
    return sc


def s_models_chart(d):
    sc = Scene('8.5', 'Three entry models')
    sc.visual = '5M chart with the three entry models drawn: Aggressive (POI limit), Confirmation (MSS close), Retracement (FVG edge), each with its own stop.'
    F = d['F']
    f = d['f']
    k = keylevels(d)
    plo, phi = k['poi_lo'], k['poi_hi']
    ag_e, ag_s = phi, plo - 4
    cf_e, cf_s = F.c[f['disp']], k['sl']
    rt_e, rt_s = k['entry'], k['sl']
    ch = Chart(F, 36, 100, 1310, 770, 'FCPO · 5M · HYPOTHETICAL ILLUSTRATION', 'ENTRY MODELS', slots=len(F) + 12, step=10, fit_n=f['retr'] + 1)
    sc.say('There are three common entry models. Each has a logic, a cost, and situations where it should be avoided.',
           'Terdapat tiga model entry yang biasa. Setiap satu ada logik, kos, dan situasi di mana ia patut dielakkan.')
    sc.add(ch)
    ch.refit(f['retr'] + 1, extra=(ag_s, plo), pad=0.06, dur=0.1)
    ch.reveal(f['retr'] + 1, dur=4)
    ch.ann(Zone(0, None, plo, phi, 'purple', '4H POI', alpha=0.12), delay=1)
    st = []
    b = sc.say(f'One: the aggressive entry. A limit order at the POI, here at {ag_e:,}, with the stop beyond the POI at {ag_s:,}. It needs no lower-timeframe confirmation, so it is most exposed to false reactions.',
               f'Satu: entry agresif. Order limit di POI, di sini pada {ag_e:,}, dengan stop di luar POI pada {ag_s:,}. Ia tidak memerlukan pengesahan lower timeframe, jadi paling terdedah kepada reaksi palsu.')
    ch.ann(HLine(ag_e, 0, None, 'amber', f'A · AGGRESSIVE {ag_e:,}', dash=None, w=2.2, lpos='left'), at=b)
    ch.ann(HLine(ag_s, 0, None, 'bear', f'A · SL {ag_s:,}', lpos='left', above=False), at=b, delay=0.4)
    st.append(dict(text=f'A · Aggressive: POI limit {ag_e:,}', at=b, color='amber'))
    b = sc.say(f'Two: the confirmation entry. We wait until the structure shift and its displacement have closed, then enter at market, around {cf_e:,}, with the stop beyond the sweep at {cf_s:,}.',
               f'Dua: entry pengesahan. Kita tunggu sehingga peralihan struktur dan displacement-nya ditutup, kemudian masuk pada harga market, sekitar {cf_e:,}, dengan stop di luar sweep pada {cf_s:,}.')
    ch.ann(Mark(f['disp'], cf_e, 'C', 'bull', 'above', size=18), at=b)
    ch.ann(HLine(cf_e, f['disp'], None, 'bull', f'C · CONFIRMATION {cf_e:,}', dash=None, w=2.2), at=b, delay=0.3)
    ch.ann(HLine(cf_s, f['sweep'], None, 'bear', f'C / R · SL {cf_s:,}', above=False), at=b, delay=0.6)
    st.append(dict(text=f'C · Confirmation: after MSS {cf_e:,}', at=b, color='bull'))
    b = sc.say(f'Three: the retracement entry. After displacement, we wait for price to revisit the fair value gap, entering at {rt_e:,}, with the same structural stop. The stop is the same, but the entry is better, if it fills.',
               f'Tiga: entry retracement. Selepas displacement, kita tunggu harga kembali ke fair value gap, masuk pada {rt_e:,}, dengan stop struktur yang sama. Stop sama, tetapi entry lebih baik, jika ia dipenuhi.')
    fv = k['f_fvg']
    ch.ann(Zone(fv[0] - 1, None, fv[1], fv[2], 'blue', 'FVG', alpha=0.22), at=b)
    ch.ann(HLine(rt_e, fv[0], None, 'blue', f'R · RETRACEMENT {rt_e:,}', dash=None, w=2.2), at=b, delay=0.4)
    st.append(dict(text=f'R · Retracement: FVG {rt_e:,}', at=b, color='blue'))
    b = sc.say('Notice the trade-off. The aggressive entry gets the best price but the least evidence. The confirmation entry has more evidence but a worse price. The retracement entry has both, but it may never fill.',
               'Perhatikan pertukarannya. Entry agresif mendapat harga terbaik tetapi bukti paling sedikit. Entry pengesahan ada lebih bukti tetapi harga lebih buruk. Entry retracement ada kedua-duanya, tetapi mungkin tidak pernah dipenuhi.')
    st.append(dict(text='Best price ↔ more evidence ↔ fill risk', at=b, color='gold'))
    b = sc.say('No model is universally superior. Choose one, define its rules, and test it.',
               'Tiada model yang lebih baik secara universal. Pilih satu, tentukan peraturannya, dan ujinya.')
    st.append(dict(text='No model is universally superior', at=b, color='text'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'ENTRY MODELS', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.25), at=st[0]['at'])
    return sc


def s_models_table():
    sc = Scene('8.5', 'Entry models compared')
    sc.visual = 'Comparison table: logic, required conditions, advantages, disadvantages, stop, avoid when.'
    sc.say('Here are the three models side by side.',
           'Ini tiga model secara sebelah-menyebelah.')
    sc.add(Heading('ENTRY MODELS · COMPARED', 'Aggressive · Confirmation · Retracement', 120, 170, 44))
    cols = [('', 260), ('Aggressive', 470), ('Confirmation', 470), ('Retracement', 470)]
    R = [('Logic', 'Limit at the POI by predefined rules', 'Market entry after LTF shift closes', 'Enter on revisit of FVG / execution zone'),
         ('Requires', 'HTF bias + high-quality POI', 'Sweep + MSS with displacement at POI', 'MSS + displacement + valid FVG'),
         ('Advantage', 'Best price, never missed', 'More evidence before risk', 'Evidence + better price'),
         ('Disadvantage', 'Most false reactions', 'Worse price, wider stop', 'May not fill; can miss the move'),
         ('Stop-loss', 'Beyond the POI', 'Beyond the sweep extreme', 'Beyond the sweep extreme'),
         ('Avoid when', 'POI weak, against HTF, high volatility', 'Target close after shift', 'Gap too small / price far from target')]
    b = sc.say('For each: the logic, the conditions, the advantage, the disadvantage, the stop-loss, and when to avoid it.',
               'Bagi setiap satu: logik, syarat, kelebihan, kelemahan, stop-loss, dan bila patut dielakkan.')
    rows = [dict(cells=list(r), at=b, delay=0.7 * i, colors=['gold', 'amber', 'bull', 'blue']) for i, r in enumerate(R)]
    sc.add(Table(cols, rows, 120, 230, 92, 21), at=b)
    sc.say('Invalidation is the same idea for all three: if price accepts beyond the level that the idea depends on, the idea is wrong, and we exit.',
           'Invalidation ialah idea yang sama bagi ketiga-tiganya: jika harga diterima melepasi paras yang menjadi asas idea, idea itu salah, dan kita keluar.')
    return sc


def s_stop_target(d):
    sc = Scene('8.5', 'Stop-loss & target alignment')
    sc.visual = 'Same entry and structural stop with two targets: nearby minor high (poor R:R, rejected) vs opposing 4H liquidity (acceptable R:R).'
    F = d['F']
    f = d['f']
    k = keylevels(d)
    ch = Chart(F, 36, 100, 1310, 770, 'FCPO · 5M · HYPOTHETICAL ILLUSTRATION', 'SAME ENTRY · TWO TARGETS', slots=len(F) + 24, step=10, fit_n=f['retr'] + 1)
    near = F.h[f['disp']] + 4 if d['bull'] else F.l[f['disp']] - 4
    sc.say('A valid entry signal can still produce an unattractive trade. Stop-loss and target must be aligned too.',
           'Signal entry yang sah masih boleh menghasilkan trade yang tidak menarik. Stop-loss dan sasaran juga mesti selari.')
    sc.add(ch)
    ch.reveal(f['retr'] + 1, dur=3)
    ch.refit(f['retr'] + 1, extra=(k['tp'], k['sl']), pad=0.05, dur=0.1)
    b = sc.say('The stop is structural: beyond the sweep extreme, where the idea is invalidated. It is not an arbitrary number of points chosen to feel comfortable.',
               'Stop ini berasaskan struktur: di luar titik ekstrem sweep, di mana idea itu terbatal. Ia bukan jumlah mata rawak yang dipilih supaya rasa selesa.')
    ch.ann(HLine(k['sl'], f['sweep'], None, 'bear', f"STRUCTURAL SL {k['sl']:,}", above=False), at=b)
    rr1 = abs(near - k['entry']) / abs(k['entry'] - k['sl'])
    b = sc.say(f'If the target is only the nearby high at {near:,}, the reward is small compared with the risk: about one to {rr1:.1f}. Even with a valid entry, the trade is unattractive.',
               f'Jika sasaran hanya high berdekatan pada {near:,}, ganjarannya kecil berbanding risiko: kira-kira 1:{rr1:.1f}. Walaupun entry sah, trade ini tidak menarik.')
    ch.ann(Position(f['retr'], f['retr'] + 9, k['entry'], k['sl'], near, 'long' if d['bull'] else 'short'), at=b)
    ch.ann(Tag('✗ TARGET TOO CLOSE', f['retr'] + 4, near + (14 if d['bull'] else -14), 'bear', size=14), at=b, delay=0.8)
    rr2 = abs(k['tp'] - k['entry']) / abs(k['entry'] - k['sl'])
    b = sc.say(f'If the target is the opposing four-hour liquidity at {k["tp"]:,}, the same risk offers about one to {rr2:.1f}. Targets come from liquidity, not from wishes.',
               f'Jika sasaran ialah liquidity 4 jam bertentangan pada {k["tp"]:,}, risiko yang sama menawarkan kira-kira 1:{rr2:.1f}. Sasaran datang daripada liquidity, bukan harapan.')
    ch.ann(Position(f['retr'] + 12, len(F) + 18, k['entry'], k['sl'], k['tp'], 'long' if d['bull'] else 'short'), at=b)
    ch.ann(Tag('✓ OPPOSING LIQUIDITY', f['retr'] + 22, k['tp'] + (14 if d['bull'] else -14), 'bull', size=14), at=b, delay=0.8)
    sc.say('So the checklist is: a structural stop at the invalidation, a target at opposing liquidity, and a risk to reward that fits your tested plan.',
           'Jadi senarai semaknya: stop struktur di invalidation, sasaran di liquidity bertentangan, dan nisbah risiko-ganjaran yang sesuai dengan pelan anda yang telah diuji.')
    return sc


def s_htf(d):
    o = Dir(d['bull'])
    D, H4 = d['D'], d['H4']
    k = keylevels(d)
    nowh = d['h_of_f'](d['f']['sweep'])
    now4 = nowh // 4
    W_ = o.W
    sc = Scene('8.5', f'{W_} FCPO · HTF & 4H POI')
    sc.visual = f'Split: Daily ({o.word} context) | 4H with POI {k["poi_lo"]:,}–{k["poi_hi"]:,} and {o.oliq}; future candles hidden.'
    nd = d['d_of_h'](nowh)
    cd = Chart(D, 36, 100, 905, 770, 'FCPO · DAILY · HYPOTHETICAL', 'HTF · CONTEXT', slots=len(D) + 4, step=50, title_color='gold', fit_n=nd)
    c4 = Chart(H4, 36 + 905 + 38, 100, 905, 770, 'FCPO · 4H · HYPOTHETICAL', 'MTF · 4H POI', slots=len(H4) + 4, step=25, title_color='purple', fit_n=now4)
    side = 'bullish' if d['bull'] else 'bearish'
    sc.say(f'Now the complete {side} FCPO demonstration. This is an illustrative educational scenario with hypothetical prices, not a historical trade or a live recommendation.',
           f'Kini demonstrasi FCPO {side} yang lengkap. Ini senario pendidikan ilustratif dengan harga hipotetikal, bukan dagangan sejarah atau cadangan semasa.')
    sc.add(cd)
    sc.add(c4)
    cd.reveal(nd, dur=3)
    c4.reveal(now4, dur=3)
    b = sc.say(f'The higher timeframe: weekly and daily structure is {side}, and price is retracing into {"discount" if d["bull"] else "premium"}.',
               f'Higher timeframe: struktur weekly dan daily adalah {side}, dan harga sedang retrace ke {"discount" if d["bull"] else "premium"}.')
    cd.ann(Note(f'HTF: {W_} CONTEXT', 0.5, 0.13, o.c), at=b)
    b = sc.say(f'The medium timeframe: on four hours, the origin of the displacement gives a {side} POI around {k["poi_lo"]:,} to {k["poi_hi"]:,}.',
               f'Medium timeframe: pada 4 jam, asal displacement memberikan POI {side} sekitar {k["poi_lo"]:,} hingga {k["poi_hi"]:,}.')
    c4.ann(Zone(d['ob4'], None, k['poi_lo'], k['poi_hi'], 'purple', f'4H POI {k["poi_lo"]:,}–{k["poi_hi"]:,}', alpha=0.2), at=b)
    b = sc.say(f'Just {"above" if d["bull"] else "below"} it, the session {"lows" if d["bull"] else "highs"} hold {o.oliq}. Price will likely interact with that liquidity first, if it reaches the POI.',
               f'Betul-betul {"di atas" if d["bull"] else "di bawah"}nya, {"low" if d["bull"] else "high"} sesi menyimpan {o.oliq}. Harga berkemungkinan berinteraksi dengan liquidity itu dahulu, jika ia sampai ke POI.')
    c4.ann(HLine(k['q_eq'], now4 - 3, None, 'cyan', f"{o.oliq} {k['q_eq']:,}", above=not d['bull']), at=b)
    b = sc.say(f'The opposing liquidity, our potential target, is the four-hour {"lower high" if d["bull"] else "higher low"} at {k["tp"]:,}.',
               f'Liquidity bertentangan, sasaran berpotensi kita, ialah {"lower high" if d["bull"] else "higher low"} 4 jam pada {k["tp"]:,}.')
    c4.ann(HLine(k['tp'], (d['Hp'].ends[6]) // 4, None, 'cyan', f"{o.liq} · TARGET {k['tp']:,}", above=d['bull']), at=b)
    b = sc.say('Price is approaching. We do not buy because the daily is bullish. We wait for the lower timeframes to show evidence at the POI.' if d['bull'] else
               'Price is approaching. We do not sell because the daily is bearish. We wait for the lower timeframes to show evidence at the POI.',
               'Harga sedang menghampiri. Kita tidak membeli kerana daily bullish. Kita tunggu lower timeframe menunjukkan bukti di POI.' if d['bull'] else
               'Harga sedang menghampiri. Kita tidak menjual kerana daily bearish. Kita tunggu lower timeframe menunjukkan bukti di POI.')
    c4.ann(Decision(now4 - 1, 'WAIT · NO LTF EVIDENCE YET'), at=b)
    return sc


def s_notrade():
    sc = Scene('8.5', 'No-trade conditions')
    sc.visual = 'Eight amber/red no-trade cards.'
    sc.say('Equally important: when not to enter. Here are eight no-trade conditions.',
           'Sama penting: bila tidak patut masuk. Ini lapan keadaan tiada trade.')
    sc.add(Heading('NO-TRADE CONDITIONS', 'When the right decision is to do nothing', 120, 170, 46))
    M = [('No meaningful HTF bias', 'Neutral or conflicting HTF.', 'No meaningful higher-timeframe bias.', 'Tiada bias higher timeframe yang bermakna.'),
         ('POI not reached', 'Price is still elsewhere.', 'Price has not reached the intended POI.', 'Harga belum sampai ke POI yang dirancang.'),
         ('No LTF confirmation', 'No sweep, no MSS, no displacement.', 'No meaningful lower-timeframe confirmation.', 'Tiada pengesahan lower timeframe yang bermakna.'),
         ('Conflicting structure', 'Timeframes disagree.', 'Conflicting structure across timeframes.', 'Struktur bercanggah merentas timeframe.'),
         ('Target too close', 'Not enough distance.', 'Insufficient distance to the target.', 'Jarak ke sasaran tidak mencukupi.'),
         ('Poor risk-to-reward', 'Reward does not justify risk.', 'Poor risk to reward.', 'Nisbah risiko-ganjaran yang lemah.'),
         ('Unsuitable conditions', 'Excess volatility, news, thin session.', 'Excessive volatility or unsuitable market conditions.', 'Volatiliti berlebihan atau keadaan market yang tidak sesuai.'),
         ('Setup invalidated', 'Acceptance beyond the POI.', 'And a setup that is already invalidated.', 'Dan setup yang sudah terbatal.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.25)
        r, c = divmod(i, 4)
        sc.add(Card(120 + c * 425, 230 + r * 300, 405, 270, f'{i + 1:02d}', t, bd, 'amber' if i < 4 else 'bear', 'cross', size=25), at=b)
    return sc


def s_mistakes():
    sc = Scene('8.5', 'Entry alignment mistakes')
    sc.visual = 'Seven red mistake cards.'
    sc.say('Finally, seven entry alignment mistakes.',
           'Akhir sekali, tujuh kesilapan penyelarasan entry.')
    sc.add(Heading('ENTRY ALIGNMENT · COMMON MISTAKES', 'Seven ways to break alignment', 120, 170, 46))
    M = [('Entering before the POI', 'Location first.', 'One: entering before price reaches the POI.', 'Satu: masuk sebelum harga sampai ke POI.'),
         ('Every LTF MSS is valid', 'Location and context decide.', 'Two: treating every lower-timeframe MSS as valid.', 'Dua: menganggap setiap MSS lower timeframe sah.'),
         ('Against HTF without a plan', 'Counter-trend needs its own tested plan.', 'Three: taking a lower-timeframe signal against the higher-timeframe context without a separate plan.', 'Tiga: mengambil signal lower timeframe melawan konteks higher timeframe tanpa pelan berasingan.'),
         ('Chasing after the move', 'Late entry, wide stop, small target.', 'Four: entering after price has already moved significantly.', 'Empat: masuk selepas harga sudah bergerak jauh.'),
         ('Ignoring distance to target', 'Check room before risk.', 'Five: ignoring the distance to the target.', 'Lima: mengabaikan jarak ke sasaran.'),
         ('Moving the stop without a rule', 'The stop is the invalidation.', 'Six: moving the stop-loss without a predefined rule.', 'Enam: mengalihkan stop-loss tanpa peraturan yang ditetapkan.'),
         ('Confirmation = certainty', 'Confirmed setups still fail.', 'And seven: confusing confirmation with certainty.', 'Dan tujuh: mengelirukan pengesahan dengan kepastian.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.25)
        r, c = divmod(i, 4)
        sc.add(Card(120 + c * 425, 230 + r * 300, 405, 270, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=25), at=b)
    return sc


def build():
    db, ds = data_bull(), data_bear()
    kb, ks = keylevels(db), keylevels(ds)
    sc = [intro(NUM, TITLE, 'MSS · Displacement · Entry models · Stop & target',
                [('Separate directional bias from entry confirmation', 'In this video you will separate directional bias from entry confirmation,', 'Dalam video ini anda akan membezakan bias arah daripada pengesahan entry,'),
                 ('Judge which structure breaks matter', 'judge which structure breaks matter,', 'menilai break struktur mana yang penting,'),
                 ('Compare aggressive, confirmation and retracement entries', 'compare aggressive, confirmation and retracement entries,', 'membandingkan entry agresif, pengesahan dan retracement,'),
                 ('Align stop, target and no-trade rules', 'and align stop-loss, target and no-trade rules.', 'dan menyelaraskan stop-loss, sasaran dan peraturan tiada trade.')],
                ['This is Subtopic Five of Level 8: Entry Timeframe Alignment.',
                 'Everything so far told us where to look. Now we learn how, and whether, to act.'],
                ['Ini Subtopik Lima Level 8: Entry Timeframe Alignment.',
                 'Semua setakat ini memberitahu di mana untuk melihat. Kini kita belajar bagaimana, dan sama ada, untuk bertindak.'],
                art=tf_stack_art),
          s_what(), s_sequence(), s_structure(), s_displacement(db), s_models_chart(db), s_models_table(), s_stop_target(db),
          s_htf(db), s_15m(db, '4H POI'), s_5m(db, 'four-hour', '4 jam'),
          s_htf(ds), s_15m(ds, '4H POI'), s_5m(ds, 'four-hour', '4 jam'),
          s_notrade(), s_mistakes(),
          statement('KEY TAKEAWAY', 'Bias decides the side. Location decides where.', 'The lower timeframe decides whether — never certainly.',
                    [('Bias decides which side we look for. The POI decides where.', 'Bias menentukan pihak mana yang kita cari. POI menentukan di mana.'),
                     ('And the lower timeframe decides whether we act. Even then, confirmation never means certainty.', 'Dan lower timeframe menentukan sama ada kita bertindak. Walaupun begitu, pengesahan tidak pernah bermaksud kepastian.')]),
          quiz([('Why should traders wait for entry confirmation?', 'One. Why should traders wait for entry confirmation?', 'Satu. Kenapa trader perlu menunggu pengesahan entry?'),
                ('Why is an internal CHoCH mid-range less meaningful than an MSS at the POI?', 'Two. Why is an internal CHoCH in the middle of a range less meaningful than an MSS at the POI?', 'Dua. Kenapa internal CHoCH di tengah range kurang bermakna berbanding MSS di POI?'),
                ('What is the main trade-off between the three entry models?', 'Three. What is the main trade-off between the three entry models?', 'Tiga. Apakah pertukaran utama antara tiga model entry?'),
                ('Why can a valid signal still be a no-trade?', 'Four. Why can a valid entry signal still be a no-trade?', 'Empat. Kenapa signal entry yang sah masih boleh menjadi tiada trade?')]),
          summary('Entry alignment — what to remember', [
              ('Bias ≠ entry confirmation', 'Bias is not entry confirmation.', 'Bias bukan pengesahan entry.'),
              ('Confirm only at a meaningful location', 'Confirm only at a meaningful location.', 'Sahkan hanya di lokasi yang bermakna.'),
              ('MSS at POI after sweep + displacement', 'Look for an MSS at the POI, after a sweep, with displacement.', 'Cari MSS di POI, selepas sweep, dengan displacement.'),
              ('Aggressive · confirmation · retracement: trade-offs', 'Each entry model trades price against evidence.', 'Setiap model entry menukar harga dengan bukti.'),
              ('Structural stop · liquidity target · R:R', 'Use a structural stop, a liquidity target, and check risk to reward.', 'Gunakan stop struktur, sasaran liquidity, dan semak nisbah risiko-ganjaran.'),
              ('No-trade is a valid decision', 'And remember: no trade is a valid decision.', 'Dan ingat: tiada trade ialah keputusan yang sah.')]),
          up_next(9, 'Complete FCPO Case Studies',
                  'In Video 9 we put everything together in complete bullish, bearish and no-trade FCPO case studies.',
                  'Dalam Video 9 kita gabungkan semuanya dalam kajian kes FCPO bullish, bearish dan tiada trade yang lengkap.',
                  [('Bullish case', 'Weekly → 5M', 'bull'), ('Bearish case', 'Weekly → 5M', 'bear'), ('No-trade case', 'When to stand aside', 'amber')]),
          references([REF['ict'], REF['kd'], REF['harris'], REF['bursa'], REF['cmi']],
                     'References are on screen. Entry models and MSS are SMC and ICT framework concepts; the risk calculations use the CMI reference of twenty-five ringgit per tick.',
                     'Rujukan dipaparkan di skrin. Model entry dan MSS ialah konsep rangka kerja SMC dan ICT; pengiraan risiko menggunakan rujukan CMI RM25 setiap tick.'),
          disclaimer('Seterusnya: Video 09 — Complete FCPO Case Studies')]
    return dict(id='ep08', file='CMI_L8_V08_Entry_Timeframe_Alignment.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Separate bias from entry confirmation', 'Apply the 10-step confirmation sequence', 'Judge MSS vs CHoCH vs BOS by location', 'Measure displacement', 'Compare the three entry models', 'Align stop-loss, target and R:R', 'Recognise no-trade conditions'],
                quiz=[('Why wait for entry confirmation?', 'Because the POI is only a location. Confirmation (sweep, MSS, displacement, execution zone) provides evidence that price is reacting as the bias expects, and defines a structural invalidation for the stop.'),
                      ('Internal CHoCH vs MSS at POI?', 'The internal CHoCH happened away from the POI, without a sweep or displacement, so it carries little information. The MSS occurred at the selected location, after liquidity was taken, with displacement — that combination is meaningful.'),
                      ('Trade-off between entry models?', 'Aggressive: best price, least evidence. Confirmation: most evidence at the moment, worse price/wider stop. Retracement: evidence plus better price, but may not fill.'),
                      ('Why can a valid signal be a no-trade?', 'If the target (opposing liquidity) is too close, the R:R is poor; or price already travelled far; or conditions are unsuitable. A valid trigger does not make a trade worth taking.')],
                exercise=f'Exercise 5 — Identify Entry Timeframe Confirmation. Bullish demo: 4H POI {kb["poi_lo"]:,}–{kb["poi_hi"]:,}; 15M SSL {kb["q_eq"]:,}; sweep {kb["sweep"]:,}; 5M FVG {kb["f_fvg"][1]:,}–{kb["f_fvg"][2]:,}. Write the entry for each model (aggressive {kb["poi_hi"]:,}, confirmation at the MSS close, retracement {kb["entry"]:,}), stops, and R:R to {kb["tp"]:,}. Answer: retracement R:R ≈ 1:{abs(kb["tp"] - kb["entry"]) / abs(kb["entry"] - kb["sl"]):.1f}, risk {abs(kb["entry"] - kb["sl"])} pts = RM{abs(kb["entry"] - kb["sl"]) * 25:,} per contract.',
                refs=[r[0] for r in (REF['ict'], REF['kd'], REF['harris'], REF['bursa'], REF['cmi'])])
