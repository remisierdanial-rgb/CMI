# CMI · SMC Level 10 — Programme Deliverables

Professional Application · 16 videos · six subtopics in the original order.

## 1. Episode roadmap

| # | Title | Subtopic | Length | File |
|---|---|---|---|---|
| 01 | Introduction to Professional Application | Overview | 10:44 | `output/ep01.mp4` |
| 02 | Wyckoff Method: Foundations and Market Cycle | 1 SMC + Wyckoff | 8:36 | `output/ep02.mp4` |
| 03 | Wyckoff Accumulation and Distribution | 1 SMC + Wyckoff | 11:39 | `output/ep03.mp4` |
| 04 | SMC + Wyckoff Integration | 1 SMC + Wyckoff | 9:56 | `output/ep04.mp4` |
| 05 | VPA: Price, Volume and Spread | 2 SMC + VPA | 9:43 | `output/ep05.mp4` |
| 06 | Advanced VPA Concepts and SMC Integration | 2 SMC + VPA | 8:33 | `output/ep06.mp4` |
| 07 | Order Flow: Market Microstructure | 3 SMC + Order Flow | 10:10 | `output/ep07.mp4` |
| 08 | Advanced Order Flow | 3 SMC + Order Flow | 9:54 | `output/ep08.mp4` |
| 09 | SMC + Order Flow Integration | 3 SMC + Order Flow | 5:52 | `output/ep09.mp4` |
| 10 | Volume Profile Foundations | 4 SMC + Volume Profile | 8:38 | `output/ep10.mp4` |
| 11 | Advanced Volume Profile and SMC Integration | 4 SMC + Volume Profile | 7:56 | `output/ep11.mp4` |
| 12 | FCPO Professional Case Studies | 5 FCPO Case Studies | 11:59 | `output/ep12.mp4` |
| 13 | Backtesting Foundations and Strategy Rules | 6 Backtesting | 9:04 | `output/ep13.mp4` |
| 14 | Backtesting Performance Metrics | 6 Backtesting | 8:34 | `output/ep14.mp4` |
| 15 | Advanced Performance Evaluation | 6 Backtesting | 10:43 | `output/ep15.mp4` |
| 16 | CMI Professional Application Masterclass | Integration (§5) | 9:13 | `output/ep16.mp4` |

Per-episode deliverables (title, objectives, full narration, scene-by-scene storyboard, motion and chart instructions, on-screen terminology, examples, knowledge checks, exercises, disclaimers) are in `docs/storyboards/epXX.md`, generated from the production scripts in `episodes/epXX.js`. References per episode are listed in §12 below.

## 2. Master terminology glossary

| Term | Definition used in this programme |
|---|---|
| Absorption | Heavy one-sided aggression with limited price progress; an **interpretation**, confirmed only by subsequent behaviour. |
| Acceptance | Price holding outside (or inside) a value area for **several bars** and building volume there. |
| AR | Automatic Rally (accumulation) / Automatic Reaction (distribution): the move that defines the opposite range boundary after a climax. |
| Ask / Bid | Lowest price sellers are offering / highest price buyers are bidding. |
| Aggressive order | An order that crosses the spread and executes immediately (market or marketable limit). |
| BC / SC | Buying Climax / Selling Climax: wide-spread, high-volume bar ending an extended move; supported only by what follows. |
| BOS / CHoCH / MSS | Break of Structure / Change of Character / Market Structure Shift (SMC, from earlier levels): closes beyond defined swing points. |
| BSL / SSL | Buy-side / sell-side liquidity: levels above highs / below lows where stops may rest. |
| CVD | Cumulative Volume Delta: running total of Delta from a stated start point. |
| Delta | Ask (buyer-initiated) volume − bid (seller-initiated) volume, per the provider's classification. |
| DOM | Depth of Market: visible resting limit orders at each price; displayed ≠ executed. |
| Effort vs Result | Comparison of volume (effort) with price movement/spread (result). |
| Expectancy | (Win rate × average win) − (loss rate × average loss). |
| Footprint | Chart showing bid × ask executed volume at each price inside each bar. |
| FVG | Fair Value Gap: three-candle gap between candle 1 and candle 3 (SMC). |
| HVN / LVN | High / Low Volume Node: price regions with high / low traded volume in a profile. |
| Imbalance (diagonal) | Ask at P ≥ ratio × bid at P−1 tick (ask imbalance); bid at P ≥ ratio × ask at P+1 tick (bid imbalance). Settings vary. |
| Look-ahead bias | Using information in a historical decision that was not available at that time. |
| LPS / LPSY | Last Point of Support / Supply: pullback/rally after SOS/SOW. Not automatically an OB. |
| Maximum drawdown | Largest peak-to-trough decline of the equity curve. |
| Open Interest | Contracts outstanding; changes only when positions are opened or closed on net. |
| Overfitting | Fitting rules to noise in past data. |
| PF | Profit factor: gross profit ÷ gross loss. |
| POC | Point of Control: highest-volume price row in the selected profile. |
| PS / PSY | Preliminary Support / Preliminary Supply. |
| Rejection | Price leaving value and failing to hold there, returning inside — judged over several bars. |
| Spring / UT / UTAD | Wyckoff tests below support / above resistance within a range context (UTAD in Phase C). |
| SOS / SOW | Sign of Strength / Weakness: Wyckoff events judged with spread and volume. |
| Spread (VPA) | Bar range: high − low. (Different from bid-ask spread.) |
| ST | Secondary Test: revisit of the climax area. |
| Stacked imbalance | Imbalances at consecutive prices; the count required is a setting. |
| TPO | Time Price Opportunity (Market Profile): one unit per period that traded at a price; counts time, not volume. |
| VAH / VAL | Value Area High / Low: bounds of ~70% of profile volume (convention). |
| Walk-forward | Repeated train-then-test on rolling windows. |

## 3. Wyckoff versus SMC comparison matrix

| Wyckoff | Related SMC | Important distinction |
|---|---|---|
| Trading range | Dealing range | Range defined by climax/AR/ST vs by swing high/low |
| Spring | Liquidity sweep | Spring requires Wyckoff range context; sweep does not |
| Upthrust / UTAD | BSL sweep / failed breakout | Not automatically equivalent |
| SOS | Bullish strength / possible BOS | SOS judged by spread & volume; BOS by close beyond swing |
| SOW | Bearish weakness / possible BOS | Same as above |
| LPS | Potential bullish POI | Not automatically an Order Block |
| LPSY | Potential bearish POI | Not automatically an Order Block or Breaker |
| Cause & effect (P&F) | Opposing liquidity targets | Estimates, not guarantees |

## 4. VPA interpretation framework

1. Record **observations**: direction, spread (pts), close location (upper/middle/lower third), relative volume vs a stated look-back in the same session and contract month.
2. Classify effort vs result: high/low volume × large/limited progress.
3. Read **location**: range edge, POI, mid-trend, after news.
4. State one **possible** interpretation and one alternative.
5. State what the next bars must do to support it (retest holds, CHoCH, failure to exceed extreme).
6. Never infer buyer/seller identity from volume.

## 5. Order Flow terminology guide

Bid/ask, quantities, spread · market, limit, marketable limit orders · aggressive vs passive · liquidity provision vs consumption · trade classification (quote rule, tick rule, Lee–Ready, exchange aggressor flag) · Delta, Delta by bar, CVD and its start point · footprint, bar POC, diagonal/horizontal imbalance, ratio and minimum-volume filters, stacked imbalance · absorption · DOM, displayed vs executed, cancellations, hidden quantity · Time & Sales prints and unclassified prints. **Before use, record: data source, classification method, imbalance settings, CVD reset, contract month.**

## 6. Volume Profile reference guide

| Profile type | Range | Use | Limitation |
|---|---|---|---|
| Session | Each session | Prior-session POC/VA | Session template must match FCPO hours |
| Fixed range | Trader-selected bars | A swing or range | Subjective endpoints |
| Visible range | On-screen bars | Overview | Changes with zoom |
| Periodic | Day/week/month | Comparable profiles | Boundaries may split structure |
| Composite | Many sessions | Longer-term value | Older volume may matter less |

Always state: data (tick vs bar approximation), row size, value-area method (one-row/two-row, volume/TPO), percentage, range.

## 7. Integrated FCPO analysis workflow (12 stages)

Market context → HTF structure → Wyckoff phase → liquidity mapping → VPA observation → Volume Profile mapping → POI selection → Order Flow confirmation (only with suitable data) → entry planning → stop-loss & take-profit → position sizing (risk ÷ (stop ticks × RM25)) → post-trade review.

## 8. FCPO case-study collection (all hypothetical/simulated)

| Case | Type | Key levels | Planned RR |
|---|---|---|---|
| 1 | Bullish reversal (accumulation, Spring/SSL sweep) | Sweep 4,038 · entry 4,151 · stop 4,119 · target 4,232 | ≈ 2.5 |
| 2 | Bearish reversal (distribution, UTAD/BSL sweep) | Sweep 4,272 · entry 4,157 · stop 4,182 · target 4,085 | ≈ 2.9 |
| 3 | Bullish continuation (re-accumulation) | Sweep 4,049 · entry 4,084 · stop 4,070 · target 4,120 | ≈ 2.6 |
| 4 | Bearish continuation (re-distribution) | Sweep 4,071 · entry 4,036 · stop 4,050 · target 4,000 | ≈ 2.6 |
| 5 | High volume, limited progress | +2 pts over 4 bars at ~3× volume; CHoCH close 4,138 | — |
| 6 | Conflicting signals | Profile POC 6 ticks above entry | No trade / reduced size per plan |
| 7 | No trade | RR 0.67 < 2.0 minimum | No trade |

Reporting format (17 fields) — V12 S13. Field 15 "actual result" is filled only with verified historical data.

## 9. Backtesting SOP

1. Write the nine-part rule set (context, bias, POI, liquidity condition, confirmation, stop, target, size, exit). Pass the two-person test.
2. Document data: contract handling, roll rule and adjustment, session template, timeframe, vendor, time zone, timestamp convention.
3. Split data: in-sample (development) / out-of-sample (held back). Record the number of variations tried.
4. Test bar-by-bar or by replay; log every signal **before** revealing the next bar; take every valid signal.
5. Use only confirmable swings and non-repainting values.
6. Apply costs (current, dated broker and exchange schedules), spread, slippage on stops, conservative limit fills (trade-through), gaps and price limits.
7. Compute metrics (§10), by regime.
8. Run the final rules once on out-of-sample data; walk-forward if parameters are optimised; run robustness checks.
9. Forward test / paper trade with small size; journal; compare with backtest.
10. Decide: accept, revise (new hypothesis → new out-of-sample test) or reject. Record the reasons.

## 10. Performance evaluation framework

Win rate = wins ÷ total · Average win = gross profit ÷ wins · Average loss = |gross loss| ÷ losses · Realised RR = avg win ÷ avg loss (vs planned) · Profit factor = gross profit ÷ gross loss · Expectancy = WR × avg win − LR × avg loss · Max drawdown = largest peak-to-trough · % drawdown = DD ÷ peak equity · Sharpe = (mean − rf) ÷ SD with stated frequency and annualisation · Standard error = SD ÷ √n (approximate CI ±1.96 SE). Always report: n, before/after costs, regime breakdown, streaks, number of variations tested.

## 11. Strategy evaluation dashboard (specification)

Tiles: total trades · win rate · average win · average loss · average RR · profit factor · expectancy · maximum drawdown · equity curve · total costs · net P&L · consecutive wins · consecutive losses · performance by regime. Header must state "HYPOTHETICAL / SIMULATED" unless built from verified live or backtest records, with data and cost sources. Implemented in V16 S8.

## 12. References (verified titles and authors; links to be confirmed by CMI before publication)

**Wyckoff:** R. D. Wyckoff — original course and writings (1930s) · StockCharts ChartSchool, "The Wyckoff Method: A Tutorial" (https://chartschool.stockcharts.com) — V02–V04.
**VPA:** A. Coulling, *A Complete Guide to Volume Price Analysis* (2013) · A. Coulling, *Finding a Set Up with Volume Price Analysis* · T. Williams, *Master the Markets* (Volume Spread Analysis) — V05–V06.
**Order Flow / microstructure:** L. Harris, *Trading and Exchanges: Market Microstructure for Practitioners* (Oxford University Press, 2003) · C. M. C. Lee & M. J. Ready, "Inferring Trade Direction from Intraday Data", *Journal of Finance* 46(2), 1991 · CME Group education (https://www.cmegroup.com/education) · TradingView Help Center — Volume Footprint — V07–V09.
**Volume Profile:** TradingView Help Center — Volume Profile basic concepts; Session, Fixed Range and Periodic Volume Profile · CME Group education — V10–V11.
**Backtesting:** D. H. Bailey, J. M. Borwein, M. López de Prado & Q. J. Zhu, "Pseudo-Mathematics and Financial Charlatanism", *Notices of the AMS* 61(5), 2014, and "The Probability of Backtest Overfitting", *Journal of Computational Finance*, 2017 · C. R. Harvey & Y. Liu, "Backtesting", *Journal of Portfolio Management* 42(1), 2015 — V13–V15.
**FCPO:** Bursa Malaysia Derivatives — Crude Palm Oil Futures contract specifications (https://www.bursamalaysia.com) · Malaysian Palm Oil Board statistics (https://www.mpob.gov.my) — V01, V12. **Not accessible from the production environment; verify before publishing.**

Date of preparation: 18 November 2026. URLs point to publisher home pages; confirm the exact page for each item before distribution.
