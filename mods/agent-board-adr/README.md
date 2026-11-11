# agent-board-adr

A Claude Code pane mod: a list-and-drill-in browser for this project's ADR
records, shown beside the chat.

## Use

`/board-adr` opens the pane. Unlike `agent-board-kanban`, it does not open
automatically at session start — ADRs change far less often than workflow
events, so it's a browser you reach for on demand rather than something
worth keeping open by default.

## What it reads

Every `.md` file directly inside `docs/adr/` (no subdirectories), loaded
once at session start. A "↻ Refresh" button in the list view re-reads the
directory on demand — there's no polling timer, for the same low-change-
frequency reason it doesn't auto-open.

## What it shows

**List view**: each record's title (its first `# ` heading, or the filename
without `.md` when it has none — the same fallback
`agent-board/server/create-adr-handler.ts` uses) and filename. Selecting one
drills into:

**Detail view**: the title, then the file's full content rendered through
the pane's built-in `Markdown` element — real headings, lists, code fences,
and links, drawn by the surface's own renderer. (`agent-board/`'s own React
app needs a hand-rolled parser, `src/lib/markdown-model.ts`, only because a
browser DOM has no built-in "draw this markdown" primitive; a pane's host
already has one, so this mod doesn't need an equivalent.) "← Back" returns
to the list.

## Files

- `.claude-plugin/plugin.json` — manifest.
- `types/index.d.ts` — the `AdrRecord` shape and the `$.state` contract.
- `hooks/adr-model.ts` — title extraction, ported from
  `agent-board/src/lib/markdown-model.ts`'s `extractMarkdownTitle`.
- `hooks/register.tsx` — registers `/board-adr`, loads/refreshes records,
  renders the list and detail views.
