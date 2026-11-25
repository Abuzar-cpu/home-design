# Keeping the repo and its notes current

The notes in this repo are how the next session picks up without re-reading old chats. A change isn't finished until the notes say what changed. This file says which note to update, when, and how.

## Which file holds what
| File | Holds | Changes |
|---|---|---|
| `CLAUDE.md` | Stable rules: how Reis works, artifact slugs, publish flow, tools, model conventions, a short summary of the current layout | Rarely: when a rule, tool, convention or the overall layout changes |
| `docs/HANDOFF.md` | Session state: what is live (versions, sha256), what is pending (with build specs), builder/plan items, decisions not to re-ask, working style | Every session that changes something |
| `docs/MAINTAINING.md` | This guide | When the way of working changes |
| `README.md` | What the project is, for someone opening it on GitHub | Only when a visible feature is added or removed |
| `docs/ROOMS.md` + `docs/plans/` | Reis's plan photos, how the plan maps to the model, where the tour differs from the paper plan, and the room-size table | Table: run `python3 tools/rooms.py` whenever `rooms[]` changes. Text: when a room is added, split, merged or swapped, or he sends a new plan photo |
| `.trail/learnings/` | Gotchas that cost time (written with `trail note`) | When you hit one |
| `tools/walk.py` (`tests=[...]`) | Walk-through tests for doors and passages | When a door, opening or passage moves |
| `tools/fit/accepted.txt` | Fit findings that were reviewed and are intentional | Only via `python3 tools/check.py --accept`, after reading every new finding |

## When to update what
| Event | Update |
|---|---|
| Built a change and published it to the **working copy** | HANDOFF §2: working copy version (from the `publish_files` result), commit and sha256 (`python3 tools/status.py`); write what is now unpublished, e.g. "Unpublished: guest room desk removed". CLAUDE.md "Current layout" if the layout changed. |
| Reis says **publish** | HANDOFF §2: all three rows. Public = new version, same commit; backup = its new title and version. Write "Working copy and public are identical: nothing unpublished." |
| Showed a **sketch** and he hasn't approved | HANDOFF §3: new subsection with the date, what he asked in his words (short), the build spec in metres (same axes as `CLAUDE.md`), and every risk you told him. |
| He **approves** and it's built | Delete the spec from §3; add one line to §5 saying what was decided. |
| He **rejects** something, or says "that's not what I wanted" | Remove the work; add a line to §5 (or to the open §3 item) naming what was rejected so nobody builds it again. |
| He **asks a question you couldn't settle** | Keep it in §3 as "unanswered", with the options you offered. |
| You flag a **builder or plan** concern | HANDOFF §4, one line. Remove it when he says it's resolved. |
| He states a **working preference** ("only one backup", "fewer renders") | HANDOFF §6; also `CLAUDE.md` "How Reis works" if it's a standing rule. |
| New helper, new `src/js` file, new material, new convention | `CLAUDE.md` "Model conventions" (and the file list at the top if a file was added), `docs/CODE.md` (file table, recipes). A one-line comment above a new helper giving its arguments, and above each new piece of furniture saying what it is. Keep the `NN-` numbering so the build order stays right. Run `npm run format --prefix tools`. |
| Refactor that should change nothing visible | `python3 tools/fingerprint.py --save` before, `--diff` after (must print `identical`); say so in the PR. `docs/CODE.md` if the structure or a recipe changed. |
| New tool or check, or a tool's usage changed | `CLAUDE.md` "Checks" and, if it's part of the start routine, HANDOFF §1. |
| Artifact slug changes (new backup, new public page) | `CLAUDE.md` artifact table and HANDOFF §2. |
| A room's size, name or position changed (`rooms[]`) | `python3 tools/rooms.py`; and the "differs from the paper plans" list in `docs/ROOMS.md` if it now departs from his plans. |
| He sends a new or corrected plan photo | Look at it first (no personal details), save it in `docs/plans/` with a descriptive name, list it in `docs/ROOMS.md`. |
| A door, opening or passage moved | Add or adjust a test in `tools/walk.py`; keep the count in `CLAUDE.md` and HANDOFF §1 right. |
| You lost time to something non-obvious (tool quirk, hidden coupling) | `trail note --title "<few words>" --touches "<files>" -m "<what happened, what works>"`. It lands in `.trail/learnings/`; commit it with the change. |

## How to write the notes
- Facts, not narration: what is true now, not the story of how it got there. The git history keeps the story.
- Measurements in metres with the repo's axes (x from the outside wall, z from the rear wall, upper-floor y relative to its floor). Name the `src/js` file where the change lives.
- Dates as "17 Nov 2026". Update "Last updated" at the top of HANDOFF on every edit.
- Replace stale lines instead of appending "no longer". If something was reversed, say so once in §5.
- Quote Reis only when the decision hinges on his exact words, and keep it short.
- Keep HANDOFF under about 200 lines. When §5 grows long, merge related lines.
- No personal data beyond what's already there (no email, no phone, no address).

## End-of-session routine
1. `python3 tools/check.py` is clean (or every new finding was reviewed with Reis and then accepted).
2. The working copy artifact has the latest build, and the public one only if he said publish (with the backup overwritten first).
3. `python3 tools/status.py`, then update HANDOFF §2 with the printed values and the artifact versions.
4. Update the other notes per the table above, and the "Last updated" date.
5. Commit: imperative subject under ~60 characters; body says what changed for Reis and why; end with the `Co-Authored-By: Claude <model> <noreply@anthropic.com>` trailer (plus the session link line when the session gives one).
6. Work on a branch, never on `main`: `git switch -c <kind>/<short-name>` at the start (kinds: `tour/` for changes to the house, `docs/`, `tools/`). Push it with `git push -u origin <branch>`.
7. Open a pull request. `gh pr create` doesn't work in these sessions (no GraphQL), so use the REST API:
   `gh api repos/Abuzar-cpu/home-design/pulls -f base=main -f head=<branch> -f title="<subject>" -f body="<what changed for Reis, what to check, and the session's PR attribution lines>"`
   Give Reis the PR link and stop. He merges it; don't merge it yourself.
8. If the working copy artifact was updated, say so in the PR: the working copy then shows the change before `main` does, until he merges.
