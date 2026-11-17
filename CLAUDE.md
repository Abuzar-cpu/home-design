# House 3D tour

**Start here:** read `docs/HANDOFF.md` first. It has the start-of-session checklist, what is live, what is waiting on Reis (with build specs) and what was already decided or rejected.
**Before you finish:** update the notes as `docs/MAINTAINING.md` says (which file, when, how), then commit and push.

Interactive Three.js walkthrough of Reis's two-storey house (Baku), built from his floor-plan photos for buyers.
The published tour is one self-contained page (three.js r149 from the jsDelivr CDN, procedural textures, no assets), built from `src/`:
- `src/index.template.html` page shell and UI markup, `src/style.css` UI styles
- `src/js/NN-*.js` the scene by area: `0x` setup/textures/materials/language/helpers, `1x` walls/floors/exterior/stair, `20` furniture pieces, `3x` ground-floor rooms, `4x` upper-floor rooms, `5x` lighting/time of day/rooms list, `6x` player/views/input/guided tour/step lights/loop
- The js files are joined in file-name order into ONE classic `<script>`: they share one scope, so a file can use anything defined in an earlier one. Keep that order when adding a file.
- `python3 tools/build.py` writes `build/index.html` (git-ignored). Every tool builds first, so just edit `src/` and run the checks.
- Use `trail ask` / `trail skeleton src/js/<file>` to find code instead of reading whole files.

## How Reis works with this project
- **Copy first.** Every change goes to the *Working Copy* artifact. The *public* artifact is only updated when he says "publish".
- **Sketch first when he asks for it.** Plan sketches are inline SVG, to scale, with tight gaps flagged.
- **Before each publish**, overwrite the single backup artifact with the version that is currently public (he wants only the latest backup kept).
- Flag fit problems, tight gaps (< 0.9 m walkways) and things a builder must confirm, rather than silently working around them.
- After every change: update the notes (`docs/MAINTAINING.md` has the table of what to update when), commit with the `Co-Authored-By: Claude <model> <noreply@anthropic.com>` trailer, and push to `origin main`.

## Artifacts
| What | Slug | Notes |
|---|---|---|
| Public tour | `b59b1dc7-6508-44b1-bab9-aca7d9fc5149` | title "Ground Floor 3D Tour", shared publicly: republish with `shared_live: "public"` and `artifact_title` |
| Working copy | `1a8fe74b-573a-4211-b385-1c3cd115d5dd` | title "Ground Floor 3D Tour Working Copy" (that is the `<title>` in `src/index.template.html`) |
| Backup (latest only) | `0ff45733-d435-4ea1-875b-15ab9617a30b` | retitle it "Ground Floor 3D Tour – Backup <date> (before <change>)" each time |

Publish flow: edit `src/` → `python3 tools/check.py` → `python3 tools/publish_prep.py` → publish `build/index.html` to the working copy → commit and push.
When he says publish: copy the live public page into the backup artifact, publish `build/public.html` to the public artifact, then `list_files` both to confirm the sha256.

## Checks (run from the repo root; output is only what changed)
- `python3 tools/check.py` — furniture fit (overlaps, door swings, windows, wall cut-ins, 60 cm reachability), 17 walk tests, full guided-tour collision run.
- `python3 tools/check.py --accept` — record current fit findings as known (only after reviewing them).
- `python3 tools/render.py build/x.png "modern,15,x,z,yaw,pitch,y" ...` — 1–4 shots in one image; `"doll,1,tx,tz,dist"` for a top view.
- Walk tests live in `tools/walk.py` (`tests=[...]`); add one when a door or passage changes.
- `python3 tools/status.py` — commit plus the sha256 of the built working-copy and public pages; compare with `list_files` on the artifacts.
- Uses Playwright with `/usr/bin/google-chrome` (swiftshader). `tools/common.py` builds `build/test.html` with local three.js (`npm install --prefix tools` if missing).

## Model conventions (in `src/js/`)
- Metres. x 0–8.6 (gridlines 1→5), z 0–11.9 (rear wall A at z 0 → front F at 11.9; porch/balcony to 13.6). Ceiling H 2.8, upper floor at y 3.1, 18 risers.
- Exterior walls 0.4 m, interior 0.2 m. `wall(axis, t0, t1, a0, a1, ops)`: axis 'x' runs along x and is t0..t1 thick in z; ops are `win(a0,a1,out,{sill,head,frost})`, `door(a0,a1,hinge,swing)`, `{kind:'cased'}` openings.
- Upper floor is built with `PARENT = upG; YOFF = 3.1` (y values inside stay floor-relative).
- Helpers: `box`, `soft` (rounded), `cyl`, `sph`, `solid(x0,x1,z0,z1,y1)` collider, `wardrobe(axis,a0,a1,back,dir,seed)`, `chair(cx,cz,face)`, `curtains`, `plant`, `art`, `downlight`, `fill`.
- Materials in `M.*`; four styles in `STY` (modern, scandi, lux, loft) recolour them. Style-specific pieces go in `SG.<style>` groups.
- Rooms list `rooms[]` (labels, m², dollhouse targets), tour `ROUTE` with `ST(name, m², tip, lookX, lookZ)`; every new label/tip needs an Azerbaijani entry in the `AZ` dictionary.

## Current layout (Nov 2026)
- Ground: L-shaped sofa 3.65 m on the living back wall with a short chaise; glass display cabinet beside the TV unit; reading nook under the stairs; kitchen with oven tower + gas hob on the outside wall, sink under the front window, fridge by the hall wall, island 1.0×0.7 with open shelves + 2 stools, table for two 0.5×0.7; kitchen door opens inward; guest room with two single beds, small wardrobe, writing desk.
- Upper: bedroom (4.6×4.0, top right) with a two-door wardrobe facing the door; doorless opening to a walk-in wardrobe (window on the outside wall); en-suite 3.0×2.3 at its far end (small frosted window); baby's room 3.0×5.4 at the front left; gaming room front right. A swap of bedroom and baby's room is sketched and pending: see `docs/HANDOFF.md`.
- Open builder items: en-suite drain route (3–5 m run to existing pipes), en-suite extractor fan, no upstairs WC for the other rooms.
