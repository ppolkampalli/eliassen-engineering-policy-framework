---
id: POL-5.2
title: Parameterized Queries Only
policy_domain: 5
policy_domain_name: Security
status: ACTIVE
version: 1.0
effective_date: 2026-06-01
owner_roles: [security]
enforcement: review
enforcement_mechanism: "Security role review lens item 2; CodeQL injection queries in CI security.yml"
policy_change_history:
  - policy_change: AMD-2026-001
    date: 2026-06-01
    change: "Initial ratification"
  - policy_change: AMD-2026-012
    date: "2026-10-28"
    change: "Renamed id LAW-X.Y -> POL-X.Y as part of framework terminology
      realignment (v1.2.0 -> v2.0.0). No statement/rationale text change."
---

# POL-5.2: Parameterized Queries Only

## Statement (quotable)

> Database queries are constructed exclusively with parameterized
> statements or a query builder/ORM that parameterizes by design. String
> concatenation or template interpolation of any runtime value into query
> text is prohibited — including values believed safe, internal, or
> already validated. The same rule applies to NoSQL operators, LDAP
> filters, and shell commands: data is passed as data, never spliced
> into executable text.

## Rationale (the WHY — always citable alongside the statement)

SQL injection has been the most exploited vulnerability class for over
two decades, and every instance begins with one engineer concatenating
"just this one" value. The prohibition is absolute precisely so it is
auditable: "no concatenation anywhere" can be verified mechanically;
"concatenation only where the value is safe" cannot — value provenance
changes with every refactor, and yesterday's constant is tomorrow's user
input. Parameterization makes the query's shape immutable regardless of
the data's content, eliminating the class rather than patching instances.

## Compliance Examples

VIOLATION:
```typescript
const rows = await db.query(
  `SELECT * FROM orders WHERE customer_id = '${customerId}'`  // injectable
);
```

COMPLIANT:
```typescript
const rows = await db.query(
  'SELECT * FROM orders WHERE customer_id = $1',
  [customerId]                                   // data passed as data
);
```

## Related Policies
- POL-5.1 (Universal Input Validation)
- POL-1.5 (Security is Everybody's Responsibility)

## Citation Format
[POL-5.2 v1.0] "Queries are built exclusively with parameterized statements; concatenating or interpolating any runtime value into query text is prohibited."
