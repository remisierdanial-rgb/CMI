"""VIDEO 01 — Introduction to Multi-Timeframe Analysis."""
from .common import *  # noqa

NUM, TITLE = 1, 'Introduction to Multi-Timeframe Analysis'


def s_what_is_tf():
    sc = Scene('8.0', 'What is a timeframe')
    sc.visual = 'Three synchronised panels (4H · 1H · 15M) built from ONE 15M data set by aggregation; candles reveal left-to-right in sync.'
    base = gen(4400, [(14, 4452), (10, 4418), (16, 4505, 'norm'), (10, 4470), (14, 4538)], seed=11, vol=7)
    h1 = agg(base, 4)
    h4 = agg(base, 16)
    w = 596
    c4 = Chart(h4, 36, 100, w, 770, 'FCPO · 4H · HYPOTHETICAL', '4H · 4 CANDLES', slots=6, title_color='gold')
    c1 = Chart(h1, 36 + w + 30, 100, w, 770, 'FCPO · 1H · HYPOTHETICAL', '1H · 16 CANDLES', slots=18, title_color='blue')
    c15 = Chart(base, 36 + 2 * (w + 30), 100, w, 770, 'FCPO · 15M · HYPOTHETICAL', '15M · 64 CANDLES', slots=66, title_color='bull')
    for c in (c4, c1, c15):
        c.pmin, c.pmax = 4380, 4560
    sc.say('A timeframe is simply the amount of time that each candle represents.',
           'Timeframe ialah tempoh masa yang diwakili oleh setiap candle.')
    for c in (c4, c1, c15):
        sc.add(c)
    b = sc.say('Here is the same hypothetical FCPO price movement, drawn on three different timeframes at the same time.',
               'Ini ialah pergerakan harga FCPO hipotetikal yang sama, dilukis pada tiga timeframe berbeza serentak.')
    c4.reveal(4, at=b, dur=9, delay=0.5)
    c1.reveal(16, at=b, dur=9, delay=0.5)
    c15.reveal(64, at=b, dur=9, delay=0.5)
    sc.say('On the fifteen-minute chart we see every swing. On the one-hour chart, many of those swings merge together.',
           'Pada carta 15 minit kita nampak setiap swing. Pada carta 1 jam, banyak swing itu bercantum.')
    b = sc.say('And on the four-hour chart, the whole move becomes just four candles.',
               'Dan pada carta 4 jam, keseluruhan pergerakan itu menjadi hanya empat candle.')
    c4.ann(Note('SAME DATA · LESS DETAIL', 0.5, 0.95, 'gold'), at=b)
    b = sc.say('Nothing about the market changed. Only our viewing distance changed.',
               'Tiada apa yang berubah pada market. Hanya jarak pandangan kita yang berubah.')
    c15.ann(Note('SAME DATA · MORE DETAIL', 0.5, 0.95, 'bull'), at=b)
    sc.say('This is the foundation of multi-timeframe analysis: each timeframe answers a different question about the same price.',
           'Inilah asas multi-timeframe analysis: setiap timeframe menjawab soalan berbeza tentang harga yang sama.')
    return sc


def s_hierarchy():
    sc = Scene('8.0', 'HTF · MTF · LTF')
    sc.visual = 'Table builds row by row; amber footnote that combinations are suggestions.'
    sc.say('In this level, we group timeframes into three layers.',
           'Dalam level ini, kita bahagikan timeframe kepada tiga lapisan.')
    sc.add(Heading('LEVEL 8 · TIMEFRAME HIERARCHY', 'Three layers, three different jobs', 120, 170, 46))
    cols = [('Layer', 200), ('Timeframes', 300), ('Main job', 470), ('Question it answers', 686)]
    rows = []
    b = sc.say('The Higher Timeframe, or HTF, is the weekly and daily chart. Its job is direction and market context.',
               'Higher Timeframe atau HTF ialah carta weekly dan daily. Tugasnya ialah arah dan konteks market.')
    rows.append(dict(cells=['HTF', 'Weekly / Daily', 'Direction & context', 'Where is price within the bigger picture?'], at=b, colors=['gold', 'text', 'gold']))
    b = sc.say('The Medium Timeframe, or MTF, is the four-hour, one-hour or thirty-minute chart. Its job is setup, structure and location.',
               'Medium Timeframe atau MTF ialah carta 4H, 1H atau 30M. Tugasnya ialah setup, struktur dan lokasi.')
    rows.append(dict(cells=['MTF', '4H / 1H / 30M', 'Setup, structure, location', 'Where would a setup be worth studying?'], at=b, colors=['blue', 'text', 'blue']))
    b = sc.say('The Lower Timeframe, or LTF, is the fifteen-minute and five-minute chart. Its job is confirmation and execution.',
               'Lower Timeframe atau LTF ialah carta 15M dan 5M. Tugasnya ialah pengesahan dan execution.')
    rows.append(dict(cells=['LTF', '15M / 5M', 'Confirmation & execution', 'Is there evidence now — and where am I wrong?'], at=b, colors=['bull', 'text', 'bull']))
    sc.add(Table(cols, rows, 120, 250, 92, 25), at=rows[0]['at'])
    b = sc.say('These combinations are the suggested CMI framework for FCPO. They are not universal rules.',
               'Kombinasi ini ialah cadangan rangka kerja CMI untuk FCPO. Ia bukan peraturan universal.')
    sc.add(Box(120, 640, 1680, 150, None, 'Suggested combinations for the CMI FCPO learning framework — not mandatory. Adapt them to volatility, trading horizon and your tested methodology.',
               eyebrow='NOTE · CATATAN', color='amber', bsize=25), at=b)
    sc.say('A swing trader may use monthly, weekly and daily. A scalper may use one-hour, five-minute and one-minute. The logic stays the same.',
           'Swing trader mungkin guna monthly, weekly dan daily. Scalper mungkin guna 1H, 5M dan 1M. Logiknya tetap sama.')
    return sc


def s_why_htf():
    sc = Scene('8.0', 'Why begin with the HTF')
    sc.visual = 'Left: Daily bearish trend, last 3 daily candles highlighted. Right: the SAME 3 days on 15M (aggregated data) show bullish HH/HL. Demonstrates LTF bullish inside HTF bearish.'
    ltf = gen(4244, [(10, 4262), (6, 4246), (10, 4290), (6, 4272), (10, 4318), (6, 4300), (9, 4334)], seed=5, vol=6)
    # daily: bearish trend built first, then the last 3 days are the aggregate of the 15M data
    d0 = gen(4640, [(6, 4700), (8, 4520), (5, 4590), (9, 4400), (4, 4450), (8, 4240)], seed=3, vol=14)
    tail = agg(ltf, 19)
    daily = Series()
    for i in range(len(d0)):
        daily.add(d0.o[i], d0.h[i], d0.l[i], d0.c[i])
    for i in range(len(tail)):
        o = daily.c[-1] if i == 0 else tail.o[i]
        daily.add(o, max(tail.h[i], o), tail.l[i], tail.c[i])
    daily.validate()
    n0 = len(d0)
    nd = len(daily)
    cd = Chart(daily, 36, 100, 900, 770, 'FCPO · DAILY · HYPOTHETICAL', 'HTF CONTEXT', slots=nd + 6)
    cl = Chart(ltf, 966, 100, 918, 770, 'FCPO · 15M · HYPOTHETICAL', 'LTF STRUCTURE', slots=len(ltf) + 6, pmin=4200, pmax=4360)
    sc.say('Why should analysis begin on the higher timeframe? Let us look at an example.',
           'Kenapa analisis perlu bermula pada higher timeframe? Mari lihat satu contoh.')
    sc.add(cd)
    cd.reveal(n0, dur=3)
    b = sc.say('On the daily chart, price has been making lower highs and lower lows. The broader context is bearish.',
               'Pada carta daily, harga membentuk lower high dan lower low. Konteks yang lebih besar adalah bearish.')
    E = d0.ends
    i1, p1 = E[0], d0.h[E[0]]
    i2, p2 = E[2], d0.h[E[2]]
    i3, p3 = E[4], d0.h[E[4]]
    j1, q1 = E[1], d0.l[E[1]]
    j2, q2 = E[3], d0.l[E[3]]
    j3, q3 = E[5], d0.l[E[5]]
    cd.ann(Mark(i1, p1, 'H', 'bear'), at=b)
    cd.ann(Mark(i2, p2, 'LH', 'bear'), at=b, delay=0.6)
    cd.ann(Mark(i3, p3, 'LH', 'bear'), at=b, delay=1.2)
    cd.ann(Mark(j1, q1, 'L', 'bear', 'below'), at=b, delay=0.3)
    cd.ann(Mark(j2, q2, 'LL', 'bear', 'below'), at=b, delay=0.9)
    cd.ann(Mark(j3, q3, 'LL', 'bear', 'below'), at=b, delay=1.5)
    b = sc.say('Now the last three daily candles push higher.',
               'Kini tiga candle daily terakhir bergerak naik.')
    cd.reveal(nd, at=b, dur=1.5)
    cd.ann(VBand(n0, nd - 1, 'amber', 'LAST 3 DAYS', 0.12), at=b, delay=1.2)
    b = sc.say('If we zoom into those same three days on the fifteen-minute chart, we see higher highs and higher lows. The lower timeframe looks clearly bullish.',
               'Jika kita zoom ke tiga hari yang sama pada carta 15 minit, kita nampak higher high dan higher low. Lower timeframe kelihatan jelas bullish.')
    sc.add(cl, at=b)
    cl.reveal(len(ltf), at=b, dur=5)
    for k in (1, 3, 5):
        e = ltf.ends[k]
        cl.ann(Mark(e, ltf.l[e], 'HL', 'bull', 'below'), at=b, delay=3 + 0.3 * k)
    for k in (2, 4, 6):
        e = ltf.ends[k]
        cl.ann(Mark(e, ltf.h[e], 'HH', 'bull'), at=b, delay=3 + 0.3 * k)
    b = sc.say('Both observations are true at the same time. A bullish lower-timeframe structure can exist inside a bearish higher-timeframe environment.',
               'Kedua-dua pemerhatian ini benar pada masa yang sama. Struktur bullish di lower timeframe boleh wujud dalam persekitaran bearish di higher timeframe.')
    cd.ann(Note('HTF: STILL BEARISH CONTEXT', 0.5, 0.13, 'bear'), at=b)
    cl.ann(Note('LTF: BULLISH STRUCTURE', 0.5, 0.13, 'bull'), at=b)
    sc.say('Without the higher timeframe, a trader might treat this rally as a new uptrend. With it, the trader knows this may be only a retracement within a bearish leg, at least so far.',
           'Tanpa higher timeframe, trader mungkin anggap kenaikan ini sebagai uptrend baru. Dengan HTF, trader tahu ini mungkin hanya retracement dalam kaki bearish, setakat ini.')
    sc.say('That does not mean the rally must fail. It means the trader knows the context before deciding what the rally means.',
           'Ini tidak bermakna kenaikan itu pasti gagal. Ia bermakna trader faham konteks sebelum menilai maksud kenaikan tersebut.')
    return sc


def s_framework():
    sc = Scene('8.0', 'Direction · Setup · Execution')
    sc.visual = 'Horizontal three-box framework, then misconception card: "same signal on every timeframe" crossed out.'
    sc.say('This gives us the core framework of Level 8.',
           'Ini memberikan kita rangka kerja teras Level 8.')
    sc.add(Heading('CORE FRAMEWORK', 'Each timeframe contributes different information', 120, 170, 46))
    bx = []
    b = sc.say('HTF gives direction and market context: the dealing range, the major structure and the liquidity that may act as an objective.',
               'HTF memberi arah dan konteks market: dealing range, struktur utama dan liquidity yang mungkin menjadi sasaran.')
    bx.append(dict(title='HTF = Direction', sub='Market context, dealing range, major liquidity objectives', color='gold', tag='Weekly / Daily', at=b))
    b = sc.say('MTF gives the setup, structure and location: where a point of interest sits inside that context.',
               'MTF memberi setup, struktur dan lokasi: di mana point of interest berada dalam konteks itu.')
    bx.append(dict(title='MTF = Setup', sub='Structure, location, Point of Interest (POI)', color='blue', tag='4H / 1H / 30M', at=b))
    b = sc.say('LTF gives confirmation and execution: the evidence at that location, the entry, and the invalidation.',
               'LTF memberi pengesahan dan execution: bukti di lokasi itu, entry, dan invalidation.')
    bx.append(dict(title='LTF = Execution', sub='Confirmation, entry, stop-loss, invalidation', color='bull', tag='15M / 5M', at=b))
    sc.add(Flow(bx, 120, 260, 520, 190, 60, 'h', 30, 21), at=bx[0]['at'])
    b = sc.say('A common misunderstanding is that multi-timeframe analysis means finding the same signal on every timeframe.',
               'Salah faham yang biasa ialah multi-timeframe analysis bermaksud mencari signal yang sama pada setiap timeframe.')
    sc.add(Card(120, 530, 820, 260, None, 'Looking for the same signal on every timeframe', 'Waiting for a bullish BOS on Daily, 1H and 5M at once is not the method — and often means entering late.', 'bear', 'cross', size=25), at=b)
    b = sc.say('That is not the goal. Each layer answers its own question, and together they form one organised plan.',
               'Itu bukan matlamatnya. Setiap lapisan menjawab soalannya sendiri, dan bersama ia membentuk satu pelan yang tersusun.')
    sc.add(Card(980, 530, 820, 260, None, 'Each timeframe answers its own question', 'HTF: where are we? MTF: where would we be interested? LTF: is there evidence now, and where are we wrong?', 'bull', 'check', size=25), at=b)
    return sc


def s_roadmap():
    sc = Scene('8.0', 'Level 8 roadmap')
    sc.visual = 'Five official subtopics appear as numbered cards in fixed order, then integrated framework card.'
    sc.say('Level 8 is built on five subtopics, always in this order.',
           'Level 8 dibina atas lima subtopik, sentiasa mengikut susunan ini.')
    sc.add(Heading('LEVEL 8 · OFFICIAL STRUCTURE', 'Five subtopics, one process', 120, 170, 46))
    data = [('01', 'Higher Timeframe Bias', 'Direction, dealing range, premium & discount', 'One: Higher Timeframe Bias. Establishing the broader direction and dealing range.',
             'Satu: Higher Timeframe Bias. Menentukan arah yang lebih besar dan dealing range.'),
            ('02', 'Top-Down Analysis', 'HTF context → MTF setup → LTF execution', 'Two: Top-Down Analysis. A systematic workflow from weekly down to five-minute.',
             'Dua: Top-Down Analysis. Aliran kerja yang sistematik dari weekly hingga 5 minit.'),
            ('03', 'Multi-Timeframe Liquidity', 'BSL, SSL, ERL, IRL, liquidity mapping', 'Three: Multi-Timeframe Liquidity. Mapping buy-side and sell-side liquidity across timeframes.',
             'Tiga: Multi-Timeframe Liquidity. Memetakan buy-side dan sell-side liquidity merentas timeframe.'),
            ('04', 'POI Selection', 'OB, FVG, BB, MB, RB, supply & demand', 'Four: POI Selection. Ranking locations instead of marking every zone.',
             'Empat: POI Selection. Menyusun keutamaan lokasi, bukan menanda setiap zon.'),
            ('05', 'Entry Timeframe Alignment', 'MSS, displacement, entry models', 'Five: Entry Timeframe Alignment. Aligning lower-timeframe evidence with the plan.',
             'Lima: Entry Timeframe Alignment. Menyelaraskan bukti lower timeframe dengan pelan.')]
    w = 316
    for k, (n, t, bdy, en, ms) in enumerate(data):
        b = sc.say(en, ms, 0.25)
        sc.add(Card(120 + k * (w + 25), 260, w, 300, n, t, bdy, ['gold', 'blue', 'cyan', 'purple', 'bull'][k], None, size=24), at=b)
    b = sc.say('After the five subtopics, we combine everything into one integrated workflow with complete FCPO case studies.',
               'Selepas lima subtopik, kita gabungkan semuanya dalam satu aliran kerja bersepadu dengan kajian kes FCPO yang lengkap.')
    sc.add(Box(120, 600, 1680, 190, 'Integrated CMI Multi-Timeframe SOP', 'Weekly / Daily bias → 4H / 1H / 30M POI & liquidity → 15M interaction & structure → 5M entry planning, stop-loss, target and risk management.',
               eyebrow='VIDEOS 09–10 · INTEGRATION', color='gold', tsize=28, bsize=24), at=b)
    return sc


def s_series():
    sc = Scene('8.0', 'Video series')
    sc.visual = 'Episode roadmap table, ten rows grouped by subtopic.'
    sc.say('Here is how the ten videos in this series map to the five subtopics.',
           'Ini ialah cara sepuluh video dalam siri ini dipetakan kepada lima subtopik.')
    sc.add(Heading('SERIES ROADMAP', 'Ten videos · five subtopics', 120, 160, 44))
    cols = [('Video', 130), ('Title', 620), ('Subtopic', 520), ('Focus', 420)]
    R = [('01', 'Introduction to Multi-Timeframe Analysis', 'Overview', 'Layers & framework'),
         ('02', 'Understanding Higher Timeframe Bias', '1 · HTF Bias', 'Structure, range, P/D'),
         ('03', 'HTF Liquidity & Directional Objectives', '1 · HTF Bias', 'PDH/PDL, PWH/PWL, PMH/PML'),
         ('04', 'Professional Top-Down Analysis', '2 · Top-Down Analysis', 'W/D → 4H/1H → 15M → 5M'),
         ('05', 'Multi-Timeframe Liquidity', '3 · MTF Liquidity', 'ERL, IRL, sweep vs breakout'),
         ('06', 'Understanding POI', '4 · POI Selection', 'OB, FVG, BB, MB, RB, S&D'),
         ('07', 'Professional POI Selection', '4 · POI Selection', 'Matrix, ranking, invalidation'),
         ('08', 'Entry Timeframe Alignment', '5 · Entry Alignment', 'MSS, entry models, SL/TP'),
         ('09', 'Complete FCPO Case Studies', 'Integration', 'Bullish, bearish, no-trade'),
         ('10', 'Integrated CMI MTF SOP', 'Integration', 'Checklist & review')]
    b = sc.say('Videos two and three cover Higher Timeframe Bias. Video four covers Top-Down Analysis. Video five covers Multi-Timeframe Liquidity.',
               'Video 2 dan 3 merangkumi Higher Timeframe Bias. Video 4 merangkumi Top-Down Analysis. Video 5 merangkumi Multi-Timeframe Liquidity.')
    rows = [dict(cells=list(r), at=b, delay=0.25 * i, colors=['gold']) for i, r in enumerate(R)]
    b2 = sc.say('Videos six and seven cover POI Selection, video eight covers Entry Timeframe Alignment, and videos nine and ten integrate everything.',
                'Video 6 dan 7 merangkumi POI Selection, video 8 merangkumi Entry Timeframe Alignment, dan video 9 dan 10 menggabungkan semuanya.')
    sc.add(Table(cols, rows, 120, 200, 63, 22), at=b)
    return sc


def s_limits():
    sc = Scene('8.0', 'Limitations')
    sc.visual = 'Amber caution list; each limitation appears with narration.'
    sc.say('Before we go further, we must be honest about what multi-timeframe analysis can and cannot do.',
           'Sebelum pergi lebih jauh, kita mesti jujur tentang apa yang boleh dan tidak boleh dilakukan oleh multi-timeframe analysis.')
    sc.add(Heading('LIMITATIONS · HAD', 'What multi-timeframe analysis does not promise', 120, 170, 46))
    L = [('HTF alignment does not guarantee a higher win rate.', 'Higher-timeframe alignment does not guarantee a higher win rate.', 'Keselarasan higher timeframe tidak menjamin win rate yang lebih tinggi.'),
         ('Lower-timeframe signals can fail.', 'Lower-timeframe signals can fail.', 'Signal lower timeframe boleh gagal.'),
         ('Different timeframes can show different structure at the same time.', 'Different timeframes can show different structural conditions at the same moment.', 'Timeframe berbeza boleh menunjukkan keadaan struktur yang berbeza pada masa yang sama.'),
         ('An LTF reversal may only be a retracement in the HTF trend.', 'A lower-timeframe reversal may only be a retracement within the higher-timeframe trend.', 'Reversal di lower timeframe mungkin hanya retracement dalam trend higher timeframe.'),
         ('HTF bias is a working hypothesis — not a certainty.', 'A higher-timeframe bias is a working hypothesis, not a prediction with certainty.', 'Bias higher timeframe ialah hipotesis kerja, bukan ramalan yang pasti.'),
         ('More confluence does not automatically mean better performance.', 'More timeframe confluence does not automatically mean better trading performance.', 'Lebih banyak confluence tidak semestinya bermaksud prestasi trading yang lebih baik.'),
         ('Too many timeframes create confusion and analysis paralysis.', 'And using too many timeframes creates confusion and analysis paralysis.', 'Dan terlalu banyak timeframe mencipta kekeliruan dan analysis paralysis.')]
    items = []
    for o, en, ms in L:
        b = sc.say(en, ms, 0.3)
        items.append(dict(text=o, at=b))
    sc.add(Bullets(items, 120, 290, 1650, 31, 2.05, 'warn', 'amber'), at=items[0]['at'])
    return sc


def s_smc_framework():
    sc = Scene('8.0', 'Framework, not fact')
    sc.visual = 'Two-column comparison: what a chart shows vs what it cannot show.'
    sc.say('One more principle runs through the whole of Level 8.',
           'Satu lagi prinsip yang merentasi keseluruhan Level 8.')
    sc.add(Heading('CMI PRINCIPLE', 'SMC is an analytical framework, not verified institutional fact', 120, 170, 44))
    b = sc.say('A candlestick chart shows price, time, and, where available, volume. It shows where price traded and how it moved.',
               'Carta candlestick menunjukkan harga, masa, dan jika ada, volume. Ia menunjukkan di mana harga diniagakan dan bagaimana ia bergerak.')
    sc.add(Box(120, 270, 820, 400, 'What the chart can show', 'Open, high, low and close · swing highs and lows · where price accepted or rejected · speed and size of moves · gaps between candles.', 'CAN OBSERVE', 'bull', 28, 25), at=b)
    b = sc.say('It cannot reveal who placed orders, how large they were, or what anyone intended. Terms like liquidity sweep or order block are interpretations of price behaviour.',
               'Ia tidak dapat mendedahkan siapa yang meletakkan order, saiznya, atau niat sesiapa. Istilah seperti liquidity sweep atau order block ialah tafsiran terhadap tingkah laku harga.')
    sc.add(Box(980, 270, 820, 400, 'What the chart cannot show', 'The identity, intention, position size or resting orders of institutions. SMC labels are interpretations used to organise analysis.', 'CANNOT OBSERVE', 'bear', 28, 25), at=b)
    sc.say('So in this series, we will always speak in terms of evidence, hypotheses and invalidation, never certainty.',
           'Jadi dalam siri ini, kita sentiasa bercakap tentang bukti, hipotesis dan invalidation, bukan kepastian.')
    return sc


def s_fcpo():
    sc = Scene('8.0', 'FCPO application')
    sc.visual = 'FCPO contract reference panel + suggested timeframe table.'
    sc.say('Throughout Level 8, FCPO is our main practical market.',
           'Sepanjang Level 8, FCPO ialah market praktikal utama kita.')
    sc.add(Heading('FCPO · PRACTICAL MARKET', 'Crude Palm Oil Futures — Bursa Malaysia Derivatives', 120, 170, 44))
    b = sc.say('The CMI reference contract is twenty-five metric tonnes, with a minimum move of one ringgit per tonne. That is twenty-five ringgit per tick, per contract.',
               'Kontrak rujukan CMI ialah 25 tan metrik, dengan pergerakan minimum RM1 setiap tan. Itu bersamaan RM25 setiap tick, bagi setiap kontrak.')
    rows = [dict(cells=['Contract size', '25 metric tonnes'], at=b),
            dict(cells=['Price quote', 'RM per metric tonne'], at=b, delay=0.3),
            dict(cells=['Minimum fluctuation', 'RM1 per tonne = RM25 per tick'], at=b, delay=0.6),
            dict(cells=['Trading sessions', 'Day sessions + T+1 night session (verify)'], at=b, delay=0.9)]
    sc.add(Table([('Specification', 330), ('CMI reference', 470)], rows, 120, 250, 72, 23), at=b)
    b = sc.say('Always verify the latest contract specifications and trading hours on the official Bursa Malaysia website before trading.',
               'Sentiasa sahkan spesifikasi kontrak dan waktu dagangan terkini di laman rasmi Bursa Malaysia sebelum trading.')
    sc.add(Box(120, 620, 824, 170, None, 'Verify the latest specifications, session times, holidays and margin on bursamalaysia.com before publishing or trading.',
               eyebrow='VERIFY · SAHKAN', color='amber', bsize=23), at=b)
    b = sc.say('For timeframes, the suggested FCPO combination is weekly and daily for direction, four-hour to thirty-minute for setup, fifteen-minute for liquidity and structure confirmation, and five-minute for execution.',
               'Untuk timeframe, kombinasi FCPO yang dicadangkan ialah weekly dan daily untuk arah, 4H hingga 30M untuk setup, 15M untuk pengesahan liquidity dan struktur, dan 5M untuk execution.')
    rows2 = [dict(cells=['Broader direction', 'Weekly / Daily'], at=b, colors=['gold']),
             dict(cells=['Setup & POI', '4H / 1H / 30M'], at=b, delay=0.4, colors=['blue']),
             dict(cells=['Liquidity & structure', '15M'], at=b, delay=0.8, colors=['cyan']),
             dict(cells=['Entry execution', '5M'], at=b, delay=1.2, colors=['bull'])]
    sc.add(Table([('Purpose', 420), ('Suggested TF', 380)], rows2, 990, 250, 72, 23), at=b)
    sc.say('All FCPO prices shown in this series are hypothetical teaching illustrations, not historical trades or live recommendations.',
           'Semua harga FCPO dalam siri ini ialah ilustrasi pengajaran hipotetikal, bukan dagangan sejarah atau cadangan semasa.')
    return sc


def build():
    sc = []
    sc.append(intro(NUM, TITLE, 'Context · Setup · Execution',
                    [('Explain why traders analyse more than one timeframe', 'By the end of this video you will be able to explain why traders analyse more than one timeframe,', 'Di akhir video ini, anda boleh menerangkan kenapa trader menganalisis lebih daripada satu timeframe,'),
                     ('Distinguish HTF, MTF and LTF roles', 'distinguish the roles of the higher, medium and lower timeframe,', 'membezakan peranan higher, medium dan lower timeframe,'),
                     ('Describe the direction → setup → execution framework', 'describe the direction, setup and execution framework,', 'menerangkan rangka kerja arah, setup dan execution,'),
                     ('State the limits of multi-timeframe analysis', 'and state the limits of multi-timeframe analysis.', 'dan menyatakan had multi-timeframe analysis.')],
                    ['Welcome to Level 8 of the CMI Smart Money Concept programme: Multi-Timeframe Analysis.',
                     'In the earlier levels you learned market structure, liquidity and points of interest on a single chart. Now we connect them across timeframes.'],
                    ['Selamat datang ke Level 8 program Smart Money Concept CMI: Multi-Timeframe Analysis.',
                     'Dalam level terdahulu anda belajar market structure, liquidity dan point of interest pada satu carta. Kini kita hubungkannya merentas timeframe.'],
                    art=tf_stack_art))
    sc += [s_what_is_tf(), s_hierarchy(), s_why_htf(), s_framework(), s_smc_framework(), s_limits(), s_roadmap(), s_series(), s_fcpo()]
    sc.append(statement('KEY TAKEAWAY · CARA BERFIKIR', 'HTF gives context. MTF gives location.', 'LTF gives execution — never certainty.',
                        [('The key idea of this level is simple. The higher timeframe gives context. The medium timeframe gives location.',
                          'Idea utama level ini mudah. Higher timeframe memberi konteks. Medium timeframe memberi lokasi.'),
                         ('And the lower timeframe gives execution information, but never certainty.',
                          'Dan lower timeframe memberi maklumat execution, tetapi tidak pernah memberi kepastian.')]))
    sc.append(quiz([('Why should a trader establish HTF bias before looking for an entry?', 'One. Why should a trader establish higher timeframe bias before looking for an entry?', 'Satu. Kenapa trader perlu menentukan bias higher timeframe sebelum mencari entry?'),
                    ('What is the difference between HTF, MTF and LTF?', 'Two. What is the difference between HTF, MTF and LTF?', 'Dua. Apakah perbezaan antara HTF, MTF dan LTF?'),
                    ('Can a bullish LTF structure exist inside a bearish HTF environment?', 'Three. Can a bullish lower-timeframe structure exist inside a bearish higher-timeframe environment?', 'Tiga. Bolehkah struktur bullish lower timeframe wujud dalam persekitaran bearish higher timeframe?')]))
    sc.append(summary('Multi-timeframe analysis — what to remember', [
        ('A timeframe is a viewing distance, not a different market', 'Remember: a timeframe is a viewing distance on the same market.', 'Ingat: timeframe ialah jarak pandangan terhadap market yang sama.'),
        ('HTF = direction & context', 'The higher timeframe gives direction and context.', 'Higher timeframe memberi arah dan konteks.'),
        ('MTF = setup, structure & location', 'The medium timeframe gives setup, structure and location.', 'Medium timeframe memberi setup, struktur dan lokasi.'),
        ('LTF = confirmation & execution', 'The lower timeframe gives confirmation and execution.', 'Lower timeframe memberi pengesahan dan execution.'),
        ('Timeframe combinations are suggestions, not rules', 'Timeframe combinations are suggestions, not rules.', 'Kombinasi timeframe ialah cadangan, bukan peraturan.'),
        ('Bias is a hypothesis; signals can fail', 'And bias is a hypothesis; signals can always fail.', 'Dan bias ialah hipotesis; signal sentiasa boleh gagal.')]))
    sc.append(up_next(2, 'Understanding Higher Timeframe Bias',
                      'In Video 2 we start Subtopic One: how to read bullish, bearish and neutral higher-timeframe bias, and how to define the dealing range.',
                      'Dalam Video 2 kita mulakan Subtopik Satu: cara membaca bias bullish, bearish dan neutral di higher timeframe, dan cara menentukan dealing range.',
                      [('Bullish & bearish bias', 'HH/HL, LH/LL, BOS, CHoCH, MSS', 'bull'), ('Neutral bias', 'Ranges & conflicting structure', 'amber'), ('Dealing range', 'Equilibrium, premium & discount', 'gold')]))
    sc.append(references([REF['murphy'], REF['pring'], REF['kd'], REF['bursa'], REF['cmi']],
                         'The references for this video are shown on screen. Murphy and Pring both discuss how trends differ across time horizons.',
                         'Rujukan untuk video ini dipaparkan di skrin. Murphy dan Pring membincangkan bagaimana trend berbeza mengikut tempoh masa.'))
    sc.append(disclaimer('Seterusnya: Video 02 — Understanding Higher Timeframe Bias'))
    return dict(id='ep01', file='CMI_L8_V01_Intro_Multi_Timeframe_Analysis.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Explain why traders analyse more than one timeframe', 'Distinguish the roles of HTF, MTF and LTF',
                            'Describe the direction → setup → execution framework', 'State the limitations of multi-timeframe analysis'],
                quiz=[('Why should a trader establish HTF bias before looking for an entry?', 'Because the HTF defines the context (dealing range, major structure, liquidity objectives) in which every LTF signal must be interpreted. Without it, an LTF move cannot be judged as trend continuation or as a retracement.'),
                      ('What is the difference between HTF, MTF and LTF?', 'HTF (Weekly/Daily) = direction & context; MTF (4H/1H/30M) = setup, structure & location (POI); LTF (15M/5M) = confirmation & execution (entry, SL, invalidation).'),
                      ('Can a bullish LTF structure exist inside a bearish HTF environment?', 'Yes. The LTF can print HH/HL during an HTF retracement. It does not by itself turn the HTF bullish; it may only be a retracement within the HTF bearish leg.')],
                exercise='Open an FCPO chart. On Daily, 1H and 15M, write one sentence each describing the structure you see. Then write one sentence explaining how the three observations fit together (or conflict).',
                refs=[r[0] for r in (REF['murphy'], REF['pring'], REF['kd'], REF['bursa'], REF['cmi'])])
