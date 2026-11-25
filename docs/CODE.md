# How the code works, and how to add things

The tour is one HTML page. `tools/build.py` makes it from `src/`:
`src/index.template.html` (page shell and UI), `src/style.css`, and every `src/js/NN-*.js` file joined **in file-name order** into one `<script>`, wrapped in one function.
All files therefore share one scope: a file can use anything an earlier file defined, and function declarations are visible everywhere.

## Where things are
| Files | What they do |
|---|---|
| `00-setup.js` | renderer, scene, camera, the groups (`roof`, `upG` upper floor, `roofTop`), `colliders`, constants (`H`, `UPPER_Y`, `GROUND`, `RISE`, `EYE`, `RAD`) |
| `01-textures.js` | procedural canvas textures: `T(name)` returns one from `GEN`, rugs, artworks |
| `02-materials.js` | `M.<name>` materials made with `mk()`, the palette `PAL`, `applyPalette()`, `halo()` |
| `03-language.js` | the Azerbaijani dictionary `AZ`, `tr()` |
| `04-helpers.js` | geometry helpers: `useFloor`, `box`, `soft`, `pillow`, `solid`, `cyl`, `sph`, `floorPlane`, `vpanel`, `tiled`, `prism`, `slant` |
| `10-walls.js` | `wall()` with `win()`, `door()` and cased openings; the ground-floor walls |
| `11`–`13` | floors and ceilings, exterior, porch, fan-shaped entrance stair (`FAN`, `fanH`), roof, garden, stair and its step lights |
| `20-furniture-pieces.js` | reusable furniture: `legs`, `chair`, `plant`, `vase`, `tableLamp`, `floorLamp`, `art`, `curtains`, `books`, `bookStack`, `placeSetting`, `downlight`, `fill` |
| `30`–`36` | ground-floor rooms, one file each |
| `40-upper-floor.js` | `useFloor(2)`, upper-floor walls and floors, balcony rail |
| `41`–`47` | balcony and upper-floor rooms; `47-upper-hall.js` ends with `useFloor(1)` |
| `50`–`52` | lights, time of day, the `rooms[]` list and the dollhouse labels |
| `60`–`65` | walker and collisions, walk/dollhouse switching, input, guided tour and music, step lights, render loop and language switch |

Every helper has a one-line comment above it giving its arguments. Each room file starts with a header giving the room's size, and has a comment above every piece of furniture.

## Coordinates
Metres. x runs 0–8.6 across the house, z runs 0–11.9 from the rear wall to the front wall, and the porch and balcony continue to z 13.6. y is up.
Exterior walls are 0.4 m thick and interior walls 0.2 m, so the rooms start at 0.4.
After `useFloor(2)`, everything is built into the upper-floor group: y values stay relative to that floor (a table top is still 0.75), and colliders are lifted by `UPPER_Y` automatically.
`docs/ROOMS.md` has every room's x and z extent.

## Recipes

### Add or move a piece of furniture
1. Find the room's file (`trail ask "<room> <piece>"`, or the table above), then the comment naming the piece.
2. Build it from `box` / `soft` / `cyl` (or a piece from `20-furniture-pieces.js`), and put a comment above it saying what it is.
3. Give it a `solid(x0, x1, z0, z1, top)` collider covering its footprint. The walker collides with it, and the fit checks treat it as the piece.
4. Run `python3 tools/check.py`. A new finding (overlap, door swing, window, wall, 60 cm reach) is either fixed or reported to Reis. Use `--accept` only after he has seen it.

### Add a reusable piece
Write it as a function in `20-furniture-pieces.js` (or in the room file, if only that room uses it), with a one-line comment giving its arguments.
If it calls `box` / `soft` / `cyl` itself, add its name to `HELP` in `tools/fit/fit.py`. Fit findings then point to the line that placed the piece, not to the inside of the helper.

### Change a wall, door, window or opening
Edit the `wall(...)` call (`10-walls.js` for the ground floor, `40-upper-floor.js` for the upper floor). Ops:
- `win(a0, a1, out, { sill, head, frost })`
- `door(a0, a1, hinge, swing, { glass, bifold, front })`
- `{ a0, a1, sill: 0, head, kind: 'cased' }` for a doorless opening

Then add or adjust a walk test in `tools/walk.py` and keep the test count in `CLAUDE.md` and HANDOFF §1 right.

### Add or change a room
1. Walls as above. Furniture goes in a new file `NN-<room>.js`, numbered so that it sorts in the right place: ground-floor rooms between `30` and `36`, upper-floor rooms between `41` and `47` (after `useFloor(2)`, before `useFloor(1)`).
2. Add an entry to `rooms[]` in `52-rooms-labels.js` with `n`, `d`, `lv`, extent, `at` and `lw`, then run `python3 tools/rooms.py` to update `docs/ROOMS.md`.
3. Add a tour stop to `ROUTE` in `63-guided-tour.js`: `ST(name, m², tip, lookX, lookZ)`.
4. Add an `AZ` entry in `03-language.js` for the name and the tip.

### Add text the page shows
Every English string needs an `AZ` entry whose key is the exact English text. That covers room names, tips and buttons, plus the text inside `src/index.template.html`, which is translated by its text content.
The template is not run through the formatter for that reason.

### A new colour or finish
- Add a material with `mk()` in `02-materials.js`. Either give it an entry in `PAL.m` (house-wide materials), or keep it fixed and give it its texture straight away, as the living-room materials do (`livWall`, `oak`, `walnut`, `travertine` ...). New textures go in `GEN` in `01-textures.js`.
- There is only one style (Loft) since 26 Nov; there is no per-style group any more.

### Add a source file
Name it `NN-<what>.js`. The number fixes its place in the build. Then add it to the file list in `CLAUDE.md`.
If it is furniture on its own floor, check the `//@before` sections of `tools/fit/instrument.js`: they switch the fit checks' furniture flag on and off at file boundaries.

## Formatting
`src/js` and `src/style.css` are formatted with Prettier (`.prettierrc.json`). Run `npm run format --prefix tools` after editing (`npm run format:check --prefix tools` only checks). It keeps one statement per line, so diffs stay small and readable.

## Checking that a change is safe
- `python3 tools/check.py`: furniture fit, walk tests and the full guided-tour run (see `CLAUDE.md`).
- `python3 tools/fingerprint.py`: hashes everything the page builds. That covers every mesh's geometry, position, material and texture, plus the colliders, rooms, tour route, Azerbaijani strings and page text.
  For a refactor that should change nothing visible, run `python3 tools/fingerprint.py --save` before it and `python3 tools/fingerprint.py --diff` after; it must print `identical`.
- The fit checks build an instrumented copy of the page (`build/check.html`). `tools/fit/instrument.js` wraps `box`, `soft`, `cyl`, `solid`, `doorUnit`, `windowUnit` and `lining` to record colliders, doors, openings, windows and furniture meshes, without touching `src/`.
  `tools/fit/dump.py` saves that data, and `tools/fit/fit.py` runs the checks on it.
