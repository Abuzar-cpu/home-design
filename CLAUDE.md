# House 3D tour

Interactive Three.js walkthrough of Reis's two-storey house (Baku), built from his floor-plan photos for buyers.
Everything is one self-contained file: `tour/index.html` (three.js r149 from the jsDelivr CDN, procedural textures, no assets).

## How Reis works with this project
- **Copy first.** Every change goes to the *Working Copy* artifact. The *public* artifact is only updated when he says "publish".
- **Sketch first when he asks for it.** Plan sketches are inline SVG, to scale, with tight gaps flagged.
- **Before each publish**, overwrite the single backup artifact with the version that is currently public (he wants only the latest backup kept).
- Flag fit problems, tight gaps (< 0.9 m walkways) and things a builder must confirm, rather than silently working around them.

## Artifacts
| What | Slug | Notes |
|---|---|---|
| Public tour | `b59b1dc7-6508-44b1-bab9-aca7d9fc5149` | title "Ground Floor 3D Tour", shared publicly: republish with `shared_live: "public"` and `artifact_title` |
| Working copy | `1a8fe74b-573a-4211-b385-1c3cd115d5dd` | title "Ground Floor 3D Tour Working Copy" (that is the `<title>` in `tour/index.html`) |
| Backup (latest only) | `0ff45733-d435-4ea1-875b-15ab9617a30b` | retitle it "Ground Floor 3D Tour – Backup <date> (before <change>)" each time |

Publish flow: edit `tour/index.html` → `python3 tools/check.py` → publish `tour/index.html` to the working copy.
When he says publish: copy the live public page into the backup artifact, run `python3 tools/publish_prep.py`, publish `build/public.html` to the public artifact, then `list_files` both to confirm the sha256.

## Checks (run from the repo root; output is only what changed)
- `python3 tools/check.py` — furniture fit (overlaps, door swings, windows, wall cut-ins, 60 cm reachability), 17 walk tests, full guided-tour collision run.
- `python3 tools/check.py --accept` — record current fit findings as known (only after reviewing them).
- `python3 tools/render.py build/x.png "modern,15,x,z,yaw,pitch,y" ...` — 1–4 shots in one image; `"doll,1,tx,tz,dist"` for a top view.
- Walk tests live in `tools/walk.py` (`tests=[...]`); add one when a door or passage changes.
- Uses Playwright with `/usr/bin/google-chrome` (swiftshader). `tools/common.py` builds `build/test.html` with local three.js (`npm install --prefix tools` if missing).

## Model conventions (inside `tour/index.html`)
- Metres. x 0–8.6 (gridlines 1→5), z 0–11.9 (rear wall A at z 0 → front F at 11.9; porch/balcony to 13.6). Ceiling H 2.8, upper floor at y 3.1, 18 risers.
- Exterior walls 0.4 m, interior 0.2 m. `wall(axis, t0, t1, a0, a1, ops)`: axis 'x' runs along x and is t0..t1 thick in z; ops are `win(a0,a1,out,{sill,head,frost})`, `door(a0,a1,hinge,swing)`, `{kind:'cased'}` openings.
- Upper floor is built with `PARENT = upG; YOFF = 3.1` (y values inside stay floor-relative).
- Helpers: `box`, `soft` (rounded), `cyl`, `sph`, `solid(x0,x1,z0,z1,y1)` collider, `wardrobe(axis,a0,a1,back,dir,seed)`, `chair(cx,cz,face)`, `curtains`, `plant`, `art`, `downlight`, `fill`.
- Materials in `M.*`; four styles in `STY` (modern, scandi, lux, loft) recolour them. Style-specific pieces go in `SG.<style>` groups.
- Rooms list `rooms[]` (labels, m², dollhouse targets), tour `ROUTE` with `ST(name, m², tip, lookX, lookZ)`; every new label/tip needs an Azerbaijani entry in the `AZ` dictionary.

## Current layout (Nov 2026)
- Ground: L-shaped sofa 3.65 m on the living back wall with a short chaise; glass display cabinet beside the TV unit; reading nook under the stairs; kitchen with oven tower + gas hob on the outside wall, sink under the front window, fridge by the hall wall, island 1.0×0.7 with open shelves + 2 stools, table for two 0.5×0.7; kitchen door opens inward; guest room with two single beds, small wardrobe, writing desk.
- Upper: bedroom with two-door wardrobe facing the door; doorless opening to a walk-in wardrobe (window on the outside wall); en-suite 3.0×2.3 behind it (small frosted window).
- Open builder items: en-suite drain route (3–5 m run to existing pipes), en-suite extractor fan, no upstairs WC for the other rooms.
