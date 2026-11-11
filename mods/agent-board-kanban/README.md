# agent-board-kanban

A Claude Code pane mod: a live Kanban board of governed-workflow progress,
shown beside the chat instead of in a separate browser tab.

## Use

`/board` opens (or reopens) the pane. It also opens automatically once per
session, since it's meant to stay visible while work is in progress.

## What it reads

`.claude/board/events.local.jsonl`, relative to the project root — the same
JSONL event log `skills/workflow-orchestrator/SKILL.md` appends to as a
best-effort side effect of running a workflow (see that skill's "Board
Events" section). Polled every 1.5s. A missing file is normal (no workflow
has run yet) and shows as an empty board, not an error.

## What it shows

Three swim lanes — **In Progress**, **Blocked**, **Done** — derived the same
way `agent-board/src/lib/board-model.ts` derives them (that file's
`deriveLane`/`deriveWorkItems` logic is ported here nearly verbatim, in
`hooks/board-model.ts`, since it has no React/DOM dependency to begin with).
Each work item is one card: its id, workflow, current stage · role, a
truncated note, elapsed time since its last event, and a policy-citation
count when any are attached.

## Files

- `.claude-plugin/plugin.json` — manifest.
- `types/index.d.ts` — the domain types (trimmed from
  `agent-board/src/lib/types.ts`) and the `$.state` contract.
- `hooks/board-model.ts` — the pure parsing/lane-derivation logic.
- `hooks/register.tsx` — registers `/board`, polls the log, renders the pane.
