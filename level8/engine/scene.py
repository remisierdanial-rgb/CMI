"""Scene timeline + generic layout elements.

A Scene is a sequence of narration beats (English voice-over + Malay
subtitle). Visual elements are attached to beats so that every animation
is synchronised with what the narrator is saying.
"""
from .core import *  # noqa


class Scene:
    def __init__(self, code, title, lead=0.7, tail=0.9):
        self.code = code          # e.g. '8.1'
        self.title = title        # short scene title for header
        self.lines = []           # dicts: en, ms, pause
        self.els = []
        self.lead, self.tail = lead, tail
        self.cur = 0
        self.times = None
        self.dur = None
        self.number = 0

    # ---- authoring
    def say(self, en, ms, pause=0.35):
        self.lines.append(dict(en=en, ms=ms, pause=pause))
        self.cur = len(self.lines) - 1
        return self.cur

    def add(self, el, at=None, delay=0.0):
        el.at = self.cur if at is None else at
        el.delay = delay
        el.scene = self
        self.els.append(el)
        return el

    # ---- timing
    def set_durations(self, durs):
        t = self.lead
        self.times = []
        for ln, d in zip(self.lines, durs):
            ln['dur'] = d
            self.times.append(t)
            t += d + ln['pause']
        self.dur = t + self.tail

    def T(self, at, delay=0.0):
        if at is None:
            return 0.0
        if at == 'start':
            return 0.0
        if at >= len(self.times):
            return self.dur
        return self.times[at] + delay

    def resolve(self):
        for e in self.els:
            e.resolve(self)

    def label(self):
        if self.code[0].isdigit():
            return f'SCENE {self.number} · {self.code} · {self.title.upper()}'
        return f'SCENE {self.number} · {self.title.upper()}'

    def subtitle_at(self, t):
        for i, ln in enumerate(self.lines):
            s = self.times[i]
            e = s + ln['dur'] + min(ln['pause'], 0.25)
            if s - 0.05 <= t <= e:
                a = min(clamp((t - s + 0.05) / 0.15), clamp((e - t) / 0.15))
                return ln['ms'], a
        return None, 0

    def draw(self, ctx, t):
        for e in self.els:
            e.draw(ctx, t)


class El:
    fade = 0.45

    def resolve(self, sc):
        self.t0 = sc.T(self.at, self.delay)

    def alpha(self, t):
        return ease((t - self.t0) / self.fade)

    def draw(self, ctx, t):
        a = self.alpha(t)
        if a <= 0:
            return
        with_alpha(ctx, a, lambda: self.paint(ctx, t))

    def paint(self, ctx, t):
        pass


class Timed:
    """Mixin helper for elements with per-item times."""

    def items_resolve(self, sc, items):
        out = []
        for it in items:
            at = it.get('at', self.at)
            out.append(sc.T(at, it.get('delay', 0.0)))
        return out


class Heading(El):
    def __init__(self, eyebrow, title, x=120, y=150, size=46, sub=None, rule=False, max_w=1680):
        self.eb, self.ti, self.x, self.y, self.size, self.sub, self.rule, self.mw = eyebrow, title, x, y, size, sub, rule, max_w

    def paint(self, ctx, t):
        p = ease((t - self.t0) / 0.6)
        dy = (1 - p) * 14
        if self.eb:
            text(ctx, self.eb.upper(), self.x, self.y - self.size - 22 + dy, MONO_M, 17, 'gold', track=2.6)
        h = para(ctx, self.ti, self.x, self.y + dy, self.mw, SANS_B, self.size, 'text', lh=1.15)
        yy = self.y + h - self.size * 0.15
        if self.sub:
            text(ctx, self.sub, self.x, yy + 18, SANS, 28, 'sub')
            yy += 40
        if self.rule:
            line(ctx, self.x, yy + 28, self.x + 160 * p, yy + 28, 'gold', 1, 3)


class Bullets(El, Timed):
    """items: list of dict(text, at, color?, style?)."""

    def __init__(self, items, x, y, w=900, size=30, gap=1.9, style='dot', color='gold', face=SANS):
        self.items, self.x, self.y, self.w, self.size, self.gap, self.style, self.color, self.face = items, x, y, w, size, gap, style, color, face

    def resolve(self, sc):
        super().resolve(sc)
        self.ts = self.items_resolve(sc, self.items)
        self.t0 = min(self.ts) if self.ts else self.t0

    def paint(self, ctx, t):
        y = self.y
        for it, t0 in zip(self.items, self.ts):
            a = ease((t - t0) / 0.4)
            colr = it.get('color', self.color)
            style = it.get('style', self.style)
            ls = wrap(ctx, it['text'], self.face, self.size, self.w - 48)
            if a > 0:
                dx = (1 - a) * 16
                cy = y - self.size * 0.33
                if style == 'dot':
                    circle(ctx, self.x + 8 + dx, cy, 6, fill=colr, alpha=a)
                elif style == 'check':
                    check(ctx, self.x + dx, cy - 11, 22, colr, a)
                elif style == 'cross':
                    cross(ctx, self.x + 2 + dx, cy - 9, 18, colr, a)
                elif style == 'num':
                    text(ctx, it.get('num', ''), self.x + dx, y, MONO_SB, self.size * 0.8, colr, a)
                elif style == 'warn':
                    text(ctx, '!', self.x + 4 + dx, y, SANS_B, self.size, colr, a)
                for i, l in enumerate(ls):
                    text(ctx, l, self.x + 44 + dx, y + i * self.size * 1.3, self.face, self.size, it.get('tcolor', 'text'), a)
            y += self.size * (self.gap + 1.3 * (len(ls) - 1))


class Table(El, Timed):
    """cols: list of (header, width_px). rows: list of dict(cells, at, colors(list), hl)."""

    def __init__(self, cols, rows, x, y, row_h=62, size=24, head_size=15, first_bold=True):
        self.cols, self.rows, self.x, self.y, self.rh, self.size, self.hs, self.fb = cols, rows, x, y, row_h, size, head_size, first_bold

    def resolve(self, sc):
        super().resolve(sc)
        self.ts = self.items_resolve(sc, self.rows)

    def paint(self, ctx, t):
        w = sum(c[1] for c in self.cols) + 24
        n = len(self.rows)
        panel(ctx, self.x, self.y, w, 52 + n * self.rh + 10, r=10)
        rrect(ctx, self.x, self.y, w, 52, 10)
        ctx.set_source_rgba(*col('panel2'))
        ctx.fill()
        cx = self.x + 24
        for h, cw in self.cols:
            text(ctx, h.upper(), cx, self.y + 32, MONO_M, self.hs, 'gold', track=2)
            cx += cw
        for r, (row, t0) in enumerate(zip(self.rows, self.ts)):
            a = ease((t - t0) / 0.4)
            if a <= 0:
                continue
            ry = self.y + 52 + r * self.rh
            if row.get('hl') and t >= t0:
                hl_end = row.get('hl_until')
                ctx.set_source_rgba(*col(row.get('hl_color', 'gold'), 0.10 * a))
                ctx.rectangle(self.x + 2, ry + 2, w - 4, self.rh - 4)
                ctx.fill()
            if r > 0:
                line(ctx, self.x + 16, ry, self.x + w - 16, ry, 'border', a, 1)
            cx = self.x + 24
            colors = row.get('colors', [])
            for ci, (cell, (h, cw)) in enumerate(zip(row['cells'], self.cols)):
                face = SANS_B if (ci == 0 and self.fb) else SANS
                c = colors[ci] if ci < len(colors) and colors[ci] else ('text' if ci == 0 else 'sub')
                ls = wrap(ctx, cell, face, self.size, cw - 24)
                base = ry + self.rh / 2 + self.size * 0.35 - (len(ls) - 1) * self.size * 0.62
                for li, l in enumerate(ls):
                    text(ctx, l, cx, base + li * self.size * 1.22, face, self.size, c, a)
                cx += cw


class Card(El):
    """Numbered card like the reference 'mistakes' cards."""

    def __init__(self, x, y, w, h, num, title, body=None, color='bear', icon='cross', fn=None, size=22):
        self.x, self.y, self.w, self.h, self.num, self.title, self.body, self.color, self.icon, self.fn, self.size = x, y, w, h, num, title, body, color, icon, fn, size

    def paint(self, ctx, t):
        p = ease((t - self.t0) / 0.5)
        y = self.y + (1 - p) * 20
        panel(ctx, self.x, y, self.w, self.h, border=self.color, bw=1.8)
        rrect(ctx, self.x, y, self.w, self.h, 14)
        ctx.set_source_rgba(*col(self.color, 0.06))
        ctx.fill()
        if self.num:
            text(ctx, self.num, self.x + 22, y + 44, MONO_SB, 22, self.color)
        if self.icon == 'cross':
            cross(ctx, self.x + self.w - 42, y + 24, 20, self.color)
        elif self.icon == 'check':
            check(ctx, self.x + self.w - 46, y + 22, 24, self.color)
        h = para(ctx, self.title, self.x + 22, y + (84 if self.num else 50), self.w - 44, SANS_SB, self.size, 'text', lh=1.25)
        if self.body:
            para(ctx, self.body, self.x + 22, y + (84 if self.num else 50) + h + 8, self.w - 44, SANS, self.size - 3, 'sub', lh=1.35)
        if self.fn:
            self.fn(ctx, self.x, y, self.w, self.h, clamp((t - self.t0) / 1.2))


class Statement(El, Timed):
    """Big statement lines: list of dict(text, color, at)."""

    def __init__(self, lines, x=120, y=420, size=64, eyebrow=None, lh=1.25, max_w=1680):
        self.lines, self.x, self.y, self.size, self.eb, self.lh, self.mw = lines, x, y, size, eyebrow, lh, max_w

    def resolve(self, sc):
        super().resolve(sc)
        self.ts = self.items_resolve(sc, self.lines)

    def paint(self, ctx, t):
        if self.eb:
            text(ctx, self.eb.upper(), self.x, self.y - self.size - 30, MONO_M, 18, 'gold', track=2.6)
        y = self.y
        for ln, t0 in zip(self.lines, self.ts):
            a = ease((t - t0) / 0.5)
            ls = wrap(ctx, ln['text'], SANS_B, self.size, self.mw)
            for l in ls:
                if a > 0:
                    text(ctx, l, self.x + (1 - a) * 18, y, SANS_B, self.size, ln.get('color', 'text'), a)
                y += self.size * self.lh


class Flow(El, Timed):
    """Chain of boxes. boxes: list of dict(title, sub, color, at). dir 'v' or 'h'."""

    def __init__(self, boxes, x, y, bw, bh, gap=40, d='v', tsize=26, ssize=19):
        self.boxes, self.x, self.y, self.bw, self.bh, self.gap, self.d, self.ts_, self.ss = boxes, x, y, bw, bh, gap, d, tsize, ssize

    def resolve(self, sc):
        super().resolve(sc)
        self.ts = self.items_resolve(sc, self.boxes)
        self.t0 = min(self.ts)

    def pos(self, i):
        if self.d == 'v':
            return self.x, self.y + i * (self.bh + self.gap)
        return self.x + i * (self.bw + self.gap), self.y

    def paint(self, ctx, t):
        for i, (b, t0) in enumerate(zip(self.boxes, self.ts)):
            a = ease((t - t0) / 0.45)
            if a <= 0:
                continue
            x, y = self.pos(i)
            c = b.get('color', 'gold')
            if i > 0:
                px, py = self.pos(i - 1)
                if self.d == 'v':
                    arrow(ctx, x + self.bw / 2, py + self.bh + 4, x + self.bw / 2, y - 4, 'dim', a, 2, 10)
                else:
                    arrow(ctx, px + self.bw + 4, y + self.bh / 2, x - 4, y + self.bh / 2, 'dim', a, 2, 10)
            panel(ctx, x, y, self.bw, self.bh, a, border=c, r=10, bw=1.8)
            rrect(ctx, x, y, 7, self.bh, 3)
            ctx.set_source_rgba(*col(c, a))
            ctx.fill()
            if b.get('tag'):
                text(ctx, b['tag'].upper(), x + 26, y + 30, MONO_M, 14, c, a, track=2)
                ty = y + 30 + self.ts_ + 6
            else:
                ty = y + self.bh / 2 + (self.ts_ * 0.35 if not b.get('sub') else -2)
            text(ctx, b['title'], x + 26, ty, SANS_SB, self.ts_, 'text', a)
            if b.get('sub'):
                para(ctx, b['sub'], x + 26, ty + self.ss * 1.5, self.bw - 46, SANS, self.ss, 'sub', a, lh=1.3)


class Box(El):
    """Panel with optional eyebrow, title and body."""

    def __init__(self, x, y, w, h, title=None, body=None, eyebrow=None, color='border', tsize=28, bsize=23, fill='panel', center=False):
        self.x, self.y, self.w, self.h, self.title, self.body, self.eb, self.color, self.tsize, self.bsize, self.fill, self.center = x, y, w, h, title, body, eyebrow, color, tsize, bsize, fill, center

    def paint(self, ctx, t):
        panel(ctx, self.x, self.y, self.w, self.h, border=self.color, fill=self.fill, bw=1.8)
        y = self.y + 44
        al = 'center' if self.center else 'left'
        x = self.x + self.w / 2 if self.center else self.x + 28
        if self.eb:
            text(ctx, self.eb.upper(), x, y, MONO_M, 15, self.color if self.color != 'border' else 'gold', align=al, track=2.4)
            y += 40
        if self.title:
            y += para(ctx, self.title, x, y, self.w - 56, SANS_SB, self.tsize, 'text', lh=1.25, align=al) + 4
        if self.body:
            para(ctx, self.body, x, y + 4, self.w - 56, SANS, self.bsize, 'sub', lh=1.42, align=al)


class Custom(El):
    def __init__(self, fn, fade=0.45):
        self.fn = fn
        self.fade = fade

    def paint(self, ctx, t):
        self.fn(ctx, t - self.t0)


class Pill(El):
    def __init__(self, s, x, y, color='gold', size=18, align='center'):
        self.s, self.x, self.y, self.color, self.size, self.align = s, x, y, color, size, align

    def paint(self, ctx, t):
        pill(ctx, self.s, self.x, self.y, self.color, size=self.size, align=self.align)


class Disclaimer(El):
    def __init__(self, next_text):
        self.nt = next_text

    def paint(self, ctx, t):
        x, y, w, h = W / 2 - 300, 300, 600, 280
        panel(ctx, x, y, w, h, border='gold', bw=1.8)
        cx = W / 2
        ctx.set_source_rgba(*col('gold'))
        ctx.set_line_width(2.5)
        ctx.move_to(cx, y + 40)
        ctx.line_to(cx + 17, y + 70)
        ctx.line_to(cx - 17, y + 70)
        ctx.close_path()
        ctx.stroke()
        text(ctx, '!', cx, y + 66, SANS_B, 18, 'gold', align='center')
        text(ctx, 'PENAFIAN · DISCLAIMER', cx, y + 104, MONO_M, 15, 'gold', align='center', track=2.4)
        para(ctx, 'Untuk tujuan pendidikan sahaja. Bukan nasihat kewangan atau jaminan keuntungan. Trading futures melibatkan risiko kerugian.',
             cx, y + 146, 520, SANS_M, 22, 'text', lh=1.4, align='center')
        text(ctx, 'Semua harga FCPO dalam video ini ialah ilustrasi pembelajaran (hipotetikal).', cx, y + 252, SANS, 15, 'sub', align='center')
        text(ctx, self.nt, cx, y + h + 50, SANS_M, 22, 'sub', align='center')


class RefList(El, Timed):
    def __init__(self, refs, x=120, y=230, w=1680):
        self.refs, self.x, self.y, self.w = refs, x, y, w

    def resolve(self, sc):
        super().resolve(sc)
        self.ts = [self.t0 + 0.25 * i for i in range(len(self.refs))]

    def paint(self, ctx, t):
        for i, ((title, note), t0) in enumerate(zip(self.refs, self.ts)):
            a = ease((t - t0) / 0.4)
            if a <= 0:
                continue
            y = self.y + i * 66
            panel(ctx, self.x, y, self.w, 54, a, r=8)
            text(ctx, f'{i + 1:02d}', self.x + 22, y + 35, MONO_M, 19, 'gold', a)
            text(ctx, title, self.x + 74, y + 35, SANS_SB, 21, 'text', a)
            text(ctx, note, self.x + self.w - 22, y + 35, SANS, 17, 'sub', a, align='right')
