# context-bar

A Claude Code band mod: a persistent one-line bar just above the prompt
showing how full the current context window is — the same figures the
native status line has, always in view instead of toggled on.

## Use

Shown automatically from session start, no command needed. Click **Hide**
to dismiss it for the session; run `/context-bar` to bring it back.

## What it reads

`$.session.usage()`, polled every 2s — the engine's own live context-window
accounting (no breakdown requested, so each poll is free: no extra token-count
calls). Nothing is read from disk and nothing here is specific to this
project; the mod works in any Claude Code session.

## What it shows

A block-character progress bar, the percent of the context window used, and
`tokens/window` in compact form (e.g. `42.3k/200k tokens`). The bar and
percentage turn amber past 70% used and red past 90%, matching the severity
a person would react to.

## Files

- `.claude-plugin/plugin.json` — manifest.
- `types/index.d.ts` — the `$.state` contract (storing the engine's own
  `SessionUsage` type, not a project-specific one).
- `hooks/context-model.ts` — pure formatting/threshold logic (token
  compaction, bar rendering, severity color).
- `hooks/register.tsx` — polls `$.session.usage()`, registers `/context-bar`,
  renders the band.
