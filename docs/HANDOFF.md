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
| Working copy | `1794941680-f4f5` | built from `src/` on branch `tour/upper-floor-proposal` at `0b6a885`; sha256 `dfc0cea5…31416f` |
| Public tour | `1794941693-1b70` | same page with the public title; sha256 `fd1a5366…1728d8`. Link Reis shares: https://claude.ai/artifact/PRgJ1V4VBxPi5dmDQ8ZKkt |
| Backup | `1794941634-29a2` | "Backup 17 Nov (before the new upper floor and porch storage)": the public page before this publish, rebuilt from `main` at `66f5a41` (sha256 `c10f3833…c718fe`, same as it was live) |
| Upper-floor proposal | `1794929937-ada5` | slug `b1682337-5007-48c2-9a01-405e5885bb49`: same content as the public tour since 17 Nov. He shared its link publicly, so it stays; update it only if he asks (republish with `shared_live: "public"` and `artifact_title` "Upper Floor Proposal – 17 Nov"). Link: https://claude.ai/artifact/Nuby8dQas9Vs2Dje5AytmN |

Working copy and public are identical: nothing unpublished. **`main` is behind:** the published code is on branch `tour/upper-floor-proposal` (no pull request: on 17 Nov Reis asked for none). Start from that branch, or ask him whether to open the pull request.

## 3. Pending (waiting on Reis)

### 3.1 Stair look from his reference photo (unanswered)
He sent a photo of under-stair pull-out storage with an oak handrail and spindles and said "I want the stair like this". The pull-out storage was built and he **rejected** it ("That's not what I wanted"), so it was removed and the reading nook restored. Offered instead: oak handrail and spindles, carpeted steps, white side panel. He hasn't answered. Ask what he liked before building anything stair-related.

### 3.2 Kitchen options A/B/C against the work-zone rules (sketched 17 Nov, awaiting his pick)
He sent general kitchen rules (work triangle, landing space, dishwasher by the sink, 90 cm clearances) and asked which we had considered. Measured against NKBA: today's island and table leave 0.63–0.76 m on every side (NKBA asks 1.07 m for one cook), the hob sits 0.18 m from the oven tower (needs ≥ 0.30 m), the fridge hinge is 2 cm from the hall wall, and there is no dishwasher or bin. Triangle legs are fine (1.8 / 1.17 / 2.6 m), but the fridge–hob leg crosses the table by ~0.55 m.
Fixes common to all three options: hob moved to z 9.25–9.85 (0.45 m from the tower, hood and wall cabinets move with it); fridge x 5.3–5.93 (10 cm gap at the wall); sink run x 5.95–7.6 as drawers 0.45 / sink 0.6 (centred under the window, x 6.4–7.0) / 60 cm dishwasher x 7.0–7.6; bin under the sink.
- **A, as now plus fixes:** island and table unchanged. Aisles 0.63–0.76 m; the open dishwasher door ends 8 cm from the table's chair.
- **B, small prep island:** island x 6.1–6.68, z 9.02–9.96 (0.58 × 0.94 m), no seats, 0.90 m on all four sides. Meals at the living-room dining table.
- **C, table instead of an island:** table 0.7 × 1.0 on the hall wall (x 5.2–5.9, z 8.95–9.95), two chairs facing it. Cooking aisle 1.22 m, 0.91 m in front of the fridge, door swing clear.

## 4. Open items to mention, not to act on unless asked
- **Builder:** en-suite drain route (the en-suite is now in the back corner over the living room, about 3 m further from the downstairs bathroom; likely boxed in downstairs); en-suite extractor fan; new study side window (z 9.4–11.0) and the en-suite vent change the facade; gaming-room door solid-core with seals (the baby's room is across the hall); baby gate screw-fixed, not pressure-fit; no upstairs WC for the baby's and gaming rooms; under-stair pull-outs (if ever revived) need heavy-duty runners.
- **Plan reading doubts from the first review:** handwritten 1400 bathroom width; a blue pen mark; balcony door shown ~1.0 m (the 800 figure was part of a 3700+900+800 chain); porch drawn with full-depth walls (resolved 17 Nov: the left part is a storage room, see §5); porch/balcony area labels look overstated; ceiling height 2.8 m is an assumption (shown in the tour); uneven stair goings; the 161 m² total.
- **Unanswered from the porch change:** his plan has small marks on the storage's side wall (door or window? a side door would open about 1.5 m above the garden); porch window built 0.9–2.3 m high, he may want it floor-to-ceiling.
- **Performance ideas offered, not requested:** draw only the current floor, merge static meshes, throttle shadow refreshes.

## 5. Decided, so don't re-ask
- Ground floor: kitchen and guest/study swapped versus the paper plan (his first change).
- Styles: Modern, Scandinavian, Warm luxury, Loft, with a switch. He asked whether Loft-only would be easier; told him it barely saves work and he kept all four.
- Language switch English/Azerbaijani; areas in m².
- Stair flipped to start near the living-room door; reading nook under it; step lights that follow you.
- Guided tour with music, a full 360° turn in each room, ends in the dollhouse view.
- Upper floor, earlier: bedroom armchair replaced by a two-door wardrobe on the back wall facing the bedroom door. (En-suite "option B" and the bedroom ↔ baby's room swap sketch were both replaced on 17 Nov, below.)
- Upper floor, published 17 Nov from his own drawing: left side split into en-suite 3.0 × 2.0 (bath with shower over it, double vanity, wall-hung WC, frosted 40 cm vent, pocket door from the bedroom), walk-in wardrobe 3.0 × 3.0 (two runs, doorless opening from the bedroom, no window), baby's room 3.0 × 2.9 (door opposite the stair top, crib out of the window bay) and study/guest 3.0 × 2.7 (desk, daybed, new side window). Baby gate at the stair top; acoustic panels in the gaming room; bedroom dresser replaced by a 20 cm wall shelf under the round mirror (a dresser left 0.6 m to the far side of the bed). He accepted the defaults by publishing: pocket door, daybed, second wardrobe run, new study window.
- Porch, published 17 Nov: the left 2.5 m is an enclosed storage room with a door from the porch and open shelving; the porch front is one window the full 2.6 m length; a bench under it replaces the two lounge chairs.
- Living room: armchair and table lamp removed; L-sofa 3.65 m along the back wall with a short chaise on the dining side; coffee table 1.2 m; floor lamp and plant moved toward dining; glass display cabinet beside the TV unit, slatted panels stop at the TV unit.
- Kitchen rebuilt from his own drawing: oven tower + gas hob on the outside wall, sink under the front window, fridge by the hall wall, stair-wall cabinets stop 1.05 m short of the door, island 1.0 × 0.7 with open shelves facing the hob and 2 stools, table for two 0.5 × 0.7 on the island's end. Stools/chairs pushed in so the walkway works. Kitchen door opens **into the kitchen** (opening into the hall blocked it).
- Guest/study: computer removed, two single beds, small two-door wardrobe, plain writing desk.
- Backups: keep **only the latest** backup artifact; overwrite it before each publish.

## 6. Working with Reis
- Short messages, sometimes with typos. "Copy" = working copy; "publish" = push to the public link; "sketch first" = an inline SVG plan to scale, nothing built until he approves.
- He wants risks and tight spots stated plainly (walkways under 0.9 m, things that need a builder), and he decides. When a request is ambiguous, sketch the options (A/B) rather than guessing.
- After building: one or two renders (`tools/render.py`) are enough; don't send four unless asked. Batch small changes into one build-check-publish round to save tokens.
- Every git commit ends with the `Co-Authored-By: Claude <model> <noreply@anthropic.com>` trailer (plus the session link line when the session provides one). Changes go to a branch and a pull request; Reis merges them himself.
