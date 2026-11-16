"""VIDEO 03 — HTF Liquidity & Directional Objectives (Subtopic 1: F, G, H)."""
from .common import *  # noqa

NUM, TITLE = 3, 'HTF Liquidity & Directional Objectives'


def s_levels():
    sc = Scene('8.1', 'Reference levels')
    sc.visual = 'Daily chart; previous month, previous week and previous day blocks shaded; PMH/PML, PWH/PWL, PDH/PDL lines drawn from the actual candles.'
    s = gen(4480, [(5, 4560), (6, 4455), (5, 4590), (5, 4510), (6, 4625), (6, 4535), (5, 4600), (4, 4552), (3, 4585)], seed=13, vol=12)
    n = len(s)
    today = n - 1
    pd = n - 2
    w0, w1 = n - 6, n - 2
    m0, m1 = n - 28, n - 7
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'HTF REFERENCE LEVELS', slots=n + 9, step=25)
    sc.say('Higher-timeframe bias becomes more useful when we connect it to liquidity. We start with the reference levels traders watch most.',
           'Bias higher timeframe menjadi lebih berguna apabila kita hubungkannya dengan liquidity. Kita mulakan dengan paras rujukan yang paling kerap diperhatikan trader.')
    sc.add(ch)
    ch.reveal(n, dur=3)
    items = []
    b = sc.say('The Previous Month High and Low, PMH and PML, are the extremes of the last completed month.',
               'Previous Month High dan Low, iaitu PMH dan PML, ialah titik ekstrem bulan lepas yang telah lengkap.')
    mi, mh = s.hi(m0, m1)
    li, ml = s.lo(m0, m1)
    ch.ann(VBand(m0, m1, 'purple', 'PREVIOUS MONTH', 0.06), at=b)
    ch.ann(HLine(mh, mi, None, 'purple', f'PMH {mh:,}', lpos='right'), at=b, delay=0.6)
    ch.ann(HLine(ml, li, None, 'purple', f'PML {ml:,}', above=False), at=b, delay=0.9)
    items.append(dict(text=f'PMH / PML · {mh:,} / {ml:,}', at=b, color='purple'))
    b = sc.say('The Previous Week High and Low, PWH and PWL, are the extremes of the last completed week.',
               'Previous Week High dan Low, iaitu PWH dan PWL, ialah titik ekstrem minggu lepas yang telah lengkap.')
    wi, wh = s.hi(w0, w1)
    wli, wl = s.lo(w0, w1)
    ch.ann(VBand(w0, w1, 'blue', 'PREV WEEK', 0.08), at=b)
    ch.ann(HLine(wh, wi, None, 'blue', f'PWH {wh:,}', lpos='left'), at=b, delay=0.6)
    ch.ann(HLine(wl, wli, None, 'blue', f'PWL {wl:,}', lpos='left', above=False), at=b, delay=0.9)
    items.append(dict(text=f'PWH / PWL · {wh:,} / {wl:,}', at=b, color='blue'))
    b = sc.say('And the Previous Day High and Low, PDH and PDL, are the extremes of yesterday\'s candle.',
               'Dan Previous Day High dan Low, iaitu PDH dan PDL, ialah titik ekstrem candle semalam.')
    ch.ann(HLine(s.h[pd], pd, None, 'cyan', f'PDH {s.h[pd]:,}', lpos='right', w=2.2), at=b, delay=0.3)
    ch.ann(HLine(s.l[pd], pd, None, 'cyan', f'PDL {s.l[pd]:,}', lpos='right', above=False, w=2.2), at=b, delay=0.6)
    items.append(dict(text=f'PDH / PDL · {s.h[pd]:,} / {s.l[pd]:,}', at=b, color='cyan'))
    b = sc.say('These levels are visible to almost everyone. Many traders place stops or breakout orders just beyond them, so they are commonly treated as potential liquidity references.',
               'Paras ini dapat dilihat oleh hampir semua orang. Ramai trader meletakkan stop atau order breakout di luar paras ini, jadi ia biasa dianggap sebagai rujukan liquidity yang berpotensi.')
    items.append(dict(text='Visible to most participants', at=b, color='text'))
    b = sc.say('Notice the hierarchy. Monthly levels are broader references. Daily levels are closer and more local. Higher-timeframe levels are not automatically more likely to be reached first.',
               'Perhatikan hierarkinya. Paras bulanan ialah rujukan lebih luas. Paras harian lebih dekat dan lebih setempat. Paras higher timeframe tidak semestinya dicapai dahulu.')
    items.append(dict(text='Broader ≠ reached first', at=b, color='amber'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'REFERENCE LEVELS', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(items, 1380, 220, 500, 23, 2.0), at=items[0]['at'])
    sc.say('In FCPO, define the day and the week by the official Bursa trading sessions you use, and apply that rule consistently.',
           'Bagi FCPO, takrifkan hari dan minggu mengikut sesi dagangan rasmi Bursa yang anda gunakan, dan gunakan peraturan itu secara konsisten.')
    return sc


def s_bsl_ssl():
    sc = Scene('8.1', 'BSL · SSL · EQH · EQL')
    sc.visual = 'Daily chart with equal highs and equal lows; cyan liquidity bands above highs (BSL) and below lows (SSL); text explaining why orders may cluster.'
    s = gen(4400, [(5, 4482), (5, 4420), (5, 4484), (4, 4436), (5, 4470), (5, 4398), (5, 4452), (4, 4400), (4, 4440)], seed=17, vol=8)
    E = s.ends
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'WHERE LIQUIDITY MAY REST', slots=len(s) + 8, step=20, pmin=4360, pmax=4530)
    sc.say('Buy-Side Liquidity, or BSL, refers to resting buy orders that may sit above swing highs.',
           'Buy-Side Liquidity atau BSL merujuk kepada order beli yang mungkin berada di atas swing high.')
    sc.add(ch)
    ch.reveal(len(s), dur=4)
    b = sc.say('Above a high, short sellers may keep buy-stop orders, and breakout traders may keep buy-stop entries. If price trades there, those orders can be filled.',
               'Di atas high, short seller mungkin meletakkan buy-stop, dan breakout trader mungkin meletakkan entry buy-stop. Jika harga sampai ke situ, order itu boleh dipenuhi.')
    eqh = max(s.h[E[0]], s.h[E[2]])
    ch.ann(Mark(E[0], s.h[E[0]], '', 'cyan'), at=b)
    ch.ann(Mark(E[2], s.h[E[2]], 'EQH', 'cyan'), at=b, delay=0.3)
    ch.ann(Zone(E[0], None, eqh, eqh + 14, 'cyan', 'BSL · ABOVE EQUAL HIGHS', alpha=0.12), at=b, delay=0.6)
    b = sc.say('Equal highs, two or more highs at almost the same price, are often watched because orders may cluster above an obvious level.',
               'Equal high, iaitu dua atau lebih high pada harga yang hampir sama, sering diperhatikan kerana order mungkin berkumpul di atas paras yang jelas.')
    b = sc.say('Sell-Side Liquidity, or SSL, is the mirror image: resting sell orders that may sit below swing lows and equal lows.',
               'Sell-Side Liquidity atau SSL ialah gambaran cermin: order jual yang mungkin berada di bawah swing low dan equal low.')
    eql = min(s.l[E[5]], s.l[E[7]])
    ch.ann(Mark(E[5], s.l[E[5]], '', 'cyan', 'below'), at=b)
    ch.ann(Mark(E[7], s.l[E[7]], 'EQL', 'cyan', 'below'), at=b, delay=0.3)
    ch.ann(Zone(E[5], None, eql - 14, eql, 'cyan', 'SSL · BELOW EQUAL LOWS', lpos='below', alpha=0.12), at=b, delay=0.6)
    b = sc.say('An important limit: a chart cannot show us these orders. BSL and SSL are inferred locations, based on where orders are likely to be, not observed facts.',
               'Had yang penting: carta tidak dapat menunjukkan order ini. BSL dan SSL ialah lokasi yang disimpulkan berdasarkan di mana order berkemungkinan berada, bukan fakta yang dilihat.')
    sc.add(Box(1366, 100, 518, 770, 'Inferred, not observed', 'BSL and SSL describe where resting orders are likely to cluster. A candlestick chart cannot reveal the size, owner or intention of those orders.\n\nIn market microstructure, liquidity means the ability to trade size without large price impact (Harris, 2003). SMC uses the word for these resting-order pools.',
               eyebrow='LIMITATION · HAD', color='amber', tsize=28, bsize=22), at=b)
    return sc


def s_draw():
    sc = Scene('8.1', 'Draw on liquidity')
    sc.visual = 'Current price between BSL above and SSL below; bias selects the potential objective; two-scenario plan (objective / invalidation) without revealing future.'
    s = gen(4420, [(6, 4512), (5, 4440), (6, 4545), (5, 4470), (4, 4505)], seed=29, vol=10)
    E = s.ends
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'POTENTIAL DRAW ON LIQUIDITY', slots=len(s) + 14, step=25, pmin=4400, pmax=4620)
    sc.say('Now we combine bias and liquidity. A potential draw on liquidity is the liquidity pool price may be moving toward, given the current bias.',
           'Kini kita gabungkan bias dan liquidity. Potential draw on liquidity ialah kolam liquidity yang mungkin dituju harga, berdasarkan bias semasa.')
    sc.add(ch)
    ch.reveal(len(s), dur=3)
    b = sc.say('Here the daily structure is bullish: higher highs and higher lows. Above, there is buy-side liquidity at the latest high. Below, sell-side liquidity at the last higher low.',
               'Di sini struktur daily adalah bullish: higher high dan higher low. Di atas, ada buy-side liquidity di high terkini. Di bawah, sell-side liquidity di higher low terakhir.')
    ch.ann(Mark(E[1], s.l[E[1]], 'HL', 'bull', 'below'), at=b)
    ch.ann(Mark(E[2], s.h[E[2]], 'HH', 'bull'), at=b, delay=0.3)
    ch.ann(Mark(E[3], s.l[E[3]], 'HL', 'bull', 'below'), at=b, delay=0.6)
    ch.ann(HLine(s.h[E[2]], E[2], None, 'cyan', f"BSL · {s.h[E[2]]:,}"), at=b, delay=1.0)
    ch.ann(HLine(s.l[E[3]], E[3], None, 'cyan', f"SSL · {s.l[E[3]]:,}", above=False), at=b, delay=1.3)
    b = sc.say('With a bullish bias, the buy-side liquidity above becomes the potential objective. That is a planning reference, not a prediction.',
               'Dengan bias bullish, buy-side liquidity di atas menjadi sasaran yang berpotensi. Itu rujukan perancangan, bukan ramalan.')
    n = len(s)
    ch.ann(Arrow(n - 1, s.c[-1] + 4, n + 6, s.h[E[2]] - 3, 'bull', 2.5, (8, 6), 'SCENARIO A · OBJECTIVE'), at=b, delay=0.4)
    b = sc.say('We also write the opposite scenario. If price closes below the last higher low, the bullish hypothesis is invalidated and the sell-side liquidity below becomes more relevant.',
               'Kita juga tulis senario bertentangan. Jika harga ditutup di bawah higher low terakhir, hipotesis bullish terbatal dan sell-side liquidity di bawah menjadi lebih relevan.')
    ch.ann(Arrow(n - 1, s.c[-1] - 4, n + 6, s.l[E[3]] - 8, 'bear', 2.5, (8, 6), 'SCENARIO B · INVALIDATION'), at=b, delay=0.4)
    b = sc.say('Identifying a potential target is different from predicting that price must reach it. Price can stop short, reverse early, or move to the other side first.',
               'Mengenal pasti sasaran berpotensi berbeza daripada meramal bahawa harga mesti sampai ke situ. Harga boleh berhenti lebih awal, berbalik, atau ke arah bertentangan dahulu.')
    sc.add(Box(1366, 100, 518, 770, 'Target ≠ prediction', 'A liquidity objective tells us where a bullish or bearish idea would likely aim. It never tells us that price must get there.\n\nPlan both outcomes before the session: the objective, and the invalidation.',
               eyebrow='CMI RULE', color='gold', tsize=30, bsize=24), at=b)
    return sc


def s_example(bull=True):
    sc = Scene('8.1', 'Bullish practical example' if bull else 'Bearish practical example')
    sc.visual = 'Five-step analysis on hypothetical Daily FCPO with a decision point; future candles hidden until analysis is written.'
    legs = [(5, 4380), (4, 4330), (6, 4452, 'disp'), (4, 4395), (5, 4514), (4, 4470), (4, 4512), (4, 4476), (3, 4494), (6, 4552)]
    base = gen(4300, legs, seed=41 if bull else 52, vol=9)
    s = base if bull else mirror(base, 9000)
    E = s.ends
    nd = E[8] + 1
    hp = (lambda i: s.h[i]) if bull else (lambda i: s.l[i])
    lp = (lambda i: s.l[i]) if bull else (lambda i: s.h[i])
    up, dn = ('above', 'below') if bull else ('below', 'above')
    c, side = ('bull', 'BULLISH') if bull else ('bear', 'BEARISH')
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', f'{side} EXAMPLE · 5 STEPS', slots=len(s) + 6, step=25, fit_n=nd)
    steps = []
    sc.say(f'Let us apply everything to a complete {"bullish" if bull else "bearish"} example, in five steps.',
           f'Mari aplikasikan semuanya pada contoh {"bullish" if bull else "bearish"} yang lengkap, dalam lima langkah.')
    sc.add(ch)
    ch.reveal(nd, dur=4)
    b = sc.say('Step one: the market context. Over the last weeks, price has trended ' + ('higher' if bull else 'lower') + ' on the daily chart.',
               'Langkah satu: konteks market. Dalam beberapa minggu lepas, harga bergerak ' + ('naik' if bull else 'turun') + ' pada carta daily.')
    steps.append(dict(text='1 · Context: ' + ('uptrend' if bull else 'downtrend') + ' on Daily', at=b, color=c, style='dot'))
    b = sc.say('Step two: mark the significant swing structure.',
               'Langkah dua: tandakan struktur swing yang signifikan.')
    lab_h, lab_l = ('HH', 'HL') if bull else ('LL', 'LH')
    for j, k in enumerate((1, 3, 5, 7)):
        ch.ann(Mark(E[k], lp(E[k]), lab_l, c, dn), at=b, delay=0.3 * j)
    for j, k in enumerate((2, 4)):
        ch.ann(Mark(E[k], hp(E[k]), lab_h, c, up), at=b, delay=0.2 + 0.3 * j)
    steps.append(dict(text='2 · Swings: ' + ('HH / HL' if bull else 'LH / LL'), at=b, color=c))
    b = sc.say('Step three: identify the relevant higher-timeframe liquidity. Two ' + ('highs' if bull else 'lows') + ' sit at almost the same price: equal ' + ('highs, with buy-side' if bull else 'lows, with sell-side') + ' liquidity resting beyond them.',
               'Langkah tiga: kenal pasti liquidity higher timeframe yang relevan. Dua ' + ('high' if bull else 'low') + ' berada pada harga yang hampir sama: equal ' + ('high, dengan buy-side' if bull else 'low, dengan sell-side') + ' liquidity di luarnya.')
    eq = max(s.h[E[4]], s.h[E[6]]) if bull else min(s.l[E[4]], s.l[E[6]])
    ch.ann(Mark(E[6], hp(E[6]), 'EQH' if bull else 'EQL', 'cyan', up), at=b, delay=0.3)
    ch.ann(HLine(eq, E[4], None, 'cyan', f"{'BSL · EQH' if bull else 'SSL · EQL'} {eq:,}", above=bull), at=b, delay=0.6)
    steps.append(dict(text=('3 · BSL above equal highs' if bull else '3 · SSL below equal lows'), at=b, color='cyan'))
    b = sc.say('Step four: determine the potential objective. With a ' + ('bullish' if bull else 'bearish') + ' working bias, that pool of liquidity is the potential objective.',
               'Langkah empat: tentukan sasaran berpotensi. Dengan bias kerja ' + ('bullish' if bull else 'bearish') + ', kolam liquidity itu ialah sasaran berpotensi.')
    ch.ann(Arrow(nd - 1, s.c[nd - 1], nd + 4, eq + (-3 if bull else 3), c, 2.5, (8, 6), 'POTENTIAL OBJECTIVE'), at=b, delay=0.3)
    steps.append(dict(text='4 · Objective: ' + ('BSL' if bull else 'SSL') + f' {eq:,}', at=b, color='gold'))
    b = sc.say('Step five: define what invalidates the idea. A daily close ' + ('below' if bull else 'above') + ' the last ' + ('higher low' if bull else 'lower high') + ' would break the structure the bias depends on.',
               'Langkah lima: tentukan apa yang membatalkan idea ini. Penutupan daily ' + ('di bawah' if bull else 'di atas') + ' ' + ('higher low' if bull else 'lower high') + ' terakhir akan memecahkan struktur yang menjadi asas bias.')
    inv = lp(E[7])
    ch.ann(HLine(inv, E[7], None, 'bear', f"INVALIDATION · DAILY CLOSE {'<' if bull else '>'} {inv:,}", above=not bull), at=b, delay=0.3)
    steps.append(dict(text=f"5 · Invalidation: close {'<' if bull else '>'} {inv:,}", at=b, color='bear'))
    b = sc.say('This is our decision point. The analysis is written with only the information available. Now we reveal what happened next.',
               'Inilah titik keputusan kita. Analisis ditulis hanya dengan maklumat yang ada. Kini kita dedahkan apa yang berlaku seterusnya.')
    ch.ann(Decision(nd - 1), at=b, until=b + 1)
    b = sc.say('In this case price traded through the equal ' + ('highs' if bull else 'lows') + '. Reaching the objective does not mean price must now reverse. It simply means the plan\'s objective was met, and we reassess.',
               'Dalam kes ini harga melepasi equal ' + ('high' if bull else 'low') + '. Mencapai sasaran tidak bermakna harga mesti berbalik sekarang. Ia hanya bermakna sasaran pelan tercapai, dan kita nilai semula.')
    ch.reveal(len(s), at=b, dur=2.4)
    ch.refit(len(s), at=b, dur=1.0)
    ch.ann(Note('OBJECTIVE REACHED · REASSESS', 0.4, 0.13, 'gold'), at=b, delay=2.6)
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'ANALYSIS · 5 STEPS', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(steps, 1380, 220, 500, 23, 2.0), at=steps[0]['at'])
    return sc


def s_mistakes():
    sc = Scene('8.1', 'Liquidity objective mistakes')
    sc.visual = 'Three red mistake cards.'
    sc.say('Three mistakes to avoid when combining bias and liquidity.',
           'Tiga kesilapan yang perlu dielakkan apabila menggabungkan bias dan liquidity.')
    sc.add(Heading('COMMON MISTAKES', 'Liquidity objectives are not promises', 120, 190, 48))
    M = [('Assuming every level must be swept', 'Many highs and lows are never revisited. Some are broken much later, some never.', 'One: assuming every liquidity level must be swept. Many are never revisited.', 'Satu: menganggap setiap paras liquidity mesti di-sweep. Banyak yang tidak pernah dikunjungi semula.'),
         ('Treating a target as a prediction', 'An objective is a planning reference. Price may stop short or reverse first.', 'Two: treating a potential target as a prediction.', 'Dua: menganggap sasaran berpotensi sebagai ramalan.'),
         ('No invalidation', 'Without a level that proves the idea wrong, a bias becomes an opinion.', 'Three: having an objective but no invalidation. Then the bias is only an opinion.', 'Tiga: ada sasaran tetapi tiada invalidation. Maka bias itu hanya pendapat.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.3)
        sc.add(Card(120 + i * 570, 280, 540, 380, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=28), at=b)
    return sc


def build():
    sc = [intro(NUM, TITLE, 'PDH · PWH · PMH · BSL · SSL · Draw on liquidity',
                [('Mark PDH/PDL, PWH/PWL, PMH/PML', 'In this video you will learn to mark previous day, week and month highs and lows,', 'Dalam video ini anda akan belajar menanda high dan low hari, minggu dan bulan sebelumnya,'),
                 ('Explain BSL, SSL, EQH and EQL', 'explain buy-side and sell-side liquidity, equal highs and equal lows,', 'menerangkan buy-side dan sell-side liquidity, equal high dan equal low,'),
                 ('Choose a potential objective from bias + liquidity', 'choose a potential objective by combining bias with liquidity,', 'memilih sasaran berpotensi dengan menggabungkan bias dan liquidity,'),
                 ('Separate a target from a prediction', 'and separate a potential target from a prediction.', 'dan membezakan sasaran berpotensi daripada ramalan.')],
                ['This is the second part of Subtopic One: liquidity and higher-timeframe directional objectives.',
                 'Bias tells us which direction has more evidence. Liquidity helps us see where that direction might aim.'],
                ['Ini bahagian kedua Subtopik Satu: liquidity dan sasaran arah higher timeframe.',
                 'Bias memberitahu arah mana yang mempunyai lebih bukti. Liquidity membantu kita melihat ke mana arah itu mungkin menuju.'],
                art=tf_stack_art),
          s_levels(), s_bsl_ssl(), s_draw(), s_example(True), s_example(False), s_mistakes(),
          statement('KEY TAKEAWAY', 'Liquidity shows where an idea may aim.', 'It never shows where price must go.',
                    [('Liquidity helps us identify where a bullish or bearish idea may aim.', 'Liquidity membantu kita mengenal pasti ke mana idea bullish atau bearish mungkin menuju.'),
                     ('But it never shows where price must go. Objectives and invalidation are planned together.', 'Tetapi ia tidak pernah menunjukkan ke mana harga mesti pergi. Sasaran dan invalidation dirancang bersama.')]),
          quiz([('How do BSL and SSL form?', 'One. How do buy-side and sell-side liquidity form?', 'Satu. Bagaimana buy-side dan sell-side liquidity terbentuk?'),
                ('What is the difference between a potential target and a prediction?', 'Two. What is the difference between a potential target and a prediction?', 'Dua. Apakah perbezaan antara sasaran berpotensi dan ramalan?'),
                ('Must a monthly level be reached before a daily level?', 'Three. Must a monthly level be reached before a daily level?', 'Tiga. Adakah paras bulanan mesti dicapai sebelum paras harian?')]),
          summary('HTF liquidity — what to remember', [
              ('PDH/PDL · PWH/PWL · PMH/PML are reference levels', 'Previous day, week and month highs and lows are key reference levels.', 'High dan low hari, minggu dan bulan sebelumnya ialah paras rujukan utama.'),
              ('BSL above highs · SSL below lows', 'Buy-side liquidity may rest above highs, sell-side below lows.', 'Buy-side liquidity mungkin berada di atas high, sell-side di bawah low.'),
              ('EQH / EQL attract attention', 'Equal highs and lows are obvious levels where orders may cluster.', 'Equal high dan low ialah paras jelas di mana order mungkin berkumpul.'),
              ('Liquidity is inferred, not observed', 'Liquidity pools are inferred, not observed.', 'Kolam liquidity disimpulkan, bukan dilihat.'),
              ('Bias + liquidity = potential objective', 'Bias plus liquidity gives a potential objective.', 'Bias ditambah liquidity memberikan sasaran berpotensi.'),
              ('Objective + invalidation, planned together', 'And every objective is planned together with its invalidation.', 'Dan setiap sasaran dirancang bersama invalidation-nya.')]),
          up_next(4, 'Professional Top-Down Analysis',
                  'In Video 4 we start Subtopic Two: a complete top-down workflow from weekly and daily down to the five-minute chart.',
                  'Dalam Video 4 kita mulakan Subtopik Dua: aliran kerja top-down lengkap dari weekly dan daily hingga carta 5 minit.',
                  [('Weekly / Daily', 'Context & bias', 'gold'), ('4H / 1H / 30M', 'Structure, range & POI', 'blue'), ('15M → 5M', 'Confirmation & execution', 'bull')]),
          references([REF['harris'], REF['cme'], REF['murphy'], REF['ict'], REF['cmi']],
                     'References are on screen. Harris explains liquidity in market microstructure terms; BSL, SSL and draw on liquidity are SMC and ICT interpretive terms.',
                     'Rujukan dipaparkan di skrin. Harris menerangkan liquidity dari sudut mikrostruktur market; BSL, SSL dan draw on liquidity ialah istilah tafsiran SMC dan ICT.'),
          disclaimer('Seterusnya: Video 04 — Professional Top-Down Analysis')]
    return dict(id='ep03', file='CMI_L8_V03_HTF_Liquidity_Objectives.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Mark PDH/PDL, PWH/PWL, PMH/PML', 'Explain BSL, SSL, EQH, EQL', 'Combine bias and liquidity into a potential objective', 'Distinguish a potential target from a prediction', 'Run the 5-step bullish and bearish HTF analysis'],
                quiz=[('How do BSL and SSL form?', 'BSL is inferred above swing highs/equal highs where buy-stops (short stop-losses) and breakout buy orders may rest; SSL is inferred below swing lows/equal lows where sell-stops and breakout sell orders may rest. The chart cannot confirm the orders.'),
                      ('Difference between a potential target and a prediction?', 'A potential target is a planning reference that a bias would logically aim for; a prediction claims price will get there. CMI plans targets together with invalidation and accepts price may never reach the target.'),
                      ('Must a monthly level be reached before a daily level?', 'No. HTF levels are broader references; there is no rule that they are taken first or at all.')],
                exercise='Exercise 1b — HTF bias + objective. On FCPO Daily, mark PDH/PDL, PWH/PWL, PMH/PML and any EQH/EQL. Write: (a) bias; (b) the nearest liquidity pool in the bias direction (objective); (c) invalidation level; (d) the opposite-side liquidity that becomes relevant if invalidated. Answer guide: objective must be in the direction of the bias; invalidation must be beyond the swing that supports the bias.',
                refs=[r[0] for r in (REF['harris'], REF['cme'], REF['murphy'], REF['ict'], REF['cmi'])])
