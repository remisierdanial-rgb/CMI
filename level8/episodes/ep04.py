"""VIDEO 04 — Professional Top-Down Analysis (Subtopic 2: A–I)."""
from .common import *  # noqa
from .mtfdata import mtf_bull, mtf_bear
from .topdown import s_daily, s_1h, s_15m, s_5m, s_split, keylevels, Dir

NUM, TITLE = 4, 'Professional Top-Down Analysis'


def s_what():
    sc = Scene('8.2', 'What is top-down analysis')
    sc.visual = 'Vertical funnel HTF → MTF → LTF with roles; side box on consistent process.'
    sc.say('Top-Down Analysis is a systematic process: we start on the higher timeframe and progressively narrow down to the execution timeframe.',
           'Top-Down Analysis ialah proses yang sistematik: kita bermula pada higher timeframe dan secara berperingkat mengecil ke timeframe execution.')
    sc.add(Heading('SUBTOPIC 2 · TOP-DOWN ANALYSIS', 'From context to execution, in one direction', 120, 190, 48))
    bx = []
    b = sc.say('The higher timeframe gives direction and market context.',
               'Higher timeframe memberi arah dan konteks market.')
    bx.append(dict(title='HTF = Direction & market context', sub='Weekly / Daily · bias, dealing range, major liquidity', color='gold', at=b))
    b = sc.say('The medium timeframe gives the setup, structure and location.',
               'Medium timeframe memberi setup, struktur dan lokasi.')
    bx.append(dict(title='MTF = Setup, structure & location', sub='4H / 1H / 30M · refined range, POI, internal liquidity', color='blue', at=b))
    b = sc.say('The lower timeframe gives confirmation and execution.',
               'Lower timeframe memberi pengesahan dan execution.')
    bx.append(dict(title='LTF = Confirmation & execution', sub='15M / 5M · sweep, MSS, FVG, entry, stop, invalidation', color='bull', at=b))
    sc.add(Flow(bx, 120, 260, 960, 150, 44, 'v', 28, 21), at=bx[0]['at'])
    b = sc.say('Why top-down? Because each lower timeframe is interpreted inside the context above it. Starting from the five-minute chart means interpreting signals without context.',
               'Kenapa top-down? Kerana setiap lower timeframe ditafsir dalam konteks di atasnya. Bermula dari carta 5 minit bermaksud mentafsir signal tanpa konteks.')
    sc.add(Box(1130, 260, 670, 250, 'Why top-down?', 'Each lower timeframe is read inside the context of the one above. A 5M signal has meaning only relative to the 1H location and the Daily bias.', 'PRINCIPLE', 'gold', 27, 22), at=b)
    b = sc.say('It also means we avoid randomly switching timeframes to find a chart that agrees with us. We follow the same sequence every time.',
               'Ia juga bermaksud kita elak bertukar timeframe secara rawak untuk mencari carta yang bersetuju dengan kita. Kita ikut urutan yang sama setiap kali.')
    sc.add(Box(1130, 540, 670, 250, 'One consistent process', 'Same timeframes, same order, same questions — every session. No hunting for a chart that agrees with you.', 'DISCIPLINE', 'amber', 27, 22), at=b)
    return sc


def s_workflow():
    sc = Scene('8.2', 'The multi-timeframe workflow')
    sc.visual = 'Four-step workflow table (CMI suggested FCPO), with adaptation note.'
    sc.say('Here is the suggested CMI workflow for FCPO, in four steps.',
           'Ini ialah aliran kerja CMI yang dicadangkan untuk FCPO, dalam empat langkah.')
    sc.add(Heading('CMI FCPO WORKFLOW', 'Four steps, four roles', 120, 190, 48))
    cols = [('Step', 120), ('Timeframe', 300), ('Role', 520), ('Output', 716)]
    R = [('1', 'Weekly / Daily', 'Establish broader market context', 'Bias + dealing range + HTF liquidity',
          'Step one, weekly and daily: establish the broader market context and the working bias.', 'Langkah satu, weekly dan daily: tentukan konteks market yang lebih luas dan bias kerja.'),
         ('2', '4H / 1H or 30M', 'Identify structure, range and POI', 'Selected POI + internal liquidity + target',
          'Step two, four-hour, one-hour or thirty-minute: identify structure, the refined range, and the point of interest.', 'Langkah dua, 4H, 1H atau 30M: kenal pasti struktur, range yang diperhalusi, dan point of interest.'),
         ('3', '15M', 'Observe liquidity interaction & structure shift', 'Sweep? MSS? Supports or contradicts bias?',
          'Step three, fifteen-minute: observe liquidity interaction and a possible structure shift at the POI.', 'Langkah tiga, 15 minit: perhatikan interaksi liquidity dan kemungkinan peralihan struktur di POI.'),
         ('4', '5M', 'Entry confirmation & execution', 'Entry, stop-loss, target, R:R, invalidation',
          'Step four, five-minute: look for entry confirmation and plan the execution.', 'Langkah empat, 5 minit: cari pengesahan entry dan rancang execution.')]
    rows = []
    for r in R:
        b = sc.say(r[4], r[5], 0.3)
        rows.append(dict(cells=list(r[:4]), at=b, colors=['gold', 'text']))
    sc.add(Table(cols, rows, 120, 250, 92, 23), at=rows[0]['at'])
    b = sc.say('The exact combination can be adapted to volatility, trading horizon and your methodology. What matters is that each timeframe has one clear job.',
               'Kombinasi tepat boleh disesuaikan dengan volatiliti, tempoh trading dan metodologi anda. Yang penting, setiap timeframe ada satu tugas yang jelas.')
    sc.add(Box(120, 690, 1680, 110, None, 'Adapt the combination to volatility, trading horizon and methodology — but keep one clear job per timeframe.', eyebrow='ADAPTABLE', color='amber', bsize=24), at=b)
    return sc


def s_tf_jobs():
    sc = Scene('8.2', 'What to look for on each timeframe')
    sc.visual = 'Four columns: Weekly/Daily · 4H/1H/30M · 15M · 5M checklists.'
    sc.say('Before the full demonstration, here is what we look for on each timeframe.',
           'Sebelum demonstrasi penuh, ini perkara yang kita cari pada setiap timeframe.')
    sc.add(Heading('CHECKLIST BY TIMEFRAME', 'What each layer must answer', 120, 190, 48))
    cols = [('WEEKLY / DAILY', 'gold', ['Major swing highs & lows', 'Broader trend', 'Significant liquidity levels', 'Major supply & demand', 'Current dealing range', 'Premium / discount', 'Bias: bull / bear / neutral'],
             'On weekly and daily: major swings, the broader trend, significant liquidity, major supply and demand, the dealing range, premium and discount, and the bias.',
             'Pada weekly dan daily: swing utama, trend lebih luas, liquidity signifikan, supply dan demand utama, dealing range, premium dan discount, dan bias.'),
            ('4H / 1H / 30M', 'blue', ['Refine the HTF range', 'Relevant structural levels', 'Order blocks', 'Fair value gaps', 'Breakers & other CMI POIs', 'Internal liquidity', 'Where an LTF setup may form'],
             'On four-hour to thirty-minute: refine the range, find structural levels, order blocks, fair value gaps, breakers and other POIs, and internal liquidity.',
             'Pada 4H hingga 30M: perhalusi range, cari paras struktur, order block, fair value gap, breaker dan POI lain, serta internal liquidity.'),
            ('15M', 'cyan', ['Price approaching the POI', 'Liquidity sweep', 'Internal structure', 'Possible MSS / CHoCH', 'Displacement', 'FVG formation', 'Supports or contradicts HTF?'],
             'On fifteen-minute: price approaching the POI, any liquidity sweep, internal structure, a possible MSS, displacement, a new FVG, and whether all this supports the HTF idea.',
             'Pada 15 minit: harga menghampiri POI, sebarang liquidity sweep, struktur dalaman, kemungkinan MSS, displacement, FVG baru, dan sama ada semua ini menyokong idea HTF.'),
            ('5M', 'bull', ['Entry confirmation', 'LTF market structure', 'Displacement', 'FVG retracement', 'Relevant OB / execution zone', 'Stop-loss & R:R', 'Entry invalidation'],
             'And on five-minute: entry confirmation, structure, displacement, FVG retracement, the execution zone, stop-loss, risk to reward, and invalidation.',
             'Dan pada 5 minit: pengesahan entry, struktur, displacement, retracement FVG, zon execution, stop-loss, nisbah risiko-ganjaran, dan invalidation.')]
    for i, (h, c, items, en, ms) in enumerate(cols):
        b = sc.say(en, ms, 0.3)
        x = 120 + i * 425
        sc.add(Box(x, 250, 400, 560, None, None, h, c), at=b)
        sc.add(Bullets([dict(text=t, at=b, delay=0.15 * j) for j, t in enumerate(items)], x + 18, 340, 380, 21, 2.05, 'dot', c), at=b)
    return sc


def s_conflicts():
    sc = Scene('8.2', 'Conflicting timeframe conditions')
    sc.visual = 'Six conflict situations with CMI response: WAIT / REASSESS / AVOID colour-coded.'
    sc.say('Timeframes will not always agree. Here is how CMI handles the most common conflicts.',
           'Timeframe tidak selalu bersetuju. Ini cara CMI mengendalikan percanggahan yang paling biasa.')
    sc.add(Heading('CONFLICTING CONDITIONS', 'When timeframes disagree', 120, 190, 48))
    cols = [('Situation', 760), ('Response', 220), ('Why', 676)]
    R = [('Weekly bullish, Daily bearish', 'REASSESS', 'Daily may be retracing; define which range you trade and its invalidation',
          'Weekly bullish but daily bearish: reassess. The daily may only be retracing; decide which range you are trading.', 'Weekly bullish tetapi daily bearish: nilai semula. Daily mungkin hanya retrace; tentukan range mana yang anda trade.', 'amber'),
         ('Daily bullish, 1H bearish', 'WAIT', '1H may be delivering price into a daily POI',
          'Daily bullish but one-hour bearish: wait. The one-hour may simply be delivering price into a daily point of interest.', 'Daily bullish tetapi 1 jam bearish: tunggu. Carta 1 jam mungkin hanya membawa harga ke point of interest daily.', 'amber'),
         ('HTF bullish, LTF bearish displacement', 'WAIT', 'Strong opposite displacement weakens the setup until structure shifts back',
          'Higher timeframe bullish but strong bearish displacement on the lower timeframe: wait until structure shifts back.', 'Higher timeframe bullish tetapi displacement bearish yang kuat di lower timeframe: tunggu sehingga struktur beralih semula.', 'amber'),
         ('MTF POI reached, no LTF confirmation', 'NO TRADE', 'A POI is a location, not a signal',
          'The POI is reached but no lower-timeframe confirmation appears: no trade. A POI is a location, not a signal.', 'POI dicapai tetapi tiada pengesahan lower timeframe: tiada trade. POI ialah lokasi, bukan signal.', 'bear'),
         ('LTF signal, HTF target very close', 'AVOID', 'Insufficient room to target → poor risk-to-reward',
          'A lower-timeframe signal appears but the target is very close: avoid. There is not enough room for a reasonable reward.', 'Signal lower timeframe muncul tetapi sasaran terlalu dekat: elakkan. Ruang tidak cukup untuk ganjaran yang munasabah.', 'bear'),
         ('Price already travelled far before signal', 'AVOID', 'Late entry: stop too wide or target mostly taken',
          'And if price has already travelled too far before the signal develops: avoid. The entry would be late and the stop too wide.', 'Dan jika harga sudah bergerak terlalu jauh sebelum signal terbentuk: elakkan. Entry akan lewat dan stop terlalu luas.', 'bear')]
    rows = []
    for r in R:
        b = sc.say(r[3], r[4], 0.3)
        rows.append(dict(cells=list(r[:3]), at=b, colors=['text', r[5]]))
    sc.add(Table(cols, rows, 120, 250, 88, 22), at=rows[0]['at'])
    return sc


def s_mistakes():
    sc = Scene('8.2', 'Common mistakes')
    sc.visual = 'Seven red mistake cards (4 + 3).'
    sc.say('Finally, the most common top-down analysis mistakes.',
           'Akhir sekali, kesilapan top-down analysis yang paling biasa.')
    sc.add(Heading('TOP-DOWN · COMMON MISTAKES', 'Seven ways the process breaks', 120, 190, 48))
    M = [('Starting from the 5M chart', 'Signals without context.', 'One: starting the analysis from the five-minute chart.', 'Satu: memulakan analisis dari carta 5 minit.'),
         ('LTF BOS = HTF reversal', 'A 5M break is not a daily trend change.', 'Two: treating every lower-timeframe BOS as a higher-timeframe reversal.', 'Dua: menganggap setiap BOS lower timeframe sebagai reversal higher timeframe.'),
         ('Too many timeframes', 'More charts, more conflict, less clarity.', 'Three: overcomplicating the analysis with too many timeframes.', 'Tiga: merumitkan analisis dengan terlalu banyak timeframe.'),
         ('Too many POIs', 'If everything is a POI, nothing is.', 'Four: marking too many points of interest.', 'Empat: menanda terlalu banyak point of interest.'),
         ('Ignoring major liquidity', 'Targets and risks come from liquidity.', 'Five: ignoring major liquidity targets.', 'Lima: mengabaikan sasaran liquidity utama.'),
         ('Entering before location', 'Price has not reached the intended POI.', 'Six: entering before price reaches the intended location.', 'Enam: masuk sebelum harga sampai ke lokasi yang dirancang.'),
         ('Hindsight justification', 'Drawing the setup after seeing the result.', 'And seven: using hindsight to justify a setup after seeing the result.', 'Dan tujuh: menggunakan hindsight untuk menjustifikasi setup selepas melihat hasilnya.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.25)
        r, cidx = divmod(i, 4)
        w = 405
        sc.add(Card(120 + cidx * (w + 20), 250 + r * 290, w, 260, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=25), at=b)
    return sc


def build():
    bull, bear = mtf_bull(), mtf_bear()
    kb, ks = keylevels(bull), keylevels(bear)
    sc = [intro(NUM, TITLE, 'Weekly / Daily → 4H / 1H / 30M → 15M → 5M',
                [('Explain why analysis flows from HTF to LTF', 'In this video you will learn why analysis flows from the higher to the lower timeframe,', 'Dalam video ini anda akan belajar kenapa analisis mengalir dari higher ke lower timeframe,'),
                 ('Apply the four-step CMI FCPO workflow', 'apply the four-step CMI workflow for FCPO,', 'mengaplikasikan aliran kerja empat langkah CMI untuk FCPO,'),
                 ('Follow full bullish and bearish demonstrations', 'follow complete bullish and bearish demonstrations,', 'mengikuti demonstrasi bullish dan bearish yang lengkap,'),
                 ('Handle conflicting timeframes', 'and handle conflicting timeframes.', 'dan mengendalikan timeframe yang bercanggah.')],
                ['This is Subtopic Two of Level 8: Top-Down Analysis.',
                 'Bias tells us direction. Top-down analysis turns that bias into an organised, step-by-step plan.'],
                ['Ini Subtopik Dua Level 8: Top-Down Analysis.',
                 'Bias memberitahu arah. Top-down analysis menukar bias itu kepada pelan yang tersusun, langkah demi langkah.'],
                art=tf_stack_art),
          s_what(), s_workflow(), s_tf_jobs(),
          s_daily(bull, 'Now the full bullish demonstration. All prices are hypothetical. Step one: the daily chart, showing only what is known now. Today\'s candle is still forming.',
                  'Kini demonstrasi bullish penuh. Semua harga adalah hipotetikal. Langkah satu: carta daily, hanya menunjukkan apa yang diketahui sekarang. Candle hari ini masih terbentuk.'),
          s_1h(bull), s_15m(bull), s_5m(bull),
          s_split(bull, ['Let us put the three views side by side. This is the same price movement on the daily, one-hour and five-minute charts.',
                         'The blue band on the daily chart is the window shown on the one-hour chart. The green band on the one-hour chart is the window shown on five minutes.',
                         'On the daily chart, the whole setup is just a pullback inside one candle. On one hour, it is a retracement into a POI. On five minutes, it is a sweep, a structure shift and a fair value gap.',
                         'Same move, three meanings. That is why each timeframe has a different job.'],
                  ['Mari letakkan tiga pandangan ini sebelah-menyebelah. Ini pergerakan harga yang sama pada carta daily, 1 jam dan 5 minit.',
                   'Jalur biru pada carta daily ialah tetingkap yang ditunjukkan pada carta 1 jam. Jalur hijau pada carta 1 jam ialah tetingkap carta 5 minit.',
                   'Pada carta daily, keseluruhan setup hanyalah pullback dalam satu candle. Pada 1 jam, ia retracement ke POI. Pada 5 minit, ia sweep, peralihan struktur dan fair value gap.',
                   'Pergerakan sama, tiga makna. Sebab itu setiap timeframe ada tugas berbeza.']),
          s_daily(bear, 'Now the bearish demonstration, on a separate hypothetical data set. Step one: the daily chart.',
                  'Kini demonstrasi bearish, pada set data hipotetikal yang berasingan. Langkah satu: carta daily.'),
          s_1h(bear), s_15m(bear), s_5m(bear),
          s_conflicts(), s_mistakes(),
          statement('KEY TAKEAWAY', 'Analyse top-down. Execute bottom-up.', 'Each timeframe answers one question.',
                    [('Analysis flows from the top down: context, then location, then execution.', 'Analisis mengalir dari atas ke bawah: konteks, kemudian lokasi, kemudian execution.'),
                     ('And each timeframe answers only one question. When they conflict, we wait, reassess, or stand aside.', 'Dan setiap timeframe menjawab satu soalan sahaja. Apabila bercanggah, kita tunggu, nilai semula, atau tidak trade.')]),
          quiz([('Why should analysis start on the higher timeframe?', 'One. Why should analysis start on the higher timeframe?', 'Satu. Kenapa analisis perlu bermula pada higher timeframe?'),
                ('What is the job of the 15M chart in the CMI workflow?', 'Two. What is the job of the fifteen-minute chart in the CMI workflow?', 'Dua. Apakah tugas carta 15 minit dalam aliran kerja CMI?'),
                ('What do you do if the POI is reached but no LTF confirmation appears?', 'Three. What do you do if the POI is reached but there is no lower-timeframe confirmation?', 'Tiga. Apa yang anda lakukan jika POI dicapai tetapi tiada pengesahan lower timeframe?'),
                ('What should a trader do when HTF and LTF conditions conflict?', 'Four. What should a trader do when higher and lower timeframe conditions conflict?', 'Empat. Apa yang patut dilakukan trader apabila keadaan higher dan lower timeframe bercanggah?')]),
          summary('Top-down analysis — what to remember', [
              ('HTF context → MTF setup → LTF execution', 'Higher timeframe context, medium timeframe setup, lower timeframe execution.', 'Konteks higher timeframe, setup medium timeframe, execution lower timeframe.'),
              ('Same order, every session', 'Follow the same order every session.', 'Ikut urutan yang sama setiap sesi.'),
              ('Not every OB / FVG is valid', 'Not every order block or fair value gap is a valid location.', 'Bukan setiap order block atau fair value gap ialah lokasi yang sah.'),
              ('Sweep + MSS at the POI = evidence, not certainty', 'A sweep and structure shift at the POI is evidence, not certainty.', 'Sweep dan peralihan struktur di POI ialah bukti, bukan kepastian.'),
              ('Plan entry, stop, target, R:R before entering', 'Plan entry, stop, target and risk to reward before entering.', 'Rancang entry, stop, sasaran dan nisbah risiko-ganjaran sebelum masuk.'),
              ('Conflict → wait, reassess or avoid', 'And when timeframes conflict: wait, reassess, or avoid.', 'Dan apabila timeframe bercanggah: tunggu, nilai semula, atau elakkan.')]),
          up_next(5, 'Multi-Timeframe Liquidity',
                  'In Video 5 we go deeper into Subtopic Three: external and internal range liquidity, the liquidity hierarchy, and sweep versus breakout.',
                  'Dalam Video 5 kita mendalami Subtopik Tiga: external dan internal range liquidity, hierarki liquidity, dan sweep berbanding breakout.',
                  [('ERL · IRL', 'External vs internal range liquidity', 'cyan'), ('Liquidity hierarchy', 'Monthly → intraday', 'blue'), ('Sweep vs breakout', 'Acceptance & displacement', 'amber')]),
          references([REF['murphy'], REF['pring'], REF['kd'], REF['ict'], REF['bursa']],
                     'References are on screen. Multiple-timeframe trend analysis is discussed by Murphy and Pring; the POI, sweep and MSS terminology is from SMC and ICT frameworks.',
                     'Rujukan dipaparkan di skrin. Analisis trend pelbagai timeframe dibincangkan oleh Murphy dan Pring; istilah POI, sweep dan MSS adalah daripada rangka kerja SMC dan ICT.'),
          disclaimer('Seterusnya: Video 05 — Multi-Timeframe Liquidity')]
    return dict(id='ep04', file='CMI_L8_V04_Professional_Top_Down_Analysis.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Explain why analysis flows HTF → LTF', 'Apply the 4-step CMI FCPO workflow', 'Follow full bullish & bearish demonstrations (Daily→1H→15M→5M)', 'Handle conflicting timeframe conditions', 'Avoid common top-down mistakes'],
                quiz=[('Why start on the higher timeframe?', 'Because every lower-timeframe signal is interpreted inside the HTF context (bias, range, liquidity). Starting low invites signals without context and hindsight bias.'),
                      ('Job of the 15M chart?', 'Observe price at the selected POI: liquidity sweep, internal structure, possible MSS/CHoCH, displacement, FVG formation, and whether the reaction supports or contradicts the HTF hypothesis.'),
                      ('POI reached, no LTF confirmation?', 'No trade (under the confirmation model). A POI is a location for further analysis, not an entry signal. Wait, or let the setup go.'),
                      ('HTF and LTF conflict?', 'Wait, reassess or avoid. Identify which range you are trading; do not take LTF signals against HTF context without a separate tested plan.')],
                exercise=f'Exercise 2 — Perform Top-Down Analysis. Using the bullish demo levels: Daily range {kb["d_hl"]:,}–4,620, 1H POI {kb["poi_lo"]:,}–{kb["poi_hi"]:,}, 15M SSL {kb["q_eq"]:,}, 5M FVG {kb["f_fvg"][1]:,}–{kb["f_fvg"][2]:,}. Write the full plan (bias, POI, trigger, entry {kb["entry"]:,}, SL {kb["sl"]:,}, TP {kb["tp"]:,}, R:R). Answer: R:R ≈ 1:{abs(kb["tp"] - kb["entry"]) / abs(kb["entry"] - kb["sl"]):.1f}; risk {abs(kb["entry"] - kb["sl"])} pts ≈ RM{abs(kb["entry"] - kb["sl"]) * 25:,} per contract; invalidation = acceptance below the sweep low / POI.',
                refs=[r[0] for r in (REF['murphy'], REF['pring'], REF['kd'], REF['ict'], REF['bursa'])])
