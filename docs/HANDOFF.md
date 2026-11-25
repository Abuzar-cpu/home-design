# Handoff: where the house tour stands

Read this at the start of a session, after `CLAUDE.md`. It holds what is live, what is waiting on Reis, and what was already decided or rejected, so nothing gets redone or re-asked.
Keep it current: `docs/MAINTAINING.md` says which section to update for each kind of change.

Last updated: 26 Nov 2026.

## 1. Start-of-session checklist (about 2 minutes)
1. `git switch main && git pull`, then `trail build` (refreshes the code map; the cache is git-ignored). Check for open pull requests (`gh api repos/Abuzar-cpu/home-design/pulls --jq '.[].title'`): an unmerged one means its changes aren't on `main` yet, so ask Reis before stacking new work on it.
2. Tooling, if this is a fresh machine: `pip install playwright pillow`, Chrome at `/usr/bin/google-chrome` (else `playwright install chromium` and change `CHROME` in `tools/common.py`), `npm install --prefix tools` for the local three.js. Node 18+.
3. `python3 tools/status.py`, then `list_files` on the working copy and public artifacts. The sha256 values should match §2. If they don't, the working copy was changed outside this repo: read it with `read_artifact` and tell Reis before building on top.
4. `python3 tools/check.py` should print `fit: 0 new finding(s)`, `walk tests: 17/17 pass` and a tour line with `0 collision frames`.
5. Read **Pending** below. Answer what Reis asks; don't reopen settled items.

## 2. What is live right now
| | Version | Content |
|---|---|---|
| Working copy | `1794766798-59c7` | built from `src/` as of commit `374123f` (no tour changes since); sha256 `2e3fb10c…e54450` |
| Public tour | `1794766934-ac7a` | same page with the public title; sha256 `c10f3833…c718fe`. Link Reis shares: https://claude.ai/artifact/PRgJ1V4VBxPi5dmDQ8ZKkt |
| Backup | `1794766924-b2f8` | "Backup 15 Nov (before guest room changes)": the public page before the guest room/kitchen door publish |

Working copy and public are identical: nothing unpublished.

## 3. Pending (waiting on Reis)

### 3.1 Swap master bedroom and baby's room (sketched 17 Nov, awaiting "build it")
A plain swap would leave the walk-in wardrobe and en-suite opening off the baby's room, so the sketch also flips the suite. Build spec (metres, upper floor, x from the outside wall, z from the rear wall):

- **En-suite moves to the back corner**, x .4–3.4, z .4–2.7 (3.0 × 2.3): bath along the rear wall (x .45–2.05, z .45–1.2), walk-in shower in the hall-side corner (glass at x ≈2.25, z .4–1.05), wall-hung WC on the outside wall (z 1.75–2.25), double vanity with lit mirror on the hall-side wall (z 1.4–2.55). Vent window 40 × 40 cm on the outside wall at z 1.3–1.7, top at 2.1 m, frosted.
- **Partition** at z 2.7–2.8 with the en-suite door at x 1.6–2.4, opening into the en-suite.
- **Walk-in wardrobe in the middle**, z 2.8–5.9, **no window, no island**: wardrobe runs along the outside wall (x .4–.96) and the hall-side wall (x 2.84–3.4), 3.1 m each, 1.88 m clear between. Downlights and shelf LEDs.
- **Wall** at z 5.9–6.1 with a doorless cased opening at x 1.45–2.35 into the new bedroom.
- **New master bedroom**, x .4–3.4, z 6.1–11.5 (3.0 × 5.4, 16.2 m²): bed head on the outside wall, bed x .4–2.5, z 8.3–9.9 (0.9 m left past its foot); nightstands z 7.8–8.25 and 9.95–10.4; dresser on the back wall at x .45–1.35; reading chair by the front window. Keeps its hall door (z 9.8–10.7, swings in; clears the bed corner) and both windows (outside wall z 6.4–8.0, front x 1.1–2.7).
- **Baby's room** in the old bedroom, x 3.6–8.2, z .4–4.4 (18.4 m²): wall up the doorless opening (wall x 3.4–3.6, z 1.35–2.25). Keep the two-door wardrobe (x 3.6–4.6, z .4–1.0). Crib on the right wall (x 7.5–8.2, z 1.0–2.3), changing dresser on the left wall (x 3.6–4.1, z 2.0–3.2), nursing chair by the rear window. Hall door x 3.8–4.7 stays.
- **Remove** the outside-wall windows `win(1.6, 3.2, -1)` and `win(4.5, 5.1, …frost)` in `src/js/40-upper-floor.js`.
- Update `rooms[]` labels/m²/dollhouse targets, the tour `ROUTE` stops and tips (+ `AZ` strings), and the walk tests `bedroom-wardrobe opening` and `en-suite door` in `tools/walk.py`.
- Tell Reis: the en-suite now sits above the living room, so the drain route changes; the builder must confirm it.

This also settles two older open items: the 15 Nov request (remove the wardrobe-room window, wardrobes instead; en-suite window → small vent only) and the island question (no island, because you walk through the middle to the en-suite).

### 3.2 Stair look from his reference photo (unanswered)
He sent a photo of under-stair pull-out storage with an oak handrail and spindles and said "I want the stair like this". The pull-out storage was built and he **rejected** it ("That's not what I wanted"), so it was removed and the reading nook restored. Offered instead: oak handrail and spindles, carpeted steps, white side panel. He hasn't answered. Ask what he liked before building anything stair-related.

### 3.3 Kitchen from his reference photo (colours done in the studio, house not touched yet)
On 26 Nov he sent a kitchen photo (walnut lowers, cream uppers to the ceiling, honed travertine worktop and splashback, dark bronze tap, cream floor, black-framed glass display cabinet) and said "I want my kitchen to be exactly this". Done so far: a **"Your photo"** preset in the Kitchen Colour Studio (now its default): Warm luxury base, walnut `#432d21`, uppers `#ddd3c5`, worktop `#e6dac8` on a new studio-only `travertinePhoto` texture (honed, roughness .35), fittings `#2e2621`/`#2a2420`, walls `#e9e1d5`, ceiling `#f1ebe2`; the full list is `PHOTO` in `studio/kitchen/90-ui.js`. The photo is a dim render, so these are the finishes' colours, not raw pixel samples. The studio also gained a Room group (walls, ceiling, floor tiles). Two studio bugs fixed along the way: re-clicking the active style didn't reset it, and the glow swatch only changed the base colour, not the visible emissive colour.

Waiting on Reis:
- **Wire it into the house?** It can't be a plain recolour: `cabinet`, `counter`, `woodA/B`, `tile`, `wall`, `metal*` are shared with other rooms (bathroom floor, every wall, the living room wood). Plan: kitchen-only materials (or a fifth style), plus add `travertinePhoto` to `GEN` in `01-textures.js`.
- **Things a colour can't change** (each is geometry, ask before building): handleless fronts with finger grooves (his have bar handles); uppers running to the ceiling with the hood boxed in cream (the hood is `M.kick`, black, so it can't go cream without its own material); a travertine splashback (the kitchen has none, the wall shows); a black-framed glass display cabinet with a lit interior; an integrated (panelled) fridge instead of the steel one. The photo's U-shape layout is **not** proposed: his kitchen layout came from his own drawing (§5).

## 4. Open items to mention, not to act on unless asked
- **Builder:** en-suite drain route (3–5 m to existing pipes, likely boxed in downstairs); en-suite extractor fan; no upstairs WC for the baby's and gaming rooms; under-stair pull-outs (if ever revived) need heavy-duty runners.
- **Plan reading doubts from the first review:** handwritten 1400 bathroom width; a blue pen mark; balcony door shown ~1.0 m (the 800 figure was part of a 3700+900+800 chain); porch drawn with full-depth walls; porch/balcony area labels look overstated; ceiling height 2.8 m is an assumption (shown in the tour); uneven stair goings; the 161 m² total.
- **Performance ideas offered, not requested:** draw only the current floor, merge static meshes, throttle shadow refreshes.

## 5. Decided, so don't re-ask
- Built a Kitchen Colour Studio (26 Nov): a standalone page, separate from the tour's own publish flow, for trying furniture colours one piece at a time — cabinets, counters, island, stools, table, fridge, oven/hob, hardware — starting from any of the 4 styles. Link: https://claude.ai/artifact/VKJK7WgLMLrHKpbrbfuXV3 (slug `e54df07d-4824-4971-885c-7dffe1c02292`, see CLAUDE.md "Object studios"). Nothing from it is wired back into the house yet; its "Copy colours" button exports a `{materialKey: hex}` snippet for that.
- Ground floor: kitchen and guest/study swapped versus the paper plan (his first change).
- Styles: Modern, Scandinavian, Warm luxury, Loft, with a switch. He asked whether Loft-only would be easier; told him it barely saves work and he kept all four.
- Language switch English/Azerbaijani; areas in m².
- Stair flipped to start near the living-room door; reading nook under it; step lights that follow you.
- Guided tour with music, a full 360° turn in each room, ends in the dollhouse view.
- Upper floor: en-suite "option B" (walk-in wardrobe, then en-suite at its far end); clothing room's hall door removed; bedroom armchair replaced by a two-door wardrobe on the back wall facing the bedroom door.
- Living room: armchair and table lamp removed; L-sofa 3.65 m along the back wall with a short chaise on the dining side; coffee table 1.2 m; floor lamp and plant moved toward dining; glass display cabinet beside the TV unit, slatted panels stop at the TV unit.
- Kitchen rebuilt from his own drawing: oven tower + gas hob on the outside wall, sink under the front window, fridge by the hall wall, stair-wall cabinets stop 1.05 m short of the door, island 1.0 × 0.7 with open shelves facing the hob and 2 stools, table for two 0.5 × 0.7 on the island's end. Stools/chairs pushed in so the walkway works. Kitchen door opens **into the kitchen** (opening into the hall blocked it).
- Guest/study: computer removed, two single beds, small two-door wardrobe, plain writing desk.
- Backups: keep **only the latest** backup artifact; overwrite it before each publish.

## 6. Working with Reis
- Short messages, sometimes with typos. "Copy" = working copy; "publish" = push to the public link; "sketch first" = an inline SVG plan to scale, nothing built until he approves.
- He wants risks and tight spots stated plainly (walkways under 0.9 m, things that need a builder), and he decides. When a request is ambiguous, sketch the options (A/B) rather than guessing.
- After building: one or two renders (`tools/render.py`) are enough; don't send four unless asked. Batch small changes into one build-check-publish round to save tokens.
- Every git commit ends with the `Co-Authored-By: Claude <model> <noreply@anthropic.com>` trailer (plus the session link line when the session provides one). Changes go to a branch and a pull request; Reis merges them himself.
