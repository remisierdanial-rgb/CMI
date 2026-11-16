"""CMI motion-graphics engine — core drawing primitives & theme.

Visual language mirrors the CMI reference episode (ILMU L1 EP03):
dark navy canvas, gold accent, Inter + JetBrains Mono, rounded panels,
burned-in Malay subtitles and a gold progress bar.
"""
import math
import cairo

W, H = 1920, 1080
FPS = 30


def hexc(h, a=1.0):
    h = h.lstrip('#')
    return (int(h[0:2], 16) / 255, int(h[2:4], 16) / 255, int(h[4:6], 16) / 255, a)


# ---------------------------------------------------------------- theme
C = dict(
    bg0=hexc('#040b19'), bg1=hexc('#0b1630'), panel=hexc('#0e172e'), panel2=hexc('#121d38'),
    border=hexc('#1f2b4a'), border2=hexc('#2a3a62'), grid=hexc('#16213b'),
    text=hexc('#f1f4fa'), sub=hexc('#a9b3c9'), dim=hexc('#5d6a86'), faint=hexc('#36425e'),
    gold=hexc('#d6ae51'), bull=hexc('#26a69a'), bear=hexc('#ef5350'),
    blue=hexc('#4d8dff'), ebl=hexc('#2f7bff'), purple=hexc('#a77bf3'), pink=hexc('#f06ab0'),
    orange=hexc('#f59e3d'), cyan=hexc('#22d3ee'), amber=hexc('#f5b83d'), white=hexc('#ffffff'),
    navy=hexc('#0a1a3f'),
)

SANS = 'Inter'
SANS_M = 'Inter Medium'
SANS_SB = 'Inter SemiBold'
SANS_B = 'Inter Bold'
MONO = 'JetBrains Mono'
MONO_M = 'JetBrains Mono Medium'
MONO_SB = 'JetBrains Mono SemiBold'


def col(c, a=1.0):
    if isinstance(c, str):
        c = C[c] if c in C else hexc(c)
    return (c[0], c[1], c[2], c[3] * a)


def clamp(x, a=0.0, b=1.0):
    return a if x < a else b if x > b else x


def ease(x):
    x = clamp(x)
    return 1 - (1 - x) ** 3


def ease_io(x):
    x = clamp(x)
    return 4 * x * x * x if x < .5 else 1 - (-2 * x + 2) ** 3 / 2


def lerp(a, b, t):
    return a + (b - a) * t


# ---------------------------------------------------------------- text
_face_cache = {}


def set_font(ctx, face, size):
    if face.endswith(' Bold'):
        ctx.select_font_face(face[:-5], cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    else:
        ctx.select_font_face(face, cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    ctx.set_font_size(size)


def text_w(ctx, s, face, size, track=0.0):
    set_font(ctx, face, size)
    w = ctx.text_extents(s).x_advance
    return w + track * max(0, len(s) - 1)


def text(ctx, s, x, y, face=SANS, size=24, color='text', alpha=1.0, align='left', track=0.0):
    """Draw single-line text; y is the baseline. Returns width."""
    set_font(ctx, face, size)
    w = text_w(ctx, s, face, size, track)
    if align == 'center':
        x -= w / 2
    elif align == 'right':
        x -= w
    ctx.set_source_rgba(*col(color, alpha))
    if track:
        cx = x
        for ch in s:
            ctx.move_to(cx, y)
            ctx.show_text(ch)
            cx += ctx.text_extents(ch).x_advance + track
    else:
        ctx.move_to(x, y)
        ctx.show_text(s)
    return w


def wrap(ctx, s, face, size, max_w):
    set_font(ctx, face, size)
    lines, cur = [], ''
    for para in s.split('\n'):
        cur = ''
        for word in para.split(' '):
            trial = (cur + ' ' + word).strip()
            if ctx.text_extents(trial).x_advance <= max_w or not cur:
                cur = trial
            else:
                lines.append(cur)
                cur = word
        lines.append(cur)
    return lines


def para(ctx, s, x, y, max_w, face=SANS, size=24, color='text', alpha=1.0, lh=1.4, align='left'):
    """Wrapped paragraph; y is the first baseline. Returns total height."""
    ls = wrap(ctx, s, face, size, max_w)
    for i, l in enumerate(ls):
        text(ctx, l, x, y + i * size * lh, face, size, color, alpha, align)
    return len(ls) * size * lh


# ---------------------------------------------------------------- shapes
def rrect(ctx, x, y, w, h, r):
    r = min(r, w / 2, h / 2)
    ctx.new_sub_path()
    ctx.arc(x + w - r, y + r, r, -math.pi / 2, 0)
    ctx.arc(x + w - r, y + h - r, r, 0, math.pi / 2)
    ctx.arc(x + r, y + h - r, r, math.pi / 2, math.pi)
    ctx.arc(x + r, y + r, r, math.pi, 1.5 * math.pi)
    ctx.close_path()


def panel(ctx, x, y, w, h, alpha=1.0, fill='panel', border='border', r=14, bw=1.5):
    rrect(ctx, x, y, w, h, r)
    ctx.set_source_rgba(*col(fill, alpha))
    ctx.fill_preserve()
    ctx.set_line_width(bw)
    ctx.set_source_rgba(*col(border, alpha))
    ctx.stroke()


def line(ctx, x1, y1, x2, y2, color, alpha=1.0, w=2.0, dash=None):
    ctx.set_source_rgba(*col(color, alpha))
    ctx.set_line_width(w)
    ctx.set_dash(dash or [])
    ctx.move_to(x1, y1)
    ctx.line_to(x2, y2)
    ctx.stroke()
    ctx.set_dash([])


def circle(ctx, x, y, r, fill=None, stroke=None, alpha=1.0, w=2.0):
    ctx.new_path()
    ctx.arc(x, y, r, 0, 2 * math.pi)
    if fill:
        ctx.set_source_rgba(*col(fill, alpha))
        if stroke:
            ctx.fill_preserve()
        else:
            ctx.fill()
    if stroke:
        ctx.set_source_rgba(*col(stroke, alpha))
        ctx.set_line_width(w)
        ctx.stroke()


def arrow(ctx, x1, y1, x2, y2, color, alpha=1.0, w=3.0, head=14, dash=None):
    line(ctx, x1, y1, x2, y2, color, alpha, w, dash)
    ang = math.atan2(y2 - y1, x2 - x1)
    ctx.set_source_rgba(*col(color, alpha))
    ctx.move_to(x2, y2)
    ctx.line_to(x2 - head * math.cos(ang - 0.42), y2 - head * math.sin(ang - 0.42))
    ctx.line_to(x2 - head * math.cos(ang + 0.42), y2 - head * math.sin(ang + 0.42))
    ctx.close_path()
    ctx.fill()


def pill(ctx, s, x, y, color='gold', alpha=1.0, size=17, face=MONO_M, align='center', fill=None, track=1.0, pad=12):
    """Outlined label pill. (x,y) = anchor centre-left/centre per align; y is vertical centre."""
    w = text_w(ctx, s, face, size, track) + pad * 2
    h = size + 16
    if align == 'center':
        x0 = x - w / 2
    elif align == 'right':
        x0 = x - w
    else:
        x0 = x
    rrect(ctx, x0, y - h / 2, w, h, 6)
    ctx.set_source_rgba(*col(fill or 'bg0', 0.92 * alpha))
    ctx.fill_preserve()
    ctx.set_source_rgba(*col(color, alpha))
    ctx.set_line_width(1.5)
    ctx.stroke()
    text(ctx, s, x0 + pad, y + size * 0.36, face, size, color, alpha, track=track)
    return w


def check(ctx, x, y, s, color, alpha=1.0, w=3.0):
    ctx.set_source_rgba(*col(color, alpha))
    ctx.set_line_width(w)
    ctx.set_line_cap(cairo.LINE_CAP_ROUND)
    ctx.move_to(x, y + s * 0.5)
    ctx.line_to(x + s * 0.38, y + s * 0.88)
    ctx.line_to(x + s, y + s * 0.1)
    ctx.stroke()
    ctx.set_line_cap(cairo.LINE_CAP_BUTT)


def cross(ctx, x, y, s, color, alpha=1.0, w=3.0):
    line(ctx, x, y, x + s, y + s, color, alpha, w)
    line(ctx, x + s, y, x, y + s, color, alpha, w)


# ---------------------------------------------------------------- background
_bg_cache = {}


def background(ctx):
    key = 'bg'
    if key not in _bg_cache:
        s = cairo.ImageSurface(cairo.FORMAT_RGB24, W, H)
        c = cairo.Context(s)
        g = cairo.RadialGradient(W * 0.45, H * 0.45, 100, W * 0.5, H * 0.5, W * 0.8)
        g.add_color_stop_rgba(0, *C['bg1'][:3], 1)
        g.add_color_stop_rgba(1, *C['bg0'][:3], 1)
        c.set_source(g)
        c.paint()
        c.set_source_rgba(*col('grid', 0.35))
        c.set_line_width(1)
        for x in range(0, W, 64):
            c.move_to(x + .5, 80)
            c.line_to(x + .5, H)
        for y in range(80, H, 64):
            c.move_to(0, y + .5)
            c.line_to(W, y + .5)
        c.stroke()
        _bg_cache[key] = s
    ctx.set_source_surface(_bg_cache[key], 0, 0)
    ctx.paint()


def header(ctx, meta, scene_label):
    ctx.set_source_rgba(*col('bg0', 0.94))
    ctx.rectangle(0, 0, W, 79)
    ctx.fill()
    line(ctx, 0, 79.5, W, 79.5, 'border', 1, 1.5)
    rrect(ctx, 34, 20, 40, 40, 7)
    ctx.set_source_rgba(*col('gold'))
    ctx.fill()
    text(ctx, meta['badge'], 54, 47, SANS_B, 17, 'bg0', align='center')
    text(ctx, meta['line1'], 92, 37, SANS_SB, 18, 'gold')
    text(ctx, meta['line2'], 92, 60, SANS_M, 18, 'sub', track=0.4)
    text(ctx, meta['video'], W - 36, 37, SANS_B, 18, 'text', align='right')
    text(ctx, scene_label, W - 36, 61, MONO, 15, 'sub', align='right', track=2.2)


def subtitle(ctx, s, alpha=1.0):
    if not s or alpha <= 0:
        return
    size = 40
    ls = wrap(ctx, s, SANS_M, size, 1460)
    lh = size * 1.32
    widths = [text_w(ctx, l, SANS_M, size) for l in ls]
    bw = max(widths) + 60
    bh = len(ls) * lh + 30
    by = 1046 - bh
    rrect(ctx, W / 2 - bw / 2, by, bw, bh, 6)
    ctx.set_source_rgba(0, 0, 0, 0.55 * alpha)
    ctx.fill()
    for i, l in enumerate(ls):
        text(ctx, l, W / 2, by + 15 + size * 0.95 + i * lh, SANS_M, size, 'text', alpha, align='center')


def progress(ctx, frac):
    ctx.set_source_rgba(*col('border'))
    ctx.rectangle(0, H - 5, W, 5)
    ctx.fill()
    ctx.set_source_rgba(*col('gold'))
    ctx.rectangle(0, H - 5, W * clamp(frac), 5)
    ctx.fill()


def with_alpha(ctx, alpha, fn):
    """Run fn() with group alpha (used for fades)."""
    if alpha >= 0.999:
        fn()
        return
    if alpha <= 0.001:
        return
    ctx.push_group()
    fn()
    ctx.pop_group_to_source()
    ctx.paint_with_alpha(alpha)
