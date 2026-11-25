# House 3D tour

**Start here:** read `docs/HANDOFF.md` first. It has the start-of-session checklist, what is live, what is waiting on Reis (with build specs) and what was already decided or rejected.
**Before you finish:** update the notes as `docs/MAINTAINING.md` says (which file, when, how), commit on a branch and open a pull request. Reis merges; never push to `main`.

Interactive Three.js walkthrough of Reis's two-storey house (Baku), built from his floor-plan photos for buyers.
The plan photos and every room's size are in `docs/ROOMS.md` (plans in `docs/plans/`).
The published tour is one self-contained page (three.js r149 from the jsDelivr CDN, procedural textures, no assets), built from `src/`:
- `src/index.template.html` page shell and UI markup, `src/style.css` UI styles
- `src/js/NN-*.js` the scene by area: `0x` setup/textures/materials/language/helpers, `1x` walls/floors/exterior/stair, `20` furniture pieces, `3x` ground-floor rooms, `40` upper-floor walls, `41`–`47` balcony and upper-floor rooms, `5x` lighting/time of day/rooms list, `6x` player/views/input/guided tour/step lights/loop
- The js files are joined in file-name order into ONE classic `<script>` (`tools/build.py` adds the wrapping function): they share one scope, so a file can use anything defined in an earlier one. Keep that order when adding a file.
- **`docs/CODE.md`** explains how the code fits together and has recipes for adding furniture, rooms, doors, tour stops, translations and materials.
- `src/js` and `src/style.css` are Prettier-formatted (`npm run format --prefix tools`); every helper has a comment giving its arguments, and every piece of furniture has a comment saying what it is.
- `python3 tools/build.py` writes `build/index.html` (git-ignored). Every tool builds first, so just edit `src/` and run the checks.
- Use `trail ask` / `trail skeleton src/js/<file>` to find code instead of reading whole files.

## How Reis works with this project
- **Copy first.** Every change goes to the *Working Copy* artifact. The *public* artifact is only updated when he says "publish".
- **Sketch first when he asks for it.** Plan sketches are inline SVG, to scale, with tight gaps flagged.
- **Before each publish**, overwrite the single backup artifact with the version that is currently public (he wants only the latest backup kept).
- Flag fit problems, tight gaps (< 0.9 m walkways) and things a builder must confirm, rather than silently working around them.
- After every change: update the notes (`docs/MAINTAINING.md` has the table of what to update when), commit on a branch with the `Co-Authored-By: Claude <model> <noreply@anthropic.com>` trailer, push the branch and open a pull request. **Reis reviews and merges; never push to `main`.**

## Artifacts
| What | Slug | Notes |
|---|---|---|
| Public tour | `b59b1dc7-6508-44b1-bab9-aca7d9fc5149` | title "Ground Floor 3D Tour", shared publicly: republish with `shared_live: "public"` and `artifact_title` |
| Working copy | `04962ea6-db9c-49de-923a-cb353b63361c` | title "Ground Floor 3D Tour Working Copy" (that is the `<title>` in `src/index.template.html`); recreated 25 Nov after the old one was deleted |
| Backup (latest only) | none right now | Reis deleted it on 24 Nov. Before the next publish, create a new private artifact from the live public page, titled "Ground Floor 3D Tour – Backup <date> (before <change>)", and record its slug here |

Since 17 Nov the live pages are built from branch `tour/upper-floor-proposal`; `main` is behind until Reis merges it (see `docs/HANDOFF.md` §2).

Publish flow: edit `src/` → `python3 tools/check.py` → `python3 tools/publish_prep.py` → publish `build/index.html` to the working copy → commit on a branch → open a pull request.
When he says publish: copy the live public page into the backup artifact, publish `build/public.html` to the public artifact, then `list_files` both to confirm the sha256.

## Checks (run from the repo root; output is only what changed)
- `python3 tools/check.py` — furniture fit (overlaps, door swings, windows, wall cut-ins, 60 cm reachability), 19 walk tests (17 on `main`), full guided-tour collision run.
- `python3 tools/check.py --accept` — record current fit findings as known (only after reviewing them).
- `python3 tools/render.py build/x.png "15,x,z,yaw,pitch,y" ...` (hour first) — 1–4 shots in one image; `"doll,1,tx,tz,dist"` for a top view.
- Walk tests live in `tools/walk.py` (`tests=[...]`); add one when a door or passage changes.
- `python3 tools/rooms.py` — rewrites the room-size table in `docs/ROOMS.md` from `rooms[]`; `check.py` fails if it's stale.
- `python3 tools/status.py` — commit plus the sha256 of the built working-copy and public pages; compare with `list_files` on the artifacts.
- `python3 tools/fingerprint.py --save` / `--diff` — hash of everything the page builds; for refactors that must change nothing visible, `--diff` has to print `identical`.
- Uses Playwright with Chrome (`/usr/bin/google-chrome` or the macOS app; `$CHROME` overrides), swiftshader. Python packages: `pip install -r tools/requirements.txt` (on a Mac, into a venv: `python3 -m venv .venv`, then run the tools with `.venv/bin/python`). `tools/common.py` builds `build/test.html` with local three.js (`npm install --prefix tools` if missing).

## Model conventions (in `src/js/`)
- Metres. x 0–8.6 (gridlines 1→5), z 0–11.9 (rear wall A at z 0 → front F at 11.9; porch/balcony to 13.6). Ceiling H 2.8, upper floor at y 3.1, 18 risers.
- Exterior walls 0.4 m, interior 0.2 m. `wall(axis, t0, t1, a0, a1, ops)`: axis 'x' runs along x and is t0..t1 thick in z; ops are `win(a0,a1,out,{sill,head,frost})`, `door(a0,a1,hinge,swing)`, `{kind:'cased'}` openings.
- `useFloor(2)` (in `40-upper-floor.js`) builds into the upper floor at `UPPER_Y` = 3.1, with y values inside staying floor-relative; `useFloor(1)` at the end of `47-upper-hall.js` switches back.
- Helpers (arguments in the comment above each): `box`, `soft` (rounded), `cyl`, `sph`, `solid(x0,x1,z0,z1,y1)` collider, `wardrobe(axis,a0,a1,back,dir,seed)`, `chair(cx,cz,face)`, `curtains`, `plant`, `art`, `downlight`, `fill`.
- Materials in `M.*`; one palette `PAL` (the former Loft style, 26 Nov: the Modern, Scandinavian and Warm luxury styles and the style switch were removed) colours most of them once at start (`applyPalette()`). The living/dining room has its own fixed materials (`livWall`, `oak`, `walnut`, `travertine`, `bronze`, `boucleIvory`, `sandFab`, `greigeFab`, `taupe`, `sheer`, `ledWarm`, `alabaster`, `espresso`).
- Rooms list `rooms[]` (labels, m², dollhouse targets), tour `ROUTE` with `ST(name, m², tip, lookX, lookZ)`; every new label/tip needs an Azerbaijani entry in the `AZ` dictionary.

## Current layout (Nov 2026)
- Living + dining (warm contemporary, 26 Nov): oak floor, ivory walls, ceiling band with indirect LED and hidden curtain tracks; curved ivory bouclé sofa 3.1 m, sand accent chair, oval travertine coffee table; TV wall of travertine centre panel + fluted walnut with a floating walnut console; walnut table for six 2.0×1.0 with rounded ends, six sand chairs, bronze/alabaster pendant, slim 35 cm walnut sideboard; sheers + taupe blackout at the living window, sheers at the dining window.
- Ground: reading nook under the stairs; kitchen (all cabinets in the table's wood, `M.woodB`) with oven tower + gas hob on the outside wall, sink under the front window, fridge by the hall wall, island 1.0×0.7 with open shelves + 2 stools, table for two 0.5×0.7; kitchen door opens inward; guest room with two single beds, small wardrobe, writing desk; porch split into an enclosed storage room (2.5 m, door from the porch) and the porch itself with a full-length front window and a bench.
- Entrance: fan-shaped curved stair (9 risers, travertine-look `M.travertine`, bronze `M.bronze` rails) in front of the porch, rising to a porch-level entrance under the balcony; walking heights from `fanH` in `12-exterior.js`.
- Upper: bedroom (4.6×4.0, top right) with a two-door wardrobe facing the door and a wall shelf under a round mirror; down the left side, en-suite 3.0×2.2 (pocket door from the bedroom, bath with shower over it, frosted vent), walk-in wardrobe 3.0×3.4 (U of runs, doorless opening from the bedroom), one baby's room 3.0×5.2 (crib, changing dresser, nursing chair, daybed); baby gate at the stair top; gaming room front right with acoustic panels.
- Open builder items: en-suite drain route (now over the living room, about 3 m further from the downstairs bathroom), en-suite extractor fan, new baby's-room side window and en-suite vent openings, entrance-stair drainage and lighting, solid-core gaming-room door, no upstairs WC for the other rooms.
