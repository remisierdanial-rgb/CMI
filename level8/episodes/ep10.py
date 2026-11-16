"""VIDEO 10 — Integrated CMI Multi-Timeframe Analysis SOP (Section 5 integrated framework + SOP)."""
from .common import *  # noqa
from level8.engine.chart import agg
from .mtfdata import mtf_bull
from .topdown import keylevels

NUM, TITLE = 10, 'Integrated CMI Multi-Timeframe SOP'


def s_flow():
    sc = Scene('8.6', 'Integrated Level 8 framework')
    sc.visual = 'Exact integrated flow: WEEKLY/DAILY → HTF Bias → 4H/1H/30M → Top-Down & POI Selection → MTF Liquidity Mapping → 15M → Liquidity Interaction & Structure → 5M → Entry Alignment → Entry planning, SL, target & risk. Emphasis panel right.'
    sc.say('Here is the complete Level 8 framework in one flow.',
           'Ini rangka kerja Level 8 yang lengkap dalam satu aliran.')
    F_ = [('WEEKLY / DAILY', 'gold', 'Timeframe'), ('Higher Timeframe Bias', 'gold', None),
          ('4H / 1H / 30M', 'blue', 'Timeframe'), ('Top-Down Analysis & POI Selection', 'blue', None), ('Multi-Timeframe Liquidity Mapping', 'cyan', None),
          ('15M', 'cyan', 'Timeframe'), ('Liquidity Interaction & Structure Confirmation', 'cyan', None),
          ('5M', 'bull', 'Timeframe'), ('Entry Timeframe Alignment', 'bull', None), ('Entry Planning · Stop-Loss · Target · Risk Management', 'bull', None)]
    narr = [(0, 'We start on the weekly and daily charts, and form the higher-timeframe bias.', 'Kita bermula pada carta weekly dan daily, dan membentuk bias higher timeframe.'),
            (2, 'On four-hour, one-hour or thirty-minute, we run the top-down analysis, select the POI, and map liquidity across timeframes.', 'Pada 4H, 1H atau 30M, kita jalankan top-down analysis, pilih POI, dan petakan liquidity merentas timeframe.'),
            (5, 'On fifteen minutes, we watch the liquidity interaction and look for structure confirmation.', 'Pada 15 minit, kita perhatikan interaksi liquidity dan cari pengesahan struktur.'),
            (7, 'On five minutes, we align the entry, and plan the entry, stop-loss, target and risk.', 'Pada 5 minit, kita selaraskan entry, dan rancang entry, stop-loss, sasaran dan risiko.')]
    boxes = []
    starts = {}
    for idx, en, ms in narr:
        starts[idx] = sc.say(en, ms, 0.3)
    cur = 0
    for i, (t, c, tag) in enumerate(F_):
        if i in starts:
            cur = starts[i]
        boxes.append(dict(title=t, color=c, at=cur, delay=0.5 * (i - max(k for k in starts if k <= i))))
    x, y, bw, bh, gap = 120, 100, 940, 58, 18
    for i, bx in enumerate(boxes):
        bx['tag'] = None
    fl = Flow(boxes, x, y, bw, bh, gap, 'v', 22, 18)
    sc.add(fl, at=0)
    b = sc.say('Each timeframe contributes different information. The higher timeframe gives context, not guaranteed direction.',
               'Setiap timeframe menyumbang maklumat berbeza. Higher timeframe memberi konteks, bukan arah yang dijamin.')
    E = [('HTF determines context — not guaranteed direction', 'gold'), ('MTF identifies location and potential setup', 'blue'), ('LTF provides execution information', 'bull'),
         ('Liquidity suggests objectives and areas of interest', 'cyan'), ('POI = location for evaluation, not automatic entry', 'purple'), ('Entry confirmation does not eliminate risk', 'bear')]
    items = [dict(text=E[0][0], at=b, color=E[0][1])]
    b = sc.say('The medium timeframe identifies location and the potential setup. The lower timeframe provides execution information.',
               'Medium timeframe mengenal pasti lokasi dan setup yang berpotensi. Lower timeframe memberi maklumat execution.')
    items += [dict(text=E[1][0], at=b, color=E[1][1]), dict(text=E[2][0], at=b, delay=1.5, color=E[2][1])]
    b = sc.say('Liquidity helps identify potential objectives and areas of interest. A POI is a location for further evaluation, not an automatic entry. And entry confirmation never eliminates trading risk.',
               'Liquidity membantu mengenal pasti sasaran berpotensi dan kawasan menarik. POI ialah lokasi untuk penilaian lanjut, bukan entry automatik. Dan pengesahan entry tidak pernah menghapuskan risiko trading.')
    items += [dict(text=E[3][0], at=b, color=E[3][1]), dict(text=E[4][0], at=b, delay=2.5, color=E[4][1]), dict(text=E[5][0], at=b, delay=5, color=E[5][1])]
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1110, 100, 774, 770), text(ctx, 'WHAT EACH LAYER GIVES', 1138, 150, MONO_M, 16, 'gold', track=2.4))), at=items[0]['at'])
    sc.add(Bullets(items, 1130, 220, 740, 24, 2.6), at=items[0]['at'])
    return sc


def s_zoom():
    sc = Scene('8.6', 'Weekly → 5M · one market')
    sc.visual = 'Full-screen chart sequence on ONE data set: Weekly → Daily → 4H → 15M → 5M. Each view highlights the window the next timeframe zooms into, then dissolves into it.'
    d = mtf_bull()
    D, H, Q, F = d['D'], d['H'], d['Q'], d['F']
    Wk = agg(D, 5)
    H4 = agg(H, 4)
    k = keylevels(d)
    X, Y, Wd, Hd = 36, 100, 1848, 770
    sc.say('Let us watch the same market from the weekly chart all the way down to five minutes.',
           'Mari lihat market yang sama dari carta weekly hingga ke 5 minit.')
    cw = Chart(Wk, X, Y, Wd, Hd, 'FCPO · WEEKLY · HYPOTHETICAL', 'WEEKLY · BROAD CONTEXT', slots=len(Wk) + 3, step=100, title_color='gold')
    sc.add(cw, until=2)
    cw.reveal(len(Wk), dur=2)
    b = sc.say('Weekly: the broad picture. A decline, then a recovery. The highlighted area is where the daily chart will zoom in.',
               'Weekly: gambaran luas. Penurunan, kemudian pemulihan. Kawasan yang diserlahkan ialah tempat carta daily akan zoom.')
    cw.ann(VBand(len(Wk) - 4, len(Wk) - 1, 'gold', 'DAILY WINDOW', 0.12), at=b)
    b = sc.say('Daily: the higher-timeframe bias is bullish, with a dealing range and price retracing into discount.',
               'Daily: bias higher timeframe adalah bullish, dengan dealing range dan harga retrace ke discount.')
    cd = Chart(D, X, Y, Wd, Hd, 'FCPO · DAILY · HYPOTHETICAL', 'DAILY · HTF BIAS', slots=len(D) + 3, step=50, title_color='gold')
    sc.add(cd, at=b, until=b + 1)
    cd.reveal(len(D), at=b, dur=0.1)
    cd.ann(Range(d['dk']['l3'], None, 4440, 4620, labels=False, pd=True, eq=True), at=b, delay=0.6)
    cd.ann(VBand(len(d['Dp']), len(D) - 1, 'blue', '4H WINDOW', 0.12), at=b, delay=1.5)
    b = sc.say('Four-hour: the displacement that created the daily break, and its origin, our point of interest. Liquidity is mapped above and below.',
               'Empat jam: displacement yang menghasilkan break daily, dan asalnya, point of interest kita. Liquidity dipetakan di atas dan di bawah.')
    c4 = Chart(H4, X, Y, Wd, Hd, 'FCPO · 4H · HYPOTHETICAL', '4H · LOCATION & LIQUIDITY', slots=len(H4) + 3, step=25, title_color='blue')
    sc.add(c4, at=b, until=b + 1)
    c4.reveal(len(H4), at=b, dur=0.1)
    c4.ann(Zone(d['Hp'].ends[1] // 4, None, k['poi_lo'], k['poi_hi'], 'purple', 'POI', alpha=0.2), at=b, delay=0.6)
    c4.ann(HLine(k['tp'], d['Hp'].ends[6] // 4, None, 'cyan', f"BSL {k['tp']:,}"), at=b, delay=1)
    c4.ann(HLine(k['q_eq'], len(H4) - 4, None, 'cyan', f"SSL {k['q_eq']:,}", above=False), at=b, delay=1.3)
    c4.ann(VBand(len(d['Hp']) // 4, len(H4) - 1, 'cyan', '15M WINDOW', 0.12), at=b, delay=1.8)
    b = sc.say('Fifteen minutes: the sweep of sell-side liquidity into the POI, and the bullish market structure shift.',
               'Lima belas minit: sweep sell-side liquidity ke dalam POI, dan bullish market structure shift.')
    cq = Chart(Q, X, Y, Wd, Hd, 'FCPO · 15M · HYPOTHETICAL', '15M · INTERACTION & STRUCTURE', slots=len(Q) + 3, step=10, title_color='cyan')
    sc.add(cq, at=b, until=b + 1)
    cq.reveal(len(Q), at=b, dur=0.1)
    cq.ann(Mark(k['q_sweep'], k['sweep'], 'SWEEP', 'amber', 'below', size=16), at=b, delay=0.6)
    cq.ann(Struct(k['q_sw_i'], k['q_mss'], k['q_sw'], 'MSS', 'bull'), at=b, delay=1)
    cq.ann(VBand(len(d['Qp']), len(Q) - 1, 'bull', '5M WINDOW', 0.1), at=b, delay=1.6)
    b = sc.say('Five minutes: the displacement, the fair value gap, and a planned entry with a structural stop and a liquidity target.',
               'Lima minit: displacement, fair value gap, dan entry yang dirancang dengan stop struktur dan sasaran liquidity.')
    cf = Chart(F, X, Y, Wd, Hd, 'FCPO · 5M · HYPOTHETICAL', '5M · EXECUTION', slots=len(F) + 8, step=10, title_color='bull',
               pmin=k['sl'] - 10, pmax=k['tp'] + 10)
    sc.add(cf, at=b)
    cf.reveal(len(F), at=b, dur=0.1)
    fv = k['f_fvg']
    cf.ann(Zone(fv[0] - 1, None, fv[1], fv[2], 'blue', 'FVG', alpha=0.25), at=b, delay=0.6)
    cf.ann(Position(d['f']['disp'] + 1, len(F) + 5, k['entry'], k['sl'], k['tp'], 'long'), at=b, delay=1.2)
    sc.say('One market, five views. Each view answered one question, and together they produced one plan, with its risk defined in advance.',
           'Satu market, lima pandangan. Setiap pandangan menjawab satu soalan, dan bersama ia menghasilkan satu pelan, dengan risiko yang ditentukan lebih awal.')
    return sc


def checklist_scene(code, title, heading, eyebrow, intro_en, intro_ms, items, color, closing=None):
    sc = Scene('8.6', title)
    sc.visual = f'{heading}: numbered checklist, items appear with narration.'
    sc.say(intro_en, intro_ms)
    sc.add(Heading(eyebrow, heading, 120, 170, 46))
    its = []
    for i, (txt, en, ms) in enumerate(items):
        b = sc.say(en, ms, 0.3)
        its.append(dict(text=txt, at=b, num=f'{i + 1:02d}', style='num'))
    half = (len(its) + 1) // 2
    sc.add(Bullets(its[:half], 120, 270, 820, 26, 2.45, 'num', color), at=its[0]['at'])
    if its[half:]:
        sc.add(Bullets(its[half:], 1000, 270, 820, 26, 2.45, 'num', color), at=its[half]['at'])
    if closing:
        b = sc.say(*closing[1:])
        sc.add(Pill(closing[0], W / 2, 830, 'amber', 16), at=b)
    return sc


def s_premarket():
    return checklist_scene('8.6', 'SOP · Pre-market preparation', 'Before the session opens', 'SOP STEP 1 · PRE-MARKET PREPARATION',
                           'Step one of the SOP is pre-market preparation, done before the session opens.',
                           'Langkah satu SOP ialah persediaan pra-market, dilakukan sebelum sesi dibuka.',
                           [('Weekly / Daily bias + invalidation written', 'Write the weekly and daily bias, with its invalidation level.', 'Tulis bias weekly dan daily, bersama paras invalidation-nya.'),
                            ('Mark PMH/PML, PWH/PWL, PDH/PDL, EQH/EQL', 'Mark monthly, weekly and daily highs and lows, and any equal highs or lows.', 'Tandakan high dan low bulanan, mingguan dan harian, serta sebarang equal high atau low.'),
                            ('Dealing range, EQ, premium / discount', 'Define the dealing range, equilibrium, premium and discount.', 'Tentukan dealing range, equilibrium, premium dan discount.'),
                            ('Select and rank 1–2 MTF POIs (matrix)', 'Select and rank one or two medium-timeframe POIs using the matrix.', 'Pilih dan susun satu atau dua POI medium timeframe menggunakan matriks.'),
                            ('Targets at opposing liquidity; expected R:R', 'Mark targets at opposing liquidity and estimate the risk to reward.', 'Tandakan sasaran di liquidity bertentangan dan anggarkan nisbah risiko-ganjaran.'),
                            ('Check Bursa session times, holidays, news', 'Check the official Bursa session times, holidays and scheduled news.', 'Semak waktu sesi rasmi Bursa, cuti dan berita yang dijadualkan.'),
                            ('Write Scenario A and Scenario B', 'Write scenario A in the direction of the bias, and scenario B for invalidation.', 'Tulis senario A searah bias, dan senario B untuk invalidation.'),
                            ('Define max risk per trade in RM', 'And define your maximum risk per trade in ringgit.', 'Dan tentukan risiko maksimum setiap trade dalam ringgit.')], 'gold')


def s_live():
    sc = checklist_scene('8.6', 'SOP · Live market observation', 'During the session', 'SOP STEP 2 · LIVE MARKET OBSERVATION',
                         'Step two is live market observation. Most of this step is waiting.',
                         'Langkah dua ialah pemerhatian market secara langsung. Kebanyakan langkah ini ialah menunggu.',
                         [('Wait for price to reach the selected POI', 'Wait for price to reach the selected POI.', 'Tunggu harga sampai ke POI yang dipilih.'),
                          ('15M: liquidity interaction at the POI', 'On fifteen minutes, observe the liquidity interaction.', 'Pada 15 minit, perhatikan interaksi liquidity.'),
                          ('Sweep vs breakout: judge acceptance', 'Judge sweep versus breakout by acceptance.', 'Nilai sweep berbanding breakout melalui penerimaan.'),
                          ('MSS with displacement, at the POI', 'Look for a structure shift with displacement, at the POI.', 'Cari peralihan struktur dengan displacement, di POI.'),
                          ('5M: execution zone per entry model', 'On five minutes, identify the execution zone for your entry model.', 'Pada 5 minit, kenal pasti zon execution untuk model entry anda.'),
                          ('Re-check no-trade conditions', 'Re-check every no-trade condition before acting.', 'Semak semula setiap keadaan tiada trade sebelum bertindak.')], 'bull')
    b = sc.say('Position size follows the stop. With twenty-five ringgit per point per contract, a forty-seven point stop risks about one thousand one hundred and seventy-five ringgit per contract. If that exceeds your maximum risk, reduce size or skip the trade.',
               'Saiz posisi mengikut stop. Dengan RM25 setiap mata bagi setiap kontrak, stop 47 mata berisiko kira-kira RM1,175 bagi setiap kontrak. Jika ia melebihi risiko maksimum anda, kurangkan saiz atau abaikan trade.')
    sc.add(Box(120, 720, 1680, 110, None, 'Risk per contract = stop distance (points) × RM25. Example: 47 pts × RM25 = RM1,175. If this exceeds your max risk per trade → reduce size or skip. (Verify tick value with Bursa.)',
               eyebrow='POSITION SIZING · CMI REFERENCE', color='amber', bsize=22), at=b)
    return sc


def s_checklist():
    sc = Scene('8.6', 'SOP · Entry alignment checklist')
    sc.visual = 'Entry alignment checklist with YES / NO boxes; rule: any NO = no trade.'
    sc.say('Step three is the entry alignment checklist. Every answer must be yes.',
           'Langkah tiga ialah senarai semak penyelarasan entry. Setiap jawapan mesti ya.')
    sc.add(Heading('SOP STEP 3 · ENTRY ALIGNMENT CHECKLIST', 'Every answer must be YES', 120, 170, 46))
    Q_ = ['HTF bias is clear and not invalidated', 'Price is at the selected, ranked MTF POI', 'POI is in the correct half of the HTF range',
          'Liquidity was swept into / near the POI', 'LTF MSS occurred at the POI, with displacement', 'Execution zone valid for the chosen entry model',
          'Stop is structural (beyond invalidation)', 'Target is opposing liquidity with enough room', 'R:R meets the tested plan minimum',
          'Risk in RM is within the per-trade limit', 'No no-trade condition is present']
    b = sc.say('Bias clear. Price at the POI. POI in the correct half of the range. Liquidity swept. A structure shift with displacement at the POI. A valid execution zone.',
               'Bias jelas. Harga di POI. POI di separuh range yang betul. Liquidity telah di-sweep. Peralihan struktur dengan displacement di POI. Zon execution yang sah.')
    b2 = sc.say('A structural stop. A target at opposing liquidity with room. Acceptable risk to reward. Risk in ringgit within your limit. And no no-trade condition present.',
                'Stop struktur. Sasaran di liquidity bertentangan dengan ruang. Nisbah risiko-ganjaran yang boleh diterima. Risiko dalam ringgit dalam had anda. Dan tiada keadaan tiada trade.')

    def draw(ctx, t):
        for i, q in enumerate(Q_):
            a = ease((t - 0.7 * i) / 0.4)
            if a <= 0:
                continue
            col_, row = divmod(i, 6)
            x = 120 + col_ * 860
            y = 250 + row * 92
            panel(ctx, x, y, 820, 74, a, r=8)
            text(ctx, f'{i + 1:02d}', x + 22, y + 46, MONO_SB, 20, 'gold', a)
            text(ctx, q, x + 78, y + 46, SANS_M, 23, 'text', a)
            for j, (lab, c) in enumerate((('YES', 'bull'), ('NO', 'bear'))):
                bx = x + 650 + j * 82
                rrect(ctx, bx, y + 20, 70, 34, 6)
                ctx.set_source_rgba(*col(c, 0.9 * a))
                ctx.set_line_width(1.6)
                ctx.stroke()
                text(ctx, lab, bx + 35, y + 43, MONO_SB, 15, c, a, align='center')
    sc.add(Custom(draw, fade=0.3), at=b)
    b = sc.say('The rule is simple: any single no means no trade.',
               'Peraturannya mudah: satu jawapan tidak sahaja bermaksud tiada trade.')
    sc.add(Pill('ANY SINGLE "NO" = NO TRADE', 1410, 790, 'bear', 18), at=b)
    return sc


def s_review():
    return checklist_scene('8.6', 'SOP · Post-trade review', 'Review the process, not just the P&L', 'SOP STEP 4 · POST-TRADE REVIEW',
                           'Step four is the post-trade review, including sessions where you did not trade.',
                           'Langkah empat ialah semakan selepas trade, termasuk sesi di mana anda tidak trade.',
                           [('Screenshot every timeframe at decision time', 'Save a screenshot of every timeframe at the moment of decision.', 'Simpan tangkapan skrin setiap timeframe pada saat keputusan.'),
                            ('Was the HTF bias valid at the time?', 'Was the bias valid with the information available then?', 'Adakah bias sah dengan maklumat yang ada pada masa itu?'),
                            ('POI rank and matrix — still agree?', 'Did the POI ranking follow the matrix?', 'Adakah penyusunan POI mengikut matriks?'),
                            ('Which evidence was present / missing?', 'Which confirmation evidence was present, and which was missing?', 'Bukti pengesahan mana yang ada, dan mana yang tiada?'),
                            ('Entry model, stop and target followed rules?', 'Were the entry, stop and target placed by the rules?', 'Adakah entry, stop dan sasaran diletakkan mengikut peraturan?'),
                            ('Result in R and RM', 'Record the result in R multiples and ringgit.', 'Rekod hasil dalam gandaan R dan ringgit.'),
                            ('Process grade separate from outcome', 'Grade the process separately from the outcome.', 'Nilai proses berasingan daripada hasil.'),
                            ('Weekly review before changing any rule', 'And only change rules after a weekly review of many trades, never after one result.', 'Dan hanya ubah peraturan selepas semakan mingguan banyak trade, bukan selepas satu hasil.')], 'blue')


def s_mistakes():
    sc = Scene('8.6', 'Level 8 common mistakes')
    sc.visual = 'Five cards, one per subtopic, with the single most important mistake.'
    sc.say('Across Level 8, here is the single most important mistake for each subtopic.',
           'Merentas Level 8, ini satu kesilapan paling penting bagi setiap subtopik.')
    sc.add(Heading('LEVEL 8 · COMMON MISTAKES', 'One mistake per subtopic', 120, 170, 46))
    M = [('01 · HTF Bias', 'Forcing a bias in a neutral market; flipping bias with every LTF move.', 'Higher timeframe bias: forcing a bias in a neutral market, or flipping it with every lower-timeframe move.', 'Higher timeframe bias: memaksa bias dalam market neutral, atau menukarnya dengan setiap pergerakan lower timeframe.'),
         ('02 · Top-Down', 'Starting on 5M; justifying setups with hindsight.', 'Top-down analysis: starting on five minutes, and justifying setups with hindsight.', 'Top-down analysis: bermula pada 5 minit, dan menjustifikasi setup dengan hindsight.'),
         ('03 · MTF Liquidity', 'Treating every sweep as a guaranteed reversal.', 'Liquidity: treating every sweep as a guaranteed reversal.', 'Liquidity: menganggap setiap sweep sebagai reversal yang dijamin.'),
         ('04 · POI Selection', 'Entering because price touched a POI.', 'POI selection: entering simply because price touched a POI.', 'POI selection: masuk semata-mata kerana harga menyentuh POI.'),
         ('05 · Entry Alignment', 'Confusing confirmation with certainty; moving stops without rules.', 'Entry alignment: confusing confirmation with certainty, and moving stops without rules.', 'Entry alignment: mengelirukan pengesahan dengan kepastian, dan mengalihkan stop tanpa peraturan.')]
    for i, (t, bd, en, ms) in enumerate(M):
        b = sc.say(en, ms, 0.3)
        sc.add(Card(120 + i * 340, 260, 320, 420, None, t, bd, 'bear', 'cross', size=25), at=b)
    return sc


def s_assessment():
    sc = Scene('8.6', 'Knowledge assessment')
    sc.visual = 'Ten-question Level 8 assessment; answers in the workbook.'
    sc.say('Finally, the Level 8 knowledge assessment. Pause the video and answer all ten questions.',
           'Akhir sekali, penilaian pengetahuan Level 8. Berhenti seketika dan jawab kesemua sepuluh soalan.')
    sc.add(Heading('LEVEL 8 · KNOWLEDGE ASSESSMENT', 'Ten questions · answers in the workbook', 120, 170, 44))
    Q_ = ['Why establish HTF bias before looking for an entry?', 'What is the difference between HTF, MTF and LTF?', 'Can a bullish LTF structure exist inside a bearish HTF?',
          'What is the difference between IRL and ERL?', 'How do BSL and SSL form?', 'Liquidity sweep vs breakout — what is the difference?',
          'Why is a POI not an automatic entry signal?', 'Which factors matter when selecting a POI?', 'Why wait for entry confirmation?', 'What do you do when HTF and LTF conflict?']
    b = sc.say('Questions one to five cover bias, timeframe roles and liquidity.',
               'Soalan satu hingga lima merangkumi bias, peranan timeframe dan liquidity.')
    i1 = [dict(text=q, at=b, delay=0.6 * i, num=f'Q{i + 1}', style='num') for i, q in enumerate(Q_[:5])]
    b = sc.say('Questions six to ten cover sweeps, POIs, confirmation and conflicting timeframes.',
               'Soalan enam hingga sepuluh merangkumi sweep, POI, pengesahan dan timeframe yang bercanggah.')
    i2 = [dict(text=q, at=b, delay=0.6 * i, num=f'Q{i + 6}', style='num') for i, q in enumerate(Q_[5:])]
    sc.add(Bullets(i1, 120, 260, 820, 24, 2.9, 'num', 'gold'), at=i1[0]['at'])
    sc.add(Bullets(i2, 1000, 260, 820, 24, 2.9, 'num', 'gold'), at=i2[0]['at'])
    sc.say('Model answers, with explanations, and the eight practical chart exercises are in the Level 8 workbook.',
           'Jawapan contoh, bersama penerangan, dan lapan latihan carta praktikal ada dalam buku kerja Level 8.', 1.0)
    return sc


def build():
    sc = [intro(NUM, TITLE, 'Pre-market · Live · Entry checklist · Review',
                [('Recall the integrated Level 8 framework', 'In this final video you will recall the integrated Level 8 framework,', 'Dalam video terakhir ini anda akan mengingati rangka kerja bersepadu Level 8,'),
                 ('Follow one market from Weekly to 5M', 'follow one market from the weekly chart down to five minutes,', 'mengikuti satu market dari carta weekly hingga 5 minit,'),
                 ('Apply the four-step CMI SOP', 'apply the four-step CMI standard operating procedure,', 'mengaplikasikan prosedur operasi standard CMI empat langkah,'),
                 ('Assess your Level 8 knowledge', 'and assess your Level 8 knowledge.', 'dan menilai pengetahuan Level 8 anda.')],
                ['This is the final video of Level 8: the integrated CMI multi-timeframe analysis procedure.',
                 'We turn five subtopics into one repeatable routine.'],
                ['Ini video terakhir Level 8: prosedur analisis multi-timeframe CMI yang bersepadu.',
                 'Kita jadikan lima subtopik satu rutin yang boleh diulang.'],
                art=tf_stack_art),
          s_flow(), s_zoom(), s_premarket(), s_live(), s_checklist(), s_review(), s_mistakes(), s_assessment(),
          statement('LEVEL 8 · FINAL TAKEAWAY', 'Context. Location. Evidence. Risk.', 'In that order — every session.',
                    [('Multi-timeframe analysis is a disciplined order of questions: context, location, evidence, and risk.', 'Multi-timeframe analysis ialah urutan soalan yang berdisiplin: konteks, lokasi, bukti, dan risiko.'),
                     ('In that order, every session. It organises your analysis. It does not guarantee profit.', 'Dalam urutan itu, setiap sesi. Ia menyusun analisis anda. Ia tidak menjamin keuntungan.')]),
          summary('Level 8 — what to remember', [
              ('1 · HTF Bias: hypothesis with invalidation', 'Higher timeframe bias is a hypothesis with an invalidation.', 'Bias higher timeframe ialah hipotesis dengan invalidation.'),
              ('2 · Top-Down: one order, one job per TF', 'Top-down analysis: one order, one job per timeframe.', 'Top-down analysis: satu urutan, satu tugas setiap timeframe.'),
              ('3 · Liquidity: map it, judge the reaction', 'Liquidity: map it, and judge the reaction.', 'Liquidity: petakan, dan nilai reaksinya.'),
              ('4 · POI: few, ranked, location only', 'POI selection: few zones, ranked, as locations only.', 'POI selection: sedikit zon, disusun, sebagai lokasi sahaja.'),
              ('5 · Entry: aligned evidence + defined risk', 'Entry alignment: aligned evidence and defined risk.', 'Entry alignment: bukti yang selari dan risiko yang ditentukan.'),
              ('No trade is a valid decision', 'And no trade is always a valid decision.', 'Dan tiada trade sentiasa keputusan yang sah.')]),
          references([REF['murphy'], REF['pring'], REF['kd'], REF['harris'], REF['cme'], REF['wyckoff'], REF['ict'], REF['bursa'], REF['mpob']],
                     'Here is the complete reference list for Level 8. Thank you for completing Level 8 of the CMI Smart Money Concept programme.',
                     'Ini senarai rujukan lengkap Level 8. Terima kasih kerana melengkapkan Level 8 program Smart Money Concept CMI.'),
          disclaimer('Level 8 selesai · Multi-Timeframe Analysis',
                     'Trading futures involves the risk of loss. This programme is for education only and is not financial advice.',
                     'Trading futures melibatkan risiko kerugian. Program ini untuk pendidikan sahaja dan bukan nasihat kewangan.')]
    return dict(id='ep10', file='CMI_L8_V10_Integrated_MTF_SOP.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Recall the integrated Level 8 framework', 'Follow one market from Weekly to 5M', 'Apply the 4-step CMI SOP (pre-market, live, entry checklist, review)', 'Complete the Level 8 knowledge assessment'],
                quiz=[('Q1 Why establish HTF bias first?', 'It sets the context in which every LTF signal is interpreted (range, liquidity objectives, invalidation).'),
                      ('Q2 HTF vs MTF vs LTF?', 'HTF = direction/context; MTF = setup, structure, location (POI); LTF = confirmation and execution.'),
                      ('Q3 Bullish LTF inside bearish HTF?', 'Yes — often a retracement within the HTF leg; it does not by itself reverse the HTF.'),
                      ('Q4 IRL vs ERL?', 'ERL beyond the dealing-range boundaries; IRL inside the range (internal swings, internal EQH/EQL, FVGs in ICT usage).'),
                      ('Q5 How do BSL/SSL form?', 'Inferred clusters of stop and breakout orders above highs (BSL) and below lows (SSL); not directly observable.'),
                      ('Q6 Sweep vs breakout?', 'Sweep: close back inside + opposite displacement + MSS. Breakout: close beyond + retest holds (acceptance) + continuation. Both can fail.'),
                      ('Q7 Why is a POI not an entry?', 'It is a location; a setup also needs liquidity interaction, LTF confirmation, execution zone, stop, target.'),
                      ('Q8 POI selection factors?', 'The 10-criterion matrix: HTF alignment, structure, P/D, liquidity, displacement, clarity, freshness, distance to target, stop feasibility, R:R.'),
                      ('Q9 Why wait for confirmation?', 'It adds evidence at the location and defines structural invalidation; it reduces but never removes risk.'),
                      ('Q10 HTF and LTF conflict?', 'Wait, reassess or avoid; do not trade LTF signals against HTF context without a separate tested plan.')],
                exercise='Use the SOP: complete one pre-market sheet, one live-observation log and one post-trade review for an FCPO session (trade or no trade). Grade process (A–C) separately from outcome (R).',
                refs=[r[0] for r in (REF['murphy'], REF['pring'], REF['kd'], REF['harris'], REF['cme'], REF['wyckoff'], REF['ict'], REF['bursa'], REF['mpob'])])
