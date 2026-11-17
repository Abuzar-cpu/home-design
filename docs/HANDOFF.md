# Handoff: where the house tour stands

Read this at the start of a session, after `CLAUDE.md`. It holds what is live, what is waiting on Reis, and what was already decided or rejected, so nothing gets redone or re-asked.
Keep it current: `docs/MAINTAINING.md` says which section to update for each kind of change.

Last updated: 17 Nov 2026 (four-room left side sketched).

## 1. Start-of-session checklist (about 2 minutes)
1. `git switch main && git pull`, then `trail build` (refreshes the code map; the cache is git-ignored). Check for open pull requests (`gh api repos/Abuzar-cpu/home-design/pulls --jq '.[].title'`): an unmerged one means its changes aren't on `main` yet, so ask Reis before stacking new work on it.
2. Tooling, if this is a fresh machine: `pip install playwright pillow`, Chrome at `/usr/bin/google-chrome` (else `playwright install chromium` and change `CHROME` in `tools/common.py`), `npm install --prefix tools` for the local three.js. Node 18+.
3. `python3 tools/status.py`, then `list_files` on the working copy and public artifacts. The sha256 values should match §2. If they don't, the working copy was changed outside this repo: read it with `read_artifact` and tell Reis before building on top.
4. `python3 tools/check.py` should print `fit: 0 new finding(s)`, `walk tests: 17/17 pass` (18/18 on the proposal branch) and a tour line with `0 collision frames`.
5. Read **Pending** below. Answer what Reis asks; don't reopen settled items.

## 2. What is live right now
| | Version | Content |
|---|---|---|
| Working copy | `1794766798-59c7` | built from `src/` as of commit `374123f` (no tour changes since); sha256 `2e3fb10c…e54450` |
| Public tour | `1794766934-ac7a` | same page with the public title; sha256 `c10f3833…c718fe`. Link Reis shares: https://claude.ai/artifact/PRgJ1V4VBxPi5dmDQ8ZKkt |
| Backup | `1794766924-b2f8` | "Backup 15 Nov (before guest room changes)": the public page before the guest room/kitchen door publish |

| Upper-floor proposal | `1794913231-f456` | slug `b1682337-5007-48c2-9a01-405e5885bb49`, "Upper Floor Proposal – 17 Nov": the whole house with §3.1 built, from branch `tour/upper-floor-proposal` (pushed, no pull request: Reis asked for none). Link: https://claude.ai/artifact/Nuby8dQas9Vs2Dje5AytmN |

Working copy and public are identical: nothing unpublished. The proposal is separate, for Reis and his wife to decide on.

## 3. Pending (waiting on Reis)

### 3.1 Four rooms down the left side, from his own drawing (built as the proposal artifact 17 Nov, awaiting his decision)
Built on branch `tour/upper-floor-proposal` and published only to the proposal artifact (§2), not the working copy. If he approves: merge that branch's `src/` and `tools/` changes, publish to the working copy, update §2, move this item to §5. Built with the defaults: pocket door, daybed, second wardrobe run, new study window. Two changes from the sketch: the bedroom dresser became a 20 cm wall shelf under the mirror (a dresser on the front wall left only 0.6 m to reach the far side of the bed), and the baby's-room floor lamp was dropped (it stood in front of the window). The baby gate is drawn closed but is not a collider, so walks and the guided tour pass through it.
He sent a drawing of the upper floor (`docs/plans/upper-floor-layout-17-nov.png`) and asked to sketch it first, then build it. His drawing is schematic. The sketch keeps the bedroom, hall, stair and gaming room where they are, and splits the left side (x .4–3.4) into four rooms. This **replaces** the bedroom ↔ baby's room swap sketched earlier the same day (that spec is in git history: HANDOFF §3.1 at `66f5a41`).

Build spec (metres, upper floor, x from the outside wall, z from the rear wall):
- **En-suite** in the back corner, z .4–2.4 (3.0 × 2.0, 6.0 m²): bath x .45–2.1, z .45–1.2 with a shower over it and a glass screen along z 1.2 (x .45–1.25); wall-hung WC on the rear wall, centre x 2.75 (z .4–.95); double vanity with lit mirror on the outside wall, x .4–.9, z 1.3–2.4. Vent window 40 × 40 cm on the outside wall at z .55–.95, sill 1.7, head 2.1, frosted (his drawing shows a full window; kept the small vent he asked for on 15 Nov). Entry **from the bedroom**: pocket door in the wall x 3.4–3.6 at z 1.4–2.2, sliding into the wall toward z .6. No separate walk-in shower: at 3.0 × 2.0 it won't fit with a 0.9 m walkway.
- **Partition** z 2.4–2.5.
- **Walk-in wardrobe** z 2.5–5.5 (3.0 × 3.0, 9.0 m²), no window, no island: wardrobe run on the outside wall (x .4–.96, z 2.55–5.45). Optional second run on the hall-side wall (x 2.84–3.4, z 3.5–5.45, 1.88 m clear between). Doorless cased opening from the bedroom at z 2.6–3.4. It stops at 3.4 because the bedroom door, open, reaches z 3.5 at x 3.8.
- **Wall** z 5.5–5.7.
- **Baby's room** z 5.7–8.6 (3.0 × 2.9, 8.7 m²): new hall door at z 6.1–7.0, hinge at 7.0, swings in (opposite the stair top). Crib x 1.0–2.3, z 5.75–6.45, kept out of the window bay; changing dresser on the hall-side wall, x 2.9–3.4, z 7.3–8.3; round nursing chair, 0.7 m, centred at x 1.0, z 8.1 by the window. Window z 6.4–8.0 stays.
- **Wall** z 8.6–8.8, on top of the ground-floor wall at the same place.
- **Study / guest** z 8.8–11.5 (3.0 × 2.7, 8.1 m²): desk on the baby's-room wall, x .45–1.95, z 8.8–9.4, chair at x .9; door z 9.8–10.7 (today's baby's-room door, unchanged); front window x 1.1–2.7 stays; **new** outside-wall window z 9.4–11.0 (not on the paper plan). Optional daybed 0.9 × 1.9 on the front wall, x .45–2.35, z 10.55–11.45.
- **Bedroom** unchanged, except the dresser and round mirror move from the left wall (now two openings) to the front wall, x 4.9–6.0, z 3.95–4.4, clear of the door swing; the floor lamp moves with it.
- **Windows** in `src/js/40-upper-floor.js`: remove `win(1.6, 3.2, -1)` and `win(4.5, 5.1, …frost)`; add the vent and the study window.
- **Hall:** screw-fixed baby gate across the stair top, x 5.0–5.2, z 6.1–7.3 (1.2 m), opening into the hall; the glass rail z 4.6–6.1 and the balcony door stay (his drawing doesn't show the balcony door).
- **Gaming:** furniture unchanged, add acoustic panels on the walls. Door stays at z 7.7–8.6 (his drawing has it a little further along).
- Update `rooms[]` (then `python3 tools/rooms.py`), the "differs from the paper plans" list in `docs/ROOMS.md`, the `ROUTE` stops and tips with `AZ` strings ("Study / guest" upstairs is new), and the walk tests `bedroom-wardrobe opening`, `en-suite door` and `baby door`; add `study door` (18 tests, so update the count in `CLAUDE.md` and §1).

Told Reis: the new study window and the moved vent change the facade, so the builder must confirm; the en-suite now sits fully over the living room, about 3 m further from the downstairs bathroom, so the drain route changes (builder); noise from the gaming room reaches the baby's room across the hall through the door, so a solid-core door with seals matters more than the panels; the baby's room shrinks from 16.2 to 8.7 m².
Open questions with defaults: pocket door on the en-suite (or fully open as drawn); daybed in the study; second wardrobe run; keep the new study window.

This also settles two older open items: the 15 Nov request (remove the wardrobe-room window, wardrobes instead; en-suite window → small vent only) and the island question (no island).

### 3.2 Stair look from his reference photo (unanswered)
He sent a photo of under-stair pull-out storage with an oak handrail and spindles and said "I want the stair like this". The pull-out storage was built and he **rejected** it ("That's not what I wanted"), so it was removed and the reading nook restored. Offered instead: oak handrail and spindles, carpeted steps, white side panel. He hasn't answered. Ask what he liked before building anything stair-related.

### 3.3 Kitchen options A/B/C against the work-zone rules (sketched 17 Nov, awaiting his pick)
He sent general kitchen rules (work triangle, landing space, dishwasher by the sink, 90 cm clearances) and asked which we had considered. Measured against NKBA: today's island and table leave 0.63–0.76 m on every side (NKBA asks 1.07 m for one cook), the hob sits 0.18 m from the oven tower (needs ≥ 0.30 m), the fridge hinge is 2 cm from the hall wall, and there is no dishwasher or bin. Triangle legs are fine (1.8 / 1.17 / 2.6 m), but the fridge–hob leg crosses the table by ~0.55 m.
Fixes common to all three options: hob moved to z 9.25–9.85 (0.45 m from the tower, hood and wall cabinets move with it); fridge x 5.3–5.93 (10 cm gap at the wall); sink run x 5.95–7.6 as drawers 0.45 / sink 0.6 (centred under the window, x 6.4–7.0) / 60 cm dishwasher x 7.0–7.6; bin under the sink.
- **A, as now plus fixes:** island and table unchanged. Aisles 0.63–0.76 m; the open dishwasher door ends 8 cm from the table's chair.
- **B, small prep island:** island x 6.1–6.68, z 9.02–9.96 (0.58 × 0.94 m), no seats, 0.90 m on all four sides. Meals at the living-room dining table.
- **C, table instead of an island:** table 0.7 × 1.0 on the hall wall (x 5.2–5.9, z 8.95–9.95), two chairs facing it. Cooking aisle 1.22 m, 0.91 m in front of the fridge, door swing clear.

## 4. Open items to mention, not to act on unless asked
- **Builder:** en-suite drain route (3–5 m to existing pipes, likely boxed in downstairs); en-suite extractor fan; no upstairs WC for the baby's and gaming rooms; under-stair pull-outs (if ever revived) need heavy-duty runners.
- **Plan reading doubts from the first review:** handwritten 1400 bathroom width; a blue pen mark; balcony door shown ~1.0 m (the 800 figure was part of a 3700+900+800 chain); porch drawn with full-depth walls; porch/balcony area labels look overstated; ceiling height 2.8 m is an assumption (shown in the tour); uneven stair goings; the 161 m² total.
- **Performance ideas offered, not requested:** draw only the current floor, merge static meshes, throttle shadow refreshes.

## 5. Decided, so don't re-ask
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
