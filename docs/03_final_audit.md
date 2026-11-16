# Final Content & Accuracy Audit — Level 7

## A. Original subtopic checklist

| Check | 7.1 PO3 | 7.2 AMD | 7.3 Kill Zones | 7.4 Daily Bias | 7.5 Judas Swing | 7.6 SMT |
|---|---|---|---|---|---|---|
| Kept in the original order | ✅ EP01–02 | ✅ EP03 | ✅ EP04–05 | ✅ EP06–07 | ✅ EP08–09 | ✅ EP10–12 |
| Definition explained | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Identification criteria demonstrated | ✅ | ✅ | ✅ | ✅ checklist | ✅ | ✅ 8 steps |
| Bullish and bearish examples | ✅ | ✅ | ✅ London bull/bear | ✅ | ✅ | ✅ |
| Time calculations correct (tzdb) | n/a | n/a | ✅ | ✅ | ✅ | ✅ |
| Instrument comparisons valid | n/a | n/a | n/a | n/a | n/a | ✅ related, synchronised, illustrative |
| FCPO application | ✅ open convention | ✅ via EP14 | ✅ | ✅ via EP14 | ✅ “Judas-style”, tested | ✅ EP12 |
| Common mistakes | ✅ 8 | ✅ 7 | ✅ 8 | ✅ 8 | ✅ 7 | ✅ 9 |
| Failed / no-trade cases | ✅ 5 | ✅ | ✅ 5 | ✅ | ✅ 5 + 5 | ✅ |
| References | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Narration complete (EN VO + BM subtitles) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Charts validated automatically | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Knowledge check (5 + 2 + 1) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

EP13 (Integration) and EP14 (FCPO case studies) also contain full knowledge checks. The Level 7 comprehensive assessment (20 competencies, with model answers) is in `assessment.md`.

## B. Terminology audit

| Rule | Result | Evidence |
|---|---|---|
| PO3 is not confused with Wyckoff | ✅ | EP01 S5, EP03 S8–S9 |
| AMD is not presented as proven institutional manipulation | ✅ | EP03 S4: the ICT label is shown on screen as “not illegal or coordinated manipulation” |
| Kill Zones are not presented as exchange hours | ✅ | EP04 S2, S10; EP14 S7 |
| EST/EDT converted correctly | ✅ | tzdb-verified tables in EP04 S5–S7 and EP08 S5 |
| Daily Bias is not presented as a forecast | ✅ | EP06 S2, S9, S11 |
| Judas Swing is not confused with every sweep | ✅ | EP08 S7 (mandatory comparison), S8, S9; EP09 S5–S7 |
| SMT is not confused with oscillator divergence | ✅ | EP10 S2, S9 |
| SMT uses related, synchronised instruments | ✅ | Same candle index = same timestamp; vertical swing markers; EP12 S3 |
| FCPO sessions are not confused with forex sessions | ✅ | EP04 S10–S11; EP14 S7 |
| No unsupported correlation claims | ✅ | No correlation figure is stated; EP12 S6 rule; EP13 S3 says “SMT not evaluated — no verified pair” |
| No fabricated historical data | ✅ | Every chart is labelled illustrative; there are no real prices or dates on any chart |
| No entries, stops, targets or profit claims | ✅ | Case cards give invalidation as an analytical condition only |

## C. Known limitations and items to complete before publishing

1. **Primary-source re-verification.** These items come from Bursa/DCE/CME pages that could not be opened directly in the production environment (`01_technical_validation.md` §4):
   - FCPO hours and specs
   - the T+1 booking wording
   - DCE contract rules (amended on 31 Mar 2026)
   - CBOT soybean oil hours

   The ICT Kill Zone boundaries should be confirmed against the ICT material CMI uses.
2. **Original Level 7 notes.** The notes were not attached. Compare them with `00_content_mapping.md` and add any missing points.
3. **Narration language.** Following the reference video, the voice-over is English (neural TTS, `en-US-AndrewNeural`) and the on-screen subtitles are Bahasa Melayu. A Bahasa Melayu voice-over can be produced from the same specs by switching voice (e.g. `ms-MY-OsmanNeural`) and narrating the `ms` field.
4. **Real FCPO data.** If CMI provides licensed historical FCPO, DCE or CBOT data, the case studies in EP14 and EP12 can be rebuilt on that data. The same validator will apply, and the “illustrative” labels must then be replaced with the data source and dates.
5. **Human review.** A CMI subject-matter reviewer should review every script (`docs/scripts/`) before public release, especially the Bahasa Melayu phrasing of technical terms.
