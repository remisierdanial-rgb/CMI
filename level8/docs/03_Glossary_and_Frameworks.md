# CMI SMC Level 8 — Master Glossary, Frameworks & Checklists

## A. Master terminology glossary (CMI operational definitions)

| Term | Definition (CMI) | BM ringkas |
|---|---|---|
| Timeframe | Time represented by one candle | Tempoh masa setiap candle |
| HTF / MTF / LTF | Weekly–Daily / 4H–1H–30M / 15M–5M (suggested for FCPO, not universal) | Lapisan timeframe |
| HTF Bias | Direction with stronger HTF evidence; a working hypothesis with an invalidation | Hipotesis arah |
| Dealing range | Range between the significant swing low and high framing price | Julat urus niaga |
| Equilibrium (EQ) | 50% of the dealing range | Titik tengah |
| Premium / Discount | Above / below EQ — location context, not a signal | Lokasi mahal / murah |
| BOS | Body close beyond latest swing in direction of structure | Kesinambungan |
| CHoCH | First body close beyond opposing swing, against structure | Amaran awal |
| MSS | CHoCH with displacement, usually after a sweep | Bukti peralihan lebih kukuh |
| Internal / external structure | Swings inside the range / the range-defining swings | Struktur dalaman / luaran |
| Displacement | Strong directional expansion that breaks meaningful structure, usually leaving an FVG | Pergerakan kuat |
| Market liquidity | Ability to trade size quickly at low cost (microstructure) | Kecairan pasaran |
| BSL / SSL | Inferred resting orders above highs / below lows | Liquidity beli / jual |
| EQH / EQL | Highs / lows at nearly the same price | High / low sama |
| PDH/PDL · PWH/PWL · PMH/PML | Previous day / week / month high & low | Paras rujukan |
| ERL / IRL | Liquidity beyond / inside the dealing range | Liquidity luar / dalam |
| Liquidity sweep | Trade beyond a level, close back inside, opposite displacement | Sapuan |
| Breakout (genuine) | Close beyond + retest holds (acceptance) + continuation | Penembusan |
| Draw on liquidity | Pool price may aim for given the bias — planning reference, not prediction | Sasaran berpotensi |
| POI | Location for further analysis, not an entry signal | Lokasi menarik |
| OB | Last opposite candle before BOS displacement | Order block |
| FVG | 3-candle imbalance | Jurang nilai saksama |
| Breaker Block | Failed OB after a sweep + MSS | Blok gagal (selepas sweep) |
| Mitigation Block | Failed OB at a failure swing (no new extreme) + MSS | Blok gagal (tanpa sweep) |
| Rejection Block | Wick cluster at a swing extreme | Blok wick |
| Supply / Demand | Base before strong departure | Zon bekalan / permintaan |
| Fresh / Tested / Invalidated | Not revisited / revisited / body close beyond far edge | Status zon |
| Entry models | Aggressive (POI limit) · Confirmation (after MSS) · Retracement (FVG revisit) | Model entry |
| Structural stop | Stop beyond the level whose violation invalidates the idea | Stop berstruktur |
| R:R | Reward ÷ risk | Nisbah risiko-ganjaran |

## B. CMI Multi-Timeframe Analysis Framework

```
WEEKLY / DAILY
   ↓  Higher Timeframe Bias
4H / 1H / 30M
   ↓  Top-Down Analysis and POI Selection
   ↓  Multi-Timeframe Liquidity Mapping
15M
   ↓  Liquidity Interaction and Structure Confirmation
5M
   ↓  Entry Timeframe Alignment
   ↓  Entry Planning, Stop-Loss, Target and Risk Management
```

## C. Bullish / Bearish workflow
| Step | Bullish | Bearish |
|---|---|---|
| 1 HTF | HH/HL, BOS up, price in discount, BSL above | LH/LL, BOS down, price in premium, SSL below |
| 2 MTF POI | Bullish OB/FVG at origin of BOS displacement | Bearish OB/FVG at origin |
| 3 Liquidity | SSL just above POI | BSL just below POI |
| 4 15M | Sweep of SSL into POI → bullish MSS | Sweep of BSL into POI → bearish MSS |
| 5 5M | Bullish FVG → retracement long | Bearish FVG → retracement short |
| 6 Risk | SL below sweep low, TP at opposing BSL | SL above sweep high, TP at opposing SSL |
| Invalid | Acceptance below POI | Acceptance above POI |

## D. POI Evaluation Matrix (illustrative CMI training framework — requires testing)
| # | Criterion | Question |
|---|---|---|
| 1 | HTF alignment | Agrees with HTF bias and range? |
| 2 | Market structure | Caused a BOS / MSS? |
| 3 | Premium / Discount | Discount for longs, premium for shorts? |
| 4 | Liquidity relationship | Liquidity nearby to be swept first? |
| 5 | Displacement quality | Genuine displacement away from it? |
| 6 | POI clarity | Clear, objective boundaries? |
| 7 | Freshness | Fresh / tested once / repeatedly tested? |
| 8 | Distance to target | Room to opposing liquidity? |
| 9 | Stop feasibility | Logical stop beyond it? |
| 10 | Risk-to-reward | Meets the tested plan minimum? |

No score guarantees a profitable trade.

## E. Multi-timeframe liquidity mapping example (V05)
1 HTF ERL 4,705 / 4,440 · 2 PDH 4,596 / PDL 4,553 · 3 Session low 4,479 · 4 IRL: 1H LH 4,596, 1H FVG 4,455–4,471 · 5 Nearest: session low / PDL / 1H LH · 6 Scenario A (sweep SSL into POI → BSL) / Scenario B (acceptance below POI) · 7 Monitor reaction on 15M/5M.

## F. Entry Alignment Checklist (any NO = no trade)
1. HTF bias clear and not invalidated 2. Price at the selected, ranked MTF POI 3. POI in the correct half of the HTF range 4. Liquidity swept into/near the POI 5. LTF MSS at the POI with displacement 6. Execution zone valid for the chosen model 7. Structural stop 8. Target = opposing liquidity with room 9. R:R meets plan minimum 10. RM risk within per-trade limit (points × RM25 × contracts — verify tick value with Bursa) 11. No no-trade condition present.

## G. FCPO case studies
See V04 (bull/bear demos), V08 (4H POI ≈ 4,460–4,480 bullish + bearish), V09 (Case 1 bullish, Case 2 bearish, Case 3 no-trade). Levels are tabulated in `02_Technical_Validation_Report.md` §4.
