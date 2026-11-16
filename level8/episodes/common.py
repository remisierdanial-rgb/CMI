"""Shared scene templates for all Level 8 episodes (same structure as the reference episode)."""
from level8.engine.core import *  # noqa
from level8.engine.scene import *  # noqa
from level8.engine.chart import *  # noqa


def meta(num, title):
    return dict(badge='L8', line1='LEVEL 8 · ILMU', line2='SMART MONEY CONCEPT · MULTI-TIMEFRAME ANALYSIS',
                video=f'VIDEO {num:02d} — {title.upper()}')


def intro(num, title, subtitle, objectives, hook_en, hook_ms, art=None):
    """objectives: list of (en_text_on_screen, narration_en, narration_ms)."""
    sc = Scene('INTRO', 'Introduction')
    sc.say(hook_en[0], hook_ms[0])
    sc.add(Heading(f'VIDEO {num:02d} · LEVEL 8 · MULTI-TIMEFRAME ANALYSIS', title, 120, 250, 64, sub=subtitle, rule=True, max_w=940))
    if art:
        sc.add(Custom(art), delay=0.6)
    for en, ms in zip(hook_en[1:], hook_ms[1:]):
        sc.say(en, ms)
    sc.add(Custom(lambda ctx, t: text(ctx, 'LEARNING OBJECTIVES', 120, 500, MONO_M, 16, 'dim', track=2.6)))
    items = []
    for o, en, ms in objectives:
        b = sc.say(en, ms, 0.25)
        items.append(dict(text=o, at=b))
    sc.add(Bullets(items, 120, 556, 860, 27, 1.7, 'check', 'bull'), at=items[0]['at'])
    return sc


def summary(title, points):
    """points: list of (on_screen, en, ms)."""
    sc = Scene('SUMMARY', 'Summary')
    sc.say(points[0][1], points[0][2])
    sc.add(Heading('KEY LEARNING POINTS', title, 120, 200, 46))
    half = (len(points) + 1) // 2
    left, right = [], []
    for k, (o, en, ms) in enumerate(points):
        b = sc.cur if k == 0 else sc.say(en, ms, 0.3)
        (left if k < half else right).append(dict(text=o, at=b))
    sc.add(Bullets(left, 120, 320, 820, 31, 2.4, 'check', 'bull'), at=left[0]['at'])
    if right:
        sc.add(Bullets(right, 990, 320, 820, 31, 2.4, 'check', 'bull'), at=right[0]['at'])
    return sc


def statement(eyebrow, l1, l2, en_ms_pairs):
    sc = Scene('KEY IDEA', 'Key takeaway')
    sc.say(*en_ms_pairs[0])
    sc.add(Statement([dict(text=l1, color='text')], 120, 470, 70, eyebrow=eyebrow))
    if len(en_ms_pairs) > 1:
        sc.say(*en_ms_pairs[1])
    sc.add(Statement([dict(text=l2, color='gold')], 120, 470 + 70 * 1.25 * (1 + (len(l1) > 46)), 70))
    for p in en_ms_pairs[2:]:
        sc.say(*p)
    return sc


def quiz(questions):
    """questions: list of (q_on_screen, en, ms). Knowledge check scene."""
    sc = Scene('CHECK', 'Knowledge check')
    sc.say('Before we move on, pause the video and test yourself with these questions.',
           'Sebelum kita teruskan, berhenti seketika dan uji kefahaman anda dengan soalan-soalan ini.')
    sc.add(Heading('KNOWLEDGE CHECK · SEMAK KEFAHAMAN', 'Pause and answer before continuing', 120, 200, 46))
    items = []
    for i, (q, en, ms) in enumerate(questions):
        b = sc.say(en, ms, 0.6)
        items.append(dict(text=q, at=b, num=f'Q{i + 1}', style='num'))
    sc.add(Bullets(items, 120, 310, 1650, 28, 2.0, 'num', 'gold'), at=items[0]['at'])
    sc.say('Model answers and a practical chart exercise are included in the episode workbook.',
           'Jawapan contoh dan latihan carta praktikal disediakan dalam buku kerja episod ini.', 0.8)
    return sc


def up_next(num, title, desc_en, desc_ms, boxes):
    sc = Scene('NEXT', f'Up next · {title}')
    sc.say(desc_en, desc_ms)
    sc.add(Heading(f'UP NEXT · VIDEO {num:02d}', title, 120, 200, 46))
    sc.add(Flow([dict(title=b[0], sub=b[1], color=b[2], at=0, delay=0.4 + 0.35 * i) for i, b in enumerate(boxes)],
                120, 300, 520, 150, 40, 'h'))
    return sc


def references(refs, en, ms):
    sc = Scene('REFERENCES', 'References')
    sc.say(en, ms)
    sc.add(Heading('REFERENCES · RUJUKAN', 'Primary reading for this video', 120, 200, 46))
    sc.add(RefList(refs, 120, 260))
    return sc


def disclaimer(next_text, en='Trading futures involves the risk of loss. This video is for education only. See you in the next video.',
               ms='Trading futures melibatkan risiko kerugian. Video ini untuk pendidikan sahaja. Jumpa dalam video seterusnya.'):
    sc = Scene('DISCLAIMER', 'Disclaimer', tail=1.6)
    sc.say(en, ms)
    sc.add(Disclaimer(next_text))
    return sc


# ------------------------------------------------------------------ common refs
REF = dict(
    murphy=('John J. Murphy — Technical Analysis of the Financial Markets (NYIF, 1999)', 'Trend, multiple timeframes'),
    pring=('Martin J. Pring — Technical Analysis Explained (5th ed., McGraw-Hill)', 'Trend & time horizons'),
    kd=('Kirkpatrick & Dahlquist — Technical Analysis: The Complete Resource (3rd ed.)', 'Market structure, S/R'),
    harris=('Larry Harris — Trading and Exchanges: Market Microstructure for Practitioners (OUP, 2003)', 'Liquidity, order types'),
    wyckoff=('Richard D. Wyckoff — The Richard D. Wyckoff Method of Trading and Investing in Stocks', 'Ranges, springs, upthrusts'),
    cme=('CME Group Education — Understanding futures liquidity & order execution (cmegroup.com/education)', 'Futures liquidity'),
    ict=('Michael J. Huddleston (ICT) — Mentorship educational materials', 'SMC/ICT terminology (interpretive)'),
    bursa=('Bursa Malaysia Derivatives — FCPO Contract Specifications (bursamalaysia.com)', 'Verify before publishing'),
    cmi=('CMI SMC Level 1–7 course notes — operational definitions', 'Internal CMI curriculum'),
    mpob=('Malaysian Palm Oil Board (MPOB) — market & supply statistics (mpob.gov.my)', 'FCPO market context'),
)


def tf_stack_art(ctx, t):
    """Intro art: HTF -> MTF -> LTF zoom stack."""
    x0, y0, w, h = 1130, 250, 660, 170
    rows = [('HTF · WEEKLY / DAILY', 'Direction & context', 'gold', [0.85, 0.6, 0.7, 0.35, 0.5, 0.2]),
            ('MTF · 4H / 1H / 30M', 'Setup, structure & location', 'blue', [0.3, 0.55, 0.4, 0.75, 0.6, 0.85]),
            ('LTF · 15M / 5M', 'Confirmation & execution', 'bull', [0.7, 0.4, 0.55, 0.25, 0.6, 0.8])]
    for k, (a, b, c, pts) in enumerate(rows):
        p = ease((t - k * 0.35) / 0.6)
        if p <= 0:
            continue
        y = y0 + k * (h + 40)
        panel(ctx, x0, y, w, h, p, border=c, bw=1.6)
        text(ctx, a, x0 + 24, y + 38, MONO_M, 15, c, p, track=2)
        text(ctx, b, x0 + 24, y + 72, SANS_SB, 22, 'text', p)
        ctx.set_source_rgba(*col(c, p))
        ctx.set_line_width(2.5)
        for i, v in enumerate(pts):
            xx = x0 + 380 + i * 50
            yy = y + 30 + v * (h - 60)
            (ctx.move_to if i == 0 else ctx.line_to)(xx, yy)
        ctx.stroke()
        if k > 0:
            arrow(ctx, x0 + w / 2, y - 36, x0 + w / 2, y - 6, 'dim', p, 2, 9)
