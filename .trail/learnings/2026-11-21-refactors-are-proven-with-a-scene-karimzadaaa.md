---
title: "Refactors are proven with a scene fingerprint; fit checks hook helpers, not source text"
author: KarimzadaAA
date: 2026-11-21
branch: tools/readable-refactor
cost: { minutes: 24, tokens: 316571 }
id: l-94196bb5
scope: repo
status: active
src: agent
touches:
  - ".prettierrc.json"
  - docs/ROOMS.md
  - src/js/00-setup.js
  - src/js/01-textures.js
  - src/js/02-materials.js
  - src/js/03-language.js
  - src/js/04-helpers.js
  - src/js/10-walls.js
  - src/js/11-floors-ceiling.js
  - src/js/12-exterior.js
---

## Decided
- src/js is Prettier-formatted, one statement per line. A refactor that should change nothing visible is proven with the scene fingerprint (every mesh, geometry, material and texture in all four styles, plus colliders, rooms, route, AZ strings and page text). It must print "identical".
- The fit checks instrument the page by wrapping the helper functions (box, soft, cyl, solid, doorUnit, windowUnit, lining) at file boundaries. Function declarations are hoisted over the one shared scope, so the wrappers catch every call. The old approach string-replaced exact source lines and broke on any edit or reformat.
- Accepted fit findings are keyed without line numbers ("src/js/<file>: <source text>"), so moving code doesn't resurface them. Reformatting a line does change its key: re-accept after checking that the findings are the same.
- The first window check ignored floors (upper-floor furniture matched ground-floor windows) and was dropped; the same-floor version stays.

## Watch out
- tools/check.py runs each script with `python -I`, which ignores user-site packages. A `pip install --user playwright` looks installed but the checks can't import it. Use a venv (.venv) or a system-wide install.
- Don't run the formatter on src/index.template.html: applyLang() uses each element's exact textContent as the AZ dictionary key, so reflowed text silently loses its translation.

In the code: tools/fingerprint.py (--save / --diff), tools/fit/instrument.js (//@before <file> sections), tools/fit/fit.py, tools/build.py render(inject) and line_map(), .prettierrc.json, docs/CODE.md
