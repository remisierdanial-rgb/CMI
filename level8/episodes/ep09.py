"""VIDEO 09 — Complete Bullish, Bearish and No-Trade FCPO Case Studies (integration)."""
from .common import *  # noqa
from level8.engine.chart import agg
from .mtfdata import mtf_bull, mtf_bear, mtf_shift
from .topdown import keylevels, Dir
from .ep08 import _poi4

NUM, TITLE = 9, 'Complete FCPO Case Studies'
NOTRADE_LEGS = [(6, 4485), (3, 4493), (4, 4481), (1, 4456, 'wick', 4479), (5, 4487, 'chop'), (3, 4470), (4, 4436, 'disp'), (6, 4452)]


def grid(d, title):
    D, H4, Q, F = d['D'], d['H4'], d['Q'], d['F']
    f = d['f']
    nowh = d['h_of_f'](f['sweep'])
    nd = d['d_of_h'](nowh)
    w, h = 905, 380
    cd = Chart(D, 36, 100, w, h, 'DAILY · CONTEXT', title, slots=nd + 6, step=100, fit_n=nd, title_color='gold')
    c4 = Chart(H4, 36 + w + 38, 100, w, h, '4H · POI & TARGET', '', slots=nowh // 4 + 6, step=25, fit_n=nowh // 4)
    qs = d['q_of_f'](f['sweep'])
    cq = Chart(Q, 36, 490, w, h, '15M · LIQUIDITY & STRUCTURE', '', slots=len(Q) + 4, step=10, fit_n=qs)
    cf = Chart(F, 36 + w + 38, 490, w, h, '5M · EXECUTION', '', slots=len(F) + 8, step=10, fit_n=f['sweep'])
    return cd, c4, cq, cf, nd, nowh, qs


def case_trade(d, n):
    o = Dir(d['bull'])
    k = keylevels(d)
    f = d['f']
    D, H4, Q, F = d['D'], d['H4'], d['Q'], d['F']
    side = o.word
    sc = Scene('CASE', f'Case {n} · {side} FCPO')
    sc.visual = f'2×2 case board: Daily · 4H · 15M · 5M. Pre-session plan first; lower panels revealed live; outcome revealed only after the plan is written.'
    cd, c4, cq, cf, nd, nowh, qs = grid(d, f'CASE {n} · {o.W}')
    sc.say(f'Case study {n}: a complete {side} FCPO analysis, from the daily chart to execution. All prices are hypothetical.',
           f'Kajian kes {n}: analisis FCPO {side} yang lengkap, dari carta daily hingga execution. Semua harga adalah hipotetikal.')
    for c in (cd, c4, cq, cf):
        sc.add(c)
    cd.reveal(nd, dur=2.5)
    c4.reveal(nowh // 4, dur=2.5)
    b = sc.say(f'Before the session: the daily structure is {side}, price is retracing into {"discount" if o.bull else "premium"}, and we write our bias with its invalidation.',
               f'Sebelum sesi: struktur daily adalah {side}, harga retrace ke {"discount" if o.bull else "premium"}, dan kita tulis bias bersama invalidation-nya.')
    cd.ann(Note(f'BIAS: {o.W} · HYPOTHESIS', 0.3, 0.17, o.c), at=b)
    pdh, pdl = D.h[nd - 1], D.l[nd - 1]
    b = sc.say(f'We mark the previous day high and low, {pdh:,} and {pdl:,}, as nearby references.',
               f'Kita tandakan previous day high dan low, {pdh:,} dan {pdl:,}, sebagai rujukan berdekatan.')
    cd.ann(HLine(pdh, nd - 1, None, 'cyan', f'PDH {pdh:,}', w=1.6), at=b)
    cd.ann(HLine(pdl, nd - 1, None, 'cyan', f'PDL {pdl:,}', w=1.6, above=False), at=b, delay=0.3)
    b = sc.say(f'On four hours, the POI is the origin of the displacement, {k["poi_lo"]:,} to {k["poi_hi"]:,}. The target is the opposing liquidity at {k["tp"]:,}.',
               f'Pada 4 jam, POI ialah asal displacement, {k["poi_lo"]:,} hingga {k["poi_hi"]:,}. Sasaran ialah liquidity bertentangan pada {k["tp"]:,}.')
    c4.ann(Zone(d['ob4'], None, k['poi_lo'], k['poi_hi'], 'purple', 'POI', alpha=0.2), at=b)
    c4.ann(HLine(k['tp'], d['Hp'].ends[6] // 4, None, 'cyan', f"TARGET {k['tp']:,}", above=o.bull), at=b, delay=0.4)
    b = sc.say(f'During the session, the fifteen-minute chart shows equal {"lows" if o.bull else "highs"} at {k["q_eq"]:,}, just {"above" if o.bull else "below"} the POI. We wait.',
               f'Semasa sesi, carta 15 minit menunjukkan equal {"low" if o.bull else "high"} pada {k["q_eq"]:,}, betul-betul {"di atas" if o.bull else "di bawah"} POI. Kita tunggu.')
    cq.reveal(qs, at=b, dur=3)
    cq.ann(HLine(k['q_eq'], d['Qp'].ends[0], None, 'cyan', f"{o.oliq} {k['q_eq']:,}", above=not o.bull), at=b, delay=1)
    cq.ann(Zone(0, None, k['poi_lo'], k['poi_hi'], 'purple', 'POI', alpha=0.12), at=b, delay=1)
    b = sc.say(f'Price sweeps that liquidity into the POI, to {k["sweep"]:,}, and then closes {"above" if o.bull else "below"} the fifteen-minute swing with displacement. The structure shift aligns with the bias.',
               f'Harga sweep liquidity itu ke dalam POI, hingga {k["sweep"]:,}, kemudian ditutup {"di atas" if o.bull else "di bawah"} swing 15 minit dengan displacement. Peralihan struktur selari dengan bias.')
    cq.reveal(k['q_mss'] + 1, at=b, dur=2)
    cq.refit(k['q_mss'] + 1, at=b, extra=(k['poi_lo'], k['poi_hi']), dur=1.5)
    cq.ann(Mark(qs, k['sweep'], 'SWEEP', 'amber', o.dn, size=14), at=b, delay=1)
    cq.ann(Struct(k['q_sw_i'], k['q_mss'], k['q_sw'], 'MSS', o.c, below=not o.bull), at=b, delay=2)
    b = sc.say(f'On five minutes, the displacement left a gap. Plan: retracement entry at {k["entry"]:,}, stop at {k["sl"]:,} beyond the sweep, target {k["tp"]:,}.',
               f'Pada 5 minit, displacement meninggalkan gap. Pelan: entry retracement pada {k["entry"]:,}, stop pada {k["sl"]:,} di luar sweep, sasaran {k["tp"]:,}.')
    cf.reveal(f['disp'] + 1, at=b, dur=2.5)
    cf.refit(f['disp'] + 1, at=b, extra=(k['tp'], k['sl']), pad=0.05, dur=1.5)
    fv = k['f_fvg']
    cf.ann(Zone(fv[0] - 1, None, fv[1], fv[2], 'blue', 'FVG', alpha=0.25), at=b, delay=1.5)
    cf.ann(Position(f['disp'] + 1, len(F) + 6, k['entry'], k['sl'], k['tp'], 'long' if o.bull else 'short'), at=b, delay=2.2)
    risk = abs(k['entry'] - k['sl'])
    rew = abs(k['tp'] - k['entry'])
    b = sc.say(f'Risk: {risk} points, about {risk * 25:,} ringgit per contract. Reward: {rew} points. Risk to reward about one to {rew / risk:.1f}. Plan written. Now, and only now, the outcome.',
               f'Risiko: {risk} mata, kira-kira RM{risk * 25:,} bagi setiap kontrak. Ganjaran: {rew} mata. Nisbah risiko-ganjaran kira-kira 1:{rew / risk:.1f}. Pelan ditulis. Kini, dan hanya sekarang, hasilnya.')
    cf.ann(Decision(f['disp'], 'PLAN WRITTEN'), at=b, until=b + 1)
    b = sc.say(f'Price retraced, filled the entry, and reached the target. In a different market, the same well-planned trade could have hit the stop. The quality of the process is judged separately from the result.',
               f'Harga retrace, entry dipenuhi, dan mencapai sasaran. Dalam market yang berbeza, trade yang dirancang dengan baik ini boleh terkena stop. Kualiti proses dinilai berasingan daripada hasil.')
    cf.reveal(len(F), at=b, dur=4)
    cf.ann(Note('TARGET REACHED · REVIEW THE PROCESS', 0.5, 0.17, 'gold'), at=b, delay=4)
    return sc


def case_notrade(d):
    k = {}
    D, H4, Q, F = d['D'], d['H4'], d['Q'], d['F']
    f = d['f']
    plo, phi = d['poi']
    Qp = d['Qp']
    eq = Qp.l[Qp.ends[2]]
    sw = F.l[f['sweep']]
    sc = Scene('CASE', 'Case 3 · No-trade')
    sc.visual = '2×2 case board: same bullish preparation; sweep into POI but no MSS; price accepts below the POI → setup invalidated; no entry taken.'
    cd, c4, cq, cf, nd, nowh, qs = grid(d, 'CASE 3 · NO-TRADE')
    sc.say('Case study three is just as important: a session where the correct decision was not to trade.',
           'Kajian kes tiga sama penting: sesi di mana keputusan yang betul ialah tidak trade.')
    for c in (cd, c4, cq, cf):
        sc.add(c)
    cd.reveal(nd, dur=2.5)
    c4.reveal(nowh // 4, dur=2.5)
    b = sc.say(f'The preparation looks similar: a bullish daily bias, a four-hour POI from {plo:,} to {phi:,}, and sell-side liquidity just above it.',
               f'Persediaannya kelihatan serupa: bias daily bullish, POI 4 jam dari {plo:,} hingga {phi:,}, dan sell-side liquidity betul-betul di atasnya.')
    cd.ann(Note('BIAS: BULLISH · HYPOTHESIS', 0.3, 0.17, 'bull'), at=b)
    c4.ann(Zone(d['ob4'], None, plo, phi, 'purple', 'POI', alpha=0.2), at=b)
    b = sc.say(f'Price sweeps the equal lows and trades into the POI, down to {sw:,}. So far, this is exactly what we wanted to see.',
               f'Harga sweep equal low dan masuk ke dalam POI, hingga {sw:,}. Setakat ini, inilah yang kita mahu lihat.')
    cq.reveal(qs + 1, at=b, dur=3)
    cq.refit(qs + 1, at=b, extra=(plo, phi), dur=1.2)
    cq.ann(HLine(eq, Qp.ends[0], None, 'cyan', f'SSL {eq:,}', above=False), at=b, delay=0.5)
    cq.ann(Zone(0, None, plo, phi, 'purple', 'POI', alpha=0.12), at=b, delay=0.5)
    cf.reveal(f['sweep'] + 1, at=b, dur=3)
    cf.refit(f['sweep'] + 1, at=b, extra=(plo, phi), dur=1.2)
    b = sc.say('But then nothing confirms. There is no displacement, no structure shift. Price drifts sideways inside the POI. Under the confirmation model, there is no entry.',
               'Tetapi kemudian tiada apa yang mengesahkan. Tiada displacement, tiada peralihan struktur. Harga bergerak mendatar di dalam POI. Di bawah model pengesahan, tiada entry.')
    cf.reveal(f['hl'] + 1, at=b, dur=2.5)
    cf.ann(Note('NO MSS · NO DISPLACEMENT · NO ENTRY', 0.5, 0.17, 'amber'), at=b, delay=1.5)
    b = sc.say('Then price closes below the POI with a strong bearish candle and stays there. That is acceptance beyond the zone. The setup is invalidated.',
               'Kemudian harga ditutup di bawah POI dengan candle bearish yang kuat dan kekal di situ. Itu penerimaan di luar zon. Setup terbatal.')
    cf.reveal(len(F), at=b, dur=3)
    cf.refit(len(F), at=b, extra=(plo, phi), dur=1.5)
    cq.reveal(len(Q), at=b, dur=3)
    cq.refit(len(Q), at=b, extra=(plo, phi), dur=1.5)
    bk = F.first_close_beyond(f['sweep'], plo, -1)
    cf.ann(Mark(bk, F.c[bk], 'CLOSE BELOW POI', 'bear', 'below', size=14), at=b, delay=2)
    b = sc.say('A trader who bought only because price touched the POI would now be losing. The trader who waited for confirmation did nothing, and lost nothing. Standing aside was the professional decision.',
               'Trader yang membeli hanya kerana harga menyentuh POI kini mengalami kerugian. Trader yang menunggu pengesahan tidak berbuat apa-apa, dan tidak rugi apa-apa. Tidak trade ialah keputusan profesional.')
    cd.ann(Note('DAILY BIAS UNDER REVIEW', 0.3, 0.9, 'amber'), at=b)
    b = sc.say('Other no-trade sessions look different: the POI is never reached, the target is too close, or volatility is unsuitable. In each case, no trade is a valid outcome of a good process.',
               'Sesi tiada trade yang lain kelihatan berbeza: POI tidak dicapai, sasaran terlalu dekat, atau volatiliti tidak sesuai. Dalam setiap kes, tiada trade ialah hasil sah daripada proses yang baik.')
    return sc


def s_review():
    sc = Scene('CASE', 'Comparing the three cases')
    sc.visual = 'Table comparing the three cases step by step.'
    sc.say('Let us compare the three cases side by side.',
           'Mari bandingkan tiga kes ini secara sebelah-menyebelah.')
    sc.add(Heading('CASE REVIEW', 'Same process, different outcomes', 120, 170, 46))
    cols = [('Step', 380), ('Case 1 · Bullish', 430), ('Case 2 · Bearish', 430), ('Case 3 · No-trade', 440)]
    R = [('HTF bias', 'Bullish, discount', 'Bearish, premium', 'Bullish, discount'),
         ('MTF POI', '4H origin of displacement', '4H origin of displacement', '4H origin of displacement'),
         ('Liquidity interaction', 'SSL swept into POI', 'BSL swept into POI', 'SSL swept into POI'),
         ('LTF confirmation', 'MSS + displacement + FVG', 'MSS + displacement + FVG', 'None — drift, then close below'),
         ('Decision', 'Retracement entry', 'Retracement entry', 'No entry — invalidated'),
         ('Process quality', 'Followed', 'Followed', 'Followed')]
    b = sc.say('The process was identical in all three. What differed was the evidence. Cases one and two produced confirmation; case three did not, and the plan correctly produced no trade.',
               'Prosesnya sama dalam ketiga-tiga kes. Yang berbeza ialah bukti. Kes satu dan dua menghasilkan pengesahan; kes tiga tidak, dan pelan dengan betul menghasilkan tiada trade.')
    rows = [dict(cells=list(r), at=b, delay=0.6 * i, colors=['gold', 'bull', 'bear', 'amber']) for i, r in enumerate(R)]
    sc.add(Table(cols, rows, 120, 230, 84, 22), at=b)
    sc.say('That is what consistency means: the same questions, in the same order, every session, and accepting the answer the market gives.',
           'Itulah maksud konsistensi: soalan yang sama, dalam urutan yang sama, setiap sesi, dan menerima jawapan yang diberikan market.')
    return sc


def build():
    d1 = _poi4(mtf_shift(mtf_bull(seed=71, hmul=4), -180))
    d2 = _poi4(mtf_shift(mtf_bear(seed=83, hmul=4), 60))
    d3 = _poi4(mtf_shift(mtf_bull(seed=91, hmul=4, flegs=NOTRADE_LEGS), -60))
    k1, k2 = keylevels(d1), keylevels(d2)
    sc = [intro(NUM, TITLE, 'Bullish · Bearish · No-trade',
                [('Run the full Level 8 process on a bullish case', 'In this video you will run the full Level 8 process on a bullish case,', 'Dalam video ini anda akan menjalankan proses penuh Level 8 pada kes bullish,'),
                 ('Run the same process on a bearish case', 'run the same process on a bearish case,', 'menjalankan proses yang sama pada kes bearish,'),
                 ('Recognise a no-trade session', 'recognise a session where the correct decision is no trade,', 'mengenal pasti sesi di mana keputusan yang betul ialah tiada trade,'),
                 ('Judge process separately from outcome', 'and judge the process separately from the outcome.', 'dan menilai proses berasingan daripada hasil.')],
                ['This video integrates all five subtopics of Level 8 into complete FCPO case studies.',
                 'Each case is hypothetical, and is built so that we decide with only the information available at that moment.'],
                ['Video ini menggabungkan kelima-lima subtopik Level 8 dalam kajian kes FCPO yang lengkap.',
                 'Setiap kes adalah hipotetikal, dan dibina supaya kita membuat keputusan hanya dengan maklumat yang ada pada saat itu.'],
                art=tf_stack_art),
          case_trade(d1, 1), case_trade(d2, 2), case_notrade(d3), s_review(),
          statement('KEY TAKEAWAY', 'Same process. Different evidence.', 'No trade is a result, too.',
                    [('The process stays the same. Only the evidence changes from session to session.', 'Proses kekal sama. Hanya bukti yang berubah dari sesi ke sesi.'),
                     ('And when the evidence is missing, no trade is a valid and professional result.', 'Dan apabila bukti tiada, tiada trade ialah hasil yang sah dan profesional.')]),
          quiz([('In Case 3, what was missing before entry?', 'One. In case three, what evidence was missing before entry?', 'Satu. Dalam kes tiga, bukti apa yang tiada sebelum entry?'),
                ('Why was the stop placed beyond the sweep extreme?', 'Two. Why was the stop placed beyond the sweep extreme?', 'Dua. Kenapa stop diletakkan di luar titik ekstrem sweep?'),
                ('How should a losing but well-planned trade be reviewed?', 'Three. How should a losing but well-planned trade be reviewed?', 'Tiga. Bagaimana trade yang rugi tetapi dirancang dengan baik patut dinilai?')]),
          summary('Case studies — what to remember', [
              ('Plan before the session', 'Plan bias, levels and POI before the session.', 'Rancang bias, paras dan POI sebelum sesi.'),
              ('Wait for price at the POI', 'Wait for price to reach the POI.', 'Tunggu harga sampai ke POI.'),
              ('Require sweep + MSS + displacement', 'Require a sweep, a structure shift and displacement.', 'Perlukan sweep, peralihan struktur dan displacement.'),
              ('Write entry, stop, target, R:R', 'Write entry, stop, target and risk to reward.', 'Tulis entry, stop, sasaran dan nisbah risiko-ganjaran.'),
              ('Acceptance beyond POI = invalidated', 'Acceptance beyond the POI invalidates the setup.', 'Penerimaan di luar POI membatalkan setup.'),
              ('Review process, not only outcome', 'And review the process, not only the outcome.', 'Dan nilai proses, bukan hasil sahaja.')]),
          up_next(10, 'Integrated CMI Multi-Timeframe SOP',
                  'In the final video, we turn the whole of Level 8 into one standard operating procedure, from pre-market preparation to post-trade review.',
                  'Dalam video terakhir, kita jadikan keseluruhan Level 8 satu prosedur operasi standard, dari persediaan pra-market hingga semakan selepas trade.',
                  [('Pre-market', 'Bias, levels, POI', 'gold'), ('Live session', 'Observe & confirm', 'bull'), ('Post-trade', 'Review & journal', 'blue')]),
          references([REF['bursa'], REF['mpob'], REF['ict'], REF['murphy'], REF['cmi']],
                     'References are on screen. Verify FCPO contract details on Bursa Malaysia before trading; MPOB provides palm oil market context.',
                     'Rujukan dipaparkan di skrin. Sahkan butiran kontrak FCPO di Bursa Malaysia sebelum trading; MPOB menyediakan konteks pasaran minyak sawit.'),
          disclaimer('Seterusnya: Video 10 — Integrated CMI Multi-Timeframe SOP')]
    rr = lambda k: abs(k['tp'] - k['entry']) / abs(k['entry'] - k['sl'])
    return dict(id='ep09', file='CMI_L8_V09_FCPO_Case_Studies.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Apply the full Level 8 process to a bullish FCPO case', 'Apply it to a bearish FCPO case', 'Recognise a no-trade session', 'Separate process quality from outcome'],
                quiz=[('Case 3 missing evidence?', 'After the sweep into the POI there was no displacement and no LTF structure shift; price then closed below the POI (acceptance), invalidating the setup.'),
                      ('Why stop beyond the sweep extreme?', 'Because that is the structural invalidation: if price accepts beyond the sweep extreme, the reaction that justified the trade has failed.'),
                      ('Reviewing a losing but well-planned trade?', 'Check each step of the process (bias, POI, liquidity, confirmation, risk). If all rules were followed, it is a good trade with a bad outcome; no rule changes based on a single result.')],
                exercise=(f'Exercise 6 — Complete Bullish FCPO Analysis (Case 1): POI {k1["poi_lo"]:,}–{k1["poi_hi"]:,}, entry {k1["entry"]:,}, SL {k1["sl"]:,}, TP {k1["tp"]:,} → R:R ≈ 1:{rr(k1):.1f}, risk RM{abs(k1["entry"] - k1["sl"]) * 25:,}/contract.\n\n'
                          f'Exercise 7 — Complete Bearish FCPO Analysis (Case 2): POI {k2["poi_lo"]:,}–{k2["poi_hi"]:,}, entry {k2["entry"]:,}, SL {k2["sl"]:,}, TP {k2["tp"]:,} → R:R ≈ 1:{rr(k2):.1f}, risk RM{abs(k2["entry"] - k2["sl"]) * 25:,}/contract.\n\n'
                          'Exercise 8 — Identify a No-Trade Scenario (Case 3): list the missing confirmation and the invalidation event. Answer: no MSS/displacement after the sweep; body close below the POI low = acceptance → no trade.'),
                refs=[r[0] for r in (REF['bursa'], REF['mpob'], REF['ict'], REF['murphy'], REF['cmi'])])
