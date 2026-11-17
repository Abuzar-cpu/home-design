# Home design: 3D house tour

An interactive 3D walkthrough of a two-storey house in Baku, built with Three.js from the owner's floor plans. Walk through it in first person (WASD + mouse), switch to a dollhouse view, change the furnishing style (Modern, Scandinavian, Warm luxury, Loft), drag the time of day, switch English/Azerbaijani, or take the guided tour.

- **Live tour:** https://claude.ai/artifact/PRgJ1V4VBxPi5dmDQ8ZKkt
- **Source:** `src/` (page shell, styles, and the scene split by area in `src/js/`)
- **Build:** `python3 tools/build.py` → `build/index.html`, a single self-contained page
- **Checks:** `python3 tools/check.py` (furniture fit, walk tests, guided-tour collisions)

Working on this with Claude? `CLAUDE.md` has the conventions and `docs/HANDOFF.md` has the current state and what's pending.
