"""Reusable top-down demonstration scenes (Daily -> 1H -> 15M -> 5M) on consistent MTF data."""
from .common import *  # noqa
from level8.engine.chart import Series


class Dir:
    """Direction helper so one scene script serves bullish and bearish cases."""

    def __init__(self, bull):
        self.bull = bull
        self.sg = 1 if bull else -1
        self.c = 'bull' if bull else 'bear'
        self.word = 'bullish' if bull else 'bearish'
        self.W = 'BULLISH' if bull else 'BEARISH'
        self.liq, self.oliq = ('BSL', 'SSL') if bull else ('SSL', 'BSL')
        self.zone = 'demand' if bull else 'supply'
        self.up, self.dn = ('above', 'below') if bull else ('below', 'above')
        self.hh, self.hl = ('HH', 'HL') if bull else ('LL', 'LH')
        self.ms = dict(bull=bull)

    def T(self, s, i):  # extreme in trend direction
        return s.h[i] if self.bull else s.l[i]

    def B(self, s, i):  # extreme against trend direction
        return s.l[i] if self.bull else s.h[i]

    def tmax(self, s, i0, i1):
        return s.hi(i0, i1) if self.bull else s.lo(i0, i1)

    def bmin(self, s, i0, i1):
        return s.lo(i0, i1) if self.bull else s.hi(i0, i1)


def keylevels(d):
    D, H, Q, F = d['D'], d['H'], d['Q'], d['F']
    o = Dir(d['bull'])
    f = d['f']
    k = {}
    dk = d['dk']
    k['d_old'] = o.T(D, dk['old'])
    k['d_hl'] = o.B(D, dk['l3'])
    k['d_hh_prev'] = o.T(D, dk['h3'])
    nH = len(d['Hp'])
    # 1H POI: last opposite candle before the 1H displacement + first FVG
    Hp = d['Hp']
    ob = Hp.ends[1]
    k['h_ob'] = ob
    fv = Hp.fvgs(ob, Hp.ends[2], o.sg)[0]
    k['h_fvg'] = fv
    k['poi_lo'] = min(Hp.l[ob], fv[1])
    k['poi_hi'] = max(Hp.h[ob], fv[2]) if o.bull else max(Hp.h[ob], fv[2])
    if o.bull:
        k['poi_lo'], k['poi_hi'] = Hp.l[ob], fv[2]
    else:
        k['poi_lo'], k['poi_hi'] = fv[1], Hp.h[ob]
    if d.get('poi'):
        k['poi_lo'], k['poi_hi'] = d['poi']
    k['h_hh'] = o.T(Hp, Hp.ends[4])
    k['h_lh'] = o.T(Hp, Hp.ends[6])
    # 15M session SSL/BSL (equal lows/highs)
    Qp = d['Qp']
    k['q_eq'] = o.B(Qp, Qp.ends[2])
    k['q_eq1'] = o.B(Qp, Qp.ends[0])
    # 5M
    k['f_lh'] = o.T(F, f['lh'])
    k['sweep'] = o.B(F, f['sweep'])
    k['f_mss'] = F.first_close_beyond(f['sweep'], k['f_lh'], o.sg)
    fv5 = F.fvg(f['hl'] + 1, f['disp'], o.sg)
    k['f_fvg'] = fv5
    k['entry'] = fv5[2] if o.bull else fv5[1]
    k['sl'] = k['sweep'] - 4 * o.sg
    k['tp'] = k['h_lh']
    # 15M structure: last swing before sweep in trend direction
    qs = d['q_of_f'](f['sweep'])
    qi, qv = o.tmax(Q, len(Qp) - 4, qs - 1)
    k['q_sw_i'], k['q_sw'] = qi, qv
    k['q_mss'] = Q.first_close_beyond(qs, qv, o.sg)
    k['q_sweep'] = qs
    return k


def s_daily(d, intro_en, intro_ms, short=False):
    o = Dir(d['bull'])
    D = d['D']
    k = keylevels(d)
    dk = d['dk']
    now = d['d_of_f'](d['f']['sweep'])     # the day being formed at the sweep
    H = d['H']
    nowh = d['h_of_f'](d['f']['sweep'])
    h0 = (now - len(d['Dp'])) * 8
    Dn = Series()
    for i in range(now):
        Dn.add(D.o[i], D.h[i], D.l[i], D.c[i])
    Dn.add(H.o[h0], max(H.h[h0:nowh]), min(H.l[h0:nowh]), H.c[nowh - 1])   # today, still forming
    Dn.ends = D.ends
    D = Dn
    sc = Scene('8.2', f'{o.W} · Weekly / Daily')
    sc.visual = 'Daily chart revealed only up to the last completed day; structure, dealing range, premium/discount, HTF liquidity, bias + invalidation.'
    ch = Chart(D, 36, 100, 1310, 770, 'FCPO · DAILY · HYPOTHETICAL ILLUSTRATION', f'STEP 1 · DAILY CONTEXT · {o.W}', slots=len(D) + 8, step=50)
    sc.say(intro_en, intro_ms)
    sc.add(ch)
    ch.reveal(now + 1, dur=4)
    ch.ann(Tag('TODAY · FORMING', now, o.B(D, now), 'amber', dy=34 if o.bull else -34, size=13), delay=4)
    st = []
    b = sc.say(f'On the daily chart, the major swings show a {o.word} structure: the last daily high was broken with a strong move.',
               f'Pada carta daily, swing utama menunjukkan struktur {o.word}: high daily terakhir dipecahkan dengan pergerakan yang kuat.' if o.bull else
               f'Pada carta daily, swing utama menunjukkan struktur {o.word}: low daily terakhir dipecahkan dengan pergerakan yang kuat.')
    for j, key in enumerate(('l1', 'l2', 'l3')):
        ch.ann(Mark(dk[key], o.B(D, dk[key]), o.hl, o.c, o.dn), at=b, delay=0.3 * j)
    for j, key in enumerate(('h1', 'h2', 'h3')):
        ch.ann(Mark(dk[key], o.T(D, dk[key]), o.hh, o.c, o.up), at=b, delay=0.15 + 0.3 * j)
    nP = len(d['Dp'])
    bi = D.first_close_beyond(nP, k['d_hh_prev'], o.sg)
    ch.ann(Struct(dk['h3'], bi, k['d_hh_prev'], 'BOS', o.c, below=not o.bull), at=b, delay=1.4)
    st.append(dict(text=f'Structure: {o.hh} / {o.hl} + daily BOS', at=b, color=o.c))
    b = sc.say('We define the current dealing range from the swing that produced the break to the new extreme, and mark equilibrium.',
               'Kita tentukan dealing range semasa dari swing yang menghasilkan break hingga ke titik ekstrem baru, dan tandakan equilibrium.')
    ri, rv = o.tmax(D, nP, now - 1)
    lo, hi = sorted([k['d_hl'], rv])
    ch.ann(Range(dk['l3'], None, lo, hi, labels=True, pd=True, eq=True), at=b)
    st.append(dict(text=f'Range {lo:,}–{hi:,} · EQ {(lo + hi) / 2:,.0f}', at=b, color='gold'))
    b = sc.say(f'Price is now retracing into {"discount" if o.bull else "premium"}, the favourable location for a {o.word} idea within this range.',
               f'Harga kini retrace ke {"discount" if o.bull else "premium"}, lokasi yang sesuai bagi idea {o.word} dalam range ini.')
    st.append(dict(text=f'Location: {"discount" if o.bull else "premium"}', at=b, color=o.c))
    b = sc.say(f'{"Above" if o.bull else "Below"}, an older daily {"high" if o.bull else "low"} holds {o.liq}, a broader potential objective. The latest extreme also holds liquidity.',
               f'{"Di atas" if o.bull else "Di bawah"}, {"high" if o.bull else "low"} daily lama menyimpan {o.liq}, sasaran berpotensi yang lebih luas. Titik ekstrem terkini juga menyimpan liquidity.')
    ch.ann(HLine(k['d_old'], dk['old'], None, 'cyan', f"{o.liq} · OLD {'HIGH' if o.bull else 'LOW'} {k['d_old']:,}", above=o.bull), at=b, delay=0.3)
    st.append(dict(text=f'Objectives: {o.liq} {rv:,} / {k["d_old"]:,}', at=b, color='cyan'))
    b = sc.say(f'Daily bias: {o.word}, as a working hypothesis. It is invalidated by a daily close {"below" if o.bull else "above"} the swing that produced the break.',
               f'Bias daily: {o.word}, sebagai hipotesis kerja. Ia terbatal jika daily ditutup {"di bawah" if o.bull else "di atas"} swing yang menghasilkan break itu.')
    ch.ann(Note(f'DAILY BIAS: {o.W} (HYPOTHESIS)', 0.3, 0.13, o.c), at=b)
    st.append(dict(text=f'Bias: {o.word} · invalid if close {"<" if o.bull else ">"} {k["d_hl"]:,}', at=b, color='bear'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, 'DAILY · WHAT WE KNOW', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.1), at=st[0]['at'])
    return sc


def s_1h(d):
    o = Dir(d['bull'])
    H, Hp = d['H'], d['Hp']
    k = keylevels(d)
    now_h = d['h_of_f'](d['f']['sweep'])  # 1H candle containing the sweep
    sc = Scene('8.2', f'{o.W} · 4H / 1H / 30M')
    sc.visual = '1H chart: displacement that created the daily break, OB + FVG POI in daily discount/premium, internal liquidity, price approaching POI (future hidden).'
    ch = Chart(H, 36, 100, 1310, 770, 'FCPO · 1H · HYPOTHETICAL ILLUSTRATION', f'STEP 2 · 1H SETUP & LOCATION · {o.W}', slots=len(H) + 6, step=25)
    sc.say('Step two: we move to the one-hour chart. The four-hour or thirty-minute chart can play the same role. Here we refine the location.',
           'Langkah dua: kita beralih ke carta 1 jam. Carta 4H atau 30M boleh memainkan peranan yang sama. Di sini kita perhalusi lokasi.')
    sc.add(ch)
    ch.reveal(now_h, dur=4)
    st = []
    ob = k['h_ob']
    b = sc.say('The daily break was delivered on the one-hour chart by this displacement. It left a fair value gap, and the last opposite candle before it is an order block.',
               'Break daily itu dihasilkan pada carta 1 jam oleh displacement ini. Ia meninggalkan fair value gap, dan candle bertentangan terakhir sebelumnya ialah order block.')
    ch.ann(VBand(ob + 1, Hp.ends[2], o.c, 'DISPLACEMENT', 0.08), at=b)
    fv = k['h_fvg']
    ch.ann(Zone(fv[0] - 1, fv[0] + 1, fv[1], fv[2], o.c, 'FVG', lpos='right', alpha=0.25), at=b, delay=0.8)
    ch.ann(Zone(ob, ob, Hp.l[ob], Hp.h[ob], 'purple', 'OB', lpos='left', alpha=0.25), at=b, delay=1.4)
    st.append(dict(text='Displacement → FVG + OB', at=b, color=o.c))
    b = sc.say(f'Together they form our one-hour point of interest, between {k["poi_lo"]:,} and {k["poi_hi"]:,}. It sits in daily {"discount" if o.bull else "premium"}, so the location agrees with the daily context.',
               f'Bersama, ia membentuk point of interest 1 jam kita, antara {k["poi_lo"]:,} dan {k["poi_hi"]:,}. Ia berada dalam {"discount" if o.bull else "premium"} daily, jadi lokasinya selari dengan konteks daily.')
    ch.ann(Zone(ob, None, k['poi_lo'], k['poi_hi'], 'purple', f'1H POI · {k["poi_lo"]:,}–{k["poi_hi"]:,}', alpha=0.14), at=b, delay=0.3)
    st.append(dict(text=f'POI {k["poi_lo"]:,}–{k["poi_hi"]:,} (daily {"discount" if o.bull else "premium"})', at=b, color='purple'))
    b = sc.say(f'Inside the retracement, there is internal liquidity: the recent intraday {"lows" if o.bull else "highs"} just {"above" if o.bull else "below"} the POI.',
               f'Di dalam retracement, ada internal liquidity: {"low" if o.bull else "high"} intraday terkini betul-betul {"di atas" if o.bull else "di bawah"} POI.')
    ch.ann(HLine(k['q_eq'], len(Hp) - 2, None, 'cyan', f"INTERNAL {o.oliq} · {k['q_eq']:,}", above=not o.bull), at=b, delay=0.3)
    st.append(dict(text=f'Internal {o.oliq} near {k["q_eq"]:,}', at=b, color='cyan'))
    b = sc.say(f'Opposing liquidity sits at the one-hour {"lower high" if o.bull else "higher low"} of {k["h_lh"]:,}. That gives us a first realistic target.',
               f'Liquidity bertentangan berada di {"lower high" if o.bull else "higher low"} 1 jam pada {k["h_lh"]:,}. Itu memberi kita sasaran realistik pertama.')
    ch.ann(HLine(k['h_lh'], Hp.ends[6], None, 'cyan', f"{o.liq} · 1H TARGET {k['h_lh']:,}", above=o.bull), at=b, delay=0.3)
    st.append(dict(text=f'Target: {o.liq} {k["h_lh"]:,}', at=b, color='cyan'))
    b = sc.say('Not every order block or fair value gap is a valid location. This one is chosen because it caused the higher-timeframe break, and sits in the right part of the range.',
               'Bukan setiap order block atau fair value gap ialah lokasi yang sah. Yang ini dipilih kerana ia menyebabkan break higher timeframe, dan berada di bahagian range yang betul.')
    b = sc.say('Price is approaching the POI. We do not enter yet. The setup is a location for further analysis, so we drop to the fifteen-minute chart.',
               'Harga sedang menghampiri POI. Kita belum masuk. Setup ini ialah lokasi untuk analisis lanjut, jadi kita turun ke carta 15 minit.')
    ch.ann(Decision(now_h - 1, 'PRICE APPROACHING POI · NO ENTRY YET'), at=b)
    st.append(dict(text='Approaching POI → wait for 15M', at=b, color='amber'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, '1H · SETUP & LOCATION', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.1), at=st[0]['at'])
    return sc


def s_15m(d, poi_name='1H POI'):
    o = Dir(d['bull'])
    Q, Qp = d['Q'], d['Qp']
    k = keylevels(d)
    qs = k['q_sweep']
    sc = Scene('8.2', f'{o.W} · 15M')
    sc.visual = '15M chart: equal lows/highs (session liquidity), POI band, sweep into POI, MSS close beyond 15M swing, displacement.'
    vis = k['q_mss'] + 1
    ch = Chart(Q, 36, 100, 1310, 770, 'FCPO · 15M · HYPOTHETICAL ILLUSTRATION', f'STEP 3 · 15M LIQUIDITY & STRUCTURE · {o.W}', slots=vis + 8, step=10,
               pmin=min(min(Q.l[:vis]), k['poi_lo']) - 12, pmax=max(max(Q.h[:vis]), k['poi_hi']) + 12)
    sc.say('Step three: the fifteen-minute chart. Here we watch how price interacts with liquidity at our location.',
           'Langkah tiga: carta 15 minit. Di sini kita perhatikan bagaimana harga berinteraksi dengan liquidity di lokasi kita.')
    sc.add(ch)
    ch.reveal(qs, dur=3)
    st = []
    ch.ann(Zone(0, None, k['poi_lo'], k['poi_hi'], 'purple', poi_name, alpha=0.12), at=0, delay=0.5)
    b = sc.say(f'The session made equal {"lows" if o.bull else "highs"} just {"above" if o.bull else "below"} the POI. {o.oliq} likely rests {"below" if o.bull else "above"} them.',
               f'Sesi ini membentuk equal {"low" if o.bull else "high"} betul-betul {"di atas" if o.bull else "di bawah"} POI. {o.oliq} berkemungkinan berada {"di bawah" if o.bull else "di atas"}nya.')
    ch.ann(Mark(Qp.ends[0], k['q_eq1'], '', 'cyan', o.dn), at=b)
    ch.ann(Mark(Qp.ends[2], k['q_eq'], 'EQL' if o.bull else 'EQH', 'cyan', o.dn), at=b, delay=0.3)
    ch.ann(HLine(k['q_eq'], Qp.ends[0], None, 'cyan', f"{o.oliq} · {k['q_eq']:,}", above=not o.bull), at=b, delay=0.6)
    st.append(dict(text=f'Equal {"lows" if o.bull else "highs"} → {o.oliq}', at=b, color='cyan'))
    b = sc.say(f'Price trades through those {"lows" if o.bull else "highs"} and into the POI, then closes back {"above" if o.bull else "below"}. This is a liquidity sweep into our location.',
               f'Harga melepasi {"low" if o.bull else "high"} itu dan masuk ke POI, kemudian ditutup semula {"di atas" if o.bull else "di bawah"}. Ini liquidity sweep ke dalam lokasi kita.')
    ch.reveal(qs + 1, at=b, dur=1.2)
    ch.ann(Mark(qs, k['sweep'], 'SWEEP', 'amber', o.dn, f"{k['sweep']:,}", size=18), at=b, delay=1.2)
    st.append(dict(text=f'Sweep into POI · {k["sweep"]:,}', at=b, color='amber'))
    b = sc.say('A sweep alone is not enough. We need to see whether the reaction changes structure.',
               'Sweep sahaja tidak mencukupi. Kita perlu lihat sama ada reaksi itu mengubah struktur.')
    ch.ann(Decision(qs, 'SWEEP SEEN · WAITING FOR STRUCTURE'), at=b, until=b + 1)
    b = sc.say(f'Price then closes {"above" if o.bull else "below"} the last fifteen-minute swing {"high" if o.bull else "low"} with displacement. That is a {o.word} market structure shift, in the direction of the daily bias.',
               f'Harga kemudian ditutup {"di atas" if o.bull else "di bawah"} swing {"high" if o.bull else "low"} 15 minit terakhir dengan displacement. Itu {o.word} market structure shift, searah dengan bias daily.')
    ch.reveal(k['q_mss'] + 1, at=b, dur=1.5)
    ch.ann(Struct(k['q_sw_i'], k['q_mss'], k['q_sw'], 'MSS', o.c, below=not o.bull), at=b, delay=1.4)
    st.append(dict(text=f'{o.W} MSS with displacement', at=b, color=o.c))
    b = sc.say('The reaction supports the higher-timeframe hypothesis. If price had accepted below the POI instead, it would have contradicted it.',
               'Reaksi ini menyokong hipotesis higher timeframe. Jika harga diterima di bawah POI, ia akan bercanggah dengannya.' if o.bull else
               'Reaksi ini menyokong hipotesis higher timeframe. Jika harga diterima di atas POI, ia akan bercanggah dengannya.')
    st.append(dict(text='Reaction supports HTF bias', at=b, color='bull'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, '15M · LIQUIDITY & STRUCTURE', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.1), at=st[0]['at'])
    return sc


def s_5m(d, tfword='one-hour', tfms='1 jam'):
    o = Dir(d['bull'])
    F = d['F']
    f = d['f']
    k = keylevels(d)
    sc = Scene('8.2', f'{o.W} · 5M execution')
    sc.visual = '5M chart: sweep, MSS, displacement FVG, retracement entry, SL beyond sweep, TP at 1H opposing liquidity, R:R; invalidation; outcome revealed last.'
    ch = Chart(F, 36, 100, 1310, 770, 'FCPO · 5M · HYPOTHETICAL ILLUSTRATION', f'STEP 4 · 5M EXECUTION · {o.W}', slots=len(F) + 10, step=10, fit_n=f['disp'] + 1)
    sc.say('Step four: the five-minute chart, for execution planning.',
           'Langkah empat: carta 5 minit, untuk perancangan execution.')
    sc.add(ch)
    ch.reveal(k['f_mss'] + 1, dur=4)
    st = []
    b = sc.say(f'On five minutes we see the same sweep, then a close {"above" if o.bull else "below"} the five-minute swing {"high" if o.bull else "low"}: the lower-timeframe structure shift.',
               f'Pada 5 minit kita nampak sweep yang sama, kemudian penutupan {"di atas" if o.bull else "di bawah"} swing {"high" if o.bull else "low"} 5 minit: peralihan struktur lower timeframe.')
    ch.ann(Mark(f['sweep'], k['sweep'], 'SWEEP', 'amber', o.dn, size=18), at=b)
    ch.ann(Struct(f['lh'], k['f_mss'], k['f_lh'], 'MSS', o.c, below=not o.bull), at=b, delay=0.6)
    st.append(dict(text='Sweep + 5M MSS', at=b, color=o.c))
    b = sc.say('The displacement leaves a fair value gap. That gap is our selected execution zone.',
               'Displacement meninggalkan fair value gap. Gap itu ialah zon execution yang kita pilih.')
    ch.reveal(f['disp'] + 1, at=b, dur=1.5)
    fv = k['f_fvg']
    ch.ann(Zone(fv[0] - 1, None, fv[1], fv[2], o.c, f'5M FVG · {fv[1]:,}–{fv[2]:,}', alpha=0.25), at=b, delay=1.5)
    st.append(dict(text=f'FVG {fv[1]:,}–{fv[2]:,}', at=b, color=o.c))
    b = sc.say(f'The plan: a limit entry at the edge of the gap, {k["entry"]:,}. Stop-loss beyond the sweep extreme at {k["sl"]:,}, because a move there would invalidate the idea. Target: the {tfword} liquidity at {k["tp"]:,}.',
               f'Pelannya: entry limit di tepi gap, {k["entry"]:,}. Stop-loss di luar titik ekstrem sweep pada {k["sl"]:,}, kerana pergerakan ke situ membatalkan idea ini. Sasaran: liquidity {tfms} pada {k["tp"]:,}.')
    ch.refit(f['disp'] + 1, at=b, extra=(k['tp'], k['sl']), pad=0.06)
    ch.ann(Position(f['disp'] + 1, len(F) + 6, k['entry'], k['sl'], k['tp'], 'long' if o.bull else 'short'), at=b, delay=1.2)
    risk = abs(k['entry'] - k['sl'])
    rew = abs(k['tp'] - k['entry'])
    st.append(dict(text=f'Entry {k["entry"]:,} · SL {k["sl"]:,} · TP {k["tp"]:,}', at=b, color='text'))
    b = sc.say(f'Risk is {risk:.0f} points, or about {risk * 25:,.0f} ringgit per contract. Reward is {rew:.0f} points. Risk to reward is roughly one to {rew / risk:.1f}.',
               f'Risiko ialah {risk:.0f} mata, atau kira-kira RM{risk * 25:,.0f} bagi setiap kontrak. Ganjaran {rew:.0f} mata. Nisbah risiko kepada ganjaran kira-kira 1:{rew / risk:.1f}.')
    st.append(dict(text=f'Risk {risk:.0f} pts ≈ RM{risk * 25:,.0f} / lot · R:R ≈ 1:{rew / risk:.1f}', at=b, color='gold'))
    b = sc.say('This is an analytical confirmation, not a guaranteed signal. The entry may not fill, or the trade may fail. The stop defines that risk in advance.',
               'Ini pengesahan analitikal, bukan signal yang dijamin. Entry mungkin tidak dipenuhi, atau trade mungkin gagal. Stop menentukan risiko itu lebih awal.')
    ch.ann(Decision(f['disp'], 'PLAN WRITTEN · OUTCOME UNKNOWN'), at=b, until=b + 1)
    st.append(dict(text='Confirmation ≠ certainty', at=b, color='amber'))
    b = sc.say(f'Now the outcome. Price retraced into the gap, filled the entry, and expanded toward the {tfword} target. A different outcome was equally possible before it happened.',
               f'Kini hasilnya. Harga retrace ke dalam gap, entry dipenuhi, dan berkembang ke arah sasaran {tfms}. Hasil berbeza juga mungkin berlaku sebelum ia terjadi.')
    ch.reveal(len(F), at=b, dur=4)
    st.append(dict(text='Outcome revealed after the plan', at=b, color='sub'))
    sc.add(Custom(lambda ctx, t: (panel(ctx, 1366, 100, 518, 770), text(ctx, '5M · EXECUTION PLAN', 1394, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.add(Bullets(st, 1380, 220, 500, 22, 2.1), at=st[0]['at'])
    return sc


def s_split(d, en, ms):
    """Daily | 1H | 5M side by side, same moment, VBand showing where the lower TF sits."""
    o = Dir(d['bull'])
    D, H, F = d['D'], d['H'], d['F']
    f = d['f']
    sc = Scene('8.2', 'Same move · three views')
    sc.visual = 'Split screen: LEFT Daily (direction) · CENTRE 1H (setup & POI) · RIGHT 5M (entry). Bands show which candles each lower TF zooms into.'
    k = keylevels(d)
    w = 596
    cd = Chart(D, 36, 100, w, 770, 'DAILY · DIRECTION', 'HTF', slots=len(D) + 3, title_color='gold')
    chh = Chart(H, 36 + w + 30, 100, w, 770, '1H · SETUP & POI', 'MTF', slots=len(H) + 3, title_color='blue')
    cf = Chart(F, 36 + 2 * (w + 30), 100, w, 770, '5M · ENTRY', 'LTF', slots=len(F) + 3, title_color='bull', pmin=min(F.l) - 10, pmax=max(F.h) + 10)
    sc.say(en[0], ms[0])
    for c in (cd, chh, cf):
        sc.add(c)
        c.reveal(len(c.s), dur=3)
    b = sc.say(en[1], ms[1])
    nP = len(d['Dp'])
    cd.ann(VBand(d['d_of_h'](len(d['Hp']) - 8), len(D) - 1, 'blue', '1H WINDOW', 0.14), at=b)
    chh.ann(VBand(d['h_of_f'](0), len(H) - 1, 'bull', '5M', 0.16), at=b, delay=0.4)
    chh.ann(Zone(k['h_ob'], None, k['poi_lo'], k['poi_hi'], 'purple', 'POI', alpha=0.15), at=b, delay=0.8)
    b = sc.say(en[2], ms[2])
    cd.ann(Note('ONE CANDLE: A PULLBACK', 0.5, 0.95, 'gold'), at=b)
    chh.ann(Note('A RETRACEMENT INTO POI', 0.5, 0.95, 'blue'), at=b, delay=0.4)
    cf.ann(Note('SWEEP → MSS → FVG', 0.5, 0.95, 'bull'), at=b, delay=0.8)
    cf.ann(Mark(f['sweep'], k['sweep'], 'SWEEP', 'amber', o.dn, size=16), at=b, delay=0.8)
    for e, m in zip(en[3:], ms[3:]):
        sc.say(e, m)
    return sc
