"""VIDEO 02 — Understanding Higher Timeframe Bias (Subtopic 1: A–E, H)."""
from .common import *  # noqa

NUM, TITLE = 2, 'Understanding Higher Timeframe Bias'


def bull_daily():
    """Hypothetical Daily FCPO series: decline, then bullish structure with BOS, HL into demand."""
    s = gen(4380, [(4, 4425), (9, 4120), (5, 4205), (4, 4150), (6, 4290, 'disp'), (4, 4225), (6, 4360), (5, 4238), (6, 4372)], seed=21, vol=12)
    E = s.ends
    k = dict(OH=E[0], L0=E[1], H1=E[2], L1=E[3], H2=E[4], L2=E[5], H3=E[6], L3=E[7], END=E[8])
    return s, k


def s_bias_def():
    sc = Scene('8.1', 'What is HTF bias')
    sc.visual = 'Definition box + three bias outcomes (bullish / bearish / neutral) as cards.'
    sc.say('Higher Timeframe Bias is the directional hypothesis we form from the weekly and daily charts before looking for any entry.',
           'Higher Timeframe Bias ialah hipotesis arah yang kita bentuk daripada carta weekly dan daily sebelum mencari sebarang entry.')
    sc.add(Heading('SUBTOPIC 1 · HIGHER TIMEFRAME BIAS', 'Bias is a working hypothesis', 120, 190, 48))
    sc.add(Box(120, 250, 1680, 160, None, 'HTF Bias = the direction for which the higher-timeframe evidence is currently stronger. It frames which lower-timeframe setups we study — it does not predict the next candle.',
               eyebrow='CMI DEFINITION', color='gold', bsize=27), delay=0.6)
    b = sc.say('There are three possible answers: bullish, bearish, or neutral.',
               'Terdapat tiga jawapan yang mungkin: bullish, bearish, atau neutral.')
    sc.add(Card(120, 450, 540, 330, None, 'Bullish bias', 'HH and HL, bullish BOS, bullish displacement, reactions from HTF demand, liquidity objectives above.', 'bull', 'check', size=27), at=b, delay=0.2)
    sc.add(Card(690, 450, 540, 330, None, 'Bearish bias', 'LH and LL, bearish BOS, bearish displacement, reactions from HTF supply, liquidity objectives below.', 'bear', 'check', size=27), at=b, delay=0.6)
    sc.add(Card(1260, 450, 540, 330, None, 'Neutral / unclear', 'Range, conflicting structure, no displacement, liquidity on both sides. No bias is a valid answer.', 'amber', 'check', size=27), at=b, delay=1.0)
    sc.say('Notice that neutral is a legitimate answer. When the evidence is insufficient, we do not force a direction.',
           'Perhatikan bahawa neutral ialah jawapan yang sah. Apabila bukti tidak mencukupi, kita tidak memaksa satu arah.')
    sc.say('And whichever answer we choose, the bias stays a hypothesis. We keep checking it as new candles close.',
           'Dan apa pun jawapan yang kita pilih, bias kekal sebagai hipotesis. Kita terus menyemaknya apabila candle baru ditutup.')
    return sc


def s_definitions():
    sc = Scene('8.1', 'BOS · CHoCH · MSS')
    sc.visual = 'Operational definitions table (close-based) with note on differing educator definitions.'
    sc.say('Before reading bias, we need consistent structure definitions. These are the operational definitions used throughout this series.',
           'Sebelum membaca bias, kita perlukan definisi struktur yang konsisten. Ini definisi operasi yang digunakan sepanjang siri ini.')
    sc.add(Heading('CMI OPERATIONAL DEFINITIONS', 'Structure terms used in Level 8', 120, 190, 48))
    cols = [('Term', 200), ('CMI operational definition', 1000), ('What it suggests', 456)]
    rows = []
    b = sc.say('A Break of Structure, or BOS, is a candle body closing beyond the most recent swing in the same direction as the existing structure. It suggests continuation.',
               'Break of Structure atau BOS ialah body candle yang ditutup melepasi swing terkini dalam arah yang sama dengan struktur sedia ada. Ia mencadangkan kesinambungan.')
    rows.append(dict(cells=['BOS', 'Body close beyond the latest swing high (bullish) or swing low (bearish) in the direction of the existing structure', 'Continuation'], at=b, colors=['gold']))
    b = sc.say('A Change of Character, or CHoCH, is the first close beyond the opposing swing, against the existing structure. It is an early warning, not a confirmed reversal.',
               'Change of Character atau CHoCH ialah penutupan pertama melepasi swing bertentangan, melawan struktur sedia ada. Ia amaran awal, bukan reversal yang disahkan.')
    rows.append(dict(cells=['CHoCH', 'First body close beyond the opposing swing point, against the existing structure', 'Possible change — early warning'], at=b, colors=['amber']))
    b = sc.say('A Market Structure Shift, or MSS, in CMI usage, is a CHoCH that happens with displacement, often after a liquidity sweep. It is stronger evidence of a shift, but still not a guarantee.',
               'Market Structure Shift atau MSS, dalam penggunaan CMI, ialah CHoCH yang berlaku dengan displacement, selalunya selepas liquidity sweep. Ia bukti lebih kukuh, tetapi masih bukan jaminan.')
    rows.append(dict(cells=['MSS', 'A CHoCH delivered with displacement, typically after a liquidity sweep', 'Stronger evidence of a shift'], at=b, colors=['purple']))
    sc.add(Table(cols, rows, 120, 260, 104, 24), at=rows[0]['at'])
    b = sc.say('Different educators define CHoCH and MSS differently, and some use them as the same thing. In CMI, we use body closes, not wicks, and we always state which definition we apply.',
               'Pendidik berbeza mentakrifkan CHoCH dan MSS secara berbeza, malah ada yang menganggapnya sama. Dalam CMI, kita guna penutupan body, bukan wick, dan sentiasa nyatakan definisi yang digunakan.')
    sc.add(Box(120, 640, 1680, 140, None, 'Definitions of CHoCH and MSS vary between educators. CMI uses candle-body closes and the operational definitions above, consistent with earlier CMI levels.',
               eyebrow='NOTE · DEFINITIONS VARY', color='amber', bsize=24), at=b)
    return sc


def s_bullish():
    sc = Scene('8.1', 'Bullish HTF bias')
    sc.visual = 'Daily FCPO chart built left-to-right; swing labels, BOS lines, displacement highlight, HTF demand POI, BSL objective; decision point hides future candles.'
    s, k = bull_daily()
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'BULLISH HTF BIAS · STEP BY STEP', slots=len(s) + 8, step=50)
    sc.say('Let us build a bullish higher-timeframe bias step by step on a hypothetical daily FCPO chart.',
           'Mari bina bias bullish higher timeframe langkah demi langkah pada carta daily FCPO hipotetikal.')
    sc.add(ch)
    steps = []
    ch.reveal(k['L0'] + 1, dur=2.5)
    b = sc.say('Price has been falling, and makes a low around four thousand one hundred and twenty.',
               'Harga sedang jatuh, dan membentuk low sekitar 4,120.')
    ch.ann(Mark(k['L0'], s.l[k['L0']], 'L', 'text', 'below', f"{s.l[k['L0']]:,}"), at=b, delay=0.4)
    steps.append(dict(text=f"Low at {s.l[k['L0']]:,}", at=b, color='text'))
    b = sc.say('It bounces to a swing high, then pulls back, but the pullback holds above the previous low. That is our first higher low.',
               'Ia melantun ke swing high, kemudian menarik balik, tetapi pullback itu kekal di atas low sebelumnya. Itulah higher low pertama.')
    ch.reveal(k['L1'] + 1, at=b, dur=2.5)
    ch.ann(Mark(k['H1'], s.h[k['H1']], 'H', 'text'), at=b, delay=1.0)
    ch.ann(Mark(k['L1'], s.l[k['L1']], 'HL', 'bull', 'below'), at=b, delay=2.4)
    steps.append(dict(text='Higher low holds above prior low', at=b, color='bull'))
    b = sc.say('Next, a strong, fast rally closes above that swing high. This is a bullish Break of Structure, delivered with displacement.',
               'Seterusnya, kenaikan yang kuat dan pantas ditutup di atas swing high itu. Ini bullish Break of Structure, disertai displacement.')
    ch.reveal(k['H2'] + 1, at=b, dur=1.6)
    bi = s.first_close_beyond(k['L1'], s.h[k['H1']], +1)
    ch.ann(Struct(k['H1'], bi, s.h[k['H1']], 'BOS', 'bull'), at=b, delay=1.4)
    ch.ann(VBand(k['L1'] + 1, k['H2'], 'bull', 'DISPLACEMENT', 0.08), at=b, delay=1.8)
    steps.append(dict(text='Bullish BOS with displacement', at=b, color='bull'))
    b = sc.say('Price pulls back again and forms another higher low, then breaks the next high. The bullish structure is now repeating.',
               'Harga menarik balik lagi dan membentuk higher low lain, kemudian memecahkan high seterusnya. Struktur bullish kini berulang.')
    ch.reveal(k['H3'] + 1, at=b, dur=2.5)
    ch.ann(Mark(k['H2'], s.h[k['H2']], 'HH', 'bull'), at=b, delay=0.2)
    ch.ann(Mark(k['L2'], s.l[k['L2']], 'HL', 'bull', 'below'), at=b, delay=1.2)
    bi2 = s.first_close_beyond(k['L2'], s.h[k['H2']], +1)
    ch.ann(Struct(k['H2'], bi2, s.h[k['H2']], 'BOS', 'bull'), at=b, delay=2.2)
    ch.ann(Mark(k['H3'], s.h[k['H3']], 'HH', 'bull'), at=b, delay=2.6)
    b = sc.say('The candle that started this latest impulse, the last down-close candle before the displacement, becomes a potential HTF demand zone, a bullish point of interest.',
               'Candle yang memulakan impuls terkini ini, candle down-close terakhir sebelum displacement, menjadi zon demand HTF yang berpotensi, iaitu bullish point of interest.')
    ob = s.last_opposite(k['L2'], +1)
    ch.ann(Zone(ob, None, s.l[ob], s.h[ob], 'purple', 'HTF DEMAND · BULLISH POI'), at=b, delay=0.4)
    steps.append(dict(text='Potential HTF demand / bullish POI', at=b, color='purple'))
    b = sc.say('Above current price, there is resting liquidity at an older swing high on the left. That buy-side liquidity is a potential objective.',
               'Di atas harga semasa, terdapat liquidity di swing high lama di sebelah kiri. Buy-side liquidity itu ialah sasaran yang berpotensi.')
    ch.ann(HLine(s.h[k['OH']], k['OH'], None, 'cyan', f"BSL · OLD HIGH {s.h[k['OH']]:,}"), at=b, delay=0.3)
    steps.append(dict(text='Liquidity objective above (BSL)', at=b, color='cyan'))
    b = sc.say('Now price retraces again. We stop here. This is a decision point. What do we know with only the candles on screen?',
               'Kini harga retrace semula. Kita berhenti di sini. Ini titik keputusan. Apa yang kita tahu dengan candle yang ada di skrin sahaja?')
    ch.reveal(k['L3'] + 1, at=b, dur=2)
    ch.ann(Decision(k['L3']), at=b, delay=2.0, until=b + 3)
    b = sc.say('Structure is making higher highs and higher lows. Price has returned near the demand area, and liquidity sits above. The evidence supports a bullish working hypothesis.',
               'Struktur membentuk higher high dan higher low. Harga kembali berhampiran kawasan demand, dan liquidity berada di atas. Bukti menyokong hipotesis kerja bullish.')
    ch.ann(Note('HYPOTHESIS: BULLISH', 0.25, 0.13, 'bull'), at=b, delay=0.5)
    b = sc.say('And we define what would invalidate it: a daily close below the last higher low that produced the break of structure.',
               'Dan kita tentukan apa yang membatalkannya: penutupan daily di bawah higher low terakhir yang menghasilkan break of structure.')
    ch.ann(HLine(s.l[k['L2']], k['L2'], None, 'bear', f"INVALIDATION · DAILY CLOSE < {s.l[k['L2']]:,}", above=False), at=b, delay=0.3)
    steps.append(dict(text='Invalidation defined before acting', at=b, color='bear'))
    b = sc.say('Only now do we reveal what happened next. In this example price rallied and traded through the recent high. In other cases, the hypothesis would have failed.',
               'Hanya sekarang kita dedahkan apa yang berlaku seterusnya. Dalam contoh ini harga naik melepasi high terkini. Dalam kes lain, hipotesis ini mungkin gagal.')
    ch.reveal(len(s), at=b, dur=2.5, delay=0.3)
    sc.add(Bullets(steps, 1380, 220, 500, 23, 1.75), at=steps[0]['at'])
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'EVIDENCE CHECKLIST', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.els.insert(0, sc.els.pop())  # draw panel under bullets
    return sc


def s_bearish():
    sc = Scene('8.1', 'Bearish HTF bias')
    sc.visual = 'Mirror logic on a separate hypothetical daily series: LH/LL, bearish BOS, HTF supply POI, SSL objective, invalidation above last LH.'
    s = mirror(gen(4380, [(4, 4425), (9, 4120), (5, 4205), (4, 4150), (6, 4290, 'disp'), (4, 4225), (6, 4360), (5, 4238), (6, 4372)], seed=34, vol=12), 9060)
    E = s.ends
    k = dict(OL=E[0], H0=E[1], L1=E[2], H1=E[3], L2=E[4], H2=E[5], L3=E[6], H3=E[7], END=E[8])
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'BEARISH HTF BIAS · STEP BY STEP', slots=len(s) + 8, step=50)
    sc.say('The bearish case uses the same logic in reverse, on a separate hypothetical daily chart.',
           'Kes bearish menggunakan logik yang sama secara terbalik, pada carta daily hipotetikal yang berasingan.')
    sc.add(ch)
    ch.reveal(k['H0'] + 1, dur=2.5)
    steps = []
    b = sc.say('After a rally, price makes a high. It drops, bounces, but the bounce fails below the previous high. That is a lower high.',
               'Selepas kenaikan, harga membentuk high. Ia jatuh, melantun, tetapi lantunan gagal di bawah high sebelumnya. Itulah lower high.')
    ch.reveal(k['H1'] + 1, at=b, dur=2.5)
    ch.ann(Mark(k['H0'], s.h[k['H0']], 'H', 'text', 'above', f"{s.h[k['H0']]:,}"), at=b, delay=0.2)
    ch.ann(Mark(k['L1'], s.l[k['L1']], 'L', 'text', 'below'), at=b, delay=1.2)
    ch.ann(Mark(k['H1'], s.h[k['H1']], 'LH', 'bear'), at=b, delay=2.4)
    steps.append(dict(text='Lower high fails below prior high', at=b, color='bear'))
    b = sc.say('A strong bearish move then closes below the swing low. That is a bearish Break of Structure with displacement.',
               'Pergerakan bearish yang kuat kemudian ditutup di bawah swing low. Itu bearish Break of Structure dengan displacement.')
    ch.reveal(k['L2'] + 1, at=b, dur=1.6)
    bi = s.first_close_beyond(k['H1'], s.l[k['L1']], -1)
    ch.ann(Struct(k['L1'], bi, s.l[k['L1']], 'BOS', 'bear', below=True), at=b, delay=1.4)
    ch.ann(VBand(k['H1'] + 1, k['L2'], 'bear', 'DISPLACEMENT', 0.08), at=b, delay=1.8)
    steps.append(dict(text='Bearish BOS with displacement', at=b, color='bear'))
    b = sc.say('Structure continues with another lower high and lower low. Below, an older swing low holds sell-side liquidity, a potential bearish objective.',
               'Struktur berterusan dengan lower high dan lower low lain. Di bawah, swing low lama menyimpan sell-side liquidity, iaitu sasaran bearish yang berpotensi.')
    ch.reveal(k['L3'] + 1, at=b, dur=2.5)
    ch.ann(Mark(k['L2'], s.l[k['L2']], 'LL', 'bear', 'below'), at=b, delay=0.2)
    ch.ann(Mark(k['H2'], s.h[k['H2']], 'LH', 'bear'), at=b, delay=1.2)
    ch.ann(Mark(k['L3'], s.l[k['L3']], 'LL', 'bear', 'below'), at=b, delay=2.6)
    ch.ann(HLine(s.l[k['OL']], k['OL'], None, 'cyan', f"SSL · OLD LOW {s.l[k['OL']]:,}", above=False), at=b, delay=3.0)
    steps.append(dict(text='Liquidity objective below (SSL)', at=b, color='cyan'))
    b = sc.say('The last up-close candle before this latest bearish impulse marks a potential HTF supply zone, a bearish point of interest.',
               'Candle up-close terakhir sebelum impuls bearish terkini ini menandakan zon supply HTF yang berpotensi, iaitu bearish point of interest.')
    ob = s.last_opposite(k['H2'], -1)
    ch.ann(Zone(ob, None, s.l[ob], s.h[ob], 'purple', 'HTF SUPPLY · BEARISH POI', lpos='below'), at=b, delay=0.3)
    steps.append(dict(text='Potential HTF supply / bearish POI', at=b, color='purple'))
    b = sc.say('Price retraces upward into that supply. Decision point. The evidence supports a bearish working hypothesis while price stays below the last lower high.',
               'Harga retrace ke atas ke dalam supply itu. Titik keputusan. Bukti menyokong hipotesis kerja bearish selagi harga kekal di bawah lower high terakhir.')
    ch.reveal(k['H3'] + 1, at=b, dur=2)
    ch.ann(Decision(k['H3']), at=b, delay=2.0, until=b + 1)
    ch.ann(HLine(s.h[k['H2']], k['H2'], None, 'bear', f"INVALIDATION · DAILY CLOSE > {s.h[k['H2']]:,}"), at=b, delay=2.4)
    steps.append(dict(text='Invalidation: close above last LH', at=b, color='bear'))
    b = sc.say('Then we reveal the outcome. Here, price continued lower. But remember: a valid hypothesis can still fail, which is why invalidation comes first.',
               'Kemudian kita dedahkan hasilnya. Di sini, harga terus turun. Tetapi ingat: hipotesis yang sah masih boleh gagal, sebab itu invalidation ditentukan dahulu.')
    ch.reveal(len(s), at=b, dur=2.5, delay=0.3)
    ch.ann(Note('HYPOTHESIS: BEARISH', 0.62, 0.95, 'bear'), at=b)
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'EVIDENCE CHECKLIST', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(steps, 1380, 220, 500, 23, 1.75), at=steps[0]['at'])
    return sc


def s_neutral():
    sc = Scene('8.1', 'Neutral / unclear bias')
    sc.visual = 'Range-bound daily chart: overlapping swings, EQH/EQL, no displacement. Conditions list on side panel.'
    s = gen(4460, [(5, 4535), (5, 4418, 'chop'), (5, 4532, 'chop'), (6, 4421, 'chop'), (5, 4536, 'chop'), (5, 4470, 'chop'), (4, 4505, 'chop'), (4, 4452, 'chop')], seed=8, vol=10)
    hi_i, hi_p = s.hi(0, len(s) - 1)
    lo_i, lo_p = s.lo(0, len(s) - 1)
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'NEUTRAL · RANGE-BOUND', slots=len(s) + 6, pmin=4380, pmax=4580, step=25)
    sc.say('The market does not always offer a clear direction. Here is a daily chart that has been moving sideways.',
           'Market tidak selalu memberikan arah yang jelas. Ini carta daily yang bergerak mendatar.')
    sc.add(ch)
    ch.reveal(len(s), dur=5)
    items = []
    b = sc.say('Swings overlap. Highs form near the same level, and lows form near the same level. There is liquidity on both sides.',
               'Swing bertindih. High terbentuk hampir pada paras yang sama, dan low juga begitu. Ada liquidity di kedua-dua belah.')
    ch.ann(HLine(hi_p, 0, None, 'cyan', f'EQH · BSL ≈ {hi_p:,}'), at=b, delay=0.4)
    ch.ann(HLine(lo_p, 0, None, 'cyan', f'EQL · SSL ≈ {lo_p:,}', above=False), at=b, delay=0.8)
    items.append(dict(text='Sideways / range-bound', at=b, color='amber'))
    items.append(dict(text='Liquidity on both sides', at=b, delay=0.8, color='amber'))
    b = sc.say('Neither side has broken with displacement. Breaks that do happen are quickly reversed, so structure conflicts with itself.',
               'Tiada pihak yang memecah dengan displacement. Break yang berlaku cepat berbalik, jadi struktur bercanggah sesama sendiri.')
    items.append(dict(text='No meaningful displacement', at=b, color='amber'))
    items.append(dict(text='Conflicting / unclear swings', at=b, delay=0.8, color='amber'))
    b = sc.say('This can also happen during a transition, when a bullish trend is ending but a bearish one has not yet been confirmed.',
               'Ini juga boleh berlaku semasa peralihan, apabila trend bullish berakhir tetapi trend bearish belum disahkan.')
    items.append(dict(text='Transition between conditions', at=b, color='amber'))
    b = sc.say('In these conditions, the professional answer is: bias neutral. We wait for the range to resolve, or we trade only with a separate, tested range plan.',
               'Dalam keadaan ini, jawapan profesional ialah: bias neutral. Kita tunggu range itu selesai, atau trade hanya dengan pelan range yang berasingan dan telah diuji.')
    ch.ann(Note('BIAS: NEUTRAL · WAIT FOR EVIDENCE', 0.45, 0.13, 'amber'), at=b, delay=0.4)
    items.append(dict(text='Do not force a direction', at=b, color='bear', style='cross'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'NEUTRAL CONDITIONS', 1394, 150, MONO_M, 16, 'amber', track=2.4))), at=0)
    sc.add(Bullets(items, 1380, 220, 490, 24, 1.9, 'dot'), at=items[0]['at'])
    sc.say('Forcing a bullish or bearish bias here usually means reading what we want to see, not what the chart shows.',
           'Memaksa bias bullish atau bearish di sini biasanya bermaksud membaca apa yang kita mahu lihat, bukan apa yang ditunjukkan carta.')
    return sc


def s_range():
    sc = Scene('8.1', 'HTF dealing range')
    sc.visual = 'Same bullish daily data: dealing range from the HL that produced BOS to the latest HH; equilibrium, premium/discount; retracement into discount + demand.'
    s, k = bull_daily()
    ch = Chart(s, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', 'DEALING RANGE', slots=len(s) + 8, step=50, n0=k['H3'] + 1)
    sc.say('Next, the dealing range. A dealing range is the price range between a significant swing low and a significant swing high that currently frames price.',
           'Seterusnya, dealing range. Dealing range ialah julat harga antara swing low dan swing high yang signifikan yang sedang membingkai harga.')
    sc.add(ch)
    lo, hi = s.l[k['L2']], s.h[k['H3']]
    b = sc.say('On our bullish chart, we take the higher low that produced the last break of structure, and the latest higher high.',
               'Pada carta bullish kita, kita ambil higher low yang menghasilkan break of structure terakhir, dan higher high terkini.')
    ch.ann(Mark(k['L2'], lo, 'SWING LOW', 'text', 'below', f'{lo:,}', size=18), at=b, delay=0.3)
    ch.ann(Mark(k['H3'], hi, 'SWING HIGH', 'text', 'above', f'{hi:,}', size=18), at=b, delay=0.8)
    b = sc.say('These two points are the external boundaries of the range. Everything between them is internal structure.',
               'Dua titik ini ialah sempadan luaran range. Semua di antaranya ialah struktur dalaman.')
    ch.ann(Range(k['L2'], None, lo, hi, labels=True, pd=False, eq=False), at=b)
    b = sc.say('The midpoint is equilibrium, the fifty percent level. Above it is premium. Below it is discount.',
               'Titik tengah ialah equilibrium, paras 50 peratus. Di atasnya ialah premium. Di bawahnya ialah discount.')
    ch.ann(Range(k['L2'], None, lo, hi, labels=True, pd=True, eq=True), at=b)
    b = sc.say('In a bullish context, a retracement into discount offers a location that is relatively cheaper within the range. Here, price retraces into discount and near the demand zone.',
               'Dalam konteks bullish, retracement ke discount memberikan lokasi yang relatif lebih murah dalam range. Di sini, harga retrace ke discount dan berhampiran zon demand.')
    ch.reveal(k['L3'] + 1, at=b, dur=2)
    ob = s.last_opposite(k['L2'], +1)
    ch.ann(Zone(ob, None, s.l[ob], s.h[ob], 'purple', 'HTF DEMAND'), at=b, delay=0.5)
    b = sc.say('But premium does not automatically mean sell, and discount does not automatically mean buy. Location provides context; it is not a signal.',
               'Tetapi premium tidak semestinya bermaksud sell, dan discount tidak semestinya bermaksud buy. Lokasi memberi konteks; ia bukan signal.')
    sc.add(Box(1366, 100, 518, 770, 'Premium ≠ sell. Discount ≠ buy.', 'Premium and discount describe location within the current dealing range. In a strong trend, price can stay in premium for a long time. A signal still needs structure, liquidity and LTF confirmation.',
               eyebrow='LOCATION CONTEXT', color='gold', tsize=30, bsize=24), at=b)
    sc.say('Also remember that the range changes. When price breaks the swing high or swing low, a new dealing range must be defined.',
           'Ingat juga bahawa range berubah. Apabila harga memecah swing high atau swing low, dealing range baru perlu ditentukan.')
    return sc


def s_mistakes():
    sc = Scene('8.1', 'Common mistakes')
    sc.visual = 'Six numbered red mistake cards with mini sketches.'
    sc.say('Let us finish with the most common mistakes when reading higher-timeframe bias.',
           'Mari kita akhiri dengan kesilapan paling biasa semasa membaca bias higher timeframe.')
    sc.add(Heading('HTF BIAS · COMMON MISTAKES', 'Six bias mistakes', 120, 190, 48))
    M = [('Bias from one candle', 'One big candle is not structure.', 'One: using a single candle to decide bias.', 'Satu: menggunakan satu candle sahaja untuk menentukan bias.'),
         ('Every BOS = reversal', 'A minor BOS is often only internal.', 'Two: treating every break of structure as a major trend reversal.', 'Dua: menganggap setiap break of structure sebagai reversal trend yang besar.'),
         ('Ignoring the range', 'No range, no location context.', 'Three: ignoring the dealing range, so there is no location context.', 'Tiga: mengabaikan dealing range, jadi tiada konteks lokasi.'),
         ('Retracement ≠ reversal', 'A pullback is not a new trend.', 'Four: confusing a temporary retracement with a confirmed reversal.', 'Empat: mengelirukan retracement sementara dengan reversal yang disahkan.'),
         ('Flipping with the LTF', 'HTF bias should not change every hour.', 'Five: changing the higher-timeframe bias every time a lower timeframe changes direction.', 'Lima: menukar bias higher timeframe setiap kali lower timeframe berubah arah.'),
         ('Forcing a bias', 'Neutral is a valid answer.', 'And six: forcing a bullish or bearish bias when the market is neutral.', 'Dan enam: memaksa bias bullish atau bearish apabila market neutral.')]
    w = 540
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.3)
        x = 120 + (i % 3) * (w + 30)
        y = 260 + (i // 3) * 280
        sc.add(Card(x, y, w, 250, f'{i + 1:02d}', t, bd, 'bear', 'cross', size=27), at=b)
    return sc


def build():
    sc = [intro(NUM, TITLE, 'Bullish · Bearish · Neutral · Dealing range',
                [('Define HTF bias as a working hypothesis', 'In this video you will learn to define higher-timeframe bias as a working hypothesis,', 'Dalam video ini anda akan belajar mentakrifkan bias higher timeframe sebagai hipotesis kerja,'),
                 ('Recognise bullish, bearish and neutral conditions', 'recognise bullish, bearish and neutral conditions,', 'mengenal pasti keadaan bullish, bearish dan neutral,'),
                 ('Define the dealing range, equilibrium, premium & discount', 'define the dealing range with equilibrium, premium and discount,', 'menentukan dealing range dengan equilibrium, premium dan discount,'),
                 ('Set invalidation for every bias', 'and set an invalidation level for every bias.', 'dan menetapkan paras invalidation bagi setiap bias.')],
                ['This is Subtopic One of Level 8: Higher Timeframe Bias.',
                 'Before we look for any entry, we must understand where price is within the bigger picture.'],
                ['Ini Subtopik Satu Level 8: Higher Timeframe Bias.',
                 'Sebelum mencari sebarang entry, kita mesti faham kedudukan harga dalam gambaran yang lebih besar.'],
                art=tf_stack_art),
          s_bias_def(), s_definitions(), s_bullish(), s_bearish(), s_neutral(), s_range(), s_mistakes(),
          statement('KEY TAKEAWAY', 'Bias is a hypothesis with an exit.', 'Define the invalidation before the entry.',
                    [('A higher-timeframe bias is a hypothesis built on evidence, not a prediction.', 'Bias higher timeframe ialah hipotesis yang dibina atas bukti, bukan ramalan.'),
                     ('So every bias needs a clear invalidation, defined before any entry is considered.', 'Jadi setiap bias memerlukan invalidation yang jelas, ditentukan sebelum sebarang entry dipertimbangkan.')]),
          quiz([('What evidence supports a bullish HTF bias?', 'One. What evidence supports a bullish higher-timeframe bias?', 'Satu. Apakah bukti yang menyokong bias bullish higher timeframe?'),
                ('What is the difference between BOS, CHoCH and MSS in CMI usage?', 'Two. What is the difference between BOS, CHoCH and MSS in CMI usage?', 'Dua. Apakah perbezaan antara BOS, CHoCH dan MSS dalam penggunaan CMI?'),
                ('Does discount automatically mean buy? Why?', 'Three. Does discount automatically mean buy? Why or why not?', 'Tiga. Adakah discount semestinya bermaksud buy? Kenapa?'),
                ('When should a trader stay neutral?', 'Four. When should a trader stay neutral?', 'Empat. Bilakah trader patut kekal neutral?')]),
          summary('HTF bias — what to remember', [
              ('Bias = direction with stronger HTF evidence', 'Bias is the direction with stronger higher-timeframe evidence.', 'Bias ialah arah yang mempunyai bukti higher timeframe yang lebih kukuh.'),
              ('Bullish: HH/HL, BOS, displacement, BSL above', 'Bullish bias: higher highs and lows, bullish BOS, displacement, and liquidity above.', 'Bias bullish: higher high dan low, bullish BOS, displacement, dan liquidity di atas.'),
              ('Bearish: LH/LL, BOS, displacement, SSL below', 'Bearish bias: the mirror image, with liquidity below.', 'Bias bearish: gambaran cermin, dengan liquidity di bawah.'),
              ('Neutral is a valid answer', 'Neutral is a valid answer.', 'Neutral ialah jawapan yang sah.'),
              ('Dealing range: EQ 50%, premium, discount', 'The dealing range gives location through equilibrium, premium and discount.', 'Dealing range memberi lokasi melalui equilibrium, premium dan discount.'),
              ('Location ≠ signal · invalidation first', 'Location is not a signal, and invalidation always comes first.', 'Lokasi bukan signal, dan invalidation sentiasa didahulukan.')]),
          up_next(3, 'HTF Liquidity & Directional Objectives',
                  'In Video 3 we connect bias with liquidity: previous day, week and month highs and lows, equal highs and lows, and potential draw on liquidity.',
                  'Dalam Video 3 kita hubungkan bias dengan liquidity: high dan low hari, minggu dan bulan sebelumnya, equal high dan low, dan potensi draw on liquidity.',
                  [('PDH · PWH · PMH', 'Previous day / week / month highs', 'cyan'), ('BSL · SSL · EQH · EQL', 'Where liquidity may rest', 'cyan'), ('Target ≠ prediction', 'Objectives with invalidation', 'gold')]),
          references([REF['murphy'], REF['kd'], REF['wyckoff'], REF['ict'], REF['cmi']],
                     'References for this video are on screen. Murphy and Kirkpatrick describe trend through swing highs and lows; premium, discount and MSS are ICT-derived interpretive terms.',
                     'Rujukan video ini dipaparkan di skrin. Murphy dan Kirkpatrick menerangkan trend melalui swing high dan low; premium, discount dan MSS ialah istilah tafsiran yang berasal daripada ICT.'),
          disclaimer('Seterusnya: Video 03 — HTF Liquidity & Directional Objectives')]
    return dict(id='ep02', file='CMI_L8_V02_Understanding_HTF_Bias.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Define HTF bias as a working hypothesis', 'Recognise bullish, bearish and neutral HTF conditions',
                            'Apply CMI operational definitions of BOS, CHoCH, MSS', 'Define dealing range, equilibrium, premium & discount', 'Set invalidation for every bias'],
                quiz=[('What evidence supports a bullish HTF bias?', 'HH/HL sequence, bullish BOS (body close), bullish displacement, reaction from HTF demand/bullish POI, and liquidity objectives above price (e.g., old highs/BSL). No single item is sufficient alone.'),
                      ('What is the difference between BOS, CHoCH and MSS in CMI usage?', 'BOS: close beyond the latest swing in the direction of the existing structure (continuation). CHoCH: first close beyond the opposing swing against the existing structure (early warning). MSS: a CHoCH delivered with displacement, typically after a liquidity sweep (stronger evidence, not a guarantee).'),
                      ('Does discount automatically mean buy?', 'No. Discount is location within the dealing range. It provides context only; a trade still needs HTF bias alignment, a valid POI, liquidity interaction and LTF confirmation, with defined invalidation.'),
                      ('When should a trader stay neutral?', 'When price is range-bound, swings overlap, there is no meaningful displacement, liquidity is resting on both sides, or the market is transitioning between conditions.')],
                exercise='Exercise 1 — Identify HTF Bias. On a Daily FCPO chart: (1) mark the last 3 swing highs and lows; (2) label HH/HL or LH/LL; (3) mark the last BOS (body close); (4) draw the dealing range and equilibrium; (5) state bias as bullish/bearish/neutral with ONE invalidation level. Answer guide: bias must follow the swing sequence; invalidation sits beyond the swing that produced the last BOS; if swings overlap without displacement, the correct answer is neutral.',
                refs=[r[0] for r in (REF['murphy'], REF['kd'], REF['wyckoff'], REF['ict'], REF['cmi'])])
