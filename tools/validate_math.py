"""Re-computes every numeric example used in Level 9 materials. Run: python3 -I tools/validate_math.py"""
PT = 25  # RM per 1-point move per FCPO contract (25 t x RM1/t) — verify with Bursa
ok = True
def chk(name, got, exp):
    global ok; g = round(got, 4); r = 'OK ' if abs(g - exp) < 1e-3 else 'FAIL'; ok &= r == 'OK '; print(f'[{r}] {name}: {g} (expected {exp})')
# RR core example
e, sl, tp = 4500, 4490, 4520
chk('risk pts', e - sl, 10); chk('reward pts', tp - e, 20); chk('RR', (tp - e) / (e - sl), 2)
chk('risk RM/contract', (e - sl) * PT, 250); chk('reward RM/contract', (tp - e) * PT, 500)
chk('notional @4500', 4500 * 25, 112500)
# break-even win rates
for rr, exp in [(1, 50), (2, 33.3333), (3, 25), (4, 20)]: chk(f'BE win rate 1:{rr}', 100 * 1 / (1 + rr), exp)
# expectancy
chk('expectancy R', .4 * 2 - .6 * 1, .2)
# position sizing
chk('contracts RM500/RM250', 500 // ((e - sl) * PT), 2)
# cost example (hypothetical 2-pt round-trip cost+slippage equivalent)
c = 2; nr, nw = (10 + c) * PT, (20 - c) * PT
chk('net risk RM', nr, 300); chk('net reward RM', nw, 450); chk('net RR', nw / nr, 1.5); chk('net BE win %', 100 * nr / (nr + nw), 40)
chk('contracts incl cost', 500 // nr, 1)
# intraday partial example: 2 contracts, entry 4512, SL 4494, TP1 4530, TP2 4560
e, sl, t1, t2 = 4512, 4494, 4530, 4560
risk = 2 * (e - sl) * PT; gain = ((t1 - e) + (t2 - e)) * PT
chk('intraday risk RM (2c)', risk, 900); chk('intraday gain RM', gain, 1650); chk('realised R', gain / risk, 1.8333)
chk('full-hold R', 2 * (t2 - e) * PT / risk, 2.6667)
# swing sizing: entry 4200 SL 4120 TP 4440; account 100k risk 1%
e, sl, tp = 4200, 4120, 4440
chk('swing risk RM/c', (e - sl) * PT, 2000); chk('swing RR', (tp - e) / (e - sl), 3); chk('contracts at RM1000', 1000 // ((e - sl) * PT), 0)
chk('contracts at RM4000', 4000 // ((e - sl) * PT), 2)
# EP01 stop distance bars
for pts, rm in [(10, 250), (18, 450), (80, 2000)]: chk(f'{pts} pts RM', pts * PT, rm)
# profit factor example: 10 trades 4W x 2R, 6L x 1R
chk('profit factor', (4 * 2) / (6 * 1), 1.3333)
print('ALL OK' if ok else 'SOME FAILED')
