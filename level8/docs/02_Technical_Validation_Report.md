# Phase 2 / Phase 5 · Technical Validation & Final Accuracy Report

## 1. Items that MUST be verified by CMI before publishing

| Item | Status in this production | Action |
|---|---|---|
| FCPO contract specs (25 MT, RM1/MT = RM25/tick) | Used as the **CMI reference** stated in the brief. `bursamalaysia.com` was not reachable from the production environment, so it could **not** be re-verified. | Verify on Bursa's official FCPO page. If changed, edit `RM25` references in V01 s11, V04 s8, V08, V09, V10 s5. |
| FCPO trading sessions (morning, afternoon, T+1 night) | Narrated generically ("verify before use"); no clock times shown on screen. | Verify current session times and holidays; optionally add to V01 s11. |
| CMI operational definitions of CHoCH / MSS / Breaker / Mitigation | Defined as below (§2). The original Level 1–7 notes were **not attached**, so consistency with earlier levels could not be cross-checked. | Compare §2 with Level 2–7 notes. If different, edit V02 s3 and V06 s5–6, s9. |
| Original Level 8 notes | Not attached; mapping built from the master prompt. | Re-run `01_Content_Mapping.md` against the notes. |

## 2. Operational definitions used (consistent across all 10 videos)

- **BOS** — candle *body* close beyond the latest swing in the direction of existing structure → continuation.
- **CHoCH** — first body close beyond the opposing swing, against existing structure → early warning only.
- **MSS** — CHoCH delivered with displacement, typically after a liquidity sweep → stronger evidence, not a guarantee. (Disclosed: educators define CHoCH/MSS differently.)
- **BSL / SSL** — *inferred* resting buy-stops/breakout orders above highs / sell-stops below lows. Never presented as observed.
- **ERL / IRL** — liquidity beyond / inside the current dealing range; FVG as IRL is flagged as an ICT framework usage. ERL→IRL→ERL presented as "framework, not rule".
- **OB** — last opposite-close candle before displacement that breaks structure; zone = candle high–low.
- **FVG** — 3-candle gap (C1 high < C3 low bullish); zone C1 extreme → C3 extreme.
- **Breaker** — failed OB **after a sweep** (new extreme) + MSS. **Mitigation block** — failed OB at a failure swing (**no new extreme**) + MSS. (Disclosed: usage varies.)
- **Rejection block** — wick cluster at a swing extreme; zone body edge → wick extreme.
- **Supply/Demand** — base before strong departure.
- **POI invalidation (CMI)** — candle *body* close beyond the far edge (acceptance).

## 3. Misinformation-prevention checks (§8)

| Rule | How it is enforced |
|---|---|
| No "every sweep = manipulation", "every OB holds", "every FVG fills", "every MSS reverses", "every level targeted" | Explicitly negated in V03 s7, V05 s10, V06 (FVG/OB scenes), V07 s9, V08 s16. |
| SMC ≠ institutional fact | V01 s6 dedicated scene; repeated in V05 s2, V06 OB, V07 s3, V08 s5. |
| MTF limitations | V01 s7 (all 7 items from §8C). |
| No universal scoring | V07 s5 on-screen label "ILLUSTRATIVE CMI TRAINING FRAMEWORK · REQUIRES TESTING". |
| No look-ahead bias | Candles revealed left→right; **Decision Point** overlays hide the future until the plan is narrated (V02, V03, V04, V07, V08, V09). Price axes are fitted only to visible candles (`fit_n` / `refit`), so the scale never leaks future highs/lows. Daily chart in V04 shows *today's candle still forming*. |
| Valid OHLC | `Series.add()` forces H ≥ max(O,C), L ≤ min(O,C); `validate()` asserts on every generated/aggregated series. |
| Annotations match candles | Every swing label, BOS/MSS line, OB/FVG zone, sweep, entry/SL/TP is **computed from the generated candles** (`hi/lo`, `first_close_beyond`, `fvgs`, `last_opposite`), never typed in by hand. |
| Same move on different TFs | 15M/1H/4H/Daily tails are produced by **aggregating** the 5M series (`agg`), so all timeframes are mathematically consistent (V01 s2, V04 s9, V10 s3). |
| Hypothetical prices | Every chart header reads "HYPOTHETICAL"; narration repeats it; disclaimer in every video. |
| Entry fills | Retracement entries were checked to be actually filled by the data; stops are beyond sweep extremes and not hit in "successful" cases; V09 Case 3 shows a non-confirmed, invalidated setup. |

## 4. Verified example numbers (from the generated data)

| Example | POI | Sweep | Entry | SL | TP | Risk | R:R |
|---|---|---|---|---|---|---|---|
| V04 bullish (1H POI) | 4,447–4,471 | 4,456 | 4,499 | 4,452 | 4,596 | 47 pts ≈ RM1,175 | ≈1:2.1 |
| V04 bearish | 4,630–4,653 | 4,644 | 4,588 | 4,648 | 4,504 | 60 pts | ≈1:1.4 |
| V08 bullish (4H POI ≈ 4,460–4,480) | 4,459–4,483 | 4,468 | 4,511 | 4,464 | 4,608 | 47 pts ≈ RM1,175 | ≈1:2.1 |
| V08 bearish | 4,599–4,623 | 4,614 | 4,558 | 4,618 | 4,474 | 60 pts | ≈1:1.4 |
| V09 Case 1 | 4,267–4,291 | 4,276 | 4,332 | 4,272 | 4,416 | 60 pts | ≈1:1.4 |
| V09 Case 2 | 4,689–4,713 | 4,704 | 4,661 | 4,708 | 4,564 | 47 pts | ≈1:2.1 |
| V09 Case 3 | 4,387–4,411 | 4,396 | — no trade (close below POI) | | | | |

## 5. References — verification notes
All titles/authors listed are real, widely available works. Page/chapter numbers were **not** cited because they could not be checked in this environment; no quotations are attributed. ICT materials are cited as the origin of terminology only, flagged "interpretive". No URLs other than official domains (bursamalaysia.com, cmegroup.com/education, mpob.gov.my) are given.

## 6. Production note — audio
Narration is English voice-over (neural TTS, voice `en-US-BrianNeural`) with **Malay subtitles burned in**, matching the reference episode (ILMU L1 EP03). The full English + Malay script for each video is in `docs/episodes/`. A professional voice-over can replace the TTS track without re-animating, because every animation is keyed to the script line timings.
