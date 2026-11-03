# AGENTS.md — Engineering Policy Framework Project Rules

This project is governed by the **Eliassen Group Engineering Policy Framework v2.0.0**
(57 citable policies, 10 policy domains). Full registry: `docs/policy-framework/REGISTRY.md`
(installed copy) or the `engineering-policy-framework` repository. Cite policies by ID in
decisions: full DECISION/CITATION/RATIONALE blocks for significant calls, inline
`(per [POL-X.Y vN])` for minor corrections.

## Build and test commands

```bash
npm run lint        # ESLint, Policy Domain 2 policies
npm run type-check  # tsc strict (POL-2.3/2.4)
npm test            # Jest with coverage floors (POL-3.2)
npm run format      # Prettier (POL-2.2)
```

All of lint, type-check, and test must pass before any work is "done" (POL-6.2).
Quality gates have no override path.

## Code style

- Naming (POL-2.1): camelCase vars/functions, PascalCase types (no `I` prefix),
  UPPER_SNAKE_CASE constants, is/has/can booleans, kebab-case files.
- No `any` — use `unknown` + narrowing (POL-2.3). Explicit return types on
  exports (POL-2.4).
- Functions: one responsibility; complexity ≤5 and ~40 lines are advisory review
  thresholds (POL-2.6). No magic numbers.
- Comments: interface comments are part of the abstraction; WHY comments for
  business rules/trade-offs/constraints; never restate the code (POL-6.4).

## Testing instructions

- Canon TDD (POL-3.1): test list → one failing test at a time → green → refactor.
  **Never delete, skip, or weaken a failing test to achieve green.**
- Coverage floors 80/100/70 are never lowered (POL-3.2). Generated tests must
  kill mutants beyond the existing suite (POL-3.6) — hollow tests are rejected
  (POL-3.5).

## Agentic workflow (Policy Domain 10)

- Nontrivial work follows a declared workflow from
  `docs/policy-framework/workflows/` — WF-FEATURE, WF-RESEARCH, WF-BUG, WF-SECBUG,
  WF-REFACTOR, WF-POLICY-CHANGE (POL-10.6). Deviations on non-hard stages are
  permitted but recorded; hard stages are never overridable.
- Substantial work proceeds from a reviewed plan that names the bearing policies
  (POL-10.1).
- Define a runnable check before implementing; present evidence, not assertions
  (POL-10.2).
- Work is reviewed by a context that didn't produce it (POL-10.5).
- On ambiguous requirements, lasting architectural choices, or security
  questions: stop and ask (POL-7.5). Guessing is prohibited.

## Security (Policy Domain 5 — Security role holds veto)

Allowlist-validate all external input (POL-5.1); parameterized queries only
(POL-5.2); no secrets in code or logs (POL-5.3); established auth frameworks only
(POL-5.4). Never send PII, secrets, or client-confidential material to unapproved
AI tools (POL-7.2).

## Commit and PR guidelines

- Conventional Commits; tag AI-generated code `[Claude-assisted]` or the
  equivalent for your tool (POL-7.3); complete the PR's AI Assistance section.
- `policy:` prefix is reserved for policy change enactments.
- Two approvals including a domain expert; no self-approval (POL-6.1).
- Docs update in the same PR as the change they describe (POL-6.5).
