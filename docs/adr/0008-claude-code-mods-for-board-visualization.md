# ADR-0008: Ship agent-board's Kanban and ADR Views as Installed Claude Code Mods

- **Status:** ACCEPTED
- **Date:** 2026-11-10
- **Deciders:** P. Polkampalli (direction); Software Engineer role (design/implement)
- **Work item:** direct request — build a Claude Code mod alternative to
  `agent-board`'s React Kanban/ADR tabs, then make it install with the
  framework like any other installed artifact, not a manual copy.

## Context

`agent-board/` (a Vite + React app with its own tiny Node API) is this
repo's existing, more capable workflow-visibility tool, and its own
README is explicit that it is **not** wired into `scripts/install.sh`,
`update.sh`, `validate.sh`, or the Claude Code plugin manifest — it's
manually copied into a consuming project like `memory-service/` and
`crm-demo/` are.

Claude Code itself ships a second, narrower customization mechanism for
exactly this kind of thing: a **mod** — a plugin built from function hooks
(`.claude-plugin/plugin.json` + a `hooks/` module) that can draw a pane,
a status-line entry, or a slash command beside the chat, documented by the
bundled `plugin-authoring` skill. Two were built this session directly
against agent-board's own data: `agent-board-kanban` (`/board`, reading the
same `.claude/board/events.local.jsonl` the `workflow-orchestrator` skill
already writes) and `agent-board-adr` (`/board-adr`, reading `docs/adr/`,
rendered through the pane's built-in `Markdown` element — no hand-rolled
parser needed, unlike `agent-board/src/lib/markdown-model.ts`, which exists
only because a browser DOM has no equivalent built-in renderer).

The direct request this time was narrower and more specific than
`agent-board/`'s own posture: make these two mods install automatically
wherever the framework itself installs, for every client, the same as the
role/enforcement skills in `skills/` already do — not a manual copy a
consuming team has to remember to perform.

The `plugin-authoring` skill's own reference documents the mechanism that
makes this possible with no new Claude Code feature: an interactive session
watches and hot-reloads "a plugin auto-loaded from a skills folder
(`~/.claude/skills/<name>`, the project's `.claude/skills/<name>`)" — a
hooks-based mod dropped there auto-loads exactly as a `SKILL.md` skill does.
That is the same destination `install.sh`/`update.sh` already populate for
this repo's prompt-based skills.

## Options Considered

### Option A — Leave the mods in the session's ephemeral dev-mods folder only
- Consequences: zero installer change, but the mods are lost the moment the
  authoring session ends and are not shareable with any other project or
  teammate — not a real feature, just a demo.

### Option B — Manual distribution, matching `agent-board/`'s own posture
- Consequences: consistent with the precedent `agent-board/README.md` sets
  ("not wired into install.sh..."), but directly contradicts the request:
  the person explicitly asked for installer integration so every client
  gets these "similar to the agent board feature" conceptually, but with
  tighter delivery than agent-board's own manual-copy model.

### Option C — Wire into `.claude/skills/` via `install.sh`/`update.sh`/`validate.sh`, reusing the existing destination
- Consequences: no new Claude Code mechanism and no new destination
  directory to teach `validate.sh` about — the mods ride the exact same
  `copy_tree`/full-refresh/`check_file` machinery already in place for
  `skills/`. Cost: a new top-level `mods/` *source* directory in this repo
  (kept separate from `skills/` since these are hook-module plugins, not
  `SKILL.md` prompt skills — mixing the two kinds in one source folder
  would read as inconsistent even though Claude Code loads both the same
  way from the installed destination).

## Decision

**Option C.** New source directory `mods/agent-board-kanban/` and
`mods/agent-board-adr/` (each the manifest, `hooks/`, state contract, and a
short README; the engine-generated `.claude-plugin/types/` and top-level
`tsconfig.json` are excluded from the committed tree — regenerated on every
load, not meaningful source). `scripts/install.sh` gained one `copy_tree
"$SRC/mods" "$TARGET/.claude/skills"` call, gated the same as the existing
skills block (`--ide claude|both`); `scripts/update.sh`'s existing skills
full-refresh now also copies `mods/` into the same destination afterward;
`scripts/validate.sh` gained two `check_file` lines for each mod's
`plugin.json`. `.gitignore` gained `.claude/board/events.local.jsonl` in
this repo itself, for the same reason `agent-board/README.md` already
states for consuming projects: generated at runtime, never meant to be
committed.

## Consequences

- **New:** `mods/` source tree; the `copy_tree`/full-refresh/`check_file`
  additions above; `mods/README.md` and each mod's own README.
- **Unchanged:** `agent-board/`'s own install posture — it remains manual
  distribution; this decision does not retroactively wire it in too, and
  does not retire it. The two systems serve different needs (richer charts
  in a browser vs. always-visible beside the chat) and are documented as
  complementary in `mods/README.md`, not competing.
- **Risk accepted, stated plainly:** these mods have no equivalent of
  `agent-board/`'s Policy Cohort charts or per-item flowchart — a pane's
  drawing surface is terminal-native primitives, not a browser DOM.
  Explicitly out of scope for this decision; the person has already said
  richer visuals are the next piece of work, separate from this one.
- **Follow-up, not started:** richer/more graphical rendering of the two
  panes (the person's own stated next step, after this installer change).

## Policies Considered

- [POL-4.5 v1.0] — this ADR itself, triggered by a change to the shared
  installer's behavior and a new persistent architectural piece (`mods/`).
- [POL-10.1 v1.0] — this change proceeded from a reviewed plan naming the
  bearing policies before any script or source file was touched.
- [POL-10.2 v1.0] — verifiable completion: `claude plugin validate` and a
  `tsc` type-check re-run against the mods in their new repo location, plus
  an end-to-end dry run of `install.sh`/`validate.sh`/`update.sh` against a
  scratch target directory, not asserted from the original dev-mods build
  alone.
- [POL-9.1 v1.0] — infrastructure as code: the installer scripts are the
  only mechanism that places these mods in a client project; there is no
  manual step a team could forget, unlike `agent-board/`'s own posture.
- [POL-1.3 v1.0] — consistency: reusing the existing `.claude/skills/`
  destination and `copy_tree`/full-refresh machinery rather than inventing
  a parallel `.claude/mods/` installation path for no mechanical reason.
