# Claude Code mods

A **mod** here is a Claude Code plugin built from function hooks (a
`.claude-plugin/plugin.json` manifest plus a `hooks/` module) — the pane,
status-line, and slash-command customization system documented by the
`plugin-authoring` skill (`skills/plugin-authoring/` if installed, or
Claude Code's own bundled copy). That's a different mechanism from this
repo's `skills/` directory, whose entries are prompt-driven `SKILL.md`
skills, not hook modules — the two are kept in separate source trees here
for that reason, even though Claude Code loads both the same way at
install time (see below).

## What's here

- `agent-board-kanban/` — a live Kanban pane (`/board`) reading
  `.claude/board/events.local.jsonl`, the same event log
  `skills/workflow-orchestrator/SKILL.md` writes as a side effect of
  running a governed workflow.
- `agent-board-adr/` — an ADR Records pane (`/board-adr`), list-and-drill-in
  browsing of `docs/adr/`, rendered with the pane's built-in `Markdown`
  element (full headings/lists/code fences/links, no hand-rolled parser).

Both are read-only viewers alongside `agent-board/`'s own React app — not a
replacement for it. `agent-board/`'s Policy Cohort charts and per-item
flowchart have no equivalent here yet: a mod's drawing surface is
terminal-native primitives (`Box`/`Text`/`Button`/`Markdown`), not a browser
DOM, so recharts/`@xyflow/react` visuals don't port directly.

## How these get installed

`scripts/install.sh` copies this whole `mods/` tree into a target project's
`.claude/skills/` alongside the prompt skills — that's the directory an
interactive Claude Code session auto-loads and hot-reload-watches plugins
from, for a hook-module mod exactly as for a `SKILL.md` skill. There is no
separate `.claude/mods/` convention to install into.

`scripts/update.sh` refreshes `.claude/skills/` wholesale on every run, so a
mod here is replaced in full each time, the same as every other installed
skill — no partial/local-only state to lose by design (any work-in-progress
on a mod belongs in this repo, not the installed copy).

See each mod's own `README.md` for what it reads and what it needs on disk
to show anything.
