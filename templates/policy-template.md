---
id: POL-X.Y
title: <Short Imperative Title>
policy_domain: X
policy_domain_name: <Policy Domain Name>
status: PROPOSED          # ACTIVE | AMENDED | REPEALED | PROPOSED
version: 1.0
effective_date: YYYY-MM-DD
owner_roles: [<role>, <role>]
enforcement: manual       # automated | review | role | manual
enforcement_mechanism: "<tool rule, CI job, review step, or role that enforces this policy>"
policy_change_history:
  - policy_change: PCH-YYYY-NNN
    date: YYYY-MM-DD
    change: "Initial ratification"
---

# POL-X.Y: <Short Imperative Title>

## Statement (quotable)

> <The complete, binding text of the policy. Written so it can be quoted
> verbatim in a citation. State the rule, its scope, and any exception
> path (who may grant an exception and how it is recorded).>

## Rationale (the WHY — always citable alongside the statement)

<Why this policy exists: the failure mode it prevents, the incident or pain
point that motivated it, and the cost of violating it. Agents and reviewers
cite this alongside the statement so decisions carry their reasoning.>

## Compliance Examples

VIOLATION:
```typescript
// <minimal example that violates the policy>
```

COMPLIANT:
```typescript
// <minimal example that satisfies the policy>
```

## Related Policies
- POL-A.B (<title>)
- POL-C.D (<title>)

## Citation Format
[POL-X.Y v1.0] "<One-sentence quotable form of the statement.>"
