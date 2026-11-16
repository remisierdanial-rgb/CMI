# CMI — Smart Money Concept · Level 8: Multi-Timeframe Analysis

Professional motion-graphics video series for Capital Market Institute (CMI), built to match the layout and theme of the reference episode *ILMU L1 EP03*: dark-navy canvas, gold accent, Inter / JetBrains Mono typography, rounded chart panels, header with level badge + scene label, **English voice-over with burned-in Bahasa Melayu subtitles**, gold progress bar.

## Videos (`level8/output/`)
| # | Title | Subtopic |
|---|---|---|
| 01 | Introduction to Multi-Timeframe Analysis | Overview |
| 02 | Understanding Higher Timeframe Bias | 1 |
| 03 | HTF Liquidity & Directional Objectives | 1 |
| 04 | Professional Top-Down Analysis | 2 |
| 05 | Multi-Timeframe Liquidity | 3 |
| 06 | Understanding POI | 4 |
| 07 | Professional POI Selection | 4 |
| 08 | Entry Timeframe Alignment | 5 |
| 09 | Complete FCPO Case Studies | Integration |
| 10 | Integrated CMI Multi-Timeframe SOP | Integration |

## Documents (`level8/docs/`)
- `01_Content_Mapping.md` — Phase 1 mapping of every required point to a video/scene.
- `02_Technical_Validation_Report.md` — definitions, misinformation checks, verified example numbers, **items CMI must verify before publishing** (Bursa FCPO specs/hours, consistency with Level 1–7 notes).
- `03_Glossary_and_Frameworks.md` — glossary, framework, bull/bear workflow, POI matrix, liquidity map, entry checklist.
- `episodes/epXX.md` — per-video learning objectives, scene-by-scene storyboard (visual direction), full narration (EN) + subtitles (BM) with timecodes, knowledge check with answers, exercise, references. Generated from the same source code that renders the video, so script and animation never drift apart.

## Rebuild
```bash
pip install pycairo edge-tts numpy
python -m level8.engine.render ep04            # render one video
python -m level8.engine.render ep04 --preview  # PNG stills per narration line
```
Engine: `level8/engine/` (Cairo renderer, OHLC-valid synthetic data, annotations computed from candles, no-look-ahead axis fitting). Episodes: `level8/episodes/`.

All FCPO prices are hypothetical teaching illustrations. Education only — not financial advice.
