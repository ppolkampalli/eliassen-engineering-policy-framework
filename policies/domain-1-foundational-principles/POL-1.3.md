---
id: POL-1.3
title: Consistency Enables Collaboration
policy_domain: 1
policy_domain_name: Foundational Principles
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [quality, devops]
enforcement: automated
enforcement_mechanism: "Shared configs installed by scripts/install.sh; drift detected by scripts/validate.sh and CI"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-1.3: Consistency Enables Collaboration

## Statement (quotable)

> All projects governed by this policy framework use identical tooling,
> configuration, and conventions: the same linter rules, formatter
> settings, TypeScript strictness, test framework configuration, and
> naming standards. No project-level exceptions exist. A convention may
> be wrong for everyone and amended for everyone; it may not be wrong
> for one project alone.

## Rationale (the WHY — always citable alongside the statement)

Inconsistent standards across projects were a founding pain point: every
project-specific convention is a tax on every engineer who moves between
projects, and on every reviewer reading an unfamiliar repo. Uniformity
makes engineers productive on any codebase from day one and lets tooling,
skills, and roles behave identically everywhere. The zero-exception
rule exists because exceptions metastasize — the first "special case"
becomes the precedent for the next ten. The policy change process (not local
overrides) is the pressure valve when a convention genuinely needs to
change.

## Compliance Examples

VIOLATION:
```jsonc
// project-local .eslintrc.json overriding the policy framework config
{
  "extends": "../engineering-policy framework/configs/.eslintrc.json",
  "rules": { "@typescript-eslint/no-explicit-any": "off" } // local exception
}
```

COMPLIANT:
```jsonc
// project .eslintrc.json — extends without overrides
{
  "extends": "./node_modules/@eliassen/policy framework-configs/.eslintrc.json"
}
// Disagree with a rule? Propose an policy change (policy changes/AMENDMENT-PROCESS.md).
```

## Related Policies
- POL-2.2 (Formatting via Prettier)
- POL-6.2 (Quality Gates Are Inviolable)
- POL-9.1 (Infrastructure as Code)

## Citation Format
[POL-1.3 v1.0] "All projects use identical tooling and conventions with zero project-level exceptions; conventions change only by policy change, for everyone."
