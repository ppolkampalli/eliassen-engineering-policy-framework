# Engineering Standards — Working Reference

The day-to-day developer view of the policy framework. Every standard here is a policy;
the policy is the authority — when this page and a policy file disagree, the policy file
wins, and the discrepancy is a bug in this page (POL-6.5).

## Code Style (Policy Domain 2)

**Naming (POL-2.1)**

| Element | Convention | Example |
|---|---|---|
| Variables, functions, methods, parameters | `camelCase` | `orderTotal`, `calculateTax()` |
| Classes, interfaces, types, enums | `PascalCase` (no `I` prefix) | `PaymentGateway` |
| Module constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Booleans | `is`/`has`/`can` prefix | `isActive`, `canRetry` |
| Files, directories | `kebab-case` | `payment-service.ts` |

**Formatting (POL-2.2):** Prettier, shared config, never manual: 2-space, 100-char,
single quotes, semicolons, ES5 trailing commas.

**Types (POL-2.3, POL-2.4):** No `any` — `unknown` + narrowing; exceptions need an
inline justification and Quality role approval. Exported functions declare
return types. All strict tsconfig flags on (see configs/tsconfig.base.json).

**Structure (POL-2.5, POL-2.6 v1.1):** Imports stdlib → third-party → local,
alphabetized. Functions: one responsibility, depth of abstraction as the goal;
complexity ≤5 and ~40 lines are advisory review thresholds; no magic numbers.

## Testing (Policy Domain 3)

- Canon TDD: test list → one failing test at a time → green → refactor; never
  delete/skip/weaken a failing test to reach green (POL-3.1 v1.1)
- Floors: 80% business logic, 100% utilities, 70% controllers — CI-enforced,
  never lowered (POL-3.2)
- AAA structure; "should <expectation> when <scenario>" names (POL-3.3)
- Unit tests: externals mocked, <1s, order-independent (POL-3.4)
- No unticketed `.skip`; every test must be able to fail (POL-3.5)
- Mutation testing (StrykerJS): AI-generated tests must kill additional
  mutants; mutation-score baselines ratchet upward (POL-3.6)

Full guide: [testing-guide.md](testing-guide.md).

## Architecture (Policy Domain 4)

- Domain-first organization: top-level modules mirror business domains, with
  Presentation → Application → Domain logic → Persistence inside each;
  cross-domain access via public interfaces; modular-monolith default with
  ADR-gated service extraction (POL-4.1 v1.1)
- SOLID, applied via the one-line tests in POL-4.2
- `import/no-cycle: error` (POL-4.3)
- Sanctioned patterns: DI (external deps), Repository (persistence), Factory
  (complex construction), Strategy (variant behavior); others need an ADR (POL-4.4)
- ADR in `docs/adr/` **before** structurally significant merges (POL-4.5, POL-1.4)
- Resilience on every network boundary: explicit timeouts, bounded
  backoff+jitter retries, idempotency keys, circuit breakers with defined
  degraded modes (POL-4.6)

## Security (Policy Domain 5)

- Allowlist-validate every external input at the boundary (POL-5.1)
- Parameterized queries only — zero concatenation (POL-5.2)
- Secrets via env/secret manager; committed-once = rotate (POL-5.3)
- OAuth2/OIDC/JWT/SAML via vetted libraries; never roll your own (POL-5.4)
- Weekly + per-PR scans; criticals ≤24h; lockfiles pinned (POL-5.5)
- TLS 1.2+ everywhere (internal too); sensitive data encrypted at rest (POL-5.6)

## Review & Docs (Policy Domain 6)

- 2 approvals, 1 domain expert, no self-approval (POL-6.1)
- Gates (lint, types, tests, coverage, format, security) green before merge — no
  override path (POL-6.2)
- JSDoc on public APIs with @throws and @example (POL-6.3)
- Comments = WHY (POL-6.4); docs in the same PR (POL-6.5)

## AI-Assisted Work (Policy Domain 7)

- You own every line you merge (POL-7.1)
- Protected data only to approved tools (POL-7.2)
- `[Claude-assisted]` tag + PR disclosure (POL-7.3)
- Same standards, verify-never-assume review (POL-7.4)
- Stop and ask on ambiguity — never guess (POL-7.5)
- Duplication/churn metrics per release; regressions become ticketed
  refactoring work; never individual KPIs (POL-7.6)

## Requirements & Ops (Policy Domains 8–9)

- Acceptance criteria before code (POL-8.1); business rules cited (POL-8.2);
  compliance map maintained (POL-8.3); scope changes need PO sign-off (POL-8.4)
- IaC only (POL-9.1); rollback before release (POL-9.2); cost estimates + tags
  (POL-9.3); licenses evaluated, copyleft → legal (POL-9.4)
- SLOs with product+dev+ops sign-off (POL-9.5); error budgets with
  release-freeze consequences and >20% postmortem trigger (POL-9.6); quarterly
  failure-injection/game days — untested recovery is assumed broken (POL-9.7)

## Agentic Development (Policy Domain 10)

- Substantial agent work starts from a reviewed plan naming the bearing policies (POL-10.1)
- Define a runnable check first; present evidence, not assertions (POL-10.2)
- Autonomous runs: filesystem AND network sandbox + explicit tool allowlists (POL-10.3)
- CLAUDE.md/AGENTS.md are code: reviewed, concise, pruned; always-rules become
  hooks, not prose (POL-10.4)
- Agent output is reviewed by a context that didn't produce it (POL-10.5)
- Nontrivial work follows a declared workflow (WF-FEATURE/RESEARCH/BUG/SECBUG/
  REFACTOR/POLICY CHANGE); deviations recorded; hard stages never overridable
  (POL-10.6; catalog: workflows/, orchestrated by workflow-orchestrator)

## Looking Things Up

- `./scripts/policy-lookup.sh POL-X.Y` — full policy record
- [policies/REGISTRY.md](../policies/REGISTRY.md) — all 45 policies
- policy-clerk skill — topic search, policy change history, "why does this policy exist?"
