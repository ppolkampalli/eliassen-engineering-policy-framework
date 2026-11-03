# <Project Name>

<!-- One-paragraph project description: what it does, for whom. -->

> **Governance:** This project is governed by the
> [Eliassen Group Engineering Policy Framework](https://github.com/eliassen/engineering-policy-framework)
> v1.0.0. Policies are citable by ID — registry installed at
> [`docs/policy-framework/REGISTRY.md`](docs/policy-framework/REGISTRY.md). See
> [`CLAUDE.md`](CLAUDE.md) for the distilled rules and role instructions.

## Quickstart

```bash
npm ci
npm run dev
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Run locally |
| `npm run lint` | ESLint (Policy Domain 2 policies) |
| `npm run type-check` | tsc strict pass (POL-2.3/2.4) |
| `npm test` | Jest with coverage floors (POL-3.2) |
| `npm run format` | Prettier write (POL-2.2) |

All of `lint`, `type-check`, and `test` must pass before any work is "done" (POL-6.2).

## Architecture

<!-- Layering per POL-4.1: where Presentation / Application / Domain / Persistence
     live in this repo. Link ADRs: docs/adr/ (POL-4.5). -->

## Configuration

<!-- Env vars table: name, purpose, example. Secrets come from the secret
     manager — never committed (POL-5.3). -->

| Variable | Purpose | Example |
|---|---|---|
| | | |

## Testing

<!-- How to run unit/integration/E2E; what the coverage floors are (POL-3.2);
     test conventions (POL-3.3/3.4). -->

## Deployment

<!-- Pipeline link; rollback procedure (POL-9.2); infrastructure code location
     (POL-9.1). -->

## Compliance

<!-- If regulated (POL-8.3): link the compliance map. Business rules catalog
     location (POL-8.2). -->
