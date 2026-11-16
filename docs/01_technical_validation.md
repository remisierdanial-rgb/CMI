# Technical Validation — Definitions, Time, Instruments and Charts

This file records the definitions CMI uses in Level 7, the facts checked before production, where each fact came from, and what still needs checking against primary sources before the series is published. Items marked **RE-VERIFY** come from secondary sources or can change. Confirm them against the official source before each student intake.

## 1. Operational definitions (used consistently in all 14 episodes)

| Concept | CMI operational definition | Accuracy guard-rails shown on screen |
|---|---|---|
| **Power of Three (PO3)** | A conceptual price-delivery model for a period: a range near the **opening price** (accumulation), a move **against** the eventual direction (manipulation), then **directional expansion** (distribution). | Not every day follows PO3. A sweep does not prove manipulation. PO3 “distribution” is not Wyckoff Distribution. Popularised by ICT (Michael J. Huddleston); ICT did not invent accumulation or stop-run ideas. |
| **AMD** | Three phases of price behaviour **around a range**: a contained range, a sweep or false move beyond a boundary followed by a return, then displacement and expansion. | PO3 is anchored to the open; AMD is anchored to the range. “Manipulation” is an ICT label, not illegal manipulation. AMD is compared with Wyckoff in a mandatory table. |
| **Kill Zone** | An ICT time window, stated in **New York local time**, for monitoring price around sessions. | Not exchange hours. Not a guarantee of movement. One CMI schedule is used throughout; variants are named. |
| **Daily Bias** | A **working hypothesis** about the day’s direction, built from HTF structure, the Draw on Liquidity, location (premium/discount) and PD arrays, with **invalidation written beforehand**. | Neutral is a valid answer. Bias still needs lower-timeframe confirmation. |
| **Draw on Liquidity** | The liquidity pool judged most likely to be the next objective (PDH/PDL, PWH/PWL, EQH/EQL, old swings). | An analytical target, not a guaranteed destination. Price usually reaches it in steps, not a straight line. |
| **Judas Swing** | An ICT interpretation of an **initial counter-bias move early in a session**, measured from the NY midnight open or a session open, usually running liquidity, and confirmed later by displacement and structure. | Not every sweep or false breakout is a Judas Swing. Needs bias + timing + confirmation. For FCPO it is called “Judas-style” and must be tested. |
| **SMT Divergence** | A comparison of swing highs and lows between **related, synchronised instruments**. **CMI convention:** Instrument A makes the new extreme, Instrument B fails to confirm, and confirmation is looked for on A. | Not RSI/MACD divergence. Not a reversal signal. Correlation changes over time. CMI sets no universal numerical threshold. |

## 2. CMI Kill Zone reference schedule (New York local time)

| Window | NY time | MYT when NY is on EDT (+12 h) | MYT when NY is on EST (+13 h) |
|---|---|---|---|
| Asian Kill Zone | 20:00–00:00 | 08:00–12:00 (next day) | 09:00–13:00 (next day) |
| London Kill Zone | 02:00–05:00 | 14:00–17:00 | 15:00–18:00 |
| New York AM Kill Zone | 07:00–10:00 | 19:00–22:00 | 20:00–23:00 |
| New York Lunch | 12:00–13:00 | 00:00–01:00 (next day) | 01:00–02:00 (next day) |
| New York PM | 13:30–16:00 | 01:30–04:00 (next day) | 02:30–05:00 (next day) |
| NY midnight open (reference) | 00:00 | 12:00 | 13:00 |

**Sources and variants.** ICT teaching material and third-party summaries do not agree on exact boundaries. Variants shown on screen: London 01:00–05:00, NY AM 08:30–11:00, London Close 10:00–12:00 ([LuxAlgo Kill Zones](https://www.luxalgo.com/library/concept/killzones/), [Backtrex schedule](https://backtrex.com/en/blog/ict-kill-zone-times-sessions), [TradingFinder](https://tradingfinder.com/education/forex/ict-kill-zones)). The CMI schedule follows the most common reading. **RE-VERIFY** it against the ICT primary material CMI licenses or references. None of the sources above is Michael J. Huddleston’s own material.

## 3. Time-zone and DST facts (verified)

Verified with the **IANA Time Zone Database** through Python `zoneinfo` (`America/New_York`, `America/Chicago`, `Europe/London`, `Asia/Kuala_Lumpur`):

| Fact | Value |
|---|---|
| Malaysia Time | UTC+8 all year (no DST) |
| New York EST / EDT | UTC−5 / UTC−4 → MYT = NY + 13 h / + 12 h |
| US DST 2026 | Sun 8 March 2026 → Sun 1 November 2026 |
| US DST 2027 | Sun 14 March 2027 → Sun 7 November 2027 |
| UK BST 2026 | Sun 29 March → Sun 25 October 2026 (US/UK mismatch weeks: 8–28 Mar, 25–31 Oct) |
| Example | NY 02:00 on 15 Jan 2026 = 15:00 MYT; on 15 Jul 2026 = 14:00 MYT |
| Mismatch example | NY 02:00 on 10 Mar 2026 = 06:00 London (normally 07:00) |
| CBOT (Chicago) | DST on the same dates as New York (CST UTC−6 / CDT UTC−5) |

## 4. FCPO and comparator instruments

| Item | Value used | Source | Status |
|---|---|---|---|
| FCPO contract size | 25 metric tonnes | Bursa Malaysia Derivatives FCPO product information; broker summaries | Matches the prompt’s reference specs. **RE-VERIFY** each intake |
| FCPO tick | RM1/t = RM25 per contract | Bursa product information | **RE-VERIFY** |
| FCPO hours (MYT) | Mon–Fri 10:30–12:30, 14:30–18:00; T+1 Mon–Thu 21:00–23:30 | [Bursa FCPO booklet (Feb 2024)](https://www.bursamalaysia.com/sites/5d809dcf39fba22790cad230/assets/66b1a73ccd34aa39822c2114/20240220_FCPO_Booklet_A4_Lores_Final_draft.pdf); [Bursa FCPO page](https://www.bursamalaysia.com/trade/our_products_services/derivatives/commodity_derivatives/crude_palm_oil_futures); [Bursa trading sessions](https://www.bursamalaysia.com/trade/trading_resources/derivatives/trading_session) | Found through search results. The bursamalaysia.com host could not be fetched directly from the production environment. **RE-VERIFY** on the page |
| T+1 session booking | Trades are booked to the next trading day (“T+1”) | Bursa session naming | **RE-VERIFY** the exact wording in the Bursa circular |
| FCPO delivery | Physical; MSPO-certified palm oil | Broker summary of Bursa notes | **RE-VERIFY** |
| DCE RBD palm olein | 10 t per lot, CNY/t | [Straits Financial DCE specs](https://sg.straitsfinancial.com/?p=3218), [Orient Futures](https://www.orientfutures.com.sg/china-market-access/dce-internationalised-palm-olein-futures/) | DCE amended the contract rules on 31 Mar 2026, so tick size and hours must be **RE-VERIFIED** on dce.com.cn |
| DCE day/night hours | ≈ 09:00–11:30, 13:30–15:00; night ≈ 21:00–23:00 (Beijing = MYT) | Secondary sources | **RE-VERIFY** |
| CBOT soybean oil (ZL) | 60,000 lb; US cents/lb; Sun–Fri 19:00–07:45 CT and Mon–Fri 08:30–13:20 CT | CME Group contract specs (from training knowledge) | **RE-VERIFY** on cmegroup.com. MYT conversions above were computed with tzdb |

**Rules applied in production.**
- No historical FCPO, DCE or CBOT prices appear anywhere.
- Every chart is labelled *illustrative*.
- The FCPO–DCE SMT example (EP12 S7) carries the full label “ILLUSTRATIVE MARKET SCENARIO — NOT ACTUAL HISTORICAL TRADING DATA” and lists alternative explanations.
- No correlation figure is stated.

## 5. Chart accuracy controls

Every candle is generated as explicit OHLC data (`engine/dsl.js`). Every chart is checked by `engine/validate.js` before rendering, and the build stops if any check fails. The full log is in `docs/05_technical_accuracy_report.md`. The checks cover:

- **OHLC integrity:** High ≥ max(Open, Close) and Low ≤ min(Open, Close); bullish candles close above their open.
- **Continuity:** no unexplained gaps between consecutive candles, and every price is positive.
- **Sweeps:** each labelled sweep candle trades through its reference level.
- **Structure:** each BOS/MSS has a close beyond the referenced swing.
- **FVGs:** each FVG has a real gap between candle 1 and candle 3.
- **Swing points:** each labelled swing point is a local extreme within ±2 candles.
- **EQH/EQL:** only drawn where the levels match within one tick.
- **Ranges:** range boundaries contain every candle in the range.
- **SMT:** each pair shows the stated LL/HL or HH/LH relationship at the same candle index (same timestamp).
- **Higher timeframe:** the HTF candle in EP01 S10 is computed by aggregating the intraday data, so its OHLC exactly matches the LTF chart.
- **Session extremes:** London and NY extremes in EP04/EP05 are computed from the candles inside each window, not typed by hand.

A defect found during production and fixed before release: one AMD leg target was given as a relative value instead of an absolute price, which made prices fall toward zero. The validator now includes gap and positivity checks so this class of error is caught automatically.
