# CMI – Smart Money Concept · Level 7: Advanced ICT Concepts

A motion-graphics video series (14 episodes) produced for Capital Market Institute (CMI). Its layout and theme follow the reference video *ILMU L1 EP03*:

- deep-navy background with gold accents
- Inter and JetBrains Mono typography
- header bar with a level badge and scene labels
- burned-in Bahasa Melayu subtitles
- gold progress bar
- English voice-over

## Original syllabus (order preserved)

| Subtopic | Episodes |
|---|---|
| 7.1 Power of Three (PO3) | 01 Understanding PO3 · 02 Bullish & Bearish PO3 Models |
| 7.2 Accumulation, Manipulation, Distribution (AMD) | 03 AMD |
| 7.3 Kill Zones | 04 Understanding ICT Kill Zones · 05 Kill Zones & Session Application |
| 7.4 Daily Bias | 06 Understanding Daily Bias · 07 Daily Bias & Draw on Liquidity |
| 7.5 Judas Swing | 08 Understanding Judas Swing · 09 Bullish & Bearish Judas Swing Models |
| 7.6 SMT Divergence | 10 Understanding SMT · 11 Bullish & Bearish SMT · 12 Advanced SMT & Limitations |
| Integration | 13 Integration of all Level 7 concepts · 14 FCPO Practical Case Studies |

## Deliverables

| Deliverable | Location |
|---|---|
| Rendered episodes (1080p30, H.264/AAC) | `renders/epXX.mp4` |
| Subtitles — Bahasa Melayu (burned in and as files) / English | `renders/epXX.ms.srt`, `renders/epXX.en.srt` |
| Narration scripts (EN + BM, per cue, with timings) | `docs/scripts/epXX.md` |
| Scene-by-scene storyboards | `docs/storyboards/epXX.md` |
| Content mapping (prompt section → scene) | `docs/00_content_mapping.md` |
| Technical validation (definitions, time zones, FCPO specs) | `docs/01_technical_validation.md` |
| Episode-specific references | `docs/02_references.md` |
| Final curriculum & terminology audit | `docs/03_final_audit.md` |
| Knowledge checks, answer explanations, Level 7 assessment | `docs/assessment.md` |
| Technical accuracy report (automated chart checks) | `docs/05_technical_accuracy_report.md` |

## How it is built

The series is generated from code, so the narration, subtitles, charts and docs all come from one source per episode.

- `episodes/epXX.js` holds the single source for each episode: scenes, on-screen components, chart data, English narration (`en`) and Bahasa Melayu subtitles (`ms`) for every cue, plus the quiz.
- `engine/dsl.js` generates deterministic OHLC candles (integer prices = FCPO tick of RM1).
- `engine/validate.js` checks every chart: OHLC integrity, gaps, sweeps, BOS/MSS, FVG, swings, EQH/EQL, and SMT relationships. **The build refuses to render if any check fails.**
- `engine/player.html|css|js` is a deterministic HTML/SVG renderer (`renderAt(t)`).
- `engine/build.js` runs the pipeline: TTS (edge-tts, cached) → timeline → subtitles (SRT) → audio track → Playwright frame capture → ffmpeg.
- `engine/docs.js` regenerates the scripts, storyboards, assessment and accuracy report from the specs.

```bash
node engine/check.js ep01 ep02 …     # validate charts only
node engine/build.js ep01 --stills   # one QA still per scene → build/ep01/stills
node engine/build.js ep01            # full render → renders/ep01.mp4
node engine/docs.js                  # regenerate docs
```

Requirements: Node 22, Playwright + Chromium, ffmpeg, Python `edge-tts`, and the fonts Inter and JetBrains Mono.
Environment options: `CMI_VOICE` (default `en-US-AndrewNeural`), `CMI_RATE` (default `-4%`), `CMI_TTS_PAR` (TTS parallelism).

## Important

All charts are **illustrative scenarios, not historical trading data**. The series is for education only; it is not financial advice and not a guarantee of profit. Futures trading involves risk of loss. Before publishing, re-verify the items marked RE-VERIFY in `docs/01_technical_validation.md` against official Bursa, DCE and CME documents.
