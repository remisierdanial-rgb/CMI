"""Hierarchical, internally consistent multi-timeframe FCPO data (hypothetical).

The 5M series is generated first for the execution window; 15M, 1H and Daily
tails are built by aggregating the lower timeframe, so every timeframe shows
exactly the same price movement at a different viewing distance.
"""
from level8.engine.chart import gen, agg, mirror, Series


def _cat(a, b):
    s = Series()
    for x in (a, b):
        for i in range(len(x)):
            s.add(x.o[i], x.h[i], x.l[i], x.c[i])
    s.validate()
    return s


def mtf_bull(seed=7, hmul=1, flegs=None):
    # Daily prefix: old weekly high (BSL), decline, then bullish structure ending at a daily HL
    Dp = gen(4600, [(5, 4705), (9, 4150), (6, 4300), (5, 4220), (6, 4420), (5, 4330), (6, 4560), (6, 4440)], seed=seed, vol=14)
    # 1H prefix: displacement from the daily HL (creates 1H POI), HH, then retracement
    legs = [(3, 4460), (2, 4447), (5, 4562, 'disp'), (4, 4530), (6, 4620), (5, 4566), (4, 4596), (6, 4508)]
    if hmul > 1:
        legs = [(n * hmul,) + tuple(rest) for n, *rest in legs]
    Hp = gen(Dp.c[-1], legs, seed=seed + 1, vol=6 if hmul == 1 else 4)
    # 15M prefix: intraday decline forming equal lows (session SSL)
    Qp = gen(Hp.c[-1], [(4, 4480), (3, 4497), (4, 4479), (3, 4494)], seed=seed + 2, vol=3)
    # 5M execution window: drift, LH, sweep of SSL into POI, MSS w/ displacement, FVG retrace, expansion
    F = gen(Qp.c[-1], flegs or [(6, 4485), (3, 4493), (4, 4481), (1, 4456, 'wick', 4479), (3, 4487), (5, 4518, 'disp'), (4, 4497), (8, 4538), (4, 4526), (8, 4603)], seed=seed + 3, vol=2.5, wick=1.8)
    if len(F) % 12:
        F = gen(Qp.c[-1], (flegs or [])[:-1] + [((flegs or [(0,)])[-1][0] + 12 - len(F) % 12,) + tuple((flegs or [(0, 0)])[-1][1:])], seed=seed + 3, vol=2.5, wick=1.8) if flegs else F
    Q = _cat(Qp, agg(F, 3))
    H = _cat(Hp, agg(Q, 4))
    D = _cat(Dp, agg(H, 8))
    return _index(dict(D=D, H=H, Q=Q, F=F, Dp=Dp, Hp=Hp, Qp=Qp, bull=True))


def _index(d):
    Dp, Hp, Qp, F, H, Q, D = d['Dp'], d['Hp'], d['Qp'], d['F'], d['H'], d['Q'], d['D']
    d['q_of_f'] = lambda i: len(Qp) + i // 3
    # H = Hp + agg(Q): H index of Q index q is len(Hp) + q//4 ; D = Dp + agg(H, 8): D index of H index h = len(Dp) + h//8
    d['h_of_q'] = lambda q: len(Hp) + q // 4
    d['d_of_h'] = lambda h: len(Dp) + h // 8
    d['h_of_f'] = lambda i: d['h_of_q'](d['q_of_f'](i))
    d['d_of_f'] = lambda i: d['d_of_h'](d['h_of_f'](i))
    E = F.ends
    d['f'] = dict(drift=E[0], lh=E[1], low=E[2], sweep=E[3], hl=E[4], disp=E[5] if len(E) > 5 else E[-1], retr=E[6] if len(E) > 6 else E[-1], end=len(F) - 1)
    d['hk'] = dict(ob_from=0, disp_end=Hp.ends[2], hh=Hp.ends[4], lh=Hp.ends[6], hl=Hp.ends[3], now=len(Hp) - 1, hh_prev=Hp.ends[0])
    d['dk'] = dict(old=Dp.ends[0], low=Dp.ends[1], h1=Dp.ends[2], l1=Dp.ends[3], h2=Dp.ends[4], l2=Dp.ends[5], h3=Dp.ends[6], l3=Dp.ends[7])
    d['qk'] = dict(eq1=Qp.ends[0], eq2=Qp.ends[2], lh=Qp.ends[1])
    return d


def mtf_bear(seed=19, axis=9100, hmul=1, flegs=None):
    b = mtf_bull(seed, hmul, flegs)
    out = {}
    for k in ('D', 'H', 'Q', 'F', 'Dp', 'Hp', 'Qp'):
        out[k] = mirror(b[k], axis)
    out['bull'] = False
    return _index(out)


def mtf_shift(d, k):
    from level8.engine.chart import shift
    out = {key: shift(d[key], k) for key in ('D', 'H', 'Q', 'F', 'Dp', 'Hp', 'Qp')}
    out['bull'] = d['bull']
    return _index(out)
