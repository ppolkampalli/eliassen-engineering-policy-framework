---
id: POL-2.2
title: Formatting via Prettier
policy_domain: 2
policy_domain_name: Code Standards
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [software-engineer, quality]
enforcement: automated
enforcement_mechanism: "Prettier with configs/.prettierrc.json; format check in CI quality.yml and pre-commit hook"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-2.2: Formatting via Prettier

## Statement (quotable)

> All code is formatted by Prettier using the policy framework's shared
> configuration: 2-space indentation, 100-character line width, single
> quotes, semicolons, ES5 trailing commas. Formatting is never performed
> or adjusted manually, never debated in review, and never overridden
> per project. If the formatter's output is wrong, amend the shared
> configuration for everyone.

## Rationale (the WHY — always citable alongside the statement)

Every minute spent formatting — or arguing about formatting in review —
is waste, and review bottlenecks were a founding pain point. Mechanical
formatting produces minimal diffs (changes show logic, not whitespace),
eliminates an entire category of review comments, and guarantees that
AI-generated and human-written code are visually indistinguishable in
style. The specific settings matter less than their uniformity; they are
fixed here so they are never re-litigated (POL-1.3).

## Compliance Examples

VIOLATION:
```text
PR review comment thread:
  "nit: align these params"  /  "I prefer double quotes here"
Hand-adjusted alignment that the next save destroys.
```

COMPLIANT:
```bash
npx prettier --write .       # pre-commit hook does this automatically
npx prettier --check .       # CI verifies (quality.yml)
```

## Related Policies
- POL-1.3 (Consistency Enables Collaboration)
- POL-2.1 (Naming Conventions)
- POL-6.2 (Quality Gates Are Inviolable)

## Citation Format
[POL-2.2 v1.0] "All code is formatted by Prettier with the shared config (2-space, 100-char, single quotes, semicolons, ES5 trailing commas); formatting is never manual."
