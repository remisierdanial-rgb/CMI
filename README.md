# CMI · Smart Money Concept · Level 10 — Professional Application

Sixteen motion-graphics lesson videos (≈ 2.5 hours) covering the six Level 10 subtopics in their original order, plus a masterclass. Visual layout and theme follow the ILMU Level 1 reference videos: English narration with burned-in Bahasa Melayu subtitles.

| Folder | Contents |
|---|---|
| `output/` | Final videos `ep01.mp4` … `ep16.mp4` (1920×1080, 30 fps) |
| `docs/01_content_mapping.md` | Phase 1 — every Master Prompt teaching point → video and scene |
| `docs/02_technical_validation.md` | Phase 2 — terminology and calculation checks, FCPO verification status, errors fixed |
| `docs/storyboards/epXX.md` | Phase 3 — scene-by-scene storyboard: timing, layout, chart animation, on-screen text, EN narration, BM subtitles |
| `docs/04_programme_deliverables.md` | Roadmap, glossary, Wyckoff–SMC matrix, VPA framework, Order Flow guide, Volume Profile guide, FCPO workflow, case-study collection, backtesting SOP, performance framework, dashboard spec, references |
| `docs/05_final_accuracy_report.md` | Phase 5 — final audit and pre-publication actions |
| `episodes/` | Production scripts (scenes, chart data, narration, subtitles) |
| `engine/`, `tools/` | Renderer: HTML/SVG scenes → Playwright frames → ffmpeg |

**All charts and results are hypothetical or simulated teaching data.** FCPO specifications must be confirmed against official Bursa Malaysia Derivatives documentation before publishing (see `docs/02_technical_validation.md` §4).

## Rebuilding a video

```bash
pip install edge-tts           # narration (needs network)
python3 tools/build.py episodes/ep05.js   # TTS + timeline
node tools/render.js ep05 --stills s3,s7  # optional: preview scenes as PNG
node tools/render.js ep05                 # full render → output/ep05.mp4
node tools/storyboard.js                  # regenerate docs/storyboards
```
