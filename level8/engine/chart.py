"""Candlestick data generation (OHLC-valid) and animated chart element.

All price data is synthetic and labelled HYPOTHETICAL ILLUSTRATION.
Annotations are computed from the generated candles so that every label
corresponds to the actual candle sequence (no contradictory markings).
"""
import random
from .core import *  # noqa
from .scene import El


# ================================================================ data
class Series:
    def __init__(self):
        self.o, self.h, self.l, self.c = [], [], [], []
        self.ends = []      # index of the extreme candle of each leg

    def __len__(self):
        return len(self.c)

    def add(self, o, h, l, c):
        o, h, l, c = round(o), round(h), round(l), round(c)
        h = max(h, o, c)
        l = min(l, o, c)
        self.o.append(o); self.h.append(h); self.l.append(l); self.c.append(c)

    def validate(self):
        for i in range(len(self)):
            assert self.h[i] >= max(self.o[i], self.c[i]), i
            assert self.l[i] <= min(self.o[i], self.c[i]), i
        return True

    # -- queries ---------------------------------------------------
    def hi(self, i0, i1):
        i1 = min(i1, len(self) - 1)
        k = max(range(i0, i1 + 1), key=lambda i: self.h[i])
        return k, self.h[k]

    def lo(self, i0, i1):
        i1 = min(i1, len(self) - 1)
        k = min(range(i0, i1 + 1), key=lambda i: self.l[i])
        return k, self.l[k]

    def fvgs(self, i0, i1, d):
        """Three-candle FVGs whose middle candle lies in [i0,i1]. Returns list of (mid, lo, hi)."""
        out = []
        for i in range(max(1, i0), min(i1, len(self) - 2) + 1):
            if d > 0 and self.l[i + 1] > self.h[i - 1]:
                out.append((i, self.h[i - 1], self.l[i + 1]))
            if d < 0 and self.h[i + 1] < self.l[i - 1]:
                out.append((i, self.h[i + 1], self.l[i - 1]))
        return out

    def fvg(self, i0, i1, d):
        f = self.fvgs(i0, i1, d)
        assert f, f'no FVG in {i0}-{i1} dir {d}'
        return max(f, key=lambda z: z[2] - z[1])

    def first_close_beyond(self, i0, level, d):
        for i in range(i0, len(self)):
            if (d > 0 and self.c[i] > level) or (d < 0 and self.c[i] < level):
                return i
        return None

    def last_opposite(self, i, d, back=8):
        """Last down-close candle before index i (d>0) or last up-close candle (d<0)."""
        for k in range(i, max(-1, i - back), -1):
            if d > 0 and self.c[k] < self.o[k]:
                return k
            if d < 0 and self.c[k] > self.o[k]:
                return k
        return i


def gen(start, legs, seed=1, vol=None, wick=None):
    """Generate an OHLC series from legs.

    leg forms:
      (n, target)                normal swing leg ending with its extreme == target
      (n, target, 'disp')        displacement: large bodies, small wicks
      (n, target, 'chop')        choppy / ranging drift
      (1, extreme, 'wick', close) single candle wicking to extreme, closing at close
    vol: typical noise per candle (price units).
    """
    rnd = random.Random(seed)
    s = Series()
    p = start
    prev_ext = start
    for leg in legs:
        n, tgt = leg[0], leg[1]
        kind = leg[2] if len(leg) > 2 else 'norm'
        span = abs(tgt - p)
        v = vol if vol is not None else max(3, span / max(n, 1) * 0.9)
        wk = wick if wick is not None else v * 0.45
        up = tgt > p
        if kind == 'wick':
            close = leg[3]
            o = p
            if up:
                s.add(o, tgt, min(o, close) - rnd.uniform(0.2, 0.6) * wk, close)
            else:
                s.add(o, max(o, close) + rnd.uniform(0.2, 0.6) * wk, tgt, close)
            s.ends.append(len(s) - 1)
            p = close
            prev_ext = tgt
            continue
        cs = []
        for i in range(n):
            f = (i + 1) / n
            base = p + (tgt - p) * f
            if kind == 'disp':
                noise = 0
            elif kind == 'chop':
                noise = rnd.gauss(0, v * 1.4) * (1 - f ** 4)
            else:
                noise = rnd.gauss(0, v) * (1 - f ** 3)
            c = base + noise
            if kind != 'chop':
                c = clamp(c, prev_ext + 2, tgt - 2) if up else clamp(c, tgt + 2, prev_ext - 2)
            cs.append(c)
        back = rnd.uniform(0.15, 0.4) * (wk if kind != 'disp' else wk * 0.5)
        cs[-1] = tgt - max(1, back) if up else tgt + max(1, back)
        prev = p
        for i, c in enumerate(cs):
            o = prev
            if kind == 'disp':
                w1, w2 = rnd.uniform(0.0, 0.25) * wk, rnd.uniform(0.0, 0.25) * wk
            else:
                w1, w2 = abs(rnd.gauss(0, wk)), abs(rnd.gauss(0, wk))
            hi = max(o, c) + w1
            lo = min(o, c) - w2
            if kind != 'chop':
                if up:
                    hi = tgt if i == n - 1 else min(hi, tgt - 1)
                    lo = max(lo, prev_ext + 1)
                else:
                    lo = tgt if i == n - 1 else max(lo, tgt + 1)
                    hi = min(hi, prev_ext - 1)
            else:
                if i == n - 1:
                    if up:
                        hi = max(hi, tgt)
                    else:
                        lo = min(lo, tgt)
            s.add(o, max(hi, o, c), min(lo, o, c), c)
            prev = s.c[-1]
        prev_ext = tgt
        s.ends.append(len(s) - 1)
        p = s.c[-1]
    s.validate()
    return s


def agg(s, k, offset=0):
    """Aggregate a series into a higher timeframe (k candles per bar)."""
    out = Series()
    for i in range(offset, len(s), k):
        j = min(i + k, len(s))
        out.add(s.o[i], max(s.h[i:j]), min(s.l[i:j]), s.c[j - 1])
    out.validate()
    return out


# ================================================================ chart element
class Chart(El):
    def __init__(self, s, x, y, w, h, label='FCPO · 4H · HYPOTHETICAL ILLUSTRATION', title='', slots=None,
                 pmin=None, pmax=None, step=None, n0=0, title_color='text', axis=True, live=True):
        self.s, self.x, self.y, self.w, self.h = s, x, y, w, h
        self.lab, self.title, self.tcol = label, title, title_color
        self.slots = slots or len(s) + 4
        lo, hi = min(s.l), max(s.h)
        pad = (hi - lo) * 0.10
        self.pmin = pmin if pmin is not None else lo - pad
        self.pmax = pmax if pmax is not None else hi + pad
        self.step = step
        self.n0 = n0
        self.axis = axis
        self.live = live
        self.rev = []
        self.anns = []
        self.views = []
        self.titles = []

    # ---- authoring
    def reveal(self, n, at=None, dur=None, delay=0.0):
        self.rev.append(dict(n=n, at=at, dur=dur, delay=delay))
        return self

    def ann(self, a, at=None, delay=0.0, until=None, until_delay=0.0):
        a.at, a.delay, a.until, a.udelay = at, delay, until, until_delay
        self.anns.append(a)
        return a

    def view(self, i0, i1, pmin, pmax, at=None, dur=1.2, delay=0.0):
        self.views.append(dict(v=(i0, i1, pmin, pmax), at=at, dur=dur, delay=delay))

    def retitle(self, title, color='text', at=None, delay=0.0):
        self.titles.append(dict(title=title, color=color, at=at, delay=delay))

    # ---- timing
    def resolve(self, sc):
        super().resolve(sc)
        cur = self.at
        prev_n = self.n0
        for r in self.rev:
            r['at'] = cur if r['at'] is None else r['at']
            r['t'] = sc.T(r['at'], r['delay'])
            if r['dur'] is None:
                r['dur'] = clamp(abs(r['n'] - prev_n) * 0.11, 0.3, 4.0)
            prev_n = r['n']
        self.rev.sort(key=lambda r: r['t'])
        for a in self.anns:
            a.at = self.at if a.at is None else a.at
            a.t0 = sc.T(a.at, a.delay)
            a.t1 = sc.T(a.until, a.udelay) if a.until is not None else None
        for v in self.views:
            v['t'] = sc.T(self.at if v['at'] is None else v['at'], v['delay'])
        for tt in self.titles:
            tt['t'] = sc.T(self.at if tt['at'] is None else tt['at'], tt['delay'])

    def nvis(self, t):
        n = self.n0
        for r in self.rev:
            if t < r['t']:
                break
            n = lerp(n, r['n'], ease_io((t - r['t']) / r['dur'])) if t < r['t'] + r['dur'] else r['n']
        return n

    def cur_view(self, t):
        v = (0, self.slots, self.pmin, self.pmax)
        for vv in self.views:
            if t < vv['t']:
                break
            k = ease_io((t - vv['t']) / vv['dur'])
            v = tuple(lerp(a, b, k) for a, b in zip(v, vv['v']))
        return v

    # ---- geometry
    def setup_geom(self, t):
        self.px0 = self.x + 24
        self.px1 = self.x + self.w - (96 if self.axis else 24)
        self.py0 = self.y + 66
        self.py1 = self.y + self.h - 26
        self.vi0, self.vi1, self.vpmin, self.vpmax = self.cur_view(t)

    def X(self, i):
        return self.px0 + (i + 0.5 - self.vi0) / (self.vi1 - self.vi0) * (self.px1 - self.px0)

    def Y(self, p):
        return self.py1 - (p - self.vpmin) / (self.vpmax - self.vpmin) * (self.py1 - self.py0)

    def sw(self):
        return (self.px1 - self.px0) / (self.vi1 - self.vi0)

    # ---- paint
    def paint(self, ctx, t):
        self.setup_geom(t)
        panel(ctx, self.x, self.y, self.w, self.h)
        text(ctx, self.lab, self.x + 24, self.y + 38, MONO, 15, 'dim', track=2.0)
        title, tc = self.title, self.tcol
        for tt in self.titles:
            if t >= tt['t']:
                title, tc = tt['title'], tt['color']
        if title:
            text(ctx, title, self.x + self.w - 24, self.y + 38, SANS_B, 18, tc, align='right')
        ctx.save()
        ctx.rectangle(self.x + 2, self.py0 - 10, self.w - 4, self.py1 - self.py0 + 22)
        ctx.clip()
        # grid + axis
        step = self.step or self._nice_step()
        p = math.ceil(self.vpmin / step) * step
        while p <= self.vpmax:
            yy = self.Y(p)
            line(ctx, self.px0, yy, self.px1, yy, 'grid', 0.9, 1)
            if self.axis:
                text(ctx, f'{p:,.0f}', self.px1 + 16, yy + 5, MONO, 15, 'dim')
            p += step
        if self.axis:
            line(ctx, self.px1, self.py0, self.px1, self.py1, 'border', 1, 1)
        n = self.nvis(t)
        anns = [a for a in self.anns if t >= a.t0 and (a.t1 is None or t < a.t1 + 0.4)]
        for a in anns:
            if a.layer == 0:
                self._ann(ctx, a, t)
        self.candles(ctx, n)
        for a in anns:
            if a.layer == 1:
                self._ann(ctx, a, t)
        ctx.restore()
        if self.axis and n >= 1 and self.live:
            k = min(int(math.ceil(n)) - 1, len(self.s) - 1)
            if k >= 0:
                fr = n - int(n)
                c = round(lerp(self.s.o[k], self.s.c[k], fr)) if fr > 0.02 and k == int(n) else self.s.c[k]
                yy = self.Y(c)
                if self.py0 <= yy <= self.py1:
                    up = self.s.c[k] >= self.s.o[k]
                    rrect(ctx, self.px1 + 4, yy - 13, 84, 26, 4)
                    ctx.set_source_rgba(*col('bull' if up else 'bear'))
                    ctx.fill()
                    text(ctx, f'{c:,.0f}', self.px1 + 46, yy + 6, MONO_SB, 15, 'white', align='center')
        for a in anns:
            if a.layer == 2:
                self._ann(ctx, a, t)

    def _ann(self, ctx, a, t):
        p = ease((t - a.t0) / a.fade)
        if a.t1 is not None and t > a.t1:
            k = 1 - clamp((t - a.t1) / 0.4)
            if k <= 0:
                return
            with_alpha(ctx, k, lambda: a.draw(ctx, self, p))
        else:
            a.draw(ctx, self, p)

    def _nice_step(self):
        span = self.vpmax - self.vpmin
        for st in (5, 10, 20, 25, 50, 100, 200, 250, 500):
            if span / st <= 7:
                return st
        return 1000

    def candles(self, ctx, n):
        s = self.s
        bw = max(2.0, self.sw() * 0.62)
        full = int(n)
        frac = n - full
        lo_i = max(0, int(self.vi0) - 1)
        for i in range(lo_i, min(len(s), full + (1 if frac > 0.02 else 0))):
            x = self.X(i)
            if x < self.px0 - bw or x > self.px1 + bw:
                continue
            a = 1.0 if i < full else frac
            up = s.c[i] >= s.o[i]
            cc = 'bull' if up else 'bear'
            if i >= full:
                # growing candle: open -> close animates
                c = lerp(s.o[i], s.c[i], frac)
                h = lerp(max(s.o[i], s.o[i]), s.h[i], frac)
                l = lerp(min(s.o[i], s.o[i]), s.l[i], frac)
                h, l = max(h, s.o[i], c), min(l, s.o[i], c)
            else:
                c, h, l = s.c[i], s.h[i], s.l[i]
            line(ctx, x, self.Y(h), x, self.Y(l), cc, a, max(1.2, bw * 0.12))
            y1, y2 = self.Y(max(s.o[i], c)), self.Y(min(s.o[i], c))
            ctx.set_source_rgba(*col(cc, a))
            ctx.rectangle(x - bw / 2, y1, bw, max(1.5, y2 - y1))
            ctx.fill()


# ================================================================ annotations
class Ann:
    layer = 1
    fade = 0.6

    def draw(self, ctx, ch, p):
        pass


def _lbl(ctx, s, x, y, color, a, size=14, align='left', box=True):
    if box:
        w = text_w(ctx, s, MONO_M, size, 1.0) + 14
        x0 = x - w if align == 'right' else x - w / 2 if align == 'center' else x
        rrect(ctx, x0, y - size - 4, w, size + 11, 4)
        ctx.set_source_rgba(*col('bg0', 0.85 * a))
        ctx.fill()
        text(ctx, s, x0 + 7, y + 1, MONO_M, size, color, a, track=1.0)
    else:
        text(ctx, s, x, y, MONO_M, size, color, a, align=align, track=1.0)


class HLine(Ann):
    def __init__(self, price, i0, i1=None, color='cyan', label=None, dash=(8, 6), w=2.0, lpos='right', lsize=14, above=True):
        self.p, self.i0, self.i1, self.color, self.label, self.dash, self.w, self.lpos, self.ls, self.above = price, i0, i1, color, label, dash, w, lpos, lsize, above

    def draw(self, ctx, ch, p):
        x0 = ch.X(self.i0)
        x1 = ch.X(self.i1) if self.i1 is not None else ch.px1
        xe = lerp(x0, x1, p)
        y = ch.Y(self.p)
        line(ctx, x0, y, xe, y, self.color, 1, self.w, list(self.dash) if self.dash else None)
        if self.label and p > 0.5:
            a = clamp((p - 0.5) * 2)
            ly = y - 8 if self.above else y + self.ls + 10
            if self.lpos == 'right':
                _lbl(ctx, self.label, x1 - 4, ly, self.color, a, self.ls, 'right')
            elif self.lpos == 'left':
                _lbl(ctx, self.label, x0 + 4, ly, self.color, a, self.ls, 'left')
            else:
                _lbl(ctx, self.label, (x0 + x1) / 2, ly, self.color, a, self.ls, 'center')


class Zone(Ann):
    layer = 0

    def __init__(self, i0, i1, lo, hi, color='purple', label=None, lpos='left', alpha=0.16, border=True, lcolor=None):
        self.i0, self.i1, self.lo, self.hi, self.color, self.label, self.lpos, self.al, self.border, self.lc = i0, i1, lo, hi, color, label, lpos, alpha, border, lcolor

    def draw(self, ctx, ch, p):
        x0 = ch.X(self.i0) - ch.sw() * 0.4
        x1 = ch.X(self.i1) + ch.sw() * 0.4 if self.i1 is not None else ch.px1
        x1 = lerp(x0, x1, p)
        y0, y1 = ch.Y(self.hi), ch.Y(self.lo)
        ctx.rectangle(x0, y0, x1 - x0, y1 - y0)
        ctx.set_source_rgba(*col(self.color, self.al * p))
        ctx.fill_preserve()
        if self.border:
            ctx.set_source_rgba(*col(self.color, 0.75 * p))
            ctx.set_line_width(1.3)
            ctx.stroke()
        else:
            ctx.new_path()
        if self.label and p > 0.4:
            a = clamp((p - 0.4) / 0.6)
            if self.lpos == 'left':
                _lbl(ctx, self.label, x0 + 6, y0 - 7, self.lc or self.color, a, 13)
            elif self.lpos == 'right':
                _lbl(ctx, self.label, x1 - 6, y0 - 7, self.lc or self.color, a, 13, 'right')
            elif self.lpos == 'below':
                _lbl(ctx, self.label, x0 + 6, y1 + 20, self.lc or self.color, a, 13)
            elif self.lpos == 'inside':
                _lbl(ctx, self.label, x1 - 6, (y0 + y1) / 2 + 6, self.lc or self.color, a, 13, 'right', box=False)


class Mark(Ann):
    layer = 2

    def __init__(self, i, price, label='', color='gold', pos='above', sub=None, ring=True, size=24):
        self.i, self.p, self.label, self.color, self.pos, self.sub, self.ring, self.size = i, price, label, color, pos, sub, ring, size

    def draw(self, ctx, ch, p):
        x, y = ch.X(self.i), ch.Y(self.p)
        if self.ring:
            circle(ctx, x, y, 7 * (0.5 + 0.5 * p), stroke=self.color, alpha=p, w=2.5)
        d = -1 if self.pos == 'above' else 1
        if self.label:
            ty = y + d * 18 + (self.size * 0.8 if d > 0 else -2)
            text(ctx, self.label, x, ty, SANS_B, self.size, self.color, p, align='center')
        if self.sub:
            sy = y + d * (18 + self.size + 4) + (12 if d > 0 else -4)
            text(ctx, self.sub, x, sy, MONO, 14, 'sub', p, align='center')


class Path(Ann):
    def __init__(self, pts, color='gold', w=2.5, dash=None, fill=None):
        self.pts, self.color, self.w, self.dash, self.fill = pts, color, w, dash, fill

    def draw(self, ctx, ch, p):
        P = [(ch.X(i), ch.Y(v)) for i, v in self.pts]
        segs = len(P) - 1
        prog = p * segs
        ctx.set_source_rgba(*col(self.color))
        ctx.set_line_width(self.w)
        ctx.set_dash(list(self.dash) if self.dash else [])
        ctx.move_to(*P[0])
        for k in range(segs):
            f = clamp(prog - k)
            if f <= 0:
                break
            ctx.line_to(lerp(P[k][0], P[k + 1][0], f), lerp(P[k][1], P[k + 1][1], f))
        ctx.stroke()
        ctx.set_dash([])


class Arrow(Ann):
    layer = 2

    def __init__(self, i1, p1, i2, p2, color='gold', w=3, dash=None, label=None):
        self.a, self.color, self.w, self.dash, self.label = (i1, p1, i2, p2), color, w, dash, label

    def draw(self, ctx, ch, p):
        i1, p1, i2, p2 = self.a
        x1, y1, x2, y2 = ch.X(i1), ch.Y(p1), ch.X(i2), ch.Y(p2)
        xe, ye = lerp(x1, x2, p), lerp(y1, y2, p)
        if p > 0.05:
            arrow(ctx, x1, y1, xe, ye, self.color, 1, self.w, 13, list(self.dash) if self.dash else None)
        if self.label and p > 0.8:
            _lbl(ctx, self.label, x2 + 10, y2 + 5, self.color, 1, 14)


class Range(Ann):
    """Dealing range: high/low boundaries, equilibrium, premium/discount shading."""
    layer = 0

    def __init__(self, i0, i1, lo, hi, labels=True, pd=True, eq=True, i_end=None):
        self.i0, self.i1, self.lo, self.hi, self.labels, self.pd, self.eq, self.ie = i0, i1, lo, hi, labels, pd, eq, i_end

    def draw(self, ctx, ch, p):
        x0 = ch.X(self.i0)
        x1 = ch.X(self.ie) if self.ie is not None else ch.px1
        xe = lerp(x0, x1, p)
        yh, yl, ye = ch.Y(self.hi), ch.Y(self.lo), ch.Y((self.hi + self.lo) / 2)
        if self.pd:
            ctx.rectangle(x0, yh, xe - x0, ye - yh)
            ctx.set_source_rgba(*col('bear', 0.07 * p))
            ctx.fill()
            ctx.rectangle(x0, ye, xe - x0, yl - ye)
            ctx.set_source_rgba(*col('bull', 0.07 * p))
            ctx.fill()
        line(ctx, x0, yh, xe, yh, 'text', 0.7 * p, 1.5)
        line(ctx, x0, yl, xe, yl, 'text', 0.7 * p, 1.5)
        if self.eq:
            line(ctx, x0, ye, xe, ye, 'gold', p, 1.5, [10, 6])
        if self.labels and p > 0.6:
            a = clamp((p - 0.6) / 0.4)
            _lbl(ctx, f'RANGE HIGH · {self.hi:,.0f}', x1 - 6, yh - 8, 'text', a, 13, 'right')
            _lbl(ctx, f'RANGE LOW · {self.lo:,.0f}', x1 - 6, yl + 22, 'text', a, 13, 'right')
            if self.eq:
                _lbl(ctx, f'EQUILIBRIUM 50% · {(self.hi + self.lo) / 2:,.0f}', x1 - 6, ye - 8, 'gold', a, 13, 'right')
            if self.pd:
                xm = x0 + (x1 - x0) * 0.62
                text(ctx, 'PREMIUM', xm, (yh + ye) / 2 + 6, MONO_SB, 18, 'bear', a * 0.85, align='center', track=3)
                text(ctx, 'DISCOUNT', xm, (ye + yl) / 2 + 6, MONO_SB, 18, 'bull', a * 0.85, align='center', track=3)


class Tag(Ann):
    layer = 2

    def __init__(self, s, i, price, color='gold', align='center', dy=0, size=15):
        self.s, self.i, self.p, self.color, self.align, self.dy, self.size = s, i, price, color, align, dy, size

    def draw(self, ctx, ch, p):
        pill(ctx, self.s, ch.X(self.i), ch.Y(self.p) + self.dy, self.color, p, size=self.size, align=self.align)


class Note(Ann):
    """Pill pinned to the chart panel (fractions of panel width/height)."""
    layer = 2

    def __init__(self, s, fx=0.5, fy=0.13, color='amber', size=16, align='center'):
        self.s, self.fx, self.fy, self.color, self.size, self.align = s, fx, fy, color, size, align

    def draw(self, ctx, ch, p):
        pill(ctx, self.s, ch.x + ch.w * self.fx, ch.y + ch.h * self.fy, self.color, p, size=self.size, align=self.align)


class Decision(Ann):
    """Look-ahead guard: a decision point marker with a question; right side hidden."""
    layer = 2

    def __init__(self, i, q='DECISION POINT · WHAT DO WE KNOW NOW?'):
        self.i, self.q = i, q

    def draw(self, ctx, ch, p):
        x = ch.X(self.i) + ch.sw() * 0.5
        line(ctx, x, ch.py0, x, ch.py1, 'amber', p, 1.5, [6, 6])
        ctx.rectangle(x + 1, ch.py0 - 10, ch.px1 - x, ch.py1 - ch.py0 + 20)
        ctx.set_source_rgba(*col('amber', 0.05 * p))
        ctx.fill()
        pill(ctx, self.q, x + 12, ch.py0 + 16, 'amber', p, size=14, align='left')


class Position(Ann):
    """Entry / stop / target planning box."""
    layer = 2

    def __init__(self, i0, i1, entry, sl, tp, side='long'):
        self.i0, self.i1, self.e, self.sl, self.tp, self.side = i0, i1, entry, sl, tp, side

    def draw(self, ctx, ch, p):
        x0, x1 = ch.X(self.i0), ch.X(self.i1)
        x1 = lerp(x0, x1, p)
        ye, ys, yt = ch.Y(self.e), ch.Y(self.sl), ch.Y(self.tp)
        ctx.rectangle(x0, min(ye, yt), x1 - x0, abs(yt - ye))
        ctx.set_source_rgba(*col('bull', 0.16 * p))
        ctx.fill()
        ctx.rectangle(x0, min(ye, ys), x1 - x0, abs(ys - ye))
        ctx.set_source_rgba(*col('bear', 0.18 * p))
        ctx.fill()
        line(ctx, x0, ye, x1, ye, 'text', p, 2)
        line(ctx, x0, ys, x1, ys, 'bear', p, 2)
        line(ctx, x0, yt, x1, yt, 'bull', p, 2)
        if p > 0.6:
            a = clamp((p - 0.6) / 0.4)
            risk = abs(self.e - self.sl)
            rew = abs(self.tp - self.e)
            _lbl(ctx, f'ENTRY {self.e:,.0f}', x1 + 8, ye + 6, 'text', a, 13)
            _lbl(ctx, f'SL {self.sl:,.0f} · {risk:.0f} pts', x1 + 8, ys + (16 if self.side == 'long' else -2), 'bear', a, 13)
            _lbl(ctx, f'TP {self.tp:,.0f} · {rew:.0f} pts', x1 + 8, yt + (-2 if self.side == 'long' else 16), 'bull', a, 13)
            _lbl(ctx, f'R:R ≈ 1:{rew / risk:.1f}', x0 + 6, (ye + yt) / 2 + 6, 'gold', a, 13)


class VBand(Ann):
    layer = 0

    def __init__(self, i0, i1, color='blue', label=None, alpha=0.08):
        self.i0, self.i1, self.color, self.label, self.al = i0, i1, color, label, alpha

    def draw(self, ctx, ch, p):
        x0 = ch.X(self.i0) - ch.sw() / 2
        x1 = ch.X(self.i1) + ch.sw() / 2
        ctx.rectangle(x0, ch.py0, x1 - x0, ch.py1 - ch.py0)
        ctx.set_source_rgba(*col(self.color, self.al * p))
        ctx.fill()
        if self.label:
            text(ctx, self.label, (x0 + x1) / 2, ch.py1 - 10, MONO_M, 13, self.color, p, align='center', track=1.5)


class Bracket(Ann):
    """Vertical measurement between two prices at index i."""
    layer = 2

    def __init__(self, i, p1, p2, label=None, color='text'):
        self.i, self.p1, self.p2, self.label, self.color = i, p1, p2, label, color

    def draw(self, ctx, ch, p):
        x = ch.X(self.i)
        y1, y2 = ch.Y(self.p1), ch.Y(self.p2)
        ye = lerp(y1, y2, p)
        line(ctx, x, y1, x, ye, self.color, 1, 1.5)
        line(ctx, x - 7, y1, x + 7, y1, self.color, 1, 1.5)
        if p > 0.95:
            line(ctx, x - 7, y2, x + 7, y2, self.color, 1, 1.5)
            if self.label:
                _lbl(ctx, self.label, x - 10, (y1 + y2) / 2 + 6, self.color, 1, 13, 'right')


class Struct(Ann):
    """BOS / CHoCH / MSS line: from swing index to break index at level, label centred."""

    def __init__(self, i0, i1, level, label='BOS', color='bull', below=False):
        self.h = HLine(level, i0, i1, color, label, dash=(5, 4), w=1.8, lpos='mid', above=not below)

    def draw(self, ctx, ch, p):
        self.h.draw(ctx, ch, p)


def fvg_zone(s, mid, d, color=None, label='FVG', extend=None, lpos='right'):
    if d > 0:
        lo, hi = s.h[mid - 1], s.l[mid + 1]
    else:
        lo, hi = s.h[mid + 1], s.l[mid - 1]
    return Zone(mid - 1, extend if extend is not None else mid + 1, lo, hi, color or ('bull' if d > 0 else 'bear'), label, lpos=lpos, alpha=0.22)


def mirror(s, axis):
    """Return a price-mirrored copy (bullish <-> bearish) with valid OHLC."""
    m = Series()
    for i in range(len(s)):
        m.add(axis - s.o[i], axis - s.l[i], axis - s.h[i], axis - s.c[i])
    m.ends = list(s.ends)
    m.validate()
    return m
