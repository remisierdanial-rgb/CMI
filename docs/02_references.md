# References (episode-specific)

The rules below follow master prompt section 8. A reference is listed as *consulted* only if it was actually accessed during production. Standard texts listed as *background* are cited for established technical-analysis concepts. They were **not** re-read for this production, and no quotation from them is used.

## Consulted during production

- IANA Time Zone Database, accessed through Python `zoneinfo`: all DST dates and NY/Chicago/London → MYT conversions (EP04, EP05, EP08, EP12).
- Bursa Malaysia Derivatives FCPO booklet (Feb 2024), FCPO product page and Trading Session page, located through search result excerpts: FCPO hours and specifications (EP01, EP04, EP12, EP14).
- Secondary summaries of ICT Kill Zone times: LuxAlgo, Backtrex, TradingFinder (EP04). They were used only to document that definitions vary. They are not treated as primary ICT material.
- Straits Financial and Orient Futures summaries of DCE RBD palm olein (EP12). Mondo Visione notice of DCE contract amendments, 31 Mar 2026 (EP12): the reason DCE specs are marked RE-VERIFY.

## Background (not re-read; concept attribution only)

| # | Reference | Used for | Episodes |
|---|---|---|---|
| 1–7 | Michael J. Huddleston, *The Inner Circle Trader* educational materials (PO3, AMD, Kill Zones, Daily Bias, Draw on Liquidity, Judas Swing, SMT) | Attributing the terminology to ICT. CMI wording is used for definitions, not ICT quotations | EP01–EP14 |
| 8 | John J. Murphy, *Technical Analysis of the Financial Markets* | Trends, swing highs/lows, failed breakouts, oscillator divergence | EP02, EP08, EP10 |
| 9 | Martin J. Pring, *Technical Analysis Explained* | Momentum/oscillator divergence (contrast with SMT) | EP10 |
| 10 | Richard D. Wyckoff, *Studies in Tape Reading*, and the Wyckoff method literature | Accumulation/distribution schematics, Spring, Upthrust, effort vs result | EP01, EP03 |
| 11 | Larry Harris, *Trading and Exchanges* | Liquidity, participation, stop orders: why “manipulation” must not be inferred from a sweep | EP01, EP03, EP08 |
| 12 | IANA Time Zone Database | Time zones | EP04, EP05, EP08, EP12 |
| 13 | Official exchange trading-hour documentation (Bursa, DCE, CME) | Sessions | EP04, EP12, EP14 |
| 15 | Bursa Malaysia Derivatives — FCPO specifications | FCPO | EP01, EP04, EP12, EP14 |
| 16 | CME Group futures education | Futures mechanics, CBOT soybean oil | EP12, EP14 |
| 17 | Dalian Commodity Exchange contract rules | DCE palm olein / soybean oil | EP12, EP14 |

## Where sources disagree

- **Kill Zone boundaries** differ between ICT summaries. CMI fixes one schedule (see `01_technical_validation.md` §2) and names the variants on screen (EP04 S3).
- **SMT convention** (which instrument “leads”) varies. The CMI convention is stated on screen (EP10 S4).
- **“Distribution”** means expansion in PO3/AMD and a top in Wyckoff. This is explained in EP01 S5 and EP03 S8.
