"""VIDEO 06 — Understanding POI (Subtopic 4: A, B)."""
from .common import *  # noqa

NUM, TITLE = 6, 'Understanding POI'
AX = 8990  # mirror axis for bearish examples


def s_what():
    sc = Scene('8.4', 'What is a POI')
    sc.visual = 'Definition + POI vs confirmed setup comparison; relationship POI ↔ structure ↔ liquidity flow.'
    sc.say('A Point of Interest, or POI, is a price area where we expect a reaction may be worth studying, because of how that area was formed.',
           'Point of Interest atau POI ialah kawasan harga di mana reaksi mungkin berbaloi untuk dikaji, kerana cara kawasan itu terbentuk.')
    sc.add(Heading('SUBTOPIC 4 · POI SELECTION', 'A POI is a location, not a signal', 120, 190, 48))
    b = sc.say('The key word is location. A POI tells us where to look. It does not tell us to enter.',
               'Kata kuncinya ialah lokasi. POI memberitahu di mana untuk melihat. Ia tidak menyuruh kita masuk.')
    sc.add(Card(120, 260, 820, 300, None, 'POI = location for further analysis', 'An area formed by displacement, structure and liquidity. When price arrives, we start watching for evidence on a lower timeframe.', 'purple', None, size=28), at=b)
    b = sc.say('A confirmed trade setup needs more: price reaching the POI, a liquidity interaction, a lower-timeframe structure shift, an execution zone, and a defined stop and target.',
               'Setup trade yang disahkan memerlukan lebih: harga sampai ke POI, interaksi liquidity, peralihan struktur lower timeframe, zon execution, serta stop dan sasaran yang ditentukan.')
    sc.add(Card(980, 260, 820, 300, None, 'Setup = POI + evidence + plan', 'POI reached → liquidity interaction → LTF MSS → execution zone → stop, target and R:R defined in advance.', 'bull', None, size=28), at=b)
    b = sc.say('A POI is meaningful only in relation to market structure and liquidity. The best POIs usually caused a break of structure, and sit near liquidity that may be swept first.',
               'POI hanya bermakna jika dikaitkan dengan struktur market dan liquidity. POI terbaik biasanya menyebabkan break of structure, dan berada berhampiran liquidity yang mungkin di-sweep dahulu.')
    sc.add(Flow([dict(title='Structure', sub='Did this area cause a BOS / MSS?', color='gold', at=b),
                 dict(title='Liquidity', sub='Is liquidity resting near or before it?', color='cyan', at=b, delay=0.5),
                 dict(title='Location', sub='Premium / discount in the HTF range?', color='purple', at=b, delay=1.0)], 120, 600, 520, 170, 60, 'h', 26, 20), at=b)
    sc.say('In this video, we learn the six POI types used in CMI. In the next video, we learn how to choose between them.',
           'Dalam video ini, kita pelajari enam jenis POI yang digunakan dalam CMI. Dalam video seterusnya, kita pelajari cara memilih antaranya.')
    return sc


def poi_scene(code, name, short, lines, bull_legs, seed, marker, side_items, vol=3.0):
    """Generic POI scene: definition panel + bullish chart (top) + mirrored bearish chart (bottom).
    marker(s, bull) -> (zone_annotations list, extra annotations list, reveal_split_index)"""
    sc = Scene('8.4', name)
    sc.visual = f'{name}: definition panel (left), bullish example (top right) and mirrored bearish example (bottom right), zone marked from actual candles, revisit shown after marking.'
    sb = gen(4520, bull_legs, seed=seed, vol=vol, wick=2.2)
    ss = mirror(sb, AX)
    cb = Chart(sb, 670, 100, 1214, 378, 'FCPO · 15M · HYPOTHETICAL', f'BULLISH {short}', slots=len(sb) + 10, step=20, title_color='bull')
    cs = Chart(ss, 670, 492, 1214, 378, 'FCPO · 15M · HYPOTHETICAL', f'BEARISH {short}', slots=len(ss) + 10, step=20, title_color='bear')
    zb, eb, split = marker(sb, True)
    zs, es, _ = marker(ss, False)
    sc.add(Custom(lambda ctx, t: (panel(ctx, 36, 100, 610, 770), text(ctx, f'{short} · {name.upper()}', 62, 150, MONO_M, 16, 'gold', track=2.4))), at=0)
    sc.say(*lines[0])
    sc.add(cb)
    sc.add(cs)
    cb.reveal(split, dur=3)
    cs.reveal(split, dur=3)
    items = []
    for j, (lab, txt, colr) in enumerate(side_items):
        b = sc.say(*lines[1 + j])
        items.append(dict(text=f'{lab}: {txt}', at=b, color=colr))
        if j == 1:
            for a in zb:
                cb.ann(a, at=b, delay=0.3)
            for a in zs:
                cs.ann(a, at=b, delay=0.6)
        if j == 2:
            for a in eb:
                cb.ann(a, at=b)
            for a in es:
                cs.ann(a, at=b)
            cb.reveal(len(sb), at=b, dur=3)
            cs.reveal(len(ss), at=b, dur=3)
    for ln in lines[1 + len(side_items):]:
        sc.say(*ln)
    sc.add(Bullets(items, 56, 220, 570, 25, 2.1, 'dot'), at=items[0]['at'])
    return sc


def m_ob(s, bull):
    E = s.ends
    sg = 1 if bull else -1
    ob = s.last_opposite(E[1], sg)
    z = Zone(ob, None, s.l[ob], s.h[ob], 'purple', 'OB', alpha=0.22)
    bi = s.first_close_beyond(E[1], s.h[E[0]] if bull else s.l[E[0]], sg)
    st = Struct(E[0], bi, s.h[E[0]] if bull else s.l[E[0]], 'BOS', 'bull' if bull else 'bear', below=not bull)
    rv = Mark(E[3], s.l[E[3]] if bull else s.h[E[3]], 'REVISIT', 'purple', 'below' if bull else 'above', size=15)
    return [st, z], [rv], E[2] + 1


def m_fvg(s, bull):
    E = s.ends
    sg = 1 if bull else -1
    fv = s.fvg(E[1] + 1, E[2], sg)
    z = fvg_zone(s, fv[0], sg, 'blue', 'FVG', extend=None, lpos='left')
    c1 = Mark(fv[0] - 1, s.h[fv[0] - 1] if bull else s.l[fv[0] - 1], '1', 'text', 'above' if bull else 'below', size=15, ring=False)
    c3 = Mark(fv[0] + 1, s.l[fv[0] + 1] if bull else s.h[fv[0] + 1], '3', 'text', 'below' if bull else 'above', size=15, ring=False)
    rv = Mark(E[3], s.l[E[3]] if bull else s.h[E[3]], 'REVISIT', 'blue', 'below' if bull else 'above', size=15)
    return [c1, c3, z], [rv], E[2] + 1


def m_breaker(s, bull):
    E = s.ends
    sg = 1 if bull else -1
    # opposing OB at H1 (bull case: last up-close candle before the drop to L2)
    ob = s.last_opposite(E[2], -sg)
    sweep = Mark(E[3], s.l[E[3]] if bull else s.h[E[3]], 'SWEEP', 'amber', 'below' if bull else 'above', size=15)
    z = Zone(ob, None, s.l[ob], s.h[ob], 'blue', 'BREAKER (FAILED OB)', alpha=0.22)
    bi = s.first_close_beyond(E[3], s.h[E[2]] if bull else s.l[E[2]], sg)
    st = Struct(E[2], bi, s.h[E[2]] if bull else s.l[E[2]], 'MSS', 'bull' if bull else 'bear', below=not bull)
    rv = Mark(E[5], s.l[E[5]] if bull else s.h[E[5]], 'RETEST', 'blue', 'below' if bull else 'above', size=15)
    return [sweep, st, z], [rv], E[4] + 1


def m_mitig(s, bull):
    E = s.ends
    sg = 1 if bull else -1
    ob = s.last_opposite(E[2], -sg)
    fail = Mark(E[3], s.l[E[3]] if bull else s.h[E[3]], 'NO NEW LOW' if bull else 'NO NEW HIGH', 'amber', 'below' if bull else 'above', size=15)
    z = Zone(ob, None, s.l[ob], s.h[ob], 'blue', 'MITIGATION BLOCK', alpha=0.22)
    bi = s.first_close_beyond(E[3], s.h[E[2]] if bull else s.l[E[2]], sg)
    st = Struct(E[2], bi, s.h[E[2]] if bull else s.l[E[2]], 'MSS', 'bull' if bull else 'bear', below=not bull)
    rv = Mark(E[5], s.l[E[5]] if bull else s.h[E[5]], 'RETEST', 'blue', 'below' if bull else 'above', size=15)
    return [fail, st, z], [rv], E[4] + 1


def m_rb(s, bull):
    E = s.ends
    w1, w2 = E[1], E[2]
    if bull:
        body = min(min(s.o[w1], s.c[w1]), min(s.o[w2], s.c[w2]))
        ext = min(s.l[w1], s.l[w2])
        z = Zone(w1, None, ext, body, 'purple', 'REJECTION BLOCK · WICKS', alpha=0.22)
    else:
        body = max(max(s.o[w1], s.c[w1]), max(s.o[w2], s.c[w2]))
        ext = max(s.h[w1], s.h[w2])
        z = Zone(w1, None, body, ext, 'purple', 'REJECTION BLOCK · WICKS', alpha=0.22)
    wk = Mark(w2, ext, 'LONG WICKS', 'amber', 'below' if bull else 'above', size=15)
    rv = Mark(E[4], s.l[E[4]] if bull else s.h[E[4]], 'REVISIT', 'purple', 'below' if bull else 'above', size=15)
    return [wk, z], [rv], E[3] + 1


def m_sd(s, bull):
    E = s.ends
    b0, b1 = E[0] + 1, E[2]
    lo = min(s.l[b0:b1 + 1])
    hi = max(s.h[b0:b1 + 1])
    z = Zone(b0, None, lo, hi, 'gold', 'DEMAND · BASE' if bull else 'SUPPLY · BASE', alpha=0.18)
    dep = VBand(b1 + 1, E[3], 'bull' if bull else 'bear', 'STRONG DEPARTURE', 0.08)
    rv = Mark(E[4], s.l[E[4]] if bull else s.h[E[4]], 'RETURN', 'gold', 'below' if bull else 'above', size=15)
    return [dep, z], [rv], E[3] + 1


def s_compare():
    sc = Scene('8.4', 'POI types compared')
    sc.visual = 'Comparison table of the six POI types: what forms it, how to mark, invalidation.'
    sc.say('Here are the six POI types side by side, using CMI operational definitions.',
           'Ini enam jenis POI secara sebelah-menyebelah, menggunakan definisi operasi CMI.')
    sc.add(Heading('POI TYPES · CMI OPERATIONAL DEFINITIONS', 'Six locations, six origins', 120, 190, 46))
    cols = [('Type', 200), ('Forms from', 560), ('Mark', 470), ('Invalid when', 446)]
    R = [('OB', 'Last opposite candle before displacement that breaks structure', 'Candle high–low', 'Body close beyond far edge'),
         ('FVG', '3-candle gap: C1 high < C3 low (bull) / C1 low > C3 high (bear)', 'C1 extreme to C3 extreme', 'Body close beyond far edge'),
         ('BB', 'Failed OB after a liquidity sweep and MSS — flips role', 'Failed OB candle range', 'Close back through breaker'),
         ('MB', 'Failed OB at a failure swing (no new extreme) and MSS', 'Failed OB candle range', 'Close back through block'),
         ('RB', 'Cluster of long wicks at a swing extreme', 'Body edge to wick extreme', 'Close beyond wick extreme'),
         ('S / D', 'Base (consolidation) before a strong departure', 'Base candles high–low', 'Close through the base')]
    b = sc.say('Order blocks and fair value gaps come from displacement. Breakers and mitigation blocks come from failed order blocks. Rejection blocks come from wicks. Supply and demand come from a base before a strong departure.',
               'Order block dan fair value gap berasal daripada displacement. Breaker dan mitigation block berasal daripada order block yang gagal. Rejection block berasal daripada wick. Supply dan demand berasal daripada base sebelum pergerakan yang kuat.')
    rows = [dict(cells=list(r), at=b, delay=0.5 * i, colors=['gold']) for i, r in enumerate(R)]
    sc.add(Table(cols, rows, 120, 240, 86, 21), at=b)
    sc.say('Educators define these terms in different ways. These are the operational definitions CMI uses, consistent with the earlier levels. Whatever definition you use, use it consistently.',
           'Pendidik mentakrifkan istilah ini dengan cara berbeza. Ini definisi operasi yang digunakan CMI, selari dengan level terdahulu. Apa pun definisi anda, gunakannya secara konsisten.')
    return sc


def build():
    L = lambda en, ms: (en, ms)
    ob = poi_scene('OB', 'Order Block', 'OB', [
        L('Type one: the Order Block. In CMI, a bullish order block is the last down-close candle before a displacement that breaks structure upward. A bearish order block is the last up-close candle before a displacement that breaks structure downward.',
          'Jenis satu: Order Block. Dalam CMI, bullish order block ialah candle down-close terakhir sebelum displacement yang memecah struktur ke atas. Bearish order block ialah candle up-close terakhir sebelum displacement yang memecah struktur ke bawah.'),
        L('It forms when price leaves an area with displacement and breaks the previous swing. The break is what makes the candle relevant.',
          'Ia terbentuk apabila harga meninggalkan kawasan dengan displacement dan memecahkan swing sebelumnya. Break itulah yang menjadikan candle itu relevan.'),
        L('We mark the zone from the candle high to its low. Some traders refine it to the body; whichever you choose, be consistent.',
          'Kita tandakan zon dari high hingga low candle itu. Sesetengah trader memperhalusinya ke body; apa pun pilihan anda, jadilah konsisten.'),
        L('When price revisits the zone, the block is tested. It remains valid until a candle body closes beyond its far edge.',
          'Apabila harga kembali ke zon itu, blok itu diuji. Ia kekal sah sehingga body candle ditutup melepasi tepi jauhnya.'),
        L('The common misconception: that every opposite-colour candle is an order block. Without displacement and a break of structure, it is just a candle.',
          'Salah faham yang biasa: bahawa setiap candle berlainan warna ialah order block. Tanpa displacement dan break of structure, ia hanya candle biasa.'),
        L('An order block is a single origin candle; a fair value gap is the imbalance inside the move; supply and demand looks at the base rather than the last candle.',
          'Order block ialah satu candle asal; fair value gap ialah ketidakseimbangan dalam pergerakan; supply dan demand melihat base, bukan candle terakhir.'),
        L('And remember: we cannot see institutional orders inside an order block. It is a reference area, not proof of institutional activity.',
          'Dan ingat: kita tidak dapat melihat order institusi di dalam order block. Ia kawasan rujukan, bukan bukti aktiviti institusi.')],
        [(4, 4508), (5, 4478), (5, 4540, 'disp'), (4, 4484), (6, 4560)], 101, m_ob,
        [('Forms', 'displacement + BOS from last opposite candle', 'bull'), ('Mark', 'candle high → low', 'purple'), ('Valid', 'until body closes beyond far edge', 'gold'),
         ('Misconception', 'not every opposite candle', 'bear'), ('Differs', 'origin candle vs gap vs base', 'sub')])
    fvg = poi_scene('FVG', 'Fair Value Gap', 'FVG', [
        L('Type two: the Fair Value Gap. It is a three-candle pattern. In a bullish fair value gap, the high of candle one is below the low of candle three. The space between them is the gap.',
          'Jenis dua: Fair Value Gap. Ia corak tiga candle. Dalam bullish fair value gap, high candle satu berada di bawah low candle tiga. Ruang di antaranya ialah gap.'),
        L('It forms during displacement, when price moves so quickly in one direction that the middle candle leaves part of its range traded only one way.',
          'Ia terbentuk semasa displacement, apabila harga bergerak begitu pantas ke satu arah sehingga candle tengah meninggalkan sebahagian julatnya diniagakan sehala sahaja.'),
        L('We mark it from the candle-one extreme to the candle-three extreme. The bearish version is the mirror: candle one low above candle three high.',
          'Kita tandakan dari titik ekstrem candle satu hingga titik ekstrem candle tiga. Versi bearish ialah cerminnya: low candle satu di atas high candle tiga.'),
        L('When price returns, the gap may be partly or fully filled. A body close through the far edge invalidates it as support or resistance.',
          'Apabila harga kembali, gap mungkin diisi sebahagian atau sepenuhnya. Penutupan body melepasi tepi jauh membatalkannya sebagai sokongan atau rintangan.'),
        L('The misconception: every fair value gap must be filled, or every gap is tradable. Neither is true. Many gaps are never revisited.',
          'Salah faham: setiap fair value gap mesti diisi, atau setiap gap boleh di-trade. Kedua-duanya tidak benar. Banyak gap tidak pernah dikunjungi semula.'),
        L('Unlike an order block, which is one candle, a fair value gap is the imbalance between candles inside the displacement.',
          'Berbeza daripada order block yang merupakan satu candle, fair value gap ialah ketidakseimbangan antara candle di dalam displacement.')],
        [(4, 4508), (5, 4478), (5, 4544, 'disp'), (4, 4512), (6, 4562)], 102, m_fvg,
        [('Forms', 'C1 high < C3 low inside displacement', 'bull'), ('Mark', 'C1 extreme → C3 extreme', 'blue'), ('Valid', 'until body closes beyond far edge', 'gold'),
         ('Misconception', 'not every gap fills or is tradable', 'bear'), ('Differs', 'gap between candles, not a candle', 'sub')])
    bb = poi_scene('BB', 'Breaker Block', 'BB', [
        L('Type three: the Breaker Block. A breaker is an order block that failed. In the bullish case, a bearish order block forms at a swing high, price sweeps the low below, and then rallies with displacement through that order block.',
          'Jenis tiga: Breaker Block. Breaker ialah order block yang gagal. Dalam kes bullish, bearish order block terbentuk di swing high, harga sweep low di bawah, kemudian naik dengan displacement menembusi order block itu.'),
        L('The sequence matters: liquidity is swept first, then structure shifts the other way and the failed block is broken.',
          'Urutan itu penting: liquidity di-sweep dahulu, kemudian struktur beralih ke arah bertentangan dan blok yang gagal itu dipecahkan.'),
        L('We mark the failed order block candle. Its role flips: what was resistance may now act as support on a retest from above.',
          'Kita tandakan candle order block yang gagal. Peranannya bertukar: yang dahulunya rintangan kini mungkin bertindak sebagai sokongan semasa retest dari atas.'),
        L('On the retest, the breaker is valid while price holds it. A close back through the breaker invalidates the idea.',
          'Semasa retest, breaker sah selagi harga bertahan di situ. Penutupan kembali menembusi breaker membatalkan idea itu.'),
        L('The misconception: any broken zone is a breaker. Without the prior sweep and the structure shift, it is simply a broken level.',
          'Salah faham: setiap zon yang dipecahkan ialah breaker. Tanpa sweep sebelumnya dan peralihan struktur, ia hanya paras yang dipecahkan.'),
        L('The breaker differs from a mitigation block in one detail: the breaker forms after liquidity is swept with a new extreme.',
          'Breaker berbeza daripada mitigation block dalam satu perincian: breaker terbentuk selepas liquidity di-sweep dengan titik ekstrem baru.')],
        [(3, 4532), (6, 4490), (4, 4515), (4, 4478), (6, 4538, 'disp'), (4, 4512), (5, 4556)], 103, m_breaker,
        [('Forms', 'OB fails after sweep + MSS', 'bull'), ('Mark', 'failed OB candle', 'blue'), ('Valid', 'while retest holds', 'gold'),
         ('Misconception', 'not every broken zone', 'bear'), ('Differs', 'needs sweep (new extreme)', 'sub')])
    mb = poi_scene('MB', 'Mitigation Block', 'MB', [
        L('Type four: the Mitigation Block. It is also a failed order block, but it forms at a failure swing. In the bullish case, price fails to make a new low, and then breaks above the swing high.',
          'Jenis empat: Mitigation Block. Ia juga order block yang gagal, tetapi terbentuk di failure swing. Dalam kes bullish, harga gagal membuat low baru, kemudian memecah di atas swing high.'),
        L('So there is no sweep of the previous low. The failure to extend is itself the evidence that the bearish structure is weakening.',
          'Jadi tiada sweep low sebelumnya. Kegagalan untuk melanjutkan itu sendiri ialah bukti bahawa struktur bearish semakin lemah.'),
        L('We mark the last opposing candle at the swing high before the failure. When price returns to it from above, it is studied as a mitigation block.',
          'Kita tandakan candle bertentangan terakhir di swing high sebelum kegagalan itu. Apabila harga kembali kepadanya dari atas, ia dikaji sebagai mitigation block.'),
        L('As with the breaker, it remains valid while price holds it, and is invalidated by a close back through it.',
          'Sama seperti breaker, ia kekal sah selagi harga bertahan di situ, dan terbatal dengan penutupan kembali menembusinya.'),
        L('The misconception: confusing it with a breaker. Check whether the previous extreme was swept. Swept means breaker. Not swept means mitigation block.',
          'Salah faham: mengelirukannya dengan breaker. Semak sama ada titik ekstrem sebelumnya di-sweep. Di-sweep bermaksud breaker. Tidak di-sweep bermaksud mitigation block.'),
        L('Some educators use these two terms differently. CMI uses the sweep test above as its operational rule.',
          'Sesetengah pendidik menggunakan dua istilah ini secara berbeza. CMI menggunakan ujian sweep di atas sebagai peraturan operasinya.')],
        [(3, 4532), (6, 4490), (4, 4515), (4, 4497), (6, 4538, 'disp'), (4, 4512), (5, 4556)], 104, m_mitig,
        [('Forms', 'failure swing, no new extreme + MSS', 'bull'), ('Mark', 'last opposing candle at swing', 'blue'), ('Valid', 'while retest holds', 'gold'),
         ('Misconception', 'confusing MB with BB', 'bear'), ('Differs', 'no sweep (vs breaker)', 'sub')])
    rb = poi_scene('RB', 'Rejection Block', 'RB', [
        L('Type five: the Rejection Block. It forms where long wicks cluster at a swing extreme: price repeatedly traded there but could not hold.',
          'Jenis lima: Rejection Block. Ia terbentuk di mana wick panjang berkumpul di titik ekstrem swing: harga berulang kali diniagakan di situ tetapi tidak dapat bertahan.'),
        L('In the bullish case, long lower wicks form at a swing low. In the bearish case, long upper wicks form at a swing high.',
          'Dalam kes bullish, wick bawah yang panjang terbentuk di swing low. Dalam kes bearish, wick atas yang panjang terbentuk di swing high.'),
        L('We mark the zone from the body edge to the wick extreme. The body edge is often the first reference when price returns.',
          'Kita tandakan zon dari tepi body hingga titik ekstrem wick. Tepi body selalunya menjadi rujukan pertama apabila harga kembali.'),
        L('The block remains valid until price closes beyond the wick extreme.',
          'Blok itu kekal sah sehingga harga ditutup melepasi titik ekstrem wick.'),
        L('The misconception: every long wick is a rejection block. It matters only at a meaningful swing, ideally where liquidity was taken.',
          'Salah faham: setiap wick panjang ialah rejection block. Ia hanya penting di swing yang bermakna, sebaiknya di mana liquidity telah diambil.'),
        L('Unlike an order block, which is built from candle bodies and the move away, a rejection block is built from the wicks themselves.',
          'Berbeza daripada order block yang dibina daripada body candle dan pergerakan meninggalkannya, rejection block dibina daripada wick itu sendiri.')],
        [(5, 4480), (1, 4458, 'wick', 4482), (1, 4461, 'wick', 4484), (6, 4532), (4, 4479), (5, 4552)], 105, m_rb,
        [('Forms', 'long wicks at a swing extreme', 'bull'), ('Mark', 'body edge → wick extreme', 'purple'), ('Valid', 'until close beyond wick extreme', 'gold'),
         ('Misconception', 'not every long wick', 'bear'), ('Differs', 'wicks, not bodies', 'sub')])
    sd = poi_scene('S/D', 'Supply and Demand', 'S/D', [
        L('Type six: Supply and Demand zones, the classic approach. A demand zone is a base, a small consolidation, from which price departed strongly upward. A supply zone is a base from which price departed strongly downward.',
          'Jenis enam: zon Supply dan Demand, pendekatan klasik. Zon demand ialah base, iaitu konsolidasi kecil, dari mana harga bergerak kuat ke atas. Zon supply ialah base dari mana harga bergerak kuat ke bawah.'),
        L('It forms as drop-base-rally or rally-base-rally for demand, and rally-base-drop or drop-base-drop for supply.',
          'Ia terbentuk sebagai drop-base-rally atau rally-base-rally untuk demand, dan rally-base-drop atau drop-base-drop untuk supply.'),
        L('We mark the high and low of the base candles. The strength of the departure is what makes the zone relevant.',
          'Kita tandakan high dan low candle base. Kekuatan pergerakan meninggalkan zon itulah yang menjadikannya relevan.'),
        L('The zone is invalidated when price closes through the base. Repeated returns may weaken it.',
          'Zon itu terbatal apabila harga ditutup menembusi base. Kunjungan berulang mungkin melemahkannya.'),
        L('The misconception: any sideways area is a zone. Without a strong departure, there is no evidence of imbalance.',
          'Salah faham: mana-mana kawasan mendatar ialah zon. Tanpa pergerakan meninggalkan yang kuat, tiada bukti ketidakseimbangan.'),
        L('Supply and demand focuses on the whole base. An order block focuses on the last opposite candle before displacement. The two often overlap.',
          'Supply dan demand memberi tumpuan pada keseluruhan base. Order block memberi tumpuan pada candle bertentangan terakhir sebelum displacement. Kedua-duanya sering bertindih.')],
        [(5, 4494, 'disp'), (2, 4501), (2, 4490), (6, 4546, 'disp'), (4, 4499), (5, 4562)], 106, m_sd,
        [('Forms', 'base before strong departure', 'bull'), ('Mark', 'base candles high → low', 'gold'), ('Valid', 'until close through the base', 'gold'),
         ('Misconception', 'not every sideways area', 'bear'), ('Differs', 'whole base vs last candle', 'sub')])
    sc = [intro(NUM, TITLE, 'OB · FVG · BB · MB · RB · Supply & Demand',
                [('Explain why a POI is a location, not a signal', 'In this video you will learn why a POI is a location, not a signal,', 'Dalam video ini anda akan belajar kenapa POI ialah lokasi, bukan signal,'),
                 ('Define the six CMI POI types', 'define the six POI types used in CMI,', 'mentakrifkan enam jenis POI yang digunakan dalam CMI,'),
                 ('Mark and validate each zone', 'mark each zone and judge whether it is still valid,', 'menanda setiap zon dan menilai sama ada ia masih sah,'),
                 ('Avoid common POI misconceptions', 'and avoid the most common misconceptions.', 'dan mengelakkan salah faham yang paling biasa.')],
                ['This is Subtopic Four of Level 8: POI Selection. Part one: understanding the POI types.',
                 'Before we can select a POI, we must define each type precisely and consistently.'],
                ['Ini Subtopik Empat Level 8: POI Selection. Bahagian satu: memahami jenis-jenis POI.',
                 'Sebelum memilih POI, kita mesti mentakrifkan setiap jenis dengan tepat dan konsisten.'],
                art=tf_stack_art),
          s_what(), ob, fvg, bb, mb, rb, sd, s_compare(),
          statement('KEY TAKEAWAY', 'Six POI types. One rule.', 'A POI tells you where to look — not when to enter.',
                    [('There are six POI types, each formed in a different way.', 'Terdapat enam jenis POI, setiap satu terbentuk dengan cara berbeza.'),
                     ('But one rule applies to all of them: a POI tells you where to look, not when to enter.', 'Tetapi satu peraturan terpakai untuk semuanya: POI memberitahu di mana untuk melihat, bukan bila untuk masuk.')]),
          quiz([('Why is a POI not an automatic entry signal?', 'One. Why is a POI not an automatic entry signal?', 'Satu. Kenapa POI bukan signal entry automatik?'),
                ('What is the difference between a breaker and a mitigation block?', 'Two. What is the difference between a breaker block and a mitigation block in CMI?', 'Dua. Apakah perbezaan antara breaker block dan mitigation block dalam CMI?'),
                ('How do you mark a bullish FVG?', 'Three. How do you mark a bullish fair value gap?', 'Tiga. Bagaimana anda menanda bullish fair value gap?'),
                ('When is an order block invalidated?', 'Four. When is an order block invalidated under the CMI rule?', 'Empat. Bilakah order block terbatal mengikut peraturan CMI?')]),
          summary('POI types — what to remember', [
              ('POI = location for further analysis', 'A POI is a location for further analysis.', 'POI ialah lokasi untuk analisis lanjut.'),
              ('OB: last opposite candle before BOS displacement', 'Order block: the last opposite candle before displacement that breaks structure.', 'Order block: candle bertentangan terakhir sebelum displacement yang memecah struktur.'),
              ('FVG: 3-candle imbalance', 'Fair value gap: a three-candle imbalance.', 'Fair value gap: ketidakseimbangan tiga candle.'),
              ('BB: failed OB after sweep · MB: without sweep', 'Breaker: failed order block after a sweep. Mitigation: without a sweep.', 'Breaker: order block gagal selepas sweep. Mitigation: tanpa sweep.'),
              ('RB: wicks · S/D: base + strong departure', 'Rejection block from wicks; supply and demand from a base.', 'Rejection block daripada wick; supply dan demand daripada base.'),
              ('Invalid: body close beyond the far edge', 'And a zone is invalidated by a body close beyond its far edge.', 'Dan zon terbatal dengan penutupan body melepasi tepi jauhnya.')]),
          up_next(7, 'Professional POI Selection',
                  'In Video 7 we learn to evaluate, rank and select POIs with the CMI evaluation matrix.',
                  'Dalam Video 7 kita belajar menilai, menyusun keutamaan dan memilih POI dengan matriks penilaian CMI.',
                  [('HTF alignment', 'Context & location', 'gold'), ('Evaluation matrix', '10 criteria', 'purple'), ('Ranking & invalidation', 'POI A vs B vs C', 'bull')]),
          references([REF['ict'], REF['kd'], REF['wyckoff'], REF['murphy'], REF['cmi']],
                     'References are on screen. Order blocks, fair value gaps, breakers, mitigation and rejection blocks are ICT and SMC terms; supply and demand zones draw on classical support and resistance.',
                     'Rujukan dipaparkan di skrin. Order block, fair value gap, breaker, mitigation dan rejection block ialah istilah ICT dan SMC; zon supply dan demand berasaskan support dan resistance klasik.'),
          disclaimer('Seterusnya: Video 07 — Professional POI Selection')]
    return dict(id='ep06', file='CMI_L8_V06_Understanding_POI.mp4', meta=meta(NUM, TITLE), scenes=sc,
                objectives=['Explain why a POI is a location, not a signal', 'Define OB, FVG, BB, MB, RB and S/D (CMI operational)', 'Mark and validate each POI', 'Distinguish the POI types from each other', 'Avoid common POI misconceptions'],
                quiz=[('Why is a POI not an automatic entry?', 'It only identifies where a reaction may be worth studying. A setup additionally needs price at the POI, liquidity interaction, LTF structure shift, an execution zone and a pre-defined stop/target.'),
                      ('Breaker vs mitigation block (CMI)?', 'Both are failed OBs followed by MSS. Breaker: the prior extreme was swept (new high/low) before the failure. Mitigation: a failure swing, no new extreme.'),
                      ('How to mark a bullish FVG?', 'From the high of candle 1 to the low of candle 3, where C1 high < C3 low inside a bullish displacement.'),
                      ('When is an OB invalidated (CMI)?', 'When a candle body closes beyond the far edge of the zone (below the low of a bullish OB / above the high of a bearish OB).')],
                exercise='Exercise 4a — Identify POI types. On an FCPO 15M chart, find one example of each POI type (OB, FVG, BB, MB, RB, S/D). For each, write: formation evidence, zone boundaries, current status (fresh / tested / invalidated). Answer guide: OB and FVG must sit inside a displacement that broke structure; BB requires a prior sweep, MB requires a failure swing; RB must be at a swing extreme.',
                refs=[r[0] for r in (REF['ict'], REF['kd'], REF['wyckoff'], REF['murphy'], REF['cmi'])])
