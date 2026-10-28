# Code Review Checklist

Every item annotated with its policy. Findings cite policies per
[citation-format.md](../skills/policy-enforcer/reference/citation-format.md);
severities per
[violation-severity.md](../skills/policy-enforcer/reference/violation-severity.md).
Two approvals required, one domain expert, no self-approval (POL-6.1).

## Before Reading Code

- [ ] Work item has acceptance criteria; I know what "correct" means here (POL-8.1)
- [ ] Diff is within agreed scope, or PO sign-off is recorded (POL-8.4)
- [ ] AI Assistance section completed; tagged commits present if applicable (POL-7.3)

## Readability & Standards

- [ ] Every changed function understandable in 30 seconds (POL-1.1)
- [ ] Naming per table: camelCase / PascalCase no-`I` / UPPER_SNAKE_CASE / is-has-can / kebab-case files (POL-2.1)
- [ ] No manual formatting artifacts (POL-2.2)
- [ ] No `any` — including `as any` and implicit (POL-2.3)
- [ ] Exported functions declare return types (POL-2.4)
- [ ] Imports grouped and ordered (POL-2.5)
- [ ] Functions ≤30 lines, single responsibility, no magic numbers (POL-2.6)
- [ ] No TODO without ticket+context (POL-1.2)

## Tests

- [ ] Failing test preceded implementation — evidence in commits/PR (POL-3.1)
- [ ] Coverage floors hold; no threshold edits in this diff (POL-3.2)
- [ ] AAA structure; "should X when Y" names (POL-3.3)
- [ ] Unit tests isolated (no network/db/clock), <1s, order-independent (POL-3.4)
- [ ] Every test can fail; no unticketed `.skip`; assertions verify outcomes (POL-3.5)

## Architecture

- [ ] Domain-first organization; dependencies point downward; cross-domain access via public interfaces only (POL-4.1)
- [ ] SOLID one-line tests pass on new/changed units (POL-4.2)
- [ ] No new import cycles (POL-4.3)
- [ ] DI/Repository/Factory/Strategy used where their situations apply (POL-4.4)
- [ ] ADR present for significant structural decisions; service extraction cites a documented criterion (POL-4.5, POL-4.1, POL-1.4)
- [ ] Network-boundary calls: explicit timeouts, bounded backoff+jitter retries, idempotency keys, breaker/degraded mode (POL-4.6)

## Security (escalate to Security role / security-checker for depth)

- [ ] All external input allowlist-validated at the boundary (POL-5.1)
- [ ] No string-built queries — parameterized only (POL-5.2)
- [ ] No secrets in code, config, or logs (POL-5.3)
- [ ] No custom auth/crypto; established frameworks only (POL-5.4)
- [ ] New deps evaluated (CVEs, maintenance, license); lockfile intact (POL-5.5, POL-9.4)
- [ ] TLS/at-rest expectations hold for data paths touched (POL-5.6)

## Documentation

- [ ] JSDoc with @param/@returns/@throws/@example on public surfaces (POL-6.3)
- [ ] Comments explain WHY; no WHAT-restatements (POL-6.4)
- [ ] README/API docs/runbooks updated in this PR (POL-6.5)
- [ ] Business rules cite their documented source (POL-8.2)
- [ ] Compliance map updated if mapped paths changed (POL-8.3)

## AI-Generated Code (when present)

- [ ] Verify, never assume: claimed APIs checked against real docs (POL-7.4)
- [ ] Edge cases tested, not trusted (POL-7.4)
- [ ] Generated tests inspected for hollowness; mutation report shows added kills (POL-3.5, POL-3.6)
- [ ] Author can explain every line (POL-7.1)
- [ ] Substantial agent work followed a reviewed plan; evidence of the runnable check presented (POL-10.1, POL-10.2)
- [ ] Reviewed by a context that did not produce it; no failing checks deleted/weakened (POL-10.5)

## Ops (when infra/deploy touched)

- [ ] Infrastructure changes are IaC, not console (POL-9.1)
- [ ] Rollback documented before release; expand-migrate-contract for migrations (POL-9.2)
- [ ] Cost estimate present for material changes; resources tagged (POL-9.3)
