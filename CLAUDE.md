# Engineering Policy Framework — Project Rules

This project is governed by the **Eliassen Group Engineering Policy Framework v2.0.0**.
Policies are citable by ID. Full registry: `policies/REGISTRY.md` or read `policies/registry.json`.
Look up any policy: `./scripts/policy-lookup.sh POL-X.Y`.

## The Ten Policy Domains (most-invoked policies)

1. **Foundational Principles** — readable code (POL-1.1), quality built-in (POL-1.2), consistency (POL-1.3), intentional architecture (POL-1.4), security is everyone's (POL-1.5)
2. **Code Standards** — naming (POL-2.1), Prettier (POL-2.2), no `any` (POL-2.3), explicit return types (POL-2.4), import order (POL-2.5), single-purpose functions w/ CC≤5/~40-LOC advisory (POL-2.6)
3. **Testing & Quality** — Canon TDD + never weaken failing tests (POL-3.1), coverage floors (POL-3.2), AAA structure (POL-3.3), isolation (POL-3.4), no hollow tests (POL-3.5), mutation testing (POL-3.6)
4. **Architecture** — domain-first layering, modular-monolith default (POL-4.1), SOLID (POL-4.2), no cycles (POL-4.3), sanctioned patterns (POL-4.4), ADRs (POL-4.5), resilience patterns (POL-4.6)
5. **Security** — input validation (POL-5.1), parameterized queries (POL-5.2), no secrets in code (POL-5.3), established auth (POL-5.4), dependency hygiene (POL-5.5), encryption (POL-5.6)
6. **Review & Documentation** — two approvals (POL-6.1), inviolable gates (POL-6.2), JSDoc (POL-6.3), abstraction + WHY comments (POL-6.4), docs with code (POL-6.5)
7. **AI Governance** — human accountability (POL-7.1), data protection (POL-7.2), audit trail (POL-7.3), identical standards (POL-7.4), escalate on uncertainty (POL-7.5), code-health metrics (POL-7.6)
8. **Requirements & Domain** — acceptance criteria first (POL-8.1), cited business rules (POL-8.2), regulatory mapping (POL-8.3), scope discipline (POL-8.4)
9. **Operations & Cost** — infrastructure as code (POL-9.1), reversible deploys (POL-9.2), cost review (POL-9.3), license compliance (POL-9.4), SLOs (POL-9.5), error budgets (POL-9.6), failure testing (POL-9.7)
10. **Agentic Development** — spec-driven agent work (POL-10.1), verifiable completion (POL-10.2), sandboxing + permissions (POL-10.3), governed steering files (POL-10.4), fresh-context review (POL-10.5), defined workflows (POL-10.6)

## Hard Rules (non-negotiable)

- **Naming** per the POL-2.1 table: camelCase variables/functions, PascalCase types (no `I` prefix), UPPER_SNAKE_CASE constants, is/has/can booleans, kebab-case files.
- **No `any`** — use `unknown` + type narrowing (POL-2.3).
- **TDD-first** — test list, one failing test at a time (POL-3.1). **Never delete, skip, or weaken a failing test to achieve green.**
- **80% coverage floor** (100% utilities, 70% controllers) — never lower a threshold to pass a build (POL-3.2).
- **Security basics** (Policy Domain 5): allowlist-validate all external input, parameterized queries only, no secrets in code or logs, established auth frameworks only.
- **Tag AI commits** with `[Claude-assisted]` and fill the PR's AI Assistance section (POL-7.3).
- **Agentic work** (Policy Domain 10): substantial work proceeds from a reviewed plan naming the bearing policies (POL-10.1); define a runnable check first and present evidence, not assertions (POL-10.2); your output is reviewed by a context that didn't produce it (POL-10.5).

## Roles

Assume the matching role for the work at hand (the `role-*` skills):
security work → Security role; design/refactors → Architect; tests/review → Quality;
requirements/scope → Product Owner; infra/deploys → DevOps; cost/licenses → FinOps;
domain rules → Industry SME; implementation (default) → Software Engineer.

- **Cite policies in all decisions** — full DECISION/CITATION/RATIONALE/ROLE block for
  significant decisions, inline `(per [POL-X.Y vN])` for minor corrections.
- **On uncertainty, stop and ask** per POL-7.5 — ambiguous requirements, lasting
  architectural choices, and security questions are escalated, never guessed.
- Cross-cutting changes or role conflicts → role-council skill.

## Workflows (POL-10.6)

Nontrivial work follows a declared workflow from `workflows/`
(WF-FEATURE, WF-RESEARCH, WF-BUG, WF-SECBUG, WF-REFACTOR, WF-POLICY-CHANGE) — use the
workflow-orchestrator skill. Deviations on non-hard stages are allowed when asked,
but every deviation is recorded on the work item; hard stages (marked `*`) and
WF-POLICY-CHANGE's sequence are never overridable. Project-local `workflows/` files
override the catalog by ID but cannot soften org hard stages.

## Before Declaring Any Work Done

```bash
npm run lint && npm run type-check && npm test
```

All three must pass (POL-6.2). Quality gates have no override path.
